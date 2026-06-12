import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
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
let existingFilesMap = new Map();

async function getAllExistingFiles() {
  console.log("Fetching existing file list from R2 (this makes syncing lightning fast)...");
  let isTruncated = true;
  let continuationToken = undefined;

  while (isTruncated) {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
      ContinuationToken: continuationToken,
    });
    
    const response = await s3Client.send(command);
    
    if (response.Contents) {
      for (const item of response.Contents) {
        existingFilesMap.set(item.Key, item.Size);
      }
    }
    
    isTruncated = response.IsTruncated;
    continuationToken = response.NextContinuationToken;
    process.stdout.write(`\rFetched metadata for ${existingFilesMap.size} files...`);
  }
  console.log("\nFinished fetching existing files.");
}

async function uploadFile(filePath, bucketPath) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath) || "application/octet-stream";

  const isStaticAsset = bucketPath.includes('/tiles/') || 
                         bucketPath.includes('/images/') || 
                         bucketPath.includes('/gallery/') ||
                         bucketPath.endsWith('.webp') ||
                         bucketPath.endsWith('.png') ||
                         bucketPath.endsWith('.jpg');

  const cacheControl = isStaticAsset 
    ? "public, max-age=31536000, immutable"
    : "public, max-age=0, must-revalidate";

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: bucketPath,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: cacheControl,
  });

  const uploadPromise = s3Client.send(command);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout after 30 seconds")), 30000)
  );

  try {
    await Promise.race([uploadPromise, timeoutPromise]);
    uploadedCount++;
    console.log(`Successfully uploaded ${bucketPath}`);
  } catch (err) {
    console.error(`Error uploading ${bucketPath}:`, err.message);
  }
}

async function walkDir(dir, bucketBase = "") {
  const tasks = [];
  const CONCURRENCY_LIMIT = 50; // Increased concurrency since we only queue real uploads

  function traverse(currentDir, currentBucketBase) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const localPath = path.join(currentDir, file);
      const bucketPath = path.join(currentBucketBase, file).replace(/\\/g, "/");

      if (fs.statSync(localPath).isDirectory()) {
        traverse(localPath, bucketPath);
      } else {
        if (file === ".DS_Store") continue;
        
        const fileSize = fs.statSync(localPath).size;
        
        const isConfigFile = file.endsWith('.xml') || file.endsWith('.json') || file.endsWith('.html');
        
        // Instant memory lookup instead of an HTTP request!
        // We only skip if it's NOT a config file and the size matches.
        if (!isConfigFile && existingFilesMap.has(bucketPath) && existingFilesMap.get(bucketPath) === fileSize) {
          skippedCount++;
          if (skippedCount % 5000 === 0) {
            process.stdout.write(`\rSkipped ${skippedCount} files locally...`);
          }
        } else {
          tasks.push(() => uploadFile(localPath, bucketPath));
        }
      }
    }
  }

  traverse(dir, bucketBase);

  if (skippedCount > 0) {
    console.log(`\nSkipped ${skippedCount} files that are already up-to-date.`);
  }
  if (tasks.length > 0) {
    console.log(`\nUploading ${tasks.length} new or modified files...`);
  }

  // Run upload tasks with concurrency limit
  for (let i = 0; i < tasks.length; i += CONCURRENCY_LIMIT) {
    const chunk = tasks.slice(i, i + CONCURRENCY_LIMIT);
    await Promise.all(chunk.map((task) => task()));
  }
}

const publicDir = path.resolve(__dirname, "../public");
const nextStaticDir = path.resolve(__dirname, "../.next/static");

async function run() {
  console.log("Starting highly-optimized upload of assets to R2...");

  await getAllExistingFiles();

  // Upload public folder to root
  console.log("\nChecking public folder...");
  await walkDir(publicDir);
  console.log(`\nPublic folder sync complete. (Uploaded: ${uploadedCount}, Skipped: ${skippedCount})`);

  // Reset counts for next folder
  uploadedCount = 0;
  skippedCount = 0;

  // Upload .next/static folder to _next/static
  if (fs.existsSync(nextStaticDir)) {
    console.log("\nChecking .next/static folder...");
    await walkDir(nextStaticDir, "_next/static");
    console.log(`\n.next/static sync complete. (Uploaded: ${uploadedCount}, Skipped: ${skippedCount})`);
  }

  console.log("\nAll assets synced to R2!");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
