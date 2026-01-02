import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Trophy, Sparkles, Loader2 } from 'lucide-react';
import { MandatoryFieldLabel } from '@/components/MandatoryFieldLabel';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { RateLimitWarning } from '@/components/RateLimitWarning';
import { achievementSuggestionService } from '@/services/achievementSuggestionService';
import { AchievementSuggestion } from '@/types';

export function Step6Achievements() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep, currentResumeId } = useResumeStore();
  const { user } = useAuthStore();
  const [achievements, setAchievements] = useState(resumeData.achievements || []);

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    setAchievements(resumeData.achievements || []);
  }, [resumeData.achievements]);
  
  // AI Suggestions states
  const [isLoadingAISuggestions, setIsLoadingAISuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AchievementSuggestion[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Check if user can use AI features (premium OR free user who hasn't used their quota)
  const canUseAIFeatures = user?.isPremium || !user?.freeResumeUsed;

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      year: '',
      pageNumber: null,
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievement = (id: string) => {
    const achievementToRemove = achievements.find(a => a.id === id);
    
    // Si el logro proviene de una sugerencia, habilitar la sugerencia nuevamente
    if (achievementToRemove && achievementToRemove._suggestionTitle) {
      setUsedSuggestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(achievementToRemove._suggestionTitle!);
        return newSet;
      });
    }
    
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    setAchievements(achievements.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    ));
  };

  const loadAISuggestions = async () => {
    // Check if user can use AI features - show CTA if not
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }

    if (!resumeData.profession || resumeData.profession.trim() === '') {
      setSuggestionsError('Completa tu profesión en el paso anterior para usar las sugerencias de IA');
      return;
    }

    setIsLoadingAISuggestions(true);
    setSuggestionsError(null);
    setShowAISuggestions(true);
    setUsedSuggestions(new Set()); // Limpiar sugerencias usadas al cargar nuevas

    try {
      const suggestions = await achievementSuggestionService.getAchievementSuggestions(
        resumeData.profession,
        resumeData.projects || [],
        resumeData.language,
        currentResumeId || undefined
      );
      setAiSuggestions(suggestions);
    } catch (error: any) {
      console.error('Error loading AI suggestions:', error);
      // Check if it's a premium required error from API
      if (error?.code === 'PREMIUM_REQUIRED' || error?.status === 403) {
        setShowPremiumModal(true);
        return;
      }
      // Check if it's a rate limit error
      if (error?.code === 'RATE_LIMIT_EXCEEDED' || error?.status === 429) {
        setIsRateLimited(true);
      }
      setSuggestionsError(error instanceof Error ? error.message : 'Error al cargar sugerencias de IA');
    } finally {
      setIsLoadingAISuggestions(false);
    }
  };

  const addSuggestionAsAchievement = (suggestion: AchievementSuggestion) => {
    const newAchievement = {
      id: Date.now().toString(),
      title: suggestion.title,
      description: suggestion.description,
      year: new Date().getFullYear().toString(),
      // Metadata para rastrear la sugerencia original
      _suggestionTitle: suggestion.title,
      pageNumber: null,
    };
    setAchievements([...achievements, newAchievement]);
    
    // Marcar sugerencia como usada
    setUsedSuggestions(prev => new Set([...prev, suggestion.title]));
  };

  // Validation errors state
  const [showErrors, setShowErrors] = useState(false);

  // Validation: achievements are optional, but if added, each achievement needs title and description
  const isFormValid = achievements.length === 0 || achievements.every(achievement => 
    achievement.title.trim() !== '' && achievement.description.trim() !== ''
  );

  const handleNext = () => {
    // Validate that if any achievements are added, they must be complete
    if (!isFormValid) {
      setShowErrors(true);
      // Scroll to error section
      const errorElement = document.querySelector('.validation-error-box');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setShowErrors(false);
    updateResumeData({ achievements });
    markStepCompleted(6);
    setCurrentStep(7);
    navigateToStep(7);
  };

  const handleBack = () => {
    navigateToStep(5);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.achievements.ui.headerTitle')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.achievements.ui.headerSubtitle')}
        </p>
        {/* Achievements optional indicator */}
        <div className={`mt-4 inline-block px-4 py-2 rounded-lg ${
          achievements.length === 0
            ? 'bg-blue-50 border border-blue-200'
            : isFormValid 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-sm font-medium ${
            achievements.length === 0
              ? 'text-blue-800'
              : isFormValid ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {achievements.length === 0
              ? t('wizard.validation.achievements.optional')
              : isFormValid 
              ? t('wizard.validation.achievements.requirementMet', { 
                  count: achievements.length, 
                  plural: achievements.length > 1 ? 's' : ''
                })
              : t('wizard.validation.achievements.requirement', { 
                  count: achievements.length, 
                  plural: achievements.length !== 1 ? 's' : ''
                })
            }
          </p>
        </div>
      </div>

      {/* Achievements Section Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.achievements.ui.headerTitle')}</h3>
          <button
            onClick={loadAISuggestions}
            disabled={isLoadingAISuggestions || !resumeData.profession}
            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              isLoadingAISuggestions || !resumeData.profession
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : canUseAIFeatures
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-sm hover:shadow-md'
                : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 shadow-sm hover:shadow-md'
            }`}
          >
            {isLoadingAISuggestions ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 mr-1" />
            )}
            <span>{canUseAIFeatures ? t('wizard.steps.achievements.ui.ai.suggestionsButton') : t('dashboard.premiumAction.aiSuggestions.cta')}</span>
            {aiSuggestions.length > 0 && !isLoadingAISuggestions && canUseAIFeatures && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {aiSuggestions.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* AI Suggestions Section */}
      {showAISuggestions && (
        <div className="mb-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              {t('wizard.steps.achievements.ui.ai.panelTitle')}
            </h4>
            
            {isLoadingAISuggestions ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600 mr-2" />
                <span className="text-purple-700">{t('wizard.steps.achievements.ui.ai.generating')}</span>
              </div>
            ) : isRateLimited && suggestionsError ? (
              <RateLimitWarning 
                message={suggestionsError}
                onRetry={() => {
                  setIsRateLimited(false);
                  setSuggestionsError(null);
                  loadAISuggestions();
                }}
              />
            ) : suggestionsError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{suggestionsError || t('wizard.steps.achievements.ui.ai.errorLoading')}</p>
              </div>
            ) : aiSuggestions.length > 0 ? (
              <div className="space-y-3">
                <p className="text-purple-700 text-sm mb-4">
                  {t('wizard.steps.achievements.ui.ai.clickToAdd')}
                </p>
                <div className="grid gap-3">
                  {aiSuggestions.map((suggestion, index) => {
                    const isUsed = usedSuggestions.has(suggestion.title);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => addSuggestionAsAchievement(suggestion)}
                        disabled={isUsed}
                        className={`text-left bg-white border rounded-lg p-4 transition-colors duration-200 ${
                          isUsed 
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
                            : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-2">
                              {suggestion.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              {suggestion.description}
                            </div>
                          </div>
                          {isUsed && (
                            <CheckCircle className="w-5 h-5 text-green-600 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Achievements List */}
      <div className="space-y-6 mb-8">
        {achievements.map((achievement, index) => (
          <div key={achievement.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <h4 className="font-medium text-gray-900">{t('wizard.steps.achievements.ui.list.itemTitleN', { index: index + 1 })}</h4>
              </div>
              <button
                onClick={() => removeAchievement(achievement.id)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <MandatoryFieldLabel
                  label={t('wizard.steps.achievements.ui.list.labels.title')}
                  required={false}
                />
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                  className="input-field"
                  placeholder={t('wizard.steps.achievements.ui.list.placeholders.title')}
                />
              </div>
              
              <div>
                <MandatoryFieldLabel
                  label={t('wizard.steps.achievements.ui.list.labels.description')}
                  required={false}
                />
                <textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder={t('wizard.steps.achievements.ui.list.placeholders.description')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.achievements.ui.list.labels.year')}
                </label>
                <input
                  type="number"
                  value={achievement.year}
                  onChange={(e) => updateAchievement(achievement.id, 'year', e.target.value)}
                  className="input-field"
                  placeholder={t('wizard.steps.achievements.ui.list.placeholders.year')}
                  min="1990"
                  max="2030"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Achievement Button */}
      <div className="text-center mb-8">
        <button
          onClick={addAchievement}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center mx-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('wizard.steps.achievements.ui.list.addButton')}
        </button>
      </div>


      {/* Motivational Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {t('wizard.steps.achievements.ui.motivator')}
        </p>
      </div>

      {/* Show validation errors if user tried to proceed */}
      {showErrors && !isFormValid && (
        <div className="validation-error-box mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium mb-2">
            {t('wizard.validation.pleaseComplete')}
          </p>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            <li>{t('wizard.validation.achievements.incomplete')}</li>
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button 
          onClick={handleNext} 
          className="btn-primary flex items-center"
          title={!isFormValid && achievements.length > 0 ? t('wizard.validation.achievements.tooltip') : ''}
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
    </div>
  );
}
