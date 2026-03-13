#!/usr/bin/env node
/**
 * Generates WebP thumbnail images for all resume templates.
 *
 * Usage:
 *   node scripts/generate-thumbnails.mjs            # generate all
 *   node scripts/generate-thumbnails.mjs oak-v1     # generate specific (partial match)
 *
 * Requires: puppeteer (devDependency)
 */

import { createServer } from 'http';
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DESIGNS_DIR = join(ROOT, 'public', 'templates', 'designs');
const THUMBS_DIR = join(ROOT, 'public', 'templates', 'thumbnails');
const VIEWPORT = { width: 794, height: 1123, deviceScaleFactor: 1 };
const CONCURRENCY = 4;

const SAMPLE_DATA = JSON.stringify({
  firstName: 'John',
  lastName: 'Doe',
  country: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  language: 'en',
  targetLevel: 'senior',
  profession: 'Senior Software Engineer',
  tone: 'professional',
  phone: '+1 (555) 123-4567',
  email: 'john.doe@example.com',
  skillsRaw: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Python', 'PostgreSQL'],
  experience: [
    {
      id: 'exp-1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      startDate: '2020-01',
      isCurrent: true,
      achievements: [
        'Led development of microservices architecture serving 1M+ users',
        'Improved system performance by 40% through optimization',
        'Mentored team of 5 junior developers',
      ],
      responsibilities: [],
      pageNumber: null,
    },
    {
      id: 'exp-2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      startDate: '2017-06',
      endDate: '2020-01',
      isCurrent: false,
      achievements: [
        'Built React frontend for e-commerce platform',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
      ],
      responsibilities: [],
      pageNumber: null,
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013-09',
      endDate: '2017-05',
      isCompleted: true,
      pageNumber: null,
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2022', pageNumber: null },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, serving 50K+ active users monthly.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      startDate: '2021-01',
      isOngoing: false,
      pageNumber: null,
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'native', pageNumber: null },
    { id: 'lang-2', name: 'Spanish', level: 'intermediate', pageNumber: null },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Best Innovation Award',
      description: 'Recognized for developing an AI-powered code review tool',
      year: '2023',
      pageNumber: null,
    },
  ],
  summary:
    'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions.',
  jobDescription: '',
  completedSteps: [1, 2, 3, 4, 5, 6, 7],
  currentStep: 7,
  totalCharacters: 0,
  firstNamePageNumber: null,
  lastNamePageNumber: null,
  countryPageNumber: null,
  linkedinPageNumber: null,
  languagePageNumber: null,
  targetLevelPageNumber: null,
  professionPageNumber: null,
  tonePageNumber: null,
  phonePageNumber: null,
  emailPageNumber: null,
  summaryPageNumber: null,
  jobDescriptionPageNumber: null,
  skillsPagination: null,
});

function buildHTML(templateId, jsCode) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:210mm; height:297mm; overflow:hidden; background:#fff; }
</style>
</head>
<body>
<${templateId}></${templateId}>
<script>${jsCode}<\/script>
<script>
  const el = document.querySelector('${templateId}');
  if (el) el.data = ${SAMPLE_DATA};
<\/script>
</body>
</html>`;
}

function startServer(port) {
  const files = {};
  return new Promise((res) => {
    const server = createServer((req, reply) => {
      const id = req.url?.replace('/', '').replace('.html', '');
      const html = files[id];
      if (html) {
        reply.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        reply.end(html);
      } else {
        reply.writeHead(404);
        reply.end('Not found');
      }
    });
    server.listen(port, () => res({ server, files }));
  });
}

async function generateThumbnail(page, port, templateId, jsCode) {
  const html = buildHTML(templateId, jsCode);
  const url = `http://127.0.0.1:${port}/${templateId}.html`;
  page.__serverFiles[templateId] = html;

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.waitForSelector(templateId, { timeout: 5000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 500));

  const outPath = join(THUMBS_DIR, `${templateId}.webp`);
  await page.screenshot({ path: outPath, type: 'webp', quality: 82, fullPage: false });
  return outPath;
}

async function main() {
  const filter = process.argv[2] || '';

  if (!existsSync(THUMBS_DIR)) mkdirSync(THUMBS_DIR, { recursive: true });

  const allFiles = readdirSync(DESIGNS_DIR).filter((f) => f.endsWith('.js'));
  const templates = allFiles
    .map((f) => ({ id: f.replace('.js', ''), file: join(DESIGNS_DIR, f) }))
    .filter((t) => !filter || t.id.includes(filter));

  if (templates.length === 0) {
    console.log('No templates matched. Available:', allFiles.length);
    process.exit(0);
  }

  console.log(`Generating thumbnails for ${templates.length} template(s)...`);

  const PORT = 18732;
  const { server, files } = await startServer(PORT);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  let done = 0;
  const errors = [];

  async function worker(batch) {
    const page = await browser.newPage();
    page.__serverFiles = files;
    await page.setViewport(VIEWPORT);

    for (const tpl of batch) {
      try {
        const jsCode = readFileSync(tpl.file, 'utf-8');
        await generateThumbnail(page, PORT, tpl.id, jsCode);
        done++;
        process.stdout.write(`\r  [${done}/${templates.length}] ${tpl.id}`);
      } catch (err) {
        errors.push({ id: tpl.id, error: err.message });
        done++;
        process.stdout.write(`\r  [${done}/${templates.length}] FAIL ${tpl.id}`);
      }
    }
    await page.close();
  }

  const batches = Array.from({ length: CONCURRENCY }, () => []);
  templates.forEach((t, i) => batches[i % CONCURRENCY].push(t));

  await Promise.all(batches.filter((b) => b.length > 0).map(worker));

  console.log(`\nDone: ${done - errors.length} succeeded, ${errors.length} failed.`);
  if (errors.length > 0) {
    console.log('Failures:');
    errors.forEach((e) => console.log(`  ${e.id}: ${e.error}`));
  }

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
