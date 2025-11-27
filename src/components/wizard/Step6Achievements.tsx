import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Trophy, Sparkles, Loader2 } from 'lucide-react';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { useTips } from '@/hooks/useTips';
import { achievementSuggestionService } from '@/services/achievementSuggestionService';
import { AchievementSuggestion } from '@/types';

export function Step6Achievements() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep } = useResumeStore();
  const { areTipsClosed, closeTips, showTips } = useTips();  
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
    if (!resumeData.profession || resumeData.profession.trim() === '') {
      setSuggestionsError('Completa tu profesión en el paso anterior para usar las sugerencias de IA');
      return;
    }

    if (!resumeData.projects || resumeData.projects.length === 0) {
      setSuggestionsError('Agrega al menos un proyecto en el paso anterior para usar las sugerencias de IA');
      return;
    }

    setIsLoadingAISuggestions(true);
    setSuggestionsError(null);
    setShowAISuggestions(true);
    setUsedSuggestions(new Set()); // Limpiar sugerencias usadas al cargar nuevas

    try {
      const suggestions = await achievementSuggestionService.getAchievementSuggestions(
        resumeData.profession,
        resumeData.projects
      );
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error loading AI suggestions:', error);
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

  const handleNext = () => {
    updateResumeData({ achievements });
    markStepCompleted(6);
    setCurrentStep(7);
    navigate('/wizard/manual/step-7');
  };

  const handleBack = () => {
    navigate('/wizard/manual/step-5');
  };

  const isFormValid = achievements.length > 0 && achievements.every(achievement => 
    achievement.title.trim() !== '' && achievement.description.trim() !== ''
  );

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
      </div>

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.achievements.ui.headerTitle')}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={loadAISuggestions}
              disabled={isLoadingAISuggestions || !resumeData.profession || !resumeData.projects?.length}
              className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isLoadingAISuggestions || !resumeData.profession || !resumeData.projects?.length
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-sm hover:shadow-md'
              }`}
            >
              {isLoadingAISuggestions ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-1" />
              )}
              <span>{t('wizard.steps.achievements.ui.ai.suggestionsButton')}</span>
              {aiSuggestions.length > 0 && !isLoadingAISuggestions && (
                <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {aiSuggestions.length}
                </span>
              )}
            </button>
            {areTipsClosed && (
              <TipsButton onClick={showTips} />
            )}
          </div>
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title={`💡 ${t('wizard.steps.achievements.ui.tips.title')}`}
            tips={t('wizard.steps.achievements.ui.tips.items', { returnObjects: true }) as unknown as string[]}
            onClose={closeTips}
          />
        )}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.achievements.ui.list.labels.title')}
                </label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                  className="input-field"
                  placeholder={t('wizard.steps.achievements.ui.list.placeholders.title')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.achievements.ui.list.labels.description')}
                </label>
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

      {/* Skip Option */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t('wizard.steps.achievements.ui.skip.message')}
          </p>
          <button
            onClick={handleNext}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            {t('wizard.steps.achievements.ui.skip.continue')}
          </button>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {t('wizard.steps.achievements.ui.motivator')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button 
          onClick={handleNext} 
          disabled={!isFormValid && achievements.length > 0}
          className={`flex items-center ${
            isFormValid || achievements.length === 0 
              ? 'btn-primary' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
