import { ArticleMeta } from '@/components/blog/ArticleCard';

// Type for supported languages
export type SupportedLanguage = 'en' | 'es';

// Articles organized by language
export const articles: Record<SupportedLanguage, ArticleMeta[]> = {
  en: [
    {
      slug: 'how-to-make-good-resume',
      title: 'How to Create a Resume That Gets You Hired: The Complete Guide',
      excerpt: 'Learn the essential elements of a winning resume, from formatting best practices to action verbs that impress recruiters. Your step-by-step guide to landing more interviews.',
      category: 'Resume Tips',
      readTime: 8,
      publishDate: '2024-12-20',
      imageUrl: '/images/blog/getquickresume-blog1.png',
    },
    {
      slug: 'what-is-ats-system',
      title: 'What is ATS? How Applicant Tracking Systems Work (And How to Beat Them)',
      excerpt: 'Discover how 75% of resumes never reach human eyes and learn proven strategies to optimize your resume for Applicant Tracking Systems used by top employers.',
      category: 'Job Search',
      readTime: 7,
      publishDate: '2024-12-22',
      imageUrl: '/images/blog/getquickresume-blog2.png',
    },
  ],
  es: [
    {
      slug: 'how-to-make-good-resume',
      title: 'Cómo Crear un Currículum que te Consiga el Trabajo: La Guía Completa',
      excerpt: 'Aprende los elementos esenciales de un currículum ganador, desde las mejores prácticas de formato hasta los verbos de acción que impresionan a los reclutadores. Tu guía paso a paso para conseguir más entrevistas.',
      category: 'Consejos de CV',
      readTime: 8,
      publishDate: '2024-12-20',
      imageUrl: '/images/blog/getquickresume-blog1.png',
    },
    {
      slug: 'what-is-ats-system',
      title: '¿Qué es ATS? Cómo Funcionan los Sistemas de Seguimiento de Candidatos (Y Cómo Superarlos)',
      excerpt: 'Descubre cómo el 75% de los currículums nunca llegan a ojos humanos y aprende estrategias probadas para optimizar tu CV para los Sistemas de Seguimiento de Candidatos que usan los principales empleadores.',
      category: 'Búsqueda de Empleo',
      readTime: 7,
      publishDate: '2024-12-22',
      imageUrl: '/images/blog/getquickresume-blog2.png',
    },
  ],
};

export function getArticleBySlug(slug: string, lang: SupportedLanguage = 'en'): ArticleMeta | undefined {
  return articles[lang].find(article => article.slug === slug);
}

export function getRelatedArticles(currentSlug: string, lang: 'en' | 'es' = 'en', limit: number = 2): ArticleMeta[] {
  return articles[lang]
    .filter(article => article.slug !== currentSlug)
    .slice(0, limit);
}
