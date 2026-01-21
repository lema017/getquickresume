import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Lightbulb, Sparkles, Wand2 } from 'lucide-react';
import { WorkExperience } from '@/types';
import { MonthYearPicker } from '@/components/MonthYearPicker';
import { MandatoryFieldLabel } from '@/components/MandatoryFieldLabel';
import { AchievementSuggestionsModal } from './AchievementSuggestionsModal';
import { EnhanceTextModal } from './EnhanceTextModal';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { Tooltip } from '@/components/ui/Tooltip';
import { ValidationError } from '@/components/ValidationError';

export function Step3Experience() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, updateResumeData, saveResumeDataImmediately, markStepCompleted, setCurrentStep, addWorkExperience, currentResumeId } = useResumeStore();
  const { user } = useAuthStore();
  const [experiences, setExperiences] = useState(resumeData.experience);

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    setExperiences(resumeData.experience);
  }, [resumeData.experience]);
  
  // AI Modal states
  const [suggestionsModal, setSuggestionsModal] = useState<{
    isOpen: boolean;
    jobTitle: string;
    expId: string;
  }>({ isOpen: false, jobTitle: '', expId: '' });
  
  const [enhanceModal, setEnhanceModal] = useState<{
    isOpen: boolean;
    originalText: string;
    expId: string;
    achIndex: number;
    jobTitle: string;
  }>({ isOpen: false, originalText: '', expId: '', achIndex: -1, jobTitle: '' });

  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // AI validation error state - tracks which experience has a missing job title error
  const [aiValidationError, setAiValidationError] = useState<string | null>(null);

  // Check if user can use AI features (premium OR free user who hasn't used their quota)
  const canUseAIFeatures = user?.isPremium || !user?.freeResumeUsed;

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      achievements: [],
      responsibilities: [],
      pageNumber: null,
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = useCallback((id: string, field: string, value: any) => {
    setExperiences(prevExperiences => 
      prevExperiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
    // Clear AI validation error when title field is updated
    if (field === 'title' && aiValidationError === id) {
      setAiValidationError(null);
    }
  }, [aiValidationError]);

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addAchievement = useCallback((expId: string) => {
    setExperiences(prevExperiences => {
      return prevExperiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, achievements: [...exp.achievements, ''] };
        }
        return exp;
      });
    });
  }, []);

  const updateAchievement = useCallback((expId: string, index: number, value: string) => {
    setExperiences(prevExperiences => {
      return prevExperiences.map(exp => {
        if (exp.id === expId) {
          const newAchievements = [...exp.achievements];
          newAchievements[index] = value;
          return { ...exp, achievements: newAchievements };
        }
        return exp;
      });
    });
  }, []);

  const removeAchievement = useCallback((expId: string, index: number) => {
    setExperiences(prevExperiences => {
      return prevExperiences.map(exp => {
        if (exp.id === expId) {
          const newAchievements = exp.achievements.filter((_, i) => i !== index);
          return { ...exp, achievements: newAchievements };
        }
        return exp;
      });
    });
  }, []);

  // AI Functions
  const openSuggestionsModal = useCallback((expId: string, jobTitle: string) => {
    // Check if user can use AI features - show CTA if not
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }

    if (!jobTitle.trim()) {
      setAiValidationError(expId);
      return;
    }
    setAiValidationError(null);
    setSuggestionsModal({ isOpen: true, jobTitle: jobTitle.trim(), expId });
  }, [canUseAIFeatures]);

  const handleSuggestionsSelect = useCallback((suggestions: string[]) => {
    setExperiences(prevExperiences => {
      return prevExperiences.map(exp => {
        if (exp.id === suggestionsModal.expId) {
          return { ...exp, achievements: [...exp.achievements, ...suggestions] };
        }
        return exp;
      });
    });
    setSuggestionsModal({ isOpen: false, jobTitle: '', expId: '' });
  }, [suggestionsModal.expId]);

  const openEnhanceModal = useCallback((expId: string, achIndex: number, text: string, jobTitle: string) => {
    // Check if user can use AI features - show CTA if not
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }

    if (!text.trim()) {
      alert('Por favor, ingresa un logro para mejorar con IA');
      return;
    }
    setEnhanceModal({ 
      isOpen: true, 
      originalText: text.trim(), 
      expId, 
      achIndex, 
      jobTitle: jobTitle.trim() 
    });
  }, [canUseAIFeatures]);

  const handleEnhanceApprove = useCallback((enhancedText: string) => {
    setExperiences(prevExperiences => {
      return prevExperiences.map(exp => {
        if (exp.id === enhanceModal.expId) {
          const newAchievements = [...exp.achievements];
          newAchievements[enhanceModal.achIndex] = enhancedText;
          return { ...exp, achievements: newAchievements };
        }
        return exp;
      });
    });
    setEnhanceModal({ isOpen: false, originalText: '', expId: '', achIndex: -1, jobTitle: '' });
  }, [enhanceModal.expId, enhanceModal.achIndex]);

  // Validation function to check if end date is after start date
  const validateExperienceDates = (exp: WorkExperience) => {
    if (!exp.startDate || !exp.endDate || exp.isCurrent) {
      return true; // No validation needed if dates are empty or it's current job
    }
    
    const startDate = new Date(exp.startDate);
    const endDate = new Date(exp.endDate);
    
    return endDate > startDate;
  };

  // Check if all experiences have valid dates
  const areAllDatesValid = () => {
    return experiences.every(validateExperienceDates);
  };

  // Validation: at least 1 experience required, all dates valid
  const isFormValid = experiences.length > 0 && areAllDatesValid() && 
    experiences.every(exp => exp.title.trim() && exp.company.trim() && exp.startDate);

  // Validation errors state
  const [showErrors, setShowErrors] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Compute validation errors
  const computeValidationErrors = () => {
    const errors: string[] = [];
    
    // Check if at least one experience exists
    if (experiences.length === 0) {
      errors.push(t('wizard.validation.experience.atLeastOne'));
    }
    
    // Check dates validity
    if (!areAllDatesValid()) {
      errors.push(t('wizard.validation.experience.invalidDates'));
    }
    
    // Check for incomplete experiences
    const incompleteExperiences = experiences.filter(exp => 
      !exp.title.trim() || !exp.company.trim() || !exp.startDate
    );
    
    if (incompleteExperiences.length > 0) {
      errors.push(t('wizard.validation.experience.incompleteFields'));
    }
    
    return errors;
  };

  const handleNext = async () => {
    const errors = computeValidationErrors();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowErrors(true);
      // Scroll to error section
      const errorElement = document.querySelector('.validation-error-box');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setShowErrors(false);
    updateResumeData({ experience: experiences });
    // Save immediately before navigation to ensure data is persisted
    try {
      await saveResumeDataImmediately();
    } catch (error) {
      console.error('Error saving experience data:', error);
      // Continue with navigation even if save fails - data is in store
    }
    markStepCompleted(3);
    setCurrentStep(4);
    navigateToStep(4);
  };

  const handleBack = () => {
    navigateToStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.experience.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.experience.description')}
        </p>
        {/* Experience requirement indicator */}
        <div className={`mt-4 inline-block px-4 py-2 rounded-lg ${
          experiences.length > 0 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-sm font-medium ${
            experiences.length > 0 ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {experiences.length > 0 
              ? t('wizard.validation.experience.requirementMet', { 
                  count: experiences.length, 
                  plural: experiences.length > 1 ? 's' : ''
                })
              : t('wizard.validation.experience.requirement')
            }
          </p>
        </div>
      </div>

      {/* Validation Error Alert */}
      {!areAllDatesValid() && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {t('wizard.steps.experience.ui.alerts.invalidDatesTitle')}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{t('wizard.steps.experience.ui.alerts.invalidDatesMessage')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guided Questions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          {t('wizard.steps.experience.ui.guided.title')}
        </h3>
        <div className="space-y-4">
          <p className="text-blue-800 font-medium">
            {t('wizard.steps.experience.questions.position')}
          </p>
          <p className="text-blue-800 font-medium">
            {t('wizard.steps.experience.questions.achievements')}
          </p>
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('wizard.steps.experience.ui.form.experienceN', { index: index + 1 })}
              </h3>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <MandatoryFieldLabel
                  label={t('wizard.steps.experience.ui.form.position')}
                  required={true}
                />
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  className="input-field"
                  placeholder={t('wizard.steps.experience.ui.placeholders.position')}
                />
                <ValidationError 
                  message={aiValidationError === exp.id ? t('wizard.steps.experience.ui.ai.jobTitleRequired') : ''} 
                />
              </div>
              <div>
                <MandatoryFieldLabel
                  label={t('wizard.steps.experience.ui.form.company')}
                  required={true}
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="input-field"
                  placeholder={t('wizard.steps.experience.ui.placeholders.company')}
                />
              </div>
              <div>
                <MandatoryFieldLabel
                  label={t('wizard.steps.experience.ui.form.startDate')}
                  required={true}
                />
                <MonthYearPicker
                  value={exp.startDate || ''}
                  onChange={(value: string) => updateExperience(exp.id, 'startDate', value)}
                  className="input-field"
                  error={Boolean(!validateExperienceDates(exp) && exp.startDate && exp.endDate && !exp.isCurrent)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.experience.ui.form.endDate')}
                </label>
                <MonthYearPicker
                  value={exp.endDate || ''}
                  onChange={(value: string) => updateExperience(exp.id, 'endDate', value)}
                  className="input-field"
                  disabled={exp.isCurrent}
                  error={Boolean(!validateExperienceDates(exp) && exp.startDate && exp.endDate && !exp.isCurrent)}
                />
                {!validateExperienceDates(exp) && exp.startDate && exp.endDate && !exp.isCurrent && (
                  <p className="text-red-600 text-sm mt-1">
                    {t('wizard.steps.experience.ui.form.endAfterStartError')}
                  </p>
                )}
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)}
                    className="mr-2"
                  />
                  {t('wizard.steps.experience.ui.form.currentJob')}
                </label>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t('wizard.steps.experience.ui.form.achievements')}
                </label>
                <button
                  onClick={() => openSuggestionsModal(exp.id, exp.title)}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                    canUseAIFeatures
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  <span>{canUseAIFeatures ? t('wizard.steps.experience.ui.ai.suggestionsButton') : t('dashboard.premiumAction.aiSuggestions.cta')}</span>
                </button>
              </div>
              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                    className="flex-1 input-field"
                    placeholder={t('wizard.steps.experience.ui.placeholders.achievement')}
                  />
                  {achievement && achievement.trim() !== '' && (
                    <Tooltip 
                      content={t('wizard.steps.experience.ai.enhance.tooltip')}
                      side="top"
                    >
                      <button
                        onClick={() => openEnhanceModal(exp.id, achIndex, achievement, exp.title)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Wand2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  )}
                  <button
                    onClick={() => removeAchievement(exp.id, achIndex)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title={t('wizard.steps.experience.ui.confirm.deleteAchievement')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addAchievement(exp.id)}
                className="btn-outline text-sm py-1 px-3"
              >
                <Plus className="w-4 h-4 mr-1" />
                {t('wizard.steps.experience.ui.form.addAchievement')}
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addExperience}
          className="w-full btn-outline flex items-center justify-center py-4"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('wizard.steps.experience.ui.form.addExperience')}
        </button>
      </div>

      {/* Motivation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 mt-8">
        <p className="text-green-800 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {t('wizard.steps.experience.motivator')}
        </p>
      </div>

      {/* Show validation errors if user tried to proceed */}
      {showErrors && validationErrors.length > 0 && (
        <div className="validation-error-box mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium mb-2">
            {t('wizard.validation.pleaseComplete')}
          </p>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
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
          className={`flex items-center ${
            isFormValid 
              ? 'btn-primary' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isFormValid}
          title={!isFormValid ? t('wizard.validation.experience.tooltip') : ''}
        >
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* AI Modals */}
      <AchievementSuggestionsModal
        isOpen={suggestionsModal.isOpen}
        onClose={() => setSuggestionsModal({ isOpen: false, jobTitle: '', expId: '' })}
        jobTitle={suggestionsModal.jobTitle}
        language={resumeData.language}
        onSelect={handleSuggestionsSelect}
        resumeId={currentResumeId || undefined}
      />

      <EnhanceTextModal
        isOpen={enhanceModal.isOpen}
        onClose={() => setEnhanceModal({ isOpen: false, originalText: '', expId: '', achIndex: -1, jobTitle: '' })}
        originalText={enhanceModal.originalText}
        jobTitle={enhanceModal.jobTitle}
        language={resumeData.language}
        onApprove={handleEnhanceApprove}
        resumeId={currentResumeId || undefined}
      />

      {/* Premium Action Modal for AI features */}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </div>
  );
}
