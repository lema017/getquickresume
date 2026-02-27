/**
 * Utilidades de validación de output del AI para prevenir contenido malicioso
 */

/**
 * Comprehensive output injection detection patterns
 * Detects when AI output contains prompt injection attempts or system markers
 */
const OUTPUT_INJECTION_PATTERNS = [
  // Role/instruction markers that shouldn't appear in output
  /ignore\s+previous\s+instructions/i,
  /ignore\s+all\s+previous/i,
  /disregard\s+(your\s+)?instructions/i,
  /override\s+(your\s+)?instructions/i,
  /system\s*:/i,
  /assistant\s*:/i,
  /user\s*:/i,
  /\binstruction[s]?\s*:/i,
  
  // Special tokens that indicate injection attempts
  /<\|.*?\|>/i,
  /<\|endoftext\|>/i,
  /<\|im_start\|>/i,
  /<\|im_end\|>/i,
  /<\|pad\|>/i,
  
  // Model-specific markers
  /\[INST\]/i,
  /\[\/INST\]/i,
  /<<SYS>>/i,
  /<<\/SYS>>/i,
  /\[SYSTEM\]/i,
  /\[\/SYSTEM\]/i,
  
  // Code blocks with system content
  /```system/i,
  /```instruction/i,
  /```prompt/i,
  
  // Jailbreak indicators in output
  /\bDAN\s+mode/i,
  /do\s+anything\s+now/i,
  /jailbreak\s+(successful|enabled|activated)/i,
  
  // Indicators that the AI is exposing internal instructions
  /my\s+(system\s+)?instructions\s+are/i,
  /here\s+are\s+my\s+instructions/i,
  /my\s+prompt\s+is/i,
  /i\s+was\s+instructed\s+to/i,
];

/**
 * Detect output injection attempts in AI-generated content
 */
export function detectOutputInjection(output: string): { isValid: boolean; reason?: string } {
  if (!output || typeof output !== 'string') {
    return { isValid: true }; // Empty output is handled elsewhere
  }

  for (const pattern of OUTPUT_INJECTION_PATTERNS) {
    if (pattern.test(output)) {
      console.warn('[OutputValidator] Injection pattern detected in output:', pattern.source);
      return { isValid: false, reason: 'Output contains injection attempts or system markers' };
    }
  }

  return { isValid: true };
}

export interface ValidateImprovedTextOptions {
  /** 
   * When true, allows substantial rewrites where similarity to original may be low.
   * Use when user has provided explicit context for how they want the text changed.
   */
  allowSubstantialRewrite?: boolean;
}

export function validateImprovedText(
  improved: string,
  original: string,
  sectionType: string,
  options?: ValidateImprovedTextOptions
): { isValid: boolean; reason?: string } {
  
  if (!improved || typeof improved !== 'string') {
    return { isValid: false, reason: 'Improved text is required' };
  }

  if (!original || typeof original !== 'string') {
    return { isValid: false, reason: 'Original text is required' };
  }

  // 1. Verificar longitud razonable (no > 10x original)
  if (improved.length > original.length * 10) {
    return { isValid: false, reason: 'Improved text is too long' };
  }

  // 2. Verificar que no contiene código/scripts
  const scriptPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /eval\(/i,
    /function\s*\(/i,
    /alert\(/i,
    /document\./i,
    /window\./i,
    /console\./i,
    /setTimeout/i,
    /setInterval/i,
    /XMLHttpRequest/i,
    /fetch\(/i,
  ];

  for (const pattern of scriptPatterns) {
    if (pattern.test(improved)) {
      return { isValid: false, reason: 'Improved text contains potentially dangerous code' };
    }
  }

  // 3. Verificar que no es completamente vacío
  if (improved.trim().length === 0) {
    return { isValid: false, reason: 'Improved text cannot be empty' };
  }

  // 4. Verificar que no es idéntico al original (debería haber algún cambio)
  if (improved.trim() === original.trim()) {
    return { isValid: true }; // Esto está bien, el usuario puede no querer cambios
  }

  // 5. Verificar que mantiene contexto básico (palabras clave del original)
  // Skip this check when allowSubstantialRewrite is true, since the user explicitly
  // provided context for how they want the text changed (e.g., adding metrics)
  if (!options?.allowSubstantialRewrite) {
    const originalWords = original.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    const improvedWords = improved.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    
    // Si el original tiene palabras clave, al menos algunas deberían estar en el mejorado
    if (originalWords.length > 0) {
      const commonWords = originalWords.filter(word => improvedWords.includes(word));
      const similarity = commonWords.length / originalWords.length;
      
      // Si menos del 20% de las palabras clave están presentes, podría ser muy diferente
      if (similarity < 0.2 && originalWords.length > 5) {
        return { isValid: false, reason: 'Improved text seems too different from original' };
      }
    }
  }

  // 6. Verificar que no contiene contenido inapropiado básico
  // Use word boundaries (\b) to avoid false positives like "skills" matching "kill"
  const inappropriatePatterns = [
    /\b(fuck|shit|damn)\b/i,  // Removed "hell" - too many false positives (shell, hello, excelling)
    /\b(murder|death)\b/i,    // Removed "kill" and "hate" - false positives (skills, whatever)
    /\b(porn|nude)\b/i,       // Removed "sex" - could be in "Sussex" etc.
    /\b(cocaine|heroin)\b/i,  // Removed generic "drug" - could be "drugstore"
    /\b(terrorist|bomb)\b/i,  // Removed "weapon" - could be in legitimate context
  ];

  for (const pattern of inappropriatePatterns) {
    if (pattern.test(improved)) {
      return { isValid: false, reason: 'Improved text contains inappropriate content' };
    }
  }

  // 7. Verificar que no contiene intentos de prompt injection en el output
  const outputInjectionResult = detectOutputInjection(improved);
  if (!outputInjectionResult.isValid) {
    return outputInjectionResult;
  }

  return { isValid: true };
}

/**
 * Validates mechanical enhancement output.
 * Less restrictive than validateImprovedText - skips similarity check since
 * mechanical fixes (like removing first-person pronouns) intentionally change
 * the text structure while preserving meaning.
 * 
 * Keeps all security checks: script patterns, inappropriate content, injection attempts.
 */
export function validateMechanicalEnhancement(
  improved: string,
  original: string
): { isValid: boolean; reason?: string } {
  
  if (!improved || typeof improved !== 'string') {
    return { isValid: false, reason: 'Improved text is required' };
  }

  if (!original || typeof original !== 'string') {
    return { isValid: false, reason: 'Original text is required' };
  }

  // 1. Verify reasonable length (not > 5x original for mechanical fixes)
  if (improved.length > original.length * 5) {
    return { isValid: false, reason: 'Improved text is too long' };
  }

  // 2. Verify it doesn't contain code/scripts
  const scriptPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /eval\(/i,
    /function\s*\(/i,
    /alert\(/i,
    /document\./i,
    /window\./i,
    /console\./i,
    /setTimeout/i,
    /setInterval/i,
    /XMLHttpRequest/i,
    /fetch\(/i,
  ];

  for (const pattern of scriptPatterns) {
    if (pattern.test(improved)) {
      return { isValid: false, reason: 'Improved text contains potentially dangerous code' };
    }
  }

  // 3. Verify it's not completely empty
  if (improved.trim().length === 0) {
    return { isValid: false, reason: 'Improved text cannot be empty' };
  }

  // 4. Verify minimum length (at least 10% of original - mechanical fixes shouldn't delete most content)
  if (improved.trim().length < original.trim().length * 0.1) {
    return { isValid: false, reason: 'Improved text is too short' };
  }

  // 5. Verify it doesn't contain inappropriate content
  // Use word boundaries (\b) to avoid false positives like "skills" matching "kill"
  const inappropriatePatterns = [
    /\b(fuck|shit|damn)\b/i,  // Removed "hell" - too many false positives (shell, hello, excelling)
    /\b(murder|death)\b/i,    // Removed "kill" and "hate" - false positives (skills, whatever)
    /\b(porn|nude)\b/i,       // Removed "sex" - could be in "Sussex" etc.
    /\b(cocaine|heroin)\b/i,  // Removed generic "drug" - could be "drugstore"
    /\b(terrorist|bomb)\b/i,  // Removed "weapon" - could be in legitimate context
  ];

  for (const pattern of inappropriatePatterns) {
    if (pattern.test(improved)) {
      return { isValid: false, reason: 'Improved text contains inappropriate content' };
    }
  }

  // 6. Verify it doesn't contain prompt injection attempts
  const outputInjectionResult = detectOutputInjection(improved);
  if (!outputInjectionResult.isValid) {
    return outputInjectionResult;
  }

  // NOTE: We intentionally skip the similarity check here because mechanical fixes
  // like removing first-person pronouns will legitimately change the word structure
  // while preserving the meaning. The targeted prompt is trusted to maintain context.

  return { isValid: true };
}

export function validateSectionType(sectionType: string): boolean {
  const validSections = [
    'summary',
    'experience',
    'education', 
    'certification',
    'project',
    'achievement',
    'language'
  ];

  return validSections.includes(sectionType);
}

export function validateTextLength(text: string, maxLength: number = 2000): boolean {
  return text.length <= maxLength;
}

export function validateLanguage(language: string): boolean {
  return language === 'es' || language === 'en';
}

export function validateResumeScore(score: any): { isValid: boolean; reason?: string; validated?: any } {
  if (!score || typeof score !== 'object') {
    return { isValid: false, reason: 'Score must be an object' };
  }

  // Validate totalScore (allow 0 for new deterministic scoring)
  if (typeof score.totalScore !== 'number' || score.totalScore < 0 || score.totalScore > 10) {
    return { isValid: false, reason: 'totalScore must be a number between 0 and 10' };
  }

  // Validate breakdown
  if (!score.breakdown || typeof score.breakdown !== 'object') {
    return { isValid: false, reason: 'breakdown is required and must be an object' };
  }

  const breakdownRanges = {
    summary: { min: 0, max: 2.5 },
    experience: { min: 0, max: 3.0 },
    skills: { min: 0, max: 2.0 },
    education: { min: 0, max: 1.5 },
    projects: { min: 0, max: 1.5 },
    achievements: { min: 0, max: 1.5 },
    languages: { min: 0, max: 1.0 },
    contact: { min: 0, max: 1.0 },
  };

  for (const [key, range] of Object.entries(breakdownRanges)) {
    if (typeof score.breakdown[key] !== 'number') {
      return { isValid: false, reason: `breakdown.${key} must be a number` };
    }
    if (score.breakdown[key] < range.min || score.breakdown[key] > range.max) {
      return { isValid: false, reason: `breakdown.${key} must be between ${range.min} and ${range.max}` };
    }
  }

  // Validate new deterministic fields
  if (typeof score.completionPercentage !== 'number') {
    return { isValid: false, reason: 'completionPercentage must be a number' };
  }
  if (typeof score.isOptimized !== 'boolean') {
    return { isValid: false, reason: 'isOptimized must be a boolean' };
  }
  if (!score.checklist || typeof score.checklist !== 'object') {
    return { isValid: false, reason: 'checklist is required and must be an object' };
  }

  // Validate strengths
  if (!Array.isArray(score.strengths)) {
    return { isValid: false, reason: 'strengths must be an array' };
  }
  if (score.strengths.length > 15) {
    return { isValid: false, reason: 'strengths array cannot have more than 15 items' };
  }
  for (const strength of score.strengths) {
    if (typeof strength !== 'string' || strength.length > 300) {
      return { isValid: false, reason: 'Each strength must be a string up to 300 characters' };
    }
  }

  // Validate improvements
  if (!Array.isArray(score.improvements)) {
    return { isValid: false, reason: 'improvements must be an array' };
  }
  if (score.improvements.length > 20) {
    return { isValid: false, reason: 'improvements array cannot have more than 20 items' };
  }
  for (const improvement of score.improvements) {
    if (typeof improvement !== 'string' || improvement.length > 300) {
      return { isValid: false, reason: 'Each improvement must be a string up to 300 characters' };
    }
  }

  // Validate metadata
  if (!score.generatedAt || typeof score.generatedAt !== 'string') {
    return { isValid: false, reason: 'generatedAt is required and must be a string' };
  }
  if (!score.scoringVersion || typeof score.scoringVersion !== 'string') {
    return { isValid: false, reason: 'scoringVersion is required and must be a string' };
  }

  // Sanitize strings
  const sanitized = {
    ...score,
    strengths: score.strengths.map((s: string) => s.trim().slice(0, 300)),
    improvements: score.improvements.map((i: string) => i.trim().slice(0, 300)),
  };

  return { isValid: true, validated: sanitized };
}
