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
    {
      slug: 'resume-tips-for-career-changers',
      title: 'Resume Tips for Career Changers: How to Pivot Successfully',
      excerpt: "Changing careers? Learn how to highlight your transferable skills and write a resume that proves you're ready for the new role.",
      category: 'Career Advice',
      readTime: 6,
      publishDate: '2025-02-06',
      imageUrl: '/images/blog/career-change-resume.png',
    },
    {
      slug: 'common-resume-mistakes',
      title: '5 Common Resume Mistakes That Are Costing You Interviews',
      excerpt: 'Are you making these simple errors? Discover the top 5 resume mistakes candidates make and how to fix them immediately.',
      category: 'Resume Tips',
      readTime: 5,
      publishDate: '2025-02-06',
      imageUrl: '/images/blog/common-resume-mistakes.png',
    },
    {
      slug: 'best-resume-translators',
      title: 'Best Resume Translators in 2026: 8 Tools Compared',
      excerpt: 'Compare the top resume translation tools for applying to jobs abroad. Find out which AI-powered translators preserve formatting, context, and professional tone.',
      category: 'Career Advice',
      readTime: 14,
      publishDate: '2026-02-17',
      imageUrl: '/images/blog/best-resume-translators.png',
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
    {
      slug: 'resume-tips-for-career-changers',
      title: 'Consejos de CV para Cambiar de Carrera: Cómo Pivotar con Éxito',
      excerpt: '¿Cambiando de carrera? Aprende a destacar tus habilidades transferibles y escribe un currículum que demuestre que estás listo para el nuevo rol.',
      category: 'Consejos de Carrera',
      readTime: 6,
      publishDate: '2025-02-06',
      imageUrl: '/images/blog/career-change-resume.png',
    },
    {
      slug: 'common-resume-mistakes',
      title: '5 Errores Comunes en el CV que te Están Costando Entrevistas',
      excerpt: '¿Estás cometiendo estos errores simples? Descubre los 5 errores principales que cometen los candidatos y cómo solucionarlos de inmediato.',
      category: 'Consejos de CV',
      readTime: 5,
      publishDate: '2025-02-06',
      imageUrl: '/images/blog/common-resume-mistakes.png',
    },
    {
      slug: 'best-resume-translators',
      title: 'Mejores Traductores de CV en 2026: 8 Herramientas Comparadas',
      excerpt: 'Compara las mejores herramientas de traducción de CV para aplicar a empleos en el extranjero. Descubre cuáles preservan el formato, el contexto y el tono profesional.',
      category: 'Consejos de Carrera',
      readTime: 14,
      publishDate: '2026-02-17',
      imageUrl: '/images/blog/best-resume-translators.png',
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
