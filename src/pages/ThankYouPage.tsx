import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Check, Crown, ArrowRight, Loader2 } from 'lucide-react';

export function ThankYouPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUserPremiumStatus } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  
  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: '/thank-you' } });
      return;
    }

    // Check if user is premium (webhook should have processed by now)
    // Poll for premium status with timeout
    const checkPremiumStatus = async () => {
      const maxAttempts = 10; // 10 attempts
      const delayMs = 2000; // 2 seconds between attempts
      let attempts = 0;

      const pollStatus = async (): Promise<boolean> => {
        // Refresh user data from backend
        await refreshUserPremiumStatus();
        
        // Get updated user from store (Zustand updates are synchronous)
        const currentUser = useAuthStore.getState().user;
        if (currentUser?.isPremium) {
          return true;
        }
        
        attempts++;
        return false;
      };

      // Initial wait for webhook processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Poll until premium status is confirmed or max attempts reached
      while (attempts < maxAttempts) {
        const isPremiumNow = await pollStatus();
        if (isPremiumNow) {
          setIsPremium(true);
          setIsVerifying(false);
          return;
        }
        
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }

      // If we've exhausted attempts, check one more time and show result
      await refreshUserPremiumStatus();
      const finalUser = useAuthStore.getState().user;
      setIsPremium(finalUser?.isPremium ?? false);
      setIsVerifying(false);
    };

    checkPremiumStatus();
  }, [isAuthenticated, navigate, refreshUserPremiumStatus]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isVerifying ? (
            <>
              <Loader2 className="w-16 h-16 text-white mx-auto mb-6 animate-spin" />
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                {t('thankYou.verifying')}
              </h1>
              <p className="text-xl text-blue-100">
                {t('thankYou.verifyingMessage')}
              </p>
            </>
          ) : (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                  <Check className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                {t('thankYou.title')}
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                {t('thankYou.subtitle')}
              </p>
              {transactionId && (
                <p className="text-sm text-blue-200">
                  {t('thankYou.transactionId')}: {transactionId}
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Content Section */}
      {!isVerifying && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
              {isPremium ? (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
                      <Crown className="w-5 h-5" />
                      <span className="font-semibold">{t('thankYou.premiumActive')}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      {t('thankYou.welcomePremium')}
                    </h2>
                    <p className="text-lg text-slate-600">
                      {t('thankYou.premiumDescription')}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {t('thankYou.whatsNext')}
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{t('thankYou.nextStep1')}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{t('thankYou.nextStep2')}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{t('thankYou.nextStep3')}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{t('thankYou.nextStep4')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/dashboard"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                    >
                      {t('thankYou.goToDashboard')}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/wizard"
                      className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {t('thankYou.createResume')}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      {t('thankYou.processing')}
                    </h2>
                    <p className="text-lg text-slate-600 mb-4">
                      {t('thankYou.processingMessage')}
                    </p>
                    <p className="text-sm text-slate-500">
                      {t('thankYou.processingNote')}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/dashboard"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                    >
                      {t('thankYou.goToDashboard')}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Support Section */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">
                {t('thankYou.needHelp')}
              </p>
              <Link
                to="/support"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('thankYou.contactSupport')}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

