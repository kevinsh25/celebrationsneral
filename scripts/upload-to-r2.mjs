import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

async function uploadFile(filePath, bucketPath) {
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
    console.log(`Successfully uploaded ${bucketPath}`);
  } catch (err) {
    console.error(`Error uploading ${bucketPath}:`, err.message);
  }
}

async function walkDir(dir, bucketBase = "") {
  const files = fs.readdirSync(dir);
  const tasks = [];
  const CONCURRENCY_LIMIT = 20; // Increased concurrency

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

  // Run tasks with concurrency limit
  for (let i = 0; i < tasks.length; i += CONCURRENCY_LIMIT) {
    const chunk = tasks.slice(i, i + CONCURRENCY_LIMIT);
    await Promise.all(chunk.map((task) => task()));
  }
}

const publicDir = path.resolve(__dirname, "../public");
console.log("Starting upload of public folder to R2...");
walkDir(publicDir).then(() => {
  console.log("Upload complete!");
});
