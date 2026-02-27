/**
 * SEO Configuration Utility
 * Centralized SEO management for GetQuickResume
 */

const BASE_URL = 'https://getquickresume.com';
const SITE_NAME = 'GetQuickResume';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default.png`;

export interface SEOConfig {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

export interface PageSEO {
  en: SEOConfig;
  es: SEOConfig;
}

/**
 * SEO configurations for each public page
 */
export const pageSEO: Record<string, PageSEO> = {
  home: {
    en: {
      title: 'Free AI Resume Builder, Templates, ATS & Translation | GetQuickResume',
      description: 'Get more interviews with an ATS-optimized resume tailored to real job postings. Free AI resume builder with ATS checker, resume templates, and resume translation. Start free today.',
      ogType: 'website',
    },
    es: {
      title: 'GetQuickResume - Verificador ATS y Creador de CV con IA | Adapta tu CV a Descripciones de Trabajo',
      description: 'Consigue más entrevistas con un CV optimizado para ATS y adaptado a ofertas reales. Creador de CV con IA gratis, verificador ATS, plantillas profesionales y traducción de CV. Comienza gratis hoy.',
      ogType: 'website',
    },
  },
  pricing: {
    en: {
      title: 'Pricing Plans - GetQuickResume | Free & Premium Resume Builder',
      description: 'Choose the perfect plan for your resume needs. Start free with our AI resume builder or upgrade to Premium for unlimited templates, AI enhancements, and priority support.',
      ogType: 'website',
    },
    es: {
      title: 'Planes y Precios - GetQuickResume | Creador de CV Gratis y Premium',
      description: 'Elige el plan perfecto para tus necesidades de currículum. Comienza gratis con nuestro creador de CV con IA o actualiza a Premium para plantillas ilimitadas, mejoras con IA y soporte prioritario.',
      ogType: 'website',
    },
  },
  about: {
    en: {
      title: 'About Us - GetQuickResume | Our Mission to Help Job Seekers',
      description: 'Learn about GetQuickResume and our mission to help job seekers create professional resumes quickly and easily. Our AI-powered platform makes resume building accessible to everyone.',
      ogType: 'website',
    },
    es: {
      title: 'Sobre Nosotros - GetQuickResume | Nuestra Misión de Ayudar a los Buscadores de Empleo',
      description: 'Conoce GetQuickResume y nuestra misión de ayudar a los buscadores de empleo a crear currículums profesionales de forma rápida y fácil. Nuestra plataforma con IA hace que crear un CV sea accesible para todos.',
      ogType: 'website',
    },
  },
  contact: {
    en: {
      title: 'Contact Us - GetQuickResume | Get Help & Support',
      description: 'Have questions about GetQuickResume? Contact our support team for help with your resume, account, or any other inquiries. We\'re here to help you succeed.',
      ogType: 'website',
    },
    es: {
      title: 'Contáctanos - GetQuickResume | Obtén Ayuda y Soporte',
      description: '¿Tienes preguntas sobre GetQuickResume? Contacta a nuestro equipo de soporte para ayuda con tu currículum, cuenta o cualquier otra consulta. Estamos aquí para ayudarte a tener éxito.',
      ogType: 'website',
    },
  },
  blog: {
    en: {
      title: 'Resume Tips & Career Advice Blog - GetQuickResume',
      description: 'Expert resume writing tips, career advice, and job search strategies. Learn how to create an ATS-friendly resume, ace interviews, and advance your career.',
      ogType: 'website',
    },
    es: {
      title: 'Blog de Consejos de CV y Carrera - GetQuickResume',
      description: 'Consejos expertos para escribir tu currículum, consejos de carrera y estrategias de búsqueda de empleo. Aprende a crear un CV optimizado para ATS, destacar en entrevistas y avanzar en tu carrera.',
      ogType: 'website',
    },
  },
  login: {
    en: {
      title: 'Sign In - GetQuickResume | Access Your Resume Dashboard',
      description: 'Sign in to GetQuickResume to access your resume dashboard, edit your resumes, and manage your account. Create a free account to get started.',
      noIndex: true,
    },
    es: {
      title: 'Iniciar Sesión - GetQuickResume | Accede a tu Panel de CV',
      description: 'Inicia sesión en GetQuickResume para acceder a tu panel de currículums, editar tus CVs y gestionar tu cuenta. Crea una cuenta gratis para comenzar.',
      noIndex: true,
    },
  },
  resumeForJobDescription: {
    en: {
      title: 'Resume Tailored to Job Description - Match What Employers Want | GetQuickResume',
      description: 'Stop sending generic resumes. Paste a job description and tailor your resume to match keywords, requirements, and ATS filters. Free to start.',
      ogType: 'website',
    },
    es: {
      title: 'CV Adaptado a la Descripción del Puesto - Lo Que Buscan los Empleadores | GetQuickResume',
      description: 'Deja de enviar CVs genéricos. Pega una descripción del puesto y adapta tu CV para coincidir con palabras clave, requisitos y filtros ATS. Gratis para comenzar.',
      ogType: 'website',
    },
  },
  atsResumeChecker: {
    en: {
      title: 'Free ATS Resume Checker — Get Your Score Now | GetQuickResume',
      description: 'Is your resume getting past ATS filters? Check your score in 10 seconds — get keyword analysis, missing sections & actionable tips. 100% free, no sign-up.',
      ogType: 'website',
    },
    es: {
      title: 'Verificador ATS de CV Gratis — Prueba tu Currículum Contra Sistemas de Contratación | GetQuickResume',
      description: 'Verifica si tu CV pasa los filtros ATS usados por empleadores. Obtén tu puntuación de compatibilidad ATS, palabras clave faltantes y consejos de mejora — gratis para empezar.',
      ogType: 'website',
    },
  },
  resumeTranslator: {
    en: {
      title: 'Free Resume Translator — Translate Your CV to 10+ Languages Instantly | GetQuickResume',
      description: 'Translate your resume into any language in seconds — keep your professional tone, achievements, and ATS-friendly formatting intact. No sign-up required. Try it free.',
      ogType: 'website',
    },
    es: {
      title: 'Traducción de CV — Traduce tu Currículum para Trabajos Globales | GetQuickResume',
      description: 'Traduce tu CV a más de 10 idiomas sin perder el tono profesional, logros ni la estructura compatible con ATS. Gratis para comenzar.',
      ogType: 'website',
    },
  },
  aiResumeBuilder: {
    en: {
      title: 'AI Resume Builder — Create a Professional Resume in Minutes | GetQuickResume',
      description: 'Generate a recruiter-ready resume from your real experience, optimize for ATS, and tailor it for the jobs you want. Free AI resume builder.',
      ogType: 'website',
    },
    es: {
      title: 'Creador de CV con IA — Crea un Currículum Profesional en Minutos | GetQuickResume',
      description: 'Genera un currículum listo para reclutadores desde tu experiencia real, optimiza para ATS y adáptalo a los trabajos que deseas. Creador de CV con IA gratis.',
      ogType: 'website',
    },
  },
  resumeTemplates: {
    en: {
      title: 'Professional Resume Templates — ATS-Friendly & Recruiter-Ready | GetQuickResume',
      description: 'Choose from our collection of professional, ATS-friendly resume templates designed for modern job seekers. Clean layouts that hiring systems can read.',
      ogType: 'website',
    },
    es: {
      title: 'Plantillas de CV Profesionales — Compatibles con ATS | GetQuickResume',
      description: 'Elige entre nuestra colección de plantillas de CV profesionales y compatibles con ATS, diseñadas para el mercado laboral actual.',
      ogType: 'website',
    },
  },
  premium: {
    en: {
      title: 'Premium Features - GetQuickResume | Unlimited Resumes & AI Enhancements',
      description: 'Upgrade to Premium for unlimited resumes, AI-powered enhancements, priority support, and exclusive templates. Start your free trial today.',
      ogType: 'website',
    },
    es: {
      title: 'Características Premium - GetQuickResume | CVs Ilimitados y Mejoras con IA',
      description: 'Actualiza a Premium para CVs ilimitados, mejoras con IA, soporte prioritario y plantillas exclusivas. Comienza tu prueba gratis hoy.',
      ogType: 'website',
    },
  },
  support: {
    en: {
      title: 'Support & Help Center - GetQuickResume | Get Assistance with Your Resume',
      description: 'Get help with your resume, account, or any questions about GetQuickResume. Our support team is here to assist you with creating professional resumes.',
      ogType: 'website',
    },
    es: {
      title: 'Centro de Soporte y Ayuda - GetQuickResume | Obtén Asistencia con tu CV',
      description: 'Obtén ayuda con tu currículum, cuenta o cualquier pregunta sobre GetQuickResume. Nuestro equipo de soporte está aquí para ayudarte a crear CVs profesionales.',
      ogType: 'website',
    },
  },
  privacy: {
    en: {
      title: 'Privacy Policy - GetQuickResume | How We Protect Your Data',
      description: 'Read our privacy policy to understand how GetQuickResume collects, uses, and protects your personal information and resume data.',
      ogType: 'article',
    },
    es: {
      title: 'Política de Privacidad - GetQuickResume | Cómo Protegemos tus Datos',
      description: 'Lee nuestra política de privacidad para entender cómo GetQuickResume recopila, usa y protege tu información personal y datos de currículum.',
      ogType: 'article',
    },
  },
  terms: {
    en: {
      title: 'Terms of Service - GetQuickResume | User Agreement & Legal Terms',
      description: 'Read our terms of service to understand the rules and guidelines for using GetQuickResume. Learn about your rights and responsibilities as a user.',
      ogType: 'article',
    },
    es: {
      title: 'Términos de Servicio - GetQuickResume | Acuerdo de Usuario y Términos Legales',
      description: 'Lee nuestros términos de servicio para entender las reglas y pautas para usar GetQuickResume. Conoce tus derechos y responsabilidades como usuario.',
      ogType: 'article',
    },
  },
  refund: {
    en: {
      title: 'Refund Policy - GetQuickResume | Return & Refund Information',
      description: 'Review our refund policy to understand our return and refund procedures for GetQuickResume Premium subscriptions and services.',
      ogType: 'article',
    },
    es: {
      title: 'Política de Reembolso - GetQuickResume | Información de Devoluciones y Reembolsos',
      description: 'Revisa nuestra política de reembolso para entender nuestros procedimientos de devolución y reembolso para suscripciones y servicios Premium de GetQuickResume.',
      ogType: 'article',
    },
  },
};

/**
 * Build canonical URL for a page
 */
export function buildCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Get SEO config for a page based on language
 */
export function getPageSEO(pageKey: string, lang: 'en' | 'es' = 'en'): SEOConfig {
  const pageConfig = pageSEO[pageKey];
  if (!pageConfig) {
    return {
      title: `${SITE_NAME} - AI Resume Builder`,
      description: 'Create professional resumes with AI assistance.',
    };
  }
  return pageConfig[lang];
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description: 'AI-powered resume builder helping job seekers create professional, ATS-optimized resumes.',
    foundingDate: '2024',
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${BASE_URL}/contact`,
    },
  };
}

