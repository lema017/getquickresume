import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useAuthStore } from '@/stores/authStore';
import { ResumeTemplate } from '@/services/templatesService';
import { TEMPLATE_CATALOG, loadLocalTemplate, getTemplateThumbnailUrl } from '@/utils/templateCatalog';
import { TemplatePreviewModal } from './TemplatePreviewModal';

import { PremiumDownloadModal } from '@/components/PremiumDownloadModal';
import { WebComponentRenderer } from './WebComponentRenderer';
import { ArrowLeft, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { convertGeneratedResumeToResumeData } from './TemplatePreviewModal';
import { A4_DIMENSIONS } from '@/utils/a4Dimensions';
import { ResumeData, SkillPageRange } from '@/types';
import { calculatePagination } from '@/services/paginationService';
import { filterResumeDataForPage } from '@/utils/resumePageFilter';
import { generateResumePDFFromPages } from '@/utils/pdfGenerator';
import { downloadService } from '@/services/downloadService';
import { trackResumeDownloadCompleted } from '@/services/marketingAnalytics';

// Helper interface for PaginationInfo (matching templates/client structure)
interface PageContentSections {
  header?: boolean;
  summary?: boolean;
  experience?: string[];
  education?: string[];
  projects?: string[];
  certifications?: string[];
  achievements?: string[];
  skills?: { startIndex: number; endIndex: number; pageNumber?: number };
  languages?: string[];
  sidebar?: {
    skills?: { startIndex: number; endIndex: number; pageNumber?: number };
    education?: string[];
    languages?: string[];
    contact?: boolean;
  };
}

interface PageContent {
  pageNumber: number;
  sections: PageContentSections;
}

interface PaginationInfo {
  totalPages: number;
  pages: PageContent[];
}

/**
 * Extracts only pagination-related fields from a paginated ResumeData object
 * This preserves all existing data in the store and only updates pagination fields
 */
export function extractPaginationFields(paginatedData: ResumeData): Partial<ResumeData> {
  return {
    // All page number fields
    firstNamePageNumber: paginatedData.firstNamePageNumber,
    lastNamePageNumber: paginatedData.lastNamePageNumber,
    countryPageNumber: paginatedData.countryPageNumber,
    linkedinPageNumber: paginatedData.linkedinPageNumber,
    languagePageNumber: paginatedData.languagePageNumber,
    targetLevelPageNumber: paginatedData.targetLevelPageNumber,
    professionPageNumber: paginatedData.professionPageNumber,
    tonePageNumber: paginatedData.tonePageNumber,
    phonePageNumber: paginatedData.phonePageNumber,
    emailPageNumber: paginatedData.emailPageNumber,
    summaryPageNumber: paginatedData.summaryPageNumber,
    jobDescriptionPageNumber: paginatedData.jobDescriptionPageNumber,
    skillsPagination: paginatedData.skillsPagination,
    // Arrays with updated pageNumber properties
    experience: paginatedData.experience,
    education: paginatedData.education,
    projects: paginatedData.projects,
    languages: paginatedData.languages,
    achievements: paginatedData.achievements,
    certifications: paginatedData.certifications,
  };
}

/**
 * Calculates and assigns page numbers to resumeData based on PaginationInfo
 * This function takes the result from calculatePagination and updates resumeData
 * with the appropriate pageNumber for each field and element
 */
export function calculateAndAssignPageNumbers(
  resumeData: ResumeData,
  pagination: PaginationInfo
): ResumeData {
  const updatedData = { ...resumeData };

  // Initialize all page numbers to null first
  updatedData.firstNamePageNumber = null;
  updatedData.lastNamePageNumber = null;
  updatedData.countryPageNumber = null;
  updatedData.linkedinPageNumber = null;
  updatedData.languagePageNumber = null;
  updatedData.targetLevelPageNumber = null;
  updatedData.professionPageNumber = null;
  updatedData.tonePageNumber = null;
  updatedData.phonePageNumber = null;
  updatedData.emailPageNumber = null;
  updatedData.summaryPageNumber = null;
  updatedData.jobDescriptionPageNumber = null;
  updatedData.skillsPagination = null;

  // Process each page
  for (const page of pagination.pages) {
    const pageNum = page.pageNumber;

    // Assign page numbers for header fields (usually page 1)
    if (page.sections.header) {
      updatedData.firstNamePageNumber = pageNum;
      updatedData.lastNamePageNumber = pageNum;
      updatedData.countryPageNumber = pageNum;
      updatedData.linkedinPageNumber = pageNum;
      updatedData.languagePageNumber = pageNum;
      updatedData.targetLevelPageNumber = pageNum;
      updatedData.professionPageNumber = pageNum;
      updatedData.tonePageNumber = pageNum;
      updatedData.phonePageNumber = pageNum;
      updatedData.emailPageNumber = pageNum;
    }

    // Assign page number for summary
    if (page.sections.summary) {
      updatedData.summaryPageNumber = pageNum;
    }

    // Assign page numbers for experience items
    if (page.sections.experience && page.sections.experience.length > 0) {
      page.sections.experience.forEach((expId) => {
        const exp = updatedData.experience.find((e) => e.id === expId);
        if (exp) {
          exp.pageNumber = pageNum;
        }
      });
    }

    // Assign page numbers for education items
    if (page.sections.education && page.sections.education.length > 0) {
      page.sections.education.forEach((eduId) => {
        const edu = updatedData.education.find((e) => e.id === eduId);
        if (edu) {
          edu.pageNumber = pageNum;
        }
      });
    }

    // Assign page numbers for certification items
    if (page.sections.certifications && page.sections.certifications.length > 0) {
      page.sections.certifications.forEach((certId) => {
        const cert = updatedData.certifications.find((c) => c.id === certId);
        if (cert) {
          cert.pageNumber = pageNum;
        }
      });
    }

    // Assign page numbers for project items
    if (page.sections.projects && page.sections.projects.length > 0) {
      page.sections.projects.forEach((projId) => {
        const proj = updatedData.projects.find((p) => p.id === projId);
        if (proj) {
          proj.pageNumber = pageNum;
        }
      });
    }

    // Assign page numbers for language items
    if (page.sections.languages && page.sections.languages.length > 0) {
      page.sections.languages.forEach((langId) => {
        const lang = updatedData.languages.find((l) => l.id === langId);
        if (lang) {
          lang.pageNumber = pageNum;
        }
      });
    }

    // Assign page numbers for achievement items
    if (page.sections.achievements && page.sections.achievements.length > 0) {
      page.sections.achievements.forEach((achId) => {
        const ach = updatedData.achievements.find((a) => a.id === achId);
        if (ach) {
          ach.pageNumber = pageNum;
        }
      });
    }

    // Process skills pagination
    if (page.sections.skills) {
      const skillsRange: SkillPageRange = {
        startIndex: page.sections.skills.startIndex,
        endIndex: page.sections.skills.endIndex,
        pageNumber: pageNum,
      };

      if (!updatedData.skillsPagination) {
        updatedData.skillsPagination = [];
      }
      updatedData.skillsPagination.push(skillsRange);
    }

    // Process sidebar languages if present (two-column layouts)
    if (page.sections.sidebar?.languages && page.sections.sidebar.languages.length > 0) {
      page.sections.sidebar.languages.forEach((langId) => {
        const lang = updatedData.languages.find((l) => l.id === langId);
        if (lang) {
          lang.pageNumber = pageNum;
        }
      });
    }

    // Process sidebar education if present (two-column layouts)
    if (page.sections.sidebar?.education && page.sections.sidebar.education.length > 0) {
      page.sections.sidebar.education.forEach((eduId) => {
        const edu = updatedData.education.find((e) => e.id === eduId);
        if (edu) {
          edu.pageNumber = pageNum;
        }
      });
    }

    // Process sidebar skills if present
    if (page.sections.sidebar?.skills) {
      const sidebarSkillsRange: SkillPageRange = {
        startIndex: page.sections.sidebar.skills.startIndex,
        endIndex: page.sections.sidebar.skills.endIndex,
        pageNumber: pageNum,
      };

      if (!updatedData.skillsPagination) {
        updatedData.skillsPagination = [];
      }
      // Check if this range already exists (avoid duplicates)
      const exists = updatedData.skillsPagination.some(
        (r) => r.startIndex === sidebarSkillsRange.startIndex && r.endIndex === sidebarSkillsRange.endIndex
      );
      if (!exists) {
        updatedData.skillsPagination.push(sidebarSkillsRange);
      }
    }
  }

  // Sort skillsPagination by pageNumber and startIndex
  if (updatedData.skillsPagination) {
    updatedData.skillsPagination.sort((a, b) => {
      if (a.pageNumber !== b.pageNumber) {
        return a.pageNumber - b.pageNumber;
      }
      return a.startIndex - b.startIndex;
    });
  }

  return updatedData;
}

export function Step9Preview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { navigateToStep } = useWizardNavigation();
  const { generatedResume, markStepCompleted, setCurrentStep, selectedTemplateId, setSelectedTemplate, resumeData: storeResumeData, updateResumeData, currentResumeId } = useResumeStore();
  const { user } = useAuthStore();

  const [selectedTemplate, setSelectedTemplateState] = useState<ResumeTemplate | null>(null);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDownloadPremiumModal, setShowDownloadPremiumModal] = useState(false);
  const [calculatingPagination, setCalculatingPagination] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [templateData, setTemplateData] = useState<ResumeData | null>(null);
  const [paginatedPages, setPaginatedPages] = useState<ResumeData[]>([]);
  const templateContainerRef = useRef<HTMLDivElement>(null);

  // Validate that generatedResume exists
  useEffect(() => {
    if (!generatedResume) {
      toast.error(t('wizard.errors.generateFirst'));
      navigateToStep(9);
    }
  }, [generatedResume, navigateToStep]);

  const handleSelectTemplate = async (templateId: string) => {
    const meta = TEMPLATE_CATALOG.find((t) => t.id === templateId);
    if (!meta) return;

    setSelectedTemplate(meta.id, meta.category);
    setLoadingTemplate(true);

    let template: ResumeTemplate | null = null;
    try {
      const loaded = await loadLocalTemplate(meta.id);
      if (loaded) {
        template = { ...loaded, layout: 'single-column' };
      }
    } catch {
      toast.error(t('wizard.errors.errorLoadingTemplates'));
      setLoadingTemplate(false);
      return;
    }
    setLoadingTemplate(false);
    if (!template) return;
    setSelectedTemplateState(template);
    
    // Calculate pagination when template is selected
    if (generatedResume) {
      console.log('🔍 [DEBUG] Starting pagination calculation for template:', template.name);
      setCalculatingPagination(true);
      try {
        let resumeData: ResumeData;
        if (storeResumeData && storeResumeData.firstName && storeResumeData.experience?.length > 0) {
          resumeData = storeResumeData;
        } else {
          resumeData = convertGeneratedResumeToResumeData(generatedResume);
          if (storeResumeData) {
            if (storeResumeData.profession) resumeData.profession = storeResumeData.profession;
            if (storeResumeData.targetLevel) resumeData.targetLevel = storeResumeData.targetLevel;
            if (storeResumeData.linkedin) resumeData.linkedin = storeResumeData.linkedin;
            if (storeResumeData.jobDescription) resumeData.jobDescription = storeResumeData.jobDescription;
            if (storeResumeData.totalCharacters) resumeData.totalCharacters = storeResumeData.totalCharacters;
          }
        }

        const pagination = await calculatePagination(resumeData, template);
        const paginatedResumeData = calculateAndAssignPageNumbers(resumeData, pagination);

        const paginationFields = extractPaginationFields(paginatedResumeData);
        updateResumeData(paginationFields);

        setTemplateData(paginatedResumeData);

        const pages: ResumeData[] = [];
        for (let pageNum = 1; pageNum <= pagination.totalPages; pageNum++) {
          pages.push(filterResumeDataForPage(paginatedResumeData, pageNum));
        }
        setPaginatedPages(pages);
      } catch (error) {
        console.error('Error calculating pagination:', error);
        toast.error(t('wizard.errors.errorCalculatingPagination'));
      } finally {
        setCalculatingPagination(false);
      }
    } else {
      console.log('🔍 [DEBUG] No generatedResume available, skipping pagination');
    }
  };

  const handlePreviewTemplate = async (templateId: string) => {
    setLoadingTemplate(true);
    try {
      const loaded = await loadLocalTemplate(templateId);
      if (loaded) {
        setSelectedTemplateState({ ...loaded, layout: 'single-column' });
        setShowModal(true);
      }
    } catch {
      toast.error(t('wizard.errors.errorLoadingTemplates'));
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    navigateToStep(9);
  };

  const handleNext = () => {
    if (!selectedTemplateId) {
      toast.error(t('wizard.steps.preview.selectTemplateFirst') || 'Please select a template first');
      return;
    }
    markStepCompleted(10);
    setCurrentStep(11);
    navigateToStep(11);
  };

  const handleDownload = async () => {
    if (!selectedTemplateId || !selectedTemplate) {
      toast.error(t('wizard.errors.selectTemplateFirst'));
      return;
    }
    
    if (!templateContainerRef.current) {
      toast.error(t('wizard.errors.templateUnavailable'));
      return;
    }

    // Check download limits before generating PDF
    if (currentResumeId) {
      try {
        const downloadResult = await downloadService.trackDownload(currentResumeId);
        
        if (!downloadResult.allowed) {
          setShowDownloadPremiumModal(true);
          return;
        }
      } catch (error) {
        console.error('Error checking download limits:', error);
        if (error instanceof Error) {
          if (error.message.includes('Unauthorized')) {
            toast.error('Please log in again');
            navigate('/login');
            return;
          }
          if (error.message.includes('not found')) {
            toast.error('Resume not found');
            return;
          }
        }
        toast.error('Error checking download limits. Please try again.');
        return;
      }
    }

    setGeneratingPDF(true);
    try {
      const container = templateContainerRef.current;
      
      // Wait for all content to be fully rendered
      container.scrollTop = 0;
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Verify all page containers are present
      const pageContainers = container.querySelectorAll('.a4-page-container');
      if (pageContainers.length === 0) {
        toast.error(t('wizard.errors.noPagesFound'));
        return;
      }

      // Wait for all WebComponentRenderer instances to finish loading
      const maxWaitTime = 5000;
      const pollInterval = 200;
      const startTime = Date.now();
      
      while (Date.now() - startTime < maxWaitTime) {
        const customElements = container.querySelectorAll(selectedTemplate.tagName);
        let allRendered = true;
        
        if (customElements.length === 0) {
          await new Promise(resolve => setTimeout(resolve, pollInterval));
          continue;
        }
        
        for (const element of customElements) {
          if (!(element as any).data || (element as HTMLElement).offsetHeight === 0) {
            allRendered = false;
            break;
          }
        }
        
        if (allRendered) {
          break;
        }
        
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));

      // Generate PDF filename
      const userName = user?.fullName?.replace(/\s+/g, '_') || 'Usuario';
      const templateName = selectedTemplate.name.replace(/\s+/g, '_');
      const fileName = `CV_${userName}_${templateName}.pdf`;

      // Generate PDF
      await generateResumePDFFromPages(container as HTMLElement, fileName);
      
      // Track successful download completion
      trackResumeDownloadCompleted(currentResumeId || undefined, selectedTemplate?.id);
      
      // Mark step as completed after successful download
      markStepCompleted(10);
      
      toast.success(t('wizard.errors.pdfGeneratedSuccess'));
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(t('wizard.errors.pdfGenerationError'));
    } finally {
      setGeneratingPDF(false);
    }
  };

  if (!generatedResume) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600 mb-4">{t('wizard.errors.generateFirst')}</p>
        <button onClick={() => navigateToStep(8)} className="btn-primary">
          {t('wizard.errors.goToGenerate')}
        </button>
      </div>
    );
  }

  // Use paginated resumeData from store if available, otherwise convert from generatedResume
  const resumeData = storeResumeData.firstNamePageNumber !== null 
    ? storeResumeData 
    : convertGeneratedResumeToResumeData(generatedResume);

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Selecciona un diseño para tu CV
        </h2>
        <p className="text-gray-600">
          Previsualiza tu CV generado con IA en cada diseño
        </p>
      </div>

      {/* Loading State */}
      {(loadingTemplate || calculatingPagination) && (
        <div className="py-16 text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">
            {loadingTemplate ? 'Cargando template...' : 'Calculando paginación...'}
          </p>
        </div>
      )}

      {/* Templates Grid — thumbnail-based */}
      {!loadingTemplate && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {TEMPLATE_CATALOG.map((meta) => {
            const isSelected = meta.id === selectedTemplateId;
            return (
              <div
                key={meta.id}
                className={`border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow cursor-pointer ${
                  isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => handleSelectTemplate(meta.id)}
              >
                <div className="flex items-center justify-between mb-3">
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
                    onClick={(e) => { e.stopPropagation(); handlePreviewTemplate(meta.id); }}
                    className="flex-1 btn-outline text-sm py-2 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {t('common.preview')}
                  </button>
                  {isSelected && (
                    <div className="flex items-center text-blue-600 text-sm px-2">
                      <span className="font-medium">Seleccionado</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden Template Container for PDF Generation */}
      {selectedTemplate && paginatedPages.length > 0 && (
        <div
          ref={templateContainerRef}
          className="absolute left-[-9999px] top-0"
          style={{ width: `${A4_DIMENSIONS.widthPX}px` }}
        >
          <style>{`
            .a4-page-container {
              width: ${A4_DIMENSIONS.widthPX}px;
              min-height: ${A4_DIMENSIONS.heightPX}px;
              height: auto;
              background: white;
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
          `}</style>
          {paginatedPages.map((pageData, pageIndex) => (
            <div
              key={`page-${pageIndex + 1}`}
              className="a4-page-container"
              data-page-number={pageIndex + 1}
            >
              <WebComponentRenderer
                key={`step10-${selectedTemplate.id}-${selectedTemplate.tagName}-page-${pageIndex + 1}`}
                tagName={selectedTemplate.tagName}
                jsCode={selectedTemplate.jsCode}
                data={pageData as any}
                language={(storeResumeData?.language as 'en' | 'es') || 'en'}
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
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button 
          onClick={handleNext} 
          className="btn-primary flex items-center" 
          disabled={!selectedTemplateId || calculatingPagination}
        >
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && generatedResume && (
        <TemplatePreviewModal
          template={selectedTemplate}
          generatedResume={generatedResume}
          isOpen={showModal}
          onClose={handleCloseModal}
          onSelect={() => {
            // Template selection is handled inside the modal
            // It will navigate to Step 10 automatically
          }}
        />
      )}

      {/* Premium Download Modal for download limits */}
      <PremiumDownloadModal
        isOpen={showDownloadPremiumModal}
        onClose={() => setShowDownloadPremiumModal(false)}
      />

    </div>
  );
}


