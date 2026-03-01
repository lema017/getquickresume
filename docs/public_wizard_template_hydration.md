# Public Wizard → Template Hydration Pipeline

How resume data entered in the public wizard gets rendered inside Web Component templates.

---

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────────┐     ┌──────────────────┐
│  Wizard Steps    │────▶│  publicResumeStore    │────▶│ PublicPreviewPage │
│  (Step 1–7)      │     │  (Zustand + persist)  │     │  (Step 8)         │
└─────────────────┘     └──────────────────────┘     └───────┬──────────┘
                                                             │
                         ┌───────────────────────────────────┘
                         ▼
              ┌─────────────────────┐     ┌─────────────────────────┐
              │  paginationService  │────▶│  WebComponentRenderer   │
              │  (Shadow DOM probe) │     │  (per-page instances)   │
              └─────────────────────┘     └───────────┬─────────────┘
                                                      │
                                                      ▼
                                          ┌───────────────────────┐
                                          │  Template Web Component│
                                          │  (Shadow DOM render)   │
                                          └───────────────────────┘
```

---

## Step-by-Step Flow

### 1. Data Collection — Wizard Steps 1–7

Each wizard step (`Step1Profile`, `Step2Skills`, `Step3Experience`, etc.) writes form data to the **public Zustand store** via `usePublicResumeStore().updateResumeData(updates)`.

**Store**: `src/stores/publicResumeStore.ts`

- Uses `zustand/middleware/persist` with `localStorage` key `"public_resume_draft"`.
- Holds the full `ResumeData` shape (contact info, skills, experience, education, projects, certifications, languages, achievements, summary).
- Also stores `selectedTemplateId` (chosen on the template selection page before the wizard starts).

### 2. Template Selection — TemplateSelectionPage

**File**: `src/pages/TemplateSelectionPage.tsx`

Before the wizard starts, the user picks a template from a grid of 6 templates (Classic, Corporate, Mercury, Finance, Steady Form, Charcoal Glow).

- Each template card shows a **live preview** rendered via `WebComponentRenderer` with sample data.
- On selection, `setSelectedTemplate(id, category)` saves the template ID (e.g. `"gqr-resume-mercury"`) into the public store.

### 3. Template JS Loading — PublicPreviewPage

**File**: `src/components/public-wizard/PublicPreviewPage.tsx`

When the user reaches Step 8 (preview):

1. Reads `resumeData` and `selectedTemplateId` from the public store.
2. Fetches the template JavaScript file from `/templates/designs/{tagName}.js?v={timestamp}` (cache-busted).
3. Stores the raw JS code in component state (`templateCode`).

### 4. Pagination — paginationService

**File**: `src/services/paginationService.ts`

Before rendering, the preview page runs pagination to determine how content splits across A4 pages:

1. **`ensureTemplateRegistered()`** — Registers the Web Component in the browser's `customElements` registry if not already present. Patches constructor issues (`shadowRoot` assignment).
2. **`measureAllSections()`** — Creates a **hidden off-screen container** (`position: absolute; left: -99999px`), instantiates the template element at A4 width (794px), sets the full `resumeData` on it, waits for Shadow DOM render (2× `requestAnimationFrame`), then queries `[data-section]` elements inside the shadow root to read their actual `offsetHeight`.
3. **Page distribution** — Iterates measured sections in strict order, fitting them into pages with `A4_DIMENSIONS.contentHeightPX` as the budget (minus a 5px safety margin). If a list section (experience, projects, etc.) overflows, individual entries are split across pages using their `data-entry-id` measured heights.
4. Returns a `PaginationInfo` object: `{ totalPages, pages: [{ pageNumber, sections }] }`.

### 5. Page Data Filtering — filterResumeDataForPage()

**File**: `src/components/public-wizard/PublicPreviewPage.tsx` (local function)

After pagination assigns page numbers to each entry, the preview page creates **one `ResumeData` object per page**, filtering:

- Contact/header fields → page 1 only
- Summary → its assigned page
- Array sections (experience, education, projects, etc.) → filtered by `entry.pageNumber === currentPage`
- Skills → filtered by `skillsPagination` ranges

### 6. Rendering — WebComponentRenderer

**File**: `src/components/wizard/WebComponentRenderer.tsx`

For each page, the preview renders a `<WebComponentRenderer>` instance:

```tsx
<WebComponentRenderer
  tagName="gqr-resume-mercury"
  jsCode={templateCode}
  data={pageData}        // ← filtered ResumeData for this page
  language="en"
