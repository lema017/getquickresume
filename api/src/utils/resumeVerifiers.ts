/**
 * Deterministic Resume Verifiers
 * 
 * These functions programmatically verify specific checklist criteria
 * for resume sections, providing consistent evaluation across scoring runs.
 */

import { GeneratedResume, ResumeData } from '../types';

// ============================================================================
// Verification Result Types
// ============================================================================

export interface VerificationResult {
  passed: boolean;
  details?: string;
  evidence?: string;
}

// ============================================================================
// Summary Section Verifiers
// ============================================================================

/**
 * Check if summary has at least 3 sentences/paragraphs
 */
export function verifySummaryHasAdequateLength(summary: string): VerificationResult {
  if (!summary || summary.trim().length === 0) {
    return { passed: false, details: 'Summary is empty' };
  }
  
  // Count sentences (periods, exclamation marks, question marks followed by space or end)
  const sentences = summary.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const passed = sentences.length >= 3;
  
  return {
    passed,
    details: passed 
      ? `Summary has ${sentences.length} sentences` 
      : `Summary only has ${sentences.length} sentences, needs at least 3`,
    evidence: summary.substring(0, 100) + '...'
  };
}

/**
 * Check if summary avoids first-person pronouns
 */
export function verifySummaryNoFirstPerson(summary: string): VerificationResult {
  if (!summary || summary.trim().length === 0) {
    return { passed: false, details: 'Summary is empty' };
  }
  
  const firstPersonPatterns = [
    /\bI\b/g,
    /\bI'm\b/gi,
    /\bI've\b/gi,
    /\bI'll\b/gi,
    /\bmy\b/gi,
    /\bme\b/gi,
    /\bmyself\b/gi,
    /\bmine\b/gi,
    // Spanish first-person
    /\byo\b/gi,
    /\bmi\b/gi,
    /\bmis\b/gi,
    /\bme\b/gi,
  ];
  
  const foundFirstPerson: string[] = [];
  for (const pattern of firstPersonPatterns) {
    const matches = summary.match(pattern);
    if (matches) {
      foundFirstPerson.push(...matches);
    }
  }
  
  const passed = foundFirstPerson.length === 0;
  
  return {
    passed,
    details: passed 
      ? 'Summary uses professional third-person language' 
      : `Found first-person pronouns: ${foundFirstPerson.slice(0, 5).join(', ')}`,
    evidence: foundFirstPerson.length > 0 ? foundFirstPerson.slice(0, 5).join(', ') : undefined
  };
}

/**
 * Check if summary contains quantifiable metrics/results
 */
export function verifySummaryHasMetrics(summary: string): VerificationResult {
  if (!summary || summary.trim().length === 0) {
    return { passed: false, details: 'Summary is empty' };
  }
  
  const metricPatterns = [
    /\d+%/g,                          // Percentages
    /\d+\+?\s*(years?|años?)/gi,      // Years of experience
    /\$\d+[\d,]*[KMB]?/gi,            // Dollar amounts
    /\d+[\d,]*\s*(users?|clients?|customers?|projects?|teams?)/gi,  // Quantities
    /\d+x\b/gi,                       // Multipliers (2x, 10x)
    /(increased?|improved?|reduced?|saved?|generated?|grew?|achieved?)\s*(by\s*)?\d+/gi,
    /\d+[\d,]*\s*(hours?|days?|weeks?|months?)/gi,  // Time savings
  ];
  
  const foundMetrics: string[] = [];
  for (const pattern of metricPatterns) {
    const matches = summary.match(pattern);
    if (matches) {
      foundMetrics.push(...matches);
    }
  }
  
  const passed = foundMetrics.length >= 1;
  
  return {
    passed,
    details: passed 
      ? `Found ${foundMetrics.length} quantifiable metrics` 
      : 'No quantifiable metrics found (e.g., percentages, numbers, results)',
    evidence: foundMetrics.length > 0 ? foundMetrics.slice(0, 3).join(', ') : undefined
  };
}

/**
 * Check if summary contains ATS-friendly keywords (basic programmatic check)
 * This is a fallback when keyword analysis is not available
 */
