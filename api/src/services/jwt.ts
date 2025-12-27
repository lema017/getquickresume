import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '24h'; // 24 horas

export interface JWTPayload {
  userId: string;
  email: string;
  isPremium: boolean;
  iat?: number;
  exp?: number;
}

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  try {
    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'getquickresume-api',
      audience: 'getquickresume-frontend'
    });
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Token generation failed');
  }
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'getquickresume-api',
      audience: 'getquickresume-frontend'
    }) as JWTPayload;
    
    return decoded;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    throw new Error('Invalid token');
  }
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};
