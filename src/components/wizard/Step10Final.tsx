import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { ArrowLeft, Download, Share2, Eye, CheckCircle, Sparkles, RefreshCw, Linkedin, FileText, Zap, Edit3 } from 'lucide-react';
import { countries } from '@/utils/countries';
import { ResumeEditModal } from './ResumeEditModal';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { useTips } from '@/hooks/useTips';
import { templatesService, ResumeTemplate } from '@/services/templatesService';
import { WebComponentRenderer } from './WebComponentRenderer';
import { convertResumeDataToTemplateFormat, filterDataForPage, TemplateDataFormat } from '@/utils/resumeDataToTemplateFormat';
import { convertGeneratedResumeToResumeData } from './TemplatePreviewModal';
import { ResumeData } from '@/types';
import { generateResumePDFFromPages } from '@/utils/pdfGenerator';
import { calculatePagination } from '@/services/paginationService';
import { calculateAndAssignPageNumbers, extractPaginationFields } from './Step9Preview';
import { modifyTemplateCodeForMultiPageDisplay } from '@/utils/templateCodeModifier';
import toast from 'react-hot-toast';
import { A4_DIMENSIONS } from '@/utils/a4Dimensions';

export function Step10Final() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData: storeResumeData, markStepCompleted, generatedResume, isGenerating, isEditingResume, startEditingResume, selectedTemplateId, updateResumeData } = useResumeStore();
  const { areTipsClosed, closeTips, showTips } = useTips();
  const { user } = useAuthStore();
  const [isGenerated, setIsGenerated] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [calculatingPagination, setCalculatingPagination] = useState(false);
  const [templateData, setTemplateData] = useState<TemplateDataFormat | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedPages, setPaginatedPages] = useState<TemplateDataFormat[]>([]);
  const [modifiedJsCode, setModifiedJsCode] = useState<string>('');
  const templateContainerRef = useRef<HTMLDivElement>(null);
  const lastCalculatedTemplateRef = useRef<string | null>(null);

  useEffect(() => {
    if (generatedResume) {
      setIsGenerated(true);
    }
  }, [generatedResume]);

  // Load selected template
  useEffect(() => {
    const loadTemplate = async () => {
      if (!selectedTemplateId) {
        setSelectedTemplate(null);
        return;
      }

      setLoadingTemplate(true);
      try {
        const templates = await templatesService.getTemplates();
        const template = templates.find(t => t.id === selectedTemplateId);
        setSelectedTemplate(template || null);
      } catch (error) {
        console.error('Error loading template:', error);
        toast.error('Error al cargar el template');
      } finally {
        setLoadingTemplate(false);
      }
    };

    loadTemplate();
  }, [selectedTemplateId]);

  // Modify template JS code to allow multi-page display
  useEffect(() => {
    if (!selectedTemplate?.jsCode) return;

    const modifiedCode = modifyTemplateCodeForMultiPageDisplay(selectedTemplate.jsCode);
    setModifiedJsCode(modifiedCode);
  }, [selectedTemplate?.jsCode]);

  // Calculate pagination and convert data when template and resume are available
  useEffect(() => {
    if (!selectedTemplate || !generatedResume) {
      if (!selectedTemplate) {
        lastCalculatedTemplateRef.current = null;
      }
      return;
    }

    // Create a unique key for this template/resume combination
    const templateKey = `${selectedTemplate.id}-${generatedResume.contactInfo.fullName}`;
    
    // Skip if we've already calculated for this combination
    if (lastCalculatedTemplateRef.current === templateKey) {
      return;
    }

    const calculatePaginationAndConvert = async () => {
      setCalculatingPagination(true);
      try {
        // Read storeResumeData inside the effect (gets current value without being a dependency)
        const currentResumeData = storeResumeData;
        
        // Use existing resumeData from store if available and complete, otherwise convert from generatedResume
        let resumeData: ResumeData;
        if (currentResumeData && currentResumeData.firstName && currentResumeData.experience && currentResumeData.experience.length > 0) {
          // Use existing data from store to preserve all fields (profession, targetLevel, etc.)
          resumeData = currentResumeData;
        } else {
          // Fallback: convert from generatedResume if store data is incomplete
          resumeData = convertGeneratedResumeToResumeData(generatedResume);
        }
        
        // Calculate pagination
        const pagination = await calculatePagination(resumeData, selectedTemplate);
        const paginatedResumeData = calculateAndAssignPageNumbers(resumeData, pagination);
        
        // Convert to template format
        const converted = convertResumeDataToTemplateFormat(paginatedResumeData);
        setTemplateData(converted);
        
        // Calculate total pages from paginated data
        const allPageNumbers = new Set<number>();
        if (converted.profilePageNumber) allPageNumbers.add(converted.profilePageNumber);
        if (converted.experience) {
          converted.experience.forEach(exp => {
            if (exp.pageNumber) allPageNumbers.add(exp.pageNumber);
          });
        }
        if (converted.projects) {
          converted.projects.forEach(proj => {
            if (proj.pageNumber) allPageNumbers.add(proj.pageNumber);
          });
        }
        if (converted.education) {
          converted.education.forEach(edu => {
            if (edu.pageNumber) allPageNumbers.add(edu.pageNumber);
          });
        }
        if (converted.skillsPageNumbers) {
          converted.skillsPageNumbers.forEach(pn => allPageNumbers.add(pn));
        }
        if (converted.languagesPageNumbers) {
          converted.languagesPageNumbers.forEach(pn => allPageNumbers.add(pn));
        }
        if (converted.achievementsPageNumbers) {
          converted.achievementsPageNumbers.forEach(pn => allPageNumbers.add(pn));
        }
        if (converted.certificationsPageNumbers) {
          converted.certificationsPageNumbers.forEach(pn => allPageNumbers.add(pn));
        }

        const calculatedTotalPages = Math.max(...Array.from(allPageNumbers), 1);
        setTotalPages(calculatedTotalPages);

        // Create paginated pages array
        const pages: TemplateDataFormat[] = [];
        for (let pageNum = 1; pageNum <= calculatedTotalPages; pageNum++) {
          pages.push(filterDataForPage(converted, pageNum));
        }
        setPaginatedPages(pages);
        
        // Extract only pagination fields to preserve existing data
        const paginationFields = extractPaginationFields(paginatedResumeData);
        
        // Update store with only pagination fields (preserves profession, targetLevel, etc.)
        updateResumeData(paginationFields);
        
        // Mark this template as calculated
        lastCalculatedTemplateRef.current = templateKey;
      } catch (error) {
        console.error('Error calculating pagination:', error);
        toast.error('Error al calcular la paginación del template');
        // Fallback: convert without pagination
        const resumeData = convertGeneratedResumeToResumeData(generatedResume);
        const converted = convertResumeDataToTemplateFormat(resumeData);
        setTemplateData(converted);
        setTotalPages(1);
        setPaginatedPages([converted]);
      } finally {
        setCalculatingPagination(false);
      }
    };

    calculatePaginationAndConvert();
  }, [selectedTemplate, generatedResume]);

  const handleBack = () => {
    navigate('/wizard/manual/step-10');
  };

  const handleRegenerateCV = async () => {
    // Navigate back to step 8 to regenerate
    navigate('/wizard/manual/step-8');
  };

  const handleEditCV = () => {
    startEditingResume();
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDownload = async () => {
    if (!templateContainerRef.current) {
      toast.error('Template no disponible para descargar');
      return;
    }

    if (!selectedTemplate) {
      toast.error('No hay template seleccionado');
      return;
    }

    setGeneratingPDF(true);
    try {
      // Capture the visible rendered template container
      const container = templateContainerRef.current;
      
      if (!container) {
        toast.error('No se pudo encontrar el contenedor del template');
        return;
      }

      // Wait for all content to be fully rendered
      // Scroll to top to ensure all pages are in viewport
      container.scrollTop = 0;
      
      // Wait for DOM to stabilize
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Verify all page containers are present
      const pageContainers = container.querySelectorAll('.a4-page-container');
      if (pageContainers.length === 0) {
        toast.error('No se encontraron páginas para generar el PDF');
        return;
      }

      // Wait for all WebComponentRenderer instances to finish loading
      // Poll for custom elements to be fully rendered
      const maxWaitTime = 5000; // 5 seconds max
      const pollInterval = 200; // Check every 200ms
      const startTime = Date.now();
      
      while (Date.now() - startTime < maxWaitTime) {
        const customElements = container.querySelectorAll(selectedTemplate.tagName);
        let allRendered = true;
        
        if (customElements.length === 0) {
          // No custom elements found yet, wait a bit more
          await new Promise(resolve => setTimeout(resolve, pollInterval));
          continue;
        }
        
        for (const element of customElements) {
          // Check if element has data property set (indicates it's rendered)
          // Also check if element has content (offsetHeight > 0)
          if (!(element as any).data || (element as HTMLElement).offsetHeight === 0) {
            allRendered = false;
            break;
          }
        }
        
        if (allRendered) {
          break; // All elements are rendered
        }
        
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
      
      // Final wait to ensure everything is stable
      await new Promise(resolve => setTimeout(resolve, 200));

      // Generate PDF filename
      const userName = user?.fullName?.replace(/\s+/g, '_') || 'Usuario';
      const templateName = selectedTemplate.name.replace(/\s+/g, '_');
      const fileName = `CV_${userName}_${templateName}.pdf`;

      // Generate PDF by capturing each page individually from visible container
      await generateResumePDFFromPages(container as HTMLElement, fileName);
      
      toast.success('PDF generado exitosamente');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error al generar el PDF');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi CV Profesional',
        text: 'Revisa mi CV generado con IA',
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.final.title')}
        </h2>
        <p className="text-gray-600">
          {generatedResume 
            ? t('wizard.steps.final.subtitle.generated')
            : t('wizard.steps.final.subtitle.generating')
          }
        </p>
      </div>

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.final.tips.title')}</h3>
          {areTipsClosed && (
            <TipsButton onClick={showTips} />
          )}
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title={`💡 ${t('wizard.steps.final.tips.title')}`}
            tips={t('wizard.steps.final.tips.items', { returnObjects: true }) as unknown as string[]}
            onClose={closeTips}
          />
        )}
      </div>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold text-green-900 text-lg">{t('wizard.steps.final.success.title')}</h3>
            <p className="text-green-700">{t('wizard.steps.final.success.subtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="text-green-800">
            <div className="font-semibold">{t('wizard.steps.final.success.badges.optimized.title')}</div>
            <div className="text-sm">{t('wizard.steps.final.success.badges.optimized.description')}</div>
          </div>
          <div className="text-green-800">
            <div className="font-semibold">{t('wizard.steps.final.success.badges.formatted.title')}</div>
            <div className="text-sm">{t('wizard.steps.final.success.badges.formatted.description')}</div>
          </div>
          <div className="text-green-800">
            <div className="font-semibold">{t('wizard.steps.final.success.badges.ready.title')}</div>
            <div className="text-sm">{t('wizard.steps.final.success.badges.ready.description')}</div>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {generatedResume ? t('wizard.steps.final.preview.generatedTitle') : t('wizard.steps.final.preview.viewTitle')}
            {selectedTemplate && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                - Template: {selectedTemplate.name}
              </span>
            )}
          </h3>
        </div>
        
        {loadingTemplate ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <p className="text-gray-600">Cargando template...</p>
          </div>
        ) : isGenerating ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('wizard.steps.final.preview.generatingTitle')}</h3>
            <p className="text-gray-600">{t('wizard.steps.final.preview.generatingSubtitle')}</p>
          </div>
        ) : calculatingPagination ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <p className="text-gray-600">Calculando paginación...</p>
          </div>
        ) : generatedResume && selectedTemplate && modifiedJsCode ? (
          <div className="flex justify-center">
            <div
              ref={templateContainerRef}
              className="bg-gray-50 rounded-lg overflow-auto"
              style={{
                maxWidth: '100%',
                maxHeight: '800px',
                padding: '20px',
              }}
            >
              <style>{`
                /* A4 page container styling */
                .a4-page-container {
                  width: ${A4_DIMENSIONS.widthPX}px;
                  min-height: ${A4_DIMENSIONS.heightPX}px;
                  height: auto;
                  background: white;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                  margin: 0 auto 20px auto;
                  padding-bottom: ${A4_DIMENSIONS.marginBottom}px;
                  padding-right: ${A4_DIMENSIONS.marginRight}px;
                  page-break-after: always;
                  break-after: page;
                  overflow: visible;
                  position: relative;
                }
                
                .a4-page-container:last-child {
                  margin-bottom: 0;
                }
                
                /* Force multi-page display for template preview */
                .template-preview-multi-page {
                  overflow: visible !important;
                }
                .template-preview-multi-page > * {
                  overflow: visible !important;
                }
              `}</style>
              {/* Render multiple A4 pages */}
              {paginatedPages.length > 0 ? (
                paginatedPages.map((pageData, pageIndex) => (
                  <div
                    key={`page-${pageIndex + 1}`}
                    className="a4-page-container"
                    data-page-number={pageIndex + 1}
                  >
                    <WebComponentRenderer
                      key={`step10-${selectedTemplate.id}-${selectedTemplate.tagName}-page-${pageIndex + 1}`}
                      tagName={selectedTemplate.tagName}
                      jsCode={modifiedJsCode}
                      data={pageData as any}
                      language="en"
                      className="template-preview-multi-page"
                      style={{ 
                        width: `${A4_DIMENSIONS.contentWidth}px`, 
                        minHeight: `${A4_DIMENSIONS.contentHeight}px`,
                        height: 'auto',
                        display: 'block',
                        overflow: 'visible',
                        position: 'relative',
                      }}
                    />
                  </div>
                ))
              ) : templateData ? (
                /* Fallback: single page if pagination not available */
                <div className="a4-page-container">
                  <WebComponentRenderer
                    key={`step10-${selectedTemplate.id}-${selectedTemplate.tagName}`}
                    tagName={selectedTemplate.tagName}
                    jsCode={modifiedJsCode}
                    data={templateData as any}
                    language="en"
                    className="template-preview-multi-page"
                    style={{ 
                      width: `${A4_DIMENSIONS.contentWidth}px`, 
                      minHeight: `${A4_DIMENSIONS.contentHeight}px`,
                      height: 'auto',
                      display: 'block',
                      overflow: 'visible',
                      position: 'relative',
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : generatedResume ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay template seleccionado</h3>
            <p className="text-gray-600 mb-4">Por favor, selecciona un template en el paso anterior</p>
            <button
              onClick={() => navigate('/wizard/manual/step-10')}
              className="btn-primary"
            >
              Volver a Seleccionar Template
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('wizard.steps.preview.ui.sections.empty.title')}</h3>
            <p className="text-gray-600">{t('wizard.steps.preview.ui.sections.empty.subtitle')}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Acciones Disponibles</h3>
          <p className="text-gray-600">Edita, descarga, comparte o regenera tu CV</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={handleEditCV}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            {t('wizard.steps.final.actions.edit')}
          </button>
          
          <button
            onClick={handleDownload}
            disabled={generatingPDF || !selectedTemplate || !generatedResume}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingPDF ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generando PDF...
              </>
            ) : (
              <>
            <Download className="w-5 h-5 mr-2" />
            {t('wizard.steps.final.actions.downloadPdf')}
              </>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 mr-2" />
            {t('wizard.steps.final.actions.share')}
          </button>
          
          <button
            onClick={handleRegenerateCV}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {t('wizard.steps.final.actions.regenerate')}
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{t('wizard.steps.final.nextSteps.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{t('wizard.steps.final.nextSteps.share.title')}</h4>
            <p className="text-gray-600 text-sm">{t('wizard.steps.final.nextSteps.share.description')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{t('wizard.steps.final.nextSteps.update.title')}</h4>
            <p className="text-gray-600 text-sm">{t('wizard.steps.final.nextSteps.update.description')}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('wizard.steps.final.nav.back')}
        </button>
        <button 
          onClick={() => navigate('/')} 
          className="btn-primary flex items-center"
        >
          {t('wizard.steps.final.nav.goHome')}
          <ArrowLeft className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Edit Modal */}
      <ResumeEditModal 
        isOpen={showEditModal} 
        onClose={handleCloseEditModal} 
      />
    </div>
  );
}
