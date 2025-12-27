import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, PutCommand, UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

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
const tableName = process.env.DYNAMODB_TABLE || 'getquickresume-api-users-dev';

// AI Usage Statistics for tracking costs
export interface AIUsageStats {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUSD: number;
  totalAICalls: number;
  lastAICallAt: string;
  monthlyStats: {
    month: string;  // YYYY-MM
    inputTokens: number;
    outputTokens: number;
    costUSD: number;
    callCount: number;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  avatarUrl?: string;
  city?: string;
  country?: string;
  location?: string;
  linkedin?: string;
  targetFunction?: string;
  profession?: string;
  provider: 'google' | 'facebook' | 'linkedin';
  isPremium: boolean;
  freeResumeUsed: boolean;
  premiumResumeCount: number;
  premiumResumeMonth: string; // YYYY-MM format
  freeDownloadUsed: boolean; // Tracks if free user used their 1 free download
  totalDownloads: number; // Tracks total downloads for analytics
  subscriptionExpiration?: string; // ISO date
  planType?: 'monthly' | 'yearly';
  subscriptionStartDate?: string; // ISO date
  paddleCustomerId?: string;
  paddleSubscriptionId?: string;
  paddleTransactionId?: string;
  aiUsageStats?: AIUsageStats; // AI usage tracking for cost analysis
  createdAt: string;
  updatedAt: string;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    });

    const result = await dynamodb.send(command);
    
    if (result.Items && result.Items.length > 0) {
      return result.Items[0] as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw new Error('Database error');
  }
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const now = new Date().toISOString();
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
    
    const user: User = {
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
      freeResumeUsed: false,
      premiumResumeCount: 0,
      premiumResumeMonth: currentMonth,
      freeDownloadUsed: false,
      totalDownloads: 0,
      createdAt: now,
      updatedAt: now,
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: user,
    });

    await dynamodb.send(command);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database error');
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: { id },
    });

    const result = await dynamodb.send(command);
    
    if (result.Item) {
      return result.Item as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw new Error('Database error');
  }
};

// Update free resume usage tracking
export const markFreeResumeUsed = async (userId: string): Promise<User> => {
  try {
    const now = new Date().toISOString();
    
    const command = new UpdateCommand({
      TableName: tableName,
      Key: { id: userId },
      UpdateExpression: 'SET freeResumeUsed = :freeResumeUsed, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':freeResumeUsed': true,
        ':updatedAt': now,
      },
      ReturnValues: 'ALL_NEW',
    });

    const result = await dynamodb.send(command);
    return result.Attributes as User;
  } catch (error) {
    console.error('Error marking free resume as used:', error);
    throw new Error('Database error');
  }
};

// Update premium resume count for current month
export const incrementPremiumResumeCount = async (userId: string): Promise<User> => {
  try {
    const now = new Date().toISOString();
    const currentMonth = now.slice(0, 7); // YYYY-MM format
    
    // First, get the user to check current month
    const user = await getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // If it's a new month, reset the count
    if (user.premiumResumeMonth !== currentMonth) {
      const command = new UpdateCommand({
        TableName: tableName,
        Key: { id: userId },
        UpdateExpression: 'SET premiumResumeCount = :count, premiumResumeMonth = :month, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':count': 1,
          ':month': currentMonth,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      });
      const result = await dynamodb.send(command);
      return result.Attributes as User;
    } else {
      // Increment existing count
      const command = new UpdateCommand({
        TableName: tableName,
        Key: { id: userId },
        UpdateExpression: 'SET premiumResumeCount = premiumResumeCount + :inc, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':inc': 1,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      });
      const result = await dynamodb.send(command);
      return result.Attributes as User;
    }
  } catch (error) {
    console.error('Error incrementing premium resume count:', error);
    throw new Error('Database error');
  }
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User> => {
  try {
    const now = new Date().toISOString();
    
    const updateExpression = 'SET updatedAt = :updatedAt';
    const expressionAttributeValues: any = {
      ':updatedAt': now,
    };

    // Construir expresión de actualización dinámicamente
    const updateExpressions: string[] = [];
    Object.keys(updates).forEach((key, index) => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && updates[key as keyof User] !== undefined) {
        updateExpressions.push(`${key} = :val${index}`);
        expressionAttributeValues[`:val${index}`] = updates[key as keyof User];
      }
    });

    if (updateExpressions.length === 0) {
      throw new Error('No valid fields to update');
    }

    const command = new UpdateCommand({
      TableName: tableName,
      Key: { id },
      UpdateExpression: `${updateExpression}, ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    const result = await dynamodb.send(command);
    return result.Attributes as User;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Database error');
  }
};

/**
 * Upgrade user to premium status
 * Sets isPremium to true and stores subscription details
 */
export const upgradeUserToPremium = async (
  userId: string,
  planType: 'monthly' | 'yearly',
  paddleCustomerId: string,
  paddleSubscriptionId?: string,
  paddleTransactionId?: string
): Promise<User> => {
  try {
    const now = new Date().toISOString();
    const startDate = now;
    
    // Calculate expiration date based on plan type
    const expirationDate = new Date(startDate);
    if (planType === 'monthly') {
      expirationDate.setMonth(expirationDate.getMonth() + 1);
    } else {
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    }

    const command = new UpdateCommand({
      TableName: tableName,
      Key: { id: userId },
      UpdateExpression: `
        SET isPremium = :isPremium,
            planType = :planType,
            subscriptionStartDate = :startDate,
            subscriptionExpiration = :expiration,
            paddleCustomerId = :customerId,
            paddleSubscriptionId = :subscriptionId,
            paddleTransactionId = :transactionId,
            updatedAt = :updatedAt
      `,
      ExpressionAttributeValues: {
        ':isPremium': true,
        ':planType': planType,
        ':startDate': startDate,
        ':expiration': expirationDate.toISOString(),
        ':customerId': paddleCustomerId,
        ':subscriptionId': paddleSubscriptionId || null,
        ':transactionId': paddleTransactionId || null,
        ':updatedAt': now,
      },
      ReturnValues: 'ALL_NEW',
    });

    const result = await dynamodb.send(command);
    return result.Attributes as User;
  } catch (error) {
    console.error('Error upgrading user to premium:', error);
    throw new Error('Database error');
  }
};
