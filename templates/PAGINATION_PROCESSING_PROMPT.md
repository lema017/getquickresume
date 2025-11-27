# Pagination Processing Prompt - A4 Page Number Assignment

## ROLE

You are an expert in document pagination algorithms, specializing in:
- A4 document layout and page breaking
- Content measurement and height calculation
- Page number assignment algorithms
- Indivisibility rules and orphan prevention
- DOM measurement and layout calculation

Your expertise includes creating robust pagination logic that handles edge cases and ensures content never overflows or gets clipped.

---

## GOAL

Process an existing resume template Web Component and implement **intelligent A4 pagination** that:

1. **Measures actual content heights** using DOM measurements
2. **Assigns pageNumbers** to each section/item based on available space
3. **Respects indivisibility rules** (no splitting items across pages)
4. **Prevents orphaned titles** (section titles always stay with their first item)
5. **Renders pages correctly** showing only content for the current page
6. **Returns the modified template code** with pagination logic integrated

**IMPORTANT**: This prompt is for PAGINATION PROCESSING only. The template structure and design should already exist. Focus on:
- Page number assignment algorithm
- Height measurement logic
- Page rendering based on pageNumber
- Indivisibility rule enforcement

---

## CONTEXT

### System Architecture

- **Template**: An existing Web Component template (generated separately)
- **Data Structure**: Flat data object with resume sections
- **Page Size**: A4 (210mm × 297mm)
- **Margins**: 20px top, 30px bottom per page
- **Available Height**: 297mm - 20px - 30px = ~1047px (after conversion)

### Technical Constraints

- **Measurement Method**: Use DOM measurements (`getBoundingClientRect()`, `offsetHeight`, `scrollHeight`)
- **No External Libraries**: Use only native DOM and JavaScript APIs
- **Browser Compatibility**: Must work in modern browsers
- **Template Structure**: Work with existing template code structure

### Data Structure

The template receives data in this format:

```javascript
{
  name: string,
  title: string,
  contact: string,
  profile: string,
  skills: string[],
  experience: Array<{
    title: string,
    company: string,
    date: string,
    responsibilities: string[]
  }>,
  projects: Array<{...}>,
  education: Array<{...}>,
  languages: string[],
  achievements: string[],
  certifications: string[]
}
```

After pagination processing, each section/item should have a `pageNumber` assigned.

---

## RULES

### Rule 1: Page Dimensions

**A4 Page Specifications:**
- **Width**: 210mm = 794px (at 96 DPI)
- **Height**: 297mm = 1123px (at 96 DPI)
- **Top Margin**: 20px
- **Bottom Margin**: 30px
- **Available Content Height**: 1123px - 20px - 30px = **1073px per page**

**Conversion Formula:**
- 1mm = 3.7795275591px (at 96 DPI)
- A4 height in pixels: 297mm × 3.7795275591 = 1123px

### Rule 2: Indivisibility Rules

**Completely Indivisible (Cannot Split):**
- **Header**: Must stay on one page (usually page 1)
- **Summary/Profile**: Must stay on one page

**Partially Divisible (Items Indivisible, List Can Split):**
- **Skills**: Each badge is indivisible, but the list can split across pages
  - Section title + first row of badges must stay together
- **Experience**: Each experience item is indivisible
  - Section title + first experience item must stay together
- **Projects**: Each project item is indivisible
  - Section title + first project must stay together
- **Education**: Each education item is indivisible
  - Section title + first education item must stay together
- **Languages**: Each language is indivisible, but list can split
  - Section title + first language must stay together
- **Achievements**: Each achievement is indivisible, but list can split
  - Section title + first achievement must stay together
- **Certifications**: Each certification is indivisible, but list can split
  - Section title + first certification must stay together

### Rule 3: Orphan Prevention

**No Orphaned Titles:**
- A section title (e.g., "EXPERIENCE") cannot appear alone at the bottom of a page
- If a section title fits but its first item doesn't fit, move BOTH to the next page
- This applies to: Skills, Experience, Projects, Education, Languages, Achievements, Certifications

