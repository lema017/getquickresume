#!/usr/bin/env node
/**
 * Cross-check programmatic sitemap <loc> entries vs prerender manifest + dist files.
 * Run after: npm run generate:sitemap && npm run build (or build:prod)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DIST = path.join(ROOT, 'dist');
const MANIFEST = path.join(DIST, 'seo-prerender-manifest.json');

const SITE_HOST = 'https://getquickresume.com';

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

function slugFromResumeUrl(url) {
  if (!url.startsWith(SITE_HOST + '/resume/')) return null;
  return decodeURIComponent(url.slice((SITE_HOST + '/resume/').length));
}

function slugFromSkillUrl(url) {
  if (!url.startsWith(SITE_HOST + '/resume-skills/')) return null;
  return decodeURIComponent(url.slice((SITE_HOST + '/resume-skills/').length));
}

function main() {
  let errors = 0;

  if (!fs.existsSync(MANIFEST)) {
    console.error('verify-sitemap: missing dist/seo-prerender-manifest.json — run build with prerender first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8'));

  const profEnPath = path.join(PUBLIC, 'sitemap-professions-en.xml');
  const profEsPath = path.join(PUBLIC, 'sitemap-professions-es.xml');
  const skEnPath = path.join(PUBLIC, 'sitemap-skills-en.xml');
  const skEsPath = path.join(PUBLIC, 'sitemap-skills-es.xml');
  const indexPath = path.join(PUBLIC, 'sitemap.xml');

  for (const p of [profEnPath, profEsPath, skEnPath, skEsPath, indexPath]) {
    if (!fs.existsSync(p)) {
      console.error(`verify-sitemap: missing ${path.relative(ROOT, p)} — run npm run generate:sitemap`);
      errors++;
    }
  }
  if (errors) process.exit(1);

  const indexXml = fs.readFileSync(indexPath, 'utf-8');
  const expectedChildren = [
    'sitemap-pages.xml',
    'sitemap-professions-en.xml',
    'sitemap-professions-es.xml',
    'sitemap-skills-en.xml',
    'sitemap-skills-es.xml',
  ];
  for (const name of expectedChildren) {
    if (!indexXml.includes(`/${name}<`)) {
      console.error(`verify-sitemap: sitemap.xml should reference ${name}`);
      errors++;
    }
  }

  const profEn = extractLocs(fs.readFileSync(profEnPath, 'utf-8'));
  const profEs = extractLocs(fs.readFileSync(profEsPath, 'utf-8'));
  const skEn = extractLocs(fs.readFileSync(skEnPath, 'utf-8'));
  const skEs = extractLocs(fs.readFileSync(skEsPath, 'utf-8'));

  function checkProg(loc, kind, section) {
    const slug = kind === 'prof' ? slugFromResumeUrl(loc) : slugFromSkillUrl(loc);
    if (!slug) {
      console.error(`verify-sitemap: bad URL in ${section}: ${loc}`);
      errors++;
      return;
    }
    const man =
      section.includes('professions-en')
        ? manifest.professions?.[slug]
        : section.includes('professions-es')
          ? manifest.professionsEs?.[slug]
          : section.includes('skills-en')
            ? manifest.skills?.[slug]
            : manifest.skillsEs?.[slug];
    if (!man) {
      console.error(`verify-sitemap: no manifest entry for ${slug} (${section})`);
      errors++;
    }
    const distSub = kind === 'prof' ? 'resume' : 'resume-skills';
    const filePath = path.join(DIST, distSub, slug);
    if (!fs.existsSync(filePath)) {
      console.error(`verify-sitemap: missing prerender file ${path.relative(ROOT, filePath)}`);
      errors++;
    }
  }

  profEn.forEach((loc) => checkProg(loc, 'prof', 'professions-en'));
  profEs.forEach((loc) => checkProg(loc, 'prof', 'professions-es'));
  skEn.forEach((loc) => checkProg(loc, 'skill', 'skills-en'));
  skEs.forEach((loc) => checkProg(loc, 'skill', 'skills-es'));

  function reverseManifest(section, mapKey) {
    const sectionMap = manifest[mapKey] || {};
    const locSlugs = new Set(
      (mapKey.includes('professions') ? (mapKey.endsWith('Es') ? profEs : profEn) : mapKey.endsWith('Es') ? skEs : skEn).map(
        (u) => (mapKey.includes('professions') ? slugFromResumeUrl(u) : slugFromSkillUrl(u))
      )
    );
    for (const slug of Object.keys(sectionMap)) {
      if (!locSlugs.has(slug)) {
        console.error(`verify-sitemap: manifest ${mapKey} has "${slug}" but no matching <loc> in sitemap`);
        errors++;
      }
    }
  }

  reverseManifest('en prof', 'professions');
  reverseManifest('es prof', 'professionsEs');
  reverseManifest('en skill', 'skills');
  reverseManifest('es skill', 'skillsEs');

  if (errors) {
    console.error(`\nverify-sitemap: ${errors} error(s).`);
    process.exit(1);
  }

  console.log(
    `verify-sitemap: OK (${profEn.length} + ${profEs.length} profession URLs, ${skEn.length} + ${skEs.length} skill URLs checked).`
  );
}

main();
