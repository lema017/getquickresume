"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResumeScore = exports.updateResumeWithScore = exports.updateResumeWithGenerated = exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getResumesByUserId = exports.createResume = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// Configuración para desarrollo local y producción
const client = new client_dynamodb_1.DynamoDBClient({
    region: process.env.REGION || 'us-east-1',
    // Para desarrollo local, usar endpoint local
    ...(process.env.DYNAMODB_ENDPOINT && {
        endpoint: process.env.DYNAMODB_ENDPOINT,
        credentials: {
            accessKeyId: 'local',
            secretAccessKey: 'local'
        }
    })
});
const dynamodb = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const tableName = process.env.RESUMES_TABLE || 'getquickresume-api-resumes-dev';
const createResume = async (userId, resumeData, title) => {
    try {
        const now = new Date().toISOString();
        const resumeId = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const resume = {
            id: resumeId,
            userId,
            title: title || `${resumeData.firstName} ${resumeData.lastName} - CV`,
            resumeData,
            status: 'draft',
            createdAt: now,
            updatedAt: now,
        };
        const command = new lib_dynamodb_1.PutCommand({
            TableName: tableName,
            Item: {
                ...resume,
                resumeId: resume.id, // Mapear id a resumeId para DynamoDB
            },
        });
        await dynamodb.send(command);
        return resume;
    }
    catch (error) {
        console.error('Error creating resume:', error);
        throw new Error('Database error');
    }
};
exports.createResume = createResume;
const getResumesByUserId = async (userId) => {
    try {
        const command = new lib_dynamodb_1.QueryCommand({
            TableName: tableName,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId,
            },
            ScanIndexForward: false, // Ordenar por fecha descendente
        });
        const result = await dynamodb.send(command);
        if (result.Items) {
            return result.Items.map((item) => ({
                ...item,
                id: item.resumeId, // Mapear resumeId de vuelta a id
            }));
        }
        return [];
    }
    catch (error) {
        console.error('Error getting resumes by user ID:', error);
        throw new Error('Database error');
    }
};
exports.getResumesByUserId = getResumesByUserId;
const getResumeById = async (userId, resumeId) => {
    try {
        const command = new lib_dynamodb_1.GetCommand({
            TableName: tableName,
            Key: {
                userId,
                resumeId
            },
        });
        const result = await dynamodb.send(command);
        if (result.Item) {
            const item = result.Item;
            return {
                ...item,
                id: item.resumeId, // Mapear resumeId de vuelta a id
            };
        }
        return null;
    }
    catch (error) {
        console.error('Error getting resume by ID:', error);
        throw new Error('Database error');
    }
};
exports.getResumeById = getResumeById;
const updateResume = async (userId, resumeId, updates) => {
    try {
        const now = new Date().toISOString();
        const updateExpression = 'SET updatedAt = :updatedAt';
        const expressionAttributeValues = {
            ':updatedAt': now,
        };
        // Construir expresión de actualización dinámicamente
        const updateExpressions = [];
        Object.keys(updates).forEach((key, index) => {
            if (key !== 'id' && key !== 'userId' && key !== 'createdAt' && key !== 'updatedAt' && updates[key] !== undefined) {
                updateExpressions.push(`${key} = :val${index}`);
                expressionAttributeValues[`:val${index}`] = updates[key];
            }
        });
        if (updateExpressions.length === 0) {
            throw new Error('No valid fields to update');
        }
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName: tableName,
            Key: {
                userId,
                resumeId
            },
            UpdateExpression: `${updateExpression}, ${updateExpressions.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        const result = await dynamodb.send(command);
        const item = result.Attributes;
        return {
            ...item,
            id: item.resumeId, // Mapear resumeId de vuelta a id
        };
    }
    catch (error) {
        console.error('Error updating resume:', error);
        throw new Error('Database error');
    }
};
exports.updateResume = updateResume;
const deleteResume = async (userId, resumeId) => {
    try {
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName: tableName,
            Key: {
                userId,
                resumeId
            },
        });
        await dynamodb.send(command);
    }
    catch (error) {
        console.error('Error deleting resume:', error);
        throw new Error('Database error');
    }
};
exports.deleteResume = deleteResume;
const updateResumeWithGenerated = async (userId, resumeId, generatedResume) => {
    try {
        const now = new Date().toISOString();
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName: tableName,
            Key: {
                userId,
                resumeId
            },
            UpdateExpression: 'SET generatedResume = :generatedResume, #status = :status, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
                '#status': 'status'
            },
            ExpressionAttributeValues: {
                ':generatedResume': generatedResume,
                ':status': 'generated',
                ':updatedAt': now,
            },
            ReturnValues: 'ALL_NEW',
        });
        const result = await dynamodb.send(command);
        const item = result.Attributes;
        return {
            ...item,
            id: item.resumeId, // Mapear resumeId de vuelta a id
        };
    }
    catch (error) {
        console.error('Error updating resume with generated content:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        throw error; // Lanzar el error original en lugar de uno genérico
    }
};
exports.updateResumeWithGenerated = updateResumeWithGenerated;
const updateResumeWithScore = async (userId, resumeId, score) => {
    try {
        const now = new Date().toISOString();
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName: tableName,
            Key: {
                userId,
                resumeId
            },
            UpdateExpression: 'SET #score = :score, scoreGeneratedAt = :scoreGeneratedAt, scoreVersion = :scoreVersion, updatedAt = :updatedAt',
            ExpressionAttributeNames: {
                '#score': 'score'
            },
            ExpressionAttributeValues: {
                ':score': score,
                ':scoreGeneratedAt': score.generatedAt,
                ':scoreVersion': '1.0',
                ':updatedAt': now,
            },
            ReturnValues: 'ALL_NEW',
        });
        const result = await dynamodb.send(command);
        const item = result.Attributes;
        return {
            ...item,
            id: item.resumeId,
        };
    }
    catch (error) {
        console.error('Error updating resume with score:', error);
        throw error;
    }
};
exports.updateResumeWithScore = updateResumeWithScore;
const getResumeScore = async (userId, resumeId) => {
    try {
        const resume = await (0, exports.getResumeById)(userId, resumeId);
        if (!resume || !resume.score) {
            return null;
        }
        return resume.score;
    }
    catch (error) {
        console.error('Error getting resume score:', error);
        throw error;
    }
};
exports.getResumeScore = getResumeScore;
//# sourceMappingURL=resumeService.js.map