export function verifySummaryHasATSKeywords(summary: string, profession: string): VerificationResult {
  if (!summary || summary.trim().length === 0) {
    return { passed: false, details: 'Summary is empty' };
  }
  
  // Common professional keywords that are ATS-friendly
  const atsKeywordPatterns = [
    // Action/Result words
    /\b(delivered|achieved|implemented|developed|managed|led|drove|created|designed|optimized|improved|established|built|launched|executed|coordinated)\b/gi,
    // Professional qualities
    /\b(experienced|skilled|proficient|expert|specialized|certified|qualified)\b/gi,
    // Business impact words
    /\b(revenue|growth|efficiency|performance|results|success|innovation|strategy|leadership|collaboration)\b/gi,
    // Technical indicators
    /\b(technologies?|systems?|solutions?|platforms?|tools?|frameworks?|methodologies?)\b/gi,
  ];
  
  let keywordCount = 0;
  const foundKeywords: string[] = [];
  
  for (const pattern of atsKeywordPatterns) {
    const matches = summary.match(pattern);
    if (matches) {
      keywordCount += matches.length;
      foundKeywords.push(...matches.slice(0, 2));
    }
  }
  
  const passed = keywordCount >= 3;
  
  return {
    passed,
    details: passed 
      ? `Found ${keywordCount} ATS-friendly keywords` 
      : `Only ${keywordCount} ATS keywords found, recommend at least 3`,
    evidence: foundKeywords.length > 0 ? [...new Set(foundKeywords)].slice(0, 5).join(', ') : undefined
  };
}

// ============================================================================
// Extended Verification Result for Keyword Analysis
// ============================================================================

export interface KeywordAnalysisData {
  totalKeywordsFound: number;
  hardSkills: string[];
  softSkills: string[];
  actionVerbs: string[];
  industryTerms: string[];
  atsScore: 'excellent' | 'good' | 'fair' | 'needs-work';
  scoreValue: number;
  tierLabel: string;
  breakdown: string;
}

/**
 * Verify ATS keyword density using pre-analyzed keyword data
 * This uses AI-powered keyword analysis for accurate results
 */
export function verifyATSKeywordDensity(keywordAnalysis: KeywordAnalysisData | null): VerificationResult {
  if (!keywordAnalysis) {
    return { 
      passed: false, 
      details: 'Keyword analysis not available' 
    };
  }
  
  const { totalKeywordsFound, atsScore, tierLabel, breakdown, hardSkills, softSkills, actionVerbs } = keywordAnalysis;
  
  // Pass if at least 8 keywords found (fair tier or above)
  const passed = totalKeywordsFound >= 8;
  
  // Build evidence string showing top keywords from each category
  const topKeywords = [
    ...hardSkills.slice(0, 3),
    ...softSkills.slice(0, 2),
    ...actionVerbs.slice(0, 2),
  ].slice(0, 6);
  
  return {
    passed,
    details: passed 
      ? `${tierLabel} (${totalKeywordsFound} keywords found)` 
      : `${tierLabel} - Only ${totalKeywordsFound} relevant keywords found`,
    evidence: topKeywords.length > 0 
      ? `${topKeywords.join(', ')} | ${breakdown}`
      : breakdown
  };
}

// ============================================================================
// Experience Section Verifiers
// ============================================================================

/**
 * Check if experience entries have quantifiable achievements
 */
export function verifyExperienceHasMetrics(experience: GeneratedResume['experience']): VerificationResult {
  if (!experience || experience.length === 0) {
    return { passed: false, details: 'No work experience provided' };
  }
  
  const metricPatterns = [
    /\d+%/g,
    /\$\d+[\d,]*[KMB]?/gi,
    /\d+[\d,]*\s*(users?|clients?|customers?|projects?|team members?)/gi,
    /\d+x\b/gi,
    /(increased?|improved?|reduced?|saved?|generated?|grew?|achieved?)\s*(by\s*)?\d+/gi,
  ];
  
  let totalMetrics = 0;
  const entriesWithMetrics: string[] = [];
  
  for (const exp of experience) {
    const textToCheck = [
      exp.description,
      ...(exp.achievements || []),
      ...(exp.impact || [])
    ].join(' ');
    
    for (const pattern of metricPatterns) {
      const matches = textToCheck.match(pattern);
      if (matches) {
        totalMetrics += matches.length;
        entriesWithMetrics.push(exp.title);
        break;
      }
    }
  }
  
  const uniqueEntries = [...new Set(entriesWithMetrics)];
  const passed = totalMetrics >= 2 && uniqueEntries.length >= 1;
  
  return {
    passed,
    details: passed 
      ? `Found ${totalMetrics} metrics across ${uniqueEntries.length} experience entries` 
      : `Need more quantifiable metrics. Found ${totalMetrics} metrics in ${uniqueEntries.length} entries`,
    evidence: uniqueEntries.length > 0 ? `Entries with metrics: ${uniqueEntries.join(', ')}` : undefined
  };
}

