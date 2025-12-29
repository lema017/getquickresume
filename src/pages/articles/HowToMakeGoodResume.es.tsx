import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, FileText, Layout, Zap, AlertTriangle, ClipboardCheck } from 'lucide-react';

export function HowToMakeGoodResumeES() {
  const article = getArticleBySlug('how-to-make-good-resume', 'es')!;
  const relatedArticles = getRelatedArticles(article.slug, 'es');

  return (
    <BlogLayout
      title={article.title}
      excerpt={article.excerpt}
      category={article.category}
      readTime={article.readTime}
      publishDate={article.publishDate}
      imageUrl={article.imageUrl}
      relatedArticles={relatedArticles}
    >
      {/* Introducción */}
      <p className="text-xl text-gray-600 leading-relaxed">
        Tu currículum es a menudo la primera impresión que causas en un posible empleador. De hecho, 
        <strong> los reclutadores pasan un promedio de solo 7 segundos</strong> revisando un currículum antes 
        de decidir si continúan leyendo. Eso significa que cada palabra, cada elección de formato y 
        cada detalle importa.
      </p>

      <p>
        Ya sea que estés entrando al mercado laboral por primera vez o buscando avanzar en tu 
        carrera, esta guía completa te mostrará todo lo que necesitas saber para crear un 
        currículum que destaque y te consiga entrevistas.
      </p>

      <SectionDivider icon={FileText}>Secciones Esenciales del Currículum</SectionDivider>

      <p>
        Un currículum bien estructurado facilita que los reclutadores encuentren la información 
        que necesitan rápidamente. Estas son las secciones imprescindibles que todo currículum debe incluir:
      </p>

      <StepHeading step={1}>Información de Contacto</StepHeading>

      <p>
        Esto parece obvio, pero te sorprendería cuántos candidatos cometen errores aquí. 
        Tu sección de contacto debe incluir:
      </p>

      <ul>
        <li><strong>Nombre completo</strong> — Usa tu nombre profesional, no apodos</li>
        <li><strong>Número de teléfono</strong> — Asegúrate de que tu buzón de voz sea profesional</li>
        <li><strong>Correo electrónico profesional</strong> — Evita direcciones como "fiestero@email.com"</li>
        <li><strong>Perfil de LinkedIn</strong> — Asegúrate de que coincida con tu currículum</li>
        <li><strong>Ciudad y país</strong> — La dirección completa ya no es necesaria</li>
      </ul>

      <p>
        <strong>Qué dejar fuera:</strong> Fecha de nacimiento, estado civil, foto (en la mayoría de 
        países occidentales) y perfiles de redes sociales irrelevantes.
      </p>

      <StepHeading step={2}>Resumen Profesional</StepHeading>

      <p>
        Tu resumen profesional es un pitch de 3-4 oraciones que vende tu propuesta de valor. 
        Piensa en él como tu elevator pitch en papel. Debe responder: <em>"¿Por qué deberíamos contratarte?"</em>
      </p>

      <blockquote>
        <strong>Ejemplo:</strong> "Gerente de marketing orientado a resultados con más de 8 años de experiencia 
        desarrollando campañas basadas en datos que aumentaron la adquisición de clientes en un 150%. Experto en 
        SEO, estrategia de contenido y automatización de marketing. Historial comprobado en la gestión de 
        presupuestos anuales de más de $2M mientras se superaban los objetivos de ROI."
      </blockquote>

      <p>
        ¿Notas cómo este ejemplo incluye números y logros específicos? Esa es la clave para un 
        resumen convincente.
      </p>

      <StepHeading step={3}>Experiencia Laboral</StepHeading>

      <p>
        Este es el corazón de tu currículum. Para cada puesto, incluye:
      </p>

      <ul>
        <li>Título del puesto</li>
        <li>Nombre de la empresa y ubicación</li>
        <li>Fechas de empleo (formato mes/año)</li>
        <li>3-5 viñetas destacando logros</li>
      </ul>

      <p>
        <strong>Consejo crítico:</strong> Enfócate en logros, no solo en responsabilidades. Cualquiera 
        puede listar las tareas del trabajo — lo que te hace destacar es mostrar el impacto que tuviste.
      </p>

      {/* Ejemplo Antes/Después */}
      <div className="my-8 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Antes (Débil)</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            "Responsable de gestionar las cuentas de redes sociales y crear contenido para la empresa."
          </p>
        </div>
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Después (Fuerte)</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            "Aumenté los seguidores de Instagram de 5K a 50K en 12 meses, generando más de 200 leads 
            calificados mensualmente a través de campañas de contenido estratégico."
          </p>
        </div>
      </div>

      <StepHeading step={4}>Sección de Habilidades</StepHeading>

      <p>
        Tu sección de habilidades debe ser una foto rápida de tus capacidades. Divídelas en:
      </p>

      <ul>
        <li><strong>Habilidades técnicas:</strong> Capacidades técnicas como lenguajes de programación, 
        dominio de software, certificaciones (Python, Salesforce, Gestión de Proyectos)</li>
        <li><strong>Habilidades blandas:</strong> Capacidades interpersonales como liderazgo, comunicación, 
        resolución de problemas (usar con moderación — estas se demuestran mejor a través de logros)</li>
      </ul>

      <p>
        <strong>Consejo profesional:</strong> Adapta tu sección de habilidades para que coincida con la 
        descripción del trabajo. Si la publicación menciona "análisis de datos", asegúrate de que esa 
        habilidad esté destacada.
      </p>

      <StepHeading step={5}>Educación</StepHeading>

      <p>
        Para la mayoría de los profesionales con experiencia laboral, la educación viene después del 
        historial laboral. Incluye:
      </p>

      <ul>
        <li>Título y especialización</li>
        <li>Nombre de la universidad y ubicación</li>
        <li>Año de graduación (opcional si llevas más de 10 años trabajando)</li>
        <li>Cursos relevantes, honores o promedio (solo si es excepcional y reciente)</li>
      </ul>

      <StepHeading step={6}>Secciones Opcionales</StepHeading>

      <p>
        Dependiendo de tu experiencia y el trabajo al que aspiras, considera agregar:
      </p>

      <ul>
        <li><strong>Certificaciones:</strong> Credenciales de la industria que aumentan tus calificaciones</li>
        <li><strong>Proyectos:</strong> Especialmente valiosos para roles técnicos o cambios de carrera</li>
        <li><strong>Idiomas:</strong> Cada vez más valiosos en empresas globales</li>
        <li><strong>Voluntariado:</strong> Muestra carácter y puede llenar vacíos de empleo</li>
      </ul>

      <ArticleCTA 
        variant="inline"
        description="¿Necesitas ayuda estructurando tu currículum? La IA de GetQuickResume te guía a través de cada sección, asegurando que no te pierdas nada importante."
      />

      <SectionDivider icon={Layout}>Mejores Prácticas de Formato</SectionDivider>

      <p>
        Incluso el mejor contenido puede verse arruinado por un formato pobre. Así es como hacer 
        tu currículum visualmente atractivo y fácil de leer:
      </p>

      <h3>Una Página vs. Dos Páginas</h3>

      <p>
        El currículum de una página ya no es una regla estricta. Aquí tienes una guía simple:
      </p>

      <ul>
        <li><strong>Una página:</strong> Si tienes menos de 10 años de experiencia</li>
        <li><strong>Dos páginas:</strong> Si eres un profesional senior con amplia experiencia relevante</li>
        <li><strong>Nunca:</strong> Más de dos páginas (a menos que estés en academia o medicina)</li>
      </ul>

      <h3>Fuente y Tipografía</h3>

      <ul>
        <li>Usa fuentes limpias y profesionales: Arial, Calibri, Helvetica o Georgia</li>
        <li>Texto del cuerpo: tamaño 10-12 puntos</li>
        <li>Encabezados: tamaño 14-16 puntos</li>
        <li>Formato consistente en todo el documento</li>
      </ul>

      <h3>Espacios en Blanco y Márgenes</h3>

      <ul>
        <li>Márgenes: 1.5 a 2.5 cm en todos los lados</li>
        <li>No amontones texto — el espacio en blanco mejora la legibilidad</li>
        <li>Usa viñetas para dividir texto denso</li>
      </ul>

      <SectionDivider icon={Zap}>Palabras de Poder que Impresionan a los Reclutadores</SectionDivider>

      <p>
        Los verbos que uses pueden impactar dramáticamente cómo se perciben tus logros. 
        Comienza cada viñeta con un verbo de acción fuerte:
      </p>

      {/* Cuadrícula de Palabras de Poder */}
      <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl not-prose shadow-sm">
        <h4 className="font-bold text-blue-900 mb-4 text-lg">Verbos de Acción de Alto Impacto</h4>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 text-sm">
          {['Logré', 'Lancé', 'Generé', 'Transformé', 'Lideré', 
            'Optimicé', 'Negocié', 'Entregué', 'Pionero', 'Orquesté',
            'Incrementé', 'Reduje', 'Desarrollé', 'Implementé', 'Mejoré'].map((word) => (
            <span key={word} className="px-3 py-2 bg-white rounded-lg text-blue-700 text-center font-medium shadow-sm border border-blue-100">
              {word}
            </span>
          ))}
        </div>
      </div>

      <SectionDivider icon={AlertTriangle}>Errores Comunes a Evitar</SectionDivider>

      <p>
        Incluso los candidatos calificados pueden sabotear sus oportunidades con estos errores comunes:
      </p>

      <div className="my-6 space-y-4 not-prose">
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Errores tipográficos y gramaticales</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">El 58% de los currículums tienen errores tipográficos. Siempre revisa múltiples veces y pide a alguien más que lo revise.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Objetivos genéricos</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">"Buscando una posición desafiante..." no le dice nada a los empleadores. Usa un resumen profesional específico en su lugar.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Incluir información irrelevante</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">¿Ese trabajo de verano de hace 15 años? El reclutador no necesita saberlo. Mantén la relevancia.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Usar el mismo currículum para cada trabajo</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">Adaptar tu currículum a cada posición aumenta significativamente tus posibilidades de conseguir una entrevista.</p>
          </div>
        </div>
      </div>

      <SectionDivider icon={ClipboardCheck}>Puntos Clave</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Lista de Verificación del Currículum</h3>
        </div>
        <ul className="space-y-3">
          {[
            'Incluye todas las secciones esenciales: contacto, resumen, experiencia, habilidades, educación',
            'Enfócate en logros con resultados cuantificables, no solo responsabilidades',
            'Usa verbos de acción fuertes para comenzar cada viñeta',
            'Mantén el formato limpio, consistente y fácil de escanear',
            'Adapta tu currículum a cada solicitud de empleo específica',
            'Revisa múltiples veces — los errores tipográficos son eliminatorios',
            'Mantén el documento entre 1-2 páginas máximo',
            'Guarda y envía como PDF para preservar el formato'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p>
        Crear un currículum efectivo toma tiempo y atención al detalle, pero es una inversión 
        que vale la pena. Un currículum bien elaborado abre puertas a oportunidades y prepara 
        el escenario para entrevistas exitosas.
      </p>

      <p>
        ¿Listo para poner estos consejos en acción? El constructor impulsado por IA de GetQuickResume 
        te ayuda a crear un currículum profesional en minutos, completo con formato optimizado y 
        sugerencias de contenido enfocado en logros. No se requieren habilidades de diseño.
      </p>
    </BlogLayout>
  );
}

