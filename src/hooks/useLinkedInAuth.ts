import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';

// Generate a random state for CSRF protection
const generateState = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const useLinkedInAuth = () => {
  const navigate = useNavigate();
  const { login, setLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkedInLogin = useCallback(async () => {
    setIsLoading(true);
    setLoading(true);

    try {
      // LinkedIn OAuth URL construction with CSRF protection
      const clientId = (import.meta as any).env.VITE_LINKEDIN_CLIENT_ID;
      const redirectUri = (import.meta as any).env.VITE_LINKEDIN_REDIRECT_URI || 'http://localhost:3000/login';
      const scope = 'openid profile email';
      const state = generateState();
      
      // Store state for verification on callback
      localStorage.setItem('linkedin_oauth_state', state);
      
      if (!clientId) {
        throw new Error('LinkedIn Client ID not configured');
      }
      
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;
      
      console.log('LinkedIn OAuth URL:', linkedInAuthUrl);
      console.log('Redirect URI:', redirectUri);
      
      // Redirect to LinkedIn OAuth
      window.location.href = linkedInAuthUrl;
    } catch (error) {
      console.error('Error initiating LinkedIn OAuth:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con LinkedIn';
      toast.error(errorMessage);
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading]);

  const handleLinkedInCallback = useCallback(async (code: string, state: string) => {
    setIsLoading(true);
    setLoading(true);

    try {
      // Verify state parameter for CSRF protection
      const storedState = localStorage.getItem('linkedin_oauth_state');
      if (!storedState || storedState !== state) {
        throw new Error('Invalid state parameter. Possible CSRF attack.');
      }
      
      // Clear the stored state
      localStorage.removeItem('linkedin_oauth_state');
      
      // Send authorization code to backend - backend will handle token exchange
      const response = await authService.loginWithLinkedIn(code);
      
      // Save user and token to store
      login(response.user);
      localStorage.setItem('auth-token', response.token);

      toast.success('¡Bienvenido! Iniciando sesión con LinkedIn...');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error en login con LinkedIn:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión con LinkedIn';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [login, navigate, setLoading]);

  return {
    handleLinkedInLogin,
    handleLinkedInCallback,
    isLoading,
  };
};
