import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Shield,
  Target,
  Layout,
  Crown,
  Sparkles
} from 'lucide-react';
import { getPageSEO, BASE_URL } from '@/utils/seoConfig';
import { useResumeStore } from '@/stores/resumeStore';
import { trackLandingView, trackCtaClickStart } from '@/services/marketingAnalytics';

// Production template data for SEO landing page
const STATIC_TEMPLATES = [
  { 
    id: 'template-1767380776281', 
    name: 'Modern', 
    description: 'Clean contemporary design with professional blue accents',
    category: 'free' as const, 
    layout: 'single-column',
    image: '/images/templates/template-1767380776281.png'
  },
  { 
    id: 'template-1767380776281-grey', 
    name: 'Modern Grey', 
    description: 'Elegant grey-toned professional layout',
    category: 'free' as const, 
    layout: 'single-column',
    image: '/images/templates/template-1767380776281-grey.png'
  },
  { 
    id: 'template-1767380355237', 
    name: 'Minimalistic', 
    description: 'Streamlined layout that lets your content shine',
    category: 'free' as const, 
    layout: 'single-column',
    image: '/images/templates/template-1767380355237.png'
  },
  { 
    id: 'template-1767381172466', 
    name: 'Premium', 
    description: 'Professional design with dark header and clean sections',
    category: 'premium' as const, 
    layout: 'single-column',
    image: '/images/templates/template-1767381172466.png'
  },
  { 
    id: 'template-1767381172467', 
    name: 'Premium Blue', 
    description: 'Sophisticated design with elegant blue header',
    category: 'premium' as const, 
    layout: 'single-column',
    image: '/images/templates/template-1767381172467.png'
  },
  { 
    id: 'template-1767382508222-gray', 
    name: 'Premium Grey', 
    description: 'Executive grey-toned premium design',
    category: 'premium' as const, 
    layout: 'single-column',
    image: '/images/templates/template-1767382508222-gray.png'
  },
];

export function ResumeTemplatesPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('resumeTemplates', lang);
  const { setSelectedTemplate } = useResumeStore();

  // Track landing page view
  useEffect(() => {
    trackLandingView('resume-templates');
  }, []);

  // Get translated arrays
  const whyTemplatesBullets = t('resumeTemplatesPage.whyTemplatesMatter.bullets', { returnObjects: true }) as string[];

  const handleUseTemplate = (templateId: string, category: 'free' | 'premium') => {
    // Track CTA click
    trackCtaClickStart('create', 'resume-templates');
    // Preselect the template in the store
    setSelectedTemplate(templateId, category);
    // Navigate to login (user will have template preselected after login)
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`${BASE_URL}/resume-templates`} />
        
        {/* hreflang for internationalization */}
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/resume-templates`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/resume-templates?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/resume-templates`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={`${BASE_URL}/resume-templates`} />
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
          ? 'plantillas cv, plantillas curriculum, plantillas cv ats, plantillas cv profesionales, diseños cv, formatos cv'
          : 'resume templates, cv templates, ats resume templates, professional resume templates, resume designs, resume formats'
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
                  {t('resumeTemplatesPage.hero.title')}
                </span>
              </h1>
              
              {/* Subhead */}
              <p className="text-lg sm:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('resumeTemplatesPage.hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0">
                {/* Primary CTA */}
                <Link 
                  to="/login" 
                  className="group relative w-full sm:w-auto px-6 sm:px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-center leading-snug"
                >
                  <Zap className="w-5 h-5 flex-shrink-0" />
                  <span>{t('resumeTemplatesPage.hero.ctaPrimary')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Templates Matter Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('resumeTemplatesPage.whyTemplatesMatter.title')}
              </h2>
            </div>

            <div className="grid gap-4 max-w-xl mx-auto">
              {whyTemplatesBullets.map((bullet, index) => (
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

        {/* Template Gallery Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('resumeTemplatesPage.gallery.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STATIC_TEMPLATES.map((template) => (
                <div 
                  key={template.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Template Preview Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={`${template.name} resume template preview`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      {template.category === 'premium' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold shadow-sm">
                          <Crown className="w-3 h-3" />
                          {t('resumeTemplatesPage.gallery.premium')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold shadow-sm">
                          {t('resumeTemplatesPage.gallery.free')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {template.description}
                    </p>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleUseTemplate(template.id, template.category)}
                      className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group-hover:scale-[1.02] transform transition-transform"
                    >
                      {t('resumeTemplatesPage.gallery.useTemplate')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Note Section */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">{t('resumeTemplatesPage.footerNote.text')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Microcopy Section */}
        <section className="py-8 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">{t('resumeTemplatesPage.trust.noCard')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{t('resumeTemplatesPage.trust.atsFriendly')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">{t('resumeTemplatesPage.trust.privacyNote')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              {t('resumeTemplatesPage.finalCta.title')}
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              {t('resumeTemplatesPage.finalCta.subtitle')}
            </p>
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto mx-4 sm:mx-0 px-6 sm:px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center leading-snug"
            >
              <Layout className="w-5 h-5 flex-shrink-0" />
              <span>{t('resumeTemplatesPage.hero.ctaPrimary')}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
