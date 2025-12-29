"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResumeHandler = exports.updateResumeHandler = exports.createResumeHandler = exports.getResume = exports.listResumes = exports.generateResumeOptions = exports.generateResume = void 0;
const aiService_1 = require("../services/aiService");
const dynamodb_1 = require("../services/dynamodb");
const resumeService_1 = require("../services/resumeService");
const rateLimiter_1 = require("../middleware/rateLimiter");
const resumeScoringService_1 = require("../services/resumeScoringService");
const textFormatting_1 = require("../utils/textFormatting");
const generateResume = async (event) => {
    console.log('Generate Resume request received:', JSON.stringify(event, null, 2));
    try {
        // Verificar que el evento tenga el contexto de autorización
        if (!event.requestContext?.authorizer) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Unauthorized: Missing authorization context'
                })
            };
        }
        const userId = event.requestContext.authorizer.userId;
        const userEmail = event.requestContext.authorizer.email;
        // Obtener información del usuario para verificar límites y determinar rate limit
        const user = await (0, dynamodb_1.getUserById)(userId);
        if (!user) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'User not found'
                })
            };
        }
        // Rate limiting: Different limits based on premium status
        // Free users: 1 request per minute, Premium users: 5 requests per minute
        const maxRequests = user.isPremium ? 5 : 1;
        const rateLimitResult = await (0, rateLimiter_1.checkRateLimit)(userId, 'generate-resume', maxRequests, 60000);
        if (!rateLimitResult.allowed) {
            return {
                statusCode: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Rate limit exceeded',
                    message: `Too many resume generation requests. Please wait before trying again. (Limit: ${maxRequests} per minute)`,
                    resetTime: rateLimitResult.resetTime
                })
            };
        }
        // Parsear el cuerpo de la petición
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required'
                })
            };
        }
        const requestBody = JSON.parse(event.body);
        // Format profession field to Title Case
        if (requestBody.resumeData?.profession) {
            requestBody.resumeData.profession = (0, textFormatting_1.formatProfession)(requestBody.resumeData.profession);
        }
        if (!requestBody.resumeData) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Resume data is required'
                })
            };
        }
        // Verificar límites según tipo de usuario
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
        if (!user.isPremium) {
            // Free user: solo 1 resume lifetime
            if (user.freeResumeUsed) {
                return {
                    statusCode: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Access-Control-Allow-Methods': 'POST,OPTIONS'
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'Free resume limit reached',
                        message: 'You have already used your free resume. Please upgrade to premium to generate more resumes.'
                    })
                };
            }
        }
        else {
            // Premium user: 40 resumes per month
            // Check if it's a new month (reset counter)
            if (user.premiumResumeMonth !== currentMonth) {
                // Month has changed, counter will be reset when we increment
            }
            else if (user.premiumResumeCount >= 40) {
                return {
                    statusCode: 403,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Access-Control-Allow-Methods': 'POST,OPTIONS'
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'Monthly limit reached',
                        message: `You have reached your monthly limit of 40 resumes. Your limit will reset on the 1st of next month.`
                    })
                };
            }
        }
        let savedResume;
        // Si existe resumeId, actualizar el resume existente, sino crear uno nuevo
        if (requestBody.resumeId) {
            // Verificar que el resume existe y pertenece al usuario
            const existingResume = await (0, resumeService_1.getResumeById)(userId, requestBody.resumeId);
            if (!existingResume) {
                return {
                    statusCode: 404,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Access-Control-Allow-Methods': 'POST,OPTIONS'
                    },
                    body: JSON.stringify({
                        success: false,
                        error: 'Resume not found'
                    })
                };
            }
            savedResume = existingResume;
        }
        else {
            // Crear un nuevo resume
            savedResume = await (0, resumeService_1.createResume)(userId, requestBody.resumeData);
        }
        // Generar el CV usando IA (provider seleccionado según tipo de usuario)
        const generatedResume = await aiService_1.aiService.generateResume(requestBody.resumeData, user.isPremium, {
            userId,
            resumeId: savedResume.id,
            isPremium: user.isPremium
        });
        // Actualizar tracking de generación de resumes
        if (!user.isPremium) {
            await (0, dynamodb_1.markFreeResumeUsed)(userId);
            console.log(`Marked free resume as used for user ${userId}`);
        }
        else {
            await (0, dynamodb_1.incrementPremiumResumeCount)(userId);
            const updatedUser = await (0, dynamodb_1.getUserById)(userId);
            console.log(`Incremented premium resume count for user ${userId}. Current count: ${updatedUser?.premiumResumeCount || 0}/${currentMonth}`);
        }
        // Actualizar el resume con el contenido generado
        const updatedResume = await (0, resumeService_1.updateResumeWithGenerated)(userId, savedResume.id, generatedResume);
        // Score the resume synchronously (setTimeout doesn't work in Lambda - function terminates before callback runs)
        // This adds ~5-10 seconds to the response time but ensures scoring actually happens
        let resumeScore = null;
        try {
            console.log(`Starting synchronous scoring for resume ${savedResume.id}...`);
            resumeScore = await resumeScoringService_1.resumeScoringService.scoreResume(generatedResume, requestBody.resumeData, user.isPremium, {
                userId,
                resumeId: savedResume.id,
                isPremium: user.isPremium
            });
            await (0, resumeService_1.updateResumeWithScore)(userId, savedResume.id, resumeScore);
            console.log(`Scoring completed for resume ${savedResume.id}, score: ${resumeScore.totalScore}`);
        }
        catch (error) {
            console.error('Scoring failed (non-blocking):', error);
            // Don't fail the request if scoring fails - resume is still generated successfully
        }
        const response = {
            success: true,
            data: generatedResume,
            message: 'Resume generated successfully',
            resumeId: savedResume.id,
            remainingRequests: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime,
            score: resumeScore || undefined
        };
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error generating resume:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to generate resume'
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
};
exports.generateResume = generateResume;
// Handler para OPTIONS (CORS preflight)
const generateResumeOptions = async () => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: ''
    };
};
exports.generateResumeOptions = generateResumeOptions;
// Listar todos los resumes del usuario
const listResumes = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const resumes = await (0, resumeService_1.getResumesByUserId)(userId);
        const response = {
            success: true,
            data: resumes,
            message: 'Resumes retrieved successfully'
        };
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error listing resumes:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to retrieve resumes'
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
};
exports.listResumes = listResumes;
// Obtener un resume específico
const getResume = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const resumeId = event.pathParameters?.id;
        if (!resumeId) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Resume ID is required'
                })
            };
        }
        const resume = await (0, resumeService_1.getResumeById)(userId, resumeId);
        if (!resume) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Resume not found'
                })
            };
        }
        const response = {
            success: true,
            data: resume,
            message: 'Resume retrieved successfully'
        };
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error getting resume:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to retrieve resume'
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
};
exports.getResume = getResume;
// Crear un nuevo resume (draft)
const createResumeHandler = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required'
                })
            };
        }
        const requestBody = JSON.parse(event.body);
        const { resumeData, title } = requestBody;
        // Format profession field to Title Case
        if (resumeData?.profession) {
            resumeData.profession = (0, textFormatting_1.formatProfession)(resumeData.profession);
        }
        if (!resumeData) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Resume data is required'
                })
            };
        }
        const resume = await (0, resumeService_1.createResume)(userId, resumeData, title);
        const response = {
            success: true,
            data: resume,
            message: 'Resume created successfully'
        };
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error creating resume:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to create resume'
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
};
exports.createResumeHandler = createResumeHandler;
// Actualizar un resume
const updateResumeHandler = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const resumeId = event.pathParameters?.id;
        if (!resumeId) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'PUT,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Resume ID is required'
                })
            };
        }
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'PUT,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required'
                })
            };
        }
        const updates = JSON.parse(event.body);
        // Format profession field to Title Case if present
        if (updates.profession) {
            updates.profession = (0, textFormatting_1.formatProfession)(updates.profession);
        }
        // Also format profession in nested resumeData if present
        if (updates.resumeData?.profession) {
            updates.resumeData.profession = (0, textFormatting_1.formatProfession)(updates.resumeData.profession);
        }
        const resume = await (0, resumeService_1.updateResume)(userId, resumeId, updates);
        const response = {
            success: true,
            data: resume,
            message: 'Resume updated successfully'
        };
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'PUT,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
    catch (error) {
        console.error('Error updating resume:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to update resume'
        };
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'PUT,OPTIONS'
            },
            body: JSON.stringify(response)
        };
    }
};
exports.updateResumeHandler = updateResumeHandler;
// Eliminar un resume
const deleteResumeHandler = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const resumeId = event.pathParameters?.id;
        if (!resumeId) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Resume ID is required'
                })
            };
        }
        await (0, resumeService_1.deleteResume)(userId, resumeId);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                message: 'Resume deleted successfully'
            })
        };
    }
    catch (error) {
        console.error('Error deleting resume:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                error: 'Internal server error',
                message: 'Failed to delete resume'
            })
        };
    }
};
exports.deleteResumeHandler = deleteResumeHandler;
//# sourceMappingURL=resume.js.map