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
  { path: '/login', priority: '0.4', changefreq: 'monthly' },
  { path: '/premium', priority: '0.7', changefreq: 'monthly' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseTsMappings(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const map = {};
  const re = /['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    map[m[1]] = m[2];
  }
  return map;
}

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
// Main
// ---------------------------------------------------------------------------

const today = new Date().toISOString().split('T')[0];

console.log('Parsing slug mappings...');
const professionMap = parseTsMappings(path.join(ROOT, 'src', 'data', 'professionSlugMappings.ts'));
const skillMap = parseTsMappings(path.join(ROOT, 'src', 'data', 'skillSlugMappings.ts'));
console.log(`  ${Object.keys(professionMap).length} profession mappings, ${Object.keys(skillMap).length} skill mappings`);

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
  const esSlug = professionMap[slug] || slug;
  profEnXml += urlEntry(`${SITE_URL}/resume/${slug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.8',
    hreflangs: [
      { lang: 'en', href: `${SITE_URL}/resume/${slug}` },
      { lang: 'es', href: `${SITE_URL}/resume/${esSlug}` },
      { lang: 'x-default', href: `${SITE_URL}/resume/${slug}` },
    ],
  });
}
profEnXml += xmlFooter();

// 3. sitemap-professions-es.xml
let profEsXml = xmlHeader();
for (const slug of professionSlugs) {
  const esSlug = professionMap[slug] || slug;
  profEsXml += urlEntry(`${SITE_URL}/resume/${esSlug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.8',
    hreflangs: [
      { lang: 'en', href: `${SITE_URL}/resume/${slug}` },
      { lang: 'es', href: `${SITE_URL}/resume/${esSlug}` },
      { lang: 'x-default', href: `${SITE_URL}/resume/${slug}` },
    ],
  });
}
profEsXml += xmlFooter();

// 4. sitemap-skills-en.xml
let skillEnXml = xmlHeader();
for (const slug of skillSlugs) {
  const esSlug = skillMap[slug] || slug;
  skillEnXml += urlEntry(`${SITE_URL}/resume-skills/${slug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.7',
    hreflangs: [
      { lang: 'en', href: `${SITE_URL}/resume-skills/${slug}` },
      { lang: 'es', href: `${SITE_URL}/resume-skills/${esSlug}` },
      { lang: 'x-default', href: `${SITE_URL}/resume-skills/${slug}` },
    ],
  });
}
skillEnXml += xmlFooter();

// 5. sitemap-skills-es.xml
let skillEsXml = xmlHeader();
for (const slug of skillSlugs) {
  const esSlug = skillMap[slug] || slug;
  skillEsXml += urlEntry(`${SITE_URL}/resume-skills/${esSlug}`, {
    lastmod: today, changefreq: 'monthly', priority: '0.7',
    hreflangs: [
      { lang: 'en', href: `${SITE_URL}/resume-skills/${slug}` },
      { lang: 'es', href: `${SITE_URL}/resume-skills/${esSlug}` },
      { lang: 'x-default', href: `${SITE_URL}/resume-skills/${slug}` },
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

const totalUrls = STATIC_PAGES.length + BLOG_SLUGS.length
  + professionSlugs.length * 2
  + skillSlugs.length * 2;

console.log('\nSitemap files generated:');
for (const name of Object.keys(files)) {
  const size = (fs.statSync(path.join(PUBLIC, name)).size / 1024).toFixed(1);
  console.log(`  ${name} (${size} KB)`);
}
console.log(`\nTotal URLs across all sitemaps: ${totalUrls}`);
