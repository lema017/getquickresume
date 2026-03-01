import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { trackUserRegistered } from '@/services/marketingAnalytics';
import { migratePublicDraft } from '@/utils/migratePublicDraft';
import toast from 'react-hot-toast';

export const useGoogleAuth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, setLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showResumeLimitModal, setShowResumeLimitModal] = useState(false);

  const handleGoogleLogin = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast.error(t('wizard.auth.googleTokenError'));
      return;
    }

    setIsLoading(true);
    setLoading(true);

    try {
      const response = await authService.loginWithGoogle(credentialResponse.credential);
      
      localStorage.setItem('auth-token', response.token);
      localStorage.setItem('user-data', JSON.stringify(response.user));
      
      if (response.user.createdAt) {
        const createdAt = new Date(response.user.createdAt).getTime();
        const now = Date.now();
        const isNewUser = (now - createdAt) < 30000;
        if (isNewUser) {
          trackUserRegistered('google');
        }
      }
      
      login(response.user);
      toast.success(t('wizard.auth.welcomeLogin'));
      
      const result = await migratePublicDraft(navigate);
      if (result === 'limit_reached') {
        setShowResumeLimitModal(true);
      } else if (result === 'no_draft') {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Error en login con Google:', error);
      toast.error(t('wizard.auth.googleLoginError'));
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleResumeLimitUpgrade = () => {
    setShowResumeLimitModal(false);
    navigate('/premium', { replace: true });
  };

  const handleResumeLimitContinue = () => {
    setShowResumeLimitModal(false);
    navigate('/wizard/manual/step-1', { replace: true });
  };

  const handleError = () => {
    toast.error(t('wizard.auth.googleConnectError'));
    setIsLoading(false);
    setLoading(false);
  };

  return {
    handleGoogleLogin,
    handleError,
    isLoading,
    showResumeLimitModal,
    setShowResumeLimitModal,
    handleResumeLimitUpgrade,
    handleResumeLimitContinue,
  };
};
