import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { resumeService } from '@/services/resumeService';
import toast from 'react-hot-toast';

// Wizard Components
import { ResumeCreationMode } from '@/components/wizard/ResumeCreationMode';
import { UploadResume } from '@/components/wizard/UploadResume';
import { LinkedInImport } from '@/components/wizard/LinkedInImport';

// Wizard Steps
import { Step1Profile } from '@/components/wizard/Step1Profile';
import { Step2Skills } from '@/components/wizard/Step2Skills';
import { Step3Experience } from '@/components/wizard/Step3Experience';
import { Step4Education } from '@/components/wizard/Step4Education';
import { Step5Projects } from '@/components/wizard/Step5Projects';
import { Step6Achievements } from '@/components/wizard/Step6Achievements';
import { Step7Summary } from '@/components/wizard/Step6Summary';
import { Step8Preview } from '@/components/wizard/Step8Preview';
import { Step9Score } from '@/components/wizard/Step9Score';
import { Step9Preview } from '@/components/wizard/Step9Preview';
import { Step10Final } from '@/components/wizard/Step10Final';

// Components
import { HUD } from '@/components/HUD';
import { ExitWizardModal } from '@/components/wizard/ExitWizardModal';

// Manual Wizard Step Wrapper
interface ManualWizardStepProps {
  stepComponent: React.ComponentType;
}

function ManualWizardStep({ stepComponent: StepComponent }: ManualWizardStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { loadResumeData, setCurrentResumeId, currentResumeId, resetResume, setGeneratedResume, setHasLoadedExistingResume, resumeData, wizardState } = useResumeStore();
  const { user } = useAuthStore();
  
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const lastLoadedResumeIdRef = useRef<string | null>(null);

  // Detect if this is Step 9 to apply wider container using route path
  const isStep10 = location.pathname.includes('/step-10');
  const containerClass = isStep10 
    ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'  // Wider for Step 9
    : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'; // Normal for others

  // Cargar resume si hay resumeId en la URL (solo una vez)
  useEffect(() => {
    const loadResumeFromUrl = async () => {
      const urlParams = new URLSearchParams(location.search);
      const resumeId = urlParams.get('resumeId');
      
      // If no resumeId, this is a new resume - clear everything
      if (!resumeId) {
        // Only reset if we're not already in edit mode
        if (!currentResumeId) {
          resetResume();
        }
        // Reset the ref when there's no resumeId
        lastLoadedResumeIdRef.current = null;
        return;
      }
      
      // Check if we already loaded this resume using the ref
      if (currentResumeId === resumeId && lastLoadedResumeIdRef.current === resumeId) {
        console.log('🔧 ManualWizardStep - Resume already loaded, skipping reload');
        return;
      }
      
      // For edit mode, clear localStorage first to avoid conflicts
      localStorage.removeItem('resume_wizard_v1');
      localStorage.removeItem('generated-resume');
      
      // Existing logic for loading resume when resumeId exists
      try {
        setIsLoadingResume(true);
        const resume = await resumeService.getResume(resumeId);
        
        // Guardar en el store - usar loadResumeData para evitar auto-save inmediato
        setCurrentResumeId(resume.id);
        
        // Actualizar resumeData directamente sin disparar auto-save
        // Esto evita que el auto-save sobrescriba datos antes de terminar la carga
        loadResumeData(resume.resumeData);
        
        // Si el resume tiene un generatedResume, cargarlo también
        if (resume.generatedResume) {
          setGeneratedResume(resume.generatedResume);
          setHasLoadedExistingResume(true);
        }
        
        // Update the ref after successful load
        lastLoadedResumeIdRef.current = resumeId;
        
      } catch (error) {
        console.error('Error cargando resume:', error);
        // Si hay error, continuar con wizard normal
        // Reset the ref on error to allow retry
        lastLoadedResumeIdRef.current = null;
      } finally {
        setIsLoadingResume(false);
      }
    };

    loadResumeFromUrl();
  }, [location.search, currentResumeId, resetResume, setCurrentResumeId, setGeneratedResume, setHasLoadedExistingResume, loadResumeData]);

  const handleSaveAndExit = async () => {
    try {
      // Sync wizardState.completedSteps and currentStep to resumeData before saving
      const resumeDataToSave = {
        ...resumeData,
        completedSteps: wizardState.completedSteps,
        currentStep: wizardState.currentStep,
      };
      
      if (currentResumeId) {
        // Edit mode: update existing resume in backend
        await resumeService.updateResume(currentResumeId, {
          resumeData: resumeDataToSave,
          updatedAt: new Date()
        });
        toast.success('Resume actualizado exitosamente');
      } else {
        // New resume: create in API
        const newResume = await resumeService.createResume(resumeDataToSave);
        setCurrentResumeId(newResume.id);
        toast.success(t('wizard.notifications.progressSavedLocal'));
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error(t('wizard.notifications.saveError'));
    }
  };

  const handleExitWithoutSaving = () => {
    // Clean up store when exiting without saving
    resetResume();
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className={containerClass}>
        {/* Header with Exit Button */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('wizard.title')}
            </h1>
            <p className="text-gray-600">
              {t('wizard.subtitle')}
            </p>
          </div>
          <button
            onClick={() => setIsExitModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('wizard.actions.saveAndExit')}
          </button>
        </div>

        {/* HUD with integrated step navigation */}
        <HUD />

        {/* Step Content */}
        {isStep10 ? (
          // Step 10 (Template Selection): Render without white card container for maximum width
          <>
            {isLoadingResume ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('loading.resume')}</p>
                </div>
              </div>
            ) : (
              <StepComponent />
            )}
          </>
        ) : (
          // Other steps: Use white card container
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {isLoadingResume ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">{t('loading.resume')}</p>
                </div>
              </div>
            ) : (
              <StepComponent />
            )}
          </div>
        )}

        {/* Exit Modal */}
        <ExitWizardModal
          isOpen={isExitModalOpen}
          onClose={() => setIsExitModalOpen(false)}
          onSaveAndExit={handleSaveAndExit}
          onExitWithoutSaving={handleExitWithoutSaving}
        />
      </div>
    </div>
  );
}


