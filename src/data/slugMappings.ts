/**
 * Bidirectional slug mappings between English and Spanish
 * This file re-exports from the comprehensive mapping files
 */

import {
  getEnglishSlug as professionGetEnglishSlug,
  getSpanishSlug as professionGetSpanishSlug,
  isSpanishSlug as professionIsSpanishSlug,
  isEnglishSlug as professionIsEnglishSlug,
  getAllSpanishSlugs as professionGetAllSpanishSlugs,
  getAllEnglishSlugs as professionGetAllEnglishSlugs,
  getLanguageFromSlug as professionGetLanguageFromSlug,
  normalizeToEnglishSlug as professionNormalizeToEnglishSlug,
} from './professionSlugMappings';

import {
  getEnglishSlug as skillGetEnglishSlug,
  getSpanishSlug as skillGetSpanishSlug,
  isSpanishSlug as skillIsSpanishSlug,
  isEnglishSlug as skillIsEnglishSlug,
  getAllSpanishSlugs as skillGetAllSpanishSlugs,
  getAllEnglishSlugs as skillGetAllEnglishSlugs,
  getLanguageFromSlug as skillGetLanguageFromSlug,
  normalizeToEnglishSlug as skillNormalizeToEnglishSlug,
} from './skillSlugMappings';

// Re-export everything from profession mappings
export {
  professionSlugMappings,
  getEnglishSlug as getEnglishProfessionSlug,
  getSpanishSlug as getSpanishProfessionSlug,
  isSpanishSlug as isSpanishProfessionSlug,
  isEnglishSlug as isEnglishProfessionSlug,
  getAllSpanishSlugs as getAllSpanishProfessionSlugs,
  getAllEnglishSlugs as getAllEnglishProfessionSlugs,
  getLanguageFromSlug as getProfessionLanguageFromSlug,
  normalizeToEnglishSlug as normalizeProfessionToEnglishSlug,
} from './professionSlugMappings';

// Re-export everything from skill mappings
export {
  skillSlugMappings,
  getEnglishSlug as getEnglishSkillSlug,
  getSpanishSlug as getSpanishSkillSlug,
  isSpanishSlug as isSpanishSkillSlug,
  isEnglishSlug as isEnglishSkillSlug,
  getAllSpanishSlugs as getAllSpanishSkillSlugs,
  getAllEnglishSlugs as getAllEnglishSkillSlugs,
  getLanguageFromSlug as getSkillLanguageFromSlug,
  normalizeToEnglishSlug as normalizeSkillToEnglishSlug,
} from './skillSlugMappings';

// Type definitions
export type SlugType = 'profession' | 'skill';

// Unified helper that works with both types
export function getEnglishSlug(spanishSlug: string, type: SlugType): string | undefined {
  return type === 'profession'
    ? professionGetEnglishSlug(spanishSlug)
    : skillGetEnglishSlug(spanishSlug);
}

export function getSpanishSlug(englishSlug: string, type: SlugType): string | undefined {
  return type === 'profession'
    ? professionGetSpanishSlug(englishSlug)
    : skillGetSpanishSlug(englishSlug);
}

export function isSpanishSlug(slug: string, type: SlugType): boolean {
  return type === 'profession' ? professionIsSpanishSlug(slug) : skillIsSpanishSlug(slug);
}

export function isEnglishSlug(slug: string, type: SlugType): boolean {
  return type === 'profession' ? professionIsEnglishSlug(slug) : skillIsEnglishSlug(slug);
}

export function getLanguageFromSlug(slug: string, type: SlugType): 'en' | 'es' | undefined {
  return type === 'profession'
    ? professionGetLanguageFromSlug(slug)
    : skillGetLanguageFromSlug(slug);
}

export function normalizeToEnglishSlug(slug: string, type: SlugType): string {
  return type === 'profession'
    ? professionNormalizeToEnglishSlug(slug)
    : skillNormalizeToEnglishSlug(slug);
}

// Get all slugs
export function getAllSlugs(type: SlugType): { en: string[]; es: string[] } {
  if (type === 'profession') {
    return {
      en: professionGetAllEnglishSlugs(),
      es: professionGetAllSpanishSlugs(),
    };
  }
  return {
    en: skillGetAllEnglishSlugs(),
    es: skillGetAllSpanishSlugs(),
  };
}
