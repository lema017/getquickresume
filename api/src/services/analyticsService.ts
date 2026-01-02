import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

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
const tableName = process.env.RESUME_VIEWS_TABLE || 'getquickresume-api-resume-views-dev';

export interface ResumeView {
  shareToken: string;
  viewedAt: string; // ISO timestamp
  ipAddress?: string;
  userAgent?: string;
  device?: 'mobile' | 'desktop' | 'tablet';
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  referrer?: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueViews: number;
  viewsByDevice: {
    mobile: number;
    desktop: number;
    tablet: number;
    unknown: number;
  };
  viewsByBrowser: Record<string, number>;
  viewsByCountry: Record<string, number>;
  viewsByCity: Record<string, number>;
  viewsOverTime: Array<{
    date: string;
    count: number;
  }>;
}

export const recordView = async (view: ResumeView): Promise<void> => {
  try {
    const command = new PutCommand({
      TableName: tableName,
      Item: view,
    });

    await dynamodb.send(command);
  } catch (error) {
    console.error('Error recording view:', error);
    throw new Error('Failed to record view');
  }
};

export const getAnalytics = async (shareToken: string): Promise<AnalyticsSummary> => {
  try {
    console.log('[AnalyticsService] Getting analytics for shareToken:', shareToken);
    console.log('[AnalyticsService] Table name:', tableName);
    
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: 'shareToken = :shareToken',
      ExpressionAttributeValues: {
        ':shareToken': shareToken,
      },
      ScanIndexForward: false, // Most recent first
    });

    const result = await dynamodb.send(command);
    const views = (result.Items || []) as ResumeView[];
    
    console.log('[AnalyticsService] Found views:', views.length);

    // Calculate unique views (by IP address)
    const uniqueIPs = new Set(views.map(v => v.ipAddress).filter(Boolean));
    const uniqueViews = uniqueIPs.size;

    // Device breakdown
    const viewsByDevice = {
      mobile: views.filter(v => v.device === 'mobile').length,
      desktop: views.filter(v => v.device === 'desktop').length,
      tablet: views.filter(v => v.device === 'tablet').length,
      unknown: views.filter(v => !v.device).length,
    };

    // Browser breakdown
    const viewsByBrowser: Record<string, number> = {};
    views.forEach(view => {
      const browser = view.browser || 'Unknown';
      viewsByBrowser[browser] = (viewsByBrowser[browser] || 0) + 1;
    });

    // Country breakdown
    const viewsByCountry: Record<string, number> = {};
    views.forEach(view => {
      const country = view.country || 'Unknown';
      viewsByCountry[country] = (viewsByCountry[country] || 0) + 1;
    });

    // City breakdown
    const viewsByCity: Record<string, number> = {};
    views.forEach(view => {
      if (view.city) {
        viewsByCity[view.city] = (viewsByCity[view.city] || 0) + 1;
      }
    });

    // Views over time (group by date)
    const viewsByDate: Record<string, number> = {};
    views.forEach(view => {
      if (view.viewedAt) {
        const date = new Date(view.viewedAt).toISOString().split('T')[0];
        viewsByDate[date] = (viewsByDate[date] || 0) + 1;
      }
    });

    const viewsOverTime = Object.entries(viewsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const analytics: AnalyticsSummary = {
      totalViews: views.length,
      uniqueViews,
      viewsByDevice,
      viewsByBrowser,
      viewsByCountry,
      viewsByCity,
      viewsOverTime,
    };
    
    console.log('[AnalyticsService] Analytics summary:', JSON.stringify(analytics, null, 2));
    
    return analytics;
  } catch (error) {
    console.error('[AnalyticsService] Error getting analytics:', error);
    console.error('[AnalyticsService] Error details:', {
      message: (error as Error).message,
      name: (error as Error).name,
      stack: (error as Error).stack,
    });
    // Return empty analytics instead of throwing, so the UI can still display
    return {
      totalViews: 0,
      uniqueViews: 0,
      viewsByDevice: {
        mobile: 0,
        desktop: 0,
        tablet: 0,
        unknown: 0,
      },
      viewsByBrowser: {},
      viewsByCountry: {},
      viewsByCity: {},
      viewsOverTime: [],
    };
  }
};

// Interface for anonymized recent viewer data
export interface RecentViewer {
  id: string;           // Anonymized identifier (hashed from IP + timestamp)
  viewedAt: string;     // ISO timestamp
  device: 'mobile' | 'desktop' | 'tablet' | 'unknown';
  browser: string;
  os: string;
  country: string;
  city: string;
  referrer?: string;    // Domain only, sanitized for privacy
}

/**
 * Create an anonymized but consistent identifier from IP and timestamp
 * This ensures the same viewer gets the same ID without exposing their IP
 */
function anonymizeId(ip: string | undefined, timestamp: string): string {
  const base = `${ip || 'unknown'}-${timestamp}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    hash = ((hash << 5) - hash) + base.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `v${Math.abs(hash).toString(16).slice(0, 8)}`;
}

/**
 * Sanitize referrer URL to only return domain for privacy
 */
function sanitizeReferrer(referrer: string | undefined): string | undefined {
  if (!referrer) return undefined;
  try {
    const url = new URL(referrer);
    return url.hostname; // Only return domain, not full URL with params
  } catch {
    return undefined;
  }
}

/**
 * Get recent individual viewer records (anonymized)
 * @param shareToken - The resume's share token
 * @param limit - Maximum number of viewers to return (default: 10, max: 50)
 * @returns Array of anonymized recent viewer records
 */
export const getRecentViewers = async (
  shareToken: string,
  limit: number = 10
): Promise<RecentViewer[]> => {
  try {
    console.log('[AnalyticsService] Getting recent viewers for shareToken:', shareToken);
    
    const cappedLimit = Math.min(Math.max(limit, 1), 50); // Cap between 1 and 50
    
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: 'shareToken = :shareToken',
      ExpressionAttributeValues: {
        ':shareToken': shareToken,
      },
      ScanIndexForward: false, // Most recent first
      Limit: cappedLimit,
    });

    const result = await dynamodb.send(command);
    const views = (result.Items || []) as ResumeView[];
    
    console.log('[AnalyticsService] Found recent viewers:', views.length);

    // Transform to anonymized viewer records
    return views.map((view) => ({
      id: anonymizeId(view.ipAddress, view.viewedAt),
      viewedAt: view.viewedAt,
      device: view.device || 'unknown',
      browser: view.browser || 'Unknown',
      os: view.os || 'Unknown',
      country: view.country || 'Unknown',
      city: view.city || 'Unknown',
      referrer: sanitizeReferrer(view.referrer),
    }));
  } catch (error) {
    console.error('[AnalyticsService] Error getting recent viewers:', error);
    return [];
  }
};

// Helper function to parse user agent and extract device/browser info
export const parseUserAgent = (userAgent: string): { device: 'mobile' | 'desktop' | 'tablet'; browser: string; os: string } => {
  const ua = userAgent.toLowerCase();
  
  // Detect device
  let device: 'mobile' | 'desktop' | 'tablet' = 'desktop';
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    device = 'tablet';
  } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    device = 'mobile';
  }

  // Detect browser
  let browser = 'Unknown';
  if (ua.includes('chrome') && !ua.includes('edg')) {
    browser = 'Chrome';
  } else if (ua.includes('firefox')) {
    browser = 'Firefox';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'Safari';
  } else if (ua.includes('edg')) {
    browser = 'Edge';
  } else if (ua.includes('opera') || ua.includes('opr')) {
    browser = 'Opera';
  }

  // Detect OS
  let os = 'Unknown';
  if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('mac os') || ua.includes('macos')) {
    os = 'macOS';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
  }

  return { device, browser, os };
};