/**
 * Check if experience uses action verbs
 */
export function verifyExperienceHasActionVerbs(experience: GeneratedResume['experience']): VerificationResult {
  if (!experience || experience.length === 0) {
    return { passed: false, details: 'No work experience provided' };
  }
  
  const actionVerbs = [
    /\b(led|managed|directed|supervised|coordinated|oversaw|headed)\b/gi,
    /\b(developed|built|created|designed|implemented|engineered|architected)\b/gi,
    /\b(improved|optimized|enhanced|streamlined|transformed|modernized)\b/gi,
    /\b(achieved|delivered|executed|completed|accomplished|succeeded)\b/gi,
    /\b(analyzed|evaluated|assessed|researched|investigated|reviewed)\b/gi,
    /\b(collaborated|partnered|liaised|negotiated|communicated)\b/gi,
    // Spanish action verbs
    /\b(lideré|gestioné|desarrollé|implementé|diseñé|mejoré|logré|coordiné)\b/gi,
  ];
  
  let actionVerbCount = 0;
  const foundVerbs: string[] = [];
  
  for (const exp of experience) {
    const textToCheck = [
      exp.description,
      ...(exp.achievements || [])
    ].join(' ');
    
    for (const pattern of actionVerbs) {
      const matches = textToCheck.match(pattern);
      if (matches) {
        actionVerbCount += matches.length;
        foundVerbs.push(...matches.slice(0, 2));
      }
    }
  }
  
  const passed = actionVerbCount >= 5;
  
  return {
    passed,
    details: passed 
      ? `Found ${actionVerbCount} action verbs` 
      : `Only ${actionVerbCount} action verbs found, recommend at least 5`,
    evidence: foundVerbs.length > 0 ? [...new Set(foundVerbs)].slice(0, 5).join(', ') : undefined
  };
}

/**
 * Check if experience entries have achievements listed
 */
export function verifyExperienceHasAchievements(experience: GeneratedResume['experience']): VerificationResult {
  if (!experience || experience.length === 0) {
    return { passed: false, details: 'No work experience provided' };
  }
  
  let entriesWithAchievements = 0;
  let totalAchievements = 0;
  
  for (const exp of experience) {
    if (exp.achievements && exp.achievements.length > 0) {
      entriesWithAchievements++;
      totalAchievements += exp.achievements.length;
    }
  }
  
  const passed = entriesWithAchievements >= 1 && totalAchievements >= 2;
  
  return {
    passed,
    details: passed 
      ? `${entriesWithAchievements} entries have achievements (${totalAchievements} total)` 
      : `Need achievements listed. Found ${totalAchievements} achievements in ${entriesWithAchievements} entries`,
  };
}

/**
 * Check if experience shows career progression
 */
export function verifyExperienceShowsProgression(experience: GeneratedResume['experience']): VerificationResult {
  if (!experience || experience.length === 0) {
    return { passed: false, details: 'No work experience provided' };
  }
  
  if (experience.length < 2) {
    return { passed: true, details: 'Single role - progression not applicable' };
  }
  
  // Check for title progression indicators
  const seniorityIndicators = [
    /\b(junior|associate|entry)/gi,
    /\b(mid|intermediate|regular)/gi,
    /\b(senior|lead|principal|staff)/gi,
    /\b(manager|director|head|vp|chief|cto|ceo)/gi,
  ];
  
  let seniorityLevels = new Set<number>();
  
  for (const exp of experience) {
    const title = exp.title.toLowerCase();
    seniorityIndicators.forEach((pattern, index) => {
      if (pattern.test(title)) {
        seniorityLevels.add(index);
      }
    });
  }
  
  // If we found multiple seniority levels or have 2+ roles, consider progression shown
  const passed = seniorityLevels.size >= 2 || experience.length >= 2;
  
  return {
    passed,
    details: passed 
      ? `Career progression shown across ${experience.length} roles` 
      : 'Consider highlighting career progression in titles',
  };
}

