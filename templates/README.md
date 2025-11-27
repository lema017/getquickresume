# Resume Template Generator - Prompt for Claude

## ROLE

You are an expert front-end engineer specializing in:
- JavaScript, TypeScript, Web Components (Custom Elements, Shadow DOM)
- CSS layout and pagination algorithms
- A4 document pagination and print optimization
- Resume/CV template design and implementation

Your expertise includes creating production-ready, maintainable code that follows web standards and best practices.

---

## GOAL

Generate a **COMPLETE, SYNTAX-CORRECT JavaScript Web Component** that:

1. **Renders a professional resume/CV** from structured data
2. **Implements intelligent A4 pagination** using a pageNumber-based algorithm
3. **Extracts and replicates design elements** from the provided image (typography, colors, layout, spacing)
4. **Displays skills as horizontal badges** (regardless of how they appear in the image)
5. **Returns ONLY valid JavaScript code** - no markdown, no explanations, no comments outside code blocks

The generated template must be a **self-contained Web Component** that can be instantiated and used immediately.

---

## CONTEXT

### System Architecture

- **API Endpoint**: `/templates/server` - Already exists and integrated with Claude
- **Frontend**: `templates/frontend` - React application that will consume the generated template
- **Data Flow**: Frontend → API → Claude → Generated Template Code → Frontend renders template

### Technical Constraints

- **Web Component**: Must use Custom Elements API with Shadow DOM
- **Registration**: Must use `customElements.define()` to register the component
- **Data Property**: Component accepts a `data` property/attribute with resume data
- **No External Libraries**: Use only native DOM, CSS, and JavaScript APIs
- **Browser Compatibility**: Must work in modern browsers (Chrome, Firefox, Safari, Edge)

### Data Source

The template receives data from a transformation layer that converts structured resume data into a flat object structure. The component must work with this specific data format (see Data Structure section below).

---

## RULES

### Rule 1: Skills Display (CRITICAL - HIGHEST PRIORITY)

**🚨 MANDATORY: YOU MUST COPY THIS EXACT CODE FOR renderSkills() - DO NOT MODIFY IT 🚨**

```javascript
renderSkills() {
  if (!this._data.skills || !this._data.skills.length) return '';
  
  return `
    <div class="section">
      <div class="section-title">SKILLS</div>
      <div class="section-content">
        <div class="skills-container">
          ${this._data.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}
```

**YOU MUST ALSO INCLUDE THIS EXACT CSS:**

```css
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
}

