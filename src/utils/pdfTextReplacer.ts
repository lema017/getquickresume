/**
 * PDF Text Replacer
 *
 * Replaces text in an existing PDF with translated text using a
 * white-out + overlay technique. Uses pdfjs-dist to read text positions
 * and pdf-lib to modify the PDF.
 *
 * Hybrid sizing strategy:
 * 1. Try original font size
 * 2. Shrink up to 20% if text overflows
 * 3. Word-wrap if still overflowing, shift subsequent lines down
 * 4. Add continuation pages if content exceeds page bounds (never truncate)
 */

import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from 'pdf-lib';

// Reuse the same worker setup as documentTextExtractor
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TextItem {
  str: string;
  x: number;
  y: number;
  fontSize: number;
  width: number;
  height: number;
}

interface TextLine {
  items: TextItem[];
  text: string;
  x: number;
  y: number;
  fontSize: number;
  width: number;
  height: number;
}

interface PageTextData {
  pageIndex: number;
  width: number;
  height: number;
  lines: TextLine[];
}

// ---------------------------------------------------------------------------
// Step 1: Extract text items with positions from each page using pdfjs-dist
// ---------------------------------------------------------------------------

async function extractTextPositions(pdfBytes: ArrayBuffer): Promise<PageTextData[]> {
  const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
  const pages: PageTextData[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const textContent = await page.getTextContent();

    const items: TextItem[] = [];

    for (const item of textContent.items) {
      if (!('str' in item) || !item.str.trim()) continue;

      const typedItem = item as {
        str: string;
        transform: number[];
        width: number;
        height: number;
      };

      // transform = [scaleX, skewY, skewX, scaleY, translateX, translateY]
      const fontSize = Math.abs(typedItem.transform[3]) || Math.abs(typedItem.transform[0]) || 12;
      const x = typedItem.transform[4];
      // pdfjs-dist uses bottom-left origin, same as PDF coordinate system
      const y = typedItem.transform[5];
      const width = typedItem.width;
      const height = typedItem.height || fontSize;

      items.push({
        str: typedItem.str,
        x,
        y,
        fontSize,
        width,
        height,
      });
    }

    pages.push({
      pageIndex: pageNum - 1,
      width: viewport.width,
      height: viewport.height,
      lines: groupIntoLines(items),
    });
  }

  return pages;
}

// ---------------------------------------------------------------------------
// Step 2: Group text items into logical lines by y-coordinate proximity
// ---------------------------------------------------------------------------

function groupIntoLines(items: TextItem[]): TextLine[] {
  if (items.length === 0) return [];

  // Sort by y (descending = top to bottom in PDF coords) then by x (left to right)
  const sorted = [...items].sort((a, b) => {
    const yDiff = b.y - a.y;
    if (Math.abs(yDiff) > 3) return yDiff;
    return a.x - b.x;
  });

  const lines: TextLine[] = [];
  let currentLineItems: TextItem[] = [sorted[0]];
  let currentY = sorted[0].y;

  for (let i = 1; i < sorted.length; i++) {
    const item = sorted[i];
    // Items within 3pt of the same y are on the same line
    if (Math.abs(item.y - currentY) <= 3) {
      currentLineItems.push(item);
    } else {
      lines.push(buildLine(currentLineItems));
      currentLineItems = [item];
      currentY = item.y;
    }
  }

  if (currentLineItems.length > 0) {
    lines.push(buildLine(currentLineItems));
  }

  return lines;
}

function buildLine(items: TextItem[]): TextLine {
  // Sort items left to right within the line
  items.sort((a, b) => a.x - b.x);

  const text = items.map((it) => it.str).join(' ');
  const x = items[0].x;
  const y = items[0].y;
  const fontSize = Math.max(...items.map((it) => it.fontSize));
  const lastItem = items[items.length - 1];
  const width = lastItem.x + lastItem.width - x;
  const height = Math.max(...items.map((it) => it.height));

  return { items, text, x, y, fontSize, width, height };
}

// ---------------------------------------------------------------------------
// Step 3: Map translated text lines to original positions
// ---------------------------------------------------------------------------

