import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Lock, Search, Sparkles, XCircle } from 'lucide-react';
import { track } from '@/services/marketingAnalytics';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

type KeywordMatchResult = {
  matchPercentage: number;
  totalJobKeywords: number;
  matchedKeywords: number;
  matched: string[];
  missing: string[];
};

const DEFAULT_MAX_LEN = 5000;

const EN_STOPWORDS = new Set([
  'a','an','and','are','as','at','be','but','by','for','from','has','have','had','he','her','hers','him','his','how',
  'i','if','in','into','is','it','its','me','my','mine','more','most','not','of','on','or','our','ours','she','so',
  'than','that','the','their','theirs','them','then','there','these','they','this','those','to','up','was','we','were',
  'what','when','where','which','who','why','will','with','you','your','yours',
  // Common low-signal resume words
  'experience','years','year','month','months','work','worked','working','responsible','responsibilities','skills','skill',
  'team','project','projects','using','use','used','including','include','strong','excellent','good',
  // Demo/sample UI words that should never become “keywords”
  'sample','resume','resumes','job','jobs','description','descriptions',
  // Common job-posting filler verbs/phrases (low ATS value as standalone keywords)
  'looking','seek','seeking','hiring','hire','join','want','wanted','need','needs','needed','role','position','positions',
  'candidate','candidates','apply','applying',
]);

const ES_STOPWORDS = new Set([
  // Common Spanish articles, prepositions, conjunctions
  'el','la','los','las','un','una','unos','unas','con','por','para','que','del','al','los','las','de','en','y','o','pero','si','no','como','mas','muy','sin','sobre','entre','hasta','desde',
  // Job-posting filler
  'buscamos','solicitamos','necesitamos','incorporar','unirse','puesto','puestos','candidato','candidatos',
  'aplicar','aplicando','ofrecemos','oferta','ofertas','buscan',
  // Low-signal / generic (tokenized form: no accents, so e.g. año -> ao, años -> anos)
  'experiencia','anos','ano','meses','trabajo','trabajos','habilidades','habilidad','equipo','proyecto','proyectos',
  'usando','usado','incluyendo','incluir','descripcion','descripciones','muestra','curriculum','curriculums',
  // Role/filler
  'desarrollador','desarrolladores',
]);

