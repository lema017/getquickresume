#!/usr/bin/env node
/**
 * Generate profession FAQs via OpenAI and write src/data/professions/generated/aiFaqOverlays.json.
 * Merged at runtime in professions/index.ts so verify-seo-content Phase B can pass without editing batch .ts files.
 *
 * Requires OPENAI_API_KEY (env or root .env). Default model gpt-4o-mini.
 *
 * Usage:
 *   node scripts/bulk-enrich-professions-faqs.mjs
 *   node scripts/bulk-enrich-professions-faqs.mjs --concurrency 10
 *   node scripts/bulk-enrich-professions-faqs.mjs --limit 20
 *   node scripts/bulk-enrich-professions-faqs.mjs --slug software-engineer
 *   node scripts/bulk-enrich-professions-faqs.mjs --delay-ms 50
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OVERLAYS_PATH = path.join(ROOT, 'src/data/professions/generated/aiFaqOverlays.json');

/** Approximate USD per token (override via env for other models). */
function estimateCostUsd(model, promptTokens, completionTokens) {
  const m = String(model || '').toLowerCase();
  let inPerM = 0.15;
  let outPerM = 0.6;
  if (m.includes('gpt-4o-mini')) {
    inPerM = 0.15;
    outPerM = 0.6;
  } else if (m.includes('gpt-4o') && !m.includes('mini')) {
    inPerM = 2.5;
    outPerM = 10;
  }
  const pi = Number(process.env.OPENAI_PRICE_INPUT_PER_M);
  const po = Number(process.env.OPENAI_PRICE_OUTPUT_PER_M);
  if (Number.isFinite(pi)) inPerM = pi;
  if (Number.isFinite(po)) outPerM = po;
  return (promptTokens * inPerM) / 1e6 + (completionTokens * outPerM) / 1e6;
}

function loadRootEnv() {
  const p = path.join(ROOT, '.env');
  if (!fs.existsSync(p)) return;
  const text = fs.readFileSync(p, 'utf8');
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

function parseArgs() {
  const out = {
    limit: Infinity,
    slug: null,
    delayMs: null,
    concurrency: 10,
    model: process.env.OPENAI_FAQ_MODEL || 'gpt-4o-mini',
    dryRun: false,
  };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--limit' && argv[i + 1]) {
      out.limit = Math.max(0, parseInt(argv[++i], 10) || 0);
    } else if (a === '--slug' && argv[i + 1]) {
      out.slug = argv[++i];
    } else if (a === '--delay-ms' && argv[i + 1]) {
      out.delayMs = Math.max(0, parseInt(argv[++i], 10) || 0);
    } else if (a === '--concurrency' && argv[i + 1]) {
      out.concurrency = Math.max(1, parseInt(argv[++i], 10) || 1);
    } else if (a === '--model' && argv[i + 1]) {
      out.model = argv[++i];
    } else if (a === '--dry-run') {
      out.dryRun = true;
    }
  }
  if (out.delayMs === null) {
    out.delayMs = out.concurrency > 1 ? 0 : 120;
  }
  return out;
}

function readOverlays() {
  if (!fs.existsSync(OVERLAYS_PATH)) {
    return { en: {}, es: {} };
  }
  try {
    const j = JSON.parse(fs.readFileSync(OVERLAYS_PATH, 'utf8'));
    return {
      en: typeof j.en === 'object' && j.en ? j.en : {},
      es: typeof j.es === 'object' && j.es ? j.es : {},
    };
  } catch {
    return { en: {}, es: {} };
  }
}

