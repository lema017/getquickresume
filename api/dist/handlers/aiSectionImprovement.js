"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.improveSectionWithAIOptions = exports.improveSectionWithAI = void 0;
const aiService_1 = require("../services/aiService");
const rateLimiter_1 = require("../middleware/rateLimiter");
const inputSanitizer_1 = require("../utils/inputSanitizer");
const dynamodb_1 = require("../services/dynamodb");
const resumeService_1 = require("../services/resumeService");
const improveSectionWithAI = async (event) => {
    try {
        // 1. Validar autenticación
        if (!event.requestContext.authorizer) {
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
        const endpoint = 'improve-section';
        // Check user premium status and free resume usage
        const user = await (0, dynamodb_1.getUserById)(userId);
        if (!user) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'User not found',
                    message: 'User account not found'
                })
            };
        }
        // Premium check: AI suggestions are only available for premium users or free users who haven't used their quota
        if (!user.isPremium && user.freeResumeUsed) {
            return {
                statusCode: 403,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS',
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Premium feature required',
                    message: 'AI suggestions are only available for premium users or free users who haven\'t used their free resume quota.',
                    code: 'PREMIUM_REQUIRED'
                })
            };
        }
        // 2. Rate limiting: 1 request/minute for free users, 10 requests/minute for premium users
        const maxRequests = user.isPremium ? 10 : 1;
        const rateLimitResult = await (0, rateLimiter_1.checkRateLimit)(userId, endpoint, maxRequests, 60000);
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
                    message: 'Too many requests. Please wait before trying again.',
                    resetTime: rateLimitResult.resetTime
                })
            };
        }
        // 3. Validar request body
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
                    message: 'Please provide sectionType, originalText, userInstructions, and language'
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
        // 4. Sanitizar y validar inputs
        const sanitizedSectionType = (0, inputSanitizer_1.sanitizeSectionType)(requestData.sectionType);
        if (!sanitizedSectionType) {
            await (0, rateLimiter_1.logSuspiciousActivity)(userId, endpoint, 'Invalid section type', requestData.sectionType);
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
                    error: 'Invalid section type',
                    message: 'Section type must be one of: summary, experience, education, certification, project, achievement, language'
                })
            };
        }
        const sanitizedLanguage = (0, inputSanitizer_1.sanitizeLanguage)(requestData.language);
        const isAutoEnhance = requestData.autoEnhance === true;
        // Only sanitize and validate user instructions if not auto-enhancing
        let sanitizedInstructions = '';
        if (!isAutoEnhance) {
            sanitizedInstructions = (0, inputSanitizer_1.sanitizeUserInput)(requestData.userInstructions || '');
            // 5. Validar instrucciones del usuario (only for custom prompts)
            const inputValidation = (0, inputSanitizer_1.validateInput)(sanitizedInstructions);
            if (!inputValidation.isValid) {
                await (0, rateLimiter_1.logSuspiciousActivity)(userId, endpoint, `Invalid input: ${inputValidation.reason}`, sanitizedInstructions);
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
                        error: 'Invalid input',
                        message: inputValidation.reason || 'Input validation failed'
                    })
                };
            }
        }
        // 6. Validar texto original
        if (!requestData.originalText || requestData.originalText.trim().length === 0) {
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
                    error: 'Original text is required',
                    message: 'Please provide the original text to improve'
                })
            };
        }
        // 6.5 Sanitize original text to prevent prompt injection via resume content
        const sanitizedOriginalText = (0, inputSanitizer_1.sanitizeForPrompt)(requestData.originalText, 5000);
        // 7. Sanitize gathered context if provided
        let sanitizedGatheredContext;
        if (requestData.gatheredContext && Array.isArray(requestData.gatheredContext)) {
            sanitizedGatheredContext = requestData.gatheredContext.map(ctx => ({
                questionId: (0, inputSanitizer_1.sanitizeUserInput)(ctx.questionId || ''),
                answer: (0, inputSanitizer_1.sanitizeUserInput)(ctx.answer || '')
            })).filter(ctx => ctx.questionId && ctx.answer);
        }
        // 7.5 Validate resume ownership if resumeId is provided (for AI cost tracking)
        if (requestData.resumeId) {
            const isOwner = await (0, resumeService_1.verifyResumeOwnership)(userId, requestData.resumeId);
            if (!isOwner) {
                return {
                    statusCode: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                        'Access-Control-Allow-Methods': 'POST,OPTIONS',
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'Access denied',
                        message: 'Resume not found or access denied'
                    })
                };
            }
        }
        // 8. Llamar AI service con inputs sanitizados
        // Note: We force the cheap Groq model for ALL section enhancements to reduce costs
        try {
            let improvedText;
            if (isAutoEnhance) {
                // Auto-enhance mode: use automatic improvement prompts
                improvedText = await aiService_1.aiService.autoEnhanceSection(sanitizedSectionType, sanitizedOriginalText, sanitizedLanguage, {
                    userId,
                    resumeId: requestData.resumeId,
                    isPremium: user.isPremium,
                    forceModel: 'openai/gpt-oss-20b' // Force cheap model for cost reduction
                });
            }
            else {
                // Custom prompt mode: use user instructions
                improvedText = await aiService_1.aiService.improveSectionWithUserInstructions(sanitizedSectionType, sanitizedOriginalText, sanitizedInstructions, sanitizedLanguage, sanitizedGatheredContext, {
                    userId,
                    resumeId: requestData.resumeId,
                    isPremium: user.isPremium,
                    forceModel: 'openai/gpt-oss-20b' // Force cheap model for cost reduction
                });
            }
            const response = {
                success: true,
                data: improvedText,
                message: 'Section improved successfully',
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
        catch (aiError) {
            console.error('AI service error:', aiError);
            // Si es un error de validación del AI, devolver el texto original
            if (aiError.message.includes('validation failed') || aiError.message.includes('Invalid input')) {
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                        'Access-Control-Allow-Methods': 'POST,OPTIONS',
                    },
                    body: JSON.stringify({
                        success: true,
                        data: requestData.originalText,
                        message: 'Unable to improve text, returning original',
                        remainingRequests: rateLimitResult.remaining,
                        resetTime: rateLimitResult.resetTime
                    })
                };
            }
            throw aiError;
        }
    }
    catch (error) {
        console.error('Error in improveSectionWithAI handler:', error);
        // Refund rate limit on server error - user shouldn't be penalized
        const userId = event.requestContext.authorizer?.userId;
        if (userId) {
            await (0, rateLimiter_1.refundRateLimit)(userId, 'improve-section');
        }
        const errorResponse = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to improve section with AI'
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
exports.improveSectionWithAI = improveSectionWithAI;
const improveSectionWithAIOptions = async () => {
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
exports.improveSectionWithAIOptions = improveSectionWithAIOptions;
//# sourceMappingURL=aiSectionImprovement.js.map