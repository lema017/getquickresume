import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  getPageSEO, 
  BASE_URL, 
  generateArticleSchema 
} from '@/utils/seoConfig';

export function PrivacyPage() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const lang = (i18n.language === 'es' ? 'es' : 'en') as 'en' | 'es';
  const seo = getPageSEO('privacy', lang);
  const pageUrl = `${BASE_URL}/legal/privacy`;
  const articleSchema = generateArticleSchema(
    seo.title,
    seo.description,
    '2024-01-01',
    '2024-01-01'
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
        <meta property="og:type" content={seo.ogType || 'article'} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="GetQuickResume" />
        <meta property="og:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage || `${BASE_URL}/images/og-default.png`} />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={lang === 'es' 
          ? 'política de privacidad, privacidad de datos, protección de datos, gdpr, privacidad cv'
          : 'privacy policy, data privacy, data protection, gdpr, resume privacy'
        } />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('legal.privacy.title')}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> 1 de enero de 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Información que recopilamos
              </h2>
              <p className="text-gray-600 mb-4">
                Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, 
                completas tu perfil o utilizas nuestros servicios.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Información de perfil (nombre, email, ubicación)</li>
                <li>Datos de tu currículum y experiencia profesional</li>
                <li>Información de autenticación de terceros (Google, Facebook, LinkedIn)</li>
                <li>Datos de uso de la plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Cómo utilizamos tu información
              </h2>
              <p className="text-gray-600 mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Personalizar tu experiencia en la plataforma</li>
                <li>Optimizar tu currículum utilizando inteligencia artificial</li>
                <li>Procesar traducciones y mejoras de contenido</li>
                <li>Comunicarnos contigo sobre actualizaciones y mejoras</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Compartir información
              </h2>
              <p className="text-gray-600 mb-4">
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Con tu consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales</li>
                <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
                <li>En caso de fusión, adquisición o venta de activos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Seguridad de datos
              </h2>
              <p className="text-gray-600 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Encriptación de datos en tránsito y en reposo</li>
                <li>Acceso restringido a información personal</li>
                <li>Monitoreo regular de seguridad</li>
                <li>Capacitación del personal en privacidad y seguridad</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Tus derechos
              </h2>
              <p className="text-gray-600 mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Corregir información inexacta</li>
                <li>Eliminar tu cuenta y datos asociados</li>
                <li>Exportar tus datos</li>
                <li>Oponerte al procesamiento de tu información</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Cookies y tecnologías similares
              </h2>
              <p className="text-gray-600 mb-4">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso 
                de la plataforma y personalizar el contenido. Puedes controlar el uso de cookies a través 
                de la configuración de tu navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Cambios a esta política
              </h2>
              <p className="text-gray-600 mb-4">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre 
                cambios significativos a través de la plataforma o por email. Te recomendamos revisar 
                esta política periódicamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '8. Contacto' : '8. Contact'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información, por favor envía un ticket de soporte a través de nuestro sistema de soporte.'
                  : 'If you have questions about this Privacy Policy or how we handle your information, please submit a support ticket through our support system.'}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-4">
                  {isSpanish
                    ? 'Para contactarnos, por favor:'
                    : 'To contact us, please:'}
                </p>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                  <li>
                    {isSpanish
                      ? 'Visita nuestra página de soporte'
                      : 'Visit our support page'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Completa el formulario de ticket de soporte con los detalles de tu consulta'
                      : 'Complete the support ticket form with details of your inquiry'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Incluye toda la información relevante que pueda ser útil para responder tu consulta'
                      : 'Include all relevant information that may be helpful in addressing your inquiry'}
                  </li>
                </ol>
                <a 
                  href="/support" 
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isSpanish ? 'Ir a la Página de Soporte' : 'Go to Support Page'}
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