function mapTranslatedLines(
  originalPages: PageTextData[],
  translatedText: string
): Map<number, string[]> {
  // Collect all original lines across pages in order
  const allOriginalLines: { pageIndex: number; text: string }[] = [];
  for (const page of originalPages) {
    for (const line of page.lines) {
      allOriginalLines.push({ pageIndex: page.pageIndex, text: line.text });
    }
  }

  // Split translated text into lines
  const translatedLines = translatedText
    .split('\n')
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0);

  // Build a page -> translated lines map
  const pageLineMap = new Map<number, string[]>();

  if (allOriginalLines.length === 0) return pageLineMap;

  // Proportional distribution: distribute translated lines across pages
  // in the same ratio as original lines per page
  const linesPerPage: { pageIndex: number; count: number }[] = [];
  let currentPage = allOriginalLines[0].pageIndex;
  let count = 0;

  for (const ol of allOriginalLines) {
    if (ol.pageIndex !== currentPage) {
      linesPerPage.push({ pageIndex: currentPage, count });
      currentPage = ol.pageIndex;
      count = 0;
    }
    count++;
  }
  linesPerPage.push({ pageIndex: currentPage, count });

  const totalOriginal = allOriginalLines.length;
  const totalTranslated = translatedLines.length;
  let translatedIdx = 0;

  for (const { pageIndex, count: origCount } of linesPerPage) {
    // Proportional share of translated lines for this page
    const share = Math.round((origCount / totalOriginal) * totalTranslated);
    const endIdx = Math.min(translatedIdx + Math.max(share, 1), totalTranslated);
    pageLineMap.set(pageIndex, translatedLines.slice(translatedIdx, endIdx));
    translatedIdx = endIdx;
  }

  // If any translated lines remain, append to last page
  if (translatedIdx < totalTranslated) {
    const lastPageIdx = linesPerPage[linesPerPage.length - 1].pageIndex;
    const existing = pageLineMap.get(lastPageIdx) || [];
    existing.push(...translatedLines.slice(translatedIdx));
    pageLineMap.set(lastPageIdx, existing);
  }

  return pageLineMap;
}

// ---------------------------------------------------------------------------
// Step 4: Hybrid text sizing helpers
// ---------------------------------------------------------------------------

const MIN_FONT_SCALE = 0.8;
const LINE_HEIGHT_FACTOR = 1.2;
const PAGE_MARGIN = 36; // 0.5 inch margin for continuation pages

function measureTextWidth(text: string, font: PDFFont, fontSize: number): number {
  return font.widthOfTextAtSize(text, fontSize);
}

/**
 * Word-wrap text to fit within maxWidth at the given fontSize.
 * Returns an array of sub-lines.
 */
function wordWrap(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  if (words.length === 0) return [text];

  const subLines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureTextWidth(candidate, font, fontSize) <= maxWidth) {
      current = candidate;
    } else {
      if (current) subLines.push(current);
      current = word;
      // If a single word exceeds maxWidth, include it anyway (don't truncate)
    }
  }
  if (current) subLines.push(current);

  return subLines.length > 0 ? subLines : [text];
}

/**
 * Determines how to render a translated line given the original bounding box.
 * Returns: { subLines, fontSize, lineHeight }
 */
function fitText(
  translatedLine: string,
  originalFontSize: number,
  availableWidth: number,
  font: PDFFont
): { subLines: string[]; fontSize: number; lineHeight: number } {
  // Try original font size first
  let fontSize = originalFontSize;
  let width = measureTextWidth(translatedLine, font, fontSize);

  if (width <= availableWidth) {
    return {
      subLines: [translatedLine],
      fontSize,
      lineHeight: fontSize * LINE_HEIGHT_FACTOR,
    };
  }

  // Shrink font size in 0.5pt decrements down to 80% of original
  const minFontSize = originalFontSize * MIN_FONT_SCALE;
  fontSize = originalFontSize - 0.5;
  while (fontSize >= minFontSize) {
    width = measureTextWidth(translatedLine, font, fontSize);
    if (width <= availableWidth) {
      return {
        subLines: [translatedLine],
        fontSize,
        lineHeight: fontSize * LINE_HEIGHT_FACTOR,
      };
    }
    fontSize -= 0.5;
  }

  // Still overflows at 80% -- word-wrap at the minimum font size
  fontSize = Math.max(minFontSize, 6); // never go below 6pt
  const subLines = wordWrap(translatedLine, font, fontSize, availableWidth);
  return {
    subLines,
    fontSize,
    lineHeight: fontSize * LINE_HEIGHT_FACTOR,
  };
}

