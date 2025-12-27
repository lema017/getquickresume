import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Check, ArrowRight, Crown, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { checkoutService } from '@/services/checkoutService';
import toast from 'react-hot-toast';

export function PricingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'yearly' | null>(null);

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

    setLoadingPlan(planType);

    try {
      const checkoutUrl = await checkoutService.createCheckoutTransaction(planType);
      
      // Redirect to Paddle hosted checkout
      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || t('checkout.error'));
      setLoadingPlan(null);
    }
  };

  return (
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
              
              <button
                onClick={() => handleCheckout('monthly')}
                disabled={loadingPlan !== null}
                className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingPlan === 'monthly' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('checkout.processing')}
                  </>
                ) : (
                  <>
                <Crown className="w-4 h-4" />
                {t('landing.plans.monthly.cta')}
                  </>
                )}
              </button>
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
              
              <button
                onClick={() => handleCheckout('yearly')}
                disabled={loadingPlan !== null}
                className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-white text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingPlan === 'yearly' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('checkout.processing')}
                  </>
                ) : (
                  <>
                <Crown className="w-4 h-4" />
                {t('landing.plans.yearly.cta')}
                  </>
                )}
              </button>
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              {t('landing.cta.ctaPrimary')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/" 
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t('landing.cta.ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
