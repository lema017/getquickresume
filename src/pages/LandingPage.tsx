import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  Crown
} from 'lucide-react';
import { IconWrapper } from '@/components/IconWrapper';
import { FeatureCard } from '@/components/FeatureCard';

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
        {/* Elementos decorativos sutiles */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge Premium */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-100">
                {t('landing.hero.badge')}
              </span>
            </div>
            
            {/* Título Principal */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
              {t('landing.hero.title')}
            </h1>
            
            {/* Subtítulo */}
            <p className="text-xl lg:text-2xl text-blue-100 mb-4 font-medium">
              {t('landing.hero.subtitle')}
            </p>
            
            {/* Descripción */}
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              {t('landing.hero.description')}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>{t('landing.hero.trustIndicators.noCardRequired')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>{t('landing.hero.trustIndicators.dataSecure')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t('landing.benefits.title')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('landing.benefits.subtitle')}
            </p>
          </div>
          
          {/* Grid de Beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t('landing.benefits.items', { returnObjects: true }) as unknown as { icon: string; title: string; description: string }[]).map((benefit, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Icono moderno */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconWrapper name={benefit.icon} className="w-7 h-7 text-white" />
                </div>
                
                {/* Contenido */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con link a precios */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t('landing.premiumFeatures.title')}
            </h2>
            <p className="text-xl text-slate-600 mb-6">
              {t('landing.premiumFeatures.subtitle')}
            </p>
            <a 
              href="#pricing" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
            >
              {t('landing.premiumFeatures.viewPricing')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          {/* Grid de Funcionalidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('landing.premiumFeatures.features', { returnObjects: true }) as unknown as { icon: string; title: string; description: string; badge?: string }[]).map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Plans Section */}
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t('landing.plans.free.name')}
              </h3>
              <div className="mb-6">
                <p className="text-5xl font-extrabold text-slate-900 mb-2">
                  {t('landing.plans.free.price')}
                </p>
                <p className="text-sm text-slate-500">
                  {t('landing.plans.free.period')}
                </p>
              </div>
              
              <ul className="space-y-4 flex-grow mb-8">
                {(t('landing.plans.free.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/login"
                className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-slate-900 text-white hover:bg-slate-800"
              >
                {t('landing.plans.free.cta')}
              </Link>
            </div>

            {/* Premium Monthly */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl flex flex-col h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t('landing.plans.monthly.name')}
              </h3>
              <div className="mb-6">
                <p className="text-5xl font-extrabold text-blue-600 mb-2">
                  {t('landing.plans.monthly.price')}
                  <span className="text-2xl">/{t('landing.plans.monthly.period')}</span>
                </p>
              </div>
              
              <ul className="space-y-4 flex-grow mb-8">
                {(t('landing.plans.monthly.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/premium"
                className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                {t('landing.plans.monthly.cta')}
              </Link>
            </div>

            {/* Premium Yearly - Best Value */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl transform scale-105 border-4 border-amber-400 flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                {t('landing.plans.yearly.badge')}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('landing.plans.yearly.name')}
              </h3>
              <div className="mb-6">
                <p className="text-5xl font-extrabold text-white mb-2">
                  {t('landing.plans.yearly.price')}
                  <span className="text-2xl">/{t('landing.plans.yearly.period')}</span>
                </p>
                <p className="text-sm text-blue-100">
                  {t('landing.plans.yearly.savings')}
                </p>
              </div>
              
              <ul className="space-y-4 flex-grow mb-8">
                {(t('landing.plans.yearly.features', { returnObjects: true }) as unknown as string[]).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/premium"
                className="mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 bg-white text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                {t('landing.plans.yearly.cta')}
              </Link>
            </div>
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
            <p className="text-xl text-blue-100 mb-4 font-medium">
              {t('landing.atsExplainer.subtitle')}
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              {t('landing.atsExplainer.description')}
            </p>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {(t('landing.atsExplainer.benefits', { returnObjects: true }) as unknown as { icon: string; title: string; description: string }[]).map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
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
              to="/pricing"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 gap-2 hover:scale-105"
            >
              <Target className="w-5 h-5" />
              {t('landing.atsExplainer.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Línea conectora en desktop */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            
            {(t('landing.howItWorks.steps', { returnObjects: true }) as unknown as { number: number; icon: string; title: string; description: string }[]).map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Número con diseño moderno */}
                <div className="relative mx-auto w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl transform hover:scale-110 transition-transform z-10">
                  {step.number}
                </div>
                
                {/* Icono */}
                <div className="flex justify-center mb-4">
                  <IconWrapper name={step.icon} className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
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
          
          {/* Link a más info */}
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

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-2xl text-blue-100 mb-4">
            {t('landing.cta.subtitle')}
          </p>
          <p className="text-lg text-slate-300 mb-10">
            {t('landing.cta.description')}
          </p>
          
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
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t('landing.testimonials.title')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('landing.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(t('landing.testimonials.items', { returnObjects: true }) as unknown as { rating: number; content: string; name: string; role: string }[]).map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
