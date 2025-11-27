import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
// LinkedInCallback removed - handled by PKCE hook
import { DashboardPage } from '@/pages/DashboardPage';
import { WizardPage } from '@/pages/WizardPage';
import { PremiumPage } from '@/pages/PremiumPage';
import { PricingPage } from '@/pages/PricingPage';
import { AccountPage } from '@/pages/AccountPage';
import { ContactPage } from '@/pages/ContactPage';
import { AboutPage } from '@/pages/AboutPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { ResumeViewPage } from '@/pages/ResumeViewPage';

// Components
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  const { i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>GetQuickResume - CV Profesional con IA</title>
        <meta name="description" content="Crea tu currículum profesional en minutos. Gratuito, optimizado y traducible con IA." />
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

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
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
          
          <Route path="/resume/:id" element={
            <ProtectedRoute>
              <MainLayout>
                <ResumeViewPage />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
