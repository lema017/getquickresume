import type { SkillEsData } from './index';

export const translations: Record<string, SkillEsData> = {
  'communication': {
    slug: 'comunicacion',
    title: 'Comunicación',
    description: 'La comunicación es la capacidad de transmitir información de manera clara y efectiva a través de canales verbales, no verbales y escritos. La comunicación efectiva abarca codificar mensajes de forma adecuada para la audiencia, seleccionar el medio correcto y asegurar la comprensión mutua mediante ciclos de retroalimentación. Modelos como Shannon-Weaver y el marco SMCR de Berlo ilustran cómo el ruido, el contexto y la selección del canal impactan la fidelidad del mensaje.\n\nEn entornos profesionales, la comunicación incluye redactar correos electrónicos claros, liderar reuniones productivas, realizar presentaciones persuasivas y facilitar la alineación entre departamentos. La National Association of Colleges and Employers clasifica consistentemente la comunicación como la habilidad principal que buscan los empleadores. Los comunicadores efectivos adaptan su registro, tono y estructura según se dirijan a ejecutivos, colegas, clientes o partes interesadas externas.\n\nLa comunicación moderna también abarca canales asincrónicos como Slack, Microsoft Teams y herramientas de gestión de proyectos. Los profesionales que dominan tanto la comunicación sincrónica como asincrónica reducen malentendidos, aceleran la toma de decisiones y fomentan la confianza en equipos distribuidos.',
    whyImportant: 'La comunicación es citada como la habilidad blanda más importante en más del 70% de las ofertas de trabajo en todas las industrias. Según un informe de McKinsey, los empleados dedican casi el 28% de su semana laboral solo a gestionar correo electrónico, haciendo que la eficiencia comunicativa sea un impulsor directo de la productividad. La mala comunicación cuesta a las empresas un estimado de $12,506 por empleado al año.\n\nEn un currículum, demostrar habilidades de comunicación señala que puedes conectar las brechas entre partes interesadas técnicas y no técnicas, gestionar relaciones con clientes y liderar equipos de manera efectiva. Los sistemas ATS escanean cada vez más palabras clave relacionadas con comunicación, especialmente para roles de gestión, consultoría y atención al cliente.',
    keywords: ['habilidades de comunicación currículum', 'comunicación efectiva empleo', 'habilidades de comunicación CV', 'comunicación profesional currículum'],
    searchIntents: ['cómo mostrar habilidades de comunicación en el currículum', 'ejemplos de habilidades de comunicación para solicitud de empleo', 'mejor manera de describir comunicación en CV'],
    relatedSkills: ['Escucha Activa', 'Hablar en Público', 'Comunicación Escrita', 'Habilidades de Presentación', 'Habilidades Interpersonales', 'Empatía', 'Narrativa', 'Etiqueta de Correo Electrónico'],
    professionSlugs: ['gerente-de-proyectos', 'especialista-en-relaciones-publicas', 'consultor-de-gestion', 'ejecutivo-de-cuentas', 'gerente-de-recursos-humanos', 'maestro'],
    atsKeywords: ['comunicación', 'comunicación verbal', 'comunicación escrita', 'comunicación interpersonal', 'comunicación con stakeholders', 'comunicación multifuncional', 'comunicación con clientes', 'comunicación de equipo', 'presentación', 'escucha activa', 'hablar en público'],
    resumeTips: [
      'Evita simplemente listar "habilidades de comunicación" — en su lugar, demuéstralas a través de logros y contextos específicos.',
      'Cuantifica el impacto comunicativo, como tamaños de audiencia, grupos de stakeholders gestionados o volúmenes de documentación producidos.',
      'Menciona los canales y formatos en los que destacas: presentaciones, informes ejecutivos, redacción técnica o comunicaciones con clientes.',
      'Combina la comunicación con resultados como mejor alineación del equipo, menos escalaciones o aprobaciones de proyecto más rápidas.',
      'Adapta los ejemplos de comunicación al puesto: roles con clientes necesitan ejemplos de persuasión; roles internos necesitan ejemplos de alineación entre equipos.'
    ],
    exampleBullets: [
      'Realizó informes ejecutivos semanales para una audiencia de nivel C de 12 personas, traduciendo hojas de ruta técnicas complejas en resultados de negocio y asegurando $2.4M en financiamiento adicional de proyectos.',
      'Redactó y estandarizó más de 35 plantillas de propuestas para clientes, aumentando la tasa de éxito de propuestas del 22% al 38% en toda la organización de ventas.',
      'Facilitó la comunicación interdepartamental entre equipos de ingeniería, marketing y operaciones de más de 60 miembros, reduciendo los malentendidos en proyectos en un 45%.',
      'Lideró reuniones generales para más de 200 empleados durante una reestructuración organizacional, logrando un 91% de sentimiento positivo en encuestas posteriores al evento.'
    ],
    faqs: [
      { question: '¿Cómo demuestro habilidades de comunicación en un currículum sin solo listarlas?', answer: 'Usa logros específicos que requirieron comunicación: presentaciones realizadas, informes redactados, stakeholders gestionados o sesiones de capacitación dirigidas. Incluye métricas como tamaño de audiencia, frecuencia e impacto en el negocio. Los gerentes de contratación valoran resultados demostrados sobre rasgos autodescritos.' },
      { question: '¿Cuál es la diferencia entre comunicación verbal y escrita en un currículum?', answer: 'La comunicación verbal cubre reuniones, presentaciones, llamadas telefónicas y negociaciones. La comunicación escrita incluye correos electrónicos, informes, propuestas y documentación. La mayoría de los roles requieren ambas, pero enfatiza el tipo más relevante para el puesto. Los roles con clientes priorizan lo verbal; los roles analíticos priorizan lo escrito.' },
      { question: '¿Debo incluir habilidades de comunicación si estoy aplicando a un rol técnico?', answer: 'Sí. Los roles técnicos requieren cada vez más comunicación para revisiones de código, documentación, colaboración entre equipos y presentación de hallazgos. Destaca la comunicación técnica específicamente: redacción de documentos de diseño, explicación de sistemas complejos a stakeholders no técnicos o liderazgo de retrospectivas de sprint.' }
    ]
  },
  'public-speaking': {
    slug: 'hablar-en-publico',
    title: 'Hablar en Público',
    description: 'Hablar en público es la capacidad de realizar presentaciones orales estructuradas, atractivas y persuasivas ante una audiencia. Se basa en técnicas retóricas que se remontan a los tres modos de persuasión de Aristóteles — ethos (credibilidad), pathos (emoción) y logos (lógica) — y marcos modernos como la Secuencia Motivada de Monroe para la estructura de discursos persuasivos.\n\nLos oradores públicos efectivos dominan la variedad vocal, el ritmo, el lenguaje corporal y las técnicas de engagement con la audiencia. Estructuran el contenido con aperturas claras, evidencia de respaldo, transiciones y cierres memorables. En entornos corporativos, hablar en público incluye discursos principales, presentaciones en conferencias, pitches para inversionistas, reuniones generales del equipo y demos para clientes.\n\nHablar en público contemporáneo también abarca presentaciones virtuales vía Zoom, Webex y Microsoft Teams, donde mantener el engagement sin presencia física requiere técnicas adaptadas como encuestas interactivas, presencia deliberada ante la cámara y diseño conciso de diapositivas siguiendo principios como la regla 10-20-30 popularizada por Guy Kawasaki.',
    whyImportant: 'La capacidad de hablar en público se correlaciona fuertemente con el avance profesional. Un estudio de la University of Wolverhampton encontró que los empleados que presentan regularmente tienen un 70% más de probabilidades de ser promovidos. Para roles de liderazgo, ventas y consultoría, hablar en público es una competencia central que impacta directamente la generación de ingresos y la influencia organizacional.\n\nEn un currículum, la experiencia de hablar en público señala presencia ejecutiva, confianza y la capacidad de representar a una organización externamente. Diferencia a los candidatos para roles que requieren gestión de stakeholders, impartición de capacitaciones o liderazgo de pensamiento.',
    keywords: ['habilidades de oratoria currículum', 'experiencia de presentación CV', 'oratoria carrera profesional', 'conferencias currículum'],
    searchIntents: ['cómo listar oratoria en el currículum', 'habilidades de oratoria para avance profesional', 'ejemplos de logros en oratoria'],
    relatedSkills: ['Habilidades de Presentación', 'Narrativa', 'Persuasión', 'Comunicación', 'Confianza', 'Lenguaje Corporal', 'Engagement de Audiencia', 'Presencia Ejecutiva'],
    professionSlugs: ['consultor-de-gestion', 'profesor-universitario', 'especialista-en-relaciones-publicas', 'gerente-de-ventas', 'gerente-de-capacitacion', 'maestro'],
    atsKeywords: ['hablar en público', 'orador principal', 'presentador de conferencias', 'presentación oral', 'engagement de audiencia', 'entrega de discursos', 'presentación en podio', 'liderazgo de pensamiento', 'conferencias', 'presentación virtual'],
    resumeTips: [
      'Lista conferencias específicas con tamaños de audiencia y nombres de eventos cuando sea posible.',
      'Menciona la variedad de contextos: conferencias, webinars, presentaciones en sala de juntas, sesiones de capacitación.',
      'Cuantifica el impacto de tus presentaciones: negocios cerrados, calificaciones de audiencia, conteo de asistentes.',
      'Incluye cualquier formación o certificación como orador, como Toastmasters Competent Communicator.',
      'Destaca habilidades de presentación virtual ya que son cada vez más valoradas en entornos laborales híbridos.'
    ],
    exampleBullets: [
      'Realizó más de 15 presentaciones principales en conferencias de la industria con audiencias de 300-1,200 asistentes, recibiendo consistentemente calificaciones de orador superiores a 4.7/5.0.',
      'Presentó revisiones de negocio trimestrales a una junta de 8 directores, asegurando la aprobación unánime para una iniciativa de expansión de producto de $5M.',
      'Lideró una serie de reuniones generales virtuales para más de 500 empleados remotos en 4 zonas horarias, aumentando las puntuaciones de engagement en un 32%.',
      'Representó a la organización en 10 paneles y mesas redondas de la industria, generando 25 leads empresariales calificados valorados en $1.8M.'
    ],
    faqs: [
      { question: '¿Cómo listo la oratoria en mi currículum si no he hablado en conferencias importantes?', answer: 'Incluye presentaciones internas, sesiones de capacitación del equipo, pitches para clientes y eventos comunitarios. Incluso liderar un standup semanal para un equipo de 15 personas cuenta. Enfócate en el tamaño de la audiencia, frecuencia y resultados en lugar del prestigio del lugar.' },
      { question: '¿Vale la pena mencionar Toastmasters en un currículum?', answer: 'Sí. Toastmasters demuestra desarrollo proactivo de habilidades. Lista tu nivel de logro más alto (p.ej., Competent Communicator, Distinguished Toastmaster) y cualquier rol de liderazgo dentro de la organización. Es ampliamente reconocido por gerentes de contratación.' },
      { question: '¿Cómo diferencio hablar en público de habilidades de presentación en mi currículum?', answer: 'Hablar en público enfatiza la entrega en vivo, la interacción con la audiencia y la persuasión sin depender de diapositivas. Las habilidades de presentación se enfocan más en la narrativa visual, diseño de diapositivas y entrega de contenido estructurado. Muchos roles requieren ambas, así que adapta tu énfasis a la descripción del puesto.' }
    ]
  },
  'presentation-skills': {
    slug: 'habilidades-de-presentacion',
    title: 'Habilidades de Presentación',
    description: 'Las habilidades de presentación abarcan la capacidad de diseñar, estructurar y realizar presentaciones visuales y orales convincentes que informan, persuaden o inspiran a una audiencia. Esto incluye principios de diseño de diapositivas (Presentation Zen de Garr Reynolds, el marco Resonate de Nancy Duarte), mejores prácticas de visualización de datos, estructura narrativa y técnicas de entrega.\n\nLos presentadores fuertes entienden cómo sintetizar información compleja en mensajes claros y apropiados para la audiencia. Aplican el principio de la pirámide (Barbara Minto) para estructurar argumentos de arriba hacia abajo, usan la regla de tres para la memorabilidad e integran narrativa para crear resonancia emocional. Las herramientas comúnmente utilizadas incluyen PowerPoint, Google Slides, Keynote y Canva, con presentadores avanzados aprovechando la narrativa de datos a través de dashboards de Tableau o Power BI.\n\nEn los lugares de trabajo modernos, las habilidades de presentación se extienden a entornos virtuales donde diapositivas concisas, ritmo atractivo y elementos interactivos como encuestas y preguntas y respuestas son esenciales para mantener la atención de la audiencia frente a la fatiga de pantalla.',
    whyImportant: 'Las habilidades de presentación son un requisito top cinco en publicaciones de empleo de gestión, consultoría, ventas y educación. Una investigación de Prezi encontró que el 70% de los profesionales empleados consideran las habilidades de presentación críticas para el éxito profesional. En firmas de consultoría como McKinsey y BCG, la capacidad de crear y realizar presentaciones a nivel ejecutivo es un criterio de evaluación central.\n\nEn un currículum, las habilidades de presentación demuestran tu capacidad para sintetizar información, influir en stakeholders e impulsar decisiones. Son particularmente valoradas en roles donde la aceptación interna o la persuasión del cliente impactan directamente los ingresos.',
    keywords: ['habilidades de presentación currículum', 'capacidades de presentación CV', 'habilidades de diapositivas empleo', 'presentación de negocios currículum'],
    searchIntents: ['cómo destacar habilidades de presentación en currículum', 'ejemplos de habilidades de presentación para CV', 'experiencia en presentaciones de negocios currículum'],
    relatedSkills: ['Hablar en Público', 'Visualización de Datos', 'Narrativa', 'Comunicación', 'Diseño de Diapositivas', 'Persuasión', 'Presencia Ejecutiva'],
    professionSlugs: ['consultor-de-gestion', 'gerente-de-producto', 'gerente-de-ventas', 'gerente-de-capacitacion', 'ejecutivo-de-cuentas', 'consultor-de-estrategia'],
    atsKeywords: ['habilidades de presentación', 'creación de presentaciones', 'presentaciones ejecutivas', 'visualización de datos', 'PowerPoint', 'Google Slides', 'Keynote', 'presentaciones de negocios', 'presentaciones a stakeholders', 'narrativa visual'],
    resumeTips: [
      'Especifica el nivel de audiencia: presentaciones a juntas directivas tienen más peso que actualizaciones a nivel de equipo.',
      'Menciona herramientas y plataformas utilizadas (PowerPoint, Keynote, Prezi, Tableau) para satisfacer los escaneos de palabras clave ATS.',
      'Cuantifica resultados: negocios cerrados, presupuestos aprobados o puntuaciones de retroalimentación recibidas después de presentaciones.',
      'Destaca la frecuencia y escala de las presentaciones para mostrar práctica consistente.',
      'Menciona cualquier capacitación en diseño de presentaciones o narrativa completada.'
    ],
    exampleBullets: [
      'Creó y realizó más de 40 presentaciones ejecutivas por trimestre para stakeholders de nivel C, asegurando la aprobación de iniciativas por un total de $12M en inversión anual.',
      'Diseñó un marco de presentación estandarizado adoptado por un equipo de consultoría de 25 personas, reduciendo el tiempo de preparación de presentaciones en un 50% y mejorando las puntuaciones de satisfacción del cliente en un 18%.',
      'Presentó revisiones trimestrales de negocio basadas en datos usando dashboards de Tableau a una audiencia de 30 directores regionales, impulsando una mejora del 15% en KPIs operativos.',
      'Ganó la competencia anual de pitch de ventas de la empresa contra 50 participantes, con una presentación que generó $850K en compromisos de nuevos clientes.'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades de presentación sin listarlas como un rasgo genérico?', answer: 'Incorpora logros de presentación dentro de tus viñetas de experiencia. Menciona presentaciones específicas creadas, audiencias a las que te dirigiste, resultados logrados y herramientas utilizadas. Esto proporciona evidencia en lugar de una autoevaluación.' },
      { question: '¿Las habilidades de presentación virtual son diferentes de las presenciales en un currículum?', answer: 'Sí. Las presentaciones virtuales requieren técnicas específicas: presencia ante webcam, dominio de compartir pantalla, herramientas de engagement interactivo y diseño conciso de diapositivas para pantallas más pequeñas. Mencionar experiencia en presentaciones virtuales es cada vez más valorado en ofertas de trabajo remotas e híbridas.' },
      { question: '¿Debo incluir un enlace de portafolio a mis presentaciones?', answer: 'Si es apropiado para el rol, vincular a un perfil de SlideShare, webinar grabado o presentación en conferencia puede demostrar poderosamente tus habilidades. Esto es especialmente efectivo para posiciones de consultoría, capacitación y liderazgo de pensamiento.' }
    ]
  },
  'active-listening': {
    slug: 'escucha-activa',
    title: 'Escucha Activa',
    description: 'La escucha activa es una técnica de comunicación que implica concentrarse completamente en, comprender, responder y recordar lo que se dice. Desarrollada a partir del enfoque de terapia centrada en la persona de Carl Rogers, la escucha activa va más allá de la audición pasiva para incluir parafraseo, hacer preguntas clarificadoras, reflejar emociones y proporcionar retroalimentación no verbal como contacto visual y asentir.\n\nEn contextos profesionales, la escucha activa se manifiesta en la recopilación de requisitos, llamadas de descubrimiento con clientes, mediación de conflictos, evaluaciones de desempeño y entrevistas con stakeholders. Los profesionales usan técnicas como LAER (Escuchar, Reconocer, Explorar, Responder) y el marco HEARD (Escuchar, Empatizar, Disculparse, Resolver, Diagnosticar) para procesar y responder sistemáticamente a la información.\n\nLa escucha activa es fundamental para la inteligencia emocional y es un prerrequisito para la negociación, el coaching y el liderazgo efectivos. Una investigación publicada en el International Journal of Listening muestra que los oyentes activos retienen un 40% más de información y construyen relaciones interpersonales más fuertes que los oyentes pasivos.',
    whyImportant: 'La escucha activa es una habilidad diferenciadora que sustenta casi todos los roles de atención al cliente y liderazgo. Los estudios muestran que los gerentes que practican la escucha activa tienen equipos con puntuaciones de engagement un 25% más altas. En ventas, la escucha activa durante llamadas de descubrimiento se correlaciona con un aumento del 30% en tasas de cierre según la investigación de Gong.io.\n\nListar la escucha activa en un currículum señala inteligencia emocional, empatía con el cliente y la capacidad de recopilar requisitos precisos — todo crítico para roles de consultoría, RRHH, asesoramiento y gestión de proyectos.',
    keywords: ['habilidades de escucha activa currículum', 'escucha activa habilidades laborales', 'habilidades de escucha CV', 'escucha activa lugar de trabajo'],
    searchIntents: ['cómo demostrar escucha activa en currículum', 'ejemplos de escucha activa para solicitud de empleo', 'por qué importa la escucha activa en el trabajo'],
    relatedSkills: ['Empatía', 'Inteligencia Emocional', 'Comunicación', 'Resolución de Conflictos', 'Coaching', 'Negociación', 'Asesoramiento', 'Habilidades Interpersonales'],
    professionSlugs: ['consejero-de-carrera', 'gerente-de-recursos-humanos', 'trabajador-social', 'mediador', 'reclutador', 'consejero-de-carrera'],
    atsKeywords: ['escucha activa', 'habilidades de escucha', 'escucha empática', 'descubrimiento de clientes', 'recopilación de requisitos', 'entrevistas con stakeholders', 'incorporación de retroalimentación', 'evaluación de necesidades', 'escucha reflexiva'],
    resumeTips: [
      'Demuestra la escucha activa a través de resultados: requisitos precisos recopilados, satisfacción del cliente mejorada, conflictos resueltos.',
      'Menciona contextos específicos donde la escucha fue crítica: sesiones de descubrimiento, entrevistas con usuarios, mediación, coaching.',
      'Combina la escucha activa con un resultado, como reducción de cambios de alcance del proyecto o mejor retención de clientes.',
      'Referencia marcos de escucha estructurada si aplica (LAER, entrevista motivacional).'
    ],
    exampleBullets: [
      'Condujo más de 200 sesiones de descubrimiento con clientes usando técnicas de escucha activa, logrando una tasa de precisión de requisitos del 95% y reduciendo las solicitudes de cambio de alcance en un 40%.',
      'Medió 30 conflictos laborales a través de la escucha empática y el diálogo estructurado, resolviendo el 90% sin escalación a liderazgo de RRHH.',
      'Lideró entrevistas de investigación de usuarios con 150 participantes, sintetizando retroalimentación en 12 mejoras accionables de producto que aumentaron la satisfacción del usuario en un 28%.',
      'Implementó capacitación en escucha activa para un equipo de servicio al cliente de 20 personas, resultando en una disminución del 35% en quejas de clientes dentro de 6 meses.'
    ],
    faqs: [
      { question: '¿Cómo demuestro la escucha activa en un currículum si no es directamente medible?', answer: 'Muestra resultados que requirieron una escucha fuerte: documentación precisa de requisitos, altas puntuaciones de satisfacción del cliente, resultados exitosos de mediación o bajas tasas de error en entregables para clientes. Estos resultados implican escucha activa sin declararlo como un rasgo genérico.' },
      { question: '¿Es relevante la escucha activa para roles técnicos?', answer: 'Absolutamente. La recopilación de requisitos, revisiones de código, programación en pares y retrospectivas de sprint requieren escucha activa. Los profesionales técnicos que escuchan bien producen soluciones más precisas y menos ciclos de retrabajo.' },
      { question: '¿Cuál es la diferencia entre escucha activa y oír?', answer: 'Oír es la recepción pasiva de sonido. La escucha activa es un proceso deliberado que involucra atención, interpretación y respuesta. Incluye parafrasear para confirmar la comprensión, hacer preguntas de profundización y reservar el juicio hasta que el hablante termine. Esta distinción importa porque los empleadores quieren miembros del equipo que realmente comprendan, no solo oigan.' }
    ]
  },
  'written-communication': {
    slug: 'comunicacion-escrita',
    title: 'Comunicación Escrita',
    description: 'La comunicación escrita es la capacidad de transmitir ideas, instrucciones e información de manera clara y efectiva a través del texto. Esto abarca correos electrónicos de negocios, informes, propuestas, documentación, memorandos y comunicaciones digitales. La comunicación escrita sólida sigue principios de claridad, concisión, coherencia y conciencia de la audiencia, como se describe en marcos como el modelo de legibilidad Flesch-Kincaid y el movimiento Plain Language respaldado por gobiernos de todo el mundo.\n\nEn entornos profesionales, la comunicación escrita incluye redactar propuestas persuasivas, escribir SOPs claros, documentar procesos, crear entregables para clientes y componer resúmenes ejecutivos. Los profesionales avanzados aplican técnicas como la pirámide invertida (periodismo), BLUF (Bottom Line Up Front de la comunicación militar) y el marco SCQA (Situación, Complicación, Pregunta, Respuesta) de Barbara Minto.\n\nCon el auge del trabajo distribuido, la comunicación escrita se ha vuelto aún más crítica. Los mensajes de Slack, páginas de Confluence, descripciones de pull requests en GitHub e informes de proyectos son ahora canales de comunicación primarios, haciendo que la escritura sólida sea un multiplicador de productividad.',
    whyImportant: 'Según un estudio de Grammarly y Harris Poll, las empresas pierden un promedio de $12,506 por empleado al año debido a la mala comunicación escrita. Más del 80% de los gerentes de contratación citan la calidad de escritura como un factor clave en las decisiones de promoción. En organizaciones remotas, la comunicación escrita es el medio principal para la alineación y la toma de decisiones.\n\nEn un currículum, la comunicación escrita sólida se evidencia por el currículum mismo. Más allá de eso, los empleadores buscan experiencia produciendo informes, documentación, propuestas y entregables para clientes. Es especialmente valorada en roles de consultoría, legal, educación y marketing.',
    keywords: ['habilidades de comunicación escrita currículum', 'escritura de negocios currículum', 'habilidades de escritura CV', 'habilidades de escritura profesional'],
    searchIntents: ['cómo mostrar habilidades de escritura en currículum', 'ejemplos de comunicación escrita para empleo', 'habilidades de escritura de negocios para carrera'],
    relatedSkills: ['Escritura de Negocios', 'Etiqueta de Correo Electrónico', 'Escritura Técnica', 'Narrativa', 'Comunicación', 'Edición', 'Documentación', 'Redacción de Informes'],
    professionSlugs: ['especialista-en-relaciones-publicas', 'periodista', 'abogado', 'consultor-de-gestion', 'maestro', 'director-de-organizacion-sin-fines-de-lucro'],
    atsKeywords: ['comunicación escrita', 'escritura de negocios', 'redacción de informes', 'redacción de propuestas', 'documentación', 'escritura técnica', 'redacción publicitaria', 'edición', 'resúmenes ejecutivos', 'creación de contenido', 'SOPs'],
    resumeTips: [
      'Tu currículum en sí es una muestra de escritura — asegúrate de que sea impecable en gramática, estructura y claridad.',
      'Menciona tipos específicos de documentos producidos: propuestas, white papers, SOPs, informes para clientes, comunicados de prensa.',
      'Cuantifica la producción: número de documentos producidos, audiencias alcanzadas o tasas de aprobación logradas.',
      'Destaca escritura que impulsó resultados de negocio: propuestas que ganaron contratos, documentación que redujo tickets de soporte.'
    ],
    exampleBullets: [
      'Redactó más de 50 propuestas para clientes con un promedio de 20 páginas cada una, logrando una tasa de éxito del 42% y generando $3.2M en ingresos de nuevos negocios.',
      'Creó una biblioteca integral de SOPs de 80 documentos para el departamento de operaciones, reduciendo el tiempo de incorporación en un 35% y los costos de capacitación en $60,000 anuales.',
      'Escribió y editó un boletín mensual distribuido a 15,000 suscriptores, aumentando las tasas de apertura del 18% al 34% en 12 meses.',
      'Redactó informes de cumplimiento regulatorio para 3 agencias gubernamentales, pasando todas las auditorías con cero hallazgos durante 2 años consecutivos.'
    ],
    faqs: [
      { question: '¿Qué tan importante es la comunicación escrita comparada con la verbal en el lugar de trabajo actual?', answer: 'Ambas son esenciales, pero la comunicación escrita ha ganado importancia relativa con el trabajo remoto. Los mensajes escritos son asincrónicos, permanentes y escalables. Muchas decisiones ahora se documentan y debaten por escrito vía Slack, correo electrónico o documentos compartidos en lugar de en reuniones.' },
      { question: '¿Debo mencionar herramientas de escritura específicas en mi currículum?', answer: 'Sí. Herramientas como Grammarly, Hemingway Editor, Google Docs, Confluence, Notion y SharePoint demuestran experiencia práctica en flujos de trabajo de escritura. Para roles especializados, menciona herramientas como Madcap Flare, Adobe FrameMaker o editores de Markdown.' },
      { question: '¿Cómo demuestro habilidades de escritura sólidas en un rol que no es de escritura?', answer: 'Menciona documentación que creaste, procesos que documentaste, informes que redactaste o correos de clientes que gestionaste. Incluso en roles técnicos, escribir descripciones de pull requests, documentos de diseño y runbooks demuestra una comunicación escrita sólida.' }
    ]
  },
  'business-writing': {
    slug: 'escritura-de-negocios',
    title: 'Escritura de Negocios',
    description: 'La escritura de negocios es la aplicación especializada de la comunicación escrita para propósitos profesionales y comerciales. Incluye propuestas, planes de negocio, resúmenes ejecutivos, memorandos, correspondencia formal, respuestas a RFP e informes para stakeholders. La escritura de negocios efectiva prioriza la claridad, precisión y capacidad de acción mientras se adhiere al tono y estándares de formato profesionales.\n\nLos marcos clave incluyen el Principio de la Pirámide de Minto para estructurar argumentos, el modelo AIDA (Atención, Interés, Deseo, Acción) para escritura persuasiva y las 7 Cs de la comunicación empresarial (Clara, Concisa, Concreta, Correcta, Coherente, Completa, Cortés). Los escritores de negocios también entienden las convenciones de formato para diferentes tipos de documentos e industrias.\n\nLa escritura de negocios moderna se extiende a formatos digitales incluyendo artículos de LinkedIn, publicaciones de blog para liderazgo de pensamiento, estudios de caso e informes basados en datos. La capacidad de escribir casos de negocio convincentes que aseguren financiamiento, ganen clientes o alineen al liderazgo es una habilidad de alto valor en roles de gestión, consultoría y ejecutivos.',
    whyImportant: 'La escritura de negocios impacta directamente los ingresos y la eficiencia operativa. Según una encuesta de Josh Bernoff, los profesionales dedican 25.5 horas por semana leyendo comunicaciones de negocios, y los materiales mal escritos desperdician un estimado del 6% de ese tiempo. Las empresas que invierten en capacitación de escritura de negocios ven una mejora del 20-30% en tasas de éxito de propuestas.\n\nDemostrar habilidades de escritura de negocios en un currículum es particularmente valioso para roles de consultoría, estrategia y atención al cliente donde los entregables escritos son la producción principal. Señala la capacidad de influir en decisiones a través de documentación estructurada y persuasiva.',
    keywords: ['habilidades de escritura de negocios currículum', 'escritura profesional currículum', 'escritura de negocios carrera', 'habilidades de redacción de propuestas'],
    searchIntents: ['cómo listar escritura de negocios en currículum', 'habilidades de escritura de negocios para solicitud de empleo', 'ejemplos de escritura de negocios para CV'],
    relatedSkills: ['Comunicación Escrita', 'Redacción de Propuestas', 'Redacción de Informes', 'Comunicación Ejecutiva', 'Narrativa', 'Persuasión', 'Edición', 'Etiqueta de Correo Electrónico'],
    professionSlugs: ['consultor-de-gestion', 'consultor-de-estrategia', 'especialista-en-relaciones-publicas', 'abogado', 'ejecutivo-de-cuentas', 'director-de-organizacion-sin-fines-de-lucro'],
    atsKeywords: ['escritura de negocios', 'redacción de propuestas', 'resúmenes ejecutivos', 'correspondencia empresarial', 'redacción de informes', 'respuestas a RFP', 'planes de negocio', 'informes para stakeholders', 'escritura profesional', 'estudios de caso'],
    resumeTips: [
      'Especifica los tipos de documentos empresariales que has redactado: propuestas, casos de negocio, RFPs, white papers.',
      'Cuantifica el impacto de tu escritura: contratos ganados, financiamiento asegurado, aprobaciones obtenidas.',
      'Menciona experiencia de escritura específica de la industria (escritos legales, entregables de consultoría, solicitudes de subvenciones).',
      'Destaca prácticas de edición y aseguramiento de calidad que aseguraron precisión en documentos de alto riesgo.',
      'Referencia cualquier capacitación formal o certificaciones en escritura de negocios completadas.'
    ],
    exampleBullets: [
      'Redactó 25 respuestas a RFP al año para contratos gubernamentales, manteniendo una tasa de éxito del 38% y generando $8.5M en nuevos ingresos durante 3 años.',
      'Escribió un caso de negocio que aseguró $4.2M en financiamiento ejecutivo para una iniciativa de transformación digital, incluyendo proyecciones de ROI validadas por el equipo financiero.',
      'Creó estudios de caso y white papers para clientes que generaron 3,500 leads calificados de marketing y apoyaron un aumento del 22% en el valor del pipeline.',
      'Desarrolló una guía de estilo de escritura de negocios adoptada por más de 150 empleados en 4 oficinas, mejorando la consistencia de documentos y reduciendo los ciclos de revisión en un 30%.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre escritura de negocios y escritura creativa en un currículum?', answer: 'La escritura de negocios prioriza claridad, brevedad y capacidad de acción para audiencias profesionales. La escritura creativa enfatiza estilo, narrativa y expresión artística. En un currículum, la escritura de negocios es relevante para roles corporativos, mientras que la escritura creativa aplica a posiciones de contenido, copywriting y editoriales. Algunos roles, como marketing, requieren elementos de ambas.' },
      { question: '¿Cómo mejoro mi escritura de negocios para el avance profesional?', answer: 'Estudia marcos como el Principio de la Pirámide, practica escribir resúmenes ejecutivos y busca retroalimentación de colegas senior. Cursos de instituciones como Harvard Business School Online o la especialización de Business Writing de Coursera proporcionan caminos de mejora estructurados.' },
      { question: '¿Debo incluir muestras de escritura de negocios con mi solicitud de empleo?', answer: 'Si la oferta de trabajo solicita muestras de escritura, absolutamente. De lo contrario, ofrece proporcionar muestras durante el proceso de entrevista. Para roles de consultoría y estrategia, tener un portafolio de entregables anonimizados, propuestas o artículos publicados demuestra competencia más efectivamente que cualquier viñeta de currículum.' }
    ]
  },
  'email-etiquette': {
    slug: 'etiqueta-de-correo-electronico',
    title: 'Etiqueta de Correo Electrónico',
    description: 'La etiqueta de correo electrónico se refiere al conjunto de directrices y mejores prácticas para componer, enviar y gestionar comunicaciones profesionales por correo electrónico. Abarca claridad en el asunto, saludos y despedidas apropiados, gestión del tono, disciplina de responder a todos, uso de CC/CCO, convenciones de archivos adjuntos y expectativas de tiempo de respuesta.\n\nLa etiqueta profesional de correo electrónico sigue el principio de respetar el tiempo y la atención del destinatario. Las mejores prácticas incluyen usar el formato BLUF (Bottom Line Up Front), mantener los correos bajo cinco oraciones cuando sea posible, usar viñetas para múltiples elementos y declarar claramente las acciones requeridas con plazos. Los profesionales avanzados entienden la etiqueta de hilos de correo, protocolos de fuera de oficina y convenciones de escalación.\n\nEn la era del trabajo remoto y la sobrecarga de comunicación digital, la etiqueta de correo también incluye saber cuándo NO enviar un correo — cuando un mensaje de Slack, una llamada telefónica o una reunión sería más apropiado. Las organizaciones que establecen normas claras de correo electrónico ven mejoras medibles en la productividad de los empleados y reducción de la fatiga comunicativa.',
    whyImportant: 'El profesional promedio envía y recibe 121 correos electrónicos al día según el Radicati Group. La mala etiqueta de correo electrónico desperdicia tiempo, crea confusión y puede dañar relaciones profesionales. Los estudios muestran que la mala comunicación por correo lleva al 64% de los malentendidos en el lugar de trabajo.\n\nLa etiqueta de correo electrónico es especialmente importante para roles de atención al cliente, asistentes ejecutivos, profesionales de ventas y gerentes. Aunque rara vez se lista como una habilidad independiente en el currículum, demostrar competencia en correo electrónico a través de logros comunicativos señala profesionalismo y atención al detalle.',
    keywords: ['etiqueta de correo currículum', 'habilidades de correo profesional', 'comunicación por correo empleo', 'habilidades de correo de negocios'],
    searchIntents: ['cómo mostrar habilidades de correo en currículum', 'etiqueta de correo para solicitud de empleo', 'habilidades de comunicación profesional por correo'],
    relatedSkills: ['Comunicación Escrita', 'Escritura de Negocios', 'Comunicación', 'Atención al Detalle', 'Gestión del Tiempo', 'Organización', 'Profesionalismo'],
    professionSlugs: ['ejecutivo-de-cuentas', 'reclutador', 'representante-de-servicio-al-cliente', 'gerente-de-recursos-humanos', 'gerente-de-ventas', 'planificador-de-eventos'],
    atsKeywords: ['comunicación por correo electrónico', 'correspondencia profesional', 'gestión de correo', 'comunicación con clientes', 'correspondencia empresarial', 'comunicación digital', 'comunicación con stakeholders', 'email marketing', 'comunicación CRM'],
    resumeTips: [
      'En lugar de listar "etiqueta de correo electrónico", demuéstrala a través de logros en comunicación con clientes.',
      'Menciona métricas de campañas de correo si es relevante: tasas de apertura, tasas de respuesta, tasas de conversión.',
      'Destaca experiencia gestionando comunicación de alto volumen por correo con clientes o stakeholders.',
      'Referencia herramientas CRM utilizadas para seguimiento de correo y gestión de relaciones (Salesforce, HubSpot).'
    ],
    exampleBullets: [
      'Gestionó un portafolio de 85 cuentas de clientes por correo electrónico, manteniendo un tiempo de respuesta promedio de 4 horas y logrando una calificación de satisfacción del cliente del 97%.',
      'Implementó plantillas de comunicación por correo para el equipo de ventas de 15 personas, reduciendo el tiempo promedio de redacción de correos en un 40% y mejorando la consistencia de respuestas.',
      'Coordinó la logística de eventos por correo electrónico con más de 50 proveedores simultáneamente, asegurando cero plazos perdidos en 12 eventos anuales.',
      'Optimizó los flujos de comunicación con candidatos en el ATS, reduciendo el volumen de correo de reclutadores en un 30% mientras mantenía una puntuación de experiencia del candidato del 92%.'
    ],
    faqs: [
      { question: '¿La etiqueta de correo electrónico sigue siendo relevante con Slack y Teams volviéndose dominantes?', answer: 'Sí. El correo electrónico sigue siendo el canal principal para comunicación externa, documentación formal e interacciones con clientes. Las herramientas de mensajería interna complementan pero no reemplazan el correo electrónico. Los profesionales necesitan dominio en ambos canales, entendiendo cuándo cada uno es apropiado.' },
      { question: '¿Cómo menciono habilidades de correo sin sonar demasiado básico?', answer: 'Enmarca las habilidades de correo dentro de un contexto de comunicación más amplio: "Gestionó comunicaciones con clientes a través de correo electrónico, CRM y canales telefónicos." Enfócate en volumen, tiempos de respuesta y resultados en lugar de la mecánica de enviar correos.' },
      { question: '¿Qué herramientas de correo debo mencionar en mi currículum?', answer: 'Menciona plataformas CRM (Salesforce, HubSpot), herramientas de email marketing (Mailchimp, Constant Contact) y herramientas de productividad (Outlook, Gmail con funciones avanzadas). Estas demuestran competencia técnica junto con habilidades de comunicación.' }
    ]
  },
  'storytelling': {
    slug: 'narrativa',
    title: 'Narrativa',
    description: 'La narrativa en un contexto profesional es la capacidad de usar la estructura narrativa para comunicar ideas, persuadir audiencias y crear conexiones emocionales. Aplica los fundamentos de la narrativa — personaje, conflicto, resolución — a presentaciones de negocios, campañas de marketing, gestión del cambio y comunicación de liderazgo.\n\nLos marcos para la narrativa profesional incluyen el Viaje del Héroe (Joseph Campbell) adaptado para negocios construyendo narrativas de clientes o empresas, la estructura narrativa de Pixar ("Había una vez... Todos los días... Un día... Debido a eso...") y el modelo de narrativa de presentaciones de Nancy Duarte que contrasta "lo que es" con "lo que podría ser". La narrativa de datos combina la narrativa con la visualización para hacer que los hallazgos analíticos sean convincentes y accionables.\n\nLa narrativa es una habilidad crítica para líderes, mercadólogos y consultores que deben inspirar acción, ganar aceptación y diferenciar su mensaje. La investigación del profesor de Stanford Chip Heath muestra que las historias se recuerdan hasta 22 veces más que los hechos solos.',
    whyImportant: 'La narrativa es cada vez más valorada en los negocios a medida que las organizaciones compiten por atención en mercados saturados. Según datos de LinkedIn, la narrativa está entre las cinco habilidades creativas más demandadas. En ventas, los pitches basados en narrativa logran tasas de cierre un 30% más altas comparadas con presentaciones basadas en características.\n\nEn un currículum, la capacidad narrativa señala creatividad, inteligencia emocional y la capacidad de influir en stakeholders. Es especialmente valorada en roles de marketing, relaciones públicas, consultoría, capacitación y liderazgo ejecutivo.',
    keywords: ['habilidades narrativas currículum', 'narrativa de negocios carrera', 'habilidades de narrativa CV', 'narrativa solicitud de empleo'],
    searchIntents: ['cómo destacar narrativa en currículum', 'habilidades narrativas para negocios', 'ejemplos profesionales de narrativa'],
    relatedSkills: ['Habilidades de Presentación', 'Hablar en Público', 'Persuasión', 'Pensamiento Creativo', 'Comunicación', 'Visualización de Datos', 'Estrategia de Contenido', 'Gestión de Marca'],
    professionSlugs: ['especialista-en-relaciones-publicas', 'periodista', 'consultor-de-gestion', 'gerente-de-capacitacion', 'gerente-de-ventas', 'director-de-organizacion-sin-fines-de-lucro'],
    atsKeywords: ['narrativa', 'desarrollo narrativo', 'narrativa de marca', 'narrativa de datos', 'narrativa de contenido', 'narrativa visual', 'narrativa de negocios', 'engagement de audiencia', 'comunicación persuasiva'],
    resumeTips: [
      'Demuestra la narrativa a través de resultados de campañas, resultados de presentaciones o métricas de rendimiento de contenido.',
      'Menciona la narrativa de datos específicamente si combinas narrativa con analítica o visualización.',
      'Referencia marcos narrativos que aplicas: Viaje del Héroe, SCQA, método Duarte.',
      'Destaca la narrativa en diferentes medios: presentaciones, video, contenido escrito, redes sociales.',
      'Conecta la narrativa con resultados de negocio: tasas de engagement, tasas de conversión, aceptación de stakeholders.'
    ],
    exampleBullets: [
      'Desarrolló una estrategia de narrativa de marca que aumentó el engagement en redes sociales en un 145% y creció la audiencia de 12,000 a 45,000 seguidores en 8 meses.',
      'Creó presentaciones narrativas basadas en datos para reuniones trimestrales con inversionistas, contribuyendo a una ronda exitosa de financiamiento Serie B de $15M.',
      'Produjo 24 videos de historias de éxito de clientes que generaron más de 500,000 vistas y se les atribuyó influir en el 18% de nuevos negocios empresariales.',
      'Diseñó una metodología de ventas basada en narrativa adoptada por un equipo de 30 personas, aumentando el tamaño promedio de negocio en un 25% ($120K a $150K).'
    ],
    faqs: [
      { question: '¿Cómo es diferente la narrativa de hablar en público?', answer: 'La narrativa es una estrategia de contenido — cómo estructuras y enmarcas la información usando narrativa. Hablar en público es una habilidad de entrega — cómo presentas contenido a una audiencia. Los presentadores fuertes combinan ambas: narrativa para la estructura del contenido y oratoria para una entrega impactante.' },
      { question: '¿Se puede usar la narrativa en roles con muchos datos?', answer: 'Absolutamente. La narrativa de datos — combinar hallazgos analíticos con contexto narrativo — es una de las habilidades más buscadas en analítica y consultoría. Herramientas como Tableau y Power BI apoyan la narrativa de datos, y la capacidad de convertir números en narrativas es lo que separa a los analistas senior de los junior.' },
      { question: '¿Cómo desarrollo habilidades narrativas para uso profesional?', answer: 'Estudia marcos narrativos (Viaje del Héroe, estructura narrativa de Pixar), practica convertir datos en historias, analiza TED Talks por su estructura y lee libros como "Made to Stick" de Chip y Dan Heath o "Resonate" de Nancy Duarte. La práctica regular en presentaciones y escritura construye esta habilidad con el tiempo.' }
    ]
  },
  'persuasion': {
    slug: 'persuasion',
    title: 'Persuasión',
    description: 'La persuasión es la capacidad de influir en las actitudes, creencias o comportamientos de otros a través de argumentación lógica, apelación emocional y credibilidad. Fundamentada en los seis principios de influencia de Robert Cialdini — reciprocidad, compromiso/consistencia, prueba social, autoridad, simpatía y escasez — la persuasión es una habilidad fundamental para ventas, liderazgo, negociación y gestión de stakeholders.\n\nLa persuasión profesional va más allá de la manipulación; implica entender las necesidades de la audiencia, enmarcar propuestas en términos de sus intereses, proporcionar evidencia convincente y construir confianza a través de la consistencia y la experiencia. Las técnicas incluyen el método socrático (guiar a través de preguntas), la técnica del pie en la puerta (comenzar con solicitudes pequeñas) y efectos de enmarcado (presentar opciones de maneras que resalten los beneficios).\n\nEn entornos de negocios, la persuasión se manifiesta en presentaciones de pitch, comunicaciones de gestión del cambio, justificaciones de presupuesto, negociaciones con clientes e influencia multifuncional donde la autoridad formal puede no existir. Los persuasores efectivos combinan datos, narrativa e inteligencia emocional para mover audiencias hacia resultados deseados.',
    whyImportant: 'La persuasión es una competencia central para roles generadores de ingresos y de liderazgo. Los profesionales de ventas con fuertes habilidades de persuasión cierran un 20-35% más de negocios según la investigación de HubSpot. Los líderes que persuaden en lugar de mandar ven un 40% más de cumplimiento y engagement del equipo.\n\nEn un currículum, la persuasión señala la capacidad de influir sin autoridad, ganar negocios de clientes, asegurar la aceptación de stakeholders e impulsar el cambio organizacional. Es un diferenciador crítico para posiciones de consultoría, ventas, recaudación de fondos y ejecutivas.',
    keywords: ['habilidades de persuasión currículum', 'habilidades de influencia CV', 'comunicación persuasiva empleo', 'habilidades de persuasión carrera'],
    searchIntents: ['cómo mostrar habilidades de persuasión en currículum', 'técnicas de persuasión para solicitud de empleo', 'ejemplos de habilidades de persuasión para carrera'],
    relatedSkills: ['Negociación', 'Ventas', 'Narrativa', 'Comunicación', 'Inteligencia Emocional', 'Habilidades de Presentación', 'Influencia', 'Gestión de Stakeholders'],
    professionSlugs: ['gerente-de-ventas', 'ejecutivo-de-cuentas', 'consultor-de-gestion', 'abogado', 'especialista-en-relaciones-publicas', 'diplomatico'],
    atsKeywords: ['persuasión', 'influencia', 'aceptación de stakeholders', 'adquisición de clientes', 'cierre de ventas', 'negociación', 'promoción del cambio', 'influencia ejecutiva', 'venta consultiva', 'influencia multifuncional'],
    resumeTips: [
      'Muestra persuasión a través de resultados: negocios cerrados, presupuestos aprobados, iniciativas adoptadas, objeciones superadas.',
      'Usa métricas que demuestren influencia: tasas de conversión, tasas de aprobación, porcentajes de adopción.',
      'Menciona contextos donde la persuasión fue crítica: presentaciones a juntas directivas, negociaciones con clientes, implementación de cambios.',
      'Destaca la persuasión a través de diferentes audiencias: ejecutivos, clientes, equipos multifuncionales, socios externos.',
      'Referencia marcos o metodologías de persuasión específicas utilizadas (Cialdini, venta consultiva, SPIN).'
    ],
    exampleBullets: [
      'Persuadió a 3 clientes empresariales para actualizar de paquetes estándar a premium, generando $1.4M en ingresos anuales incrementales a través de venta consultiva basada en valor.',
      'Aseguró patrocinio ejecutivo para una iniciativa de transformación digital de $3M presentando análisis de ROI y estrategias de mitigación de riesgos al nivel C.',
      'Influenció la adopción multifuncional de una nueva plataforma CRM en 5 departamentos y 200 usuarios, logrando una adopción voluntaria del 92% dentro de 90 días.',
      'Negoció renovaciones de contratos con proveedores ahorrando $450K anuales al enmarcar el valor de la asociación y aprovechar alternativas competitivas.'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades de persuasión sin sonar manipulador?', answer: 'Enmarca la persuasión como influencia colaborativa: identificaste necesidades de stakeholders, presentaste soluciones basadas en datos y lograste resultados mutuamente beneficiosos. Palabras como "influyó", "aseguró aceptación", "construyó consenso" y "abogó" transmiten persuasión profesionalmente.' },
      { question: '¿Es la persuasión diferente de las habilidades de ventas?', answer: 'La persuasión es más amplia que las ventas. Mientras que las ventas implican persuadir a clientes para comprar, la persuasión aplica a cualquier contexto donde necesites cambiar mentes: aprobaciones de presupuesto internas, alineación del equipo, negociaciones con proveedores o cambios de política. Las ventas son una aplicación de la persuasión.' },
      { question: '¿Qué principios de Cialdini debo referenciar en un currículum?', answer: 'No nombres los principios explícitamente. En su lugar, demuéstralos: prueba social (estudios de caso, testimonios), autoridad (experiencia, certificaciones), reciprocidad (enfoques de valor primero) y escasez (ofertas limitadas). Muestra los resultados que estos enfoques lograron.' }
    ]
  },
  'negotiation': {
    slug: 'negociacion',
    title: 'Negociación',
    description: 'La negociación es el proceso de alcanzar acuerdos mutuamente aceptables a través del diálogo, el compromiso y la comunicación estratégica. Basada en el método de negociación por principios del Harvard Negotiation Project (Getting to Yes de Fisher y Ury), la negociación efectiva separa a las personas de los problemas, se enfoca en intereses en lugar de posiciones, genera opciones para ganancia mutua e insiste en criterios objetivos.\n\nLa negociación profesional abarca discusiones de salario y compensación, negociaciones de contratos con proveedores, estructuración de acuerdos con clientes, acuerdos de asociación, resolución de conflictos y transacciones de M&A. Los negociadores avanzados entienden BATNA (Mejor Alternativa a un Acuerdo Negociado), ZOPA (Zona de Posible Acuerdo) y efectos de anclaje. Se preparan exhaustivamente investigando los intereses de la contraparte, estableciendo puntos de retirada y planificando estrategias de concesión.\n\nLos estilos de negociación van desde competitivos (ganar-perder) hasta colaborativos (ganar-ganar), con efectividad situacional dependiendo de la importancia de la relación, presión de tiempo y lo que está en juego. El modelo Thomas-Kilmann identifica cinco modos de manejo de conflictos que informan la selección del enfoque de negociación.',
    whyImportant: 'La negociación impacta directamente los resultados financieros de una organización. Los negociadores hábiles ahorran a sus empresas un 10-20% en costos de adquisición y aumentan los valores de acuerdos en un 15-30%. Según la American Management Association, la negociación es una habilidad top tres para gerentes y ejecutivos.\n\nEn un currículum, la negociación demuestra pensamiento estratégico, excelencia comunicativa y la capacidad de crear valor. Es esencial para roles de adquisiciones, ventas, legal, bienes raíces y gestión donde los términos contractuales, precios y asociaciones afectan directamente el desempeño financiero.',
    keywords: ['habilidades de negociación currículum', 'capacidades de negociación CV', 'habilidades de negociación de contratos', 'negociación de negocios currículum'],
    searchIntents: ['cómo listar habilidades de negociación en currículum', 'ejemplos de habilidades de negociación para empleo', 'experiencia en negociación de negocios currículum'],
    relatedSkills: ['Persuasión', 'Resolución de Conflictos', 'Comunicación', 'Pensamiento Analítico', 'Inteligencia Emocional', 'Toma de Decisiones', 'Gestión de Contratos', 'Gestión de Stakeholders'],
    professionSlugs: ['gerente-de-ventas', 'abogado', 'agente-de-bienes-raices', 'ejecutivo-de-cuentas', 'diplomatico', 'gerente-de-operaciones'],
    atsKeywords: ['negociación', 'negociación de contratos', 'negociación con proveedores', 'estructuración de acuerdos', 'negociación de precios', 'negociación salarial', 'acuerdos de asociación', 'resolución de conflictos', 'BATNA', 'negociación de adquisiciones', 'términos y condiciones'],
    resumeTips: [
      'Cuantifica resultados de negociación: dólares ahorrados, ingresos generados, mejoras porcentuales en términos contractuales.',
      'Especifica la escala y complejidad de las negociaciones: tamaños de acuerdos, número de partes involucradas, duración de contratos.',
      'Menciona contextos de negociación: adquisición de proveedores, acuerdos con clientes, acuerdos de asociación, relaciones laborales.',
      'Destaca tanto resultados de negociación competitiva como colaborativa para mostrar versatilidad.',
      'Referencia formación formal en negociación (Harvard PON, KARRASS, Scotwork) si fue completada.'
    ],
    exampleBullets: [
      'Negoció 45 contratos con proveedores por un total de $18M, logrando una reducción de costos promedio del 22% y ahorrando $3.96M durante los términos de los contratos.',
      'Cerró un acuerdo empresarial multianual por $2.8M estructurando términos de pago creativos y acuerdos de nivel de servicio que satisficieron a ambas partes.',
      'Lideró negociaciones con sindicatos laborales para una instalación de 500 empleados, alcanzando un acuerdo colectivo de 3 años que mantuvo la continuidad operativa dentro de un aumento de presupuesto del 4%.',
      'Renegoció 12 contratos de clientes por vencer, reteniendo el 100% de las cuentas y aumentando el valor promedio de contrato en un 18% ($65K por contrato).'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades de negociación si no he negociado grandes acuerdos?', answer: 'La negociación aplica a todos los niveles: discusiones de precios con proveedores, negociaciones de alcance de proyectos, asignación de recursos internos e incluso negociaciones salariales. Cuantifica cualquier escala en la que hayas trabajado y enfatiza la mejora porcentual lograda en lugar de montos absolutos en dólares.' },
      { question: '¿Debo mencionar marcos de negociación específicos en mi currículum?', answer: 'Mencionar marcos como la negociación por principios (modelo de Harvard) o análisis BATNA en una carta de presentación o entrevista muestra sofisticación. En el currículum mismo, enfócate en resultados en lugar de nombres de metodologías, pero lista la formación en negociación en secciones de certificaciones o desarrollo profesional.' },
      { question: '¿Es la negociación relevante para roles que no son de ventas?', answer: 'Sí. Los gerentes de proyecto negocian alcance y plazos, los profesionales de RRHH negocian ofertas y conflictos, y los consultores negocian términos de engagement. Casi todos los roles involucran alguna forma de negociación, ya sea con colegas, clientes, proveedores o liderazgo.' }
    ]
  },
  'conflict-resolution': {
    slug: 'resolucion-de-conflictos',
    title: 'Resolución de Conflictos',
    description: 'La resolución de conflictos es el proceso de identificar, abordar y resolver desacuerdos de manera constructiva. Se basa en el Instrumento de Modos de Conflicto Thomas-Kilmann que identifica cinco enfoques: competir, colaborar, comprometer, evitar y acomodar. La resolución efectiva de conflictos selecciona el enfoque apropiado según la urgencia de la situación, la importancia de la relación y lo que está en juego.\n\nLa resolución profesional de conflictos involucra técnicas de desescalación, resolución de problemas basada en intereses (del Harvard Negotiation Project), habilidades de mediación y prácticas restaurativas. Los profesionales diagnostican la causa raíz del conflicto — ya sea por escasez de recursos, ambigüedad de roles, rupturas comunicativas o diferencias de valores — y facilitan conversaciones estructuradas hacia la resolución.\n\nEn el lugar de trabajo, la resolución de conflictos aplica a disputas interpersonales, fricción entre departamentos, quejas de clientes, relaciones laborales y resistencia al cambio organizacional. El CPP Global Human Capital Report encontró que los empleados en EE.UU. dedican 2.8 horas por semana lidiando con conflictos, costando aproximadamente $359 mil millones anuales en horas pagadas.',
    whyImportant: 'El conflicto laboral sin resolver lleva a productividad disminuida, mayor rotación y culturas de equipo tóxicas. Según SHRM, los gerentes dedican un 20-40% de su tiempo gestionando conflictos laborales. Las organizaciones con culturas fuertes de resolución de conflictos reportan un 50% menos de rotación voluntaria y un 30% más de satisfacción de empleados.\n\nDemostrar habilidades de resolución de conflictos en un currículum es crítico para roles de gestión, RRHH, asesoramiento y legales. Señala madurez emocional, capacidad de liderazgo y la habilidad de mantener dinámicas de equipo productivas durante períodos de desacuerdo o cambio.',
    keywords: ['habilidades de resolución de conflictos currículum', 'gestión de conflictos CV', 'resolución de conflictos laborales', 'habilidades de resolución de disputas'],
    searchIntents: ['cómo mostrar resolución de conflictos en currículum', 'ejemplos de resolución de conflictos para empleo', 'habilidades de gestión de conflictos laborales'],
    relatedSkills: ['Mediación', 'Inteligencia Emocional', 'Escucha Activa', 'Negociación', 'Empatía', 'Comunicación', 'Liderazgo', 'Resolución de Problemas'],
    professionSlugs: ['gerente-de-recursos-humanos', 'mediador', 'trabajador-social', 'consejero-de-carrera', 'director-escolar', 'gerente-de-operaciones'],
    atsKeywords: ['resolución de conflictos', 'resolución de disputas', 'mediación', 'gestión de conflictos', 'desescalación', 'manejo de quejas', 'mediación laboral', 'relaciones con empleados', 'prácticas restaurativas', 'conflicto interpersonal'],
    resumeTips: [
      'Describe la resolución de conflictos a través de resultados medibles: disputas resueltas, escalaciones prevenidas, puntuaciones de satisfacción mejoradas.',
      'Menciona los tipos de conflictos gestionados: interpersonales, entre departamentos, disputas con clientes, relaciones laborales.',
      'Referencia formación formal o certificaciones en mediación o resolución de conflictos.',
      'Muestra la escala del impacto: tamaños de equipos afectados, frecuencia de situaciones de conflicto manejadas.',
      'Destaca mejoras sistémicas que hiciste para prevenir conflictos recurrentes.'
    ],
    exampleBullets: [
      'Medió más de 50 disputas laborales entre miembros del equipo en un departamento de 200 personas, resolviendo el 92% sin escalación formal a RRHH y reduciendo las quejas formales en un 60%.',
      'Implementó un marco estructurado de resolución de conflictos para un equipo de proyecto de 35 personas, disminuyendo los incidentes de fricción interpersonal en un 45% y mejorando la velocidad de sprint en un 20%.',
      'Facilitó la resolución de un conflicto interdepartamental entre equipos de ingeniería y ventas, restaurando la colaboración y recuperando una implementación de cliente estancada de $1.2M.',
      'Desarrolló e impartió capacitación en resolución de conflictos para 80 gerentes de primera línea, resultando en una mejora del 28% en las puntuaciones de encuestas de satisfacción de empleados dentro de un año.'
    ],
    faqs: [
      { question: '¿Cómo menciono resolución de conflictos sin implicar que trabajé en un ambiente tóxico?', answer: 'Enmarca el conflicto como una parte natural de equipos diversos y de alto rendimiento. Usa lenguaje como "facilitó la alineación", "conectó perspectivas diferentes" o "resolvió prioridades en competencia". Enfócate en la gestión proactiva de conflictos y los resultados positivos logrados.' },
      { question: '¿Qué certificaciones demuestran habilidades de resolución de conflictos?', answer: 'Las certificaciones relevantes incluyen Mediador Certificado (a través de organizaciones como la American Arbitration Association), SHRM-CP/SCP para profesionales de RRHH y certificados de resolución de conflictos de programas como Cornell ILR o el Harvard Negotiation Institute.' },
      { question: '¿La resolución de conflictos solo es relevante para roles de RRHH y gestión?', answer: 'No. Cada rol colaborativo se beneficia de las habilidades de resolución de conflictos. Los desarrolladores resuelven desacuerdos técnicos en revisiones de código, los consultores median expectativas de clientes y los profesores gestionan dinámicas del aula. Destaca la resolución de conflictos en el contexto más relevante para tu rol objetivo.' }
    ]
  },
  'leadership': {
    slug: 'liderazgo',
    title: 'Liderazgo',
    description: 'El liderazgo es la capacidad de inspirar, guiar y empoderar a individuos y equipos hacia el logro de metas compartidas. La teoría moderna de liderazgo abarca el liderazgo situacional (Hersey y Blanchard), el liderazgo transformacional (Bass y Burns), el liderazgo de servicio (Robert Greenleaf) y el liderazgo adaptativo (Heifetz y Linsky). Los líderes efectivos ajustan su estilo — dirigir, coaching, apoyar o delegar — según la madurez del equipo y las demandas situacionales.\n\nEl liderazgo en la práctica involucra establecimiento de visión, dirección estratégica, desarrollo de equipos, toma de decisiones bajo incertidumbre, gestión de stakeholders y formación de cultura organizacional. Se extiende más allá de la autoridad posicional para incluir liderazgo de pensamiento, liderazgo de proyectos e influencia informal. La investigación de Daniel Goleman identifica seis estilos de liderazgo (coercitivo, visionario, afiliativo, democrático, marcapasos, coaching), cada uno apropiado para diferentes contextos organizacionales.\n\nEn los lugares de trabajo contemporáneos, el liderazgo también abarca el liderazgo de equipos remotos, liderazgo intercultural, liderazgo del cambio y prácticas de liderazgo inclusivo. Los líderes que demuestran vulnerabilidad, creación de seguridad psicológica (Amy Edmondson) y mentalidad de crecimiento (Carol Dweck) impulsan mayores tasas de innovación y retención.',
    whyImportant: 'El liderazgo es la habilidad más citada en ofertas de empleo de nivel senior. La investigación de Gallup muestra que los gerentes representan el 70% de la varianza en las puntuaciones de engagement de los empleados. Las empresas con sólidos pipelines de liderazgo son 2.4 veces más propensas a alcanzar objetivos de desempeño financiero.\n\nEn un currículum, el liderazgo demuestra tu capacidad de impulsar resultados a través de otros, gestionar la complejidad y crear valor organizacional. Incluso para roles sin gestión, demostrar liderazgo a través de la propiedad de proyectos, iniciativa y mentoría fortalece significativamente la candidatura.',
    keywords: ['habilidades de liderazgo currículum', 'capacidades de liderazgo CV', 'experiencia de liderazgo empleo', 'liderazgo gerencial currículum'],
    searchIntents: ['cómo mostrar liderazgo en currículum', 'ejemplos de habilidades de liderazgo para solicitud de empleo', 'consejos de experiencia de liderazgo currículum'],
    relatedSkills: ['Gestión de Equipos', 'Delegación', 'Toma de Decisiones', 'Comunicación', 'Inteligencia Emocional', 'Coaching', 'Pensamiento Estratégico', 'Gestión del Cambio', 'Mentoría', 'Resolución de Conflictos'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-operaciones', 'gerente-general', 'director-escolar', 'director-de-organizacion-sin-fines-de-lucro', 'gerente-de-programas'],
    atsKeywords: ['liderazgo', 'liderazgo de equipo', 'gestión de personas', 'liderazgo organizacional', 'liderazgo estratégico', 'liderazgo de servicio', 'liderazgo transformacional', 'liderazgo ejecutivo', 'liderazgo del cambio', 'liderazgo multifuncional', 'desarrollo de liderazgo'],
    resumeTips: [
      'Cuantifica tu alcance de liderazgo: tamaños de equipo, presupuestos gestionados, número de reportes directos, alcance geográfico.',
      'Muestra progresión en responsabilidad de liderazgo para demostrar crecimiento.',
      'Destaca resultados específicos de liderazgo: crecimiento de ingresos, reducción de costos, mejora del engagement, tasas de retención.',
      'Menciona inversiones en desarrollo de liderazgo: coaching proporcionado, pipelines de talento construidos, planes de sucesión creados.',
      'Diferencia entre liderazgo posicional (rol formal) y liderazgo informal (liderazgo de proyectos, propiedad de iniciativas).'
    ],
    exampleBullets: [
      'Lideró un equipo multifuncional de 45 personas en 3 países, entregando un lanzamiento de producto de $6M 2 semanas antes de lo programado y un 8% por debajo del presupuesto.',
      'Creció el departamento de 12 a 38 empleados en 18 meses manteniendo una tasa de retención del 94% y logrando el 120% de los objetivos de ingresos anuales.',
      'Implementó un marco de liderazgo de servicio en una división de 100 personas, mejorando las puntuaciones de engagement de empleados del 68% al 87% dentro de un año.',
      'Mentoreó a 8 reportes directos, con 5 recibiendo promociones dentro de 2 años, construyendo el pipeline de liderazgo de la organización.',
      'Lideró una iniciativa de cambio organizacional que afectó a más de 500 empleados durante una fusión, manteniendo los niveles de productividad y logrando un 85% de satisfacción de empleados post-integración.'
    ],
    faqs: [
      { question: '¿Cómo muestro liderazgo en mi currículum si nunca he gestionado un equipo?', answer: 'El liderazgo no se limita a la gestión. Destaca liderazgo de proyectos, mentoría de colegas junior, liderazgo de iniciativas o comités, facilitación de reuniones o propiedad de mejoras de procesos. Usa verbos de acción como "encabezó", "impulsó", "orquestó" y "fue pionero".' },
      { question: '¿Qué estilos de liderazgo debo mencionar en mi currículum?', answer: 'En lugar de nombrar estilos teóricos, demuéstralos a través de ejemplos. Muestra adaptabilidad situacional: coaching a un miembro del equipo con dificultades, tomar decisiones decisivas bajo presión y empoderar a alto rendimiento con autonomía. Esto comunica implícitamente versatilidad de liderazgo.' },
      { question: '¿Es el liderazgo más importante que las habilidades técnicas para el avance profesional?', answer: 'En niveles senior, el liderazgo típicamente se convierte en el diferenciador principal. Las habilidades técnicas te abren la puerta; las habilidades de liderazgo determinan el avance. Sin embargo, los candidatos más fuertes combinan ambas. Para roles gerenciales, enfatiza liderazgo; para roles de contribuidor individual senior, enfatiza liderazgo técnico e influencia.' }
    ]
  },
  'team-management': {
    slug: 'gestion-de-equipos',
    title: 'Gestión de Equipos',
    description: 'La gestión de equipos es la capacidad de coordinar, motivar y desarrollar a un grupo de individuos para lograr objetivos colectivos. Abarca la formación de equipos (etapas de Tuckman: formación, tormenta, normalización, rendimiento, cierre), asignación de roles según fortalezas (Roles de Equipo de Belbin), gestión del desempeño, distribución de carga de trabajo y optimización de dinámicas de equipo.\n\nLos gerentes de equipo efectivos establecen metas claras usando marcos como OKRs (Objetivos y Resultados Clave) o metas SMART, crean estructuras de responsabilidad, facilitan reuniones individuales regulares y reuniones de equipo, y construyen seguridad psicológica para que los miembros del equipo puedan tomar riesgos e innovar. Gestionan personalidades diversas, resuelven conflictos interpersonales y alinean motivaciones individuales con objetivos del equipo usando modelos como la teoría de motivación-higiene de Herzberg.\n\nLa gestión moderna de equipos incluye la gestión de equipos remotos e híbridos, que requiere competencias adicionales en comunicación asincrónica, engagement virtual, toma de decisiones distribuida y dominio de herramientas de colaboración digital. La investigación del Project Aristotle de Google identificó la seguridad psicológica como el factor más importante en equipos de alto rendimiento.',
    whyImportant: 'La gestión de equipos es un requisito central para cualquier rol con reportes directos. Según Gallup, solo 1 de cada 10 personas posee el talento natural para gestionar, sin embargo los gerentes de equipo representan el 70% de la varianza en el engagement de los empleados. Las organizaciones con gerentes excelentes ven un 48% más de rentabilidad y un 22% más de productividad.\n\nDemostrar gestión de equipos en un currículum señala capacidad operativa, habilidades de desarrollo de personas y la capacidad de escalar la capacidad organizacional. Es esencial para posiciones de gerencia, dirección y VP en todas las industrias.',
    keywords: ['habilidades de gestión de equipos currículum', 'liderazgo de equipo CV', 'gestión de personas currículum', 'experiencia de gestión de equipos'],
    searchIntents: ['cómo mostrar gestión de equipos en currículum', 'ejemplos de gestión de equipos para CV', 'consejos de habilidades de gestión de personas currículum'],
    relatedSkills: ['Liderazgo', 'Delegación', 'Coaching', 'Gestión del Desempeño', 'Resolución de Conflictos', 'Comunicación', 'Establecimiento de Metas', 'Mentoría'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-operaciones', 'gerente-de-ventas', 'gerente-general', 'gerente-de-programas', 'gerente-de-capacitacion'],
    atsKeywords: ['gestión de equipos', 'gestión de personas', 'reportes directos', 'construcción de equipos', 'gestión del desempeño', 'gestión de fuerza laboral', 'desarrollo de equipos', 'engagement de empleados', 'gestión de talento', 'gestión de personal', 'coordinación de equipo'],
    resumeTips: [
      'Siempre especifica los tamaños de equipo gestionados — este es el cuantificador más importante para la gestión de equipos.',
      'Incluye detalles de composición del equipo: equipos multifuncionales, remotos, multi-ubicación o matriciales.',
      'Destaca métricas de rendimiento del equipo: mejoras de productividad, tasas de retención, puntuaciones de engagement.',
      'Menciona resultados de desarrollo de personas: promociones, programas de desarrollo de habilidades, planificación de sucesión.',
      'Muestra cómo escalaste equipos: contratación, incorporación y crecimiento de capacidades del equipo con el tiempo.'
    ],
    exampleBullets: [
      'Gestionó un equipo de 22 ingenieros de software en 3 zonas horarias, entregando el 95% de los compromisos de sprint y manteniendo una tasa de deserción voluntaria de solo el 5% contra un promedio de la industria del 13%.',
      'Construyó y escaló un equipo de éxito del cliente de 4 a 18 miembros en 12 meses, apoyando un crecimiento del 300% en cuentas de clientes mientras mantenía una tasa de retención del 96%.',
      'Implementó el marco OKR para un equipo de marketing de 30 personas, aumentando las tasas de cumplimiento de metas del 60% al 88% y alineando los esfuerzos del equipo con objetivos de ingresos de $4M.',
      'Realizó evaluaciones de desempeño trimestrales y reuniones individuales mensuales con 15 reportes directos, resultando en 6 promociones y cero terminaciones involuntarias en 2 años.'
    ],
    faqs: [
      { question: '¿Cómo diferencio la gestión de equipos del liderazgo en mi currículum?', answer: 'La gestión de equipos se enfoca en la ejecución operativa — coordinar trabajo, rastrear desempeño, realizar evaluaciones y mantener la salud del equipo. El liderazgo es más amplio, abarcando visión, estrategia e influencia organizacional. En un currículum, muestra ambos: las métricas operativas del equipo Y la dirección estratégica que estableciste.' },
      { question: '¿Qué si gestioné un equipo muy pequeño?', answer: 'Toda experiencia de gestión de equipos es válida. Para equipos pequeños, enfatiza la profundidad del impacto: mentoría proporcionada, habilidades desarrolladas y ganancias de productividad por persona. Un gerente que desarrolla a 3 personas a roles senior demuestra excelente gestión sin importar el tamaño del equipo.' },
      { question: '¿Debo listar la gestión de equipos por separado de mis títulos de puesto?', answer: 'Si la gestión de equipos es central para el rol, debe estar incorporada en tus descripciones de experiencia. Si fue una responsabilidad adicional (p.ej., un contribuidor individual senior que también gestionó 2 desarrolladores junior), destácalo como un logro distinto para mostrar capacidad de liderazgo.' }
    ]
  },
  'delegation': {
    slug: 'delegacion',
    title: 'Delegación',
    description: 'La delegación es la asignación estratégica de tareas, autoridad y responsabilidad a miembros del equipo basada en sus habilidades, necesidades de desarrollo y capacidad de carga de trabajo. La delegación efectiva sigue el marco RACI (Responsable, Aprobador, Consultado, Informado) para clarificar roles y prevenir superposiciones. También se alinea con la teoría de liderazgo situacional, donde el estilo de delegación (decir, vender, participar, delegar) se ajusta al nivel de competencia y compromiso del miembro del equipo.\n\nLos delegadores hábiles distinguen entre tareas que deben asumir y tareas que pueden desarrollar a otros. Proporcionan instrucciones claras incluyendo contexto, resultados esperados, plazos y autoridad para la toma de decisiones. El proceso de delegación incluye seleccionar a la persona correcta, comunicar la tarea, proporcionar recursos, monitorear el progreso sin microgestionar y dar retroalimentación al completar.\n\nLa delegación es frecuentemente citada como la habilidad más difícil de desarrollar para nuevos gerentes porque requiere soltar el control y confiar en otros. La investigación de la London Business School muestra que los líderes que delegan efectivamente son un 33% más productivos y reportan menores niveles de estrés mientras sus equipos muestran mayor engagement y desarrollo de habilidades.',
    whyImportant: 'La delegación es esencial para la escalabilidad de la gestión. Los gerentes que no delegan se convierten en cuellos de botella, limitando la capacidad del equipo y su propia contribución estratégica. Según Gallup, los CEO que sobresalen en delegación generan un 33% más de ingresos para sus organizaciones.\n\nEn un currículum, la delegación demuestra madurez gerencial, capacidad de construir confianza y priorización estratégica. Señala que puedes escalar operaciones empoderando a otros en lugar de hacer todo tú mismo, un rasgo clave para gestión senior y roles ejecutivos.',
    keywords: ['habilidades de delegación currículum', 'delegación de tareas CV', 'delegación gestión currículum', 'habilidades de delegación efectiva'],
    searchIntents: ['cómo mostrar habilidades de delegación en currículum', 'ejemplos de delegación para gerentes', 'delegación efectiva para crecimiento profesional'],
    relatedSkills: ['Gestión de Equipos', 'Liderazgo', 'Priorización', 'Gestión del Tiempo', 'Coaching', 'Construcción de Confianza', 'Comunicación', 'Mentoría'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-operaciones', 'gerente-general', 'gerente-de-programas', 'gerente-de-ventas'],
    atsKeywords: ['delegación', 'asignación de tareas', 'distribución de trabajo', 'empoderamiento de equipo', 'asignación de responsabilidades', 'matriz RACI', 'gestión de carga de trabajo', 'asignación de recursos', 'coordinación de equipo'],
    resumeTips: [
      'Demuestra la delegación a través de resultados del equipo en lugar de listarla como habilidad.',
      'Muestra que la delegación llevó al desarrollo del equipo: miembros ganaron nuevas habilidades, obtuvieron promociones o asumieron mayores responsabilidades.',
      'Cuantifica cómo la delegación liberó tu capacidad para trabajo estratégico de mayor valor.',
      'Menciona marcos o herramientas de delegación utilizados (RACI, software de gestión de proyectos).'
    ],
    exampleBullets: [
      'Delegó la gestión operativa de 3 líneas de producto a miembros senior del equipo, liberando 15 horas por semana para planificación estratégica y contribuyendo a un aumento de ingresos del 28%.',
      'Implementó matrices RACI en 5 proyectos concurrentes con un equipo de 20 personas, reduciendo la superposición de tareas en un 50% y mejorando la entrega a tiempo del 72% al 94%.',
      'Delegó sistemáticamente responsabilidades con clientes a 4 gerentes de cuentas, permitiéndoles gestionar $2.5M en cuentas de forma independiente dentro de 6 meses.',
      'Reestructuró el modelo de delegación del equipo para un departamento de 25 personas, resultando en 3 miembros del equipo promovidos a roles de líder de equipo dentro de un año.'
    ],
    faqs: [
      { question: '¿Cómo muestro delegación en un currículum sin parecer que pasé mi trabajo a otros?', answer: 'Enmarca la delegación como empoderamiento estratégico: desarrollaste las capacidades del equipo, creaste oportunidades de crecimiento y escalaste la producción del equipo. Muestra que la delegación aumentó el rendimiento general del equipo y te liberó para trabajo de mayor valor como estrategia, gestión de stakeholders o desarrollo de negocios.' },
      { question: '¿Cuál es la diferencia entre delegación y abandono?', answer: 'La delegación implica comunicación clara de expectativas, proporcionar recursos, monitorear el progreso y mantener la responsabilidad. El abandono es asignar tareas sin apoyo o seguimiento. En un currículum, demuestra la delegación mostrando que proporcionaste orientación, rastreaste resultados y lograste resultados a través de otros.' },
      { question: '¿Es la delegación relevante para contribuidores individuales?', answer: 'Sí, en contextos como liderazgo de proyectos, trabajo multifuncional o mentoría. Incluso sin reportes directos, distribuir tareas en un equipo de proyecto o coordinar con contratistas demuestra capacidad de delegación. Destaca estas experiencias si aplicas a roles gerenciales.' }
    ]
  },
  'mentoring': {
    slug: 'mentoria',
    title: 'Mentoría',
    description: 'La mentoría es una relación de desarrollo en la cual una persona más experimentada (mentor) proporciona orientación, intercambio de conocimientos y apoyo profesional a una persona menos experimentada (mentoreado). A diferencia del coaching, que es típicamente específico a metas y limitado en el tiempo, la mentoría es una relación más amplia y a largo plazo que aborda el desarrollo profesional, crecimiento y navegación organizacional.\n\nLos modelos de mentoría efectiva incluyen el modelo GROW (Meta, Realidad, Opciones, Voluntad), las funciones de mentoría de Kram (funciones de carrera y funciones psicosociales) y el Modelo de Mentoría de Cinco Etapas (contemplación, iniciación, crecimiento, declive/cierre y redefinición). Los mentores proporcionan patrocinio, exposición, coaching, asesoramiento y modelado de roles.\n\nLas organizaciones con programas formales de mentoría reportan tasas de retención un 20% más altas y tiempos de productividad más rápidos para nuevas contrataciones. La mentoría moderna incluye mentoría inversa (empleados junior mentoreando a seniors en tecnología o tendencias culturales), mentoría entre pares, mentoría grupal y mentoría virtual en equipos distribuidos.',
    whyImportant: 'La mentoría es un diferenciador clave para candidatos de nivel senior. Según CNBC, el 91% de los CEO de Fortune 500 atribuyen su éxito a haber tenido mentores. Las organizaciones que invierten en mentoría ven un 25% más de retención entre empleados mentoreados y tasas de promoción un 35% más altas.\n\nDemostrar mentoría en un currículum señala madurez de liderazgo, compromiso con el desarrollo organizacional y la capacidad de multiplicar el talento. Es especialmente valorada para roles de gestión, capacitación, educación y consultoría donde desarrollar a otros es una responsabilidad central.',
    keywords: ['habilidades de mentoría currículum', 'experiencia de mentoría CV', 'habilidades de mentoría empleo', 'mentor currículum habilidades'],
    searchIntents: ['cómo listar mentoría en currículum', 'ejemplos de experiencia de mentoría para CV', 'habilidades de mentoría para avance profesional'],
    relatedSkills: ['Coaching', 'Liderazgo', 'Comunicación', 'Escucha Activa', 'Empatía', 'Enseñanza', 'Desarrollo Profesional', 'Intercambio de Conocimientos'],
    professionSlugs: ['gerente-de-capacitacion', 'director-escolar', 'profesor-universitario', 'consejero-de-carrera', 'gerente-de-recursos-humanos', 'gerente-general'],
    atsKeywords: ['mentoría', 'mentorship', 'desarrollo profesional', 'desarrollo de talento', 'transferencia de conocimiento', 'desarrollo profesional', 'coaching y mentoría', 'planificación de sucesión', 'desarrollo de empleados', 'incorporación'],
    resumeTips: [
      'Cuantifica el impacto de la mentoría: número de mentoreados, sus resultados profesionales (promociones, certificaciones, transiciones de rol).',
      'Distingue entre programas de mentoría formales y relaciones de mentoría informales.',
      'Destaca mentoría que contribuyó a metas organizacionales: reducción de rotación, incorporación más rápida, cierre de brechas de habilidades.',
      'Menciona mentoría inversa o mentoría multifuncional si aplica.',
      'Muestra consistencia y compromiso: mentoría durante meses o años demuestra dedicación.'
    ],
    exampleBullets: [
      'Mentoreó a 12 analistas junior durante 3 años a través de un programa formal de la empresa, con 8 recibiendo promociones y 2 haciendo transición a roles de liderazgo senior.',
      'Estableció un círculo de mentoría entre pares de 15 gerentes de nivel medio, resultando en una mejora del 20% en las puntuaciones de evaluación de competencias de liderazgo del grupo.',
      'Creó y lideró un programa de mentoría técnica para 25 nuevos empleados, reduciendo el tiempo promedio de incorporación de 12 a 8 semanas y mejorando la retención del primer año en un 30%.',
      'Proporcionó mentoría profesional a 6 empleados subrepresentados a través de la iniciativa de diversidad de la empresa, contribuyendo a un aumento del 40% en la representación de liderazgo diverso.'
    ],
    faqs: [
      { question: '¿Cómo es diferente la mentoría del coaching en un currículum?', answer: 'La mentoría está basada en relaciones y es a largo plazo, enfocándose en el desarrollo profesional general y la orientación organizacional. El coaching es típicamente específico a metas y limitado en el tiempo, enfocándose en mejorar habilidades específicas o áreas de desempeño. Ambos son valiosos — lista el que mejor coincida con la descripción del puesto, o incluye ambos con el contexto apropiado.' },
      { question: '¿Debo listar la mentoría informal en mi currículum?', answer: 'Sí. La mentoría informal demuestra iniciativa y liderazgo natural. Enmárcala con detalles específicos: "Mentoreó informalmente a 5 desarrolladores junior, proporcionando revisiones de código semanales y orientación profesional que contribuyeron a 3 promociones dentro de 18 meses."' },
      { question: '¿Es relevante la mentoría si estoy al inicio de mi carrera?', answer: 'Sí. Incluso profesionales relativamente junior pueden mentorar a pasantes, nuevos empleados o pares en áreas de experiencia. La mentoría demuestra potencial de liderazgo temprano en tu carrera y señala preparación para mayor responsabilidad.' }
    ]
  },
  'coaching': {
    slug: 'coaching',
    title: 'Coaching',
    description: 'El coaching es un proceso estructurado de ayudar a individuos o equipos a mejorar habilidades específicas, lograr metas definidas y mejorar el desempeño. A diferencia del enfoque amplio de carrera de la mentoría, el coaching es dirigido, limitado en el tiempo y orientado a resultados. La International Coach Federation (ICF) define el coaching como "asociarse con clientes en un proceso creativo y estimulante que los inspira a maximizar su potencial personal y profesional."\n\nLos modelos clave de coaching incluyen GROW (Meta, Realidad, Opciones, Voluntad) de Sir John Whitmore, el modelo OSKAR (Resultado, Escala, Conocimiento, Afirmar, Revisar) y el modelo de Coaching Co-Activo. Los coaches efectivos hacen preguntas poderosas, practican la escucha activa, proporcionan retroalimentación constructiva, mantienen la responsabilidad y resisten dar respuestas directas en favor de facilitar el autodescubrimiento.\n\nEn entornos laborales, el coaching aplica a mejora del desempeño, desarrollo de liderazgo, construcción de habilidades, transiciones de carrera y adaptación al cambio. El coaching ejecutivo ha crecido a una industria global de $2.85 mil millones, y las capacidades de coaching interno se desarrollan cada vez más dentro de las organizaciones para complementar los engagements de coaching externo.',
    whyImportant: 'El coaching demuestra compromiso con el desarrollo de otros e impulsar la mejora del desempeño. La ICF reporta que el 86% de las empresas que invierten en coaching recuperan su inversión, y los empleados con coaching muestran una mejora del 70% en el desempeño laboral. Las organizaciones con culturas de coaching reportan un 62% más de engagement de empleados.\n\nEn un currículum, las habilidades de coaching señalan la capacidad de desarrollar talento, mejorar el desempeño del equipo y contribuir al aprendizaje organizacional. Es particularmente valorado en roles de gestión, capacitación, consultoría y RRHH.',
    keywords: ['habilidades de coaching currículum', 'coaching laboral CV', 'habilidades de coaching empleo', 'coaching de desempeño currículum'],
    searchIntents: ['cómo listar habilidades de coaching en currículum', 'ejemplos de experiencia de coaching para empleo', 'habilidades de coaching para carrera gerencial'],
    relatedSkills: ['Mentoría', 'Escucha Activa', 'Inteligencia Emocional', 'Liderazgo', 'Comunicación', 'Retroalimentación', 'Establecimiento de Metas', 'Gestión del Desempeño'],
    professionSlugs: ['gerente-de-capacitacion', 'consejero-de-carrera', 'gerente-de-recursos-humanos', 'gerente-de-ventas', 'director-escolar', 'consultor-de-gestion'],
    atsKeywords: ['coaching', 'coaching de desempeño', 'coaching ejecutivo', 'coaching de liderazgo', 'coaching de equipo', 'coaching de ventas', 'desarrollo de habilidades', 'desarrollo profesional', 'modelo GROW', 'ICF'],
    resumeTips: [
      'Cuantifica resultados de coaching: mejoras de desempeño, tasas de logro de metas, tasas de promoción de individuos con coaching.',
      'Especifica el contexto de coaching: mejora de desempeño, desarrollo de liderazgo, capacitación de habilidades, transición de carrera.',
      'Menciona certificaciones de coaching (ICF ACC/PCC/MCC, CTI, EMCC) para demostrar formación formal.',
      'Destaca el enfoque de coaching utilizado si es relevante para el rol (GROW, basado en fortalezas, enfocado en soluciones).',
      'Muestra coaching a escala: número de individuos con coaching, programas de coaching grupal desarrollados.'
    ],
    exampleBullets: [
      'Dio coaching a 18 representantes de ventas usando el modelo GROW, aumentando el cumplimiento de cuota del equipo del 78% al 96% y generando $2.1M en ingresos anuales adicionales.',
      'Desarrolló y facilitó un programa de coaching de liderazgo de 12 semanas para 25 líderes emergentes, con el 80% reportando una mejora significativa en competencias de liderazgo autoevaluadas.',
      'Proporcionó coaching semanal de desempeño a 10 agentes de servicio al cliente de bajo rendimiento, mejorando sus puntuaciones promedio de satisfacción de 3.2 a 4.5 de 5 dentro de 90 días.',
      'Obtuvo la credencial ICF Professional Certified Coach (PCC) y completó más de 500 horas de coaching con líderes en 6 industrias.'
    ],
    faqs: [
      { question: '¿Necesito una certificación de coaching para listar coaching en mi currículum?', answer: 'No. Muchos coaches efectivos desarrollan sus habilidades a través de experiencia gerencial, roles de capacitación o programas de desarrollo profesional. Sin embargo, certificaciones como ICF ACC/PCC o certificados de coaching ATD agregan credibilidad, especialmente si estás buscando roles enfocados en coaching.' },
      { question: '¿Cómo muestro habilidades de coaching si no soy coach profesional?', answer: 'El coaching gerencial es igual de valioso. Describe cómo desarrollaste las habilidades de los miembros del equipo a través de reuniones individuales regulares, sesiones de retroalimentación, asignaciones desafiantes y planes de desarrollo estructurados. Cuantifica las mejoras que tu coaching produjo.' },
      { question: '¿Cuál es el ROI del coaching que puedo referenciar en entrevistas?', answer: 'La ICF reporta un ROI medio del 700% para organizaciones que invierten en coaching. Los beneficios individuales incluyen mejor desempeño (70%), mejores relaciones (73%) y comunicación mejorada (72%). Estas estadísticas respaldan el valor de las habilidades de coaching en tu currículum.' }
    ]
  },
  'emotional-intelligence': {
    slug: 'inteligencia-emocional',
    title: 'Inteligencia Emocional',
    description: 'La inteligencia emocional (IE o CE) es la capacidad de reconocer, comprender, gestionar y usar efectivamente las emociones en uno mismo y en otros. El marco de IE de Daniel Goleman identifica cinco componentes: autoconciencia, autorregulación, motivación, empatía y habilidades sociales. El modelo Mayer-Salovey-Caruso conceptualiza la IE como cuatro habilidades: percibir emociones, usar emociones para facilitar el pensamiento, comprender emociones y gestionar emociones.\n\nEn contextos profesionales, la inteligencia emocional se manifiesta en leer dinámicas de equipo, gestionar respuestas al estrés, navegar conversaciones difíciles, construir rapport y adaptar el estilo de comunicación a diferentes personalidades. Los líderes con alto CE crean ambientes psicológicamente seguros, manejan la retroalimentación constructivamente y gestionan sus propias reacciones emocionales durante situaciones de alta presión.\n\nLa investigación publicada en Harvard Business Review muestra que la inteligencia emocional representa casi el 90% de lo que diferencia a los mejores ejecutores de los pares con habilidades técnicas e IQ similares. El World Economic Forum lista la inteligencia emocional como una de las diez habilidades principales para el futuro del trabajo.',
    whyImportant: 'La inteligencia emocional es el predictor más fuerte de efectividad en el liderazgo. La investigación de TalentSmart encontró que el 90% de los mejores ejecutores tienen alto CE, y cada punto de aumento en CE agrega $1,300 al salario anual. En roles gerenciales, el CE se correlaciona más fuertemente con el desempeño que el IQ o la experiencia técnica.\n\nEn un currículum, la inteligencia emocional se demuestra en lugar de declararse. Sustenta la resolución de conflictos, gestión de equipos, relaciones con clientes y liderazgo del cambio. Los empleadores la valoran particularmente para roles de gestión, asesoramiento, RRHH, ventas y cualquier rol que requiera interacción interpersonal significativa.',
    keywords: ['inteligencia emocional currículum', 'habilidades CE CV', 'inteligencia emocional empleo', 'IE habilidades laborales'],
    searchIntents: ['cómo mostrar inteligencia emocional en currículum', 'ejemplos de inteligencia emocional para empleo', 'habilidades de inteligencia emocional para carrera'],
    relatedSkills: ['Empatía', 'Autoconciencia', 'Escucha Activa', 'Comunicación', 'Resolución de Conflictos', 'Liderazgo', 'Adaptabilidad', 'Habilidades Interpersonales', 'Paciencia', 'Resiliencia'],
    professionSlugs: ['consejero-de-carrera', 'gerente-de-recursos-humanos', 'trabajador-social', 'director-escolar', 'consejero-de-carrera', 'consultor-de-gestion'],
    atsKeywords: ['inteligencia emocional', 'CE', 'autoconciencia', 'empatía', 'habilidades interpersonales', 'gestión de relaciones', 'conciencia social', 'regulación emocional', 'seguridad psicológica', 'dinámicas de equipo'],
    resumeTips: [
      'Demuestra el CE a través de resultados en lugar de autoetiquetarte: mejoras en engagement del equipo, resoluciones de conflictos, retención de clientes.',
      'Destaca situaciones donde la conciencia emocional impulsó mejores decisiones o relaciones.',
      'Menciona formación relacionada con CE: certificación Goleman, evaluaciones de inteligencia emocional (EQ-i 2.0) o programas de desarrollo de liderazgo.',
      'Muestra CE en contextos desafiantes: cambio organizacional, gestión de crisis o negociaciones de alto riesgo.',
      'Combina el CE con impacto de negocio medible para evitar que parezca una afirmación blanda y no medible.'
    ],
    exampleBullets: [
      'Aplicó principios de inteligencia emocional para transformar un equipo desenganchado de 25 personas, mejorando las puntuaciones de satisfacción de empleados del 55% al 84% y reduciendo la rotación del 30% al 8% dentro de 18 meses.',
      'Navegó una reestructuración organizacional sensible que afectó a 150 empleados, usando comunicación empática y gestión del cambio para mantener el 90% de la productividad durante la transición.',
      'Construyó y mantuvo relaciones basadas en confianza con más de 40 clientes empresariales, logrando una tasa de renovación de contratos del 98% durante 4 años a través de gestión proactiva de relaciones.',
      'Facilitó 20 conversaciones difíciles de desempeño usando técnicas de retroalimentación emocionalmente inteligentes, resultando en mejora del desempeño en el 85% de los casos sin terminación.'
    ],
    faqs: [
      { question: '¿Debo escribir literalmente "inteligencia emocional" en mi currículum?', answer: 'Es más efectivo demostrar el CE a través de ejemplos que listarlo como una habilidad. Sin embargo, algunos sistemas ATS escanean "inteligencia emocional" o "CE", así que incluirlo en una sección de habilidades junto con viñetas demostrativas es un enfoque equilibrado.' },
      { question: '¿Se puede medir o evaluar la inteligencia emocional?', answer: 'Sí. Las evaluaciones validadas incluyen el Mayer-Salovey-Caruso Emotional Intelligence Test (MSCEIT), EQ-i 2.0 (MHS) y el Emotional and Social Competency Inventory (ESCI). Si has completado una evaluación de CE, mencionar tus resultados o certificación agrega credibilidad.' },
      { question: '¿Es la inteligencia emocional más importante que el IQ en el lugar de trabajo?', answer: 'La investigación muestra consistentemente que el CE es un predictor más fuerte del desempeño laboral, efectividad de liderazgo y avance profesional que el IQ, particularmente en roles que requieren interacción interpersonal. Mientras que el IQ importa para ciertas tareas técnicas, el CE determina qué tan bien colaboras, lideras y navegas dinámicas sociales complejas.' }
    ]
  },
  'empathy': {
    slug: 'empatia',
    title: 'Empatía',
    description: 'La empatía es la capacidad de comprender y compartir los sentimientos, perspectivas y experiencias de otros. En entornos profesionales, la empatía opera en tres niveles: empatía cognitiva (comprender lo que alguien piensa), empatía afectiva (sentir lo que alguien siente) y empatía compasiva (sentirse impulsado a ayudar). La investigación de Theresa Wiseman en enfermería identifica cuatro atributos de la empatía: toma de perspectiva, mantenerse fuera del juicio, reconocer emociones y comunicar comprensión.\n\nEn el lugar de trabajo, la empatía se manifiesta en comprender los puntos de dolor del cliente, apoyar a miembros del equipo a través de desafíos, diseñar productos centrados en el usuario y crear ambientes inclusivos. Los líderes empáticos realizan mejores reuniones individuales, entregan retroalimentación más efectiva y construyen relaciones interculturales más fuertes. La metodología de Design Thinking (Stanford d.school) coloca la empatía como la primera y fundamental etapa del proceso de innovación.\n\nLa investigación del estudio State of Workplace Empathy de Businessolver encontró que el 93% de los empleados son más propensos a permanecer con un empleador empático, y el 82% dejaría su rol actual por una organización más empática. La empatía es fundamental para la experiencia del cliente, el engagement de los empleados y la cultura organizacional.',
    whyImportant: 'La empatía impulsa la satisfacción del cliente, la retención de empleados y la innovación. Según el Empathy Index de Harvard Business Review, las 10 empresas más empáticas generaron un 50% más de ganancias que las 10 inferiores. En salud, educación y trabajo social, la empatía impacta directamente la calidad del servicio y los resultados.\n\nEn un currículum, la empatía se demuestra mejor a través de métricas de satisfacción del cliente, mejoras en el bienestar del equipo, resultados de diseño centrado en el usuario y prácticas de liderazgo inclusivo. Es particularmente valorada en roles de asesoramiento, RRHH, servicio al cliente, educación y salud.',
    keywords: ['habilidades de empatía currículum', 'empatía habilidades laborales', 'liderazgo empático CV', 'empatía solicitud de empleo'],
    searchIntents: ['cómo demostrar empatía en currículum', 'ejemplos de habilidades de empatía para empleo', 'empatía en el lugar de trabajo currículum'],
    relatedSkills: ['Inteligencia Emocional', 'Escucha Activa', 'Comunicación', 'Conciencia Cultural', 'Paciencia', 'Habilidades Interpersonales', 'Asesoramiento', 'Servicio al Cliente'],
    professionSlugs: ['trabajador-social', 'consejero-de-carrera', 'maestro', 'gerente-de-recursos-humanos', 'representante-de-servicio-al-cliente', 'consejero-de-carrera'],
    atsKeywords: ['empatía', 'liderazgo empático', 'compasión', 'centrado en el cliente', 'empatía de usuario', 'conciencia emocional', 'toma de perspectiva', 'liderazgo inclusivo', 'cuidado del paciente', 'empatía con stakeholders'],
    resumeTips: [
      'Muestra empatía a través de resultados: puntuaciones de satisfacción del cliente, métricas de bienestar de empleados, mejoras de experiencia de usuario.',
      'Menciona metodologías impulsadas por empatía: design thinking, diseño centrado en el ser humano, entrevista motivacional.',
      'Destaca empatía intercultural en contextos de equipos diversos o internacionales.',
      'Conecta la empatía con resultados de negocio: mejoras de retención, aumentos de NPS, métricas de calidad de servicio.'
    ],
    exampleBullets: [
      'Lideró talleres de design thinking con 30 stakeholders, usando mapeo de empatía para identificar 8 necesidades insatisfechas del cliente que impulsaron un rediseño de producto aumentando la satisfacción del usuario en un 35%.',
      'Gestionó una carga de casos de 45 clientes en situaciones de crisis, aplicando escucha empática y atención informada por trauma para lograr una tasa de resultados positivos del 90%.',
      'Implementó un programa de capacitación en servicio al cliente basado en empatía para 50 agentes, mejorando el Net Promoter Score de 32 a 58 dentro de 6 meses.',
      'Creó una cultura de equipo inclusiva a través de reuniones individuales empáticas con 20 reportes directos, reduciendo la rotación voluntaria del 22% al 7% durante 2 años.'
    ],
    faqs: [
      { question: '¿Cómo muestro empatía en un currículum sin que suene vago?', answer: 'Ancla la empatía en acciones específicas y resultados. En lugar de decir "líder empático", escribe "Mejoró la retención del equipo del 75% al 93% implementando check-ins mensuales de bienestar y planes de desarrollo personalizados." La empatía basada en evidencia es convincente; la empatía basada en adjetivos no lo es.' },
      { question: '¿La empatía se considera una habilidad profesional o solo un rasgo de personalidad?', answer: 'La empatía es cada vez más reconocida como una competencia profesional que se puede desarrollar. Se enseña en escuelas de medicina, escuelas de negocios y programas de diseño. Organizaciones como el Center for Creative Leadership e IDEO capacitan explícitamente la empatía como una habilidad profesional.' },
      { question: '¿Se puede tener demasiada empatía en un entorno profesional?', answer: 'El malestar empático — absorber las emociones negativas de otros — puede llevar al agotamiento. Los profesionales efectivos practican la empatía compasiva, que combina comprensión con acción mientras mantiene límites saludables. Esto es especialmente importante en roles de asesoramiento, trabajo social y salud.' }
    ]
  },
  'adaptability': {
    slug: 'adaptabilidad',
    title: 'Adaptabilidad',
    description: 'La adaptabilidad es la capacidad de ajustarse efectivamente a nuevas condiciones, prioridades cambiantes, situaciones ambiguas y demandas laborales en evolución. Abarca flexibilidad cognitiva (cambiar modelos mentales), adaptabilidad emocional (gestionar la incomodidad con el cambio) y adaptabilidad conductual (modificar acciones basadas en nueva información). El marco AQ (Cociente de Adaptabilidad) de Ross Thornley mide la capacidad de una organización y un individuo para responder al cambio.\n\nLos profesionales adaptables demuestran apertura a nuevas ideas, disposición para aprender tecnologías desconocidas, comodidad con la ambigüedad y resiliencia cuando los planes cambian. En contextos organizacionales, la adaptabilidad se manifiesta durante transformaciones digitales, pivotes de mercado, reestructuraciones, fusiones y respuestas a crisis. La metodología Agile en sí está basada en la adaptabilidad — abrazar el cambio en lugar de seguir rígidamente planes iniciales.\n\nEl Future of Jobs Report del World Economic Forum identifica la adaptabilidad como una de las cinco habilidades principales para el futuro lugar de trabajo. A medida que las industrias enfrentan una disrupción tecnológica acelerada, los profesionales que se adaptan rápidamente ganan una ventaja competitiva significativa sobre quienes resisten el cambio.',
    whyImportant: 'La adaptabilidad se ha convertido en un criterio de contratación crítico, especialmente post-pandemia. LinkedIn reporta que la adaptabilidad fue la habilidad blanda principal que los empleadores buscaron en años recientes. En industrias que cambian rápidamente como tecnología, marketing y finanzas, la capacidad de pivotar rápidamente impacta directamente la supervivencia y crecimiento organizacional.\n\nEn un currículum, la adaptabilidad señala que puedes prosperar en ambientes inciertos, abrazar nuevos desafíos y contribuir efectivamente durante transiciones. Es valorada en todos los roles pero es especialmente importante en startups, consultoría, gestión de proyectos y cualquier industria que esté experimentando una transformación significativa.',
    keywords: ['habilidades de adaptabilidad currículum', 'habilidades de flexibilidad CV', 'adaptabilidad laboral', 'adaptabilidad al cambio currículum'],
    searchIntents: ['cómo mostrar adaptabilidad en currículum', 'ejemplos de adaptabilidad para solicitud de empleo', 'habilidades de adaptabilidad para carrera'],
    relatedSkills: ['Resiliencia', 'Mentalidad de Crecimiento', 'Resolución de Problemas', 'Aprendizaje Continuo', 'Pensamiento Creativo', 'Flexibilidad', 'Gestión del Cambio', 'Agilidad'],
    professionSlugs: ['gerente-de-proyectos', 'consultor-de-gestion', 'consultor-de-gestion-del-cambio', 'gerente-de-producto', 'planificador-de-eventos', 'gerente-general'],
    atsKeywords: ['adaptabilidad', 'flexibilidad', 'gestión del cambio', 'agile', 'versátil', 'pivoteo', 'resiliente', 'ambiente dinámico', 'ambigüedad', 'cambio organizacional'],
    resumeTips: [
      'Demuestra adaptabilidad a través de situaciones específicas donde navegaste el cambio exitosamente.',
      'Destaca cambios de rol, transiciones tecnológicas o pivotes de mercado que gestionaste exitosamente.',
      'Cuantifica la velocidad y efectividad de tu adaptación: plazos, curvas de aprendizaje comprimidas, resultados durante la transición.',
      'Menciona movimientos multifuncionales o transiciones de industria que requirieron adaptación rápida.',
      'Muestra adaptabilidad tanto a nivel personal (aprender nuevas habilidades) como organizacional (liderar el cambio).'
    ],
    exampleBullets: [
      'Pivoteó un equipo de 20 personas de operaciones presenciales a completamente remotas dentro de 72 horas durante la pandemia, manteniendo el 100% de los compromisos de entrega a clientes y logrando un 95% de satisfacción del equipo.',
      'Se adaptó a 3 reestructuraciones organizacionales en 2 años, haciendo transición exitosa entre roles de gestión de producto, operaciones y estrategia mientras excedía consistentemente los objetivos de desempeño.',
      'Lideró el pivote de la empresa de B2B a B2C durante un cambio de mercado, reestructurando una estrategia de marketing de $4M que generó 50,000 nuevas cuentas de consumidores en 6 meses.',
      'Aprendió e implementó 4 nuevas plataformas tecnológicas (Salesforce, Jira, Tableau, HubSpot) dentro de un solo año fiscal para apoyar los requisitos de negocio en evolución.'
    ],
    faqs: [
      { question: '¿Cómo demuestro adaptabilidad en un currículum?', answer: 'Usa ejemplos específicos de cambio que navegaste exitosamente. Describe la situación (qué cambió), tus acciones (cómo te adaptaste) y los resultados (qué lograste). Los ejemplos comunes incluyen transiciones tecnológicas, cambios organizacionales, expansiones de rol y respuestas a crisis.' },
      { question: '¿Es la adaptabilidad lo mismo que ser generalista?', answer: 'No. La adaptabilidad es sobre responder efectivamente al cambio, no sobre ser ampliamente competente. Un especialista profundo que aprende rápidamente nuevos marcos es adaptable. Un generalista que resiste cambios de proceso no lo es. La adaptabilidad es una mentalidad y rasgo conductual, no un indicador de amplitud de habilidades.' },
      { question: '¿Cómo evalúan los empleadores la adaptabilidad durante la contratación?', answer: 'Los empleadores usan preguntas de entrevista conductual como "Cuéntame sobre una vez que las prioridades cambiaron inesperadamente" o "Describe una situación donde tuviste que aprender algo rápidamente." También buscan patrones en el historial profesional: experiencias variadas, transiciones exitosas y prosperidad en ambientes dinámicos.' }
    ]
  },
  'resilience': {
    slug: 'resiliencia',
    title: 'Resiliencia',
    description: 'La resiliencia es la capacidad de recuperarse rápidamente de dificultades, contratiempos y situaciones de alta presión mientras se mantiene la efectividad y el bienestar. La resiliencia profesional se basa en el modelo de optimismo aprendido de Martin Seligman, el marco de resiliencia de la APA (conexión, bienestar, pensamiento saludable, significado) y la investigación sobre grit de Angela Duckworth, que muestra que la persistencia y la pasión por metas a largo plazo predicen el éxito más que el talento solo.\n\nLos profesionales resilientes demuestran tolerancia al estrés, regulación emocional, realismo optimista y la capacidad de aprender del fracaso. En contextos laborales, la resiliencia se manifiesta durante fracasos de proyectos, recortes de presupuesto, reorganizaciones, pérdida de clientes y caídas del mercado. No se trata de evitar el estrés sino de mantener el desempeño y el bienestar a pesar de él.\n\nLa investigación de resiliencia organizacional del Business Continuity Institute muestra que las empresas con liderazgo resiliente se recuperan de crisis un 60% más rápido que aquellas sin él. La resiliencia individual se fortalece a través de prácticas como la reencuadre cognitivo, construir redes de apoyo, mantener límites entre trabajo y vida personal y desarrollar mentalidades de contingencia.',
    whyImportant: 'El estrés laboral cuesta a los empleadores de EE.UU. $300 mil millones anuales en ausentismo, rotación y productividad reducida. Los profesionales que demuestran resiliencia mantienen un desempeño más alto durante períodos desafiantes y se recuperan más rápido de los contratiempos. Según el Employee Benefits Trends study de MetLife, la resiliencia de los empleados es el principal predictor de productividad de la fuerza laboral.\n\nEn un currículum, la resiliencia se demuestra a través de logros durante circunstancias difíciles: recuperaciones, gestión de crisis, recuperación de proyectos fallidos o mantener el desempeño durante cambios organizacionales.',
    keywords: ['habilidades de resiliencia currículum', 'resiliencia profesional CV', 'resiliencia habilidades laborales', 'grit y resiliencia empleo'],
    searchIntents: ['cómo mostrar resiliencia en currículum', 'ejemplos de resiliencia para solicitud de empleo', 'habilidades de resiliencia profesional carrera'],
    relatedSkills: ['Adaptabilidad', 'Manejo del Estrés', 'Mentalidad de Crecimiento', 'Resolución de Problemas', 'Inteligencia Emocional', 'Automotivación', 'Perseverancia', 'Ética de Trabajo'],
    professionSlugs: ['gerente-de-proyectos', 'trabajador-social', 'consejero-de-carrera', 'gerente-de-operaciones', 'director-de-organizacion-sin-fines-de-lucro', 'gerente-de-ventas'],
    atsKeywords: ['resiliencia', 'tolerancia al estrés', 'perseverancia', 'gestión de crisis', 'manejo de presión', 'recuperación', 'grit', 'tenacidad', 'continuidad del negocio', 'gestión de recuperación'],
    resumeTips: [
      'Muestra resiliencia a través de historias de recuperación: proyectos fallidos recuperados, crisis gestionadas o contratiempos superados.',
      'Cuantifica el desempeño mantenido durante períodos desafiantes.',
      'Destaca logros bajo condiciones adversas: plazos ajustados, restricciones de presupuesto, pérdidas de equipo.',
      'Demuestra aprendizaje del fracaso: describe qué salió mal, cómo te adaptaste y el resultado final.'
    ],
    exampleBullets: [
      'Recuperó un proyecto fallido de $3.5M reestructurando el equipo y el cronograma, entregando finalmente 6 semanas tarde pero un 15% por debajo del presupuesto mientras retenía al cliente para un engagement de seguimiento de $2M.',
      'Mantuvo el 110% de la cuota de ventas durante una reducción de fuerza laboral del 40%, absorbiendo 3 territorios vacantes y generando $1.8M en ingresos como contribuidor individual.',
      'Lideró las operaciones de continuidad del negocio durante una interrupción de servicio de 3 semanas que afectó a 10,000 clientes, coordinando un equipo de respuesta 24/7 y restaurando el servicio completo con una tasa de retención de clientes del 96%.',
      'Navegó 4 cambios de liderazgo en 2 años mientras mantenía la productividad del equipo al 95% y logrando la puntuación de engagement más alta del departamento del 88%.'
    ],
    faqs: [
      { question: '¿Cómo muestro resiliencia sin enfocarme en experiencias negativas?', answer: 'Enmarca las historias de resiliencia como narrativas de crecimiento. Enfócate en las acciones que tomaste y los resultados positivos logrados, no en detenerte en las dificultades. Usa lenguaje como "navegó", "superó", "recuperó" y "sostuvo" para transmitir fortaleza en lugar de lucha.' },
      { question: '¿Es la resiliencia lo mismo que trabajar a través del agotamiento?', answer: 'No. La resiliencia incluye saber cuándo establecer límites y buscar apoyo. Trabajar a través del agotamiento es lo opuesto a la resiliencia — lleva a un desempeño disminuido y problemas de salud. La verdadera resiliencia involucra prácticas sostenibles que mantienen tanto la productividad como el bienestar.' },
      { question: '¿Los empleadores realmente valoran la resiliencia en la contratación?', answer: 'Cada vez más, sí. Las preguntas de entrevista conductual sobre manejar contratiempos, trabajar bajo presión y gestionar el cambio están evaluando directamente la resiliencia. Los empleadores en industrias de alto estrés (consultoría, salud, startups) priorizan explícitamente la resiliencia como criterio de contratación.' }
    ]
  },
  'critical-thinking': {
    slug: 'pensamiento-critico',
    title: 'Pensamiento Crítico',
    description: 'El pensamiento crítico es el proceso disciplinado de analizar información objetivamente, evaluar evidencia, cuestionar suposiciones y formar juicios razonados. Enraizado en el método socrático y formalizado por teóricos educativos como Benjamin Bloom (Taxonomía de Bloom) y Richard Paul (Marco de Pensamiento Crítico Paul-Elder), involucra habilidades como interpretación, análisis, evaluación, inferencia, explicación y autorregulación.\n\nEn entornos profesionales, el pensamiento crítico aplica a evaluar propuestas de negocio, evaluar riesgos, diagnosticar problemas, revisar datos por sesgo y tomar decisiones estratégicas bajo incertidumbre. Los pensadores críticos identifican falacias lógicas, distinguen correlación de causalidad, consideran múltiples perspectivas y desafían la sabiduría convencional cuando la evidencia lo justifica.\n\nEl World Economic Forum clasifica consistentemente al pensamiento crítico entre las tres habilidades principales que los empleadores necesitan. A medida que la IA y la automatización manejan tareas cognitivas rutinarias, la capacidad de pensar críticamente — evaluar salidas de IA, cuestionar recomendaciones automatizadas y hacer juicios matizados — se vuelve cada vez más valiosa y distintivamente humana.',
    whyImportant: 'Un estudio de la Association of American Colleges and Universities encontró que el 93% de los empleadores valoran el pensamiento crítico por encima de la carrera universitaria del candidato. En roles de consultoría, finanzas, legal y estrategia, el pensamiento crítico es la competencia principal evaluada durante la contratación. Las empresas con culturas de pensamiento crítico toman mejores decisiones estratégicas y evitan errores costosos.\n\nEn un currículum, el pensamiento crítico se demuestra a través de logros analíticos, resultados de resolución de problemas complejos y toma de decisiones basada en evidencia. Señala rigor intelectual y la capacidad de agregar valor estratégico más allá de la ejecución de tareas.',
    keywords: ['habilidades de pensamiento crítico currículum', 'pensamiento analítico CV', 'habilidades de pensamiento crítico empleo', 'habilidades de razonamiento currículum'],
    searchIntents: ['cómo mostrar pensamiento crítico en currículum', 'ejemplos de pensamiento crítico para empleo', 'habilidades de pensamiento crítico para avance profesional'],
    relatedSkills: ['Pensamiento Analítico', 'Resolución de Problemas', 'Toma de Decisiones', 'Investigación', 'Análisis de Datos', 'Pensamiento Estratégico', 'Razonamiento Lógico', 'Pensamiento Creativo'],
    professionSlugs: ['consultor-de-gestion', 'consultor-de-estrategia', 'abogado', 'profesor-universitario', 'asesor-financiero', 'gerente-de-producto'],
    atsKeywords: ['pensamiento crítico', 'habilidades analíticas', 'razonamiento lógico', 'análisis de problemas', 'toma de decisiones basada en evidencia', 'análisis estratégico', 'análisis de causa raíz', 'evaluación', 'valoración', 'investigación y análisis'],
    resumeTips: [
      'Demuestra pensamiento crítico a través de problemas complejos que analizaste y resolviste.',
      'Menciona marcos utilizados: análisis FODA, análisis de causa raíz, matrices de decisión, análisis de costo-beneficio.',
      'Destaca instancias donde tu análisis desafió suposiciones y llevó a mejores resultados.',
      'Cuantifica el impacto de tu pensamiento crítico: costos evitados, riesgos mitigados, oportunidades identificadas.',
      'Muestra pensamiento crítico en acción, no como un rasgo listado — usa verbos como "analizó", "evaluó", "valoró", "diagnosticó".'
    ],
    exampleBullets: [
      'Condujo un análisis crítico de la estrategia de precios de la empresa usando datos de mercado y benchmarking competitivo, identificando un problema de subvaloración del 15% y recomendando ajustes que aumentaron los ingresos anuales en $2.3M.',
      'Evaluó 12 propuestas de proveedores de tecnología usando una matriz de decisión ponderada, seleccionando una solución que ahorró $800K durante 3 años comparada con el favorito inicial.',
      'Identificó una suposición errónea en un plan de expansión de mercado de $5M a través de análisis riguroso de datos, previniendo una pérdida estimada de $1.2M al redirigir recursos a un segmento de mercado validado.',
      'Aplicó análisis de causa raíz a problemas recurrentes de calidad que afectaban el 8% de la producción, diagnosticando el problema central e implementando una solución que redujo las tasas de defectos al 0.5%.'
    ],
    faqs: [
      { question: '¿Cómo es diferente el pensamiento crítico del pensamiento analítico?', answer: 'El pensamiento crítico es más amplio — incluye evaluar argumentos, cuestionar suposiciones y hacer juicios sobre la calidad y relevancia de la información. El pensamiento analítico es un componente del pensamiento crítico enfocado específicamente en desglosar información compleja en partes. Ambos son valiosos y complementarios.' },
      { question: '¿Se puede enseñar el pensamiento crítico o es innato?', answer: 'El pensamiento crítico se puede desarrollar absolutamente a través de la práctica. Marcos como el modelo Paul-Elder y la Taxonomía de Bloom proporcionan enfoques estructurados. Cursos de lógica, filosofía y análisis de datos construyen habilidades de pensamiento crítico, al igual que la práctica regular de cuestionar suposiciones y evaluar evidencia.' },
      { question: '¿Cómo evalúan los empleadores el pensamiento crítico en entrevistas?', answer: 'Los empleadores usan entrevistas de caso (comunes en consultoría), acertijos, tests de juicio situacional y preguntas conductuales como "Cuéntame sobre una vez que tuviste que desafiar una idea popular." Evalúan tu proceso de razonamiento tanto como tus conclusiones.' }
    ]
  },
  'problem-solving': {
    slug: 'resolucion-de-problemas',
    title: 'Resolución de Problemas',
    description: 'La resolución de problemas es el proceso cognitivo de identificar, analizar y resolver desafíos a través de enfoques estructurados y creativos. Las metodologías incluyen el proceso racional Kepner-Tregoe, el método de resolución de problemas 8D (usado en manufactura), DMAIC (Definir, Medir, Analizar, Mejorar, Controlar) de Six Sigma, el ciclo PDCA (Planificar, Hacer, Verificar, Actuar) de Deming y el proceso de cinco etapas de design thinking.\n\nLos solucionadores de problemas efectivos definen problemas con precisión antes de saltar a soluciones, recopilan datos relevantes, generan múltiples soluciones potenciales, evalúan compensaciones, implementan el enfoque elegido y miden resultados. Equilibran el rigor analítico con la intuición creativa y saben cuándo escalar versus cuándo resolver independientemente.\n\nEn los lugares de trabajo modernos, la resolución de problemas se extiende a problemas perversos — desafíos complejos e interconectados sin solución clara — que requieren pensamiento de sistemas, colaboración multifuncional y experimentación iterativa. La capacidad de resolver problemas de manera eficiente y exhaustiva es la competencia más valorada en prácticamente todas las industrias y funciones laborales.',
    whyImportant: 'La resolución de problemas clasifica consistentemente como la habilidad número uno que buscan los empleadores. La National Association of Colleges and Employers (NACE) la coloca al tope de sus competencias de preparación profesional. En el trabajo del conocimiento, la capacidad de resolver desafíos ambiguos de forma independiente se correlaciona directamente con el desempeño laboral y la progresión profesional.\n\nEn un currículum, la resolución de problemas se muestra mejor a través de ejemplos específicos de desafíos enfrentados, enfoques tomados y resultados medibles logrados. Las afirmaciones genéricas de "fuertes habilidades de resolución de problemas" no tienen peso; las demostraciones basadas en evidencia son esenciales.',
    keywords: ['habilidades de resolución de problemas currículum', 'capacidades de resolución de problemas CV', 'habilidades de resolución de problemas empleo', 'resolución de problemas currículum'],
    searchIntents: ['cómo mostrar resolución de problemas en currículum', 'ejemplos de resolución de problemas para solicitud de empleo', 'habilidades de resolución de problemas para carrera'],
    relatedSkills: ['Pensamiento Crítico', 'Pensamiento Analítico', 'Toma de Decisiones', 'Pensamiento Creativo', 'Análisis de Causa Raíz', 'Investigación', 'Innovación', 'Pensamiento Estratégico'],
    professionSlugs: ['consultor-de-gestion', 'gerente-de-proyectos', 'gerente-de-operaciones', 'gerente-de-producto', 'consultor-de-estrategia', 'gerente-general'],
    atsKeywords: ['resolución de problemas', 'solución de problemas', 'análisis de causa raíz', 'resolución de incidencias', 'mejora de procesos', 'desarrollo de soluciones', 'resolución analítica de problemas', 'resolución de problemas complejos', 'DMAIC', 'mejora continua'],
    resumeTips: [
      'Usa el método STAR para estructurar ejemplos de resolución de problemas: Situación, Tarea, Acción, Resultado.',
      'Cuantifica el impacto de tus soluciones: ahorros de costos, reducciones de tiempo, disminución de tasas de error, aumentos de ingresos.',
      'Menciona metodologías específicas de resolución de problemas utilizadas: Six Sigma, 8D, design thinking, pensamiento A3.',
      'Muestra problemas de complejidad variada para demostrar rango.',
      'Destaca problemas que identificaste proactivamente, no solo los que te asignaron.'
    ],
    exampleBullets: [
      'Diagnosticó y resolvió un problema persistente de sincronización de datos que afectaba a 15,000 registros de clientes, implementando un proceso de validación automatizado que redujo los errores de datos en un 98% y ahorró $200K en correcciones manuales anuales.',
      'Aplicó la metodología DMAIC para optimizar el proceso de cumplimiento de pedidos, reduciendo el tiempo promedio de cumplimiento de 72 horas a 24 horas y disminuyendo los errores de envío en un 75%.',
      'Identificó y resolvió un problema de abandono de clientes analizando datos de uso de 50,000 cuentas, implementando estrategias de retención dirigidas que recuperaron $1.5M en ingresos anuales en riesgo.',
      'Resolvió un cuello de botella de flujo de trabajo interdepartamental que afectaba a 4 equipos, diseñando un nuevo proceso de transferencia que aumentó el rendimiento en un 40% y eliminó 20 horas de retrabajo semanal.'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades de resolución de problemas sin sonar como todos los demás candidatos?', answer: 'Sé específico. Afirmaciones genéricas como "excelente solucionador de problemas" no tienen significado. En su lugar, describe un desafío único que enfrentaste, el enfoque específico que tomaste y el resultado cuantificado. Cuanto más específico e inusual sea el problema, más memorable será tu currículum.' },
      { question: '¿Debo mencionar problemas que resolví que no estaban en mi descripción de puesto?', answer: 'Absolutamente. Identificar y resolver problemas proactivamente fuera de tus responsabilidades formales demuestra iniciativa y amplitud. Estos ejemplos frecuentemente causan la impresión más fuerte porque muestran autodirección y conciencia organizacional.' },
      { question: '¿Qué marcos de resolución de problemas debo aprender para mi carrera?', answer: 'Comienza con análisis de causa raíz (5 Porqués, diagramas de espina de pescado) para roles operativos, DMAIC para mejora de procesos, design thinking para roles de innovación y el enfoque basado en hipótesis para consultoría. El mejor marco depende de tu industria y los tipos de problemas que encuentres.' }
    ]
  },
  'decision-making': {
    slug: 'toma-de-decisiones',
    title: 'Toma de Decisiones',
    description: 'La toma de decisiones es el proceso cognitivo de seleccionar un curso de acción entre múltiples alternativas basándose en análisis, juicio y valores. Los marcos incluyen la toma de decisiones racional (racionalidad limitada de Simon), el bucle OODA (Observar, Orientar, Decidir, Actuar) de la estrategia militar, la Matriz de Eisenhower para priorización y la teoría de proceso dual de Kahneman que distingue entre pensamiento intuitivo (Sistema 1) y deliberado (Sistema 2).\n\nLos tomadores de decisiones efectivos en entornos profesionales recopilan información relevante, evalúan riesgos y compensaciones, consideran impactos en stakeholders, toman decisiones oportunas y aceptan la responsabilidad por los resultados. Entienden cuándo confiar en datos versus intuición, cuándo decidir rápidamente versus deliberar y cuándo consultar a otros versus actuar independientemente. El marco RAPID (Recomendar, Acordar, Realizar, Opinar, Decidir) de Bain & Company clarifica los roles de toma de decisiones en las organizaciones.\n\nLa toma de decisiones bajo incertidumbre — usando pensamiento probabilístico, planificación de escenarios y marcos de decisiones reversibles versus irreversibles (decisiones Tipo 1 vs. Tipo 2 de Jeff Bezos) — es particularmente valorada en roles de liderazgo y estrategia donde la información perfecta rara vez está disponible.',
    whyImportant: 'La mala toma de decisiones es uno de los problemas organizacionales más costosos. La investigación de McKinsey encontró que las empresas en el cuartil superior de efectividad en toma de decisiones son dos veces más propensas a generar rendimientos financieros por encima del promedio. La velocidad y calidad de las decisiones juntas determinan la ventaja competitiva.\n\nEn un currículum, una toma de decisiones sólida señala potencial ejecutivo, capacidad de gestión de riesgos y juicio estratégico. Es esencial para roles de gestión, finanzas, operaciones y cualquier posición donde las decisiones impacten directamente los resultados organizacionales.',
    keywords: ['habilidades de toma de decisiones currículum', 'capacidades de toma de decisiones CV', 'toma de decisiones estratégica empleo', 'consejos de toma de decisiones currículum'],
    searchIntents: ['cómo mostrar toma de decisiones en currículum', 'ejemplos de toma de decisiones para solicitud de empleo', 'habilidades de toma de decisiones carrera'],
    relatedSkills: ['Pensamiento Crítico', 'Pensamiento Analítico', 'Resolución de Problemas', 'Gestión de Riesgos', 'Pensamiento Estratégico', 'Liderazgo', 'Priorización', 'Análisis de Datos'],
    professionSlugs: ['gerente-general', 'gerente-de-operaciones', 'gerente-de-proyectos', 'asesor-financiero', 'consultor-de-estrategia', 'gerente-de-producto'],
    atsKeywords: ['toma de decisiones', 'decisiones estratégicas', 'decisiones basadas en datos', 'evaluación de riesgos', 'juicio', 'toma de decisiones ejecutiva', 'análisis de costo-beneficio', 'planificación de escenarios', 'asignación de recursos', 'priorización'],
    resumeTips: [
      'Describe las apuestas, complejidad y restricciones de las decisiones que tomaste.',
      'Muestra toma de decisiones basada en datos referenciando la evidencia y análisis detrás de tus elecciones.',
      'Cuantifica los resultados de tus decisiones: ingresos generados, costos evitados, riesgos mitigados.',
      'Incluye tanto decisiones exitosas como decisiones tomadas bajo incertidumbre para demostrar juicio.',
      'Destaca decisiones que involucraron compensaciones, mostrando que puedes equilibrar prioridades en competencia.'
    ],
    exampleBullets: [
      'Tomó la decisión estratégica de salir de un segmento de mercado de bajo rendimiento, reasignando $3M en recursos a áreas de alto crecimiento y aumentando el ROI general del portafolio del 12% al 22%.',
      'Lideró un proceso de selección de proveedores basado en datos evaluando 8 candidatos en 15 criterios, eligiendo un socio que entregó $1.2M en ahorros durante el término del contrato de 3 años.',
      'Decidió acelerar una característica de producto basándose en análisis competitivo, entregándola 6 semanas antes que un competidor importante y capturando un 15% de participación de mercado en el primer trimestre.',
      'Implementó un marco estructurado de toma de decisiones (RAPID) en una organización de 50 personas, reduciendo el tiempo promedio del ciclo de decisión de 3 semanas a 5 días hábiles.'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades de toma de decisiones en un currículum sin sonar arrogante?', answer: 'Enfócate en el proceso y resultado en lugar de afirmar que eres un gran tomador de decisiones. Describe la situación, la información que recopilaste, las alternativas consideradas y el resultado cuantificado. Deja que el resultado hable por tu juicio en lugar de usar lenguaje autofelicitante.' },
      { question: '¿Debo incluir decisiones que tuvieron resultados negativos?', answer: 'En entrevistas, sí — muestra autoconciencia y agilidad de aprendizaje. En un currículum, enfócate en resultados positivos pero puedes incluir una historia de recuperación donde una decisión inicial se ajustó basándose en nueva información, llevando a un buen resultado. Esto demuestra adaptabilidad junto con toma de decisiones.' },
      { question: '¿Cuál es la diferencia entre toma de decisiones y resolución de problemas?', answer: 'La resolución de problemas es sobre encontrar soluciones a desafíos. La toma de decisiones es sobre elegir entre alternativas. Se superponen significativamente, pero la resolución de problemas enfatiza diagnóstico y resolución, mientras que la toma de decisiones enfatiza evaluación y selección. La mayoría de las situaciones profesionales requieren ambas.' }
    ]
  },
  'analytical-thinking': {
    slug: 'pensamiento-analitico',
    title: 'Pensamiento Analítico',
    description: 'El pensamiento analítico es la capacidad de examinar datos sistemáticamente, desglosar problemas complejos en componentes, identificar patrones y relaciones y sacar conclusiones lógicas. Involucra tanto análisis cuantitativo (razonamiento estadístico, modelado financiero, interpretación de datos) como análisis cualitativo (reconocimiento de patrones, análisis temático, mapeo de stakeholders).\n\nLos pensadores analíticos aplican marcos como la estructuración MECE (Mutuamente Excluyente, Colectivamente Exhaustivo) de McKinsey, las Cinco Fuerzas de Porter para análisis competitivo, análisis PESTLE para escaneo ambiental y análisis basado en hipótesis para investigación estructurada de problemas. Distinguen entre síntomas y causas raíz, identifican suposiciones ocultas y validan conclusiones con evidencia.\n\nEn un entorno de negocios cada vez más rico en datos, el pensamiento analítico cierra la brecha entre datos brutos e insights accionables. Complementa la alfabetización de datos y las herramientas analíticas técnicas al proporcionar el marco cognitivo para hacer las preguntas correctas, diseñar análisis apropiados e interpretar resultados dentro del contexto de negocios.',
    whyImportant: 'El World Economic Forum coloca al pensamiento analítico como la habilidad número uno más importante para el futuro del trabajo. Deloitte reporta que las organizaciones que usan pensamiento analítico en la toma de decisiones son 5 veces más propensas a tomar decisiones más rápidas y 3 veces más propensas a ejecutarlas según lo previsto.\n\nEn un currículum, el pensamiento analítico demuestra rigor intelectual y la capacidad de crear valor a partir de la información. Es un prerrequisito para roles de consultoría, finanzas, estrategia, ciencia de datos y operaciones. Los sistemas ATS frecuentemente escanean palabras clave analíticas en estas categorías de empleo.',
    keywords: ['pensamiento analítico currículum', 'habilidades analíticas CV', 'capacidades analíticas empleo', 'habilidades de análisis currículum'],
    searchIntents: ['cómo mostrar pensamiento analítico en currículum', 'ejemplos de pensamiento analítico para empleo', 'habilidades analíticas para avance profesional'],
    relatedSkills: ['Pensamiento Crítico', 'Análisis de Datos', 'Resolución de Problemas', 'Investigación', 'Toma de Decisiones', 'Análisis Estadístico', 'Pensamiento Estratégico', 'Razonamiento Lógico'],
    professionSlugs: ['consultor-de-gestion', 'consultor-de-estrategia', 'asesor-financiero', 'gerente-de-producto', 'gerente-de-operaciones', 'abogado'],
    atsKeywords: ['pensamiento analítico', 'habilidades analíticas', 'análisis de datos', 'análisis cuantitativo', 'análisis cualitativo', 'análisis de investigación', 'análisis financiero', 'análisis estratégico', 'MECE', 'análisis de causa raíz', 'análisis de negocios'],
    resumeTips: [
      'Combina el pensamiento analítico con herramientas y metodologías específicas: Excel, SQL, Tableau, FODA, PESTLE, análisis de regresión.',
      'Muestra pensamiento analítico a través de resultados: insights descubiertos, ineficiencias identificadas, recomendaciones basadas en datos implementadas.',
      'Cuantifica la escala del análisis: volúmenes de datos procesados, variables evaluadas, stakeholders impactados.',
      'Demuestra capacidades analíticas tanto cuantitativas como cualitativas.',
      'Destaca análisis que llevaron a decisiones de negocio accionables, no solo hallazgos interesantes.'
    ],
    exampleBullets: [
      'Analizó 3 años de datos de ventas en 500 SKUs usando modelado de regresión, identificando 15 productos subvalorados y recomendando ajustes que aumentaron el margen bruto en $1.1M anuales.',
      'Condujo un análisis de mercado integral evaluando 25 competidores en 40 dimensiones, informando una estrategia de lanzamiento que capturó un 12% de participación de mercado dentro del primer año.',
      'Aplicó estructuración MECE para desglosar un desafío de reducción de costos de $50M en 8 flujos de trabajo, identificando finalmente $18M en ahorros accionables dentro de 6 meses.',
      'Construyó un modelo de segmentación de clientes analizando datos de comportamiento de 200,000 usuarios, habilitando campañas de marketing dirigidas que mejoraron las tasas de conversión en un 45%.'
    ],
    faqs: [
      { question: '¿Cómo es diferente el pensamiento analítico de ser bueno con los números?', answer: 'El pensamiento analítico es mucho más amplio que la habilidad numérica. Incluye reconocimiento de patrones, razonamiento lógico, evaluación cualitativa y descomposición estructurada de problemas. Mientras que las habilidades cuantitativas son un componente, el pensamiento analítico también aplica a evaluar argumentos, valorar datos cualitativos y estructurar problemas ambiguos.' },
      { question: '¿Puedo desarrollar el pensamiento analítico o es innato?', answer: 'El pensamiento analítico es absolutamente desarrollable. Practica con estudios de caso, toma cursos de lógica o estadística, usa marcos estructurados (MECE, basados en hipótesis) regularmente y busca roles que requieran análisis. Como cualquier habilidad, la práctica consistente construye competencia con el tiempo.' },
      { question: '¿Qué herramientas demuestran pensamiento analítico en un currículum?', answer: 'Excel (funciones avanzadas, tablas dinámicas), SQL, Tableau, Power BI, Python/R para análisis de datos, herramientas de modelado financiero y software estadístico. Sin embargo, las herramientas solas no demuestran pensamiento analítico — combina las menciones de herramientas con los insights y decisiones que apoyaron.' }
    ]
  },
  'creative-thinking': {
    slug: 'pensamiento-creativo',
    title: 'Pensamiento Creativo',
    description: 'El pensamiento creativo es la capacidad de generar ideas novedosas, hacer conexiones inesperadas y desarrollar soluciones innovadoras a problemas. Se basa en la metodología de pensamiento lateral de Edward de Bono, la teoría de resolución inventiva de problemas (TRIZ) y la investigación sobre pensamiento divergente de J.P. Guilford. El pensamiento creativo incluye ideación, conceptualización, experimentación y la capacidad de ver posibilidades más allá de los enfoques convencionales.\n\nEn contextos de negocios, el pensamiento creativo aplica a innovación de productos, desarrollo de campañas de marketing, rediseño de procesos, resolución de problemas, planificación estratégica y diferenciación competitiva. Los marcos que apoyan el pensamiento creativo incluyen brainstorming, SCAMPER (Sustituir, Combinar, Adaptar, Modificar, Poner en otros usos, Eliminar, Revertir), mapas mentales y la fase de ideación de design thinking.\n\nEl pensamiento creativo no se limita a roles artísticos — es una habilidad cognitiva crítica para cualquiera que busque mejorar procesos existentes, desarrollar nuevas ofertas o navegar desafíos sin precedentes. El estudio State of Create de Adobe encontró que las empresas que fomentan activamente el pensamiento creativo superan a sus pares en crecimiento de ingresos, participación de mercado y liderazgo competitivo.',
    whyImportant: 'El Global CEO Study de IBM identificó la creatividad como la cualidad de liderazgo más importante para navegar la complejidad. Los pensadores creativos impulsan la innovación, y la innovación impulsa el crecimiento. Según McKinsey, las empresas en el cuartil superior de innovación superan a sus pares en un 67% en retornos totales para accionistas.\n\nEn un currículum, el pensamiento creativo señala la capacidad de generar valor a través de enfoques novedosos. Es particularmente importante para roles de marketing, producto, diseño, consultoría y estrategia, pero es valorado en cualquier posición donde se espere mejora e innovación.',
    keywords: ['pensamiento creativo currículum', 'habilidades de creatividad CV', 'pensamiento innovador empleo', 'habilidades creativas currículum'],
    searchIntents: ['cómo mostrar pensamiento creativo en currículum', 'ejemplos de pensamiento creativo para solicitud de empleo', 'habilidades de creatividad para carrera'],
    relatedSkills: ['Innovación', 'Resolución de Problemas', 'Design Thinking', 'Brainstorming', 'Pensamiento Estratégico', 'Adaptabilidad', 'Narrativa', 'Pensamiento Crítico'],
    professionSlugs: ['gerente-de-producto', 'especialista-en-relaciones-publicas', 'consultor-de-gestion', 'planificador-de-eventos', 'planificador-de-bodas', 'periodista'],
    atsKeywords: ['pensamiento creativo', 'creatividad', 'innovación', 'ideación', 'brainstorming', 'design thinking', 'pensamiento fuera de la caja', 'resolución creativa de problemas', 'conceptualización', 'inventivo'],
    resumeTips: [
      'Muestra pensamiento creativo a través de innovaciones tangibles: nuevos productos, procesos, campañas o soluciones que originaste.',
      'Cuantifica el impacto de tus contribuciones creativas: ingresos generados, costos ahorrados, engagement aumentado.',
      'Menciona metodologías creativas utilizadas: design thinking, facilitación de brainstorming, SCAMPER, prototipado rápido.',
      'Destaca soluciones creativas a problemas de negocio, no solo creatividad artística o estética.',
      'Incluye patentes, innovaciones publicadas o premios por trabajo creativo si aplica.'
    ],
    exampleBullets: [
      'Conceptualizó y lanzó una campaña de marketing creativa que se volvió viral en redes sociales, generando 2.5M de impresiones y $450K en ingresos atribuibles dentro de 3 semanas.',
      'Diseñó un programa innovador de lealtad del cliente combinando gamificación y recompensas escalonadas, aumentando la tasa de compra repetida en un 38% y el valor de vida del cliente en $120 por cuenta.',
      'Facilitó 25 talleres de design thinking generando más de 200 ideas, con 8 avanzando a etapa de prototipo y 3 lanzándose como nuevas características de producto sirviendo a 50,000 usuarios.',
      'Desarrolló una solución creativa a una restricción de cadena de suministro estableciendo 4 asociaciones alternativas con proveedores, reduciendo los tiempos de entrega en un 60% y ahorrando $340K anuales.'
    ],
    faqs: [
      { question: '¿Cómo muestro pensamiento creativo en un currículum para un rol no creativo?', answer: 'El pensamiento creativo aplica a cualquier rol donde mejoraste un proceso, encontraste una solución no convencional o desarrollaste un nuevo enfoque. Describe innovaciones en operaciones, estrategias de ventas, soluciones técnicas o mejoras de experiencia del cliente. La creatividad es resolución de problemas con originalidad.' },
      { question: '¿El pensamiento creativo es innato o se puede aprender?', answer: 'La investigación muestra consistentemente que el pensamiento creativo se puede desarrollar a través de la práctica y el ambiente adecuado. Técnicas como brainstorming, mapas mentales y design thinking proporcionan enfoques estructurados para la ideación creativa. La exposición regular a perspectivas diversas también fortalece la capacidad creativa.' },
      { question: '¿Cuál es la diferencia entre pensamiento creativo e innovación?', answer: 'El pensamiento creativo es la capacidad cognitiva de generar ideas novedosas. La innovación es la implementación de ideas creativas en valor tangible. Necesitas pensamiento creativo para innovar, pero la innovación también requiere ejecución, recursos y alineación de stakeholders. Ambos son valiosos en un currículum.' }
    ]
  },
  'innovation': {
    slug: 'innovacion',
    title: 'Innovación',
    description: 'La innovación es la capacidad de transformar ideas creativas en soluciones implementadas que entregan valor medible. Abarca tanto la innovación incremental (mejora continua de productos y procesos existentes) como la innovación disruptiva (la teoría de Clayton Christensen de crear mercados o redes de valor completamente nuevos). El proceso de innovación abarca ideación, validación, prototipado, pruebas y escalado.\n\nLos marcos que apoyan la innovación incluyen la metodología Lean Startup (Build-Measure-Learn de Eric Ries), el proceso Stage-Gate para desarrollo de productos, el modelo de Tres Horizontes para equilibrar innovación actual y futura y la Matriz de Ambición de Innovación de Nagji y Tuff. Los innovadores exitosos combinan empatía con el cliente, evaluación de factibilidad técnica y evaluación de viabilidad de negocio.\n\nEn las organizaciones, la innovación se manifiesta como lanzamientos de nuevos productos, reingeniería de procesos, transformación de modelos de negocio y adopción de tecnología. La gestión de innovación requiere crear una cultura de experimentación, aceptar el fracaso calculado y asignar recursos entre explotación (optimizar el negocio actual) y exploración (crear nuevas oportunidades).',
    whyImportant: 'El informe Most Innovative Companies de BCG muestra que las 50 empresas más innovadoras entregan una prima de retorno total al accionista 3.3 puntos porcentuales más alta anualmente. La investigación de PwC indica que el 93% de los ejecutivos creen que el crecimiento orgánico a través de la innovación es el principal impulsor del crecimiento de ingresos de su empresa.\n\nEn un currículum, la innovación demuestra la capacidad de crear ventaja competitiva e impulsar el crecimiento. Es una competencia crítica para roles de liderazgo en producto, estrategia, consultoría y tecnología. Los empleadores buscan cada vez más innovadores que puedan navegar la transformación digital y la disrupción del mercado.',
    keywords: ['habilidades de innovación currículum', 'pensamiento innovador CV', 'experiencia de innovación empleo', 'consejos de innovación currículum'],
    searchIntents: ['cómo mostrar innovación en currículum', 'ejemplos de innovación para solicitud de empleo', 'habilidades de innovación para avance profesional'],
    relatedSkills: ['Pensamiento Creativo', 'Resolución de Problemas', 'Pensamiento Estratégico', 'Design Thinking', 'Emprendimiento', 'Gestión del Cambio', 'Investigación', 'Aprendizaje Continuo'],
    professionSlugs: ['gerente-de-producto', 'consultor-de-estrategia', 'consultor-de-gestion', 'gerente-general', 'consultor-de-gestion-del-cambio', 'gerente-de-operaciones'],
    atsKeywords: ['innovación', 'soluciones innovadoras', 'innovación de procesos', 'innovación de productos', 'innovación de modelos de negocio', 'transformación digital', 'mejora continua', 'I+D', 'innovación disruptiva', 'lean startup'],
    resumeTips: [
      'Destaca innovaciones específicas que concebiste, desarrollaste o lideraste hasta su implementación.',
      'Cuantifica resultados de innovación: ingresos de nuevos productos, ganancias de eficiencia, participación de mercado capturada, patentes registradas.',
      'Diferencia entre mejoras incrementales de procesos e innovaciones transformadoras.',
      'Menciona metodologías de innovación: Lean Startup, design thinking, innovación ágil, Stage-Gate.',
      'Muestra el ciclo completo de innovación: desde generación de ideas hasta validación, implementación y escalado.'
    ],
    exampleBullets: [
      'Lideró la innovación y lanzamiento de 3 nuevas líneas de productos generando $7.5M en ingresos del primer año, representando el 25% del crecimiento total de la empresa.',
      'Implementó un proceso de innovación lean que redujo los ciclos de desarrollo de producto de 18 a 6 meses, permitiendo a la empresa llevar 4 nuevas ofertas al mercado anualmente.',
      'Registró 2 patentes por mejoras innovadoras de procesos que redujeron el desperdicio de manufactura en un 35% y ahorraron $1.8M en costos anuales de materiales.',
      'Estableció un laboratorio de innovación con un presupuesto de $500K, incubando 12 ideas y lanzando 3 productos viables dentro de 18 meses, incluyendo uno que se convirtió en la fuente de ingresos de más rápido crecimiento de la empresa.'
    ],
    faqs: [
      { question: '¿Cómo muestro innovación si trabajo en una industria tradicional?', answer: 'La innovación no se limita a empresas de tecnología. Las mejoras de procesos, nuevas ofertas de servicio, eficiencias operativas y soluciones creativas a desafíos de la industria califican. Enfócate en cómo introdujiste nuevos enfoques que mejoraron resultados en tu contexto específico.' },
      { question: '¿Cuál es la diferencia entre innovación y mejora continua?', answer: 'La mejora continua (kaizen) se enfoca en mejoras incrementales a procesos existentes. La innovación puede ser incremental pero también abarca cambios transformadores o disruptivos que crean valor completamente nuevo. Ambas son valiosas — menciona el tipo más relevante para el rol al que te diriges.' },
      { question: '¿Debo listar patentes o propiedad intelectual en mi currículum?', answer: 'Absolutamente. Las patentes, marcas registradas e innovaciones publicadas son prueba concreta de capacidad innovadora. Lístalas en una sección dedicada con números de patente y títulos. Incluso las patentes pendientes demuestran innovación en progreso.' }
    ]
  },
  'attention-to-detail': {
    slug: 'atencion-al-detalle',
    title: 'Atención al Detalle',
    description: 'La atención al detalle es la capacidad de completar tareas de forma exhaustiva y precisa mientras se identifican errores, inconsistencias y problemas de calidad que otros podrían pasar por alto. Abarca la revisión de textos, validación de datos, aseguramiento de calidad, verificación de cumplimiento y ejecución meticulosa de procesos.\n\nEn entornos profesionales, la atención al detalle aplica a la conciliación financiera, revisión de contratos, control de calidad, precisión en la entrada de datos, revisión de código, cumplimiento regulatorio y aseguramiento de calidad de entregables. Es respaldada por técnicas como listas de verificación (el Checklist Manifesto de Atul Gawande), procesos de revisión por pares y sistemas de gestión de calidad.\n\nAunque la atención al detalle a veces se ve como una expectativa básica, en entornos de alto riesgo (salud, finanzas, legal, ingeniería), es una competencia crítica que previene errores costosos, violaciones de cumplimiento e incidentes de seguridad.',
    whyImportant: 'Los errores causados por la falta de atención al detalle cuestan significativamente a las organizaciones. En servicios financieros, un solo error de punto decimal puede resultar en millones en pérdidas. Una encuesta de CareerBuilder encontró que el 77% de los gerentes de contratación consideran la atención al detalle una prioridad máxima al evaluar candidatos.\n\nEn un currículum, la atención al detalle se demuestra a través de métricas de precisión, logros de reducción de errores, mejoras de calidad y registros de cumplimiento. Es especialmente valorada en roles de finanzas, legal, salud, operaciones y aseguramiento de calidad.',
    keywords: ['atención al detalle currículum', 'orientado al detalle CV', 'habilidades de precisión empleo', 'atención meticulosa currículum'],
    searchIntents: ['cómo mostrar atención al detalle en currículum', 'ejemplos de atención al detalle para empleo', 'consejos de currículum orientado al detalle'],
    relatedSkills: ['Organización', 'Aseguramiento de Calidad', 'Pensamiento Analítico', 'Precisión', 'Gestión del Tiempo', 'Revisión de Textos', 'Cumplimiento', 'Gestión de Procesos'],
    professionSlugs: ['abogado', 'asesor-financiero', 'reclutador', 'planificador-de-eventos', 'ejecutivo-de-cuentas', 'gerente-de-operaciones'],
    atsKeywords: ['atención al detalle', 'orientado al detalle', 'precisión', 'aseguramiento de calidad', 'meticuloso', 'exactitud', 'detección de errores', 'control de calidad', 'cumplimiento', 'revisión de textos', 'validación de datos'],
    resumeTips: [
      'Muestra atención al detalle a través de tasas de error, porcentajes de precisión y métricas de calidad en lugar de autodescripción.',
      'Deja que tu currículum impecable en sí mismo demuestre la atención al detalle — cualquier error ortográfico socava la afirmación.',
      'Menciona procesos específicos de aseguramiento de calidad que implementaste o seguiste.',
      'Cuantifica el costo de errores que previniste a través de un trabajo cuidadoso.',
      'Destaca la atención al detalle en contextos de alto riesgo: informes financieros, documentos legales, cumplimiento regulatorio.'
    ],
    exampleBullets: [
      'Mantuvo una tasa de precisión del 99.97% procesando más de 5,000 transacciones financieras mensuales, identificando y corrigiendo 15 discrepancias que habrían resultado en $340K en fondos mal asignados.',
      'Implementó un proceso de revisión de calidad de 4 etapas para entregables de clientes, reduciendo errores en documentos en un 85% y eliminando problemas reportados por clientes durante 18 meses consecutivos.',
      'Revisó y validó más de 200 contratos legales por trimestre, detectando un promedio de 8 errores materiales por mes que podrían haber expuesto a la firma a responsabilidad.',
      'Lideró una auditoría de datos de 100,000 registros CRM, identificando y corrigiendo 12,000 entradas duplicadas o inexactas y mejorando la precisión de las campañas de marketing en un 28%.'
    ],
    faqs: [
      { question: '¿Debo escribir "orientado al detalle" en mi currículum?', answer: 'Evita la frase genérica "orientado al detalle" ya que está sobreusada y no es convincente. En su lugar, demuéstralo a través de logros específicos: tasas de precisión, reducciones de errores, métricas de calidad. El formato, gramática y consistencia de tu currículum deben en sí mismos demostrar la atención al detalle.' },
      { question: '¿Cómo equilibro la atención al detalle con la velocidad?', answer: 'Muestra que logras ambas implementando procesos de calidad eficientes. Los ejemplos incluyen crear listas de verificación, usar automatización para validación y establecer flujos de revisión. Los empleadores quieren exhaustividad que no sacrifique la productividad.' },
      { question: '¿La atención al detalle es más importante para algunos roles que para otros?', answer: 'Todos los roles se benefician de ella, pero es crítica para la misión en finanzas (cálculos precisos), legal (precisión de contratos), salud (seguridad del paciente) y operaciones (cumplimiento de procesos). Enfatízala más fuertemente cuando apliques a estos campos.' }
    ]
  },
  'time-management': {
    slug: 'gestion-del-tiempo',
    title: 'Gestión del Tiempo',
    description: 'La gestión del tiempo es la práctica de planificar, organizar y controlar cómo se asigna el tiempo a través de tareas y responsabilidades para maximizar la productividad y lograr metas. Las metodologías clave incluyen la Matriz de Eisenhower (categorización urgente/importante), la Técnica Pomodoro (intervalos de trabajo enfocados), bloques de tiempo (Deep Work de Cal Newport), Getting Things Done (sistema GTD de David Allen) y el Principio de Pareto 80/20 para identificar actividades de alto impacto.\n\nLos gestores de tiempo efectivos establecen prioridades claras, establecen plazos realistas, minimizan actividades que desperdician tiempo, delegan apropiadamente y mantienen el enfoque en trabajo de alto valor. Entienden sus patrones personales de productividad, agrupan tareas similares y protegen bloques dedicados para trabajo profundo mientras permanecen responsivos a necesidades urgentes.\n\nLa gestión moderna del tiempo también aborda las distracciones digitales, la sobrecarga de reuniones y los desafíos del cambio de contexto en entornos de trabajo abiertos y remotos. La investigación de RescueTime muestra que los trabajadores del conocimiento promedian solo 2 horas y 48 minutos de trabajo productivo por día, haciendo que las habilidades de gestión del tiempo sean una ventaja competitiva significativa.',
    whyImportant: 'La gestión del tiempo impacta directamente la producción profesional y el avance de carrera. Un estudio de McKinsey encontró que los empleados de alto rendimiento gestionan su tiempo un 20% más efectivamente que los de rendimiento promedio. Para roles con prioridades en competencia — gerentes de proyecto, consultores, ejecutivos — la gestión del tiempo es una competencia central que determina el éxito.\n\nEn un currículum, la gestión efectiva del tiempo se demuestra a través de registros de entrega a tiempo, gestión exitosa de múltiples prioridades concurrentes y mejoras de productividad. Señala confiabilidad, eficiencia y la capacidad de manejar responsabilidad incrementada.',
    keywords: ['habilidades de gestión del tiempo currículum', 'capacidades de gestión del tiempo CV', 'habilidades de productividad empleo', 'consejos de gestión del tiempo currículum'],
    searchIntents: ['cómo mostrar gestión del tiempo en currículum', 'ejemplos de gestión del tiempo para solicitud de empleo', 'habilidades de gestión del tiempo para carrera'],
    relatedSkills: ['Priorización', 'Organización', 'Establecimiento de Metas', 'Delegación', 'Multitarea', 'Productividad', 'Gestión de Proyectos', 'Enfoque'],
    professionSlugs: ['gerente-de-proyectos', 'planificador-de-eventos', 'reclutador', 'ejecutivo-de-cuentas', 'abogado', 'agente-de-bienes-raices'],
    atsKeywords: ['gestión del tiempo', 'gestión de plazos', 'priorización', 'programación', 'productividad', 'gestión de carga de trabajo', 'gestión de tareas', 'gestión de calendario', 'eficiencia', 'orientado a plazos'],
    resumeTips: [
      'Muestra gestión del tiempo a través de tasas de entrega a tiempo, cronogramas de proyectos cumplidos y plazos logrados consistentemente.',
      'Cuantifica cuántos proyectos o prioridades concurrentes gestionaste exitosamente.',
      'Menciona mejoras de productividad que impulsaste para ti o tu equipo.',
      'Referencia herramientas de gestión del tiempo usadas: calendarios, software de gestión de proyectos, rastreo de tiempo.',
      'Destaca instancias donde entregaste antes de lo programado o gestionaste cronogramas comprimidos.'
    ],
    exampleBullets: [
      'Gestionó 8 proyectos concurrentes con clientes con un presupuesto combinado de $2.5M, entregando el 95% a tiempo y manteniendo una calificación de satisfacción del cliente de 4.8/5.0.',
      'Implementó la metodología de bloques de tiempo en un equipo de 15 personas, aumentando la producción productiva en un 30% y reduciendo el tiempo de reuniones en un 40% a través de bloques de comunicación estructurados.',
      'Entregó un lanzamiento de producto crítico 10 días antes del plazo de 90 días reestructurando el cronograma del proyecto y optimizando la asignación de recursos en 4 flujos de trabajo.',
      'Redujo la carga administrativa personal en un 50% a través de automatización y delegación, liberando 10 horas por semana para actividades de desarrollo de clientes de alto valor que generaron $500K en nuevos ingresos.'
    ],
    faqs: [
      { question: '¿Cómo demuestro gestión del tiempo en un currículum sin sonar genérico?', answer: 'Usa métricas específicas: número de proyectos gestionados simultáneamente, porcentajes de entrega a tiempo, registros de cumplimiento de plazos y mejoras de eficiencia. Evita frases como "excelente gestión del tiempo" y en su lugar muestra evidencia a través de tus logros.' },
      { question: '¿Qué herramientas de gestión del tiempo debo mencionar?', answer: 'Herramientas como Asana, Trello, Monday.com, Jira, Microsoft Project, Google Calendar, Toggl y Notion demuestran gestión práctica del tiempo. Menciona las más relevantes para tu rol objetivo y muestra cómo contribuyeron a tu productividad.' },
      { question: '¿Es la multitarea una forma de gestión del tiempo?', answer: 'La investigación muestra que la verdadera multitarea reduce la productividad hasta en un 40%. La gestión moderna del tiempo enfatiza el trabajo enfocado de una sola tarea, agrupación de actividades similares y programación estratégica en lugar de multitarea simultánea. En un currículum, destaca tu capacidad para gestionar múltiples prioridades a través de la organización, no la ejecución simultánea.' }
    ]
  },
  'prioritization': {
    slug: 'priorizacion',
    title: 'Priorización',
    description: 'La priorización es la habilidad de determinar el orden e importancia de tareas, proyectos y objetivos para asignar tiempo, energía y recursos limitados de manera efectiva. Los marcos incluyen la Matriz de Eisenhower (urgente vs. importante), el método MoSCoW (Debe tener, Debería tener, Podría tener, No tendrá), puntuación RICE (Alcance, Impacto, Confianza, Esfuerzo), el marco ICE (Impacto, Confianza, Facilidad) y matrices de valor-vs-esfuerzo.\n\nLos priorizadores efectivos distinguen entre tareas urgentes e importantes, hacen compensaciones difíciles, dicen no al trabajo de bajo valor y ajustan prioridades dinámicamente a medida que las circunstancias cambian. Aplican el Principio de Pareto para enfocarse en el 20% de las actividades que generan el 80% de los resultados, y comunican los cambios de prioridad claramente a los stakeholders.\n\nEn entornos ágiles, la priorización es central para la gestión del backlog, planificación de sprints y asignación de recursos. A nivel ejecutivo, la priorización determina la asignación estratégica de recursos, gestión de portafolio y enfoque organizacional.',
    whyImportant: 'Las fallas de priorización son una causa principal de excesos en proyectos y plazos incumplidos. Un estudio de PMI encontró que las organizaciones que priorizan efectivamente completan un 40% más de proyectos a tiempo y dentro del presupuesto. En entornos de ritmo rápido con recursos limitados, la capacidad de enfocarse en lo que más importa impacta directamente los resultados.\n\nEn un currículum, las habilidades de priorización señalan pensamiento estratégico, eficiencia de recursos y la capacidad de entregar resultados bajo demandas en competencia. Es esencial para roles de gestión de proyectos, gestión de producto, operaciones y ejecutivos.',
    keywords: ['habilidades de priorización currículum', 'establecimiento de prioridades CV', 'priorización de tareas empleo', 'capacidades de priorización currículum'],
    searchIntents: ['cómo mostrar priorización en currículum', 'ejemplos de priorización para solicitud de empleo', 'habilidades de priorización para carrera'],
    relatedSkills: ['Gestión del Tiempo', 'Toma de Decisiones', 'Organización', 'Establecimiento de Metas', 'Pensamiento Estratégico', 'Delegación', 'Gestión de Proyectos', 'Enfoque'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-producto', 'gerente-de-programas', 'gerente-de-operaciones', 'gerente-general'],
    atsKeywords: ['priorización', 'gestión de prioridades', 'priorización de tareas', 'priorización de carga de trabajo', 'priorización estratégica', 'priorización de backlog', 'priorización de recursos', 'MoSCoW', 'Matriz de Eisenhower'],
    resumeTips: [
      'Muestra priorización a través de malabares exitosos de demandas en competencia con resultados claros.',
      'Menciona marcos de priorización usados: MoSCoW, RICE, matrices de valor-esfuerzo.',
      'Cuantifica el resultado de la priorización efectiva: proyectos entregados, recursos optimizados, plazos cumplidos.',
      'Destaca situaciones donde decir "no" o despriorizar llevó a mejores resultados.',
      'Demuestra repriorización dinámica en respuesta a condiciones de negocio cambiantes.'
    ],
    exampleBullets: [
      'Priorizó un backlog de más de 150 solicitudes de características usando puntuación RICE, enfocando al equipo en 12 elementos de alto impacto que impulsaron el 65% del crecimiento anual de usuarios del producto.',
      'Gestionó prioridades en competencia en 5 departamentos con un pool compartido de recursos de ingeniería, implementando una matriz de prioridades que mejoró el tiempo de entrega multifuncional en un 35%.',
      'Reestructuró el portafolio de proyectos de 20 iniciativas durante una reducción de presupuesto, despriorizando 8 proyectos de bajo ROI y redirigiendo $2M a los 5 de mayor impacto, logrando un 140% del ROI objetivo.',
      'Implementó priorización MoSCoW para planificación de sprints en 3 equipos ágiles, aumentando la tasa de completitud de sprint del 68% al 92% y reduciendo el scope creep en un 50%.'
    ],
    faqs: [
      { question: '¿Cómo muestro priorización en un currículum?', answer: 'Describe situaciones donde gestionaste demandas en competencia e hiciste elecciones estratégicas sobre en qué enfocarte. Incluye el número de prioridades en competencia, el método usado para evaluarlas y el resultado de tus decisiones de priorización. Los resultados cuantificados son esenciales.' },
      { question: '¿Es la priorización lo mismo que la gestión del tiempo?', answer: 'La priorización es un componente de la gestión del tiempo, pero se enfoca específicamente en evaluar y clasificar la importancia de las tareas. La gestión del tiempo es más amplia, abarcando programación, técnicas de productividad y ejecución. Una gestión del tiempo fuerte depende de una priorización efectiva.' },
      { question: '¿Qué hago cuando todo está marcado como alta prioridad?', answer: 'Este es un desafío profesional común. Abórdalo aplicando marcos como la Matriz de Eisenhower para distinguir urgencia de importancia, negociando plazos con stakeholders y escalando cuando sea necesario. En un currículum, mostrar que navegaste situaciones de "todo es urgente" demuestra madurez.' }
    ]
  },
  'multitasking': {
    slug: 'multitarea',
    title: 'Multitarea',
    description: 'La multitarea en un contexto profesional se refiere a la capacidad de gestionar y avanzar en múltiples tareas, proyectos o responsabilidades dentro de plazos superpuestos. Si bien la investigación en neurociencia muestra que el cerebro no puede realmente realizar dos tareas cognitivas simultáneamente, la multitarea profesional se trata de cambio efectivo de tareas, gestión de carga de trabajo y mantener el progreso en prioridades concurrentes.\n\nLos profesionales multitarea efectivos sobresalen en el cambio rápido de contexto con mínima pérdida de productividad, manteniendo conciencia situacional en múltiples proyectos, usando sistemas organizacionales para rastrear flujos de trabajo paralelos y sabiendo cuándo procesar por lotes versus intercalar tareas.\n\nLa distinción clave es entre multitarea reactiva (constantemente interrumpido, sin enfoque) y multitarea estratégica (gestionando deliberadamente múltiples prioridades con sistemas organizados). Los empleadores valoran lo segundo — la capacidad de mantener múltiples proyectos avanzando sin dejar caer nada o incumplir plazos.',
    whyImportant: 'En la mayoría de los roles profesionales, gestionar una sola tarea a la vez no es realista. El trabajador del conocimiento promedio gestiona 15 proyectos concurrentes según la investigación de Wrike. Para roles como planificación de eventos, gestión de proyectos, asistencia ejecutiva y operaciones, manejar flujos de trabajo paralelos es un requisito fundamental del trabajo.\n\nEn un currículum, demostrar capacidad de multitarea señala capacidad, confiabilidad y habilidad organizacional. Asegura a los empleadores que puedes manejar el alcance completo del rol sin sentirte abrumado.',
    keywords: ['habilidades de multitarea currículum', 'capacidades de multitarea CV', 'gestión de múltiples proyectos', 'habilidades de multitarea empleo'],
    searchIntents: ['cómo mostrar multitarea en currículum', 'ejemplos de multitarea para solicitud de empleo', 'habilidades de multitarea para carrera'],
    relatedSkills: ['Gestión del Tiempo', 'Organización', 'Priorización', 'Adaptabilidad', 'Atención al Detalle', 'Gestión de Proyectos', 'Enfoque', 'Manejo del Estrés'],
    professionSlugs: ['planificador-de-eventos', 'gerente-de-proyectos', 'reclutador', 'agente-de-bienes-raices', 'gerente-de-operaciones', 'planificador-de-bodas'],
    atsKeywords: ['multitarea', 'gestión de múltiples proyectos', 'proyectos concurrentes', 'flujos de trabajo paralelos', 'cambio de tareas', 'gestión de carga de trabajo', 'múltiples prioridades', 'ambiente de alto volumen', 'ritmo acelerado'],
    resumeTips: [
      'Cuantifica tu multitarea: número de proyectos concurrentes, clientes o flujos de trabajo gestionados.',
      'Muestra resultados logrados en múltiples responsabilidades simultáneas, no solo que estuviste ocupado.',
      'Menciona sistemas organizacionales y herramientas que habilitaron la multitarea efectiva.',
      'Demuestra multitarea sin sacrificar la calidad — combina volumen con métricas de precisión o satisfacción.',
      'Usa frases como "gestionó proyectos concurrentes" en lugar de "bueno en la multitarea".'
    ],
    exampleBullets: [
      'Gestionó simultáneamente 12 proyectos activos de clientes con un valor combinado de $4.2M, entregando el 96% a tiempo mientras mantenía una puntuación de satisfacción del cliente de 4.7/5.0.',
      'Coordinó 8 preparaciones de eventos concurrentes incluyendo negociaciones de lugar, gestión de proveedores y logística para eventos que variaban de 50 a 500 asistentes.',
      'Equilibró un pipeline de reclutamiento de 35 posiciones abiertas en 6 departamentos, llenando el 90% dentro de los plazos objetivo y reduciendo el tiempo promedio de contratación en 15 días.',
      'Gestionó 3 lanzamientos de producto simultáneamente en diferentes segmentos de mercado, todos lanzándose dentro de sus ventanas objetivo y colectivamente generando $2.8M en ingresos del primer trimestre.'
    ],
    faqs: [
      { question: '¿Es la multitarea realmente una habilidad o es en realidad contraproducente?', answer: 'La verdadera multitarea cognitiva es contraproducente. Sin embargo, la multitarea profesional — gestionar múltiples responsabilidades concurrentes a través de organización, priorización y cambio estratégico de tareas — es altamente valiosa. En un currículum, enfatiza la gestión organizada de múltiples prioridades en lugar de hacer todo a la vez.' },
      { question: '¿Cómo demuestro capacidad de multitarea en un currículum?', answer: 'Lista el número de proyectos, clientes o responsabilidades concurrentes que manejaste junto con los resultados logrados. Incluye métricas de calidad (tasas de precisión, puntuaciones de satisfacción) para demostrar que malabarear múltiples tareas no comprometió la calidad de tu producción.' },
      { question: '¿Debo describir la multitarea diferente para diferentes industrias?', answer: 'Sí. En planificación de eventos, enfatiza la coordinación de eventos concurrentes. En gestión de proyectos, enfatiza la entrega paralela de proyectos. En reclutamiento, enfatiza el volumen del pipeline. Adapta tus ejemplos de multitarea a las demandas concurrentes específicas del rol objetivo.' }
    ]
  },
  'organization': {
    slug: 'organizacion',
    title: 'Organización',
    description: 'La organización es la capacidad de arreglar sistemáticamente información, recursos, tareas y flujos de trabajo para maximizar la eficiencia y minimizar la confusión. Abarca la organización del espacio de trabajo físico, gestión de archivos digitales, documentación de procesos, estructuración de proyectos y arquitectura de información.\n\nLos profesionales organizados crean sistemas de archivo claros, mantienen registros precisos, establecen procesos repetibles, rastrean plazos confiablemente y aseguran que la información sea accesible para los stakeholders relevantes. Diseñan flujos de trabajo que reducen la fricción, crean plantillas que ahorran tiempo y construyen sistemas organizacionales que escalan a medida que crecen los equipos y proyectos.\n\nEn la era digital, las habilidades organizacionales se extienden a gestionar carpetas compartidas, mantener bases de datos CRM, estructurar herramientas de gestión de proyectos (Asana, Monday, Jira) y organizar canales de comunicación.',
    whyImportant: 'La desorganización cuesta a las empresas significativamente. Un estudio de IDC encontró que los empleados dedican 2.5 horas al día buscando información, costando a las organizaciones un promedio de $14,000 por trabajador del conocimiento anualmente. Para roles administrativos, operativos y de gestión de proyectos, la habilidad organizacional es un requisito base.\n\nEn un currículum, la organización se demuestra a través de mejoras de procesos, implementaciones de sistemas y ganancias de eficiencia. Señala profesionalismo, confiabilidad y la capacidad de manejar complejidad.',
    keywords: ['habilidades organizacionales currículum', 'capacidades de organización CV', 'habilidades organizacionales empleo', 'profesional organizado currículum'],
    searchIntents: ['cómo mostrar habilidades organizacionales en currículum', 'ejemplos de habilidades de organización para empleo', 'habilidades organizacionales para carrera'],
    relatedSkills: ['Gestión del Tiempo', 'Priorización', 'Atención al Detalle', 'Gestión de Proyectos', 'Mejora de Procesos', 'Documentación', 'Planificación', 'Multitarea'],
    professionSlugs: ['planificador-de-eventos', 'gerente-de-proyectos', 'gerente-de-operaciones', 'reclutador', 'planificador-de-bodas', 'gerente-de-recursos-humanos'],
    atsKeywords: ['habilidades organizacionales', 'organización', 'organización de procesos', 'gestión de archivos', 'organización de flujo de trabajo', 'organización de proyectos', 'enfoque sistemático', 'mantenimiento de registros', 'documentación', 'organización administrativa'],
    resumeTips: [
      'Demuestra organización a través de sistemas que construiste, procesos que optimizaste o eficiencias que creaste.',
      'Menciona herramientas y plataformas organizacionales usadas: sistemas CRM, software de gestión de proyectos, gestión documental.',
      'Cuantifica el impacto de tus mejoras organizacionales: tiempo ahorrado, errores reducidos, accesibilidad mejorada.',
      'Muestra organización a escala: organizar para equipos grandes, múltiples proyectos o eventos complejos.',
      'Destaca sistemas organizacionales que otros adoptaron o que se convirtieron en estándares del equipo/empresa.'
    ],
    exampleBullets: [
      'Diseñó e implementó un sistema de gestión documental para un departamento de 100 personas, reduciendo el tiempo promedio de búsqueda de documentos de 15 a 2 minutos y ahorrando unas 3,000 horas de empleados anuales.',
      'Organizó la logística de 15 eventos corporativos anuales con 200-800 asistentes cada uno, gestionando bases de datos de proveedores, cronogramas y presupuestos por $1.5M con cero plazos incumplidos.',
      'Creó un sistema centralizado de seguimiento de proyectos en Asana para 6 equipos multifuncionales, mejorando la visibilidad de proyectos y reduciendo el tiempo de reuniones de estado en un 60%.',
      'Estableció un marco organizacional de incorporación incluyendo más de 50 plantillas de documentos, listas de verificación y cronogramas de capacitación que redujeron el tiempo de preparación de nuevos empleados en un 40%.'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades organizacionales más allá de listarlas como habilidad?', answer: 'Describe sistemas organizacionales que creaste, procesos que estructuraste o eficiencias que impulsaste. Los ejemplos incluyen sistemas de archivo implementados, flujos de trabajo diseñados, bases de datos organizadas y eventos coordinados. Las métricas como tiempo ahorrado y errores reducidos proporcionan evidencia convincente.' },
      { question: '¿Las habilidades organizacionales siguen siendo importantes en la era de la IA y la automatización?', answer: 'Sí. Las herramientas de IA generan más información, no menos, haciendo que las habilidades organizacionales humanas sean más importantes para filtrar, estructurar y gestionar flujos de trabajo. La capacidad de organizar outputs de IA, mantener la calidad de los datos y diseñar flujos de trabajo eficientes humano-IA es una competencia en crecimiento.' },
      { question: '¿Qué herramientas organizacionales debo aprender para mi carrera?', answer: 'Asana, Trello, Monday.com y Jira para organización de proyectos; Notion y Confluence para gestión del conocimiento; Google Workspace y Microsoft 365 para organización de documentos; y plataformas CRM como Salesforce y HubSpot para organización de clientes. Elige herramientas relevantes para tu industria y rol.' }
    ]
  },
  'goal-setting': {
    slug: 'establecimiento-de-metas',
    title: 'Establecimiento de Metas',
    description: 'El establecimiento de metas es el proceso de definir objetivos específicos y medibles y crear planes estructurados para lograrlos. El marco más utilizado es SMART (Específico, Medible, Alcanzable, Relevante, Limitado en el Tiempo), desarrollado a partir de la teoría de establecimiento de metas de Edwin Locke, que demuestra que las metas específicas y desafiantes llevan a un mayor desempeño que las metas vagas o fáciles. Los marcos adicionales incluyen OKRs (Objetivos y Resultados Clave) popularizados por Intel y Google, BHAGs (Metas Grandes y Audaces) de Collins y Porras y el enfoque del Balanced Scorecard.\n\nLos establecedores de metas efectivos alinean los objetivos individuales con la estrategia del equipo y la organización, desglosan metas a largo plazo en hitos accionables, establecen indicadores clave de desempeño y construyen mecanismos de responsabilidad. Equilibran la ambición con el realismo, creando metas desafiantes que motivan sin ser desmoralizantes.\n\nEn contextos gerenciales, el establecimiento de metas impulsa los sistemas de gestión del desempeño, planificación estratégica, asignación de presupuesto y alineación del equipo.',
    whyImportant: 'La teoría de establecimiento de metas es uno de los marcos más validados en psicología organizacional. La investigación de Locke y Latham muestra que las metas específicas mejoran el desempeño en un 10-25% comparado con instrucciones de "haz tu mejor esfuerzo". Las organizaciones que implementan marcos estructurados de establecimiento de metas reportan mayor alineación, ejecución más rápida y mejores resultados financieros.\n\nEn un currículum, la capacidad de establecer metas demuestra pensamiento estratégico, orientación a resultados y alineación organizacional. Es especialmente valorada para roles de gestión, estrategia y planificación donde establecer dirección y medir el progreso son responsabilidades centrales.',
    keywords: ['habilidades de establecimiento de metas currículum', 'establecimiento de objetivos CV', 'capacidades de establecimiento de metas empleo', 'metas estratégicas currículum'],
    searchIntents: ['cómo mostrar establecimiento de metas en currículum', 'ejemplos de establecimiento de metas para solicitud de empleo', 'habilidades de establecimiento de metas para carrera'],
    relatedSkills: ['Pensamiento Estratégico', 'Planificación', 'Gestión del Tiempo', 'Responsabilidad', 'Automotivación', 'Priorización', 'Gestión del Desempeño', 'Liderazgo'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-ventas', 'gerente-general', 'gerente-de-operaciones', 'consejero-de-carrera', 'gerente-de-capacitacion'],
    atsKeywords: ['establecimiento de metas', 'OKRs', 'metas SMART', 'establecimiento de objetivos', 'desarrollo de KPIs', 'planificación estratégica', 'objetivos de desempeño', 'planificación de hitos', 'logro de metas', 'orientado a resultados'],
    resumeTips: [
      'Muestra el establecimiento de metas referenciando objetivos específicos que estableciste y excediste.',
      'Menciona marcos de establecimiento de metas usados: OKRs, SMART, Balanced Scorecard.',
      'Cuantifica el logro de metas: porcentaje de objetivos cumplidos, metas de ingresos excedidas, hitos de crecimiento logrados.',
      'Destaca el establecimiento de metas del equipo: muestra cómo alineaste los objetivos del equipo con la estrategia organizacional.',
      'Demuestra el ciclo completo: establecimiento de metas, monitoreo de progreso y medición de resultados.'
    ],
    exampleBullets: [
      'Implementó el marco OKR para un departamento de 40 personas, aumentando la tasa de logro de metas del equipo del 55% al 82% y alineando todos los objetivos individuales con las prioridades estratégicas de la empresa.',
      'Estableció y excedió el objetivo de ventas anual de $5M en un 18%, generando $5.9M a través de descomposición estructurada de metas trimestrales y revisiones semanales del pipeline.',
      'Estableció metas SMART para 20 reportes directos durante la planificación anual, con el 85% logrando o excediendo sus objetivos y 4 obteniendo promociones basadas en desempeño.',
      'Lideró talleres de establecimiento de metas estratégicas para el equipo ejecutivo, definiendo 5 OKRs organizacionales que guiaron $12M en asignación de recursos y entregaron el 130% del crecimiento objetivo.'
    ],
    faqs: [
      { question: '¿Debo listar el establecimiento de metas como habilidad en mi currículum?', answer: 'En lugar de listarlo, demuéstralo mostrando metas que estableciste y lograste. Referencia objetivos específicos, los marcos que usaste y los resultados entregados. Esto es más convincente que afirmar capacidad de establecer metas sin evidencia.' },
      { question: '¿Cuál es la diferencia entre OKRs y metas SMART?', answer: 'Los OKRs (Objetivos y Resultados Clave) se enfocan en objetivos aspiracionales con resultados clave medibles, típicamente establecidos trimestralmente. Las metas SMART son más prescriptivas, requiriendo que las metas sean Específicas, Medibles, Alcanzables, Relevantes y Limitadas en el Tiempo. Muchas organizaciones usan ambos: OKRs para alineación estratégica y metas SMART para gestión del desempeño individual.' },
      { question: '¿Cómo establezco metas que sean desafiantes pero alcanzables?', answer: 'La investigación sugiere establecer metas con un 60-70% de confianza de logro — suficientemente ambiciosas para motivar pero realistas para ser creíbles. Usa datos históricos para calibrar, involucra al equipo en el establecimiento de metas para aceptación e incluye puntos de revisión para ajustar si las circunstancias cambian.' }
    ]
  },
  'self-motivation': {
    slug: 'automotivacion',
    title: 'Automotivación',
    description: 'La automotivación es el impulso intrínseco de tomar la iniciativa, persistir a través de desafíos y mantener un alto desempeño sin presión o supervisión externa. Enraizada en la teoría de la autodeterminación (Deci y Ryan), que identifica la autonomía, competencia y relación como las tres necesidades psicológicas básicas que impulsan la motivación intrínseca, los profesionales automotivados establecen sus propios estándares y se responsabilizan a sí mismos.\n\nLa automotivación se manifiesta en comportamiento proactivo — identificar oportunidades antes de que se soliciten, perseguir el desarrollo profesional independientemente, establecer metas personales desafiantes y mantener la productividad durante períodos ambiguos o desestructurados. Está estrechamente relacionada con la teoría de autoeficacia de Bandura, que muestra que la creencia en la propia capacidad para tener éxito impulsa la persistencia y el esfuerzo.\n\nEn entornos de trabajo remoto e híbrido, la automotivación se ha convertido en un diferenciador crítico. Sin supervisión física, los empleados automotivados mantienen la calidad de producción y la iniciativa.',
    whyImportant: 'La automotivación es la base de la confiabilidad y la iniciativa. Los empleadores no pueden monitorear a cada empleado constantemente, y aquellos que se impulsan a sí mismos entregan consistentemente más valor. En roles de ventas, emprendimiento y trabajo remoto, la automotivación se correlaciona directamente con los resultados de desempeño.\n\nEn un currículum, la automotivación se demuestra a través de logros proactivos: proyectos iniciados independientemente, habilidades aprendidas sin indicación, metas excedidas sin presión externa y desempeño consistente durante períodos desestructurados.',
    keywords: ['automotivación currículum', 'automotivado CV', 'habilidades de iniciativa empleo', 'motivación intrínseca currículum'],
    searchIntents: ['cómo mostrar automotivación en currículum', 'ejemplos de automotivación para empleo', 'habilidades de iniciativa carrera'],
    relatedSkills: ['Ética de Trabajo', 'Establecimiento de Metas', 'Responsabilidad', 'Mentalidad de Crecimiento', 'Resiliencia', 'Iniciativa', 'Aprendizaje Continuo', 'Autodisciplina'],
    professionSlugs: ['agente-de-bienes-raices', 'gerente-de-ventas', 'ejecutivo-de-cuentas', 'asesor-financiero', 'reclutador', 'periodista'],
    atsKeywords: ['automotivado', 'iniciativa propia', 'iniciativa', 'proactivo', 'autodirigido', 'trabajador independiente', 'autoimpulsado', 'motivación intrínseca', 'autónomo', 'emprendedor'],
    resumeTips: [
      'Muestra automotivación a través de iniciativas que comenzaste sin que te lo pidieran.',
      'Destaca logros en entornos de trabajo sin supervisión o autónomos.',
      'Menciona aprendizaje autodirigido: certificaciones perseguidas, habilidades desarrolladas, cursos completados independientemente.',
      'Demuestra sobredesempeño consistente contra objetivos establecidos por otros.',
      'Usa verbos de acción como "inició", "fue pionero", "encabezó", "lanzó" para transmitir impulso proactivo.'
    ],
    exampleBullets: [
      'Autoinició un proyecto de mejora de procesos que automatizó 30 tareas manuales de reportes, ahorrando al equipo 25 horas por semana y ganando el premio trimestral de innovación de la empresa.',
      'Persiguió y obtuvo independientemente 3 certificaciones profesionales (PMP, CSM, ITIL) dentro de 18 meses, aumentando las calificaciones para una promoción lograda 6 meses antes de lo programado.',
      'Excedió la cuota de ventas en un promedio del 135% durante 8 trimestres consecutivos a través de prospección autodirigida y desarrollo de pipeline sin supervisión gerencial.',
      'Lanzó una iniciativa de intercambio de conocimientos multifuncional involucrando a 50 empleados en 4 departamentos, mejorando el flujo de información y reduciendo el trabajo duplicado en un 20%.'
    ],
    faqs: [
      { question: '¿Cómo demuestro automotivación en un currículum?', answer: 'Muestra iniciativas que tomaste independientemente, metas que excediste sin presión externa y habilidades que desarrollaste por tu cuenta. Ejemplos como lanzar proyectos, perseguir certificaciones o crear nuevos procesos sin que te lo pidan son evidencia poderosa de automotivación.' },
      { question: '¿Es la automotivación lo mismo que ser proactivo?', answer: 'Están estrechamente relacionadas pero no son idénticas. La automotivación es el impulso interno que sostiene el esfuerzo a lo largo del tiempo. Ser proactivo enfatiza iniciar la acción independientemente. Ambos son valorados por los empleadores, especialmente para roles remotos, posiciones de ventas y ambientes emprendedores.' },
      { question: '¿Cómo evalúan los empleadores remotos la automotivación durante la contratación?', answer: 'Buscan evidencia de desempeño autónomo pasado: experiencia exitosa de trabajo remoto, proyectos autodirigidos, trabajo freelance o emprendedor y logro consistente de metas en ambientes menos supervisados. Prepárate con ejemplos específicos durante las entrevistas.' }
    ]
  },
  'work-ethic': {
    slug: 'etica-de-trabajo',
    title: 'Ética de Trabajo',
    description: 'La ética de trabajo es un conjunto de valores centrados en la diligencia, disciplina, responsabilidad y compromiso con producir trabajo de alta calidad. Abarca la confiabilidad (cumplir compromisos consistentemente), la meticulosidad (exhaustividad y cuidado en el trabajo), la integridad (hacer lo correcto cuando nadie observa) y la perseverancia (esfuerzo sostenido a través de dificultades).\n\nUna fuerte ética de trabajo se manifiesta en cumplir plazos consistentemente, ir más allá de los requisitos mínimos, mantener la calidad bajo presión, ser confiable para colegas y clientes y tomar propiedad de los resultados. No se trata de trabajar las horas más largas — se trata de la calidad, consistencia e integridad de la contribución de uno.\n\nEn contextos organizacionales, la ética de trabajo forma la base de la confianza, reputación y avance profesional. La investigación de Gallup muestra que los empleados con ética de trabajo fuerte contribuyen un 21% más a la productividad y son un 59% menos propensos a buscar otros empleos.',
    whyImportant: 'La ética de trabajo es consistentemente clasificada entre las tres principales cualidades que los empleadores buscan en la contratación. Según una encuesta de CareerBuilder, el 73% de los empleadores priorizan la ética de trabajo sobre las habilidades técnicas específicas, creyendo que las habilidades se pueden enseñar pero el carácter es inherente. Una ética de trabajo fuerte construye confianza con gerentes y clientes, acelerando el avance profesional.\n\nEn un currículum, la ética de trabajo se demuestra a través de la consistencia de logros, superar expectativas y métricas de confiabilidad. Es universalmente valorada en todas las industrias y roles.',
    keywords: ['ética de trabajo currículum', 'fuerte ética de trabajo CV', 'dedicación profesional empleo', 'habilidades de ética de trabajo currículum'],
    searchIntents: ['cómo mostrar ética de trabajo en currículum', 'ejemplos de ética de trabajo para solicitud de empleo', 'demostrando ética de trabajo para carrera'],
    relatedSkills: ['Responsabilidad', 'Automotivación', 'Confiabilidad', 'Integridad', 'Atención al Detalle', 'Resiliencia', 'Gestión del Tiempo', 'Profesionalismo'],
    professionSlugs: ['gerente-de-operaciones', 'gerente-general', 'maestro', 'gerente-de-ventas', 'agente-de-bienes-raices', 'representante-de-servicio-al-cliente'],
    atsKeywords: ['ética de trabajo', 'dedicado', 'diligente', 'confiable', 'dependable', 'trabajador', 'comprometido', 'meticuloso', 'integridad profesional', 'ejecutor consistente'],
    resumeTips: [
      'Muestra ética de trabajo a través de desempeño consistente: trimestres consecutivos de logro de metas, registros de entrega ininterrumpidos.',
      'Destaca ir más allá: responsabilidades extra asumidas, metas desafiantes cumplidas, compromisos fuera de horario durante períodos críticos.',
      'Demuestra confiabilidad a través de asistencia, registros de entrega y métricas de confianza del cliente.',
      'Evita simplemente escribir "fuerte ética de trabajo" — en su lugar, deja que tu historial de logros consistentes lo demuestre.'
    ],
    exampleBullets: [
      'Logró o excedió los objetivos de desempeño trimestrales durante 12 trimestres consecutivos, ganando la designación de mejor ejecutor 3 años seguidos en una organización de ventas de 50 personas.',
      'Mantuvo un registro de entrega a tiempo del 100% en más de 200 proyectos de clientes durante 4 años, con cero escalaciones y una tasa de retención de clientes del 99%.',
      'Se ofreció voluntariamente para liderar una migración crítica de sistemas de fin de semana después de que el líder original se fue, completando la migración según lo programado y previniendo $300K en potenciales costos de tiempo de inactividad.',
      'Recibió el premio de Empleado del Año de la empresa (seleccionado entre más de 500 empleados) por dedicación consistente, servicio ejemplar al cliente y disposición para apoyar iniciativas interdepartamentales.'
    ],
    faqs: [
      { question: '¿Cómo demuestro ética de trabajo en mi currículum sin sonar presumido?', answer: 'Deja que los números hablen: períodos consecutivos de logro, registros perfectos de entrega, premios recibidos y satisfacción consistente del cliente. Los datos de logros factuales comunican la ética de trabajo más efectivamente que adjetivos como "trabajador" o "dedicado".' },
      { question: '¿Se trata la ética de trabajo de trabajar largas horas?', answer: 'No. La ética de trabajo moderna se trata de calidad, confiabilidad e integridad, no solo horas registradas. Un empleado que entrega consistentemente trabajo excelente en horas estándar demuestra una ética de trabajo más fuerte que uno que trabaja horas extra debido a mala planificación. Enfatiza la calidad de producción y la consistencia sobre el tiempo invertido.' },
      { question: '¿Los candidatos más jóvenes necesitan demostrar ética de trabajo más que los experimentados?', answer: 'Desafortunadamente, existen estereotipos generacionales. Los candidatos más jóvenes pueden contrarrestarlos con evidencia: logros de pasantías, logros académicos, compromisos extracurriculares y cualquier trabajo profesional o voluntario que demuestre dedicación y confiabilidad.' }
    ]
  },
  'accountability': {
    slug: 'responsabilidad',
    title: 'Responsabilidad',
    description: 'La responsabilidad es la disposición a aceptar la responsabilidad por las propias acciones, decisiones y sus resultados — tanto positivos como negativos. Involucra asumir resultados, admitir errores, cumplir compromisos y ser transparente sobre el progreso y los desafíos. Las Five Dysfunctions of a Team de Patrick Lencioni identifican la evasión de responsabilidad como una de las barreras principales para la efectividad del equipo.\n\nLos profesionales responsables establecen expectativas claras, rastrean compromisos, reportan estado honestamente, escalan problemas temprano en lugar de ocultarlos y aprenden de los fracasos en lugar de desviar la culpa. En contextos de liderazgo, la responsabilidad incluye crear una cultura donde los miembros del equipo se responsabilicen mutuamente.\n\nLa responsabilidad organizacional se extiende a la administración financiera, comportamiento ético, adherencia al cumplimiento y transparencia con los stakeholders. La investigación de Partners in Leadership muestra que las organizaciones con culturas de responsabilidad fuertes son 2.5 veces más propensas a lograr un desempeño financiero del cuartil superior.',
    whyImportant: 'La responsabilidad es la base de la confianza y el desempeño organizacional. Según Gallup, solo el 14% de los empleados sienten que el desempeño de su empresa se gestiona de una manera que los motiva — en gran parte debido a brechas de responsabilidad. Los equipos con normas fuertes de responsabilidad superan a aquellos sin ellas en un 50-100% en métricas clave.\n\nEn un currículum, la responsabilidad se demuestra a través de la propiedad de resultados (tanto éxitos como recuperaciones), informes transparentes y un historial de cumplir compromisos. Es especialmente valorada en roles de gestión, finanzas, cumplimiento y atención al cliente.',
    keywords: ['habilidades de responsabilidad currículum', 'responsabilidad laboral CV', 'responsabilidad profesional empleo', 'consejos de responsabilidad currículum'],
    searchIntents: ['cómo mostrar responsabilidad en currículum', 'ejemplos de responsabilidad para solicitud de empleo', 'habilidades de responsabilidad laboral'],
    relatedSkills: ['Ética de Trabajo', 'Integridad', 'Liderazgo', 'Comunicación', 'Transparencia', 'Confiabilidad', 'Automotivación', 'Establecimiento de Metas'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-general', 'gerente-de-operaciones', 'asesor-financiero', 'director-de-organizacion-sin-fines-de-lucro', 'gerente-de-ventas'],
    atsKeywords: ['responsabilidad', 'propiedad', 'compromiso', 'orientado a resultados', 'seguimiento', 'cumplimiento', 'transparencia', 'orientado a resultados', 'gestión de entregables', 'responsabilidad de desempeño'],
    resumeTips: [
      'Muestra responsabilidad a través de lenguaje de propiedad: "Fue responsable de", "Asumió propiedad de", "Tomó responsabilidad de".',
      'Destaca instancias donde asumiste la propiedad de resultados, incluyendo la recuperación de contratiempos.',
      'Demuestra la creación de cultura de responsabilidad: cómo estableciste normas de responsabilidad en equipos.',
      'Incluye métricas de las que fuiste responsable y tu historial contra ellas.'
    ],
    exampleBullets: [
      'Asumió plena responsabilidad de P&L para una unidad de negocio de $15M, entregando un crecimiento de ingresos del 12% año tras año y manteniendo márgenes operativos por encima del 25% durante 3 años consecutivos.',
      'Tomó responsabilidad por un retraso de proyecto comunicando inmediatamente el impacto a los stakeholders, presentando un plan de recuperación y entregando el cronograma revisado 5 días antes.',
      'Estableció check-ins semanales de responsabilidad para un equipo de 30 personas, mejorando la completitud de tareas a tiempo del 65% al 91% y reduciendo los entregables incumplidos en un 75%.',
      'Gestionó un programa de responsabilidad de cumplimiento en 5 unidades de negocio, logrando 100% de cumplimiento de auditoría y cero hallazgos regulatorios durante 2 años consecutivos.'
    ],
    faqs: [
      { question: '¿Cómo muestro responsabilidad en un currículum sin destacar fracasos?', answer: 'La responsabilidad se trata principalmente de propiedad y seguimiento. Muestra propiedad de P&L, responsabilidad de entrega de proyectos y cumplimiento de compromisos. Si incluyes una historia de recuperación, enmárcala positivamente: identificaste el problema temprano, comunicaste transparentemente y entregaste una resolución exitosa.' },
      { question: '¿Cuál es la diferencia entre responsabilidad y deber?', answer: 'El deber es sobre que te asignen una tarea o rol. La responsabilidad es sobre asumir la propiedad del resultado, sea exitoso o no. Puedes delegar el deber pero no la responsabilidad. En un currículum, el lenguaje de responsabilidad ("asumió propiedad de", "fue responsable de") tiene más peso que el lenguaje de deber ("fue encargado de").' },
      { question: '¿Cómo creo responsabilidad en equipos que gestiono?', answer: 'Implementa establecimiento de metas claro (OKRs/SMART), check-ins regulares de progreso, dashboards transparentes y consecuencias tanto para el logro como el no logro. Referencia marcos como el OZ Principle o el modelo de equipo de Lencioni. Muestra el impacto de la cultura de responsabilidad que creaste.' }
    ]
  },
  'teamwork': {
    slug: 'trabajo-en-equipo',
    title: 'Trabajo en Equipo',
    description: 'El trabajo en equipo es la capacidad de trabajar efectivamente con otros hacia objetivos compartidos, contribuyendo fortalezas individuales mientras se apoya el éxito colectivo. Involucra comunicación, coordinación, respeto mutuo, responsabilidad compartida y la capacidad de subordinar preferencias individuales por el beneficio del equipo.\n\nLos jugadores de equipo efectivos participan activamente en procesos grupales, comparten información abiertamente, proporcionan retroalimentación constructiva, apoyan a miembros del equipo con dificultades, celebran victorias colectivas y abordan disfunciones del equipo de manera constructiva. El modelo de Lencioni identifica confianza, conflicto saludable, compromiso, responsabilidad y atención a resultados como los cinco comportamientos de equipos cohesivos.\n\nEn los lugares de trabajo modernos, el trabajo en equipo se extiende a equipos virtuales, colaboración multifuncional, squads ágiles y organizaciones matriciales donde la membresía del equipo es fluida. La investigación del Project Aristotle de Google encontró que quién está en un equipo importa menos que cómo trabaja el equipo junto.',
    whyImportant: 'El trabajo en equipo es una de las tres habilidades principales buscadas por empleadores en todas las industrias. Según la investigación de Queens University of Charlotte, el 75% de los empleadores califican el trabajo en equipo y la colaboración como "muy importantes". Los equipos que trabajan bien juntos son 5 veces más propensos a ser de alto rendimiento según el Institute for Corporate Productivity.\n\nEn un currículum, el trabajo en equipo se demuestra a través de logros colaborativos, resultados de proyectos multifuncionales y métricas de desempeño del equipo. Es universalmente requerido pero particularmente crítico en entornos basados en proyectos, ágiles y de servicio al cliente.',
    keywords: ['habilidades de trabajo en equipo currículum', 'jugador de equipo CV', 'habilidades de colaboración empleo', 'capacidades de trabajo en equipo currículum'],
    searchIntents: ['cómo mostrar trabajo en equipo en currículum', 'ejemplos de trabajo en equipo para solicitud de empleo', 'consejos de colaboración de equipo currículum'],
    relatedSkills: ['Colaboración', 'Comunicación', 'Resolución de Conflictos', 'Escucha Activa', 'Empatía', 'Responsabilidad', 'Adaptabilidad', 'Habilidades Interpersonales'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-producto', 'maestro', 'trabajador-social', 'gerente-de-operaciones', 'planificador-de-eventos'],
    atsKeywords: ['trabajo en equipo', 'jugador de equipo', 'colaboración de equipo', 'trabajo en equipo multifuncional', 'contribución al equipo', 'cooperativo', 'ambiente colaborativo', 'trabajo en grupo', 'orientado al equipo', 'logro colectivo'],
    resumeTips: [
      'Muestra trabajo en equipo a través de resultados colaborativos, no solo membresía en un equipo.',
      'Especifica tu rol dentro del equipo y tu contribución única al éxito grupal.',
      'Cuantifica logros del equipo a los que contribuiste: ingresos, entregables, ganancias de eficiencia.',
      'Menciona composiciones diversas de equipo: multifuncionales, internacionales, remotos, multidisciplinarios.',
      'Destaca cómo mejoraste las dinámicas del equipo o los procesos de colaboración.'
    ],
    exampleBullets: [
      'Colaboró con un equipo multifuncional de 15 personas (ingeniería, diseño, marketing) para lanzar una nueva característica de producto que adquirió 25,000 usuarios en el primer mes.',
      'Contribuyó a un equipo de proyecto de 10 personas que entregó una implementación de sistema de $3M 3 semanas antes de lo programado, asumiendo personalmente la propiedad del flujo de trabajo de migración de datos.',
      'Se asoció con equipos de ventas, legal y finanzas para cerrar el acuerdo empresarial más grande de la empresa por $4.5M, coordinando el desarrollo de la propuesta y las negociaciones de contrato.',
      'Mejoró la colaboración del equipo introduciendo standups diarios y retrospectivas a un equipo de 12 personas, aumentando la velocidad de sprint en un 28% y reduciendo los bloqueadores entre equipos en un 50%.'
    ],
    faqs: [
      { question: '¿Cómo muestro trabajo en equipo sin usar el cliché "jugador de equipo"?', answer: 'Describe logros colaborativos específicos: con quién trabajaste (composición del equipo), qué contribuiste (tu rol) y qué logró el equipo junto (resultado cuantificado). Palabras como "colaboró", "se asoció", "codesarrolló" y "contribuyó a" transmiten trabajo en equipo naturalmente.' },
      { question: '¿Qué si mis mayores logros fueron esfuerzos individuales?', answer: 'Incluso los logros individuales usualmente involucran alguna colaboración. Considera quién te apoyó, con quién te coordinaste o cuyo trabajo habilitó el tuyo. Enmarcar logros dentro de un contexto de equipo muestra autoconciencia y humildad, que los empleadores valoran.' },
      { question: '¿Cómo se evalúa el trabajo en equipo en entrevistas de trabajo?', answer: 'Los entrevistadores usan preguntas conductuales como "Cuéntame sobre una vez que trabajaste en un equipo para lograr una meta" o "Describe un conflicto dentro de un equipo y cómo lo manejaste." Prepara ejemplos en formato STAR que destaquen tu enfoque colaborativo y los resultados logrados.' }
    ]
  },
  'collaboration': {
    slug: 'colaboracion',
    title: 'Colaboración',
    description: 'La colaboración es el proceso de trabajar conjuntamente con otros para producir resultados compartidos que no podrían lograrse individualmente. Va más allá del trabajo en equipo al enfatizar la co-creación, propiedad compartida y contribución mutua a ideas y soluciones.\n\nLa colaboración efectiva requiere metas compartidas, roles claros, comunicación abierta, confianza mutua y herramientas que faciliten el trabajo conjunto. Los métodos de colaboración incluyen la co-autoría de documentos, programación en pares, sesiones conjuntas de resolución de problemas, diseño colaborativo (design sprints) y toma de decisiones compartida. Plataformas de colaboración digital como Slack, Miro, Figma y Google Workspace han transformado cómo los equipos co-crean a través de distancias.\n\nEn organizaciones cada vez más complejas y especializadas, ningún individuo posee toda la experiencia necesaria para resolver los principales desafíos. La colaboración a través de funciones, departamentos e incluso organizaciones se ha convertido en un imperativo estratégico. La investigación muestra que las empresas que promueven el trabajo colaborativo son 5 veces más propensas a ser de alto rendimiento.',
    whyImportant: 'La colaboración es un requisito de habilidad principal en más del 60% de las ofertas de empleo. La investigación de Stanford muestra que simplemente ser motivado para actuar colaborativamente aumenta la persistencia en tareas desafiantes en un 64%. Las organizaciones con culturas de colaboración fuertes innovan más rápido, retienen empleados por más tiempo y responden más ágilmente a los cambios del mercado.\n\nEn un currículum, la colaboración demuestra la capacidad de trabajar a través de límites, aprovechar experiencia diversa y crear resultados mayores que la suma de contribuciones individuales.',
    keywords: ['habilidades de colaboración currículum', 'capacidades colaborativas CV', 'colaboración entre equipos empleo', 'consejos de colaboración currículum'],
    searchIntents: ['cómo mostrar colaboración en currículum', 'ejemplos de colaboración para solicitud de empleo', 'habilidades de colaboración para carrera'],
    relatedSkills: ['Trabajo en Equipo', 'Comunicación', 'Colaboración Multifuncional', 'Escucha Activa', 'Resolución de Conflictos', 'Empatía', 'Adaptabilidad', 'Construcción de Relaciones'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-producto', 'consultor-de-gestion', 'gerente-de-programas', 'maestro', 'director-de-organizacion-sin-fines-de-lucro'],
    atsKeywords: ['colaboración', 'colaborativo', 'colaboración multifuncional', 'interdepartamental', 'proyectos conjuntos', 'co-creación', 'asociación', 'trabajo cooperativo', 'colaboración de equipo', 'colaboración con stakeholders'],
    resumeTips: [
      'Especifica con quién colaboraste: departamentos, roles, socios externos, equipos de clientes.',
      'Muestra resultados colaborativos que requirieron esfuerzo conjunto de múltiples partes.',
      'Menciona herramientas de colaboración usadas: Slack, Miro, Figma, Google Workspace, Confluence.',
      'Destaca cómo facilitaste la colaboración: estableciste procesos, lideraste sesiones conjuntas, creaste marcos compartidos.',
      'Demuestra colaboración a través de límites organizacionales: con clientes, proveedores, socios u otras empresas.'
    ],
    exampleBullets: [
      'Colaboró con equipos de ingeniería, diseño y ciencia de datos (más de 20 personas en 3 zonas horarias) para desarrollar un motor de recomendaciones que aumentó el engagement de usuarios en un 42%.',
      'Estableció un marco de colaboración entre empresas con 3 socios estratégicos, creando soluciones conjuntas que generaron $2.8M en ingresos combinados dentro del primer año.',
      'Facilitó design sprints colaborativos involucrando 8 stakeholders de 4 departamentos, produciendo 5 conceptos de producto con 2 avanzando a lanzamiento al mercado.',
      'Construyó una base de conocimiento colaborativa en Confluence con contribuciones de 60 miembros del equipo en 5 oficinas, reduciendo el trabajo duplicado en un 30% y mejorando la velocidad de inicio de proyectos en un 25%.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre colaboración y trabajo en equipo?', answer: 'El trabajo en equipo es trabajar junto a otros en tareas compartidas. La colaboración es más profunda — involucra co-crear ideas, propiedad compartida de resultados y aprovechar perspectivas diversas para producir algo que ningún individuo podría crear solo. En un currículum, la colaboración implica un nivel más alto de trabajo creativo e intelectual conjunto.' },
      { question: '¿Cómo colaboro efectivamente en entornos remotos?', answer: 'Usa herramientas asincrónicas (Loom, Notion, Confluence) para compartir información, herramientas sincrónicas (Zoom, Miro) para sesiones de ideación y plataformas de gestión de proyectos (Asana, Jira) para coordinación. Establece normas claras de colaboración: expectativas de tiempo de respuesta, protocolos de reuniones y estándares de documentación.' },
      { question: '¿Pueden los introvertidos ser colaboradores fuertes?', answer: 'Absolutamente. La colaboración no se trata de ser la voz más fuerte. Los introvertidos frecuentemente sobresalen en escucha profunda, contribuciones reflexivas, colaboración escrita y asociación uno a uno. Destaca tu estilo preferido de colaboración y los resultados que produce.' }
    ]
  },
  'cross-functional-collaboration': {
    slug: 'colaboracion-multifuncional',
    title: 'Colaboración Multifuncional',
    description: 'La colaboración multifuncional es la capacidad de trabajar efectivamente a través de límites organizacionales — departamentos, funciones, unidades de negocio y niveles jerárquicos — para lograr objetivos compartidos. Requiere navegar diferentes prioridades, vocabularios, estilos de trabajo y métricas de éxito mientras se encuentra terreno común y se mantienen relaciones productivas.\n\nLa colaboración multifuncional involucra habilidades como traducir entre lenguaje técnico y de negocios, alinear prioridades departamentales en conflicto, gestionar relaciones de reporte matriciales y construir influencia sin autoridad formal. Los marcos de apoyo incluyen matrices RACI para claridad de roles, mapeo de stakeholders para entender intereses y el concepto de boundary spanning (tender puentes sobre huecos estructurales en redes organizacionales).\n\nEn organizaciones modernas, virtualmente toda iniciativa significativa — lanzamientos de producto, transformaciones digitales, mejoras de procesos — requiere colaboración multifuncional. La investigación de McKinsey muestra que las empresas que rompen silos y habilitan el trabajo multifuncional son un 25% más propensas a ser de mejor rendimiento.',
    whyImportant: 'La colaboración multifuncional es un requisito principal para gerentes de proyecto, gerentes de producto y cualquier rol de liderazgo. Según Deloitte, el 83% de las empresas digitalmente maduras usan equipos multifuncionales, y estos equipos son un 35% más productivos que los grupos aislados. La capacidad de tender puentes entre departamentos es lo que separa a los contribuidores individuales de los líderes organizacionales.\n\nEn un currículum, la colaboración multifuncional demuestra amplitud de influencia, capacidad de gestión de stakeholders y la habilidad de impulsar resultados a través de la complejidad organizacional.',
    keywords: ['colaboración multifuncional currículum', 'habilidades interdepartamentales CV', 'colaboración interdepartamental empleo', 'trabajo en equipo multifuncional currículum'],
    searchIntents: ['cómo mostrar colaboración multifuncional en currículum', 'ejemplos de colaboración multifuncional para empleo', 'habilidades multifuncionales para carrera'],
    relatedSkills: ['Colaboración', 'Gestión de Stakeholders', 'Comunicación', 'Influencia', 'Gestión de Proyectos', 'Liderazgo', 'Negociación', 'Construcción de Relaciones'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-producto', 'gerente-de-programas', 'consultor-de-gestion-del-cambio', 'gerente-de-operaciones', 'consultor-de-gestion'],
    atsKeywords: ['colaboración multifuncional', 'interdepartamental', 'ambiente matricial', 'coordinación entre equipos', 'alineación de stakeholders', 'romper silos', 'boundary spanning', 'multi-departamento', 'a nivel empresarial'],
    resumeTips: [
      'Nombra las funciones o departamentos específicos con los que colaboraste.',
      'Cuantifica la escala: número de departamentos, tamaños de equipo, ubicaciones geográficas involucradas.',
      'Muestra resultados que requirieron alineación multifuncional: lanzamientos de producto, cambios de procesos, implementaciones de sistemas.',
      'Demuestra tu rol como puente: cómo alineaste prioridades en conflicto o tradujiste entre diferentes stakeholders.',
      'Menciona relaciones de reporte matriciales o de línea punteada para mostrar comodidad con la complejidad organizacional.'
    ],
    exampleBullets: [
      'Lideró la colaboración multifuncional entre equipos de ingeniería, marketing, ventas y éxito del cliente (más de 35 stakeholders) para lanzar una nueva línea de productos generando $5.2M en ingresos del primer año.',
      'Coordinó una iniciativa de mejora de procesos interdepartamental abarcando finanzas, operaciones y TI, reduciendo el tiempo de cierre de fin de mes de 12 a 5 días.',
      'Sirvió como enlace principal entre 4 unidades de negocio durante una implementación de ERP de $20M, gestionando requisitos en conflicto y logrando la entrega a tiempo con un 95% de satisfacción de stakeholders.',
      'Construyó y facilitó un comité de innovación multifuncional de 15 miembros de 6 departamentos, produciendo 3 nuevas ofertas de servicio que generaron $1.8M en ingresos incrementales.'
    ],
    faqs: [
      { question: '¿Cómo muestro experiencia multifuncional si trabajé en un solo departamento?', answer: 'La mayoría de los proyectos involucran alguna interacción multifuncional. Identifica instancias donde trabajaste con otros equipos: colaborando con TI en un despliegue de sistema, asociándote con marketing en una campaña o coordinando con finanzas en presupuestos. Incluso el trabajo multifuncional menor demuestra la capacidad de trabajar más allá de tu silo.' },
      { question: '¿Qué desafíos presenta la colaboración multifuncional?', answer: 'Los desafíos comunes incluyen prioridades en conflicto, diferentes culturas departamentales, barreras de comunicación (lenguaje técnico vs. de negocios) y autoridad de toma de decisiones poco clara. En un currículum, mostrar que navegaste estos desafíos exitosamente demuestra habilidades organizacionales sofisticadas.' },
      { question: '¿Se valora la experiencia multifuncional más que la experiencia funcional profunda?', answer: 'Depende del rol. Para gestión de producto, consultoría y gestión general, la amplitud multifuncional es altamente valorada. Para roles especialistas (ingeniería, legal, finanzas), la profundidad es primaria pero la capacidad de colaboración multifuncional diferencia a los candidatos senior de los de nivel medio.' }
    ]
  },
  'remote-work': {
    slug: 'trabajo-remoto',
    title: 'Trabajo Remoto',
    description: 'Las habilidades de trabajo remoto abarcan las competencias necesarias para ser productivo, colaborativo y profesional mientras se trabaja fuera de un entorno de oficina tradicional. Esto incluye autodisciplina, dominio de comunicación asincrónica, etiqueta de reuniones virtuales, gestión de espacio de trabajo digital y la capacidad de mantener la cohesión del equipo a través de distancias.\n\nLas competencias clave de trabajo remoto incluyen: estructurar un espacio de trabajo productivo en casa, gestionar el tiempo sin estructura externa, comunicarse claramente de forma escrita (ya que la mayoría de la comunicación remota es basada en texto), mantener límites entre trabajo y vida personal, usar herramientas de colaboración efectivamente y construir relaciones sin interacción presencial.\n\nA medida que los modelos de trabajo híbrido y remoto se vuelven permanentes para muchas organizaciones, las habilidades de trabajo remoto han pasado de ser una ventaja de nicho a un requisito profesional convencional.',
    whyImportant: 'La capacidad de trabajo remoto es ahora una expectativa base para muchos roles. Las empresas que contratan por competencia remota experimentan un 25% menos de rotación y acceden a un pool de talento 4 veces más grande.\n\nEn un currículum, demostrar competencia en trabajo remoto señala autodisciplina, madurez comunicativa y fluidez tecnológica. Es particularmente importante para roles explícitamente listados como remotos o híbridos, pero también valorado para cualquier posición en organizaciones con equipos distribuidos.',
    keywords: ['habilidades de trabajo remoto currículum', 'habilidades de trabajo desde casa CV', 'capacidades de trabajo remoto empleo', 'trabajo virtual currículum'],
    searchIntents: ['cómo mostrar habilidades de trabajo remoto en currículum', 'experiencia de trabajo remoto para solicitud de empleo', 'habilidades de trabajo remoto para carrera'],
    relatedSkills: ['Comunicación Virtual', 'Automotivación', 'Gestión del Tiempo', 'Comunicación Escrita', 'Colaboración', 'Organización', 'Adaptabilidad', 'Autodisciplina'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-producto', 'reclutador', 'consultor-de-gestion', 'ejecutivo-de-cuentas', 'representante-de-servicio-al-cliente'],
    atsKeywords: ['trabajo remoto', 'trabajo desde casa', 'equipo distribuido', 'colaboración virtual', 'trabajo híbrido', 'comunicación asincrónica', 'gestión de equipo remoto', 'lugar de trabajo digital', 'equipos virtuales'],
    resumeTips: [
      'Menciona explícitamente experiencia de trabajo remoto o híbrido con duración y detalles de distribución del equipo.',
      'Destaca logros específicos del trabajo remoto: mantener o mejorar la productividad, construir cultura de equipo remoto, gestionar a través de zonas horarias.',
      'Menciona herramientas de colaboración remota: Slack, Zoom, Teams, Notion, Asana, Miro.',
      'Muestra que el trabajo remoto no comprometió tus resultados — combina el contexto remoto con métricas de resultado sólidas.',
      'Incluye experiencia de gestión de equipo remoto si aplica, especificando tamaños de equipo y distribución geográfica.'
    ],
    exampleBullets: [
      'Gestionó un equipo completamente remoto de 18 personas en 6 zonas horarias durante 3 años, manteniendo una tasa de entrega a tiempo del 95% y logrando la puntuación de engagement más alta del departamento del 91%.',
      'Transicionó un departamento de 40 personas al trabajo remoto, implementando protocolos de comunicación asincrónica y herramientas de flujo de trabajo digital que mantuvieron el 105% de los niveles de productividad pre-pandemia.',
      'Construyó procesos de colaboración remote-first incluyendo estándares de documentación, actualizaciones de video asincrónico y actividades virtuales de team-building, reduciendo reuniones innecesarias en un 40% mientras mejoraba la cohesión del equipo.',
      'Cerró $2.8M en ventas empresariales a través de engagements completamente virtuales con clientes, realizando más de 100 demos remotas y negociaciones sin ninguna reunión presencial.'
    ],
    faqs: [
      { question: '¿Debo listar la experiencia de trabajo remoto de forma diferente en mi currículum?', answer: 'Sí. Indica el trabajo remoto explícitamente: "Remoto" o "Híbrido" junto a tu título de puesto o ubicación de la empresa. Esto muestra a los empleadores que tienes capacidad comprobada de trabajo remoto. Destaca logros específicos del remoto y las herramientas/procesos que usaste para mantenerte efectivo.' },
      { question: '¿Qué herramientas de trabajo remoto debo conocer?', answer: 'Las herramientas esenciales incluyen videoconferencia (Zoom, Teams, Google Meet), mensajería (Slack, Teams), gestión de proyectos (Asana, Monday, Jira, Trello), documentación (Notion, Confluence, Google Docs) y pizarra virtual (Miro, FigJam). La competencia con estas señala preparación para el trabajo remoto.' },
      { question: '¿Cómo abordo la percepción de que los trabajadores remotos son menos productivos?', answer: 'Contrarresta con datos. Incluye métricas de productividad, registros de entrega y resultados de desempeño logrados mientras trabajabas de forma remota. La investigación de Stanford muestra que los trabajadores remotos son un 13% más productivos en promedio. Deja que tus resultados hablen por tu efectividad en el trabajo remoto.' }
    ]
  },
  'virtual-communication': {
    slug: 'comunicacion-virtual',
    title: 'Comunicación Virtual',
    description: 'La comunicación virtual es la habilidad de transmitir información, construir relaciones y colaborar efectivamente a través de canales digitales incluyendo videoconferencia, mensajería instantánea, correo electrónico, presentaciones virtuales y herramientas asincrónicas. Requiere adaptar las habilidades de comunicación tradicionales a las restricciones y oportunidades de los medios digitales: señales no verbales limitadas, fatiga de pantalla, diferencias de zonas horarias y la permanencia de los registros escritos.\n\nLos comunicadores virtuales efectivos dominan la presencia ante cámara para videollamadas, escriben clara y concisamente para canales asincrónicos, usan ayudas visuales para mejorar presentaciones virtuales, gestionan dinámicas de reuniones digitales y eligen el canal correcto para cada tipo de mensaje.\n\nA medida que las organizaciones adoptan cada vez más modelos híbridos y remotos, la comunicación virtual se ha convertido en una habilidad profesional central en lugar de una adaptación temporal.',
    whyImportant: 'La competencia en comunicación virtual impacta directamente la efectividad profesional en lugares de trabajo modernos. La investigación de Gartner muestra que la mala comunicación virtual es la causa principal de fracasos en el trabajo remoto. Las organizaciones con culturas de comunicación virtual fuertes reportan un 30% más de puntuaciones de colaboración y un 20% menos de retrasos en proyectos.\n\nEn un currículum, las habilidades de comunicación virtual son cada vez más relevantes para cualquier rol que involucre trabajo remoto o híbrido, equipos globales o relaciones con clientes.',
    keywords: ['comunicación virtual currículum', 'habilidades de comunicación digital CV', 'comunicación en línea empleo', 'habilidades de reuniones virtuales currículum'],
    searchIntents: ['cómo mostrar comunicación virtual en currículum', 'habilidades de comunicación virtual para empleo', 'capacidades de comunicación en línea carrera'],
    relatedSkills: ['Trabajo Remoto', 'Comunicación Escrita', 'Habilidades de Presentación', 'Comunicación', 'Escucha Activa', 'Colaboración', 'Etiqueta de Correo Electrónico'],
    professionSlugs: ['gerente-de-proyectos', 'reclutador', 'gerente-de-capacitacion', 'ejecutivo-de-cuentas', 'consultor-de-gestion', 'representante-de-servicio-al-cliente'],
    atsKeywords: ['comunicación virtual', 'videoconferencia', 'comunicación remota', 'comunicación digital', 'reuniones virtuales', 'colaboración en línea', 'Zoom', 'Microsoft Teams', 'comunicación asincrónica', 'presentaciones virtuales'],
    resumeTips: [
      'Menciona comunicación virtual en el contexto de trabajo remoto, equipos distribuidos o gestión virtual de clientes.',
      'Destaca canales virtuales específicos dominados: presentaciones por video, webinars, sesiones de capacitación virtual.',
      'Cuantifica la escala de comunicación virtual: asistentes, frecuencia, alcance geográfico.',
      'Muestra que la comunicación virtual llevó a resultados concretos: negocios cerrados virtualmente, capacitaciones impartidas en línea, equipos gestionados remotamente.'
    ],
    exampleBullets: [
      'Impartió más de 50 sesiones de capacitación virtual a audiencias de 30-200 participantes en 8 países, logrando una calificación promedio de satisfacción de 4.6/5.0.',
      'Gestionó todas las comunicaciones con clientes de forma virtual para un portafolio de 25 cuentas empresariales, manteniendo una tasa de retención del 97% sin reuniones presenciales.',
      'Facilitó reuniones semanales virtuales de equipo para 35 empleados remotos en 5 zonas horarias, implementando agendas rotativas y pre-lecturas asincrónicas que redujeron la duración de las reuniones en un 30%.',
      'Realizó más de 200 entrevistas virtuales de candidatos por trimestre usando evaluación estructurada por video, manteniendo la calidad de contratación con tasas de aceptación de ofertas superiores al 85%.'
    ],
    faqs: [
      { question: '¿Cómo es diferente la comunicación virtual de la comunicación presencial?', answer: 'La comunicación virtual tiene señales no verbales limitadas, mayor fatiga de pantalla y dependencias tecnológicas. Requiere contexto más explícito, estructura más clara y técnicas de engagement más deliberadas. La comunicación escrita se vuelve más importante en entornos virtuales ya que muchas interacciones ocurren vía chat y correo electrónico en lugar de cara a cara.' },
      { question: '¿Qué herramientas de comunicación virtual debo aprender?', answer: 'Domina Zoom, Microsoft Teams y Google Meet para video. Slack y Teams para mensajería. Loom para video asincrónico. Miro y FigJam para pizarra virtual. Estas cubren la mayoría de las necesidades de comunicación virtual profesional.' },
      { question: '¿Cómo mantengo el engagement en reuniones virtuales?', answer: 'Usa elementos interactivos: encuestas, preguntas y respuestas, salas de grupos y documentos colaborativos. Mantén las presentaciones concisas, usa visuales y llama a los participantes por nombre. Envía materiales de pre-lectura para acortar las reuniones y establece agendas claras. Estas técnicas combaten la fatiga de pantalla y la asistencia pasiva.' }
    ]
  },
  'cultural-awareness': {
    slug: 'conciencia-cultural',
    title: 'Conciencia Cultural',
    description: 'La conciencia cultural es la capacidad de reconocer, comprender y respetar los valores, creencias, costumbres y estilos de comunicación de personas de diferentes orígenes culturales. Se construye sobre la teoría de dimensiones culturales de Geert Hofstede, el marco Culture Map de Erin Meyer y el Modelo de Desarrollo de Sensibilidad Intercultural de Milton Bennett.\n\nEn contextos profesionales, la conciencia cultural permite la comunicación efectiva a través de culturas nacionales, étnicas, generacionales y organizacionales. Aplica a gestionar equipos internacionales, servir bases de clientes diversas, navegar la etiqueta de negocios global y crear lugares de trabajo inclusivos.\n\nA medida que los lugares de trabajo se vuelven más globalizados y diversos, la competencia cultural ha pasado de ser deseable a un imperativo de negocio. La investigación de McKinsey muestra que las empresas en el cuartil superior de diversidad étnica y cultural son un 36% más propensas a superar a sus pares financieramente.',
    whyImportant: 'La conciencia cultural impacta directamente los resultados de negocio en organizaciones globales. La mala comunicación por diferencias culturales cuesta a los negocios internacionales un estimado de $2 mil millones anuales. Los equipos culturalmente competentes colaboran un 26% más efectivamente a través de fronteras y logran un 19% más de ingresos por innovación.\n\nEn un currículum, la conciencia cultural demuestra la capacidad de trabajar en ambientes diversos e internacionales. Es especialmente valorada en empresas globales, firmas de consultoría, roles diplomáticos y organizaciones con bases de clientes diversas.',
    keywords: ['conciencia cultural currículum', 'habilidades interculturales CV', 'competencia cultural empleo', 'conciencia de diversidad currículum'],
    searchIntents: ['cómo mostrar conciencia cultural en currículum', 'habilidades de conciencia cultural para empleo', 'competencia intercultural carrera'],
    relatedSkills: ['Empatía', 'Comunicación', 'Adaptabilidad', 'Escucha Activa', 'Habilidades Interpersonales', 'Colaboración', 'Paciencia', 'Construcción de Relaciones'],
    professionSlugs: ['diplomatico', 'consultor-de-gestion', 'maestro', 'trabajador-social', 'gerente-de-recursos-humanos', 'director-de-organizacion-sin-fines-de-lucro'],
    atsKeywords: ['conciencia cultural', 'competencia cultural', 'comunicación intercultural', 'diversidad e inclusión', 'conciencia global', 'intercultural', 'multicultural', 'DEI', 'sensibilidad cultural', 'experiencia internacional'],
    resumeTips: [
      'Menciona culturas o regiones específicas con las que tienes experiencia trabajando.',
      'Destaca habilidades lingüísticas como evidencia de compromiso cultural.',
      'Muestra conciencia cultural a través de gestión de equipos diversos, liderazgo de proyectos internacionales o servicio a clientes globales.',
      'Referencia formación o certificaciones en competencia cultural.',
      'Cuantifica el impacto de la conciencia cultural: mercados internacionales ingresados, desempeño de equipos diversos, colaboraciones transfronterizas.'
    ],
    exampleBullets: [
      'Lideró un equipo culturalmente diverso de 30 personas de 8 nacionalidades en oficinas de Nueva York, Londres y Singapur, aprovechando las diferencias culturales para impulsar la innovación y logrando el 120% de los objetivos del equipo.',
      'Desarrolló e impartió capacitación en conciencia cultural para 100 empleados preparándose para asignaciones internacionales, reduciendo las tasas de retorno temprano del 15% al 3%.',
      'Gestionó relaciones con clientes en 12 países de las regiones EMEA y APAC, adaptando estilos de comunicación y negociación a las costumbres de negocios locales y logrando una puntuación de satisfacción del cliente del 94%.',
      'Lanzó una iniciativa de DEI que aumentó la diversidad de la fuerza laboral en un 35% durante 2 años y mejoró las puntuaciones de pertenencia de empleados del 62% al 81% en todos los grupos demográficos.'
    ],
    faqs: [
      { question: '¿Cómo demuestro conciencia cultural en un currículum?', answer: 'Incluye experiencia de trabajo internacional, habilidades lingüísticas, gestión de equipos diversos, proyectos transfronterizos y contribuciones a DEI. Menciona regiones o culturas específicas que tienes experiencia navegando. Los resultados logrados a través de límites culturales proporcionan la evidencia más fuerte.' },
      { question: '¿Es la conciencia cultural lo mismo que hablar múltiples idiomas?', answer: 'Las habilidades lingüísticas apoyan la conciencia cultural pero no son suficientes por sí solas. La conciencia cultural incluye comprender valores, normas de comunicación, etiqueta de negocios y estructuras sociales. Alguien que solo habla español pero tiene amplia experiencia trabajando a través de culturas puede demostrar mayor competencia cultural que una persona multilingüe sin experiencia intercultural.' },
      { question: '¿Qué tan importante es la conciencia cultural para roles solo domésticos?', answer: 'Muy importante. Cada lugar de trabajo incluye diversidad cultural — étnica, generacional, regional y organizacional. La conciencia cultural mejora la colaboración, reduce la mala comunicación y apoya ambientes inclusivos independientemente de si el rol involucra trabajo internacional.' }
    ]
  },
  'networking': {
    slug: 'networking',
    title: 'Networking',
    description: 'El networking es el desarrollo y mantenimiento estratégico de relaciones profesionales para beneficio mutuo, intercambio de conocimientos y avance profesional. Abarca tanto el networking presencial (conferencias, eventos de la industria, asociaciones profesionales) como el networking digital (LinkedIn, Twitter/X, foros de la industria). La metodología "Never Eat Alone" de Keith Ferrazzi y el marco "Give and Take" de Adam Grant proporcionan la base para un networking efectivo — liderar con valor, construir relaciones auténticas y mantener una orientación de dar.\n\nEl networking estratégico involucra identificar contactos clave, hacer presentaciones cálidas, dar seguimiento sistemáticamente, proporcionar valor antes de pedir y nutrir relaciones a lo largo del tiempo.\n\nEl networking profesional no se trata solo de recolectar contactos — se trata de construir capital social. La investigación de Ronald Burt sobre huecos estructurales muestra que los profesionales que conectan diferentes redes acceden a información más novedosa y avanzan más rápido.',
    whyImportant: 'Un estimado del 70-80% de los empleos se llenan a través del networking según diversos estudios de investigación laboral. LinkedIn reporta que el 85% de las posiciones se llenan a través de conexiones de networking. Más allá de la búsqueda de empleo, las redes profesionales proporcionan mentoría, oportunidades de desarrollo de negocios, inteligencia de la industria y asociaciones colaborativas.\n\nEn un currículum, la capacidad de networking se demuestra a través de afiliaciones profesionales, participación en la industria, logros de desarrollo de negocios y creación de asociaciones.',
    keywords: ['habilidades de networking currículum', 'networking profesional CV', 'networking de relaciones empleo', 'networking de negocios currículum'],
    searchIntents: ['cómo mostrar networking en currículum', 'habilidades de networking para avance profesional', 'ejemplos de networking profesional currículum'],
    relatedSkills: ['Construcción de Relaciones', 'Comunicación', 'Persuasión', 'Habilidades Interpersonales', 'Marca Personal', 'Desarrollo de Negocios', 'Colaboración', 'Conciencia Cultural'],
    professionSlugs: ['reclutador', 'ejecutivo-de-cuentas', 'agente-de-bienes-raices', 'asesor-financiero', 'especialista-en-relaciones-publicas', 'gerente-de-ventas'],
    atsKeywords: ['networking', 'networking profesional', 'desarrollo de relaciones', 'desarrollo de negocios', 'participación en la industria', 'LinkedIn', 'asociaciones profesionales', 'generación de referidos', 'desarrollo de asociaciones'],
    resumeTips: [
      'Muestra networking a través de resultados de negocio: referidos generados, asociaciones establecidas, clientes adquiridos a través de relaciones.',
      'Lista membresías de asociaciones profesionales y roles de liderazgo.',
      'Cuantifica el impacto de tu red: ingresos por referidos, invitaciones como ponente, proyectos colaborativos originados.',
      'Menciona eventos de la industria organizados, atendidos o en los que hablaste.',
      'Destaca networking digital: audiencia de LinkedIn, contenido de liderazgo de pensamiento, engagement en comunidad en línea.'
    ],
    exampleBullets: [
      'Construyó una red profesional de más de 500 contactos de la industria que generó el 40% del pipeline de referidos anual de $6M de la empresa a través del cultivo estratégico de relaciones.',
      'Sirvió como presidente del capítulo local de la American Marketing Association (200 miembros), organizando 12 eventos de networking al año y aumentando la membresía en un 45%.',
      'Aprovechó relaciones de networking para establecer 8 asociaciones estratégicas que contribuyeron $3.2M en ingresos co-desarrollados durante 2 años.',
      'Creció el seguimiento de LinkedIn de 2,000 a 15,000 a través de contenido consistente de liderazgo de pensamiento, generando más de 50 consultas de negocios entrantes por trimestre.'
    ],
    faqs: [
      { question: '¿Cómo muestro habilidades de networking en un currículum?', answer: 'En lugar de listar "networking" como habilidad, muestra sus resultados: negocios desarrollados a través de relaciones, asociaciones formadas, referidos generados y participación en la industria. Los roles de liderazgo en asociaciones profesionales y conferencias como ponente también demuestran capacidad de networking.' },
      { question: '¿El networking es solo para vendedores?', answer: 'No. Todo profesional se beneficia del networking para oportunidades de carrera, conocimiento de la industria, mentoría y colaboración. Los ingenieros hacen networking en conferencias, los profesores a través de comunidades de desarrollo profesional y los gerentes para reclutamiento de talento y mejores prácticas.' },
      { question: '¿Cómo hago networking efectivamente como introvertido?', answer: 'Enfócate en interacciones uno a uno, aprovecha la comunicación escrita (seguimientos por correo, mensajes de LinkedIn), asiste a eventos más pequeños y usa tus habilidades de escucha como fortaleza de networking. La calidad sobre la cantidad aplica — unas pocas relaciones profesionales profundas pueden ser más valiosas que cientos de contactos superficiales.' }
    ]
  },
  'relationship-building': {
    slug: 'construccion-de-relaciones',
    title: 'Construcción de Relaciones',
    description: 'La construcción de relaciones es el proceso estratégico y continuo de establecer, nutrir y profundizar conexiones profesionales basadas en confianza, valor mutuo y compromiso auténtico. Va más allá del networking inicial para abarcar la gestión de relaciones a largo plazo, cultivo de confianza y desarrollo de asociaciones que crean valor profesional sostenido.\n\nLos marcos de construcción de relaciones incluyen la Ecuación de Confianza (credibilidad + confiabilidad + intimidad ÷ auto-orientación) de David Maister y enfoques de gestión de relaciones basados en CRM. Los constructores efectivos de relaciones invierten tiempo en entender las necesidades de otros, cumplen consistentemente, proporcionan valor proactivamente y mantienen contacto regular a través de puntos de contacto intencionales.\n\nEn contextos de negocios, la construcción de relaciones es la base de la retención de clientes, asociaciones estratégicas, gestión de proveedores, influencia con stakeholders y cohesión de equipo.',
    whyImportant: 'La calidad de las relaciones impulsa los resultados de negocio. Según CSO Insights, los vendedores con relaciones fuertes con clientes logran un 48% más de cumplimiento de cuota. En consultoría, la mayoría de los nuevos negocios provienen de relaciones existentes. Incluso en roles que no son de ventas, las relaciones profesionales fuertes aceleran el éxito de proyectos y crean oportunidades de avance profesional.\n\nEn un currículum, la construcción de relaciones se demuestra a través de tasas de retención de clientes, resultados de asociaciones a largo plazo, éxitos en gestión de stakeholders y resultados de negocio impulsados por la red.',
    keywords: ['construcción de relaciones currículum', 'habilidades de relación con clientes CV', 'gestión de relaciones empleo', 'construir relaciones currículum'],
    searchIntents: ['cómo mostrar construcción de relaciones en currículum', 'ejemplos de construcción de relaciones para empleo', 'habilidades de relación con clientes carrera'],
    relatedSkills: ['Gestión de Clientes', 'Networking', 'Comunicación', 'Empatía', 'Construcción de Confianza', 'Habilidades Interpersonales', 'Escucha Activa', 'Servicio al Cliente'],
    professionSlugs: ['ejecutivo-de-cuentas', 'asesor-financiero', 'agente-de-bienes-raices', 'reclutador', 'gerente-de-ventas', 'consultor-de-gestion'],
    atsKeywords: ['construcción de relaciones', 'relaciones con clientes', 'relaciones con stakeholders', 'desarrollo de asociaciones', 'construcción de confianza', 'gestión de relaciones', 'retención de clientes', 'construcción de rapport', 'relaciones a largo plazo', 'relaciones estratégicas'],
    resumeTips: [
      'Cuantifica resultados de relaciones: tasas de retención, valor de vida del cliente, ingresos por referidos generados.',
      'Muestra longevidad de relaciones: asociaciones de clientes multi-año, negocios recurrentes de contactos existentes.',
      'Menciona herramientas y enfoques de gestión de relaciones: uso de CRM, cadencias regulares de puntos de contacto, revisiones de éxito del cliente.',
      'Destaca relaciones a través de diferentes tipos de stakeholders: nivel C, contactos operativos, equipos técnicos, proveedores.',
      'Demuestra cómo las relaciones se tradujeron en crecimiento del negocio: ventas adicionales, expansiones, referidos.'
    ],
    exampleBullets: [
      'Construyó y mantuvo relaciones de confianza con más de 60 clientes empresariales, logrando una tasa de renovación de contratos del 96% y $4.5M en ingresos de expansión anual de cuentas existentes.',
      'Desarrolló relaciones a nivel C con 15 cuentas clave a través de revisiones de negocio trimestrales y asesoría estratégica, posicionando a la empresa como el proveedor preferido para $8M en adquisiciones.',
      'Cultivó relaciones con proveedores con 30 proveedores estratégicos durante 5 años, negociando términos de precio preferencial que ahorraron $1.2M anuales mientras mantenían la calidad del servicio.',
      'Estableció relaciones de asesor de confianza con 25 clientes de planificación financiera, gestionando $18M en activos combinados con una tasa de retención de clientes del 100% durante 4 años.'
    ],
    faqs: [
      { question: '¿Cómo es diferente la construcción de relaciones del networking?', answer: 'El networking se enfoca en crear nuevas conexiones y expandir tu base de contactos. La construcción de relaciones se trata de profundizar conexiones existentes a través de confianza, entrega de valor consistente y compromiso a largo plazo. El networking abre puertas; la construcción de relaciones las mantiene abiertas. Ambos son esenciales pero sirven propósitos diferentes.' },
      { question: '¿Se pueden desarrollar las habilidades de construcción de relaciones?', answer: 'Sí. La construcción de relaciones es un conjunto de habilidades aprendibles que incluye escucha activa, hábitos de seguimiento, empatía y comunicación estratégica. Los sistemas CRM ayudan a sistematizar la gestión de relaciones, y la mentoría de constructores de relaciones hábiles acelera el desarrollo.' },
      { question: '¿Cómo construyo relaciones en un entorno virtual?', answer: 'Programa check-ins regulares por video, envía seguimientos personalizados después de interacciones, comparte artículos o insights relevantes e invierte en conversaciones virtuales casuales además de discusiones de negocios. Las relaciones virtuales requieren más mantenimiento deliberado pero pueden ser tan profundas como las presenciales.' }
    ]
  },
  'customer-service': {
    slug: 'servicio-al-cliente',
    title: 'Servicio al Cliente',
    description: 'El servicio al cliente es la práctica de apoyar a los clientes antes, durante y después de una compra a través de asistencia, orientación y resolución de problemas. El servicio al cliente excelente sigue marcos como SERVQUAL (midiendo la calidad del servicio a través de confiabilidad, seguridad, tangibles, empatía y capacidad de respuesta) y el modelo GUEST de Disney (Saludar, Comprender, Explicar, Sugerir, Agradecer).\n\nEl servicio al cliente moderno abarca múltiples canales: teléfono, correo electrónico, chat en vivo, redes sociales y portales de autoservicio. Requiere conocimiento del producto, capacidad de resolución de problemas, regulación emocional, habilidades de comunicación y competencia técnica con plataformas CRM y de soporte.\n\nEl servicio al cliente ha evolucionado de un centro de costos a un diferenciador estratégico. La investigación de Zendesk muestra que el 70% de los clientes han tomado decisiones de compra basándose en la calidad del servicio al cliente.',
    whyImportant: 'La experiencia del cliente es ahora el principal diferenciador competitivo, superando al precio y el producto. Adquirir un nuevo cliente cuesta 5-25 veces más que retener uno existente, haciendo que el servicio al cliente sea un impulsor directo de la rentabilidad.\n\nEn un currículum, las habilidades de servicio al cliente demuestran confiabilidad, excelencia comunicativa e impacto en el negocio. Las métricas de satisfacción del cliente, tasas de retención y estadísticas de resolución proporcionan evidencia poderosa de capacidad de servicio.',
    keywords: ['habilidades de servicio al cliente currículum', 'soporte al cliente CV', 'capacidades de servicio al cliente empleo', 'servicio al cliente currículum'],
    searchIntents: ['cómo mostrar servicio al cliente en currículum', 'habilidades de servicio al cliente para solicitud de empleo', 'ejemplos de currículum de servicio al cliente'],
    relatedSkills: ['Comunicación', 'Resolución de Problemas', 'Empatía', 'Escucha Activa', 'Paciencia', 'Resolución de Conflictos', 'Conocimiento del Producto', 'Gestión de Clientes'],
    professionSlugs: ['representante-de-servicio-al-cliente', 'ejecutivo-de-cuentas', 'agente-de-bienes-raices', 'asesor-financiero', 'planificador-de-eventos', 'gerente-de-ventas'],
    atsKeywords: ['servicio al cliente', 'soporte al cliente', 'atención al cliente', 'satisfacción del cliente', 'CSAT', 'NPS', 'experiencia del cliente', 'excelencia de servicio', 'retención de clientes', 'resolución de incidencias', 'help desk', 'CRM'],
    resumeTips: [
      'Lidera con métricas: puntuaciones CSAT, NPS, tasas de resolución en primer contacto, tiempos de respuesta, retención de clientes.',
      'Especifica la escala de tu experiencia de servicio al cliente: número de clientes atendidos, interacciones por día, tamaño del portafolio.',
      'Menciona herramientas y plataformas de servicio al cliente: Zendesk, Salesforce Service Cloud, Freshdesk, Intercom.',
      'Destaca ejemplos de recuperación de servicio donde convertiste experiencias negativas en resultados positivos.',
      'Muestra la progresión de soporte reactivo a gestión proactiva de éxito del cliente.'
    ],
    exampleBullets: [
      'Gestionó el servicio al cliente para un portafolio de 150 cuentas generando $8M en ingresos anuales, manteniendo una puntuación CSAT del 98% y una tasa de retención del 95% durante 3 años.',
      'Resolvió un promedio de 45 consultas de clientes diariamente a través de canales de teléfono, correo y chat, logrando una tasa de resolución en primer contacto del 88% — 15% por encima del promedio del departamento.',
      'Implementó un programa de check-in proactivo para 200 cuentas en riesgo, recuperando el 85% de los clientes señalados para abandono y preservando $1.5M en ingresos recurrentes anuales.',
      'Capacitó y mentoreó a un equipo de servicio al cliente de 12 personas, mejorando el CSAT promedio del equipo del 82% al 94% y reduciendo el tiempo promedio de atención en un 25% dentro de 6 meses.'
    ],
    faqs: [
      { question: '¿Cómo hago relevante la experiencia de servicio al cliente para roles que no son de servicio al cliente?', answer: 'El servicio al cliente construye habilidades transferibles: comunicación, resolución de problemas, regulación emocional y gestión de stakeholders. Enmarca estas habilidades en el contexto del rol objetivo. Para posiciones gerenciales, enfatiza resolución de conflictos y capacitación de equipo. Para roles de ventas, destaca construcción de relaciones y evaluación de necesidades.' },
      { question: '¿Qué métricas de servicio al cliente debo incluir en mi currículum?', answer: 'Las métricas clave incluyen Customer Satisfaction Score (CSAT), Net Promoter Score (NPS), tasa de resolución en primer contacto, tiempo promedio de respuesta, tasa de retención de clientes y cumplimiento de acuerdos de nivel de servicio (SLA). Incluye los números específicos y cómo se compararon con benchmarks o metas.' },
      { question: '¿Se valora la experiencia de servicio al cliente por empleadores fuera de roles de soporte?', answer: 'Sí. La experiencia de servicio al cliente es valorada para cualquier rol de atención al cliente, posición gerencial u organización que prioriza la experiencia del cliente. Las habilidades desarrolladas en servicio al cliente — paciencia, comunicación clara, resolución de problemas — se transfieren directamente a gestión de cuentas, consultoría y roles de liderazgo.' }
    ]
  },
  'client-management': {
    slug: 'gestion-de-clientes',
    title: 'Gestión de Clientes',
    description: 'La gestión de clientes es la práctica estratégica de construir, nutrir y expandir relaciones con clientes para maximizar la satisfacción, retención y crecimiento de ingresos. Abarca el ciclo completo del cliente: adquisición, incorporación, entrega de servicio, profundización de relaciones, resolución de problemas y renovación/expansión.\n\nLos gerentes de clientes efectivos sirven como la interfaz principal entre el cliente y la organización, gestionando expectativas, coordinando recursos internos, proporcionando asesoría estratégica y asegurando que los entregables cumplan o excedan los estándares. Realizan revisiones de negocio regulares, rastrean métricas de salud del cliente, identifican oportunidades de expansión y gestionan escalaciones con eficiencia diplomática.\n\nLa gestión de clientes en la era moderna aprovecha plataformas CRM (Salesforce, HubSpot), herramientas de éxito del cliente (Gainsight, ChurnZero) y analítica de datos para predecir necesidades del cliente, monitorear la salud del engagement y automatizar puntos de contacto.',
    whyImportant: 'La gestión de clientes impacta directamente las métricas de negocio más críticas. Según Bain & Company, un aumento del 5% en la retención de clientes produce un aumento del 25-95% en ganancias. Expandir cuentas existentes es 6-7 veces más rentable que adquirir nuevos clientes.\n\nEn un currículum, la gestión de clientes demuestra responsabilidad de ingresos, capacidad de relaciones estratégicas y habilidades de coordinación organizacional. Es una competencia central para gerentes de cuentas, consultores, gerentes de éxito del cliente y cualquier rol con responsabilidad directa de ingresos de clientes.',
    keywords: ['habilidades de gestión de clientes currículum', 'gestión de cuentas CV', 'gestión de relaciones con clientes empleo', 'consejos de gestión de clientes currículum'],
    searchIntents: ['cómo mostrar gestión de clientes en currículum', 'ejemplos de gestión de clientes para empleo', 'habilidades de gestión de cuentas carrera'],
    relatedSkills: ['Construcción de Relaciones', 'Comunicación', 'Servicio al Cliente', 'Negociación', 'Resolución de Problemas', 'Pensamiento Estratégico', 'Gestión de Stakeholders', 'Desarrollo de Negocios'],
    professionSlugs: ['ejecutivo-de-cuentas', 'consultor-de-gestion', 'asesor-financiero', 'agente-de-bienes-raices', 'gerente-de-ventas', 'especialista-en-relaciones-publicas'],
    atsKeywords: ['gestión de clientes', 'gestión de cuentas', 'retención de clientes', 'éxito del cliente', 'customer success', 'gestión de portafolio', 'relaciones con clientes', 'satisfacción del cliente', 'gestión de ingresos', 'gestión de contratos', 'revisiones de negocio', 'CRM'],
    resumeTips: [
      'Cuantifica tu portafolio de clientes: número de cuentas, ingresos totales gestionados, valor promedio de cuenta.',
      'Muestra métricas de retención y expansión de clientes como logros principales.',
      'Menciona herramientas de CRM y gestión de clientes usadas: Salesforce, HubSpot, Gainsight.',
      'Destaca relaciones de asesoría estratégica versus soporte transaccional.',
      'Demuestra el ciclo completo del cliente: adquisición, incorporación, crecimiento y renovación.'
    ],
    exampleBullets: [
      'Gestionó un portafolio de 35 clientes empresariales con $12M en ingresos anuales combinados, logrando un 97% de retención y un 22% de crecimiento de cuentas año tras año.',
      'Sirvió como gerente de clientes principal para las 5 cuentas más grandes de la empresa ($2M+ cada una), realizando revisiones de negocio trimestrales y expandiendo los valores de contrato en un promedio del 30%.',
      'Incorporó 20 nuevos clientes al año con un programa de éxito estructurado de 90 días, logrando una tasa de go-live exitoso del 100% y reduciendo el time-to-value en un 40%.',
      'Identificó y resolvió 15 situaciones de clientes en riesgo a través de monitoreo proactivo de salud, reteniendo $3.8M en ingresos recurrentes anuales señalados para potencial abandono.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre gestión de clientes y gestión de cuentas?', answer: 'Los términos se usan frecuentemente de forma intercambiable. La gestión de clientes tiende a enfatizar la relación y los aspectos de entrega del servicio, mientras que la gestión de cuentas puede enfocarse más en el crecimiento de ingresos y aspectos comerciales. En la práctica, ambos roles requieren gestionar relaciones con clientes mientras impulsan resultados de negocio.' },
      { question: '¿Cómo hago la transición de servicio al cliente a gestión de clientes?', answer: 'Construye sobre tu base de servicio al cliente desarrollando visión de negocio, pensamiento estratégico y conciencia de ingresos. Busca oportunidades de gestionar cuentas clave, participar en revisiones de negocio y contribuir a conversaciones de venta adicional. La gestión de clientes agrega responsabilidad comercial a las habilidades de servicio que ya tienes.' },
      { question: '¿Qué certificaciones de CRM apoyan una carrera en gestión de clientes?', answer: 'Las certificaciones de Salesforce Administrator o Salesforce Certified Sales Professional son altamente valoradas. Las certificaciones de HubSpot Inbound y CRM son gratuitas y ampliamente reconocidas. Las certificaciones de Gainsight y ChurnZero son valiosas para roles de gestión de clientes enfocados en customer success.' }
    ]
  },
  'interpersonal-skills': {
    slug: 'habilidades-interpersonales',
    title: 'Habilidades Interpersonales',
    description: 'Las habilidades interpersonales son el amplio conjunto de capacidades que permiten la interacción, comunicación y gestión de relaciones efectivas con otras personas. Abarcan comunicación verbal y no verbal, escucha activa, empatía, construcción de rapport, gestión de conflictos y conciencia social. La teoría de inteligencias múltiples de Howard Gardner identifica la inteligencia interpersonal como una capacidad cognitiva distinta — la capacidad de entender las motivaciones, intenciones y sentimientos de otros.\n\nLas habilidades interpersonales se manifiestan en cada interacción profesional: reuniones de equipo, conversaciones con clientes, negociaciones, entrevistas, eventos de networking y encuentros casuales en el lugar de trabajo. Los profesionales con habilidades interpersonales fuertes leen las señales sociales con precisión, adaptan su comportamiento a diferentes personalidades y crean impresiones positivas que construyen confianza y cooperación.\n\nAunque frecuentemente se consideran innatas, las habilidades interpersonales son desarrollables a través de la autoconciencia, retroalimentación y práctica.',
    whyImportant: 'Harvard University, la Carnegie Foundation y el Stanford Research Center encontraron conjuntamente que el 85% del éxito laboral proviene de habilidades interpersonales bien desarrolladas. La National Soft Skills Association reporta que las habilidades interpersonales son el factor número uno en promociones laborales y la razón principal de terminaciones cuando están ausentes.\n\nEn un currículum, las habilidades interpersonales sustentan cada logro colaborativo. En lugar de listarlas como habilidad independiente, se demuestran mejor a través de éxito en liderazgo, relaciones con clientes, desempeño del equipo y resultados de resolución de conflictos.',
    keywords: ['habilidades interpersonales currículum', 'habilidades de personas CV', 'capacidades interpersonales empleo', 'habilidades sociales currículum'],
    searchIntents: ['cómo mostrar habilidades interpersonales en currículum', 'ejemplos de habilidades interpersonales para empleo', 'habilidades de personas para avance profesional'],
    relatedSkills: ['Comunicación', 'Empatía', 'Escucha Activa', 'Inteligencia Emocional', 'Trabajo en Equipo', 'Resolución de Conflictos', 'Construcción de Relaciones', 'Conciencia Cultural', 'Paciencia', 'Adaptabilidad'],
    professionSlugs: ['gerente-de-recursos-humanos', 'consejero-de-carrera', 'trabajador-social', 'reclutador', 'maestro', 'representante-de-servicio-al-cliente'],
    atsKeywords: ['habilidades interpersonales', 'habilidades de personas', 'habilidades sociales', 'gestión de relaciones', 'construcción de rapport', 'interacción de equipo', 'engagement de stakeholders', 'interacción con clientes', 'colaborativo', 'sociable'],
    resumeTips: [
      'Demuestra habilidades interpersonales a través de logros colaborativos y resultados impulsados por relaciones.',
      'Destaca roles que requirieron interacción extensiva con personas: atención al cliente, liderazgo de equipos, coordinación multifuncional.',
      'Muestra impacto interpersonal a través de puntuaciones de engagement del equipo, calificaciones de satisfacción del cliente y longevidad de relaciones.',
      'Menciona evaluaciones o formación interpersonal: certificación DISC, facilitación Myers-Briggs, talleres de inteligencia emocional.',
      'Evita listar "persona sociable" — en su lugar, proporciona evidencia a través de logros interpersonales específicos.'
    ],
    exampleBullets: [
      'Aprovechó habilidades interpersonales para construir rapport con más de 100 clientes de orígenes diversos, manteniendo una calificación de satisfacción del cliente del 95% y generando $2.5M en negocios por referidos.',
      'Realizó más de 300 entrevistas de candidatos al año, usando técnicas de evaluación interpersonal para evaluar ajuste cultural con tasas de acuerdo de gerentes de contratación del 90%.',
      'Facilitó sesiones de team-building para 5 equipos de proyecto recién formados (60 miembros en total), acelerando la transición de formación a rendimiento y logrando la entrega completa del proyecto a tiempo.',
      'Gestionó dinámicas interpersonales en un departamento de 25 personas con tipos de personalidad diversos, reduciendo conflictos interpersonales en un 55% y mejorando las puntuaciones de colaboración del equipo en un 30%.'
    ],
    faqs: [
      { question: '¿Son las habilidades interpersonales lo mismo que las habilidades de comunicación?', answer: 'La comunicación es un componente importante de las habilidades interpersonales, pero las habilidades interpersonales son más amplias. También incluyen empatía, conciencia social, construcción de rapport, gestión de conflictos y la capacidad de leer y responder a los estados emocionales de otros. La comunicación es cómo transmites; las habilidades interpersonales incluyen cómo conectas.' },
      { question: '¿Cómo demuestran los introvertidos habilidades interpersonales?', answer: 'Los introvertidos frecuentemente tienen excelentes habilidades interpersonales, expresadas de forma diferente: conversaciones profundas uno a uno, comunicación escrita reflexiva, escucha activa y respuestas cuidadosamente consideradas. Destaca estas fortalezas en tu currículum en lugar de intentar demostrar comportamientos sociales extrovertidos.' },
      { question: '¿Se pueden medir objetivamente las habilidades interpersonales?', answer: 'Sí, a través de evaluaciones de retroalimentación 360, perfiles DISC, tests de inteligencia emocional (EQ-i 2.0) y evaluaciones de entrevistas conductuales. En un currículum, las métricas proxy incluyen puntuaciones de satisfacción del cliente, calificaciones de engagement del equipo y tasas de retención de personas que gestionas.' }
    ]
  },
  'patience': {
    slug: 'paciencia',
    title: 'Paciencia',
    description: 'La paciencia en contextos profesionales es la capacidad de permanecer tranquilo, compuesto y enfocado al enfrentar retrasos, dificultades, tareas repetitivas o situaciones frustrantes. Involucra regulación emocional, perspectiva a largo plazo y la capacidad de persistir a través de un progreso lento sin comprometer la calidad o el profesionalismo.\n\nLa paciencia profesional se manifiesta en varias formas: paciencia interpersonal (tolerar las curvas de aprendizaje de otros), paciencia ante adversidades (soportar contratiempos de carrera o cambios organizacionales) y paciencia cotidiana (gestionar frustraciones rutinarias). En roles de atención al cliente, la paciencia permite un servicio efectivo incluso con clientes difíciles. En enseñanza y mentoría, la paciencia permite que los individuos aprendan a su propio ritmo. En liderazgo, la paciencia permite que las estrategias se desplieguen y los equipos se desarrollen.\n\nLa investigación publicada en el Journal of Positive Psychology muestra que las personas pacientes experimentan más gratitud, más conexión y menos emociones negativas.',
    whyImportant: 'La paciencia es particularmente valorada en roles que involucran capacitación, servicio al cliente, asesoramiento, enseñanza y gestión. Un estudio de Sarah Schnitker en Baylor University encontró que la paciencia está asociada con mayor progreso hacia metas, más satisfacción con la vida y menos problemas de salud entre profesionales.\n\nEn un currículum, la paciencia se demuestra mejor a través de logros sostenidos: completitudes de proyectos a largo plazo, desarrollo de estudiantes o mentoreados, resultados de negociaciones complejas y excelencia en servicio al cliente.',
    keywords: ['habilidades de paciencia currículum', 'paciencia laboral CV', 'profesional paciente empleo', 'habilidades de paciencia carrera'],
    searchIntents: ['cómo mostrar paciencia en currículum', 'ejemplos de paciencia para solicitud de empleo', 'habilidades de paciencia en el lugar de trabajo'],
    relatedSkills: ['Empatía', 'Escucha Activa', 'Inteligencia Emocional', 'Manejo del Estrés', 'Resiliencia', 'Servicio al Cliente', 'Mentoría', 'Coaching'],
    professionSlugs: ['maestro', 'consejero-de-carrera', 'trabajador-social', 'representante-de-servicio-al-cliente', 'gerente-de-capacitacion', 'consejero-de-carrera'],
    atsKeywords: ['paciencia', 'compostura', 'calma bajo presión', 'regulación emocional', 'perseverancia', 'tolerancia', 'temperamento estable', 'resistencia', 'enfoque medido'],
    resumeTips: [
      'Demuestra paciencia a través de resultados a largo plazo: proyectos multi-año, desarrollo gradual de clientes, resultados sostenidos de mentoría.',
      'Muestra paciencia en contextos desafiantes: situaciones difíciles con clientes resueltas con calma, alineación compleja de stakeholders lograda con el tiempo.',
      'Destaca roles que requieren paciencia inherente: enseñanza, capacitación, soporte al cliente, asesoramiento.',
      'Conecta la paciencia con resultados de negocio: mayor satisfacción del cliente, menores tasas de escalación, mejor desarrollo del equipo.'
    ],
    exampleBullets: [
      'Proporcionó tutoría paciente e individualizada a 120 estudiantes anuales con necesidades de aprendizaje diversas, logrando una tasa de aprobación del 92% incluyendo un 40% que ingresó por debajo del nivel de grado.',
      'Desescaló más de 500 llamadas de clientes frustrados por trimestre usando técnicas calmadas y empáticas, logrando una puntuación de satisfacción de 4.8/5.0 y convirtiendo el 15% de las quejas en oportunidades de venta adicional.',
      'Mentoreó a 10 miembros del equipo de bajo rendimiento durante planes de desarrollo de 12 meses, con 8 logrando calificaciones de desempeño satisfactorias o superiores al completar el plan.',
      'Navegó un proceso de aprobación regulatoria de 2 años que requirió más de 30 envíos y revisiones, manteniendo la alineación de stakeholders y finalmente asegurando la aprobación para una iniciativa de $5M.'
    ],
    faqs: [
      { question: '¿Cómo muestro paciencia en un currículum sin parecer pasivo?', answer: 'Enmarca la paciencia como perseverancia activa: "Navegó persistentemente un proceso de aprobación de 2 años" o "Desarrolló metódicamente a 10 miembros del equipo de bajo rendimiento para cumplir estándares de desempeño." La paciencia activa involucra esfuerzo deliberado y sostenido hacia una meta, no espera pasiva.' },
      { question: '¿La paciencia es una habilidad o un rasgo de personalidad?', answer: 'Ambos. Mientras que algunas personas son naturalmente más pacientes, la paciencia se puede desarrollar a través de prácticas de mindfulness, entrenamiento de regulación emocional y técnicas de reencuadre cognitivo. Los roles profesionales que requieren paciencia (enseñanza, asesoramiento, servicio al cliente) también construyen paciencia a través de la práctica regular.' },
      { question: '¿En qué roles se valora más la paciencia?', answer: 'Enseñanza, asesoramiento, trabajo social, servicio al cliente, salud y cualquier rol que involucre mentoría o capacitación. Sin embargo, la paciencia también es crítica para líderes gestionando el cambio (que toma tiempo), negociadores trabajando acuerdos complejos y gerentes de proyecto manejando iniciativas multi-año.' }
    ]
  },
  'stress-management': {
    slug: 'manejo-del-estres',
    title: 'Manejo del Estrés',
    description: 'El manejo del estrés es el conjunto de técnicas, estrategias y prácticas utilizadas para controlar y reducir el impacto del estrés en el desempeño profesional y el bienestar personal. Se basa en la teoría de evaluación cognitiva del estrés de Richard Lazarus. Las técnicas de manejo del estrés basadas en evidencia incluyen enfoques cognitivo-conductuales, reducción del estrés basada en mindfulness (MBSR de Jon Kabat-Zinn), gestión del tiempo, actividad física y sistemas de apoyo social.\n\nEn entornos profesionales, el manejo del estrés se manifiesta en mantener la compostura durante crisis, desempeñarse bajo plazos ajustados, gestionar cargas de trabajo altas sin agotamiento y apoyar a los miembros del equipo a través de períodos estresantes. El manejo organizacional del estrés incluye crear seguridad psicológica, establecer cargas de trabajo razonables, promover el equilibrio entre trabajo y vida personal y proporcionar programas de asistencia al empleado.\n\nEl American Institute of Stress reporta que el 83% de los trabajadores estadounidenses sufren de estrés relacionado con el trabajo.',
    whyImportant: 'El manejo del estrés es una competencia profesional crítica, especialmente en industrias de alta presión como salud, finanzas, consultoría y tecnología. Según Deloitte, la rotación de empleados relacionada con el agotamiento cuesta a las organizaciones $322 mil millones globalmente. Los profesionales que manejan el estrés efectivamente superan a sus pares en un 23% en situaciones de alta presión.\n\nEn un currículum, el manejo del estrés se demuestra a través de desempeño sostenido en ambientes exigentes, éxito en gestión de crisis y la capacidad de mantener la calidad bajo presión.',
    keywords: ['manejo del estrés currículum', 'manejar presión CV', 'habilidades de manejo del estrés empleo', 'manejar presión currículum'],
    searchIntents: ['cómo mostrar manejo del estrés en currículum', 'habilidades de manejo del estrés para empleo', 'manejar presión laboral carrera'],
    relatedSkills: ['Resiliencia', 'Inteligencia Emocional', 'Gestión del Tiempo', 'Adaptabilidad', 'Automotivación', 'Paciencia', 'Equilibrio Trabajo-Vida', 'Mindfulness'],
    professionSlugs: ['gerente-de-proyectos', 'gerente-de-operaciones', 'consejero-de-carrera', 'trabajador-social', 'planificador-de-eventos', 'gerente-de-ventas'],
    atsKeywords: ['manejo del estrés', 'manejo de presión', 'ambiente de alta presión', 'gestión de crisis', 'compostura', 'trabajo bajo presión', 'orientado a plazos', 'ambiente de ritmo acelerado', 'gestión de carga de trabajo', 'prevención del agotamiento'],
    resumeTips: [
      'Muestra manejo del estrés a través del desempeño en situaciones de alta presión en lugar de afirmar el rasgo.',
      'Destaca logros durante períodos de presión máxima: cierre de trimestre, lanzamientos, crisis, auditorías.',
      'Menciona programas de manejo del estrés que lideraste para equipos: iniciativas de bienestar, equilibrio de carga de trabajo.',
      'Demuestra desempeño alto sostenido a lo largo del tiempo como evidencia de manejo efectivo del estrés.'
    ],
    exampleBullets: [
      'Mantuvo el 115% de cumplimiento de cuota durante el año fiscal más desafiante de la empresa, gestionando una expansión de territorio del 40% y 3 lanzamientos de producto simultáneamente.',
      'Lideró la respuesta a crisis para una interrupción de servicio mayor que afectó a 50,000 clientes, coordinando un equipo de respuesta de 15 personas durante 72 horas continuas y restaurando el servicio con pérdida mínima de clientes a largo plazo (97% de retención).',
      'Implementó un programa de bienestar del equipo incluyendo monitoreo de carga de trabajo, horarios flexibles y sesiones mensuales de bienestar, reduciendo indicadores de agotamiento del equipo en un 40% y ausentismo en un 25%.',
      'Planificó y ejecutó exitosamente 8 eventos de alto perfil al año (más de 500 asistentes cada uno) con cero cancelaciones durante 5 años, gestionando cambios de último minuto y problemas con proveedores con compostura consistente.'
    ],
    faqs: [
      { question: '¿Cómo muestro que manejo bien el estrés sin implicar que mis trabajos han sido demasiado estresantes?', answer: 'Enmárcalo como desempeñarte excelentemente en ambientes exigentes. Usa lenguaje como "prosperó en un ambiente de ritmo acelerado", "entregó bajo plazos ajustados" y "mantuvo la excelencia durante períodos pico". Esto transmite capacidad sin sugerir estrés crónico.' },
      { question: '¿Debo mencionar técnicas de manejo del estrés en mi currículum?', answer: 'Solo si es relevante para el rol. Para posiciones de bienestar, RRHH o gestión, mencionar programas de manejo del estrés que implementaste es valioso. Para otros roles, demuestra el manejo del estrés implícitamente a través de desempeño consistente en situaciones de alta presión en lugar de listar técnicas de afrontamiento.' },
      { question: '¿Es el manejo del estrés lo mismo que la resiliencia?', answer: 'Están relacionados pero son distintos. El manejo del estrés se trata de prevenir y mitigar el estrés en el momento. La resiliencia se trata de recuperarse de contratiempos y mantener la efectividad a largo plazo a pesar de la adversidad. Ambos son valiosos, y los profesionales fuertes demuestran cada uno. La resiliencia frecuentemente abarca el manejo del estrés como un componente.' }
    ]
  },
  'growth-mindset': {
    slug: 'mentalidad-de-crecimiento',
    title: 'Mentalidad de Crecimiento',
    description: 'La mentalidad de crecimiento es la creencia de que las habilidades y la inteligencia pueden desarrollarse a través de dedicación, trabajo duro y aprendizaje de la retroalimentación, en oposición a una mentalidad fija que ve los talentos como innatos e inmutables. Acuñada por la psicóloga de Stanford Carol Dweck, el marco de la mentalidad de crecimiento ha sido ampliamente adoptado en educación, liderazgo corporativo y desarrollo organizacional. La transformación de la cultura de Microsoft por parte de Satya Nadella es uno de los ejemplos corporativos más prominentes de adopción de la mentalidad de crecimiento.\n\nLos profesionales con mentalidad de crecimiento abrazan desafíos, persisten a través de obstáculos, ven el esfuerzo como el camino hacia la maestría, aprenden de las críticas y encuentran inspiración en el éxito de otros. En contextos laborales, la mentalidad de crecimiento se manifiesta como entusiasmo por asumir asignaciones desafiantes, receptividad a la retroalimentación, disposición a admitir errores y aprender de ellos, y desarrollo continuo de habilidades.\n\nLas organizaciones que cultivan culturas de mentalidad de crecimiento ven un 47% más de confianza entre empleados, un 34% más de compromiso y un 65% más de acuerdo en que la empresa apoya la toma de riesgos.',
    whyImportant: 'La mentalidad de crecimiento es cada vez más reconocida como un predictor de éxito profesional a largo plazo. Microsoft, Google y otras empresas líderes han incorporado la mentalidad de crecimiento en sus criterios de gestión del desempeño y contratación. Los empleados con mentalidades de crecimiento son más adaptables, más resilientes y más innovadores.\n\nEn un currículum, la mentalidad de crecimiento se demuestra a través del aprendizaje continuo, evolución de habilidades, respuesta constructiva al fracaso y desarrollo profesional progresivo. Señala capacidad de ser entrenado, que los gerentes clasifican consistentemente como uno de los rasgos más valorados en nuevas contrataciones.',
    keywords: ['mentalidad de crecimiento currículum', 'mentalidad de aprendizaje CV', 'mentalidad de crecimiento carrera', 'crecimiento continuo currículum'],
    searchIntents: ['cómo mostrar mentalidad de crecimiento en currículum', 'ejemplos de mentalidad de crecimiento para solicitud de empleo', 'habilidades de mentalidad de crecimiento para carrera'],
    relatedSkills: ['Aprendizaje Continuo', 'Adaptabilidad', 'Resiliencia', 'Automotivación', 'Capacidad de Ser Entrenado', 'Innovación', 'Pensamiento Creativo', 'Curiosidad'],
    professionSlugs: ['maestro', 'director-escolar', 'gerente-de-capacitacion', 'consejero-de-carrera', 'consultor-de-gestion', 'profesor-universitario'],
    atsKeywords: ['mentalidad de crecimiento', 'mejora continua', 'agilidad de aprendizaje', 'entrenable', 'autodesarrollo', 'aprendiz de por vida', 'receptivo a retroalimentación', 'adaptable', 'orientado al crecimiento', 'desarrollo profesional'],
    resumeTips: [
      'Muestra crecimiento a través de la progresión profesional: habilidades adquiridas, certificaciones obtenidas, roles en los que evolucionaste.',
      'Demuestra aprendizaje de desafíos: pivotes realizados, lecciones aplicadas, mejoras implementadas después de contratiempos.',
      'Destaca comportamiento de búsqueda de retroalimentación: evaluaciones 360 en las que participaste, mentoría buscada, planes de desarrollo creados.',
      'Menciona aprendizaje continuo: cursos completados, certificaciones obtenidas, nuevas tecnologías adoptadas.',
      'Muestra que ayudaste a otros a desarrollar mentalidades de crecimiento a través de coaching o construcción de cultura.'
    ],
    exampleBullets: [
      'Hizo transición de marketing a gestión de producto autoestudiando diseño UX, SQL y metodología ágil, obteniendo un rol de PM dentro de 12 meses y logrando desempeño del cuartil superior en el primer año.',
      'Buscó proactivamente e incorporó retroalimentación 360, usando input de 15 colegas para mejorar las puntuaciones de efectividad de liderazgo del 72% al 91% durante 18 meses.',
      'Lideró una iniciativa cultural de mentalidad de crecimiento para una división de 200 personas inspirada en el marco de Dweck, resultando en un aumento del 45% en aplicaciones de movilidad interna y una mejora del 20% en métricas de innovación.',
      'Se recuperó de un lanzamiento de producto fallido realizando un post-mortem exhaustivo, aplicando las lecciones aprendidas al siguiente lanzamiento que excedió los objetivos en un 30% y se convirtió en el lanzamiento más exitoso del equipo.'
    ],
    faqs: [
      { question: '¿Cómo demuestro mentalidad de crecimiento en un currículum?', answer: 'Muestra evidencia de aprendizaje y evolución: transiciones de carrera, nuevas habilidades adquiridas, certificaciones obtenidas a mitad de carrera y mejoras realizadas después de recibir retroalimentación. Un patrón de desarrollo progresivo a lo largo de tu carrera es el indicador más fuerte de mentalidad de crecimiento.' },
      { question: '¿Es la mentalidad de crecimiento una habilidad real o solo una palabra de moda?', answer: 'La mentalidad de crecimiento es un marco psicológico bien investigado con décadas de apoyo empírico. La investigación de Carol Dweck en Stanford ha sido replicada en contextos de educación, negocios y deportes. Empresas como Microsoft y Google han validado su impacto en el negocio, haciéndola una competencia legítima que los empleadores evalúan durante la contratación.' },
      { question: '¿Puedo desarrollar una mentalidad de crecimiento si naturalmente tengo una mentalidad fija?', answer: 'Sí. La investigación de Dweck muestra que la mentalidad es maleable. Las estrategias incluyen reencuadrar los fracasos como oportunidades de aprendizaje, reemplazar "no puedo" con "no puedo aún", buscar asignaciones desafiantes y solicitar activamente retroalimentación. Los cambios de mentalidad se desarrollan con el tiempo con práctica consistente y autoconciencia.' }
    ]
  },
  'continuous-learning': {
    slug: 'aprendizaje-continuo',
    title: 'Aprendizaje Continuo',
    description: 'El aprendizaje continuo es la búsqueda continua y automotivada de conocimiento y habilidades para el desarrollo personal y profesional. Incorpora el concepto de la organización que aprende (La Quinta Disciplina de Peter Senge), el modelo 70-20-10 de aprendizaje y desarrollo (70% experiencial, 20% social, 10% formal) y la filosofía japonesa de kaizen — mejora continua a través del aprendizaje incremental.\n\nLos aprendices continuos se mantienen actualizados con las tendencias de la industria, desarrollan proactivamente nuevas habilidades, persiguen certificaciones y formación, asisten a conferencias y talleres, leen literatura profesional y aplican nuevo conocimiento para mejorar su trabajo. En campos que cambian rápidamente como tecnología, marketing, finanzas y salud, la vida media del conocimiento profesional se está reduciendo — haciendo del aprendizaje continuo una habilidad de supervivencia en lugar de una mejora opcional.\n\nEl aprendizaje continuo moderno aprovecha plataformas en línea (Coursera, LinkedIn Learning, Udemy, edX), comunidades profesionales, podcasts, círculos de aprendizaje entre pares y oportunidades de aprendizaje experiencial.',
    whyImportant: 'El World Economic Forum estima que el 50% de todos los empleados necesitarán recapacitación debido a la disrupción tecnológica. El Workplace Learning Report de LinkedIn muestra que el 94% de los empleados permanecerían más tiempo en una empresa si invirtiera en su aprendizaje. Para individuos, el aprendizaje continuo es el camino más confiable hacia la longevidad y avance profesional.\n\nEn un currículum, el aprendizaje continuo demuestra curiosidad intelectual, adaptabilidad y gestión proactiva de carrera. Es valorado por empleadores que necesitan empleados capaces de evolucionar con la organización.',
    keywords: ['aprendizaje continuo currículum', 'aprendizaje de por vida CV', 'habilidades de desarrollo profesional', 'habilidades de aprendizaje currículum'],
    searchIntents: ['cómo mostrar aprendizaje continuo en currículum', 'ejemplos de aprendizaje continuo para empleo', 'consejos de desarrollo profesional currículum'],
    relatedSkills: ['Mentalidad de Crecimiento', 'Adaptabilidad', 'Curiosidad', 'Automotivación', 'Innovación', 'Pensamiento Crítico', 'Investigación', 'Desarrollo Profesional'],
    professionSlugs: ['profesor-universitario', 'maestro', 'gerente-de-capacitacion', 'consultor-de-gestion', 'consejero-de-carrera', 'consultor-de-gestion-del-cambio'],
    atsKeywords: ['aprendizaje continuo', 'aprendizaje de por vida', 'desarrollo profesional', 'upskilling', 'reskilling', 'capacitación y desarrollo', 'autosuperación', 'certificaciones', 'educación continua', 'adquisición de conocimiento'],
    resumeTips: [
      'Incluye una sección de Desarrollo Profesional listando certificaciones recientes, cursos y formación completada.',
      'Muestra cómo el aprendizaje se tradujo en mejor desempeño laboral o nuevas capacidades.',
      'Demuestra aprendizaje a través de modalidades: cursos formales, conferencias, autoestudio, mentoría.',
      'Destaca aprendizaje que fue autoiniciado, no solo obligatorio del empleador.',
      'Muestra un patrón de aprendizaje continuo a lo largo de tu línea temporal de carrera, no solo una ráfaga de actividad.'
    ],
    exampleBullets: [
      'Completó 15 certificaciones profesionales en 5 años incluyendo PMP, AWS Solutions Architect y Six Sigma Green Belt, aplicando cada una para mejorar mediblemente los resultados de proyectos.',
      'Dedicó más de 200 horas anuales al desarrollo profesional a través de cursos en línea, conferencias de la industria y grupos de aprendizaje entre pares, aplicando consistentemente nuevas metodologías para lograr una mejora de productividad del 20% año tras año.',
      'Inició un programa de aprendizaje departamental con sesiones mensuales de intercambio de conocimientos, aumentando las puntuaciones de evaluación de habilidades del equipo en un 35% y reduciendo los costos de formación externa en $80K anuales.',
      'Aprendió de forma autodidacta analítica de datos usando Python y Tableau, haciendo transición de un rol de marketing puro a una posición de analítica de marketing y entregando insights que mejoraron el ROI de campañas en un 45%.'
    ],
    faqs: [
      { question: '¿Cómo muestro aprendizaje continuo en un currículum?', answer: 'Incluye una sección dedicada de Desarrollo Profesional listando cursos recientes, certificaciones y formación. Dentro de tus viñetas de experiencia, menciona habilidades que adquiriste y aplicaste en el trabajo. Muestra un patrón de aprendizaje a lo largo de tu carrera, no solo durante la educación formal.' },
      { question: '¿Qué plataformas de aprendizaje debo mencionar en mi currículum?', answer: 'Menciona plataformas respetadas como Coursera, edX, LinkedIn Learning, Harvard Online, Google Career Certificates y plataformas específicas de la industria. La plataforma importa menos que las habilidades ganadas y su aplicación. Siempre incluye el nombre específico del curso o certificación.' },
      { question: '¿Es el aprendizaje continuo más importante para algunas carreras que para otras?', answer: 'Es crítico en campos que evolucionan rápidamente como tecnología, ciencia de datos, marketing y salud donde el conocimiento se vuelve obsoleto rápidamente. Sin embargo, todo campo se beneficia del aprendizaje continuo. Incluso profesiones establecidas como derecho y contabilidad requieren créditos de educación continua, reflejando el valor universal del desarrollo profesional continuo.' }
    ]
  },
};