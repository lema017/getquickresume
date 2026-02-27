import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Shield,
  Target,
  FileText,
  Sparkles,
  Linkedin,
  Upload,
  Layout
} from 'lucide-react';
import { getPageSEO, BASE_URL } from '@/utils/seoConfig';
import { trackLandingView, trackCtaClickStart } from '@/services/marketingAnalytics';

export function AiResumeBuilderPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('aiResumeBuilder', lang);

  // Track landing page view
  useEffect(() => {
    trackLandingView('ai-resume-builder');
  }, []);

  // Get translated arrays
  const whatAiDoesBullets = t('aiResumeBuilderPage.whatAiDoes.bullets', { returnObjects: true }) as string[];
  const whyThisWorksBullets = t('aiResumeBuilderPage.whyThisWorks.bullets', { returnObjects: true }) as string[];
  const templateLabels = t('aiResumeBuilderPage.templates.labels', { returnObjects: true }) as string[];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${BASE_URL}/ai-resume-builder`} />
        
        {/* hreflang for internationalization */}
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/ai-resume-builder`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/ai-resume-builder?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/ai-resume-builder`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`${BASE_URL}/ai-resume-builder`} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={`${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${BASE_URL}/images/og-default.png`} />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={lang === 'es' 
          ? 'creador cv ia, cv con inteligencia artificial, generador de cv, cv profesional ia, constructor de cv ia, cv automatico'
          : 'ai resume builder, ai resume generator, ai cv maker, professional resume ai, resume builder ai, automated resume'
        } />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center">
              {/* H1 - Only one on the page */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  {t('aiResumeBuilderPage.hero.title')}
                </span>
              </h1>
              
              {/* Subhead */}
              <p className="text-lg sm:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('aiResumeBuilderPage.hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 w-full px-4 sm:px-0">
                {/* Primary CTA */}
                <Link 
                  to="/login" 
                  onClick={() => trackCtaClickStart('create', 'ai-resume-builder')}
                  className="group relative w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-center leading-snug"
                >
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span>{t('aiResumeBuilderPage.hero.ctaPrimary')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
              </div>

              {/* Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm">
                <Link 
                  to="/wizard/linkedin" 
                  onClick={() => trackCtaClickStart('import', 'ai-resume-builder')}
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  {t('aiResumeBuilderPage.hero.ctaSecondaryLinkedIn')}
                </Link>
                <span className="hidden sm:inline text-slate-500">|</span>
                <Link 
                  to="/wizard/upload" 
                  onClick={() => trackCtaClickStart('upload', 'ai-resume-builder')}
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {t('aiResumeBuilderPage.hero.ctaSecondaryUpload')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What the AI Does Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('aiResumeBuilderPage.whatAiDoes.title')}
              </h2>
            </div>

            <div className="grid gap-4 max-w-xl mx-auto">
              {whatAiDoesBullets.map((bullet, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-700 font-medium pt-1">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Works Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('aiResumeBuilderPage.whyThisWorks.title')}
              </h2>
            </div>

            <div className="grid gap-4 max-w-xl mx-auto">
              {whyThisWorksBullets.map((bullet, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-medium pt-1">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Teaser Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('aiResumeBuilderPage.templates.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                {t('aiResumeBuilderPage.templates.subtitle')}
              </p>
            </div>

            {/* Template Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {templateLabels.map((label, index) => (
                <div 
                  key={index}
                  className="group p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {index === 0 && <FileText className="w-8 h-8 text-white" />}
                    {index === 1 && <Layout className="w-8 h-8 text-white" />}
                    {index === 2 && <Zap className="w-8 h-8 text-white" />}
                  </div>
                  <p className="font-semibold text-gray-900">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Microcopy Section */}
        <section className="py-12 bg-slate-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">{t('aiResumeBuilderPage.trust.noCard')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{t('aiResumeBuilderPage.trust.atsFriendly')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="font-medium">{t('aiResumeBuilderPage.trust.privacyNote')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              {t('aiResumeBuilderPage.finalCta.title')}
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              {t('aiResumeBuilderPage.finalCta.subtitle')}
            </p>
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto mx-4 sm:mx-0 px-6 sm:px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center leading-snug"
            >
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span>{t('aiResumeBuilderPage.hero.ctaPrimary')}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </Link>
          </div>
        </section>

        {/* Footer SEO Microcopy */}
        <div className="py-6 bg-slate-100 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500">
              {t('aiResumeBuilderPage.footerSeoMicrocopy')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