// ---------------------------------------------------------------------------
// Step 5: Main replacement function
// ---------------------------------------------------------------------------

export async function replaceTextInPdf(
  originalPdfBytes: ArrayBuffer,
  translatedText: string
): Promise<Uint8Array> {
  // Extract text positions from original PDF
  const pageTextData = await extractTextPositions(originalPdfBytes);

  // Map translated lines to original page positions
  const pageLineMap = mapTranslatedLines(pageTextData, translatedText);

  // Load PDF with pdf-lib for modification
  const pdfDoc = await PDFDocument.load(originalPdfBytes, { ignoreEncryption: true });
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Font size threshold to detect headings (bold)
  const HEADING_FONT_SIZE_THRESHOLD = 14;

  for (const pageData of pageTextData) {
    const page = pdfDoc.getPages()[pageData.pageIndex];
    if (!page) continue;

    const { width: pageWidth, height: pageHeight } = page.getSize();
    const translatedLines = pageLineMap.get(pageData.pageIndex) || [];

    // White out all original text areas on this page
    for (const line of pageData.lines) {
      const padding = 2;
      page.drawRectangle({
        x: line.x - padding,
        y: line.y - padding,
        width: line.width + padding * 2,
        height: line.height + padding * 2,
        color: rgb(1, 1, 1),
      });
    }

    // Draw translated text
    const originalLines = pageData.lines;
    let yOffset = 0; // accumulated vertical shift from wrapped lines

    // Track where we are for continuation pages
    let currentPage: PDFPage = page;
    let continuationY = pageHeight - PAGE_MARGIN;

    for (let i = 0; i < translatedLines.length; i++) {
      const translatedLine = translatedLines[i];
      const originalLine = originalLines[i]; // may be undefined if translated has more lines

      let baseX: number;
      let baseY: number;
      let baseFontSize: number;
      let availableWidth: number;

      if (originalLine) {
        baseX = originalLine.x;
        baseY = originalLine.y - yOffset;
        baseFontSize = originalLine.fontSize;
        // Available width: from line start to page edge minus same margin
        availableWidth = pageWidth - originalLine.x - PAGE_MARGIN;
      } else {
        // Extra translated lines with no original counterpart
        baseX = PAGE_MARGIN;
        baseY = continuationY - yOffset;
        baseFontSize = 10; // default size for overflow lines
        availableWidth = pageWidth - PAGE_MARGIN * 2;
      }

      const font = baseFontSize >= HEADING_FONT_SIZE_THRESHOLD ? helveticaBold : helvetica;
      const { subLines, fontSize, lineHeight } = fitText(
        translatedLine,
        baseFontSize,
        availableWidth,
        font
      );

      for (let s = 0; s < subLines.length; s++) {
        let drawY = baseY - s * lineHeight;

        // Check if we need a continuation page
        if (drawY < PAGE_MARGIN) {
          // Add a new page with same dimensions
          const newPage = pdfDoc.insertPage(
            pdfDoc.getPageCount(),
            [pageWidth, pageHeight]
          );
          currentPage = newPage;
          // Reset Y to top of new page
          drawY = pageHeight - PAGE_MARGIN;
          // Reset yOffset relative to new page
          yOffset = 0;
          baseY = drawY;
          continuationY = drawY;
        }

        currentPage.drawText(subLines[s], {
          x: baseX,
          y: drawY,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }

      // Accumulate extra vertical space from wrapped lines
      if (subLines.length > 1) {
        const extraLines = subLines.length - 1;
        yOffset += extraLines * lineHeight;
      }
    }
  }

  return pdfDoc.save();
}
