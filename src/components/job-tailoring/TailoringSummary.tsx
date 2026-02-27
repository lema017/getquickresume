import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Plus,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Shield,
  Award,
  XCircle,
  X,
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { AddKeywordModal } from './AddKeywordModal';
import { RateLimitModal } from '@/components/RateLimitModal';
import { KeywordItem, ClaimedKeyword } from '@/types/jobTailoring';

interface TailoringSummaryProps {
  onNext: () => void;
  onBack: () => void;
}

export function TailoringSummary({ onNext, onBack }: TailoringSummaryProps) {
  const { t } = useTranslation();
  const {
    jobAnalysis,
    isAnalyzing,
    claimedKeywords,
    addClaimedKeyword,
    removeClaimedKeyword,
    generateTailoredResume,
    isGeneratingTailored,
  } = useJobTailoringStore();

  // UI state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    strengths: true,
    weaknesses: true,
    criticalKeywords: true,
    importantKeywords: false,
    niceToHaveKeywords: false,
    matchedKeywords: false,
  });
  const [selectedKeyword, setSelectedKeyword] = useState<{
    keyword: string;
    importance: 'critical' | 'important' | 'nice_to_have';
  } | null>(null);
  const [isAddingKeyword, setIsAddingKeyword] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Check if a keyword has been claimed
  const isKeywordClaimed = (keyword: string) => {
    return claimedKeywords.some(ck => ck.keyword.toLowerCase() === keyword.toLowerCase());
  };

  // Get score status
  const getScoreStatus = (score: number) => {
    if (score >= 90) return { label: t('jobTailoring.summary.excellent', 'Excellent'), color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { label: t('jobTailoring.summary.good', 'Good'), color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 50) return { label: t('jobTailoring.summary.needsImprovement', 'Needs Improvement'), color: 'text-orange-600', bg: 'bg-orange-100' };
    return { label: t('jobTailoring.summary.poor', 'Poor'), color: 'text-red-600', bg: 'bg-red-100' };
  };

  // Handle keyword claim
  const handleClaimKeyword = async (keyword: string, context: string) => {
    if (!selectedKeyword) return;
    
    setIsAddingKeyword(true);
    try {
      addClaimedKeyword(keyword, selectedKeyword.importance, context);
      setSelectedKeyword(null);
    } catch (error) {
      console.error('Error claiming keyword:', error);
      throw error;
    } finally {
      setIsAddingKeyword(false);
    }
  };

  // Handle proceeding to generate tailored resume
  const handleProceed = async () => {
    setIsRateLimited(false);
    setRateLimitError(null);

    try {
      await generateTailoredResume();
      onNext();
    } catch (err: any) {
      if (err?.code === 'RATE_LIMIT' || err?.statusCode === 429) {
        setIsRateLimited(true);
        setRateLimitError(err.message);
      } else if (err?.code === 'USAGE_LIMIT_REACHED') {
        // Handle usage limit error - show appropriate message
        setRateLimitError(err.message);
      } else {
        console.error('Error generating tailored resume:', err);
      }
    }
  };

  // Extract keyword analysis data
  const keywordAnalysis = jobAnalysis?.keywordAnalysis;
  const atsBreakdown = jobAnalysis?.atsBreakdown;
  const strengths = jobAnalysis?.strengths || [];
  const weaknesses = jobAnalysis?.weaknesses || [];
  const matchScore = jobAnalysis?.matchScore || 0;

  // Get missing keywords
  const missingCritical = useMemo(() => {
    return keywordAnalysis?.matchAnalysis?.missingCritical || [];
  }, [keywordAnalysis]);

  const missingImportant = useMemo(() => {
    return keywordAnalysis?.matchAnalysis?.missingImportant || [];
  }, [keywordAnalysis]);

  const missingNiceToHave = useMemo(() => {
    return keywordAnalysis?.matchAnalysis?.missingNiceToHave || [];
  }, [keywordAnalysis]);

  const matchedKeywords = useMemo(() => {
    return keywordAnalysis?.matchAnalysis?.matchedList || [];
  }, [keywordAnalysis]);

  // Loading state
  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('jobTailoring.summary.analyzing', 'Analyzing Your Resume')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('jobTailoring.summary.analyzingDesc', 'Running comprehensive ATS analysis and keyword matching...')}
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!jobAnalysis) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <p className="text-gray-500">{t('jobTailoring.summary.noData', 'No analysis data available')}</p>
          <button onClick={onBack} className="mt-4 text-orange-600 hover:text-orange-700 font-medium">
            {t('jobTailoring.summary.goBack', 'Go back and try again')}
          </button>
        </div>
      </div>
    );
  }

  const scoreStatus = getScoreStatus(matchScore);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('jobTailoring.summary.title', 'Tailoring Summary')}
        </h2>
        <p className="text-gray-600">
          {t('jobTailoring.summary.subtitle', 'Review your ATS score and claim missing keywords you have experience with')}
        </p>
      </div>

      {/* ATS Score Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 mb-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Score Display */}
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm font-medium mb-2">
              {t('jobTailoring.summary.atsScore', 'ATS Match Score')}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-white">{matchScore}</span>
              <span className="text-2xl text-slate-400">/100</span>
            </div>
            <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full ${scoreStatus.bg}`}>
              <span className={`text-sm font-semibold ${scoreStatus.color}`}>{scoreStatus.label}</span>
            </div>
          </div>

          {/* Score Gauge Visual */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              {/* Background circle */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-700"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${matchScore * 2.83} 283`}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400">
                    {t('jobTailoring.summary.canImprove', 'Can improve')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-xs text-slate-400">{t('jobTailoring.summary.matchedKeywords', 'Matched Keywords')}</p>
                <p className="text-lg font-semibold text-white">{matchedKeywords.length}</p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-xs text-slate-400">{t('jobTailoring.summary.missingCritical', 'Missing Critical')}</p>
                <p className="text-lg font-semibold text-white">{missingCritical.length}</p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 flex items-center gap-3">
              <Plus className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">{t('jobTailoring.summary.keywordsClaimed', 'Keywords Claimed')}</p>
                <p className="text-lg font-semibold text-white">{claimedKeywords.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Strengths Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('strengths')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('jobTailoring.summary.strengths', 'Resume Strengths')}
                </h3>
                <p className="text-sm text-gray-500">{strengths.length} {t('jobTailoring.summary.itemsFound', 'items found')}</p>
              </div>
            </div>
            {expandedSections.strengths ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {expandedSections.strengths && (
            <div className="px-6 pb-6 space-y-2">
              {strengths.length > 0 ? (
                strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-green-50 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">{strength}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  {t('jobTailoring.summary.noStrengths', 'No specific strengths identified yet')}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Weaknesses Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('weaknesses')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-xl">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('jobTailoring.summary.areasToImprove', 'Areas to Improve')}
                </h3>
                <p className="text-sm text-gray-500">{weaknesses.length} {t('jobTailoring.summary.suggestionsFound', 'suggestions')}</p>
              </div>
            </div>
            {expandedSections.weaknesses ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {expandedSections.weaknesses && (
            <div className="px-6 pb-6 space-y-2">
              {weaknesses.length > 0 ? (
                weaknesses.map((weakness, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-orange-800">{weakness}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  {t('jobTailoring.summary.noWeaknesses', 'No specific areas to improve identified')}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Keyword Analysis Section */}
      <div className="space-y-4 mb-8">
        {/* Critical Missing Keywords */}
        {missingCritical.length > 0 && (
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('criticalKeywords')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('jobTailoring.summary.missingCriticalKeywords', 'Missing Critical Keywords')}
                  </h3>
                  <p className="text-sm text-red-600 font-medium">
                    {t('jobTailoring.summary.claimIfYouHave', 'Click + to claim if you have this experience')}
                  </p>
                </div>
              </div>
              {expandedSections.criticalKeywords ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedSections.criticalKeywords && (
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {missingCritical.map((item: KeywordItem, idx) => {
                    const isClaimed = isKeywordClaimed(item.keyword);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          isClaimed
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200'
                        }`}
                      >
                        {isClaimed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        <span>{item.keyword}</span>
                        {!isClaimed && (
                          <button
                            onClick={() => setSelectedKeyword({ keyword: item.keyword, importance: 'critical' })}
                            className="p-1 hover:bg-red-300 rounded-full transition-colors"
                            title={t('jobTailoring.summary.claimKeyword', 'Claim this keyword')}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                        {isClaimed && (
                          <button
                            onClick={() => removeClaimedKeyword(item.keyword)}
                            className="p-1 hover:bg-green-200 rounded-full transition-colors"
                            title={t('jobTailoring.summary.removeKeyword', 'Remove claim')}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Important Missing Keywords */}
        {missingImportant.length > 0 && (
          <div className="bg-white rounded-2xl border border-orange-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('importantKeywords')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('jobTailoring.summary.missingImportantKeywords', 'Missing Important Keywords')}
                  </h3>
                  <p className="text-sm text-orange-600">
                    {missingImportant.length} {t('jobTailoring.summary.keywordsToConsider', 'keywords to consider')}
                  </p>
                </div>
              </div>
              {expandedSections.importantKeywords ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedSections.importantKeywords && (
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {missingImportant.map((item: KeywordItem, idx) => {
                    const isClaimed = isKeywordClaimed(item.keyword);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          isClaimed
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-200'
                        }`}
                      >
                        {isClaimed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span>{item.keyword}</span>
                        {!isClaimed && (
                          <button
                            onClick={() => setSelectedKeyword({ keyword: item.keyword, importance: 'important' })}
                            className="p-1 hover:bg-orange-300 rounded-full transition-colors"
                            title={t('jobTailoring.summary.claimKeyword', 'Claim this keyword')}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                        {isClaimed && (
                          <button
                            onClick={() => removeClaimedKeyword(item.keyword)}
                            className="p-1 hover:bg-green-200 rounded-full transition-colors"
                            title={t('jobTailoring.summary.removeKeyword', 'Remove claim')}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nice-to-Have Missing Keywords */}
        {missingNiceToHave.length > 0 && (
          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('niceToHaveKeywords')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('jobTailoring.summary.missingNiceToHaveKeywords', 'Nice-to-Have Skills')}
                  </h3>
                  <p className="text-sm text-blue-600">
                    {missingNiceToHave.length} {t('jobTailoring.summary.bonusKeywords', 'bonus keywords to consider')}
                  </p>
                </div>
              </div>
              {expandedSections.niceToHaveKeywords ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedSections.niceToHaveKeywords && (
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {missingNiceToHave.map((item: KeywordItem, idx) => {
                    const isClaimed = isKeywordClaimed(item.keyword);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          isClaimed
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                        }`}
                      >
                        {isClaimed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        <span>{item.keyword}</span>
                        {!isClaimed && (
                          <button
                            onClick={() => setSelectedKeyword({ keyword: item.keyword, importance: 'nice_to_have' })}
                            className="p-1 hover:bg-blue-300 rounded-full transition-colors"
                            title={t('jobTailoring.summary.claimKeyword', 'Claim this keyword')}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                        {isClaimed && (
                          <button
                            onClick={() => removeClaimedKeyword(item.keyword)}
                            className="p-1 hover:bg-green-200 rounded-full transition-colors"
                            title={t('jobTailoring.summary.removeKeyword', 'Remove claim')}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Matched Keywords */}
        {matchedKeywords.length > 0 && (
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('matchedKeywords')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('jobTailoring.summary.matchedKeywords', 'Matched Keywords')}
                  </h3>
                  <p className="text-sm text-green-600">
                    {matchedKeywords.length} {t('jobTailoring.summary.keywordsAlreadyPresent', 'keywords already in your resume')}
                  </p>
                </div>
              </div>
              {expandedSections.matchedKeywords ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {expandedSections.matchedKeywords && (
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {matchedKeywords.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium border border-green-200"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{item.keyword}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Claimed Keywords Summary */}
      {claimedKeywords.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t('jobTailoring.summary.claimedKeywordsSummary', 'Keywords You\'ve Claimed')}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {claimedKeywords.map((ck: ClaimedKeyword, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 bg-white text-blue-700 rounded-xl text-sm font-medium border border-blue-200 shadow-sm"
              >
                <Shield className="w-4 h-4" />
                <span>{ck.keyword}</span>
                <button
                  onClick={() => removeClaimedKeyword(ck.keyword)}
                  className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-blue-700">
            {t('jobTailoring.summary.claimedKeywordsNote', 'These keywords will be incorporated into your tailored resume based on your described experience.')}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.back', 'Back')}
        </button>
        <button
          onClick={handleProceed}
          disabled={isGeneratingTailored || isRateLimited}
          className={`flex items-center gap-2 px-8 py-3 font-medium rounded-xl shadow-md transition-all ${
            isGeneratingTailored || isRateLimited
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 hover:shadow-lg'
          }`}
        >
          {isGeneratingTailored
            ? t('jobTailoring.summary.generating', 'Generating...')
            : t('jobTailoring.summary.generateTailored', 'Generate Tailored Resume')
          }
          {isGeneratingTailored ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Add Keyword Modal */}
      {selectedKeyword && (
        <AddKeywordModal
          isOpen={!!selectedKeyword}
          onClose={() => setSelectedKeyword(null)}
          keyword={selectedKeyword.keyword}
          importance={selectedKeyword.importance}
          onSubmit={handleClaimKeyword}
          isLoading={isAddingKeyword}
        />
      )}

      {/* Rate Limit Modal */}
      <RateLimitModal
        isOpen={isRateLimited}
        message={rateLimitError || undefined}
        onRetry={handleProceed}
        onClose={() => {
          setIsRateLimited(false);
          setRateLimitError(null);
        }}
        countdownSeconds={60}
      />
    </div>
  );
}

export default TailoringSummary;