// Simplified Step2Skills for debugging
function SimpleStep2Skills() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.skills.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.skills.description')}
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('wizard.steps.skills.skillsLabel')}
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('wizard.steps.skills.addSkillPlaceholder')}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('wizard.steps.skills.toolsLabel')}
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('wizard.steps.skills.addToolPlaceholder')}
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/wizard/manual/step-1')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          {t('common.back')}
        </button>
        <button
          onClick={() => navigate('/wizard/manual/step-3')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {t('common.next')}
        </button>
      </div>
    </div>
  );
}

// Ultra-simplified wizard step without HUD
function UltraSimpleWizardStep({ stepComponent: StepComponent }: { stepComponent: React.ComponentType }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <StepComponent />
        </div>
      </div>
    </div>
  );
}

// Completely basic step for debugging
function BasicStep2() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Step 2 - Basic Test</h1>
      <p className="mb-4">This is a completely basic test component.</p>
      <div className="flex gap-4">
        <button 
          onClick={() => navigate('/wizard/manual/step-1')}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Previous
        </button>
        <button 
          onClick={() => navigate('/wizard/manual/step-3')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function WizardPage() {
  const { t } = useTranslation();
  const { wizardState, setCurrentStep } = useResumeStore();

  useEffect(() => {
    // Auto-save every 30 seconds
    const interval = setInterval(() => {
      // Auto-save logic would go here
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Main wizard routes */}
          <Route path="/" element={<ResumeCreationMode />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/linkedin" element={<LinkedInImport />} />
          
          {/* Manual creation wizard */}
          <Route path="/manual" element={<Navigate to="/wizard/manual/step-1" replace />} />
          <Route path="/manual/step-1" element={<ManualWizardStep stepComponent={Step1Profile} />} />
          <Route path="/manual/step-2" element={<ManualWizardStep stepComponent={Step2Skills} />} />
          <Route path="/manual/step-3" element={<ManualWizardStep stepComponent={Step3Experience} />} />
          <Route path="/manual/step-4" element={<ManualWizardStep stepComponent={Step4Education} />} />
          <Route path="/manual/step-5" element={<ManualWizardStep stepComponent={Step5Projects} />} />
          <Route path="/manual/step-6" element={<ManualWizardStep stepComponent={Step6Achievements} />} />
          <Route path="/manual/step-7" element={<ManualWizardStep stepComponent={Step7Summary} />} />
          <Route path="/manual/step-8" element={<ManualWizardStep stepComponent={Step8Preview} />} />
          <Route path="/manual/step-9" element={<ManualWizardStep stepComponent={Step9Score} />} />
          <Route path="/manual/step-10" element={<ManualWizardStep stepComponent={Step9Preview} />} />
          <Route path="/manual/step-11" element={<ManualWizardStep stepComponent={Step10Final} />} />
        </Routes>
      </div>
    </div>
  );
}
