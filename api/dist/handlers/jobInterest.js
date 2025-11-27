"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeForJob = exports.deleteJobInterestHandler = exports.updateJobInterestHandler = exports.createJobInterestHandler = exports.getJobInterest = exports.listJobInterests = void 0;
const jobInterestService_1 = require("../services/jobInterestService");
const dynamodb_1 = require("../services/dynamodb");
// Listar todos los job interests del usuario
const listJobInterests = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const jobInterests = await (0, jobInterestService_1.getJobInterestsByUserId)(userId);
        const response = {
            success: true,
            data: jobInterests,
            message: 'Job interests retrieved successfully'
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
        console.error('Error listing job interests:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to retrieve job interests'
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
exports.listJobInterests = listJobInterests;
// Obtener un job interest específico
const getJobInterest = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const jobId = event.pathParameters?.id;
        if (!jobId) {
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
                    error: 'Job ID is required'
                })
            };
        }
        const jobInterest = await (0, jobInterestService_1.getJobInterestById)(userId, jobId);
        if (!jobInterest) {
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
                    error: 'Job interest not found'
                })
            };
        }
        const response = {
            success: true,
            data: jobInterest,
            message: 'Job interest retrieved successfully'
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
        console.error('Error getting job interest:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to retrieve job interest'
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
exports.getJobInterest = getJobInterest;
// Crear un nuevo job interest
const createJobInterestHandler = async (event) => {
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
        const jobData = JSON.parse(event.body);
        if (!jobData.jobTitle || !jobData.company || !jobData.jobDescription) {
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
                    error: 'Job title, company, and description are required'
                })
            };
        }
        const jobInterest = await (0, jobInterestService_1.createJobInterest)(userId, jobData);
        const response = {
            success: true,
            data: jobInterest,
            message: 'Job interest created successfully'
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
        console.error('Error creating job interest:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to create job interest'
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
exports.createJobInterestHandler = createJobInterestHandler;
// Actualizar un job interest
const updateJobInterestHandler = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const jobId = event.pathParameters?.id;
        if (!jobId) {
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
                    error: 'Job ID is required'
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
        const jobInterest = await (0, jobInterestService_1.updateJobInterest)(userId, jobId, updates);
        const response = {
            success: true,
            data: jobInterest,
            message: 'Job interest updated successfully'
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
        console.error('Error updating job interest:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to update job interest'
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
exports.updateJobInterestHandler = updateJobInterestHandler;
// Eliminar un job interest
const deleteJobInterestHandler = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const jobId = event.pathParameters?.id;
        if (!jobId) {
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
                    error: 'Job ID is required'
                })
            };
        }
        await (0, jobInterestService_1.deleteJobInterest)(userId, jobId);
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
                message: 'Job interest deleted successfully'
            })
        };
    }
    catch (error) {
        console.error('Error deleting job interest:', error);
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
                message: 'Failed to delete job interest'
            })
        };
    }
};
exports.deleteJobInterestHandler = deleteJobInterestHandler;
// Optimizar un resume para un job específico
const optimizeForJob = async (event) => {
    try {
        const userId = event.requestContext.authorizer.userId;
        const jobId = event.pathParameters?.id;
        if (!jobId) {
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
                    error: 'Job ID is required'
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
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Request body is required'
                })
            };
        }
        const { resumeId } = JSON.parse(event.body);
        if (!resumeId) {
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
                    error: 'Resume ID is required'
                })
            };
        }
        // Verificar límites según tipo de usuario
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
        // Verificar límites según tipo de usuario (mismo que resume generation)
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
                        message: 'You have already used your free resume. Please upgrade to premium to optimize more resumes.'
                    })
                };
            }
        }
        else {
            // Premium user: 40 resumes per month
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
        // Obtener el job interest
        const jobInterest = await (0, jobInterestService_1.getJobInterestById)(userId, jobId);
        if (!jobInterest) {
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
                    error: 'Job interest not found'
                })
            };
        }
        // Actualizar tracking de generación de resumes (optimization cuenta igual que generation)
        if (!user.isPremium) {
            await (0, dynamodb_1.markFreeResumeUsed)(userId);
            console.log(`Marked free resume as used for optimization, user ${userId}`);
        }
        else {
            await (0, dynamodb_1.incrementPremiumResumeCount)(userId);
            const updatedUser = await (0, dynamodb_1.getUserById)(userId);
            console.log(`Incremented premium resume count for optimization, user ${userId}. Current count: ${updatedUser?.premiumResumeCount || 0}/${currentMonth}`);
        }
        // Aquí se implementaría la lógica de optimización con IA
        // Por ahora, marcamos el job como aplicado con el resume optimizado
        const updatedJobInterest = await (0, jobInterestService_1.markJobAsApplied)(userId, jobId, resumeId);
        const response = {
            success: true,
            data: updatedJobInterest,
            message: 'Resume optimized for job successfully'
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
        console.error('Error optimizing resume for job:', error);
        const response = {
            success: false,
            error: 'Internal server error',
            message: 'Failed to optimize resume for job'
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
exports.optimizeForJob = optimizeForJob;
//# sourceMappingURL=jobInterest.js.map