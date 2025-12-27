import { User } from '@/types';
import { handleAuthError } from '@/utils/authErrorHandler';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/dev';

export interface GoogleLoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async loginWithGoogle(googleToken: string): Promise<GoogleLoginResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la autenticación');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en authService.loginWithGoogle:', error);
      throw error;
    }
  },

  async loginWithLinkedIn(linkedInCode: string): Promise<GoogleLoginResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/linkedin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: linkedInCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la autenticación con LinkedIn');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en authService.loginWithLinkedIn:', error);
      throw error;
    }
  },

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If token is invalid (401/403), handle auth error and redirect
        if (response.status === 401 || response.status === 403) {
          handleAuthError();
          return false; // Return false since we're redirecting
        }
        throw new Error('Token inválido');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error en authService.validateToken:', error);
      throw error;
    }
  },


  async getUserFromToken(token: string): Promise<User | null> {
    try {
      // Primero validar el token
      const isValid = await this.validateToken(token);
      if (!isValid) {
        return null;
      }

      // Decode JWT to get isPremium (always up-to-date from backend)
      let jwtPayload: any = {};
      try {
        const base64Url = token.split('.')[1];
        if (!base64Url) {
          throw new Error('Invalid token format');
        }
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        jwtPayload = JSON.parse(jsonPayload);
        console.log('[AuthService] JWT decoded successfully, isPremium from JWT:', jwtPayload.isPremium);
      } catch (jwtError) {
        console.error('[AuthService] Error decoding JWT:', jwtError);
        // Continue with localStorage data if JWT decode fails
      }
      
      // Obtener información del usuario desde localStorage
      const userData = localStorage.getItem('user-data');
      if (userData) {
        const user = JSON.parse(userData);
        
        // Update isPremium from JWT token (always accurate)
        if (jwtPayload.isPremium !== undefined) {
          const oldPremium = user.isPremium;
          user.isPremium = jwtPayload.isPremium;
          
          // Update localStorage with fresh isPremium value
          localStorage.setItem('user-data', JSON.stringify(user));
          
          if (oldPremium !== user.isPremium) {
            console.log('[AuthService] Premium status updated:', {
              old: oldPremium,
              new: user.isPremium,
              fromJWT: jwtPayload.isPremium
            });
          }
        }
        
        console.log('[AuthService] getUserFromToken - User data:', {
          userId: user.id,
          email: user.email,
          isPremium: user.isPremium,
          isPremiumFromJWT: jwtPayload.isPremium
        });
        return user;
      }

      console.warn('[AuthService] getUserFromToken - No user data found in localStorage');
      return null;
    } catch (error) {
      console.error('Error getting user from token:', error);
      return null;
    }
  },

  async getCurrentUser(token: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/api/user/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token is invalid or forbidden, handle auth error
          handleAuthError();
          return null;
        }
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.user) {
        // Update localStorage with fresh user data
        localStorage.setItem('user-data', JSON.stringify(data.user));
        
        console.log('[AuthService] getCurrentUser - Fresh user data fetched:', {
          userId: data.user.id,
          email: data.user.email,
          isPremium: data.user.isPremium
        });
        
        return data.user;
      }

      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }
};
