"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUserByEmail = void 0;
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
const tableName = process.env.DYNAMODB_TABLE || 'getquickresume-api-users-dev';
const getUserByEmail = async (email) => {
    try {
        const command = new lib_dynamodb_1.QueryCommand({
            TableName: tableName,
            IndexName: 'email-index',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
        });
        const result = await dynamodb.send(command);
        if (result.Items && result.Items.length > 0) {
            return result.Items[0];
        }
        return null;
    }
    catch (error) {
        console.error('Error getting user by email:', error);
        throw new Error('Database error');
    }
};
exports.getUserByEmail = getUserByEmail;
const createUser = async (userData) => {
    try {
        const now = new Date().toISOString();
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const user = {
            id: userId,
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            fullName: userData.fullName,
            avatarUrl: userData.avatarUrl,
            city: userData.city || '',
            country: userData.country || '',
            location: userData.location,
            linkedin: userData.linkedin,
            targetFunction: userData.targetFunction,
            profession: userData.profession,
            provider: userData.provider || 'google',
            isPremium: false,
            tokens: 5, // Tokens gratis para nuevos usuarios
            createdAt: now,
            updatedAt: now,
        };
        const command = new lib_dynamodb_1.PutCommand({
            TableName: tableName,
            Item: user,
        });
        await dynamodb.send(command);
        return user;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Database error');
    }
};
exports.createUser = createUser;
const updateUser = async (id, updates) => {
    try {
        const now = new Date().toISOString();
        const updateExpression = 'SET updatedAt = :updatedAt';
        const expressionAttributeValues = {
            ':updatedAt': now,
        };
        // Construir expresión de actualización dinámicamente
        const updateExpressions = [];
        Object.keys(updates).forEach((key, index) => {
            if (key !== 'id' && key !== 'createdAt' && updates[key] !== undefined) {
                updateExpressions.push(`${key} = :val${index}`);
                expressionAttributeValues[`:val${index}`] = updates[key];
            }
        });
        if (updateExpressions.length === 0) {
            throw new Error('No valid fields to update');
        }
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName: tableName,
            Key: { id },
            UpdateExpression: `${updateExpression}, ${updateExpressions.join(', ')}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        const result = await dynamodb.send(command);
        return result.Attributes;
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Database error');
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=dynamodb.js.map