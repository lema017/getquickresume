import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight, Crown, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { getPageSEO, generateFAQSchema, commonFAQs, BASE_URL } from '@/utils/seoConfig';
import { paypalService } from '@/services/paypalService';

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

export function PricingPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('pricing', lang);
  const faqSchema = generateFAQSchema(commonFAQs[lang]);
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUserPremiumStatus } = useAuthStore();
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'yearly' | null>(null);
  const [paypalReady, setPaypalReady] = useState(false);
  const [showPayPalButtons, setShowPayPalButtons] = useState<'monthly' | 'yearly' | null>(null);

  // Refs for PayPal button containers
  const monthlyButtonRef = useRef<HTMLDivElement>(null);
  const yearlyButtonRef = useRef<HTMLDivElement>(null);
  const paypalButtonsRendered = useRef<{ monthly: boolean; yearly: boolean }>({ monthly: false, yearly: false });

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
      navigate('/login', { state: { returnTo: '/pricing' } });
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

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${BASE_URL}/pricing`} />
        
        {/* hreflang */}
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/pricing`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/pricing?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/pricing`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`${BASE_URL}/pricing`} />
        <meta property="og:site_name" content="GetQuickResume" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        
        {/* Product structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "GetQuickResume Premium",
            "description": "AI-powered resume builder with unlimited templates and features",
            "brand": {
              "@type": "Brand",
              "name": "GetQuickResume"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Free Plan",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Premium Monthly",
                "price": "15",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Premium Yearly",
                "price": "126",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            {t('landing.plans.title')}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('landing.plans.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="relative p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-lg flex flex-col h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t('landing.plans.free.name')}
              </h3>
              <div className="mb-6">
                <p className="text-5xl font-extrabold text-slate-900 mb-2">
                  {t('landing.plans.free.price')}
                </p>
                <p className="text-sm text-slate-500">
                  {t('landing.plans.free.period')}
                </p>
              </div>
              
              <ul className="space-y-4 flex-grow mb-8">
                {(t('landing.plans.free.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/login"
                className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-slate-900 text-white hover:bg-slate-800"
              >
                {t('landing.plans.free.cta')}
              </Link>
            </div>

            {/* Premium Monthly */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl flex flex-col h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t('landing.plans.monthly.name')}
              </h3>
              <div className="mb-6">
                <p className="text-5xl font-extrabold text-blue-600 mb-2">
                  {t('landing.plans.monthly.price')}
                  <span className="text-2xl">/{t('landing.plans.monthly.period')}</span>
                </p>
              </div>
              
              <ul className="space-y-4 flex-grow mb-8">
                {(t('landing.plans.monthly.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {showPayPalButtons === 'monthly' ? (
                <div className="mt-auto">
                  <div 
                    ref={monthlyButtonRef}
                    className="paypal-button-container min-h-[45px]"
                  />
                  <button
                    onClick={() => setShowPayPalButtons(null)}
                    className="w-full mt-3 py-2 text-sm text-slate-600 text-center opacity-70 hover:opacity-100 transition-opacity"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleCheckout('monthly')}
                  disabled={loadingPlan !== null || !paypalReady}
                  className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPlan === 'monthly' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('checkout.processing')}
                    </>
                  ) : !paypalReady ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      {t('landing.plans.monthly.cta')}
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Premium Yearly - Best Value */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl transform scale-105 border-4 border-amber-400 flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                {t('landing.plans.yearly.badge')}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('landing.plans.yearly.name')}
              </h3>
              <div className="mb-6">
                <p className="text-5xl font-extrabold text-white mb-2">
                  {t('landing.plans.yearly.price')}
                  <span className="text-2xl">/{t('landing.plans.yearly.period')}</span>
                </p>
                <p className="text-sm text-blue-100">
                  {t('landing.plans.yearly.savings')}
                </p>
              </div>
              
              <ul className="space-y-4 flex-grow mb-8">
                {(t('landing.plans.yearly.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {showPayPalButtons === 'yearly' ? (
                <div className="mt-auto">
                  <div 
                    ref={yearlyButtonRef}
                    className="paypal-button-container min-h-[45px]"
                  />
                  <button
                    onClick={() => setShowPayPalButtons(null)}
                    className="w-full mt-3 py-2 text-sm text-blue-100 text-center opacity-70 hover:opacity-100 transition-opacity"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleCheckout('yearly')}
                  disabled={loadingPlan !== null || !paypalReady}
                  className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-white text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPlan === 'yearly' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('checkout.processing')}
                    </>
                  ) : !paypalReady ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      {t('landing.plans.yearly.cta')}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">
            {t('landing.faq.title')}
          </h2>
          
          <div className="space-y-6">
            {(t('landing.faq.items', { returnObjects: true }) as unknown as { question: string; answer: string }[]).map((item, index) => (
              <div key={index} className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-4">
            {t('landing.cta.subtitle')}
          </p>
          <p className="text-lg text-slate-300 mb-8">
            {t('landing.cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-center leading-snug"
            >
              <span>{t('landing.cta.ctaPrimary')}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </Link>
            
            <Link 
              to="/" 
              className="w-full sm:w-auto px-6 sm:px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-center leading-snug"
            >
              <span>{t('landing.cta.ctaSecondary')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
