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
  Sparkles
} from 'lucide-react';
import { getPageSEO, BASE_URL } from '@/utils/seoConfig';
import { useResumeStore } from '@/stores/resumeStore';
import { trackLandingView, trackCtaClickStart } from '@/services/marketingAnalytics';
import { TEMPLATE_CATALOG } from '@/utils/templateCatalog';

const TEMPLATE_DESCRIPTIONS: Record<string, string> = {
  'gqr-resume-classic': 'Timeless elegance with clean lines and balanced spacing',
  'gqr-resume-corporate': 'Polished professional layout for business environments',
  'gqr-resume-mercury': 'Dynamic modern design with bold visual hierarchy',
  'gqr-resume-finance': 'Structured precision ideal for finance and consulting',
  'gqr-resume-steady': 'Reliable balanced layout with steady visual flow',
  'gqr-resume-charcoal': 'Warm dark tones with a sophisticated glow effect',
  'gqr-resume-pristine': 'Ultra-clean minimalist design with crisp typography',
  'gqr-resume-saffron': 'Vibrant warm accents with an energetic feel',
  'gqr-resume-obsidian': 'Sharp dark-themed design with bold edge details',
  'gqr-resume-cobalt': 'Rich blue tones with a contemporary professional look',
  'gqr-resume-precision': 'Geometric precision with meticulous alignment',
  'gqr-resume-silver': 'Refined metallic-inspired elegance',
  'gqr-resume-mckinsey': 'Strategy-grade consulting style with authority',
  'gqr-resume-designer': 'Creative layout for design-oriented professionals',
  'gqr-resume-slate': 'Calm, distraction-free design with serene balance',
  'gqr-resume-desert': 'Earthy warm tones with rugged character',
  'gqr-resume-fineline': 'Delicate line work with expansive white space',
  'gqr-resume-minty': 'Fresh cool palette with a light, airy feel',
  'gqr-resume-atlantic': 'Deep ocean-inspired blues with commanding presence',
  'gqr-resume-happy': 'Bright, optimistic design radiating positive energy',
  'gqr-resume-darkbg': 'Bold dark canvas that makes content stand out',
  'gqr-resume-webworker': 'Tech-forward layout for digital professionals',
  'gqr-resume-seapearl': 'Soft iridescent tones with coastal serenity',
  'gqr-resume-redaccent': 'Striking red highlights on a clean foundation',
  'gqr-resume-blueaccent': 'Classic blue highlights for a trustworthy impression',
  'gqr-resume-typewriter': 'Nostalgic editorial style with literary charm',
  'gqr-resume-monochrome': 'Pure black and white for maximum readability',
  'gqr-resume-navybar': 'Commanding navy header with structured sections',
  'gqr-resume-executive': 'Senior-level design conveying authority and experience',
  'gqr-resume-boldname': 'Attention-grabbing name display with confident presence',
};

const STATIC_TEMPLATES = TEMPLATE_CATALOG.slice(0, 6).map(t => ({
  id: t.id,
  name: t.name,
  description: TEMPLATE_DESCRIPTIONS[t.id] || 'Professional ATS-friendly resume template',
  category: t.category,
}));

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
                  {/* Template Preview */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden flex items-center justify-center">
                    <div className="text-center px-6">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Layout className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-xl font-bold text-gray-800">{template.name}</p>
                      <p className="text-xs text-gray-400 mt-1">ATS-Friendly</p>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold shadow-sm">
                        {t('resumeTemplatesPage.gallery.free')}
                      </span>
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
