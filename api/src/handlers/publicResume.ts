import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getResumeByShareToken } from '../services/resumeService';
import { recordView, parseUserAgent, ResumeView } from '../services/analyticsService';

// Get client IP address from event
const getClientIP = (event: APIGatewayProxyEvent): string => {
  return (
    event.requestContext.identity.sourceIp ||
    event.headers['x-forwarded-for']?.split(',')[0] ||
    event.headers['X-Forwarded-For']?.split(',')[0] ||
    'unknown'
  );
};

// Get user agent from event
const getUserAgent = (event: APIGatewayProxyEvent): string => {
  return (
    event.headers['user-agent'] ||
    event.headers['User-Agent'] ||
    'unknown'
  );
};

// Get referrer from event
const getReferrer = (event: APIGatewayProxyEvent): string | undefined => {
  return (
    event.headers['referer'] ||
    event.headers['referrer'] ||
    event.headers['Referer'] ||
    event.headers['Referrer'] ||
    undefined
  );
};

// IP API response type
interface IpApiResponse {
  status: 'success' | 'fail';
  country?: string;
  city?: string;
}

// IP geolocation using ip-api.com (free, no API key, 45 req/min limit)
const getLocationFromIP = async (ip: string): Promise<{ country?: string; city?: string }> => {
  // Skip geolocation for localhost/private IPs
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return {};
  }

  try {
    // Using ip-api.com (free, no API key, 45 req/min limit)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`);
    if (!response.ok) return {};
    
    const data = await response.json() as IpApiResponse;
    if (data.status === 'success') {
      return {
        country: data.country,
        city: data.city
      };
    }
    return {};
  } catch (error) {
    console.error('Geolocation lookup failed:', error);
    return {};
  }
};

export const getPublicResume = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const shareToken = event.pathParameters?.shareToken;

    if (!shareToken) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Share token is required'
        })
      };
    }

    // Get resume by share token
    const resume = await getResumeByShareToken(shareToken);

    if (!resume) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume not found or not publicly shared'
        })
      };
    }

    // Record view asynchronously (don't wait for it)
    const ipAddress = getClientIP(event);
    const userAgent = getUserAgent(event);
    const referrer = getReferrer(event);
    const { device, browser, os } = parseUserAgent(userAgent);
    
    // Get location (async, but don't block response)
    const location = await getLocationFromIP(ipAddress);

    const view: ResumeView = {
      shareToken,
      viewedAt: new Date().toISOString(),
      ipAddress,
      userAgent,
      device,
      browser,
      os,
      country: location.country,
      city: location.city,
      referrer,
    };

    // Record view (fire and forget)
    recordView(view).catch(err => {
      console.error('Error recording view:', err);
      // Don't fail the request if analytics recording fails
    });

    // Return resume data (without sensitive information)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        data: {
          id: resume.id,
          title: resume.title,
          resumeData: resume.resumeData,
          generatedResume: resume.generatedResume,
          status: resume.status,
          createdAt: resume.createdAt,
          updatedAt: resume.updatedAt,
        }
      })
    };
  } catch (error) {
    console.error('Error getting public resume:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};

export const recordPublicView = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const shareToken = event.pathParameters?.shareToken;

    if (!shareToken) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Share token is required'
        })
      };
    }

    // Verify resume exists and is publicly shared
    const resume = await getResumeByShareToken(shareToken);
    if (!resume) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Resume not found or not publicly shared'
        })
      };
    }

    // Get view data from request body or headers
    const ipAddress = getClientIP(event);
    const userAgent = getUserAgent(event);
    const referrer = getReferrer(event);
    const { device, browser, os } = parseUserAgent(userAgent);
    
    // Get location
    const location = await getLocationFromIP(ipAddress);

    const view: ResumeView = {
      shareToken,
      viewedAt: new Date().toISOString(),
      ipAddress,
      userAgent,
      device,
      browser,
      os,
      country: location.country,
      city: location.city,
      referrer,
    };

    await recordView(view);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'View recorded'
      })
    };
  } catch (error) {
    console.error('Error recording view:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};

