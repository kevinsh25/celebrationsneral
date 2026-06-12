/**
 * generate-blur-placeholders.mjs
 * Reads every villa / gallery WebP, creates a tiny 8x8 blurred base64 image,
 * and writes the result to scripts/blur-placeholders.json
 */
import sharp from 'sharp';
import { readdir, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function toBlurDataURL(filePath) {
  const buf = await sharp(filePath)
    .resize(8, 8, { fit: 'inside' })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walkDir(full));
    else if (/\.(webp|png|jpg)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function main() {
  const villasDir = join(publicDir, 'villas');
  const galleryDir = join(publicDir, 'gallery');

  const allFiles = [
    ...await walkDir(villasDir).catch(() => []),
    ...await walkDir(galleryDir).catch(() => []),
  ];

  console.log(`Processing ${allFiles.length} images…`);

  const result = {};
  let done = 0;
  for (const file of allFiles) {
    const key = '/' + relative(publicDir, file).replace(/\\/g, '/');
    result[key] = await toBlurDataURL(file);
    done++;
    process.stdout.write(`\r  ${done}/${allFiles.length}`);
  }

  console.log('\nDone!');
  const outPath = join(__dirname, 'blur-placeholders.json');
  await writeFile(outPath, JSON.stringify(result, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch(console.error);
