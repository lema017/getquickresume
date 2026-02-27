import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { ArrowRight, CheckCircle, Linkedin, RefreshCw } from 'lucide-react';
import { countries } from '@/utils/countries';
import { resumeService } from '@/services/resumeService';
import { ResumeGenerationProgress } from './ResumeGenerationProgress';
import { GeneratedResumeView } from './GeneratedResumeView';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { formatName, formatProfession } from '@/utils/textFormatting';
import { trackResumeGeneratedAI } from '@/services/marketingAnalytics';

export function Step8Preview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep, setGeneratedResume, setIsGenerating, generatedResume, isGenerating, currentResumeId, setCurrentResumeId, hasLoadedExistingResume, setScore } = useResumeStore();
  const { user } = useAuthStore();
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  
  // Debug logging for education data
  // Generar CV automáticamente cuando se carga el componente (solo para nuevos CVs)
  // Flag to prevent multiple generation attempts
  const [hasAttemptedGeneration, setHasAttemptedGeneration] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState<'regenerate' | 'aiSuggestions'>('regenerate');

  // Check if we have minimum required data to generate a resume
  const hasMinimumResumeData = () => {
    return (
      resumeData.firstName?.trim() &&
      resumeData.lastName?.trim() &&
      resumeData.profession?.trim() &&
      (resumeData.experience.length > 0 || resumeData.education.length > 0)
    );
  };

  // Check if user can use AI features (premium OR free user who hasn't used their quota)
  const canUseAIFeatures = user?.isPremium || !user?.freeResumeUsed;

  useEffect(() => {
    const generateCV = async () => {
      // Skip auto-generation if we're editing an existing resume that already has a generated resume
      if (hasLoadedExistingResume && generatedResume) {
        console.log('🔍 Skipping auto-generation - editing existing resume with generated content');
        return;
      }
      
      // Skip if we already know limit is reached
      if (limitReached) {
        return;
      }
      
      // Skip if we don't have minimum required data
      if (!hasMinimumResumeData()) {
        console.log('🔍 Skipping auto-generation - insufficient resume data');
        return;
      }
      
      // Check if free user has used their quota - show CTA instead of making API call
      if (!canUseAIFeatures && !generatedResume && !hasAttemptedGeneration) {
        console.log('🔍 Free user quota exhausted - showing premium CTA');
        setHasAttemptedGeneration(true);
        setPremiumFeature('regenerate');
        setShowPremiumModal(true);
        return;
      }
      
      // Only auto-generate for new resumes without existing generated content
      if (!generatedResume && !isGenerating && !isGeneratingCV && !hasLoadedExistingResume && !hasAttemptedGeneration) {
        setIsGeneratingCV(true);
        setGenerationError(null);
        setBackendError(null);
        setIsGenerating(true);
        setHasAttemptedGeneration(true);
        
        try {
          // Generar el CV (API will check limits)
          // Note: The API now includes scoring synchronously, so this takes ~10-15 seconds
          console.log('🔍 Generando CV con currentResumeId:', currentResumeId);
          const response = await resumeService.generateResume(resumeData, currentResumeId || undefined);
          
          // Guardar en el store
          setGeneratedResume(response.data!);
          
          // Track AI resume generation success
          trackResumeGeneratedAI(response.resumeId || currentResumeId || undefined);
          
          // Note: We intentionally do NOT call syncResumeDataToGeneratedResume() here.
          // The AI generates enhanced content (merged summary, detailed experiences, etc.)
          // and syncing would overwrite AI-generated data with raw resumeData, losing enhancements.
          // If users want to edit, they can use the edit features in GeneratedResumeView.
          
          // Si no tenemos resumeId, guardarlo del response (esto solo pasa en la primera generación)
          if (!currentResumeId && response.resumeId) {
            console.log('🔍 Guardando nuevo resumeId:', response.resumeId);
            setCurrentResumeId(response.resumeId);
          } else {
            console.log('🔍 Ya tenemos currentResumeId, no actualizando:', currentResumeId);
          }
          
          // Use the score from the response if available (scoring is now synchronous)
          if (response.score) {
            console.log('🔍 Score received from API:', response.score.totalScore);
            setScore(response.score);
          }
          
          toast.success('¡CV generado y analizado exitosamente!');
        } catch (error: any) {
          console.error('Error generating CV:', error);
          // Check for premium required error (from API protection)
          if (error?.code === 'PREMIUM_REQUIRED') {
            setLimitReached(true);
            setPremiumFeature('regenerate');
            setShowPremiumModal(true);
            return;
          }
          // Check for limit errors (legacy format)
          if (error?.response?.data?.error === 'Free resume limit reached' || 
              error?.response?.data?.error === 'Monthly limit reached') {
            setLimitReached(true);
            setGenerationError(error?.response?.data?.message || error.message);
            toast.error(error?.response?.data?.message || error.message);
          } else {
            const errorMessage = error instanceof Error ? error.message : 'Error al generar el CV';
            setGenerationError(errorMessage);
            toast.error(errorMessage);
            // Keep hasAttemptedGeneration true to prevent infinite loop
            // User can manually retry via the "Intentar de nuevo" button
          }
        } finally {
          setIsGeneratingCV(false);
          setIsGenerating(false);
        }
      }
    };

    generateCV();
  }, [generatedResume, isGenerating, isGeneratingCV, hasLoadedExistingResume, hasAttemptedGeneration, limitReached, currentResumeId, setGeneratedResume, setIsGenerating, setCurrentResumeId, resumeData]);

  const handleNext = () => {
    if (!generatedResume) {
      toast.error('Debes generar el CV antes de continuar');
      return;
    }
    markStepCompleted(8);
    setCurrentStep(9);
    navigateToStep(9);
  };

  const handleRegenerateCV = async () => {
    // Check if user can use AI features - show CTA if not
    if (!canUseAIFeatures) {
      setPremiumFeature('regenerate');
      setShowPremiumModal(true);
      return;
    }
    
    // Reset flags to allow manual regeneration
    setHasAttemptedGeneration(false);
    setLimitReached(false);
    
    setIsGeneratingCV(true);
    setGenerationError(null);
    setBackendError(null);
    setIsGenerating(true);
    
    // Clear any existing score since we're regenerating
    useResumeStore.getState().clearScore();
    
    try {
      // Generar el CV (API will check limits)
      // Note: The API now includes scoring synchronously, so this takes ~10-15 seconds
      const response = await resumeService.generateResume(resumeData, currentResumeId || undefined);
      
      // Guardar en el store
      setGeneratedResume(response.data!);
      
      // Track AI resume regeneration success
      trackResumeGeneratedAI(response.resumeId || currentResumeId || undefined);
      
      // Note: We intentionally do NOT call syncResumeDataToGeneratedResume() here.
      // The AI generates enhanced content and syncing would overwrite it with raw resumeData.
      
      // Use the score from the response if available (scoring is now synchronous)
      if (response.score) {
        console.log('🔍 Score received from API (regenerate):', response.score.totalScore);
        setScore(response.score);
      }
      
      toast.success('¡CV regenerado y analizado exitosamente!');
    } catch (error: any) {
      console.error('Error regenerating CV:', error);
      // Check for limit errors
      if (error?.response?.data?.error === 'Free resume limit reached' || 
          error?.response?.data?.error === 'Monthly limit reached') {
        setLimitReached(true);
        setGenerationError(error?.response?.data?.message || error.message);
        toast.error(error?.response?.data?.message || error.message);
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Error al regenerar el CV';
        setGenerationError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsGeneratingCV(false);
      setIsGenerating(false);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    updateResumeData({ [field]: value });
  };

  // Show missing data message if we don't have minimum required data and no resumeId
  if (!currentResumeId && !hasMinimumResumeData()) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('wizard.steps.preview.missingData.title', { defaultValue: 'Resume data not found' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('wizard.steps.preview.missingData.description', { 
                defaultValue: 'You need to complete the previous steps before generating your resume. Please start from the beginning or go to your dashboard to continue an existing resume.' 
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigateToStep(1)}
                className="btn-primary flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {t('wizard.steps.preview.missingData.startFromBeginning', { defaultValue: 'Start from beginning' })}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-outline flex items-center justify-center"
              >
                {t('wizard.steps.preview.missingData.goToDashboard', { defaultValue: 'Go to Dashboard' })}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Loading Overlay */}
      {(isGeneratingCV || isGenerating) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
            <ResumeGenerationProgress 
              isGenerating={true}
              estimatedTime={90}
              onTimeout={handleRegenerateCV}
            />
          </div>
        </div>
      )}
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.preview.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.preview.description')}
        </p>
        
        {/* Backend Connection Error */}
        {backendError && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">Servidor no disponible</h3>
                <p className="mt-1 text-sm text-orange-700">{backendError}</p>
                <p className="mt-2 text-sm text-orange-600">
                  Puedes ver y editar tu información, pero no se puede generar un nuevo CV en este momento.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Token/Generation Error */}
        {generationError && !backendError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error al generar CV</h3>
                <p className="mt-1 text-sm text-red-700">{generationError}</p>
                {canUseAIFeatures && (
                  <div className="mt-3">
                    <button
                      onClick={handleRegenerateCV}
                      disabled={isGeneratingCV}
                      className="text-sm font-medium text-red-600 hover:text-red-500 disabled:opacity-50"
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CV Preview - Editable */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {generatedResume ? 'CV Generado con IA' : 'Tu CV - Haz clic en cualquier sección para editar'}
          </h3>
          {generatedResume && (
            <button
              onClick={handleRegenerateCV}
              disabled={isGeneratingCV || !!backendError}
              className={`inline-flex items-center px-3 py-2 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                canUseAIFeatures
                  ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 focus:ring-amber-500'
              }`}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isGeneratingCV ? 'animate-spin' : ''}`} />
              {backendError ? 'Servidor no disponible' : canUseAIFeatures ? t('wizard.steps.preview.ui.regenerate') : t('dashboard.premiumAction.regenerate.cta')}
            </button>
          )}
        </div>
        
        {isGeneratingCV || isGenerating ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('wizard.steps.preview.ui.states.generatingTitle')}</h3>
            <p className="text-gray-600">{t('wizard.steps.preview.ui.states.generatingSubtitle')}</p>
          </div>
        ) : generatedResume ? (
            <GeneratedResumeView 
            resume={generatedResume}
            onUpdateResume={(updatedResume) => {
              setGeneratedResume(updatedResume);
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start">
                <div className="text-center flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {resumeData.firstName && resumeData.lastName 
                      ? formatName(`${resumeData.firstName} ${resumeData.lastName}`)
                      : formatName(user?.fullName || 'Tu Nombre')
                    }
                  </h1>
                  <p className="text-gray-600 mb-2">{resumeData.profession ? formatProfession(resumeData.profession) : ''}</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-gray-500">
                    <span>{resumeData.email || user?.email}</span>
                    {resumeData.phone && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{resumeData.phone}</span>
                      </>
                    )}
                    {resumeData.country && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{countries.find(c => c.code === resumeData.country)?.name || resumeData.country}</span>
                      </>
                    )}
                  </div>
                  {resumeData.linkedin && (
                    <div className="mt-2">
                      <a 
                        href={resumeData.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
                      >
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

          {/* Summary Section */}
          {(resumeData.summary || resumeData.jobDescription) && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('wizard.steps.preview.ui.sections.summary.title')}</h2>
              {resumeData.summary && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {t('wizard.steps.summary.questions.summary')}
                  </p>
                  <p className="text-gray-700">{resumeData.summary}</p>
                </div>
              )}
              {resumeData.jobDescription && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {t('wizard.steps.summary.questions.achievements')}
                  </p>
                  <p className="text-gray-700">{resumeData.jobDescription}</p>
                </div>
              )}
            </div>
          )}

          {/* Experience Section */}
          {resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('wizard.steps.preview.ui.sections.experience.title')}</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company} • {exp.startDate} - {exp.endDate}</p>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {resumeData.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('wizard.steps.preview.ui.sections.education.title')}</h2>
              <div className="space-y-3">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="border-l-4 border-green-200 pl-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution} • {edu.endDate}</p>
                    {edu.field && <p className="text-gray-700">{edu.field}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {resumeData.skillsRaw.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('wizard.steps.preview.ui.sections.skills.title')}</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skillsRaw.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        <button onClick={handleNext} className="btn-primary flex items-center">
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Premium Action Modal for AI features */}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature={premiumFeature}
      />
    </div>
  );
}
