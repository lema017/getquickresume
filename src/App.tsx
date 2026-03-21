import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// Auth - GoogleAuthWrapper lazy-loaded to avoid loading Google Identity Services SDK on every page
const GoogleAuthWrapper = lazy(() => import('@/components/GoogleAuthWrapper'));
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

// SEO Landing pages
const AtsResumeCheckerPage = lazy(() => import('@/pages/AtsResumeCheckerPage').then(m => ({ default: m.AtsResumeCheckerPage })));
const ResumeTranslatorPage = lazy(() => import('@/pages/ResumeTranslatorPage').then(m => ({ default: m.ResumeTranslatorPage })));
const ProfessionResumePage = lazy(() => import('@/pages/ProfessionResumePage').then(m => ({ default: m.ProfessionResumePage })));
const ProfessionCategoryHubPage = lazy(() =>
  import('@/pages/ProfessionCategoryHubPage').then(m => ({ default: m.ProfessionCategoryHubPage }))
);
const SkillResumePage = lazy(() => import('@/pages/SkillResumePage').then(m => ({ default: m.SkillResumePage })));
// Legal pages
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const RefundPolicyPage = lazy(() => import('@/pages/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));

// Blog
const BlogPage = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })));
const HowToMakeGoodResume = lazy(() => import('@/pages/articles/HowToMakeGoodResume').then(m => ({ default: m.HowToMakeGoodResume })));
const WhatIsATS = lazy(() => import('@/pages/articles/WhatIsATS').then(m => ({ default: m.WhatIsATS })));
const ResumeTipsForCareerChangers = lazy(() => import('@/pages/articles/ResumeTipsForCareerChangers').then(m => ({ default: m.ResumeTipsForCareerChangers })));
const CommonResumeMistakes = lazy(() => import('@/pages/articles/CommonResumeMistakes').then(m => ({ default: m.CommonResumeMistakes })));
const HowToWriteAResume = lazy(() => import('@/pages/articles/HowToWriteAResume').then(m => ({ default: m.HowToWriteAResume })));
const HowToMakeAResume = lazy(() => import('@/pages/articles/HowToMakeAResume').then(m => ({ default: m.HowToMakeAResume })));
const HowFarBackShouldResumeGo = lazy(() => import('@/pages/articles/HowFarBackShouldResumeGo').then(m => ({ default: m.HowFarBackShouldResumeGo })));
const ShouldIPutGpaOnResume = lazy(() => import('@/pages/articles/ShouldIPutGpaOnResume').then(m => ({ default: m.ShouldIPutGpaOnResume })));

