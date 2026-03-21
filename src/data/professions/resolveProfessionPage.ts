import type { ResumeData } from '@/types';
import type {
  AtsKeywordEntry,
  ProfessionCategoryId,
  ProfessionContentBody,
  ProfessionSEOOverrides,
  ResolvedProfessionPage,
  SkillInContext,
} from './types';
import { getProfessionCategoryNarrative } from './categories/copy';
import { inferProfessionCategory } from './professionCategoryInference';

/** Matches `ProfessionPageData` fields used here (avoids circular import from index). */
export type ProfessionPageDataInput = {
  slug: string;
  title: string;
  categoryId?: ProfessionCategoryId;
  keywords: string[];
  searchIntents: string[];
  topSkills: string[];
  atsKeywords: string[];
  sampleResumeData: ResumeData;
  content?: Partial<ProfessionContentBody>;
  seo?: ProfessionSEOOverrides;
};

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function padOverview(
  base: string,
  profession: Pick<ProfessionPageDataInput, 'title' | 'keywords' | 'searchIntents' | 'topSkills'>,
  lang: 'en' | 'es'
): string {
  const kw = profession.keywords.slice(0, 10).join(', ');
  const intents = profession.searchIntents.slice(0, 4).join(' · ');
  const skills = profession.topSkills.slice(0, 12).join(', ');
  const extraEn = ` Job seekers researching ${intents} should align bullets with those themes. Recruiters also scan for these capability signals: ${skills}. Representative search phrases tied to this title include: ${kw}. Use the template preview below to keep layout ATS-clean while you tailor phrasing to your experience.`;
  const extraEs = ` Quienes buscan ${intents} deberían alinear sus viñetas con esos temas. Los reclutadores también buscan estas capacidades: ${skills}. Frases de búsqueda representativas: ${kw}. Usa la vista previa de plantilla para mantener un diseño compatible con ATS mientras adaptas el texto a tu experiencia.`;
  let out = base + (lang === 'es' ? extraEs : extraEn);
  let guard = 0;
  while (wordCount(out) < 120 && guard < 3) {
    out += lang === 'es'
      ? ` Refuerza cada afirmación de tu CV de ${profession.title} con herramientas, entregables y métricas verificables.`
      : ` Reinforce every claim on your ${profession.title} resume with tools, deliverables, and verifiable metrics.`;
    guard++;
  }
  return out;
}

function bulletsFromExperience(resume: ResumeData, min: number): string[] {
  const out: string[] = [];
  for (const exp of resume.experience) {
    for (const a of exp.achievements) {
      if (a.trim()) out.push(a.trim());
    }
  }
  if (out.length >= min) return out.slice(0, 12);
  return out;
}

function mergeContent(
  derived: ProfessionContentBody,
  partial?: Partial<ProfessionContentBody>
): ProfessionContentBody {
  if (!partial) return derived;
  const pick = <T>(d: T, p: T | undefined, empty: (x: T) => boolean): T =>
    p !== undefined && !empty(p) ? p : d;

  const arr = (d: string[], p?: string[]) => (p && p.length > 0 ? p : d);
  const arrSkill = (d: SkillInContext[], p?: SkillInContext[]) => (p && p.length > 0 ? p : d);
  const arrAts = (d: AtsKeywordEntry[], p?: AtsKeywordEntry[]) => (p && p.length > 0 ? p : d);
  const arrCert = (
    d: Array<{ name: string; note?: string }>,
    p?: Array<{ name: string; note?: string }>
  ) => (p && p.length > 0 ? p : d);

  return {
    heroTagline: pick(derived.heroTagline, partial.heroTagline, (s) => !s.trim()),
    entityFocus: arr(derived.entityFocus, partial.entityFocus),
    overview: pick(derived.overview, partial.overview, (s) => wordCount(s) < 80),
    responsibilities: arr(derived.responsibilities, partial.responsibilities),
    tools: arr(derived.tools, partial.tools),
    skillsInContext: arrSkill(derived.skillsInContext, partial.skillsInContext),
    atsKeywords: arrAts(derived.atsKeywords, partial.atsKeywords),
    resumeMistakes: arr(derived.resumeMistakes, partial.resumeMistakes),
    certifications: arrCert(derived.certifications, partial.certifications),
    suggestedBullets: arr(derived.suggestedBullets, partial.suggestedBullets),
    relatedSlugs: arr(derived.relatedSlugs, partial.relatedSlugs),
  };
}

