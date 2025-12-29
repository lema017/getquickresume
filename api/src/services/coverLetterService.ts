import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, PutCommand, UpdateCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { CoverLetter, CoverLetterData, GeneratedCoverLetter } from '../types';

// Configuration for local development and production
const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  // For local development, use local endpoint
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local'
    }
  })
});

const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = process.env.COVER_LETTERS_TABLE || 'getquickresume-api-cover-letters-dev';

/**
 * Create a new cover letter
 */
export const createCoverLetter = async (
  userId: string, 
  data: CoverLetterData, 
  title?: string
): Promise<CoverLetter> => {
  try {
    const now = new Date().toISOString();
    const coverLetterId = `cl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const coverLetter: CoverLetter = {
      id: coverLetterId,
      userId,
      title: title || `${data.companyName} - ${data.jobTitle}`,
      data,
      status: 'draft',
      aiCost: {
        totalInputTokens: 0,
        totalOutputTokens: 0,
        totalCostUSD: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: {
        ...coverLetter,
        coverLetterId: coverLetter.id, // Map id to coverLetterId for DynamoDB
      },
    });

    await dynamodb.send(command);
    return coverLetter;
  } catch (error) {
    console.error('Error creating cover letter:', error);
    throw new Error('Database error');
  }
};

/**
 * Get all cover letters for a user (ownership enforced by partition key)
 */
export const getCoverLettersByUserId = async (userId: string): Promise<CoverLetter[]> => {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      ScanIndexForward: false, // Order by date descending
    });

    const result = await dynamodb.send(command);
    
    if (result.Items) {
      return result.Items.map((item: any) => ({
        ...item,
        id: item.coverLetterId, // Map coverLetterId back to id
      })) as CoverLetter[];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting cover letters by user ID:', error);
    throw new Error('Database error');
  }
};

/**
 * Get a single cover letter by ID (ownership enforced by requiring userId)
 */
export const getCoverLetterById = async (
  userId: string, 
  coverLetterId: string
): Promise<CoverLetter | null> => {
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: { 
        userId,
        coverLetterId 
      },
    });

    const result = await dynamodb.send(command);
    
    if (result.Item) {
      const item = result.Item as any;
      return {
        ...item,
        id: item.coverLetterId, // Map coverLetterId back to id
      } as CoverLetter;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting cover letter by ID:', error);
    throw new Error('Database error');
  }
};

/**
 * Update a cover letter (ownership enforced by requiring userId)
 */
export const updateCoverLetter = async (
  userId: string, 
  coverLetterId: string, 
  updates: Partial<CoverLetter>
): Promise<CoverLetter> => {
  try {
    const now = new Date().toISOString();
    
    const expressionAttributeValues: Record<string, any> = {
      ':updatedAt': now,
    };
    const expressionAttributeNames: Record<string, string> = {};

    // Build update expression dynamically, using expression attribute names for all keys
    // to handle DynamoDB reserved keywords like 'data', 'status', etc.
    const updateExpressions: string[] = ['#updatedAt = :updatedAt'];
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    Object.keys(updates).forEach((key, index) => {
      if (key !== 'id' && key !== 'userId' && key !== 'createdAt' && key !== 'updatedAt' && updates[key as keyof CoverLetter] !== undefined) {
        const attrName = `#attr${index}`;
        const attrValue = `:val${index}`;
        updateExpressions.push(`${attrName} = ${attrValue}`);
        expressionAttributeNames[attrName] = key;
        expressionAttributeValues[attrValue] = updates[key as keyof CoverLetter];
      }
    });

    if (updateExpressions.length === 1) {
      // Only updatedAt, no other fields
      throw new Error('No valid fields to update');
    }

    const command = new UpdateCommand({
      TableName: tableName,
      Key: { 
        userId,
        coverLetterId 
      },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    const result = await dynamodb.send(command);
    const item = result.Attributes as any;
    return {
      ...item,
      id: item.coverLetterId, // Map coverLetterId back to id
    } as CoverLetter;
  } catch (error) {
    console.error('Error updating cover letter:', error);
    throw new Error('Database error');
  }
};

/**
 * Delete a cover letter (ownership enforced by requiring userId)
 */
export const deleteCoverLetter = async (
  userId: string, 
  coverLetterId: string
): Promise<void> => {
  try {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: { 
        userId,
        coverLetterId 
      },
    });

    await dynamodb.send(command);
  } catch (error) {
    console.error('Error deleting cover letter:', error);
    throw new Error('Database error');
  }
};

/**
 * Update cover letter with generated content
 */
export const updateCoverLetterWithGenerated = async (
  userId: string, 
  coverLetterId: string, 
  generatedContent: GeneratedCoverLetter
): Promise<CoverLetter> => {
  try {
    const now = new Date().toISOString();
    
    const command = new UpdateCommand({
      TableName: tableName,
      Key: { 
        userId,
        coverLetterId 
      },
      UpdateExpression: 'SET generatedContent = :generatedContent, #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':generatedContent': generatedContent,
        ':status': 'generated',
        ':updatedAt': now,
      },
      ReturnValues: 'ALL_NEW',
    });

    const result = await dynamodb.send(command);
    const item = result.Attributes as any;
    return {
      ...item,
      id: item.coverLetterId, // Map coverLetterId back to id
    } as CoverLetter;
  } catch (error: any) {
    console.error('Error updating cover letter with generated content:', error);
    throw error;
  }
};

/**
 * Update AI cost tracking for a cover letter
 */
export const updateCoverLetterAICost = async (
  userId: string,
  coverLetterId: string,
  inputTokens: number,
  outputTokens: number,
  costUSD: number
): Promise<void> => {
  try {
    const now = new Date().toISOString();
    
    // Get current cover letter to add to existing costs
    const existing = await getCoverLetterById(userId, coverLetterId);
    const existingCost = existing?.aiCost || { totalInputTokens: 0, totalOutputTokens: 0, totalCostUSD: 0 };
    
    const command = new UpdateCommand({
      TableName: tableName,
      Key: { 
        userId,
        coverLetterId 
      },
      UpdateExpression: 'SET aiCost = :aiCost, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':aiCost': {
          totalInputTokens: existingCost.totalInputTokens + inputTokens,
          totalOutputTokens: existingCost.totalOutputTokens + outputTokens,
          totalCostUSD: existingCost.totalCostUSD + costUSD,
        },
        ':updatedAt': now,
      },
    });

    await dynamodb.send(command);
  } catch (error) {
    console.error('Error updating cover letter AI cost:', error);
    // Don't throw - this is non-critical
  }
};

