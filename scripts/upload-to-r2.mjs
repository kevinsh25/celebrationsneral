import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local if it exists
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf-8");
  envFile.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, "");
    }
  });
}

// Configuration from environment variables
const {
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_ACCOUNT_ID,
} = process.env;

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_ACCOUNT_ID) {
  console.error("Error: Missing R2 environment variables.");
  process.exit(1);
}

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

let uploadedCount = 0;
let skippedCount = 0;

async function uploadFile(filePath, bucketPath) {
  const fileSize = fs.statSync(filePath).size;

  // Check if file already exists with same size
  try {
    const existing = await s3Client.send(new HeadObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: bucketPath,
    }));
    if (existing.ContentLength === fileSize) {
      skippedCount++;
      if (skippedCount % 100 === 0) {
        process.stdout.write(`\rSkipped ${skippedCount} files...`);
      }
      return;
    }
  } catch (e) {
    // File doesn't exist, proceed to upload
  }

  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: bucketPath,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable",
  });

  try {
    await s3Client.send(command);
    uploadedCount++;
    console.log(`\nSuccessfully uploaded ${bucketPath}`);
  } catch (err) {
    console.error(`\nError uploading ${bucketPath}:`, err.message);
  }
}

async function walkDir(dir, bucketBase = "") {
  const files = fs.readdirSync(dir);
  const tasks = [];
  const CONCURRENCY_LIMIT = 20;

  for (const file of files) {
    const localPath = path.join(dir, file);
    const bucketPath = path.join(bucketBase, file).replace(/\\/g, "/");

    if (fs.statSync(localPath).isDirectory()) {
      await walkDir(localPath, bucketPath);
    } else {
      if (file === ".DS_Store") continue;
      tasks.push(() => uploadFile(localPath, bucketPath));
    }
  }

  for (let i = 0; i < tasks.length; i += CONCURRENCY_LIMIT) {
    const chunk = tasks.slice(i, i + CONCURRENCY_LIMIT);
    await Promise.all(chunk.map((task) => task()));
  }
}

const publicDir = path.resolve(__dirname, "../public");
const nextStaticDir = path.resolve(__dirname, "../.next/static");

async function run() {
  console.log("Starting upload of assets to R2...");

  // Upload public folder to root
  console.log("Checking public folder...");
  await walkDir(publicDir);
  console.log(`\nPublic folder sync complete. (Uploaded: ${uploadedCount}, Skipped: ${skippedCount})`);

  // Reset counts for next folder
  const totalPublicUploaded = uploadedCount;
  const totalPublicSkipped = skippedCount;
  uploadedCount = 0;
  skippedCount = 0;

  // Upload .next/static folder to _next/static
  if (fs.existsSync(nextStaticDir)) {
    console.log("Checking .next/static folder...");
    await walkDir(nextStaticDir, "_next/static");
    console.log(`\n.next/static sync complete. (Uploaded: ${uploadedCount}, Skipped: ${skippedCount})`);
  }

  console.log("\nAll assets synced to R2!");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
