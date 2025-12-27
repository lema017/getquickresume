import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { CheckCircle, AlertCircle, Info, Crown, Zap, Circle, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';

export function HUD() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, wizardState, calculateCharacters, setCurrentStep } = useResumeStore();
  const { user } = useAuthStore();
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);

  // Memoize character calculation to prevent unnecessary recalculations
  const charactersUsed = useMemo(() => calculateCharacters(), [
    resumeData.summary,
    resumeData.jobDescription,
    resumeData.skillsRaw,
    resumeData.experience,
    resumeData.education,
    resumeData.certifications,
    resumeData.projects,
    resumeData.languages,
    calculateCharacters
  ]);
  const maxCharacters = 3500;
  const progressPercentage = (charactersUsed / maxCharacters) * 100;
  const isNearLimit = progressPercentage > 80;
  const isOverLimit = charactersUsed > maxCharacters;

  const getProgressColor = () => {
    if (isOverLimit) return 'bg-red-500';
    if (isNearLimit) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getProgressIcon = () => {
    if (isOverLimit) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (isNearLimit) return <AlertCircle className="w-4 h-4 text-amber-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  // Step navigation functions
  const steps = [
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
    { number: 11, key: 'download', title: t('hud.stepTitles.download') },
  ];

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
    // Step 1 is always accessible
    if (stepNumber === 1) {
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
          {steps.map((step, index) => {
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
                {index < steps.length - 1 && (
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

      {/* Character Counter - Compact */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getProgressIcon()}
          <span className="text-sm font-medium text-gray-700">
            {t('hud.charactersLabel')} {charactersUsed.toLocaleString()}/{user?.isPremium ? '∞' : maxCharacters.toLocaleString()}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            isOverLimit ? 'bg-red-100 text-red-800' : 
            isNearLimit ? 'bg-amber-100 text-amber-800' : 
            'bg-green-100 text-green-800'
          }`}>
            {user?.isPremium ? '100%' : `${Math.round(progressPercentage)}%`}
          </span>
        </div>
        
        <button
          onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          {isBreakdownExpanded ? (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>{t('hud.hideBreakdown')}</span>
            </>
          ) : (
            <>
              <ChevronRight className="w-3 h-3" />
              <span>{t('hud.showBreakdown')}</span>
            </>
          )}
        </button>
      </div>

      {/* Character Breakdown - Collapsible */}
      {isBreakdownExpanded && (
        <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('hud.breakdown.summary')}</span>
              <span className="font-medium">{resumeData.summary.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('hud.breakdown.experience')}</span>
              <span className="font-medium">
                {resumeData.experience.reduce((acc, exp) => 
                  acc + exp.title.length + exp.company.length + 
                  exp.achievements.join(' ').length + exp.responsibilities.join(' ').length, 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('hud.breakdown.education')}</span>
              <span className="font-medium">
                {resumeData.education.reduce((acc, edu) => 
                  acc + edu.institution.length + edu.degree.length + edu.field.length, 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('hud.breakdown.projects')}</span>
              <span className="font-medium">
                {resumeData.projects.reduce((acc, proj) => 
                  acc + proj.name.length + proj.description.length + proj.technologies.join(' ').length, 0
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('hud.breakdown.skills')}</span>
              <span className="font-medium">
                {resumeData.skillsRaw.join(' ').length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Status Message - Compact */}
      {!user?.isPremium && (isOverLimit || isNearLimit) && (
        <div className={`text-xs p-2 rounded mb-3 ${
          isOverLimit ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800'
        }`}>
          {isOverLimit ? (
            t('hud.limitExceeded', { count: (charactersUsed - maxCharacters).toLocaleString() })
          ) : (
            t('hud.charactersRemaining', { count: (maxCharacters - charactersUsed).toLocaleString() })
          )}
        </div>
      )}

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