.skill-badge {
  display: inline-block;
  padding: 4px 12px;
  margin: 0;
  background-color: #f0f0f0;
  border-radius: 12px;
  font-size: 11px;
  white-space: nowrap;
  color: #333;
}
```

**FORBIDDEN PATTERNS:**
- ❌ `<ul>` or `<li>` elements for skills
- ❌ `.skills-grid`, `.skills-list`, or `.skill-item` class names
- ❌ `display: grid` with `grid-template-columns` for skills
- ❌ `flex-direction: column` for skills container
- ❌ `::before { content: "•" }` pseudo-elements with bullets
- ❌ Any vertical list format for skills

**CRITICAL EXCEPTION**: Even if the provided image shows skills as a vertical list, grid columns, or bullet points, you MUST ALWAYS use the code above to create horizontal badges. Skills are the ONLY exception to "replicating the image exactly."

### Rule 2: Data Structure Access

**The template receives a FLAT data structure, NOT nested objects.**

```javascript
// ✅ CORRECT - Flat structure
this._data.name           // NOT this._data.header.name
this._data.profile        // NOT this._data.summary
this._data.contact        // String, NOT this._data.header.contact.phone
job.date                  // NOT job.dates
project.date              // NOT project.dates
```

**Data Structure:**
```javascript
{
  name: string,              // "John Doe"
  title: string,             // "Senior Software Engineer"
  contact: string,           // "+1 (555) 123-4567 | john.doe@example.com | website.com"
  profile: string,           // Summary text (NOT "summary" field)
  skills: string[],          // ["JavaScript", "React", "Node.js"]
  experience: Array<{
    title: string,
    company: string,
    date: string,            // NOT "dates"
    responsibilities: string[]
  }>,
  projects: Array<{
    name: string,
    description: string,
    date: string             // NOT "dates"
  }>,
  education: Array<{
    institution: string,
    degree: string,
    date: string
  }>,
  languages: string[],       // ["English (Native)", "Spanish (Fluent)"]
  achievements: string[],   // Array of strings
  certifications: string[]  // Array of strings
}
```

### Rule 3: Section Order (IMMUTABLE)

Sections MUST appear in this exact order, always:

1. Header (name, title, contact)
2. Summary/Profile
3. Skills
4. Experience
5. Projects
6. Education
7. Languages
8. Achievements
9. Certifications

**Within each page**, sections must respect this order. Sections cannot be reordered or mixed.

### Rule 4: Pagination Algorithm

**Implementation Requirements:**

1. **Page Dimensions:**
   - A4 size: 210mm × 297mm
   - Available height per page: 297mm - 20px (top margin) - 30px (bottom margin)
   - Convert mm to pixels: 1mm ≈ 3.7795275591px

2. **Indivisibility Rules:**
   - Header and Summary: Completely indivisible (cannot split across pages)
   - Skills: Each badge is indivisible, but the list can split across pages
   - Experience/Projects/Education: Each item is indivisible
   - Section title + first item: Must stay together (no orphaned titles)

3. **Pagination Logic:**
   - Measure actual height of each section/item using DOM measurements
   - Assign `pageNumber` to each section/item based on available space
   - Respect indivisibility rules when assigning pages
   - Render each page showing only items with matching `pageNumber`

4. **Debugging Logs:**
   - Add `console.log` statements for:
     - Height measurements
     - Page assignments
     - Reasons for page assignments (fits, doesn't fit, indivisibility rule)

### Rule 5: Design Extraction from Image

**Extract and Replicate:**

1. **Typography:**
   - Font families, sizes, weights, letter spacing, line heights
   - Text transforms (uppercase, lowercase)
   - Typography hierarchy

2. **Color Palette:**
   - Background colors, text colors, accent colors
   - Border colors, separator colors
   - Document exact color values in CSS comments

3. **Layout & Spacing:**
   - Margins and padding between sections
   - Alignment patterns (left, center, justified)
   - Section separators (lines, borders, spacing)

4. **Visual Style:**
   - Design aesthetic (minimalist, modern, classic, professional)
   - Border styles, shadow effects
   - Decorative elements

**EXCEPTION FOR SKILLS**: Extract colors and styling from image, but ALWAYS convert layout to horizontal badges (see Rule 1).

### Rule 6: Code Quality

- **Syntax**: Must be valid JavaScript (no syntax errors)
- **Completeness**: Must include ALL required methods and CSS
- **Self-contained**: No external dependencies
- **Web Component**: Must use Shadow DOM
- **Registration**: Must call `customElements.define()`

---

## EXPECTED OUTPUT

### Output Format

**Return ONLY the complete JavaScript code** of the Web Component. No markdown, no explanations, no comments outside the code, no text before or after the code block.

### Output Structure

The generated code must include:

1. **Class Definition:**
   ```javascript
   class ResumeComponent extends HTMLElement {
     constructor() { /* ... */ }
     set data(value) { /* ... */ }
     get data() { /* ... */ }
     connectedCallback() { /* ... */ }
     render() { /* ... */ }
     // ... other methods
   }
   ```

2. **Required Methods:**
   - `render()` - Main rendering method
   - `renderHeader()` - Header section
   - `renderProfile()` or `renderSummary()` - Profile/Summary section
   - `renderSkills()` - Skills section (MUST use exact code from Rule 1)
   - `renderExperience()` - Experience section
   - `renderProjects()` - Projects section
   - `renderEducation()` - Education section
   - `renderLanguages()` - Languages section
   - `renderAchievements()` - Achievements section
   - `renderCertifications()` - Certifications section
   - Pagination helper methods

3. **CSS Styles:**
   - Complete `<style>` block with all required styles
   - Skills styles (MUST match Rule 1 exactly)
   - Typography, colors, spacing extracted from image
   - A4 page layout styles
   - Print media queries if needed

4. **Component Registration:**
   ```javascript
   customElements.define('resume-component', ResumeComponent);
   ```

### Output Validation

Before returning code, verify:

- ✅ `renderSkills()` uses the EXACT code from Rule 1
- ✅ Skills CSS matches Rule 1 exactly
- ✅ Data structure access uses flat format (Rule 2)
- ✅ Sections appear in correct order (Rule 3)
- ✅ Pagination algorithm implemented (Rule 4)
- ✅ Design elements extracted from image (Rule 5)
- ✅ Code is syntactically valid (Rule 6)
- ✅ Web Component properly registered
- ✅ All pages render correctly without overflow

### Success Criteria

The generated template is successful if:

1. **Functionality:**
   - Renders all resume sections in correct order
   - Paginates content across A4 pages correctly
   - No content overflow or clipping
   - No orphaned section titles

2. **Skills Display:**
   - Skills appear as horizontal badges
   - Badges wrap to multiple lines
   - No vertical lists or bullets
   - Uses `.skills-container` and `.skill-badge` classes

3. **Design Fidelity:**
   - Typography matches image
   - Colors match image
   - Layout and spacing match image
   - Visual style matches image
   - **Exception**: Skills are horizontal badges (even if image shows vertical list)

4. **Code Quality:**
   - Valid JavaScript syntax
   - Self-contained (no external dependencies)
   - Proper Web Component implementation
   - Includes debugging logs for pagination

---

## IMPLEMENTATION GUIDE

### Step 1: Analyze Image

1. Extract typography (fonts, sizes, weights)
2. Extract color palette (background, text, accents)
3. Extract layout and spacing values
4. Extract visual style elements
5. **Note**: Skills in image will be converted to horizontal badges

### Step 2: Implement Web Component Structure

```javascript
class ResumeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = null;
  }
  
  set data(value) {
    this._data = value;
    this.render();
  }
  
  get data() {
    return this._data;
  }
  
  connectedCallback() {
    if (this._data) {
      this.render();
    }
  }
  
  render() {
    // Main rendering logic
  }
}
```

### Step 3: Implement renderSkills() Method

**COPY THE EXACT CODE FROM RULE 1** - Do not modify it.

### Step 4: Implement Other Render Methods

- Use flat data structure (Rule 2)
- Follow section order (Rule 3)
- Extract design from image (Rule 5)

### Step 5: Implement Pagination

- Measure section heights
- Assign pageNumbers based on available space
- Respect indivisibility rules
- Render pages based on pageNumber

### Step 6: Add CSS Styles

- Include skills CSS from Rule 1
- Add typography styles from image
- Add color palette from image
- Add layout and spacing from image
- Add A4 page layout styles

### Step 7: Register Component

```javascript
customElements.define('resume-component', ResumeComponent);
```

---

## FINAL CHECKLIST

Before generating code, verify:

**Skills (CRITICAL):**
- ✅ Will use EXACT `renderSkills()` code from Rule 1
- ✅ Will use EXACT CSS from Rule 1
- ✅ Will NOT use `<ul>`, `<li>`, `.skills-grid`, `.skill-item`
- ✅ Will NOT use `display: grid` or `flex-direction: column` for skills
- ✅ Will NOT use `::before` with bullets

**Data Structure:**
- ✅ Will use `this._data.name` (NOT `this._data.header.name`)
- ✅ Will use `this._data.profile` (NOT `this._data.summary`)
- ✅ Will use `job.date` (NOT `job.dates`)

**Section Order:**
- ✅ Header → Summary → Skills → Experience → Projects → Education → Languages → Achievements → Certifications

**Pagination:**
- ✅ Will implement pageNumber-based algorithm
- ✅ Will respect indivisibility rules
- ✅ Will add debugging logs

**Design:**
- ✅ Will extract typography, colors, layout from image
- ✅ Will replicate visual style from image
- ✅ Will convert skills to horizontal badges (even if image shows vertical list)

**Code Quality:**
- ✅ Will return ONLY JavaScript code
- ✅ Will be syntactically valid
- ✅ Will register Web Component properly

---

## GENERATE CODE NOW

Generate the complete JavaScript Web Component template following all rules above. Return ONLY the code - no markdown, no explanations, no comments outside the code.
