import { ResumeData, SkillPageRange } from '@/types';
import { ResumeTemplate, TEMPLATE_META } from '@/services/templatesService';
import { A4_DIMENSIONS } from '@/utils/a4Dimensions';
import { extractTemplateMeta } from '@/utils/templateUtils';

// Interfaces matching Step9Preview
export interface PageContentSections {
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

export interface PageContent {
  pageNumber: number;
  sections: PageContentSections;
}

export interface PaginationInfo {
  totalPages: number;
  pages: PageContent[];
}

interface MeasuredElement {
  id: string;
  height: number;
  type: 'header' | 'summary' | 'experience' | 'project' | 'education' | 'certification' | 'language' | 'achievement' | 'skills';
  data: any;
}

/**
 * Calculates pagination for resume data based on template layout
 * Measures actual rendered elements to determine page distribution
 */
export async function calculatePagination(
  resumeData: ResumeData,
  template: ResumeTemplate
): Promise<PaginationInfo> {
  console.log('📄 [PAGINATION] Starting pagination calculation');
  console.log('📄 [PAGINATION] Template:', { id: template.id, name: template.name, tagName: template.tagName });
  console.log('📄 [PAGINATION] Resume data summary:', {
    experiences: resumeData.experience.length,
    projects: resumeData.projects.length,
    education: resumeData.education.length,
    certifications: resumeData.certifications.length,
    languages: resumeData.languages.length,
    achievements: resumeData.achievements.length,
    skills: resumeData.skillsRaw.length,
    hasSummary: !!resumeData.summary,
    hasHeader: !!(resumeData.firstName || resumeData.lastName),
  });

  // Extract template metadata
  const templateMeta = extractTemplateMeta(template.jsCode) || {
    id: template.id,
    name: template.name,
    tagName: template.tagName,
    layout: template.layout || 'single-column',
  };

  const layout = templateMeta.layout || 'single-column';
  console.log('📄 [PAGINATION] Template layout detected:', layout);
  console.log('📄 [PAGINATION] Template metadata:', templateMeta);

  let result: PaginationInfo;
  if (layout === 'two-column') {
    console.log('📄 [PAGINATION] Using two-column pagination algorithm');
    result = await calculateTwoColumnPagination(resumeData, template);
  } else {
    console.log('📄 [PAGINATION] Using single-column pagination algorithm');
    result = await calculateSingleColumnPagination(resumeData, template);
  }

  console.log('📄 [PAGINATION] Pagination calculation complete:', {
    totalPages: result.totalPages,
    pages: result.pages.map(p => ({
      pageNumber: p.pageNumber,
      sections: Object.keys(p.sections),
      experienceCount: p.sections.experience?.length || 0,
      projectCount: p.sections.projects?.length || 0,
      educationCount: p.sections.education?.length || 0,
      certificationCount: p.sections.certifications?.length || 0,
      languageCount: p.sections.languages?.length || 0,
      achievementCount: p.sections.achievements?.length || 0,
      hasHeader: !!p.sections.header,
      hasSummary: !!p.sections.summary,
      skillsRange: p.sections.skills,
      sidebarSkillsRange: p.sections.sidebar?.skills,
    })),
  });

  // Clean up measurement container after pagination is complete
  cleanupMeasurementContainer();

  return result;
}

// Canonical section order for reference and documentation
export const SECTION_ORDER = [
  'header',
  'skills',
  'summary',
  'experience',
  'projects',
  'achievements',
  'education',
  'certifications',
  'languages'
] as const;

/**
 * Calculate pagination for single-column layout
 */
async function calculateSingleColumnPagination(
  resumeData: ResumeData,
  template: ResumeTemplate
): Promise<PaginationInfo> {
  console.log('📄 [SINGLE-COLUMN] Starting single-column pagination');
  const pages: PageContent[] = [];
  let currentPage = 1;
  let currentPageHeight = 0;
  const maxPageHeight = A4_DIMENSIONS.contentHeight; // 1083px
  console.log('📄 [SINGLE-COLUMN] Max page height:', maxPageHeight, 'px');

  // Order for single-column: Header, Skills, Summary, Experience, Projects, Achievements, Education, Certifications, Languages
  const sections: Array<{ type: string; data: any; measure: () => Promise<number> }> = [];
  console.log('📄 [SINGLE-COLUMN] Building sections list...');

  // 1. Header section
  if (resumeData.firstName || resumeData.lastName) {
    sections.push({
      type: 'header',
      data: resumeData,
      measure: async () => await measureHeader(resumeData, template),
    });
  }

  // 2. Skills (as a group) - Moved up to match template render order
  if (resumeData.skillsRaw.length > 0) {
    sections.push({
      type: 'skills',
      data: resumeData.skillsRaw,
      measure: async () => await measureSkills(resumeData.skillsRaw, template),
    });
  }

  // 3. Summary section
  if (resumeData.summary) {
    sections.push({
      type: 'summary',
      data: resumeData.summary,
      measure: async () => await measureSummary(resumeData.summary, template),
    });
  }

  // 4. Experience items
  resumeData.experience.forEach((exp) => {
    sections.push({
      type: 'experience',
      data: exp,
      measure: async () => await measureExperienceItem(exp, template),
    });
  });

  // 5. Projects
  resumeData.projects.forEach((proj) => {
    sections.push({
      type: 'project',
      data: proj,
      measure: async () => await measureProjectItem(proj, template),
    });
  });

  // 6. Achievements - Moved up
  resumeData.achievements.forEach((ach) => {
    sections.push({
      type: 'achievement',
      data: ach,
      measure: async () => await measureAchievementItem(ach, template),
    });
  });

  // 7. Education - Moved down
  resumeData.education.forEach((edu) => {
    sections.push({
      type: 'education',
      data: edu,
      measure: async () => await measureEducationItem(edu, template),
    });
  });

  // 8. Certifications
  resumeData.certifications.forEach((cert) => {
    sections.push({
      type: 'certification',
      data: cert,
      measure: async () => await measureCertificationItem(cert, template),
    });
  });

  // 9. Languages (always last section)
  resumeData.languages.forEach((lang) => {
    sections.push({
      type: 'language',
      data: lang,
      measure: async () => await measureLanguageItem(lang, template),
    });
  });

  // Process each section
  let currentPageSections: PageContentSections = {};
  console.log('📄 [SINGLE-COLUMN] Processing', sections.length, 'sections');

  // Sections that can be split across pages (must complete before next section starts)
  const splittableSections = ['skills'];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const isSplittable = splittableSections.includes(section.type);
    console.log(`📄 [SINGLE-COLUMN] Processing section ${i + 1}/${sections.length}:`, section.type, section.data.id || section.data.name || 'N/A', isSplittable ? '(splittable)' : '(atomic)');
    
    // For splittable sections, process incrementally without checking full height first
    if (isSplittable) {
      if (section.type === 'skills') {
        // Skills need special handling for pagination ranges
        console.log(`📄 [SINGLE-COLUMN] Processing skills (${section.data.length} total)`);
        const totalSkills = section.data.length;
        let skillIndex = 0;

        // Process skills incrementally until all are placed
        // CRITICAL: This while loop must complete ALL skills before we exit and process the next section
        while (skillIndex < totalSkills) {
          // Check if we need a new page before starting skills on this page
          if (currentPageHeight > 0 && currentPageHeight >= maxPageHeight) {
            console.log(`📄 [SINGLE-COLUMN] Page ${currentPage} is full, starting new page for remaining skills`);
            pages.push({
              pageNumber: currentPage,
              sections: { ...currentPageSections },
            });
            currentPage++;
            currentPageHeight = 0;
            // Start new page with skills continuation - clear other sections to ensure skills continue uninterrupted
            currentPageSections = {};
          }

          // Calculate how many skills fit on current page
          const remainingHeight = maxPageHeight - currentPageHeight;
          if (remainingHeight <= 0) {
            // Page is completely full, need new page
            pages.push({
              pageNumber: currentPage,
              sections: { ...currentPageSections },
            });
            currentPage++;
            currentPageHeight = 0;
            currentPageSections = {};
            continue; // Retry on new page
          }

          const estimatedSkillHeight = 30; // Estimate 30px per skill
          const skillsThatFit = Math.max(1, Math.floor(remainingHeight / estimatedSkillHeight));
          const endIndex = Math.min(skillIndex + skillsThatFit, totalSkills);

          // Measure actual height of skills that fit
          const skillsToMeasure = section.data.slice(skillIndex, endIndex);
          let actualHeight = await measureSkills(skillsToMeasure, template);
          
          // If the measured skills don't fit, reduce the count or move to new page
          let finalEndIndex = endIndex;
          if (currentPageHeight + actualHeight > maxPageHeight) {
            if (skillIndex === 0 && endIndex === 1) {
              // Even a single skill doesn't fit - this shouldn't happen, but handle it
              console.warn(`📄 [SINGLE-COLUMN] Warning: Single skill doesn't fit on page, forcing it anyway`);
            } else if (endIndex > skillIndex + 1) {
              // Try with fewer skills
              finalEndIndex = Math.max(skillIndex + 1, endIndex - 1);
              const reducedSkills = section.data.slice(skillIndex, finalEndIndex);
              const reducedHeight = await measureSkills(reducedSkills, template);
              if (currentPageHeight + reducedHeight <= maxPageHeight) {
                actualHeight = reducedHeight;
              } else {
                // Need new page for these skills
                if (currentPageHeight > 0) {
                  pages.push({
                    pageNumber: currentPage,
                    sections: { ...currentPageSections },
                  });
                  currentPage++;
                  currentPageHeight = 0;
                  currentPageSections = {};
                }
                // Remeasure on new page
                actualHeight = await measureSkills(reducedSkills, template);
              }
            } else {
              // Only one skill, need new page
              if (currentPageHeight > 0) {
                pages.push({
                  pageNumber: currentPage,
                  sections: { ...currentPageSections },
                });
                currentPage++;
                currentPageHeight = 0;
                currentPageSections = {};
              }
              // Remeasure on new page
              actualHeight = await measureSkills(skillsToMeasure, template);
            }
          }

          // Add skills range to current page
          // If this is a continuation on a new page, start a new range
          if (!currentPageSections.skills || currentPageSections.skills.endIndex !== skillIndex) {
            currentPageSections.skills = { startIndex: skillIndex, endIndex: finalEndIndex };
            console.log(`📄 [SINGLE-COLUMN] Added skills range [${skillIndex}-${finalEndIndex}] to page ${currentPage}`);
          } else {
            // Extend existing range on same page
            currentPageSections.skills.endIndex = finalEndIndex;
            console.log(`📄 [SINGLE-COLUMN] Extended skills range to [${currentPageSections.skills.startIndex}-${finalEndIndex}] on page ${currentPage}`);
          }

          currentPageHeight += actualHeight;
          skillIndex = finalEndIndex;
          
          // If there are more skills, continue on next iteration
          if (skillIndex < totalSkills) {
            console.log(`📄 [SINGLE-COLUMN] ${totalSkills - skillIndex} skills remaining, will continue on next iteration`);
          }
        }
        console.log(`📄 [SINGLE-COLUMN] Completed skills section. All ${totalSkills} skills placed across pages.`);
      }
    } else {
      // For non-splittable sections, use the original logic
      const height = await section.measure();
      console.log(`📄 [SINGLE-COLUMN] Section height: ${height}px, Current page height: ${currentPageHeight}px, Available: ${maxPageHeight - currentPageHeight}px`);

      // If section doesn't fit on current page, start new page
      if (currentPageHeight > 0 && currentPageHeight + height > maxPageHeight) {
        console.log(`📄 [SINGLE-COLUMN] Section doesn't fit! Starting new page. Current page ${currentPage} will have ${currentPageHeight}px`);
        // Save current page
        pages.push({
          pageNumber: currentPage,
          sections: { ...currentPageSections },
        });
        console.log(`📄 [SINGLE-COLUMN] Saved page ${currentPage} with sections:`, Object.keys(currentPageSections));

        // Start new page
        currentPage++;
        currentPageHeight = 0;
        currentPageSections = {};
        console.log(`📄 [SINGLE-COLUMN] Started new page ${currentPage}`);
      }

      // Add section to current page
      currentPageHeight += height;
      console.log(`📄 [SINGLE-COLUMN] Added section to page ${currentPage}. New page height: ${currentPageHeight}px`);

      switch (section.type) {
        case 'header':
          currentPageSections.header = true;
          console.log(`📄 [SINGLE-COLUMN] Added header to page ${currentPage}`);
          break;
        case 'summary':
          currentPageSections.summary = true;
          console.log(`📄 [SINGLE-COLUMN] Added summary to page ${currentPage}`);
          break;
        case 'experience':
          if (!currentPageSections.experience) {
            currentPageSections.experience = [];
          }
          currentPageSections.experience.push(section.data.id);
          console.log(`📄 [SINGLE-COLUMN] Added experience "${section.data.title}" (${section.data.id}) to page ${currentPage}`);
          break;
        case 'project':
          if (!currentPageSections.projects) {
            currentPageSections.projects = [];
          }
          currentPageSections.projects.push(section.data.id);
          console.log(`📄 [SINGLE-COLUMN] Added project "${section.data.name}" (${section.data.id}) to page ${currentPage}`);
          break;
        case 'education':
          if (!currentPageSections.education) {
            currentPageSections.education = [];
          }
          currentPageSections.education.push(section.data.id);
          console.log(`📄 [SINGLE-COLUMN] Added education "${section.data.degree}" (${section.data.id}) to page ${currentPage}`);
          break;
        case 'language':
          if (!currentPageSections.languages) {
            currentPageSections.languages = [];
          }
          currentPageSections.languages.push(section.data.id);
          console.log(`📄 [SINGLE-COLUMN] Added language "${section.data.name}" (${section.data.id}) to page ${currentPage}`);
          break;
        case 'achievement':
          if (!currentPageSections.achievements) {
            currentPageSections.achievements = [];
          }
          currentPageSections.achievements.push(section.data.id);
          console.log(`📄 [SINGLE-COLUMN] Added achievement "${section.data.title}" (${section.data.id}) to page ${currentPage}`);
          break;
        case 'certification':
          if (!currentPageSections.certifications) {
            currentPageSections.certifications = [];
          }
          currentPageSections.certifications.push(section.data.id);
          console.log(`📄 [SINGLE-COLUMN] Added certification "${section.data.name}" (${section.data.id}) to page ${currentPage}`);
          break;
      }
    }
  }

