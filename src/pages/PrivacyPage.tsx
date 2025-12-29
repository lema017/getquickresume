import { useTranslation } from 'react-i18next';

export function PrivacyPage() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
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
  );
}
