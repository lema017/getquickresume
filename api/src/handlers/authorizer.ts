import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { verifyToken } from '../services/jwt';

export const authorize = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  try {
    console.log('Authorizer called with event:', JSON.stringify(event, null, 2));
    
    // Extract token from Authorization header
    const token = event.authorizationToken;
    
    if (!token) {
      console.log('No authorization token provided');
      return generatePolicy('user', 'Deny', event.methodArn);
    }
    
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    
    if (!cleanToken) {
      console.log('No token found after Bearer prefix');
      return generatePolicy('user', 'Deny', event.methodArn);
    }
    
    try {
      // Validate JWT token (this checks issuer, audience, expiration, and signature)
      const decoded = verifyToken(cleanToken);
      
      console.log('Token validated successfully for user:', decoded.userId);
      
      // Generate IAM policy with context
      return generatePolicy(decoded.userId, 'Allow', event.methodArn, {
        userId: decoded.userId,
        email: decoded.email
      });
      
    } catch (jwtError) {
      console.error('JWT validation failed:', jwtError);
      return generatePolicy('user', 'Deny', event.methodArn);
    }
    
  } catch (error) {
    console.error('Authorizer error:', error);
    return generatePolicy('user', 'Deny', event.methodArn);
  }
};

function generatePolicy(
  principalId: string, 
  effect: 'Allow' | 'Deny', 
  resource: string, 
  context?: { userId: string; email: string }
): APIGatewayAuthorizerResult {
  const policy: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  };
  
  // Add context if provided (for successful authorization)
  if (context && effect === 'Allow') {
    policy.context = {
      userId: context.userId,
      email: context.email
    };
  }
  
  return policy;
}
