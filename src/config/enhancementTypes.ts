/**
 * Enhancement Type Configuration
 * 
 * Categorizes checklist items by enhancement approach:
 * - mechanical: AI can fix directly without user context
 * - context-dependent: Requires user input to gather specific details
 * - structural: Cannot be enhanced, requires manual editing
 */

export type EnhancementType = 'mechanical' | 'context-dependent' | 'structural';

/**
 * Maps checklist item IDs to their enhancement type.
 * Items not in this map default to 'context-dependent' for safety.
 */
export const CHECKLIST_ENHANCEMENT_TYPES: Record<string, EnhancementType> = {
  // ============================================================================
  // MECHANICAL FIXES - AI can fix directly without user context
  // ============================================================================
  
  // Summary
  'summary-no-first-person': 'mechanical',  // Remove I, my, me pronouns
  'summary-ats-keywords': 'mechanical',      // Add action verbs and keywords
  
  // Experience
  'experience-action-verbs': 'mechanical',   // Replace weak verbs with strong ones
  
  // Skills
  'skills-organized': 'mechanical',          // Reorganize into categories
  
  // ============================================================================
  // CONTEXT-DEPENDENT FIXES - Needs user input for specific details
  // ============================================================================
  
  // Summary
  'summary-metrics': 'context-dependent',    // User must provide actual numbers
  'summary-length': 'context-dependent',     // User must provide content ideas
  
  // Experience
  'experience-metrics': 'context-dependent',      // User must provide achievement numbers
  'experience-achievements': 'context-dependent', // User must describe achievements
  'experience-progression': 'context-dependent',  // User must describe career growth
  
  // Projects
  'projects-descriptions': 'context-dependent',   // User must describe projects
  'projects-technologies': 'context-dependent',   // User must list technologies
  'projects-impact': 'context-dependent',         // User must provide impact metrics
  
  // Achievements
  'achievements-metrics': 'context-dependent',      // User must provide metrics
  'achievements-quantifiable': 'context-dependent', // User must provide quantifiable info
  
  // ============================================================================
  // STRUCTURAL FIXES - Cannot be enhanced, requires manual editing
  // ============================================================================
  
  // Skills (adding new skills requires form input)
  'skills-technical': 'structural',
  'skills-soft': 'structural',
  'skills-tools': 'structural',
  
  // Education (requires form editing)
  'education-dates': 'structural',
  'education-institution': 'structural',
  'education-degree-field': 'structural',
  
  // Languages (requires form editing)
  'languages-levels': 'structural',
  
  // Contact (requires form editing)
  'contact-linkedin': 'structural',
  'contact-email': 'structural',
  'contact-phone': 'structural',
  
  // Data Quality (requires manual editing of source sections)
  'data-quality-overall': 'structural',
  'data-quality-education': 'structural',
  'data-quality-experience': 'structural',
  'data-quality-skills': 'structural',
  'data-quality-profile': 'structural',
  'data-quality-certifications': 'structural',
  'data-quality-languages': 'structural',
};

/**
 * Get the enhancement type for a checklist item.
 * Defaults to 'context-dependent' if not explicitly configured.
 */
export function getEnhancementType(checklistItemId: string): EnhancementType {
  return CHECKLIST_ENHANCEMENT_TYPES[checklistItemId] || 'context-dependent';
}

/**
 * Check if a checklist item can be enhanced mechanically (no user context needed).
 */
export function isMechanicalFix(checklistItemId: string): boolean {
  return getEnhancementType(checklistItemId) === 'mechanical';
}

/**
 * Check if a checklist item requires user context for enhancement.
 */
export function isContextDependentFix(checklistItemId: string): boolean {
  return getEnhancementType(checklistItemId) === 'context-dependent';
}

/**
 * Check if a checklist item is structural (requires manual form editing).
 */
export function isStructuralFix(checklistItemId: string): boolean {
  return getEnhancementType(checklistItemId) === 'structural';
}

/**
 * Targeted prompts for mechanical fixes.
 * These are used by the AI to perform direct enhancements.
 */
export const MECHANICAL_FIX_PROMPTS: Record<string, { en: string; es: string }> = {
  'summary-no-first-person': {
    en: 'Rewrite this professional summary removing all first-person pronouns (I, my, me, mine, myself) while preserving the exact meaning and professional tone. Use third-person or passive voice where needed. Do not add new information.',
    es: 'Reescribe este resumen profesional eliminando todos los pronombres en primera persona (yo, mi, mis, me, mí mismo) manteniendo el significado exacto y el tono profesional. Usa tercera persona o voz pasiva donde sea necesario. No agregues información nueva.',
  },
  'summary-ats-keywords': {
    en: 'Enhance this professional summary by incorporating strong action verbs and ATS-friendly keywords relevant to the profession. Maintain the original meaning but make it more impactful for applicant tracking systems. Replace passive language with active, results-oriented language.',
    es: 'Mejora este resumen profesional incorporando verbos de acción fuertes y palabras clave compatibles con ATS relevantes para la profesión. Mantén el significado original pero hazlo más impactante para sistemas de seguimiento de candidatos. Reemplaza el lenguaje pasivo con lenguaje activo orientado a resultados.',
  },
  'experience-action-verbs': {
    en: 'Rewrite these experience bullet points using strong action verbs at the beginning of each point. Replace weak verbs (did, made, was responsible for, helped) with powerful action verbs (led, developed, achieved, implemented, streamlined, orchestrated). Maintain the same achievements and metrics.',
    es: 'Reescribe estos puntos de experiencia usando verbos de acción fuertes al inicio de cada punto. Reemplaza verbos débiles (hice, hizo, fue responsable de, ayudó) con verbos de acción poderosos (lideró, desarrolló, logró, implementó, optimizó, orquestó). Mantén los mismos logros y métricas.',
  },
  'skills-organized': {
    en: 'Reorganize these skills into clear, logical categories (Technical Skills, Soft Skills, Tools & Technologies, Languages, etc.). Group related skills together and order categories by relevance to typical job applications.',
    es: 'Reorganiza estas habilidades en categorías claras y lógicas (Habilidades Técnicas, Habilidades Blandas, Herramientas y Tecnologías, Idiomas, etc.). Agrupa habilidades relacionadas y ordena las categorías por relevancia para aplicaciones de trabajo típicas.',
  },
};

