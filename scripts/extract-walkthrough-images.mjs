/**
 * extract-walkthrough-images.mjs
 *
 * Reads the maharaja (or fiesta) walkthrough index.html, extracts every
 * base64-embedded image, converts each to WebP (max 3840px) using sharp,
 * saves them as 01.webp, 02.webp … in a `scenes/` sub-folder, and rewrites
 * the HTML so every data-URI is replaced by the CDN URL.
 *
 * Usage:
 *   node scripts/extract-walkthrough-images.mjs maharaja
 *   node scripts/extract-walkthrough-images.mjs fiesta
 *
 * After running:
 *   1. Upload public/villas/{villa}/walkthrough/scenes/*.webp  to R2
 *   2. The rewritten index.html is already saved in-place (original backed up)
 */

import { readFile, writeFile, mkdir, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const villa = process.argv[2] ?? 'maharaja';
const htmlPath = join(__dirname, '..', 'public', 'villas', villa, 'walkthrough', 'index.html');
const scenesDir = join(dirname(htmlPath), 'scenes');

// Images use a relative path since index.html and scenes/ sit in the same
// walkthrough/ directory on R2 — no CDN URL needed.

async function main() {
  console.log(`\n🏠  Villa: ${villa}`);
  console.log(`📄  Reading: ${htmlPath}\n`);

  const raw = await readFile(htmlPath, 'utf-8');
  const originalSize = Buffer.byteLength(raw, 'utf-8');
  console.log(`   Original size: ${(originalSize / 1024 / 1024).toFixed(1)} MB`);

  await mkdir(scenesDir, { recursive: true });

  // Backup original
  await copyFile(htmlPath, htmlPath + '.bak');
  console.log(`   Backup saved: index.html.bak`);

  // Regex to find all embedded images
  const RE = /data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=]+)/g;

  let idx = 0;
  const replacements = []; // { original, cdnUrl }

  // First pass — extract unique data URIs (deduplicate)
  const seen = new Map();
  let match;
  const reTest = new RegExp(RE.source, 'g');
  while ((match = reTest.exec(raw)) !== null) {
    const full = match[0];
    if (!seen.has(full)) seen.set(full, ++idx);
  }

  console.log(`\n   Found ${seen.size} unique embedded image(s)\n`);

  // Second pass — convert and save each
  let processed = 0;
  for (const [dataUri, i] of seen.entries()) {
    const num = String(i).padStart(2, '0');
    const outName = `${num}.webp`;
    const outPath = join(scenesDir, outName);
    const cdnUrl = `scenes/${outName}`;

    // Decode base64 → Buffer
    const b64 = dataUri.replace(/^data:image\/[^;]+;base64,/, '');
    const buf = Buffer.from(b64, 'base64');

    // Convert to WebP, resize if larger than 3840px on longest side
    const meta = await sharp(buf).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const MAX = 3840;

    let pipeline = sharp(buf);
    if (w > MAX || h > MAX) {
      if (w >= h) pipeline = pipeline.resize(MAX, null, { fit: 'inside' });
      else         pipeline = pipeline.resize(null, MAX, { fit: 'inside' });
    }

    await pipeline.webp({ quality: 85 }).toFile(outPath);

    const stat = await import('fs').then(m => m.statSync(outPath));
    processed++;
    process.stdout.write(
      `   [${processed}/${seen.size}] ${num}.webp  (${w}×${h} → ${(stat.size / 1024).toFixed(0)} KB)\n`
    );

    replacements.push({ dataUri, cdnUrl });
  }

  // Rewrite HTML — replace each data URI with its CDN URL
  let html = raw;
  for (const { dataUri, cdnUrl } of replacements) {
    // Use split/join to avoid regex special-char issues with the base64 payload
    html = html.split(dataUri).join(cdnUrl);
  }

  await writeFile(htmlPath, html, 'utf-8');
  const newSize = Buffer.byteLength(html, 'utf-8');
  console.log(`\n✅  Done!`);
  console.log(`   New HTML size : ${(newSize / 1024).toFixed(0)} KB  (was ${(originalSize / 1024 / 1024).toFixed(1)} MB)`);
  console.log(`\n📤  Next steps:`);
  console.log(`   1. Upload scenes/*.webp to R2: public/villas/${villa}/walkthrough/scenes/`);
  console.log(`   2. Upload the rewritten index.html to R2: public/villas/${villa}/walkthrough/`);
  console.log(`   3. Run the existing upload-to-r2.mjs or copy to R2 manually`);
}

main().catch(e => { console.error(e); process.exit(1); });
