import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';

export function HUD() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { wizardState, setCurrentStep, generatedResume } = useResumeStore();
  const { user } = useAuthStore();

  // Step navigation functions
  const allSteps = [
    { number: 1, key: 'profile', title: t('wizard.steps.profile.title') },
    { number: 2, key: 'skills', title: t('wizard.steps.skills.title') },
    { number: 3, key: 'experience', title: t('wizard.steps.experience.title') },
    { number: 4, key: 'education', title: t('wizard.steps.education.title') },
    { number: 5, key: 'projects', title: t('wizard.steps.projects.title') },
    { number: 6, key: 'achievements', title: t('hud.stepTitles.achievements') },
    { number: 7, key: 'summary', title: t('hud.stepTitles.summary') },
    { number: 8, key: 'generate', title: t('hud.stepTitles.generate') },
    { number: 9, key: 'score', title: t('hud.stepTitles.score') },
    { number: 10, key: 'template', title: t('hud.stepTitles.template') },
    { number: 11, key: 'final', title: t('hud.stepTitles.final') },
  ];

  // Filter steps based on wizard phase
  // Steps 1-7: Pre-generation phase (data entry)
  // Steps 8-11: Post-generation phase (AI enhancement)
  const hasGeneratedResume = generatedResume !== null;
  const isPostGeneration = hasGeneratedResume || wizardState.currentStep >= 8;
  const visibleSteps = isPostGeneration 
    ? allSteps.filter(step => step.number >= 8) 
    : allSteps.filter(step => step.number <= 7);

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber !== wizardState.currentStep) {
      setCurrentStep(stepNumber);
      navigateToStep(stepNumber);
    }
  };

  const isStepCompleted = (stepNumber: number) => {
    return wizardState.completedSteps.includes(stepNumber);
  };

  const isStepAccessible = (stepNumber: number) => {
    // If we have a generatedResume or current step is 8+, lock steps 1-7
    // This enforces one-way flow: once AI generation happens, users can only edit forward
    const hasGeneratedResume = generatedResume !== null;
    if ((wizardState.currentStep >= 8 || hasGeneratedResume) && stepNumber < 8) {
      return false;
    }
    
    // Step 8 is always accessible if we have a generated resume
    if (stepNumber === 8 && hasGeneratedResume) {
      return true;
    }
    
    // Calculate the maximum completed step
    const completedSteps = wizardState.completedSteps || [];
    const maxCompletedStep = completedSteps.length > 0 ? Math.max(...completedSteps) : 0;
    
    // Allow navigation to any step <= maximum completed step
    // Also allow navigation to current step (for new resumes)
    return stepNumber <= Math.max(maxCompletedStep, wizardState.currentStep);
  };


  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      {/* Step Navigation */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          {visibleSteps.map((step, index) => {
            const isCompleted = isStepCompleted(step.number);
            const isCurrent = step.number === wizardState.currentStep;
            const isAccessible = isStepAccessible(step.number);
            
            return (
              <div key={step.number} className="flex flex-col items-center relative">
                <button
                  onClick={() => handleStepClick(step.number)}
                  disabled={!isAccessible}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 mb-1
                    ${isCurrent 
                      ? 'bg-primary text-white shadow-lg' 
                      : isCompleted 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : isAccessible
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                    ${isAccessible ? 'hover:scale-110' : ''}
                  `}
                  title={step.title}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </button>
                <span className="text-xs text-gray-600 text-center max-w-16 leading-tight hidden sm:block">
                  {step.title.split(' ')[0]}
                </span>
                {/* Connector line */}
                {index < visibleSteps.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-200 -z-10" 
                       style={{ 
                         left: '50%',
                         width: '100%'
                       }}>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Status Section */}
      {!user?.isPremium && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              Free Plan
            </span>
          </div>
          <Link
            to="/premium"
            className="text-xs bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-2 py-1 rounded hover:from-amber-600 hover:to-yellow-700 transition-all duration-200"
          >
            Upgrade
          </Link>
        </div>
      )}
    </div>
  );
}
