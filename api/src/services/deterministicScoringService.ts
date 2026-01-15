/**
 * Deterministic Resume Scoring Service
 * 
 * Provides consistent, reproducible resume evaluation using:
 * 1. Predefined checklists with finite criteria per section
 * 2. Programmatic verification functions (no AI randomness)
 * 3. Clear completion states (pass/fail per item)
 * 
 * This replaces the AI-only scoring which produced different suggestions each run.
 */

import { GeneratedResume, ResumeData } from '../types';
import {
  // Summary verifiers
  verifySummaryHasAdequateLength,
  verifySummaryNoFirstPerson,
  verifySummaryHasMetrics,
  verifySummaryHasATSKeywords,
  verifyATSKeywordDensity,
  KeywordAnalysisData,
  // Experience verifiers
  verifyExperienceHasMetrics,
  verifyExperienceHasActionVerbs,
  verifyExperienceHasAchievements,
  verifyExperienceShowsProgression,
  // Skills verifiers
  verifySkillsOrganized,
  verifyHasTechnicalSkills,
  verifyHasSoftSkills,
  verifyHasTools,
  // Education verifiers
  verifyEducationHasDates,
  verifyEducationHasInstitution,
  verifyEducationHasDegreeField,
  // Projects verifiers
  verifyProjectsHaveDescriptions,
  verifyProjectsHaveTechnologies,
  verifyProjectsHaveImpact,
  // Achievements verifiers
  verifyAchievementsHaveMetrics,
  verifyAchievementsAreQuantifiable,
  // Languages verifiers
  verifyLanguagesHaveLevels,
  // Contact verifiers
  verifyContactHasLinkedIn,
  verifyContactHasProfessionalEmail,
  verifyContactHasPhone,
  VerificationResult,
  // Data quality verifiers (AI-powered)
  verifyEducationDataQuality,
  verifyExperienceDataQuality,
  verifySkillsDataQuality,
  verifyProfileDataQuality,
  verifyCertificationsDataQuality,
  verifyLanguagesDataQuality,
  verifyOverallDataQuality,
  ContentValidationContext
} from '../utils/resumeVerifiers';
import { ContentValidationResult } from './contentValidatorService';

// ============================================================================
// Types for Deterministic Scoring
// ============================================================================

export type ChecklistItemPriority = 'required' | 'recommended' | 'optional';

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  isCompleted: boolean;
  completedAt?: string;
  priority: ChecklistItemPriority;
  verifierId: string;  // Reference to verification function
  details?: string;    // Explanation from verification
  evidence?: string;   // Supporting evidence from content
}

export interface SectionChecklist {
  section: string;
  displayName: string;
  items: ChecklistItem[];
  completedCount: number;
  totalCount: number;
  requiredCount: number;
  requiredCompletedCount: number;
  maxPoints: number;
  earnedPoints: number;
}

export interface EnhancementRecord {
  id: string;
  checklistItemId: string;
  section: string;
  enhancedAt: string;
  previousValue?: string;
  newValue?: string;
}

export interface DeterministicScore {
  totalScore: number;  // 0-10 scale (sum of earned points)
  maxPossibleScore: number;  // 10.0
  completionPercentage: number;  // 0-100%
  isOptimized: boolean;  // True when all required items complete
  checklist: Record<string, SectionChecklist>;
  enhancementHistory: EnhancementRecord[];
  strengths: string[];  // Auto-generated from completed items
  improvements: string[];  // Auto-generated from incomplete items
  generatedAt: string;
  scoringVersion: string;
}

// ============================================================================
// Checklist Definitions
// ============================================================================

interface ChecklistDefinition {
  id: string;
  label: string;
  description: string;
  priority: ChecklistItemPriority;
  verifierId: string;
  pointValue: number;
}

