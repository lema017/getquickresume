import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Link2, 
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Resume } from '@/types';
import { UrlValidator } from './UrlValidator';
import { JobPreviewCard } from './JobPreviewCard';
import { looksLikeUrl } from '@/utils/urlValidation';

interface JobInputProps {
  preselectedResumeId?: string;
  onNext: () => void;
  onBack: () => void;
}

export function JobInput({ preselectedResumeId, onNext, onBack }: JobInputProps) {
  const { t } = useTranslation();
  const { resumes, isLoading: isLoadingResumes, loadDashboard } = useDashboardStore();
  const {
    sourceResume,
    inputMode,
    jobUrl,
    jobDescription,
    urlValidation,
    isValidatingUrl,
    setSelectedResume,
    setInputMode,
    setJobUrl,
    setJobDescription,
    validateUrl,
    analyzeJob,
  } = useJobTailoringStore();

  const [showResumeSelector, setShowResumeSelector] = useState(!preselectedResumeId);
  const [localError, setLocalError] = useState<string | null>(null);

  // Load resumes if not already loaded
  useEffect(() => {
    if (resumes.length === 0 && !isLoadingResumes) {
      loadDashboard();
    }
  }, [resumes.length, isLoadingResumes, loadDashboard]);

  // Pre-select resume if ID is provided
  useEffect(() => {
    if (preselectedResumeId && resumes.length > 0 && !sourceResume) {
      const resume = resumes.find(r => r.id === preselectedResumeId);
      if (resume) {
        setSelectedResume(resume);
        setShowResumeSelector(false);
      }
    }
  }, [preselectedResumeId, resumes, sourceResume, setSelectedResume]);

  // Filter to only show generated resumes
  const generatedResumes = resumes.filter(r => r.generatedResume);

  const handleResumeSelect = (resume: Resume) => {
    setSelectedResume(resume);
    setShowResumeSelector(false);
    setLocalError(null);
  };

  const handleInputModeChange = (mode: 'url' | 'text') => {
    setInputMode(mode);
    setLocalError(null);
  };

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    setLocalError(null);
    
    // Auto-detect if user pasted a URL in the text field
    if (looksLikeUrl(value) && inputMode === 'text') {
      setJobUrl(value);
      setInputMode('url');
    }
  };

  const handleUrlValidate = async () => {
    await validateUrl(jobUrl);
  };

  const handleConfirmUrlContent = () => {
    // URL content confirmed, job description already set in store
    handleProceed();
  };

  const handleProceed = async () => {
    // Validate required fields
    if (!sourceResume) {
      setLocalError(t('jobTailoring.jobInput.errors.selectResume'));
      return;
    }

    if (!jobDescription.trim()) {
      setLocalError(t('jobTailoring.jobInput.errors.provideDescription'));
      return;
    }

    // Start analysis and proceed to next step
    await analyzeJob();
    onNext();
  };

  const handleSwitchToManual = () => {
    setInputMode('text');
    setJobUrl('');
  };

  const canProceed = sourceResume && jobDescription.trim().length > 50;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4">
          <ClipboardList className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('jobTailoring.jobInput.title')}
        </h2>
        <p className="text-gray-600">
          {t('jobTailoring.jobInput.subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        {/* Resume Selection */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" />
            {t('jobTailoring.jobInput.selectResume')}
          </h3>

          {sourceResume && !showResumeSelector ? (
            <div className="flex items-center justify-between bg-orange-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{sourceResume.title || t('jobTailoring.jobInput.untitledResume')}</p>
                  <p className="text-sm text-gray-500">
                    {sourceResume.resumeData.profession || t('jobTailoring.jobInput.untitledResume')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowResumeSelector(true)}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                {t('jobTailoring.jobInput.change')}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {isLoadingResumes ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="text-gray-500 mt-2">{t('jobTailoring.jobInput.loadingResumes')}</p>
                </div>
              ) : generatedResumes.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">{t('jobTailoring.jobInput.noResumes')}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {t('jobTailoring.jobInput.noResumesHint')}
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {generatedResumes.map((resume) => (
                    <button
                      key={resume.id}
                      onClick={() => handleResumeSelect(resume)}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all text-left group"
                    >
                      <div className="w-10 h-10 bg-gray-100 group-hover:bg-orange-100 rounded-xl flex items-center justify-center transition-colors">
                        <FileText className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {resume.title || t('jobTailoring.jobInput.untitledResume')}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {resume.resumeData.profession || t('jobTailoring.jobInput.untitledResume')} • 
                          {t('jobTailoring.jobInput.updated', { date: new Date(resume.updatedAt).toLocaleDateString() })}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Job Posting Input */}
        {sourceResume && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              {t('jobTailoring.jobInput.jobPostingDetails')}
            </h3>

            {/* Input Mode Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => handleInputModeChange('text')}
                className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  inputMode === 'text'
                    ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                {t('jobTailoring.jobInput.pasteDescription')}
              </button>
              <button
                onClick={() => handleInputModeChange('url')}
                className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  inputMode === 'url'
                    ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                <Link2 className="w-4 h-4" />
                {t('jobTailoring.jobInput.enterUrl')}
              </button>
            </div>

            {/* URL Input Mode */}
            {inputMode === 'url' && (
              <div className="space-y-4">
                {urlValidation?.hasJobContent ? (
                  <JobPreviewCard
                    validationResult={urlValidation}
                    jobUrl={jobUrl}
                    onConfirm={handleConfirmUrlContent}
                    onEdit={() => setInputMode('text')}
                    onReject={handleSwitchToManual}
                  />
                ) : (
                  <UrlValidator
                    url={jobUrl}
                    onUrlChange={setJobUrl}
                    onValidate={handleUrlValidate}
                    validationResult={urlValidation}
                    isValidating={isValidatingUrl}
                    onSwitchToManual={handleSwitchToManual}
                  />
                )}
              </div>
            )}

            {/* Text Input Mode */}
            {inputMode === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('jobTailoring.jobInput.jobDescriptionLabel')}
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => handleJobDescriptionChange(e.target.value)}
                    placeholder={t('jobTailoring.jobInput.jobDescriptionPlaceholder')}
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">
                      {t('jobTailoring.jobInput.characters', { count: jobDescription.length })}
                    </p>
                    {jobDescription.length > 0 && jobDescription.length < 50 && (
                      <p className="text-sm text-amber-600">
                        {t('jobTailoring.jobInput.minCharacters')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">
                    {t('jobTailoring.jobInput.tipsTitle')}
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• {t('jobTailoring.jobInput.tips.complete')}</li>
                    <li>• {t('jobTailoring.jobInput.tips.skills')}</li>
                    <li>• {t('jobTailoring.jobInput.tips.keywords')}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {localError && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{localError}</span>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.back')}
          </button>

          {inputMode === 'text' && (
            <button
              onClick={handleProceed}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {t('jobTailoring.jobInput.analyzeJob')}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobInput;

