#!/usr/bin/env node
/**
 * Extracts unique EN resume-sample slugs from Kickresume sitemaps and compares
 * them to our profession + skill slugs. Outputs the list of "Kickresume sample
 * roles we don't have as professions or skills" (exact slug match).
 *
 * Usage: node scripts/compare-kickresume-roles.mjs
 * Output: docs/marketing/kickresume/kickresume_roles_not_in_gqr.txt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const KICKRESUME_DIR = path.join(ROOT, 'docs', 'marketing', 'kickresume');
const PUBLIC = path.join(ROOT, 'public');
const OUT_FILE = path.join(KICKRESUME_DIR, 'kickresume_roles_not_in_gqr.txt');

const EN_RESUME_SAMPLE_RE = /kickresume\.com\/en\/help-center\/([a-z0-9-]+)-resume-sample/g;
const GQR_RESUME_LOC_RE = /<loc>https:\/\/getquickresume\.com\/resume\/([^<]+)<\/loc>/g;
const GQR_SKILL_LOC_RE = /<loc>https:\/\/getquickresume\.com\/resume-skills\/([^<]+)<\/loc>/g;

function extractAll(regex, text) {
  const set = new Set();
  let m;
  while ((m = regex.exec(text)) !== null) set.add(m[1]);
  return set;
}

function loadKickresumeSlugs() {
  const slugs = new Set();
  const files = fs.readdirSync(KICKRESUME_DIR).filter((f) =>
    f.startsWith('sitemap-resume-sample') && f.endsWith('.xml') && !f.includes('category')
  );
  for (const file of files) {
    const content = fs.readFileSync(path.join(KICKRESUME_DIR, file), 'utf-8');
    for (const slug of extractAll(new RegExp(EN_RESUME_SAMPLE_RE.source, 'g'), content)) {
      slugs.add(slug);
    }
  }
  return slugs;
}

function loadGqrProfessionSlugs() {
  const content = fs.readFileSync(path.join(PUBLIC, 'sitemap-professions-en.xml'), 'utf-8');
  return extractAll(new RegExp(GQR_RESUME_LOC_RE.source, 'g'), content);
}

function loadGqrSkillSlugs() {
  const content = fs.readFileSync(path.join(PUBLIC, 'sitemap-skills-en.xml'), 'utf-8');
  return extractAll(new RegExp(GQR_SKILL_LOC_RE.source, 'g'), content);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const kickresume = loadKickresumeSlugs();
const gqrProfessions = loadGqrProfessionSlugs();
const gqrSkills = loadGqrSkillSlugs();
const gqrAll = new Set([...gqrProfessions, ...gqrSkills]);

const notInGqr = [...kickresume].filter((s) => !gqrAll.has(s)).sort();

fs.writeFileSync(OUT_FILE, notInGqr.join('\n') + '\n', 'utf-8');

console.log('Kickresume vs GQR profession/skill slug comparison');
console.log('---------------------------------------------------');
console.log('Kickresume EN resume-sample slugs (unique):', kickresume.size);
console.log('GQR profession slugs:                        ', gqrProfessions.size);
console.log('GQR skill slugs:                             ', gqrSkills.size);
console.log('Kickresume slugs not in GQR (exact match):   ', notInGqr.length);
console.log('');
console.log('Full list written to:', path.relative(ROOT, OUT_FILE));
