import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Plus,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  Award,
  XCircle,
  Info,
} from 'lucide-react';
import { KeywordAnalysis } from '@/types/jobTailoring';
import { AddKeywordModal } from './AddKeywordModal';

interface KeywordIntelligenceProps {
  keywordAnalysis: KeywordAnalysis;
  keywordsAdded: string[];
  matchPercentageBefore: number;
  matchPercentageAfter: number;
  onIncorporateKeyword?: (keyword: string, context: string, importance: 'critical' | 'important' | 'nice_to_have') => Promise<void>;
  isIncorporatingKeyword?: boolean;
}

export function KeywordIntelligence({
  keywordAnalysis,
  keywordsAdded,
  matchPercentageBefore,
  matchPercentageAfter,
  onIncorporateKeyword,
  isIncorporatingKeyword = false,
}: KeywordIntelligenceProps) {
  const { t } = useTranslation();
  const { matchAnalysis } = keywordAnalysis;

  // State for sections and modal
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    critical: true,
    important: false,
    niceToHave: false,
    added: true,
    differentiators: false,
  });
  const [selectedKeyword, setSelectedKeyword] = useState<{
    keyword: string;
    importance: 'critical' | 'important' | 'nice_to_have';
  } | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate improvement
  const improvement = matchPercentageAfter - matchPercentageBefore;

  // Get critical, important, and nice-to-have keywords
  const criticalMatched = matchAnalysis.matchedList?.filter(m => m.jobImportance === 'critical') || [];
  const criticalMissing = matchAnalysis.missingCritical || [];
  const criticalTotal = criticalMatched.length + criticalMissing.length;

  const importantMatched = matchAnalysis.matchedList?.filter(m => m.jobImportance === 'important') || [];
  const importantMissing = matchAnalysis.missingImportant || [];
  const importantTotal = importantMatched.length + importantMissing.length;

  const niceToHaveMatched = matchAnalysis.matchedList?.filter(m => m.jobImportance === 'nice_to_have') || [];
  const niceToHaveMissing = matchAnalysis.missingNiceToHave || [];
  const niceToHaveTotal = niceToHaveMatched.length + niceToHaveMissing.length;

  const differentiators = matchAnalysis.extraResumeKeywords || [];

  // Handler for keyword incorporation
  const handleIncorporateKeyword = async (keyword: string, context: string) => {
    if (onIncorporateKeyword && selectedKeyword) {
      await onIncorporateKeyword(keyword, context, selectedKeyword.importance);
      setSelectedKeyword(null);
    }
  };

  // Get score status for color coding
  const getScoreStatus = (score: number) => {
    if (score >= 90) return { color: 'text-green-600', bg: 'bg-green-500', bgLight: 'bg-green-100' };
    if (score >= 70) return { color: 'text-blue-600', bg: 'bg-blue-500', bgLight: 'bg-blue-100' };
    if (score >= 50) return { color: 'text-orange-600', bg: 'bg-orange-500', bgLight: 'bg-orange-100' };
    return { color: 'text-red-600', bg: 'bg-red-500', bgLight: 'bg-red-100' };
  };

  const beforeStatus = getScoreStatus(matchPercentageBefore);
  const afterStatus = getScoreStatus(matchPercentageAfter);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-xl">
            <Target className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {t('jobTailoring.keywordIntelligence.title', 'ATS Keyword Intelligence')}
            </h3>
            <p className="text-sm text-slate-400">
              {t('jobTailoring.keywordIntelligence.subtitle', 'Your keyword optimization results')}
            </p>
          </div>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Before */}
          <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {t('jobTailoring.keywordIntelligence.before', 'Before Tailoring')}
            </p>
            <div className={`text-3xl font-bold ${beforeStatus.color}`}>
              {matchPercentageBefore}%
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${beforeStatus.bg} rounded-full transition-all duration-500`}
                style={{ width: `${matchPercentageBefore}%` }}
              />
            </div>
          </div>

          {/* Improvement Arrow */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span className="text-2xl font-bold text-green-600">+{improvement}%</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {t('jobTailoring.keywordIntelligence.improved', 'Improvement')}
            </p>
          </div>

          {/* After */}
          <div className={`text-center p-4 rounded-xl shadow-sm ${
            matchPercentageAfter >= 90 
              ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' 
              : 'bg-white border border-gray-200'
          }`}>
            <p className={`text-xs uppercase tracking-wider mb-1 ${
              matchPercentageAfter >= 90 ? 'text-green-100' : 'text-gray-500'
            }`}>
              {t('jobTailoring.keywordIntelligence.after', 'After Tailoring')}
            </p>
            <div className={`text-3xl font-bold ${
              matchPercentageAfter >= 90 ? 'text-white' : afterStatus.color
            }`}>
              {matchPercentageAfter}%
            </div>
            <div className={`mt-2 h-2 rounded-full overflow-hidden ${
              matchPercentageAfter >= 90 ? 'bg-green-400/30' : 'bg-gray-200'
            }`}>
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  matchPercentageAfter >= 90 ? 'bg-white' : afterStatus.bg
                }`}
                style={{ width: `${matchPercentageAfter}%` }}
              />
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full">
            <CheckCircle className="w-4 h-4" />
            <span>{matchAnalysis.matchedKeywords || 0} {t('jobTailoring.keywordIntelligence.matched', 'matched')}</span>
          </div>
          {criticalMissing.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-full">
              <AlertTriangle className="w-4 h-4" />
              <span>{criticalMissing.length} {t('jobTailoring.keywordIntelligence.criticalMissing', 'critical missing')}</span>
            </div>
          )}
          {importantMissing.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full">
              <AlertCircle className="w-4 h-4" />
              <span>{importantMissing.length} {t('jobTailoring.keywordIntelligence.importantMissing', 'important missing')}</span>
            </div>
          )}
          {niceToHaveMissing.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full">
              <Info className="w-4 h-4" />
              <span>{niceToHaveMissing.length} {t('jobTailoring.keywordIntelligence.niceToHaveMissing', 'nice-to-have missing')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Critical Requirements Section */}
      {criticalTotal > 0 && (
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection('critical')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${criticalMissing.length > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                {criticalMissing.length > 0 ? (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  {t('jobTailoring.keywordIntelligence.criticalRequirements', 'Critical Requirements')}
                </h4>
                <p className="text-sm text-gray-500">
                  {criticalMatched.length}/{criticalTotal} {t('jobTailoring.keywordIntelligence.matched', 'matched')}
                </p>
              </div>
            </div>
            {expandedSections.critical ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {expandedSections.critical && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {/* Matched Critical */}
                {criticalMatched.map((item, idx) => (
                  <div
                    key={`matched-${idx}`}
                    className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium border border-green-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{item.keyword}</span>
                    {item.resumeFrequency > 1 && (
                      <span className="text-green-600 text-xs">({item.resumeFrequency}x)</span>
                    )}
                  </div>
                ))}
                {/* Missing Critical */}
                {criticalMissing.map((item, idx) => (
                  <div
                    key={`missing-${idx}`}
                    className="flex items-center gap-1"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-medium border border-red-200">
                      <XCircle className="w-4 h-4" />
                      <span>{item.keyword}</span>
                    </div>
                    {onIncorporateKeyword && (
                      <button
                        onClick={() => setSelectedKeyword({ keyword: item.keyword, importance: 'critical' })}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                        title={t('jobTailoring.keywordIntelligence.addKeywordTitle', 'I have this skill - add to resume')}
                      >
                        <Plus className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {criticalMissing.length > 0 && onIncorporateKeyword && (
                <p className="text-xs text-red-600 mt-3 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  {t('jobTailoring.keywordIntelligence.addCriticalHint', 'Click + to add keywords you have experience with')}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Important Skills Section */}
      {importantTotal > 0 && (
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection('important')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${importantMissing.length > 0 ? 'bg-orange-100' : 'bg-green-100'}`}>
                {importantMissing.length > 0 ? (
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  {t('jobTailoring.keywordIntelligence.importantSkills', 'Important Skills')}
                </h4>
                <p className="text-sm text-gray-500">
                  {importantMatched.length}/{importantTotal} {t('jobTailoring.keywordIntelligence.matched', 'matched')}
                </p>
              </div>
            </div>
            {expandedSections.important ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {expandedSections.important && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {/* Matched Important */}
                {importantMatched.map((item, idx) => (
                  <div
                    key={`matched-${idx}`}
                    className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium border border-green-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{item.keyword}</span>
                  </div>
                ))}
                {/* Missing Important */}
                {importantMissing.map((item, idx) => (
                  <div
                    key={`missing-${idx}`}
                    className="flex items-center gap-1"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-xl text-sm font-medium border border-orange-200">
                      <AlertCircle className="w-4 h-4" />
                      <span>{item.keyword}</span>
                    </div>
                    {onIncorporateKeyword && (
                      <button
                        onClick={() => setSelectedKeyword({ keyword: item.keyword, importance: 'important' })}
                        className="p-2 hover:bg-orange-100 rounded-lg transition-colors group"
                        title={t('jobTailoring.keywordIntelligence.addKeywordTitle', 'I have this skill - add to resume')}
                      >
                        <Plus className="w-4 h-4 text-orange-600 group-hover:text-orange-700" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nice-to-Have Skills Section */}
      {niceToHaveTotal > 0 && (
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection('niceToHave')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${niceToHaveMissing.length > 0 ? 'bg-blue-100' : 'bg-green-100'}`}>
                {niceToHaveMissing.length > 0 ? (
                  <Info className="w-5 h-5 text-blue-600" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  {t('jobTailoring.keywordIntelligence.niceToHaveSkills', 'Nice-to-Have Skills')}
                </h4>
                <p className="text-sm text-gray-500">
                  {niceToHaveMatched.length}/{niceToHaveTotal} {t('jobTailoring.keywordIntelligence.matched', 'matched')}
                </p>
              </div>
            </div>
            {expandedSections.niceToHave ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {expandedSections.niceToHave && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {/* Matched Nice-to-Have */}
                {niceToHaveMatched.map((item, idx) => (
                  <div
                    key={`matched-${idx}`}
                    className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium border border-green-200"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{item.keyword}</span>
                  </div>
                ))}
                {/* Missing Nice-to-Have */}
                {niceToHaveMissing.map((item, idx) => (
                  <div
                    key={`missing-${idx}`}
                    className="flex items-center gap-1"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium border border-blue-200">
                      <Info className="w-4 h-4" />
                      <span>{item.keyword}</span>
                    </div>
                    {onIncorporateKeyword && (
                      <button
                        onClick={() => setSelectedKeyword({ keyword: item.keyword, importance: 'nice_to_have' })}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                        title={t('jobTailoring.keywordIntelligence.addKeywordTitle', 'I have this skill - add to resume')}
                      >
                        <Plus className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Keywords Added Section */}
      {keywordsAdded.length > 0 && (
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection('added')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  {t('jobTailoring.keywordIntelligence.keywordsAdded', 'Keywords Added in This Tailoring')}
                </h4>
                <p className="text-sm text-gray-500">
                  {keywordsAdded.length} {t('jobTailoring.keywordIntelligence.keywordsOptimized', 'keywords optimized')}
                </p>
              </div>
            </div>
            {expandedSections.added ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {expandedSections.added && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {keywordsAdded.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-xl text-sm font-medium flex items-center gap-2 border border-orange-200"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {t('jobTailoring.keywordIntelligence.addedHint', 'These keywords were strategically added to improve your ATS score')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Differentiators Section */}
      {differentiators.length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('differentiators')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">
                  {t('jobTailoring.keywordIntelligence.differentiators', 'Your Differentiators')}
                </h4>
                <p className="text-sm text-gray-500">
                  {t('jobTailoring.keywordIntelligence.standOut', 'Skills that make you stand out')}
                </p>
              </div>
            </div>
            {expandedSections.differentiators ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {expandedSections.differentiators && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {differentiators.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm font-medium flex items-center gap-2 border border-purple-200"
                    title={item.locations?.join(', ')}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.keyword}
                    {item.frequency && item.frequency > 1 && (
                      <span className="text-purple-500 text-xs">({item.frequency}x)</span>
                    )}
                  </span>
                ))}
              </div>
              <p className="text-xs text-purple-600 mt-3 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t('jobTailoring.keywordIntelligence.differentiatorsHint', 'These unique skills set you apart from other candidates')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Add Keyword Modal */}
      {selectedKeyword && (
        <AddKeywordModal
          isOpen={!!selectedKeyword}
          onClose={() => setSelectedKeyword(null)}
          keyword={selectedKeyword.keyword}
          importance={selectedKeyword.importance}
          onSubmit={handleIncorporateKeyword}
          isLoading={isIncorporatingKeyword}
        />
      )}
    </div>
  );
}

export default KeywordIntelligence;
