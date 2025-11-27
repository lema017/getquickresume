import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, PutCommand, UpdateCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { JobInterest, JobInterestData } from '../types';

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
const tableName = process.env.JOB_INTERESTS_TABLE || 'getquickresume-api-job-interests-dev';

export const createJobInterest = async (userId: string, jobData: JobInterestData): Promise<JobInterest> => {
  try {
    const now = new Date().toISOString();
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const jobInterest: JobInterest = {
      id: jobId,
      userId,
      jobTitle: jobData.jobTitle,
      company: jobData.company,
      jobDescription: jobData.jobDescription,
      jobUrl: jobData.jobUrl,
      status: 'active',
      createdAt: now,
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: jobInterest,
    });

    await dynamodb.send(command);
    return jobInterest;
  } catch (error) {
    console.error('Error creating job interest:', error);
    throw new Error('Database error');
  }
};

export const getJobInterestsByUserId = async (userId: string): Promise<JobInterest[]> => {
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
      return result.Items as JobInterest[];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting job interests by user ID:', error);
    throw new Error('Database error');
  }
};

export const getJobInterestById = async (userId: string, jobId: string): Promise<JobInterest | null> => {
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: { 
        userId,
        jobId 
      },
    });

    const result = await dynamodb.send(command);
    
    if (result.Item) {
      return result.Item as JobInterest;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting job interest by ID:', error);
    throw new Error('Database error');
  }
};

export const updateJobInterest = async (userId: string, jobId: string, updates: Partial<JobInterest>): Promise<JobInterest> => {
  try {
    const updateExpression = 'SET';
    const expressionAttributeValues: any = {};

    // Construir expresión de actualización dinámicamente
    const updateExpressions: string[] = [];
    Object.keys(updates).forEach((key, index) => {
      if (key !== 'id' && key !== 'userId' && key !== 'createdAt' && updates[key as keyof JobInterest] !== undefined) {
        updateExpressions.push(`${key} = :val${index}`);
        expressionAttributeValues[`:val${index}`] = updates[key as keyof JobInterest];
      }
    });

    if (updateExpressions.length === 0) {
      throw new Error('No valid fields to update');
    }

    const command = new UpdateCommand({
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
    return result.Attributes as JobInterest;
  } catch (error) {
    console.error('Error updating job interest:', error);
    throw new Error('Database error');
  }
};

export const deleteJobInterest = async (userId: string, jobId: string): Promise<void> => {
  try {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: { 
        userId,
        jobId 
      },
    });

    await dynamodb.send(command);
  } catch (error) {
    console.error('Error deleting job interest:', error);
    throw new Error('Database error');
  }
};

export const markJobAsApplied = async (userId: string, jobId: string, optimizedResumeId?: string): Promise<JobInterest> => {
  try {
    const updates: Partial<JobInterest> = {
      status: 'applied',
    };

    if (optimizedResumeId) {
      updates.optimizedResumeId = optimizedResumeId;
    }

    return await updateJobInterest(userId, jobId, updates);
  } catch (error) {
    console.error('Error marking job as applied:', error);
    throw new Error('Database error');
  }
};
