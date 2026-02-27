import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Target,
  ClipboardList,
  BarChart3,
  GitCompare,
  Save,
  CheckCircle,
  Globe,
  RotateCcw,
  PlayCircle,
  X,
  AlertTriangle
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { useAuthStore } from '@/stores/authStore';
import { JobInput } from '@/components/job-tailoring/JobInput';
import { TailoringSummary } from '@/components/job-tailoring/TailoringSummary';
import { ReviewChanges } from '@/components/job-tailoring/ReviewChanges';
import { SaveTailored } from '@/components/job-tailoring/SaveTailored';
import { TailoringWizardStep } from '@/types/jobTailoring';
import { trackJobTailoringStarted } from '@/services/marketingAnalytics';

// New 4-step flow: Job Input -> Tailoring Summary -> Review Changes -> Save
const STEP_KEYS = ['jobDetails', 'summary', 'review', 'save'] as const;

const STEPS = [
  { id: 1, key: 'jobDetails', icon: ClipboardList },
  { id: 2, key: 'summary', icon: BarChart3 },     // NEW: Tailoring Summary (replaces analysis + questions)
  { id: 3, key: 'review', icon: GitCompare },
  { id: 4, key: 'save', icon: Save },
];

export function JobTailoringPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { resumeId } = useParams<{ resumeId?: string }>();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuthStore();
  const {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    reset,
    jobDescription,
    hasPersistedSession,
    sourceResume,
  } = useJobTailoringStore();

  // Dialog states
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const hasTrackedRef = useRef(false);

  // Track job tailoring started (only once per session)
  useEffect(() => {
    if (!hasTrackedRef.current) {
      trackJobTailoringStarted(resumeId);
      hasTrackedRef.current = true;
    }
  }, [resumeId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Check for existing persisted session on mount
  useEffect(() => {
    if (!hasCheckedSession && isAuthenticated) {
      // Small delay to ensure store is hydrated
      const timer = setTimeout(() => {
        const hasValidSession = hasPersistedSession();
        
        // If resumeId is provided, user explicitly wants to start a new tailoring for that resume
        if (resumeId) {
          // Reset if there's existing state for a different resume
          if (sourceResume && sourceResume.id !== resumeId) {
            reset();
          }
          setHasCheckedSession(true);
          return;
        }
        
        // If we have state (currentStep > 1) but session is invalid (expired or no data),
        // reset to clean state
        if (currentStep > 1 && !hasValidSession) {
          console.log('Expired or invalid session detected, resetting...');
          reset();
          setHasCheckedSession(true);
          return;
        }
        
        // Show recovery dialog if there's a valid persisted session
        if (hasValidSession && currentStep > 1) {
          setShowRecoveryDialog(true);
        }
        setHasCheckedSession(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hasCheckedSession, isAuthenticated, hasPersistedSession, currentStep, resumeId, sourceResume, reset]);

  // Browser close/refresh warning
  useEffect(() => {
    const hasUnsavedProgress = currentStep > 1 || jobDescription.trim().length > 50;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedProgress) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome
      }
    };

    if (hasUnsavedProgress) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep, jobDescription]);

  // Language toggle
  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language?.startsWith('es') ? 'es' : 'en';

  // Handle back to dashboard - with confirmation if there's progress
  const handleBack = () => {
    const hasUnsavedProgress = currentStep > 1;
    if (hasUnsavedProgress) {
      setShowLeaveConfirmation(true);
    } else {
      reset();
      navigate('/dashboard');
    }
  };

  // Confirm leave - reset and navigate
  const handleConfirmLeave = () => {
    setShowLeaveConfirmation(false);
    reset();
    navigate('/dashboard');
  };

  // Cancel leave - close dialog
  const handleCancelLeave = () => {
    setShowLeaveConfirmation(false);
  };

  // Session recovery handlers
  const handleContinueSession = () => {
    setShowRecoveryDialog(false);
    // State is already restored, user continues where they left off
  };

  const handleStartFresh = () => {
    reset();
    setShowRecoveryDialog(false);
  };

  // Handle step navigation
  const handleNextStep = () => {
    nextStep();
  };

  const handlePrevStep = () => {
    prevStep();
  };

  const handleStepClick = (stepId: number) => {
    // Only allow clicking on completed steps or the current step
    if (stepId <= currentStep) {
      setCurrentStep(stepId as TailoringWizardStep);
    }
  };

  // Render current step content - Now 4 steps instead of 5
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <JobInput
            preselectedResumeId={resumeId}
            onNext={handleNextStep}
            onBack={handleBack}
          />
        );
      case 2:
        // NEW: Tailoring Summary (replaces JobAnalysis + ClarificationQuestions)
        return (
          <TailoringSummary
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <ReviewChanges
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <SaveTailored
            onBack={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Job Tailoring - GetQuickResume</title>
        <meta name="description" content="Tailor your resume to job descriptions" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{t('jobTailoring.page.back')}</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {t('jobTailoring.page.title')}
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    {t('jobTailoring.page.subtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentLanguage === 'es' 
                  ? 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
              title={currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentLanguage === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const isClickable = step.id <= currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <button
                    onClick={() => handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center gap-1 group ${
                      isClickable ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-400'
                      } ${isClickable && !isCurrent ? 'group-hover:bg-orange-100' : ''}`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isCurrent ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {t(`jobTailoring.steps.${step.key}`)}
                    </span>
                  </button>

                  {/* Connector Line */}
                  {index < STEPS.length - 1 && (
                    <div className="flex-1 mx-2">
                      <div
                        className={`h-0.5 transition-all ${
                          currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepContent()}
      </main>

      {/* Session Recovery Dialog */}
      {showRecoveryDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {t('jobTailoring.recovery.title', { defaultValue: 'Continue Your Progress?' })}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {t('jobTailoring.recovery.message', { 
                  defaultValue: 'You have an unfinished job tailoring session. Would you like to continue where you left off?' 
                })}
              </p>

              {/* Show what was saved */}
              {sourceResume && (
                <div className="bg-orange-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-orange-800 font-medium mb-1">
                    {t('jobTailoring.recovery.resumeLabel', { defaultValue: 'Resume:' })}
                  </p>
                  <p className="text-sm text-orange-700">
                    {sourceResume.title || t('jobTailoring.jobInput.untitledResume', { defaultValue: 'Untitled Resume' })}
                  </p>
                  <p className="text-xs text-orange-600 mt-2">
                    {t('jobTailoring.recovery.stepInfo', { 
                      step: currentStep,
                      defaultValue: `Progress: Step ${currentStep} of 4`
                    })}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleStartFresh}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  {t('jobTailoring.recovery.startFresh', { defaultValue: 'Start Fresh' })}
                </button>
                <button
                  onClick={handleContinueSession}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
                >
                  <PlayCircle className="w-4 h-4" />
                  {t('jobTailoring.recovery.continue', { defaultValue: 'Continue' })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave Confirmation Dialog */}
      {showLeaveConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('jobTailoring.leave.title', { defaultValue: 'Leave Job Tailoring?' })}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                {t('jobTailoring.leave.message', { 
                  defaultValue: 'You have unsaved progress. Are you sure you want to leave? Your progress will be saved and you can return later.' 
                })}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelLeave}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
                >
                  {t('jobTailoring.leave.stay', { defaultValue: 'Stay' })}
                </button>
                <button
                  onClick={handleConfirmLeave}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {t('jobTailoring.leave.leave', { defaultValue: 'Leave' })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default JobTailoringPage;

