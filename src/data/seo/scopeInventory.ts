import { ensureProfessionsLoaded, getAllSlugsBilingual } from '@/data/professions';
import { ensureSkillsLoaded, getAllSkillSlugsBilingual } from '@/data/skills';
import { SEO_BLOG_SLUGS, SEO_STATIC_PATHS } from '@/data/seo/staticSitemapPaths';

export interface SeoScopeSnapshot {
  staticPaths: readonly string[];
  blogSlugs: readonly string[];
  professions: { en: string[]; es: string[] };
  skills: { en: string[]; es: string[] };
  counts: {
    staticUrls: number;
    blogUrls: number;
    professionUrlsEn: number;
    professionUrlsEs: number;
    skillUrlsEn: number;
    skillUrlsEs: number;
  };
}

/**
 * Async snapshot of all indexable programmatic + static paths (for QA / tooling).
 */
export async function getSeoScopeSnapshot(): Promise<SeoScopeSnapshot> {
  await Promise.all([ensureProfessionsLoaded(), ensureSkillsLoaded()]);
  const professions = await getAllSlugsBilingual();
  const skills = await getAllSkillSlugsBilingual();

  return {
    staticPaths: SEO_STATIC_PATHS,
    blogSlugs: SEO_BLOG_SLUGS,
    professions,
    skills,
    counts: {
      staticUrls: SEO_STATIC_PATHS.length,
      blogUrls: SEO_BLOG_SLUGS.length,
      professionUrlsEn: professions.en.length,
      professionUrlsEs: professions.es.length,
      skillUrlsEn: skills.en.length,
      skillUrlsEs: skills.es.length,
    },
  };
}
