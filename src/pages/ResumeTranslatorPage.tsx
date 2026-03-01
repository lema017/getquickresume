import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Globe,
  Shield,
  Target,
  Pencil,
  Languages,
  Copy,
  Check,
  Lock,
  Sparkles,
  FileText,
  Download,
  BarChart3,
  XCircle,
  AlertTriangle,
  Loader2,
  Upload,
  X,
} from 'lucide-react';
import { getPageSEO, BASE_URL } from '@/utils/seoConfig';
import { SUPPORTED_LANGUAGES } from '@/services/resumeTranslationService';
import { translateResumePublic, isPublicTranslationError } from '@/services/publicTranslationService';
import { extractTextFromFile } from '@/utils/documentTextExtractor';
import { 
  trackLandingView,
  trackTranslateCompleted,
  trackScoreTeaserViewed,
  trackTranslatorCtaClicked,
  trackTranslatorRateLimited,
  startLandingEngagementTracking,
} from '@/services/marketingAnalytics';

const MAX_CHARS = 10000;

// ============================================================================
// Score Teaser Card (conversion hook)
// ============================================================================

function ScoreTeaserCard({ score, improvementCount }: { score: number; improvementCount: number }) {
  const { t } = useTranslation();

  useEffect(() => {
    trackScoreTeaserViewed(score);
  }, [score]);

  const getScoreColor = (s: number) => {
    if (s >= 8) return { ring: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' };
    if (s >= 6) return { ring: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (s >= 4) return { ring: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { ring: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
  };

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (score / 10) * circumference;

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-6`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        {t('resumeTranslatorPage.hooks.scoreTitle')}
      </h3>
      
      <div className="flex items-center gap-6">
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
            {t('resumeTranslatorPage.hooks.scoreValue', { score })}
          </p>
          {score < 7 && (
            <p className="text-sm text-amber-700 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {t('resumeTranslatorPage.hooks.scoreLow')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Blurred Insights Card (conversion hook)
// ============================================================================

function BlurredInsightsCard({ improvementCount }: { improvementCount: number }) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        {t('resumeTranslatorPage.hooks.improvementsFound', { count: improvementCount })}
      </h3>

      <div className="space-y-2 mb-4">
        {[
          t('resumeTranslatorPage.hooks.improvementBlurred1'),
          t('resumeTranslatorPage.hooks.improvementBlurred2'),
          t('resumeTranslatorPage.hooks.improvementBlurred3'),
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
            <Lock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="text-sm text-gray-500 blur-[3px] select-none">{text}</span>
          </div>
        ))}
      </div>

      <Link
        to="/login?source=translator-insights"
        onClick={() => trackTranslatorCtaClicked('insights')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors"
      >
        <Lock className="w-4 h-4" />
        {t('resumeTranslatorPage.hooks.unlockInsights')}
      </Link>
    </div>
  );
}

// ============================================================================
// Save Resume Card (conversion hook)
// ============================================================================

function SaveResumeCard() {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {t('resumeTranslatorPage.hooks.saveTitle')}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {t('resumeTranslatorPage.hooks.saveDescription')}
          </p>
          <Link
            to="/login?source=translator-save"
            onClick={() => trackTranslatorCtaClicked('save')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            {t('resumeTranslatorPage.hooks.saveCta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
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
            {t('resumeTranslatorPage.hooks.fullAnalysisTitle')}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {t('resumeTranslatorPage.hooks.fullAnalysisDescription')}
          </p>
          <Link
            to="/login?source=translator-analysis"
            onClick={() => trackTranslatorCtaClicked('full_analysis')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium text-sm hover:bg-purple-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {t('resumeTranslatorPage.hooks.fullAnalysisCta')}
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
    trackTranslatorRateLimited();
  }, []);

  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7 text-amber-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {t('resumeTranslatorPage.hooks.rateLimitTitle')}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {t('resumeTranslatorPage.hooks.rateLimitDescription')}
      </p>
      <Link
        to="/login?source=translator-rate-limit"
        onClick={() => trackTranslatorCtaClicked('rate_limit')}
        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
      >
        {t('resumeTranslatorPage.hooks.rateLimitCta')}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export function ResumeTranslatorPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('resumeTranslator', lang);

  // Form state
  const [resumeText, setResumeText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');

  // Upload state
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalPdfBytes, setOriginalPdfBytes] = useState<ArrayBuffer | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Result state
  const [translatedText, setTranslatedText] = useState('');
  const [scoreTeaser, setScoreTeaser] = useState<{ score: number; improvementCount: number } | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  // UI state
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [copied, setCopied] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track landing view and engagement
  useEffect(() => {
    trackLandingView('resume-translator');
    const cleanup = startLandingEngagementTracking('resume-translator');
    return cleanup;
  }, []);

  const handleFileSelected = useCallback(async (file: File) => {
    setUploadedFile(file);
    setExtractionError(null);
    setIsExtracting(true);
    setPdfError(null);

    try {
      // Store original bytes if it's a PDF (for later PDF generation)
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (fileExt === 'pdf') {
        const bytes = await file.arrayBuffer();
        setOriginalPdfBytes(bytes);
      } else {
        setOriginalPdfBytes(null);
      }

      const result = await extractTextFromFile(file, false);
      if (result.success) {
        setResumeText(result.text);
      } else {
        setExtractionError(result.error || t('resumeTranslatorPage.tool.extractionError'));
        setUploadedFile(null);
        setOriginalPdfBytes(null);
      }
    } catch {
      setExtractionError(t('resumeTranslatorPage.tool.extractionError'));
      setUploadedFile(null);
      setOriginalPdfBytes(null);
    } finally {
      setIsExtracting(false);
    }
  }, [t]);

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null);
    setOriginalPdfBytes(null);
    setResumeText('');
    setExtractionError(null);
    setPdfError(null);
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

  const handleDownloadPdf = useCallback(async () => {
    if (!originalPdfBytes || !translatedText) return;

    setIsGeneratingPdf(true);
    setPdfError(null);

    try {
      const { replaceTextInPdf } = await import('@/utils/pdfTextReplacer');
      const modifiedPdfBytes = await replaceTextInPdf(originalPdfBytes, translatedText);

      const blob = new Blob([modifiedPdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const baseName = uploadedFile?.name?.replace(/\.pdf$/i, '') || 'resume';
      a.download = `${baseName}-translated.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation error:', err);
      setPdfError(t('resumeTranslatorPage.tool.downloadPdfError'));
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [originalPdfBytes, translatedText, uploadedFile, t]);

  const handleTranslate = useCallback(async () => {
    if (!resumeText.trim() || !targetLanguage || isTranslating) return;

    setIsTranslating(true);
    setError(null);
    setTranslatedText('');
    setScoreTeaser(null);
    setIsRateLimited(false);

    try {
      const result = await translateResumePublic(
        resumeText,
        targetLanguage,
        sourceLanguage || undefined
      );

      setTranslatedText(result.translatedText);
      setScoreTeaser(result.scoreTeaser);
      setRemaining(result.remaining);

      trackTranslateCompleted(targetLanguage, sourceLanguage || 'auto');

      // Scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (err) {
      if (isPublicTranslationError(err)) {
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
      setIsTranslating(false);
    }
  }, [resumeText, targetLanguage, sourceLanguage, isTranslating]);

  const handleCopy = useCallback(() => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [translatedText]);

  const isOverLimit = resumeText.length > MAX_CHARS;
  const canTranslate = resumeText.trim().length >= 50 && targetLanguage && !isOverLimit && !isTranslating;

  const whyDifferentBullets = t('resumeTranslatorPage.whyDifferent.bullets', { returnObjects: true }) as string[];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${BASE_URL}/resume-translator`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/resume-translator`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/resume-translator?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/resume-translator`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`${BASE_URL}/resume-translator`} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={`${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${BASE_URL}/images/og-default.png`} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={lang === 'es'
          ? 'traducción de cv gratis, traducir currículum gratis, traducir cv a inglés, traducción de currículum con ia'
          : 'free resume translation, translate resume free, translate resume to english, ai resume translation, cv translation free'
        } />
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
                  {t('resumeTranslatorPage.hero.title')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                {t('resumeTranslatorPage.hero.subtitle')}
              </p>
              <p className="mt-3 text-sm text-blue-200/80 max-w-xl mx-auto">
                Looking for alternatives? See our roundup of the{' '}
                <Link to="/best-resume-translators" className="text-white underline underline-offset-2 hover:text-blue-100">
                  best resume translators
                </Link>{' '}
                to find the right fit.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Translation Tool */}
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
                  {t('resumeTranslatorPage.tool.tabUpload')}
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
                  {t('resumeTranslatorPage.tool.tabPaste')}
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
                            {t('resumeTranslatorPage.tool.dropzoneLabel')}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {t('resumeTranslatorPage.tool.dropzoneHint')}
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
                          {t('resumeTranslatorPage.tool.extracting')}
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
                                {t('resumeTranslatorPage.tool.fileReady', {
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
                            {t('resumeTranslatorPage.tool.removeFile')}
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
                            ? t('resumeTranslatorPage.tool.charCountError')
                            : t('resumeTranslatorPage.tool.charCount', { count: resumeText.length, max: MAX_CHARS })
                          }
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Paste Text Mode */}
                    <label htmlFor="resume-text" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('resumeTranslatorPage.tool.pasteLabel')}
                    </label>
                    <textarea
                      id="resume-text"
                      rows={10}
                      className={`w-full rounded-xl border ${isOverLimit ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} p-4 text-sm text-gray-800 placeholder-gray-400 resize-y transition-colors`}
                      placeholder={t('resumeTranslatorPage.tool.pastePlaceholder')}
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      maxLength={MAX_CHARS + 500}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs ${isOverLimit ? 'text-red-600 font-medium' : 'text-gray-400'}`}>
                        {isOverLimit
                          ? t('resumeTranslatorPage.tool.charCountError')
                          : t('resumeTranslatorPage.tool.charCount', { count: resumeText.length, max: MAX_CHARS })
                        }
                      </span>
                      {remaining !== null && remaining > 0 && (
                        <span className="text-xs text-green-600 font-medium">
                          {t('resumeTranslatorPage.tool.remaining', { count: remaining })}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Language Selection */}
              <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-50/50">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Source Language */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t('resumeTranslatorPage.tool.sourceLanguage')}
                    </label>
                    <select
                      value={sourceLanguage}
                      onChange={(e) => setSourceLanguage(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{t('resumeTranslatorPage.tool.autoDetect')}</option>
                      {SUPPORTED_LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code} disabled={l.code === targetLanguage}>
                          {l.flag} {l.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target Language */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      {t('resumeTranslatorPage.tool.targetLanguage')}
                    </label>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">—</option>
                      {SUPPORTED_LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code} disabled={l.code === sourceLanguage}>
                          {l.flag} {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Translate Button */}
                <button
                  onClick={handleTranslate}
                  disabled={!canTranslate}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                    canTranslate
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isTranslating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('resumeTranslatorPage.tool.translating')}
                    </>
                  ) : (
                    <>
                      <Languages className="w-5 h-5" />
                      {t('resumeTranslatorPage.tool.translateButton')}
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
            {translatedText && (
              <div ref={resultRef} className="mt-8 space-y-6">
                {/* Translated Text */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      {t('resumeTranslatorPage.tool.resultLabel')}
                    </h2>
                    <div className="flex items-center gap-2">
                      {originalPdfBytes && (
                        <button
                          onClick={handleDownloadPdf}
                          disabled={isGeneratingPdf}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingPdf ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              {t('resumeTranslatorPage.tool.generatingPdf')}
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              {t('resumeTranslatorPage.tool.downloadPdf')}
                            </>
                          )}
                        </button>
                      )}
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">{t('resumeTranslatorPage.tool.copied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            {t('resumeTranslatorPage.tool.copyButton')}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  {/* PDF generation error */}
                  {pdfError && (
                    <div className="mx-4 sm:mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0" />
                      {pdfError}
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                      {translatedText}
                    </pre>
                  </div>
                </div>

                {/* Remaining count */}
                {remaining !== null && remaining > 0 && (
                  <p className="text-center text-sm text-gray-500">
                    {t('resumeTranslatorPage.tool.remaining', { count: remaining })}
                  </p>
                )}
                {remaining === 0 && !isRateLimited && (
                  <p className="text-center text-sm text-amber-600 font-medium">
                    {t('resumeTranslatorPage.tool.noRemaining')}
                  </p>
                )}

                {/* ======================================================== */}
                {/* Conversion Hooks */}
                {/* ======================================================== */}
                {scoreTeaser && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <ScoreTeaserCard score={scoreTeaser.score} improvementCount={scoreTeaser.improvementCount} />
                    <BlurredInsightsCard improvementCount={scoreTeaser.improvementCount} />
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <SaveResumeCard />
                  <FullAnalysisCard />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================ */}
        {/* Why Resume Translation is Different */}
        {/* ================================================================ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('resumeTranslatorPage.whyDifferent.title')}
              </h2>
            </div>
            <div className="grid gap-4 max-w-xl mx-auto">
              {whyDifferentBullets.map((bullet, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-gray-700 font-medium pt-1">{bullet}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-8 max-w-lg mx-auto">
              Once your resume is translated,{' '}
              <Link to="/ats-resume-checker" className="text-blue-600 font-medium hover:underline">
                check your resume's ATS compatibility
              </Link>{' '}
              to make sure it passes automated filters.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* Supported Languages */}
        {/* ================================================================ */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('resumeTranslatorPage.supportedLanguages.title')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t('resumeTranslatorPage.supportedLanguages.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {SUPPORTED_LANGUAGES.map((language) => (
                <div
                  key={language.code}
                  className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{language.flag}</span>
                  <span className="text-gray-700 font-medium text-sm">{language.name}</span>
                </div>
              ))}
            </div>
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
                <span className="font-medium">{t('resumeTranslatorPage.trust.noCard')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{t('resumeTranslatorPage.trust.atsFriendly')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Pencil className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">{t('resumeTranslatorPage.trust.privacyNote')}</span>
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
              {t('resumeTranslatorPage.finalCta.title')}
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              {t('resumeTranslatorPage.finalCta.subtitle')}
            </p>
            <Link
              to="/login?source=translator-final"
              onClick={() => trackTranslatorCtaClicked('final_cta')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto mx-4 sm:mx-0 px-6 sm:px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center leading-snug"
            >
              <Globe className="w-5 h-5 flex-shrink-0" />
              <span>{t('resumeTranslatorPage.hero.ctaPrimary')}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