/>
```

The renderer:

1. **Intercepts the JS code** — Patches `shadowRoot` assignment patterns, replaces tag names if mismatched, renames the internal class to avoid conflicts when multiple templates are loaded.
2. **Registers the Custom Element** — Creates a Blob URL from the patched code, injects it as a `<script>` tag, polls `customElements.get(tagName)` until registration succeeds.
3. **Creates the DOM element** — `document.createElement(tagName)`, appends to its container div.
4. **Sets attributes** — `language`, `theme`, `accent` as HTML attributes.
5. **Hydrates data** — `element.data = pageData` triggers the Web Component's `set data()` setter, which stores the data and calls `render()`.

### 7. Template Render — Web Component (Shadow DOM)

**Files**: `public/templates/designs/gqr-resume-*.js`

Each template is a self-contained Web Component (IIFE + Shadow DOM):

```javascript
(function() {
  'use strict';
  class ResumeComponent extends HTMLElement {
    constructor() { super(); this._data = null; }
    connectedCallback() { this.attachShadow({ mode: 'open' }); this.render(); }
    set data(value) { this._data = value; this.render(); }
    get data() { return this._data; }
    render() {
      if (!this._data || !this.shadowRoot) return;
      // Extract fields from this._data
      // Build <style> + HTML string
      // this.shadowRoot.innerHTML = html;
    }
  }
  if (!customElements.get('gqr-resume-classic')) {
    customElements.define('gqr-resume-classic', ResumeComponent);
  }
})();
```

The `render()` method:

- Reads all fields from `this._data` (`firstName`, `lastName`, `experience[]`, etc.)
- Resolves i18n labels based on `language` attribute
- Builds a complete HTML string with embedded `<style>` (scoped via Shadow DOM)
- Sets `this.shadowRoot.innerHTML` to the generated markup
- Each section element has `data-section="type"` and entries have `data-entry-id="id"` for pagination measurement

### 8. PDF Generation

**File**: `src/utils/pdfGenerator.ts`

When the user clicks "Download PDF":

1. Waits for all Web Component instances to render (polls `element.data` and `offsetHeight`).
2. Calls `generateResumePDFFromPages()` which uses `html2canvas` to capture each `.a4-page-container` as a canvas image.
3. Assembles pages into a `jsPDF` document at A4 dimensions.
4. Downloads as `CV_{FirstName}_{LastName}.pdf`.

---

## Data Shape Reference

The `ResumeData` interface (`src/types/index.ts`) fields consumed by templates:

| Field | Type | Used For |
|-------|------|----------|
| `firstName`, `lastName` | `string` | Header name |
| `profession` | `string` | Header subtitle |
| `email`, `phone`, `linkedin`, `country` | `string` | Contact info |
| `summary` | `string` | Profile/About section |
| `skillsRaw` | `string[]` | Skills list |
| `experience[]` | `WorkExperience` | Work experience entries |
| `education[]` | `Education` | Education entries |
| `projects[]` | `Project` | Project entries |
| `certifications[]` | `Certification` | Certification entries |
| `languages[]` | `Language` | Language entries |
| `achievements[]` | `Achievement` | Achievement entries |
| `language` | `'en' \| 'es'` | Template i18n labels |

### WorkExperience fields used by templates

`title`, `company`, `startDate`, `endDate`, `isCurrent`, `achievements[]`, `responsibilities[]`

> Templates concatenate `achievements` and `responsibilities` arrays for bullet points.

---

## Key Files

| File | Role |
|------|------|
| `src/stores/publicResumeStore.ts` | Zustand store — persists wizard data and selected template |
| `src/pages/TemplateSelectionPage.tsx` | Template picker with live previews |
| `src/components/public-wizard/PublicPreviewPage.tsx` | Step 8 — loads template, runs pagination, renders pages |
| `src/components/wizard/WebComponentRenderer.tsx` | React wrapper that registers and hydrates Web Components |
| `src/services/paginationService.ts` | Measures sections via Shadow DOM, distributes across A4 pages |
| `src/utils/pdfGenerator.ts` | html2canvas + jsPDF export |
| `src/utils/a4Dimensions.ts` | A4 pixel/mm constants |
| `public/templates/designs/gqr-resume-*.js` | Template Web Components (6 files) |
