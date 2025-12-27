import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, PutCommand, UpdateCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Resume, ResumeData, GeneratedResume, ResumeScore } from '../types';

// Configuración para desarrollo local y producción
const client = new DynamoDBClient({
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

const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = process.env.RESUMES_TABLE || 'getquickresume-api-resumes-dev';

export const createResume = async (userId: string, resumeData: ResumeData, title?: string): Promise<Resume> => {
  try {
    const now = new Date().toISOString();
    const resumeId = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const resume: Resume = {
      id: resumeId,
      userId,
      title: title || `${resumeData.firstName} ${resumeData.lastName} - CV`,
      resumeData,
      status: 'draft',
      isPubliclyShared: false,
      aiCost: {
        totalInputTokens: 0,
        totalOutputTokens: 0,
        totalCostUSD: 0,
        callBreakdown: {
          generation: 0,
          scoring: 0,
          suggestions: 0,
          enhancements: 0,
          linkedInParsing: 0,
          translation: 0,
        },
      },
      createdAt: now,
      updatedAt: now,
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: {
        ...resume,
        resumeId: resume.id, // Mapear id a resumeId para DynamoDB
      },
    });

    await dynamodb.send(command);
    return resume;
  } catch (error) {
    console.error('Error creating resume:', error);
    throw new Error('Database error');
  }
};

export const getResumesByUserId = async (userId: string): Promise<Resume[]> => {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      ScanIndexForward: false, // Ordenar por fecha descendente
    });

    const result = await dynamodb.send(command);
    
    if (result.Items) {
      return result.Items.map((item: any) => ({
        ...item,
        id: item.resumeId, // Mapear resumeId de vuelta a id
      })) as Resume[];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting resumes by user ID:', error);
    throw new Error('Database error');
  }
};

export const getResumeById = async (userId: string, resumeId: string): Promise<Resume | null> => {
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: { 
        userId,
        resumeId 
      },
    });

    const result = await dynamodb.send(command);
    
    if (result.Item) {
      const item = result.Item as any;
      return {
        ...item,
        id: item.resumeId, // Mapear resumeId de vuelta a id
      } as Resume;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting resume by ID:', error);
    throw new Error('Database error');
  }
};

/**
 * Verifies that a resume exists and belongs to the specified user.
 * Used for ownership validation before tracking AI costs to a resume.
 * @param userId - The user ID from the JWT token
 * @param resumeId - The resume ID to verify
 * @returns true if the resume exists and belongs to the user, false otherwise
 */
export const verifyResumeOwnership = async (
  userId: string, 
  resumeId: string
): Promise<boolean> => {
  try {
    const resume = await getResumeById(userId, resumeId);
    return resume !== null;
  } catch (error) {
    console.error('Error verifying resume ownership:', error);
    return false;
  }
};

export const updateResume = async (userId: string, resumeId: string, updates: Partial<Resume>): Promise<Resume> => {
  try {
    const now = new Date().toISOString();
    
    const updateExpression = 'SET updatedAt = :updatedAt';
    const expressionAttributeValues: any = {
      ':updatedAt': now,
    };

    // Construir expresión de actualización dinámicamente
    const updateExpressions: string[] = [];
    Object.keys(updates).forEach((key, index) => {
      if (key !== 'id' && key !== 'userId' && key !== 'createdAt' && key !== 'updatedAt' && updates[key as keyof Resume] !== undefined) {
        updateExpressions.push(`${key} = :val${index}`);
        expressionAttributeValues[`:val${index}`] = updates[key as keyof Resume];
      }
    });

    if (updateExpressions.length === 0) {
      throw new Error('No valid fields to update');
    }

    const command = new UpdateCommand({
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
    const item = result.Attributes as any;
    return {
      ...item,
      id: item.resumeId, // Mapear resumeId de vuelta a id
    } as Resume;
  } catch (error) {
    console.error('Error updating resume:', error);
    throw new Error('Database error');
  }
};

export const deleteResume = async (userId: string, resumeId: string): Promise<void> => {
  try {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: { 
        userId,
        resumeId 
      },
    });

    await dynamodb.send(command);
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw new Error('Database error');
  }
};

export const updateResumeWithGenerated = async (
  userId: string, 
  resumeId: string, 
  generatedResume: GeneratedResume
): Promise<Resume> => {
  try {
    const now = new Date().toISOString();
    
    const command = new UpdateCommand({
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
    const item = result.Attributes as any;
    return {
      ...item,
      id: item.resumeId, // Mapear resumeId de vuelta a id
    } as Resume;
  } catch (error: any) {
    console.error('Error updating resume with generated content:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    throw error; // Lanzar el error original en lugar de uno genérico
  }
};

export const updateResumeWithScore = async (
  userId: string,
  resumeId: string,
  score: ResumeScore
): Promise<Resume> => {
  try {
    const now = new Date().toISOString();
    
    const command = new UpdateCommand({
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
    const item = result.Attributes as any;
    return {
      ...item,
      id: item.resumeId,
    } as Resume;
  } catch (error: any) {
    console.error('Error updating resume with score:', error);
    throw error;
  }
};

export const getResumeScore = async (
  userId: string,
  resumeId: string
): Promise<ResumeScore | null> => {
  try {
    const resume = await getResumeById(userId, resumeId);
    if (!resume || !resume.score) {
      return null;
    }
    return resume.score;
  } catch (error: any) {
    console.error('Error getting resume score:', error);
    throw error;
  }
};

export const getResumeByShareToken = async (shareToken: string): Promise<Resume | null> => {
  try {
    // Use GSI to query by shareToken
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: 'shareToken-index',
      KeyConditionExpression: 'shareToken = :shareToken',
      FilterExpression: 'isPubliclyShared = :isPubliclyShared',
      ExpressionAttributeValues: {
        ':shareToken': shareToken,
        ':isPubliclyShared': true,
      },
    });

    const result = await dynamodb.send(command);
    
    if (result.Items && result.Items.length > 0) {
      const item = result.Items[0] as any;
      return {
        ...item,
        id: item.resumeId,
      } as Resume;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting resume by share token:', error);
    throw new Error('Database error');
  }
};
