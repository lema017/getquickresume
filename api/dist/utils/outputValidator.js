"use strict";
/**
 * Utilidades de validación de output del AI para prevenir contenido malicioso
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImprovedText = validateImprovedText;
exports.validateMechanicalEnhancement = validateMechanicalEnhancement;
exports.validateSectionType = validateSectionType;
exports.validateTextLength = validateTextLength;
exports.validateLanguage = validateLanguage;
exports.validateResumeScore = validateResumeScore;
function validateImprovedText(improved, original, sectionType) {
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
    // Use word boundaries (\b) to avoid false positives like "skills" matching "kill"
    const inappropriatePatterns = [
        /\b(fuck|shit|damn)\b/i, // Removed "hell" - too many false positives (shell, hello, excelling)
        /\b(murder|death)\b/i, // Removed "kill" and "hate" - false positives (skills, whatever)
        /\b(porn|nude)\b/i, // Removed "sex" - could be in "Sussex" etc.
        /\b(cocaine|heroin)\b/i, // Removed generic "drug" - could be "drugstore"
        /\b(terrorist|bomb)\b/i, // Removed "weapon" - could be in legitimate context
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
/**
 * Validates mechanical enhancement output.
 * Less restrictive than validateImprovedText - skips similarity check since
 * mechanical fixes (like removing first-person pronouns) intentionally change
 * the text structure while preserving meaning.
 *
 * Keeps all security checks: script patterns, inappropriate content, injection attempts.
 */
function validateMechanicalEnhancement(improved, original) {
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
        /\b(fuck|shit|damn)\b/i, // Removed "hell" - too many false positives (shell, hello, excelling)
        /\b(murder|death)\b/i, // Removed "kill" and "hate" - false positives (skills, whatever)
        /\b(porn|nude)\b/i, // Removed "sex" - could be in "Sussex" etc.
        /\b(cocaine|heroin)\b/i, // Removed generic "drug" - could be "drugstore"
        /\b(terrorist|bomb)\b/i, // Removed "weapon" - could be in legitimate context
    ];
    for (const pattern of inappropriatePatterns) {
        if (pattern.test(improved)) {
            return { isValid: false, reason: 'Improved text contains inappropriate content' };
        }
    }
    // 6. Verify it doesn't contain prompt injection attempts
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
    // NOTE: We intentionally skip the similarity check here because mechanical fixes
    // like removing first-person pronouns will legitimately change the word structure
    // while preserving the meaning. The targeted prompt is trusted to maintain context.
    return { isValid: true };
}
function validateSectionType(sectionType) {
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
function validateTextLength(text, maxLength = 2000) {
    return text.length <= maxLength;
}
function validateLanguage(language) {
    return language === 'es' || language === 'en';
}
function validateResumeScore(score) {
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
        strengths: score.strengths.map((s) => s.trim().slice(0, 300)),
        improvements: score.improvements.map((i) => i.trim().slice(0, 300)),
    };
    return { isValid: true, validated: sanitized };
}
//# sourceMappingURL=outputValidator.js.map