// Public
const PublicResumePage = lazy(() => import('@/pages/PublicResumePage').then(m => ({ default: m.PublicResumePage })));
const TemplateSelectionPage = lazy(() => import('@/pages/TemplateSelectionPage').then(m => ({ default: m.TemplateSelectionPage })));
const PublicWizardPage = lazy(() => import('@/pages/PublicWizardPage').then(m => ({ default: m.PublicWizardPage })));

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
                <GoogleAuthWrapper>
                  <LoginPage />
                </GoogleAuthWrapper>
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

            {/* SEO Landing Pages */}
            <Route path="/ats-resume-checker" element={
              <MainLayout>
                <AtsResumeCheckerPage />
              </MainLayout>
            } />

            <Route path="/resume-translator" element={
              <MainLayout>
                <ResumeTranslatorPage />
              </MainLayout>
            } />

            <Route path="/resumes/:categoryId" element={
              <MainLayout>
                <ProfessionCategoryHubPage />
              </MainLayout>
            } />

            {/* Programmatic SEO: Profession Resume Pages */}
            <Route
              path="/resume/douglas-g-hurley"
              element={<Navigate to="/resume/experienced-aerospace-engineer" replace />}
            />
            <Route
              path="/resume/fresher"
              element={<Navigate to="/resume/junior-software-engineer" replace />}
            />
            <Route path="/resume/basic" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/headline" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/summary" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/kegg-software-engineer" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/nau21-software-engineer" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/sabien-itaca-software-engineer" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/software-engineer-doetaylor" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/software-engineer-resume" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/software-engineering" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route path="/resume/software-engineering-ubc-eml" element={<Navigate to="/resume/software-engineer" replace />} />
            <Route
              path="/resume/curriculum-de-ingeniero-de-software"
              element={<Navigate to="/resume/ingeniero-de-software" replace />}
            />
            <Route path="/resume/obgyn" element={<Navigate to="/resume/obstetrician-gynecologist" replace />} />
            <Route path="/resume/pdf" element={<Navigate to="/resume/title-abstractor" replace />} />
            <Route
              path="/resume/robert-l-behnken"
              element={<Navigate to="/resume/experienced-aerospace-engineer" replace />}
            />
            <Route path="/resume/teenage" element={<Navigate to="/resume/high-school-student" replace />} />
            <Route path="/resume/file-clerk" element={<Navigate to="/resume/data-entry-clerk" replace />} />
            <Route path="/resume/archivo-clerk" element={<Navigate to="/resume/operador-de-captura" replace />} />
            <Route path="/resume/bellhop" element={<Navigate to="/resume/concierge" replace />} />
            <Route path="/resume/bellhop-curriculum" element={<Navigate to="/resume/conserje" replace />} />
            <Route path="/resume/english" element={<Navigate to="/resume/english-teacher" replace />} />
            <Route path="/resume/curriculum-en-espanol" element={<Navigate to="/resume/profesor-de-ingles" replace />} />
            <Route path="/resume/waitress" element={<Navigate to="/resume/server" replace />} />
            <Route path="/resume/curriculum-esperanza-waitress" element={<Navigate to="/resume/mesero" replace />} />
            <Route path="/resume/modern-call-center" element={<Navigate to="/resume/call-center-agent" replace />} />
            <Route path="/resume/curriculum-llamada-moderna" element={<Navigate to="/resume/agente-de-call-center" replace />} />
            <Route path="/resume/pipe-fitter" element={<Navigate to="/resume/plumber" replace />} />
            <Route path="/resume/curriculum-para-tuberias" element={<Navigate to="/resume/plomero" replace />} />
            <Route path="/resume/ic-designer" element={<Navigate to="/resume/ic-design-engineer" replace />} />
            <Route path="/resume/diseñador-de-ci" element={<Navigate to="/resume/ingeniero-de-diseno-de-ci" replace />} />
            <Route path="/resume/curriculum-designer" element={<Navigate to="/resume/curriculum-development-specialist" replace />} />
            <Route path="/resume/diseñador-de-curriculum" element={<Navigate to="/resume/especialista-desarrollo-curriculo" replace />} />
            <Route path="/resume/education-on-a" element={<Navigate to="/resume/high-school-teacher" replace />} />
            <Route path="/resume/educacion-en-a" element={<Navigate to="/resume/profesor-de-secundaria" replace />} />
            <Route path="/resume/medical-interpreter" element={<Navigate to="/resume/interpreter" replace />} />
            <Route path="/resume/intérprete-médico" element={<Navigate to="/resume/interprete" replace />} />
            <Route path="/resume/over-the-phone-interpreter" element={<Navigate to="/resume/interpreter" replace />} />
            <Route path="/resume/intérprete-por-teléfono" element={<Navigate to="/resume/interprete" replace />} />
            <Route path="/resume/nanny" element={<Navigate to="/resume/babysitter" replace />} />
            <Route path="/resume/niñera-curriculum" element={<Navigate to="/resume/cuidadora-de-ninos" replace />} />
            <Route path="/resume/farmacéutico" element={<Navigate to="/resume/farmaceutico" replace />} />
            <Route path="/resume/titulo-proper-title" element={<Navigate to="/resume/extractor-de-titulos" replace />} />
            <Route path="/resume/:slug" element={
              <MainLayout>
                <ProfessionResumePage />
              </MainLayout>
            } />

            {/* Programmatic SEO: Skill Resume Pages */}
            <Route path="/resume-skills/:slug" element={
              <MainLayout>
                <SkillResumePage />
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

            <Route path="/blog/resume-tips-for-career-changers" element={
              <MainLayout>
                <ResumeTipsForCareerChangers />
              </MainLayout>
            } />

            <Route path="/blog/common-resume-mistakes" element={
              <MainLayout>
                <CommonResumeMistakes />
              </MainLayout>
            } />

            <Route path="/blog/how-to-write-a-resume" element={
              <MainLayout>
                <HowToWriteAResume />
              </MainLayout>
            } />

            <Route path="/blog/how-to-make-a-resume" element={
              <MainLayout>
                <HowToMakeAResume />
              </MainLayout>
            } />

            <Route path="/blog/how-far-back-should-a-resume-go" element={
              <MainLayout>
                <HowFarBackShouldResumeGo />
              </MainLayout>
            } />

            <Route path="/blog/should-i-put-gpa-on-resume" element={
              <MainLayout>
                <ShouldIPutGpaOnResume />
              </MainLayout>
            } />

            {/* Public Wizard Routes */}
            <Route path="/create" element={
              <MainLayout>
                <TemplateSelectionPage />
              </MainLayout>
            } />
            <Route path="/create/*" element={
              <MainLayout>
                <PublicWizardPage />
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

            <Route path="/my-resumes/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <ResumeViewPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/my-resumes/:id/share" element={
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
