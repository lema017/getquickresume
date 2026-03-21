/** Mirrors `scripts/generate-sitemap.mjs` — single source for inventory & docs. */

export const SEO_BLOG_SLUGS = [
  'how-to-make-good-resume',
  'what-is-ats-system',
  'resume-tips-for-career-changers',
  'common-resume-mistakes',
  'how-to-write-a-resume',
  'how-to-make-a-resume',
  'how-far-back-should-a-resume-go',
  'should-i-put-gpa-on-resume',
] as const;

export const SEO_STATIC_PATHS = [
  '/',
  '/create',
  '/pricing',
  '/ats-resume-checker',
  '/resume-translator',
  '/blog',
  '/about',
  '/contact',
  '/premium',
  '/resumes/finance',
  '/resumes/engineering',
  '/resumes/education',
  '/resumes/healthcare',
  '/resumes/sales',
  '/resumes/operations',
  '/resumes/design',
  '/resumes/legal',
  '/resumes/hospitality',
  '/resumes/trades',
  '/resumes/general',
] as const;

export type SeoBlogSlug = (typeof SEO_BLOG_SLUGS)[number];
export type SeoStaticPath = (typeof SEO_STATIC_PATHS)[number];
