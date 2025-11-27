import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';

export function PricingPage() {
  const { t } = useTranslation();

  const packages = [
    {
      name: 'Starter Pack',
      price: '$2',
      credits: '50',
      description: 'Perfecto para Probar',
      features: [
        'Créditos suficientes para probar',
        'Ideal para comenzar',
        'Sin compromisos',
      ],
      popular: false,
    },
    {
      name: 'Essential Pack',
      price: '$5',
      credits: '150',
      description: 'Lo Más Popular',
      features: [
        'Créditos para 3-5 CVs completos',
        'Acceso a todas las funciones',
        'Soporte prioritario',
      ],
      popular: true,
    },
    {
      name: 'Professional Pack',
      price: '$12',
      credits: '300',
      description: 'Máximo Valor',
      features: [
        'Créditos para 6-10 CVs',
        'Funciones premium avanzadas',
        'Analíticas completas',
      ],
      popular: false,
    },
    {
      name: 'Premium Unlimited',
      price: '$25',
      credits: '750',
      description: 'Todo Incluido',
      features: [
        'Créditos para 15+ CVs',
        'Todas las funciones premium',
        'Soporte dedicado',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Planes y Precios
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Elige el paquete que mejor se adapte a tus necesidades. Sin suscripciones, solo pagas por lo que necesitas.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl ${
                  pkg.popular 
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-2xl' 
                    : 'bg-white border border-slate-200 shadow-lg'
                } hover:shadow-2xl transition-all duration-300`}
              >
                {/* Badge Popular */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Más Popular
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {pkg.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">
                      {pkg.price}
                    </span>
                    <span className="text-slate-600 ml-2">
                      / {pkg.credits} créditos
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to="/login"
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Comenzar Ahora
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">
            Preguntas Frecuentes sobre Precios
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ¿Los créditos expiran?
              </h3>
              <p className="text-slate-600">
                Los créditos no tienen fecha de expiración fija. Sin embargo, recomendamos usarlos regularmente para mantener tu cuenta activa.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ¿Puedo cambiar de paquete después?
              </h3>
              <p className="text-slate-600">
                Sí, puedes comprar paquetes adicionales en cualquier momento. Los créditos se suman a tu saldo actual.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ¿Hay descuentos por volumen?
              </h3>
              <p className="text-slate-600">
                Sí, los paquetes más grandes ofrecen mejor valor por crédito. El paquete Professional ofrece el mejor precio por crédito.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                ¿Qué métodos de pago aceptan?
              </h3>
              <p className="text-slate-600">
                Aceptamos tarjetas de crédito, PayPal y otros métodos de pago seguros. Todos los pagos son procesados de forma segura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Crea tu CV profesional en minutos con nuestros créditos premium
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              Comenzar Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/" 
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
