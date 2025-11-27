"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSuggestionsOptions = exports.generateSuggestions = void 0;
const aiService_1 = require("../services/aiService");
const rateLimiter_1 = require("../middleware/rateLimiter");
const generateSuggestions = async (event) => {
    try {
        // Verificar autenticación
        if (!event.requestContext?.authorizer) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
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
        const rateLimitResult = await (0, rateLimiter_1.checkRateLimit)(userId, 'summary-suggestions', 5, 60000);
        if (!rateLimitResult.allowed) {
            return {
                statusCode: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Rate limit exceeded',
                    message: 'Too many summary suggestion requests. Please wait before trying again.',
                    resetTime: rateLimitResult.resetTime
                })
            };
        }
        // Parse request body
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required',
                    message: 'Please provide profession, achievements, projects, and type data'
                })
            };
        }
        let requestData;
        try {
            requestData = JSON.parse(event.body);
        }
        catch (error) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid JSON in request body',
                    message: 'Please provide valid JSON data'
                })
            };
        }
        // Validate required fields
        if (!requestData.profession) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Profession is required',
                    message: 'Please provide a profession'
                })
            };
        }
        if (!requestData.achievements || !Array.isArray(requestData.achievements)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Achievements array is required',
                    message: 'Please provide an array of achievements'
                })
            };
        }
        if (!requestData.projectDescriptions || !Array.isArray(requestData.projectDescriptions)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Project descriptions array is required',
                    message: 'Please provide an array of project descriptions'
                })
            };
        }
        if (!requestData.type || !['experience', 'differentiators'].includes(requestData.type)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid type parameter',
                    message: 'Type must be "experience" or "differentiators"'
                })
            };
        }
        // Validate language parameter
        const language = requestData.language || 'es';
        if (!['es', 'en'].includes(language)) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Invalid language parameter',
                    message: 'Language must be "es" or "en"'
                })
            };
        }
        // Extract requestContext to pass to AI service (contains userId from JWT token)
        // Cast to match the expected type structure
        const requestContext = {
            authorizer: event.requestContext.authorizer
        };
        // Generate summary suggestions using AI
        const suggestions = await aiService_1.aiService.generateSummarySuggestions(requestData.profession, requestData.achievements, requestData.projectDescriptions, language, requestData.type, requestContext);
        const response = {
            success: true,
            data: suggestions,
            message: `Generated ${suggestions.length} ${requestData.type} suggestions for ${requestData.profession}`,
            remainingRequests: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime
        };
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error in generateSuggestions handler:', error);
        const errorResponse = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to generate summary suggestions'
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
            },
            body: JSON.stringify(errorResponse)
        };
    }
};
exports.generateSuggestions = generateSuggestions;
// Handler para OPTIONS (CORS preflight)
const generateSuggestionsOptions = async () => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: ''
    };
};
exports.generateSuggestionsOptions = generateSuggestionsOptions;
//# sourceMappingURL=summarySuggestions.js.map