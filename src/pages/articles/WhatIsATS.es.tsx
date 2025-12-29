import { BlogLayout } from '@/components/blog/BlogLayout';
import { ArticleCTA } from '@/components/blog/ArticleCTA';
import { StepHeading } from '@/components/blog/StepHeading';
import { SectionDivider } from '@/components/blog/SectionDivider';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { CheckCircle, XCircle, AlertTriangle, Search, FileCheck, BarChart3, Filter, Bot, ShieldAlert, Settings, ClipboardCheck } from 'lucide-react';

export function WhatIsATSES() {
  const article = getArticleBySlug('what-is-ats-system', 'es')!;
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
        Aquí tienes un dato aleccionador: <strong>hasta el 75% de los currículums son rechazados antes de que 
        un humano los vea</strong>. ¿El culpable? Los Sistemas de Seguimiento de Candidatos (ATS) — los 
        guardianes silenciosos del mercado laboral moderno.
      </p>

      <p>
        Si alguna vez has aplicado a un trabajo en línea y te has preguntado por qué nunca recibiste 
        respuesta a pesar de estar calificado, hay una buena probabilidad de que un ATS te haya filtrado. 
        Entender cómo funcionan estos sistemas — y cómo optimizar tu currículum para ellos — puede aumentar 
        dramáticamente tus posibilidades de conseguir entrevistas.
      </p>

      <SectionDivider icon={Bot}>¿Qué es un Sistema de Seguimiento de Candidatos (ATS)?</SectionDivider>

      <p>
        Un Sistema de Seguimiento de Candidatos es un software que las empresas usan para gestionar su 
        proceso de reclutamiento. Piensa en él como un archivador digital combinado con un motor de 
        búsqueda. Recopila, ordena, escanea y clasifica los currículums que reciben las empresas.
      </p>

      <p>
        Para los buscadores de empleo, el ATS es el primer obstáculo. Antes de que un reclutador revise 
        tu currículum, el ATS ya lo ha escaneado, extraído información y determinado si vale la pena 
        una revisión más detallada.
      </p>

      <h3>¿Por Qué las Empresas Usan ATS?</h3>

      <p>
        Los números cuentan la historia:
      </p>

      <ul>
        <li>Una sola publicación de empleo corporativo recibe un promedio de <strong>250 currículums</strong></li>
        <li>Las grandes empresas pueden recibir <strong>millones de aplicaciones por año</strong></li>
        <li>Los reclutadores pasan solo <strong>6-7 segundos</strong> revisando un currículum inicialmente</li>
      </ul>

      <p>
        Sin software ATS, sería imposible para los equipos de recursos humanos manejar este volumen. 
        El ATS ayuda a filtrar candidatos de manera eficiente, ahorrando a las empresas incontables horas.
      </p>

      <h3>Sistemas ATS Populares</h3>

      <p>
        Probablemente has encontrado estos sistemas sin saberlo:
      </p>

      <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-3 not-prose">
        {['Workday', 'Greenhouse', 'Lever', 'Taleo', 'iCIMS', 'Jobvite', 'BambooHR', 'SAP SuccessFactors'].map((ats) => (
          <div key={ats} className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center text-sm font-medium text-gray-700 border border-gray-200 shadow-sm">
            {ats}
          </div>
        ))}
      </div>

      <SectionDivider icon={Search}>Cómo el ATS Escanea y Clasifica tu Currículum</SectionDivider>

      <p>
        Entender el proceso de escaneo del ATS es crucial para la optimización. Esto es lo que 
        sucede cuando envías tu currículum:
      </p>

      {/* Diagrama del Proceso ATS */}
      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <h4 className="font-bold text-gray-900 mb-6 text-center text-lg">Cómo el ATS Procesa tu Currículum</h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <Search className="w-7 h-7 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">1. Análisis</span>
            <span className="text-sm text-gray-600">Extrae texto y datos</span>
          </div>
          <div className="hidden md:block text-blue-300 text-3xl font-light">→</div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <Filter className="w-7 h-7 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">2. Filtrado</span>
            <span className="text-sm text-gray-600">Verifica requisitos</span>
          </div>
          <div className="hidden md:block text-blue-300 text-3xl font-light">→</div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <BarChart3 className="w-7 h-7 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">3. Clasificación</span>
            <span className="text-sm text-gray-600">Puntúa candidatos</span>
          </div>
          <div className="hidden md:block text-blue-300 text-3xl font-light">→</div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-3 shadow-sm">
              <FileCheck className="w-7 h-7 text-green-600" />
            </div>
            <span className="font-semibold text-gray-900">4. Revisión</span>
            <span className="text-sm text-gray-600">Humano ve los mejores</span>
          </div>
        </div>
      </div>

      <StepHeading step={1}>Análisis</StepHeading>

      <p>
        El ATS lee tu currículum y extrae información en campos estructurados: nombre, 
        información de contacto, historial laboral, educación, habilidades. Si tu formato es 
        demasiado complejo, el analizador puede malinterpretar o perder información completamente.
      </p>

      <StepHeading step={2}>Coincidencia de Palabras Clave</StepHeading>

      <p>
        El sistema compara tu currículum con la descripción del trabajo, buscando palabras clave 
        relevantes. Estas pueden incluir:
      </p>

      <ul>
        <li>Títulos de puestos y términos específicos del rol</li>
        <li>Habilidades y tecnologías requeridas</li>
        <li>Certificaciones y calificaciones</li>
        <li>Terminología específica de la industria</li>
      </ul>

      <StepHeading step={3}>Puntuación y Clasificación</StepHeading>

      <p>
        Basándose en las coincidencias de palabras clave y otros criterios, el ATS asigna a tu 
        currículum una puntuación. Los candidatos con puntuaciones más altas suben a la cima de 
        la pila que los reclutadores realmente ven.
      </p>

      <ArticleCTA 
        variant="inline"
        description="GetQuickResume optimiza automáticamente tu currículum para sistemas ATS, asegurando que tus calificaciones sean vistas por reclutadores humanos."
      />

      <SectionDivider icon={ShieldAlert}>Por Qué los Currículums Son Rechazados por el ATS</SectionDivider>

      <p>
        Incluso los candidatos calificados son filtrados por razones que no tienen nada que ver 
        con sus calificaciones. Estos son los eliminadores de ATS más comunes:
      </p>

      <div className="my-6 space-y-4 not-prose">
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Formato Complejo</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              Tablas, columnas, cuadros de texto y gráficos confunden a los analizadores ATS. Lo que 
              se ve hermoso para los humanos puede ser ilegible para el software.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Palabras Clave Faltantes</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              Si el trabajo pide "gestión de proyectos" y solo escribiste "gestioné proyectos", 
              podrías no coincidir. La frase exacta importa.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Formato de Archivo Incorrecto</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              Algunos sistemas ATS más antiguos tienen problemas con ciertos tipos de archivo. 
              En caso de duda, PDF es generalmente lo más seguro, aunque algunos prefieren .docx.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Encabezados y Pies de Página</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              Muchos sistemas ATS no pueden leer contenido colocado en encabezados o pies de página 
              del documento. Mantén la información importante en el cuerpo principal.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-5 bg-red-50 rounded-xl border border-red-200 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <strong className="text-red-800 text-base">Imágenes e Íconos</strong>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              ¿Esa sección de habilidades creativa basada en íconos? El ATS no ve nada. Todos los 
              elementos visuales son esencialmente invisibles para el sistema.
            </p>
          </div>
        </div>
      </div>

      <SectionDivider icon={Settings}>Cómo Optimizar tu Currículum para ATS</SectionDivider>

      <p>
        Ahora las buenas noticias: una vez que conoces las reglas, no es difícil jugar el juego. 
        Así es como hacer tu currículum amigable con ATS:
      </p>

      <StepHeading step={1}>Usa Encabezados de Sección Estándar</StepHeading>

      <p>
        Adhiérete a encabezados convencionales que los sistemas ATS reconocen:
      </p>

      <div className="my-6 grid md:grid-cols-2 gap-4 not-prose">
        <div className="p-5 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Buenos Encabezados</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Experiencia Laboral</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Educación</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Habilidades</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Resumen Profesional</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>Certificaciones</li>
          </ul>
        </div>
        <div className="p-5 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-red-700">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Evita Estos</span>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Donde He Dejado Huella</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Mi Trayectoria</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Lo Que Aporto</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>La Caja de Herramientas</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Credenciales y Logros</li>
          </ul>
        </div>
      </div>

      <StepHeading step={2}>Refleja la Descripción del Trabajo</StepHeading>

      <p>
        Este es quizás el consejo más importante: <strong>usa el mismo lenguaje que usa la 
        publicación del trabajo</strong>. Si dicen "gestión de relaciones con clientes", no 
        escribas solo "CRM". Incluye ambas versiones.
      </p>

      <blockquote>
        <strong>Consejo profesional:</strong> Copia la descripción del trabajo en un generador de 
        nube de palabras para identificar los términos más frecuentemente usados. Luego asegúrate 
        de que esos términos aparezcan naturalmente en tu currículum.
      </blockquote>

      <StepHeading step={3}>Mantén el Formato Simple</StepHeading>

      <ul>
        <li>Usa fuentes estándar (Arial, Calibri, Times New Roman)</li>
        <li>Evita tablas, columnas y cuadros de texto</li>
        <li>Usa viñetas simples (• o -)</li>
        <li>Sin imágenes, logos o gráficos</li>
        <li>Alinea todo el texto a la izquierda</li>
        <li>Usa formatos de fecha estándar (MM/AAAA o Mes AAAA)</li>
      </ul>

      <StepHeading step={4}>Incluye Tanto Acrónimos como Términos Completos</StepHeading>

      <p>
        No asumas que el ATS sabe qué significan las abreviaturas. Escribe los términos 
        completamente al menos una vez, luego puedes usar el acrónimo:
      </p>

      <ul>
        <li>"Optimización de Motores de Búsqueda (SEO)" no solo "SEO"</li>
        <li>"Gestión de Relaciones con Clientes (CRM)" no solo "CRM"</li>
        <li>"Project Management Professional (PMP)" no solo "PMP"</li>
      </ul>

      <StepHeading step={5}>Guarda en el Formato Correcto</StepHeading>

      <p>
        A menos que la publicación del trabajo especifique lo contrario:
      </p>

      <ul>
        <li><strong>PDF</strong> es generalmente lo más seguro y preserva el formato</li>
        <li><strong>.docx</strong> a veces es preferido por sistemas ATS más antiguos</li>
        <li><strong>Nunca</strong> envíes como .jpg, .png u otros formatos de imagen</li>
      </ul>

      <SectionDivider icon={ClipboardCheck}>Lista de Verificación de Currículum Amigable con ATS</SectionDivider>

      <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl not-prose shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Antes de Enviar</h3>
        </div>
        <ul className="space-y-3">
          {[
            'Encabezados de sección estándar (Experiencia, Educación, Habilidades)',
            'Palabras clave de la descripción del trabajo incluidas naturalmente',
            'Sin tablas, columnas o formato complejo',
            'Sin imágenes, logos o gráficos',
            'Tanto acrónimos como términos completos para jerga de la industria',
            'Información de contacto en el cuerpo principal (no encabezado/pie de página)',
            'Fuentes simples y legibles para ATS',
            'Guardado como PDF o .docx',
            'Nombre del archivo incluye tu nombre (Juan_Perez_Curriculum.pdf)',
            'Sin caracteres especiales que puedan causar errores de análisis'
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <SectionDivider>Puntos Clave</SectionDivider>

      <p>
        El ATS no es tu enemigo — es solo un obstáculo que necesitas superar. Esto es lo que debes recordar:
      </p>

      <ul>
        <li><strong>La mayoría de los currículums nunca llegan a ojos humanos</strong> debido al filtrado ATS</li>
        <li><strong>Las palabras clave importan</strong> — refleja el lenguaje en las descripciones de trabajo</li>
        <li><strong>El formato simple gana</strong> — guarda la creatividad para la entrevista</li>
        <li><strong>Prueba tu currículum</strong> — analízalo tú mismo para ver lo que el ATS ve</li>
        <li><strong>Adapta cada aplicación</strong> — los currículums de talla única puntúan más bajo</li>
      </ul>

      <p>
        Entender el ATS ya no es opcional en el mercado laboral actual. Pero aquí está el lado 
        positivo: una vez que conoces las reglas, tienes una ventaja significativa sobre los 
        candidatos que no las conocen.
      </p>

      <p>
        El constructor impulsado por IA de GetQuickResume crea currículums optimizados para ATS 
        automáticamente. Sin dolores de cabeza de formato, sin adivinar palabras clave — solo un 
        currículum profesional que supera a los guardianes y llega a manos humanas.
      </p>
    </BlogLayout>
  );
}

