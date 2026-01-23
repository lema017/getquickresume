import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Zap,
  Star,
  Shield,
  HelpCircle,
  Target,
  Check,
  Crown,
  Users,
  Globe,
  TrendingUp,
  Award,
  Gift,
  ChevronRight
} from 'lucide-react';
import { IconWrapper } from '@/components/IconWrapper';
import {
  getPageSEO,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
  commonFAQs,
  BASE_URL,
} from '@/utils/seoConfig';

export function LandingPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es';
  const seo = getPageSEO('home', lang);
  const [activeFeatureTab, setActiveFeatureTab] = useState('jobTailoring');
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  // Animated feature rotation for hero
  const animatedFeatures = t('landing.hero.animatedFeatures', { returnObjects: true }) as { icon: string; text: string }[];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % animatedFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedFeatures.length]);

  // Structured data schemas
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const softwareAppSchema = generateSoftwareApplicationSchema();
  const faqSchema = generateFAQSchema(commonFAQs[lang]);

  // Feature tabs data
  const featureTabs = ['jobTailoring', 'coverLetter', 'atsScoring', 'translation', 'qrSharing'];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={BASE_URL} />
        
        {/* hreflang for internationalization */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}?lang=es`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={BASE_URL} />
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
          ? 'creador de cv, currículum con ia, plantillas de cv, cv profesional, ats cv, crear cv gratis, carta de presentación, optimización ats'
          : 'resume builder, ai resume, cv templates, professional resume, ats resume, free resume maker, cover letter, ats optimization'
        } />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webSiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section - Clean & Modern */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 lg:py-24">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 backdrop-blur-sm mb-6">
                <Gift className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-100">
                  {t('landing.hero.badge')}
                </span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
                {t('landing.hero.title')}
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-amber-400 mb-3 font-semibold tracking-wide">
                {t('landing.hero.subtitle')}
              </p>
              
              {/* Description */}
              <p className="text-lg text-slate-300 mb-8">
                {t('landing.hero.description')}
              </p>

              {/* Spotlight Feature Carousel */}
              <div className="mb-10">
                <div className="relative inline-flex items-center justify-center">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl scale-110" />
                  
                  {/* Feature Card */}
                  <div className="relative px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
                        <IconWrapper 
                          name={animatedFeatures[currentFeatureIndex]?.icon || 'sparkles'} 
                          className="w-6 h-6 text-white" 
                        />
                      </div>
                      <span className="text-xl font-semibold text-white min-w-[180px] text-left transition-all duration-300">
                        {animatedFeatures[currentFeatureIndex]?.text}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Progress Dots - with accessible touch targets */}
                <div className="flex justify-center gap-1 mt-4" role="tablist" aria-label={t('landing.hero.featureCarousel')}>
                  {animatedFeatures.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeatureIndex(index)}
                      className="p-3 group"
                      role="tab"
                      aria-selected={index === currentFeatureIndex}
                      aria-label={feature.text || `Feature ${index + 1}`}
                    >
                      <span 
                        className={`block rounded-full transition-all duration-300 ${
                          index === currentFeatureIndex
                            ? 'w-6 h-2 bg-white'
                            : 'w-2 h-2 bg-white/30 group-hover:bg-white/50'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link 
                  to="/login" 
                  className="group relative px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <Zap className="w-5 h-5" />
                  {t('landing.hero.ctaPrimary')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a 
                  href="#features" 
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  {t('landing.hero.ctaSecondary')}
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>{t('landing.hero.trustIndicators.noCardRequired')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span>{t('landing.hero.trustIndicators.freeForever')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>{t('landing.hero.trustIndicators.aiPowered')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Stats Bar */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                    {t('landing.socialProof.stats.resumesCreated.value')}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{t('landing.socialProof.stats.resumesCreated.label')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                    {t('landing.socialProof.stats.languages.value')}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{t('landing.socialProof.stats.languages.label')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-orange-600 mr-2" />
                  <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                    {t('landing.socialProof.stats.atsScore.value')}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{t('landing.socialProof.stats.atsScore.label')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                    {t('landing.socialProof.stats.satisfaction.value')}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{t('landing.socialProof.stats.satisfaction.label')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Grid - 8 Features */}
        <section id="features" className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {t('landing.coreFeatures.title')}
              </h2>
              <p className="text-xl text-slate-600">
                {t('landing.coreFeatures.subtitle')}
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t('landing.coreFeatures.items', { returnObjects: true }) as unknown as { icon: string; title: string; description: string; highlight: string }[]).map((feature, index) => (
                <div 
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  {/* Highlight Badge */}
                  <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    feature.highlight === 'Free' || feature.highlight === 'Gratis'
                      ? 'bg-green-100 text-green-700'
                      : feature.highlight === 'New' || feature.highlight === 'Nuevo'
                      ? 'bg-orange-100 text-orange-700'
                      : feature.highlight === 'AI-Powered' || feature.highlight === 'IA'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {feature.highlight}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconWrapper name={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Showcase with Tabs */}
        <section className="py-20 lg:py-28 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                {t('landing.featureShowcase.title')}
              </h2>
              <p className="text-xl text-blue-100">
                {t('landing.featureShowcase.subtitle')}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {featureTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFeatureTab(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFeatureTab === tab
                      ? 'bg-white text-blue-900 shadow-lg'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {t(`landing.featureShowcase.tabs.${tab}.title`)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t(`landing.featureShowcase.tabs.${activeFeatureTab}.title`)}
                    </h3>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      {t(`landing.featureShowcase.tabs.${activeFeatureTab}.description`)}
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-4">
                      {(t(`landing.featureShowcase.tabs.${activeFeatureTab}.benefits`, { returnObjects: true }) as string[]).map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Tier Highlight */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-emerald-50 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
                <Gift className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">
                  {t('landing.freeTier.badge')}
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {t('landing.freeTier.title')}
              </h2>
              <p className="text-xl text-slate-600 mb-4">
                {t('landing.freeTier.subtitle')}
              </p>
              <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
                {t('landing.freeTier.description')}
              </p>

              {/* Free Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                {(t('landing.freeTier.features', { returnObjects: true }) as unknown as { icon: string; text: string }[]).map((feature, index) => (
                  <div key={index} className="flex flex-col items-center p-4 rounded-xl bg-white border border-emerald-200 shadow-sm">
                    <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                    <span className="text-sm font-medium text-slate-700 text-center">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                {t('landing.freeTier.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="mt-6 text-slate-500 text-sm">
                {t('landing.freeTier.upgradeHint')}
              </p>
            </div>
          </div>
        </section>

        {/* How It Works - 4 Steps */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {t('landing.howItWorks.title')}
              </h2>
              <p className="text-xl text-slate-600">
                {t('landing.howItWorks.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
              
              {(t('landing.howItWorks.steps', { returnObjects: true }) as unknown as { number: string; icon: string; title: string; description: string }[]).map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Step Number */}
                  <div className="relative mx-auto w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-xl z-10">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <IconWrapper name={step.icon} className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ATS Explainer Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                {t('landing.atsExplainer.title')}
              </h2>
              <p className="text-2xl text-amber-400 mb-4 font-semibold">
                {t('landing.atsExplainer.subtitle')}
              </p>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                {t('landing.atsExplainer.description')}
              </p>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {(t('landing.atsExplainer.benefits', { returnObjects: true }) as unknown as { icon: string; title: string; description: string }[]).map((benefit, index) => (
                <div key={index} className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center mx-auto mb-4">
                    <IconWrapper name={benefit.icon} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-blue-100">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <Link 
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 gap-2 hover:scale-105"
              >
                <Target className="w-5 h-5" />
                {t('landing.atsExplainer.cta')}
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section - Improved */}
        <section id="pricing" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {t('landing.plans.title')}
              </h2>
              <p className="text-xl text-slate-600">
                {t('landing.plans.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="relative p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-lg flex flex-col h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {t('landing.plans.free.name')}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {t('landing.plans.free.description')}
                </p>
                <div className="mb-6">
                  <p className="text-5xl font-extrabold text-slate-900 mb-1">
                    {t('landing.plans.free.price')}
                  </p>
                  <p className="text-sm text-slate-500">
                    {t('landing.plans.free.period')}
                  </p>
                </div>
                
                <ul className="space-y-3 flex-grow mb-8">
                  {(t('landing.plans.free.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/login"
                  className="mt-auto w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 bg-slate-900 text-white hover:bg-slate-800"
                >
                  {t('landing.plans.free.cta')}
                </Link>
              </div>

              {/* Premium Monthly */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-xl flex flex-col h-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {t('landing.plans.popularBadge')}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {t('landing.plans.monthly.name')}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {t('landing.plans.monthly.description')}
                </p>
                <div className="mb-6">
                  <p className="text-5xl font-extrabold text-blue-600 mb-1">
                    {t('landing.plans.monthly.price')}
                    <span className="text-xl font-normal text-slate-500">/{t('landing.plans.monthly.period')}</span>
                  </p>
                </div>
                
                <ul className="space-y-3 flex-grow mb-8">
                  {(t('landing.plans.monthly.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/premium"
                  className="mt-auto w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  {t('landing.plans.monthly.cta')}
                </Link>
              </div>

              {/* Premium Yearly - Best Value */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl transform md:scale-105 border-4 border-amber-400 flex flex-col h-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  {t('landing.plans.yearly.badge')}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('landing.plans.yearly.name')}
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  {t('landing.plans.yearly.description')}
                </p>
                <div className="mb-6">
                  <p className="text-5xl font-extrabold text-white mb-1">
                    {t('landing.plans.yearly.price')}
                    <span className="text-xl font-normal text-blue-100">/{t('landing.plans.yearly.period')}</span>
                  </p>
                  <p className="text-sm text-amber-300 font-semibold">
                    {t('landing.plans.yearly.savings')}
                  </p>
                </div>
                
                <ul className="space-y-3 flex-grow mb-8">
                  {(t('landing.plans.yearly.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-50 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/premium"
                  className="mt-auto w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 bg-white text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  {t('landing.plans.yearly.cta')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Enhanced */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                {t('landing.testimonials.title')}
              </h2>
              <p className="text-xl text-slate-600">
                {t('landing.testimonials.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t('landing.testimonials.items', { returnObjects: true }) as unknown as { rating: number; content: string; name: string; role: string; company: string; result: string }[]).map((testimonial, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Result Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-4 self-start">
                    <Award className="w-3 h-3" />
                    {testimonial.result}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-slate-600 mb-4 text-sm italic leading-relaxed flex-grow">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="font-bold text-slate-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                    <p className="text-xs text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-12 text-center">
              {t('landing.faq.title')}
            </h2>
            
            <div className="space-y-4">
              {(t('landing.faq.items', { returnObjects: true }) as unknown as { question: string; answer: string }[]).map((item, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {item.question}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="#pricing" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                {t('landing.faq.viewPricingDetails')}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('landing.cta.title')}
            </h2>
            <p className="text-2xl text-blue-100 mb-4">
              {t('landing.cta.subtitle')}
            </p>
            <p className="text-lg text-slate-300 mb-8">
              {t('landing.cta.description')}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {(t('landing.cta.features', { returnObjects: true }) as string[]).map((feature, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20">
                  {feature}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                {t('landing.cta.ctaPrimary')}
              </Link>
              
              <a 
                href="#pricing" 
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {t('landing.cta.ctaSecondary')}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
