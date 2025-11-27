
## Pagination Requirements

### Rule 1: Page Dimensions

- **A4 Size**: 210mm × 297mm
- **Width**: 794px (210mm × 3.7795275591)
- **Height**: 1123px (297mm × 3.7795275591)
- **Top Margin**: 20px
- **Bottom Margin**: 30px
- **Available Height**: 1073px (1123 - 20 - 30)

### Rule 2: Indivisibility Rules

**Completely Indivisible**:
- Header: Must stay on one page (usually page 1)
- Summary/Profile: Must stay on  page 1 below header

**Partially Divisible**:
- Skills, Experience, Projects, Education, Languages, Achievements, Certifications
- Items are indivisible, but lists can split across pages
- Section title + first item must stay together

### Rule 3: Orphan Prevention

- Section titles cannot appear alone at bottom of page
- If title fits but first item doesn't, move BOTH to next page

### Rule 4: Pagination Algorithm

1. Measure content heights using DOM
2. Assign pageNumbers based on available space
3. Check for orphaned titles
4. Render pages showing only matching pageNumber content

### Rule 5: Measurement Method

- Use DOM measurements (`offsetHeight`, `getBoundingClientRect()`)
- Measure with A4 width (210mm)
- Include margins and padding as content can not be near the edges of the page ,Top padding 20px  botton padding 30px

### Rule 6: Debug Logs

- Log height measurements
- Log page assignments
- Log available space
- Log indivisibility checks
- Log orphan detection





##Pagination flow
we must render all data for hidration on page 1  then we must analize the rendered template and the data and calculate the content that fits on page one (take into account the margins and paddings)
and assign the elements and items that will be part of page 1, the rest of elements and items  will be marked to be dispayed on page number 2
and we will rerender the template with the new calculated page number on the hidration data and we will repeat the process, we will analize page 2 and determine which e;lements and items can fit in the page two and the ones that do not fit, will be marked for page 3
and we will repat until there is no more data left to paginate.

Important to note that we should not leave content with overflow on any page at the end of the calculation.
