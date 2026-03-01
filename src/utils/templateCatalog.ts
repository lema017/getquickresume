import type { TemplateCategory } from '@/services/templatesService';

export interface TemplateMeta {
  id: string;
  name: string;
  category: TemplateCategory;
  tagName?: string;
}

export const TEMPLATE_CATALOG: TemplateMeta[] = [
  { id: 'gqr-resume-classic', name: 'Ivory', category: 'free' },
  { id: 'gqr-resume-corporate', name: 'Summit', category: 'free' },
  { id: 'gqr-resume-mercury', name: 'Velocity', category: 'free' },
  { id: 'gqr-resume-finance', name: 'Ledger', category: 'free' },
  { id: 'gqr-resume-steady', name: 'Compass', category: 'free' },
  { id: 'gqr-resume-charcoal', name: 'Ember', category: 'free' },
  { id: 'gqr-resume-pristine', name: 'Crystal', category: 'free' },
  { id: 'gqr-resume-saffron', name: 'Aurora', category: 'free' },
  { id: 'gqr-resume-obsidian', name: 'Onyx', category: 'free' },
  { id: 'gqr-resume-cobalt', name: 'Sapphire', category: 'free' },
  { id: 'gqr-resume-precision', name: 'Architect', category: 'free' },
  { id: 'gqr-resume-silver', name: 'Sterling', category: 'free' },
  { id: 'gqr-resume-mckinsey', name: 'Strategos', category: 'free' },
  { id: 'gqr-resume-designer', name: 'Canvas', category: 'free' },
  { id: 'gqr-resume-slate', name: 'Zen', category: 'free' },
  { id: 'gqr-resume-desert', name: 'Sandstone', category: 'free' },
  { id: 'gqr-resume-fineline', name: 'Horizon', category: 'free' },
  { id: 'gqr-resume-minty', name: 'Breeze', category: 'free' },
  { id: 'gqr-resume-atlantic', name: 'Atlantis', category: 'free' },
  { id: 'gqr-resume-happy', name: 'Soleil', category: 'free' },
  { id: 'gqr-resume-darkbg', name: 'Eclipse', category: 'free' },
  { id: 'gqr-resume-webworker', name: 'Circuit', category: 'free' },
  { id: 'gqr-resume-seapearl', name: 'Coral', category: 'free' },
  { id: 'gqr-resume-redaccent', name: 'Crimson', category: 'free' },
  { id: 'gqr-resume-blueaccent', name: 'Indigo', category: 'free' },
  { id: 'gqr-resume-typewriter', name: 'Hemingway', category: 'free' },
  { id: 'gqr-resume-monochrome', name: 'Graphite', category: 'free' },
  { id: 'gqr-resume-navybar', name: 'Admiral', category: 'free' },
  { id: 'gqr-resume-executive', name: 'Prestige', category: 'free' },
  { id: 'gqr-resume-boldname', name: 'Vanguard', category: 'free' },
];

/**
 * Load a single template's JS code from the local `/templates/designs/` directory.
 * Returns a ResumeTemplate-compatible object or null if loading fails.
 */
export async function loadLocalTemplate(templateId: string): Promise<{
  id: string;
  name: string;
  category: TemplateCategory;
  tagName: string;
  jsCode: string;
} | null> {
  const meta = TEMPLATE_CATALOG.find(t => t.id === templateId);
  if (!meta) return null;

  try {
    const res = await fetch(`/templates/designs/${templateId}.js?v=${Date.now()}`);
    if (!res.ok) return null;
    const jsCode = await res.text();
    return {
      id: meta.id,
      name: meta.name,
      category: meta.category,
      tagName: meta.id,
      jsCode,
    };
  } catch {
    return null;
  }
}

/**
 * Load all templates from local files.
 * Returns an array of template objects with their JS code.
 */
export async function loadAllLocalTemplates(): Promise<Array<{
  id: string;
  name: string;
  category: TemplateCategory;
  tagName: string;
  jsCode: string;
}>> {
  const results = await Promise.all(
    TEMPLATE_CATALOG.map(meta => loadLocalTemplate(meta.id))
  );
  return results.filter((t): t is NonNullable<typeof t> => t !== null);
}
