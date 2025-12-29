/**
 * Text Formatting Utilities (Frontend)
 * Handles Title Case formatting for names and professions
 */

// Words that should remain lowercase unless they're the first word
const LOWERCASE_WORDS = new Set([
  // Spanish articles and prepositions
  'de', 'del', 'la', 'las', 'los', 'el', 'y', 'e', 'o', 'u',
  // English articles and prepositions
  'van', 'von', 'der', 'den', 'ter', 'ten',
  // Common prepositions
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from',
  'in', 'into', 'nor', 'of', 'on', 'or', 'the', 'to', 'with'
]);

/**
 * Converts a single word to Title Case
 */
function capitalizeWord(word: string): string {
  if (!word) return word;
  
  // Handle hyphenated words
  if (word.includes('-')) {
    return word.split('-').map(part => capitalizeWord(part)).join('-');
  }
  
  // Handle apostrophes (e.g., O'Connor)
  if (word.includes("'")) {
    const parts = word.split("'");
    return parts.map((part, index) => {
      if (index === 0) {
        return capitalizeWord(part);
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join("'");
  }
  
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Converts text to Title Case
 * Handles special cases for names and professions
 */
export function toTitleCase(text: string): string {
  if (!text || typeof text !== 'string') return text;
  
  // Trim and normalize whitespace
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (!trimmed) return text;
  
  const words = trimmed.split(' ');
  const formatted = words.map((word, index) => {
    const lowerWord = word.toLowerCase();
    
    // First word is always capitalized
    if (index === 0) {
      return capitalizeWord(word);
    }
    
    // Check if word should remain lowercase
    if (LOWERCASE_WORDS.has(lowerWord)) {
      return lowerWord;
    }
    
    // Otherwise, capitalize
    return capitalizeWord(word);
  });
  
  return formatted.join(' ');
}

/**
 * Formats a person's name to Title Case
 * Handles special cases for names (e.g., "de la", "van der")
 */
export function formatName(name: string): string {
  if (!name || typeof name !== 'string') return name;
  
  // Handle multiple spaces and trim
  const cleaned = name.trim().replace(/\s+/g, ' ');
  if (!cleaned) return name;
  
  // Apply Title Case
  return toTitleCase(cleaned);
}

/**
 * Formats a profession to Title Case
 * All significant words are capitalized (no lowercase articles/prepositions)
 */
export function formatProfession(profession: string): string {
  if (!profession || typeof profession !== 'string') return profession || '';
  
  // Trim and normalize whitespace
  const trimmed = profession.trim().replace(/\s+/g, ' ');
  // If trimmed is empty (only whitespace), return empty string (not the original whitespace)
  if (!trimmed) return '';
  
  // For professions, capitalize all words (no lowercase exceptions)
  const words = trimmed.split(' ').filter(word => word.length > 0); // Filter out empty strings
  if (words.length === 0) return '';
  
  const formatted = words.map(word => {
    // Handle hyphenated words
    if (word.includes('-')) {
      return word.split('-').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ).join('-');
    }
    
    // Handle apostrophes
    if (word.includes("'")) {
      const parts = word.split("'");
      return parts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      ).join("'");
    }
    
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return formatted.join(' ');
}