const SUMMARY_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'summary-length',
    label: 'Adequate Length',
    description: 'Summary has at least 3 sentences with substantial content',
    priority: 'required',
    verifierId: 'verifySummaryHasAdequateLength',
    pointValue: 0.5,
  },
  {
    id: 'summary-no-first-person',
    label: 'Professional Tone',
    description: 'Avoids first-person pronouns (I, my, me) for ATS compatibility',
    priority: 'required',
    verifierId: 'verifySummaryNoFirstPerson',
    pointValue: 0.5,
  },
  {
    id: 'summary-metrics',
    label: 'Contains Metrics',
    description: 'Includes quantifiable results (percentages, numbers, outcomes)',
    priority: 'recommended',
    verifierId: 'verifySummaryHasMetrics',
    pointValue: 0.5,
  },
  {
    id: 'summary-ats-keywords',
    label: 'ATS Keywords',
    description: 'Contains action verbs and professional keywords for ATS systems',
    priority: 'recommended',
    verifierId: 'verifySummaryHasATSKeywords',
    pointValue: 0.5,
  },
];

// ATS section with AI-powered keyword density check
const ATS_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'ats-keyword-density',
    label: 'ATS Keyword Density',
    description: 'Resume contains relevant keywords for your profession (analyzed by AI)',
    priority: 'required',
    verifierId: 'verifyATSKeywordDensity',
    pointValue: 1.0,
  },
];

const EXPERIENCE_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'experience-metrics',
    label: 'Quantifiable Achievements',
    description: 'Experience entries include metrics and measurable results',
    priority: 'required',
    verifierId: 'verifyExperienceHasMetrics',
    pointValue: 0.75,
  },
  {
    id: 'experience-action-verbs',
    label: 'Strong Action Verbs',
    description: 'Uses action verbs like led, developed, achieved, implemented',
    priority: 'required',
    verifierId: 'verifyExperienceHasActionVerbs',
    pointValue: 0.5,
  },
  {
    id: 'experience-achievements',
    label: 'Achievements Listed',
    description: 'Each role has specific achievements, not just responsibilities',
    priority: 'required',
    verifierId: 'verifyExperienceHasAchievements',
    pointValue: 0.75,
  },
  {
    id: 'experience-progression',
    label: 'Career Progression',
    description: 'Shows career growth and increasing responsibility over time',
    priority: 'optional',
    verifierId: 'verifyExperienceShowsProgression',
    pointValue: 0.5,
  },
];

const SKILLS_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'skills-organized',
    label: 'Organized Categories',
    description: 'Skills are organized into clear categories (technical, soft, tools)',
    priority: 'recommended',
    verifierId: 'verifySkillsOrganized',
    pointValue: 0.4,
  },
  {
    id: 'skills-technical',
    label: 'Technical Skills',
    description: 'Has at least 3 technical/hard skills listed',
    priority: 'required',
    verifierId: 'verifyHasTechnicalSkills',
    pointValue: 0.4,
  },
  {
    id: 'skills-soft',
    label: 'Soft Skills',
    description: 'Includes relevant soft skills (communication, leadership, etc.)',
    priority: 'recommended',
    verifierId: 'verifyHasSoftSkills',
    pointValue: 0.35,
  },
  {
    id: 'skills-tools',
    label: 'Tools & Technologies',
    description: 'Lists relevant tools and technologies used',
    priority: 'recommended',
    verifierId: 'verifyHasTools',
    pointValue: 0.35,
  },
];

const EDUCATION_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'education-dates',
    label: 'Complete Dates',
    description: 'Education entries have start and end dates',
    priority: 'recommended',
    verifierId: 'verifyEducationHasDates',
    pointValue: 0.3,
  },
  {
    id: 'education-institution',
    label: 'Institution Listed',
    description: 'Each entry has the institution/school name',
    priority: 'required',
    verifierId: 'verifyEducationHasInstitution',
    pointValue: 0.35,
  },
  {
    id: 'education-degree-field',
    label: 'Degree & Field',
    description: 'Includes both degree type and field of study',
    priority: 'required',
    verifierId: 'verifyEducationHasDegreeField',
    pointValue: 0.35,
  },
];

