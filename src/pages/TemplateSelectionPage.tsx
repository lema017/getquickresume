import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { usePublicResumeStore } from '@/stores/publicResumeStore';
import { ImportChoiceModal } from '@/components/ImportChoiceModal';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { TEMPLATE_CATALOG } from '@/utils/templateCatalog';
import type { ResumeData } from '@/types';

const sampleResumeData: ResumeData = {
  firstName: 'John',
  lastName: 'Doe',
  country: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/johndoe',
  language: 'en',
  targetLevel: 'senior',
  profession: 'Senior Software Engineer',
  tone: 'professional',
  phone: '+1 (555) 123-4567',
  email: 'john.doe@example.com',
  skillsRaw: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Python', 'PostgreSQL'],
  experience: [
    {
      id: 'exp-1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      startDate: '2020-01',
      isCurrent: true,
      achievements: [
        'Led development of microservices architecture serving 1M+ users',
        'Improved system performance by 40% through optimization',
        'Mentored team of 5 junior developers',
      ],
      responsibilities: [],
      pageNumber: null,
    },
    {
      id: 'exp-2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      startDate: '2017-06',
      endDate: '2020-01',
      isCurrent: false,
      achievements: [
        'Built React frontend for e-commerce platform',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
      ],
      responsibilities: [],
      pageNumber: null,
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013-09',
      endDate: '2017-05',
      isCompleted: true,
      pageNumber: null,
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022',
      pageNumber: null,
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, serving 50K+ active users monthly.',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      startDate: '2021-01',
      isOngoing: false,
      pageNumber: null,
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'native', pageNumber: null },
    { id: 'lang-2', name: 'Spanish', level: 'intermediate', pageNumber: null },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Best Innovation Award',
      description: 'Recognized for developing an AI-powered code review tool',
      year: '2023',
      pageNumber: null,
    },
  ],
  summary: 'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions.',
  jobDescription: '',
  completedSteps: [1, 2, 3, 4, 5, 6, 7],
  currentStep: 7,
  totalCharacters: 0,
  lastSaved: new Date(),
  firstNamePageNumber: null,
  lastNamePageNumber: null,
  countryPageNumber: null,
  linkedinPageNumber: null,
  languagePageNumber: null,
  targetLevelPageNumber: null,
  professionPageNumber: null,
  tonePageNumber: null,
  phonePageNumber: null,
  emailPageNumber: null,
  summaryPageNumber: null,
  jobDescriptionPageNumber: null,
  skillsPagination: null,
};

export function TemplateSelectionPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { setSelectedTemplate } = usePublicResumeStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const templatesToShow = useMemo(() => {
    return [...TEMPLATE_CATALOG];
  }, []);

  const hasProcessedTemplateParam = useRef(false);
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (!templateParam?.trim() || hasProcessedTemplateParam.current) return;

    const template = templatesToShow.find((t) => t.id === templateParam);
    if (!template) return;

    hasProcessedTemplateParam.current = true;
    setSelectedId(template.id);
    setSelectedTemplate(template.id, template.category);
    localStorage.setItem('public_selected_template', JSON.stringify({
      id: template.id,
      category: template.category,
    }));
    setShowImportModal(true);
  }, [searchParams, templatesToShow, setSelectedTemplate]);

  const handleSelect = useCallback(
    (template: { id: string; name: string; category: 'free' | 'premium' }) => {
      setSelectedId(template.id);
      setSelectedTemplate(template.id, template.category);
      localStorage.setItem('public_selected_template', JSON.stringify({
        id: template.id,
        category: template.category,
      }));
      setShowImportModal(true);
    },
    [setSelectedTemplate]
  );

  return (
    <>
      <Helmet>
        <title>{t('publicWizard.templateSelection.title')} - GetQuickResume</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {t('publicWizard.templateSelection.title')}
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t('publicWizard.templateSelection.subtitle')}
            </p>
          </div>
        </div>

        <TemplateGrid
          templates={templatesToShow}
          sampleResumeData={sampleResumeData}
          onSelectTemplate={handleSelect}
          selectedId={selectedId}
        />
      </div>

      <ImportChoiceModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />
    </>
  );
}