/**
 * Generate WebSite structured data
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: 'Free AI-powered resume builder. Create professional, ATS-optimized resumes in minutes.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate SoftwareApplication structured data
 */
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Resume Builder',
    operatingSystem: 'Web Browser',
    url: BASE_URL,
    description: 'AI-powered resume builder that helps you create professional, ATS-optimized resumes in minutes.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free tier with essential resume building features',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'AI-powered content suggestions',
      'ATS-optimized templates',
      'Multiple language support',
      'PDF export',
      'Real-time preview',
      'Professional templates',
    ],
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate HowTo structured data for tutorial articles
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[],
  totalTime?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime: totalTime || 'PT10M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate Article structured data
 */
export function generateArticleSchema(
  headline: string,
  description: string,
  datePublished: string,
  dateModified?: string,
  imageUrl?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    image: imageUrl ? `${BASE_URL}${imageUrl}` : undefined,
    author: {
      '@type': 'Organization',
      name: `${SITE_NAME} Team`,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
    },
  };
}

/**
 * Generate Person structured data for resume pages
 */
export function generatePersonSchema(
  name: string,
  jobTitle?: string,
  description?: string,
  email?: string,
  url?: string,
  sameAs?: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    email,
    url,
    sameAs: sameAs || [],
  };
}