const PROJECTS_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'projects-descriptions',
    label: 'Project Descriptions',
    description: 'Each project has a meaningful description',
    priority: 'recommended',
    verifierId: 'verifyProjectsHaveDescriptions',
    pointValue: 0.35,
  },
  {
    id: 'projects-technologies',
    label: 'Technologies Listed',
    description: 'Projects specify technologies and tools used',
    priority: 'recommended',
    verifierId: 'verifyProjectsHaveTechnologies',
    pointValue: 0.35,
  },
  {
    id: 'projects-impact',
    label: 'Measurable Impact',
    description: 'At least one project shows measurable results or impact',
    priority: 'optional',
    verifierId: 'verifyProjectsHaveImpact',
    pointValue: 0.3,
  },
];

const ACHIEVEMENTS_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'achievements-metrics',
    label: 'Specific Metrics',
    description: 'Achievements include specific numbers or metrics',
    priority: 'recommended',
    verifierId: 'verifyAchievementsHaveMetrics',
    pointValue: 0.5,
  },
  {
    id: 'achievements-quantifiable',
    label: 'Quantifiable Results',
    description: 'Achievements are quantifiable and verifiable',
    priority: 'recommended',
    verifierId: 'verifyAchievementsAreQuantifiable',
    pointValue: 0.5,
  },
];

const LANGUAGES_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'languages-levels',
    label: 'Proficiency Levels',
    description: 'All languages have proficiency levels stated',
    priority: 'recommended',
    verifierId: 'verifyLanguagesHaveLevels',
    pointValue: 0.5,
  },
];

const CONTACT_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'contact-linkedin',
    label: 'LinkedIn Profile',
    description: 'LinkedIn profile URL is included',
    priority: 'recommended',
    verifierId: 'verifyContactHasLinkedIn',
    pointValue: 0.2,
  },
  {
    id: 'contact-email',
    label: 'Professional Email',
    description: 'Email address is professional format',
    priority: 'required',
    verifierId: 'verifyContactHasProfessionalEmail',
    pointValue: 0.15,
  },
  {
    id: 'contact-phone',
    label: 'Phone Number',
    description: 'Phone number is provided for contact',
    priority: 'recommended',
    verifierId: 'verifyContactHasPhone',
    pointValue: 0.15,
  },
];

// Data Quality section (AI-powered content validation)
const DATA_QUALITY_CHECKLIST: ChecklistDefinition[] = [
  {
    id: 'data-quality-overall',
    label: 'Content Authenticity',
    description: 'Resume contains meaningful, authentic data (not placeholder/test values)',
    priority: 'required',
    verifierId: 'verifyOverallDataQuality',
    pointValue: 0.5,
  },
  {
    id: 'data-quality-education',
    label: 'Valid Education Data',
    description: 'Education entries have real institution names, valid degrees, and actual fields of study',
    priority: 'required',
    verifierId: 'verifyEducationDataQuality',
    pointValue: 0.3,
  },
  {
    id: 'data-quality-experience',
    label: 'Valid Experience Data',
    description: 'Work experience has real company names and meaningful job titles',
    priority: 'required',
    verifierId: 'verifyExperienceDataQuality',
    pointValue: 0.3,
  },
  {
    id: 'data-quality-skills',
    label: 'Valid Skills Data',
    description: 'Skills section contains actual, recognizable skills (not placeholder values)',
    priority: 'required',
    verifierId: 'verifySkillsDataQuality',
    pointValue: 0.2,
  },
  {
    id: 'data-quality-profile',
    label: 'Valid Profile Data',
    description: 'Contact info contains realistic name and valid contact details',
    priority: 'required',
    verifierId: 'verifyProfileDataQuality',
    pointValue: 0.2,
  },
];

