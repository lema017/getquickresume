/**
 * Utilidades de sanitización de input del usuario para prevenir ataques
 */

export function sanitizeUserInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // 1. Eliminar tags HTML
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // 2. Eliminar caracteres especiales peligrosos
  sanitized = sanitized.replace(/[<>]/g, '');

  // 3. Normalizar espacios múltiples (manteniendo un solo espacio)
  sanitized = sanitized.replace(/\s+/g, ' ');

  // 4. Limitar longitud a 500 caracteres
  sanitized = sanitized.slice(0, 500);

  // 5. Trim espacios al inicio y final
  sanitized = sanitized.trim();

  return sanitized;
}

// Sanitizador para bloques multilínea (preserva saltos de línea y permite textos largos)
export function sanitizeUserMultiline(input: string, maxLen = 10000): string {
  if (!input || typeof input !== 'string') return '';
  let sanitized = input;
  // Eliminar tags HTML
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  // Eliminar caracteres peligrosos específicos
  sanitized = sanitized.replace(/[<>]/g, '');
  // Normalizar saltos de línea a \n y remover caracteres de control extraños
  sanitized = sanitized.replace(/\r\n?/g, '\n');
  // Recortar líneas muy largas de espacios pero conservar estructura
  sanitized = sanitized
    .split('\n')
    .map(l => l.replace(/\s{2,}/g, ' ').trim())
    .join('\n')
    .trim();
  // Limitar longitud amplia
  if (sanitized.length > maxLen) sanitized = sanitized.slice(0, maxLen);
  return sanitized;
}

export function validateInputLarge(input: string, maxLen = 10000): { isValid: boolean; reason?: string } {
  if (!input || typeof input !== 'string') return { isValid: false, reason: 'Input is required' };
  if (input.length === 0) return { isValid: false, reason: 'Input cannot be empty' };
  if (input.length > maxLen) return { isValid: false, reason: `Input exceeds maximum length (${maxLen})` };
  return { isValid: true };
}

export function validateInput(input: string): { isValid: boolean; reason?: string } {
  if (!input || typeof input !== 'string') {
    return { isValid: false, reason: 'Input is required' };
  }

  if (input.length === 0) {
    return { isValid: false, reason: 'Input cannot be empty' };
  }

  if (input.length > 500) {
    return { isValid: false, reason: 'Input exceeds maximum length' };
  }

  // Patrones peligrosos para prompt injection
  const dangerousPatterns = [
    /ignore\s+previous\s+instructions/i,
    /system\s*:/i,
    /assistant\s*:/i,
    /<\|.*?\|>/i,
    /```.*?```/s,
    /\[INST\]/i,
    /\[\/INST\]/i,
    /ignore\s+all\s+previous\s+instructions/i,
    /forget\s+everything/i,
    /you\s+are\s+now/i,
    /act\s+as\s+if/i,
    /pretend\s+to\s+be/i,
    /roleplay\s+as/i,
    /you\s+must\s+now/i,
    /override\s+your\s+instructions/i,
    /disregard\s+your\s+instructions/i,
    /jailbreak/i,
    /prompt\s+injection/i,
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /eval\(/i,
    /function\s*\(/i,
    /alert\(/i,
    /document\./i,
    /window\./i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      return { isValid: false, reason: 'Input contains potentially dangerous content' };
    }
  }

  return { isValid: true };
}

export function sanitizeSectionType(sectionType: string): string | null {
  const validSections = [
    'summary',
    'experience', 
    'education',
    'certification',
    'project',
    'achievement',
    'language'
  ];

  if (!sectionType || typeof sectionType !== 'string') {
    return null;
  }

  const normalized = sectionType.toLowerCase().trim();
  
  if (validSections.includes(normalized)) {
    return normalized;
  }

  return null;
}

export function sanitizeLanguage(language: string): 'es' | 'en' {
  if (language === 'es' || language === 'en') {
    return language;
  }
  return 'es'; // default
}
