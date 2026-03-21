import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  "barista-at-aritizia": {
    slug: "barista-en-aritzia",
    title: "Barista en Aritzia",
    keywords: ["currículum de barista", "CV de barista", "ejemplo currículum barista", "plantilla CV barista"],
    searchIntents: ["cómo escribir currículum de barista", "ejemplos currículum barista", "mejor formato CV barista"],
    topSkills: ["Servicio al Cliente", "Técnicas de Preparación de Café", "Manejo de Efectivo", "Gestión de Inventarios", "Colaboración en Equipo", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas", "Atención al Detalle", "Habilidades de Venta"],
    atsKeywords: ["barista", "servicio al cliente", "café", "cajero", "inventario", "trabajo en equipo", "ventas", "seguridad alimentaria", "multitarea", "comunicación", "gestión del tiempo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Barista en Aritzia",
      summary: "Barista dedicado con más de 5 años de experiencia en entornos de cafés de alta velocidad, conocido por mejorar la satisfacción del cliente y aumentar las ventas en un 20% a través de un servicio excepcional.",
      skills: ["Servicio al Cliente", "Técnicas de Preparación de Café", "Manejo de Efectivo", "Gestión de Inventarios", "Colaboración en Equipo", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas", "Atención al Detalle", "Habilidades de Venta"],
      experience: [
        {
          title: "Barista Principal",
          company: "Starbucks",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% durante las horas pico a través de una gestión efectiva del equipo",
            "Capacité a 10 nuevos miembros del personal en la preparación de café y protocolos de servicio al cliente",
            "Recibí el premio 'Empleado del Mes' tres veces por comentarios sobresalientes de los clientes",
          ],
        },
        {
          title: "Barista",
          company: "Local Coffee Shop",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un 95% de satisfacción del cliente a través de un servicio personalizado",
            "Introduje una nueva bebida de temporada que aumentó el tráfico de clientes en un 15%",
            "Gestioné el inventario diario y reduje el desperdicio en un 30% a través de un control efectivo de stock",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "A.A.S.", field: "Artes Culinarias", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Barista Level 1 Certification", issuer: "Specialty Coffee Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Barista en su currículum?", answer: "Un Barista debe incluir su experiencia laboral, habilidades relevantes, educación, y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Barista?", answer: "Enfatiza tus logros y habilidades específicas que te diferencian de otros candidatos." },
      { question: "¿Qué habilidades necesita un Barista?", answer: "Un Barista necesita habilidades en servicio al cliente, preparación de café, manejo de efectivo, y trabajo en equipo." },
    ],
  },
  "barista-manager": {
    slug: "barista-manager",
    title: "Gerente de Baristas",
    keywords: ["currículum de Gerente de Baristas", "CV de Gerente de Baristas", "ejemplo currículum Gerente de Baristas", "plantilla CV Gerente de Baristas"],
    searchIntents: ["cómo escribir currículum de Gerente de Baristas", "ejemplos currículum Gerente de Baristas", "mejor formato CV Gerente de Baristas"],
    topSkills: ["Servicio al Cliente", "Liderazgo de Equipo", "Técnicas de Preparación de Café", "Gestión de Inventarios", "Manejo de Efectivo", "Capacitación y Desarrollo", "Estrategias de Ventas", "Control de Calidad", "Comunicación", "Resolución de Problemas"],
    atsKeywords: ["barista", "manager", "customer service", "coffee shop", "inventory", "training", "sales", "team management", "quality assurance", "cash management", "customer satisfaction"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Baristas",
      summary: "Gerente de Baristas dedicado con más de 5 años de experiencia liderando equipos y mejorando la satisfacción del cliente. Aumentó las ventas en un 20% a través de estrategias efectivas de capacitación y compromiso.",
      skills: ["Servicio al Cliente", "Liderazgo de Equipo", "Técnicas de Preparación de Café", "Gestión de Inventarios", "Manejo de Efectivo", "Capacitación y Desarrollo", "Estrategias de Ventas", "Control de Calidad", "Comunicación", "Resolución de Problemas"],
      experience: [
        {
          title: "Gerente de Baristas Senior",
          company: "Starbucks",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos de la tienda en un 25% año tras año a través de estrategias de ventas mejoradas.",
            "Capacité y desarrollé un equipo de 15 baristas, lo que resultó en una reducción del 30% en la rotación de personal.",
            "Implementé un nuevo sistema de inventario, reduciendo el desperdicio en un 15%.",
          ],
        },
        {
          title: "Supervisor de Baristas",
          company: "Peet's Coffee",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné las operaciones diarias, lo que llevó a un aumento del 15% en las puntuaciones de satisfacción del cliente.",
            "Lancé con éxito promociones de bebidas de temporada que aumentaron las ventas en un 10%.",
            "Supervisé programas de capacitación para nuevos empleados, mejorando la velocidad de servicio en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Los Angeles", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Specialty Coffee Association Barista", issuer: "Specialty Coffee Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Barista Manager en su currículum?", answer: "Debe incluir experiencias laborales relevantes, habilidades de liderazgo, y logros en la mejora de la satisfacción del cliente." },
      { question: "¿Cómo destacar mi currículum de Barista Manager?", answer: "Enfatiza tus logros en ventas y la capacitación de equipos, así como tu experiencia en gestión de inventarios." },
      { question: "¿Qué habilidades necesita un Barista Manager?", answer: "Habilidades clave incluyen liderazgo, atención al cliente, y gestión de operaciones." },
    ],
  },
  "beverage-server": {
    slug: "servidor-de-bebidas",
    title: "Servidor de Bebidas",
    keywords: ["currículum de servidor de bebidas", "CV de servidor de bebidas", "ejemplo currículum servidor de bebidas", "plantilla CV servidor de bebidas"],
    searchIntents: ["cómo escribir currículum de servidor de bebidas", "ejemplos currículum servidor de bebidas", "mejor formato CV servidor de bebidas"],
    topSkills: ["Atención al Cliente", "Mixología", "Manejo de Efectivo", "Comunicación", "Multitasking", "Gestión del Tiempo", "Atención al Detalle", "Trabajo en Equipo", "Resolución de Problemas", "Habilidades de Ventas"],
    atsKeywords: ["servicio de bebidas", "alimentos y bebidas", "satisfacción del cliente", "gestión de inventario", "bartending", "conocimiento del menú", "sistemas POS", "salud y seguridad", "entrenamiento de personal", "apoyo a eventos", "venta adicional"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Servidor de Bebidas",
      summary: "Servidor de bebidas dedicado con más de 5 años de experiencia en establecimientos de alto volumen, reconocido por incrementar las ventas en un 20% a través de un servicio al cliente excepcional y un amplio conocimiento del producto.",
      skills: ["Atención al Cliente", "Mixología", "Manejo de Efectivo", "Comunicación", "Multitasking", "Gestión del Tiempo", "Atención al Detalle", "Trabajo en Equipo", "Resolución de Problemas", "Habilidades de Ventas"],
      experience: [
        {
          title: "Servidor de Bebidas Senior",
          company: "The Grand Hotel",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas de bebidas en un 25% en el primer año a través de técnicas efectivas de venta adicional",
            "Recibí consistentemente un 95% de satisfacción del cliente en encuestas de retroalimentación de huéspedes",
            "Entrené y mentoreé a 10 nuevos miembros del personal, mejorando la eficiencia del equipo en un 30%",
          ],
        },
        {
          title: "Servidor de Bebidas",
          company: "Ocean View Bar & Grill",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré 'Empleado del Mes' tres veces por un servicio y trabajo en equipo sobresalientes",
            "Gestioné el inventario y reduje el desperdicio en un 15% a través de un manejo eficiente del stock",
            "Manejé con éxito hasta 150 clientes durante las horas pico con una tasa de precisión de pedidos del 98%",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "TIPS Certified", issuer: "TIPS", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Beverage Server en su currículum?", answer: "Un Beverage Server debe incluir sus experiencias laborales, habilidades específicas del sector, y logros destacados en servicio al cliente y ventas." },
      { question: "¿Cómo destacar mi currículum de Beverage Server?", answer: "Para destacar su currículum, incluya resultados cuantificables de sus logros y resalte su experiencia en atención al cliente y habilidades de venta." },
      { question: "¿Qué habilidades necesita un Beverage Server?", answer: "Un Beverage Server necesita habilidades en atención al cliente, manejo de efectivo, comunicación efectiva, y capacidad para trabajar en equipo." },
    ],
  },
  "catering-cook": {
    slug: "catering-cook-curriculum-vitae",
    title: "Cocinero de Catering",
    keywords: ["currículum de cocinero de catering", "CV de cocinero de catering", "ejemplo currículum cocinero de catering", "plantilla CV cocinero de catering"],
    searchIntents: ["cómo escribir currículum de cocinero de catering", "ejemplos currículum cocinero de catering", "mejor formato CV cocinero de catering"],
    topSkills: ["Preparación de Alimentos", "Planificación de Menú", "Técnicas de Cocina", "Seguridad Alimentaria", "Gestión de Inventarios", "Atención al Cliente", "Colaboración en Equipo", "Gestión del Tiempo", "Creatividad", "Resolución de Problemas"],
    atsKeywords: ["Catering", "Cocina", "Servicio de Alimentos", "Preparación de Comidas", "Seguridad en la Cocina", "Desarrollo de Recetas", "Catering de Eventos", "Satisfacción del Cliente", "Control de Calidad", "Normas de Salud", "Liderazgo de Equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Cocinero de Catering",
      summary: "Cocinero de Catering dedicado con más de 5 años de experiencia en la preparación de comidas a gran escala para eventos. Gestionó exitosamente el catering para más de 100 eventos, logrando una tasa de satisfacción del cliente del 95%.",
      skills: ["Preparación de Alimentos", "Planificación de Menú", "Técnicas de Cocina", "Seguridad Alimentaria", "Gestión de Inventarios", "Atención al Cliente", "Colaboración en Equipo", "Gestión del Tiempo", "Creatividad", "Resolución de Problemas"],
      experience: [
        {
          title: "Cocinero de Catering Senior",
          company: "Gourmet Events Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia del catering de eventos en un 30% mediante procesos de preparación de alimentos optimizados.",
            "Gestioné el catering para más de 150 eventos, manteniendo una puntuación de satisfacción del cliente del 95%.",
            "Desarrollé nuevos elementos del menú que resultaron en un aumento del 20% en el negocio recurrente.",
          ],
        },
        {
          title: "Cocinero de Catering",
          company: "Delicious Bites Catering",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Preparé comidas para hasta 200 invitados en eventos corporativos, asegurando un servicio de alta calidad.",
            "Implementé protocolos de seguridad alimentaria que redujeron los accidentes en la cocina en un 40%.",
            "Colaboré con planificadores de eventos para crear menús personalizados, mejorando la satisfacción del cliente.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "A.A.S.", field: "Artes Culinarias", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Cocinero de Catering en su currículum?", answer: "Un cocinero de catering debe incluir su experiencia en la preparación de alimentos, habilidades de atención al cliente y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Cocinero de Catering?", answer: "Utiliza logros cuantificables y destaca tu experiencia en eventos importantes para atraer la atención de los empleadores." },
      { question: "¿Qué habilidades necesita un Cocinero de Catering?", answer: "Las habilidades clave incluyen preparación de alimentos, seguridad alimentaria, gestión del tiempo y creatividad en el desarrollo de menús." },
    ],
  },
  "catering-specialist-at-freebirds": {
    slug: "especialista-en-catering",
    title: "Especialista en Catering",
    keywords: ["currículum de especialista en catering", "CV de especialista en catering", "ejemplo currículum especialista en catering", "plantilla CV especialista en catering"],
    searchIntents: ["cómo escribir currículum de especialista en catering", "ejemplos currículum especialista en catering", "mejor formato CV especialista en catering"],
    topSkills: ["Coordinación de Eventos", "Planificación de Menú", "Relaciones con Clientes", "Gestión de Presupuesto", "Cumplimiento de Seguridad Alimentaria", "Liderazgo de Equipo", "Logística de Catering", "Servicio al Cliente", "Desarrollo de Ventas", "Resolución de Conflictos"],
    atsKeywords: ["catering", "desarrollo de menú", "planificación de eventos", "servicio de alimentos", "satisfacción del cliente", "presupuestación", "gestión de equipo", "logística", "cumplimiento", "ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Catering",
      summary: "Especialista en Catering con más de 5 años de experiencia en planificación de eventos y servicio de alimentos. Gestionó con éxito eventos de catering que aumentaron la satisfacción del cliente en un 30% y los ingresos en un 25%.",
      skills: ["Coordinación de Eventos", "Planificación de Menú", "Relaciones con Clientes", "Gestión de Presupuesto", "Cumplimiento de Seguridad Alimentaria", "Liderazgo de Equipo", "Logística de Catering", "Servicio al Cliente", "Desarrollo de Ventas", "Resolución de Conflictos"],
      experience: [
        {
          title: "Especialista Principal en Catering",
          company: "Catering Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia del evento en un 40% a través de una mejor planificación logística",
            "Logró una tasa de satisfacción del cliente del 95% en encuestas post-evento",
            "Generó $500,000 en ingresos a través de una gestión exitosa de eventos",
          ],
        },
        {
          title: "Coordinador de Catering",
          company: "Gourmet Events LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordinó más de 100 eventos de catering exitosos con temas variados",
            "Redujo el desperdicio de alimentos en un 20% a través de una gestión efectiva del inventario",
            "Mejoró la experiencia del cliente lo que llevó a un aumento del 15% en clientes recurrentes",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Especialista en Catering en su currículum?", answer: "Debería incluir su experiencia en planificación de eventos, habilidades de gestión de presupuesto y logísticas de catering." },
      { question: "¿Cómo destacar mi currículum de Especialista en Catering?", answer: "Utilice palabras clave relevantes y enfoque en logros cuantificables que demuestren su impacto en clientes y eventos." },
      { question: "¿Qué habilidades necesita un Especialista en Catering?", answer: "Las habilidades clave incluyen coordinación de eventos, relaciones con clientes, gestión de presupuesto y cumplimiento de normativas de seguridad alimentaria." },
    ],
  },
  "cedar-creek-grille-hostess": {
    slug: "cedar-creek-grille-hostess",
    title: "Anfitriona de Cedar Creek Grille",
    keywords: ["currículum de anfitriona de Cedar Creek Grille", "CV de anfitriona de Cedar Creek Grille", "ejemplo currículum anfitriona de Cedar Creek Grille", "plantilla CV anfitriona de Cedar Creek Grille"],
    searchIntents: ["cómo escribir currículum de anfitriona de Cedar Creek Grille", "ejemplos currículum anfitriona de Cedar Creek Grille", "mejor formato CV anfitriona de Cedar Creek Grille"],
    topSkills: ["atención al cliente", "comunicación", "multitarea", "trabajo en equipo", "resolución de problemas", "gestión del tiempo", "atención al detalle", "habilidades organizativas", "resolución de conflictos", "operación de sistema POS"],
    atsKeywords: ["anfitriona", "anfitrión de restaurante", "atención al cliente", "arreglos de asientos", "relaciones con los huéspedes", "operaciones de restaurante", "gestión de reservas", "experiencia gastronómica", "hospitalidad", "colaboración en equipo", "área de atención al cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Anfitriona de Cedar Creek Grille",
      summary: "Anfitriona dedicada con más de 3 años de experiencia en la industria de restaurantes, reconocida por mejorar las calificaciones de satisfacción de los huéspedes en un 20% a través de una comunicación efectiva y excelencia en el servicio.",
      skills: ["atención al cliente", "comunicación", "multitarea", "trabajo en equipo", "resolución de problemas", "gestión del tiempo", "atención al detalle", "habilidades organizativas", "resolución de conflictos", "operación de sistema POS"],
      experience: [
        {
          title: "Anfitriona Senior",
          company: "The Olive Garden",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de asientos de los huéspedes en un 25% durante horas pico, lo que llevó a un aumento del 15% en las ventas totales.",
            "Logré un 95% de puntuación positiva de retroalimentación de los huéspedes sobre su experiencia gastronómica.",
            "Capacité al nuevo personal sobre los protocolos de anfitriones, mejorando el rendimiento del equipo y la satisfacción de los huéspedes.",
          ],
        },
        {
          title: "Anfitriona",
          company: "Red Lobster",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné las reservas de los huéspedes y las llegadas, optimizando los arreglos de asientos para reducir los tiempos de espera en un 30%.",
            "Colaboré con la cocina y el personal de servicio para asegurar un flujo de servicio fluido durante turnos ocupados.",
            "Desarrollé y mantuve relaciones positivas con clientes regulares, contribuyendo a la repetición de negocios.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "A.A.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Cedar Creek Grille Hostess en su currículum?", answer: "Debe incluir habilidades de atención al cliente, experiencia previa en restaurantes, y logros cuantificables en la mejora de la satisfacción del cliente." },
      { question: "¿Cómo destacar mi currículum de Cedar Creek Grille Hostess?", answer: "Enfatiza tus logros en roles anteriores y destaca tus habilidades de comunicación y servicio al cliente." },
      { question: "¿Qué habilidades necesita un Cedar Creek Grille Hostess?", answer: "Esenciales incluyen atención al cliente, multitarea, y trabajo en equipo, así como habilidades de organización y gestión del tiempo." },
    ],
  },
  "chef-resume": {
    slug: "curriculum-chef",
    title: "Currículum de Chef",
    keywords: ["currículum de chef", "CV de chef", "ejemplo currículum chef", "plantilla CV chef"],
    searchIntents: ["cómo escribir currículum de chef", "ejemplos currículum chef", "mejor formato CV chef"],
    topSkills: ["experiencia culinaria", "desarrollo de menús", "seguridad alimentaria", "gestión de inventarios", "capacitación de personal", "servicio al cliente", "control de costos", "emplatado y presentación", "gestión de cocina", "creación de recetas"],
    atsKeywords: ["culinario", "chef", "cocina", "preparación de alimentos", "gastronomía", "sous chef", "cocinero de línea", "gestión de banquetes", "regulaciones de salud", "gestión del tiempo", "comunicación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Chef",
      summary: "Chef dedicado con más de 8 años de experiencia en entornos de cocina de alta presión, reconocido por mejorar la eficiencia de la cocina en un 30% y aumentar los índices de satisfacción de los huéspedes en un 20%.",
      skills: ["experticia culinaria", "desarrollo de menús", "seguridad alimentaria", "gestión de inventarios", "capacitación de personal", "servicio al cliente", "control de costos", "emplatado y presentación", "gestión de cocina", "creación de recetas"],
      experience: [
        {
          title: "Chef Principal",
          company: "Gourmet Bistro",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 25% a través de un diseño de menú innovador.",
            "Reduje el desperdicio de alimentos en un 15% implementando un nuevo sistema de inventario.",
            "Capacité y gestioné un equipo de 10 trabajadores de cocina, lo que llevó a un aumento del 20% en la eficiencia de la cocina.",
          ],
        },
        {
          title: "Sous Chef",
          company: "Fine Dine Restaurant",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en el desarrollo de un menú de temporada que aumentó las ventas en un 30%.",
            "Implementé nuevas técnicas de cocina que mejoraron el tiempo de respuesta de los platos en un 15%.",
            "Contribuí a eventos de catering que aumentaron los ingresos de la empresa en $50,000.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "A.A.S.", field: "Artes Culinarias", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de chef?", answer: "Un currículum de chef debe incluir experiencia laboral, habilidades culinarias, educación y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de chef?", answer: "Utiliza un formato claro, destaca tus logros y adapta tu currículum a la oferta de trabajo." },
      { question: "¿Qué habilidades necesita un currículum de chef?", answer: "Habilidades como gestión de cocina, creatividad en el menú, y conocimiento de seguridad alimentaria son esenciales." },
    ],
  },
  "community-food-project-worker": {
    slug: "trabajador-de-proyectos-alimentarios-comunitarios",
    title: "Trabajador de Proyectos Alimentarios Comunitarios",
    keywords: ["currículum de Trabajador de Proyectos Alimentarios Comunitarios", "CV de Trabajador de Proyectos Alimentarios Comunitarios", "ejemplo currículum Trabajador de Proyectos Alimentarios Comunitarios", "plantilla CV Trabajador de Proyectos Alimentarios Comunitarios"],
    searchIntents: ["cómo escribir currículum de Trabajador de Proyectos Alimentarios Comunitarios", "ejemplos currículum Trabajador de Proyectos Alimentarios Comunitarios", "mejor formato CV Trabajador de Proyectos Alimentarios Comunitarios"],
    topSkills: ["Compromiso Comunitario", "Educación Nutricional", "Gestión de Proyectos", "Redacción de Subsidios", "Análisis de Datos", "Coordinación de Eventos", "Gestión de Voluntarios", "Regulaciones de Seguridad Alimentaria", "Alcance Comunitario", "Evaluación de Programas"],
    atsKeywords: ["seguridad alimentaria", "programas comunitarios", "gestión de organizaciones sin fines de lucro", "colaboración con partes interesadas", "gestión de presupuestos", "estrategias de divulgación", "desarrollo de asociaciones", "evaluación de impacto", "distribución de alimentos", "iniciativas de sostenibilidad", "educación en salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador de Proyectos Alimentarios Comunitarios",
      summary: "Trabajador de Proyectos Alimentarios Comunitarios dedicado con más de 5 años de experiencia en mejorar la seguridad alimentaria y la salud comunitaria. Lideré proyectos con éxito que resultaron en un aumento del 30% en el acceso a alimentos para poblaciones desatendidas.",
      skills: ["Compromiso Comunitario", "Educación Nutricional", "Gestión de Proyectos", "Redacción de Subsidios", "Análisis de Datos", "Coordinación de Eventos", "Gestión de Voluntarios", "Regulaciones de Seguridad Alimentaria", "Alcance Comunitario", "Evaluación de Programas"],
      experience: [
        {
          title: "Trabajador de Proyectos Alimentarios Comunitarios Senior",
          company: "Food for All Network",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la distribución de alimentos en un 40% durante el primer año, sirviendo a más de 5,000 familias.",
            "Desarrollé e implementé un programa de educación nutricional que mejoró los hábitos dietéticos de 300 participantes.",
            "Aseguré $150,000 en subvenciones para financiar jardines comunitarios e iniciativas de acceso a alimentos.",
          ],
        },
        {
          title: "Coordinador de Alcance Comunitario",
          company: "Local Harvest Initiative",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Organicé colectas de alimentos mensuales que recolectaron más de 20,000 libras de alimentos para refugios locales.",
            "Establecí asociaciones con 15 negocios locales para apoyar programas comunitarios de alimentos.",
            "Facilité talleres sobre preparación y almacenamiento de alimentos, alcanzando a más de 200 miembros de la comunidad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Nutrición y Dietética", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nutrition Specialist", issuer: "Certification Board for Nutrition Specialists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Community Food Project Worker en su currículum?", answer: "Incluir experiencia en gestión de proyectos, habilidades de compromiso comunitario y logros en distribución de alimentos." },
      { question: "¿Cómo destacar mi currículum de Community Food Project Worker?", answer: "Resaltar logros cuantificables y habilidades relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Community Food Project Worker?", answer: "Compromiso comunitario, educación nutricional y gestión de proyectos son esenciales." },
    ],
  },
  "cruise-ship-attendant": {
    slug: "asistente-de-crucero",
    title: "Asistente de Crucero",
    keywords: ["currículum de asistente de crucero", "CV de asistente de crucero", "ejemplo currículum asistente de crucero", "plantilla CV asistente de crucero"],
    searchIntents: ["cómo escribir currículum de asistente de crucero", "ejemplos currículum asistente de crucero", "mejor formato CV asistente de crucero"],
    topSkills: ["Atención al Cliente", "Gestión de Hospitalidad", "Trabajo en Equipo", "Habilidades de Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Multilingüe", "Atención al Detalle", "Resolución de Conflictos", "Habilidades de Ventas"],
    atsKeywords: ["cruise ship", "guest relations", "service excellence", "itinerary management", "safety protocols", "food and beverage service", "room preparation", "event coordination", "cleaning standards", "team collaboration", "customer satisfaction"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Crucero",
      summary: "Asistente de Crucero dedicado con más de 5 años de experiencia en la prestación de servicios excepcionales a los huéspedes en líneas de cruceros de lujo. Alcancé un 95% de satisfacción del cliente a través de una entrega de servicio efectiva y una resolución proactiva de problemas.",
      skills: ["Atención al Cliente", "Gestión de Hospitalidad", "Trabajo en Equipo", "Habilidades de Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Multilingüe", "Atención al Detalle", "Resolución de Conflictos", "Habilidades de Ventas"],
      experience: [
        {
          title: "Asistente de Crucero Senior",
          company: "Royal Caribbean International",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción de los huéspedes en un 15% a través de un servicio personalizado y atención al detalle.",
            "Gestioné la incorporación y capacitación de nuevos asistentes, reduciendo el tiempo de entrenamiento en un 20%.",
            "Maneje con éxito más de 200 solicitudes de huéspedes por crucero, asegurando un servicio oportuno y eficiente.",
          ],
        },
        {
          title: "Asistente de Crucero",
          company: "Carnival Cruise Line",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un 90% de tasa de retroalimentación positiva de los huéspedes basado en la calidad del servicio.",
            "Optimicé las operaciones de servicio a la habitación, resultando en una reducción del 25% en el tiempo de entrega.",
            "Coordiné con el personal de cocina para gestionar el servicio de alimentos para más de 300 huéspedes diariamente.",
          ],
        },
      ],
      education: [
        { institution: "University of Florida", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospitality Supervisor", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Crucero en su currículum?", answer: "Un Asistente de Crucero debe incluir su experiencia en atención al cliente, habilidades de servicio y cualquier formación relevante." },
      { question: "¿Cómo destacar mi currículum de Asistente de Crucero?", answer: "Utiliza palabras clave relevantes, destaca logros específicos y asegura que el formato sea claro y profesional." },
      { question: "¿Qué habilidades necesita un Asistente de Crucero?", answer: "Habilidades clave incluyen atención al cliente, gestión del tiempo, y capacidad para trabajar en equipo." },
    ],
  },
  "developpeur-chef-de-projet-fr": {
    slug: "desarrollador-jefe-de-proyecto",
    title: "Desarrollador Jefe de Proyecto",
    keywords: ["currículum de Desarrollador Jefe de Proyecto", "CV de Desarrollador Jefe de Proyecto", "ejemplo currículum Desarrollador Jefe de Proyecto", "plantilla CV Desarrollador Jefe de Proyecto"],
    searchIntents: ["cómo escribir currículum de Desarrollador Jefe de Proyecto", "ejemplos currículum Desarrollador Jefe de Proyecto", "mejor formato CV Desarrollador Jefe de Proyecto"],
    topSkills: ["Gestión de proyecto", "Desarrollo software", "Análisis de necesidades", "Concepción técnica", "Programación Java", "Gestión de equipo", "Ágil/Scrum", "Comunicación interpersonales", "Resolución de problemas", "Documentación técnica"],
    atsKeywords: ["Desarrollador", "Jefe de proyecto", "Gestión de proyecto", "Desarrollo", "Ágil", "Scrum", "Java", "Python", "Análisis de datos", "Comunicación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Desarrollador Jefe de Proyecto",
      summary: "Desarrollador Jefe de Proyecto con 5 años de experiencia y un aumento de la productividad del 30% gracias a la implementación de soluciones innovadoras.",
      skills: ["Gestión de proyecto", "Desarrollo software", "Análisis de necesidades", "Concepción técnica", "Programación Java", "Gestión de equipo", "Ágil/Scrum", "Comunicación interpersonales", "Resolución de problemas", "Documentación técnica"],
      experience: [
        {
          title: "Jefe de Proyecto Senior",
          company: "Capgemini",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumento de la satisfacción del cliente del 25% al mejorar la comunicación del proyecto",
            "Reducción de los plazos de entrega del 15% en proyectos clave",
            "Implementación de una metodología Ágil que aumentó la eficiencia del equipo en un 30%",
          ],
        },
        {
          title: "Desarrollador software",
          company: "Sopra Steria",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollo de una aplicación web que generó ingresos adicionales de 100,000 € al año",
            "Reducción de los costos de mantenimiento del 20% gracias a la optimización del código",
            "Colaboración con equipos interfuncionales para entregar 10 proyectos exitosos",
          ],
        },
      ],
      education: [
        { institution: "Université Paris-Saclay", degree: "B.S.", field: "Informática", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certification Scrum Master", issuer: "Scrum Alliance", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Desarrollador Jefe de Proyecto en su currículum?", answer: "Incluye experiencia relevante, habilidades técnicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Desarrollador Jefe de Proyecto?", answer: "Utiliza palabras clave del sector y resalta tus logros más impactantes." },
      { question: "¿Qué habilidades necesita un Desarrollador Jefe de Proyecto?", answer: "Habilidades en gestión de proyectos, desarrollo de software, y liderazgo de equipos." },
    ],
  },
  "fast-food-cashier": {
    slug: "cajero-de-comida-rapida",
    title: "Cajero de Comida Rápida",
    keywords: ["currículum de cajero de comida rápida", "CV de cajero de comida rápida", "ejemplo currículum cajero de comida rápida", "plantilla CV cajero de comida rápida"],
    searchIntents: ["cómo escribir currículum de cajero de comida rápida", "ejemplos currículum cajero de comida rápida", "mejor formato CV cajero de comida rápida"],
    topSkills: ["Atención al Cliente", "Manejo de Efectivo", "Sistemas de Punto de Venta (POS)", "Cumplimiento de Seguridad Alimentaria", "Multitarea", "Trabajo en Equipo", "Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle"],
    atsKeywords: ["comida rápida", "cajero", "atención al cliente", "POS", "seguridad alimentaria", "multitarea", "trabajador en equipo", "habilidades de comunicación", "ventas", "gestión de inventario", "gestión del tiempo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Cajero de Comida Rápida",
      summary: "Cajero de Comida Rápida dedicado con más de 3 años de experiencia en restaurantes de alto volumen, reconocido por aumentar la satisfacción del cliente en un 20% mediante un servicio eficiente y fuertes habilidades de comunicación.",
      skills: ["Atención al Cliente", "Manejo de Efectivo", "Sistemas de Punto de Venta (POS)", "Cumplimiento de Seguridad Alimentaria", "Multitarea", "Trabajo en Equipo", "Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle"],
      experience: [
        {
          title: "Cajero Senior",
          company: "McDonald's",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas adicionales en un 25%, generando $15,000 en ingresos adicionales durante el año.",
            "Entrené e incorporé a 10 nuevos empleados, mejorando la eficiencia del equipo en un 30%.",
            "Mantuve una calificación de satisfacción del cliente del 95% a través de un excelente servicio.",
          ],
        },
        {
          title: "Cajero",
          company: "Burger King",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Procesé más de 300 transacciones diarias con una tasa de precisión del 99%.",
            "Implementé un nuevo sistema de seguimiento de inventario que redujo el desperdicio en un 15%.",
            "Recibí el premio de empleado del mes dos veces por rendimiento excepcional.",
          ],
        },
      ],
      education: [
        { institution: "Community College", degree: "A.A.", field: "Gestión Empresarial", startDate: "2016-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Food Safety Certification", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Cajero de Comida Rápida en su currículum?", answer: "Un Cajero de Comida Rápida debe incluir experiencia en atención al cliente, manejo de efectivo y habilidades de comunicación." },
      { question: "¿Cómo destacar mi currículum de Cajero de Comida Rápida?", answer: "Utiliza palabras clave relevantes, resalta tus logros y asegúrate de que sea claro y conciso." },
      { question: "¿Qué habilidades necesita un Cajero de Comida Rápida?", answer: "Las habilidades clave incluyen atención al cliente, manejo de efectivo, multitarea y trabajo en equipo." },
    ],
  },
  "food-and-safety-specialist-staritech": {
    slug: "especialista-en-seguridad-alimentaria",
    title: "Especialista en Seguridad Alimentaria",
    keywords: ["currículum de especialista en seguridad alimentaria", "CV de especialista en seguridad alimentaria", "ejemplo currículum especialista en seguridad alimentaria", "plantilla CV especialista en seguridad alimentaria"],
    searchIntents: ["cómo escribir currículum de especialista en seguridad alimentaria", "ejemplos currículum especialista en seguridad alimentaria", "mejor formato CV especialista en seguridad alimentaria"],
    topSkills: ["regulaciones de seguridad alimentaria", "Punto de Control Crítico de Análisis de Peligros (HACCP)", "procedimientos de saneamiento", "evaluación de riesgos", "control de calidad", "capacitación y desarrollo", "auditoría y cumplimiento", "análisis de datos", "comunicación interpersonal", "resolución de problemas"],
    atsKeywords: ["seguridad alimentaria", "HACCP", "saneamiento", "gestión de riesgos", "cumplimiento", "auditoría", "regulaciones", "aseguramiento de calidad", "capacitación", "inspección", "análisis de datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Seguridad Alimentaria",
      summary: "Especialista en Seguridad Alimentaria dedicado con más de 5 años de experiencia en cumplimiento de seguridad alimentaria y aseguramiento de calidad. Reduje con éxito los incidentes de contaminación en un 30% mediante la implementación de protocolos de saneamiento rigurosos.",
      skills: ["regulaciones de seguridad alimentaria", "Punto de Control Crítico de Análisis de Peligros (HACCP)", "procedimientos de saneamiento", "evaluación de riesgos", "control de calidad", "capacitación y desarrollo", "auditoría y cumplimiento", "análisis de datos", "comunicación interpersonal", "resolución de problemas"],
      experience: [
        {
          title: "Especialista Sénior en Seguridad Alimentaria",
          company: "Nestlé",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo programa de capacitación que aumentó el cumplimiento del personal con los protocolos de seguridad en un 40%",
            "Realicé más de 200 auditorías, lo que llevó a una reducción del 25% en problemas de no cumplimiento",
            "Desarrollé un sistema de gestión de seguridad alimentaria que mejoró las puntuaciones de inspección en un 15%",
          ],
        },
        {
          title: "Coordinador de Seguridad Alimentaria",
          company: "Sysco",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné la capacitación en seguridad alimentaria para más de 150 empleados, resultando en una disminución del 20% en violaciones de seguridad",
            "Asistí en la implementación de una nueva política de seguridad alimentaria que mejoró la trazabilidad de productos",
            "Lideré un proyecto que redujo el desperdicio de alimentos en un 10% mediante una gestión eficaz del inventario",
          ],
        },
      ],
      education: [
        { institution: "University of California, Davis", degree: "B.S.", field: "Ciencia de los Alimentos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Food Safety Manager", issuer: "National Registry of Food Safety Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Food And Safety Specialist en su currículum?", answer: "Debe incluir experiencia relevante, habilidades específicas y certificaciones en seguridad alimentaria." },
      { question: "¿Cómo destacar mi currículum de Food And Safety Specialist?", answer: "Destacando logros cuantificables y utilizando palabras clave relacionadas con la seguridad alimentaria." },
      { question: "¿Qué habilidades necesita un Food And Safety Specialist?", answer: "Necesita habilidades en regulaciones de seguridad alimentaria, gestión de riesgos, auditoría y comunicación." },
    ],
  },
  "food-curation-specialist-zerocater": {
    slug: "especialista-en-curacion-de-alimentos",
    title: "Especialista en Curación de Alimentos",
    keywords: ["currículum de Especialista en Curación de Alimentos", "CV de Especialista en Curación de Alimentos", "ejemplo currículum Especialista en Curación de Alimentos", "plantilla CV Especialista en Curación de Alimentos"],
    searchIntents: ["cómo escribir currículum de Especialista en Curación de Alimentos", "ejemplos currículum Especialista en Curación de Alimentos", "mejor formato CV Especialista en Curación de Alimentos"],
    topSkills: ["Conocimiento culinario", "Desarrollo de menús", "Maridaje de alimentos", "Análisis nutricional", "Gestión de proveedores", "Control de costos", "Compromiso del cliente", "Análisis de tendencias", "Aseguramiento de calidad", "Gestión de inventarios"],
    atsKeywords: ["curación de alimentos", "planificación de menús", "pruebas de sabor", "tendencias culinarias", "cadena de suministro", "seguridad alimentaria", "gestión de presupuesto", "relaciones con clientes", "desarrollo de recetas", "planificación de eventos", "servicios de catering"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Curación de Alimentos",
      summary: "Especialista en Curación de Alimentos dedicado con más de 5 años de experiencia en la creación de menús innovadores y mejora de la satisfacción del cliente, logrando un aumento del 30% en la retención de clientes a través de experiencias alimentarias personalizadas.",
      skills: ["Conocimiento culinario", "Desarrollo de menús", "Maridaje de alimentos", "Análisis nutricional", "Gestión de proveedores", "Control de costos", "Compromiso del cliente", "Análisis de tendencias", "Aseguramiento de calidad", "Gestión de inventarios"],
      experience: [
        {
          title: "Especialista Sénior en Curación de Alimentos",
          company: "Zerocater",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los índices de satisfacción del cliente en un 25% a través de la curación de menús personalizados.",
            "Desarrollé y ejecuté más de 100 eventos de catering únicos al año, generando $500,000 en ingresos.",
            "Optimicé las relaciones con proveedores, reduciendo los costos de alimentos en un 15% manteniendo la calidad.",
          ],
        },
        {
          title: "Especialista Culinario",
          company: "Blue Apron",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé más de 200 recetas originales, contribuyendo a un aumento del 20% en el crecimiento de suscripciones.",
            "Realicé una extensa investigación de mercado para identificar tendencias alimentarias, mejorando la diversidad del menú.",
            "Colaboré con chefs para mejorar los kits de comidas, logrando una calificación de cliente de 4.8 estrellas.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Artes Culinarias", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Food Protection Manager", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Food Curation Specialist en su currículum?", answer: "Un Especialista en Curación de Alimentos debe incluir su experiencia en desarrollo de menús, gestión de proveedores y habilidades de análisis de tendencias." },
      { question: "¿Cómo destacar mi currículum de Food Curation Specialist?", answer: "Es importante resaltar tus logros en la creación de menús innovadores y tu capacidad para mejorar la satisfacción del cliente." },
      { question: "¿Qué habilidades necesita un Food Curation Specialist?", answer: "Las habilidades clave incluyen conocimiento culinario, gestión de costos, y análisis de tendencias alimentarias." },
    ],
  },
  "food-preparation": {
    slug: "especialista-en-preparacion-de-alimentos",
    title: "Especialista en Preparación de Alimentos",
    keywords: ["currículum de Especialista en Preparación de Alimentos", "CV de Especialista en Preparación de Alimentos", "ejemplo currículum Especialista en Preparación de Alimentos", "plantilla CV Especialista en Preparación de Alimentos"],
    searchIntents: ["cómo escribir currículum de Especialista en Preparación de Alimentos", "ejemplos currículum Especialista en Preparación de Alimentos", "mejor formato CV Especialista en Preparación de Alimentos"],
    topSkills: ["Seguridad Alimentaria", "Planificación de Menús", "Técnicas de Cuchillo", "Gestión de Inventarios", "Técnicas de Cocina", "Gestión del Tiempo", "Colaboración en Equipo", "Prácticas de Saneamiento", "Control de Calidad", "Atención al Cliente"],
    atsKeywords: ["habilidades culinarias", "preparación de comidas", "gestión de cocina", "manejo de alimentos", "métodos de cocción", "desarrollo de recetas", "presentación de alimentos", "regulaciones de salud", "trabajo en equipo", "abastecimiento de ingredientes", "control de costos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Preparación de Alimentos",
      summary: "Especialista en Preparación de Alimentos dedicado con más de 5 años de experiencia en cocinas de alto volumen. Reconocido por mejorar la calidad de los alimentos y la satisfacción del cliente, lo que llevó a un aumento del 20% en clientes recurrentes.",
      skills: ["Seguridad Alimentaria", "Planificación de Menús", "Técnicas de Cuchillo", "Gestión de Inventarios", "Técnicas de Cocina", "Gestión del Tiempo", "Colaboración en Equipo", "Prácticas de Saneamiento", "Control de Calidad", "Atención al Cliente"],
      experience: [
        {
          title: "Especialista en Preparación de Alimentos Senior",
          company: "Gourmet Kitchen Co.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en la preparación de comidas en un 30% mediante procesos simplificados.",
            "Entrené a 10 nuevos miembros del personal de cocina, mejorando el tiempo de incorporación en un 50%.",
            "Reduje el desperdicio de alimentos en un 15% al implementar un nuevo sistema de seguimiento de inventario.",
          ],
        },
        {
          title: "Cocinero de Preparación de Alimentos",
          company: "Culinary Arts Bistro",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Recibí consistentemente una calificación de satisfacción del cliente del 95%.",
            "Asistí en el desarrollo del menú que aumentó las ventas en $100,000 anuales.",
            "Manteni altas normas de limpieza y organización en la cocina.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Artes Culinarias", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Especialista en Preparación de Alimentos en su currículum?", answer: "Debe incluir habilidades culinarias, experiencia en cocina, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Especialista en Preparación de Alimentos?", answer: "Enfatiza tus logros en eficiencia y satisfacción del cliente." },
      { question: "¿Qué habilidades necesita un Especialista en Preparación de Alimentos?", answer: "Habilidades en seguridad alimentaria, gestión de cocina, y trabajo en equipo son esenciales." },
    ],
  },
  "food-production": {
    slug: "curriculum-produccion-alimentos",
    title: "Currículum de Producción de Alimentos",
    keywords: ["currículum de producción de alimentos", "CV de producción de alimentos", "ejemplo currículum producción alimentos", "plantilla CV producción alimentos"],
    searchIntents: ["cómo escribir currículum de producción de alimentos", "ejemplos currículum producción alimentos", "mejor formato CV producción alimentos"],
    topSkills: ["Gestión de Seguridad Alimentaria", "Control de Calidad", "Gestión de la Cadena de Suministro", "Eficiencia Operacional", "Análisis Nutricional", "Desarrollo de Recetas", "Control de Costos", "Programación de Producción", "Liderazgo de Equipos", "Cumplimiento Normativo"],
    atsKeywords: ["producción de alimentos", "manufactura", "aseguramiento de calidad", "seguridad alimentaria", "gestión de inventarios", "cadena de suministro", "mejora de procesos", "manufactura esbelta", "reducción de costos", "gestión de equipos", "planificación de producción"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Producción de Alimentos",
      summary: "Especialista en producción de alimentos con más de 5 años de experiencia en la industria, conocido por mejorar la eficiencia de producción en un 20% y asegurar el cumplimiento de las regulaciones de seguridad.",
      skills: ["Gestión de Seguridad Alimentaria", "Control de Calidad", "Gestión de la Cadena de Suministro", "Eficiencia Operacional", "Análisis Nutricional", "Desarrollo de Recetas", "Control de Costos", "Programación de Producción", "Liderazgo de Equipos", "Cumplimiento Normativo"],
      experience: [
        {
          title: "Gerente Senior de Producción de Alimentos",
          company: "Fresh Foods Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la producción en un 25% mediante mejoras en los procesos.",
            "Reduje los costos operativos en $50,000 anuales al optimizar la cadena de suministro.",
            "Dirigí un equipo que logró una tasa de cumplimiento del 98% en auditorías de seguridad.",
          ],
        },
        {
          title: "Supervisor de Producción de Alimentos",
          company: "Gourmet Meals Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé un nuevo sistema de gestión de inventarios que redujo el desperdicio en un 30%.",
            "Entrené a 15 miembros del personal en protocolos de seguridad alimentaria, resultando en cero violaciones de salud.",
            "Desarrollé nuevas recetas que aumentaron los índices de satisfacción del cliente en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Ciencia de los Alimentos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Food Safety Manager", issuer: "National Registry of Food Safety Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Food Production Resume en su currículum?", answer: "Un currículum de producción de alimentos debe incluir experiencia en la industria, habilidades relevantes y certificaciones en seguridad alimentaria." },
      { question: "¿Cómo destacar mi currículum de Food Production Resume?", answer: "Destaca tus logros cuantificables y resalta tus habilidades específicas relacionadas con la producción de alimentos." },
      { question: "¿Qué habilidades necesita un Food Production Resume?", answer: "Las habilidades clave incluyen gestión de seguridad alimentaria, control de calidad, y eficiencia operativa." },
    ],
  },
  "food-service-manager": {
    slug: "gerente-de-servicio-de-alimentos",
    title: "Gerente de Servicio de Alimentos",
    keywords: ["currículum de gerente de servicio de alimentos", "CV de gerente de servicio de alimentos", "ejemplo currículum gerente de servicio de alimentos", "plantilla CV gerente de servicio de alimentos"],
    searchIntents: ["cómo escribir currículum de gerente de servicio de alimentos", "ejemplos currículum gerente de servicio de alimentos", "mejor formato CV gerente de servicio de alimentos"],
    topSkills: ["Gestión de Inventarios", "Capacitación de Personal", "Atención al Cliente", "Seguridad Alimentaria", "Presupuestación", "Planificación de Menú", "Resolución de Conflictos", "Gestión del Tiempo", "Relaciones con Proveedores", "Control de Calidad"],
    atsKeywords: ["servicio de alimentos", "gestión", "operaciones de cocina", "supervisión de personal", "satisfacción del cliente", "regulaciones de salud", "control de costos", "desarrollo de menús", "capacitación y desarrollo", "gestión de restaurantes", "cadena de suministro"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Servicio de Alimentos",
      summary: "Gerente de Servicio de Alimentos con más de 7 años de experiencia en la industria, reconocido por reducir costos en un 15% mientras mejoraba las calificaciones de satisfacción del cliente en un 20%. Capacidad comprobada para liderar equipos diversos para lograr la excelencia operativa.",
      skills: ["Gestión de Inventarios", "Capacitación de Personal", "Atención al Cliente", "Seguridad Alimentaria", "Presupuestación", "Planificación de Menú", "Resolución de Conflictos", "Gestión del Tiempo", "Relaciones con Proveedores", "Control de Calidad"],
      experience: [
        {
          title: "Gerente Senior de Servicio de Alimentos",
          company: "Gourmet Bistro",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción del cliente en un 25% durante un año.",
            "Reduje el desperdicio de alimentos en un 30% a través de procesos de inventario mejorados.",
            "Implementé un nuevo programa de capacitación que disminuyó la rotación de personal en un 15%.",
          ],
        },
        {
          title: "Gerente de Servicio de Alimentos",
          company: "Culinary Creations",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una reducción del 10% en los costos de alimentos mediante la renegociación de contratos con proveedores.",
            "Desarrollé un menú de temporada que aumentó las ventas en un 20% durante los meses pico.",
            "Lideré un equipo de 15 personas, asegurando el cumplimiento de las regulaciones de salud y seguridad.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión Culinaria", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Protection Manager Certification", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Food Service Manager en su currículum?", answer: "Incluya su experiencia laboral relevante, habilidades específicas del sector y logros medibles." },
      { question: "¿Cómo destacar mi currículum de Food Service Manager?", answer: "Asegúrese de resaltar sus logros en la gestión de costos y satisfacción del cliente." },
      { question: "¿Qué habilidades necesita un Food Service Manager?", answer: "Las habilidades clave incluyen gestión de inventarios, atención al cliente, y cumplimiento de regulaciones de salud." },
    ],
  },
  "free-hotel-manager": {
    slug: "gerente-de-hotel-libre",
    title: "Gerente de Hotel Libre",
    keywords: ["currículum de gerente de hotel", "CV de gerente de hotel", "ejemplo currículum gerente de hotel", "plantilla CV gerente de hotel"],
    searchIntents: ["cómo escribir currículum de gerente de hotel", "ejemplos currículum gerente de hotel", "mejor formato CV gerente de hotel"],
    topSkills: ["Atención al Cliente", "Gestión de Presupuestos", "Capacitación de Personal", "Eficiencia Operacional", "Resolución de Conflictos", "Estrategia de Ventas", "Control de Inventarios", "Planificación de Eventos", "Aseguramiento de Calidad", "Gestión de Ingresos"],
    atsKeywords: ["gestión hotelera", "hospitalidad", "relaciones con los huéspedes", "gestión de personal", "análisis financiero", "marketing", "liderazgo de equipo", "satisfacción del cliente", "gestión de propiedades", "estrategia operacional", "gestión de riesgos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Hotel Libre",
      summary: "Gerente de hotel experimentado con más de 7 años en la industria de la hospitalidad, aumentando consistentemente las puntuaciones de satisfacción de los huéspedes en un 20% y reduciendo los costos operativos en un 15%. Historial comprobado en desarrollo de personal y mejora de ingresos.",
      skills: ["Atención al Cliente", "Gestión de Presupuestos", "Capacitación de Personal", "Eficiencia Operacional", "Resolución de Conflictos", "Estrategia de Ventas", "Control de Inventarios", "Planificación de Eventos", "Aseguramiento de Calidad", "Gestión de Ingresos"],
      experience: [
        {
          title: "Gerente Senior de Hotel",
          company: "Hilton Worldwide",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de ocupación en un 25% a través de estrategias de marketing específicas.",
            "Reducí la rotación de personal en un 30% implementando programas de compromiso para empleados.",
            "Logré un promedio de 4.8 sobre 5 en las puntuaciones de satisfacción de los huéspedes.",
          ],
        },
        {
          title: "Asistente de Gerente de Hotel",
          company: "Marriott International",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimicé los procesos de check-in, reduciendo los tiempos de espera en un 40%.",
            "Coordiné eventos que generaron ingresos adicionales de $100,000.",
            "Mejoré los programas de capacitación, lo que llevó a un aumento del 15% en el rendimiento general del personal.",
          ],
        },
      ],
      education: [
        { institution: "Cornell University", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hotel Administrator", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Free Hotel Manager en su currículum?", answer: "Un Free Hotel Manager debe incluir su experiencia laboral relevante, habilidades específicas del sector, logros cuantificables y certificaciones pertinentes." },
      { question: "¿Cómo destacar mi currículum de Free Hotel Manager?", answer: "Para destacar su currículum, resalte logros específicos, utilice palabras clave relevantes y adapte su experiencia a las necesidades del puesto." },
      { question: "¿Qué habilidades necesita un Free Hotel Manager?", answer: "Un Free Hotel Manager necesita habilidades en atención al cliente, gestión de presupuestos, liderazgo de equipo y resolución de conflictos." },
    ],
  },
  "free-restaurant-cook": {
    slug: "cocinero-restaurante-libre",
    title: "Cocinero de Restaurante Libre",
    keywords: ["currículum de cocinero de restaurante libre", "CV de cocinero de restaurante libre", "ejemplo currículum cocinero de restaurante libre", "plantilla CV cocinero de restaurante libre"],
    searchIntents: ["cómo escribir currículum de cocinero de restaurante libre", "ejemplos currículum cocinero de restaurante libre", "mejor formato CV cocinero de restaurante libre"],
    topSkills: ["habilidades culinarias", "preparación de alimentos", "planificación de menús", "gestión de cocina", "seguridad alimentaria", "servicio al cliente", "gestión del tiempo", "colaboración en equipo", "creatividad", "atención al detalle"],
    atsKeywords: ["cocina", "preparación de comidas", "operaciones de cocina", "manejo de alimentos", "gestión de inventarios", "regulaciones de salud", "desarrollo de recetas", "asar", "hornear", "saltear", "presentación de alimentos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Cocinero de Restaurante Libre",
      summary: "Cocinero de restaurante experimentado con más de 5 años en entornos de cocina de ritmo rápido, especializado en cocina italiana. Logré consistentemente un aumento del 20% en las puntuaciones de satisfacción del cliente a través de la preparación de comidas de calidad.",
      skills: ["habilidades culinarias", "preparación de alimentos", "planificación de menús", "gestión de cocina", "seguridad alimentaria", "servicio al cliente", "gestión del tiempo", "colaboración en equipo", "creatividad", "atención al detalle"],
      experience: [
        {
          title: "Cocinero Senior",
          company: "Olive Garden",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de la cocina en un 30% mediante la mejora de los procesos de preparación.",
            "Gestioné un equipo de 5 cocineros, resultando en una reducción del 15% en el desperdicio de alimentos.",
            "Recibí el premio Empleado del Mes por la calidad excepcional de los alimentos y el servicio.",
          ],
        },
        {
          title: "Cocinero de Línea",
          company: "Red Lobster",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Preparé consistentemente más de 200 comidas por turno con una tasa de precisión del 98%.",
            "Implementé un nuevo sistema de seguimiento de inventario que redujo costos en $500 mensuales.",
            "Capacité a 10 nuevos miembros del personal en los estándares de preparación de alimentos y seguridad en la cocina.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "A.A.S.", field: "Artes Culinarias", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Cocinero de Restaurante Libre en su currículum?", answer: "Un Cocinero de Restaurante Libre debe incluir su experiencia laboral, habilidades culinarias, formación académica y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Cocinero de Restaurante Libre?", answer: "Para destacar, utilice palabras clave relevantes, enfoque en logros cuantificables y mantenga un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un Cocinero de Restaurante Libre?", answer: "Las habilidades clave incluyen la preparación de alimentos, gestión de cocina, atención al cliente, y creatividad culinaria." },
    ],
  },
  "free-waiter": {
    slug: "camarero-libre",
    title: "Camarero Libre",
    keywords: ["currículum de camarero libre", "CV de camarero libre", "ejemplo currículum camarero libre", "plantilla CV camarero libre"],
    searchIntents: ["cómo escribir currículum de camarero libre", "ejemplos currículum camarero libre", "mejor formato CV camarero libre"],
    topSkills: ["servicio al cliente", "comunicación", "gestión del tiempo", "trabajo en equipo", "atención al detalle", "resolución de problemas", "multitarea", "seguridad alimentaria", "manejo de efectivo", "conocimiento del menú"],
    atsKeywords: ["camarero", "personal de camareros", "servicio de restaurante", "hospitalidad", "interacción con clientes", "toma de pedidos", "entrega de alimentos", "satisfacción del cliente", "presentación de alimentos", "caja registradora", "artículos del menú"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Camarero Libre",
      summary: "Camarero dedicado con más de 5 años de experiencia en restaurantes de alto volumen, reconocido por mejorar los índices de satisfacción del cliente en un 30%. Capacidad comprobada para manejar múltiples mesas de manera eficiente.",
      skills: ["servicio al cliente", "comunicación", "gestión del tiempo", "trabajo en equipo", "atención al detalle", "resolución de problemas", "multitarea", "seguridad alimentaria", "manejo de efectivo", "conocimiento del menú"],
      experience: [
        {
          title: "Camarero Senior",
          company: "Olive Garden",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los índices de satisfacción del cliente en un 30% a través de un servicio atento.",
            "Gestioné un equipo de 5 camareros para optimizar el servicio durante las horas pico.",
            "Logré un 95% de retroalimentación positiva en encuestas de clientes.",
          ],
        },
        {
          title: "Camarero",
          company: "Cheesecake Factory",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé constantemente los objetivos de ventas en un 15% mediante la venta adicional efectiva.",
            "Capacité a nuevo personal sobre los artículos del menú y los procedimientos de servicio.",
            "Reduje los errores en los pedidos en un 20% mediante una cuidadosa atención al detalle.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión de la Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un camarero libre en su currículum?", answer: "Incluir experiencia en servicio al cliente, habilidades de comunicación y manejo de efectivo." },
      { question: "¿Cómo destacar mi currículum de camarero libre?", answer: "Resaltar logros específicos y cuantificables en el servicio al cliente y ventas." },
      { question: "¿Qué habilidades necesita un camarero libre?", answer: "Habilidades clave incluyen atención al detalle, multitarea y capacidad para trabajar en equipo." },
    ],
  },
  "front-desk-assistant": {
    slug: "asistente-de-recepcion",
    title: "Asistente de Recepción",
    keywords: ["currículum de asistente de recepción", "CV de asistente de recepción", "ejemplo currículum asistente de recepción", "plantilla CV asistente de recepción"],
    searchIntents: ["cómo escribir currículum de asistente de recepción", "ejemplos currículum asistente de recepción", "mejor formato CV asistente de recepción"],
    topSkills: ["Servicio al Cliente", "Comunicación", "Organización", "Múltiples Tareas", "Resolución de Problemas", "Manejo del Tiempo", "Atención al Detalle", "Colaboración en Equipo", "Dominio de Computadoras", "Programación"],
    atsKeywords: ["Gestión de Recepción", "Funciones de Recepcionista", "Programación de Citas", "Relaciones con Clientes", "Administración de Oficina", "Soporte al Cliente", "Gestión de Base de Datos", "Manejo de Efectivo", "Arreglos de Viaje", "Resolución de Conflictos", "Etiqueta Telefónica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Recepción",
      summary: "Asistente de Recepción dedicado con más de 5 años de experiencia en proporcionar un servicio al cliente excepcional y apoyo administrativo. Historial comprobado de mejorar la eficiencia de la recepción en un 30% a través de la programación efectiva y la gestión de clientes.",
      skills: ["Servicio al Cliente", "Comunicación", "Organización", "Múltiples Tareas", "Resolución de Problemas", "Manejo del Tiempo", "Atención al Detalle", "Colaboración en Equipo", "Dominio de Computadoras", "Programación"],
      experience: [
        {
          title: "Asistente de Recepción Senior",
          company: "Hilton Hotels",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los puntajes de satisfacción de los huéspedes en un 15% a través de una capacitación mejorada en servicio al cliente.",
            "Gestioné más de 100 registros de huéspedes diarios, asegurando un proceso fluido y tiempos de espera mínimos.",
            "Implementé un nuevo sistema de programación que redujo los conflictos del personal en un 25%.",
          ],
        },
        {
          title: "Asistente de Recepción",
          company: "Marriott International",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve un registro preciso de las reservas de huéspedes, lo que llevó a un aumento del 20% en los clientes recurrentes.",
            "Ayudé a organizar eventos corporativos, mejorando la asistencia de huéspedes en un 30%.",
            "Manejé transacciones en efectivo de hasta $5,000 diarios con un 100% de precisión.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Front Desk Representative", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Front Desk Assistant en su currículum?", answer: "Un asistente de recepción debe incluir experiencia en servicio al cliente, habilidades administrativas y logros relevantes." },
      { question: "¿Cómo destacar mi currículum de Front Desk Assistant?", answer: "Para destacar, enfócate en tus logros y utiliza palabras clave relevantes para la industria." },
      { question: "¿Qué habilidades necesita un Front Desk Assistant?", answer: "Las habilidades clave incluyen servicio al cliente, organización, y manejo de conflictos." },
    ],
  },
  "front-desk-coordinator-zillow-group": {
    slug: "coordinador-de-recepcion",
    title: "Coordinador de Recepción",
    keywords: ["currículum de Coordinador de Recepción", "CV de Coordinador de Recepción", "ejemplo currículum Coordinador de Recepción", "plantilla CV Coordinador de Recepción"],
    searchIntents: ["cómo escribir currículum de Coordinador de Recepción", "ejemplos currículum Coordinador de Recepción", "mejor formato CV Coordinador de Recepción"],
    topSkills: ["Atención al Cliente", "Comunicación", "Habilidades Organizacionales", "Gestión del Tiempo", "Resolución de Problemas", "Multitarea", "Atención al Detalle", "Colaboración en Equipo", "Programación", "Soporte Administrativo"],
    atsKeywords: ["operaciones de recepción", "relaciones con los huéspedes", "administración de oficina", "programación", "entrada de datos", "soporte al cliente", "habilidades de comunicación", "resolución de conflictos", "gestión del tiempo", "multitarea", "experiencia del cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Coordinador de Recepción",
      summary: "Coordinador de Recepción dedicado con más de 5 años de experiencia en brindar un servicio al cliente excepcional y soporte administrativo. Historial comprobado en mejorar las calificaciones de satisfacción de los huéspedes en un 20% a través de habilidades efectivas de comunicación y resolución de problemas.",
      skills: ["Atención al Cliente", "Comunicación", "Habilidades Organizacionales", "Gestión del Tiempo", "Resolución de Problemas", "Multitarea", "Atención al Detalle", "Colaboración en Equipo", "Programación", "Soporte Administrativo"],
      experience: [
        {
          title: "Coordinador Senior de Recepción",
          company: "Hilton Hotels",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción de los huéspedes en un 25% a través de protocolos de servicio mejorados.",
            "Gestioné las operaciones de recepción de un hotel de alto volumen con más de 200 habitaciones.",
            "Entrené y mentoreé al nuevo personal de recepción, lo que resultó en una reducción del 15% en el tiempo de incorporación.",
          ],
        },
        {
          title: "Asociado de Recepción",
          company: "Marriott International",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Manejé un promedio de 100 interacciones con huéspedes diariamente, asegurando una experiencia de check-in y check-out sin problemas.",
            "Resolví quejas de huéspedes de manera efectiva, contribuyendo a un aumento del 30% en reservas recurrentes.",
            "Asistí en tareas administrativas, incluyendo programación y gestión de inventario.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hotel Administrator", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Coordinador de Recepción en su currículum?", answer: "Un Coordinador de Recepción debe incluir experiencia en atención al cliente, habilidades de comunicación, y logros específicos que demuestren su capacidad para mejorar la satisfacción del cliente." },
      { question: "¿Cómo destacar mi currículum de Coordinador de Recepción?", answer: "Destacar las habilidades relevantes, logros cuantificables y personalizar el currículum para cada oferta de trabajo son claves para destacar." },
      { question: "¿Qué habilidades necesita un Coordinador de Recepción?", answer: "Las habilidades clave incluyen atención al cliente, organización, habilidades de comunicación y capacidad para resolver problemas." },
    ],
  },
  "front-desk-manager": {
    slug: "gerente-de-recepcion",
    title: "Gerente de Recepción",
    keywords: ["currículum de gerente de recepción", "CV de gerente de recepción", "ejemplo currículum gerente de recepción", "plantilla CV gerente de recepción"],
    searchIntents: ["cómo escribir currículum de gerente de recepción", "ejemplos currículum gerente de recepción", "mejor formato CV gerente de recepción"],
    topSkills: ["Servicio al Cliente", "Habilidades Administrativas", "Resolución de Conflictos", "Liderazgo de Equipo", "Gestión del Tiempo", "Atención a los Detalles", "Multitarea", "Comunicación", "Resolución de Problemas", "Ventas y Upselling"],
    atsKeywords: ["operaciones de recepción", "relaciones con los huéspedes", "gestión del personal", "procedimientos de check-in", "sistemas de reservas", "facturación y cobros", "satisfacción del cliente", "gestión hotelera", "coordinación de eventos", "métricas de rendimiento", "capacitación y desarrollo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Recepción",
      summary: "Gerente de Recepción dedicado con más de 5 años de experiencia en hospitalidad, especializado en mejorar la experiencia del huésped y gestionar operaciones de recepción. Logró un aumento del 20% en las calificaciones de satisfacción del cliente a través de un liderazgo efectivo del equipo y capacitación.",
      skills: ["Servicio al Cliente", "Habilidades Administrativas", "Resolución de Conflictos", "Liderazgo de Equipo", "Gestión del Tiempo", "Atención a los Detalles", "Multitarea", "Comunicación", "Resolución de Problemas", "Ventas y Upselling"],
      experience: [
        {
          title: "Gerente de Recepción Senior",
          company: "Hilton Hotels",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción de los huéspedes en un 25% en 6 meses.",
            "Gestioné un equipo de 10 empleados de recepción, reduciendo la rotación en un 15% a través de programas de capacitación mejorados.",
            "Implementé un nuevo sistema de check-in que disminuyó los tiempos de espera en un 30%.",
          ],
        },
        {
          title: "Supervisor de Recepción",
          company: "Marriott International",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimicé los procesos de recepción, mejorando la eficiencia operativa en un 20%.",
            "Capacité y mentoreé a nuevos empleados, resultando en un aumento del 40% en la productividad del equipo.",
            "Manejé quejas de huéspedes de manera efectiva, manteniendo una tasa de satisfacción del 95%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospitality Supervisor", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Front Desk Manager en su currículum?", answer: "Un Front Desk Manager debe incluir su experiencia en gestión de recepciones, habilidades de servicio al cliente, y logros específicos en su carrera." },
      { question: "¿Cómo destacar mi currículum de Front Desk Manager?", answer: "Para destacar su currículum, enfóquese en logros cuantificables y resalte sus habilidades de liderazgo y atención al cliente." },
      { question: "¿Qué habilidades necesita un Front Desk Manager?", answer: "Un Front Desk Manager necesita habilidades en servicio al cliente, gestión del tiempo, resolución de conflictos y liderazgo de equipo." },
    ],
  },
  "front-desk-receptionist": {
    slug: "recepcionista-de-frente",
    title: "Recepcionista de Frente",
    keywords: ["currículum de recepcionista de frente", "CV de recepcionista de frente", "ejemplo currículum recepcionista de frente", "plantilla CV recepcionista de frente"],
    searchIntents: ["cómo escribir currículum de recepcionista de frente", "ejemplos currículum recepcionista de frente", "mejor formato CV recepcionista de frente"],
    topSkills: ["Servicio al Cliente", "Comunicación", "Multitarea", "Habilidades Organizativas", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle", "Colaboración en Equipo", "Dominio de Computadoras", "Programación"],
    atsKeywords: ["Recepcionista", "Recepción", "Soporte al Cliente", "Tareas Administrativas", "Manejo de Teléfono", "Programación de Citas", "Gestión de Oficina", "Entrada de Datos", "Gestión de Visitantes", "Relaciones con Clientes", "Resolución de Conflictos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Recepcionista de Frente",
      summary: "Recepcionista de Frente dedicada con más de 5 años de experiencia en proporcionar un servicio al cliente excepcional y gestionar las operaciones de la oficina frontal. Historial comprobado de mejorar las calificaciones de satisfacción del cliente en un 30% a través de habilidades efectivas de comunicación y resolución de problemas.",
      skills: ["Servicio al Cliente", "Comunicación", "Multitarea", "Habilidades Organizativas", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle", "Colaboración en Equipo", "Dominio de Computadoras", "Programación"],
      experience: [
        {
          title: "Recepcionista de Frente Senior",
          company: "Hilton Hotels",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción del cliente en un 20% a través de técnicas de servicio mejoradas.",
            "Gestioné la programación de más de 50 citas semanales con una tasa de precisión del 98%.",
            "Implementé un nuevo sistema de archivo que redujo el tiempo de recuperación de documentos en un 40%.",
          ],
        },
        {
          title: "Recepcionista de Frente",
          company: "Marriott International",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve un 95% de calificación de satisfacción del cliente al proporcionar un excelente servicio de recepción.",
            "Manejé un promedio de más de 100 llamadas diarias, dirigiendo eficientemente las consultas a los departamentos correspondientes.",
            "Asistí en la capacitación de nuevo personal, mejorando el tiempo de incorporación en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de la Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospitality Professional", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Front Desk Receptionist en su currículum?", answer: "Un Front Desk Receptionist debe incluir experiencia laboral relevante, habilidades de servicio al cliente y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Front Desk Receptionist?", answer: "Utiliza palabras clave relevantes, resalta tus logros y adapta tu currículum a la oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Front Desk Receptionist?", answer: "Necesita habilidades de comunicación, organización, manejo del tiempo y un fuerte enfoque en el servicio al cliente." },
    ],
  },
  "google-server-manufacturing-supervisor": {
    slug: "google-server-manufacturing-supervisor",
    title: "Supervisor de Fabricación de Servidores de Google",
    keywords: ["currículum de Supervisor de Fabricación de Servidores de Google", "CV de Supervisor de Fabricación de Servidores de Google", "ejemplo currículum Supervisor de Fabricación de Servidores de Google", "plantilla CV Supervisor de Fabricación de Servidores de Google"],
    searchIntents: ["cómo escribir currículum de Supervisor de Fabricación de Servidores de Google", "ejemplos currículum Supervisor de Fabricación de Servidores de Google", "mejor formato CV Supervisor de Fabricación de Servidores de Google"],
    topSkills: ["Control de Calidad", "Manufactura Esbelta", "Mejora de Procesos", "Liderazgo de Equipos", "Gestión de Proyectos", "Gestión de la Cadena de Suministro", "Resolución Técnica de Problemas", "Cumplimiento de Seguridad", "Análisis de Datos", "Programación de Producción"],
    atsKeywords: ["supervisor de fabricación", "gestión de producción", "optimización de procesos", "liderazgo de equipos", "aseguramiento de calidad", "control de inventario", "normas de seguridad", "metodologías esbeltas", "principios de ingeniería", "resolución de problemas", "métricas de rendimiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Supervisor de Fabricación de Servidores de Google",
      summary: "Supervisor de fabricación dedicado con más de 7 años de experiencia en la industria de fabricación de servidores, impulsando mejoras de productividad del 30% mientras se mantienen los estándares de seguridad y calidad.",
      skills: ["Control de Calidad", "Manufactura Esbelta", "Mejora de Procesos", "Liderazgo de Equipos", "Gestión de Proyectos", "Gestión de la Cadena de Suministro", "Resolución Técnica de Problemas", "Cumplimiento de Seguridad", "Análisis de Datos", "Programación de Producción"],
      experience: [
        {
          title: "Supervisor de Fabricación Senior",
          company: "Foxconn Technology Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró la eficiencia de producción en un 25% mediante la optimización de procesos.",
            "Lideró un equipo de más de 50 empleados en un entorno de fabricación de alto volumen, reduciendo las tasas de defectos en un 15%.",
            "Implementó programas de capacitación que aumentaron la productividad de los empleados en un 20%.",
          ],
        },
        {
          title: "Supervisor de Fabricación",
          company: "Dell Technologies",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Racionalizó los flujos de trabajo de producción, resultando en una reducción del 10% en el tiempo de ciclo.",
            "Gestionó los niveles de inventario de manera efectiva, reduciendo costos en $200,000 anualmente.",
            "Facilitó la colaboración entre departamentos para mejorar la calidad del producto.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Industrial", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Lean Six Sigma Green Belt", issuer: "ASQ", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Google Server Manufacturing Supervisor en su currículum?", answer: "Debe incluir experiencia relevante, habilidades específicas y logros cuantificables en el campo de fabricación." },
      { question: "¿Cómo destacar mi currículum de Google Server Manufacturing Supervisor?", answer: "Enfóquese en resultados medibles, use palabras clave de la industria y destaque su experiencia en liderazgo." },
      { question: "¿Qué habilidades necesita un Google Server Manufacturing Supervisor?", answer: "Habilidades clave incluyen control de calidad, gestión de la cadena de suministro, liderazgo de equipos y mejora de procesos." },
    ],
  },
  "head-bartender": {
    slug: "jefe-barman",
    title: "Jefe Barman",
    keywords: ["currículum de jefe barman", "CV de jefe barman", "ejemplo currículum jefe barman", "plantilla CV jefe barman"],
    searchIntents: ["cómo escribir currículum de jefe barman", "ejemplos currículum jefe barman", "mejor formato CV jefe barman"],
    topSkills: ["mixología", "atención al cliente", "gestión de inventarios", "creación de cócteles", "liderazgo de equipo", "manejo de efectivo", "montaje de bar", "diseño de menú", "resolución de problemas", "comunicación"],
    atsKeywords: ["bartending", "mixología", "recetas de cócteles", "interacción con clientes", "sistemas POS", "gestión de bar", "regulaciones de seguridad", "capacitación de personal", "satisfacción del cliente", "coordinación de eventos", "conocimiento de licores"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Jefe Barman",
      summary: "Jefe Barman experimentado con más de 5 años en bares y restaurantes de alto volumen, conocido por aumentar las ventas en un 30% mediante menús de cócteles innovadores y un servicio al cliente excepcional.",
      skills: ["mixología", "atención al cliente", "gestión de inventarios", "creación de cócteles", "liderazgo de equipo", "manejo de efectivo", "montaje de bar", "diseño de menú", "resolución de problemas", "comunicación"],
      experience: [
        {
          title: "Bartender Senior",
          company: "The Crafty Cocktail Bar",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas de cócteles en un 40% mediante la introducción de promociones de bebidas de temporada",
            "Gestioné un equipo de 5 bartenders y mejoré la tasa de retención del personal en un 20%",
            "Implementé un sistema de seguimiento de inventario que redujo el desperdicio en un 15%",
          ],
        },
        {
          title: "Bartender",
          company: "The Urban Bistro",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Recibí consistentemente un 95% de comentarios positivos en encuestas de servicio al cliente",
            "Entrené al nuevo personal en técnicas de bartending y estrategias de interacción con clientes",
            "Desarrollé un cóctel exclusivo que se convirtió en el más vendido del bar",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Bartending Certification", issuer: "National Bartenders School", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Head Bartender en su currículum?", answer: "Debe incluir su experiencia en bartending, habilidades de gestión de bar, y ejemplos de éxito en atención al cliente." },
      { question: "¿Cómo destacar mi currículum de Head Bartender?", answer: "Utilice palabras clave relevantes y destaque logros cuantificables en sus experiencias laborales." },
      { question: "¿Qué habilidades necesita un Head Bartender?", answer: "Las habilidades clave incluyen mixología, atención al cliente, y liderazgo de equipo." },
    ],
  },
  "head-housekeeper": {
    slug: "jefe-de-limpieza",
    title: "Jefe de Limpieza",
    keywords: ["currículum de Jefe de Limpieza", "CV de Jefe de Limpieza", "ejemplo currículum Jefe de Limpieza", "plantilla CV Jefe de Limpieza"],
    searchIntents: ["cómo escribir currículum de Jefe de Limpieza", "ejemplos currículum Jefe de Limpieza", "mejor formato CV Jefe de Limpieza"],
    topSkills: ["gestión de equipos", "control de inventario", "estándares de limpieza", "satisfacción del huésped", "gestión del tiempo", "capacitación y desarrollo", "programación", "resolución de problemas", "comunicación", "atención al detalle"],
    atsKeywords: ["gestión de limpieza", "supervisión de personal", "aseguramiento de calidad", "técnicas de limpieza", "gestión de presupuestos", "servicio al cliente", "estándares de sanidad", "regulaciones de salud y seguridad", "inspección de habitaciones", "gestión de cadena de suministro", "capacitación de empleados"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Jefe de Limpieza",
      summary: "Jefe de Limpieza dedicado con más de 8 años de experiencia en hoteles de lujo, mejorando la satisfacción del huésped en un 30% a través de una gestión eficiente del equipo y rigurosos protocolos de limpieza.",
      skills: ["gestión de equipos", "control de inventario", "estándares de limpieza", "satisfacción del huésped", "gestión del tiempo", "capacitación y desarrollo", "programación", "resolución de problemas", "comunicación", "atención al detalle"],
      experience: [
        {
          title: "Jefe de Limpieza Senior",
          company: "Grand Plaza Hotel",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la puntuación de satisfacción del huésped en un 25% mediante la implementación de nuevos estándares de limpieza.",
            "Reduje los costos de suministro en un 15% a través de una gestión efectiva del inventario.",
            "Dirigí un equipo de 15 limpiadores, aumentando la productividad en un 20%.",
          ],
        },
        {
          title: "Supervisor de Limpieza",
          company: "Riverside Resort",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un 98% de puntuación de limpieza en las inspecciones del hotel.",
            "Desarrollé programas de capacitación que redujeron el tiempo de incorporación en un 30%.",
            "Implementé un nuevo sistema de programación que mejoró la eficiencia del personal.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión Hotelera", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Executive Housekeeper", issuer: "International Executive Housekeepers Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Jefe de Limpieza en su currículum?", answer: "Un Jefe de Limpieza debe incluir su experiencia en gestión de equipos, estándares de limpieza y logros medibles en satisfacción del huésped." },
      { question: "¿Cómo destacar mi currículum de Jefe de Limpieza?", answer: "Destaca tus logros cuantificables y habilidades específicas, así como tu experiencia en el manejo de equipos y en la implementación de estándares de limpieza." },
      { question: "¿Qué habilidades necesita un Jefe de Limpieza?", answer: "Un Jefe de Limpieza necesita habilidades en gestión de equipos, atención al detalle, comunicación efectiva y conocimiento de estándares de limpieza." },
    ],
  },
  "hotel-concierge": {
    slug: "concierge-de-hotel",
    title: "Concierge de Hotel",
    keywords: ["currículum de concierge de hotel", "CV de concierge de hotel", "ejemplo currículum concierge de hotel", "plantilla CV concierge de hotel"],
    searchIntents: ["cómo escribir currículum de concierge de hotel", "ejemplos currículum concierge de hotel", "mejor formato CV concierge de hotel"],
    topSkills: ["Servicio al Cliente", "Comunicación Multilingüe", "Resolución de Problemas", "Conocimiento Local", "Dominio de Software de Concierge", "Gestión del Tiempo", "Atención al Detalle", "Redes de Contacto", "Planificación de Eventos", "Gestión de Crisis"],
    atsKeywords: ["hospitalidad", "relaciones con huéspedes", "servicios de concierge", "arreglos de viaje", "reservas", "satisfacción del cliente", "habilidades de comunicación", "colaboración en equipo", "resolución de conflictos", "atracciones locales", "servicio personalizado"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Concierge de Hotel",
      summary: "Concierge de hotel dedicado con más de 5 años de experiencia en la entrega de servicios excepcionales a huéspedes en hoteles de lujo. Reconocido consistentemente por lograr una tasa de satisfacción del huésped del 95% a través de asistencia personalizada y atención al detalle.",
      skills: ["Servicio al Cliente", "Comunicación Multilingüe", "Resolución de Problemas", "Conocimiento Local", "Dominio de Software de Concierge", "Gestión del Tiempo", "Atención al Detalle", "Redes de Contacto", "Planificación de Eventos", "Gestión de Crisis"],
      experience: [
        {
          title: "Concierge Senior",
          company: "The Grand Hotel",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción de los huéspedes en un 15% a través de interacciones personalizadas con los huéspedes.",
            "Coordiné con éxito más de 200 eventos de alto perfil anualmente, mejorando la reputación del hotel.",
            "Implementé un sistema de retroalimentación que mejoró el tiempo de entrega del servicio en un 20%.",
          ],
        },
        {
          title: "Concierge",
          company: "Luxury Suites Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné los arreglos de viaje para huéspedes VIP, asegurando experiencias sin inconvenientes.",
            "Logré un aumento del 30% en las reservas recurrentes a través de una entrega de servicio excepcional.",
            "Desarrollé relaciones sólidas con negocios locales para mejorar las experiencias de los huéspedes.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hotel Concierge", issuer: "Les Clefs d'Or", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Hotel Concierge en su currículum?", answer: "Un Hotel Concierge debe incluir su experiencia en servicio al cliente, habilidades de comunicación y logros en la gestión de eventos." },
      { question: "¿Cómo destacar mi currículum de Hotel Concierge?", answer: "Para destacar su currículum, enfóquese en resultados cuantificables y en habilidades específicas del sector." },
      { question: "¿Qué habilidades necesita un Hotel Concierge?", answer: "Un Hotel Concierge necesita habilidades en servicio al cliente, gestión del tiempo y comunicación efectiva." },
    ],
  },
  "hotel-food-beverage-supervisor-irvine-company": {
    slug: "hotel-food-beverage-supervisor",
    title: "Supervisor de Alimentos y Bebidas en Hotel",
    keywords: ["currículum de Supervisor de Alimentos y Bebidas en Hotel", "CV de Supervisor de Alimentos y Bebidas en Hotel", "ejemplo currículum Supervisor de Alimentos y Bebidas en Hotel", "plantilla CV Supervisor de Alimentos y Bebidas en Hotel"],
    searchIntents: ["cómo escribir currículum de Supervisor de Alimentos y Bebidas en Hotel", "ejemplos currículum Supervisor de Alimentos y Bebidas en Hotel", "mejor formato CV Supervisor de Alimentos y Bebidas en Hotel"],
    topSkills: ["Servicio al Cliente", "Gestión de Inventarios", "Capacitación de Personal", "Desarrollo de Menús", "Control de Calidad", "Presupuestación", "Relaciones con Proveedores", "Resolución de Conflictos", "Cumplimiento de Salud y Seguridad", "Optimización de Ventas"],
    atsKeywords: ["gestión de la hospitalidad", "operaciones de alimentos y bebidas", "liderazgo de equipo", "satisfacción del huésped", "rentabilidad", "capacitación de empleados", "planificación de menús", "control de costos", "excelencia en el servicio", "gestión de restaurantes", "coordinación de eventos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Supervisor de Alimentos y Bebidas en Hotel",
      summary: "Profesional de la hospitalidad dedicado con más de 5 años de experiencia en operaciones de alimentos y bebidas, logrando consistentemente un aumento del 20% en la satisfacción del cliente a través de una gestión efectiva del equipo y mejoras operacionales.",
      skills: ["Servicio al Cliente", "Gestión de Inventarios", "Capacitación de Personal", "Desarrollo de Menús", "Control de Calidad", "Presupuestación", "Relaciones con Proveedores", "Resolución de Conflictos", "Cumplimiento de Salud y Seguridad", "Optimización de Ventas"],
      experience: [
        {
          title: "Supervisor de Alimentos y Bebidas",
          company: "Marriott International",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas mensuales en un 30% a través de cambios estratégicos en el menú y técnicas de venta adicional.",
            "Capacité y lideré a un equipo de 15 miembros, lo que resultó en una disminución del 25% en la rotación de empleados.",
            "Implementé un nuevo sistema de gestión de inventarios que redujo el desperdicio en un 15%.",
          ],
        },
        {
          title: "Asistente de Gerente de Alimentos y Bebidas",
          company: "Hilton Hotels",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una calificación de satisfacción del cliente del 95% en encuestas anuales.",
            "Gestioné eventos que aumentaron los ingresos en $50,000 anuales.",
            "Optimicé las operaciones, lo que redujo los costos en un 10% sin sacrificar la calidad.",
          ],
        },
      ],
      education: [
        { institution: "California State University, Long Beach", degree: "B.S.", field: "Gestión de la Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Protection Manager", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Supervisor de Alimentos y Bebidas en su currículum?", answer: "Debe incluir experiencia relevante, habilidades en gestión de alimentos y bebidas, y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Supervisor de Alimentos y Bebidas?", answer: "Utilice palabras clave del sector, destaque logros específicos y mantenga un formato limpio y profesional." },
      { question: "¿Qué habilidades necesita un Supervisor de Alimentos y Bebidas?", answer: "Necesita habilidades en servicio al cliente, gestión de inventarios, y capacidad de liderazgo." },
    ],
  },
  "hotel-front-desk-clerk": {
    slug: "recepcionista-de-hotel",
    title: "Recepcionista de Hotel",
    keywords: ["currículum de recepcionista de hotel", "CV de recepcionista de hotel", "ejemplo currículum recepcionista de hotel", "plantilla CV recepcionista de hotel"],
    searchIntents: ["cómo escribir currículum de recepcionista de hotel", "ejemplos currículum recepcionista de hotel", "mejor formato CV recepcionista de hotel"],
    topSkills: ["Servicio al Cliente", "Comunicación", "Resolución de Problemas", "Multitarea", "Atención al Detalle", "Manejo de Efectivo", "Habilidades de Venta", "Gestión del Tiempo", "Trabajo en Equipo", "Dominio de Computadoras"],
    atsKeywords: ["hospitalidad", "servicios al huésped", "operaciones de recepción", "sistemas de reservas", "satisfacción del cliente", "procedimientos de check-in/check-out", "facturación", "resolución de conflictos", "coordinación de personal", "gestión hotelera", "manejo de quejas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Recepcionista de Hotel",
      summary: "Recepcionista de Hotel orientado a los detalles con más de 5 años de experiencia en proporcionar un servicio excepcional a los huéspedes y gestionar operaciones de recepción. Logré un aumento del 20% en las puntuaciones de satisfacción del cliente a través de habilidades efectivas de comunicación y resolución de problemas.",
      skills: ["Servicio al Cliente", "Comunicación", "Resolución de Problemas", "Multitarea", "Atención al Detalle", "Manejo de Efectivo", "Habilidades de Venta", "Gestión del Tiempo", "Trabajo en Equipo", "Dominio de Computadoras"],
      experience: [
        {
          title: "Recepcionista Senior",
          company: "Marriott International",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré las calificaciones de satisfacción de los huéspedes en un 25% mediante una entrega de servicio mejorada.",
            "Gestioné un promedio de 150 check-ins por día durante la temporada alta.",
            "Optimicé las operaciones de recepción, reduciendo el tiempo de check-in en un 30%.",
          ],
        },
        {
          title: "Recepcionista",
          company: "Hilton Hotels",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un 95% de puntuación positiva en las encuestas de huéspedes.",
            "Manejé transacciones en efectivo que superaron los $200,000 sin discrepancias.",
            "Asistí en la capacitación de nuevo personal, mejorando la eficiencia general del equipo.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión Hotelera", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospitality Supervisor", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Hotel Front Desk Clerk en su currículum?", answer: "Un recepcionista de hotel debe incluir su experiencia laboral, habilidades relevantes, educación y certificaciones en su currículum." },
      { question: "¿Cómo destacar mi currículum de Hotel Front Desk Clerk?", answer: "Para destacar, enfócate en logros cuantificables y habilidades específicas que se alineen con los requisitos del trabajo." },
      { question: "¿Qué habilidades necesita un Hotel Front Desk Clerk?", answer: "Las habilidades clave incluyen servicio al cliente, comunicación efectiva, manejo de efectivo y capacidades para resolver problemas." },
    ],
  },
  "hotel-front-door-greeter": {
    slug: "hotel-front-door-greeter",
    title: "Recepcionista de Entrada de Hotel",
    keywords: ["currículum de recepcionista de entrada de hotel", "CV de recepcionista de entrada de hotel", "ejemplo currículum recepcionista de entrada de hotel", "plantilla CV recepcionista de entrada de hotel"],
    searchIntents: ["cómo escribir currículum de recepcionista de entrada de hotel", "ejemplos currículum recepcionista de entrada de hotel", "mejor formato CV recepcionista de entrada de hotel"],
    topSkills: ["servicio al cliente", "comunicación", "gestión de la hospitalidad", "resolución de problemas", "multitarea", "atención al detalle", "habilidades interpersonales", "gestión del tiempo", "resolución de conflictos", "colaboración en equipo"],
    atsKeywords: ["saludo a los huéspedes", "interacción con el cliente", "operaciones de recepción", "servicios para huéspedes", "industria de la hospitalidad", "proceso de check-in", "manejo de quejas", "excelencia en el servicio", "apoyo al equipo", "coordinación de eventos", "satisfacción del huésped"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Recepcionista de Entrada de Hotel",
      summary: "Recepcionista de Entrada de Hotel dedicada con más de 5 años de experiencia en brindar un servicio al cliente excepcional y garantizar la satisfacción de los huéspedes. Reconocida por mejorar las puntuaciones de compromiso de los huéspedes en un 20% a través de interacciones personalizadas.",
      skills: ["servicio al cliente", "comunicación", "gestión de la hospitalidad", "resolución de problemas", "multitarea", "atención al detalle", "habilidades interpersonales", "gestión del tiempo", "resolución de conflictos", "colaboración en equipo"],
      experience: [
        {
          title: "Recepcionista de Entrada Senior",
          company: "The Grand Hotel",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción de los huéspedes en un 25% a través de un compromiso proactivo y un servicio personalizado.",
            "Gestioné con éxito el check-in y check-out de más de 200 huéspedes diarios, asegurando una experiencia fluida.",
            "Desarrollé e implementé un sistema de retroalimentación de huéspedes que mejoró la entrega del servicio en un 15%.",
          ],
        },
        {
          title: "Recepcionista de Entrada",
          company: "Sunny Resort",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Dediqué más de 150 huéspedes diariamente, recibiendo constantemente comentarios positivos por un excelente servicio.",
            "Asistí en la organización de eventos especiales, mejorando las experiencias de los huéspedes y aumentando las visitas de retorno en un 10%.",
            "Entrené a nuevo personal en los protocolos de servicio al cliente, contribuyendo a un equipo más eficiente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de la Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospitality Professional", issuer: "Hospitality Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Recepcionista de Entrada de Hotel en su currículum?", answer: "Un Recepcionista de Entrada de Hotel debe incluir su experiencia en atención al cliente, habilidades interpersonales y cualquier logro relevante en la satisfacción del huésped." },
      { question: "¿Cómo destacar mi currículum de Recepcionista de Entrada de Hotel?", answer: "Para destacar, enfatiza tus logros en aumentos de satisfacción del cliente y cualquier reconocimiento que hayas recibido en el servicio." },
      { question: "¿Qué habilidades necesita un Recepcionista de Entrada de Hotel?", answer: "Las habilidades clave incluyen servicio al cliente, comunicación efectiva, y la capacidad de manejar múltiples tareas a la vez." },
    ],
  },
  "housekeeping": {
    slug: "curriculum-housekeeping",
    title: "Currículum de Housekeeping",
    keywords: ["currículum de housekeeping", "CV de housekeeping", "ejemplo currículum housekeeping", "plantilla CV housekeeping"],
    searchIntents: ["cómo escribir currículum de housekeeping", "ejemplos currículum housekeeping", "mejor formato CV housekeeping"],
    topSkills: ["Atención al Detalle", "Gestión del Tiempo", "Técnicas de Limpieza", "Servicio al Cliente", "Organización", "Resolución de Problemas", "Comunicación", "Trabajo en Equipo", "Procedimientos de Seguridad", "Gestión de Inventarios"],
    atsKeywords: ["limpieza", "housekeeping", "mantenimiento", "organización", "atención al detalle", "satisfacción del cliente", "gestión del tiempo", "protocolos de seguridad", "colaboración en equipo", "control de inventarios", "aseguramiento de calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Housekeeping",
      summary: "Profesional de housekeeping dedicado con más de 5 años de experiencia en mantener la limpieza y organización en diversos entornos. Alcanzó una calificación del 95% en satisfacción del cliente a través de un servicio eficiente y atención al detalle.",
      skills: ["Atención al Detalle", "Gestión del Tiempo", "Técnicas de Limpieza", "Servicio al Cliente", "Organización", "Resolución de Problemas", "Comunicación", "Trabajo en Equipo", "Procedimientos de Seguridad", "Gestión de Inventarios"],
      experience: [
        {
          title: "Gobernanta Senior",
          company: "Marriott International",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de limpieza de las habitaciones en un 30% en 6 meses mediante programas de capacitación mejorados.",
            "Gestioné un equipo de 10 housekeepers, asegurando la finalización oportuna de las tareas diarias.",
            "Implementé medidas de control de inventarios que redujeron los costos de suministros en un 15%.",
          ],
        },
        {
          title: "Housekeeper",
          company: "Hilton Hotels",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Recibí el premio Empleado del Mes en dos ocasiones por un servicio excepcional.",
            "Alcancé un puntaje de limpieza del 98% durante las inspecciones del hotel.",
            "Optimicé los procesos de limpieza, reduciendo el tiempo promedio de limpieza de habitaciones en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "Community College", degree: "Grado Asociado", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Certified Hospitality Housekeeping Executive", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Housekeeping Resume en su currículum?", answer: "Un currículum de housekeeping debe incluir habilidades relevantes, experiencia laboral en limpieza, certificaciones y logros en el servicio al cliente." },
      { question: "¿Cómo destacar mi currículum de Housekeeping Resume?", answer: "Resalta tus logros, utiliza palabras clave del sector y asegúrate de que tu currículum sea claro y fácil de leer." },
      { question: "¿Qué habilidades necesita un Housekeeping Resume?", answer: "Las habilidades clave incluyen atención al detalle, comunicación efectiva, y gestión del tiempo." },
    ],
  },
  "junior-sql-server-database-administrator": {
    slug: "administrador-base-datos-sql-junior",
    title: "Administrador de Base de Datos SQL Server Junior",
    keywords: ["currículum de Administrador de Base de Datos SQL Server Junior", "CV de Administrador de Base de Datos SQL Server Junior", "ejemplo currículum Administrador de Base de Datos SQL Server Junior", "plantilla CV Administrador de Base de Datos SQL Server Junior"],
    searchIntents: ["cómo escribir currículum de Administrador de Base de Datos SQL Server Junior", "ejemplos currículum Administrador de Base de Datos SQL Server Junior", "mejor formato CV Administrador de Base de Datos SQL Server Junior"],
    topSkills: ["Gestión de SQL Server", "Copia de seguridad y recuperación de bases de datos", "Optimización del rendimiento", "Migración de datos", "Optimización de consultas", "Estrategias de indexación", "Seguridad de bases de datos", "Procesos ETL", "Modelado de datos", "Resolución de problemas"],
    atsKeywords: ["SQL", "Administración de bases de datos", "T-SQL", "Análisis de datos", "Soluciones de copia de seguridad", "Recuperación ante desastres", "Monitoreo de bases de datos", "Mejora de rendimiento", "Integridad de datos", "SSMS", "ETL"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Administrador de Base de Datos SQL Server Junior",
      summary: "Administrador de Base de Datos SQL Server Junior orientado a los detalles con 3 años de experiencia en gestión y optimización de bases de datos. Logré una mejora del 25% en el rendimiento de la base de datos mediante indexación efectiva y optimización de consultas.",
      skills: ["Gestión de SQL Server", "Copia de seguridad y recuperación de bases de datos", "Optimización del rendimiento", "Migración de datos", "Optimización de consultas", "Estrategias de indexación", "Seguridad de bases de datos", "Procesos ETL", "Modelado de datos", "Resolución de problemas"],
      experience: [
        {
          title: "Practicante de Administración de Bases de Datos",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré el tiempo de respuesta de consultas de bases de datos en un 30% mediante técnicas de optimización.",
            "Asistí en la migración exitosa de 10TB de datos a un nuevo servidor sin tiempo de inactividad.",
            "Desarrollé e implementé soluciones de copia de seguridad que redujeron el tiempo de recuperación de datos en un 40%.",
          ],
        },
        {
          title: "Desarrollador de Bases de Datos Junior",
          company: "Data Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al diseño y desarrollo de un nuevo sistema de bases de datos que soportó un crecimiento del 15% en la base de usuarios.",
            "Colaboré en un proyecto que mejoró las verificaciones de integridad de datos, reduciendo los errores de datos en un 20%.",
            "Proporcioné soporte para problemas de rendimiento de bases de datos, resultando en una reducción del 15% en el tiempo de inactividad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Microsoft Certified: Azure Database Administrator Associate", issuer: "Microsoft", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Administrador de Base de Datos SQL Server Junior en su currículum?", answer: "Debería incluir habilidades relevantes, experiencia laboral, logros y educación específica en bases de datos." },
      { question: "¿Cómo destacar mi currículum de Administrador de Base de Datos SQL Server Junior?", answer: "Asegúrate de resaltar logros cuantificables y habilidades técnicas específicas que se alineen con la descripción del trabajo." },
      { question: "¿Qué habilidades necesita un Administrador de Base de Datos SQL Server Junior?", answer: "Las habilidades clave incluyen gestión de bases de datos, optimización de consultas, manejo de T-SQL y experiencia en soluciones de copia de seguridad." },
    ],
  },
  "line-cook-supervisor": {
    slug: "line-cook-supervisor",
    title: "Supervisor de Cocineros de Línea",
    keywords: ["currículum de Supervisor de Cocineros de Línea", "CV de Supervisor de Cocineros de Línea", "ejemplo currículum Supervisor de Cocineros de Línea", "plantilla CV Supervisor de Cocineros de Línea"],
    searchIntents: ["cómo escribir currículum de Supervisor de Cocineros de Línea", "ejemplos currículum Supervisor de Cocineros de Línea", "mejor formato CV Supervisor de Cocineros de Línea"],
    topSkills: ["Habilidades Culinarias", "Liderazgo de Equipo", "Normas de Seguridad Alimentaria", "Gestión de Inventarios", "Planificación de Menús", "Gestión del Tiempo", "Control de Calidad", "Comunicación", "Resolución de Problemas", "Multitarea"],
    atsKeywords: ["Cocinero de Línea", "Gestión Culinaria", "Preparación de Alimentos", "Operaciones de Cocina", "Capacitación de Personal", "Regulaciones de Salud", "Servicio al Cliente", "Desarrollo de Recetas", "Prácticas de Saneamiento", "Colaboración en Equipo", "Control de Costos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Supervisor de Cocineros de Línea",
      summary: "Supervisor de Cocineros de Línea dedicado con más de 5 años de experiencia en entornos de cocina de ritmo rápido, logrando reducir el desperdicio de alimentos en un 15% y mejorar la eficiencia de la cocina en un 20%.",
      skills: ["Habilidades Culinarias", "Liderazgo de Equipo", "Normas de Seguridad Alimentaria", "Gestión de Inventarios", "Planificación de Menús", "Gestión del Tiempo", "Control de Calidad", "Comunicación", "Resolución de Problemas", "Multitarea"],
      experience: [
        {
          title: "Supervisor de Cocineros de Línea Senior",
          company: "The Gourmet Kitchen",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los costos de alimentos en un 10% mediante una gestión eficiente de inventarios.",
            "Entrené y desarrollé un equipo de 10 miembros del personal de cocina, mejorando la velocidad de servicio en un 30%.",
            "Implementé nuevos elementos del menú que aumentaron las calificaciones de satisfacción del cliente en un 25%.",
          ],
        },
        {
          title: "Cocinero de Línea",
          company: "Culinary Delights",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cumplí consistentemente con altos estándares de calidad y presentación de alimentos.",
            "Asistí en el desarrollo de menús de temporada que impulsaron las ventas en un 15%.",
            "Mantuve un ambiente de cocina limpio y organizado, cumpliendo con todas las regulaciones de salud.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Artes Culinarias", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Certification", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Supervisor de Cocineros de Línea en su currículum?", answer: "Debe incluir habilidades culinarias, experiencia en liderazgo y conocimientos en seguridad alimentaria." },
      { question: "¿Cómo destacar mi currículum de Supervisor de Cocineros de Línea?", answer: "Enfatiza tus logros cuantificables y resalta tus habilidades de gestión de equipos." },
      { question: "¿Qué habilidades necesita un Supervisor de Cocineros de Línea?", answer: "Las habilidades clave incluyen liderazgo, gestión del tiempo y conocimientos en normas de seguridad alimentaria." },
    ],
  },
  "pastry-assistant": {
    slug: "asistente-de-pasteleria",
    title: "Asistente de Pastelería",
    keywords: ["currículum de asistente de pastelería", "CV de asistente de pastelería", "ejemplo currículum asistente de pastelería", "plantilla CV asistente de pastelería"],
    searchIntents: ["cómo escribir currículum de asistente de pastelería", "ejemplos currículum asistente de pastelería", "mejor formato CV asistente de pastelería"],
    topSkills: ["Técnicas de Horneado", "Decoración de Pasteles", "Normas de Seguridad Alimentaria", "Gestión del Tiempo", "Desarrollo de Recetas", "Conocimiento de Ingredientes", "Colaboración en Equipo", "Atención al Detalle", "Creatividad", "Resolución de Problemas"],
    atsKeywords: ["pastelería", "horneado", "preparación de postres", "habilidades culinarias", "presentación de alimentos", "gestión de inventario", "equipos de cocina", "servicio al cliente", "trabajo en equipo", "sanitación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Pastelería",
      summary: "Asistente de Pastelería dedicado con más de 4 años de experiencia en panaderías de alto volumen, reconocido por aumentar las ventas de postres en un 30% a través del desarrollo de recetas innovadoras y habilidades excepcionales de presentación.",
      skills: ["Técnicas de Horneado", "Decoración de Pasteles", "Normas de Seguridad Alimentaria", "Gestión del Tiempo", "Desarrollo de Recetas", "Conocimiento de Ingredientes", "Colaboración en Equipo", "Atención al Detalle", "Creatividad", "Resolución de Problemas"],
      experience: [
        {
          title: "Asistente de Pastelería",
          company: "Sweet Creations Bakery",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas de postres en un 30% a través del desarrollo de recetas innovadoras y una presentación atractiva.",
            "Reduje el desperdicio de ingredientes en un 15% al implementar sistemas efectivos de gestión de inventario.",
            "Asistí en la capacitación de 5 nuevos miembros del personal, mejorando la eficiencia del equipo.",
          ],
        },
        {
          title: "Panadero",
          company: "Delicious Bites Bakery",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Preparé una variedad de pasteles y postres, manteniendo un 95% de satisfacción del cliente.",
            "Desarrollé nuevas recetas que aumentaron el flujo de clientes en un 20%.",
            "Mantuve altos estándares de limpieza y organización en la cocina.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Artes de Horneado y Pastelería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Pastelería en su currículum?", answer: "Un Asistente de Pastelería debe incluir su experiencia laboral en panaderías, habilidades culinarias específicas y certificaciones relacionadas con la seguridad alimentaria." },
      { question: "¿Cómo destacar mi currículum de Asistente de Pastelería?", answer: "Resalta tus logros cuantificables, como el aumento de ventas o la mejora en la satisfacción del cliente, y muestra creatividad en el desarrollo de recetas." },
      { question: "¿Qué habilidades necesita un Asistente de Pastelería?", answer: "Las habilidades clave incluyen técnicas de horneado, decoración de pasteles, gestión del tiempo, atención al detalle y creatividad." },
    ],
  },
  "restaurant-cashier": {
    slug: "cajero-de-restaurante",
    title: "Cajero de Restaurante",
    keywords: ["currículum de cajero de restaurante", "CV de cajero de restaurante", "ejemplo currículum cajero de restaurante", "plantilla CV cajero de restaurante"],
    searchIntents: ["cómo escribir currículum de cajero de restaurante", "ejemplos currículum cajero de restaurante", "mejor formato CV cajero de restaurante"],
    topSkills: ["Servicio al Cliente", "Manejo de Efectivo", "Sistemas de Punto de Venta (POS)", "Comunicación", "Atención al Detalle", "Multitarea", "Trabajo en Equipo", "Resolución de Problemas", "Gestión del Tiempo", "Ventas"],
    atsKeywords: ["cajero", "restaurante", "servicio al cliente", "ventas", "sistemas POS", "manejo de efectivo", "servicio de alimentos", "gestión de inventarios", "trabajador en equipo", "habilidades de comunicación", "confiable"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Cajero de Restaurante",
      summary: "Cajero dedicado con más de 5 años de experiencia en entornos de restaurantes de ritmo acelerado, conocido por aumentar las calificaciones de satisfacción del cliente en un 20% a través de un servicio eficiente.",
      skills: ["Servicio al Cliente", "Manejo de Efectivo", "Sistemas de Punto de Venta (POS)", "Comunicación", "Atención al Detalle", "Multitarea", "Trabajo en Equipo", "Resolución de Problemas", "Gestión del Tiempo", "Ventas"],
      experience: [
        {
          title: "Cajero Senior",
          company: "Olive Garden",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Incrementé las calificaciones de satisfacción del cliente en un 20% a través de un servicio eficiente y una interacción amigable.",
            "Procesé más de 300 transacciones por turno con un 99% de precisión.",
            "Capacité a 5 nuevos cajeros sobre sistemas POS y mejores prácticas de servicio al cliente.",
          ],
        },
        {
          title: "Cajero",
          company: "Chipotle",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un aumento del 15% en las ventas de upsell durante horas pico.",
            "Mantuve un cajón de efectivo con menos de $5 de discrepancia durante 2 años.",
            "Manejé con éxito las quejas de los clientes, lo que resultó en una reducción del 30% en los problemas escalados.",
          ],
        },
      ],
      education: [
        { institution: "City College", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Food Safety Certification", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Cajero de Restaurante en su currículum?", answer: "Un Cajero de Restaurante debe incluir su experiencia en atención al cliente, manejo de efectivo, y habilidades en sistemas de punto de venta." },
      { question: "¿Cómo destacar mi currículum de Cajero de Restaurante?", answer: "Destaca tus logros en servicio al cliente y eficiencia en manejo de transacciones." },
      { question: "¿Qué habilidades necesita un Cajero de Restaurante?", answer: "Habilidades clave incluyen servicio al cliente, manejo de efectivo, y trabajo en equipo." },
    ],
  },
  "server-administrator": {
    slug: "administrador-de-servidores",
    title: "Administrador de Servidores",
    keywords: ["currículum de Administrador de Servidores", "CV de Administrador de Servidores", "ejemplo currículum Administrador de Servidores", "plantilla CV Administrador de Servidores"],
    searchIntents: ["cómo escribir currículum de Administrador de Servidores", "ejemplos currículum Administrador de Servidores", "mejor formato CV Administrador de Servidores"],
    topSkills: ["Configuración de Redes", "Monitoreo de Sistemas", "Respaldo y Recuperación", "Gestión de Seguridad", "Virtualización", "Servicios en la Nube", "Optimización de Rendimiento", "Solución de Problemas", "Gestión de Bases de Datos", "Scripting"],
    atsKeywords: ["administración de servidores", "administración de sistemas", "seguridad de redes", "soluciones de respaldo", "infraestructura en la nube", "optimización de rendimiento", "habilidades de solución de problemas", "Windows Server", "administración de Linux", "gestión de usuarios", "tecnologías de virtualización"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Administrador de Servidores",
      summary: "Administrador de Servidores dedicado con más de 5 años de experiencia en la gestión de infraestructuras de servidores y optimización del rendimiento del sistema. Logré una reducción del 30% en el tiempo de inactividad a través de un monitoreo y mantenimiento proactivos.",
      skills: ["Configuración de Redes", "Monitoreo de Sistemas", "Respaldo y Recuperación", "Gestión de Seguridad", "Virtualización", "Servicios en la Nube", "Optimización de Rendimiento", "Solución de Problemas", "Gestión de Bases de Datos", "Scripting"],
      experience: [
        {
          title: "Administrador de Servidores Senior",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé una nueva estrategia de respaldo que redujo el tiempo de recuperación de datos en un 40%.",
            "Desarrollé un sistema de monitoreo que disminuyó el tiempo de inactividad del servidor en un 30%.",
            "Lideré un proyecto de equipo para migrar la infraestructura local a servicios en la nube, ahorrando $50,000 anuales.",
          ],
        },
        {
          title: "Administrador de Servidores",
          company: "Global Network Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné una red de más de 200 servidores con un tiempo de actividad del 99.9%.",
            "Automatizé tareas rutinarias, reduciendo la carga de trabajo manual en un 25%.",
            "Realicé auditorías de seguridad que mejoraron el cumplimiento del sistema en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Information Systems Security Professional (CISSP)", issuer: "ISC2", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Administrador de Servidores en su currículum?", answer: "Incluir experiencia en administración de servidores, habilidades técnicas relevantes y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Administrador de Servidores?", answer: "Resaltar habilidades clave, logros significativos y certificaciones pertinentes." },
      { question: "¿Qué habilidades necesita un Administrador de Servidores?", answer: "Configuración de redes, gestión de seguridad, respaldo y recuperación, entre otras." },
    ],
  },
  "server-texas-roadhouse": {
    slug: "mesero-en-texas-roadhouse",
    title: "Mesero en Texas Roadhouse",
    keywords: ["currículum de mesero", "CV de mesero", "ejemplo currículum mesero", "plantilla CV mesero"],
    searchIntents: ["cómo escribir currículum de mesero", "ejemplos currículum mesero", "mejor formato CV mesero"],
    topSkills: ["Servicio al Cliente", "Comunicación", "Gestión del Tiempo", "Multitarea", "Trabajo en Equipo", "Resolución de Problemas", "Atención al Detalle", "Habilidades de Ventas", "Conocimiento de Seguridad Alimentaria", "Manejo de Efectivo"],
    atsKeywords: ["mesero", "personal de espera", "servicio al cliente", "restaurante", "Texas Roadhouse", "servicio de alimentos", "trabajador en equipo", "entorno de ritmo rápido", "precisión en pedidos", "técnicas de ventas", "hospitalidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Mesero en Texas Roadhouse",
      summary: "Mesero dedicado con más de 5 años de experiencia en entornos de restaurantes de ritmo rápido, reconocido por aumentar las ventas en un 20% a través de un servicio al cliente excepcional y técnicas de upselling.",
      skills: ["Servicio al Cliente", "Comunicación", "Gestión del Tiempo", "Multitarea", "Trabajo en Equipo", "Resolución de Problemas", "Atención al Detalle", "Habilidades de Ventas", "Conocimiento de Seguridad Alimentaria", "Manejo de Efectivo"],
      experience: [
        {
          title: "Mesero Senior",
          company: "Texas Roadhouse",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la tasa de rotación de mesas en un 15% a través de un servicio eficiente y compromiso con los clientes",
            "Logré una calificación de satisfacción del cliente del 95% en encuestas",
            "Entrené a 10 nuevos miembros del personal en estándares de servicio y conocimiento del menú",
          ],
        },
        {
          title: "Mesero",
          company: "Olive Garden",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cumplí o superé constantemente los objetivos de ventas, logrando un aumento del 30% en las ventas de postres",
            "Recibí el premio 'Empleado del Mes' por un servicio excepcional",
            "Mantuve un área de comedor limpia y organizada, asegurando el cumplimiento de las regulaciones de salud",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión Hotelera", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un mesero en su currículum?", answer: "Debería incluir experiencia laboral relevante, habilidades en servicio al cliente y logros en ventas." },
      { question: "¿Cómo destacar mi currículum de mesero?", answer: "Enfatiza tus logros en ventas y tu capacidad para trabajar en un entorno de ritmo rápido." },
      { question: "¿Qué habilidades necesita un mesero?", answer: "Habilidades clave incluyen servicio al cliente, comunicación efectiva y capacidad para trabajar en equipo." },
    ],
  },
  "sql-server-developer": {
    slug: "desarrollador-sql-server",
    title: "Desarrollador SQL Server",
    keywords: ["currículum de Desarrollador SQL Server", "CV de Desarrollador SQL Server", "ejemplo currículum Desarrollador SQL Server", "plantilla CV Desarrollador SQL Server"],
    searchIntents: ["cómo escribir currículum de Desarrollador SQL Server", "ejemplos currículum Desarrollador SQL Server", "mejor formato CV Desarrollador SQL Server"],
    topSkills: ["T-SQL", "SQL Server Integration Services (SSIS)", "SQL Server Reporting Services (SSRS)", "Diseño de Bases de Datos", "Optimización de Rendimiento", "Almacenamiento de Datos", "Procesos ETL", "Procedimientos Almacenados", "Modelado de Datos", "Soluciones SQL en la Nube"],
    atsKeywords: ["SQL", "Gestión de Bases de Datos", "Análisis de Datos", "Optimización de Rendimiento", "Migración de Datos", "Recuperación de Datos", "Optimización de Consultas", "Copia de Seguridad y Recuperación", "Seguridad de Bases de Datos", "Microsoft SQL Server", "Documentación Técnica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Desarrollador SQL Server",
      summary: "Desarrollador SQL Server orientado a los detalles con más de 5 años de experiencia en gestión de bases de datos, optimización de rendimiento e integración de datos. Mejoró exitosamente el rendimiento del sistema en un 30%, lo que llevó a una mayor eficiencia operativa.",
      skills: ["T-SQL", "SQL Server Integration Services (SSIS)", "SQL Server Reporting Services (SSRS)", "Diseño de Bases de Datos", "Optimización de Rendimiento", "Almacenamiento de Datos", "Procesos ETL", "Procedimientos Almacenados", "Modelado de Datos", "Soluciones SQL en la Nube"],
      experience: [
        {
          title: "Desarrollador SQL Server Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el rendimiento de las consultas en un 40%, reduciendo el tiempo de generación de informes de 10 minutos a 6 minutos.",
            "Diseñó e implementó una solución de almacenamiento de datos que aumentó la velocidad de recuperación de datos en un 25%.",
            "Lideró un equipo de 3 desarrolladores en un proyecto que integró paquetes SSIS, resultando en una reducción del 20% en el tiempo de procesamiento de datos.",
          ],
        },
        {
          title: "Desarrollador SQL",
          company: "Data Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló consultas SQL complejas que mejoraron las capacidades de análisis de datos.",
            "Automatizó procesos de copia de seguridad, reduciendo el riesgo de pérdida de datos en un 15%.",
            "Colaboró con equipos multifuncionales para mejorar la usabilidad de la base de datos, aumentando la satisfacción del usuario en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Microsoft Certified: Azure Database Administrator Associate", issuer: "Microsoft", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un SQL Server Developer en su currículum?", answer: "Un buen currículum debe incluir experiencia en gestión de bases de datos, habilidades en T-SQL y conocimiento en herramientas como SSIS y SSRS." },
      { question: "¿Cómo destacar mi currículum de SQL Server Developer?", answer: "Utiliza métricas para mostrar logros, destaca proyectos relevantes y asegúrate de incluir habilidades técnicas clave." },
      { question: "¿Qué habilidades necesita un SQL Server Developer?", answer: "Habilidades en T-SQL, diseño de bases de datos, optimización de rendimiento, y experiencia con herramientas de integración y análisis de datos son fundamentales." },
    ],
  },
  "starbucks-barista": {
    slug: "starbucks-barista-curriculum",
    title: "Barista de Starbucks",
    keywords: ["currículum de barista", "CV de barista", "ejemplo currículum barista", "plantilla CV barista"],
    searchIntents: ["cómo escribir currículum de barista", "ejemplos currículum barista", "mejor formato CV barista"],
    topSkills: ["Servicio al Cliente", "Preparación de Café", "Manejo de Efectivo", "Trabajo en Equipo", "Multitarea", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas", "Atención al Detalle", "Ventas"],
    atsKeywords: ["barista", "coffee shop", "customer service", "cash register", "beverage preparation", "inventory management", "team collaboration", "sales goals", "food safety", "product knowledge", "training"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Barista de Starbucks",
      summary: "Barista dedicada con más de 3 años de experiencia en cafeterías de alto volumen, reconocida por aumentar las ventas en un 20% a través de un servicio al cliente excepcional y calidad en las bebidas.",
      skills: ["Servicio al Cliente", "Preparación de Café", "Manejo de Efectivo", "Trabajo en Equipo", "Multitarea", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas", "Atención al Detalle", "Ventas"],
      experience: [
        {
          title: "Barista Líder",
          company: "Starbucks",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción del cliente en un 15% a través de una mejor capacitación en servicio.",
            "Gestioné las operaciones diarias, atendiendo a más de 300 clientes por turno.",
            "Reduje el desperdicio de bebidas en un 25% mediante una gestión optimizada del inventario.",
          ],
        },
        {
          title: "Barista",
          company: "Peet's Coffee",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé consistentemente los objetivos de ventas mensuales en un 10%.",
            "Recibí el premio Empleado del Mes dos veces en un año por un servicio al cliente excepcional.",
            "Capacité a 5 nuevos empleados en la preparación de café y estándares de atención al cliente.",
          ],
        },
      ],
      education: [
        { institution: "University of Washington", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Starbucks Barista en su currículum?", answer: "Incluir experiencia en servicio al cliente, habilidades en preparación de café y manejo de efectivo." },
      { question: "¿Cómo destacar mi currículum de Starbucks Barista?", answer: "Enfatizar logros en ventas y satisfacción del cliente, así como habilidades específicas relacionadas." },
      { question: "¿Qué habilidades necesita un Starbucks Barista?", answer: "Habilidades clave incluyen servicio al cliente, multitarea y atención al detalle." },
    ],
  },
  "wait-staff-manager": {
    slug: "gerente-de-personal-de-espera",
    title: "Gerente de Personal de Espera",
    keywords: ["currículum de gerente de personal de espera", "CV de gerente de personal de espera", "ejemplo currículum gerente de personal de espera", "plantilla CV gerente de personal de espera"],
    searchIntents: ["cómo escribir currículum de gerente de personal de espera", "ejemplos currículum gerente de personal de espera", "mejor formato CV gerente de personal de espera"],
    topSkills: ["Servicio al Cliente", "Liderazgo de Equipo", "Resolución de Conflictos", "Gestión del Tiempo", "Seguridad Alimentaria", "Gestión de Inventarios", "Capacitación y Desarrollo", "Comunicación", "Mejora de Ventas", "Coordinación de Eventos"],
    atsKeywords: ["gestión de personal de espera", "operaciones de restaurante", "programación de personal", "relaciones con clientes", "evaluación de desempeño", "calidad del servicio", "capacitación de empleados", "conocimiento del menú", "manejo de efectivo", "regulaciones de salud", "control de inventario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Personal de Espera",
      summary: "Gerente de Personal de Espera dedicado con más de 5 años de experiencia en la industria de la hospitalidad, conocido por mejorar la satisfacción del cliente en un 30% a través de un liderazgo efectivo del equipo y optimización del servicio.",
      skills: ["Servicio al Cliente", "Liderazgo de Equipo", "Resolución de Conflictos", "Gestión del Tiempo", "Seguridad Alimentaria", "Gestión de Inventarios", "Capacitación y Desarrollo", "Comunicación", "Mejora de Ventas", "Coordinación de Eventos"],
      experience: [
        {
          title: "Gerente Senior de Personal de Espera",
          company: "The Gourmet Bistro",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la tasa de rotación de mesas en un 25% durante las horas pico a través de una programación y capacitación eficiente del personal.",
            "Logré una puntuación de satisfacción del cliente del 95% durante dos trimestres consecutivos.",
            "Capacité y mentoreé a un equipo de 15 miembros de personal de espera, lo que llevó a una reducción del 40% en la rotación de empleados.",
          ],
        },
        {
          title: "Supervisor de Personal de Espera",
          company: "Culinary Delights Restaurant",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé un nuevo programa de capacitación que mejoró la velocidad del servicio en un 20%.",
            "Gestioné el inventario que redujo el desperdicio de alimentos en un 15% a través de una mejor gestión de existencias.",
            "Dirigí un evento promocional exitoso que aumentó las ventas en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión de la Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Wait Staff Manager en su currículum?", answer: "Incluya su experiencia en gestión de personal, habilidades en servicio al cliente y logros en la mejora de la satisfacción del cliente." },
      { question: "¿Cómo destacar mi currículum de Wait Staff Manager?", answer: "Enfatice sus logros cuantificables y habilidades de liderazgo, y use palabras clave relevantes para su industria." },
      { question: "¿Qué habilidades necesita un Wait Staff Manager?", answer: "Habilidades clave incluyen servicio al cliente, liderazgo de equipo, gestión del tiempo, y conocimiento de regulaciones de salud." },
    ],
  },
  "waiter": {
    slug: "curriculum-waiter",
    title: "Camarero",
    keywords: ["currículum de camarero", "CV de camarero", "ejemplo currículum camarero", "plantilla CV camarero"],
    searchIntents: ["cómo escribir currículum de camarero", "ejemplos currículum camarero", "mejor formato CV camarero"],
    topSkills: ["Atención al Cliente", "Comunicación", "Multitarea", "Atención al Detalle", "Trabajo en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Habilidades de Venta", "Conocimiento de Seguridad Alimentaria", "Resolución de Conflictos"],
    atsKeywords: ["Servicio de Mesas", "Toma de Pedidos", "Conocimiento del Menú", "Manejo de Efectivo", "Experiencia en Comedor", "Servicio de Bebidas", "Interacción con Clientes", "Presentación de Comida", "Técnicas de Venta Adicional", "Gestión de Reservas", "Cumplimiento de Salud y Seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Camarero",
      summary: "Camarero dedicado con más de 5 años de experiencia en restaurantes de ritmo acelerado, conocido por aumentar la satisfacción del cliente en un 25% a través de un servicio excepcional y atención al detalle.",
      skills: ["Atención al Cliente", "Comunicación", "Multitarea", "Atención al Detalle", "Trabajo en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Habilidades de Venta", "Conocimiento de Seguridad Alimentaria", "Resolución de Conflictos"],
      experience: [
        {
          title: "Camarero Senior",
          company: "Olive Garden",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción del cliente en un 30% a través de un servicio atento y interacciones personalizadas.",
            "Gestioné un equipo de 5 camareros, mejorando la eficiencia del servicio al reducir el tiempo de rotación de mesas en un 15%.",
            "Logré $50,000 en ventas durante las temporadas pico a través de ventas adicionales y un conocimiento efectivo del menú.",
          ],
        },
        {
          title: "Camarero",
          company: "The Cheesecake Factory",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve una calificación de satisfacción del cliente del 95% a través de una comunicación y servicio efectivos.",
            "Capacité a nuevo personal sobre los protocolos del restaurante, resultando en una disminución del 20% en el tiempo de incorporación.",
            "Gestioné consistentemente un servicio de alto volumen durante horas pico, promediando 20 mesas por turno.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión Hotelera", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Camarero en su currículum?", answer: "Incluya su experiencia en servicio al cliente, habilidades de comunicación y cualquier formación relevante." },
      { question: "¿Cómo destacar mi currículum de Camarero?", answer: "Enfatice sus logros en satisfacción del cliente y eficiencia en el servicio." },
      { question: "¿Qué habilidades necesita un Camarero?", answer: "Habilidades clave incluyen atención al cliente, multitarea y resolución de conflictos." },
    ],
  },
  "waiter-host": {
    slug: "curriculum-waiter-host",
    title: "Anfitrión de Mesero",
    keywords: ["currículum de Anfitrión de Mesero", "CV de Anfitrión de Mesero", "ejemplo currículum Anfitrión de Mesero", "plantilla CV Anfitrión de Mesero"],
    searchIntents: ["cómo escribir currículum de Anfitrión de Mesero", "ejemplos currículum Anfitrión de Mesero", "mejor formato CV Anfitrión de Mesero"],
    topSkills: ["servicio al cliente", "comunicación", "trabajo en equipo", "gestión del tiempo", "resolución de problemas", "atención al detalle", "multitarea", "manejo de efectivo", "seguridad alimentaria", "conocimiento del menú"],
    atsKeywords: ["meseros", "hospitalidad", "servicio de restaurante", "relaciones con los huéspedes", "gestión de mesas", "toma de pedidos", "presentación de alimentos", "satisfacción del cliente", "habilidades de ventas", "resolución de conflictos", "colaboración del personal"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Anfitrión de Mesero",
      summary: "Anfitrión de Mesero dedicado con más de 5 años de experiencia en la industria de restaurantes, reconocido por mejorar las puntuaciones de satisfacción de los huéspedes en un 15% a través de un servicio excepcional.",
      skills: ["servicio al cliente", "comunicación", "trabajo en equipo", "gestión del tiempo", "resolución de problemas", "atención al detalle", "multitarea", "manejo de efectivo", "seguridad alimentaria", "conocimiento del menú"],
      experience: [
        {
          title: "Anfitrión de Mesero Senior",
          company: "The Gourmet Bistro",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción de los huéspedes en un 20% a través de un servicio atento y resolución rápida de problemas.",
            "Gestioné las operaciones del comedor durante las horas pico, atendiendo con éxito a más de 100 huéspedes por turno.",
            "Entrené y mentoreé a 5 nuevos miembros del personal, mejorando el rendimiento del equipo y la entrega del servicio.",
          ],
        },
        {
          title: "Anfitrión de Mesero",
          company: "Ocean View Restaurant",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un 95% de calificación de retroalimentación de clientes al proporcionar un excelente servicio.",
            "Colaboré con el personal de cocina para asegurar una entrega oportuna de alimentos y control de calidad.",
            "Manejé transacciones en efectivo de manera eficiente, manteniendo un cajón de efectivo equilibrado.",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Handler", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Anfitrión de Mesero en su currículum?", answer: "Un Anfitrión de Mesero debe incluir su experiencia laboral, habilidades en servicio al cliente, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Anfitrión de Mesero?", answer: "Destacar logros específicos y habilidades clave puede ayudar a que su currículum se destaque." },
      { question: "¿Qué habilidades necesita un Anfitrión de Mesero?", answer: "Las habilidades clave incluyen servicio al cliente, trabajo en equipo y manejo de efectivo." },
    ],
  }
};
