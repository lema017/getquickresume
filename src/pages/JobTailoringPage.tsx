import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Target,
  ClipboardList,
  Search,
  HelpCircle,
  GitCompare,
  Save,
  CheckCircle,
  Globe
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { useAuthStore } from '@/stores/authStore';
import { JobInput } from '@/components/job-tailoring/JobInput';
import { JobAnalysis } from '@/components/job-tailoring/JobAnalysis';
import { ClarificationQuestions } from '@/components/job-tailoring/ClarificationQuestions';
import { ReviewChanges } from '@/components/job-tailoring/ReviewChanges';
import { SaveTailored } from '@/components/job-tailoring/SaveTailored';

const STEP_KEYS = ['jobDetails', 'analysis', 'questions', 'review', 'save'] as const;

const STEPS = [
  { id: 1, key: 'jobDetails', icon: ClipboardList },
  { id: 2, key: 'analysis', icon: Search },
  { id: 3, key: 'questions', icon: HelpCircle },
  { id: 4, key: 'review', icon: GitCompare },
  { id: 5, key: 'save', icon: Save },
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
  } = useJobTailoringStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Language toggle
  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language?.startsWith('es') ? 'es' : 'en';

  // Handle back to dashboard
  const handleBack = () => {
    reset();
    navigate('/dashboard');
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
      setCurrentStep(stepId as 1 | 2 | 3 | 4 | 5);
    }
  };

  // Render current step content
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
        return (
          <JobAnalysis
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <ClarificationQuestions
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <ReviewChanges
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 5:
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
    </div>
  );
}

export default JobTailoringPage;