// ============================================================================
// Skills Section Verifiers
// ============================================================================

/**
 * Check if skills are organized into categories
 */
export function verifySkillsOrganized(skills: GeneratedResume['skills']): VerificationResult {
  if (!skills) {
    return { passed: false, details: 'No skills provided' };
  }
  
  const hasTechnical = skills.technical && skills.technical.length > 0;
  const hasSoft = skills.soft && skills.soft.length > 0;
  const hasTools = skills.tools && skills.tools.length > 0;
  
  const categoriesWithSkills = [hasTechnical, hasSoft, hasTools].filter(Boolean).length;
  const passed = categoriesWithSkills >= 2;
  
  return {
    passed,
    details: passed 
      ? `Skills organized into ${categoriesWithSkills} categories` 
      : `Only ${categoriesWithSkills} skill category populated, recommend at least 2`,
    evidence: `Technical: ${skills.technical?.length || 0}, Soft: ${skills.soft?.length || 0}, Tools: ${skills.tools?.length || 0}`
  };
}

/**
 * Check if has technical skills
 */
export function verifyHasTechnicalSkills(skills: GeneratedResume['skills']): VerificationResult {
  if (!skills) {
    return { passed: false, details: 'No skills provided' };
  }
  
  const technicalCount = skills.technical?.length || 0;
  const passed = technicalCount >= 3;
  
  return {
    passed,
    details: passed 
      ? `Has ${technicalCount} technical skills` 
      : `Only ${technicalCount} technical skills, recommend at least 3`,
    evidence: skills.technical?.slice(0, 5).join(', ')
  };
}

/**
 * Check if has soft skills
 */
export function verifyHasSoftSkills(skills: GeneratedResume['skills']): VerificationResult {
  if (!skills) {
    return { passed: false, details: 'No skills provided' };
  }
  
  const softCount = skills.soft?.length || 0;
  const passed = softCount >= 2;
  
  return {
    passed,
    details: passed 
      ? `Has ${softCount} soft skills` 
      : `Only ${softCount} soft skills, recommend at least 2`,
    evidence: skills.soft?.slice(0, 5).join(', ')
  };
}

/**
 * Check if has tools/technologies
 */
export function verifyHasTools(skills: GeneratedResume['skills']): VerificationResult {
  if (!skills) {
    return { passed: false, details: 'No skills provided' };
  }
  
  const toolsCount = skills.tools?.length || 0;
  const passed = toolsCount >= 2;
  
  return {
    passed,
    details: passed 
      ? `Has ${toolsCount} tools/technologies` 
      : `Only ${toolsCount} tools listed, recommend at least 2`,
    evidence: skills.tools?.slice(0, 5).join(', ')
  };
}

// ============================================================================
// Education Section Verifiers
// ============================================================================

/**
 * Check if education has complete dates
 */
export function verifyEducationHasDates(education: GeneratedResume['education']): VerificationResult {
  if (!education || education.length === 0) {
    return { passed: true, details: 'No education entries (optional section)' };
  }
  
  let entriesWithDates = 0;
  
  for (const edu of education) {
    if (edu.duration && edu.duration.trim().length > 0) {
      entriesWithDates++;
    }
  }
  
  const passed = entriesWithDates === education.length;
  
  return {
    passed,
    details: passed 
      ? `All ${education.length} education entries have dates` 
      : `${entriesWithDates}/${education.length} entries have complete dates`,
  };
}

/**
 * Check if education has institution listed
 */
export function verifyEducationHasInstitution(education: GeneratedResume['education']): VerificationResult {
  if (!education || education.length === 0) {
    return { passed: true, details: 'No education entries (optional section)' };
  }
  
  let entriesWithInstitution = 0;
  
  for (const edu of education) {
    if (edu.institution && edu.institution.trim().length > 0) {
      entriesWithInstitution++;
    }
  }
  
  const passed = entriesWithInstitution === education.length;
  
  return {
    passed,
    details: passed 
      ? `All education entries have institution names` 
      : `${entriesWithInstitution}/${education.length} entries have institution`,
  };
}

/**
 * Check if education has degree and field
 */
