import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useAuthStore } from '@/stores/authStore';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { GoogleLogin } from '@react-oauth/google';
import { Facebook, Crown, ArrowRight, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPageSEO, BASE_URL } from '@/utils/seoConfig';

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
  const { t, i18n } = useTranslation();
  const { login, setLoading } = useAuthStore();
  const {
    handleGoogleLogin,
    handleError,
    isLoading: googleLoading,
    showResumeLimitModal,
    setShowResumeLimitModal,
    handleResumeLimitUpgrade,
    handleResumeLimitContinue,
  } = useGoogleAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const lang = (i18n.language === 'es' ? 'es' : 'en') as 'en' | 'es';
  const seo = getPageSEO('login', lang);
  const pageUrl = `${BASE_URL}/login`;

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
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={pageUrl} />
        
        {/* hreflang for internationalization */}
        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="es" href={`${pageUrl}?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={`${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${BASE_URL}/images/og-default.png`} />
        
        {/* Robots - noIndex for login page */}
        <meta name="robots" content={seo.noIndex ? 'noindex, nofollow' : 'index, follow'} />
      </Helmet>
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

      {/* Resume Limit Choice Modal */}
      {showResumeLimitModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowResumeLimitModal(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border-t-4 border-t-amber-500">
            <div className="p-6">
              <div className="bg-amber-50 rounded-2xl p-6 mb-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
                  <Crown className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('premiumModal.resumeLimit.headline')}
                </h2>
                <p className="text-gray-600">
                  {t('premiumModal.resumeLimit.subheadline')}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-gray-700">{t('premiumModal.resumeLimit.benefit1')}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-gray-700">{t('premiumModal.resumeLimit.benefit2')}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleResumeLimitContinue}
                  className="flex-1 px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {t('premiumModal.resumeLimit.continueLocal')}
                </button>
                <button
                  onClick={handleResumeLimitUpgrade}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {t('premiumModal.resumeLimit.cta')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
