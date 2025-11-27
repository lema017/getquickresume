import { TEMPLATE_META } from '@/services/templatesService';

/**
 * Extracts TEMPLATE_META from JavaScript code string
 * Looks for the exported TEMPLATE_META object
 */
export function extractTemplateMeta(jsCode: string): TEMPLATE_META | null {
  try {
    // Try to match the TEMPLATE_META export pattern
    // Pattern: export const TEMPLATE_META = { ... };
    const exportPattern = /export\s+const\s+TEMPLATE_META\s*=\s*({[\s\S]*?});/;
    const match = jsCode.match(exportPattern);
    
    if (!match) {
      console.warn('TEMPLATE_META export not found in template code');
      return null;
    }

    // Extract the object literal
    const objectLiteral = match[1];
    
    // Try to parse it as JSON (with some preprocessing)
    // Replace single quotes with double quotes for JSON compatibility
    // But be careful with strings that might contain quotes
    let jsonString = objectLiteral
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/(\w+):/g, '"$1":') // Quote property names
      .replace(/,\s*}/g, '}') // Remove trailing commas
      .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
    
    // Try to parse
    try {
      const meta = JSON.parse(jsonString) as TEMPLATE_META;
      
      // Validate required fields
      if (!meta.id || !meta.name || !meta.tagName) {
        console.warn('TEMPLATE_META missing required fields');
        return null;
      }
      
      return meta;
    } catch (parseError) {
      // If JSON parsing fails, try to extract values using regex
      console.warn('JSON parse failed, trying regex extraction', parseError);
      return extractTemplateMetaRegex(objectLiteral);
    }
  } catch (error) {
    console.error('Error extracting TEMPLATE_META:', error);
    return null;
  }
}

/**
 * Fallback method to extract TEMPLATE_META using regex
 */
function extractTemplateMetaRegex(objectLiteral: string): TEMPLATE_META | null {
  try {
    const extractValue = (key: string): string | undefined => {
      // Match: key: 'value' or key: "value"
      const pattern = new RegExp(`${key}\\s*:\\s*['"]([^'"]+)['"]`, 'i');
      const match = objectLiteral.match(pattern);
      return match ? match[1] : undefined;
    };

    const extractLayout = (): 'single-column' | 'two-column' | undefined => {
      const pattern = /layout\s*:\s*['"](single-column|two-column)['"]/i;
      const match = objectLiteral.match(pattern);
      return match ? (match[1] as 'single-column' | 'two-column') : undefined;
    };

    const id = extractValue('id');
    const name = extractValue('name');
    const tagName = extractValue('tagName');
    const description = extractValue('description');
    const layout = extractLayout();

    if (!id || !name || !tagName) {
      return null;
    }

    return {
      id,
      name,
      tagName,
      description,
      layout,
    };
  } catch (error) {
    console.error('Error in regex extraction:', error);
    return null;
  }
}

