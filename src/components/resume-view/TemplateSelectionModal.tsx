import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Crown, Loader2 } from 'lucide-react';
import { templatesService, ResumeTemplate } from '@/services/templatesService';
import { WebComponentRenderer } from '@/components/wizard/WebComponentRenderer';
import { generateSmallMockResumeData } from '@/utils/mockResumeData';
import { calculateA4PreviewScale, getA4ContainerStyles, getA4WrapperSize } from '@/utils/a4Dimensions';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: ResumeTemplate) => void;
  selectedTemplateId?: string;
}

export function TemplateSelectionModal({
  isOpen,
  onClose,
  onSelectTemplate,
  selectedTemplateId,
}: TemplateSelectionModalProps) {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const loadTemplates = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await templatesService.getTemplates();
        setTemplates(list);
      } catch (err) {
        console.error('Error loading templates:', err);
        setError(t('resumeView.download.errors.loadTemplatesFailed'));
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, [isOpen, t]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="template-selection-modal-title"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2
              id="template-selection-modal-title"
              className="text-2xl font-semibold text-gray-900"
            >
              {t('resumeView.download.templateModal.title')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label={t('resumeView.download.templateModal.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600">
                  {t('resumeView.download.templateModal.loading')}
                </span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {!loading && !error && templates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {t('resumeView.download.templateModal.noTemplates')}
                </p>
              </div>
            )}

            {!loading && !error && templates.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <TemplatePreviewCard
                    key={template.id}
                    template={template}
                    isSelected={template.id === selectedTemplateId}
                    onSelect={() => onSelectTemplate(template)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('resumeView.download.templateModal.cancel')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Template Preview Card Component
function TemplatePreviewCard({
  template,
  isSelected,
  onSelect,
}: {
  template: ResumeTemplate;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const mockTemplateData = generateSmallMockResumeData();

  // Calculate scale dynamically based on container width
  useEffect(() => {
    const updateScale = () => {
      if (cardRef.current && cardRef.current.clientWidth > 0) {
        const cardWidth = cardRef.current.clientWidth;
        const containerWidth = cardWidth - 32 - 32 - 4; // padding and border

        if (containerWidth > 0) {
          const calculatedScale = calculateA4PreviewScale(containerWidth, 10000);
          setScale(calculatedScale);

          const wrapperSize = getA4WrapperSize(calculatedScale);
          const calculatedHeight = wrapperSize.height + 32;
          setContainerHeight(Math.ceil(calculatedHeight));
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    const timeoutId = setTimeout(() => {
      if (cardRef.current) {
        resizeObserver.observe(cardRef.current);
        updateScale();
      }
    }, 100);

    window.addEventListener('resize', updateScale);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const a4Styles = getA4ContainerStyles(scale);
  const wrapperSize = getA4WrapperSize(scale);

  return (
    <div
      ref={cardRef}
      className={`border rounded-lg p-4 bg-white hover:shadow-lg transition-all cursor-pointer ${
        isSelected
          ? 'ring-2 ring-blue-500 border-blue-500 shadow-md'
          : 'border-gray-200'
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`${t('resumeView.download.templateModal.selectTemplate')} ${template.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Template Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
          {template.category === 'premium' && (
            <Crown
              className="w-4 h-4 text-amber-500 flex-shrink-0"
              aria-label="Premium"
            />
          )}
        </div>
      </div>

      {/* Template Preview */}
      <div
        ref={containerRef}
        className="border border-gray-200 rounded mb-3 bg-gray-50"
        style={{
          height: containerHeight ? `${containerHeight}px` : 'auto',
          minHeight: containerHeight ? undefined : '400px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '16px',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: `${wrapperSize.width}px`,
            height: `${wrapperSize.height}px`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div style={a4Styles}>
            <WebComponentRenderer
              tagName={template.tagName}
              jsCode={template.jsCode}
              data={mockTemplateData as any}
              language="en"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Select Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }`}
      >
        {isSelected
          ? t('resumeView.download.templateModal.selected')
          : t('resumeView.download.templateModal.select')}
      </button>
    </div>
  );
}

