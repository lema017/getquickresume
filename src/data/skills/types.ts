export type SkillFamilyId = 'technical' | 'soft' | 'industry' | 'tools';

export interface SkillAtsKeywordEntry {
  term: string;
  hint?: string;
}

export interface SkillContentBody {
  heroTagline: string;
  entityFocus: string[];
  overview: string;
  howToShowOnResume: string[];
  commonMistakes: string[];
  atsKeywords: SkillAtsKeywordEntry[];
  expandedExampleBullets: string[];
  relatedSlugs: string[];
}

export interface SkillSEOOverrides {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
}

export interface ResolvedSkillPage {
  familyId: SkillFamilyId;
  content: SkillContentBody;
  seo: SkillSEOOverrides | undefined;
}
