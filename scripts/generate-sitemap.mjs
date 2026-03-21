#!/usr/bin/env node
/**
 * Generates a sitemap index + 5 sub-sitemaps:
 *   sitemap.xml              (sitemap index)
 *   sitemap-pages.xml        (static pages + blog)
 *   sitemap-professions-en.xml
 *   sitemap-professions-es.xml
 *   sitemap-skills-en.xml
 *   sitemap-skills-es.xml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const PROFESSIONS_DIR = path.join(ROOT, 'src', 'data', 'professions');
const SKILLS_DIR = path.join(ROOT, 'src', 'data', 'skills');
const SITE_URL = 'https://getquickresume.com';

const BLOG_SLUGS = [
  'how-to-make-good-resume',
  'what-is-ats-system',
  'resume-tips-for-career-changers',
  'common-resume-mistakes',
  'how-to-write-a-resume',
  'how-to-make-a-resume',
  'how-far-back-should-a-resume-go',
  'should-i-put-gpa-on-resume',
];

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/create', priority: '0.9', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { path: '/ats-resume-checker', priority: '0.8', changefreq: 'monthly' },
  { path: '/resume-translator', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  { path: '/premium', priority: '0.7', changefreq: 'monthly' },
  // Category hubs (must match src/data/professions/categoryHubMeta.ts PROFESSION_CATEGORY_HUB_IDS)
  { path: '/resumes/finance', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/engineering', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/education', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/healthcare', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/sales', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/operations', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/design', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/legal', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/hospitality', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/trades', priority: '0.72', changefreq: 'weekly' },
  { path: '/resumes/general', priority: '0.72', changefreq: 'weekly' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractSlugs(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  const re = /slug:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

function collectEnglishSlugs(dir, excludeFiles) {
  const files = fs.readdirSync(dir).filter(
    (f) => f.endsWith('.ts') && !f.endsWith('-es.ts') && !excludeFiles.includes(f)
  );
  const all = new Set();
  for (const file of files) {
    for (const slug of extractSlugs(path.join(dir, file))) {
      all.add(slug);
    }
  }
  return [...all].sort();
}

// ---------------------------------------------------------------------------
// XML builders
// ---------------------------------------------------------------------------

function xmlHeader() {
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
}

function xmlFooter() {
  return '</urlset>\n';
}

function urlEntry(loc, { lastmod, changefreq, priority, hreflangs }) {
  let xml = '  <url>\n';
  xml += `    <loc>${loc}</loc>\n`;
  xml += `    <lastmod>${lastmod}</lastmod>\n`;
  xml += `    <changefreq>${changefreq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  if (hreflangs) {
    for (const hl of hreflangs) {
      xml += `    <xhtml:link rel="alternate" hreflang="${hl.lang}" href="${hl.href}" />\n`;
    }
  }
  xml += '  </url>\n';
  return xml;
}

function buildSitemapIndex(sitemapNames, today) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const name of sitemapNames) {
    xml += '  <sitemap>\n';
    xml += `    <loc>${SITE_URL}/${name}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  }
  xml += '</sitemapindex>\n';
  return xml;
}

// ---------------------------------------------------------------------------
// Locale pairs (must match prerender-seo-pages.mjs: only ES URLs with .es and es.slug !== en slug)
// ---------------------------------------------------------------------------

async function loadProgrammaticLocalePairs() {
  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    configFile: path.join(ROOT, 'vite.config.ts'),
  });
  try {
    const profMod = await vite.ssrLoadModule('/src/data/professions/index.ts');
    const skillMod = await vite.ssrLoadModule('/src/data/skills/index.ts');
    await profMod.ensureProfessionsLoaded();
    await skillMod.ensureSkillsLoaded();
    const professions = await profMod.getAllProfessions();
    const skills = await skillMod.getAllSkills();

    const professionEnToEs = new Map();
    const professionEsToEn = new Map();
    for (const p of professions) {
      if (!p.es?.slug || p.es.slug === p.slug) continue;
      professionEnToEs.set(p.slug, p.es.slug);
      professionEsToEn.set(p.es.slug, p.slug);
    }

    const skillEnToEs = new Map();
    const skillEsToEn = new Map();
    for (const s of skills) {
      if (!s.es?.slug || s.es.slug === s.slug) continue;
      skillEnToEs.set(s.slug, s.es.slug);
      skillEsToEn.set(s.es.slug, s.slug);
    }

    const professionEsSlugs = [...professionEsToEn.keys()].sort();
    const skillEsSlugs = [...skillEsToEn.keys()].sort();

    return {
      professionEnToEs,
      professionEsToEn,
      professionEsSlugs,
      skillEnToEs,
      skillEsToEn,
      skillEsSlugs,
    };
  } finally {
    await vite.close();
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const today = new Date().toISOString().split('T')[0];

console.log('Loading EN↔ES slug pairs from profession/skill data (Vite SSR)...');
const {
  professionEnToEs,
  professionEsToEn,
  professionEsSlugs,
  skillEnToEs,
  skillEsToEn,
  skillEsSlugs,
} = await loadProgrammaticLocalePairs();
console.log(
  `  ${professionEnToEs.size} EN profession URLs with hreflang ES, ${professionEsSlugs.length} unique ES profession URLs; ` +
    `${skillEnToEs.size} EN skills with hreflang ES, ${skillEsSlugs.length} unique ES skill URLs`
);

console.log('Collecting English slugs from data files...');
const professionSlugs = collectEnglishSlugs(PROFESSIONS_DIR, ['index.ts', '_helpers.ts']);
const skillSlugs = collectEnglishSlugs(SKILLS_DIR, ['index.ts']);
console.log(`  ${professionSlugs.length} professions, ${skillSlugs.length} skills`);

// 1. sitemap-pages.xml
let pagesXml = xmlHeader();
for (const pg of STATIC_PAGES) {
  pagesXml += urlEntry(`${SITE_URL}${pg.path}`, { lastmod: today, changefreq: pg.changefreq, priority: pg.priority });
}
for (const slug of BLOG_SLUGS) {
  pagesXml += urlEntry(`${SITE_URL}/blog/${slug}`, { lastmod: today, changefreq: 'weekly', priority: '0.6' });
}
pagesXml += xmlFooter();

// 2. sitemap-professions-en.xml
let profEnXml = xmlHeader();
for (const slug of professionSlugs) {
  const esSlug = professionEnToEs.get(slug);
  const hreflangs = esSlug
    ? [
        { lang: 'en', href: `${SITE_URL}/resume/${slug}` },
        { lang: 'es', href: `${SITE_URL}/resume/${esSlug}` },
        { lang: 'x-default', href: `${SITE_URL}/resume/${slug}` },
      ]
    : [
        { lang: 'en', href: `${SITE_URL}/resume/${slug}` },
        { lang: 'x-default', href: `${SITE_URL}/resume/${slug}` },
      ];
  profEnXml += urlEntry(`${SITE_URL}/resume/${slug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.8',
    hreflangs,
  });
}
profEnXml += xmlFooter();

// 3. sitemap-professions-es.xml (only URLs that exist in prerender + manifest)
let profEsXml = xmlHeader();
for (const esSlug of professionEsSlugs) {
  const enSlug = professionEsToEn.get(esSlug);
  if (!enSlug) continue;
  profEsXml += urlEntry(`${SITE_URL}/resume/${esSlug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.8',
    hreflangs: [
      { lang: 'en', href: `${SITE_URL}/resume/${enSlug}` },
      { lang: 'es', href: `${SITE_URL}/resume/${esSlug}` },
      { lang: 'x-default', href: `${SITE_URL}/resume/${enSlug}` },
    ],
  });
}
profEsXml += xmlFooter();

// 4. sitemap-skills-en.xml
let skillEnXml = xmlHeader();
for (const slug of skillSlugs) {
  const esSlug = skillEnToEs.get(slug);
  const hreflangs = esSlug
    ? [
        { lang: 'en', href: `${SITE_URL}/resume-skills/${slug}` },
        { lang: 'es', href: `${SITE_URL}/resume-skills/${esSlug}` },
        { lang: 'x-default', href: `${SITE_URL}/resume-skills/${slug}` },
      ]
    : [
        { lang: 'en', href: `${SITE_URL}/resume-skills/${slug}` },
        { lang: 'x-default', href: `${SITE_URL}/resume-skills/${slug}` },
      ];
  skillEnXml += urlEntry(`${SITE_URL}/resume-skills/${slug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.7',
    hreflangs,
  });
}
skillEnXml += xmlFooter();

// 5. sitemap-skills-es.xml
let skillEsXml = xmlHeader();
for (const esSlug of skillEsSlugs) {
  const enSlug = skillEsToEn.get(esSlug);
  if (!enSlug) continue;
  skillEsXml += urlEntry(`${SITE_URL}/resume-skills/${esSlug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.7',
    hreflangs: [
      { lang: 'en', href: `${SITE_URL}/resume-skills/${enSlug}` },
      { lang: 'es', href: `${SITE_URL}/resume-skills/${esSlug}` },
      { lang: 'x-default', href: `${SITE_URL}/resume-skills/${enSlug}` },
    ],
  });
}
skillEsXml += xmlFooter();

// 6. sitemap.xml (index)
const subSitemaps = [
  'sitemap-pages.xml',
  'sitemap-professions-en.xml',
  'sitemap-professions-es.xml',
  'sitemap-skills-en.xml',
  'sitemap-skills-es.xml',
];
const indexXml = buildSitemapIndex(subSitemaps, today);

// Write files
const files = {
  'sitemap.xml': indexXml,
  'sitemap-pages.xml': pagesXml,
  'sitemap-professions-en.xml': profEnXml,
  'sitemap-professions-es.xml': profEsXml,
  'sitemap-skills-en.xml': skillEnXml,
  'sitemap-skills-es.xml': skillEsXml,
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(PUBLIC, name), content, 'utf-8');
}

const totalUrls =
  STATIC_PAGES.length +
  BLOG_SLUGS.length +
  professionSlugs.length +
  professionEsSlugs.length +
  skillSlugs.length +
  skillEsSlugs.length;

console.log('\nSitemap files generated:');
for (const name of Object.keys(files)) {
  const size = (fs.statSync(path.join(PUBLIC, name)).size / 1024).toFixed(1);
  console.log(`  ${name} (${size} KB)`);
}
console.log(`\nTotal URLs across all sitemaps: ${totalUrls}`);
