import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Check, Loader2, X } from 'lucide-react';
import { usePublicResumeStore } from '@/stores/publicResumeStore';
import { ImportChoiceModal } from '@/components/ImportChoiceModal';
import { WebComponentRenderer } from '@/components/wizard/WebComponentRenderer';
import type { ResumeData } from '@/types';

const templates = [
  {
    id: 'gqr-resume-classic',
    name: 'Classic',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-corporate',
    name: 'Corporate',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-mercury',
    name: 'Mercury',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-finance',
    name: 'Finance',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-steady',
    name: 'Steady Form',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-charcoal',
    name: 'Charcoal Glow',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-pristine',
    name: 'Pristine',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-saffron',
    name: 'Saffron Line',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-obsidian',
    name: 'Obsidian Edge',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-cobalt',
    name: 'Cobalt Edge',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-precision',
    name: 'Precision Line',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-silver',
    name: 'Silver',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-mckinsey',
    name: 'McKinsey',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-designer',
    name: 'Designer',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-slate',
    name: 'Clean Slate',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-desert',
    name: 'Desert Rock',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-fineline',
    name: 'Fine Line',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-minty',
    name: 'Minty',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-atlantic',
    name: 'Atlantic Blue',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-happy',
    name: 'Happy',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-darkbg',
    name: 'Dark Background',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-webworker',
    name: 'Web Worker',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-seapearl',
    name: 'Sea Pearl',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-redaccent',
    name: 'Red Accent',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-blueaccent',
    name: 'Blue Accent',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-typewriter',
    name: 'Typewriter',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-monochrome',
    name: 'Monochrome',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-navybar',
    name: 'Navy Bar',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-executive',
    name: 'Executive',
    category: 'free' as const,
  },
  {
    id: 'gqr-resume-boldname',
    name: 'Bold Name',
    category: 'free' as const,
  },
];

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
  const { setSelectedTemplate } = usePublicResumeStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null);
  const [templateCodes, setTemplateCodes] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;
    async function loadAllTemplates() {
      const entries = await Promise.all(
        templates.map(async (tpl) => {
          try {
            const res = await fetch(`/templates/designs/${tpl.id}.js?v=${Date.now()}`);
            if (!res.ok) return null;
            const code = await res.text();
            return [tpl.id, code] as const;
          } catch {
            return null;
          }
        })
      );
      if (!mounted) return;
      const codes: Record<string, string> = {};
      for (const entry of entries) {
        if (entry) codes[entry[0]] = entry[1];
      }
      setTemplateCodes(codes);
    }
    loadAllTemplates();
    return () => { mounted = false; };
  }, []);

  const handleSelect = useCallback((template: typeof templates[0]) => {
    setSelectedId(template.id);
    setSelectedTemplate(template.id, template.category);
    localStorage.setItem('public_selected_template', JSON.stringify({
      id: template.id,
      category: template.category,
    }));
    setPreviewTemplate(null);
    setShowImportModal(true);
  }, [setSelectedTemplate]);

  const features = [
    t('publicWizard.templateSelection.features.a4Size'),
    t('publicWizard.templateSelection.features.editable'),
    t('publicWizard.templateSelection.features.customizable'),
    t('publicWizard.templateSelection.features.printReady'),
    t('publicWizard.templateSelection.features.shareable'),
  ];

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

        <style dangerouslySetInnerHTML={{ __html: '.hide-scrollbar::-webkit-scrollbar{display:none}' }} />
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-10 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {templates.map((template) => (
              <div key={template.id} className="flex flex-col items-center w-full max-w-[360px]">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className={`relative bg-white rounded-xl border overflow-hidden transition-all hover:shadow-xl w-full ${
                    selectedId === template.id
                      ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="bg-white relative w-full" style={{ aspectRatio: '210 / 297', overflow: 'hidden' }}>
                    {templateCodes[template.id] ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '210mm',
                          height: '297mm',
                          transform: 'scale(var(--thumb-scale))',
                          transformOrigin: 'top left',
                          pointerEvents: 'none',
                        }}
                        ref={(el) => {
                          if (el) {
                            const parent = el.parentElement;
                            if (parent) {
                              const s = parent.offsetWidth / el.offsetWidth;
                              el.style.setProperty('--thumb-scale', String(s));
                            }
                          }
                        }}
                      >
                        <WebComponentRenderer
                          tagName={template.id}
                          jsCode={templateCodes[template.id]}
                          data={sampleResumeData}
                          language="en"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                      </div>
                    )}
                  </div>

                  {selectedId === template.id && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>

                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-700 text-center">
                  {template.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPreviewTemplate(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-[60%] bg-gray-100 overflow-auto p-6 flex items-start justify-center min-h-[300px]">
              {templateCodes[previewTemplate.id] ? (
                <div
                  className="shrink-0 relative"
                  style={{
                    width: 'calc(210mm * 0.52)',
                    height: 'calc(297mm * 0.52)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '210mm',
                      height: '297mm',
                      transform: 'scale(0.52)',
                      transformOrigin: 'top left',
                    }}
                  >
                    <WebComponentRenderer
                      tagName={previewTemplate.id}
                      jsCode={templateCodes[previewTemplate.id]}
                      data={sampleResumeData}
                      language="en"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              )}
            </div>

            <div className="md:w-[40%] p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-4">
                {previewTemplate.name}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {t('publicWizard.templateSelection.previewDescription')}
              </p>

              <ul className="space-y-2.5 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(previewTemplate)}
                className="w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide"
              >
                {t('publicWizard.templateSelection.useTemplate')}
              </button>
            </div>
          </div>
        </div>
      )}

      <ImportChoiceModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />
    </>
  );
}
