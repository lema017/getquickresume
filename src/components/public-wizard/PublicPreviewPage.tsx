import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Target,
  BarChart3,
  FileText,
  Languages,
  QrCode,
  Download,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { usePublicResumeStore } from '@/stores/publicResumeStore';
import { WebComponentRenderer } from '@/components/wizard/WebComponentRenderer';
import { calculatePagination } from '@/services/paginationService';
import { calculateAndAssignPageNumbers } from '@/components/wizard/Step9Preview';
import { generateResumePDFFromPages } from '@/utils/pdfGenerator';
import { A4_DIMENSIONS } from '@/utils/a4Dimensions';
import type { ResumeTemplate } from '@/services/templatesService';
import type { ResumeData } from '@/types';
import { filterResumeDataForPage } from '@/utils/resumePageFilter';
import toast from 'react-hot-toast';

const premiumFeatures = [
  { icon: Sparkles, titleKey: 'publicWizard.preview.features.aiEnhancement' },
  { icon: Target, titleKey: 'publicWizard.preview.features.jobTailoring' },
  { icon: BarChart3, titleKey: 'publicWizard.preview.features.atsScoring' },
  { icon: FileText, titleKey: 'publicWizard.preview.features.coverLetter' },
  { icon: Languages, titleKey: 'publicWizard.preview.features.translation' },
  { icon: QrCode, titleKey: 'publicWizard.preview.features.sharing' },
];

export function PublicPreviewPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, selectedTemplateId } = usePublicResumeStore();

  const [templateCode, setTemplateCode] = useState<string | null>(null);
  const [templateLoading, setTemplateLoading] = useState(true);
  const [templateError, setTemplateError] = useState<string | null>(null);

  const [paginatedPages, setPaginatedPages] = useState<ResumeData[]>([]);
  const [calculatingPagination, setCalculatingPagination] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const templateContainerRef = useRef<HTMLDivElement>(null);

  const tagName = selectedTemplateId || 'gqr-resume-classic';

  useEffect(() => {
    let mounted = true;
    async function loadTemplate() {
      setTemplateLoading(true);
      setTemplateError(null);
      try {
        const response = await fetch(`/templates/designs/${tagName}.js?v=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to load template: ${response.status}`);
        const code = await response.text();
        if (mounted) {
          setTemplateCode(code);
        }
      } catch (err: any) {
        if (mounted) {
          setTemplateError(err.message || 'Failed to load template');
        }
      } finally {
        if (mounted) setTemplateLoading(false);
      }
    }
    loadTemplate();
    return () => { mounted = false; };
  }, [tagName]);

  useEffect(() => {
    if (!templateCode || !resumeData) return;

    let cancelled = false;

    async function runPagination() {
      setCalculatingPagination(true);
      try {
        const template: ResumeTemplate = {
          id: tagName,
          name: tagName,
          category: 'free',
          tagName,
          jsCode: templateCode!,
        };

        const pagination = await calculatePagination(resumeData, template);

        if (cancelled) return;

        const paginatedResumeData = calculateAndAssignPageNumbers(resumeData, pagination);

        const pages: ResumeData[] = [];
        for (let pageNum = 1; pageNum <= pagination.totalPages; pageNum++) {
          pages.push(filterResumeDataForPage(paginatedResumeData, pageNum));
        }

        if (!cancelled) {
          setPaginatedPages(pages);
        }
      } catch (error) {
        console.error('Error calculating pagination:', error);
        if (!cancelled) {
          setPaginatedPages([resumeData]);
        }
      } finally {
        if (!cancelled) setCalculatingPagination(false);
      }
    }

    runPagination();
    return () => { cancelled = true; };
  }, [templateCode, resumeData, tagName]);

  const handleDownload = async () => {
    if (!templateContainerRef.current || paginatedPages.length === 0) {
      toast.error(t('publicWizard.preview.downloadError', { defaultValue: 'Resume not ready for download' }));
      return;
    }

    setGeneratingPDF(true);
    try {
      const container = templateContainerRef.current;

      const maxWaitTime = 5000;
      const pollInterval = 200;
      const startTime = Date.now();

      while (Date.now() - startTime < maxWaitTime) {
        const elements = container.querySelectorAll(tagName);
        if (elements.length > 0) {
          let allRendered = true;
          for (const el of elements) {
            if (!(el as any).data || (el as HTMLElement).offsetHeight === 0) {
              allRendered = false;
              break;
            }
          }
          if (allRendered) break;
        }
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      const userName = [resumeData.firstName, resumeData.lastName].filter(Boolean).join('_') || 'Resume';
      const fileName = `CV_${userName}.pdf`;

      await generateResumePDFFromPages(container, fileName);
      toast.success(t('publicWizard.preview.downloadSuccess', { defaultValue: 'PDF generated successfully' }));
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(t('publicWizard.preview.downloadError', { defaultValue: 'Error generating PDF' }));
    } finally {
      setGeneratingPDF(false);
    }
  };

  const lang = (resumeData.language as 'en' | 'es') || (i18n.language as 'en' | 'es') || 'en';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Resume Preview */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/create/step-7')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('publicWizard.preview.editResume')}
            </button>
            <button
              onClick={handleDownload}
              disabled={generatingPDF || paginatedPages.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
            >
              {generatingPDF ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {t('publicWizard.preview.downloadPdf')}
            </button>
          </div>

          {/* Template-rendered resume preview */}
          <div className="flex justify-center">
            {(templateLoading || calculatingPagination) && (
              <div className="flex items-center justify-center p-16 bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-3xl">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">
                    {templateLoading
                      ? t('publicWizard.preview.loadingTemplate', { defaultValue: 'Loading template...' })
                      : t('publicWizard.preview.calculatingLayout', { defaultValue: 'Calculating layout...' })}
                  </p>
                </div>
              </div>
            )}
            {templateError && (
              <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center w-full max-w-3xl">
                <p className="text-red-700">{templateError}</p>
              </div>
            )}
            {!templateLoading && !calculatingPagination && !templateError && templateCode && paginatedPages.length > 0 && (
              <div
                ref={templateContainerRef}
                className="flex flex-col items-center gap-6"
              >
                {paginatedPages.map((pageData, pageIndex) => (
                  <div
                    key={`page-${pageIndex + 1}`}
                    className="a4-page-container"
                    data-page-number={pageIndex + 1}
                    style={{
                      width: `${A4_DIMENSIONS.widthPX}px`,
                      minHeight: `${A4_DIMENSIONS.heightPX}px`,
                      height: 'auto',
                      background: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <WebComponentRenderer
                      key={`public-preview-${tagName}-page-${pageIndex + 1}`}
                      tagName={tagName}
                      jsCode={templateCode}
                      data={pageData}
                      language={lang}
                      style={{
                        width: `${A4_DIMENSIONS.widthPX}px`,
                        minHeight: `${A4_DIMENSIONS.heightPX}px`,
                        height: 'auto',
                        display: 'block',
                        overflow: 'visible',
                        position: 'relative',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Premium Features Showcase */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {t('publicWizard.preview.unlockTitle')}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t('publicWizard.preview.unlockSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to="/login"
                  className="flex flex-col items-center text-center p-5 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 flex items-center justify-center mb-3 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {t(feature.titleKey)}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-lg"
            >
              <Sparkles className="w-5 h-5" />
              {t('publicWizard.preview.signUpCta')}
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              {t('publicWizard.preview.reassurance')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
