import { ResumeData } from '@/types';
import { ResumeTemplate } from '@/services/templatesService';
import { A4_DIMENSIONS } from '@/utils/a4Dimensions';
import { extractTemplateMeta } from '@/utils/templateUtils';

const SAFETY_MARGIN = 5;

// ── Public interfaces ──────────────────────────────────────────────

export interface PageContentSections {
  header?: boolean;
  summary?: boolean;
  experience?: string[];
  education?: string[];
  projects?: string[];
  certifications?: string[];
  achievements?: string[];
  skills?: { startIndex: number; endIndex: number; pageNumber?: number };
  languages?: string[];
  sidebar?: {
    skills?: { startIndex: number; endIndex: number; pageNumber?: number };
    education?: string[];
    languages?: string[];
    contact?: boolean;
  };
  continuedSections?: string[];
}

export interface PageContent {
  pageNumber: number;
  sections: PageContentSections;
}

export interface PaginationInfo {
  totalPages: number;
  pages: PageContent[];
}

// ── Internal types ─────────────────────────────────────────────────

interface MeasuredSection {
  sectionType: string;
  height: number;
  column: 'sidebar' | 'main' | 'full-width';
  entries: { id: string; height: number }[];
}

interface PlacementItem {
  sectionType: string;
  id?: string;
  height: number;
}

// ── Template registration ──────────────────────────────────────────

async function ensureTemplateRegistered(template: ResumeTemplate): Promise<boolean> {
  const { tagName, jsCode } = template;
  if (customElements.get(tagName)) return true;

  let code = jsCode;
  code = code.replace(/this\.shadowRoot\s*=\s*null\s*;?/g, '/* patched */');
  code = code.replace(/this\.shadowRoot\s*=\s*this\.attachShadow/g, 'this.attachShadow');

  const codeTagMatch = code.match(/customElements\.define\(['"]([^'"]+)['"]/);
  const codeTag = codeTagMatch?.[1];
  if (codeTag && codeTag !== tagName) {
    const escaped = codeTag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    code = code.replace(new RegExp(escaped, 'g'), tagName);
  }

  if (customElements.get(tagName)) return true;

  const blob = new Blob([code], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  await new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => { URL.revokeObjectURL(url); reject(new Error(`Script load failed: ${tagName}`)); };
    document.head.appendChild(script);
  });
  URL.revokeObjectURL(url);

  let tries = 0;
  while (tries < 30 && !customElements.get(tagName)) {
    await new Promise(r => setTimeout(r, 100));
    tries++;
  }

  if (script.parentNode) script.parentNode.removeChild(script);
  return !!customElements.get(tagName);
}

// ── Shadow DOM measurement ─────────────────────────────────────────

async function measureAllSections(
  resumeData: ResumeData,
  template: ResumeTemplate,
): Promise<MeasuredSection[]> {
  const container = document.createElement('div');
  container.style.cssText =
    `position:absolute;top:-99999px;left:-99999px;` +
    `width:${A4_DIMENSIONS.widthPX}px;visibility:hidden;pointer-events:none;z-index:-1;`;
  document.body.appendChild(container);

  try {
    const ok = await ensureTemplateRegistered(template);
    if (!ok) {
      console.warn('[Pagination] Template element not registered:', template.tagName);
      return [];
    }

    const el = document.createElement(template.tagName);
    el.setAttribute('language', resumeData.language || 'en');
    container.appendChild(el);
    (el as any).data = resumeData;

    await new Promise<void>(r =>
      requestAnimationFrame(() => requestAnimationFrame(() => r())),
    );

    const shadow = el.shadowRoot;
    if (!shadow) {
      console.warn('[Pagination] No shadowRoot on template element');
      return [];
    }

    const sidebarEl = shadow.querySelector('.sidebar');
    const mainEl = shadow.querySelector('.main');
    const results: MeasuredSection[] = [];

    shadow.querySelectorAll('[data-section]').forEach(sEl => {
      const sectionType = sEl.getAttribute('data-section') || '';
      const height = (sEl as HTMLElement).offsetHeight;

      let column: MeasuredSection['column'] = 'full-width';
      if (sidebarEl?.contains(sEl)) column = 'sidebar';
      else if (mainEl?.contains(sEl)) column = 'main';

      const entries: MeasuredSection['entries'] = [];
      sEl.querySelectorAll('[data-entry-id]').forEach(eEl => {
        const id = eEl.getAttribute('data-entry-id') || '';
        if (id) entries.push({ id, height: (eEl as HTMLElement).offsetHeight });
      });

      results.push({ sectionType, height, column, entries });
    });

    return results;
  } finally {
    if (document.body.contains(container)) document.body.removeChild(container);
  }
}

// ── Helpers ────────────────────────────────────────────────────────

function buildItems(measured: MeasuredSection): PlacementItem[] {
  if (measured.entries.length === 0) {
    return [{ sectionType: measured.sectionType, height: measured.height }];
  }
  const entryTotal = measured.entries.reduce((s, e) => s + e.height, 0);
  const headingHeight = Math.max(0, measured.height - entryTotal);

  return measured.entries.map((e, i) => ({
    sectionType: measured.sectionType,
    id: e.id,
    height: i === 0 ? e.height + headingHeight : e.height,
  }));
}

