import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

// Create DynamoDB client (same config as dynamodb.ts)
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
const tableName = process.env.DYNAMODB_TABLE || 'getquickresume-api-users-dev';

/**
 * Scheduled Lambda to expire premium subscriptions
 * Runs daily to batch-downgrade users whose subscriptions have expired
 * 
 * This is a safety net - the primary expiration check happens in getUserById
 * This ensures users are downgraded even if they haven't logged in
 */
export const expireSubscriptions = async (): Promise<void> => {
  const now = new Date().toISOString();
  console.log(`[Scheduled] Starting subscription expiration check at ${now}`);

  try {
    // Scan for expired premium users
    // Note: For large user bases, consider using pagination or a GSI
    const command = new ScanCommand({
      TableName: tableName,
      FilterExpression: 'isPremium = :true AND subscriptionExpiration < :now',
      ExpressionAttributeValues: {
        ':true': true,
        ':now': now
      },
      ProjectionExpression: 'id, email, subscriptionExpiration'
    });

    const result = await dynamodb.send(command);
    const expiredUsers = result.Items || [];

    console.log(`[Scheduled] Found ${expiredUsers.length} expired subscriptions`);

    // Process each expired user
    let successCount = 0;
    let errorCount = 0;

    for (const user of expiredUsers) {
      try {
        await dynamodb.send(new UpdateCommand({
          TableName: tableName,
          Key: { id: user.id },
          UpdateExpression: 'SET isPremium = :false, updatedAt = :now',
          ExpressionAttributeValues: {
            ':false': false,
            ':now': now
          }
        }));

        console.log(`[Scheduled] Expired subscription for user: ${user.id.substring(0, 8)}... (expired: ${user.subscriptionExpiration})`);
        successCount++;
      } catch (error) {
        console.error(`[Scheduled] Failed to expire user ${user.id.substring(0, 8)}...:`, error);
        errorCount++;
      }
    }

    console.log(`[Scheduled] Completed: ${successCount} users downgraded, ${errorCount} errors`);

    // If there are more items (pagination), log a warning
    if (result.LastEvaluatedKey) {
      console.warn('[Scheduled] Warning: More expired users exist. Consider implementing pagination.');
    }

  } catch (error) {
    console.error('[Scheduled] Error during subscription expiration check:', error);
    throw error; // Re-throw to mark Lambda as failed
  }
};
