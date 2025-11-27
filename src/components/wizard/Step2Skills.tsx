import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { validateSkills, FieldValidation } from '@/utils/validation';
import { ValidationError } from '@/components/ValidationError';
import { SanitizedInput } from '@/components/SanitizedInput';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { useTips } from '@/hooks/useTips';
import { suggestionService } from '@/services/suggestionService';

export function Step2Skills() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep, calculateCharacters } = useResumeStore();
  const { areTipsClosed, closeTips, showTips } = useTips();
  const [errors, setErrors] = useState<FieldValidation>({});
  const [skills, setSkills] = useState(resumeData.skillsRaw || []);
  const [newSkill, setNewSkill] = useState('');
  
  // Estados para sugerencias unificadas
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    setSkills(resumeData.skillsRaw || []);
  }, [resumeData.skillsRaw]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const skillToAdd = newSkill.trim();
      const newSkills = [...skills, skillToAdd];
      setSkills(newSkills);
      setNewSkill('');
      
      // Actualizar el contador de caracteres
      const currentCharacters = calculateCharacters();
      const skillCharacters = skillToAdd.length;
      const newTotalCharacters = currentCharacters + skillCharacters;
      
      // Actualizar el store con el nuevo total de caracteres
      updateResumeData({ 
        skillsRaw: newSkills,
        totalCharacters: newTotalCharacters 
      });
      
      // Limpiar error de habilidades si existe
      if (errors.skills) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter(s => s !== skill);
    setSkills(newSkills);
    
    // Actualizar el contador de caracteres (restar los caracteres del skill eliminado)
    const currentCharacters = calculateCharacters();
    const skillCharacters = skill.length;
    const newTotalCharacters = currentCharacters - skillCharacters;
    
    // Actualizar el store con el nuevo total de caracteres
    updateResumeData({ 
      skillsRaw: newSkills,
      totalCharacters: Math.max(0, newTotalCharacters) // Asegurar que no sea negativo
    });
  };

  // Load suggestions combining skills and tools from API
  const loadSuggestions = async () => {
    if (!resumeData.profession || resumeData.profession.trim() === '') {
      setSuggestionsError('No hay profesión definida. Completa el paso anterior primero.');
      return;
    }

    if (suggestions.length > 0) return; // Already loaded
    if (suggestionService.isLoading(resumeData.profession)) return;

    try {
      setIsLoadingSuggestions(true);
      setSuggestionsError(null);
      
      // Get suggestions from API (will combine skills and tools)
      const allSuggestions = await suggestionService.getSkillsSuggestions(resumeData.profession);
      setSuggestions(allSuggestions);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      const errorMessage = error instanceof Error ? error.message : 'No se pudieron cargar las sugerencias de habilidades.';
      setSuggestionsError(errorMessage);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Función para agregar sugerencia de habilidad
  const addSuggestionSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
      
      // Actualizar el contador de caracteres
      const currentCharacters = calculateCharacters();
      const skillCharacters = skill.length;
      const newTotalCharacters = currentCharacters + skillCharacters;
      
      // Actualizar el store con el nuevo total de caracteres
      updateResumeData({ 
        skillsRaw: newSkills,
        totalCharacters: newTotalCharacters 
      });
      
      // Limpiar error de habilidades si existe
      if (errors.skills) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
  };

  // Handler para controlar la visibilidad de las sugerencias
  const handleLoadSuggestions = async () => {
    if (suggestions.length === 0 && !isLoadingSuggestions) {
      await loadSuggestions();
    }
    setShowSuggestions(!showSuggestions);
  };

  const handleNext = () => {
    // Validar habilidades (mínimo 5)
    const validationErrors = validateSkills(skills);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Si no hay errores, continuar
    updateResumeData({ skillsRaw: skills });
    markStepCompleted(2);
    setCurrentStep(3);
    navigate('/wizard/manual/step-3');
  };

  const handleBack = () => {
    navigate('/wizard/manual/step-1');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.skills.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.skills.description')}
        </p>
      </div>

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.skills.ui.sectionTitle')}</h3>
          {areTipsClosed && (
            <TipsButton onClick={showTips} />
          )}
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title={`💡 ${t('wizard.steps.skills.ui.tips.title')}`}
            tips={t('wizard.steps.skills.ui.tips.items', { returnObjects: true }) as unknown as string[]}
            onClose={closeTips}
          />
        )}
      </div>

      {/* Guided Questions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          {t('wizard.steps.skills.ui.guided.title')}
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-800 font-medium">
                {t('wizard.steps.skills.questions.skills')}
              </p>
              {resumeData.profession && resumeData.profession.trim() !== '' ? (
                <button
                  onClick={handleLoadSuggestions}
                  disabled={isLoadingSuggestions}
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {isLoadingSuggestions ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-1" />
                  )}
                  <span>{t('wizard.steps.skills.ui.ai.suggestionsButton')}</span>
                  {suggestions.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {suggestions.length}
                    </span>
                  )}
                </button>
              ) : (
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {t('wizard.steps.skills.ui.guided.fillProfessionHint')}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <SanitizedInput
                value={newSkill}
                onChange={setNewSkill}
                placeholder={t('wizard.steps.skills.ui.placeholders.skill')}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button
                onClick={addSkill}
                className="btn-primary px-4"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <ValidationError message={errors.skills?.message || ''} />
            
            {/* Sección de Sugerencias de Habilidades - Colapsable */}
            {showSuggestions && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-medium text-purple-800 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t('wizard.steps.skills.ui.suggestions.titleSkills')}
                  </h4>
                  <button
                    onClick={() => setShowSuggestions(false)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {isLoadingSuggestions && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600 mr-2" />
                    <span className="text-purple-600">{t('wizard.steps.skills.ui.ai.generating')}</span>
                  </div>
                )}
                
                {suggestionsError && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                    <p className="text-yellow-800 text-sm">{suggestionsError}</p>
                  </div>
                )}
                
                {suggestions.length > 0 && !isLoadingSuggestions && (
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((skill, index) => {
                      const isAlreadyAdded = skills.includes(skill);
                      return (
                        <button
                          key={index}
                          onClick={() => addSuggestionSkill(skill)}
                          disabled={isAlreadyAdded}
                          className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            isAlreadyAdded
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105 active:scale-95'
                          }`}
                        >
                          {isAlreadyAdded ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {skill}
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-1" />
                              {skill}
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {suggestions.length === 0 && !isLoadingSuggestions && (
                  <p className="text-purple-600 text-sm">{t('wizard.steps.skills.ui.ai.noneForProfession')}</p>
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
          {t('wizard.steps.skills.motivator')}
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