// Map verifier IDs to actual functions
const VERIFIER_MAP: Record<string, (data: any, context?: any) => VerificationResult> = {
  verifySummaryHasAdequateLength: (data) => verifySummaryHasAdequateLength(data.summary),
  verifySummaryNoFirstPerson: (data) => verifySummaryNoFirstPerson(data.summary),
  verifySummaryHasMetrics: (data) => verifySummaryHasMetrics(data.summary),
  verifySummaryHasATSKeywords: (data, ctx) => verifySummaryHasATSKeywords(data.summary, ctx?.profession || ''),
  verifyATSKeywordDensity: (data, ctx) => verifyATSKeywordDensity(ctx?.keywordAnalysis || null),
  verifyExperienceHasMetrics: (data) => verifyExperienceHasMetrics(data.experience),
  verifyExperienceHasActionVerbs: (data) => verifyExperienceHasActionVerbs(data.experience),
  verifyExperienceHasAchievements: (data) => verifyExperienceHasAchievements(data.experience),
  verifyExperienceShowsProgression: (data) => verifyExperienceShowsProgression(data.experience),
  verifySkillsOrganized: (data) => verifySkillsOrganized(data.skills),
  verifyHasTechnicalSkills: (data) => verifyHasTechnicalSkills(data.skills),
  verifyHasSoftSkills: (data) => verifyHasSoftSkills(data.skills),
  verifyHasTools: (data) => verifyHasTools(data.skills),
  verifyEducationHasDates: (data) => verifyEducationHasDates(data.education),
  verifyEducationHasInstitution: (data) => verifyEducationHasInstitution(data.education),
  verifyEducationHasDegreeField: (data) => verifyEducationHasDegreeField(data.education),
  verifyProjectsHaveDescriptions: (data) => verifyProjectsHaveDescriptions(data.projects),
  verifyProjectsHaveTechnologies: (data) => verifyProjectsHaveTechnologies(data.projects),
  verifyProjectsHaveImpact: (data) => verifyProjectsHaveImpact(data.projects),
  verifyAchievementsHaveMetrics: (data) => verifyAchievementsHaveMetrics(data.achievements),
  verifyAchievementsAreQuantifiable: (data) => verifyAchievementsAreQuantifiable(data.achievements),
  verifyLanguagesHaveLevels: (data) => verifyLanguagesHaveLevels(data.languages),
  verifyContactHasLinkedIn: (data) => verifyContactHasLinkedIn(data.contactInfo),
  verifyContactHasProfessionalEmail: (data) => verifyContactHasProfessionalEmail(data.contactInfo),
  verifyContactHasPhone: (data) => verifyContactHasPhone(data.contactInfo),
  // Data quality verifiers (AI-powered content validation)
  verifyOverallDataQuality: (data, ctx) => verifyOverallDataQuality(data, ctx as ContentValidationContext),
  verifyEducationDataQuality: (data, ctx) => verifyEducationDataQuality(data.education, ctx as ContentValidationContext),
  verifyExperienceDataQuality: (data, ctx) => verifyExperienceDataQuality(data.experience, ctx as ContentValidationContext),
  verifySkillsDataQuality: (data, ctx) => verifySkillsDataQuality(data.skills, ctx as ContentValidationContext),
  verifyProfileDataQuality: (data, ctx) => verifyProfileDataQuality(data.contactInfo, ctx as ContentValidationContext),
  verifyCertificationsDataQuality: (data, ctx) => verifyCertificationsDataQuality(data.certifications, ctx as ContentValidationContext),
  verifyLanguagesDataQuality: (data, ctx) => verifyLanguagesDataQuality(data.languages, ctx as ContentValidationContext),
};

// ============================================================================
// Scoring Service
// ============================================================================

class DeterministicScoringService {
  private readonly SCORING_VERSION = '2.1.0';

