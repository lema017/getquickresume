// A4 Page Dimensions Constants
export const A4_DIMENSIONS = {
  widthMM: 210,
  heightMM: 297,
  widthPX: 794, // 210mm × 3.7795275591
  heightPX: 1123, // 297mm × 3.7795275591
  topMargin: 20,
  bottomMargin: 30,
  availableHeight: 1073, // 1123 - 20 - 30
} as const;

// Measurement result for a section/item
export interface MeasuredItem {
  type: string;
  height: number;
  element?: Element | null;
  data?: any;
}

// Page assignment result
export interface PageAssignment {
  pageNumber: number;
  height: number;
}

/**
 * Measure the height of an element in the shadow DOM
 */
export function measureElementHeight(element: Element | null): number {
  if (!element) {
    console.log('[PAGINATION] Element is null, returning 0');
    return 0;
  }

  const rect = element.getBoundingClientRect();
  const height = rect.height || (element as HTMLElement).offsetHeight || 0;
  
  console.log(`[PAGINATION] Measured element height: ${height}px`, {
    tagName: element.tagName,
    className: element.className,
    offsetHeight: (element as HTMLElement).offsetHeight,
    scrollHeight: (element as HTMLElement).scrollHeight,
    boundingRect: rect.height,
  });

  return height;
}

/**
 * Find elements in shadow DOM by class name or tag name
 */
export function findElementsInShadow(
  shadowRoot: ShadowRoot | null,
  selector: string
): Element[] {
  if (!shadowRoot) {
    console.log('[PAGINATION] Shadow root is null');
    return [];
  }

  const elements = Array.from(shadowRoot.querySelectorAll(selector));
  console.log(`[PAGINATION] Found ${elements.length} elements with selector "${selector}"`);
  return elements;
}

/**
 * Check if an item fits on the current page
 */
export function fitsOnPage(
  currentPageHeight: number,
  itemHeight: number,
  availableHeight: number = A4_DIMENSIONS.availableHeight
): boolean {
  const fits = currentPageHeight + itemHeight <= availableHeight;
  console.log(`[PAGINATION] Fit check: ${currentPageHeight}px + ${itemHeight}px = ${currentPageHeight + itemHeight}px <= ${availableHeight}px = ${fits}`);
  return fits;
}

/**
 * Apply indivisibility rules
 * Header and Profile must stay on page 1
 */
export function isIndivisible(type: string): boolean {
  const indivisible = type === 'header' || type === 'profile' || type === 'summary';
  if (indivisible) {
    console.log(`[PAGINATION] Section "${type}" is indivisible (must stay on page 1)`);
  }
  return indivisible;
}

/**
 * Check if a section title would be orphaned
 * (title fits but first item doesn't)
 */
export function wouldBeOrphaned(
  titleHeight: number,
  firstItemHeight: number,
  currentPageHeight: number,
  availableHeight: number = A4_DIMENSIONS.availableHeight
): boolean {
  const titleFits = fitsOnPage(currentPageHeight, titleHeight, availableHeight);
  const firstItemFits = fitsOnPage(currentPageHeight + titleHeight, firstItemHeight, availableHeight);
  
  const orphaned = titleFits && !firstItemFits;
  
  if (orphaned) {
    console.log(`[PAGINATION] Orphan detected: title fits (${titleHeight}px) but first item doesn't (${firstItemHeight}px)`);
  }
  
  return orphaned;
}

