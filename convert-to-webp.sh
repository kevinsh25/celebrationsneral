#!/bin/bash

# Define the target directory
TARGET_DIR="public/panos"

echo "🔍 Finding all .jpg files in $TARGET_DIR..."

# Count the number of files to process
TOTAL_FILES=$(find "$TARGET_DIR" -type f -iname "*.jpg" | wc -l | tr -d ' ')

if [ "$TOTAL_FILES" -eq 0 ]; then
    echo "✅ No JPG files found to convert."
    exit 0
fi

echo "🚀 Starting conversion of $TOTAL_FILES files to lossless WebP..."
echo "⚡️ Running 10 concurrent processes (optimized for Apple Silicon / M1)..."

# Find all JPGs and pipe them via null-separated strings to xargs
# -P 10 runs 10 processes in parallel
# cwebp -lossless converts to webp and preserves exact quality
# rm "$1" deletes the original jpg ONLY if the conversion was successful
find "$TARGET_DIR" -type f -iname "*.jpg" -print0 | xargs -0 -n 1 -P 10 sh -c '
    cwebp -quiet -lossless "$1" -o "${1%.*}.webp" && rm "$1"
' _

echo "🎉 Conversion complete! All files have been converted and original JPGs removed."