function addToMainSections(
  sections: PageContentSections,
  item: PlacementItem,
  resumeData: ResumeData,
): void {
  switch (item.sectionType) {
    case 'header':
      sections.header = true;
      break;
    case 'profile':
      sections.summary = true;
      break;
    case 'skills':
      sections.skills = { startIndex: 0, endIndex: resumeData.skillsRaw.length };
      break;
    case 'experience':
      if (!sections.experience) sections.experience = [];
      if (item.id) sections.experience.push(item.id);
      break;
    case 'projects':
      if (!sections.projects) sections.projects = [];
      if (item.id) sections.projects.push(item.id);
      break;
    case 'achievements':
      if (!sections.achievements) sections.achievements = [];
      if (item.id) sections.achievements.push(item.id);
      break;
    case 'education':
      if (!sections.education) sections.education = [];
      if (item.id) sections.education.push(item.id);
      break;
    case 'certifications':
      if (!sections.certifications) sections.certifications = [];
      if (item.id) sections.certifications.push(item.id);
      break;
    case 'languages':
      if (!sections.languages) sections.languages = [];
      if (item.id) sections.languages.push(item.id);
      break;
  }
}

function addToSidebarSections(
  sections: PageContentSections,
  item: PlacementItem,
  resumeData: ResumeData,
): void {
  if (!sections.sidebar) sections.sidebar = {};
  switch (item.sectionType) {
    case 'contact':
      sections.sidebar.contact = true;
      break;
    case 'languages':
      if (!sections.sidebar.languages) sections.sidebar.languages = [];
      if (item.id) sections.sidebar.languages.push(item.id);
      break;
    case 'skills':
      sections.sidebar.skills = { startIndex: 0, endIndex: resumeData.skillsRaw.length };
      break;
  }
}

// ── Public API ─────────────────────────────────────────────────────

export async function calculatePagination(
  resumeData: ResumeData,
  template: ResumeTemplate,
): Promise<PaginationInfo> {
  const meta = extractTemplateMeta(template.jsCode) || {
    id: template.id,
    name: template.name,
    tagName: template.tagName,
    layout: template.layout || 'single-column',
  };

  let layout = meta.layout || 'single-column';
  const measured = await measureAllSections(resumeData, template);

  if (layout === 'single-column' && measured.some(m => m.column === 'sidebar')) {
    layout = 'two-column';
  }

  if (layout === 'two-column') {
    return distributeTwoColumn(resumeData, measured);
  }
  return distributeSingleColumn(resumeData, measured);
}

// ── Single-column distribution ─────────────────────────────────────

function distributeSingleColumn(
  resumeData: ResumeData,
  measured: MeasuredSection[],
): PaginationInfo {
  const maxH = A4_DIMENSIONS.contentHeight - SAFETY_MARGIN;

  const items: PlacementItem[] = [];
  for (const m of measured) {
    if (m.height > 0) items.push(...buildItems(m));
  }

  const pages: PageContent[] = [];
  let pageNum = 1;
  let used = 0;
  let sections: PageContentSections = {};
  let prevSectionType: string | null = null;

  for (const item of items) {
    if (used > 0 && used + item.height > maxH) {
      pages.push({ pageNumber: pageNum, sections: { ...sections } });
      pageNum++;
      used = 0;

      const continued: string[] = [];
      if (prevSectionType === item.sectionType) continued.push(item.sectionType);
      sections = {};
      if (continued.length > 0) sections.continuedSections = continued;
    }

    used += item.height;
    addToMainSections(sections, item, resumeData);
    prevSectionType = item.sectionType;
  }

  if (Object.keys(sections).length > 0) {
    pages.push({ pageNumber: pageNum, sections });
  }
  if (pages.length === 0) {
    pages.push({ pageNumber: 1, sections: {} });
  }

  return { totalPages: pages.length, pages };
}

// ── Two-column distribution ────────────────────────────────────────

function distributeTwoColumn(
  resumeData: ResumeData,
  measured: MeasuredSection[],
): PaginationInfo {
  const maxH = A4_DIMENSIONS.contentHeight - SAFETY_MARGIN;

  const fullWidth: MeasuredSection[] = [];
  const sidebarSections: MeasuredSection[] = [];
  const mainSections: MeasuredSection[] = [];

  for (const m of measured) {
    if (m.column === 'sidebar') sidebarSections.push(m);
    else if (m.column === 'main') mainSections.push(m);
    else fullWidth.push(m);
  }

  // Build placement lists using template DOM order (measured order)
  const sidebarItems: PlacementItem[] = [];
  for (const m of sidebarSections) {
    if (m.height > 0) sidebarItems.push(...buildItems(m));
  }

  const mainItems: PlacementItem[] = [];
  for (const m of mainSections) {
    if (m.height > 0) mainItems.push(...buildItems(m));
  }

  const fullWidthHeight = fullWidth.reduce((s, m) => s + m.height, 0);
  const fullWidthSections: Partial<PageContentSections> = {};
  for (const fw of fullWidth) {
    if (fw.sectionType === 'header') fullWidthSections.header = true;
  }

  const pages: PageContent[] = [];
  let pageNum = 1;
  let sIdx = 0;
  let mIdx = 0;

  while (sIdx < sidebarItems.length || mIdx < mainItems.length) {
    const availH = maxH - (pageNum === 1 ? fullWidthHeight : 0);
    let sUsed = 0;
    let mUsed = 0;
    const sections: PageContentSections = { sidebar: {} };

    if (pageNum === 1) Object.assign(sections, fullWidthSections);

    while (sIdx < sidebarItems.length) {
      const item = sidebarItems[sIdx];
      if (sUsed > 0 && sUsed + item.height > availH) break;
      sUsed += item.height;
      addToSidebarSections(sections, item, resumeData);
      sIdx++;
    }

    while (mIdx < mainItems.length) {
      const item = mainItems[mIdx];
      if (mUsed > 0 && mUsed + item.height > availH) break;
      mUsed += item.height;
      addToMainSections(sections, item, resumeData);
      mIdx++;
    }

    pages.push({ pageNumber: pageNum, sections });
    pageNum++;
  }

  if (pages.length === 0) {
    pages.push({ pageNumber: 1, sections: {} });
  }

  return { totalPages: pages.length, pages };
}
