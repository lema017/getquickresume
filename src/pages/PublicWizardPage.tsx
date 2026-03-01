import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { usePublicResumeStore } from '@/stores/publicResumeStore';
import { WizardContextProvider } from '@/contexts/WizardContext';
import { usePublicWizardNavigation } from '@/hooks/usePublicWizardNavigation';
import { AIFeatureLoginModal } from '@/components/public-wizard/AIFeatureLoginModal';

import { Step1Profile } from '@/components/wizard/Step1Profile';
import { Step2Skills } from '@/components/wizard/Step2Skills';
import { Step3Experience } from '@/components/wizard/Step3Experience';
import { Step4Education } from '@/components/wizard/Step4Education';
import { Step5Projects } from '@/components/wizard/Step5Projects';
import { Step6Achievements } from '@/components/wizard/Step6Achievements';
import { Step7Summary } from '@/components/wizard/Step6Summary';
import { PublicPreviewPage } from '@/components/public-wizard/PublicPreviewPage';

const TOTAL_STEPS = 7;

function PublicStepWrapper({ stepComponent: StepComponent }: { stepComponent: React.ComponentType }) {
  const { t } = useTranslation();
  const location = useLocation();
  const { wizardState, setCurrentStep } = usePublicResumeStore();

  useEffect(() => {
    const stepMatch = location.pathname.match(/\/step-(\d+)/);
    if (stepMatch) {
      const stepFromUrl = parseInt(stepMatch[1], 10);
      if (stepFromUrl !== wizardState.currentStep) {
        setCurrentStep(stepFromUrl);
      }
    }
  }, [location.pathname, wizardState.currentStep, setCurrentStep]);

  const currentStep = wizardState.currentStep || 1;

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('wizard.title')}
          </h1>
          <p className="text-gray-600">
            {t('wizard.subtitle')}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {t('publicWizard.progress', { current: currentStep, total: TOTAL_STEPS })}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <StepComponent />
        </div>
      </div>
    </div>
  );
}

export function PublicWizardPage() {
  const { navigateToStep } = usePublicWizardNavigation();
  const navigate = useNavigate();
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalFeature, setAiModalFeature] = useState('');

  const onAIFeatureClick = (featureName?: string) => {
    setAiModalFeature(featureName || '');
    setAiModalOpen(true);
  };

  const contextValue = {
    isPublicMode: true,
    navigateToStep: (step: number) => {
      if (step > TOTAL_STEPS) {
        navigate('/create/preview');
      } else {
        navigateToStep(step);
      }
    },
    onAIFeatureClick,
  };

  return (
    <>
      <Helmet>
        <title>Create Resume - GetQuickResume</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <WizardContextProvider value={contextValue}>
        <Routes>
          <Route path="step-1" element={<PublicStepWrapper stepComponent={Step1Profile} />} />
          <Route path="step-2" element={<PublicStepWrapper stepComponent={Step2Skills} />} />
          <Route path="step-3" element={<PublicStepWrapper stepComponent={Step3Experience} />} />
          <Route path="step-4" element={<PublicStepWrapper stepComponent={Step4Education} />} />
          <Route path="step-5" element={<PublicStepWrapper stepComponent={Step5Projects} />} />
          <Route path="step-6" element={<PublicStepWrapper stepComponent={Step6Achievements} />} />
          <Route path="step-7" element={<PublicStepWrapper stepComponent={Step7Summary} />} />
          <Route path="preview" element={<PublicPreviewPage />} />
          <Route path="*" element={<Navigate to="/create/step-1" replace />} />
        </Routes>
      </WizardContextProvider>

      <AIFeatureLoginModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        featureName={aiModalFeature}
      />
    </>
  );
}
