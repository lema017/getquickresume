import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useLinkedInAuth } from '@/hooks/useLinkedInAuth';
import { GoogleLogin } from '@react-oauth/google';
import { Facebook, Linkedin } from 'lucide-react';
import { SocialButton } from '@/components/SocialButton';
import toast from 'react-hot-toast';

// Google icon component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="20" height="20">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// LinkedIn icon component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="20" height="20">
    <path
      fill="#0077B5"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
);

export function LoginPage() {
  const { t } = useTranslation();
  const { login, setLoading } = useAuthStore();
  const { handleGoogleLogin, handleError, isLoading: googleLoading } = useGoogleAuth();
  const { handleLinkedInLogin, handleLinkedInCallback, isLoading: linkedInLoading } = useLinkedInAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // const from = location.state?.from?.pathname || '/dashboard';

  // Handle LinkedIn OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    console.log('Current URL:', window.location.href);
    console.log('URL params:', { code, state, error });
    console.log('Code verifier in localStorage:', localStorage.getItem('linkedin_code_verifier'));

    // Only process callback if we have LinkedIn OAuth parameters
    if (code && state) {
      console.log('Processing LinkedIn OAuth callback...');
      handleLinkedInCallback(code, state);
    } else if (error) {
      console.error('LinkedIn OAuth error:', error);
      toast.error('Error al autorizar con LinkedIn');
    }
    // If no LinkedIn parameters, do nothing (normal page load)
  }, []); // Remove handleLinkedInCallback from dependencies to prevent double execution

  // LinkedIn login is now handled by the PKCE hook

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'linkedin') => {
    if (provider === 'linkedin') {
      handleLinkedInLogin();
      return;
    }
    
    setIsLoading(true);
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock user data based on provider
      const mockUser = {
        id: '1',
        email: `user@${provider}.com`,
        firstName: 'Usuario',
        lastName: 'Demo',
        fullName: 'Usuario Demo',
        avatarUrl: `https://via.placeholder.com/150?text=${provider.charAt(0).toUpperCase()}`,
        location: 'Ciudad de México, México',
        linkedin: 'https://linkedin.com/in/demo',
        targetFunction: 'Desarrollador Full Stack',
        provider,
        isPremium: false,
        tokens: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      login(mockUser);
      toast.success('¡Bienvenido! Iniciando sesión...');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      toast.error(t('auth.error.generic'));
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const socialProviders = [
    {
      id: 'linkedin',
      name: t('auth.providers.linkedin'),
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      onClick: () => handleSocialLogin('linkedin'),
    },
    {
      id: 'facebook',
      name: t('auth.providers.facebook'),
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => handleSocialLogin('facebook'),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('auth.title')}
        </h1>
        <p className="text-gray-600">
          {t('auth.subtitle')}
        </p>
      </div>

      <div className="space-y-3">
        {/* Google Login Button - using GoogleLogin component */}
        <div className="w-full">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleError}
            useOneTap={false}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="100%"
            auto_select={false}
            cancel_on_tap_outside={false}
          />
        </div>

        {/* LinkedIn Login Button - same visual standard */}
        <SocialButton
          label={t('auth.providers.linkedin')}
          icon={LinkedInIcon}
          onClick={() => handleSocialLogin('linkedin')}
          colorClass="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700"
          disabled={isLoading || linkedInLoading}
          dataTestId="btn-linkedin-login"
        />
      </div>

      {(isLoading || googleLoading || linkedInLoading) && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>{t('auth.loading')}</span>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Al continuar, aceptas nuestros{' '}
          <a href="/legal/terms" className="text-primary hover:underline">
            Términos de Servicio
          </a>{' '}
          y{' '}
          <a href="/legal/privacy" className="text-primary hover:underline">
            Política de Privacidad
          </a>
        </p>
      </div>
    </div>
  );
}
