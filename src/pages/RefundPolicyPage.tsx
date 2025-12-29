import { useTranslation } from 'react-i18next';

export function RefundPolicyPage() {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('legal.refund.title')}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>{isSpanish ? 'Última actualización:' : 'Last Updated:'}</strong>{' '}
              {new Date().toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '1. Introducción' : '1. Introduction'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish 
                  ? 'Esta Política de Reembolsos ("Política") describe los términos y condiciones bajo los cuales getquickresume.com ("nosotros", "nuestro", "la empresa") maneja las solicitudes de reembolso para nuestros servicios de suscripción Premium. Al suscribirte a nuestros servicios Premium, aceptas esta Política de Reembolsos.'
                  : 'This Refund Policy ("Policy") describes the terms and conditions under which getquickresume.com ("we", "our", "the company") handles refund requests for our Premium subscription services. By subscribing to our Premium services, you agree to this Refund Policy.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '2. Política de No Reembolsos' : '2. No Refund Policy'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'getquickresume.com no ofrece reembolsos por pagos de suscripción Premium ya realizados. Esta política se aplica a:'
                  : 'getquickresume.com does not offer refunds for Premium subscription payments that have already been made. This policy applies to:'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  {isSpanish
                    ? 'Suscripciones mensuales ($9.99/mes)'
                    : 'Monthly subscriptions ($9.99/month)'}
                </li>
                <li>
                  {isSpanish
                    ? 'Suscripciones anuales ($59.99/año)'
                    : 'Annual subscriptions ($59.99/year)'}
                </li>
                <li>
                  {isSpanish
                    ? 'Cualquier período de facturación ya transcurrido'
                    : 'Any billing period that has already elapsed'}
                </li>
              </ul>
              <p className="text-gray-600 mb-4 mt-4">
                {isSpanish
                  ? 'Una vez que se procesa un pago de suscripción, no se otorgan reembolsos por ese período de facturación, independientemente del uso del servicio.'
                  : 'Once a subscription payment has been processed, no refunds are granted for that billing period, regardless of service usage.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '3. Naturaleza del Servicio Digital' : '3. Digital Service Nature'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Nuestros servicios Premium son servicios digitales que se proporcionan inmediatamente después del pago. Esto incluye:'
                  : 'Our Premium services are digital services that are provided immediately upon payment. This includes:'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  {isSpanish
                    ? 'Acceso inmediato a todas las funciones Premium'
                    : 'Immediate access to all Premium features'}
                </li>
                <li>
                  {isSpanish
                    ? 'Servicios de IA para mejora de currículums'
                    : 'AI services for resume enhancement'}
                </li>
                <li>
                  {isSpanish
                    ? 'Traducción automática a múltiples idiomas'
                    : 'Automatic translation to multiple languages'}
                </li>
                <li>
                  {isSpanish
                    ? 'Plantillas Premium y funciones avanzadas'
                    : 'Premium templates and advanced features'}
                </li>
              </ul>
              <p className="text-gray-600 mb-4 mt-4">
                {isSpanish
                  ? 'Debido a la naturaleza digital e inmediata de nuestros servicios, y dado que ofrecemos una versión gratuita con funcionalidades básicas para todos los usuarios, no ofrecemos reembolsos una vez que se ha procesado el pago.'
                  : 'Due to the digital and immediate nature of our services, and given that we offer a free version with basic functionality for all users, we do not offer refunds once payment has been processed.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '4. Cancelación de Suscripción' : '4. Subscription Cancellation'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Aunque no ofrecemos reembolsos, puedes cancelar tu suscripción Premium en cualquier momento:'
                  : 'While we do not offer refunds, you may cancel your Premium subscription at any time:'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  {isSpanish
                    ? 'La cancelación detiene la facturación futura automática'
                    : 'Cancellation stops future automatic billing'}
                </li>
                <li>
                  {isSpanish
                    ? 'Mantendrás acceso a todas las funciones Premium hasta el final del período de facturación actual'
                    : 'You will retain access to all Premium features until the end of your current billing period'}
                </li>
                <li>
                  {isSpanish
                    ? 'No se emitirán reembolsos por el tiempo restante en tu período de facturación actual'
                    : 'No refunds will be issued for the remaining time in your current billing period'}
                </li>
                <li>
                  {isSpanish
                    ? 'Puedes cancelar desde la página de tu cuenta en cualquier momento'
                    : 'You can cancel from your account page at any time'}
                </li>
              </ul>
              <p className="text-gray-600 mb-4 mt-4">
                {isSpanish
                  ? 'La cancelación de tu suscripción es diferente de un reembolso. Al cancelar, simplemente evitas cargos futuros, pero no recibirás un reembolso por el período ya pagado.'
                  : 'Canceling your subscription is different from a refund. By canceling, you simply prevent future charges, but you will not receive a refund for the period already paid.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '5. Excepciones' : '5. Exceptions'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'En casos excepcionales, podemos considerar un reembolso bajo las siguientes circunstancias:'
                  : 'In exceptional cases, we may consider a refund under the following circumstances:'}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isSpanish ? 'A. Problemas Técnicos' : 'A. Technical Issues'}
                </h3>
                <p className="text-gray-600 mb-2">
                  {isSpanish
                    ? 'Si experimentas problemas técnicos que te impiden utilizar el servicio Premium durante un período prolongado (más de 7 días consecutivos), y nuestros esfuerzos de soporte técnico no han resuelto el problema, podemos considerar un reembolso prorrateado.'
                    : 'If you experience technical issues that prevent you from using the Premium service for an extended period (more than 7 consecutive days), and our technical support efforts have not resolved the issue, we may consider a prorated refund.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isSpanish
                    ? 'Para solicitar un reembolso por problemas técnicos, debes contactar a nuestro equipo de soporte y proporcionar evidencia del problema técnico.'
                    : 'To request a refund for technical issues, you must contact our support team and provide evidence of the technical problem.'}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isSpanish ? 'B. Cargos Duplicados' : 'B. Duplicate Charges'}
                </h3>
                <p className="text-gray-600 mb-2">
                  {isSpanish
                    ? 'Si se te cobra múltiples veces por la misma suscripción debido a un error en nuestro sistema o en el procesador de pagos, reembolsaremos inmediatamente los cargos duplicados una vez verificados.'
                    : 'If you are charged multiple times for the same subscription due to an error in our system or payment processor, we will immediately refund the duplicate charges once verified.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isSpanish
                    ? 'Para reportar un cargo duplicado, contacta a nuestro equipo de soporte con los detalles de la transacción, incluyendo números de transacción y fechas.'
                    : 'To report a duplicate charge, contact our support team with transaction details, including transaction numbers and dates.'}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '6. Política de Contracargos' : '6. Chargeback Policy'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Si inicias un contracargo (chargeback) con tu banco o proveedor de tarjeta de crédito en lugar de contactarnos primero, tu cuenta puede ser suspendida o cancelada inmediatamente. Los contracargos pueden resultar en:'
                  : 'If you initiate a chargeback with your bank or credit card provider instead of contacting us first, your account may be suspended or canceled immediately. Chargebacks may result in:'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  {isSpanish
                    ? 'Suspensión inmediata de tu cuenta'
                    : 'Immediate suspension of your account'}
                </li>
                <li>
                  {isSpanish
                    ? 'Pérdida de acceso a todos los servicios Premium'
                    : 'Loss of access to all Premium services'}
                </li>
                <li>
                  {isSpanish
                    ? 'Prohibición permanente de futuras suscripciones'
                    : 'Permanent ban from future subscriptions'}
                </li>
              </ul>
              <p className="text-gray-600 mb-4 mt-4">
                {isSpanish
                  ? 'Te recomendamos encarecidamente que contactes a nuestro equipo de soporte antes de iniciar un contracargo. Estamos comprometidos a resolver cualquier problema de manera justa y rápida.'
                  : 'We strongly recommend that you contact our support team before initiating a chargeback. We are committed to resolving any issues fairly and quickly.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '7. Proceso de Solicitud de Reembolso' : '7. Refund Request Process'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Si crees que calificas para una excepción bajo esta Política, debes:'
                  : 'If you believe you qualify for an exception under this Policy, you must:'}
              </p>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>
                  {isSpanish
                    ? 'Contactar a nuestro equipo de soporte por email dentro de los 30 días posteriores al cargo en cuestión'
                    : 'Contact our support team by email within 30 days of the charge in question'}
                </li>
                <li>
                  {isSpanish
                    ? 'Proporcionar información detallada sobre tu solicitud, incluyendo:'
                    : 'Provide detailed information about your request, including:'}
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>
                      {isSpanish
                        ? 'Número de transacción o ID de suscripción'
                        : 'Transaction number or subscription ID'}
                    </li>
                    <li>
                      {isSpanish
                        ? 'Fecha del cargo'
                        : 'Date of charge'}
                    </li>
                    <li>
                      {isSpanish
                        ? 'Descripción detallada del problema o razón para el reembolso'
                        : 'Detailed description of the issue or reason for refund'}
                    </li>
                    <li>
                      {isSpanish
                        ? 'Cualquier evidencia relevante (capturas de pantalla, emails, etc.)'
                        : 'Any relevant evidence (screenshots, emails, etc.)'}
                    </li>
                  </ul>
                </li>
                <li>
                  {isSpanish
                    ? 'Permitir a nuestro equipo investigar y responder a tu solicitud (típicamente dentro de 5-7 días hábiles)'
                    : 'Allow our team to investigate and respond to your request (typically within 5-7 business days)'}
                </li>
              </ol>
              <p className="text-gray-600 mb-4 mt-4">
                {isSpanish
                  ? 'Todas las decisiones de reembolso son a nuestra sola discreción y se basan en los méritos de cada caso individual.'
                  : 'All refund decisions are at our sole discretion and are based on the merits of each individual case.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '8. Cambios a esta Política' : '8. Changes to this Policy'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Nos reservamos el derecho de modificar esta Política de Reembolsos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en esta página. Te recomendamos revisar esta política periódicamente para estar informado sobre cualquier actualización.'
                  : 'We reserve the right to modify this Refund Policy at any time. Changes will take effect immediately upon posting on this page. We recommend reviewing this policy periodically to stay informed of any updates.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '9. Contacto' : '9. Contact'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Si tienes preguntas sobre esta Política de Reembolsos o necesitas solicitar un reembolso bajo las excepciones mencionadas, por favor envía un ticket de soporte a través de nuestro sistema de soporte.'
                  : 'If you have questions about this Refund Policy or need to request a refund under the exceptions mentioned, please submit a support ticket through our support system.'}
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
                      ? 'Completa el formulario de ticket de soporte con los detalles de tu consulta o solicitud de reembolso'
                      : 'Complete the support ticket form with details of your inquiry or refund request'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Incluye toda la información relevante, como números de transacción, fechas y cualquier evidencia que pueda ser útil'
                      : 'Include all relevant information, such as transaction numbers, dates, and any evidence that may be helpful'}
                  </li>
                </ol>
                <a 
                  href="/support" 
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isSpanish ? 'Ir a la Página de Soporte' : 'Go to Support Page'}
                </a>
              </div>
              <p className="text-gray-600 mb-4 mt-4">
                {isSpanish
                  ? 'Para más información sobre nuestros términos de servicio, consulta nuestra '
                  : 'For more information about our terms of service, please see our '}
                <a href="/legal/terms" className="text-blue-600 hover:underline">
                  {isSpanish ? 'Página de Términos de Servicio' : 'Terms of Service page'}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

