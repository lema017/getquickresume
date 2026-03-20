import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  "assistant-sales-manager": {
    slug: "asistente-gerente-de-ventas",
    title: "Asistente de Gerente de Ventas",
    keywords: ["currículum de asistente de gerente de ventas", "CV de asistente de gerente de ventas", "ejemplo currículum asistente de gerente de ventas", "plantilla CV asistente de gerente de ventas"],
    searchIntents: ["cómo escribir currículum de asistente de gerente de ventas", "ejemplos currículum asistente de gerente de ventas", "mejor formato CV asistente de gerente de ventas"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Liderazgo de Equipo", "Análisis de Mercado", "Habilidades de Negociación", "Pronósticos de Ventas", "Conocimiento del Producto", "Análisis de Datos", "Resolución de Conflictos", "Métricas de Desempeño"],
    atsKeywords: ["gestión de ventas", "compromiso del cliente", "desarrollo de equipo", "informes de ventas", "gestión de pipeline", "creación de relaciones", "orientado a objetivos", "generación de leads", "venta cruzada", "venta adicional", "gestión de territorio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Gerente de Ventas",
      summary: "Asistente de Gerente de Ventas dinámico con más de 5 años de experiencia en impulsar el crecimiento de ventas y mejorar la satisfacción del cliente, logrando un aumento del 30% en los ingresos por ventas dentro del primer año en la posición actual.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Liderazgo de Equipo", "Análisis de Mercado", "Habilidades de Negociación", "Pronósticos de Ventas", "Conocimiento del Producto", "Análisis de Datos", "Resolución de Conflictos", "Métricas de Desempeño"],
      experience: [
        {
          title: "Asistente Senior de Gerente de Ventas",
          company: "Global Tech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 40% en el primer año, generando $500,000 adicionales en ingresos.",
            "Lideré un equipo de 10 representantes de ventas, mejorando las métricas de desempeño del equipo en un 25%.",
            "Implementé un sistema de retroalimentación de clientes que mejoró las calificaciones de satisfacción del cliente en un 15%.",
          ],
        },
        {
          title: "Asistente de Gerente de Ventas",
          company: "Innovative Retail Corp",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de los objetivos de ventas de manera constante durante tres años.",
            "Desarrollé programas de capacitación que mejoraron el desempeño de ventas de nuevos contratados en un 30%.",
            "Coordiné eventos promocionales que aumentaron el tráfico peatonal en un 50% durante las temporadas pico.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Marketing", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Gerente de Ventas en su currículum?", answer: "Incluir experiencia en ventas, habilidades de liderazgo y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Asistente de Gerente de Ventas?", answer: "Enfatizar resultados alcanzados y habilidades clave en el sector de ventas." },
      { question: "¿Qué habilidades necesita un Asistente de Gerente de Ventas?", answer: "Habilidades en estrategia de ventas, gestión de relaciones y análisis de datos." },
    ],
  },
  "business-development-analyst": {
    slug: "analista-de-desarrollo-de-negocios",
    title: "Analista de Desarrollo de Negocios",
    keywords: ["currículum de analista de desarrollo de negocios", "CV de analista de desarrollo de negocios", "ejemplo currículum analista de desarrollo de negocios", "plantilla CV analista de desarrollo de negocios"],
    searchIntents: ["cómo escribir currículum de analista de desarrollo de negocios", "ejemplos currículum analista de desarrollo de negocios", "mejor formato CV analista de desarrollo de negocios"],
    topSkills: ["Análisis de Mercado", "Planificación Estratégica", "Pronósticos de Ventas", "Análisis de Datos", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Gestión de Proyectos", "Modelado Financiero", "Competencia en Software CRM", "Generación de Informes"],
    atsKeywords: ["desarrollo de negocios", "habilidades analíticas", "investigación de mercado", "estrategia de ventas", "análisis de negocios", "análisis financiero", "decisiones basadas en datos", "compromiso de interesados", "gestión de pipeline", "métricas de rendimiento", "adquisición de clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Analista de Desarrollo de Negocios",
      summary: "Analista de Desarrollo de Negocios orientado a resultados con más de 5 años de experiencia en identificar oportunidades de crecimiento y generar ingresos. Logré un aumento del 30% en ventas en dos años a través de un análisis estratégico del mercado y el compromiso con los clientes.",
      skills: ["Análisis de Mercado", "Planificación Estratégica", "Pronósticos de Ventas", "Análisis de Datos", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Gestión de Proyectos", "Modelado Financiero", "Competencia en Software CRM", "Generación de Informes"],
      experience: [
        {
          title: "Analista Senior de Desarrollo de Negocios",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos anuales en $2 millones a través de nuevas estrategias de adquisición de clientes.",
            "Desarrollé una estrategia de entrada al mercado que resultó en un 25% de participación en el mercado en 18 meses.",
            "Dirigí equipos multifuncionales para optimizar procesos de negocio, reduciendo los costos operativos en un 15%.",
          ],
        },
        {
          title: "Analista de Desarrollo de Negocios",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Identifiqué y perseguí más de 50 posibles clientes, lo que resultó en un aumento del 20% en la base de clientes.",
            "Realicé una investigación de mercado integral que informó el desarrollo de productos y estrategias de marketing.",
            "Logré una mejora del 40% en las calificaciones de satisfacción del cliente a través de una mejor entrega de servicios.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Expert", issuer: "Business Development Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Analista de Desarrollo de Negocios en su currículum?", answer: "Debe incluir experiencia relevante, habilidades clave y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Analista de Desarrollo de Negocios?", answer: "Utilice palabras clave de la industria, resalte sus logros y mantenga un formato limpio y profesional." },
      { question: "¿Qué habilidades necesita un Analista de Desarrollo de Negocios?", answer: "Habilidades analíticas, conocimiento de mercado, habilidades de negociación y gestión de relaciones con clientes." },
    ],
  },
  "business-development-associate": {
    slug: "asociado-desarrollo-negocios",
    title: "Asociado de Desarrollo de Negocios",
    keywords: ["currículum de Asociado de Desarrollo de Negocios", "CV de Asociado de Desarrollo de Negocios", "ejemplo currículum Asociado de Desarrollo de Negocios", "plantilla CV Asociado de Desarrollo de Negocios"],
    searchIntents: ["cómo escribir currículum de Asociado de Desarrollo de Negocios", "ejemplos currículum Asociado de Desarrollo de Negocios", "mejor formato CV Asociado de Desarrollo de Negocios"],
    topSkills: ["Estrategia de Ventas", "Investigación de Mercado", "Generación de Leads", "Negociación", "Gestión de Relaciones con Clientes", "Pronóstico de Ventas", "Software CRM", "Networking", "Habilidades de Presentación", "Pensamiento Analítico"],
    atsKeywords: ["desarrollo de negocios", "ventas", "generación de leads", "relaciones con clientes", "negociación", "análisis de mercado", "crecimiento de ingresos", "estrategia de ventas", "colaboración en equipo", "adquisición de clientes", "gestión de pipeline"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Desarrollo de Negocios",
      summary: "Asociado de Desarrollo de Negocios dinámico con más de 5 años de experiencia en impulsar el crecimiento de ventas y expandir la presencia en el mercado. Aumentó con éxito los ingresos en un 30% año tras año a través de estrategias efectivas de generación de leads y compromiso con los clientes.",
      skills: ["Estrategia de Ventas", "Investigación de Mercado", "Generación de Leads", "Negociación", "Gestión de Relaciones con Clientes", "Pronóstico de Ventas", "Software CRM", "Networking", "Habilidades de Presentación", "Pensamiento Analítico"],
      experience: [
        {
          title: "Asociado Senior de Desarrollo de Negocios",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la adquisición de clientes en un 40%, contribuyendo a un aumento de ingresos de $1.2M en 2022.",
            "Negoció con éxito contratos con clientes de primer nivel, resultando en un aumento del 25% en el negocio recurrente.",
            "Desarrolló e implementó una nueva estrategia de CRM que mejoró la eficiencia de seguimiento de leads en un 50%.",
          ],
        },
        {
          title: "Representante de Desarrollo de Negocios",
          company: "Global Enterprises LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Amplié el alcance del mercado en la región del Medio Oeste, lo que llevó a un aumento del 20% en ventas.",
            "Generé más de 300 nuevos leads a través de eventos de networking y campañas de marketing digital.",
            "Logré consistentemente los objetivos de ventas trimestrales, contribuyendo a un crecimiento del 15% año tras año.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Professional", issuer: "Institute of Business Development", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Business Development Associate en su currículum?", answer: "Debe incluir experiencia relevante, habilidades específicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Business Development Associate?", answer: "Utiliza palabras clave de la industria y enfócate en tus logros con datos concretos." },
      { question: "¿Qué habilidades necesita un Business Development Associate?", answer: "Habilidades en ventas, negociación, análisis de mercado y gestión de relaciones con clientes." },
    ],
  },
  "business-development-executive": {
    slug: "ejecutivo-de-desarrollo-de-negocios",
    title: "Ejecutivo de Desarrollo de Negocios",
    keywords: ["currículum de Ejecutivo de Desarrollo de Negocios", "CV de Ejecutivo de Desarrollo de Negocios", "ejemplo currículum Ejecutivo de Desarrollo de Negocios", "plantilla CV Ejecutivo de Desarrollo de Negocios"],
    searchIntents: ["cómo escribir currículum de Ejecutivo de Desarrollo de Negocios", "ejemplos currículum Ejecutivo de Desarrollo de Negocios", "mejor formato CV Ejecutivo de Desarrollo de Negocios"],
    topSkills: ["Generación de Leads", "Negociación", "Investigación de Mercado", "Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Análisis de Datos", "Networking", "Gestión de Contratos", "Habilidades de Presentación", "Gestión de Proyectos"],
    atsKeywords: ["desarrollo de negocios", "crecimiento de ventas", "adquisición de clientes", "desarrollo de asociaciones", "planificación estratégica", "pronóstico de ventas", "compromiso del cliente", "gestión de leads", "análisis de mercado", "métricas de rendimiento", "ventas B2B"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ejecutivo de Desarrollo de Negocios",
      summary: "Ejecutivo de Desarrollo de Negocios dinámico con más de 5 años de experiencia en impulsar el crecimiento de ingresos y construir asociaciones estratégicas. Historial comprobado de aumento de ventas en un 30% año tras año a través de estrategias de marketing dirigidas y negociación efectiva.",
      skills: ["Generación de Leads", "Negociación", "Investigación de Mercado", "Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Análisis de Datos", "Networking", "Gestión de Contratos", "Habilidades de Presentación", "Gestión de Proyectos"],
      experience: [
        {
          title: "Ejecutivo Senior de Desarrollo de Negocios",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos anuales en un 40% a través de la adquisición de nuevos clientes y ventas adicionales a cuentas existentes.",
            "Negocié contratos por más de $2 millones, resultando en un aumento del 25% en los márgenes de beneficio.",
            "Desarrollé e implementé una estrategia de compromiso del cliente que mejoró las tasas de retención en un 15%.",
          ],
        },
        {
          title: "Asociado de Desarrollo de Negocios",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré el 120% de los objetivos de ventas al identificar y dirigirme eficazmente a clientes de alto potencial.",
            "Realicé investigaciones de mercado que llevaron a la identificación de tres nuevas fuentes de ingresos.",
            "Colaboré con equipos interfuncionales para lanzar una nueva línea de productos, resultando en $500,000 en ventas del primer trimestre.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Expert", issuer: "Business Development Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ejecutivo de Desarrollo de Negocios en su currículum?", answer: "Incluye una descripción clara de tus logros, habilidades y experiencia en ventas y desarrollo de negocios." },
      { question: "¿Cómo destacar mi currículum de Ejecutivo de Desarrollo de Negocios?", answer: "Utiliza palabras clave relevantes y destaca tus logros cuantificables en ventas y relaciones con clientes." },
      { question: "¿Qué habilidades necesita un Ejecutivo de Desarrollo de Negocios?", answer: "Necesita habilidades en generación de leads, negociación, investigación de mercado y gestión de relaciones con clientes." },
    ],
  },
  "business-development-manager-at-apple": {
    slug: "gerente-de-desarrollo-de-negocios",
    title: "Gerente de Desarrollo de Negocios",
    keywords: ["currículum de gerente de desarrollo de negocios", "CV de gerente de desarrollo de negocios", "ejemplo currículum gerente de desarrollo de negocios", "plantilla CV gerente de desarrollo de negocios"],
    searchIntents: ["cómo escribir currículum de gerente de desarrollo de negocios", "ejemplos currículum gerente de desarrollo de negocios", "mejor formato CV gerente de desarrollo de negocios"],
    topSkills: ["Desarrollo de Alianzas Estratégicas", "Análisis de Mercado", "Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Liderazgo de Equipos Multifuncionales", "Estrategias de Crecimiento de Ingresos", "Pronóstico Empresarial", "Gestión de Proyectos", "Toma de Decisiones Basada en Datos"],
    atsKeywords: ["desarrollo de negocios", "gestión de ventas", "planificación estratégica", "adquisición de clientes", "investigación de mercado", "generación de leads", "desarrollo de asociaciones", "gestión de cuentas", "negociaciones", "métricas de rendimiento", "generación de ingresos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Desarrollo de Negocios",
      summary: "Gerente de Desarrollo de Negocios orientado a resultados con más de 5 años de experiencia en impulsar el crecimiento de ingresos y forjar alianzas estratégicas, aumentando exitosamente las ventas de la empresa en un 30% en el último año fiscal.",
      skills: ["Desarrollo de Alianzas Estratégicas", "Análisis de Mercado", "Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Liderazgo de Equipos Multifuncionales", "Estrategias de Crecimiento de Ingresos", "Pronóstico Empresarial", "Gestión de Proyectos", "Toma de Decisiones Basada en Datos"],
      experience: [
        {
          title: "Gerente Senior de Desarrollo de Negocios",
          company: "Apple Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la cuota de mercado en un 25% en 18 meses a través de alianzas estratégicas.",
            "Lideró una iniciativa clave que generó $5M en nuevos ingresos durante el primer año.",
            "Desarrolló e implementó una estrategia de ventas que mejoró las tasas de retención de clientes en un 15%.",
          ],
        },
        {
          title: "Ejecutivo de Desarrollo de Negocios",
          company: "Salesforce",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cerró exitosamente acuerdos por un valor de $10M en ingresos recurrentes anuales.",
            "Expansión de la base de clientes en un 40% a través de un enfoque y compromiso dirigidos.",
            "Colaboró con equipos de producto para alinear las ofertas con las necesidades del mercado, lo que llevó a un aumento del 20% en oportunidades de venta adicional.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Expert", issuer: "International Business Development Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Business Development Manager en su currículum?", answer: "Un Business Development Manager debe incluir su experiencia en desarrollo de negocios, habilidades de negociación, y logros cuantificables en ventas." },
      { question: "¿Cómo destacar mi currículum de Business Development Manager?", answer: "Enfatizar logros específicos, utilizar métricas y resultados concretos, y resaltar habilidades clave son fundamentales para destacar." },
      { question: "¿Qué habilidades necesita un Business Development Manager?", answer: "Las habilidades clave incluyen desarrollo de alianzas, análisis de mercado, gestión de relaciones y habilidades de negociación." },
    ],
  },
  "business-development-officer": {
    slug: "oficial-de-desarrollo-de-negocios",
    title: "Oficial de Desarrollo de Negocios",
    keywords: ["currículum de Oficial de Desarrollo de Negocios", "CV de Oficial de Desarrollo de Negocios", "ejemplo currículum Oficial de Desarrollo de Negocios", "plantilla CV Oficial de Desarrollo de Negocios"],
    searchIntents: ["cómo escribir currículum de Oficial de Desarrollo de Negocios", "ejemplos currículum Oficial de Desarrollo de Negocios", "mejor formato CV Oficial de Desarrollo de Negocios"],
    topSkills: ["Análisis de Mercado", "Planificación Estratégica", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Negociación", "Generación de Leads", "Análisis de Datos", "Gestión de Proyectos", "Pronóstico Financiero", "Networking"],
    atsKeywords: ["desarrollo de negocios", "ventas", "investigación de mercado", "adquisición de clientes", "asociaciones", "software CRM", "generación de leads", "pronóstico de ventas", "habilidades de negociación", "asociaciones estratégicas", "gestión de pipeline"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Oficial de Desarrollo de Negocios",
      summary: "Oficial de Desarrollo de Negocios orientado a resultados con más de 5 años de experiencia en impulsar el crecimiento de ingresos y establecer asociaciones estratégicas, logrando un aumento del 150% en la adquisición de clientes en el último año.",
      skills: ["Análisis de Mercado", "Planificación Estratégica", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Negociación", "Generación de Leads", "Análisis de Datos", "Gestión de Proyectos", "Pronóstico Financiero", "Networking"],
      experience: [
        {
          title: "Oficial Senior de Desarrollo de Negocios",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos anuales en un 25% a través de asociaciones estratégicas y expansión de mercado.",
            "Negocié con éxito contratos por más de $2 millones con clientes clave.",
            "Implementé una estrategia de generación de leads que aumentó la adquisición de clientes en un 40%.",
          ],
        },
        {
          title: "Ejecutivo de Desarrollo de Negocios",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de los objetivos de ventas de manera consistente durante 2 años.",
            "Desarrollé y lancé un nuevo proceso de incorporación de clientes que mejoró las tasas de retención en un 30%.",
            "Realicé un análisis de mercado que identificó nuevas oportunidades de negocio, resultando en un aumento del 15% en la cuota de mercado.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Professional", issuer: "Institute of Business Development", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Oficial de Desarrollo de Negocios en su currículum?", answer: "Debe incluir experiencia relevante, logros cuantificables y habilidades clave relacionadas con el desarrollo de negocios." },
      { question: "¿Cómo destacar mi currículum de Oficial de Desarrollo de Negocios?", answer: "Utiliza palabras clave específicas del sector, cuantifica tus logros y adapta tu currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Oficial de Desarrollo de Negocios?", answer: "Las habilidades clave incluyen análisis de mercado, negociación, gestión de relaciones con clientes y estrategia de ventas." },
    ],
  },
  "business-development-specialist": {
    slug: "especialista-en-desarrollo-de-negocios",
    title: "Especialista en Desarrollo de Negocios",
    keywords: ["currículum de especialista en desarrollo de negocios", "CV de especialista en desarrollo de negocios", "ejemplo currículum especialista en desarrollo de negocios", "plantilla CV especialista en desarrollo de negocios"],
    searchIntents: ["cómo escribir currículum de especialista en desarrollo de negocios", "ejemplos currículum especialista en desarrollo de negocios", "mejor formato CV especialista en desarrollo de negocios"],
    topSkills: ["Planificación Estratégica", "Investigación de Mercados", "Pronóstico de Ventas", "Generación de Leads", "Gestión de Relaciones con Clientes", "Negociación", "Red de Contactos", "Análisis de Datos", "Gestión de Proyectos", "Conocimientos Financieros"],
    atsKeywords: ["desarrollo de negocios", "estrategia de ventas", "adquisición de clientes", "crecimiento de ingresos", "análisis competitivo", "desarrollo de alianzas", "software CRM", "expansión de mercado", "compromiso de partes interesadas", "análisis de negocios", "establecimiento de objetivos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Desarrollo de Negocios",
      summary: "Especialista en Desarrollo de Negocios con más de 5 años de experiencia en impulsar el crecimiento de ingresos y construir alianzas estratégicas. Aumenté con éxito la adquisición de clientes en un 30% año tras año mediante estrategias de ventas innovadoras.",
      skills: ["Planificación Estratégica", "Investigación de Mercados", "Pronóstico de Ventas", "Generación de Leads", "Gestión de Relaciones con Clientes", "Negociación", "Red de Contactos", "Análisis de Datos", "Gestión de Proyectos", "Conocimientos Financieros"],
      experience: [
        {
          title: "Especialista Senior en Desarrollo de Negocios",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas anuales en un 25%, lo que resultó en $2M de ingresos adicionales.",
            "Desarrollé 5 alianzas estratégicas clave, mejorando la presencia en el mercado.",
            "Optimicé el proceso de generación de leads, reduciendo el tiempo de conversión en un 15%.",
          ],
        },
        {
          title: "Asociado de Desarrollo de Negocios",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Integré con éxito a 15 nuevos clientes, contribuyendo a un crecimiento del 20% en la base de clientes.",
            "Implementé iniciativas de investigación de mercado que mejoraron la oferta de productos.",
            "Colaboré con marketing para lanzar una campaña que aumentó la visibilidad de la marca.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Expert", issuer: "International Business Academy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Business Development Specialist en su currículum?", answer: "Debe incluir experiencia relevante, habilidades clave, logros cuantificables y educación pertinente." },
      { question: "¿Cómo destacar mi currículum de Business Development Specialist?", answer: "Utiliza palabras clave de la industria y cuantifica tus logros para demostrar tu impacto." },
      { question: "¿Qué habilidades necesita un Business Development Specialist?", answer: "Necesita habilidades en planificación estratégica, negociación, análisis de datos y gestión de relaciones." },
    ],
  },
  "car-sales-associate": {
    slug: "asociado-de-ventas-de-autos",
    title: "Asociado de Ventas de Autos",
    keywords: ["currículum de asociado de ventas de autos", "CV de asociado de ventas de autos", "ejemplo currículum asociado de ventas de autos", "plantilla CV asociado de ventas de autos"],
    searchIntents: ["cómo escribir currículum de asociado de ventas de autos", "ejemplos currículum asociado de ventas de autos", "mejor formato CV asociado de ventas de autos"],
    topSkills: ["Gestión de Relaciones con Clientes", "Negociación de Ventas", "Conocimiento del Producto", "Generación de Leads", "Cierre de Ventas", "Gestión del Tiempo", "Habilidades de Comunicación", "Análisis de Mercado", "Resolución de Conflictos", "Colaboración en Equipo"],
    atsKeywords: ["ventas automotrices", "servicio al cliente", "metas de ventas", "demostración de productos", "estrategia de ventas", "gestión de inventario", "seguimiento", "presentaciones de ventas", "habilidades de negociación", "prospección", "gestión de leads"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas de Autos",
      summary: "Asociado de Ventas de Autos dedicado con más de 5 años de experiencia en ventas automotrices, superando consistentemente las metas de ventas en un 20% y reconocido por un servicio al cliente excepcional.",
      skills: ["Gestión de Relaciones con Clientes", "Negociación de Ventas", "Conocimiento del Producto", "Generación de Leads", "Cierre de Ventas", "Gestión del Tiempo", "Habilidades de Comunicación", "Análisis de Mercado", "Resolución de Conflictos", "Colaboración en Equipo"],
      experience: [
        {
          title: "Asociado Senior de Ventas de Autos",
          company: "AutoNation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas mensuales en un 25% a través de técnicas de upselling efectivas.",
            "Logré ser el mejor asociado de ventas del segundo trimestre de 2022 con más de $500,000 en ventas.",
            "Desarrollé programas de lealtad de clientes que mejoraron la tasa de clientes recurrentes en un 30%.",
          ],
        },
        {
          title: "Asociado de Ventas de Autos",
          company: "CarMax",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé consistentemente el 120% de las metas de ventas mensuales.",
            "Facilité más de 200 transacciones de ventas exitosas anualmente.",
            "Gané el premio 'Mejor Nuevo Asociado' por un rendimiento excepcional en mi primer año.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Automotive Sales Professional", issuer: "National Automobile Dealers Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Car Sales Associate en su currículum?", answer: "Un Car Sales Associate debe incluir su experiencia en ventas, habilidades de atención al cliente, y logros en ventas." },
      { question: "¿Cómo destacar mi currículum de Car Sales Associate?", answer: "Para destacar su currículum, incluya métricas de ventas que demuestren su éxito y habilidades relevantes." },
      { question: "¿Qué habilidades necesita un Car Sales Associate?", answer: "Un Car Sales Associate necesita habilidades en ventas, comunicación, gestión del tiempo y resolución de conflictos." },
    ],
  },
  "car-sales-representative": {
    slug: "representante-de-ventas-de-autos",
    title: "Representante de Ventas de Autos",
    keywords: ["currículum de representante de ventas de autos", "CV de representante de ventas de autos", "ejemplo currículum representante de ventas de autos", "plantilla CV representante de ventas de autos"],
    searchIntents: ["cómo escribir currículum de representante de ventas de autos", "ejemplos currículum representante de ventas de autos", "mejor formato CV representante de ventas de autos"],
    topSkills: ["Atención al Cliente", "Negociación de Ventas", "Conocimiento del Producto", "Generación de Leads", "Construcción de Relaciones", "Análisis de Mercado", "Técnicas de Cierre", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas"],
    atsKeywords: ["ventas de automóviles", "retención de clientes", "objetivos de ventas", "operaciones de concesionarios", "gestión de inventario", "software CRM", "pronóstico de ventas", "consultas a clientes", "financiamiento de vehículos", "habilidades de negociación", "satisfacción del cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Ventas de Autos",
      summary: "Representante de Ventas de Autos dedicado con más de 5 años de experiencia en la industria automotriz, superando consistentemente los objetivos de ventas en un promedio del 20% y mejorando los puntajes de satisfacción del cliente en un 15%.",
      skills: ["Atención al Cliente", "Negociación de Ventas", "Conocimiento del Producto", "Generación de Leads", "Construcción de Relaciones", "Análisis de Mercado", "Técnicas de Cierre", "Gestión del Tiempo", "Comunicación", "Resolución de Problemas"],
      experience: [
        {
          title: "Consultor de Ventas Senior",
          company: "AutoNation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas trimestrales en un 30%, generando $500,000 adicionales en ingresos.",
            "Logré una calificación de satisfacción del cliente del 95% basada en encuestas post-venta.",
            "Capacité y mentoreé a 5 representantes de ventas junior, mejorando el rendimiento del equipo.",
          ],
        },
        {
          title: "Representante de Ventas",
          company: "CarMax",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé consistentemente los objetivos de ventas mensuales en un promedio del 15%.",
            "Desarrollé un programa de referidos que aumentó las referencias de clientes en un 25%.",
            "Participé en eventos de alcance comunitario, mejorando la visibilidad de la marca.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un representante de ventas de autos en su currículum?", answer: "Incluir experiencia relevante, habilidades de ventas, y logros en atención al cliente." },
      { question: "¿Cómo destacar mi currículum de representante de ventas de autos?", answer: "Utilizar palabras clave de la industria y resaltar logros cuantificables." },
      { question: "¿Qué habilidades necesita un representante de ventas de autos?", answer: "Habilidades en atención al cliente, negociación, y conocimiento del producto son esenciales." },
    ],
  },
  "direct-salesperson": {
    slug: "vendedor-directo",
    title: "Vendedor Directo",
    keywords: ["currículum de Vendedor Directo", "CV de Vendedor Directo", "ejemplo currículum Vendedor Directo", "plantilla CV Vendedor Directo"],
    searchIntents: ["cómo escribir currículum de Vendedor Directo", "ejemplos currículum Vendedor Directo", "mejor formato CV Vendedor Directo"],
    topSkills: ["comunicación", "negociación", "servicio al cliente", "generación de leads", "desarrollo de relaciones", "estrategia de ventas", "gestión de territorio", "conocimiento del producto", "gestión del tiempo", "resolución de problemas"],
    atsKeywords: ["ventas", "ventas directas", "adquisición de clientes", "cierre de ventas", "objetivos de ventas", "ventas B2B", "ventas B2C", "software CRM", "presentaciones de ventas", "venta consultiva", "prospección"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Vendedor Directo",
      summary: "Vendedor Directo dinámico con más de 5 años de experiencia en impulsar el crecimiento de ventas y superar objetivos. Historial comprobado de alcanzar consistentemente el 120% de las metas de ventas mientras mejora la satisfacción del cliente.",
      skills: ["comunicación", "negociación", "servicio al cliente", "generación de leads", "desarrollo de relaciones", "estrategia de ventas", "gestión de territorio", "conocimiento del producto", "gestión del tiempo", "resolución de problemas"],
      experience: [
        {
          title: "Ejecutivo Senior de Ventas Directas",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Incrementé los ingresos por ventas en un 30% en 2022, generando $500,000 adicionales en ingresos anuales.",
            "Cerré exitosamente más de 150 nuevas cuentas en un año, contribuyendo a un crecimiento del 25% en la participación de mercado.",
            "Implementé un nuevo programa de capacitación en ventas que mejoró el rendimiento del equipo en un 15%.",
          ],
        },
        {
          title: "Representante de Ventas Directas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 110% del objetivo de ventas durante tres trimestres consecutivos, siendo reconocido como 'Mejor Desempeño'.",
            "Desarrollé relaciones con más de 200 clientes, lo que llevó a un aumento del 40% en el negocio recurrente.",
            "Realicé más de 50 demostraciones de producto, resultando en una tasa de conversión del 60%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Vendedor Directo en su currículum?", answer: "Incluir habilidades de ventas, logros, y experiencia relevante en ventas directas." },
      { question: "¿Cómo destacar mi currículum de Vendedor Directo?", answer: "Enfocarse en resultados cuantificables y habilidades específicas que aporten valor al empleador." },
      { question: "¿Qué habilidades necesita un Vendedor Directo?", answer: "Comunicación efectiva, habilidades de negociación, y conocimiento del producto son esenciales." },
    ],
  },
  "equity-sales-trader": {
    slug: "equity-sales-trader-curriculum",
    title: "Comerciante de Ventas de Acciones",
    keywords: ["currículum de Comerciante de Ventas de Acciones", "CV de Comerciante de Ventas de Acciones", "ejemplo currículum Comerciante de Ventas de Acciones", "plantilla CV Comerciante de Ventas de Acciones"],
    searchIntents: ["cómo escribir currículum de Comerciante de Ventas de Acciones", "ejemplos currículum Comerciante de Ventas de Acciones", "mejor formato CV Comerciante de Ventas de Acciones"],
    topSkills: ["análisis de mercado", "ejecución de operaciones", "gestión de relaciones con clientes", "gestión de riesgos", "modelado financiero", "habilidades de comunicación", "negociación", "análisis de datos", "análisis de rendimiento", "gestión de cartera"],
    atsKeywords: ["comercio de acciones", "comercio de ventas", "mercados financieros", "estrategias de inversión", "liquidación de operaciones", "mercados de capital", "investigación de acciones", "gestión de órdenes", "servicio al cliente", "tendencias del mercado", "cumplimiento de operaciones"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Comerciante de Ventas de Acciones",
      summary: "Comerciante de Ventas de Acciones con más de 5 años de experiencia en los mercados financieros, especializado en la ejecución de operaciones y la gestión de relaciones con clientes, logrando un aumento del 20% en el rendimiento de la cartera de clientes en el último año fiscal.",
      skills: ["análisis de mercado", "ejecución de operaciones", "gestión de relaciones con clientes", "gestión de riesgos", "modelado financiero", "habilidades de comunicación", "negociación", "análisis de datos", "análisis de rendimiento", "gestión de cartera"],
      experience: [
        {
          title: "Comerciante de Ventas de Acciones Senior",
          company: "Goldman Sachs",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó el volumen de operaciones en un 15% año tras año, resultando en $2 millones adicionales en ingresos.",
            "Gestionó una cartera de más de 50 clientes, mejorando los índices de satisfacción del cliente en un 30%.",
            "Implementó nuevas estrategias de trading que redujeron los costos de ejecución en un 10%.",
          ],
        },
        {
          title: "Comerciante de Ventas de Acciones",
          company: "Morgan Stanley",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Generó un aumento del 25% en la actividad de trading de los clientes a través de un servicio personalizado y conocimientos del mercado.",
            "Desarrolló modelos financieros integrales que mejoraron los procesos de toma de decisiones para los clientes.",
            "Colaboró con analistas de inversión para proporcionar a los clientes actualizaciones e insights del mercado oportunos.",
          ],
        },
      ],
      education: [
        { institution: "University of Pennsylvania", degree: "B.S.", field: "Finanzas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Chartered Financial Analyst (CFA)", issuer: "CFA Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Comerciante de Ventas de Acciones en su currículum?", answer: "Debe incluir experiencia en análisis de mercado, ejecución de operaciones, y gestión de relaciones con clientes." },
      { question: "¿Cómo destacar mi currículum de Comerciante de Ventas de Acciones?", answer: "Enfatiza tus logros cuantificables y habilidades clave en el sector financiero." },
      { question: "¿Qué habilidades necesita un Comerciante de Ventas de Acciones?", answer: "Habilidades clave incluyen análisis de datos, gestión de riesgos y comunicación efectiva." },
    ],
  },
  "experienced-business-development-manager": {
    slug: "gerente-de-desarrollo-de-negocios-experimentado",
    title: "Gerente de Desarrollo de Negocios Experimentado",
    keywords: ["currículum de gerente de desarrollo de negocios", "CV de gerente de desarrollo de negocios", "ejemplo currículum gerente de desarrollo de negocios", "plantilla CV gerente de desarrollo de negocios"],
    searchIntents: ["cómo escribir currículum de gerente de desarrollo de negocios", "ejemplos currículum gerente de desarrollo de negocios", "mejor formato CV gerente de desarrollo de negocios"],
    topSkills: ["Planificación Estratégica", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Negociación", "Generación de Leads", "Liderazgo de Equipos Multifuncionales", "Dominio de Software CRM", "Análisis de Datos", "Gestión de Proyectos"],
    atsKeywords: ["desarrollo de negocios", "crecimiento de ventas", "investigación de mercado", "adquisición de clientes", "desarrollo de asociaciones", "generación de ingresos", "asociaciones estratégicas", "estrategia empresarial", "retención de clientes", "pronóstico de ventas", "análisis competitivo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Desarrollo de Negocios Experimentado",
      summary: "Gerente de Desarrollo de Negocios orientado a resultados con más de 8 años de experiencia en impulsar el crecimiento de ingresos y construir asociaciones estratégicas. Historial comprobado de aumento de ventas del 30% año tras año a través de estrategias comerciales innovadoras.",
      skills: ["Planificación Estratégica", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Negociación", "Generación de Leads", "Liderazgo de Equipos Multifuncionales", "Dominio de Software CRM", "Análisis de Datos", "Gestión de Proyectos"],
      experience: [
        {
          title: "Gerente Senior de Desarrollo de Negocios",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos anuales en un 40% al desarrollar nuevas estrategias de mercado.",
            "Expandí la base de clientes en un 25% en un año.",
            "Implementé un nuevo sistema CRM que mejoró la eficiencia del seguimiento de leads en un 50%.",
          ],
        },
        {
          title: "Ejecutivo de Desarrollo de Negocios",
          company: "Global Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Generé $2M en nuevas ventas durante el primer año de empleo.",
            "Alcancé el 120% de los objetivos de ventas de manera constante durante tres años.",
            "Lideré un equipo para negociar y cerrar con éxito un acuerdo de $500K en tres meses.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Expert", issuer: "Business Development Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Gerente de Desarrollo de Negocios Experimentado en su currículum?", answer: "Debe incluir experiencia relevante, habilidades clave, logros cuantificables y educación en el campo." },
      { question: "¿Cómo destacar mi currículum de Gerente de Desarrollo de Negocios Experimentado?", answer: "Use palabras clave específicas, cuantifique logros y adapte su CV a la descripción del trabajo." },
      { question: "¿Qué habilidades necesita un Gerente de Desarrollo de Negocios Experimentado?", answer: "Habilidades clave incluyen planificación estratégica, gestión de relaciones, y análisis de mercado." },
    ],
  },
  "fashion-sales-associate": {
    slug: "asociado-de-ventas-de-moda",
    title: "Asociado de Ventas de Moda",
    keywords: ["currículum de asociado de ventas de moda", "CV de asociado de ventas de moda", "ejemplo currículum asociado de ventas de moda", "plantilla CV asociado de ventas de moda"],
    searchIntents: ["cómo escribir currículum de asociado de ventas de moda", "ejemplos currículum asociado de ventas de moda", "mejor formato CV asociado de ventas de moda"],
    topSkills: ["Atención al Cliente", "Técnicas de Venta", "Merchandising Visual", "Conocimiento del Producto", "Gestión de Inventario", "Comunicación", "Colaboración en Equipo", "Conocimiento de Tendencias de Moda", "Venta Adicional", "Resolución de Conflictos"],
    atsKeywords: ["Ventas", "Venta al por menor de moda", "Compromiso del Cliente", "Logro de Objetivos", "Promoción de Marca", "Operaciones de Tienda", "Gestión de Relaciones con Clientes", "Reportes de Ventas", "Estrategia Minorista", "Liderazgo de Equipo", "Análisis de Mercado"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas de Moda",
      summary: "Asociado de Ventas de Moda dinámico con más de 5 años de experiencia en el comercio minorista y un historial comprobado de superar los objetivos de ventas en un 20%. Hábil en la construcción de relaciones sólidas con los clientes y en impulsar la lealtad a la marca.",
      skills: ["Atención al Cliente", "Técnicas de Venta", "Merchandising Visual", "Conocimiento del Producto", "Gestión de Inventario", "Comunicación", "Colaboración en Equipo", "Conocimiento de Tendencias de Moda", "Venta Adicional", "Resolución de Conflictos"],
      experience: [
        {
          title: "Asociado Senior de Ventas de Moda",
          company: "Nordstrom",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% durante la temporada navideña a través de estrategias de venta adicional efectivas.",
            "Logré una calificación de satisfacción del cliente del 95% basada en encuestas post-compra.",
            "Entrené a 5 nuevos asociados en técnicas de venta y conocimiento del producto, mejorando el rendimiento del equipo.",
          ],
        },
        {
          title: "Asociado de Ventas de Moda",
          company: "Macy's",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé constantemente los objetivos de ventas mensuales en un promedio del 15%.",
            "Desarrollé e implementé exhibiciones de merchandising visual que aumentaron el tráfico peatonal en un 30%.",
            "Reconocido como 'Empleado del Mes' en dos ocasiones por un servicio al cliente excepcional.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Merchandising de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Sales Professional", issuer: "National Retail Federation", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Fashion Sales Associate en su currículum?", answer: "Incluya su experiencia en ventas, habilidades de servicio al cliente y logros destacados." },
      { question: "¿Cómo destacar mi currículum de Fashion Sales Associate?", answer: "Utilice palabras clave relevantes y cuantifique sus logros para captar la atención de los reclutadores." },
      { question: "¿Qué habilidades necesita un Fashion Sales Associate?", answer: "Habilidades en atención al cliente, técnicas de venta, y una buena comprensión de las tendencias de moda." },
    ],
  },
  "field-sales-engineer": {
    slug: "ingeniero-de-ventas-en-campo",
    title: "Ingeniero de Ventas en Campo",
    keywords: ["currículum de ingeniero de ventas en campo", "CV de ingeniero de ventas en campo", "ejemplo currículum ingeniero de ventas en campo", "plantilla CV ingeniero de ventas en campo"],
    searchIntents: ["cómo escribir currículum de ingeniero de ventas en campo", "ejemplos currículum ingeniero de ventas en campo", "mejor formato CV ingeniero de ventas en campo"],
    topSkills: ["Ventas Técnicas", "Gestión de Relaciones con Clientes", "Conocimiento del Producto", "Habilidades de Negociación", "Resolución de Problemas", "Habilidades de Comunicación", "Redes de Contacto", "Estrategia de Ventas", "Análisis de Mercado", "Gestión de Proyectos"],
    atsKeywords: ["ingeniería de ventas", "soporte técnico", "compromiso del cliente", "presentaciones de ventas", "demostraciones de productos", "generación de leads", "gestión de pipeline", "gestión de territorio", "soluciones técnicas", "ventas B2B", "construcción de relaciones"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Ventas en Campo",
      summary: "Ingeniero de Ventas en Campo experimentado con más de 5 años de experiencia en impulsar el crecimiento de ventas y mejorar la satisfacción del cliente, logrando un aumento del 30% en los ingresos por ventas en 2022.",
      skills: ["Ventas Técnicas", "Gestión de Relaciones con Clientes", "Conocimiento del Producto", "Habilidades de Negociación", "Resolución de Problemas", "Habilidades de Comunicación", "Redes de Contacto", "Estrategia de Ventas", "Análisis de Mercado", "Gestión de Proyectos"],
      experience: [
        {
          title: "Ingeniero de Ventas en Campo Senior",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Incrementé las ventas del territorio en un 40% en el primer año, contribuyendo a $1 millón en ingresos adicionales.",
            "Lancé con éxito 3 nuevos productos, lo que resultó en un aumento del 25% en la cuota de mercado.",
            "Desarrollé programas de capacitación para el nuevo personal de ventas, mejorando la eficiencia de integración en un 50%.",
          ],
        },
        {
          title: "Ingeniero de Ventas en Campo",
          company: "Innovative Tech Corp.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de la cuota de ventas durante 3 trimestres consecutivos.",
            "Fortalecí las relaciones con los clientes, lo que llevó a un aumento del 15% en el negocio recurrente.",
            "Colaboré con equipos de ingeniería para personalizar soluciones, mejorando las tasas de satisfacción del cliente en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Tecnología de Ingeniería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Engineer", issuer: "Sales Engineering Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Ventas en Campo en su currículum?", answer: "Incluya su experiencia en ventas técnicas, habilidades de negociación y logros cuantificables en sus resultados." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Ventas en Campo?", answer: "Utilice palabras clave relevantes y resalte sus logros más significativos para captar la atención del reclutador." },
      { question: "¿Qué habilidades necesita un Ingeniero de Ventas en Campo?", answer: "Necesita habilidades en ventas técnicas, gestión de relaciones con clientes y una sólida capacidad de comunicación." },
    ],
  },
  "furniture-sales-associate": {
    slug: "asociado-de-ventas-de-muebles",
    title: "Asociado de Ventas de Muebles",
    keywords: ["currículum de asociado de ventas de muebles", "CV de asociado de ventas de muebles", "ejemplo currículum asociado de ventas de muebles", "plantilla CV asociado de ventas de muebles"],
    searchIntents: ["cómo escribir currículum de asociado de ventas de muebles", "ejemplos currículum asociado de ventas de muebles", "mejor formato CV asociado de ventas de muebles"],
    topSkills: ["Atención al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Gestión de Inventario", "Habilidades de Comunicación", "Habilidades de Negociación", "Merchandising Visual", "Construcción de Relaciones", "Gestión del Tiempo", "Resolución de Problemas"],
    atsKeywords: ["ventas", "compromiso del cliente", "ventas de muebles", "experiencia en retail", "demostración de productos", "venta adicional", "venta cruzada", "colaboración en equipo", "metas de ventas", "satisfacción del cliente", "tendencias del mercado"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas de Muebles",
      summary: "Asociado de Ventas de Muebles dedicado con más de 5 años de experiencia en ventas al por menor, logrando consistentemente metas de ventas en un 20%. Capacidad comprobada para mejorar la satisfacción del cliente a través de un servicio personalizado.",
      skills: ["Atención al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Gestión de Inventario", "Habilidades de Comunicación", "Habilidades de Negociación", "Merchandising Visual", "Construcción de Relaciones", "Gestión del Tiempo", "Resolución de Problemas"],
      experience: [
        {
          title: "Asociado de Ventas Senior",
          company: "Ashley Furniture",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 30% año tras año a través de estrategias de marketing dirigidas.",
            "Logré el estatus de mejor asociado de ventas durante tres trimestres consecutivos.",
            "Implementé programas de retroalimentación del cliente que mejoraron los puntajes de satisfacción en un 15%.",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "IKEA",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé con éxito las metas de ventas en un 25% durante la temporada alta.",
            "Desarrollé y mantuve relaciones sólidas con los clientes que llevaron a un aumento del 40% en clientes recurrentes.",
            "Contribuí al merchandising visual que mejoró la visibilidad del producto y condujo a un aumento del 10% en las ventas.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Certification Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Furniture Sales Associate en su currículum?", answer: "Debe incluir su experiencia laboral, habilidades relevantes y logros en ventas." },
      { question: "¿Cómo destacar mi currículum de Furniture Sales Associate?", answer: "Resalte sus logros en ventas y habilidades de atención al cliente específicas." },
      { question: "¿Qué habilidades necesita un Furniture Sales Associate?", answer: "Habilidades en ventas, atención al cliente, y conocimiento del producto son esenciales." },
    ],
  },
  "google-account-executive": {
    slug: "ejecutivo-de-cuentas-google",
    title: "Ejecutivo de Cuentas en Google",
    keywords: ["currículum de Ejecutivo de Cuentas en Google", "CV de Ejecutivo de Cuentas en Google", "ejemplo currículum Ejecutivo de Cuentas en Google", "plantilla CV Ejecutivo de Cuentas en Google"],
    searchIntents: ["cómo escribir currículum de Ejecutivo de Cuentas en Google", "ejemplos currículum Ejecutivo de Cuentas en Google", "mejor formato CV Ejecutivo de Cuentas en Google"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Publicidad Digital", "Negociación", "Investigación de Mercado", "Crecimiento de Ingresos", "Análisis de Datos", "Habilidades de Presentación", "Generación de Leads", "Colaboración Interfuncional"],
    atsKeywords: ["Google Ads", "Gestión de Cuentas", "Salesforce", "Compromiso del Cliente", "Desarrollo de Negocios", "Ventas B2B", "Métricas de Rendimiento", "Alianzas Estratégicas", "Retención de Clientes", "Pronóstico de Ventas", "Penetración de Mercado"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ejecutivo de Cuentas en Google",
      summary: "Profesional de ventas orientado a resultados con más de 5 años de experiencia en publicidad digital y un historial comprobado de superar los objetivos de ventas en un 30%. Hábil en construir relaciones sólidas con los clientes y en impulsar el crecimiento de ingresos.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Publicidad Digital", "Negociación", "Investigación de Mercado", "Crecimiento de Ingresos", "Análisis de Datos", "Habilidades de Presentación", "Generación de Leads", "Colaboración Interfuncional"],
      experience: [
        {
          title: "Ejecutivo de Cuentas Senior",
          company: "Google",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos del portafolio de clientes en un 40% en un año mediante ventas estratégicas.",
            "Gestioné más de 50 cuentas de alto valor, logrando una tasa de retención de clientes del 95%.",
            "Desarrollé y ejecuté estrategias de marketing personalizadas que resultaron en un aumento del 25% en el rendimiento de las campañas.",
          ],
        },
        {
          title: "Ejecutivo de Cuentas",
          company: "Facebook",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de la cuota de ventas durante tres trimestres consecutivos.",
            "Lancé con éxito un nuevo producto publicitario que generó $1M en ingresos en seis meses.",
            "Realicé un análisis de mercado que contribuyó a un aumento del 15% en la cuota de mercado.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Google Ads Certification", issuer: "Google", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Google Account Executive en su currículum?", answer: "Un Google Account Executive debe incluir sus logros en ventas, habilidades de gestión de cuentas y experiencia en publicidad digital." },
      { question: "¿Cómo destacar mi currículum de Google Account Executive?", answer: "Para destacar su currículum, enfatice sus logros cuantificables y habilidades relevantes que se alineen con los requisitos del puesto." },
      { question: "¿Qué habilidades necesita un Google Account Executive?", answer: "Un Google Account Executive necesita habilidades en ventas, gestión de relaciones, publicidad digital, y análisis de datos." },
    ],
  },
  "insurance-sales-agent": {
    slug: "agente-de-ventas-de-seguros",
    title: "Agente de Ventas de Seguros",
    keywords: ["currículum de Agente de Ventas de Seguros", "CV de Agente de Ventas de Seguros", "ejemplo currículum Agente de Ventas de Seguros", "plantilla CV Agente de Ventas de Seguros"],
    searchIntents: ["cómo escribir currículum de Agente de Ventas de Seguros", "ejemplos currículum Agente de Ventas de Seguros", "mejor formato CV Agente de Ventas de Seguros"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Negociación", "Evaluación de Riesgos", "Conocimiento de Pólizas", "Generación de Leads", "Resolución de Problemas", "Comunicación", "Habilidades Analíticas", "Gestión del Tiempo"],
    atsKeywords: ["ventas de seguros", "servicio al cliente", "objetivos de ventas", "suscripción de pólizas", "adquisición de clientes", "regulaciones de seguros", "retención de clientes", "análisis de mercado", "planificación financiera", "presentaciones de ventas", "networking"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Agente de Ventas de Seguros",
      summary: "Agente de ventas de seguros dinámico con más de 5 años de experiencia en el campo, superando consistentemente los objetivos de ventas en un 30% y construyendo relaciones duraderas con los clientes.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Negociación", "Evaluación de Riesgos", "Conocimiento de Pólizas", "Generación de Leads", "Resolución de Problemas", "Comunicación", "Habilidades Analíticas", "Gestión del Tiempo"],
      experience: [
        {
          title: "Agente de Ventas de Seguros Senior",
          company: "State Farm Insurance",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas anuales en un 40%, generando $200,000 adicionales en ingresos.",
            "Integré con éxito a más de 100 nuevos clientes en el primer año.",
            "Desarrollé un programa de referencias que aumentó las referencias de clientes en un 25%.",
          ],
        },
        {
          title: "Agente de Ventas de Seguros",
          company: "Allstate Insurance",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré el 150% de la cuota de ventas durante tres trimestres consecutivos.",
            "Implementé estrategias de retroalimentación del cliente que mejoraron los puntajes de satisfacción del cliente en un 15%.",
            "Entrené y mentoreé a nuevos agentes, contribuyendo a una reducción del 20% en el tiempo de incorporación.",
          ],
        },
      ],
      education: [
        { institution: "University of Florida", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Licensed Insurance Agent", issuer: "Florida Department of Financial Services", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Agente de Ventas de Seguros en su currículum?", answer: "Incluya su experiencia en ventas, habilidades de comunicación y logros específicos en el sector de seguros." },
      { question: "¿Cómo destacar mi currículum de Agente de Ventas de Seguros?", answer: "Utilice métricas específicas que demuestren su impacto en ventas y satisfacción del cliente." },
      { question: "¿Qué habilidades necesita un Agente de Ventas de Seguros?", answer: "Habilidades en ventas, negociación, gestión de relaciones y conocimiento del sector de seguros son clave." },
    ],
  },
  "international-sales-representative": {
    slug: "representante-de-ventas-internacionales",
    title: "Representante de Ventas Internacionales",
    keywords: ["currículum de representante de ventas internacionales", "CV de representante de ventas internacionales", "ejemplo currículum representante de ventas internacionales", "plantilla CV representante de ventas internacionales"],
    searchIntents: ["cómo escribir currículum de representante de ventas internacionales", "ejemplos currículum representante de ventas internacionales", "mejor formato CV representante de ventas internacionales"],
    topSkills: ["Estrategia de Ventas", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Comunicación Intercultural", "Pronóstico de Ventas", "Generación de Leads", "Conocimiento del Producto", "Servicio al Cliente", "Red de Contactos"],
    atsKeywords: ["ventas internacionales", "representante de ventas", "adquisición de clientes", "gestión de territorio", "ventas B2B", "gestión de cuentas", "presentaciones de ventas", "creación de relaciones", "expansión de mercado", "negociación de contratos", "objetivos de ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Ventas Internacionales",
      summary: "Representante de Ventas Internacionales dedicado con más de 5 años de experiencia en impulsar el crecimiento de ingresos y expandir la presencia en el mercado. Aumentó las ventas en un 30% año tras año a través de un compromiso estratégico con los clientes y análisis de mercado.",
      skills: ["Estrategia de Ventas", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Comunicación Intercultural", "Pronóstico de Ventas", "Generación de Leads", "Conocimiento del Producto", "Servicio al Cliente", "Red de Contactos"],
      experience: [
        {
          title: "Representante Senior de Ventas Internacionales",
          company: "Global Tech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos por ventas en $1.2M en el primer año mediante la adquisición de nuevos clientes.",
            "Expandí la presencia en el mercado en Europa, lo que resultó en un crecimiento del 25% en la base de clientes.",
            "Desarrollé asociaciones estratégicas que mejoraron la oferta de productos y el alcance del mercado.",
          ],
        },
        {
          title: "Representante de Ventas Internacionales",
          company: "Tech Innovations Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 150% de los objetivos de ventas durante tres trimestres consecutivos.",
            "Lideré iniciativas de análisis de mercado que identificaron oportunidades clave de crecimiento.",
            "Facilité exitosas ferias comerciales internacionales, aumentando la visibilidad de la marca.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Negocios Internacionales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified International Sales Professional", issuer: "International Sales Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Representante de Ventas Internacionales en su currículum?", answer: "Un Representante de Ventas Internacionales debe incluir su experiencia en ventas, habilidades de negociación, y logros en la adquisición de clientes." },
      { question: "¿Cómo destacar mi currículum de Representante de Ventas Internacionales?", answer: "Destacar logros cuantificables y habilidades clave en ventas internacionales es fundamental para atraer la atención de los reclutadores." },
      { question: "¿Qué habilidades necesita un Representante de Ventas Internacionales?", answer: "Habilidades en estrategia de ventas, análisis de mercado, y gestión de relaciones son cruciales para el éxito en este rol." },
    ],
  },
  "jewelry-sales-associate": {
    slug: "asociado-de-ventas-de-joyas",
    title: "Asociado de Ventas de Joyas",
    keywords: ["currículum de asociado de ventas de joyas", "CV de asociado de ventas de joyas", "ejemplo currículum asociado de ventas de joyas", "plantilla CV asociado de ventas de joyas"],
    searchIntents: ["cómo escribir currículum de asociado de ventas de joyas", "ejemplos currículum asociado de ventas de joyas", "mejor formato CV asociado de ventas de joyas"],
    topSkills: ["Servicio al Cliente", "Técnicas de Ventas", "Conocimiento de Productos", "Merchandising Visual", "Gestión de Inventario", "Habilidades de Comunicación", "Gestión del Tiempo", "Construcción de Relaciones", "Habilidades de Negociación", "Manejo de Efectivo"],
    atsKeywords: ["ventas de joyas", "asociado de ventas", "compromiso del cliente", "experiencia en retail", "exhibición de productos", "metas de ventas", "relaciones con clientes", "colaboración en equipo", "venta adicional", "merchandising", "sistemas POS"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas de Joyas",
      summary: "Asociado de Ventas de Joyas dedicado con más de 5 años de experiencia en retail de alta gama, logrando un aumento del 20% en ventas a través de un servicio al cliente excepcional y un amplio conocimiento de productos.",
      skills: ["Servicio al Cliente", "Técnicas de Ventas", "Conocimiento de Productos", "Merchandising Visual", "Gestión de Inventario", "Habilidades de Comunicación", "Gestión del Tiempo", "Construcción de Relaciones", "Habilidades de Negociación", "Manejo de Efectivo"],
      experience: [
        {
          title: "Asociado Senior de Ventas de Joyas",
          company: "Tiffany & Co.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 30% en el primer trimestre de 2022 a través de un compromiso personalizado con los clientes.",
            "Reconocido como Empleado del Mes durante tres meses consecutivos, destacando un rendimiento excepcional.",
            "Capacité exitosamente a nuevo personal, resultando en una mejora del 15% en las métricas de ventas del equipo.",
          ],
        },
        {
          title: "Asociado de Ventas de Joyas",
          company: "Zales",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré el estatus de mejor asociado de ventas durante dos años consecutivos, superando las metas de ventas en un promedio del 25%.",
            "Desarrollé relaciones sólidas con clientes recurrentes, lo que llevó a un aumento del 40% en la retención de clientes.",
            "Implementé técnicas de merchandising visual que aumentaron el tráfico de clientes en la tienda en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "Fashion Institute of Technology", degree: "B.S.", field: "Merchandising de Moda", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Jewelry Sales Professional", issuer: "Gemological Institute of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asociado de Ventas de Joyas en su currículum?", answer: "Un asociado de ventas de joyas debe incluir experiencia en ventas, habilidades de atención al cliente, y logros cuantificables en ventas." },
      { question: "¿Cómo destacar mi currículum de Asociado de Ventas de Joyas?", answer: "Destaca tus logros en ventas, tu capacidad para construir relaciones con clientes y tu conocimiento de productos." },
      { question: "¿Qué habilidades necesita un Asociado de Ventas de Joyas?", answer: "Las habilidades clave incluyen servicio al cliente, técnicas de ventas, y merchandising visual." },
    ],
  },
  "location-sales-manager-at-advantage-ez-rent-a-car-resume": {
    slug: "location-sales-manager-advantage-ez-rent-a-car-cv",
    title: "Gerente de Ventas de Ubicación en Advantage Ez Rent A Car",
    keywords: ["currículum de Gerente de Ventas de Ubicación", "CV de Gerente de Ventas de Ubicación", "ejemplo currículum Gerente de Ventas de Ubicación", "plantilla CV Gerente de Ventas de Ubicación"],
    searchIntents: ["cómo escribir currículum de Gerente de Ventas de Ubicación", "ejemplos currículum Gerente de Ventas de Ubicación", "mejor formato CV Gerente de Ventas de Ubicación"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Análisis de Mercado", "Liderazgo de Equipo", "Negociación", "Pronóstico de Ventas", "Gestión de Presupuesto", "Métricas de Rendimiento", "Capacitación y Desarrollo", "Resolución de Problemas"],
    atsKeywords: ["gestión de ventas", "servicio al cliente", "desarrollo de negocios", "logro de objetivos", "crecimiento de ingresos", "generación de leads", "venta cruzada", "planificación estratégica", "eficiencia operativa", "penetración de mercado", "rendimiento del equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Ventas de Ubicación en Advantage Ez Rent A Car",
      summary: "Gerente de Ventas de Ubicación dinámico con más de 5 años de experiencia en impulsar el crecimiento de ventas y mejorar la satisfacción del cliente. Historial comprobado de aumento de ingresos por alquiler en un 30% año tras año a través de iniciativas estratégicas y un liderazgo efectivo del equipo.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Análisis de Mercado", "Liderazgo de Equipo", "Negociación", "Pronóstico de Ventas", "Gestión de Presupuesto", "Métricas de Rendimiento", "Capacitación y Desarrollo", "Resolución de Problemas"],
      experience: [
        {
          title: "Gerente Senior de Ventas de Ubicación",
          company: "Enterprise Rent-A-Car",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas regionales en un 25% dentro del primer año, superando los objetivos de la empresa.",
            "Gestioné con éxito un equipo de 10 asociados de ventas, mejorando las puntuaciones de satisfacción del cliente en un 15%.",
            "Implementé un nuevo programa de capacitación que resultó en un aumento del 20% en las métricas de rendimiento de ventas.",
          ],
        },
        {
          title: "Gerente de Ventas de Ubicación",
          company: "Hertz",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% del objetivo de ventas durante 2020 a pesar de los desafíos del mercado.",
            "Desarrollé un programa de lealtad del cliente que aumentó los negocios recurrentes en un 40%.",
            "Reduje los costos operativos en un 10% a través de mejoras en los procesos y negociaciones con proveedores.",
          ],
        },
      ],
      education: [
        { institution: "University of Marketing and Sales", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Gerente de Ventas de Ubicación en su currículum?", answer: "Un resumen de experiencia laboral relevante, logros cuantificables y habilidades clave en ventas y gestión de equipos." },
      { question: "¿Cómo destacar mi currículum de Gerente de Ventas de Ubicación?", answer: "Incluye resultados medibles de tus logros y personaliza tu currículum para cada puesto al que te postules." },
      { question: "¿Qué habilidades necesita un Gerente de Ventas de Ubicación?", answer: "Habilidades en estrategias de ventas, gestión de relaciones con clientes, liderazgo, y análisis de mercado son esenciales." },
    ],
  },
  "maternity-leave-sales-manager": {
    slug: "gerente-de-ventas-por-baja-maternidad",
    title: "Gerente de Ventas por Baja Maternidad",
    keywords: ["currículum de gerente de ventas por baja maternidad", "CV de gerente de ventas por baja maternidad", "ejemplo currículum gerente de ventas por baja maternidad", "plantilla CV gerente de ventas por baja maternidad"],
    searchIntents: ["cómo escribir currículum de gerente de ventas por baja maternidad", "ejemplos currículum gerente de ventas por baja maternidad", "mejor formato CV gerente de ventas por baja maternidad"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Liderazgo de Equipo", "Negociación", "Análisis de Mercado", "Métricas de Rendimiento", "Pronóstico de Ventas", "Capacitación y Desarrollo", "Adquisición de Clientes", "Crecimiento de Ingresos"],
    atsKeywords: ["gestión de ventas", "compromiso del cliente", "colaboración en equipo", "investigación de mercado", "objetivos de ventas", "generación de leads", "planificación estratégica", "desarrollo de negocios", "seguimiento del rendimiento", "retención de clientes", "capacitación en ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Ventas por Baja Maternidad",
      summary: "Gerente de ventas dinámico con más de 8 años de experiencia en impulsar el crecimiento de ingresos y desarrollar estrategias de ventas. Aumenté exitosamente las ventas en un 30% año tras año mediante un liderazgo efectivo del equipo y un compromiso con los clientes.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Liderazgo de Equipo", "Negociación", "Análisis de Mercado", "Métricas de Rendimiento", "Pronóstico de Ventas", "Capacitación y Desarrollo", "Adquisición de Clientes", "Crecimiento de Ingresos"],
      experience: [
        {
          title: "Gerente de Ventas Senior",
          company: "SalesForce Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas anuales en un 25% a través de programas de capacitación en ventas renovados.",
            "Lideré un equipo de 10 representantes de ventas, alcanzando el 120% del objetivo de ventas para 2022.",
            "Desarrollé una nueva estrategia de adquisición de clientes que resultó en 50 nuevas cuentas en un año.",
          ],
        },
        {
          title: "Gerente de Ventas",
          company: "Global Commerce Corp",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un aumento del 40% en la retención de clientes a través de una mejor gestión de relaciones.",
            "Implementé una nueva herramienta de pronóstico de ventas que mejoró la precisión en un 30%.",
            "Negocié exitosamente contratos por más de $1M con clientes clave.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Executive", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Gerente de Ventas por Baja Maternidad en su currículum?", answer: "Incluir experiencia relevante, logros cuantificables y habilidades clave en ventas." },
      { question: "¿Cómo destacar mi currículum de Gerente de Ventas por Baja Maternidad?", answer: "Utilizar palabras clave del sector, resaltar logros y personalizar el contenido para cada aplicación." },
      { question: "¿Qué habilidades necesita un Gerente de Ventas por Baja Maternidad?", answer: "Habilidades en estrategia de ventas, gestión de relaciones, liderazgo y análisis de mercado." },
    ],
  },
  "pepsico-sales-intelligence-manager": {
    slug: "pepsico-sales-intelligence-manager",
    title: "Gerente de Inteligencia de Ventas en Pepsico",
    keywords: ["currículum de Gerente de Inteligencia de Ventas en Pepsico", "CV de Gerente de Inteligencia de Ventas en Pepsico", "ejemplo currículum Gerente de Inteligencia de Ventas en Pepsico", "plantilla CV Gerente de Inteligencia de Ventas en Pepsico"],
    searchIntents: ["cómo escribir currículum de Gerente de Inteligencia de Ventas en Pepsico", "ejemplos currículum Gerente de Inteligencia de Ventas en Pepsico", "mejor formato CV Gerente de Inteligencia de Ventas en Pepsico"],
    topSkills: ["Análisis de Datos", "Estrategia de Ventas", "Investigación de Mercado", "Perspectivas del Cliente", "Inteligencia de Negocios", "Pronóstico", "Análisis Competitivo", "Colaboración Interfuncional", "Gestión de Stakeholders", "Gestión de Proyectos"],
    atsKeywords: ["Gestión de Ventas", "Visualización de Datos", "Software CRM", "SQL", "Pronóstico de Ventas", "Métricas de Rendimiento", "Habilidades Analíticas", "Habilidades de Presentación", "Tendencias del Mercado", "Planificación Estratégica", "Relaciones con Clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Inteligencia de Ventas en Pepsico",
      summary: "Gerente de Inteligencia de Ventas con más de 5 años de experiencia en la toma de decisiones basadas en datos y la optimización de estrategias de ventas. Historial comprobado de aumento del rendimiento de ventas en un 15% a través de un análisis de mercado efectivo y perspectivas accionables.",
      skills: ["Análisis de Datos", "Estrategia de Ventas", "Investigación de Mercado", "Perspectivas del Cliente", "Inteligencia de Negocios", "Pronóstico", "Análisis Competitivo", "Colaboración Interfuncional", "Gestión de Stakeholders", "Gestión de Proyectos"],
      experience: [
        {
          title: "Gerente Senior de Inteligencia de Ventas",
          company: "Coca-Cola Company",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas generales en un 20% a través de estrategias mejoradas de análisis de datos y pronóstico de ventas.",
            "Lideré un equipo de 5 analistas para ofrecer perspectivas que mejoraron la retención de clientes en un 30%.",
            "Desarrollé e implementé un nuevo sistema CRM que redujo el tiempo de recuperación de datos en un 40%.",
          ],
        },
        {
          title: "Analista de Ventas",
          company: "Nestlé",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Identifiqué tendencias clave del mercado que resultaron en un aumento del 10% en la tasa de éxito de lanzamientos de productos.",
            "Creé un informe de ventas integral que influyó en la toma de decisiones ejecutivas.",
            "Colaboré con marketing para mejorar las estrategias promocionales, lo que llevó a un aumento del 15% en las ventas durante las campañas.",
          ],
        },
      ],
      education: [
        { institution: "University of Michigan", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Gerente de Inteligencia de Ventas en Pepsico en su currículum?", answer: "Incluir habilidades analíticas, experiencia en gestión de ventas y logros en aumentos de rendimiento de ventas." },
      { question: "¿Cómo destacar mi currículum de Gerente de Inteligencia de Ventas en Pepsico?", answer: "Enfatizar logros cuantificables y experiencia relevante en inteligencia de ventas." },
      { question: "¿Qué habilidades necesita un Gerente de Inteligencia de Ventas en Pepsico?", answer: "Habilidades en análisis de datos, estrategia de ventas y gestión de relaciones con clientes." },
    ],
  },
  "pharmaceutical-sales-manager": {
    slug: "gerente-de-ventas-farmaceuticas",
    title: "Gerente de Ventas Farmacéuticas",
    keywords: ["currículum de gerente de ventas farmacéuticas", "CV de gerente de ventas farmacéuticas", "ejemplo currículum gerente de ventas farmacéuticas", "plantilla CV gerente de ventas farmacéuticas"],
    searchIntents: ["cómo escribir currículum de gerente de ventas farmacéuticas", "ejemplos currículum gerente de ventas farmacéuticas", "mejor formato CV gerente de ventas farmacéuticas"],
    topSkills: ["Estrategia de Ventas", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Liderazgo de Equipo", "Conocimiento del Producto", "Cumplimiento Normativo", "Pronóstico de Ventas", "Capacitación y Desarrollo", "Análisis de Datos"],
    atsKeywords: ["ventas farmacéuticas", "gestión de ventas", "desarrollo de negocios", "gestión de territorio", "gestión de cuentas clave", "compromiso del cliente", "negociación de contratos", "capacitación en ventas", "planificación estratégica", "lanzamiento de productos", "investigación de mercado"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Ventas Farmacéuticas",
      summary: "Gerente de Ventas Farmacéuticas orientado a resultados con más de 8 años de experiencia en impulsar el crecimiento de ventas y mejorar las relaciones con los clientes. Aumentó con éxito las ventas del territorio en un 30% en un año al implementar estrategias de marketing dirigidas.",
      skills: ["Estrategia de Ventas", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Liderazgo de Equipo", "Conocimiento del Producto", "Cumplimiento Normativo", "Pronóstico de Ventas", "Capacitación y Desarrollo", "Análisis de Datos"],
      experience: [
        {
          title: "Gerente Senior de Ventas Farmacéuticas",
          company: "Pfizer",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas regionales en un 25% durante dos años a través de la gestión estratégica de cuentas.",
            "Desarrollé un programa de capacitación que mejoró el rendimiento del equipo de ventas en un 40%.",
            "Lancé con éxito un nuevo medicamento, alcanzando $5M en ingresos en los primeros seis meses.",
          ],
        },
        {
          title: "Representante de Ventas Farmacéuticas",
          company: "Johnson & Johnson",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de los objetivos de ventas durante tres años consecutivos.",
            "Establecí relaciones con más de 100 profesionales de la salud, mejorando la lealtad a la marca.",
            "Implementé un sistema de retroalimentación del cliente que mejoró las calificaciones de entrega de servicios en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, San Diego", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmaceutical Sales Representative", issuer: "National Association of Pharmaceutical Sales Representatives", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Pharmaceutical Sales Manager en su currículum?", answer: "Un Pharmaceutical Sales Manager debe incluir habilidades relevantes, experiencia laboral, logros en ventas y formación académica." },
      { question: "¿Cómo destacar mi currículum de Pharmaceutical Sales Manager?", answer: "Destaca tus logros cuantificables en ventas y tu capacidad para construir relaciones sólidas con los clientes." },
      { question: "¿Qué habilidades necesita un Pharmaceutical Sales Manager?", answer: "Las habilidades clave incluyen estrategia de ventas, gestión de relaciones con clientes, negociación y liderazgo de equipo." },
    ],
  },
  "pre-sales-consultant": {
    slug: "consultor-pre-ventas",
    title: "Consultor Pre Ventas",
    keywords: ["currículum de consultor pre ventas", "CV de consultor pre ventas", "ejemplo currículum consultor pre ventas", "plantilla CV consultor pre ventas"],
    searchIntents: ["cómo escribir currículum de consultor pre ventas", "ejemplos currículum consultor pre ventas", "mejor formato CV consultor pre ventas"],
    topSkills: ["Ventas Técnicas", "Gestión de Relaciones con Clientes", "Venta de Soluciones", "Demostraciones de Productos", "Estrategia de Ventas", "Análisis de Mercado", "Negociación", "Habilidades de Presentación", "Compromiso con Stakeholders", "Desarrollo de Negocios"],
    atsKeywords: ["Consultor de Ventas", "Pre Ventas", "Compromiso con el Cliente", "Experiencia Técnica", "Soporte de Ventas", "Evaluación de Necesidades del Cliente", "Análisis Competitivo", "Desarrollo de Propuestas", "Diseño de Soluciones", "Gestión de Cuentas", "Pronóstico de Ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Consultor Pre Ventas",
      summary: "Consultor Pre Ventas orientado a resultados con más de 5 años de experiencia en ventas técnicas y compromiso con el cliente. Logré un aumento del 30% en las conversiones de ventas a través de presentaciones y soluciones personalizadas.",
      skills: ["Ventas Técnicas", "Gestión de Relaciones con Clientes", "Venta de Soluciones", "Demostraciones de Productos", "Estrategia de Ventas", "Análisis de Mercado", "Negociación", "Habilidades de Presentación", "Compromiso con Stakeholders", "Desarrollo de Negocios"],
      experience: [
        {
          title: "Consultor Senior Pre Ventas",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de conversión de ventas en un 35% a través de demostraciones de soluciones efectivas.",
            "Desarrollé propuestas personalizadas que llevaron a un contrato de $500,000 con un cliente Fortune 500.",
            "Optimicé el proceso de pre ventas, reduciendo el tiempo de respuesta de las propuestas en un 20%.",
          ],
        },
        {
          title: "Consultor Pre Ventas",
          company: "Innovative Technologies LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un aumento del 25% en las puntuaciones de satisfacción del cliente al mejorar la experiencia de demostración.",
            "Colaboré exitosamente con el equipo de ventas para cerrar tratos por más de $1 millón.",
            "Realicé un análisis de mercado que informó el desarrollo de productos y estrategias de ventas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Consultor Pre Ventas en su currículum?", answer: "Un Consultor Pre Ventas debe incluir su experiencia en ventas técnicas, habilidades de comunicación, y logros específicos relacionados con el cierre de ventas." },
      { question: "¿Cómo destacar mi currículum de Consultor Pre Ventas?", answer: "Para destacar su currículum, incluya resultados cuantificables y adapte su experiencia a las necesidades del trabajo específico al que aplica." },
      { question: "¿Qué habilidades necesita un Consultor Pre Ventas?", answer: "Un Consultor Pre Ventas necesita habilidades en ventas técnicas, gestión de relaciones con clientes, y capacidad para realizar presentaciones efectivas." },
    ],
  },
  "real-estate-sales-assistant": {
    slug: "asistente-de-ventas-inmobiliarias",
    title: "Asistente de Ventas Inmobiliarias",
    keywords: ["currículum de Asistente de Ventas Inmobiliarias", "CV de Asistente de Ventas Inmobiliarias", "ejemplo currículum Asistente de Ventas Inmobiliarias", "plantilla CV Asistente de Ventas Inmobiliarias"],
    searchIntents: ["cómo escribir currículum de Asistente de Ventas Inmobiliarias", "ejemplos currículum Asistente de Ventas Inmobiliarias", "mejor formato CV Asistente de Ventas Inmobiliarias"],
    topSkills: ["Servicio al Cliente", "Gestión de Propiedades", "Soporte de Ventas", "Investigación de Mercado", "Habilidades Administrativas", "Comunicación", "Negociación", "Gestión del Tiempo", "Atención al Detalle", "Software Inmobiliario"],
    atsKeywords: ["Transacciones Inmobiliarias", "Relaciones con Clientes", "Coordinación de Listados", "Gestión de Contratos", "Coordinación de Casas Abiertas", "Listados de Propiedades", "Estrategias de Ventas", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Marketing Inmobiliario", "Entrada de Datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Ventas Inmobiliarias",
      summary: "Asistente de Ventas Inmobiliarias orientado a los detalles con más de 5 años de experiencia apoyando a agentes inmobiliarios y aumentando la satisfacción del cliente. Historial comprobado de aumentar las ventas en un 20% a través de una comunicación efectiva con los clientes y estrategias de marketing de propiedades.",
      skills: ["Servicio al Cliente", "Gestión de Propiedades", "Soporte de Ventas", "Investigación de Mercado", "Habilidades Administrativas", "Comunicación", "Negociación", "Gestión del Tiempo", "Atención al Detalle", "Software Inmobiliario"],
      experience: [
        {
          title: "Asistente de Ventas Inmobiliarias Senior",
          company: "ABC Realty Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el compromiso del cliente, llevando a un aumento del 30% en negocios repetidos.",
            "Gestionó listados de propiedades que resultaron en $5 millones en ventas durante dos años.",
            "Optimizó procesos administrativos, reduciendo el tiempo de papeleo en un 25%.",
          ],
        },
        {
          title: "Asistente de Ventas Inmobiliarias",
          company: "XYZ Real Estate Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Ayudó a cerrar más de 50 transacciones inmobiliarias, contribuyendo a un aumento del 15% en ventas.",
            "Organizó y ejecutó casas abiertas exitosas, atrayendo a más de 200 compradores potenciales.",
            "Mantuvo bases de datos de propiedades precisas, mejorando la eficiencia en el seguimiento de leads.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Real Estate License", issuer: "State Real Estate Commission", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Ventas Inmobiliarias en su currículum?", answer: "Debe incluir experiencias relevantes, habilidades específicas y logros cuantificables en el sector inmobiliario." },
      { question: "¿Cómo destacar mi currículum de Asistente de Ventas Inmobiliarias?", answer: "Enfatice su experiencia en ventas, atención al cliente y cualquier certificación relevante que posea." },
      { question: "¿Qué habilidades necesita un Asistente de Ventas Inmobiliarias?", answer: "Necesita habilidades en comunicación, negociación, gestión del tiempo y un buen conocimiento del software inmobiliario." },
    ],
  },
  "real-estate-sales-associate": {
    slug: "asociado-de-ventas-inmobiliarias",
    title: "Asociado de Ventas Inmobiliarias",
    keywords: ["currículum de asociado de ventas inmobiliarias", "CV de asociado de ventas inmobiliarias", "ejemplo currículum asociado de ventas inmobiliarias", "plantilla CV asociado de ventas inmobiliarias"],
    searchIntents: ["cómo escribir currículum de asociado de ventas inmobiliarias", "ejemplos currículum asociado de ventas inmobiliarias", "mejor formato CV asociado de ventas inmobiliarias"],
    topSkills: ["Negociación", "Servicio al Cliente", "Análisis de Mercado", "Estrategia de Ventas", "Networking", "Gestión de Propiedades", "Cierre de Negocios", "Generación de Leads", "Relaciones con Clientes", "Ley Inmobiliaria"],
    atsKeywords: ["Bienes Raíces", "Ventas", "Asociado", "Negociación", "Listado", "Representación del Comprador", "Tendencias del Mercado", "Valoración de Propiedades", "Pronóstico de Ventas", "Gestión de Clientes", "Negociación de Contratos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas Inmobiliarias",
      summary: "Asociado de Ventas Inmobiliarias dedicado con más de 5 años de experiencia en la industria, cerrando exitosamente negocios por un valor superior a $10 millones. Historial comprobado en satisfacción del cliente y análisis de mercado.",
      skills: ["Negociación", "Servicio al Cliente", "Análisis de Mercado", "Estrategia de Ventas", "Networking", "Gestión de Propiedades", "Cierre de Negocios", "Generación de Leads", "Relaciones con Clientes", "Ley Inmobiliaria"],
      experience: [
        {
          title: "Asociado Senior de Ventas Inmobiliarias",
          company: "Greenwood Realty",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el volumen de ventas en un 30% año tras año",
            "Cerré exitosamente más de $5 millones en ventas residenciales",
            "Desarrollé un programa de referencias de clientes que aumentó los leads en un 40%",
          ],
        },
        {
          title: "Asociado de Ventas Inmobiliarias",
          company: "Sunset Properties",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré el estatus de mejor asociado de ventas durante dos años consecutivos",
            "Gestioné una cartera de más de 50 propiedades",
            "Realicé más de 100 jornadas de puertas abiertas, resultando en una tasa de conversión de ventas del 25%",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura en Administración de Empresas", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Real Estate License", issuer: "State Real Estate Commission", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asociado de Ventas Inmobiliarias en su currículum?", answer: "Debes incluir tu experiencia laboral, habilidades relevantes, logros destacados y certificaciones en el campo de bienes raíces." },
      { question: "¿Cómo destacar mi currículum de Asociado de Ventas Inmobiliarias?", answer: "Enfócate en tus logros cuantificables, personaliza tu currículum para cada puesto y utiliza palabras clave relevantes." },
      { question: "¿Qué habilidades necesita un Asociado de Ventas Inmobiliarias?", answer: "Necesitas habilidades en negociación, servicio al cliente, análisis de mercado, y gestión de relaciones con clientes." },
    ],
  },
  "real-estate-sales-representative": {
    slug: "representante-de-ventas-inmobiliarias",
    title: "Representante de Ventas Inmobiliarias",
    keywords: ["currículum de representante de ventas inmobiliarias", "CV de representante de ventas inmobiliarias", "ejemplo currículum representante de ventas inmobiliarias", "plantilla CV representante de ventas inmobiliarias"],
    searchIntents: ["cómo escribir currículum de representante de ventas inmobiliarias", "ejemplos currículum representante de ventas inmobiliarias", "mejor formato CV representante de ventas inmobiliarias"],
    topSkills: ["Negociación", "Análisis de Mercado", "Atención al Cliente", "Estrategias de Ventas", "Networking", "Gestión de Propiedades", "Análisis de Inversiones", "Marketing", "Comunicación", "Relaciones con Clientes"],
    atsKeywords: ["bienes raíces", "ventas", "gestión de clientes", "ventas de propiedades", "investigación de mercado", "habilidades de negociación", "adquisición de clientes", "objetivos de ventas", "listado de propiedades", "marketing inmobiliario", "negociación de contratos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Ventas Inmobiliarias",
      summary: "Representante de Ventas Inmobiliarias dinámico con más de 5 años de experiencia en la industria, logrando un incremento del 30% en los ingresos anuales por ventas. Historial comprobado de superar las metas de ventas y proporcionar un servicio al cliente excepcional.",
      skills: ["Negociación", "Análisis de Mercado", "Atención al Cliente", "Estrategias de Ventas", "Networking", "Gestión de Propiedades", "Análisis de Inversiones", "Marketing", "Comunicación", "Relaciones con Clientes"],
      experience: [
        {
          title: "Representante de Ventas Senior",
          company: "Keller Williams Realty",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% año tras año, generando $1.2M en ingresos adicionales.",
            "Cerré exitosamente más de 50 transacciones en el último año fiscal.",
            "Desarrollé un programa de referidos que aumentó la retención de clientes en un 40%.",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "RE/MAX",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Recibí el premio Novato del Año por cerrar más de $500K en ventas durante el primer año.",
            "Implementé una nueva estrategia de marketing que mejoró la visibilidad de las propiedades y llevó a un incremento del 20% en consultas.",
            "Superé consistentemente los objetivos de ventas mensuales en un 15% de promedio.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Real Estate License", issuer: "State Real Estate Commission", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Real Estate Sales Representative en su currículum?", answer: "Incluir experiencia laboral relevante, logros en ventas, habilidades de negociación y atención al cliente." },
      { question: "¿Cómo destacar mi currículum de Real Estate Sales Representative?", answer: "Resaltar logros cuantificables y utilizar palabras clave de la industria." },
      { question: "¿Qué habilidades necesita un Real Estate Sales Representative?", answer: "Negociación, análisis de mercado, atención al cliente y estrategias de ventas." },
    ],
  },
  "real-estate-salesperson": {
    slug: "vendedor-de-bienes-raices",
    title: "Vendedor de Bienes Raíces",
    keywords: ["currículum de vendedor de bienes raíces", "CV de vendedor de bienes raíces", "ejemplo currículum vendedor de bienes raíces", "plantilla CV vendedor de bienes raíces"],
    searchIntents: ["cómo escribir currículum de vendedor de bienes raíces", "ejemplos currículum vendedor de bienes raíces", "mejor formato CV vendedor de bienes raíces"],
    topSkills: ["Negociación", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Valoración de Propiedades", "Marketing", "Red de Contactos", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo"],
    atsKeywords: ["bienes raíces", "ventas", "negociación", "gestión de clientes", "gestión de propiedades", "investigación de mercado", "listado", "cierre", "servicio al cliente", "metas de ventas", "generación de leads"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Vendedor de Bienes Raíces",
      summary: "Vendedor de Bienes Raíces dinámico con más de 5 años de experiencia en ventas residenciales, logrando el 150% de los objetivos de ventas de manera constante. Historial comprobado de cierre de negocios valorados en más de $10 millones.",
      skills: ["Negociación", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Valoración de Propiedades", "Marketing", "Red de Contactos", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo"],
      experience: [
        {
          title: "Vendedor Senior de Bienes Raíces",
          company: "Keller Williams Realty",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el volumen de ventas anual en un 30%, generando más de $3 millones en ingresos.",
            "Cerré exitosamente más de 40 transacciones en el último año, promediando una tasa de satisfacción del cliente del 98%.",
            "Desarrollé una red de referencias que contribuyó al 25% de nuevas adquisiciones de clientes.",
          ],
        },
        {
          title: "Vendedor de Bienes Raíces",
          company: "Coldwell Banker",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré el 120% de los objetivos de ventas anuales en 2019 y 2020.",
            "Gestioné un portafolio de más de 50 propiedades, mejorando la satisfacción del cliente a través de un servicio personalizado.",
            "Implementé estrategias de marketing efectivas que aumentaron las visualizaciones de propiedades en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Real Estate License", issuer: "State Real Estate Commission", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Vendedor de Bienes Raíces en su currículum?", answer: "Debe incluir experiencia laboral, logros en ventas, habilidades relevantes y educación." },
      { question: "¿Cómo destacar mi currículum de Vendedor de Bienes Raíces?", answer: "Utiliza palabras clave del sector, resalta logros cuantificables y personaliza para cada puesto." },
      { question: "¿Qué habilidades necesita un Vendedor de Bienes Raíces?", answer: "Negociación, gestión de relaciones, análisis de mercado, marketing y comunicación efectiva." },
    ],
  },
  "red-label-sales-representative": {
    slug: "representante-de-ventas-red-label",
    title: "Representante de Ventas Red Label",
    keywords: ["currículum de representante de ventas", "CV de representante de ventas", "ejemplo currículum representante de ventas", "plantilla CV representante de ventas"],
    searchIntents: ["cómo escribir currículum de representante de ventas", "ejemplos currículum representante de ventas", "mejor formato CV representante de ventas"],
    topSkills: ["Estrategias de Ventas", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Análisis de Mercado", "Conocimiento del Producto", "Generación de Leads", "Técnicas de Cierre", "Networking", "Gestión del Tiempo", "Comunicación"],
    atsKeywords: ["ventas", "servicio al cliente", "ventas B2B", "generación de leads", "negociación", "gestión de contratos", "retención de clientes", "pronóstico de ventas", "promoción de productos", "investigación de mercado", "construcción de relaciones"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Ventas Red Label",
      summary: "Profesional de ventas dinámico con más de 5 años de experiencia en impulsar el crecimiento de ingresos y alcanzar objetivos de ventas en el sector minorista. Incrementé las ventas en un 30% en el último año fiscal a través de una gestión efectiva de relaciones y planificación estratégica.",
      skills: ["Estrategias de Ventas", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Análisis de Mercado", "Conocimiento del Producto", "Generación de Leads", "Técnicas de Cierre", "Networking", "Gestión del Tiempo", "Comunicación"],
      experience: [
        {
          title: "Representante de Ventas Senior",
          company: "Procter & Gamble",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas del territorio en un 35% en un año.",
            "Desarrollé una nueva estrategia de adquisición de clientes que resultó en 50 nuevas cuentas.",
            "Alcancé el 120% del objetivo de ventas de manera consistente durante 3 trimestres consecutivos.",
          ],
        },
        {
          title: "Representante de Ventas",
          company: "Unilever",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé los objetivos de ventas trimestrales en un promedio del 20%.",
            "Implementé un sistema de retroalimentación de clientes que mejoró las puntuaciones de satisfacción en un 15%.",
            "Colaboré con marketing para lanzar una exitosa campaña de producto que aumentó las ventas en un 25%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Red Label Sales Representative en su currículum?", answer: "Un Red Label Sales Representative debe incluir habilidades clave, experiencia relevante en ventas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Red Label Sales Representative?", answer: "Utiliza palabras clave del sector, resalta tus logros y adapta tu currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Red Label Sales Representative?", answer: "Las habilidades esenciales incluyen estrategias de ventas, gestión de relaciones con clientes y negociación." },
    ],
  },
  "regional-sales-manager-at-medoxa": {
    slug: "gerente-de-ventas-regional",
    title: "Gerente de Ventas Regional",
    keywords: ["currículum de gerente de ventas regional", "CV de gerente de ventas regional", "ejemplo currículum gerente de ventas regional", "plantilla CV gerente de ventas regional"],
    searchIntents: ["cómo escribir currículum de gerente de ventas regional", "ejemplos currículum gerente de ventas regional", "mejor formato CV gerente de ventas regional"],
    topSkills: ["Estrategia de Ventas", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Liderazgo de Equipo", "Pronóstico de Ventas", "Dominio de Software CRM", "Análisis de Datos", "Métricas de Desempeño", "Gestión de Proyectos"],
    atsKeywords: ["gestión de ventas", "ventas regionales", "desarrollo de negocios", "gestión de cuentas", "generación de leads", "retención de clientes", "capacitación en ventas", "gestión de pipeline", "planificación de territorio", "negociación", "mejora del desempeño"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Ventas Regional",
      summary: "Gerente de Ventas Regional dinámico con más de 8 años de experiencia impulsando el crecimiento de ingresos y expandiendo la presencia en el mercado. Historial comprobado de aumentar las ventas en un 30% año tras año a través de la planificación estratégica y un liderazgo excepcional.",
      skills: ["Estrategia de Ventas", "Análisis de Mercado", "Gestión de Relaciones con Clientes", "Habilidades de Negociación", "Liderazgo de Equipo", "Pronóstico de Ventas", "Dominio de Software CRM", "Análisis de Datos", "Métricas de Desempeño", "Gestión de Proyectos"],
      experience: [
        {
          title: "Gerente Regional de Ventas Senior",
          company: "Johnson Controls",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas regionales en un 35% dentro del primer año, contribuyendo con $2 millones a los ingresos anuales.",
            "Lancé con éxito una nueva línea de productos, logrando el 150% del objetivo de ventas en el primer trimestre.",
            "Optimicé los procesos de ventas, resultando en una reducción del 20% en el tiempo del ciclo de ventas.",
          ],
        },
        {
          title: "Gerente de Ventas Regional",
          company: "Coca-Cola",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Expandí la cuota de mercado en un 25% a través de campañas de marketing dirigidas y gestión de cuentas clave.",
            "Capacité y mentoricé a un equipo de 10 representantes de ventas, lo que llevó a un aumento del 40% en las métricas de desempeño individuales.",
            "Logré consistentemente los objetivos de ventas anuales, con un aumento del 15% en las tasas de retención de clientes.",
          ],
        },
      ],
      education: [
        { institution: "University of Michigan", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Executive", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Regional Sales Manager en su currículum?", answer: "Un Gerente de Ventas Regional debe incluir su experiencia en gestión de ventas, logros en aumento de ingresos y habilidades en liderazgo y negociación." },
      { question: "¿Cómo destacar mi currículum de Regional Sales Manager?", answer: "Destacar logros cuantificables y experiencia específica en el sector es clave para sobresalir." },
      { question: "¿Qué habilidades necesita un Regional Sales Manager?", answer: "Las habilidades clave incluyen estrategia de ventas, gestión de relaciones con clientes y habilidades de negociación." },
    ],
  },
  "retail-associate": {
    slug: "asociado-de-venta",
    title: "Asociado de Venta",
    keywords: ["currículum de asociado de venta", "CV de asociado de venta", "ejemplo currículum asociado de venta", "plantilla CV asociado de venta"],
    searchIntents: ["cómo escribir currículum de asociado de venta", "ejemplos currículum asociado de venta", "mejor formato CV asociado de venta"],
    topSkills: ["Servicio al Cliente", "Técnicas de Ventas", "Gestión de Inventario", "Sistemas de Punto de Venta", "Conocimiento de Productos", "Merchandising", "Comunicación", "Trabajo en Equipo", "Resolución de Problemas", "Gestión del Tiempo"],
    atsKeywords: ["venta", "servicio al cliente", "ventas", "inventario", "merchandising", "POS", "trabajo en equipo", "comunicación", "resolución de problemas", "gestión del tiempo", "conocimiento de productos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Venta",
      summary: "Asociado de Venta dedicado con más de 5 años de experiencia en servicio al cliente y ventas, reconocido por aumentar las ventas en un 30% en el último año a través de un servicio excepcional.",
      skills: ["Servicio al Cliente", "Técnicas de Ventas", "Gestión de Inventario", "Sistemas de Punto de Venta", "Conocimiento de Productos", "Merchandising", "Comunicación", "Trabajo en Equipo", "Resolución de Problemas", "Gestión del Tiempo"],
      experience: [
        {
          title: "Asociado de Venta Senior",
          company: "Target",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas de la tienda en un 30% durante el último año a través de estrategias mejoradas de servicio al cliente.",
            "Gestioné los niveles de inventario, reduciendo la merma en un 15%.",
            "Capacité e integré a 10 nuevos empleados, mejorando la eficiencia del equipo.",
          ],
        },
        {
          title: "Asociado de Venta",
          company: "Walmart",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré el 'Empleado del Mes' durante 3 meses consecutivos debido a comentarios excepcionales de los clientes.",
            "Ayudé a mantener una calificación de satisfacción del cliente del 95%.",
            "Implementé una nueva exhibición de merchandising que aumentó la visibilidad del producto y las ventas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Management", issuer: "National Retail Federation", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Retail Associate en su currículum?", answer: "Un Retail Associate debe incluir su experiencia en servicio al cliente, habilidades de ventas, y cualquier logro relevante en el área de ventas." },
      { question: "¿Cómo destacar mi currículum de Retail Associate?", answer: "Para destacar su currículum, resalte logros cuantificables y use palabras clave relevantes para el sector de ventas." },
      { question: "¿Qué habilidades necesita un Retail Associate?", answer: "Las habilidades clave incluyen servicio al cliente, técnicas de ventas, gestión de inventario y trabajo en equipo." },
    ],
  },
  "sales-account-manager": {
    slug: "gerente-de-cuentas-de-ventas",
    title: "Gerente de Cuentas de Ventas",
    keywords: ["currículum de gerente de cuentas de ventas", "CV de gerente de cuentas de ventas", "ejemplo currículum gerente de cuentas de ventas", "plantilla CV gerente de cuentas de ventas"],
    searchIntents: ["cómo escribir currículum de gerente de cuentas de ventas", "ejemplos currículum gerente de cuentas de ventas", "mejor formato CV gerente de cuentas de ventas"],
    topSkills: ["Gestión de Relaciones con Clientes", "Desarrollo de Estrategias de Ventas", "Negociación", "Análisis de Mercado", "Crecimiento de Cuentas", "Generación de Leads", "Retención de Clientes", "Análisis de Datos", "Software CRM", "Comunicación"],
    atsKeywords: ["ventas", "gestión de cuentas", "servicio al cliente", "desarrollo de negocios", "creación de relaciones", "gestión de pipeline", "pronóstico", "negociación de contratos", "investigación de mercado", "ventas B2B", "reportes de ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Cuentas de Ventas",
      summary: "Gerente de Cuentas de Ventas orientado a resultados con más de 5 años de experiencia en impulsar el crecimiento de ventas y gestionar relaciones con clientes. Logré un aumento del 30% en los ingresos por ventas año tras año.",
      skills: ["Gestión de Relaciones con Clientes", "Desarrollo de Estrategias de Ventas", "Negociación", "Análisis de Mercado", "Crecimiento de Cuentas", "Generación de Leads", "Retención de Clientes", "Análisis de Datos", "Software CRM", "Comunicación"],
      experience: [
        {
          title: "Gerente Senior de Cuentas de Ventas",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas anuales en un 40%, generando $1.2M adicionales en ingresos.",
            "Gestioné una cartera de más de 50 clientes de alto valor, mejorando las tasas de retención de clientes en un 25%.",
            "Implementé un nuevo sistema CRM que mejoró la eficiencia del seguimiento de leads en un 35%.",
          ],
        },
        {
          title: "Gerente de Cuentas de Ventas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de los objetivos de ventas de manera consistente durante tres años.",
            "Desarrollé y ejecuté estrategias de marketing que llevaron a un aumento del 50% en nuevas adquisiciones de clientes.",
            "Colaboré con equipos multifuncionales para mejorar las puntuaciones de satisfacción del cliente en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional (CSP)", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Account Manager en su currículum?", answer: "Un Sales Account Manager debe incluir sus logros en ventas, habilidades de gestión de clientes, y experiencia en estrategias de ventas." },
      { question: "¿Cómo destacar mi currículum de Sales Account Manager?", answer: "Destaca tus logros cuantificables y utiliza palabras clave relevantes para la industria." },
      { question: "¿Qué habilidades necesita un Sales Account Manager?", answer: "Habilidades en gestión de relaciones, negociación, análisis de mercado y uso de software CRM son clave." },
    ],
  },
  "sales-agent": {
    slug: "agente-de-ventas",
    title: "Agente de Ventas",
    keywords: ["currículum de agente de ventas", "CV de agente de ventas", "ejemplo currículum agente de ventas", "plantilla CV agente de ventas"],
    searchIntents: ["cómo escribir currículum de agente de ventas", "ejemplos currículum agente de ventas", "mejor formato CV agente de ventas"],
    topSkills: ["Comunicación", "Negociación", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Investigación de Mercado", "Generación de Leads", "Técnicas de Cierre", "Gestión del Tiempo", "Conocimiento del Producto", "Resolución de Conflictos"],
    atsKeywords: ["ventas", "servicio al cliente", "generación de leads", "negociación", "CRM", "gestión de cuentas", "llamadas en frío", "presentaciones de ventas", "pronóstico de ventas", "creación de relaciones", "gestión de territorio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Agente de Ventas",
      summary: "Agente de Ventas dinámico con más de 5 años de experiencia en impulsar el crecimiento de ventas y mejorar la satisfacción del cliente. Logré un incremento del 30% en los ingresos por ventas en un año a través de un compromiso estratégico con los clientes.",
      skills: ["Comunicación", "Negociación", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Investigación de Mercado", "Generación de Leads", "Técnicas de Cierre", "Gestión del Tiempo", "Conocimiento del Producto", "Resolución de Conflictos"],
      experience: [
        {
          title: "Agente de Ventas Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 40% en 2022, generando $500,000 adicionales en ingresos.",
            "Incorporé y retuve exitosamente a más de 150 nuevos clientes en el último año fiscal.",
            "Implementé un sistema de retroalimentación de clientes que mejoró las calificaciones de satisfacción en un 25%.",
          ],
        },
        {
          title: "Agente de Ventas",
          company: "Global Solutions Corp.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% del objetivo de ventas anual durante tres años consecutivos.",
            "Desarrollé y ejecuté una campaña de marketing que resultó en un aumento del 35% en leads.",
            "Capacité y mentoricé al nuevo personal de ventas, mejorando los métricas de rendimiento del equipo en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Agente de Ventas en su currículum?", answer: "Un Agente de Ventas debe incluir su experiencia laboral, habilidades clave, logros en ventas y educación relevante." },
      { question: "¿Cómo destacar mi currículum de Agente de Ventas?", answer: "Utiliza palabras clave de la industria, destaca logros cuantificables y personaliza tu currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Agente de Ventas?", answer: "Un Agente de Ventas necesita habilidades en comunicación, negociación, gestión de relaciones y conocimiento del producto." },
    ],
  },
  "sales-agent-selectquote": {
    slug: "curriculum-agente-de-ventas",
    title: "Currículum de Agente de Ventas",
    keywords: ["currículum de agente de ventas", "CV de agente de ventas", "ejemplo currículum agente de ventas", "plantilla CV agente de ventas"],
    searchIntents: ["cómo escribir currículum de agente de ventas", "ejemplos currículum agente de ventas", "mejor formato CV agente de ventas"],
    topSkills: ["Gestión de Relaciones con Clientes", "Desarrollo de Estrategias de Ventas", "Negociación", "Generación de Leads", "Análisis de Mercado", "Retención de Clientes", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Pronóstico de Ventas"],
    atsKeywords: ["ventas", "servicio al cliente", "generación de leads", "negociación", "CRM", "objetivos de ventas", "relaciones con clientes", "presentaciones de ventas", "investigación de mercado", "gestión de cuentas", "informes de ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Agente de Ventas",
      summary: "Agente de ventas orientado a resultados con más de 5 años de experiencia en la industria de seguros, superando constantemente los objetivos de ventas en un 30% y mejorando las tasas de retención de clientes en un 20%. Capacidad comprobada para desarrollar relaciones sólidas con los clientes e implementar estrategias de ventas efectivas.",
      skills: ["Gestión de Relaciones con Clientes", "Desarrollo de Estrategias de Ventas", "Negociación", "Generación de Leads", "Análisis de Mercado", "Retención de Clientes", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Pronóstico de Ventas"],
      experience: [
        {
          title: "Agente de Ventas Senior",
          company: "SelectQuote Insurance Services",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos anuales por ventas en un 40% a través de campañas de marketing dirigidas",
            "Alcancé el estatus de mejor agente de ventas durante tres trimestres consecutivos",
            "Optimicé el proceso de ventas, reduciendo el tiempo de incorporación de clientes en un 25%",
          ],
        },
        {
          title: "Agente de Ventas",
          company: "Geico",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cumplí y superé constantemente las cuotas de ventas en un promedio del 15%",
            "Desarrollé programas de lealtad del cliente que aumentaron el negocio recurrente en un 30%",
            "Entrené y asesoré a nuevos agentes de ventas, mejorando el rendimiento del equipo",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Licensed Insurance Agent", issuer: "California Department of Insurance", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Agente de Ventas?", answer: "Un currículum de Agente de Ventas debe incluir experiencia relevante, habilidades clave, logros medibles y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Agente de Ventas?", answer: "Para destacar tu currículum, utiliza palabras clave del sector, resalta tus logros y personaliza tu perfil para el puesto al que aplicas." },
      { question: "¿Qué habilidades necesita un Agente de Ventas?", answer: "Un Agente de Ventas necesita habilidades en comunicación, negociación, gestión de relaciones con clientes y análisis de mercado." },
    ],
  },
  "sales-analyst": {
    slug: "analista-de-ventas",
    title: "Analista de Ventas",
    keywords: ["currículum de analista de ventas", "CV de analista de ventas", "ejemplo currículum analista de ventas", "plantilla CV analista de ventas"],
    searchIntents: ["cómo escribir currículum de analista de ventas", "ejemplos currículum analista de ventas", "mejor formato CV analista de ventas"],
    topSkills: ["Análisis de Datos", "Investigación de Mercado", "Pronósticos de Ventas", "SQL", "Excel", "Inteligencia Empresarial", "Informes", "Visualización de Datos", "Software de CRM", "Análisis Estadístico"],
    atsKeywords: ["Métricas de Ventas", "Interpretación de Datos", "Análisis de Tendencias", "Evaluación del Rendimiento", "Perspectivas del Cliente", "Estrategias de Ventas", "Análisis Empresarial", "Herramientas de Informes", "Tendencias del Mercado", "Rendimiento de Ventas", "Análisis Competitivo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Analista de Ventas",
      summary: "Analista de Ventas con más de 5 años de experiencia en la toma de decisiones basada en datos, mejorando estrategias de ventas y logrando un aumento del 25% en las ventas trimestrales a través del análisis de datos y perspectivas de mercado.",
      skills: ["Análisis de Datos", "Investigación de Mercado", "Pronósticos de Ventas", "SQL", "Excel", "Inteligencia Empresarial", "Informes", "Visualización de Datos", "Software de CRM", "Análisis Estadístico"],
      experience: [
        {
          title: "Analista de Ventas Senior",
          company: "SalesForce Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas trimestrales en un 25% a través de recomendaciones basadas en datos.",
            "Desarrollé un nuevo sistema de informes que redujo el tiempo de análisis en un 30%.",
            "Dirigí iniciativas de investigación de mercado que identificaron y capturaron un 15% más de cuota de mercado.",
          ],
        },
        {
          title: "Analista de Ventas",
          company: "Tech Innovations Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Analicé datos de ventas que llevaron a una mejora del 20% en la precisión de los pronósticos de ventas.",
            "Colaboré con marketing para lanzar una campaña que generó $1M en nuevos ingresos.",
            "Optimicé los procesos de informes, reduciendo el tiempo de generación de informes en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Analyst", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Analista de Ventas en su currículum?", answer: "Incluir experiencia relevante, habilidades de análisis y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Analista de Ventas?", answer: "Utilizar métricas específicas y resultados obtenidos en puestos anteriores." },
      { question: "¿Qué habilidades necesita un Analista de Ventas?", answer: "Análisis de datos, investigación de mercado, y manejo de herramientas de CRM." },
    ],
  },
  "sales-assistant": {
    slug: "asistente-de-ventas",
    title: "Asistente de Ventas",
    keywords: ["currículum de Asistente de Ventas", "CV de Asistente de Ventas", "ejemplo currículum Asistente de Ventas", "plantilla CV Asistente de Ventas"],
    searchIntents: ["cómo escribir currículum de Asistente de Ventas", "ejemplos currículum Asistente de Ventas", "mejor formato CV Asistente de Ventas"],
    topSkills: ["Servicio al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Gestión de Inventarios", "Habilidades de Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Colaboración en Equipo", "Sistemas de Punto de Venta (POS)", "Informes de Ventas"],
    atsKeywords: ["Soporte de Ventas", "Relaciones con Clientes", "Merchandising", "Estrategias de Venta", "Generación de Leads", "Compromiso del Cliente", "Pronóstico de Ventas", "Operaciones de Retail", "Investigación de Mercado", "Capacitación en Ventas", "Métricas de Ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Ventas",
      summary: "Asistente de Ventas dinámico con más de 5 años de experiencia en ventas minoristas y servicio al cliente, alcanzando consistentemente más del 120% de los objetivos de ventas y mejorando las calificaciones de satisfacción del cliente en un 30%.",
      skills: ["Servicio al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Gestión de Inventarios", "Habilidades de Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Colaboración en Equipo", "Sistemas de Punto de Venta (POS)", "Informes de Ventas"],
      experience: [
        {
          title: "Asistente de Ventas Senior",
          company: "Best Buy",
          startDate: "2023-01",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas de la tienda en un 25% en el primer trimestre de 2023 a través de técnicas de upselling efectivas.",
            "Entrené y mentoreé a 5 nuevos miembros del personal, mejorando la eficiencia del equipo en un 15%.",
            "Alcancé una calificación de satisfacción del cliente del 95% en encuestas de retroalimentación de clientes.",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "Walmart",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé los objetivos de ventas mensuales en un promedio del 20%.",
            "Reduje las discrepancias de inventario en un 40% a través de una mejor gestión de stock.",
            "Recibí el premio 'Empleado del Mes' por servicio al cliente excepcional.",
          ],
        },
      ],
      education: [
        { institution: "University of California", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional (CSP)", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Ventas en su currículum?", answer: "Un Asistente de Ventas debe incluir experiencia laboral relevante, habilidades relacionadas con las ventas y ejemplos de logros en servicio al cliente." },
      { question: "¿Cómo destacar mi currículum de Asistente de Ventas?", answer: "Para destacar, utilice palabras clave del sector, incluya logros cuantificables y personalice su currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Asistente de Ventas?", answer: "Un Asistente de Ventas necesita habilidades en servicio al cliente, técnicas de venta, gestión de inventarios y comunicación efectiva." },
    ],
  },
  "sales-associate": {
    slug: "asociado-de-ventas",
    title: "Asociado de Ventas",
    keywords: ["currículum de asociado de ventas", "CV de asociado de ventas", "ejemplo currículum asociado de ventas", "plantilla CV asociado de ventas"],
    searchIntents: ["cómo escribir currículum de asociado de ventas", "ejemplos currículum asociado de ventas", "mejor formato CV asociado de ventas"],
    topSkills: ["Servicio al Cliente", "Técnicas de Ventas", "Conocimiento del Producto", "Gestión de Inventarios", "Habilidades de Comunicación", "Colaboración en Equipo", "Resolución de Problemas", "Gestión del Tiempo", "Manejo de Efectivo", "Informe de Ventas"],
    atsKeywords: ["Ventas", "Retail", "Compromiso del Cliente", "Merchandising", "Incremento de Ventas", "Generación de Leads", "Estrategia de Ventas", "Investigación de Mercado", "Construcción de Relaciones", "Pronóstico de Ventas", "Retención de Clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas",
      summary: "Asociado de Ventas dedicado con más de 5 años de experiencia en entornos minoristas, reconocido por alcanzar el 150% de los objetivos de ventas y mejorar las calificaciones de satisfacción del cliente en un 30%.",
      skills: ["Servicio al Cliente", "Técnicas de Ventas", "Conocimiento del Producto", "Gestión de Inventarios", "Habilidades de Comunicación", "Colaboración en Equipo", "Resolución de Problemas", "Gestión del Tiempo", "Manejo de Efectivo", "Informe de Ventas"],
      experience: [
        {
          title: "Asociado de Ventas Senior",
          company: "Best Buy",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% año tras año mediante estrategias efectivas de compromiso del cliente.",
            "Gestioné con éxito la rotación de inventario, reduciendo el stock excesivo en un 15%.",
            "Logré una calificación de satisfacción del cliente del 95% en encuestas posteriores a la compra.",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "Target",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé consistentemente los objetivos de ventas mensuales en un promedio del 20%.",
            "Dirigí sesiones de capacitación para nuevos empleados, mejorando el rendimiento del equipo.",
            "Implementé una nueva estrategia de merchandising que resultó en un aumento del 10% en el tráfico peatonal.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Sales Professional", issuer: "National Retail Federation", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Associate en su currículum?", answer: "Incluir experiencia en atención al cliente, logros en ventas y habilidades relevantes." },
      { question: "¿Cómo destacar mi currículum de Sales Associate?", answer: "Resaltar logros cuantificables y habilidades interpersonales en ventas." },
      { question: "¿Qué habilidades necesita un Sales Associate?", answer: "Habilidades clave incluyen servicio al cliente, técnicas de ventas y gestión de inventarios." },
    ],
  },
  "sales-associate-frans-chocolates": {
    slug: "asociado-de-ventas",
    title: "Asociado de Ventas",
    keywords: ["currículum de asociado de ventas", "CV de asociado de ventas", "ejemplo currículum asociado de ventas", "plantilla CV asociado de ventas"],
    searchIntents: ["cómo escribir currículum de asociado de ventas", "ejemplos currículum asociado de ventas", "mejor formato CV asociado de ventas"],
    topSkills: ["Servicio al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Gestión de Inventarios", "Manejo de Efectivo", "Habilidades de Comunicación", "Resolución de Problemas", "Trabajo en Equipo", "Gestión del Tiempo", "Informes de Ventas"],
    atsKeywords: ["ventas", "compromiso del cliente", "merchandising", "minorista", "promoción de productos", "métricas de ventas", "relaciones con clientes", "sistemas POS", "reabastecimiento de stock", "estrategias de ventas", "satisfacción del cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas",
      summary: "Asociado de Ventas con más de 5 años de experiencia en el sector minorista, superando consistentemente los objetivos de ventas en un 20% y mejorando las calificaciones de satisfacción del cliente a través de un excelente servicio.",
      skills: ["Servicio al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Gestión de Inventarios", "Manejo de Efectivo", "Habilidades de Comunicación", "Resolución de Problemas", "Trabajo en Equipo", "Gestión del Tiempo", "Informes de Ventas"],
      experience: [
        {
          title: "Asociado de Ventas Senior",
          company: "Frans Chocolates",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% durante la temporada navideña a través de promociones específicas",
            "Logré una puntuación de satisfacción del cliente del 95% durante 6 meses",
            "Capacité y mentoreé a 5 nuevos asociados de ventas, mejorando el rendimiento del equipo",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "Chocolate Haven",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cumplí o superé consistentemente los objetivos de ventas mensuales en al menos un 15%",
            "Desarrollé un nuevo sistema de seguimiento de inventarios que redujo las discrepancias de stock en un 30%",
            "Gestioné con éxito las quejas de los clientes, resultando en un aumento del 10% en negocios recurrentes",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Sales Professional", issuer: "Retail Training Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Associate en su currículum?", answer: "Incluir experiencia en ventas, habilidades de servicio al cliente y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Sales Associate?", answer: "Enfocarse en resultados medibles y personalizar el currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Sales Associate?", answer: "Habilidades de comunicación, técnicas de venta, y gestión de relaciones con clientes." },
    ],
  },
  "sales-associate-lush": {
    slug: "asociado-de-ventas",
    title: "Asociado de Ventas",
    keywords: ["currículum de asociado de ventas", "CV de asociado de ventas", "ejemplo currículum asociado de ventas", "plantilla CV asociado de ventas"],
    searchIntents: ["cómo escribir currículum de asociado de ventas", "ejemplos currículum asociado de ventas", "mejor formato CV asociado de ventas"],
    topSkills: ["Servicio al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Comunicación", "Trabajo en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Manejo de Efectivo", "Merchandising Visual", "Construcción de Relaciones"],
    atsKeywords: ["ventas", "servicio al cliente", "retail", "gestión de inventarios", "ventas de productos", "venta adicional", "venta cruzada", "sistemas POS", "colaboración en equipo", "objetivos de ventas", "relaciones con clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Ventas",
      summary: "Asociado de ventas dinámico con más de 5 años de experiencia en entornos de retail, superando consistentemente los objetivos de ventas en un 20%. Capacidad comprobada para desarrollar relaciones sólidas con los clientes y fomentar la repetición de negocios.",
      skills: ["Servicio al Cliente", "Técnicas de Venta", "Conocimiento del Producto", "Comunicación", "Trabajo en Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Manejo de Efectivo", "Merchandising Visual", "Construcción de Relaciones"],
      experience: [
        {
          title: "Asociado de Ventas Senior",
          company: "Nordstrom",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% en el primer año a través de una gestión efectiva de relaciones con los clientes.",
            "Logré ser 'Empleado del Mes' tres veces por un servicio al cliente excepcional.",
            "Implementé una nueva estrategia de exhibición de productos que mejoró el compromiso del cliente en un 15%.",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "Macy's",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Cumplí y superé consistentemente los objetivos de ventas mensuales en un promedio del 10%.",
            "Entrené y asesoré a nuevo personal sobre técnicas de venta y mejores prácticas de servicio al cliente.",
            "Desarrollé y mantuve una base de clientes leales, resultando en un aumento del 30% en clientes recurrentes.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Los Angeles", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Sales Professional", issuer: "National Retail Federation", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Associate en su currículum?", answer: "Un Sales Associate debe incluir su experiencia laboral, habilidades relevantes, logros y formación académica." },
      { question: "¿Cómo destacar mi currículum de Sales Associate?", answer: "Para destacar, incluya logros cuantificables, habilidades específicas y una presentación clara." },
      { question: "¿Qué habilidades necesita un Sales Associate?", answer: "Las habilidades clave incluyen servicio al cliente, técnicas de venta, comunicación efectiva y trabajo en equipo." },
    ],
  },
  "sales-clerk": {
    slug: "vendedor-en-venta",
    title: "Vendedor",
    keywords: ["currículum de vendedor", "CV de vendedor", "ejemplo currículum vendedor", "plantilla CV vendedor"],
    searchIntents: ["cómo escribir currículum de vendedor", "ejemplos currículum vendedor", "mejor formato CV vendedor"],
    topSkills: ["Servicio al Cliente", "Manejo de Efectivo", "Gestión de Inventario", "Técnicas de Venta", "Conocimiento del Producto", "Habilidades de Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Colaboración en Equipo", "Atención al Detalle"],
    atsKeywords: ["ventas al por menor", "interacción con el cliente", "objetivos de ventas", "sistemas de punto de venta", "merchandising", "reabastecimiento de stock", "informes de ventas", "gestión de relaciones con clientes", "promociones de productos", "operaciones de tienda", "satisfacción del cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Vendedor",
      summary: "Vendedor dedicado con más de 5 años de experiencia en ventas al por menor y servicio al cliente. Historial comprobado de aumentar las ventas en un 20% en el último año a través de un compromiso excepcional con los clientes.",
      skills: ["Servicio al Cliente", "Manejo de Efectivo", "Gestión de Inventario", "Técnicas de Venta", "Conocimiento del Producto", "Habilidades de Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Colaboración en Equipo", "Atención al Detalle"],
      experience: [
        {
          title: "Vendedor Senior",
          company: "Walmart",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% durante la temporada navideña a través de estrategias de merchandising efectivas.",
            "Capacité e incorporé a 10 nuevos empleados, lo que resultó en una disminución del 30% en el tiempo de capacitación.",
            "Logré una puntuación de satisfacción del cliente del 95% a través de un excelente servicio y seguimiento.",
          ],
        },
        {
          title: "Vendedor",
          company: "Target",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé consistentemente los objetivos de ventas mensuales en un promedio del 15%.",
            "Gestioné los niveles de inventario de manera efectiva, reduciendo las discrepancias de stock en un 20%.",
            "Recibí el premio de Empleado del Mes en dos ocasiones por un rendimiento excepcional.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Retail Management Certification", issuer: "National Retail Federation", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Vendedor en su currículum?", answer: "Un Vendedor debe incluir su experiencia en atención al cliente, habilidades de ventas y logros relevantes." },
      { question: "¿Cómo destacar mi currículum de Vendedor?", answer: "Destaca tus logros en ventas, habilidades interpersonales y cualquier certificación relevante." },
      { question: "¿Qué habilidades necesita un Vendedor?", answer: "Las habilidades clave incluyen servicio al cliente, manejo de efectivo, y técnicas de venta efectivas." },
    ],
  },
  "sales-coach": {
    slug: "entrenador-de-ventas",
    title: "Entrenador de Ventas",
    keywords: ["currículum de entrenador de ventas", "CV de entrenador de ventas", "ejemplo currículum entrenador de ventas", "plantilla CV entrenador de ventas"],
    searchIntents: ["cómo escribir currículum de entrenador de ventas", "ejemplos currículum entrenador de ventas", "mejor formato CV entrenador de ventas"],
    topSkills: ["Coaching", "Estrategia de Ventas", "Análisis de Desempeño", "Comunicación", "Liderazgo", "Resolución de Conflictos", "Construcción de Equipos", "Gestión de Relaciones con Clientes", "Hablar en Público", "Desarrollo de Capacitación"],
    atsKeywords: ["Entrenamiento de Ventas", "Desempeño de Ventas", "Técnicas de Coaching", "Métricas de Ventas", "Gestión de Equipos", "Procesos de Ventas", "Análisis de Mercado", "Compromiso del Cliente", "Pronóstico de Ventas", "Establecimiento de Metas", "Desarrollo Profesional"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Entrenador de Ventas",
      summary: "Entrenador de Ventas dinámico con más de 8 años de experiencia en impulsar el desempeño de ventas y el desarrollo de equipos, lo que llevó a un aumento del 30% en las ventas trimestrales para múltiples equipos.",
      skills: ["Coaching", "Estrategia de Ventas", "Análisis de Desempeño", "Comunicación", "Liderazgo", "Resolución de Conflictos", "Construcción de Equipos", "Gestión de Relaciones con Clientes", "Hablar en Público", "Desarrollo de Capacitación"],
      experience: [
        {
          title: "Entrenador de Ventas Senior",
          company: "SalesForce Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el desempeño del equipo de ventas en un 25% a través de iniciativas de coaching y desarrollo específicas.",
            "Logré una mejora del 40% en las puntuaciones de satisfacción del cliente en 6 meses.",
            "Desarrollé programas de capacitación que redujeron el tiempo de integración en un 15%.",
          ],
        },
        {
          title: "Entrenador de Ventas",
          company: "TechGiant Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Capacité a más de 50 representantes de ventas, lo que condujo a un aumento del 20% en las ventas anuales.",
            "Implementé una nueva estrategia de ventas que resultó en un aumento de ingresos de $500K.",
            "Facilité talleres que mejoraron la colaboración y comunicación del equipo.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Sales Person", issuer: "National Association of Sales Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Coach en su currículum?", answer: "Un Sales Coach debe incluir su experiencia en coaching, habilidades de ventas, logros cuantificables y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Sales Coach?", answer: "Resalte sus logros, use palabras clave relevantes y personalice su currículum para cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Sales Coach?", answer: "Las habilidades clave incluyen coaching, estrategia de ventas, análisis de desempeño, liderazgo y habilidades de comunicación." },
    ],
  },
  "sales-coordinator": {
    slug: "coordinador-de-ventas",
    title: "Coordinador de Ventas",
    keywords: ["currículum de Coordinador de Ventas", "CV de Coordinador de Ventas", "ejemplo currículum Coordinador de Ventas", "plantilla CV Coordinador de Ventas"],
    searchIntents: ["cómo escribir currículum de Coordinador de Ventas", "ejemplos currículum Coordinador de Ventas", "mejor formato CV Coordinador de Ventas"],
    topSkills: ["Soporte de Ventas", "Gestión de Relaciones con Clientes", "Análisis de Datos", "Comunicación", "Coordinación de Proyectos", "Generación de Leads", "Investigación de Mercado", "Informes de Ventas", "Gestión de Proveedores", "Resolución de Problemas"],
    atsKeywords: ["Coordinador de Ventas", "Operaciones de Ventas", "Gestión de Cuentas", "Seguimiento de Leads", "Pronóstico de Ventas", "Software CRM", "Colaboración en Equipo", "Estrategia de Ventas", "Comunicación con Clientes", "Rendimiento de Ventas", "Herramientas de Reporte"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Coordinador de Ventas",
      summary: "Coordinador de Ventas dedicado con más de 5 años de experiencia en la optimización de procesos de ventas y mejora de la productividad del equipo. Mejoró con éxito la eficiencia de ventas en un 20% a través de una gestión y coordinación efectiva de proyectos.",
      skills: ["Soporte de Ventas", "Gestión de Relaciones con Clientes", "Análisis de Datos", "Comunicación", "Coordinación de Proyectos", "Generación de Leads", "Investigación de Mercado", "Informes de Ventas", "Gestión de Proveedores", "Resolución de Problemas"],
      experience: [
        {
          title: "Coordinador de Ventas Senior",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la productividad del equipo de ventas en un 25% mediante la implementación de nuevas herramientas de CRM.",
            "Gestioné una cartera de más de 50 clientes, logrando una tasa de satisfacción del cliente del 90%.",
            "Coordiné eventos de ventas que resultaron en un aumento del 15% en la generación de leads.",
          ],
        },
        {
          title: "Coordinador de Ventas",
          company: "Global Marketing LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Ayudé en el crecimiento de los ingresos por ventas en $500,000 en un año fiscal.",
            "Desarrollé y mantuve informes de ventas que mejoraron la toma de decisiones estratégicas.",
            "Colaboré con marketing para diseñar materiales promocionales que aumentaron las ventas en un 10%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Marketing", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "National Association of Sales Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Coordinador de Ventas en su currículum?", answer: "Incluya su experiencia en gestión de ventas, habilidades de comunicación y cualquier software CRM que haya utilizado." },
      { question: "¿Cómo destacar mi currículum de Coordinador de Ventas?", answer: "Asegúrese de resaltar sus logros en ventas y su capacidad para trabajar en equipo." },
      { question: "¿Qué habilidades necesita un Coordinador de Ventas?", answer: "Habilidades clave incluyen análisis de datos, gestión de relaciones con clientes y coordinación de proyectos." },
    ],
  },
  "sales-development-representative": {
    slug: "representante-de-desarrollo-de-ventas",
    title: "Representante de Desarrollo de Ventas",
    keywords: ["currículum de representante de desarrollo de ventas", "CV de representante de desarrollo de ventas", "ejemplo currículum representante de desarrollo de ventas", "plantilla CV representante de desarrollo de ventas"],
    searchIntents: ["cómo escribir currículum de representante de desarrollo de ventas", "ejemplos currículum representante de desarrollo de ventas", "mejor formato CV representante de desarrollo de ventas"],
    topSkills: ["Generación de Leads", "Software CRM", "Email Marketing", "Salesforce", "Llamadas en Frío", "Habilidades de Comunicación", "Negociación", "Investigación de Mercado", "Gestión de Relaciones con Clientes", "Gestión del Tiempo"],
    atsKeywords: ["desarrollo de ventas", "calificación de leads", "prospectación", "estrategias de ventas", "compromiso del cliente", "análisis de mercado", "métricas de rendimiento", "gestión de pipeline", "creación de relaciones", "embudo de ventas", "desarrollo de negocios"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Desarrollo de Ventas",
      summary: "Representante de Desarrollo de Ventas dinámico con más de 5 años de experiencia en generación de leads y compromiso con los clientes, logrando un aumento del 30% en leads calificados año tras año.",
      skills: ["Generación de Leads", "Software CRM", "Email Marketing", "Salesforce", "Llamadas en Frío", "Habilidades de Comunicación", "Negociación", "Investigación de Mercado", "Gestión de Relaciones con Clientes", "Gestión del Tiempo"],
      experience: [
        {
          title: "Representante de Desarrollo de Ventas Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los leads calificados en un 40% en un año a través de estrategias de contacto dirigidas.",
            "Logré $500,000 en ingresos mediante la adquisición de nuevos clientes en 2022.",
            "Implementé un nuevo sistema CRM que mejoró la eficiencia del equipo en un 25%.",
          ],
        },
        {
          title: "Representante de Desarrollo de Ventas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Generé más de 1,000 leads en 18 meses, contribuyendo a un aumento del 20% en ventas.",
            "Reconocido como 'Mejor Desempeño' durante tres trimestres consecutivos.",
            "Desarrollé un nuevo proceso de calificación de leads que redujo el tiempo de respuesta en un 50%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Development Representative", issuer: "Sales Training Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Development Representative en su currículum?", answer: "Un Sales Development Representative debe incluir su experiencia en generación de leads, habilidades de comunicación y logros en ventas." },
      { question: "¿Cómo destacar mi currículum de Sales Development Representative?", answer: "Destaca tus logros cuantificables, usa palabras clave relevantes y personaliza tu currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Sales Development Representative?", answer: "Las habilidades clave incluyen generación de leads, manejo de CRM, comunicación efectiva y negociación." },
    ],
  },
  "sales-director": {
    slug: "director-de-ventas",
    title: "Director de Ventas",
    keywords: ["currículum de Director de Ventas", "CV de Director de Ventas", "ejemplo currículum Director de Ventas", "plantilla CV Director de Ventas"],
    searchIntents: ["cómo escribir currículum de Director de Ventas", "ejemplos currículum Director de Ventas", "mejor formato CV Director de Ventas"],
    topSkills: ["Planificación Estratégica", "Pronóstico de Ventas", "Liderazgo de Equipo", "Análisis de Mercado", "Negociación", "Gestión de Relaciones con Clientes", "Desarrollo de Negocios", "Métricas de Rendimiento", "Colaboración Interfuncional", "Capacitación en Ventas"],
    atsKeywords: ["estrategia de ventas", "adquisición de clientes", "crecimiento de ingresos", "gestión de pipeline", "análisis competitivo", "gestión de territorio", "operaciones de ventas", "gestión de cuentas clave", "software CRM", "presentaciones de ventas", "gestión de equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Director de Ventas",
      summary: "Director de Ventas dinámico con más de 10 años de experiencia impulsando el crecimiento de ingresos y construyendo equipos de alto rendimiento. Aumentó las ventas en un 35% año tras año en roles anteriores.",
      skills: ["Planificación Estratégica", "Pronóstico de Ventas", "Liderazgo de Equipo", "Análisis de Mercado", "Negociación", "Gestión de Relaciones con Clientes", "Desarrollo de Negocios", "Métricas de Rendimiento", "Colaboración Interfuncional", "Capacitación en Ventas"],
      experience: [
        {
          title: "Director de Ventas Sénior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas anuales en un 40%, lo que resultó en $5 millones adicionales en ingresos.",
            "Dirigí un equipo de 15 representantes de ventas, logrando el 120% de los objetivos de ventas durante 3 años consecutivos.",
            "Implementé un nuevo sistema CRM que mejoró la interacción con los clientes en un 30%.",
          ],
        },
        {
          title: "Gerente de Ventas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré un crecimiento del 25% en la cuota de mercado en 18 meses.",
            "Desarrollé un programa de capacitación que mejoró el rendimiento de ventas del equipo en un 20%.",
            "Cultivé relaciones con clientes clave, aumentando el negocio recurrente en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Executive", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Director de Ventas en su currículum?", answer: "Un Director de Ventas debe incluir experiencia relevante, logros cuantificables, habilidades de liderazgo y conocimientos del mercado." },
      { question: "¿Cómo destacar mi currículum de Director de Ventas?", answer: "Utilice métricas específicas para resaltar sus logros y ajuste su currículum a las palabras clave del trabajo que está solicitando." },
      { question: "¿Qué habilidades necesita un Director de Ventas?", answer: "Un Director de Ventas necesita habilidades en planificación estratégica, liderazgo, negociación y gestión de relaciones con clientes." },
    ],
  },
  "sales-engineer": {
    slug: "ingeniero-de-ventas",
    title: "Ingeniero de Ventas",
    keywords: ["currículum de ingeniero de ventas", "CV de ingeniero de ventas", "ejemplo currículum ingeniero de ventas", "plantilla CV ingeniero de ventas"],
    searchIntents: ["cómo escribir currículum de ingeniero de ventas", "ejemplos currículum ingeniero de ventas", "mejor formato CV ingeniero de ventas"],
    topSkills: ["Ventas Técnicas", "Gestión de Relaciones con Clientes", "Conocimiento del Producto", "Venta de Soluciones", "Negociación", "Habilidades de Presentación", "Análisis de Mercado", "Estrategia de Ventas", "Networking", "Soporte Técnico"],
    atsKeywords: ["Ingeniería de Ventas", "Ventas B2B", "Soluciones para Clientes", "Presentaciones de Ventas", "Demostraciones de Productos", "Colaboración Interfuncional", "Pronóstico de Ventas", "Generación de Leads", "Gestión de Cuentas", "Compromiso del Cliente", "Especificaciones Técnicas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Ventas",
      summary: "Ingeniero de Ventas con más de 5 años de experiencia en ventas técnicas y soluciones para clientes, logrando un aumento del 30% en los ingresos a través de estrategias de ventas innovadoras.",
      skills: ["Ventas Técnicas", "Gestión de Relaciones con Clientes", "Conocimiento del Producto", "Venta de Soluciones", "Negociación", "Habilidades de Presentación", "Análisis de Mercado", "Estrategia de Ventas", "Networking", "Soporte Técnico"],
      experience: [
        {
          title: "Ingeniero de Ventas Senior",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 40% en 2022 a través de estrategias de compromiso con los clientes enfocadas.",
            "Cerré exitosamente acuerdos por un valor de $2M a través de venta efectiva de soluciones.",
            "Desarrollé y entregué capacitación de productos a más de 100 representantes de ventas, mejorando el conocimiento del producto.",
          ],
        },
        {
          title: "Ingeniero de Ventas",
          company: "Innovative Technologies LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 150% de la cuota de ventas en 2020, generando $1.5M en nuevos negocios.",
            "Lideré demostraciones de productos exitosas que resultaron en un aumento del 25% en las tasas de conversión de clientes.",
            "Colaboré con equipos de ingeniería para personalizar soluciones, resultando en un aumento del 20% en la satisfacción del cliente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ingeniería Eléctrica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Engineer", issuer: "Sales Engineering Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Ventas en su currículum?", answer: "Debería incluir habilidades técnicas, experiencia en ventas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Ventas?", answer: "Enfóquese en logros específicos, use palabras clave relevantes y mantenga un formato claro." },
      { question: "¿Qué habilidades necesita un Ingeniero de Ventas?", answer: "Habilidades en ventas técnicas, gestión de relaciones y capacidad de negociación son esenciales." },
    ],
  },
  "sales-executive-at-bell-communications": {
    slug: "ejecutivo-de-ventas",
    title: "Ejecutivo de Ventas",
    keywords: ["currículum de Ejecutivo de Ventas", "CV de Ejecutivo de Ventas", "ejemplo currículum Ejecutivo de Ventas", "plantilla CV Ejecutivo de Ventas"],
    searchIntents: ["cómo escribir currículum de Ejecutivo de Ventas", "ejemplos currículum Ejecutivo de Ventas", "mejor formato CV Ejecutivo de Ventas"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Generación de Leads", "Negociación", "Análisis de Mercado", "Pronóstico de Ventas", "Gestión de Cuentas", "Habilidades de Comunicación", "Habilidades de Presentación", "Gestión del Tiempo"],
    atsKeywords: ["Ventas", "Crecimiento de Ingresos", "Retención de Clientes", "Desarrollo de Negocios", "Ventas B2B", "Objetivos de Ventas", "Conversión de Leads", "Presentaciones de Ventas", "Compromiso del Cliente", "Análisis de Ventas", "Métricas de Rendimiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ejecutivo de Ventas",
      summary: "Ejecutivo de ventas dinámico con más de 5 años de experiencia en impulsar el crecimiento de ingresos y construir relaciones sólidas con los clientes, logrando un incremento del 30% en ventas año tras año.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Generación de Leads", "Negociación", "Análisis de Mercado", "Pronóstico de Ventas", "Gestión de Cuentas", "Habilidades de Comunicación", "Habilidades de Presentación", "Gestión del Tiempo"],
      experience: [
        {
          title: "Ejecutivo de Ventas Senior",
          company: "Verizon Communications",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas anuales en un 40%, generando $2 millones en ingresos.",
            "Inicié exitosamente a más de 50 nuevos clientes en el primer año.",
            "Lideré un equipo para superar los objetivos de ventas trimestrales en un promedio del 25%.",
          ],
        },
        {
          title: "Ejecutivo de Ventas",
          company: "AT&T",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% del objetivo de ventas durante 6 trimestres consecutivos.",
            "Desarrollé asociaciones estratégicas, resultando en un incremento del 15% en referencias de clientes.",
            "Implementé procesos de retroalimentación del cliente que mejoraron las puntuaciones de satisfacción del cliente en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Los Angeles", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ejecutivo de Ventas en su currículum?", answer: "Un Ejecutivo de Ventas debe incluir su experiencia en ventas, habilidades interpersonales, logros cuantificables y formación académica relevante." },
      { question: "¿Cómo destacar mi currículum de Ejecutivo de Ventas?", answer: "Destaca tus logros en ventas, utiliza métricas para respaldar tus éxitos y personaliza tu currículum para cada puesto al que apliques." },
      { question: "¿Qué habilidades necesita un Ejecutivo de Ventas?", answer: "Las habilidades clave incluyen la negociación, la gestión de relaciones, la capacidad de análisis de mercado y habilidades de presentación." },
    ],
  },
  "sales-intern": {
    slug: "practica-en-ventas",
    title: "Práctica en Ventas",
    keywords: ["currículum de práctica en ventas", "CV de práctica en ventas", "ejemplo currículum práctica en ventas", "plantilla CV práctica en ventas"],
    searchIntents: ["cómo escribir currículum de práctica en ventas", "ejemplos currículum práctica en ventas", "mejor formato CV práctica en ventas"],
    topSkills: ["comunicación", "servicio al cliente", "negociación", "análisis de datos", "software CRM", "trabajo en equipo", "gestión del tiempo", "presentación", "resolución de problemas", "estrategia de ventas"],
    atsKeywords: ["ventas", "práctica", "gestión de relaciones con clientes", "comunicación", "trabajo en equipo", "negociación", "investigación de mercado", "informes de ventas", "análisis de datos", "generación de leads", "compromiso del cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Práctica en Ventas",
      summary: "Practicante en Ventas orientado a los detalles con 2 años de experiencia en servicio al cliente y un historial comprobado de alcanzar objetivos de ventas. Contribuí exitosamente a un aumento del 15% en el compromiso del cliente durante un año.",
      skills: ["comunicación", "servicio al cliente", "negociación", "análisis de datos", "software CRM", "trabajo en equipo", "gestión del tiempo", "presentación", "resolución de problemas", "estrategia de ventas"],
      experience: [
        {
          title: "Práctica en Ventas",
          company: "Tech Innovations Inc.",
          startDate: "2023-06",
          isCurrent: true,
          achievements: [
            "Aumenté la generación de leads en un 25% a través de estrategias de alcance específicas.",
            "Logré un puntaje de satisfacción del cliente del 90% durante la duración de la práctica.",
            "Asistí en el cierre de ventas por más de $50,000 durante la práctica.",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "Retail Solutions Ltd.",
          startDate: "2021-08",
          endDate: "2023-05",
          achievements: [
            "Alcancé más del 120% de los objetivos de ventas durante tres trimestres consecutivos.",
            "Recibí el premio 'Empleado del Mes' por un servicio al cliente excepcional en dos ocasiones.",
            "Contribuí a un aumento del 10% en los ingresos de la tienda a través de técnicas de upselling efectivas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2019-08", endDate: "2023-05" },
      ],
      certifications: [
        { name: "Sales Fundamentals", issuer: "Sales Training Academy", date: "2022-07" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Intern en su currículum?", answer: "Un Sales Intern debe incluir experiencia relevante, habilidades de comunicación y logros en ventas." },
      { question: "¿Cómo destacar mi currículum de Sales Intern?", answer: "Destaca tus logros y experiencias específicas en ventas y servicio al cliente." },
      { question: "¿Qué habilidades necesita un Sales Intern?", answer: "Habilidades clave incluyen comunicación, negociación y análisis de datos." },
    ],
  },
  "sales-lead": {
    slug: "lider-de-ventas",
    title: "Líder de Ventas",
    keywords: ["currículum de líder de ventas", "CV de líder de ventas", "ejemplo currículum líder de ventas", "plantilla CV líder de ventas"],
    searchIntents: ["cómo escribir currículum de líder de ventas", "ejemplos currículum líder de ventas", "mejor formato CV líder de ventas"],
    topSkills: ["Estrategia de Ventas", "Liderazgo de Equipo", "Gestión de Relaciones con Clientes", "Negociación", "Análisis de Mercado", "Generación de Leads", "Pronóstico de Ventas", "Gestión de Pipeline", "Métricas de Rendimiento", "Capacitación y Desarrollo"],
    atsKeywords: ["Gestión de Ventas", "Gestión de Cuentas", "Desarrollo de Negocios", "Operaciones de Ventas", "Crecimiento de Ingresos", "Retención de Clientes", "Ventas de Campo", "Presentaciones de Ventas", "Venta Cruzada", "Reportes de Ventas", "Investigación de Mercado"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Líder de Ventas",
      summary: "Líder de Ventas dinámico con más de 5 años de experiencia en impulsar el crecimiento de ingresos y liderar equipos de ventas de alto rendimiento. Alcancé el 150% de los objetivos de ventas, lo que resultó en $2M de ingresos incrementales.",
      skills: ["Estrategia de Ventas", "Liderazgo de Equipo", "Gestión de Relaciones con Clientes", "Negociación", "Análisis de Mercado", "Generación de Leads", "Pronóstico de Ventas", "Gestión de Pipeline", "Métricas de Rendimiento", "Capacitación y Desarrollo"],
      experience: [
        {
          title: "Líder de Ventas Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas trimestrales en un 30%, generando $500K adicionales en ingresos.",
            "Lideré un equipo de 10 representantes de ventas para superar los objetivos anuales en un 25%.",
            "Implementé un nuevo sistema CRM que mejoró la eficiencia de seguimiento de leads en un 40%.",
          ],
        },
        {
          title: "Especialista en Ventas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de la cuota de ventas durante 3 años consecutivos.",
            "Desarrollé asociaciones clave que expandieron el alcance del mercado en un 15%.",
            "Realicé más de 100 presentaciones de ventas, resultando en una tasa de conversión del 20%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Lead en su currículum?", answer: "Un Sales Lead debe incluir su experiencia en liderazgo, logros en ventas, y habilidades específicas relacionadas con la gestión y estrategia de ventas." },
      { question: "¿Cómo destacar mi currículum de Sales Lead?", answer: "Es importante resaltar logros cuantificables, utilizar palabras clave de la industria y adaptar el currículum a la descripción del trabajo." },
      { question: "¿Qué habilidades necesita un Sales Lead?", answer: "Un Sales Lead necesita habilidades en estrategia de ventas, liderazgo, negociación, y gestión de relaciones con clientes." },
    ],
  },
  "sales-officer": {
    slug: "oficial-de-ventas",
    title: "Oficial de Ventas",
    keywords: ["currículum de oficial de ventas", "CV de oficial de ventas", "ejemplo currículum oficial de ventas", "plantilla CV oficial de ventas"],
    searchIntents: ["cómo escribir currículum de oficial de ventas", "ejemplos currículum oficial de ventas", "mejor formato CV oficial de ventas"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Negociación", "Investigación de Mercados", "Generación de Leads", "Pronósticos de Ventas", "Comunicación", "Resolución de Problemas", "Colaboración en Equipo", "Análisis de Datos"],
    atsKeywords: ["ventas", "gestión de clientes", "gestión de territorio", "proceso de ventas", "ventas B2B", "ventas B2C", "gestión de cuentas", "presentaciones de ventas", "negociación de contratos", "objetivos de ventas", "gestión de pipeline"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Oficial de Ventas",
      summary: "Oficial de Ventas orientado a resultados con más de 5 años de experiencia en impulsar el crecimiento de ventas y mejorar la satisfacción del cliente. Aumentó exitosamente los ingresos por ventas en un 30% en el último año fiscal a través de una planificación estratégica y un compromiso con los clientes.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Negociación", "Investigación de Mercados", "Generación de Leads", "Pronósticos de Ventas", "Comunicación", "Resolución de Problemas", "Colaboración en Equipo", "Análisis de Datos"],
      experience: [
        {
          title: "Oficial de Ventas Senior",
          company: "Tech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré el 150% de la cuota de ventas, generando $500,000 adicionales en ingresos.",
            "Incrementé la tasa de retención de clientes en un 25% a través de una mejor entrega de servicio.",
            "Implementé un nuevo programa de capacitación en ventas que mejoró el rendimiento del equipo en un 40%.",
          ],
        },
        {
          title: "Representante de Ventas",
          company: "Retail Corp",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé consistentemente los objetivos de ventas mensuales en un promedio del 20%.",
            "Desarrollé y mantuve relaciones con más de 100 cuentas clave.",
            "Reconocido como 'Empleado del Mes' tres veces por un desempeño sobresaliente en ventas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Oficial de Ventas en su currículum?", answer: "Debe incluir su experiencia en ventas, habilidades de negociación y gestión de clientes, así como logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Oficial de Ventas?", answer: "Utilice palabras clave relevantes, destaque sus logros y mantenga un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un Oficial de Ventas?", answer: "Habilidades clave incluyen la estrategia de ventas, gestión de relaciones con clientes, y capacidad de análisis de datos." },
    ],
  },
  "sales-operations-analyst": {
    slug: "analista-de-operaciones-de-ventas",
    title: "Analista de Operaciones de Ventas",
    keywords: ["currículum de analista de operaciones de ventas", "CV de analista de operaciones de ventas", "ejemplo currículum analista de operaciones de ventas", "plantilla CV analista de operaciones de ventas"],
    searchIntents: ["cómo escribir currículum de analista de operaciones de ventas", "ejemplos currículum analista de operaciones de ventas", "mejor formato CV analista de operaciones de ventas"],
    topSkills: ["Análisis de Datos", "Pronóstico de Ventas", "Gestión de CRM", "Informes y Análisis", "Mejora de Procesos", "Estrategia de Ventas", "Colaboración Interfuncional", "Gestión de Proyectos", "Investigación de Mercado", "Métricas de Rendimiento"],
    atsKeywords: ["Operaciones de Ventas", "Habilidades Analíticas", "Rendimiento de Ventas", "Visualización de Datos", "Informes de Ventas", "Pronóstico", "Análisis de Mercado", "Sistemas CRM", "Inteligencia de Negocios", "Gestión de Partes Interesadas", "Análisis de Rendimiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Analista de Operaciones de Ventas",
      summary: "Analista de Operaciones de Ventas orientado a resultados con más de 5 años de experiencia en la optimización de procesos de ventas y mejora del rendimiento. Logré un aumento del 25% en la eficiencia de ventas a través de estrategias basadas en datos y colaboración interfuncional.",
      skills: ["Análisis de Datos", "Pronóstico de Ventas", "Gestión de CRM", "Informes y Análisis", "Mejora de Procesos", "Estrategia de Ventas", "Colaboración Interfuncional", "Gestión de Proyectos", "Investigación de Mercado", "Métricas de Rendimiento"],
      experience: [
        {
          title: "Analista Senior de Operaciones de Ventas",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré la precisión del pronóstico de ventas en un 30% durante el último año fiscal.",
            "Agilicé los procesos de informes, reduciendo el tiempo de generación de informes en 40 horas mensuales.",
            "Lideré un proyecto interdepartamental que aumentó los ingresos en $500,000 anuales.",
          ],
        },
        {
          title: "Analista de Operaciones de Ventas",
          company: "Market Leaders LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un nuevo panel de CRM que mejoró la accesibilidad del equipo de ventas a los datos.",
            "Analicé tendencias del mercado resultando en campañas dirigidas que aumentaron las ventas en un 15%.",
            "Colaboré con IT para mejorar la integración de datos, reduciendo errores en un 20%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Operations Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Operations Analyst en su currículum?", answer: "Un Sales Operations Analyst debe incluir habilidades analíticas, experiencia en gestión de CRM, y logros en la mejora de procesos de ventas." },
      { question: "¿Cómo destacar mi currículum de Sales Operations Analyst?", answer: "Para destacar, incluya métricas cuantificables de sus logros y use palabras clave relevantes para el sector." },
      { question: "¿Qué habilidades necesita un Sales Operations Analyst?", answer: "Un Sales Operations Analyst necesita habilidades en análisis de datos, pronóstico de ventas, y colaboración interfuncional." },
    ],
  },
  "sales-professional": {
    slug: "profesional-de-ventas",
    title: "Profesional de Ventas",
    keywords: ["currículum de profesional de ventas", "CV de profesional de ventas", "ejemplo currículum profesional de ventas", "plantilla CV profesional de ventas"],
    searchIntents: ["cómo escribir currículum de profesional de ventas", "ejemplos currículum profesional de ventas", "mejor formato CV profesional de ventas"],
    topSkills: ["Negociación", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Generación de Leads", "Análisis de Mercado", "Técnicas de Cierre", "Comunicación", "Gestión del Tiempo", "Conocimiento del Producto", "Colaboración en Equipo"],
    atsKeywords: ["Ventas", "Ventas B2B", "Ventas B2C", "Pronóstico de Ventas", "Presentaciones de Ventas", "Informes de Ventas", "Adquisición de Clientes", "Gestión de Cuentas", "Capacitación en Ventas", "Software CRM", "Métricas de Ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Profesional de Ventas",
      summary: "Profesional de Ventas orientado a resultados con más de 5 años de experiencia en ventas B2B y un historial comprobado de superar los objetivos de ventas en un 30%. Experto en construir relaciones sólidas con los clientes y fomentar el crecimiento de ingresos.",
      skills: ["Negociación", "Gestión de Relaciones con Clientes", "Estrategia de Ventas", "Generación de Leads", "Análisis de Mercado", "Técnicas de Cierre", "Comunicación", "Gestión del Tiempo", "Conocimiento del Producto", "Colaboración en Equipo"],
      experience: [
        {
          title: "Ejecutivo de Ventas Senior",
          company: "Tech Innovators Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas del territorio en un 40% en el primer año.",
            "Cerré con éxito un contrato de $500K con un cliente importante.",
            "Implementé un nuevo sistema CRM que mejoró la eficiencia del seguimiento de ventas en un 25%.",
          ],
        },
        {
          title: "Asociado de Ventas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de la cuota de ventas de manera consistente durante 2 años.",
            "Desarrollé un programa de referencias de clientes que aumentó nuevos leads en un 50%.",
            "Realicé más de 100 demostraciones de productos con una tasa de conversión del 60%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Profesional de Ventas en su currículum?", answer: "Debe incluir habilidades relevantes, experiencia laboral, logros cuantificables y educación." },
      { question: "¿Cómo destacar mi currículum de Profesional de Ventas?", answer: "Utiliza palabras clave de la industria, resalta tus logros y personaliza el currículum para cada puesto." },
      { question: "¿Qué habilidades necesita un Profesional de Ventas?", answer: "Negociación, gestión de relaciones, estrategia de ventas y habilidades de comunicación son esenciales." },
    ],
  },
  "sales-promoter": {
    slug: "promotor-de-ventas",
    title: "Promotor de Ventas",
    keywords: ["currículum de promotor de ventas", "CV de promotor de ventas", "ejemplo currículum promotor de ventas", "plantilla CV promotor de ventas"],
    searchIntents: ["cómo escribir currículum de promotor de ventas", "ejemplos currículum promotor de ventas", "mejor formato CV promotor de ventas"],
    topSkills: ["compromiso con el cliente", "conocimiento del producto", "técnicas de ventas", "habilidades de comunicación", "negociación", "construcción de relaciones", "investigación de mercado", "colaboración en equipo", "gestión del tiempo", "resolución de problemas"],
    atsKeywords: ["ventas", "promotor", "servicio al cliente", "merchandising", "embajador de marca", "eventos promocionales", "generación de leads", "presentaciones de ventas", "análisis de mercado", "promoción de productos", "retroalimentación del cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Promotor de Ventas",
      summary: "Promotor de Ventas dinámico con más de 5 años de experiencia en impulsar ventas y mejorar la visibilidad de la marca. Aumentó exitosamente las ventas de productos en un 30% a través de campañas promocionales estratégicas.",
      skills: ["compromiso con el cliente", "conocimiento del producto", "técnicas de ventas", "habilidades de comunicación", "negociación", "construcción de relaciones", "investigación de mercado", "colaboración en equipo", "gestión del tiempo", "resolución de problemas"],
      experience: [
        {
          title: "Promotor de Ventas Senior",
          company: "Procter & Gamble",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 40% en el primer trimestre de 2022 a través de estrategias promocionales dirigidas.",
            "Organice exitosamente 15 eventos promocionales que llevaron a un aumento del 25% en el reconocimiento de la marca.",
            "Entrené y mentoreé a 10 promotores de ventas junior, mejorando el rendimiento del equipo en un 20%.",
          ],
        },
        {
          title: "Promotor de Ventas",
          company: "Coca-Cola",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de los objetivos de ventas de manera constante durante 2 años.",
            "Implementé un nuevo sistema de retroalimentación del cliente que mejoró las calificaciones de satisfacción del producto en un 15%.",
            "Coordiné campañas de marketing que resultaron en un aumento del 30% en el tráfico peatonal.",
          ],
        },
      ],
      education: [
        { institution: "University of Marketing", degree: "B.S.", field: "Marketing", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Promotor de Ventas en su currículum?", answer: "Debe incluir experiencia en ventas, habilidades de comunicación y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Promotor de Ventas?", answer: "Enfóquese en sus logros y utilice números para demostrar su impacto en las ventas." },
      { question: "¿Qué habilidades necesita un Promotor de Ventas?", answer: "Las habilidades clave incluyen técnicas de ventas, comunicación efectiva y capacidad de negociación." },
    ],
  },
  "sales-recruiter": {
    slug: "reclutador-de-ventas",
    title: "Reclutador de Ventas",
    keywords: ["currículum de reclutador de ventas", "CV de reclutador de ventas", "ejemplo currículum reclutador de ventas", "plantilla CV reclutador de ventas"],
    searchIntents: ["cómo escribir currículum de reclutador de ventas", "ejemplos currículum reclutador de ventas", "mejor formato CV reclutador de ventas"],
    topSkills: ["Adquisición de Talento", "Búsqueda de Candidatos", "Entrevistas", "Negociación", "Gestión de Relaciones", "Conocimiento de Ventas", "Sistemas de Seguimiento de Solicitudes", "Investigación de Mercado", "Redes", "Análisis de Datos"],
    atsKeywords: ["Reclutamiento", "Reclutamiento de Ventas", "Gestión del Talento", "Compromiso del Candidato", "Estrategias de Búsqueda", "Pipeline de Ventas", "Métricas de Desempeño", "Publicaciones de Trabajo", "Técnicas de Entrevista", "Negociación de Ofertas", "Relaciones con Clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Reclutador de Ventas",
      summary: "Reclutador de Ventas con más de 5 años de experiencia en identificar y atraer el mejor talento de ventas, logrando un aumento del 30% en colocaciones año tras año.",
      skills: ["Adquisición de Talento", "Búsqueda de Candidatos", "Entrevistas", "Negociación", "Gestión de Relaciones", "Conocimiento de Ventas", "Sistemas de Seguimiento de Solicitudes", "Investigación de Mercado", "Redes", "Análisis de Datos"],
      experience: [
        {
          title: "Reclutador de Ventas Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las colocaciones del equipo de ventas en un 40% en un año, contribuyendo a un crecimiento de ingresos de $1 millón.",
            "Reduje el tiempo para cubrir posiciones de ventas en un 25% mediante estrategias de búsqueda mejoradas.",
            "Implementé un nuevo proceso de compromiso con los candidatos que mejoró las puntuaciones de satisfacción de los candidatos en un 15%.",
          ],
        },
        {
          title: "Reclutador de Ventas",
          company: "Dynamic Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Llené con éxito más de 100 posiciones de ventas en dos años, logrando una tasa de retención del 90%.",
            "Desarrollé una campaña de marketing de reclutamiento dirigida que aumentó las aplicaciones de candidatos calificados en un 50%.",
            "Colaboré con el liderazgo de ventas para entender las necesidades de contratación y alinear las estrategias de reclutamiento.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Recursos Humanos", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Recruitment Professional", issuer: "Recruitment Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Recruiter en su currículum?", answer: "Debe incluir experiencias relevantes, habilidades clave y logros cuantificables en reclutamiento." },
      { question: "¿Cómo destacar mi currículum de Sales Recruiter?", answer: "Utiliza palabras clave específicas de la industria y resalta tus logros más significativos." },
      { question: "¿Qué habilidades necesita un Sales Recruiter?", answer: "Necesita habilidades en adquisición de talento, negociación, gestión de relaciones y conocimiento del mercado de ventas." },
    ],
  },
  "sales-specialist": {
    slug: "especialista-en-ventas",
    title: "Especialista en Ventas",
    keywords: ["currículum de especialista en ventas", "CV de especialista en ventas", "ejemplo currículum especialista en ventas", "plantilla CV especialista en ventas"],
    searchIntents: ["cómo escribir currículum de especialista en ventas", "ejemplos currículum especialista en ventas", "mejor formato CV especialista en ventas"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Generación de Leads", "Negociación", "Investigación de Mercado", "Pronóstico de Ventas", "Conocimiento del Producto", "Redes", "Análisis de Datos", "Comunicación"],
    atsKeywords: ["ventas", "servicio al cliente", "ventas B2B", "ventas B2C", "gestión de territorio", "presentaciones de ventas", "técnicas de cierre", "creación de relaciones", "objetivos de ventas", "software CRM", "prospección"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Ventas",
      summary: "Especialista en ventas dedicado con más de 5 años de experiencia en impulsar el crecimiento de ingresos y superar los objetivos de ventas. Historial comprobado de lograr un aumento del 30% en el volumen de ventas año tras año.",
      skills: ["Estrategia de Ventas", "Gestión de Relaciones con Clientes", "Generación de Leads", "Negociación", "Investigación de Mercado", "Pronóstico de Ventas", "Conocimiento del Producto", "Redes", "Análisis de Datos", "Comunicación"],
      experience: [
        {
          title: "Especialista en Ventas Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas anuales en un 40%, lo que resultó en $1M de ingresos adicionales.",
            "Integré y capacité con éxito a 10 nuevos representantes de ventas, mejorando el rendimiento del equipo.",
            "Desarrollé e implementé una nueva estrategia de ventas que mejoró la retención de clientes en un 25%.",
          ],
        },
        {
          title: "Representante de Ventas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de la cuota de ventas durante 3 trimestres consecutivos.",
            "Generé $500K en nuevos negocios a través de una generación de leads efectiva.",
            "Reconocido como 'Mejor Desempeño en Ventas' por un rendimiento sobresaliente en ventas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Marketing", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional (CSP)", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Specialist en su currículum?", answer: "Un Sales Specialist debe incluir su experiencia en ventas, habilidades relacionadas, logros cuantificables y educación relevante." },
      { question: "¿Cómo destacar mi currículum de Sales Specialist?", answer: "Para destacar, utiliza palabras clave de la industria, destaca tus logros más importantes y personaliza tu currículum para cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Sales Specialist?", answer: "Un Sales Specialist necesita habilidades en estrategia de ventas, gestión de relaciones, negociación y análisis de datos, entre otras." },
    ],
  },
  "sales-specialist-italian": {
    slug: "especialista-en-ventas-italiano",
    title: "Especialista en Ventas Italiano",
    keywords: ["currículum de Especialista en Ventas Italiano", "CV de Especialista en Ventas Italiano", "ejemplo currículum Especialista en Ventas Italiano", "plantilla CV Especialista en Ventas Italiano"],
    searchIntents: ["cómo escribir currículum de Especialista en Ventas Italiano", "ejemplos currículum Especialista en Ventas Italiano", "mejor formato CV Especialista en Ventas Italiano"],
    topSkills: ["Gestión de Relaciones con Clientes", "Desarrollo de Estrategias de Ventas", "Habilidades de Negociación", "Análisis de Mercado", "Generación de Leads", "Gestión de Cuentas", "Comunicación Bilingüe", "Conocimiento de Productos", "Pronóstico de Ventas", "Análisis de Datos"],
    atsKeywords: ["Ventas", "Compromiso del Cliente", "Objetivos de Ventas", "Desarrollo de Negocios", "Adquisición de Cuentas", "Presentaciones de Ventas", "Retención de Clientes", "Métricas de Desempeño", "Informes de Ventas", "Crecimiento de Ingresos", "Capacitación en Ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Ventas Italiano",
      summary: "Especialista en ventas dinámico con más de 5 años de experiencia en el mercado italiano, logrando un aumento del 30% en los ingresos por ventas año tras año y expandiendo la base de clientes en un 50%.",
      skills: ["Gestión de Relaciones con Clientes", "Desarrollo de Estrategias de Ventas", "Habilidades de Negociación", "Análisis de Mercado", "Generación de Leads", "Gestión de Cuentas", "Comunicación Bilingüe", "Conocimiento de Productos", "Pronóstico de Ventas", "Análisis de Datos"],
      experience: [
        {
          title: "Especialista Senior en Ventas",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 40% dentro del primer año, generando $1.2 millones adicionales en ingresos.",
            "Gestioné exitosamente una cartera de más de 150 clientes, logrando una tasa de retención del 95%.",
            "Desarrollé y ejecuté una estrategia de entrada al mercado que expandió las operaciones a tres nuevas regiones.",
          ],
        },
        {
          title: "Ejecutivo de Ventas",
          company: "Global Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 120% de los objetivos de ventas de manera consistente durante tres años.",
            "Implementé un nuevo sistema de CRM que mejoró la eficiencia del seguimiento de clientes en un 25%.",
            "Lideré un equipo multifuncional para lanzar una nueva línea de productos, resultando en un aumento del 15% en la cuota de mercado.",
          ],
        },
      ],
      education: [
        { institution: "University of Milan", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Especialista en Ventas Italiano en su currículum?", answer: "Debe incluir experiencia relevante, habilidades clave y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Especialista en Ventas Italiano?", answer: "Enfatiza tus resultados en ventas y tu capacidad de gestión de relaciones con clientes." },
      { question: "¿Qué habilidades necesita un Especialista en Ventas Italiano?", answer: "Se requieren habilidades en gestión de relaciones, análisis de mercado y negociación." },
    ],
  },
  "sales-supervisor": {
    slug: "supervisor-de-ventas",
    title: "Supervisor de Ventas",
    keywords: ["currículum de Supervisor de Ventas", "CV de Supervisor de Ventas", "ejemplo currículum Supervisor de Ventas", "plantilla CV Supervisor de Ventas"],
    searchIntents: ["cómo escribir currículum de Supervisor de Ventas", "ejemplos currículum Supervisor de Ventas", "mejor formato CV Supervisor de Ventas"],
    topSkills: ["Gestión de Ventas", "Liderazgo de Equipos", "Gestión de Relaciones con Clientes", "Planificación Estratégica", "Análisis de Desempeño", "Capacitación y Desarrollo", "Gestión de Inventario", "Resolución de Conflictos", "Pronóstico de Ventas", "Análisis de Mercado"],
    atsKeywords: ["estrategia de ventas", "desempeño del equipo", "retención de clientes", "metas de ventas", "generación de leads", "desarrollo de negocios", "análisis de ventas", "coaching", "merchandising", "toma de decisiones basada en datos", "colaboración interfuncional"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Supervisor de Ventas",
      summary: "Supervisor de Ventas dinámico con más de 5 años de experiencia en impulsar el desempeño de ventas y liderar equipos para alcanzar objetivos. Historial comprobado de incremento de ventas en un 30% año tras año a través de la planificación estratégica y la gestión efectiva del equipo.",
      skills: ["Gestión de Ventas", "Liderazgo de Equipos", "Gestión de Relaciones con Clientes", "Planificación Estratégica", "Análisis de Desempeño", "Capacitación y Desarrollo", "Gestión de Inventario", "Resolución de Conflictos", "Pronóstico de Ventas", "Análisis de Mercado"],
      experience: [
        {
          title: "Supervisor de Ventas Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el desempeño de ventas del equipo en un 40% dentro del primer año, lo que resultó en $500,000 adicionales en ingresos.",
            "Implementé con éxito un nuevo programa de capacitación que mejoró las tasas de cierre del equipo en un 25%.",
            "Reduje las quejas de clientes en un 30% a través de protocolos de servicio mejorados.",
          ],
        },
        {
          title: "Supervisor de Ventas",
          company: "Retail Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Lideré un equipo de 15 asociados de ventas para superar consistentemente las metas de ventas mensuales en un promedio del 20%.",
            "Desarrollé y ejecuté estrategias promocionales que aumentaron el tráfico peatonal en un 15%.",
            "Optimicé los procesos de inventario, reduciendo las discrepancias de stock en un 50%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Supervisor de Ventas en su currículum?", answer: "Debe incluir experiencia en gestión de ventas, habilidades de liderazgo, y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Supervisor de Ventas?", answer: "Enfatiza tus logros, utiliza palabras clave relevantes y adapta tu CV a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Supervisor de Ventas?", answer: "Habilidades clave incluyen gestión de ventas, liderazgo, y capacidad para analizar datos de mercado." },
    ],
  },
  "sales-support": {
    slug: "especialista-en-soporte-de-ventas",
    title: "Especialista en Soporte de Ventas",
    keywords: ["currículum de Especialista en Soporte de Ventas", "CV de Especialista en Soporte de Ventas", "ejemplo currículum Especialista en Soporte de Ventas", "plantilla CV Especialista en Soporte de Ventas"],
    searchIntents: ["cómo escribir currículum de Especialista en Soporte de Ventas", "ejemplos currículum Especialista en Soporte de Ventas", "mejor formato CV Especialista en Soporte de Ventas"],
    topSkills: ["Gestión de Relaciones con Clientes", "Coordinación de Ventas", "Análisis de Datos", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Conocimiento del Producto", "Soporte Técnico", "Informes de Ventas", "Colaboración en Equipo"],
    atsKeywords: ["Soporte de Ventas", "Servicio al Cliente", "Administración de Ventas", "Generación de Leads", "Procesamiento de Pedidos", "Gestión de Inventarios", "Estrategias de Ventas", "Compromiso con Clientes", "Investigación de Mercado", "Software CRM", "Métricas de Ventas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Soporte de Ventas",
      summary: "Especialista en Soporte de Ventas orientado a los detalles con más de 5 años de experiencia en mejorar la satisfacción del cliente y impulsar el crecimiento de ventas. Historial comprobado de mejorar la eficiencia en el procesamiento de pedidos en un 30% y aumentar las tasas de retención de clientes en un 15%.",
      skills: ["Gestión de Relaciones con Clientes", "Coordinación de Ventas", "Análisis de Datos", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Conocimiento del Producto", "Soporte Técnico", "Informes de Ventas", "Colaboración en Equipo"],
      experience: [
        {
          title: "Especialista Senior en Soporte de Ventas",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la puntuación de satisfacción del cliente en un 25% a través de una comunicación y soporte efectivos.",
            "Optimicé el procesamiento de pedidos, reduciendo el tiempo de respuesta en un 40%.",
            "Implementé un nuevo sistema CRM que mejoró el seguimiento y los informes de ventas.",
          ],
        },
        {
          title: "Coordinador de Soporte de Ventas",
          company: "Global Solutions Corp.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé a un equipo de ventas que logró un aumento del 20% en los ingresos anuales por ventas.",
            "Gestioné consultas de clientes y proporcioné soluciones oportunas, resultando en una mejora del 15% en el tiempo de respuesta.",
            "Colaboré con equipos de marketing para alinear estrategias de ventas, contribuyendo a un lanzamiento exitoso de producto.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Especialista en Soporte de Ventas en su currículum?", answer: "Debe incluir habilidades relevantes, experiencia en ventas y logros medibles." },
      { question: "¿Cómo destacar mi currículum de Especialista en Soporte de Ventas?", answer: "Enfatiza tus logros y habilidades técnicas en el manejo de CRM y soporte al cliente." },
      { question: "¿Qué habilidades necesita un Especialista en Soporte de Ventas?", answer: "Habilidades en comunicación, gestión del tiempo y conocimiento profundo de los productos." },
    ],
  },
  "sales-support-representative": {
    slug: "representante-de-soporte-de-ventas",
    title: "Representante de Soporte de Ventas",
    keywords: ["currículum de representante de soporte de ventas", "CV de representante de soporte de ventas", "ejemplo currículum representante de soporte de ventas", "plantilla CV representante de soporte de ventas"],
    searchIntents: ["cómo escribir currículum de representante de soporte de ventas", "ejemplos currículum representante de soporte de ventas", "mejor formato CV representante de soporte de ventas"],
    topSkills: ["Servicio al Cliente", "Comunicación", "Resolución de Problemas", "Soporte de Ventas", "Ingreso de Datos", "Software CRM", "Gestión del Tiempo", "Colaboración en Equipo", "Orientación a Detalles", "Multitarea"],
    atsKeywords: ["soporte de ventas", "servicio al cliente", "CRM", "ingreso de datos", "habilidades de comunicación", "resolución de problemas", "trabajo en equipo", "procesos de ventas", "procesamiento de pedidos", "gestión de relaciones con clientes", "gestión del tiempo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Soporte de Ventas",
      summary: "Representante de Soporte de Ventas dedicado con más de 5 años de experiencia en mejorar la satisfacción del cliente y apoyar a los equipos de ventas. Historial comprobado de aumentar la eficiencia de ventas en un 20% a través de mejoras efectivas en los procesos.",
      skills: ["Servicio al Cliente", "Comunicación", "Resolución de Problemas", "Soporte de Ventas", "Ingreso de Datos", "Software CRM", "Gestión del Tiempo", "Colaboración en Equipo", "Orientación a Detalles", "Multitarea"],
      experience: [
        {
          title: "Representante Senior de Soporte de Ventas",
          company: "Global Tech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró las puntuaciones de satisfacción del cliente en un 30% a través de procesos de soporte mejorados.",
            "Racionalizó el procesamiento de pedidos, lo que redujo el tiempo de entrega en un 15%.",
            "Entrenó y mentoreó a nuevos miembros del equipo, logrando una mejora del 25% en la eficiencia de integración.",
          ],
        },
        {
          title: "Asociado de Soporte de Ventas",
          company: "Innovative Retail Corp",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Ayudó a lograr un aumento de ventas de $500K anuales.",
            "Gestionó consultas de clientes y resolvió problemas, manteniendo una calificación de satisfacción del 95%.",
            "Colaboró con el equipo de ventas para mejorar la precisión de los informes, reduciendo errores en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Support Professional", issuer: "Sales Support Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Support Representative en su currículum?", answer: "Debe incluir habilidades relevantes, experiencia laboral y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Sales Support Representative?", answer: "Enfatiza tus logros en el soporte al cliente y tu capacidad para trabajar en equipo." },
      { question: "¿Qué habilidades necesita un Sales Support Representative?", answer: "Habilidades clave incluyen servicio al cliente, comunicación efectiva y gestión del tiempo." },
    ],
  },
  "sales-trainee": {
    slug: "ventas-trainee",
    title: "Practicante de Ventas",
    keywords: ["currículum de practicante de ventas", "CV de practicante de ventas", "ejemplo currículum practicante de ventas", "plantilla CV practicante de ventas"],
    searchIntents: ["cómo escribir currículum de practicante de ventas", "ejemplos currículum practicante de ventas", "mejor formato CV practicante de ventas"],
    topSkills: ["Comunicación", "Negociación", "Gestión de Relaciones con Clientes", "Generación de Leads", "Investigación de Mercado", "Estrategia de Ventas", "Análisis de Datos", "Colaboración en Equipo", "Gestión del Tiempo", "Adaptabilidad"],
    atsKeywords: ["ventas", "practicante", "servicio al cliente", "liderazgo", "negociación", "comunicación", "CRM", "análisis de mercado", "desarrollo de negocios", "estrategia de ventas", "orientado a objetivos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Ventas",
      summary: "Practicante de ventas entusiasta con 2 años de experiencia en servicio al cliente y un historial comprobado de aumento de ventas del 20% a través de habilidades efectivas de comunicación y negociación.",
      skills: ["Comunicación", "Negociación", "Gestión de Relaciones con Clientes", "Generación de Leads", "Investigación de Mercado", "Estrategia de Ventas", "Análisis de Datos", "Colaboración en Equipo", "Gestión del Tiempo", "Adaptabilidad"],
      experience: [
        {
          title: "Asociado de Ventas",
          company: "Target",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 25% en el segundo trimestre de 2023 a través de técnicas estratégicas de upselling.",
            "Logré ser el mejor asociado de ventas durante tres meses consecutivos.",
            "Gestioné exitosamente cuentas de clientes, mejorando las tasas de retención en un 15%.",
          ],
        },
        {
          title: "Practicante de Ventas",
          company: "Best Buy",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Ayudé a aumentar el tráfico peatonal en un 30% durante eventos promocionales.",
            "Realicé investigaciones de mercado que informaron estrategias de colocación de productos.",
            "Colaboré con el equipo de ventas para lograr un aumento del 10% en las ventas trimestrales.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sales Trainee en su currículum?", answer: "Un Sales Trainee debe incluir habilidades de comunicación, experiencia en servicio al cliente y logros cuantificables en ventas." },
      { question: "¿Cómo destacar mi currículum de Sales Trainee?", answer: "Destaca tus logros específicos en ventas y habilidades relevantes, y utiliza palabras clave que coincidan con la descripción del trabajo." },
      { question: "¿Qué habilidades necesita un Sales Trainee?", answer: "Un Sales Trainee necesita habilidades de comunicación, negociación, gestión de relaciones con clientes y capacidad para trabajar en equipo." },
    ],
  },
  "sap-inside-sales-manager": {
    slug: "sap-inside-sales-manager",
    title: "Gerente de Ventas Internas SAP",
    keywords: ["currículum de Gerente de Ventas Internas SAP", "CV de Gerente de Ventas Internas SAP", "ejemplo currículum Gerente de Ventas Internas SAP", "plantilla CV Gerente de Ventas Internas SAP"],
    searchIntents: ["cómo escribir currículum de Gerente de Ventas Internas SAP", "ejemplos currículum Gerente de Ventas Internas SAP", "mejor formato CV Gerente de Ventas Internas SAP"],
    topSkills: ["Estrategia de Ventas", "Gestión de CRM", "Generación de Leads", "Pronóstico de Ventas", "Compromiso del Cliente", "Negociación", "Liderazgo de Equipo", "Análisis de Datos", "Gestión de Cuentas", "Investigación de Mercado"],
    atsKeywords: ["SAP", "Ventas Internas", "Gerente de Ventas", "CRM", "Estrategia de Ventas", "Generación de Leads", "KPIs", "Gestión de Relaciones con Clientes", "Proceso de Ventas", "Desarrollo de Ventas", "Desarrollo de Negocios"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Ventas Internas SAP",
      summary: "Gerente de Ventas Internas SAP dinámico con más de 7 años de experiencia en impulsar el crecimiento de ventas y establecer relaciones sólidas con los clientes. Logró un aumento del 30% en los ingresos por ventas año tras año.",
      skills: ["Estrategia de Ventas", "Gestión de CRM", "Generación de Leads", "Pronóstico de Ventas", "Compromiso del Cliente", "Negociación", "Liderazgo de Equipo", "Análisis de Datos", "Gestión de Cuentas", "Investigación de Mercado"],
      experience: [
        {
          title: "Gerente Senior de Ventas Internas",
          company: "SAP America, Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 40% en el primer año a través de iniciativas estratégicas de generación de leads y compromiso del cliente.",
            "Desarrollé un nuevo programa de capacitación para representantes de ventas que mejoró las tasas de cierre en un 25%.",
            "Implementé herramientas de análisis de datos que identificaron tendencias clave del mercado, resultando en un aumento del 15% en las puntuaciones de satisfacción del cliente.",
          ],
        },
        {
          title: "Representante de Ventas Internas",
          company: "Oracle Corporation",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Superé consistentemente los objetivos de ventas trimestrales en un promedio del 20%.",
            "Desempeñé un papel clave en el lanzamiento de una nueva línea de productos que generó $3M en ventas dentro de los primeros seis meses.",
            "Establecí relaciones sólidas con clientes clave, resultando en un aumento del 50% en el negocio recurrente.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Inside Sales Professional", issuer: "AA-ISP", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un SAP Inside Sales Manager en su currículum?", answer: "Incluya experiencia en ventas, habilidades en gestión de relaciones con clientes y logros cuantificables en ventas." },
      { question: "¿Cómo destacar mi currículum de SAP Inside Sales Manager?", answer: "Utilice palabras clave relevantes y destaque logros específicos que demuestren su capacidad para generar ventas." },
      { question: "¿Qué habilidades necesita un SAP Inside Sales Manager?", answer: "Habilidades en estrategia de ventas, gestión de CRM, negociación, y liderazgo son esenciales." },
    ],
  },
  "smartbug-media-business-development-representative": {
    slug: "smartbug-media-business-development-representative",
    title: "Representante de Desarrollo de Negocios en Smartbug Media",
    keywords: ["currículum de Representante de Desarrollo de Negocios", "CV de Representante de Desarrollo de Negocios", "ejemplo currículum Representante de Desarrollo de Negocios", "plantilla CV Representante de Desarrollo de Negocios"],
    searchIntents: ["cómo escribir currículum de Representante de Desarrollo de Negocios", "ejemplos currículum Representante de Desarrollo de Negocios", "mejor formato CV Representante de Desarrollo de Negocios"],
    topSkills: ["generación de leads", "estrategia de ventas", "gestión de relaciones con clientes", "negociación", "investigación de mercado", "software CRM", "comunicación", "habilidades de presentación", "gestión del tiempo", "colaboración en equipo"],
    atsKeywords: ["desarrollo de negocios", "embudo de ventas", "compromiso del cliente", "prospectar", "salesforce", "ventas B2B", "calificación de leads", "informes de ventas", "gestión de cuentas", "crecimiento de ingresos", "retención de clientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Desarrollo de Negocios en Smartbug Media",
      summary: "Representante de Desarrollo de Negocios dinámico con más de 5 años de experiencia en impulsar el crecimiento de ventas y mejorar las relaciones con los clientes. Alcancé un aumento del 30% en los ingresos a través de estrategias de generación de leads dirigidas.",
      skills: ["generación de leads", "estrategia de ventas", "gestión de relaciones con clientes", "negociación", "investigación de mercado", "software CRM", "comunicación", "habilidades de presentación", "gestión del tiempo", "colaboración en equipo"],
      experience: [
        {
          title: "Representante Senior de Desarrollo de Negocios",
          company: "HubSpot",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la adquisición de clientes en un 40% en un año, contribuyendo a $500,000 en nuevos ingresos.",
            "Gestioné con éxito un embudo de más de 200 leads, resultando en una tasa de conversión del 25%.",
            "Desarrollé e implementé estrategias de ventas que mejoraron el rendimiento del equipo en un 15%.",
          ],
        },
        {
          title: "Representante de Desarrollo de Negocios",
          company: "Salesforce",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Generé más de $300,000 en ventas a través de prospectar de manera efectiva y construir relaciones.",
            "Colaboré con el equipo de marketing para lanzar una exitosa campaña de generación de leads, aumentando los leads en un 20%.",
            "Alcancé el estatus de mejor desempeño en el cuarto trimestre de 2020 al superar los objetivos de ventas en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Business Development Expert", issuer: "Business Development Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Smartbug Media Business Development Representative en su currículum?", answer: "Un Smartbug Media Business Development Representative debe incluir su experiencia en generación de leads, estrategias de ventas, y gestión de relaciones con clientes." },
      { question: "¿Cómo destacar mi currículum de Smartbug Media Business Development Representative?", answer: "Para destacar su currículum, enfoque en logros cuantificables y habilidades relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Smartbug Media Business Development Representative?", answer: "Las habilidades clave incluyen generación de leads, negociación, y manejo de software CRM." },
    ],
  },
  "solar-pvs-business-development-engineer": {
    slug: "ingeniero-desarrollo-negocios-solar-pv",
    title: "Ingeniero de Desarrollo de Negocios en Energía Solar PV",
    keywords: ["currículum de ingeniero de desarrollo de negocios solar PV", "CV de ingeniero de desarrollo de negocios solar PV", "ejemplo currículum ingeniero de desarrollo de negocios solar PV", "plantilla CV ingeniero de desarrollo de negocios solar PV"],
    searchIntents: ["cómo escribir currículum de ingeniero de desarrollo de negocios solar PV", "ejemplos currículum ingeniero de desarrollo de negocios solar PV", "mejor formato CV ingeniero de desarrollo de negocios solar PV"],
    topSkills: ["Gestión de Proyectos", "Análisis de Mercado", "Estrategias de Ventas", "Experticia Técnica", "Gestión de Relaciones con Clientes", "Políticas de Energía Renovable", "Modelado Financiero", "Habilidades de Negociación", "Análisis de Datos", "Habilidades de Presentación"],
    atsKeywords: ["energía solar", "desarrollo de negocios", "fotovoltaicos", "energía renovable", "eficiencia energética", "investigación de mercado", "pronóstico de ventas", "adquisición de clientes", "desarrollo de alianzas", "negociación de contratos", "financiamiento de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Desarrollo de Negocios en Energía Solar PV",
      summary: "Ingeniero de Desarrollo de Negocios dinámico con más de 5 años de experiencia en el sector de energía solar, logrando un incremento del 25% en las adquisiciones de clientes y generando $2M en nuevos ingresos comerciales.",
      skills: ["Gestión de Proyectos", "Análisis de Mercado", "Estrategias de Ventas", "Experticia Técnica", "Gestión de Relaciones con Clientes", "Políticas de Energía Renovable", "Modelado Financiero", "Habilidades de Negociación", "Análisis de Datos", "Habilidades de Presentación"],
      experience: [
        {
          title: "Ingeniero Senior de Desarrollo de Negocios",
          company: "SunPower Corporation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la adquisición de clientes en un 25%, lo que resultó en $2M en ingresos anuales.",
            "Lideré un equipo multifuncional para desarrollar y lanzar 3 nuevos proyectos solares, aumentando la cuota de mercado en un 15%.",
            "Implementé un ciclo de retroalimentación de clientes que mejoró las calificaciones de satisfacción del servicio en un 30%.",
          ],
        },
        {
          title: "Ingeniero de Desarrollo de Negocios",
          company: "First Solar",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Aseguré contratos por un valor de $1.5M a través de alianzas estratégicas y negociaciones.",
            "Realicé un análisis de mercado que identificó 5 nuevas oportunidades de negocio en mercados emergentes.",
            "Desarrollé y presenté propuestas que ganaron licitaciones para 10 instalaciones solares.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Ambiental", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Renewable Energy Professional", issuer: "Association of Energy Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Desarrollo de Negocios en Energía Solar PV en su currículum?", answer: "Un ingeniero de desarrollo de negocios en energía solar PV debe incluir experiencia en gestión de proyectos, análisis de mercado y habilidades de negociación." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Desarrollo de Negocios en Energía Solar PV?", answer: "Enfatiza tus logros cuantificables y tu experiencia en el sector de energía renovable." },
      { question: "¿Qué habilidades necesita un Ingeniero de Desarrollo de Negocios en Energía Solar PV?", answer: "Habilidades clave incluyen gestión de proyectos, análisis de mercado, y técnicas de ventas efectivas." },
    ],
  },
  "sprint-sales-consultant": {
    slug: "consultor-de-ventas-sprint",
    title: "Consultor de Ventas Sprint",
    keywords: ["currículum de consultor de ventas", "CV de consultor de ventas", "ejemplo currículum consultor de ventas", "plantilla CV consultor de ventas"],
    searchIntents: ["cómo escribir currículum de consultor de ventas", "ejemplos currículum consultor de ventas", "mejor formato CV consultor de ventas"],
    topSkills: ["Estrategia de Ventas", "Gestión de Relación con Clientes", "Negociación", "Análisis de Mercado", "Conocimiento del Producto", "Generación de Leads", "Pronóstico de Ventas", "Colaboración en Equipo", "Gestión del Tiempo", "Comunicación"],
    atsKeywords: ["sales consultant", "customer service", "retail sales", "client engagement", "sales techniques", "performance metrics", "account management", "business development", "team leadership", "strategic selling", "product promotions"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Consultor de Ventas Sprint",
      summary: "Profesional de ventas dinámico con más de 5 años de experiencia en la industria de las telecomunicaciones, logrando un 120% de la meta de ventas en un mercado competitivo.",
      skills: ["Estrategia de Ventas", "Gestión de Relación con Clientes", "Negociación", "Análisis de Mercado", "Conocimiento del Producto", "Generación de Leads", "Pronóstico de Ventas", "Colaboración en Equipo", "Gestión del Tiempo", "Comunicación"],
      experience: [
        {
          title: "Consultor de Ventas Senior",
          company: "Sprint Corporation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas regionales en un 30% en un año, contribuyendo a un crecimiento total de ingresos de $1.2 millones.",
            "Gestioné con éxito un equipo de 5 asociados de ventas, mejorando los indicadores de rendimiento del equipo en un 25%.",
            "Desarrollé e implementé una estrategia de compromiso con el cliente que mejoró las tasas de retención de clientes en un 15%.",
          ],
        },
        {
          title: "Consultor de Ventas",
          company: "T-Mobile USA",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Alcancé el 150% de los objetivos de ventas trimestrales de manera constante durante 10 trimestres.",
            "Reconocido como 'Mejor Vendedor' durante 3 años consecutivos.",
            "Lideré una campaña promocional que aumentó las adquisiciones de nuevos clientes en un 40%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Sales Professional", issuer: "Sales Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Sprint Sales Consultant en su currículum?", answer: "Debe incluir experiencia en ventas, habilidades de negociación y gestión de clientes." },
      { question: "¿Cómo destacar mi currículum de Sprint Sales Consultant?", answer: "Asegúrese de resaltar sus logros en ventas y habilidades clave." },
      { question: "¿Qué habilidades necesita un Sprint Sales Consultant?", answer: "Necesita habilidades en estrategia de ventas, gestión de relaciones con clientes y comunicación efectiva." },
    ],
  }
};