export function verifyEducationHasDegreeField(education: GeneratedResume['education']): VerificationResult {
  if (!education || education.length === 0) {
    return { passed: true, details: 'No education entries (optional section)' };
  }
  
  let completeEntries = 0;
  
  for (const edu of education) {
    const hasDegree = edu.degree && edu.degree.trim().length > 0;
    const hasField = edu.field && edu.field.trim().length > 0;
    if (hasDegree && hasField) {
      completeEntries++;
    }
  }
  
  const passed = completeEntries === education.length;
  
  return {
    passed,
    details: passed 
      ? `All education entries have degree and field of study` 
      : `${completeEntries}/${education.length} entries have complete degree info`,
  };
}

// ============================================================================
// Projects Section Verifiers
// ============================================================================

/**
 * Check if projects have descriptions
 */
export function verifyProjectsHaveDescriptions(projects: GeneratedResume['projects']): VerificationResult {
  if (!projects || projects.length === 0) {
    return { passed: true, details: 'No projects listed (optional section)' };
  }
  
  let projectsWithDescriptions = 0;
  
  for (const proj of projects) {
    if (proj.description && proj.description.trim().length >= 20) {
      projectsWithDescriptions++;
    }
  }
  
  const passed = projectsWithDescriptions === projects.length;
  
  return {
    passed,
    details: passed 
      ? `All ${projects.length} projects have descriptions` 
      : `${projectsWithDescriptions}/${projects.length} projects have adequate descriptions`,
  };
}

/**
 * Check if projects list technologies
 */
export function verifyProjectsHaveTechnologies(projects: GeneratedResume['projects']): VerificationResult {
  if (!projects || projects.length === 0) {
    return { passed: true, details: 'No projects listed (optional section)' };
  }
  
  let projectsWithTech = 0;
  
  for (const proj of projects) {
    if (proj.technologies && proj.technologies.length > 0) {
      projectsWithTech++;
    }
  }
  
  const passed = projectsWithTech >= Math.ceil(projects.length / 2);
  
  return {
    passed,
    details: passed 
      ? `${projectsWithTech}/${projects.length} projects list technologies used` 
      : `Only ${projectsWithTech}/${projects.length} projects have technologies listed`,
  };
}

/**
 * Check if projects show measurable impact
 */
export function verifyProjectsHaveImpact(projects: GeneratedResume['projects']): VerificationResult {
  if (!projects || projects.length === 0) {
    return { passed: true, details: 'No projects listed (optional section)' };
  }
  
  const impactPatterns = [
    /\d+%/g,
    /\d+[\d,]*\s*(users?|downloads?|clients?|customers?)/gi,
    /\b(improved?|increased?|reduced?|saved?|achieved?|generated?)\b/gi,
    /\b(impact|result|outcome|success)\b/gi,
  ];
  
  let projectsWithImpact = 0;
  
  for (const proj of projects) {
    const textToCheck = [proj.description, proj.impact || ''].join(' ');
    
    for (const pattern of impactPatterns) {
      if (pattern.test(textToCheck)) {
        projectsWithImpact++;
        break;
      }
    }
  }
  
  const passed = projectsWithImpact >= 1;
  
  return {
    passed,
    details: passed 
      ? `${projectsWithImpact}/${projects.length} projects show measurable impact` 
      : 'Add measurable impact or results to at least one project',
  };
}

// ============================================================================
// Achievements Section Verifiers
// ============================================================================

/**
 * Check if achievements have specific metrics
 */
export function verifyAchievementsHaveMetrics(achievements: string[]): VerificationResult {
  if (!achievements || achievements.length === 0) {
    return { passed: true, details: 'No standalone achievements (optional section)' };
  }
  
  const metricPatterns = [
    /\d+%/g,
    /\$\d+[\d,]*[KMB]?/gi,
    /\d+[\d,]*\s*(users?|clients?|projects?)/gi,
    /\d+x\b/gi,
    /#\d+\b/g, // Rankings
  ];
  
  let achievementsWithMetrics = 0;
  
  for (const achievement of achievements) {
    for (const pattern of metricPatterns) {
      if (pattern.test(achievement)) {
        achievementsWithMetrics++;
        break;
      }
    }
  }
  
  const passed = achievementsWithMetrics >= 1;
  
  return {
    passed,
    details: passed 
      ? `${achievementsWithMetrics}/${achievements.length} achievements have specific metrics` 
      : 'Add specific metrics or numbers to achievements',
  };
}

