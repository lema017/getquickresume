#!/usr/bin/env node
/**
 * Validates resolved profession/skill content meets minimum bar (overview length, FAQ count, etc.).
 * Uses Vite SSR — run from repo root after dependencies installed.
 *
 * Phases (incremental tightening):
 * - Phase A: overview, responsibilities, mistakes, bullets, skill fields (current numeric gates).
 * - Phase B: MIN_PROFESSION_FAQS (default 4) for EN + ES snapshots; use seo-quality-allowlist.json
 *   to exempt legacy EN slugs until editorial backfill removes them from the list.
 * - Phase C (future): duplicate FAQ / domain-richness heuristics in a separate report script, not here.
 *
 * Orthogonal: scripts/verify-sitemap.mjs checks sitemap <-> manifest <-> dist file presence only.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// --- Phase A (structural minimums) ---
const MIN_PROFESSION_OVERVIEW_WORDS_EN = 110;
const MIN_PROFESSION_OVERVIEW_WORDS_ES = 110;
const MIN_PROFESSION_RESPONSIBILITIES = 5;
const MIN_PROFESSION_MISTAKES = 4;
const MIN_PROFESSION_BULLETS = 5;
const MIN_SKILL_OVERVIEW_WORDS_EN = 90;
const MIN_SKILL_OVERVIEW_WORDS_ES = 90;
const MIN_SKILL_HOWTO = 2;
const MIN_SKILL_EXAMPLE_BULLETS = 4;

// --- Phase B ---
const MIN_PROFESSION_FAQS = 4;

const ALLOWLIST_PATH = path.join(__dirname, 'seo-quality-allowlist.json');

function loadFaqAllowlist() {
  if (!fs.existsSync(ALLOWLIST_PATH)) return new Set();
  try {
    const j = JSON.parse(fs.readFileSync(ALLOWLIST_PATH, 'utf-8'));
    const arr = j.professionFaqAllowlist;
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.map(String));
  } catch {
    return new Set();
  }
}

function wordCount(s) {
  return String(s)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function checkProfession(p, resolveMod, lang, faqAllowlist, enSlugForAllowlist) {
  const issues = [];
  const resolved = resolveMod.resolveProfessionPage(p, lang);
  const wc = wordCount(resolved.content.overview);
  const minOv = lang === 'es' ? MIN_PROFESSION_OVERVIEW_WORDS_ES : MIN_PROFESSION_OVERVIEW_WORDS_EN;
  if (wc < minOv) issues.push(`overview word count ${wc} (<${minOv}) slug=${p.slug} lang=${lang}`);
  if (resolved.content.responsibilities.length < MIN_PROFESSION_RESPONSIBILITIES) {
    issues.push(`responsibilities slug=${p.slug} lang=${lang}`);
  }
  if (resolved.content.resumeMistakes.length < MIN_PROFESSION_MISTAKES) {
    issues.push(`mistakes slug=${p.slug} lang=${lang}`);
  }
  if (resolved.content.suggestedBullets.length < MIN_PROFESSION_BULLETS) {
    issues.push(`bullets slug=${p.slug} lang=${lang}`);
  }
  if (!faqAllowlist.has(enSlugForAllowlist)) {
    if (!p.faqs || p.faqs.length < MIN_PROFESSION_FAQS) {
      issues.push(`faqs slug=${p.slug} lang=${lang} (need >=${MIN_PROFESSION_FAQS})`);
    }
  }
  return issues;
}

function checkSkill(s, resolveMod, lang) {
  const issues = [];
  const resolved = resolveMod.resolveSkillPage(s, lang);
  const wc = wordCount(resolved.content.overview);
  const minOv = lang === 'es' ? MIN_SKILL_OVERVIEW_WORDS_ES : MIN_SKILL_OVERVIEW_WORDS_EN;
  if (wc < minOv) issues.push(`skill overview ${wc} (<${minOv}) slug=${s.slug}`);
  if (resolved.content.howToShowOnResume.length < MIN_SKILL_HOWTO) issues.push(`howTo slug=${s.slug}`);
  if (resolved.content.expandedExampleBullets.length < MIN_SKILL_EXAMPLE_BULLETS) {
    issues.push(`skill bullets slug=${s.slug}`);
  }
  return issues;
}

async function main() {
  const faqAllowlist = loadFaqAllowlist();

  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    configFile: path.join(ROOT, 'vite.config.ts'),
  });

  let allIssues = [];

  try {
    const profMod = await vite.ssrLoadModule('/src/data/professions/index.ts');
    const skillMod = await vite.ssrLoadModule('/src/data/skills/index.ts');
    const resolveProf = await vite.ssrLoadModule('/src/data/professions/resolveProfessionPage.ts');
    const resolveSkill = await vite.ssrLoadModule('/src/data/skills/resolveSkillPage.ts');

    await profMod.ensureProfessionsLoaded();
    await skillMod.ensureSkillsLoaded();

    const professions = await profMod.getAllProfessions();
    const skills = await skillMod.getAllSkills();

    for (const p of professions) {
      allIssues.push(...checkProfession(p, resolveProf, 'en', faqAllowlist, p.slug));
      if (p.es) {
        const profEs = {
          ...p,
          slug: p.es.slug,
          title: p.es.title,
          keywords: p.es.keywords,
          searchIntents: p.es.searchIntents,
          topSkills: p.es.topSkills,
          atsKeywords: p.es.atsKeywords,
          sampleResumeData: p.es.sampleResumeData,
          faqs: p.es.faqs,
          categoryId: p.es.categoryId ?? p.categoryId,
          content: p.es.content ?? p.content,
          seo: p.es.seo ?? p.seo,
        };
        allIssues.push(...checkProfession(profEs, resolveProf, 'es', faqAllowlist, p.slug));
      }
    }

    for (const s of skills) {
      allIssues.push(...checkSkill(s, resolveSkill, 'en'));
      if (s.es) {
        const skEs = {
          ...s,
          slug: s.es.slug,
          title: s.es.title,
          description: s.es.description,
          whyImportant: s.es.whyImportant,
          keywords: s.es.keywords,
          searchIntents: s.es.searchIntents,
          relatedSkills: s.es.relatedSkills,
          professionSlugs: s.es.professionSlugs,
          atsKeywords: s.es.atsKeywords,
          resumeTips: s.es.resumeTips,
          exampleBullets: s.es.exampleBullets,
          faqs: s.es.faqs,
          familyId: s.es.familyId ?? s.familyId,
          content: s.es.content ?? s.content,
          seo: s.es.seo ?? s.seo,
        };
        allIssues.push(...checkSkill(skEs, resolveSkill, 'es'));
      }
    }
  } finally {
    await vite.close();
  }

  if (allIssues.length) {
    console.error('verify-seo-content failed:');
    for (const i of allIssues.slice(0, 40)) console.error(' -', i);
    if (allIssues.length > 40) console.error(` ... and ${allIssues.length - 40} more`);
    process.exit(1);
  }

  console.log('verify-seo-content: OK');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
