export type ProfessionCategoryId =
  | 'finance'
  | 'engineering'
  | 'education'
  | 'healthcare'
  | 'sales'
  | 'operations'
  | 'design'
  | 'legal'
  | 'hospitality'
  | 'trades'
  | 'general';

export interface SkillInContext {
  name: string;
  context: string;
}

export interface AtsKeywordEntry {
  term: string;
  hint?: string;
}

export interface ProfessionContentBody {
  heroTagline: string;
  entityFocus: string[];
  overview: string;
  responsibilities: string[];
  tools: string[];
  skillsInContext: SkillInContext[];
  atsKeywords: AtsKeywordEntry[];
  resumeMistakes: string[];
  certifications: Array<{ name: string; note?: string }>;
  suggestedBullets: string[];
  relatedSlugs: string[];
}

export interface ProfessionSEOOverrides {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
}

export interface ResolvedProfessionPage {
  categoryId: ProfessionCategoryId;
  content: ProfessionContentBody;
  seo: ProfessionSEOOverrides | undefined;
}
