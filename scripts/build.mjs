import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public');

const ROOT_FILES = ['index.html', 'sitemap.xml'];
const ASSET_DIR = 'assets';
const ASSET_EXCLUDES = new Set(['assets/images/og-share.svg']);

function rmrf(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) rmrf(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyAssets(srcDir, destDir, rel = ASSET_DIR) {
  let count = 0;
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const relPath = path.posix.join(rel.replace(/\\/g, '/'), entry.name);
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      count += copyAssets(src, dest, relPath);
      continue;
    }

    if (ASSET_EXCLUDES.has(relPath)) continue;

    copyFile(src, dest);
    count += 1;
  }
  return count;
}

rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });

let fileCount = 0;

for (const file of ROOT_FILES) {
  const src = path.join(ROOT, file);
  if (!fs.existsSync(src)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
  copyFile(src, path.join(OUT, file));
  fileCount += 1;
}

const assetsSrc = path.join(ROOT, ASSET_DIR);
if (!fs.existsSync(assetsSrc)) {
  console.error(`Missing required directory: ${ASSET_DIR}/`);
  process.exit(1);
}

fileCount += copyAssets(assetsSrc, path.join(OUT, ASSET_DIR));

console.log(`Built ${fileCount} files to ${path.relative(ROOT, OUT)}/`);
