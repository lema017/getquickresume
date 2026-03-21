import {
  normalizeSkillToEnglishSlug,
  getSpanishSkillSlug as getSpanishSkillSlugFromMappingsImport,
  isSpanishSkillSlug,
} from '../slugMappings';
import type { SkillContentBody, SkillFamilyId, SkillSEOOverrides } from './types';

export type { SkillContentBody, SkillFamilyId, SkillSEOOverrides, ResolvedSkillPage } from './types';
export { resolveSkillPage, buildSkillSeoOverrides } from './resolveSkillPage';

export interface SkillEsData {
  slug: string;
  title: string;
  description: string;
  whyImportant: string;
  keywords: string[];
  searchIntents: string[];
  relatedSkills: string[];
  professionSlugs: string[];
  atsKeywords: string[];
  resumeTips: string[];
  exampleBullets: string[];
  faqs: Array<{ question: string; answer: string }>;
  familyId?: SkillFamilyId;
  content?: Partial<SkillContentBody>;
  seo?: SkillSEOOverrides;
  /** Prefer this EN profession slug for the template carousel when set (must resolve via getProfessionBySlug). */
  demoProfessionSlug?: string;
}

export interface SkillPageData {
  slug: string;
  title: string;
  category: 'technical' | 'soft' | 'industry' | 'tools';
  description: string;
  whyImportant: string;
  keywords: string[];
  searchIntents: string[];
  totalMonthlySearches: number;
  relatedSkills: string[];
  professionSlugs: string[];
  atsKeywords: string[];
  resumeTips: string[];
  exampleBullets: string[];
  faqs: Array<{ question: string; answer: string }>;
  familyId?: SkillFamilyId;
  content?: Partial<SkillContentBody>;
  seo?: SkillSEOOverrides;
  es?: SkillEsData;
  /** Prefer this EN profession slug for the template carousel when set (must resolve via getProfessionBySlug). */
  demoProfessionSlug?: string;
}

const registry = new Map<string, SkillPageData>();
let isLoaded = false;
let loadingPromise: Promise<void> | null = null;

export function registerSkills(skills: SkillPageData[]) {
  for (const s of skills) {
    registry.set(s.slug, s);
  }
}

const enModules = import.meta.glob<{ skills: SkillPageData[] }>(
  ['./*.ts', '!./index.ts', '!./*-es.ts'],
  { eager: false }
);

const esModules = import.meta.glob<{ translations: Record<string, SkillEsData> }>(
  ['./*-es.ts'],
  { eager: false }
);

async function loadAllModules(): Promise<void> {
  if (isLoaded) return;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const enResults = await Promise.all(Object.values(enModules).map(fn => fn()));
    for (const mod of enResults) {
      if (mod.skills) {
        registerSkills(mod.skills);
      }
    }

    const esResults = await Promise.all(Object.values(esModules).map(fn => fn()));
    for (const mod of esResults) {
      if (mod.translations) {
        for (const [englishSlug, esData] of Object.entries(mod.translations)) {
          const skill = registry.get(englishSlug);
          if (skill) {
            skill.es = esData;
          }
        }
      }
    }

    isLoaded = true;
  })();

  return loadingPromise;
}

/**
 * Ensure all skill data is loaded. Safe to call multiple times.
 */
export async function ensureSkillsLoaded(): Promise<void> {
  return loadAllModules();
}

/**
 * Get skill by slug (supports both English and Spanish slugs).
 * Loads data on first call.
 */
export async function getSkillBySlug(slug: string): Promise<SkillPageData | undefined> {
  await loadAllModules();

  const englishSlug = normalizeSkillToEnglishSlug(slug);
  const skill = registry.get(englishSlug);

  if (!skill) return undefined;

  if (isSpanishSkillSlug(slug) && skill.es) {
    const es = skill.es;
    return {
      ...skill,
      slug: es.slug,
      title: es.title,
      description: es.description,
      whyImportant: es.whyImportant,
      keywords: es.keywords,
      searchIntents: es.searchIntents,
      relatedSkills: es.relatedSkills,
      professionSlugs: es.professionSlugs,
      atsKeywords: es.atsKeywords,
      resumeTips: es.resumeTips,
      exampleBullets: es.exampleBullets,
      faqs: es.faqs,
      familyId: es.familyId ?? skill.familyId,
      content: es.content ?? skill.content,
      seo: es.seo ?? skill.seo,
    };
  }

  return skill;
}

/**
 * Get raw skill data (for accessing both language versions).
 * Loads data on first call.
 */
export async function getRawSkillBySlug(slug: string): Promise<SkillPageData | undefined> {
  await loadAllModules();
  const englishSlug = normalizeSkillToEnglishSlug(slug);
  return registry.get(englishSlug);
}

export async function getAllSkills(): Promise<SkillPageData[]> {
  await loadAllModules();
  return Array.from(registry.values());
}

export async function getAllSkillSlugs(language: 'en' | 'es' = 'en'): Promise<string[]> {
  await loadAllModules();
  const englishSlugs = Array.from(registry.keys());

  if (language === 'en') {
    return englishSlugs;
  }

  return englishSlugs
    .map((slug) => {
      const skill = registry.get(slug);
      if (skill?.es) {
        return skill.es.slug;
      }
      return null;
    })
    .filter((slug): slug is string => slug !== null);
}

export async function getAllSkillSlugsBilingual(): Promise<{ en: string[]; es: string[] }> {
  await loadAllModules();
  const englishSlugs = Array.from(registry.keys());
  const spanishSlugs: string[] = [];

  for (const slug of englishSlugs) {
    const skill = registry.get(slug);
    if (skill?.es) {
      spanishSlugs.push(skill.es.slug);
    }
  }

  return { en: englishSlugs, es: spanishSlugs };
}

export async function hasSpanishSkillTranslation(slug: string): Promise<boolean> {
  await loadAllModules();
  const englishSlug = normalizeSkillToEnglishSlug(slug);
  const skill = registry.get(englishSlug);
  return !!skill?.es;
}

/**
 * Get Spanish equivalent slug for an English slug.
 * Synchronous — uses mappings fallback when registry is not yet loaded.
 */
export function getSpanishSkillSlug(englishSlug: string): string | undefined {
  const skill = registry.get(englishSlug);
  return skill?.es?.slug || getSpanishSkillSlugFromMappings(englishSlug);
}

/**
 * Get English equivalent slug for a Spanish slug.
 * Synchronous — uses mappings only.
 */
export function getEnglishSkillSlug(spanishSlug: string): string {
  return normalizeSkillToEnglishSlug(spanishSlug);
}

function getSpanishSkillSlugFromMappings(englishSlug: string): string | undefined {
  return getSpanishSkillSlugFromMappingsImport(englishSlug);
}

/** Resolve related skill slugs (English) to localized link rows. */
export async function getRelatedSkillLinkRows(
  relatedEnglishSlugs: string[],
  lang: 'en' | 'es',
  limit = 8
): Promise<Array<{ slug: string; title: string }>> {
  await loadAllModules();
  const out: Array<{ slug: string; title: string }> = [];
  for (const slug of relatedEnglishSlugs) {
    if (out.length >= limit) break;
    const s = registry.get(slug);
    if (!s) continue;
    const locSlug = lang === 'es' ? getSpanishSkillSlug(slug) || slug : slug;
    const title = lang === 'es' && s.es ? s.es.title : s.title;
    out.push({ slug: locSlug, title });
  }
  return out;
}
