import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Loader2, X } from 'lucide-react';
import { WebComponentRenderer } from '@/components/wizard/WebComponentRenderer';
import { getTemplateThumbnailUrl, loadLocalTemplate } from '@/utils/templateCatalog';
import type { ResumeData } from '@/types';

export interface TemplateGridItem {
  id: string;
  name: string;
  category: 'free' | 'premium';
}

export interface TemplateGridProps {
  templates: TemplateGridItem[];
  sampleResumeData: ResumeData;
  onSelectTemplate?: (template: TemplateGridItem) => void;
  getUseTemplateUrl?: (template: TemplateGridItem) => string;
  selectedId?: string | null;
  useTemplateLabel?: string;
  previewDescription?: string;
  features?: string[];
  className?: string;
}

export function TemplateGrid({
  templates,
  sampleResumeData,
  onSelectTemplate,
  getUseTemplateUrl,
  selectedId = null,
  useTemplateLabel: useTemplateLabelProp,
  previewDescription: previewDescriptionProp,
  features: featuresProp,
  className,
}: TemplateGridProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [previewTemplate, setPreviewTemplate] = useState<TemplateGridItem | null>(null);
  const [previewJsCode, setPreviewJsCode] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const isLinkMode = typeof getUseTemplateUrl === 'function';

  const useTemplateLabel = useTemplateLabelProp ?? t('publicWizard.templateSelection.useTemplate');
  const previewDescription = previewDescriptionProp ?? t('publicWizard.templateSelection.previewDescription');
  const features = featuresProp ?? [
    t('publicWizard.templateSelection.features.a4Size'),
    t('publicWizard.templateSelection.features.editable'),
    t('publicWizard.templateSelection.features.customizable'),
    t('publicWizard.templateSelection.features.printReady'),
    t('publicWizard.templateSelection.features.shareable'),
  ];

  const handlePreviewClick = useCallback(async (template: TemplateGridItem) => {
    setPreviewTemplate(template);
    setPreviewJsCode(null);
    setPreviewLoading(true);
    try {
      const loaded = await loadLocalTemplate(template.id);
      if (loaded) {
        setPreviewJsCode(loaded.jsCode);
      }
    } catch {
      // Thumbnail already shown; JS preview is a bonus
    } finally {
      setPreviewLoading(false);
    }
  }, []);

  const handleUseTemplate = useCallback(
    (template: TemplateGridItem) => {
      if (isLinkMode && getUseTemplateUrl) {
        navigate(getUseTemplateUrl(template));
        setPreviewTemplate(null);
      } else if (onSelectTemplate) {
        onSelectTemplate(template);
        setPreviewTemplate(null);
      }
    },
    [isLinkMode, getUseTemplateUrl, onSelectTemplate, navigate]
  );

  if (templates.length === 0) return null;

  return (
    <>
      <div className={className ?? 'max-w-6xl mx-auto px-6 sm:px-10 pb-10'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {templates.map((template) => (
            <div key={template.id} className="flex flex-col items-center w-full max-w-[360px]">
              <button
                type="button"
                onClick={() => handlePreviewClick(template)}
                className={`relative bg-white rounded-xl border overflow-hidden transition-all hover:shadow-xl w-full ${
                  selectedId === template.id
                    ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="bg-white relative w-full" style={{ aspectRatio: '210 / 297', overflow: 'hidden' }}>
                  <img
                    src={getTemplateThumbnailUrl(template.id)}
                    alt={`${template.name} resume template`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
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

      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPreviewTemplate(null)}
            aria-hidden
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            <button
              type="button"
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-[60%] bg-gray-100 overflow-auto p-6 flex items-start justify-center min-h-[300px]">
              {previewLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : previewJsCode ? (
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
                      jsCode={previewJsCode}
                      data={sampleResumeData}
                      language="en"
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={getTemplateThumbnailUrl(previewTemplate.id)}
                  alt={`${previewTemplate.name} resume template preview`}
                  className="max-h-[70vh] object-contain"
                />
              )}
            </div>

            <div className="md:w-[40%] p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-4">
                {previewTemplate.name}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{previewDescription}</p>
              <ul className="space-y-2.5 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              {isLinkMode && getUseTemplateUrl ? (
                <Link
                  to={getUseTemplateUrl(previewTemplate)}
                  className="w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide text-center"
                >
                  {useTemplateLabel}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleUseTemplate(previewTemplate)}
                  className="w-full py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide"
                >
                  {useTemplateLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