/**
 * Common FAQs for the landing/pricing pages
 */
export const commonFAQs = {
  en: [
    {
      question: 'Is GetQuickResume really free?',
      answer: 'Yes! GetQuickResume offers a free tier that allows you to create one professional resume with access to free templates and AI-powered content suggestions. Premium plans offer additional features like unlimited resumes and more templates.',
    },
    {
      question: 'What is ATS and why does it matter for my resume?',
      answer: 'ATS (Applicant Tracking System) is software used by employers to scan and filter resumes. Our templates are designed to be ATS-friendly, ensuring your resume passes through these systems and reaches human recruiters.',
    },
    {
      question: 'How does the AI help me write my resume?',
      answer: 'Our AI analyzes your experience and skills to generate professional summary suggestions, achievement bullet points, and optimized content that highlights your qualifications effectively.',
    },
    {
      question: 'Can I download my resume as a PDF?',
      answer: 'Yes! You can download your completed resume as a high-quality PDF file, ready to submit to employers or upload to job application portals.',
    },
    {
      question: 'What languages does GetQuickResume support?',
      answer: 'GetQuickResume currently supports English and Spanish. You can create your resume in either language and switch between them at any time.',
    },
  ],
  es: [
    {
      question: '¿GetQuickResume es realmente gratis?',
      answer: '¡Sí! GetQuickResume ofrece un plan gratuito que te permite crear un currículum profesional con acceso a plantillas gratis y sugerencias de contenido con IA. Los planes Premium ofrecen características adicionales como currículums ilimitados y más plantillas.',
    },
    {
      question: '¿Qué es ATS y por qué importa para mi currículum?',
      answer: 'ATS (Sistema de Seguimiento de Candidatos) es un software usado por empleadores para escanear y filtrar currículums. Nuestras plantillas están diseñadas para ser compatibles con ATS, asegurando que tu CV pase estos sistemas y llegue a reclutadores humanos.',
    },
    {
      question: '¿Cómo me ayuda la IA a escribir mi currículum?',
      answer: 'Nuestra IA analiza tu experiencia y habilidades para generar sugerencias de resumen profesional, puntos de logros y contenido optimizado que destaca tus cualificaciones de manera efectiva.',
    },
    {
      question: '¿Puedo descargar mi currículum como PDF?',
      answer: '¡Sí! Puedes descargar tu currículum completado como un archivo PDF de alta calidad, listo para enviar a empleadores o subir a portales de empleo.',
    },
    {
      question: '¿Qué idiomas soporta GetQuickResume?',
      answer: 'GetQuickResume actualmente soporta inglés y español. Puedes crear tu currículum en cualquier idioma y cambiar entre ellos en cualquier momento.',
    },
  ],
};

export { BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE };

