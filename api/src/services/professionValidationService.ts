/**
 * Profession Validation Cache Service
 * 
 * Caches validated professions in DynamoDB to avoid redundant AI calls.
 * Only valid professions are cached - invalid ones are not stored.
 * If a profession is found in the cache, it is guaranteed to be valid.
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

// ============================================================================
// DynamoDB Client Setup
// ============================================================================

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
const tableName = process.env.VALIDATED_PROFESSIONS_TABLE || 'getquickresume-api-validated-professions-dev';

// ============================================================================
// Types
// ============================================================================

export interface CachedProfession {
  professionKey: string;      // Normalized key (lowercase, trimmed) - PRIMARY KEY
  originalProfession: string; // Original input for reference
  validatedAt: string;        // ISO timestamp
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Normalize a profession string to create a consistent cache key.
 * Converts to lowercase and trims whitespace.
 * 
 * Examples:
 * - "Software Engineer" -> "software engineer"
 * - "  Marketing Manager  " -> "marketing manager"
 * - "INGENIERO DE SOFTWARE" -> "ingeniero de software"
 */
export function normalizeKey(profession: string): string {
  return profession.toLowerCase().trim();
}

// ============================================================================
// Cache Operations
// ============================================================================

/**
 * Check if a profession exists in the cache (meaning it's valid).
 * 
 * @param profession - The profession string to check
 * @returns true if the profession is found in cache (valid), false otherwise
 */
export async function isValidProfessionCached(profession: string): Promise<boolean> {
  const professionKey = normalizeKey(profession);
  
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: { professionKey }
    });

    const result = await dynamodb.send(command);
    
    if (result.Item) {
      console.log('[ProfessionCache] Cache HIT:', { 
        professionKey, 
        originalProfession: result.Item.originalProfession,
        validatedAt: result.Item.validatedAt 
      });
      return true;
    }
    
    console.log('[ProfessionCache] Cache MISS:', { professionKey });
    return false;
  } catch (error) {
    console.error('[ProfessionCache] Error checking cache:', error);
    // On error, return false to allow AI validation as fallback
    return false;
  }
}

/**
 * Save a valid profession to the cache.
 * Should only be called after AI has confirmed the profession is valid.
 * 
 * @param profession - The validated profession string to cache
 */
export async function cacheValidProfession(profession: string): Promise<void> {
  const professionKey = normalizeKey(profession);
  const now = new Date().toISOString();
  
  try {
    const item: CachedProfession = {
      professionKey,
      originalProfession: profession.trim(),
      validatedAt: now
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: item
    });

    await dynamodb.send(command);
    
    console.log('[ProfessionCache] Cached valid profession:', { 
      professionKey, 
      originalProfession: item.originalProfession 
    });
  } catch (error) {
    console.error('[ProfessionCache] Error caching profession:', error);
    // Don't throw - caching failure should not break the validation flow
  }
}
