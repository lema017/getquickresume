import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Wand2 } from 'lucide-react';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { MonthYearPicker } from '@/components/MonthYearPicker';
import { EnhanceProjectModal } from './EnhanceProjectModal';
import { Tooltip } from '@/components/ui/Tooltip';
import { useTips } from '@/hooks/useTips';
import { Project, Language } from '@/types';

export function Step5Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep } = useResumeStore();
  const { areTipsClosed, closeTips, showTips } = useTips();
  const [projects, setProjects] = useState(resumeData.projects);
  const [languages, setLanguages] = useState(resumeData.languages);

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    setProjects(resumeData.projects);
    setLanguages(resumeData.languages);
  }, [resumeData.projects, resumeData.languages]);

  // AI Modal state
  const [enhanceModal, setEnhanceModal] = useState<{
    isOpen: boolean;
    originalText: string;
    projectId: string;
    projectName: string;
  }>({ isOpen: false, originalText: '', projectId: '', projectName: '' });

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      startDate: '',
      endDate: '',
      isOngoing: false,
      pageNumber: null,
    };
    setProjects([...projects, newProject]);
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate',
      pageNumber: null,
    };
    setLanguages([...languages, newLanguage]);
  };

  // AI Functions
  const openEnhanceModal = useCallback((projectId: string, description: string, projectName: string) => {
    if (!description.trim()) {
      alert('Por favor, ingresa una descripción del proyecto para mejorar con IA');
      return;
    }
    setEnhanceModal({ 
      isOpen: true, 
      originalText: description.trim(), 
      projectId, 
      projectName: projectName.trim() 
    });
  }, []);

  const handleEnhanceApprove = useCallback((enhancedText: string) => {
    setProjects(prevProjects => {
      return prevProjects.map(project => {
        if (project.id === enhanceModal.projectId) {
          return { ...project, description: enhancedText };
        }
        return project;
      });
    });
    setEnhanceModal({ isOpen: false, originalText: '', projectId: '', projectName: '' });
  }, [enhanceModal.projectId]);

  const handleNext = () => {
    updateResumeData({ projects, languages });
    markStepCompleted(5);
    setCurrentStep(6);
    navigate('/wizard/manual/step-6');
  };

  const handleBack = () => {
    navigate('/wizard/manual/step-4');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.projects.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.projects.description')}
        </p>
      </div>

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.projects.ui.sectionTitle')}</h3>
          {areTipsClosed && (
            <TipsButton onClick={showTips} />
          )}
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title={`💡 ${t('wizard.steps.projects.ui.tips.title')}`}
            tips={t('wizard.steps.projects.ui.tips.items', { returnObjects: true }) as unknown as string[]}
            onClose={closeTips}
          />
        )}
      </div>

      {/* Projects Section */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.projects.ui.projects.title')}</h3>
        {projects.map((project, index) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">{t('wizard.steps.projects.ui.projects.entryTitle', { index: index + 1 })}</h4>
              <button
                onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.projects.ui.projects.labels.name')}
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, name: e.target.value} : p))}
                  className="input-field"
                  placeholder={t('wizard.steps.projects.ui.projects.placeholders.name')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.projects.ui.projects.labels.url')}
                </label>
                <input
                  type="url"
                  value={project.url}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, url: e.target.value} : p))}
                  className="input-field"
                  placeholder={t('wizard.steps.projects.ui.projects.placeholders.url')}
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {t('wizard.steps.projects.ui.projects.labels.description')}
                  </label>
                  {project.description.trim() && (
                    <Tooltip 
                      content={t('wizard.steps.projects.ai.enhance.tooltip')}
                      side="top"
                    >
                      <button
                        onClick={() => openEnhanceModal(project.id, project.description, project.name)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Wand2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  )}
                </div>
                <textarea
                  value={project.description}
                  onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, description: e.target.value} : p))}
                  className="input-field"
                  rows={3}
                  placeholder={t('wizard.steps.projects.ui.projects.placeholders.description')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.projects.ui.projects.labels.startDate')}
                </label>
                <MonthYearPicker
                  value={project.startDate || ''}
                  onChange={(value: string) => setProjects(projects.map(p => p.id === project.id ? {...p, startDate: value} : p))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.projects.ui.projects.labels.endDate')}
                </label>
                <MonthYearPicker
                  value={project.endDate || ''}
                  onChange={(value: string) => setProjects(projects.map(p => p.id === project.id ? {...p, endDate: value} : p))}
                  className="input-field"
                  disabled={project.isOngoing}
                />
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={project.isOngoing}
                    onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, isOngoing: e.target.checked} : p))}
                    className="mr-2"
                  />
                  {t('wizard.steps.projects.ui.projects.labels.ongoing')}
                </label>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addProject}
          className="w-full btn-outline flex items-center justify-center py-4"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('wizard.steps.projects.ui.projects.addButton')}
        </button>
      </div>

      {/* Languages Section */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.projects.ui.languages.title')}</h3>
        {languages.map((language, index) => (
          <div key={language.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">{t('wizard.steps.projects.ui.languages.entryTitle', { index: index + 1 })}</h4>
              <button
                onClick={() => setLanguages(languages.filter(l => l.id !== language.id))}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.projects.ui.languages.labels.name')}
                </label>
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) => setLanguages(languages.map(l => l.id === language.id ? {...l, name: e.target.value} : l))}
                  className="input-field"
                  placeholder={t('wizard.steps.projects.ui.languages.placeholders.name')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.projects.ui.languages.labels.level')}
                </label>
                <select
                  value={language.level}
                  onChange={(e) => setLanguages(languages.map(l => l.id === language.id ? {...l, level: e.target.value as any} : l))}
                  className="input-field"
                >
                  <option value="basic">{t('wizard.steps.projects.ui.languages.levelOptions.basic')}</option>
                  <option value="intermediate">{t('wizard.steps.projects.ui.languages.levelOptions.intermediate')}</option>
                  <option value="advanced">{t('wizard.steps.projects.ui.languages.levelOptions.advanced')}</option>
                  <option value="native">{t('wizard.steps.projects.ui.languages.levelOptions.native')}</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addLanguage}
          className="w-full btn-outline flex items-center justify-center py-4"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('wizard.steps.projects.ui.languages.addButton')}
        </button>
      </div>

      {/* Motivation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {t('wizard.steps.projects.motivator')}
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

      {/* AI Modal */}
      <EnhanceProjectModal
        isOpen={enhanceModal.isOpen}
        onClose={() => setEnhanceModal({ isOpen: false, originalText: '', projectId: '', projectName: '' })}
        originalText={enhanceModal.originalText}
        projectName={enhanceModal.projectName}
        onApprove={handleEnhanceApprove}
      />
    </div>
  );
}
