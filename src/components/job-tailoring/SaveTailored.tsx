import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { 
  Save,
  ArrowLeft,
  Download,
  Eye,
  Home,
  CheckCircle,
  FileText,
  Briefcase,
  Building2,
  TrendingUp,
  Loader2,
  PartyPopper,
  Share2
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { RateLimitModal } from '@/components/RateLimitModal';

interface SaveTailoredProps {
  onBack: () => void;
}

export function SaveTailored({ onBack }: SaveTailoredProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    tailoredResumeTitle,
    setTailoredResumeTitle,
    saveTailoredResume,
    isSaving,
    savedResumeId,
    tailoringResult,
    jobAnalysis,
    editedJobInfo,
    reset,
  } = useJobTailoringStore();

  const [hasSaved, setHasSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  const jobInfo = editedJobInfo || jobAnalysis?.jobInfo;

  const handleSave = async () => {
    setSaveError(null);
    setIsRateLimited(false);
    setRateLimitError(null);
    
    try {
      const resumeId = await saveTailoredResume();
      
      if (resumeId) {
        // Show success toast
        toast.success(
          t('jobTailoring.save.saveSuccess', {
            defaultValue: 'Resume saved successfully! Redirecting to dashboard...',
          }),
          { duration: 3000 }
        );
        
        // Reset state and navigate to dashboard after a short delay
        setTimeout(() => {
          reset();
          navigate('/dashboard');
        }, 1500);
        
        setHasSaved(true);
      } else {
        // Save returned null - show error
        const errorMsg = t('jobTailoring.save.saveError', {
          defaultValue: 'Failed to save resume. Please try again.',
        });
        setSaveError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error: any) {
      console.error('Error saving tailored resume:', error);
      
      // Check for rate limit error
      if (error?.code === 'RATE_LIMIT' || error?.statusCode === 429) {
        setIsRateLimited(true);
        setRateLimitError(error.message);
      } else {
        const errorMsg = error.message || t('jobTailoring.save.saveError', {
          defaultValue: 'Failed to save resume. Please try again.',
        });
        setSaveError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const handleViewResume = () => {
    if (savedResumeId) {
      reset();
      navigate(`/resume/${savedResumeId}`);
    }
  };

  const handleGoToDashboard = () => {
    reset();
    navigate('/dashboard');
  };

  const handleCreateAnother = () => {
    reset();
    navigate('/job-tailoring');
  };

  // Success State - Show brief message while redirecting
  if (hasSaved && savedResumeId) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-16">
          {/* Success Animation */}
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t('jobTailoring.save.successTitle')}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            {t('jobTailoring.save.successDesc', { jobTitle: jobInfo?.jobTitle, companyName: jobInfo?.companyName })}
          </p>
          
          <div className="flex items-center justify-center gap-2 text-orange-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t('jobTailoring.save.redirecting', { defaultValue: 'Redirecting to dashboard...' })}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4">
          <Save className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('jobTailoring.save.title')}
        </h2>
        <p className="text-gray-600">
          {t('jobTailoring.save.subtitle')}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        {/* Resume Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('jobTailoring.save.resumeTitle')}
          </label>
          <input
            type="text"
            value={tailoredResumeTitle}
            onChange={(e) => setTailoredResumeTitle(e.target.value)}
            placeholder={t('jobTailoring.save.resumeTitlePlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="text-sm text-gray-500 mt-2">
            {t('jobTailoring.save.resumeTitleHint')}
          </p>
        </div>

        {/* Job Info Summary */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">{t('jobTailoring.save.tailoredFor')}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{jobInfo?.jobTitle || t('jobTailoring.save.position')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>{jobInfo?.companyName || t('jobTailoring.jobPreview.company')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Improvements Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          {t('jobTailoring.save.improvementsMade')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              +{(tailoringResult?.atsScoreAfter || 85) - (tailoringResult?.atsScoreBefore || 60)}
            </div>
            <p className="text-sm text-gray-600">{t('jobTailoring.save.atsScoreBoost')}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {tailoringResult?.changes.length || 5}
            </div>
            <p className="text-sm text-gray-600">{t('jobTailoring.save.optimizations')}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {tailoringResult?.keywordOptimizations.length || 8}
            </div>
            <p className="text-sm text-gray-600">{t('jobTailoring.save.keywordsAddedLabel')}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {tailoringResult?.grammarCorrections.length || 2}
            </div>
            <p className="text-sm text-gray-600">{t('jobTailoring.save.grammarFixesLabel')}</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {saveError && !isRateLimited && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm">{saveError}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.back')}
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || !tailoredResumeTitle.trim() || isRateLimited}
          className={`flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all ${
            isSaving || !tailoredResumeTitle.trim() || isRateLimited
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg'
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('jobTailoring.save.saving')}
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {t('jobTailoring.save.saveResume')}
            </>
          )}
        </button>
      </div>

      {/* Rate Limit Modal */}
      <RateLimitModal
        isOpen={isRateLimited}
        message={rateLimitError || undefined}
        onRetry={handleSave}
        onClose={() => {
          setIsRateLimited(false);
          setRateLimitError(null);
        }}
        countdownSeconds={60}
      />
    </div>
  );
}

export default SaveTailored;

