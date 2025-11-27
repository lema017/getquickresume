/**
 * Color extraction and replacement utilities for template code
 */

export interface ExtractedColor {
  id: string;
  value: string;
  originalValue: string;
  label: string;
  context: string;
  occurrences: number;
}

/**
 * Named color to hex mapping
 */
const namedColorsToHex: Record<string, string> = {
  'white': '#ffffff',
  'black': '#000000',
  'red': '#ff0000',
  'green': '#008000',
  'blue': '#0000ff',
  'yellow': '#ffff00',
  'cyan': '#00ffff',
  'magenta': '#ff00ff',
  'silver': '#c0c0c0',
  'gray': '#808080',
  'grey': '#808080',
  'maroon': '#800000',
  'olive': '#808000',
  'lime': '#00ff00',
  'aqua': '#00ffff',
  'teal': '#008080',
  'navy': '#000080',
  'fuchsia': '#ff00ff',
  'purple': '#800080',
  'orange': '#ffa500',
  'pink': '#ffc0cb',
  'brown': '#a52a2a',
  'beige': '#f5f5dc',
  'ivory': '#fffff0',
  'wheat': '#f5deb3',
  'tan': '#d2b48c',
  'khaki': '#f0e68c',
  'gold': '#ffd700',
  'coral': '#ff7f50',
  'salmon': '#fa8072',
  'crimson': '#dc143c',
  'indigo': '#4b0082',
  'violet': '#ee82ee',
  'plum': '#dda0dd',
  'turquoise': '#40e0d0',
  'azure': '#f0ffff',
  'snow': '#fffafa',
  'mint': '#f5fffa',
  'honeydew': '#f0fff0',
  'lavender': '#e6e6fa',
  'thistle': '#d8bfd8',
  'linen': '#faf0e6',
  'seashell': '#fff5ee',
  'oldlace': '#fdf5e6',
  'floralwhite': '#fffaf0',
  'aliceblue': '#f0f8ff',
  'ghostwhite': '#f8f8ff',
  'whitesmoke': '#f5f5f5',
  'gainsboro': '#dcdcdc',
  'lightgray': '#d3d3d3',
  'lightgrey': '#d3d3d3',
  'darkgray': '#a9a9a9',
  'darkgrey': '#a9a9a9',
  'dimgray': '#696969',
  'dimgrey': '#696969',
  'lightslategray': '#778899',
  'lightslategrey': '#778899',
  'slategray': '#708090',
  'slategrey': '#708090',
  'darkslategray': '#2f4f4f',
  'darkslategrey': '#2f4f4f',
};

/**
 * Convert named color to hex
 */
function namedColorToHex(color: string): string | null {
  const normalized = color.toLowerCase().trim();
  return namedColorsToHex[normalized] || null;
}

/**
 * Normalize hex color to 6-digit format
 */
function normalizeHex(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit to 6-digit
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  return '#' + hex.toLowerCase();
}

/**
 * Convert rgb/rgba to hex
 */
function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);
  if (!match) return null;
  
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert any color format to hex
 */
function colorToHex(color: string): string | null {
  color = color.trim();
  
  // Already hex
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
    return normalizeHex(color);
  }
  
  // RGB/RGBA
  if (color.startsWith('rgb')) {
    return rgbToHex(color);
  }
  
  // Named color
  const hex = namedColorToHex(color);
  if (hex) return hex;
  
  return null;
}

/**
 * Generate a meaningful label for a color based on context
 */
function generateColorLabel(color: ExtractedColor, allColors: ExtractedColor[]): string {
  const value = color.value.toLowerCase();
  const context = color.context.toLowerCase();
  
  // Check if it's a background color
  if (context.includes('background') || context.includes('bg')) {
    if (value === '#ffffff' || value === 'white' || value === '#fff') {
      return 'Background Color';
    }
    return 'Background Color';
  }
  
  // Check if it's a text color
  if (context.includes('color') && !context.includes('background') && !context.includes('border')) {
    // Primary text (usually dark)
    if (value === '#000000' || value === 'black' || value === '#000' || 
        value === '#1a1a1a' || value === '#2c3e50' || value === '#333') {
      return 'Primary Text Color';
    }
    // Secondary text (usually gray)
    if (value.includes('666') || value.includes('888') || value.includes('999') || 
        context.includes('secondary') || context.includes('gray')) {
      return 'Secondary Text Color';
    }
    // Accent text
    if (context.includes('accent') || context.includes('highlight')) {
      return 'Accent Text Color';
    }
    return 'Text Color';
  }
  
  // Check if it's a border color
  if (context.includes('border') || context.includes('separator')) {
    return 'Border Color';
  }
  
  // Check if it's an accent/highlight color
  if (context.includes('accent') || context.includes('highlight') || context.includes('primary')) {
    return 'Accent Color';
  }
  
  // Default: use index
  const index = allColors.findIndex(c => c.id === color.id);
  return `Color ${index + 1}`;
}

/**
 * Extract all colors from template code
 */
