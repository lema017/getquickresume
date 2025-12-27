import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { GoogleLogin } from '@react-oauth/google';
import { Facebook } from 'lucide-react';
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

export function LoginPage() {
  const { t } = useTranslation();
  const { login, setLoading } = useAuthStore();
  const { handleGoogleLogin, handleError, isLoading: googleLoading } = useGoogleAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
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
        <div className="w-full flex justify-center">
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
      </div>

      {(isLoading || googleLoading) && (
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
