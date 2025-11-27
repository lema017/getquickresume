/**
 * Utilidades de validación de output del AI para prevenir contenido malicioso
 */
export declare function validateImprovedText(improved: string, original: string, sectionType: string): {
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