function writeOverlays(data) {
  const dir = path.dirname(OVERLAYS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const tmp = `${OVERLAYS_PATH}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  fs.renameSync(tmp, OVERLAYS_PATH);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const MIN_FAQS = 4;

function validFaqList(arr) {
  if (!Array.isArray(arr) || arr.length < MIN_FAQS) return false;
  return arr.every(
    (x) =>
      x &&
      typeof x.question === 'string' &&
      typeof x.answer === 'string' &&
      x.question.trim().length > 5 &&
      x.answer.trim().length > 20
  );
}

function overlayFaqCount(overlays, lang, slug) {
  const n = (overlays[lang]?.[slug]?.faqs || []).length;
  return n;
}

/**
 * Effective FAQ count = max(registry after merge, overlay file) so resume works even if SSR cache desyncs.
 */
function effectiveEnFaqCount(p, overlays) {
  return Math.max((p.faqs || []).length, overlayFaqCount(overlays, 'en', p.slug));
}

function effectiveEsFaqCount(p, overlays) {
  if (!p.es) return MIN_FAQS;
  return Math.max((p.es.faqs || []).length, overlayFaqCount(overlays, 'es', p.slug));
}

async function openaiFaqJson({ model, system, user }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not set');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (res.status === 429) {
    const msg = body?.error?.message || 'rate limited';
    throw Object.assign(new Error(`OpenAI HTTP 429: ${msg}`), { retryable: true });
  }
  if (!res.ok) {
    const msg = body?.error?.message || JSON.stringify(body).slice(0, 400);
    throw new Error(`OpenAI HTTP ${res.status}: ${msg}`);
  }

  const text = body?.choices?.[0]?.message?.content;
  if (!text || typeof text !== 'string') {
    throw new Error('OpenAI: empty content');
  }
  const usage = body?.usage || {};
  return {
    parsed: JSON.parse(text),
    promptTokens: Number(usage.prompt_tokens) || 0,
    completionTokens: Number(usage.completion_tokens) || 0,
  };
}

function buildUserPrompt(p, { needEn, needEs }) {
  const hasEs = !!p.es;
  const lines = [
    `English job title: ${p.title}`,
    `English URL slug: ${p.slug}`,
  ];
  if (needEn) {
    lines.push(`Existing English FAQs count: ${(p.faqs || []).length} (you will replace with exactly 4 new FAQs).`);
  }
  if (hasEs) {
    lines.push(`Spanish job title: ${p.es.title}`);
    lines.push(`Spanish URL slug: ${p.es.slug}`);
    if (needEs) {
      lines.push(`Existing Spanish FAQs count: ${(p.es.faqs || []).length} (you will replace with exactly 4 new FAQs).`);
    }
  }
  lines.push('');

  const rules = [
    '- Questions must be specific to this role and useful for someone writing a resume.',
    '- Answers: 2–5 sentences, practical, no fake names (no "John Doe").',
    '- No HTML; plain text only.',
  ];

  if (needEn && needEs && hasEs) {
    lines.push(
      'Return a single JSON object with exactly this shape:',
      '{',
      '  "en": { "faqs": [ { "question": string, "answer": string }, ... exactly 4 items ] },',
      '  "es": { "faqs": [ { "question": string, "answer": string }, ... exactly 4 items ] }',
      '}',
      '',
      ...rules,
      '- Spanish FAQs must be natural Spanish, not word-for-word English.'
    );
  } else if (needEn) {
    lines.push(
      'Return a single JSON object with exactly this shape:',
      '{',
      '  "en": { "faqs": [ { "question": string, "answer": string }, ... exactly 4 items ] }',
      '}',
      '',
      ...rules
    );
  } else if (needEs && hasEs) {
    lines.push(
      'Return a single JSON object with exactly this shape:',
      '{',
      '  "es": { "faqs": [ { "question": string, "answer": string }, ... exactly 4 items ] }',
      '}',
      '',
      ...rules,
      '- Spanish FAQs must be natural Spanish.'
    );
  } else {
    lines.push('Return { "en": { "faqs": [] } } — no work needed (this should not happen).');
  }
  return lines.join('\n');
}

const SYSTEM_PROMPT =
  'You output only valid JSON matching the user schema. You write SEO FAQ content for a resume builder website.';

/** Serialize disk writes so concurrent workers do not corrupt the JSON file. */
function createWriteQueue() {
  let chain = Promise.resolve();
  return (fn) => {
    const p = chain.then(fn);
    chain = p.catch((err) => {
      console.error('Overlay write failed:', err);
    });
    return p;
  };
}

async function runPool(queue, concurrency, worker) {
  let next = 0;
  const n = Math.min(concurrency, queue.length);
  const workers = Array.from({ length: n }, async () => {
    while (true) {
      const i = next++;
      if (i >= queue.length) break;
      await worker(queue[i], i);
    }
  });
  await Promise.all(workers);
}

async function main() {
  loadRootEnv();
  const args = parseArgs();

  if (!process.env.OPENAI_API_KEY && !args.dryRun) {
    console.error('Set OPENAI_API_KEY (or add it to .env).');
    process.exit(1);
  }

  const overlays = readOverlays();
  let done = 0;
  let skippedComplete = 0;
  let promptTotal = 0;
  let completionTotal = 0;
  let successCount = 0;

  const vite = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
    configFile: path.join(ROOT, 'vite.config.ts'),
  });

  const enqueueWrite = createWriteQueue();

  try {
    const profMod = await vite.ssrLoadModule('/src/data/professions/index.ts');
    await profMod.ensureProfessionsLoaded();
    const professions = await profMod.getAllProfessions();

    const stillNeedsWork = (p) => {
      const enOk = effectiveEnFaqCount(p, overlays) >= MIN_FAQS;
      const esOk = effectiveEsFaqCount(p, overlays) >= MIN_FAQS;
      return !enOk || !esOk;
    };

    let queue = professions.filter(stillNeedsWork);
    if (args.slug) {
      queue = queue.filter((p) => p.slug === args.slug);
      if (!queue.length) {
        console.log(`No queued profession matching slug "${args.slug}" (may already have ≥${MIN_FAQS} FAQs EN+ES).`);
        return;
      }
    }

    const totalProfessionGap = professions.filter((p) => {
      const enOk = (p.faqs || []).length >= MIN_FAQS;
      const esOk = !p.es || (p.es.faqs || []).length >= MIN_FAQS;
      return !enOk || !esOk;
    }).length;

    console.log(`Professions below FAQ threshold (merged registry): ${totalProfessionGap}`);
    console.log(`After overlay checkpoint (disk + registry): ${queue.length} to process`);
    if (args.dryRun) {
      console.log('Dry run — first 15 slugs:', queue.slice(0, 15).map((p) => p.slug).join(', '));
      console.log(`concurrency=${args.concurrency} delayMs=${args.delayMs} model=${args.model}`);
      return;
    }

    const workQueue = args.limit < Infinity ? queue.slice(0, args.limit) : queue;

    await runPool(workQueue, args.concurrency, async (p) => {
      const needEn = effectiveEnFaqCount(p, overlays) < MIN_FAQS;
      const needEs = p.es && effectiveEsFaqCount(p, overlays) < MIN_FAQS;
      if (!needEn && !needEs) {
        skippedComplete += 1;
        return;
      }

      const user = buildUserPrompt(p, { needEn, needEs });
      let parsed;
      let promptTokens = 0;
      let completionTokens = 0;

      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          const out = await openaiFaqJson({
            model: args.model,
            system: SYSTEM_PROMPT,
            user,
          });
          parsed = out.parsed;
          promptTokens = out.promptTokens;
          completionTokens = out.completionTokens;
          break;
        } catch (e) {
          const wait = e?.retryable ? 2000 * (attempt + 1) : 500 * (attempt + 1);
          if (attempt === 4) {
            console.error(`FAIL ${p.slug}:`, e.message || e);
            return;
          }
          await sleep(wait);
        }
      }

      let ok = true;
      if (needEn) {
        const faqs = parsed?.en?.faqs;
        if (!validFaqList(faqs)) {
          console.error(`SKIP ${p.slug}: invalid en.faqs from model`);
          ok = false;
        }
      }
      if (ok && needEs && p.es) {
        const faqs = parsed?.es?.faqs;
        if (!validFaqList(faqs)) {
          console.error(`SKIP ${p.slug}: invalid es.faqs from model`);
          ok = false;
        }
      }
      if (!ok) return;

      await enqueueWrite(async () => {
        if (needEn) {
          overlays.en[p.slug] = { faqs: parsed.en.faqs };
        }
        if (needEs && p.es) {
          overlays.es[p.slug] = { faqs: parsed.es.faqs };
        }
        writeOverlays(overlays);
      });

      promptTotal += promptTokens;
      completionTotal += completionTokens;
      successCount += 1;
      done += 1;

      const costSoFar = estimateCostUsd(args.model, promptTotal, completionTotal);
      if (args.concurrency === 1) {
        console.log(`OK ${successCount} ${p.slug}${needEs && p.es ? ' (EN+ES)' : ''}`);
      }
      if (successCount % 50 === 0) {
        console.log(
          `— ${successCount} ok (last: ${p.slug}) | tokens in=${promptTotal} out=${completionTotal} | ~$${costSoFar.toFixed(3)} USD`
        );
      }

      if (args.delayMs > 0) await sleep(args.delayMs);
    });

    const finalCost = estimateCostUsd(args.model, promptTotal, completionTotal);
    console.log(`Wrote ${done} profession(s) into ${path.relative(ROOT, OVERLAYS_PATH)}`);
    console.log(
      `Token usage: prompt=${promptTotal} completion=${completionTotal} | est. cost ~$${finalCost.toFixed(3)} (${args.model})`
    );
    if (skippedComplete) console.log(`Skipped ${skippedComplete} already-complete during run (race)`);
    console.log('Next: npm run report:seo-inventory -- --write-faq-allowlist && npm run build');
  } finally {
    await vite.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
