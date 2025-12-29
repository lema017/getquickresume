import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
// LinkedInCallback removed - handled by PKCE hook
import { DashboardPage } from '@/pages/DashboardPage';
import { CoverLetterPage } from '@/pages/CoverLetterPage';
import { WizardPage } from '@/pages/WizardPage';
import { PremiumPage } from '@/pages/PremiumPage';
import { PricingPage } from '@/pages/PricingPage';
import { AccountPage } from '@/pages/AccountPage';
import { ContactPage } from '@/pages/ContactPage';
import { AboutPage } from '@/pages/AboutPage';
import { SupportPage } from '@/pages/SupportPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { RefundPolicyPage } from '@/pages/RefundPolicyPage';
import { ResumeViewPage } from '@/pages/ResumeViewPage';
import { PublicResumePage } from '@/pages/PublicResumePage';
import { ThankYouPage } from '@/pages/ThankYouPage';
import { BlogPage } from '@/pages/BlogPage';
import { HowToMakeGoodResume } from '@/pages/articles/HowToMakeGoodResume';
import { WhatIsATS } from '@/pages/articles/WhatIsATS';

// Components
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Hooks
import { useAuthInit } from '@/hooks/useAuthInit';

// SEO
import { BASE_URL } from '@/utils/seoConfig';

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
        <link rel="alternate" hreflang="en" href={BASE_URL} />
        <link rel="alternate" hreflang="es" href={`${BASE_URL}?lang=es`} />
        <link rel="alternate" hreflang="x-default" href={BASE_URL} />
        
        {/* Viewport and mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#2563eb" />
        
        {/* Robots default */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
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
      </div>
    </>
  );
}

export default App;