  /**
   * Score a resume using deterministic checklist evaluation
   * @param generatedResume - The generated resume to score
   * @param resumeData - Optional resume input data for context
   * @param keywordAnalysis - Optional pre-analyzed keyword data from AI
   * @param contentValidation - Optional AI-powered content validation results
   */
  scoreResume(
    generatedResume: GeneratedResume,
    resumeData?: ResumeData,
    keywordAnalysis?: KeywordAnalysisData | null,
    contentValidation?: ContentValidationResult | null
  ): DeterministicScore {
    const now = new Date().toISOString();
    const context: ContentValidationContext & { profession: string; keywordAnalysis: KeywordAnalysisData | null } = {
      profession: resumeData?.profession || '',
      keywordAnalysis: keywordAnalysis || null,
      contentValidation: contentValidation ? {
        overall: contentValidation.overall,
        sections: contentValidation.sections
      } : undefined,
    };

    // Prepare data for verifiers
    const verifierData = {
      summary: generatedResume.professionalSummary,
      experience: generatedResume.experience,
      skills: generatedResume.skills,
      education: generatedResume.education,
      projects: generatedResume.projects,
      achievements: generatedResume.achievements,
      languages: generatedResume.languages,
      contactInfo: generatedResume.contactInfo,
    };

    // Evaluate each section
    const summaryChecklist = this.evaluateSection('summary', 'Professional Summary', SUMMARY_CHECKLIST, verifierData, context);
    const experienceChecklist = this.evaluateSection('experience', 'Work Experience', EXPERIENCE_CHECKLIST, verifierData, context);
    const skillsChecklist = this.evaluateSection('skills', 'Skills', SKILLS_CHECKLIST, verifierData, context);
    const educationChecklist = this.evaluateSection('education', 'Education', EDUCATION_CHECKLIST, verifierData, context);
    const projectsChecklist = this.evaluateSection('projects', 'Projects', PROJECTS_CHECKLIST, verifierData, context);
    const achievementsChecklist = this.evaluateSection('achievements', 'Achievements', ACHIEVEMENTS_CHECKLIST, verifierData, context);
    const languagesChecklist = this.evaluateSection('languages', 'Languages', LANGUAGES_CHECKLIST, verifierData, context);
    const contactChecklist = this.evaluateSection('contact', 'Contact Info', CONTACT_CHECKLIST, verifierData, context);
    
    // ATS section (only if keyword analysis is available)
    const atsChecklist = keywordAnalysis 
      ? this.evaluateSection('ats', 'ATS Optimization', ATS_CHECKLIST, verifierData, context)
      : null;

    // Data Quality section (only if content validation is available)
    const dataQualityChecklist = contentValidation
      ? this.evaluateSection('dataQuality', 'Data Quality', DATA_QUALITY_CHECKLIST, verifierData, context)
      : null;

    const checklist: Record<string, SectionChecklist> = {
      summary: summaryChecklist,
      experience: experienceChecklist,
      skills: skillsChecklist,
      education: educationChecklist,
      projects: projectsChecklist,
      achievements: achievementsChecklist,
      languages: languagesChecklist,
      contact: contactChecklist,
      ...(atsChecklist && { ats: atsChecklist }),
      ...(dataQualityChecklist && { dataQuality: dataQualityChecklist }),
    };

    // Calculate total score
    let totalEarnedPoints = 0;
    let totalMaxPoints = 0;
    let totalCompleted = 0;
    let totalItems = 0;
    let allRequiredCompleted = true;

    for (const section of Object.values(checklist)) {
      totalEarnedPoints += section.earnedPoints;
      totalMaxPoints += section.maxPoints;
      totalCompleted += section.completedCount;
      totalItems += section.totalCount;
      
      if (section.requiredCompletedCount < section.requiredCount) {
        allRequiredCompleted = false;
      }
    }

    // Generate strengths from completed items
    const strengths = this.generateStrengths(checklist);
    
    // Generate improvements from incomplete items (prioritized)
    const improvements = this.generateImprovements(checklist);

    // Normalize score to 0-10 scale regardless of actual max points
    // (ATS section adds extra points, so we need to scale proportionally)
    const normalizedScore = totalMaxPoints > 0 
      ? Math.round((totalEarnedPoints / totalMaxPoints) * 10 * 10) / 10 
      : 0;
    
    return {
      totalScore: Math.min(normalizedScore, 10.0), // Cap at 10.0
      maxPossibleScore: 10.0,
      completionPercentage: Math.round((totalCompleted / totalItems) * 100),
      isOptimized: allRequiredCompleted && normalizedScore >= 8.0,
      checklist,
      enhancementHistory: [],
      strengths,
      improvements,
      generatedAt: now,
      scoringVersion: this.SCORING_VERSION,
    };
  }

