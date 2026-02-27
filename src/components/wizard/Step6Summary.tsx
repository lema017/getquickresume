import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Lightbulb, Loader2, X, Wand2 } from 'lucide-react';
import { MandatoryFieldLabel } from '@/components/MandatoryFieldLabel';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { RateLimitWarning } from '@/components/RateLimitWarning';
import { EnhanceSummaryModal } from './EnhanceSummaryModal';
import { validateSummary } from '@/utils/validation';
import { summarySuggestionService } from '@/services/summarySuggestionService';

export function Step7Summary() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, updateResumeData, saveResumeDataImmediately, markStepCompleted, setCurrentStep, currentResumeId } = useResumeStore();
  const { user } = useAuthStore();
  const [summary, setSummary] = useState(resumeData.summary);
  const [jobDescription, setJobDescription] = useState(resumeData.jobDescription);

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    setSummary(resumeData.summary);
    setJobDescription(resumeData.jobDescription);
  }, [resumeData.summary, resumeData.jobDescription]);

  // Clear used suggestions when textarea is emptied (allows re-selection)
  useEffect(() => {
    if (summary.trim() === '') {
      setUsedExperienceSuggestions(new Set());
    }
  }, [summary]);

  useEffect(() => {
    if (jobDescription.trim() === '') {
      setUsedDifferentiatorsSuggestions(new Set());
    }
  }, [jobDescription]);

  // Estados para sugerencias de experiencia
  const [experienceSuggestions, setExperienceSuggestions] = useState<string[]>([]);
  const [isLoadingExperience, setIsLoadingExperience] = useState(false);
  const [showExperienceSuggestions, setShowExperienceSuggestions] = useState(false);
  const [usedExperienceSuggestions, setUsedExperienceSuggestions] = useState<Set<string>>(new Set());

  // Estados para sugerencias de diferenciadores
  const [differentiatorsSuggestions, setDifferentiatorsSuggestions] = useState<string[]>([]);
  const [isLoadingDifferentiators, setIsLoadingDifferentiators] = useState(false);
  const [showDifferentiatorsSuggestions, setShowDifferentiatorsSuggestions] = useState(false);
  const [usedDifferentiatorsSuggestions, setUsedDifferentiatorsSuggestions] = useState<Set<string>>(new Set());

  // Estado de error - separado por sección
  const [experienceError, setExperienceError] = useState<string | null>(null);
  const [isExperienceRateLimited, setIsExperienceRateLimited] = useState(false);
  const [differentiatorsError, setDifferentiatorsError] = useState<string | null>(null);
  const [isDifferentiatorsRateLimited, setIsDifferentiatorsRateLimited] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Estados para Enhance with AI modals
  const [showEnhanceSummaryModal, setShowEnhanceSummaryModal] = useState(false);
  const [showEnhanceDifferentiatorsModal, setShowEnhanceDifferentiatorsModal] = useState(false);

  // Check if user can use AI features (premium OR free user who hasn't used their quota)
  const canUseAIFeatures = user?.isPremium || !user?.freeResumeUsed;

  // Validation: summary min 50 chars, jobDescription min 30 chars
  const validationErrors = validateSummary(summary || '', jobDescription || '');
  const isFormValid = Object.keys(validationErrors).length === 0;

  // Validation errors state for the error box display
  const [showErrors, setShowErrors] = useState(false);

  const handleNext = async () => {
    setHasAttemptedSubmit(true);
    // Validate before proceeding
    const errors = validateSummary(summary || '', jobDescription || '');
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      // Scroll to error section
      const errorElement = document.querySelector('.validation-error-box');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setShowErrors(false);
    updateResumeData({ summary, jobDescription });
    // Save immediately before navigation to ensure data is persisted
    try {
      await saveResumeDataImmediately();
    } catch (error) {
      console.error('Error saving summary data:', error);
      // Continue with navigation even if save fails - data is in store
    }
    markStepCompleted(7);
    setCurrentStep(8);
    navigateToStep(8);
  };

  const handleBack = () => {
    navigateToStep(6);
  };

  // Función para cargar sugerencias de experiencia
  const loadExperienceSuggestions = async () => {
    // Check if user can use AI features - show CTA if not
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }

    if (!resumeData.profession || resumeData.profession.trim() === '') {
      setExperienceError('No hay profesión definida. Completa el paso anterior primero.');
      return;
    }

    if (experienceSuggestions.length > 0) return; // Already loaded

    // Clear any previous error state before starting a new load attempt
    setExperienceError(null);
    setIsExperienceRateLimited(false);

    try {
      setIsLoadingExperience(true);
      
      const achievements = resumeData.achievements.map(ach => ach.description);
      const suggestions = await summarySuggestionService.getExperienceSuggestions(
        resumeData.profession,
        achievements,
        resumeData.projects,
        resumeData.language,
        currentResumeId || undefined
      );
      setExperienceSuggestions(suggestions);
      setShowExperienceSuggestions(true); // Automatically show suggestions section on success
      setExperienceError(null); // Clear any previous errors
      setIsExperienceRateLimited(false); // Clear rate limit flag on success
    } catch (error: any) {
      console.error('Error loading experience suggestions:', error);
      // Check if it's a premium required error from API
      if (error?.code === 'PREMIUM_REQUIRED' || error?.status === 403) {
        setShowPremiumModal(true);
        return;
      }
      // Check if it's a rate limit error - use translated message
      if (error?.code === 'RATE_LIMIT_EXCEEDED' || error?.status === 429) {
        setIsExperienceRateLimited(true);
        setExperienceError(t('wizard.rateLimit.defaultMessage'));
      } else {
        const errorMessage = error instanceof Error ? error.message : t('wizard.steps.summary.ui.ai.errorLoading');
        setExperienceError(errorMessage);
      }
    } finally {
      setIsLoadingExperience(false);
    }
  };

  // Función para cargar sugerencias de diferenciadores
  const loadDifferentiatorsSuggestions = async () => {
    // Check if user can use AI features - show CTA if not
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }

    if (!resumeData.profession || resumeData.profession.trim() === '') {
      setDifferentiatorsError('No hay profesión definida. Completa el paso anterior primero.');
      return;
    }

    if (differentiatorsSuggestions.length > 0) return; // Already loaded

    // Clear any previous error state before starting a new load attempt
    setDifferentiatorsError(null);
    setIsDifferentiatorsRateLimited(false);

    try {
      setIsLoadingDifferentiators(true);
      
      const achievements = resumeData.achievements.map(ach => ach.description);
      const suggestions = await summarySuggestionService.getDifferentiatorsSuggestions(
        resumeData.profession,
        achievements,
        resumeData.projects,
        resumeData.language,
        currentResumeId || undefined
      );
      setDifferentiatorsSuggestions(suggestions);
      setShowDifferentiatorsSuggestions(true); // Automatically show suggestions section on success
      setDifferentiatorsError(null); // Clear any previous errors
      setIsDifferentiatorsRateLimited(false); // Clear rate limit flag on success
    } catch (error: any) {
      console.error('Error loading differentiators suggestions:', error);
      // Check if it's a premium required error from API
      if (error?.code === 'PREMIUM_REQUIRED' || error?.status === 403) {
        setShowPremiumModal(true);
        return;
      }
      // Check if it's a rate limit error - use translated message
      if (error?.code === 'RATE_LIMIT_EXCEEDED' || error?.status === 429) {
        setIsDifferentiatorsRateLimited(true);
        setDifferentiatorsError(t('wizard.rateLimit.defaultMessage'));
      } else {
        const errorMessage = error instanceof Error ? error.message : t('wizard.steps.summary.ui.ai.errorLoading');
        setDifferentiatorsError(errorMessage);
      }
    } finally {
      setIsLoadingDifferentiators(false);
    }
  };

  // Función para agregar sugerencia de experiencia
  const addExperienceSuggestion = (suggestion: string) => {
    if (!summary.includes(suggestion)) {
      const newSummary = summary ? `${summary}\n\n${suggestion}` : suggestion;
      setSummary(newSummary);
      
      updateResumeData({ summary: newSummary });
      
      // Mark suggestion as used
      setUsedExperienceSuggestions(prev => new Set([...prev, suggestion]));
    }
  };

  // Función para agregar sugerencia de diferenciadores
  const addDifferentiatorsSuggestion = (suggestion: string) => {
    if (!jobDescription.includes(suggestion)) {
      const newJobDescription = jobDescription ? `${jobDescription}\n\n${suggestion}` : suggestion;
      setJobDescription(newJobDescription);
      
      updateResumeData({ jobDescription: newJobDescription });
      
      // Mark suggestion as used
      setUsedDifferentiatorsSuggestions(prev => new Set([...prev, suggestion]));
    }
  };

  // Handlers para controlar la visibilidad de las sugerencias
  const handleLoadExperienceSuggestions = async () => {
    if (experienceSuggestions.length === 0 && !isLoadingExperience) {
      await loadExperienceSuggestions();
    }
    setShowExperienceSuggestions(!showExperienceSuggestions);
  };

  const handleLoadDifferentiatorsSuggestions = async () => {
    if (differentiatorsSuggestions.length === 0 && !isLoadingDifferentiators) {
      await loadDifferentiatorsSuggestions();
    }
    setShowDifferentiatorsSuggestions(!showDifferentiatorsSuggestions);
  };

  // Handlers for Enhance with AI
  const handleEnhanceSummary = () => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    setShowEnhanceSummaryModal(true);
  };

  const handleEnhanceDifferentiators = () => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    setShowEnhanceDifferentiatorsModal(true);
  };

  const handleSummaryEnhanceApprove = (enhancedText: string) => {
    setSummary(enhancedText);
    updateResumeData({ summary: enhancedText });
  };

  const handleDifferentiatorsEnhanceApprove = (enhancedText: string) => {
    setJobDescription(enhancedText);
    updateResumeData({ jobDescription: enhancedText });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.summary.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.summary.description')}
        </p>
        {/* Summary requirement indicator */}
        <div className={`mt-4 inline-block px-4 py-2 rounded-lg ${
          isFormValid 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-sm font-medium ${
            isFormValid ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {isFormValid 
              ? t('wizard.validation.summary.requirementMet')
              : t('wizard.validation.summary.requirement', { 
                  current: summary.length, 
                  jobCurrent: jobDescription.length
                })
            }
          </p>
        </div>
      </div>

      {/* Guided Questions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          Preguntas Guiadas
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <MandatoryFieldLabel
                label={t('wizard.steps.summary.questions.summary')}
                required={true}
                className="text-blue-800"
              />
              {resumeData.profession && resumeData.profession.trim() !== '' ? (
                <button
                  onClick={handleLoadExperienceSuggestions}
                  disabled={isLoadingExperience}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ${
                    canUseAIFeatures
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
                  }`}
                >
                  {isLoadingExperience ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-1" />
                  )}
                  <span>{canUseAIFeatures ? t('wizard.steps.summary.ui.ai.suggestionsButton') : t('dashboard.premiumAction.aiSuggestions.cta')}</span>
                  {experienceSuggestions.length > 0 && canUseAIFeatures && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {experienceSuggestions.length}
                    </span>
                  )}
                </button>
              ) : (
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {t('wizard.steps.summary.ui.guided.fillProfessionHint')}
                </div>
              )}
            </div>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Describe tu experiencia profesional en 3-4 líneas..."
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${
                summary.length >= 50 
                  ? 'text-green-600 font-medium' 
                  : summary.length > 0 
                    ? 'text-yellow-600' 
                    : 'text-gray-500'
              }`}>
                {t('wizard.validation.summary.characters', { 
                  count: summary.length, 
                  min: 50
                })} {summary.length >= 50 ? '✓' : t('wizard.validation.summary.minimumRequired')}
              </span>
              {/* Enhance with AI button for summary */}
              {summary.trim().length > 0 && (
                <button
                  onClick={handleEnhanceSummary}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                    canUseAIFeatures
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
                  }`}
                  title={t('wizard.steps.summary.enhanceTooltip')}
                >
                  <Wand2 className="w-4 h-4 mr-1.5" />
                  {t('wizard.steps.summary.enhanceWithAI')}
                </button>
              )}
            </div>
            {hasAttemptedSubmit && validationErrors.summary && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.summary.message}</p>
            )}
            
            {/* Rate Limit Error for Experience section - with countdown timer */}
            {isExperienceRateLimited && experienceError && (
              <div className="mt-3">
                <RateLimitWarning 
                  message={experienceError}
                  onRetry={() => {
                    setIsExperienceRateLimited(false);
                    setExperienceError(null);
                    loadExperienceSuggestions();
                  }}
                />
              </div>
            )}
            
            {/* Generic Error (non-rate limit) for Experience section */}
            {experienceError && !isExperienceRateLimited && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3 mt-3">
                <p className="text-yellow-800 text-sm">{experienceError}</p>
              </div>
            )}
            
            {/* Sección de Sugerencias de Experiencia - Colapsable */}
            {showExperienceSuggestions && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium text-purple-800 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Sugerencias de IA para Experiencia
                  </h4>
                  <button
                    onClick={() => setShowExperienceSuggestions(false)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {isLoadingExperience && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600 mr-2" />
                <span className="text-purple-600">{t('wizard.steps.summary.ui.ai.generating')}</span>
                  </div>
                )}
                
                {experienceSuggestions.length > 0 && !isLoadingExperience && (
                  <div className="space-y-2">
                    {experienceSuggestions.map((suggestion, index) => {
                      // Disabled if marked as used AND textarea is not empty (clears all when empty)
                      const isUsed = usedExperienceSuggestions.has(suggestion) && summary.trim().length > 0;
                      return (
                        <button
                          key={index}
                          onClick={() => addExperienceSuggestion(suggestion)}
                          disabled={isUsed}
                          className={`w-full text-left bg-white border rounded-lg p-3 transition-colors duration-200 ${
                            isUsed 
                              ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
                              : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-sm text-gray-900">
                                {suggestion}
                              </div>
                            </div>
                            {isUsed && (
                              <CheckCircle className="w-4 h-4 text-green-600 ml-2 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {experienceSuggestions.length === 0 && !isLoadingExperience && (
                  <p className="text-purple-600 text-sm">{t('wizard.steps.summary.ui.ai.noneForProfession')}</p>
                )}
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <MandatoryFieldLabel
                label={t('wizard.steps.summary.questions.achievements')}
                required={true}
                className="text-blue-800"
              />
              {resumeData.profession && resumeData.profession.trim() !== '' ? (
                <button
                  onClick={handleLoadDifferentiatorsSuggestions}
                  disabled={isLoadingDifferentiators}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ${
                    canUseAIFeatures
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
                  }`}
                >
                  {isLoadingDifferentiators ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-1" />
                  )}
                  <span>{canUseAIFeatures ? t('wizard.steps.summary.ui.ai.suggestionsButton') : t('dashboard.premiumAction.aiSuggestions.cta')}</span>
                  {differentiatorsSuggestions.length > 0 && canUseAIFeatures && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {differentiatorsSuggestions.length}
                    </span>
                  )}
                </button>
              ) : (
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {t('wizard.steps.summary.ui.guided.fillProfessionHint')}
                </div>
              )}
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="¿Qué te diferencia de otros profesionales en tu área?"
            />
            <div className="flex justify-between items-center mt-2">
              <span className={`text-sm ${
                jobDescription.length >= 30 
                  ? 'text-green-600 font-medium' 
                  : jobDescription.length > 0 
                    ? 'text-yellow-600' 
                    : 'text-gray-500'
              }`}>
                {t('wizard.validation.summary.characters', { 
                  count: jobDescription.length, 
                  min: 30
                })} {jobDescription.length >= 30 ? '✓' : t('wizard.validation.summary.minimumRequired')}
              </span>
              {/* Enhance with AI button for differentiators */}
              {jobDescription.trim().length > 0 && (
                <button
                  onClick={handleEnhanceDifferentiators}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                    canUseAIFeatures
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
                  }`}
                  title={t('wizard.steps.summary.enhanceTooltip')}
                >
                  <Wand2 className="w-4 h-4 mr-1.5" />
                  {t('wizard.steps.summary.enhanceWithAI')}
                </button>
              )}
            </div>
            {hasAttemptedSubmit && validationErrors.jobDescription && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.jobDescription.message}</p>
            )}
            
            {/* Rate Limit Error for Differentiators section - with countdown timer */}
            {isDifferentiatorsRateLimited && differentiatorsError && (
              <div className="mt-3">
                <RateLimitWarning 
                  message={differentiatorsError}
                  onRetry={() => {
                    setIsDifferentiatorsRateLimited(false);
                    setDifferentiatorsError(null);
                    loadDifferentiatorsSuggestions();
                  }}
                />
              </div>
            )}
            
            {/* Generic Error (non-rate limit) for Differentiators section */}
            {differentiatorsError && !isDifferentiatorsRateLimited && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3 mt-3">
                <p className="text-yellow-800 text-sm">{differentiatorsError}</p>
              </div>
            )}
            
            {/* Sección de Sugerencias de Diferenciadores - Colapsable */}
            {showDifferentiatorsSuggestions && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium text-purple-800 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Sugerencias de IA para Diferenciadores
                  </h4>
                  <button
                    onClick={() => setShowDifferentiatorsSuggestions(false)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {isLoadingDifferentiators && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600 mr-2" />
                    <span className="text-purple-600">{t('wizard.steps.summary.ui.ai.generating')}</span>
                  </div>
                )}
                
                {differentiatorsSuggestions.length > 0 && !isLoadingDifferentiators && (
                  <div className="space-y-2">
                    {differentiatorsSuggestions.map((suggestion, index) => {
                      // Disabled if marked as used AND textarea is not empty (clears all when empty)
                      const isUsed = usedDifferentiatorsSuggestions.has(suggestion) && jobDescription.trim().length > 0;
                      return (
                        <button
                          key={index}
                          onClick={() => addDifferentiatorsSuggestion(suggestion)}
                          disabled={isUsed}
                          className={`w-full text-left bg-white border rounded-lg p-3 transition-colors duration-200 ${
                            isUsed 
                              ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
                              : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="text-sm text-gray-900">
                                {suggestion}
                              </div>
                            </div>
                            {isUsed && (
                              <CheckCircle className="w-4 h-4 text-green-600 ml-2 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {differentiatorsSuggestions.length === 0 && !isLoadingDifferentiators && (
                  <p className="text-purple-600 text-sm">{t('wizard.steps.summary.ui.ai.noneForProfession')}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {t('wizard.steps.summary.motivator')}
        </p>
      </div>

      {/* Show validation errors if user tried to proceed */}
      {showErrors && Object.keys(validationErrors).length > 0 && (
        <div className="validation-error-box mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium mb-2">
            {t('wizard.validation.pleaseComplete')}
          </p>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            {Object.entries(validationErrors).map(([field, error]) => (
              <li key={field}>
                {error.messageKey ? t(error.messageKey) : error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button 
          onClick={handleNext} 
          className={`btn-primary flex items-center ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isFormValid}
          title={!isFormValid ? t('wizard.validation.summary.tooltip') : ''}
        >
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Premium Action Modal for AI features */}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />

      {/* Enhance with AI Modal for Summary */}
      <EnhanceSummaryModal
        isOpen={showEnhanceSummaryModal}
        onClose={() => setShowEnhanceSummaryModal(false)}
        originalText={summary}
        type="summary"
        jobTitle={resumeData.profession}
        language={resumeData.language}
        onApprove={handleSummaryEnhanceApprove}
        resumeId={currentResumeId || undefined}
      />

      {/* Enhance with AI Modal for Differentiators */}
      <EnhanceSummaryModal
        isOpen={showEnhanceDifferentiatorsModal}
        onClose={() => setShowEnhanceDifferentiatorsModal(false)}
        originalText={jobDescription}
        type="differentiators"
        jobTitle={resumeData.profession}
        language={resumeData.language}
        onApprove={handleDifferentiatorsEnhanceApprove}
        resumeId={currentResumeId || undefined}
      />
    </div>
  );
}