function buildDerivedProfessionContent(
  profession: ProfessionPageDataInput,
  categoryId: ProfessionCategoryId,
  lang: 'en' | 'es'
): ProfessionContentBody {
  const narrative = getProfessionCategoryNarrative(categoryId, lang);
  const { title, topSkills, atsKeywords, sampleResumeData } = profession;

  const heroTagline = narrative.heroTagline(title);
  const overviewRaw = `${narrative.overviewLead(title)} ${narrative.overviewMid(title)}`;
  const overview = padOverview(overviewRaw, profession, lang);

  const responsibilities = topSkills.slice(0, 8).map((skill) => narrative.responsibilityTemplate(title, skill));

  const tools = Array.from(new Set([...atsKeywords.slice(0, 5), ...topSkills.slice(0, 4)])).slice(0, 8);

  const tpls = narrative.skillContextTemplates;
  const skillsInContext: SkillInContext[] = topSkills.slice(0, 10).map((skill, i) => ({
    name: skill,
    context: tpls[i % tpls.length](title, skill),
  }));

  const atsEntries: AtsKeywordEntry[] = atsKeywords.map((term, i) => ({
    term,
    hint:
      i < 10
        ? lang === 'es'
          ? `Incluye ${term} junto a un resultado o alcance concreto en tu experiencia como ${title}.`
          : `Pair ${term} with a concrete scope or outcome from your ${title} experience.`
        : undefined,
  }));

  const resumeMistakes = narrative.mistakeTemplates.map((m) => m.replace(/\{title\}/g, title));

  const certs = (sampleResumeData.certifications ?? []).slice(0, 6).map((c) => ({
    name: c.name,
    note:
      lang === 'es'
        ? 'Menciona emisor y vigencia si el puesto lo exige.'
        : 'Include issuer and timeframe when the role expects it.',
  }));

  let suggested = bulletsFromExperience(sampleResumeData, 6);
  if (suggested.length < 6) {
    const fillerEn = topSkills.slice(0, 6).map(
      (s) => `Delivered ${title} outcomes by applying ${s} across core workflows and measurable milestones.`
    );
    const fillerEs = topSkills.slice(0, 6).map(
      (s) => `Generé resultados como ${title} aplicando ${s} en flujos clave y hitos medibles.`
    );
    suggested = [...suggested, ...(lang === 'es' ? fillerEs : fillerEn)];
  }
  suggested = suggested.slice(0, 12);

  const entityFocus = atsKeywords.slice(0, 6);

  return {
    heroTagline,
    entityFocus,
    overview,
    responsibilities,
    tools,
    skillsInContext,
    atsKeywords: atsEntries,
    resumeMistakes,
    certifications: certs,
    suggestedBullets: suggested,
    relatedSlugs: [],
  };
}

/**
 * Resolved rich content + SEO overrides for the current locale snapshot on `profession`.
 */
export function resolveProfessionPage(
  profession: ProfessionPageDataInput,
  lang: 'en' | 'es'
): ResolvedProfessionPage {
  const categoryId = inferProfessionCategory(profession);
  const derived = buildDerivedProfessionContent(profession, categoryId, lang);
  const merged = mergeContent(derived, profession.content);
  return {
    categoryId,
    content: merged,
    seo: profession.seo,
  };
}

export function buildProfessionSeoOverrides(
  profession: ProfessionPageDataInput,
  resolved: ResolvedProfessionPage,
  lang: 'en' | 'es'
): ProfessionSEOOverrides {
  const manual = profession.seo ?? resolved.seo;
  if (manual?.metaTitle?.trim() && manual?.metaDescription?.trim()) {
    return {
      metaTitle: manual.metaTitle,
      metaDescription: manual.metaDescription,
      ogTitle: manual.ogTitle,
    };
  }
  const { title } = profession;
  const focus = resolved.content.entityFocus.slice(0, 4).join(', ');
  const year = new Date().getFullYear();
  if (lang === 'es') {
    return {
      metaTitle: `Currículum de ${title} (${year}) — guía, ejemplos y ATS | GetQuickResume`,
      metaDescription: `Guía de CV para ${title}: responsabilidades, herramientas, errores frecuentes y palabras clave (${focus}). Plantillas compatibles con ATS y ejemplos listos para adaptar.`,
    };
  }
  return {
    metaTitle: `${title} Resume Guide (${year}) — Examples, Skills & ATS Keywords | GetQuickResume`,
    metaDescription: `${title} resume playbook: role-specific responsibilities, tools, common mistakes, and ATS keywords (${focus}). Templates plus examples you can adapt fast.`,
  };
}
