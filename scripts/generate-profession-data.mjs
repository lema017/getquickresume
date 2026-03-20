#!/usr/bin/env node
/**
 * Bulk profession data generator for GQR.
 *
 * Reads the Kickresume slug gap list, cleans/classifies each slug, calls
 * OpenAI gpt-4o to generate full English ProfessionPageData + Spanish
 * ProfessionEsData for each, then writes category-based TS data files and
 * updates professionSlugMappings.ts.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-profession-data.mjs
 *
 * Options (env vars):
 *   RESUME_FROM=<slug>   Skip everything before this slug (for resuming interrupted runs)
 *   DRY_RUN=1            Print cleaned slugs only, no API calls
 *   CONCURRENCY=10       Max simultaneous OpenAI requests (default: 8)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Load .env file manually (Node doesn't read it automatically)
// ---------------------------------------------------------------------------
const envFile = path.join(ROOT, '.env');
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DRY_RUN = process.env.DRY_RUN === '1';
const RESUME_FROM = process.env.RESUME_FROM || null;
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '3', 10);
// When true, re-generates only entries that previously got the generic fallback
const REGEN_FALLBACKS = process.env.REGEN_FALLBACKS === '1';

const SLUGS_FILE = path.join(ROOT, 'docs/marketing/kickresume/kickresume_slugs_not_in_gqr.txt');
const PROFESSIONS_DIR = path.join(ROOT, 'src/data/professions');
const MAPPINGS_FILE = path.join(ROOT, 'src/data/professionSlugMappings.ts');

if (!DRY_RUN && !OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY environment variable is required.');
  console.error('Usage: OPENAI_API_KEY=sk-... node scripts/generate-profession-data.mjs');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Slug cleaning helpers
// ---------------------------------------------------------------------------

// Company/brand prefixes to skip entirely
const COMPANY_PREFIXES = [
  'amazon-', 'accenture-', 'walmart-', 'adidas-', 'volvo-', 'air-france-',
  'workfront-', 'xometry-', 'yamaha-', 'yelp-', 'zeiders-', 'you-first-services-',
  'williams-sonoma-', 'american-water-resources', 'aequs-',
  'aeromobil-', 'waldorf-astoria-', 'zearn-', 'caterpillar',
  'marketsmith-', 'saint-paul-public-schools', 'first-church-boston',
  'trendsetterz', 'workfront-', 'maniere-de-voir-', 'king-abdulaziz-',
  'sheridan-college-', 'mehran-university', 'northeast-catholic-',
  'platinum-edge-', 'morning-context', 'iyuno-sdi', 'able-industries',
  'kacst', 'atcom', 'gdit',
];

// Company/brand suffixes to strip from within slugs (not full skip, just clean the suffix)
const COMPANY_SUFFIXES_TO_STRIP = [
  '-charles-swab', '-at-zearn', '-at-caterpillar', '-at-able-industries',
  '-at-the-morning-context', '-in-atcom', '-trendsetterz',
  '-at-gdit',
];

// Skip patterns (exact or contains)
const SKIP_PATTERNS = [
  /^action-words/,
  /^volunteering$/,
  /^work-experience$/,
  /resume-sample$/,
  /^american-water/,
  /^vp-engineering-resume/,
  /^2nd-line-administrator-websupport$/,
  /^webmasterwebmestre/,
  /curriculum-ejemplo/,
  /amostra-de$/,
  /^analista-con-experiencia/,
  /^analista-de-laboratorio/,
  /^agente-de-trafico/,
  /french-\d+$/,
];

// Spanish suffix patterns
const SPANISH_PATTERNS = [
  /-es$/,
  /-curriculum-/,
  /^analista-/,
  /^agente-/,
];

function isSpanishSlug(slug) {
  return SPANISH_PATTERNS.some((p) => p.test(slug));
}

function shouldSkip(slug) {
  if (COMPANY_PREFIXES.some((p) => slug.startsWith(p))) return true;
  if (SKIP_PATTERNS.some((p) => p.test(slug))) return true;
  if (isSpanishSlug(slug)) return true;
  return false;
}

function cleanSlug(raw) {
  let s = raw.trim().toLowerCase();
  // Strip trailing dashes and spaces
  s = s.replace(/[-\s]+$/, '');
  // Strip company suffixes embedded in slugs
  for (const suffix of COMPANY_SUFFIXES_TO_STRIP) {
    if (s.endsWith(suffix)) {
      s = s.slice(0, s.length - suffix.length);
    }
  }
  // Strip numeric suffixes like -1, -2, -3 at end
  s = s.replace(/-\d+$/, '');
  // Strip common junk suffixes
  s = s.replace(/-(sample|example|resume|template|cv)$/, '');
  return s;
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ---------------------------------------------------------------------------
// Category classification
// ---------------------------------------------------------------------------

// NOTE: Order matters — earlier rules win. More specific categories are listed first.
const CATEGORY_RULES = [
  // Healthcare — check before tech (medical-engineer, clinical-engineer etc → healthcare)
  {
    name: 'healthcare',
    templateStyle: 'professional',
    test: (slug) => {
      const healthTerms = [
        'nurse', 'doctor', 'physician', 'medical', 'therapist', 'therapy',
        'dental', 'dentist', 'pharmacy', 'pharmacist', 'surgeon', 'radiology',
        'radiologist', 'physical-therapy', 'occupational-therapy', 'speech-language',
        'mental-health', 'psychiatr', 'psycholog', 'clinical-', '-clinical',
        'paramedic', 'emt', 'caregiver', 'home-health', 'aba-therapist', 'audiologist',
        'optometrist', 'chiropractor', 'pediatr', 'obstetric', 'gynecolog',
        'healthcare', 'hospital', 'phlebotomist', '-cna', '-lpn', '-rn-', 'rn-',
        'addiction-counselor', 'behavioral-health', 'social-worker', 'social-work',
        'health-coach', 'health-educator', 'community-health', 'public-health',
        'surgical', 'orthopedic', 'neurolog', 'cardiolog', 'oncolog', 'dialysis',
        'medical-assistant', 'patient-care', 'patient-advocate', 'hospice',
        'dietitian', 'nutritionist', 'respiratory', 'anesthes',
      ];
      return healthTerms.some((t) => slug.includes(t));
    },
  },
  // Legal
  {
    name: 'legal',
    templateStyle: 'professional',
    test: (slug) => {
      const legalTerms = [
        'attorney', 'lawyer', 'paralegal', 'legal-', '-legal', 'compliance-',
        'judge', 'prosecutor', 'litigation', 'corporate-counsel', 'law-',
        'legal-analyst', 'legal-assistant', 'legal-secretary', 'legal-intern',
      ];
      return legalTerms.some((t) => slug.includes(t));
    },
  },
  // Science
  {
    name: 'science',
    templateStyle: 'professional',
    test: (slug) => {
      const sciTerms = [
        'scientist', 'biologist', 'chemist', 'physicist', 'geologist', 'astronomer',
        'ecologist', 'environmental-scientist', 'microbiologist', 'zoologist',
        'laboratory-', 'lab-technician', 'lab-analyst', 'forensic-scientist',
        'oceanographer', 'archaeologist', 'epidemiologist', 'biomedical-scientist',
        'biochemist', 'agricultural-scientist', 'materials-scientist',
        'food-scientist', 'marine-biologist', 'geneticist', 'toxicologist',
      ];
      return sciTerms.some((t) => slug.includes(t));
    },
  },
  // Education — teacher/professor/instructor patterns (before tech catches 'instructor')
  {
    name: 'education',
    templateStyle: 'professional',
    test: (slug) => {
      const eduTerms = [
        'teacher', 'professor', 'tutor', 'educator', 'principal-', 'school-principal',
        'librarian', 'adjunct-', 'faculty-', 'kindergarten', 'kindergarden',
        'grade-teacher', 'adult-education', 'visiting-professor', 'visiting-assistant-professor',
        'special-education', 'montessori', 'preschool-teacher', 'high-school-',
        'elementary-teacher', 'secondary-teacher', 'primary-teacher',
        'teacher-assistant', 'teachers-aide', 'school-paraprofessional',
        'curriculum-designer', 'curriculum-development', 'curriculum-vitae',
        'paraprofessional', 'teaching-artist', 'teaching-artists', 'school-counselor',
        'academic-advisor-', 'dean-of', 'supervisor-of-student', 'bilingual-teacher',
        '-teacher', 'language-teacher', 'bible-teacher',
      ];
      return eduTerms.some((t) => slug.includes(t));
    },
  },
  // Marketing — before creative (advertising, content, etc.)
  {
    name: 'marketing',
    templateStyle: 'creative',
    test: (slug) => {
      const mktTerms = [
        'marketing-', '-marketing', 'brand-', '-brand-', 'social-media-',
        'seo-', 'sem-', 'ppc-', 'digital-marketing', 'advertising-', '-advertising',
        'public-relations', 'communications-', 'influencer-', 'growth-hacker',
        'email-marketing', 'market-research', 'market-analyst', 'campaign-manager',
        'media-buyer', 'media-planner', 'media-strategist',
      ];
      return mktTerms.some((t) => slug.includes(t));
    },
  },
  // Hospitality — before business (manager → hospitality if context matches)
  {
    name: 'hospitality',
    templateStyle: 'professional',
    test: (slug) => {
      const hospTerms = [
        'waiter', 'waitress', 'server-', 'bartender', 'barista', 'chef-', '-chef',
        'restaurant-', 'hotel-', 'hostess', '-hostess', 'catering-', '-catering',
        'food-', 'beverage-', 'hospitality-', 'wedding-', 'concierge',
        'front-desk-', 'housekeeper', 'housekeeping', 'sommelier', 'pastry-',
        'baker-', 'dishwasher', 'busser', 'banquet-', 'resort-', 'cruise-',
        'line-cook', 'sous-chef', 'prep-cook', 'kitchen-manager',
        'wait-staff', 'food-service', 'dining-',
      ];
      return hospTerms.some((t) => slug.includes(t));
    },
  },
  // Sales — before business
  {
    name: 'sales',
    templateStyle: 'professional',
    test: (slug) => {
      const salesTerms = [
        'sales-', '-sales', 'account-executive', 'business-development-',
        'bdr-', 'sdr-', 'account-representative', 'sales-manager', 'sales-director',
        'retail-associate', 'inside-sales', 'outside-sales', 'sales-engineer',
        'pre-sales', 'channel-sales', 'territory-manager', 'regional-sales',
        'national-sales', 'vp-of-sales', 'chief-revenue',
      ];
      return salesTerms.some((t) => slug.includes(t));
    },
  },
  // Trades — physical/manual work
  {
    name: 'trades',
    templateStyle: 'professional',
    test: (slug) => {
      const tradeTerms = [
        'electrician', 'plumber', 'welder', 'mechanic-', '-mechanic', 'carpenter',
        'construction-', '-construction', 'truck-driver', 'bus-driver',
        'forklift-operator', 'machine-operator', 'machinist', 'hvac-',
        'foreman', 'laborer', 'general-contractor', 'warehouse-', '-warehouse',
        'logistics-', 'supply-chain', 'stocker', 'material-handler',
        'sheet-metal', 'pipefitter', 'ironworker', 'boilermaker', 'well-driller',
        'maintenance-', '-maintenance', 'facilities-', 'janitor', 'custodian',
        'landscaper', 'groundskeeper', 'agricultural-worker', 'farm-worker',
        'driver-', '-driver', 'delivery-', 'courier', 'freight-', 'shipping-',
        'package-handler', 'production-worker', 'assembly-',
      ];
      return tradeTerms.some((t) => slug.includes(t));
    },
  },
  // Creative — art, design, performance, writing
  {
    name: 'creative',
    templateStyle: 'creative',
    test: (slug) => {
      const creativeTerms = [
        'designer', '-design', 'design-', 'artist', 'graphic-', 'illustrator',
        'animator', 'photographer', 'videographer', 'writer', '-writer',
        'editor', '-editor', 'journalist', 'author', 'copywriter', 'creative-director',
        'art-director', 'ux-', 'ui-', 'user-experience', 'user-interface',
        'fashion-', 'stylist', 'wardrobe-', 'visual-', 'performer', 'actor',
        'acting-', 'musician', 'composer', 'choreographer', 'dancer', 'film-',
        '3d-artist', 'visual-effects', 'game-designer', 'web-designer', 'web-editor',
        'storyboard', 'screenwriter', 'sound-designer', 'motion-graphic',
        'multimedia-', 'producer-', '-producer', 'interior-design', 'jewelry-designer',
        'game-producer', 'level-designer', 'make-up-artist', 'hair-stylist',
        'studio-artist', 'ghost-writer', 'ghostwriter', 'travel-writer',
        'photo-editor', 'flash-designer', 'music-composer', 'rfic-designer',
        'ic-designer', 'ic-layout', 'mask-ic', 'footwear-designer', 'kitchen-designer',
      ];
      return creativeTerms.some((t) => slug.includes(t));
    },
  },
  // Tech — engineering, development, IT
  {
    name: 'tech',
    templateStyle: 'professional',
    test: (slug) => {
      const techTerms = [
        'developer', 'engineer', 'programmer', 'software-', 'devops', 'sysadmin',
        'system-admin', 'network-', '-network', 'database-', 'cloud-', 'cyber-',
        '-security', 'quality-assurance', 'frontend', 'backend', 'full-stack',
        'fullstack', 'mobile-dev', 'ios-dev', 'android-dev', 'machine-learning',
        'artificial-intelligence', 'blockchain-', 'it-', 'helpdesk', 'support-engineer',
        'scrum-master', 'product-owner', 'technical-', 'algorithm-', 'embedded-',
        'firmware-', 'infrastructure-', 'site-reliability', 'platform-engineer',
        'api-developer', 'web-developer', 'web-administrator', 'webmaster',
        'ab-initio', 'salesforce-', 'erp-', 'sap-', 'abap-', 'linux-',
        'windows-system', 'wireless-engineer', 'asic-', 'fpga-', 'analog-',
        'semiconductor', 'telecom-', '-telecom', 'rf-engineer', 'antenna-',
        'cto', 'chief-technology', 'vp-engineering', 'director-of-engineering',
        '-architect', 'solutions-architect', 'data-engineer', 'data-scientist',
        'data-analyst', 'business-intelligence', 'machine-', '-automation',
      ];
      return techTerms.some((t) => slug.includes(t));
    },
  },
  // Business — broad catch for finance, admin, HR, ops, management
  {
    name: 'business',
    templateStyle: 'professional',
    test: (slug) => {
      const bizTerms = [
        'manager', 'analyst', 'coordinator', 'administrator', 'officer', 'director',
        'executive', 'consultant', 'specialist', 'supervisor', 'associate',
        'intern', 'accountant', 'accounting-', 'finance-', 'financial-',
        'budget-', 'payroll-', 'audit-', 'controller', 'treasurer', 'cfo',
        'hr-', 'human-resources', 'recruiter', 'talent-', 'operations-',
        'project-manager', 'program-manager', 'business-analyst', 'strategy-',
        'management', 'procurement', 'purchasing', 'buyer', 'inventory-',
        'planning-', 'scheduler', 'dispatcher', 'customer-service', 'customer-success',
        'call-center', 'office-manager', 'receptionist', 'clerk', 'secretary',
        'administrative', 'ceo', 'coo', 'president-', 'vice-president', 'vp-',
        'chief-', 'assistant-', 'admin-', 'office-',
      ];
      return bizTerms.some((t) => slug.includes(t));
    },
  },
];

function classifySlug(slug) {
  for (const cat of CATEGORY_RULES) {
    if (cat.test(slug)) {
      return { category: cat.name, templateStyle: cat.templateStyle };
    }
  }
  return { category: 'misc', templateStyle: 'professional' };
}

// ---------------------------------------------------------------------------
// Load existing slugs to skip duplicates
// ---------------------------------------------------------------------------

function loadExistingSlugs() {
  const content = fs.readFileSync(MAPPINGS_FILE, 'utf-8');
  const slugs = new Set();
  const re = /['"]([^'"]+)['"]\s*:/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    slugs.add(m[1]);
  }
  return slugs;
}

// Load slugs that have REAL (non-fallback) data in existing batch files
function loadRealDataSlugs() {
  const real = new Set();
  const batchFiles = fs.readdirSync(PROFESSIONS_DIR).filter(
    (f) => f.startsWith('gqr-batch-') && !f.endsWith('-es.ts')
  );
  for (const file of batchFiles) {
    const content = fs.readFileSync(path.join(PROFESSIONS_DIR, file), 'utf-8');
    const slugMatches = [...content.matchAll(/^\s+slug: '([^']+)'/gm)].map((m) => m[1]);
    const abcPositions = [];
    let idx = 0;
    while ((idx = content.indexOf("'ABC Corporation'", idx)) !== -1) {
      abcPositions.push(idx);
      idx++;
    }
    for (let i = 0; i < slugMatches.length; i++) {
      const slug = slugMatches[i];
      const slugPos = content.indexOf(`slug: '${slug}'`);
      const nextSlugPos =
        i < slugMatches.length - 1
          ? content.indexOf(`slug: '${slugMatches[i + 1]}'`)
          : content.length;
      const hasFallback = abcPositions.some((p) => p > slugPos && p < nextSlugPos);
      if (!hasFallback) real.add(slug);
    }
  }
  return real;
}

// ---------------------------------------------------------------------------
// OpenAI API call
// ---------------------------------------------------------------------------

async function openAIRequest(messages, retries = 4) {
  const body = JSON.stringify({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.7,
    response_format: { type: 'json_object' },
    max_tokens: 2000,
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    await new Promise((r) => setTimeout(r, Math.random() * 500));

    try {
      const result = await new Promise((resolve, reject) => {
        const req = https.request(
          {
            hostname: 'api.openai.com',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Length': Buffer.byteLength(body),
            },
            timeout: 60000,
          },
          (res) => {
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
              const raw = Buffer.concat(chunks).toString('utf-8');
              if (res.statusCode === 429 || res.statusCode >= 500) {
                reject(new Error(`HTTP ${res.statusCode}: ${raw.slice(0, 200)}`));
                return;
              }
              if (!raw || raw.trim() === '') {
                reject(new Error(`Empty body (status ${res.statusCode})`));
                return;
              }
              try {
                resolve(JSON.parse(raw));
              } catch (e) {
                reject(new Error(`JSON parse error (${raw.length} bytes): ${raw.slice(0, 100)}`));
              }
            });
            res.on('error', reject);
          }
        );
        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Request timeout after 60s'));
        });
        req.write(body);
        req.end();
      });

      const content = result.choices?.[0]?.message?.content;
      if (!content) {
        const reason = result.choices?.[0]?.finish_reason || 'unknown';
        throw new Error(`No content in response (finish_reason: ${reason})`);
      }
      return JSON.parse(content);
    } catch (err) {
      if (attempt === retries) throw err;
      const wait = Math.min(attempt * 5000 + Math.random() * 2000, 30000);
      console.warn(`  Retry ${attempt}/${retries} after ${Math.round(wait/1000)}s: ${err.message.slice(0, 100)}`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

// ---------------------------------------------------------------------------
// Generate English profession data
// ---------------------------------------------------------------------------

async function generateEnglishData(slug, title, category, templateStyle) {
  const prompt = `Generate resume page data for: "${title}". Return JSON:
{"title":"Proper Title","templateStyle":"${templateStyle}","keywords":["X resume","X CV template","X resume example","X curriculum vitae"],"searchIntents":["how to write a X resume","X resume examples","best X resume format"],"totalMonthlySearches":800,"topSkills":["skill1","skill2","skill3","skill4","skill5","skill6","skill7","skill8","skill9","skill10"],"atsKeywords":["kw1","kw2","kw3","kw4","kw5","kw6","kw7","kw8","kw9","kw10","kw11"],"firstName":"Alex","lastName":"Johnson","summary":"2-3 sentence summary with years of experience and quantified achievement.","skills":["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10"],"experience":[{"title":"Senior Title","company":"Real Company","startDate":"2021-03","isCurrent":true,"achievements":["Achievement with % or $ metric","Achievement with number metric","Achievement with business impact"]},{"title":"Title","company":"Real Company 2","startDate":"2018-06","endDate":"2021-02","achievements":["Achievement","Achievement","Achievement"]}],"education":[{"institution":"University","degree":"B.S.","field":"Relevant Field","startDate":"2014-08","endDate":"2018-05"}],"certifications":[{"name":"Cert Name","issuer":"Issuer","date":"2022-06"}],"faqs":[{"question":"What should a ${title} include on their resume?","answer":"Specific answer for this profession."},{"question":"How do I make my ${title} resume stand out?","answer":"Specific tips."},{"question":"What skills are most important for a ${title}?","answer":"Key skills explanation."}]}
Rules: real company names, metrics in achievements, profession-specific skills.
Uniqueness: the sampleResumeData.summary must mention at least one scenario or tool typical of THIS title (not generic "professional" filler). Each FAQ answer must reference duties, tools, or outcomes specific to "${title}"—avoid copy-pasting the same sentences you would use for unrelated roles. Vary achievement verbs across experience bullets (avoid repeating "Led" / "Managed" as every first word).`;

  return await openAIRequest([
    { role: 'system', content: 'Resume writer generating JSON data. Respond with valid JSON only, no markdown.' },
    { role: 'user', content: prompt },
  ]);
}

// ---------------------------------------------------------------------------
// Generate Spanish translation
// ---------------------------------------------------------------------------

async function generateSpanishData(slug, enData) {
  const title = enData.title || slug;
  const exp0 = enData.experience?.[0] || {};
  const exp1 = enData.experience?.[1] || {};
  const edu0 = enData.education?.[0] || {};
  const cert0 = enData.certifications?.[0];

  const prompt = `Translate this resume data to Latin American Spanish for profession: "${title}".
English title: "${title}"
English skills: ${JSON.stringify(enData.topSkills || [])}
English ATS: ${JSON.stringify(enData.atsKeywords || [])}
English summary: "${enData.summary || ''}"
Exp1: title="${exp0.title}", company="${exp0.company}", achievements=${JSON.stringify(exp0.achievements || [])}
Exp2: title="${exp1.title}", company="${exp1.company}", achievements=${JSON.stringify(exp1.achievements || [])}
Education: field="${edu0.field}"
${cert0 ? `Cert: "${cert0.name}"` : ''}

Return JSON:
{"slug":"spanish-url-slug","title":"Título ES","keywords":["currículum de X","CV de X","ejemplo currículum X","plantilla CV X"],"searchIntents":["cómo escribir currículum de X","ejemplos currículum X","mejor formato CV X"],"topSkills":["h1","h2","h3","h4","h5","h6","h7","h8","h9","h10"],"atsKeywords":["k1","k2","k3","k4","k5","k6","k7","k8","k9","k10","k11"],"summary":"Resumen en español.","skills":["h1","h2","h3","h4","h5","h6","h7","h8","h9","h10"],"experience":[{"title":"Título ES","company":"${exp0.company || ''}","startDate":"${exp0.startDate || '2021-01'}","isCurrent":true,"achievements":["Logro ES","Logro ES","Logro ES"]},{"title":"Título ES","company":"${exp1.company || ''}","startDate":"${exp1.startDate || '2018-01'}","endDate":"${exp1.endDate || '2021-01'}","achievements":["Logro ES","Logro ES","Logro ES"]}],"education":[{"institution":"${edu0.institution || ''}","degree":"${edu0.degree || 'B.S.'}","field":"Campo ES","startDate":"${edu0.startDate || '2014-08'}","endDate":"${edu0.endDate || '2018-05'}"}],"certifications":[${cert0 ? `{"name":"${cert0.name}","issuer":"${cert0.issuer}","date":"${cert0.date}"}` : ''}],"faqs":[{"question":"¿Qué debe incluir un ${title} en su currículum?","answer":"Respuesta específica."},{"question":"¿Cómo destacar mi currículum de ${title}?","answer":"Consejos específicos."},{"question":"¿Qué habilidades necesita un ${title}?","answer":"Habilidades clave."}]}
Rules: slug=lowercase hyphenated no accents, keep company/cert names in English, translate naturally.`;

  return await openAIRequest([
    { role: 'system', content: 'Spanish resume translator. Respond with valid JSON only, no markdown.' },
    { role: 'user', content: prompt },
  ]);
}

// ---------------------------------------------------------------------------
// TypeScript file builders
// ---------------------------------------------------------------------------

function escapeStr(s) {
  // Escape for use inside single-quoted TS strings
  return String(s || '')
    .replace(/\\/g, '\\\\')  // backslashes first
    .replace(/'/g, "\\'")    // single quotes
    .replace(/\r?\n/g, ' '); // newlines → space
}

// q() wraps a value in double quotes, escaping internal double quotes and backslashes
function q(s) {
  const str = String(s == null ? '' : s)
    .replace(/\r?\n|\r/g, ' ')   // collapse newlines to spaces
    .replace(/\\/g, '\\\\')      // escape backslashes first
    .replace(/"/g, '\\"');       // escape double quotes
  return '"' + str + '"';
}

// Single-quoted safe value — only use for values that CANNOT contain apostrophes (dates, simple slugs)
function qs(s) {
  const str = String(s == null ? '' : s)
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
  return "'" + str + "'";
}

function buildEnglishEntry(slug, enData, esSlug) {
  const d = enData;
  const firstName = d.firstName || 'Alex';
  const lastName = d.lastName || 'Johnson';
  const keywords = (d.keywords || []).map((k) => q(k)).join(', ');
  const searchIntents = (d.searchIntents || []).map((k) => q(k)).join(', ');
  const topSkills = (d.topSkills || []).map((k) => q(k)).join(', ');
  const atsKeywords = (d.atsKeywords || []).map((k) => q(k)).join(', ');
  const skills = (d.skills || d.topSkills || []).map((k) => q(k)).join(', ');

  const experience = (d.experience || []).map((exp) => {
    const achievements = (exp.achievements || []).map((a) => `            ${q(a)}`).join(',\n');
    const endDate = exp.endDate ? `\n          endDate: ${q(exp.endDate)},` : '';
    const isCurrent = exp.isCurrent ? `\n          isCurrent: true,` : '';
    return `        {
          title: ${q(exp.title)},
          company: ${q(exp.company)},
          startDate: ${q(exp.startDate)},${endDate}${isCurrent}
          achievements: [
${achievements},
          ],
        }`;
  }).join(',\n');

  const education = (d.education || []).map((edu) => {
    const endDate = edu.endDate ? `, endDate: ${q(edu.endDate)}` : '';
    return `        { institution: ${q(edu.institution)}, degree: ${q(edu.degree)}, field: ${q(edu.field)}, startDate: ${q(edu.startDate)}${endDate} }`;
  }).join(',\n');

  const certifications = (d.certifications || []).map((cert) => {
    return `        { name: ${q(cert.name)}, issuer: ${q(cert.issuer)}, date: ${q(cert.date)} }`;
  }).join(',\n');

  const faqs = (d.faqs || []).map((faq) => {
    return `      { question: ${q(faq.question)}, answer: ${q(faq.answer)} }`;
  }).join(',\n');

  return `  {
    slug: ${q(slug)},
    title: ${q(d.title || slugToTitle(slug))},
    templateStyle: ${q(d.templateStyle || 'professional')},
    keywords: [${keywords}],
    searchIntents: [${searchIntents}],
    totalMonthlySearches: ${d.totalMonthlySearches || 500},
    topSkills: [${topSkills}],
    atsKeywords: [${atsKeywords}],
    sampleResumeData: buildResumeData({
      firstName: ${q(firstName)},
      lastName: ${q(lastName)},
      profession: ${q(d.title || slugToTitle(slug))},
      summary: ${q(d.summary || '')},
      skills: [${skills}],
      experience: [
${experience},
      ],
      education: [
${education},
      ],
      certifications: [
${certifications},
      ],
    }),
    faqs: [
${faqs},
    ],
  }`;
}

function buildSpanishEntry(enSlug, esData, enData) {
  const d = esData;
  const firstName = enData.firstName || 'Alejandro';
  const lastName = enData.lastName || 'García';
  const keywords = (d.keywords || []).map((k) => q(k)).join(', ');
  const searchIntents = (d.searchIntents || []).map((k) => q(k)).join(', ');
  const topSkills = (d.topSkills || []).map((k) => q(k)).join(', ');
  const atsKeywords = (d.atsKeywords || []).map((k) => q(k)).join(', ');
  const skills = (d.skills || d.topSkills || []).map((k) => q(k)).join(', ');

  const experience = (d.experience || []).map((exp) => {
    const achievements = (exp.achievements || []).map((a) => `            ${q(a)}`).join(',\n');
    const endDate = exp.endDate ? `\n          endDate: ${q(exp.endDate)},` : '';
    const isCurrent = exp.isCurrent ? `\n          isCurrent: true,` : '';
    return `        {
          title: ${q(exp.title)},
          company: ${q(exp.company)},
          startDate: ${q(exp.startDate)},${endDate}${isCurrent}
          achievements: [
${achievements},
          ],
        }`;
  }).join(',\n');

  const education = (d.education || []).map((edu) => {
    const endDate = edu.endDate ? `, endDate: ${q(edu.endDate)}` : '';
    return `        { institution: ${q(edu.institution)}, degree: ${q(edu.degree)}, field: ${q(edu.field)}, startDate: ${q(edu.startDate)}${endDate} }`;
  }).join(',\n');

  const certifications = (d.certifications || []).map((cert) => {
    return `        { name: ${q(cert.name)}, issuer: ${q(cert.issuer)}, date: ${q(cert.date)} }`;
  }).join(',\n');

  const faqs = (d.faqs || []).map((faq) => {
    return `      { question: ${q(faq.question)}, answer: ${q(faq.answer)} }`;
  }).join(',\n');

  return `  ${q(enSlug)}: {
    slug: ${q(d.slug || enSlug)},
    title: ${q(d.title || slugToTitle(enSlug))},
    keywords: [${keywords}],
    searchIntents: [${searchIntents}],
    topSkills: [${topSkills}],
    atsKeywords: [${atsKeywords}],
    sampleResumeData: buildResumeData({
      firstName: ${q(firstName)},
      lastName: ${q(lastName)},
      profession: ${q(d.title || slugToTitle(enSlug))},
      summary: ${q(d.summary || '')},
      skills: [${skills}],
      experience: [
${experience},
      ],
      education: [
${education},
      ],
      certifications: [
${certifications},
      ],
    }),
    faqs: [
${faqs},
    ],
  }`;
}

// ---------------------------------------------------------------------------
// Concurrency limiter
// ---------------------------------------------------------------------------

async function runWithConcurrency(tasks, limit) {
  const results = [];
  let idx = 0;

  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // 1. Load existing slugs
  console.log('Loading existing slug mappings...');
  let existingSlugs;
  if (REGEN_FALLBACKS) {
    // In regen mode: only skip slugs that already have REAL data in the batch files
    existingSlugs = loadRealDataSlugs();
    console.log(`  ${existingSlugs.size} slugs with real data found (will skip these).`);
  } else {
    existingSlugs = loadExistingSlugs();
    console.log(`  ${existingSlugs.size} existing slugs found.`);
  }

  // 2. Read and clean the Kickresume slug list
  console.log('\nReading and cleaning Kickresume slug list...');
  const rawLines = fs.readFileSync(SLUGS_FILE, 'utf-8').split('\n');

  const seen = new Set();
  const cleanedSlugs = [];

  for (const line of rawLines) {
    const raw = line.trim();
    if (!raw) continue;

    const cleaned = cleanSlug(raw);
    if (!cleaned) continue;
    if (shouldSkip(cleaned)) continue;
    if (existingSlugs.has(cleaned)) continue;
    if (seen.has(cleaned)) continue;

    seen.add(cleaned);
    cleanedSlugs.push(cleaned);
  }

  console.log(`  ${cleanedSlugs.length} clean unique slugs to process (from ${rawLines.length} raw lines).`);

  if (DRY_RUN) {
    console.log('\nDRY RUN — listing slugs by category:\n');
    const byCat = {};
    for (const s of cleanedSlugs) {
      const { category } = classifySlug(s);
      if (!byCat[category]) byCat[category] = [];
      byCat[category].push(s);
    }
    for (const [cat, slugs] of Object.entries(byCat)) {
      console.log(`\n[${cat}] (${slugs.length}):`);
      slugs.forEach((s) => console.log(`  ${s}`));
    }
    return;
  }

  // 3. Classify slugs by category
  const byCategory = {};
  for (const slug of cleanedSlugs) {
    const { category, templateStyle } = classifySlug(slug);
    if (!byCategory[category]) byCategory[category] = [];
    byCategory[category].push({ slug, category, templateStyle });
  }

  const categories = Object.keys(byCategory);
  console.log('\nClassification summary:');
  for (const cat of categories) {
    console.log(`  ${cat}: ${byCategory[cat].length} professions`);
  }

  // Resume support: track progress
  const progressFile = path.join(ROOT, 'scripts/.generate-progress.json');
  let progress = {};
  if (fs.existsSync(progressFile)) {
    try {
      progress = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
      console.log(`\nResuming from progress file (${Object.keys(progress).length} already done).`);
    } catch (e) {
      progress = {};
    }
  }

  // 4. Generate data for all professions
  console.log('\nGenerating profession data with OpenAI gpt-4o...');
  const allResults = {}; // slug -> { enData, esData, category, templateStyle }

  let resumeActive = RESUME_FROM !== null;
  let processedCount = 0;
  let skippedCount = 0;
  const totalCount = cleanedSlugs.length;

  // Build task list
  const slugsToProcess = cleanedSlugs.filter((slug) => {
    if (progress[slug]) {
      // In REGEN_FALLBACKS mode: re-process anything marked as a fallback
      if (REGEN_FALLBACKS && progress[slug].isFallback) {
        return true;
      }
      allResults[slug] = progress[slug];
      skippedCount++;
      return false;
    }
    return true;
  });

  if (REGEN_FALLBACKS) {
    const fallbackCount = cleanedSlugs.filter((s) => progress[s]?.isFallback).length;
    console.log(`  REGEN_FALLBACKS mode: ${fallbackCount} fallback entries queued for re-generation.`);
  }

  console.log(`  ${skippedCount} already in progress cache, ${slugsToProcess.length} to generate.`);

  const tasks = slugsToProcess.map((slug) => async () => {
    const { category, templateStyle } = classifySlug(slug);
    const title = slugToTitle(slug);

    console.log(`  [${++processedCount}/${slugsToProcess.length}] Generating: ${slug} (${category})`);

    try {
      const enData = await generateEnglishData(slug, title, category, templateStyle);
      // Pause between EN and ES calls to stay within rate limits
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
      const esData = await generateSpanishData(slug, enData);

      const result = { enData, esData, category, templateStyle };
      progress[slug] = result;
      allResults[slug] = result;

      // Save progress incrementally
      fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));

      return result;
    } catch (err) {
      console.error(`  ERROR generating ${slug}: ${err.message}`);
      // Store a minimal fallback — isFallback:true marks it for REGEN_FALLBACKS mode
      const fallback = buildFallback(slug, title, category, templateStyle);
      fallback.isFallback = true;
      progress[slug] = fallback;
      allResults[slug] = fallback;
      fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
      return fallback;
    }
  });

  await runWithConcurrency(tasks, CONCURRENCY);

  // 5. Write TypeScript data files per category
  if (Object.keys(allResults).length === 0) {
    console.log('\nNo results to write — nothing to do.');
    return;
  }
  console.log('\nWriting TypeScript data files...');

  const newSlugMappings = {}; // enSlug -> esSlug

  for (const category of Object.keys(byCategory)) {
    const professions = byCategory[category];
    if (!professions.length) continue;

    const enEntries = [];
    const esEntries = [];

    for (const { slug } of professions) {
      const result = allResults[slug];
      if (!result) continue;

      const { enData, esData } = result;
      const esSlug = esData?.slug || slug;

      enEntries.push(buildEnglishEntry(slug, enData, esSlug));
      esEntries.push(buildSpanishEntry(slug, esData, enData));
      newSlugMappings[slug] = esSlug;
    }

    if (!enEntries.length) continue;

    // Write English file
    const enFile = path.join(PROFESSIONS_DIR, `gqr-batch-${category}.ts`);
    const enContent = `import { buildResumeData } from './_helpers';
import type { ProfessionPageData } from './index';

export const professions: ProfessionPageData[] = [
${enEntries.join(',\n')}
];
`;
    fs.writeFileSync(enFile, enContent, 'utf-8');
    console.log(`  Written: gqr-batch-${category}.ts (${enEntries.length} professions)`);

    // Write Spanish file
    const esFile = path.join(PROFESSIONS_DIR, `gqr-batch-${category}-es.ts`);
    const esContent = `import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
${esEntries.join(',\n')}
};
`;
    fs.writeFileSync(esFile, esContent, 'utf-8');
    console.log(`  Written: gqr-batch-${category}-es.ts (${esEntries.length} translations)`);
  }

  // 6. Append new slug mappings to professionSlugMappings.ts (skip already-present ones)
  console.log('\nUpdating professionSlugMappings.ts...');
  const mappingsContent = fs.readFileSync(MAPPINGS_FILE, 'utf-8');
  const alreadyInFile = new Set();
  const existingRe = /['"]([^'"]+)['"]\s*:/g;
  let em;
  while ((em = existingRe.exec(mappingsContent)) !== null) alreadyInFile.add(em[1]);

  const trulyNewMappings = Object.fromEntries(
    Object.entries(newSlugMappings).filter(([en]) => !alreadyInFile.has(en))
  );

  if (Object.keys(trulyNewMappings).length === 0) {
    console.log('  All slug mappings already present — no changes needed.');
  } else {
    const closingBraceIdx = mappingsContent.lastIndexOf('};');
    if (closingBraceIdx === -1) {
      console.error('  ERROR: Could not find closing }; in professionSlugMappings.ts');
    } else {
      const newEntries = Object.entries(trulyNewMappings)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([en, es]) => `  '${en}': '${es}',`)
        .join('\n');

      const updated =
        mappingsContent.slice(0, closingBraceIdx) +
        `  // GQR Batch additions\n${newEntries}\n` +
        mappingsContent.slice(closingBraceIdx);

      fs.writeFileSync(MAPPINGS_FILE, updated, 'utf-8');
      console.log(`  Added ${Object.keys(trulyNewMappings).length} new slug mappings.`);
    }
  }

  // 7. Summary
  const totalWritten = Object.keys(newSlugMappings).length;
  console.log('\n=== DONE ===');
  console.log(`  ${totalWritten} profession pages generated.`);
  console.log(`  ${Object.keys(byCategory).length * 2} data files written.`);
  console.log('\nNext steps:');
  console.log('  1. npm run generate:sitemap');
  console.log('  2. npm run build');
  console.log('  3. Remove OPENAI_API_KEY from .env');

  // Count fallbacks
  const fallbackCount = Object.values(progress).filter((r) => r.isFallback).length;
  if (fallbackCount > 0) {
    console.log(`\n  ⚠️  ${fallbackCount} professions used generic fallback data (API errors).`);
    console.log('  To regenerate them, run: REGEN_FALLBACKS=1 node scripts/generate-profession-data.mjs');
    console.log('  (Progress cache kept for REGEN_FALLBACKS run)');
  } else {
    // All real data — safe to clear cache
    if (fs.existsSync(progressFile)) {
      fs.unlinkSync(progressFile);
      console.log('\nProgress cache cleared — all professions have real AI data.');
    }
  }
}

// ---------------------------------------------------------------------------
// Fallback for failed API calls
// ---------------------------------------------------------------------------

function buildFallback(slug, title, category, templateStyle) {
  const firstName = 'Alex';
  const lastName = 'Johnson';
  return {
    category,
    templateStyle,
    enData: {
      title,
      templateStyle,
      firstName,
      lastName,
      keywords: [`${title} resume`, `${title} CV template`, `${title} resume example`],
      searchIntents: [`how to write a ${title} resume`, `${title} resume examples`, `best ${title} resume format`],
      totalMonthlySearches: 500,
      topSkills: ['Communication', 'Time Management', 'Problem Solving', 'Teamwork', 'Attention to Detail', 'Microsoft Office', 'Project Management', 'Customer Service', 'Leadership', 'Organization'],
      atsKeywords: ['professional experience', 'team collaboration', 'project management', 'results-oriented', 'detail-oriented', 'communication skills', 'leadership', 'problem solving', 'time management', 'quality assurance', 'continuous improvement'],
      summary: `Experienced ${title} with a proven track record of delivering high-quality results. Strong background in industry best practices with excellent communication and teamwork skills.`,
      skills: ['Communication', 'Time Management', 'Problem Solving', 'Teamwork', 'Attention to Detail', 'Microsoft Office', 'Project Management', 'Customer Service', 'Leadership', 'Organization'],
      experience: [
        {
          title: `Senior ${title}`,
          company: 'ABC Corporation',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            `Led team initiatives resulting in 25% improvement in overall productivity`,
            `Managed cross-functional projects with budgets up to $500K, delivering on time and under budget`,
            `Implemented process improvements that reduced operational costs by 15%`,
          ],
        },
        {
          title,
          company: 'XYZ Industries',
          startDate: '2018-06',
          endDate: '2020-12',
          achievements: [
            `Consistently exceeded performance targets by 20% quarter over quarter`,
            `Collaborated with 5-person team to deliver key projects meeting all deadlines`,
            `Developed expertise in industry best practices, recognized as subject matter expert`,
          ],
        },
      ],
      education: [
        { institution: 'State University', degree: 'B.S.', field: 'Business Administration', startDate: '2014-08', endDate: '2018-05' },
      ],
      certifications: [],
      faqs: [
        { question: `What should a ${title} include on their resume?`, answer: `A ${title} resume should highlight relevant experience, key skills, and quantifiable achievements. Focus on industry-specific expertise and demonstrate your impact in previous roles.` },
        { question: `How do I make my ${title} resume stand out?`, answer: `Tailor your resume to each job posting, use action verbs, and quantify achievements where possible. Highlight certifications and specialized skills relevant to the position.` },
        { question: `What skills are most important for a ${title}?`, answer: `Key skills vary by specialization but generally include technical expertise, communication, problem-solving, and teamwork. Review job postings to identify the most sought-after skills in your market.` },
      ],
    },
    esData: {
      slug: slug,
      title: title,
      keywords: [`currículum de ${title}`, `CV de ${title}`, `ejemplo de currículum de ${title}`, `plantilla de currículum de ${title}`],
      searchIntents: [`cómo escribir un currículum de ${title}`, `ejemplos de currículum de ${title}`, `mejor formato de currículum de ${title}`],
      topSkills: ['Comunicación', 'Gestión del Tiempo', 'Resolución de Problemas', 'Trabajo en Equipo', 'Atención al Detalle', 'Microsoft Office', 'Gestión de Proyectos', 'Servicio al Cliente', 'Liderazgo', 'Organización'],
      atsKeywords: ['experiencia profesional', 'colaboración en equipo', 'gestión de proyectos', 'orientado a resultados', 'orientado a los detalles', 'habilidades de comunicación', 'liderazgo', 'resolución de problemas', 'gestión del tiempo', 'control de calidad', 'mejora continua'],
      summary: `${title} con experiencia y un historial comprobado en la entrega de resultados de alta calidad. Sólida formación en las mejores prácticas de la industria con excelentes habilidades de comunicación y trabajo en equipo.`,
      skills: ['Comunicación', 'Gestión del Tiempo', 'Resolución de Problemas', 'Trabajo en Equipo', 'Atención al Detalle', 'Microsoft Office', 'Gestión de Proyectos', 'Servicio al Cliente', 'Liderazgo', 'Organización'],
      experience: [
        {
          title: `${title} Senior`,
          company: 'ABC Corporation',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            `Lideró iniciativas del equipo resultando en una mejora del 25% en la productividad general`,
            `Gestionó proyectos multifuncionales con presupuestos de hasta $500K, entregando a tiempo y dentro del presupuesto`,
            `Implementó mejoras de procesos que redujeron los costos operativos en un 15%`,
          ],
        },
        {
          title,
          company: 'XYZ Industries',
          startDate: '2018-06',
          endDate: '2020-12',
          achievements: [
            `Superó consistentemente los objetivos de rendimiento en un 20% trimestre a trimestre`,
            `Colaboró con un equipo de 5 personas para entregar proyectos clave cumpliendo todos los plazos`,
            `Desarrolló experiencia en las mejores prácticas de la industria, reconocido como experto en la materia`,
          ],
        },
      ],
      education: [
        { institution: 'State University', degree: 'B.S.', field: 'Administración de Empresas', startDate: '2014-08', endDate: '2018-05' },
      ],
      certifications: [],
      faqs: [
        { question: `¿Qué debe incluir un ${title} en su currículum?`, answer: `Un currículum de ${title} debe destacar experiencia relevante, habilidades clave y logros cuantificables. Enfóquese en la experiencia específica de la industria y demuestre su impacto en roles anteriores.` },
        { question: `¿Cómo hago que mi currículum de ${title} destaque?`, answer: `Adapte su currículum a cada oferta de trabajo, use verbos de acción y cuantifique los logros donde sea posible. Destaque certificaciones y habilidades especializadas relevantes para el puesto.` },
        { question: `¿Qué habilidades son más importantes para un ${title}?`, answer: `Las habilidades clave varían según la especialización, pero generalmente incluyen experiencia técnica, comunicación, resolución de problemas y trabajo en equipo. Revise las ofertas de trabajo para identificar las habilidades más buscadas en su mercado.` },
      ],
    },
  };
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
