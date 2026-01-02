import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

// Layouts - Keep static (used on every page)
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Components - Keep static (used frequently)
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Hooks
import { useAuthInit } from '@/hooks/useAuthInit';

// SEO
import { BASE_URL } from '@/utils/seoConfig';

// ============================================================================
// Lazy-loaded Pages - Only loaded when user navigates to them
// ============================================================================

// Landing page - Keep static for fast initial load
import { LandingPage } from '@/pages/LandingPage';

// Auth
const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));

// Main app pages
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const WizardPage = lazy(() => import('@/pages/WizardPage').then(m => ({ default: m.WizardPage })));
const ResumeViewPage = lazy(() => import('@/pages/ResumeViewPage').then(m => ({ default: m.ResumeViewPage })));
const ResumeSharePage = lazy(() => import('@/pages/ResumeSharePage').then(m => ({ default: m.ResumeSharePage })));

// Feature pages
const CoverLetterPage = lazy(() => import('@/pages/CoverLetterPage').then(m => ({ default: m.CoverLetterPage })));
const JobTailoringPage = lazy(() => import('@/pages/JobTailoringPage').then(m => ({ default: m.JobTailoringPage })));

// Premium/Account
const PremiumPage = lazy(() => import('@/pages/PremiumPage').then(m => ({ default: m.PremiumPage })));
const PricingPage = lazy(() => import('@/pages/PricingPage').then(m => ({ default: m.PricingPage })));
const AccountPage = lazy(() => import('@/pages/AccountPage').then(m => ({ default: m.AccountPage })));
const ThankYouPage = lazy(() => import('@/pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));

// Content pages
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const SupportPage = lazy(() => import('@/pages/SupportPage').then(m => ({ default: m.SupportPage })));

// Legal pages
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const RefundPolicyPage = lazy(() => import('@/pages/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));

// Blog
const BlogPage = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })));
const HowToMakeGoodResume = lazy(() => import('@/pages/articles/HowToMakeGoodResume').then(m => ({ default: m.HowToMakeGoodResume })));
const WhatIsATS = lazy(() => import('@/pages/articles/WhatIsATS').then(m => ({ default: m.WhatIsATS })));

// Public
const PublicResumePage = lazy(() => import('@/pages/PublicResumePage').then(m => ({ default: m.PublicResumePage })));

// ============================================================================
// Loading Fallback Component
// ============================================================================

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

// ============================================================================
// App Component
// ============================================================================

function App() {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  
  // Validate session on app mount
  useAuthInit();

  // Default SEO based on language
  const defaultTitle = lang === 'es' 
    ? 'GetQuickResume - Creador de CV con IA Gratis'
    : 'GetQuickResume - Free AI Resume Builder';
  
  const defaultDescription = lang === 'es'
    ? 'Crea tu currículum profesional en minutos. Gratuito, optimizado para ATS y con asistencia de IA.'
    : 'Create your professional resume in minutes. Free, ATS-optimized, and powered by AI.';

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        
        {/* Default hreflang tags */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        
        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#2563eb" />
        
        {/* Robots default */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <MainLayout>
                <LandingPage />
              </MainLayout>
            } />
            
            <Route path="/login" element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            } />
            
            {/* LinkedIn callback handled by PKCE hook */}
            
            <Route path="/contact" element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            } />
            
            <Route path="/about" element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            } />
            
            <Route path="/legal/privacy" element={
              <MainLayout>
                <PrivacyPage />
              </MainLayout>
            } />
            
            <Route path="/legal/terms" element={
              <MainLayout>
                <TermsPage />
              </MainLayout>
            } />
            
            <Route path="/legal/refund" element={
              <MainLayout>
                <RefundPolicyPage />
              </MainLayout>
            } />

            {/* Blog Routes */}
            <Route path="/blog" element={
              <MainLayout>
                <BlogPage />
              </MainLayout>
            } />
            
            <Route path="/blog/how-to-make-good-resume" element={
              <MainLayout>
                <HowToMakeGoodResume />
              </MainLayout>
            } />
            
            <Route path="/blog/what-is-ats-system" element={
              <MainLayout>
                <WhatIsATS />
              </MainLayout>
            } />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/cover-letter/:id?" element={
              <ProtectedRoute>
                <CoverLetterPage />
              </ProtectedRoute>
            } />

            <Route path="/job-tailoring/:resumeId?" element={
              <ProtectedRoute>
                <JobTailoringPage />
              </ProtectedRoute>
            } />
            
            <Route path="/wizard/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <WizardPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/premium" element={
              <ProtectedRoute>
                <MainLayout>
                  <PremiumPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/pricing" element={
              <MainLayout>
                <PricingPage />
              </MainLayout>
            } />
            
            <Route path="/account" element={
              <ProtectedRoute>
                <MainLayout>
                  <AccountPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/support" element={
              <ProtectedRoute>
                <MainLayout>
                  <SupportPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/resume/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <ResumeViewPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/resume/:id/share" element={
              <ProtectedRoute>
                <MainLayout>
                  <ResumeSharePage />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Public Resume Route (no authentication required) */}
            <Route path="/share/:shareToken" element={
              <MainLayout>
                <PublicResumePage />
              </MainLayout>
            } />

            {/* Thank You Page (after payment) */}
            <Route path="/thank-you" element={
              <MainLayout>
                <ThankYouPage />
              </MainLayout>
            } />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
