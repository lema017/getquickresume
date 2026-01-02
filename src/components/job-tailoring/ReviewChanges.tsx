import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  GitCompare,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  CheckCircle,
  Plus,
  Edit3,
  Eye,
  EyeOff,
  Sparkles,
  FileText,
  Loader2,
  Target,
  Zap,
  AlertCircle
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { ResumeChange } from '@/types/jobTailoring';

interface ReviewChangesProps {
  onNext: () => void;
  onBack: () => void;
}

export function ReviewChanges({ onNext, onBack }: ReviewChangesProps) {
  const { t } = useTranslation();
  const {
    sourceResume,
    tailoredResume,
    tailoringResult,
    isGeneratingTailored,
    jobAnalysis,
  } = useJobTailoringStore();

  const [showDiff, setShowDiff] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary', 'skills']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  if (isGeneratingTailored) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('jobTailoring.review.tailoring')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('jobTailoring.review.tailoringDesc')}
          </p>
          <div className="max-w-md mx-auto space-y-3">
            <div className="flex items-center gap-3 text-left">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">{t('jobTailoring.review.progress.analyzing')}</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
              <span className="text-gray-700">{t('jobTailoring.review.progress.optimizing')}</span>
            </div>
            <div className="flex items-center gap-3 text-left text-gray-400">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              <span>{t('jobTailoring.review.progress.keywords')}</span>
            </div>
            <div className="flex items-center gap-3 text-left text-gray-400">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              <span>{t('jobTailoring.review.progress.grammar')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tailoringResult || !tailoredResume) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{t('jobTailoring.review.noResults')}</p>
          <button
            onClick={onBack}
            className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
          >
            {t('jobTailoring.analysis.goBack')}
          </button>
        </div>
      </div>
    );
  }

  const { changes, atsScoreBefore, atsScoreAfter, grammarCorrections, keywordOptimizations } = tailoringResult;
  const scoreImprovement = atsScoreAfter - atsScoreBefore;

  const getChangeIcon = (changeType: ResumeChange['changeType']) => {
    switch (changeType) {
      case 'added':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'modified':
        return <Edit3 className="w-4 h-4 text-blue-600" />;
      case 'enhanced':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      default:
        return <Edit3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getChangeColor = (changeType: ResumeChange['changeType']) => {
    switch (changeType) {
      case 'added':
        return 'border-green-200 bg-green-50';
      case 'modified':
        return 'border-blue-200 bg-blue-50';
      case 'enhanced':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4">
          <GitCompare className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('jobTailoring.review.title')}
        </h2>
        <p className="text-gray-600">
          {t('jobTailoring.review.subtitle')}
        </p>
      </div>

      {/* Score Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Before Score */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-500 mb-2">{t('jobTailoring.review.before')}</p>
          <div className="text-4xl font-bold text-gray-400">{atsScoreBefore}</div>
          <p className="text-sm text-gray-500 mt-1">{t('jobTailoring.review.atsScore')}</p>
        </div>

        {/* Arrow/Improvement */}
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-2xl font-bold text-green-600">+{scoreImprovement}</p>
            <p className="text-sm text-gray-500">{t('jobTailoring.review.pointsImproved')}</p>
          </div>
        </div>

        {/* After Score */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-center text-white">
          <p className="text-sm text-green-100 mb-2">{t('jobTailoring.review.after')}</p>
          <div className="text-4xl font-bold">{atsScoreAfter}</div>
          <p className="text-sm text-green-100 mt-1">{t('jobTailoring.review.atsScore')}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{changes.length}</div>
          <p className="text-sm text-gray-600">{t('jobTailoring.review.changesMade')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{keywordOptimizations.length}</div>
          <p className="text-sm text-gray-600">{t('jobTailoring.review.keywordsAdded')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{grammarCorrections.length}</div>
          <p className="text-sm text-gray-600">{t('jobTailoring.review.grammarFixes')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{jobAnalysis?.matchScore || 0}%</div>
          <p className="text-sm text-gray-600">{t('jobTailoring.review.matchScore')}</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{t('jobTailoring.review.detailedChanges')}</h3>
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {showDiff ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showDiff ? t('jobTailoring.review.hideDiff') : t('jobTailoring.review.showDiff')}
        </button>
      </div>

      {/* Changes List */}
      <div className="space-y-4">
        {changes.map((change, index) => (
          <div
            key={index}
            className={`rounded-2xl border overflow-hidden ${getChangeColor(change.changeType)}`}
          >
            <button
              onClick={() => toggleSection(`change-${index}`)}
              className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-white/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                change.changeType === 'added' ? 'bg-green-100' :
                change.changeType === 'modified' ? 'bg-blue-100' :
                'bg-purple-100'
              }`}>
                {getChangeIcon(change.changeType)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 capitalize">{change.section}</span>
                  {change.sectionIndex !== undefined && (
                    <span className="text-gray-500">#{change.sectionIndex + 1}</span>
                  )}
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    change.changeType === 'added' ? 'bg-green-200 text-green-800' :
                    change.changeType === 'modified' ? 'bg-blue-200 text-blue-800' :
                    'bg-purple-200 text-purple-800'
                  }`}>
                    {change.changeType}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{change.reason}</p>
              </div>
              <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedSections.has(`change-${index}`) ? 'rotate-90' : ''
              }`} />
            </button>

            {expandedSections.has(`change-${index}`) && showDiff && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-200/50 space-y-4">
                {/* Original */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">{t('jobTailoring.review.original')}</p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-gray-700 text-sm line-through opacity-75">{change.originalValue}</p>
                  </div>
                </div>

                {/* New */}
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">{t('jobTailoring.review.tailored')}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-900 text-sm">{change.newValue}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Keyword Optimizations */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          {t('jobTailoring.review.keywordsOptimized')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {keywordOptimizations.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Grammar Corrections */}
      {grammarCorrections.length > 0 && (
        <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-500" />
            {t('jobTailoring.review.grammarImprovements')}
          </h3>
          <div className="space-y-3">
            {grammarCorrections.map((correction, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">
                    <span className="line-through text-gray-400">{correction.original}</span>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="text-green-700 font-medium">{correction.corrected}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{correction.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.back')}
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all"
        >
          {t('jobTailoring.review.saveTailoredResume')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ReviewChanges;