/**
 * Check if achievements are quantifiable
 */
export function verifyAchievementsAreQuantifiable(achievements: string[]): VerificationResult {
  if (!achievements || achievements.length === 0) {
    return { passed: true, details: 'No standalone achievements (optional section)' };
  }
  
  // Check for any numbers or quantifiable terms
  const quantifiablePatterns = [
    /\d/g, // Any number
    /\b(first|second|third|top|best|highest|lowest|most|least)\b/gi,
    /\b(award|recognition|certificate|honor)\b/gi,
  ];
  
  let quantifiableCount = 0;
  
  for (const achievement of achievements) {
    for (const pattern of quantifiablePatterns) {
      if (pattern.test(achievement)) {
        quantifiableCount++;
        break;
      }
    }
  }
  
  const passed = quantifiableCount >= Math.ceil(achievements.length / 2);
  
  return {
    passed,
    details: passed 
      ? `${quantifiableCount}/${achievements.length} achievements are quantifiable` 
      : 'Make achievements more quantifiable with specific results',
  };
}

// ============================================================================
// Languages Section Verifiers
// ============================================================================

/**
 * Check if languages have proficiency levels stated
 */
export function verifyLanguagesHaveLevels(languages: GeneratedResume['languages']): VerificationResult {
  if (!languages || languages.length === 0) {
    return { passed: true, details: 'No languages listed (optional section)' };
  }
  
  let languagesWithLevels = 0;
  
  for (const lang of languages) {
    if (lang.level && lang.level.trim().length > 0) {
      languagesWithLevels++;
    }
  }
  
  const passed = languagesWithLevels === languages.length;
  
  return {
    passed,
    details: passed 
      ? `All ${languages.length} languages have proficiency levels` 
      : `${languagesWithLevels}/${languages.length} languages have levels specified`,
  };
}

// ============================================================================
// Contact Section Verifiers
// ============================================================================

/**
 * Check if LinkedIn is provided
 */
export function verifyContactHasLinkedIn(contactInfo: GeneratedResume['contactInfo']): VerificationResult {
  if (!contactInfo) {
    return { passed: false, details: 'No contact information provided' };
  }
  
  const hasLinkedIn = Boolean(contactInfo.linkedin && contactInfo.linkedin.trim().length > 0);
  
  return {
    passed: hasLinkedIn,
    details: hasLinkedIn 
      ? 'LinkedIn profile included' 
      : 'Add LinkedIn profile for professional credibility',
    evidence: hasLinkedIn ? contactInfo.linkedin : undefined
  };
}

/**
 * Check if email is professional
 */
export function verifyContactHasProfessionalEmail(contactInfo: GeneratedResume['contactInfo']): VerificationResult {
  if (!contactInfo || !contactInfo.email) {
    return { passed: false, details: 'No email provided' };
  }
  
  const email = contactInfo.email.toLowerCase();
  
  // Check for unprofessional patterns
  const unprofessionalPatterns = [
    /\d{4,}/, // Long number sequences
    /(sexy|hot|cool|crazy|baby|love|cute|sweetie)/i,
    /^(admin|test|info|contact)@/i,
  ];
  
  let isProfessional = true;
  for (const pattern of unprofessionalPatterns) {
    if (pattern.test(email)) {
      isProfessional = false;
      break;
    }
  }
  
  // Also check it has @ and common domain
  const hasValidFormat = email.includes('@') && email.includes('.');
  
  const passed = isProfessional && hasValidFormat;
  
  return {
    passed,
    details: passed 
      ? 'Professional email format' 
      : 'Consider using a more professional email address',
    evidence: contactInfo.email
  };
}

/**
 * Check if phone is provided
 */
export function verifyContactHasPhone(contactInfo: GeneratedResume['contactInfo']): VerificationResult {
  if (!contactInfo) {
    return { passed: false, details: 'No contact information provided' };
  }
  
  const hasPhone = Boolean(contactInfo.phone && contactInfo.phone.trim().length >= 7);
  
  return {
    passed: hasPhone,
    details: hasPhone 
      ? 'Phone number included' 
      : 'Add phone number for contact',
  };
}

