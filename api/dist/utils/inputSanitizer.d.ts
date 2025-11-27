/**
 * Utilidades de sanitización de input del usuario para prevenir ataques
 */
export declare function sanitizeUserInput(input: string): string;
export declare function sanitizeUserMultiline(input: string, maxLen?: number): string;
export declare function validateInputLarge(input: string, maxLen?: number): {
    isValid: boolean;
    reason?: string;
};
export declare function validateInput(input: string): {
    isValid: boolean;
    reason?: string;
};
export declare function sanitizeSectionType(sectionType: string): string | null;
export declare function sanitizeLanguage(language: string): 'es' | 'en';
//# sourceMappingURL=inputSanitizer.d.ts.map