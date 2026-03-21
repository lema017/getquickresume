import type { ProfessionCategoryId } from './types';

/** Every category with a hub at `/resumes/{id}` */
export const PROFESSION_CATEGORY_HUB_IDS: ProfessionCategoryId[] = [
  'finance',
  'engineering',
  'education',
  'healthcare',
  'sales',
  'operations',
  'design',
  'legal',
  'hospitality',
  'trades',
  'general',
];

const HUB_SET = new Set<string>(PROFESSION_CATEGORY_HUB_IDS);

export function isProfessionCategoryHubId(id: string): id is ProfessionCategoryId {
  return HUB_SET.has(id);
}

export interface ProfessionCategoryHubCopy {
  label: { en: string; es: string };
  pageTitle: { en: string; es: string };
  metaDescription: { en: string; es: string };
  intro: { en: string; es: string };
}

export const PROFESSION_CATEGORY_HUB_COPY: Record<ProfessionCategoryId, ProfessionCategoryHubCopy> = {
  finance: {
    label: { en: 'Finance resume guides', es: 'Guías de CV de finanzas' },
    pageTitle: { en: 'Finance resume examples & guides | GetQuickResume', es: 'Ejemplos y guías de CV de finanzas | GetQuickResume' },
    metaDescription: {
      en: 'Browse accountant, analyst, and controller resume guides with ATS keywords, examples, and role-specific tips.',
      es: 'Explora guías de CV para contadores, analistas y controladores con palabras clave ATS y ejemplos por rol.',
    },
    intro: {
      en: 'Find resume guides tailored to finance roles—reporting, close, audit support, and systems—so your bullets read like a practitioner, not a template.',
      es: 'Encuentra guías de CV para roles de finanzas—reportes, cierre, soporte de auditoría y sistemas—con redacción específica del oficio.',
    },
  },
  engineering: {
    label: { en: 'Engineering resume guides', es: 'Guías de CV de ingeniería' },
    pageTitle: { en: 'Engineering & tech resume examples | GetQuickResume', es: 'Ejemplos de CV de ingeniería y tecnología | GetQuickResume' },
    metaDescription: {
      en: 'Software, DevOps, and technical resume guides with stack-specific language, metrics, and ATS-friendly structure.',
      es: 'Guías de CV para software, DevOps y perfiles técnicos con lenguaje de stack, métricas y estructura ATS.',
    },
    intro: {
      en: 'Ship stronger engineering resumes: tie skills to systems you built, reliability wins, and how you tested and operated production.',
      es: 'Refuerza tu CV técnico: vincula habilidades a sistemas que construiste, mejoras de confiabilidad y operación en producción.',
    },
  },
  education: {
    label: { en: 'Education resume guides', es: 'Guías de CV de educación' },
    pageTitle: { en: 'Education resume examples & guides | GetQuickResume', es: 'Ejemplos y guías de CV de educación | GetQuickResume' },
    metaDescription: {
      en: 'Teacher and education professional resume guides focused on curriculum, assessment, and student outcomes.',
      es: 'Guías de CV para docentes y educación con enfoque en currículo, evaluación y resultados estudiantiles.',
    },
    intro: {
      en: 'Explore guides for teachers and education roles—lesson design, standards, differentiation, and measurable learning impact.',
      es: 'Explora guías para docentes y educación—diseño de lecciones, estándares, diferenciación e impacto medible.',
    },
  },
  healthcare: {
    label: { en: 'Healthcare resume guides', es: 'Guías de CV de salud' },
    pageTitle: { en: 'Healthcare resume examples | GetQuickResume', es: 'Ejemplos de CV de salud | GetQuickResume' },
    metaDescription: {
      en: 'Nursing, clinical, and allied health resume guides with compliance-aware phrasing and role-specific keywords.',
      es: 'Guías de CV para enfermería, clínica y salud aliada con redacción orientada a cumplimiento y palabras clave del rol.',
    },
    intro: {
      en: 'Build healthcare resumes that highlight patient care, protocols, documentation, and the credentials recruiters scan for.',
      es: 'Crea CV de salud que destaquen atención al paciente, protocolos, documentación y credenciales que buscan los reclutadores.',
    },
  },
  sales: {
    label: { en: 'Sales resume guides', es: 'Guías de CV de ventas' },
    pageTitle: { en: 'Sales resume examples & guides | GetQuickResume', es: 'Ejemplos y guías de CV de ventas | GetQuickResume' },
    metaDescription: {
      en: 'Sales, BD, and account resume guides with pipeline, quota, and customer-impact language hiring managers expect.',
      es: 'Guías de CV para ventas, desarrollo de negocio y cuentas con lenguaje de pipeline, cuota e impacto en clientes.',
    },
    intro: {
      en: 'Level up sales resumes with proof of quota attainment, cycle ownership, and how you grew revenue or retention.',
      es: 'Mejora CV de ventas con logros de cuota, ownership del ciclo y cómo crecieron ingresos o retención.',
    },
  },
  operations: {
    label: { en: 'Operations resume guides', es: 'Guías de CV de operaciones' },
    pageTitle: { en: 'Operations & logistics resume examples | GetQuickResume', es: 'Ejemplos de CV de operaciones y logística | GetQuickResume' },
    metaDescription: {
      en: 'Operations, supply chain, and logistics resume guides with throughput, cost, and quality metrics.',
      es: 'Guías de CV para operaciones, cadena de suministro y logística con métricas de throughput, coste y calidad.',
    },
    intro: {
      en: 'Operations resumes should show how you improved throughput, reduced cost or risk, and coordinated cross-functional execution.',
      es: 'Los CV de operaciones deben mostrar mejoras de throughput, coste o riesgo y coordinación entre equipos.',
    },
  },
  design: {
    label: { en: 'Design resume guides', es: 'Guías de CV de diseño' },
    pageTitle: { en: 'Design & creative resume examples | GetQuickResume', es: 'Ejemplos de CV de diseño y creativos | GetQuickResume' },
    metaDescription: {
      en: 'UX, UI, and creative resume guides balancing portfolio storytelling with ATS-readable structure.',
      es: 'Guías de CV para UX, UI y creativos equilibrando portafolio y estructura legible para ATS.',
    },
    intro: {
      en: 'Design guides help you surface process, constraints, and outcomes—not only aesthetics—while staying ATS-friendly.',
      es: 'Las guías de diseño destacan proceso, restricciones y resultados—no solo estética—manteniendo compatibilidad ATS.',
    },
  },
  legal: {
    label: { en: 'Legal resume guides', es: 'Guías de CV legal' },
    pageTitle: { en: 'Legal resume examples | GetQuickResume', es: 'Ejemplos de CV legal | GetQuickResume' },
    metaDescription: {
      en: 'Attorney, paralegal, and legal operations resume guides with matter-type and compliance-aware phrasing.',
      es: 'Guías de CV para abogados, paralegales y operaciones legales con redacción por tipo de asunto y cumplimiento.',
    },
    intro: {
      en: 'Legal resumes need precise matter types, jurisdictions, and tools—without generic “detail-oriented” filler.',
      es: 'Los CV legales requieren tipos de asunto, jurisdicciones y herramientas concretas—sin relleno genérico.',
    },
  },
  hospitality: {
    label: { en: 'Hospitality resume guides', es: 'Guías de CV de hostelería' },
    pageTitle: { en: 'Hospitality resume examples | GetQuickResume', es: 'Ejemplos de CV de hostelería | GetQuickResume' },
    metaDescription: {
      en: 'Hotel, restaurant, and hospitality resume guides with guest experience, service standards, and team leadership.',
      es: 'Guías de CV para hotel, restaurante y hostelería con experiencia del cliente, estándares de servicio y liderazgo.',
    },
    intro: {
      en: 'Hospitality guides emphasize service metrics, peak-volume execution, and how you protected brand standards.',
      es: 'Las guías de hostelería enfatizan métricas de servicio, picos de volumen y estándares de marca.',
    },
  },
  trades: {
    label: { en: 'Trades & technical resume guides', es: 'Guías de CV de oficios y técnica' },
    pageTitle: { en: 'Trades resume examples | GetQuickResume', es: 'Ejemplos de CV de oficios | GetQuickResume' },
    metaDescription: {
      en: 'Skilled trades and field technician resume guides with safety, certifications, and job-site outcomes.',
      es: 'Guías de CV para oficios y técnicos de campo con seguridad, certificaciones y resultados en obra.',
    },
    intro: {
      en: 'Trades resumes should cite tools, codes, safety practices, and measurable job-site or shop-floor wins.',
      es: 'Los CV de oficios deben citar herramientas, normas, seguridad y logros medibles en obra o taller.',
    },
  },
  general: {
    label: { en: 'More resume guides', es: 'Más guías de CV' },
    pageTitle: { en: 'Resume guides by role | GetQuickResume', es: 'Guías de CV por rol | GetQuickResume' },
    metaDescription: {
      en: 'Browse additional profession-specific resume guides, examples, and ATS tips beyond core categories.',
      es: 'Explora guías adicionales de CV por profesión, ejemplos y consejos ATS fuera de las categorías principales.',
    },
    intro: {
      en: 'Roles that span many domains land here—each guide still adds role-specific responsibilities, tools, and keyword context.',
      es: 'Roles que cruzan varios dominios están aquí—cada guía añade responsabilidades, herramientas y contexto de palabras clave.',
    },
  },
};
