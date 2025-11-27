import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { checkRateLimit } from '../middleware/rateLimiter';
import { templateService, CreateTemplateData } from '../services/templateService';

export const listTemplates = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Auth check via custom authorizer
    const userId = (event as any)?.requestContext?.authorizer?.userId;
    if (!userId) {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'Unauthorized' }),
      };
    }

    // Rate limit per user/min (default 60 rpm)
    const rl = await checkRateLimit(userId, 'list-templates', 60, 60000);
    if (!rl.allowed) {
      return {
        statusCode: 429,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'Rate limit exceeded', resetTime: rl.resetTime }),
      };
    }

    // Fetch templates metadata and code strings from S3
    const items = await templateService.listAll();
    const templates = await Promise.all(
      items.map(async (t) => ({
        id: t.id,
        name: t.name || 'Template',
        description: t.description,
        category: t.category,
        tagName: t.tagName || t.id, // Use tagName from DB or fallback to id
        jsCode: await templateService.getCode(t.s3Key),
        s3Key: t.s3Key,
        hash: t.hash,
      }))
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify({ templates }),
    };
  } catch (error: any) {
    console.error('Error listing templates:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
      body: JSON.stringify({ success: false, error: 'Internal server error' }),
    };
  }
};

export const createTemplate = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Endpoint público (sin autenticación) para uso local
    // Rate limit opcional - más permisivo para uso local
    const clientId = event.requestContext?.requestId || 'local';
    const rl = await checkRateLimit(clientId, 'create-template', 30, 60000);
    if (!rl.allowed) {
      return {
        statusCode: 429,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'Rate limit exceeded', resetTime: rl.resetTime }),
      };
    }

    // Parsear body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'Request body is required' }),
      };
    }

    let body: any;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'Invalid JSON in request body' }),
      };
    }

    // Validar campos requeridos
    const requiredFields = ['id', 'name', 'category', 'tagName', 'jsCode'];
    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        }),
      };
    }

    // Validar category
    if (body.category !== 'free' && body.category !== 'premium') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'Category must be "free" or "premium"' }),
      };
    }

    // Validar tagName (formato de custom element)
    const tagNamePattern = /^[a-z][a-z0-9]*-[a-z0-9-]+$/;
    if (!tagNamePattern.test(body.tagName)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'tagName must be a valid custom element name (kebab-case with at least one hyphen)' 
        }),
      };
    }

    // Validar jsCode
    if (typeof body.jsCode !== 'string' || body.jsCode.trim().length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'jsCode must be a non-empty string' }),
      };
    }

    // Validar tamaño máximo (500KB)
    const maxSize = 500 * 1024; // 500KB
    if (body.jsCode.length > maxSize) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: `jsCode exceeds maximum size of ${maxSize} bytes` }),
      };
    }

    // Validar que el código contenga customElements.define
    if (!body.jsCode.includes('customElements.define')) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'jsCode must contain customElements.define' }),
      };
    }

    // Validar código malicioso (eval, Function constructor)
    if (/\beval\s*\(/i.test(body.jsCode) || /new\s+Function\s*\(/i.test(body.jsCode)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: 'jsCode contains potentially unsafe code (eval, Function constructor)' }),
      };
    }

    // Crear template
    const templateData: CreateTemplateData = {
      id: body.id.trim(),
      name: body.name.trim(),
      description: body.description?.trim(),
      category: body.category,
      tagName: body.tagName.trim(),
      jsCode: body.jsCode,
      hash: body.hash,
    };

    const template = await templateService.createTemplate(templateData);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        data: {
          id: template.id,
          name: template.name,
          description: template.description,
          category: template.category,
          tagName: template.tagName,
          s3Key: template.s3Key,
          createdAt: new Date().toISOString(),
        },
        message: 'Template created successfully',
      }),
    };
  } catch (error: any) {
    console.error('Error creating template:', error);
    
    // Manejar errores específicos
    if (error.message?.includes('already exists')) {
      return {
        statusCode: 409,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }

    // Manejar error de bucket S3 no encontrado
    if (error.Code === 'NoSuchBucket' || error.message?.includes('NoSuchBucket') || error.message?.includes('does not exist')) {
      const bucketName = error.BucketName || process.env.TEMPLATES_BUCKET || 'unknown';
      return {
        statusCode: 503,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ 
          success: false, 
          error: `S3 bucket "${bucketName}" does not exist. Please create the bucket or configure TEMPLATES_BUCKET environment variable.` 
        }),
      };
    }

    // Manejar error de configuración de bucket
    if (error.message?.includes('TEMPLATES_BUCKET is not configured')) {
      return {
        statusCode: 503,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'TEMPLATES_BUCKET is not configured. Please set the TEMPLATES_BUCKET environment variable.' 
        }),
      };
    }

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
};


