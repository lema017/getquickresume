import { useTranslation } from 'react-i18next';

export function TermsPage() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('legal.terms.title')}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Aceptación de términos
              </h2>
              <p className="text-gray-600 mb-4">
                Al acceder y utilizar getquickresume.com, aceptas estar sujeto a estos Términos de Servicio. 
                Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestro servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Descripción del servicio
              </h2>
              <p className="text-gray-600 mb-4">
                getquickresume.com es una plataforma en línea que permite a los usuarios crear, optimizar 
                y traducir currículums profesionales utilizando inteligencia artificial. Nuestros servicios incluyen:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Creación de currículums mediante wizard guiado</li>
                <li>Optimización de contenido con IA</li>
                <li>Traducción automática a múltiples idiomas</li>
                <li>Plantillas profesionales y personalizables</li>
                <li>Descarga en múltiples formatos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Cuentas de usuario
              </h2>
              <p className="text-gray-600 mb-4">
                Para utilizar nuestros servicios, debes crear una cuenta utilizando un proveedor de 
                autenticación social (Google, Facebook o LinkedIn). Eres responsable de:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Mantener la confidencialidad de tu cuenta</li>
                <li>Proporcionar información precisa y actualizada</li>
                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
                <li>Ser responsable de todas las actividades bajo tu cuenta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Uso aceptable
              </h2>
              <p className="text-gray-600 mb-4">
                Al utilizar nuestro servicio, te comprometes a:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Utilizar el servicio solo para fines legítimos</li>
                <li>No intentar acceder a sistemas o datos no autorizados</li>
                <li>No utilizar el servicio para actividades ilegales o fraudulentas</li>
                <li>No interferir con el funcionamiento del servicio</li>
                <li>Respetar los derechos de propiedad intelectual</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Contenido del usuario
              </h2>
              <p className="text-gray-600 mb-4">
                Mantienes todos los derechos sobre el contenido que creas en nuestra plataforma. 
                Al utilizar nuestros servicios, nos otorgas una licencia limitada para:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Procesar y almacenar tu contenido</li>
                <li>Proporcionar las funciones del servicio</li>
                <li>Mejorar nuestros algoritmos de IA</li>
                <li>Generar traducciones y optimizaciones</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Planes y pagos
              </h2>
              <p className="text-gray-600 mb-4">
                Ofrecemos tanto servicios gratuitos como de pago:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Los servicios básicos son gratuitos con limitaciones</li>
                <li>Los servicios Premium requieren una suscripción mensual ($15/mes) o anual ($126/año)</li>
                <li>Los pagos son procesados de forma segura por PayPal, nuestro proveedor de pagos</li>
                <li>Las suscripciones se renuevan automáticamente al final de cada período de facturación</li>
                <li>Puedes cancelar tu suscripción en cualquier momento desde la página de tu cuenta</li>
                <li>Al cancelar, mantendrás acceso a las funciones Premium hasta el final del período de facturación actual</li>
                <li>No ofrecemos reembolsos. Al cancelar, mantendrás acceso hasta el final del período de facturación actual</li>
                <li>Nos reservamos el derecho de cambiar precios con notificación previa de al menos 30 días</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Propiedad intelectual
              </h2>
              <p className="text-gray-600 mb-4">
                El servicio y su contenido original, características y funcionalidad son propiedad 
                de getquickresume.com y están protegidos por leyes de derechos de autor, marcas registradas 
                y otras leyes de propiedad intelectual.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Limitación de responsabilidad
              </h2>
              <p className="text-gray-600 mb-4">
                En la máxima medida permitida por la ley, getquickresume.com no será responsable por:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Daños indirectos, incidentales o consecuenciales</li>
                <li>Pérdida de datos o información</li>
                <li>Interrupciones del servicio</li>
                <li>Resultados de entrevistas de trabajo o decisiones de contratación</li>
                <li>Errores en traducciones o optimizaciones de IA</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Terminación
              </h2>
              <p className="text-gray-600 mb-4">
                Podemos suspender o terminar tu acceso al servicio en cualquier momento, con o sin causa, 
                incluyendo por violación de estos términos. Puedes terminar tu cuenta en cualquier momento 
                eliminando tu perfil desde la configuración de tu cuenta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Cambios en los términos
              </h2>
              <p className="text-gray-600 mb-4">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                entrarán en vigor inmediatamente después de su publicación. Tu uso continuado del servicio 
                constituye aceptación de los términos modificados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Ley aplicable
              </h2>
              <p className="text-gray-600 mb-4">
                Estos términos se rigen por las leyes de México. Cualquier disputa será resuelta en los 
                tribunales competentes de la Ciudad de México.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '12. Contacto' : '12. Contact'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Si tienes preguntas sobre estos Términos de Servicio, por favor envía un ticket de soporte a través de nuestro sistema de soporte.'
                  : 'If you have questions about these Terms of Service, please submit a support ticket through our support system.'}
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
