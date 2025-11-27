/**
 * Utilidades de validación de output del AI para prevenir contenido malicioso
 */

export function validateImprovedText(
  improved: string,
  original: string,
  sectionType: string
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

  // 6. Verificar que no contiene contenido inapropiado básico
  const inappropriatePatterns = [
    /fuck|shit|damn|hell/i,
    /hate|kill|murder|death/i,
    /sex|porn|nude/i,
    /drug|cocaine|heroin/i,
    /terrorist|bomb|weapon/i,
  ];

  for (const pattern of inappropriatePatterns) {
    if (pattern.test(improved)) {
      return { isValid: false, reason: 'Improved text contains inappropriate content' };
    }
  }

  // 7. Verificar que no contiene intentos de prompt injection en el output
  const injectionPatterns = [
    /ignore\s+previous\s+instructions/i,
    /system\s*:/i,
    /assistant\s*:/i,
    /<\|.*?\|>/i,
    /```.*?```/s,
    /\[INST\]/i,
    /\[\/INST\]/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(improved)) {
      return { isValid: false, reason: 'Improved text contains injection attempts' };
    }
  }

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

  // Validate totalScore
  if (typeof score.totalScore !== 'number' || score.totalScore < 1 || score.totalScore > 10) {
    return { isValid: false, reason: 'totalScore must be a number between 1 and 10' };
  }

  // Validate breakdown
  if (!score.breakdown || typeof score.breakdown !== 'object') {
    return { isValid: false, reason: 'breakdown is required and must be an object' };
  }

  const breakdownRanges = {
    summary: { min: 0, max: 2.0 },
    experience: { min: 0, max: 2.5 },
    skills: { min: 0, max: 1.5 },
    education: { min: 0, max: 1.0 },
    projects: { min: 0, max: 1.0 },
    achievements: { min: 0, max: 1.0 },
    languages: { min: 0, max: 0.5 },
    contact: { min: 0, max: 0.5 },
  };

  for (const [key, range] of Object.entries(breakdownRanges)) {
    if (typeof score.breakdown[key] !== 'number') {
      return { isValid: false, reason: `breakdown.${key} must be a number` };
    }
    if (score.breakdown[key] < range.min || score.breakdown[key] > range.max) {
      return { isValid: false, reason: `breakdown.${key} must be between ${range.min} and ${range.max}` };
    }
  }

  // Validate strengths
  if (!Array.isArray(score.strengths)) {
    return { isValid: false, reason: 'strengths must be an array' };
  }
  if (score.strengths.length === 0) {
    return { isValid: false, reason: 'strengths array cannot be empty' };
  }
  if (score.strengths.length > 10) {
    return { isValid: false, reason: 'strengths array cannot have more than 10 items' };
  }
  for (const strength of score.strengths) {
    if (typeof strength !== 'string' || strength.length === 0 || strength.length > 200) {
      return { isValid: false, reason: 'Each strength must be a string between 1 and 200 characters' };
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
    if (typeof improvement !== 'string' || improvement.length === 0 || improvement.length > 200) {
      return { isValid: false, reason: 'Each improvement must be a string between 1 and 200 characters' };
    }
  }

  // Validate detailedFeedback
  if (!Array.isArray(score.detailedFeedback)) {
    return { isValid: false, reason: 'detailedFeedback must be an array' };
  }
  if (score.detailedFeedback.length > 15) {
    return { isValid: false, reason: 'detailedFeedback array cannot have more than 15 items' };
  }
  for (const feedback of score.detailedFeedback) {
    if (!feedback.section || typeof feedback.section !== 'string') {
      return { isValid: false, reason: 'Each feedback item must have a section string' };
    }
    if (typeof feedback.currentScore !== 'number' || feedback.currentScore < 0) {
      return { isValid: false, reason: 'Each feedback item must have a valid currentScore' };
    }
    if (!Array.isArray(feedback.recommendations)) {
      return { isValid: false, reason: 'Each feedback item must have a recommendations array' };
    }
    if (feedback.recommendations.length > 10) {
      return { isValid: false, reason: 'Each feedback item cannot have more than 10 recommendations' };
    }
    for (const rec of feedback.recommendations) {
      if (typeof rec !== 'string' || rec.length === 0 || rec.length > 300) {
        return { isValid: false, reason: 'Each recommendation must be a string between 1 and 300 characters' };
      }
    }
    if (!['high', 'medium', 'low'].includes(feedback.priority)) {
      return { isValid: false, reason: 'Each feedback item must have a priority of high, medium, or low' };
    }
  }

  // Validate metadata
  if (!score.generatedAt || typeof score.generatedAt !== 'string') {
    return { isValid: false, reason: 'generatedAt is required and must be a string' };
  }
  if (!score.aiProvider || typeof score.aiProvider !== 'string') {
    return { isValid: false, reason: 'aiProvider is required and must be a string' };
  }
  if (!score.model || typeof score.model !== 'string') {
    return { isValid: false, reason: 'model is required and must be a string' };
  }

  // Sanitize strings in recommendations and improvements
  const sanitized = {
    ...score,
    strengths: score.strengths.map((s: string) => s.trim().slice(0, 200)),
    improvements: score.improvements.map((i: string) => i.trim().slice(0, 200)),
    detailedFeedback: score.detailedFeedback.map((f: any) => ({
      ...f,
      section: f.section.trim().slice(0, 100),
      recommendations: f.recommendations.map((r: string) => r.trim().slice(0, 300)),
    })),
  };

  return { isValid: true, validated: sanitized };
}
