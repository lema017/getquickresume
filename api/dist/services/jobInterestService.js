"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markJobAsApplied = exports.deleteJobInterest = exports.updateJobInterest = exports.getJobInterestById = exports.getJobInterestsByUserId = exports.createJobInterest = void 0;
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
const tableName = process.env.JOB_INTERESTS_TABLE || 'getquickresume-api-job-interests-dev';
const createJobInterest = async (userId, jobData) => {
    try {
        const now = new Date().toISOString();
        const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const jobInterest = {
            id: jobId,
            userId,
            jobTitle: jobData.jobTitle,
            company: jobData.company,
            jobDescription: jobData.jobDescription,
            jobUrl: jobData.jobUrl,
            status: 'active',
            createdAt: now,
        };
        const command = new lib_dynamodb_1.PutCommand({
            TableName: tableName,
            Item: jobInterest,
        });
        await dynamodb.send(command);
        return jobInterest;
    }
    catch (error) {
        console.error('Error creating job interest:', error);
        throw new Error('Database error');
    }
};
exports.createJobInterest = createJobInterest;
const getJobInterestsByUserId = async (userId) => {
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
            return result.Items;
        }
        return [];
    }
    catch (error) {
        console.error('Error getting job interests by user ID:', error);
        throw new Error('Database error');
    }
};
exports.getJobInterestsByUserId = getJobInterestsByUserId;
const getJobInterestById = async (userId, jobId) => {
    try {
        const command = new lib_dynamodb_1.GetCommand({
            TableName: tableName,
            Key: {
                userId,
                jobId
            },
        });
        const result = await dynamodb.send(command);
        if (result.Item) {
            return result.Item;
        }
        return null;
    }
    catch (error) {
        console.error('Error getting job interest by ID:', error);
        throw new Error('Database error');
    }
};
exports.getJobInterestById = getJobInterestById;
const updateJobInterest = async (userId, jobId, updates) => {
    try {
        const updateExpression = 'SET';
        const expressionAttributeValues = {};
        // Construir expresión de actualización dinámicamente
        const updateExpressions = [];
        Object.keys(updates).forEach((key, index) => {
            if (key !== 'id' && key !== 'userId' && key !== 'createdAt' && updates[key] !== undefined) {
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
                jobId
            },
            UpdateExpression: `${updateExpression} ${updateExpressions.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        const result = await dynamodb.send(command);
        return result.Attributes;
    }
    catch (error) {
        console.error('Error updating job interest:', error);
        throw new Error('Database error');
    }
};
exports.updateJobInterest = updateJobInterest;
const deleteJobInterest = async (userId, jobId) => {
    try {
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName: tableName,
            Key: {
                userId,
                jobId
            },
        });
        await dynamodb.send(command);
    }
    catch (error) {
        console.error('Error deleting job interest:', error);
        throw new Error('Database error');
    }
};
exports.deleteJobInterest = deleteJobInterest;
const markJobAsApplied = async (userId, jobId, optimizedResumeId) => {
    try {
        const updates = {
            status: 'applied',
        };
        if (optimizedResumeId) {
            updates.optimizedResumeId = optimizedResumeId;
        }
        return await (0, exports.updateJobInterest)(userId, jobId, updates);
    }
    catch (error) {
        console.error('Error marking job as applied:', error);
        throw new Error('Database error');
    }
};
exports.markJobAsApplied = markJobAsApplied;
//# sourceMappingURL=jobInterestService.js.map