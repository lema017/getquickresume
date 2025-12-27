import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

// Configuración para desarrollo local y producción
const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local'
    }
  })
});

const dynamodb = DynamoDBDocumentClient.from(client);
const aiUsageLogsTable = process.env.AI_USAGE_LOGS_TABLE || 'getquickresume-api-ai-usage-logs-dev';
const usersTable = process.env.DYNAMODB_TABLE || 'getquickresume-api-users-dev';
const resumesTable = process.env.RESUMES_TABLE || 'getquickresume-api-resumes-dev';

// ============================================================================
// PRICING CONSTANTS (per 1 million tokens)
// ============================================================================
export const AI_PRICING = {
  groq: {
    'openai/gpt-oss-20b': {
      input: 0.075,  // $0.075 per 1M input tokens
      output: 0.30   // $0.30 per 1M output tokens
    },
    'gpt-oss-20b': {
      input: 0.075,
      output: 0.30
    }
  },
  openai: {
    'gpt-4o': {
      input: 2.50,   // $2.50 per 1M input tokens
      output: 10.00  // $10.00 per 1M output tokens
    },
    'gpt-4o-mini': {
      input: 0.15,   // $0.15 per 1M input tokens
      output: 0.60   // $0.60 per 1M output tokens
    },
    'gpt-4': {
      input: 30.00,  // $30.00 per 1M input tokens
      output: 60.00  // $60.00 per 1M output tokens
    },
    'gpt-4-turbo': {
      input: 10.00,  // $10.00 per 1M input tokens
      output: 30.00  // $30.00 per 1M output tokens
    }
  },
  anthropic: {
    'claude-3-opus': {
      input: 15.00,
      output: 75.00
    },
    'claude-3-sonnet': {
      input: 3.00,
      output: 15.00
    },
    'claude-3-haiku': {
      input: 0.25,
      output: 1.25
    }
  }
} as const;

// ============================================================================
// TYPES
// ============================================================================
export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AIResponse {
  content: string;
  usage: TokenUsage;
}

export type AIProvider = 'groq' | 'openai' | 'anthropic';

export type AIEndpointType = 
  | 'generateResume'
  | 'scoreResume'
  | 'professionSuggestions'
  | 'achievementSuggestions'
  | 'summarySuggestions'
  | 'jobTitleAchievements'
  | 'enhanceText'
  | 'improveSection'
  | 'enhancementQuestions'
  | 'answerSuggestion'
  | 'linkedInParsing'
  | 'translateResume';

export interface AIUsageLog {
  id: string;
  userId: string;
  resumeId?: string;
  timestamp: string;
  endpoint: AIEndpointType;
  provider: AIProvider;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  costUSD: number;
  isPremium: boolean;
  ttl?: number;
}

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

export interface ResumeAICost {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUSD: number;
  callBreakdown: {
    generation: number;
    scoring: number;
    suggestions: number;
    enhancements: number;
    linkedInParsing: number;
    translation: number;
  };
}

// ============================================================================
// COST CALCULATION
// ============================================================================

/**
 * Calculate cost in USD based on provider, model, and token usage
 */
export function calculateCost(
  provider: AIProvider,
  model: string,
  usage: TokenUsage
): number {
  // Normalize model name (remove prefixes like "openai/")
  const normalizedModel = model.replace('openai/', '').toLowerCase();
  
  // Get pricing for the provider
  const providerPricing = AI_PRICING[provider];
  if (!providerPricing) {
    console.warn(`Unknown provider: ${provider}, using default pricing`);
    // Default to Groq pricing as fallback
    return (usage.promptTokens * 0.075 + usage.completionTokens * 0.30) / 1_000_000;
  }

  // Find matching model pricing
  let modelPricing: { input: number; output: number } | undefined;
  
  for (const [modelKey, pricing] of Object.entries(providerPricing)) {
    if (normalizedModel.includes(modelKey.toLowerCase()) || modelKey.toLowerCase().includes(normalizedModel)) {
      modelPricing = pricing;
      break;
    }
  }

  if (!modelPricing) {
    console.warn(`Unknown model: ${model} for provider: ${provider}, using first available pricing`);
    // Use first available pricing for provider as fallback
    const firstPricing = Object.values(providerPricing)[0];
    modelPricing = firstPricing || { input: 0.075, output: 0.30 }; // Default to Groq pricing
  }

  // Calculate cost (prices are per 1M tokens)
  const inputCost = (usage.promptTokens / 1_000_000) * modelPricing!.input;
  const outputCost = (usage.completionTokens / 1_000_000) * modelPricing!.output;
  
  return Number((inputCost + outputCost).toFixed(8));
}

