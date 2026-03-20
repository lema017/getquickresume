import type { ResumeData } from '@/types';
import type { TemplateStyleCategory } from '@/utils/templateCatalog';
import {
  normalizeProfessionToEnglishSlug,
  getSpanishProfessionSlug as getSpanishProfessionSlugFromMappings,
  isSpanishProfessionSlug,
  getAllSpanishProfessionSlugs,
  getAllEnglishProfessionSlugs,
} from '../slugMappings';

export interface ProfessionEsData {
  slug: string;
  title: string;
  keywords: string[];
  searchIntents: string[];
  topSkills: string[];
  atsKeywords: string[];
  sampleResumeData: ResumeData;
  faqs: Array<{ question: string; answer: string }>;
}

export interface ProfessionPageData {
  slug: string;
  title: string;
  templateStyle: TemplateStyleCategory;
  keywords: string[];
  searchIntents: string[];
  totalMonthlySearches: number;
  topSkills: string[];
  atsKeywords: string[];
  sampleResumeData: ResumeData;
  faqs: Array<{ question: string; answer: string }>;
  es?: ProfessionEsData;
}

const registry = new Map<string, ProfessionPageData>();
let isLoaded = false;
let loadingPromise: Promise<void> | null = null;

export function registerProfessions(professions: ProfessionPageData[]) {
  for (const p of professions) {
    registry.set(p.slug, p);
  }
}

const enModules = import.meta.glob<{ professions: ProfessionPageData[] }>(
  ['./*.ts', '!./index.ts', '!./_helpers.ts', '!./*-es.ts'],
  { eager: false }
);

const esModules = import.meta.glob<{ translations: Record<string, ProfessionEsData> }>(
  ['./*-es.ts'],
  { eager: false }
);

async function loadAllModules(): Promise<void> {
  if (isLoaded) return;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const enResults = await Promise.all(Object.values(enModules).map(fn => fn()));
    for (const mod of enResults) {
      if (mod.professions) {
        registerProfessions(mod.professions);
      }
    }

    const esResults = await Promise.all(Object.values(esModules).map(fn => fn()));
    for (const mod of esResults) {
      if (mod.translations) {
        for (const [englishSlug, esData] of Object.entries(mod.translations)) {
          const profession = registry.get(englishSlug);
          if (profession) {
            profession.es = esData;
          }
        }
      }
    }

    isLoaded = true;
  })();

  return loadingPromise;
}

/**
 * Ensure all profession data is loaded. Safe to call multiple times.
 */
export async function ensureProfessionsLoaded(): Promise<void> {
  return loadAllModules();
}

/**
 * Get profession by slug (supports both English and Spanish slugs).
 * Loads data on first call.
 */
export async function getProfessionBySlug(slug: string): Promise<ProfessionPageData | undefined> {
  await loadAllModules();

  const englishSlug = normalizeProfessionToEnglishSlug(slug);
  const profession = registry.get(englishSlug);

  if (!profession) return undefined;

  if (isSpanishProfessionSlug(slug) && profession.es) {
    return {
      ...profession,
      slug: profession.es.slug,
      title: profession.es.title,
      keywords: profession.es.keywords,
      searchIntents: profession.es.searchIntents,
      topSkills: profession.es.topSkills,
      atsKeywords: profession.es.atsKeywords,
      sampleResumeData: profession.es.sampleResumeData,
      faqs: profession.es.faqs,
    };
  }

  return profession;
}

/**
 * Get raw profession data (for accessing both language versions).
 * Loads data on first call.
 */
export async function getRawProfessionBySlug(slug: string): Promise<ProfessionPageData | undefined> {
  await loadAllModules();
  const englishSlug = normalizeProfessionToEnglishSlug(slug);
  return registry.get(englishSlug);
}

export async function getAllProfessions(): Promise<ProfessionPageData[]> {
  await loadAllModules();
  return Array.from(registry.values());
}

export async function getAllSlugs(language: 'en' | 'es' = 'en'): Promise<string[]> {
  await loadAllModules();
  const englishSlugs = Array.from(registry.keys());

  if (language === 'en') {
    return englishSlugs;
  }

  return englishSlugs
    .map((slug) => {
      const profession = registry.get(slug);
      if (profession?.es) {
        return profession.es.slug;
      }
      return null;
    })
    .filter((slug): slug is string => slug !== null);
}

export async function getAllSlugsBilingual(): Promise<{ en: string[]; es: string[] }> {
  await loadAllModules();
  const englishSlugs = Array.from(registry.keys());
  const spanishSlugs: string[] = [];

  for (const slug of englishSlugs) {
    const profession = registry.get(slug);
    if (profession?.es) {
      spanishSlugs.push(profession.es.slug);
    }
  }

  return { en: englishSlugs, es: spanishSlugs };
}

export async function hasSpanishTranslation(slug: string): Promise<boolean> {
  await loadAllModules();
  const englishSlug = normalizeProfessionToEnglishSlug(slug);
  const profession = registry.get(englishSlug);
  return !!profession?.es;
}

/**
 * Get Spanish equivalent slug for an English slug.
 * Synchronous — uses mappings fallback when registry is not yet loaded.
 */
export function getSpanishProfessionSlug(englishSlug: string): string | undefined {
  const profession = registry.get(englishSlug);
  if (profession?.es?.slug) {
    return profession.es.slug;
  }
  return getSpanishProfessionSlugFromMappings(englishSlug);
}

/**
 * Get English equivalent slug for a Spanish slug.
 * Synchronous — uses mappings only.
 */
export function getEnglishProfessionSlug(spanishSlug: string): string {
  return normalizeProfessionToEnglishSlug(spanishSlug);
}