**Example:**
```
Page 1 (bottom):
  ...
  EXPERIENCE  ← ❌ WRONG: Title alone
[End of page]

Page 2:
  Senior Software Engineer  ← Item should be with title
```

**Correct:**
```
Page 1 (bottom):
  ...
[End of page]

Page 2:
  EXPERIENCE  ← ✅ Title with first item
  Senior Software Engineer
```

### Rule 4: Pagination Algorithm

**Step 1: Initial Measurement**
1. Render all content in a temporary container
2. Measure the height of each section/item
3. Calculate available space on page 1 (1073px - current content height)

**Step 2: Page Assignment**
1. Start with page 1
2. For each section/item in order:
   - Measure its height
   - Check if it fits in current page's remaining space
   - If it fits AND doesn't violate indivisibility rules:
     - Assign current pageNumber
     - Add height to current page
   - If it doesn't fit OR violates rules:
     - Move to next page
     - Assign new pageNumber
     - Reset current page height

**Step 3: Orphan Prevention Check**
1. After assigning pageNumbers, check for orphaned titles
2. If a title is on a different page than its first item:
   - Move both title and first item to the same page (the page of the first item)
   - Adjust subsequent items if needed

**Step 4: Page Rendering**
1. Implement a method that renders only content for a specific page
2. Filter sections/items by pageNumber
3. Render pages sequentially (1, 2, 3, ...)

### Rule 5: Measurement Method

**Use DOM Measurements:**
```javascript
// Create temporary element to measure
const tempDiv = document.createElement('div');
tempDiv.style.position = 'absolute';
tempDiv.style.visibility = 'hidden';
tempDiv.style.width = '210mm';  // A4 width
tempDiv.innerHTML = sectionHTML;
document.body.appendChild(tempDiv);

// Measure height
const height = tempDiv.offsetHeight;  // or getBoundingClientRect().height

// Cleanup
document.body.removeChild(tempDiv);
```

**Important:**
- Measure with actual A4 width (210mm)
- Include all margins and padding in measurement
- Account for section spacing

### Rule 6: Debugging Logs

**Add console.log statements for:**
- Height measurements: `console.log('Measuring [section]:', height)`
- Page assignments: `console.log('Assigned page [N] to [section]:', reason)`
- Available space: `console.log('Page [N] available space:', availableSpace)`
- Indivisibility checks: `console.log('Indivisibility check:', result)`
- Orphan detection: `console.log('Orphan detected:', section)`

---

## EXPECTED OUTPUT

### Output Format

**Return the COMPLETE modified template code** with pagination logic integrated. The code should:
- Include all original template code
- Add pagination methods
- Modify render() to use pagination
- Return ONLY JavaScript code - no markdown, no explanations

### Output Structure

The modified template must include:

1. **Pagination Methods:**
   ```javascript
   measureSectionHeight(sectionHTML) { /* ... */ }
   assignPageNumbers() { /* ... */ }
   renderPage(pageNumber) { /* ... */ }
   ```

2. **Modified render() Method:**
   ```javascript
   render() {
     // Assign pageNumbers first
     this.assignPageNumbers();
     
     // Render all pages
     const pages = this.renderAllPages();
     this.shadowRoot.innerHTML = pages;
   }
   ```

3. **Page Rendering:**
   - Render each page as a separate container
   - Each page shows only content with matching pageNumber
   - Pages are stacked vertically for preview

4. **Debugging Logs:**
   - Console logs for measurements
   - Console logs for page assignments
   - Console logs for orphan detection

### Output Validation

Before returning code, verify:

- ✅ Page dimensions are correct (A4: 210mm × 297mm)
- ✅ Margins are respected (20px top, 30px bottom)
- ✅ Indivisibility rules are enforced
- ✅ No orphaned titles
- ✅ All content has pageNumbers assigned
- ✅ Pages render correctly
- ✅ No content overflow or clipping
- ✅ Debugging logs are included

### Success Criteria

The pagination processing is successful if:

1. **Functionality:**
   - All sections/items have pageNumbers assigned
   - Pages render correctly showing only relevant content
   - No content is lost or duplicated

2. **Indivisibility:**
   - Header and Summary stay on one page
   - No items are split across pages
   - Section titles stay with their first items