  // Add last page if it has content
  if (Object.keys(currentPageSections).length > 0) {
    pages.push({
      pageNumber: currentPage,
      sections: currentPageSections,
    });
    console.log(`📄 [SINGLE-COLUMN] Added final page ${currentPage} with sections:`, Object.keys(currentPageSections));
  }

  // Ensure at least one page
  if (pages.length === 0) {
    pages.push({
      pageNumber: 1,
      sections: {},
    });
    console.log('📄 [SINGLE-COLUMN] No content found, created empty page 1');
  }

  console.log(`📄 [SINGLE-COLUMN] Pagination complete: ${pages.length} total pages`);
  return {
    totalPages: pages.length,
    pages,
  };
}

/**
 * Calculate pagination for two-column layout
 */
async function calculateTwoColumnPagination(
  resumeData: ResumeData,
  template: ResumeTemplate
): Promise<PaginationInfo> {
  console.log('📄 [TWO-COLUMN] Starting two-column pagination');
  // Two-column layout:
  // Left: Skills, Education, Certifications, Languages
  // Right: Header, Summary, Experience, Projects, Achievements

  const pages: PageContent[] = [];
  let currentPage = 1;
  const maxPageHeight = A4_DIMENSIONS.contentHeight;
  console.log('📄 [TWO-COLUMN] Max page height:', maxPageHeight, 'px');

  // Measure left column sections
  const leftSections: Array<{ type: string; data: any; measure: () => Promise<number> }> = [];
  
  if (resumeData.skillsRaw.length > 0) {
    leftSections.push({
      type: 'skills',
      data: resumeData.skillsRaw,
      measure: async () => await measureSkills(resumeData.skillsRaw, template, true),
    });
  }

  resumeData.education.forEach((edu) => {
    leftSections.push({
      type: 'education',
      data: edu,
      measure: async () => await measureEducationItem(edu, template, true),
    });
  });

  resumeData.certifications.forEach((cert) => {
    leftSections.push({
      type: 'certification',
      data: cert,
      measure: async () => await measureCertificationItem(cert, template, true),
    });
  });

  // Languages always last in sidebar
  resumeData.languages.forEach((lang) => {
    leftSections.push({
      type: 'language',
      data: lang,
      measure: async () => await measureLanguageItem(lang, template, true),
    });
  });

  // Measure right column sections
  const rightSections: Array<{ type: string; data: any; measure: () => Promise<number> }> = [];

  if (resumeData.firstName || resumeData.lastName) {
    rightSections.push({
      type: 'header',
      data: resumeData,
      measure: async () => await measureHeader(resumeData, template),
    });
  }

  if (resumeData.summary) {
    rightSections.push({
      type: 'summary',
      data: resumeData.summary,
      measure: async () => await measureSummary(resumeData.summary, template),
    });
  }

  resumeData.experience.forEach((exp) => {
    rightSections.push({
      type: 'experience',
      data: exp,
      measure: async () => await measureExperienceItem(exp, template),
    });
  });

  resumeData.projects.forEach((proj) => {
    rightSections.push({
      type: 'project',
      data: proj,
      measure: async () => await measureProjectItem(proj, template),
    });
  });

  resumeData.achievements.forEach((ach) => {
    rightSections.push({
      type: 'achievement',
      data: ach,
      measure: async () => await measureAchievementItem(ach, template),
    });
  });

  // Distribute content across pages
  let leftHeight = 0;
  let rightHeight = 0;
  let currentPageSections: PageContentSections = { sidebar: {} };
  console.log('📄 [TWO-COLUMN] Left column sections:', leftSections.length);
  console.log('📄 [TWO-COLUMN] Right column sections:', rightSections.length);

  // Process sections, balancing left and right columns
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftSections.length || rightIndex < rightSections.length) {
    const maxColumnHeight = maxPageHeight;
    console.log(`📄 [TWO-COLUMN] Processing page ${currentPage} - Left index: ${leftIndex}/${leftSections.length}, Right index: ${rightIndex}/${rightSections.length}`);

    // Add left column sections
    while (leftIndex < leftSections.length) {
      const section = leftSections[leftIndex];
      const height = await section.measure();
      console.log(`📄 [TWO-COLUMN] Left section ${leftIndex + 1}: ${section.type}, height: ${height}px, current left height: ${leftHeight}px`);

      if (leftHeight + height > maxColumnHeight && leftHeight > 0) {
        console.log(`📄 [TWO-COLUMN] Left section doesn't fit! Breaking to new page`);
        break; // Need new page
      }

      leftHeight += height;
      console.log(`📄 [TWO-COLUMN] Added left section. New left height: ${leftHeight}px`);

      switch (section.type) {
        case 'skills':
          if (!currentPageSections.sidebar!.skills) {
            currentPageSections.sidebar!.skills = { startIndex: 0, endIndex: section.data.length };
            console.log(`📄 [TWO-COLUMN] Added skills [0-${section.data.length}] to sidebar on page ${currentPage}`);
          }
          break;
        case 'language':
          if (!currentPageSections.sidebar!.languages) {
            currentPageSections.sidebar!.languages = [];
          }
          currentPageSections.sidebar!.languages.push(section.data.id);
          console.log(`📄 [TWO-COLUMN] Added language "${section.data.name}" to sidebar on page ${currentPage}`);
          break;
        case 'education':
          if (!currentPageSections.sidebar!.education) {
            currentPageSections.sidebar!.education = [];
          }
          currentPageSections.sidebar!.education.push(section.data.id);
          console.log(`📄 [TWO-COLUMN] Added education "${section.data.degree}" to sidebar on page ${currentPage}`);
          break;
      }

      leftIndex++;
    }

    // Add right column sections
    while (rightIndex < rightSections.length) {
      const section = rightSections[rightIndex];
      const height = await section.measure();
      console.log(`📄 [TWO-COLUMN] Right section ${rightIndex + 1}: ${section.type}, height: ${height}px, current right height: ${rightHeight}px`);

      if (rightHeight + height > maxColumnHeight && rightHeight > 0) {
        console.log(`📄 [TWO-COLUMN] Right section doesn't fit! Breaking to new page`);
        break; // Need new page
      }

      rightHeight += height;
      console.log(`📄 [TWO-COLUMN] Added right section. New right height: ${rightHeight}px`);

      switch (section.type) {
        case 'header':
          currentPageSections.header = true;
          console.log(`📄 [TWO-COLUMN] Added header to page ${currentPage}`);
          break;
        case 'summary':
          currentPageSections.summary = true;
          console.log(`📄 [TWO-COLUMN] Added summary to page ${currentPage}`);
          break;
        case 'experience':
          if (!currentPageSections.experience) {
            currentPageSections.experience = [];
          }
          currentPageSections.experience.push(section.data.id);
          console.log(`📄 [TWO-COLUMN] Added experience "${section.data.title}" to page ${currentPage}`);
          break;
        case 'project':
          if (!currentPageSections.projects) {
            currentPageSections.projects = [];
          }
          currentPageSections.projects.push(section.data.id);
          console.log(`📄 [TWO-COLUMN] Added project "${section.data.name}" to page ${currentPage}`);
          break;
        case 'achievement':
          if (!currentPageSections.achievements) {
            currentPageSections.achievements = [];
          }
          currentPageSections.achievements.push(section.data.id);
          console.log(`📄 [TWO-COLUMN] Added achievement "${section.data.title}" to page ${currentPage}`);
          break;
      }

      rightIndex++;
    }

    // If we've filled a page or can't add more, save page and start new one
    const pageFull = leftHeight >= maxColumnHeight || rightHeight >= maxColumnHeight;
    const allSectionsProcessed = leftIndex >= leftSections.length && rightIndex >= rightSections.length;
    
    console.log(`📄 [TWO-COLUMN] Page ${currentPage} status - Left: ${leftHeight}px, Right: ${rightHeight}px, Full: ${pageFull}, All processed: ${allSectionsProcessed}`);
    
    if (pageFull || allSectionsProcessed) {
      pages.push({
        pageNumber: currentPage,
        sections: { ...currentPageSections },
      });
      console.log(`📄 [TWO-COLUMN] Saved page ${currentPage} with sections:`, {
        main: Object.keys(currentPageSections).filter(k => k !== 'sidebar'),
        sidebar: Object.keys(currentPageSections.sidebar || {}),
      });

      currentPage++;
      leftHeight = 0;
      rightHeight = 0;
      currentPageSections = { sidebar: {} };
      console.log(`📄 [TWO-COLUMN] Started new page ${currentPage}`);
    }
  }

  // Add last page if it has content
  const hasMainContent = Object.keys(currentPageSections).filter(k => k !== 'sidebar').length > 0;
  const hasSidebarContent = currentPageSections.sidebar && Object.keys(currentPageSections.sidebar).length > 0;
  
  if (hasMainContent || hasSidebarContent) {
    pages.push({
      pageNumber: currentPage,
      sections: currentPageSections,
    });
    console.log(`📄 [TWO-COLUMN] Added final page ${currentPage} with content`);
  }

  // Ensure at least one page
  if (pages.length === 0) {
    pages.push({
      pageNumber: 1,
      sections: {},
    });
    console.log('📄 [TWO-COLUMN] No content found, created empty page 1');
  }

  console.log(`📄 [TWO-COLUMN] Pagination complete: ${pages.length} total pages`);
  return {
    totalPages: pages.length,
    pages,
  };
}