  /**
   * Evaluate a single section's checklist
   */
  private evaluateSection(
    sectionKey: string,
    displayName: string,
    definitions: ChecklistDefinition[],
    verifierData: any,
    context: any
  ): SectionChecklist {
    const now = new Date().toISOString();
    const items: ChecklistItem[] = [];
    let completedCount = 0;
    let requiredCount = 0;
    let requiredCompletedCount = 0;
    let earnedPoints = 0;
    let maxPoints = 0;

    for (const def of definitions) {
      const verifierFn = VERIFIER_MAP[def.verifierId];
      if (!verifierFn) {
        console.warn(`Verifier not found: ${def.verifierId}`);
        continue;
      }

      const result = verifierFn(verifierData, context);
      
      const item: ChecklistItem = {
        id: def.id,
        label: def.label,
        description: def.description,
        isCompleted: result.passed,
        completedAt: result.passed ? now : undefined,
        priority: def.priority,
        verifierId: def.verifierId,
        details: result.details,
        evidence: result.evidence,
      };

      items.push(item);
      maxPoints += def.pointValue;

      if (result.passed) {
        completedCount++;
        earnedPoints += def.pointValue;
      }

      if (def.priority === 'required') {
        requiredCount++;
        if (result.passed) {
          requiredCompletedCount++;
        }
      }
    }

    return {
      section: sectionKey,
      displayName,
      items,
      completedCount,
      totalCount: items.length,
      requiredCount,
      requiredCompletedCount,
      maxPoints: Math.round(maxPoints * 100) / 100,
      earnedPoints: Math.round(earnedPoints * 100) / 100,
    };
  }

  /**
   * Generate strengths from completed checklist items
   */
  private generateStrengths(checklist: Record<string, SectionChecklist>): string[] {
    const strengths: string[] = [];
    
    for (const section of Object.values(checklist)) {
      // If section has high completion, add as strength
      if (section.completedCount >= section.totalCount * 0.75) {
        strengths.push(`Strong ${section.displayName}: ${section.completedCount}/${section.totalCount} criteria met`);
      }
      
      // Add specific completed required items
      for (const item of section.items) {
        if (item.isCompleted && item.priority === 'required') {
          strengths.push(`✓ ${item.label}: ${item.details || item.description}`);
        }
      }
    }

    // Limit to top 5 strengths, prioritizing section-level strengths
    return strengths.slice(0, 5);
  }

  /**
   * Generate improvements from incomplete checklist items (prioritized by importance)
   */
  private generateImprovements(checklist: Record<string, SectionChecklist>): string[] {
    const improvements: { priority: number; text: string; section: string; itemId: string }[] = [];
    
    const priorityOrder: Record<ChecklistItemPriority, number> = {
      required: 3,
      recommended: 2,
      optional: 1,
    };

    for (const section of Object.values(checklist)) {
      for (const item of section.items) {
        if (!item.isCompleted) {
          improvements.push({
            priority: priorityOrder[item.priority],
            text: `${section.displayName}: ${item.description}`,
            section: section.section,
            itemId: item.id,
          });
        }
      }
    }

    // Sort by priority (highest first) and return just the text
    improvements.sort((a, b) => b.priority - a.priority);
    
    return improvements.slice(0, 8).map(imp => imp.text);
  }

