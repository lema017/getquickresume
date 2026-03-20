import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  'academic-advisor': {
    slug: 'asesor-academico',
    title: 'Asesor Académico',
    keywords: ['currículum de asesor académico', 'ejemplo de CV de asesor universitario', 'plantilla de currículum de asesor estudiantil', 'currículum de asesor de asuntos estudiantiles'],
    searchIntents: ['crear currículum de asesor académico', 'ejemplo de currículum de asesor académico', 'cómo escribir un CV de asesor académico'],
    topSkills: ['Orientación Estudiantil', 'Planificación Académica', 'Auditoría de Título', 'Resolución de Conflictos', 'Análisis de Datos', 'Estrategias de Retención', 'Orientación Profesional', 'Conocimiento Curricular', 'Sistemas CRM (Banner, PeopleSoft)', 'Competencia Multicultural'],
    atsKeywords: ['asesoría académica', 'retención estudiantil', 'auditoría de título', 'gestión de matrícula', 'éxito estudiantil', 'educación superior', 'cumplimiento de FERPA', 'orientación profesional', 'desarrollo estudiantil', 'carga de asesoría', 'planificación de graduación', 'probatoria académica', 'evaluación de créditos de transferencia'],
    sampleResumeData: buildResumeData({
      firstName: 'Laura',
      lastName: 'Chambers',
      profession: 'Asesora Académica',
      summary: 'Asesora académica dedicada con más de 6 años de experiencia guiando a poblaciones estudiantiles diversas en planificación de títulos, selección de cursos y preparación profesional. Historial comprobado de mejora en tasas de retención y apoyo a estudiantes universitarios de primera generación.',
      skills: ['Orientación Estudiantil', 'Planificación Académica', 'Auditoría de Título', 'Resolución de Conflictos', 'Análisis de Datos', 'Estrategias de Retención', 'Orientación Profesional', 'Conocimiento Curricular', 'Sistemas CRM', 'Competencia Multicultural'],
      experience: [
        {
          title: 'Asesora Académica Senior',
          company: 'University of Michigan',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Gestiona una carga de más de 350 estudiantes de pregrado, brindando planificación individualizada de título y apoyo en inscripción',
            'Aumentó la tasa de retención estudiantil en un 12% mediante programas proactivos de alcance e intervención temprana',
            'Desarrolló una iniciativa de mentoría entre pares emparejando estudiantes de primer año en riesgo con estudiantes avanzados, logrando una mejora del 20% en el GPA',
          ],
        },
        {
          title: 'Asesora Académica',
          company: 'Ohio State University',
          startDate: '2018-06',
          endDate: '2021-07',
          achievements: [
            'Asesoró a 280 estudiantes por semestre sobre selección de cursos, declaración de carreras y requisitos de graduación',
            'Facilitó sesiones de orientación para estudiantes nuevos, logrando una calificación de satisfacción del 95%',
            'Colaboró con profesores para resolver consultas sobre políticas académicas y apelaciones estudiantiles',
          ],
        },
      ],
      education: [
        { institution: 'Indiana University Bloomington', degree: 'Maestría en Ciencias', field: 'Educación Superior y Asuntos Estudiantiles', startDate: '2016-08', endDate: '2018-05' },
        { institution: 'Purdue University', degree: 'Licenciatura en Artes', field: 'Psicología', startDate: '2012-08', endDate: '2016-05' },
      ],
      certifications: [
        { name: 'Certificación de Asesor Académico Maestro', issuer: 'NACADA', date: '2022-04' },
      ],
    }),
    faqs: [
      { question: '¿Qué debo incluir en un currículum de asesor académico?', answer: 'Destaque el tamaño de su carga de asesoría, métricas de retención estudiantil, familiaridad con sistemas de información estudiantil como Banner o PeopleSoft, y cualquier iniciativa que haya mejorado los resultados estudiantiles.' },
      { question: '¿Los asesores académicos necesitan certificaciones?', answer: 'Aunque no siempre es requerido, una certificación NACADA o una maestría en educación superior o consejería puede fortalecer significativamente su candidatura.' },
      { question: '¿Cómo cuantifico logros como asesor académico?', answer: 'Use métricas como mejoras en la tasa de retención, tamaño de la carga de asesoría, calificaciones de satisfacción estudiantil y la cantidad de graduaciones exitosas que facilitó.' },
    ],
  },

  'animator': {
    slug: 'animador',
    title: 'Animador',
    keywords: ['currículum de animador', 'plantilla de currículum de animador 3D', 'currículum de artista de motion graphics', 'currículum de portafolio de animación'],
    searchIntents: ['cómo escribir un currículum de animador', 'currículum de animador con portafolio', 'ejemplo de currículum de animador nivel inicial'],
    topSkills: ['Animación de Personajes', 'Animación 2D y 3D', 'Storyboarding', 'Adobe After Effects', 'Maya / Blender', 'Rigging y Skinning', 'Motion Graphics', 'Timing y Spacing', 'Narrativa Visual', 'Adobe Animate', 'Unity / Unreal Engine'],
    atsKeywords: ['animación de personajes', 'modelado 3D', 'storyboarding', 'motion graphics', 'rigging', 'animación por keyframes', 'After Effects', 'Maya', 'Blender', 'efectos visuales', 'cuadro por cuadro', 'pipeline de animación', 'renderizado', 'composición'],
    sampleResumeData: buildResumeData({
      firstName: 'Marcus',
      lastName: 'Vega',
      profession: 'Animador',
      summary: 'Animador creativo con 5 años de experiencia produciendo animaciones de personajes y motion graphics para estudios de cine, publicidad y videojuegos. Dominio de Maya, Blender y After Effects con un fuerte sentido del timing, el peso y la narrativa visual.',
      skills: ['Animación de Personajes', 'Animación 2D y 3D', 'Storyboarding', 'Adobe After Effects', 'Maya', 'Blender', 'Rigging y Skinning', 'Motion Graphics', 'Timing y Spacing', 'Narrativa Visual'],
      experience: [
        {
          title: 'Animador Senior',
          company: 'Pixelworks Studios',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Lideró la animación de personajes para un juego móvil que alcanzó más de 2M de descargas en su primer mes',
            'Redujo el tiempo de producción de animación en un 25% creando plantillas de rig reutilizables y bibliotecas de movimiento',
            'Capacitó a 3 animadores junior en principios de peso, anticipación y seguimiento',
          ],
        },
        {
          title: 'Animador de Motion Graphics',
          company: 'BrightWave Media',
          startDate: '2019-06',
          endDate: '2022-02',
          achievements: [
            'Produjo más de 60 videos explicativos y spots publicitarios para clientes como Nike y Spotify',
            'Diseñó secuencias de títulos dinámicas y tercios inferiores para una serie documental transmitida a nivel nacional',
            'Colaboró con directores creativos para transformar storyboards en animaciones finales pulidas',
          ],
        },
      ],
      education: [
        { institution: 'Savannah College of Art and Design', degree: 'Licenciatura en Bellas Artes', field: 'Animación', startDate: '2015-09', endDate: '2019-05' },
      ],
    }),
    faqs: [
      { question: '¿Debo incluir un enlace a mi portafolio en mi currículum de animador?', answer: 'Absolutamente. Incluya un enlace a su demo reel o sitio web de portafolio de manera prominente cerca de su información de contacto. Los gerentes de contratación esperan ver su trabajo.' },
      { question: '¿Qué software debería listar un animador en su currículum?', answer: 'Liste las herramientas en las que es competente, como Maya, Blender, After Effects, Cinema 4D o Toon Boom Harmony, dependiendo de su especialización.' },
      { question: '¿Cómo hago que mi currículum de animador destaque?', answer: 'Concéntrese en resultados medibles—descargas, visualizaciones o premios—y demuestre versatilidad en diferentes estilos (2D, 3D, motion graphics). Un demo reel sólido junto con un currículum limpio es la mejor combinación.' },
    ],
  },

  'bartender': {
    slug: 'bartender',
    title: 'Bartender',
    keywords: ['currículum de bartender', 'plantilla de currículum de bartender gratis', 'currículum de bartender con experiencia', 'CV de bartender de cócteles'],
    searchIntents: ['ejemplo de currículum de bartender', 'cómo escribir un currículum de bartender sin experiencia', 'sección de habilidades de currículum de bartender'],
    topSkills: ['Coctelería', 'Atención al Cliente', 'Sistemas POS', 'Manejo de Efectivo', 'Velocidad y Precisión', 'Conocimiento de Menú', 'Gestión de Inventario', 'Resolución de Conflictos', 'Técnicas de Venta Sugestiva', 'Cumplimiento de Seguridad Alimentaria'],
    atsKeywords: ['coctelería', 'preparación de cócteles', 'sistema POS', 'manejo de efectivo', 'atención al cliente', 'gestión de barra', 'control de inventario', 'venta sugestiva', 'seguridad alimentaria', 'leyes de licores', 'certificación TIPS', 'programa de bebidas', 'bar de alto volumen'],
    sampleResumeData: buildResumeData({
      firstName: 'Jake',
      lastName: 'Morrison',
      profession: 'Bartender',
      summary: 'Bartender dinámico con más de 4 años de experiencia en bares de cócteles artesanales de alto volumen y restaurantes de alta categoría. Reconocido por menús de bebidas creativos, excelente relación con los clientes y resultados consistentes en ventas sugestivas.',
      skills: ['Coctelería', 'Atención al Cliente', 'Sistemas POS', 'Manejo de Efectivo', 'Velocidad y Precisión', 'Conocimiento de Menú', 'Gestión de Inventario', 'Resolución de Conflictos', 'Venta Sugestiva', 'Seguridad Alimentaria'],
      experience: [
        {
          title: 'Bartender Principal',
          company: 'The Copper Still',
          startDate: '2022-05',
          isCurrent: true,
          achievements: [
            'Atiende a más de 200 clientes por turno en un bar de cócteles artesanales de alto volumen, manteniendo un costo de vertido promedio del 18%',
            'Diseñó un menú de cócteles de temporada que aumentó los ingresos del bar en un 15% trimestre a trimestre',
            'Capacita y supervisa a 4 asistentes de barra, asegurando estándares de servicio consistentes y precisión en inventario',
          ],
        },
        {
          title: 'Bartender',
          company: 'Riverside Bistro',
          startDate: '2020-03',
          endDate: '2022-04',
          achievements: [
            'Preparó cócteles clásicos y contemporáneos para un restaurante de alta categoría de 120 asientos con un promedio de 300 cubiertos por noche',
            'Gestionó pedidos semanales de licores por un total de $8K, reduciendo el desperdicio en un 10% mediante porciones precisas',
            'Obtuvo una calificación de satisfacción del cliente de 4.9 estrellas en encuestas internas de retroalimentación',
          ],
        },
      ],
      education: [
        { institution: 'Austin Community College', degree: 'Técnico Superior', field: 'Gestión de Hospitalidad', startDate: '2018-08', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'Certificación TIPS', issuer: 'Health Communications, Inc.', date: '2020-06' },
        { name: 'ServSafe Manipulador de Alimentos', issuer: 'National Restaurant Association', date: '2020-04' },
      ],
    }),
    faqs: [
      { question: '¿Qué habilidades debería incluir un bartender en su currículum?', answer: 'Incluya coctelería, dominio de sistemas POS, manejo de efectivo, atención al cliente, gestión de inventario y cualquier certificación relevante como TIPS o ServSafe.' },
      { question: '¿Cómo describo la experiencia de bartender en un currículum?', answer: 'Use verbos de acción y números—mencione el volumen de clientes atendidos por turno, porcentajes de costo de vertido, aumentos de ingresos por ideas de menú y cualquier responsabilidad de capacitación.' },
      { question: '¿Es importante una certificación de bartender para un currículum?', answer: 'Sí. Certificaciones como TIPS, ServSafe o permisos estatales de servicio de alcohol demuestran profesionalismo y conocimiento de cumplimiento ante los empleadores.' },
    ],
  },

  'brand-manager': {
    slug: 'gerente-de-marca',
    title: 'Gerente de Marca',
    keywords: ['currículum de gerente de marca', 'plantilla de currículum de gestión de marca', 'CV de gerente de marca senior', 'currículum de gerente de marca de consumo'],
    searchIntents: ['ejemplo de currículum de gerente de marca', 'cómo escribir un currículum de gerente de marca', 'currículum de gerente de marca con métricas'],
    topSkills: ['Estrategia de Marca', 'Investigación de Mercado', 'Gestión de P&L', 'Insights del Consumidor', 'Lanzamiento de Productos', 'Liderazgo Interfuncional', 'Marketing Digital', 'Gestión de Presupuesto', 'Análisis Competitivo', 'Desarrollo de Briefs Creativos'],
    atsKeywords: ['estrategia de marca', 'investigación de mercado', 'gestión de P&L', 'lanzamiento de producto', 'insights del consumidor', 'valor de marca', 'participación de mercado', 'estrategia de lanzamiento al mercado', 'bienes de consumo', 'posicionamiento de marca', 'campañas de marketing', 'análisis de ROI', 'trade marketing', 'gestión de categoría'],
    sampleResumeData: buildResumeData({
      firstName: 'Nicole',
      lastName: 'Rivera',
      profession: 'Gerente de Marca',
      summary: 'Gerente de marca orientada a resultados con 7 años de experiencia en marcas de bienes de consumo y estilo de vida. Experta en estrategia de lanzamiento al mercado, insights del consumidor y gestión de P&L con crecimiento consistente de doble dígito.',
      skills: ['Estrategia de Marca', 'Investigación de Mercado', 'Gestión de P&L', 'Insights del Consumidor', 'Lanzamiento de Productos', 'Liderazgo Interfuncional', 'Marketing Digital', 'Gestión de Presupuesto', 'Análisis Competitivo', 'Desarrollo de Briefs Creativos'],
      experience: [
        {
          title: 'Gerente de Marca Senior',
          company: 'Procter & Gamble',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Gestiona un portafolio de $45M en marcas de cuidado personal, logrando un crecimiento de ingresos interanual del 14%',
            'Lideró un relanzamiento de producto interfuncional que capturó 3 puntos adicionales de participación de mercado en 6 meses',
            'Desarrolló estrategias de segmentación del consumidor utilizando datos sindicados de Nielsen e IRI',
          ],
        },
        {
          title: 'Gerente de Marca',
          company: 'Unilever',
          startDate: '2017-09',
          endDate: '2020-12',
          achievements: [
            'Responsable del P&L de una línea de cuidado de la piel de $20M, alcanzando metas de margen durante 8 trimestres consecutivos',
            'Lanzó 4 SKU en 18 meses, coordinando empaque, precios y distribución minorista en más de 5,000 puntos de venta',
            'Colaboró con agencias creativas para producir campañas galardonadas que aumentaron el reconocimiento de marca asistido en un 22%',
          ],
        },
      ],
      education: [
        { institution: 'Northwestern University – Kellogg School of Management', degree: 'Maestría en Administración de Empresas', field: 'Marketing', startDate: '2015-09', endDate: '2017-06' },
        { institution: 'University of Florida', degree: 'Licenciatura en Ciencias', field: 'Administración de Empresas', startDate: '2011-08', endDate: '2015-05' },
      ],
    }),
    faqs: [
      { question: '¿En qué debería enfocarse un currículum de gerente de marca?', answer: 'Enfatice la responsabilidad de P&L, crecimiento de participación de mercado, resultados de lanzamientos de productos y toma de decisiones basada en datos. Cuantifique el impacto en ingresos siempre que sea posible.' },
      { question: '¿Los gerentes de marca necesitan un MBA?', answer: 'Un MBA es común en las principales empresas de bienes de consumo, pero no es estrictamente requerido. Resultados sólidos en crecimiento de marca y analítica de marketing pueden compensar la falta de un título avanzado.' },
      { question: '¿Cómo destaco el liderazgo en un currículum de gerente de marca?', answer: 'Describa el liderazgo de equipos interfuncionales, gestión de agencias y cualquier reporte directo. Mencione la colaboración con ventas, I+D, cadena de suministro y equipos creativos.' },
    ],
  },

  'brand-strategist': {
    slug: 'estratega-de-marca',
    title: 'Estratega de Marca',
    keywords: ['currículum de estratega de marca', 'plantilla de currículum de estrategia de marca', 'currículum de estratega creativo', 'CV de consultor de marca'],
    searchIntents: ['ejemplo de currículum de estratega de marca', 'cómo escribir un currículum de estratega de marca', 'consejos para currículum de estratega de marca'],
    topSkills: ['Posicionamiento de Marca', 'Investigación Competitiva', 'Segmentación de Audiencia', 'Narrativa y Mensajes', 'Dirección de Identidad Visual', 'Análisis de Tendencias de Mercado', 'Facilitación de Talleres', 'Presentaciones a Stakeholders', 'Redacción de Briefs Creativos', 'Estrategia de Marca Digital'],
    atsKeywords: ['posicionamiento de marca', 'análisis competitivo', 'identidad de marca', 'framework de mensajes', 'tono de voz', 'arquitectura de marca', 'investigación de mercado', 'persona de audiencia', 'guía de marca', 'rebranding', 'auditoría de marca', 'identidad visual', 'lanzamiento al mercado'],
    sampleResumeData: buildResumeData({
      firstName: 'Ethan',
      lastName: 'Park',
      profession: 'Estratega de Marca',
      summary: 'Estratega de marca con 6 años de experiencia en agencia e in-house desarrollando plataformas de marca, frameworks de mensajes y estrategias de lanzamiento al mercado para empresas B2B y DTC. Experto en transformar insights del consumidor en narrativas de marca convincentes.',
      skills: ['Posicionamiento de Marca', 'Investigación Competitiva', 'Segmentación de Audiencia', 'Narrativa y Mensajes', 'Dirección de Identidad Visual', 'Análisis de Tendencias de Mercado', 'Facilitación de Talleres', 'Presentaciones a Stakeholders', 'Redacción de Briefs Creativos', 'Estrategia de Marca Digital'],
      experience: [
        {
          title: 'Estratega de Marca Senior',
          company: 'Landor & Fitch',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Lidera proyectos de estrategia de marca para clientes Fortune 500, entregando plataformas de posicionamiento, convenciones de naming y arquitecturas de mensajes',
            'Dirigió un rebranding completo para una empresa SaaS de $300M que contribuyó a un aumento del 40% en leads entrantes en un trimestre',
            'Facilita talleres interfuncionales con stakeholders de nivel C para alinear la visión de marca con los objetivos de negocio',
          ],
        },
        {
          title: 'Estratega de Marca',
          company: 'R/GA',
          startDate: '2019-03',
          endDate: '2021-12',
          achievements: [
            'Desarrolló identidades de marca y estrategias de lanzamiento al mercado para más de 12 lanzamientos de productos en los sectores de tecnología y estilo de vida',
            'Realizó investigación cualitativa (grupos focales, entrevistas) y encuestas cuantitativas para construir personas de audiencia',
            'Redactó guías de marca y documentos de tono de voz adoptados por equipos de marketing globales',
          ],
        },
      ],
      education: [
        { institution: 'New York University', degree: 'Licenciatura en Artes', field: 'Comunicaciones y Estudios de Medios', startDate: '2015-09', endDate: '2019-05' },
      ],
    }),
    faqs: [
      { question: '¿Cómo se ve un currículum de estratega de marca?', answer: 'Debe mostrar pensamiento estratégico—auditorías de marca, frameworks de posicionamiento y resultados medibles como aumento de reconocimiento o crecimiento de leads. Incluya experiencia tanto en agencia como in-house si aplica.' },
      { question: '¿Cuál es la diferencia entre un gerente de marca y un estratega de marca?', answer: 'Un gerente de marca típicamente es responsable del P&L y las operaciones diarias de una marca, mientras que un estratega de marca se enfoca en el posicionamiento a largo plazo, mensajes y desarrollo de identidad.' },
      { question: '¿Debo incluir casos de estudio en mi currículum de estratega de marca?', answer: 'Mencione brevemente proyectos clave y resultados en el currículum, luego enlace a una página separada de portafolio o casos de estudio para mayor detalle.' },
    ],
  },

  'cad-designer': {
    slug: 'disenador-cad',
    title: 'Diseñador CAD',
    keywords: ['currículum de diseñador CAD', 'plantilla de currículum de diseñador AutoCAD', 'currículum de CAD mecánico', 'ejemplo de currículum de dibujante CAD'],
    searchIntents: ['ejemplo de currículum de diseñador CAD', 'cómo escribir un currículum de diseñador CAD', 'currículum de técnico CAD con habilidades de software'],
    topSkills: ['AutoCAD', 'SolidWorks', 'Revit', 'Modelado 3D', 'Dibujo Técnico', 'GD&T', 'Lectura de Planos', 'Coordinación BIM', 'Revisión de Diseño', 'Análisis de Tolerancias'],
    atsKeywords: ['AutoCAD', 'SolidWorks', 'Revit', 'modelado 3D', 'dibujo técnico', 'GD&T', 'planos', 'BIM', 'diseño de lámina metálica', 'dibujo de ensamblaje', 'dibujos de ingeniería', 'Inventor', 'CATIA', 'análisis de tolerancias'],
    sampleResumeData: buildResumeData({
      firstName: 'Derek',
      lastName: 'Flynn',
      profession: 'Diseñador CAD',
      summary: 'Diseñador CAD detallista con más de 5 años de experiencia creando modelos 2D/3D de precisión para proyectos mecánicos y arquitectónicos. Competente en AutoCAD, SolidWorks y Revit con sólidos conocimientos de GD&T y flujos de trabajo BIM.',
      skills: ['AutoCAD', 'SolidWorks', 'Revit', 'Modelado 3D', 'Dibujo Técnico', 'GD&T', 'Lectura de Planos', 'Coordinación BIM', 'Revisión de Diseño', 'Análisis de Tolerancias'],
      experience: [
        {
          title: 'Diseñador CAD II',
          company: 'Jacobs Engineering',
          startDate: '2021-04',
          isCurrent: true,
          achievements: [
            'Produce modelos sólidos 3D detallados y dibujos de ensamblaje para sistemas de tuberías industriales y HVAC en más de 10 proyectos activos',
            'Redujo los ciclos de revisión de diseño en un 30% implementando plantillas estandarizadas y protocolos de gestión de capas',
            'Coordina con equipos estructurales y eléctricos para resolver conflictos BIM, previniendo $200K en posibles retrabajo',
          ],
        },
        {
          title: 'Técnico CAD Junior',
          company: 'Smith & Associates Architects',
          startDate: '2018-07',
          endDate: '2021-03',
          achievements: [
            'Creó documentos de construcción y planos de permisos para proyectos residenciales y comerciales por un total de $15M',
            'Convirtió planos legados dibujados a mano a formato digital AutoCAD, archivando más de 500 dibujos para la firma',
            'Asistió a diseñadores senior con relevamientos de sitio y mediciones as-built para garantizar la precisión del modelo',
          ],
        },
      ],
      education: [
        { institution: 'Milwaukee School of Engineering', degree: 'Técnico Superior en Ciencias Aplicadas', field: 'Tecnología de Diseño Mecánico', startDate: '2016-08', endDate: '2018-05' },
      ],
      certifications: [
        { name: 'Asociado Certificado de SolidWorks (CSWA)', issuer: 'Dassault Systèmes', date: '2019-09' },
        { name: 'Profesional Certificado de Autodesk: AutoCAD', issuer: 'Autodesk', date: '2020-03' },
      ],
    }),
    faqs: [
      { question: '¿Qué software debería listar un diseñador CAD en su currículum?', answer: 'Incluya todas las plataformas CAD en las que es competente—AutoCAD, SolidWorks, Revit, CATIA, Inventor o Fusion 360. Especifique los números de versión si son relevantes para la oferta de trabajo.' },
      { question: '¿Los diseñadores CAD necesitan certificaciones?', answer: 'Certificaciones como CSWA (SolidWorks) o Profesional Certificado de Autodesk pueden diferenciarlo, especialmente si no cuenta con un título universitario de cuatro años.' },
      { question: '¿Cómo demuestro precisión en un currículum de diseñador CAD?', answer: 'Haga referencia a la reducción de ciclos de revisión, resultados de detección de conflictos o la cantidad de dibujos producidos con registros de cero defectos. La precisión es la moneda del trabajo CAD.' },
    ],
  },

  'campaign-manager': {
    slug: 'gerente-de-campanas',
    title: 'Gerente de Campañas',
    keywords: ['currículum de gerente de campañas', 'currículum de gerente de campañas digitales', 'CV de gerente de campañas de marketing', 'currículum de gerente de campañas políticas'],
    searchIntents: ['ejemplo de currículum de gerente de campañas', 'cómo escribir un currículum de gerente de campañas', 'consejos de currículum de gerente de campañas de marketing digital'],
    topSkills: ['Estrategia de Campañas', 'Planificación y Compra de Medios', 'Gestión de Presupuesto', 'Google Ads', 'Meta Ads Manager', 'Pruebas A/B', 'Automatización de Marketing', 'Analítica y Reportes', 'Coordinación Multicanal', 'Comunicación con Stakeholders'],
    atsKeywords: ['gestión de campañas', 'planificación de medios', 'publicidad digital', 'Google Ads', 'Facebook Ads', 'pruebas A/B', 'optimización de tasa de conversión', 'automatización de marketing', 'seguimiento de KPI', 'asignación de presupuesto', 'generación de leads', 'ROI', 'integración CRM', 'HubSpot'],
    sampleResumeData: buildResumeData({
      firstName: 'Priya',
      lastName: 'Nair',
      profession: 'Gerente de Campañas',
      summary: 'Gerente de campañas orientada a datos con más de 5 años de experiencia planificando y ejecutando campañas de marketing digital multicanal. Gestionó más de $3M en gasto publicitario anual en búsqueda pagada, social y programática, superando consistentemente los objetivos de ROAS.',
      skills: ['Estrategia de Campañas', 'Planificación y Compra de Medios', 'Gestión de Presupuesto', 'Google Ads', 'Meta Ads Manager', 'Pruebas A/B', 'Automatización de Marketing', 'Analítica y Reportes', 'Coordinación Multicanal', 'Comunicación con Stakeholders'],
      experience: [
        {
          title: 'Gerente de Campañas Senior',
          company: 'HubSpot',
          startDate: '2022-06',
          isCurrent: true,
          achievements: [
            'Gestiona un presupuesto publicitario trimestral de $1.5M en Google, LinkedIn y Meta, logrando un ROAS de 5.2x',
            'Lanzó una campaña ABM dirigida a cuentas empresariales que generó $4M en pipeline en 90 días',
            'Construyó dashboards de reportes automatizados en Looker Studio, reduciendo el tiempo de reportes manuales en un 70%',
          ],
        },
        {
          title: 'Gerente de Campañas Digitales',
          company: 'Dentsu International',
          startDate: '2019-04',
          endDate: '2022-05',
          achievements: [
            'Planificó y ejecutó campañas de medios pagados para clientes en los sectores fintech y salud con presupuestos combinados de $2M anuales',
            'Mejoró el costo de adquisición de leads en un 28% mediante optimización de landing pages y refinamiento de audiencia',
            'Coordinó con equipos creativos, de analítica y de cuentas para entregar campañas integradas a tiempo y dentro del presupuesto',
          ],
        },
      ],
      education: [
        { institution: 'Boston University', degree: 'Licenciatura en Ciencias', field: 'Marketing', startDate: '2015-09', endDate: '2019-05' },
      ],
      certifications: [
        { name: 'Certificado en Google Ads', issuer: 'Google', date: '2023-01' },
        { name: 'HubSpot Inbound Marketing', issuer: 'HubSpot Academy', date: '2022-08' },
      ],
    }),
    faqs: [
      { question: '¿Qué debería incluir un gerente de campañas en su currículum?', answer: 'Destaque el tamaño del presupuesto gestionado, resultados de ROAS/ROI, métricas de generación de leads y los canales y plataformas en los que es competente.' },
      { question: '¿Cómo cuantifico resultados como gerente de campañas?', answer: 'Use números específicos: gasto publicitario gestionado, mejoras en el costo por adquisición, pipeline generado, aumentos en la tasa de conversión e ingresos atribuidos a las campañas.' },
      { question: '¿Es importante la certificación de Google Ads para gerentes de campañas?', answer: 'Sí, valida su competencia técnica y frecuentemente aparece como calificación preferida en las ofertas de empleo. Combínela con certificaciones de Meta Blueprint o HubSpot para un atractivo más amplio.' },
    ],
  },

  'content-strategist': {
    slug: 'estratega-de-contenido',
    title: 'Estratega de Contenido',
    keywords: ['currículum de estratega de contenido', 'plantilla de currículum de estrategia de contenido', 'CV de estratega de contenido senior', 'currículum de estratega de contenido digital'],
    searchIntents: ['ejemplo de currículum de estratega de contenido', 'cómo escribir un currículum de estratega de contenido', 'currículum de portafolio de estrategia de contenido'],
    topSkills: ['Estrategia de Contenido', 'SEO e Investigación de Palabras Clave', 'Gestión de Calendario Editorial', 'Auditoría de Contenido', 'Escritura UX', 'Analítica (GA4, SEMrush)', 'Alineación de Stakeholders', 'Desarrollo de Voz de Marca', 'Gestión de CMS', 'Colaboración Interfuncional'],
    atsKeywords: ['estrategia de contenido', 'SEO', 'calendario editorial', 'auditoría de contenido', 'escritura UX', 'voz de marca', 'CMS', 'Google Analytics', 'gobernanza de contenido', 'marketing de contenido', 'arquitectura de información', 'taxonomía', 'investigación de usuarios', 'pruebas A/B'],
    sampleResumeData: buildResumeData({
      firstName: 'Jenna',
      lastName: 'Kowalski',
      profession: 'Estratega de Contenido',
      summary: 'Estratega de contenido con 6 años de experiencia desarrollando ecosistemas de contenido basados en datos para marcas SaaS y e-commerce. Experta en SEO, gobernanza editorial y planificación de contenido multicanal que impulsa el crecimiento orgánico.',
      skills: ['Estrategia de Contenido', 'SEO e Investigación de Palabras Clave', 'Gestión de Calendario Editorial', 'Auditoría de Contenido', 'Escritura UX', 'Analítica (GA4)', 'Alineación de Stakeholders', 'Desarrollo de Voz de Marca', 'Gestión de CMS', 'Colaboración Interfuncional'],
      experience: [
        {
          title: 'Estratega de Contenido Senior',
          company: 'Shopify',
          startDate: '2022-02',
          isCurrent: true,
          achievements: [
            'Responsable de la estrategia de contenido para el hub de educación para comerciantes, aumentando el tráfico orgánico en un 55% interanual',
            'Realizó una auditoría completa de contenido del sitio de más de 1,200 páginas, logrando una reducción del 30% en contenido de bajo rendimiento y mejorando la eficiencia de rastreo',
            'Definió guías de voz de marca y frameworks de gobernanza de contenido adoptados por más de 40 contribuidores a nivel global',
          ],
        },
        {
          title: 'Estratega de Contenido',
          company: 'Mailchimp',
          startDate: '2019-01',
          endDate: '2022-01',
          achievements: [
            'Construyó y gestionó el calendario editorial del blog corporativo, publicando 8-10 artículos optimizados por mes',
            'Colaboró con equipos de producto y UX para crear mensajes in-app y flujos de onboarding, mejorando las tasas de activación en un 18%',
            'Lideró iniciativas de investigación de palabras clave que identificaron más de 200 brechas de contenido, resultando en un 35% más de palabras clave posicionadas',
          ],
        },
      ],
      education: [
        { institution: 'University of Oregon', degree: 'Licenciatura en Artes', field: 'Periodismo', startDate: '2014-09', endDate: '2018-06' },
      ],
      certifications: [
        { name: 'Certificación en Marketing de Contenido', issuer: 'HubSpot Academy', date: '2021-05' },
      ],
    }),
    faqs: [
      { question: '¿Cuál es la diferencia entre un estratega de contenido y un especialista en marketing de contenido?', answer: 'Un estratega de contenido se enfoca en la planificación, gobernanza y el ecosistema general de contenido, mientras que un especialista en marketing de contenido típicamente se enfoca en la creación y distribución de contenido para generar leads.' },
      { question: '¿Qué métricas debe monitorear un estratega de contenido?', answer: 'Crecimiento de tráfico orgánico, posicionamiento de palabras clave, tasas de engagement, conversiones generadas por contenido y métricas de salud del contenido como frescura y brechas de cobertura.' },
      { question: '¿Debería un currículum de estratega de contenido incluir muestras de escritura?', answer: 'Enlace a un portafolio o casos de estudio que muestren impacto estratégico en lugar de muestras de escritura puras. Demuestre cómo su estrategia de contenido generó resultados comerciales medibles.' },
    ],
  },

  'content-writer': {
    slug: 'redactor-de-contenido',
    title: 'Redactor de Contenido',
    keywords: ['currículum de redactor de contenido', 'currículum de redactor de contenido freelance', 'plantilla de currículum de redactor de contenido', 'ejemplo de currículum de redactor SEO', 'currículum de escritor de blog'],
    searchIntents: ['ejemplo de currículum de redactor de contenido', 'cómo escribir un currículum de redactor de contenido', 'currículum de redactor de contenido para principiantes'],
    topSkills: ['Redacción SEO', 'Escritura de Blogs y Artículos', 'Investigación', 'WordPress / CMS', 'Corrección de Estilo', 'Adaptación de Voz de Marca', 'Ejecución de Calendario de Contenido', 'Copy para Redes Sociales', 'Optimización de Palabras Clave', 'Estilo AP'],
    atsKeywords: ['redacción de contenido', 'SEO', 'escritura de blogs', 'copywriting', 'WordPress', 'gestión de contenido', 'editorial', 'investigación de palabras clave', 'estilo AP', 'voz de marca', 'redes sociales', 'email marketing', 'calendario de contenido', 'corrección de pruebas'],
    sampleResumeData: buildResumeData({
      firstName: 'Amara',
      lastName: 'Hughes',
      profession: 'Redactora de Contenido',
      summary: 'Redactora de contenido versátil con 4 años de experiencia creando publicaciones de blog optimizadas para SEO, copy web y campañas de email para marcas SaaS B2B y de estilo de vida. Publicó más de 500 artículos con un historial comprobado de impulsar el crecimiento de tráfico orgánico.',
      skills: ['Redacción SEO', 'Escritura de Blogs y Artículos', 'Investigación', 'WordPress', 'Corrección de Estilo', 'Adaptación de Voz de Marca', 'Ejecución de Calendario de Contenido', 'Copy para Redes Sociales', 'Optimización de Palabras Clave', 'Estilo AP'],
      experience: [
        {
          title: 'Redactora de Contenido Senior',
          company: 'Drift',
          startDate: '2022-09',
          isCurrent: true,
          achievements: [
            'Escribe 12-15 publicaciones de blog de formato largo por mes, contribuyendo a un aumento del 40% en sesiones orgánicas interanual',
            'Colabora con el equipo de SEO para orientar palabras clave de alta intención, posicionándose en la página 1 para más de 30 términos competitivos',
            'Desarrolla contenido orientado al producto que apoya la habilitación de ventas e impulsa registros de prueba gratuita',
          ],
        },
        {
          title: 'Redactora de Contenido',
          company: 'Contently',
          startDate: '2020-06',
          endDate: '2022-08',
          achievements: [
            'Produjo más de 300 artículos para marcas cliente en los verticales de fintech, salud y viajes',
            'Mantuvo una tasa de entrega a tiempo del 98% mientras gestionaba asignaciones simultáneas para 5 cuentas',
            'Logró tasas de engagement promedio un 25% por encima de los benchmarks de la industria basados en métricas de tiempo en página',
          ],
        },
      ],
      education: [
        { institution: 'University of Wisconsin-Madison', degree: 'Licenciatura en Artes', field: 'Inglés', startDate: '2016-09', endDate: '2020-05' },
      ],
    }),
    faqs: [
      { question: '¿Cómo escribo un currículum de redactor de contenido sin experiencia?', answer: 'Incluya cualquier trabajo freelance, blog personal, publicaciones como invitado o escritura académica. Destaque habilidades transferibles como investigación, conocimiento de SEO y velocidad de escritura.' },
      { question: '¿Debería un currículum de redactor de contenido incluir enlaces a publicaciones?', answer: 'Sí, incluya 2-3 enlaces a sus mejores piezas publicadas o un sitio web de portafolio. Este es a menudo el elemento más impactante de un currículum de redactor de contenido.' },
      { question: '¿Qué métricas importan en un currículum de redactor de contenido?', answer: 'Artículos publicados, tráfico orgánico generado, posicionamiento de palabras clave logrado, métricas de engagement y cualquier ingreso o generación de leads a la que su contenido contribuyó.' },
    ],
  },

  'copy-editor': {
    slug: 'editor-de-texto',
    title: 'Editor de Texto',
    keywords: ['currículum de editor de texto', 'plantilla de currículum de editor de texto', 'currículum de corrector y editor de texto', 'CV de editor de texto freelance'],
    searchIntents: ['ejemplo de currículum de editor de texto', 'cómo escribir un currículum de editor de texto', 'habilidades y experiencia en currículum de editor de texto'],
    topSkills: ['Estilo AP / Chicago', 'Gramática y Sintaxis', 'Verificación de Hechos', 'Corrección de Pruebas', 'Edición de Estilo', 'Sistemas de Gestión de Contenido', 'Atención al Detalle', 'Gestión de Plazos', 'Cumplimiento de Guía de Estilo de Marca', 'Control de Cambios y Marcado'],
    atsKeywords: ['edición de texto', 'corrección de pruebas', 'estilo AP', 'Manual de Estilo de Chicago', 'verificación de hechos', 'edición de estilo', 'guía de estilo', 'gramática', 'flujo de trabajo editorial', 'CMS', 'publicación', 'revisión de contenido', 'aseguramiento de calidad'],
    sampleResumeData: buildResumeData({
      firstName: 'Diana',
      lastName: 'Brooks',
      profession: 'Editora de Texto',
      summary: 'Editora de texto meticulosa con 5 años de experiencia refinando contenido para publicaciones digitales, revistas y comunicaciones corporativas. Experta en estilo AP y Chicago con un ojo agudo para la consistencia, claridad y precisión factual.',
      skills: ['Estilo AP', 'Manual de Estilo de Chicago', 'Gramática y Sintaxis', 'Verificación de Hechos', 'Corrección de Pruebas', 'Edición de Estilo', 'Plataformas CMS', 'Atención al Detalle', 'Gestión de Plazos', 'Cumplimiento de Guía de Estilo de Marca'],
      experience: [
        {
          title: 'Editora de Texto Senior',
          company: 'Condé Nast',
          startDate: '2021-09',
          isCurrent: true,
          achievements: [
            'Edita más de 25 artículos por semana en las propiedades digitales de Wired y Bon Appétit, asegurando la voz de marca y la precisión factual',
            'Desarrolló un addendum interno de guía de estilo que redujo las inconsistencias recurrentes de estilo en un 40%',
            'Capacita a 2 editores junior y gestiona el proceso de QA editorial para contenido de noticias de última hora sensible al tiempo',
          ],
        },
        {
          title: 'Editora de Texto',
          company: 'The Atlantic',
          startDate: '2019-03',
          endDate: '2021-08',
          achievements: [
            'Editó reportajes de formato largo, artículos de opinión y boletines para distribución impresa y digital',
            'Colaboró con escritores para mejorar la prosa y la legibilidad, reduciendo las rondas promedio de revisión de 3 a 1.5',
            'Verificó datos, citas y fuentes para artículos de investigación, manteniendo un registro de cero retractaciones',
          ],
        },
      ],
      education: [
        { institution: 'Columbia University', degree: 'Maestría en Ciencias', field: 'Periodismo', startDate: '2017-09', endDate: '2019-05' },
        { institution: 'University of Virginia', degree: 'Licenciatura en Artes', field: 'Literatura Inglesa', startDate: '2013-08', endDate: '2017-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué habilidades debería destacar un editor de texto?', answer: 'Enfatice el dominio de guías de estilo (AP, Chicago), capacidad de verificación de hechos, atención al detalle, gestión de plazos y familiaridad con plataformas CMS.' },
      { question: '¿Se requiere un título en periodismo para trabajos de edición de texto?', answer: 'No siempre. Un título en inglés, comunicaciones o un campo relacionado combinado con muestras sólidas de edición puede ser igualmente efectivo.' },
      { question: '¿Cómo demuestran los editores de texto su valor en un currículum?', answer: 'Haga referencia al volumen de contenido editado, tasas de reducción de errores, tiempos de entrega más rápidos y cualquier guía de estilo que haya creado o mantenido.' },
    ],
  },

  'copywriter': {
    slug: 'redactor-publicitario',
    title: 'Redactor Publicitario',
    keywords: ['currículum de redactor publicitario', 'currículum de copywriter de publicidad', 'plantilla de currículum de copywriter junior', 'CV de copywriter freelance', 'ejemplo de currículum de copywriter creativo'],
    searchIntents: ['ejemplo de currículum de redactor publicitario', 'cómo escribir un currículum de copywriter', 'currículum de copywriter con enlace a portafolio'],
    topSkills: ['Escritura Persuasiva', 'Mensajes de Marca', 'Creación de Titulares y Eslóganes', 'Copywriting de Email', 'Copy Publicitario (Impreso y Digital)', 'Copywriting SEO', 'Copy para Pruebas A/B', 'Conceptualización Creativa', 'Colaboración con Diseñadores', 'Plataformas CMS'],
    atsKeywords: ['copywriting', 'mensajes de marca', 'copy publicitario', 'redacción de titulares', 'campañas de email', 'copy SEO', 'copy de landing page', 'pruebas A/B', 'conceptualización creativa', 'tono de voz', 'respuesta directa', 'llamada a la acción', 'marketing de contenido'],
    sampleResumeData: buildResumeData({
      firstName: 'Oliver',
      lastName: 'Grant',
      profession: 'Redactor Publicitario',
      summary: 'Redactor publicitario galardonado con 5 años de experiencia escribiendo copy de alta conversión para anuncios digitales, campañas de email, landing pages y campañas de marca. Pensador conceptual sólido que combina insights de datos con narrativa creativa.',
      skills: ['Escritura Persuasiva', 'Mensajes de Marca', 'Creación de Titulares y Eslóganes', 'Copywriting de Email', 'Copy Publicitario', 'Copywriting SEO', 'Copy para Pruebas A/B', 'Conceptualización Creativa', 'Colaboración con Diseñadores', 'Plataformas CMS'],
      experience: [
        {
          title: 'Redactor Publicitario Senior',
          company: 'Wieden+Kennedy',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Escribe copy de campañas integradas para una marca global de ropa deportiva en canales de TV, vía pública, digital y redes sociales',
            'Desarrolló un eslogan para una campaña de lanzamiento de producto que fue adoptado como el slogan permanente de la marca',
            'Realizó pruebas A/B en asuntos de email, mejorando las tasas de apertura en un 22% y las tasas de clic en un 15%',
          ],
        },
        {
          title: 'Redactor Publicitario',
          company: 'VMLY&R',
          startDate: '2019-06',
          endDate: '2021-12',
          achievements: [
            'Creó copy de respuesta directa para anuncios PPC y sociales, reduciendo el CPA en un 20% para un cliente de servicios financieros',
            'Escribió copy de landing page para más de 15 lanzamientos de productos, contribuyendo a un aumento del 30% en tasas de conversión',
            'Ganó un premio ADDY regional por el concepto de una campaña impresa para un cliente sin fines de lucro',
          ],
        },
      ],
      education: [
        { institution: 'Virginia Commonwealth University – Brandcenter', degree: 'Maestría en Ciencias', field: 'Gestión Creativa de Marca', startDate: '2017-08', endDate: '2019-05' },
        { institution: 'University of Texas at Austin', degree: 'Licenciatura en Ciencias', field: 'Publicidad', startDate: '2013-08', endDate: '2017-05' },
      ],
    }),
    faqs: [
      { question: '¿Cómo debería formatear un copywriter su currículum?', answer: 'Manténgalo limpio y escaneable. Comience con un resumen sólido, incluya resultados medibles (mejoras de conversión, premios ganados) y enlace a su portafolio o libro.' },
      { question: '¿Debería un currículum de copywriter ser creativo o tradicional?', answer: 'Un diseño creativo es aceptable—especialmente para roles de agencia—siempre que sea legible por sistemas ATS. Priorice la claridad y los resultados sobre la decoración.' },
      { question: '¿Qué métricas debería incluir un copywriter?', answer: 'Mejoras en la tasa de conversión, tasas de apertura y clic, reducciones de CPA, ingresos generados y cualquier premio o reconocimiento creativo.' },
    ],
  },

  'drafter': {
    slug: 'dibujante-tecnico',
    title: 'Dibujante Técnico',
    keywords: ['currículum de dibujante técnico', 'currículum de dibujante arquitectónico', 'plantilla de currículum de dibujante mecánico', 'ejemplo de currículum de dibujante CAD'],
    searchIntents: ['ejemplo de currículum de dibujante técnico', 'cómo escribir un currículum de dibujante técnico', 'ejemplo de CV de dibujante arquitectónico'],
    topSkills: ['AutoCAD', 'Revit', 'Dibujo Técnico', 'Lectura de Planos', 'Documentos de Construcción', 'Códigos de Edificación', 'Acotación y Tolerancias', 'Detallado de Dibujos', 'Revisiones de Líneas Rojas', 'Suite de MS Office'],
    atsKeywords: ['dibujo técnico', 'AutoCAD', 'Revit', 'dibujo técnico', 'documentos de construcción', 'planos', 'códigos de edificación', 'dibujo arquitectónico', 'dibujo mecánico', 'revisiones de líneas rojas', 'configuración de hojas', 'cuadro de título', 'planos de permisos'],
    sampleResumeData: buildResumeData({
      firstName: 'Kevin',
      lastName: 'Tran',
      profession: 'Dibujante Técnico',
      summary: 'Dibujante técnico confiable con 4 años de experiencia produciendo dibujos arquitectónicos y estructurales para proyectos comerciales y residenciales. Competente en AutoCAD y Revit con conocimiento profundo de códigos de edificación y estándares de documentos de construcción.',
      skills: ['AutoCAD', 'Revit', 'Dibujo Técnico', 'Lectura de Planos', 'Documentos de Construcción', 'Códigos de Edificación', 'Acotación y Tolerancias', 'Detallado de Dibujos', 'Revisiones de Líneas Rojas', 'Suite de MS Office'],
      experience: [
        {
          title: 'Dibujante Arquitectónico',
          company: 'Perkins & Will',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Produce juegos de documentos de construcción para proyectos comerciales con valores que van de $5M a $40M',
            'Dibuja plantas, elevaciones, secciones y hojas de detalle en cumplimiento con el IBC y códigos de jurisdicción local',
            'Incorpora revisiones de líneas rojas de arquitectos de proyecto en un plazo de 24 horas, manteniendo una tasa de precisión del 99%',
          ],
        },
        {
          title: 'Dibujante Junior',
          company: 'Thompson Design Group',
          startDate: '2019-09',
          endDate: '2021-05',
          achievements: [
            'Creó planos listos para permisos para más de 30 proyectos residenciales de renovación y ampliación',
            'Asistió en la transición de la firma de AutoCAD a Revit, capacitando a 5 miembros del personal en flujos de trabajo BIM',
            'Mantuvo una biblioteca digital de más de 200 detalles estándar, mejorando la eficiencia del dibujo técnico en un 20%',
          ],
        },
      ],
      education: [
        { institution: 'Portland Community College', degree: 'Técnico Superior en Ciencias Aplicadas', field: 'Tecnología de Dibujo Arquitectónico', startDate: '2017-09', endDate: '2019-06' },
      ],
    }),
    faqs: [
      { question: '¿Cuál es la diferencia entre un dibujante técnico y un diseñador CAD?', answer: 'Un dibujante técnico generalmente se enfoca en crear dibujos técnicos a partir de especificaciones proporcionadas por ingenieros o arquitectos, mientras que un diseñador CAD puede tener responsabilidades de diseño más amplias incluyendo modelado 3D y decisiones de diseño.' },
      { question: '¿Qué debería incluir un dibujante técnico en su currículum?', answer: 'Liste el dominio de software CAD, tipos de dibujos producidos, valores de proyectos, conocimiento de códigos y velocidad de entrega. Las certificaciones de Autodesk también pueden agregar credibilidad.' },
      { question: '¿Los dibujantes técnicos necesitan un título?', answer: 'Un título de técnico superior o certificado en tecnología de dibujo es común, pero los empleadores también valoran la calidad del portafolio y el dominio del software sobre la educación formal.' },
    ],
  },

  'fashion-designer': {
    slug: 'disenador-de-moda',
    title: 'Diseñador de Moda',
    keywords: ['currículum de diseñador de moda', 'plantilla de currículum de diseñador de moda', 'currículum de diseñador de ropa', 'CV de diseñador de moda con portafolio'],
    searchIntents: ['ejemplo de currículum de diseñador de moda', 'cómo escribir un currículum de diseñador de moda', 'currículum de diseñador de moda nivel inicial'],
    topSkills: ['Ilustración de Moda', 'Adobe Illustrator y Photoshop', 'Conocimiento de Textiles', 'Patronaje', 'Confección de Prendas', 'Pronóstico de Tendencias', 'CLO 3D / Browzwear', 'Teoría del Color', 'Creación de Fichas Técnicas', 'Comunicación con Proveedores'],
    atsKeywords: ['diseño de moda', 'confección de prendas', 'patronaje', 'textiles', 'ilustración de moda', 'ficha técnica', 'pronóstico de tendencias', 'indumentaria', 'Adobe Illustrator', 'CLO 3D', 'drapeado', 'paleta de colores', 'tablero de inspiración', 'desarrollo de muestras', 'coordinación de producción'],
    sampleResumeData: buildResumeData({
      firstName: 'Sofia',
      lastName: 'Lin',
      profession: 'Diseñadora de Moda',
      summary: 'Diseñadora de moda innovadora con 5 años de experiencia en las categorías de prêt-à-porter femenino y ropa deportiva. Experta en todo el ciclo de diseño desde bocetos conceptuales e investigación de tendencias hasta creación de fichas técnicas y coordinación de producción.',
      skills: ['Ilustración de Moda', 'Adobe Illustrator', 'Adobe Photoshop', 'Conocimiento de Textiles', 'Patronaje', 'Confección de Prendas', 'Pronóstico de Tendencias', 'CLO 3D', 'Teoría del Color', 'Creación de Fichas Técnicas'],
      experience: [
        {
          title: 'Diseñadora de Moda Asociada',
          company: 'Lululemon',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Diseña más de 30 estilos por temporada para la colección de entrenamiento femenino, contribuyendo $18M en ingresos anuales',
            'Crea fichas técnicas detalladas y colabora con fábricas en el extranjero para asegurar ajuste, calidad y entrega puntual',
            'Introdujo la prototipación 3D mediante CLO 3D, reduciendo las rondas de muestras físicas en un 40% y ahorrando $120K anuales',
          ],
        },
        {
          title: 'Diseñadora Junior',
          company: 'Theory',
          startDate: '2019-07',
          endDate: '2022-02',
          achievements: [
            'Desarrolló tableros de inspiración de temporada y paletas de colores alineadas con tendencias globales de pasarela y street style',
            'Produjo bocetos planos e ilustraciones técnicas para más de 20 estilos por entrega',
            'Coordinó el sourcing de telas con proveedores en Italia y China, negociando MOQ que redujeron el desperdicio en un 15%',
          ],
        },
      ],
      education: [
        { institution: 'Parsons School of Design', degree: 'Licenciatura en Bellas Artes', field: 'Diseño de Moda', startDate: '2015-09', endDate: '2019-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué debería incluir un diseñador de moda en su currículum?', answer: 'Destaque sus habilidades en software de diseño, número de estilos diseñados por temporada, categorías cubiertas, cualquier impacto en ingresos y un enlace a su portafolio de diseño.' },
      { question: '¿Los diseñadores de moda necesitan saber CLO 3D?', answer: 'Las herramientas de diseño 3D como CLO 3D y Browzwear son cada vez más esperadas, especialmente en marcas enfocadas en sostenibilidad y velocidad de comercialización.' },
      { question: '¿Qué tan importante es un portafolio para solicitudes de empleo de diseñador de moda?', answer: 'Un portafolio es esencial. Incluya tableros de inspiración, bocetos planos, fichas técnicas y fotos de prendas terminadas. Su currículum debe enlazar directamente a él.' },
    ],
  },

  'grant-writer': {
    slug: 'escritor-de-subvenciones',
    title: 'Escritor de Subvenciones',
    keywords: ['currículum de escritor de subvenciones', 'plantilla de currículum de escritor de subvenciones', 'CV de escritor de subvenciones de ONG', 'ejemplo de currículum de escritor de subvenciones federales'],
    searchIntents: ['ejemplo de currículum de escritor de subvenciones', 'cómo escribir un currículum de escritor de subvenciones', 'currículum de escritor de subvenciones con totales de financiamiento'],
    topSkills: ['Redacción de Propuestas de Subvención', 'Investigación Federal y de Fundaciones', 'Desarrollo de Narrativa Presupuestaria', 'Creación de Modelos Lógicos', 'Cumplimiento y Reportes', 'Investigación de Prospectos', 'Relaciones con Donantes', 'Narrativa Basada en Datos', 'Navegación de Grants.gov', 'Gestión de Plazos'],
    atsKeywords: ['escritura de subvenciones', 'desarrollo de propuestas', 'subvenciones federales', 'subvenciones de fundaciones', 'narrativa presupuestaria', 'modelo lógico', 'recaudación de fondos sin fines de lucro', 'reportes de cumplimiento', 'Grants.gov', 'respuesta a RFP', 'investigación de financiadores', 'gestión de subvenciones', 'administración de premios'],
    sampleResumeData: buildResumeData({
      firstName: 'Rachel',
      lastName: 'Bennett',
      profession: 'Escritora de Subvenciones',
      summary: 'Escritora de subvenciones consumada con 7 años de experiencia asegurando más de $12M en financiamiento federal, estatal y de fundaciones privadas para organizaciones sin fines de lucro y educativas. Experta en desarrollo de propuestas, reportes de cumplimiento y gestión de relaciones con financiadores.',
      skills: ['Redacción de Propuestas de Subvención', 'Investigación Federal y de Fundaciones', 'Desarrollo de Narrativa Presupuestaria', 'Creación de Modelos Lógicos', 'Cumplimiento y Reportes', 'Investigación de Prospectos', 'Relaciones con Donantes', 'Narrativa Basada en Datos', 'Navegación de Grants.gov', 'Gestión de Plazos'],
      experience: [
        {
          title: 'Escritora de Subvenciones Senior',
          company: 'United Way Worldwide',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Redacta y presenta más de 25 propuestas de subvención anualmente, asegurando un promedio de $2.5M por año en nuevo financiamiento',
            'Mantiene una tasa de éxito del 80% en solicitudes competitivas de subvenciones federales y estatales',
            'Desarrolla narrativas presupuestarias y modelos lógicos alineados con las prioridades de los financiadores y los planes estratégicos organizacionales',
          ],
        },
        {
          title: 'Escritora de Subvenciones',
          company: 'Teach For America',
          startDate: '2017-08',
          endDate: '2021-04',
          achievements: [
            'Aseguró $4.8M en subvenciones multianuales de la Fundación Bill & Melinda Gates, Ford Foundation y USDE',
            'Gestionó reportes de cumplimiento post-adjudicación para más de 15 subvenciones activas, asegurando el 100% de entregas a tiempo',
            'Realizó investigación de prospectos para construir un pipeline de más de 50 potenciales financiadores anuales',
          ],
        },
      ],
      education: [
        { institution: 'Georgetown University', degree: 'Maestría en Política Pública', field: 'Gestión de Organizaciones Sin Fines de Lucro', startDate: '2015-08', endDate: '2017-05' },
        { institution: 'Emory University', degree: 'Licenciatura en Artes', field: 'Ciencias Políticas', startDate: '2011-08', endDate: '2015-05' },
      ],
      certifications: [
        { name: 'Profesional de Subvenciones Certificado (GPC)', issuer: 'Grant Professionals Certification Institute', date: '2020-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué hace fuerte a un currículum de escritor de subvenciones?', answer: 'Comience con el financiamiento total asegurado, tasas de éxito y los tipos de subvenciones que ha redactado (federales, de fundaciones, corporativas). Incluya experiencia en cumplimiento y reportes.' },
      { question: '¿Vale la pena obtener la certificación GPC?', answer: 'Sí, la credencial de Profesional de Subvenciones Certificado demuestra dominio de prácticas éticas de subvenciones y es valorada por empleadores en los sectores sin fines de lucro y educación.' },
      { question: '¿Cómo debería un escritor de subvenciones cuantificar su currículum?', answer: 'Incluya los dólares totales asegurados, número de propuestas presentadas, porcentaje de éxito y la cantidad de subvenciones activas gestionadas simultáneamente.' },
    ],
  },

  'graphic-designer': {
    slug: 'disenador-grafico',
    title: 'Diseñador Gráfico',
    keywords: ['currículum de diseñador gráfico', 'plantilla de currículum de diseñador gráfico', 'CV de diseñador gráfico freelance', 'ejemplo de currículum de diseñador gráfico senior', 'currículum de diseño gráfico con portafolio'],
    searchIntents: ['ejemplo de currículum de diseñador gráfico', 'cómo escribir un currículum de diseñador gráfico', 'consejos para currículum creativo de diseñador gráfico'],
    topSkills: ['Adobe Creative Suite (Photoshop, Illustrator, InDesign)', 'Tipografía', 'Composición y Maquetación', 'Diseño de Identidad de Marca', 'Fundamentos de UI/UX', 'Diseño Impreso y Digital', 'Figma', 'Teoría del Color', 'Diseño de Empaque', 'Fundamentos de Motion Graphics'],
    atsKeywords: ['diseño gráfico', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma', 'identidad de marca', 'tipografía', 'diseño de maquetación', 'diseño impreso', 'diseño digital', 'comunicación visual', 'empaque', 'diseño UI', 'dirección de arte'],
    sampleResumeData: buildResumeData({
      firstName: 'Mia',
      lastName: 'Chen',
      profession: 'Diseñadora Gráfica',
      summary: 'Diseñadora gráfica creativa con 6 años de experiencia entregando soluciones visuales convincentes para marcas en tecnología, retail y salud. Experta en Adobe Creative Suite y Figma con una sólida base en tipografía, maquetación e identidad de marca.',
      skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma', 'Tipografía', 'Composición y Maquetación', 'Diseño de Identidad de Marca', 'Diseño Impreso y Digital', 'Teoría del Color', 'Diseño de Empaque'],
      experience: [
        {
          title: 'Diseñadora Gráfica Senior',
          company: 'Spotify',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Diseña materiales de marketing, activos para redes sociales y materiales de eventos para campañas globales que alcanzan a más de 50M de usuarios',
            'Lideró la renovación de identidad visual de la plataforma Spotify for Artists, mejorando las puntuaciones de consistencia de marca en un 35%',
            'Gestiona un sistema de diseño de más de 150 componentes reutilizables, acelerando los tiempos de producción en un 40%',
          ],
        },
        {
          title: 'Diseñadora Gráfica',
          company: 'Pentagram',
          startDate: '2018-09',
          endDate: '2022-03',
          achievements: [
            'Creó paquetes de identidad de marca (logotipo, tipografía, sistemas de color, guías) para más de 20 clientes en diversas industrias',
            'Diseñó empaque para una marca de alimentos DTC que ganó un premio Dieline 2021',
            'Produjo maquetaciones impresas y digitales para informes anuales, catálogos y publicaciones editoriales',
          ],
        },
      ],
      education: [
        { institution: 'Rhode Island School of Design', degree: 'Licenciatura en Bellas Artes', field: 'Diseño Gráfico', startDate: '2014-09', endDate: '2018-05' },
      ],
    }),
    faqs: [
      { question: '¿Debería un currículum de diseñador gráfico tener un diseño visual?', answer: 'Un currículum visualmente pulido puede mostrar sus habilidades, pero manténgalo compatible con ATS. Muchos diseñadores mantienen un currículum limpio para ATS y una versión diseñada para envíos directos.' },
      { question: '¿Cuál es la sección más importante de un currículum de diseñador gráfico?', answer: 'El enlace a su portafolio es fundamental. El currículum lo respalda con contexto—años de experiencia, dominio de software, industrias atendidas y resultados medibles.' },
      { question: '¿Cuántos proyectos debería listar un diseñador gráfico?', answer: 'Concéntrese en 2-3 roles con 3-4 viñetas de logros cada uno. Haga referencia a casos de estudio del portafolio para detalles específicos de proyectos en lugar de listar cada proyecto en el currículum.' },
    ],
  },
};
