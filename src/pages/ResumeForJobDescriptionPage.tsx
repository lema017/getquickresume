import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  XCircle,
  CheckCircle,
  Target,
  Search,
  FileText,
  Sparkles
} from 'lucide-react';
import {
  getPageSEO,
  generateHowToSchema,
  BASE_URL,
} from '@/utils/seoConfig';
import { trackLandingView, trackCtaClickStart } from '@/services/marketingAnalytics';

export function ResumeForJobDescriptionPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('resumeForJobDescription', lang);
  const pageUrl = `${BASE_URL}/resume-for-job-description`;

  // Track landing page view
  useEffect(() => {
    trackLandingView('resume-for-job-description');
  }, []);

  // Get translations
  const hero = t('landing.resumeForJobDescription.hero', { returnObjects: true }) as {
    title: string;
    subtitle: string;
    badge: string;
  };
  const ctaPrimary = t('landing.resumeForJobDescription.ctaPrimary');
  const ctaSecondary = t('landing.resumeForJobDescription.ctaSecondary');
  const problem = t('landing.resumeForJobDescription.problem', { returnObjects: true }) as {
    title: string;
    bullets: string[];
  };
  const howItWorks = t('landing.resumeForJobDescription.howItWorks', { returnObjects: true }) as {
    title: string;
    steps: { number: string; title: string }[];
  };
  const benefit = t('landing.resumeForJobDescription.benefit');
  const trust = t('landing.resumeForJobDescription.trust', { returnObjects: true }) as {
    freeToStart: string;
    atsOptimized: string;
    privacyNote: string;
  };

  // HowTo structured data for SEO
  const howToSchema = generateHowToSchema(
    lang === 'es' ? 'Cómo adaptar tu CV a una descripción de trabajo' : 'How to tailor your resume to a job description',
    lang === 'es' 
      ? 'Aprende a adaptar tu CV para coincidir con descripciones de trabajo específicas y pasar los filtros ATS.'
      : 'Learn how to tailor your resume to match specific job descriptions and pass ATS filters.',
    howItWorks.steps.map(step => ({
      name: step.title,
      text: step.title,
    })),
    'PT5M'
  );

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
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={pageUrl} />
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
          ? 'cv adaptado, cv para descripción de trabajo, optimización ats, palabras clave cv, adaptar cv, cv personalizado'
          : 'tailored resume, resume for job description, ats optimization, resume keywords, customize resume, job-specific resume'
        } />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 lg:py-24">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 backdrop-blur-sm mb-6">
                <Target className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-100">
                  {hero.badge}
                </span>
              </div>
              
              {/* Main Title - Only H1 on page */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
                {hero.title}
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg lg:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                {hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-4 sm:px-0">
                <Link 
                  to="/job-tailoring" 
                  onClick={() => trackCtaClickStart('create', 'resume-for-job-description')}
                  className="group w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-center leading-snug"
                >
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span>{ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
                
                <Link 
                  to="/job-tailoring" 
                  onClick={() => trackCtaClickStart('create', 'resume-for-job-description')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-center leading-snug"
                >
                  <Search className="w-5 h-5 flex-shrink-0" />
                  <span>{ctaSecondary}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{trust.freeToStart}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{trust.atsOptimized}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{trust.privacyNote}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">
                {problem.title}
              </h2>
              
              <div className="space-y-4">
                {problem.bullets.map((bullet, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-lg text-slate-700 text-left">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {howItWorks.title}
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 -translate-x-1/2" />
                
                <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
                  {howItWorks.steps.map((step, index) => (
                    <div key={index} className="relative flex flex-col items-center text-center">
                      {/* Step number */}
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                      
                      {/* Step icon */}
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                        {index === 0 && <FileText className="w-6 h-6 text-blue-600" />}
                        {index === 1 && <Search className="w-6 h-6 text-indigo-600" />}
                        {index === 2 && <Target className="w-6 h-6 text-purple-600" />}
                      </div>
                      
                      {/* Step title */}
                      <h3 className="text-lg font-semibold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Benefit line */}
            <div className="text-center mt-12">
              <p className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-full text-lg font-semibold text-emerald-700">
                <CheckCircle className="w-5 h-5" />
                {benefit}
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 lg:py-20">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {hero.title}
              </h2>
              
              <p className="text-lg text-slate-300 mb-8">
                {hero.subtitle}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
                <Link 
                  to="/job-tailoring" 
                  className="group w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-center leading-snug"
                >
                  <Sparkles className="w-5 h-5 flex-shrink-0" />
                  <span>{ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
                
                <Link 
                  to="/job-tailoring" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-center leading-snug"
                >
                  <Search className="w-5 h-5 flex-shrink-0" />
                  <span>{ctaSecondary}</span>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{trust.freeToStart}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{trust.atsOptimized}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{trust.privacyNote}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
