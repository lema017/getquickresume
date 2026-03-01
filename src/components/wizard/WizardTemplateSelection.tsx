import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Loader2, X } from 'lucide-react';
import { useResumeStore } from '@/stores/resumeStore';
import { ResumeTemplate } from '@/services/templatesService';
import { loadAllLocalTemplates } from '@/utils/templateCatalog';
import { WebComponentRenderer } from './WebComponentRenderer';
import { generateSmallMockResumeData } from '@/utils/mockResumeData';

export function WizardTemplateSelection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplateId, setSelectedTemplate } = useResumeStore();

  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await loadAllLocalTemplates();
        if (!mounted) return;
        setTemplates(list as ResumeTemplate[]);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || t('wizard.errors.errorLoadingTemplates'));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [t]);

  const handleSelect = (template: ResumeTemplate) => {
    setSelectedTemplate(template.id, template.category);
    const searchParams = new URLSearchParams(location.search);
    const queryString = searchParams.toString();
    navigate(`/wizard/manual/step-1${queryString ? `?${queryString}` : ''}`, { replace: true });
  };

  const handlePreview = (template: ResumeTemplate) => {
    setPreviewTemplate(template);
  };

  const mockData = generateSmallMockResumeData();

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">{t('wizard.errors.loadingTemplates')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 text-center">
        <div className="inline-block bg-red-50 text-red-700 border border-red-200 rounded px-4 py-2 mb-3">
          {error}
        </div>
        <button className="btn-primary" onClick={() => window.location.reload()}>
          {t('wizard.errors.retryGeneration')}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('publicWizard.templateSelection.title', 'Choose Your Resume Template')}
        </h2>
        <p className="text-gray-600">
          {t('publicWizard.templateSelection.subtitle', 'Pick a design that matches your style. You can always change it later.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            mockData={mockData}
            isSelected={template.id === selectedTemplateId}
            onSelect={() => handleSelect(template)}
            onPreview={() => handlePreview(template)}
          />
        ))}
      </div>

      {previewTemplate && (
        <TemplatePreviewOverlay
          template={previewTemplate}
          mockData={mockData}
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => {
            handleSelect(previewTemplate);
            setPreviewTemplate(null);
          }}
        />
      )}
    </div>
  );
}

function TemplateCard({
  template,
  mockData,
  isSelected,
  onSelect,
  onPreview,
}: {
  template: ResumeTemplate;
  mockData: any;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35);
  useEffect(() => {
    const updateScale = () => {
      if (cardRef.current && cardRef.current.clientWidth > 0) {
        const containerWidth = cardRef.current.clientWidth - 36;
        if (containerWidth > 0) {
          const s = containerWidth / 794;
          setScale(s);
        }
      }
    };
    const ro = new ResizeObserver(updateScale);
    const timeout = setTimeout(() => {
      if (cardRef.current) {
        ro.observe(cardRef.current);
        updateScale();
      }
    }, 100);
    return () => { clearTimeout(timeout); ro.disconnect(); };
  }, []);

  const wrapperH = Math.ceil(1123 * scale) + 32;

  return (
    <div
      ref={cardRef}
      className={`border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer relative ${
        isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
      </div>

      <div
        className="border border-gray-200 rounded mb-3 bg-gray-50 overflow-hidden"
        style={{ height: `${wrapperH}px`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px' }}
      >
        <div style={{ width: `${794 * scale}px`, height: `${1123 * scale}px`, overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ width: '794px', height: '1123px', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <WebComponentRenderer
              tagName={template.tagName}
              jsCode={template.jsCode}
              data={mockData}
              language="en"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={(e) => { e.stopPropagation(); onPreview(); }}
          className="flex-1 btn-outline text-sm py-2 flex items-center justify-center"
        >
          {t('common.preview', 'Preview')}
        </button>
        {isSelected && (
          <div className="flex items-center text-blue-600 text-sm px-2">
            <Check className="w-4 h-4 mr-1" />
            <span className="font-medium">{t('common.selected', 'Selected')}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TemplatePreviewOverlay({
  template,
  mockData,
  onClose,
  onSelect,
}: {
  template: ResumeTemplate;
  mockData: any;
  onClose: () => void;
  onSelect: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-[60%] bg-gray-100 overflow-auto p-6 flex items-start justify-center min-h-[300px]">
          <div className="shrink-0 relative" style={{ width: 'calc(210mm * 0.52)', height: 'calc(297mm * 0.52)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '210mm', height: '297mm', transform: 'scale(0.52)', transformOrigin: 'top left' }}>
              <WebComponentRenderer
                tagName={template.tagName}
                jsCode={template.jsCode}
                data={mockData}
                language="en"
              />
            </div>
          </div>
        </div>

        <div className="md:w-[40%] p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{template.name}</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {t('publicWizard.templateSelection.previewDescription', 'Professional resume template with clean layout. Fully editable and customizable.')}
          </p>

          <button
            onClick={onSelect}
            className="w-full py-3 px-6 font-semibold rounded-lg transition-colors text-sm tracking-wide bg-gray-900 hover:bg-gray-800 text-white"
          >
            {t('publicWizard.templateSelection.useTemplate', 'Use This Template')}
          </button>
        </div>
      </div>
    </div>
  );
}
