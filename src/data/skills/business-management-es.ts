import type { SkillEsData } from './index';

export const translations: Record<string, SkillEsData> = {
  'project-management': {
    slug: 'gestion-de-proyectos',
    title: 'Gestión de Proyectos',
    description: 'La gestión de proyectos es la disciplina de planificar, organizar y supervisar el trabajo para alcanzar objetivos específicos dentro de restricciones definidas de tiempo, alcance y presupuesto. El Project Management Institute (PMI) la define a través de la Guía PMBOK, ahora en su 7ª edición, que pasó de un enfoque basado en procesos a uno basado en principios de entrega de proyectos. Las metodologías de gestión de proyectos van desde las predictivas (Waterfall) hasta las adaptativas (Agile) y los enfoques híbridos, dependiendo la elección de la complejidad del proyecto, la incertidumbre y las necesidades de los interesados.\n\nLa gestión de proyectos moderna abarca la iniciación, planificación, ejecución, monitoreo, control y cierre de proyectos. Los profesionales utilizan herramientas como Microsoft Project, Jira, Asana, Monday.com y Smartsheet para gestionar cronogramas, recursos y entregables. Certificaciones como PMP (Project Management Professional), CAPM y PRINCE2 son credenciales ampliamente reconocidas que validan la experiencia.\n\nLos gerentes de proyectos coordinan equipos multifuncionales, gestionan riesgos, se comunican con los interesados y aseguran que los entregables cumplan con los estándares de calidad. El rol se ha expandido más allá de TI y construcción tradicionales hacia prácticamente todas las industrias, y las organizaciones reconocen cada vez más que la gestión efectiva de proyectos impacta directamente en los resultados estratégicos y la ventaja competitiva.',
    whyImportant: 'La gestión de proyectos es una de las habilidades más universalmente buscadas en todas las industrias. PMI estima que los empleadores necesitarán 25 millones de nuevos profesionales de proyectos para 2030. Los profesionales certificados PMP ganan un salario medio 33% más alto que sus pares no certificados, con salarios medios en EE.UU. que van desde $95,000 hasta $140,000 dependiendo de la experiencia y la industria.\n\nIncluir gestión de proyectos en tu currículum indica que puedes entregar resultados a tiempo y dentro del presupuesto. Los sistemas ATS priorizan candidatos que demuestran enfoques estructurados para la ejecución, y los reclutadores ven la gestión de proyectos como un multiplicador de fuerza que mejora todas las demás habilidades en tu currículum.',
    keywords: ['currículum de gestión de proyectos', 'habilidades de gestión de proyectos', 'consejos de currículum PMP', 'palabras clave de gerente de proyectos'],
    searchIntents: ['cómo incluir gestión de proyectos en el currículum', 'habilidades de gestión de proyectos para currículum', 'ejemplos de currículum de gestión de proyectos'],
    relatedSkills: ['Metodología Agile', 'Scrum', 'Gestión de Riesgos', 'Gestión de Interesados', 'Gestión de Presupuesto', 'Diagramas de Gantt', 'Planificación de Recursos', 'MS Project', 'Jira', 'PRINCE2'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-programas', 'gerente-de-operaciones', 'gerente-de-ti', 'gerente-de-ingenieria', 'gerente-de-producto', 'director-de-operaciones', 'consultor-de-gestion'],
    atsKeywords: ['Gestión de Proyectos', 'PMP', 'PMBOK', 'ciclo de vida del proyecto', 'gestión del alcance', 'gestión de cronograma', 'asignación de recursos', 'mitigación de riesgos', 'diagrama de Gantt', 'seguimiento de hitos', 'entrega de proyectos', 'coordinación multifuncional'],
    resumeTips: [
      'Incluye la certificación PMP o PRINCE2 si la posees, ya que son palabras clave ATS de alto valor.',
      'Cuantifica los resultados del proyecto con tamaño de presupuesto, tamaño del equipo y plazos de entrega.',
      'Especifica las metodologías utilizadas (Waterfall, Agile, Híbrida) para coincidir con los requisitos del puesto.',
      'Menciona herramientas como Jira, MS Project o Asana para demostrar experiencia práctica.',
      'Destaca las tasas de entrega a tiempo y dentro del presupuesto en tu portafolio de proyectos.'
    ],
    exampleBullets: [
      'Gestioné una implementación de software empresarial de $4.2M en 5 departamentos, entregando 2 semanas antes de lo programado y 8% por debajo del presupuesto.',
      'Lideré un portafolio de 12 proyectos concurrentes con un presupuesto combinado de $8.5M, logrando una tasa de entrega a tiempo del 94%.',
      'Coordiné un equipo multifuncional de 35 miembros en 4 zonas horarias, reduciendo el tiempo de ciclo del proyecto en un 28% mediante protocolos de comunicación mejorados.',
      'Implementé un marco estandarizado de gestión de proyectos en la PMO, aumentando la tasa de éxito de proyectos del 68% al 91% en 18 meses.'
    ],
    faqs: [
      { question: '¿Necesito la certificación PMP para incluir gestión de proyectos en mi currículum?', answer: 'No, la certificación PMP no es necesaria para listar gestión de proyectos como habilidad. Sin embargo, PMP agrega credibilidad significativa y es preferida o requerida para roles senior de PM. Si no tienes PMP, enfatiza tu experiencia práctica con metodologías específicas, herramientas y resultados medibles de proyectos.' },
      { question: '¿Cómo debo describir experiencia en gestión de proyectos sin un título de PM?', answer: 'Enfócate en actividades transferibles: liderar iniciativas multifuncionales, gestionar cronogramas y presupuestos, coordinar equipos y entregar resultados medibles. Usa verbos de acción como "lideré", "coordiné", "entregué" y "gestioné" seguidos de resultados cuantificados.' },
      { question: '¿Qué herramientas de gestión de proyectos debo mencionar en mi currículum?', answer: 'Lista las herramientas relevantes para la oferta de empleo. Jira y Confluence son estándar para empresas de tecnología, MS Project para industrias tradicionales, Asana y Monday.com para empresas medianas, y Smartsheet para empresas grandes. Siempre alinea tu lista de herramientas con el ecosistema del empleador.' }
    ]
  },
  'agile-methodology': {
    slug: 'metodologia-agile',
    title: 'Metodología Agile',
    description: 'La metodología Agile es un enfoque iterativo para la gestión de proyectos y el desarrollo de software que entrega trabajo en incrementos pequeños y consumibles. Basada en el Manifiesto Agile publicado en 2001 por 17 profesionales de software, Agile prioriza individuos e interacciones sobre procesos, software funcionando sobre documentación, colaboración con el cliente sobre contratos, y responder al cambio sobre seguir un plan.\n\nAgile abarca múltiples marcos de trabajo incluyendo Scrum, Kanban, Extreme Programming (XP), Crystal y el Scaled Agile Framework (SAFe). Los equipos trabajan en sprints o iteraciones, típicamente de 1-4 semanas, entregando incrementos potencialmente desplegables al final de cada ciclo. Las prácticas clave incluyen reuniones diarias, planificación de sprint, retrospectivas, refinamiento del backlog e integración continua. Herramientas como Jira, Azure DevOps, Rally y VersionOne apoyan los flujos de trabajo Agile.\n\nAgile se ha expandido mucho más allá del desarrollo de software hacia marketing, recursos humanos, finanzas y operaciones. SAFe, LeSS y Nexus permiten Agile a escala empresarial, coordinando múltiples equipos trabajando en productos grandes. El 16º Informe del Estado de Agile muestra que el 71% de las organizaciones utilizan enfoques Agile, citando mejora en la moral del equipo, menor tiempo de lanzamiento al mercado y mayor adaptabilidad como principales beneficios.',
    whyImportant: 'La competencia en Agile se espera en casi todos los roles de tecnología y producto. Más del 80% de las ofertas de empleo en desarrollo de software mencionan Agile o marcos relacionados. Los profesionales con certificaciones Agile como CSM o SAFe ganan 10-20% más que sus pares sin certificación, con coaches Agile alcanzando salarios de $130,000-$170,000.\n\nIncluir metodología Agile en tu currículum señala adaptabilidad, habilidades de colaboración y un enfoque en entregar valor al cliente. Los reclutadores usan Agile como palabra clave de filtrado, y demostrar experiencia práctica en Agile te diferencia de candidatos que solo tienen conocimiento teórico.',
    keywords: ['currículum de metodología agile', 'habilidades agile para currículum', 'gestión de proyectos agile', 'palabras clave agile para currículum'],
    searchIntents: ['cómo incluir agile en el currículum', 'habilidades agile para gerentes de proyectos', 'ejemplos de currículum con metodología agile'],
    relatedSkills: ['Scrum', 'Kanban', 'SAFe', 'Planificación de Sprint', 'Historias de Usuario', 'Integración Continua', 'Retrospectivas', 'Jira', 'Gestión de Product Backlog'],
    professionSlugs: ['gerente-de-proyectos', 'scrum-master', 'product-owner', 'gerente-de-producto', 'gerente-de-ingenieria', 'gerente-de-ti', 'consultor-de-gestion', 'director-de-ingenieria'],
    atsKeywords: ['Agile', 'metodología Agile', 'Scrum', 'Kanban', 'sprint', 'iteración', 'backlog', 'historias de usuario', 'retrospectiva', 'entrega continua', 'SAFe', 'transformación Agile'],
    resumeTips: [
      'Especifica qué marcos Agile has practicado (Scrum, Kanban, SAFe, XP).',
      'Incluye certificaciones Agile como CSM, PSM o SAFe Agilist.',
      'Cuantifica mejoras en velocidad de entrega, calidad o satisfacción del equipo.',
      'Describe tu rol en las ceremonias Agile y tus contribuciones a los procesos del equipo.',
      'Menciona experiencia con Agile a escala si aplica (SAFe, LeSS, Nexus).'
    ],
    exampleBullets: [
      'Lideré la transformación Agile de una organización de ingeniería de 120 personas, reduciendo el ciclo promedio de lanzamiento de 8 semanas a 2 semanas y aumentando la frecuencia de despliegue en un 300%.',
      'Facilité ceremonias Agile para 4 equipos multifuncionales, mejorando la velocidad de sprint en un 35% y reduciendo el desbordamiento de sprint del 25% al 8%.',
      'Implementé SAFe en 12 equipos en un entorno regulado de servicios financieros, logrando alineación en PI Planning y reduciendo dependencias entre equipos en un 45%.',
      'Entrené a 6 equipos Agile recién formados durante la adopción, logrando madurez completa en Scrum en 4 meses según autoevaluaciones del equipo y métricas de entrega.'
    ],
    faqs: [
      { question: '¿Debo listar Agile y Scrum por separado en mi currículum?', answer: 'Sí, lístalos por separado. Agile es la filosofía general mientras que Scrum es un marco de trabajo específico. Los sistemas ATS pueden buscar cada palabra clave de forma independiente. Listar ambos demuestra que entiendes la distinción y tienes experiencia práctica con el marco.' },
      { question: '¿Cómo muestro experiencia Agile si mi equipo usó un enfoque híbrido?', answer: 'Describe tu experiencia honestamente como híbrida o inspirada en Agile. Destaca prácticas Agile específicas que implementaste como sprints, reuniones diarias, retrospectivas o gestión de backlog. Los empleadores valoran la aplicación práctica sobre la adherencia estricta al marco.' },
      { question: '¿Vale la pena la certificación SAFe para mi currículum?', answer: 'Las certificaciones SAFe son muy valoradas en grandes empresas que practican Agile a escala. Si tu objetivo son empresas Fortune 500, las certificaciones SAFe Agilist o SAFe Scrum Master pueden impulsar significativamente tu candidatura. Para startups y empresas más pequeñas, CSM o PSM son más relevantes.' }
    ]
  },
  'scrum': {
    slug: 'scrum',
    title: 'Scrum',
    description: 'Scrum es un marco de trabajo Agile ligero para desarrollar, entregar y mantener productos complejos. Definido en la Guía de Scrum por Ken Schwaber y Jeff Sutherland, Scrum organiza el trabajo en iteraciones de duración fija llamadas sprints, que típicamente duran 2 semanas. El marco prescribe tres roles (Product Owner, Scrum Master, Equipo de Desarrollo), cinco eventos (Sprint, Planificación de Sprint, Scrum Diario, Revisión de Sprint, Retrospectiva de Sprint) y tres artefactos (Product Backlog, Sprint Backlog, Incremento).\n\nScrum enfatiza el control empírico de procesos a través de transparencia, inspección y adaptación. Los equipos se comprometen a entregar un incremento de producto potencialmente desplegable al final de cada sprint, guiados por una Definición de Terminado. El Product Owner prioriza el trabajo basándose en el valor de negocio, el Scrum Master elimina impedimentos y entrena al equipo, y el Equipo de Desarrollo se auto-organiza para cumplir compromisos.\n\nScrum se ha convertido en el marco Agile más ampliamente adoptado, utilizado por aproximadamente el 66% de los equipos Agile en todo el mundo. Se escala a través de marcos como Scrum@Scale, Nexus y LeSS. Las certificaciones profesionales de Scrum Alliance (CSM, CSPO, CSP) y Scrum.org (PSM, PSPO) validan el conocimiento del profesional.',
    whyImportant: 'Scrum se menciona en más del 60% de las ofertas de empleo de gestión de proyectos y desarrollo de software. Los Scrum Masters certificados ganan salarios medianos de $105,000-$130,000, mientras que Scrum Masters experimentados a escala empresarial alcanzan $140,000-$165,000. La competencia en Scrum es una expectativa base para roles en desarrollo de producto, gestión de ingeniería y liderazgo técnico.\n\nDemostrar experiencia en Scrum en tu currículum muestra a los empleadores que puedes trabajar efectivamente en entornos de entrega iterativa. Señala colaboración, responsabilidad y compromiso con la mejora continua, cualidades altamente valoradas en organizaciones de tecnología.',
    keywords: ['currículum de scrum', 'habilidades de scrum master', 'currículum de metodología scrum', 'currículum de certificación scrum'],
    searchIntents: ['cómo incluir scrum en el currículum', 'habilidades de scrum para postulaciones', 'ejemplos de currículum de scrum master'],
    relatedSkills: ['Metodología Agile', 'Kanban', 'Planificación de Sprint', 'Gestión de Product Backlog', 'Retrospectivas', 'Historias de Usuario', 'Jira', 'SAFe', 'Seguimiento de Velocidad'],
    professionSlugs: ['scrum-master', 'product-owner', 'gerente-de-proyectos', 'gerente-de-producto', 'gerente-de-ingenieria', 'gerente-de-ti'],
    atsKeywords: ['Scrum', 'Scrum Master', 'sprint', 'planificación de sprint', 'reunión diaria', 'retrospectiva', 'product backlog', 'sprint backlog', 'velocidad', 'Definición de Terminado', 'CSM', 'PSM'],
    resumeTips: [
      'Lista tu certificación Scrum (CSM, PSM I/II/III) de forma prominente en la sección de certificaciones.',
      'Cuantifica el tamaño del equipo, mejoras en velocidad de sprint y resultados de entrega.',
      'Describe tu rol específico en Scrum y cómo cumpliste con sus responsabilidades.',
      'Menciona experiencia escalando Scrum en múltiples equipos si aplica.',
      'Incluye métricas como tasa de cumplimiento de objetivos de sprint y reducción de defectos.'
    ],
    exampleBullets: [
      'Fungí como Scrum Master para 3 equipos multifuncionales con un total de 24 miembros, mejorando la tasa de cumplimiento de objetivos de sprint del 72% al 95% en 6 meses.',
      'Facilité retrospectivas de sprint quincenales que generaron más de 180 mejoras accionables, resultando en una reducción del 40% en impedimentos recurrentes.',
      'Entrené a Product Owners en prácticas de refinamiento de backlog, reduciendo el tiempo de planificación de sprint en un 50% y mejorando la preparación de historias al 90%.',
      'Escalé prácticas de Scrum en 8 equipos usando Nexus, coordinando incrementos integrados y reduciendo defectos de integración en un 65%.'
    ],
    faqs: [
      { question: '¿Qué certificación de Scrum debo obtener para mi currículum?', answer: 'CSM (Certified Scrum Master) de Scrum Alliance es la certificación de nivel inicial más reconocida. PSM I de Scrum.org es una alternativa rigurosa que no requiere asistencia a cursos. Para profesionales avanzados, PSM II/III o CSP-SM demuestran experiencia más profunda. Elige según tu nivel de carrera y las certificaciones que valoran tus empleadores objetivo.' },
      { question: '¿Puedo listar experiencia en Scrum sin ser Scrum Master?', answer: 'Absolutamente. Cualquier miembro del equipo que haya trabajado con Scrum puede listarlo. Describe tu rol dentro del equipo Scrum, tu participación en las ceremonias y cómo contribuiste a los objetivos de sprint. Product Owners, desarrolladores y testers se benefician de destacar experiencia en Scrum.' },
      { question: '¿Cómo describo métricas de Scrum en mi currículum?', answer: 'Enfócate en métricas de resultado más que en métricas de vanidad. Destaca tasas de cumplimiento de objetivos de sprint, reducción de tiempo de ciclo, mejoras en densidad de defectos, aumento en frecuencia de lanzamientos y puntuaciones de satisfacción del cliente. Evita listar números de velocidad brutos ya que son específicos del equipo y no comparables entre organizaciones.' }
    ]
  },
  'kanban': {
    slug: 'kanban',
    title: 'Kanban',
    description: 'Kanban es un método de gestión visual de flujo de trabajo que se originó en el Sistema de Producción de Toyota y fue adaptado para el trabajo del conocimiento por David J. Anderson en 2007. A diferencia de Scrum, Kanban no prescribe iteraciones fijas. En su lugar, se enfoca en el flujo continuo, visualizando el trabajo en un tablero, limitando el trabajo en progreso (WIP), gestionando el flujo, haciendo explícitas las políticas de proceso, implementando bucles de retroalimentación y mejorando colaborativamente.\n\nLos tableros Kanban muestran los elementos de trabajo como tarjetas que se mueven a través de columnas que representan etapas del flujo como Por Hacer, En Progreso, Revisión y Terminado. Los límites de WIP previenen la sobrecarga de los miembros del equipo, reducen el cambio de contexto y exponen cuellos de botella. Las métricas clave incluyen tiempo de entrega (solicitud a entrega), tiempo de ciclo (inicio a entrega), rendimiento (elementos completados por período) y diagramas de flujo acumulado.\n\nKanban se utiliza en desarrollo de software, operaciones de TI, marketing, recursos humanos y manufactura. Herramientas como Jira, Trello, Azure DevOps y Kanbanize proporcionan capacidades de tablero Kanban digital. Muchos equipos adoptan un enfoque híbrido Scrumban que combina sprints de Scrum con principios de flujo Kanban para mayor flexibilidad.',
    whyImportant: 'La competencia en Kanban demuestra habilidades prácticas de optimización de flujo de trabajo valoradas en todas las industrias. Las organizaciones que usan Kanban reportan reducciones del 30-50% en tiempo de entrega y mejoras significativas en predictibilidad. Kanban se solicita cada vez más junto con Scrum en ofertas de empleo, con menciones creciendo año tras año.\n\nIncluir Kanban en tu currículum señala que entiendes la entrega basada en flujo, identificación de cuellos de botella y mejora continua sin requerir estructuras rígidas de marcos. Es especialmente valioso para roles de operaciones, soporte y mantenimiento donde el flujo continuo supera a los enfoques basados en sprints.',
    keywords: ['currículum de kanban', 'habilidades de metodología kanban', 'gestión de proyectos kanban', 'experiencia con tablero kanban'],
    searchIntents: ['cómo incluir kanban en el currículum', 'habilidades kanban para gerentes de proyectos', 'kanban vs scrum en currículum'],
    relatedSkills: ['Metodología Agile', 'Scrum', 'Gestión Lean', 'Mejora de Procesos', 'Jira', 'Trello', 'Optimización de Flujo de Trabajo', 'Gestión de WIP', 'Entrega Continua'],
    professionSlugs: ['gerente-de-proyectos', 'scrum-master', 'gerente-de-operaciones', 'gerente-de-ingenieria', 'gerente-de-ti', 'gerente-de-producto'],
    atsKeywords: ['Kanban', 'tablero Kanban', 'límites WIP', 'trabajo en progreso', 'tiempo de entrega', 'tiempo de ciclo', 'rendimiento', 'flujo continuo', 'sistema pull', 'gestión visual', 'diagrama de flujo acumulado'],
    resumeTips: [
      'Menciona métricas específicas de Kanban que rastreaste como tiempo de entrega, tiempo de ciclo y rendimiento.',
      'Describe las políticas de límites de WIP que estableciste y su impacto en el flujo.',
      'Referencia las herramientas utilizadas para la implementación de Kanban (Jira, Trello, Kanbanize).',
      'Cuantifica mejoras de flujo como reducción de tiempo de entrega o aumento de rendimiento.',
      'Nota si posees una certificación Kanban como TKP o KMP.'
    ],
    exampleBullets: [
      'Implementé Kanban en un equipo de soporte de 15 personas, reduciendo el tiempo de entrega promedio de 12 días a 4 días y aumentando el rendimiento semanal en un 60%.',
      'Establecí límites de WIP de 3 por desarrollador que redujeron el cambio de contexto en un 45% y mejoraron el tiempo de respuesta de revisión de código de 48 horas a 8 horas.',
      'Diseñé un sistema Kanban de múltiples niveles para un equipo de DevOps que gestiona más de 200 solicitudes mensuales, mejorando la entrega a tiempo del 65% al 92%.',
      'Creé diagramas de flujo acumulado y gráficos de dispersión de tiempo de ciclo que identificaron un cuello de botella en pruebas, lo que llevó a una reducción del 35% en el tiempo de ciclo general tras contratación dirigida.'
    ],
    faqs: [
      { question: '¿Debo listar Kanban por separado de Agile en mi currículum?', answer: 'Sí, lista Kanban por separado ya que es una metodología distinta con sus propios principios y prácticas. Algunos roles requieren específicamente experiencia en Kanban para entornos de flujo continuo. Listarlo junto con Agile muestra amplitud de conocimiento metodológico.' },
      { question: '¿Cuándo debo enfatizar Kanban sobre Scrum en mi currículum?', answer: 'Enfatiza Kanban para roles en operaciones, soporte de TI, DevOps y mantenimiento donde el trabajo llega continuamente en lugar de en lotes planificados. También enfatiza Kanban para roles de liderazgo enfocados en optimización de procesos, eficiencia de flujo y reducción de cuellos de botella.' },
      { question: '¿Qué certificaciones de Kanban existen?', answer: 'La Universidad Kanban ofrece las certificaciones Team Kanban Practitioner (TKP) y Kanban Management Professional (KMP). Son menos comunes que las certificaciones de Scrum pero son valoradas en organizaciones que practican entrega basada en flujo. Tener una certificación Kanban te diferencia de candidatos que solo conocen Scrum.' }
    ]
  },
  'lean-management': {
    slug: 'gestion-lean',
    title: 'Gestión Lean',
    description: 'La gestión Lean es un enfoque sistemático para eliminar desperdicios y maximizar el valor para el cliente en los procesos organizacionales. Originada en el Sistema de Producción de Toyota desarrollado por Taiichi Ohno y Shigeo Shingo, Lean identifica ocho tipos de desperdicio (DOWNTIME: Defectos, Sobreproducción, Espera, Talento no utilizado, Transporte, Inventario, Movimiento, Sobreprocesamiento) y proporciona herramientas para reducirlos sistemáticamente.\n\nLos principios fundamentales de Lean incluyen definir el valor desde la perspectiva del cliente, mapear el flujo de valor, crear flujo, establecer sistemas pull y perseguir la perfección a través de la mejora continua (Kaizen). Las herramientas clave incluyen mapeo de flujo de valor, organización del lugar de trabajo 5S, caminatas gemba, resolución de problemas A3, análisis de causa raíz (5 Porqués) y poka-yoke (a prueba de errores).\n\nLean se ha expandido desde la manufactura hacia salud, servicios financieros, gobierno, desarrollo de software (Lean Software Development) y startups (metodología Lean Startup). El Lean Enterprise Institute estima que las organizaciones que implementan Lean logran reducciones del 25-75% en tiempos de entrega, 25-50% en inventario y 10-30% de mejora en productividad durante el primer año.',
    whyImportant: 'La experiencia en gestión Lean es altamente valorada en operaciones, manufactura, salud y cada vez más en empresas de tecnología. Los profesionales Lean ganan salarios medianos de $85,000-$130,000, con Lean Six Sigma Black Belts alcanzando $120,000-$160,000. Más del 40% de las ofertas de gestión de operaciones mencionan principios Lean.\n\nIncluir gestión Lean en tu currículum demuestra un compromiso con la eficiencia, la toma de decisiones basada en datos y la mejora continua. Es una habilidad diferenciadora que señala que puedes reducir costos, mejorar calidad y optimizar procesos sin importar la industria.',
    keywords: ['currículum de gestión lean', 'habilidades de metodología lean', 'currículum de manufactura lean', 'mejora de procesos lean'],
    searchIntents: ['cómo incluir gestión lean en el currículum', 'habilidades lean para gerentes de operaciones', 'ejemplos de currículum de gestión lean'],
    relatedSkills: ['Six Sigma', 'Kaizen', 'Mapeo de Flujo de Valor', 'Mejora de Procesos', '5S', 'Kanban', 'Análisis de Causa Raíz', 'Mejora Continua', 'Reducción de Desperdicios', 'Sistema de Producción Toyota'],
    professionSlugs: ['gerente-de-operaciones', 'gerente-general', 'gerente-de-cadena-de-suministro', 'gerente-de-almacen', 'consultor-de-gestion', 'director-de-operaciones'],
    atsKeywords: ['Lean', 'gestión Lean', 'manufactura Lean', 'Kaizen', 'mapeo de flujo de valor', '5S', 'eliminación de desperdicios', 'mejora continua', 'gemba', 'resolución de problemas A3', 'sistema pull', 'Lean Six Sigma'],
    resumeTips: [
      'Especifica qué herramientas Lean has aplicado (mapeo de flujo de valor, 5S, A3, eventos Kaizen).',
      'Cuantifica la reducción de desperdicios en términos de ahorro de tiempo, costo o inventario.',
      'Incluye certificaciones Lean como Lean Six Sigma Green Belt o Black Belt.',
      'Describe la escala de las implementaciones Lean incluyendo tamaño del equipo y alcance.',
      'Menciona las industrias específicas donde has aplicado principios Lean.'
    ],
    exampleBullets: [
      'Lideré 8 eventos Kaizen en operaciones de manufactura, eliminando $1.8M en desperdicio anual y reduciendo el tiempo de entrega de producción en un 42%.',
      'Realicé mapeo de flujo de valor para un proceso de cumplimiento de pedidos de 15 pasos, identificando y eliminando 6 pasos sin valor agregado que redujeron el tiempo de ciclo de 14 días a 5 días.',
      'Implementé organización 5S del lugar de trabajo en 3 instalaciones, mejorando la productividad en un 22% y reduciendo incidentes de seguridad laboral en un 55%.',
      'Diseñé un sistema de inventario basado en pull que redujo el inventario de materia prima en $3.2M manteniendo tasas de cumplimiento de pedidos del 99.5%.'
    ],
    faqs: [
      { question: '¿La gestión Lean solo es relevante para roles de manufactura?', answer: 'No, los principios Lean se aplican en todas las industrias. La salud usa Lean para reducir tiempos de espera de pacientes, los servicios financieros lo aplican para optimizar el procesamiento de préstamos, las empresas de tecnología lo usan para optimizar flujos de desarrollo de software, y las agencias gubernamentales lo implementan para mejorar la entrega de servicios.' },
      { question: '¿Cómo se diferencia la gestión Lean de Six Sigma?', answer: 'Lean se enfoca en eliminar desperdicios y mejorar el flujo, mientras que Six Sigma se enfoca en reducir la variación y los defectos usando métodos estadísticos. Son complementarios y frecuentemente se combinan como Lean Six Sigma. En tu currículum, listar ambos demuestra amplitud de experiencia en mejora de procesos.' },
      { question: '¿Necesito certificación para listar Lean en mi currículum?', answer: 'La certificación no es obligatoria pero agrega credibilidad. Las certificaciones Lean Six Sigma (Yellow Belt a Black Belt) son las más reconocidas. Si no tienes certificación, demuestra conocimiento Lean describiendo herramientas específicas utilizadas, categorías de desperdicio abordadas y resultados medibles logrados.' }
    ]
  },
  'six-sigma': {
    slug: 'seis-sigma',
    title: 'Six Sigma',
    description: 'Six Sigma es una metodología basada en datos para eliminar defectos y reducir la variación en los procesos, desarrollada originalmente por el ingeniero de Motorola Bill Smith en 1986 y posteriormente popularizada por General Electric bajo Jack Welch. El término se refiere a un concepto estadístico donde los procesos producen no más de 3.4 defectos por millón de oportunidades, representando una calidad casi perfecta. Six Sigma utiliza el marco DMAIC (Definir, Medir, Analizar, Mejorar, Controlar) para la mejora de procesos existentes y DMADV (Definir, Medir, Analizar, Diseñar, Verificar) para el diseño de nuevos procesos.\n\nLos profesionales de Six Sigma utilizan herramientas estadísticas incluyendo gráficos de control, análisis de capacidad de proceso, pruebas de hipótesis, análisis de regresión, diseño de experimentos (DOE), análisis de modo y efecto de falla (FMEA) y análisis de Pareto. La metodología emplea un sistema de certificación basado en cinturones: Yellow Belt para participantes del equipo, Green Belt para líderes de proyecto, Black Belt para expertos de mejora a tiempo completo y Master Black Belt para líderes de programa.\n\nSix Sigma ha sido adoptado en manufactura, salud, servicios financieros, telecomunicaciones y tecnología. Las organizaciones reportan retornos típicos de $200,000-$500,000 por proyecto Black Belt, con grandes corporaciones como GE, Honeywell y 3M atribuyendo miles de millones en ahorros a programas Six Sigma.',
    whyImportant: 'La certificación Six Sigma es una de las credenciales más cuantificablemente valiosas en gestión de operaciones y calidad. Los poseedores de Green Belt ganan 15-20% más que sus pares no certificados, mientras que los Black Belts ganan salarios medianos de $110,000-$145,000. Six Sigma se menciona en más del 35% de las ofertas de empleo de operaciones, calidad e ingeniería de procesos.\n\nIncluir Six Sigma en tu currículum demuestra rigor analítico, alfabetización estadística y una metodología probada para impulsar mejoras medibles. Los empleadores valoran a los profesionales Six Sigma porque se espera que cada proyecto entregue resultados financieros cuantificables.',
    keywords: ['currículum de six sigma', 'currículum de certificación six sigma', 'habilidades six sigma', 'currículum de six sigma green belt'],
    searchIntents: ['cómo incluir six sigma en el currículum', 'certificación six sigma para currículum', 'ejemplos de currículum six sigma'],
    relatedSkills: ['Gestión Lean', 'DMAIC', 'Control Estadístico de Procesos', 'Análisis de Causa Raíz', 'Mejora de Procesos', 'Gestión de Calidad', 'Minitab', 'Análisis de Datos', 'Kaizen', 'Mapeo de Procesos'],
    professionSlugs: ['gerente-de-operaciones', 'gerente-general', 'consultor-de-gestion', 'gerente-de-cadena-de-suministro', 'director-de-operaciones', 'gerente-de-proyectos'],
    atsKeywords: ['Six Sigma', 'DMAIC', 'Green Belt', 'Black Belt', 'mejora de procesos', 'análisis estadístico', 'análisis de causa raíz', 'reducción de defectos', 'capacidad de proceso', 'gráficos de control', 'Lean Six Sigma', 'mejora continua'],
    resumeTips: [
      'Lista tu nivel de cinturón Six Sigma de forma prominente (Yellow, Green, Black, Master Black Belt).',
      'Incluye la entidad certificadora (ASQ, IASSC o programa específico de empresa).',
      'Cuantifica los ahorros del proyecto en montos de dólares y porcentajes de reducción de defectos.',
      'Menciona herramientas estadísticas específicas utilizadas como Minitab, JMP o SPSS.',
      'Describe el número de proyectos Six Sigma completados y su impacto acumulado.'
    ],
    exampleBullets: [
      'Completé 6 proyectos Six Sigma Black Belt generando $2.4M en ahorros anuales mediante reducción de defectos y optimización de procesos.',
      'Reduje la tasa de defectos de manufactura de 15,000 PPM a 850 PPM usando metodología DMAIC, ahorrando $780,000 anuales en costos de retrabajo.',
      'Capacité y mentoré a 24 candidatos Green Belt en 3 unidades de negocio, construyendo capacidad interna que entregó $4.1M en ahorros de proyectos en el primer año.',
      'Apliqué Diseño de Experimentos para optimizar un proceso químico, aumentando el rendimiento en un 12% y reduciendo el desperdicio de materia prima en $320,000 al año.'
    ],
    faqs: [
      { question: '¿Qué cinturón Six Sigma debo perseguir para mi currículum?', answer: 'Comienza con Green Belt si deseas liderar proyectos de mejora junto con tu rol habitual. Persigue Black Belt si quieres hacer de la mejora de procesos tu enfoque profesional principal. Yellow Belt es una buena base pero tiene menor impacto en el currículum. Las certificaciones ASQ e IASSC son las más ampliamente reconocidas.' },
      { question: '¿Six Sigma sigue siendo relevante en 2025?', answer: 'Sí, Six Sigma sigue siendo altamente relevante, especialmente cuando se combina con Lean como Lean Six Sigma. Mientras que Agile ha ganado prominencia en software, Six Sigma domina en manufactura, salud, servicios financieros y cualquier entorno donde reducir defectos y variación es crítico.' },
      { question: '¿Cómo muestro valor de Six Sigma sin certificación de cinturón?', answer: 'Describe proyectos DMAIC específicos en los que participaste, herramientas estadísticas que utilizaste y resultados medibles logrados. Menciona cualquier capacitación en Six Sigma completada incluso sin certificación formal. Enfócate en resultados y conocimiento metodológico más que en la certificación en sí.' }
    ]
  },
  'strategic-planning': {
    slug: 'planificacion-estrategica',
    title: 'Planificación Estratégica',
    description: 'La planificación estratégica es el proceso organizacional de definir la dirección a largo plazo, establecer prioridades, asignar recursos y alinear actividades para lograr ventaja competitiva y objetivos de los interesados. Involucra escaneo ambiental, articulación de visión y misión, establecimiento de metas, formulación de estrategia, planificación de implementación y medición de desempeño. Los planes estratégicos típicamente cubren horizontes de 3-5 años con revisiones y ajustes anuales.\n\nLa planificación estratégica moderna integra marcos como las Cinco Fuerzas de Porter, Estrategia de Océano Azul, la Matriz de Ansoff, planificación de escenarios y el Business Model Canvas. Los líderes utilizan herramientas como análisis PESTLE para evaluación del entorno externo, análisis FODA para evaluación de capacidades internas y cuadros de mando integral para monitoreo de ejecución estratégica.\n\nLa disciplina ha evolucionado de una planificación rígida y descendente hacia enfoques más adaptativos que incorporan revisión estratégica continua, preparación para disrupciones digitales y co-creación con los interesados. Las organizaciones que ejecutan la planificación estratégica efectivamente tienen 12 veces más probabilidades de lograr sus objetivos que aquellas sin procesos formales de planificación.',
    whyImportant: 'La experiencia en planificación estratégica es un requisito previo para roles de gestión senior y ejecutivos. Los profesionales con habilidades de planificación estratégica ganan 20-35% más que sus pares operativos, con VP y estrategas de nivel C alcanzando salarios de $150,000-$300,000+. Más del 50% de las ofertas de nivel director y superior citan planificación estratégica como competencia requerida.\n\nIncluir planificación estratégica en tu currículum te posiciona como un líder que piensa más allá de las operaciones diarias. Señala la capacidad de conectar actividades individuales con la visión organizacional, una habilidad que distingue a los gerentes de los ejecutivos ante los ojos de los reclutadores.',
    keywords: ['currículum de planificación estratégica', 'habilidades de planificación estratégica', 'palabras clave de estrategia para currículum', 'currículum de gestión estratégica'],
    searchIntents: ['cómo mostrar planificación estratégica en el currículum', 'habilidades de planificación estratégica para ejecutivos', 'ejemplos de currículum de planificación estratégica'],
    relatedSkills: ['Estrategia de Negocios', 'Análisis FODA', 'Análisis Competitivo', 'Análisis de Mercado', 'Planificación Financiera', 'OKRs', 'Cuadro de Mando Integral', 'Gestión del Cambio', 'Diseño Organizacional'],
    professionSlugs: ['gerente-de-estrategia', 'director-ejecutivo', 'director-de-operaciones', 'vicepresidente', 'director-de-operaciones', 'consultor-de-gestion', 'gerente-general', 'consultor-de-estrategia'],
    atsKeywords: ['planificación estratégica', 'desarrollo de estrategia', 'planificación a largo plazo', 'hoja de ruta estratégica', 'establecimiento de visión', 'alineación estratégica', 'estrategia competitiva', 'estrategia de crecimiento', 'posicionamiento de mercado', 'iniciativas estratégicas'],
    resumeTips: [
      'Describe el alcance y horizonte de los planes estratégicos que desarrollaste o a los que contribuiste.',
      'Cuantifica los resultados de negocio derivados de iniciativas estratégicas.',
      'Menciona marcos específicos utilizados como cuadro de mando integral, OKRs o planificación de escenarios.',
      'Destaca la colaboración multifuncional involucrada en el desarrollo de la estrategia.',
      'Incluye ejemplos de pivotes o adaptaciones estratégicas que demuestren flexibilidad.'
    ],
    exampleBullets: [
      'Desarrollé un plan estratégico a 5 años que guió $45M en inversiones de capital, resultando en un crecimiento de ingresos del 28% y expansión de participación de mercado del 12% al 19%.',
      'Lideré el proceso anual de planificación estratégica para una unidad de negocio de $200M, alineando 8 directores de departamento en prioridades que entregaron $15M en utilidad incremental.',
      'Creé una estrategia de transformación digital que trasladó el 40% de los ingresos a canales en línea en 3 años, generando $22M en nuevos ingresos digitales.',
      'Facilité talleres de planificación de escenarios con el equipo ejecutivo, identificando 3 pivotes estratégicos que protegieron $8M en ingresos durante la disrupción del mercado.'
    ],
    faqs: [
      { question: '¿Cómo demuestro habilidades de planificación estratégica a nivel medio de carrera?', answer: 'Destaca contribuciones a la estrategia departamental, desarrollo de casos de negocio, análisis de mercado y procesos de establecimiento de metas. Muestra que conectaste las actividades del equipo con los objetivos organizacionales más amplios e hiciste recomendaciones que influyeron en las decisiones de asignación de recursos.' },
      { question: '¿Qué marcos de planificación estratégica debo mencionar en mi currículum?', answer: 'Menciona marcos relevantes para tu industria y nivel de rol. Los más comunes incluyen análisis FODA, cuadro de mando integral, OKRs, Cinco Fuerzas de Porter y Business Model Canvas. Para roles ejecutivos, referencia planificación de escenarios, Estrategia de Océano Azul o gestión estratégica de portafolio.' },
      { question: '¿La planificación estratégica es diferente de la estrategia de negocios en un currículum?', answer: 'La planificación estratégica se refiere al proceso de crear y ejecutar la estrategia, mientras que la estrategia de negocios se refiere al contenido y dirección de la estrategia en sí. Ambas son valiosas y complementarias. Lista planificación estratégica para mostrar experiencia en procesos y estrategia de negocios para mostrar pensamiento direccional.' }
    ]
  },
  'business-strategy': {
    slug: 'estrategia-de-negocios',
    title: 'Estrategia de Negocios',
    description: 'La estrategia de negocios es el conjunto de decisiones y acciones que determinan cómo una organización crea, entrega y captura valor en su entorno competitivo. Abarca posicionamiento competitivo, diseño de propuesta de valor, decisiones de entrada y expansión de mercado, asignación de recursos y desarrollo de ventaja competitiva sostenible. La estrategia de negocios opera a nivel corporativo, de unidad de negocio y funcional.\n\nLos marcos estratégicos clave incluyen las estrategias genéricas de Michael Porter (liderazgo en costos, diferenciación, enfoque), la Visión Basada en Recursos de la empresa, la teoría de Capacidades Dinámicas, Estrategia de Plataformas y Estrategia de Ecosistemas. Los profesionales utilizan herramientas como el Business Model Canvas, Análisis de Cadena de Valor, Matriz de Crecimiento-Participación (Matriz BCG) y los Tres Horizontes de Crecimiento de McKinsey.\n\nLa estrategia de negocios moderna ha evolucionado para abordar la disrupción digital, economías de plataforma, efectos de red e imperativos de sostenibilidad. Los estrategas deben equilibrar la explotación de ventajas actuales con la exploración de nuevas oportunidades, navegando la incertidumbre a través de agilidad estratégica, experimentación y toma de decisiones basada en datos.',
    whyImportant: 'La experiencia en estrategia de negocios es la competencia definitoria para roles de liderazgo y consultoría. Los consultores de estrategia en firmas de primer nivel ganan $150,000-$250,000, mientras que los directores de estrategia corporativa alcanzan $160,000-$220,000. Las habilidades de estrategia de negocios se mencionan en más del 45% de las ofertas de gestión senior y ejecutivas.\n\nIncluir estrategia de negocios en tu currículum señala pensamiento de alto nivel y la capacidad de impulsar la dirección organizacional. Te diferencia de candidatos que se enfocan únicamente en la ejecución, posicionándote para roles que influyen en la trayectoria y posicionamiento competitivo de la empresa.',
    keywords: ['currículum de estrategia de negocios', 'habilidades de pensamiento estratégico', 'habilidades de estrategia empresarial', 'currículum de consultor de estrategia'],
    searchIntents: ['cómo mostrar estrategia de negocios en el currículum', 'habilidades de estrategia de negocios para gerentes', 'ejemplos de currículum de estrategia'],
    relatedSkills: ['Planificación Estratégica', 'Análisis Competitivo', 'Análisis de Mercado', 'Modelado Financiero', 'Desarrollo de Negocios', 'Análisis FODA', 'Gestión del Cambio', 'Fusiones y Adquisiciones', 'Gestión de Innovación'],
    professionSlugs: ['gerente-de-estrategia', 'consultor-de-estrategia', 'consultor-de-gestion', 'director-ejecutivo', 'vicepresidente', 'gerente-general', 'analista-de-negocios', 'director-de-operaciones'],
    atsKeywords: ['estrategia de negocios', 'ventaja competitiva', 'posicionamiento de mercado', 'propuesta de valor', 'análisis estratégico', 'estrategia de crecimiento', 'modelo de negocio', 'entrada al mercado', 'panorama competitivo', 'dirección estratégica'],
    resumeTips: [
      'Describe las estrategias que desarrollaste y sus resultados medibles de negocio.',
      'Referencia marcos estratégicos específicos y herramientas analíticas utilizadas.',
      'Cuantifica ganancias de participación de mercado, crecimiento de ingresos o ventajas de costos logradas.',
      'Destaca experiencia presentando estrategia a juntas directivas, ejecutivos o inversionistas.',
      'Menciona actividades de recolección y análisis de inteligencia competitiva.'
    ],
    exampleBullets: [
      'Diseñé una estrategia de expansión de mercado que ingresó a 3 nuevos mercados geográficos, generando $18M en ingresos del primer año y logrando rentabilidad en 14 meses.',
      'Realicé análisis competitivo y desarrollé una estrategia de diferenciación que aumentó la retención de clientes del 78% al 92% y el poder de fijación de precios en un 15%.',
      'Lideré la transformación del modelo de negocio de licencias a SaaS, creciendo los ingresos recurrentes anuales de $5M a $28M en 4 años.',
      'Presenté estrategia de crecimiento a la junta directiva resultando en aprobación de inversión de $12M y posterior aumento de ingresos del 45% en 2 años.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia la estrategia de negocios del desarrollo de negocios?', answer: 'La estrategia de negocios define la dirección y el posicionamiento competitivo de la organización, mientras que el desarrollo de negocios ejecuta actividades de crecimiento específicas como alianzas, ventas y entrada al mercado. La estrategia se trata de elegir qué hacer y dónde competir; el desarrollo de negocios se trata de hacerlo realidad.' },
      { question: '¿Qué nivel de experiencia se necesita para listar estrategia de negocios en un currículum?', answer: 'Puedes listarlo a cualquier nivel si has contribuido a decisiones estratégicas. Los profesionales junior pueden destacar análisis estratégico, investigación de mercado y desarrollo de casos de negocio. Los profesionales senior deben demostrar formulación de estrategia, presentaciones a nivel de junta y resultados estratégicos medibles.' },
      { question: '¿Debo listar marcos estratégicos específicos en mi currículum?', answer: 'Sí, mencionar marcos como las Cinco Fuerzas de Porter, Business Model Canvas o Estrategia de Océano Azul demuestra pensamiento estratégico estructurado. Sin embargo, enfócate en marcos que realmente hayas aplicado en la práctica en lugar de listar conocimiento teórico.' }
    ]
  },
  'change-management': {
    slug: 'gestion-del-cambio',
    title: 'Gestión del Cambio',
    description: 'La gestión del cambio es el enfoque estructurado para transicionar individuos, equipos y organizaciones de un estado actual a un estado futuro deseado. Aborda el lado humano del cambio, asegurando que las transformaciones organizacionales como implementaciones tecnológicas, rediseños de procesos, fusiones o reestructuraciones logren sus resultados previstos. Las metodologías líderes incluyen el modelo ADKAR de Prosci (Conciencia, Deseo, Conocimiento, Habilidad, Refuerzo), el Proceso de 8 Pasos de Kotter para Liderar el Cambio y el Modelo de Influencia de McKinsey.\n\nLos profesionales de gestión del cambio evalúan la preparación para el cambio, identifican la resistencia, desarrollan planes de comunicación, diseñan programas de capacitación, crean estrategias de involucramiento de interesados y miden las tasas de adopción. La disciplina integra psicología organizacional, teoría de comunicación, gestión de proyectos y desarrollo de liderazgo.\n\nLa investigación de Prosci muestra que los proyectos con excelente gestión del cambio tienen 6 veces más probabilidades de cumplir sus objetivos que aquellos con mala gestión del cambio. A medida que las organizaciones enfrentan disrupción acelerada por transformación digital, adopción de IA y evolución de la fuerza laboral, la gestión del cambio se ha convertido en una capacidad organizacional crítica en lugar de una actividad puntual.',
    whyImportant: 'La gestión del cambio es cada vez más reconocida como una disciplina profesional independiente. Los Profesionales Certificados en Gestión del Cambio (CCMP) ganan salarios medianos de $100,000-$140,000, mientras que los consultores senior de gestión del cambio alcanzan $140,000-$180,000. Más del 30% de las ofertas relacionadas con transformación requieren específicamente experiencia en gestión del cambio.\n\nIncluir gestión del cambio en tu currículum demuestra que puedes liderar personas a través de la incertidumbre e impulsar la adopción de nuevos procesos, tecnologías y formas de trabajo. Esta habilidad es especialmente valiosa durante la transformación digital, integración de fusiones y adquisiciones y reestructuración organizacional.',
    keywords: ['currículum de gestión del cambio', 'habilidades de gestión del cambio', 'currículum de cambio organizacional', 'certificación de gestión del cambio'],
    searchIntents: ['cómo incluir gestión del cambio en el currículum', 'habilidades de gestión del cambio para líderes', 'ejemplos de currículum de gestión del cambio'],
    relatedSkills: ['Gestión de Interesados', 'Diseño Organizacional', 'Estrategia de Comunicación', 'Capacitación y Desarrollo', 'Compromiso del Empleado', 'Gestión de Proyectos', 'Liderazgo', 'Mejora de Procesos'],
    professionSlugs: ['consultor-de-gestion-del-cambio', 'consultor-de-gestion', 'gerente-de-recursos-humanos', 'gerente-de-operaciones', 'gerente-de-proyectos', 'director-de-operaciones', 'director-de-operaciones'],
    atsKeywords: ['gestión del cambio', 'ADKAR', 'Kotter', 'cambio organizacional', 'preparación para el cambio', 'involucramiento de interesados', 'adopción', 'gestión de resistencia', 'plan de comunicación', 'campeón del cambio', 'transformación', 'Prosci'],
    resumeTips: [
      'Referencia metodologías específicas de gestión del cambio que hayas aplicado (ADKAR, Kotter, McKinsey).',
      'Cuantifica tasas de adopción y métricas de compromiso de usuarios resultantes de iniciativas de cambio.',
      'Describe la escala y alcance de las transformaciones que has apoyado.',
      'Incluye la certificación Prosci o CCMP si la posees.',
      'Destaca la colaboración multifuncional y la gestión del patrocinio ejecutivo.'
    ],
    exampleBullets: [
      'Lideré la gestión del cambio para una implementación de ERP de $15M que afectó a 2,500 empleados, logrando una tasa de adopción del 94% dentro de los 90 días posteriores al lanzamiento.',
      'Desarrollé y ejecuté planes de comunicación para una fusión corporativa que involucró a 1,200 empleados en 4 ubicaciones, manteniendo un compromiso del 88% durante la transición.',
      'Diseñé una red de campeones del cambio de 45 influenciadores en 8 departamentos, reduciendo la resistencia en un 60% y acelerando la adopción tecnológica en 3 meses.',
      'Apliqué la metodología ADKAR a un programa de transformación digital, aumentando las puntuaciones de competencia de usuarios del 42% al 89% y reduciendo tickets de soporte en un 65%.'
    ],
    faqs: [
      { question: '¿La gestión del cambio es una habilidad blanda o una disciplina técnica?', answer: 'La gestión del cambio es ambas. Involucra habilidades blandas como comunicación, empatía e influencia, pero también metodologías estructuradas, herramientas de evaluación y marcos de medición. En tu currículum, preséntala como una disciplina profesional con métodos específicos y resultados medibles.' },
      { question: '¿Qué certificación de gestión del cambio es más valorada?', answer: 'La Certificación de Gestión del Cambio de Prosci es la más ampliamente reconocida en entornos corporativos. CCMP (Certified Change Management Professional) de ACMP es la certificación profesional premier. Ambas mejoran significativamente la credibilidad del currículum para roles dedicados de gestión del cambio.' },
      { question: '¿Cómo demuestro experiencia en gestión del cambio sin un rol dedicado al cambio?', answer: 'Describe instancias donde lideraste equipos a través de transiciones, gestionaste la resistencia a nuevos procesos, creaste materiales de capacitación, comunicaste cambios organizacionales o mediste la adopción de nuevas herramientas. Cualquier rol de liderazgo que involucre guiar a las personas a través del cambio califica.' }
    ]
  },
  'risk-management': {
    slug: 'gestion-de-riesgos',
    title: 'Gestión de Riesgos',
    description: 'La gestión de riesgos es el proceso sistemático de identificar, evaluar, priorizar, mitigar y monitorear amenazas y oportunidades que podrían afectar los objetivos organizacionales. Abarca riesgos estratégicos, operativos, financieros, de cumplimiento y reputacionales. El estándar ISO 31000 proporciona principios y directrices reconocidos internacionalmente, mientras que marcos como COSO ERM (Enterprise Risk Management) y NIST RMF ofrecen enfoques estructurados para diferentes contextos.\n\nLa gestión de riesgos involucra evaluaciones cualitativas (matrices de riesgo, mapas de calor) y métodos cuantitativos (simulación Monte Carlo, Valor en Riesgo, análisis de valor monetario esperado). Los profesionales desarrollan registros de riesgo, realizan talleres de riesgo, diseñan estrategias de mitigación, implementan controles y establecen cadencias de reporte de riesgos para el liderazgo y las juntas directivas.\n\nLa Gestión de Riesgos Empresariales (ERM) se ha convertido en una prioridad a nivel de junta directiva a medida que las organizaciones enfrentan complejidad creciente por amenazas de ciberseguridad, cambios regulatorios, disrupciones en la cadena de suministro, riesgos climáticos e inestabilidad geopolítica. La disciplina ahora se integra con la planificación estratégica, asegurando que el apetito de riesgo se alinee con los objetivos organizacionales y el posicionamiento competitivo.',
    whyImportant: 'Los profesionales de gestión de riesgos tienen alta demanda en los sectores de finanzas, salud, tecnología y gobierno. Los profesionales de ERM ganan salarios medianos de $95,000-$140,000, con Directores de Riesgo en instituciones importantes ganando $250,000-$500,000+. Más del 40% de los roles de gestión de proyectos y operaciones listan gestión de riesgos como habilidad requerida o preferida.\n\nIncluir gestión de riesgos en tu currículum demuestra previsión, pensamiento analítico y la capacidad de proteger el valor organizacional. Señala que abordas proactivamente las amenazas en lugar de reaccionar ante crisis, una cualidad altamente valorada por empleadores conscientes del riesgo.',
    keywords: ['currículum de gestión de riesgos', 'habilidades de gestión de riesgos', 'currículum de gestión de riesgos empresariales', 'currículum de evaluación de riesgos'],
    searchIntents: ['cómo incluir gestión de riesgos en el currículum', 'habilidades de gestión de riesgos para gerentes', 'ejemplos de currículum de gestión de riesgos'],
    relatedSkills: ['Gestión de Cumplimiento', 'Gestión de Crisis', 'Planificación de Continuidad del Negocio', 'Análisis Financiero', 'Gestión de Proyectos', 'Cumplimiento Regulatorio', 'Seguros', 'Auditoría', 'Controles Internos'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-operaciones', 'gerente-de-finanzas', 'director-financiero', 'director-de-operaciones', 'consultor-de-gestion', 'analista-de-negocios'],
    atsKeywords: ['gestión de riesgos', 'gestión de riesgos empresariales', 'ERM', 'evaluación de riesgos', 'mitigación de riesgos', 'registro de riesgos', 'ISO 31000', 'COSO', 'apetito de riesgo', 'matriz de riesgos', 'controles', 'monitoreo de riesgos'],
    resumeTips: [
      'Especifica los marcos de gestión de riesgos que has utilizado (ISO 31000, COSO ERM, NIST).',
      'Cuantifica la reducción de riesgos en términos financieros o de impacto de probabilidad.',
      'Describe los tipos de riesgos gestionados (operativos, financieros, cibernéticos, de cumplimiento).',
      'Menciona reportes de riesgo a juntas directivas o comités ejecutivos.',
      'Incluye certificaciones relevantes como CRM, PMI-RMP o FRM.'
    ],
    exampleBullets: [
      'Diseñé e implementé un marco de gestión de riesgos empresariales que cubre 120 categorías de riesgo, reduciendo los riesgos de alta severidad no mitigados en un 68% en 12 meses.',
      'Realicé simulaciones Monte Carlo para un proyecto de capital de $50M, identificando $8M en requisitos de contingencia que evitaron sobrecostos presupuestarios.',
      'Establecí un comité de riesgos y cadencia trimestral de revisión de riesgos para el equipo ejecutivo, mejorando la visibilidad de riesgos y reduciendo el tiempo de respuesta a incidentes en un 45%.',
      'Gestioné un registro de riesgos de más de 200 riesgos en 8 unidades de negocio, implementando controles que ahorraron un estimado de $3.5M en pérdidas potenciales anuales.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de gestión de riesgos son más valoradas?', answer: 'PMI-RMP (Risk Management Professional) es ideal para roles enfocados en proyectos. FRM (Financial Risk Manager) es el estándar de oro en servicios financieros. CRM (Certified Risk Manager) es valorado en seguros y riesgo empresarial. Elige según tu industria y rol objetivo.' },
      { question: '¿Cómo listo experiencia en gestión de riesgos desde un rol no dedicado a riesgos?', answer: 'Describe actividades relacionadas con riesgos dentro de tu rol más amplio: evaluaciones de riesgos realizadas, estrategias de mitigación diseñadas, registros de riesgos mantenidos o planes de contingencia desarrollados. Los gerentes de proyectos, gerentes de operaciones y analistas financieros rutinariamente realizan actividades de gestión de riesgos.' },
      { question: '¿Debo incluir métodos de riesgo tanto cualitativos como cuantitativos en mi currículum?', answer: 'Sí, demostrar ambos muestra versatilidad. Menciona herramientas cualitativas como matrices de riesgo y mapas de calor junto con métodos cuantitativos como simulación Monte Carlo, análisis de sensibilidad o valor monetario esperado. Los roles senior requieren cada vez más capacidades de análisis cuantitativo de riesgos.' }
    ]
  },
  'stakeholder-management': {
    slug: 'gestion-de-interesados',
    title: 'Gestión de Interesados',
    description: 'La gestión de interesados es el proceso de identificar, analizar, planificar e interactuar con individuos y grupos que tienen interés o influencia sobre un proyecto, programa u organización. La gestión efectiva de interesados asegura que las expectativas estén alineadas, la comunicación sea personalizada, la resistencia sea abordada y el apoyo se mantenga a lo largo de las iniciativas.\n\nEl proceso de gestión de interesados incluye identificación de interesados, análisis (matrices de poder/interés, modelos de prominencia), planificación de involucramiento, ejecución de comunicación y monitoreo de relaciones. Los profesionales desarrollan mapas de interesados, crean matrices RACI, diseñan planes de comunicación con canales y cadencias apropiadas y gestionan rutas de escalamiento para conflictos o preocupaciones.\n\nLa gestión de interesados es una competencia crítica en gestión de proyectos (PMBOK dedica un área de conocimiento completa), gestión del cambio, desarrollo de producto y liderazgo ejecutivo. En organizaciones complejas con estructuras matriciales, prioridades competitivas y grupos diversos de interesados, la capacidad de navegar los panoramas políticos y construir coaliciones es frecuentemente la diferencia entre el éxito y el fracaso del proyecto.',
    whyImportant: 'La investigación de PMI muestra que el 30% de los fracasos de proyectos se atribuyen a un pobre involucramiento de interesados. Las habilidades de gestión de interesados se listan en más del 25% de las ofertas de gestión de proyectos y productos. Los profesionales que sobresalen en gestión de interesados avanzan más rápido hacia posiciones de liderazgo.\n\nIncluir gestión de interesados en tu currículum demuestra inteligencia interpersonal, astucia política y la capacidad de influir sin autoridad. Estas habilidades son especialmente valoradas en organizaciones matriciales, consultoría y cualquier rol que requiera colaboración multifuncional.',
    keywords: ['currículum de gestión de interesados', 'habilidades de involucramiento de interesados', 'habilidades de gestión de interesados', 'currículum de comunicación con interesados'],
    searchIntents: ['cómo incluir gestión de interesados en el currículum', 'habilidades de gestión de interesados para PMs', 'ejemplos de currículum de involucramiento de interesados'],
    relatedSkills: ['Comunicación', 'Gestión del Cambio', 'Gestión de Proyectos', 'Negociación', 'Resolución de Conflictos', 'Comunicación Ejecutiva', 'Influencia', 'Construcción de Relaciones', 'RACI'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-programas', 'gerente-de-producto', 'consultor-de-gestion', 'consultor-de-gestion-del-cambio', 'director-de-operaciones'],
    atsKeywords: ['gestión de interesados', 'involucramiento de interesados', 'análisis de interesados', 'comunicación con interesados', 'comunicación ejecutiva', 'RACI', 'influencia', 'multifuncional', 'gestión de relaciones', 'mapeo de interesados'],
    resumeTips: [
      'Describe el rango y la seniority de los interesados que has gestionado (C-suite, junta, clientes, proveedores).',
      'Cuantifica puntuaciones de satisfacción de interesados o métricas de involucramiento.',
      'Menciona herramientas específicas utilizadas como mapas de interesados, matrices RACI o matrices de poder/interés.',
      'Destaca logros de resolución de conflictos y construcción de consenso.',
      'Incluye ejemplos de influenciar decisiones sin autoridad directa.'
    ],
    exampleBullets: [
      'Gestioné relaciones con más de 40 interesados en 6 departamentos y 3 patrocinadores ejecutivos, logrando una calificación de satisfacción de interesados del 96% en una transformación digital de $10M.',
      'Desarrollé un plan de involucramiento de interesados para la integración de una fusión que mantuvo un 90% de retención de personal clave a través de comunicación estructurada e involucramiento.',
      'Creé reportes quincenales para el comité directivo ejecutivo que mejoraron la velocidad de toma de decisiones en un 35% y eliminaron cuellos de botella de escalamiento.',
      'Resolví prioridades conflictivas entre 4 interesados de nivel VP a través de talleres facilitados, alcanzando consenso y evitando $2M en esfuerzos duplicados.'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades de gestión de interesados en un currículum?', answer: 'Usa verbos de acción como "involucré", "alineé", "facilité" e "influencié". Describe los tipos y la seniority de los interesados gestionados, los métodos utilizados y los resultados logrados. Cuantifica con puntuaciones de satisfacción de interesados, plazos de decisión o resultados de resolución de conflictos.' },
      { question: '¿La gestión de interesados es una habilidad blanda o dura?', answer: 'Es principalmente una habilidad blanda que involucra comunicación, empatía e influencia, pero utiliza herramientas estructuradas como matrices de análisis de interesados, matrices RACI y planes de involucramiento. Preséntala como una competencia profesional con dimensiones tanto interpersonales como metodológicas.' },
      { question: '¿Qué tan importante es la gestión de interesados para roles técnicos?', answer: 'Muy importante, especialmente a medida que avanzas en tu carrera. Los gerentes de ingeniería, líderes técnicos y arquitectos frecuentemente gestionan expectativas de interesados. Incluso los contribuidores individuales se benefician de la gestión de interesados cuando trabajan en proyectos entre equipos o presentan decisiones técnicas a audiencias no técnicas.' }
    ]
  },
  'budget-management': {
    slug: 'gestion-de-presupuesto',
    title: 'Gestión de Presupuesto',
    description: 'La gestión de presupuesto es el proceso de planificar, asignar, monitorear y controlar recursos financieros para lograr objetivos organizacionales o de proyecto. Abarca la creación de presupuesto (base cero, incremental, basado en actividades o pronósticos continuos), análisis de variaciones, seguimiento de costos, reproyección y reportes financieros. Los gestores de presupuesto trabajan con sistemas contables, plataformas ERP y herramientas de planificación financiera para asegurar que el gasto se alinee con las prioridades estratégicas.\n\nLa gestión efectiva de presupuesto requiere comprender las estructuras de costos (fijos vs. variables, directos vs. indirectos), las distinciones entre gastos de capital y gastos operativos, y los marcos de gobernanza financiera. Los profesionales desarrollan presupuestos operativos anuales, presupuestos de proyectos, presupuestos departamentales y presupuestos de inversión de capital, a menudo abarcando millones o miles de millones de dólares.\n\nLa gestión moderna de presupuesto utiliza cada vez más herramientas de FP&A basadas en la nube como Adaptive Planning, Anaplan y Oracle PBCS para permitir visibilidad en tiempo real, modelado de escenarios y presupuestación colaborativa en organizaciones distribuidas.',
    whyImportant: 'La gestión de presupuesto es una competencia central para cualquier rol con responsabilidad de P&L. Aparece en más del 50% de las ofertas de nivel gerencial y superior. Los profesionales que demuestran fuertes habilidades de gestión de presupuesto ganan 15-25% más que sus pares sin experiencia de supervisión financiera.\n\nIncluir gestión de presupuesto en tu currículum señala responsabilidad fiscal, visión empresarial y la capacidad de tomar decisiones de asignación de recursos. Es un requisito previo para avanzar a posiciones de director, VP y C-suite donde la administración financiera es una responsabilidad principal.',
    keywords: ['currículum de gestión de presupuesto', 'habilidades de gestión de presupuesto', 'currículum de presupuesto financiero', 'currículum de planificación presupuestaria'],
    searchIntents: ['cómo incluir gestión de presupuesto en el currículum', 'habilidades de gestión de presupuesto para gerentes', 'ejemplos de currículum de gestión de presupuesto'],
    relatedSkills: ['Planificación Financiera', 'Análisis de Costos', 'Gestión de Pérdidas y Ganancias', 'Modelado Financiero', 'Pronóstico', 'Análisis de Variaciones', 'Excel', 'Sistemas ERP', 'FP&A'],
    professionSlugs: ['gerente-de-finanzas', 'gerente-de-operaciones', 'gerente-general', 'gerente-de-proyectos', 'director-de-operaciones', 'director-financiero', 'director-de-organizacion-sin-fines-de-lucro'],
    atsKeywords: ['gestión de presupuesto', 'planificación presupuestaria', 'control de costos', 'análisis de variaciones', 'supervisión financiera', 'asignación de recursos', 'presupuesto operativo', 'presupuesto de capital', 'P&L', 'gestión de gastos', 'reproyección', 'gobernanza financiera'],
    resumeTips: [
      'Siempre especifica el tamaño del presupuesto que gestionaste en montos de dólares.',
      'Cuantifica ahorros de costos o logros de optimización presupuestaria.',
      'Menciona las metodologías de presupuestación utilizadas (base cero, continua, basada en actividades).',
      'Incluye experiencia con herramientas de presupuesto y sistemas ERP.',
      'Describe los procesos de gestión de variaciones y reproyección que implementaste.'
    ],
    exampleBullets: [
      'Gestioné un presupuesto operativo anual de $24M en 5 departamentos, entregando consistentemente dentro del 2% del plan mientras soportaba un crecimiento de ingresos del 18%.',
      'Implementé presupuestación base cero que identificó y eliminó $3.8M en gastos redundantes, mejorando el margen operativo en 4.2 puntos porcentuales.',
      'Desarrollé un proceso de pronóstico continuo de 12 meses que mejoró la precisión del presupuesto del 82% al 96%, permitiendo una asignación de capital más efectiva.',
      'Lideré el proceso de planificación y aprobación de presupuesto para 12 centros de costo, negociando intercambios de recursos que alinearon $45M en gasto con prioridades estratégicas.'
    ],
    faqs: [
      { question: '¿Cómo demuestro habilidades de gestión de presupuesto sin un título de finanzas?', answer: 'Cualquier rol donde controlaste gastos califica. Describe presupuestos de proyecto gestionados, gastos departamentales supervisados, valores de contratos con proveedores negociados o iniciativas de reducción de costos lideradas. Especifica montos en dólares y resultados para demostrar responsabilidad financiera.' },
      { question: '¿Qué tamaños de presupuesto son impresionantes en un currículum?', answer: 'El tamaño del presupuesto debe ser proporcional a tu nivel de rol. Gestionar $500K es impresionante para un líder de equipo, $5M para un gerente, $20M+ para un director y $100M+ para un VP o ejecutivo. El contexto importa más que los números absolutos, así que combina el tamaño del presupuesto con los resultados logrados.' },
      { question: '¿Debo incluir herramientas de gestión de presupuesto en mi currículum?', answer: 'Sí, menciona herramientas como SAP, Oracle, Workday Adaptive Planning, Anaplan o incluso habilidades avanzadas de Excel. Para empresas de tecnología, herramientas como Netsuite o QuickBooks pueden ser relevantes. Hacer coincidir tu experiencia con herramientas que el empleador usa aumenta las tasas de coincidencia ATS.' }
    ]
  },
  'financial-planning': {
    slug: 'planificacion-financiera',
    title: 'Planificación Financiera',
    description: 'La planificación financiera es el proceso de proyectar el futuro financiero de una organización, establecer metas financieras y desarrollar estrategias para alcanzarlas. Abarca pronóstico de ingresos, planificación de gastos, gestión de flujo de efectivo, decisiones de estructura de capital y planificación de inversiones. La Planificación y Análisis Financiero (FP&A) se ha convertido en una función especializada que conecta los datos contables con la toma de decisiones estratégicas.\n\nLos planificadores financieros construyen modelos financieros integrados, realizan análisis de escenarios, preparan presentaciones para juntas directivas y asesoran al liderazgo sobre las implicaciones financieras de las decisiones estratégicas. Los entregables clave incluyen planes operativos anuales, planes financieros a largo plazo, reportes de gestión mensuales y análisis ad hoc para iniciativas estratégicas como fusiones y adquisiciones, entrada al mercado o lanzamientos de productos.\n\nEl FP&A moderno aprovecha herramientas basadas en la nube como Adaptive Planning, Anaplan y Planful junto con Excel para modelado. Las tendencias emergentes incluyen xP&A (planificación y análisis extendidos), que integra la planificación financiera con la planificación operativa en ventas, cadena de suministro y fuerza laboral.',
    whyImportant: 'Las habilidades de planificación financiera son esenciales para profesionales de finanzas y cada vez más esperadas en roles de gestión general. Los analistas de FP&A ganan $75,000-$110,000, mientras que los directores de FP&A alcanzan $140,000-$180,000. La planificación financiera aparece en más del 35% de las ofertas de finanzas y gestión senior.\n\nIncluir planificación financiera en tu currículum demuestra visión empresarial y la capacidad de traducir la estrategia en términos financieros. Los empleadores valoran candidatos que pueden construir pronósticos, analizar variaciones y proporcionar información financiera accionable que impulse mejores decisiones.',
    keywords: ['currículum de planificación financiera', 'habilidades de FP&A para currículum', 'habilidades de planificación financiera', 'currículum de planificación y análisis financiero'],
    searchIntents: ['cómo incluir planificación financiera en el currículum', 'habilidades de FP&A para currículum', 'ejemplos de currículum de planificación financiera'],
    relatedSkills: ['Modelado Financiero', 'Gestión de Presupuesto', 'Pronóstico de Ingresos', 'Análisis de Costos', 'Excel', 'Adaptive Planning', 'Anaplan', 'Gestión de Flujo de Efectivo', 'Análisis de Escenarios'],
    professionSlugs: ['analista-financiero', 'gerente-de-finanzas', 'director-financiero', 'contador', 'analista-de-negocios', 'director-ejecutivo'],
    atsKeywords: ['planificación financiera', 'FP&A', 'pronóstico', 'planificación presupuestaria', 'modelado financiero', 'análisis de variaciones', 'análisis de escenarios', 'flujo de efectivo', 'plan operativo anual', 'plan a largo plazo', 'reportes de gestión'],
    resumeTips: [
      'Especifica la escala de los planes financieros desarrollados en términos de ingresos o tamaño de presupuesto.',
      'Menciona herramientas de FP&A utilizadas como Adaptive Planning, Anaplan o Hyperion.',
      'Cuantifica las mejoras en precisión de pronósticos que lograste.',
      'Describe la audiencia de tus reportes financieros (junta, equipo ejecutivo, inversionistas).',
      'Incluye experiencia tanto con planificación financiera a corto como a largo plazo.'
    ],
    exampleBullets: [
      'Lideré la función de FP&A para una unidad de negocio de $150M, desarrollando planes operativos anuales y pronósticos mensuales con una precisión del 97% respecto a los resultados reales.',
      'Construí modelos financieros integrados cubriendo ingresos, gastos y flujo de efectivo que respaldaron un exitoso levantamiento de Serie B de $25M.',
      'Implementé una metodología de pronóstico continuo que reemplazó los presupuestos anuales estáticos, reduciendo el ciclo de planificación de 12 semanas a 4 semanas.',
      'Preparé paquetes financieros trimestrales para la junta directiva incluyendo análisis de variaciones y proyecciones futuras, permitiendo toma de decisiones proactiva que preservó $4M en márgenes.',
      'Desarrollé modelos de escenarios para 3 iniciativas estratégicas, proporcionando marcos financieros que informaron $18M en decisiones de inversión.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia la planificación financiera de la contabilidad en un currículum?', answer: 'La contabilidad se enfoca en registrar, clasificar y reportar transacciones financieras históricas. La planificación financiera mira hacia el futuro, involucrando pronósticos, presupuestos, análisis de escenarios y asesoría financiera estratégica. Ambas son valiosas pero señalan diferentes competencias a los empleadores.' },
      { question: '¿Qué herramientas de FP&A debo aprender para mi currículum?', answer: 'Excel avanzado es fundamental. Adaptive Planning (Workday) y Anaplan son las plataformas líderes de FP&A. Oracle Hyperion y SAP BPC se usan en grandes empresas. Aprender cualquier plataforma dedicada de FP&A mejora significativamente tu comerciabilidad más allá de solo Excel.' },
      { question: '¿Pueden los profesionales no financieros listar planificación financiera en su currículum?', answer: 'Sí, si has desarrollado presupuestos, creado proyecciones financieras, analizado datos financieros para la toma de decisiones o gestionado responsabilidades de P&L. Enmárcalo en términos de las decisiones de negocio que tu análisis financiero respaldó y los resultados logrados.' }
    ]
  },
  'financial-modeling': {
    slug: 'modelado-financiero',
    title: 'Modelado Financiero',
    description: 'El modelado financiero es el proceso de construir representaciones abstractas de situaciones financieras utilizando hojas de cálculo o software especializado para pronosticar el desempeño financiero de una empresa. Los modelos integran datos históricos, supuestos y fórmulas matemáticas para proyectar estados de resultados, balances generales, estados de flujo de efectivo y métricas de valoración. Los tipos de modelos comunes incluyen DCF (Flujo de Caja Descontado), LBO (Compra Apalancada), M&A (Modelo de Fusión), análisis de empresas comparables y modelos operativos.\n\nLas mejores prácticas en modelado financiero incluyen estructura de diseño clara (supuestos, cálculos, resultados), formato consistente, verificación de errores, interruptores de escenarios y sensibilidad, y documentación. El Financial Modeling Institute y Wall Street Prep proporcionan capacitación y certificación estandarizadas. Los modelos típicamente usan Excel pero cada vez más aprovechan Python, R o plataformas dedicadas como Visible Alpha.\n\nEl modelado financiero es una habilidad central en banca de inversión, capital privado, desarrollo corporativo, capital de riesgo y FP&A. Un modelo bien construido sirve como herramienta de apoyo a decisiones para asignación de capital, valoración, recaudación de fondos, transacciones de M&A y planificación estratégica.',
    whyImportant: 'El modelado financiero es una de las habilidades técnicas de mayor valor en finanzas. Los analistas de banca de inversión que sobresalen en modelado ganan $100,000-$150,000 base más bonificaciones, mientras que los modeladores financieros experimentados en desarrollo corporativo alcanzan $130,000-$180,000. Es una habilidad requerida en más del 60% de las ofertas de banca de inversión, capital privado y finanzas corporativas.\n\nIncluir modelado financiero en tu currículum demuestra rigor cuantitativo y la capacidad de traducir escenarios de negocio en proyecciones financieras. Es una habilidad determinante para roles financieros bien remunerados y cada vez más valorada en posiciones de gestión estratégica.',
    keywords: ['currículum de modelado financiero', 'habilidades de modelado financiero', 'currículum de modelo DCF', 'certificación de modelado financiero'],
    searchIntents: ['cómo incluir modelado financiero en el currículum', 'habilidades de modelado financiero para analistas', 'ejemplos de currículum de modelado financiero'],
    relatedSkills: ['Análisis Financiero', 'Excel', 'Valoración', 'Análisis DCF', 'Modelado de M&A', 'Modelado LBO', 'Análisis de Escenarios', 'Análisis de Sensibilidad', 'Planificación Financiera', 'Python'],
    professionSlugs: ['analista-financiero', 'gerente-de-finanzas', 'analista-de-negocios', 'director-financiero', 'consultor-de-gestion', 'consultor-de-estrategia'],
    atsKeywords: ['modelado financiero', 'modelo financiero', 'DCF', 'flujo de caja descontado', 'LBO', 'modelo de M&A', 'valoración', 'modelado en Excel', 'análisis de escenarios', 'análisis de sensibilidad', 'modelo de tres estados', 'pro forma'],
    resumeTips: [
      'Especifica los tipos de modelos construidos (DCF, LBO, tres estados, modelo operativo).',
      'Cuantifica el tamaño de la transacción o decisión que tus modelos respaldaron.',
      'Menciona herramientas y técnicas de modelado incluyendo Excel, VBA o Python.',
      'Incluye certificaciones relevantes como FMVA o Wall Street Prep.',
      'Describe las decisiones de negocio que tus modelos informaron.'
    ],
    exampleBullets: [
      'Construí un modelo de valoración DCF para un objetivo de adquisición de $200M, identificando $35M en oportunidades de sinergia que dieron forma al precio de oferta final.',
      'Desarrollé un modelo financiero de tres estados proyectando el desempeño a 5 años para una empresa SaaS de $50M en ingresos, respaldando directamente un exitoso levantamiento de Serie C.',
      'Creé un modelo LBO para una transacción de capital privado de $150M, evaluando 12 escenarios de estrés para confirmar un TIR del 22% a los ratios de apalancamiento objetivo.',
      'Automaticé el reporte financiero mensual usando modelos de Excel mejorados con VBA, reduciendo el tiempo del analista en un 60% y eliminando errores de ingreso manual de datos.'
    ],
    faqs: [
      { question: '¿Qué tipo de modelo financiero debo destacar en mi currículum?', answer: 'Destaca modelos relevantes para tu rol objetivo. Los modelos DCF y de tres estados son universales. Los modelos LBO son esenciales para capital privado. Los modelos de M&A importan para banca de inversión y desarrollo corporativo. Los modelos operativos son importantes para roles de FP&A y estrategia.' },
      { question: '¿Debo aprender Python para modelado financiero?', answer: 'Python es cada vez más valioso para modelado financiero, especialmente para grandes conjuntos de datos, automatización y simulaciones Monte Carlo. Sin embargo, Excel sigue siendo el estándar para modelado a nivel de transacción. Aprender ambos te posiciona de manera única, combinando velocidad y escalabilidad con entregables estándar de la industria.' },
      { question: '¿Vale la pena la certificación FMVA para mi currículum?', answer: 'La FMVA (Financial Modeling and Valuation Analyst) de CFI es bien valorada para demostrar competencia en modelado, especialmente para candidatos sin experiencia en banca de inversión. Cubre DCF, LBO, M&A y análisis de sensibilidad en un currículo estructurado. Es más valiosa para profesionales de finanzas de nivel inicial a medio.' }
    ]
  },
  'cost-analysis': {
    slug: 'analisis-de-costos',
    title: 'Análisis de Costos',
    description: 'El análisis de costos es el examen sistemático de los costos para comprender su composición, comportamiento e impacto en las decisiones de negocio. Abarca técnicas como análisis de costo-beneficio (ACB), análisis de costo total de propiedad (TCO), costeo basado en actividades (ABC), análisis de costo marginal, análisis de punto de equilibrio y costeo de ciclo de vida. Los analistas de costos evalúan costos directos e indirectos, estructuras de costos fijos y variables, y generadores de costos para apoyar la fijación de precios, decisiones de hacer o comprar, justificación de inversiones y eficiencia operativa.\n\nEl análisis de costos se aplica en evaluación de inversiones de capital, selección de proveedores, fijación de precios de productos, optimización de procesos y evaluación de programas. Los analistas utilizan herramientas que van desde Excel y módulos de costos de ERP hasta plataformas especializadas como Costimator y aPriori para estimación de costos de manufactura.\n\nLos sectores gubernamental y de defensa utilizan marcos formales de análisis de costos como la Guía de Estimación y Evaluación de Costos de GAO. En entornos comerciales, el análisis de costos se integra con la planificación financiera, adquisiciones y toma de decisiones estratégicas para asegurar que los recursos se asignen a las actividades de mayor valor.',
    whyImportant: 'Las habilidades de análisis de costos son esenciales para profesionales de finanzas, operaciones y adquisiciones. Los analistas de costos ganan $70,000-$100,000, mientras que los ingenieros de costos senior y analistas de precios estratégicos alcanzan $110,000-$145,000. El análisis de costos aparece en más del 30% de las ofertas de finanzas, operaciones y adquisiciones.\n\nIncluir análisis de costos en tu currículum demuestra rigor analítico y la capacidad de cuantificar decisiones de negocio. Los empleadores valoran profesionales que pueden identificar ahorros de costos, justificar inversiones y optimizar la asignación de recursos con análisis basado en datos.',
    keywords: ['currículum de análisis de costos', 'habilidades de análisis de costos', 'currículum de análisis costo-beneficio', 'currículum de analista de costos'],
    searchIntents: ['cómo incluir análisis de costos en el currículum', 'habilidades de análisis de costos para analistas', 'ejemplos de currículum de análisis de costos'],
    relatedSkills: ['Gestión de Presupuesto', 'Análisis Financiero', 'Modelado Financiero', 'Adquisiciones', 'Excel', 'Costeo Basado en Actividades', 'Análisis de Punto de Equilibrio', 'Costo Total de Propiedad', 'Estrategia de Precios'],
    professionSlugs: ['analista-financiero', 'gerente-de-finanzas', 'gerente-de-operaciones', 'gerente-de-compras', 'analista-de-negocios', 'contador'],
    atsKeywords: ['análisis de costos', 'análisis costo-beneficio', 'costo total de propiedad', 'TCO', 'costeo basado en actividades', 'reducción de costos', 'optimización de costos', 'análisis de punto de equilibrio', 'estimación de costos', 'modelado de costos', 'generadores de costos'],
    resumeTips: [
      'Cuantifica los ahorros o evitación de costos que identificaste a través del análisis.',
      'Especifica las metodologías de análisis de costos utilizadas (ACB, TCO, ABC, punto de equilibrio).',
      'Describe la escala y alcance de los costos analizados.',
      'Menciona las herramientas utilizadas para el análisis de costos incluyendo módulos de ERP y Excel.',
      'Incluye ejemplos de decisiones influenciadas por tu análisis de costos.'
    ],
    exampleBullets: [
      'Realicé análisis TCO para una migración de plataforma tecnológica de $12M, identificando $4.2M en costos ocultos que reformularon la decisión de selección de proveedor.',
      'Ejecuté costeo basado en actividades en 8 líneas de producto, revelando que 2 líneas operaban por debajo del costo marginal y recomendando su descontinuación que ahorró $1.6M anuales.',
      'Lideré análisis costo-beneficio para 15 proyectos de capital por un total de $30M, creando un marco de priorización que maximizó el ROI y aceleró el retorno de la inversión en 18 meses.',
      'Desarrollé una herramienta de modelado de costos que redujo el tiempo de evaluación de ofertas de proveedores de 3 semanas a 3 días, respaldando $50M en decisiones de adquisición anuales.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia el análisis de costos del análisis financiero en un currículum?', answer: 'El análisis de costos es un subconjunto del análisis financiero específicamente enfocado en entender y optimizar costos. El análisis financiero es más amplio, abarcando análisis de ingresos, valoración, análisis de inversiones y planificación financiera. Lista análisis de costos cuando quieras enfatizar experiencia en optimización de costos.' },
      { question: '¿Qué herramientas debo conocer para análisis de costos?', answer: 'Excel avanzado es esencial. Los módulos de costos de ERP en SAP u Oracle son valiosos para manufactura y grandes empresas. Las herramientas de inteligencia de negocios como Tableau o Power BI ayudan a visualizar tendencias de costos. Para roles especializados, herramientas como aPriori para estimación de costos o Costpoint para contratación gubernamental son relevantes.' },
      { question: '¿Puedo listar análisis de costos sin formación en finanzas?', answer: 'Sí. Los gerentes de operaciones, gerentes de proyectos y profesionales de adquisiciones rutinariamente realizan análisis de costos. Describe análisis específicos que realizaste, las metodologías utilizadas y las decisiones de negocio que tu análisis respaldó. Enfócate en resultados e impacto en dólares.' }
    ]
  },
  'revenue-forecasting': {
    slug: 'pronostico-de-ingresos',
    title: 'Pronóstico de Ingresos',
    description: 'El pronóstico de ingresos es el proceso de predecir los ingresos futuros basándose en datos históricos, tendencias del mercado, análisis de pipeline y supuestos de negocio. Es crítico para la presupuestación, planificación de capacidad, relaciones con inversionistas y toma de decisiones estratégicas. Los métodos de pronóstico van desde tendencias simples y promedios móviles hasta enfoques sofisticados incluyendo análisis de regresión, modelado basado en cohortes, análisis ascendente de pipeline de ventas y modelos predictivos de machine learning.\n\nLas empresas SaaS utilizan métricas como Ingresos Recurrentes Mensuales (MRR), Ingresos Recurrentes Anuales (ARR), tasa de cancelación, ingresos de expansión y retención neta de ingresos para construir pronósticos basados en suscripciones. Las empresas tradicionales pueden usar economía unitaria, dimensionamiento de mercado, ajuste estacional y correlación con indicadores económicos. Los equipos de FP&A típicamente producen pronósticos mensuales, trimestrales y anuales con análisis de variaciones.\n\nEl pronóstico de ingresos moderno aprovecha cada vez más datos de CRM (Salesforce, HubSpot), herramientas de BI (Tableau, Power BI) y plataformas de FP&A (Adaptive Planning, Anaplan) para crear proyecciones dinámicas y basadas en datos que se actualizan en tiempo real.',
    whyImportant: 'La precisión del pronóstico de ingresos impacta directamente la confianza de los inversionistas, la planificación de recursos y la toma de decisiones ejecutivas. Los profesionales con habilidades en pronóstico ganan $80,000-$130,000 en roles de FP&A, con líderes de operaciones de ingresos alcanzando $140,000-$180,000. La experiencia en pronóstico se menciona en más del 25% de las ofertas de finanzas y operaciones de ingresos.\n\nIncluir pronóstico de ingresos en tu currículum señala sofisticación analítica e impacto de negocio. Demuestra que puedes predecir resultados, gestionar la incertidumbre y proporcionar la inteligencia financiera que los líderes necesitan para asignar recursos efectivamente.',
    keywords: ['currículum de pronóstico de ingresos', 'habilidades de pronóstico de ingresos', 'currículum de analista de pronósticos', 'currículum de pronóstico de ventas'],
    searchIntents: ['cómo incluir pronóstico de ingresos en el currículum', 'habilidades de pronóstico de ingresos para analistas', 'ejemplos de currículum de pronósticos'],
    relatedSkills: ['Planificación Financiera', 'Modelado Financiero', 'Análisis de Datos', 'Excel', 'Salesforce', 'Adaptive Planning', 'Métricas SaaS', 'Análisis Estadístico', 'Inteligencia de Negocios'],
    professionSlugs: ['analista-financiero', 'gerente-de-finanzas', 'gerente-de-ventas', 'analista-de-negocios', 'director-financiero', 'gerente-de-producto'],
    atsKeywords: ['pronóstico de ingresos', 'pronóstico de ventas', 'pronóstico financiero', 'MRR', 'ARR', 'precisión de pronóstico', 'análisis de pipeline', 'proyección de ingresos', 'planificación de demanda', 'analítica predictiva', 'análisis de variaciones'],
    resumeTips: [
      'Cuantifica las tasas de precisión de pronóstico que lograste.',
      'Especifica la escala de ingresos de tus pronósticos.',
      'Menciona las herramientas y metodologías de pronóstico utilizadas.',
      'Describe cómo tus pronósticos influyeron en las decisiones de negocio.',
      'Incluye experiencia con enfoques de pronóstico tanto ascendente como descendente.'
    ],
    exampleBullets: [
      'Desarrollé un modelo de pronóstico de ingresos ascendente para un negocio SaaS de $75M que logró una precisión trimestral del 96%, respaldando directamente los reportes a la junta.',
      'Construí un modelo de ingresos basado en cohortes rastreando MRR, cancelaciones y expansión que identificó $3.2M en ingresos en riesgo y permitió esfuerzos de retención proactivos.',
      'Implementé un modelo de pronóstico de machine learning que mejoró la precisión de predicción de ingresos del 82% al 94%, reduciendo los costos de inventario de reserva en $1.8M.',
      'Creé un pronóstico semanal de pipeline de ventas integrado con datos de Salesforce, dando al liderazgo visibilidad en tiempo real del desempeño trimestral contra objetivos de $20M.'
    ],
    faqs: [
      { question: '¿Qué métodos de pronóstico debo destacar en mi currículum?', answer: 'Destaca métodos relevantes para tu industria. Las empresas SaaS valoran modelos basados en cohortes, pronóstico de MRR/ARR y análisis de retención neta de ingresos. Las empresas tradicionales valoran análisis de regresión, ajuste estacional y modelado económico. Mencionar enfoques tanto estadísticos como de juicio empresarial muestra experiencia integral.' },
      { question: '¿Cómo demuestro habilidades de pronóstico sin ser un analista dedicado de pronósticos?', answer: 'Los gerentes de ventas que pronostican ingresos de pipeline, los gerentes de producto que proyectan tasas de adopción y los gerentes de operaciones que predicen demanda todos realizan pronóstico de ingresos. Describe los pronósticos que creaste, las fuentes de datos utilizadas y la precisión de tus predicciones.' },
      { question: '¿Qué precisión de pronóstico debo reportar en mi currículum?', answer: 'La precisión depende del horizonte de pronóstico y la complejidad del negocio. Los pronósticos mensuales deben apuntar a 90-98% de precisión, los trimestrales a 85-95% y los anuales a 80-90%. Declara tus métricas de precisión claramente y describe la metodología que las logró.' }
    ]
  },
  'profit-and-loss-management': {
    slug: 'gestion-de-perdidas-y-ganancias',
    title: 'Gestión de Pérdidas y Ganancias',
    description: 'La gestión de Pérdidas y Ganancias (P&L) es la responsabilidad por todas las líneas de ingresos y gastos que determinan la rentabilidad de una organización o unidad de negocio. Los propietarios de P&L toman decisiones sobre precios, mezcla de productos, estructura de costos, prioridades de inversión y personal que impactan directamente en el resultado final. El rol requiere comprender márgenes brutos, márgenes operativos, EBITDA, márgenes de contribución y la interacción entre crecimiento de ingresos y gestión de costos.\n\nLa gestión de P&L involucra establecer objetivos de ingresos, controlar el costo de bienes vendidos (COGS), gestionar gastos operativos (SG&A), analizar tendencias de márgenes y tomar decisiones de intercambio entre inversión en crecimiento y rentabilidad. Los propietarios de P&L colaboran con equipos de ventas, marketing, operaciones y finanzas para optimizar el desempeño financiero.\n\nLa gestión efectiva de P&L requiere tanto pensamiento estratégico como disciplina operativa. Los líderes deben equilibrar la rentabilidad a corto plazo con la inversión a largo plazo, gestionar a través de ciclos económicos y tomar decisiones basadas en datos sobre la asignación de recursos.',
    whyImportant: 'La responsabilidad de gestión de P&L es la competencia financiera más valorada para el avance en liderazgo. Los gerentes de contratación consistentemente clasifican la propiedad de P&L como un criterio principal para roles de director, VP y GM. Los profesionales con experiencia en P&L ganan 25-40% más que sus pares en roles de staff, con salarios de GM que van desde $120,000-$250,000+ según el tamaño del P&L.\n\nIncluir gestión de P&L en tu currículum señala que has operado como propietario de negocio con plena responsabilidad financiera. Eleva inmediatamente tu candidatura para posiciones de liderazgo y es un requisito previo para la mayoría de las trayectorias hacia C-suite.',
    keywords: ['currículum de gestión de P&L', 'currículum de pérdidas y ganancias', 'currículum de responsabilidad de P&L', 'currículum de propietario de P&L'],
    searchIntents: ['cómo incluir gestión de P&L en el currículum', 'habilidades de gestión de pérdidas y ganancias', 'ejemplos de currículum de P&L'],
    relatedSkills: ['Gestión de Presupuesto', 'Planificación Financiera', 'Pronóstico de Ingresos', 'Análisis de Costos', 'Planificación Estratégica', 'Estrategia de Negocios', 'Estrategia de Precios', 'Reportes Financieros'],
    professionSlugs: ['gerente-general', 'director-ejecutivo', 'director-financiero', 'director-de-operaciones', 'vicepresidente', 'director-de-operaciones', 'gerente-de-finanzas'],
    atsKeywords: ['gestión de P&L', 'pérdidas y ganancias', 'propiedad de P&L', 'gestión de ingresos', 'mejora de márgenes', 'rentabilidad', 'EBITDA', 'margen bruto', 'ingreso operativo', 'optimización de costos', 'desempeño financiero'],
    resumeTips: [
      'Siempre declara el tamaño del P&L en términos de dólares para cuantificar tu alcance de responsabilidad.',
      'Destaca mejoras de márgenes y crecimiento de rentabilidad que lograste.',
      'Describe la unidad de negocio, línea de producto o región que gestionaste.',
      'Menciona el liderazgo multifuncional requerido para los resultados de P&L.',
      'Incluye logros tanto de crecimiento de ingresos como de gestión de costos.'
    ],
    exampleBullets: [
      'Gestioné un P&L de $45M para una división de software B2B, creciendo los ingresos un 32% mientras mejoraba el margen EBITDA del 15% al 23% mediante optimización de precios y disciplina de costos.',
      'Fui propietario del P&L completo de una unidad de negocio de $120M con 350 empleados en 4 ubicaciones, entregando 3 años consecutivos de crecimiento de ingresos de doble dígito.',
      'Recuperé una línea de producto en declive de $18M de un margen operativo de -5% a +12% en 18 meses mediante optimización de mezcla de productos y reducción estratégica de costos.',
      'Lideré la planificación de P&L y revisiones mensuales para una división de $200M, identificando $8M en oportunidades de mejora de márgenes a través de renegociación con proveedores y automatización de procesos.'
    ],
    faqs: [
      { question: '¿Cómo listo gestión de P&L si solo gestioné parte de un P&L?', answer: 'Sé específico sobre tu alcance. Describe las líneas de ingresos o costos que controlaste, los montos en dólares involucrados y los resultados logrados. Incluso gestionar un presupuesto departamental o el P&L de una línea de producto demuestra responsabilidad financiera. Usa lenguaje como "gestioné un presupuesto de gastos de $5M" o "fui propietario de los ingresos de una línea de producto de $10M".' },
      { question: '¿Qué tamaño de P&L se necesita para ser competitivo para roles de GM o VP?', answer: 'Las expectativas de P&L varían según el tamaño de la empresa y la industria. Para empresas medianas, experiencia con P&L de $10M-$50M es competitiva. Para roles empresariales, se espera $50M-$200M+. La experiencia de P&L de pequeñas empresas o startups de $2M-$10M es valiosa si demuestras trayectoria de crecimiento y mejora de márgenes.' },
      { question: '¿Cómo construyo experiencia en gestión de P&L si no he tenido propiedad de P&L?', answer: 'Asume presupuestos de proyectos, ofrécete como voluntario para iniciativas multifuncionales con objetivos financieros, gestiona un centro de costos o lidera una iniciativa generadora de ingresos. Construir un historial de responsabilidad financiera a menor escala te prepara para la propiedad completa del P&L.' }
    ]
  },
  'contract-management': {
    slug: 'gestion-de-contratos',
    title: 'Gestión de Contratos',
    description: 'La gestión de contratos es el proceso de administrar la creación, ejecución y análisis de contratos para maximizar el desempeño operativo y financiero mientras se minimiza el riesgo. Cubre el ciclo de vida completo del contrato: definición de requisitos, redacción, negociación, aprobación, ejecución, monitoreo de cumplimiento, enmienda, renovación y cierre. La gestión efectiva de contratos asegura que todas las partes cumplan sus obligaciones contractuales y que la organización capture el valor esperado.\n\nLa gestión moderna de contratos aprovecha plataformas de Gestión del Ciclo de Vida de Contratos (CLM) como Icertis, DocuSign CLM, Agiloft y ContractPodAi. Estas herramientas proporcionan bibliotecas de plantillas, bibliotecas de cláusulas, flujos de trabajo automatizados, seguimiento de obligaciones, puntuación de riesgos y revisión de contratos asistida por IA. Las organizaciones que gestionan miles de contratos dependen de estos sistemas para visibilidad, cumplimiento y eficiencia.\n\nLa gestión de contratos abarca contratos de adquisición, acuerdos de venta, contratos de empleo, acuerdos de nivel de servicio (SLA), acuerdos de licencia y acuerdos de asociación. La Asociación Internacional de Gestión de Contratos y Comercial (IACCM) proporciona certificaciones y mejores prácticas para la profesión.',
    whyImportant: 'La mala gestión de contratos cuesta a las organizaciones un promedio del 9% de los ingresos anuales según la investigación de IACCM. Los profesionales de gestión de contratos ganan $70,000-$120,000, con gerentes y directores senior de contratos alcanzando $120,000-$160,000. La habilidad aparece en más del 20% de las ofertas de adquisiciones, legal y operaciones.\n\nIncluir gestión de contratos en tu currículum demuestra atención al detalle, conciencia de riesgos y la capacidad de proteger los intereses organizacionales. Es especialmente valorada en industrias con relaciones complejas con proveedores, requisitos regulatorios o transacciones de alto valor.',
    keywords: ['currículum de gestión de contratos', 'habilidades de gestión de contratos', 'currículum de administrador de contratos', 'currículum CLM'],
    searchIntents: ['cómo incluir gestión de contratos en el currículum', 'habilidades de gestión de contratos para currículum', 'ejemplos de currículum de gestor de contratos'],
    relatedSkills: ['Gestión de Proveedores', 'Adquisiciones', 'Negociación', 'Gestión de Cumplimiento', 'Gestión de Riesgos', 'Revisión Legal', 'Gestión de SLA', 'Sistemas CLM'],
    professionSlugs: ['gerente-de-compras', 'gerente-de-operaciones', 'gerente-de-proyectos', 'gerente-general', 'gerente-de-cadena-de-suministro', 'director-de-operaciones'],
    atsKeywords: ['gestión de contratos', 'gestión del ciclo de vida de contratos', 'CLM', 'negociación de contratos', 'gestión de SLA', 'contratos con proveedores', 'cumplimiento de contratos', 'administración de contratos', 'términos y condiciones', 'revisión de contratos', 'contratos de adquisición'],
    resumeTips: [
      'Especifica el número y valor de los contratos que gestionaste.',
      'Describe los tipos de contratos manejados (adquisición, venta, licencia, SLA).',
      'Menciona herramientas CLM utilizadas como Icertis, DocuSign CLM o Agiloft.',
      'Cuantifica ahorros de costos por negociaciones o renegociaciones de contratos.',
      'Destaca logros de monitoreo de cumplimiento y mitigación de riesgos.'
    ],
    exampleBullets: [
      'Gestioné un portafolio de más de 350 contratos con proveedores valorados en $85M anuales, asegurando 100% de cumplimiento con los términos y logrando $4.2M en evitación de costos mediante renegociación proactiva.',
      'Implementé la plataforma CLM Icertis para digitalizar 2,000 contratos, reduciendo el tiempo de ciclo de contratos de 45 días a 12 días y eliminando $1.2M en sobrecostos por renovaciones automáticas.',
      'Negocié acuerdos maestros de servicio con 8 proveedores estratégicos, asegurando descuentos por volumen que ahorraron $2.8M en términos de 3 años.',
      'Establecí un marco de gobernanza de contratos con plantillas estándar, flujos de aprobación y seguimiento de obligaciones que redujo los cuellos de botella de revisión legal en un 60%.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de gestión de contratos están disponibles?', answer: 'World Commerce and Contracting (anteriormente IACCM) ofrece certificaciones a niveles Foundation, Practitioner y Expert. NCMA (National Contract Management Association) ofrece certificaciones CFCM, CCCM y CPCM enfocadas en contratación gubernamental. Estas certificaciones mejoran la credibilidad para roles dedicados de gestión de contratos.' },
      { question: '¿Cómo muestro habilidades de gestión de contratos sin un título de gestor de contratos?', answer: 'Muchos profesionales gestionan contratos como parte de roles más amplios. Describe acuerdos con proveedores que negociaste, SLAs que estableciste, cumplimiento de contratos que monitoreaste o procesos de renovación que gestionaste. Cuantifica valores de contratos y resultados para demostrar competencia.' },
      { question: '¿La gestión de contratos es más una habilidad legal o de negocios?', answer: 'La gestión de contratos es una disciplina de negocios que interactúa con lo legal. Mientras que los equipos legales redactan y revisan el lenguaje contractual, los profesionales de negocios gestionan la relación comercial, el cumplimiento y los aspectos de desempeño. En tu currículum, enfatiza los aspectos de negocio y operativos de la gestión de contratos.' }
    ]
  },
  'vendor-management': {
    slug: 'gestion-de-proveedores',
    title: 'Gestión de Proveedores',
    description: 'La gestión de proveedores es el proceso de extremo a extremo de seleccionar, contratar, controlar y evaluar proveedores externos para maximizar el valor y minimizar el riesgo. Abarca el sourcing de proveedores, calificación, incorporación, monitoreo de desempeño, gestión de relaciones, evaluación de riesgos y desvinculación. La gestión de proveedores ha evolucionado de compras transaccionales a gestión estratégica de relaciones con proveedores (SRM) que trata a los proveedores clave como socios.\n\nLa gestión efectiva de proveedores requiere desarrollar cuadros de mando de proveedores, realizar revisiones de negocio regulares, gestionar acuerdos de nivel de servicio (SLAs) y mantener registros de riesgo de proveedores. Las organizaciones típicamente segmentan a los proveedores en niveles basados en gasto, criticidad e importancia estratégica, aplicando diferente intensidad de gestión a cada nivel.\n\nLa gestión de proveedores es cada vez más importante a medida que las organizaciones tercerizan más funciones y dependen de cadenas de suministro complejas. Herramientas como SAP Ariba, Coupa e Ivalua proporcionan portales de gestión de proveedores con dashboards de desempeño, monitoreo de riesgos y capacidades de colaboración.',
    whyImportant: 'Las organizaciones gastan 40-80% de los ingresos en proveedores externos, haciendo de la gestión de proveedores una habilidad de alto impacto. Los profesionales de gestión de proveedores ganan $75,000-$115,000, con directores de sourcing estratégico alcanzando $130,000-$170,000. La habilidad se menciona en más del 25% de las ofertas de operaciones y adquisiciones.\n\nIncluir gestión de proveedores en tu currículum demuestra habilidades de negociación, capacidad de gestión de relaciones y la habilidad de impulsar valor de asociaciones externas. Señala que puedes gestionar ecosistemas complejos de proveedores y proteger los intereses organizacionales.',
    keywords: ['currículum de gestión de proveedores', 'habilidades de gestión de proveedores', 'currículum de gestión de suministradores', 'currículum de relaciones con proveedores'],
    searchIntents: ['cómo incluir gestión de proveedores en el currículum', 'habilidades de gestión de proveedores para gerentes', 'ejemplos de currículum de gestión de proveedores'],
    relatedSkills: ['Adquisiciones', 'Gestión de Contratos', 'Negociación', 'Gestión de Cadena de Suministro', 'Gestión de SLA', 'Análisis de Costos', 'Gestión de Riesgos', 'Desarrollo de Proveedores'],
    professionSlugs: ['gerente-de-compras', 'gerente-de-operaciones', 'gerente-de-ti', 'gerente-de-cadena-de-suministro', 'gerente-de-proyectos', 'director-de-operaciones'],
    atsKeywords: ['gestión de proveedores', 'gestión de suministradores', 'relaciones con proveedores', 'SRM', 'desempeño de proveedores', 'cuadros de mando de proveedores', 'incorporación de proveedores', 'evaluación de suministradores', 'gestión de SLA', 'riesgo de proveedores', 'adquisiciones'],
    resumeTips: [
      'Cuantifica el número de proveedores y el gasto total bajo tu gestión.',
      'Describe iniciativas de mejora del desempeño de proveedores y sus resultados.',
      'Menciona herramientas y plataformas de gestión de proveedores utilizadas.',
      'Destaca ahorros de costos logrados mediante negociación y consolidación de proveedores.',
      'Incluye ejemplos de mitigación de riesgo de proveedores y medidas de continuidad del negocio.'
    ],
    exampleBullets: [
      'Gestioné relaciones con 85 proveedores a lo largo de $40M en gasto anual, implementando revisiones trimestrales de negocio que mejoraron las puntuaciones de entrega de servicio en un 28%.',
      'Consolidé el portafolio de proveedores de 120 a 65 suministradores mediante sourcing estratégico, generando $5.2M en ahorros anuales y simplificando la carga de gestión.',
      'Desarrollé un sistema de cuadro de mando de proveedores rastreando 12 KPIs en calidad, entrega, costo e innovación, resultando en 95% de cumplimiento de SLA en proveedores críticos.',
      'Identifiqué y mitigué el riesgo de proveedor único para 8 componentes críticos calificando proveedores alternativos, reduciendo la vulnerabilidad de la cadena de suministro en un 45%.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia la gestión de proveedores de las adquisiciones?', answer: 'Las adquisiciones se enfocan en la transacción de sourcing y compra, mientras que la gestión de proveedores abarca todo el ciclo de vida de la relación incluyendo monitoreo de desempeño, gestión de riesgos y desarrollo estratégico. En tu currículum, usa gestión de proveedores para señalar capacidades continuas de gestión de relaciones y desempeño.' },
      { question: '¿Qué métricas de gestión de proveedores debo incluir en mi currículum?', answer: 'Destaca el gasto bajo gestión, número de proveedores, ahorros de costos logrados, tasas de cumplimiento de SLA, porcentajes de mejora del desempeño de proveedores y métricas de reducción de riesgo de suministro. Estos demuestran impacto tangible y alcance de gestión.' },
      { question: '¿La gestión de proveedores es relevante para roles de tecnología?', answer: 'Muy relevante. Las organizaciones de TI gestionan docenas de proveedores de software, proveedores de nube y proveedores de servicios. La gestión de proveedores de tecnología incluye optimización de licencias, gestión de gasto en SaaS y gobernanza de proveedores de nube. Estas habilidades son cada vez más importantes a medida que crece el gasto de TI en servicios externos.' }
    ]
  },
  'procurement': {
    slug: 'adquisiciones',
    title: 'Adquisiciones',
    description: 'Las adquisiciones son el proceso estratégico de obtener, adquirir y gestionar bienes, servicios y obras de proveedores externos para satisfacer las necesidades organizacionales con un valor óptimo. Las adquisiciones modernas han evolucionado de compras tácticas a una función estratégica que impulsa la ventaja competitiva a través de optimización de costos, gestión de riesgos, obtención de innovación y sostenibilidad. El Chartered Institute of Procurement and Supply (CIPS) proporciona el marco profesional global.\n\nEl proceso de adquisiciones incluye análisis de gasto, inteligencia de mercado, desarrollo de estrategia de sourcing, gestión de RFx (RFI, RFP, RFQ), evaluación de proveedores, negociación, contratación, gestión de órdenes de compra y gestión del desempeño de proveedores. La gestión por categorías segmenta el gasto en grupos lógicos para sourcing estratégico.\n\nLas plataformas digitales de adquisiciones como SAP Ariba, Coupa, Jaggaer y GEP han transformado la función con e-sourcing, subastas electrónicas, automatización de compra-a-pago y analítica de gasto. Las tendencias emergentes incluyen adquisiciones sostenibles, sourcing de diversidad, análisis de gasto impulsado por IA y modelos de adquisiciones como servicio.',
    whyImportant: 'Las adquisiciones típicamente gestionan 50-70% de los costos organizacionales, haciendo de esta una de las funciones de negocio de mayor impacto. Los profesionales de adquisiciones ganan $65,000-$110,000, con Directores de Adquisiciones alcanzando $180,000-$300,000+. Las adquisiciones aparecen en más del 30% de las ofertas de operaciones y cadena de suministro.\n\nIncluir adquisiciones en tu currículum demuestra experiencia en negociación, capacidad de sourcing estratégico y habilidades de gestión de costos. Señala que puedes entregar impacto en el resultado final optimizando cómo las organizaciones gastan dinero.',
    keywords: ['currículum de adquisiciones', 'habilidades de adquisiciones', 'currículum de sourcing estratégico', 'currículum de gerente de adquisiciones'],
    searchIntents: ['cómo incluir adquisiciones en el currículum', 'habilidades de adquisiciones para currículum', 'ejemplos de currículum de adquisiciones'],
    relatedSkills: ['Gestión de Proveedores', 'Gestión de Contratos', 'Negociación', 'Gestión de Cadena de Suministro', 'Análisis de Costos', 'Gestión por Categorías', 'SAP Ariba', 'Coupa', 'Análisis de Gasto'],
    professionSlugs: ['gerente-de-compras', 'gerente-de-cadena-de-suministro', 'gerente-de-operaciones', 'gerente-general', 'director-de-operaciones', 'director-de-operaciones'],
    atsKeywords: ['adquisiciones', 'sourcing estratégico', 'compras', 'RFP', 'RFQ', 'gestión por categorías', 'análisis de gasto', 'selección de proveedores', 'ahorro de costos', 'órdenes de compra', 'SAP Ariba', 'Coupa'],
    resumeTips: [
      'Cuantifica el gasto total gestionado y los ahorros de costos logrados.',
      'Especifica las categorías e industrias de adquisiciones (directas, indirectas, TI, MRO).',
      'Menciona herramientas y plataformas de e-procurement utilizadas.',
      'Incluye certificaciones de adquisiciones como CIPS, CPSM o CSCP.',
      'Describe estrategias de sourcing implementadas y sus resultados.',
      'Destaca iniciativas de adquisiciones sostenibles o de diversidad.'
    ],
    exampleBullets: [
      'Gestioné $65M en gasto anual de adquisiciones en 12 categorías, entregando $8.5M en ahorros de costos (reducción del 13%) a través de sourcing estratégico y renegociación de contratos.',
      'Implementé la plataforma de adquisiciones SAP Ariba, automatizando el 85% de las órdenes de compra y reduciendo el tiempo de ciclo de adquisiciones de 21 días a 5 días.',
      'Lideré la gestión por categorías para gasto en servicios de TI de $18M, consolidando 40 proveedores a 12 socios estratégicos y logrando una reducción de costos del 22%.',
      'Desarrollé un programa de adquisiciones sostenibles obteniendo el 35% de los materiales de proveedores certificados como sostenibles, cumpliendo objetivos ESG mientras mantenía competitividad en costos.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de adquisiciones son más valoradas?', answer: 'CIPS (Chartered Institute of Procurement and Supply) es el estándar global. En EE.UU., CPSM (Certified Professional in Supply Management) de ISM es ampliamente reconocida. CSCP de APICS cubre cadena de suministro incluyendo adquisiciones. Elige según tu geografía e industria objetivo.' },
      { question: '¿Las adquisiciones son lo mismo que las compras?', answer: 'Las compras son el acto transaccional de adquirir bienes o servicios. Las adquisiciones son el proceso estratégico más amplio que abarca estrategia de sourcing, análisis de mercado, gestión de proveedores y optimización de valor. En tu currículum, usa adquisiciones para señalar capacidad estratégica en lugar de compras transaccionales.' },
      { question: '¿Cómo hago la transición a adquisiciones desde otra función?', answer: 'Destaca habilidades transferibles como negociación, relaciones con proveedores, gestión de presupuesto y pensamiento analítico. Las adquisiciones valoran profesionales que entienden el negocio para el cual están comprando. Enfatiza el conocimiento de la industria, capacidades de análisis de datos y cualquier experiencia que tengas frente a proveedores.' }
    ]
  },
  'supply-chain-management': {
    slug: 'gestion-de-cadena-de-suministro',
    title: 'Gestión de Cadena de Suministro',
    description: 'La gestión de cadena de suministro (SCM) es la coordinación y supervisión de todas las actividades involucradas en el sourcing, adquisición, conversión y entrega de productos desde materias primas hasta clientes finales. SCM integra la gestión de oferta y demanda entre las empresas de la red de suministro. El modelo SCOR (Supply Chain Operations Reference) define SCM a través de los procesos Planificar, Obtener, Fabricar, Entregar, Devolver y Habilitar.\n\nLas cadenas de suministro modernas aprovechan tecnologías incluyendo sistemas ERP (SAP, Oracle), herramientas de planificación de cadena de suministro (Kinaxis, o9 Solutions, Blue Yonder), sistemas de gestión de transporte (TMS), sistemas de gestión de almacén (WMS) y plataformas de torre de control para visibilidad de extremo a extremo. La analítica avanzada, sensores IoT, blockchain para trazabilidad y la IA para detección de demanda están transformando las capacidades de la cadena de suministro.\n\nLa gestión de cadena de suministro pospandemia ha pasado de la eficiencia justo a tiempo a la resiliencia, agilidad y diversificación de riesgos. Conceptos como nearshoring, dual sourcing, gemelos digitales y cadena de suministro como servicio se han convertido en consideraciones estratégicas convencionales.',
    whyImportant: 'Las disrupciones en la cadena de suministro cuestan a las empresas miles de millones anualmente, elevando SCM a una prioridad a nivel de junta directiva. Los profesionales de cadena de suministro ganan $75,000-$120,000, con líderes de nivel VP alcanzando $170,000-$250,000+. SCM aparece en más del 35% de las ofertas de operaciones y logística.\n\nIncluir gestión de cadena de suministro en tu currículum demuestra la capacidad de orquestar operaciones globales complejas. Señala pensamiento analítico, liderazgo multifuncional y la capacidad de gestionar la incertidumbre en sistemas interconectados.',
    keywords: ['currículum de gestión de cadena de suministro', 'habilidades de SCM para currículum', 'palabras clave de cadena de suministro para currículum', 'currículum de gerente de cadena de suministro'],
    searchIntents: ['cómo incluir gestión de cadena de suministro en el currículum', 'habilidades de cadena de suministro para currículum', 'ejemplos de currículum de gestión de cadena de suministro'],
    relatedSkills: ['Gestión Logística', 'Adquisiciones', 'Gestión de Inventario', 'Gestión de Operaciones', 'Planificación de Demanda', 'Sistemas ERP', 'SAP', 'Gestión Lean', 'Six Sigma', 'Gestión de Almacén'],
    professionSlugs: ['gerente-de-cadena-de-suministro', 'gerente-de-operaciones', 'gerente-de-almacen', 'gerente-de-transporte', 'gerente-de-distribucion', 'gerente-de-compras', 'director-de-operaciones'],
    atsKeywords: ['gestión de cadena de suministro', 'SCM', 'optimización de cadena de suministro', 'planificación de demanda', 'gestión de inventario', 'logística', 'SCOR', 'S&OP', 'adquisiciones', 'distribución', 'ERP', 'SAP'],
    resumeTips: [
      'Especifica el alcance de tu responsabilidad de cadena de suministro (ingresos, geografía, complejidad).',
      'Cuantifica mejoras en costo, velocidad, confiabilidad o rotación de inventario.',
      'Menciona tecnologías y plataformas de cadena de suministro utilizadas.',
      'Incluye certificaciones APICS CSCP, CPIM u otras relevantes.',
      'Describe iniciativas de resiliencia y gestión de riesgos de cadena de suministro.'
    ],
    exampleBullets: [
      'Gestioné la cadena de suministro de extremo a extremo para un negocio de bienes de consumo de $300M en 12 países, reduciendo el costo total de cadena de suministro en un 15% manteniendo una tasa de cumplimiento del 98.5%.',
      'Implementé el proceso S&OP (Planificación de Ventas y Operaciones) que mejoró la precisión de pronóstico del 72% al 91% y redujo el exceso de inventario en $12M.',
      'Lideré iniciativa de digitalización de cadena de suministro desplegando sensores IoT y plataforma de torre de control, mejorando la visibilidad de envíos del 40% al 95% y reduciendo costos de expedición en $3.4M.',
      'Rediseñé la red de distribución de 8 almacenes a 5 instalaciones ubicadas estratégicamente, reduciendo el tiempo promedio de entrega en 1.2 días y los costos de transporte en $6.8M anuales.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de cadena de suministro debo perseguir?', answer: 'APICS CSCP (Certified Supply Chain Professional) es la certificación de SCM integral más reconocida. CPIM se enfoca en producción y gestión de inventario. CLTD cubre logística, transporte y distribución. Six Sigma Green Belt agrega credibilidad en mejora de procesos. Elige según tu área de especialización.' },
      { question: '¿Cómo ha cambiado la gestión de cadena de suministro pospandemia?', answer: 'La SCM pospandemia prioriza la resiliencia junto con la eficiencia. Los cambios clave incluyen estrategias de nearshoring y dual-sourcing, mayores niveles de stock de seguridad, visibilidad digital de cadena de suministro, planificación de escenarios y diversificación de riesgos. Mencionar experiencia con estrategias de resiliencia es altamente valorado en currículums actuales.' },
      { question: '¿La experiencia en tecnología es importante para currículums de cadena de suministro?', answer: 'Esencial. Menciona sistemas ERP (SAP, Oracle), herramientas de planificación (Kinaxis, Blue Yonder), plataformas TMS/WMS y herramientas de analítica. La experiencia en transformación digital de cadena de suministro es cada vez más requerida para roles senior. La experiencia en analítica de datos y IA/ML en contextos de cadena de suministro es un fuerte diferenciador.' }
    ]
  },
  'inventory-management': {
    slug: 'gestion-de-inventario',
    title: 'Gestión de Inventario',
    description: 'La gestión de inventario es el enfoque sistemático para ordenar, almacenar, rastrear y controlar el inventario para asegurar que los productos correctos estén disponibles en las cantidades correctas en el momento y lugar correctos. Equilibra los objetivos en competencia de minimizar los costos de mantenimiento e inversión de capital mientras mantiene niveles de servicio y previene quiebres de stock.\n\nLas técnicas de gestión de inventario incluyen clasificación ABC/XYZ, Cantidad Económica de Pedido (EOQ), cálculo de stock de seguridad, optimización de punto de reorden, sistemas Min/Max y MRP impulsado por demanda (DDMRP). Las métricas clave incluyen rotación de inventario, días de suministro, tasa de cumplimiento, tasa de quiebres de stock, porcentaje de costo de mantenimiento y precisión de inventario.\n\nLa gestión moderna de inventario aprovecha sistemas de gestión de almacén (WMS), módulos de ERP, herramientas de detección de demanda y plataformas de visibilidad en tiempo real. Las prácticas avanzadas incluyen inventario gestionado por el proveedor (VMI), consignación, justo a tiempo (JIT) y estrategias de postergación. El machine learning se aplica cada vez más al pronóstico de demanda y la optimización de inventario.',
    whyImportant: 'El inventario típicamente representa el 25-35% de los activos totales de una empresa, haciendo de la gestión de inventario una palanca financiera crítica. Los profesionales de gestión de inventario ganan $55,000-$90,000, con directores de planificación de inventario alcanzando $110,000-$150,000. La habilidad aparece en más del 30% de las ofertas de cadena de suministro y operaciones.\n\nIncluir gestión de inventario en tu currículum demuestra tu capacidad para optimizar el capital de trabajo y asegurar la satisfacción del cliente simultáneamente. Señala pensamiento analítico y experiencia operativa que impacta directamente tanto en el balance general como en el estado de resultados.',
    keywords: ['currículum de gestión de inventario', 'habilidades de gestión de inventario', 'currículum de control de inventario', 'currículum de planificación de inventario'],
    searchIntents: ['cómo incluir gestión de inventario en el currículum', 'habilidades de gestión de inventario para currículum', 'ejemplos de currículum de gestión de inventario'],
    relatedSkills: ['Gestión de Cadena de Suministro', 'Gestión de Almacén', 'Planificación de Demanda', 'Sistemas ERP', 'Gestión Lean', 'Adquisiciones', 'Análisis de Datos', 'Excel', 'SAP'],
    professionSlugs: ['gerente-de-almacen', 'gerente-de-cadena-de-suministro', 'gerente-de-operaciones', 'gerente-de-compras', 'gerente-de-distribucion', 'gerente-general'],
    atsKeywords: ['gestión de inventario', 'control de inventario', 'optimización de inventario', 'planificación de demanda', 'stock de seguridad', 'rotación de inventario', 'WMS', 'ERP', 'análisis ABC', 'punto de reorden', 'quiebre de stock', 'costo de mantenimiento'],
    resumeTips: [
      'Cuantifica el valor del inventario bajo tu gestión.',
      'Reporta mejoras en rotación de inventario, tasas de cumplimiento y costos de mantenimiento.',
      'Menciona sistemas y herramientas de gestión de inventario utilizados.',
      'Describe técnicas de optimización de inventario aplicadas.',
      'Incluye mejoras de precisión por conteo cíclico o implementación de RFID.'
    ],
    exampleBullets: [
      'Gestioné $28M en inventario en 3 centros de distribución, mejorando la rotación de inventario de 4.2 a 6.8 mientras mantenía una tasa de cumplimiento del 98.7%.',
      'Implementé clasificación ABC/XYZ para 15,000 SKUs, optimizando niveles de stock de seguridad y reduciendo el exceso de inventario en $4.5M sin impactar niveles de servicio.',
      'Desplegué programa de conteo cíclico reemplazando el inventario físico anual, mejorando la precisión de inventario del 89% al 99.2% y reduciendo mermas en $620,000.',
      'Lideré implementación de MRP impulsado por demanda que redujo los niveles promedio de inventario en un 30% y disminuyó los incidentes de quiebre de stock en un 72%.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de gestión de inventario mejoran un currículum?', answer: 'APICS CPIM (Certified in Planning and Inventory Management) es la certificación principal para profesionales de inventario. CSCP cubre la cadena de suministro más amplia incluyendo inventario. Las certificaciones Lean agregan credibilidad en mejora de procesos. Estas certificaciones validan tu capacidad para optimizar inventario científicamente en lugar de por intuición.' },
      { question: '¿Qué tan importante es el conocimiento tecnológico para la gestión de inventario?', answer: 'Crítico. Los empleadores esperan familiaridad con WMS, módulos de inventario de ERP y herramientas de planificación de demanda. SAP MM, Oracle Inventory, Manhattan Associates y Blue Yonder son plataformas comúnmente utilizadas. Excel avanzado para análisis y experiencia con dashboards de BI para visibilidad de inventario también son valorados.' },
      { question: '¿Cómo demuestro habilidades de gestión de inventario en un rol fuera de almacén?', answer: 'Muchos roles involucran principios de inventario: gestionar materiales de proyecto, controlar inventario de activos de TI, supervisar stock de partes para equipos de mantenimiento o gestionar repositorios de documentos/datos. Describe cómo optimizaste niveles de stock, redujiste desperdicios, mejoraste la precisión o gestionaste el equilibrio oferta-demanda en tu contexto.' }
    ]
  },
  'logistics-management': {
    slug: 'gestion-logistica',
    title: 'Gestión Logística',
    description: 'La gestión logística es la planificación, implementación y control del flujo y almacenamiento eficiente de bienes, servicios e información desde el origen hasta el consumo. Abarca gestión de transporte, almacenamiento, cumplimiento de pedidos, gestión de fletes, entrega de última milla, logística inversa y cumplimiento aduanero/comercial. El Council of Supply Chain Management Professionals (CSCMP) define la logística como el subconjunto de la gestión de cadena de suministro enfocado en el flujo físico.\n\nLos profesionales de logística optimizan rutas de transporte, seleccionan transportistas, gestionan gasto de fletes, diseñan layouts de almacén, implementan estrategias de cumplimiento y aseguran el cumplimiento regulatorio para envíos nacionales e internacionales. Las métricas clave incluyen costo por unidad enviada, tasa de entrega a tiempo, precisión de pedidos, utilización de almacén y costo de transporte como porcentaje de ingresos.\n\nLa logística digital ha introducido Sistemas de Gestión de Transporte (TMS), telemática de flota, IA de optimización de rutas, vehículos autónomos, entrega con drones y plataformas de rastreo en tiempo real. El mercado global de logística supera los $10 billones, y el crecimiento del comercio electrónico continúa impulsando la innovación en entrega de última milla y estrategias de cumplimiento.',
    whyImportant: 'Los costos logísticos representan 8-12% del PIB en economías desarrolladas y 10-15% del costo del producto, haciendo de la optimización logística un impulsor significativo de ganancias. Los profesionales de logística ganan $60,000-$100,000, con directores de logística alcanzando $120,000-$160,000. Las habilidades logísticas aparecen en más del 30% de las ofertas de operaciones y cadena de suministro.\n\nIncluir gestión logística en tu currículum demuestra capacidad de ejecución operativa y la habilidad de gestionar operaciones físicas complejas. Es una habilidad tangible y orientada a resultados que impacta directamente en la satisfacción del cliente y los costos operativos.',
    keywords: ['currículum de gestión logística', 'habilidades logísticas para currículum', 'currículum de gerente logístico', 'currículum de logística de transporte'],
    searchIntents: ['cómo incluir gestión logística en el currículum', 'habilidades logísticas para currículum', 'ejemplos de currículum de gestión logística'],
    relatedSkills: ['Gestión de Cadena de Suministro', 'Gestión de Transporte', 'Gestión de Almacén', 'Gestión de Inventario', 'Gestión de Fletes', 'TMS', 'WMS', 'Optimización de Rutas', 'Cumplimiento Aduanero'],
    professionSlugs: ['gerente-de-transporte', 'gerente-de-distribucion', 'gerente-de-almacen', 'gerente-de-cadena-de-suministro', 'gerente-de-operaciones', 'director-de-operaciones'],
    atsKeywords: ['gestión logística', 'logística', 'transporte', 'almacenamiento', 'distribución', 'fletes', 'TMS', 'WMS', 'entrega de última milla', 'cumplimiento de pedidos', 'gestión de transportistas', 'optimización de rutas'],
    resumeTips: [
      'Cuantifica las operaciones logísticas gestionadas (envíos, volumen, geografía, presupuesto).',
      'Reporta reducciones de costos en transporte y almacenamiento.',
      'Menciona plataformas de tecnología logística utilizadas (TMS, WMS, telemática).',
      'Incluye certificaciones CLTD u otras de logística.',
      'Describe experiencia en logística internacional incluyendo aduanas y cumplimiento comercial.'
    ],
    exampleBullets: [
      'Gestioné operaciones logísticas para 250,000 envíos anuales en 45 estados, reduciendo costos de transporte en un 18% mediante negociación con transportistas y optimización de rutas.',
      'Implementé plataforma TMS que automatizó la selección de transportistas y optimización de carga, ahorrando $2.4M anuales y mejorando la entrega a tiempo del 91% al 97%.',
      'Rediseñé el layout del almacén y la optimización de rutas de picking que aumentó el rendimiento de cumplimiento en un 40% y redujo el tiempo promedio de procesamiento de pedidos de 4 horas a 1.5 horas.',
      'Lideré logística internacional para importaciones de 8 países, asegurando 100% de cumplimiento aduanero mientras reducía los costos de descarga en un 12% mediante optimización de aranceles.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de logística debo destacar?', answer: 'APICS CLTD (Certified in Logistics, Transportation and Distribution) es la certificación premier de logística. CSCMP SCPro cubre fundamentos de cadena de suministro incluyendo logística. Las certificaciones CTPAT y de agente aduanal son valiosas para logística internacional. Elige según tu área de especialización.' },
      { question: '¿Cómo se diferencia la gestión logística de la gestión de cadena de suministro en un currículum?', answer: 'La logística se enfoca específicamente en el movimiento físico y almacenamiento de bienes, mientras que la gestión de cadena de suministro abarca todo el flujo de extremo a extremo incluyendo adquisiciones, manufactura y planificación de demanda. Lista logística para roles operativos y enfocados en transporte, y gestión de cadena de suministro para roles de coordinación estratégica.' },
      { question: '¿Es importante la experiencia en tecnología para currículums de logística?', answer: 'Muy importante. Menciona TMS, WMS, sistemas de gestión de flota, rastreo GPS y herramientas de optimización de rutas. La experiencia en logística digital con plataformas como Oracle TMS, SAP TM o Manhattan Associates es altamente valorada. La analítica de datos para optimización logística es un diferenciador cada vez más importante.' }
    ]
  },
  'operations-management': {
    slug: 'gestion-de-operaciones',
    title: 'Gestión de Operaciones',
    description: 'La gestión de operaciones es la administración de prácticas de negocio para crear el mayor nivel de eficiencia dentro de una organización, convirtiendo materiales y mano de obra en bienes y servicios para maximizar las ganancias. Abarca diseño de procesos, planificación de capacidad, gestión de calidad, coordinación de cadena de suministro, control de inventario, gestión de fuerza laboral y mejora continua.\n\nLos gerentes de operaciones aplican metodologías incluyendo Lean, Six Sigma, Teoría de Restricciones y Gestión de Calidad Total para optimizar el rendimiento, reducir desperdicios y mejorar la calidad. Equilibran objetivos en competencia de costo, calidad, velocidad y flexibilidad mientras gestionan recursos tanto humanos como de capital. Las métricas clave incluyen Eficiencia General del Equipo (OEE), rendimiento, utilización de capacidad, costo unitario y satisfacción del cliente.\n\nLa gestión de operaciones moderna integra tecnologías digitales incluyendo IoT para monitoreo en tiempo real, IA para mantenimiento predictivo, automatización robótica de procesos (RPA) para tareas administrativas y gemelos digitales para simulación de procesos. La excelencia operativa es reconocida como una ventaja competitiva central en los sectores de manufactura, servicios, salud y tecnología.',
    whyImportant: 'La gestión de operaciones es la columna vertebral de la ejecución organizacional. Los gerentes de operaciones ganan $70,000-$115,000, con directores y VPs de operaciones alcanzando $130,000-$200,000+. Las habilidades de gestión de operaciones aparecen en más del 40% de todas las ofertas de nivel gerencial en todas las industrias.\n\nIncluir gestión de operaciones en tu currículum demuestra la capacidad de dirigir operaciones de negocio eficiente y efectivamente. Señala liderazgo, pensamiento de procesos y una orientación a resultados que los empleadores valoran en todos los niveles organizacionales.',
    keywords: ['currículum de gestión de operaciones', 'habilidades de gerente de operaciones', 'habilidades de gestión de operaciones', 'palabras clave de operaciones para currículum'],
    searchIntents: ['cómo incluir gestión de operaciones en el currículum', 'habilidades de gestión de operaciones para currículum', 'ejemplos de currículum de gerente de operaciones'],
    relatedSkills: ['Mejora de Procesos', 'Gestión Lean', 'Six Sigma', 'Gestión de Calidad', 'Gestión de Cadena de Suministro', 'Gestión de Presupuesto', 'Planificación de Fuerza Laboral', 'Desarrollo de KPI', 'Gestión de Proyectos'],
    professionSlugs: ['gerente-de-operaciones', 'gerente-general', 'director-de-operaciones', 'director-de-operaciones', 'gerente-de-almacen', 'gerente-de-cadena-de-suministro', 'vicepresidente'],
    atsKeywords: ['gestión de operaciones', 'excelencia operativa', 'optimización de procesos', 'mejora de eficiencia', 'planificación de capacidad', 'gestión de calidad', 'KPIs', 'SLAs', 'mejora continua', 'OEE', 'rendimiento', 'gestión de fuerza laboral'],
    resumeTips: [
      'Cuantifica el alcance operativo que gestionaste (ingresos, personal, ubicaciones).',
      'Reporta ganancias de eficiencia en términos medibles (reducción de costos, aumento de rendimiento, mejora de calidad).',
      'Menciona las metodologías operativas aplicadas (Lean, Six Sigma, TQM).',
      'Describe las responsabilidades de coordinación y liderazgo multifuncional.',
      'Incluye iniciativas de tecnología y automatización que implementaste.',
      'Destaca mejoras en satisfacción del cliente o niveles de servicio.'
    ],
    exampleBullets: [
      'Dirigí operaciones para una unidad de negocio de $85M con 420 empleados en 6 ubicaciones, mejorando la eficiencia operativa en un 25% y reduciendo los costos unitarios en un 18%.',
      'Implementé un marco de operaciones Lean que aumentó el rendimiento en un 35%, redujo el tiempo de ciclo en un 42% y ahorró $4.6M anuales.',
      'Lideré la transformación digital de operaciones incluyendo despliegue de RPA para 40 procesos manuales, liberando 12 FTEs para trabajo de valor agregado y reduciendo errores en un 90%.',
      'Logré 99.2% de cumplimiento de SLA en todas las líneas de servicio mediante procedimientos operativos estandarizados y dashboards de desempeño en tiempo real.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia la gestión de operaciones de la gestión de proyectos?', answer: 'La gestión de operaciones se enfoca en procesos continuos y repetitivos que sostienen el negocio día a día, mientras que la gestión de proyectos se enfoca en iniciativas temporales y únicas con fechas de inicio y fin definidas. Ambas son valiosas y complementarias. Muchos líderes necesitan competencia en ambas disciplinas.' },
      { question: '¿Qué marcos de gestión de operaciones debo listar?', answer: 'Lean, Six Sigma, TQM y Teoría de Restricciones son los marcos de excelencia operativa más reconocidos. Menciona los que hayas aplicado en la práctica. Combinar marcos como Lean Six Sigma demuestra profundidad y versatilidad.' },
      { question: '¿Puedo listar gestión de operaciones en un rol no tradicional de operaciones?', answer: 'Sí. Cualquier rol que involucre gestión de procesos, coordinación de equipos, asignación de recursos y optimización de desempeño involucra principios de gestión de operaciones. Los equipos de tecnología, departamentos de marketing y firmas de servicios profesionales todos tienen funciones operativas que se benefician de una gestión estructurada.' }
    ]
  },
  'process-improvement': {
    slug: 'mejora-de-procesos',
    title: 'Mejora de Procesos',
    description: 'La mejora de procesos es la práctica sistemática de identificar, analizar y mejorar los procesos de negocio existentes para optimizar el desempeño, cumplir estándares de mejores prácticas y mejorar la calidad, eficiencia y satisfacción del cliente. Se apoya en metodologías que incluyen Lean, Six Sigma, Kaizen, Reingeniería de Procesos de Negocio (BPR) y Gestión de Calidad Total (TQM).\n\nLos profesionales de mejora de procesos utilizan herramientas como mapeo de procesos (SIPOC, diagramas de carriles), mapeo de flujo de valor, análisis de causa raíz (diagramas de Ishikawa, 5 Porqués), análisis de Pareto, control estadístico de procesos y resolución de problemas A3. Identifican cuellos de botella, desperdicios, variación y retrabajo, y luego diseñan e implementan soluciones que abordan causas raíz en lugar de síntomas.\n\nLa mejora de procesos moderna aprovecha cada vez más herramientas de process mining como Celonis, UiPath Process Mining y ABBYY Timeline para descubrir y analizar automáticamente procesos a partir de datos de registros de eventos. La Automatización Robótica de Procesos (RPA) y la IA complementan la mejora de procesos tradicional automatizando procesos optimizados a escala.',
    whyImportant: 'La mejora de procesos impacta directamente el resultado final, con proyectos típicos entregando mejoras del 10-50% en eficiencia, calidad o costo. Los profesionales de mejora de procesos ganan $70,000-$110,000, con directores de mejora continua alcanzando $130,000-$165,000. La habilidad aparece en más del 30% de las ofertas de operaciones y gestión de calidad.\n\nIncluir mejora de procesos en tu currículum demuestra resolución analítica de problemas y una mentalidad orientada a resultados. Señala que buscas proactivamente ganancias de eficiencia en lugar de aceptar el status quo, una cualidad altamente valorada por organizaciones orientadas al crecimiento.',
    keywords: ['currículum de mejora de procesos', 'habilidades de mejora de procesos', 'currículum de mejora continua', 'currículum de optimización de procesos'],
    searchIntents: ['cómo incluir mejora de procesos en el currículum', 'habilidades de mejora de procesos para currículum', 'ejemplos de currículum de mejora de procesos'],
    relatedSkills: ['Gestión Lean', 'Six Sigma', 'Kaizen', 'Análisis de Causa Raíz', 'Mapeo de Flujo de Valor', 'Reingeniería de Procesos de Negocio', 'RPA', 'Process Mining', 'Gestión de Calidad', 'Gestión de Operaciones'],
    professionSlugs: ['gerente-de-operaciones', 'consultor-de-gestion', 'gerente-de-proyectos', 'gerente-general', 'director-de-operaciones', 'gerente-de-cadena-de-suministro', 'director-de-operaciones'],
    atsKeywords: ['mejora de procesos', 'mejora continua', 'optimización de procesos', 'Lean', 'Six Sigma', 'Kaizen', 'análisis de causa raíz', 'mapeo de flujo de valor', 'reducción de desperdicios', 'mejora de eficiencia', 'mapeo de procesos', 'DMAIC'],
    resumeTips: [
      'Cuantifica el impacto de las mejoras en términos de tiempo, costo y calidad.',
      'Especifica la metodología y herramientas de mejora de procesos utilizadas.',
      'Describe el alcance de los procesos mejorados (a nivel empresarial, departamental, flujo específico).',
      'Incluye certificaciones de mejora de procesos (cinturones Lean Six Sigma, Facilitador Kaizen).',
      'Menciona el número de proyectos de mejora completados y su impacto acumulado.'
    ],
    exampleBullets: [
      'Lideré 22 proyectos de mejora de procesos en 4 departamentos, entregando $6.2M en ahorros anuales acumulados mediante eliminación de desperdicios y reducción de tiempo de ciclo.',
      'Mapeé y rediseñé el proceso de pedido a cobro, reduciendo el tiempo de ciclo de 45 días a 18 días y mejorando el flujo de efectivo en $8M anuales.',
      'Realicé análisis de causa raíz de un defecto de calidad recurrente, implementando una solución poka-yoke que eliminó el defecto por completo y ahorró $420,000 anuales en costos de retrabajo.',
      'Desplegué herramienta de process mining (Celonis) en operaciones de finanzas, descubriendo 35 variantes de proceso y estandarizando a 5 rutas óptimas que redujeron el tiempo de procesamiento en un 52%.'
    ],
    faqs: [
      { question: '¿Debo listar herramientas específicas de mejora de procesos o solo la metodología?', answer: 'Lista ambos. Menciona la metodología (Lean, Six Sigma, Kaizen) para credibilidad y herramientas específicas (mapeo de flujo de valor, SIPOC, 5 Porqués, control estadístico de procesos) para demostración práctica. También incluye herramientas digitales como Celonis, Minitab o Visio que hayas utilizado.' },
      { question: '¿Cómo muestro habilidades de mejora de procesos sin un rol dedicado de mejora?', answer: 'Todo profesional mejora procesos como parte de su trabajo. Describe flujos de trabajo que optimizaste, tareas manuales que automatizaste, transferencias que eliminaste o estándares que estableciste. Enmarca estas actividades usando lenguaje de metodología de mejora y cuantifica el impacto.' },
      { question: '¿La RPA se considera mejora de procesos para fines del currículum?', answer: 'RPA es una herramienta dentro del kit de herramientas de mejora de procesos. Automatiza procesos existentes, idealmente después de que han sido optimizados. Listar implementación de RPA junto con mejora de procesos tradicional muestra que puedes tanto rediseñar procesos como aplicar tecnología para escalar las mejoras.' }
    ]
  },
  'business-process-reengineering': {
    slug: 'reingenieria-de-procesos-de-negocio',
    title: 'Reingeniería de Procesos de Negocio',
    description: 'La Reingeniería de Procesos de Negocio (BPR) es el replanteamiento fundamental y rediseño radical de los procesos de negocio para lograr mejoras dramáticas en medidas críticas de desempeño como costo, calidad, servicio y velocidad. Acuñada por Michael Hammer y James Champy en su libro de 1993, BPR difiere de la mejora incremental de procesos al cuestionar si los procesos existentes deberían existir en absoluto en lugar de simplemente optimizarlos.\n\nLos proyectos de BPR involucran mapear los procesos del estado actual (as-is), visualizar diseños del estado futuro (to-be), identificar brechas e implementar cambios transformacionales. El enfoque frecuentemente aprovecha la tecnología como habilitador de formas fundamentalmente nuevas de trabajo. BPR típicamente involucra equipos multifuncionales, patrocinio ejecutivo y gestión del cambio para implementar exitosamente cambios radicales de procesos.\n\nEl BPR moderno ha evolucionado para incorporar la transformación digital, incluyendo tecnologías como computación en la nube, IA, automatización y arquitecturas de plataforma para reimaginar procesos que fueron originalmente diseñados para entornos análogos o digitales tempranos.',
    whyImportant: 'BPR entrega mejoras de orden de magnitud que la mejora incremental no puede lograr. Los consultores de BPR ganan $90,000-$150,000, con líderes senior de transformación alcanzando $150,000-$200,000+. Las habilidades de BPR son valoradas en roles de transformación digital, consultoría y diseño organizacional.\n\nIncluir BPR en tu currículum señala la capacidad de pensar audazmente y liderar cambios transformacionales. Te diferencia de candidatos que solo conocen la mejora incremental, posicionándote para roles de alto impacto de liderazgo donde se necesita un rediseño fundamental del negocio.',
    keywords: ['currículum de reingeniería de procesos', 'habilidades de BPR', 'currículum de rediseño de procesos', 'currículum de transformación de negocios'],
    searchIntents: ['cómo incluir BPR en el currículum', 'habilidades de reingeniería de procesos de negocio', 'ejemplos de currículum de BPR'],
    relatedSkills: ['Mejora de Procesos', 'Gestión del Cambio', 'Transformación Digital', 'Diseño Organizacional', 'Arquitectura Empresarial', 'Gestión Lean', 'Gestión de Proyectos', 'Pensamiento Sistémico'],
    professionSlugs: ['consultor-de-gestion', 'consultor-de-estrategia', 'gerente-de-operaciones', 'director-de-operaciones', 'director-de-operaciones', 'gerente-de-ti'],
    atsKeywords: ['reingeniería de procesos de negocio', 'BPR', 'rediseño de procesos', 'transformación de negocios', 'innovación de procesos', 'análisis as-is to-be', 'rediseño de flujo de trabajo', 'transformación operativa', 'transformación digital', 'automatización de procesos'],
    resumeTips: [
      'Describe la magnitud del cambio logrado (no mejora incremental sino rediseño fundamental).',
      'Cuantifica métricas de antes y después para demostrar mejora dramática.',
      'Explica el alcance y complejidad de los procesos rediseñados.',
      'Destaca los cambios tecnológicos u organizacionales que habilitaron el nuevo diseño.',
      'Menciona los logros de gestión del cambio y alineación de interesados.'
    ],
    exampleBullets: [
      'Rediseñé el proceso de incorporación de clientes de extremo a extremo de un flujo de trabajo basado en papel de 28 pasos a una experiencia digital de 6 pasos, reduciendo el tiempo de incorporación de 14 días a 2 horas.',
      'Lideré BPR del proceso de adquisiciones para una organización de $500M, reemplazando aprobaciones manuales con flujos de trabajo automatizados que redujeron el tiempo de ciclo en un 80% y generaron $7M en ahorros anuales.',
      'Rediseñé el flujo de trabajo de procesamiento de reclamos desde cero, consolidando 4 sistemas legados en una sola plataforma que mejoró el rendimiento en un 300% y redujo las tasas de error en un 92%.',
      'Dirigí iniciativa de BPR multifuncional en finanzas, RRHH y operaciones que eliminó 120 pasos redundantes de procesos y redujo las necesidades de personal administrativo en un 35%.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia BPR de la mejora de procesos?', answer: 'La mejora de procesos (Lean, Six Sigma) hace mejoras incrementales a procesos existentes. BPR fundamentalmente replantea y rediseña radicalmente los procesos desde la base. BPR es apropiado cuando los procesos existentes son fundamentalmente defectuosos o cuando la tecnología habilita enfoques completamente nuevos.' },
      { question: '¿BPR sigue siendo relevante en los negocios modernos?', answer: 'Muy relevante, aunque frecuentemente bajo diferentes nombres. La transformación digital, automatización de procesos e innovación de modelos de negocio son manifestaciones modernas del pensamiento BPR. El principio central de cuestionar los procesos existentes en lugar de solo optimizarlos es más importante que nunca.' },
      { question: '¿Qué habilidades necesito demostrar para BPR en un currículum?', answer: 'BPR requiere una combinación de pensamiento estratégico, análisis de procesos, conocimiento tecnológico, gestión del cambio y liderazgo de proyectos. Muestra que puedes visualizar formas fundamentalmente diferentes de trabajo, no solo mejorar flujos existentes. Destaca liderazgo multifuncional y gestión de interesados ejecutivos.' }
    ]
  },
  'quality-management': {
    slug: 'gestion-de-calidad',
    title: 'Gestión de Calidad',
    description: 'La gestión de calidad es la función organizacional responsable de supervisar todas las actividades y tareas necesarias para mantener un nivel deseado de excelencia. Abarca planificación de calidad, aseguramiento de calidad (QA), control de calidad (QC) y mejora continua. El estándar ISO 9001 proporciona el marco internacionalmente reconocido para sistemas de gestión de calidad (QMS), siendo la revisión actual ISO 9001:2015.\n\nLos sistemas de gestión de calidad definen políticas de calidad, objetivos, procesos y responsabilidades. Los profesionales utilizan herramientas incluyendo Control Estadístico de Procesos (SPC), Análisis de Modo y Efecto de Falla (FMEA), planes de control, programas de auditoría, acciones correctivas y preventivas (CAPA) y despliegue de la función de calidad (QFD). Los estándares específicos de la industria como AS9100 (aeroespacial), IATF 16949 (automotriz) e ISO 13485 (dispositivos médicos) se basan en ISO 9001 con requisitos adicionales.\n\nLa filosofía de Gestión de Calidad Total (TQM) enfatiza que la calidad es responsabilidad de todos y debe estar integrada en toda la organización. La gestión de calidad ha evolucionado de enfoques basados en inspección a sistemas basados en prevención que incorporan calidad en los procesos desde el diseño hasta la entrega.',
    whyImportant: 'Los fallos de calidad cuestan a las organizaciones 15-20% de los ingresos según expertos en calidad. Los gerentes de calidad ganan $75,000-$110,000, con líderes de calidad de nivel VP alcanzando $140,000-$190,000. La gestión de calidad aparece en más del 30% de las ofertas de manufactura, salud e industrias reguladas.\n\nIncluir gestión de calidad en tu currículum demuestra pensamiento sistemático, atención al detalle y la capacidad de mantener estándares a escala. Es esencial para industrias reguladas y valorada en cualquier organización comprometida con la satisfacción del cliente y la excelencia operativa.',
    keywords: ['currículum de gestión de calidad', 'habilidades de gestión de calidad', 'currículum ISO 9001', 'currículum de gerente de calidad'],
    searchIntents: ['cómo incluir gestión de calidad en el currículum', 'habilidades de gestión de calidad para currículum', 'ejemplos de currículum de gestión de calidad'],
    relatedSkills: ['Six Sigma', 'ISO 9001', 'Gestión Lean', 'Mejora de Procesos', 'Control Estadístico de Procesos', 'FMEA', 'Análisis de Causa Raíz', 'Auditoría', 'CAPA', 'Cumplimiento Regulatorio'],
    professionSlugs: ['gerente-de-operaciones', 'gerente-general', 'gerente-de-cadena-de-suministro', 'director-de-operaciones', 'consultor-de-gestion', 'director-de-operaciones'],
    atsKeywords: ['gestión de calidad', 'QMS', 'ISO 9001', 'aseguramiento de calidad', 'control de calidad', 'CAPA', 'FMEA', 'SPC', 'gestión de calidad total', 'mejora continua', 'auditoría', 'acción correctiva'],
    resumeTips: [
      'Referencia estándares de calidad específicos que hayas implementado o mantenido (ISO 9001, AS9100, etc.).',
      'Cuantifica mejoras de calidad en términos de reducción de defectos, quejas de clientes o costo de calidad.',
      'Menciona certificaciones de QMS que poseas (CQE, CQM, CMQ/OE de ASQ).',
      'Describe experiencia en auditorías incluyendo auditorías internas, externas y de certificación.',
      'Incluye resultados de proyectos de mejora de calidad y su impacto empresarial.'
    ],
    exampleBullets: [
      'Lideré la certificación ISO 9001:2015 para una instalación de manufactura de 500 personas, logrando cero no conformidades en la primera auditoría de certificación.',
      'Reduje la tasa de quejas de clientes en un 62% mediante la implementación de un sistema CAPA integral que abordó las causas raíz en 12 líneas de producto.',
      'Diseñé y desplegué monitoreo SPC en 8 procesos de producción críticos, reduciendo la variación del proceso en un 45% y ahorrando $2.1M en costos de desperdicio y retrabajo.',
      'Construí un sistema de gestión de calidad desde cero para una startup de dispositivos médicos, logrando la certificación ISO 13485 en 10 meses y habilitando la entrada al mercado.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de gestión de calidad son más valoradas?', answer: 'Las certificaciones ASQ son el estándar de oro: CQE (Certified Quality Engineer), CMQ/OE (Certified Manager of Quality/Organizational Excellence) y CQA (Certified Quality Auditor). La certificación de Auditor Líder ISO 9001 es valorada para roles enfocados en auditoría. Las certificaciones específicas de la industria agregan valor en sectores regulados.' },
      { question: '¿Cómo demuestro habilidades de gestión de calidad en roles fuera de manufactura?', answer: 'La gestión de calidad aplica a servicios, software, salud y toda industria. Describe estándares de calidad que estableciste, sistemas de medición que implementaste, mejoras de satisfacción del cliente que lograste o iniciativas de reducción de errores que lideraste. El pensamiento de calidad es universal.' },
      { question: '¿La experiencia en ISO 9001 sigue siendo importante para currículums?', answer: 'Sí, ISO 9001 sigue siendo el estándar de sistema de gestión más ampliamente implementado a nivel global, con más de 1 millón de certificaciones en todo el mundo. Se espera en manufactura, aeroespacial, defensa y muchas industrias de servicios. Demostrar experiencia en implementación o auditoría de ISO 9001 es un fuerte diferenciador en el currículum.' }
    ]
  },
  'kpi-development': {
    slug: 'desarrollo-de-kpi',
    title: 'Desarrollo de KPI',
    description: 'El desarrollo de KPI (Indicadores Clave de Desempeño) es el proceso de definir, diseñar e implementar valores medibles que demuestran cuán efectivamente una organización, departamento o individuo está logrando los objetivos clave de negocio. Los KPI efectivos son específicos, medibles, alcanzables, relevantes y con plazo definido (SMART), y alinean las métricas operativas con las metas estratégicas.\n\nEl desarrollo de KPI involucra identificar objetivos estratégicos, descomponerlos en resultados medibles, seleccionar indicadores anticipados y rezagados, establecer objetivos y umbrales, definir fuentes de datos y métodos de cálculo, y diseñar dashboards de reporte. Los profesionales deben distinguir entre métricas de vanidad que se ven impresionantes pero carecen de información accionable y KPIs accionables que impulsan comportamiento y toma de decisiones.\n\nLos marcos de KPI incluyen el Cuadro de Mando Integral (perspectivas financiera, de cliente, de procesos internos y de aprendizaje y crecimiento), OKRs (Objetivos y Resultados Clave), hoshin kanri (despliegue de políticas) y OGSM (Objetivos, Metas, Estrategias, Medidas). Las herramientas de visualización como Tableau, Power BI, Databox y Klipfolio ayudan a las organizaciones a rastrear y comunicar el desempeño de KPI.',
    whyImportant: 'Las organizaciones que miden activamente el desempeño a través de KPIs tienen 3 veces más probabilidades de lograr sus objetivos estratégicos. Las habilidades de KPI y analítica aparecen en más del 25% de las ofertas de nivel gerencial. Los analistas de inteligencia de negocios ganan $75,000-$110,000, mientras que los directores de gestión del desempeño alcanzan $130,000-$170,000.\n\nIncluir desarrollo de KPI en tu currículum demuestra que piensas en términos de resultados medibles y gestión basada en datos. Señala la capacidad de traducir la estrategia en métricas rastreables, una habilidad que separa a los gerentes efectivos de aquellos que gestionan por intuición.',
    keywords: ['currículum de desarrollo de KPI', 'habilidades de KPI para currículum', 'currículum de métricas de desempeño', 'currículum de marco de KPI'],
    searchIntents: ['cómo incluir desarrollo de KPI en el currículum', 'habilidades de KPI para gerentes', 'ejemplos de currículum de desarrollo de KPI'],
    relatedSkills: ['OKRs', 'Cuadro de Mando Integral', 'Analítica de Datos', 'Inteligencia de Negocios', 'Tableau', 'Power BI', 'Gestión del Desempeño', 'Planificación Estratégica', 'Diseño de Dashboards'],
    professionSlugs: ['gerente-de-operaciones', 'gerente-general', 'consultor-de-gestion', 'analista-de-negocios', 'gerente-de-producto', 'director-de-operaciones', 'gerente-de-estrategia'],
    atsKeywords: ['desarrollo de KPI', 'indicadores clave de desempeño', 'métricas de desempeño', 'dashboard', 'cuadro de mando integral', 'medición de desempeño', 'gestión basada en datos', 'marco de métricas', 'reportes', 'inteligencia de negocios'],
    resumeTips: [
      'Describe los marcos de KPI que desarrollaste y su alineación estratégica.',
      'Cuantifica el impacto que el seguimiento de KPI tuvo en los resultados de negocio.',
      'Menciona herramientas de visualización utilizadas para dashboards de KPI.',
      'Explica cómo tus KPIs impulsaron cambio de comportamiento o toma de decisiones.',
      'Incluye el alcance de los programas de KPI (a nivel de empresa, departamental, de equipo).'
    ],
    exampleBullets: [
      'Desarrollé un marco integral de KPI abarcando 45 métricas en 8 departamentos, proporcionando al liderazgo ejecutivo visibilidad en tiempo real del progreso de los objetivos estratégicos.',
      'Diseñé e implementé un cuadro de mando integral para una unidad de negocio de $120M, alineando a más de 200 empleados en torno a 16 KPIs estratégicos que impulsaron un crecimiento de ingresos del 22%.',
      'Construí dashboards ejecutivos en Power BI rastreando 30 KPIs, reduciendo la preparación de reportes mensuales de 5 días a 4 horas.',
      'Establecí KPIs de indicadores anticipados para cancelación de clientes que proporcionaron alerta temprana de 90 días, habilitando intervención que mejoró la retención en un 15%.'
    ],
    faqs: [
      { question: '¿Cuántos KPIs debo destacar en mi currículum?', answer: 'Enfócate en 3-5 KPIs de alto impacto que hayas desarrollado o mejorado significativamente. Describe el objetivo de negocio que cada KPI medía, la meta que estableciste y el resultado logrado. La calidad de los ejemplos de KPI importa más que la cantidad.' },
      { question: '¿Cuál es la diferencia entre KPIs y OKRs en un currículum?', answer: 'Los KPIs miden el desempeño continuo contra objetivos (generalmente operativos), mientras que los OKRs establecen objetivos ambiciosos con resultados clave medibles (generalmente estratégicos). Ambos son valiosos para listar. Los KPIs demuestran rigor operativo, mientras que los OKRs señalan alineación estratégica y establecimiento de metas ambiciosas.' },
      { question: '¿Qué herramientas debo conocer para desarrollo de KPI?', answer: 'Las herramientas de inteligencia de negocios como Tableau, Power BI y Looker son esenciales para la visualización de KPI. Excel sigue siendo fundamental para el análisis. La experiencia con data warehouses y herramientas ETL agrega valor para infraestructura de datos. Menciona las herramientas que se alineen con el stack tecnológico del empleador.' }
    ]
  },
  'okrs': {
    slug: 'okrs',
    title: 'OKRs',
    description: 'Los OKRs (Objetivos y Resultados Clave) son un marco de establecimiento de metas utilizado para definir objetivos medibles y rastrear sus resultados. Desarrollado por Andy Grove en Intel y popularizado por John Doerr en Google, los OKRs alinean la estrategia organizacional con la ejecución de equipos e individuos. Un Objetivo es una descripción cualitativa e inspiradora de lo que quieres lograr, mientras que los Resultados Clave son resultados específicos y medibles que indican el progreso hacia el Objetivo.\n\nLos OKRs operan en ciclos trimestrales con OKRs estratégicos anuales proporcionando dirección. Las mejores prácticas incluyen establecer 3-5 Objetivos por equipo, cada uno con 2-5 Resultados Clave, apuntar a un logro del 60-70% (metas ambiciosas), realizar check-ins semanales y mantener revisiones trimestrales. Los OKRs enfatizan la transparencia, con todos los OKRs visibles en toda la organización para promover alineación y colaboración.\n\nEmpresas incluyendo Google, LinkedIn, Twitter, Spotify y Netflix usan OKRs a escala. Herramientas como Lattice, 15Five, Workboard y Gtmhub apoyan la gestión de OKRs con árboles de alineación, seguimiento de progreso e integración con sistemas de gestión de proyectos.',
    whyImportant: 'Los OKRs se han convertido en el marco dominante de establecimiento de metas en empresas de tecnología y se están expandiendo a industrias tradicionales. Los roles de implementación de OKRs alcanzan $90,000-$140,000, mientras que los coaches y líderes de transformación de OKRs ganan $130,000-$170,000. La experiencia en OKRs se menciona en más del 20% de las ofertas de producto y estrategia.\n\nIncluir OKRs en tu currículum señala pensamiento orientado a la alineación, responsabilidad y experiencia con prácticas de gestión modernas. Demuestra que puedes traducir la estrategia en resultados medibles y mantener el enfoque en las actividades de mayor prioridad.',
    keywords: ['currículum de OKR', 'habilidades de OKR', 'currículum de objetivos y resultados clave', 'currículum de marco OKR'],
    searchIntents: ['cómo incluir OKRs en el currículum', 'experiencia en OKR para gerentes', 'ejemplos de currículum de OKR'],
    relatedSkills: ['Desarrollo de KPI', 'Planificación Estratégica', 'Gestión del Desempeño', 'Establecimiento de Metas', 'Cuadro de Mando Integral', 'Gestión de Producto', 'Metodología Agile', 'Liderazgo'],
    professionSlugs: ['gerente-de-producto', 'product-owner', 'gerente-de-ingenieria', 'gerente-de-estrategia', 'gerente-general', 'director-ejecutivo'],
    atsKeywords: ['OKRs', 'Objetivos y Resultados Clave', 'establecimiento de metas', 'alineación estratégica', 'planificación trimestral', 'resultados clave', 'seguimiento de desempeño', 'alineación organizacional', 'metas ambiciosas', 'marco OKR'],
    resumeTips: [
      'Describe cómo cascadeaste OKRs desde el nivel de empresa al equipo al individual.',
      'Cuantifica los resultados logrados a través de la implementación de OKRs.',
      'Menciona herramientas de OKR utilizadas como Lattice, Workboard o Gtmhub.',
      'Explica cómo los OKRs mejoraron el enfoque, alineación o ejecución en tu organización.',
      'Incluye ejemplos de OKRs ambiciosos y sus tasas de logro reales.'
    ],
    exampleBullets: [
      'Implementé el marco de OKRs en una organización de ingeniería de 300 personas, mejorando las puntuaciones de alineación estratégica del 52% al 88% y aumentando la finalización de metas trimestrales en un 40%.',
      'Facilité talleres de OKRs para 12 equipos de producto, estableciendo 45 objetivos trimestrales que concentraron el esfuerzo en iniciativas de mayor impacto y redujeron la dispersión de proyectos en un 60%.',
      'Diseñé una cadencia de OKRs a nivel de empresa con check-ins semanales y revisiones trimestrales, logrando un logro promedio de resultados clave del 75% en 8 departamentos.',
      'Entrené al equipo ejecutivo en mejores prácticas de OKRs, haciendo la transición del establecimiento anual de metas a ciclos trimestrales de OKRs que mejoraron la agilidad organizacional y la respuesta a cambios del mercado.'
    ],
    faqs: [
      { question: '¿Debo listar OKRs separados de KPIs en mi currículum?', answer: 'Sí, lístalos por separado ya que sirven propósitos diferentes. Los OKRs demuestran capacidad de establecimiento y ejecución de metas estratégicas, mientras que los KPIs demuestran medición del desempeño operativo. Los empleadores que usan OKRs buscan específicamente esta palabra clave en los currículums.' },
      { question: '¿Cómo muestro experiencia en OKRs sin haber liderado un programa de OKRs?', answer: 'Si has trabajado dentro de un sistema de OKRs, describe cómo estableciste OKRs de equipo o personales, los alineaste con objetivos organizacionales, rastreaste el progreso y lograste resultados clave. Contribuir al éxito de OKRs es tan valioso como implementar el marco.' },
      { question: '¿Los OKRs solo se usan en empresas de tecnología?', answer: 'Aunque los OKRs se originaron en tecnología, ahora se usan en servicios financieros, salud, organizaciones sin fines de lucro, gobierno y educación. El marco es agnóstico a la industria. Si tienes experiencia con OKRs en un entorno no tecnológico, demuestra versatilidad y adopción de prácticas de gestión modernas.' }
    ]
  },
  'balanced-scorecard': {
    slug: 'cuadro-de-mando-integral',
    title: 'Cuadro de Mando Integral',
    description: 'El Cuadro de Mando Integral (BSC) es un marco de planificación y gestión estratégica desarrollado por Robert Kaplan y David Norton que traduce la visión y estrategia de una organización en un conjunto coherente de medidas de desempeño a través de cuatro perspectivas: Financiera, Cliente, Procesos Internos de Negocio y Aprendizaje y Crecimiento. Asegura que las organizaciones no se enfoquen exclusivamente en resultados financieros sino que también midan y gestionen los impulsores del desempeño futuro.\n\nImplementar un BSC involucra crear mapas estratégicos que visualizan las relaciones causa-efecto entre objetivos estratégicos, definir medidas y metas para cada objetivo, identificar iniciativas estratégicas y establecer cuadros de mando en cascada desde el nivel corporativo al de unidad de negocio y departamento. Cada perspectiva típicamente contiene 4-6 objetivos con 1-2 medidas cada uno.\n\nEl BSC ha sido adoptado por más del 50% de las empresas Fortune 1000, numerosas agencias gubernamentales y organizaciones sin fines de lucro en todo el mundo. Ha evolucionado de un sistema de medición a un sistema integral de gestión estratégica que vincula la formulación de estrategia, comunicación, ejecución y retroalimentación en un ciclo continuo.',
    whyImportant: 'Las organizaciones que usan el Cuadro de Mando Integral tienen más del doble de probabilidades de ser líderes de desempeño en su grupo de pares. La experiencia en BSC otorga primas salariales del 10-15% en roles de estrategia y gestión del desempeño. El marco aparece en ofertas de estrategia, finanzas y gestión senior.\n\nIncluir Cuadro de Mando Integral en tu currículum señala pensamiento estratégico y la capacidad de conectar actividades operativas con resultados estratégicos. Demuestra experiencia en sistemas de gestión del desempeño y medición multidimensional que va más allá de métricas financieras básicas.',
    keywords: ['currículum de cuadro de mando integral', 'habilidades de BSC para currículum', 'currículum de gestión estratégica', 'experiencia en cuadro de mando integral'],
    searchIntents: ['cómo incluir cuadro de mando integral en el currículum', 'habilidades de balanced scorecard para gerentes', 'ejemplos de currículum de BSC'],
    relatedSkills: ['Planificación Estratégica', 'Desarrollo de KPI', 'OKRs', 'Mapeo Estratégico', 'Gestión del Desempeño', 'Análisis Financiero', 'Inteligencia de Negocios', 'Diseño de Dashboards'],
    professionSlugs: ['gerente-de-estrategia', 'consultor-de-gestion', 'consultor-de-estrategia', 'director-ejecutivo', 'director-financiero', 'director-de-operaciones'],
    atsKeywords: ['cuadro de mando integral', 'BSC', 'mapa estratégico', 'gestión del desempeño', 'objetivos estratégicos', 'cuatro perspectivas', 'ejecución de estrategia', 'medidas estratégicas', 'cuadro de mando en cascada', 'Kaplan Norton'],
    resumeTips: [
      'Describe el alcance de tu implementación de BSC (nivel organizacional, número de objetivos).',
      'Explica cómo vinculaste los objetivos estratégicos con las medidas operativas.',
      'Cuantifica el impacto de negocio de las mejoras impulsadas por el BSC.',
      'Menciona técnicas de mapeo estratégico y cascada utilizadas.',
      'Incluye cualquier certificación BSP (Balanced Scorecard Professional).'
    ],
    exampleBullets: [
      'Diseñé e implementé un Cuadro de Mando Integral con 20 objetivos estratégicos y 42 medidas en 4 perspectivas, alineando a 1,200 empleados con el plan estratégico a 5 años.',
      'Cascadeé el BSC corporativo a 6 unidades de negocio y 24 departamentos, creando línea de visión desde las metas individuales hasta la estrategia organizacional y mejorando la finalización de iniciativas estratégicas en un 55%.',
      'Creé mapas estratégicos que visualizaron relaciones causa-efecto, permitiendo al equipo ejecutivo priorizar 8 iniciativas estratégicas que entregaron $12M en valor incremental.',
      'Lideré reuniones trimestrales de revisión estratégica usando datos del BSC, identificando 3 objetivos fuera de rumbo tempranamente e implementando acciones correctivas que evitaron $4M en posibles pérdidas de ingresos.'
    ],
    faqs: [
      { question: '¿El Cuadro de Mando Integral sigue siendo relevante en 2025?', answer: 'Sí, el BSC sigue siendo ampliamente utilizado especialmente en gobierno, salud y grandes empresas. Mientras que los OKRs han ganado popularidad en tecnología, muchas organizaciones usan BSC para alineación estratégica y OKRs para ejecución. Entender ambos marcos es un fuerte diferenciador.' },
      { question: '¿Cómo se diferencia el Cuadro de Mando Integral de los OKRs?', answer: 'BSC es un sistema integral de gestión estratégica con cuatro perspectivas fijas y enfoque en alineación y medición. Los OKRs son un marco más simple y ágil de establecimiento de metas enfocado en resultados ambiciosos. BSC funciona bien para gestión estratégica madura; los OKRs se adaptan a entornos rápidos y adaptativos.' },
      { question: '¿Necesito certificación para listar Cuadro de Mando Integral en mi currículum?', answer: 'No se requiere certificación, pero la BSP (Balanced Scorecard Professional) del Palladium Group agrega credibilidad. La experiencia práctica implementando y gestionando BSCs es más importante que la certificación. Describe implementaciones específicas, alcance y resultados para demostrar experiencia.' }
    ]
  },
  'swot-analysis': {
    slug: 'analisis-foda',
    title: 'Análisis FODA',
    description: 'El análisis FODA es una herramienta de planificación estratégica utilizada para evaluar las Fortalezas, Oportunidades, Debilidades y Amenazas de una organización. Las Fortalezas y Debilidades son factores internos (recursos, capacidades, procesos), mientras que las Oportunidades y Amenazas son factores externos (tendencias del mercado, competencia, regulación). FODA proporciona un marco estructurado para el análisis situacional que informa la toma de decisiones estratégicas.\n\nEl análisis FODA efectivo va más allá de una simple lista para identificar opciones estratégicas: estrategias FO (aprovechar fortalezas para capturar oportunidades), estrategias DO (abordar debilidades para explotar oportunidades), estrategias FA (usar fortalezas para contrarrestar amenazas) y estrategias DA (minimizar debilidades y evitar amenazas). Este enfoque de matriz TOWS transforma el análisis descriptivo en estrategia accionable.\n\nEl análisis FODA se usa para planificación de negocios, análisis competitivo, evaluación de entrada al mercado, desarrollo de productos, planificación de carrera y evaluación de proyectos. Aunque a veces se critica por su simplicidad, FODA sigue siendo una de las herramientas estratégicas más ampliamente utilizadas porque proporciona un marco accesible para una evaluación integral de la situación.',
    whyImportant: 'El análisis FODA es una habilidad fundamental de análisis de negocios esperada de todos los profesionales de gestión. Aparece en currículos de MBA en todo el mundo y se usa en salas de juntas, compromisos de consultoría y procesos de planificación de negocios en todas las industrias. Si bien no es un diferenciador independiente en el currículum, es una competencia base para roles estratégicos.\n\nIncluir análisis FODA en tu currículum junto con otras herramientas estratégicas demuestra pensamiento analítico estructurado. Es más poderoso cuando se combina con evidencia de traducir los hallazgos del FODA en estrategias accionables que entregaron resultados medibles.',
    keywords: ['currículum de análisis FODA', 'habilidades de análisis FODA', 'currículum de análisis estratégico', 'currículum de marco FODA'],
    searchIntents: ['cómo incluir análisis FODA en el currículum', 'habilidades de análisis FODA para negocios', 'ejemplos de currículum de análisis estratégico'],
    relatedSkills: ['Análisis Competitivo', 'Análisis de Mercado', 'Planificación Estratégica', 'Estrategia de Negocios', 'Análisis PESTLE', 'Cinco Fuerzas de Porter', 'Desarrollo de Negocios', 'Gestión de Riesgos'],
    professionSlugs: ['analista-de-negocios', 'consultor-de-gestion', 'consultor-de-estrategia', 'gerente-de-estrategia', 'gerente-de-producto', 'gerente-general'],
    atsKeywords: ['análisis FODA', 'fortalezas debilidades oportunidades amenazas', 'análisis estratégico', 'análisis situacional', 'evaluación competitiva', 'matriz TOWS', 'marco estratégico', 'análisis de negocios', 'evaluación de mercado', 'evaluación estratégica'],
    resumeTips: [
      'Describe el análisis FODA como parte de un proceso más amplio de toma de decisiones estratégicas.',
      'Cuantifica los resultados de negocio de las estrategias desarrolladas a partir de hallazgos del FODA.',
      'Combina FODA con otros marcos analíticos para mostrar profundidad (PESTLE, Cinco Fuerzas).',
      'Enfócate en las acciones estratégicas tomadas basadas en los insights del FODA, no solo en el análisis en sí.',
      'Menciona la audiencia de interesados para tus presentaciones de FODA (junta, ejecutivos, clientes).'
    ],
    exampleBullets: [
      'Realicé un análisis FODA integral para una unidad de negocio de $50M que identificó 3 oportunidades de mercado sin explotar, llevando a una estrategia de diversificación que generó $8M en nuevos ingresos.',
      'Ejecuté análisis FODA y PESTLE para 5 posibles objetivos de adquisición, proporcionando recomendaciones estratégicas que guiaron $120M en decisiones de inversión.',
      'Lideré revisiones trimestrales de FODA con el equipo ejecutivo, identificando amenazas competitivas emergentes 6 meses antes del impacto en el mercado y habilitando estrategias defensivas proactivas.',
      'Desarrollé una matriz de estrategia TOWS que tradujo los hallazgos del FODA en 12 iniciativas estratégicas, 8 de las cuales fueron aprobadas y financiadas por la junta directiva.'
    ],
    faqs: [
      { question: '¿El análisis FODA es demasiado básico para listar en un currículum?', answer: 'Por sí solo, FODA puede parecer básico para roles senior. Sin embargo, cuando se combina con otras herramientas de análisis estratégico y cuando demuestras que los hallazgos del FODA impulsaron estrategias accionables y resultados medibles, valida tu enfoque analítico. Lístalos como parte de tu kit de herramientas estratégicas, no como una habilidad independiente.' },
      { question: '¿Cómo hago que el análisis FODA destaque en mi currículum?', answer: 'Enfócate en los resultados, no en el marco. En lugar de declarar que realizaste un análisis FODA, describe las decisiones estratégicas que informó, las oportunidades de ingresos identificadas o las amenazas mitigadas. Muestra el análisis como un medio para el impacto empresarial en lugar de un fin en sí mismo.' },
      { question: '¿Debo listar el análisis FODA separado de la planificación estratégica?', answer: 'Lista el análisis FODA en tu sección de habilidades si la descripción del puesto lo menciona específicamente. En tu sección de experiencia, integra el análisis FODA en narrativas más amplias de planificación estratégica. Es una herramienta dentro de la planificación estratégica más que una disciplina separada.' }
    ]
  },
  'competitive-analysis': {
    slug: 'analisis-competitivo',
    title: 'Análisis Competitivo',
    description: 'El análisis competitivo es el proceso sistemático de identificar, evaluar y monitorear competidores para informar la toma de decisiones estratégicas y establecer ventaja competitiva. Involucra recopilar inteligencia sobre productos competidores, precios, posicionamiento de mercado, estrategias de marketing, desempeño financiero, capacidades tecnológicas y movimientos organizacionales. Los marcos incluyen las Cinco Fuerzas de Porter para análisis de estructura de la industria, mapeo competitivo para posicionamiento de mercado y análisis de victorias/derrotas para inteligencia de ventas.\n\nLas fuentes de análisis competitivo incluyen presentaciones públicas, reportes de la industria (Gartner, Forrester, IDC), bases de datos de patentes, monitoreo de redes sociales, análisis de ofertas de empleo, entrevistas con clientes, ferias comerciales y plataformas de inteligencia competitiva como Crayon, Klue y Kompyte. Los analistas sintetizan puntos de datos dispares en insights accionables para desarrollo de producto, estrategia de precios, mensajes de marketing y habilitación de ventas.\n\nLa inteligencia competitiva moderna ha evolucionado de reportes periódicos a plataformas de monitoreo continuo que rastrean sitios web de competidores, cambios de precios, lanzamientos de funciones y mensajes de mercado en tiempo real. Las herramientas impulsadas por IA ahora automatizan la recopilación de datos y el reconocimiento de patrones, permitiendo a los analistas enfocarse en la interpretación estratégica.',
    whyImportant: 'La inteligencia competitiva influye directamente en la estrategia de producto, precios y posicionamiento de mercado. Los profesionales de inteligencia competitiva ganan $80,000-$120,000, con directores de estrategia competitiva alcanzando $140,000-$180,000. Las habilidades de análisis competitivo aparecen en más del 20% de las ofertas de gestión de producto, marketing y estrategia.\n\nIncluir análisis competitivo en tu currículum demuestra conciencia del mercado, pensamiento estratégico y la capacidad de traducir inteligencia externa en ventaja interna. Es especialmente valorado en mercados de rápido movimiento donde las dinámicas competitivas cambian rápidamente.',
    keywords: ['currículum de análisis competitivo', 'currículum de inteligencia competitiva', 'habilidades de análisis de competidores', 'currículum de análisis de mercado'],
    searchIntents: ['cómo incluir análisis competitivo en el currículum', 'habilidades de análisis competitivo para estrategia', 'ejemplos de currículum de inteligencia competitiva'],
    relatedSkills: ['Análisis de Mercado', 'Análisis FODA', 'Estrategia de Negocios', 'Planificación Estratégica', 'Gestión de Producto', 'Investigación de Mercado', 'Habilitación de Ventas', 'Cinco Fuerzas de Porter'],
    professionSlugs: ['analista-de-negocios', 'gerente-de-estrategia', 'consultor-de-estrategia', 'gerente-de-producto', 'consultor-de-gestion', 'director-ejecutivo'],
    atsKeywords: ['análisis competitivo', 'inteligencia competitiva', 'análisis de competidores', 'posicionamiento de mercado', 'panorama competitivo', 'análisis de victorias/derrotas', 'Cinco Fuerzas de Porter', 'participación de mercado', 'estrategia competitiva', 'benchmarking'],
    resumeTips: [
      'Describe el alcance de los panoramas competitivos que analizaste (número de competidores, mercados).',
      'Cuantifica el impacto de negocio de los insights competitivos (ganancias de participación de mercado, mejora de tasa de victorias).',
      'Menciona herramientas de inteligencia competitiva y fuentes de datos utilizadas.',
      'Destaca cómo el análisis competitivo influyó en decisiones de producto, precios o estrategia.',
      'Incluye ejemplos de programas o sistemas de inteligencia competitiva que construiste.'
    ],
    exampleBullets: [
      'Construí un programa de inteligencia competitiva monitoreando 15 competidores directos, entregando fichas de batalla mensuales que mejoraron las tasas de victoria de ventas del 32% al 48%.',
      'Realicé un análisis competitivo integral para una estrategia de entrada al mercado, identificando un segmento desatendido que se convirtió en una oportunidad de ingresos de $12M en 2 años.',
      'Desarrollé un análisis competitivo de precios que reveló un 20% de margen de precio para funciones premium, contribuyendo directamente a $5.5M en mejora anual de márgenes.',
      'Presenté reportes trimestrales del panorama competitivo al equipo ejecutivo, identificando 3 amenazas competitivas emergentes y recomendando estrategias defensivas que protegieron $8M en ingresos.'
    ],
    faqs: [
      { question: '¿Qué herramientas debo conocer para análisis competitivo?', answer: 'Plataformas como Crayon, Klue y Kompyte automatizan el monitoreo de competidores. SEMrush y SimilarWeb proporcionan inteligencia competitiva digital. Los reportes de Gartner y Forrester ofrecen análisis de la industria. LinkedIn, Glassdoor y bases de datos de patentes proporcionan inteligencia organizacional. Menciona herramientas relevantes para tu industria y la descripción del puesto.' },
      { question: '¿Cómo demuestro habilidades de análisis competitivo sin un rol dedicado de CI?', answer: 'Los gerentes de producto, gerentes de marketing y líderes de ventas regularmente realizan análisis competitivo. Describe evaluaciones de competidores que realizaste, fichas de batalla que creaste, análisis de precios que condujiste o trabajo de posicionamiento competitivo al que contribuiste. Enfócate en insights entregados y decisiones influenciadas.' },
      { question: '¿El análisis competitivo es lo mismo que el análisis de mercado?', answer: 'El análisis competitivo se enfoca específicamente en los competidores, mientras que el análisis de mercado examina el mercado más amplio incluyendo segmentos de clientes, tendencias, tamaño y crecimiento. Ambos están relacionados pero son distintos. Lista ambos si tienes experiencia con cada uno para demostrar capacidad integral de inteligencia de mercado.' }
    ]
  },
  'market-analysis': {
    slug: 'analisis-de-mercado',
    title: 'Análisis de Mercado',
    description: 'El análisis de mercado es la evaluación integral del tamaño de un mercado, trayectoria de crecimiento, dinámicas, segmentos de clientes, tendencias y panorama competitivo para informar decisiones estratégicas y de inversión. Combina métodos cuantitativos (dimensionamiento de mercado usando TAM/SAM/SOM, modelado de crecimiento, análisis de regresión) con investigación cualitativa (entrevistas con clientes, paneles de expertos, análisis de tendencias) para construir una comprensión holística del mercado.\n\nLos resultados del análisis de mercado incluyen estimaciones de dimensionamiento de mercado, análisis de segmentación, desarrollo de personas de clientes, identificación de tendencias, evaluación de barreras de entrada y puntuación de atractivo del mercado. Los analistas utilizan datos de reportes de la industria (Gartner, McKinsey, Statista), estadísticas gubernamentales, asociaciones comerciales, bases de datos financieras e investigación primaria para construir modelos de mercado.\n\nEl análisis de mercado moderno aprovecha la analítica de big data, escucha social, web scraping y detección de tendencias impulsada por IA junto con métodos tradicionales. La disciplina es esencial para la planificación de negocios, desarrollo de producto, entrada al mercado, decisiones de inversión y evaluación de M&A.',
    whyImportant: 'El análisis de mercado es un insumo crítico para cada decisión de negocio importante. Los analistas de mercado ganan $65,000-$100,000, mientras que los directores de estrategia de mercado alcanzan $130,000-$170,000. Las habilidades de análisis de mercado aparecen en más del 25% de las ofertas de estrategia, producto y desarrollo de negocios.\n\nIncluir análisis de mercado en tu currículum demuestra la capacidad de dimensionar oportunidades, entender necesidades del cliente y hacer recomendaciones estratégicas basadas en datos. Señala tanto rigor analítico como juicio empresarial, una combinación que los empleadores encuentran altamente valiosa.',
    keywords: ['currículum de análisis de mercado', 'currículum de investigación de mercado', 'habilidades de análisis de mercado', 'currículum de dimensionamiento de mercado'],
    searchIntents: ['cómo incluir análisis de mercado en el currículum', 'habilidades de análisis de mercado para negocios', 'ejemplos de currículum de investigación de mercado'],
    relatedSkills: ['Análisis Competitivo', 'Estrategia de Negocios', 'Análisis FODA', 'Modelado Financiero', 'Investigación de Mercado', 'Análisis de Datos', 'TAM/SAM/SOM', 'Segmentación de Clientes', 'Desarrollo de Negocios'],
    professionSlugs: ['analista-de-negocios', 'gerente-de-estrategia', 'consultor-de-estrategia', 'consultor-de-gestion', 'gerente-de-producto', 'director-ejecutivo'],
    atsKeywords: ['análisis de mercado', 'investigación de mercado', 'dimensionamiento de mercado', 'TAM SAM SOM', 'segmentación de mercado', 'tendencias de mercado', 'oportunidad de mercado', 'análisis de la industria', 'análisis de clientes', 'dinámicas del mercado'],
    resumeTips: [
      'Cuantifica las oportunidades de mercado que identificaste (TAM, tasa de crecimiento, potencial de ingresos).',
      'Describe los métodos de investigación utilizados (investigación primaria, análisis secundario, modelado cuantitativo).',
      'Menciona los entregables de análisis de mercado y su audiencia (junta, inversionistas, equipo ejecutivo).',
      'Destaca las decisiones que se tomaron basándose en tu análisis de mercado.',
      'Incluye fuentes de datos y herramientas analíticas utilizadas.'
    ],
    exampleBullets: [
      'Realicé análisis de mercado para 3 mercados de crecimiento potenciales, identificando una oportunidad de TAM de $2.4B que se convirtió en la estrategia de expansión principal de la empresa.',
      'Desarrollé análisis detallado de segmentación de mercado que identificó 4 segmentos de clientes desatendidos, llevando a lanzamientos de productos dirigidos que generaron $9M en ingresos del primer año.',
      'Redacté reportes de panorama de mercado para presentaciones a inversionistas que respaldaron un levantamiento de Serie C de $35M a una valoración de $280M.',
      'Ejecuté análisis de entrada al mercado para 5 mercados internacionales, recomendando un marco de priorización que enfocó recursos en 2 mercados con $600M de SAM combinado y el camino más rápido a la rentabilidad.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre análisis de mercado e investigación de mercado?', answer: 'La investigación de mercado es el proceso de recopilar datos a través de encuestas, entrevistas, grupos focales y observación. El análisis de mercado es la práctica más amplia de interpretar datos de investigación junto con datos de la industria, datos financieros e inteligencia competitiva para sacar conclusiones estratégicas. El análisis de mercado usa la investigación de mercado como un insumo entre muchos.' },
      { question: '¿Cómo muestro habilidades de análisis de mercado en mi currículum?', answer: 'Describe mercados específicos que analizaste, los métodos y fuentes de datos utilizados, los insights generados y las decisiones de negocio que tu análisis informó. Cuantifica tamaños de mercado, tasas de crecimiento y los resultados de ingresos o inversión de tus recomendaciones.' },
      { question: '¿Qué herramientas se usan para análisis de mercado?', answer: 'Statista, IBISWorld y PitchBook para datos de mercado. Tableau y Power BI para visualización. Excel y Python para modelado. Herramientas de encuestas como SurveyMonkey para investigación primaria. SEMrush y SimilarWeb para inteligencia de mercado digital. Menciona herramientas relevantes para tu metodología e industria.' }
    ]
  },
  'business-development': {
    slug: 'desarrollo-de-negocios',
    title: 'Desarrollo de Negocios',
    description: 'El desarrollo de negocios (BD) es el proceso de identificar, perseguir y asegurar oportunidades de crecimiento a través de alianzas estratégicas, nuevos mercados, nuevos clientes y nuevos productos o servicios. BD se encuentra en la intersección de ventas, marketing, estrategia y gestión de relaciones, enfocándose en la creación de valor a largo plazo en lugar de venta transaccional. Abarca generación de leads, desarrollo de alianzas, alianzas estratégicas, desarrollo de canales, expansión de mercado y estructuración de acuerdos.\n\nLos profesionales de desarrollo de negocios evalúan oportunidades de mercado, construyen redes de relaciones, crean propuestas y casos de negocio, negocian acuerdos y gestionan el pipeline de iniciativas de crecimiento. Trabajan estrechamente con el liderazgo ejecutivo para alinear las actividades de crecimiento con los objetivos estratégicos. Las actividades clave incluyen identificar socios potenciales, negociar joint ventures, desarrollar estrategias de go-to-market y gestionar cuentas estratégicas.\n\nEl BD moderno aprovecha plataformas CRM (Salesforce, HubSpot), herramientas de inteligencia de mercado, LinkedIn para construcción de relaciones y analítica de datos para puntuación de oportunidades y gestión de pipeline.',
    whyImportant: 'El desarrollo de negocios es una función crítica de ingresos que impulsa directamente el crecimiento organizacional. Los profesionales de BD ganan $75,000-$130,000 de salario base más comisiones o bonificaciones, con líderes de BD de nivel VP alcanzando $150,000-$250,000+ OTE. Las habilidades de BD aparecen en más del 35% de las ofertas orientadas al crecimiento y gestión senior.\n\nIncluir desarrollo de negocios en tu currículum señala capacidad de generación de ingresos, gestión estratégica de relaciones y pensamiento emprendedor. Es una de las habilidades más valoradas para candidatos que buscan posiciones de liderazgo donde el crecimiento es el objetivo principal.',
    keywords: ['currículum de desarrollo de negocios', 'habilidades de desarrollo de negocios', 'palabras clave de BD para currículum', 'currículum de crecimiento empresarial'],
    searchIntents: ['cómo incluir desarrollo de negocios en el currículum', 'habilidades de desarrollo de negocios para gerentes', 'ejemplos de currículum de desarrollo de negocios'],
    relatedSkills: ['Desarrollo de Alianzas', 'Planificación Estratégica', 'Ventas', 'Negociación', 'Análisis de Mercado', 'Gestión de Relaciones', 'CRM', 'Redacción de Propuestas', 'Crecimiento de Ingresos'],
    professionSlugs: ['gerente-general', 'gerente-de-ventas', 'gerente-de-estrategia', 'consultor-de-gestion', 'director-ejecutivo', 'vicepresidente', 'director-de-operaciones'],
    atsKeywords: ['desarrollo de negocios', 'BD', 'crecimiento de ingresos', 'alianzas estratégicas', 'expansión de mercado', 'desarrollo de pipeline', 'cierre de acuerdos', 'adquisición de clientes', 'desarrollo de canales', 'go-to-market', 'gestión de relaciones'],
    resumeTips: [
      'Cuantifica los ingresos generados o el pipeline construido a través de actividades de BD.',
      'Describe los tipos de alianzas y acuerdos que perseguiste (alianzas estratégicas, JVs, canales).',
      'Menciona los mercados ingresados y segmentos de clientes desarrollados.',
      'Incluye tamaños de acuerdos y tasas de cierre para demostrar efectividad.',
      'Destaca herramientas CRM y metodologías de BD utilizadas.'
    ],
    exampleBullets: [
      'Generé $18M en nuevos ingresos a través de desarrollo de negocios estratégico, construyendo alianzas con 12 clientes empresariales y expandiendo hacia 3 nuevos verticales de industria.',
      'Desarrollé y ejecuté un programa de socios de canal que reclutó 45 socios y contribuyó el 35% de los ingresos totales de la empresa en 2 años.',
      'Construí un pipeline de oportunidades calificadas de $40M a través de alcance dirigido, eventos de la industria y networking estratégico, cerrando el 28% de las oportunidades.',
      'Negocié una alianza estratégica con una empresa Fortune 500 que abrió un mercado direccionable de $25M y generó $7M en ingresos de co-venta en el primer año.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia el desarrollo de negocios de las ventas en un currículum?', answer: 'Las ventas se enfocan en cerrar acuerdos con prospectos identificados, mientras que el desarrollo de negocios se enfoca en crear nuevas oportunidades de crecimiento a través de alianzas, entrada al mercado y relaciones estratégicas. BD es más estratégico y orientado al largo plazo. Destaca los aspectos estratégicos y de alianzas para diferenciarte de las ventas puras.' },
      { question: '¿Puedo listar desarrollo de negocios sin un título de BD?', answer: 'Sí. Muchos profesionales realizan actividades de BD dentro de otros roles: identificar oportunidades de alianza, desarrollar nuevas relaciones con clientes, explorar nuevos mercados o crear estrategias de crecimiento. Describe estas actividades con lenguaje orientado a BD y cuantifica los resultados de crecimiento.' },
      { question: '¿Qué métricas importan más para desarrollo de negocios en un currículum?', answer: 'Ingresos generados, pipeline construido, alianzas aseguradas, mercados ingresados y tamaños de acuerdos son las métricas de mayor impacto. También son valiosas las tasas de conversión, tiempo de cierre, costo de adquisición de clientes y valor de vida de las relaciones desarrolladas. Enfócate en métricas que demuestren impacto en el crecimiento.' }
    ]
  },
  'partnership-development': {
    slug: 'desarrollo-de-alianzas',
    title: 'Desarrollo de Alianzas',
    description: 'El desarrollo de alianzas es el proceso estratégico de identificar, cultivar, negociar y gestionar relaciones con organizaciones externas para crear valor mutuo. Abarca alianzas estratégicas, joint ventures, alianzas de canal, alianzas tecnológicas, acuerdos de co-marketing y desarrollo de ecosistemas. El desarrollo efectivo de alianzas requiere comprender los objetivos estratégicos de ambas organizaciones y encontrar la alineación que crea un valor mayor del que cualquiera podría lograr solo.\n\nLos profesionales de alianzas evalúan socios potenciales, realizan due diligence, desarrollan planes de negocio conjuntos, negocian acuerdos de alianza y gestionan las relaciones continuas. Rastrean la salud de las alianzas a través de atribución de ingresos, KPIs conjuntos, puntuaciones de satisfacción de socios y métricas de alineación estratégica.\n\nEl surgimiento de las economías de plataforma y las estrategias de ecosistema ha elevado el desarrollo de alianzas de una función táctica a una capacidad estratégica. Empresas como Salesforce, AWS y HubSpot generan porciones significativas de su valor a través de ecosistemas de socios, haciendo de la gestión de alianzas una competencia organizacional crítica.',
    whyImportant: 'Las empresas con ecosistemas de socios fuertes crecen 2-3 veces más rápido que aquellas que dependen únicamente de modelos directos. Los profesionales de desarrollo de alianzas ganan $85,000-$130,000, con roles de nivel VP alcanzando $150,000-$200,000+. Las habilidades de alianzas aparecen en más del 20% de las ofertas de desarrollo de negocios y estrategia.\n\nIncluir desarrollo de alianzas en tu currículum señala gestión estratégica de relaciones, experiencia en negociación y la capacidad de crear valor a través de la colaboración. Te diferencia de candidatos que solo tienen experiencia en ventas directas o gestión interna.',
    keywords: ['currículum de desarrollo de alianzas', 'currículum de alianzas estratégicas', 'currículum de gestión de alianzas', 'habilidades de desarrollo de socios'],
    searchIntents: ['cómo incluir desarrollo de alianzas en el currículum', 'habilidades de desarrollo de alianzas', 'ejemplos de currículum de alianzas estratégicas'],
    relatedSkills: ['Desarrollo de Negocios', 'Negociación', 'Planificación Estratégica', 'Gestión de Contratos', 'Gestión de Relaciones', 'Estrategia de Canal', 'Crecimiento de Ingresos', 'Gestión de Alianzas'],
    professionSlugs: ['gerente-general', 'gerente-de-ventas', 'gerente-de-estrategia', 'director-ejecutivo', 'vicepresidente', 'consultor-de-gestion'],
    atsKeywords: ['desarrollo de alianzas', 'alianzas estratégicas', 'gestión de alianzas', 'ecosistema de socios', 'joint ventures', 'alianzas de canal', 'co-marketing', 'programa de socios', 'desarrollo de ecosistema', 'gestión de relaciones'],
    resumeTips: [
      'Cuantifica los ingresos generados a través de alianzas.',
      'Describe los tipos y escala de alianzas desarrolladas (estratégicas, canal, tecnología).',
      'Menciona el número de alianzas activas gestionadas.',
      'Incluye ejemplos de estructuras de alianza que negociaste.',
      'Destaca métricas de satisfacción y retención de socios.'
    ],
    exampleBullets: [
      'Desarrollé y gestioné un ecosistema de más de 60 socios tecnológicos y de canal generando $22M en ingresos anuales influenciados por socios.',
      'Negocié una alianza estratégica con un integrador de sistemas global que abrió 200 cuentas empresariales y contribuyó $8M en pipeline en 12 meses.',
      'Construí un programa de alianzas de co-marketing con 15 empresas SaaS complementarias, generando 5,000 leads calificados y $3.2M en ingresos atribuidos.',
      'Estructuré un acuerdo de joint venture con un líder de mercado en APAC, estableciendo una entidad 50/50 que logró $6M en ingresos del primer año en un nuevo mercado.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia el desarrollo de alianzas del desarrollo de negocios?', answer: 'El desarrollo de negocios es la disciplina más amplia de perseguir oportunidades de crecimiento. El desarrollo de alianzas es un subconjunto especializado enfocado específicamente en crear valor a través de relaciones organizacionales externas. En tu currículum, usa desarrollo de alianzas cuando tu experiencia sea específicamente sobre construir y gestionar relaciones con socios.' },
      { question: '¿Qué métricas de alianzas debo incluir en mi currículum?', answer: 'Ingresos generados por socios e influenciados por socios, número de alianzas activas, puntuaciones de satisfacción de socios, valor de pipeline conjunto, tasas de activación de socios e ingresos por socio son métricas clave. Muestra tanto la escala de tu portafolio de socios como el valor generado a través de las alianzas.' },
      { question: '¿El desarrollo de alianzas es relevante para roles que no son de ventas?', answer: 'Sí. Las alianzas tecnológicas, colaboraciones de investigación, construcción de coaliciones sin fines de lucro y alianzas intergubernamentales todas califican. Describe el valor creado, la gestión de relaciones involucrada y los resultados logrados. Las habilidades de desarrollo de alianzas se transfieren entre sectores.' }
    ]
  },
  'mergers-and-acquisitions': {
    slug: 'fusiones-y-adquisiciones',
    title: 'Fusiones y Adquisiciones',
    description: 'Las Fusiones y Adquisiciones (M&A) se refieren a la consolidación de empresas a través de diversas transacciones financieras incluyendo fusiones, adquisiciones, consolidaciones, ofertas públicas de adquisición, compras de activos y adquisiciones por parte de la gerencia. M&A es un mecanismo principal para el crecimiento corporativo, consolidación de mercado, adquisición de capacidades y reposicionamiento estratégico. El proceso de M&A abarca desarrollo de estrategia, identificación de objetivos, due diligence, valoración, estructuración de acuerdos, negociación, aprobación regulatoria e integración posfusión (PMI).\n\nLos profesionales de M&A construyen modelos financieros (DCF, análisis de comparables, transacciones precedentes), realizan due diligence comercial y operativo, identifican sinergias, estructuran transacciones y lideran la planificación de integración. Trabajan con equipos multifuncionales incluyendo legal, finanzas, RRHH, TI y operaciones para ejecutar transacciones complejas por valor de millones a miles de millones de dólares.\n\nEl valor global de operaciones de M&A fluctúa entre $3-5 billones anuales. La actividad de M&A es impulsada por transformación digital, consolidación de la industria, actividad de capital privado y reposicionamiento estratégico. El éxito en M&A requiere tanto experiencia en transacciones como capacidades de gestión de integración, ya que los estudios muestran que el 50-70% de las fusiones no logran alcanzar las sinergias esperadas.',
    whyImportant: 'La experiencia en M&A se encuentra entre las habilidades financieras de mayor valor. Los profesionales de banca de inversión en M&A ganan $100,000-$200,000+ a nivel de analista y asociado, mientras que los líderes de desarrollo corporativo ganan $150,000-$250,000. La experiencia en M&A es un acelerador de carrera para trayectorias en finanzas, consultoría y liderazgo ejecutivo.\n\nIncluir M&A en tu currículum señala capacidad de negociación, sofisticación financiera y la habilidad de gestionar transacciones complejas de alto riesgo. Es una credencial diferenciadora para roles de desarrollo corporativo, banca de inversión, capital privado y C-suite.',
    keywords: ['currículum de M&A', 'currículum de fusiones y adquisiciones', 'currículum de desarrollo corporativo', 'habilidades de M&A'],
    searchIntents: ['cómo incluir experiencia en M&A en el currículum', 'habilidades de fusiones y adquisiciones', 'ejemplos de currículum de M&A'],
    relatedSkills: ['Due Diligence', 'Modelado Financiero', 'Valoración', 'Gobierno Corporativo', 'Gestión del Cambio', 'Estrategia de Negocios', 'Negociación de Contratos', 'Integración Posfusión'],
    professionSlugs: ['director-financiero', 'director-ejecutivo', 'gerente-de-finanzas', 'gerente-de-estrategia', 'consultor-de-gestion', 'consultor-de-estrategia', 'vicepresidente'],
    atsKeywords: ['fusiones y adquisiciones', 'M&A', 'due diligence', 'valoración', 'ejecución de transacciones', 'integración posfusión', 'sinergia', 'transacción', 'desarrollo corporativo', 'identificación de objetivos', 'estructuración de acuerdos', 'planificación de integración'],
    resumeTips: [
      'Cuantifica el valor total de las transacciones en las que trabajaste.',
      'Describe tu rol específico en el proceso de M&A (originación, diligencia, ejecución, integración).',
      'Menciona el número y tamaño de los acuerdos cerrados.',
      'Incluye resultados de realización de sinergias para experiencia de integración.',
      'Referencia tipos de transacciones (adquisición estratégica, compra PE, fusión entre iguales, desinversión).'
    ],
    exampleBullets: [
      'Lideré due diligence y planificación de integración para una adquisición estratégica de $180M, identificando $25M en sinergias de costos y logrando integración completa en 12 meses.',
      'Ejecuté 5 adquisiciones por un total de $320M en valor de transacciones en 3 años, expandiendo la empresa a 2 nuevos mercados y agregando $45M en ingresos anuales.',
      'Gestioné la integración posfusión de una empresa adquirida de 500 personas, logrando el 105% de las sinergias objetivo de $15M en 18 meses manteniendo el 92% de retención de empleados.',
      'Desarrollé un pipeline de M&A de más de 40 objetivos potenciales usando criterios de evaluación propietarios, realizando análisis preliminar que condujo a 3 adquisiciones exitosas.'
    ],
    faqs: [
      { question: '¿Cómo listo experiencia en M&A desde un rol de asesoría vs. un rol corporativo?', answer: 'Para roles de asesoría (banca de inversión, consultoría), enfatiza el número de transacciones asesoradas, valor agregado de transacciones, sectores cubiertos y tus contribuciones analíticas. Para roles corporativos, enfócate en las transacciones ejecutadas, resultados de integración y valor estratégico creado. Ambas perspectivas son valiosas y complementarias.' },
      { question: '¿Qué habilidades de M&A son más valoradas en un currículum?', answer: 'Modelado financiero (DCF, LBO, modelos de fusión), gestión de due diligence, análisis de valoración e integración posfusión son las habilidades más buscadas. Para roles senior, la originación de transacciones, negociación y comunicación a nivel de junta son diferenciadores críticos.' },
      { question: '¿La experiencia en integración posfusión es importante?', answer: 'Extremadamente importante. Dado que la mayoría de los fracasos de M&A ocurren durante la integración, la experiencia en PMI es altamente valorada. Describe los flujos de trabajo de integración gestionados, sinergias capturadas, esfuerzos de integración cultural y resultados de retención de empleados. La experiencia en PMI puede ser más diferenciadora para la carrera que la ejecución de transacciones.' }
    ]
  },
  'due-diligence': {
    slug: 'debida-diligencia',
    title: 'Debida Diligencia',
    description: 'La debida diligencia es la investigación y análisis integral de un negocio, activo o transacción antes de comprometerse con un acuerdo. Sirve para verificar representaciones, descubrir riesgos, cuantificar valor e informar la estrategia de negociación. Los tipos de debida diligencia incluyen financiera (calidad de ingresos, capital de trabajo, análisis de deuda), comercial (posición de mercado, concentración de clientes, dinámicas competitivas), operativa (procesos, tecnología, escalabilidad), legal (contratos, litigios, PI) y de recursos humanos (personal clave, compensación, encaje cultural).\n\nLos procesos de debida diligencia involucran crear listas de solicitud de datos, revisar salas de datos virtuales, realizar entrevistas con la gerencia, analizar estados financieros, evaluar riesgos y preparar reportes de diligencia con hallazgos y recomendaciones. Los profesionales trabajan bajo plazos ajustados, típicamente 4-8 semanas, coordinando equipos multifuncionales de expertos financieros, legales y operativos.\n\nLa debida diligencia se realiza para transacciones de M&A, inversiones de capital privado, financiamiento de capital de riesgo, alianzas estratégicas, compromisos importantes con proveedores y requisitos regulatorios. La calidad de la debida diligencia impacta directamente en el precio de la transacción, protecciones contractuales y resultados posacuerdo.',
    whyImportant: 'La debida diligencia es una competencia central en desarrollo corporativo, banca de inversión, capital privado y capital de riesgo. Los profesionales de debida diligencia ganan $80,000-$140,000, con directores de desarrollo corporativo alcanzando $150,000-$200,000+. La experiencia en debida diligencia se menciona en más del 20% de las ofertas de finanzas y consultoría.\n\nIncluir debida diligencia en tu currículum demuestra rigor analítico, conciencia de riesgos y la capacidad de descubrir información crítica bajo presión de tiempo. Señala que puedes proteger el valor organizacional y tomar decisiones de inversión informadas.',
    keywords: ['currículum de debida diligencia', 'habilidades de due diligence', 'currículum de due diligence de M&A', 'debida diligencia financiera'],
    searchIntents: ['cómo incluir debida diligencia en el currículum', 'habilidades de due diligence para analistas', 'ejemplos de currículum de debida diligencia'],
    relatedSkills: ['Fusiones y Adquisiciones', 'Análisis Financiero', 'Gestión de Riesgos', 'Gestión de Contratos', 'Gestión de Cumplimiento', 'Modelado Financiero', 'Revisión Legal', 'Valoración'],
    professionSlugs: ['analista-financiero', 'gerente-de-finanzas', 'director-financiero', 'consultor-de-gestion', 'consultor-de-estrategia', 'analista-de-negocios'],
    atsKeywords: ['debida diligencia', 'due diligence financiero', 'due diligence comercial', 'due diligence operativo', 'sala de datos', 'evaluación de riesgos', 'calidad de ganancias', 'asesoría de transacciones', 'revisión de transacciones', 'investigación'],
    resumeTips: [
      'Especifica los tipos de debida diligencia realizados (financiera, comercial, operativa).',
      'Cuantifica los valores de transacción para los que realizaste diligencia.',
      'Describe hallazgos clave y su impacto en los términos del acuerdo o decisiones.',
      'Menciona el número de compromisos de debida diligencia completados.',
      'Incluye experiencia con salas de datos y plataformas de tecnología de diligencia.'
    ],
    exampleBullets: [
      'Lideré debida diligencia financiera para 8 transacciones de M&A por un total de $450M en valor de transacciones, identificando $12M en ajustes de calidad de ganancias que impactaron materialmente los precios de compra.',
      'Realicé due diligence comercial para una adquisición de $75M, descubriendo un 30% de riesgo de concentración de clientes que llevó a términos renegociados incluyendo provisiones de earnout.',
      'Gestioné due diligence operativo para una adquisición de empresa de portafolio de PE, identificando $8M en oportunidades de mejora operativa que superaron la tesis de inversión.',
      'Coordiné equipos multifuncionales de diligencia de más de 15 profesionales en flujos de trabajo financiero, legal, TI y RRHH, entregando reportes integrales de diligencia dentro de plazos de 6 semanas.'
    ],
    faqs: [
      { question: '¿Qué tipos de debida diligencia debo destacar en mi currículum?', answer: 'La debida diligencia financiera (calidad de ganancias, capital de trabajo, deuda) es la más comúnmente requerida. El due diligence comercial (mercado, clientes, posición competitiva) es valorado para roles de estrategia. El due diligence operativo, de TI y de RRHH son áreas especializadas. Destaca los tipos que se alineen con tus roles objetivo.' },
      { question: '¿Cómo demuestro habilidades de debida diligencia desde un contexto no M&A?', answer: 'La debida diligencia aplica a evaluaciones de proveedores, valoraciones de alianzas, decisiones importantes de adquisición y revisiones de cumplimiento regulatorio. Describe análisis investigativos que realizaste, riesgos que identificaste y decisiones que tus hallazgos informaron. El rigor analítico se transfiere entre contextos.' },
      { question: '¿Qué herramientas se usan para debida diligencia?', answer: 'Salas de datos virtuales (Intralinks, Datasite, Box) para revisión de documentos. Excel para análisis financiero. Bases de datos de la industria para diligencia comercial. Herramientas de gestión de proyectos para seguimiento de flujos de trabajo. Menciona herramientas relevantes para demostrar experiencia práctica con el proceso de diligencia.' }
    ]
  },
  'corporate-governance': {
    slug: 'gobierno-corporativo',
    title: 'Gobierno Corporativo',
    description: 'El gobierno corporativo es el sistema de reglas, prácticas y procesos por los cuales una empresa es dirigida y controlada. Involucra equilibrar los intereses de accionistas, gerencia, clientes, proveedores, financiadores, gobierno y la comunidad. El buen gobierno asegura responsabilidad, equidad, transparencia y responsabilidad en la relación de la organización con todos los interesados.\n\nLas estructuras clave de gobierno incluyen la junta directiva y sus comités (auditoría, compensación, nominaciones/gobierno, riesgo), estatutos corporativos, marcos de compensación ejecutiva, mecanismos de derechos de accionistas y programas de cumplimiento regulatorio. Los marcos de gobierno incluyen la Ley Sarbanes-Oxley (SOX) para empresas públicas de EE.UU., el Código de Gobierno Corporativo del Reino Unido y los Principios de Gobierno Corporativo de la OCDE.\n\nEl gobierno corporativo moderno aborda cada vez más factores ESG (Ambientales, Sociales y de Gobierno), diversidad de juntas directivas, supervisión de ciberseguridad, alineación de compensación ejecutiva y capitalismo de interesados. Las firmas asesoras de proxy como ISS y Glass Lewis influyen en las prácticas de gobierno, mientras que los inversionistas institucionales participan activamente en temas de gobierno.',
    whyImportant: 'La experiencia en gobierno corporativo es esencial para roles de nivel de junta, C-suite y secretaría corporativa. Las empresas con prácticas de gobierno sólidas superan a sus pares en un 15-20% a largo plazo. Los profesionales de gobierno corporativo ganan $90,000-$150,000, con secretarios corporativos y oficiales de gobierno alcanzando $130,000-$200,000+.\n\nIncluir gobierno corporativo en tu currículum señala conciencia de responsabilidades fiduciarias, cumplimiento regulatorio y gestión de interesados al más alto nivel organizacional. Es una habilidad diferenciadora para ejecutivos que buscan posiciones en juntas directivas o roles de liderazgo corporativo.',
    keywords: ['currículum de gobierno corporativo', 'habilidades de gobierno', 'currículum de gobierno de junta', 'experiencia en gobierno corporativo'],
    searchIntents: ['cómo incluir gobierno corporativo en el currículum', 'habilidades de gobierno corporativo para ejecutivos', 'ejemplos de currículum de gobierno'],
    relatedSkills: ['Gestión de Cumplimiento', 'Cumplimiento Regulatorio', 'Gestión de Riesgos', 'Relaciones con la Junta', 'ESG', 'Auditoría', 'Cumplimiento SOX', 'Ética'],
    professionSlugs: ['director-ejecutivo', 'director-financiero', 'director-de-operaciones', 'vicepresidente', 'director-de-organizacion-sin-fines-de-lucro', 'gerente-general'],
    atsKeywords: ['gobierno corporativo', 'junta directiva', 'marco de gobierno', 'deber fiduciario', 'SOX', 'Sarbanes-Oxley', 'ESG', 'relaciones con accionistas', 'gobierno de junta', 'secretario corporativo', 'cumplimiento regulatorio', 'comité de auditoría'],
    resumeTips: [
      'Describe marcos de gobierno que implementaste o gestionaste.',
      'Menciona participación en comités de junta y responsabilidades de reporte.',
      'Incluye experiencia de cumplimiento SOX u otro gobierno regulatorio.',
      'Destaca iniciativas de gobierno ESG y resultados.',
      'Referencia certificaciones o educación continua en gobierno.'
    ],
    exampleBullets: [
      'Establecí un marco de gobierno corporativo para una empresa recién cotizada, asegurando el cumplimiento de SOX y creando estatutos de comités de junta que pasaron la revisión de auditoría Big 4.',
      'Gestioné los procesos de gobierno de junta para una empresa de $500M incluyendo reuniones trimestrales de junta, asambleas generales anuales y preparación de declaraciones de proxy.',
      'Implementé un programa de gobierno ESG que logró una mejora de 35 puntos en la puntuación de gobierno ISS y atrajo $50M en inversión institucional enfocada en ESG.',
      'Asesoré a la junta sobre mejores prácticas de gobierno durante una fusión de $200M, asegurando procesos fiduciarios adecuados y logrando aprobación unánime de la junta.'
    ],
    faqs: [
      { question: '¿La experiencia en gobierno corporativo es relevante para roles no ejecutivos?', answer: 'Sí, el gobierno se extiende más allá de la sala de juntas. Los oficiales de cumplimiento, auditores internos, paralegales corporativos y profesionales de relaciones con inversionistas todos trabajan dentro de marcos de gobierno. Describe tus contribuciones a los procesos de gobierno, programas de cumplimiento o funciones de apoyo a la junta.' },
      { question: '¿Qué certificaciones de gobierno existen?', answer: 'El Governance Institute ofrece la GPC (Governance Professional Certification). La Society for Corporate Governance proporciona programas educativos. NACD (National Association of Corporate Directors) ofrece certificaciones para directores. Estas son más valiosas para roles de secretaría corporativa, cumplimiento y nivel de junta.' },
      { question: '¿Qué tan importante es el gobierno ESG en los currículums actuales?', answer: 'Cada vez más importante. Los inversionistas, reguladores y consumidores demandan transparencia ESG. La experiencia con marcos de reportes ESG (GRI, SASB, TCFD), gobierno de sostenibilidad y participación de interesados en temas ESG es un diferenciador significativo para roles senior.' }
    ]
  },
  'compliance-management': {
    slug: 'gestion-de-cumplimiento',
    title: 'Gestión de Cumplimiento',
    description: 'La gestión de cumplimiento es el proceso de asegurar que una organización cumpla con las leyes, regulaciones, estándares y políticas internas relevantes. Involucra identificar requisitos aplicables, implementar controles, monitorear la adherencia, gestionar violaciones y mantener documentación. La gestión de cumplimiento abarca cumplimiento regulatorio (regulaciones específicas de la industria), cumplimiento corporativo (políticas internas y ética) y cumplimiento de datos (privacidad y seguridad de la información).\n\nLos sistemas de gestión de cumplimiento incluyen evaluaciones de riesgo, desarrollo de políticas, programas de capacitación, monitoreo y pruebas, mecanismos de reporte (líneas de denuncia, gestión de casos) y procesos de remediación. El modelo de tres líneas de defensa posiciona las operaciones de negocio como la primera línea, las funciones de cumplimiento y riesgo como la segunda línea y la auditoría interna como la tercera línea.\n\nLos requisitos de cumplimiento han crecido significativamente con regulaciones como GDPR, CCPA, SOX, HIPAA, AML/KYC y marcos específicos de la industria. Las soluciones tecnológicas incluyendo plataformas GRC (Gobierno, Riesgo y Cumplimiento) como ServiceNow, SAI Global y NAVEX ayudan a las organizaciones a gestionar panoramas de cumplimiento cada vez más complejos.',
    whyImportant: 'Las sanciones por incumplimiento pueden alcanzar miles de millones de dólares, haciendo del cumplimiento una función de negocio crítica. Los oficiales de cumplimiento ganan $80,000-$130,000, con Directores de Cumplimiento alcanzando $170,000-$300,000+. Las habilidades de cumplimiento aparecen en más del 25% de las ofertas de finanzas, salud e industrias reguladas.\n\nIncluir gestión de cumplimiento en tu currículum demuestra atención al detalle, conciencia de riesgos y la capacidad de navegar entornos regulatorios complejos. Es esencial para roles en servicios financieros, salud, farmacéutica, energía y cualquier industria altamente regulada.',
    keywords: ['currículum de gestión de cumplimiento', 'habilidades de cumplimiento para currículum', 'currículum de cumplimiento regulatorio', 'currículum de oficial de cumplimiento'],
    searchIntents: ['cómo incluir gestión de cumplimiento en el currículum', 'habilidades de cumplimiento para gerentes', 'ejemplos de currículum de gestión de cumplimiento'],
    relatedSkills: ['Cumplimiento Regulatorio', 'Gestión de Riesgos', 'Gobierno Corporativo', 'Auditoría', 'Desarrollo de Políticas', 'GDPR', 'SOX', 'AML/KYC', 'Controles Internos'],
    professionSlugs: ['director-financiero', 'gerente-de-finanzas', 'gerente-de-operaciones', 'gerente-general', 'director-de-operaciones', 'contador'],
    atsKeywords: ['gestión de cumplimiento', 'cumplimiento regulatorio', 'programa de cumplimiento', 'controles internos', 'gestión de políticas', 'GRC', 'auditoría', 'evaluación de riesgos', 'monitoreo de cumplimiento', 'ética', 'SOX', 'GDPR'],
    resumeTips: [
      'Especifica las regulaciones y estándares para los que has gestionado cumplimiento.',
      'Describe programas de cumplimiento que construiste o mejoraste.',
      'Cuantifica resultados de cumplimiento (tasas de aprobación, reducción de violaciones, sanciones evitadas).',
      'Menciona herramientas GRC y tecnología de cumplimiento utilizadas.',
      'Incluye certificaciones relevantes (CCEP, CRCM, CAMS, CFE).'
    ],
    exampleBullets: [
      'Construí un programa de cumplimiento empresarial cubriendo 15 marcos regulatorios, logrando cero hallazgos materiales en 3 exámenes regulatorios consecutivos.',
      'Implementé programa de cumplimiento GDPR para una organización global que procesa 5M de registros de clientes, completando la preparación en 8 meses y pasando la auditoría externa con cero hallazgos.',
      'Reduje las violaciones de cumplimiento en un 78% mediante un programa de capacitación rediseñado que alcanzó a 3,500 empleados, simplificación de políticas y controles de monitoreo automatizados.',
      'Desplegué plataforma GRC (ServiceNow) que centralizó la gestión de cumplimiento en 6 unidades de negocio, reduciendo el tiempo de evaluación de cumplimiento en un 55% y mejorando la visibilidad para el liderazgo.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de cumplimiento son más valoradas?', answer: 'CCEP (Certified Compliance and Ethics Professional) de SCCE es la más amplia. CRCM (Certified Regulatory Compliance Manager) es valorada en banca. CAMS (Certified Anti-Money Laundering Specialist) es esencial para roles AML. CFE (Certified Fraud Examiner) agrega valor para roles de investigación de cumplimiento.' },
      { question: '¿Cómo demuestro experiencia en cumplimiento sin un título de cumplimiento?', answer: 'Muchos roles involucran actividades de cumplimiento: asegurar cumplimiento SOX como controller, mantener cumplimiento HIPAA en operaciones de salud, implementar políticas de privacidad de datos como gerente de TI o gestionar presentaciones regulatorias como profesional de finanzas. Describe las regulaciones específicas gestionadas y los resultados logrados.' },
      { question: '¿La gestión de cumplimiento es un campo en crecimiento?', answer: 'Sí, la complejidad regulatoria está aumentando globalmente. Las nuevas regulaciones sobre IA, ESG, privacidad de datos y criptomonedas están creando demanda de profesionales de cumplimiento. El campo se está expandiendo más allá de las finanzas tradicionales hacia tecnología, salud y cada sector que enfrenta escrutinio regulatorio.' }
    ]
  },
  'regulatory-compliance': {
    slug: 'cumplimiento-regulatorio',
    title: 'Cumplimiento Regulatorio',
    description: 'El cumplimiento regulatorio es la adherencia a leyes, regulaciones, directrices y especificaciones relevantes para el negocio de una organización. A diferencia de la gestión de cumplimiento más amplia, el cumplimiento regulatorio aborda específicamente los requisitos impuestos por agencias gubernamentales, reguladores de la industria y organismos estatutarios. Involucra interpretar regulaciones, implementar controles requeridos, mantener documentación, prepararse para exámenes regulatorios y gestionar relaciones regulatorias.\n\nLos marcos regulatorios clave incluyen SOX (reportes financieros), HIPAA (privacidad de salud), regulaciones de FDA (farmacéutica y dispositivos médicos), FINRA/SEC (valores), PCI DSS (tarjetas de pago), EPA (ambiental), OSHA (seguridad laboral) y GDPR/CCPA (privacidad de datos). Cada industria tiene su propio panorama regulatorio que requiere conocimiento especializado.\n\nLos profesionales de cumplimiento regulatorio monitorean cambios regulatorios, realizan evaluaciones de impacto, actualizan políticas y procedimientos, presentan reportes requeridos, se preparan para exámenes, gestionan hallazgos regulatorios y sirven como expertos en materia regulatoria. Frecuentemente sirven como la interfaz principal entre la organización y los organismos reguladores.',
    whyImportant: 'Las sanciones regulatorias han alcanzado niveles récord, con multas individuales que superan los $1,000 millones en servicios financieros. Los profesionales de cumplimiento regulatorio ganan $75,000-$125,000, con directores senior de cumplimiento alcanzando $140,000-$190,000. El cumplimiento regulatorio se lista en más del 30% de las ofertas de empleo en salud, servicios financieros y farmacéutica.\n\nIncluir cumplimiento regulatorio en tu currículum demuestra conocimiento especializado sin el cual las organizaciones no pueden operar. Señala la capacidad de navegar entornos regulatorios complejos y proteger a la organización del riesgo legal y financiero.',
    keywords: ['currículum de cumplimiento regulatorio', 'habilidades de cumplimiento regulatorio', 'currículum de analista de cumplimiento', 'currículum de asuntos regulatorios'],
    searchIntents: ['cómo incluir cumplimiento regulatorio en el currículum', 'habilidades de cumplimiento regulatorio para profesionales', 'ejemplos de currículum de cumplimiento regulatorio'],
    relatedSkills: ['Gestión de Cumplimiento', 'Gestión de Riesgos', 'Auditoría', 'Gobierno Corporativo', 'Desarrollo de Políticas', 'Gestión de Calidad', 'Controles Internos', 'Reportes Regulatorios'],
    professionSlugs: ['director-financiero', 'gerente-de-finanzas', 'gerente-de-operaciones', 'contador', 'director-de-operaciones', 'gerente-general'],
    atsKeywords: ['cumplimiento regulatorio', 'requisitos regulatorios', 'examen regulatorio', 'SOX', 'HIPAA', 'GDPR', 'FDA', 'FINRA', 'reportes regulatorios', 'asuntos regulatorios', 'auditoría de cumplimiento', 'marco regulatorio'],
    resumeTips: [
      'Lista las regulaciones específicas en las que tienes experiencia (SOX, HIPAA, GDPR, FDA, etc.).',
      'Describe los resultados de exámenes regulatorios y tu historial.',
      'Cuantifica mejoras de cumplimiento y evitación de sanciones.',
      'Menciona las relaciones regulatorias que gestionaste.',
      'Incluye certificaciones regulatorias específicas de la industria.'
    ],
    exampleBullets: [
      'Gestioné cumplimiento regulatorio en SOX, GDPR y PCI DSS para una empresa fintech cotizada en bolsa, manteniendo cero hallazgos regulatorios en 4 ciclos de auditoría anuales.',
      'Preparé y navegué exitosamente 3 exámenes FINRA sin hallazgos materiales, manteniendo el historial regulatorio limpio de la firma y $2M en evitación potencial de multas.',
      'Implementé un proceso de gestión de cambios regulatorios monitoreando más de 200 fuentes regulatorias, asegurando que la organización se adaptara a 45 cambios regulatorios sin brechas de cumplimiento.',
      'Lideré la preparación de cumplimiento FDA para una startup de dispositivos médicos, logrando la autorización 510(k) en 14 meses y habilitando el lanzamiento de producto de $8M.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia el cumplimiento regulatorio del cumplimiento general en un currículum?', answer: 'El cumplimiento regulatorio aborda específicamente regulaciones gubernamentales e industriales con consecuencias legales por incumplimiento. El cumplimiento general también incluye políticas internas, estándares éticos y marcos voluntarios. Destaca el cumplimiento regulatorio al postularte a industrias altamente reguladas donde se requiere experiencia regulatoria específica.' },
      { question: '¿Debo listar regulaciones específicas en mi currículum?', answer: 'Sí, absolutamente. El conocimiento regulatorio específico (SOX, HIPAA, GDPR, FDA, etc.) es un criterio de búsqueda principal para roles de cumplimiento. Lista las regulaciones con las que tienes experiencia práctica, ya que los sistemas ATS buscan específicamente estas palabras clave regulatorias.' },
      { question: '¿Cómo se transfieren las habilidades de cumplimiento regulatorio entre industrias?', answer: 'Muchos principios de cumplimiento son transferibles: evaluación de riesgos, desarrollo de políticas, monitoreo y preparación de auditorías aplican en todas partes. Sin embargo, el conocimiento regulatorio específico depende de la industria. Al hacer la transición, enfatiza las habilidades universales de cumplimiento mientras notas cualquier regulación superpuesta entre industrias.' }
    ]
  },
  'enterprise-resource-planning': {
    slug: 'planificacion-de-recursos-empresariales',
    title: 'Planificación de Recursos Empresariales',
    description: 'Los sistemas de Planificación de Recursos Empresariales (ERP) son plataformas de software integradas que gestionan y automatizan procesos de negocio centrales en finanzas, adquisiciones, cadena de suministro, manufactura, RRHH y gestión de clientes. Las plataformas ERP líderes incluyen SAP S/4HANA, Oracle Cloud ERP, Microsoft Dynamics 365, Workday y NetSuite. Los sistemas ERP proporcionan una fuente única de verdad al centralizar datos de múltiples funciones de negocio en una base de datos unificada.\n\nLa implementación de ERP involucra análisis de procesos de negocio, configuración del sistema, migración de datos, integración con sistemas existentes, capacitación de usuarios, pruebas y soporte de puesta en marcha. Las implementaciones van desde 6 meses para despliegues SaaS basados en la nube para PYMES hasta 2-5 años para instalaciones on-premise o híbridas de grandes empresas. Las metodologías clave de implementación incluyen SAP Activate, Oracle Unified Method y Microsoft Sure Step.\n\nEl ERP moderno ha migrado a modelos SaaS basados en la nube con capacidades integradas de IA, machine learning y analítica. Los sistemas ERP sirven como la columna vertebral operativa de las organizaciones, procesando millones de transacciones diariamente y proporcionando la base de datos para inteligencia de negocios, reportes y toma de decisiones.',
    whyImportant: 'El mercado global de ERP supera los $50,000 millones anuales, y las habilidades de ERP se encuentran entre las competencias de tecnología empresarial de mayor demanda. Los consultores de ERP ganan $90,000-$150,000, con profesionales certificados en SAP alcanzando primas del 20-30%. La experiencia en ERP aparece en más del 25% de las ofertas de operaciones, finanzas y gestión de TI.\n\nIncluir ERP en tu currículum demuestra la capacidad de trabajar con sistemas a escala empresarial y comprender procesos de negocio integrados. Es especialmente valioso porque las implementaciones de ERP son proyectos de alto riesgo con impacto organizacional significativo.',
    keywords: ['currículum de ERP', 'habilidades de ERP para currículum', 'currículum de SAP', 'currículum de planificación de recursos empresariales'],
    searchIntents: ['cómo incluir ERP en el currículum', 'habilidades de ERP para gerentes', 'ejemplos de currículum de implementación de ERP'],
    relatedSkills: ['SAP', 'Oracle ERP', 'Microsoft Dynamics', 'Análisis de Procesos de Negocio', 'Migración de Datos', 'Integración de Sistemas', 'Gestión de Proyectos', 'Gestión del Cambio', 'Sistemas Financieros'],
    professionSlugs: ['gerente-de-ti', 'gerente-de-operaciones', 'gerente-de-finanzas', 'gerente-de-proyectos', 'consultor-de-gestion', 'director-de-tecnologia', 'director-de-operaciones'],
    atsKeywords: ['ERP', 'planificación de recursos empresariales', 'SAP', 'Oracle ERP', 'Microsoft Dynamics', 'NetSuite', 'Workday', 'implementación de ERP', 'integración de sistemas', 'migración de datos', 'procesos de negocio', 'puesta en marcha'],
    resumeTips: [
      'Especifica qué plataformas ERP tienes experiencia (SAP, Oracle, Dynamics, NetSuite).',
      'Describe tu rol en implementaciones de ERP (líder de proyecto, consultor funcional, arquitecto técnico).',
      'Cuantifica el alcance de la implementación (módulos, usuarios, ubicaciones, presupuesto).',
      'Incluye certificaciones de ERP relevantes para tu plataforma.',
      'Destaca las mejoras de procesos de negocio habilitadas por el sistema ERP.'
    ],
    exampleBullets: [
      'Lideré implementación de SAP S/4HANA para un fabricante de $500M, migrando 8 módulos y 2,500 usuarios en 4 ubicaciones dentro de 18 meses y dentro del presupuesto.',
      'Gestioné despliegue de Oracle Cloud ERP para módulos de finanzas y adquisiciones, reduciendo el cierre de fin de mes de 12 días a 4 días y mejorando la precisión de reportes en un 40%.',
      'Supervisé la migración de datos de 15M de registros de 3 sistemas legados a Microsoft Dynamics 365, logrando 99.8% de precisión de datos y cero interrupción del negocio durante la transición.',
      'Implementé NetSuite ERP para una empresa de 200 personas, integrando CRM, finanzas y gestión de inventario en una sola plataforma que eliminó 5 sistemas independientes.'
    ],
    faqs: [
      { question: '¿Qué plataforma ERP debo aprender para mi currículum?', answer: 'SAP es el líder de mercado para grandes empresas. Oracle Cloud ERP es fuerte en finanzas y cadena de suministro. Microsoft Dynamics 365 tiene adopción creciente en el mercado medio. NetSuite domina el mercado de PYMES. Elige según el tamaño de empresa e industria que te interesa. La experiencia en SAP tiene la aplicabilidad más amplia.' },
      { question: '¿Cómo listo experiencia en ERP sin ser consultor de ERP?', answer: 'Muchos profesionales usan sistemas ERP como usuarios finales o propietarios de procesos. Describe qué módulos de ERP utilizaste, reportes que generaste, procesos que gestionaste dentro del sistema o implementaciones en las que participaste. La experiencia de lado de negocio con ERP es tan valiosa como las habilidades técnicas de ERP para muchos roles.' },
      { question: '¿Valen la pena las certificaciones de ERP?', answer: 'Sí, especialmente para roles de consultoría. Las certificaciones de SAP, Oracle y Microsoft validan experiencia específica en la plataforma y son requeridas por muchas firmas de consultoría. Típicamente aumentan el potencial de ganancias en un 15-25% y mejoran significativamente la comerciabilidad laboral.' }
    ]
  },
  'business-continuity-planning': {
    slug: 'planificacion-de-continuidad-de-negocio',
    title: 'Planificación de Continuidad del Negocio',
    description: 'La Planificación de Continuidad del Negocio (BCP) es el proceso de crear sistemas de prevención y recuperación para hacer frente a amenazas potenciales a una empresa. Asegura que el personal y los activos estén protegidos y sean capaces de funcionar en caso de un desastre. BCP abarca análisis de impacto al negocio (BIA), desarrollo de estrategia de recuperación, desarrollo de planes, pruebas y mantenimiento. El estándar ISO 22301 proporciona un marco internacional para sistemas de gestión de continuidad del negocio.\n\nBCP identifica funciones críticas del negocio, define objetivos de tiempo de recuperación (RTO) y objetivos de punto de recuperación (RPO), desarrolla estrategias de recuperación, crea procedimientos detallados de recuperación y establece planes de comunicación. Los planes abordan escenarios incluyendo desastres naturales, ciberataques, brotes pandémicos, disrupciones en la cadena de suministro, fallas de infraestructura e incidentes laborales.\n\nLa disciplina ha evolucionado significativamente, impulsada por eventos como COVID-19, ataques de ransomware importantes y desastres relacionados con el clima. El BCP moderno se integra con recuperación de desastres de TI, respuesta a incidentes de ciberseguridad, comunicaciones de crisis y gestión de riesgos de cadena de suministro para proporcionar resiliencia organizacional holística.',
    whyImportant: 'Las organizaciones sin planes de continuidad del negocio tienen un 43% de probabilidad de no reabrir nunca después de un desastre mayor. Los profesionales de BCP ganan $80,000-$130,000, con directores de resiliencia empresarial alcanzando $140,000-$180,000. Las habilidades de BCP aparecen en más del 15% de las ofertas de operaciones, riesgo y gestión de TI y están creciendo rápidamente.\n\nIncluir BCP en tu currículum demuestra previsión, capacidad de gestión de riesgos y habilidades de planificación de resiliencia organizacional. Es especialmente valorado después de que COVID-19 demostró que toda organización necesita una planificación de continuidad robusta.',
    keywords: ['currículum de planificación de continuidad del negocio', 'habilidades de BCP para currículum', 'currículum de recuperación de desastres', 'currículum de continuidad del negocio'],
    searchIntents: ['cómo incluir continuidad del negocio en el currículum', 'habilidades de BCP para gerentes', 'ejemplos de currículum de planificación de continuidad del negocio'],
    relatedSkills: ['Gestión de Crisis', 'Gestión de Riesgos', 'Recuperación de Desastres', 'ISO 22301', 'Respuesta a Incidentes', 'Gestión de Emergencias', 'Recuperación de Desastres de TI', 'Gestión de Riesgos de Cadena de Suministro'],
    professionSlugs: ['gerente-de-operaciones', 'gerente-de-ti', 'director-de-operaciones', 'director-de-tecnologia', 'director-de-operaciones', 'gerente-general'],
    atsKeywords: ['planificación de continuidad del negocio', 'BCP', 'recuperación de desastres', 'análisis de impacto al negocio', 'BIA', 'objetivo de tiempo de recuperación', 'RTO', 'RPO', 'ISO 22301', 'resiliencia empresarial', 'plan de continuidad', 'planificación de crisis'],
    resumeTips: [
      'Describe el alcance de los programas de BCP que desarrollaste o gestionaste.',
      'Menciona la metodología y resultados del BIA.',
      'Incluye frecuencia de pruebas y resultados.',
      'Referencia ISO 22301 u otros marcos implementados.',
      'Destaca activaciones reales y sus resultados.'
    ],
    exampleBullets: [
      'Desarrollé un plan de continuidad del negocio empresarial cubriendo 45 funciones críticas, logrando la certificación ISO 22301 y asegurando cero interrupción operativa durante 3 activaciones por incidentes.',
      'Realicé análisis de impacto al negocio en 8 unidades de negocio identificando 22 procesos críticos con RTO menor a 4 horas, estableciendo estrategias de recuperación para cada uno.',
      'Lideré la respuesta BCP a COVID-19 que transicionó a 2,000 empleados al trabajo remoto en 72 horas manteniendo el 98% de capacidad operativa.',
      'Diseñé y ejecuté ejercicios de mesa de BCP semestrales involucrando a más de 50 participantes desde niveles ejecutivos hasta operativos, logrando una puntuación de preparación del plan del 95%.'
    ],
    faqs: [
      { question: '¿Qué certificaciones de BCP debo obtener?', answer: 'CBCP (Certified Business Continuity Professional) de DRI International es el estándar de oro. MBCI del Business Continuity Institute es el equivalente internacional. La certificación de Implementador Líder ISO 22301 valida experiencia en el marco. Estas certificaciones mejoran significativamente la credibilidad para roles dedicados de BCP.' },
      { question: '¿Cómo se diferencia BCP de la recuperación de desastres?', answer: 'La recuperación de desastres (DR) se enfoca específicamente en restaurar sistemas y datos de TI después de una interrupción. BCP es más amplio, cubriendo todas las funciones de negocio incluyendo personas, procesos, instalaciones y tecnología. DR es un componente de BCP. En tu currículum, lista ambos si tienes experiencia con cada uno.' },
      { question: '¿La experiencia en BCP es relevante para roles fuera de gestión de riesgos?', answer: 'Sí. Los jefes de departamento que desarrollaron planes de continuidad para sus funciones, los gerentes de TI que construyeron capacidades de DR y los gerentes de operaciones que gestionaron a través de interrupciones todos tienen experiencia en BCP. Describe los planes que creaste, probaste o activaste y los resultados logrados.' }
    ]
  },
  'crisis-management': {
    slug: 'gestion-de-crisis',
    title: 'Gestión de Crisis',
    description: 'La gestión de crisis es el proceso de prepararse, responder y recuperarse de eventos que amenazan con dañar a una organización, sus interesados o el público en general. Abarca prevención de crisis, preparación (planes y capacitación), respuesta (gestión de incidentes y comunicación) y recuperación (restauración del negocio y lecciones aprendidas). Las crisis pueden incluir retiros de productos, brechas de datos, desastres naturales, violencia laboral, mala conducta ejecutiva, irregularidades financieras y emergencias de relaciones públicas.\n\nLa gestión efectiva de crisis requiere establecer un equipo de gestión de crisis, desarrollar planes de respuesta, crear protocolos de comunicación, realizar capacitación y simulaciones regulares, y construir resiliencia organizacional. El componente de comunicación de crisis aborda relaciones con medios, notificaciones a interesados, gestión de redes sociales y protección de reputación.\n\nLa gestión moderna de crisis se ha expandido para abordar crisis digitales (tormentas en redes sociales, ciberataques), disrupciones en la cadena de suministro y riesgos geopolíticos. Las organizaciones reconocen cada vez más que la capacidad de gestión de crisis no se trata solo de control de daños sino de construir confianza a través de una respuesta transparente, rápida y empática.',
    whyImportant: 'Las organizaciones que manejan bien las crisis pueden realmente fortalecer la confianza de los interesados, mientras que una mala gestión de crisis puede destruir miles de millones en valor. Los profesionales de gestión de crisis ganan $90,000-$140,000, con Directores de Crisis y asesores senior alcanzando $150,000-$250,000. La experiencia en gestión de crisis es valorada en roles de relaciones públicas, operaciones, riesgo y liderazgo ejecutivo.\n\nIncluir gestión de crisis en tu currículum demuestra compostura bajo presión, liderazgo decisivo y la capacidad de proteger el valor organizacional durante momentos críticos. Es una habilidad altamente valorada que distingue a los líderes que pueden rendir cuando las apuestas son más altas.',
    keywords: ['currículum de gestión de crisis', 'habilidades de gestión de crisis', 'currículum de liderazgo en crisis', 'currículum de gestión de emergencias'],
    searchIntents: ['cómo incluir gestión de crisis en el currículum', 'habilidades de gestión de crisis para líderes', 'ejemplos de currículum de gestión de crisis'],
    relatedSkills: ['Planificación de Continuidad del Negocio', 'Gestión de Riesgos', 'Comunicación', 'Liderazgo', 'Gestión de Interesados', 'Toma de Decisiones', 'Relaciones con Medios', 'Respuesta a Incidentes'],
    professionSlugs: ['director-ejecutivo', 'director-de-operaciones', 'gerente-de-operaciones', 'gerente-general', 'director-de-operaciones', 'gerente-de-recursos-humanos', 'vicepresidente'],
    atsKeywords: ['gestión de crisis', 'respuesta a crisis', 'comunicación de crisis', 'gestión de incidentes', 'gestión de emergencias', 'liderazgo en crisis', 'gestión de reputación', 'planificación de crisis', 'equipo de crisis', 'respuesta a desastres'],
    resumeTips: [
      'Describe crisis que gestionaste y sus resultados de resolución.',
      'Destaca medidas de prevención de crisis que implementaste.',
      'Menciona planes de comunicación de crisis y experiencia en gestión de medios.',
      'Incluye capacitaciones de crisis y ejercicios de simulación que condujiste.',
      'Cuantifica el valor protegido o el daño minimizado a través de tu respuesta a crisis.'
    ],
    exampleBullets: [
      'Lideré la respuesta a una brecha de datos importante que afectó a 500,000 clientes, coordinando remediación de TI, cumplimiento legal y comunicación con clientes que mantuvo el 85% de retención de clientes.',
      'Desarrollé un marco integral de gestión de crisis con 12 guías específicas por escenario, capacitando a más de 200 líderes y logrando activación de respuesta en 30 minutos en incidentes reales.',
      'Gestioné una crisis de relaciones públicas que amenazaba una relación con un cliente de $50M, implementando comunicaciones de respuesta rápida que preservaron la alianza y aseguraron una renovación de contrato por 3 años.',
      'Dirigí la respuesta de crisis a COVID-19 para una organización de 3,000 personas, tomando decisiones diarias sobre seguridad de la fuerza laboral, continuidad operativa y gestión financiera que preservaron el 95% de los ingresos.'
    ],
    faqs: [
      { question: '¿Cómo demuestro habilidades de gestión de crisis sin haber enfrentado una crisis mayor?', answer: 'Describe actividades de preparación para crisis: planes desarrollados, simulaciones conducidas, programas de capacitación creados y evaluaciones de riesgo completadas. También incluye gestión de incidentes a menor escala como manejo de escalamientos de clientes, gestión de disrupciones operativas o liderazgo a través de cambios organizacionales.' },
      { question: '¿Qué capacitación en gestión de crisis debo listar?', answer: 'La capacitación ICS (Incident Command System) es valorada en operaciones. Los cursos de Gestión de Emergencias de FEMA son relevantes para crisis físicas. Las certificaciones de comunicación de crisis de PRSA o IABC son valoradas para roles de PR. Describe cualquier experiencia de facilitación de simulaciones o ejercicios de mesa.' },
      { question: '¿La gestión de crisis es una habilidad de liderazgo o técnica?', answer: 'Es principalmente una habilidad de liderazgo que requiere toma de decisiones decisiva, comunicación clara, inteligencia emocional y la capacidad de funcionar bajo presión extrema. Los elementos técnicos incluyen metodología de planificación de crisis, protocolos de comunicación y sistemas de comando de incidentes. Preséntala como una competencia de liderazgo respaldada por metodología estructurada.' }
    ]
  },
  'organizational-design': {
    slug: 'diseno-organizacional',
    title: 'Diseño Organizacional',
    description: 'El diseño organizacional es el proceso de alinear la estructura, procesos, roles y cultura de una organización con sus objetivos estratégicos. Determina cómo se divide, agrupa y coordina el trabajo para lograr eficiencia y efectividad. Las dimensiones clave de diseño incluyen estructura organizacional (funcional, divisional, matricial, red), relaciones de reporte, derechos de decisión, mecanismos de coordinación y marcos de gobernanza.\n\nLos profesionales de diseño organizacional utilizan marcos como el Modelo Estrella de Galbraith (estrategia, estructura, procesos, recompensas, personas), el Marco 7-S de McKinsey y el Modelo de Sistema Viable para analizar y rediseñar organizaciones. El proceso involucra evaluar el estado actual, definir criterios de diseño, desarrollar opciones, seleccionar y detallar el diseño, y planificar la transición.\n\nEl diseño organizacional moderno aborda estructuras de organización ágil, equipos autogestionados, organizaciones en red, organizaciones de plataforma y modelos de trabajo híbrido. La reestructuración de la fuerza laboral pospandemia ha creado una demanda sin precedentes de experiencia en diseño organizacional a medida que las empresas reimaginan cómo se realiza el trabajo.',
    whyImportant: 'El diseño organizacional determina cuán efectivamente una empresa puede ejecutar su estrategia. Los consultores de OD ganan $100,000-$160,000, con directores senior de OD alcanzando $150,000-$200,000+. Las habilidades de diseño organizacional aparecen en más del 15% de las ofertas de RRHH, estrategia y consultoría.\n\nIncluir diseño organizacional en tu currículum señala pensamiento estratégico sobre cómo funcionan las organizaciones y la capacidad de alinear la estructura con la estrategia. Es una habilidad de alto valor para roles de liderazgo donde la efectividad organizacional impacta directamente los resultados del negocio.',
    keywords: ['currículum de diseño organizacional', 'habilidades de diseño org', 'currículum de estructura organizacional', 'experiencia en diseño de organización'],
    searchIntents: ['cómo incluir diseño organizacional en el currículum', 'habilidades de diseño organizacional para líderes', 'ejemplos de currículum de diseño org'],
    relatedSkills: ['Gestión del Cambio', 'Planificación de Fuerza Laboral', 'Planificación Estratégica', 'Gestión de Talento', 'Mejora de Procesos', 'Desarrollo de Liderazgo', 'Estrategia de RRHH', 'Diseño de Modelo Operativo'],
    professionSlugs: ['gerente-de-recursos-humanos', 'consultor-de-gestion', 'consultor-de-estrategia', 'director-de-operaciones', 'director-ejecutivo', 'vicepresidente', 'director-de-operaciones'],
    atsKeywords: ['diseño organizacional', 'diseño org', 'estructura organizacional', 'modelo operativo', 'reestructuración', 'efectividad organizacional', 'tramo de control', 'diseño de roles', 'modelo de gobernanza', 'organización matricial'],
    resumeTips: [
      'Describe la escala y alcance de los diseños organizacionales que desarrollaste.',
      'Cuantifica resultados como mejora de eficiencia, reducción de niveles o mejor velocidad de decisión.',
      'Menciona marcos de OD utilizados (Modelo Estrella, 7-S, McKinsey).',
      'Destaca los componentes de gestión del cambio y planificación de transición.',
      'Incluye los impulsores de negocio que motivaron el rediseño organizacional.'
    ],
    exampleBullets: [
      'Rediseñé la estructura organizacional para una división de 2,000 personas, reduciendo los niveles de gestión de 7 a 4 y mejorando la velocidad de toma de decisiones en un 60%.',
      'Lideré la transformación del modelo operativo de silos funcionales a equipos multifuncionales de producto, aumentando la velocidad de entrega de producto en un 45% y reduciendo el tiempo de lanzamiento en 3 meses.',
      'Diseñé una organización matricial para una entidad recién fusionada integrando 800 roles en 2 empresas, logrando 95% de colocación de roles y manteniendo continuidad operativa.',
      'Realicé evaluación de efectividad organizacional identificando $8M en ineficiencia estructural, recomendando e implementando cambios que redujeron los gastos generales en un 22%.'
    ],
    faqs: [
      { question: '¿El diseño organizacional es lo mismo que la reestructuración?', answer: 'La reestructuración es un resultado del diseño organizacional. OD es la disciplina más amplia que analiza cómo una organización debería estructurarse para lograr su estrategia. La reestructuración típicamente se refiere a cambios significativos en roles y reportes. OD también incluye ajustes más incrementales a procesos, gobernanza y mecanismos de coordinación.' },
      { question: '¿Qué habilidades se necesitan para el diseño organizacional?', answer: 'Fuertes habilidades analíticas para diagnosticar problemas organizacionales, pensamiento estratégico para alinear estructura con estrategia, gestión del cambio para implementar transiciones y gestión de interesados para navegar dinámicas políticas. Marcos como el Modelo Estrella proporcionan enfoques estructurados. Las habilidades de análisis de datos para analítica de fuerza laboral son cada vez más importantes.' },
      { question: '¿Cómo construyo experiencia en diseño organizacional?', answer: 'Ofrécete como voluntario para iniciativas de cambio organizacional, participa en proyectos de reestructuración, lidera reorganizaciones de equipos o departamentos, o contribuye a discusiones de modelos operativos. Incluso diseñar una estructura de equipo para una nueva función o reorganizar un departamento proporciona experiencia relevante en OD.' }
    ]
  },
  'workforce-planning': {
    slug: 'planificacion-de-fuerza-laboral',
    title: 'Planificación de Fuerza Laboral',
    description: 'La planificación de fuerza laboral es el proceso estratégico de analizar las capacidades actuales de la fuerza laboral y pronosticar las necesidades futuras de talento para asegurar que una organización tenga las personas adecuadas, en los roles adecuados, en el momento adecuado y al costo adecuado. Conecta la estrategia de negocio con la estrategia de talento, abarcando pronóstico de demanda, análisis de oferta, identificación de brechas y planificación de acción.\n\nLa planificación estratégica de fuerza laboral involucra analizar planes de negocio para proyectar requisitos futuros de talento, evaluar la demografía, habilidades y capacidad de la fuerza laboral actual, identificar brechas entre oferta y demanda, y desarrollar estrategias para cerrar brechas a través de contratación, desarrollo, redistribución, sucesión o reducción de fuerza laboral. Herramientas como Visier, Workday Adaptive Planning y Anaplan apoyan la planificación de fuerza laboral basada en datos.\n\nLa planificación de fuerza laboral se ha vuelto cada vez más crítica a medida que las organizaciones enfrentan escasez de talento, envejecimiento de la fuerza laboral, evolución de habilidades debido a la tecnología y la necesidad de agilidad de la fuerza laboral. La planificación moderna de fuerza laboral incorpora modelado de escenarios, planificación basada en habilidades (en lugar de basada en roles) y analítica en tiempo real para adaptarse a condiciones de negocio que cambian rápidamente.',
    whyImportant: 'Las organizaciones que sobresalen en planificación de fuerza laboral tienen 2.5 veces más probabilidades de superar a sus pares en crecimiento de ingresos y rentabilidad. Los profesionales de planificación de fuerza laboral ganan $85,000-$125,000, con líderes de nivel VP alcanzando $150,000-$200,000. Las habilidades de planificación de fuerza laboral aparecen en más del 20% de las ofertas de liderazgo de RRHH y gestión de operaciones.\n\nIncluir planificación de fuerza laboral en tu currículum demuestra pensamiento estratégico de RRHH y la capacidad de alinear la estrategia de talento con los objetivos de negocio. Señala capacidad analítica y previsión que las organizaciones necesitan cada vez más a medida que el talento se convierte en su recurso más crítico.',
    keywords: ['currículum de planificación de fuerza laboral', 'habilidades de planificación de fuerza laboral', 'currículum de planificación estratégica de fuerza laboral', 'currículum de planificación de talento'],
    searchIntents: ['cómo incluir planificación de fuerza laboral en el currículum', 'habilidades de planificación de fuerza laboral para RRHH', 'ejemplos de currículum de planificación de fuerza laboral'],
    relatedSkills: ['Gestión de Talento', 'Planificación de Sucesión', 'Diseño Organizacional', 'Analítica de RRHH', 'Planificación de Personal', 'Gestión de Presupuesto', 'Evaluación de Habilidades', 'Planificación de Escenarios'],
    professionSlugs: ['gerente-de-recursos-humanos', 'gerente-de-operaciones', 'director-de-operaciones', 'gerente-general', 'gerente-de-capacitacion', 'director-de-operaciones'],
    atsKeywords: ['planificación de fuerza laboral', 'planificación estratégica de fuerza laboral', 'planificación de personal', 'demanda de talento', 'analítica de fuerza laboral', 'análisis de brechas de habilidades', 'optimización de fuerza laboral', 'planificación de capacidad', 'planificación laboral', 'planificación de FTE'],
    resumeTips: [
      'Cuantifica el tamaño de fuerza laboral y presupuesto que cubrieron tus planes.',
      'Describe el horizonte de planificación y los escenarios modelados.',
      'Menciona herramientas de planificación de fuerza laboral y analítica utilizadas.',
      'Destaca los resultados de negocio habilitados por tus planes de fuerza laboral.',
      'Incluye ejemplos de estrategias proactivas de talento que abordaron necesidades futuras.'
    ],
    exampleBullets: [
      'Desarrollé un plan estratégico de fuerza laboral a 3 años para una organización de 5,000 personas, identificando 200 brechas de habilidades críticas e implementando programas de contratación y desarrollo dirigidos que cerraron el 85% de las brechas en 24 meses.',
      'Lideré el proceso anual de planificación de personal para un presupuesto de $180M, colaborando con 12 directores de departamento para optimizar la asignación de fuerza laboral y lograr el 98% de utilización de FTE presupuestados.',
      'Construí un dashboard de analítica de fuerza laboral usando Visier que proporcionó visibilidad en tiempo real del riesgo de deserción, preparación de sucesión y distribución de habilidades, habilitando intervenciones proactivas de talento.',
      'Modelé 4 escenarios de fuerza laboral para una iniciativa de transformación digital, recomendando un enfoque gradual que recapacitó a 150 empleados y evitó $4.5M en costos potenciales de indemnización.'
    ],
    faqs: [
      { question: '¿Qué herramientas se usan para planificación de fuerza laboral?', answer: 'Visier y Workday son las plataformas líderes de analítica y planificación de fuerza laboral. Anaplan y Adaptive Planning apoyan el modelado financiero de fuerza laboral. Excel sigue siendo ampliamente utilizado para planificación a menor escala. Las herramientas de BI como Tableau proporcionan visualización de fuerza laboral. La herramienta adecuada depende del tamaño y sofisticación organizacional.' },
      { question: '¿La planificación de fuerza laboral es una función de RRHH o de negocios?', answer: 'La planificación de fuerza laboral es una responsabilidad compartida entre RRHH y liderazgo de negocios. RRHH proporciona datos, metodología e inteligencia del mercado de talento, mientras que los líderes de negocio proporcionan señales de demanda y prioridades estratégicas. En tu currículum, destaca los resultados de negocio de tu planificación de fuerza laboral más que solo el proceso de RRHH.' },
      { question: '¿Cómo demuestro habilidades de planificación de fuerza laboral a nivel de equipo?', answer: 'Describe cómo planificaste la dotación de personal de tu equipo o departamento: pronosticando carga de trabajo, identificando necesidades de habilidades, desarrollando miembros del equipo, gestionando contratistas y optimizando la estructura del equipo. Incluso la planificación de fuerza laboral a pequeña escala demuestra el pensamiento analítico valorado en roles de mayor escala.' }
    ]
  },
  'talent-management': {
    slug: 'gestion-de-talento',
    title: 'Gestión de Talento',
    description: 'La gestión de talento es el enfoque estratégico para atraer, desarrollar, retener y desplegar empleados para lograr los objetivos organizacionales. Abarca el ciclo de vida completo del empleado incluyendo adquisición de talento, incorporación, aprendizaje y desarrollo, gestión del desempeño, trayectoria de carrera, planificación de sucesión, compromiso y retención. El objetivo es construir una fuerza laboral de alto desempeño alineada con la estrategia de negocio.\n\nLos marcos de gestión de talento integran múltiples procesos de RRHH en una estrategia cohesiva. Los componentes clave incluyen modelado de competencias, planes individuales de desarrollo, revisiones de talento 9-box, identificación de alto potencial, sistemas de gestión de aprendizaje (LMS), programas de mentoría y analítica de retención. Las plataformas de gestión de talento como Workday, SAP SuccessFactors, Oracle HCM y BambooHR proporcionan soporte tecnológico integrado.\n\nLa gestión moderna de talento ha evolucionado para abordar organizaciones basadas en habilidades, mercados internos de talento, rutas de aprendizaje personalizadas, integración de DEI y experiencia del empleado. La guerra por el talento en tecnología, salud y campos especializados ha elevado la gestión de talento de una función de RRHH a un imperativo estratégico de negocio.',
    whyImportant: 'Las organizaciones con prácticas sólidas de gestión de talento logran un 26% más de ingresos por empleado y un 40% menos de rotación. Los profesionales de gestión de talento ganan $80,000-$120,000, con líderes de nivel VP alcanzando $150,000-$200,000+. Las habilidades de gestión de talento aparecen en más del 25% de las ofertas de RRHH y gestión general.\n\nIncluir gestión de talento en tu currículum demuestra liderazgo de personas y la capacidad de construir capacidad organizacional. Señala que ves el talento como un activo estratégico y puedes desarrollar, retener y desplegar personas para lograr resultados de negocio.',
    keywords: ['currículum de gestión de talento', 'habilidades de gestión de talento', 'currículum de desarrollo de talento', 'currículum de gestión de personas'],
    searchIntents: ['cómo incluir gestión de talento en el currículum', 'habilidades de gestión de talento para RRHH', 'ejemplos de currículum de gestión de talento'],
    relatedSkills: ['Gestión del Desempeño', 'Planificación de Sucesión', 'Compromiso del Empleado', 'Aprendizaje y Desarrollo', 'Planificación de Fuerza Laboral', 'Coaching', 'Desarrollo de Liderazgo', 'Modelado de Competencias'],
    professionSlugs: ['gerente-de-recursos-humanos', 'gerente-de-capacitacion', 'gerente-general', 'director-de-operaciones', 'vicepresidente', 'director-de-operaciones'],
    atsKeywords: ['gestión de talento', 'desarrollo de talento', 'estrategia de talento', 'adquisición de talento', 'aprendizaje y desarrollo', 'planificación de sucesión', 'retención de empleados', 'alto potencial', 'pipeline de talento', 'desarrollo de personas'],
    resumeTips: [
      'Cuantifica el tamaño de fuerza laboral para el que gestionaste programas de talento.',
      'Reporta mejoras de retención y resultados de desarrollo.',
      'Describe programas de gestión de talento que diseñaste e implementaste.',
      'Menciona plataformas de tecnología de gestión de talento utilizadas.',
      'Destaca logros de desarrollo de liderazgo y planificación de sucesión.',
      'Incluye dimensiones de diversidad e inclusión de tu estrategia de talento.'
    ],
    exampleBullets: [
      'Diseñé e implementé una estrategia integrada de gestión de talento para una organización de 3,000 personas, reduciendo la rotación voluntaria del 22% al 14% y mejorando la tasa de promoción interna en un 45%.',
      'Creé un programa de desarrollo de alto potencial identificando y acelerando a 80 líderes emergentes, con el 65% promovidos en 2 años y una tasa de retención del 90%.',
      'Lancé un mercado interno de talento que facilitó 250 asignaciones multifuncionales en el primer año, mejorando las puntuaciones de compromiso de empleados en 18 puntos.',
      'Construí un marco de competencias abarcando 120 roles que estandarizó las expectativas de desempeño, informó la planificación de desarrollo y mejoró las puntuaciones de calidad de evaluación de desempeño en un 30%.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia la gestión de talento de la gestión de RRHH en un currículum?', answer: 'La gestión de RRHH cubre la gama completa de funciones de recursos humanos incluyendo nómina, beneficios, cumplimiento y relaciones laborales. La gestión de talento es un subconjunto estratégico enfocado en construir capacidad organizacional a través del desarrollo, desempeño y retención. Enfatiza gestión de talento para señalar liderazgo estratégico de personas en lugar de RRHH administrativo.' },
      { question: '¿Los profesionales no de RRHH pueden listar gestión de talento?', answer: 'Absolutamente. Cualquier líder que desarrolla miembros del equipo, gestiona desempeño, identifica candidatos de sucesión o impulsa la retención está practicando gestión de talento. Describe cómo hiciste crecer las capacidades de los miembros de tu equipo, promoviste desde dentro, redujiste la rotación o construiste equipos de alto desempeño.' },
      { question: '¿Qué métricas de gestión de talento debo incluir?', answer: 'Las métricas clave incluyen tasa de retención de empleados, tasa de promoción interna, tiempo hasta productividad, puntuaciones de compromiso, identificación y retención de alto potencial, tasas de completación de aprendizaje y porcentajes de preparación de sucesores. Conecta estas métricas con resultados de negocio como ingresos por empleado o satisfacción del cliente.' }
    ]
  },
  'succession-planning': {
    slug: 'planificacion-de-sucesion',
    title: 'Planificación de Sucesión',
    description: 'La planificación de sucesión es el proceso de identificar y desarrollar futuros líderes que puedan reemplazar a los líderes actuales cuando se vayan, se jubilen o sean promovidos. La planificación efectiva de sucesión va más allá de la planificación de reemplazo para construir un pipeline de talento listo para llenar roles críticos en toda la organización. Se integra con el desarrollo de liderazgo, evaluación de talento, trayectoria de carrera y estrategia organizacional.\n\nEl proceso de planificación de sucesión involucra identificar posiciones críticas, evaluar a los titulares actuales y sucesores potenciales, evaluar la preparación de los sucesores (típicamente usando matrices 9-box), crear planes individuales de desarrollo, proporcionar experiencias de desarrollo y monitorear el progreso. Los planes de sucesión de emergencia aseguran cobertura inmediata para salidas inesperadas de líderes clave.\n\nLa planificación moderna de sucesión ha evolucionado de enfocarse únicamente en el reemplazo de C-suite a abordar la sucesión en todos los roles críticos incluyendo contribuidores individuales expertos en la materia. Las plataformas tecnológicas como Workday, SAP SuccessFactors y Cornerstone proporcionan módulos de planificación de sucesión con perfiles de talento, dashboards de preparación y seguimiento de desarrollo.',
    whyImportant: 'Las organizaciones con planificación de sucesión sólida tienen 2.2 veces más probabilidades de superar a sus competidores. Solo el 35% de las organizaciones reportan tener un plan de sucesión formal, creando ventaja competitiva para las que lo tienen. Los profesionales de planificación de sucesión ganan $85,000-$130,000 como parte de roles de gestión de talento.\n\nIncluir planificación de sucesión en tu currículum demuestra pensamiento a largo plazo, capacidad de desarrollo de liderazgo y administración organizacional. Señala que construyes capacidad organizacional sostenible en lugar de crear dependencia de contribuidores individuales.',
    keywords: ['currículum de planificación de sucesión', 'habilidades de planificación de sucesión', 'currículum de pipeline de liderazgo', 'currículum de gestión de sucesión'],
    searchIntents: ['cómo incluir planificación de sucesión en el currículum', 'habilidades de planificación de sucesión para líderes de RRHH', 'ejemplos de currículum de planificación de sucesión'],
    relatedSkills: ['Gestión de Talento', 'Desarrollo de Liderazgo', 'Gestión del Desempeño', 'Coaching', 'Planificación de Fuerza Laboral', 'Diseño Organizacional', 'Desarrollo de Carrera', 'Evaluación 9-Box'],
    professionSlugs: ['gerente-de-recursos-humanos', 'gerente-general', 'director-ejecutivo', 'director-de-operaciones', 'vicepresidente', 'gerente-de-capacitacion'],
    atsKeywords: ['planificación de sucesión', 'pipeline de liderazgo', 'pipeline de talento', 'preparación de sucesores', 'desarrollo de liderazgo', '9-box', 'alto potencial', 'roles críticos', 'bench strength', 'revisión de talento'],
    resumeTips: [
      'Describe el alcance de los programas de planificación de sucesión que gestionaste.',
      'Cuantifica mejoras de bench strength y tasas de preparación de sucesores.',
      'Menciona metodologías de evaluación utilizadas (9-box, revisiones de talento, assessments).',
      'Destaca sucesiones internas exitosas que resultaron de tu planificación.',
      'Incluye programas de desarrollo de liderazgo vinculados a la preparación de sucesión.'
    ],
    exampleBullets: [
      'Diseñé e implementé un programa de planificación de sucesión cubriendo 85 roles críticos, aumentando la preparación de sucesores del 40% al 78% en 2 años.',
      'Facilité sesiones anuales de revisión de talento con 20 líderes senior, identificando 120 empleados de alto potencial y creando planes de desarrollo personalizados que lograron el 85% de retención.',
      'Construí un currículo de desarrollo de liderazgo alineado con las necesidades de sucesión, desarrollando 35 líderes de próxima generación con el 70% logrando preparación para promoción en 18 meses.',
      'Implementé planes de sucesión de emergencia para todos los roles de C-suite y VP, reduciendo el riesgo organizacional y habilitando transiciones fluidas durante 4 salidas inesperadas de liderazgo.'
    ],
    faqs: [
      { question: '¿La planificación de sucesión es solo para grandes organizaciones?', answer: 'No, organizaciones de todos los tamaños necesitan planificación de sucesión, aunque la formalidad varía. Las pequeñas empresas necesitan identificar quién puede asumir roles críticos si una persona clave se va. Las startups necesitan pensamiento de sucesión para fundadores y empleados tempranos. Los principios aplican sin importar el tamaño organizacional.' },
      { question: '¿Cómo muestro experiencia en planificación de sucesión como gerente de línea?', answer: 'Describe cómo identificaste y desarrollaste sucesores potenciales dentro de tu equipo, mentoreaste líderes emergentes, entrenaste cruzadamente a miembros del equipo para cobertura de roles o recomendaste empleados para avance. Cualquier actividad que construya bench strength demuestra pensamiento de planificación de sucesión.' },
      { question: '¿Cuál es la diferencia entre planificación de sucesión y planificación de reemplazo?', answer: 'La planificación de reemplazo es reactiva, identificando quién llenaría un rol específico si queda vacante. La planificación de sucesión es proactiva, construyendo un pipeline de talento listo para múltiples roles de liderazgo a lo largo del tiempo. La planificación de sucesión incluye desarrollo, mientras que la planificación de reemplazo es principalmente identificación. Enfatiza los aspectos de desarrollo en tu currículum.' }
    ]
  },
  'performance-management': {
    slug: 'gestion-del-desempeno',
    title: 'Gestión del Desempeño',
    description: 'La gestión del desempeño es el proceso continuo de establecer objetivos, evaluar el progreso y proporcionar coaching y retroalimentación continua para asegurar que los empleados cumplan sus metas y objetivos organizacionales. La gestión moderna del desempeño ha pasado de revisiones anuales a conversaciones continuas de desempeño, retroalimentación en tiempo real y gestión ágil de metas. Organizaciones líderes como Adobe, GE, Deloitte y Microsoft han transformado sus enfoques de gestión del desempeño.\n\nLos sistemas de gestión del desempeño incluyen establecimiento de metas (metas SMART, OKRs), check-ins regulares (semanales o quincenales), retroalimentación 360 grados, autoevaluaciones, sesiones de calibración, calificaciones o rankings de desempeño, planificación de desarrollo y planes de mejora del desempeño (PIPs). Las plataformas tecnológicas como Workday, Lattice, 15Five, Culture Amp y BetterWorks apoyan los flujos de trabajo modernos de gestión del desempeño.\n\nLa gestión efectiva del desempeño alinea las contribuciones individuales con la estrategia organizacional, proporciona claridad sobre las expectativas, permite correcciones de rumbo oportunas, apoya las conversaciones de desarrollo e informa las decisiones de talento en torno a compensación, promoción y sucesión.',
    whyImportant: 'Las empresas con gestión efectiva del desempeño tienen 1.5 veces más probabilidades de ser líderes financieros del cuartil superior. Las habilidades de gestión del desempeño se esperan en todo rol de liderazgo de personas. Los profesionales de RRHH especializados en gestión del desempeño ganan $75,000-$120,000, con profesionales senior de OD alcanzando $130,000-$170,000.\n\nIncluir gestión del desempeño en tu currículum demuestra la capacidad de impulsar resultados a través de las personas, una competencia fundamental de liderazgo. Señala que puedes establecer expectativas claras, proporcionar retroalimentación constructiva, desarrollar talento y gestionar el bajo desempeño, habilidades valoradas en todos los niveles de gestión.',
    keywords: ['currículum de gestión del desempeño', 'habilidades de gestión del desempeño', 'currículum de evaluación de desempeño', 'currículum de desempeño de empleados'],
    searchIntents: ['cómo incluir gestión del desempeño en el currículum', 'habilidades de gestión del desempeño para gerentes', 'ejemplos de currículum de gestión del desempeño'],
    relatedSkills: ['Coaching', 'Retroalimentación', 'Establecimiento de Metas', 'OKRs', 'Desarrollo de Empleados', 'Gestión de Talento', 'Liderazgo', 'Compromiso del Empleado', 'Retroalimentación 360 Grados'],
    professionSlugs: ['gerente-de-recursos-humanos', 'gerente-de-capacitacion', 'gerente-general', 'gerente-de-operaciones', 'gerente-de-ingenieria', 'director-de-operaciones'],
    atsKeywords: ['gestión del desempeño', 'evaluación de desempeño', 'establecimiento de metas', 'retroalimentación continua', 'coaching de desempeño', 'retroalimentación 360', 'mejora del desempeño', 'desarrollo de empleados', 'métricas de desempeño', 'calibración'],
    resumeTips: [
      'Describe el sistema de gestión del desempeño que implementaste o mejoraste.',
      'Cuantifica mejoras en desempeño de empleados, compromiso o finalización de metas.',
      'Menciona herramientas y plataformas de gestión del desempeño utilizadas.',
      'Destaca metodologías de coaching y retroalimentación aplicadas.',
      'Incluye resultados de procesos de mejora del desempeño.'
    ],
    exampleBullets: [
      'Rediseñé la gestión del desempeño de revisiones anuales a ciclos de retroalimentación continua, mejorando las puntuaciones de compromiso de empleados en 22 puntos y la tasa de finalización de metas del 65% al 88%.',
      'Implementé programa de retroalimentación 360 grados para 400 gerentes, proporcionando insights de desarrollo accionables que mejoraron las puntuaciones de efectividad de liderazgo en un 28% año tras año.',
      'Gestioné el desempeño de un equipo de 50 personas, logrando un aumento de productividad del equipo del 35% a través de alineación clara de metas, check-ins semanales y coaching dirigido.',
      'Lideré sesiones de calibración en 6 departamentos asegurando estándares de desempeño consistentes, resultando en una mejora del 40% en la percepción de los empleados sobre la equidad de la gestión del desempeño.'
    ],
    faqs: [
      { question: '¿Cómo demuestro habilidades de gestión del desempeño como contribuidor individual?', answer: 'Incluso sin reportes directos, puedes demostrar autogestión del desempeño a través del establecimiento de metas, búsqueda de retroalimentación, autodesarrollo y coaching de pares. Si has mentoreado a miembros junior del equipo, liderado equipos de proyecto o proporcionado retroalimentación formal, incluye estos como actividades de gestión del desempeño.' },
      { question: '¿Debo describir gestión del desempeño tradicional o moderna en mi currículum?', answer: 'Describe lo que realmente practicaste, pero enmárcalo con lenguaje moderno. Si usaste revisiones anuales, describe cómo las complementaste con check-ins regulares y coaching. Si implementaste retroalimentación continua, destaca el cambio y sus resultados. Los empleadores prefieren candidatos que entienden enfoques modernos.' },
      { question: '¿Qué herramientas de gestión del desempeño debo mencionar?', answer: 'Lattice, 15Five y Culture Amp son plataformas modernas populares. Workday y SAP SuccessFactors cubren necesidades empresariales. BetterWorks apoya desempeño basado en OKRs. Menciona herramientas relevantes para tu empleador objetivo. Si tienes experiencia transformando procesos de desempeño con tecnología, destaca el impacto antes y después.' }
    ]
  },
  'employee-engagement': {
    slug: 'compromiso-del-empleado',
    title: 'Compromiso del Empleado',
    description: 'El compromiso del empleado es el compromiso emocional que los empleados tienen con su organización y sus metas, lo que conduce a esfuerzo discrecional y desempeño sostenido. Los empleados comprometidos van más allá de los requisitos mínimos, contribuyendo ideas, mentoreando colegas y actuando como embajadores de marca. El compromiso se mide a través de encuestas, pulsos, eNPS (Employee Net Promoter Score) e indicadores conductuales como retención, ausentismo y productividad.\n\nLas estrategias de compromiso abarcan comunicación del liderazgo, programas de reconocimiento, oportunidades de desarrollo de carrera, iniciativas de equilibrio trabajo-vida, construcción de cultura inclusiva, asignación de trabajo significativo, autonomía, mecanismos de retroalimentación y diseño de experiencia laboral. Las plataformas líderes de compromiso incluyen Gallup Q12, Culture Amp, Glint (Microsoft Viva), Qualtrics y Peakon (Workday).\n\nLa investigación de Gallup muestra que solo el 23% de la fuerza laboral global está activamente comprometida, representando una oportunidad masiva de mejora. Las organizaciones en el cuartil superior de compromiso logran un 23% más de rentabilidad, un 18% más de productividad y un 43% menos de rotación comparadas con las organizaciones del cuartil inferior.',
    whyImportant: 'Los empleados no comprometidos cuestan a la economía de EE.UU. $450-$550 mil millones anuales en productividad perdida. Los profesionales de compromiso del empleado ganan $70,000-$110,000, con líderes de cultura y compromiso de nivel VP alcanzando $140,000-$180,000. Las habilidades de compromiso aparecen en más del 20% de las ofertas de RRHH y gestión.\n\nIncluir compromiso del empleado en tu currículum demuestra liderazgo centrado en las personas y la capacidad de crear entornos de trabajo de alto desempeño. Señala que entiendes la conexión entre la experiencia del empleado y los resultados de negocio, un insight crítico para cualquier rol de liderazgo.',
    keywords: ['currículum de compromiso del empleado', 'habilidades de compromiso del empleado', 'currículum de satisfacción del empleado', 'currículum de estrategia de compromiso'],
    searchIntents: ['cómo incluir compromiso del empleado en el currículum', 'habilidades de compromiso del empleado para gerentes', 'ejemplos de currículum de compromiso del empleado'],
    relatedSkills: ['Gestión del Desempeño', 'Gestión de Talento', 'Liderazgo', 'Comunicación', 'Programas de Reconocimiento', 'Construcción de Cultura', 'Experiencia del Empleado', 'Diversidad e Inclusión', 'Coaching'],
    professionSlugs: ['gerente-de-recursos-humanos', 'gerente-de-capacitacion', 'gerente-general', 'gerente-de-operaciones', 'director-de-operaciones', 'director-de-organizacion-sin-fines-de-lucro'],
    atsKeywords: ['compromiso del empleado', 'encuesta de compromiso', 'eNPS', 'satisfacción del empleado', 'retención', 'experiencia del empleado', 'cultura', 'reconocimiento', 'Gallup Q12', 'encuesta pulso', 'marca empleadora'],
    resumeTips: [
      'Cuantifica mejoras de puntuación de compromiso con métricas específicas.',
      'Describe programas de compromiso que diseñaste y sus tasas de participación.',
      'Incluye mejoras de retención vinculadas a iniciativas de compromiso.',
      'Menciona plataformas y metodologías de encuestas de compromiso utilizadas.',
      'Destaca la conexión entre mejoras de compromiso y resultados de negocio.'
    ],
    exampleBullets: [
      'Diseñé y lancé un programa integral de compromiso del empleado que mejoró las puntuaciones Gallup Q12 de 3.4 a 4.2 y redujo la rotación voluntaria del 25% al 16% en 2 años.',
      'Implementé encuestas pulso trimestrales usando Culture Amp alcanzando el 92% de participación, habilitando planes de acción basados en datos que mejoraron el compromiso en 8 de 10 dimensiones medidas.',
      'Creé una plataforma de reconocimiento entre pares adoptada por el 85% de los empleados, resultando en más de 2,500 reconocimientos por trimestre y un aumento de 15 puntos en las puntuaciones de "sentirse valorado".',
      'Lideré la transformación de experiencia del empleado para una organización de 1,500 personas, mejorando el eNPS de -5 a +35 a través de iniciativas dirigidas en desarrollo de carrera, efectividad del gerente y flexibilidad laboral.'
    ],
    faqs: [
      { question: '¿Cómo se diferencia el compromiso del empleado de la satisfacción del empleado en un currículum?', answer: 'La satisfacción mide si los empleados están contentos con sus condiciones. El compromiso mide si están emocionalmente comprometidos y dispuestos a ejercer esfuerzo discrecional. El compromiso es un predictor más fuerte del desempeño del negocio. Usa terminología de compromiso para señalar una comprensión más sofisticada de las dinámicas de personas.' },
      { question: '¿Los gerentes de línea pueden listar compromiso del empleado en su currículum?', answer: 'Sí, y deberían. Los gerentes de línea tienen el mayor impacto en el compromiso, ya que la investigación de Gallup muestra que el 70% de la variación del compromiso se atribuye al gerente. Describe cómo mejoraste el compromiso del equipo, redujiste la rotación, aumentaste la satisfacción del equipo o construiste una cultura positiva de equipo.' },
      { question: '¿Qué métricas de compromiso debo incluir en mi currículum?', answer: 'Incluye puntuaciones de encuestas de compromiso (generales y por dimensión), eNPS, tasas de rotación voluntaria, tasas de participación en programas y cualquier métrica de negocio correlacionada con mejoras de compromiso como productividad, satisfacción del cliente o calidad. Mostrar el impacto de negocio del compromiso diferencia tu currículum.' }
    ]
  },
  'diversity-and-inclusion': {
    slug: 'diversidad-e-inclusion',
    title: 'Diversidad e Inclusión',
    description: 'La Diversidad e Inclusión (D&I), ahora frecuentemente extendida a Diversidad, Equidad, Inclusión y Pertenencia (DEIB), es el compromiso organizacional de crear una fuerza laboral que refleje la diversidad de la sociedad y una cultura donde todos los empleados se sientan valorados, respetados y empoderados para contribuir su mejor trabajo. La diversidad abarca la representación en dimensiones incluyendo raza, etnia, género, edad, discapacidad, orientación sexual, religión, estatus de veterano, origen socioeconómico y neurodiversidad.\n\nLos profesionales de D&I desarrollan estrategia, establecen metas de representación, realizan análisis de equidad salarial, diseñan prácticas de contratación inclusiva, crean grupos de recursos de empleados (ERGs), imparten capacitación sobre sesgos, establecen programas de mentoría y patrocinio, y miden el progreso a través de analítica de fuerza laboral. Las métricas clave incluyen representación en cada nivel organizacional, análisis de brecha salarial, paridad de promociones, diferenciales de retención, puntuaciones de índice de inclusión y gasto en diversidad de proveedores.\n\nD&I ha evolucionado de una función de cumplimiento a un imperativo estratégico de negocio. La investigación de McKinsey muestra que las empresas en el cuartil superior de diversidad étnica y cultural superan a sus pares del cuartil inferior en un 36% en rentabilidad. Las organizaciones reconocen cada vez más que los equipos diversos producen soluciones más innovadoras, toman mejores decisiones y sirven mejor a bases de clientes diversas.',
    whyImportant: 'Los roles de D&I han crecido un 71% en los últimos 5 años. Los profesionales de D&I ganan $80,000-$130,000, con Directores de Diversidad alcanzando $180,000-$300,000+. La competencia en D&I aparece en más del 25% de las ofertas de RRHH, liderazgo y roles corporativos.\n\nIncluir diversidad e inclusión en tu currículum demuestra liderazgo inclusivo, competencia cultural y alineación con los valores organizacionales que cada vez más impulsan la marca empleadora y los resultados de negocio. Señala que puedes construir y liderar equipos diversos efectivamente en el lugar de trabajo multicultural de hoy.',
    keywords: ['currículum de diversidad e inclusión', 'habilidades de DEI para currículum', 'currículum de diversidad equidad inclusión', 'currículum de liderazgo inclusivo'],
    searchIntents: ['cómo incluir diversidad e inclusión en el currículum', 'habilidades de DEI para líderes', 'ejemplos de currículum de diversidad e inclusión'],
    relatedSkills: ['Compromiso del Empleado', 'Gestión de Talento', 'Diseño Organizacional', 'Gestión del Cambio', 'Liderazgo', 'Capacitación y Desarrollo', 'Planificación de Fuerza Laboral', 'Competencia Cultural'],
    professionSlugs: ['gerente-de-recursos-humanos', 'gerente-de-capacitacion', 'gerente-general', 'director-ejecutivo', 'director-de-operaciones', 'director-de-organizacion-sin-fines-de-lucro', 'vicepresidente'],
    atsKeywords: ['diversidad e inclusión', 'DEI', 'DEIB', 'liderazgo inclusivo', 'equidad', 'pertenencia', 'grupos de recursos de empleados', 'ERG', 'sesgo inconsciente', 'equidad salarial', 'contratación diversa', 'diversidad de proveedores'],
    resumeTips: [
      'Cuantifica mejoras de representación y métricas de diversidad.',
      'Describe programas específicos de D&I diseñados y sus resultados.',
      'Menciona desarrollo de estrategia de D&I y experiencia de patrocinio ejecutivo.',
      'Incluye establecimiento y liderazgo de ERGs.',
      'Destaca prácticas de contratación inclusiva y su impacto en la diversidad de candidatos.',
      'Referencia análisis de equidad salarial y acciones de remediación.'
    ],
    exampleBullets: [
      'Desarrollé y ejecuté una estrategia de DEI a 3 años que aumentó la representación de grupos subrepresentados en el liderazgo del 18% al 34% y mejoró las puntuaciones del índice de inclusión en 25 puntos.',
      'Lancé 6 grupos de recursos de empleados con el 40% de participación de empleados, creando comunidad y proporcionando desarrollo de talento que contribuyó a un 30% más de retención entre miembros de ERGs.',
      'Implementé prácticas de contratación inclusiva incluyendo entrevistas estructuradas y requisitos de lista diversa, aumentando la contratación de candidatos diversos en un 45% sin extender el tiempo de contratación.',
      'Realicé análisis de equidad salarial a nivel organizacional, identificando y remediando $1.2M en brechas salariales en dimensiones de género y etnia en 6 meses.',
      'Establecí un programa de diversidad de proveedores que dirigió el 15% del gasto anual de adquisiciones a empresas de propietarios diversos, totalizando $8M en nuevas relaciones con proveedores.'
    ],
    faqs: [
      { question: '¿Cómo listo habilidades de D&I sin un rol dedicado de D&I?', answer: 'Describe prácticas de liderazgo inclusivo: construir equipos diversos, mentorear a empleados subrepresentados, promover procesos inclusivos, participar en ERGs o abogar por prácticas equitativas. Cualquier líder que activamente fomenta la pertenencia y la equidad demuestra competencia en D&I.' },
      { question: '¿Qué métricas de D&I son más significativas en un currículum?', answer: 'Las mejoras de representación a niveles específicos, cierre de equidad salarial, tasas de contratación diversa, puntuaciones de encuestas de inclusión, participación en ERGs, paridad de tasa de retención y gasto en diversidad de proveedores son métricas significativas. Enfócate en resultados más que en actividades para demostrar impacto real.' },
      { question: '¿La experiencia en D&I es valorada en roles técnicos?', answer: 'Sí. Las empresas de tecnología buscan activamente líderes técnicos que puedan construir equipos diversos, crear culturas de ingeniería inclusivas y asegurar que los productos sirvan a usuarios diversos. Destacar D&I junto con habilidades técnicas te posiciona como un líder integral, especialmente para roles senior y de gestión.' }
    ]
  }
};