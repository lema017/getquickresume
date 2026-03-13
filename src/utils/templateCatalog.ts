import type { TemplateCategory } from '@/services/templatesService';

const TEMPLATE_VERSION = import.meta.env.VITE_TEMPLATE_VERSION || 'v1';

export type TemplateStyleCategory = 'professional' | 'creative' | 'regular';

export interface TemplateMeta {
  id: string;
  name: string;
  category: TemplateCategory;
  tagName?: string;
  styleCategory: TemplateStyleCategory;
}

export function getTemplateThumbnailUrl(templateId: string): string {
  return `/templates/thumbnails/${templateId}.webp?v=${TEMPLATE_VERSION}`;
}

export function getTemplateJsUrl(templateId: string): string {
  return `/templates/designs/${templateId}.js?v=${TEMPLATE_VERSION}`;
}

// ---------------------------------------------------------------------------
// Catalog — the manifest is the primary source; hardcoded list is a fallback.
// ---------------------------------------------------------------------------

interface ManifestEntry {
  id: string;
  name: string;
  category: string;
  thumbnail: string | null;
  js: string;
}

interface Manifest {
  version: string;
  count: number;
  templates: ManifestEntry[];
}

let _catalog: TemplateMeta[] | null = null;
let _manifestPromise: Promise<TemplateMeta[]> | null = null;

function manifestToMeta(entries: ManifestEntry[]): TemplateMeta[] {
  const hardcodedLookup = new Map(HARDCODED_CATALOG.map(t => [t.id, t.styleCategory]));
  return entries.map((e) => ({
    id: e.id,
    name: e.name,
    category: (e.category || 'free') as TemplateCategory,
    styleCategory: hardcodedLookup.get(e.id) ?? 'regular',
  }));
}

/**
 * Fetch the template catalog from the manifest.json generated at build time.
 * Result is cached — safe to call from multiple components.
 */
