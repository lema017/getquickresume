#!/usr/bin/env node
/**
 * Post-build prerender for /resume/:slug and /resume-skills/:slug (English + Spanish where `es` exists).
 *
 * Strategy (safety / cloaking):
 * - HEAD-ONLY: injects <title>, meta, canonical, hreflang, og/twitter, JSON-LD.
 *   No visible <main> before #root — avoids mismatch with React loading spinner + async data.
 * - Writes extensionless HTML files: dist/resume/{slug}, dist/resume-skills/{slug}
 *   S3/CloudFront serves them as real objects; mime for extensionless keys uses
 *   serverless-s3-sync defaultContentType: text/html (see serverless.yml).
 *
 * Run after: vite build  (reads dist/index.html template)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const DIST_INDEX = path.join(DIST, 'index.html');
const MANIFEST_OUT = path.join(DIST, 'seo-prerender-manifest.json');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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

function injectHead(html, injectBlock) {
  let out = html.replace(/<title>[^<]*<\/title>/i, '');
  out = out.replace(/<meta\s+name="description"[^>]*>/i, '');
  const idx = out.lastIndexOf('</head>');
  if (idx === -1) throw new Error('No </head> in dist/index.html');
  return out.slice(0, idx) + injectBlock + '\n' + out.slice(idx);
}

function buildLdJsonScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function buildHeadInject({ seo, ldBreadcrumb, ldFaq, ldPage, englishUrl, spanishUrl, ogLocale }) {
  const esAlternate =
    spanishUrl != null && spanishUrl !== ''
      ? `    <link rel="alternate" hreflang="es" href="${escapeHtml(spanishUrl)}" />\n`
      : '';
  return `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />
    <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="${escapeHtml(seo.ogType)}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />
    <meta property="og:site_name" content="GetQuickResume" />
    <meta property="og:image" content="${escapeHtml(seo.ogImage)}" />
    <meta property="og:locale" content="${ogLocale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />
    <link rel="alternate" hreflang="en" href="${escapeHtml(englishUrl)}" />
${esAlternate}    <link rel="alternate" hreflang="x-default" href="${escapeHtml(englishUrl)}" />
    ${buildLdJsonScript(ldBreadcrumb)}
    ${buildLdJsonScript(ldFaq)}
    ${buildLdJsonScript(ldPage)}
`;
}

function professionForSpanish(profession) {
  if (!profession.es) return null;
  const es = profession.es;
  return {
    ...profession,
    slug: es.slug,
    title: es.title,
    keywords: es.keywords,
    searchIntents: es.searchIntents,
    topSkills: es.topSkills,
    atsKeywords: es.atsKeywords,
    sampleResumeData: es.sampleResumeData,
    faqs: es.faqs,
    es: profession.es,
  };
}

function skillForSpanish(skill) {
  if (!skill.es) return null;
  const es = skill.es;
  return {
    ...skill,
    slug: es.slug,
    title: es.title,
    description: es.description,
    whyImportant: es.whyImportant,
    keywords: es.keywords,
    searchIntents: es.searchIntents,
    relatedSkills: es.relatedSkills,
    professionSlugs: es.professionSlugs,
    atsKeywords: es.atsKeywords,
    resumeTips: es.resumeTips,
    exampleBullets: es.exampleBullets,
    faqs: es.faqs,
    es: skill.es,
  };
}

async function main() {
  if (!fs.existsSync(DIST_INDEX)) {
    console.error('Missing dist/index.html — run vite build first.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(DIST_INDEX, 'utf-8');

  const skillMap = parseTsMappings(path.join(ROOT, 'src', 'data', 'skillSlugMappings.ts'));

  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    configFile: path.join(ROOT, 'vite.config.ts'),
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    strategy: 'head-only',
    professions: {},
    skills: {},
    professionsEs: {},
    skillsEs: {},
  };

  try {
    const profMod = await vite.ssrLoadModule('/src/data/professions/index.ts');
    const skillMod = await vite.ssrLoadModule('/src/data/skills/index.ts');
    const seoMod = await vite.ssrLoadModule('/src/utils/seoConfig.ts');

    await profMod.ensureProfessionsLoaded();
    await skillMod.ensureSkillsLoaded();

    const {
      BASE_URL,
      generateProfessionPageSEO,
      generateProfessionWebPageSchema,
      generateBreadcrumbSchema,
      generateFAQSchema,
      generateSkillPageSEO,
      generateSkillWebPageSchema,
    } = seoMod;

    const professions = await profMod.getAllProfessions();
    const skills = await skillMod.getAllSkills();

    fs.mkdirSync(path.join(DIST, 'resume'), { recursive: true });
    fs.mkdirSync(path.join(DIST, 'resume-skills'), { recursive: true });

    for (const profession of professions) {
      const slug = profession.slug;
      const seo = generateProfessionPageSEO(profession, 'en');
      const spanishSlug = profMod.getSpanishProfessionSlug(slug);
      const englishUrl = `${BASE_URL}/resume/${slug}`;
      const spanishUrl = spanishSlug ? `${BASE_URL}/resume/${spanishSlug}` : null;

      const breadcrumbs = [
        { name: 'Home', url: BASE_URL },
        { name: 'Resume Templates', url: `${BASE_URL}/create` },
        { name: `${profession.title} Resume`, url: seo.canonicalUrl },
      ];

      const ldBreadcrumb = generateBreadcrumbSchema(breadcrumbs);
      const ldFaq = generateFAQSchema(profession.faqs);
      const ldPage = generateProfessionWebPageSchema(profession, 'en');

      const inject = buildHeadInject({
        seo,
        ldBreadcrumb,
        ldFaq,
        ldPage,
        englishUrl,
        spanishUrl: spanishUrl || '',
        ogLocale: 'en_US',
      });

      const outHtml = injectHead(baseTemplate, inject);
      fs.writeFileSync(path.join(DIST, 'resume', slug), outHtml, 'utf-8');

      manifest.professions[slug] = {
        title: seo.title,
        description: seo.description,
        canonicalUrl: seo.canonicalUrl,
      };
    }

    for (const profession of professions) {
      const profEs = professionForSpanish(profession);
      if (!profEs) continue;

      const enSlug = profession.slug;
      const esSlug = profEs.slug;
      // Same path as EN prerender — only one static file; SPA serves locale by slug mapping.
      if (esSlug === enSlug) continue;
      const seo = generateProfessionPageSEO(profEs, 'es');
      const englishUrl = `${BASE_URL}/resume/${enSlug}`;
      const spanishUrl = `${BASE_URL}/resume/${esSlug}`;

      const breadcrumbs = [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Plantillas de CV', url: `${BASE_URL}/create` },
        { name: `Currículum de ${profEs.title}`, url: seo.canonicalUrl },
      ];

      const ldBreadcrumb = generateBreadcrumbSchema(breadcrumbs);
      const ldFaq = generateFAQSchema(profEs.faqs);
      const ldPage = generateProfessionWebPageSchema(profEs, 'es');

      const inject = buildHeadInject({
        seo,
        ldBreadcrumb,
        ldFaq,
        ldPage,
        englishUrl,
        spanishUrl,
        ogLocale: 'es_ES',
      });

      const outHtml = injectHead(baseTemplate, inject);
      fs.writeFileSync(path.join(DIST, 'resume', esSlug), outHtml, 'utf-8');

      manifest.professionsEs[esSlug] = {
        title: seo.title,
        description: seo.description,
        canonicalUrl: seo.canonicalUrl,
      };
    }

    for (const skill of skills) {
      const slug = skill.slug;
      const seo = generateSkillPageSEO(skill, 'en');
      const spanishSlug = skillMod.getSpanishSkillSlug(slug) || skillMap[slug];
      const englishUrl = `${BASE_URL}/resume-skills/${slug}`;
      const spanishUrl = spanishSlug ? `${BASE_URL}/resume-skills/${spanishSlug}` : null;

      const breadcrumbs = [
        { name: 'Home', url: BASE_URL },
        { name: 'Resume Skills', url: `${BASE_URL}/resume-skills` },
        { name: `${skill.title} Skills`, url: seo.canonicalUrl },
      ];

      const ldBreadcrumb = generateBreadcrumbSchema(breadcrumbs);
      const ldFaq = generateFAQSchema(skill.faqs);
      const ldPage = generateSkillWebPageSchema(skill, 'en');

      const inject = buildHeadInject({
        seo,
        ldBreadcrumb,
        ldFaq,
        ldPage,
        englishUrl,
        spanishUrl: spanishUrl || '',
        ogLocale: 'en_US',
      });

      const outHtml = injectHead(baseTemplate, inject);
      fs.writeFileSync(path.join(DIST, 'resume-skills', slug), outHtml, 'utf-8');

      manifest.skills[slug] = {
        title: seo.title,
        description: seo.description,
        canonicalUrl: seo.canonicalUrl,
      };
    }

    for (const skill of skills) {
      const skillEs = skillForSpanish(skill);
      if (!skillEs) continue;

      const enSlug = skill.slug;
      const esSlug = skillEs.slug;
      if (esSlug === enSlug) continue;
      const seo = generateSkillPageSEO(skillEs, 'es');
      const englishUrl = `${BASE_URL}/resume-skills/${enSlug}`;
      const spanishUrl = `${BASE_URL}/resume-skills/${esSlug}`;

      const breadcrumbs = [
        { name: 'Inicio', url: BASE_URL },
        { name: 'Habilidades para el CV', url: `${BASE_URL}/resume-skills` },
        { name: `Habilidades de ${skillEs.title}`, url: seo.canonicalUrl },
      ];

      const ldBreadcrumb = generateBreadcrumbSchema(breadcrumbs);
      const ldFaq = generateFAQSchema(skillEs.faqs);
      const ldPage = generateSkillWebPageSchema(skillEs, 'es');

      const inject = buildHeadInject({
        seo,
        ldBreadcrumb,
        ldFaq,
        ldPage,
        englishUrl,
        spanishUrl,
        ogLocale: 'es_ES',
      });

      const outHtml = injectHead(baseTemplate, inject);
      fs.writeFileSync(path.join(DIST, 'resume-skills', esSlug), outHtml, 'utf-8');

      manifest.skillsEs[esSlug] = {
        title: seo.title,
        description: seo.description,
        canonicalUrl: seo.canonicalUrl,
      };
    }
  } finally {
    await vite.close();
  }

  fs.writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2), 'utf-8');

  const nProf = Object.keys(manifest.professions).length;
  const nSkill = Object.keys(manifest.skills).length;
  const nProfEs = Object.keys(manifest.professionsEs).length;
  const nSkillEs = Object.keys(manifest.skillsEs).length;
  console.log(
    `Prerendered ${nProf} profession + ${nSkill} skill (EN) and ${nProfEs} profession + ${nSkillEs} skill (ES) URLs (head-only).`
  );
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST_OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
