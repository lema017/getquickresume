import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useAuthStore } from '@/stores/authStore';
import { Check, Crown, Loader2, ArrowDown, ChevronDown, ChevronUp, Lock, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { paypalService } from '@/services/paypalService';
import { 
  getPageSEO, 
  BASE_URL, 
  generateSoftwareApplicationSchema 
} from '@/utils/seoConfig';
import { trackUpgradeViewed } from '@/services/marketingAnalytics';

// PayPal SDK types
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: {
          layout?: 'vertical' | 'horizontal';
          color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
          shape?: 'rect' | 'pill';
          label?: 'paypal' | 'checkout' | 'buynow' | 'pay';
          height?: number;
        };
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError?: (err: Error) => void;
        onCancel?: () => void;
      }) => {
        render: (element: HTMLElement | string) => Promise<void>;
      };
    };
  }
}

// Get PayPal Client ID from environment
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

export function PremiumPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUserPremiumStatus } = useAuthStore();
  const lang = (i18n.language === 'es' ? 'es' : 'en') as 'en' | 'es';
  const seo = getPageSEO('premium', lang);
  const pageUrl = `${BASE_URL}/premium`;
  const softwareAppSchema = generateSoftwareApplicationSchema();
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'yearly' | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);
  const [showPayPalButtons, setShowPayPalButtons] = useState<'monthly' | 'yearly' | null>(null);
  
  // Refs for PayPal button containers
  const monthlyButtonRef = useRef<HTMLDivElement>(null);
  const yearlyButtonRef = useRef<HTMLDivElement>(null);
  const paypalButtonsRendered = useRef<{ monthly: boolean; yearly: boolean }>({ monthly: false, yearly: false });

  // Track upgrade page view
  useEffect(() => {
    trackUpgradeViewed('premium_page');
  }, []);

  // Load PayPal SDK
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) {
      console.warn('PayPal Client ID not configured');
      return;
    }

    // Check if PayPal SDK is already loaded
    if (window.paypal) {
      setPaypalReady(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setPaypalReady(true));
      return;
    }

    // Load PayPal SDK script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      console.log('PayPal SDK loaded');
      setPaypalReady(true);
    };
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      toast.error('Failed to load payment system');
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: Don't remove the script as other components might need it
    };
  }, []);

  // Render PayPal buttons when ready and selected
  useEffect(() => {
    if (!paypalReady || !window.paypal || !showPayPalButtons) return;
    if (!isAuthenticated || !user) return;

    const planType = showPayPalButtons;
    const buttonRef = planType === 'monthly' ? monthlyButtonRef : yearlyButtonRef;
    
    if (!buttonRef.current) return;
    if (paypalButtonsRendered.current[planType]) return;

    // Clear any existing buttons
    buttonRef.current.innerHTML = '';

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: planType === 'yearly' ? 'gold' : 'blue',
        shape: 'rect',
        label: 'pay',
        height: 45,
      },
      createOrder: async () => {
        try {
          setLoadingPlan(planType);
          const response = await paypalService.createOrder(planType);
          setLoadingPlan(null);
          return response.orderId;
        } catch (error) {
          setLoadingPlan(null);
          console.error('Error creating PayPal order:', error);
          toast.error(error instanceof Error ? error.message : 'Failed to create order');
          throw error;
        }
      },
      onApprove: async (data: { orderID: string }) => {
        try {
          setLoadingPlan(planType);
          const response = await paypalService.captureOrder(data.orderID);
          
          if (response.success) {
            toast.success('Payment successful! Welcome to Premium!');
            
            // Refresh user data to update premium status
            await refreshUserPremiumStatus();
            
            // Navigate to thank you page with payment details
            navigate('/thank-you', { 
              state: { 
                transactionId: response.transactionId,
                planType: response.planType,
                paymentConfirmed: true
              }
            });
          }
        } catch (error) {
          console.error('Error capturing PayPal order:', error);
          toast.error(error instanceof Error ? error.message : 'Payment failed');
        } finally {
          setLoadingPlan(null);
          setShowPayPalButtons(null);
        }
      },
      onError: (err: Error) => {
        console.error('PayPal error:', err);
        toast.error('Payment error occurred. Please try again.');
        setLoadingPlan(null);
      },
      onCancel: () => {
        toast.error('Payment cancelled');
        setLoadingPlan(null);
        setShowPayPalButtons(null);
      },
    }).render(buttonRef.current);

    paypalButtonsRendered.current[planType] = true;
  }, [paypalReady, showPayPalButtons, isAuthenticated, user, navigate, refreshUserPremiumStatus]);

  // Reset button render state when hiding
  useEffect(() => {
    if (!showPayPalButtons) {
      paypalButtonsRendered.current = { monthly: false, yearly: false };
    }
  }, [showPayPalButtons]);

  const handleCheckout = async (planType: 'monthly' | 'yearly') => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      toast.error(t('checkout.authenticationRequired'));
      navigate('/login', { state: { returnTo: '/premium' } });
      return;
    }

    // Check if user is already premium
    if (user.isPremium) {
      toast.error(t('checkout.alreadyPremium'));
      navigate('/dashboard');
      return;
    }

    // Check if PayPal is ready
    if (!paypalReady || !PAYPAL_CLIENT_ID) {
      toast.error('Payment system is not available. Please try again later.');
      return;
    }

    // Show PayPal buttons for this plan
    setShowPayPalButtons(planType);
  };

  const scrollToPlans = () => {
    document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const premiumFeatures = [
    {
      icon: 'brain',
      title: t('premium.features.aiEnhancement.title'),
      description: t('premium.features.aiEnhancement.description'),
    },
    {
      icon: 'award',
      title: t('premium.features.aiScoring.title'),
      description: t('premium.features.aiScoring.description'),
    },
    {
      icon: 'globe',
      title: t('premium.features.translation.title'),
      description: t('premium.features.translation.description'),
    },
    {
      icon: 'qr-code',
      title: t('premium.features.onlineResume.title'),
      description: t('premium.features.onlineResume.description'),
    },
    {
      icon: 'bar-chart-2',
      title: t('premium.features.analytics.title'),
      description: t('premium.features.analytics.description'),
    },
    {
      icon: 'target',
      title: t('premium.features.jobOptimizer.title'),
      description: t('premium.features.jobOptimizer.description'),
    },
  ];

  // If user is already premium, show different view
  if (user?.isPremium) {
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
          <meta property="og:type" content={seo.ogType || 'website'} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:site_name" content="GetQuickResume" />
          <meta property="og:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
          <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
          
          {/* Additional SEO meta tags */}
          <meta name="robots" content="index, follow" />
          <meta name="keywords" content={lang === 'es' 
            ? 'premium cv, cv ilimitado, mejoras ia, plantillas premium, soporte prioritario, creador cv premium'
            : 'premium resume, unlimited resumes, ai enhancements, premium templates, priority support, premium resume builder'
          } />
          
          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(softwareAppSchema)}
          </script>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium mb-8">
                <Crown className="w-5 h-5 mr-2" />
                {t('premium.premiumUser')}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                {t('premium.title')}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {t('premium.subtitle')}
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105"
              >
                Go to Dashboard
                <ArrowDown className="w-5 h-5 ml-2 rotate-[-90deg]" />
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

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
        <meta property="og:type" content={seo.ogType || 'website'} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={lang === 'es' 
          ? 'premium cv, cv ilimitado, mejoras ia, plantillas premium, soporte prioritario, creador cv premium'
          : 'premium resume, unlimited resumes, ai enhancements, premium templates, priority support, premium resume builder'
        } />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Simplified Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 lg:py-24">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Choose your plan and unlock all premium features
          </p>
          <button
            onClick={scrollToPlans}
            className="inline-flex items-center px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            View Plans
            <ArrowDown className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="plans-section" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 text-center">
            {t('landing.plans.comparisonTitle')}
          </h2>
          <p className="text-lg text-slate-500 text-center mb-12">
            {t('landing.plans.subtitle')}
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-8 px-6 text-sm font-medium text-slate-500 w-[28%]" />
                  <th className="py-8 px-5 text-center w-[24%]">
                    <div className="text-xl font-bold text-slate-900">{t('landing.plans.free.name')}</div>
                    <div className="text-slate-500 text-sm mt-1">{t('landing.plans.free.description')}</div>
                    <div className="mt-3">
                      <span className="text-3xl font-extrabold text-slate-900">{t('landing.plans.free.price')}</span>
                      <span className="text-slate-500 text-sm ml-1">/{t('landing.plans.free.period')}</span>
                    </div>
                  </th>
                  <th className="py-8 px-5 text-center w-[24%]">
                    <div className="text-xl font-bold text-slate-900">{t('landing.plans.monthly.name')}</div>
                    <div className="text-slate-500 text-sm mt-1">{t('landing.plans.monthly.description')}</div>
                    <div className="mt-3">
                      <span className="text-3xl font-extrabold text-blue-600">{t('landing.plans.monthly.price')}</span>
                      <span className="text-slate-500 text-sm ml-1">/{t('landing.plans.monthly.period')}</span>
                    </div>
                  </th>
                  <th className="py-8 px-5 text-center w-[24%] bg-blue-50/50">
                    <div className="inline-block bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg mb-3">
                      {t('landing.plans.yearly.badge')}
                    </div>
                    <div className="text-xl font-bold text-slate-900">{t('landing.plans.yearly.name')}</div>
                    <div className="text-slate-500 text-sm mt-1">{t('landing.plans.yearly.description')}</div>
                    <div className="mt-3">
                      <span className="text-3xl font-extrabold text-blue-600">{t('landing.plans.yearly.price')}</span>
                      <span className="text-slate-500 text-sm ml-1">/{t('landing.plans.yearly.period')}</span>
                    </div>
                    <div className="text-xs text-emerald-600 font-semibold mt-1">{t('landing.plans.yearly.savings')}</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(
                  t('landing.plans.comparisonFeatures', { returnObjects: true }) as Record<string, { name: string; free: string | boolean; premium: string | boolean }>
                ).map(([key, feature]) => (
                  <tr key={key} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-slate-700">{feature.name}</td>
                    <td className="py-4 px-5 text-center">
                      {feature.free === true ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : feature.free === false ? (
                        <Lock className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-sm font-semibold text-slate-700">{feature.free}</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-center">
                      {feature.premium === true ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : feature.premium === false ? (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-sm font-semibold text-blue-600">{feature.premium}</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-center bg-blue-50/30">
                      {feature.premium === true ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : feature.premium === false ? (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-sm font-semibold text-blue-600">{feature.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200">
                  <td className="py-6 px-6" />
                  <td className="py-6 px-5 text-center">
                    <Link
                      to={isAuthenticated ? '/dashboard' : '/login'}
                      className="inline-block px-6 py-2.5 rounded-lg font-semibold text-sm border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200"
                    >
                      {t('landing.plans.free.cta')}
                    </Link>
                  </td>
                  <td className="py-6 px-5 text-center">
                    {showPayPalButtons === 'monthly' ? (
                      <div>
                        <div ref={monthlyButtonRef} className="paypal-button-container min-h-[45px]" />
                        <button onClick={() => setShowPayPalButtons(null)} className="mt-2 text-sm text-slate-500 hover:text-slate-700">Cancel</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCheckout('monthly')}
                        disabled={loadingPlan !== null || !paypalReady}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingPlan === 'monthly' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
                        {t('landing.plans.monthly.cta')}
                      </button>
                    )}
                  </td>
                  <td className="py-6 px-5 text-center bg-blue-50/30">
                    {showPayPalButtons === 'yearly' ? (
                      <div>
                        <div ref={yearlyButtonRef} className="paypal-button-container min-h-[45px]" />
                        <button onClick={() => setShowPayPalButtons(null)} className="mt-2 text-sm text-slate-500 hover:text-slate-700">Cancel</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCheckout('yearly')}
                        disabled={loadingPlan !== null || !paypalReady}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingPlan === 'yearly' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
                        {t('landing.plans.yearly.cta')}
                      </button>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* Compact Premium Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-6"
          >
            <div className="text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {t('premium.featuresSection.title')}
          </h2>
              <p className="text-slate-600">
                {t('premium.featuresSection.subtitle')}
              </p>
            </div>
            {showFeatures ? (
              <ChevronUp className="w-6 h-6 text-slate-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-slate-600" />
            )}
          </button>

          {showFeatures && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumFeatures.map((feature, index) => (
              <div 
                key={index}
                  className="p-4 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Crown className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {feature.title}
                </h3>
                      <p className="text-sm text-slate-600">
                        {feature.description}
                </p>
              </div>
          </div>
        </div>
              ))}
          </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}