3. **Layout:**
   - No content overflow beyond page boundaries
   - Margins are respected
   - Pages are properly sized (A4)

4. **Code Quality:**
   - Valid JavaScript syntax
   - Clean, maintainable pagination logic
   - Proper error handling
   - Debugging logs included

---

## IMPLEMENTATION GUIDE

### Step 1: Understand Template Structure

1. Analyze the existing template code
2. Identify all render methods
3. Understand the data structure
4. Note section order

### Step 2: Implement Measurement Method

```javascript
measureSectionHeight(sectionHTML) {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.visibility = 'hidden';
  tempDiv.style.width = '210mm';
  tempDiv.style.padding = '0 30px';  // Side padding
  tempDiv.innerHTML = sectionHTML;
  document.body.appendChild(tempDiv);
  
  const height = tempDiv.offsetHeight;
  document.body.removeChild(tempDiv);
  
  console.log('Measured height:', height);
  return height;
}
```

### Step 3: Implement Page Assignment

```javascript
assignPageNumbers() {
  const PAGE_HEIGHT = 1123;  // 297mm in pixels
  const TOP_MARGIN = 20;
  const BOTTOM_MARGIN = 30;
  const AVAILABLE_HEIGHT = PAGE_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN;
  
  let currentPage = 1;
  let currentPageHeight = TOP_MARGIN;  // Start with top margin
  
  const sections = this.buildSections();  // Get all sections in order
  
  sections.forEach((section, index) => {
    const height = this.measureSectionHeight(section.html);
    
    // Check if fits on current page
    if (currentPageHeight + height <= AVAILABLE_HEIGHT) {
      section.pageNumber = currentPage;
      currentPageHeight += height;
      console.log(`Assigned page ${currentPage} to ${section.type}`);
    } else {
      // Move to next page
      currentPage++;
      currentPageHeight = TOP_MARGIN + height;
      section.pageNumber = currentPage;
      console.log(`Assigned page ${currentPage} to ${section.type} (didn't fit on previous page)`);
    }
  });
}
```

### Step 4: Implement Orphan Prevention

```javascript
preventOrphans() {
  // Check each section for orphaned titles
  // If title and first item are on different pages, move both to item's page
  // Adjust subsequent items if needed
}
```

### Step 5: Implement Page Rendering

```javascript
renderPage(pageNumber) {
  // Filter sections/items by pageNumber
  // Render only matching content
  // Return HTML for this page
}

renderAllPages() {
  const maxPage = Math.max(...this.getAllPageNumbers());
  let html = '';
  
  for (let i = 1; i <= maxPage; i++) {
    html += this.renderPage(i);
  }
  
  return html;
}
```

### Step 6: Modify render() Method

```javascript
render() {
  if (!this._data) return;
  
  // Assign pageNumbers first
  this.assignPageNumbers();
  
  // Prevent orphans
  this.preventOrphans();
  
  // Render all pages
  const pagesHTML = this.renderAllPages();
  const style = this.getStyles();
  
  this.shadowRoot.innerHTML = style + pagesHTML;
}
```

---

## FINAL CHECKLIST

Before generating code, verify:

**Page Dimensions:**
- ✅ A4 size: 210mm × 297mm
- ✅ Top margin: 20px
- ✅ Bottom margin: 30px
- ✅ Available height: ~1073px per page

**Indivisibility:**
- ✅ Header and Summary are indivisible
- ✅ Section items are indivisible
- ✅ Section titles stay with first items

**Orphan Prevention:**
- ✅ No orphaned section titles
- ✅ Titles always with their first item

**Measurement:**
- ✅ Uses DOM measurements
- ✅ Measures with correct A4 width
- ✅ Accounts for margins and padding

**Rendering:**
- ✅ Pages render correctly
- ✅ Only matching pageNumber content shown
- ✅ No overflow or clipping

**Debugging:**
- ✅ Logs for measurements
- ✅ Logs for page assignments
- ✅ Logs for orphan detection

---

## GENERATE CODE NOW

Process the template code and add pagination logic following all rules above. Return the COMPLETE modified template code with pagination integrated.

Return ONLY the code - no markdown, no explanations, no comments outside the code.

