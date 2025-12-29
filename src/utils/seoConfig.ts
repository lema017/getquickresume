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
      title: 'GetQuickResume - Free AI Resume Builder | Create Professional Resumes in Minutes',
      description: 'Create a professional, ATS-optimized resume in minutes with our free AI-powered resume builder. Choose from beautiful templates, get AI-generated content suggestions, and land your dream job.',
      ogType: 'website',
    },
    es: {
      title: 'GetQuickResume - Creador de CV con IA Gratis | Crea tu Currículum Profesional',
      description: 'Crea un currículum profesional optimizado para ATS en minutos con nuestro creador de CV con IA gratuito. Elige entre plantillas hermosas, obtén sugerencias de contenido con IA y consigue el trabajo de tus sueños.',
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

