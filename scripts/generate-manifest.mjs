#!/usr/bin/env node
/**
 * Auto-generates public/templates/manifest.json from the template files on disk.
 *
 * For each .js file in public/templates/designs/:
 *   - Reads the header comment to extract `name` (falls back to humanized filename)
 *   - Checks if a matching thumbnail exists in public/templates/thumbnails/
 *   - Writes the manifest with id, name, category, thumbnail, and js paths
 *
 * Usage:
 *   node scripts/generate-manifest.mjs
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DESIGNS_DIR = join(ROOT, 'public', 'templates', 'designs');
const THUMBS_DIR = join(ROOT, 'public', 'templates', 'thumbnails');
const MANIFEST_PATH = join(ROOT, 'public', 'templates', 'manifest.json');

function humanize(id) {
  return id
    .replace(/^gqr-resume-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractName(jsCode) {
  const match = jsCode.match(/\*\s*name:\s*(.+)/);
  if (match) return match[1].trim().replace(/^["']|["']$/g, '');
  return null;
}

const files = readdirSync(DESIGNS_DIR)
  .filter((f) => f.endsWith('.js'))
  .sort();

const templates = files.map((file) => {
  const id = file.replace('.js', '');
  const jsCode = readFileSync(join(DESIGNS_DIR, file), 'utf-8').slice(0, 500);
  const extractedName = extractName(jsCode);
  const name = extractedName || humanize(id);
  const hasThumbnail = existsSync(join(THUMBS_DIR, `${id}.webp`));

  return {
    id,
    name,
    category: 'free',
    thumbnail: hasThumbnail ? `/templates/thumbnails/${id}.webp` : null,
    js: `/templates/designs/${id}.js`,
  };
});

const manifest = {
  version: new Date().toISOString().slice(0, 10),
  count: templates.length,
  templates,
};

writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

console.log(`Manifest written: ${MANIFEST_PATH}`);
console.log(`  ${templates.length} templates, ${templates.filter((t) => t.thumbnail).length} with thumbnails`);
