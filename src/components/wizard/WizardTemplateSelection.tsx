import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Loader2, X } from 'lucide-react';
import { useResumeStore } from '@/stores/resumeStore';
import { TEMPLATE_CATALOG, loadLocalTemplate, getTemplateThumbnailUrl } from '@/utils/templateCatalog';
import { WebComponentRenderer } from './WebComponentRenderer';
import { generateSmallMockResumeData } from '@/utils/mockResumeData';
import type { TemplateMeta } from '@/utils/templateCatalog';

export function WizardTemplateSelection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplateId, setSelectedTemplate } = useResumeStore();

  const [previewMeta, setPreviewMeta] = useState<TemplateMeta | null>(null);
  const [previewJsCode, setPreviewJsCode] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const handleSelect = (meta: TemplateMeta) => {
    setSelectedTemplate(meta.id, meta.category);
    const searchParams = new URLSearchParams(location.search);
    const queryString = searchParams.toString();
    navigate(`/wizard/manual/step-1${queryString ? `?${queryString}` : ''}`, { replace: true });
  };

  const handlePreview = useCallback(async (meta: TemplateMeta) => {
    setPreviewMeta(meta);
    setPreviewJsCode(null);
    setPreviewLoading(true);
    try {
      const loaded = await loadLocalTemplate(meta.id);
      if (loaded) setPreviewJsCode(loaded.jsCode);
    } catch { /* thumbnail fallback */ } finally {
      setPreviewLoading(false);
    }
  }, []);

  const mockData = generateSmallMockResumeData();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {TEMPLATE_CATALOG.map((meta) => {
          const isSelected = meta.id === selectedTemplateId;
          return (
            <div
              key={meta.id}
              className={`border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer relative ${
                isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => handleSelect(meta)}
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-gray-900 truncate">{meta.name}</h3>
              </div>

              <div className="border border-gray-200 rounded mb-3 bg-gray-50 overflow-hidden">
                <img
                  src={getTemplateThumbnailUrl(meta.id)}
                  alt={meta.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                  style={{ aspectRatio: '210/297', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePreview(meta); }}
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
        })}
      </div>

      {previewMeta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPreviewMeta(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            <button
              onClick={() => setPreviewMeta(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-[60%] bg-gray-100 overflow-auto p-6 flex items-start justify-center min-h-[300px]">
              {previewLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : previewJsCode ? (
                <div className="shrink-0 relative" style={{ width: 'calc(210mm * 0.52)', height: 'calc(297mm * 0.52)', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '210mm', height: '297mm', transform: 'scale(0.52)', transformOrigin: 'top left' }}>
                    <WebComponentRenderer
                      tagName={previewMeta.id}
                      jsCode={previewJsCode}
                      data={mockData}
                      language="en"
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={getTemplateThumbnailUrl(previewMeta.id)}
                  alt={`${previewMeta.name} preview`}
                  className="max-h-[70vh] object-contain"
                />
              )}
            </div>

            <div className="md:w-[40%] p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{previewMeta.name}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {t('publicWizard.templateSelection.previewDescription', 'Professional resume template with clean layout. Fully editable and customizable.')}
              </p>

              <button
                onClick={() => { handleSelect(previewMeta); setPreviewMeta(null); }}
                className="w-full py-3 px-6 font-semibold rounded-lg transition-colors text-sm tracking-wide bg-gray-900 hover:bg-gray-800 text-white"
              >
                {t('publicWizard.templateSelection.useTemplate', 'Use This Template')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
