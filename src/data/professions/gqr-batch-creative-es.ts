import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  "3d-artist": {
    slug: "artista-3d",
    title: "Artista 3D",
    keywords: ["currículum de artista 3D", "CV de artista 3D", "ejemplo currículum artista 3D", "plantilla CV artista 3D"],
    searchIntents: ["cómo escribir currículum de artista 3D", "ejemplos currículum artista 3D", "mejor formato CV artista 3D"],
    topSkills: ["modelado 3D", "texturización", "iluminación", "renderizado", "animación", "escultura digital", "arte conceptual", "diseño de juegos", "efectos visuales", "manejo de Maya"],
    atsKeywords: ["artista 3D", "Maya", "Blender", "ZBrush", "pintura de texturas", "animación", "renderizado 3D", "arte de juegos", "desarrollo de conceptos", "gestión de portafolios", "colaboración en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista 3D",
      summary: "Artista 3D creativo con más de 5 años de experiencia en modelado, texturización y renderizado para juegos y películas. Logré una reducción del 30% en el tiempo de producción a través de la optimización del flujo de trabajo.",
      skills: ["modelado 3D", "texturización", "iluminación", "renderizado", "animación", "escultura digital", "arte conceptual", "diseño de juegos", "efectos visuales", "manejo de Maya"],
      experience: [
        {
          title: "Artista 3D Senior",
          company: "Epic Games",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que aumentó el rendimiento del juego en un 25% a través de la creación de activos optimizados.",
            "Creé más de 100 activos 3D de alta calidad para títulos AAA, resultando en un aumento del 15% en la participación de los jugadores.",
            "Colaboré con equipos multifuncionales para entregar proyectos a tiempo, logrando una tasa de satisfacción del 95% en encuestas de retroalimentación.",
          ],
        },
        {
          title: "Artista 3D",
          company: "Blizzard Entertainment",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé modelos de personajes para un RPG altamente calificado, contribuyendo a un aumento del 20% en las ventas.",
            "Implementé nuevas técnicas de texturización que redujeron los tiempos de carga de activos en un 10%.",
            "Trabajé en un importante paquete de expansión, mejorando la estética visual del juego y la experiencia del jugador.",
          ],
        },
      ],
      education: [
        { institution: "Rhode Island School of Design", degree: "B.S.", field: "Medios Digitales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified 3D Artist", issuer: "CGMA", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un artista 3D en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia laboral, y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de artista 3D?", answer: "Enfatiza tus logros más relevantes y muestra un portafolio atractivo." },
      { question: "¿Qué habilidades necesita un artista 3D?", answer: "Necesita habilidades en modelado, texturización, iluminación y software como Maya y Blender." },
    ],
  },
  "acting-instructor": {
    slug: "curriculum-del-instructor-de-actuacion",
    title: "Currículum del Instructor de Actuación",
    keywords: ["currículum de instructor de actuación", "CV de instructor de actuación", "ejemplo currículum instructor de actuación", "plantilla CV instructor de actuación"],
    searchIntents: ["cómo escribir currículum de instructor de actuación", "ejemplos currículum instructor de actuación", "mejor formato CV instructor de actuación"],
    topSkills: ["Improvisación", "Estudio de Escenas", "Entrenamiento de Voz", "Desarrollo de Personajes", "Dirección", "Análisis de Guiones", "Preparación de Monólogos", "Técnicas de Audición", "Metodologías de Enseñanza", "Retroalimentación y Crítica"],
    atsKeywords: ["actuación", "teatro", "actuación", "instrucción", "coaching", "desarrollo de currículo", "compromiso estudiantil", "oratoria", "creatividad", "colaboración", "educación artística"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum del Instructor de Actuación",
      summary: "Instructor de Actuación dedicado con más de 5 años de experiencia en la enseñanza y mentoría de actores aspirantes, logrando una mejora del 30% en las tasas de éxito en audiciones de los estudiantes.",
      skills: ["Improvisación", "Estudio de Escenas", "Entrenamiento de Voz", "Desarrollo de Personajes", "Dirección", "Análisis de Guiones", "Preparación de Monólogos", "Técnicas de Audición", "Metodologías de Enseñanza", "Retroalimentación y Crítica"],
      experience: [
        {
          title: "Instructor de Actuación Senior",
          company: "Drama Academy of Arts",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la matrícula estudiantil en un 40% a través de estrategias de marketing innovadoras",
            "Desarrollé un nuevo currículo que mejoró los indicadores de rendimiento estudiantil en un 25%",
            "Dirigí talleres que resultaron en 15 estudiantes obteniendo roles en producciones de teatro regional",
          ],
        },
        {
          title: "Instructor de Actuación",
          company: "City Performing Arts School",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mejoré el compromiso estudiantil a través de métodos de enseñanza interactivos",
            "Guié a los estudiantes para ganar 3 competencias de actuación a nivel estatal",
            "Implementé sistemas de retroalimentación que mejoraron las calificaciones de satisfacción estudiantil en un 20%",
          ],
        },
      ],
      education: [
        { institution: "University of Fine Arts", degree: "B.F.A.", field: "Artes Escénicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Acting Coach", issuer: "National Association of Acting Instructors", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de instructor de actuación?", answer: "Un currículum de instructor de actuación debe incluir experiencia docente, habilidades específicas en actuación, y logros destacados de los estudiantes." },
      { question: "¿Cómo destacar mi currículum de instructor de actuación?", answer: "Resalta tus experiencias de enseñanza, tus métodos innovadores y los logros de tus estudiantes." },
      { question: "¿Qué habilidades necesita un instructor de actuación?", answer: "Las habilidades clave incluyen improvisación, técnicas de actuación, y metodologías de enseñanza efectivas." },
    ],
  },
  "actor": {
    slug: "curriculum-actor",
    title: "Currículum de Actor",
    keywords: ["currículum de actor", "CV de actor", "ejemplo currículum actor", "plantilla CV actor"],
    searchIntents: ["cómo escribir currículum de actor", "ejemplos currículum actor", "mejor formato CV actor"],
    topSkills: ["Actuación", "Improvisación", "Modulación de voz", "Análisis de guion", "Combate escénico", "Desarrollo de personajes", "Oratoria", "Colaboración", "Dicción", "Actuación física"],
    atsKeywords: ["actuación", "audición", "teatro", "cine", "TV", "ensayo", "casting", "guion", "monólogo", "dirección", "diálogo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Actor",
      summary: "Actor dinámico con más de 5 años de experiencia en cine y teatro. Ha protagonizado producciones que generaron más de $2 millones en taquilla.",
      skills: ["Actuación", "Improvisación", "Modulación de voz", "Análisis de guion", "Combate escénico", "Desarrollo de personajes", "Oratoria", "Colaboración", "Dicción", "Actuación física"],
      experience: [
        {
          title: "Actor Principal",
          company: "DreamWorks Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Protagonizó una película que recaudó $5 millones en su primer fin de semana.",
            "Recibió elogios de la crítica por su actuación, lo que resultó en una nominación a Mejor Actor en el Festival de Cine XYZ.",
            "Colaboró con un equipo de guionistas para mejorar el desarrollo de personajes en el guion.",
          ],
        },
        {
          title: "Actor de Soporte",
          company: "Broadway Productions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Actuó en una obra que tuvo funciones agotadas, lo que llevó a un aumento del 30% en las ventas de boletos.",
            "Trabajó de cerca con el director para refinar las transiciones de escena, mejorando la calidad general de la producción.",
            "Participó en eventos promocionales que aumentaron el compromiso del público en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "University of the Arts", degree: "B.F.A.", field: "Artes Teatrales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Acting Coach", issuer: "National Acting Academy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Actor Resume en su currículum?", answer: "Un Actor Resume debe incluir experiencia en actuaciones, habilidades relevantes y formación en artes escénicas." },
      { question: "¿Cómo destacar mi currículum de Actor Resume?", answer: "Destaca tus logros en roles anteriores, usa un formato claro y añade cualquier premio o reconocimiento." },
      { question: "¿Qué habilidades necesita un Actor Resume?", answer: "Habilidades clave incluyen actuación, improvisación, modulación de voz, y desarrollo de personajes." },
    ],
  },
  "algorithm-design-engineer": {
    slug: "ingeniero-de-diseno-de-algoritmos",
    title: "Ingeniero de Diseño de Algoritmos",
    keywords: ["currículum de ingeniero de diseño de algoritmos", "CV de ingeniero de diseño de algoritmos", "ejemplo currículum ingeniero de diseño de algoritmos", "plantilla CV ingeniero de diseño de algoritmos"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de algoritmos", "ejemplos currículum ingeniero de diseño de algoritmos", "mejor formato CV ingeniero de diseño de algoritmos"],
    topSkills: ["Optimización de Algoritmos", "Estructuras de Datos", "Aprendizaje Automático", "Diseño de Sistemas", "Resolución de Problemas", "Lenguajes de Programación", "Desarrollo de Software", "Análisis Estadístico", "Ajuste de Rendimiento", "Computación en la Nube"],
    atsKeywords: ["diseño de algoritmos", "análisis de datos", "ingeniería de software", "técnicas de optimización", "algoritmos de aprendizaje automático", "competencia en programación", "documentación técnica", "gestión de proyectos", "desarrollo colaborativo", "arquitectura de sistemas", "métricas de rendimiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Algoritmos",
      summary: "Ingeniero de Diseño de Algoritmos orientado a resultados con más de 5 años de experiencia en el desarrollo de algoritmos y estructuras de datos eficientes. Logré una mejora del 30% en el rendimiento de aplicaciones de software clave mediante soluciones de diseño innovadoras.",
      skills: ["Optimización de Algoritmos", "Estructuras de Datos", "Aprendizaje Automático", "Diseño de Sistemas", "Resolución de Problemas", "Lenguajes de Programación", "Desarrollo de Software", "Análisis Estadístico", "Ajuste de Rendimiento", "Computación en la Nube"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Algoritmos",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia del algoritmo en un 40%, lo que resultó en un ahorro anual de $500,000.",
            "Lideré un equipo para desarrollar un modelo de aprendizaje automático que mejoró la precisión de predicción en un 25%.",
            "Implementé una nueva estructura de datos que mejoró la velocidad de procesamiento en un 60%.",
          ],
        },
        {
          title: "Ingeniero de Algoritmos",
          company: "NextGen Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé algoritmos que redujeron el tiempo de computación en un 20%.",
            "Colaboré con equipos multifuncionales para integrar nuevas características.",
            "Escribí documentación técnica que mejoró la eficiencia de incorporación del equipo.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Algorithm Engineer", issuer: "Institute of Electrical and Electronics Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Algoritmos en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas, logros cuantificables y educación." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Algoritmos?", answer: "Utilizar palabras clave relevantes, resaltar logros y mantener un formato claro." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Algoritmos?", answer: "Habilidades en optimización de algoritmos, estructuras de datos, programación y aprendizaje automático." },
    ],
  },
  "analog-circuit-design-engineer": {
    slug: "ingeniero-de-diseno-de-circuitos-analogicos",
    title: "Ingeniero de Diseño de Circuitos Analógicos",
    keywords: ["currículum de Ingeniero de Diseño de Circuitos Analógicos", "CV de Ingeniero de Diseño de Circuitos Analógicos", "ejemplo currículum Ingeniero de Diseño de Circuitos Analógicos", "plantilla CV Ingeniero de Diseño de Circuitos Analógicos"],
    searchIntents: ["cómo escribir currículum de Ingeniero de Diseño de Circuitos Analógicos", "ejemplos currículum Ingeniero de Diseño de Circuitos Analógicos", "mejor formato CV Ingeniero de Diseño de Circuitos Analógicos"],
    topSkills: ["Simulación de Circuitos", "Diseño de Señal Mixta", "Análisis de Circuitos Analógicos", "Diseño de PCB", "Procesamiento de Señales", "Diseño a Nivel de Transistor", "Pruebas y Medición", "Diseño de Circuitos RF", "Diseño de Bajo Consumo", "Integración de FPGA"],
    atsKeywords: ["diseño analógico", "diseño de circuitos", "simulación SPICE", "Verilog-A", "diseño de filtros", "diseño de amplificadores", "diseño de osciladores", "circuitos integrados", "convertidores de datos", "diseño de layout", "ingeniería de pruebas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Circuitos Analógicos",
      summary: "Ingeniero de Diseño de Circuitos Analógicos con más de 5 años de experiencia en la industria, especializado en diseños de señal mixta que mejoraron la eficiencia del producto en un 30%. Historial comprobado en la entrega de diseños de alta calidad a tiempo y dentro del presupuesto.",
      skills: ["Simulación de Circuitos", "Diseño de Señal Mixta", "Análisis de Circuitos Analógicos", "Diseño de PCB", "Procesamiento de Señales", "Diseño a Nivel de Transistor", "Pruebas y Medición", "Diseño de Circuitos RF", "Diseño de Bajo Consumo", "Integración de FPGA"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Circuitos Analógicos",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que desarrolló un nuevo chip analógico, lo que resultó en una reducción del 25% en el consumo de energía.",
            "Mejoré la integridad de la señal en un 40% en sistemas de señal mixta a través de diseños de circuitos innovadores.",
            "Reduje con éxito el tiempo del ciclo de diseño en un 15% utilizando técnicas avanzadas de simulación.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Circuitos Analógicos",
          company: "Analog Devices",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé y probé un amplificador de bajo ruido que aumentó el rendimiento del sistema en un 20%.",
            "Colaboré con equipos multifuncionales para integrar componentes RF, mejorando las capacidades del producto.",
            "Optimicé el proceso de pruebas, lo que resultó en una disminución del 30% en el tiempo de prueba.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Analog Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Circuitos Analógicos en su currículum?", answer: "Debe incluir sus habilidades técnicas, experiencias previas, educación y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Circuitos Analógicos?", answer: "Utilice palabras clave específicas del sector y resalte sus logros más importantes." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Circuitos Analógicos?", answer: "Habilidades clave incluyen diseño analógico, simulación de circuitos, y pruebas de circuitos." },
    ],
  },
  "analog-design-engineer": {
    slug: "ingeniero-de-diseno-analogico",
    title: "Ingeniero de Diseño Analógico",
    keywords: ["currículum de ingeniero de diseño analógico", "CV de ingeniero de diseño analógico", "ejemplo currículum ingeniero de diseño analógico", "plantilla CV ingeniero de diseño analógico"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño analógico", "ejemplos currículum ingeniero de diseño analógico", "mejor formato CV ingeniero de diseño analógico"],
    topSkills: ["Diseño de Circuitos", "Procesamiento de Señales", "Diseño de PCB", "Software de Simulación", "Pruebas de Circuitos Analógicos", "Diseño RF", "Análisis de Ruido", "Selección de Componentes", "Gestión de Energía", "Adquisición de Datos"],
    atsKeywords: ["diseño analógico", "análisis de circuitos", "simulación SPICE", "diseño de señal mixta", "diseño a nivel de transistor", "circuitos de alta frecuencia", "equipo de prueba", "diseño de circuitos integrados analógicos", "circuitos de bajo ruido", "validación de diseño", "desarrollo de prototipos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño Analógico",
      summary: "Ingeniero de Diseño Analógico experimentado con más de 5 años en el desarrollo de circuitos analógicos de alto rendimiento, resultando en una reducción del 30% en el consumo de energía en múltiples líneas de productos.",
      skills: ["Diseño de Circuitos", "Procesamiento de Señales", "Diseño de PCB", "Software de Simulación", "Pruebas de Circuitos Analógicos", "Diseño RF", "Análisis de Ruido", "Selección de Componentes", "Gestión de Energía", "Adquisición de Datos"],
      experience: [
        {
          title: "Ingeniero de Diseño Analógico Senior",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré el diseño de un nuevo amplificador de bajo ruido, logrando un aumento del 25% en la claridad de la señal.",
            "Reduje los costos de producción en un 15% mediante una eficaz adquisición de componentes y optimización del diseño.",
            "Mejoré el rendimiento de pruebas en un 20% implementando un nuevo protocolo de pruebas para circuitos analógicos.",
          ],
        },
        {
          title: "Ingeniero de Diseño Analógico",
          company: "Analog Devices",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé y validé múltiples prototipos de circuitos analógicos, resultando en lanzamientos de productos exitosos.",
            "Colaboré con equipos multifuncionales para integrar componentes analógicos en nuevos diseños de productos.",
            "Mejoré las métricas de rendimiento de los circuitos en un 30% a través de pruebas iterativas y modificaciones de diseño.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Analog Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño Analógico en su currículum?", answer: "Un Ingeniero de Diseño Analógico debe incluir habilidades técnicas relevantes, experiencia en proyectos específicos, y logros medibles en el diseño y la prueba de circuitos analógicos." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño Analógico?", answer: "Para destacar tu currículum, enfócate en tus logros más relevantes, utiliza palabras clave de la industria, y presenta tus habilidades de manera clara y concisa." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño Analógico?", answer: "Un Ingeniero de Diseño Analógico necesita habilidades en diseño de circuitos, procesamiento de señales, análisis de ruido, y competencia en software de simulación como SPICE." },
    ],
  },
  "analog-hardware-design-engineer": {
    slug: "ingeniero-de-diseno-de-hardware-analogico",
    title: "Ingeniero de Diseño de Hardware Analógico",
    keywords: ["currículum de ingeniero de diseño de hardware analógico", "CV de ingeniero de diseño de hardware analógico", "ejemplo currículum ingeniero de diseño de hardware analógico", "plantilla CV ingeniero de diseño de hardware analógico"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de hardware analógico", "ejemplos currículum ingeniero de diseño de hardware analógico", "mejor formato CV ingeniero de diseño de hardware analógico"],
    topSkills: ["Diseño de Circuitos", "Procesamiento de Señales", "Diseño de PCB", "Simulación de Circuitos Analógicos", "Dimensionamiento de Componentes", "Análisis de Ruido", "Gestión Térmica", "Pruebas y Validación", "Sistemas Empotrados", "Diseño para Fabricabilidad"],
    atsKeywords: ["Diseño Analógico", "Desarrollo de Hardware", "Simulación SPICE", "Diseño de Circuitos RF", "Gestión de Potencia", "Diseño de Señales Mixtas", "Procesamiento de Señales Analógicas", "Cumplimiento Regulatorio", "Prototipado", "Documentación Técnica", "Colaboración Interfuncional"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Hardware Analógico",
      summary: "Ingeniero de Diseño de Hardware Analógico dedicado con más de 5 años de experiencia en el desarrollo de soluciones de circuitos innovadoras, logrando una reducción del 30% en los costos de producto a través de metodologías de diseño eficientes.",
      skills: ["Diseño de Circuitos", "Procesamiento de Señales", "Diseño de PCB", "Simulación de Circuitos Analógicos", "Dimensionamiento de Componentes", "Análisis de Ruido", "Gestión Térmica", "Pruebas y Validación", "Sistemas Empotrados", "Diseño para Fabricabilidad"],
      experience: [
        {
          title: "Ingeniero Senior de Hardware Analógico",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje el ruido de señal en un 15% mediante un rediseño innovador del circuito.",
            "Lideré un proyecto que resultó en ahorros de $200,000 en costos de producción.",
            "Mejoré el tiempo del ciclo de diseño en un 20% al implementar nuevas técnicas de simulación.",
          ],
        },
        {
          title: "Ingeniero de Hardware Analógico",
          company: "Analog Devices",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un nuevo circuito de gestión de potencia que aumentó la eficiencia en un 25%.",
            "Validé con éxito más de 10 nuevos diseños de productos, asegurando el cumplimiento con los estándares de la industria.",
            "Colaboré con equipos interfuncionales para mejorar las características del producto, resultando en un aumento del 40% en la satisfacción del cliente.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Analog Design Engineer", issuer: "Institute of Electrical and Electronics Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un ingeniero de diseño de hardware analógico en su currículum?", answer: "Debe incluir experiencia en diseño de circuitos, habilidades en simulación y validación de productos, así como colaboraciones en equipo." },
      { question: "¿Cómo destacar mi currículum de ingeniero de diseño de hardware analógico?", answer: "Enfatiza tus logros cuantificables y habilidades técnicas específicas relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un ingeniero de diseño de hardware analógico?", answer: "Habilidades clave incluyen diseño de circuitos, procesamiento de señales, y cumplimiento regulatorio." },
    ],
  },
  "analog-ic-design-engineers": {
    slug: "ingeniero-de-diseno-de-circuitos-integrados-analogicos",
    title: "Ingeniero de Diseño de Circuitos Integrados Analógicos",
    keywords: ["currículum de ingeniero de diseño de circuitos integrados analógicos", "CV de ingeniero de diseño de circuitos integrados analógicos", "ejemplo currículum ingeniero de diseño de circuitos integrados analógicos", "plantilla CV ingeniero de diseño de circuitos integrados analógicos"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de circuitos integrados analógicos", "ejemplos currículum ingeniero de diseño de circuitos integrados analógicos", "mejor formato CV ingeniero de diseño de circuitos integrados analógicos"],
    topSkills: ["Diseño de Circuitos", "Simulación SPICE", "Diseño de Layout", "Procesamiento de Señales Analógicas", "Adquisición de Datos", "Diseño de Señales Mixtas", "Diseño a Nivel de Transistor", "Análisis de Integridad de Señales", "Gestión de Potencia", "Análisis de Ruido"],
    atsKeywords: ["Circuito Integrado Analógico", "Diseño de Circuitos Integrados", "Automatización del Diseño Electrónico", "Verilog", "Cadence", "LTspice", "Transistores", "Amplificadores Operacionales", "Reguladores de Voltaje", "Pruebas y Verificación", "Filtros Analógicos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Circuitos Integrados Analógicos",
      summary: "Ingeniero de Diseño de Circuitos Integrados Analógicos con más de 5 años de experiencia en el diseño de circuitos complejos y logrando una reducción del 30% en el consumo de energía para aplicaciones de alto rendimiento.",
      skills: ["Diseño de Circuitos", "Simulación SPICE", "Diseño de Layout", "Procesamiento de Señales Analógicas", "Adquisición de Datos", "Diseño de Señales Mixtas", "Diseño a Nivel de Transistor", "Análisis de Integridad de Señales", "Gestión de Potencia", "Análisis de Ruido"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Circuitos Integrados Analógicos",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para diseñar un nuevo amplificador operacional, logrando una mejora del 25% en ancho de banda.",
            "Reduje los costos de producción en $150,000 anuales a través de la optimización del diseño.",
            "Mejoré el rendimiento del circuito, resultando en un aumento del 40% en las calificaciones de satisfacción del cliente.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Circuitos Integrados Analógicos",
          company: "Analog Devices",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un circuito integrado de señales mixtas que aumentó el rendimiento de datos en un 50%.",
            "Implementé un nuevo protocolo de pruebas que redujo el tiempo de prueba en un 20%.",
            "Contribuí a un proyecto que ganó el Premio a la Innovación por mejorar la precisión del sensor.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Analog IC Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Circuitos Integrados Analógicos en su currículum?", answer: "Incluya su experiencia en diseño de circuitos, habilidades técnicas relevantes y logros que demuestren su impacto en proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Circuitos Integrados Analógicos?", answer: "Enfatice sus logros cuantificables y proyectos significativos, y utilice palabras clave relevantes para el sector." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Circuitos Integrados Analógicos?", answer: "Necesita habilidades en diseño de circuitos, simulación, procesamiento de señales y experiencia con herramientas de diseño electrónico." },
    ],
  },
  "analog-mixed-signal-design-engineer": {
    slug: "ingeniero-de-diseno-de-senales-mixtas-analogicas",
    title: "Ingeniero de Diseño de Señales Mixtas Analógicas",
    keywords: ["currículum de Ingeniero de Diseño de Señales Mixtas Analógicas", "CV de Ingeniero de Diseño de Señales Mixtas Analógicas", "ejemplo currículum Ingeniero de Diseño de Señales Mixtas Analógicas", "plantilla CV Ingeniero de Diseño de Señales Mixtas Analógicas"],
    searchIntents: ["cómo escribir currículum de Ingeniero de Diseño de Señales Mixtas Analógicas", "ejemplos currículum Ingeniero de Diseño de Señales Mixtas Analógicas", "mejor formato CV Ingeniero de Diseño de Señales Mixtas Analógicas"],
    topSkills: ["Diseño de Circuitos Analógicos", "Diseño de Señales Mixtas", "Procesamiento de Señales", "Diseño de PCB", "Herramientas de Simulación", "Amplificadores de Bajo Ruido", "Convertidores de Datos", "Gestión de Energía", "Pruebas y Validación", "Diseño de Sistema en Chip (SoC)"],
    atsKeywords: ["Diseño Analógico", "Señales Mixtas", "Análisis de Circuitos", "Simulación SPICE", "Diseño RF", "Pruebas Electrónicas", "Diseño de CI", "Verilog", "Cadence", "Diseño para Pruebas (DFT)", "Integridad de Señal"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Señales Mixtas Analógicas",
      summary: "Ingeniero de Diseño de Señales Mixtas Analógicas con más de 5 años de experiencia en la industria de semiconductores, entregando soluciones innovadoras que mejoraron el rendimiento del producto en un 30% y redujeron costos en $500,000.",
      skills: ["Diseño de Circuitos Analógicos", "Diseño de Señales Mixtas", "Procesamiento de Señales", "Diseño de PCB", "Herramientas de Simulación", "Amplificadores de Bajo Ruido", "Convertidores de Datos", "Gestión de Energía", "Pruebas y Validación", "Diseño de Sistema en Chip (SoC)"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Señales Mixtas Analógicas",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré el diseño de un CI de señales mixtas que logró una tasa de rendimiento del 95%, generando $2M en ingresos anuales.",
            "Reduje el consumo de energía en productos existentes en un 20% mediante técnicas de diseño innovadoras.",
            "Mentor de ingenieros junior, mejorando la productividad del equipo en un 15%.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Señales Mixtas Analógicas",
          company: "Analog Devices",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un convertidor de datos de alta velocidad que mejoró el rendimiento en un 50%.",
            "Colaboré con equipos multifuncionales para asegurar la entrega oportuna de proyectos.",
            "Implementé protocolos de prueba que disminuyeron el tiempo de comercialización en un 25%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Analog Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Señales Mixtas Analógicas en su currículum?", answer: "Incluir experiencia relevante en diseño de circuitos, habilidades en simulación y pruebas, y logros cuantificables en proyectos." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Señales Mixtas Analógicas?", answer: "Utilizar palabras clave relevantes, mostrar resultados medibles en logros y adaptar el formato para facilitar la lectura." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Señales Mixtas Analógicas?", answer: "Habilidades clave incluyen diseño analógico, procesamiento de señales, diseño de PCB, y experiencia con herramientas de simulación." },
    ],
  },
  "antenna-design-engineer": {
    slug: "ingeniero-de-diseno-de-antenas",
    title: "Ingeniero de Diseño de Antenas",
    keywords: ["currículum de ingeniero de diseño de antenas", "CV de ingeniero de diseño de antenas", "ejemplo currículum ingeniero de diseño de antenas", "plantilla CV ingeniero de diseño de antenas"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de antenas", "ejemplos currículum ingeniero de diseño de antenas", "mejor formato CV ingeniero de diseño de antenas"],
    topSkills: ["Diseño de RF", "Teoría de Antenas", "Simulación Electromagnética", "Diseño de Circuitos", "Procesamiento de Señales", "Modelado Electromagnético 3D", "Comunicación Inalámbrica", "Gestión de Proyectos", "Documentación Técnica", "Colaboración"],
    atsKeywords: ["Diseño de Antenas", "Ingeniería de RF", "Integridad de Señal", "Simulación EM", "Diseño de PCB", "Prototipado", "Pruebas y Validación", "Especificaciones Técnicas", "Cumplimiento Regulatorio", "Modelado 3D", "Sistemas de Comunicación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Antenas",
      summary: "Ingeniero de Diseño de Antenas orientado a resultados con más de 5 años de experiencia en diseño de RF y simulación electromagnética. Lideré con éxito proyectos que mejoraron la fuerza de la señal en un 30% y redujeron los costos de producción en $50K.",
      skills: ["Diseño de RF", "Teoría de Antenas", "Simulación Electromagnética", "Diseño de Circuitos", "Procesamiento de Señales", "Modelado Electromagnético 3D", "Comunicación Inalámbrica", "Gestión de Proyectos", "Documentación Técnica", "Colaboración"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Antenas",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que aumentó el rendimiento de la antena en un 25%, resultando en un aumento de $200K en ingresos anuales.",
            "Desarrollé un prototipo de antena innovador que redujo el tamaño en un 40%, mejorando la portabilidad del producto.",
            "Agilicé el proceso de diseño, reduciendo el tiempo de lanzamiento al mercado en un 15%.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Antenas",
          company: "Hewlett Packard",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé técnicas avanzadas de simulación que mejoraron la precisión del diseño en un 20%.",
            "Colaboré con equipos multifuncionales para entregar proyectos a tiempo y dentro del presupuesto.",
            "Contribuí al desarrollo de una nueva línea de productos inalámbricos que alcanzó una penetración del mercado del 50%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified RF Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Antenas en su currículum?", answer: "Un Ingeniero de Diseño de Antenas debe incluir su experiencia en diseño de RF, habilidades técnicas, proyectos relevantes y logros destacados." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Antenas?", answer: "Para destacar su currículum, resalte sus logros cuantificables, utilice palabras clave relevantes y adapte su currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Antenas?", answer: "Las habilidades clave incluyen diseño de RF, teoría de antenas, simulación electromagnética y gestión de proyectos." },
    ],
  },
  "art-design": {
    slug: "curriculum-diseno-artistico",
    title: "Currículum de Diseño Artístico",
    keywords: ["currículum de diseño artístico", "CV de diseño artístico", "ejemplo currículum diseño artístico", "plantilla CV diseño artístico"],
    searchIntents: ["cómo escribir currículum de diseño artístico", "ejemplos currículum diseño artístico", "mejor formato CV diseño artístico"],
    topSkills: ["Diseño Gráfico", "Ilustración", "Adobe Creative Suite", "Tipografía", "Teoría del Color", "Diseño UI/UX", "Modelado 3D", "Animación", "Desarrollo de Marca", "Diseño Impreso"],
    atsKeywords: ["diseño", "creatividad", "comunicación visual", "desarrollo de conceptos", "colaboración", "gestión de proyectos", "medios digitales", "dirección de arte", "interfaz de usuario", "portafolio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Diseño Artístico",
      summary: "Diseñador Artístico Creativo con más de 5 años de experiencia en diseño gráfico y medios digitales. Lideré proyectos que aumentaron la satisfacción del cliente en un 40% y mejoraron la interacción en redes sociales en un 150%.",
      skills: ["Diseño Gráfico", "Ilustración", "Adobe Creative Suite", "Tipografía", "Teoría del Color", "Diseño UI/UX", "Modelado 3D", "Animación", "Desarrollo de Marca", "Diseño Impreso"],
      experience: [
        {
          title: "Diseñador Artístico Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para rediseñar la marca de un cliente importante, resultando en un aumento del 50% en el reconocimiento de la marca.",
            "Desarrollé una campaña en redes sociales que mejoró las tasas de interacción en un 200%.",
            "Creé gráficos galardonados para una campaña publicitaria nacional, contribuyendo a un crecimiento de ingresos de $500,000.",
          ],
        },
        {
          title: "Diseñador Gráfico Junior",
          company: "Innovative Media Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé materiales de marketing que llevaron a un aumento del 30% en la asistencia a eventos.",
            "Colaboré con el equipo de marketing en un lanzamiento de producto que superó los objetivos de ventas en un 20%.",
            "Asistí en el desarrollo de un nuevo sitio web que mejoró la experiencia del usuario y aumentó el tráfico en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Design", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de diseño artístico?", answer: "Un currículum de diseño artístico debe incluir una descripción de sus habilidades, experiencia laboral, educación y un portafolio de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de diseño artístico?", answer: "Para destacar su currículum, incluya un portafolio impresionante, use un diseño atractivo y resalte sus logros más importantes." },
      { question: "¿Qué habilidades necesita un currículum de diseño artístico?", answer: "Las habilidades clave incluyen diseño gráfico, ilustración, experiencia en Adobe Creative Suite y conocimientos de UI/UX." },
    ],
  },
  "artistic-director-theatre": {
    slug: "director-artistico-teatro",
    title: "Director Artístico de Teatro",
    keywords: ["currículum de Director Artístico de Teatro", "CV de Director Artístico de Teatro", "ejemplo currículum Director Artístico de Teatro", "plantilla CV Director Artístico de Teatro"],
    searchIntents: ["cómo escribir currículum de Director Artístico de Teatro", "ejemplos currículum Director Artístico de Teatro", "mejor formato CV Director Artístico de Teatro"],
    topSkills: ["Dirección de Teatro", "Visión Creativa", "Colaboración Artística", "Gestión de Proyectos", "Presupuestos", "Desarrollo de Guiones", "Compromiso del Público", "Liderazgo de Personal", "Recaudación de Fondos", "Supervisión de Producción"],
    atsKeywords: ["teatro", "dirección artística", "gestión de producción", "liderazgo de equipo creativo", "artes escénicas", "desarrollo de audiencia", "gestión de presupuesto", "proyectos colaborativos", "análisis de guiones", "planificación de eventos", "compromiso de partes interesadas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Director Artístico de Teatro",
      summary: "Director Artístico dinámico con más de 10 años de experiencia en producción y dirección teatral. Aumentó con éxito la asistencia del público en un 150% a través de programación innovadora e iniciativas de compromiso comunitario.",
      skills: ["Dirección de Teatro", "Visión Creativa", "Colaboración Artística", "Gestión de Proyectos", "Presupuestos", "Desarrollo de Guiones", "Compromiso del Público", "Liderazgo de Personal", "Recaudación de Fondos", "Supervisión de Producción"],
      experience: [
        {
          title: "Director Artístico Senior",
          company: "Broadway Innovations",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas de boletos en un 40% a través de campañas de marketing estratégicas.",
            "Dirigí 5 producciones galardonadas que recibieron reconocimiento local y nacional.",
            "Implementé un programa de mentoría que resultó en un aumento del 30% en colaboraciones exitosas de artistas.",
          ],
        },
        {
          title: "Director Artístico",
          company: "City Theatre Company",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Revitalicé la programación estacional, lo que llevó a un aumento del 25% en el compromiso del público.",
            "Coordiné más de 50 presentaciones y eventos especiales, mejorando la participación comunitaria.",
            "Aseguré $100,000 en subvenciones para nuevas iniciativas de producción.",
          ],
        },
      ],
      education: [
        { institution: "Theatre Arts University", degree: "B.F.A.", field: "Dirección de Teatro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Theatre Manager", issuer: "National Theatre Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Director Artístico de Teatro en su currículum?", answer: "Un Director Artístico de Teatro debe incluir su experiencia en dirección, logros en producciones anteriores y habilidades en gestión de equipos." },
      { question: "¿Cómo destacar mi currículum de Director Artístico de Teatro?", answer: "Utiliza un formato claro, destaca logros cuantificables y personaliza tu currículum para cada solicitud." },
      { question: "¿Qué habilidades necesita un Director Artístico de Teatro?", answer: "Las habilidades clave incluyen dirección teatral, gestión de proyectos, liderazgo, y creatividad en la programación." },
    ],
  },
  "asic-design-engineer": {
    slug: "ingeniero-de-diseno-asics",
    title: "Ingeniero de Diseño ASIC",
    keywords: ["currículum de ingeniero de diseño asic", "CV de ingeniero de diseño asic", "ejemplo currículum ingeniero de diseño asic", "plantilla CV ingeniero de diseño asic"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño asic", "ejemplos currículum ingeniero de diseño asic", "mejor formato CV ingeniero de diseño asic"],
    topSkills: ["Verilog", "VHDL", "Diseño de Circuitos Digitales", "Desarrollo FPGA", "Diseño RTL", "Análisis de Tiempos", "Síntesis", "Diseño de Bajo Consumo", "Desarrollo de Testbenches", "Diseño Físico"],
    atsKeywords: ["ASIC", "RTL", "Verilog", "VHDL", "FPGA", "Síntesis", "Análisis de Tiempos", "Diseño Digital", "Bajo Consumo", "Testbench", "Diseño Físico"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño ASIC",
      summary: "Ingeniero de Diseño ASIC con más de 5 años de experiencia en la industria, especializado en diseños de bajo consumo que redujeron el consumo de energía en un 30% mientras mejoraban el rendimiento en un 20%.",
      skills: ["Verilog", "VHDL", "Diseño de Circuitos Digitales", "Desarrollo FPGA", "Diseño RTL", "Análisis de Tiempos", "Síntesis", "Diseño de Bajo Consumo", "Desarrollo de Testbenches", "Diseño Físico"],
      experience: [
        {
          title: "Ingeniero de Diseño ASIC Senior",
          company: "NVIDIA",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que logró una reducción del 30% en el consumo de energía para nuevos diseños de SOC, resultando en ahorros anuales de $1.5 millones.",
            "Diseñé e implementé circuitos digitales que aumentaron la velocidad de procesamiento en un 25% para GPUs de próxima generación.",
            "Mejoré la cobertura de pruebas en un 40% a través del desarrollo de testbenches completos.",
          ],
        },
        {
          title: "Ingeniero de Diseño ASIC",
          company: "Qualcomm",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al diseño de un procesador móvil que mejoró el rendimiento en un 15% mientras mantenía un bajo consumo de energía.",
            "Colaboré con equipos multifuncionales para asegurar que las especificaciones de diseño cumplieran con los requisitos del mercado.",
            "Completé con éxito múltiples proyectos a tiempo, lo que resultó en un aumento del 20% en la eficiencia del equipo.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica y Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Verification Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un ingeniero de diseño ASIC en su currículum?", answer: "Incluir habilidades técnicas como Verilog y VHDL, experiencia relevante y logros en proyectos." },
      { question: "¿Cómo destacar mi currículum de ingeniero de diseño ASIC?", answer: "Enfatizar logros medibles y proyectos significativos, y utilizar palabras clave relacionadas con la industria." },
      { question: "¿Qué habilidades necesita un ingeniero de diseño ASIC?", answer: "Habilidades clave incluyen diseño digital, análisis de tiempos, y experiencia en FPGA." },
    ],
  },
  "assistant-art-director": {
    slug: "asistente-director-arte",
    title: "Asistente de Director de Arte",
    keywords: ["currículum de Asistente de Director de Arte", "CV de Asistente de Director de Arte", "ejemplo currículum Asistente de Director de Arte", "plantilla CV Asistente de Director de Arte"],
    searchIntents: ["cómo escribir currículum de Asistente de Director de Arte", "ejemplos currículum Asistente de Director de Arte", "mejor formato CV Asistente de Director de Arte"],
    topSkills: ["Dirección Creativa", "Diseño Gráfico", "Gestión de Proyectos", "Desarrollo de Marca", "Visión Artística", "Colaboración en Equipo", "Atención al Detalle", "Comunicación Visual", "Ilustración Digital", "Fotografía"],
    atsKeywords: ["dirección de arte", "diseño gráfico", "branding", "equipo creativo", "coordinación de proyectos", "narrativa visual", "medios digitales", "diseño impreso", "desarrollo de conceptos", "presentaciones a clientes", "software de diseño"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Director de Arte",
      summary: "Asistente de Director de Arte creativo con más de 5 años de experiencia en liderar proyectos de diseño y mejorar la visibilidad de la marca. Aumentó con éxito el compromiso del cliente en un 30% a través de estrategias de diseño innovadoras.",
      skills: ["Dirección Creativa", "Diseño Gráfico", "Gestión de Proyectos", "Desarrollo de Marca", "Visión Artística", "Colaboración en Equipo", "Atención al Detalle", "Comunicación Visual", "Ilustración Digital", "Fotografía"],
      experience: [
        {
          title: "Director de Arte Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo de 10 diseñadores para crear una campaña exitosa que aumentó el reconocimiento de la marca en un 40%",
            "Desarrollé plantillas de diseño que redujeron el tiempo de entrega de proyectos en un 25%",
            "Colaboré con marketing para lograr un crecimiento del 15% en la adquisición de clientes",
          ],
        },
        {
          title: "Director de Arte Junior",
          company: "Visionary Media Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en el desarrollo de un video promocional que ganó un premio nacional",
            "Contribuí a proyectos de diseño que aumentaron las calificaciones de satisfacción del cliente en un 20%",
            "Implementé un nuevo proceso de retroalimentación de diseño que mejoró la eficiencia del equipo",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Chicago", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Director de Arte en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Asistente de Director de Arte?", answer: "Utiliza palabras clave, muestra tu creatividad en el diseño y destaca logros cuantificables." },
      { question: "¿Qué habilidades necesita un Asistente de Director de Arte?", answer: "Creatividad, habilidades de diseño, gestión de proyectos y capacidad de colaboración son esenciales." },
    ],
  },
  "assistant-editor": {
    slug: "asistente-editor",
    title: "Asistente de Edición",
    keywords: ["currículum de Asistente de Edición", "CV de Asistente de Edición", "ejemplo currículum Asistente de Edición", "plantilla CV Asistente de Edición"],
    searchIntents: ["cómo escribir currículum de Asistente de Edición", "ejemplos currículum Asistente de Edición", "mejor formato CV Asistente de Edición"],
    topSkills: ["Edición de texto", "Gestión de contenido", "Revisión de textos", "Habilidades de investigación", "Comunicación", "Gestión de proyectos", "Atención al detalle", "Gestión del tiempo", "Redacción técnica", "Conocimiento de SEO"],
    atsKeywords: ["edición", "creación de contenido", "publicación", "colaboración en equipo", "gestión de plazos", "guías de estilo", "verificación de hechos", "redacción creativa", "publicación digital", "relaciones con los medios", "dominio de la gramática"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Edición",
      summary: "Asistente de Edición dedicado con más de 5 años de experiencia en la industria editorial, gestionando con éxito flujos de trabajo editoriales que aumentaron la eficiencia de publicación en un 30%. Historial comprobado en la mejora de la calidad y precisión del contenido.",
      skills: ["Edición de texto", "Gestión de contenido", "Revisión de textos", "Habilidades de investigación", "Comunicación", "Gestión de proyectos", "Atención al detalle", "Gestión del tiempo", "Redacción técnica", "Conocimiento de SEO"],
      experience: [
        {
          title: "Editor Asistente Senior",
          company: "Penguin Random House",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el tiempo de entrega de manuscritos en un 25% a través de una gestión de proyectos efectiva y una comunicación optimizada.",
            "Editó y publicó más de 50 artículos, aumentando el compromiso de la audiencia en un 40% en plataformas digitales.",
            "Colaboró con autores para refinar el contenido, resultando en un aumento del 15% en reseñas positivas.",
          ],
        },
        {
          title: "Asistente de Edición",
          company: "HarperCollins",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistió en la edición de más de 30 libros, contribuyendo a un aumento en ventas de $200,000 en un año.",
            "Realizó investigaciones exhaustivas para artículos, asegurando precisión fáctica y cumplimiento de las guías de estilo.",
            "Desarrolló y mantuvo calendarios editoriales, mejorando la eficiencia del flujo de trabajo del equipo en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Literatura Inglesa", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Editing and Proofreading Certificate", issuer: "The Editorial Freelancers Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Edición en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas y ejemplos de logros en el campo editorial." },
      { question: "¿Cómo destacar mi currículum de Asistente de Edición?", answer: "Utilizar palabras clave relevantes, resaltar logros cuantificables y personalizar el currículum para cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Asistente de Edición?", answer: "Habilidades en edición, gestión de contenido, atención al detalle, y excelentes capacidades de comunicación." },
    ],
  },
  "assistant-fashion-designer": {
    slug: "asistente-diseñador-de-moda",
    title: "Asistente Diseñador de Moda",
    keywords: ["currículum de asistente diseñador de moda", "CV de asistente diseñador de moda", "ejemplo currículum asistente diseñador de moda", "plantilla CV asistente diseñador de moda"],
    searchIntents: ["cómo escribir currículum de asistente diseñador de moda", "ejemplos currículum asistente diseñador de moda", "mejor formato CV asistente diseñador de moda"],
    topSkills: ["Ilustración de Moda", "Conocimiento Textil", "Creación de Patrones", "Técnicas de Costura", "Adobe Illustrator", "Investigación de Tendencias", "Construcción de Prendas", "Software CAD de Moda", "Teoría del Color", "Gestión de Proyectos"],
    atsKeywords: ["Diseño de Moda", "Diseño Técnico", "Tendencias de Moda", "Desarrollo Creativo", "Guías de Estilo", "Producción de Muestras", "Colaboración", "Dibujo", "Merchandising Visual", "Marketing de Moda", "Relaciones con Clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Diseñador de Moda",
      summary: "Asistente Creativo de Diseño de Moda con más de 5 años de experiencia en producción de prendas y análisis de tendencias. Contribuyó exitosamente a colecciones que aumentaron las ventas en un 30% año tras año.",
      skills: ["Ilustración de Moda", "Conocimiento Textil", "Creación de Patrones", "Técnicas de Costura", "Adobe Illustrator", "Investigación de Tendencias", "Construcción de Prendas", "Software CAD de Moda", "Teoría del Color", "Gestión de Proyectos"],
      experience: [
        {
          title: "Asistente de Moda Senior",
          company: "Fashion House Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en el diseño y producción de una colección de primavera que generó $500,000 en ingresos.",
            "Optimicé el proceso de creación de patrones, reduciendo el tiempo de producción en un 20%.",
            "Colaboré con el equipo de marketing para aumentar la visibilidad de la marca, lo que llevó a un crecimiento del 15% en el compromiso en redes sociales.",
          ],
        },
        {
          title: "Diseñador de Moda Junior",
          company: "Chic Styles Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al diseño de una línea estacional que fue destacada en importantes revistas de moda.",
            "Participé en pruebas y ajustes para desfiles, asegurando que las prendas cumplieran con altos estándares de calidad.",
            "Asistí en la búsqueda de materiales sostenibles, lo que llevó a una reducción del 10% en costos.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Diseño de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Fashion Design Certification", issuer: "American Association of Fashion Designers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente Diseñador de Moda en su currículum?", answer: "Incluya su experiencia relevante, habilidades técnicas y ejemplos de su trabajo." },
      { question: "¿Cómo destacar mi currículum de Asistente Diseñador de Moda?", answer: "Asegúrese de resaltar sus logros y utilizar un diseño atractivo y profesional." },
      { question: "¿Qué habilidades necesita un Asistente Diseñador de Moda?", answer: "Se requieren habilidades en ilustración, creación de patrones, y conocimiento de tendencias de moda." },
    ],
  },
  "audio-producer": {
    slug: "productor-de-audio",
    title: "Productor de Audio",
    keywords: ["currículum de productor de audio", "CV de productor de audio", "ejemplo currículum productor de audio", "plantilla CV productor de audio"],
    searchIntents: ["cómo escribir currículum de productor de audio", "ejemplos currículum productor de audio", "mejor formato CV productor de audio"],
    topSkills: ["Edición de Audio", "Diseño de Sonido", "Mezcla", "Masterización", "Producción Musical", "Gestión de Proyectos", "Colaboración", "Creatividad", "Dominio Técnico", "Comunicación"],
    atsKeywords: ["producción de audio", "ingeniería de sonido", "edición musical", "grabación", "postproducción", "sonido en vivo", "mezcla de audio", "bandas sonoras", "grabación en estudio", "voz en off", "software de audio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor de Audio",
      summary: "Productor de Audio con más de 5 años de experiencia en diseño de sonido y producción musical. Ha producido con éxito más de 100 pistas, resultando en un aumento del 30% en el compromiso del público.",
      skills: ["Edición de Audio", "Diseño de Sonido", "Mezcla", "Masterización", "Producción Musical", "Gestión de Proyectos", "Colaboración", "Creatividad", "Dominio Técnico", "Comunicación"],
      experience: [
        {
          title: "Productor de Audio Senior",
          company: "SoundWave Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Produje más de 50 pistas, lo que llevó a un aumento del 25% en las calificaciones de satisfacción del cliente.",
            "Gestioné un equipo de 5 ingenieros de audio para proyectos de alto perfil, mejorando el tiempo de entrega del proyecto en un 15%.",
            "Implementé nuevas técnicas de procesamiento de audio que redujeron los costos de producción en $20,000 anuales.",
          ],
        },
        {
          title: "Productor de Audio Junior",
          company: "Echo Productions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a más de 30 proyectos musicales, recibiendo comentarios positivos de los clientes.",
            "Asistí en el desarrollo de bandas sonoras para más de 10 videojuegos.",
            "Optimicé los procesos de edición de audio, reduciendo el tiempo de entrega en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "Berklee College of Music", degree: "B.S.", field: "Producción y Ingeniería Musical", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Audio Engineer", issuer: "Audio Engineering Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Audio Producer en su currículum?", answer: "Un Audio Producer debe incluir experiencia en producción musical, habilidades técnicas en software de audio y ejemplos de proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Audio Producer?", answer: "Para destacar tu currículum, enfócate en logros cuantificables y muestra tu experiencia en proyectos reconocidos." },
      { question: "¿Qué habilidades necesita un Audio Producer?", answer: "Un Audio Producer necesita habilidades en edición de audio, diseño de sonido, mezcla, y capacidad de gestión de proyectos." },
    ],
  },
  "choreographer": {
    slug: "curriculum-choreografo",
    title: "Choreógrafo",
    keywords: ["currículum de choreógrafo", "CV de choreógrafo", "ejemplo currículum choreógrafo", "plantilla CV choreógrafo"],
    searchIntents: ["cómo escribir currículum de choreógrafo", "ejemplos currículum choreógrafo", "mejor formato CV choreógrafo"],
    topSkills: ["coreografía de danza", "dirección de actuación", "notación de danza", "audiciones", "diseño escénico", "colaboración", "expresión creativa", "liderazgo", "gestión de proyectos", "educación en danza"],
    atsKeywords: ["coreografía", "danza", "actuación", "dirección creativa", "visión artística", "liderazgo de equipo", "procesos de audición", "producción de espectáculos", "teatro", "gestión de artistas", "estilos de danza"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Choreógrafo",
      summary: "Choreógrafo experimentado con más de 7 años en la industria, conocido por crear piezas de danza innovadoras que aumentaron la participación del público en un 30%. Altamente capacitado en la colaboración con equipos diversos para producir actuaciones galardonadas.",
      skills: ["coreografía de danza", "dirección de actuación", "notación de danza", "audiciones", "diseño escénico", "colaboración", "expresión creativa", "liderazgo", "gestión de proyectos", "educación en danza"],
      experience: [
        {
          title: "Choreógrafo Senior",
          company: "Broadway Dance Co.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé y dirigí 5 producciones importantes, aumentando las ventas de boletos en un 25%",
            "Mentoré a 10 coreógrafos aspirantes, llevando a 3 a asegurar posiciones profesionales",
            "Implementé nuevas técnicas de ensayo que redujeron el tiempo de preparación en un 15%",
          ],
        },
        {
          title: "Choreógrafo",
          company: "Dance Nation",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coreografié piezas galardonadas para competencias nacionales",
            "Colaboré con directores renombrados para mejorar la calidad de las actuaciones",
            "Aumenté la participación de estudiantes en programas de danza en un 40%",
          ],
        },
      ],
      education: [
        { institution: "University of the Arts", degree: "Licenciatura", field: "Coreografía de Danza", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Dance Instructor", issuer: "Dance Education Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Choreógrafo en su currículum?", answer: "Un Choreógrafo debe incluir sus experiencias de trabajo, logros en producciones, habilidades técnicas y formación académica." },
      { question: "¿Cómo destacar mi currículum de Choreógrafo?", answer: "Para destacar, asegúrate de resaltar tus logros más relevantes y utilizar palabras clave específicas de la industria." },
      { question: "¿Qué habilidades necesita un Choreógrafo?", answer: "Un Choreógrafo necesita habilidades en coreografía, dirección, colaboración, gestión de proyectos y comunicación efectiva." },
    ],
  },
  "circuit-design-engineer": {
    slug: "ingeniero-de-diseno-de-circuitos",
    title: "Ingeniero de Diseño de Circuitos",
    keywords: ["currículum de ingeniero de diseño de circuitos", "CV de ingeniero de diseño de circuitos", "ejemplo currículum ingeniero de diseño de circuitos", "plantilla CV ingeniero de diseño de circuitos"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de circuitos", "ejemplos currículum ingeniero de diseño de circuitos", "mejor formato CV ingeniero de diseño de circuitos"],
    topSkills: ["Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Diseño de PCB", "Integridad de Señal", "Desarrollo de FPGA", "Software de Simulación", "Sistemas Embebidos", "Pruebas y Validación", "Electrónica de Potencia", "Protocolos de Comunicación"],
    atsKeywords: ["diseño de circuitos", "diseño de PCB", "herramientas de simulación", "sistemas embebidos", "VHDL", "Verilog", "DSP", "electrónica analógica", "electrónica digital", "pruebas electrónicas", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Circuitos",
      summary: "Ingeniero de Diseño de Circuitos con más de 5 años de experiencia en el desarrollo de soluciones electrónicas innovadoras. Lideré proyectos que redujeron los costos de fabricación en un 20% mientras mejoraba la fiabilidad del producto.",
      skills: ["Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Diseño de PCB", "Integridad de Señal", "Desarrollo de FPGA", "Software de Simulación", "Sistemas Embebidos", "Pruebas y Validación", "Electrónica de Potencia", "Protocolos de Comunicación"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Circuitos",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje el tiempo de diseño de circuitos en un 30% mediante la optimización de procesos.",
            "Lideré un equipo que lanzó con éxito una nueva línea de productos, generando $2M en ingresos en el primer año.",
            "Mejoré las tasas de rendimiento del producto en un 15% a través de protocolos de prueba mejorados.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Circuitos",
          company: "Analog Devices",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un circuito de alta frecuencia que aumentó la eficiencia del procesamiento de señales en un 25%.",
            "Colaboré en un proyecto que ganó el premio a la 'Mejor Innovación' en la conferencia de la industria.",
            "Agilicé el proceso de revisión de diseño, reduciendo los tiempos de aprobación en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Electrónica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Electronics Technician", issuer: "National Institute for Certification in Engineering Technologies", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Circuitos en su currículum?", answer: "Incluya sus habilidades técnicas, experiencia laboral relevante y logros destacados en proyectos." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Circuitos?", answer: "Resalte sus logros cuantificables y utilice palabras clave relevantes para la industria." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Circuitos?", answer: "Se requieren habilidades en diseño analógico y digital, PCB, pruebas y desarrollo de FPGA." },
    ],
  },
  "component-design-engineer": {
    slug: "ingeniero-de-diseno-de-componentes",
    title: "Ingeniero de Diseño de Componentes",
    keywords: ["currículum de ingeniero de diseño de componentes", "CV de ingeniero de diseño de componentes", "ejemplo currículum ingeniero de diseño de componentes", "plantilla CV ingeniero de diseño de componentes"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de componentes", "ejemplos currículum ingeniero de diseño de componentes", "mejor formato CV ingeniero de diseño de componentes"],
    topSkills: ["Software CAD", "Modelado 3D", "Prototipado", "Selección de Materiales", "Análisis de Elementos Finitos (FEA)", "Análisis de Tolerancias", "Diseño para Manufacturabilidad (DFM)", "Diseño de Componentes Eléctricos", "Gestión Térmica", "Gestión de Proyectos"],
    atsKeywords: ["diseño de componentes", "ingeniería mecánica", "desarrollo de productos", "especificaciones de diseño", "análisis de ingeniería", "prototipado", "documentación técnica", "colaboración en equipo", "sostenibilidad", "aseguramiento de calidad", "validación de diseño"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Componentes",
      summary: "Ingeniero de Diseño de Componentes con más de 5 años de experiencia en la industria, especializado en innovación de productos y mejoras de eficiencia, lo que llevó a una reducción del 30% en el tiempo de desarrollo de proyectos clave.",
      skills: ["Software CAD", "Modelado 3D", "Prototipado", "Selección de Materiales", "Análisis de Elementos Finitos (FEA)", "Análisis de Tolerancias", "Diseño para Manufacturabilidad (DFM)", "Diseño de Componentes Eléctricos", "Gestión Térmica", "Gestión de Proyectos"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Componentes",
          company: "Tech Innovations Ltd.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que logró un aumento del 25% en los métricas de rendimiento del producto.",
            "Diseñé un nuevo componente que redujo los costos de fabricación en $50,000 anuales.",
            "Desarrollé e implementé un nuevo protocolo de diseño que disminuyó el tiempo de lanzamiento al mercado en un 15%.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Componentes",
          company: "Advanced Engineering Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al diseño de un componente patentado que mejoró la eficiencia del producto en un 20%.",
            "Realicé más de 50 pruebas de simulación para validar conceptos de diseño.",
            "Colaboré con equipos interdisciplinarios para optimizar el proceso de diseño.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified SolidWorks Professional", issuer: "Dassault Systèmes", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Componentes en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia laboral relevante y logros específicos en proyectos." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Componentes?", answer: "Enfatiza tus logros medibles y habilidades técnicas clave, y utiliza palabras clave relevantes." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Componentes?", answer: "Habilidades clave incluyen diseño CAD, análisis de elementos finitos, y gestión de proyectos." },
    ],
  },
  "copywriter-kickresume": {
    slug: "copywriter-kickresume",
    title: "Copywriter Kickresume",
    keywords: ["currículum de Copywriter", "CV de Copywriter", "ejemplo currículum Copywriter", "plantilla CV Copywriter"],
    searchIntents: ["cómo escribir currículum de Copywriter", "ejemplos currículum Copywriter", "mejor formato CV Copywriter"],
    topSkills: ["Redacción SEO", "Estrategia de Contenidos", "Marketing en Redes Sociales", "Escritura Creativa", "Edición", "Desarrollo de Marca", "Edición de Copia", "Investigación de Mercado", "Email Marketing", "Corrección de Estilo"],
    atsKeywords: ["redacción publicitaria", "marketing de contenidos", "marketing digital", "SEO", "branding", "publicidad", "escritura creativa", "redes sociales", "editorial", "corrección de estilo", "creación de contenido"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Copywriter Kickresume",
      summary: "Redactor dinámico con más de 5 años de experiencia en la creación de contenido atractivo para diversas plataformas digitales, logrando un aumento del 30% en el compromiso de las campañas de los clientes.",
      skills: ["Redacción SEO", "Estrategia de Contenidos", "Marketing en Redes Sociales", "Escritura Creativa", "Edición", "Desarrollo de Marca", "Edición de Copia", "Investigación de Mercado", "Email Marketing", "Corrección de Estilo"],
      experience: [
        {
          title: "Redactor Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el tráfico del sitio web del cliente en un 50% a través de estrategias de contenido dirigidas.",
            "Desarrollé una exitosa campaña de correo electrónico que generó $20,000 en ingresos.",
            "Lideré un equipo de 4 redactores para producir contenido de alta calidad bajo plazos ajustados.",
          ],
        },
        {
          title: "Copywriter",
          company: "Marketing Masters Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé copias atractivas para más de 100 anuncios digitales, lo que resultó en un aumento del 15% en la tasa de clics.",
            "Colaboré con el equipo de diseño para renovar el blog de la empresa, mejorando la retención de usuarios en un 25%.",
            "Realicé investigaciones de mercado que informaron el desarrollo de contenido y aumentaron la satisfacción del cliente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Comunicación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Content Marketer", issuer: "Digital Marketing Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Copywriter Kickresume en su currículum?", answer: "Debe incluir su experiencia en redacción, habilidades en marketing digital y ejemplos de trabajos previos." },
      { question: "¿Cómo destacar mi currículum de Copywriter Kickresume?", answer: "Utiliza un formato claro, resalta tus logros y adapta el contenido a la industria a la que aplicas." },
      { question: "¿Qué habilidades necesita un Copywriter Kickresume?", answer: "Debe tener habilidades en redacción creativa, SEO, y marketing digital, entre otras." },
    ],
  },
  "cpu-design-engineer": {
    slug: "ingeniero-de-diseno-de-cpu",
    title: "Ingeniero de Diseño de CPU",
    keywords: ["currículum de ingeniero de diseño de cpu", "CV de ingeniero de diseño de cpu", "ejemplo currículum ingeniero de diseño de cpu", "plantilla CV ingeniero de diseño de cpu"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de cpu", "ejemplos currículum ingeniero de diseño de cpu", "mejor formato CV ingeniero de diseño de cpu"],
    topSkills: ["Diseño de Circuitos Digitales", "VHDL/Verilog", "Desarrollo de FPGA", "Diseño de Sistema en Chip (SoC)", "Optimización de Rendimiento", "Gestión de Energía", "Lenguajes de Descripción de Hardware", "Pruebas y Validación", "Procesamiento de Señales", "Documentación Técnica"],
    atsKeywords: ["Arquitectura de CPU", "Diseño de Microprocesadores", "Diseño RTL", "Síntesis", "Simulación", "Análisis de Tiempos", "Verificación de Hardware", "Depuración", "Sistemas Embebidos", "Herramientas CAD", "Metodologías de Diseño"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de CPU",
      summary: "Ingeniero de Diseño de CPU dinámico con más de 5 años de experiencia en diseño y optimización de microprocesadores. Mejoró con éxito el rendimiento de la CPU en un 30% a través de soluciones de diseño innovadoras y pruebas rigurosas.",
      skills: ["Diseño de Circuitos Digitales", "VHDL/Verilog", "Desarrollo de FPGA", "Diseño de Sistema en Chip (SoC)", "Optimización de Rendimiento", "Gestión de Energía", "Lenguajes de Descripción de Hardware", "Pruebas y Validación", "Procesamiento de Señales", "Documentación Técnica"],
      experience: [
        {
          title: "Ingeniero de Diseño de CPU Sénior",
          company: "Intel Corporation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que resultó en una reducción del 25% en el consumo de energía, ahorrando a la empresa $2 millones anuales.",
            "Desarrollé una nueva característica microarquitectónica que mejoró la velocidad de procesamiento en un 15%.",
            "Implementé un marco de pruebas automatizado que redujo el tiempo de validación en un 40%.",
          ],
        },
        {
          title: "Ingeniero de Diseño de CPU",
          company: "AMD",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al diseño de una CPU de alto rendimiento que logró puntajes récord en benchmarks.",
            "Colaboré con equipos multifuncionales para mejorar la fiabilidad del producto, resultando en una disminución del 20% en fallas en campo.",
            "Participé en la migración de sistemas heredados a nuevas arquitecturas, mejorando la eficiencia general.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Eléctrica y Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hardware Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de CPU en su currículum?", answer: "Un Ingeniero de Diseño de CPU debe incluir su experiencia en diseño de circuitos, habilidades en lenguajes de descripción de hardware y proyectos destacados en su currículum." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de CPU?", answer: "Para destacar, enfócate en tus logros cuantificables, usa palabras clave relevantes y asegúrate de que tu formato sea limpio y profesional." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de CPU?", answer: "Las habilidades clave incluyen diseño de circuitos digitales, conocimiento de VHDL/Verilog, experiencia en FPGA y optimización de rendimiento." },
    ],
  },
  "creative-copywriter": {
    slug: "copywriter-creativo",
    title: "Copywriter Creativo",
    keywords: ["currículum de copywriter creativo", "CV de copywriter creativo", "ejemplo currículum copywriter creativo", "plantilla CV copywriter creativo"],
    searchIntents: ["cómo escribir currículum de copywriter creativo", "ejemplos currículum copywriter creativo", "mejor formato CV copywriter creativo"],
    topSkills: ["Estrategia de Contenidos", "Escritura SEO", "Desarrollo de Voz de Marca", "Conceptualización Creativa", "Edición de Copia", "Contenido para Redes Sociales", "Desarrollo de Campañas", "Investigación de Mercado", "Marketing por Email", "Gestión de Proyectos"],
    atsKeywords: ["copywriting", "creación de contenido", "SEO", "marketing digital", "mensaje de marca", "publicidad", "escritura creativa", "editorial", "gestión de clientes", "colaboración", "estrategia de campaña"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Copywriter Creativo",
      summary: "Copywriter Creativo con más de 5 años de experiencia en la entrega de contenido de alto impacto en diversas plataformas. Aumentó con éxito las tasas de compromiso en un 30% para múltiples marcas a través de estrategias de copia dirigidas.",
      skills: ["Estrategia de Contenidos", "Escritura SEO", "Desarrollo de Voz de Marca", "Conceptualización Creativa", "Edición de Copia", "Contenido para Redes Sociales", "Desarrollo de Campañas", "Investigación de Mercado", "Marketing por Email", "Gestión de Proyectos"],
      experience: [
        {
          title: "Copywriter Senior",
          company: "Ogilvy",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el compromiso del cliente en un 40% a través de estrategias de campaña innovadoras.",
            "Lideré un proyecto que generó $200,000 en ingresos de un solo lanzamiento de producto.",
            "Desarrollé una estrategia de contenido integral que mejoró el conocimiento de marca en un 25%.",
          ],
        },
        {
          title: "Copywriter",
          company: "BBDO",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Redacté textos atractivos para más de 10 campañas publicitarias nacionales, impulsando un aumento del 15% en ventas.",
            "Colaboré con diseñadores para producir materiales de marketing de alta calidad, resultando en un aumento del 20% en el compromiso del cliente.",
            "Premiado como 'Mejor Copia' en los Premios de Publicidad 2020 por excelencia creativa.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Literatura Inglesa", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Content Marketer", issuer: "Content Marketing Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Copywriter Creativo en su currículum?", answer: "Incluya ejemplos de su trabajo, habilidades relevantes y resultados medibles de sus campañas." },
      { question: "¿Cómo destacar mi currículum de Copywriter Creativo?", answer: "Utilice palabras clave relevantes, muestre su impacto en resultados y personalice su currículum para cada solicitud." },
      { question: "¿Qué habilidades necesita un Copywriter Creativo?", answer: "Necesita habilidades en redacción, estrategia de contenido, SEO, y capacidad para trabajar en equipo." },
    ],
  },
  "creative-designer": {
    slug: "diseñador-creativo",
    title: "Diseñador Creativo",
    keywords: ["currículum de diseñador creativo", "CV de diseñador creativo", "ejemplo currículum diseñador creativo", "plantilla CV diseñador creativo"],
    searchIntents: ["cómo escribir currículum de diseñador creativo", "ejemplos currículum diseñador creativo", "mejor formato CV diseñador creativo"],
    topSkills: ["Adobe Creative Suite", "Diseño UI/UX", "Diseño Gráfico", "Desarrollo de Marca", "Tipografía", "Ilustración", "Diseño Web", "Teoría del Color", "Diseño Impreso", "Gráficos en Movimiento"],
    atsKeywords: ["diseño", "creativo", "Adobe", "branding", "UX", "UI", "gráfico", "portafolio", "ilustración", "digital", "desarrollo de concepto"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador Creativo",
      summary: "Diseñador Creativo con más de 5 años de experiencia en la creación de diseños visualmente atractivos y en la mejora de experiencias de usuario, aumentando con éxito el compromiso del cliente en un 30%.",
      skills: ["Adobe Creative Suite", "Diseño UI/UX", "Diseño Gráfico", "Desarrollo de Marca", "Tipografía", "Ilustración", "Diseño Web", "Teoría del Color", "Diseño Impreso", "Gráficos en Movimiento"],
      experience: [
        {
          title: "Diseñador Creativo Senior",
          company: "Design Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un proyecto de rediseño que aumentó el tráfico del sitio web en un 40%",
            "Desarrollé materiales de marca que contribuyeron a un aumento del 25% en la retención de clientes",
            "Colaboré con equipos interdisciplinarios para mejorar la usabilidad del producto, resultando en una reducción del 15% en errores de usuario",
          ],
        },
        {
          title: "Diseñador Gráfico Junior",
          company: "Creative Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé material de marketing que aumentó las ventas en un 20%",
            "Diseñé una campaña en redes sociales que alcanzó a más de 100,000 usuarios",
            "Asistí en el lanzamiento de una nueva línea de productos, llevando a una entrada exitosa al mercado",
          ],
        },
      ],
      education: [
        { institution: "Art University", degree: "Licenciatura", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador Creativo en su currículum?", answer: "Un Diseñador Creativo debe incluir su experiencia laboral, habilidades relevantes, proyectos destacados y su portafolio." },
      { question: "¿Cómo destacar mi currículum de Diseñador Creativo?", answer: "Utiliza un diseño limpio y profesional, resalta tus logros con métricas y adapta tu currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Diseñador Creativo?", answer: "Un Diseñador Creativo necesita habilidades en software de diseño, creatividad, capacidad de trabajo en equipo y una comprensión sólida de las tendencias de diseño." },
    ],
  },
  "creative-director": {
    slug: "director-creativo",
    title: "Director Creativo",
    keywords: ["currículum de Director Creativo", "CV de Director Creativo", "ejemplo currículum Director Creativo", "plantilla CV Director Creativo"],
    searchIntents: ["cómo escribir currículum de Director Creativo", "ejemplos currículum Director Creativo", "mejor formato CV Director Creativo"],
    topSkills: ["Estrategia Creativa", "Desarrollo de Marca", "Comunicación Visual", "Liderazgo de Equipo", "Gestión de Proyectos", "Creación de Contenido", "Investigación de Mercado", "Marketing Digital", "Relaciones con Clientes", "Dirección de Arte"],
    atsKeywords: ["creativo", "diseño", "branding", "publicidad", "estrategia", "liderazgo", "comunicación", "colaboración", "innovación", "gestión de proyectos", "marketing"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Director Creativo",
      summary: "Director Creativo con más de 8 años de experiencia en liderar proyectos innovadores y impulsar el éxito de la marca, resultando en un aumento del 30% en la participación de los clientes.",
      skills: ["Estrategia Creativa", "Desarrollo de Marca", "Comunicación Visual", "Liderazgo de Equipo", "Gestión de Proyectos", "Creación de Contenido", "Investigación de Mercado", "Marketing Digital", "Relaciones con Clientes", "Dirección de Arte"],
      experience: [
        {
          title: "Director Creativo Senior",
          company: "Ogilvy & Mather",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto de rebranding que aumentó la visibilidad de la marca en un 40%",
            "Gestioné un equipo creativo de 15 personas, lanzando con éxito más de 50 campañas en 2 años",
            "Desarrollé una campaña publicitaria ganadora de premios que incrementó las ventas en $1.5 millones",
          ],
        },
        {
          title: "Líder Creativo",
          company: "BBDO",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé una nueva estrategia de diseño que mejoró la retención de clientes en un 25%",
            "Colaboré con equipos multifuncionales para ofrecer soluciones de marketing de alto impacto",
            "Ganamos el premio Silver ADDY 2020 por la Mejor Campaña Integrada",
          ],
        },
      ],
      education: [
        { institution: "Rhode Island School of Design", degree: "B.F.A.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Creative Director", issuer: "Creative Guild", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Director Creativo en su currículum?", answer: "Un Director Creativo debe incluir su experiencia en gestión de proyectos, habilidades creativas, logros en campañas anteriores y ejemplos de liderazgo de equipo." },
      { question: "¿Cómo destacar mi currículum de Director Creativo?", answer: "Para destacar su currículum, enfóquese en sus logros cuantificables, use palabras clave relevantes y presente un portafolio de trabajos anteriores." },
      { question: "¿Qué habilidades necesita un Director Creativo?", answer: "Las habilidades clave incluyen estrategia creativa, liderazgo, comunicación visual efectiva, y experiencia en gestión de campañas publicitarias." },
    ],
  },
  "creative-director-at-cassette-monkeys-resume": {
    slug: "director-creativo",
    title: "Director Creativo",
    keywords: ["currículum de Director Creativo", "CV de Director Creativo", "ejemplo currículum Director Creativo", "plantilla CV Director Creativo"],
    searchIntents: ["cómo escribir currículum de Director Creativo", "ejemplos currículum Director Creativo", "mejor formato CV Director Creativo"],
    topSkills: ["Liderazgo", "Estrategia Creativa", "Desarrollo de Marca", "Colaboración en Equipo", "Marketing Digital", "Gestión de Proyectos", "Comunicación Visual", "Diseño de Experiencia del Usuario", "Creación de Contenido", "Investigación de Mercado"],
    atsKeywords: ["Dirección Creativa", "Gestión de Marca", "Pensamiento de Diseño", "Campañas Publicitarias", "Equipos Multifuncionales", "Relaciones con Clientes", "Desarrollo de Conceptos", "Desarrollo Creativo", "Estrategia en Redes Sociales", "Métricas de Rendimiento", "Análisis de Tendencias"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Director Creativo",
      summary: "Director Creativo con más de 8 años de experiencia en liderar campañas de marketing innovadoras y estrategias de marca. Aumentó exitosamente el compromiso de la marca en un 35% a través de iniciativas digitales específicas.",
      skills: ["Liderazgo", "Estrategia Creativa", "Desarrollo de Marca", "Colaboración en Equipo", "Marketing Digital", "Gestión de Proyectos", "Comunicación Visual", "Diseño de Experiencia del Usuario", "Creación de Contenido", "Investigación de Mercado"],
      experience: [
        {
          title: "Director Creativo",
          company: "Cassette Monkeys",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el ROI de la campaña en un 40% a través de estrategias de marketing integradas.",
            "Lideré un equipo de 15 diseñadores y mercadólogos, mejorando el tiempo de entrega de proyectos en un 25%.",
            "Desarrollé un refresco de marca que resultó en un aumento del 50% en el compromiso en redes sociales.",
          ],
        },
        {
          title: "Director de Arte",
          company: "Creative Solutions Agency",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné más de 30 campañas publicitarias exitosas con una tasa de compromiso promedio del 20%.",
            "Colaboré con equipos multifuncionales para lanzar una nueva línea de productos, logrando $1M en ventas dentro del primer año.",
            "Mejoré los puntajes de satisfacción del cliente en un 30% a través de una comunicación efectiva y gestión de proyectos.",
          ],
        },
      ],
      education: [
        { institution: "University of Arts", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Creative Director", issuer: "Creative Professionals Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Director Creativo en su currículum?", answer: "Debería incluir experiencia relevante, habilidades creativas, y logros en campañas anteriores." },
      { question: "¿Cómo destacar mi currículum de Director Creativo?", answer: "Utilice ejemplos específicos de logros y resalte habilidades clave en el sector." },
      { question: "¿Qué habilidades necesita un Director Creativo?", answer: "Habilidades clave incluyen liderazgo, creatividad, y experiencia en marketing digital." },
    ],
  },
  "creative-photographer": {
    slug: "fotografo-creativo",
    title: "Fotógrafo Creativo",
    keywords: ["currículum de Fotógrafo Creativo", "CV de Fotógrafo Creativo", "ejemplo currículum Fotógrafo Creativo", "plantilla CV Fotógrafo Creativo"],
    searchIntents: ["cómo escribir currículum de Fotógrafo Creativo", "ejemplos currículum Fotógrafo Creativo", "mejor formato CV Fotógrafo Creativo"],
    topSkills: ["Fotografía", "Edición de Fotos", "Técnicas de Iluminación", "Composición", "Imágenes Digitales", "Marketing en Redes Sociales", "Dirección Creativa", "Gestión de Relaciones con Clientes", "Narración de Historias", "Gestión de Proyectos"],
    atsKeywords: ["fotografía", "Adobe Photoshop", "Adobe Lightroom", "desarrollo de portafolios", "branding", "narración visual", "fotografía comercial", "fotografía de eventos", "retoque fotográfico", "fotografía digital", "consultas con clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Fotógrafo Creativo",
      summary: "Fotógrafo Creativo con más de 5 años de experiencia en la entrega de imágenes de alta calidad para diversos clientes. Aumentó con éxito la satisfacción del cliente en un 30% a través de técnicas innovadoras de fotografía y un servicio excepcional.",
      skills: ["Fotografía", "Edición de Fotos", "Técnicas de Iluminación", "Composición", "Imágenes Digitales", "Marketing en Redes Sociales", "Dirección Creativa", "Gestión de Relaciones con Clientes", "Narración de Historias", "Gestión de Proyectos"],
      experience: [
        {
          title: "Fotógrafo Senior",
          company: "Snap Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las reservas de clientes en un 40% a través de campañas de marketing dirigidas.",
            "Capturé más de 500 eventos, resultando en una tasa de retroalimentación positiva del 95%.",
            "Desarrollé un estilo fotográfico único que ganó más de 1,000 seguidores en redes sociales.",
          ],
        },
        {
          title: "Fotógrafo",
          company: "Shutterfly Studios",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Produje imágenes de alta calidad para más de 200 proyectos comerciales.",
            "Colaboré con un equipo para crear una exitosa campaña publicitaria que aumentó la conciencia de marca en un 25%.",
            "Logré una tasa de retención de clientes del 90% a través de una excelente comunicación y servicio.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Chicago", degree: "B.S.", field: "Fotografía", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Professional Photographer Certification", issuer: "Professional Photographers of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Fotógrafo Creativo en su currículum?", answer: "Un Fotógrafo Creativo debe incluir ejemplos de su trabajo, habilidades técnicas y experiencia relevante." },
      { question: "¿Cómo destacar mi currículum de Fotógrafo Creativo?", answer: "Utiliza un diseño atractivo, incluye un portafolio en línea y resalta tus logros más significativos." },
      { question: "¿Qué habilidades necesita un Fotógrafo Creativo?", answer: "Las habilidades clave incluyen creatividad, atención al detalle, manejo de equipo fotográfico y habilidades de edición." },
    ],
  },
  "credit-authorizer": {
    slug: "autorizador-de-credito",
    title: "Autorizador de Crédito",
    keywords: ["currículum de autorizador de crédito", "CV de autorizador de crédito", "ejemplo currículum autorizador de crédito", "plantilla CV autorizador de crédito"],
    searchIntents: ["cómo escribir currículum de autorizador de crédito", "ejemplos currículum autorizador de crédito", "mejor formato CV autorizador de crédito"],
    topSkills: ["Evaluación de Riesgos", "Análisis de Créditos", "Toma de Decisiones", "Servicio al Cliente", "Ingreso de Datos", "Informes Financieros", "Cumplimiento Regulatorio", "Atención al Detalle", "Habilidades Analíticas", "Habilidades de Comunicación"],
    atsKeywords: ["evaluación de crédito", "procesamiento de préstamos", "análisis financiero", "gestión de riesgos", "informes de crédito", "autoridad de decisión", "relaciones con clientes", "documentación financiera", "puntaje de crédito", "estándares de cumplimiento", "análisis de datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Autorizador de Crédito",
      summary: "Autorizador de Crédito dedicado con más de 5 años de experiencia en la evaluación y autorización de solicitudes de crédito, logrando una reducción del 30% en los errores de procesamiento durante mi gestión.",
      skills: ["Evaluación de Riesgos", "Análisis de Créditos", "Toma de Decisiones", "Servicio al Cliente", "Ingreso de Datos", "Informes Financieros", "Cumplimiento Regulatorio", "Atención al Detalle", "Habilidades Analíticas", "Habilidades de Comunicación"],
      experience: [
        {
          title: "Autorizador de Crédito Senior",
          company: "Bank of America",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducí los tiempos de procesamiento de crédito en un 25% a través de flujos de trabajo optimizados.",
            "Aumenté las tasas de aprobación en un 15% al mejorar los procesos de evaluación de riesgos.",
            "Capacité a 10 nuevos empleados en procedimientos de evaluación de crédito, mejorando la eficiencia del equipo.",
          ],
        },
        {
          title: "Autorizador de Crédito",
          company: "Wells Fargo",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Procesé más de 1,000 solicitudes de crédito mensualmente con una tasa de precisión del 98%.",
            "Implementé nuevos protocolos de cumplimiento que disminuyeron los hallazgos de auditoría en un 40%.",
            "Colaboré con el equipo de servicio al cliente para resolver consultas de clientes, mejorando las puntuaciones de satisfacción en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "University of California", degree: "B.S.", field: "Finanzas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Credit Professional", issuer: "National Association of Credit Management", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Autorizador de Crédito en su currículum?", answer: "Incluye experiencia relevante, habilidades específicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Autorizador de Crédito?", answer: "Utiliza un formato claro, resalta tus logros y adapta el contenido a la oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Autorizador de Crédito?", answer: "Habilidades en análisis de riesgos, comunicación efectiva y atención al detalle son cruciales." },
    ],
  },
  "dancer": {
    slug: "curriculum-bailarin",
    title: "Currículum de Bailarín",
    keywords: ["currículum de bailarín", "CV de bailarín", "ejemplo currículum bailarín", "plantilla CV bailarín"],
    searchIntents: ["cómo escribir currículum de bailarín", "ejemplos currículum bailarín", "mejor formato CV bailarín"],
    topSkills: ["ballet", "danza contemporánea", "hip hop", "jazz", "danza de claqué", "musicalidad", "coreografía", "presencia escénica", "improvisación", "trabajo en pareja"],
    atsKeywords: ["danza", "actuación", "coreógrafo", "audición", "ensayo", "escenario", "teatro", "compromiso con el público", "condición física", "estilos de danza", "colaboración en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Bailarín",
      summary: "Bailarín experimentado con más de 7 años en varios estilos de danza, incluyendo ballet y contemporáneo. Destacado por aumentar el compromiso del público en un 30% en presentaciones en vivo.",
      skills: ["ballet", "danza contemporánea", "hip hop", "jazz", "danza de claqué", "musicalidad", "coreografía", "presencia escénica", "improvisación", "trabajo en pareja"],
      experience: [
        {
          title: "Bailarín Senior",
          company: "Broadway Dance Company",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la satisfacción del público en un 25% a través de coreografías innovadoras.",
            "Actué en más de 50 shows, contribuyendo a un crecimiento del 15% en las ventas de boletos.",
            "Colaboré con los mejores coreógrafos para crear actuaciones galardonadas.",
          ],
        },
        {
          title: "Bailarín",
          company: "City Dance Theater",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Participé en competiciones regionales de danza, ganando 3 premios de primer lugar.",
            "Asistí en la coreografía de un exitoso recital de danza con más de 200 asistentes.",
            "Entrené y mentoreé a 10 bailarines junior, mejorando sus habilidades de actuación.",
          ],
        },
      ],
      education: [
        { institution: "New York University", degree: "B.F.A.", field: "Interpretación de Danza", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Dance Instructor", issuer: "Dance Teacher Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de bailarín?", answer: "Un currículum de bailarín debe incluir experiencia en danza, habilidades específicas, logros en presentaciones y formación académica en danza." },
      { question: "¿Cómo destacar mi currículum de bailarín?", answer: "Destaca tus logros más relevantes, utiliza un formato claro y conciso, y asegúrate de personalizarlo para cada audición." },
      { question: "¿Qué habilidades necesita un currículum de bailarín?", answer: "Un currículum de bailarín debe incluir habilidades en distintos estilos de danza, improvisación, trabajo en equipo y presencia escénica." },
    ],
  },
  "design-strategist": {
    slug: "estratega-de-diseno",
    title: "Estratega de Diseño",
    keywords: ["currículum de Estratega de Diseño", "CV de Estratega de Diseño", "ejemplo currículum Estratega de Diseño", "plantilla CV Estratega de Diseño"],
    searchIntents: ["cómo escribir currículum de Estratega de Diseño", "ejemplos currículum Estratega de Diseño", "mejor formato CV Estratega de Diseño"],
    topSkills: ["Investigación de Usuarios", "Arquitectura de Información", "Diseño Visual", "Prototipado", "Diseño de Experiencia de Usuario", "Estrategia de Marca", "Diseño de Interacción", "Design Thinking", "Pruebas de Usabilidad", "Colaboración"],
    atsKeywords: ["Estrategia de Diseño", "Diseño Centrado en el Usuario", "Investigación UX", "Wireframing", "Mockups", "Resolución Creativa de Problemas", "Compromiso de Partes Interesadas", "Liderazgo de Equipos Multifuncionales", "Metodologías Ágiles", "Sistemas de Diseño", "Mapeo del Viaje del Cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Estratega de Diseño",
      summary: "Estratega de Diseño con más de 5 años de experiencia en la creación de soluciones de diseño centradas en el usuario. Lideré proyectos que incrementaron el compromiso de los usuarios en un 30% y mejoraron las calificaciones de satisfacción del cliente en un 25%.",
      skills: ["Investigación de Usuarios", "Arquitectura de Información", "Diseño Visual", "Prototipado", "Diseño de Experiencia de Usuario", "Estrategia de Marca", "Diseño de Interacción", "Design Thinking", "Pruebas de Usabilidad", "Colaboración"],
      experience: [
        {
          title: "Estratega de Diseño Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que rediseñó la aplicación móvil, resultando en un aumento del 40% en la retención de usuarios.",
            "Realicé investigaciones de usuarios que informaron una nueva línea de productos, generando $1M en ingresos adicionales en el primer año.",
            "Implementé un taller de design thinking que mejoró la colaboración entre departamentos en un 50%.",
          ],
        },
        {
          title: "Estratega de Diseño",
          company: "Innovative Design Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé wireframes y prototipos para una nueva plataforma de comercio electrónico, mejorando la experiencia del usuario y aumentando las conversiones en un 20%.",
            "Desarrollé una estrategia de marca integral que elevó la posición de mercado de la empresa.",
            "Facilité sesiones de pruebas de usabilidad que llevaron a una mejora del 15% en la satisfacción del usuario.",
          ],
        },
      ],
      education: [
        { institution: "Design University", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified UX Designer", issuer: "UX Design Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Estratega de Diseño en su currículum?", answer: "Incluye experiencia relevante, habilidades técnicas y ejemplos de proyectos exitosos." },
      { question: "¿Cómo destacar mi currículum de Estratega de Diseño?", answer: "Utiliza un formato limpio, incluye logros cuantificables y personaliza tu currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Estratega de Diseño?", answer: "Habilidades en investigación de usuarios, diseño visual, prototipado y comunicación efectiva." },
    ],
  },
  "digital-designer": {
    slug: "diseñador-digital",
    title: "Diseñador Digital",
    keywords: ["currículum de Diseñador Digital", "CV de Diseñador Digital", "ejemplo currículum Diseñador Digital", "plantilla CV Diseñador Digital"],
    searchIntents: ["cómo escribir currículum de Diseñador Digital", "ejemplos currículum Diseñador Digital", "mejor formato CV Diseñador Digital"],
    topSkills: ["Adobe Creative Suite", "Diseño UI/UX", "Diseño Web Responsivo", "Diseño Gráfico", "Prototipado", "Identidad de Marca", "Ilustración", "Diseño de Interacción", "Tipografía", "Teoría del Color"],
    atsKeywords: ["diseño digital", "experiencia del usuario", "diseño gráfico", "diseño web", "herramientas de prototipado", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Sketch", "Figma", "diseño responsivo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador Digital",
      summary: "Diseñador Digital Creativo con más de 5 años de experiencia en la creación de productos digitales atractivos y fáciles de usar. Lideré con éxito proyectos que aumentaron la participación del usuario en un 30% y mejoraron la visibilidad de la marca.",
      skills: ["Adobe Creative Suite", "Diseño UI/UX", "Diseño Web Responsivo", "Diseño Gráfico", "Prototipado", "Identidad de Marca", "Ilustración", "Diseño de Interacción", "Tipografía", "Teoría del Color"],
      experience: [
        {
          title: "Diseñador Digital Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto de diseño que aumentó la participación del usuario en un 30%",
            "Rediseñé el sitio web de la empresa, lo que llevó a un aumento del 25% en el tráfico",
            "Colaboré con el equipo de marketing para crear una campaña que mejoró la visibilidad de la marca en un 40%",
          ],
        },
        {
          title: "Diseñador Digital",
          company: "Innovative Designs LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé interfaces de usuario para más de 10 aplicaciones móviles",
            "Creé materiales de marca que mejoraron las calificaciones de satisfacción del cliente en un 20%",
            "Desarrollé prototipos que redujeron el tiempo de entrega del proyecto en un 15%",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Chicago", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified UX Designer", issuer: "Interaction Design Foundation", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador Digital en su currículum?", answer: "Debe incluir su experiencia laboral, habilidades técnicas y proyectos destacados." },
      { question: "¿Cómo destacar mi currículum de Diseñador Digital?", answer: "Utiliza un formato limpio y destaca tus logros cuantificables." },
      { question: "¿Qué habilidades necesita un Diseñador Digital?", answer: "Habilidades clave incluyen diseño UI/UX, prototipado y manejo de herramientas de diseño." },
    ],
  },
  "digital-producer": {
    slug: "productor-digital",
    title: "Productor Digital",
    keywords: ["currículum de productor digital", "CV de productor digital", "ejemplo currículum productor digital", "plantilla CV productor digital"],
    searchIntents: ["cómo escribir currículum de productor digital", "ejemplos currículum productor digital", "mejor formato CV productor digital"],
    topSkills: ["Gestión de Proyectos", "Estrategia de Contenidos", "Producción de Video", "Marketing Digital", "Gestión de Redes Sociales", "Optimización SEO", "Análisis de Datos", "Diseño UX/UI", "Liderazgo de Equipo", "Gestión de Presupuesto"],
    atsKeywords: ["producción digital", "creación de contenido", "colaboración en equipo", "compromiso de interesados", "ciclo de vida del proyecto", "equipos multifuncionales", "metodología ágil", "métricas de rendimiento", "estrategia de marca", "planificación de medios", "ejecución de campañas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor Digital",
      summary: "Productor Digital dinámico con más de 6 años de experiencia en la entrega de proyectos digitales de alto impacto. He gestionado con éxito un portafolio diverso de proyectos, logrando un aumento del 30% en la participación de la audiencia y un incremento del 25% en los ingresos a través de soluciones digitales innovadoras.",
      skills: ["Gestión de Proyectos", "Estrategia de Contenidos", "Producción de Video", "Marketing Digital", "Gestión de Redes Sociales", "Optimización SEO", "Análisis de Datos", "Diseño UX/UI", "Liderazgo de Equipo", "Gestión de Presupuesto"],
      experience: [
        {
          title: "Productor Digital Senior",
          company: "Creative Agency Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo multifuncional para ejecutar una campaña de marketing digital que aumentó las conversiones en un 40%.",
            "Gestioné un presupuesto de $500,000 para producción de video, lo que resultó en una disminución del 20% en costos manteniendo una alta calidad de producción.",
            "Desarrollé e implementé una estrategia de contenidos que mejoró el tráfico del sitio web en un 50% en 6 meses.",
          ],
        },
        {
          title: "Productor Digital",
          company: "Innovative Media Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Produje más de 30 piezas de contenido digital que lograron una tasa de participación promedio del 15%.",
            "Coordiné con proveedores externos para mejorar la calidad de producción, lo que resultó en un aumento del 25% en la satisfacción del cliente.",
            "Implementé herramientas de análisis de datos que mejoraron la eficiencia del seguimiento y la elaboración de informes de proyectos en un 35%.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Artes de la Comunicación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Digital Producer", issuer: "Digital Production Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Productor Digital en su currículum?", answer: "Un Productor Digital debe incluir su experiencia en gestión de proyectos, habilidades técnicas en producción de contenido, y su capacidad para trabajar en equipos multifuncionales." },
      { question: "¿Cómo destacar mi currículum de Productor Digital?", answer: "Destaca tus logros cuantificables y proyectos significativos, y asegúrate de incluir habilidades relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Productor Digital?", answer: "Un Productor Digital necesita habilidades en gestión de proyectos, estrategia de contenidos, y marketing digital, además de conocimientos técnicos en producción y análisis de datos." },
    ],
  },
  "digital-signal-processing-design-engineer": {
    slug: "ingeniero-de-diseno-de-procesamiento-de-senales-digitales",
    title: "Ingeniero de Diseño de Procesamiento de Señales Digitales",
    keywords: ["currículum de ingeniero de diseño de procesamiento de señales digitales", "CV de ingeniero de diseño de procesamiento de señales digitales", "ejemplo currículum ingeniero de diseño de procesamiento de señales digitales", "plantilla CV ingeniero de diseño de procesamiento de señales digitales"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de procesamiento de señales digitales", "ejemplos currículum ingeniero de diseño de procesamiento de señales digitales", "mejor formato CV ingeniero de diseño de procesamiento de señales digitales"],
    topSkills: ["Procesamiento de Señales", "MATLAB", "Algoritmos DSP", "Diseño FPGA", "Sistemas Embebidos", "Simulink", "Filtros Digitales", "Sistemas de Comunicación", "Programación C/C++", "Análisis de Datos"],
    atsKeywords: ["Procesamiento de Señales Digitales", "Ingeniero DSP", "Análisis de Señales", "Desarrollo de Algoritmos", "DSP Embebido", "Procesamiento en Tiempo Real", "Desarrollo de Software", "Diseño de Sistemas", "Integración de Hardware", "Gestión de Proyectos", "Documentación Técnica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Procesamiento de Señales Digitales",
      summary: "Ingeniero de Diseño de Procesamiento de Señales Digitales con más de 5 años de experiencia en el desarrollo de soluciones innovadoras de DSP, logrando un aumento del 30% en la eficiencia del procesamiento en proyectos.",
      skills: ["Procesamiento de Señales", "MATLAB", "Algoritmos DSP", "Diseño FPGA", "Sistemas Embebidos", "Simulink", "Filtros Digitales", "Sistemas de Comunicación", "Programación C/C++", "Análisis de Datos"],
      experience: [
        {
          title: "Ingeniero Senior DSP",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para desarrollar una nueva arquitectura DSP, mejorando la velocidad de procesamiento de señales en un 40%.",
            "Implementé algoritmos que redujeron la distorsión de señales en un 25%, mejorando el rendimiento general del sistema.",
            "Colaboré con equipos multifuncionales, resultando en un lanzamiento de producto que aumentó la cuota de mercado en un 15%.",
          ],
        },
        {
          title: "Ingeniero DSP",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé y optimicé algoritmos DSP para procesamiento de audio, logrando una mejora del 20% en la calidad del sonido.",
            "Creé modelos de simulación que redujeron el tiempo de desarrollo en un 30%.",
            "Realicé sesiones de capacitación técnica, mejorando la productividad del equipo en un 10%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica y Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Digital Signal Processing Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Digital Signal Processing Design Engineer en su currículum?", answer: "Incluir experiencia en procesamiento de señales, habilidades en programación y proyectos relevantes." },
      { question: "¿Cómo destacar mi currículum de Digital Signal Processing Design Engineer?", answer: "Enfatizar logros cuantificables y proyectos de impacto en el área de DSP." },
      { question: "¿Qué habilidades necesita un Digital Signal Processing Design Engineer?", answer: "Conocimientos en algoritmos DSP, programación en MATLAB y C/C++, y experiencia en sistemas embebidos." },
    ],
  },
  "director-of-audio-visual-services": {
    slug: "director-de-servicios-audiovisuales",
    title: "Director de Servicios Audiovisuales",
    keywords: ["currículum de Director de Servicios Audiovisuales", "CV de Director de Servicios Audiovisuales", "ejemplo currículum Director de Servicios Audiovisuales", "plantilla CV Director de Servicios Audiovisuales"],
    searchIntents: ["cómo escribir currículum de Director de Servicios Audiovisuales", "ejemplos currículum Director de Servicios Audiovisuales", "mejor formato CV Director de Servicios Audiovisuales"],
    topSkills: ["Gestión de Proyectos", "Ingeniería de Audio", "Producción de Video", "Coordinación de Eventos", "Soporte Técnico", "Liderazgo de Equipo", "Gestión de Presupuestos", "Relaciones con Clientes", "Diseño Creativo", "Resolución de Problemas"],
    atsKeywords: ["Sistemas Audiovisuales", "Tecnología AV", "Producción de Eventos", "Configuración de Equipos", "Eventos en Vivo", "Medios Digitales", "Habilidades de Presentación", "Gestión de Proveedores", "Operaciones de Transmisión", "Capacitación Técnica", "Servicio al Cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Director de Servicios Audiovisuales",
      summary: "Director de Servicios Audiovisuales con más de 10 años de experiencia en la industria, especializado en ofrecer experiencias audiovisuales de alto impacto para eventos corporativos. Gestionó presupuestos superiores a $1M y lideró equipos logrando una tasa de satisfacción del cliente del 95%.",
      skills: ["Gestión de Proyectos", "Ingeniería de Audio", "Producción de Video", "Coordinación de Eventos", "Soporte Técnico", "Liderazgo de Equipo", "Gestión de Presupuestos", "Relaciones con Clientes", "Diseño Creativo", "Resolución de Problemas"],
      experience: [
        {
          title: "Director Senior de Servicios Audiovisuales",
          company: "Global Events Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de producción de eventos en un 30% mediante procesos optimizados.",
            "Gestioné un presupuesto de $1.5M, entregando proyectos con un 15% por debajo del presupuesto.",
            "Lideré un equipo de 20 técnicos, logrando una tasa de entrega a tiempo del 98% para eventos.",
          ],
        },
        {
          title: "Gerente Audiovisual",
          company: "Premier Event Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé y ejecuté estrategias AV para más de 150 eventos corporativos.",
            "Logré un aumento del 25% en negocios recurrentes a través de un servicio al cliente excepcional.",
            "Implementé nuevas soluciones tecnológicas, reduciendo los costos de alquiler de equipos en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Los Angeles", degree: "B.S.", field: "Estudios de Comunicación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Technology Specialist", issuer: "InfoComm International", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Director de Servicios Audiovisuales en su currículum?", answer: "Debe incluir su experiencia en gestión de proyectos, habilidades técnicas en AV, y ejemplos de éxito en eventos." },
      { question: "¿Cómo destacar mi currículum de Director de Servicios Audiovisuales?", answer: "Enfatiza tus logros cuantificables y habilidades técnicas relevantes para la industria." },
      { question: "¿Qué habilidades necesita un Director de Servicios Audiovisuales?", answer: "Necesita habilidades en gestión de proyectos, liderazgo, y conocimientos técnicos en tecnología audiovisual." },
    ],
  },
  "electrical-contractor": {
    slug: "contratista-electrico",
    title: "Contratista Eléctrico",
    keywords: ["currículum de contratista eléctrico", "CV de contratista eléctrico", "ejemplo currículum contratista eléctrico", "plantilla CV contratista eléctrico"],
    searchIntents: ["cómo escribir currículum de contratista eléctrico", "ejemplos currículum contratista eléctrico", "mejor formato CV contratista eléctrico"],
    topSkills: ["Diseño de Sistemas Eléctricos", "Gestión de Proyectos", "Resolución de Problemas", "Cumplimiento de Normativas", "Inspecciones Eléctricas", "Liderazgo de Equipo", "Protocolos de Seguridad", "Relaciones con Clientes", "Gestión de Presupuesto", "Sistemas de Energía Renovable"],
    atsKeywords: ["Contratista Eléctrico", "Electricista Licenciado", "Códigos Eléctricos", "Lectura de Planos", "Sistemas de Baja Tensión", "Sistemas de Alta Tensión", "Cableado Residencial", "Cableado Comercial", "Mantenimiento Eléctrico", "Resolución de Problemas", "Colaboración en Equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Contratista Eléctrico",
      summary: "Contratista eléctrico dedicado con más de 10 años de experiencia en la gestión de instalaciones eléctricas a gran escala. Proyectos completados con éxito que suman más de $2 millones, entregando consistentemente trabajo de alta calidad a tiempo y dentro del presupuesto.",
      skills: ["Diseño de Sistemas Eléctricos", "Gestión de Proyectos", "Resolución de Problemas", "Cumplimiento de Normativas", "Inspecciones Eléctricas", "Liderazgo de Equipo", "Protocolos de Seguridad", "Relaciones con Clientes", "Gestión de Presupuesto", "Sistemas de Energía Renovable"],
      experience: [
        {
          title: "Contratista Eléctrico Senior",
          company: "Bright Future Electrical Services",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para completar un proyecto comercial de $1 millón 3 meses antes de lo programado, aumentando la satisfacción del cliente en un 30%.",
            "Reduje los costos del proyecto en un 15% mediante una gestión eficiente de recursos y planificación estratégica.",
            "Implementé programas de capacitación en seguridad, lo que resultó en una disminución del 40% en incidentes laborales.",
          ],
        },
        {
          title: "Contratista Eléctrico",
          company: "Citywide Electric",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cableé con éxito más de 500 propiedades residenciales, asegurando el cumplimiento de los códigos y regulaciones locales.",
            "Mejoré los índices de satisfacción del cliente en un 25% mediante una comunicación efectiva y un servicio de calidad.",
            "Optimicé el proceso de instalación eléctrica, reduciendo el tiempo promedio del proyecto en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "State University of Technology", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Electrical Contractor", issuer: "National Electrical Contractors Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Contratista Eléctrico en su currículum?", answer: "Incluya su experiencia en proyectos, certificaciones, y habilidades técnicas relevantes." },
      { question: "¿Cómo destacar mi currículum de Contratista Eléctrico?", answer: "Enfatice sus logros en proyectos anteriores y habilidades específicas del sector." },
      { question: "¿Qué habilidades necesita un Contratista Eléctrico?", answer: "Necesita habilidades en diseño eléctrico, gestión de proyectos, y cumplimiento de normativas." },
    ],
  },
  "environment-artist-iron-galaxy-studios": {
    slug: "artista-de-entorno",
    title: "Artista de Entorno",
    keywords: ["currículum de artista de entorno", "CV de artista de entorno", "ejemplo currículum artista de entorno", "plantilla CV artista de entorno"],
    searchIntents: ["cómo escribir currículum de artista de entorno", "ejemplos currículum artista de entorno", "mejor formato CV artista de entorno"],
    topSkills: ["Modelado 3D", "Texturización", "Iluminación", "Diseño de Niveles", "Desarrollo de Sombras", "Diseño de Entornos", "Narrativa Visual", "Optimización de Activos", "Colaboración", "Resolución de Problemas"],
    atsKeywords: ["Arte de Entorno", "Desarrollo de Juegos", "Unreal Engine", "Unity", "Maya", "Substance Painter", "ZBrush", "Photoshop", "Arte Conceptual", "Gestión de Proyectos", "Liderazgo de Equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista de Entorno",
      summary: "Artista de Entorno dinámico con más de 5 años de experiencia en la creación de entornos de juego inmersivos. Historial comprobado de mejora de la estética del juego, contribuyendo a un aumento del 30% en la retención de jugadores.",
      skills: ["Modelado 3D", "Texturización", "Iluminación", "Diseño de Niveles", "Desarrollo de Sombras", "Diseño de Entornos", "Narrativa Visual", "Optimización de Activos", "Colaboración", "Resolución de Problemas"],
      experience: [
        {
          title: "Artista de Entorno Senior",
          company: "Iron Galaxy Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré el desarrollo de más de 10 entornos de juego de alta calidad, resultando en un aumento del 25% en el compromiso de los jugadores.",
            "Implementé nuevas técnicas de optimización de activos, reduciendo los tiempos de renderizado en un 15%.",
            "Colaboré con equipos multifuncionales para mejorar la narrativa visual, mejorando las calificaciones generales del juego en 0.5 estrellas.",
          ],
        },
        {
          title: "Artista de Entorno",
          company: "Riot Games",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé más de 50 activos únicos para varios entornos de juego, contribuyendo a una estética cohesiva.",
            "Recibí el premio 'Empleado del Mes' por contribuciones sobresalientes a un lanzamiento exitoso del juego.",
            "Agilicé los procesos de trabajo, lo que mejoró el tiempo de producción en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Arte de Juegos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Unreal Engine Developer", issuer: "Epic Games", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Artista de Entorno en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia en proyectos anteriores y ejemplos de su trabajo." },
      { question: "¿Cómo destacar mi currículum de Artista de Entorno?", answer: "Enfócate en tus logros medibles y en proyectos específicos que hayas realizado." },
      { question: "¿Qué habilidades necesita un Artista de Entorno?", answer: "Modelado 3D, texturización, iluminación y diseño de niveles son habilidades clave." },
    ],
  },
  "environmental-artist": {
    slug: "artista-ambiental",
    title: "Artista Ambiental",
    keywords: ["currículum de artista ambiental", "CV de artista ambiental", "ejemplo currículum artista ambiental", "plantilla CV artista ambiental"],
    searchIntents: ["cómo escribir currículum de artista ambiental", "ejemplos currículum artista ambiental", "mejor formato CV artista ambiental"],
    topSkills: ["Modelado 3D", "Pintura de Texturas", "Técnicas de Iluminación", "Diseño Ambiental", "Diseño de Niveles", "Arte Conceptual", "Desarrollo de Shaders", "Motores de Juego", "Photoshop", "Colaboración"],
    atsKeywords: ["arte ambiental", "artista 3D", "diseño de juegos", "diseño ambiental", "texturización", "artista de niveles", "diseñador conceptual", "artista de iluminación", "narrativa visual", "software creativo", "colaboración en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista Ambiental",
      summary: "Artista Ambiental con más de 5 años de experiencia en la creación de entornos de juego inmersivos. Lideré con éxito proyectos que mejoraron el compromiso de los jugadores en un 30% a través de prácticas de diseño innovadoras.",
      skills: ["Modelado 3D", "Pintura de Texturas", "Técnicas de Iluminación", "Diseño Ambiental", "Diseño de Niveles", "Arte Conceptual", "Desarrollo de Shaders", "Motores de Juego", "Photoshop", "Colaboración"],
      experience: [
        {
          title: "Artista Ambiental Senior",
          company: "Epic Games",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que creó un impresionante entorno de mundo abierto, lo que resultó en un aumento del 40% en las tasas de retención de jugadores.",
            "Desarrollé técnicas de texturización innovadoras que redujeron el tiempo de creación de activos en un 25%.",
            "Colaboré con equipos multifuncionales para mejorar la narrativa del juego a través de la narración ambiental.",
          ],
        },
        {
          title: "Artista Ambiental",
          company: "Ubisoft",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé múltiples niveles de juego detallados que contribuyeron a un aumento del 20% en las puntuaciones de satisfacción de los jugadores.",
            "Implementé nuevas técnicas de iluminación que mejoraron la calidad visual y el rendimiento.",
            "Creé más de 100 activos 3D únicos para varios entornos de juego.",
          ],
        },
      ],
      education: [
        { institution: "ArtCenter College of Design", degree: "B.S.", field: "Diseño Ambiental", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified 3D Artist", issuer: "CGMA", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Artista Ambiental en su currículum?", answer: "Incluya su experiencia en diseño ambiental, habilidades en modelado 3D, y proyectos destacados." },
      { question: "¿Cómo destacar mi currículum de Artista Ambiental?", answer: "Enfatice sus logros en proyectos, habilidades técnicas y su capacidad para colaborar en equipo." },
      { question: "¿Qué habilidades necesita un Artista Ambiental?", answer: "Modelado 3D, texturización, iluminación, diseño de niveles y software de diseño como Photoshop." },
    ],
  },
  "event-producer": {
    slug: "productor-de-eventos",
    title: "Productor de Eventos",
    keywords: ["currículum de productor de eventos", "CV de productor de eventos", "ejemplo currículum productor de eventos", "plantilla CV productor de eventos"],
    searchIntents: ["cómo escribir currículum de productor de eventos", "ejemplos currículum productor de eventos", "mejor formato CV productor de eventos"],
    topSkills: ["Gestión de Proyectos", "Presupuestación", "Negociación con Proveedores", "Marketing de Eventos", "Coordinación de Logística", "Resolución Creativa de Problemas", "Compromiso del Público", "Producción Técnica", "Liderazgo de Equipo", "Relaciones con Clientes"],
    atsKeywords: ["planificación de eventos", "gestión de producción", "comunicación con partes interesadas", "logística de eventos", "gestión de presupuestos", "estrategias de marketing de eventos", "gestión de proveedores", "gestión de riesgos", "colaboración en equipo", "programación", "desarrollo de cronogramas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor de Eventos",
      summary: "Productor de Eventos dinámico con más de 5 años de experiencia en la orquestación de eventos a gran escala y gestión de presupuestos superiores a $500,000. Historial comprobado de incrementar la satisfacción de los asistentes en un 30% a través de programación innovadora y asociaciones estratégicas.",
      skills: ["Gestión de Proyectos", "Presupuestación", "Negociación con Proveedores", "Marketing de Eventos", "Coordinación de Logística", "Resolución Creativa de Problemas", "Compromiso del Público", "Producción Técnica", "Liderazgo de Equipo", "Relaciones con Clientes"],
      experience: [
        {
          title: "Productor de Eventos Senior",
          company: "Event Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Gestioné con éxito un portafolio de eventos con un presupuesto combinado de más de $1 millón, logrando un rendimiento de un 20% por debajo del presupuesto.",
            "Aumenté la asistencia general a los eventos en un 40% a través de campañas de marketing dirigidas y asociaciones estratégicas.",
            "Optimicé los procesos de negociación con proveedores, resultando en una reducción de costos del 15% en todos los eventos.",
          ],
        },
        {
          title: "Coordinador de Eventos",
          company: "Creative Events Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordiné más de 50 eventos anuales, mejorando las calificaciones de satisfacción del cliente al 95%.",
            "Implementé un nuevo software de gestión de eventos que mejoró la comunicación del equipo y la eficiencia del flujo de trabajo en un 25%.",
            "Desarrollé un sistema integral de retroalimentación post-evento que aumentó los conocimientos prácticos en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Eventos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Meeting Professional", issuer: "Meeting Professionals International", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Productor de Eventos en su currículum?", answer: "Un Productor de Eventos debe incluir su experiencia en planificación y ejecución de eventos, habilidades de gestión de presupuesto, y ejemplos de éxito en negociaciones con proveedores." },
      { question: "¿Cómo destacar mi currículum de Productor de Eventos?", answer: "Para destacar su currículum, incluya métricas concretas de éxito y resalte sus habilidades técnicas y de liderazgo." },
      { question: "¿Qué habilidades necesita un Productor de Eventos?", answer: "Un Productor de Eventos necesita habilidades en gestión de proyectos, comunicación efectiva, y capacidad para trabajar bajo presión." },
    ],
  },
  "executive-producer": {
    slug: "productor-ejecutivo",
    title: "Productor Ejecutivo",
    keywords: ["currículum de productor ejecutivo", "CV de productor ejecutivo", "ejemplo currículum productor ejecutivo", "plantilla CV productor ejecutivo"],
    searchIntents: ["cómo escribir currículum de productor ejecutivo", "ejemplos currículum productor ejecutivo", "mejor formato CV productor ejecutivo"],
    topSkills: ["Gestión de Proyectos", "Presupuestos", "Dirección Creativa", "Negociación", "Liderazgo de Equipos", "Planificación Estratégica", "Desarrollo de Contenidos", "Estrategias de Marketing", "Networking", "Resolución de Problemas"],
    atsKeywords: ["producción ejecutiva", "supervisión de proyectos", "gestión de presupuestos", "coordinación de equipos", "producción de medios", "estrategia de contenido", "compromiso de partes interesadas", "visión creativa", "líneas de tiempo de producción", "gestión de riesgos", "análisis de audiencias"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor Ejecutivo",
      summary: "Productor Ejecutivo dinámico con más de 10 años de experiencia liderando proyectos de alto perfil y entregando contenido que aumenta la participación de la audiencia en un 30%. Historial comprobado en la gestión de presupuestos multimillonarios y en la construcción de equipos de alto rendimiento.",
      skills: ["Gestión de Proyectos", "Presupuestos", "Dirección Creativa", "Negociación", "Liderazgo de Equipos", "Planificación Estratégica", "Desarrollo de Contenidos", "Estrategias de Marketing", "Networking", "Resolución de Problemas"],
      experience: [
        {
          title: "Productor Ejecutivo Senior",
          company: "ABC Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de audiencia en un 25% para la serie principal a través de estrategias de contenido innovadoras.",
            "Gestioné un presupuesto de producción de $5 millones, entregando el proyecto por debajo del presupuesto en un 10%.",
            "Lideré con éxito un equipo de 50 personas en múltiples departamentos para optimizar los procesos de producción, reduciendo el tiempo de entrega en un 15%.",
          ],
        },
        {
          title: "Productor Ejecutivo",
          company: "XYZ Productions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Produje un documental que obtuvo 3 nominaciones al Emmy y aumentó la participación en redes sociales en un 40%.",
            "Supervisé la producción de más de 10 programas de televisión, asegurando que todos los proyectos se completaran a tiempo y cumplieran con los estándares de calidad.",
            "Desarrollé asociaciones con marcas importantes, resultando en $1 millón en ingresos por patrocinios.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Producción de Cine y Televisión", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Producer", issuer: "Producers Guild of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Productor Ejecutivo en su currículum?", answer: "Debe incluir experiencia relevante, habilidades clave y logros destacados en proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Productor Ejecutivo?", answer: "Utiliza un formato claro, destaca tus logros cuantificables y personaliza el contenido para cada aplicación." },
      { question: "¿Qué habilidades necesita un Productor Ejecutivo?", answer: "Habilidades de gestión de proyectos, liderazgo, negociación, y visión creativa son esenciales." },
    ],
  },
  "exhibit-designer": {
    slug: "diseñador-de-exposiciones",
    title: "Diseñador de Exposiciones",
    keywords: ["currículum de diseñador de exposiciones", "CV de diseñador de exposiciones", "ejemplo currículum diseñador de exposiciones", "plantilla CV diseñador de exposiciones"],
    searchIntents: ["cómo escribir currículum de diseñador de exposiciones", "ejemplos currículum diseñador de exposiciones", "mejor formato CV diseñador de exposiciones"],
    topSkills: ["Modelado 3D", "Diseño Gráfico", "Gestión de Proyectos", "Comunicación Visual", "Fabricación de Exposiciones", "Relaciones con Clientes", "Gestión de Presupuestos", "Resolución Creativa de Problemas", "Dirección Artística", "Gestión del Tiempo"],
    atsKeywords: ["diseño de exposiciones", "exposición en ferias comerciales", "software de diseño", "renderización 3D", "desarrollo de conceptos", "colaboración", "habilidades de presentación", "diseño de interiores", "liderazgo de equipo", "presentaciones a clientes", "planificación de eventos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Exposiciones",
      summary: "Diseñador de Exposiciones con más de 5 años de experiencia en la creación de espacios e instalaciones de exhibición atractivos. Aumentó con éxito las calificaciones de satisfacción del cliente en un 30% a través de soluciones de diseño innovadoras y gestión efectiva de proyectos.",
      skills: ["Modelado 3D", "Diseño Gráfico", "Gestión de Proyectos", "Comunicación Visual", "Fabricación de Exposiciones", "Relaciones con Clientes", "Gestión de Presupuestos", "Resolución Creativa de Problemas", "Dirección Artística", "Gestión del Tiempo"],
      experience: [
        {
          title: "Diseñador de Exposiciones Senior",
          company: "Design Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un equipo para diseñar una exposición de 5,000 pies cuadrados que aumentó la participación de los visitantes en un 40%",
            "Gestioné un presupuesto de $500,000 para una gira de exposiciones en varias ciudades, llegando al 10% por debajo del presupuesto",
            "Desarrollé un nuevo proceso de diseño que redujo el tiempo de entrega del proyecto en un 25%",
          ],
        },
        {
          title: "Diseñador de Exposiciones",
          company: "Creative Displays Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé más de 20 exposiciones exitosas en ferias comerciales que generaron un crecimiento de ingresos del 15% para los clientes",
            "Colaboré con equipos de marketing para asegurar una marca cohesiva en todas las exposiciones",
            "Recibí el 'Premio al Mejor Diseño' en la Feria Nacional de Comercio por el uso innovador de materiales",
          ],
        },
      ],
      education: [
        { institution: "University of the Arts", degree: "B.S.", field: "Diseño de Exposiciones", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Exhibit Designer", issuer: "International Association of Exhibitions and Events", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador de Exposiciones en su currículum?", answer: "Un Diseñador de Exposiciones debe incluir su experiencia en diseño, habilidades técnicas, logros en proyectos anteriores y educación relacionada." },
      { question: "¿Cómo destacar mi currículum de Diseñador de Exposiciones?", answer: "Para destacar su currículum, enfóquese en logros cuantificables, use palabras clave relevantes y asegúrese de que su diseño sea atractivo." },
      { question: "¿Qué habilidades necesita un Diseñador de Exposiciones?", answer: "Las habilidades clave incluyen diseño gráfico, modelado 3D, gestión de proyectos, creatividad y habilidades de comunicación." },
    ],
  },
  "fashion-assistant": {
    slug: "asistente-de-moda",
    title: "Asistente de Moda",
    keywords: ["currículum de asistente de moda", "CV de asistente de moda", "ejemplo currículum asistente de moda", "plantilla CV asistente de moda"],
    searchIntents: ["cómo escribir currículum de asistente de moda", "ejemplos currículum asistente de moda", "mejor formato CV asistente de moda"],
    topSkills: ["Análisis de Tendencias", "Visual Merchandising", "Servicio al Cliente", "Investigación de Moda", "Estilismo", "Gestión de Inventario", "Marketing en Redes Sociales", "Comunicación", "Gestión del Tiempo", "Colaboración en Equipo"],
    atsKeywords: ["moda", "asistente", "estilista", "merchandising", "servicio al cliente", "tendencias", "inventario", "redes sociales", "visuales", "colaboración", "investigación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Moda",
      summary: "Asistente de Moda dedicada con más de 5 años de experiencia en la industria de la moda, reconocida por aumentar las ventas en un 25% a través de estrategias de merchandising efectivas.",
      skills: ["Análisis de Tendencias", "Visual Merchandising", "Servicio al Cliente", "Investigación de Moda", "Estilismo", "Gestión de Inventario", "Marketing en Redes Sociales", "Comunicación", "Gestión del Tiempo", "Colaboración en Equipo"],
      experience: [
        {
          title: "Asistente de Moda Senior",
          company: "Zara",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el compromiso de los clientes en un 30% a través de exhibiciones visuales innovadoras.",
            "Coordine más de 15 eventos de moda exitosos, lo que llevó a un aumento del 20% en el reconocimiento de la marca.",
            "Optimicé los procesos de gestión de inventario, reduciendo las discrepancias de stock en un 15%.",
          ],
        },
        {
          title: "Asistente de Moda",
          company: "Nordstrom",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en el estilismo para más de 10 desfiles de moda, contribuyendo a un aumento del 40% en la asistencia del público.",
            "Desarrollé informes de tendencias que mejoraron la precisión en la selección de productos en un 25%.",
            "Mejoré la experiencia del servicio al cliente, logrando una calificación de satisfacción del 95%.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Merchandising de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Fashion Consultant", issuer: "Fashion Institute of Technology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Fashion Assistant en su currículum?", answer: "Debería incluir experiencia relevante, habilidades específicas de la industria y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Fashion Assistant?", answer: "Utiliza palabras clave de la industria, muestra tus logros y presenta un diseño limpio y profesional." },
      { question: "¿Qué habilidades necesita un Fashion Assistant?", answer: "Las habilidades clave incluyen análisis de tendencias, merchandising visual, servicio al cliente y manejo de redes sociales." },
    ],
  },
  "fashion-editor": {
    slug: "editor-de-moda",
    title: "Editor de Moda",
    keywords: ["currículum de Editor de Moda", "CV de Editor de Moda", "ejemplo currículum Editor de Moda", "plantilla CV Editor de Moda"],
    searchIntents: ["cómo escribir currículum de Editor de Moda", "ejemplos currículum Editor de Moda", "mejor formato CV Editor de Moda"],
    topSkills: ["Creación de Contenido", "Análisis de Tendencias", "Fotografía de Moda", "Estilismo", "Redacción Publicitaria", "Gestión de Redes Sociales", "Planificación Editorial", "Colaboración de Marca", "Investigación de Mercado", "Relaciones Públicas"],
    atsKeywords: ["Editorial de Moda", "Guía de Estilo", "Tendencias de Moda", "Merchandising Visual", "Contenido Editorial", "Escritura de Moda", "Desarrollo de Marca", "Medios Digitales", "Dirección Creativa", "Marketing de Moda", "Eventos de Moda"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Editor de Moda",
      summary: "Editor de Moda con más de 5 años de experiencia liderando equipos editoriales y dirigiendo estrategias de contenido de moda. Aumentó con éxito la cantidad de lectores en un 30% y mejoró la participación en línea en un 50% a través de un estilismo innovador y dirección editorial.",
      skills: ["Creación de Contenido", "Análisis de Tendencias", "Fotografía de Moda", "Estilismo", "Redacción Publicitaria", "Gestión de Redes Sociales", "Planificación Editorial", "Colaboración de Marca", "Investigación de Mercado", "Relaciones Públicas"],
      experience: [
        {
          title: "Editor de Moda Senior",
          company: "Vogue",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la cantidad de lectores mensual en un 30% a través de campañas de moda específicas.",
            "Lideró un equipo que produjo más de 150 piezas editoriales al año, logrando un aumento del 40% en compartidos en redes sociales.",
            "Colaboró con diseñadores de renombre para características exclusivas, aumentando la visibilidad de la marca.",
          ],
        },
        {
          title: "Editor de Moda",
          company: "Harper's Bazaar",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló y ejecutó estrategias de moda estacionales que resultaron en un crecimiento del 25% en el tráfico en línea.",
            "Coordinó sesiones fotográficas de moda de alto perfil que mejoraron la reputación de la revista.",
            "Estableció asociaciones con diseñadores emergentes, lo que llevó a un aumento del 15% en colaboraciones de marca.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Gestión de Merchandising de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Fashion Marketing Certification", issuer: "Fashion Institute of Technology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Editor de Moda en su currículum?", answer: "Debe incluir experiencia relevante, logros cuantificables y habilidades específicas del sector." },
      { question: "¿Cómo destacar mi currículum de Editor de Moda?", answer: "Utiliza un formato claro, destaca tus logros más importantes y adapta tu currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Editor de Moda?", answer: "Habilidades clave incluyen la creación de contenido, análisis de tendencias, y gestión de redes sociales." },
    ],
  },
  "fashion-model": {
    slug: "curriculum-modelo-de-moda",
    title: "Currículum de Modelo de Moda",
    keywords: ["currículum de modelo de moda", "CV de modelo de moda", "ejemplo currículum modelo de moda", "plantilla CV modelo de moda"],
    searchIntents: ["cómo escribir currículum de modelo de moda", "ejemplos currículum modelo de moda", "mejor formato CV modelo de moda"],
    topSkills: ["experiencia en pasarela", "colaboración en sesiones de fotos", "representación de marca", "pose y expresión", "conciencia de tendencias de moda", "conocimientos de estilismo", "compromiso en redes sociales", "red de contactos", "adaptabilidad", "confianza"],
    atsKeywords: ["modelaje", "moda", "fotografía", "pasarela", "comercial", "editorial", "sesión de fotos", "casting", "embajador de marca", "habilidades de presentación", "tendencias de moda"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Modelo de Moda",
      summary: "Modelo de moda dinámica con más de 5 años de experiencia en desfiles y sesiones editoriales, reconocida por aumentar el compromiso de la marca en un 30% a través de campañas en redes sociales.",
      skills: ["experiencia en pasarela", "colaboración en sesiones de fotos", "representación de marca", "pose y expresión", "conciencia de tendencias de moda", "conocimientos de estilismo", "compromiso en redes sociales", "red de contactos", "adaptabilidad", "confianza"],
      experience: [
        {
          title: "Modelo de Moda Senior",
          company: "Elite Models",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la visibilidad de la marca en un 40% a través de campañas estratégicas en redes sociales",
            "Participé en más de 50 desfiles, lo que llevó a un aumento del 25% en reservas de clientes",
            "Colaboré con los mejores fotógrafos y diseñadores para producir editoriales premiados",
          ],
        },
        {
          title: "Modelo de Moda",
          company: "Next Models",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Trabajé en más de 30 campañas comerciales, contribuyendo a un aumento del 20% en ventas para las marcas destacadas",
            "Logré un 95% de satisfacción de los clientes durante las sesiones de fotos",
            "Serví como embajador de marca para múltiples etiquetas de moda de alto perfil",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Gestión de Negocios de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Professional Modeling Certification", issuer: "Modeling Academy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de modelo de moda?", answer: "Un currículum de modelo de moda debe incluir experiencia en pasarelas, trabajos anteriores, habilidades relacionadas y logros destacados." },
      { question: "¿Cómo destacar mi currículum de modelo de moda?", answer: "Para destacar tu currículum, enfócate en tus logros y experiencia relevantes, y utiliza un formato limpio y profesional." },
      { question: "¿Qué habilidades necesita un currículum de modelo de moda?", answer: "Las habilidades clave incluyen experiencia en pasarela, colaboración en sesiones de fotos, y conocimiento de tendencias de moda." },
    ],
  },
  "fashion-stylist": {
    slug: "estilista-de-moda",
    title: "Estilista de Moda",
    keywords: ["currículum de estilista de moda", "CV de estilista de moda", "ejemplo currículum estilista de moda", "plantilla CV estilista de moda"],
    searchIntents: ["cómo escribir currículum de estilista de moda", "ejemplos currículum estilista de moda", "mejor formato CV estilista de moda"],
    topSkills: ["Análisis de Tendencias", "Teoría del Color", "Planificación de Guardarropa", "Compras Personales", "Ilustración de Moda", "Estilismo para Editorial", "Consulta con Clientes", "Desarrollo de Marca", "Merchandising Visual", "Investigación de Moda"],
    atsKeywords: ["Estilismo de Moda", "Estilismo de Guardarropa", "Dirección Creativa", "Coordinación de Moda", "Portafolio de Estilista", "Gestión de Clientes", "Coordinación de Fotoshoot", "Estilismo Retail", "Pronóstico de Moda", "Estilismo Personal", "Estilismo de Pasarela"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Estilista de Moda",
      summary: "Estilista de Moda dinámica con más de 5 años de experiencia en la creación de looks visualmente impresionantes para clientes. Aumenté la satisfacción del cliente en un 30% a través de servicios de estilismo personalizados.",
      skills: ["Análisis de Tendencias", "Teoría del Color", "Planificación de Guardarropa", "Compras Personales", "Ilustración de Moda", "Estilismo para Editorial", "Consulta con Clientes", "Desarrollo de Marca", "Merchandising Visual", "Investigación de Moda"],
      experience: [
        {
          title: "Estilista de Moda Senior",
          company: "Chic Boutique",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré la selección de guardarropa de los clientes, lo que llevó a un aumento del 25% en el negocio recurrente",
            "Gestioné el estilismo para más de 50 sesiones editoriales, lo que resultó en un crecimiento del 40% en el compromiso en redes sociales",
            "Desarrollé lookbooks estacionales que aumentaron las ventas en un 15% durante los meses pico de moda",
          ],
        },
        {
          title: "Estilista de Moda",
          company: "Style House",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Estilicé con éxito a más de 100 clientes, logrando una puntuación promedio de satisfacción del 95%",
            "Colaboré con fotógrafos y modelos para eventos de moda de alto perfil",
            "Creé soluciones de estilismo innovadoras que disminuyeron los costos de los clientes en un 20%",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Merchandising de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Fashion Stylist", issuer: "Fashion Stylist Academy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Fashion Stylist en su currículum?", answer: "Debe incluir su experiencia laboral, habilidades relevantes y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Fashion Stylist?", answer: "Enfatice su creatividad, logros medibles y un portafolio visual atractivo." },
      { question: "¿Qué habilidades necesita un Fashion Stylist?", answer: "Necesita habilidades en análisis de tendencias, coordinación de moda, y atención al cliente." },
    ],
  },
  "film-critic": {
    slug: "curriculum-critico-de-cine",
    title: "Currículum de Crítico de Cine",
    keywords: ["currículum de crítico de cine", "CV de crítico de cine", "ejemplo currículum crítico de cine", "plantilla CV crítico de cine"],
    searchIntents: ["cómo escribir currículum de crítico de cine", "ejemplos currículum crítico de cine", "mejor formato CV crítico de cine"],
    topSkills: ["análisis de cine", "guionismo", "cámara", "edición", "teoría del cine", "comentario cultural", "hablar en público", "investigación", "marketing en redes sociales", "escritura creativa"],
    atsKeywords: ["críticas de cine", "análisis de cine", "estudios cinematográficos", "análisis de películas", "calificaciones de películas", "festivales de cine", "relaciones públicas", "creación de contenido", "escritura", "edición", "publicaciones"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Crítico de Cine",
      summary: "Crítico de cine apasionado con más de 5 años de experiencia en el análisis de películas y la presentación de críticas perspicaces. Las reseñas publicadas han acumulado más de 50,000 visitas en diversas plataformas.",
      skills: ["análisis de cine", "guionismo", "cámara", "edición", "teoría del cine", "comentario cultural", "hablar en público", "investigación", "marketing en redes sociales", "escritura creativa"],
      experience: [
        {
          title: "Crítico de Cine Senior",
          company: "Cinephilia Magazine",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la audiencia en un 30% durante el primer año a través de contenido atractivo y campañas en redes sociales.",
            "Publicué más de 100 reseñas con una calificación promedio de 4.5 estrellas.",
            "Organicé un evento de discusión de cine que atrajo a más de 200 asistentes.",
          ],
        },
        {
          title: "Crítico de Cine",
          company: "Film Fanatic Blog",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Revisé más de 150 películas, contribuyendo a un aumento del 40% en el tráfico del blog.",
            "Colaboré con cineastas para entrevistas exclusivas, mejorando el compromiso de la audiencia.",
            "Implementé estrategias de SEO que mejoraron la visibilidad en motores de búsqueda en un 50%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Los Angeles", degree: "B.S.", field: "Estudios Cinematográficos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certificate in Film Criticism", issuer: "New York Film Academy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de crítico de cine?", answer: "Un currículum de crítico de cine debe incluir su experiencia laboral, habilidades relevantes, educación y cualquier publicación o crítica destacada." },
      { question: "¿Cómo destacar mi currículum de crítico de cine?", answer: "Para destacar su currículum, enfoque en sus logros específicos y utilize palabras clave relevantes en la industria." },
      { question: "¿Qué habilidades necesita un crítico de cine?", answer: "Las habilidades clave incluyen análisis crítico, escritura creativa, conocimientos de cine y habilidades de comunicación." },
    ],
  },
  "flash-designer": {
    slug: "curriculum-diseñador-flash",
    title: "Currículum de Diseñador Flash",
    keywords: ["currículum de diseñador flash", "CV de diseñador flash", "ejemplo currículum diseñador flash", "plantilla CV diseñador flash"],
    searchIntents: ["cómo escribir currículum de diseñador flash", "ejemplos currículum diseñador flash", "mejor formato CV diseñador flash"],
    topSkills: ["Adobe Animate", "ActionScript", "Diseño UI/UX", "Animación", "Diseño Gráfico", "Diseño Responsivo", "Desarrollo Web", "Diseño de Interacción", "Creative Suite", "HTML5"],
    atsKeywords: ["Diseñador Flash", "Especialista en Animación", "Artista Multimedia", "Diseñador Web", "Medios Interactivos", "Comunicación Visual", "Interfaz de Usuario", "Experiencia del Usuario", "Diseño Digital", "Creatividad", "Gestión de Proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Diseñador Flash",
      summary: "Diseñador Flash creativo con más de 5 años de experiencia en diseño multimedia y animaciones interactivas, logrando un aumento del 30% en la participación de usuarios a través de diseños innovadores.",
      skills: ["Adobe Animate", "ActionScript", "Diseño UI/UX", "Animación", "Diseño Gráfico", "Diseño Responsivo", "Desarrollo Web", "Diseño de Interacción", "Creative Suite", "HTML5"],
      experience: [
        {
          title: "Diseñador Flash Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la participación de usuarios en un 30% a través de animaciones interactivas en plataformas web.",
            "Dirigí un equipo de 5 diseñadores para completar un proyecto de alto perfil 2 semanas antes de lo programado.",
            "Desarrollé un nuevo estilo de animación que aumentó las calificaciones de satisfacción del cliente en un 25%.",
          ],
        },
        {
          title: "Diseñador Flash",
          company: "Digital Media Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé más de 50 banners publicitarios interactivos que resultaron en un aumento del 15% en las tasas de clic.",
            "Colaboré con desarrolladores para mejorar la responsividad del sitio web, mejorando los tiempos de carga en un 20%.",
            "Diseñé una serie de animaciones educativas que recibieron comentarios positivos tanto de clientes como de usuarios.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of California", degree: "B.S.", field: "Animación y Medios Interactivos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Diseñador Flash?", answer: "Un currículum de Diseñador Flash debe incluir habilidades técnicas, experiencia en proyectos relevantes, y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Diseñador Flash?", answer: "Para destacar tu currículum, utiliza un diseño limpio, incluye logros cuantificables y personaliza tu carta de presentación." },
      { question: "¿Qué habilidades necesita un Diseñador Flash?", answer: "Un Diseñador Flash necesita habilidades en animación, diseño gráfico, programación en ActionScript y una buena comprensión de UI/UX." },
    ],
  },
  "footwear-designer": {
    slug: "disenador-de-calzado",
    title: "Diseñador de Calzado",
    keywords: ["currículum de Diseñador de Calzado", "CV de Diseñador de Calzado", "ejemplo currículum Diseñador de Calzado", "plantilla CV Diseñador de Calzado"],
    searchIntents: ["cómo escribir currículum de Diseñador de Calzado", "ejemplos currículum Diseñador de Calzado", "mejor formato CV Diseñador de Calzado"],
    topSkills: ["Diseño de Calzado", "Análisis de Tendencias", "Selección de Materiales", "Dibujo Técnico", "Modelado 3D", "Desarrollo de Marca", "Desarrollo de Producto", "Investigación de Mercado", "Prácticas de Sostenibilidad", "Perspectivas del Consumidor"],
    atsKeywords: ["calzado", "diseño", "innovación", "prototipado", "manufactura", "moda", "creativo", "tendencias", "colaboración", "gestión de proyectos", "presentación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Calzado",
      summary: "Diseñador de Calzado dinámico con más de 7 años de experiencia creando colecciones innovadoras de calzado que aumentaron las ventas en un 25% en el último año fiscal. Historial demostrado en liderar proyectos de diseño desde el concepto hasta la producción.",
      skills: ["Diseño de Calzado", "Análisis de Tendencias", "Selección de Materiales", "Dibujo Técnico", "Modelado 3D", "Desarrollo de Marca", "Desarrollo de Producto", "Investigación de Mercado", "Prácticas de Sostenibilidad", "Perspectivas del Consumidor"],
      experience: [
        {
          title: "Diseñador de Calzado Senior",
          company: "Nike",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré el diseño de una nueva línea de zapatillas que generó $1M en ingresos dentro del primer trimestre.",
            "Aumenté la eficiencia de producción en un 30% a través de elecciones innovadoras de diseño y materiales.",
            "Colaboré con marketing para lanzar una campaña que aumentó el reconocimiento de marca en un 40%.",
          ],
        },
        {
          title: "Diseñador de Calzado",
          company: "Adidas",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé una colección de calzado de edición limitada que se agotó en 3 días.",
            "Creé opciones de calzado sostenibles que contribuyeron a una reducción del 15% en el desperdicio de materiales.",
            "Desarrollé un bucle de retroalimentación del consumidor que mejoró las calificaciones de satisfacción del cliente en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Diseño de Calzado", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Footwear Designer", issuer: "Footwear Design Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador de Calzado en su currículum?", answer: "Un Diseñador de Calzado debe incluir su experiencia laboral, habilidades técnicas, logros en proyectos previos, así como su educación y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Diseñador de Calzado?", answer: "Para destacar, asegúrate de resaltar tus logros más significativos, utiliza palabras clave de la industria y presenta un portafolio visual de tu trabajo." },
      { question: "¿Qué habilidades necesita un Diseñador de Calzado?", answer: "Las habilidades clave incluyen diseño creativo, conocimiento de tendencias de moda, experiencia en selección de materiales, y habilidades técnicas en dibujo y modelado 3D." },
    ],
  },
  "freelance-writer-and-editor": {
    slug: "escritor-y-editor-freelance",
    title: "Escritor y Editor Freelance",
    keywords: ["currículum de escritor freelance", "CV de editor freelance", "ejemplo currículum escritor freelance", "plantilla CV editor freelance"],
    searchIntents: ["cómo escribir currículum de escritor freelance", "ejemplos currículum editor freelance", "mejor formato CV escritor freelance"],
    topSkills: ["Creación de Contenido", "Edición", "Redacción SEO", "Redacción Publicitaria", "Redacción Técnica", "Redacción Creativa", "Investigación", "Gestión de Redes Sociales", "Corrección de Estilo", "Gestión de Proyectos"],
    atsKeywords: ["Escritor Freelance", "Escritor de Contenido", "Editor", "Redactor Publicitario", "Especialista en SEO", "Escritor Creativo", "Editor Técnico", "Estratega de Contenido", "Escritor de Blog", "Escritor de Redes Sociales", "Corrector de Estilo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Escritor y Editor Freelance",
      summary: "Escritor y Editor Freelance con más de 5 años de experiencia en la creación de contenido atractivo para diversas plataformas. Aumenté con éxito el compromiso de los clientes en un 30% a través de estrategias de contenido dirigidas.",
      skills: ["Creación de Contenido", "Edición", "Redacción SEO", "Redacción Publicitaria", "Redacción Técnica", "Redacción Creativa", "Investigación", "Gestión de Redes Sociales", "Corrección de Estilo", "Gestión de Proyectos"],
      experience: [
        {
          title: "Escritor Senior",
          company: "Content Creators Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el compromiso de contenido de los clientes en un 30% a través de estrategias de redacción personalizadas.",
            "Gestioné una cartera de 15 clientes, asegurando la entrega oportuna de artículos de alta calidad.",
            "Desarrollé un calendario de contenido que mejoró la eficiencia del flujo de trabajo en un 25%.",
          ],
        },
        {
          title: "Escritor de Contenido",
          company: "Digital Marketing Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Escribí más de 200 artículos que mejoraron la presencia en línea de la empresa.",
            "Colaboré con el equipo de marketing para lanzar un blog exitoso que aumentó el tráfico del sitio web en un 40%.",
            "Edite y corregí contenido para diversas publicaciones, asegurando la adherencia a las pautas de la marca.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Comunicación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Writer", issuer: "Writers Guild", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Escritor y Editor Freelance en su currículum?", answer: "Incluir experiencia relevante, habilidades específicas, y ejemplos de trabajos previos." },
      { question: "¿Cómo destacar mi currículum de Escritor y Editor Freelance?", answer: "Usar un formato claro y conciso, y resaltar logros cuantificables." },
      { question: "¿Qué habilidades necesita un Escritor y Editor Freelance?", answer: "Habilidades en redacción, edición, SEO, gestión de contenido y comunicación." },
    ],
  },
  "game-producer": {
    slug: "curriculum-productor-de-juegos",
    title: "Currículum de Productor de Juegos",
    keywords: ["currículum de productor de juegos", "CV de productor de juegos", "ejemplo currículum productor de juegos", "plantilla CV productor de juegos"],
    searchIntents: ["cómo escribir currículum de productor de juegos", "ejemplos currículum productor de juegos", "mejor formato CV productor de juegos"],
    topSkills: ["Gestión de Proyectos", "Liderazgo de Equipos", "Presupuestación", "Diseño de Juegos", "Metodologías Ágiles", "Comunicación con Interesados", "Gestión de Riesgos", "Aseguramiento de Calidad", "Programación", "Estrategias de Marketing"],
    atsKeywords: ["producción de juegos", "coordinador de proyectos", "ágil", "scrum", "colaboración en equipo", "gestión de presupuesto", "desarrollo de juegos", "equipos multifuncionales", "seguimiento de hitos", "métricas de rendimiento", "pruebas de juegos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Productor de Juegos",
      summary: "Productor de Juegos dinámico con más de 8 años de experiencia liderando proyectos de desarrollo de juegos. Ha entregado con éxito múltiples títulos que generaron más de $5 millones en ingresos.",
      skills: ["Gestión de Proyectos", "Liderazgo de Equipos", "Presupuestación", "Diseño de Juegos", "Metodologías Ágiles", "Comunicación con Interesados", "Gestión de Riesgos", "Aseguramiento de Calidad", "Programación", "Estrategias de Marketing"],
      experience: [
        {
          title: "Productor de Juegos Senior",
          company: "Epic Games",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré la producción de un título de juego importante que alcanzó más de $3 millones en ventas durante el primer mes.",
            "Gestioné un equipo de más de 30 desarrolladores, asegurando la entrega a tiempo de los hitos del proyecto.",
            "Implementé nuevas herramientas de gestión de proyectos que aumentaron la eficiencia del equipo en un 20%.",
          ],
        },
        {
          title: "Productor de Juegos",
          company: "Electronic Arts",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Produje un juego aclamado por la crítica que recibió un 90% de calificación en Metacritic.",
            "Coordiné equipos interdepartamentales para lanzar un juego móvil que alcanzó 1 millón de descargas en el primer mes.",
            "Optimizé los procesos de producción, reduciendo el tiempo de desarrollo en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Diseño de Juegos y Medios Interactivos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Scrum Master", issuer: "Scrum Alliance", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Game Producer Resume en su currículum?", answer: "Un currículum de productor de juegos debe incluir experiencia relevante, habilidades específicas de producción y ejemplos de logros en proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Game Producer Resume?", answer: "Para destacar su currículum, incluya métricas claras de éxito, use un formato limpio y resalte sus habilidades más relevantes." },
      { question: "¿Qué habilidades necesita un Game Producer Resume?", answer: "Las habilidades clave incluyen gestión de proyectos, liderazgo, comunicación efectiva y conocimiento en diseño de juegos." },
    ],
  },
  "ghostwriter-resume": {
    slug: "curriculum-vida-ghostwriter",
    title: "Currículum de Ghostwriter",
    keywords: ["currículum de ghostwriter", "CV de ghostwriter", "ejemplo currículum ghostwriter", "plantilla CV ghostwriter"],
    searchIntents: ["cómo escribir currículum de ghostwriter", "ejemplos currículum ghostwriter", "mejor formato CV ghostwriter"],
    topSkills: ["Redacción Creativa", "Edición", "Investigación", "Narración de Historias", "Redacción SEO", "Estrategia de Contenidos", "Redacción Publicitaria", "Gestión de Proyectos", "Gestión del Tiempo", "Comunicación con Clientes"],
    atsKeywords: ["ghostwriting", "desarrollo de manuscritos", "creación de contenido", "edición", "redacción creativa", "habilidades de investigación", "desarrollo de historias", "experiencia en SEO", "proceso de publicación", "redacción freelance", "relaciones con clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Ghostwriter",
      summary: "Ghostwriter experimentado con más de 6 años en la industria, especializado en transformar ideas en narrativas atractivas. Ha escrito con éxito más de 15 obras publicadas que han generado más de $500,000 en ventas.",
      skills: ["Redacción Creativa", "Edición", "Investigación", "Narración de Historias", "Redacción SEO", "Estrategia de Contenidos", "Redacción Publicitaria", "Gestión de Proyectos", "Gestión del Tiempo", "Comunicación con Clientes"],
      experience: [
        {
          title: "Ghostwriter Senior",
          company: "Elite Writing Agency",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los índices de satisfacción del cliente en un 30% a través de estrategias de comunicación mejoradas.",
            "Escribí más de 10 novelas best-seller, contribuyendo a más de $300,000 en regalías.",
            "Desarrollé y ejecuté estrategias de contenidos para clientes, resultando en un aumento del 50% en la interacción.",
          ],
        },
        {
          title: "Ghostwriter",
          company: "Creative Content Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé con éxito más de 50 proyectos de ghostwriting en varios géneros.",
            "Ayudé a los autores a lograr la publicación, resultando en un aumento del 40% en su visibilidad.",
            "Colaboré con equipos de marketing para mejorar el mensaje de la marca, llevando a un aumento del 20% en la adquisición de clientes.",
          ],
        },
      ],
      education: [
        { institution: "University of Creative Arts", degree: "B.S.", field: "Redacción Creativa", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Ghostwriter", issuer: "Ghostwriters Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ghostwriter Resume en su currículum?", answer: "Un currículum de ghostwriter debe incluir experiencias relevantes, habilidades específicas, y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Ghostwriter Resume?", answer: "Para destacar, asegúrate de resaltar tus logros más significativos y las métricas de éxito en tus proyectos anteriores." },
      { question: "¿Qué habilidades necesita un Ghostwriter Resume?", answer: "Las habilidades clave incluyen redacción creativa, investigación, edición, y comunicación efectiva con los clientes." },
    ],
  },
  "graphic-artist": {
    slug: "artista-grafico",
    title: "Artista Gráfico",
    keywords: ["currículum de artista gráfico", "CV de artista gráfico", "ejemplo currículum artista gráfico", "plantilla CV artista gráfico"],
    searchIntents: ["cómo escribir currículum de artista gráfico", "ejemplos currículum artista gráfico", "mejor formato CV artista gráfico"],
    topSkills: ["Adobe Creative Suite", "Ilustración", "Tipografía", "Teoría del Color", "Pintura Digital", "Identidad de Marca", "Diseño Web", "Diseño Impreso", "Edición de Fotos", "Diseño UX/UI"],
    atsKeywords: ["diseño gráfico", "comunicación visual", "dirección creativa", "diseño de maquetación", "branding", "Adobe Photoshop", "Adobe Illustrator", "software gráfico", "medios digitales", "gestión de proyectos", "colaboración"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista Gráfico",
      summary: "Artista Gráfico Creativo con más de 5 años de experiencia en diseño visual y branding, logrando un aumento del 30% en el compromiso del cliente a través de diseños innovadores.",
      skills: ["Adobe Creative Suite", "Ilustración", "Tipografía", "Teoría del Color", "Pintura Digital", "Identidad de Marca", "Diseño Web", "Diseño Impreso", "Edición de Fotos", "Diseño UX/UI"],
      experience: [
        {
          title: "Artista Gráfico Senior",
          company: "Creative Designs Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo de diseño que aumentó las puntuaciones de satisfacción del cliente en un 25%",
            "Desarrollé pautas de branding para 15 nuevos lanzamientos de productos",
            "Creé materiales de marketing que contribuyeron a un aumento de ingresos de $50,000",
          ],
        },
        {
          title: "Artista Gráfico",
          company: "Design Studio 2",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé más de 100 activos impresos y digitales para clientes",
            "Colaboré con equipos de marketing para producir campañas publicitarias exitosas",
            "Logré una reducción del 20% en el tiempo de entrega de proyectos a través de procesos optimizados",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Chicago", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Artista Gráfico en su currículum?", answer: "Incluir habilidades relevantes, experiencia laboral, y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Artista Gráfico?", answer: "Utilizar un diseño limpio, resaltar logros cuantificables y personalizar para cada solicitud." },
      { question: "¿Qué habilidades necesita un Artista Gráfico?", answer: "Creatividad, dominio de software de diseño, y habilidades en comunicación visual." },
    ],
  },
  "graphic-design-intern": {
    slug: "practicas-diseno-grafico",
    title: "Practicante de Diseño Gráfico",
    keywords: ["currículum de practicante de diseño gráfico", "CV de practicante de diseño gráfico", "ejemplo currículum practicante de diseño gráfico", "plantilla CV practicante de diseño gráfico"],
    searchIntents: ["cómo escribir currículum de practicante de diseño gráfico", "ejemplos currículum practicante de diseño gráfico", "mejor formato CV practicante de diseño gráfico"],
    topSkills: ["Adobe Photoshop", "Adobe Illustrator", "InDesign", "Sketch", "CorelDRAW", "Tipografía", "Teoría del Color", "Branding", "Diseño Web", "Diseño Impreso"],
    atsKeywords: ["diseño gráfico", "creativo", "comunicación visual", "diseño de maquetación", "diseño digital", "ilustración", "branding", "UX/UI", "portafolio", "colaboración en equipo", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Diseño Gráfico",
      summary: "Practicante de diseño gráfico motivado con 2 años de experiencia creando contenido visual atractivo. Aumentó exitosamente el compromiso del usuario en un 30% a través de soluciones de diseño innovadoras.",
      skills: ["Adobe Photoshop", "Adobe Illustrator", "InDesign", "Sketch", "CorelDRAW", "Tipografía", "Teoría del Color", "Branding", "Diseño Web", "Diseño Impreso"],
      experience: [
        {
          title: "Diseñador Gráfico Junior",
          company: "Creative Solutions Co.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Diseñé materiales de marketing que aumentaron las consultas de clientes en un 25%",
            "Colaboré en un proyecto de equipo que ganó un premio local de diseño",
            "Creé una serie de gráficos para redes sociales que aumentaron el compromiso en un 40%",
          ],
        },
        {
          title: "Practicante de Diseño Gráfico",
          company: "Innovative Design Agency",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en el rediseño del logotipo de la empresa, mejorando el reconocimiento de marca",
            "Desarrollé presentaciones para clientes que mejoraron las tasas de aprobación de proyectos",
            "Produje gráficos de alta calidad para sitios web de clientes, resultando en un aumento del 15% en el tráfico",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Design", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Associate", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un practicante de diseño gráfico en su currículum?", answer: "Un practicante de diseño gráfico debe incluir su experiencia relevante, habilidades técnicas, proyectos destacados y educación." },
      { question: "¿Cómo destacar mi currículum de practicante de diseño gráfico?", answer: "Destaca tus proyectos más impactantes y utiliza un diseño atractivo para mostrar tus habilidades." },
      { question: "¿Qué habilidades necesita un practicante de diseño gráfico?", answer: "Las habilidades clave incluyen conocimientos en software de diseño, creatividad, comunicación visual y trabajo en equipo." },
    ],
  },
  "graphic-web-designer": {
    slug: "diseñador-web-gráfico",
    title: "Diseñador Web Gráfico",
    keywords: ["currículum de Diseñador Web Gráfico", "CV de Diseñador Web Gráfico", "ejemplo currículum Diseñador Web Gráfico", "plantilla CV Diseñador Web Gráfico"],
    searchIntents: ["cómo escribir currículum de Diseñador Web Gráfico", "ejemplos currículum Diseñador Web Gráfico", "mejor formato CV Diseñador Web Gráfico"],
    topSkills: ["Adobe Creative Suite", "HTML/CSS", "JavaScript", "Diseño de Interfaces de Usuario", "Experiencia de Usuario", "Diseño Web Responsivo", "Branding", "Tipografía", "Teoría del Color", "Principios de SEO"],
    atsKeywords: ["diseño gráfico", "diseño web", "UX/UI", "branding", "diseño responsivo", "marketing digital", "diseño visual", "prototipado", "ilustración", "gestión de proyectos", "colaboración en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador Web Gráfico",
      summary: "Diseñador Web Gráfico creativo con más de 5 años de experiencia en la entrega de diseños de alta calidad. Aumentó con éxito el compromiso de los clientes en un 40% a través de soluciones web innovadoras.",
      skills: ["Adobe Creative Suite", "HTML/CSS", "JavaScript", "Diseño de Interfaces de Usuario", "Experiencia de Usuario", "Diseño Web Responsivo", "Branding", "Tipografía", "Teoría del Color", "Principios de SEO"],
      experience: [
        {
          title: "Diseñador Web Gráfico Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un proyecto de rediseño que aumentó el tráfico del sitio web en un 25%",
            "Desarrollé la identidad de marca para más de 10 lanzamientos de productos exitosos",
            "Colaboré con marketing para mejorar las tasas de conversión en un 15%",
          ],
        },
        {
          title: "Diseñador Web Gráfico",
          company: "Design Agency Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé e implementé interfaces amigables para el usuario en más de 15 sitios web",
            "Reduje el tiempo de entrega de proyectos en un 20% a través de procesos optimizados",
            "Mejoré las calificaciones de satisfacción del cliente en un 30% a través de una comunicación efectiva",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of California", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador Web Gráfico en su currículum?", answer: "Un Diseñador Web Gráfico debe incluir su experiencia en diseño, habilidades técnicas, y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Diseñador Web Gráfico?", answer: "Utiliza un formato limpio, destaca tus logros y personaliza el currículum para cada oferta laboral." },
      { question: "¿Qué habilidades necesita un Diseñador Web Gráfico?", answer: "Las habilidades clave incluyen diseño de interfaces, experiencia de usuario, y conocimiento de herramientas como Adobe Creative Suite." },
    ],
  },
  "hair-stylist": {
    slug: "estilista-de-cabello",
    title: "Estilista de Cabello",
    keywords: ["currículum de estilista de cabello", "CV de estilista de cabello", "ejemplo currículum estilista de cabello", "plantilla CV estilista de cabello"],
    searchIntents: ["cómo escribir currículum de estilista de cabello", "ejemplos currículum estilista de cabello", "mejor formato CV estilista de cabello"],
    topSkills: ["Corte de Cabello", "Técnicas de Coloración", "Estilización", "Servicio al Cliente", "Tratamientos Capilares", "Recogidos", "Aseo Masculino", "Conocimiento de Productos", "Estilos de Cabello a la Moda", "Manejo del Tiempo"],
    atsKeywords: ["Estilista de Cabello", "Gestión de Salón", "Consulta con Clientes", "Productos para Cabello", "Teoría del Color", "Habilidades con Tijeras", "Técnicas de Estilización", "Tratamientos Químicos", "Salud y Seguridad", "Retención de Clientes", "Colaboración en Equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Estilista de Cabello",
      summary: "Estilista de cabello experimentada con más de 5 años en la industria de la belleza, especializada en coloración y corte de cabello. Logré un aumento del 30% en la retención de clientes a través de un servicio excepcional.",
      skills: ["Corte de Cabello", "Técnicas de Coloración", "Estilización", "Servicio al Cliente", "Tratamientos Capilares", "Recogidos", "Aseo Masculino", "Conocimiento de Productos", "Estilos de Cabello a la Moda", "Manejo del Tiempo"],
      experience: [
        {
          title: "Estilista de Cabello Senior",
          company: "Salon Luxe",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 40% a través de consultas personalizadas.",
            "Logré $50,000 en ventas en 6 meses al promocionar productos para el cuidado del cabello.",
            "Entrené a 5 estilistas junior en técnicas avanzadas de coloración de cabello.",
          ],
        },
        {
          title: "Estilista de Cabello",
          company: "Bliss Hair Studio",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé una base de clientes leales, aumentando las visitas recurrentes en un 25%.",
            "Implementé un nuevo sistema de programación que redujo el tiempo de espera de los clientes en un 15%.",
            "Recibí el premio 'Mejor Estilista' en 2019 de una revista local de belleza.",
          ],
        },
      ],
      education: [
        { institution: "Beauty Institute of New York", degree: "Diploma", field: "Cosmetología", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Certified Hair Colorist", issuer: "American Board of Certified Hair Colorists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Hair Stylist en su currículum?", answer: "Un Hair Stylist debe incluir su experiencia, habilidades técnicas, certificaciones y logros destacados." },
      { question: "¿Cómo destacar mi currículum de Hair Stylist?", answer: "Utiliza un diseño limpio, resalta tus habilidades clave y logros cuantificables." },
      { question: "¿Qué habilidades necesita un Hair Stylist?", answer: "Un Hair Stylist necesita habilidades en corte de cabello, coloración, estilización, y un fuerte enfoque en el servicio al cliente." },
    ],
  },
  "hard-rock-hotels-copywriter": {
    slug: "hard-rock-hotels-copywriter",
    title: "Redactor de Hard Rock Hotels",
    keywords: ["currículum de Redactor de Hard Rock Hotels", "CV de Redactor de Hard Rock Hotels", "ejemplo currículum Redactor de Hard Rock Hotels", "plantilla CV Redactor de Hard Rock Hotels"],
    searchIntents: ["cómo escribir currículum de Redactor de Hard Rock Hotels", "ejemplos currículum Redactor de Hard Rock Hotels", "mejor formato CV Redactor de Hard Rock Hotels"],
    topSkills: ["Escritura Creativa", "Optimización SEO", "Narrativa de Marca", "Estrategia de Contenidos", "Gestión de Redes Sociales", "Campañas de Marketing", "Edición de Textos", "Habilidades de Investigación", "Colaboración", "Gestión del Tiempo"],
    atsKeywords: ["copywriting", "creación de contenidos", "branding", "marketing", "medios digitales", "compromiso del cliente", "material promocional", "redes sociales", "editorial", "estrategia", "publicidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Redactor de Hard Rock Hotels",
      summary: "Redactor dinámico con más de 5 años de experiencia en marketing de hospitalidad, conocido por aumentar el compromiso de la marca en un 40% a través de estrategias de contenido innovadoras.",
      skills: ["Escritura Creativa", "Optimización SEO", "Narrativa de Marca", "Estrategia de Contenidos", "Gestión de Redes Sociales", "Campañas de Marketing", "Edición de Textos", "Habilidades de Investigación", "Colaboración", "Gestión del Tiempo"],
      experience: [
        {
          title: "Redactor Senior",
          company: "Marriott International",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el tráfico del sitio web en un 30% mediante estrategias de marketing de contenido dirigidas",
            "Desarrollé textos para una campaña exitosa que generó $500K en ingresos en tres meses",
            "Colaboré con equipos de diseño y marketing para mejorar el mensaje de la marca en todas las plataformas",
          ],
        },
        {
          title: "Redactor",
          company: "Hilton Hotels",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé contenido promocional atractivo que mejoró el compromiso del cliente en un 25%",
            "Lideré un proyecto que optimizó el proceso de creación de contenido, reduciendo el tiempo de respuesta en un 15%",
            "Encabecé iniciativas en redes sociales que resultaron en un aumento del 10% en seguidores",
          ],
        },
      ],
      education: [
        { institution: "University of Florida", degree: "B.S.", field: "Marketing", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Content Marketing Specialist", issuer: "DigitalMarketer", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Redactor de Hard Rock Hotels en su currículum?", answer: "Incluye tus logros en redacción, estrategias de contenido y habilidades de marketing." },
      { question: "¿Cómo destacar mi currículum de Redactor de Hard Rock Hotels?", answer: "Enfócate en tus logros cuantificables y experiencia relevante en marketing de hospitalidad." },
      { question: "¿Qué habilidades necesita un Redactor de Hard Rock Hotels?", answer: "Habilidades clave incluyen escritura creativa, SEO, gestión de redes sociales y estrategia de contenidos." },
    ],
  },
  "ic-design-engineer": {
    slug: "ingeniero-de-diseno-de-ci",
    title: "Ingeniero de Diseño de CI",
    keywords: ["currículum de ingeniero de diseño de CI", "CV de ingeniero de diseño de CI", "ejemplo currículum ingeniero de diseño de CI", "plantilla CV ingeniero de diseño de CI"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de CI", "ejemplos currículum ingeniero de diseño de CI", "mejor formato CV ingeniero de diseño de CI"],
    topSkills: ["Diseño Analógico", "Diseño Digital", "Verilog", "VHDL", "Simulación SPICE", "Diseño de Layout", "Integridad de Señal", "DFT (Diseño para Pruebas)", "Diseño de FPGA", "Diseño de Señal Mixta"],
    atsKeywords: ["diseño de CI", "circuitos analógicos", "circuitos digitales", "VLSI", "ASIC", "herramientas CAD", "verificación de diseño", "ingeniería de pruebas", "lenguajes de descripción de hardware", "diseño de bajo consumo", "semiconductores"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de CI",
      summary: "Ingeniero de Diseño de CI con más de 5 años de experiencia en el desarrollo de circuitos integrados de alto rendimiento. Reduje con éxito el consumo de energía en un 30% en una línea de productos importante, asegurando el cumplimiento de las normas de la industria.",
      skills: ["Diseño Analógico", "Diseño Digital", "Verilog", "VHDL", "Simulación SPICE", "Diseño de Layout", "Integridad de Señal", "DFT (Diseño para Pruebas)", "Diseño de FPGA", "Diseño de Señal Mixta"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de CI",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que logró una reducción del 40% en el área de silicio para una nueva línea de productos, ahorrando más de $2 millones en costos de producción.",
            "Diseñé y verifiqué un ADC de 12 bits que superó las especificaciones de rendimiento en un 15%, lo que llevó a un aumento del 20% en la cuota de mercado.",
            "Implementé técnicas de DFT que mejoraron la cobertura de pruebas en un 25%, reduciendo significativamente el tiempo de lanzamiento al mercado.",
          ],
        },
        {
          title: "Ingeniero de Diseño de CI",
          company: "Qualcomm",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un transceptor RF de bajo consumo que redujo el consumo energético en un 35%, mejorando la longevidad del producto.",
            "Colaboré en un equipo multifuncional para completar un proyecto 3 meses antes de lo programado, resultando en un lanzamiento anticipado del producto.",
            "Redacté una documentación de diseño completa que mejoró la eficiencia del equipo y la transferencia de conocimientos.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified IC Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un IC Design Engineer en su currículum?", answer: "Incluir experiencia en diseño de circuitos, habilidades en lenguajes de descripción de hardware y logros significativos en proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de IC Design Engineer?", answer: "Resaltar proyectos exitosos, utilizar palabras clave relevantes y presentar resultados cuantificables." },
      { question: "¿Qué habilidades necesita un IC Design Engineer?", answer: "Conocimientos en diseño analógico y digital, simulaciones, y experiencia en herramientas CAD." },
    ],
  },
  "ic-designer": {
    slug: "diseñador-de-ci",
    title: "Diseñador de CI",
    keywords: ["currículum de diseñador de CI", "CV de diseñador de CI", "ejemplo currículum diseñador de CI", "plantilla CV diseñador de CI"],
    searchIntents: ["cómo escribir currículum de diseñador de CI", "ejemplos currículum diseñador de CI", "mejor formato CV diseñador de CI"],
    topSkills: ["Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Verilog", "VHDL", "Simulación SPICE", "Diseño de PCB", "Diseño de Circuitos RF", "Programación de FPGA", "Diseño de Layout", "Análisis de Integridad de Señal"],
    atsKeywords: ["Diseño de CI", "Simulación de Circuitos", "Diseño Mixto", "ASIC", "FPGA", "Optimización de Layout", "Verificación de Diseño", "Análisis de Tiempos", "Gestión de Energía", "Sistemas Embebidos", "Pruebas y Validación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de CI",
      summary: "Diseñador de CI con más de 5 años de experiencia en diseño de circuitos analógicos y digitales, logrando reducir el tiempo de ciclo de diseño en un 20% mientras mejoraba el rendimiento general del producto.",
      skills: ["Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Verilog", "VHDL", "Simulación SPICE", "Diseño de PCB", "Diseño de Circuitos RF", "Programación de FPGA", "Diseño de Layout", "Análisis de Integridad de Señal"],
      experience: [
        {
          title: "Diseñador de CI Senior",
          company: "Analog Devices",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que redujo el consumo de energía en un 30%, ahorrando a la empresa $500,000 anuales.",
            "Completé con éxito más de 10 diseños de alta complejidad, resultando en una tasa de éxito del 95% en el primer intento.",
            "Implementé un nuevo proceso de verificación que disminuyó los errores de diseño en un 25%.",
          ],
        },
        {
          title: "Diseñador de CI",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé y probé múltiples circuitos que mejoraron la claridad de la señal en un 15%.",
            "Desarrollé un diseño que mejoró la eficiencia de producción, reduciendo costos en $200,000 anuales.",
            "Colaboré con equipos multifuncionales para entregar proyectos antes de lo previsto.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Electronics Technician", issuer: "National Institute for Certification in Engineering Technologies", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un IC Designer en su currículum?", answer: "Un IC Designer debe incluir una sección clara de habilidades técnicas, experiencia laboral relevante, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de IC Designer?", answer: "Puede destacar su currículum utilizando palabras clave relevantes, mostrando logros cuantificables y personalizando su perfil para cada aplicación." },
      { question: "¿Qué habilidades necesita un IC Designer?", answer: "Un IC Designer necesita habilidades en diseño de circuitos, simulación, programación en Verilog/VHDL y experiencia en optimización de layout." },
    ],
  },
  "ic-layout-design-engineer": {
    slug: "ingeniero-de-diseno-de-layout-ic",
    title: "Ingeniero de Diseño de Layout IC",
    keywords: ["currículum de ingeniero de diseño de layout IC", "CV de ingeniero de diseño de layout IC", "ejemplo currículum ingeniero de diseño de layout IC", "plantilla CV ingeniero de diseño de layout IC"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de layout IC", "ejemplos currículum ingeniero de diseño de layout IC", "mejor formato CV ingeniero de diseño de layout IC"],
    topSkills: ["Cadence", "Mentor Graphics", "Diseño de Layout", "DFM/DFT", "Verificación Física", "Revisión de Reglas de Diseño (DRC)", "Layout vs. Esquemático (LVS)", "Simulación SPICE", "Experiencia en Nodo de Tecnología", "Análisis de Integridad de Señal"],
    atsKeywords: ["Diseño de IC", "Ingeniería de Layout", "Verificación de Silicio", "Tecnología de Procesos", "Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Herramientas EDA", "Integridad de Señal", "Integridad de Potencia", "Análisis de Tiempos", "Diseño para Fabricabilidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Layout IC",
      summary: "Ingeniero de Diseño de Layout IC con más de 5 años de experiencia en tecnologías avanzadas de semiconductores, especializado en diseño y verificación de layouts, logrando una reducción del 20% en el tiempo del ciclo de diseño.",
      skills: ["Cadence", "Mentor Graphics", "Diseño de Layout", "DFM/DFT", "Verificación Física", "Revisión de Reglas de Diseño (DRC)", "Layout vs. Esquemático (LVS)", "Simulación SPICE", "Experiencia en Nodo de Tecnología", "Análisis de Integridad de Señal"],
      experience: [
        {
          title: "Ingeniero Senior de Layout IC",
          company: "NVIDIA",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de errores de layout en un 30% a través de rigurosas verificaciones DRC, resultando en un tiempo de lanzamiento al mercado más rápido.",
            "Lideré un equipo de 5 ingenieros en el diseño de una GPU de alto rendimiento, logrando una mejora en el rendimiento de $1 millón en ahorros de producción.",
            "Implementé herramientas automatizadas de verificación de layout que disminuyeron el tiempo de verificación en un 25%.",
          ],
        },
        {
          title: "Ingeniero de Layout IC",
          company: "Intel Corporation",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé exitosamente más de 15 diseños complejos de IC, mejorando la eficiencia del área en un 15%.",
            "Colaboré con el equipo de diseño para optimizar el layout para la integridad de señales, mejorando el rendimiento en un 10%.",
            "Entrené a ingenieros junior en técnicas y mejores prácticas de layout, mejorando la productividad del equipo.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica y Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified IC Design Professional", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un ingeniero de diseño de layout IC en su currículum?", answer: "Incluir experiencia relevante en diseño de IC, herramientas EDA utilizadas y logros específicos." },
      { question: "¿Cómo destacar mi currículum de ingeniero de diseño de layout IC?", answer: "Enfatizar logros cuantificables y habilidades técnicas en el área de diseño de layouts." },
      { question: "¿Qué habilidades necesita un ingeniero de diseño de layout IC?", answer: "Conocimientos en herramientas de diseño como Cadence, Mentor Graphics, así como habilidades en DFM/DFT y verificación física." },
    ],
  },
  "ic-layout-designers": {
    slug: "diseñador-de-layout-de-ci",
    title: "Diseñador de Layout de CI",
    keywords: ["currículum de diseñador de layout de CI", "CV de diseñador de layout de CI", "ejemplo currículum diseñador de layout de CI", "plantilla CV diseñador de layout de CI"],
    searchIntents: ["cómo escribir currículum de diseñador de layout de CI", "ejemplos currículum diseñador de layout de CI", "mejor formato CV diseñador de layout de CI"],
    topSkills: ["Cadence", "Mentor Graphics", "Diseño de Layout", "Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Integridad de Señal", "DFT (Diseño para Pruebas)", "Verificación Física", "Tecnologías de Proceso", "Verificación de Reglas de Diseño"],
    atsKeywords: ["Diseño de CI", "Herramientas de Layout", "Herramientas CAD", "Simulación SPICE", "Diseño Físico", "Tapeout", "Verificación de Diseño", "Validación de Silicio", "Herramientas EDA", "Optimización de Rendimiento", "Análisis de Circuitos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Layout de CI",
      summary: "Diseñador de Layout de CI con más de 5 años de experiencia en la industria de semiconductores, especializado en diseños analógicos y digitales de alto rendimiento. Logré una reducción del 30% en el tiempo del ciclo de diseño a través de la optimización de procesos.",
      skills: ["Cadence", "Mentor Graphics", "Diseño de Layout", "Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Integridad de Señal", "DFT (Diseño para Pruebas)", "Verificación Física", "Tecnologías de Proceso", "Verificación de Reglas de Diseño"],
      experience: [
        {
          title: "Diseñador de Layout de CI Senior",
          company: "NVIDIA",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que logró una mejora del 25% en la eficiencia energética, resultando en un ahorro de costos de $500,000.",
            "Guié a ingenieros junior, mejorando el rendimiento del equipo y reduciendo el tiempo de incorporación en un 40%.",
            "Completé con éxito más de 15 diseños complejos a tiempo, mejorando el tiempo de lanzamiento al mercado del producto.",
          ],
        },
        {
          title: "Diseñador de Layout de CI",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé layouts de alta densidad que mejoraron el rendimiento de fabricación en un 20%.",
            "Colaboré en equipos multifuncionales para integrar nuevas tecnologías, resultando en un aumento del 15% en funcionalidad.",
            "Optimicé el proceso de diseño, reduciendo el tiempo hasta el tapeout en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica y Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Analog Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un IC Layout Designer en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de IC Layout Designer?", answer: "Utilizar palabras clave y logros cuantificables que demuestren tu impacto en proyectos anteriores." },
      { question: "¿Qué habilidades necesita un IC Layout Designer?", answer: "Dominio de herramientas de CAD, diseño de circuitos analógicos y digitales, y verificación de diseño." },
    ],
  },
  "integrated-circuit-design-engineer": {
    slug: "ingeniero-de-diseno-de-circuitos-integrados",
    title: "Ingeniero de Diseño de Circuitos Integrados",
    keywords: ["currículum de Ingeniero de Diseño de Circuitos Integrados", "CV de Ingeniero de Diseño de Circuitos Integrados", "ejemplo currículum Ingeniero de Diseño de Circuitos Integrados", "plantilla CV Ingeniero de Diseño de Circuitos Integrados"],
    searchIntents: ["cómo escribir currículum de Ingeniero de Diseño de Circuitos Integrados", "ejemplos currículum Ingeniero de Diseño de Circuitos Integrados", "mejor formato CV Ingeniero de Diseño de Circuitos Integrados"],
    topSkills: ["Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Verilog", "VHDL", "Simulación SPICE", "Diseño de PCB", "Análisis de Integridad de Señal", "Gestión de Energía", "Desarrollo de FPGA", "Herramientas CAD"],
    atsKeywords: ["Circuito Integrado", "Diseño de CI", "ASIC", "FPGA", "Análisis de Circuitos", "Diseño de Bajo Consumo", "Diseño de Alta Velocidad", "Sistema en Chip", "Verificación de Diseño", "Diseño de Disposición", "Pruebas y Medición"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Circuitos Integrados",
      summary: "Ingeniero de Diseño de Circuitos Integrados dedicado con más de 5 años de experiencia en el desarrollo de soluciones electrónicas innovadoras, habiendo logrado reducir el consumo de energía en un 30% en múltiples proyectos.",
      skills: ["Diseño de Circuitos Analógicos", "Diseño de Circuitos Digitales", "Verilog", "VHDL", "Simulación SPICE", "Diseño de PCB", "Análisis de Integridad de Señal", "Gestión de Energía", "Desarrollo de FPGA", "Herramientas CAD"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Circuitos Integrados",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un proyecto que logró una reducción del 25% en el área del chip, lo que resultó en un ahorro de costos de $500,000.",
            "Desarrollé un diseño de bajo consumo que mejoró la duración de la batería en un 40% para productos electrónicos de consumo.",
            "Implementé procesos de verificación de diseño que disminuyeron los errores en un 15% en los productos finales.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Circuitos Integrados",
          company: "Qualcomm",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al desarrollo de un procesador de alta velocidad que aumentó el rendimiento en un 20%.",
            "Mejoré la integridad de señal en los diseños, reduciendo la interferencia en un 10% en productos de comunicación inalámbrica.",
            "Colaboré con equipos multifuncionales para mejorar la eficiencia del diseño, lo que resultó en un 30% más rápido en el tiempo de lanzamiento al mercado.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Engineer", issuer: "National Council of Examiners for Engineering and Surveying", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Circuitos Integrados en su currículum?", answer: "Incluye tus habilidades técnicas, experiencia laboral relevante y proyectos destacados." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Circuitos Integrados?", answer: "Utiliza palabras clave relevantes y destaca tus logros cuantificables." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Circuitos Integrados?", answer: "Diseño de circuitos, simulación, gestión de energía y verificación de diseño." },
    ],
  },
  "interactive-producer": {
    slug: "productor-interactivo",
    title: "Productor Interactivo",
    keywords: ["currículum de Productor Interactivo", "CV de Productor Interactivo", "ejemplo currículum Productor Interactivo", "plantilla CV Productor Interactivo"],
    searchIntents: ["cómo escribir currículum de Productor Interactivo", "ejemplos currículum Productor Interactivo", "mejor formato CV Productor Interactivo"],
    topSkills: ["Gestión de Proyectos", "Producción de Medios Digitales", "Diseño de Experiencia del Usuario", "Estrategia de Contenidos", "Producción de Video", "Liderazgo de Equipos", "Gestión de Presupuestos", "Relaciones con Clientes", "Análisis de Datos", "Resolución Creativa de Problemas"],
    atsKeywords: ["medios interactivos", "producción digital", "multimedia", "creación de contenido", "metodología ágil", "storyboarding", "equipos multifuncionales", "gestión de campañas", "interacción del usuario", "cronogramas de producción", "aseguramiento de calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor Interactivo",
      summary: "Productor Interactivo dinámico con más de 5 años de experiencia en producción de medios digitales, especializado en interacción del usuario y narración multimedia. Dirigió con éxito proyectos que aumentaron la interacción del público en un 40% y redujeron los costos de producción en un 20%.",
      skills: ["Gestión de Proyectos", "Producción de Medios Digitales", "Diseño de Experiencia del Usuario", "Estrategia de Contenidos", "Producción de Video", "Liderazgo de Equipos", "Gestión de Presupuestos", "Relaciones con Clientes", "Análisis de Datos", "Resolución Creativa de Problemas"],
      experience: [
        {
          title: "Productor Interactivo Senior",
          company: "Big Media Corp",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un equipo multifuncional para producir una campaña multimedia que aumentó la interacción del usuario en un 40%",
            "Gestioné un presupuesto de $500,000 para proyectos de producción digital, reduciendo costos en un 20% a través de una asignación de recursos efectiva",
            "Desarrollé una nueva estrategia de contenido que mejoró las tasas de retención de la audiencia en un 30% durante un año",
          ],
        },
        {
          title: "Productor Interactivo",
          company: "Creative Solutions Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Produje más de 30 proyectos de medios interactivos con una tasa de satisfacción del cliente del 95%",
            "Implementé metodologías ágiles que mejoraron los tiempos de entrega de proyectos en un 25%",
            "Colaboré con diseñadores y desarrolladores para crear interfaces amigables para el usuario, resultando en un aumento del 15% en las puntuaciones de retroalimentación de los usuarios",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Producción de Medios Digitales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Digital Marketing Professional", issuer: "Digital Marketing Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Productor Interactivo en su currículum?", answer: "Un Productor Interactivo debe incluir su experiencia en gestión de proyectos, habilidades técnicas en producción digital, y logros específicos en interacciones de usuarios." },
      { question: "¿Cómo destacar mi currículum de Productor Interactivo?", answer: "Para destacar su currículum, utilice métricas específicas que demuestren su impacto en proyectos anteriores y resalte sus habilidades técnicas relevantes." },
      { question: "¿Qué habilidades necesita un Productor Interactivo?", answer: "Un Productor Interactivo necesita habilidades en gestión de proyectos, producción multimedia, diseño UX, y una fuerte capacidad para resolver problemas creativamente." },
    ],
  },
  "interior-design-assistant": {
    slug: "asistente-diseño-interiores",
    title: "Asistente de Diseño de Interiores",
    keywords: ["currículum de asistente de diseño de interiores", "CV de asistente de diseño de interiores", "ejemplo currículum asistente de diseño de interiores", "plantilla CV asistente de diseño de interiores"],
    searchIntents: ["cómo escribir currículum de asistente de diseño de interiores", "ejemplos currículum asistente de diseño de interiores", "mejor formato CV asistente de diseño de interiores"],
    topSkills: ["Planificación de Espacios", "Teoría del Color", "AutoCAD", "SketchUp", "Comunicación con Clientes", "Selección de Materiales", "Renderizado 3D", "Gestión de Proyectos", "Distribución de Muebles", "Presupuestación"],
    atsKeywords: ["Diseño de Interiores", "Software de Diseño", "Relaciones con Clientes", "Dibujo Técnico", "Habilidades de Presentación", "Home Staging", "Tendencias de Diseño", "Coordinación de Contratistas", "Optimización de Espacios", "Visitas al Sitio", "Desarrollo de Portafolio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Diseño de Interiores",
      summary: "Asistente de Diseño de Interiores dedicado con más de 5 años de experiencia en proyectos residenciales y comerciales, reconocido por mejorar la satisfacción del cliente en un 30% a través de una comunicación efectiva y soluciones de diseño.",
      skills: ["Planificación de Espacios", "Teoría del Color", "AutoCAD", "SketchUp", "Comunicación con Clientes", "Selección de Materiales", "Renderizado 3D", "Gestión de Proyectos", "Distribución de Muebles", "Presupuestación"],
      experience: [
        {
          title: "Asistente de Diseño de Interiores",
          company: "Design Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en el diseño de más de 50 espacios residenciales, resultando en un aumento del 25% en las referencias de clientes.",
            "Gestioné los cronogramas y presupuestos de proyectos, asegurando una entrega del 100% a tiempo.",
            "Desarrollé renderizados 3D que mejoraron la efectividad de las presentaciones a clientes en un 40%.",
          ],
        },
        {
          title: "Diseñador de Interiores Junior",
          company: "Creative Spaces LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé a los diseñadores principales en la creación de distribuciones interiores para más de 30 proyectos comerciales.",
            "Realicé entrevistas a clientes para determinar necesidades de diseño, mejorando la alineación del proyecto en un 20%.",
            "Coordiné la adquisición de materiales y mobiliario, ahorrando a la empresa $15,000 anuales.",
          ],
        },
      ],
      education: [
        { institution: "University of Design", degree: "B.S.", field: "Diseño de Interiores", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "NCIDQ Certification", issuer: "National Council for Interior Design Qualification", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Diseño de Interiores en su currículum?", answer: "Incluir experiencias relevantes, habilidades específicas de diseño y certificaciones pertinentes." },
      { question: "¿Cómo destacar mi currículum de Asistente de Diseño de Interiores?", answer: "Utilizar palabras clave específicas del sector y resaltar logros cuantificables." },
      { question: "¿Qué habilidades necesita un Asistente de Diseño de Interiores?", answer: "Habilidades en software de diseño, comunicación efectiva, y gestión de proyectos son fundamentales." },
    ],
  },
  "interior-design-consultant": {
    slug: "consultor-de-diseno-interior",
    title: "Consultor de Diseño Interior",
    keywords: ["currículum de consultor de diseño interior", "CV de consultor de diseño interior", "ejemplo currículum consultor de diseño interior", "plantilla CV consultor de diseño interior"],
    searchIntents: ["cómo escribir currículum de consultor de diseño interior", "ejemplos currículum consultor de diseño interior", "mejor formato CV consultor de diseño interior"],
    topSkills: ["Planificación de Espacios", "Teoría del Color", "Selección de Muebles", "Diseño de Iluminación", "Conocimiento de Textiles", "Gestión de Proyectos", "Modelado 3D", "Consulta con Clientes", "Gestión de Presupuestos", "Prácticas de Sostenibilidad"],
    atsKeywords: ["Diseño de Interiores", "AutoCAD", "SketchUp", "Tendencias de Diseño", "Merchandising Visual", "Códigos de Construcción", "Habilidades de Presentación", "Negociación de Contratos", "Estilo Interior", "Home Staging", "Planificación de Renovaciones"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Consultor de Diseño Interior",
      summary: "Consultor de Diseño Interior con más de 5 años de experiencia en la industria, especializado en espacios residenciales y comerciales. Aumentó la satisfacción del cliente en un 30% a través de soluciones de diseño innovadoras y una gestión de proyectos efectiva.",
      skills: ["Planificación de Espacios", "Teoría del Color", "Selección de Muebles", "Diseño de Iluminación", "Conocimiento de Textiles", "Gestión de Proyectos", "Modelado 3D", "Consulta con Clientes", "Gestión de Presupuestos", "Prácticas de Sostenibilidad"],
      experience: [
        {
          title: "Consultor Senior de Diseño Interior",
          company: "Design Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para rediseñar un espacio de oficina de 10,000 pies cuadrados, resultando en un aumento del 25% en la productividad de los empleados.",
            "Desarrollé un proyecto de diseño sostenible que redujo los costos de energía en un 15% para un cliente comercial.",
            "Gestioné con éxito un presupuesto de $500,000 para renovaciones residenciales, entregando proyectos a tiempo y por debajo del presupuesto.",
          ],
        },
        {
          title: "Diseñador de Interiores",
          company: "Creative Spaces LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé distribuciones interiores para más de 50 proyectos residenciales, logrando un 95% de tasa de satisfacción del cliente.",
            "Colaboré con contratistas y proveedores para asegurar la ejecución de proyectos de alta calidad.",
            "Presenté conceptos de diseño a los clientes, resultando en un aumento del 40% en la adopción de servicios.",
          ],
        },
      ],
      education: [
        { institution: "University of Design", degree: "B.S.", field: "Diseño Interior", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Interior Designer", issuer: "National Council for Interior Design Qualification", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Consultor de Diseño Interior en su currículum?", answer: "Un Consultor de Diseño Interior debe incluir su experiencia laboral, habilidades clave, proyectos destacados y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Consultor de Diseño Interior?", answer: "Para destacar su currículum, utilice palabras clave relevantes, incluya logros cuantificables y ajuste su currículum para cada puesto." },
      { question: "¿Qué habilidades necesita un Consultor de Diseño Interior?", answer: "Un Consultor de Diseño Interior necesita habilidades en planificación de espacios, gestión de proyectos, atención al cliente, y conocimiento en tendencias de diseño." },
    ],
  },
  "jewelry-designer": {
    slug: "diseñador-de-joyas",
    title: "Diseñador de Joyas",
    keywords: ["currículum de diseñador de joyas", "CV de diseñador de joyas", "ejemplo currículum diseñador de joyas", "plantilla CV diseñador de joyas"],
    searchIntents: ["cómo escribir currículum de diseñador de joyas", "ejemplos currículum diseñador de joyas", "mejor formato CV diseñador de joyas"],
    topSkills: ["Trabajo en metal", "Gemas", "Diseño CAD", "Dibujo", "Sourcing de materiales", "Estrategias de marketing", "Análisis de tendencias", "Consulta con clientes", "Diseño personalizado", "Gestión de proyectos"],
    atsKeywords: ["diseño de joyas", "software CAD", "joyería hecha a mano", "conocimiento de piedras preciosas", "servicio al cliente", "tendencias de diseño", "marca", "procesos de producción", "control de calidad", "ventas", "desarrollo de portafolios"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Joyas",
      summary: "Diseñador de Joyas innovador con más de 5 años de experiencia creando piezas únicas que han generado más de $500,000 en ventas. Historial comprobado de aumento de la satisfacción del cliente a través de diseños personalizados y un servicio excepcional.",
      skills: ["Trabajo en metal", "Gemas", "Diseño CAD", "Dibujo", "Sourcing de materiales", "Estrategias de marketing", "Análisis de tendencias", "Consulta con clientes", "Diseño personalizado", "Gestión de proyectos"],
      experience: [
        {
          title: "Diseñador de Joyas Senior",
          company: "Shimmering Creations",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 30% año tras año a través de un diseño innovador y estrategias de marketing.",
            "Diseñé una colección personalizada que ganó el premio a la Mejor Nueva Línea de Joyas en los Premios Nacionales de Joyería.",
            "Lideré un equipo de 5 diseñadores para lanzar con éxito una colección de temporada, resultando en un aumento del 40% en el compromiso del cliente.",
          ],
        },
        {
          title: "Diseñador de Joyas",
          company: "Elegant Gems",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé más de 200 piezas de joyería únicas que contribuyeron a un aumento del 25% en las visitas a la tienda.",
            "Colaboré con artesanos locales para mejorar la oferta de productos y fortalecer los lazos comunitarios.",
            "Implementé un nuevo sistema de retroalimentación de clientes que mejoró las calificaciones de satisfacción del cliente en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Diseño de Joyas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Gemologist", issuer: "Gemological Institute of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador de Joyas en su currículum?", answer: "Un Diseñador de Joyas debe incluir su experiencia en diseño, habilidades técnicas, y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Diseñador de Joyas?", answer: "Resalta tus proyectos más exitosos y personaliza tu currículum para cada trabajo al que postules." },
      { question: "¿Qué habilidades necesita un Diseñador de Joyas?", answer: "Un Diseñador de Joyas necesita habilidades en diseño, trabajo en metal, conocimiento de gemas, y atención al detalle." },
    ],
  },
  "kitchen-designer": {
    slug: "diseñador-de-cocinas",
    title: "Diseñador de Cocinas",
    keywords: ["currículum de Diseñador de Cocinas", "CV de Diseñador de Cocinas", "ejemplo currículum Diseñador de Cocinas", "plantilla CV Diseñador de Cocinas"],
    searchIntents: ["cómo escribir currículum de Diseñador de Cocinas", "ejemplos currículum Diseñador de Cocinas", "mejor formato CV Diseñador de Cocinas"],
    topSkills: ["Planificación del espacio", "Renderizado en 3D", "Selección de materiales", "Teoría del color", "Diseño de iluminación", "Comunicación con el cliente", "Gestión del presupuesto", "Gestión de proyectos", "AutoCAD", "Diseño de interiores"],
    atsKeywords: ["diseño de cocinas", "diseño de interiores", "planificación del espacio", "modelado en 3D", "relaciones con los clientes", "renovación", "gestión de proyectos", "presupuestación", "sourcing de materiales", "selección de color", "iluminación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Cocinas",
      summary: "Diseñador de Cocinas altamente calificado con más de 8 años de experiencia en la creación de diseños y distribuciones innovadoras de cocinas. Completó exitosamente más de 50 proyectos, aumentando la satisfacción del cliente en un 30%.",
      skills: ["Planificación del espacio", "Renderizado en 3D", "Selección de materiales", "Teoría del color", "Diseño de iluminación", "Comunicación con el cliente", "Gestión del presupuesto", "Gestión de proyectos", "AutoCAD", "Diseño de interiores"],
      experience: [
        {
          title: "Diseñador de Cocinas Senior",
          company: "Kitchens by Design",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en la entrega de proyectos en un 25% mediante la mejora de procesos de diseño.",
            "Logré un 95% de satisfacción del cliente basado en la retroalimentación de los clientes.",
            "Lideré un equipo que generó $500,000 en ingresos por renovaciones de cocinas.",
          ],
        },
        {
          title: "Diseñador de Cocinas Junior",
          company: "HomeStyle Interiors",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé exitosamente más de 30 remodelaciones de cocinas dentro de las limitaciones de presupuesto.",
            "Colaboré con contratistas para reducir el tiempo de instalación en un 15%.",
            "Desarrollé un programa de referencias de clientes que aumentó la adquisición de nuevos clientes en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "University of Interior Design", degree: "Licenciatura", field: "Diseño de Interiores", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Kitchen Designer", issuer: "National Kitchen & Bath Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador de Cocinas en su currículum?", answer: "Un Diseñador de Cocinas debe incluir su experiencia, habilidades técnicas y proyectos exitosos." },
      { question: "¿Cómo destacar mi currículum de Diseñador de Cocinas?", answer: "Destacar proyectos específicos y resultados obtenidos es clave para captar la atención." },
      { question: "¿Qué habilidades necesita un Diseñador de Cocinas?", answer: "Se requieren habilidades en diseño, planificación de espacios, y comunicación efectiva con el cliente." },
    ],
  },
  "level-designer": {
    slug: "diseñador-de-niveles",
    title: "Diseñador de Niveles",
    keywords: ["currículum de diseñador de niveles", "CV de diseñador de niveles", "ejemplo currículum diseñador de niveles", "plantilla CV diseñador de niveles"],
    searchIntents: ["cómo escribir currículum de diseñador de niveles", "ejemplos currículum diseñador de niveles", "mejor formato CV diseñador de niveles"],
    topSkills: ["Diseño de Niveles", "Mecánicas de Juego", "Modelado 3D", "Dominio de Motores de Juego", "Diseño de Experiencia de Usuario", "Scripting", "Gestión de Proyectos", "Colaboración", "Resolución de Problemas", "Creatividad"],
    atsKeywords: ["diseño de niveles", "diseño de juegos", "diseño de entornos", "Unity", "Unreal Engine", "modelado 3D", "mecánicas de juego", "pruebas de juego", "colaboración", "desarrollo de juegos", "narración visual"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Niveles",
      summary: "Diseñador de niveles creativo con más de 5 años de experiencia en el desarrollo de entornos y mecánicas de juego inmersivas. Aumentó con éxito la participación de los jugadores en un 30% a través de estrategias innovadoras de diseño de niveles.",
      skills: ["Diseño de Niveles", "Mecánicas de Juego", "Modelado 3D", "Dominio de Motores de Juego", "Diseño de Experiencia de Usuario", "Scripting", "Gestión de Proyectos", "Colaboración", "Resolución de Problemas", "Creatividad"],
      experience: [
        {
          title: "Diseñador de Niveles Senior",
          company: "Epic Games",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Rediseñé más de 10 niveles, lo que llevó a un aumento del 25% en la retención de jugadores.",
            "Colaboré con un equipo de 15 desarrolladores para crear un juego galardonado.",
            "Implementé mecanismos de retroalimentación de jugadores que mejoraron las puntuaciones de satisfacción del usuario en un 40%.",
          ],
        },
        {
          title: "Diseñador de Niveles",
          company: "Ubisoft",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé niveles atractivos para un juego de gran venta, contribuyendo a más de $2 millones en ventas.",
            "Reduje el tiempo de finalización de niveles en un 15% a través de un ritmo de juego efectivo.",
            "Trabajé en estrecha colaboración con artistas y programadores para mejorar la narración visual.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Entretenimiento Interactivo", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Game Designer", issuer: "International Game Developers Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Level Designer en su currículum?", answer: "Un Level Designer debe incluir sus proyectos anteriores, habilidades técnicas, y logros en el diseño de niveles." },
      { question: "¿Cómo destacar mi currículum de Level Designer?", answer: "Utiliza un formato claro, resalta tus logros y adapta tu currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Level Designer?", answer: "Las habilidades clave incluyen diseño de niveles, modelado 3D, y comprensión de mecánicas de juego." },
    ],
  },
  "linux-administrator": {
    slug: "administrador-linux",
    title: "Administrador de Linux",
    keywords: ["currículum de Administrador de Linux", "CV de Administrador de Linux", "ejemplo currículum Administrador de Linux", "plantilla CV Administrador de Linux"],
    searchIntents: ["cómo escribir currículum de Administrador de Linux", "ejemplos currículum Administrador de Linux", "mejor formato CV Administrador de Linux"],
    topSkills: ["Administración de Sistemas", "Scripting en Shell", "Configuración de Redes", "Gestión de Servidores", "Resolución de Problemas", "Protocolos de Seguridad", "Servicios en la Nube", "Virtualización", "Gestión de Copias de Seguridad", "Optimización del Rendimiento"],
    atsKeywords: ["Linux", "Ubuntu", "Red Hat", "CentOS", "Debian", "Scripting", "Redes", "Cortafuegos", "Resolución de Problemas", "Monitoreo", "Nube"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Administrador de Linux",
      summary: "Administrador de Linux dedicado con más de 5 años de experiencia en la gestión y mantenimiento de sistemas basados en Linux. Historial comprobado de optimización del rendimiento del sistema y aumento del tiempo de actividad en un 30%.",
      skills: ["Administración de Sistemas", "Scripting en Shell", "Configuración de Redes", "Gestión de Servidores", "Resolución de Problemas", "Protocolos de Seguridad", "Servicios en la Nube", "Virtualización", "Gestión de Copias de Seguridad", "Optimización del Rendimiento"],
      experience: [
        {
          title: "Administrador Senior de Linux",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el tiempo de actividad del servidor en un 30% mediante monitoreo y mantenimiento proactivo.",
            "Redujo el tiempo de respuesta promedio para la resolución de problemas en un 40% al implementar un nuevo sistema de tickets.",
            "Migró con éxito más de 50 servicios a un entorno en la nube, mejorando la escalabilidad.",
          ],
        },
        {
          title: "Administrador de Sistemas Linux",
          company: "Innovative Tech Corp.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimizó los procesos de copia de seguridad, reduciendo el tiempo de recuperación de datos en un 50%.",
            "Implementó protocolos de seguridad que disminuyeron los incidentes de seguridad en un 25%.",
            "Gestionó un equipo de 3 administradores junior, mejorando la productividad del equipo en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Red Hat Certified System Administrator", issuer: "Red Hat", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Administrador de Linux en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas y certificaciones específicas." },
      { question: "¿Cómo destacar mi currículum de Administrador de Linux?", answer: "Enfatizar logros cuantificables y habilidades específicas en tecnologías de Linux." },
      { question: "¿Qué habilidades necesita un Administrador de Linux?", answer: "Conocimientos en administración de sistemas, scripting, redes y seguridad." },
    ],
  },
  "make-up-artist": {
    slug: "curriculum-maquilladora",
    title: "Currículum de Maquilladora",
    keywords: ["currículum de maquilladora", "CV de maquilladora", "ejemplo currículum maquilladora", "plantilla CV maquilladora"],
    searchIntents: ["cómo escribir currículum de maquilladora", "ejemplos currículum maquilladora", "mejor formato CV maquilladora"],
    topSkills: ["Aplicación de Maquillaje", "Teoría del Color", "Cuidado de la Piel", "Maquillaje de Novia", "Maquillaje Editorial", "Maquillaje con Aerógrafo", "Maquillaje de Efectos Especiales", "Conocimiento de Productos", "Consulta con Clientes", "Gestión del Tiempo"],
    atsKeywords: ["maquilladora", "aplicación cosmética", "tendencias de belleza", "relaciones con clientes", "consulta de estilo", "maquillaje para eventos", "maquillaje de moda", "maquillaje teatral", "técnicas de maquillaje", "desarrollo de portafolio", "estándares de la industria"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Maquilladora",
      summary: "Maquilladora creativa y orientada a los detalles con más de 5 años de experiencia en la industria de la belleza, reconocida por realzar las características de los clientes y ofrecer un maquillaje de alta calidad para diversas ocasiones. Manejó con éxito el maquillaje para más de 300 eventos, logrando una tasa de satisfacción del cliente del 95%.",
      skills: ["Aplicación de Maquillaje", "Teoría del Color", "Cuidado de la Piel", "Maquillaje de Novia", "Maquillaje Editorial", "Maquillaje con Aerógrafo", "Maquillaje de Efectos Especiales", "Conocimiento de Productos", "Consulta con Clientes", "Gestión del Tiempo"],
      experience: [
        {
          title: "Maquilladora Senior",
          company: "Glamour Studio",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las reservas de clientes en un 30% mediante marketing efectivo en redes sociales.",
            "Colaboré con más de 50 fotógrafos para sesiones editoriales.",
            "Desarrollé un programa de capacitación que mejoró las habilidades de los artistas junior en un 40%.",
          ],
        },
        {
          title: "Maquilladora",
          company: "Beauty Bar",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné servicios de maquillaje para más de 200 bodas, logrando una tasa de satisfacción del cliente del 98%.",
            "Asistí en el lanzamiento de una nueva línea de maquillaje, resultando en $50,000 en ventas en el primer mes.",
            "Realicé talleres de maquillaje que atrajeron a más de 100 participantes.",
          ],
        },
      ],
      education: [
        { institution: "Beauty Institute", degree: "Diploma", field: "Maquillaje Artístico", startDate: "2014-08", endDate: "2015-05" },
      ],
      certifications: [
        { name: "Certified Makeup Artist", issuer: "Makeup Artist Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de maquilladora?", answer: "Debe incluir experiencia laboral relevante, habilidades claves en maquillaje, y detalles sobre la educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de maquilladora?", answer: "Enfatiza tus logros en eventos, la satisfacción del cliente, y cualquier especialidad en técnicas de maquillaje." },
      { question: "¿Qué habilidades necesita una maquilladora?", answer: "Habilidades en aplicación de maquillaje, cuidado de la piel, y atención al cliente son esenciales." },
    ],
  },
  "mask-ic-layout-designer": {
    slug: "diseñador-de-layout-de-máscara-ic",
    title: "Diseñador de Layout de Máscara IC",
    keywords: ["currículum de Diseñador de Layout de Máscara IC", "CV de Diseñador de Layout de Máscara IC", "ejemplo currículum Diseñador de Layout de Máscara IC", "plantilla CV Diseñador de Layout de Máscara IC"],
    searchIntents: ["cómo escribir currículum de Diseñador de Layout de Máscara IC", "ejemplos currículum Diseñador de Layout de Máscara IC", "mejor formato CV Diseñador de Layout de Máscara IC"],
    topSkills: ["Diseño de Layout", "Diseño de Circuitos", "Verificación Física", "Revisiones DRC y LVS", "Cadence Virtuoso", "Mentor Graphics", "EAGLE", "Simulación SPICE", "Diseño para Fabricación", "Experiencia en Nodo Tecnológico"],
    atsKeywords: ["IC Layout", "Diseño Físico", "Silicon Layout", "Desarrollo de Pcell", "Layout Personalizado", "Diseño Analógico", "Layout Digital", "Simulación Electromagnética", "Proceso de Tape-out", "Mejora de Rendimiento", "Kit de Diseño de Proceso"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Layout de Máscara IC",
      summary: "Diseñador de Layout de Máscara IC orientado a los detalles con más de 5 años de experiencia en diseño de semiconductores, especializado en layouts personalizados que mejoran el rendimiento en un 30%. Historial comprobado de tape-outs exitosos sin errores.",
      skills: ["Diseño de Layout", "Diseño de Circuitos", "Verificación Física", "Revisiones DRC y LVS", "Cadence Virtuoso", "Mentor Graphics", "EAGLE", "Simulación SPICE", "Diseño para Fabricación", "Experiencia en Nodo Tecnológico"],
      experience: [
        {
          title: "Diseñador Senior de Layout de Máscara IC",
          company: "Intel Corporation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para lograr una reducción del 25% en el tiempo de diseño, resultando en un ahorro de $200,000 anuales.",
            "Completé con éxito más de 15 tape-outs con un 100% de cumplimiento de las especificaciones de diseño.",
            "Implementé nuevas metodologías de verificación que mejoraron la precisión del diseño en un 40%.",
          ],
        },
        {
          title: "Diseñador de Layout de Máscara IC",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé layouts para ICs de RF que aumentaron las tasas de rendimiento en un 15%.",
            "Colaboré con ingenieros de diseño para optimizar layouts, reduciendo el consumo de energía en un 20%.",
            "Realicé revisiones DRC y LVS que resultaron en una disminución del 30% en los errores de diseño.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified IC Layout Designer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Mask IC Layout Designer en su currículum?", answer: "Incluya su experiencia en diseño, habilidades técnicas y logros destacados." },
      { question: "¿Cómo destacar mi currículum de Mask IC Layout Designer?", answer: "Enfóquese en resultados cuantificables y proyectos exitosos." },
      { question: "¿Qué habilidades necesita un Mask IC Layout Designer?", answer: "Habilidades clave incluyen diseño de circuitos, verificación física y uso de herramientas como Cadence y Mentor Graphics." },
    ],
  },
  "math-editor": {
    slug: "curriculum-editor-matematico",
    title: "Currículum de Editor Matemático",
    keywords: ["currículum de editor matemático", "CV de editor matemático", "ejemplo currículum editor matemático", "plantilla CV editor matemático"],
    searchIntents: ["cómo escribir currículum de editor matemático", "ejemplos currículum editor matemático", "mejor formato CV editor matemático"],
    topSkills: ["Análisis Matemático", "Edición", "Corrección de Pruebas", "Desarrollo de Contenido", "Redacción Técnica", "Investigación", "Atención al Detalle", "Gestión de Proyectos", "Colaboración", "Gestión del Tiempo"],
    atsKeywords: ["matemáticas", "editor", "corrección de pruebas", "publicación", "edición de contenido", "redacción académica", "edición técnica", "guías de estilo", "formato", "documentación", "aseguramiento de calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Editor Matemático",
      summary: "Editor Matemático dedicado con más de 5 años de experiencia en publicación académica. Mejoró la claridad y precisión del contenido, lo que resultó en una reducción del 30% en revisiones editoriales.",
      skills: ["Análisis Matemático", "Edición", "Corrección de Pruebas", "Desarrollo de Contenido", "Redacción Técnica", "Investigación", "Atención al Detalle", "Gestión de Proyectos", "Colaboración", "Gestión del Tiempo"],
      experience: [
        {
          title: "Editor Matemático Senior",
          company: "Wiley & Sons",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia de publicación en un 25% mediante procesos de edición optimizados",
            "Redujo las tasas de error en pruebas finales en un 40% al implementar un sistema de revisión integral",
            "Lideró un equipo de 5 editores para producir una serie de materiales educativos que alcanzaron a más de 10,000 estudiantes",
          ],
        },
        {
          title: "Editor Matemático",
          company: "Springer Nature",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Editó más de 50 artículos académicos logrando una tasa de aceptación del 95% en revistas revisadas por pares",
            "Colaboró con autores para mejorar la claridad, resultando en un aumento del 20% en las tasas de citación",
            "Desarrolló y mantuvo directrices editoriales que mejoraron la productividad del equipo en un 15%",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Matemáticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Editor", issuer: "American Society of Journalists and Authors", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Editor Matemático?", answer: "Debe incluir experiencia relevante, habilidades específicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Editor Matemático?", answer: "Enfatiza tus logros en términos de resultados y mejoras en procesos de edición." },
      { question: "¿Qué habilidades necesita un Editor Matemático?", answer: "Habilidades clave incluyen edición, corrección de pruebas, y conocimientos en redacción técnica." },
    ],
  },
  "memory-design-engineer": {
    slug: "ingeniero-de-diseño-de-memoria",
    title: "Ingeniero de Diseño de Memoria",
    keywords: ["currículum de Ingeniero de Diseño de Memoria", "CV de Ingeniero de Diseño de Memoria", "ejemplo currículum Ingeniero de Diseño de Memoria", "plantilla CV Ingeniero de Diseño de Memoria"],
    searchIntents: ["cómo escribir currículum de Ingeniero de Diseño de Memoria", "ejemplos currículum Ingeniero de Diseño de Memoria", "mejor formato CV Ingeniero de Diseño de Memoria"],
    topSkills: ["Diseño de Circuitos Digitales", "Arquitectura de Memoria", "Diseño de Alta Velocidad", "Verilog/SystemVerilog", "Diseño FPGA", "Diseño de Bajo Consumo", "Herramientas de Simulación", "Análisis de Integridad de Señal", "Cierre de Temporización", "Pruebas y Validación"],
    atsKeywords: ["Diseño de Memoria", "DRAM", "SRAM", "ASIC", "FPGA", "Simulación de Circuitos", "Verificación de Diseño", "Diseño Físico", "Diseño RTL", "Ingeniería Eléctrica", "Diseño de Chips"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Memoria",
      summary: "Ingeniero de Diseño de Memoria con más de 5 años de experiencia en el desarrollo de arquitecturas de memoria de alto rendimiento, logrando una reducción del 30% en la latencia y mejorando la eficiencia energética en un 20%.",
      skills: ["Diseño de Circuitos Digitales", "Arquitectura de Memoria", "Diseño de Alta Velocidad", "Verilog/SystemVerilog", "Diseño FPGA", "Diseño de Bajo Consumo", "Herramientas de Simulación", "Análisis de Integridad de Señal", "Cierre de Temporización", "Pruebas y Validación"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Memoria",
          company: "Intel Corporation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para diseñar una nueva arquitectura DRAM que redujo la latencia en un 30%",
            "Mejoré la eficiencia energética en sistemas de memoria en un 20%, resultando en ahorros significativos",
            "Colaboré con equipos multifuncionales para integrar soluciones de diseño en producción",
          ],
        },
        {
          title: "Ingeniero de Diseño de Memoria",
          company: "Micron Technology",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé soluciones de memoria innovadoras que mejoraron el rendimiento en un 15%",
            "Realicé pruebas que identificaron fallas críticas de diseño, reduciendo el tiempo de lanzamiento al mercado en un 10%",
            "Implementé procesos de verificación de diseño que aumentaron la confiabilidad de los chips de memoria",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica y Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified FPGA Designer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Memoria en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia relevante y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Memoria?", answer: "Utiliza palabras clave de la industria y resalta tus proyectos más exitosos." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Memoria?", answer: "Necesita habilidades en diseño de circuitos, verificación de diseño y simulación de circuitos." },
    ],
  },
  "motion-graphic-designer": {
    slug: "diseñador-grafico-en-movimiento",
    title: "Diseñador Gráfico en Movimiento",
    keywords: ["currículum de diseñador gráfico en movimiento", "CV de diseñador gráfico en movimiento", "ejemplo currículum diseñador gráfico en movimiento", "plantilla CV diseñador gráfico en movimiento"],
    searchIntents: ["cómo escribir currículum de diseñador gráfico en movimiento", "ejemplos currículum diseñador gráfico en movimiento", "mejor formato CV diseñador gráfico en movimiento"],
    topSkills: ["Adobe After Effects", "Adobe Premiere Pro", "Cinema 4D", "Animación", "Diseño Gráfico", "Storyboard", "Modelado 3D", "Edición de Video", "Efectos Visuales", "Tipografía"],
    atsKeywords: ["motion graphics", "visual storytelling", "animation techniques", "digital media", "design software", "creative direction", "project management", "team collaboration", "branding", "concept development", "client communication"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador Gráfico en Movimiento",
      summary: "Diseñador Gráfico en Movimiento creativo con más de 5 años de experiencia en la entrega de narrativas visuales atractivas. Aumentó con éxito la participación de los clientes en un 30% a través de estrategias innovadoras de contenido de video.",
      skills: ["Adobe After Effects", "Adobe Premiere Pro", "Cinema 4D", "Animación", "Diseño Gráfico", "Storyboard", "Modelado 3D", "Edición de Video", "Efectos Visuales", "Tipografía"],
      experience: [
        {
          title: "Diseñador Gráfico en Movimiento Senior",
          company: "Pixel Perfect Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la velocidad de entrega de proyectos para clientes en un 25% mediante la optimización de procesos de trabajo.",
            "Dirigí un equipo de 5 diseñadores para entregar una campaña publicitaria nacional que logró un aumento del 40% en el reconocimiento de marca.",
            "Creé una serie de videos explicativos animados que generaron más de $100,000 en nuevos contratos de clientes.",
          ],
        },
        {
          title: "Diseñador Gráfico en Movimiento",
          company: "Creative Media Agency",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé gráficos en movimiento atractivos para más de 50 proyectos de clientes, mejorando las calificaciones de satisfacción del cliente en un 15%.",
            "Colaboré con equipos de marketing para producir contenido animado que alcanzó más de 1 millón de visualizaciones en línea.",
            "Implementé nuevas técnicas de diseño que redujeron el tiempo de producción en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of California", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Motion Graphic Designer en su currículum?", answer: "Incluya sus habilidades técnicas, experiencia laboral relevante y ejemplos de proyectos." },
      { question: "¿Cómo destacar mi currículum de Motion Graphic Designer?", answer: "Resalte sus logros y proporcione enlaces a su portafolio en línea." },
      { question: "¿Qué habilidades necesita un Motion Graphic Designer?", answer: "Habilidades en software de diseño, técnicas de animación y narración visual." },
    ],
  },
  "motion-graphics-artist": {
    slug: "artista-de-motion-graphics",
    title: "Artista de Motion Graphics",
    keywords: ["currículum de artista de motion graphics", "CV de artista de motion graphics", "ejemplo currículum artista de motion graphics", "plantilla CV artista de motion graphics"],
    searchIntents: ["cómo escribir currículum de artista de motion graphics", "ejemplos currículum artista de motion graphics", "mejor formato CV artista de motion graphics"],
    topSkills: ["Adobe After Effects", "Cinema 4D", "Adobe Premiere Pro", "Diseño Gráfico", "Animación", "Storyboard", "Animación de Personajes", "Efectos Visuales", "Teoría del Color", "Tipografía"],
    atsKeywords: ["motion graphics", "edición de video", "modelado 3D", "animación", "Adobe Creative Suite", "diseño gráfico", "narración", "comunicación visual", "branding", "producción", "dirección de arte"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista de Motion Graphics",
      summary: "Artista de Motion Graphics creativo con más de 5 años de experiencia en el desarrollo de contenido visual atractivo. Aumentó con éxito el compromiso del cliente en un 40% a través de animaciones y diseños innovadores.",
      skills: ["Adobe After Effects", "Cinema 4D", "Adobe Premiere Pro", "Diseño Gráfico", "Animación", "Storyboard", "Animación de Personajes", "Efectos Visuales", "Teoría del Color", "Tipografía"],
      experience: [
        {
          title: "Artista Senior de Motion Graphics",
          company: "Pixar Animation Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un equipo de 5 para crear un video promocional que aumentó el compromiso de los espectadores en un 50%",
            "Desarrollé más de 30 gráficos animados para campañas en redes sociales, resultando en un aumento del 25% en el crecimiento de seguidores",
            "Implementé nuevas técnicas de animación que redujeron el tiempo de producción en un 15%",
          ],
        },
        {
          title: "Diseñador de Motion Graphics",
          company: "Buzzfeed",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé gráficos de motion graphics convincentes para más de 100 artículos, mejorando la retención de espectadores en un 30%",
            "Colaboré con equipos multifuncionales para desarrollar una serie de videos que ganó un Webby Award",
            "Optimizé los procesos de trabajo, reduciendo el tiempo de entrega del proyecto en un 20%",
          ],
        },
      ],
      education: [
        { institution: "Savannah College of Art and Design", degree: "B.S.", field: "Diseño de Medios en Movimiento", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Motion Graphics Artist en su currículum?", answer: "Incluir ejemplos de trabajos anteriores, habilidades técnicas y logros significativos." },
      { question: "¿Cómo destacar mi currículum de Motion Graphics Artist?", answer: "Resaltar proyectos exitosos y habilidades relevantes específicas para la industria." },
      { question: "¿Qué habilidades necesita un Motion Graphics Artist?", answer: "Conocimientos en software de diseño, creatividad, y habilidades de comunicación visual." },
    ],
  },
  "multimedia-designer": {
    slug: "diseñador-multimedia",
    title: "Diseñador Multimedia",
    keywords: ["currículum de Diseñador Multimedia", "CV de Diseñador Multimedia", "ejemplo currículum Diseñador Multimedia", "plantilla CV Diseñador Multimedia"],
    searchIntents: ["cómo escribir currículum de Diseñador Multimedia", "ejemplos currículum Diseñador Multimedia", "mejor formato CV Diseñador Multimedia"],
    topSkills: ["Diseño Gráfico", "Edición de Video", "Animación", "Diseño de Interfaz de Usuario", "Diseño Web", "Modelado 3D", "Ilustración Digital", "Fotografía", "Creación de Contenido para Redes Sociales", "Desarrollo de Marca"],
    atsKeywords: ["diseño gráfico", "producción de video", "Adobe Creative Suite", "gráficos en movimiento", "diseño UX/UI", "animación", "ilustración", "desarrollo web", "estrategia de contenido", "branding", "producción multimedia"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador Multimedia",
      summary: "Diseñador Multimedia creativo con más de 5 años de experiencia en diseño gráfico y producción de video. Aumentó con éxito el compromiso de los clientes en un 30% a través de campañas multimedia innovadoras.",
      skills: ["Diseño Gráfico", "Edición de Video", "Animación", "Diseño de Interfaz de Usuario", "Diseño Web", "Modelado 3D", "Ilustración Digital", "Fotografía", "Creación de Contenido para Redes Sociales", "Desarrollo de Marca"],
      experience: [
        {
          title: "Diseñador Multimedia Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó el compromiso en redes sociales en un 40% a través de contenido de video dinámico.",
            "Lideró un proyecto que resultó en un aumento del 25% en las calificaciones de satisfacción del cliente.",
            "Desarrolló una campaña multimedia que generó $50,000 en nuevos negocios.",
          ],
        },
        {
          title: "Diseñador Multimedia",
          company: "Visionary Media Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Produjo más de 100 proyectos de video de alta calidad para varios clientes.",
            "Colaboró con el equipo de marketing para diseñar un refresco de marca que mejoró el reconocimiento de la marca en un 20%.",
            "Creó infografías atractivas que aumentaron las comparticiones de contenido digital en un 35%.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of California", degree: "B.S.", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador Multimedia en su currículum?", answer: "Incluir habilidades técnicas, experiencia en proyectos y portafolio de trabajos." },
      { question: "¿Cómo destacar mi currículum de Diseñador Multimedia?", answer: "Usar un formato limpio, resaltar logros y personalizar para cada aplicación." },
      { question: "¿Qué habilidades necesita un Diseñador Multimedia?", answer: "Diseño gráfico, edición de video, animación y conocimientos en herramientas de diseño." },
    ],
  },
  "music-composer": {
    slug: "compositor-de-musica",
    title: "Compositor de Música",
    keywords: ["currículum de compositor de música", "CV de compositor de música", "ejemplo currículum compositor de música", "plantilla CV compositor de música"],
    searchIntents: ["cómo escribir currículum de compositor de música", "ejemplos currículum compositor de música", "mejor formato CV compositor de música"],
    topSkills: ["composición", "orquestación", "producción musical", "arreglos", "diseño de sonido", "teoría musical", "estaciones de trabajo de audio digital", "colaboración", "creatividad", "gestión del tiempo"],
    atsKeywords: ["composición musical", "música para cine", "composición de canciones", "arreglo", "software musical", "técnicas de producción", "edición de audio", "colaboración creativa", "géneros musicales", "actuación en vivo", "licencias de música"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Compositor de Música",
      summary: "Compositor de música experimentado con más de 5 años en la industria, conocido por producir bandas sonoras galardonadas y colaborar con artistas de primer nivel para mejorar sus proyectos.",
      skills: ["composición", "orquestación", "producción musical", "arreglos", "diseño de sonido", "teoría musical", "estaciones de trabajo de audio digital", "colaboración", "creatividad", "gestión del tiempo"],
      experience: [
        {
          title: "Compositor Musical Senior",
          company: "Epic Sound Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Compuse y produje más de 30 pistas para importantes estrenos cinematográficos, generando $500k en ingresos por licencias.",
            "Colaboré con artistas ganadores de Grammy, resultando en 3 sencillos en las listas de éxitos.",
            "Aumenté el tiempo de respuesta de los proyectos del estudio en un 20% a través de mejoras innovadoras en el flujo de trabajo.",
          ],
        },
        {
          title: "Compositor de Música",
          company: "Creative Beats",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé bandas sonoras originales para 15 películas independientes, recibiendo 4 premios en festivales.",
            "Desarrollé bandas sonoras para campañas publicitarias que lograron un incremento del 25% en la participación del público.",
            "Trabajé con un equipo para producir un sonido único para una banda local, lo que llevó a un contrato discográfico.",
          ],
        },
      ],
      education: [
        { institution: "Berklee College of Music", degree: "B.S.", field: "Composición para Cine", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Music Producer", issuer: "Music Production Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un compositor de música en su currículum?", answer: "Incluir su experiencia en composición, producción, y colaboraciones relevantes." },
      { question: "¿Cómo destacar mi currículum de compositor de música?", answer: "Resaltar logros, colaboraciones con artistas conocidos y habilidades técnicas." },
      { question: "¿Qué habilidades necesita un compositor de música?", answer: "Habilidades clave incluyen composición, orquestación, y uso de software musical." },
    ],
  },
  "network-administrator-design-group": {
    slug: "administrador-de-redes",
    title: "Administrador de Redes",
    keywords: ["currículum de Administrador de Redes", "CV de Administrador de Redes", "ejemplo currículum Administrador de Redes", "plantilla CV Administrador de Redes"],
    searchIntents: ["cómo escribir currículum de Administrador de Redes", "ejemplos currículum Administrador de Redes", "mejor formato CV Administrador de Redes"],
    topSkills: ["Configuración de Redes", "Resolución de Problemas", "Gestión de Firewall", "Configuración de VPN", "Active Directory", "Gestión de Servidores", "Monitoreo de Redes", "Servicios en la Nube", "Ciberseguridad", "Soporte Técnico"],
    atsKeywords: ["administración de redes", "LAN/WAN", "TCP/IP", "DNS", "DHCP", "seguridad de red", "virtualización", "ITIL", "Cisco", "Microsoft Certified"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Administrador de Redes",
      summary: "Administrador de Redes dedicado con más de 5 años de experiencia en la gestión y seguridad de redes a nivel empresarial. Reducción exitosa del tiempo de inactividad de la red en un 30% a través de monitoreo proactivo y optimización.",
      skills: ["Configuración de Redes", "Resolución de Problemas", "Gestión de Firewall", "Configuración de VPN", "Active Directory", "Gestión de Servidores", "Monitoreo de Redes", "Servicios en la Nube", "Ciberseguridad", "Soporte Técnico"],
      experience: [
        {
          title: "Administrador de Redes Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de la latencia de red en un 25% mediante mejoras en la infraestructura",
            "Implementación de un nuevo sistema de firewall que disminuyó las brechas de seguridad en un 40%",
            "Lideré un equipo para migrar a una solución basada en la nube, lo que resultó en un ahorro de costos de $50,000 anuales",
          ],
        },
        {
          title: "Administrador de Redes",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantenimiento del 99.9% de tiempo de actividad de la red mediante monitoreo y mantenimiento efectivos",
            "Optimización de la gestión de acceso de usuarios, mejorando el tiempo de respuesta en un 20%",
            "Realización de sesiones de capacitación para el personal, aumentando la alfabetización informática general en un 30%",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Tecnologías de la Información", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Cisco Certified Network Associate", issuer: "Cisco", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Administrador de Redes en su currículum?", answer: "Incluir experiencia en gestión de redes, habilidades técnicas y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Administrador de Redes?", answer: "Utilizar palabras clave del sector, resaltar logros y mantener un formato claro." },
      { question: "¿Qué habilidades necesita un Administrador de Redes?", answer: "Habilidades en configuración de redes, seguridad, soporte técnico y gestión de servidores." },
    ],
  },
  "news-editor": {
    slug: "editor-de-noticias",
    title: "Editor de Noticias",
    keywords: ["currículum de editor de noticias", "CV de editor de noticias", "ejemplo currículum editor de noticias", "plantilla CV editor de noticias"],
    searchIntents: ["cómo escribir currículum de editor de noticias", "ejemplos currículum editor de noticias", "mejor formato CV editor de noticias"],
    topSkills: ["Juicio editorial", "Gestión de contenido", "Liderazgo de equipo", "Experiencia en SEO", "Estrategia de redes sociales", "Edición de textos", "Habilidades de investigación", "Narrativa multimedia", "Gestión de plazos", "Comunicación"],
    atsKeywords: ["edición de noticias", "planificación editorial", "redacción", "creación de titulares", "verificación de hechos", "colaboración en equipo", "periodismo digital", "estrategia de contenido", "compromiso de la audiencia", "estándares de publicación", "ética de los medios"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Editor de Noticias",
      summary: "Editor de noticias dinámico con más de 6 años de experiencia liderando equipos editoriales y produciendo contenido de alta calidad. Aumentó el tráfico del sitio web en un 40% a través de iniciativas de contenido estratégicas.",
      skills: ["Juicio editorial", "Gestión de contenido", "Liderazgo de equipo", "Experiencia en SEO", "Estrategia de redes sociales", "Edición de textos", "Habilidades de investigación", "Narrativa multimedia", "Gestión de plazos", "Comunicación"],
      experience: [
        {
          title: "Editor de Noticias Senior",
          company: "The Daily Chronicle",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la lectura en un 25% en un año a través de estrategias de contenido innovadoras",
            "Gestionó un equipo de 10 periodistas, mejorando el tiempo de entrega de contenido en un 30%",
            "Implementó nuevas directrices editoriales que redujeron errores en un 15%",
          ],
        },
        {
          title: "Editor de Noticias",
          company: "City News Network",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló historias de noticias impactantes que aumentaron el compromiso en línea en un 50%",
            "Lideró la transición a la publicación digital primero, aumentando las suscripciones digitales en un 20%",
            "Coordinó la cobertura de eventos locales importantes, mejorando el compromiso de la comunidad",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Periodismo", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Digital Editor", issuer: "National Association of Broadcasters", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un News Editor en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas y logros cuantificables en el ámbito del periodismo." },
      { question: "¿Cómo destacar mi currículum de News Editor?", answer: "Utiliza palabras clave relacionadas con la industria y enfócate en tus logros más significativos." },
      { question: "¿Qué habilidades necesita un News Editor?", answer: "Las habilidades clave incluyen juicio editorial, gestión de contenido, y experiencia en SEO y redes sociales." },
    ],
  },
  "news-producer": {
    slug: "productor-de-noticias",
    title: "Productor de Noticias",
    keywords: ["currículum de productor de noticias", "CV de productor de noticias", "ejemplo currículum productor de noticias", "plantilla CV productor de noticias"],
    searchIntents: ["cómo escribir currículum de productor de noticias", "ejemplos currículum productor de noticias", "mejor formato CV productor de noticias"],
    topSkills: ["Narración de historias", "Edición de video", "Periodismo de difusión", "Investigación", "Escritura de guiones", "Colaboración en equipo", "Gestión del tiempo", "Estrategia de redes sociales", "Producción de contenido", "Compromiso de audiencia"],
    atsKeywords: ["producción de noticias", "difusión", "juicio editorial", "desarrollo de historias", "programación de contenido", "reportajes en vivo", "producción de campo", "producción de video", "medios digitales", "escritura de noticias", "relaciones con los medios"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor de Noticias",
      summary: "Productor de Noticias dinámico con más de 7 años de experiencia en periodismo de difusión, reconocido por aumentar el compromiso de la audiencia en un 30% a través de narrativas innovadoras y técnicas de producción.",
      skills: ["Narración de historias", "Edición de video", "Periodismo de difusión", "Investigación", "Escritura de guiones", "Colaboración en equipo", "Gestión del tiempo", "Estrategia de redes sociales", "Producción de contenido", "Compromiso de audiencia"],
      experience: [
        {
          title: "Productor de Noticias Senior",
          company: "ABC News",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de audiencia en un 25% durante horarios de máxima audiencia a través de estrategias de contenido dirigidas.",
            "Lideré un equipo de 10 en la producción de segmentos premiados que obtuvieron 3 nominaciones al Emmy.",
            "Implementé nuevas herramientas de reportería digital que mejoraron la eficiencia de producción en un 40%.",
          ],
        },
        {
          title: "Productor de Noticias",
          company: "NBC News",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé y produje segmentos de noticias diarios que consistentemente atrajeron a más de 1 millón de espectadores.",
            "Colaboré con reporteros para crear narrativas atractivas que mejoraron la retención de audiencia.",
            "Coordiné transmisiones en vivo durante eventos importantes, asegurando una ejecución perfecta bajo presión.",
          ],
        },
      ],
      education: [
        { institution: "University of Journalism", degree: "B.S.", field: "Periodismo de Difusión", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Broadcast Journalist", issuer: "National Association of Broadcasters", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Productor de Noticias en su currículum?", answer: "Un Productor de Noticias debe incluir su experiencia en producción, habilidades técnicas y ejemplos de logros en el campo." },
      { question: "¿Cómo destacar mi currículum de Productor de Noticias?", answer: "Para destacar su currículum, enfatice sus logros medibles y destaque proyectos exitosos en los que haya trabajado." },
      { question: "¿Qué habilidades necesita un Productor de Noticias?", answer: "Un Productor de Noticias necesita habilidades en narración, edición de video, manejo de crisis y trabajo en equipo." },
    ],
  },
  "personal-fashion-shopper": {
    slug: "personal-fashion-shopper",
    title: "Asesor de Moda Personal",
    keywords: ["currículum de Asesor de Moda Personal", "CV de Asesor de Moda Personal", "ejemplo currículum Asesor de Moda Personal", "plantilla CV Asesor de Moda Personal"],
    searchIntents: ["cómo escribir currículum de Asesor de Moda Personal", "ejemplos currículum Asesor de Moda Personal", "mejor formato CV Asesor de Moda Personal"],
    topSkills: ["Análisis de Tendencias de Moda", "Gestión de Relaciones con Clientes", "Consultoría de Vestuario", "Estilismo Personal", "Comercialización de Moda", "Teoría del Color", "Conocimiento de Sastrería", "Estrategia de Compras", "Conocimiento de Marcas", "Investigación de Mercado"],
    atsKeywords: ["comprador de moda", "estilismo personal", "gestión de vestuario", "consultoría de clientes", "pronóstico de moda", "conocimiento de retail", "servicio al cliente", "industria de la moda", "análisis de tendencias", "embajador de marca", "marca personal"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asesor de Moda Personal",
      summary: "Asesor de Moda Personal dinámico con más de 5 años de experiencia en mejorar los vestuarios de los clientes. Aumentó con éxito las calificaciones de satisfacción del cliente en un 30% a través de experiencias de compra personalizadas.",
      skills: ["Análisis de Tendencias de Moda", "Gestión de Relaciones con Clientes", "Consultoría de Vestuario", "Estilismo Personal", "Comercialización de Moda", "Teoría del Color", "Conocimiento de Sastrería", "Estrategia de Compras", "Conocimiento de Marcas", "Investigación de Mercado"],
      experience: [
        {
          title: "Asesor de Moda Personal Senior",
          company: "Chic Boutique",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la tasa de retención de clientes en un 40% a través de experiencias de compra personalizadas.",
            "Gestione un portafolio de más de 50 clientes con un puntaje de satisfacción del 95%.",
            "Desarrollé asociaciones exclusivas con diseñadores locales, aumentando los ingresos en $20,000.",
          ],
        },
        {
          title: "Asesor de Moda Personal",
          company: "Style Haven",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un aumento del 25% en la venta de accesorios de moda.",
            "Organicé con éxito eventos de estilo de temporada, atrayendo a más de 200 asistentes.",
            "Creé lookbooks personalizados para clientes, resultando en una tasa de repetición de negocios del 50%.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Comercialización de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Personal Stylist", issuer: "Fashion Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asesor de Moda Personal en su currículum?", answer: "Debe incluir su experiencia en estilismo, habilidades en análisis de tendencias y ejemplos de logros con clientes." },
      { question: "¿Cómo destacar mi currículum de Asesor de Moda Personal?", answer: "Utiliza un formato atractivo y resalta tus logros cuantificables en la industria de la moda." },
      { question: "¿Qué habilidades necesita un Asesor de Moda Personal?", answer: "Habilidades en análisis de tendencias, gestión de relaciones con clientes, y conocimiento de moda y marcas son esenciales." },
    ],
  },
  "photo-editor": {
    slug: "editor-de-fotos",
    title: "Editor de Fotos",
    keywords: ["currículum de Editor de Fotos", "CV de Editor de Fotos", "ejemplo currículum Editor de Fotos", "plantilla CV Editor de Fotos"],
    searchIntents: ["cómo escribir currículum de Editor de Fotos", "ejemplos currículum Editor de Fotos", "mejor formato CV Editor de Fotos"],
    topSkills: ["Adobe Photoshop", "Adobe Lightroom", "Corrección de Color", "Retoque de Imágenes", "Composición", "Manipulación Fotográfica", "Dirección Creativa", "Narrativa Visual", "Diseño Gráfico", "Gestión de Proyectos"],
    atsKeywords: ["fotografía", "edición", "corrección de color", "software de edición de fotos", "medios digitales", "artes visuales", "suite creativa", "edición de imágenes", "colaboración con clientes", "gestión de plazos", "desarrollo de portafolio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Editor de Fotos",
      summary: "Editor de Fotos experimentado con más de 5 años en la industria, especializado en retoque de imágenes de alta calidad y manipulación fotográfica creativa. Historial comprobado de aumentar la satisfacción del cliente en un 30% a través de narrativas visuales innovadoras.",
      skills: ["Adobe Photoshop", "Adobe Lightroom", "Corrección de Color", "Retoque de Imágenes", "Composición", "Manipulación Fotográfica", "Dirección Creativa", "Narrativa Visual", "Diseño Gráfico", "Gestión de Proyectos"],
      experience: [
        {
          title: "Editor de Fotos Senior",
          company: "Creative Vision Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró la calidad de las imágenes para más de 500 proyectos, resultando en un aumento del 25% en la retención de clientes.",
            "Gestionó un equipo de 5 editores, optimizando los procesos de trabajo para mejorar la productividad en un 40%.",
            "Curó con éxito un portafolio que llevó a un aumento del 15% en los ingresos en el último año fiscal.",
          ],
        },
        {
          title: "Editor de Fotos",
          company: "Snap Studios",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Editó y procesó más de 1,000 imágenes para varios clientes, manteniendo una tasa de satisfacción del 98%.",
            "Colaboró con fotógrafos para desarrollar conceptos creativos que aumentaron el engagement en redes sociales en un 20%.",
            "Implementó nuevas técnicas de edición que redujeron el tiempo de entrega en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Seattle", degree: "B.S.", field: "Fotografía", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Editor de Fotos en su currículum?", answer: "Un Editor de Fotos debe incluir experiencia relevante, habilidades técnicas en software de edición, ejemplos de trabajos anteriores y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Editor de Fotos?", answer: "Para destacar, utiliza un formato limpio, incluye un resumen llamativo y resalta tus logros más importantes con datos concretos." },
      { question: "¿Qué habilidades necesita un Editor de Fotos?", answer: "Las habilidades clave incluyen el dominio de software de edición como Adobe Photoshop y Lightroom, atención al detalle, creatividad y habilidades de gestión de proyectos." },
    ],
  },
  "producer-and-presenter": {
    slug: "productor-y-presentador",
    title: "Productor y Presentador",
    keywords: ["currículum de productor y presentador", "CV de productor y presentador", "ejemplo currículum productor y presentador", "plantilla CV productor y presentador"],
    searchIntents: ["cómo escribir currículum de productor y presentador", "ejemplos currículum productor y presentador", "mejor formato CV productor y presentador"],
    topSkills: ["Gestión de Proyectos", "Desarrollo de Contenidos", "Producción de Transmisiones", "Compromiso de Audiencia", "Redacción de Guiones", "Edición de Video", "Oratoria", "Dirección Creativa", "Estrategia de Redes Sociales", "Campañas de Marketing"],
    atsKeywords: ["productor", "presentador", "transmisión", "medios", "contenido", "producción", "narrativa", "audiencia", "comunicación", "edición", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor y Presentador",
      summary: "Productor y Presentador dinámico con más de 5 años de experiencia en televisión y medios digitales. Aumentó con éxito el compromiso de la audiencia en un 30% a través de estrategias de contenido innovadoras.",
      skills: ["Gestión de Proyectos", "Desarrollo de Contenidos", "Producción de Transmisiones", "Compromiso de Audiencia", "Redacción de Guiones", "Edición de Video", "Oratoria", "Dirección Creativa", "Estrategia de Redes Sociales", "Campañas de Marketing"],
      experience: [
        {
          title: "Productor Senior",
          company: "ABC Broadcasting",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la audiencia en un 40% durante los horarios de máxima audiencia a través de una programación de contenido estratégica.",
            "Produjo más de 50 episodios exitosos que llevaron a un aumento del 25% en los ingresos por publicidad.",
            "Implementó mecanismos de retroalimentación de la audiencia que mejoraron las calificaciones del programa en un 15%.",
          ],
        },
        {
          title: "Productor Asociado",
          company: "XYZ Media Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordinó la producción de una campaña multiplataforma que alcanzó a 1 millón de espectadores.",
            "Asistió en el desarrollo de un documental que ganó un premio Emmy regional.",
            "Gestionó un equipo de 10 en la exitosa ejecución de eventos en vivo.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Los Angeles", degree: "B.S.", field: "Producción de Cine y Televisión", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Television Producer", issuer: "National Association of Broadcasters", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Productor y Presentador en su currículum?", answer: "Un Productor y Presentador debe incluir su experiencia en producción, habilidades de comunicación y ejemplos de éxito en engagement de audiencia." },
      { question: "¿Cómo destacar mi currículum de Productor y Presentador?", answer: "Destaca tus logros más significativos y utiliza métricas cuantificables para demostrar tu impacto en la audiencia." },
      { question: "¿Qué habilidades necesita un Productor y Presentador?", answer: "Necesita habilidades en gestión de proyectos, producción, redacción de guiones, y estrategias de engagement." },
    ],
  },
  "product-design-engineer": {
    slug: "ingeniero-de-diseno-de-producto",
    title: "Ingeniero de Diseño de Producto",
    keywords: ["currículum de ingeniero de diseño de producto", "CV de ingeniero de diseño de producto", "ejemplo currículum ingeniero de diseño de producto", "plantilla CV ingeniero de diseño de producto"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de producto", "ejemplos currículum ingeniero de diseño de producto", "mejor formato CV ingeniero de diseño de producto"],
    topSkills: ["Diseño Centrado en el Usuario", "Prototipado", "Modelado 3D", "Software CAD", "Design Thinking", "Selección de Materiales", "Procesos de Fabricación", "Pruebas de Usuario", "Gestión de Proyectos", "Colaboración"],
    atsKeywords: ["Diseño de Producto", "Diseño de Ingeniería", "Desarrollo de Prototipos", "Ciclo de Vida del Producto", "Validación de Diseño", "Dibujos Técnicos", "Equipos Multifuncionales", "Especificaciones de Diseño", "Pruebas de Producto", "Diseño Ergonómico", "Sostenibilidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Producto",
      summary: "Ingeniero de Diseño de Producto con más de 5 años de experiencia en el desarrollo de soluciones de diseño innovadoras. Lideré con éxito proyectos que aumentaron la usabilidad del producto en un 30% y redujeron los costos de producción en un 20%.",
      skills: ["Diseño Centrado en el Usuario", "Prototipado", "Modelado 3D", "Software CAD", "Design Thinking", "Selección de Materiales", "Procesos de Fabricación", "Pruebas de Usuario", "Gestión de Proyectos", "Colaboración"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Producto",
          company: "Apple Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé una nueva línea de productos que contribuyó a un aumento del 15% en los ingresos.",
            "Lideré iniciativas de pruebas de usuario que mejoraron los puntajes de satisfacción del cliente en un 25%.",
            "Agilicé el proceso de diseño, reduciendo el tiempo de lanzamiento al mercado en 10 semanas.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Producto",
          company: "Samsung Electronics",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Rediseñé un producto insignia que mejoró la funcionalidad, resultando en un aumento del 40% en las ventas.",
            "Colaboré con equipos multifuncionales para reducir los defectos del producto en un 15%.",
            "Implementé cambios de diseño que disminuyeron los costos de fabricación en $500,000 anuales.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Product Design Engineer", issuer: "American Society of Mechanical Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Producto en su currículum?", answer: "Un Ingeniero de Diseño de Producto debe incluir habilidades técnicas, experiencia en proyectos de diseño, y ejemplos de logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Producto?", answer: "Utiliza números para cuantificar tus logros y destaca tus habilidades en diseño centrado en el usuario y prototipado." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Producto?", answer: "Las habilidades clave incluyen diseño centrado en el usuario, prototipado, modelado 3D, y gestión de proyectos." },
    ],
  },
  "product-designer": {
    slug: "diseñador-de-producto",
    title: "Diseñador de Producto",
    keywords: ["currículum de diseñador de producto", "CV de diseñador de producto", "ejemplo currículum diseñador de producto", "plantilla CV diseñador de producto"],
    searchIntents: ["cómo escribir currículum de diseñador de producto", "ejemplos currículum diseñador de producto", "mejor formato CV diseñador de producto"],
    topSkills: ["Diseño de Experiencia del Usuario", "Diseño de Interfaz de Usuario", "Prototipado", "Wireframing", "Diseño de Interacción", "Diseño Visual", "Design Thinking", "Pruebas de Usabilidad", "Adobe Creative Suite", "Sketch"],
    atsKeywords: ["UX", "UI", "Diseño de Producto", "Prototipado", "Wireframing", "Investigación de Usuarios", "Adobe XD", "Figma", "Sistemas de Diseño", "Ágil", "Colaboración"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Producto",
      summary: "Diseñador de Producto con más de 5 años de experiencia en la creación de diseños centrados en el usuario. Aumentó con éxito la participación de los usuarios en un 30% a través de soluciones de diseño innovadoras.",
      skills: ["Diseño de Experiencia del Usuario", "Diseño de Interfaz de Usuario", "Prototipado", "Wireframing", "Diseño de Interacción", "Diseño Visual", "Design Thinking", "Pruebas de Usabilidad", "Adobe Creative Suite", "Sketch"],
      experience: [
        {
          title: "Diseñador de Producto Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto de rediseño que mejoró la satisfacción del usuario en un 40%",
            "Creé wireframes y prototipos que redujeron el tiempo de desarrollo en un 25%",
            "Implementé un nuevo sistema de diseño que aumentó la eficiencia del equipo en un 15%",
          ],
        },
        {
          title: "Diseñador de Producto",
          company: "Digital Solutions Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé una aplicación móvil que logró 50,000 descargas en el primer mes",
            "Realicé investigaciones de usuarios que informaron decisiones de diseño, lo que llevó a un aumento del 20% en las tasas de retención",
            "Colaboré con equipos multifuncionales para lanzar 3 características principales que mejoraron la participación de los usuarios",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified UX Designer", issuer: "UX Design Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Product Designer en su currículum?", answer: "Un Product Designer debe incluir su experiencia en diseño, habilidades técnicas, proyectos destacados y estudios relevantes." },
      { question: "¿Cómo destacar mi currículum de Product Designer?", answer: "Destacar sus logros cuantificables y proyectos exitosos, así como personalizar su currículum para cada puesto." },
      { question: "¿Qué habilidades necesita un Product Designer?", answer: "Un Product Designer debe tener habilidades en diseño UX/UI, prototipado, investigación de usuarios y herramientas de diseño como Adobe XD y Figma." },
    ],
  },
  "project-manager-journalist": {
    slug: "project-manager-journalist",
    title: "Gerente de Proyectos y Periodista",
    keywords: ["currículum de gerente de proyectos y periodista", "CV de gerente de proyectos y periodista", "ejemplo currículum gerente de proyectos y periodista", "plantilla CV gerente de proyectos y periodista"],
    searchIntents: ["cómo escribir currículum de gerente de proyectos y periodista", "ejemplos currículum gerente de proyectos y periodista", "mejor formato CV gerente de proyectos y periodista"],
    topSkills: ["Gestión de Proyectos", "Estrategia de Contenidos", "Análisis de Datos", "Liderazgo de Equipos", "Gestión de Presupuestos", "Compromiso de Interesados", "Gestión de Riesgos", "Metodologías Ágiles", "Habilidades de Comunicación", "Habilidades de Investigación"],
    atsKeywords: ["gestión de proyectos", "periodismo", "creación de contenido", "planificación editorial", "gestión de plazos", "equipos multifuncionales", "reportes", "medios digitales", "optimización SEO", "seguimiento de presupuestos", "relaciones con clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Proyectos y Periodista",
      summary: "Dinámico Gerente de Proyectos y Periodista con más de 7 años de experiencia en liderar proyectos mediáticos exitosos, resultando en un aumento del 30% en el compromiso de la audiencia y un crecimiento del 25% en los ingresos.",
      skills: ["Gestión de Proyectos", "Estrategia de Contenidos", "Análisis de Datos", "Liderazgo de Equipos", "Gestión de Presupuestos", "Compromiso de Interesados", "Gestión de Riesgos", "Metodologías Ágiles", "Habilidades de Comunicación", "Habilidades de Investigación"],
      experience: [
        {
          title: "Gerente de Proyecto Senior",
          company: "Global Media Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para completar un proyecto de alto perfil un 15% por debajo del presupuesto, ahorrando $50,000.",
            "Aumenté la velocidad de entrega de proyectos en un 20% mediante la mejora de procesos de trabajo.",
            "Gestioné con éxito una campaña multiplataforma que incrementó la lectura en un 40%.",
          ],
        },
        {
          title: "Coordinador de Proyectos",
          company: "Digital News Network",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordiné horarios editoriales que mejoraron la producción de contenido en un 30%.",
            "Implementé un nuevo sistema de seguimiento de proyectos que redujo los plazos incumplidos en un 50%.",
            "Desarrollé relaciones con interesados clave que mejoraron la colaboración y el éxito del proyecto.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Periodismo", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Project Management Professional", issuer: "Project Management Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Project Manager Journalist en su currículum?", answer: "Un Project Manager Journalist debe incluir su experiencia en gestión de proyectos, habilidades en periodismo, y ejemplos de proyectos exitosos." },
      { question: "¿Cómo destacar mi currículum de Project Manager Journalist?", answer: "Para destacar su currículum, concéntrese en logros cuantificables y habilidades específicas relacionadas con la gestión de proyectos y el periodismo." },
      { question: "¿Qué habilidades necesita un Project Manager Journalist?", answer: "Las habilidades clave incluyen gestión de proyectos, comunicación efectiva, y experiencia en periodismo y creación de contenido." },
    ],
  },
  "promo-producer": {
    slug: "productor-de-promociones",
    title: "Productor de Promociones",
    keywords: ["currículum de Productor de Promociones", "CV de Productor de Promociones", "ejemplo currículum Productor de Promociones", "plantilla CV Productor de Promociones"],
    searchIntents: ["cómo escribir currículum de Productor de Promociones", "ejemplos currículum Productor de Promociones", "mejor formato CV Productor de Promociones"],
    topSkills: ["Producción de Video", "Escritura de Guiones", "Creación de Storyboards", "Gestión de Proyectos", "Software de Edición", "Conceptualización Creativa", "Estrategias de Marketing", "Colaboración en Equipo", "Interacción con la Audiencia", "Gestión de Presupuestos"],
    atsKeywords: ["Producción de Promociones", "Marketing de Video", "Creación de Contenido", "Dirección Creativa", "Desarrollo de Marca", "Narración Visual", "Programación de Producción", "Planificación de Medios", "Experiencia en Set", "Trabajo en Equipo Multifuncional", "Marketing Digital"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Productor de Promociones",
      summary: "Productor de Promociones creativo con más de 5 años de experiencia en el desarrollo de contenido promocional atractivo. Aumentó exitosamente la interacción de la audiencia en un 30% a través de estrategias de marketing innovadoras y una gestión de proyectos efectiva.",
      skills: ["Producción de Video", "Escritura de Guiones", "Creación de Storyboards", "Gestión de Proyectos", "Software de Edición", "Conceptualización Creativa", "Estrategias de Marketing", "Colaboración en Equipo", "Interacción con la Audiencia", "Gestión de Presupuestos"],
      experience: [
        {
          title: "Productor Senior de Promociones",
          company: "ABC Media Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las vistas de videos promocionales en un 50% en 6 meses",
            "Produje más de 100 videos promocionales que generaron $200,000 en ingresos",
            "Lideré un equipo de 5 para ejecutar una campaña de marketing que aumentó la conciencia de marca en un 40%",
          ],
        },
        {
          title: "Productor de Promociones",
          company: "XYZ Productions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé y lancé más de 75 campañas promocionales",
            "Colaboré con equipos de marketing para lograr un aumento del 25% en la interacción de la audiencia",
            "Gestioné presupuestos para proyectos que totalizaron más de $150,000",
          ],
        },
      ],
      education: [
        { institution: "University of Arts", degree: "B.S.", field: "Estudios de Cine y Medios", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Video Producer", issuer: "Media Production Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Productor de Promociones en su currículum?", answer: "Un Productor de Promociones debe incluir su experiencia en producción de video, habilidades de escritura de guiones, y ejemplos de campañas exitosas." },
      { question: "¿Cómo destacar mi currículum de Productor de Promociones?", answer: "Para destacar tu currículum, enfócate en logros cuantificables y resalta tus habilidades creativas y de gestión de proyectos." },
      { question: "¿Qué habilidades necesita un Productor de Promociones?", answer: "Un Productor de Promociones necesita habilidades en producción de video, escritura de guiones, gestión de proyectos y colaboración en equipo." },
    ],
  },
  "rf-design-engineer": {
    slug: "ingeniero-de-diseno-rf",
    title: "Ingeniero de Diseño RF",
    keywords: ["currículum de ingeniero de diseño rf", "CV de ingeniero de diseño rf", "ejemplo currículum ingeniero de diseño rf", "plantilla CV ingeniero de diseño rf"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño rf", "ejemplos currículum ingeniero de diseño rf", "mejor formato CV ingeniero de diseño rf"],
    topSkills: ["Diseño de Circuitos RF", "Procesamiento de Señales", "Simulación Electromagnética", "Diseño de PCB", "Captura Esquemática", "LabVIEW", "MATLAB", "Análisis de Espectro", "Diseño de Antenas", "Comunicación Inalámbrica"],
    atsKeywords: ["ingeniería rf", "diseño de circuitos", "integridad de señales", "simulación de antenas", "compatibilidad electromagnética", "estándares inalámbricos", "pruebas y mediciones", "validación de diseño", "gestión de proyectos", "documentación técnica", "resolución de problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño RF",
      summary: "Ingeniero de Diseño RF con más de 5 años de experiencia en el desarrollo y prueba de sistemas RF. Logré una reducción del 30% en la pérdida de señal a través de soluciones de diseño innovadoras.",
      skills: ["Diseño de Circuitos RF", "Procesamiento de Señales", "Simulación Electromagnética", "Diseño de PCB", "Captura Esquemática", "LabVIEW", "MATLAB", "Análisis de Espectro", "Diseño de Antenas", "Comunicación Inalámbrica"],
      experience: [
        {
          title: "Ingeniero de Diseño RF Senior",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que desarrolló un nuevo módulo RF, lo que resultó en un aumento del 25% en la eficiencia del producto.",
            "Reduje el tiempo de prueba en un 40% a través de la automatización de procesos de medición RF.",
            "Implementé cambios de diseño innovadores que mejoraron la integridad de la señal en un 15%.",
          ],
        },
        {
          title: "Ingeniero de Diseño RF",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé circuitos RF para una nueva línea de productos, contribuyendo con $2M en ventas.",
            "Colaboré con equipos multifuncionales para mejorar las especificaciones del producto, reduciendo el tiempo de lanzamiento al mercado en un 20%.",
            "Completar pruebas exhaustivas que llevaron a una tasa de éxito del 98% en la validación del diseño.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified RF Engineer", issuer: "Institute of Electrical and Electronics Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño RF en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas, y logros destacados en el campo de RF." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño RF?", answer: "Enfocarse en logros cuantificables y habilidades específicas que sean relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño RF?", answer: "Se requieren habilidades en diseño de circuitos, procesamiento de señales, y simulación electromagnética." },
    ],
  },
  "rf-hardware-design-engineer": {
    slug: "ingeniero-de-diseño-de-hardware-rf",
    title: "Ingeniero de Diseño de Hardware RF",
    keywords: ["currículum de ingeniero de diseño de hardware RF", "CV de ingeniero de diseño de hardware RF", "ejemplo currículum ingeniero de diseño de hardware RF", "plantilla CV ingeniero de diseño de hardware RF"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de hardware RF", "ejemplos currículum ingeniero de diseño de hardware RF", "mejor formato CV ingeniero de diseño de hardware RF"],
    topSkills: ["diseño de circuitos RF", "diseño de PCB", "análisis de integridad de señal", "diseño de amplificadores de potencia", "simulación de sistemas RF", "diseño de antenas", "pruebas EMC/EMI", "desarrollo de prototipos", "pruebas y mediciones", "documentación técnica"],
    atsKeywords: ["ingeniería RF", "diseño de hardware", "simulación de circuitos", "sistemas inalámbricos", "diseño analógico", "diseño digital", "validación de diseño", "gestión de proyectos", "soporte técnico", "cumplimiento normativo", "desarrollo de productos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Hardware RF",
      summary: "Ingeniero de Diseño de Hardware RF dedicado con más de 5 años de experiencia en el desarrollo de soluciones RF innovadoras. Logró una reducción del 30% en los costos de producción mientras mejoraba la eficiencia del diseño en un 25%.",
      skills: ["diseño de circuitos RF", "diseño de PCB", "análisis de integridad de señal", "diseño de amplificadores de potencia", "simulación de sistemas RF", "diseño de antenas", "pruebas EMC/EMI", "desarrollo de prototipos", "pruebas y mediciones", "documentación técnica"],
      experience: [
        {
          title: "Ingeniero de Diseño de Hardware RF Senior",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrolló un nuevo diseño de circuito RF que mejoró la fuerza de la señal en un 40%",
            "Lideró un equipo que redujo el tiempo de prueba de prototipos en 20 días, ahorrando $50,000",
            "Implementó mejoras de diseño que aumentaron la fiabilidad del producto, resultando en una disminución del 15% en devoluciones",
          ],
        },
        {
          title: "Ingeniero de Diseño de Hardware RF",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñó y probó componentes RF que contribuyeron a un aumento del 25% en el rendimiento del producto",
            "Colaboró con equipos multifuncionales para optimizar los plazos del proyecto, logrando un 15% más rápido al mercado",
            "Realizó pruebas EMC exhaustivas que aseguraron el cumplimiento con los estándares de la industria",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified RF Engineer", issuer: "Institute of Electrical and Electronics Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Rf Hardware Design Engineer en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas, logros cuantificables y educación relacionada." },
      { question: "¿Cómo destacar mi currículum de Rf Hardware Design Engineer?", answer: "Utiliza palabras clave relevantes, resalta logros específicos y presenta un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un Rf Hardware Design Engineer?", answer: "Las habilidades clave incluyen diseño de circuitos RF, pruebas de EMC, diseño de PCB y simulación de sistemas." },
    ],
  },
  "rf-power-amplifier-design-engineer": {
    slug: "disenador-de-amplificadores-de-potencia-rf",
    title: "Ingeniero de Diseño de Amplificadores de Potencia RF",
    keywords: ["currículum de Ingeniero de Diseño de Amplificadores de Potencia RF", "CV de Ingeniero de Diseño de Amplificadores de Potencia RF", "ejemplo currículum Ingeniero de Diseño de Amplificadores de Potencia RF", "plantilla CV Ingeniero de Diseño de Amplificadores de Potencia RF"],
    searchIntents: ["cómo escribir currículum de Ingeniero de Diseño de Amplificadores de Potencia RF", "ejemplos currículum Ingeniero de Diseño de Amplificadores de Potencia RF", "mejor formato CV Ingeniero de Diseño de Amplificadores de Potencia RF"],
    topSkills: ["Diseño de circuitos RF", "Diseño de amplificadores de potencia", "Procesamiento de señales", "Compatibilidad electromagnética", "Diseño de PCB", "Captura de esquemas", "Pruebas y validación", "Manejo térmico", "Software de simulación (ADS, HFSS)", "Gestión de proyectos"],
    atsKeywords: ["diseño RF", "amplificadores de potencia", "simulación de circuitos", "EMI/EMC", "modelado lineal y no lineal", "equipos de prueba", "ganancia y eficiencia", "amplificadores de ancho de banda", "circuitos analógicos", "verificación de diseño", "documentación técnica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Amplificadores de Potencia RF",
      summary: "Ingeniero de Diseño de Amplificadores de Potencia RF orientado a resultados con más de 5 años de experiencia en el desarrollo de amplificadores RF de alto rendimiento. Mejoró exitosamente la eficiencia del amplificador en un 20% a través de técnicas de diseño innovadoras.",
      skills: ["Diseño de circuitos RF", "Diseño de amplificadores de potencia", "Procesamiento de señales", "Compatibilidad electromagnética", "Diseño de PCB", "Captura de esquemas", "Pruebas y validación", "Manejo térmico", "Software de simulación (ADS, HFSS)", "Gestión de proyectos"],
      experience: [
        {
          title: "Ingeniero Senior de Amplificadores de Potencia RF",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un proyecto que resultó en una reducción del 30% en el consumo de energía para amplificadores móviles.",
            "Desarrollé una nueva clase de amplificadores que lograron un 25% más de linealidad que los modelos anteriores.",
            "Optimicé el proceso de pruebas, reduciendo el tiempo de lanzamiento al mercado en un 15%.",
          ],
        },
        {
          title: "Ingeniero de Amplificadores de Potencia RF",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé e implementé amplificadores RF que aumentaron la eficiencia general del sistema en un 18%.",
            "Colaboré con equipos multifuncionales para mejorar la fiabilidad y el rendimiento del producto.",
            "Escribí documentación técnica que mejoró el intercambio de conocimientos dentro del equipo.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified RF Engineer", issuer: "Institute of Electrical and Electronics Engineers (IEEE)", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Amplificadores de Potencia RF en su currículum?", answer: "Incluir experiencia relevante en diseño de circuitos RF, logros en eficiencia de amplificadores y habilidades de gestión de proyectos." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Amplificadores de Potencia RF?", answer: "Resaltar logros cuantificables y habilidades técnicas específicas en el área de RF." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Amplificadores de Potencia RF?", answer: "Habilidades en diseño de circuitos, simulación, pruebas y validación, así como manejo térmico y documentación técnica." },
    ],
  },
  "rfic-design-engineer": {
    slug: "ingeniero-de-diseño-rfic",
    title: "Ingeniero de Diseño RFIC",
    keywords: ["currículum de ingeniero de diseño rfic", "CV de ingeniero de diseño rfic", "ejemplo currículum ingeniero de diseño rfic", "plantilla CV ingeniero de diseño rfic"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño rfic", "ejemplos currículum ingeniero de diseño rfic", "mejor formato CV ingeniero de diseño rfic"],
    topSkills: ["Diseño de Circuitos RF", "Ingeniería de Microondas", "Procesamiento de Señales", "Captura Esquemática", "Diseño de PCB", "Software de Simulación", "Modelado EM", "Pruebas y Validación", "Análisis de Datos", "Documentación Técnica"],
    atsKeywords: ["Diseño RF", "Simulación de Circuitos", "Cadence", "ADS", "Ansys HFSS", "LabVIEW", "SPICE", "Diseño de Antenas", "Comunicación Inalámbrica", "Diseño para Fabricación", "Gestión de Proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño RFIC",
      summary: "Ingeniero de Diseño RFIC con más de 5 años de experiencia en el desarrollo de soluciones RF innovadoras, logrando un aumento del 30% en la eficiencia del producto y reduciendo los costos de producción en $200K.",
      skills: ["Diseño de Circuitos RF", "Ingeniería de Microondas", "Procesamiento de Señales", "Captura Esquemática", "Diseño de PCB", "Software de Simulación", "Modelado EM", "Pruebas y Validación", "Análisis de Datos", "Documentación Técnica"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño RF",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para diseñar un nuevo módulo RF que mejoró la intensidad de la señal en un 40%.",
            "Reduje el tiempo de prueba de prototipos en un 25% mediante procesos optimizados.",
            "Contribuí a un proyecto que generó $1M en ingresos adicionales al mejorar el rendimiento del producto.",
          ],
        },
        {
          title: "Ingeniero de Diseño RF",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé y probé componentes RF para electrónica de consumo, logrando una reducción del 15% en el consumo de energía.",
            "Colaboré en un proyecto que mejoró la cobertura del rango de productos en un 20%.",
            "Implementé nuevos procedimientos de prueba que aumentaron las métricas de confiabilidad en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified RF Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Rfic Design Engineer en su currículum?", answer: "Un ingeniero de diseño RFIC debe incluir su experiencia en diseño de circuitos, habilidades en software de simulación, y proyectos relevantes donde haya aplicado su conocimiento técnico." },
      { question: "¿Cómo destacar mi currículum de Rfic Design Engineer?", answer: "Destaca tus logros cuantificables, resalta tus habilidades técnicas y asegúrate de personalizar tu currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Rfic Design Engineer?", answer: "Las habilidades clave incluyen el diseño de circuitos RF, análisis de señales, y experiencia con herramientas de simulación como ADS y Ansys HFSS." },
    ],
  },
  "rfic-designer": {
    slug: "diseñador-rfic",
    title: "Diseñador RFIC",
    keywords: ["currículum de diseñador RFIC", "CV de diseñador RFIC", "ejemplo currículum diseñador RFIC", "plantilla CV diseñador RFIC"],
    searchIntents: ["cómo escribir currículum de diseñador RFIC", "ejemplos currículum diseñador RFIC", "mejor formato CV diseñador RFIC"],
    topSkills: ["Diseño de Circuitos Analógicos", "Diseño RF", "Diseño VLSI", "Pruebas y Medición", "Procesamiento de Señales", "Teoría Electromagnética", "Diseño de PCB", "Análisis de Datos", "Sistemas de Comunicación", "Herramientas CAD"],
    atsKeywords: ["RFIC", "Analógico", "VLSI", "Diseño de Circuitos", "Equipos de Prueba", "Integridad de Señal", "Simulación EM", "Captura de Esquemas", "Diseño de Layout", "Verificación de Diseño", "Tape-out"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador RFIC",
      summary: "Diseñador RFIC con más de 5 años de experiencia en el desarrollo de soluciones RF innovadoras. Logré una reducción del 30% en los costos de producción mediante metodologías de diseño optimizadas.",
      skills: ["Diseño de Circuitos Analógicos", "Diseño RF", "Diseño VLSI", "Pruebas y Medición", "Procesamiento de Señales", "Teoría Electromagnética", "Diseño de PCB", "Análisis de Datos", "Sistemas de Comunicación", "Herramientas CAD"],
      experience: [
        {
          title: "Diseñador RFIC Senior",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que desarrolló un nuevo módulo frontal RF, lo que resultó en un aumento del 25% en los métricas de rendimiento.",
            "Implementé estrategias de diseño que mejoraron el rendimiento en un 15%, ahorrando a la empresa $500,000 anuales.",
            "Diseñé y probé un amplificador de potencia de alta eficiencia que superó los estándares de la industria en un 20%.",
          ],
        },
        {
          title: "Ingeniero de Diseño RFIC",
          company: "Texas Instruments",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un transceptor RF de bajo consumo que redujo el consumo de energía en un 40% en comparación con modelos anteriores.",
            "Colaboré con equipos interdisciplinarios para lanzar con éxito 3 nuevos productos RFIC al mercado.",
            "Realicé pruebas y validaciones extensivas, logrando una tasa de éxito del 98% en la verificación de diseño.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified RF Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un RFIC Designer en su currículum?", answer: "Un RFIC Designer debe incluir su experiencia en diseño de circuitos, habilidades en herramientas CAD, y logros en proyectos relevantes." },
      { question: "¿Cómo destacar mi currículum de RFIC Designer?", answer: "Destacar logros cuantificables y habilidades específicas en diseño RF puede ayudar a que su currículum se destaque." },
      { question: "¿Qué habilidades necesita un RFIC Designer?", answer: "Un RFIC Designer necesita habilidades en diseño analógico, procesamiento de señales, y prueba y medición." },
    ],
  },
  "rxinsider-multimedia-specialist": {
    slug: "especialista-multimedia-rxinsider",
    title: "Especialista Multimedia en Rxinsider",
    keywords: ["currículum de especialista multimedia", "CV de especialista multimedia", "ejemplo currículum especialista multimedia", "plantilla CV especialista multimedia"],
    searchIntents: ["cómo escribir currículum de especialista multimedia", "ejemplos currículum especialista multimedia", "mejor formato CV especialista multimedia"],
    topSkills: ["Diseño Gráfico", "Edición de Video", "Creación de Contenido", "Gestión de Redes Sociales", "Optimización SEO", "Desarrollo de Marca", "Fotografía", "Ilustración", "Animación", "Gestión de Proyectos"],
    atsKeywords: ["multimedia", "estrategia de contenido", "marketing digital", "producción de video", "diseño gráfico", "redes sociales", "branding", "Adobe Creative Suite", "comunicación", "colaboración", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista Multimedia en Rxinsider",
      summary: "Especialista Multimedia con más de 5 años de experiencia en la creación de contenido digital y un historial comprobado de aumentar el compromiso en un 40% a través de estrategias multimedia innovadoras.",
      skills: ["Diseño Gráfico", "Edición de Video", "Creación de Contenido", "Gestión de Redes Sociales", "Optimización SEO", "Desarrollo de Marca", "Fotografía", "Ilustración", "Animación", "Gestión de Proyectos"],
      experience: [
        {
          title: "Especialista Multimedia Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó el compromiso de video en un 50%, resultando en un aumento del 20% en el tráfico general del sitio web.",
            "Gestionó un equipo de 5 para producir más de 100 proyectos multimedia anuales, mejorando la visibilidad de la marca.",
            "Desarrolló una estrategia de contenido visual que contribuyó a un aumento del 30% en los seguidores de redes sociales.",
          ],
        },
        {
          title: "Diseñador Multimedia",
          company: "Digital Media Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñó e implementó más de 50 campañas multimedia que llevaron a un aumento del 15% en la retención de clientes.",
            "Colaboró con equipos de marketing para crear contenido atractivo que aumentó el alcance de la audiencia en un 25%.",
            "Produjo contenido de video de alta calidad que ganó tres premios regionales por excelencia.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Artes Multimedia", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Rxinsider Multimedia Specialist en su currículum?", answer: "Debe incluir sus habilidades técnicas, experiencia laboral relevante y logros cuantificables en proyectos multimedia." },
      { question: "¿Cómo destacar mi currículum de Rxinsider Multimedia Specialist?", answer: "Use palabras clave relevantes, resalte su experiencia y logros y asegúrese de que el diseño sea limpio y profesional." },
      { question: "¿Qué habilidades necesita un Rxinsider Multimedia Specialist?", answer: "Necesita habilidades en diseño gráfico, edición de video, creación de contenido y gestión de redes sociales, entre otras." },
    ],
  },
  "screenwriter": {
    slug: "guionistas",
    title: "Guionista",
    keywords: ["currículum de guionista", "CV de guionista", "ejemplo currículum guionista", "plantilla CV guionista"],
    searchIntents: ["cómo escribir currículum de guionista", "ejemplos currículum guionista", "mejor formato CV guionista"],
    topSkills: ["narración de historias", "desarrollo de personajes", "escritura de diálogos", "formato de guion", "escritura creativa", "análisis de guiones", "colaboración", "adaptación", "investigación", "gestión del tiempo"],
    atsKeywords: ["guionismo", "producción cinematográfica", "escritura para televisión", "estructura de la historia", "edición de guiones", "gestión de proyectos", "colaboración creativa", "redacción", "revisión", "software de escritura"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Guionista",
      summary: "Guionista experimentado con más de 5 años en la industria, conocido por escribir guiones galardonados que han generado más de $1 millón en taquilla.",
      skills: ["narración de historias", "desarrollo de personajes", "escritura de diálogos", "formato de guion", "escritura creativa", "análisis de guiones", "colaboración", "adaptación", "investigación", "gestión del tiempo"],
      experience: [
        {
          title: "Guionista Senior",
          company: "DreamWorks Studios",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Escribí un guion que recaudó más de $500,000 en su fin de semana de apertura",
            "Desarrollé un piloto que fue adquirido por una importante cadena, resultando en un aumento del 30% en la audiencia",
            "Colaboré con directores y productores para refinar guiones, mejorando la calidad general de la producción",
          ],
        },
        {
          title: "Guionista Junior",
          company: "Paramount Pictures",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a una franquicia exitosa que generó más de $200 millones en ingresos",
            "Asistí en revisiones de guion que mejoraron el ritmo y el desarrollo de personajes, llevando a un aumento del 25% en las calificaciones de la audiencia",
            "Participé en sesiones de lluvia de ideas que resultaron en cinco nuevas propuestas de proyectos",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.F.A.", field: "Producción de Cine y Televisión", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Screenwriting Certificate", issuer: "UCLA Extension", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Guionista en su currículum?", answer: "Incluir experiencia relevante, habilidades específicas y logros destacados en proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Guionista?", answer: "Enfocarse en logros cuantificables, proyectos exitosos y habilidades clave relacionadas con la escritura de guiones." },
      { question: "¿Qué habilidades necesita un Guionista?", answer: "Habilidades clave incluyen narración, desarrollo de personajes, escritura creativa y trabajo en equipo." },
    ],
  },
  "senior-analog-design-engineer": {
    slug: "ingeniero-senior-de-diseño-analogo",
    title: "Ingeniero Senior de Diseño Analógico",
    keywords: ["currículum de ingeniero senior de diseño analógico", "CV de ingeniero senior de diseño analógico", "ejemplo currículum ingeniero senior de diseño analógico", "plantilla CV ingeniero senior de diseño analógico"],
    searchIntents: ["cómo escribir currículum de ingeniero senior de diseño analógico", "ejemplos currículum ingeniero senior de diseño analógico", "mejor formato CV ingeniero senior de diseño analógico"],
    topSkills: ["Diseño de Circuitos Analógicos", "Procesamiento de Señales", "Diseño de Señal Mixta", "Diseño de PCB", "Herramientas de Simulación", "Gestión de Energía", "Diseño RF", "Pruebas y Validación", "Cumplimiento Regulatorio", "Liderazgo de Equipo"],
    atsKeywords: ["Diseño Analógico", "Análisis de Circuitos", "Integridad de Señal", "Amplificadores de Bajo Ruido", "Amplificadores Operacionales", "Sistemas de Retroalimentación", "Verificación de Diseño", "Prototipado", "Simulación SPICE", "Resolución de Problemas", "Documentación Técnica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero Senior de Diseño Analógico",
      summary: "Ingeniero Senior de Diseño Analógico con más de 7 años de experiencia en la industria, especializado en diseño de circuitos de alta frecuencia y soluciones de gestión de energía, logrando una reducción del 30% en el consumo de energía para proyectos clave.",
      skills: ["Diseño de Circuitos Analógicos", "Procesamiento de Señales", "Diseño de Señal Mixta", "Diseño de PCB", "Herramientas de Simulación", "Gestión de Energía", "Diseño RF", "Pruebas y Validación", "Cumplimiento Regulatorio", "Liderazgo de Equipo"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño Analógico",
          company: "Texas Instruments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que resultó en una reducción del 30% en el consumo de energía, ahorrando a la empresa $500,000 anuales.",
            "Diseñé e implementé un circuito de señal mixta que mejoró la integridad de la señal en un 25%.",
            "Colaboré con equipos multifuncionales para desarrollar una nueva línea de productos, contribuyendo a un aumento del 15% en la cuota de mercado.",
          ],
        },
        {
          title: "Ingeniero de Diseño Analógico",
          company: "Analog Devices",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un amplificador de bajo ruido que superó los parámetros de rendimiento en un 20%.",
            "Optimicé el proceso de diseño, reduciendo el tiempo de lanzamiento al mercado en un 15%.",
            "Presenté hallazgos técnicos en conferencias de la industria, mejorando la visibilidad de la empresa.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Analog Design Engineer", issuer: "Institute of Electrical and Electronics Engineers (IEEE)", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Senior Analog Design Engineer en su currículum?", answer: "Debe incluir su experiencia en diseño de circuitos, habilidades técnicas relevantes y logros significativos en proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Senior Analog Design Engineer?", answer: "Utilice un formato claro, resalte sus logros cuantificables y adapte su currículum a la descripción del trabajo específico." },
      { question: "¿Qué habilidades necesita un Senior Analog Design Engineer?", answer: "Necesita habilidades en diseño de circuitos analógicos, procesamiento de señales, gestión de energía y trabajo en equipo." },
    ],
  },
  "senior-antenna-design-engineer": {
    slug: "ingeniero-senior-de-diseno-de-antenas",
    title: "Ingeniero Senior de Diseño de Antenas",
    keywords: ["currículum de ingeniero senior de diseño de antenas", "CV de ingeniero senior de diseño de antenas", "ejemplo currículum ingeniero senior de diseño de antenas", "plantilla CV ingeniero senior de diseño de antenas"],
    searchIntents: ["cómo escribir currículum de ingeniero senior de diseño de antenas", "ejemplos currículum ingeniero senior de diseño de antenas", "mejor formato CV ingeniero senior de diseño de antenas"],
    topSkills: ["Diseño de Antenas", "Ingeniería RF", "Procesamiento de Señales", "Simulación Electromagnética", "Medición de Antenas", "Modelado 3D", "Gestión de Proyectos", "Documentación Técnica", "Liderazgo de Equipo", "Prototipado"],
    atsKeywords: ["Diseño de Antenas", "RF", "Simulación EM", "CAD", "Diseño Esquemático", "Diseño de PCB", "Sistemas de Comunicación", "Tecnologías Inalámbricas", "Análisis de Redes", "Informes Técnicos", "Programación de Proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero Senior de Diseño de Antenas",
      summary: "Ingeniero Senior de Diseño de Antenas orientado a resultados con más de 8 años de experiencia en el diseño y optimización de componentes RF. Lideré con éxito proyectos que redujeron el tiempo de desarrollo en un 30% y mejoraron los indicadores de rendimiento en un 25%.",
      skills: ["Diseño de Antenas", "Ingeniería RF", "Procesamiento de Señales", "Simulación Electromagnética", "Medición de Antenas", "Modelado 3D", "Gestión de Proyectos", "Documentación Técnica", "Liderazgo de Equipo", "Prototipado"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Antenas",
          company: "Qualcomm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que desarrolló una nueva solución de antena, logrando un aumento del 20% en eficiencia y ahorrando $150,000 en costos de producción.",
            "Optimicé diseños de antenas para aplicaciones 5G, resultando en una reducción del 30% en tamaño manteniendo el rendimiento.",
            "Mejoré los procesos de prueba que disminuyeron el tiempo de comercialización en un 15%.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Antenas",
          company: "Hewlett Packard Enterprise",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé e implementé un nuevo arreglo de antenas que mejoró la potencia de la señal en un 40%.",
            "Colaboré con equipos multifuncionales para integrar componentes RF en nuevos productos.",
            "Escribí documentación técnica que mejoró la transferencia de conocimiento y la capacitación para nuevos ingenieros.",
          ],
        },
      ],
      education: [
        { institution: "Georgia Institute of Technology", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified RF Engineer", issuer: "Institute of Electrical and Electronics Engineers (IEEE)", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero Senior de Diseño de Antenas en su currículum?", answer: "Un Ingeniero Senior de Diseño de Antenas debe incluir detalles sobre su experiencia en diseño de antenas, ingeniería RF y proyectos relevantes, así como habilidades técnicas específicas." },
      { question: "¿Cómo destacar mi currículum de Ingeniero Senior de Diseño de Antenas?", answer: "Para destacar tu currículum, enfócate en logros cuantificables, utiliza palabras clave relevantes y asegúrate de que tu diseño sea claro y profesional." },
      { question: "¿Qué habilidades necesita un Ingeniero Senior de Diseño de Antenas?", answer: "Las habilidades clave incluyen diseño de antenas, simulación electromagnética, experiencia en RF, manejo de software CAD y capacidades de liderazgo." },
    ],
  },
  "senior-design-engineer": {
    slug: "ingeniero-de-diseño-senior",
    title: "Ingeniero de Diseño Senior",
    keywords: ["currículum de ingeniero de diseño senior", "CV de ingeniero de diseño senior", "ejemplo currículum ingeniero de diseño senior", "plantilla CV ingeniero de diseño senior"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño senior", "ejemplos currículum ingeniero de diseño senior", "mejor formato CV ingeniero de diseño senior"],
    topSkills: ["software CAD", "modelado 3D", "prototipado", "análisis de diseño", "gestión de proyectos", "diseño mecánico", "colaboración en equipo", "resolución de problemas", "aseguramiento de calidad", "procesos de fabricación"],
    atsKeywords: ["ingeniería de diseño", "ingeniería mecánica", "desarrollo de productos", "validación de diseño", "análisis de ingeniería", "especificaciones de diseño", "cumplimiento normativo", "equipos multifuncionales", "documentación técnica", "mejora continua", "optimización de diseño"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño Senior",
      summary: "Ingeniero de Diseño Senior con más de 7 años de experiencia en la industria, especializado en diseño mecánico y desarrollo de productos. Ha liderado proyectos que resultaron en una reducción del 30% en los costos de producción y mejoraron las métricas de rendimiento del producto.",
      skills: ["software CAD", "modelado 3D", "prototipado", "análisis de diseño", "gestión de proyectos", "diseño mecánico", "colaboración en equipo", "resolución de problemas", "aseguramiento de calidad", "procesos de fabricación"],
      experience: [
        {
          title: "Ingeniero de Diseño Senior",
          company: "General Motors",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí el diseño de un nuevo componente de vehículo, reduciendo el peso en un 15% mientras mantenía la integridad estructural.",
            "Implementé cambios en el diseño que mejoraron la eficiencia de fabricación en un 20%, ahorrando $500,000 anualmente.",
            "Colaboré con equipos multifuncionales para desarrollar un producto que superó los puntos de referencia de rendimiento en un 25%.",
          ],
        },
        {
          title: "Ingeniero de Diseño",
          company: "Boeing",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé componentes aeroespaciales que contribuyeron a un aumento del 10% en la eficiencia de combustible.",
            "Optimicé el proceso de diseño, reduciendo el tiempo de entrega del proyecto en un 15%.",
            "Recibí el premio 'Innovador del Año' por excelencia en el diseño de ingeniería.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Engineer", issuer: "National Society of Professional Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño Senior en su currículum?", answer: "Un Ingeniero de Diseño Senior debe incluir sus habilidades técnicas, experiencia laboral relevante, proyectos destacados y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño Senior?", answer: "Utilice palabras clave específicas de la industria, resalte sus logros cuantificables y presente un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño Senior?", answer: "Las habilidades clave incluyen diseño mecánico, uso de software CAD, gestión de proyectos, y habilidades de colaboración y resolución de problemas." },
    ],
  },
  "sound-designer": {
    slug: "diseñador-de-sonido",
    title: "Diseñador de Sonido",
    keywords: ["currículum de Diseñador de Sonido", "CV de Diseñador de Sonido", "ejemplo currículum Diseñador de Sonido", "plantilla CV Diseñador de Sonido"],
    searchIntents: ["cómo escribir currículum de Diseñador de Sonido", "ejemplos currículum Diseñador de Sonido", "mejor formato CV Diseñador de Sonido"],
    topSkills: ["Edición de Audio", "Mezcla de Sonido", "Grabación de Campo", "Arte Foley", "Composición Musical", "Software de Diseño de Sonido", "Creación de Efectos de Sonido", "Edición de Diálogo", "Sonido en Post-Producción", "Colaboración Creativa"],
    atsKeywords: ["diseño de sonido", "ingeniería de audio", "pro tools", "logic pro", "foley", "mezcla", "masterización", "grabación de campo", "producción musical", "post-producción", "edición de diálogo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador de Sonido",
      summary: "Diseñador de Sonido con más de 5 años de experiencia en la creación de paisajes sonoros inmersivos. Aumentó con éxito la calidad del audio en un 30%, contribuyendo a proyectos galardonados.",
      skills: ["Edición de Audio", "Mezcla de Sonido", "Grabación de Campo", "Arte Foley", "Composición Musical", "Software de Diseño de Sonido", "Creación de Efectos de Sonido", "Edición de Diálogo", "Sonido en Post-Producción", "Colaboración Creativa"],
      experience: [
        {
          title: "Diseñador de Sonido Senior",
          company: "Epic Games",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé el diseño de sonido para más de 10 títulos AAA, mejorando la experiencia e inmersión del jugador.",
            "Logré una reducción del 25% en el tiempo de producción de audio a través de flujos de trabajo optimizados.",
            "Lideré un equipo de 5 en proyectos de diseño de sonido que recibieron aclamación crítica y aumentaron el compromiso de los usuarios en un 40%.",
          ],
        },
        {
          title: "Diseñador de Sonido",
          company: "Warner Bros. Entertainment",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé efectos de sonido y música para más de 15 películas y series.",
            "Colaboré con directores para desarrollar paisajes sonoros únicos, resultando en un aumento del 20% en la retención de la audiencia.",
            "Entrené a diseñadores de sonido junior, mejorando la eficiencia del equipo en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Diseño de Sonido", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Audio Engineer", issuer: "Audio Engineering Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador de Sonido en su currículum?", answer: "Debe incluir su experiencia en proyectos, habilidades técnicas y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Diseñador de Sonido?", answer: "Enfóquese en logros cuantificables y proyectos destacados en su carrera." },
      { question: "¿Qué habilidades necesita un Diseñador de Sonido?", answer: "Necesita habilidades en edición de audio, mezcla, grabación y software de diseño de sonido." },
    ],
  },
  "staff-physical-design-engineer": {
    slug: "ingeniero-de-diseno-fisico-senior",
    title: "Ingeniero de Diseño Físico Senior",
    keywords: ["currículum de ingeniero de diseño físico senior", "CV de ingeniero de diseño físico senior", "ejemplo currículum ingeniero de diseño físico senior", "plantilla CV ingeniero de diseño físico senior"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño físico senior", "ejemplos currículum ingeniero de diseño físico senior", "mejor formato CV ingeniero de diseño físico senior"],
    topSkills: ["diseño de distribución física", "análisis de integridad de señal", "análisis de integridad de potencia", "DFT (Diseño para Prueba)", "compatibilidad electromagnética", "herramientas Cadence", "herramientas Synopsys", "herramientas Mentor Graphics", "diseño de PCB", "modelado 3D"],
    atsKeywords: ["diseño físico", "análisis de temporización", "diseño de distribución", "sintetización", "verificación", "DFM", "reglas de diseño", "herramientas CAD", "diseño RTL", "FPGA", "ASIC"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño Físico Senior",
      summary: "Ingeniero de Diseño Físico Senior con más de 7 años en la industria de semiconductores, especializado en diseño de distribución física y análisis de integridad de señal. Mejoró con éxito la eficiencia del diseño en un 30% a través de técnicas de distribución innovadoras.",
      skills: ["diseño de distribución física", "análisis de integridad de señal", "análisis de integridad de potencia", "DFT (Diseño para Prueba)", "compatibilidad electromagnética", "herramientas Cadence", "herramientas Synopsys", "herramientas Mentor Graphics", "diseño de PCB", "modelado 3D"],
      experience: [
        {
          title: "Ingeniero de Diseño Físico Senior",
          company: "Intel Corporation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré una reducción del 25% en el tiempo de ciclo de diseño al implementar técnicas avanzadas de DFT.",
            "Dirigí un equipo que aumentó el rendimiento de integridad de señal en un 40% en múltiples líneas de productos.",
            "Optimicé el proceso de diseño, resultando en un ahorro de costos de $200,000 anuales.",
          ],
        },
        {
          title: "Ingeniero de Diseño Físico",
          company: "NVIDIA",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé con éxito más de 15 diseños complejos a tiempo y dentro del presupuesto.",
            "Desarrollé una nueva estrategia de enrutamiento que mejoró las tasas de rendimiento en un 20%.",
            "Colaboré con equipos de diseño para mejorar la eficiencia energética en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified ASIC Design Engineer", issuer: "IEEE", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño Físico Senior en su currículum?", answer: "Incluir experiencia relevante en diseño físico, habilidades técnicas específicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño Físico Senior?", answer: "Resaltar logros significativos, utilizar palabras clave relevantes y presentar un diseño limpio y profesional." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño Físico Senior?", answer: "Habilidades clave incluyen diseño de distribución física, análisis de integridad de señal y manejo de herramientas CAD." },
    ],
  },
  "storyboard-artist": {
    slug: "artista-de-storyboard",
    title: "Artista de Storyboard",
    keywords: ["currículum de artista de storyboard", "CV de artista de storyboard", "ejemplo currículum artista de storyboard", "plantilla CV artista de storyboard"],
    searchIntents: ["cómo escribir currículum de artista de storyboard", "ejemplos currículum artista de storyboard", "mejor formato CV artista de storyboard"],
    topSkills: ["narrativa visual", "diseño de personajes", "diseño de layouts", "animatics", "ilustración", "Adobe Creative Suite", "software de storyboarding", "colaboración", "comunicación", "gestión del tiempo"],
    atsKeywords: ["storyboarding", "animación", "pre-producción", "arte conceptual", "desarrollo visual", "análisis de guion", "desarrollo de personajes", "composición de escenas", "pintura digital", "dirección de arte", "colaboración creativa"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista de Storyboard",
      summary: "Artista de Storyboard con más de 5 años de experiencia en la industria de la animación, conocido por aumentar la eficiencia de los proyectos en un 30% mediante técnicas de storyboarding optimizadas.",
      skills: ["narrativa visual", "diseño de personajes", "diseño de layouts", "animatics", "ilustración", "Adobe Creative Suite", "software de storyboarding", "colaboración", "comunicación", "gestión del tiempo"],
      experience: [
        {
          title: "Artista de Storyboard Senior",
          company: "DreamWorks Animation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que produjo storyboards para una película que recaudó más de $100 millones a nivel mundial",
            "Aumenté el tiempo de entrega de storyboards en un 25% al implementar nuevas herramientas digitales",
            "Mentoricé a artistas junior, resultando en una mejora del 40% en sus contribuciones al proyecto",
          ],
        },
        {
          title: "Artista de Storyboard",
          company: "Pixar Animation Studios",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé storyboards para múltiples cortometrajes galardonados",
            "Colaboré con directores para mejorar el flujo narrativo, contribuyendo a un aumento del 15% en la participación de los espectadores",
            "Desarrollé conceptos visuales que fueron adoptados como base para diseños de personajes",
          ],
        },
      ],
      education: [
        { institution: "California Institute of the Arts", degree: "B.F.A.", field: "Animación de Personajes", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Advanced Storyboarding", issuer: "Animation Guild", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Storyboard Artist en su currículum?", answer: "Un Storyboard Artist debe incluir su experiencia en storyboarding, habilidades técnicas y ejemplos de proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Storyboard Artist?", answer: "Es recomendable personalizar el currículum para cada aplicación, enfatizando habilidades relevantes y logros destacados." },
      { question: "¿Qué habilidades necesita un Storyboard Artist?", answer: "Las habilidades clave incluyen narrativa visual, diseño de personajes, y manejo de software de storyboarding." },
    ],
  },
  "student-editorial-assistant": {
    slug: "asistente-editorial-estudiantil",
    title: "Asistente Editorial Estudiantil",
    keywords: ["currículum de asistente editorial estudiantil", "CV de asistente editorial estudiantil", "ejemplo currículum asistente editorial estudiantil", "plantilla CV asistente editorial estudiantil"],
    searchIntents: ["cómo escribir currículum de asistente editorial estudiantil", "ejemplos currículum asistente editorial estudiantil", "mejor formato CV asistente editorial estudiantil"],
    topSkills: ["Edición", "Creación de Contenido", "Investigación", "Comunicación", "Gestión del Tiempo", "Pensamiento Crítico", "Atención al Detalle", "Colaboración", "Corrección de Estilo", "Gestión de Redes Sociales"],
    atsKeywords: ["editorial", "publicación", "escritura", "investigación", "trabajo en equipo", "orientado a plazos", "desarrollo de contenido", "retroalimentación", "guías de estilo", "marketing digital", "escritura académica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Editorial Estudiantil",
      summary: "Asistente Editorial Estudiantil orientado a los detalles con más de 3 años de experiencia en edición de contenido y escritura académica. Aumentó con éxito la calidad de la publicación en un 30% mediante una corrección de estilo meticulosa y retroalimentación colaborativa.",
      skills: ["Edición", "Creación de Contenido", "Investigación", "Comunicación", "Gestión del Tiempo", "Pensamiento Crítico", "Atención al Detalle", "Colaboración", "Corrección de Estilo", "Gestión de Redes Sociales"],
      experience: [
        {
          title: "Asistente Editorial Senior",
          company: "Penguin Random House",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré la calidad de los manuscritos en un 30% mediante retroalimentación y edición específicas.",
            "Coordiné un equipo de 5 pasantes para optimizar el proceso de edición, reduciendo el tiempo de entrega en un 25%.",
            "Contribuí al exitoso lanzamiento de 10 publicaciones, aumentando la participación de los lectores en un 40%.",
          ],
        },
        {
          title: "Asistente Editorial",
          company: "Hachette Book Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en la edición de más de 50 artículos académicos, mejorando la claridad y coherencia.",
            "Implementé un nuevo sistema de seguimiento para las presentaciones, mejorando la eficiencia en un 20%.",
            "Recopilé y analicé la retroalimentación de los lectores para informar decisiones editoriales, lo que llevó a un aumento del 15% en la satisfacción.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Literatura Inglesa", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Professional Editing Certificate", issuer: "University of California, Berkeley Extension", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Student Editorial Assistant en su currículum?", answer: "Debe incluir habilidades relevantes, experiencia previa y logros destacados en la edición y creación de contenido." },
      { question: "¿Cómo destacar mi currículum de Student Editorial Assistant?", answer: "Enfatizando logros cuantificables y habilidades específicas relacionadas con la edición y el trabajo en equipo." },
      { question: "¿Qué habilidades necesita un Student Editorial Assistant?", answer: "Habilidades clave incluyen edición, atención al detalle, comunicación efectiva y gestión del tiempo." },
    ],
  },
  "studio-artist": {
    slug: "artista-de-estudio",
    title: "Artista de Estudio",
    keywords: ["currículum de artista de estudio", "CV de artista de estudio", "ejemplo currículum artista de estudio", "plantilla CV artista de estudio"],
    searchIntents: ["cómo escribir currículum de artista de estudio", "ejemplos currículum artista de estudio", "mejor formato CV artista de estudio"],
    topSkills: ["Ilustración", "Pintura Digital", "Modelado 3D", "Diseño Gráfico", "Teoría del Color", "Tipografía", "Arte Conceptual", "Animación", "Fotografía", "Dirección de Arte"],
    atsKeywords: ["creativo", "artístico", "diseño visual", "Adobe Creative Suite", "bellas artes", "colaboración", "storyboarding", "branding", "gestión de proyectos", "desarrollo de portafolio", "comunicación con clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista de Estudio",
      summary: "Artista de Estudio dinámico con más de 5 años de experiencia en la creación de contenido visual atractivo. Aumentó con éxito la participación de los clientes en un 30% a través de soluciones de diseño innovadoras.",
      skills: ["Ilustración", "Pintura Digital", "Modelado 3D", "Diseño Gráfico", "Teoría del Color", "Tipografía", "Arte Conceptual", "Animación", "Fotografía", "Dirección de Arte"],
      experience: [
        {
          title: "Artista de Estudio Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para desarrollar una exhibición de arte multimedia que aumentó la asistencia de visitantes en un 25%.",
            "Creé más de 50 piezas originales para un cliente de alto perfil, resultando en $100,000 en ingresos.",
            "Implementé nuevos procesos de diseño que redujeron el tiempo de finalización de proyectos en un 15%.",
          ],
        },
        {
          title: "Artista de Estudio",
          company: "Artistry Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé materiales de marca que mejoraron el reconocimiento del cliente en un 40%.",
            "Colaboré con un equipo multifuncional para completar más de 10 campañas de marketing exitosas.",
            "Conduje talleres que aumentaron la creatividad y la innovación del equipo.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Chicago", degree: "B.S.", field: "Bellas Artes", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Digital Artist", issuer: "Digital Arts Academy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Studio Artist en su currículum?", answer: "Un Studio Artist debe incluir ejemplos de su trabajo, habilidades técnicas relevantes y experiencia previa en proyectos artísticos." },
      { question: "¿Cómo destacar mi currículum de Studio Artist?", answer: "Destacar logros específicos, utilizar un diseño visual atractivo y personalizar el currículum para cada puesto." },
      { question: "¿Qué habilidades necesita un Studio Artist?", answer: "Un Studio Artist necesita habilidades en ilustración, diseño gráfico, modelado 3D, y una buena comprensión de la teoría del color y la tipografía." },
    ],
  },
  "stunt-performer": {
    slug: "stunt-performer-curriculum",
    title: "Artista de Doble de Riesgo",
    keywords: ["currículum de artista de doble de riesgo", "CV de artista de doble de riesgo", "ejemplo currículum artista de doble de riesgo", "plantilla CV artista de doble de riesgo"],
    searchIntents: ["cómo escribir currículum de artista de doble de riesgo", "ejemplos currículum artista de doble de riesgo", "mejor formato CV artista de doble de riesgo"],
    topSkills: ["coreografía de peleas", "caídas altas", "quemaduras de fuego", "trabajo con cables", "acrobacias en coches", "parkour", "conducción de acrobacias", "dobles de cuerpo", "esgrima", "protocolos de seguridad"],
    atsKeywords: ["coordinación de acrobacias", "escenas de acción", "forma física", "evaluación de riesgos", "efectos especiales", "acrobacias coreografiadas", "seguridad del intérprete", "colaboración en equipo", "producción cinematográfica", "habilidades de audición", "representación de personajes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista de Doble de Riesgo",
      summary: "Artista de doble de riesgo dinámico con más de 5 años de experiencia en escenas de acción de alto impacto. Ha completado con éxito más de 50 acrobacias, contribuyendo a películas que recaudaron más de 200 millones de dólares.",
      skills: ["coreografía de peleas", "caídas altas", "quemaduras de fuego", "trabajo con cables", "acrobacias en coches", "parkour", "conducción de acrobacias", "dobles de cuerpo", "esgrima", "protocolos de seguridad"],
      experience: [
        {
          title: "Artista de Doble de Riesgo Senior",
          company: "Action Films Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Ejecuté más de 30 acrobacias complejas con un 100% de registro de seguridad",
            "Aumenté la eficiencia de las acrobacias en un 15% mediante métodos de entrenamiento mejorados",
            "Colaboré en el diseño de acrobacias para una película exitosa, contribuyendo a un aumento del 25% en la participación del público",
          ],
        },
        {
          title: "Artista de Doble de Riesgo",
          company: "Thrill Productions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé acrobacias en 10 películas importantes, mejorando las secuencias de acción",
            "Entrené a 5 nuevos artistas de doble de riesgo, mejorando el rendimiento del equipo",
            "Desarrollé protocolos de seguridad que redujeron las lesiones en el set en un 30%",
          ],
        },
      ],
      education: [
        { institution: "University of the Arts", degree: "B.S.", field: "Artes Teatrales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Advanced Stunt Training", issuer: "Stunt Academy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Artista de Doble de Riesgo en su currículum?", answer: "Debe incluir su experiencia en acrobacias, habilidades específicas y logros en la industria del cine." },
      { question: "¿Cómo destacar mi currículum de Artista de Doble de Riesgo?", answer: "Enfóquese en sus logros más impactantes y en su capacidad para trabajar de manera segura y eficiente en un entorno de alto riesgo." },
      { question: "¿Qué habilidades necesita un Artista de Doble de Riesgo?", answer: "Necesita habilidades en coreografía de peleas, acrobacias, trabajo en equipo y un sólido conocimiento de los protocolos de seguridad." },
    ],
  },
  "subcontractor": {
    slug: "subcontratista",
    title: "Subcontratista",
    keywords: ["currículum de subcontratista", "CV de subcontratista", "ejemplo currículum subcontratista", "plantilla CV subcontratista"],
    searchIntents: ["cómo escribir currículum de subcontratista", "ejemplos currículum subcontratista", "mejor formato CV subcontratista"],
    topSkills: ["Gestión de Proyectos", "Estimación de Costos", "Negociación de Contratos", "Control de Calidad", "Gestión de Riesgos", "Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Habilidades Técnicas", "Colaboración en Equipo"],
    atsKeywords: ["contratista", "subcontratación", "programación de proyectos", "gestión de presupuesto", "códigos de construcción", "regulaciones de seguridad", "gestión de proveedores", "gestión de sitio", "gestión de construcción", "cumplimiento de contratos", "relaciones con clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Subcontratista",
      summary: "Subcontratista experimentado con más de 7 años en la industria de la construcción, especializado en gestión de proyectos y estimación de costos. He completado con éxito más de 50 proyectos, lo que resultó en un aumento del 30% en la satisfacción del cliente.",
      skills: ["Gestión de Proyectos", "Estimación de Costos", "Negociación de Contratos", "Control de Calidad", "Gestión de Riesgos", "Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Habilidades Técnicas", "Colaboración en Equipo"],
      experience: [
        {
          title: "Subcontratista Senior",
          company: "Construction Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia del proyecto en un 25% a través de una mejor programación y gestión de recursos.",
            "Gestionó un presupuesto de $1.5 millones, lo que resultó en un ahorro de costos del 15% para el cliente.",
            "Lideró un equipo de 10 subcontratistas en un proyecto comercial de alto perfil, finalizando 2 semanas antes de lo programado.",
          ],
        },
        {
          title: "Subcontratista",
          company: "BuildRight Contractors",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completó con éxito más de 20 proyectos residenciales con una calificación promedio del cliente de 4.8/5.",
            "Redujo los costos de materiales en un 10% a través de negociaciones estratégicas con proveedores.",
            "Implementó protocolos de seguridad que disminuyeron los incidentes en el sitio en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "OSHA 30-Hour Certification", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Subcontratista en su currículum?", answer: "Un subcontratista debe incluir sus experiencias previas, habilidades relevantes, certificaciones y logros destacados en proyectos." },
      { question: "¿Cómo destacar mi currículum de Subcontratista?", answer: "Para destacar su currículum, utilice palabras clave relevantes, resalte logros cuantificables y adapte su resumen a la oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Subcontratista?", answer: "Un subcontratista necesita habilidades en gestión de proyectos, estimación de costos, negociación de contratos, y conocimientos técnicos en construcción." },
    ],
  },
  "support-specialist-at-the-factory-hka-colombia": {
    slug: "especialista-en-soporte-en-the-factory-hka-colombia",
    title: "Especialista en Soporte en The Factory HKA Colombia",
    keywords: ["currículum de especialista en soporte", "CV de especialista en soporte", "ejemplo currículum especialista en soporte", "plantilla CV especialista en soporte"],
    searchIntents: ["cómo escribir currículum de especialista en soporte", "ejemplos currículum especialista en soporte", "mejor formato CV especialista en soporte"],
    topSkills: ["Servicio al Cliente", "Soporte Técnico", "Resolución de Problemas", "Comunicación", "Colaboración en Equipo", "Gestión del Tiempo", "Solución de Problemas", "Conocimiento del Producto", "Análisis de Datos", "Resolución de Conflictos"],
    atsKeywords: ["soporte al cliente", "asistencia técnica", "acuerdo de nivel de servicio", "sistema de tickets", "resolución de problemas", "centro de contacto", "relaciones con clientes", "capacitación a usuarios finales", "soporte remoto", "gestión de retroalimentación", "mejora de procesos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Soporte en The Factory HKA Colombia",
      summary: "Especialista en Soporte con más de 5 años de experiencia en proporcionar un servicio al cliente y soporte técnico excepcionales. Historial comprobado de mejorar la satisfacción del cliente en un 30% a través de una resolución efectiva de problemas.",
      skills: ["Servicio al Cliente", "Soporte Técnico", "Resolución de Problemas", "Comunicación", "Colaboración en Equipo", "Gestión del Tiempo", "Solución de Problemas", "Conocimiento del Producto", "Análisis de Datos", "Resolución de Conflictos"],
      experience: [
        {
          title: "Especialista en Soporte Senior",
          company: "Teleperformance",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los puntajes de satisfacción del cliente en un 25% en un año.",
            "Resolví más de 150 problemas técnicos por semana, manteniendo una tasa de resolución del 95%.",
            "Implementé nuevos protocolos de capacitación que mejoraron la eficiencia del equipo en un 20%.",
          ],
        },
        {
          title: "Especialista en Soporte",
          company: "Sitel Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una tasa de resolución en el primer contacto del 98%.",
            "Capacité y mentoreé a 10 nuevos miembros del equipo, mejorando el rendimiento del equipo.",
            "Reduje el tiempo promedio de manejo en un 15% a través de técnicas efectivas de comunicación y solución de problemas.",
          ],
        },
      ],
      education: [
        { institution: "University of Bogotá", degree: "B.S.", field: "Tecnologías de la Información", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Support Professional", issuer: "CompTIA", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Especialista en Soporte en The Factory HKA Colombia en su currículum?", answer: "Incluya su experiencia en servicio al cliente, habilidades técnicas y logros en resolución de problemas." },
      { question: "¿Cómo destacar mi currículum de Especialista en Soporte en The Factory HKA Colombia?", answer: "Utilice palabras clave relevantes y destaque sus logros en el servicio al cliente." },
      { question: "¿Qué habilidades necesita un Especialista en Soporte en The Factory HKA Colombia?", answer: "Habilidades clave incluyen servicio al cliente, soporte técnico, y resolución de problemas." },
    ],
  },
  "system-design-engineer": {
    slug: "ingeniero-de-diseno-de-sistemas",
    title: "Ingeniero de Diseño de Sistemas",
    keywords: ["currículum de ingeniero de diseño de sistemas", "CV de ingeniero de diseño de sistemas", "ejemplo currículum ingeniero de diseño de sistemas", "plantilla CV ingeniero de diseño de sistemas"],
    searchIntents: ["cómo escribir currículum de ingeniero de diseño de sistemas", "ejemplos currículum ingeniero de diseño de sistemas", "mejor formato CV ingeniero de diseño de sistemas"],
    topSkills: ["Diseño arquitectónico", "Integración de sistemas", "Computación en la nube", "Optimización del rendimiento", "Modelado de datos", "Arquitectura de microservicios", "Diseño de redes", "Prácticas de DevOps", "Metodologías ágiles", "Documentación técnica"],
    atsKeywords: ["diseño de sistemas", "principios de ingeniería", "análisis de requisitos", "desarrollo de software", "gestión de proyectos", "especificaciones técnicas", "arquitectura de sistemas", "infraestructura en la nube", "escalabilidad", "ajuste de rendimiento", "evaluación de riesgos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Diseño de Sistemas",
      summary: "Ingeniero de Diseño de Sistemas dedicado con más de 5 años de experiencia en el diseño de sistemas escalables y optimización del rendimiento. Ha liderado proyectos que resultaron en un aumento del 30% en la eficiencia y una reducción del 20% en costos.",
      skills: ["Diseño arquitectónico", "Integración de sistemas", "Computación en la nube", "Optimización del rendimiento", "Modelado de datos", "Arquitectura de microservicios", "Diseño de redes", "Prácticas de DevOps", "Metodologías ágiles", "Documentación técnica"],
      experience: [
        {
          title: "Ingeniero Senior de Diseño de Sistemas",
          company: "Tech Innovators Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré el diseño de una nueva infraestructura en la nube que redujo costos en $200,000 anualmente.",
            "Implementé una arquitectura de microservicios que mejoró la escalabilidad del sistema en un 40%.",
            "Desarrollé una herramienta de monitoreo de rendimiento que identificó cuellos de botella, resultando en un aumento del 25% en la eficiencia del sistema.",
          ],
        },
        {
          title: "Ingeniero de Diseño de Sistemas",
          company: "Solutions Corp.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé un sistema de procesamiento de datos que manejaba 1 millón de transacciones por día.",
            "Colaboré con equipos multifuncionales para entregar proyectos a tiempo y dentro del presupuesto.",
            "Mejoré los protocolos de seguridad del sistema, resultando en una reducción del 50% en vulnerabilidades.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería en Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Diseño de Sistemas en su currículum?", answer: "Un Ingeniero de Diseño de Sistemas debe incluir habilidades técnicas, experiencia laboral relevante, y proyectos destacados que demuestren su capacidad en el diseño y optimización de sistemas." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Diseño de Sistemas?", answer: "Para destacar su currículum, enfoque en resultados medibles, use palabras clave relevantes y muestre su experiencia en proyectos significativos." },
      { question: "¿Qué habilidades necesita un Ingeniero de Diseño de Sistemas?", answer: "Las habilidades clave incluyen diseño arquitectónico, integración de sistemas, computación en la nube, y buenas prácticas de DevOps." },
    ],
  },
  "title-abstractor": {
    slug: "titulo-proper-title",
    title: "Título Adecuado",
    keywords: ["currículum de Título Adecuado", "CV de Título Adecuado", "ejemplo currículum Título Adecuado", "plantilla CV Título Adecuado"],
    searchIntents: ["cómo escribir currículum de Título Adecuado", "ejemplos currículum Título Adecuado", "mejor formato CV Título Adecuado"],
    topSkills: ["Investigación y Análisis", "Atención al Detalle", "Conocimiento en Derecho de Propiedad", "Examen de Títulos", "Revisión de Documentos", "Gestión de Datos", "Comunicación", "Resolución de Problemas", "Negociación", "Gestión del Tiempo"],
    atsKeywords: ["Búsqueda de Títulos", "Resumen de Títulos", "Transacciones Inmobiliarias", "Investigación Legal", "Seguro de Títulos", "Registros de Propiedad", "Debida Diligencia", "Títulos de Tierra", "Proceso de Cierre", "Gestión de Riesgos", "Cumplimiento Regulatorio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Título Adecuado",
      summary: "Extracto de título orientado al detalle con más de 5 años de experiencia en el examen de títulos de bienes raíces y un historial comprobado de reducción de discrepancias en títulos en un 30%. Hábil en la gestión de múltiples proyectos y asegurando la documentación precisa.",
      skills: ["Investigación y Análisis", "Atención al Detalle", "Conocimiento en Derecho de Propiedad", "Examen de Títulos", "Revisión de Documentos", "Gestión de Datos", "Comunicación", "Resolución de Problemas", "Negociación", "Gestión del Tiempo"],
      experience: [
        {
          title: "Senior Title Abstractor",
          company: "First American Title Company",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en las búsquedas de títulos en un 40%, reduciendo el tiempo de respuesta de 10 días a 6 días.",
            "Gestioné exitosamente más de 200 exámenes de títulos por mes con un 98% de precisión.",
            "Lideré un proyecto de equipo que mejoró los procesos de recuperación de documentos, ahorrando a la empresa $15,000 anuales.",
          ],
        },
        {
          title: "Title Abstractor",
          company: "Chicago Title Insurance Company",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé búsquedas y exámenes de títulos exhaustivos para más de 150 transacciones inmobiliarias.",
            "Identifiqué y resolví defectos en los títulos, previniendo problemas legales potenciales para los clientes.",
            "Mantuve registros y documentación meticulosos, logrando una tasa de cumplimiento del 100% durante las auditorías.",
          ],
        },
      ],
      education: [
        { institution: "University of Illinois", degree: "B.S.", field: "Gestión de Bienes Raíces", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Title Professional", issuer: "American Land Title Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Título Adecuado en su currículum?", answer: "El currículum debe incluir experiencia relevante, habilidades específicas y certificaciones pertinentes." },
      { question: "¿Cómo destacar mi currículum de Título Adecuado?", answer: "Utiliza palabras clave del sector y resalta tus logros cuantificables." },
      { question: "¿Qué habilidades necesita un Título Adecuado?", answer: "Habilidades clave incluyen atención al detalle, gestión de datos y conocimiento en derecho de propiedad." },
    ],
  },
  "travel-writer": {
    slug: "escritor-de-viajes",
    title: "Escritor de Viajes",
    keywords: ["currículum de Escritor de Viajes", "CV de Escritor de Viajes", "ejemplo currículum Escritor de Viajes", "plantilla CV Escritor de Viajes"],
    searchIntents: ["cómo escribir currículum de Escritor de Viajes", "ejemplos currículum Escritor de Viajes", "mejor formato CV Escritor de Viajes"],
    topSkills: ["Escritura Creativa", "Investigación", "Narración de Historias", "Fotografía", "Gestión de Redes Sociales", "Edición de Contenidos", "Optimización SEO", "Conciencia Cultural", "Red de Contactos", "Planificación de Viajes"],
    atsKeywords: ["Escritura de Viajes", "Escritura Freelance", "Creación de Contenidos", "Blog de Viajes", "Edición", "Publicación", "Periodismo", "Marketing Digital", "Redacción Publicitaria", "Investigación de Mercado", "Estrategia en Redes Sociales"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Escritor de Viajes",
      summary: "Escritor de Viajes dinámico con más de 5 años de experiencia creando contenido atractivo para diversas audiencias. Logré un aumento del 30% en el compromiso de los lectores a través de narraciones cautivadoras y promoción estratégica en redes sociales.",
      skills: ["Escritura Creativa", "Investigación", "Narración de Historias", "Fotografía", "Gestión de Redes Sociales", "Edición de Contenidos", "Optimización SEO", "Conciencia Cultural", "Red de Contactos", "Planificación de Viajes"],
      experience: [
        {
          title: "Escritor de Viajes Senior",
          company: "Wanderlust Magazine",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el tráfico del sitio web en un 40% a través de estrategias de contenido dirigidas y campañas en redes sociales.",
            "Publiqué más de 50 artículos, resultando en un crecimiento de la audiencia de 25,000 suscriptores.",
            "Colaboré con oficinas de turismo para crear guías de viaje atractivas que generaron $100,000 en ingresos por patrocinio.",
          ],
        },
        {
          title: "Escritor de Viajes",
          company: "Global Travel Blog",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé una serie de artículos sobre destinos de viaje que atrajeron a 100,000 visitantes únicos.",
            "Establecí asociaciones con negocios locales, aumentando los ingresos por afiliados en un 15%.",
            "Produje fotografía de alta calidad que mejoró los artículos y aumentó las comparticiones en redes sociales en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Los Angeles", degree: "B.S.", field: "Comunicación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Travel Writer", issuer: "International Travel Writers Alliance", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Escritor de Viajes en su currículum?", answer: "Debe incluir su experiencia en la escritura, habilidades relevantes, ejemplos de trabajos anteriores y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Escritor de Viajes?", answer: "Utiliza palabras clave de la industria, muestra logros cuantificables y adapta tu currículum al puesto al que aplicas." },
      { question: "¿Qué habilidades necesita un Escritor de Viajes?", answer: "Las habilidades clave incluyen escritura creativa, investigación, gestión de redes sociales y fotografía." },
    ],
  },
  "user-experience-researcher": {
    slug: "investigador-de-experiencia-de-usuario",
    title: "Investigador de Experiencia de Usuario",
    keywords: ["currículum de investigador de experiencia de usuario", "CV de investigador de experiencia de usuario", "ejemplo currículum investigador de experiencia de usuario", "plantilla CV investigador de experiencia de usuario"],
    searchIntents: ["cómo escribir currículum de investigador de experiencia de usuario", "ejemplos currículum investigador de experiencia de usuario", "mejor formato CV investigador de experiencia de usuario"],
    topSkills: ["Investigación de Usuarios", "Pruebas de Usabilidad", "Análisis de Datos", "Wireframing", "Prototipado", "Diseño de Encuestas", "Pruebas A/B", "Interacción Humano-Computadora", "Desarrollo de Personas", "Colaboración con Interesados"],
    atsKeywords: ["experiencia de usuario", "investigación UX", "investigación cualitativa", "investigación cuantitativa", "pruebas de usuarios", "perspectivas del cliente", "mapas de recorrido", "visualización de datos", "diseño de interacción", "accesibilidad", "pensamiento de diseño"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Investigador de Experiencia de Usuario",
      summary: "Investigador de Experiencia de Usuario con más de 5 años de experiencia en la realización de investigaciones centradas en el usuario y entrega de conocimientos aplicables, resultando en un aumento del 30% en la satisfacción del usuario para productos importantes.",
      skills: ["Investigación de Usuarios", "Pruebas de Usabilidad", "Análisis de Datos", "Wireframing", "Prototipado", "Diseño de Encuestas", "Pruebas A/B", "Interacción Humano-Computadora", "Desarrollo de Personas", "Colaboración con Interesados"],
      experience: [
        {
          title: "Investigador Senior de Experiencia de Usuario",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré una iniciativa de investigación que mejoró la usabilidad del producto en un 40%, aumentando la participación del usuario.",
            "Realicé más de 50 pruebas de usabilidad, lo que llevó a una reducción del 25% en errores de usuario en funciones clave.",
            "Colaboré con equipos de diseño para crear personas de usuario, aumentando la eficiencia y alineación del diseño.",
          ],
        },
        {
          title: "Investigador de Experiencia de Usuario",
          company: "Creative Solutions Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé sistemas de retroalimentación de usuarios que aumentaron las puntuaciones de satisfacción del usuario en un 15%.",
            "Diseñé y ejecuté más de 20 estudios de investigación de usuarios, proporcionando información crítica para el desarrollo de productos.",
            "Facilité talleres que mejoraron la colaboración interfuncional en iniciativas de UX.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Interacción Humano-Computadora", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Usability Analyst", issuer: "Human Factors International", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Investigador de Experiencia de Usuario en su currículum?", answer: "Un Investigador de Experiencia de Usuario debe incluir sus habilidades en investigación, experiencia en pruebas de usabilidad y ejemplos de proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de Investigador de Experiencia de Usuario?", answer: "Para destacar su currículum, resalte logros cuantificables y utilice palabras clave relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Investigador de Experiencia de Usuario?", answer: "Las habilidades clave incluyen investigación de usuarios, análisis de datos, diseño de interacción y colaboración con equipos multidisciplinarios." },
    ],
  },
  "ux-ui": {
    slug: "curriculum-diseniador-ux-ui",
    title: "Currículum de Diseñador UX/UI",
    keywords: ["currículum de Diseñador UX/UI", "CV de Diseñador UX/UI", "ejemplo currículum Diseñador UX/UI", "plantilla CV Diseñador UX/UI"],
    searchIntents: ["cómo escribir currículum de Diseñador UX/UI", "ejemplos currículum Diseñador UX/UI", "mejor formato CV Diseñador UX/UI"],
    topSkills: ["Investigación de Usuarios", "Wireframing", "Prototipado", "Diseño de Interacción", "Diseño Visual", "Pruebas de Usabilidad", "Estrategia de Experiencia de Usuario", "Diseño Responsivo", "Arquitectura de la Información", "Software de Diseño (Sketch, Figma, Adobe XD)"],
    atsKeywords: ["diseño UX", "diseño UI", "experiencia de usuario", "interfaz de usuario", "herramientas de prototipado", "pruebas de usabilidad", "wireframing", "comunicación visual", "diseño responsivo", "diseño de interacción", "pensamiento de diseño"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Diseñador UX/UI",
      summary: "Diseñador UX/UI dinámico con más de 5 años de experiencia en la creación de diseños centrados en el usuario para aplicaciones web y móviles, lo que ha llevado a un aumento del 30% en la participación de los usuarios.",
      skills: ["Investigación de Usuarios", "Wireframing", "Prototipado", "Diseño de Interacción", "Diseño Visual", "Pruebas de Usabilidad", "Estrategia de Experiencia de Usuario", "Diseño Responsivo", "Arquitectura de la Información", "Software de Diseño (Sketch, Figma, Adobe XD)"],
      experience: [
        {
          title: "Diseñador UX/UI Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó los puntajes de satisfacción del usuario en un 40% a través de procesos de diseño iterativos.",
            "Lideró un equipo de 4 diseñadores para entregar una aplicación móvil, resultando en 25,000 descargas en el primer mes.",
            "Realizó pruebas de usabilidad que mejoraron el flujo del usuario, reduciendo las tasas de abandono en un 15%.",
          ],
        },
        {
          title: "Diseñador UX/UI",
          company: "Creative Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Rediseñó el sitio web de la empresa, lo que llevó a un aumento del 50% en el tráfico.",
            "Colaboró con equipos multifuncionales para lanzar nuevas características, mejorando la retención de usuarios en un 20%.",
            "Desarrolló prototipos que redujeron los plazos de los proyectos en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified UX Designer", issuer: "Interaction Design Foundation", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Diseñador UX/UI?", answer: "Un currículum de Diseñador UX/UI debe incluir experiencia laboral relevante, habilidades técnicas, proyectos destacados y educación en diseño." },
      { question: "¿Cómo destacar mi currículum de Diseñador UX/UI?", answer: "Para destacar tu currículum, utiliza un formato limpio, destaca tus logros cuantificables y personaliza el contenido para cada puesto." },
      { question: "¿Qué habilidades necesita un Diseñador UX/UI?", answer: "Un Diseñador UX/UI necesita habilidades en investigación de usuarios, prototipado, diseño visual, pruebas de usabilidad y trabajo en equipo." },
    ],
  },
  "vice-president-visual-merchandising": {
    slug: "vice-president-visual-merchandising",
    title: "Vicepresidente de Merchandising Visual",
    keywords: ["currículum de vicepresidente de merchandising visual", "CV de vicepresidente de merchandising visual", "ejemplo currículum vicepresidente de merchandising visual", "plantilla CV vicepresidente de merchandising visual"],
    searchIntents: ["cómo escribir currículum de vicepresidente de merchandising visual", "ejemplos currículum vicepresidente de merchandising visual", "mejor formato CV vicepresidente de merchandising visual"],
    topSkills: ["Planificación Estratégica", "Merchandising Visual", "Liderazgo de Equipos", "Gestión de Marca", "Estrategia de Retail", "Análisis del Comportamiento del Consumidor", "Colocación de Productos", "Análisis de Tendencias de Mercado", "Dirección Creativa", "Optimización de Ventas"],
    atsKeywords: ["estrategia de merchandising", "presentación visual", "rendimiento de ventas", "gestión de retail", "control de inventario", "posicionamiento de marca", "colaboración interfuncional", "experiencia del cliente", "predicción de tendencias", "diseño de distribución de tienda", "estrategias promocionales"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Vicepresidente de Merchandising Visual",
      summary: "Vicepresidente de Merchandising Visual orientado a resultados con más de 10 años de experiencia en impulsar el crecimiento de marca y mejorar el compromiso del cliente. Historial comprobado de aumento de ventas en un 25% a través de estrategias de merchandising innovadoras y liderazgo efectivo de equipos.",
      skills: ["Planificación Estratégica", "Merchandising Visual", "Liderazgo de Equipos", "Gestión de Marca", "Estrategia de Retail", "Análisis del Comportamiento del Consumidor", "Colocación de Productos", "Análisis de Tendencias de Mercado", "Dirección Creativa", "Optimización de Ventas"],
      experience: [
        {
          title: "Vicepresidente Senior de Merchandising Visual",
          company: "Macy's",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas generales en un 30% en el primer año a través de exhibiciones visuales optimizadas.",
            "Dirigí un equipo de 25 merchandisers visuales para crear experiencias de marca cohesivas en más de 100 ubicaciones de retail.",
            "Implementé estrategias de merchandising basadas en datos que mejoraron el compromiso del cliente en un 40%.",
          ],
        },
        {
          title: "Director de Merchandising Visual",
          company: "Nordstrom",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Reformé los diseños de tienda lo que resultó en un aumento del 20% en el tráfico peatonal.",
            "Desarrollé estrategias visuales innovadoras que contribuyeron a un aumento del 15% en las ventas durante promociones estacionales.",
            "Colaboré con equipos de marketing para lanzar campañas visuales exitosas, mejorando la visibilidad de la marca.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Merchandising de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Visual Merchandiser (CVM)", issuer: "International Visual Merchandising Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Vice President Visual Merchandising en su currículum?", answer: "Un Vicepresidente de Merchandising Visual debe incluir su experiencia en liderazgo, estrategias de merchandising y resultados en ventas." },
      { question: "¿Cómo destacar mi currículum de Vice President Visual Merchandising?", answer: "Enfatiza tus logros en ventas y estrategias innovadoras, así como tu capacidad para liderar equipos." },
      { question: "¿Qué habilidades necesita un Vice President Visual Merchandising?", answer: "Se necesitan habilidades en planificación estratégica, merchandising visual, liderazgo de equipos y análisis de mercado." },
    ],
  },
  "video-game-writer": {
    slug: "escritor-de-videojuegos",
    title: "Escritor de Videojuegos",
    keywords: ["currículum de escritor de videojuegos", "CV de escritor de videojuegos", "ejemplo currículum escritor de videojuegos", "plantilla CV escritor de videojuegos"],
    searchIntents: ["cómo escribir currículum de escritor de videojuegos", "ejemplos currículum escritor de videojuegos", "mejor formato CV escritor de videojuegos"],
    topSkills: ["Diseño Narrativo", "Desarrollo de Personajes", "Escritura de Diálogos", "Construcción de Mundos", "Mecánicas de Juego", "Storyboard", "Guionismo", "Gestión de Proyectos", "Edición", "Investigación"],
    atsKeywords: ["escritura de videojuegos", "diseño narrativo", "guionismo", "arcos de personajes", "desarrollo de historias", "narrativas de juegos", "narrativa interactiva", "escritura creativa", "colaboración", "edición", "creación de contenido"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Escritor de Videojuegos",
      summary: "Escritor de Videojuegos creativo con más de 5 años de experiencia en diseño narrativo y guionismo, contribuyendo a títulos que han vendido más de 2 millones de copias a nivel mundial.",
      skills: ["Diseño Narrativo", "Desarrollo de Personajes", "Escritura de Diálogos", "Construcción de Mundos", "Mecánicas de Juego", "Storyboard", "Guionismo", "Gestión de Proyectos", "Edición", "Investigación"],
      experience: [
        {
          title: "Diseñador Narrativo Senior",
          company: "Epic Games",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para desarrollar una narrativa que aumentó el compromiso de los jugadores en un 30%",
            "Escribí más de 100,000 palabras de diálogos para el último título, contribuyendo a un aumento del 25% en la calificación de usuarios",
            "Implementé elementos de la historia que resultaron en un aumento del 15% en las compras dentro del juego",
          ],
        },
        {
          title: "Escritor de Juegos Junior",
          company: "Ubisoft",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Colaboré en la historia de un título AAA, ayudando a lograr un puntaje de 90% en Metacritic",
            "Asistí en el desarrollo de arcos de personajes que mejoraron la inmersión del jugador",
            "Creé misiones secundarias atractivas que contribuyeron a un aumento del 20% en el tiempo de juego",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Cine y Televisión", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Game Writer", issuer: "International Game Developers Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Video Game Writer en su currículum?", answer: "Un Video Game Writer debe incluir su experiencia en diseño narrativo, habilidades de escritura, y proyectos anteriores relevantes." },
      { question: "¿Cómo destacar mi currículum de Video Game Writer?", answer: "Para destacar, enfócate en logros cuantificables y proyectos exitosos en los que hayas trabajado." },
      { question: "¿Qué habilidades necesita un Video Game Writer?", answer: "Las habilidades clave incluyen diseño narrativo, escritura de diálogos, y colaboración en equipo." },
    ],
  },
  "visual-and-performing-arts-coordinator": {
    slug: "coordinador-de-artes-visuales-y-escenicas",
    title: "Coordinador de Artes Visuales y Escénicas",
    keywords: ["currículum de coordinador de artes visuales y escénicas", "CV de coordinador de artes visuales y escénicas", "ejemplo currículum coordinador de artes", "plantilla CV coordinador de artes"],
    searchIntents: ["cómo escribir currículum de coordinador de artes visuales y escénicas", "ejemplos currículum coordinador de artes", "mejor formato CV coordinador de artes"],
    topSkills: ["Planificación de eventos", "Dirección artística", "Gestión de proyectos", "Presupuestación", "Compromiso comunitario", "Colaboración", "Desarrollo curricular", "Recaudación de fondos", "Estrategias de marketing", "Oratoria"],
    atsKeywords: ["artes visuales", "artes escénicas", "coordinador de artes", "gestión de eventos", "dirección creativa", "educación artística", "alcance comunitario", "desarrollo de programas", "gestión presupuestaria", "compromiso de partes interesadas", "administración de artes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Coordinador de Artes Visuales y Escénicas",
      summary: "Coordinador de Artes Visuales y Escénicas con más de 5 años de experiencia en el campo, conocido por aumentar la participación en programas en un 30% y asegurar $100,000 en financiamiento de subvenciones.",
      skills: ["Planificación de eventos", "Dirección artística", "Gestión de proyectos", "Presupuestación", "Compromiso comunitario", "Colaboración", "Desarrollo curricular", "Recaudación de fondos", "Estrategias de marketing", "Oratoria"],
      experience: [
        {
          title: "Coordinador Senior de Artes",
          company: "Creative Arts Foundation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la asistencia a talleres comunitarios en un 40% en dos años.",
            "Aseguró $100,000 en financiamiento de subvenciones para programas de educación artística.",
            "Desarrolló una asociación con escuelas locales, resultando en un aumento del 25% en la participación estudiantil.",
          ],
        },
        {
          title: "Gerente de Programas de Artes",
          company: "City Cultural Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Expandió el festival anual de artes, atrayendo a más de 5,000 asistentes.",
            "Implementó una nueva estrategia de marketing que aumentó el patrocinio de eventos en un 50%.",
            "Facilitó proyectos colaborativos con 10 artistas locales, mejorando el compromiso comunitario.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Artes", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nonprofit Professional", issuer: "Nonprofit Leadership Alliance", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Visual And Performing Arts Coordinator en su currículum?", answer: "Incluir experiencia en gestión de eventos, dirección artística y compromiso comunitario." },
      { question: "¿Cómo destacar mi currículum de Visual And Performing Arts Coordinator?", answer: "Enfatizar logros medibles y habilidades clave en el área de artes." },
      { question: "¿Qué habilidades necesita un Visual And Performing Arts Coordinator?", answer: "Habilidades en planificación de eventos, colaboración y desarrollo de programas." },
    ],
  },
  "visual-designer": {
    slug: "diseñador-visual",
    title: "Diseñador Visual",
    keywords: ["currículum de Diseñador Visual", "CV de Diseñador Visual", "ejemplo currículum Diseñador Visual", "plantilla CV Diseñador Visual"],
    searchIntents: ["cómo escribir currículum de Diseñador Visual", "ejemplos currículum Diseñador Visual", "mejor formato CV Diseñador Visual"],
    topSkills: ["Adobe Creative Suite", "Diseño UI/UX", "Diseño Gráfico", "Identidad de Marca", "Tipografía", "Teoría del Color", "Diseño Web", "Ilustración Digital", "Diseño de Interacción", "Prototipado"],
    atsKeywords: ["diseño visual", "diseño gráfico", "diseño UI", "diseño UX", "Adobe Photoshop", "Adobe Illustrator", "Sketch", "InVision", "Figma", "diseño responsivo", "branding"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador Visual",
      summary: "Diseñador Visual Creativo con más de 5 años de experiencia en el desarrollo de interfaces digitales atractivas y fáciles de usar. Historial comprobado de aumento del compromiso del usuario en un 30% a través de soluciones de diseño innovadoras.",
      skills: ["Adobe Creative Suite", "Diseño UI/UX", "Diseño Gráfico", "Identidad de Marca", "Tipografía", "Teoría del Color", "Diseño Web", "Ilustración Digital", "Diseño de Interacción", "Prototipado"],
      experience: [
        {
          title: "Diseñador Visual Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Rediseñé el sitio web de la empresa, lo que resultó en un aumento del 40% en la retención de usuarios.",
            "Lideré un equipo de diseñadores para desarrollar una aplicación móvil que alcanzó 100,000 descargas en el primer mes.",
            "Mejoré la eficiencia del proceso de diseño en un 25% mediante la implementación de nuevas herramientas de diseño.",
          ],
        },
        {
          title: "Diseñador Visual",
          company: "Innovative Designs LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé materiales de branding que aumentaron el reconocimiento de marca del cliente en un 50%.",
            "Colaboré con desarrolladores para crear un diseño web responsivo que mejoró el tráfico móvil en un 60%.",
            "Diseñé material de marketing que contribuyó a un aumento del 20% en las ventas.",
          ],
        },
      ],
      education: [
        { institution: "Art Institute of Design", degree: "Licenciatura", field: "Diseño Gráfico", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Adobe Certified Expert", issuer: "Adobe", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador Visual en su currículum?", answer: "Incluir habilidades técnicas, experiencia laboral relevante y un portafolio de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de Diseñador Visual?", answer: "Utilizar un diseño atractivo y claro, y resaltar logros cuantificables en los trabajos anteriores." },
      { question: "¿Qué habilidades necesita un Diseñador Visual?", answer: "Habilidades clave incluyen el manejo de herramientas de diseño, comprensión de la experiencia del usuario y capacidad de trabajo en equipo." },
    ],
  },
  "visual-effects-artist": {
    slug: "artista-de-efectos-visuales",
    title: "Artista de Efectos Visuales",
    keywords: ["currículum de Artista de Efectos Visuales", "CV de Artista de Efectos Visuales", "ejemplo currículum Artista de Efectos Visuales", "plantilla CV Artista de Efectos Visuales"],
    searchIntents: ["cómo escribir currículum de Artista de Efectos Visuales", "ejemplos currículum Artista de Efectos Visuales", "mejor formato CV Artista de Efectos Visuales"],
    topSkills: ["Modelado 3D", "Composición", "Animación", "Iluminación", "Texturización", "Renderizado", "Gráficos en Movimiento", "Narración Visual", "Competencia en Software", "Resolución de Problemas"],
    atsKeywords: ["Efectos Visuales", "VFX", "Adobe After Effects", "Nuke", "Maya", "Cinema 4D", "Photoshop", "ZBrush", "Unity", "Colaboración", "Creatividad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Artista de Efectos Visuales",
      summary: "Artista de Efectos Visuales con más de 5 años de experiencia en la industria, especializado en modelado 3D y composición. Contribuyó con éxito a proyectos que aumentaron el compromiso de los espectadores en un 30%.",
      skills: ["Modelado 3D", "Composición", "Animación", "Iluminación", "Texturización", "Renderizado", "Gráficos en Movimiento", "Narración Visual", "Competencia en Software", "Resolución de Problemas"],
      experience: [
        {
          title: "Artista de Efectos Visuales Senior",
          company: "Weta Digital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo de artistas para crear efectos visuales para una película taquillera, resultando en un aumento del 40% en los ingresos de taquilla.",
            "Implementé nuevas técnicas de renderizado que redujeron el tiempo de producción en un 25%.",
            "Colaboré con directores y productores para entregar contenido visual de alta calidad que mejoró la narración.",
          ],
        },
        {
          title: "Artista de Efectos Visuales",
          company: "Industrial Light & Magic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé modelos 3D complejos para importantes franquicias cinematográficas, contribuyendo a una serie que recaudó más de $1 billón en todo el mundo.",
            "Optimicé flujos de trabajo que mejoraron los tiempos de entrega de proyectos en un 15%.",
            "Recibí reconocimiento por contribuciones destacadas al equipo de efectos visuales.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Animación y Artes Digitales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Visual Effects Artist", issuer: "VFX Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Artista de Efectos Visuales en su currículum?", answer: "Debe incluir su experiencia en la industria, habilidades técnicas, y proyectos relevantes." },
      { question: "¿Cómo destacar mi currículum de Artista de Efectos Visuales?", answer: "Enfatiza tus logros y utiliza palabras clave relevantes para la industria." },
      { question: "¿Qué habilidades necesita un Artista de Efectos Visuales?", answer: "Necesita habilidades en modelado 3D, composición, y software de efectos visuales." },
    ],
  },
  "visual-stylist": {
    slug: "estilista-visual",
    title: "Estilista Visual",
    keywords: ["currículum de estilista visual", "CV de estilista visual", "ejemplo currículum estilista visual", "plantilla CV estilista visual"],
    searchIntents: ["cómo escribir currículum de estilista visual", "ejemplos currículum estilista visual", "mejor formato CV estilista visual"],
    topSkills: ["Dirección Creativa", "Teoría del Color", "Estilismo de Moda", "Análisis de Tendencias", "Merchandising Visual", "Estilismo Fotográfico", "Desarrollo de Marca", "Consultoría con Clientes", "Estilismo de Eventos", "Estrategia de Redes Sociales"],
    atsKeywords: ["merchandising visual", "estilismo de moda", "dirección creativa", "teoría del color", "análisis de tendencias", "branding", "relaciones con clientes", "planificación de eventos", "técnicas de estilismo", "sesiones fotográficas", "estilismo comercial"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Estilista Visual",
      summary: "Estilista Visual con más de 5 años de experiencia en la industria de la moda, reconocido por aumentar la satisfacción de los clientes en eventos en un 30% a través de soluciones de estilismo innovadoras.",
      skills: ["Dirección Creativa", "Teoría del Color", "Estilismo de Moda", "Análisis de Tendencias", "Merchandising Visual", "Estilismo Fotográfico", "Desarrollo de Marca", "Consultoría con Clientes", "Estilismo de Eventos", "Estrategia de Redes Sociales"],
      experience: [
        {
          title: "Estilista Visual Senior",
          company: "Chic Styles Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 30% a través de consultas de estilismo personalizadas.",
            "Estilicé con éxito más de 50 eventos importantes, mejorando la visibilidad y el compromiso de la marca.",
            "Desarrollé informes de tendencias estacionales que influyeron en las decisiones de la línea de productos, resultando en un aumento del 15% en las ventas.",
          ],
        },
        {
          title: "Estilista Visual",
          company: "Fashion Forward LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Estilicé sesiones editoriales que contribuyeron a un aumento del 20% en las suscripciones de la revista.",
            "Colaboré con fotógrafos y diseñadores para crear narrativas visuales atractivas.",
            "Ejecuté estrategias de merchandising que aumentaron las ventas en tienda en un 25%.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Merchandising de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Fashion Stylist", issuer: "Style Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Estilista Visual en su currículum?", answer: "Un Estilista Visual debe incluir su experiencia laboral, habilidades relevantes, logros destacados y formación académica." },
      { question: "¿Cómo destacar mi currículum de Estilista Visual?", answer: "Para destacar su currículum, utilice palabras clave del sector, presente sus logros cuantificables y mantenga un diseño limpio y profesional." },
      { question: "¿Qué habilidades necesita un Estilista Visual?", answer: "Un Estilista Visual necesita habilidades en estilismo de moda, dirección creativa, análisis de tendencias, y comunicación efectiva con clientes." },
    ],
  },
  "wardrobe-stylist": {
    slug: "estilista-de-guardarropa",
    title: "Estilista de Guardarropa",
    keywords: ["currículum de estilista de guardarropa", "CV de estilista de guardarropa", "ejemplo currículum estilista de guardarropa", "plantilla CV estilista de guardarropa"],
    searchIntents: ["cómo escribir currículum de estilista de guardarropa", "ejemplos currículum estilista de guardarropa", "mejor formato CV estilista de guardarropa"],
    topSkills: ["Coordinación de Moda", "Teoría del Color", "Análisis de Tendencias", "Consulta al Cliente", "Estilización de Eventos", "Planificación de Guardarropa", "Asesoría de Imagen", "Compras Personales", "Comercio de Moda", "Narración Visual"],
    atsKeywords: ["estilismo", "moda", "estilista personal", "gestión de guardarropa", "relaciones con clientes", "estilización de eventos", "desarrollo de imagen", "creación de lookbooks", "tendencias de moda", "merchandising visual", "coordinación de colores"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Estilista de Guardarropa",
      summary: "Estilista de guardarropa experimentada con más de 5 años en la industria de la moda, conocida por aumentar la satisfacción del cliente en un 30% a través de servicios de estilismo personalizados.",
      skills: ["Coordinación de Moda", "Teoría del Color", "Análisis de Tendencias", "Consulta al Cliente", "Estilización de Eventos", "Planificación de Guardarropa", "Asesoría de Imagen", "Compras Personales", "Comercio de Moda", "Narración Visual"],
      experience: [
        {
          title: "Estilista de Guardarropa Senior",
          company: "Fashion Forward Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la retención de clientes en un 25% a través de servicios de estilismo personalizados",
            "Estilizó a más de 100 clientes para eventos importantes, recibiendo una tasa de satisfacción del 95%",
            "Desarrollé lookbooks estacionales que resultaron en un aumento del 40% en consultas de clientes",
          ],
        },
        {
          title: "Estilista de Guardarropa",
          company: "Chic Styles Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné exitosamente el guardarropa para un desfile de moda con más de 500 asistentes",
            "Colaboré con fotógrafos para crear portafolios visualmente atractivos",
            "Mejoré la organización del guardarropa del cliente, facilitando el proceso de selección de atuendos diarios",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Comercio de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Image Consultant", issuer: "International Association of Image Consultants", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un estilista de guardarropa en su currículum?", answer: "Debe incluir experiencia en estilismo, habilidades en coordinación de moda y ejemplos de trabajos anteriores." },
      { question: "¿Cómo destacar mi currículum de estilista de guardarropa?", answer: "Enfatiza tus logros, utiliza palabras clave de la industria y presenta un portafolio visual." },
      { question: "¿Qué habilidades necesita un estilista de guardarropa?", answer: "Habilidades clave incluyen coordinación de moda, asesoría de imagen y manejo de relaciones con clientes." },
    ],
  },
  "web-designer": {
    slug: "diseñador-web",
    title: "Diseñador Web",
    keywords: ["currículum de Diseñador Web", "CV de Diseñador Web", "ejemplo currículum Diseñador Web", "plantilla CV Diseñador Web"],
    searchIntents: ["cómo escribir currículum de Diseñador Web", "ejemplos currículum Diseñador Web", "mejor formato CV Diseñador Web"],
    topSkills: ["HTML", "CSS", "JavaScript", "Adobe Photoshop", "Adobe Illustrator", "Diseño Responsivo", "Diseño UX/UI", "Wireframing", "Prototipado", "SEO"],
    atsKeywords: ["diseño web", "experiencia del usuario", "diseño gráfico", "diseño web responsivo", "desarrollo front-end", "diseño visual", "interfaz de usuario", "UI/UX", "HTML5", "CSS3", "JavaScript"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Diseñador Web",
      summary: "Diseñador Web con más de 5 años de experiencia en la industria, especializado en la creación de sitios web responsivos y amigables para el usuario. Aumentó exitosamente el compromiso de los usuarios en más del 30% a través de implementaciones de diseño estratégicas.",
      skills: ["HTML", "CSS", "JavaScript", "Adobe Photoshop", "Adobe Illustrator", "Diseño Responsivo", "Diseño UX/UI", "Wireframing", "Prototipado", "SEO"],
      experience: [
        {
          title: "Diseñador Web Senior",
          company: "Creative Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto de rediseño que mejoró el tráfico del sitio en un 40%",
            "Desarrollé un diseño centrado en el usuario que disminuyó la tasa de rebote en un 25%",
            "Colaboré con el equipo de desarrollo para lanzar más de 10 sitios web a tiempo y dentro del presupuesto",
          ],
        },
        {
          title: "Diseñador Web",
          company: "Innovative Designs Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé más de 50 diseños únicos de sitios web para varios clientes",
            "Aumenté las calificaciones de satisfacción del cliente en un 20% a través de una mejor usabilidad del sitio web",
            "Capacité a diseñadores junior en mejores prácticas y herramientas de diseño",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Diseño y Desarrollo Web", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Web Designer", issuer: "International Web Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Diseñador Web en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia laboral, y ejemplos de trabajos previos." },
      { question: "¿Cómo destacar mi currículum de Diseñador Web?", answer: "Enfócate en tus logros y utiliza palabras clave relevantes." },
      { question: "¿Qué habilidades necesita un Diseñador Web?", answer: "HTML, CSS, JavaScript, diseño responsivo y habilidades en UX/UI." },
    ],
  },
  "web-editor": {
    slug: "editor-web",
    title: "Editor Web",
    keywords: ["currículum de Editor Web", "CV de Editor Web", "ejemplo currículum Editor Web", "plantilla CV Editor Web"],
    searchIntents: ["cómo escribir currículum de Editor Web", "ejemplos currículum Editor Web", "mejor formato CV Editor Web"],
    topSkills: ["Sistemas de Gestión de Contenido", "Optimización SEO", "Redacción Publicitaria", "Edición", "Gestión de Redes Sociales", "Habilidades Analíticas", "Gestión de Proyectos", "HTML/CSS", "Estrategia de Contenidos", "Diseño de Experiencia de Usuario"],
    atsKeywords: ["edición web", "creación de contenido", "SEO", "publicación digital", "edición de copias", "estrategia de contenido", "redes sociales", "analítica", "CMS", "colaboración en equipo", "aseguramiento de calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Editor Web",
      summary: "Editor Web experimentado con más de 5 años en la industria, especializado en estrategia de contenido en línea y optimización SEO, resultando en un aumento del 30% en el tráfico web para múltiples clientes.",
      skills: ["Sistemas de Gestión de Contenido", "Optimización SEO", "Redacción Publicitaria", "Edición", "Gestión de Redes Sociales", "Habilidades Analíticas", "Gestión de Proyectos", "HTML/CSS", "Estrategia de Contenidos", "Diseño de Experiencia de Usuario"],
      experience: [
        {
          title: "Editor Web Senior",
          company: "Digital Innovations Ltd.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que aumentó el compromiso de la audiencia en un 40% mediante estrategias de contenido dirigidas",
            "Implementé una revisión de SEO que resultó en un crecimiento del 25% en el tráfico de búsqueda orgánica",
            "Produje y edité más de 200 artículos que contribuyeron a un aumento del 15% en los ingresos por colocaciones publicitarias",
          ],
        },
        {
          title: "Editor de Contenido Web",
          company: "Creative Media Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Renové el calendario de contenido, aumentando la entrega a tiempo en un 50%",
            "Colaboré con equipos multifuncionales para mejorar la experiencia del usuario, resultando en una disminución del 20% en la tasa de rebote",
            "Capacité a editores junior, mejorando la eficiencia general del equipo en un 30%",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Comunicaciones", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Google Analytics Certification", issuer: "Google", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Editor Web en su currículum?", answer: "Incluir experiencia en edición, redacción, y herramientas de SEO." },
      { question: "¿Cómo destacar mi currículum de Editor Web?", answer: "Utilizar palabras clave del sector y resaltar logros cuantificables." },
      { question: "¿Qué habilidades necesita un Editor Web?", answer: "Habilidades en redacción, SEO, gestión de contenido, y analítica." },
    ],
  }
};
