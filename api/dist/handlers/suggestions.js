"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestionsOptions = exports.getSuggestions = void 0;
const suggestionService_1 = require("../services/suggestionService");
const rateLimiter_1 = require("../middleware/rateLimiter");
const getSuggestions = async (event) => {
    try {
        // Verificar autenticación
        if (!event.requestContext?.authorizer) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Unauthorized',
                    message: 'Authentication required'
                })
            };
        }
        const userId = event.requestContext.authorizer.userId;
        // Rate limiting: 5 requests por minuto
        const rateLimitResult = await (0, rateLimiter_1.checkRateLimit)(userId, 'profession-suggestions', 5, 60000);
        if (!rateLimitResult.allowed) {
            return {
                statusCode: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Rate limit exceeded',
                    message: 'Too many suggestion requests. Please wait before trying again.',
                    resetTime: rateLimitResult.resetTime
                })
            };
        }
        // Obtener la profesión de los parámetros de la ruta
        const profession = event.pathParameters?.profession;
        const language = event.queryStringParameters?.language || 'es'; // 'es' or 'en', default 'es'
        if (!profession) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Profession parameter is required',
                    message: 'Please provide a profession in the URL path'
                })
            };
        }
        // Validate language parameter
        if (!['es', 'en'].includes(language)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid language parameter',
                    message: 'Language parameter must be "es" or "en"'
                })
            };
        }
        // Decodificar la profesión (puede venir URL encoded)
        const decodedProfession = decodeURIComponent(profession);
        // Extract requestContext to pass to service (contains userId from JWT token)
        // Cast to match the expected type structure
        const requestContext = {
            authorizer: event.requestContext.authorizer
        };
        // Obtener sugerencias para el idioma especificado (solo skills unificado)
        const suggestions = await suggestionService_1.suggestionService.getSuggestions(decodedProfession, language, requestContext);
        const response = {
            success: true,
            data: {
                skills: suggestions.skills
            },
            fromCache: suggestions.fromCache,
            message: suggestions.fromCache
                ? 'Suggestions retrieved from cache'
                : 'Suggestions generated with AI and saved to cache',
            remainingRequests: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime
        };
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error in getSuggestions handler:', error);
        const errorResponse = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to get profession suggestions',
            fromCache: false
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
            },
            body: JSON.stringify(errorResponse)
        };
    }
};
exports.getSuggestions = getSuggestions;
// Handler para OPTIONS (CORS preflight)
const getSuggestionsOptions = async () => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: ''
    };
};
exports.getSuggestionsOptions = getSuggestionsOptions;
//# sourceMappingURL=suggestions.js.map