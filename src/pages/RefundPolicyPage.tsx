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
              January 13, 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '1. Todas las Ventas Son Finales' : '1. All Sales Are Final'}
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-gray-700 font-medium">
                  {isSpanish
                    ? 'Todas las compras realizadas en getquickresume.com son finales y no reembolsables. Al completar una compra, aceptas esta política de no reembolsos.'
                    : 'All purchases made on getquickresume.com are final and non-refundable. By completing a purchase, you agree to this no refund policy.'}
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Te recomendamos revisar cuidadosamente las características y beneficios de nuestros planes antes de realizar tu compra.'
                  : 'We encourage you to carefully review the features and benefits of our plans before making your purchase.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '2. Contenido Digital y Acceso Inmediato' : '2. Digital Content and Immediate Access'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Nuestros servicios Premium son contenido digital que se pone a disposición inmediatamente después de la compra. Debido a la naturaleza del contenido digital y el acceso inmediato proporcionado:'
                  : 'Our Premium services are digital content that is made available immediately upon purchase. Due to the nature of digital content and the immediate access provided:'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>
                  {isSpanish
                    ? 'El acceso a las funciones Premium se activa instantáneamente'
                    : 'Access to Premium features is activated instantly'}
                </li>
                <li>
                  {isSpanish
                    ? 'No se ofrecen reembolsos una vez que el acceso ha sido otorgado'
                    : 'No refunds are offered once access has been granted'}
                </li>
                <li>
                  {isSpanish
                    ? 'Todos los pagos son procesados de forma segura por PayPal'
                    : 'All payments are processed securely by PayPal'}
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '3. Derechos del Consumidor de la UE/Reino Unido' : '3. EU/UK Consumer Rights'}
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isSpanish ? 'Derecho de Desistimiento de 14 Días' : '14-Day Right of Withdrawal'}
                </h3>
                <p className="text-gray-700 mb-2">
                  {isSpanish
                    ? 'Si eres un consumidor residente en la Unión Europea o Reino Unido, tienes derecho a cancelar tu compra dentro de los 14 días sin necesidad de justificación, SIEMPRE Y CUANDO no hayas accedido al contenido digital.'
                    : 'If you are a consumer resident in the European Union or United Kingdom, you have the right to cancel your purchase within 14 days without giving any reason, PROVIDED THAT you have not accessed the digital content.'}
                </p>
                <p className="text-gray-700 font-medium">
                  {isSpanish
                    ? 'Al completar tu compra y acceder a las funciones Premium, consientes el inicio inmediato del servicio y reconoces que pierdes tu derecho de desistimiento una vez que el acceso al contenido digital ha comenzado.'
                    : 'By completing your purchase and accessing Premium features, you consent to immediate performance of the service and acknowledge that you lose your right of withdrawal once digital content access has begun.'}
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Para ejercer este derecho (antes de acceder al contenido), contacta a nuestro equipo de soporte antes de que expire el período de 14 días.'
                  : 'To exercise this right (before accessing content), contact our support team before the 14-day period expires.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '4. Suscripciones' : '4. Subscriptions'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Las suscripciones de pago se renuevan automáticamente hasta que se cancelen.'
                  : 'Paid subscriptions automatically renew until cancelled.'}
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isSpanish ? 'Política de Cancelación' : 'Cancellation Policy'}
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    {isSpanish
                      ? 'Puedes cancelar tu suscripción en cualquier momento'
                      : 'You may cancel your subscription at any time'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'Al cancelar, mantendrás acceso a las funciones Premium hasta el final del período de facturación actual'
                      : 'Upon cancellation, you will retain access to Premium features until the end of your current billing period'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'No se ofrecen reembolsos por períodos de suscripción no utilizados'
                      : 'No refunds are offered for unused subscription periods'}
                  </li>
                  <li>
                    {isSpanish
                      ? 'No se ofrecen reembolsos prorrateados'
                      : 'No prorated refunds are offered'}
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '5. Circunstancias Excepcionales' : '5. Exceptional Circumstances'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Las únicas excepciones a nuestra política de no reembolsos son:'
                  : 'The only exceptions to our no refund policy are:'}
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <ul className="list-disc list-inside text-gray-700 space-y-3">
                  <li>
                    <strong>{isSpanish ? 'Cargos duplicados:' : 'Duplicate charges:'}</strong>{' '}
                    {isSpanish
                      ? 'Si se te cobra incorrectamente múltiples veces por la misma transacción.'
                      : 'If you are incorrectly charged multiple times for the same transaction.'}
                  </li>
                  <li>
                    <strong>{isSpanish ? 'Errores de facturación:' : 'Billing errors:'}</strong>{' '}
                    {isSpanish
                      ? 'Si hay un error verificable en el monto cobrado.'
                      : 'If there is a verifiable error in the amount charged.'}
                  </li>
                </ul>
              </div>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Para reportar cargos duplicados o errores de facturación, contacta a nuestro equipo de soporte con tu número de pedido de PayPal.'
                  : 'To report duplicate charges or billing errors, contact our support team with your PayPal order number.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '6. Ley Aplicable' : '6. Governing Law'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Esta política está sujeta a las leyes aplicables:'
                  : 'This policy is subject to applicable laws:'}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  {isSpanish
                    ? 'Para compradores en Estados Unidos: se aplica la ley del Estado de Nueva York'
                    : 'For buyers in the United States: the laws of the State of New York apply'}
                </li>
                <li>
                  {isSpanish
                    ? 'Para todos los demás compradores: se aplica la ley de México'
                    : 'For all other buyers: the laws of Mexico apply'}
                </li>
                <li>
                  {isSpanish
                    ? 'Los consumidores de la UE/Reino Unido se benefician de las disposiciones obligatorias de la ley de su país de residencia'
                    : 'EU/UK consumers benefit from mandatory provisions of the law of their country of residence'}
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {isSpanish ? '7. Contacto' : '7. Contact'}
              </h2>
              <p className="text-gray-600 mb-4">
                {isSpanish
                  ? 'Si tienes preguntas sobre esta política:'
                  : 'If you have questions about this policy:'}
              </p>
              <a 
                href="/support" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                {isSpanish ? 'Contactar Soporte' : 'Contact Support'}
              </a>
              <p className="text-gray-600 mt-6">
                {isSpanish
                  ? 'Para más información, consulta nuestra '
                  : 'For more information, see our '}
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