// Measurement functions - these render elements temporarily to measure their height

// Singleton measurement container to avoid repeated DOM creation/destruction
let measurementContainer: HTMLDivElement | null = null;

/**
 * Creates or returns an existing hidden measurement container for accurate DOM-based height calculations.
 * The container mimics template styling for skills rendering.
 */
function getOrCreateMeasurementContainer(): HTMLDivElement {
  if (measurementContainer && document.body.contains(measurementContainer)) {
    return measurementContainer;
  }

  measurementContainer = document.createElement('div');
  measurementContainer.id = 'pagination-measurement-container';
  measurementContainer.style.cssText = `
    position: absolute;
    top: -9999px;
    left: -9999px;
    visibility: hidden;
    pointer-events: none;
    z-index: -1;
  `;

  // Add styles for skills measurement
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    #pagination-measurement-container .skills-measure-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    #pagination-measurement-container .skills-measure-container.main-column {
      width: ${A4_DIMENSIONS.contentWidth}px; /* 754px */
    }
    #pagination-measurement-container .skills-measure-container.sidebar-column {
      width: 200px; /* Typical sidebar width */
    }
    #pagination-measurement-container .skill-measure-badge {
      padding: 4px 12px;
      background: #f0f0f0;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.4;
      white-space: nowrap;
      box-sizing: border-box;
    }
  `;

  measurementContainer.appendChild(styleElement);
  document.body.appendChild(measurementContainer);

  return measurementContainer;
}

/**
 * Cleans up the measurement container from DOM
 */
function cleanupMeasurementContainer(): void {
  if (measurementContainer && document.body.contains(measurementContainer)) {
    document.body.removeChild(measurementContainer);
    measurementContainer = null;
  }
}

async function measureHeader(resumeData: ResumeData, template: ResumeTemplate): Promise<number> {
  // Estimate: header is typically 80-120px
  const height = 100;
  console.log(`  📏 [MEASURE] Header: ${height}px (estimated)`);
  return height;
}

async function measureSummary(summary: string, template: ResumeTemplate): Promise<number> {
  // Estimate based on text length: ~20px per line, ~50 chars per line
  const lines = Math.ceil(summary.length / 50);
  const height = lines * 20 + 40; // 40px for margins/padding
  console.log(`  📏 [MEASURE] Summary: ${height}px (${lines} lines, ${summary.length} chars, estimated)`);
  return height;
}

async function measureExperienceItem(exp: any, template: ResumeTemplate): Promise<number> {
  // Estimate: title + company + dates = 60px, each achievement/responsibility = 25px
  const baseHeight = 60;
  const achievementsCount = exp.achievements?.length || 0;
  const responsibilitiesCount = exp.responsibilities?.length || 0;
  const itemsHeight = achievementsCount * 25 + responsibilitiesCount * 25;
  const height = baseHeight + itemsHeight + 20; // 20px margin
  console.log(`  📏 [MEASURE] Experience "${exp.title}": ${height}px (base: ${baseHeight}px, items: ${itemsHeight}px, ${achievementsCount} achievements, ${responsibilitiesCount} responsibilities, estimated)`);
  return height;
}

async function measureProjectItem(proj: any, template: ResumeTemplate): Promise<number> {
  // Estimate: name + description + tech = 80px base
  const descriptionLines = Math.ceil((proj.description?.length || 0) / 60);
  const height = 80 + descriptionLines * 20 + 20;
  console.log(`  📏 [MEASURE] Project "${proj.name}": ${height}px (${descriptionLines} description lines, ${proj.description?.length || 0} chars, estimated)`);
  return height;
}

async function measureEducationItem(edu: any, template: ResumeTemplate, isSidebar: boolean = false): Promise<number> {
  // Estimate: degree + institution + dates = 60px
  const height = isSidebar ? 50 : 60;
  console.log(`  📏 [MEASURE] Education "${edu.degree}" (${isSidebar ? 'sidebar' : 'main'}): ${height}px (estimated)`);
  return height;
}

async function measureLanguageItem(lang: any, template: ResumeTemplate, isSidebar: boolean = false): Promise<number> {
  // Estimate: language name + level = 30px
  const height = 30;
  console.log(`  📏 [MEASURE] Language "${lang.name}" (${isSidebar ? 'sidebar' : 'main'}): ${height}px (estimated)`);
  return height;
}

async function measureAchievementItem(ach: any, template: ResumeTemplate): Promise<number> {
  // Estimate: title + description = 50px base
  const descriptionLines = Math.ceil((ach.description?.length || 0) / 60);
  const height = 50 + descriptionLines * 20 + 10;
  console.log(`  📏 [MEASURE] Achievement "${ach.title}": ${height}px (${descriptionLines} description lines, ${ach.description?.length || 0} chars, estimated)`);
  return height;
}

async function measureCertificationItem(cert: any, template: ResumeTemplate, isSidebar: boolean = false): Promise<number> {
  // Estimate: name + issuer + date = 50px
  const height = isSidebar ? 45 : 50;
  console.log(`  📏 [MEASURE] Certification "${cert.name}" (${isSidebar ? 'sidebar' : 'main'}): ${height}px (estimated)`);
  return height;
}

async function measureSkills(skills: string[], template: ResumeTemplate, isSidebar: boolean = false): Promise<number> {
  // Handle empty skills array
  if (!skills || skills.length === 0) {
    console.log(`  📏 [MEASURE] Skills: 0px (no skills)`);
    return 0;
  }

  try {
    // Get or create the measurement container
    const container = getOrCreateMeasurementContainer();

    // Create a wrapper div for this measurement
    const measureWrapper = document.createElement('div');
    measureWrapper.className = `skills-measure-container ${isSidebar ? 'sidebar-column' : 'main-column'}`;

    // Render skills as badges
    skills.forEach(skill => {
      const badge = document.createElement('span');
      badge.className = 'skill-measure-badge';
      badge.textContent = skill;
      measureWrapper.appendChild(badge);
    });

    // Add to measurement container
    container.appendChild(measureWrapper);

    // Force layout calculation
    void measureWrapper.offsetHeight;

    // Measure actual rendered height
    const skillsHeight = measureWrapper.offsetHeight;

    // Add section overhead (section title + margins)
    const sectionOverhead = 50; // Section header + top/bottom margins
    const totalHeight = skillsHeight + sectionOverhead;

    // Clean up this specific measurement
    container.removeChild(measureWrapper);

    console.log(`  📏 [MEASURE] Skills (${skills.length} total, ${isSidebar ? 'sidebar' : 'main'}): ${totalHeight}px (skills: ${skillsHeight}px + overhead: ${sectionOverhead}px, DOM measured)`);
    return totalHeight;
  } catch (error) {
    // Fallback to estimation if DOM measurement fails
    console.warn('  📏 [MEASURE] Skills: DOM measurement failed, falling back to estimation', error);
    const skillsPerRow = isSidebar ? 2 : 6; // More realistic fallback estimate
    const rows = Math.ceil(skills.length / skillsPerRow);
    const height = rows * 35 + 50; // 35px per row, 50px section overhead
    console.log(`  📏 [MEASURE] Skills (${skills.length} total, ${isSidebar ? 'sidebar' : 'main'}): ${height}px (${rows} rows, ${skillsPerRow} per row, estimated fallback)`);
    return height;
  }
}

