import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Lightbulb, Loader2, Plus, X } from 'lucide-react';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { useTips } from '@/hooks/useTips';
import { summarySuggestionService } from '@/services/summarySuggestionService';

export function Step7Summary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep, calculateCharacters } = useResumeStore();
  const { user } = useAuthStore();
  const { areTipsClosed, closeTips, showTips } = useTips();  
  const [summary, setSummary] = useState(resumeData.summary);
  const [jobDescription, setJobDescription] = useState(resumeData.jobDescription);

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    setSummary(resumeData.summary);
    setJobDescription(resumeData.jobDescription);
  }, [resumeData.summary, resumeData.jobDescription]);

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

  // Estado de error
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);

  const handleNext = () => {
    updateResumeData({ summary, jobDescription });
    markStepCompleted(7);
    setCurrentStep(8);
    navigate('/wizard/manual/step-8');
  };

  const handleBack = () => {
    navigate('/wizard/manual/step-6');
  };

  // Función para cargar sugerencias de experiencia
  const loadExperienceSuggestions = async () => {
    if (!resumeData.profession || resumeData.profession.trim() === '') {
      setSuggestionsError('No hay profesión definida. Completa el paso anterior primero.');
      return;
    }

    if (experienceSuggestions.length > 0) return; // Already loaded

    try {
      setIsLoadingExperience(true);
      setSuggestionsError(null);
      
      const achievements = resumeData.achievements.map(ach => ach.description);
      const suggestions = await summarySuggestionService.getExperienceSuggestions(
        resumeData.profession,
        achievements,
        resumeData.projects,
        resumeData.language
      );
      setExperienceSuggestions(suggestions);
    } catch (error) {
      console.error('Error loading experience suggestions:', error);
      const errorMessage = error instanceof Error ? error.message : 'No se pudieron cargar las sugerencias de experiencia.';
      setSuggestionsError(errorMessage);
    } finally {
      setIsLoadingExperience(false);
    }
  };

  // Función para cargar sugerencias de diferenciadores
  const loadDifferentiatorsSuggestions = async () => {
    if (!resumeData.profession || resumeData.profession.trim() === '') {
      setSuggestionsError('No hay profesión definida. Completa el paso anterior primero.');
      return;
    }

    if (differentiatorsSuggestions.length > 0) return; // Already loaded

    try {
      setIsLoadingDifferentiators(true);
      setSuggestionsError(null);
      
      const achievements = resumeData.achievements.map(ach => ach.description);
      const suggestions = await summarySuggestionService.getDifferentiatorsSuggestions(
        resumeData.profession,
        achievements,
        resumeData.projects,
        resumeData.language
      );
      setDifferentiatorsSuggestions(suggestions);
    } catch (error) {
      console.error('Error loading differentiators suggestions:', error);
      const errorMessage = error instanceof Error ? error.message : 'No se pudieron cargar las sugerencias de diferenciadores.';
      setSuggestionsError(errorMessage);
    } finally {
      setIsLoadingDifferentiators(false);
    }
  };

  // Función para agregar sugerencia de experiencia
  const addExperienceSuggestion = (suggestion: string) => {
    if (!summary.includes(suggestion)) {
      const newSummary = summary ? `${summary}\n\n${suggestion}` : suggestion;
      setSummary(newSummary);
      
      // Actualizar el contador de caracteres
      const currentCharacters = calculateCharacters();
      const suggestionCharacters = suggestion.length + 2; // +2 for newlines
      const newTotalCharacters = currentCharacters + suggestionCharacters;
      
      updateResumeData({ 
        summary: newSummary,
        totalCharacters: newTotalCharacters 
      });
      
      // Marcar como usada
      setUsedExperienceSuggestions(prev => new Set([...prev, suggestion]));
    }
  };

  // Función para agregar sugerencia de diferenciadores
  const addDifferentiatorsSuggestion = (suggestion: string) => {
    if (!jobDescription.includes(suggestion)) {
      const newJobDescription = jobDescription ? `${jobDescription}\n\n${suggestion}` : suggestion;
      setJobDescription(newJobDescription);
      
      // Actualizar el contador de caracteres
      const currentCharacters = calculateCharacters();
      const suggestionCharacters = suggestion.length + 2; // +2 for newlines
      const newTotalCharacters = currentCharacters + suggestionCharacters;
      
      updateResumeData({ 
        jobDescription: newJobDescription,
        totalCharacters: newTotalCharacters 
      });
      
      // Marcar como usada
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

  const characterCount = summary.length + jobDescription.length;
  const isNearLimit = characterCount > 2800;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.summary.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.summary.description')}
        </p>
      </div>

      {/* Floating Tips */}
      <FloatingTips
        title={`💡 ${t('wizard.steps.summary.ui.tips.title')}`}
        tips={t('wizard.steps.summary.ui.tips.items', { returnObjects: true }) as unknown as string[]}
      />

      {/* Guided Questions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          Preguntas Guiadas
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-800 font-medium">
                {t('wizard.steps.summary.questions.summary')}
              </p>
              {resumeData.profession && resumeData.profession.trim() !== '' ? (
                <button
                  onClick={handleLoadExperienceSuggestions}
                  disabled={isLoadingExperience}
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {isLoadingExperience ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-1" />
                  )}
                  <span>Sugerencias con IA</span>
                  {experienceSuggestions.length > 0 && (
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
              <span className="text-sm text-gray-500">
                {summary.length} caracteres
              </span>
            </div>
            
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
                
                {suggestionsError && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-yellow-800 text-sm">{suggestionsError}</p>
                  </div>
                )}
                
                {experienceSuggestions.length > 0 && !isLoadingExperience && (
                  <div className="space-y-2">
                    {experienceSuggestions.map((suggestion, index) => {
                      const isUsed = usedExperienceSuggestions.has(suggestion);
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
              <p className="text-blue-800 font-medium">
                {t('wizard.steps.summary.questions.achievements')}
              </p>
              {resumeData.profession && resumeData.profession.trim() !== '' ? (
                <button
                  onClick={handleLoadDifferentiatorsSuggestions}
                  disabled={isLoadingDifferentiators}
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {isLoadingDifferentiators ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-1" />
                  )}
                  <span>Sugerencias con IA</span>
                  {differentiatorsSuggestions.length > 0 && (
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
              <span className="text-sm text-gray-500">
                {jobDescription.length} caracteres
              </span>
            </div>
            
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
                
                {suggestionsError && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-yellow-800 text-sm">{suggestionsError}</p>
                  </div>
                )}
                
                {differentiatorsSuggestions.length > 0 && !isLoadingDifferentiators && (
                  <div className="space-y-2">
                    {differentiatorsSuggestions.map((suggestion, index) => {
                      const isUsed = usedDifferentiatorsSuggestions.has(suggestion);
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

      {/* Character Counter */}
      <div className={`p-4 rounded-lg mb-6 ${isNearLimit ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${isNearLimit ? 'text-amber-800' : 'text-gray-700'}`}>
            Total de caracteres: {characterCount.toLocaleString()}/3,500
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                characterCount > 3500 ? 'bg-red-500' : 
                characterCount > 2800 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((characterCount / 3500) * 100, 100)}%` }}
            />
          </div>
        </div>
        {isNearLimit && (
          <p className="text-amber-700 text-sm mt-2">
            ⚠️ Te estás acercando al límite de caracteres. Considera ser más conciso.
          </p>
        )}
      </div>

      {/* Motivation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {t('wizard.steps.summary.motivator')}
        </p>
      </div>


      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button onClick={handleNext} className="btn-primary flex items-center">
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