export function extractColorsFromCode(code: string): ExtractedColor[] {
  const colors: ExtractedColor[] = [];
  const colorMap = new Map<string, ExtractedColor>();
  
  // Find CSS style block
  const styleMatch = code.match(/<style>([\s\S]*?)<\/style>/i);
  if (!styleMatch) return [];
  
  const cssContent = styleMatch[1];
  
  // Regex patterns for different color formats
  const patterns = [
    // Hex colors: #rrggbb or #rgb
    { regex: /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi, type: 'hex' },
    // RGB/RGBA colors
    { regex: /rgba?\([^)]+\)/gi, type: 'rgb' },
    // Named colors (common ones)
    { regex: /\b(white|black|red|green|blue|yellow|cyan|magenta|silver|gray|grey|maroon|olive|lime|aqua|teal|navy|fuchsia|purple|orange|pink|brown|beige|ivory|wheat|tan|khaki|gold|coral|salmon|crimson|indigo|violet|plum|turquoise|azure|snow|mint|honeydew|lavender|thistle|linen|seashell|oldlace|floralwhite|aliceblue|ghostwhite|whitesmoke|gainsboro|lightgray|lightgrey|darkgray|darkgrey|dimgray|dimgrey|lightslategray|lightslategrey|slategray|slategrey|darkslategray|darkslategrey)\b/gi, type: 'named' },
  ];
  
  // Extract colors with context
  patterns.forEach(({ regex, type }) => {
    let match;
    while ((match = regex.exec(cssContent)) !== null) {
      const colorValue = match[0];
      const startIndex = match.index;
      
      // Get context (surrounding CSS rule)
      const contextStart = Math.max(0, cssContent.lastIndexOf('{', startIndex));
      const contextEnd = Math.min(cssContent.length, cssContent.indexOf('}', startIndex) + 1);
      const context = cssContent.substring(contextStart, contextEnd);
      
      // Convert to hex for consistency
      let hexValue: string | null = null;
      if (type === 'hex') {
        hexValue = normalizeHex(colorValue);
      } else if (type === 'rgb') {
        hexValue = rgbToHex(colorValue);
      } else if (type === 'named') {
        hexValue = namedColorToHex(colorValue.toLowerCase());
      }
      
      if (!hexValue) continue;
      
      // Check if we've seen this color before
      const existing = colorMap.get(hexValue);
      if (existing) {
        existing.occurrences++;
        // Update context if this one is more descriptive
        if (context.length < existing.context.length || 
            (context.includes('color') && !existing.context.includes('color'))) {
          existing.context = context;
        }
      } else {
        const colorId = `color-${colorMap.size + 1}`;
        const color: ExtractedColor = {
          id: colorId,
          value: hexValue,
          originalValue: colorValue,
          label: '', // Will be set later
          context: context,
          occurrences: 1
        };
        colorMap.set(hexValue, color);
        colors.push(color);
      }
    }
  });
  
  // Generate labels for all colors
  colors.forEach(color => {
    color.label = generateColorLabel(color, colors);
  });
  
  // Sort by occurrences (most used first) and then by label
  colors.sort((a, b) => {
    if (b.occurrences !== a.occurrences) {
      return b.occurrences - a.occurrences;
    }
    return a.label.localeCompare(b.label);
  });
  
  return colors;
}

/**
 * Apply color changes to template code
 */
export function applyColorChanges(code: string, colorMap: Map<string, string>): string {
  if (colorMap.size === 0) return code;
  
  let modifiedCode = code;
  
  // Replace colors in CSS style block
  colorMap.forEach((newValue, colorId) => {
    // Find the original color value from the extracted colors
    // We need to match the original format used in the code
    const colors = extractColorsFromCode(code);
    const color = colors.find(c => c.id === colorId);
    if (!color) return;
    
    const originalValue = color.originalValue;
    const normalizedNewValue = colorToHex(newValue);
    if (!normalizedNewValue) return;
    
    // Replace all occurrences of the original color value
    // Use word boundaries and be careful with hex colors
    let regex: RegExp;
    
    if (originalValue.startsWith('#')) {
      // Hex color - match exact hex pattern
      const hexPattern = originalValue.replace('#', '');
      regex = new RegExp(`#${hexPattern}\\b`, 'gi');
      modifiedCode = modifiedCode.replace(regex, normalizedNewValue);
    } else if (originalValue.startsWith('rgb')) {
      // RGB/RGBA - match exact pattern
      const escaped = originalValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex = new RegExp(escaped, 'gi');
      modifiedCode = modifiedCode.replace(regex, normalizedNewValue);
    } else {
      // Named color - match word boundary
      regex = new RegExp(`\\b${originalValue}\\b`, 'gi');
      modifiedCode = modifiedCode.replace(regex, normalizedNewValue);
    }
  });
  
  return modifiedCode;
}

/**
 * Reset color to original value
 */
export function resetColorToOriginal(color: ExtractedColor): string {
  return color.originalValue;
}

