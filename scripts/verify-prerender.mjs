#!/usr/bin/env node
/**
 * CI-friendly checks: manifest vs prerendered HTML (title + description + canonical).
 * Optional: set SMOKE_ONLY=1 to verify a small random sample (faster in dev).
 *
 * Manual post-deploy (Search Console) — run in browser / GSC UI:
 * - URL Inspection on samples of /resume/* and /resume-skills/* (EN + ES)
 * - Monitor Coverage, Page indexing, hreflang
 * - Compare "View crawled page" vs live for contradictions
 *
 * "Crawled – currently not indexed" (GSC): export a sample of those URLs from the
 * Page indexing report, then for each URL confirm canonical matches the intended
 * loc, titles/descriptions are not near-duplicates across templates, and the site
 * links in (profession pages link to /resume-skills/* and /create; see ProfessionResumePage).
 *
 * Offline sampling vs prod: extract locs from sitemap XML (e.g. ripgrep loc tags),
 * then curl that URL and check rel="canonical" matches the URL.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const MANIFEST = path.join(DIST, 'seo-prerender-manifest.json');

const SMOKE_SAMPLE = 5;

function decodeHtmlEntities(s) {
  if (!s) return s;
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? decodeHtmlEntities(m[1].trim()) : null;
}

function extractMetaDescription(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return m ? decodeHtmlEntities(m[1]) : null;
}

function extractCanonical(html) {
  const m = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  return m ? m[1] : null;
}

function assertContains(html, needle, label) {
  if (!html.includes(needle)) {
    throw new Error(`${label}: expected substring not found:\n${needle.slice(0, 120)}...`);
  }
}

function sampleKeys(obj, max) {
  const keys = Object.keys(obj);
  if (!Number.isFinite(max) || keys.length <= max) return keys;
  const step = Math.ceil(keys.length / max);
  const out = [];
  for (let i = 0; i < keys.length && out.length < max; i += step) out.push(keys[i]);
  return out;
}

function verifySection({
  manifestSection,
  distSubdir,
  label,
  smoke,
  requireJsonLd,
  errorsRef,
}) {
  const keys = smoke ? sampleKeys(manifestSection, SMOKE_SAMPLE) : Object.keys(manifestSection);
  for (const slug of keys) {
    const filePath = path.join(DIST, distSubdir, slug);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing prerender file: ${filePath}`);
      errorsRef.n++;
      continue;
    }
    const html = fs.readFileSync(filePath, 'utf-8');
    const exp = manifestSection[slug];
    try {
      const title = extractTitle(html);
      if (title !== exp.title) {
        throw new Error(`title mismatch for ${label} ${slug}\n  manifest: ${exp.title}\n  html:     ${title}`);
      }
      const desc = extractMetaDescription(html);
      if (desc !== exp.description) {
        throw new Error(`description mismatch for ${label} ${slug}`);
      }
      const can = extractCanonical(html);
      if (can !== exp.canonicalUrl) {
        throw new Error(
          `canonical mismatch for ${label} ${slug}\n  manifest: ${exp.canonicalUrl}\n  html:     ${can}`
        );
      }
      assertContains(html, '<div id="root"></div>', `${label} ${slug} must keep SPA root`);
      if (requireJsonLd) {
        assertContains(html, 'application/ld+json', `${label} ${slug} must include JSON-LD`);
      }
    } catch (e) {
      console.error(e.message || e);
      errorsRef.n++;
    }
  }
  return keys.length;
}

function main() {
  if (!fs.existsSync(MANIFEST)) {
    console.error('Missing dist/seo-prerender-manifest.json — run prerender after build.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf-8'));
  const smoke = process.env.SMOKE_ONLY === '1';

  const professionsEs = manifest.professionsEs || {};
  const skillsEs = manifest.skillsEs || {};

  const errorsRef = { n: 0 };

  const nProf = verifySection({
    manifestSection: manifest.professions,
    distSubdir: 'resume',
    label: 'profession',
    smoke,
    requireJsonLd: true,
    errorsRef,
  });

  const nProfEs = verifySection({
    manifestSection: professionsEs,
    distSubdir: 'resume',
    label: 'profession (ES)',
    smoke,
    requireJsonLd: true,
    errorsRef,
  });

  const nSkill = verifySection({
    manifestSection: manifest.skills,
    distSubdir: 'resume-skills',
    label: 'skill',
    smoke,
    requireJsonLd: false,
    errorsRef,
  });

  const nSkillEs = verifySection({
    manifestSection: skillsEs,
    distSubdir: 'resume-skills',
    label: 'skill (ES)',
    smoke,
    requireJsonLd: false,
    errorsRef,
  });

  if (errorsRef.n) {
    console.error(`\nverify-prerender: ${errorsRef.n} error(s).`);
    process.exit(1);
  }

  console.log(
    `verify-prerender: OK (${nProf} profession + ${nProfEs} profession ES + ${nSkill} skill + ${nSkillEs} skill ES files checked${smoke ? ', SMOKE_ONLY' : ''}).`
  );
}

main();