function normalizeText(input: string, maxLen = DEFAULT_MAX_LEN) {
  const trimmed = (input || '').slice(0, maxLen);
  // Strip control characters and normalize whitespace
  return trimmed
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(input: string) {
  // Keeps tokens like: c#, c++, node.js, aws, react, sql, etc.
  // Special-case common short-but-meaningful terms so they don't get dropped by min-length filters.
  const normalized = input
    .toLowerCase()
    // Normalize CI/CD variants into a single token
    .replace(/\bci\s*(\/|-)\s*cd\b/g, 'cicd');

  const tokens = normalized.match(/[a-z0-9][a-z0-9+#.\-]{1,}/g) || [];
  return tokens
    .map(t => t.replace(/^[.\-]+|[.\-]+$/g, '')) // trim punctuation edges
    .filter(Boolean)
    .filter(t => t.length >= 3);
}

function computeKeywordMatch(jobDescriptionRaw: string, resumeRaw: string, lang?: 'en' | 'es'): KeywordMatchResult {
  const jobText = normalizeText(jobDescriptionRaw);
  const resumeText = normalizeText(resumeRaw);
  const stopwords = lang === 'es' ? ES_STOPWORDS : EN_STOPWORDS;

  const jobTokens = tokenize(jobText)
    .filter(t => !stopwords.has(t));

  // De-dupe while preserving order
  const jobKeywords: string[] = [];
  const seen = new Set<string>();
  for (const t of jobTokens) {
    if (seen.has(t)) continue;
    seen.add(t);
    jobKeywords.push(t);
    if (jobKeywords.length >= 60) break; // hard cap work factor
  }

  const resumeTokensSet = new Set(tokenize(resumeText));

  const matched: string[] = [];
  const missing: string[] = [];
  for (const kw of jobKeywords) {
    if (resumeTokensSet.has(kw)) matched.push(kw);
    else missing.push(kw);
  }

  const totalJobKeywords = jobKeywords.length;
  const matchedKeywords = matched.length;
  const matchPercentage = totalJobKeywords === 0
    ? 0
    : Math.round((matchedKeywords / totalJobKeywords) * 100);

  return { matchPercentage, totalJobKeywords, matchedKeywords, matched, missing };
}

async function fetchServerKeywordMatch(jobDescription: string, resumeText: string): Promise<KeywordMatchResult> {
  const res = await fetch(`${API_BASE_URL}/api/public/demo/keyword-match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jobDescription: jobDescription.slice(0, DEFAULT_MAX_LEN),
      resumeText: resumeText.slice(0, DEFAULT_MAX_LEN),
    }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success || !json?.data) {
    const msg = json?.message || json?.error || 'Failed to compute keyword match.';
    throw new Error(msg);
  }
  return json.data as KeywordMatchResult;
}

export function KeywordMatchPreview() {
  const { t, i18n } = useTranslation();
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState<KeywordMatchResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAnalyze = useMemo(() => {
    return normalizeText(jobDescription).length >= 40 && normalizeText(resumeText).length >= 40;
  }, [jobDescription, resumeText]);

  const samples = useMemo(() => {
    return {
      job: t('landing.keywordPreview.sampleJob', 'We are looking for a React developer with TypeScript, AWS, CI/CD, and SQL experience.'),
      resume: t('landing.keywordPreview.sampleResume', 'Built React + TypeScript apps, deployed on AWS, improved CI/CD pipelines, and worked with SQL databases.'),
    };
  }, [t]);

  const handleUseSample = () => {
    setJobDescription(samples.job);
    setResumeText(samples.resume);
    setResult(null);
    setError(null);
    track('demo_sample_used', { demo: 'keyword_match', page_name: 'home' });
  };

  const handleAnalyze = async () => {
    setIsRunning(true);
    setError(null);

    // Instant local result (fast feedback for retention)
    const local = computeKeywordMatch(jobDescription, resumeText, i18n.language?.startsWith('es') ? 'es' : 'en');
    setResult(local);
    track('demo_used', { demo: 'keyword_match', page_name: 'home' });

    // Server result (public, deterministic) — keeps API path exercised without AI cost
    try {
      const server = await fetchServerKeywordMatch(jobDescription, resumeText);
      setResult(server);
    } catch (e: any) {
      // Keep local result; show a small non-blocking message only
      setError(e?.message || t('landing.keywordPreview.error', 'Could not compute server match. Showing local preview.'));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="mt-10 relative z-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/15">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                {t('landing.keywordPreview.badge', 'Instant preview (no signup)')}
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white">
                {t('landing.keywordPreview.title', 'Keyword Match Preview')}
              </h3>
              <p className="mt-1 text-sm sm:text-base text-slate-200/90">
                {t('landing.keywordPreview.subtitle', 'Paste a job description and your resume text to see what keywords you’re missing.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleUseSample}
                className="px-4 py-2 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 transition-colors text-sm font-semibold"
              >
                {t('landing.keywordPreview.useSample', 'Use sample')}
              </button>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!canAnalyze || isRunning}
                className="px-4 py-2 rounded-xl bg-white text-blue-900 font-semibold text-sm shadow-xl hover:shadow-white/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isRunning ? t('landing.keywordPreview.analyzing', 'Analyzing…') : t('landing.keywordPreview.analyze', 'Analyze')}
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-2">
                {t('landing.keywordPreview.jobLabel', 'Job description')}
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
                maxLength={DEFAULT_MAX_LEN}
                className="w-full resize-none rounded-2xl bg-slate-950/30 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
                placeholder={t('landing.keywordPreview.jobPlaceholder', 'Paste the job description here…')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-2">
                {t('landing.keywordPreview.resumeLabel', 'Resume text')}
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={5}
                maxLength={DEFAULT_MAX_LEN}
                className="w-full resize-none rounded-2xl bg-slate-950/30 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
                placeholder={t('landing.keywordPreview.resumePlaceholder', 'Paste your resume text here…')}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-200/80">
            <Lock className="h-4 w-4 text-emerald-300" />
            <span>{t('landing.keywordPreview.privacyNote', 'We do not store your text. This preview is for keyword matching only.')}</span>
          </div>

          {error && (
            <div className="mt-4 text-xs text-amber-200/90">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-white font-semibold">
                  {t('landing.keywordPreview.resultsTitle', 'Match score')}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-extrabold text-white">
                    {result.matchPercentage}%
                  </div>
                  <div className="text-xs text-slate-200/80">
                    {result.matchedKeywords}/{result.totalJobKeywords} {t('landing.keywordPreview.matched', 'matched')}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl bg-green-500/10 border border-green-400/20 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-100">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    {t('landing.keywordPreview.matchedTitle', 'Matched')}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.matched.slice(0, 18).map((kw) => (
                      <span key={kw} className="px-2.5 py-1 rounded-lg bg-green-500/15 text-green-50 text-xs border border-green-400/20">
                        {kw}
                      </span>
                    ))}
                    {result.matched.length === 0 && (
                      <span className="text-xs text-green-100/70">
                        {t('landing.keywordPreview.noneMatched', 'No keyword matches yet.')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-xl bg-red-500/10 border border-red-400/20 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-100">
                    <XCircle className="h-4 w-4 text-red-300" />
                    {t('landing.keywordPreview.missingTitle', 'Missing')}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.missing.slice(0, 18).map((kw) => (
                      <span key={kw} className="px-2.5 py-1 rounded-lg bg-red-500/15 text-red-50 text-xs border border-red-400/20">
                        {kw}
                      </span>
                    ))}
                    {result.missing.length === 0 && (
                      <span className="text-xs text-red-100/70">
                        {t('landing.keywordPreview.noneMissing', 'Great—no missing keywords detected.')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-200/80 text-center sm:text-left">
                  {t('landing.keywordPreview.nextStep', 'Next: Get AI tailoring + full ATS insights (free to start).')}
                </p>
                <Link
                  to="/login"
                  onClick={() => track('demo_cta_click', { demo: 'keyword_match', page_name: 'home' })}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-blue-900 font-semibold text-sm shadow-xl hover:shadow-white/20 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  {t('landing.keywordPreview.cta', 'Unlock full AI analysis')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

