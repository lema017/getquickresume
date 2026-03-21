#!/usr/bin/env node
/**
 * Read-only SEO / content inventory: placeholders, ES slug collisions, FAQ template dupes,
 * and optional --write-faq-allowlist to refresh scripts/seo-quality-allowlist.json for verify-seo-content Phase B.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MIN_FAQS = 4;

function normFaqQ(s) {
  return String(s)
    .toLowerCase()
    .replace(/\{[^}]+\}/g, 'TITLE')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const writeAllow = process.argv.includes('--write-faq-allowlist');

  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    configFile: path.join(ROOT, 'vite.config.ts'),
  });

  try {
    const profMod = await vite.ssrLoadModule('/src/data/professions/index.ts');
    await profMod.ensureProfessionsLoaded();
    const professions = await profMod.getAllProfessions();

    const placeholderHits = [];
    const esSlugToEn = new Map();
    const faqKeyToSlugs = new Map();
    const faqAllow = new Set();

    for (const p of professions) {
      const json = JSON.stringify(p.sampleResumeData || {}).toLowerCase();
      if (json.includes('alex') && json.includes('johnson')) {
        placeholderHits.push(p.slug);
      }

      if (p.es?.slug) {
        const k = p.es.slug;
        if (!esSlugToEn.has(k)) esSlugToEn.set(k, []);
        esSlugToEn.get(k).push(p.slug);
      }

      const enFaqN = (p.faqs || []).length;
      const esFaqN = p.es ? (p.es.faqs || []).length : MIN_FAQS;
      if (enFaqN < MIN_FAQS || (p.es && esFaqN < MIN_FAQS)) {
        faqAllow.add(p.slug);
      }

      for (const f of p.faqs || []) {
        const key = normFaqQ(f.question);
        if (!faqKeyToSlugs.has(key)) faqKeyToSlugs.set(key, []);
        faqKeyToSlugs.get(key).push(p.slug);
      }

    }

    const collisions = [...esSlugToEn.entries()].filter(([, arr]) => arr.length > 1);
    const dupFaqAcrossMany = [...faqKeyToSlugs.entries()].filter(
      ([k, slugs]) => k.length > 15 && slugs.length >= 8
    );

    console.log('--- Placeholder sampleResume (Alex Johnson) ---');
    console.log(`count: ${placeholderHits.length}`);
    if (placeholderHits.length) console.log('sample:', placeholderHits.slice(0, 15).join(', '));

    console.log('\n--- ES slug collisions (same es.slug, multiple EN) ---');
    console.log(`count: ${collisions.length}`);
    for (const [es, ens] of collisions.slice(0, 15)) {
      console.log(`  ${es} <- ${ens.join(', ')}`);
    }

    console.log('\n--- FAQ question repeated across many EN slugs (sample) ---');
    for (const [q, slugs] of dupFaqAcrossMany.slice(0, 8)) {
      console.log(`  (${slugs.length} slugs) ${q.slice(0, 80)}...`);
    }

    console.log('\n--- FAQ allowlist candidates (EN faqs <4 or ES faqs <4) ---');
    console.log(`count: ${faqAllow.size}`);

    if (writeAllow) {
      const out = {
        _comment:
          'EN profession slugs exempt from MIN_PROFESSION_FAQS in verify-seo-content.mjs. Shrink this list as you backfill FAQs. Regenerate with: node scripts/report-seo-inventory.mjs --write-faq-allowlist',
        professionFaqAllowlist: [...faqAllow].sort(),
      };
      fs.writeFileSync(path.join(__dirname, 'seo-quality-allowlist.json'), JSON.stringify(out, null, 2), 'utf-8');
      console.log('Wrote scripts/seo-quality-allowlist.json');
    }
  } finally {
    await vite.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
