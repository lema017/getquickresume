import { ProfessionSuggestion } from '../types';
declare class SuggestionService {
    /**
     * Normaliza el nombre de la profesión para consistencia en la base de datos
     */
    private normalizeProfession;
    /**
     * Busca sugerencias existentes en la base de datos
     */
    getSuggestionsByProfession(profession: string): Promise<ProfessionSuggestion | null>;
    /**
     * Genera sugerencias usando AI (ambos idiomas) y las guarda en la base de datos
     */
    generateAndSaveSuggestions(profession: string, requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<ProfessionSuggestion>;
    /**
     * Guarda sugerencias bilingües en la base de datos (solo skills)
     */
    saveBilingualSuggestions(profession: string, suggestions: {
        es: {
            skills: string[];
        };
        en: {
            skills: string[];
        };
    }): Promise<ProfessionSuggestion>;
    /**
     * Guarda sugerencias en la base de datos (método legacy para compatibilidad)
     * Combina tools en skills antes de guardar
     */
    saveSuggestions(profession: string, skills: string[], tools: string[]): Promise<ProfessionSuggestion>;
    /**
     * Obtiene sugerencias para una profesión en el idioma especificado (busca primero en cache, luego genera si no existe)
     * Retorna solo skills (unificado)
     * Premium users always get fresh suggestions (bypass cache)
     */
    getSuggestions(profession: string, language: string, requestContext: {
        authorizer: {
            userId: string;
        };
    }, resumeId?: string): Promise<{
        skills: string[];
        fromCache: boolean;
    }>;
}
export declare const suggestionService: SuggestionService;
export {};
//# sourceMappingURL=suggestionService.d.ts.map