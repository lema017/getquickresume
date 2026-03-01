import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWizardStore } from '@/hooks/useWizardStore';
import { useWizardNav } from '@/hooks/useWizardNav';
import { useWizardContext } from '@/contexts/WizardContext';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle, Wand2 } from 'lucide-react';
import { MonthYearPicker } from '@/components/MonthYearPicker';
import { MandatoryFieldLabel } from '@/components/MandatoryFieldLabel';
import { EnhanceProjectModal } from './EnhanceProjectModal';
import { Tooltip } from '@/components/ui/Tooltip';
import { ErrorModal } from '@/components/ErrorModal';
import { Project, Language } from '@/types';

export function Step5Projects() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNav();
  const { isPublicMode, onAIFeatureClick } = useWizardContext();
  const { resumeData, updateResumeData, saveResumeDataImmediately, markStepCompleted, setCurrentStep, currentResumeId } = useWizardStore();
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

  // Error Modal state
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (isPublicMode) {
      onAIFeatureClick('Enhance with AI');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Por favor, ingresa una descripción del proyecto para mejorar con IA');
      setShowErrorModal(true);
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

  // Validation: projects are optional, but if added, each project needs name and description
  const isFormValid = projects.length === 0 || 
    projects.every(project => project.name.trim() && project.description.trim());

  // Validation errors state
  const [showErrors, setShowErrors] = useState(false);

  const handleNext = async () => {
    // Projects are optional, but if any are added, they must be complete
    const incompleteProjects = projects.filter(project => 
      !project.name.trim() || !project.description.trim()
    );
    
    if (incompleteProjects.length > 0) {
      setShowErrors(true);
      // Scroll to error section
      const errorElement = document.querySelector('.validation-error-box');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setShowErrors(false);
    updateResumeData({ projects, languages });
    // Save immediately before navigation to ensure data is persisted
    try {
      await saveResumeDataImmediately();
    } catch (error) {
      console.error('Error saving projects data:', error);
      // Continue with navigation even if save fails - data is in store
    }
    markStepCompleted(5);
    setCurrentStep(6);
    navigateToStep(6);
  };

  const handleBack = () => {
    navigateToStep(4);
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
        {/* Projects optional indicator */}
        <div className={`mt-4 inline-block px-4 py-2 rounded-lg ${
          projects.length === 0
            ? 'bg-blue-50 border border-blue-200'
            : isFormValid 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className={`text-sm font-medium ${
            projects.length === 0
              ? 'text-blue-800'
              : isFormValid ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {projects.length === 0
              ? t('wizard.validation.projects.optional')
              : isFormValid 
              ? t('wizard.validation.projects.requirementMet', { 
                  count: projects.length, 
                  plural: projects.length > 1 ? 's' : ''
                })
              : t('wizard.validation.projects.requirement', { 
                  count: projects.length, 
                  plural: projects.length !== 1 ? 's' : ''
                })
            }
          </p>
        </div>
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
                <MandatoryFieldLabel
                  label={t('wizard.steps.projects.ui.projects.labels.name')}
                  required={false}
                />
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
                  <MandatoryFieldLabel
                    label={t('wizard.steps.projects.ui.projects.labels.description')}
                    required={false}
                  />
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

      {/* Show validation errors if user tried to proceed */}
      {showErrors && !isFormValid && (
        <div className="validation-error-box mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium mb-2">
            {t('wizard.validation.pleaseComplete')}
          </p>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            <li>{t('wizard.validation.projects.incomplete')}</li>
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
          className="btn-primary flex items-center"
          title={!isFormValid && projects.length > 0 ? t('wizard.validation.projects.tooltip') : ''}
        >
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
        language={resumeData.language}
        onApprove={handleEnhanceApprove}
        resumeId={currentResumeId || undefined}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
