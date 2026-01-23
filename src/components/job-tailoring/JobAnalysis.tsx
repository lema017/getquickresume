import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search,
  ArrowRight,
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  CheckCircle,
  XCircle,
  Target,
  Edit3,
  Save,
  X,
  Loader2,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { JobPostingInfo } from '@/types/jobTailoring';

interface JobAnalysisProps {
  onNext: () => void;
  onBack: () => void;
}

export function JobAnalysis({ onNext, onBack }: JobAnalysisProps) {
  const { t } = useTranslation();
  const {
    jobAnalysis,
    isAnalyzing,
    editedJobInfo,
    setEditedJobInfo,
    generateQuestions,
    isGeneratingQuestions,
  } = useJobTailoringStore();

  const [isEditing, setIsEditing] = useState(false);
  const [localJobInfo, setLocalJobInfo] = useState<JobPostingInfo | null>(null);

  useEffect(() => {
    if (editedJobInfo) {
      setLocalJobInfo(editedJobInfo);
    } else if (jobAnalysis?.jobInfo) {
      setLocalJobInfo(jobAnalysis.jobInfo);
    }
  }, [editedJobInfo, jobAnalysis]);

  const handleSaveEdit = () => {
    if (localJobInfo) {
      setEditedJobInfo(localJobInfo);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setLocalJobInfo(editedJobInfo || jobAnalysis?.jobInfo || null);
    setIsEditing(false);
  };

  const handleProceed = async () => {
    await generateQuestions();
    onNext();
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('jobTailoring.analysis.analyzing')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('jobTailoring.analysis.analyzingDesc')}
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

  if (!jobAnalysis || !localJobInfo) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <p className="text-gray-500">{t('jobTailoring.analysis.noData')}</p>
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

  const { matchScore, matchingSkills, missingSkills, keywordMatches, suggestions } = jobAnalysis;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4">
          <Search className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('jobTailoring.analysis.title')}
        </h2>
        <p className="text-gray-600">
          {t('jobTailoring.analysis.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Job Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Details Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('jobTailoring.analysis.jobDetails')}</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  {t('jobTailoring.analysis.edit')}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                    {t('jobTailoring.analysis.cancel')}
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    {t('jobTailoring.analysis.save')}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Job Title */}
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{t('jobTailoring.analysis.jobTitleLabel')}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={localJobInfo.jobTitle}
                      onChange={(e) => setLocalJobInfo({ ...localJobInfo, jobTitle: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{localJobInfo.jobTitle}</p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{t('jobTailoring.analysis.companyLabel')}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={localJobInfo.companyName}
                      onChange={(e) => setLocalJobInfo({ ...localJobInfo, companyName: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{localJobInfo.companyName}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{t('jobTailoring.analysis.locationLabel')}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={localJobInfo.location || ''}
                      onChange={(e) => setLocalJobInfo({ ...localJobInfo, location: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <p className="font-semibold text-gray-900">{localJobInfo.location || t('jobTailoring.analysis.notSpecified')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Keywords Detected */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              {t('jobTailoring.analysis.keywordsDetected')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywordMatches.map((km, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 ${
                    km.found
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {km.found ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {km.keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('jobTailoring.analysis.keyRequirements')}
            </h3>
            <ul className="space-y-2">
              {localJobInfo.requirements.slice(0, 6).map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Match Score & Skills */}
        <div className="space-y-6">
          {/* Match Score */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-center">
              <p className="text-orange-100 text-sm font-medium mb-2">{t('jobTailoring.analysis.currentMatchScore')}</p>
              <div className="text-5xl font-bold mb-2">{matchScore}%</div>
              <div className="flex items-center justify-center gap-2 text-orange-100">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{t('jobTailoring.analysis.canBeImproved')}</span>
              </div>
            </div>
          </div>

          {/* Matching Skills */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {t('jobTailoring.analysis.matchingSkills')} ({matchingSkills.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-amber-500" />
              {t('jobTailoring.analysis.skillsToHighlight')} ({missingSkills.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {t('jobTailoring.analysis.aiSuggestions')}
            </h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
          onClick={handleProceed}
          disabled={isGeneratingQuestions}
          className={`flex items-center gap-2 px-8 py-3 font-medium rounded-xl shadow-md transition-all ${
            isGeneratingQuestions
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 hover:shadow-lg'
          }`}
        >
          {isGeneratingQuestions 
            ? t('jobTailoring.questions.generating')
            : t('jobTailoring.analysis.continueToQuestions')
          }
          {isGeneratingQuestions 
            ? <Loader2 className="w-5 h-5 animate-spin" />
            : <ArrowRight className="w-5 h-5" />
          }
        </button>
      </div>
    </div>
  );
}

export default JobAnalysis;

