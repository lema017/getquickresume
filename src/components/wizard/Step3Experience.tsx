import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Lightbulb, Sparkles, Wand2 } from 'lucide-react';
import { WorkExperience } from '@/types';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { MonthYearPicker } from '@/components/MonthYearPicker';
import { AchievementSuggestionsModal } from './AchievementSuggestionsModal';
import { EnhanceTextModal } from './EnhanceTextModal';
import { Tooltip } from '@/components/ui/Tooltip';
import { useTips } from '@/hooks/useTips';

export function Step3Experience() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep, addWorkExperience } = useResumeStore();
  const { areTipsClosed, closeTips, showTips } = useTips();
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
  }, []);

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
    if (!jobTitle.trim()) {
      alert('Por favor, ingresa el título del puesto para obtener sugerencias de IA');
      return;
    }
    setSuggestionsModal({ isOpen: true, jobTitle: jobTitle.trim(), expId });
  }, []);

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
  }, []);

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

  const handleNext = () => {
    // Validate dates before proceeding
    if (!areAllDatesValid()) {
      alert('Por favor, verifica que la fecha de fin sea posterior a la fecha de inicio en todas las experiencias.');
      return;
    }
    
    updateResumeData({ experience: experiences });
    markStepCompleted(3);
    setCurrentStep(4);
    navigate('/wizard/manual/step-4');
  };

  const handleBack = () => {
    navigate('/wizard/manual/step-2');
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

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.experience.ui.sectionTitle')}</h3>
          {areTipsClosed && (
            <TipsButton onClick={showTips} />
          )}
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title={`💡 ${t('wizard.steps.experience.ui.tips.title')}`}
            tips={t('wizard.steps.experience.ui.tips.items', { returnObjects: true }) as unknown as string[]}
            onClose={closeTips}
          />
        )}
      </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.experience.ui.form.position')}
                </label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                  className="input-field"
                  placeholder={t('wizard.steps.experience.ui.placeholders.position')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.experience.ui.form.company')}
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="input-field"
                  placeholder={t('wizard.steps.experience.ui.placeholders.company')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.experience.ui.form.startDate')}
                </label>
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
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  <span>{t('wizard.steps.experience.ui.ai.suggestionsButton')}</span>
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

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button 
          onClick={handleNext} 
          className={`flex items-center ${
            areAllDatesValid() 
              ? 'btn-primary' 
              : 'bg-gray-400 cursor-not-allowed text-white'
          }`}
          disabled={!areAllDatesValid()}
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
        onSelect={handleSuggestionsSelect}
      />

      <EnhanceTextModal
        isOpen={enhanceModal.isOpen}
        onClose={() => setEnhanceModal({ isOpen: false, originalText: '', expId: '', achIndex: -1, jobTitle: '' })}
        originalText={enhanceModal.originalText}
        jobTitle={enhanceModal.jobTitle}
        onApprove={handleEnhanceApprove}
      />
    </div>
  );
}
