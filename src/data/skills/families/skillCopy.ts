import type { SkillFamilyId } from '../types';

type Lang = 'en' | 'es';

interface SkillFamilyNarrative {
  heroLead: (title: string) => string;
  mistakeTemplates: string[];
  howToTemplates: (title: string) => string[];
}

const EN: Record<SkillFamilyId, SkillFamilyNarrative> = {
  technical: {
    heroLead: (t) =>
      `Recruiters scan for ${t} tied to systems, scale, and proof—not a keyword laundry list disconnected from shipped work.`,
    mistakeTemplates: [
      'Listing tools with no metric, release, or environment context.',
      'Claiming expert-level stacks you cannot explain in an interview loop.',
      'Hiding collaboration with security, data, or platform teams when it mattered.',
    ],
    howToTemplates: (title) => [
      `Pair ${title} with the service, dataset, or user flow you improved.`,
      `Name the constraint: latency, cost, reliability, or compliance you optimized using ${title}.`,
      `Show tests, reviews, or telemetry that kept ${title} honest in production.`,
    ],
  },
  soft: {
    heroLead: (t) =>
      `Strong ${t} bullets show behavior under pressure, stakeholders served, and outcomes—not adjectives alone.`,
    mistakeTemplates: [
      '“Great communicator” with no example of audiences, channels, or conflict handled.',
      'Leadership claims without team size, coaching, or decision scope.',
      'Duplicate soft skills repeated across every role with no nuance.',
    ],
    howToTemplates: (title) => [
      `Tie ${title} to a situation: who was involved, what was at risk, what changed.`,
      `Quantify reach: accounts, escalations prevented, CSAT, or cycle time tied to ${title}.`,
      `Show ${title} in cross-functional moments: product, ops, or exec alignment.`,
    ],
  },
  industry: {
    heroLead: (t) =>
      `Industry-specific ${t} should reference regulations, customer segments, and workflows hiring managers recognize.`,
    mistakeTemplates: [
      'Buzzwords without domain nouns that prove you worked in the field.',
      'Ignoring certifications or licenses that gate the role.',
      'Generic bullets that could fit any vertical.',
    ],
    howToTemplates: (title) => [
      `Anchor ${title} to the customer segment, geography, or product line you supported.`,
      `Reference policies, standards, or risk themes where ${title} mattered.`,
      `Pair ${title} with tools or data sources insiders expect on the resume.`,
    ],
  },
  tools: {
    heroLead: (t) =>
      `Tooling skills like ${t} land when paired with workflows automated, defects reduced, or time saved.`,
    mistakeTemplates: [
      'Tool names without what you built, fixed, or measured with them.',
      'Version soup with no depth on one production-critical workflow.',
      'Ignoring permissions, governance, or handoff to other teams.',
    ],
    howToTemplates: (title) => [
      `Describe the artifact you produced with ${title}: dashboard, integration, template, or report.`,
      `Connect ${title} to stakeholders who consumed the output.`,
      `Mention quality checks: validation, UAT, or monitoring tied to ${title}.`,
    ],
  },
};

const ES: Record<SkillFamilyId, SkillFamilyNarrative> = {
  technical: {
    heroLead: (t) =>
      `Los reclutadores buscan ${t} ligado a sistemas, escala y pruebas, no una lista de palabras sin trabajo entregado.`,
    mistakeTemplates: [
      'Herramientas sin métrica, release o entorno.',
      'Stacks “expertos” que no puedes explicar en entrevista.',
      'Ocultar colaboración con seguridad, datos o plataforma cuando importó.',
    ],
    howToTemplates: (title) => [
      `Une ${title} al servicio, dataset o flujo de usuario que mejoraste.`,
      `Nombra la restricción: latencia, coste, fiabilidad o cumplimiento que optimizaste con ${title}.`,
      `Muestra pruebas, revisiones o telemetría que mantuvieron ${title} bajo control en producción.`,
    ],
  },
  soft: {
    heroLead: (t) =>
      `Las viñetas fuertes de ${t} muestran comportamiento bajo presión, stakeholders y resultados, no solo adjetivos.`,
    mistakeTemplates: [
      '“Gran comunicador” sin audiencias, canales o conflictos resueltos.',
      'Liderazgo sin tamaño de equipo, mentoría o alcance de decisiones.',
      'Mismas soft skills repetidas en cada rol sin matices.',
    ],
    howToTemplates: (title) => [
      `Vincula ${title} a una situación: quién intervino, qué riesgo había, qué cambió.`,
      `Cuantifica alcance: cuentas, escalaciones evitadas, CSAT o plazos ligados a ${title}.`,
      `Muestra ${title} en momentos cross: producto, operaciones o dirección.`,
    ],
  },
  industry: {
    heroLead: (t) =>
      `${t} sectorial debe citar normativas, segmentos y flujos que los hiring managers reconocen.`,
    mistakeTemplates: [
      'Modas sin sustantivos de dominio que demuestren experiencia en el sector.',
      'Ignorar certificaciones o licencias que filtran el puesto.',
      'Viñetas genéricas válidas para cualquier vertical.',
    ],
    howToTemplates: (title) => [
      `Ancla ${title} al segmento de cliente, geografía o línea de producto que apoyaste.`,
      `Menciona políticas, estándares o riesgos donde ${title} fue relevante.`,
      `Une ${title} a herramientas o fuentes de datos que los insiders esperan ver.`,
    ],
  },
  tools: {
    heroLead: (t) =>
      `Habilidades de herramienta como ${t} funcionan cuando citas flujos automatizados, defectos reducidos o tiempo ahorrado.`,
    mistakeTemplates: [
      'Nombres de herramienta sin lo que construiste, arreglaste o mediste.',
      'Sopa de versiones sin profundidad en un flujo crítico en producción.',
      'Ignorar permisos, gobierno o traspaso a otros equipos.',
    ],
    howToTemplates: (title) => [
      `Describe el artefacto que produjiste con ${title}: dashboard, integración, plantilla o informe.`,
      `Conecta ${title} con stakeholders que consumieron el resultado.`,
      `Menciona calidad: validación, UAT o monitorización ligada a ${title}.`,
    ],
  },
};

export function getSkillFamilyNarrative(family: SkillFamilyId, lang: Lang): SkillFamilyNarrative {
  return lang === 'es' ? ES[family] : EN[family];
}
