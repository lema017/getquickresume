import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { Check, Star, Zap, Globe, Shield, Crown, Brain, Award, Target, Briefcase, Send, Layout, QrCode, BarChart2 } from 'lucide-react';
import { IconWrapper } from '@/components/IconWrapper';
import { FeatureCard } from '@/components/FeatureCard';
import { CreditsExplainer } from '@/components/CreditsExplainer';
import { PremiumFeatureModal } from '@/components/PremiumFeatureModal';

export function PremiumPage() {
  const { t } = useTranslation();
  const { user, addTokens } = useAuthStore();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const premiumFeatures = [
    {
      id: 'aiEnhancement',
      icon: 'brain',
      title: t('premium.features.aiEnhancement.title'),
      description: t('premium.features.aiEnhancement.description'),
      tokens: Number(t('premium.features.aiEnhancement.tokens')),
      badge: 'Más Popular'
    },
    {
      id: 'aiScoring',
      icon: 'award',
      title: t('premium.features.aiScoring.title'),
      description: t('premium.features.aiScoring.description'),
      tokens: Number(t('premium.features.aiScoring.tokens'))
    },
    {
      id: 'jobOptimizer',
      icon: 'target',
      title: t('premium.features.jobOptimizer.title'),
      description: t('premium.features.jobOptimizer.description'),
      tokens: Number(t('premium.features.jobOptimizer.tokens'))
    },
    {
      id: 'onlineResume',
      icon: 'globe',
      title: t('premium.features.onlineResume.title'),
      description: t('premium.features.onlineResume.description'),
      tokens: Number(t('premium.features.onlineResume.tokens'))
    },
    {
      id: 'jobApplications',
      icon: 'send',
      title: t('premium.features.jobApplications.title'),
      description: t('premium.features.jobApplications.description'),
      tokens: Number(t('premium.features.jobApplications.tokens'))
    },
    {
      id: 'premiumTemplates',
      icon: 'layout',
      title: t('premium.features.premiumTemplates.title'),
      description: t('premium.features.premiumTemplates.description'),
      tokens: Number(t('premium.features.premiumTemplates.tokens'))
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
  };

  const handleCloseModal = () => {
    setSelectedFeature(null);
  };

  const getSelectedFeatureData = () => {
    if (!selectedFeature) return null;
    const feature = premiumFeatures.find(f => f.id === selectedFeature);
    if (!feature) return null;
    
    return {
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      detailedDescription: t(`premium.features.${selectedFeature}.detailedDescription`),
      tokens: feature.tokens,
      benefits: t(`premium.features.${selectedFeature}.benefits`, { returnObjects: true }) as unknown as string[],
      howItWorks: t(`premium.features.${selectedFeature}.howItWorks`),
      useCases: t(`premium.features.${selectedFeature}.useCases`, { returnObjects: true }) as unknown as string[],
      example: t(`premium.features.${selectedFeature}.example`, { returnObjects: true }) as unknown as { before: string; after: string },
      popular: feature.badge === 'Más Popular'
    };
  };

  const tokenSystemSteps = [
    {
      icon: 'gift',
      title: 'Gana',
      description: 'Recibe créditos al registrarte'
    },
    {
      icon: 'zap',
      title: 'Usa',
      description: 'Accede a funciones premium'
    },
    {
      icon: 'credit-card',
      title: 'Compra',
      description: 'Adquiere más cuando necesites'
    }
  ];

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      tokens: '50',
      price: '$4.99',
      description: 'Perfecto para empezar',
      features: [
        'Acceso a funciones básicas IA',
        'Descarga de CV (PDF)',
        'Soporte estándar',
      ],
      highlight: false,
    },
    {
      id: 'essential',
      name: 'Essential',
      tokens: '150',
      price: '$12.99',
      description: 'Ideal para uso regular',
      features: [
        'Todo lo de Starter',
        'Generación de Carta de Presentación',
        'Plantillas Premium',
        'Prioridad en soporte',
      ],
      highlight: true,
    },
    {
      id: 'professional',
      name: 'Professional',
      tokens: '300',
      price: '$24.99',
      description: 'Para profesionales serios',
      features: [
        'Todo lo de Essential',
        'Revisión IA con Puntuación',
        'Optimización ATS',
        'Analíticas Avanzadas',
      ],
      highlight: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      tokens: '750',
      price: '$49.99',
      description: 'Máximo rendimiento',
      features: [
        'Todo lo de Professional',
        'Hosting Profesional de CV',
        'Soporte VIP 24/7',
        'Acceso anticipado a nuevas funciones',
      ],
      highlight: false,
    },
  ];

  const handlePurchase = (packageId: string) => {
    // Mock purchase logic
    const tokenAmount = parseInt(packages.find(p => p.id === packageId)?.tokens || '0');
    addTokens(tokenAmount);
    alert(`¡Compra exitosa! Has recibido ${tokenAmount} tokens.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
              Desbloquea Funcionalidades Profesionales con IA
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-4 font-medium">
              Tokens para mejorar tu CV y acelerar tu búsqueda laboral
            </p>
            {user && (
              <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium mb-8">
                <Crown className="w-5 h-5 mr-2" />
                Tokens disponibles: {user.tokens?.toLocaleString() || '0'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Token System Explanation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Sistema de Tokens
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple, flexible y transparente
            </p>
          </div>
          
          <CreditsExplainer features={tokenSystemSteps} />
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Funcionalidades Premium
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Desbloquea todo tu potencial profesional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                tokens={feature.tokens}
                onClick={() => handleFeatureClick(feature.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Token Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Paquetes de Tokens
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Elige el paquete que mejor se adapte a tus necesidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative p-8 rounded-3xl shadow-xl flex flex-col h-full ${
                  pkg.highlight 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white transform scale-105 border-4 border-amber-400' 
                    : 'bg-white border border-slate-200 text-slate-900'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    Más Popular
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-4 ${pkg.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {pkg.name}
                </h3>
                
                <p className={`text-5xl font-extrabold mb-2 ${pkg.highlight ? 'text-white' : 'text-blue-600'}`}>
                  {pkg.price}
                </p>
                
                <p className={`text-sm mb-6 ${pkg.highlight ? 'text-blue-100' : 'text-slate-500'}`}>
                  {pkg.tokens} Créditos Premium
                </p>
                
                <p className={`text-sm mb-6 ${pkg.highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                  {pkg.description}
                </p>
                
                <ul className="space-y-3 flex-grow mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className={`w-5 h-5 ${pkg.highlight ? 'text-amber-400' : 'text-green-500'} mr-3 flex-shrink-0`} />
                      <span className={`${pkg.highlight ? 'text-blue-100' : 'text-slate-700'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePurchase(pkg.id)}
                  className={`mt-auto w-full py-3 rounded-lg font-semibold text-center transition-all duration-300 ${
                    pkg.highlight 
                      ? 'bg-white text-blue-700 hover:bg-blue-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Comprar {pkg.tokens} Créditos
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: '¿Qué son los tokens premium?',
                answer: 'Son unidades que te permiten acceder a funcionalidades profesionales como descarga sin marca, revisión IA, analíticas y más. Recibes créditos al registrarte y puedes comprar más cuando los necesites.',
              },
              {
                question: '¿Los tokens expiran?',
                answer: 'Actualmente, los tokens no tienen fecha de expiración. Puedes usarlos cuando los necesites.',
              },
              {
                question: '¿Puedo obtener un reembolso?',
                answer: 'Ofrecemos reembolsos dentro de los 14 días posteriores a la compra si no has utilizado los créditos. Contacta a soporte para más detalles.',
              },
              {
                question: '¿Cómo sé cuántos créditos necesito?',
                answer: 'Cada funcionalidad premium indica claramente cuántos créditos consume. Puedes ver el detalle en la sección de funcionalidades de nuestra página de inicio.',
              },
              {
                question: '¿Es realmente gratis comenzar?',
                answer: 'Sí, crear tu cuenta y usar el creador de CV es completamente gratis. Incluye créditos premium de bienvenida para probar funcionalidades avanzadas.',
              },
              {
                question: '¿Necesito tarjeta de crédito?',
                answer: 'No. Puedes registrarte y comenzar sin proporcionar información de pago.',
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-white hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Listo para impulsar tu carrera?
          </h2>
          <p className="text-2xl text-blue-100 mb-4">
            Crea tu CV profesional y desbloquea funciones premium.
          </p>
          <p className="text-lg text-slate-300 mb-10">
            Comienza gratis con créditos de bienvenida. Sin tarjeta requerida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/wizard/step-1'}
              className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Crear Mi CV Gratis
            </button>
            
            <button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Contactar Soporte
            </button>
          </div>
        </div>
      </section>

      {/* Premium Feature Modal */}
      {selectedFeature && (
        <PremiumFeatureModal
          isOpen={!!selectedFeature}
          onClose={handleCloseModal}
          feature={getSelectedFeatureData()!}
        />
      )}
    </div>
  );
}