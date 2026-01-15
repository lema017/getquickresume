import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ResumeTemplate } from '@/services/templatesService';
import { GeneratedResume, ResumeData } from '@/types';
import { WebComponentRenderer } from './WebComponentRenderer';
import { A4_DIMENSIONS, calculateA4PreviewScale } from '@/utils/a4Dimensions';
import toast from 'react-hot-toast';
import { convertResumeDataToTemplateFormat, filterDataForPage, TemplateDataFormat } from '@/utils/resumeDataToTemplateFormat';
import { calculatePagination } from '@/services/paginationService';
import { calculateAndAssignPageNumbers, extractPaginationFields } from './Step9Preview';
import { useResumeStore } from '@/stores/resumeStore';

interface TemplatePreviewModalProps {
  template: ResumeTemplate;
  generatedResume: GeneratedResume;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: () => void; // Optional callback when user selects template
}

/**
 * Converts GeneratedResume to ResumeData format for Web Components
 */
export function convertGeneratedResumeToResumeData(generatedResume: GeneratedResume): ResumeData {
  // Extract name from fullName
  const nameParts = generatedResume.contactInfo.fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Convert experience
  const experience = generatedResume.experience.map((exp, index) => {
    // Parse duration to extract dates (format: "2020 - 2023" or "Jan 2020 - Present")
    const durationParts = exp.duration.split(' - ');
    const startDate = durationParts[0]?.trim() || '';
    const endDate = durationParts[1]?.trim() || '';
    const isCurrent = endDate.toLowerCase() === 'present' || endDate.toLowerCase() === 'actual';

    return {
      id: `exp-${index}`,
      title: exp.title,
      company: exp.company,
      startDate: startDate,
      endDate: isCurrent ? undefined : endDate,
      isCurrent: isCurrent,
      achievements: exp.achievements || [],
      responsibilities: exp.impact || [],
      pageNumber: null,
    };
  });

  // Convert education
  const education = generatedResume.education.map((edu, index) => {
    const durationParts = edu.duration.split(' - ');
    const startDate = durationParts[0]?.trim() || '';
    const endDate = durationParts[1]?.trim() || '';

    return {
      id: `edu-${index}`,
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: startDate,
      endDate: endDate,
      isCompleted: true,
      gpa: edu.gpa,
      pageNumber: null,
    };
  });

  // Convert certifications
  const certifications = generatedResume.certifications.map((cert, index) => ({
    id: `cert-${index}`,
    name: cert.name,
    issuer: cert.issuer,
    date: cert.date,
    credentialId: cert.credentialId,
    url: cert.url,
    pageNumber: null,
  }));

  // Convert projects
  const projects = generatedResume.projects.map((proj, index) => {
    const durationParts = proj.duration.split(' - ');
    const startDate = durationParts[0]?.trim() || '';
    const endDate = durationParts[1]?.trim() || '';

    return {
      id: `proj-${index}`,
      name: proj.name,
      description: proj.description,
      technologies: proj.technologies || [],
      url: proj.url,
      startDate: startDate,
      endDate: endDate,
      isOngoing: endDate.toLowerCase() === 'ongoing' || endDate.toLowerCase() === 'present',
      pageNumber: null,
    };
  });

  // Convert languages
  const languages = generatedResume.languages.map((lang, index) => ({
    id: `lang-${index}`,
    name: lang.language,
    level: (lang.level.toLowerCase() as 'basic' | 'intermediate' | 'advanced' | 'native') || 'intermediate',
    pageNumber: null,
  }));

  // Combine all skills
  const skillsRaw = [
    ...generatedResume.skills.technical,
    ...generatedResume.skills.soft,
    ...generatedResume.skills.tools,
  ];

  // Extract location parts
  const locationParts = generatedResume.contactInfo.location?.split(', ') || [];
  const country = locationParts[locationParts.length - 1] || '';

  return {
    firstName,
    lastName,
    email: generatedResume.contactInfo.email,
    phone: generatedResume.contactInfo.phone,
    country,
    linkedin: generatedResume.contactInfo.linkedin || '',
    language: 'en', // Default to English, can be adjusted
    targetLevel: 'mid', // Default, can be adjusted
    profession: '', // Not directly available in GeneratedResume
    tone: 'professional',
    summary: generatedResume.professionalSummary,
    jobDescription: '',
    skillsRaw,
    experience,
    education,
    certifications,
    projects,
    languages,
    achievements: generatedResume.achievements.map((ach, index) => ({
      id: `ach-${index}`,
      title: ach,
      description: '',
      year: new Date().getFullYear().toString(),
      pageNumber: null,
    })),
    completedSteps: [1, 2, 3, 4, 5, 6, 7, 8],
    currentStep: 8,
    totalCharacters: 0,
    lastSaved: new Date(),
    // Pagination fields - all default to null, calculated in step 9
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
}

export function TemplatePreviewModal({
  template,
  generatedResume,
  isOpen,
  onClose,
  onSelect,
}: TemplatePreviewModalProps) {
  const { setSelectedTemplate, updateResumeData, resumeData: storeResumeData } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const templateWrapperRef = useRef<HTMLDivElement>(null);
  const lastCalculatedTemplateRef = useRef<string | null>(null);
  const [scale, setScale] = useState(0.7);
  const [modifiedJsCode, setModifiedJsCode] = useState(template.jsCode);
  const [calculatingPagination, setCalculatingPagination] = useState(false);
  const [templateData, setTemplateData] = useState<TemplateDataFormat | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedPages, setPaginatedPages] = useState<TemplateDataFormat[]>([]);

  // Set template JS code (templates now include multi-page CSS built-in)
  useEffect(() => {
    if (!template.jsCode) return;

    setModifiedJsCode(template.jsCode);
  }, [template.jsCode]);

  // Calculate scale based on container width
  useEffect(() => {
    if (!isOpen) return;
    
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 48; // Subtract padding (24px * 2)
        const calculatedScale = calculateA4PreviewScale(containerWidth, 10000);
        setScale(calculatedScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isOpen]);

  // Create visual page breaks by injecting CSS into Shadow DOM
  useEffect(() => {
    if (!isOpen || !templateWrapperRef.current) return;

    const createPageBreaks = () => {
      const wrapper = templateWrapperRef.current;
      if (!wrapper) return;

      // Find the custom element inside the wrapper
      const customElement = wrapper.querySelector(template.tagName) as HTMLElement;
      if (!customElement) return;

      // Get the shadow root
      const shadowRoot = customElement.shadowRoot;
      if (!shadowRoot) return;

      // Get the actual content height
      const contentHeight = customElement.offsetHeight;
      const pageHeight = A4_DIMENSIONS.heightPX;

      // Add visual page separators using CSS injected into shadow DOM
      const pageBreakStyle = document.createElement('style');
      pageBreakStyle.textContent = `
        /* Visual page separators every ${pageHeight}px */
        :host::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent calc(${pageHeight}px - 3px),
            #d1d5db calc(${pageHeight}px - 3px),
            #d1d5db calc(${pageHeight}px - 1px),
            transparent calc(${pageHeight}px - 1px),
            transparent ${pageHeight}px
          );
          background-size: 100% ${pageHeight}px;
          z-index: 9999;
        }
      `;
      
      // Remove old style if exists
      const oldStyle = shadowRoot.querySelector('style[data-page-breaks]');
      if (oldStyle) oldStyle.remove();
      
      pageBreakStyle.setAttribute('data-page-breaks', 'true');
      shadowRoot.appendChild(pageBreakStyle);
    };

    // Wait for template to render, then create page breaks
    const timeoutId = setTimeout(createPageBreaks, 500);
    
    // Also try after a longer delay to ensure content is fully rendered
    const timeoutId2 = setTimeout(createPageBreaks, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [isOpen, template.tagName, modifiedJsCode, generatedResume]);

  // Calculate pagination and convert data when modal opens
  useEffect(() => {
    if (!isOpen || !generatedResume) {
      // Reset ref when modal closes
      if (!isOpen) {
        lastCalculatedTemplateRef.current = null;
      }
      return;
    }

    // Check if we've already calculated pagination for this template
    const templateKey = `${template.id}-${generatedResume.contactInfo.fullName}`;
    if (lastCalculatedTemplateRef.current === templateKey) {
      // Already calculated for this template, skip
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
        const pagination = await calculatePagination(resumeData, template);
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
  }, [isOpen, generatedResume, template, updateResumeData]);

  // Fallback: convert data without pagination if calculation fails
  useEffect(() => {
    if (!isOpen || templateData || !generatedResume) return;
    
    const resumeData = convertGeneratedResumeToResumeData(generatedResume);
    const converted = convertResumeDataToTemplateFormat(resumeData);
    setTemplateData(converted);
  }, [isOpen, generatedResume, templateData]);

  const handleSelectTemplate = () => {
    // Set selected template in store
    setSelectedTemplate(template.id, template.category);
    
    // Call optional callback (parent Step9Preview will handle template selection)
    if (onSelect) {
      onSelect();
    }
    
    // Close modal - user stays on step 10 which now has download functionality
    onClose();
  };

  if (!isOpen) return null;

  const language = (storeResumeData?.language as 'en' | 'es') || 'en'; // Use user's selected language

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const scaledWidth = A4_DIMENSIONS.widthPX * scale;
  const scaledHeight = A4_DIMENSIONS.heightPX * scale;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-[95vw] max-h-[95vh] w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex-1">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
              {template.name}
            </h2>
            {template.description && (
              <p className="text-gray-600 mt-1">{template.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
          >
            Cerrar
          </button>
          <button
            onClick={handleSelectTemplate}
            disabled={calculatingPagination || !templateData}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {calculatingPagination ? 'Calculando...' : 'Seleccionar Template'}
          </button>
        </div>

        {/* Content - Scrollable with multi-page support */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-auto p-6 bg-gray-50"
        >
          {calculatingPagination ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Calculando paginación...</p>
              </div>
            </div>
          ) : (
            /* Preview View - Multiple A4 Pages */
            <>
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
              overflow: hidden;
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
          <div className="max-w-5xl mx-auto">
            <div 
              className="bg-gray-50 rounded-lg"
              style={{
                width: `${scaledWidth}px`,
                margin: '0 auto',
                padding: '20px',
                overflow: 'visible',
              }}
            >
              <div
                style={{
                  width: `${A4_DIMENSIONS.widthPX}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  margin: '0 auto',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Render multiple A4 pages */}
                {paginatedPages.length > 0 ? (
                  paginatedPages.map((pageData, pageIndex) => (
                    <div
                      key={`page-${pageIndex + 1}`}
                      className="a4-page-container"
                      data-page-number={pageIndex + 1}
                    >
                      <WebComponentRenderer
                        key={`modal-${template.id}-${template.tagName}-page-${pageIndex + 1}`}
                        tagName={template.tagName}
                        jsCode={modifiedJsCode}
                        data={pageData as any}
                        language={language}
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
                      key={`modal-${template.id}-${template.tagName}`}
                      tagName={template.tagName}
                      jsCode={modifiedJsCode}
                      data={templateData as any}
                      language={language}
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
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

