import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { trackUserRegistered } from '@/services/marketingAnalytics';
import { migratePublicDraft } from '@/utils/migratePublicDraft';
import toast from 'react-hot-toast';

const generateState = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const useLinkedInAuth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, setLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showResumeLimitModal, setShowResumeLimitModal] = useState(false);

  const handleLinkedInLogin = useCallback(async () => {
    setIsLoading(true);
    setLoading(true);

    try {
      const clientId = (import.meta as any).env.VITE_LINKEDIN_CLIENT_ID;
      const redirectUri = (import.meta as any).env.VITE_LINKEDIN_REDIRECT_URI || 'http://localhost:3000/login';
      const scope = 'openid profile email';
      const state = generateState();
      
      localStorage.setItem('linkedin_oauth_state', state);
      
      if (!clientId) {
        throw new Error('LinkedIn Client ID not configured');
      }
      
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;
      
      window.location.href = linkedInAuthUrl;
    } catch (error) {
      console.error('Error initiating LinkedIn OAuth:', error);
      const errorMessage = error instanceof Error ? error.message : t('wizard.auth.linkedInLoginError');
      toast.error(errorMessage);
      setIsLoading(false);
      setLoading(false);
    }
  }, [setLoading, t]);

  const handleLinkedInCallback = useCallback(async (code: string, state: string) => {
    setIsLoading(true);
    setLoading(true);

    try {
      const storedState = localStorage.getItem('linkedin_oauth_state');
      if (!storedState || storedState !== state) {
        throw new Error('Invalid state parameter. Possible CSRF attack.');
      }
      
      localStorage.removeItem('linkedin_oauth_state');
      
      const response = await authService.loginWithLinkedIn(code);
      
      login(response.user);
      localStorage.setItem('auth-token', response.token);

      if (response.user.createdAt) {
        const createdAt = new Date(response.user.createdAt).getTime();
        const now = Date.now();
        const isNewUser = (now - createdAt) < 30000;
        if (isNewUser) {
          trackUserRegistered('linkedin');
        }
      }

      toast.success(t('wizard.auth.welcomeLoginLinkedIn'));
      const result = await migratePublicDraft(navigate);
      if (result === 'limit_reached') {
        setShowResumeLimitModal(true);
      } else if (result === 'no_draft') {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Error en login con LinkedIn:', error);
      const errorMessage = error instanceof Error ? error.message : t('wizard.auth.linkedInLoginError');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }, [login, navigate, setLoading, t]);

  const handleResumeLimitUpgrade = useCallback(() => {
    setShowResumeLimitModal(false);
    navigate('/premium', { replace: true });
  }, [navigate]);

  const handleResumeLimitContinue = useCallback(() => {
    setShowResumeLimitModal(false);
    navigate('/wizard/manual/step-1', { replace: true });
  }, [navigate]);

  return {
    handleLinkedInLogin,
    handleLinkedInCallback,
    isLoading,
    showResumeLimitModal,
    setShowResumeLimitModal,
    handleResumeLimitUpgrade,
    handleResumeLimitContinue,
  };
};
