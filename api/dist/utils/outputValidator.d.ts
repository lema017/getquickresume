/**
 * Utilidades de validación de output del AI para prevenir contenido malicioso
 */
/**
 * Detect output injection attempts in AI-generated content
 */
export declare function detectOutputInjection(output: string): {
    isValid: boolean;
    reason?: string;
};
export interface ValidateImprovedTextOptions {
    /**
     * When true, allows substantial rewrites where similarity to original may be low.
     * Use when user has provided explicit context for how they want the text changed.
     */
    allowSubstantialRewrite?: boolean;
}
export declare function validateImprovedText(improved: string, original: string, sectionType: string, options?: ValidateImprovedTextOptions): {
    isValid: boolean;
    reason?: string;
};
/**
 * Validates mechanical enhancement output.
 * Less restrictive than validateImprovedText - skips similarity check since
 * mechanical fixes (like removing first-person pronouns) intentionally change
 * the text structure while preserving meaning.
 *
 * Keeps all security checks: script patterns, inappropriate content, injection attempts.
 */
export declare function validateMechanicalEnhancement(improved: string, original: string): {
    isValid: boolean;
    reason?: string;
};
export declare function validateSectionType(sectionType: string): boolean;
export declare function validateTextLength(text: string, maxLength?: number): boolean;
export declare function validateLanguage(language: string): boolean;
export declare function validateResumeScore(score: any): {
    isValid: boolean;
    reason?: string;
    validated?: any;
};
//# sourceMappingURL=outputValidator.d.ts.map