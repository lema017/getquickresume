/**
 * Font extraction and replacement utilities for template code
 */

export interface ExtractedFont {
  id: string;
  value: string;
  originalValue: string;
  label: string;
  context: string;
  category: 'heading' | 'body' | 'unknown';
  occurrences: number;
}

/**
 * Extract font name from font-family declaration
 * Handles formats like: 'Roboto', sans-serif or "Open Sans", Arial, sans-serif
 */
function extractFontName(fontFamily: string): string {
  // Remove quotes and trim
  let cleaned = fontFamily.trim();
  
  // Remove surrounding quotes if present
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
      (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1);
  }
  
  // Split by comma and take the first font (before fallbacks)
  const firstFont = cleaned.split(',')[0].trim();
  
  // Remove quotes from first font if present
  if ((firstFont.startsWith('"') && firstFont.endsWith('"')) ||
      (firstFont.startsWith("'") && firstFont.endsWith("'"))) {
    return firstFont.slice(1, -1).trim();
  }
  
  return firstFont.trim();
}

/**
 * Categorize font based on CSS selector context
 */
function categorizeFont(context: string): 'heading' | 'body' | 'unknown' {
  const lowerContext = context.toLowerCase();
  
  // Heading indicators
  const headingPatterns = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    '.name', '.header', '.title', '.section-title',
    '.job-title', '.position', '.degree', '.institution'
  ];
  
  // Body indicators
  const bodyPatterns = [
    'body', 'p', '.section-content', '.description',
    '.profile', '.contact', '.job-description',
    '.experience-item', '.project', '.education-item'
  ];
  
  for (const pattern of headingPatterns) {
    if (lowerContext.includes(pattern)) {
      return 'heading';
    }
  }
  
  for (const pattern of bodyPatterns) {
    if (lowerContext.includes(pattern)) {
      return 'body';
    }
  }
  
  return 'unknown';
}

/**
 * Generate a meaningful label for a font based on context
 */
function generateFontLabel(font: ExtractedFont, allFonts: ExtractedFont[]): string {
  if (font.category === 'heading') {
    return 'Heading Font';
  }
  if (font.category === 'body') {
    return 'Body Font';
  }
  
  // Default: use index
  const index = allFonts.findIndex(f => f.id === font.id);
  return `Font ${index + 1}`;
}

/**
 * Extract all fonts from template code
 */
export function extractFontsFromCode(code: string): ExtractedFont[] {
  const fonts: ExtractedFont[] = [];
  const fontMap = new Map<string, ExtractedFont>();
  
  // Find CSS style block
  const styleMatch = code.match(/<style>([\s\S]*?)<\/style>/i);
  if (!styleMatch) return [];
  
  const cssContent = styleMatch[1];
  
  // Pattern to match font-family declarations
  // Matches: font-family: 'Roboto', sans-serif; or font-family: Arial;
  const fontPattern = /font-family:\s*([^;]+);/gi;
  
  let match;
  while ((match = fontPattern.exec(cssContent)) !== null) {
    const fontFamilyValue = match[1].trim();
    const startIndex = match.index;
    
    // Get context (surrounding CSS rule)
    const contextStart = Math.max(0, cssContent.lastIndexOf('{', startIndex));
    const contextEnd = Math.min(cssContent.length, cssContent.indexOf('}', startIndex) + 1);
    const context = cssContent.substring(contextStart, contextEnd);
    
    // Extract font name
    const fontName = extractFontName(fontFamilyValue);
    
    // Skip generic fonts (sans-serif, serif, monospace, etc.)
    const genericFonts = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'arial', 'helvetica', 'times', 'courier'];
    if (genericFonts.includes(fontName.toLowerCase())) {
      continue;
    }
    
    // Categorize font
    const category = categorizeFont(context);
    
    // Check if we've seen this font before
    const existing = fontMap.get(fontName.toLowerCase());
    if (existing) {
      existing.occurrences++;
      // Update category if we have a better match
      if (category !== 'unknown' && existing.category === 'unknown') {
        existing.category = category;
      }
      // Update context if this one is more descriptive
      if (context.length < existing.context.length || 
          (category !== 'unknown' && existing.category === 'unknown')) {
        existing.context = context;
      }
    } else {
      const fontId = `font-${fontMap.size + 1}`;
      const font: ExtractedFont = {
        id: fontId,
        value: fontName,
        originalValue: fontFamilyValue,
        label: '', // Will be set later
        context: context,
        category: category,
        occurrences: 1
      };
      fontMap.set(fontName.toLowerCase(), font);
      fonts.push(font);
    }
  }
  
  // Generate labels for all fonts
  fonts.forEach(font => {
    font.label = generateFontLabel(font, fonts);
  });
  
  // Sort by category (heading first, then body, then unknown) and occurrences
  fonts.sort((a, b) => {
    const categoryOrder = { 'heading': 0, 'body': 1, 'unknown': 2 };
    const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
    if (categoryDiff !== 0) return categoryDiff;
    return b.occurrences - a.occurrences;
  });
  
  return fonts;
}

/**
 * Apply font changes to template code
 */
export function applyFontChanges(
  code: string,
  headingFont: string | null,
  bodyFont: string | null
): string {
  if (!headingFont && !bodyFont) return code;
  
  let modifiedCode = code;
  
  // Find CSS style block
  const styleMatch = code.match(/<style>([\s\S]*?)<\/style>/i);
  if (!styleMatch) return code;
  
  const cssContent = styleMatch[1];
  const extractedFonts = extractFontsFromCode(code);
  
  // Replace fonts based on category
  extractedFonts.forEach(font => {
    if (font.category === 'heading' && headingFont) {
      // Replace heading fonts
      const escapedOriginal = font.originalValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`font-family:\\s*${escapedOriginal}`, 'gi');
      modifiedCode = modifiedCode.replace(regex, `font-family: '${headingFont}', sans-serif`);
    } else if (font.category === 'body' && bodyFont) {
      // Replace body fonts
      const escapedOriginal = font.originalValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`font-family:\\s*${escapedOriginal}`, 'gi');
      modifiedCode = modifiedCode.replace(regex, `font-family: '${bodyFont}', sans-serif`);
    }
  });
  
  return modifiedCode;
}

/**
 * Generate Google Fonts URL for selected fonts
 * Format: https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans&display=swap
 */
export function generateGoogleFontsUrl(headingFont: string | null, bodyFont: string | null): string | null {
  const fonts: string[] = [];
  
  if (headingFont) {
    // Encode font name (replace spaces with +)
    const encodedHeading = headingFont.replace(/\s+/g, '+');
    // Include common weights for headings
    fonts.push(`${encodedHeading}:wght@400;600;700`);
  }
  
  if (bodyFont && bodyFont !== headingFont) {
    // Encode font name (replace spaces with +)
    const encodedBody = bodyFont.replace(/\s+/g, '+');
    // Include common weights for body text
    fonts.push(`${encodedBody}:wght@400;500`);
  }
  
  if (fonts.length === 0) return null;
  
  return `https://fonts.googleapis.com/css2?${fonts.map(f => `family=${f}`).join('&')}&display=swap`;
}

/**
 * Get curated list of popular resume fonts
 */
export function getCuratedFonts(): string[] {
  return [
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro',
    'Raleway',
    'Nunito',
    'Poppins',
    'Inter',
    'Work Sans',
    'PT Sans',
    'Merriweather',
    'Playfair Display',
    'Libre Baskerville',
    'Crimson Text'
  ];
}
