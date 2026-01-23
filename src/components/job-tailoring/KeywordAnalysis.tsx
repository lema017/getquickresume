import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { KeywordAnalysis as KeywordAnalysisType, KeywordItem, CategorizedKeywords } from '@/types/jobTailoring';

interface KeywordAnalysisProps {
  analysis: KeywordAnalysisType;
}

const CATEGORY_LABELS: Record<keyof CategorizedKeywords, string> = {
  technical: 'Technical Skills',
  softSkills: 'Soft Skills',
  industry: 'Industry Terms',
  certifications: 'Certifications',
  methodologies: 'Methodologies',
  tools: 'Tools & Platforms',
  experience: 'Experience Level'
};

const CATEGORY_COLORS: Record<keyof CategorizedKeywords, string> = {
  technical: 'bg-blue-100 text-blue-800 border-blue-200',
  softSkills: 'bg-purple-100 text-purple-800 border-purple-200',
  industry: 'bg-green-100 text-green-800 border-green-200',
  certifications: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  methodologies: 'bg-orange-100 text-orange-800 border-orange-200',
  tools: 'bg-pink-100 text-pink-800 border-pink-200',
  experience: 'bg-indigo-100 text-indigo-800 border-indigo-200'
};

export function KeywordAnalysis({ analysis }: KeywordAnalysisProps) {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState<string | null>('comparison');

  const { resumeKeywords, jobKeywords, matchAnalysis } = analysis;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Calculate critical/important/nice-to-have counts
  const criticalMatched = matchAnalysis.matchedList?.filter(m => m.jobImportance === 'critical').length || 0;
  const criticalTotal = (matchAnalysis.matchedList?.filter(m => m.jobImportance === 'critical').length || 0) + 
                        (matchAnalysis.missingCritical?.length || 0);
  const importantMatched = matchAnalysis.matchedList?.filter(m => m.jobImportance === 'important').length || 0;
  const importantTotal = (matchAnalysis.matchedList?.filter(m => m.jobImportance === 'important').length || 0) + 
                         (matchAnalysis.missingImportant?.length || 0);

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'important':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nice_to_have':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImportanceLabel = (importance: string) => {
    switch (importance) {
      case 'critical':
        return t('jobTailoring.keywordAnalysis.critical', 'Critical');
      case 'important':
        return t('jobTailoring.keywordAnalysis.important', 'Important');
      case 'nice_to_have':
        return t('jobTailoring.keywordAnalysis.niceToHave', 'Nice to Have');
      default:
        return importance;
    }
  };

  // Helper to render categorized keywords
  const renderCategoryKeywords = (keywords: CategorizedKeywords, isJobKeywords: boolean = false) => {
    const categories = Object.entries(keywords) as [keyof CategorizedKeywords, KeywordItem[]][];
    const nonEmptyCategories = categories.filter(([_, items]) => items && items.length > 0);

    if (nonEmptyCategories.length === 0) {
      return <p className="text-sm text-gray-500 italic">No keywords found</p>;
    }

    return (
      <div className="space-y-4">
        {nonEmptyCategories.map(([category, items]) => (
          <div key={category}>
            <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {CATEGORY_LABELS[category]} ({items.length})
            </h5>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className={`px-2 py-1 rounded-lg text-xs font-medium border ${CATEGORY_COLORS[category]} flex items-center gap-1`}
                  title={item.locations?.join(', ') || (item.importance ? `Importance: ${item.importance}` : '')}
                >
                  {item.keyword}
                  {item.frequency && item.frequency > 1 && (
                    <span className="opacity-70">({item.frequency}x)</span>
                  )}
                  {isJobKeywords && item.importance && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] ${getImportanceBadge(item.importance)}`}>
                      {item.importance === 'critical' ? '!' : item.importance === 'important' ? '*' : ''}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-4 space-y-6">
      {/* Match Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900">
            {t('jobTailoring.keywordAnalysis.matchOverview', 'Keyword Match Overview')}
          </h4>
          <span className="text-2xl font-bold text-blue-600">{matchAnalysis.matchPercentage || 0}%</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${matchAnalysis.matchPercentage || 0}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">
              {matchAnalysis.matchedKeywords || 0}/{matchAnalysis.totalJobKeywords || 0} {t('jobTailoring.keywordAnalysis.matched', 'matched')}
            </span>
          </div>
          {criticalTotal > 0 && (
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                Critical: {criticalMatched}/{criticalTotal}
              </span>
            </div>
          )}
          {importantTotal > 0 && (
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                Important: {importantMatched}/{importantTotal}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Missing Critical Keywords */}
      {matchAnalysis.missingCritical && matchAnalysis.missingCritical.length > 0 && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-900">
              {t('jobTailoring.keywordAnalysis.missingCritical', 'Missing Critical Keywords')}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchAnalysis.missingCritical.map((item, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-white border border-red-300 rounded-lg text-sm text-red-800 flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                {item.keyword}
              </span>
            ))}
          </div>
          <p className="text-xs text-red-700 mt-3">
            {t('jobTailoring.keywordAnalysis.missingCriticalHint', 'Consider adding these keywords if you have relevant experience.')}
          </p>
        </div>
      )}

      {/* Missing Important Keywords */}
      {matchAnalysis.missingImportant && matchAnalysis.missingImportant.length > 0 && (
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold text-orange-900">
              {t('jobTailoring.keywordAnalysis.missingImportant', 'Missing Important Keywords')}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchAnalysis.missingImportant.map((item, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-white border border-orange-300 rounded-lg text-sm text-orange-800 flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                {item.keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Matched Keywords */}
      {matchAnalysis.matchedList && matchAnalysis.matchedList.length > 0 && (
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-900">
              {t('jobTailoring.keywordAnalysis.matchedKeywords', 'Matched Keywords')}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchAnalysis.matchedList.map((match, index) => (
              <div 
                key={index}
                className="px-3 py-1.5 bg-white border border-green-300 rounded-lg text-sm text-green-800 flex items-center gap-2"
                title={`Found ${match.resumeFrequency}x in: ${match.resumeLocations?.join(', ')}`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{match.keyword}</span>
                {match.resumeFrequency > 1 && (
                  <span className="text-green-600 text-xs">({match.resumeFrequency}x)</span>
                )}
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${getImportanceBadge(match.jobImportance)}`}>
                  {getImportanceLabel(match.jobImportance)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extra Resume Keywords (Differentiators) */}
      {matchAnalysis.extraResumeKeywords && matchAnalysis.extraResumeKeywords.length > 0 && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-purple-900">
              {t('jobTailoring.keywordAnalysis.uniqueKeywords', 'Your Unique Keywords (Differentiators)')}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchAnalysis.extraResumeKeywords.map((item, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 bg-white border border-purple-300 rounded-lg text-sm text-purple-800 flex items-center gap-1"
                title={item.locations?.join(', ')}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {item.keyword}
                {item.frequency && item.frequency > 1 && (
                  <span className="text-purple-600 text-xs">({item.frequency}x)</span>
                )}
              </span>
            ))}
          </div>
          <p className="text-xs text-purple-700 mt-3">
            {t('jobTailoring.keywordAnalysis.uniqueKeywordsHint', 'These keywords set you apart from other candidates.')}
          </p>
        </div>
      )}

      {/* Side-by-Side Comparison (Collapsible) */}
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('comparison')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <h4 className="font-semibold text-gray-900">
            {t('jobTailoring.keywordAnalysis.fullComparison', 'Full Keyword Comparison')}
          </h4>
          {expandedSection === 'comparison' ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSection === 'comparison' && (
          <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-4">
            {/* Resume Keywords */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {t('jobTailoring.keywordAnalysis.yourResumeKeywords', 'Your Resume Keywords')}
              </h5>
              {renderCategoryKeywords(resumeKeywords, false)}
            </div>

            {/* Job Keywords */}
            <div>
              <h5 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                {t('jobTailoring.keywordAnalysis.jobRequirements', 'Job Requirements')}
              </h5>
              {renderCategoryKeywords(jobKeywords, true)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KeywordAnalysis;
