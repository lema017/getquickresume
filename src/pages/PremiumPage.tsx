import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Check, Crown, Loader2, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import { checkoutService } from '@/services/checkoutService';
import toast from 'react-hot-toast';

// Declare Paddle types for TypeScript
declare global {
  interface Window {
    Paddle?: {
      Environment: {
        set: (env: 'sandbox' | 'production') => void;
      };
      Initialize: (options: { token: string }) => void;
      Checkout: {
        open: (options: {
          transactionId: string;
          settings?: {
            displayMode?: 'overlay' | 'inline';
            theme?: 'light' | 'dark';
            locale?: string;
            successUrl?: string;
          };
        }) => void;
      };
    };
  }
}

// Paddle client token (from environment variables)
const PADDLE_CLIENT_TOKEN = import.meta.env.VITE_PADDLE_CLIENT_TOKEN || '';
const PADDLE_ENVIRONMENT = import.meta.env.VITE_PADDLE_ENVIRONMENT || 'sandbox';

export function PremiumPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUser } = useAuthStore();
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'yearly' | null>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [paddleReady, setPaddleReady] = useState(false);

  // Initialize Paddle.js on mount
  useEffect(() => {
    const initPaddle = () => {
      if (window.Paddle) {
        try {
          // Set environment (sandbox or production)
          window.Paddle.Environment.set(PADDLE_ENVIRONMENT as 'sandbox' | 'production');
          
          // Initialize with client token
          window.Paddle.Initialize({
            token: PADDLE_CLIENT_TOKEN,
          });
          
          setPaddleReady(true);
          console.log('Paddle.js initialized successfully');
        } catch (error) {
          console.error('Error initializing Paddle:', error);
        }
      }
    };

    // Check if Paddle is already loaded
    if (window.Paddle) {
      initPaddle();
    } else {
      // Wait for Paddle to load
      const checkPaddle = setInterval(() => {
        if (window.Paddle) {
          clearInterval(checkPaddle);
          initPaddle();
        }
      }, 100);

      // Cleanup
      return () => clearInterval(checkPaddle);
    }
  }, []);

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

    // Check if Paddle is ready
    if (!paddleReady || !window.Paddle) {
      toast.error('Payment system is loading. Please try again.');
      return;
    }

    setLoadingPlan(planType);

    try {
      // Create transaction on backend
      const { transactionId } = await checkoutService.createCheckoutTransaction(planType);
      
      console.log('Opening Paddle checkout for transaction:', transactionId);

      // Open Paddle overlay checkout
      window.Paddle.Checkout.open({
        transactionId: transactionId,
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          successUrl: `${window.location.origin}/thank-you?transaction_id=${transactionId}`,
        },
      });

      // Reset loading state after opening (overlay handles the rest)
      setLoadingPlan(null);
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || t('checkout.error'));
      setLoadingPlan(null);
    }
  };

  const scrollToPlans = () => {
    document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const subscriptionPlans = [
    {
      id: 'monthly',
      name: t('landing.plans.monthly.name'),
      price: t('landing.plans.monthly.price'),
      period: t('landing.plans.monthly.period'),
      features: t('landing.plans.monthly.features', { returnObjects: true }) as unknown as string[],
      highlight: false,
    },
    {
      id: 'yearly',
      name: t('landing.plans.yearly.name'),
      price: t('landing.plans.yearly.price'),
      period: t('landing.plans.yearly.period'),
      savings: t('landing.plans.yearly.savings'),
      badge: t('landing.plans.yearly.badge'),
      features: t('landing.plans.yearly.features', { returnObjects: true }) as unknown as string[],
      highlight: true,
    },
  ];

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
      title: 'Traducción Multi-idioma',
      description: 'Traduce tu CV a los 10 idiomas más usados del mundo',
    },
    {
      icon: 'qr-code',
      title: 'Compartir con QR',
      description: 'Comparte tu CV con código QR y analiza quién lo ve',
    },
    {
      icon: 'bar-chart-2',
      title: 'Analíticas Avanzadas',
      description: 'Estadísticas de visualización, dispositivos y ubicaciones',
    },
    {
      icon: 'target',
      title: 'Optimización ATS',
      description: 'Optimiza tu CV para sistemas de seguimiento de candidatos',
    },
  ];

  // If user is already premium, show different view
  if (user?.isPremium) {
  return (
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
    );
  }

  return (
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

      {/* Subscription Plans - Moved to TOP */}
      <section id="plans-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Select the plan that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subscriptionPlans.map((plan) => {
              const isYearly = plan.id === 'yearly';
              
              return (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-3xl shadow-xl flex flex-col h-full ${
                    isYearly
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white transform scale-105 border-4 border-amber-400'
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200'
                  }`}
                >
                  {isYearly && plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {plan.badge}
                    </div>
                  )}
                  
                  <h3 className={`text-2xl font-bold mb-4 ${isYearly ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <p className={`text-5xl font-extrabold mb-2 ${
                      isYearly ? 'text-white' : 'text-blue-600'
                    }`}>
                      {plan.price}
                      <span className="text-2xl">/{plan.period}</span>
                    </p>
                    {isYearly && plan.savings && (
                      <p className="text-sm text-blue-100 mt-1">
                        {plan.savings}
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 flex-grow mb-8">
                    {plan.features.slice(0, 5).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                          isYearly ? 'text-amber-400' : 'text-blue-600'
                        }`} />
                        <span className={isYearly ? 'text-blue-100' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleCheckout(plan.id as 'monthly' | 'yearly')}
                    disabled={loadingPlan !== null || !paddleReady}
                    className={`mt-auto w-full py-4 rounded-lg font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isYearly
                          ? 'bg-white text-blue-700 hover:bg-blue-50'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                    {loadingPlan === plan.id ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t('checkout.processing')}
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5" />
                        Upgrade Now
                      </>
                  )}
                  </button>
                </div>
              );
            })}
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
                All Premium Features
          </h2>
              <p className="text-slate-600">
                See everything you get with Premium
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
  );
}
