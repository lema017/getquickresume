import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  "agricultural-worker": {
    slug: "trabajador-agricola",
    title: "Trabajador Agrícola",
    keywords: ["currículum de Trabajador Agrícola", "CV de Trabajador Agrícola", "ejemplo currículum Trabajador Agrícola", "plantilla CV Trabajador Agrícola"],
    searchIntents: ["cómo escribir currículum de Trabajador Agrícola", "ejemplos currículum Trabajador Agrícola", "mejor formato CV Trabajador Agrícola"],
    topSkills: ["Gestión de cultivos", "Control de plagas", "Sistemas de riego", "Técnicas de cosecha", "Evaluación de la salud del suelo", "Operación de equipos", "Métodos de plantación", "Recolección y análisis de datos", "Prácticas de agricultura sostenible", "Colaboración en equipo"],
    atsKeywords: ["agricultura", "operaciones agrícolas", "producción de cultivos", "trabajo de campo", "protocolos de seguridad", "fertilización", "riego", "cosecha", "mantenimiento de equipos", "trabajo en equipo", "resolución de problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador Agrícola",
      summary: "Trabajador agrícola dedicado con más de 5 años de experiencia en gestión de cultivos y prácticas de agricultura sostenible, logrando un incremento del 20% en el rendimiento a través de técnicas innovadoras.",
      skills: ["Gestión de cultivos", "Control de plagas", "Sistemas de riego", "Técnicas de cosecha", "Evaluación de la salud del suelo", "Operación de equipos", "Métodos de plantación", "Recolección y análisis de datos", "Prácticas de agricultura sostenible", "Colaboración en equipo"],
      experience: [
        {
          title: "Técnico Agrícola Senior",
          company: "Green Fields Farm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el rendimiento de los cultivos en un 25% mediante la implementación de técnicas avanzadas de riego",
            "Reduje el uso de pesticidas en un 15% manteniendo la salud de los cultivos",
            "Entrené a un equipo de 10 nuevos trabajadores en prácticas de agricultura sostenible",
          ],
        },
        {
          title: "Trabajador Agrícola",
          company: "Sunny Acres Farm",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné con éxito una granja de verduras de 50 acres, asegurando productos de alta calidad",
            "Implementé un nuevo sistema de rotación de cultivos que mejoró la fertilidad del suelo",
            "Ayudé a reducir los costos operativos en un 10% mediante una gestión eficiente de los recursos",
          ],
        },
      ],
      education: [
        { institution: "State University of Agriculture", degree: "B.S.", field: "Ciencias Agrícolas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Agricultural Technician", issuer: "National Agricultural Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Trabajador Agrícola en su currículum?", answer: "Un Trabajador Agrícola debe incluir su experiencia laboral relevante, habilidades técnicas, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Trabajador Agrícola?", answer: "Destaca tus logros cuantificables y experiencia en prácticas agrícolas sostenibles." },
      { question: "¿Qué habilidades necesita un Trabajador Agrícola?", answer: "Las habilidades clave incluyen gestión de cultivos, control de plagas, y operación de equipos agrícolas." },
    ],
  },
  "apartment-maintenance": {
    slug: "tecnico-de-mantenimiento-de-apartamentos",
    title: "Técnico de Mantenimiento de Apartamentos",
    keywords: ["currículum de técnico de mantenimiento de apartamentos", "CV de técnico de mantenimiento de apartamentos", "ejemplo currículum técnico de mantenimiento de apartamentos", "plantilla CV técnico de mantenimiento de apartamentos"],
    searchIntents: ["cómo escribir currículum de técnico de mantenimiento de apartamentos", "ejemplos currículum técnico de mantenimiento de apartamentos", "mejor formato CV técnico de mantenimiento de apartamentos"],
    topSkills: ["Fontanería", "Reparación Eléctrica", "Mantenimiento de HVAC", "Carpintería", "Reparación de Paneles de Yeso", "Pintura", "Reparación de Electrodomésticos", "Jardinería", "Cumplimiento de Seguridad", "Servicio al Cliente"],
    atsKeywords: ["técnico de mantenimiento", "reparaciones de apartamentos", "mantenimiento preventivo", "diagnóstico de problemas", "habilidades de fontanería", "sistemas eléctricos", "sistemas HVAC", "habilidades de carpintería", "relaciones con los clientes", "gestión de propiedades", "regulaciones de seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico de Mantenimiento de Apartamentos",
      summary: "Técnico de Mantenimiento de Apartamentos dedicado con más de 5 años de experiencia en el mantenimiento de propiedades residenciales. Redujo con éxito el tiempo de respuesta de mantenimiento en un 30% y mejoró las puntuaciones de satisfacción de los inquilinos en un 15%.",
      skills: ["Fontanería", "Reparación Eléctrica", "Mantenimiento de HVAC", "Carpintería", "Reparación de Paneles de Yeso", "Pintura", "Reparación de Electrodomésticos", "Jardinería", "Cumplimiento de Seguridad", "Servicio al Cliente"],
      experience: [
        {
          title: "Técnico de Mantenimiento Senior",
          company: "Greenwood Apartments",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje el tiempo de respuesta de mantenimiento en un 30%, mejorando la satisfacción de los inquilinos.",
            "Gestioné un equipo de 3 técnicos, aumentando la eficiencia en un 25%.",
            "Implementé un programa de mantenimiento preventivo que disminuyó las llamadas de reparación de emergencia en un 40%.",
          ],
        },
        {
          title: "Técnico de Mantenimiento",
          company: "Maplewood Estates",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé más de 300 órdenes de trabajo al año, manteniendo altos estándares de calidad.",
            "Logré una reducción del 15% en los costos de reparación a través de una gestión efectiva de recursos.",
            "Mejoré las calificaciones de satisfacción de los inquilinos en un 20% mediante un servicio oportuno y efectivo.",
          ],
        },
      ],
      education: [
        { institution: "Community College of Philadelphia", degree: "A.A.S.", field: "Gestión de Instalaciones", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "EPA 608 Certification", issuer: "Environmental Protection Agency", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico de Mantenimiento de Apartamentos en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia laboral previa y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Técnico de Mantenimiento de Apartamentos?", answer: "Enfatiza tus logros cuantificables y habilidades específicas en el mantenimiento." },
      { question: "¿Qué habilidades necesita un Técnico de Mantenimiento de Apartamentos?", answer: "Necesita habilidades en fontanería, electricidad, HVAC, carpintería, y servicio al cliente." },
    ],
  },
  "apprentice-electrician": {
    slug: "aprendiz-electricista",
    title: "Aprendiz Electricista",
    keywords: ["currículum de aprendiz electricista", "CV de aprendiz electricista", "ejemplo currículum aprendiz electricista", "plantilla CV aprendiz electricista"],
    searchIntents: ["cómo escribir currículum de aprendiz electricista", "ejemplos currículum aprendiz electricista", "mejor formato CV aprendiz electricista"],
    topSkills: ["Diagnóstico eléctrico", "Instalación de cableado", "Análisis de circuitos", "Cumplimiento de seguridad", "Lectura de planos", "Mantenimiento de equipos", "Resolución de problemas", "Comunicación", "Trabajo en equipo", "Gestión del tiempo"],
    atsKeywords: ["aprendiz", "electricista", "sistemas eléctricos", "instalación", "mantenimiento", "regulaciones de seguridad", "experiencia práctica", "habilidades técnicas", "servicio al cliente", "resolución de problemas", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Aprendiz Electricista",
      summary: "Apprentice Electrician dedicado con más de 3 años de experiencia práctica en instalaciones y mantenimiento eléctricos. Completó con éxito más de 50 proyectos, mejorando la eficiencia del sistema en un 30%.",
      skills: ["Diagnóstico eléctrico", "Instalación de cableado", "Análisis de circuitos", "Cumplimiento de seguridad", "Lectura de planos", "Mantenimiento de equipos", "Resolución de problemas", "Comunicación", "Trabajo en equipo", "Gestión del tiempo"],
      experience: [
        {
          title: "Aprendiz Electricista",
          company: "ABC Electrical Services",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en la instalación de sistemas eléctricos en más de 20 edificios residenciales, mejorando el cumplimiento de seguridad en un 25%.",
            "Realicé diagnósticos en sistemas eléctricos, reduciendo el tiempo inactivo en 15 horas por proyecto.",
            "Participé en sesiones de capacitación en seguridad, contribuyendo a un registro de seguridad del 100% durante el último año.",
          ],
        },
        {
          title: "Aprendiz Eléctrico",
          company: "XYZ Electric Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé la capacitación práctica en instalación de cableado y circuitos, logrando la finalización exitosa de 15 instalaciones.",
            "Adquirí experiencia práctica en lectura de planos y comprensión de códigos eléctricos.",
            "Colaboré con electricistas senior para mejorar las técnicas de diagnóstico, aumentando la velocidad de resolución de problemas en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "Technical College of Electrical Engineering", degree: "Diploma", field: "Tecnología Eléctrica", startDate: "2017-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "OSHA 10-Hour Safety Training", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Apprentice Electrician en su currículum?", answer: "Un aprendiz electricista debe incluir sus habilidades técnicas, experiencia práctica, y cualquier certificación relevante." },
      { question: "¿Cómo destacar mi currículum de Apprentice Electrician?", answer: "Enfatiza tus logros en proyectos previos y tus habilidades prácticas, así como tu compromiso con la seguridad." },
      { question: "¿Qué habilidades necesita un Apprentice Electrician?", answer: "Se requieren habilidades en diagnóstico eléctrico, instalación de sistemas, cumplimiento de seguridad, y trabajo en equipo." },
    ],
  },
  "assembly-line-worker": {
    slug: "trabajador-de-linea-de-ensamblaje",
    title: "Trabajador de Línea de Ensamblaje",
    keywords: ["currículum de trabajador de línea de ensamblaje", "CV de trabajador de línea de ensamblaje", "ejemplo currículum trabajador de línea de ensamblaje", "plantilla CV trabajador de línea de ensamblaje"],
    searchIntents: ["cómo escribir currículum de trabajador de línea de ensamblaje", "ejemplos currículum trabajador de línea de ensamblaje", "mejor formato CV trabajador de línea de ensamblaje"],
    topSkills: ["Control de Calidad", "Operación de Maquinaria", "Gestión de Inventarios", "Procedimientos de Seguridad", "Técnicas de Ensamblaje", "Gestión del Tiempo", "Colaboración en Equipo", "Resolución de Problemas", "Aptitud Mecánica", "Atención al Detalle"],
    atsKeywords: ["línea de ensamblaje", "manufactura", "producción", "aseguramiento de calidad", "normas de seguridad", "configuración de máquinas", "mejora de procesos", "manufactura esbelta", "trabajo en equipo", "solución de problemas", "eficiencia"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador de Línea de Ensamblaje",
      summary: "Trabajador de Línea de Ensamblaje dedicado con más de 5 años de experiencia en entornos de producción de alto volumen, logrando consistentemente un aumento del 15% en la productividad mientras se mantienen los estándares de calidad.",
      skills: ["Control de Calidad", "Operación de Maquinaria", "Gestión de Inventarios", "Procedimientos de Seguridad", "Técnicas de Ensamblaje", "Gestión del Tiempo", "Colaboración en Equipo", "Resolución de Problemas", "Aptitud Mecánica", "Atención al Detalle"],
      experience: [
        {
          title: "Trabajador de Línea de Ensamblaje Senior",
          company: "General Motors",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de producción en un 20% mediante la optimización de procesos.",
            "Capacité a 15 nuevos empleados, mejorando el tiempo de incorporación en un 30%.",
            "Reduje los defectos del producto en un 10% al implementar medidas de control de calidad.",
          ],
        },
        {
          title: "Trabajador de Línea de Ensamblaje",
          company: "Ford Motor Company",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una tasa de entrega a tiempo del 95% para las piezas ensambladas.",
            "Colaboré con el equipo para optimizar los procesos de ensamblaje, reduciendo el tiempo de ensamblaje en un 15%.",
            "Mantuve un ambiente de trabajo limpio y seguro, resultando en cero incidentes de seguridad.",
          ],
        },
      ],
      education: [
        { institution: "Technical College", degree: "A.A.S.", field: "Tecnología de Manufactura", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Certified Production Technician", issuer: "Manufacturing Skills Standards Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Assembly Line Worker en su currículum?", answer: "Un Assembly Line Worker debe incluir experiencia relevante, habilidades específicas, y logros en eficiencia y calidad." },
      { question: "¿Cómo destacar mi currículum de Assembly Line Worker?", answer: "Utiliza palabras clave relevantes, cuantifica tus logros y resalta tu experiencia en entornos de producción." },
      { question: "¿Qué habilidades necesita un Assembly Line Worker?", answer: "Las habilidades clave incluyen control de calidad, operación de maquinaria, y fuerte capacidad para trabajar en equipo." },
    ],
  },
  "assistant-electrician": {
    slug: "asistente-electricista",
    title: "Asistente Electricista",
    keywords: ["currículum de asistente electricista", "CV de asistente electricista", "ejemplo currículum asistente electricista", "plantilla CV asistente electricista"],
    searchIntents: ["cómo escribir currículum de asistente electricista", "ejemplos currículum asistente electricista", "mejor formato CV asistente electricista"],
    topSkills: ["Sistemas Eléctricos", "Instalación de Cableado", "Solución de Problemas de Circuitos", "Lectura de Planos", "Cumplimiento de Normas de Seguridad", "Resolución de Problemas", "Colaboración en Equipo", "Gestión del Tiempo", "Servicio al Cliente", "Comunicación Técnica"],
    atsKeywords: ["electricista", "asistente electricista", "técnico eléctrico", "cableado", "mantenimiento", "instalación", "normas de seguridad", "habilidades técnicas", "solución de problemas", "sistemas eléctricos", "soporte al cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Electricista",
      summary: "Asistente Electricista orientado a los detalles con más de 5 años de experiencia en sistemas eléctricos residenciales y comerciales. Historial comprobado de reducción del tiempo de instalación en un 20% a través de un trabajo en equipo y comunicación efectivos.",
      skills: ["Sistemas Eléctricos", "Instalación de Cableado", "Solución de Problemas de Circuitos", "Lectura de Planos", "Cumplimiento de Normas de Seguridad", "Resolución de Problemas", "Colaboración en Equipo", "Gestión del Tiempo", "Servicio al Cliente", "Comunicación Técnica"],
      experience: [
        {
          title: "Asistente Electricista Líder",
          company: "Bright Future Electric",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción del tiempo de instalación en un 25% al optimizar el flujo de trabajo del equipo.",
            "Asistí en la finalización exitosa de más de 50 proyectos residenciales con un 95% de satisfacción del cliente.",
            "Capacité a 5 nuevos empleados sobre protocolos de seguridad y códigos eléctricos.",
          ],
        },
        {
          title: "Aprendiz Eléctrico",
          company: "Citywide Electrical Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a una disminución del 15% en retrasos de proyectos a través de una programación efectiva.",
            "Realicé inspecciones y mantenimiento rutinarios en sistemas eléctricos, asegurando el cumplimiento de las regulaciones de seguridad.",
            "Participé en la solución de problemas eléctricos, lo que llevó a un aumento del 30% en la eficiencia operativa.",
          ],
        },
      ],
      education: [
        { institution: "Technical Institute of Technology", degree: "A.A.S.", field: "Tecnología Eléctrica", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "National Electrical Code Certification", issuer: "National Electrical Contractors Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente Electricista en su currículum?", answer: "Incluir habilidades técnicas, experiencia laboral relevante, y certificaciones específicas." },
      { question: "¿Cómo destacar mi currículum de Asistente Electricista?", answer: "Enfatizar logros cuantificables y habilidades en colaboración y seguridad." },
      { question: "¿Qué habilidades necesita un Asistente Electricista?", answer: "Conocimientos en sistemas eléctricos, instalación, y cumplimiento de normas de seguridad." },
    ],
  },
  "boilermaker": {
    slug: "curriculum-boilermaker",
    title: "Boilermaker",
    keywords: ["currículum de Boilermaker", "CV de Boilermaker", "ejemplo currículum Boilermaker", "plantilla CV Boilermaker"],
    searchIntents: ["cómo escribir currículum de Boilermaker", "ejemplos currículum Boilermaker", "mejor formato CV Boilermaker"],
    topSkills: ["Soldadura", "Lectura de planos", "Fabricación de metal", "Instalación de tuberías", "Control de calidad", "Cumplimiento de seguridad", "Habilidades mecánicas", "Colaboración en equipo", "Resolución de problemas", "Gestión del tiempo"],
    atsKeywords: ["Boilermaker", "Certificación de soldadura", "Capacitación en seguridad OSHA", "Interpretación de planos", "Trabajo en metal", "Acero estructural", "Sistemas de tuberías", "Técnicas de fabricación", "Procedimientos de mantenimiento", "Habilidades de ensamblaje", "Aptitud mecánica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Boilermaker",
      summary: "Boilermaker experimentado con más de 5 años en el campo, especializado en fabricación de metal y soldadura, logrando una reducción del 20% en el tiempo de finalización de proyectos a través de una gestión eficiente del flujo de trabajo.",
      skills: ["Soldadura", "Lectura de planos", "Fabricación de metal", "Instalación de tuberías", "Control de calidad", "Cumplimiento de seguridad", "Habilidades mecánicas", "Colaboración en equipo", "Resolución de problemas", "Gestión del tiempo"],
      experience: [
        {
          title: "Boilermaker Senior",
          company: "Industrial Fabricators Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que redujo los retrasos en los proyectos en un 15% mediante una mejor programación.",
            "Aumenté la eficiencia de producción en un 25% al implementar nuevas técnicas de soldadura.",
            "Logré una tasa de cumplimiento de seguridad del 98% durante el último año.",
          ],
        },
        {
          title: "Boilermaker",
          company: "Steel Works LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé más de 30 proyectos importantes a tiempo y dentro del presupuesto.",
            "Capacité con éxito a 10 boilermakers junior en protocolos de seguridad y técnicas de soldadura.",
            "Contribuí a un aumento del 10% en las puntuaciones de satisfacción del cliente a través de un trabajo de calidad.",
          ],
        },
      ],
      education: [
        { institution: "Technical College of Welding", degree: "Grado Asociado", field: "Tecnología de Soldadura", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Certified Welder", issuer: "American Welding Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Boilermaker en su currículum?", answer: "Un Boilermaker debe incluir su experiencia en soldadura, certificaciones, habilidades técnicas y logros en proyectos." },
      { question: "¿Cómo destacar mi currículum de Boilermaker?", answer: "Utiliza palabras clave relevantes, muestra tus logros cuantificables y destaca tus certificaciones." },
      { question: "¿Qué habilidades necesita un Boilermaker?", answer: "Las habilidades clave incluyen soldadura, lectura de planos, control de calidad y habilidades mecánicas." },
    ],
  },
  "cab-driver": {
    slug: "conductor-de-taxi",
    title: "Conductor de Taxi",
    keywords: ["currículum de conductor de taxi", "CV de conductor de taxi", "ejemplo currículum conductor de taxi", "plantilla CV conductor de taxi"],
    searchIntents: ["cómo escribir currículum de conductor de taxi", "ejemplos currículum conductor de taxi", "mejor formato CV conductor de taxi"],
    topSkills: ["navegación", "servicio al cliente", "mantenimiento de vehículos", "gestión del tiempo", "comunicación", "solución de problemas", "seguridad vial", "conocimiento local", "resolución de conflictos", "manejo de efectivo"],
    atsKeywords: ["conductor de taxi", "chofer", "transporte", "relaciones con clientes", "planificación de rutas", "leyes de tránsito", "conducción defensiva", "inspección de vehículos", "reglamentos de seguridad", "asistencia a pasajeros", "comunicación con despachos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Conductor de Taxi",
      summary: "Conductor de taxi dedicado con más de 5 años de experiencia en proporcionar transporte seguro y eficiente. Mantuve con éxito una calificación de satisfacción del pasajero del 95% a través de un servicio excepcional y llegadas puntuales.",
      skills: ["navegación", "servicio al cliente", "mantenimiento de vehículos", "gestión del tiempo", "comunicación", "solución de problemas", "seguridad vial", "conocimiento local", "resolución de conflictos", "manejo de efectivo"],
      experience: [
        {
          title: "Conductor de Taxi Senior",
          company: "Yellow Cab Co.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré un 98% de tasa de llegada a tiempo, superando los estándares de la empresa en un 15%.",
            "Mantuve un puntaje de satisfacción del pasajero del 95% basado en encuestas de retroalimentación.",
            "Capacité a 5 nuevos conductores en prácticas de conducción segura y servicio al cliente.",
          ],
        },
        {
          title: "Conductor de Taxi",
          company: "City Cabs Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé más de 10,000 viajes exitosos con una calificación promedio de 4.8 estrellas.",
            "Implementé una nueva estrategia de optimización de rutas que redujo los costos de combustible en un 20%.",
            "Proporcioné asistencia a pasajeros con necesidades especiales, mejorando la calidad del servicio en general.",
          ],
        },
      ],
      education: [
        { institution: "Community College", degree: "Asociado en Artes", field: "Gestión del Transporte", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Defensive Driving Certification", issuer: "National Safety Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Conductor de Taxi en su currículum?", answer: "Un Conductor de Taxi debe incluir experiencia laboral relevante, habilidades específicas del sector, y certificaciones relacionadas." },
      { question: "¿Cómo destacar mi currículum de Conductor de Taxi?", answer: "Utiliza logros cuantificables y resalta tus habilidades en servicio al cliente y seguridad vial." },
      { question: "¿Qué habilidades necesita un Conductor de Taxi?", answer: "Las habilidades clave incluyen navegación, servicio al cliente, y conocimiento de las leyes de tránsito." },
    ],
  },
  "carpenter-assistant": {
    slug: "asistente-de-carpintero",
    title: "Asistente de Carpintero",
    keywords: ["currículum de asistente de carpintero", "CV de asistente de carpintero", "ejemplo currículum asistente de carpintero", "plantilla CV asistente de carpintero"],
    searchIntents: ["cómo escribir currículum de asistente de carpintero", "ejemplos currículum asistente de carpintero", "mejor formato CV asistente de carpintero"],
    topSkills: ["Lectura de planos", "Dominio de herramientas manuales", "Operación de herramientas eléctricas", "Estructuración", "Carpintería de acabado", "Regulaciones de seguridad", "Manejo de materiales", "Resolución de problemas", "Gestión del tiempo", "Colaboración en equipo"],
    atsKeywords: ["Carpintería", "Construcción", "Mantenimiento de herramientas", "Asistencia en proyectos", "Preparación del sitio", "Códigos de construcción", "Mediciones", "Trabajo en madera", "Servicio al cliente", "Control de calidad", "Prácticas de seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Carpintero",
      summary: "Asistente de Carpintero dedicado con más de 5 años de experiencia en carpintería residencial y comercial. Historial comprobado de mejorar la eficiencia del proyecto en un 20% a través del trabajo en equipo efectivo y una meticulosa atención al detalle.",
      skills: ["Lectura de planos", "Dominio de herramientas manuales", "Operación de herramientas eléctricas", "Estructuración", "Carpintería de acabado", "Regulaciones de seguridad", "Manejo de materiales", "Resolución de problemas", "Gestión del tiempo", "Colaboración en equipo"],
      experience: [
        {
          title: "Asistente Principal de Carpintero",
          company: "Smith & Sons Construction",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Ayudé en la finalización de más de 30 proyectos residenciales, contribuyendo a un aumento del 15% en las calificaciones de satisfacción del cliente.",
            "Capacité a 5 nuevos aprendices en técnicas de carpintería seguras y efectivas, reduciendo los accidentes laborales en un 25%.",
            "Mejoré el tiempo de entrega del proyecto en un 10% facilitando una mejor comunicación entre oficios.",
          ],
        },
        {
          title: "Aprendiz de Carpintero",
          company: "Johnson Builders",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Participé en la construcción de edificios comerciales, lo que resultó en un aumento del 30% en la eficiencia de finalización de proyectos.",
            "Desarrollé habilidades en estructuración y carpintería de acabado, completando tareas con una tasa de precisión del 98%.",
            "Asistí en la gestión de inventario, llevando a una reducción del 15% en el desperdicio de materiales.",
          ],
        },
      ],
      education: [
        { institution: "Technical College of Construction", degree: "Diploma", field: "Carpintería", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "OSHA 10-Hour Safety Certification", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Carpintero en su currículum?", answer: "Un Asistente de Carpintero debe incluir su experiencia en carpintería, habilidades técnicas, formación educativa y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Asistente de Carpintero?", answer: "Para destacar su currículum, enfoque en logros cuantificables, habilidades específicas y experiencia práctica en el campo." },
      { question: "¿Qué habilidades necesita un Asistente de Carpintero?", answer: "Las habilidades clave incluyen lectura de planos, manejo de herramientas, trabajo en equipo y conocimiento de regulaciones de seguridad." },
    ],
  },
  "cnc-machinist": {
    slug: "maquinista-cnc",
    title: "Maquinista CNC",
    keywords: ["currículum de maquinista CNC", "CV de maquinista CNC", "ejemplo currículum maquinista CNC", "plantilla CV maquinista CNC"],
    searchIntents: ["cómo escribir currículum de maquinista CNC", "ejemplos currículum maquinista CNC", "mejor formato CV maquinista CNC"],
    topSkills: ["Mecanizado de precisión", "Lectura de planos", "Programación CNC", "Configuración de herramientas", "Control de calidad", "Programación en G-code", "Mantenimiento de maquinaria", "Resolución de problemas", "Metrología", "Procesos de fabricación"],
    atsKeywords: ["CNC", "maquinista", "G-code", "plano", "precisión", "maquinaria", "programación", "configuración", "aseguramiento de calidad", "fabricación", "solución de problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Maquinista CNC",
      summary: "Maquinista CNC dedicado con más de 5 años de experiencia en mecanizado de precisión. Logró un aumento del 20% en la eficiencia de producción mediante una programación optimizada.",
      skills: ["Mecanizado de precisión", "Lectura de planos", "Programación CNC", "Configuración de herramientas", "Control de calidad", "Programación en G-code", "Mantenimiento de maquinaria", "Resolución de problemas", "Metrología", "Procesos de fabricación"],
      experience: [
        {
          title: "Maquinista CNC Senior",
          company: "Precision Parts Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la tasa de producción en un 15% al implementar nuevos procesos de configuración de maquinaria.",
            "Redució los errores de mecanizado en un 30% mediante rigurosas medidas de control de calidad.",
            "Capacitado y mentoreado a 5 maquinistas junior, mejorando el nivel de habilidades del equipo.",
          ],
        },
        {
          title: "Maquinista CNC",
          company: "Machinist Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logró una tasa de precisión del 98% en tareas de mecanizado CNC.",
            "Completó exitosamente más de 200 proyectos a tiempo y dentro del presupuesto.",
            "Contribuyó a una reducción del 10% en el desperdicio de material a través de una configuración efectiva.",
          ],
        },
      ],
      education: [
        { institution: "Technical Institute of Technology", degree: "B.S.", field: "Tecnología de Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "CNC Machining Certification", issuer: "National Institute for Metalworking Skills (NIMS)", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un CNC Machinist en su currículum?", answer: "El currículum de un maquinista CNC debe incluir experiencia en programación CNC, habilidades en mecanizado, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de CNC Machinist?", answer: "Destaca logros cuantificables y habilidades técnicas específicas relacionadas con el mecanizado y la programación CNC." },
      { question: "¿Qué habilidades necesita un CNC Machinist?", answer: "Un maquinista CNC necesita habilidades en mecanizado de precisión, programación CNC, control de calidad y resolución de problemas." },
    ],
  },
  "construction-administrative-assistant": {
    slug: "asistente-administrativo-construccion",
    title: "Asistente Administrativo de Construcción",
    keywords: ["currículum de Asistente Administrativo de Construcción", "CV de Asistente Administrativo de Construcción", "ejemplo currículum Asistente Administrativo de Construcción", "plantilla CV Asistente Administrativo de Construcción"],
    searchIntents: ["cómo escribir currículum de Asistente Administrativo de Construcción", "ejemplos currículum Asistente Administrativo de Construcción", "mejor formato CV Asistente Administrativo de Construcción"],
    topSkills: ["Coordinación de Proyectos", "Gestión de Documentos", "Programación", "Comunicación", "Seguimiento de Presupuestos", "Adquisiciones", "Gestión del Tiempo", "Servicio al Cliente", "Entrada de Datos", "Resolución de Problemas"],
    atsKeywords: ["Construcción", "Soporte Administrativo", "Gestión de Oficina", "Mantenimiento de Registros", "Administración de Contratos", "Cumplimiento", "Software de Programación", "Microsoft Office", "Habilidades de Comunicación", "Colaboración en Equipo", "Gestión de Proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Administrativo de Construcción",
      summary: "Asistente Administrativo de Construcción orientado a los detalles con más de 5 años de experiencia en la industria de la construcción. Mejoró con éxito la eficiencia de la coordinación de proyectos en un 30% a través de una programación y comunicación efectivas.",
      skills: ["Coordinación de Proyectos", "Gestión de Documentos", "Programación", "Comunicación", "Seguimiento de Presupuestos", "Adquisiciones", "Gestión del Tiempo", "Servicio al Cliente", "Entrada de Datos", "Resolución de Problemas"],
      experience: [
        {
          title: "Asistente Administrativo Senior",
          company: "Turner Construction",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia de la coordinación de proyectos en un 30% mediante prácticas de programación mejoradas.",
            "Gestionó la documentación de proyectos por un valor superior a $5 millones, asegurando cumplimiento y precisión.",
            "Agilizó los procesos de adquisiciones, reduciendo costos en un 15%.",
          ],
        },
        {
          title: "Asistente Administrativo",
          company: "Skanska USA",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyó a los gerentes de proyecto en las operaciones diarias, contribuyendo a la finalización exitosa de proyectos.",
            "Implementó un nuevo sistema de archivo que mejoró el tiempo de recuperación de documentos en un 25%.",
            "Asistió en la gestión de presupuestos y horarios para múltiples proyectos simultáneamente.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Construction Manager", issuer: "Construction Management Association of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente Administrativo de Construcción en su currículum?", answer: "Debe incluir sus experiencias relevantes, habilidades específicas en construcción y ejemplos de logros en proyectos." },
      { question: "¿Cómo destacar mi currículum de Asistente Administrativo de Construcción?", answer: "Enfatice sus logros en la coordinación de proyectos y habilidades en gestión de documentos." },
      { question: "¿Qué habilidades necesita un Asistente Administrativo de Construcción?", answer: "Necesita habilidades en coordinación de proyectos, gestión de documentos y excelente comunicación." },
    ],
  },
  "construction-administrator": {
    slug: "administrador-de-construccion",
    title: "Administrador de Construcción",
    keywords: ["currículum de administrador de construcción", "CV de administrador de construcción", "ejemplo currículum administrador de construcción", "plantilla CV administrador de construcción"],
    searchIntents: ["cómo escribir currículum de administrador de construcción", "ejemplos currículum administrador de construcción", "mejor formato CV administrador de construcción"],
    topSkills: ["Gestión de Proyectos", "Presupuestación", "Gestión de Contratos", "Programación", "Cumplimiento", "Adquisiciones", "Gestión de Sitios", "Comunicación", "Resolución de Problemas", "Liderazgo de Equipos"],
    atsKeywords: ["Administración de Construcción", "Documentación de Construcción", "Órdenes de Cambio", "RFIs", "Submittals", "Reglamentos de Seguridad", "Inspecciones de Sitio", "Coordinación de Proyectos", "Control de Costos", "Compromiso de Interesados", "Aseguramiento de Calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Administrador de Construcción",
      summary: "Administrador de Construcción con más de 5 años de experiencia en la gestión de proyectos de construcción, asegurando el cumplimiento y optimizando presupuestos. Reduje con éxito los costos del proyecto en un 15% mientras mejoraba los plazos a través de una coordinación efectiva de proyectos.",
      skills: ["Gestión de Proyectos", "Presupuestación", "Gestión de Contratos", "Programación", "Cumplimiento", "Adquisiciones", "Gestión de Sitios", "Comunicación", "Resolución de Problemas", "Liderazgo de Equipos"],
      experience: [
        {
          title: "Administrador de Construcción Senior",
          company: "Turner Construction",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los tiempos de entrega de proyectos en un 20%, lo que llevó a una mayor satisfacción del cliente.",
            "Gestioné un presupuesto de $5M asegurando un 100% de cumplimiento con los reglamentos de seguridad.",
            "Implementé un nuevo proceso de documentación que mejoró la eficiencia del seguimiento de proyectos en un 30%.",
          ],
        },
        {
          title: "Administrador de Construcción",
          company: "Skanska USA",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordiné entre contratistas y clientes, logrando una tasa de finalización de proyectos del 95% a tiempo.",
            "Optimicé los procesos de adquisiciones, ahorrando a la empresa $200K anuales.",
            "Dirigí inspecciones de seguridad que redujeron los accidentes en el sitio en un 50%.",
          ],
        },
      ],
      education: [
        { institution: "University of Florida", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Construction Manager (CCM)", issuer: "Construction Management Association of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Construction Administrator en su currículum?", answer: "Un Construction Administrator debe incluir experiencia en gestión de proyectos, cumplimiento de reglamentos, y habilidades en comunicación y liderazgo." },
      { question: "¿Cómo destacar mi currículum de Construction Administrator?", answer: "Para destacar su currículum, enfatice logros cuantificables y habilidades específicas que sean relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Construction Administrator?", answer: "Las habilidades clave incluyen gestión de proyectos, presupuestación, y gestión de contratos, entre otras." },
    ],
  },
  "construction-assistant": {
    slug: "asistente-de-construccion",
    title: "Asistente de Construcción",
    keywords: ["currículum de Asistente de Construcción", "CV de Asistente de Construcción", "ejemplo currículum Asistente de Construcción", "plantilla CV Asistente de Construcción"],
    searchIntents: ["cómo escribir currículum de Asistente de Construcción", "ejemplos currículum Asistente de Construcción", "mejor formato CV Asistente de Construcción"],
    topSkills: ["Lectura de Planos", "Vertido de Concreto", "Gestión de Seguridad en el Sitio", "Operación de Herramientas", "Manejo de Materiales", "Colaboración en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Resistencia Física", "Comunicación"],
    atsKeywords: ["Construcción", "Asistencia", "Gestión de Sitios", "Procedimientos de Seguridad", "Trabajo en Equipo", "Coordinación de Proyectos", "Preparación de Materiales", "Operación de Equipos", "Regulaciones de Construcción", "Limpieza del Sitio", "Control de Calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Construcción",
      summary: "Asistente de Construcción dedicado con más de 5 años de experiencia en la industria de la construcción, conocido por mejorar la eficiencia en un 20% a través de una colaboración efectiva en equipo y gestión de sitios.",
      skills: ["Lectura de Planos", "Vertido de Concreto", "Gestión de Seguridad en el Sitio", "Operación de Herramientas", "Manejo de Materiales", "Colaboración en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Resistencia Física", "Comunicación"],
      experience: [
        {
          title: "Asistente de Construcción Senior",
          company: "BuildRight Construction",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia del proyecto en un 25% al implementar nuevos procesos de manejo de materiales.",
            "Asistí en la finalización de más de 15 proyectos importantes a tiempo y dentro del presupuesto.",
            "Realicé sesiones de capacitación en seguridad que resultaron en una reducción del 40% en accidentes en el lugar.",
          ],
        },
        {
          title: "Asistente de Construcción",
          company: "Greenfield Builders",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé al equipo en la entrega exitosa de 10 proyectos residenciales.",
            "Gestioné el inventario de materiales de construcción, reduciendo el desperdicio en un 15%.",
            "Colaboré con subcontratistas para mejorar la eficiencia del flujo de trabajo.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "OSHA 30-Hour Construction Safety", issuer: "OSHA", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Construcción en su currículum?", answer: "Un Asistente de Construcción debe incluir su experiencia laboral, habilidades técnicas, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Asistente de Construcción?", answer: "Enfatiza tus logros en proyectos anteriores y menciona tus habilidades específicas en la construcción." },
      { question: "¿Qué habilidades necesita un Asistente de Construcción?", answer: "Las habilidades clave incluyen manejo de herramientas, gestión de seguridad, y capacidad para trabajar en equipo." },
    ],
  },
  "construction-superintendent": {
    slug: "superintendente-de-construccion",
    title: "Superintendente de Construcción",
    keywords: ["currículum de superintendente de construcción", "CV de superintendente de construcción", "ejemplo currículum superintendente de construcción", "plantilla CV superintendente de construcción"],
    searchIntents: ["cómo escribir currículum de superintendente de construcción", "ejemplos currículum superintendente de construcción", "mejor formato CV superintendente de construcción"],
    topSkills: ["Gestión de Proyectos", "Programación", "Gestión de Presupuestos", "Cumplimiento de Normas de Seguridad", "Liderazgo de Equipos", "Negociación de Contratos", "Resolución de Problemas", "Control de Calidad", "Comunicación", "Conocimientos Técnicos"],
    atsKeywords: ["Gestión de Construcción", "Supervisión de Obras", "Gestión de Riesgos", "Planificación de Construcción", "Estimación de Costos", "Gestión de Mano de Obra", "Códigos de Construcción", "Lectura de Planos", "Software de Programación", "Administración de Contratos", "Entrega de Proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Superintendente de Construcción",
      summary: "Superintendente de Construcción con más de 10 años de experiencia en el campo, especializado en la gestión de proyectos multimillonarios, logrando una reducción del 30% en costos mediante la asignación eficiente de recursos.",
      skills: ["Gestión de Proyectos", "Programación", "Gestión de Presupuestos", "Cumplimiento de Normas de Seguridad", "Liderazgo de Equipos", "Negociación de Contratos", "Resolución de Problemas", "Control de Calidad", "Comunicación", "Conocimientos Técnicos"],
      experience: [
        {
          title: "Superintendente de Construcción Sénior",
          company: "ABC Construction Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los retrasos en los proyectos en un 25% mediante técnicas de programación mejoradas.",
            "Gestioné un proyecto residencial de $5 millones, finalizando un 15% por debajo del presupuesto.",
            "Implementé protocolos de seguridad que resultaron en cero accidentes durante 12 meses.",
          ],
        },
        {
          title: "Superintendente de Construcción",
          company: "XYZ Builders LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Dirigí un equipo de 15 en la exitosa finalización de un proyecto comercial de $10 millones.",
            "Aumenté la eficiencia del equipo en un 20% a través de programas de capacitación específicos.",
            "Aseguré el cumplimiento de todos los códigos locales de construcción, logrando cero violaciones.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "OSHA Safety Certification", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un superintendente de construcción en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas y logros en proyectos anteriores." },
      { question: "¿Cómo destacar mi currículum de superintendente de construcción?", answer: "Utiliza palabras clave del sector, destaca tus logros y adapta tu currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un superintendente de construcción?", answer: "Necesita habilidades en gestión de proyectos, liderazgo, cumplimiento de normativas y comunicación efectiva." },
    ],
  },
  "construction-worker": {
    slug: "trabajador-de-construccion",
    title: "Trabajador de Construcción",
    keywords: ["currículum de trabajador de construcción", "CV de trabajador de construcción", "ejemplo currículum trabajador de construcción", "plantilla CV trabajador de construcción"],
    searchIntents: ["cómo escribir currículum de trabajador de construcción", "ejemplos currículum trabajador de construcción", "mejor formato CV trabajador de construcción"],
    topSkills: ["Lectura de Planos", "Operación de Equipos Pesados", "Acabado de Concreto", "Estructuración", "Cumplimiento de Normas de Seguridad", "Techos", "Sistemas Eléctricos", "Fontanería", "Topografía", "Jardinería"],
    atsKeywords: ["Construcción", "Gestión de Proyectos", "Códigos de Construcción", "Colaboración en Equipo", "Aseguramiento de Calidad", "Seguridad en el Lugar de Trabajo", "Manejo de Materiales", "Resolución de Problemas", "Gestión del Tiempo", "Comunicación", "Resistencia Física"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador de Construcción",
      summary: "Trabajador de Construcción dedicado con más de 5 años de experiencia en proyectos residenciales y comerciales, conocido por mejorar el tiempo de finalización de proyectos en un 20% a través de una colaboración efectiva en equipo y prácticas de seguridad.",
      skills: ["Lectura de Planos", "Operación de Equipos Pesados", "Acabado de Concreto", "Estructuración", "Cumplimiento de Normas de Seguridad", "Techos", "Sistemas Eléctricos", "Fontanería", "Topografía", "Jardinería"],
      experience: [
        {
          title: "Trabajador de Construcción Principal",
          company: "ABC Construction Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los retrasos en los proyectos en un 30% mediante una gestión de flujo de trabajo eficiente",
            "Finalicé con éxito 15 construcciones residenciales con una calificación de satisfacción del cliente del 95%",
            "Implementé un nuevo entrenamiento en seguridad que disminuyó los accidentes en el lugar de trabajo en un 40%",
          ],
        },
        {
          title: "Obrero de Construcción",
          company: "XYZ Builders LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a la finalización exitosa de más de 50 proyectos comerciales",
            "Asistí en la instalación de sistemas eléctricos que mejoraron la eficiencia energética en un 15%",
            "Mantuve altos estándares de calidad y seguridad en todas las fases de la construcción",
          ],
        },
      ],
      education: [
        { institution: "Technical College of Construction", degree: "Certificado", field: "Gestión de Construcción", startDate: "2013-08", endDate: "2014-05" },
      ],
      certifications: [
        { name: "OSHA 30-Hour Safety Certification", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Trabajador de Construcción en su currículum?", answer: "Un Trabajador de Construcción debe incluir su experiencia en proyectos, habilidades técnicas y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Trabajador de Construcción?", answer: "Destaca tus logros y experiencias, usa palabras clave del sector y asegúrate de mencionar tus habilidades técnicas." },
      { question: "¿Qué habilidades necesita un Trabajador de Construcción?", answer: "Las habilidades clave incluyen lectura de planos, operación de maquinaria pesada, y cumplimiento de normas de seguridad." },
    ],
  },
  "courier": {
    slug: "curriculum-courier",
    title: "Mensajero",
    keywords: ["currículum de mensajero", "CV de mensajero", "ejemplo currículum mensajero", "plantilla CV mensajero"],
    searchIntents: ["cómo escribir currículum de mensajero", "ejemplos currículum mensajero", "mejor formato CV mensajero"],
    topSkills: ["Gestión del Tiempo", "Optimización de Rutas", "Atención al Cliente", "Atención al Detalle", "Comunicación", "Resolución de Problemas", "Cumplimiento de Seguridad", "Habilidades de Navegación", "Resistencia Física", "Mantenimiento de Registros"],
    atsKeywords: ["logística de entrega", "manejo de paquetes", "despacho", "navegación urbana", "gestión de flotas", "entregas sensibles al tiempo", "satisfacción del cliente", "optimización de carga", "protocolos de seguridad", "gestión de inventario", "planificación de rutas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Mensajero",
      summary: "Mensajero dedicado con más de 5 años de experiencia en la entrega eficiente y puntual de paquetes. Gestioné con éxito más de 1,000 entregas por mes, lo que resultó en una tasa de satisfacción del cliente del 98%.",
      skills: ["Gestión del Tiempo", "Optimización de Rutas", "Atención al Cliente", "Atención al Detalle", "Comunicación", "Resolución de Problemas", "Cumplimiento de Seguridad", "Habilidades de Navegación", "Resistencia Física", "Mantenimiento de Registros"],
      experience: [
        {
          title: "Mensajero Senior",
          company: "FedEx",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de entrega en un 20% mediante técnicas de optimización de rutas.",
            "Logré una tasa de entrega puntual del 99% en el último año.",
            "Reconocido por la dirección por servicio al cliente excepcional y fiabilidad.",
          ],
        },
        {
          title: "Mensajero",
          company: "UPS",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Manejé un promedio de 200 entregas por día mientras mantenía un puntaje de satisfacción del cliente del 95%.",
            "Implementé sistemas de seguimiento mejorados que redujeron los paquetes perdidos en un 30%.",
            "Recibí el premio 'Empleado del Mes' dos veces por un rendimiento excepcional.",
          ],
        },
      ],
      education: [
        { institution: "City College", degree: "B.S.", field: "Gestión Logística", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Logistics Associate", issuer: "National Institute for Logistics", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Courier en su currículum?", answer: "Un Courier debe incluir su experiencia en entregas, habilidades de gestión del tiempo, atención al cliente y cumplimiento de normas de seguridad." },
      { question: "¿Cómo destacar mi currículum de Courier?", answer: "Destaca tus logros en entregas, tu tasa de satisfacción del cliente y cualquier reconocimiento recibido por tu desempeño." },
      { question: "¿Qué habilidades necesita un Courier?", answer: "Un Courier necesita habilidades de navegación, gestión del tiempo, atención al detalle y buena comunicación." },
    ],
  },
  "custodian": {
    slug: "curriculum-custodio",
    title: "Custodio",
    keywords: ["currículum de custodio", "CV de custodio", "ejemplo currículum custodio", "plantilla CV custodio"],
    searchIntents: ["cómo escribir currículum de custodio", "ejemplos currículum custodio", "mejor formato CV custodio"],
    topSkills: ["Técnicas de limpieza", "Procedimientos de seguridad", "Mantenimiento de equipos", "Gestión del tiempo", "Atención al detalle", "Habilidades de comunicación", "Resolución de problemas", "Colaboración en equipo", "Servicio al cliente", "Gestión de inventarios"],
    atsKeywords: ["Servicios de limpieza", "Saneamiento", "Gestión de instalaciones", "Suministros de limpieza", "Cuidado de pisos", "Gestión de residuos", "Cumplimiento de seguridad", "Limpieza rutinaria", "Limpieza de emergencia", "Mantenimiento de edificios", "Liderazgo de equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Custodio",
      summary: "Custodio dedicado con más de 5 años de experiencia en mantener la limpieza y seguridad en diversas instalaciones. Historial comprobado de reducción del tiempo de limpieza en un 20% mientras se asegura altos estándares de higiene.",
      skills: ["Técnicas de limpieza", "Procedimientos de seguridad", "Mantenimiento de equipos", "Gestión del tiempo", "Atención al detalle", "Habilidades de comunicación", "Resolución de problemas", "Colaboración en equipo", "Servicio al cliente", "Gestión de inventarios"],
      experience: [
        {
          title: "Jefe de Limpieza",
          company: "Greenwood High School",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los costos generales de limpieza en un 15% mediante una gestión eficiente de suministros.",
            "Entrené a un equipo de 5 empleados de limpieza, mejorando el tiempo de finalización de tareas en un 30%.",
            "Implementé un nuevo horario de limpieza que mejoró las calificaciones de limpieza de las instalaciones en un 25%.",
          ],
        },
        {
          title: "Custodio",
          company: "Sunset Community Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve una tasa de cumplimiento del 100% con las regulaciones de salud y seguridad.",
            "Recibí el premio de 'Empleado del Mes' dos veces por desempeño excepcional.",
            "Mejoré los puntajes de satisfacción de los visitantes en un 40% a través de una limpieza mejorada.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de instalaciones", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Custodial Technician", issuer: "International Janitorial Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Custodian en su currículum?", answer: "Debe incluir habilidades, experiencia relevante y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Custodian?", answer: "Enfatizando logros específicos y habilidades clave relacionadas con el puesto." },
      { question: "¿Qué habilidades necesita un Custodian?", answer: "Habilidades en limpieza, atención al detalle, y comunicación efectiva son esenciales." },
    ],
  },
  "data-warehouse-analyst": {
    slug: "analista-de-data-warehouse",
    title: "Analista de Data Warehouse",
    keywords: ["currículum de analista de data warehouse", "CV de analista de data warehouse", "ejemplo currículum analista de data warehouse", "plantilla CV analista de data warehouse"],
    searchIntents: ["cómo escribir currículum de analista de data warehouse", "ejemplos currículum analista de data warehouse", "mejor formato CV analista de data warehouse"],
    topSkills: ["SQL", "Procesos ETL", "Modelado de Datos", "Integración de Datos", "Aseguramiento de la Calidad de Datos", "Herramientas de Inteligencia de Negocios", "Visualización de Datos", "Tecnologías de Big Data", "Almacenamiento de Datos en la Nube", "Análisis Estadístico"],
    atsKeywords: ["análisis de datos", "almacenamiento de datos", "SQL", "ETL", "modelado de datos", "herramientas de BI", "tableau", "gobernanza de datos", "computación en la nube", "big data", "minería de datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Analista de Data Warehouse",
      summary: "Analista de Data Warehouse con más de 5 años de experiencia en integración y análisis de datos, logrando una reducción del 30% en el tiempo de informes a través de procesos ETL optimizados.",
      skills: ["SQL", "Procesos ETL", "Modelado de Datos", "Integración de Datos", "Aseguramiento de la Calidad de Datos", "Herramientas de Inteligencia de Negocios", "Visualización de Datos", "Tecnologías de Big Data", "Almacenamiento de Datos en la Nube", "Análisis Estadístico"],
      experience: [
        {
          title: "Analista Senior de Data Warehouse",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo proceso ETL que mejoró la velocidad de procesamiento de datos en un 40%.",
            "Desarrollé un marco de calidad de datos que resultó en una disminución del 25% en inconsistencias de datos.",
            "Colaboré con las unidades de negocio para definir los requisitos analíticos, mejorando los procesos de toma de decisiones.",
          ],
        },
        {
          title: "Analista de Datos",
          company: "Data Corp",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé modelos de datos que mejoraron la eficiencia de informes en un 20%.",
            "Dirigí un proyecto de equipo para integrar nuevas fuentes de datos, aumentando la accesibilidad de datos para los interesados.",
            "Automatizé procesos de informes que ahorraron 10 horas por semana en trabajo manual.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencia de Datos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Data Management Professional", issuer: "DAMA International", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Data Warehouse Analyst en su currículum?", answer: "Un Data Warehouse Analyst debe incluir su experiencia en análisis de datos, procesos ETL, y las herramientas de BI que maneja." },
      { question: "¿Cómo destacar mi currículum de Data Warehouse Analyst?", answer: "Destacar tus logros específicos y las tecnologías que dominas ayudará a diferenciar tu currículum." },
      { question: "¿Qué habilidades necesita un Data Warehouse Analyst?", answer: "Las habilidades clave incluyen SQL, modelado de datos, y experiencia en herramientas de inteligencia de negocios." },
    ],
  },
  "data-warehouse-architect": {
    slug: "arquitecto-de-data-warehouse",
    title: "Arquitecto de Data Warehouse",
    keywords: ["currículum de arquitecto de data warehouse", "CV de arquitecto de data warehouse", "ejemplo currículum arquitecto de data warehouse", "plantilla CV arquitecto de data warehouse"],
    searchIntents: ["cómo escribir currículum de arquitecto de data warehouse", "ejemplos currículum arquitecto de data warehouse", "mejor formato CV arquitecto de data warehouse"],
    topSkills: ["Modelado de Datos", "Procesos ETL", "SQL", "Almacenamiento de Datos", "Tecnologías en la Nube", "Soluciones de Big Data", "Analíticas", "Inteligencia de Negocios", "Gobernanza de Datos", "Diseño de Bases de Datos"],
    atsKeywords: ["Data Warehouse", "ETL", "Business Intelligence", "Data Architecture", "SQL Server", "Oracle", "AWS", "Azure", "Hadoop", "Data Lakes", "Data Integration"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Arquitecto de Data Warehouse",
      summary: "Arquitecto de Data Warehouse orientado a los detalles con más de 8 años de experiencia en el diseño e implementación de soluciones de datos escalables. Reduje con éxito los tiempos de recuperación de datos en un 30% a través de procesos ETL optimizados.",
      skills: ["Modelado de Datos", "Procesos ETL", "SQL", "Almacenamiento de Datos", "Tecnologías en la Nube", "Soluciones de Big Data", "Analíticas", "Inteligencia de Negocios", "Gobernanza de Datos", "Diseño de Bases de Datos"],
      experience: [
        {
          title: "Arquitecto Senior de Data Warehouse",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para implementar una nueva solución de almacenamiento de datos que mejoró la velocidad de acceso a los datos en un 40%.",
            "Diseñé una arquitectura de datos basada en la nube que redujo los costos operativos en $200,000 anuales.",
            "Desarrollé procesos ETL que integraron datos de más de 10 fuentes, mejorando las capacidades de informes.",
          ],
        },
        {
          title: "Ingeniero de Data Warehouse",
          company: "Data Systems Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimicé los flujos de trabajo de procesamiento de datos, disminuyendo el tiempo de preparación de datos en un 25%.",
            "Implementé un marco de gobernanza de datos que incrementó la precisión de los datos en un 15%.",
            "Colaboré con equipos multifuncionales para ofrecer información procesable, resultando en un aumento del 20% en las ventas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencia de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "AWS Certified Data Analytics", issuer: "Amazon", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un arquitecto de data warehouse en su currículum?", answer: "Un arquitecto de data warehouse debe incluir su experiencia en diseño de arquitectura de datos, procesos ETL, habilidades en herramientas de BI, y ejemplos de proyectos exitosos." },
      { question: "¿Cómo destacar mi currículum de arquitecto de data warehouse?", answer: "Para destacar, enfócate en logros cuantificables, utiliza palabras clave relevantes y personaliza tu currículum para cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un arquitecto de data warehouse?", answer: "Las habilidades clave incluyen modelado de datos, ETL, SQL, herramientas de análisis de datos, y conocimiento en tecnologías en la nube." },
    ],
  },
  "data-warehouse-qa-analyst": {
    slug: "analista-qa-data-warehouse",
    title: "Analista QA de Data Warehouse",
    keywords: ["currículum de analista qa de data warehouse", "cv de analista qa de data warehouse", "ejemplo currículum analista qa de data warehouse", "plantilla cv analista qa de data warehouse"],
    searchIntents: ["cómo escribir currículum de analista qa de data warehouse", "ejemplos currículum analista qa de data warehouse", "mejor formato cv analista qa de data warehouse"],
    topSkills: ["SQL", "Pruebas ETL", "Análisis de Datos", "Pruebas de Automatización", "Modelado de Datos", "Pruebas de Rendimiento", "Aseguramiento de Calidad de Datos", "Inteligencia de Negocios", "Resolución de Problemas", "Comunicación"],
    atsKeywords: ["Data Warehouse", "QA Analyst", "ETL", "SQL", "Ágil", "Casos de Prueba", "Validación de Datos", "Automatización", "Seguimiento de Defectos", "Reportes", "Requisitos de Negocio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Analista QA de Data Warehouse",
      summary: "Analista QA de Data Warehouse orientado a los detalles con más de 5 años de experiencia en garantizar la integridad y calidad de los datos. Logré una reducción del 30% en los defectos de datos a través de pruebas exhaustivas y mejoras en los procesos.",
      skills: ["SQL", "Pruebas ETL", "Análisis de Datos", "Pruebas de Automatización", "Modelado de Datos", "Pruebas de Rendimiento", "Aseguramiento de Calidad de Datos", "Inteligencia de Negocios", "Resolución de Problemas", "Comunicación"],
      experience: [
        {
          title: "Analista QA Senior de Data Warehouse",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo en la reducción de defectos de datos en un 30%, mejorando la calidad general de los datos.",
            "Mejoré los procesos ETL, lo que resultó en un tiempo de carga de datos un 25% más rápido.",
            "Implementé scripts de pruebas automatizadas que aumentaron la eficiencia de las pruebas en un 40%.",
          ],
        },
        {
          title: "Analista QA de Data Warehouse",
          company: "Data Insights LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé pruebas exhaustivas que identificaron discrepancias críticas en los datos, ahorrando a la empresa aproximadamente $50,000.",
            "Desarrollé y mantuve documentación de pruebas integral, mejorando el intercambio de conocimientos en el equipo.",
            "Colaboré con equipos multifuncionales para garantizar la alineación en los requisitos de datos.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Software Quality Analyst (CSQA)", issuer: "Quality Assurance Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Data Warehouse QA Analyst en su currículum?", answer: "Debería incluir su experiencia en pruebas de datos, habilidades técnicas como SQL y ETL, y ejemplos de logros." },
      { question: "¿Cómo destacar mi currículum de Data Warehouse QA Analyst?", answer: "Utilice palabras clave relevantes y destaque logros cuantificables en sus experiencias laborales." },
      { question: "¿Qué habilidades necesita un Data Warehouse QA Analyst?", answer: "Se requieren habilidades en pruebas de datos, análisis de datos, y conocimientos en herramientas de automatización de pruebas." },
    ],
  },
  "datawarehouse-developer": {
    slug: "desarrollador-de-data-warehouse",
    title: "Desarrollador de Data Warehouse",
    keywords: ["currículum de Desarrollador de Data Warehouse", "CV de Desarrollador de Data Warehouse", "ejemplo currículum Desarrollador de Data Warehouse", "plantilla CV Desarrollador de Data Warehouse"],
    searchIntents: ["cómo escribir currículum de Desarrollador de Data Warehouse", "ejemplos currículum Desarrollador de Data Warehouse", "mejor formato CV Desarrollador de Data Warehouse"],
    topSkills: ["Desarrollo ETL", "SQL", "Modelado de Datos", "Integración de Datos", "Optimización de Rendimiento", "Conceptos de Almacenamiento de Datos", "Inteligencia Empresarial", "Gestión de Calidad de Datos", "Almacenamiento de Datos en la Nube", "Tecnologías de Big Data"],
    atsKeywords: ["Data Warehouse", "ETL", "SQL", "Modelado de Datos", "Inteligencia Empresarial", "Integración de Datos", "Análisis de Datos", "Gobernanza de Datos", "Arquitectura de Datos", "Optimización de Rendimiento", "Soluciones en la Nube"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Desarrollador de Data Warehouse",
      summary: "Desarrollador de Data Warehouse orientado a los detalles con más de 5 años de experiencia en procesos ETL y modelado de datos. Mejoró con éxito los tiempos de recuperación de datos en un 30% a través de consultas SQL optimizadas.",
      skills: ["Desarrollo ETL", "SQL", "Modelado de Datos", "Integración de Datos", "Optimización de Rendimiento", "Conceptos de Almacenamiento de Datos", "Inteligencia Empresarial", "Gestión de Calidad de Datos", "Almacenamiento de Datos en la Nube", "Tecnologías de Big Data"],
      experience: [
        {
          title: "Desarrollador Senior de Data Warehouse",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que redujo el tiempo de generación de informes en un 40%, aumentando la eficiencia en todos los departamentos.",
            "Implementé un nuevo proceso ETL que mejoró la precisión de los datos en un 25%.",
            "Colaboré con equipos multifuncionales para lanzar con éxito una solución de data warehouse que apoyó un crecimiento del 10% en análisis de clientes.",
          ],
        },
        {
          title: "Desarrollador de Data Warehouse",
          company: "Data Insights LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé y mantuve procesos ETL que manejaban más de 1 millón de registros diarios.",
            "Mejoré los métodos de integración de datos, lo que resultó en una disminución del 20% en la redundancia de datos.",
            "Creé paneles y visualizaciones que ayudaron en la toma de decisiones para partes interesadas clave.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Data Management Professional", issuer: "DAMA International", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Data Warehouse Developer en su currículum?", answer: "Un Data Warehouse Developer debe incluir habilidades técnicas relevantes, experiencia laboral detallada y logros cuantificables en su currículum." },
      { question: "¿Cómo destacar mi currículum de Data Warehouse Developer?", answer: "Para destacar su currículum, enfoque en resultados medibles, utilice palabras clave adecuadas y resalte proyectos significativos en los que haya trabajado." },
      { question: "¿Qué habilidades necesita un Data Warehouse Developer?", answer: "Un Data Warehouse Developer necesita habilidades en ETL, SQL, modelado de datos, integración de datos y herramientas de inteligencia empresarial." },
    ],
  },
  "doordash-driver": {
    slug: "curriculum-chofer-doordash",
    title: "Currículum de Chofer de Doordash",
    keywords: ["currículum de chofer de Doordash", "CV de Doordash", "ejemplo currículum chofer Doordash", "plantilla CV Doordash"],
    searchIntents: ["cómo escribir currículum de chofer de Doordash", "ejemplos currículum Doordash", "mejor formato CV Doordash"],
    topSkills: ["Gestión del tiempo", "Servicio al cliente", "Habilidades de navegación", "Comunicación", "Resolución de problemas", "Atención al detalle", "Mantenimiento de vehículos", "Manejo del estrés", "Adaptabilidad", "Conocimiento del área local"],
    atsKeywords: ["chofer de entrega", "entrega de comida", "satisfacción del cliente", "optimización de rutas", "reglamentos de tráfico", "exactitud de pedidos", "logística de entrega", "navegación GPS", "competencia en aplicaciones", "eficiencia de tiempo", "retroalimentación del cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Chofer de Doordash",
      summary: "Chofer de Doordash dedicado con más de 3 años de experiencia en servicios de entrega de comida, logrando una tasa de satisfacción del cliente del 95% y entregando más de 1,500 pedidos.",
      skills: ["Gestión del tiempo", "Servicio al cliente", "Habilidades de navegación", "Comunicación", "Resolución de problemas", "Atención al detalle", "Mantenimiento de vehículos", "Manejo del estrés", "Adaptabilidad", "Conocimiento del área local"],
      experience: [
        {
          title: "Chofer de Doordash",
          company: "Doordash",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré una calificación de satisfacción del cliente del 95% durante 2 años.",
            "Entregué más de 1,200 pedidos con un tiempo de entrega promedio de 20 minutos.",
            "Entrené a nuevos choferes sobre las mejores prácticas para el servicio al cliente y la navegación.",
          ],
        },
        {
          title: "Chofer de Entrega",
          company: "Uber Eats",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve una calificación promedio del cliente de 4.9 sobre 5.",
            "Completé 800 entregas optimizando rutas para ahorrar combustible.",
            "Recibí una commendación por servicio excepcional durante horas pico.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Food Safety Certification", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Doordash Driver Resume en su currículum?", answer: "Un Doordash Driver Resume debe incluir habilidades relevantes, experiencia laboral en entrega de comida, y logros que resalten la satisfacción del cliente." },
      { question: "¿Cómo destacar mi currículum de Doordash Driver Resume?", answer: "Para destacar tu currículum, utiliza palabras clave relacionadas con el servicio al cliente y la eficiencia en la entrega, y muestra tus logros cuantificables." },
      { question: "¿Qué habilidades necesita un Doordash Driver Resume?", answer: "Las habilidades clave incluyen gestión del tiempo, servicio al cliente, habilidades de navegación y capacidad para trabajar bajo presión." },
    ],
  },
  "driver-at-transport-partners": {
    slug: "conductor-en-transport-partners",
    title: "Conductor en Transport Partners",
    keywords: ["currículum de conductor", "CV de conductor", "ejemplo currículum conductor", "plantilla CV conductor"],
    searchIntents: ["cómo escribir currículum de conductor", "ejemplos currículum conductor", "mejor formato CV conductor"],
    topSkills: ["conducción defensiva", "planificación de rutas", "mantenimiento de vehículos", "servicio al cliente", "gestión del tiempo", "cumplimiento de seguridad", "habilidades de navegación", "comunicación", "resolución de problemas", "coordinación logística"],
    atsKeywords: ["conducción comercial", "CDL", "seguridad en el transporte", "inspección de vehículos", "programación de entregas", "interacción con el cliente", "gestión de flota", "navegación GPS", "respuesta a emergencias", "leyes de tráfico", "carga y descarga"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Conductor en Transport Partners",
      summary: "Conductor dedicado con más de 5 años de experiencia en transporte y logística, logrando consistentemente un 98% de entregas a tiempo y manteniendo un historial de conducción limpio.",
      skills: ["conducción defensiva", "planificación de rutas", "mantenimiento de vehículos", "servicio al cliente", "gestión del tiempo", "cumplimiento de seguridad", "habilidades de navegación", "comunicación", "resolución de problemas", "coordinación logística"],
      experience: [
        {
          title: "Conductor Senior",
          company: "FedEx",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de entrega en un 15% mediante la optimización de rutas.",
            "Logré un 100% de cumplimiento en las inspecciones de seguridad durante los últimos 12 meses.",
            "Reconocido como Empleado del Mes por un servicio al cliente excepcional.",
          ],
        },
        {
          title: "Conductor de Entregas",
          company: "UPS",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Entregué exitosamente más de 1,000 paquetes al mes con un 98% de puntualidad.",
            "Reduje los costos de combustible en un 10% mediante una gestión eficaz de rutas.",
            "Capacité a nuevos conductores en protocolos de seguridad e interacción con el cliente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Gestión Logística", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Commercial Driver's License (CDL)", issuer: "Department of Motor Vehicles", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un conductor en Transport Partners en su currículum?", answer: "Debe incluir su experiencia en conducción, habilidades relacionadas con la logística y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de conductor en Transport Partners?", answer: "Enfóquese en sus logros, habilidades de servicio al cliente y experiencia en cumplimiento de seguridad." },
      { question: "¿Qué habilidades necesita un conductor en Transport Partners?", answer: "Habilidades clave incluyen conducción defensiva, planificación de rutas y gestión de tiempo." },
    ],
  },
  "electrician-helper": {
    slug: "ayudante-electricista",
    title: "Ayudante Electricista",
    keywords: ["currículum de ayudante electricista", "CV de ayudante electricista", "ejemplo currículum ayudante electricista", "plantilla CV ayudante electricista"],
    searchIntents: ["cómo escribir currículum de ayudante electricista", "ejemplos currículum ayudante electricista", "mejor formato CV ayudante electricista"],
    topSkills: ["Sistemas eléctricos", "Circuitos", "Herramientas eléctricas", "Lectura de planos", "Resolución de problemas", "Protocolos de seguridad", "Asistencia en instalación", "Mantenimiento", "Colaboración en equipo", "Solución de problemas"],
    atsKeywords: ["Electricista", "Ayudante", "Eléctrico", "Instalación", "Mantenimiento", "Seguridad", "Herramientas", "Planos", "Solucionar", "Reparar", "Asistencia"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ayudante Electricista",
      summary: "Ayudante Electricista dedicado con 5 años de experiencia en sistemas eléctricos residenciales y comerciales. Historial comprobado de asistencia en la finalización de más de 200 instalaciones, garantizando seguridad y eficiencia.",
      skills: ["Sistemas eléctricos", "Circuitos", "Herramientas eléctricas", "Lectura de planos", "Resolución de problemas", "Protocolos de seguridad", "Asistencia en instalación", "Mantenimiento", "Colaboración en equipo", "Solución de problemas"],
      experience: [
        {
          title: "Ayudante Electricista Principal",
          company: "Bright Future Electric",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en la instalación de más de 100 sistemas eléctricos residenciales, contribuyendo a un aumento del 20% en las calificaciones de satisfacción del cliente.",
            "Optimicé el proceso de instalaciones eléctricas, reduciendo el tiempo dedicado a cada proyecto en un 15%.",
            "Capacité a 5 nuevos empleados sobre protocolos de seguridad y estándares eléctricos, mejorando el cumplimiento del equipo.",
          ],
        },
        {
          title: "Ayudante Electricista",
          company: "Power House Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé a electricistas en la finalización de más de 150 proyectos comerciales, incluyendo cableado, iluminación y tareas de mantenimiento.",
            "Implementé un nuevo sistema de seguimiento de inventario para herramientas y materiales, disminuyendo los incidentes de equipo perdido en un 30%.",
            "Recibí el premio Empleado del Mes por colaboración excepcional en equipo y asistencia en proyectos.",
          ],
        },
      ],
      education: [
        { institution: "Technical College of Electrical Engineering", degree: "A.A.S.", field: "Tecnología Eléctrica", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "OSHA 10-Hour Safety Certification", issuer: "OSHA", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Electrician Helper en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas, y certificaciones relacionadas." },
      { question: "¿Cómo destacar mi currículum de Electrician Helper?", answer: "Enfócate en tus logros y habilidades específicas, y utiliza palabras clave relevantes." },
      { question: "¿Qué habilidades necesita un Electrician Helper?", answer: "Necesita habilidades en sistemas eléctricos, resolución de problemas, y conocimiento de protocolos de seguridad." },
    ],
  },
  "entry-level-mechanic": {
    slug: "mecanico-de-nivel-inicial",
    title: "Mecánico de Nivel Inicial",
    keywords: ["currículum de mecánico de nivel inicial", "CV de mecánico de nivel inicial", "ejemplo currículum mecánico de nivel inicial", "plantilla CV mecánico de nivel inicial"],
    searchIntents: ["cómo escribir currículum de mecánico de nivel inicial", "ejemplos currículum mecánico de nivel inicial", "mejor formato CV mecánico de nivel inicial"],
    topSkills: ["Reparación Automotriz", "Habilidades de Diagnóstico", "Aptitud Mecánica", "Resolución de Problemas", "Atención al Cliente", "Atención al Detalle", "Colaboración en Equipo", "Gestión del Tiempo", "Cumplimiento de Seguridad", "Dominio de Herramientas"],
    atsKeywords: ["habilidades mecánicas", "mantenimiento de vehículos", "solución de problemas", "técnicas de reparación", "comunicación con clientes", "normas de seguridad", "mantenimiento preventivo", "diagnóstico de motores", "herramientas automotrices", "trabajo en equipo", "conocimiento técnico"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Mecánico de Nivel Inicial",
      summary: "Mecánico de nivel inicial entusiasta con más de 2 años de experiencia práctica en reparación y mantenimiento automotriz. Capacidad comprobada para diagnosticar problemas con precisión y brindar un servicio de alta calidad, resultando en un aumento del 30% en las calificaciones de satisfacción del cliente.",
      skills: ["Reparación Automotriz", "Habilidades de Diagnóstico", "Aptitud Mecánica", "Resolución de Problemas", "Atención al Cliente", "Atención al Detalle", "Colaboración en Equipo", "Gestión del Tiempo", "Cumplimiento de Seguridad", "Dominio de Herramientas"],
      experience: [
        {
          title: "Practicante de Mecánico",
          company: "Joe's Auto Repair",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Aumenté el tiempo de entrega de reparación de vehículos en un 15% mediante una gestión efectiva del tiempo.",
            "Asistí en el diagnóstico y reparación de más de 100 vehículos, resultando en una tasa de satisfacción del cliente del 95%.",
            "Implementé un nuevo sistema de inventario de piezas que redujo costos en $500 anualmente.",
          ],
        },
        {
          title: "Aprendiz de Técnico Automotriz",
          company: "Smith's Garage",
          startDate: "2020-03",
          endDate: "2022-05",
          achievements: [
            "Completé más de 50 horas de capacitación en reparación automotriz con enfoque en diagnóstico de motores.",
            "Logré una tasa de éxito del 90% en la realización de reparaciones menores y mantenimiento de rutina.",
            "Contribuí a un proyecto en equipo que mejoró la eficiencia del taller en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "Technical Institute of Technology", degree: "Diploma", field: "Tecnología Automotriz", startDate: "2018-08", endDate: "2020-05" },
      ],
      certifications: [
        { name: "Automotive Service Excellence (ASE) Certification", issuer: "National Institute for Automotive Service Excellence", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un mecánico de nivel inicial en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia práctica, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de mecánico de nivel inicial?", answer: "Enfatiza tus habilidades técnicas y logros en experiencias previas." },
      { question: "¿Qué habilidades necesita un mecánico de nivel inicial?", answer: "Habilidades en reparación automotriz, diagnóstico de problemas, y atención al cliente son clave." },
    ],
  },
  "exemple-de-de-carrefour-service-delivery-manager": {
    slug: "ejemplo-de-carrefour-service-delivery-manager",
    title: "Ejemplo de Gerente de Entrega de Servicios de Carrefour",
    keywords: ["currículum de Gerente de Entrega de Servicios", "CV de Gerente de Entrega de Servicios", "ejemplo currículum Gerente de Entrega de Servicios", "plantilla CV Gerente de Entrega de Servicios"],
    searchIntents: ["cómo escribir currículum de Gerente de Entrega de Servicios", "ejemplos currículum Gerente de Entrega de Servicios", "mejor formato CV Gerente de Entrega de Servicios"],
    topSkills: ["Gestión de Proyectos", "Liderazgo de Equipo", "Gestión de Interesados", "Acuerdos de Nivel de Servicio (SLAs)", "Mejora de Procesos", "Gestión de Relaciones con Clientes (CRM)", "Análisis de Datos", "Gestión de Riesgos", "Asignación de Recursos", "Gestión de Presupuestos"],
    atsKeywords: ["Entrega de Servicios", "Satisfacción del Cliente", "Excelencia Operativa", "Métricas de Rendimiento", "Mejora Continua", "Soporte Técnico", "Gestión de Proveedores", "Colaboración Interfuncional", "Metodologías Ágiles", "Marco ITIL", "Gestión del Cambio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ejemplo de Gerente de Entrega de Servicios de Carrefour",
      summary: "Gerente de Entrega de Servicios orientado a resultados con más de 5 años de experiencia en optimización de operaciones de servicio y mejora de la satisfacción del cliente. Historial comprobado de lograr una reducción del 20% en los costos de entrega de servicios mientras se mejoran las métricas de calidad del servicio en un 30%.",
      skills: ["Gestión de Proyectos", "Liderazgo de Equipo", "Gestión de Interesados", "Acuerdos de Nivel de Servicio (SLAs)", "Mejora de Procesos", "Gestión de Relaciones con Clientes (CRM)", "Análisis de Datos", "Gestión de Riesgos", "Asignación de Recursos", "Gestión de Presupuestos"],
      experience: [
        {
          title: "Gerente Senior de Entrega de Servicios",
          company: "Accenture",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de costos de entrega de servicios en un 20% mediante optimización de procesos.",
            "Mejora de las puntuaciones de satisfacción del cliente del 75% al 90% en 6 meses.",
            "Lideré un equipo de 15 en la entrega de servicios de TI, logrando un cumplimiento de SLA del 98%.",
          ],
        },
        {
          title: "Gerente de Entrega de Servicios",
          company: "Capgemini",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementación de un nuevo sistema de tickets que disminuyó los tiempos de respuesta en un 40%.",
            "Aumento de la calidad del servicio en un 30% mediante capacitación y desarrollo del personal.",
            "Gestión de relaciones con proveedores, resultando en una reducción de costos del 15%.",
          ],
        },
      ],
      education: [
        { institution: "University of Technology", degree: "Licenciatura", field: "Tecnologías de la Información", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified ITIL Practitioner", issuer: "Axelos", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Example of Carrefour Service Delivery Manager en su currículum?", answer: "Debe incluir experiencia relevante, habilidades específicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Example of Carrefour Service Delivery Manager?", answer: "Utilizando palabras clave relevantes y enfocándose en logros específicos relacionados con la entrega de servicios." },
      { question: "¿Qué habilidades necesita un Example of Carrefour Service Delivery Manager?", answer: "Habilidades clave incluyen gestión de proyectos, liderazgo de equipo y gestión de relaciones con clientes." },
    ],
  },
  "farm-worker": {
    slug: "trabajador-de-granja",
    title: "Trabajador de Granja",
    keywords: ["currículum de trabajador de granja", "CV de trabajador de granja", "ejemplo currículum trabajador de granja", "plantilla CV trabajador de granja"],
    searchIntents: ["cómo escribir currículum de trabajador de granja", "ejemplos currículum trabajador de granja", "mejor formato CV trabajador de granja"],
    topSkills: ["gestión de cultivos", "cosecha", "operación de equipos", "sistemas de riego", "cría de animales", "gestión del suelo", "control de plagas", "mantenimiento de registros", "colaboración en equipo", "cumplimiento de seguridad"],
    atsKeywords: ["agricultura", "plantación", "fertilización", "mantenimiento de campo", "rotación de cultivos", "cuidado del ganado", "habilidades de mantenimiento", "resistencia física", "resolución de problemas", "gestión del tiempo", "adaptabilidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador de Granja",
      summary: "Trabajador de granja dedicado con más de 5 años de experiencia en gestión de cultivos y cuidado de ganado, aumentando con éxito el rendimiento de los cultivos en un 30% a través de prácticas agrícolas eficientes.",
      skills: ["gestión de cultivos", "cosecha", "operación de equipos", "sistemas de riego", "cría de animales", "gestión del suelo", "control de plagas", "mantenimiento de registros", "colaboración en equipo", "cumplimiento de seguridad"],
      experience: [
        {
          title: "Trabajador de Granja Senior",
          company: "Green Acres Farm",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el rendimiento de los cultivos en un 30% mediante prácticas de riego mejoradas",
            "Gestioné un equipo de 5 trabajadores para completar la cosecha 2 semanas antes de lo programado",
            "Reduje el tiempo de inactividad del equipo en un 15% mediante una programación de mantenimiento efectiva",
          ],
        },
        {
          title: "Trabajador de Granja",
          company: "Sunny Fields Farm",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en la plantación exitosa de más de 100 acres de cultivos",
            "Mantuve la salud del ganado, lo que resultó en una disminución del 20% en los costos veterinarios",
            "Implementé medidas de control de plagas que llevaron a una reducción del 25% en el daño a los cultivos",
          ],
        },
      ],
      education: [
        { institution: "Agricultural University", degree: "B.S.", field: "Ciencia Agrícola", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Crop Advisor", issuer: "American Society of Agronomy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Trabajador de Granja en su currículum?", answer: "Un Trabajador de Granja debe incluir experiencia relevante, habilidades específicas de agricultura, y logros en la mejora de cultivos y cuidado de ganado." },
      { question: "¿Cómo destacar mi currículum de Trabajador de Granja?", answer: "Utilice palabras clave relacionadas con la agricultura y enumere logros cuantificables en su experiencia laboral." },
      { question: "¿Qué habilidades necesita un Trabajador de Granja?", answer: "Las habilidades clave incluyen gestión de cultivos, operación de equipos, y mantenimiento de la salud del ganado." },
    ],
  },
  "foreman": {
    slug: "capataz",
    title: "Capataz",
    keywords: ["currículum de capataz", "CV de capataz", "ejemplo currículum capataz", "plantilla CV capataz"],
    searchIntents: ["cómo escribir currículum de capataz", "ejemplos currículum capataz", "mejor formato CV capataz"],
    topSkills: ["Liderazgo", "Gestión de Proyectos", "Lectura de Planos", "Cumplimiento de Seguridad", "Coordinación de Equipo", "Programación", "Control de Calidad", "Resolución de Problemas", "Comunicación", "Resolución de Conflictos"],
    atsKeywords: ["Gestión de Construcción", "Liderazgo de Equipo", "Supervisión de Sitio", "Gestión de Mano de Obra", "Control de Costos", "Asignación de Recursos", "Regulaciones de Seguridad", "Capacitación de Personal", "Operación de Equipos", "Programación de Proyectos", "Aseguramiento de Calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Capataz",
      summary: "Capataz experimentado con más de 8 años en la industria de la construcción, liderando equipos para completar proyectos un 15% por debajo del presupuesto mientras mejoraba el cumplimiento de seguridad en un 20%.",
      skills: ["Liderazgo", "Gestión de Proyectos", "Lectura de Planos", "Cumplimiento de Seguridad", "Coordinación de Equipo", "Programación", "Control de Calidad", "Resolución de Problemas", "Comunicación", "Resolución de Conflictos"],
      experience: [
        {
          title: "Capataz Senior",
          company: "BuildCorp Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo de 20 para completar un proyecto comercial de $5M un 10% antes de lo programado.",
            "Mejoré el cumplimiento de seguridad, reduciendo incidentes en un 30% durante 12 meses.",
            "Implementé nuevas técnicas de programación que aumentaron la eficiencia del proyecto en un 25%.",
          ],
        },
        {
          title: "Capataz",
          company: "Constructive Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Supervisé construcciones residenciales valoradas en $3M, asegurando la adherencia a los plazos y presupuestos.",
            "Capacité y mentoreé a 15 miembros del personal junior, mejorando la productividad del equipo en un 20%.",
            "Mejoré los procesos de adquisición de materiales, logrando una reducción de costos del 15%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "OSHA 30-Hour Construction Safety", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Capataz en su currículum?", answer: "Un capataz debe incluir su experiencia en supervisión, habilidades de liderazgo y cumplimiento de seguridad." },
      { question: "¿Cómo destacar mi currículum de Capataz?", answer: "Destacar logros cuantificables y habilidades relevantes para la industria de la construcción." },
      { question: "¿Qué habilidades necesita un Capataz?", answer: "Liderazgo, gestión de proyectos, cumplimiento de seguridad, y habilidades de comunicación son esenciales." },
    ],
  },
  "foreman-lendlease": {
    slug: "foreman-lendlease",
    title: "Capataz Lendlease",
    keywords: ["currículum de capataz", "CV de capataz", "ejemplo currículum capataz", "plantilla CV capataz"],
    searchIntents: ["cómo escribir currículum de capataz", "ejemplos currículum capataz", "mejor formato CV capataz"],
    topSkills: ["Gestión de Proyectos", "Liderazgo de Equipo", "Cumplimiento de Seguridad", "Planificación", "Resolución de Problemas", "Control de Calidad", "Comunicación", "Resolución de Conflictos", "Asignación de Recursos", "Competencia Técnica"],
    atsKeywords: ["gestión de construcción", "supervisión de obra", "coordinación de equipo", "seguridad en construcción", "códigos de construcción", "programación de proyectos", "aseguramiento de calidad", "inspecciones de obra", "gestión de presupuesto", "operación de equipos pesados", "capacitación de personal"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Capataz Lendlease",
      summary: "Capataz experimentado con más de 7 años en la industria de la construcción, conocido por supervisar con éxito proyectos por un valor de hasta $5 millones, asegurando la entrega a tiempo y el cumplimiento de las normas de seguridad.",
      skills: ["Gestión de Proyectos", "Liderazgo de Equipo", "Cumplimiento de Seguridad", "Planificación", "Resolución de Problemas", "Control de Calidad", "Comunicación", "Resolución de Conflictos", "Asignación de Recursos", "Competencia Técnica"],
      experience: [
        {
          title: "Capataz Senior",
          company: "Turner Construction",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo de 15 en un proyecto de $3 millones, reduciendo costos en un 15% a través de una asignación estratégica de recursos.",
            "Implementé protocolos de seguridad que resultaron en una disminución del 30% en incidentes laborales en dos años.",
            "Gestioné exitosamente los plazos del proyecto, logrando un 100% de tasa de finalización a tiempo en todas las asignaciones.",
          ],
        },
        {
          title: "Capataz",
          company: "Skanska",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Supervisé la construcción de un edificio de 10 pisos, coordinando esfuerzos de subcontratistas y trabajadores.",
            "Logré una mejora del 20% en la productividad reestructurando los horarios de trabajo y mejorando la comunicación del equipo.",
            "Realicé inspecciones regulares en el sitio asegurando el cumplimiento de las normas de seguridad y calidad.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "OSHA 30-Hour Construction Safety", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Foreman Lendlease en su currículum?", answer: "Un Foreman Lendlease debe incluir experiencia relevante, habilidades de liderazgo y gestión de proyectos, así como certificaciones de seguridad." },
      { question: "¿Cómo destacar mi currículum de Foreman Lendlease?", answer: "Utiliza palabras clave específicas de la industria y destaca logros cuantificables en tus experiencias laborales." },
      { question: "¿Qué habilidades necesita un Foreman Lendlease?", answer: "Habilidades clave incluyen gestión de proyectos, cumplimiento de seguridad, liderazgo, y capacidad de resolución de conflictos." },
    ],
  },
  "free-construction": {
    slug: "gerente-de-proyecto-de-construccion",
    title: "Gerente de Proyecto de Construcción",
    keywords: ["currículum de gerente de proyecto de construcción", "CV de gerente de proyecto de construcción", "ejemplo currículum gerente de proyecto de construcción", "plantilla CV gerente de proyecto de construcción"],
    searchIntents: ["cómo escribir currículum de gerente de proyecto de construcción", "ejemplos currículum gerente de proyecto de construcción", "mejor formato CV gerente de proyecto de construcción"],
    topSkills: ["Gestión de Proyectos", "Presupuestación", "Programación", "Cumplimiento de Seguridad", "Liderazgo de Equipo", "Negociación de Contratos", "Aseguramiento de Calidad", "Gestión de Sitio", "Evaluación de Riesgos", "Comunicación"],
    atsKeywords: ["gestión de construcción", "programación de proyectos", "estimación de costos", "seguridad en el sitio", "gestión de contratos", "códigos de construcción", "técnicas de construcción", "lectura de planos", "colaboración en equipo", "adquisición de materiales", "compromiso de las partes interesadas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Proyecto de Construcción",
      summary: "Gerente de Proyecto de Construcción orientado a los detalles con más de 8 años de experiencia supervisando proyectos residenciales y comerciales a gran escala. Ha gestionado proyectos con presupuestos superiores a $5 millones, entregando a tiempo y por debajo del presupuesto.",
      skills: ["Gestión de Proyectos", "Presupuestación", "Programación", "Cumplimiento de Seguridad", "Liderazgo de Equipo", "Negociación de Contratos", "Aseguramiento de Calidad", "Gestión de Sitio", "Evaluación de Riesgos", "Comunicación"],
      experience: [
        {
          title: "Gerente Senior de Proyecto de Construcción",
          company: "Baker Construction Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto de renovación comercial de $3 millones que se completó 2 meses antes de lo programado, lo que resultó en un ahorro de costos del 15%.",
            "Implementé un nuevo sistema de seguimiento de proyectos que mejoró la comunicación del equipo y redujo los retrasos en los proyectos en un 30%.",
            "Logré cero incidentes de seguridad durante un periodo de 12 meses en el sitio, manteniendo un 100% de cumplimiento con los estándares de OSHA.",
          ],
        },
        {
          title: "Gerente de Proyecto de Construcción",
          company: "Greenfield Development",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné más de 10 proyectos de construcción residencial por valor de $1.5 millones cada uno, manteniendo una tasa de satisfacción del cliente del 95%.",
            "Negocié contratos con subcontratistas que redujeron costos en un 20%, mejorando la rentabilidad del proyecto.",
            "Agilicé el proceso de aprobación de proyectos, reduciendo el tiempo desde la propuesta hasta el inicio en un 25%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Construction Manager", issuer: "Construction Management Association of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Construction Project Manager en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Construction Project Manager?", answer: "Enfocarse en resultados específicos y utilizar palabras clave relacionadas con la industria." },
      { question: "¿Qué habilidades necesita un Construction Project Manager?", answer: "Habilidades en gestión de proyectos, comunicación, y cumplimiento de seguridad, entre otras." },
    ],
  },
  "fresher-mechanical-engineer": {
    slug: "fresher-mechanical-engineer",
    title: "Ingeniero Mecánico Reciente",
    keywords: ["currículum de ingeniero mecánico reciente", "CV de ingeniero mecánico reciente", "ejemplo currículum ingeniero mecánico reciente", "plantilla CV ingeniero mecánico reciente"],
    searchIntents: ["cómo escribir currículum de ingeniero mecánico reciente", "ejemplos currículum ingeniero mecánico reciente", "mejor formato CV ingeniero mecánico reciente"],
    topSkills: ["SolidWorks", "AutoCAD", "CATIA", "MATLAB", "Análisis de Elementos Finitos", "Termodinámica", "Mecánica de Fluidos", "Procesos de Manufactura", "Gestión de Proyectos", "Redacción Técnica"],
    atsKeywords: ["ingeniería mecánica", "ingeniería de diseño", "análisis de ingeniería", "diseño de productos", "modelado 3D", "documentación técnica", "proyecto de ingeniería", "análisis de estrés", "software CAD", "colaboración en equipo", "resolución de problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero Mecánico Reciente",
      summary: "Graduado entusiasta en ingeniería mecánica con experiencia práctica en software CAD y una sólida base en termodinámica. Diseñó y presentó con éxito un proyecto que mejoró la eficiencia energética en un 15%.",
      skills: ["SolidWorks", "AutoCAD", "CATIA", "MATLAB", "Análisis de Elementos Finitos", "Termodinámica", "Mecánica de Fluidos", "Procesos de Manufactura", "Gestión de Proyectos", "Redacción Técnica"],
      experience: [
        {
          title: "Ingeniero Mecánico Interno",
          company: "General Electric",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Contribuí a un proyecto que redujo el desperdicio de manufactura en un 20%, ahorrando $50,000 anuales.",
            "Asistí en el diseño de un nuevo componente que mejoró la eficiencia general del sistema en un 10%.",
            "Participé en reuniones de equipo y presenté hallazgos técnicos a ingenieros senior.",
          ],
        },
        {
          title: "Pasante de Ingeniería Mecánica",
          company: "Ford Motor Company",
          startDate: "2021-06",
          endDate: "2022-05",
          achievements: [
            "Ayudé a desarrollar un prototipo que mejoró los métricas de rendimiento del vehículo en un 12%.",
            "Realicé pruebas y analizé datos que llevaron a una disminución del 5% en los costos de producción.",
            "Colaboré con equipos multifuncionales para optimizar los procesos de diseño.",
          ],
        },
      ],
      education: [
        { institution: "University of Michigan", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified SolidWorks Associate", issuer: "Dassault Systèmes", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un ingeniero mecánico reciente en su currículum?", answer: "Debe incluir su educación, habilidades técnicas, experiencia práctica y cualquier proyecto relevante." },
      { question: "¿Cómo destacar mi currículum de ingeniero mecánico reciente?", answer: "Enfócate en tus logros en proyectos, usa palabras clave de la industria y asegúrate de que tu diseño sea claro y profesional." },
      { question: "¿Qué habilidades necesita un ingeniero mecánico reciente?", answer: "Habilidades clave incluyen el dominio de software CAD, análisis de ingeniería, y comprensión de principios mecánicos y termodinámicos." },
    ],
  },
  "general-laborer": {
    slug: "trabajador-general",
    title: "Trabajador General",
    keywords: ["currículum de Trabajador General", "CV de Trabajador General", "ejemplo currículum Trabajador General", "plantilla CV Trabajador General"],
    searchIntents: ["cómo escribir currículum de Trabajador General", "ejemplos currículum Trabajador General", "mejor formato CV Trabajador General"],
    topSkills: ["Resistencia Física", "Atención al Detalle", "Gestión del Tiempo", "Trabajo en Equipo", "Comunicación", "Resolución de Problemas", "Conciencia de Seguridad", "Levantamiento de Cargas Pesadas", "Operación de Maquinaria", "Carpintería Básica"],
    atsKeywords: ["trabajo general", "trabajo físico", "construcción", "limpieza", "almacén", "herramientas manuales", "operación de montacargas", "mantenimiento", "paisajismo", "ensamblaje"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador General",
      summary: "Trabajador General dedicado con más de 5 años de experiencia en entornos de construcción y almacén. Historial comprobado de mejora de la eficiencia en un 25% mediante un trabajo en equipo efectivo y cumplimiento de los protocolos de seguridad.",
      skills: ["Resistencia Física", "Atención al Detalle", "Gestión del Tiempo", "Trabajo en Equipo", "Comunicación", "Resolución de Problemas", "Conciencia de Seguridad", "Levantamiento de Cargas Pesadas", "Operación de Maquinaria", "Carpintería Básica"],
      experience: [
        {
          title: "Trabajador General Senior",
          company: "ABC Construction Co.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia del proyecto en un 30% mediante una mejor gestión del flujo de trabajo.",
            "Completé con éxito más de 50 proyectos con una tasa de satisfacción del cliente del 98%.",
            "Reduje el desperdicio de material en un 15% mediante una cuidadosa gestión del inventario.",
          ],
        },
        {
          title: "Trabajador General",
          company: "XYZ Warehouse Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en la carga y descarga de más de 200 envíos semanales.",
            "Mantuve un ambiente de trabajo limpio y organizado, lo que llevó a una disminución del 20% en accidentes.",
            "Capacité a 5 nuevos empleados en protocolos de seguridad y procedimientos operativos.",
          ],
        },
      ],
      education: [
        { institution: "City Technical College", degree: "Grado Asociado", field: "Gestión de Construcción", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "OSHA 10-Hour Safety Training", issuer: "Occupational Safety and Health Administration", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Trabajador General en su currículum?", answer: "Debe incluir habilidades relevantes, experiencia laboral y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Trabajador General?", answer: "Enfóquese en resaltar logros específicos y habilidades clave." },
      { question: "¿Qué habilidades necesita un Trabajador General?", answer: "Resistencia física, atención al detalle y capacidad para trabajar en equipo son esenciales." },
    ],
  },
  "groundskeeper": {
    slug: "jardinero",
    title: "Jardinero",
    keywords: ["currículum de jardinero", "CV de jardinero", "ejemplo currículum jardinero", "plantilla CV jardinero"],
    searchIntents: ["cómo escribir currículum de jardinero", "ejemplos currículum jardinero", "mejor formato CV jardinero"],
    topSkills: ["Mantenimiento de paisajes", "Cuidado de césped", "Sistemas de riego", "Control de plagas", "Identificación de plantas", "Operación de equipos", "Poda de árboles", "Gestión de terrenos", "Preparación estacional", "Cumplimiento de seguridad"],
    atsKeywords: ["mantenimiento de terrenos", "paisajismo", "técnico de cuidado de césped", "horticultura", "salud de plantas", "gestión del suelo", "riego", "diseño de paisaje", "protocolos de seguridad", "mantenimiento de propiedades", "servicios de terrenos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Jardinero",
      summary: "Jardinero dedicado con más de 5 años de experiencia en mantenimiento de paisajes y gestión de terrenos, logrando una mejora del 30% en la estética de las propiedades a través de un cuidado efectivo del césped y sistemas de riego.",
      skills: ["Mantenimiento de paisajes", "Cuidado de césped", "Sistemas de riego", "Control de plagas", "Identificación de plantas", "Operación de equipos", "Poda de árboles", "Gestión de terrenos", "Preparación estacional", "Cumplimiento de seguridad"],
      experience: [
        {
          title: "Jardinero Senior",
          company: "Green Horizons Landscaping",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 40% mediante la mejora de la estética del paisaje y los horarios de mantenimiento.",
            "Gestioné un equipo de 5 jardineros, lo que llevó a un aumento del 25% en la productividad en proyectos de paisajismo.",
            "Implementé un nuevo sistema de riego, reduciendo el uso de agua en un 15% mientras mantenía paisajes saludables.",
          ],
        },
        {
          title: "Jardinero",
          company: "Parkside Gardens",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve más de 10 acres de parque, mejorando la experiencia de los visitantes y las calificaciones del parque en un 20%.",
            "Ejecuté con éxito estrategias de plantación estacional, resultando en un aumento del 50% en las tasas de floración.",
            "Desarrollé y apliqué protocolos de seguridad, reduciendo los accidentes laborales en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "Horticultural College", degree: "B.S.", field: "Horticultura", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Grounds Technician", issuer: "National Association of Landscape Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Jardinero en su currículum?", answer: "Un jardinero debe incluir su experiencia en mantenimiento de paisajes, habilidades en cuidado de césped y conocimiento de sistemas de riego." },
      { question: "¿Cómo destacar mi currículum de Jardinero?", answer: "Enfócate en tus logros en proyectos de paisajismo y menciona cualquier certificación relevante." },
      { question: "¿Qué habilidades necesita un Jardinero?", answer: "Las habilidades clave incluyen mantenimiento de paisajes, cuidado de césped, y conocimiento en control de plagas." },
    ],
  },
  "hvac-engineer": {
    slug: "ingeniero-hvac",
    title: "Ingeniero HVAC",
    keywords: ["currículum de ingeniero HVAC", "CV de ingeniero HVAC", "ejemplo currículum ingeniero HVAC", "plantilla CV ingeniero HVAC"],
    searchIntents: ["cómo escribir currículum de ingeniero HVAC", "ejemplos currículum ingeniero HVAC", "mejor formato CV ingeniero HVAC"],
    topSkills: ["Termodinámica", "Mecánica de Fluidos", "Sistemas de Refrigeración", "Diseño HVAC", "Gestión de Energía", "Sistemas de Automatización de Edificios", "Cálculos de Carga", "Puesta en Marcha de Sistemas", "Solución de Problemas", "Gestión de Proyectos"],
    atsKeywords: ["HVAC", "Calefacción", "Ventilación", "Aire Acondicionado", "Eficiencia Energética", "Ingeniería Mecánica", "Códigos de Construcción", "Sostenibilidad", "BIM", "AutoCAD", "Normas ASHRAE"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero HVAC",
      summary: "Ingeniero HVAC experimentado con más de 5 años en la industria, especializado en el diseño e implementación de sistemas energéticamente eficientes, logrando una reducción del 20% en los costos de energía para proyectos.",
      skills: ["Termodinámica", "Mecánica de Fluidos", "Sistemas de Refrigeración", "Diseño HVAC", "Gestión de Energía", "Sistemas de Automatización de Edificios", "Cálculos de Carga", "Puesta en Marcha de Sistemas", "Solución de Problemas", "Gestión de Proyectos"],
      experience: [
        {
          title: "Ingeniero HVAC Senior",
          company: "Global HVAC Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que redujo los costos operativos en un 30%, ahorrando $150,000 anuales.",
            "Mejoré la eficiencia del sistema en un 25% a través de soluciones de diseño innovadoras.",
            "Gestioné un equipo de 5 ingenieros en la finalización exitosa de proyectos antes de lo previsto.",
          ],
        },
        {
          title: "Ingeniero HVAC",
          company: "Comfort Climate Controls",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé e implementé sistemas HVAC para más de 50 edificios comerciales.",
            "Reduje el tiempo de instalación en un 15% mediante mejoras en el proceso.",
            "Desarrollé protocolos de mantenimiento que aumentaron la vida útil del sistema en un 10%.",
          ],
        },
      ],
      education: [
        { institution: "Tech University", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "LEED Green Associate", issuer: "U.S. Green Building Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un ingeniero HVAC en su currículum?", answer: "Un ingeniero HVAC debe incluir sus habilidades técnicas, experiencia laboral relevante, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de ingeniero HVAC?", answer: "Para destacar su currículum, enfóquese en logros medibles y en la utilización de palabras clave relevantes para la industria." },
      { question: "¿Qué habilidades necesita un ingeniero HVAC?", answer: "Las habilidades clave incluyen termodinámica, diseño HVAC, gestión de energía y solución de problemas." },
    ],
  },
  "hvac-installer": {
    slug: "instalador-hvac",
    title: "Instalador HVAC",
    keywords: ["currículum de instalador HVAC", "CV de instalador HVAC", "ejemplo currículum instalador HVAC", "plantilla CV instalador HVAC"],
    searchIntents: ["cómo escribir currículum de instalador HVAC", "ejemplos currículum instalador HVAC", "mejor formato CV instalador HVAC"],
    topSkills: ["Instalación", "Mantenimiento", "Resolución de Problemas", "Diseño de Sistemas", "Atención al Cliente", "Refrigeración", "Sistemas Eléctricos", "Conductos", "Eficiencia Energética", "Cumplimiento de Normativas"],
    atsKeywords: ["HVAC", "instalador", "aire acondicionado", "sistemas de calefacción", "ventilación", "mantenimiento de sistemas", "resolución de problemas", "auditorías energéticas", "relaciones con clientes", "estándares de seguridad", "sistemas de refrigeración"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Instalador HVAC",
      summary: "Instalador HVAC dedicado con más de 5 años de experiencia en la instalación y mantenimiento de sistemas HVAC. Logré una reducción del 20% en los costos de energía para los clientes a través de diseños de sistemas eficientes.",
      skills: ["Instalación", "Mantenimiento", "Resolución de Problemas", "Diseño de Sistemas", "Atención al Cliente", "Refrigeración", "Sistemas Eléctricos", "Conductos", "Eficiencia Energética", "Cumplimiento de Normativas"],
      experience: [
        {
          title: "Instalador HVAC Senior",
          company: "CoolTech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje el tiempo de instalación en un 30% a través de flujos de trabajo optimizados.",
            "Aumenté las calificaciones de satisfacción del cliente al 95% mediante un servicio de calidad.",
            "Completé con éxito más de 150 instalaciones en 2022, superando los objetivos de la empresa.",
          ],
        },
        {
          title: "Técnico HVAC",
          company: "Climate Control Experts",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una tasa de éxito del 98% en la resolución de problemas de HVAC en la primera visita.",
            "Mejoré la eficiencia energética para los clientes, resultando en un ahorro promedio de $500 anuales.",
            "Entrené a nuevos técnicos sobre las mejores prácticas, mejorando el rendimiento del equipo.",
          ],
        },
      ],
      education: [
        { institution: "Technical Institute of Technology", degree: "A.S.", field: "Tecnología HVAC", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "EPA Section 608 Certification", issuer: "Environmental Protection Agency", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Instalador HVAC en su currículum?", answer: "Incluya su experiencia laboral, habilidades relevantes y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Instalador HVAC?", answer: "Utilice palabras clave relacionadas con la industria y resalte sus logros." },
      { question: "¿Qué habilidades necesita un Instalador HVAC?", answer: "Instalación, mantenimiento, resolución de problemas, y atención al cliente son esenciales." },
    ],
  },
  "import-logistics-manager": {
    slug: "gerente-de-logistica-de-importacion",
    title: "Gerente de Logística de Importación",
    keywords: ["currículum de gerente de logística de importación", "CV de gerente de logística de importación", "ejemplo currículum gerente de logística de importación", "plantilla CV gerente de logística de importación"],
    searchIntents: ["cómo escribir currículum de gerente de logística de importación", "ejemplos currículum gerente de logística de importación", "mejor formato CV gerente de logística de importación"],
    topSkills: ["Gestión de la Cadena de Suministro", "Control de Inventarios", "Negociación con Proveedores", "Planificación Logística", "Cumplimiento Regulatorio", "Análisis de Datos", "Gestión de Carga", "Sistemas ERP", "Estrategias de Reducción de Costos", "Liderazgo de Equipos"],
    atsKeywords: ["logística", "importación", "cadena de suministro", "inventario", "transporte", "aduanas", "adquisiciones", "almacenamiento", "distribución", "control de calidad", "gestión de proveedores"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Logística de Importación",
      summary: "Gerente de Logística de Importación orientado a resultados con más de 8 años de experiencia en la optimización de operaciones de la cadena de suministro y reducción de costos en un 15%. Historial comprobado en la gestión de relaciones con proveedores y aseguramiento del cumplimiento de las regulaciones de importación.",
      skills: ["Gestión de la Cadena de Suministro", "Control de Inventarios", "Negociación con Proveedores", "Planificación Logística", "Cumplimiento Regulatorio", "Análisis de Datos", "Gestión de Carga", "Sistemas ERP", "Estrategias de Reducción de Costos", "Liderazgo de Equipos"],
      experience: [
        {
          title: "Gerente Senior de Logística de Importación",
          company: "Global Supply Co.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de costos de envío en un 20% a través de negociaciones estratégicas con proveedores.",
            "Aumento de la tasa de entrega a tiempo al 98% mediante la implementación de procesos logísticos mejorados.",
            "Gestión exitosa de un equipo de 10 especialistas en logística para optimizar las operaciones de la cadena de suministro.",
          ],
        },
        {
          title: "Coordinador de Logística de Importación",
          company: "Worldwide Logistics Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Racionalización del proceso de documentación de importación, reduciendo el tiempo de despacho en un 30%.",
            "Implementación de medidas de control de inventarios que disminuyeron el exceso de stock en un 25%.",
            "Colaboración con agentes de aduanas para asegurar el cumplimiento de todas las regulaciones de importación.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Logística y Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional (CSCP)", issuer: "APICS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Import Logistics Manager en su currículum?", answer: "Un Import Logistics Manager debe incluir su experiencia en la gestión de la cadena de suministro, habilidades de negociación, y logros cuantificables en reducción de costos y mejoras en la eficiencia logística." },
      { question: "¿Cómo destacar mi currículum de Import Logistics Manager?", answer: "Utilice métricas específicas para mostrar sus logros, destaque sus habilidades relevantes y personalice su currículum para cada puesto al que postule." },
      { question: "¿Qué habilidades necesita un Import Logistics Manager?", answer: "Las habilidades clave incluyen gestión de la cadena de suministro, control de inventarios, negociación con proveedores, y comprensión de regulaciones aduaneras." },
    ],
  },
  "junior-mechanical-engineer": {
    slug: "ingeniero-mecanico-junior",
    title: "Ingeniero Mecánico Junior",
    keywords: ["currículum de ingeniero mecánico junior", "CV de ingeniero mecánico junior", "ejemplo currículum ingeniero mecánico junior", "plantilla CV ingeniero mecánico junior"],
    searchIntents: ["cómo escribir currículum de ingeniero mecánico junior", "ejemplos currículum ingeniero mecánico junior", "mejor formato CV ingeniero mecánico junior"],
    topSkills: ["SolidWorks", "AutoCAD", "MATLAB", "Diseño Mecánico", "Termodinámica", "Mecánica de Fluidos", "Gestión de Proyectos", "Análisis por Elementos Finitos", "Análisis de Datos", "Redacción Técnica"],
    atsKeywords: ["ingeniería mecánica", "software CAD", "ingeniería de diseño", "desarrollo de productos", "principios de ingeniería", "modelado 3D", "prototipado", "pruebas y validación", "procesos de fabricación", "ciclo de vida del proyecto", "colaboración"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero Mecánico Junior",
      summary: "Ingeniero Mecánico Junior orientado a los detalles con 2 años de experiencia en diseño mecánico y desarrollo de productos. Mejoró exitosamente la eficiencia del producto en un 15% mediante soluciones de diseño innovadoras.",
      skills: ["SolidWorks", "AutoCAD", "MATLAB", "Diseño Mecánico", "Termodinámica", "Mecánica de Fluidos", "Gestión de Proyectos", "Análisis por Elementos Finitos", "Análisis de Datos", "Redacción Técnica"],
      experience: [
        {
          title: "Practicante de Ingeniería Mecánica",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Diseñé un nuevo componente que redujo los costos de producción en un 20%",
            "Colaboré con un equipo para desarrollar un prototipo que pasó todas las pruebas de durabilidad",
            "Asistí en la implementación de un nuevo procedimiento de pruebas que mejoró la precisión en un 30%",
          ],
        },
        {
          title: "Ingeniero Junior",
          company: "Engineering Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a un proyecto que mejoró la funcionalidad del producto, lo que llevó a un aumento del 10% en la satisfacción del cliente",
            "Ejecuté simulaciones que disminuyeron los errores de diseño en un 25%",
            "Desarrollé documentación técnica para las especificaciones del producto",
          ],
        },
      ],
      education: [
        { institution: "State University of Engineering", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified SolidWorks Associate", issuer: "Dassault Systèmes", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero Mecánico Junior en su currículum?", answer: "Debe incluir habilidades técnicas, experiencia relevante y logros en proyectos." },
      { question: "¿Cómo destacar mi currículum de Ingeniero Mecánico Junior?", answer: "Enfatiza tus logros cuantificables y habilidades técnicas específicas." },
      { question: "¿Qué habilidades necesita un Ingeniero Mecánico Junior?", answer: "Necesita habilidades en diseño CAD, análisis técnico y gestión de proyectos." },
    ],
  },
  "logistics-administrator": {
    slug: "administrador-logistico",
    title: "Administrador Logístico",
    keywords: ["currículum de Administrador Logístico", "CV de Administrador Logístico", "ejemplo currículum Administrador Logístico", "plantilla CV Administrador Logístico"],
    searchIntents: ["cómo escribir currículum de Administrador Logístico", "ejemplos currículum Administrador Logístico", "mejor formato CV Administrador Logístico"],
    topSkills: ["Gestión de Inventarios", "Coordinación de la Cadena de Suministro", "Optimización Logística", "Análisis de Datos", "Gestión de Proveedores", "Envío y Recepción", "Cumplimiento de Pedidos", "Cumplimiento Regulatorio", "Resolución de Problemas", "Comunicación"],
    atsKeywords: ["Logística", "Cadena de Suministro", "Control de Inventarios", "Gestión de Carga", "Gestión de Transporte", "Operaciones de Almacén", "Reducción de Costos", "Mejora de Procesos", "Sistemas ERP", "Habilidades Analíticas", "Atención al Cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Administrador Logístico",
      summary: "Administrador Logístico dedicado con más de 5 años de experiencia en la optimización de procesos de la cadena de suministro y gestión de niveles de inventario. Reducción exitosa de costos logísticos en un 15% mientras se mejoraron los tiempos de entrega.",
      skills: ["Gestión de Inventarios", "Coordinación de la Cadena de Suministro", "Optimización Logística", "Análisis de Datos", "Gestión de Proveedores", "Envío y Recepción", "Cumplimiento de Pedidos", "Cumplimiento Regulatorio", "Resolución de Problemas", "Comunicación"],
      experience: [
        {
          title: "Administrador Logístico Senior",
          company: "FedEx",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de costos de envío en un 20% mediante negociaciones estratégicas con proveedores.",
            "Mejora de la precisión en el cumplimiento de pedidos al 98% a través de un mejor seguimiento de inventarios.",
            "Implementación de un nuevo software logístico que disminuyó el tiempo de procesamiento en un 30%.",
          ],
        },
        {
          title: "Coordinador Logístico",
          company: "Amazon",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimización de las operaciones de almacén, aumentando la eficiencia en un 25%.",
            "Gestión de un equipo de 10 empleados logísticos, mejorando la productividad del equipo en un 15%.",
            "Desarrollo de un sistema de seguimiento que redujo las discrepancias en los pedidos en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Logística y Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional (CSCP)", issuer: "APICS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Administrador Logístico en su currículum?", answer: "Un Administrador Logístico debe incluir su experiencia en gestión de inventarios, coordinación de la cadena de suministro y logísticas optimizadas." },
      { question: "¿Cómo destacar mi currículum de Administrador Logístico?", answer: "Para destacar su currículum, enfatice sus logros cuantificables y habilidades específicas relacionadas con la logística y la cadena de suministro." },
      { question: "¿Qué habilidades necesita un Administrador Logístico?", answer: "Las habilidades clave incluyen gestión de inventarios, optimización logística, análisis de datos y habilidades de comunicación." },
    ],
  },
  "logistics-assistant": {
    slug: "asistente-de-logistica",
    title: "Asistente de Logística",
    keywords: ["currículum de asistente de logística", "CV de asistente de logística", "ejemplo currículum asistente de logística", "plantilla CV asistente de logística"],
    searchIntents: ["cómo escribir currículum de asistente de logística", "ejemplos currículum asistente de logística", "mejor formato CV asistente de logística"],
    topSkills: ["Gestión de Inventarios", "Coordinación de Cadena de Suministro", "Ingreso de Datos", "Planificación Logística", "Gestión de Proveedores", "Envío y Recepción", "Cumplimiento de Pedidos", "Resolución de Problemas", "Habilidades de Comunicación", "Gestión del Tiempo"],
    atsKeywords: ["logística", "cadena de suministro", "control de inventarios", "envío", "recepción", "gestión de almacenes", "análisis de datos", "servicio al cliente", "transporte", "adquisiciones", "planificación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Logística",
      summary: "Asistente de Logística dedicado con más de 5 años de experiencia en gestión de cadena de suministro y operaciones logísticas, logrando una reducción del 20% en costos de envío y mejorando los tiempos de entrega en un 15%.",
      skills: ["Gestión de Inventarios", "Coordinación de Cadena de Suministro", "Ingreso de Datos", "Planificación Logística", "Gestión de Proveedores", "Envío y Recepción", "Cumplimiento de Pedidos", "Resolución de Problemas", "Habilidades de Comunicación", "Gestión del Tiempo"],
      experience: [
        {
          title: "Coordinador de Logística",
          company: "FedEx",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Optimización de procesos de envío, resultando en un aumento del 25% en entregas a tiempo.",
            "Gestión de niveles de inventario para reducir el stock excesivo en un 30%, optimizando el espacio del almacén.",
            "Colaboración con equipos multifuncionales para mejorar la eficiencia de la cadena de suministro, logrando una reducción de costos del 15%.",
          ],
        },
        {
          title: "Asistente de Logística",
          company: "DHL Supply Chain",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistencia en la implementación de un nuevo sistema de gestión de inventarios que mejoró la precisión en un 40%.",
            "Coordinación con proveedores para asegurar la entrega oportuna de mercancías, mejorando la satisfacción del cliente.",
            "Realización de auditorías regulares de inventario, manteniendo una tasa de discrepancia de menos del 1%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Logística y Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Logistics Associate", issuer: "Manufacturing Skill Standards Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Logística en su currículum?", answer: "Debe incluir experiencia relevante, habilidades específicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Asistente de Logística?", answer: "Utiliza palabras clave del sector, resalta tus logros y personaliza tu CV para cada aplicación." },
      { question: "¿Qué habilidades necesita un Asistente de Logística?", answer: "Habilidades en gestión de inventarios, planificación logística, comunicación efectiva y resolución de problemas." },
    ],
  },
  "logistics-associate": {
    slug: "asociado-logistico",
    title: "Asociado Logístico",
    keywords: ["currículum de Asociado Logístico", "CV de Asociado Logístico", "ejemplo currículum Asociado Logístico", "plantilla CV Asociado Logístico"],
    searchIntents: ["cómo escribir currículum de Asociado Logístico", "ejemplos currículum Asociado Logístico", "mejor formato CV Asociado Logístico"],
    topSkills: ["Gestión de Inventarios", "Coordinación de la Cadena de Suministro", "Cumplimiento de Pedidos", "Planificación Logística", "Análisis de Datos", "Gestión de Almacenes", "Envíos y Recepciones", "Atención al Cliente", "Resolución de Problemas", "Gestión del Tiempo"],
    atsKeywords: ["logística", "cadena de suministro", "control de inventario", "envío", "recepción", "transporte", "operaciones de almacén", "procesamiento de pedidos", "entrada de datos", "gestión logística", "aseguramiento de calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado Logístico",
      summary: "Asociado Logístico dedicado con más de 5 años de experiencia en la gestión de la cadena de suministro, logrando una reducción del 20% en costos de envío a través de la optimización de procesos.",
      skills: ["Gestión de Inventarios", "Coordinación de la Cadena de Suministro", "Cumplimiento de Pedidos", "Planificación Logística", "Análisis de Datos", "Gestión de Almacenes", "Envíos y Recepciones", "Atención al Cliente", "Resolución de Problemas", "Gestión del Tiempo"],
      experience: [
        {
          title: "Asociado Logístico Senior",
          company: "FedEx",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de errores de envío en un 30% mediante sistemas de seguimiento mejorados",
            "Gestión de la logística para más de 10,000 envíos por mes, asegurando entregas a tiempo",
            "Implementación de un nuevo sistema de gestión de inventarios que aumentó la precisión en un 25%",
          ],
        },
        {
          title: "Coordinador Logístico",
          company: "Amazon",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordinación de la logística para operaciones de cumplimiento de alto volumen, mejorando los tiempos de entrega en un 15%",
            "Desarrollo y ejecución de planes de rutas eficientes que redujeron los costos de transporte en un 10%",
            "Capacitación y supervisión de un equipo de 5 nuevos asociados logísticos, mejorando el rendimiento del equipo",
          ],
        },
      ],
      education: [
        { institution: "University of Logistics", degree: "Licenciatura", field: "Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional (CSCP)", issuer: "APICS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Logistics Associate en su currículum?", answer: "Un Logistics Associate debe incluir su experiencia en gestión de inventarios, coordinación de la cadena de suministro y habilidades en atención al cliente." },
      { question: "¿Cómo destacar mi currículum de Logistics Associate?", answer: "Para destacar su currículum, incluya logros cuantificables y habilidades específicas relacionadas con la logística." },
      { question: "¿Qué habilidades necesita un Logistics Associate?", answer: "Las habilidades clave incluyen gestión de inventarios, planificación logística, atención al cliente y resolución de problemas." },
    ],
  },
  "logistics-coordinator-at-wipro": {
    slug: "coordinador-logistico",
    title: "Coordinador Logístico",
    keywords: ["currículum de Coordinador Logístico", "CV de Coordinador Logístico", "ejemplo currículum Coordinador Logístico", "plantilla CV Coordinador Logístico"],
    searchIntents: ["cómo escribir currículum de Coordinador Logístico", "ejemplos currículum Coordinador Logístico", "mejor formato CV Coordinador Logístico"],
    topSkills: ["Gestión de la Cadena de Suministro", "Control de Inventarios", "Adquisiciones", "Envío y Recepción", "Análisis de Datos", "Gestión de Proyectos", "Coordinación Logística", "Atención al Cliente", "Mejora de Procesos", "Gestión de Proveedores"],
    atsKeywords: ["logística", "cadena de suministro", "inventario", "envío", "transporte", "adquisiciones", "almacén", "análisis de datos", "atención al cliente", "gestión de proyectos", "gestión de proveedores"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Coordinador Logístico",
      summary: "Coordinador Logístico dedicado con más de 5 años de experiencia en gestión de la cadena de suministro, logrando una reducción del 20% en costos de envío y mejorando los tiempos de entrega en un 15%. Historial comprobado de optimización de procesos logísticos para la eficiencia.",
      skills: ["Gestión de la Cadena de Suministro", "Control de Inventarios", "Adquisiciones", "Envío y Recepción", "Análisis de Datos", "Gestión de Proyectos", "Coordinación Logística", "Atención al Cliente", "Mejora de Procesos", "Gestión de Proveedores"],
      experience: [
        {
          title: "Coordinador Logístico Senior",
          company: "DHL Supply Chain",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Optimización de operaciones logísticas que resultó en un aumento del 25% en la eficiencia de cumplimiento de pedidos",
            "Gestión de un presupuesto de $500,000 y reducción de costos en un 15% a través de negociaciones efectivas con proveedores",
            "Lideré un proyecto que mejoró los tiempos de entrega en un 20% en múltiples regiones",
          ],
        },
        {
          title: "Coordinador Logístico",
          company: "FedEx",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordiné envíos para más de 100 clientes, asegurando entregas a tiempo y calificaciones de satisfacción superiores al 95%",
            "Implementé un nuevo sistema de seguimiento de inventarios que redujo discrepancias en un 30%",
            "Analicé datos de envío para identificar tendencias y reducir costos en un 10%",
          ],
        },
      ],
      education: [
        { institution: "University of Illinois", degree: "B.S.", field: "Logística y Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional (CSCP)", issuer: "APICS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Coordinador Logístico en su currículum?", answer: "Un Coordinador Logístico debe incluir experiencia relevante, habilidades técnicas en gestión de la cadena de suministro, y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Coordinador Logístico?", answer: "Utiliza palabras clave de la industria, resalta logros significativos y personaliza tu currículum para cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Coordinador Logístico?", answer: "Habilidades clave incluyen gestión de la cadena de suministro, control de inventarios, y atención al cliente." },
    ],
  },
  "logistics-import-export-specialist": {
    slug: "especialista-en-logistica-importacion-exportacion",
    title: "Especialista en Logística de Importación y Exportación",
    keywords: ["currículum de especialista en logística de importación y exportación", "CV de especialista en logística", "ejemplo currículum especialista en logística", "plantilla CV especialista en logística"],
    searchIntents: ["cómo escribir currículum de especialista en logística de importación y exportación", "ejemplos currículum especialista en logística", "mejor formato CV especialista en logística"],
    topSkills: ["Gestión de la Cadena de Suministro", "Regulaciones Aduaneras", "Documentación de Importación/Exportación", "Transporte de Carga", "Coordinación Logística", "Gestión de Inventarios", "Habilidades de Negociación", "Análisis de Datos", "Resolución de Problemas", "Cumplimiento Regulatorio"],
    atsKeywords: ["Logística", "Importación", "Exportación", "Aduanas", "Carga", "Cadena de Suministro", "Documentación", "Coordinación", "Inventario", "Regulaciones", "Cumplimiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Logística de Importación y Exportación",
      summary: "Especialista en Logística de Importación y Exportación dedicado con más de 5 años de experiencia en la gestión de envíos internacionales y asegurando el cumplimiento de las regulaciones aduaneras. Reduje con éxito los costos de envío en un 15% mediante negociaciones estratégicas con proveedores.",
      skills: ["Gestión de la Cadena de Suministro", "Regulaciones Aduaneras", "Documentación de Importación/Exportación", "Transporte de Carga", "Coordinación Logística", "Gestión de Inventarios", "Habilidades de Negociación", "Análisis de Datos", "Resolución de Problemas", "Cumplimiento Regulatorio"],
      experience: [
        {
          title: "Especialista en Logística Senior",
          company: "DHL Supply Chain",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los retrasos en envíos en un 25% mediante sistemas de seguimiento mejorados.",
            "Aumenté la tasa de entrega puntual al 98% al optimizar los procesos logísticos.",
            "Gestioné un presupuesto de $1.5 millones, logrando un ahorro de costos de $200,000 anualmente.",
          ],
        },
        {
          title: "Coordinador Logístico",
          company: "FedEx Trade Networks",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordiné con éxito más de 500 envíos internacionales por año.",
            "Lideré un proyecto que mejoró la precisión de la documentación en un 40%.",
            "Capacité a 10 nuevos miembros del personal en procedimientos de importación/exportación.",
          ],
        },
      ],
      education: [
        { institution: "University of Logistics", degree: "B.S.", field: "Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified International Trade Professional", issuer: "Global Trade Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Logistics Import Export Specialist en su currículum?", answer: "Un especialista en logística de importación y exportación debe incluir su experiencia en gestión de envíos, cumplimiento regulatorio y habilidades de negociación." },
      { question: "¿Cómo destacar mi currículum de Logistics Import Export Specialist?", answer: "Para destacar su currículum, enfatice sus logros cuantificables y habilidades clave en logística y comercio internacional." },
      { question: "¿Qué habilidades necesita un Logistics Import Export Specialist?", answer: "Las habilidades clave incluyen gestión de la cadena de suministro, regulaciones aduaneras, y capacidad de negociación." },
    ],
  },
  "logistics-management-specialist": {
    slug: "especialista-en-gestion-logistica",
    title: "Especialista en Gestión Logística",
    keywords: ["currículum de especialista en gestión logística", "CV de especialista en gestión logística", "ejemplo currículum especialista en gestión logística", "plantilla CV especialista en gestión logística"],
    searchIntents: ["cómo escribir currículum de especialista en gestión logística", "ejemplos currículum especialista en gestión logística", "mejor formato CV especialista en gestión logística"],
    topSkills: ["Gestión de la cadena de suministro", "Control de inventarios", "Optimización logística", "Reducción de costos", "Análisis de datos", "Gestión de proyectos", "Negociación con proveedores", "Gestión de transporte", "Mejora de procesos", "Gestión de cumplimiento"],
    atsKeywords: ["logística", "cadena de suministro", "inventario", "transporte", "almacenamiento", "envío", "operaciones", "adquisiciones", "análisis de costos", "gestión de datos", "coordinación de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Gestión Logística",
      summary: "Especialista en Gestión Logística dedicado con más de 5 años de experiencia en la optimización de operaciones de la cadena de suministro, resultando en una reducción del 20% en los costos logísticos y mejorando los tiempos de entrega en un 30%.",
      skills: ["Gestión de la cadena de suministro", "Control de inventarios", "Optimización logística", "Reducción de costos", "Análisis de datos", "Gestión de proyectos", "Negociación con proveedores", "Gestión de transporte", "Mejora de procesos", "Gestión de cumplimiento"],
      experience: [
        {
          title: "Analista Logístico Senior",
          company: "FedEx",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo sistema de seguimiento de inventarios, resultando en una disminución del 35% en las discrepancias de stock.",
            "Lideré un proyecto que redujo los costos de envío en $150,000 anuales mediante la renegociación con proveedores.",
            "Mejoré los procesos de entrega, logrando un aumento del 20% en las entregas a tiempo.",
          ],
        },
        {
          title: "Coordinador Logístico",
          company: "Amazon",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordiné la logística de más de 500 envíos por semana, asegurando entregas a tiempo.",
            "Optimicé las operaciones del almacén, reduciendo el tiempo de procesamiento de pedidos en un 25%.",
            "Desarrollé programas de capacitación para nuevos empleados, mejorando la eficiencia del equipo en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "University of California", degree: "Licenciatura", field: "Logística y Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional", issuer: "APICS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un especialista en gestión logística en su currículum?", answer: "Debe incluir sus habilidades en gestión de la cadena de suministro, experiencia laboral relevante y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de especialista en gestión logística?", answer: "Utilice palabras clave relevantes y destaque sus logros más significativos." },
      { question: "¿Qué habilidades necesita un especialista en gestión logística?", answer: "Necesita habilidades en gestión de inventarios, optimización de procesos y análisis de datos." },
    ],
  },
  "machinery-machine-operator": {
    slug: "operador-de-maquinaria",
    title: "Operador de Maquinaria",
    keywords: ["currículum de operador de maquinaria", "CV de operador de maquinaria", "ejemplo currículum operador de maquinaria", "plantilla CV operador de maquinaria"],
    searchIntents: ["cómo escribir currículum de operador de maquinaria", "ejemplos currículum operador de maquinaria", "mejor formato CV operador de maquinaria"],
    topSkills: ["Operación de Maquinaria", "Control de Calidad", "Solución de Problemas Mecánicos", "Cumplimiento de Seguridad", "Mantenimiento Preventivo", "Documentación Técnica", "Eficiencia en la Producción", "Optimización de Procesos", "Colaboración en Equipo", "Calibración de Equipos"],
    atsKeywords: ["operación de máquinas", "maquinado CNC", "maquinaria de producción", "aseguramiento de calidad", "procedimientos de seguridad", "habilidades de mantenimiento", "procedimientos operativos", "manejo de equipos", "maquinaria industrial", "manufactura esbelta", "configuración de máquinas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Operador de Maquinaria",
      summary: "Operador de Maquinaria detallista con más de 5 años de experiencia en la operación y mantenimiento de máquinas industriales. Logré un aumento del 15% en la eficiencia de producción a través de una calibración efectiva de las máquinas y mantenimiento preventivo.",
      skills: ["Operación de Maquinaria", "Control de Calidad", "Solución de Problemas Mecánicos", "Cumplimiento de Seguridad", "Mantenimiento Preventivo", "Documentación Técnica", "Eficiencia en la Producción", "Optimización de Procesos", "Colaboración en Equipo", "Calibración de Equipos"],
      experience: [
        {
          title: "Operador de Maquinaria Senior",
          company: "General Electric",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré la velocidad de la línea de producción en un 20% a través de una configuración y operación optimizada de las máquinas.",
            "Reduje el tiempo de inactividad del equipo en un 30% al implementar un nuevo programa de mantenimiento preventivo.",
            "Capacité a 5 nuevos operadores sobre seguridad de maquinaria y protocolos operativos, mejorando la eficiencia del equipo.",
          ],
        },
        {
          title: "Operador de Maquinaria",
          company: "Caterpillar Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cumplí consistentemente con los objetivos de producción, promediando 150 unidades por turno.",
            "Contribuí a una reducción del 10% en materiales desperdiciados a través de iniciativas de mejora de procesos.",
            "Participé en auditorías de seguridad, resultando en una tasa de cumplimiento del 100%.",
          ],
        },
      ],
      education: [
        { institution: "Tech University", degree: "B.S.", field: "Tecnología Industrial", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Machine Operator", issuer: "National Institute for Metalworking Skills", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un operador de maquinaria en su currículum?", answer: "Un operador de maquinaria debe incluir experiencia laboral relevante, habilidades técnicas específicas, certificaciones y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de operador de maquinaria?", answer: "Utiliza palabras clave relevantes, resalta tus logros y asegúrate de que tu formato sea claro y profesional." },
      { question: "¿Qué habilidades necesita un operador de maquinaria?", answer: "Habilidades clave incluyen operación de maquinaria, control de calidad, solución de problemas mecánicos, y cumplimiento de normas de seguridad." },
    ],
  },
  "meals-on-wheels-driver": {
    slug: "conductor-de-meals-on-wheels",
    title: "Conductor de Meals On Wheels",
    keywords: ["currículum de conductor de Meals On Wheels", "CV de conductor de Meals On Wheels", "ejemplo currículum conductor de Meals On Wheels", "plantilla CV conductor de Meals On Wheels"],
    searchIntents: ["cómo escribir currículum de conductor de Meals On Wheels", "ejemplos currículum conductor de Meals On Wheels", "mejor formato CV conductor de Meals On Wheels"],
    topSkills: ["conducción segura", "servicio al cliente", "gestión del tiempo", "comunicación", "resolución de problemas", "planificación de rutas", "manejo de alimentos", "trabajo en equipo", "compasión", "atención al detalle"],
    atsKeywords: ["conductor de entrega", "meals on wheels", "transporte", "satisfacción del cliente", "protocolos de seguridad", "logística", "preparación de comidas", "eficiencia en el tiempo", "optimización de rutas", "servicio comunitario", "interacción con clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Conductor de Meals On Wheels",
      summary: "Conductor de Meals On Wheels dedicado con más de 5 años de experiencia en la entrega de comidas nutritivas a los clientes, asegurando altos niveles de satisfacción del cliente. Aumenté con éxito la eficiencia de entrega en un 20% a través de una planificación de rutas optimizada.",
      skills: ["conducción segura", "servicio al cliente", "gestión del tiempo", "comunicación", "resolución de problemas", "planificación de rutas", "manejo de alimentos", "trabajo en equipo", "compasión", "atención al detalle"],
      experience: [
        {
          title: "Conductor Senior de Meals On Wheels",
          company: "Community Care Services",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré la eficiencia de entrega en un 20% a través de una planificación de rutas efectiva.",
            "Logré una calificación de satisfacción del cliente del 95% basada en comentarios de clientes.",
            "Capacité a 5 nuevos conductores en protocolos de seguridad y mejores prácticas de servicio al cliente.",
          ],
        },
        {
          title: "Conductor de Meals On Wheels",
          company: "Senior Nutrition Program",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Entregué más de 10,000 comidas con un 99% de puntualidad.",
            "Establecí relaciones positivas con los clientes, lo que resultó en un aumento del 15% en la inscripción al programa.",
            "Implementé un sistema de retroalimentación que mejoró la calidad del servicio.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Nutrición y Dietética", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "CPR and First Aid Certification", issuer: "American Red Cross", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Meals On Wheels Driver en su currículum?", answer: "Incluir experiencia en entrega de comidas, habilidades de servicio al cliente y manejo de alimentos." },
      { question: "¿Cómo destacar mi currículum de Meals On Wheels Driver?", answer: "Resaltar logros específicos y habilidades relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Meals On Wheels Driver?", answer: "Conducción segura, servicio al cliente, y capacidad para manejar múltiples tareas." },
    ],
  },
  "production-worker": {
    slug: "trabajador-de-produccion",
    title: "Trabajador de Producción",
    keywords: ["currículum de trabajador de producción", "CV de trabajador de producción", "ejemplo currículum trabajador de producción", "plantilla CV trabajador de producción"],
    searchIntents: ["cómo escribir currículum de trabajador de producción", "ejemplos currículum trabajador de producción", "mejor formato CV trabajador de producción"],
    topSkills: ["Operación de Línea de Ensamblaje", "Control de Calidad", "Operación de Maquinaria", "Gestión de Inventarios", "Cumplimiento de Seguridad", "Embalaje", "Colaboración en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle"],
    atsKeywords: ["manufactura", "producción", "ensamblaje", "operación de equipos", "procedimientos de seguridad", "aseguramiento de calidad", "trabajo en equipo", "mejora de procesos", "logística", "productividad", "mantenimiento de maquinaria"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador de Producción",
      summary: "Trabajador de Producción dedicado con más de 5 años de experiencia en entornos de manufactura de ritmo acelerado. Historial comprobado de mejora de la eficiencia de producción en un 20% y reducción de desechos en un 15%.",
      skills: ["Operación de Línea de Ensamblaje", "Control de Calidad", "Operación de Maquinaria", "Gestión de Inventarios", "Cumplimiento de Seguridad", "Embalaje", "Colaboración en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle"],
      experience: [
        {
          title: "Trabajador de Producción Líder",
          company: "Acme Manufacturing",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de producción en un 25% a través de la optimización del flujo de trabajo.",
            "Entrené a 10 nuevos empleados sobre procedimientos de seguridad y operación.",
            "Reduje el desperdicio de material en un 18%, ahorrando a la empresa $30,000 anuales.",
          ],
        },
        {
          title: "Trabajador de Producción",
          company: "Global Tech Industries",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cumplí o superé consistentemente los objetivos de producción diarios en un 15%.",
            "Implementé un nuevo sistema de seguimiento de inventario que disminuyó errores en un 10%.",
            "Participé en equipos multifuncionales para mejorar la calidad del producto.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Tecnología Industrial", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Production Technician", issuer: "Manufacturing Skills Standards Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Trabajador de Producción en su currículum?", answer: "Debe incluir su experiencia laboral relevante, habilidades técnicas y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Trabajador de Producción?", answer: "Enfatizando logros cuantificables y habilidades específicas para el trabajo." },
      { question: "¿Qué habilidades necesita un Trabajador de Producción?", answer: "Habilidades en operación de maquinaria, control de calidad y trabajo en equipo." },
    ],
  },
  "school-bus-driver": {
    slug: "conductor-de-autobus-escolar",
    title: "Conductor de Autobús Escolar",
    keywords: ["currículum de conductor de autobús escolar", "CV de conductor de autobús escolar", "ejemplo currículum conductor de autobús escolar", "plantilla CV conductor de autobús escolar"],
    searchIntents: ["cómo escribir currículum de conductor de autobús escolar", "ejemplos currículum conductor de autobús escolar", "mejor formato CV conductor de autobús escolar"],
    topSkills: ["Gestión de Seguridad", "Planificación de Rutas", "Interacción con Estudiantes", "Reglamentos de Tráfico", "Respuesta a Emergencias", "Mantenimiento de Vehículos", "Gestión del Tiempo", "Comunicación", "Atención al Detalle", "Resolución de Problemas"],
    atsKeywords: ["conductor de autobús", "transporte escolar", "seguridad infantil", "conducción defensiva", "primeros auxilios", "reglamentos de transporte", "inspección de vehículos", "optimización de rutas", "asistencia a pasajeros", "protocolos de seguridad", "servicio al cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Conductor de Autobús Escolar",
      summary: "Conductor de Autobús Escolar dedicado con más de 5 años de experiencia asegurando la seguridad y comodidad de los estudiantes durante el transporte. Gestionó con éxito rutas con un 98% de puntualidad y mantuvo un historial de conducción limpio.",
      skills: ["Gestión de Seguridad", "Planificación de Rutas", "Interacción con Estudiantes", "Reglamentos de Tráfico", "Respuesta a Emergencias", "Mantenimiento de Vehículos", "Gestión del Tiempo", "Comunicación", "Atención al Detalle", "Resolución de Problemas"],
      experience: [
        {
          title: "Conductor de Autobús Escolar Senior",
          company: "Green Valley School District",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré un 99% de satisfacción de padres y estudiantes",
            "Transporte exitoso de más de 200 estudiantes diariamente sin incidentes reportados",
            "Implementé un nuevo plan de ruta que redujo el tiempo de viaje en un 15%",
          ],
        },
        {
          title: "Conductor de Autobús Escolar",
          company: "Sunnydale Academy",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve un historial de conducción impecable durante 3 años",
            "Participé en sesiones de capacitación en seguridad, resultando en una reducción del 30% en incidentes menores",
            "Asistí en la capacitación de nuevos conductores sobre protocolos de seguridad",
          ],
        },
      ],
      education: [
        { institution: "Community College", degree: "A.A.", field: "Gestión de Transporte", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Commercial Driver's License (CDL)", issuer: "State Department of Motor Vehicles", date: "2020-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un conductor de autobús escolar en su currículum?", answer: "Debe incluir su experiencia en conducción, habilidades en seguridad, y cualquier capacitación relacionada." },
      { question: "¿Cómo destacar mi currículum de conductor de autobús escolar?", answer: "Enfatiza tus logros en seguridad y puntualidad, así como cualquier capacitación adicional que hayas completado." },
      { question: "¿Qué habilidades necesita un conductor de autobús escolar?", answer: "Habilidades clave incluyen gestión de seguridad, planificación de rutas y excelente comunicación con estudiantes y padres." },
    ],
  },
  "senior-maintenance-manager": {
    slug: "gerente-de-mantenimiento-senior",
    title: "Gerente de Mantenimiento Senior",
    keywords: ["currículum de gerente de mantenimiento senior", "CV de gerente de mantenimiento senior", "ejemplo currículum gerente de mantenimiento senior", "plantilla CV gerente de mantenimiento senior"],
    searchIntents: ["cómo escribir currículum de gerente de mantenimiento senior", "ejemplos currículum gerente de mantenimiento senior", "mejor formato CV gerente de mantenimiento senior"],
    topSkills: ["Mantenimiento Preventivo", "Liderazgo de Equipo", "Gestión de Presupuesto", "Cumplimiento de Seguridad", "Gestión de Proyectos", "Reparación de Equipos", "Gestión de Proveedores", "Mejora de Procesos", "Resolución Técnica de Problemas", "Gestión de Activos"],
    atsKeywords: ["gestión de mantenimiento", "liderazgo de equipo", "presupuestación", "mantenimiento preventivo", "regulaciones de seguridad", "mantenimiento de equipos", "habilidades técnicas", "relaciones con proveedores", "supervisión de proyectos", "resolución de problemas", "optimización de activos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Mantenimiento Senior",
      summary: "Gerente de Mantenimiento Senior con más de 10 años de experiencia en gestión de instalaciones y un historial comprobado de reducción de costos de mantenimiento en un 20% mientras se mejora la eficiencia operativa.",
      skills: ["Mantenimiento Preventivo", "Liderazgo de Equipo", "Gestión de Presupuesto", "Cumplimiento de Seguridad", "Gestión de Proyectos", "Reparación de Equipos", "Gestión de Proveedores", "Mejora de Procesos", "Resolución Técnica de Problemas", "Gestión de Activos"],
      experience: [
        {
          title: "Gerente de Mantenimiento Senior",
          company: "Global Manufacturing Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de costos de mantenimiento en un 20% a través de negociaciones estratégicas con proveedores y mejoras en procesos.",
            "Aumento de la productividad del equipo en un 30% mediante la implementación de un sistema de programación de mantenimiento optimizado.",
            "Logro de una tasa de disponibilidad de equipos del 95%, contribuyendo a la eficiencia operativa general.",
          ],
        },
        {
          title: "Supervisor de Mantenimiento",
          company: "ABC Logistics",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Lideré un equipo de 12 técnicos, logrando una reducción del 15% en costos de horas extras.",
            "Implementé un nuevo sistema de gestión de inventario que disminuyó el tiempo de adquisición de piezas en un 25%.",
            "Desarrollé programas de capacitación que mejoraron los puntajes de cumplimiento de seguridad del equipo en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Maintenance Manager (CMM)", issuer: "National Institute for Certification in Engineering Technologies", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Senior Maintenance Manager en su currículum?", answer: "Un Senior Maintenance Manager debe destacar su experiencia en gestión de mantenimiento, liderazgo de equipo, y habilidades técnicas relevantes." },
      { question: "¿Cómo destacar mi currículum de Senior Maintenance Manager?", answer: "Es importante incluir logros cuantificables, habilidades relevantes y una clara trayectoria profesional en el campo." },
      { question: "¿Qué habilidades necesita un Senior Maintenance Manager?", answer: "Las habilidades clave incluyen liderazgo, gestión de presupuesto, mantenimiento preventivo, y resolución de problemas técnicos." },
    ],
  },
  "senior-mechanical-engineer-honeywell-aerospace": {
    slug: "ingeniero-mecanico-senior",
    title: "Ingeniero Mecánico Senior",
    keywords: ["currículum de ingeniero mecánico senior", "CV de ingeniero mecánico senior", "ejemplo currículum ingeniero mecánico senior", "plantilla CV ingeniero mecánico senior"],
    searchIntents: ["cómo escribir currículum de ingeniero mecánico senior", "ejemplos currículum ingeniero mecánico senior", "mejor formato CV ingeniero mecánico senior"],
    topSkills: ["Análisis Térmico", "Dinámica de Fluidos", "Software CAD (SolidWorks, AutoCAD)", "Ciencia de Materiales", "Gestión de Proyectos", "Optimización de Diseño", "Ingeniería de Sistemas", "Prototipado", "Análisis por Elementos Finitos (FEA)", "Procesos de Fabricación"],
    atsKeywords: ["diseño mecánico", "ingeniería aeroespacial", "gestión térmica", "análisis estructural", "pruebas de cumplimiento", "integración de sistemas", "análisis de causa raíz", "validación de diseño", "documentación técnica", "liderazgo de equipo", "normas regulatorias"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero Mecánico Senior",
      summary: "Ingeniero Mecánico Senior con más de 8 años de experiencia en aplicaciones aeroespaciales, especializado en sistemas de gestión térmica, logrando reducir los costos del proyecto en un 20% a través de soluciones de diseño innovadoras.",
      skills: ["Análisis Térmico", "Dinámica de Fluidos", "Software CAD (SolidWorks, AutoCAD)", "Ciencia de Materiales", "Gestión de Proyectos", "Optimización de Diseño", "Ingeniería de Sistemas", "Prototipado", "Análisis por Elementos Finitos (FEA)", "Procesos de Fabricación"],
      experience: [
        {
          title: "Ingeniero Mecánico Senior",
          company: "Honeywell Aerospace",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo para diseñar un nuevo sistema de gestión térmica, reduciendo el peso en un 15% y los costos en $500,000.",
            "Implementé técnicas de FEA que mejoraron la integridad estructural en un 25%.",
            "Optimicé los flujos de trabajo del proyecto, resultando en una reducción del 30% en los tiempos de entrega del proyecto.",
          ],
        },
        {
          title: "Ingeniero Mecánico",
          company: "Boeing",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé modelos CAD avanzados para nuevos componentes de aeronaves, mejorando el rendimiento en un 10%.",
            "Realicé análisis de causa raíz para problemas de producción, lo que llevó a una disminución del 40% en defectos.",
            "Colaboré con equipos multifuncionales para asegurar el cumplimiento de las normas aeroespaciales.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Mecánica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Manufacturing Engineer", issuer: "Society of Manufacturing Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero Mecánico Senior en su currículum?", answer: "El currículum debe incluir experiencia relevante, habilidades técnicas, logros cuantificables y educación pertinente." },
      { question: "¿Cómo destacar mi currículum de Ingeniero Mecánico Senior?", answer: "Asegúrate de resaltar tus logros y utiliza palabras clave relacionadas con la ingeniería mecánica y aeroespacial." },
      { question: "¿Qué habilidades necesita un Ingeniero Mecánico Senior?", answer: "Se requieren habilidades en análisis térmico, diseño CAD, gestión de proyectos y conocimiento en materiales y procesos de fabricación." },
    ],
  },
  "shelf-stocker": {
    slug: "empleo-reponedor",
    title: "Reponedor de Estantes",
    keywords: ["currículum de reponedor", "CV de reponedor", "ejemplo currículum reponedor", "plantilla CV reponedor"],
    searchIntents: ["cómo escribir currículum de reponedor", "ejemplos currículum reponedor", "mejor formato CV reponedor"],
    topSkills: ["Gestión de Inventarios", "Merchandising de Productos", "Atención al Cliente", "Atención al Detalle", "Gestión del Tiempo", "Comunicación", "Colaboración en Equipo", "Resolución de Problemas", "Adaptabilidad", "Resistencia Física"],
    atsKeywords: ["reposición", "inventario", "mercancía", "atención al cliente", "organización", "trabajo en equipo", "protocolos de seguridad", "conocimiento de productos", "estanterías", "logística", "venta al por menor"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Reponedor de Estantes",
      summary: "Reponedor de Estantes dedicado con más de 4 años de experiencia en entornos minoristas, logrando consistentemente una reducción del 15% en el tiempo de reposición a través de una gestión eficiente del inventario.",
      skills: ["Gestión de Inventarios", "Merchandising de Productos", "Atención al Cliente", "Atención al Detalle", "Gestión del Tiempo", "Comunicación", "Colaboración en Equipo", "Resolución de Problemas", "Adaptabilidad", "Resistencia Física"],
      experience: [
        {
          title: "Reponedor de Estantes Senior",
          company: "Walmart",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje el tiempo de reposición en un 20% a través de un diseño optimizado de estantes y seguimiento de inventario.",
            "Aumenté las puntuaciones de satisfacción del cliente en un 15% al asegurar la disponibilidad y organización de productos.",
            "Entrené a 5 nuevos miembros del personal en los procedimientos de reposición y protocolos de seguridad.",
          ],
        },
        {
          title: "Reponedor de Estantes",
          company: "Target",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve con éxito la precisión del inventario en un 98% a través de un monitoreo y reporte diligentes.",
            "Asistí en los esfuerzos de merchandising que llevaron a un aumento del 10% en las ventas de productos estacionales.",
            "Implementé un nuevo sistema de etiquetado que disminuyó el tiempo de recuperación de artículos en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Bachillerato", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Management Professional", issuer: "Retail Certification Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Reponedor de Estantes en su currículum?", answer: "Incluya experiencia relevante, habilidades específicas de la industria y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Reponedor de Estantes?", answer: "Use palabras clave de la industria y destaque sus logros en la gestión de inventarios y atención al cliente." },
      { question: "¿Qué habilidades necesita un Reponedor de Estantes?", answer: "Las habilidades clave incluyen gestión de inventarios, atención al detalle y capacidad para trabajar en equipo." },
    ],
  },
  "shipping-and-receiving-staff-member": {
    slug: "personal-de-envio-y-recepcion",
    title: "Personal de Envío y Recepción",
    keywords: ["currículum de Personal de Envío y Recepción", "CV de Personal de Envío y Recepción", "ejemplo currículum Personal de Envío y Recepción", "plantilla CV Personal de Envío y Recepción"],
    searchIntents: ["cómo escribir currículum de Personal de Envío y Recepción", "ejemplos currículum Personal de Envío y Recepción", "mejor formato CV Personal de Envío y Recepción"],
    topSkills: ["Gestión de Inventario", "Procesamiento de Pedidos", "Operación de Montacargas", "Logística de Envíos", "Inspección de Recepciones", "Entrada de Datos", "Organización de Almacenes", "Colaboración en Equipo", "Resolución de Problemas", "Gestión del Tiempo"],
    atsKeywords: ["envío", "recepción", "logística", "inventario", "almacén", "montacargas", "cumplimiento de pedidos", "cadena de suministro", "empaquetado", "servicio al cliente", "protocolos de seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Personal de Envío y Recepción",
      summary: "Personal de Envío y Recepción dedicado con más de 5 años de experiencia en gestión de inventarios y logística. Historial comprobado de mejora de la eficiencia de envío en un 20% y reducción de errores de recepción en un 15%.",
      skills: ["Gestión de Inventario", "Procesamiento de Pedidos", "Operación de Montacargas", "Logística de Envíos", "Inspección de Recepciones", "Entrada de Datos", "Organización de Almacenes", "Colaboración en Equipo", "Resolución de Problemas", "Gestión del Tiempo"],
      experience: [
        {
          title: "Supervisor de Envíos",
          company: "Global Logistics Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo sistema de seguimiento de inventario que redujo las discrepancias en un 30%",
            "Gestioné un equipo de 10 miembros, mejorando la eficiencia general de envío en un 25%",
            "Coordiné con proveedores para agilizar los procesos de recepción, resultando en una reducción del 15% en el tiempo de entrega",
          ],
        },
        {
          title: "Asociado de Almacén",
          company: "Quick Ship Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Procesé un promedio de 200 pedidos por día con una tasa de precisión del 99%",
            "Capacité a nuevos empleados en los procedimientos de envío y recepción, mejorando la productividad del equipo",
            "Asistí en auditorías de inventario que identificaron más de $50,000 en inventario extraviado",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Forklift Operator", issuer: "National Safety Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Personal de Envío y Recepción en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Personal de Envío y Recepción?", answer: "Resaltando logros específicos y habilidades clave en el área de logística." },
      { question: "¿Qué habilidades necesita un Personal de Envío y Recepción?", answer: "Habilidades en gestión de inventario, operación de montacargas y logística." },
    ],
  },
  "supply-chain-coordinator-technipfmc": {
    slug: "coordinador-de-cadena-de-suministro",
    title: "Coordinador de Cadena de Suministro",
    keywords: ["currículum de Coordinador de Cadena de Suministro", "CV de Coordinador de Cadena de Suministro", "ejemplo currículum Coordinador de Cadena de Suministro", "plantilla CV Coordinador de Cadena de Suministro"],
    searchIntents: ["cómo escribir currículum de Coordinador de Cadena de Suministro", "ejemplos currículum Coordinador de Cadena de Suministro", "mejor formato CV Coordinador de Cadena de Suministro"],
    topSkills: ["Gestión de Inventarios", "Coordinación Logística", "Relaciones con Proveedores", "Análisis de Datos", "Pronóstico de Demanda", "Optimización de Procesos", "Estrategia de Cadena de Suministro", "Reducción de Costos", "Gestión de Proyectos", "Expertise en Software ERP"],
    atsKeywords: ["gestión de cadena de suministro", "logística", "control de inventarios", "adquisiciones", "pronósticos", "gestión de proveedores", "procesamiento de pedidos", "análisis de datos", "análisis de costos", "colaboración interfuncional", "mejora continua"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Coordinador de Cadena de Suministro",
      summary: "Coordinador de Cadena de Suministro orientado a resultados con más de 5 años de experiencia en la optimización de procesos logísticos y de gestión de inventarios, logrando una reducción del 20% en costos a través de negociaciones estratégicas con proveedores.",
      skills: ["Gestión de Inventarios", "Coordinación Logística", "Relaciones con Proveedores", "Análisis de Datos", "Pronóstico de Demanda", "Optimización de Procesos", "Estrategia de Cadena de Suministro", "Reducción de Costos", "Gestión de Proyectos", "Expertise en Software ERP"],
      experience: [
        {
          title: "Coordinador Senior de Cadena de Suministro",
          company: "Amazon",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de costos de la cadena de suministro en un 15% mediante mejoras en los procesos y adquisiciones estratégicas.",
            "Lideré un equipo que mejoró la eficiencia en el cumplimiento de pedidos en un 30%, aumentando la satisfacción del cliente.",
            "Implementé un nuevo sistema de seguimiento de inventarios que disminuyó las discrepancias de stock en un 40%.",
          ],
        },
        {
          title: "Analista de Cadena de Suministro",
          company: "Procter & Gamble",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé análisis de datos que identificaron $500,000 en ahorros potenciales en logística.",
            "Colaboré con equipos interfuncionales para agilizar los procesos de adquisiciones, reduciendo los tiempos de entrega en un 25%.",
            "Desarrollé modelos de pronóstico que mejoraron la precisión en la planificación de la demanda en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional (CSCP)", issuer: "APICS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Supply Chain Coordinator en su currículum?", answer: "Debe incluir experiencias relevantes en gestión de inventarios, coordinación logística y relaciones con proveedores." },
      { question: "¿Cómo destacar mi currículum de Supply Chain Coordinator?", answer: "Enfatiza logros cuantificables y habilidades clave relacionadas con la cadena de suministro." },
      { question: "¿Qué habilidades necesita un Supply Chain Coordinator?", answer: "Las habilidades clave incluyen gestión de inventarios, análisis de datos y optimización de procesos." },
    ],
  },
  "supply-chain-delivery-management-professional": {
    slug: "profesional-de-gestión-de-entrega-de-cadena-de-suministro",
    title: "Profesional de Gestión de Entrega de Cadena de Suministro",
    keywords: ["currículum de profesional de gestión de entrega de cadena de suministro", "CV de profesional de gestión de entrega de cadena de suministro", "ejemplo currículum profesional de gestión de entrega de cadena de suministro", "plantilla CV profesional de gestión de entrega de cadena de suministro"],
    searchIntents: ["cómo escribir currículum de profesional de gestión de entrega de cadena de suministro", "ejemplos currículum profesional de gestión de entrega de cadena de suministro", "mejor formato CV profesional de gestión de entrega de cadena de suministro"],
    topSkills: ["Gestión de Logística", "Negociación con Proveedores", "Control de Inventario", "Análisis de Datos", "Optimización de Procesos", "Estrategia de Cadena de Suministro", "Gestión de Proyectos", "Pronóstico de Demanda", "Reducción de Costos", "Sistemas ERP"],
    atsKeywords: ["cadena de suministro", "logística", "gestión de inventario", "adquisiciones", "gestión de proveedores", "distribución", "pronóstico", "análisis de datos", "ahorro de costos", "optimización de cadena de suministro", "planificación de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Profesional de Gestión de Entrega de Cadena de Suministro",
      summary: "Profesional dinámico de Gestión de Entrega de Cadena de Suministro con más de 7 años de experiencia en la optimización de procesos de cadena de suministro y logrando ahorros significativos en costos. Historial comprobado de liderazgo de equipos multifuncionales para mejorar la eficiencia de entrega en un 30%.",
      skills: ["Gestión de Logística", "Negociación con Proveedores", "Control de Inventario", "Análisis de Datos", "Optimización de Procesos", "Estrategia de Cadena de Suministro", "Gestión de Proyectos", "Pronóstico de Demanda", "Reducción de Costos", "Sistemas ERP"],
      experience: [
        {
          title: "Gerente Senior de Cadena de Suministro",
          company: "Global Logistics Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia de entrega en un 30% a través de iniciativas de optimización de procesos.",
            "Gestionó un presupuesto de $5M, logrando una reducción del 20% en costos operativos.",
            "Lideró un equipo de 15 para implementar un nuevo sistema ERP, mejorando la precisión de datos en un 40%.",
          ],
        },
        {
          title: "Analista de Cadena de Suministro",
          company: "Tech Supplies Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló un modelo de pronóstico que redujo los costos de mantenimiento de inventario en $200K anuales.",
            "Colaboró con proveedores para optimizar procesos de adquisición, resultando en un ahorro del 15%.",
            "Realizó análisis de datos para identificar cuellos de botella en la cadena de suministro, mejorando los tiempos de entrega en un 25%.",
          ],
        },
      ],
      education: [
        { institution: "University of Supply Chain Management", degree: "B.S.", field: "Logística y Gestión de Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional (CSCP)", issuer: "APICS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Supply Chain Delivery Management Professional en su currículum?", answer: "El currículum debe incluir experiencia relevante, habilidades clave en gestión de cadena de suministro, logros cuantificables y certificaciones profesionales." },
      { question: "¿Cómo destacar mi currículum de Supply Chain Delivery Management Professional?", answer: "Enfatiza logros medibles, utiliza palabras clave relacionadas con la industria y presenta tu experiencia de manera clara y concisa." },
      { question: "¿Qué habilidades necesita un Supply Chain Delivery Management Professional?", answer: "Las habilidades clave incluyen gestión de logística, negociación con proveedores, análisis de datos y optimización de procesos." },
    ],
  },
  "supply-chaintern": {
    slug: "practicante-logistica",
    title: "Practicante de Cadena de Suministro",
    keywords: ["currículum de practicante de logística", "CV de practicante de cadena de suministro", "ejemplo currículum practicante de logística", "plantilla CV practicante de cadena de suministro"],
    searchIntents: ["cómo escribir currículum de practicante de cadena de suministro", "ejemplos currículum practicante de logística", "mejor formato CV practicante de cadena de suministro"],
    topSkills: ["Gestión de Inventarios", "Análisis de Datos", "Coordinación Logística", "Optimización de la Cadena de Suministro", "Pronóstico", "Gestión de Relaciones con Proveedores", "Mejora de Procesos", "Adquisiciones", "Sistemas ERP", "Principios Lean"],
    atsKeywords: ["cadena de suministro", "pasantía", "logística", "inventario", "adquisiciones", "análisis de datos", "pronóstico", "gestión de proveedores", "mejora de procesos", "ERP", "Lean"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Cadena de Suministro",
      summary: "Practicante de Cadena de Suministro orientado a los detalles con más de 2 años de experiencia en logística y gestión de inventarios. Redujo exitosamente los costos de mantenimiento de inventario en un 15% y mejoró las tasas de cumplimiento de pedidos en un 20%.",
      skills: ["Gestión de Inventarios", "Análisis de Datos", "Coordinación Logística", "Optimización de la Cadena de Suministro", "Pronóstico", "Gestión de Relaciones con Proveedores", "Mejora de Procesos", "Adquisiciones", "Sistemas ERP", "Principios Lean"],
      experience: [
        {
          title: "Practicante de Analista de Cadena de Suministro",
          company: "Amazon",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Mejoró la precisión de inventario en un 25% mediante análisis de datos y refinamiento de procesos",
            "Ayudó a reducir el tiempo de entrega de envíos en un 10% al optimizar procesos logísticos",
            "Colaboró con equipos multifuncionales para mejorar la eficiencia de la cadena de suministro",
          ],
        },
        {
          title: "Practicante de Logística",
          company: "FedEx",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Optimizó los procesos de entrega, resultando en una reducción del 15% en costos operativos",
            "Analizó datos de envíos para identificar tendencias, aumentando las tasas de entrega a tiempo en un 30%",
            "Apoyó la implementación de un nuevo sistema de seguimiento de inventario",
          ],
        },
      ],
      education: [
        { institution: "University of Michigan", degree: "B.S.", field: "Gestión de Cadenas de Suministro", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Certified Supply Chain Professional (CSCP)", issuer: "APICS", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Supply Chain Intern en su currículum?", answer: "Un Supply Chain Intern debe incluir su experiencia en gestión de inventarios, habilidades en análisis de datos y logísticas, así como logros cuantificables que demuestren su efectividad." },
      { question: "¿Cómo destacar mi currículum de Supply Chain Intern?", answer: "Para destacar su currículum, incluya logros medibles, utilice palabras clave relevantes y asegúrese de resaltar sus habilidades técnicas y experiencia práctica." },
      { question: "¿Qué habilidades necesita un Supply Chain Intern?", answer: "Un Supply Chain Intern necesita habilidades en gestión de inventarios, análisis de datos, logística, comunicación efectiva y conocimiento de sistemas ERP." },
    ],
  },
  "uber-driver": {
    slug: "uber-driver",
    title: "Conductor de Uber",
    keywords: ["currículum de conductor de Uber", "CV de conductor de Uber", "ejemplo currículum conductor de Uber", "plantilla CV conductor de Uber"],
    searchIntents: ["cómo escribir currículum de conductor de Uber", "ejemplos currículum conductor de Uber", "mejor formato CV conductor de Uber"],
    topSkills: ["Servicio al Cliente", "Navegación", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas", "Conciencia de Seguridad", "Mantenimiento del Vehículo", "Adaptabilidad", "Conocimiento Local", "Resolución de Conflictos"],
    atsKeywords: ["Uber", "compartición de viajes", "conductor", "transporte", "servicio al cliente", "seguridad", "navegación", "gestión del tiempo", "mantenimiento del vehículo", "conocimiento del área local", "flexibilidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Conductor de Uber",
      summary: "Conductor de Uber dedicado con más de 5 años de experiencia brindando un servicio excepcional a los pasajeros, logrando una calificación de satisfacción del cliente del 95% y manteniendo una calificación de conductor de 4.9 estrellas.",
      skills: ["Servicio al Cliente", "Navegación", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas", "Conciencia de Seguridad", "Mantenimiento del Vehículo", "Adaptabilidad", "Conocimiento Local", "Resolución de Conflictos"],
      experience: [
        {
          title: "Conductor Senior de Uber",
          company: "Uber Technologies, Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré un 98% de tasa de recogida a tiempo durante 2 años",
            "Mantengo una calificación de 4.9 estrellas de más de 1,500 viajes",
            "Proporcioné más de 3,000 viajes, resultando en un aumento promedio de ingresos mensuales del 15%",
          ],
        },
        {
          title: "Conductor de Uber",
          company: "Lyft Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completé más de 2,500 viajes con un 95% de puntuación de satisfacción del cliente",
            "Aumenté la base de clientes en un 20% a través de un servicio excepcional",
            "Reduje los costos de combustible en un 10% mediante técnicas de conducción eficientes",
          ],
        },
      ],
      education: [
        { institution: "City College", degree: "B.S.", field: "Gestión del Transporte", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Defensive Driving Certification", issuer: "National Safety Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un conductor de Uber en su currículum?", answer: "Debe incluir experiencia en servicio al cliente, habilidades de navegación y logros específicos como calificaciones de satisfacción del cliente." },
      { question: "¿Cómo destacar mi currículum de conductor de Uber?", answer: "Enfatiza tus logros, calificaciones y habilidades clave que son relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un conductor de Uber?", answer: "Un conductor de Uber necesita habilidades en servicio al cliente, navegación, gestión del tiempo y conciencia de seguridad." },
    ],
  },
  "ups-driver": {
    slug: "curriculum-conductor-ups",
    title: "Currículum Conductor UPS",
    keywords: ["currículum de conductor UPS", "CV de conductor UPS", "ejemplo currículum conductor UPS", "plantilla CV conductor UPS"],
    searchIntents: ["cómo escribir currículum de conductor UPS", "ejemplos currículum conductor UPS", "mejor formato CV conductor UPS"],
    topSkills: ["conducción segura", "navegación de rutas", "servicio al cliente", "manejo de paquetes", "gestión del tiempo", "mantenimiento de vehículos", "comunicación", "resolución de problemas", "atención al detalle", "resistencia física"],
    atsKeywords: ["UPS", "entrega", "conductor", "logística", "transporte", "satisfacción del cliente", "normas de seguridad", "entrega de paquetes", "optimización de rutas", "eficiencia en el tiempo", "inspecciones de vehículos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum Conductor UPS",
      summary: "Conductor de UPS dedicado con más de 5 años de experiencia en la entrega eficiente de paquetes y servicio al cliente, logrando una tasa de entrega puntual del 99%.",
      skills: ["conducción segura", "navegación de rutas", "servicio al cliente", "manejo de paquetes", "gestión del tiempo", "mantenimiento de vehículos", "comunicación", "resolución de problemas", "atención al detalle", "resistencia física"],
      experience: [
        {
          title: "Conductor de Entrega Senior",
          company: "UPS",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré una tasa de entrega puntual del 99% durante 2 años",
            "Manejé un promedio de 150 paquetes por día, manteniendo una alta satisfacción del cliente",
            "Implementé estrategias de optimización de rutas que redujeron el tiempo de entrega en un 15%",
          ],
        },
        {
          title: "Conductor de Entrega",
          company: "FedEx",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Entregué paquetes a más de 300 clientes semanalmente",
            "Mantuve un historial de conducción limpio con cero accidentes",
            "Entrené a nuevos conductores en protocolos de seguridad y procedimientos de entrega",
          ],
        },
      ],
      education: [
        { institution: "City College", degree: "Asociado en Artes", field: "Gestión del Transporte", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Commercial Driver's License (CDL)", issuer: "State Department of Motor Vehicles", date: "2021-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un UPS Driver Resume en su currículum?", answer: "Un UPS Driver Resume debe incluir habilidades relevantes, experiencia laboral, y certificaciones pertinentes." },
      { question: "¿Cómo destacar mi currículum de UPS Driver Resume?", answer: "Para destacar tu currículum, enfatiza tus logros en entregas puntuales y servicio al cliente." },
      { question: "¿Qué habilidades necesita un UPS Driver Resume?", answer: "Las habilidades clave incluyen conducción segura, manejo de paquetes, y servicio al cliente." },
    ],
  },
  "valet-driver": {
    slug: "valet-driver",
    title: "Conductor de Valet",
    keywords: ["currículum de Conductor de Valet", "CV de Conductor de Valet", "ejemplo currículum Conductor de Valet", "plantilla CV Conductor de Valet"],
    searchIntents: ["cómo escribir currículum de Conductor de Valet", "ejemplos currículum Conductor de Valet", "mejor formato CV Conductor de Valet"],
    topSkills: ["Servicio al Cliente", "Gestión del Tiempo", "Atención al Detalle", "Habilidades de Conducción", "Resolución de Problemas", "Mantenimiento de Vehículos", "Comunicación", "Multitarea", "Conciencia de Seguridad", "Habilidades de Navegación"],
    atsKeywords: ["Conductor de Valet", "Satisfacción del Cliente", "Gestión de Estacionamiento", "Manejo de Vehículos", "Eficiencia en el Tiempo", "Interacción con Clientes", "Protocolos de Seguridad", "Resolución de Problemas", "Colaboración en Equipo", "Excelencia en el Servicio", "Historial de Conducción"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Conductor de Valet",
      summary: "Conductor de Valet dedicado con más de 5 años de experiencia brindando un servicio excepcional y asegurando la satisfacción del cliente. Gestioné exitosamente el estacionamiento y la recuperación segura de más de 500 vehículos por mes, contribuyendo a una calificación de satisfacción del cliente del 95%.",
      skills: ["Servicio al Cliente", "Gestión del Tiempo", "Atención al Detalle", "Habilidades de Conducción", "Resolución de Problemas", "Mantenimiento de Vehículos", "Comunicación", "Multitarea", "Conciencia de Seguridad", "Habilidades de Navegación"],
      experience: [
        {
          title: "Conductor de Valet Senior",
          company: "ABC Luxury Hotels",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 20% a través de un servicio personalizado y manejo eficiente de vehículos.",
            "Gestioné el estacionamiento de más de 300 vehículos por semana sin incidentes.",
            "Implementé un nuevo sistema de check-in que redujo los tiempos de espera en un 15%.",
          ],
        },
        {
          title: "Conductor de Valet",
          company: "XYZ Event Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Manejé las operaciones de estacionamiento para más de 50 eventos de alto perfil, asegurando un servicio sin contratiempos.",
            "Alcancé un 98% de puntuación de retroalimentación positiva de los clientes del evento.",
            "Entrené a 5 nuevos miembros del personal de valet en atención al cliente y protocolos de gestión de vehículos.",
          ],
        },
      ],
      education: [
        { institution: "City College", degree: "A.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Certified Parking Professional", issuer: "International Parking Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Conductor de Valet en su currículum?", answer: "Un Conductor de Valet debe incluir experiencia en atención al cliente, habilidades de conducción, y cualquier certificación relevante." },
      { question: "¿Cómo destacar mi currículum de Conductor de Valet?", answer: "Enfatiza tus logros en la satisfacción del cliente y la gestión eficiente de vehículos." },
      { question: "¿Qué habilidades necesita un Conductor de Valet?", answer: "Habilidades clave incluyen atención al detalle, habilidades de comunicación, y una sólida comprensión de los protocolos de seguridad." },
    ],
  },
  "warehouse-clerk": {
    slug: "almacenista-curriculum",
    title: "Almacenista",
    keywords: ["currículum de almacenista", "CV de almacenista", "ejemplo currículum almacenista", "plantilla CV almacenista"],
    searchIntents: ["cómo escribir currículum de almacenista", "ejemplos currículum almacenista", "mejor formato CV almacenista"],
    topSkills: ["gestión de inventario", "procesamiento de pedidos", "operación de montacargas", "empaquetado", "envíos y recepciones", "ingreso de datos", "control de calidad", "cumplimiento de seguridad", "gestión del tiempo", "colaboración en equipo"],
    atsKeywords: ["operaciones de almacén", "logística", "cadena de suministro", "gestión de stock", "picking y packing", "manejo de materiales", "servicio al cliente", "seguimiento de inventario", "carga y descarga", "etiquetado de productos", "seguridad en el almacén"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Almacenista",
      summary: "Almacenista orientado a los detalles con más de 5 años de experiencia en gestión de inventario y logística. Logré un aumento del 20% en la precisión de los pedidos a través de la mejora de los procesos de control de calidad.",
      skills: ["gestión de inventario", "procesamiento de pedidos", "operación de montacargas", "empaquetado", "envíos y recepciones", "ingreso de datos", "control de calidad", "cumplimiento de seguridad", "gestión del tiempo", "colaboración en equipo"],
      experience: [
        {
          title: "Almacenista Senior",
          company: "Amazon Fulfillment Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la precisión del inventario en un 25% mediante la implementación de un nuevo sistema de seguimiento.",
            "Procesé más de 1000 pedidos diarios, asegurando la entrega a tiempo.",
            "Entrené a 10 nuevos empleados en procedimientos de almacén y protocolos de seguridad.",
          ],
        },
        {
          title: "Almacenista",
          company: "Walmart Distribution Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Reduje los errores de envío en un 15% a través de controles de calidad meticulosos.",
            "Gestioné los niveles de inventario para mantener stock óptimo, resultando en una disminución del 10% en costos de almacenamiento.",
            "Asistí en la reestructuración del diseño del almacén, mejorando la eficiencia en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Logística y Gestión de la Cadena de Suministro", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Forklift Operator Certification", issuer: "National Safety Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un almacenista en su currículum?", answer: "Un almacenista debe incluir experiencia relevante, habilidades técnicas, y logros cuantificables en su currículum." },
      { question: "¿Cómo destacar mi currículum de almacenista?", answer: "Destacar logros específicos, utilizar palabras clave relevantes y resaltar experiencias previas en el campo." },
      { question: "¿Qué habilidades necesita un almacenista?", answer: "Las habilidades clave incluyen gestión de inventario, operación de montacargas, y control de calidad." },
    ],
  },
  "warehouse-driver": {
    slug: "conductor-de-almacen",
    title: "Conductor de Almacén",
    keywords: ["currículum de conductor de almacén", "CV de conductor de almacén", "ejemplo currículum conductor de almacén", "plantilla CV conductor de almacén"],
    searchIntents: ["cómo escribir currículum de conductor de almacén", "ejemplos currículum conductor de almacén", "mejor formato CV conductor de almacén"],
    topSkills: ["Operación de montacargas", "Gestión de inventarios", "Planificación de rutas", "Cumplimiento de seguridad", "Cargar y descargar", "Gestión del tiempo", "Habilidades de comunicación", "Resolución de problemas", "Atención al cliente", "Colaboración en equipo"],
    atsKeywords: ["logística de almacén", "entrega", "transporte", "procedimientos de seguridad", "control de inventarios", "envío", "recepción", "certificación de montacargas", "regulaciones DOT", "entregas a tiempo", "mantenimiento de vehículos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Conductor de Almacén",
      summary: "Conductor de almacén dedicado con más de 5 años de experiencia en entrega eficiente y gestión logística, logrando un 95% de entregas a tiempo y reduciendo los costos de combustible en un 10%.",
      skills: ["Operación de montacargas", "Gestión de inventarios", "Planificación de rutas", "Cumplimiento de seguridad", "Cargar y descargar", "Gestión del tiempo", "Habilidades de comunicación", "Resolución de problemas", "Atención al cliente", "Colaboración en equipo"],
      experience: [
        {
          title: "Conductor de Almacén Senior",
          company: "Amazon",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las entregas a tiempo en un 15% mediante una planificación de rutas efectiva.",
            "Reduje el tiempo de inactividad del vehículo en un 20% a través de chequeos de mantenimiento proactivos.",
            "Alcancé un índice de satisfacción del cliente del 98% durante las operaciones de entrega.",
          ],
        },
        {
          title: "Conductor de Almacén",
          company: "Walmart",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné exitosamente más de 200 entregas por semana.",
            "Implementé protocolos de seguridad que redujeron incidentes en un 30%.",
            "Entrené a nuevos conductores sobre políticas de la empresa y procedimientos de seguridad.",
          ],
        },
      ],
      education: [
        { institution: "City College", degree: "A.A.", field: "Gestión Logística", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Commercial Driver's License (CDL)", issuer: "Department of Motor Vehicles", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un conductor de almacén en su currículum?", answer: "Un conductor de almacén debe incluir su experiencia laboral, habilidades relevantes, certificaciones y educación." },
      { question: "¿Cómo destacar mi currículum de conductor de almacén?", answer: "Utiliza palabras clave relevantes, muestra logros cuantificables y destaca tu experiencia en logística." },
      { question: "¿Qué habilidades necesita un conductor de almacén?", answer: "Las habilidades clave incluyen operación de montacargas, gestión de inventarios y atención al cliente." },
    ],
  },
  "warehouse-stocker": {
    slug: "almacenista",
    title: "Almacenista",
    keywords: ["currículum de almacenista", "CV de almacenista", "ejemplo currículum almacenista", "plantilla CV almacenista"],
    searchIntents: ["cómo escribir currículum de almacenista", "ejemplos currículum almacenista", "mejor formato CV almacenista"],
    topSkills: ["Gestión de Inventarios", "Operación de Montacargas", "Selección de Pedidos", "Reabastecimiento de Stock", "Envío y Recepción", "Cumplimiento de Seguridad", "Organización de Almacén", "Colaboración en Equipo", "Gestión del Tiempo", "Atención al Detalle"],
    atsKeywords: ["almacén", "almacenista", "inventario", "logística", "envío", "recepción", "montacargas", "selección", "reabastecimiento", "organización", "seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Almacenista",
      summary: "Almacenista dedicado con más de 5 años de experiencia en gestión de inventarios y logística. Mejoró con éxito los procesos de organización de stock, logrando un aumento del 20% en la eficiencia.",
      skills: ["Gestión de Inventarios", "Operación de Montacargas", "Selección de Pedidos", "Reabastecimiento de Stock", "Envío y Recepción", "Cumplimiento de Seguridad", "Organización de Almacén", "Colaboración en Equipo", "Gestión del Tiempo", "Atención al Detalle"],
      experience: [
        {
          title: "Almacenista Senior",
          company: "Amazon Fulfillment Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la precisión del inventario en un 30% mediante un seguimiento y gestión diligentes.",
            "Logré una reducción del 15% en el tiempo de recuperación de stock reorganizando los diseños de almacenamiento.",
            "Capacité a 10 nuevos empleados en procedimientos eficientes de almacenamiento, mejorando la productividad del equipo.",
          ],
        },
        {
          title: "Almacenista",
          company: "Walmart Distribution Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve registros de inventario precisos, resultando en una tasa de precisión del 98%.",
            "Ejecuté operaciones diarias de envío y recepción, procesando más de 500 artículos por turno.",
            "Colaboré con miembros del equipo para optimizar las operaciones, reduciendo los tiempos de entrega en un 10%.",
          ],
        },
      ],
      education: [
        { institution: "Community College", degree: "A.A.", field: "Gestión Logística", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Forklift Operator Certification", issuer: "OSHA", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Warehouse Stocker en su currículum?", answer: "Un almacenista debe incluir experiencia en gestión de inventarios, habilidades de operación de montacargas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Warehouse Stocker?", answer: "Enfatiza tus logros, utiliza palabras clave del sector y destaca tus habilidades en gestión de inventarios y logística." },
      { question: "¿Qué habilidades necesita un Warehouse Stocker?", answer: "Un almacenista necesita habilidades en gestión de inventarios, operación de montacargas, atención al detalle y trabajo en equipo." },
    ],
  },
  "warehouse-worker": {
    slug: "trabajador-de-almacén",
    title: "Trabajador de Almacén",
    keywords: ["currículum de trabajador de almacén", "CV de trabajador de almacén", "ejemplo currículum trabajador de almacén", "plantilla CV trabajador de almacén"],
    searchIntents: ["cómo escribir currículum de trabajador de almacén", "ejemplos currículum trabajador de almacén", "mejor formato CV trabajador de almacén"],
    topSkills: ["gestión de inventario", "operación de montacargas", "selección de pedidos", "embalaje", "envío y recepción", "control de calidad", "seguridad en el almacén", "colaboración en equipo", "gestión del tiempo", "resolución de problemas"],
    atsKeywords: ["operaciones de almacén", "logística", "manejo de materiales", "cadena de suministro", "selección y embalaje", "tecnología RFID", "reabastecimiento de inventario", "transpaleta", "precisión de inventario", "normas OSHA", "cumplimiento de seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador de Almacén",
      summary: "Trabajador de almacén orientado a los detalles con 5 años de experiencia en gestión de inventario y logística. Logré consistentemente una tasa de precisión del 98% en el cumplimiento de pedidos, contribuyendo a aumentar la satisfacción del cliente.",
      skills: ["gestión de inventario", "operación de montacargas", "selección de pedidos", "embalaje", "envío y recepción", "control de calidad", "seguridad en el almacén", "colaboración en equipo", "gestión del tiempo", "resolución de problemas"],
      experience: [
        {
          title: "Asociado de Almacén Senior",
          company: "Amazon Fulfillment Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en la selección de pedidos en un 20% mediante la optimización del flujo de trabajo.",
            "Entrené a 10 nuevos empleados sobre los procedimientos del almacén y los protocolos de seguridad.",
            "Reducí las discrepancias de inventario en un 15% mediante una gestión diligente del stock.",
          ],
        },
        {
          title: "Asociado de Almacén",
          company: "Walmart Distribution Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una tasa de precisión del 95% en el cumplimiento de pedidos durante las temporadas pico.",
            "Asistí en la implementación de un nuevo sistema de seguimiento de inventario.",
            "Mantuve un espacio de trabajo limpio y organizado, contribuyendo a mejorar las calificaciones de seguridad.",
          ],
        },
      ],
      education: [
        { institution: "City College", degree: "A.A.S.", field: "Gestión Logística", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Forklift Operator Certification", issuer: "National Safety Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un trabajador de almacén en su currículum?", answer: "Debe incluir habilidades relevantes, experiencia laboral y certificaciones relacionadas." },
      { question: "¿Cómo destacar mi currículum de trabajador de almacén?", answer: "Utiliza palabras clave relevantes y destaca logros cuantificables." },
      { question: "¿Qué habilidades necesita un trabajador de almacén?", answer: "Las habilidades clave incluyen gestión de inventario, operación de montacargas y seguridad en el almacén." },
    ],
  },
  "well-driller": {
    slug: "perforador-de-pozos",
    title: "Perforador de Pozos",
    keywords: ["currículum de perforador de pozos", "CV de perforador de pozos", "ejemplo currículum perforador de pozos", "plantilla CV perforador de pozos"],
    searchIntents: ["cómo escribir currículum de perforador de pozos", "ejemplos currículum perforador de pozos", "mejor formato CV perforador de pozos"],
    topSkills: ["Técnicas de Perforación", "Hidrogeología", "Mantenimiento de Pozos", "Cumplimiento de Seguridad", "Operaciones de Bombeo", "Evaluación del Sitio", "Operación de Equipos", "Pruebas de Calidad del Agua", "Resolución de Problemas", "Gestión de Proyectos"],
    atsKeywords: ["perforación de pozos", "agua subterránea", "equipos de perforación", "regulaciones de seguridad", "preparación del sitio", "recursos hídricos", "procedimientos de mantenimiento", "habilidades técnicas", "conciencia ambiental", "colaboración en equipo", "evaluación de riesgos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Perforador de Pozos",
      summary: "Perforador de pozos dedicado con más de 5 años de experiencia en extracción de agua subterránea y gestión de sitios, logrando un incremento del 30% en la eficiencia del proyecto a través de técnicas de perforación innovadoras.",
      skills: ["Técnicas de Perforación", "Hidrogeología", "Mantenimiento de Pozos", "Cumplimiento de Seguridad", "Operaciones de Bombeo", "Evaluación del Sitio", "Operación de Equipos", "Pruebas de Calidad del Agua", "Resolución de Problemas", "Gestión de Proyectos"],
      experience: [
        {
          title: "Perforador de Pozos Senior",
          company: "HydroTech Drilling Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de perforación en un 25% mediante la implementación de nuevas técnicas y tecnologías.",
            "Completar con éxito más de 150 instalaciones de pozos con una tasa de satisfacción del cliente del 98%.",
            "Reduje los costos operativos en $50,000 anualmente a través de la gestión optimizada de recursos.",
          ],
        },
        {
          title: "Técnico de Perforación de Pozos",
          company: "AquaBore Drilling Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en la perforación de más de 100 pozos, asegurando el cumplimiento de las regulaciones de seguridad.",
            "Realicé chequeos de mantenimiento regulares, reduciendo el tiempo de inactividad del equipo en un 15%.",
            "Entrené a 5 nuevos empleados en operaciones de perforación y protocolos de seguridad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias Ambientales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Well Driller", issuer: "National Ground Water Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Well Driller en su currículum?", answer: "Un Well Driller debe incluir su experiencia en perforación, habilidades técnicas, y cumplimiento de normativas de seguridad." },
      { question: "¿Cómo destacar mi currículum de Well Driller?", answer: "Utiliza palabras clave relevantes y destaca tus logros más significativos en proyectos." },
      { question: "¿Qué habilidades necesita un Well Driller?", answer: "Habilidades clave incluyen técnicas de perforación, manejo de equipos, y conocimiento de hidrogeología." },
    ],
  }
};