// ============================================================================
// LOGGING FUNCTIONS
// ============================================================================

/**
 * Log an individual AI API call to the usage logs table
 */
export async function logAIUsage(params: {
  userId: string;
  resumeId?: string;
  endpoint: AIEndpointType;
  provider: AIProvider;
  model: string;
  usage: TokenUsage;
  isPremium: boolean;
}): Promise<AIUsageLog> {
  const { userId, resumeId, endpoint, provider, model, usage, isPremium } = params;
  
  const now = new Date();
  const timestamp = now.toISOString();
  const id = `ailog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Calculate cost
  const costUSD = calculateCost(provider, model, usage);
  
  // Set TTL for 90 days
  const ttl = Math.floor(now.getTime() / 1000) + (90 * 24 * 60 * 60);
  
  const logEntry: AIUsageLog = {
    id,
    userId,
    resumeId,
    timestamp,
    endpoint,
    provider,
    model,
    inputTokens: usage.promptTokens,
    outputTokens: usage.completionTokens,
    totalTokens: usage.totalTokens,
    costUSD,
    isPremium,
    ttl
  };

  try {
    const command = new PutCommand({
      TableName: aiUsageLogsTable,
      Item: logEntry
    });
    
    await dynamodb.send(command);
    
    console.log('AI Usage logged:', {
      id,
      userId,
      endpoint,
      provider,
      model,
      tokens: usage.totalTokens,
      costUSD,
      isPremium
    });
    
    return logEntry;
  } catch (error) {
    console.error('Error logging AI usage:', error);
    // Don't throw - logging should not break the main flow
    return logEntry;
  }
}

/**
 * Update user's aggregate AI usage statistics
 */
export async function updateUserAggregates(
  userId: string,
  usage: TokenUsage,
  costUSD: number
): Promise<void> {
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7); // YYYY-MM format

  try {
    // First, try to update existing stats
    const command = new UpdateCommand({
      TableName: usersTable,
      Key: { id: userId },
      UpdateExpression: `
        SET 
          aiUsageStats.totalInputTokens = if_not_exists(aiUsageStats.totalInputTokens, :zero) + :inputTokens,
          aiUsageStats.totalOutputTokens = if_not_exists(aiUsageStats.totalOutputTokens, :zero) + :outputTokens,
          aiUsageStats.totalCostUSD = if_not_exists(aiUsageStats.totalCostUSD, :zero) + :costUSD,
          aiUsageStats.totalAICalls = if_not_exists(aiUsageStats.totalAICalls, :zero) + :one,
          aiUsageStats.lastAICallAt = :timestamp,
          aiUsageStats.monthlyStats = :monthlyStats,
          updatedAt = :timestamp
      `,
      ExpressionAttributeValues: {
        ':inputTokens': usage.promptTokens,
        ':outputTokens': usage.completionTokens,
        ':costUSD': costUSD,
        ':one': 1,
        ':zero': 0,
        ':timestamp': now.toISOString(),
        ':monthlyStats': {
          month: currentMonth,
          inputTokens: usage.promptTokens,
          outputTokens: usage.completionTokens,
          costUSD: costUSD,
          callCount: 1
        }
      },
      ConditionExpression: 'attribute_exists(id)'
    });

    await dynamodb.send(command);
  } catch (error: any) {
    // If the update fails because aiUsageStats doesn't exist, initialize it
    if (error.name === 'ConditionalCheckFailedException' || error.code === 'ValidationException') {
      try {
        const initCommand = new UpdateCommand({
          TableName: usersTable,
          Key: { id: userId },
          UpdateExpression: `
            SET 
              aiUsageStats = :stats,
              updatedAt = :timestamp
          `,
          ExpressionAttributeValues: {
            ':stats': {
              totalInputTokens: usage.promptTokens,
              totalOutputTokens: usage.completionTokens,
              totalCostUSD: costUSD,
              totalAICalls: 1,
              lastAICallAt: now.toISOString(),
              monthlyStats: {
                month: currentMonth,
                inputTokens: usage.promptTokens,
                outputTokens: usage.completionTokens,
                costUSD: costUSD,
                callCount: 1
              }
            },
            ':timestamp': now.toISOString()
          }
        });
        await dynamodb.send(initCommand);
      } catch (initError) {
        console.error('Error initializing user AI usage stats:', initError);
      }
    } else {
      console.error('Error updating user AI usage aggregates:', error);
    }
  }
}

/**
 * Update resume's AI cost tracking
 */
export async function updateResumeAICost(
  userId: string,
  resumeId: string,
  usage: TokenUsage,
  costUSD: number,
  endpointType: AIEndpointType
): Promise<void> {
  // Map endpoint types to breakdown categories
  const breakdownCategory = getBreakdownCategory(endpointType);

  console.log('updateResumeAICost called:', { userId, resumeId, costUSD, endpointType, breakdownCategory });

  // First, try to initialize aiCost if it doesn't exist, then update
  // This approach is more reliable than trying to update and catching errors
  try {
    // Try updating existing aiCost structure
    const command = new UpdateCommand({
      TableName: resumesTable,
      Key: { 
        userId: userId,
        resumeId: resumeId
      },
      UpdateExpression: `
        SET 
          aiCost.totalInputTokens = if_not_exists(aiCost.totalInputTokens, :zero) + :inputTokens,
          aiCost.totalOutputTokens = if_not_exists(aiCost.totalOutputTokens, :zero) + :outputTokens,
          aiCost.totalCostUSD = if_not_exists(aiCost.totalCostUSD, :zero) + :costUSD,
          aiCost.callBreakdown.${breakdownCategory} = if_not_exists(aiCost.callBreakdown.${breakdownCategory}, :zero) + :costUSD,
          updatedAt = :timestamp
      `,
      ExpressionAttributeValues: {
        ':inputTokens': usage.promptTokens,
        ':outputTokens': usage.completionTokens,
        ':costUSD': costUSD,
        ':zero': 0,
        ':timestamp': new Date().toISOString()
      },
      // Only succeed if aiCost already exists
      ConditionExpression: 'attribute_exists(aiCost)'
    });

    await dynamodb.send(command);
    console.log('Successfully updated existing aiCost for resume:', resumeId);
  } catch (error: any) {
    // Check if error is because aiCost doesn't exist (ConditionalCheckFailedException or ValidationException)
    const errorName = error.name || error.code || '';
    console.log('First update attempt failed, error:', errorName, error.message);
    
    if (errorName === 'ConditionalCheckFailedException' || 
        errorName === 'ValidationException' ||
        error.message?.includes('document path') ||
        error.message?.includes('aiCost')) {
      // aiCost doesn't exist, initialize it
      try {
        console.log('Initializing aiCost for resume:', resumeId);
        const initCommand = new UpdateCommand({
          TableName: resumesTable,
          Key: { 
            userId: userId,
            resumeId: resumeId
          },
          UpdateExpression: `
            SET 
              aiCost = :aiCost,
              updatedAt = :timestamp
          `,
          ExpressionAttributeValues: {
            ':aiCost': {
              totalInputTokens: usage.promptTokens,
              totalOutputTokens: usage.completionTokens,
              totalCostUSD: costUSD,
              callBreakdown: {
                generation: breakdownCategory === 'generation' ? costUSD : 0,
                scoring: breakdownCategory === 'scoring' ? costUSD : 0,
                suggestions: breakdownCategory === 'suggestions' ? costUSD : 0,
                enhancements: breakdownCategory === 'enhancements' ? costUSD : 0,
                linkedInParsing: breakdownCategory === 'linkedInParsing' ? costUSD : 0,
                translation: breakdownCategory === 'translation' ? costUSD : 0
              }
            },
            ':timestamp': new Date().toISOString()
          }
        });
        await dynamodb.send(initCommand);
        console.log('Successfully initialized aiCost for resume:', resumeId);
      } catch (initError: any) {
        console.error('Error initializing resume AI cost:', initError.name, initError.message);
      }
    } else {
      console.error('Error updating resume AI cost:', errorName, error.message);
    }
  }
}

/**
 * Map endpoint type to breakdown category
 */
function getBreakdownCategory(endpointType: AIEndpointType): string {
  switch (endpointType) {
    case 'generateResume':
      return 'generation';
    case 'scoreResume':
      return 'scoring';
    case 'professionSuggestions':
    case 'achievementSuggestions':
    case 'summarySuggestions':
    case 'jobTitleAchievements':
      return 'suggestions';
    case 'enhanceText':
    case 'improveSection':
    case 'enhancementQuestions':
    case 'answerSuggestion':
      return 'enhancements';
    case 'linkedInParsing':
      return 'linkedInParsing';
    case 'translateResume':
      return 'translation';
    default:
      return 'enhancements';
  }
}

// ============================================================================
// COMBINED TRACKING FUNCTION
// ============================================================================

/**
 * Track AI usage - logs to table and updates user/resume aggregates
 * This is the main function to call from handlers
 */
export async function trackAIUsage(params: {
  userId: string;
  resumeId?: string;
  endpoint: AIEndpointType;
  provider: AIProvider;
  model: string;
  usage: TokenUsage;
  isPremium: boolean;
}): Promise<void> {
  const { userId, resumeId, provider, model, usage, isPremium } = params;

  // Calculate cost once
  const costUSD = calculateCost(provider, model, usage);

  // Run all tracking operations in parallel (fire-and-forget style for performance)
  const trackingPromises: Promise<any>[] = [
    // 1. Log to AI usage logs table
    logAIUsage({ ...params, usage }),
    
    // 2. Update user aggregates
    updateUserAggregates(userId, usage, costUSD)
  ];

  // 3. Update resume cost if resumeId is provided
  if (resumeId) {
    trackingPromises.push(
      updateResumeAICost(userId, resumeId, usage, costUSD, params.endpoint)
    );
  }

  // Wait for all tracking to complete (but don't fail the main request if tracking fails)
  try {
    await Promise.allSettled(trackingPromises);
  } catch (error) {
    console.error('Error in AI usage tracking:', error);
    // Don't throw - tracking should not break the main flow
  }
}

// ============================================================================
// QUERY FUNCTIONS (for analytics)
// ============================================================================

/**
 * Get AI usage logs for a specific user
 */
export async function getUserAIUsageLogs(
  userId: string,
  limit: number = 100
): Promise<AIUsageLog[]> {
  try {
    const command = new QueryCommand({
      TableName: aiUsageLogsTable,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      ScanIndexForward: false, // Most recent first
      Limit: limit
    });

    const result = await dynamodb.send(command);
    return (result.Items || []) as AIUsageLog[];
  } catch (error) {
    console.error('Error getting user AI usage logs:', error);
    return [];
  }
}

/**
 * Get AI usage logs for a specific resume
 */
export async function getResumeAIUsageLogs(
  resumeId: string,
  limit: number = 100
): Promise<AIUsageLog[]> {
  try {
    const command = new QueryCommand({
      TableName: aiUsageLogsTable,
      IndexName: 'resumeId-index',
      KeyConditionExpression: 'resumeId = :resumeId',
      ExpressionAttributeValues: {
        ':resumeId': resumeId
      },
      ScanIndexForward: false,
      Limit: limit
    });

    const result = await dynamodb.send(command);
    return (result.Items || []) as AIUsageLog[];
  } catch (error) {
    console.error('Error getting resume AI usage logs:', error);
    return [];
  }
}