  /**
   * Re-evaluate a single checklist item after enhancement
   * Returns updated item and whether it now passes
   */
  reEvaluateItem(
    itemId: string,
    generatedResume: GeneratedResume,
    resumeData?: ResumeData
  ): { item: ChecklistItem; passed: boolean } | null {
    // Find the item definition across all sections
    const allDefinitions: { def: ChecklistDefinition; section: string }[] = [
      ...SUMMARY_CHECKLIST.map(d => ({ def: d, section: 'summary' })),
      ...EXPERIENCE_CHECKLIST.map(d => ({ def: d, section: 'experience' })),
      ...SKILLS_CHECKLIST.map(d => ({ def: d, section: 'skills' })),
      ...EDUCATION_CHECKLIST.map(d => ({ def: d, section: 'education' })),
      ...PROJECTS_CHECKLIST.map(d => ({ def: d, section: 'projects' })),
      ...ACHIEVEMENTS_CHECKLIST.map(d => ({ def: d, section: 'achievements' })),
      ...LANGUAGES_CHECKLIST.map(d => ({ def: d, section: 'languages' })),
      ...CONTACT_CHECKLIST.map(d => ({ def: d, section: 'contact' })),
      ...ATS_CHECKLIST.map(d => ({ def: d, section: 'ats' })),
      ...DATA_QUALITY_CHECKLIST.map(d => ({ def: d, section: 'dataQuality' })),
    ];

    const found = allDefinitions.find(({ def }) => def.id === itemId);
    if (!found) {
      return null;
    }

    const { def } = found;
    const verifierFn = VERIFIER_MAP[def.verifierId];
    if (!verifierFn) {
      return null;
    }

    const verifierData = {
      summary: generatedResume.professionalSummary,
      experience: generatedResume.experience,
      skills: generatedResume.skills,
      education: generatedResume.education,
      projects: generatedResume.projects,
      achievements: generatedResume.achievements,
      languages: generatedResume.languages,
      contactInfo: generatedResume.contactInfo,
    };

    const context = {
      profession: resumeData?.profession || '',
    };

    const result = verifierFn(verifierData, context);
    const now = new Date().toISOString();

    const item: ChecklistItem = {
      id: def.id,
      label: def.label,
      description: def.description,
      isCompleted: result.passed,
      completedAt: result.passed ? now : undefined,
      priority: def.priority,
      verifierId: def.verifierId,
      details: result.details,
      evidence: result.evidence,
    };

    return { item, passed: result.passed };
  }

  /**
   * Get the section for a checklist item ID
   */
  getSectionForItem(itemId: string): string | null {
    const sectionMap: Record<string, ChecklistDefinition[]> = {
      summary: SUMMARY_CHECKLIST,
      experience: EXPERIENCE_CHECKLIST,
      skills: SKILLS_CHECKLIST,
      education: EDUCATION_CHECKLIST,
      projects: PROJECTS_CHECKLIST,
      achievements: ACHIEVEMENTS_CHECKLIST,
      languages: LANGUAGES_CHECKLIST,
      contact: CONTACT_CHECKLIST,
      ats: ATS_CHECKLIST,
      dataQuality: DATA_QUALITY_CHECKLIST,
    };

    for (const [section, definitions] of Object.entries(sectionMap)) {
      if (definitions.some(d => d.id === itemId)) {
        return section;
      }
    }

    return null;
  }

  /**
   * Get all checklist definitions (for frontend display)
   */
  getChecklistDefinitions(): Record<string, ChecklistDefinition[]> {
    return {
      summary: SUMMARY_CHECKLIST,
      experience: EXPERIENCE_CHECKLIST,
      skills: SKILLS_CHECKLIST,
      education: EDUCATION_CHECKLIST,
      projects: PROJECTS_CHECKLIST,
      achievements: ACHIEVEMENTS_CHECKLIST,
      languages: LANGUAGES_CHECKLIST,
      contact: CONTACT_CHECKLIST,
      ats: ATS_CHECKLIST,
      dataQuality: DATA_QUALITY_CHECKLIST,
    };
  }
}

export const deterministicScoringService = new DeterministicScoringService();

