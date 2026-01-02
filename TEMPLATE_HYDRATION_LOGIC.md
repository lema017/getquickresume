# Template Hydration Logic - Technical Documentation

## Overview

This document explains how resume data is hydrated into templates in the GetQuickResume application. The system converts internal resume data structures into template-compatible formats, calculates pagination for multi-page resumes, and renders them using Web Components.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Flow](#data-flow)
3. [Core Components](#core-components)
4. [Pagination System](#pagination-system)
5. [Template Rendering](#template-rendering)
6. [Key Algorithms](#key-algorithms)
7. [File Structure](#file-structure)

---

## Architecture Overview

The template hydration system consists of several interconnected components:

```
┌─────────────────┐
│   ResumeData    │  (Internal format from store)
│   (Store)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ calculatePagination() │  (Measures elements, determines page distribution)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PaginationInfo  │  (Page-by-page content mapping)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ calculateAndAssignPageNumbers() │  (Assigns page numbers to data)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ResumeData      │  (With pageNumber fields populated)
│ (Paginated)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ convertResumeDataToTemplateFormat() │  (Format conversion)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ TemplateDataFormat │  (Template-compatible format)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ filterDataForPage() │  (Per-page data filtering)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ WebComponentRenderer │  (Renders Web Component)
└─────────────────┘
```

---

## Data Flow

### Step-by-Step Process

1. **Data Retrieval**
   - Resume data is retrieved from the Zustand store (`useResumeStore`)
   - If store data is incomplete, falls back to converting from `generatedResume`
   - Data structure: `ResumeData` (see `src/types/index.ts`)

2. **Pagination Calculation**
   - Template metadata is extracted to determine layout (single-column vs two-column)
   - Each content section is measured using DOM-based height calculations
   - Content is distributed across A4-sized pages (794px × 1123px)
   - Returns `PaginationInfo` with page-by-page content mapping

3. **Page Number Assignment**
   - `calculateAndAssignPageNumbers()` processes `PaginationInfo`
   - Assigns `pageNumber` to each resume element:
     - Header fields (firstName, lastName, contact info) → usually page 1
     - Summary → assigned page number
     - Experience items → individual page numbers
     - Projects, Education, Certifications, Languages, Achievements → individual page numbers
     - Skills → uses range-based pagination (`SkillPageRange[]`)

4. **Format Conversion**
   - `convertResumeDataToTemplateFormat()` transforms `ResumeData` to `TemplateDataFormat`
   - Maps internal field names to template-expected names
   - Combines related fields (e.g., firstName + lastName → name)
   - Formats arrays and nested structures

5. **Template Code Modification**
   - `modifyTemplateCodeForMultiPageDisplay()` modifies template JavaScript
   - Changes fixed heights to min-heights for content expansion
   - Changes overflow from hidden to visible
   - Injects CSS for visual page separators

6. **Rendering**
   - `WebComponentRenderer` loads template JavaScript as a Web Component
   - Registers custom element with unique class name (prevents conflicts)
   - Sets `data` property on custom element
   - Template component renders using the provided data

---

## Core Components

### 1. Data Conversion (`src/utils/resumeDataToTemplateFormat.ts`)

**Purpose**: Converts internal `ResumeData` format to template-compatible `TemplateDataFormat`.

**Key Transformations**:

```typescript
// Name: Combine firstName + lastName
name = [firstName, lastName].filter(Boolean).join(' ')

// Title: Map profession to title
title = profession

// Contact: Combine separate fields into object
contact = {
  phone: phone,
  email: email,
  website: linkedin,  // LinkedIn used as website
  location: country
}

// Profile: Map summary to profile
profile = summary
profilePageNumber = summaryPageNumber

// Skills: Map skillsRaw to skills array
skills = skillsRaw
// Convert skillsPagination ranges to skillsPageNumbers array
skillsPageNumbers = mapRangesToArray(skillsPagination)

// Experience: Transform WorkExperience[] to template format
experience = experience.map(exp => ({
  position: exp.title,
  company: exp.company,
  startDate: exp.startDate,
  endDate: exp.isCurrent ? 'Present' : exp.endDate,
  description: [...exp.achievements, ...exp.responsibilities],
  pageNumber: exp.pageNumber
}))

// Similar transformations for:
// - Projects
// - Education
// - Languages (formatted as "Language (level)")
// - Achievements (formatted as "Title: Description")
// - Certifications (formatted as "Name - Issuer (Date)")
```

**Special Handling**:
- Skills pagination uses ranges (`SkillPageRange`) that map to array indices
- Languages, achievements, and certifications have parallel `*PageNumbers` arrays
- Empty arrays are converted to `undefined` to match template expectations

**Filtering Function**: `filterDataForPage()` filters template data to show only content for a specific page number.

---

### 2. Pagination Service (`src/services/paginationService.ts`)

**Purpose**: Calculates how resume content should be distributed across A4 pages.

**Key Functions**:

#### `calculatePagination(resumeData, template): Promise<PaginationInfo>`

1. Extracts template metadata to determine layout type
2. Routes to appropriate algorithm:
   - `calculateSingleColumnPagination()` for single-column layouts
   - `calculateTwoColumnPagination()` for two-column layouts

#### Single-Column Pagination

**Content Order**:
1. Header (name, contact info)
2. Skills (as a group, can be split)
3. Summary
4. Experience items (in order)
5. Projects (in order)
6. Achievements (in order)
7. Education (in order)
8. Certifications (in order)
9. Languages (in order, always last)

**Algorithm**:
- Processes sections sequentially
- Measures each section's height using DOM or estimation
- Adds sections to current page until height limit (1083px) is reached
- Starts new page when section doesn't fit
- **Special case**: Skills can be split across pages using incremental processing

**Skills Splitting Logic**:
```typescript
// Skills are processed incrementally
while (skillIndex < totalSkills) {
  // Calculate how many skills fit on current page
  const remainingHeight = maxPageHeight - currentPageHeight
  const skillsThatFit = Math.floor(remainingHeight / estimatedSkillHeight)
  const endIndex = Math.min(skillIndex + skillsThatFit, totalSkills)
  
  // Measure actual height of skills subset
  const actualHeight = await measureSkills(skills.slice(skillIndex, endIndex))
  
  // Adjust if doesn't fit, create new page if needed
  // Add skills range to current page
  currentPageSections.skills = { startIndex: skillIndex, endIndex: finalEndIndex }
  
  skillIndex = finalEndIndex
}
```

#### Two-Column Pagination

**Layout**:
- **Left Column (Sidebar)**: Skills, Education, Certifications, Languages
- **Right Column (Main)**: Header, Summary, Experience, Projects, Achievements

**Algorithm**:
- Processes left and right columns independently
- Balances content across columns
- Creates new page when either column exceeds height limit
- Maintains column structure across pages

**Measurement Functions**:
- `measureHeader()`: Estimates ~100px
- `measureSummary()`: Calculates based on text length (~20px per line)
- `measureExperienceItem()`: Base height + (achievements + responsibilities) × 25px
- `measureProjectItem()`: Base 80px + description lines × 20px
- `measureSkills()`: **DOM-based measurement** using hidden container
- `measureEducationItem()`, `measureLanguageItem()`, `measureAchievementItem()`, `measureCertificationItem()`: Estimated heights

**Measurement Container**:
- Creates hidden DOM element (`#pagination-measurement-container`)
- Renders skills as badges to measure actual height
- Accounts for flex-wrap behavior
- Cleans up after measurement

---

### 3. Page Number Assignment (`src/components/wizard/Step9Preview.tsx`)

**Function**: `calculateAndAssignPageNumbers(resumeData, pagination): ResumeData`

**Process**:
1. Initializes all page number fields to `null`
2. Iterates through `pagination.pages`
3. For each page, assigns page numbers based on sections present:
   - **Header sections**: All header fields get the page number
   - **Summary**: `summaryPageNumber` assigned
   - **Experience/Projects/Education/Certifications/Languages/Achievements**: Individual items get page numbers by ID matching
   - **Skills**: Creates `SkillPageRange` objects with `startIndex`, `endIndex`, `pageNumber`
4. Sorts `skillsPagination` by page number and start index

**Key Logic**:
```typescript
// Header fields (usually page 1)
if (page.sections.header) {
  updatedData.firstNamePageNumber = pageNum
  updatedData.lastNamePageNumber = pageNum
  // ... all header fields
}

// Experience items by ID
if (page.sections.experience) {
  page.sections.experience.forEach(expId => {
    const exp = updatedData.experience.find(e => e.id === expId)
    if (exp) exp.pageNumber = pageNum
  })
}

// Skills as ranges
if (page.sections.skills) {
  updatedData.skillsPagination.push({
    startIndex: page.sections.skills.startIndex,
    endIndex: page.sections.skills.endIndex,
    pageNumber: pageNum
  })
}
```

---

### 4. Template Code Modification (`src/utils/templateCodeModifier.ts`)

**Function**: `modifyTemplateCodeForMultiPageDisplay(jsCode): string`

**Modifications**:

1. **Height Changes**:
   - `height: 1123px` → `min-height: 1123px; height: auto`
   - `height: 1083px` → `min-height: 1083px; height: auto`
   - `max-height: 1123px` → `max-height: none`

2. **Overflow Changes**:
   - `overflow: hidden` → `overflow: visible`

3. **CSS Injection**:
   - Injects multi-page CSS for visual page separators
   - Adds `::after` pseudo-element with repeating gradient for page breaks
   - Adds print media queries for page breaks

**Injection Strategy**:
- Tries to inject into existing `<style>` tag
- Falls back to injecting into `const styles = \`...\`` template literal
- Avoids duplicate injection by checking for existing page break CSS

---

### 5. Web Component Renderer (`src/components/wizard/WebComponentRenderer.tsx`)

**Purpose**: Loads and renders template JavaScript as a Web Component.

**Key Features**:

1. **Code Interception**:
   - Replaces hardcoded tag names in template code
   - Replaces class names to avoid conflicts (e.g., `ResumeComponent` → `ResumeComponentTemplate1763438319813`)
   - Prevents redefinition of already-registered custom elements

2. **Loading Process**:
   ```typescript
   // 1. Create blob URL from JS code
   const blob = new Blob([interceptedCode], { type: 'application/javascript' })
   const blobUrl = URL.createObjectURL(blob)
   
   // 2. Create and inject script tag
   const script = document.createElement('script')
   script.src = blobUrl
   document.head.appendChild(script)
   
   // 3. Wait for custom element registration
   while (!customElements.get(tagName)) {
     await new Promise(resolve => setTimeout(resolve, 100))
   }
   
   // 4. Create custom element instance
   const element = document.createElement(tagName)
   element.data = data  // Set data property
   container.appendChild(element)
   ```

3. **Data Assignment**:
   - Sets `data` property directly on custom element: `(element as any).data = data`
   - Sets attributes: `language`, `theme`, `accent`
   - Template component reads `data` property and renders accordingly

4. **Cleanup**:
   - Removes script tag on unmount
   - Removes custom element from DOM
   - Revokes blob URLs

---

## Pagination System

### PaginationInfo Structure

```typescript
interface PaginationInfo {
  totalPages: number
  pages: PageContent[]
}

interface PageContent {
  pageNumber: number
  sections: PageContentSections
}

interface PageContentSections {
  header?: boolean
  summary?: boolean
  experience?: string[]  // Array of experience IDs
  education?: string[]  // Array of education IDs
  projects?: string[]   // Array of project IDs
  certifications?: string[]  // Array of certification IDs
  achievements?: string[]    // Array of achievement IDs
  skills?: { startIndex: number; endIndex: number; pageNumber?: number }
  languages?: string[]  // Array of language IDs
  sidebar?: {
    skills?: { startIndex: number; endIndex: number; pageNumber?: number }
    education?: string[]
    languages?: string[]
    contact?: boolean
  }
}
```

### A4 Dimensions

```typescript
A4_DIMENSIONS = {
  widthPX: 794,        // A4 width in pixels (at 96 DPI)
  heightPX: 1123,      // A4 height in pixels
  contentWidth: 754,    // Content area width (with margins)
  contentHeight: 1083,  // Content area height (with margins)
  marginRight: 20,
  marginBottom: 40
}
```

### Skills Pagination

Skills use a range-based pagination system because they're rendered as a flex-wrap container, making individual item pagination impractical.

**Structure**:
```typescript
interface SkillPageRange {
  startIndex: number  // Inclusive start index in skillsRaw array
  endIndex: number    // Exclusive end index
  pageNumber: number  // Page where this range appears
}
```

**Conversion to Array**:
```typescript
// Convert ranges to skillsPageNumbers array
skillsPageNumbers = new Array(skills.length).fill(null)
skillsPagination.forEach(range => {
  for (let i = range.startIndex; i < range.endIndex && i < skills.length; i++) {
    skillsPageNumbers[i] = range.pageNumber
  }
})
// Fill nulls with page 1 as fallback
skillsPageNumbers = skillsPageNumbers.map(pageNum => pageNum ?? 1)
```

---

## Template Rendering

### Multi-Page Display

Templates are rendered in separate containers for each page:

```tsx
{paginatedPages.map((pageData, pageIndex) => (
  <div className="a4-page-container" data-page-number={pageIndex + 1}>
    <WebComponentRenderer
      tagName={selectedTemplate.tagName}
      jsCode={modifiedJsCode}
      data={pageData}
      language={storeResumeData?.language}
    />
  </div>
))}
```

### Page Filtering

Each page only receives data for that specific page:

```typescript
filterDataForPage(paginatedData, pageNumber): TemplateDataFormat {
  // Header always on page 1
  if (pageNumber === 1) {
    filtered.name = paginatedData.name
    filtered.title = paginatedData.title
    filtered.contact = paginatedData.contact
    filtered.profile = paginatedData.profile
  }
  
  // Filter arrays by pageNumber
  filtered.experience = paginatedData.experience?.filter(
    exp => exp.pageNumber === pageNumber
  )
  
  // Filter skills by skillsPageNumbers array
  if (paginatedData.skills && paginatedData.skillsPageNumbers) {
    filtered.skills = paginatedData.skills.filter((_, index) => 
      paginatedData.skillsPageNumbers![index] === pageNumber
    )
  }
  
  // Similar filtering for other sections...
}
```

---

## Key Algorithms

### 1. Single-Column Pagination Algorithm

```typescript
let currentPage = 1
let currentPageHeight = 0
const maxPageHeight = 1083  // A4 content height

for (const section of sections) {
  const height = await section.measure()
  
  // If section doesn't fit, start new page
  if (currentPageHeight > 0 && currentPageHeight + height > maxPageHeight) {
    pages.push({ pageNumber: currentPage, sections: currentPageSections })
    currentPage++
    currentPageHeight = 0
    currentPageSections = {}
  }
  
  // Add section to current page
  currentPageHeight += height
  addSectionToPage(section, currentPageSections)
}

// Add final page
if (Object.keys(currentPageSections).length > 0) {
  pages.push({ pageNumber: currentPage, sections: currentPageSections })
}
```

### 2. Skills Splitting Algorithm

```typescript
let skillIndex = 0
while (skillIndex < totalSkills) {
  // Check if new page needed
  if (currentPageHeight >= maxPageHeight) {
    pages.push({ pageNumber: currentPage, sections: currentPageSections })
    currentPage++
    currentPageHeight = 0
    currentPageSections = {}
  }
  
  // Calculate how many skills fit
  const remainingHeight = maxPageHeight - currentPageHeight
  const estimatedSkillHeight = 30
  const skillsThatFit = Math.max(1, Math.floor(remainingHeight / estimatedSkillHeight))
  const endIndex = Math.min(skillIndex + skillsThatFit, totalSkills)
  
  // Measure actual height
  const skillsToMeasure = skills.slice(skillIndex, endIndex)
  let actualHeight = await measureSkills(skillsToMeasure)
  
  // Adjust if doesn't fit
  if (currentPageHeight + actualHeight > maxPageHeight) {
    // Reduce count or move to new page
    // ... adjustment logic ...
  }
  
  // Add skills range to page
  currentPageSections.skills = { startIndex: skillIndex, endIndex: finalEndIndex }
  currentPageHeight += actualHeight
  skillIndex = finalEndIndex
}
```

### 3. Two-Column Balancing Algorithm

```typescript
let leftHeight = 0
let rightHeight = 0
let leftIndex = 0
let rightIndex = 0

while (leftIndex < leftSections.length || rightIndex < rightSections.length) {
  // Add left column sections
  while (leftIndex < leftSections.length) {
    const section = leftSections[leftIndex]
    const height = await section.measure()
    
    if (leftHeight + height > maxColumnHeight && leftHeight > 0) {
      break  // Need new page
    }
    
    leftHeight += height
    addToSidebar(section, currentPageSections)
    leftIndex++
  }
  
  // Add right column sections
  while (rightIndex < rightSections.length) {
    const section = rightSections[rightIndex]
    const height = await section.measure()
    
    if (rightHeight + height > maxColumnHeight && rightHeight > 0) {
      break  // Need new page
    }
    
    rightHeight += height
    addToMain(section, currentPageSections)
    rightIndex++
  }
  
  // Save page if full or all sections processed
  if (leftHeight >= maxColumnHeight || rightHeight >= maxColumnHeight || 
      (leftIndex >= leftSections.length && rightIndex >= rightSections.length)) {
    pages.push({ pageNumber: currentPage, sections: currentPageSections })
    currentPage++
    leftHeight = 0
    rightHeight = 0
    currentPageSections = { sidebar: {} }
  }
}
```

---

## File Structure

### Core Files

- **`src/utils/resumeDataToTemplateFormat.ts`**
  - `convertResumeDataToTemplateFormat()`: Main conversion function
  - `filterDataForPage()`: Page-specific data filtering
  - `TemplateDataFormat` interface

- **`src/services/paginationService.ts`**
  - `calculatePagination()`: Main pagination entry point
  - `calculateSingleColumnPagination()`: Single-column algorithm
  - `calculateTwoColumnPagination()`: Two-column algorithm
  - Measurement functions for all content types

- **`src/components/wizard/Step9Preview.tsx`**
  - `calculateAndAssignPageNumbers()`: Page number assignment
  - `extractPaginationFields()`: Extract only pagination fields for store update

- **`src/utils/templateCodeModifier.ts`**
  - `modifyTemplateCodeForMultiPageDisplay()`: Template code modification

- **`src/components/wizard/WebComponentRenderer.tsx`**
  - `WebComponentRenderer`: React component for rendering Web Components
  - Handles script loading, custom element registration, data assignment

### Integration Points

- **`src/components/wizard/Step10Final.tsx`**
  - Main final step component
  - Orchestrates pagination calculation, conversion, and rendering
  - Handles multi-page display with separate containers per page

- **`src/components/wizard/TemplatePreviewModal.tsx`**
  - Preview modal with pagination
  - Similar flow to Step10Final but in modal context

- **`src/components/wizard/Step9Preview.tsx`**
  - Template selection step
  - Triggers initial pagination calculation when template is selected

### Supporting Files

- **`src/types/index.ts`**: TypeScript interfaces for `ResumeData`, `WorkExperience`, etc.
- **`src/utils/a4Dimensions.ts`**: A4 page dimension constants
- **`src/utils/templateUtils.ts`**: Template metadata extraction utilities
- **`src/services/templatesService.ts`**: Template service for fetching templates

---

## Important Considerations

### 1. Skills Pagination Complexity

Skills are the most complex section to paginate because:
- They're rendered as a flex-wrap container (not a list)
- Individual skills can't be easily measured in isolation
- Must be measured as groups and split across pages
- Uses range-based pagination (`SkillPageRange[]`) instead of per-item page numbers

### 2. Header Always on Page 1

The header (name, contact info) is always rendered on page 1, even if pagination suggests otherwise. This is enforced in `filterDataForPage()`.

### 3. Layout Detection

Template layout (single-column vs two-column) is detected from:
1. Template metadata (`TEMPLATE_META.layout`)
2. Template service metadata
3. Fallback to single-column if not specified

### 4. Measurement Accuracy

- **Skills**: DOM-based measurement (most accurate)
- **Other sections**: Estimation-based (may need refinement)
- Measurement container is reused to avoid DOM thrashing

### 5. Template Code Modification

Template code is modified at runtime to support multi-page display. This means:
- Templates must be compatible with the modification patterns
- Some templates may not work correctly if they use non-standard CSS patterns
- Modifications are applied every time a template is loaded

### 6. Web Component Lifecycle

- Custom elements are registered globally (once per tag name)
- Class names are made unique to avoid conflicts when multiple templates are loaded
- Data is set via property assignment, not attributes
- Cleanup is important to prevent memory leaks

### 7. Caching and Performance

- Pagination calculation is cached per template/resume combination
- Uses refs to track last calculated template to avoid recalculation
- Template code compilation is cached using a Map

### 8. Error Handling

- Falls back to single-page display if pagination fails
- Falls back to estimation if DOM measurement fails
- Gracefully handles missing template metadata
- Shows error states in UI if rendering fails

---

## Usage Examples

### Basic Hydration Flow

```typescript
// 1. Get resume data
const resumeData = useResumeStore(state => state.resumeData)
const selectedTemplate = useResumeStore(state => state.selectedTemplate)

// 2. Calculate pagination
const pagination = await calculatePagination(resumeData, selectedTemplate)

// 3. Assign page numbers
const paginatedResumeData = calculateAndAssignPageNumbers(resumeData, pagination)

// 4. Convert to template format
const templateData = convertResumeDataToTemplateFormat(paginatedResumeData)

// 5. Filter for specific page
const page1Data = filterDataForPage(templateData, 1)

// 6. Modify template code
const modifiedCode = modifyTemplateCodeForMultiPageDisplay(selectedTemplate.jsCode)

// 7. Render
<WebComponentRenderer
  tagName={selectedTemplate.tagName}
  jsCode={modifiedCode}
  data={page1Data}
  language={resumeData.language}
/>
```

### Multi-Page Rendering

```typescript
// Calculate total pages
const allPageNumbers = new Set<number>()
// ... collect all page numbers from templateData ...

const totalPages = Math.max(...Array.from(allPageNumbers), 1)

// Create paginated pages array
const pages: TemplateDataFormat[] = []
for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
  pages.push(filterDataForPage(templateData, pageNum))
}

// Render each page
{pages.map((pageData, index) => (
  <div className="a4-page-container" key={`page-${index + 1}`}>
    <WebComponentRenderer
      tagName={template.tagName}
      jsCode={modifiedCode}
      data={pageData}
    />
  </div>
))}
```

---

## Future Improvements

1. **More Accurate Measurements**: Replace estimation-based measurements with DOM-based measurements for all content types
2. **Dynamic Layout Detection**: Better detection of template layouts from CSS analysis
3. **Template Compatibility**: More robust template code modification patterns
4. **Performance**: Optimize pagination calculation for large resumes
5. **Error Recovery**: Better fallback mechanisms when pagination fails
6. **Visual Feedback**: Show pagination calculation progress to users
7. **Caching**: More aggressive caching of pagination results

---

## Related Documentation

- Template Generation: `templates/TEMPLATE_GENERATION_PROMPT.md`
- Pagination Flow: `templates/PAGINATION_FLOW.md`
- API Specification: `api/API-SPEC.md`

---

*Last Updated: 2024*
*Maintained by: GetQuickResume Development Team*

