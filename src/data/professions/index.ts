import type { ResumeData } from '@/types';
import type { TemplateStyleCategory } from '@/utils/templateCatalog';

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
}

const registry = new Map<string, ProfessionPageData>();

export function registerProfessions(professions: ProfessionPageData[]) {
  for (const p of professions) {
    registry.set(p.slug, p);
  }
}

export function getProfessionBySlug(slug: string): ProfessionPageData | undefined {
  return registry.get(slug);
}

export function getAllProfessions(): ProfessionPageData[] {
  return Array.from(registry.values());
}

export function getAllSlugs(): string[] {
  return Array.from(registry.keys());
}

function loadAllModules() {
  const modules = import.meta.glob<{ professions: ProfessionPageData[] }>(
    ['./*.ts', '!./index.ts', '!./_helpers.ts'],
    { eager: true }
  );
  for (const mod of Object.values(modules)) {
    if (mod.professions) {
      registerProfessions(mod.professions);
    }
  }
}

loadAllModules();