export async function fetchTemplateCatalog(): Promise<TemplateMeta[]> {
  if (_catalog) return _catalog;

  if (!_manifestPromise) {
    _manifestPromise = fetch(`/templates/manifest.json?v=${TEMPLATE_VERSION}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Manifest>;
      })
      .then((data) => {
        _catalog = manifestToMeta(data.templates);
        return _catalog;
      })
      .catch(() => {
        _catalog = HARDCODED_CATALOG;
        return _catalog;
      });
  }

  return _manifestPromise;
}

/**
 * Synchronous accessor — returns the catalog if already loaded, or the
 * hardcoded fallback while the manifest is still being fetched.
 */
export function getTemplateCatalog(): TemplateMeta[] {
  return _catalog ?? HARDCODED_CATALOG;
}

/**
 * Re-export for backward compatibility. Prefer `getTemplateCatalog()`.
 */
export const TEMPLATE_CATALOG: TemplateMeta[] = new Proxy([] as TemplateMeta[], {
  get(target, prop, receiver) {
    const catalog = getTemplateCatalog();
    return Reflect.get(catalog, prop, receiver);
  },
});

// ---------------------------------------------------------------------------
// Single template loader
// ---------------------------------------------------------------------------

export async function loadLocalTemplate(templateId: string): Promise<{
  id: string;
  name: string;
  category: TemplateCategory;
  tagName: string;
  jsCode: string;
} | null> {
  const catalog = getTemplateCatalog();
  const meta = catalog.find(t => t.id === templateId);
  if (!meta) return null;

  try {
    const res = await fetch(getTemplateJsUrl(templateId));
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
 * @deprecated Prefer thumbnails for browsing and loadLocalTemplate() for single on-demand loads.
 */
export async function loadAllLocalTemplates(): Promise<Array<{
  id: string;
  name: string;
  category: TemplateCategory;
  tagName: string;
  jsCode: string;
}>> {
  const catalog = getTemplateCatalog();
  const results = await Promise.all(
    catalog.map(meta => loadLocalTemplate(meta.id))
  );
  return results.filter((t): t is NonNullable<typeof t> => t !== null);
}

// ---------------------------------------------------------------------------
// Hardcoded fallback (used while manifest.json is loading or if it fails)
// ---------------------------------------------------------------------------

const HARDCODED_CATALOG: TemplateMeta[] = [
  // --- Professional: clean, minimal, white/light bg, text-focused ---
  { id: 'gqr-resume-classic', name: 'Ivory', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-corporate', name: 'Summit', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-finance', name: 'Ledger', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-mckinsey', name: 'Strategos', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-fineline', name: 'Horizon', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-typewriter', name: 'Hemingway', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-monochrome', name: 'Graphite', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-boldname', name: 'Vanguard', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-blueaccent', name: 'Indigo', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-tide', name: 'Tide', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-glen-v1', name: 'Glen V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-coral-v2', name: 'Coral V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-oak-v4', name: 'Oak V4', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-oak-v5', name: 'Oak V5', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-cove-v1', name: 'Cove V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-breeze', name: 'Breeze', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-pine-v1', name: 'Pine V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-pine-v2', name: 'Pine V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-glow-v1', name: 'Glow V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-glow-v2', name: 'Glow V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-snow-v1', name: 'Snow V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-blaze-v1', name: 'Blaze V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-gust-v1', name: 'Gust V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-gust-v2', name: 'Gust V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-pulse-v1', name: 'Pulse V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-shore-v1', name: 'Shore V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-frost-v1', name: 'Frost V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-frost-v2', name: 'Frost V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-quartz-v1', name: 'Quartz V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-quartz-v2', name: 'Quartz V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-zenith-v1', name: 'Zenith V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-surge-v1', name: 'Surge V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-vale-v1', name: 'Vale V1', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-river-v2', name: 'River V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-flare-v2', name: 'Flare V2', category: 'free', styleCategory: 'professional' },
  { id: 'gqr-resume-dawn-v1', name: 'Dawn V1', category: 'free', styleCategory: 'professional' },

  // --- Creative: dark bg, colorful sidebars, figures, bold visual elements ---
  { id: 'gqr-resume-darkbg', name: 'Eclipse', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-obsidian', name: 'Onyx', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-onyx', name: 'Onyx', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-webworker', name: 'Circuit', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-mercury', name: 'Velocity', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-raven', name: 'Raven', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-harbor', name: 'Harbor', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-anchorage', name: 'Anchorage', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-noirline', name: 'Noirline', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-azurite', name: 'Azurite', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-monolith', name: 'Monolith', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-fog', name: 'Fog', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-morning', name: 'Morning', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-atelier', name: 'Atelier', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-mist', name: 'Mist', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-minimal-axis', name: 'Minimal Axis', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-steady', name: 'Compass', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-designer', name: 'Canvas', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-saffron', name: 'Aurora', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-charcoal', name: 'Ember', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-beam-v1', name: 'Beam V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-beam-v2', name: 'Beam V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-cliff-v1', name: 'Cliff V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-cliff-v2', name: 'Cliff V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-flame-v1', name: 'Flame V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-flame-v2', name: 'Flame V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-river-v1', name: 'River V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-snow-v2', name: 'Snow V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-dawn-v2', name: 'Dawn V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-peak-v1', name: 'Peak V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-peak-v2', name: 'Peak V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-coral-v1', name: 'Coral V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-rose-v1', name: 'Rose V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-rose-v2', name: 'Rose V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-helm-v1', name: 'Helm V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-helm-v2', name: 'Helm V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-ivy-v1', name: 'Ivy V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-ivy-v2', name: 'Ivy V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-lake-v2', name: 'Lake V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-mint-v2', name: 'Mint V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-beach-v1', name: 'Beach V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-beach-v2', name: 'Beach V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-shadow-v1', name: 'Shadow V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-shadow-v2', name: 'Shadow V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-chart-v1', name: 'Chart V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-chart-v2', name: 'Chart V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-deck-v1', name: 'Deck V1', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-deck-v2', name: 'Deck V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-compass-v2', name: 'Compass V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-prism-v2', name: 'Prism V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-wave-v2', name: 'Wave V2', category: 'free', styleCategory: 'creative' },
  { id: 'gqr-resume-storm-v1', name: 'Storm V1', category: 'free', styleCategory: 'creative' },

  // --- Regular: multi-column, moderate colors, sidebars but light bg ---
  { id: 'gqr-resume-cobalt', name: 'Sapphire', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-precision', name: 'Architect', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-silver', name: 'Sterling', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-pristine', name: 'Crystal', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-slate', name: 'Zen', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-desert', name: 'Sandstone', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-minty', name: 'Breeze', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-atlantic', name: 'Atlantis', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-happy', name: 'Soleil', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-seapearl', name: 'Coral', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-redaccent', name: 'Crimson', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-navybar', name: 'Admiral', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-executive', name: 'Prestige', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-ledger', name: 'Ledger', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-pebble', name: 'Pebble', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-almond', name: 'Almond', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-skyline', name: 'Skyline', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-beige-column', name: 'Beige Column', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-oak-v1', name: 'Oak V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-oak-v2', name: 'Oak V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-oak-v3', name: 'Oak V3', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-sand-v1', name: 'Sand V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-sand-v2', name: 'Sand V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-pulse-v2', name: 'Pulse V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-flare-v1', name: 'Flare V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-shore-v2', name: 'Shore V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-bloom-v1', name: 'Bloom V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-bloom-v2', name: 'Bloom V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-blaze-v2', name: 'Blaze V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-opal-v1', name: 'Opal V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-opal-v2', name: 'Opal V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-moss-v1', name: 'Moss V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-moss-v2', name: 'Moss V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-dune-v1', name: 'Dune V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-dune-v2', name: 'Dune V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-jade-v1', name: 'Jade V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-jade-v2', name: 'Jade V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-stone-v1', name: 'Stone V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-stone-v2', name: 'Stone V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-mint-v1', name: 'Mint V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-pearl-v1', name: 'Pearl V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-pearl-v2', name: 'Pearl V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-wave-v1', name: 'Wave V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-reed-v1', name: 'Reed V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-reed-v2', name: 'Reed V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-lake-v1', name: 'Lake V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-glen-v2', name: 'Glen V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-arch-v1', name: 'Arch V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-arch-v2', name: 'Arch V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-vale-v2', name: 'Vale V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-surge-v2', name: 'Surge V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-zenith-v2', name: 'Zenith V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-aura-v1', name: 'Aura V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-aura-v2', name: 'Aura V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-echo-v1', name: 'Echo V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-echo-v2', name: 'Echo V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-copper-v1', name: 'Copper V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-copper-v2', name: 'Copper V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-coal-v1', name: 'Coal V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-coal-v2', name: 'Coal V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-storm-v2', name: 'Storm V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-prism-v1', name: 'Prism V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-cedar-v1', name: 'Cedar V1', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-cedar-v2', name: 'Cedar V2', category: 'free', styleCategory: 'regular' },
  { id: 'gqr-resume-compass-v1', name: 'Compass V1', category: 'free', styleCategory: 'regular' },
];

export function getTemplatesByStyle(style: TemplateStyleCategory): TemplateMeta[] {
  return getTemplateCatalog().filter(t => t.styleCategory === style);
}
