#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Deployment Process..."

# 1. Build the project
echo "📦 Building Next.js project..."
npm run build

# 2. Upload assets to R2
echo "☁️  Uploading assets to Cloudflare R2..."
# We use node to run our custom upload script
# Ensure environment variables are loaded (source .env.local if needed)
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi
node scripts/upload-to-r2.mjs

# 3. Deploy to Netlify
echo "🕸️ Deploying to Netlify..."
npx netlify deploy --prod

echo "✅ Deployment Successful!"
