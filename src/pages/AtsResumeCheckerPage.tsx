import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Target,
  XCircle,
  Award,
  Search,
  Lock,
  Sparkles,
  BarChart3,
  AlertTriangle,
  Loader2,
  Cpu,
  FileText,
  Briefcase,
  Upload,
  X,
} from 'lucide-react';
import { getPageSEO, BASE_URL, generateFAQSchema } from '@/utils/seoConfig';
import { checkAtsPublic, isPublicAtsCheckError } from '@/services/publicAtsCheckService';
import { extractTextFromFile } from '@/utils/documentTextExtractor';
import type { PublicAtsCheckResult, AtsKeywordAnalysis } from '@/services/publicAtsCheckService';
import {
  trackLandingView,
  trackAtsCheckCompleted,
  trackAtsCheckerCtaClicked,
  trackAtsCheckerRateLimited,
  startLandingEngagementTracking,
} from '@/services/marketingAnalytics';

const MAX_CHARS = 10000;

// ============================================================================
// ATS Score Card
// ============================================================================

function AtsScoreCard({
  score,
  sectionsFound,
  sectionsMissing,
}: {
  score: number;
  sectionsFound: string[];
  sectionsMissing: string[];
}) {
  const { t } = useTranslation();

  const getScoreColor = (s: number) => {
    if (s >= 8) return { ring: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', label: 'text-green-700' };
    if (s >= 6) return { ring: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', label: 'text-blue-700' };
    if (s >= 4) return { ring: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', label: 'text-amber-700' };
    return { ring: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', label: 'text-red-700' };
  };

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (score / 10) * circumference;

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-6`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        {t('atsResumeCheckerPage.results.scoreTitle')}
      </h3>

      <div className="flex items-center gap-6 mb-6">
        {/* Animated ring */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="6"
              className="text-gray-200" />
            <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="6"
              strokeLinecap="round"
              className={`${colors.ring} transition-all duration-1000 ease-out`}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${colors.ring}`}>{score}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold text-gray-900">
            {t('atsResumeCheckerPage.results.scoreValue', { score })}
          </p>
          {score < 7 && (
            <p className="text-sm text-amber-700 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {t('atsResumeCheckerPage.results.scoreLow')}
            </p>
          )}
        </div>
      </div>

      {/* Sections found/missing */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          {t('atsResumeCheckerPage.results.sectionsTitle')}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {sectionsFound.map((s) => (
            <div key={s} className="flex items-center gap-1.5 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">
                {t(`atsResumeCheckerPage.sectionLabels.${s}`, s)}
              </span>
            </div>
          ))}
          {sectionsMissing.map((s) => (
            <div key={s} className="flex items-center gap-1.5 text-sm">
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-gray-400">
                {t(`atsResumeCheckerPage.sectionLabels.${s}`, s)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Keyword Summary Card
// ============================================================================

function KeywordSummaryCard({ analysis }: { analysis: AtsKeywordAnalysis }) {
  const { t } = useTranslation();

  const levelColors: Record<string, { bg: string; text: string; border: string }> = {
    'excellent': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    'good': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    'fair': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
    'needs-work': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  };

  const levelLabels: Record<string, string> = {
    'excellent': t('atsResumeCheckerPage.results.atsExcellent'),
    'good': t('atsResumeCheckerPage.results.atsGood'),
    'fair': t('atsResumeCheckerPage.results.atsFair'),
    'needs-work': t('atsResumeCheckerPage.results.atsNeedsWork'),
  };

  const lc = levelColors[analysis.atsLevel] || levelColors['needs-work'];

  const categories = [
    { key: 'hardSkills', label: t('atsResumeCheckerPage.results.hardSkills'), count: analysis.categories.hardSkills },
    { key: 'softSkills', label: t('atsResumeCheckerPage.results.softSkills'), count: analysis.categories.softSkills },
    { key: 'actionVerbs', label: t('atsResumeCheckerPage.results.actionVerbs'), count: analysis.categories.actionVerbs },
    { key: 'industryTerms', label: t('atsResumeCheckerPage.results.industryTerms'), count: analysis.categories.industryTerms },
  ];

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Cpu className="w-5 h-5 text-indigo-600" />
        {t('atsResumeCheckerPage.results.keywordsTitle')}
      </h3>

      <div className="flex items-center gap-3 mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${lc.bg} ${lc.text} ${lc.border}`}>
          {levelLabels[analysis.atsLevel]}
        </span>
        <span className="text-sm text-gray-600">
          {t('atsResumeCheckerPage.results.keywordsFound', { count: analysis.totalFound })}
        </span>
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {categories.map((cat) => (
          <div key={cat.key} className="bg-white/60 rounded-lg p-2.5 text-center">
            <p className="text-xl font-bold text-gray-900">{cat.count}</p>
            <p className="text-xs text-gray-500">{cat.label}</p>
          </div>
        ))}
      </div>

      {/* Top keywords */}
      {analysis.topKeywords.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {t('atsResumeCheckerPage.results.topKeywords')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {analysis.topKeywords.map((kw, i) => (
              <span key={i} className="inline-flex px-2.5 py-1 bg-white rounded-lg text-xs font-medium text-indigo-700 border border-indigo-100">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Tips Card
// ============================================================================

function TipsCard({ tips }: { tips: string[] }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-500" />
        {t('atsResumeCheckerPage.results.tipsTitle')}
      </h3>
      <div className="space-y-2">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg border border-amber-100">
            <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Blurred Improvements Card (conversion hook)
// ============================================================================

function BlurredImprovementsCard({ improvementCount }: { improvementCount: number }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        {t('atsResumeCheckerPage.hooks.improvementsFound', { count: improvementCount })}
      </h3>

      <div className="space-y-2 mb-4">
        {[
          t('atsResumeCheckerPage.hooks.improvementBlurred1'),
          t('atsResumeCheckerPage.hooks.improvementBlurred2'),
          t('atsResumeCheckerPage.hooks.improvementBlurred3'),
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
            <Lock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="text-sm text-gray-500 blur-[3px] select-none">{text}</span>
          </div>
        ))}
      </div>

      <Link
        to="/login?source=ats-checker-insights"
        onClick={() => trackAtsCheckerCtaClicked('insights')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
      >
        <Lock className="w-4 h-4" />
        {t('atsResumeCheckerPage.hooks.unlockInsights')}
      </Link>
    </div>
  );
}

// ============================================================================
// Full Analysis CTA Card (conversion hook)
// ============================================================================

function FullAnalysisCard() {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {t('atsResumeCheckerPage.hooks.fullAnalysisTitle')}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {t('atsResumeCheckerPage.hooks.fullAnalysisDescription')}
          </p>
          <Link
            to="/login?source=ats-checker-analysis"
            onClick={() => trackAtsCheckerCtaClicked('full_analysis')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium text-sm hover:bg-purple-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {t('atsResumeCheckerPage.hooks.fullAnalysisCta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Rate Limit Card (conversion hook)
// ============================================================================

function RateLimitCard() {
  const { t } = useTranslation();

  useEffect(() => {
    trackAtsCheckerRateLimited();
  }, []);

  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7 text-amber-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {t('atsResumeCheckerPage.hooks.rateLimitTitle')}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {t('atsResumeCheckerPage.hooks.rateLimitDescription')}
      </p>
      <Link
        to="/login?source=ats-checker-rate-limit"
        onClick={() => trackAtsCheckerCtaClicked('rate_limit')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
      >
        {t('atsResumeCheckerPage.hooks.rateLimitCta')}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export function AtsResumeCheckerPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('atsResumeChecker', lang);

  // Form state
  const [resumeText, setResumeText] = useState('');
  const [profession, setProfession] = useState('');

  // Upload state
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Result state
  const [result, setResult] = useState<PublicAtsCheckResult | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  // UI state
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track landing view and engagement
  useEffect(() => {
    trackLandingView('ats-resume-checker');
    const cleanup = startLandingEngagementTracking('ats-resume-checker');
    return cleanup;
  }, []);

  const handleFileSelected = useCallback(async (file: File) => {
    setUploadedFile(file);
    setExtractionError(null);
    setIsExtracting(true);

    try {
      const result = await extractTextFromFile(file, false);
      if (result.success) {
        setResumeText(result.text);
      } else {
        setExtractionError(result.error || t('atsResumeCheckerPage.tool.extractionError'));
        setUploadedFile(null);
      }
    } catch {
      setExtractionError(t('atsResumeCheckerPage.tool.extractionError'));
      setUploadedFile(null);
    } finally {
      setIsExtracting(false);
    }
  }, [t]);

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null);
    setResumeText('');
    setExtractionError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelected(file);
    }
  }, [handleFileSelected]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelected(file);
    }
  }, [handleFileSelected]);

  const handleCheck = useCallback(async () => {
    if (!resumeText.trim() || isChecking) return;

    setIsChecking(true);
    setError(null);
    setResult(null);
    setIsRateLimited(false);

    try {
      const checkResult = await checkAtsPublic(
        resumeText,
        profession || undefined
      );

      setResult(checkResult);
      setRemaining(checkResult.remaining);

      trackAtsCheckCompleted(checkResult.score);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (err) {
      if (isPublicAtsCheckError(err)) {
        if (err.type === 'rate_limit') {
          setIsRateLimited(true);
          setRemaining(0);
        } else {
          setError(err.message);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsChecking(false);
    }
  }, [resumeText, profession, isChecking]);

  const isOverLimit = resumeText.length > MAX_CHARS;
  const canCheck = resumeText.trim().length >= 50 && !isOverLimit && !isChecking;

  const whyRejectedBullets = t('atsResumeCheckerPage.whyRejected.bullets', { returnObjects: true }) as string[];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${BASE_URL}/ats-resume-checker`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/ats-resume-checker`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/ats-resume-checker?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/ats-resume-checker`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`${BASE_URL}/ats-resume-checker`} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={`${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${BASE_URL}/images/og-default.png`} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={lang === 'es'
          ? 'verificador ats gratis, prueba ats cv, compatibilidad ats, sistema ats, optimización cv ats, verificar currículum ats'
          : 'free ats resume checker, ats test, ats compatibility check, ats resume scan, ats resume optimization, check resume ats free'
        } />
        <html lang={lang} />
        {lang !== 'es' && (
          <script type="application/ld+json">
            {JSON.stringify(generateFAQSchema([
              {
                question: 'What is an ATS resume checker?',
                answer: 'An ATS (Applicant Tracking System) resume checker analyzes your resume against the same filters employers use to screen candidates. It scores your resume on keyword usage, section structure, and formatting so you can fix issues before applying.',
              },
              {
                question: 'How does the free ATS score work?',
                answer: 'Paste your resume text and optionally enter your target role. Our AI analyzes your content in seconds, returning a 1-10 ATS compatibility score, a keyword breakdown by category (hard skills, soft skills, action verbs, industry terms), and actionable tips to improve.',
              },
              {
                question: 'Why do resumes get rejected by ATS?',
                answer: 'Most resumes are rejected because they lack role-specific keywords, use formatting that ATS parsers cannot read, or have weak unquantified achievements. A free ATS check helps you identify and fix these issues before you apply.',
              },
            ]))}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: lang === 'es' ? 'Verificador ATS de CV Gratis' : 'Free ATS Resume Checker',
            url: `${BASE_URL}/ats-resume-checker`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            description: seo.description,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            provider: {
              '@type': 'Organization',
              name: 'GetQuickResume',
              url: BASE_URL,
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* ================================================================ */}
        {/* Hero Section (compact) */}
        {/* ================================================================ */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  {t('atsResumeCheckerPage.hero.title')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                {t('atsResumeCheckerPage.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* ATS Check Tool */}
        {/* ================================================================ */}
        <section className="py-10 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tab Selector */}
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setInputMode('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    inputMode === 'upload'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  {t('atsResumeCheckerPage.tool.tabUpload')}
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('paste')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    inputMode === 'paste'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  {t('atsResumeCheckerPage.tool.tabPaste')}
                </button>
              </div>

              {/* Input Area */}
              <div className="p-4 sm:p-6">
                {inputMode === 'upload' ? (
                  <>
                    {/* Upload / Drag-and-drop Zone */}
                    {!uploadedFile && !isExtracting ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors ${
                          isDragOver
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/30'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          isDragOver ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Upload className={`w-6 h-6 ${isDragOver ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="text-center">
                          <p className={`text-sm font-medium ${isDragOver ? 'text-blue-600' : 'text-gray-700'}`}>
                            {t('atsResumeCheckerPage.tool.dropzoneLabel')}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {t('atsResumeCheckerPage.tool.dropzoneHint')}
                          </p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.docx,.txt"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </div>
                    ) : isExtracting ? (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 p-10">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        <p className="text-sm font-medium text-blue-600">
                          {t('atsResumeCheckerPage.tool.extracting')}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {t('atsResumeCheckerPage.tool.fileReady', {
                                  fileName: uploadedFile?.name,
                                  chars: resumeText.length.toLocaleString(),
                                })}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            {t('atsResumeCheckerPage.tool.removeFile')}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Extraction error */}
                    {extractionError && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
                        <XCircle className="w-4 h-4 flex-shrink-0" />
                        {extractionError}
                      </div>
                    )}

                    {/* Character count for uploaded file */}
                    {uploadedFile && resumeText.length > 0 && (
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs ${isOverLimit ? 'text-red-600 font-medium' : 'text-gray-400'}`}>
                          {isOverLimit
                            ? t('atsResumeCheckerPage.tool.charCountError')
                            : t('atsResumeCheckerPage.tool.charCount', { count: resumeText.length, max: MAX_CHARS })
                          }
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Paste Text Mode */}
                    <label htmlFor="resume-text" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('atsResumeCheckerPage.tool.pasteLabel')}
                    </label>
                    <textarea
                      id="resume-text"
                      rows={10}
                      className={`w-full rounded-xl border ${isOverLimit ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} p-4 text-sm text-gray-800 placeholder-gray-400 resize-y transition-colors`}
                      placeholder={t('atsResumeCheckerPage.tool.pastePlaceholder')}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      maxLength={MAX_CHARS + 500}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs ${isOverLimit ? 'text-red-600 font-medium' : 'text-gray-400'}`}>
                        {isOverLimit
                          ? t('atsResumeCheckerPage.tool.charCountError')
                          : t('atsResumeCheckerPage.tool.charCount', { count: resumeText.length, max: MAX_CHARS })
                        }
                      </span>
                      {remaining !== null && remaining > 0 && (
                        <span className="text-xs text-green-600 font-medium">
                          {t('atsResumeCheckerPage.tool.remaining', { count: remaining })}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Profession + Submit */}
              <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50/50">
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t('atsResumeCheckerPage.tool.professionLabel')}
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder={t('atsResumeCheckerPage.tool.professionPlaceholder')}
                      maxLength={100}
                      className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-sm bg-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Check Button */}
                <button
                  onClick={handleCheck}
                  disabled={!canCheck}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                    canCheck
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('atsResumeCheckerPage.tool.checking')}
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      {t('atsResumeCheckerPage.tool.checkButton')}
                    </>
                  )}
                </button>

                {/* Error message */}
                {error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* ============================================================ */}
            {/* Rate Limit State */}
            {/* ============================================================ */}
            {isRateLimited && (
              <div className="mt-6">
                <RateLimitCard />
              </div>
            )}

            {/* ============================================================ */}
            {/* Results Area */}
            {/* ============================================================ */}
            {result && (
              <div ref={resultRef} className="mt-8 space-y-6">
                {/* Score + Keywords */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <AtsScoreCard
                    score={result.score}
                    sectionsFound={result.sections.found}
                    sectionsMissing={result.sections.missing}
                  />
                  <KeywordSummaryCard analysis={result.keywordAnalysis} />
                </div>

                {/* Tips */}
                {result.tips.length > 0 && (
                  <TipsCard tips={result.tips} />
                )}

                {/* Remaining count */}
                {remaining !== null && remaining > 0 && (
                  <p className="text-center text-sm text-gray-500">
                    {t('atsResumeCheckerPage.tool.remaining', { count: remaining })}
                  </p>
                )}
                {remaining === 0 && !isRateLimited && (
                  <p className="text-center text-sm text-amber-600 font-medium">
                    {t('atsResumeCheckerPage.tool.noRemaining')}
                  </p>
                )}

                {/* ======================================================== */}
                {/* Conversion Hooks */}
                {/* ======================================================== */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <BlurredImprovementsCard improvementCount={result.improvementCount} />
                  <FullAnalysisCard />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================ */}
        {/* Why Resumes Get Rejected */}
        {/* ================================================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('atsResumeCheckerPage.whyRejected.title')}
              </h2>
            </div>

            <div className="grid gap-4 max-w-xl mx-auto">
              {whyRejectedBullets.map((bullet, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-gray-700 font-medium pt-1">{bullet}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-8 max-w-lg mx-auto">
              Need to apply in a different language?{' '}
              <Link to="/resume-translator" className="text-blue-600 font-medium hover:underline">
                Translate your resume
              </Link>{' '}
              while keeping it ATS-friendly. For a deeper look at translation options, read our{' '}
              <Link to="/best-resume-translators" className="text-blue-600 font-medium hover:underline">
                resume translation guide
              </Link>.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Trust Microcopy */}
        {/* ================================================================ */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">{t('atsResumeCheckerPage.trust.noCard')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{t('atsResumeCheckerPage.trust.atsTemplates')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">{t('atsResumeCheckerPage.trust.privacyNote')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Final CTA */}
        {/* ================================================================ */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              {t('atsResumeCheckerPage.finalCta.title')}
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              {t('atsResumeCheckerPage.finalCta.subtitle')}
            </p>
            <Link
              to="/login?source=ats-checker-final"
              onClick={() => trackAtsCheckerCtaClicked('final_cta')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto mx-4 sm:mx-0 px-6 sm:px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center leading-snug"
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              <span>{t('atsResumeCheckerPage.finalCta.button')}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
