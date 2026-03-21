import type {
  ResolvedSkillPage,
  SkillAtsKeywordEntry,
  SkillContentBody,
  SkillFamilyId,
  SkillSEOOverrides,
} from './types';
import { getSkillFamilyNarrative } from './families/skillCopy';

/** Shape required for resolution (matches `SkillPageData` without importing index — avoids circular deps). */
export type SkillPageDataInput = {
  slug: string;
  title: string;
  category: SkillFamilyId;
  familyId?: SkillFamilyId;
  description: string;
  whyImportant: string;
  keywords: string[];
  searchIntents: string[];
  atsKeywords: string[];
  resumeTips: string[];
  exampleBullets: string[];
  relatedSkills: string[];
  content?: Partial<SkillContentBody>;
  seo?: SkillSEOOverrides;
};

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function padSkillOverview(
  base: string,
  skill: Pick<SkillPageDataInput, 'title' | 'keywords' | 'searchIntents' | 'resumeTips'>,
  lang: 'en' | 'es'
): string {
  const kw = skill.keywords.slice(0, 10).join(', ');
  const intents = skill.searchIntents.slice(0, 4).join(' · ');
  const tips = skill.resumeTips.slice(0, 4).join(' ');
  const extraEn = ` Common questions candidates ask include: ${intents}. Useful resume angles to explore: ${tips}. Keyword themes recruiters match: ${kw}. Keep bullets scoped to outcomes you can defend in a screen.`;
  const extraEs = ` Preguntas frecuentes incluyen: ${intents}. Ángulos útiles para el CV: ${tips}. Temas de palabras clave: ${kw}. Mantén las viñetas en resultados que puedas defender en una entrevista.`;
  let out = base + (lang === 'es' ? extraEs : extraEn);
  let guard = 0;
  while (wordCount(out) < 110 && guard < 4) {
    out += lang === 'es'
      ? ` Refuerza ${skill.title} con métricas, herramientas y alcance real.`
      : ` Reinforce ${skill.title} with metrics, tools, and real scope.`;
    guard++;
  }
  return out;
}

function mergeSkillContent(derived: SkillContentBody, partial?: Partial<SkillContentBody>): SkillContentBody {
  if (!partial) return derived;
  const pick = <T>(d: T, p: T | undefined, empty: (x: T) => boolean): T =>
    p !== undefined && !empty(p) ? p : d;
  const arr = <T>(d: T[], p?: T[]) => (p && p.length > 0 ? p : d);
  return {
    heroTagline: pick(derived.heroTagline, partial.heroTagline, (s) => !s.trim()),
    entityFocus: arr(derived.entityFocus, partial.entityFocus),
    overview: pick(derived.overview, partial.overview, (s) => wordCount(s) < 70),
    howToShowOnResume: arr(derived.howToShowOnResume, partial.howToShowOnResume),
    commonMistakes: arr(derived.commonMistakes, partial.commonMistakes),
    atsKeywords: arr(derived.atsKeywords, partial.atsKeywords),
    expandedExampleBullets: arr(derived.expandedExampleBullets, partial.expandedExampleBullets),
    relatedSlugs: arr(derived.relatedSlugs, partial.relatedSlugs),
  };
}

function buildDerivedSkillContent(skill: SkillPageDataInput, family: SkillFamilyId, lang: 'en' | 'es'): SkillContentBody {
  const narrative = getSkillFamilyNarrative(family, lang);
  const { title, description, whyImportant, atsKeywords, exampleBullets, relatedSkills } = skill;

  const heroTagline = `${narrative.heroLead(title)} ${description.slice(0, 200)}${description.length > 200 ? '…' : ''}`;

  const overviewCore =
    lang === 'es'
      ? `${whyImportant} Esta guía conecta ${title} con viñetas, palabras clave ATS y profesiones donde más se exige.`
      : `${whyImportant} This guide connects ${title} to resume bullets, ATS keywords, and professions where demand is highest.`;

  const overview = padSkillOverview(overviewCore, skill, lang);

  const howToShowOnResume = narrative.howToTemplates(title);
  const commonMistakes = narrative.mistakeTemplates;

  const atsEntries: SkillAtsKeywordEntry[] = atsKeywords.map((term, i) => ({
    term,
    hint:
      i < 10
        ? lang === 'es'
          ? `Integra ${term} en logros con contexto de herramienta, alcance o resultado.`
          : `Weave ${term} into achievements with tool, scope, or outcome context.`
        : undefined,
  }));

  const expandedExampleBullets =
    exampleBullets.length >= 6
      ? exampleBullets.slice(0, 12)
      : [
          ...exampleBullets,
          ...skill.resumeTips.slice(0, 6).map((tip) =>
            lang === 'es'
              ? `Apliqué ${title} para ${tip.toLowerCase()}`
              : `Applied ${title} to ${tip.toLowerCase()}`
          ),
        ].slice(0, 12);

  return {
    heroTagline,
    entityFocus: atsKeywords.slice(0, 6),
    overview,
    howToShowOnResume,
    commonMistakes,
    atsKeywords: atsEntries,
    expandedExampleBullets,
    relatedSlugs: relatedSkills.slice(0, 12),
  };
}

export function resolveSkillPage(skill: SkillPageDataInput, lang: 'en' | 'es'): ResolvedSkillPage {
  const family: SkillFamilyId = skill.familyId ?? skill.category;
  const derived = buildDerivedSkillContent(skill, family, lang);
  const merged = mergeSkillContent(derived, skill.content);
  return {
    familyId: family,
    content: merged,
    seo: skill.seo,
  };
}

export function buildSkillSeoOverrides(
  skill: SkillPageDataInput,
  resolved: ResolvedSkillPage,
  lang: 'en' | 'es'
): SkillSEOOverrides {
  const manual = skill.seo ?? resolved.seo;
  if (manual?.metaTitle?.trim() && manual?.metaDescription?.trim()) {
    return {
      metaTitle: manual.metaTitle,
      metaDescription: manual.metaDescription,
      ogTitle: manual.ogTitle,
    };
  }
  const focus = resolved.content.entityFocus.slice(0, 4).join(', ');
  const year = new Date().getFullYear();
  const { title } = skill;
  if (lang === 'es') {
    return {
      metaTitle: `Habilidad ${title} en el CV (${year}) — guía ATS y ejemplos | GetQuickResume`,
      metaDescription: `Cómo mostrar ${title} en tu currículum: errores comunes, palabras clave (${focus}) y viñetas listas para adaptar.`,
    };
  }
  return {
    metaTitle: `${title} on Your Resume (${year}) — ATS Guide & Examples | GetQuickResume`,
    metaDescription: `How to showcase ${title} on your resume: pitfalls, ATS keywords (${focus}), and bullets you can steal—then tailor.`,
  };
}
