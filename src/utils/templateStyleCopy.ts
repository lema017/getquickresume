import type { TemplateStyleCategory } from '@/utils/templateCatalog';

/**
 * Short, non-duplicative copy blocks per template style (Phase 3 — content differentiation).
 */
export function getTemplateStyleIntro(
  style: TemplateStyleCategory,
  lang: 'en' | 'es' = 'en'
): { heading: string; body: string } {
  if (lang === 'es') {
    switch (style) {
      case 'creative':
        return {
          heading: 'Diseños creativos que siguen siendo legibles para ATS',
          body:
            'Estas plantillas combinan personalidad con una estructura clara para que los sistemas lean bien tus secciones, habilidades y logros, sin perder un aspecto moderno.',
        };
      case 'professional':
        return {
          heading: 'Estructura clásica y fácil de escanear',
          body:
            'Jerarquía y espaciado tradicionales ayudan a reclutadores a revisar rápido: resumen, experiencia, habilidades y formación se encuentran al instante en PDF y en ATS.',
        };
      case 'regular':
      default:
        return {
          heading: 'Plantillas versátiles para la mayoría de roles',
          body:
            'Tipografía limpia y buen uso del espacio funcionan en muchas industrias: ajusta secciones y viñetas manteniendo una primera impresión profesional.',
        };
    }
  }

  switch (style) {
    case 'creative':
      return {
        heading: 'Creative layouts that still pass ATS',
        body:
          'These templates balance personality with clear section structure so scanners can read your headings, skills, and impact—without sacrificing a polished, modern look.',
      };
    case 'professional':
      return {
        heading: 'Classic, recruiter-friendly structure',
        body:
          'Traditional hierarchy and spacing help hiring managers skim fast: summary, experience, skills, and education stay easy to find in both PDF and ATS views.',
      };
    case 'regular':
    default:
      return {
        heading: 'Flexible templates for most roles',
        body:
          'Clean typography and balanced white space work across industries—tweak sections and bullets while keeping a consistent, professional first impression.',
      };
  }
}
