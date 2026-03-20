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
      slug: 'how-to-write-a-resume',
      title: 'How to Write a Resume: A Complete Guide for Job Seekers (2026)',
      excerpt: 'Master the art of resume writing with proven techniques. Learn how to craft compelling content, powerful summaries, and achievement-focused bullet points that get you hired.',
      category: 'Resume Tips',
      readTime: 8,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/how-to-write-a-resume.png',
    },
    {
      slug: 'how-to-make-a-resume',
      title: 'How to Make a Resume in 2026: Step-by-Step Guide with Examples',
      excerpt: 'Learn how to make a professional resume from scratch. Discover the best tools, formats, and methods to create a resume that passes ATS and impresses hiring managers.',
      category: 'Resume Tips',
      readTime: 8,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/how-to-make-a-resume.png',
    },
    {
      slug: 'how-far-back-should-a-resume-go',
      title: 'How Far Back Should a Resume Go? Expert Guidelines for 2026',
      excerpt: 'Confused about how much work history to include? Get expert guidance on resume length, relevance filtering, and timeline rules based on your career level.',
      category: 'Resume Tips',
      readTime: 6,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/how-far-back-resume.png',
    },
    {
      slug: 'should-i-put-gpa-on-resume',
      title: 'Should I Put My GPA on a Resume? When It Helps and When It Hurts',
      excerpt: 'Wondering if including your GPA will help or hurt your chances? Learn the definitive rules for when to list your GPA, major GPA vs cumulative, and what alternatives to use.',
      category: 'Resume Tips',
      readTime: 5,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/gpa-on-resume.png',
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
      slug: 'how-to-write-a-resume',
      title: 'Cómo Escribir un Currículum: Guía Completa para Buscadores de Empleo (2026)',
      excerpt: 'Domina el arte de escribir currículums con técnicas probadas. Aprende a crear contenido convincente, resúmenes poderosos y puntos de logro que te conseguirán el trabajo.',
      category: 'Consejos de CV',
      readTime: 8,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/how-to-write-a-resume.png',
    },
    {
      slug: 'how-to-make-a-resume',
      title: 'Cómo Hacer un Currículum en 2026: Guía Paso a Paso con Ejemplos',
      excerpt: 'Aprende a hacer un currículum profesional desde cero. Descubre las mejores herramientas, formatos y métodos para crear un CV que pase el ATS e impresione a los reclutadores.',
      category: 'Consejos de CV',
      readTime: 8,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/how-to-make-a-resume.png',
    },
    {
      slug: 'how-far-back-should-a-resume-go',
      title: '¿Qué Tan Lejos Debe Llegar un Currículum? Guías de Expertos para 2026',
      excerpt: '¿Confundido sobre cuánta historia laboral incluir? Obtén orientación experta sobre la longitud del CV, filtrado por relevancia y reglas de cronología según tu nivel profesional.',
      category: 'Consejos de CV',
      readTime: 6,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/how-far-back-resume.png',
    },
    {
      slug: 'should-i-put-gpa-on-resume',
      title: '¿Debo Poner Mi GPA en el Currículum? Cuándo Ayuda y Cuándo Perjudica',
      excerpt: '¿Te preguntas si incluir tu GPA ayudará o perjudicará tus posibilidades? Aprende las reglas definitivas sobre cuándo listar tu GPA, GPA mayor vs acumulado y qué alternativas usar.',
      category: 'Consejos de CV',
      readTime: 5,
      publishDate: '2026-03-15',
      imageUrl: '/images/blog/gpa-on-resume.png',
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
