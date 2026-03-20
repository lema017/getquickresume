import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  "aba-therapist": {
    slug: "terapeuta-aba",
    title: "Terapeuta ABA",
    keywords: ["currículum de Terapeuta ABA", "CV de Terapeuta ABA", "ejemplo currículum Terapeuta ABA", "plantilla CV Terapeuta ABA"],
    searchIntents: ["cómo escribir currículum de Terapeuta ABA", "ejemplos currículum Terapeuta ABA", "mejor formato CV Terapeuta ABA"],
    topSkills: ["Análisis del Comportamiento Aplicado", "Recopilación de Datos", "Intervención en Comportamiento", "Habilidades de Comunicación", "Resolución de Problemas", "Colaboración", "Manejo de Pacientes", "Entrenamiento a Padres", "Intervención en Crisis", "Documentación"],
    atsKeywords: ["ABA", "terapia de comportamiento", "trastorno del espectro autista", "habilidades clínicas", "evaluaciones conductuales", "planes de tratamiento", "prácticas basadas en evidencia", "estrategias de intervención", "colaboración en equipo", "monitoreo de progreso", "abogacía del paciente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Terapeuta ABA",
      summary: "Terapeuta ABA dedicado con más de 5 años de experiencia brindando apoyo terapéutico a niños con autismo. Mejoró con éxito el comportamiento de los clientes en un 30% a través de estrategias de intervención personalizadas.",
      skills: ["Análisis del Comportamiento Aplicado", "Recopilación de Datos", "Intervención en Comportamiento", "Habilidades de Comunicación", "Resolución de Problemas", "Colaboración", "Manejo de Pacientes", "Entrenamiento a Padres", "Intervención en Crisis", "Documentación"],
      experience: [
        {
          title: "Terapeuta ABA Senior",
          company: "Bright Futures Therapy",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la participación de los clientes en un 40% mediante estrategias de ABA personalizadas.",
            "Redució con éxito los comportamientos disruptivos en los clientes en un 25% en 6 meses.",
            "Entrenó y asesoró a un equipo de 5 nuevos terapeutas, mejorando el rendimiento general del equipo.",
          ],
        },
        {
          title: "Terapeuta ABA",
          company: "Therapeutic Innovations",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló planes de tratamiento individualizados para más de 30 clientes.",
            "Facilitó sesiones de entrenamiento para padres que resultaron en una mejora del 20% en el manejo del comportamiento en casa.",
            "Realizó evaluaciones que llevaron a un aumento del 15% en la efectividad de la terapia.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura en Psicología", field: "Psicología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Board Certified Behavior Analyst (BCBA)", issuer: "Behavior Analyst Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Terapeuta ABA en su currículum?", answer: "Incluir experiencia relevante, habilidades específicas como Análisis del Comportamiento Aplicado y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Terapeuta ABA?", answer: "Utilizar un formato claro, resaltar logros y personalizar el currículum para cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Terapeuta ABA?", answer: "Habilidades de comunicación, resolución de problemas, manejo de crisis y conocimiento en técnicas de intervención conductual." },
    ],
  },
  "addiction-counselor": {
    slug: "consejero-de-adicciones",
    title: "Consejero de Adicciones",
    keywords: ["currículum de consejero de adicciones", "CV de consejero de adicciones", "ejemplo currículum consejero de adicciones", "plantilla CV consejero de adicciones"],
    searchIntents: ["cómo escribir currículum de consejero de adicciones", "ejemplos currículum consejero de adicciones", "mejor formato CV consejero de adicciones"],
    topSkills: ["Técnicas de Consejería", "Intervención en Crisis", "Evaluación de Abuso de Sustancias", "Prevención de Recaídas", "Facilitación de Terapia Grupal", "Entrevista Motivacional", "Manejo de Casos", "Terapia Cognitivo-Conductual", "Competencia Cultural", "Toma de Decisiones Éticas"],
    atsKeywords: ["tratamiento de adicciones", "abuso de sustancias", "salud conductual", "terapia", "evaluación de clientes", "planificación de recuperación", "consejería de apoyo", "salud mental", "consejería grupal", "manejo de crisis", "consejería individual"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Consejero de Adicciones",
      summary: "Consejero de Adicciones dedicado con más de 5 años de experiencia en tratamiento de abuso de sustancias y apoyo a la recuperación. Ha facilitado con éxito programas de recuperación que aumentaron la retención de clientes en un 30% y mejoraron el bienestar general.",
      skills: ["Técnicas de Consejería", "Intervención en Crisis", "Evaluación de Abuso de Sustancias", "Prevención de Recaídas", "Facilitación de Terapia Grupal", "Entrevista Motivacional", "Manejo de Casos", "Terapia Cognitivo-Conductual", "Competencia Cultural", "Toma de Decisiones Éticas"],
      experience: [
        {
          title: "Consejero de Adicciones Senior",
          company: "Hope Recovery Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo proceso de evaluación de clientes que mejoró la precisión en un 25%.",
            "Facilité sesiones de terapia grupal con un aumento promedio de asistencia del 40%.",
            "Desarrollé y dirigí talleres de capacitación para el personal, mejorando la efectividad del equipo.",
          ],
        },
        {
          title: "Consejero de Adicciones",
          company: "Beacon Health Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné consejería individual a más de 100 clientes con una tasa de éxito del 70% en el logro de objetivos de recuperación.",
            "Coordiné programas de alcance comunitario que alcanzaron a más de 500 personas.",
            "Ayudé en el desarrollo de un programa de apoyo entre pares que fomentó el compromiso de los clientes.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Psicología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Addiction Counselor (CAC)", issuer: "National Certification Commission for Addiction Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Consejero de Adicciones en su currículum?", answer: "Un Consejero de Adicciones debe incluir su experiencia laboral relevante, habilidades específicas, certificaciones obtenidas, y cualquier formación académica relacionada con el campo." },
      { question: "¿Cómo destacar mi currículum de Consejero de Adicciones?", answer: "Para destacar su currículum, enfatice sus logros cuantificables, utilice palabras clave relevantes para la industria y adapte su currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Consejero de Adicciones?", answer: "Un Consejero de Adicciones necesita habilidades en consejería, intervención en crisis, evaluación de abuso de sustancias, y una fuerte competencia cultural, entre otras." },
    ],
  },
  "art-therapist": {
    slug: "art-terapeuta",
    title: "Art Terapeuta",
    keywords: ["currículum de Art Terapeuta", "CV de Art Terapeuta", "ejemplo currículum Art Terapeuta", "plantilla CV Art Terapeuta"],
    searchIntents: ["cómo escribir currículum de Art Terapeuta", "ejemplos currículum Art Terapeuta", "mejor formato CV Art Terapeuta"],
    topSkills: ["Expresión Artística", "Técnicas Terapéuticas", "Evaluación de Clientes", "Empatía", "Comunicación", "Intervención en Crisis", "Facilitación de Grupos", "Sensibilidad Cultural", "Resolución Creativa de Problemas", "Análisis Conductual"],
    atsKeywords: ["art therapy", "mental health", "creative arts therapy", "psychotherapy", "counseling", "child development", "expressive arts", "trauma-informed care", "patient care", "client engagement", "rehabilitation"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Art Terapeuta",
      summary: "Art Terapeuta dedicada con más de 5 años de experiencia en mejorar el bienestar emocional y psicológico a través de la expresión creativa. Aumentó con éxito la participación de los clientes en un 30% a través de programas de terapia innovadores.",
      skills: ["Expresión Artística", "Técnicas Terapéuticas", "Evaluación de Clientes", "Empatía", "Comunicación", "Intervención en Crisis", "Facilitación de Grupos", "Sensibilidad Cultural", "Resolución Creativa de Problemas", "Análisis Conductual"],
      experience: [
        {
          title: "Terapeuta de Arte Senior",
          company: "Creative Minds Therapy Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 40% a través de sesiones de terapia personalizadas.",
            "Facilité más de 200 sesiones de terapia grupal, impactando a más de 500 individuos.",
            "Desarrollé un programa de terapia artística que redujo los niveles de ansiedad en los clientes en un 25%.",
          ],
        },
        {
          title: "Art Terapeuta",
          company: "Healing Arts Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé una nueva herramienta de evaluación que mejoró la precisión del diagnóstico en un 20%.",
            "Lideré talleres de terapia artística que condujeron a un aumento del 15% en la participación comunitaria.",
            "Colaboré con equipos multidisciplinarios para mejorar los planes de atención al paciente.",
          ],
        },
      ],
      education: [
        { institution: "University of the Arts", degree: "B.S.", field: "Terapia Artística", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Registered Art Therapist", issuer: "Art Therapy Credentials Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Art Terapeuta en su currículum?", answer: "Un Art Terapeuta debe incluir su experiencia en terapia artística, habilidades interpersonales, y cualquier certificación pertinente." },
      { question: "¿Cómo destacar mi currículum de Art Terapeuta?", answer: "Utiliza un formato claro, resalta tus logros y personaliza tu currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Art Terapeuta?", answer: "Un Art Terapeuta necesita habilidades en expresión artística, técnicas terapéuticas, empatía y comunicación efectiva." },
    ],
  },
  "auburn-university-graduate-teaching-assistant": {
    slug: "asistente-de-enseñanza-graduado-auburn-university",
    title: "Asistente de Enseñanza Graduado de Auburn University",
    keywords: ["currículum de Asistente de Enseñanza Graduado", "CV de Asistente de Enseñanza Graduado", "ejemplo currículum Asistente de Enseñanza Graduado", "plantilla CV Asistente de Enseñanza Graduado"],
    searchIntents: ["cómo escribir currículum de Asistente de Enseñanza Graduado", "ejemplos currículum Asistente de Enseñanza Graduado", "mejor formato CV Asistente de Enseñanza Graduado"],
    topSkills: ["Asistencia en la Enseñanza", "Desarrollo de Currículo", "Compromiso Estudiantil", "Apoyo a la Investigación", "Análisis de Datos", "Oratoria", "Redacción Académica", "Gestión del Tiempo", "Resolución de Conflictos", "Colaboración en Equipo"],
    atsKeywords: ["Asistente de Enseñanza Graduado", "Asistente de Enseñanza", "Apoyo Académico", "Educación Superior", "Mentoría Estudiantil", "Coordinación de Cursos", "Evaluación y Valoración", "Apoyo Instruccional", "Asistencia en Investigación", "Planificación de Lecciones", "Tecnología Educativa"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Enseñanza Graduado de Auburn University",
      summary: "Asistente de Enseñanza Graduado dedicado con más de 3 años de experiencia en educación superior, mejorando exitosamente el compromiso estudiantil en un 30% y asistiendo en proyectos de investigación que contribuyeron con $50,000 en financiamiento de subvenciones.",
      skills: ["Asistencia en la Enseñanza", "Desarrollo de Currículo", "Compromiso Estudiantil", "Apoyo a la Investigación", "Análisis de Datos", "Oratoria", "Redacción Académica", "Gestión del Tiempo", "Resolución de Conflictos", "Colaboración en Equipo"],
      experience: [
        {
          title: "Asistente de Enseñanza Graduado",
          company: "Auburn University",
          startDate: "2021-08",
          isCurrent: true,
          achievements: [
            "Aumenté la participación estudiantil en discusiones en un 40% mediante métodos de enseñanza innovadores.",
            "Desarrollé materiales suplementarios que mejoraron las calificaciones generales del curso en un 15%.",
            "Facilité talleres de investigación que llevaron a 10 publicaciones de estudiantes en revistas académicas.",
          ],
        },
        {
          title: "Asistente de Enseñanza",
          company: "University of Alabama",
          startDate: "2018-06",
          endDate: "2021-07",
          achievements: [
            "Asistí en la entrega de 5 cursos de pregrado con una calificación promedio de los estudiantes de 4.8/5.",
            "Coordiné sesiones de tutoría que aumentaron las calificaciones de exámenes de los estudiantes en un promedio del 20%.",
            "Creé planes de lecciones atractivos que se alinearon con los objetivos del currículo.",
          ],
        },
      ],
      education: [
        { institution: "Auburn University", degree: "M.S.", field: "Psicología Educativa", startDate: "2020-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Teaching Certificate", issuer: "Auburn University", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Enseñanza Graduado de Auburn University en su currículum?", answer: "Incluir experiencia relevante, logros destacados y habilidades específicas que se alineen con el puesto." },
      { question: "¿Cómo destacar mi currículum de Asistente de Enseñanza Graduado de Auburn University?", answer: "Utilizar palabras clave del sector, destacar logros cuantificables y personalizar el CV para cada aplicación." },
      { question: "¿Qué habilidades necesita un Asistente de Enseñanza Graduado de Auburn University?", answer: "Habilidades de enseñanza, análisis de datos, gestión del tiempo y capacidad de colaboración son esenciales." },
    ],
  },
  "behavioral-therapist-excite-steps": {
    slug: "curriculum-terapeuta-conductual",
    title: "Currículum de Terapeuta Conductual",
    keywords: ["currículum de terapeuta conductual", "CV de terapeuta conductual", "ejemplo currículum terapeuta conductual", "plantilla CV terapeuta conductual"],
    searchIntents: ["cómo escribir currículum de terapeuta conductual", "ejemplos currículum terapeuta conductual", "mejor formato CV terapeuta conductual"],
    topSkills: ["Terapia Cognitivo Conductual", "Análisis de Comportamiento Aplicado", "Técnicas de Consejería", "Intervención en Crisis", "Evaluación Conductual", "Entrenamiento a Padres", "Desarrollo de Habilidades Sociales", "Regulación Emocional", "Habilidades de Comunicación", "Análisis de Datos"],
    atsKeywords: ["terapia", "salud conductual", "salud mental", "cuidado del paciente", "diagnóstico", "planificación del tratamiento", "estrategias de intervención", "psicoterapia", "experiencia clínica", "notas de progreso", "colaboración"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Terapeuta Conductual",
      summary: "Terapeuta Conductual dedicada con más de 5 años de experiencia en proporcionar terapia e intervenciones efectivas para niños con problemas de comportamiento, logrando una tasa de mejora del 95% en los resultados de los clientes.",
      skills: ["Terapia Cognitivo Conductual", "Análisis de Comportamiento Aplicado", "Técnicas de Consejería", "Intervención en Crisis", "Evaluación Conductual", "Entrenamiento a Padres", "Desarrollo de Habilidades Sociales", "Regulación Emocional", "Habilidades de Comunicación", "Análisis de Datos"],
      experience: [
        {
          title: "Terapeuta Conductual Senior",
          company: "Hope Behavioral Health Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo programa de terapia que aumentó la participación de los clientes en un 40%.",
            "Lideré un equipo que redujo los incidentes de comportamiento de los clientes en un 30% en un año.",
            "Desarrollé planes de tratamiento individualizados que resultaron en una tasa de satisfacción del 95% entre los clientes.",
          ],
        },
        {
          title: "Terapeuta Conductual",
          company: "Caring Hands Therapy Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné terapia a más de 100 clientes, logrando mejoras conductuales significativas en el 85% de los casos.",
            "Realicé talleres para padres, resultando en un aumento del 50% en el apoyo en casa para estrategias conductuales.",
            "Colaboré con educadores para diseñar e implementar intervenciones conductuales en las escuelas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Psicología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Behavioral Therapist", issuer: "National Board for Certified Counselors", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Terapeuta Conductual?", answer: "Un currículum de Terapeuta Conductual debe incluir experiencia relevante, habilidades específicas, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Terapeuta Conductual?", answer: "Resaltar logros cuantificables y experiencia práctica en el campo puede ayudar a destacar su currículum." },
      { question: "¿Qué habilidades necesita un Terapeuta Conductual?", answer: "Un Terapeuta Conductual necesita habilidades en terapia cognitivo conductual, análisis de comportamiento, y técnicas de consejería." },
    ],
  },
  "biomedical-equipment-technician": {
    slug: "tecnico-de-equipos-biomedicos",
    title: "Técnico de Equipos Biomédicos",
    keywords: ["currículum de técnico de equipos biomédicos", "CV de técnico de equipos biomédicos", "ejemplo currículum técnico de equipos biomédicos", "plantilla CV técnico de equipos biomédicos"],
    searchIntents: ["cómo escribir currículum de técnico de equipos biomédicos", "ejemplos currículum técnico de equipos biomédicos", "mejor formato CV técnico de equipos biomédicos"],
    topSkills: ["Reparación de Equipos Médicos", "Mantenimiento Preventivo", "Resolución Técnica de Problemas", "Cumplimiento Normativo", "Calibración y Pruebas", "Habilidades de Documentación", "Servicio al Cliente", "Seguridad Eléctrica", "Resolución de Problemas", "Colaboración en Equipo"],
    atsKeywords: ["biomedico", "tecnico de equipos", "reparacion", "mantenimiento", "dispositivos medicos", "resolucion de problemas", "calibracion", "cumplimiento", "seguridad", "documentacion", "servicio al cliente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico de Equipos Biomédicos",
      summary: "Técnico de Equipos Biomédicos con más de 5 años de experiencia en el mantenimiento y reparación de equipos médicos. Reduje exitosamente el tiempo de inactividad de los equipos en un 30% a través de programas efectivos de mantenimiento preventivo.",
      skills: ["Reparación de Equipos Médicos", "Mantenimiento Preventivo", "Resolución Técnica de Problemas", "Cumplimiento Normativo", "Calibración y Pruebas", "Habilidades de Documentación", "Servicio al Cliente", "Seguridad Eléctrica", "Resolución de Problemas", "Colaboración en Equipo"],
      experience: [
        {
          title: "Técnico Superior en Equipos Biomédicos",
          company: "MedTech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje el tiempo de inactividad de los equipos en un 30% mediante la programación estratégica de mantenimiento.",
            "Entrené a 5 técnicos junior en protocolos de reparación de equipos, mejorando la eficiencia del equipo.",
            "Alcancé una tasa de cumplimiento del 95% durante las inspecciones regulatorias.",
          ],
        },
        {
          title: "Técnico de Equipos Biomédicos",
          company: "HealthCare Innovations",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve más de 150 dispositivos médicos con una calificación de satisfacción del 98% por parte del personal clínico.",
            "Implementé un nuevo sistema de seguimiento que mejoró la gestión de inventarios en un 25%.",
            "Asistí en la instalación de nuevo equipo de MRI, asegurando el cumplimiento de las normas de seguridad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ingeniería Biomédica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Biomedical Equipment Technician (CBET)", issuer: "AAMI", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico de Equipos Biomédicos en su currículum?", answer: "Debe incluir experiencia en reparación y mantenimiento de equipos, habilidades técnicas y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Técnico de Equipos Biomédicos?", answer: "Enfatiza tus logros cuantificables y habilidades técnicas relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Técnico de Equipos Biomédicos?", answer: "Necesita habilidades en reparación de equipos, mantenimiento preventivo, y un buen conocimiento de normativas de seguridad." },
    ],
  },
  "business-administration-intern-bupa": {
    slug: "practicas-en-administracion-de-negocios",
    title: "Practicante en Administración de Negocios",
    keywords: ["currículum de practicante en administración de negocios", "CV de practicante en administración de negocios", "ejemplo currículum practicante en administración de negocios", "plantilla CV practicante en administración de negocios"],
    searchIntents: ["cómo escribir currículum de practicante en administración de negocios", "ejemplos currículum practicante en administración de negocios", "mejor formato CV practicante en administración de negocios"],
    topSkills: ["Pensamiento Analítico", "Gestión de Proyectos", "Análisis de Datos", "Comunicación", "Resolución de Problemas", "Colaboración en Equipo", "Gestión del Tiempo", "Habilidades de Investigación", "Servicio al Cliente", "Habilidades de Presentación"],
    atsKeywords: ["estrategia empresarial", "análisis financiero", "investigación de mercado", "compromiso de partes interesadas", "informes", "presupuestación", "coordinación de proyectos", "visualización de datos", "software CRM", "Excel", "PowerPoint"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante en Administración de Negocios",
      summary: "Practicante en Administración de Negocios orientado a los detalles con 2 años de experiencia en gestión de proyectos y análisis de datos, contribuyendo a un aumento del 15% en la eficiencia operativa a través de la optimización de procesos.",
      skills: ["Pensamiento Analítico", "Gestión de Proyectos", "Análisis de Datos", "Comunicación", "Resolución de Problemas", "Colaboración en Equipo", "Gestión del Tiempo", "Habilidades de Investigación", "Servicio al Cliente", "Habilidades de Presentación"],
      experience: [
        {
          title: "Practicante en Administración de Negocios",
          company: "Bupa",
          startDate: "2023-06",
          isCurrent: true,
          achievements: [
            "Asistí en el desarrollo de un nuevo protocolo de servicio al cliente que mejoró las calificaciones de satisfacción del cliente en un 20%.",
            "Realicé investigaciones de mercado que llevaron a un informe estratégico que identificó 3 nuevas oportunidades de negocio.",
            "Optimicé el proceso de informes, reduciendo el tiempo de preparación en un 30%.",
          ],
        },
        {
          title: "Asistente Administrativo",
          company: "Tech Solutions Inc.",
          startDate: "2021-01",
          endDate: "2023-05",
          achievements: [
            "Apoyé a un equipo de 10 en esfuerzos de gestión de proyectos, aumentando la velocidad de entrega de proyectos en un 25%.",
            "Implementé un nuevo sistema de archivo que mejoró el tiempo de recuperación de documentos en un 40%.",
            "Coordiné 5 eventos empresariales a gran escala, mejorando la cohesión y comunicación del equipo.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Negocios", startDate: "2019-08", endDate: "2023-05" },
      ],
      certifications: [
        { name: "Certified Business Analysis Professional", issuer: "International Institute of Business Analysis", date: "2022-11" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Business Administration Intern en su currículum?", answer: "Un Business Administration Intern debe incluir experiencias relevantes, habilidades específicas relacionadas con la administración de negocios y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Business Administration Intern?", answer: "Para destacar su currículum, enfoque en resultados específicos de proyectos, use palabras clave de la industria y mantenga un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un Business Administration Intern?", answer: "Un Business Administration Intern necesita habilidades en análisis de datos, gestión de proyectos, comunicación efectiva y trabajo en equipo." },
    ],
  },
  "cardiac-nurse": {
    slug: "enfermera-cardiaca",
    title: "Enfermera Cardíaca",
    keywords: ["currículum de enfermera cardíaca", "CV de enfermera cardíaca", "ejemplo currículum enfermera cardíaca", "plantilla CV enfermera cardíaca"],
    searchIntents: ["cómo escribir currículum de enfermera cardíaca", "ejemplos currículum enfermera cardíaca", "mejor formato CV enfermera cardíaca"],
    topSkills: ["Interpretación de ECG", "Evaluación del paciente", "Manejo del cuidado cardíaco", "Pensamiento crítico", "Administración de medicamentos", "Educación del paciente", "Colaboración en equipo", "Gestión del tiempo", "Intervención en crisis", "Análisis de datos"],
    atsKeywords: ["Enfermería cardíaca", "Monitoreo de pacientes", "Manejo de enfermedades cardiovasculares", "Certificación en enfermería", "Certificación en RCP", "Certificación BLS", "Terapia IV", "Defensa del paciente", "Documentación clínica", "Registros de salud electrónicos", "Promoción de la salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera Cardíaca",
      summary: "Enfermera Cardíaca dedicada con más de 5 años de experiencia en el manejo de pacientes cardíacos críticos y logrando una reducción del 30% en el tiempo de recuperación de los pacientes a través de protocolos de atención efectivos.",
      skills: ["Interpretación de ECG", "Evaluación del paciente", "Manejo del cuidado cardíaco", "Pensamiento crítico", "Administración de medicamentos", "Educación del paciente", "Colaboración en equipo", "Gestión del tiempo", "Intervención en crisis", "Análisis de datos"],
      experience: [
        {
          title: "Enfermera Cardíaca Senior",
          company: "Heart Health Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró los índices de satisfacción del paciente en un 25% durante dos años mediante estrategias de compromiso del paciente.",
            "Redució las tasas de readmisión de emergencia en un 15% al implementar planes de cuidado de seguimiento rigurosos.",
            "Lideró un equipo en un proyecto de mejora de calidad que aumentó el cumplimiento de los protocolos cardíacos basados en evidencia en un 40%.",
          ],
        },
        {
          title: "Enfermera Cardíaca",
          company: "Cardiology Associates",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Manejé un promedio de 15 pacientes por turno mientras mantenía altos estándares de atención.",
            "Entrené exitosamente a 5 nuevas enfermeras sobre protocolos de cuidado cardíaco y manejo de pacientes.",
            "Contribuí a un aumento del 20% en la eficiencia del departamento al optimizar los procesos de trabajo.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Cardiac Nurse", issuer: "American Nurses Credentialing Center", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Cardiac Nurse en su currículum?", answer: "Incluir experiencia relevante, habilidades específicas y certificaciones en el área de cuidado cardíaco." },
      { question: "¿Cómo destacar mi currículum de Cardiac Nurse?", answer: "Resaltar logros cuantificables y habilidades especializadas en el cuidado cardíaco." },
      { question: "¿Qué habilidades necesita un Cardiac Nurse?", answer: "Habilidades en evaluación de pacientes, manejo de crisis y educación al paciente son clave." },
    ],
  },
  "cardiovascular-nurse": {
    slug: "enfermero-cardiovascular",
    title: "Enfermero Cardiovascular",
    keywords: ["currículum de enfermero cardiovascular", "CV de enfermero cardiovascular", "ejemplo currículum enfermero cardiovascular", "plantilla CV enfermero cardiovascular"],
    searchIntents: ["cómo escribir currículum de enfermero cardiovascular", "ejemplos currículum enfermero cardiovascular", "mejor formato CV enfermero cardiovascular"],
    topSkills: ["Evaluación del Paciente", "Monitoreo Cardíaco", "Administración de Medicamentos", "Educación del Paciente", "Pensamiento Crítico", "Respuesta a Emergencias", "Habilidades Interpersonales", "Colaboración en Equipo", "Gestión del Tiempo", "Documentación Clínica"],
    atsKeywords: ["Cardiología", "Enfermería", "Cuidado del Paciente", "Interpretación de ECG", "Rehabilitación Cardíaca", "Certificación BLS", "Certificación ACLS", "Monitoreo de Telemetría", "Evaluación de Enfermería", "Defensa del Paciente", "Trabajo en Equipo en Salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermero Cardiovascular",
      summary: "Enfermero Cardiovascular dedicado con más de 5 años de experiencia en cuidados cardíacos críticos, reconocido por mejorar los resultados de los pacientes en un 30% a través de planes de tratamiento efectivos.",
      skills: ["Evaluación del Paciente", "Monitoreo Cardíaco", "Administración de Medicamentos", "Educación del Paciente", "Pensamiento Crítico", "Respuesta a Emergencias", "Habilidades Interpersonales", "Colaboración en Equipo", "Gestión del Tiempo", "Documentación Clínica"],
      experience: [
        {
          title: "Enfermero Cardiovascular Senior",
          company: "Cleveland Heart Clinic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de recuperación de pacientes en un 25% a través de estrategias de atención mejoradas",
            "Manejé un equipo de 5 enfermeras, mejorando la eficiencia del departamento en un 40%",
            "Desarrollé programas de educación para pacientes que redujeron las tasas de readmisión en un 15%",
          ],
        },
        {
          title: "Enfermero Cardiovascular",
          company: "Mount Sinai Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné atención de alta calidad a más de 100 pacientes durante turnos nocturnos",
            "Colaboré con cardiólogos para desarrollar planes de tratamiento personalizados",
            "Participé en investigaciones que llevaron a una publicación sobre el manejo de enfermedades cardíacas",
          ],
        },
      ],
      education: [
        { institution: "University of Florida", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Cardiac Nurse", issuer: "American Nurses Credentialing Center", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Enfermero Cardiovascular en su currículum?", answer: "Un Enfermero Cardiovascular debe incluir su experiencia en cuidados cardíacos, certificaciones relevantes y habilidades clínicas específicas." },
      { question: "¿Cómo destacar mi currículum de Enfermero Cardiovascular?", answer: "Utilizar palabras clave relevantes, incluir logros cuantificables y personalizar el currículum para cada solicitud." },
      { question: "¿Qué habilidades necesita un Enfermero Cardiovascular?", answer: "Un Enfermero Cardiovascular necesita habilidades en evaluación del paciente, monitoreo cardíaco, y educación del paciente, entre otras." },
    ],
  },
  "certified-nurse-midwife": {
    slug: "certified-nurse-midwife",
    title: "Partera Enfermera Certificada",
    keywords: ["currículum de partera enfermera certificada", "CV de partera enfermera certificada", "ejemplo currículum partera enfermera certificada", "plantilla CV partera enfermera certificada"],
    searchIntents: ["cómo escribir currículum de partera enfermera certificada", "ejemplos currículum partera enfermera certificada", "mejor formato CV partera enfermera certificada"],
    topSkills: ["cuidado del paciente", "educación prenatal", "apoyo en el trabajo de parto", "cuidado neonatal", "evaluaciones de salud", "planificación familiar", "cuidado postparto", "comunicación", "respuesta a emergencias", "colaboración"],
    atsKeywords: ["Partera Enfermera Certificada", "partería", "defensa del paciente", "habilidades clínicas", "cuidado de la salud", "salud reproductiva", "salud pública", "salud de la mujer", "gestión de medicamentos", "evaluación de riesgos", "educación del paciente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Partera Enfermera Certificada",
      summary: "Partera Enfermera Certificada dedicada con más de 5 años de experiencia en proporcionar atención integral a mujeres durante su embarazo, trabajo de parto y período postparto, logrando una tasa de satisfacción del paciente del 95%.",
      skills: ["cuidado del paciente", "educación prenatal", "apoyo en el trabajo de parto", "cuidado neonatal", "evaluaciones de salud", "planificación familiar", "cuidado postparto", "comunicación", "respuesta a emergencias", "colaboración"],
      experience: [
        {
          title: "Partera Enfermera Certificada Senior",
          company: "Maternity Health Associates",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los puntajes de satisfacción del paciente en un 15% a través de programas mejorados de educación prenatal.",
            "Gestioné con éxito más de 200 partos con una tasa de resultados positivos del 98%.",
            "Reduje las intervenciones de emergencia en un 20% a través de una evaluación de riesgos proactiva.",
          ],
        },
        {
          title: "Partera Enfermera Certificada",
          company: "Women’s Wellness Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 150 consultas prenatales que condujeron a mejoras en los resultados de salud materna.",
            "Desarrollé e implementé un nuevo proceso de admisión de pacientes que redujo los tiempos de espera en un 30%.",
            "Lideré un programa de alcance comunitario que educó a más de 300 mujeres sobre salud reproductiva.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nurse Midwife (CNM)", issuer: "American Midwifery Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Certified Nurse Midwife en su currículum?", answer: "Un Certified Nurse Midwife debe incluir su experiencia clínica, habilidades en atención al paciente y cualquier certificación relevante." },
      { question: "¿Cómo destacar mi currículum de Certified Nurse Midwife?", answer: "Incluyendo logros cuantificables y destacando habilidades específicas que se alineen con el trabajo deseado." },
      { question: "¿Qué habilidades necesita un Certified Nurse Midwife?", answer: "Habilidades como cuidado del paciente, educación prenatal, y gestión de emergencias son clave." },
    ],
  },
  "certified-nursing-assistant-cna-free": {
    slug: "asistente-de-enfermeria-certificado-cna",
    title: "Asistente de Enfermería Certificado (CNA)",
    keywords: ["currículum de Asistente de Enfermería Certificado", "CV de Asistente de Enfermería Certificado", "ejemplo currículum Asistente de Enfermería Certificado", "plantilla CV Asistente de Enfermería Certificado"],
    searchIntents: ["cómo escribir currículum de Asistente de Enfermería Certificado", "ejemplos currículum Asistente de Enfermería Certificado", "mejor formato CV Asistente de Enfermería Certificado"],
    topSkills: ["Cuidado del Paciente", "Comunicación", "Pensamiento Crítico", "Soporte Vital Básico", "Monitoreo de Signos Vitales", "Asistencia en Higiene", "Asistencia en Movilidad", "Registro de Documentos", "Colaboración en Equipo", "Cuidado Compasivo"],
    atsKeywords: ["Asistente de Enfermería Certificado", "CNA", "cuidado del paciente", "salud", "signos vitales", "higiene", "asistencia al paciente", "terminología médica", "respuesta a emergencias", "habilidades clínicas", "certificado BLS"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Enfermería Certificado (CNA)",
      summary: "Asistente de Enfermería Certificado dedicado con más de 5 años de experiencia en proporcionar atención y apoyo excepcionales a los pacientes. Logré una tasa de satisfacción del paciente del 95%, mejorando la calidad general de la atención en las instalaciones de enfermería.",
      skills: ["Cuidado del Paciente", "Comunicación", "Pensamiento Crítico", "Soporte Vital Básico", "Monitoreo de Signos Vitales", "Asistencia en Higiene", "Asistencia en Movilidad", "Registro de Documentos", "Colaboración en Equipo", "Cuidado Compasivo"],
      experience: [
        {
          title: "Asistente de Enfermería Certificado Senior",
          company: "Sunnydale Nursing Home",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los puntajes de satisfacción del paciente en un 15% mediante técnicas de atención mejoradas.",
            "Ayudé en la capacitación de 10 nuevos CNAs, mejorando la eficiencia del equipo.",
            "Implementé un sistema de retroalimentación de pacientes que mejoró la calidad de la atención.",
          ],
        },
        {
          title: "Asistente de Enfermería Certificado",
          company: "Greenfield Medical Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Monitoreé signos vitales de más de 50 pacientes diariamente.",
            "Proporcioné atención personal a los pacientes, asegurando dignidad y respeto.",
            "Recibí el premio Empleado del Mes por atención al paciente excepcional.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nursing Assistant", issuer: "State Board of Nursing", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Certified Nursing Assistant (CNA) en su currículum?", answer: "Un CNA debe incluir su experiencia en atención al paciente, habilidades clínicas, certificaciones y cualquier logro destacado." },
      { question: "¿Cómo destacar mi currículum de Certified Nursing Assistant (CNA)?", answer: "Utiliza palabras clave relevantes, destaca tus logros y asegúrate de que tu experiencia sea clara y concisa." },
      { question: "¿Qué habilidades necesita un Certified Nursing Assistant (CNA)?", answer: "Las habilidades clave incluyen atención al paciente, comunicación efectiva, monitoreo de signos vitales y trabajo en equipo." },
    ],
  },
  "charge-nurse": {
    slug: "enfermera-a-cargo",
    title: "Enfermera a Cargo",
    keywords: ["currículum de enfermera a cargo", "CV de enfermera a cargo", "ejemplo currículum enfermera a cargo", "plantilla CV enfermera a cargo"],
    searchIntents: ["cómo escribir currículum de enfermera a cargo", "ejemplos currículum enfermera a cargo", "mejor formato CV enfermera a cargo"],
    topSkills: ["Cuidado del Paciente", "Liderazgo", "Pensamiento Crítico", "Comunicación", "Gestión de Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Evaluación Clínica", "Multitarea", "Abogacía del Paciente"],
    atsKeywords: ["enfermería", "cuidado del paciente", "enfermera a cargo", "liderazgo", "habilidades clínicas", "liderazgo de equipo", "respuesta a emergencias", "seguridad del paciente", "cuidado de la salud", "documentación", "capacitación del personal"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera a Cargo",
      summary: "Enfermera a Cargo dedicada con más de 5 años de experiencia en entornos hospitalarios de ritmo rápido, reconocida por mejorar las puntuaciones de satisfacción del cuidado del paciente en un 25% en un año.",
      skills: ["Cuidado del Paciente", "Liderazgo", "Pensamiento Crítico", "Comunicación", "Gestión de Equipo", "Gestión del Tiempo", "Resolución de Problemas", "Evaluación Clínica", "Multitarea", "Abogacía del Paciente"],
      experience: [
        {
          title: "Enfermera a Cargo Senior",
          company: "General Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción del paciente en un 30% mediante la gestión efectiva del equipo y la capacitación.",
            "Reduje los errores de medicación en un 15% al implementar un nuevo sistema de doble verificación.",
            "Lideré un equipo de 10 enfermeras en la entrega de atención de alta calidad durante horas pico.",
          ],
        },
        {
          title: "Enfermera a Cargo",
          company: "City Medical Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimicé el proceso de admisión de pacientes, reduciendo los tiempos de espera en un 20%.",
            "Mentoricé al nuevo personal de enfermería, mejorando la eficiencia de onboarding en un 40%.",
            "Implementé protocolos de atención al paciente que disminuyeron las tasas de readmisión hospitalaria en un 10%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Advanced Cardiac Life Support (ACLS)", issuer: "American Heart Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Charge Nurse en su currículum?", answer: "Debe incluir experiencia en liderazgo, habilidades clínicas y logros específicos en la atención al paciente." },
      { question: "¿Cómo destacar mi currículum de Charge Nurse?", answer: "Utiliza palabras clave relevantes y destaca tus logros cuantificables en atención al paciente." },
      { question: "¿Qué habilidades necesita un Charge Nurse?", answer: "Necesita habilidades de liderazgo, comunicación efectiva y capacidad para manejar situaciones críticas." },
    ],
  },
  "clinical-assistant": {
    slug: "asistente-clinico",
    title: "Asistente Clínico",
    keywords: ["currículum de asistente clínico", "CV de asistente clínico", "ejemplo currículum asistente clínico", "plantilla CV asistente clínico"],
    searchIntents: ["cómo escribir currículum de asistente clínico", "ejemplos currículum asistente clínico", "mejor formato CV asistente clínico"],
    topSkills: ["Atención al Paciente", "Procedimientos Clínicos", "Terminología Médica", "Registros Electrónicos de Salud", "Habilidades de Comunicación", "Gestión del Tiempo", "Colaboración en Equipo", "Resolución de Problemas", "Orientación a los Detalles", "Educación al Paciente"],
    atsKeywords: ["apoyo al paciente", "tareas clínicas", "experiencia en atención médica", "documentación de pacientes", "asistencia médica", "monitoreo de signos vitales", "asistencia en exámenes", "administración de inyecciones", "programación de pacientes", "flujo de trabajo clínico", "cumplimiento de HIPAA"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Clínico",
      summary: "Asistente Clínico dedicado con más de 5 años de experiencia proporcionando atención y apoyo excepcionales a los pacientes en entornos de atención médica de ritmo acelerado. Mejoró con éxito los puntajes de satisfacción del paciente en un 20% a través de una comunicación efectiva y educación al paciente.",
      skills: ["Atención al Paciente", "Procedimientos Clínicos", "Terminología Médica", "Registros Electrónicos de Salud", "Habilidades de Comunicación", "Gestión del Tiempo", "Colaboración en Equipo", "Resolución de Problemas", "Orientación a los Detalles", "Educación al Paciente"],
      experience: [
        {
          title: "Asistente Clínico Senior",
          company: "HealthFirst Medical Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó el flujo de pacientes en un 15% a través de una programación y gestión de flujo de trabajo eficientes.",
            "Capacitado a 10 nuevos miembros del personal en las mejores prácticas de atención al paciente y procedimientos clínicos.",
            "Redujo los tiempos de espera de los pacientes en un 30% implementando nuevos protocolos de triaje.",
          ],
        },
        {
          title: "Asistente Clínico",
          company: "City Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en más de 200 procedimientos quirúrgicos, contribuyendo a una tasa de éxito del 95%.",
            "Mantuve registros precisos de los pacientes, resultando en una tasa de cumplimiento del 100% durante las auditorías.",
            "Desarrollé e implementé un sistema de retroalimentación de pacientes que mejoró los puntajes de satisfacción general en un 25%.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Medical Assistant", issuer: "National Healthcareer Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Clinical Assistant en su currículum?", answer: "Incluir experiencia en atención al paciente, habilidades clínicas, y formación educativa relevante." },
      { question: "¿Cómo destacar mi currículum de Clinical Assistant?", answer: "Utilizar palabras clave relevantes y resaltar logros cuantificables en atención al paciente." },
      { question: "¿Qué habilidades necesita un Clinical Assistant?", answer: "Habilidades en atención al paciente, procedimientos clínicos, y comunicación efectiva." },
    ],
  },
  "clinical-instructor": {
    slug: "instructor-clinico",
    title: "Instructor Clínico",
    keywords: ["currículum de instructor clínico", "CV de instructor clínico", "ejemplo currículum instructor clínico", "plantilla CV instructor clínico"],
    searchIntents: ["cómo escribir currículum de instructor clínico", "ejemplos currículum instructor clínico", "mejor formato CV instructor clínico"],
    topSkills: ["Educación Clínica", "Evaluación de Pacientes", "Desarrollo de Currículo", "Técnicas de Enseñanza", "Mentoría", "Colaboración Interprofesional", "Simulación Clínica", "Evaluación y Valoración", "Investigación Educativa", "Oratoria"],
    atsKeywords: ["Instructor Clínico", "Educación Médica", "Enseñanza", "Capacitación en Salud", "Diseño de Currículo", "Práctica Clínica", "Evaluación de Estudiantes", "Habilidades Clínicas", "Desarrollo Profesional", "Atención al Paciente", "Ciencias de la Salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Instructor Clínico",
      summary: "Instructor Clínico dedicado con más de 5 años de experiencia en educación médica y un historial de mejora del rendimiento estudiantil en un 30% a través de métodos de enseñanza innovadores.",
      skills: ["Educación Clínica", "Evaluación de Pacientes", "Desarrollo de Currículo", "Técnicas de Enseñanza", "Mentoría", "Colaboración Interprofesional", "Simulación Clínica", "Evaluación y Valoración", "Investigación Educativa", "Oratoria"],
      experience: [
        {
          title: "Instructor Clínico Senior",
          company: "Health Sciences University",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de aprobación de estudiantes en un 25% a través de un currículo renovado y talleres prácticos.",
            "Desarrollé un programa de simulación clínica adoptado por 3 departamentos, mejorando las experiencias de aprendizaje práctico.",
            "Mentoricé a más de 50 estudiantes e instructores junior, resultando en una mejora en las evaluaciones de enseñanza.",
          ],
        },
        {
          title: "Instructor Clínico",
          company: "Nursing College of Excellence",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé un sistema de revisión por pares que mejoró las metodologías de enseñanza en toda la facultad.",
            "Realicé una investigación que llevó a una publicación en una revista revisada por pares sobre estrategias de enseñanza efectivas.",
            "Facilité talleres que atrajeron a más de 100 participantes, enfocándonos en el desarrollo de habilidades clínicas.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nurse Educator", issuer: "National League for Nursing", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Instructor Clínico en su currículum?", answer: "Un Instructor Clínico debe incluir su experiencia en educación, habilidades clínicas, y logros en la enseñanza." },
      { question: "¿Cómo destacar mi currículum de Instructor Clínico?", answer: "Utiliza palabras clave relevantes, resalta tus logros y personaliza tu currículum para cada puesto." },
      { question: "¿Qué habilidades necesita un Instructor Clínico?", answer: "Las habilidades clave incluyen educación clínica, evaluación de estudiantes, y colaboración interprofesional." },
    ],
  },
  "clinical-project-manager": {
    slug: "gerente-de-proyectos-clinicos",
    title: "Gerente de Proyectos Clínicos",
    keywords: ["currículum de Gerente de Proyectos Clínicos", "CV de Gerente de Proyectos Clínicos", "ejemplo currículum Gerente de Proyectos Clínicos", "plantilla CV Gerente de Proyectos Clínicos"],
    searchIntents: ["cómo escribir currículum de Gerente de Proyectos Clínicos", "ejemplos currículum Gerente de Proyectos Clínicos", "mejor formato CV Gerente de Proyectos Clínicos"],
    topSkills: ["gestión de proyectos", "ensayos clínicos", "cumplimiento regulatorio", "liderazgo de equipo", "gestión de presupuesto", "análisis de datos", "compromiso de partes interesadas", "gestión de riesgos", "comunicación", "planificación estratégica"],
    atsKeywords: ["gestión de proyectos clínicos", "investigación clínica", "GCP", "guías ICH", "desarrollo de protocolos", "gestión de estudios", "asignación de recursos", "métricas de rendimiento", "operaciones clínicas", "gestión de proveedores", "integridad de datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Proyectos Clínicos",
      summary: "Gerente de Proyectos Clínicos dinámico con más de 7 años de experiencia liderando ensayos clínicos y asegurando el cumplimiento de normas regulatorias. He gestionado con éxito proyectos con un presupuesto total de más de $5 millones, lo que resultó en una reducción del 30% en los plazos.",
      skills: ["gestión de proyectos", "ensayos clínicos", "cumplimiento regulatorio", "liderazgo de equipo", "gestión de presupuesto", "análisis de datos", "compromiso de partes interesadas", "gestión de riesgos", "comunicación", "planificación estratégica"],
      experience: [
        {
          title: "Gerente Senior de Proyectos Clínicos",
          company: "PharmaTech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un ensayo clínico de Fase III que resultó en una mejora del 25% en los resultados de los pacientes, con más de 300 pacientes inscritos.",
            "Gestioné con éxito un presupuesto de proyecto que superó los $2 millones, manteniendo el cumplimiento de las guías ICH.",
            "Optimizé los procesos del proyecto, reduciendo los plazos del ensayo en un 20% a través de una gestión eficaz de recursos.",
          ],
        },
        {
          title: "Gerente de Proyectos Clínicos",
          company: "BioHealth Innovations",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Supervisé múltiples ensayos clínicos, logrando una tasa de adherencia al protocolo del 95%.",
            "Implementé estrategias de gestión de riesgos que disminuyeron la notificación de eventos adversos en un 15%.",
            "Colaboré con equipos multifuncionales para mejorar la reclutamiento de pacientes, resultando en un aumento del 40% en las tasas de inscripción.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias Biológicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Project Management Professional (PMP)", issuer: "Project Management Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Gerente de Proyectos Clínicos en su currículum?", answer: "Debe incluir experiencia relevante, habilidades específicas y logros cuantificables en la gestión de ensayos clínicos." },
      { question: "¿Cómo destacar mi currículum de Gerente de Proyectos Clínicos?", answer: "Enfatiza tus logros y resultados en proyectos anteriores y utiliza palabras clave relevantes." },
      { question: "¿Qué habilidades necesita un Gerente de Proyectos Clínicos?", answer: "Necesita habilidades en gestión de proyectos, liderazgo, comunicación y conocimiento de regulaciones clínicas." },
    ],
  },
  "clinical-research-assistant": {
    slug: "asistente-de-investigacion-clinica",
    title: "Asistente de Investigación Clínica",
    keywords: ["currículum de asistente de investigación clínica", "CV de asistente de investigación clínica", "ejemplo currículum asistente de investigación clínica", "plantilla CV asistente de investigación clínica"],
    searchIntents: ["cómo escribir currículum de asistente de investigación clínica", "ejemplos currículum asistente de investigación clínica", "mejor formato CV asistente de investigación clínica"],
    topSkills: ["Gestión de Ensayos Clínicos", "Recolección y Análisis de Datos", "Reclutamiento de Pacientes", "Cumplimiento Regulatorio", "Técnicas de Laboratorio", "Software de Análisis Estadístico", "Buenas Prácticas Clínicas (BPC)", "Terminología Médica", "Captura Electrónica de Datos (CED)", "Redacción de Informes"],
    atsKeywords: ["investigación clínica", "entrada de datos", "interacciones con pacientes", "protocolos de investigación", "ensayos clínicos", "bioestadística", "monitoreo", "reuniones de investigadores", "envíos a IRB", "informes de eventos adversos", "integridad de datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Investigación Clínica",
      summary: "Asistente de Investigación Clínica orientado a los detalles, con más de 5 años de experiencia en gestión de ensayos clínicos y análisis de datos, contribuyendo exitosamente a la finalización de más de 10 ensayos a tiempo y dentro del presupuesto.",
      skills: ["Gestión de Ensayos Clínicos", "Recolección y Análisis de Datos", "Reclutamiento de Pacientes", "Cumplimiento Regulatorio", "Técnicas de Laboratorio", "Software de Análisis Estadístico", "Buenas Prácticas Clínicas (BPC)", "Terminología Médica", "Captura Electrónica de Datos (CED)", "Redacción de Informes"],
      experience: [
        {
          title: "Asistente de Investigación Clínica Senior",
          company: "MedTech Innovations",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo en la gestión de 5 ensayos clínicos, asegurando un 100% de adherencia a los plazos y presupuestos.",
            "Desarrollé e implementé procesos de gestión de datos que mejoraron la precisión de los datos en un 30%.",
            "Facilité estrategias de reclutamiento de pacientes que resultaron en un aumento del 25% en las tasas de inscripción.",
          ],
        },
        {
          title: "Asistente de Investigación Clínica",
          company: "Health Solutions Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en la finalización exitosa de 7 estudios clínicos, contribuyendo a las presentaciones regulatorias.",
            "Realicé la entrada y análisis de datos, logrando una tasa de precisión del 95% en los informes.",
            "Colaboré con equipos multifuncionales para agilizar procesos y mejorar la eficiencia de los ensayos.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias Biológicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Research Coordinator", issuer: "Association of Clinical Research Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Investigación Clínica en su currículum?", answer: "Un Asistente de Investigación Clínica debe incluir su experiencia en gestión de ensayos, habilidades en análisis de datos y conocimientos de regulaciones clínicas." },
      { question: "¿Cómo destacar mi currículum de Asistente de Investigación Clínica?", answer: "Para destacar, enfócate en logros cuantificables y habilidades específicas que son relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Asistente de Investigación Clínica?", answer: "Las habilidades clave incluyen gestión de ensayos clínicos, recolección de datos, y cumplimiento regulatorio." },
    ],
  },
  "community-health-worker-vanderburgh-county-health-department": {
    slug: "trabajador-comunitario-de-salud",
    title: "Trabajador Comunitario de Salud",
    keywords: ["currículum de trabajador comunitario de salud", "CV de trabajador comunitario de salud", "ejemplo currículum trabajador comunitario de salud", "plantilla CV trabajador comunitario de salud"],
    searchIntents: ["cómo escribir currículum de trabajador comunitario de salud", "ejemplos currículum trabajador comunitario de salud", "mejor formato CV trabajador comunitario de salud"],
    topSkills: ["Alcance comunitario", "Educación en salud", "Competencia cultural", "Gestión de casos", "Promoción de la salud", "Defensoria", "Recolección de datos", "Comunicación", "Resolución de problemas", "Colaboración en equipo"],
    atsKeywords: ["salud comunitaria", "educación del paciente", "salud pública", "evaluaciones de salud", "servicios sociales", "disparidades en salud", "programas de alcance", "referencia de recursos", "alfabetización en salud", "recursos comunitarios", "evaluación de programas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador Comunitario de Salud",
      summary: "Trabajador Comunitario de Salud dedicado con más de 5 años de experiencia en iniciativas de salud pública y alcance comunitario, aumentando con éxito la participación en programas de salud en un 30%. Capacidad comprobada para conectar con poblaciones diversas y mejorar la alfabetización en salud.",
      skills: ["Alcance comunitario", "Educación en salud", "Competencia cultural", "Gestión de casos", "Promoción de la salud", "Defensoria", "Recolección de datos", "Comunicación", "Resolución de problemas", "Colaboración en equipo"],
      experience: [
        {
          title: "Trabajador Comunitario de Salud Senior",
          company: "Vanderburgh County Health Department",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la inscripción en el programa de salud comunitaria en un 40% en 2 años",
            "Realizó más de 100 talleres de educación en salud con una calificación de satisfacción promedio del 95%",
            "Desarrolló asociaciones con 15 organizaciones locales para mejorar la prestación de servicios",
          ],
        },
        {
          title: "Trabajador Comunitario de Salud",
          company: "Health Access Indiana",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistió a más de 200 clientes en el acceso a servicios de salud",
            "Mejoró los resultados de salud para familias de bajos ingresos en un 25% a través de un alcance dirigido",
            "Lideró iniciativas que redujeron las disparidades en salud en comunidades desatendidas",
          ],
        },
      ],
      education: [
        { institution: "University of Southern Indiana", degree: "B.S.", field: "Salud Pública", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Community Health Worker (CCHW)", issuer: "Indiana State Department of Health", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Community Health Worker en su currículum?", answer: "Debe incluir experiencia laboral relevante, habilidades específicas en salud comunitaria y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Community Health Worker?", answer: "Enfatiza tus logros en programas de salud y destaca tus habilidades interpersonales y de comunicación." },
      { question: "¿Qué habilidades necesita un Community Health Worker?", answer: "Las habilidades clave incluyen alcance comunitario, educación en salud, gestión de casos y competencia cultural." },
    ],
  },
  "county-of-san-bernardino-social-work-intern": {
    slug: "county-of-san-bernardino-social-work-intern",
    title: "Practicante de Trabajo Social del Condado de San Bernardino",
    keywords: ["currículum de Practicante de Trabajo Social", "CV de Practicante de Trabajo Social", "ejemplo currículum Practicante de Trabajo Social", "plantilla CV Practicante de Trabajo Social"],
    searchIntents: ["cómo escribir currículum de Practicante de Trabajo Social", "ejemplos currículum Practicante de Trabajo Social", "mejor formato CV Practicante de Trabajo Social"],
    topSkills: ["gestión de casos", "evaluación de clientes", "intervención en crisis", "habilidades de consejería", "redacción de informes", "alcance comunitario", "resolución de conflictos", "abogacía", "competencia cultural", "colaboración en equipo"],
    atsKeywords: ["trabajo social", "pasantía", "documentación de casos", "apoyo al cliente", "evaluación conductual", "desarrollo profesional", "servicios sociales", "evaluación psicosocial", "coordinación de recursos", "recursos comunitarios", "trabajo en equipo multidisciplinario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Trabajo Social del Condado de San Bernardino",
      summary: "Practicante de trabajo social dedicada con más de 2 años de experiencia en gestión de casos y apoyo al cliente, reconocida por mejorar con éxito el compromiso del cliente en un 25%. Apasionada por abogar por comunidades desatendidas.",
      skills: ["gestión de casos", "evaluación de clientes", "intervención en crisis", "habilidades de consejería", "redacción de informes", "alcance comunitario", "resolución de conflictos", "abogacía", "competencia cultural", "colaboración en equipo"],
      experience: [
        {
          title: "Practicante de Trabajo Social",
          company: "San Bernardino County Department of Behavioral Health",
          startDate: "2022-01",
          isCurrent: true,
          achievements: [
            "Mejoré las puntuaciones de satisfacción del cliente en un 30% a través de planes de atención personalizados",
            "Facilicé más de 50 sesiones con clientes, abordando necesidades de salud mental y proporcionando apoyo",
            "Colaboré con un equipo de profesionales para optimizar la entrega de servicios, reduciendo los tiempos de espera en un 15%",
          ],
        },
        {
          title: "Trabajador Social Voluntario",
          company: "Community Health Center",
          startDate: "2019-06",
          endDate: "2021-12",
          achievements: [
            "Asistí en el desarrollo de programas de alcance comunitario que aumentaron el acceso a servicios en un 40%",
            "Realicé evaluaciones para más de 100 clientes, proporcionando recursos y referencias personalizadas",
            "Participé en reuniones de equipo para mejorar estrategias de servicio y compromiso del cliente",
          ],
        },
      ],
      education: [
        { institution: "University of California, Riverside", degree: "B.S.", field: "Trabajo Social", startDate: "2018-09", endDate: "2022-06" },
      ],
      certifications: [
        { name: "Certified Social Work Intern", issuer: "California Board of Behavioral Sciences", date: "2022-07" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un County Of San Bernardino Social Work Intern en su currículum?", answer: "Un County Of San Bernardino Social Work Intern debe incluir experiencia en trabajo social, habilidades de gestión de casos, y ejemplos de logros en el apoyo a clientes." },
      { question: "¿Cómo destacar mi currículum de County Of San Bernardino Social Work Intern?", answer: "Para destacar su currículum, incluya métricas de éxito concretas, habilidades relevantes y experiencias prácticas relacionadas con el trabajo social." },
      { question: "¿Qué habilidades necesita un County Of San Bernardino Social Work Intern?", answer: "Las habilidades clave incluyen gestión de casos, evaluación de clientes, intervención en crisis y habilidades de comunicación efectiva." },
    ],
  },
  "creative-arts-therapist": {
    slug: "terapeuta-de-artes-creativas",
    title: "Terapeuta de Artes Creativas",
    keywords: ["currículum de Terapeuta de Artes Creativas", "CV de Terapeuta de Artes Creativas", "ejemplo currículum Terapeuta de Artes Creativas", "plantilla CV Terapeuta de Artes Creativas"],
    searchIntents: ["cómo escribir currículum de Terapeuta de Artes Creativas", "ejemplos currículum Terapeuta de Artes Creativas", "mejor formato CV Terapeuta de Artes Creativas"],
    topSkills: ["Terapia de Arte", "Terapia Musical", "Terapia Dramática", "Relaciones Terapéuticas", "Técnicas de Consejería", "Facilitación de Grupos", "Habilidades de Evaluación", "Planificación de Intervenciones", "Intervención en Crisis", "Defensa del Cliente"],
    atsKeywords: ["Terapia de Artes Creativas", "Terapeuta", "Salud Mental", "Técnicas de Terapia de Arte", "Cuidado del Paciente", "Prácticas Terapéuticas", "Terapia Conductual", "Empatía", "Habilidades de Comunicación", "Competencia Cultural", "Cuidado Informado sobre el Trauma"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Terapeuta de Artes Creativas",
      summary: "Terapeuta de Artes Creativas con más de 5 años de experiencia en el uso de métodos artísticos para mejorar la salud mental y el bienestar. Mejoró con éxito la participación de los pacientes en un 30% a través de técnicas terapéuticas innovadoras.",
      skills: ["Terapia de Arte", "Terapia Musical", "Terapia Dramática", "Relaciones Terapéuticas", "Técnicas de Consejería", "Facilitación de Grupos", "Habilidades de Evaluación", "Planificación de Intervenciones", "Intervención en Crisis", "Defensa del Cliente"],
      experience: [
        {
          title: "Terapeuta de Artes Creativas Senior",
          company: "Healing Arts Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de retención de clientes en un 40% a través de planes de terapia personalizados",
            "Facilité más de 200 sesiones de terapia grupal con una calificación promedio de satisfacción del 95%",
            "Desarrollé un nuevo programa de terapia de arte que resultó en una mejora del 50% en las evaluaciones del estado de ánimo de los clientes",
          ],
        },
        {
          title: "Terapeuta de Artes Creativas",
          company: "Mindful Therapy Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé sesiones de terapia individual para más de 100 clientes, logrando un 90% de tasa de éxito en el cumplimiento de objetivos terapéuticos",
            "Implementé talleres creativos que aumentaron la participación comunitaria en un 25%",
            "Colaboré con equipos multidisciplinarios para proporcionar planes de atención integral",
          ],
        },
      ],
      education: [
        { institution: "University of the Arts", degree: "B.S.", field: "Terapia de Artes Creativas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Registered Art Therapist", issuer: "Art Therapy Credentials Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Terapeuta de Artes Creativas en su currículum?", answer: "Incluir experiencia relevante, habilidades terapéuticas y formación académica." },
      { question: "¿Cómo destacar mi currículum de Terapeuta de Artes Creativas?", answer: "Resaltar logros cuantificables y técnicas innovadoras utilizadas." },
      { question: "¿Qué habilidades necesita un Terapeuta de Artes Creativas?", answer: "Habilidades en terapia de arte, empatía y técnicas de comunicación efectivas." },
    ],
  },
  "dental-secretary": {
    slug: "secretaria-dental",
    title: "Secretaria Dental",
    keywords: ["currículum de Secretaria Dental", "CV de Secretaria Dental", "ejemplo currículum Secretaria Dental", "plantilla CV Secretaria Dental"],
    searchIntents: ["cómo escribir currículum de Secretaria Dental", "ejemplos currículum Secretaria Dental", "mejor formato CV Secretaria Dental"],
    topSkills: ["Programación de Citas", "Verificación de Seguros", "Gestión de Citas", "Mantenimiento de Registros", "Servicio al Cliente", "Dominio de Software Dental", "Facturación y Codificación", "Habilidades de Comunicación", "Atención al Detalle", "Resolución de Problemas"],
    atsKeywords: ["Terminología Dental", "Administración de Oficina", "Atención al Paciente", "Entrada de Datos", "Cumplimiento de HIPAA", "Sistemas de Teléfono Multilínea", "Planificación de Tratamientos", "Apoyo Clínico", "Colaboración en Equipo", "Gestión del Tiempo", "Resolución de Conflictos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Secretaria Dental",
      summary: "Secretaria Dental dedicada con más de 5 años de experiencia en la gestión de operaciones de consultorios dentales y mejora de la satisfacción del paciente. Historial comprobado de mejorar la eficiencia en la programación de citas en un 30% y reducir los tiempos de espera de los pacientes.",
      skills: ["Programación de Citas", "Verificación de Seguros", "Gestión de Citas", "Mantenimiento de Registros", "Servicio al Cliente", "Dominio de Software Dental", "Facturación y Codificación", "Habilidades de Comunicación", "Atención al Detalle", "Resolución de Problemas"],
      experience: [
        {
          title: "Secretaria Dental Senior",
          company: "Bright Smiles Dental Clinic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en la programación de citas en un 30% mediante la optimización de la gestión de citas.",
            "Reduje los tiempos de espera de los pacientes en un 15% al implementar protocolos de programación efectivos.",
            "Desarrollé un sistema de seguimiento de pacientes que mejoró las confirmaciones de citas en un 40%.",
          ],
        },
        {
          title: "Secretaria Dental",
          company: "Healthy Teeth Dental Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné con éxito una carga diaria de más de 50 pacientes.",
            "Manejé el procesamiento de reclamaciones de seguros que resultó en una reducción del 20% en denegaciones de reclamaciones.",
            "Capacité al nuevo personal en procedimientos de oficina y software de gestión de pacientes.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Dental Assistant", issuer: "Dental Assisting National Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Secretario Dental en su currículum?", answer: "Debe incluir habilidades relevantes, experiencia laboral, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Secretaria Dental?", answer: "Asegúrate de resaltar tus logros en la programación de citas y atención al paciente." },
      { question: "¿Qué habilidades necesita un Secretario Dental?", answer: "Habilidades en gestión de citas, atención al cliente, y dominio de software dental son clave." },
    ],
  },
  "dental-technician": {
    slug: "tecnico-dental",
    title: "Técnico Dental",
    keywords: ["currículum de técnico dental", "CV de técnico dental", "ejemplo currículum técnico dental", "plantilla CV técnico dental"],
    searchIntents: ["cómo escribir currículum de técnico dental", "ejemplos currículum técnico dental", "mejor formato CV técnico dental"],
    topSkills: ["Prótesis Dentales", "Cerámicas", "Ortodoncia", "Implantología", "Técnicas de Fundición", "Odontología Digital", "Gestión de Laboratorio", "Comunicación con Pacientes", "Control de Calidad", "Gestión del Tiempo"],
    atsKeywords: ["técnico dental", "prótesis", "laboratorio dental", "restauración cerámica", "aparatos ortodónticos", "fabricación de dentaduras", "tecnología CAD/CAM", "materiales dentales", "cuidado del paciente", "habilidades técnicas", "gestión del tiempo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico Dental",
      summary: "Técnico Dental dedicado con más de 5 años de experiencia en la creación de prótesis dentales y restauraciones de alta calidad. Logró un aumento del 30% en la eficiencia del laboratorio a través de la optimización de procesos.",
      skills: ["Prótesis Dentales", "Cerámicas", "Ortodoncia", "Implantología", "Técnicas de Fundición", "Odontología Digital", "Gestión de Laboratorio", "Comunicación con Pacientes", "Control de Calidad", "Gestión del Tiempo"],
      experience: [
        {
          title: "Técnico Dental Senior",
          company: "Smile Bright Dental Lab",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la productividad del laboratorio en un 25% implementando nuevos sistemas de software.",
            "Reduje el desperdicio de materiales en un 15% mediante una mejor gestión de inventario.",
            "Entrené a 5 técnicos junior, mejorando la competencia del equipo.",
          ],
        },
        {
          title: "Técnico Dental",
          company: "Precision Dental Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Fabricé con éxito más de 300 coronas dentales personalizadas, manteniendo una tasa de satisfacción del 98%.",
            "Colaboré con dentistas para refinar el diseño de productos, lo que llevó a una reducción del 20% en el tiempo de entrega.",
            "Mantuve el cumplimiento de las regulaciones de salud, logrando cero violaciones durante las inspecciones.",
          ],
        },
      ],
      education: [
        { institution: "Dental Technology University", degree: "B.S.", field: "Tecnología Dental", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Dental Technician", issuer: "National Board for Certification in Dental Technology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico Dental en su currículum?", answer: "Incluir experiencia laboral relevante, habilidades técnicas y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Técnico Dental?", answer: "Enfatizar logros medibles y habilidades específicas en el campo." },
      { question: "¿Qué habilidades necesita un Técnico Dental?", answer: "Habilidades clave incluyen prótesis dentales, cerámicas y gestión del tiempo." },
    ],
  },
  "dentist-assistant": {
    slug: "asistente-dental",
    title: "Asistente Dental",
    keywords: ["currículum de asistente dental", "CV de asistente dental", "ejemplo currículum asistente dental", "plantilla CV asistente dental"],
    searchIntents: ["cómo escribir currículum de asistente dental", "ejemplos currículum asistente dental", "mejor formato CV asistente dental"],
    topSkills: ["Atención al Paciente", "Radiografía Dental", "Control de Infecciones", "Asistencia en Procedimientos Dentales", "Comunicación con Pacientes", "Mantenimiento de Registros", "Técnicas de Esterilización", "Gestión de Equipos", "Programación", "Procesamiento de Seguros"],
    atsKeywords: ["odontología", "salud oral", "gestión de pacientes", "asistente dental", "radiología", "habilidades clínicas", "asistencia quirúrgica", "educación del paciente", "software dental", "prevención de infecciones", "colaboración en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Dental",
      summary: "Asistente Dental dedicada con más de 5 años de experiencia en proporcionar atención excepcional a los pacientes y asistir en procedimientos dentales, logrando una puntuación de satisfacción del paciente del 95%.",
      skills: ["Atención al Paciente", "Radiografía Dental", "Control de Infecciones", "Asistencia en Procedimientos Dentales", "Comunicación con Pacientes", "Mantenimiento de Registros", "Técnicas de Esterilización", "Gestión de Equipos", "Programación", "Procesamiento de Seguros"],
      experience: [
        {
          title: "Asistente Dental Senior",
          company: "Bright Smiles Dental Clinic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la retención de pacientes en un 20% a través de relaciones mejoradas con los pacientes y procedimientos de seguimiento.",
            "Asistí en más de 500 procedimientos dentales con una tasa de éxito del 98%.",
            "Implementé un nuevo sistema de inventario que redujo los costos de suministros en un 15%.",
          ],
        },
        {
          title: "Asistente Dental",
          company: "Happy Teeth Family Dentistry",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé al equipo dental en las operaciones diarias, contribuyendo a un aumento del 30% en el flujo de pacientes.",
            "Entrené a 3 nuevos asistentes dentales, mejorando la eficiencia y el rendimiento del equipo.",
            "Participé en programas de alcance comunitario, aumentando la visibilidad de la clínica y la base de pacientes.",
          ],
        },
      ],
      education: [
        { institution: "City University", degree: "B.S.", field: "Higiene Dental", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Dental Assistant (CDA)", issuer: "Dental Assisting National Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un asistente dental en su currículum?", answer: "Incluir experiencia previa, habilidades específicas relacionadas con la odontología, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de asistente dental?", answer: "Enfatizar logros y contribuciones a la satisfacción del paciente y la eficiencia del equipo." },
      { question: "¿Qué habilidades necesita un asistente dental?", answer: "Habilidades en atención al paciente, manejo de equipos, y control de infecciones son fundamentales." },
    ],
  },
  "ecstatic-dance-therapist": {
    slug: "terapeuta-de-danza-ecstatica",
    title: "Terapeuta de Danza Éxtatica",
    keywords: ["currículum de terapeuta de danza éxtatica", "CV de terapeuta de danza éxtatica", "ejemplo currículum terapeuta de danza éxtatica", "plantilla CV terapeuta de danza éxtatica"],
    searchIntents: ["cómo escribir currículum de terapeuta de danza éxtatica", "ejemplos currículum terapeuta de danza éxtatica", "mejor formato CV terapeuta de danza éxtatica"],
    topSkills: ["Facilitación", "Conciencia Corporal", "Terapia de Movimiento", "Dinámicas de Grupo", "Liberación Emocional", "Expresión Creativa", "Atención Plena", "Cuidados Informados sobre Trauma", "Construcción de Comunidad", "Sanación a Través del Sonido"],
    atsKeywords: ["ecstatic dance", "dance therapy", "movement facilitation", "group therapy", "somatic practices", "emotional wellness", "community engagement", "trauma recovery", "creative arts therapy", "mind-body connection", "wellness coaching"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Terapeuta de Danza Éxtatica",
      summary: "Terapeuta de Danza Éxtatica dinámica con más de 5 años de experiencia en la facilitación de sesiones de danza transformadoras. He liderado con éxito más de 200 talleres, aumentando la participación de los participantes en un 30% anualmente.",
      skills: ["Facilitación", "Conciencia Corporal", "Terapia de Movimiento", "Dinámicas de Grupo", "Liberación Emocional", "Expresión Creativa", "Atención Plena", "Cuidados Informados sobre Trauma", "Construcción de Comunidad", "Sanación a Través del Sonido"],
      experience: [
        {
          title: "Facilitador Principal de Danza Éxtatica",
          company: "DanceFlow Studio",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la asistencia a los talleres en un 40% en dos años.",
            "Lideré más de 100 sesiones de danza éxtatica con una tasa de satisfacción del 95% entre los participantes.",
            "Desarrollé un programa de alcance comunitario que involucró a 150 nuevos participantes.",
          ],
        },
        {
          title: "Instructor de Danza Éxtatica",
          company: "Harmony Wellness Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé un nuevo currículo que mejoró la retención de participantes en un 25%.",
            "Facilité clases semanales que contribuyeron a un aumento del 20% en la inscripción general del programa de bienestar.",
            "Colaboré con terapeutas para integrar la terapia de movimiento en programas de bienestar holísticos.",
          ],
        },
      ],
      education: [
        { institution: "University of Arts and Wellness", degree: "B.S.", field: "Terapia de Danza", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Dance Movement Therapist", issuer: "Dance Therapy Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ecstatic Dance Therapist en su currículum?", answer: "Un Ecstatic Dance Therapist debe incluir su experiencia en facilitación de talleres, habilidades en terapia de movimiento, y cualquier certificación relevante." },
      { question: "¿Cómo destacar mi currículum de Ecstatic Dance Therapist?", answer: "Es importante resaltar logros cuantificables y habilidades específicas que se alineen con las necesidades del puesto." },
      { question: "¿Qué habilidades necesita un Ecstatic Dance Therapist?", answer: "Las habilidades clave incluyen facilitación de grupos, conciencia corporal, y entendimiento de los cuidados informados sobre trauma." },
    ],
  },
  "elderly-caregiver": {
    slug: "cuidador-de-ancianos",
    title: "Cuidador de Ancianos",
    keywords: ["currículum de cuidador de ancianos", "CV de cuidador de ancianos", "ejemplo currículum cuidador de ancianos", "plantilla CV cuidador de ancianos"],
    searchIntents: ["cómo escribir currículum de cuidador de ancianos", "ejemplos currículum cuidador de ancianos", "mejor formato CV cuidador de ancianos"],
    topSkills: ["cuidado de pacientes", "apoyo emocional", "gestión de medicamentos", "asistencia en la vida diaria", "habilidades de comunicación", "gestión del tiempo", "resolución de problemas", "primeros auxilios", "gestión de la nutrición", "asistencia en la movilidad"],
    atsKeywords: ["cuidado de ancianos", "cuidador compasivo", "proveedor de atención médica", "defensor del paciente", "cuidado personal", "protocolos de seguridad", "cuidado de la demencia", "asistencia en higiene", "gestión del hogar", "desarrollo de planes de cuidado", "apoyo a la terapia física"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Cuidador de Ancianos",
      summary: "Cuidador de Ancianos compasivo con más de 5 años de experiencia proporcionando atención excepcional a clientes ancianos. Historial comprobado de mejorar las calificaciones de satisfacción del cliente en un 30%.",
      skills: ["cuidado de pacientes", "apoyo emocional", "gestión de medicamentos", "asistencia en la vida diaria", "habilidades de comunicación", "gestión del tiempo", "resolución de problemas", "primeros auxilios", "gestión de la nutrición", "asistencia en la movilidad"],
      experience: [
        {
          title: "Cuidador Senior",
          company: "Golden Years Assisted Living",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 40% a través de planes de cuidado personalizados",
            "Gestioné el cuidado de hasta 15 residentes ancianos simultáneamente",
            "Desarrollé un nuevo programa de capacitación para cuidadores que mejoró la entrega de servicios en un 25%",
          ],
        },
        {
          title: "Cuidador",
          company: "Comfort Keepers",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné asistencia en la vida diaria a clientes ancianos, mejorando su calidad de vida",
            "Implementé protocolos de seguridad que redujeron accidentes en un 20%",
            "Coordiné con profesionales de la salud para asegurar un cuidado integral",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nursing Assistant", issuer: "National Association of Health Care Assistants", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un cuidador de ancianos en su currículum?", answer: "Un cuidador de ancianos debe incluir su experiencia en cuidado personal, habilidades de comunicación y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de cuidador de ancianos?", answer: "Enfócate en tus logros y resultados medibles, y destaca tus habilidades interpersonales." },
      { question: "¿Qué habilidades necesita un cuidador de ancianos?", answer: "Las habilidades clave incluyen empatía, paciencia, habilidades de comunicación y conocimiento en primeros auxilios." },
    ],
  },
  "emergency-room-nurse": {
    slug: "enfermera-de-sala-de-emergencias",
    title: "Enfermera de Sala de Emergencias",
    keywords: ["currículum de enfermera de sala de emergencias", "CV de enfermera de sala de emergencias", "ejemplo currículum enfermera de sala de emergencias", "plantilla CV enfermera de sala de emergencias"],
    searchIntents: ["cómo escribir currículum de enfermera de sala de emergencias", "ejemplos currículum enfermera de sala de emergencias", "mejor formato CV enfermera de sala de emergencias"],
    topSkills: ["Cuidado Crítico", "Evaluación de Pacientes", "Respuesta a Emergencias", "Colaboración en Equipo", "Gestión del Tiempo", "Comunicación", "Competencia Técnica", "Defensa del Paciente", "Atención de Trauma", "Control de Infecciones"],
    atsKeywords: ["Sala de Emergencias", "Enfermería", "Cuidado del Paciente", "Trauma", "Pensamiento Crítico", "Habilidades Clínicas", "Triage", "Soporte Vital", "Seguridad del Paciente", "Documentación", "Administración de Medicamentos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera de Sala de Emergencias",
      summary: "Enfermera de sala de emergencias dedicada con más de 5 años de experiencia en entornos de atención médica de ritmo acelerado. Historial comprobado de mejora en los resultados de los pacientes mediante la implementación de estrategias de atención efectivas y la colaboración con equipos multidisciplinarios.",
      skills: ["Cuidado Crítico", "Evaluación de Pacientes", "Respuesta a Emergencias", "Colaboración en Equipo", "Gestión del Tiempo", "Comunicación", "Competencia Técnica", "Defensa del Paciente", "Atención de Trauma", "Control de Infecciones"],
      experience: [
        {
          title: "Enfermera Senior de Sala de Emergencias",
          company: "General Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la satisfacción del paciente en un 20% a través de una mejor comunicación y procesos de atención",
            "Gestioné el cuidado de más de 1,000 pacientes anualmente, asegurando un tratamiento de alta calidad y oportuno",
            "Implementé un nuevo sistema de triage que redujo los tiempos de espera de los pacientes en un 30%",
          ],
        },
        {
          title: "Enfermera de Sala de Emergencias",
          company: "City Medical Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Manejé con éxito situaciones de alta presión con hasta 15 pacientes en estado crítico simultáneamente",
            "Realicé sesiones de capacitación para el nuevo personal, mejorando la eficiencia del equipo en un 15%",
            "Reconocida por la excelencia en el cuidado del paciente con el premio 'Enfermera del Mes' en dos ocasiones",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Emergency Nurse (CEN)", issuer: "Board of Certification for Emergency Nursing", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Enfermera de Sala de Emergencias en su currículum?", answer: "Debe incluir su experiencia en atención de emergencia, habilidades clínicas, certificaciones y logros en el cuidado del paciente." },
      { question: "¿Cómo destacar mi currículum de Enfermera de Sala de Emergencias?", answer: "Utilice palabras clave relevantes, resalte sus logros y mantenga un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un Enfermera de Sala de Emergencias?", answer: "Las habilidades clave incluyen cuidado crítico, evaluación de pacientes, respuesta a emergencias y trabajo en equipo." },
    ],
  },
  "environmental-health-and-safety-specialist": {
    slug: "especialista-en-salud-y-seguridad-ambiental",
    title: "Especialista en Salud y Seguridad Ambiental",
    keywords: ["currículum de especialista en salud y seguridad ambiental", "CV de especialista en salud y seguridad ambiental", "ejemplo currículum especialista en salud y seguridad ambiental", "plantilla CV especialista en salud y seguridad ambiental"],
    searchIntents: ["cómo escribir currículum de especialista en salud y seguridad ambiental", "ejemplos currículum especialista en salud y seguridad ambiental", "mejor formato CV especialista en salud y seguridad ambiental"],
    topSkills: ["Evaluación de Riesgos", "Cumplimiento Normativo", "Capacitación en Seguridad", "Gestión de Materiales Peligrosos", "Investigación de Incidentes", "Auditoría Ambiental", "Planificación de Respuesta a Emergencias", "Análisis de Datos", "Gestión de Proyectos", "Comunicación"],
    atsKeywords: ["salud y seguridad", "regulaciones OSHA", "cumplimiento ambiental", "gestión de seguridad", "gestión de riesgos", "salud ambiental", "protocolos de seguridad", "programas EHS", "auditorías de seguridad", "capacitación y desarrollo", "iniciativas de sostenibilidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Especialista en Salud y Seguridad Ambiental",
      summary: "Especialista en Salud y Seguridad Ambiental dedicado con más de 5 años de experiencia en garantizar la seguridad en el lugar de trabajo y el cumplimiento de los estándares regulatorios. Reduje con éxito las tasas de incidentes en un 30% mediante la implementación de programas de capacitación en seguridad integrales.",
      skills: ["Evaluación de Riesgos", "Cumplimiento Normativo", "Capacitación en Seguridad", "Gestión de Materiales Peligrosos", "Investigación de Incidentes", "Auditoría Ambiental", "Planificación de Respuesta a Emergencias", "Análisis de Datos", "Gestión de Proyectos", "Comunicación"],
      experience: [
        {
          title: "Especialista Senior en Salud y Seguridad Ambiental",
          company: "GreenTech Innovations",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los incidentes laborales en un 30% mediante medidas de capacitación mejoradas.",
            "Logré un 100% de cumplimiento con los estándares OSHA durante las inspecciones.",
            "Implementé un sistema de gestión ambiental que condujo a una reducción del 20% en residuos.",
          ],
        },
        {
          title: "Especialista en Salud y Seguridad Ambiental",
          company: "EcoSafe Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 50 auditorías de seguridad con una tasa de cumplimiento del 95%.",
            "Desarrollé y entregué capacitación en seguridad a más de 200 empleados anualmente.",
            "Dirigí investigaciones de incidentes que resultaron en una disminución del 40% en incidentes repetidos.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias Ambientales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Safety Professional (CSP)", issuer: "Board of Certified Safety Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Environmental Health And Safety Specialist en su currículum?", answer: "Un especialista debe incluir su experiencia en auditorías de seguridad, capacitación, cumplimiento normativo y gestión de riesgos." },
      { question: "¿Cómo destacar mi currículum de Environmental Health And Safety Specialist?", answer: "Enfatiza tus logros cuantificables y experiencia relevante en el campo de la salud y seguridad ambiental." },
      { question: "¿Qué habilidades necesita un Environmental Health And Safety Specialist?", answer: "Se requieren habilidades en evaluación de riesgos, cumplimiento normativo, capacitación en seguridad y gestión de incidentes." },
    ],
  },
  "expressive-therapist": {
    slug: "terapeuta-expresivo",
    title: "Terapeuta Expresivo",
    keywords: ["currículum de terapeuta expresivo", "CV de terapeuta expresivo", "ejemplo currículum terapeuta expresivo", "plantilla CV terapeuta expresivo"],
    searchIntents: ["cómo escribir currículum de terapeuta expresivo", "ejemplos currículum terapeuta expresivo", "mejor formato CV terapeuta expresivo"],
    topSkills: ["terapia de arte", "terapia musical", "terapia dramática", "asesoría", "habilidades de comunicación", "empatía", "expresión creativa", "psicoterapia", "terapia grupal", "evaluación de clientes"],
    atsKeywords: ["terapeuta licenciado", "técnicas terapéuticas", "salud mental", "terapia centrada en el cliente", "cuidado informado sobre traumas", "terapia conductual", "terapia de artes expresivas", "confidencialidad", "gestión de casos", "evaluación psicológica", "estrategias de intervención"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Terapeuta Expresivo",
      summary: "Terapeuta Expresivo dedicado con más de 5 años de experiencia en proporcionar apoyo terapéutico a través de métodos creativos. Mejoró exitosamente los resultados de los clientes en un 30% mediante intervenciones terapéuticas personalizadas.",
      skills: ["terapia de arte", "terapia musical", "terapia dramática", "asesoría", "habilidades de comunicación", "empatía", "expresión creativa", "psicoterapia", "terapia grupal", "evaluación de clientes"],
      experience: [
        {
          title: "Terapeuta Expresivo Senior",
          company: "Healing Arts Therapy Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción del cliente en un 40% mediante la implementación de planes de terapia individualizados.",
            "Facilité más de 200 sesiones de terapia grupal con una tasa de retención del 85%.",
            "Desarrollé un programa de alcance comunitario que llegó a más de 500 personas necesitadas de apoyo en salud mental.",
          ],
        },
        {
          title: "Terapeuta Expresivo",
          company: "Creative Minds Wellness",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé evaluaciones de clientes que llevaron a una mejora del 25% en la adherencia al tratamiento.",
            "Diseñé y dirigí talleres que involucraron a más de 100 participantes en la expresión creativa.",
            "Colaboré con un equipo multidisciplinario para crear un enfoque integral de atención para los clientes.",
          ],
        },
      ],
      education: [
        { institution: "University of Arts and Sciences", degree: "B.S.", field: "Terapia de Artes Expresivas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Board Certified Art Therapist", issuer: "Art Therapy Credentials Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un terapeuta expresivo en su currículum?", answer: "Debería incluir su experiencia, habilidades terapéuticas y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de terapeuta expresivo?", answer: "Enfatiza tus logros cuantificables y tu enfoque centrado en el cliente." },
      { question: "¿Qué habilidades necesita un terapeuta expresivo?", answer: "Necesita habilidades en terapia de arte, empatía, y técnicas de comunicación efectivas." },
    ],
  },
  "free-physical-therapy-aide": {
    slug: "auxiliar-de-terapia-fisica-gratuito",
    title: "Auxiliar de Terapia Física Gratuito",
    keywords: ["currículum de auxiliar de terapia física", "CV de auxiliar de terapia física", "ejemplo currículum auxiliar de terapia física", "plantilla CV auxiliar de terapia física"],
    searchIntents: ["cómo escribir currículum de auxiliar de terapia física", "ejemplos currículum auxiliar de terapia física", "mejor formato CV auxiliar de terapia física"],
    topSkills: ["cuidado de pacientes", "técnicas de rehabilitación", "instrucción de ejercicios", "terminología médica", "habilidades de comunicación", "gestión del tiempo", "colaboración en equipo", "mantenimiento de registros", "resolución de problemas", "empatía"],
    atsKeywords: ["terapia física", "apoyo al paciente", "ejercicios terapéuticos", "asistencia en movilidad", "protocolos de terapia física", "procedimientos clínicos", "documentación del paciente", "cumplimiento sanitario", "habilidades interpersonales", "trabajo en equipo", "multitarea"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Auxiliar de Terapia Física Gratuito",
      summary: "Auxiliar de Terapia Física dedicado con más de 3 años de experiencia apoyando a terapeutas físicos en la rehabilitación de pacientes. Asistió exitosamente en la mejora de la movilidad de los pacientes en un 30% a través de programas de ejercicios personalizados.",
      skills: ["cuidado de pacientes", "técnicas de rehabilitación", "instrucción de ejercicios", "terminología médica", "habilidades de comunicación", "gestión del tiempo", "colaboración en equipo", "mantenimiento de registros", "resolución de problemas", "empatía"],
      experience: [
        {
          title: "Auxiliar de Terapia Física Senior",
          company: "HealthPlus Physical Therapy",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del paciente en un 25% a través de planes de atención personalizados",
            "Asistí en la rehabilitación de más de 150 pacientes, logrando una mejora del 40% en la movilidad general",
            "Optimicé el proceso de admisión de pacientes, reduciendo los tiempos de espera en un 15%",
          ],
        },
        {
          title: "Auxiliar de Terapia Física",
          company: "RehabWorks Therapy Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé más de 100 sesiones de terapia al mes, contribuyendo a un aumento del 20% en la eficiencia de la clínica",
            "Entrené a nuevo personal sobre las mejores prácticas para el cuidado de pacientes y técnicas de rehabilitación",
            "Mantuve registros precisos de los pacientes, mejorando el cumplimiento de las regulaciones de salud",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Kinesiología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Physical Therapy Aide", issuer: "National Physical Therapy Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Free Physical Therapy Aide en su currículum?", answer: "Respuesta específica." },
      { question: "¿Cómo destacar mi currículum de Free Physical Therapy Aide?", answer: "Consejos específicos." },
      { question: "¿Qué habilidades necesita un Free Physical Therapy Aide?", answer: "Habilidades clave." },
    ],
  },
  "geriatric-nurse": {
    slug: "enfermera-geriatrica",
    title: "Enfermera Geriátrica",
    keywords: ["currículum de enfermera geriátrica", "CV de enfermera geriátrica", "ejemplo currículum enfermera geriátrica", "plantilla CV enfermera geriátrica"],
    searchIntents: ["cómo escribir currículum de enfermera geriátrica", "ejemplos currículum enfermera geriátrica", "mejor formato CV enfermera geriátrica"],
    topSkills: ["Cuidado del Paciente", "Manejo de Medicamentos", "Manejo de Enfermedades Crónicas", "Evaluación Geriátrica", "Defensa del Paciente", "Habilidades de Comunicación", "Empatía", "Colaboración en Equipo", "Manejo del Tiempo", "Pensamiento Crítico"],
    atsKeywords: ["Enfermería Geriátrica", "Licencia de Enfermería", "Educación del Paciente", "Monitoreo de Salud", "Planificación de Cuidados", "Cuidado de Ancianos", "Habilidades Clínicas", "Administración de Salud", "Habilidades Interpersonales", "Documentación", "Intervención en Crisis"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera Geriátrica",
      summary: "Enfermera geriátrica dedicada con más de 5 años de experiencia en proporcionar atención integral a pacientes ancianos. Mejoró con éxito las puntuaciones de satisfacción del paciente en un 30% mediante una comunicación efectiva y planes de atención personalizados.",
      skills: ["Cuidado del Paciente", "Manejo de Medicamentos", "Manejo de Enfermedades Crónicas", "Evaluación Geriátrica", "Defensa del Paciente", "Habilidades de Comunicación", "Empatía", "Colaboración en Equipo", "Manejo del Tiempo", "Pensamiento Crítico"],
      experience: [
        {
          title: "Enfermera Geriátrica Sénior",
          company: "Sunrise Senior Living",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje los errores de medicación en un 25% a través de protocolos mejorados de monitoreo del paciente.",
            "Aumenté la movilidad del paciente en un 40% al implementar programas de rehabilitación personalizados.",
            "Lideré un equipo que logró una calificación de satisfacción del 95% en encuestas de atención al paciente.",
          ],
        },
        {
          title: "Enfermera Geriátrica",
          company: "Brookdale Senior Living",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un nuevo sistema de planificación de cuidados que mejoró la eficiencia de la documentación del paciente en un 50%.",
            "Recibí el premio Empleado del Mes por atención excepcional al paciente.",
            "Realicé sesiones de capacitación para el nuevo personal, mejorando el rendimiento del equipo.",
          ],
        },
      ],
      education: [
        { institution: "University of Nursing", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Geriatric Nurse", issuer: "American Nurses Credentialing Center", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Geriatric Nurse en su currículum?", answer: "Un Geriatric Nurse debe incluir experiencia relevante, habilidades clínicas, y certificaciones específicas." },
      { question: "¿Cómo destacar mi currículum de Geriatric Nurse?", answer: "Destacar logros cuantificables y habilidades clave en la atención del paciente." },
      { question: "¿Qué habilidades necesita un Geriatric Nurse?", answer: "Habilidades clave incluyen empatía, comunicación efectiva, y manejo de enfermedades crónicas." },
    ],
  },
  "health-educator": {
    slug: "educador-de-salud",
    title: "Educador de Salud",
    keywords: ["currículum de Educador de Salud", "CV de Educador de Salud", "ejemplo currículum Educador de Salud", "plantilla CV Educador de Salud"],
    searchIntents: ["cómo escribir currículum de Educador de Salud", "ejemplos currículum Educador de Salud", "mejor formato CV Educador de Salud"],
    topSkills: ["Promoción de la Salud", "Alcance Comunitario", "Desarrollo de Programas", "Oratoria", "Evaluación de Salud", "Diseño Curricular", "Cambio de Comportamiento", "Análisis de Datos", "Habilidades Interpersonales", "Competencia Cultural"],
    atsKeywords: ["educación en salud", "salud comunitaria", "programas de bienestar", "salud pública", "comunicación en salud", "educación del paciente", "evaluaciones de salud", "evaluación de programas", "estrategias de promoción de la salud", "involucramiento de partes interesadas", "toma de decisiones basada en datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Educador de Salud",
      summary: "Educador de Salud dedicado con más de 5 años de experiencia en el diseño e implementación de programas de educación en salud. Mejoró con éxito los indicadores de salud comunitaria en un 30% a través de iniciativas de alcance específicas.",
      skills: ["Promoción de la Salud", "Alcance Comunitario", "Desarrollo de Programas", "Oratoria", "Evaluación de Salud", "Diseño Curricular", "Cambio de Comportamiento", "Análisis de Datos", "Habilidades Interpersonales", "Competencia Cultural"],
      experience: [
        {
          title: "Educador de Salud Senior",
          company: "Healthwise Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la participación comunitaria en programas de salud en un 40% a través de estrategias de alcance innovadoras",
            "Desarrollé e implementé un currículo de salud que mejoró la retención del conocimiento en un 25%",
            "Aseguré $50,000 en financiamiento para iniciativas de bienestar comunitario",
          ],
        },
        {
          title: "Educador de Salud",
          company: "Wellness Works Inc.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 100 talleres de salud, mejorando la alfabetización en salud de los participantes en un 35%",
            "Colaboré con organizaciones locales para alcanzar poblaciones desatendidas, aumentando la accesibilidad del programa",
            "Evalué la efectividad del programa, lo que llevó a un aumento del 20% en las puntuaciones de satisfacción de los participantes",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Salud Pública", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Health Education Specialist (CHES)", issuer: "National Commission for Health Education Credentialing, Inc.", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Educador de Salud en su currículum?", answer: "Un Educador de Salud debe incluir detalles sobre su experiencia en la enseñanza, habilidades interpersonales y cualquier certificación relevante." },
      { question: "¿Cómo destacar mi currículum de Educador de Salud?", answer: "Utilice palabras clave relevantes y destaque sus logros cuantificables en la educación y promoción de la salud." },
      { question: "¿Qué habilidades necesita un Educador de Salud?", answer: "Las habilidades clave incluyen promoción de la salud, diseño curricular, oratoria y competencias culturales." },
    ],
  },
  "healthcare": {
    slug: "curriculum-profesional-salud",
    title: "Currículum Profesional de Salud",
    keywords: ["currículum de profesional de salud", "CV de profesional de salud", "ejemplo currículum profesional de salud", "plantilla CV profesional de salud"],
    searchIntents: ["cómo escribir currículum de profesional de salud", "ejemplos currículum profesional de salud", "mejor formato CV profesional de salud"],
    topSkills: ["Atención al Paciente", "Investigación Clínica", "Gestión de la Salud", "Codificación Médica", "Defensa del Paciente", "Enfermería", "Farmacéuticos", "Informática de la Salud", "Aseguramiento de Calidad", "Cumplimiento Regulatorio"],
    atsKeywords: ["atención al paciente", "gestión de la salud", "investigación clínica", "codificación médica", "enfermería", "informática de la salud", "aseguramiento de calidad", "cumplimiento", "regulaciones de salud", "defensa del paciente", "farmacéuticos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum Profesional de Salud",
      summary: "Profesional de salud dedicado con más de 8 años de experiencia en atención al paciente y gestión, logrando un aumento del 25% en la satisfacción de los pacientes a través de una comunicación efectiva y estrategias de atención.",
      skills: ["Atención al Paciente", "Investigación Clínica", "Gestión de la Salud", "Codificación Médica", "Defensa del Paciente", "Enfermería", "Farmacéuticos", "Informática de la Salud", "Aseguramiento de Calidad", "Cumplimiento Regulatorio"],
      experience: [
        {
          title: "Gerente de Salud Senior",
          company: "HealthPlus Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó los índices de satisfacción de los pacientes en un 25% a través de protocolos de atención mejorados",
            "Gestionó un equipo de 15 profesionales de la salud, mejorando la eficiencia del flujo de trabajo en un 30%",
            "Implementó un nuevo sistema de registro electrónico de salud que redujo el tiempo de procesamiento de pacientes en un 15%",
          ],
        },
        {
          title: "Coordinador de Salud",
          company: "CareWell Clinics",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Agilizó el proceso de admisión de pacientes, reduciendo los tiempos de espera en un 20%",
            "Desarrolló programas de educación para pacientes que aumentaron el cumplimiento con los planes de tratamiento en un 40%",
            "Coordinó la atención de más de 300 pacientes, asegurando una entrega de servicios integral",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Healthcare Manager", issuer: "American College of Healthcare Executives", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Profesional de Salud?", answer: "Un currículum de profesional de salud debe incluir experiencia relevante, habilidades específicas, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Profesional de Salud?", answer: "Destacar logros cuantificables y habilidades específicas que se alineen con las necesidades del puesto." },
      { question: "¿Qué habilidades necesita un currículum de Profesional de Salud?", answer: "Las habilidades clave incluyen atención al paciente, gestión de la salud, investigación clínica y cumplimiento regulatorio." },
    ],
  },
  "healthcare-business-manager": {
    slug: "gerente-de-negocios-en-salud",
    title: "Gerente de Negocios en Salud",
    keywords: ["currículum de gerente de negocios en salud", "CV de gerente de negocios en salud", "ejemplo currículum gerente de negocios en salud", "plantilla CV gerente de negocios en salud"],
    searchIntents: ["cómo escribir currículum de gerente de negocios en salud", "ejemplos currículum gerente de negocios en salud", "mejor formato CV gerente de negocios en salud"],
    topSkills: ["Gestión Financiera", "Regulaciones de Salud", "Planificación Estratégica", "Eficiencia Operativa", "Análisis de Datos", "Liderazgo de Equipos", "Gestión de Proyectos", "Optimización de Atención al Paciente", "Presupuestación", "Comunicación con Stakeholders"],
    atsKeywords: ["gestión de salud", "estrategia de negocios", "análisis financiero", "servicios al paciente", "cumplimiento regulatorio", "mejora del rendimiento", "decisiones basadas en datos", "optimización de procesos", "habilidades de liderazgo", "operaciones de salud", "marketing de salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Negocios en Salud",
      summary: "Gerente de Negocios en Salud orientado a resultados con más de 5 años de experiencia en la optimización de operaciones de salud y mejora de servicios de atención al paciente, logrando un aumento del 20% en la eficiencia operativa.",
      skills: ["Gestión Financiera", "Regulaciones de Salud", "Planificación Estratégica", "Eficiencia Operativa", "Análisis de Datos", "Liderazgo de Equipos", "Gestión de Proyectos", "Optimización de Atención al Paciente", "Presupuestación", "Comunicación con Stakeholders"],
      experience: [
        {
          title: "Gerente Senior de Negocios en Salud",
          company: "MediCare Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos en un 30% a través de asociaciones estratégicas y expansión de servicios",
            "Implementé nuevas herramientas de análisis de datos que llevaron a una mejora del 25% en los puntajes de satisfacción del paciente",
            "Reduje los costos operativos en un 15% sin comprometer la calidad del servicio",
          ],
        },
        {
          title: "Analista de Negocios en Salud",
          company: "HealthPlus Corp",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un modelo de previsión financiera que mejoró la precisión del presupuesto en un 40%",
            "Lideré un equipo multifuncional para implementar un nuevo software de gestión de pacientes, resultando en un aumento del 20% en la productividad del personal",
            "Realicé auditorías de cumplimiento que aseguraron una tasa de aprobación del 100% para las inspecciones estatales",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Healthcare Manager", issuer: "American College of Healthcare Executives", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Healthcare Business Manager en su currículum?", answer: "Un Healthcare Business Manager debe incluir su experiencia en gestión financiera, cumplimiento regulatorio y habilidades de liderazgo, así como logros cuantificables en la optimización de servicios de salud." },
      { question: "¿Cómo destacar mi currículum de Healthcare Business Manager?", answer: "Para destacar su currículum, enfoque en resultados medibles y use palabras clave relevantes para el sector de salud y negocios que coincidan con la descripción del trabajo." },
      { question: "¿Qué habilidades necesita un Healthcare Business Manager?", answer: "Un Healthcare Business Manager necesita habilidades en gestión financiera, análisis de datos, liderazgo, planificación estratégica y comprensión de las regulaciones del sector de salud." },
    ],
  },
  "healthcare-worker": {
    slug: "trabajador-de-salud",
    title: "Trabajador de Salud",
    keywords: ["currículum de Trabajador de Salud", "CV de Trabajador de Salud", "ejemplo currículum Trabajador de Salud", "plantilla CV Trabajador de Salud"],
    searchIntents: ["cómo escribir currículum de Trabajador de Salud", "ejemplos currículum Trabajador de Salud", "mejor formato CV Trabajador de Salud"],
    topSkills: ["Cuidado de Pacientes", "Habilidades Clínicas", "Comunicación", "Empatía", "Manejo del Tiempo", "Colaboración en Equipo", "Pensamiento Crítico", "Resolución de Problemas", "Orientación al Detalle", "Adaptabilidad"],
    atsKeywords: ["Evaluación de Pacientes", "Educación en Salud", "Terminología Médica", "Primeros Auxilios", "RCP", "Control de Infecciones", "Gestión de Registros de Salud", "Defensa de Pacientes", "Mejora de Calidad", "Coordinación de Atención", "Trabajo en Equipo Multidisciplinario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador de Salud",
      summary: "Trabajador de Salud dedicado con más de 5 años de experiencia en el cuidado de pacientes y apoyo clínico, reconocido por reducir los tiempos de espera de los pacientes en un 30% a través de una coordinación de atención eficiente.",
      skills: ["Cuidado de Pacientes", "Habilidades Clínicas", "Comunicación", "Empatía", "Manejo del Tiempo", "Colaboración en Equipo", "Pensamiento Crítico", "Resolución de Problemas", "Orientación al Detalle", "Adaptabilidad"],
      experience: [
        {
          title: "Trabajador de Salud Senior",
          company: "MediCare Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del paciente en un 25% a través de una comunicación mejorada y estrategias de atención.",
            "Gestioné un equipo de 5 asistentes de salud, mejorando la eficiencia del flujo de trabajo en un 40%.",
            "Implementé un nuevo sistema de seguimiento de pacientes, reduciendo las inasistencias a citas en un 20%.",
          ],
        },
        {
          title: "Trabajador de Salud",
          company: "City Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné atención compasiva a más de 200 pacientes cada mes, contribuyendo a una mejora del 15% en los resultados generales de los pacientes.",
            "Asistí en la capacitación de nuevo personal, fomentando un ambiente de equipo de apoyo.",
            "Desarrollé materiales educativos para pacientes, lo que llevó a un aumento del 30% en el cumplimiento de los regímenes de tratamiento.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nursing Assistant", issuer: "National Nurse Aide Assessment Program", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Trabajador de Salud en su currículum?", answer: "Un Trabajador de Salud debe incluir su experiencia en el cuidado de pacientes, habilidades clínicas, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Trabajador de Salud?", answer: "Destacar logros específicos y habilidades clave en atención al paciente puede hacer que su currículum se destaque." },
      { question: "¿Qué habilidades necesita un Trabajador de Salud?", answer: "Habilidades clave incluyen comunicación efectiva, empatía, y capacidad para trabajar en equipo." },
    ],
  },
  "home-care-nurse": {
    slug: "enfermera-de-cuidado-en-el-hogar",
    title: "Enfermera de Cuidado en el Hogar",
    keywords: ["currículum de enfermera de cuidado en el hogar", "CV de enfermera de cuidado en el hogar", "ejemplo currículum enfermera de cuidado en el hogar", "plantilla CV enfermera de cuidado en el hogar"],
    searchIntents: ["cómo escribir currículum de enfermera de cuidado en el hogar", "ejemplos currículum enfermera de cuidado en el hogar", "mejor formato CV enfermera de cuidado en el hogar"],
    topSkills: ["Cuidado de pacientes", "Administración de medicamentos", "Cuidado de heridas", "Monitoreo de salud", "Habilidades de comunicación", "Gestión del tiempo", "Cuidado compasivo", "Educación del paciente", "Pensamiento crítico", "Colaboración en equipo"],
    atsKeywords: ["cuidado en el hogar", "evaluación de enfermería", "planificación de cuidados", "abogacía del paciente", "habilidades clínicas", "apoyo emocional", "rehabilitación", "control de infecciones", "apoyo al cuidador", "mantenimiento de registros", "recursos comunitarios"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera de Cuidado en el Hogar",
      summary: "Enfermera de Cuidado en el Hogar dedicada con más de 5 años de experiencia brindando atención excepcional a los pacientes. Mejoró con éxito los índices de satisfacción del paciente en un 30% a través de una comunicación efectiva y planes de cuidado personalizados.",
      skills: ["Cuidado de pacientes", "Administración de medicamentos", "Cuidado de heridas", "Monitoreo de salud", "Habilidades de comunicación", "Gestión del tiempo", "Cuidado compasivo", "Educación del paciente", "Pensamiento crítico", "Colaboración en equipo"],
      experience: [
        {
          title: "Enfermera de Cuidado en el Hogar Senior",
          company: "BrightStar Care",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la satisfacción del paciente en un 30% a través de planes de cuidado personalizados",
            "Gestioné el cuidado de más de 50 pacientes, lo que llevó a una reducción del 20% en las readmisiones hospitalarias",
            "Capacité y orienté a 5 nuevos miembros del personal de enfermería sobre las mejores prácticas en el cuidado en el hogar",
          ],
        },
        {
          title: "Enfermera de Cuidado en el Hogar",
          company: "Visiting Angels",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Brindé atención de enfermería de alta calidad a más de 40 pacientes",
            "Implementé un nuevo sistema de retroalimentación del paciente que mejoró la calidad del servicio",
            "Colaboré con equipos interdisciplinarios para crear planes de cuidado efectivos",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Home Health Nurse", issuer: "American Nurses Credentialing Center", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Home Care Nurse en su currículum?", answer: "Debe incluir habilidades, experiencia laboral relevante y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Home Care Nurse?", answer: "Enfatiza tus logros y personaliza tu currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Home Care Nurse?", answer: "Habilidades en cuidado de pacientes, comunicación y trabajo en equipo son esenciales." },
    ],
  },
  "home-caregiver": {
    slug: "cuidador-a-domicilio",
    title: "Cuidador a Domicilio",
    keywords: ["currículum de cuidador a domicilio", "CV de cuidador a domicilio", "ejemplo currículum cuidador a domicilio", "plantilla CV cuidador a domicilio"],
    searchIntents: ["cómo escribir currículum de cuidador a domicilio", "ejemplos currículum cuidador a domicilio", "mejor formato CV cuidador a domicilio"],
    topSkills: ["Cuidado Compasivo", "Asistencia al Paciente", "Manejo de Medicamentos", "Asistencia en Movilidad", "Limpieza del Hogar", "Preparación de Comidas", "Habilidades de Comunicación", "Manejo del Tiempo", "Resolución de Problemas", "Empatía"],
    atsKeywords: ["cuidador", "cuidado en casa", "cuidado del paciente", "cuidado de ancianos", "cuidado personal", "asistencia", "compasión", "salud", "primeros auxilios", "RCP", "seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Cuidador a Domicilio",
      summary: "Cuidador a Domicilio dedicado con más de 5 años de experiencia en proporcionar cuidado compasivo a clientes ancianos. Mejoró exitosamente la satisfacción del cliente en un 30% a través de planes de cuidado personalizados.",
      skills: ["Cuidado Compasivo", "Asistencia al Paciente", "Manejo de Medicamentos", "Asistencia en Movilidad", "Limpieza del Hogar", "Preparación de Comidas", "Habilidades de Comunicación", "Manejo del Tiempo", "Resolución de Problemas", "Empatía"],
      experience: [
        {
          title: "Cuidador a Domicilio Senior",
          company: "Comfort Keepers",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 30% a través de planes de cuidado personalizados.",
            "Gestioné el cuidado de más de 15 clientes simultáneamente, asegurando una entrega de servicio de alta calidad.",
            "Implementé un nuevo sistema de seguimiento de medicamentos que redujo los errores de medicación en un 25%.",
          ],
        },
        {
          title: "Cuidador a Domicilio",
          company: "Visiting Angels",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné asistencia en la vida diaria a más de 10 clientes ancianos, mejorando su calidad de vida.",
            "Entrené a nuevos cuidadores en las mejores prácticas de cuidado del paciente y protocolos de seguridad.",
            "Resolví exitosamente problemas de clientes, resultando en un aumento del 20% en la retención de clientes.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Home Health Aide", issuer: "National Association for Home Care & Hospice", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Home Caregiver en su currículum?", answer: "Incluir experiencia en cuidado, habilidades relevantes y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Home Caregiver?", answer: "Enfocarse en logros cuantificables y habilidades específicas del cuidado." },
      { question: "¿Qué habilidades necesita un Home Caregiver?", answer: "Compasión, empatía, habilidades de comunicación y manejo del tiempo." },
    ],
  },
  "hospice-administrator": {
    slug: "administrador-de-hospicio",
    title: "Administrador de Hospicio",
    keywords: ["currículum de Administrador de Hospicio", "CV de Administrador de Hospicio", "ejemplo currículum Administrador de Hospicio", "plantilla CV Administrador de Hospicio"],
    searchIntents: ["cómo escribir currículum de Administrador de Hospicio", "ejemplos currículum Administrador de Hospicio", "mejor formato CV Administrador de Hospicio"],
    topSkills: ["Liderazgo", "Gestión de Atención al Paciente", "Cumplimiento Regulatorio", "Gestión de Presupuesto", "Desarrollo del Personal", "Aseguramiento de Calidad", "Colaboración Interdisciplinaria", "Gestión de Crisis", "Administración de Salud", "Comunicación"],
    atsKeywords: ["hospice care", "palliative care", "patient advocacy", "team management", "staff training", "healthcare policies", "performance improvement", "financial oversight", "community outreach", "end-of-life care", "clinical operations"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Administrador de Hospicio",
      summary: "Administrador de Hospicio dedicado con más de 8 años de experiencia en la gestión de servicios de hospicio y en la mejora de los resultados de los pacientes. Aumentó con éxito los índices de satisfacción del paciente en un 30% a través de programas de atención innovadores.",
      skills: ["Liderazgo", "Gestión de Atención al Paciente", "Cumplimiento Regulatorio", "Gestión de Presupuesto", "Desarrollo del Personal", "Aseguramiento de Calidad", "Colaboración Interdisciplinaria", "Gestión de Crisis", "Administración de Salud", "Comunicación"],
      experience: [
        {
          title: "Administrador de Hospicio Senior",
          company: "Gentiva Health Services",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia en la atención al paciente en un 25% mediante procesos optimizados.",
            "Logró una reducción del 15% en los costos operativos al implementar nuevas estrategias de presupuesto.",
            "Lideró un equipo de más de 50 empleados, mejorando las tasas de retención del personal en un 20%.",
          ],
        },
        {
          title: "Administrador de Hospicio",
          company: "Amedisys",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló y ejecutó un programa de capacitación que mejoró las habilidades de los cuidadores, resultando en una mejora del 40% en las calificaciones de atención al paciente.",
            "Colaboró con equipos interdisciplinarios para reducir las tasas de readmisión hospitalaria en un 10%.",
            "Implementó medidas de aseguramiento de calidad que cumplieron con todos los estándares de cumplimiento regulatorio.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Administración de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospice and Palliative Care Administrator", issuer: "National Hospice and Palliative Care Organization", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Administrador de Hospicio en su currículum?", answer: "Un Administrador de Hospicio debe incluir su experiencia en gestión de servicios, habilidades de liderazgo y logros en la mejora de la atención al paciente." },
      { question: "¿Cómo destacar mi currículum de Administrador de Hospicio?", answer: "Resaltar logros cuantificables y habilidades clave relacionadas con la atención al paciente y la gestión de equipos puede ayudar a destacar su currículum." },
      { question: "¿Qué habilidades necesita un Administrador de Hospicio?", answer: "Habilidades clave incluyen liderazgo, gestión de crisis, cumplimiento regulatorio y colaboración interdisciplinaria." },
    ],
  },
  "hospice-care-nurse": {
    slug: "enfermera-de-cuidados-paliativos",
    title: "Enfermera de Cuidados Paliativos",
    keywords: ["currículum de enfermera de cuidados paliativos", "CV de enfermera de cuidados paliativos", "ejemplo currículum enfermera de cuidados paliativos", "plantilla CV enfermera de cuidados paliativos"],
    searchIntents: ["cómo escribir currículum de enfermera de cuidados paliativos", "ejemplos currículum enfermera de cuidados paliativos", "mejor formato CV enfermera de cuidados paliativos"],
    topSkills: ["cuidados paliativos", "evaluación del paciente", "manejo del dolor", "apoyo emocional", "planificación del cuidado", "comunicación", "colaboración en equipo", "cuidados al final de la vida", "documentación clínica", "educación familiar"],
    atsKeywords: ["cuidados paliativos", "enfermería", "cuidado del paciente", "paliativo", "final de la vida", "cuidador", "salud", "clínico", "cuidado de apoyo", "equipo interdisciplinario", "cuidado compasivo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera de Cuidados Paliativos",
      summary: "Enfermera de Cuidados Paliativos compasiva con más de 5 años de experiencia proporcionando cuidados al final de la vida. Manejó exitosamente el cuidado de más de 100 pacientes, asegurando dignidad y confort durante sus etapas finales.",
      skills: ["cuidados paliativos", "evaluación del paciente", "manejo del dolor", "apoyo emocional", "planificación del cuidado", "comunicación", "colaboración en equipo", "cuidados al final de la vida", "documentación clínica", "educación familiar"],
      experience: [
        {
          title: "Enfermera de Cuidados Paliativos Senior",
          company: "Comforting Hands Hospice",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los índices de satisfacción del paciente en un 30% a través de planes de cuidado personalizados.",
            "Manejé exitosamente un promedio de 15 pacientes por semana, asegurando un apoyo integral.",
            "Implementé programas de capacitación para el nuevo personal, mejorando la eficiencia de integración en un 25%.",
          ],
        },
        {
          title: "Enfermera de Cuidados Paliativos",
          company: "Gentle Touch Hospice",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un programa de educación familiar que mejoró la comunicación y el apoyo para las familias.",
            "Colaboré con un equipo interdisciplinario para mejorar los protocolos de manejo del dolor.",
            "Recibí el premio 'Enfermera del Mes' por atención excepcional al paciente en múltiples ocasiones.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospice and Palliative Nurse", issuer: "HPNA", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Hospice Care Nurse en su currículum?", answer: "Incluir experiencia en cuidados paliativos, manejo del dolor y educación familiar." },
      { question: "¿Cómo destacar mi currículum de Hospice Care Nurse?", answer: "Resaltar logros en atención al paciente y habilidades de colaboración en equipo." },
      { question: "¿Qué habilidades necesita un Hospice Care Nurse?", answer: "Habilidades clave incluyen cuidados paliativos, apoyo emocional y comunicación efectiva." },
    ],
  },
  "hospital-lab-tech-lead-summit-pathology": {
    slug: "hospital-lab-tech-lead",
    title: "Líder de Técnicos de Laboratorio Hospitalario",
    keywords: ["currículum de Líder de Técnicos de Laboratorio Hospitalario", "CV de Líder de Técnicos de Laboratorio Hospitalario", "ejemplo currículum Líder de Técnicos de Laboratorio Hospitalario", "plantilla CV Líder de Técnicos de Laboratorio Hospitalario"],
    searchIntents: ["cómo escribir currículum de Líder de Técnicos de Laboratorio Hospitalario", "ejemplos currículum Líder de Técnicos de Laboratorio Hospitalario", "mejor formato CV Líder de Técnicos de Laboratorio Hospitalario"],
    topSkills: ["Gestión de Laboratorio", "Control de Calidad", "Liderazgo de Equipo", "Diagnósticos Clínicos", "Cumplimiento Regulatorio", "Procesamiento de Muestras", "Mantenimiento de Equipos", "Análisis de Datos", "Interacción con Pacientes", "Protocolos de Salud y Seguridad"],
    atsKeywords: ["técnico de laboratorio", "patología", "laboratorio clínico", "aseguramiento de calidad", "manejo de muestras", "pruebas diagnósticas", "gestión de equipo", "estándares de cumplimiento", "laboratorio médico", "informes de datos", "cuidado de pacientes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Líder de Técnicos de Laboratorio Hospitalario",
      summary: "Líder de Técnicos de Laboratorio Hospitalario dedicado con más de 5 años de experiencia en diagnósticos clínicos y gestión de laboratorios, logrando un aumento del 30% en la eficiencia del laboratorio mediante mejoras en los procesos.",
      skills: ["Gestión de Laboratorio", "Control de Calidad", "Liderazgo de Equipo", "Diagnósticos Clínicos", "Cumplimiento Regulatorio", "Procesamiento de Muestras", "Mantenimiento de Equipos", "Análisis de Datos", "Interacción con Pacientes", "Protocolos de Salud y Seguridad"],
      experience: [
        {
          title: "Técnico de Laboratorio Líder",
          company: "Summit Pathology",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el tiempo de respuesta del laboratorio en un 25% mediante flujos de trabajo optimizados",
            "Entrenó y mentoreó a un equipo de 10 técnicos de laboratorio, mejorando el rendimiento y la precisión del equipo",
            "Redujo los costos operativos en un 15% al implementar nuevas prácticas de gestión de inventario",
          ],
        },
        {
          title: "Técnico de Laboratorio",
          company: "HealthCorp Labs",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realizó más de 1,500 pruebas diagnósticas mensuales con una tasa de precisión del 98%",
            "Implementó medidas de control de calidad que llevaron a una reducción del 20% en errores",
            "Colaboró con proveedores de salud para mejorar los resultados del cuidado de pacientes",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Tecnología Médica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Medical Laboratory Scientist Certification", issuer: "American Society for Clinical Pathology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Hospital Lab Tech Lead en su currículum?", answer: "Debe incluir experiencia en gestión de laboratorio, habilidades técnicas y logros en el área." },
      { question: "¿Cómo destacar mi currículum de Hospital Lab Tech Lead?", answer: "Enfatizando logros cuantificables y habilidades clave relacionadas con la gestión de laboratorio." },
      { question: "¿Qué habilidades necesita un Hospital Lab Tech Lead?", answer: "Habilidades en gestión de laboratorio, control de calidad, liderazgo de equipo y atención al paciente." },
    ],
  },
  "hospital-volunteer": {
    slug: "voluntario-hospital",
    title: "Voluntario de Hospital",
    keywords: ["currículum de voluntario de hospital", "CV de voluntario de hospital", "ejemplo currículum voluntario de hospital", "plantilla CV voluntario de hospital"],
    searchIntents: ["cómo escribir currículum de voluntario de hospital", "ejemplos currículum voluntario de hospital", "mejor formato CV voluntario de hospital"],
    topSkills: ["Cuidado de Pacientes", "Comunicación", "Trabajo en Equipo", "Empatía", "Gestión del Tiempo", "Resolución de Problemas", "Adaptabilidad", "Atención al Detalle", "Habilidades Organizacionales", "Conocimientos Médicos Básicos"],
    atsKeywords: ["experiencia de voluntariado", "hospital", "apoyo a pacientes", "atención médica", "servicio comunitario", "primeros auxilios", "interacción con pacientes", "terminología médica", "respuesta a emergencias", "servicio al cliente", "colaboración en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Voluntario de Hospital",
      summary: "Voluntario dedicado con más de 3 años de experiencia asistiendo a profesionales de la salud y brindando atención compasiva a los pacientes. Contribuí con éxito a un aumento del 20% en las puntuaciones de satisfacción de los pacientes a través de una comunicación y apoyo efectivos.",
      skills: ["Cuidado de Pacientes", "Comunicación", "Trabajo en Equipo", "Empatía", "Gestión del Tiempo", "Resolución de Problemas", "Adaptabilidad", "Atención al Detalle", "Habilidades Organizacionales", "Conocimientos Médicos Básicos"],
      experience: [
        {
          title: "Coordinador de Voluntarios",
          company: "City Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la participación de voluntarios en un 30% a través de campañas de reclutamiento",
            "Implementé un programa de capacitación que mejoró la preparación de nuevos voluntarios en un 40%",
            "Recibí el premio de Voluntario del Mes por servicio excepcional",
          ],
        },
        {
          title: "Voluntario de Hospital",
          company: "General Medical Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí a más de 500 pacientes con actividades diarias, mejorando su experiencia en el hospital",
            "Colaboré con el personal médico para optimizar el flujo de pacientes, reduciendo los tiempos de espera en un 15%",
            "Encabecé una campaña de donación que recaudó $2,000 para iniciativas de cuidado de pacientes",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Volunteer Manager", issuer: "National Association of Volunteer Programs", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Voluntario de Hospital en su currículum?", answer: "Incluir experiencia de voluntariado, habilidades de atención al paciente y cualquier formación relevante." },
      { question: "¿Cómo destacar mi currículum de Voluntario de Hospital?", answer: "Destacar logros específicos y habilidades interpersonales, así como cualquier formación adicional relacionada con la salud." },
      { question: "¿Qué habilidades necesita un Voluntario de Hospital?", answer: "Habilidades clave incluyen comunicación efectiva, empatía, y capacidad para trabajar en equipo." },
    ],
  },
  "hospitality": {
    slug: "curriculum-hospitalidad",
    title: "Currículum de Hospitalidad",
    keywords: ["currículum de hospitalidad", "CV de hospitalidad", "ejemplo currículum hospitalidad", "plantilla CV hospitalidad"],
    searchIntents: ["cómo escribir currículum de hospitalidad", "ejemplos currículum hospitalidad", "mejor formato CV hospitalidad"],
    topSkills: ["Servicio al Cliente", "Resolución de Conflictos", "Planificación de Eventos", "Gestión del Tiempo", "Liderazgo de Equipo", "Habilidades de Ventas", "Atención al Detalle", "Habilidades Culinarias", "Multitarea", "Gestión de Presupuestos"],
    atsKeywords: ["gestión de hospitalidad", "servicios al huésped", "operaciones de restaurante", "ventas en hospitalidad", "coordinación de eventos", "capacitación de personal", "operaciones de recepción", "satisfacción del cliente", "servicio de alimentos y bebidas", "tecnología de hospitalidad", "sistemas de reservas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Hospitalidad",
      summary: "Profesional de hospitalidad con más de 5 años de experiencia en servicio al cliente y gestión de eventos, reconocido por aumentar las puntuaciones de satisfacción de los huéspedes en un 20%.",
      skills: ["Servicio al Cliente", "Resolución de Conflictos", "Planificación de Eventos", "Gestión del Tiempo", "Liderazgo de Equipo", "Habilidades de Ventas", "Atención al Detalle", "Habilidades Culinarias", "Multitarea", "Gestión de Presupuestos"],
      experience: [
        {
          title: "Gerente Senior de Hospitalidad",
          company: "The Grand Hotel",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones generales de satisfacción de los huéspedes en un 25% a través de una capacitación renovada en servicio al cliente.",
            "Gestioné un equipo de 15 empleados, mejorando la eficiencia operativa en un 30%.",
            "Desarrollé e implementé un nuevo proceso de planificación de eventos que redujo costos en $10,000 anuales.",
          ],
        },
        {
          title: "Coordinador de Hospitalidad",
          company: "Luxury Resort Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordiné con éxito más de 50 eventos a gran escala con una asistencia promedio de 200 huéspedes.",
            "Logré una tasa de retorno de huéspedes del 40% a través de un servicio excepcional y seguimiento.",
            "Optimicé los procesos de check-in, reduciendo los tiempos de espera en un promedio de 15 minutos.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Hospitality Professional", issuer: "American Hotel and Lodging Educational Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de hospitalidad?", answer: "Un currículum de hospitalidad debe incluir experiencia relevante, habilidades en servicio al cliente, y logros específicos en la gestión de eventos." },
      { question: "¿Cómo destacar mi currículum de hospitalidad?", answer: "Para destacar, asegúrate de resaltar tus logros cuantificables y experiencia en eventos y servicio al cliente." },
      { question: "¿Qué habilidades necesita un currículum de hospitalidad?", answer: "Las habilidades clave incluyen servicio al cliente, gestión del tiempo, y habilidades de planificación de eventos." },
    ],
  },
  "icu-registered-nurse": {
    slug: "curriculum-para-enfermera-registrada-de-uci",
    title: "Currículum para Enfermera Registrada de UCI",
    keywords: ["currículum de enfermera registrada de UCI", "CV de enfermera registrada de UCI", "ejemplo currículum enfermera registrada de UCI", "plantilla CV enfermera registrada de UCI"],
    searchIntents: ["cómo escribir currículum de enfermera registrada de UCI", "ejemplos currículum enfermera registrada de UCI", "mejor formato CV enfermera registrada de UCI"],
    topSkills: ["Gestión de Cuidados Críticos", "Evaluación del Paciente", "Gestión de Ventiladores", "Administración de Medicamentos", "Colaboración en Equipo", "Soporte Vital Cardiaco Avanzado (ACLS)", "Soporte Vital Básico (BLS)", "Educación al Paciente", "Control de Infecciones", "Monitoreo de Telemetría"],
    atsKeywords: ["cuidados críticos", "protocolos de UCI", "cuidado del paciente", "evaluaciones clínicas", "respuesta a emergencias", "prácticas de enfermería", "abogacía del paciente", "terapia intravenosa", "pensamiento crítico", "seguridad del paciente", "trabajo en equipo multidisciplinario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum para Enfermera Registrada de UCI",
      summary: "Enfermera Registrada de UCI dedicada con más de 5 años de experiencia en entornos de cuidados críticos y un historial comprobado de mejora de los resultados de los pacientes en un 20% a través de prácticas de enfermería efectivas.",
      skills: ["Gestión de Cuidados Críticos", "Evaluación del Paciente", "Gestión de Ventiladores", "Administración de Medicamentos", "Colaboración en Equipo", "Soporte Vital Cardiaco Avanzado (ACLS)", "Soporte Vital Básico (BLS)", "Educación al Paciente", "Control de Infecciones", "Monitoreo de Telemetría"],
      experience: [
        {
          title: "Enfermera Senior de UCI",
          company: "St. Mary’s Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré las tasas de recuperación de pacientes en un 25% mediante la implementación de prácticas basadas en evidencia.",
            "Mentoreé y entrené a 10 nuevos miembros del personal de enfermería con un enfoque en los protocolos de cuidados críticos.",
            "Reduje los errores de medicación en un 15% al mejorar los protocolos de comunicación entre el equipo de enfermería.",
          ],
        },
        {
          title: "Enfermera de UCI",
          company: "General Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Manejé con éxito el cuidado de hasta 5 pacientes críticamente enfermos a la vez.",
            "Lideré un proyecto que mejoró la eficiencia del equipo, resultando en una disminución del 30% en los tiempos de espera de los pacientes.",
            "Colaboré con equipos multidisciplinarios para desarrollar planes de cuidado individualizados para los pacientes.",
          ],
        },
      ],
      education: [
        { institution: "University of Nursing", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Critical Care Registered Nurse (CCRN)", issuer: "American Association of Critical-Care Nurses", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un ICU Registered Nurse Resume en su currículum?", answer: "Un currículum de enfermera registrada de UCI debe incluir experiencia en cuidados críticos, habilidades clínicas, certificaciones relevantes y logros destacados." },
      { question: "¿Cómo destacar mi currículum de ICU Registered Nurse Resume?", answer: "Utiliza palabras clave relevantes, resalta logros cuantificables y personaliza tu currículum para cada solicitud." },
      { question: "¿Qué habilidades necesita un ICU Registered Nurse Resume?", answer: "Las habilidades clave incluyen gestión de cuidados críticos, evaluación del paciente, administración de medicamentos y trabajo en equipo multidisciplinario." },
    ],
  },
  "intern-architect": {
    slug: "intern-architect-curriculum",
    title: "Arquitecto Interno",
    keywords: ["currículum de arquitecto interno", "CV de arquitecto interno", "ejemplo currículum arquitecto interno", "plantilla CV arquitecto interno"],
    searchIntents: ["cómo escribir currículum de arquitecto interno", "ejemplos currículum arquitecto interno", "mejor formato CV arquitecto interno"],
    topSkills: ["AutoCAD", "SketchUp", "Revit", "Modelado 3D", "Renderización", "Códigos de construcción", "Gestión de proyectos", "Diseño sostenible", "Comunicación", "Colaboración en equipo"],
    atsKeywords: ["diseño arquitectónico", "documentación de construcción", "análisis del sitio", "desarrollo del diseño", "presentaciones al cliente", "diseño conceptual", "dibujos técnicos", "modelado de información de construcción", "cumplimiento de códigos", "coordinación de proyectos", "software arquitectónico"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Arquitecto Interno",
      summary: "Arquitecto Interno orientado a los detalles con 2 años de experiencia en asistencia en proyectos de diseño y elaboración de planes arquitectónicos. Contribuyó exitosamente a proyectos que aumentaron la satisfacción del cliente en un 30%.",
      skills: ["AutoCAD", "SketchUp", "Revit", "Modelado 3D", "Renderización", "Códigos de construcción", "Gestión de proyectos", "Diseño sostenible", "Comunicación", "Colaboración en equipo"],
      experience: [
        {
          title: "Arquitecto Junior",
          company: "Gensler",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en el diseño y ejecución de un proyecto comercial valorado en $5 millones, mejorando las calificaciones de satisfacción del cliente en un 25%.",
            "Colaboré en un proyecto en equipo que logró una certificación LEED, demostrando compromiso con el diseño sostenible.",
            "Produje más de 100 dibujos detallados, reduciendo las revisiones en un 15% mediante una atención meticulosa a los detalles.",
          ],
        },
        {
          title: "Arquitecto Interno",
          company: "HOK",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a un proyecto residencial que ganó un premio por innovación en diseño.",
            "Desarrollé materiales de presentación que ayudaron a asegurar un proyecto de $2 millones.",
            "Participé en reuniones con clientes, mejorando mis habilidades de comunicación y comprensión de las necesidades del cliente.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Arquitectura", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "LEED Green Associate", issuer: "U.S. Green Building Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Intern Architect en su currículum?", answer: "Debería incluir su experiencia en proyectos, habilidades técnicas y cualquier certificación relevante." },
      { question: "¿Cómo destacar mi currículum de Intern Architect?", answer: "Use un formato claro, resalte sus logros y adapte su currículum a cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Intern Architect?", answer: "Habilidades clave incluyen diseño arquitectónico, modelado 3D, comunicación efectiva y trabajo en equipo." },
    ],
  },
  "intern-nbc": {
    slug: "intern-nbc",
    title: "Intern NBC",
    keywords: ["currículum de Intern NBC", "CV de Intern NBC", "ejemplo currículum Intern NBC", "plantilla CV Intern NBC"],
    searchIntents: ["cómo escribir currículum de Intern NBC", "ejemplos currículum Intern NBC", "mejor formato CV Intern NBC"],
    topSkills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas", "Manejo del tiempo", "Adaptabilidad", "Creatividad", "Investigación", "Pensamiento analítico", "Atención al detalle", "Competencia técnica"],
    atsKeywords: ["Pasantía", "NBC", "Medios", "Broadcasting", "Habilidades de comunicación", "Gestión de proyectos", "Colaboración en equipo", "Habilidades de investigación", "Creación de contenido", "Gestión de redes sociales", "Edición de video"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Intern NBC",
      summary: "Pasantía orientada a los detalles con más de 2 años de experiencia en medios y broadcasting, contribuyendo a proyectos que aumentaron el compromiso de los espectadores en un 30%.",
      skills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas", "Manejo del tiempo", "Adaptabilidad", "Creatividad", "Investigación", "Pensamiento analítico", "Atención al detalle", "Competencia técnica"],
      experience: [
        {
          title: "Pasantía de Marketing",
          company: "NBC Universal",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Asistí en una campaña de marketing que aumentó los seguidores en redes sociales en un 20%",
            "Realicé investigaciones que contribuyeron a un proyecto que generó $50,000 en ingresos por patrocinio",
            "Coordine eventos promocionales que atrajeron a más de 500 asistentes",
          ],
        },
        {
          title: "Pasantía de Creación de Contenido",
          company: "Local News Station",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Produje contenido de video que alcanzó más de 10,000 vistas en redes sociales",
            "Colabore con un equipo para crear un boletín semanal con una tasa de apertura del 25%",
            "Desarrollé e implementé un nuevo sistema de archivo que mejoró la eficiencia de seguimiento de proyectos en un 15%",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Comunicación", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Social Media Marketing Certification", issuer: "HubSpot", date: "2022-09" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Intern NBC en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Intern NBC?", answer: "Resaltar experiencias clave, usar métricas y personalizar para la posición." },
      { question: "¿Qué habilidades necesita un Intern NBC?", answer: "Habilidades en comunicación, trabajo en equipo y manejo de proyectos." },
    ],
  },
  "intern-people-need": {
    slug: "intern-people-need",
    title: "Practicante de Necesidades de Personas",
    keywords: ["currículum de practicante", "CV de practicante", "ejemplo currículum practicante", "plantilla CV practicante"],
    searchIntents: ["cómo escribir currículum de practicante", "ejemplos currículum practicante", "mejor formato CV practicante"],
    topSkills: ["comunicación", "trabajo en equipo", "resolución de problemas", "gestión del tiempo", "adaptabilidad", "investigación", "análisis de datos", "servicio al cliente", "gestión de proyectos", "habilidades técnicas"],
    atsKeywords: ["práctica", "nivel de entrada", "colaboración", "liderazgo", "iniciativa", "creatividad", "atención al detalle", "organización", "habilidades de presentación", "gestión del tiempo", "pensamiento analítico"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Necesidades de Personas",
      summary: "Un practicante motivado con 2 años de experiencia en servicio al cliente y gestión de proyectos, logrando un aumento del 25% en la eficiencia del equipo a través de una colaboración efectiva.",
      skills: ["comunicación", "trabajo en equipo", "resolución de problemas", "gestión del tiempo", "adaptabilidad", "investigación", "análisis de datos", "servicio al cliente", "gestión de proyectos", "habilidades técnicas"],
      experience: [
        {
          title: "Practicante",
          company: "Tech Innovations Inc.",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Mejoró las puntuaciones de satisfacción del cliente en un 30% a través de protocolos de servicio mejorados",
            "Asistió en la finalización de 5 proyectos importantes antes de las fechas límite, aumentando la productividad del departamento en un 15%",
            "Realizó investigación de mercado que contribuyó a una nueva línea de productos, proyectada para generar $500,000 en ingresos",
          ],
        },
        {
          title: "Practicante",
          company: "Global Solutions LLC",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Desarrolló un nuevo sistema de archivo que redujo el tiempo de recuperación de documentos en un 40%",
            "Apoyó al equipo de marketing en el lanzamiento de una campaña que alcanzó a 10,000 clientes potenciales",
            "Colaboró con equipos interfuncionales para optimizar procesos, resultando en una reducción del 20% en el tiempo de entrega de proyectos",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Certified Project Management Associate", issuer: "Project Management Institute", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Practicante de Necesidades de Personas en su currículum?", answer: "Un practicante debe incluir su experiencia relevante, habilidades técnicas y logros significativos." },
      { question: "¿Cómo destacar mi currículum de Practicante de Necesidades de Personas?", answer: "Utiliza un formato claro y conciso, enfatiza tus habilidades y logros, y adapta tu currículum a la descripción del trabajo." },
      { question: "¿Qué habilidades necesita un Practicante de Necesidades de Personas?", answer: "Las habilidades clave incluyen comunicación, trabajo en equipo, y gestión del tiempo." },
    ],
  },
  "intern-xactly-corporation": {
    slug: "intern-en-xactly-corporation",
    title: "Practicante en Xactly Corporation",
    keywords: ["currículum de practicante", "CV de practicante", "ejemplo currículum practicante", "plantilla CV practicante"],
    searchIntents: ["cómo escribir currículum de practicante", "ejemplos currículum practicante", "mejor formato CV practicante"],
    topSkills: ["Análisis de Datos", "Salesforce", "Gestión de Relaciones con Clientes", "Excel", "Habilidades de Presentación", "Colaboración en Equipo", "Resolución de Problemas", "Comunicación", "Gestión del Tiempo", "Adaptabilidad"],
    atsKeywords: ["práctica", "Xactly Corporation", "análisis de datos", "CRM", "trabajo en equipo", "habilidades de comunicación", "salesforce", "Excel", "presentación", "gestión de proyectos", "resolución de problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante en Xactly Corporation",
      summary: "Practicante orientado a los detalles y motivado con 1 año de experiencia en análisis de datos y sistemas de CRM, contribuyendo a una mejora del 15% en la precisión de los informes de ventas.",
      skills: ["Análisis de Datos", "Salesforce", "Gestión de Relaciones con Clientes", "Excel", "Habilidades de Presentación", "Colaboración en Equipo", "Resolución de Problemas", "Comunicación", "Gestión del Tiempo", "Adaptabilidad"],
      experience: [
        {
          title: "Practicante de Análisis de Datos",
          company: "Xactly Corporation",
          startDate: "2023-05",
          isCurrent: true,
          achievements: [
            "Contribuyó a proyectos de visualización de datos que mejoraron la eficiencia de informes en un 20%.",
            "Asistió en la gestión de datos de CRM, lo que llevó a un aumento del 10% en las calificaciones de satisfacción del cliente.",
            "Colaboró con equipos multifuncionales para optimizar los procesos de datos, reduciendo el tiempo de respuesta en un 15%.",
          ],
        },
        {
          title: "Practicante de Marketing",
          company: "Tech Company",
          startDate: "2022-06",
          endDate: "2023-04",
          achievements: [
            "Desarrolló materiales de marketing que aumentaron la asistencia a eventos en un 30%.",
            "Realizó investigaciones de mercado que identificaron segmentos clave de clientes, influyendo en el desarrollo de productos.",
            "Creó contenido para redes sociales que incrementó las tasas de participación en un 25%.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Administración de Empresas", startDate: "2020-08", endDate: "2024-05" },
      ],
      certifications: [
        { name: "Salesforce Administrator", issuer: "Salesforce", date: "2023-08" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Practicante en Xactly Corporation en su currículum?", answer: "Incluir experiencias relevantes de prácticas, habilidades técnicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Practicante en Xactly Corporation?", answer: "Enfocarse en las habilidades clave y los logros que demuestran impacto en proyectos anteriores." },
      { question: "¿Qué habilidades necesita un Practicante en Xactly Corporation?", answer: "Habilidades en análisis de datos, CRM, Salesforce, y comunicación efectiva." },
    ],
  },
  "licensed-graduate-social-worker": {
    slug: "trabajador-social-titulado",
    title: "Trabajador Social Titulado",
    keywords: ["currículum de Trabajador Social Titulado", "CV de Trabajador Social Titulado", "ejemplo currículum Trabajador Social Titulado", "plantilla CV Trabajador Social Titulado"],
    searchIntents: ["cómo escribir currículum de Trabajador Social Titulado", "ejemplos currículum Trabajador Social Titulado", "mejor formato CV Trabajador Social Titulado"],
    topSkills: ["Intervención en Crisis", "Técnicas de Consejería", "Gestión de Casos", "Defensa de Derechos", "Competencia Cultural", "Evaluación de Salud Mental", "Terapia de Grupo", "Alcance Comunitario", "Defensa del Paciente", "Redacción de Informes"],
    atsKeywords: ["Licensed Graduate Social Worker", "trabajo social", "salud mental", "gestión de casos", "consejería", "terapia", "evaluación del cliente", "apoyo comunitario", "defensa", "intervención en crisis", "terapia de grupo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador Social Titulado",
      summary: "Trabajador Social Titulado dedicado con más de 5 años de experiencia en la prestación de servicios sociales integrales. Mejoró exitosamente los resultados de los clientes en un 30% a través de una gestión de casos efectiva y defensa de derechos.",
      skills: ["Intervención en Crisis", "Técnicas de Consejería", "Gestión de Casos", "Defensa de Derechos", "Competencia Cultural", "Evaluación de Salud Mental", "Terapia de Grupo", "Alcance Comunitario", "Defensa del Paciente", "Redacción de Informes"],
      experience: [
        {
          title: "Trabajador Social Senior",
          company: "Greenwood Mental Health Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la retención de clientes en un 25% a través de planes de atención personalizados",
            "Gestionó una carga de casos de más de 50 clientes, logrando una tasa de satisfacción del 90%",
            "Desarrolló un programa de alcance comunitario que resultó en un aumento del 40% en la utilización de servicios",
          ],
        },
        {
          title: "Trabajador Social",
          company: "Hope Family Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordinó exitosamente más de 100 sesiones de apoyo familiar, lo que condujo a una mejora en la dinámica familiar",
            "Logró una reducción del 15% en incidentes de crisis de clientes a través de estrategias de intervención específicas",
            "Colaboró con agencias locales para mejorar la disponibilidad de recursos para los clientes",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Trabajo Social", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Licensed Graduate Social Worker", issuer: "State Board of Social Work Examiners", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Licensed Graduate Social Worker en su currículum?", answer: "Un Licensed Graduate Social Worker debe incluir su experiencia laboral, habilidades específicas, certificaciones y logros relevantes." },
      { question: "¿Cómo destacar mi currículum de Licensed Graduate Social Worker?", answer: "Para destacar su currículum, utilice palabras clave relevantes, resalte logros cuantificables y personalice su experiencia para el trabajo específico al que está aplicando." },
      { question: "¿Qué habilidades necesita un Licensed Graduate Social Worker?", answer: "Un Licensed Graduate Social Worker necesita habilidades en intervención en crisis, gestión de casos, consejería, y una fuerte competencia cultural, entre otras." },
    ],
  },
  "licensed-vocational-nurse": {
    slug: "enfermera-licenciada-en-cuidado-de-salud",
    title: "Enfermera Licenciada en Cuidado de Salud",
    keywords: ["currículum de enfermera licenciada", "CV de enfermera licenciada", "ejemplo currículum enfermera licenciada", "plantilla CV enfermera licenciada"],
    searchIntents: ["cómo escribir currículum de enfermera licenciada", "ejemplos currículum enfermera licenciada", "mejor formato CV enfermera licenciada"],
    topSkills: ["Cuidado del Paciente", "Administración de Medicamentos", "Cuidado de Heridas", "Monitoreo de Signos Vitales", "Educación al Paciente", "Terapia IV", "Apoyo Emocional", "Colaboración en Equipo", "Documentación en Salud", "Soporte Vital Básico"],
    atsKeywords: ["Enfermera Licenciada en Cuidado de Salud", "LVN", "cuidado del paciente", "terminología médica", "habilidades clínicas", "procedimientos de enfermería", "evaluación de salud", "seguridad del paciente", "control de infecciones", "respuesta a emergencias", "enfermera licenciada"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera Licenciada en Cuidado de Salud",
      summary: "Enfermera Licenciada en Cuidado de Salud dedicada con más de 5 años de experiencia en la entrega de atención de alta calidad a pacientes en diversos entornos de salud. Historial comprobado de mejora en los índices de satisfacción del paciente en un 20% a través de una comunicación efectiva y atención compasiva.",
      skills: ["Cuidado del Paciente", "Administración de Medicamentos", "Cuidado de Heridas", "Monitoreo de Signos Vitales", "Educación al Paciente", "Terapia IV", "Apoyo Emocional", "Colaboración en Equipo", "Documentación en Salud", "Soporte Vital Básico"],
      experience: [
        {
          title: "Enfermera Licenciada en Cuidado de Salud Senior",
          company: "Sunrise Health Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el tiempo de recuperación de los pacientes en un 15% a través de una gestión efectiva del cuidado de heridas.",
            "Capacitado a 5 nuevos miembros del personal de enfermería en protocolos de cuidado del paciente, mejorando la eficiencia del equipo.",
            "Gestionó exitosamente una carga de casos de hasta 30 pacientes diarios con una tasa de satisfacción del 98%.",
          ],
        },
        {
          title: "Enfermera Licenciada en Cuidado de Salud",
          company: "Greenwood Medical Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Administró medicamentos a pacientes con una tasa de cumplimiento del 100%.",
            "Realizó evaluaciones de salud que contribuyeron a una reducción del 10% en las readmisiones hospitalarias.",
            "Brindó apoyo emocional y educación a los pacientes, lo que llevó a una mejora en los resultados de salud.",
          ],
        },
      ],
      education: [
        { institution: "City College of Nursing", degree: "Título de Asociado", field: "Enfermería", startDate: "2014-08", endDate: "2016-05" },
      ],
      certifications: [
        { name: "Licensed Vocational Nurse Certification", issuer: "California Board of Vocational Nursing and Psychiatric Technicians", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Licensed Vocational Nurse en su currículum?", answer: "Debería incluir experiencia en cuidado del paciente, habilidades clínicas y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Licensed Vocational Nurse?", answer: "Utiliza palabras clave relevantes y destaca tus logros en cada puesto." },
      { question: "¿Qué habilidades necesita un Licensed Vocational Nurse?", answer: "Las habilidades clave incluyen cuidado del paciente, administración de medicamentos y trabajo en equipo." },
    ],
  },
  "medical-assistant-x-ray-tech": {
    slug: "asistente-medico-tecnico-rayos-x",
    title: "Asistente Médico Técnico en Rayos X",
    keywords: ["currículum de Asistente Médico Técnico en Rayos X", "CV de Asistente Médico Técnico en Rayos X", "ejemplo currículum Asistente Médico Técnico en Rayos X", "plantilla CV Asistente Médico Técnico en Rayos X"],
    searchIntents: ["cómo escribir currículum de Asistente Médico Técnico en Rayos X", "ejemplos currículum Asistente Médico Técnico en Rayos X", "mejor formato CV Asistente Médico Técnico en Rayos X"],
    topSkills: ["Cuidado del Paciente", "Imágenes Radiográficas", "Terminología Médica", "Punción Venosa", "Registros Electrónicos de Salud (EHR)", "Radiografía Diagnóstica", "Control de Infecciones", "Evaluación del Paciente", "Pensamiento Crítico", "Habilidades de Comunicación"],
    atsKeywords: ["Asistente Médico", "Técnico en Rayos X", "Radiología", "Cuidado del Paciente", "Atención Médica", "Habilidades Clínicas", "Procedimientos Médicos", "Registros de Salud", "Imágenes Diagnósticas", "Soporte al Paciente", "Equipos Médicos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Médico Técnico en Rayos X",
      summary: "Asistente Médico dedicado con más de 5 años de experiencia en imágenes radiográficas y cuidado del paciente. Historial comprobado de mejorar la satisfacción del paciente en un 20% a través de una comunicación efectiva y atención compasiva.",
      skills: ["Cuidado del Paciente", "Imágenes Radiográficas", "Terminología Médica", "Punción Venosa", "Registros Electrónicos de Salud (EHR)", "Radiografía Diagnóstica", "Control de Infecciones", "Evaluación del Paciente", "Pensamiento Crítico", "Habilidades de Comunicación"],
      experience: [
        {
          title: "Asistente Médico Senior Técnico en Rayos X",
          company: "HealthFirst Medical Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el flujo de pacientes en un 30% al optimizar los procesos de programación de citas.",
            "Administré más de 500 procedimientos radiográficos con una tasa de satisfacción del paciente del 98%.",
            "Capacité a 10 nuevos miembros del personal sobre seguridad radiológica y técnicas de cuidado del paciente.",
          ],
        },
        {
          title: "Asistente Médico",
          company: "City Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en más de 1,000 exámenes de pacientes, asegurando una documentación y atención exhaustivas.",
            "Implementé un nuevo sistema electrónico para el seguimiento de citas de pacientes, reduciendo los tiempos de espera en un 15%.",
            "Jugué un papel clave en un equipo que logró una tasa de cumplimiento del 95% durante auditorías de salud.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medical Assistant (CMA)", issuer: "American Association of Medical Assistants", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente Médico Técnico en Rayos X en su currículum?", answer: "Un Asistente Médico Técnico en Rayos X debe incluir habilidades clave, experiencia laboral relevante y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Asistente Médico Técnico en Rayos X?", answer: "Para destacar su currículum, incluya logros cuantificables y personalice su experiencia para el puesto." },
      { question: "¿Qué habilidades necesita un Asistente Médico Técnico en Rayos X?", answer: "Las habilidades clave incluyen cuidado del paciente, manejo de equipos radiológicos y habilidades de comunicación." },
    ],
  },
  "medical-biller": {
    slug: "facturador-medico",
    title: "Facturador Médico",
    keywords: ["currículum de facturador médico", "CV de facturador médico", "ejemplo currículum facturador médico", "plantilla CV facturador médico"],
    searchIntents: ["cómo escribir currículum de facturador médico", "ejemplos currículum facturador médico", "mejor formato CV facturador médico"],
    topSkills: ["Facturación y Codificación", "Verificación de Seguros", "Registro de Pagos", "Cuentas por Cobrar", "Comunicación con Pacientes", "Terminología Médica", "Entrada de Datos", "Atención al Detalle", "Resolución de Problemas", "Cumplimiento Normativo"],
    atsKeywords: ["facturación médica", "ICD-10", "codificación CPT", "reclamos de seguros", "ciclo de ingresos", "facturación en salud", "sistemas EHR", "software de facturación", "cuentas de pacientes", "procesamiento de reclamos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Facturador Médico",
      summary: "Facturador Médico orientado a los detalles con más de 5 años de experiencia en facturación y codificación en el sector salud. Reduje con éxito las tasas de rechazo de reclamos en un 20%, asegurando una gestión oportuna del ciclo de ingresos.",
      skills: ["Facturación y Codificación", "Verificación de Seguros", "Registro de Pagos", "Cuentas por Cobrar", "Comunicación con Pacientes", "Terminología Médica", "Entrada de Datos", "Atención al Detalle", "Resolución de Problemas", "Cumplimiento Normativo"],
      experience: [
        {
          title: "Facturador Médico Senior",
          company: "HealthFirst Medical Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la recuperación de ingresos en un 30% a través de procesos de presentación de reclamos mejorados",
            "Reduje los días promedio en cuentas por cobrar de 45 a 30 días",
            "Implementé un programa de capacitación para el nuevo personal, mejorando la eficiencia del equipo en un 25%",
          ],
        },
        {
          title: "Facturador Médico",
          company: "CareWell Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una tasa de aprobación de reclamos del 95% en la primera presentación",
            "Optimicé los procesos de facturación, reduciendo el tiempo del ciclo de facturación en un 15%",
            "Gestioné cuentas de pacientes de manera efectiva, resultando en un aumento del 10% en las puntuaciones de satisfacción del paciente",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Información de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Biller (CPB)", issuer: "AAPC", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Facturador Médico en su currículum?", answer: "Un Facturador Médico debe incluir sus habilidades en facturación y codificación, experiencia laboral relevante, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Facturador Médico?", answer: "Para destacar su currículum, utilice palabras clave relevantes, resalte logros cuantificables y mantenga un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un Facturador Médico?", answer: "Un Facturador Médico necesita habilidades en facturación y codificación, atención al detalle, comunicación efectiva y comprensión de la normativa de salud." },
    ],
  },
  "medical-device-engineer": {
    slug: "ingeniero-de-dispositivos-medicos",
    title: "Ingeniero de Dispositivos Médicos",
    keywords: ["currículum de ingeniero de dispositivos médicos", "CV de ingeniero de dispositivos médicos", "ejemplo currículum ingeniero de dispositivos médicos", "plantilla CV ingeniero de dispositivos médicos"],
    searchIntents: ["cómo escribir currículum de ingeniero de dispositivos médicos", "ejemplos currículum ingeniero de dispositivos médicos", "mejor formato CV ingeniero de dispositivos médicos"],
    topSkills: ["Diseño CAD", "Cumplimiento Normativo", "Gestión de Proyectos", "Prototipado", "Pruebas y Validación", "Aseguramiento de Calidad", "Gestión de Riesgos", "Principios de Ingeniería Biomédica", "Documentación Técnica", "Colaboración Interfuncional"],
    atsKeywords: ["diseño de dispositivos médicos", "regulaciones de la FDA", "normas ISO", "control de diseño", "verificación y validación", "ensayos clínicos", "gestión de la cadena de suministro", "desarrollo de productos", "sistemas electromecánicos", "biocompatibilidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Ingeniero de Dispositivos Médicos",
      summary: "Ingeniero de Dispositivos Médicos experimentado con más de 6 años en la industria, especializado en desarrollo de productos y cumplimiento normativo. Lideré proyectos que resultaron en una reducción del 30% en el tiempo de lanzamiento al mercado para nuevos dispositivos.",
      skills: ["Diseño CAD", "Cumplimiento Normativo", "Gestión de Proyectos", "Prototipado", "Pruebas y Validación", "Aseguramiento de Calidad", "Gestión de Riesgos", "Principios de Ingeniería Biomédica", "Documentación Técnica", "Colaboración Interfuncional"],
      experience: [
        {
          title: "Ingeniero Senior de Dispositivos Médicos",
          company: "Medtronic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo interfuncional para desarrollar un nuevo dispositivo cardíaco, lo que resultó en un aumento del 25% en los puntajes de satisfacción del paciente.",
            "Implementé un proceso de control de calidad que redujo los defectos en un 40%, ahorrando a la empresa $500,000 anuales.",
            "Optimicé el proceso de diseño, disminuyendo el tiempo de finalización del proyecto en un 30%.",
          ],
        },
        {
          title: "Ingeniero de Dispositivos Médicos",
          company: "Boston Scientific",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al desarrollo de una herramienta quirúrgica mínimamente invasiva que mejoró el tiempo de recuperación del paciente en un 15%.",
            "Realicé más de 50 pruebas de productos asegurando el cumplimiento con los estándares de la FDA y la ISO 13485.",
            "Colaboré con el marketing para mejorar la experiencia del usuario, lo que llevó a un aumento del 20% en la adopción del producto.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ingeniería Biomédica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Quality Engineer", issuer: "American Society for Quality", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Ingeniero de Dispositivos Médicos en su currículum?", answer: "Debe incluir su experiencia laboral relevante, habilidades técnicas específicas y ejemplos de proyectos exitosos." },
      { question: "¿Cómo destacar mi currículum de Ingeniero de Dispositivos Médicos?", answer: "Enfatice sus logros cuantificables y habilidades que se alineen con los requisitos del puesto." },
      { question: "¿Qué habilidades necesita un Ingeniero de Dispositivos Médicos?", answer: "Necesita habilidades en diseño CAD, cumplimiento normativo y gestión de proyectos, entre otras." },
    ],
  },
  "medical-doctor": {
    slug: "medico-cirujano-curriculum",
    title: "Médico Cirujano",
    keywords: ["currículum de médico cirujano", "CV de médico cirujano", "ejemplo currículum médico cirujano", "plantilla CV médico cirujano"],
    searchIntents: ["cómo escribir currículum de médico cirujano", "ejemplos currículum médico cirujano", "mejor formato CV médico cirujano"],
    topSkills: ["Atención al Paciente", "Diagnóstico y Tratamiento", "Habilidades Quirúrgicas", "Comunicación", "Empatía", "Gestión del Tiempo", "Colaboración en Equipo", "Investigación Médica", "Resolución de Problemas", "Pensamiento Crítico"],
    atsKeywords: ["médico", "médico cirujano", "gestión de pacientes", "habilidades clínicas", "habilidades diagnósticas", "planificación de tratamientos", "ética médica", "atención de emergencia", "políticas de salud", "habilidades interpersonales", "defensa del paciente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Médico Cirujano",
      summary: "Médico Cirujano dedicado con más de 5 años de experiencia en atención al paciente y un historial comprobado de mejorar los resultados de los pacientes en un 20%. Experto en diagnóstico, tratamiento y gestión de condiciones médicas complejas.",
      skills: ["Atención al Paciente", "Diagnóstico y Tratamiento", "Habilidades Quirúrgicas", "Comunicación", "Empatía", "Gestión del Tiempo", "Colaboración en Equipo", "Investigación Médica", "Resolución de Problemas", "Pensamiento Crítico"],
      experience: [
        {
          title: "Médico Senior",
          company: "General Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré los tiempos de recuperación de pacientes en un 30% mediante la implementación de un nuevo protocolo de atención.",
            "Gestioné una carga de trabajo de más de 100 pacientes por semana con una calificación de satisfacción del 95%.",
            "Dirigí un equipo para reducir las tasas de readmisión hospitalaria en un 15%.",
          ],
        },
        {
          title: "Médico Residente",
          company: "City Medical Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diagnostiqué y traté exitosamente a más de 300 pacientes durante la residencia.",
            "Participé en una investigación que contribuyó a una publicación en una revista revisada por pares.",
            "Realicé talleres de educación en salud que mejoraron la conciencia de salud de la comunidad.",
          ],
        },
      ],
      education: [
        { institution: "Harvard Medical School", degree: "M.D.", field: "Medicina", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Board Certified in Family Medicine", issuer: "American Board of Family Medicine", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Médico Cirujano en su currículum?", answer: "Un Médico Cirujano debe incluir su educación, experiencia laboral, habilidades clínicas, certificaciones y logros destacados." },
      { question: "¿Cómo destacar mi currículum de Médico Cirujano?", answer: "Destaca tus logros cuantificables, usa palabras clave relevantes y personaliza tu currículum para cada postulación." },
      { question: "¿Qué habilidades necesita un Médico Cirujano?", answer: "Un Médico Cirujano necesita habilidades en atención al paciente, diagnóstico, tratamiento, habilidades quirúrgicas y comunicación efectiva." },
    ],
  },
  "medical-dosimetrist": {
    slug: "dosimetrista-medico",
    title: "Dosimetrista Médico",
    keywords: ["currículum de dosimetrista médico", "CV de dosimetrista médico", "ejemplo currículum dosimetrista médico", "plantilla CV dosimetrista médico"],
    searchIntents: ["cómo escribir currículum de dosimetrista médico", "ejemplos currículum dosimetrista médico", "mejor formato CV dosimetrista médico"],
    topSkills: ["Planificación de Tratamiento con Radiación", "Posicionamiento de Pacientes", "Aseguramiento de Calidad", "Cálculo de Dosis", "Colaboración Clínica", "Entrega de Tratamiento", "Dominio de Tecnología", "Protocolos de Seguridad del Paciente", "Habilidades de Comunicación", "Resolución de Problemas"],
    atsKeywords: ["dosimetría médica", "terapia de radiación", "planificación de tratamiento", "cuidado del paciente", "certificación de dosimetrista", "dosimetría clínica", "física médica", "técnicas de radioterapia", "optimización de dosis", "gestión del paciente", "cuidado colaborativo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Dosimetrista Médico",
      summary: "Dosimetrista Médico dedicado con más de 5 años de experiencia en planificación de tratamientos de radiación y cuidado de pacientes. Mejoró con éxito la precisión del tratamiento en un 20%, mejorando los resultados para los pacientes.",
      skills: ["Planificación de Tratamiento con Radiación", "Posicionamiento de Pacientes", "Aseguramiento de Calidad", "Cálculo de Dosis", "Colaboración Clínica", "Entrega de Tratamiento", "Dominio de Tecnología", "Protocolos de Seguridad del Paciente", "Habilidades de Comunicación", "Resolución de Problemas"],
      experience: [
        {
          title: "Dosimetrista Médico Senior",
          company: "Radiation Oncology Associates",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Logré un aumento del 20% en la precisión del tratamiento a través de técnicas de planificación innovadoras.",
            "Reduje los tiempos de tratamiento de pacientes en un 15% manteniendo los estándares de seguridad.",
            "Desarrollé e implementé un protocolo de aseguramiento de calidad que mejoró el cumplimiento en un 30%.",
          ],
        },
        {
          title: "Dosimetrista Médico",
          company: "City Hospital Cancer Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a la implementación exitosa de un nuevo sistema de planificación de tratamientos.",
            "Colaboré con equipos interdisciplinarios para mejorar el cuidado de los pacientes, resultando en una tasa de satisfacción del 95%.",
            "Entrené al nuevo personal en prácticas de dosimetría y protocolos de seguridad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Dosimetría Médica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medical Dosimetrist (CMD)", issuer: "Medical Dosimetrist Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Dosimetrista Médico en su currículum?", answer: "Un Dosimetrista Médico debe incluir su experiencia en planificación de tratamientos, habilidades técnicas, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Dosimetrista Médico?", answer: "Destaca tus logros y certificaciones, y utiliza palabras clave relevantes en tu currículum." },
      { question: "¿Qué habilidades necesita un Dosimetrista Médico?", answer: "Las habilidades clave incluyen planificación de tratamiento, aseguramiento de calidad y habilidades de comunicación efectiva." },
    ],
  },
  "medical-imaging-analyst-at-vitaa-medical-solutions": {
    slug: "analista-de-imagenes-medicas",
    title: "Analista de Imágenes Médicas",
    keywords: ["currículum de Analista de Imágenes Médicas", "CV de Analista de Imágenes Médicas", "ejemplo currículum Analista de Imágenes Médicas", "plantilla CV Analista de Imágenes Médicas"],
    searchIntents: ["cómo escribir currículum de Analista de Imágenes Médicas", "ejemplos currículum Analista de Imágenes Médicas", "mejor formato CV Analista de Imágenes Médicas"],
    topSkills: ["Análisis de Imágenes", "Interpretación de Datos", "Software de Radiología", "Aseguramiento de Calidad", "Gestión de Pacientes", "Informes Técnicos", "Cumplimiento Regulatorio", "Colaboración en Equipo", "Imágenes Diagnósticas", "Metodologías de Investigación"],
    atsKeywords: ["Imágenes Médicas", "Radiología", "Análisis de Datos", "Atención Médica", "Equipo de Diagnóstico", "Cuidado del Paciente", "Técnicas de Imágenes", "Investigación Clínica", "Control de Calidad", "Habilidades Técnicas", "Resolución de Problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Analista de Imágenes Médicas",
      summary: "Analista de Imágenes Médicas orientado a los detalles con más de 5 años de experiencia en imágenes diagnósticas e interpretación de datos, logrando un aumento del 20% en la eficiencia operativa mediante procesos optimizados.",
      skills: ["Análisis de Imágenes", "Interpretación de Datos", "Software de Radiología", "Aseguramiento de Calidad", "Gestión de Pacientes", "Informes Técnicos", "Cumplimiento Regulatorio", "Colaboración en Equipo", "Imágenes Diagnósticas", "Metodologías de Investigación"],
      experience: [
        {
          title: "Analista Senior de Imágenes Médicas",
          company: "Vitaa Medical Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la precisión de las imágenes en un 30% mediante técnicas de análisis avanzadas.",
            "Reduje el tiempo de entrega de informes en un 15%, mejorando la satisfacción del paciente.",
            "Dirigí un proyecto en equipo que mejoró los protocolos de imágenes, resultando en una disminución del 25% en errores.",
          ],
        },
        {
          title: "Analista de Imágenes Médicas",
          company: "Radiant Health Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé un nuevo programa de aseguramiento de calidad de imágenes que redujo las discrepancias en un 18%.",
            "Colaboré con médicos para refinar los criterios diagnósticos, mejorando la precisión diagnóstica.",
            "Capacité a 10 nuevos miembros del personal en el software de imágenes y mejores prácticas, mejorando el rendimiento del equipo.",
          ],
        },
      ],
      education: [
        { institution: "University of Health Sciences", degree: "B.S.", field: "Tecnología de Imágenes Médicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Radiology Technician", issuer: "American Registry of Radiologic Technologists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Analista de Imágenes Médicas en su currículum?", answer: "Un Analista de Imágenes Médicas debe incluir habilidades técnicas, experiencia relevante, logros cuantificables y certificaciones en su currículum." },
      { question: "¿Cómo destacar mi currículum de Analista de Imágenes Médicas?", answer: "Para destacar su currículum, resalte sus logros, utilice palabras clave relevantes y adapte su currículum a la descripción del trabajo." },
      { question: "¿Qué habilidades necesita un Analista de Imágenes Médicas?", answer: "Un Analista de Imágenes Médicas necesita habilidades en análisis de imágenes, interpretación de datos, manejo de software de radiología y aseguramiento de calidad." },
    ],
  },
  "medical-intern": {
    slug: "practicante-medico",
    title: "Practicante Médico",
    keywords: ["currículum de practicante médico", "CV de practicante médico", "ejemplo currículum practicante médico", "plantilla CV practicante médico"],
    searchIntents: ["cómo escribir currículum de practicante médico", "ejemplos currículum practicante médico", "mejor formato CV practicante médico"],
    topSkills: ["Cuidado del Paciente", "Investigación Clínica", "Terminología Médica", "Anatomía y Fisiología", "Farmacología", "Procedimientos Diagnósticos", "Planes de Tratamiento", "Registros de Salud Electrónicos (EHR)", "Comunicación Interpersonal", "Gestión del Tiempo"],
    atsKeywords: ["pasantía", "educación médica", "evaluación del paciente", "habilidades clínicas", "documentación médica", "equipo de atención médica", "confidencialidad del paciente", "ensayos clínicos", "ética médica", "primeros auxilios", "certificación BLS"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante Médico",
      summary: "Practicante médico con 2 años de experiencia práctica en entornos clínicos, especializado en el cuidado del paciente y la investigación médica, contribuyendo a un aumento del 20% en las puntuaciones de satisfacción del paciente.",
      skills: ["Cuidado del Paciente", "Investigación Clínica", "Terminología Médica", "Anatomía y Fisiología", "Farmacología", "Procedimientos Diagnósticos", "Planes de Tratamiento", "Registros de Salud Electrónicos (EHR)", "Comunicación Interpersonal", "Gestión del Tiempo"],
      experience: [
        {
          title: "Practicante Médico",
          company: "Mercy Hospital",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Asistí en más de 100 evaluaciones de pacientes, contribuyendo a una mejora del 15% en la precisión del diagnóstico.",
            "Implementé un nuevo protocolo de seguimiento de pacientes que redujo las ausencias a citas en un 30%.",
            "Colaboré con equipos de atención médica para mejorar los planes de cuidado del paciente, lo que llevó a un aumento del 25% en la adherencia al tratamiento.",
          ],
        },
        {
          title: "Practicante Clínico",
          company: "St. Jude's Medical Center",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Realicé historiales clínicos completos para más de 50 pacientes semanalmente.",
            "Participé en proyectos de investigación clínica que resultaron en dos artículos publicados.",
            "Recibí una mención por la interacción y cuidado ejemplar con los pacientes.",
          ],
        },
      ],
      education: [
        { institution: "Harvard University", degree: "B.S.", field: "Ciencias Biológicas", startDate: "2018-09", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Basic Life Support (BLS)", issuer: "American Heart Association", date: "2022-07" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Practicante Médico en su currículum?", answer: "Incluir experiencia clínica, habilidades relevantes y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Practicante Médico?", answer: "Enfocarse en logros cuantificables y habilidades específicas." },
      { question: "¿Qué habilidades necesita un Practicante Médico?", answer: "Cuidado del paciente, investigación clínica, y habilidades de comunicación." },
    ],
  },
  "medical-interpreter": {
    slug: "intérprete-médico",
    title: "Intérprete Médico",
    keywords: ["currículum de intérprete médico", "CV de intérprete médico", "ejemplo currículum intérprete médico", "plantilla CV intérprete médico"],
    searchIntents: ["cómo escribir currículum de intérprete médico", "ejemplos currículum intérprete médico", "mejor formato CV intérprete médico"],
    topSkills: ["Comunicación Bilingüe", "Competencia Cultural", "Terminología Médica", "Defensa del Paciente", "Confidencialidad", "Escucha Activa", "Habilidades de Toma de Notas", "Gestión del Tiempo", "Habilidades Interpersonales", "Resolución de Problemas"],
    atsKeywords: ["Interpretación Médica", "Bilingüe", "Intérprete Español", "Comunicación en Salud", "Interacción con Pacientes", "Dominio del Idioma", "Sensibilidad Cultural", "Terminología de Salud", "Técnicas de Interpretación", "Sistemas de Salud", "Confidencialidad del Paciente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Intérprete Médico",
      summary: "Intérprete Médico dedicado con más de 5 años de experiencia facilitando la comunicación entre proveedores de salud y pacientes. He interpretado con éxito más de 1,000 encuentros médicos, mejorando la satisfacción del paciente en un 30%.",
      skills: ["Comunicación Bilingüe", "Competencia Cultural", "Terminología Médica", "Defensa del Paciente", "Confidencialidad", "Escucha Activa", "Habilidades de Toma de Notas", "Gestión del Tiempo", "Habilidades Interpersonales", "Resolución de Problemas"],
      experience: [
        {
          title: "Intérprete Médico Senior",
          company: "HealthBridge Medical Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la comprensión del paciente sobre los procedimientos médicos en un 40% a través de una interpretación efectiva.",
            "Reduje las tasas de inasistencia a citas en un 25% al asegurar una comunicación clara.",
            "Facilité más de 500 sesiones de telemedicina, mejorando el acceso a la atención para pacientes que no hablan inglés.",
          ],
        },
        {
          title: "Intérprete Médico",
          company: "CareFirst Health Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné interpretación para más de 300 consultas de pacientes, asegurando un intercambio preciso de información.",
            "Colaboré con el personal médico para desarrollar recursos interpretativos, mejorando la entrega del servicio.",
            "Capacité a 5 nuevos intérpretes sobre las mejores prácticas en interpretación médica.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Comunicación en Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medical Interpreter (CMI)", issuer: "National Board of Certification for Medical Interpreters", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Intérprete Médico en su currículum?", answer: "Un Intérprete Médico debe incluir su experiencia laboral, habilidades específicas, certificaciones y educación relevante." },
      { question: "¿Cómo destacar mi currículum de Intérprete Médico?", answer: "Enfóquese en sus logros cuantificables y habilidades específicas que sean relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Intérprete Médico?", answer: "Las habilidades clave incluyen comunicación bilingüe, competencia cultural y conocimiento de terminología médica." },
    ],
  },
  "medical-officer": {
    slug: "oficial-medico",
    title: "Oficial Médico",
    keywords: ["currículum de Oficial Médico", "CV de Oficial Médico", "ejemplo currículum Oficial Médico", "plantilla CV Oficial Médico"],
    searchIntents: ["cómo escribir currículum de Oficial Médico", "ejemplos currículum Oficial Médico", "mejor formato CV Oficial Médico"],
    topSkills: ["Evaluación Clínica", "Gestión de Pacientes", "Investigación Médica", "Regulación de Salud", "Respuesta a Emergencias", "Farmacología", "Salud Pública", "Habilidades de Comunicación", "Liderazgo de Equipo", "Análisis de Datos"],
    atsKeywords: ["Oficial Médico", "Atención al Paciente", "Ensayos Clínicos", "Educación en Salud", "Aseguramiento de Calidad", "Prevención de Enfermedades", "Gestión de Salud", "Cumplimiento Regulatorio", "Documentación Médica", "Colaboración Interdisciplinaria", "Defensa del Paciente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Oficial Médico",
      summary: "Oficial Médico dedicado con más de 5 años de experiencia en brindar atención de alta calidad a los pacientes y gestionar equipos de salud. Logré una reducción del 20% en los tiempos de espera de los pacientes mediante mejoras en los procesos.",
      skills: ["Evaluación Clínica", "Gestión de Pacientes", "Investigación Médica", "Regulación de Salud", "Respuesta a Emergencias", "Farmacología", "Salud Pública", "Habilidades de Comunicación", "Liderazgo de Equipo", "Análisis de Datos"],
      experience: [
        {
          title: "Oficial Médico Senior",
          company: "HealthFirst Medical Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo sistema de seguimiento de pacientes que mejoró la eficiencia operativa en un 30%",
            "Lideré un equipo de 10 profesionales de la salud para mejorar los estándares de atención al paciente, resultando en un aumento del 15% en las puntuaciones de satisfacción de los pacientes",
            "Realicé investigaciones que contribuyeron a un estudio publicado sobre las mejores prácticas para la gestión de enfermedades crónicas",
          ],
        },
        {
          title: "Oficial Médico",
          company: "City Health Clinics",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné una carga de más de 200 pacientes, asegurando atención integral y seguimientos",
            "Desarrollé y entregué programas de educación en salud que alcanzaron a más de 1,000 miembros de la comunidad",
            "Colaboré con equipos interdisciplinarios para crear planes de tratamiento que mejoraron los resultados de los pacientes",
          ],
        },
      ],
      education: [
        { institution: "Harvard University", degree: "B.S.", field: "Ciencias de la Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Board Certified in Family Medicine", issuer: "American Board of Family Medicine", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Oficial Médico en su currículum?", answer: "Un Oficial Médico debe incluir su experiencia clínica, habilidades de gestión de pacientes, y cualquier investigación relevante en su currículum." },
      { question: "¿Cómo destacar mi currículum de Oficial Médico?", answer: "Para destacar, incluya logros cuantificables, habilidades específicas y experiencia en colaboración interdisciplinaria." },
      { question: "¿Qué habilidades necesita un Oficial Médico?", answer: "Un Oficial Médico necesita habilidades en evaluación clínica, gestión de pacientes, comunicación efectiva y liderazgo." },
    ],
  },
  "medical-physicist": {
    slug: "fisico-medico",
    title: "Físico Médico",
    keywords: ["currículum de físico médico", "CV de físico médico", "ejemplo currículum físico médico", "plantilla CV físico médico"],
    searchIntents: ["cómo escribir currículum de físico médico", "ejemplos currículum físico médico", "mejor formato CV físico médico"],
    topSkills: ["Terapia de Radiación", "Imagenología Médica", "Aseguramiento de Calidad", "Planificación de Tratamientos", "Seguridad Radiológica", "Investigación Clínica", "Atención al Paciente", "Análisis de Datos", "Colaboración", "Redacción Técnica"],
    atsKeywords: ["Física Médica", "Oncología Radioterápica", "Dosimetría", "Linac", "MRI", "Tomografías Axiales Computarizadas", "Braquiterapia", "Cumplimiento Regulatorio", "Ensayos Clínicos", "Radiobiología", "Física de la Salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Físico Médico",
      summary: "Físico Médico dedicado con más de 5 años de experiencia en terapia de radiación e imagenología médica, mejorando constantemente la precisión del tratamiento y la seguridad del paciente a través de soluciones innovadoras.",
      skills: ["Terapia de Radiación", "Imagenología Médica", "Aseguramiento de Calidad", "Planificación de Tratamientos", "Seguridad Radiológica", "Investigación Clínica", "Atención al Paciente", "Análisis de Datos", "Colaboración", "Redacción Técnica"],
      experience: [
        {
          title: "Físico Médico Senior",
          company: "Radiation Oncology Associates",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la precisión del tratamiento en un 15% mediante técnicas avanzadas de dosimetría.",
            "Desarrollé un nuevo protocolo de aseguramiento de calidad que redujo el tiempo de inactividad del equipo en un 20%.",
            "Dirigí un equipo en un ensayo clínico que mejoró los resultados de los pacientes en un 30%.",
          ],
        },
        {
          title: "Físico Médico",
          company: "Advanced Imaging Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé una nueva técnica de imagenología que mejoró las capacidades diagnósticas.",
            "Realicé auditorías de seguridad que llevaron a una reducción del 25% en incidentes de exposición a radiación.",
            "Colaboré con oncólogos para optimizar los planes de tratamiento, mejorando las puntuaciones de satisfacción del paciente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Física Médica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medical Physicist", issuer: "American Board of Radiology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Físico Médico en su currículum?", answer: "Debe incluir su experiencia en terapia de radiación e imagenología, habilidades técnicas y logros relevantes." },
      { question: "¿Cómo destacar mi currículum de Físico Médico?", answer: "Enfatiza tus logros cuantificables y tu experiencia en investigación clínica y colaboraciones interdisciplinarias." },
      { question: "¿Qué habilidades necesita un Físico Médico?", answer: "Necesita habilidades en terapia de radiación, imagenología, aseguramiento de calidad y atención al paciente." },
    ],
  },
  "medical-receptionist": {
    slug: "recepcionista-medico",
    title: "Recepcionista Médico",
    keywords: ["currículum de recepcionista médico", "CV de recepcionista médico", "ejemplo currículum recepcionista médico", "plantilla CV recepcionista médico"],
    searchIntents: ["cómo escribir currículum de recepcionista médico", "ejemplos currículum recepcionista médico", "mejor formato CV recepcionista médico"],
    topSkills: ["Programación de citas", "Registros Electrónicos de Salud (EHR)", "Terminología médica", "Verificación de seguros", "Servicio al cliente", "Habilidades de comunicación", "Capacidad para realizar múltiples tareas", "Atención al detalle", "Gestión del tiempo", "Resolución de problemas"],
    atsKeywords: ["recepción médica", "cuidado del paciente", "administración de oficina", "software de programación", "cumplimiento de HIPAA", "procesos de facturación", "etiqueta telefónica", "entrada de datos", "reservación de citas", "procedimientos de oficina médica", "confidencialidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Recepcionista Médico",
      summary: "Recepcionista Médico dedicada con más de 5 años de experiencia en la gestión del flujo de pacientes y la optimización de la eficiencia de la oficina. Aumentó exitosamente la eficiencia de programación de citas en un 30% a través de una comunicación efectiva y la gestión de EHR.",
      skills: ["Programación de citas", "Registros Electrónicos de Salud (EHR)", "Terminología médica", "Verificación de seguros", "Servicio al cliente", "Habilidades de comunicación", "Capacidad para realizar múltiples tareas", "Atención al detalle", "Gestión del tiempo", "Resolución de problemas"],
      experience: [
        {
          title: "Recepcionista Médico Senior",
          company: "HealthFirst Clinic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el proceso de registro de pacientes, reduciendo los tiempos de espera en un 20%",
            "Gestionó la programación para un equipo de 5 médicos, manejando más de 150 citas semanales",
            "Entrenó a 3 nuevos recepcionistas, mejorando la productividad del equipo en un 15%",
          ],
        },
        {
          title: "Recepcionista Médico",
          company: "City Health Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimizó el sistema de archivo de registros de pacientes, logrando una reducción del 25% en el tiempo de recuperación",
            "Procesó exitosamente verificaciones de seguros con un 98% de precisión",
            "Mantuvo altas calificaciones de satisfacción del paciente a través de un servicio excepcional",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medical Administrative Assistant", issuer: "National Healthcareer Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Recepcionista Médico en su currículum?", answer: "Debe incluir experiencia en programación de citas, manejo de registros médicos y atención al cliente." },
      { question: "¿Cómo destacar mi currículum de Recepcionista Médico?", answer: "Enfatiza tus habilidades en comunicación y eficiencia en la gestión de citas." },
      { question: "¿Qué habilidades necesita un Recepcionista Médico?", answer: "Habilidades clave incluyen atención al detalle, capacidad para realizar múltiples tareas y conocimiento de terminología médica." },
    ],
  },
  "medical-records-clerk": {
    slug: "clerk-de-registros-medicos",
    title: "Clerk de Registros Médicos",
    keywords: ["currículum de Clerk de Registros Médicos", "CV de Clerk de Registros Médicos", "ejemplo currículum Clerk de Registros Médicos", "plantilla CV Clerk de Registros Médicos"],
    searchIntents: ["cómo escribir currículum de Clerk de Registros Médicos", "ejemplos currículum Clerk de Registros Médicos", "mejor formato CV Clerk de Registros Médicos"],
    topSkills: ["Codificación Médica", "Ingreso de Datos", "Cumplimiento de HIPAA", "Gestión de Registros", "Confidencialidad del Paciente", "Registros Electrónicos de Salud (EHR)", "Atención al Detalle", "Habilidades de Comunicación", "Gestión del Tiempo", "Habilidades Organizacionales"],
    atsKeywords: ["registros médicos", "registros de pacientes", "gestión de información de salud", "precisión de datos", "documentación", "gestión de archivos", "cumplimiento", "facturación", "verificación de seguros", "privacidad de datos", "terminología médica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Clerk de Registros Médicos",
      summary: "Clerk de Registros Médicos orientado a los detalles con más de 5 años de experiencia en la gestión de registros de pacientes y asegurando el cumplimiento de las regulaciones de HIPAA, logrando una tasa de precisión del 98% en el ingreso de datos.",
      skills: ["Codificación Médica", "Ingreso de Datos", "Cumplimiento de HIPAA", "Gestión de Registros", "Confidencialidad del Paciente", "Registros Electrónicos de Salud (EHR)", "Atención al Detalle", "Habilidades de Comunicación", "Gestión del Tiempo", "Habilidades Organizacionales"],
      experience: [
        {
          title: "Clerk de Registros Médicos Senior",
          company: "HealthFirst Medical Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la tasa de precisión de datos al 98% a través de rigurosos controles de calidad",
            "Procesé más de 10,000 registros de pacientes anualmente con un tiempo de respuesta de 24 horas",
            "Implementé un nuevo sistema de archivo que redujo el tiempo de recuperación en un 30%",
          ],
        },
        {
          title: "Clerk de Registros Médicos",
          company: "City Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mantuve la confidencialidad del paciente mientras gestionaba información sensible",
            "Ayudé en la transición a registros electrónicos de salud, mejorando la eficiencia en un 20%",
            "Entrené a 5 nuevos miembros del personal en procedimientos de gestión de registros",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Información de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Registered Health Information Technician (RHIT)", issuer: "American Health Information Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Clerk de Registros Médicos en su currículum?", answer: "Incluir experiencia en gestión de registros, cumplimiento de HIPAA y habilidades de codificación médica." },
      { question: "¿Cómo destacar mi currículum de Clerk de Registros Médicos?", answer: "Utilizar palabras clave relevantes y resaltar logros cuantificables en la gestión de registros." },
      { question: "¿Qué habilidades necesita un Clerk de Registros Médicos?", answer: "Habilidades en codificación médica, atención al detalle y manejo de información confidencial." },
    ],
  },
  "medical-records-technician": {
    slug: "tecnico-en-registros-medicos",
    title: "Técnico en Registros Médicos",
    keywords: ["currículum de Técnico en Registros Médicos", "CV de Técnico en Registros Médicos", "ejemplo currículum Técnico en Registros Médicos", "plantilla CV Técnico en Registros Médicos"],
    searchIntents: ["cómo escribir currículum de Técnico en Registros Médicos", "ejemplos currículum Técnico en Registros Médicos", "mejor formato CV Técnico en Registros Médicos"],
    topSkills: ["Codificación Médica", "Gestión de Información de Salud", "Ingreso de Datos", "Registros Electrónicos de Salud (EHR)", "Cumplimiento de HIPAA", "Protección de Privacidad del Paciente", "Análisis de Datos", "Atención al Detalle", "Habilidades de Comunicación", "Habilidades Organizativas"],
    atsKeywords: ["registros médicos", "cuidado de la salud", "codificación", "gestión de datos", "EHR", "registros de pacientes", "cumplimiento", "documentación", "gestión de registros", "información de salud", "apoyo administrativo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico en Registros Médicos",
      summary: "Técnico en Registros Médicos orientado a los detalles con más de 5 años de experiencia en gestión de información de salud, mejorando la precisión de los registros en un 30%. Capacidad comprobada para mantener la confidencialidad del paciente y optimizar los procesos de ingreso de datos.",
      skills: ["Codificación Médica", "Gestión de Información de Salud", "Ingreso de Datos", "Registros Electrónicos de Salud (EHR)", "Cumplimiento de HIPAA", "Protección de Privacidad del Paciente", "Análisis de Datos", "Atención al Detalle", "Habilidades de Comunicación", "Habilidades Organizativas"],
      experience: [
        {
          title: "Técnico Senior en Registros Médicos",
          company: "HealthFirst Medical Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en el ingreso de datos en un 25% mediante la optimización de procesos.",
            "Mantuve un 98% de precisión en los registros de pacientes durante tres años.",
            "Reduje el tiempo de recuperación de registros en un 40%, mejorando el servicio al paciente.",
          ],
        },
        {
          title: "Técnico en Registros Médicos",
          company: "CareWell Health Systems",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Transición exitosa de registros en papel a electrónicos, reduciendo costos de almacenamiento en $15,000.",
            "Logré un 100% de cumplimiento con las regulaciones de HIPAA durante las auditorías.",
            "Capacité a 5 nuevos miembros del personal en sistemas de registros electrónicos de salud.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Información de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Registered Health Information Technician (RHIT)", issuer: "American Health Information Management Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico en Registros Médicos en su currículum?", answer: "Un Técnico en Registros Médicos debe incluir su experiencia en gestión de información de salud, habilidades en codificación médica, y cumplimiento de regulaciones como HIPAA." },
      { question: "¿Cómo destacar mi currículum de Técnico en Registros Médicos?", answer: "Para destacar, enfatiza tus logros en la precisión de registros y cualquier mejora en la eficiencia que hayas logrado." },
      { question: "¿Qué habilidades necesita un Técnico en Registros Médicos?", answer: "Las habilidades clave incluyen codificación médica, atención al detalle, habilidades organizativas y conocimiento de registros electrónicos de salud." },
    ],
  },
  "medical-researcher": {
    slug: "investigador-medico",
    title: "Investigador Médico",
    keywords: ["currículum de investigador médico", "CV de investigador médico", "ejemplo currículum investigador médico", "plantilla CV investigador médico"],
    searchIntents: ["cómo escribir currículum de investigador médico", "ejemplos currículum investigador médico", "mejor formato CV investigador médico"],
    topSkills: ["Investigación Clínica", "Análisis de Datos", "Técnicas de Laboratorio", "Bioestadística", "Gestión de Proyectos", "Cumplimiento Normativo", "Redacción Científica", "Colaboración en Equipo", "Resolución de Problemas", "Gestión de Datos"],
    atsKeywords: ["ensayos clínicos", "metodologías de investigación", "recolección de datos", "software estadístico", "diseño de investigación", "ética en la investigación", "redacción de subvenciones", "gestión de laboratorio", "habilidades de presentación", "datos clínicos", "investigación biomédica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Investigador Médico",
      summary: "Investigador Médico con más de 5 años de experiencia en ensayos clínicos y gestión de laboratorios, liderando proyectos que mejoraron los resultados de los pacientes en un 30%.",
      skills: ["Investigación Clínica", "Análisis de Datos", "Técnicas de Laboratorio", "Bioestadística", "Gestión de Proyectos", "Cumplimiento Normativo", "Redacción Científica", "Colaboración en Equipo", "Resolución de Problemas", "Gestión de Datos"],
      experience: [
        {
          title: "Investigador Médico Senior",
          company: "MediTech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un ensayo clínico que resultó en un aumento del 25% en las tasas de recuperación de pacientes",
            "Publiqué 3 artículos revisados por pares en revistas médicas líderes",
            "Aseguré $500,000 en subvenciones para proyectos de investigación innovadores",
          ],
        },
        {
          title: "Investigador Médico",
          company: "Health Innovations Corp",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 10 estudios clínicos con un enfoque en terapias innovadoras",
            "Mejoré los procesos de recolección de datos, reduciendo errores en un 15%",
            "Colaboré con un equipo multidisciplinario para mejorar los resultados de la investigación",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Ciencias Biológicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Research Coordinator", issuer: "Association of Clinical Research Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Investigador Médico en su currículum?", answer: "Un Investigador Médico debe incluir su experiencia en ensayos clínicos, habilidades técnicas, y publicaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Investigador Médico?", answer: "Destacar logros cuantificables y proyectos clave en los que has trabajado puede hacer que tu currículum sea más atractivo." },
      { question: "¿Qué habilidades necesita un Investigador Médico?", answer: "Habilidades clave incluyen investigación clínica, análisis de datos, y cumplimiento normativo." },
    ],
  },
  "medical-sales-representative": {
    slug: "representante-de-ventas-medicas",
    title: "Representante de Ventas Médicas",
    keywords: ["currículum de representante de ventas médicas", "CV de representante de ventas médicas", "ejemplo currículum representante de ventas médicas", "plantilla CV representante de ventas médicas"],
    searchIntents: ["cómo escribir currículum de representante de ventas médicas", "ejemplos currículum representante de ventas médicas", "mejor formato CV representante de ventas médicas"],
    topSkills: ["estrategia de ventas", "desarrollo de relaciones", "conocimiento del producto", "negociación", "análisis de mercado", "atención al cliente", "comunicación", "habilidades de presentación", "gestión del tiempo", "colaboración en equipo"],
    atsKeywords: ["ventas médicas", "productos farmacéuticos", "ventas B2B", "gestión de clientes", "gestión de territorio", "pronóstico de ventas", "software CRM", "generación de leads", "presentaciones de ventas", "investigación de mercado", "capacitación de productos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Representante de Ventas Médicas",
      summary: "Representante de Ventas Médicas dinámico con más de 5 años de experiencia en la industria farmacéutica, logrando un aumento del 30% en los ingresos por ventas en el último año fiscal.",
      skills: ["estrategia de ventas", "desarrollo de relaciones", "conocimiento del producto", "negociación", "análisis de mercado", "atención al cliente", "comunicación", "habilidades de presentación", "gestión del tiempo", "colaboración en equipo"],
      experience: [
        {
          title: "Representante de Ventas Médicas Senior",
          company: "Pfizer",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas en un 30% en el territorio a través de un desarrollo estratégico de relaciones.",
            "Alcancé el 120% de la cuota de ventas durante tres trimestres consecutivos.",
            "Desarrollé nuevas cuentas de clientes que resultaron en $500,000 adicionales en ingresos.",
          ],
        },
        {
          title: "Representante de Ventas Médicas",
          company: "Johnson & Johnson",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Clasificado consistentemente en el 10% superior de representantes de ventas a nivel nacional.",
            "Expandí la cuota de mercado en un 15% a través de campañas de marketing dirigidas.",
            "Realicé más de 50 presentaciones de productos a profesionales de la salud.",
          ],
        },
      ],
      education: [
        { institution: "University of California", degree: "B.S.", field: "Ciencias Biológicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmaceutical Sales Representative", issuer: "National Association of Pharmaceutical Sales Representatives", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un representante de ventas médicas en su currículum?", answer: "Debe incluir experiencia relevante, logros en ventas y habilidades clave." },
      { question: "¿Cómo destacar mi currículum de representante de ventas médicas?", answer: "Resalta tus logros cuantificables y personaliza tu currículum para cada oferta." },
      { question: "¿Qué habilidades necesita un representante de ventas médicas?", answer: "Necesita habilidades en ventas, comunicación, negociación y conocimiento del producto." },
    ],
  },
  "medical-school": {
    slug: "curriculum-medico",
    title: "Currículum de Escuela de Medicina",
    keywords: ["currículum de escuela de medicina", "CV de escuela de medicina", "ejemplo currículum escuela de medicina", "plantilla CV escuela de medicina"],
    searchIntents: ["cómo escribir currículum de escuela de medicina", "ejemplos currículum escuela de medicina", "mejor formato CV escuela de medicina"],
    topSkills: ["cuidado de pacientes", "investigación clínica", "habilidades diagnósticas", "empatía", "comunicación", "colaboración en equipo", "gestión del tiempo", "resolución de problemas", "liderazgo", "pensamiento crítico"],
    atsKeywords: ["médico", "médico", "clínico", "cuidado de pacientes", "salud", "pasantía", "residencia", "escuela de medicina", "educación médica", "certificación", "BLS"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Escuela de Medicina",
      summary: "Estudiante de medicina dedicado con 5 años de experiencia en entornos clínicos y una pasión por la defensa de los pacientes. Alcanzó un ranking en el top 10% de su clase y completó más de 300 horas de interacción con pacientes.",
      skills: ["cuidado de pacientes", "investigación clínica", "habilidades diagnósticas", "empatía", "comunicación", "colaboración en equipo", "gestión del tiempo", "resolución de problemas", "liderazgo", "pensamiento crítico"],
      experience: [
        {
          title: "Interno Clínico",
          company: "Mount Sinai Hospital",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Asistí en más de 50 procedimientos quirúrgicos, contribuyendo a una reducción del 20% en el tiempo de recuperación de los pacientes.",
            "Realicé evaluaciones de pacientes que mejoraron la precisión diagnóstica en un 15%.",
            "Participé en un proyecto de investigación que llevó a una publicación en una revista revisada por pares.",
          ],
        },
        {
          title: "Asistente de Investigación",
          company: "Johns Hopkins University",
          startDate: "2020-01",
          endDate: "2022-05",
          achievements: [
            "Co-autoricé un estudio sobre el manejo de enfermedades crónicas que recibió una subvención de $50,000.",
            "Recopilé y analicé datos de más de 200 encuestas de pacientes, mejorando las técnicas de recolección de datos.",
            "Desarrollé un taller que aumentó la participación de los asistentes en un 30%.",
          ],
        },
      ],
      education: [
        { institution: "Harvard Medical School", degree: "M.D.", field: "Medicina", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Basic Life Support (BLS)", issuer: "American Heart Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de escuela de medicina?", answer: "Un currículum de escuela de medicina debe incluir experiencia clínica, habilidades relevantes y logros académicos." },
      { question: "¿Cómo destacar mi currículum de escuela de medicina?", answer: "Enfatiza tus logros y experiencias clínicas, y utiliza un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un currículum de escuela de medicina?", answer: "Habilidades clave incluyen cuidado de pacientes, investigación clínica, y comunicación efectiva." },
    ],
  },
  "medical-secretary": {
    slug: "secretario-medico",
    title: "Secretario Médico",
    keywords: ["currículum de Secretario Médico", "CV de Secretario Médico", "ejemplo currículum Secretario Médico", "plantilla CV Secretario Médico"],
    searchIntents: ["cómo escribir currículum de Secretario Médico", "ejemplos currículum Secretario Médico", "mejor formato CV Secretario Médico"],
    topSkills: ["Terminología Médica", "Programación de Citas", "Registros Electrónicos de Salud", "Verificación de Seguros", "Habilidades de Comunicación", "Entrada de Datos", "Gestión del Tiempo", "Servicio al Cliente", "Atención al Detalle", "Confidencialidad"],
    atsKeywords: ["secretario médico", "apoyo administrativo", "gestión de oficina", "cuidado del paciente", "administración de salud", "programación de citas", "facturación médica", "mantenimiento de registros", "relaciones con clientes", "colaboración en equipo", "gestión de datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Secretario Médico",
      summary: "Secretario Médico orientado a los detalles con más de 5 años de experiencia en la gestión de operaciones de oficina y apoyo al personal de salud. Historial comprobado de mejorar la eficiencia en la programación de citas de pacientes en un 30%.",
      skills: ["Terminología Médica", "Programación de Citas", "Registros Electrónicos de Salud", "Verificación de Seguros", "Habilidades de Comunicación", "Entrada de Datos", "Gestión del Tiempo", "Servicio al Cliente", "Atención al Detalle", "Confidencialidad"],
      experience: [
        {
          title: "Secretario Médico Senior",
          company: "HealthPlus Clinic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia de programación de citas de pacientes en un 30%, reduciendo los tiempos de espera.",
            "Gestionó más de 500 registros de pacientes con una tasa de precisión del 98%.",
            "Racionalizó los procesos de facturación, resultando en una disminución del 15% en errores de facturación.",
          ],
        },
        {
          title: "Secretario Médico",
          company: "City Medical Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Coordinó exitosamente más de 100 citas por semana.",
            "Mantuvo la confidencialidad de los pacientes al gestionar información sensible.",
            "Asistió en la capacitación de nuevo personal administrativo.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medical Administrative Assistant", issuer: "National Healthcareer Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Secretario Médico en su currículum?", answer: "Un Secretario Médico debe incluir su experiencia en gestión de citas, manejo de registros médicos y habilidades de comunicación." },
      { question: "¿Cómo destacar mi currículum de Secretario Médico?", answer: "Use palabras clave relevantes y destaque logros cuantificables en su experiencia laboral." },
      { question: "¿Qué habilidades necesita un Secretario Médico?", answer: "Las habilidades clave incluyen terminología médica, programación de citas, y atención al detalle." },
    ],
  },
  "medical-technologist": {
    slug: "tecnologo-medico",
    title: "Tecnólogo Médico",
    keywords: ["currículum de Tecnólogo Médico", "CV de Tecnólogo Médico", "ejemplo currículum Tecnólogo Médico", "plantilla CV Tecnólogo Médico"],
    searchIntents: ["cómo escribir currículum de Tecnólogo Médico", "ejemplos currículum Tecnólogo Médico", "mejor formato CV Tecnólogo Médico"],
    topSkills: ["Pruebas de Laboratorio Clínico", "Microbiología", "Hematología", "Bioquímica", "Inmunología", "Control de Calidad", "Gestión de Laboratorio", "Operación de Equipos Diagnósticos", "Análisis de Datos", "Interacción con Pacientes"],
    atsKeywords: ["Tecnólogo Médico", "laboratorio clínico", "técnico de hematología", "especialista en inmunología", "analista de bioquímica", "experto en microbiología", "aseguramiento de calidad", "procedimientos de laboratorio", "interpretación de datos", "seguridad del paciente", "cumplimiento regulatorio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Tecnólogo Médico",
      summary: "Tecnólogo Médico orientado a los detalles con más de 5 años de experiencia en entornos de laboratorio clínico, especializado en pruebas diagnósticas precisas y control de calidad, lo que resultó en una reducción del 30% en las tasas de error.",
      skills: ["Pruebas de Laboratorio Clínico", "Microbiología", "Hematología", "Bioquímica", "Inmunología", "Control de Calidad", "Gestión de Laboratorio", "Operación de Equipos Diagnósticos", "Análisis de Datos", "Interacción con Pacientes"],
      experience: [
        {
          title: "Tecnólogo Médico Senior",
          company: "MediLab Diagnostics",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo sistema de control de calidad que mejoró la precisión de las pruebas en un 25%",
            "Capacité a 10 nuevos miembros del personal, mejorando el rendimiento del equipo y la eficiencia del flujo de trabajo",
            "Reduje el tiempo de respuesta para los resultados de laboratorio en un 15%, mejorando las puntuaciones de satisfacción del paciente",
          ],
        },
        {
          title: "Tecnólogo Médico",
          company: "HealthQuest Labs",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 15,000 pruebas anuales con una tasa de precisión del 98%",
            "Desarrollé nuevos procedimientos que disminuyeron el desperdicio de reactivos en un 20%",
            "Colaboré con médicos para optimizar los procesos diagnósticos y mejorar los resultados de los pacientes",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Tecnología Médica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ASCP Certification", issuer: "American Society for Clinical Pathology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Tecnólogo Médico en su currículum?", answer: "Debe incluir su experiencia laboral, habilidades técnicas, educación y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Tecnólogo Médico?", answer: "Enfatiza tus logros y habilidades claves, y utiliza palabras clave relacionadas con el campo." },
      { question: "¿Qué habilidades necesita un Tecnólogo Médico?", answer: "Necesita habilidades en pruebas de laboratorio, microbiología, hematología, y control de calidad, entre otras." },
    ],
  },
  "medical-transcriptionist": {
    slug: "transcriptor-medico",
    title: "Transcriptor Médico",
    keywords: ["currículum de transcriptor médico", "CV de transcriptor médico", "ejemplo currículum transcriptor médico", "plantilla CV transcriptor médico"],
    searchIntents: ["cómo escribir currículum de transcriptor médico", "ejemplos currículum transcriptor médico", "mejor formato CV transcriptor médico"],
    topSkills: ["terminología médica", "transcripción de audio", "atención al detalle", "gestión del tiempo", "dominio de la gramática", "habilidades informáticas", "confidencialidad", "organización", "edición", "multitarea"],
    atsKeywords: ["transcriptor médico", "servicios de transcripción", "documentación sanitaria", "registros médicos", "dictado", "software de reconocimiento de voz", "cumplimiento de HIPAA", "aseguramiento de calidad", "registros de pacientes", "marcado de tiempo", "documentación clínica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Transcriptor Médico",
      summary: "Transcriptor Médico dedicado con más de 5 años de experiencia en documentación sanitaria, logrando una tasa de precisión del 98% en la transcripción de informes médicos.",
      skills: ["terminología médica", "transcripción de audio", "atención al detalle", "gestión del tiempo", "dominio de la gramática", "habilidades informáticas", "confidencialidad", "organización", "edición", "multitarea"],
      experience: [
        {
          title: "Transcriptor Médico Senior",
          company: "HealthDocs Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la precisión de la transcripción en un 20% a través de capacitación y medidas de control de calidad",
            "Procesé más de 1,500 informes médicos mensualmente, asegurando una entrega oportuna",
            "Desarrollé un flujo de trabajo optimizado que redujo el tiempo de respuesta en un 15%",
          ],
        },
        {
          title: "Transcriptor Médico",
          company: "MediTranscribe LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré una tasa de precisión del 97% en la transcripción de diversas especialidades médicas",
            "Colaboré con equipos de atención médica para mejorar la claridad y efectividad de los informes",
            "Mantuve la confidencialidad de los pacientes y el cumplimiento de las regulaciones de HIPAA",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Gestión de Información de Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medical Transcriptionist", issuer: "AHDI", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Transcriptor Médico en su currículum?", answer: "Debe incluir habilidades clave, experiencia laboral relevante y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Transcriptor Médico?", answer: "Enfatiza logros específicos, utiliza palabras clave relevantes y asegúrate de que esté bien estructurado." },
      { question: "¿Qué habilidades necesita un Transcriptor Médico?", answer: "Habilidades clave incluyen terminología médica, atención al detalle y manejo de software de transcripción." },
    ],
  },
  "mental-health-therapist": {
    slug: "terapeuta-de-salud-mental",
    title: "Terapeuta de Salud Mental",
    keywords: ["currículum de terapeuta de salud mental", "CV de terapeuta de salud mental", "ejemplo currículum terapeuta de salud mental", "plantilla CV terapeuta de salud mental"],
    searchIntents: ["cómo escribir currículum de terapeuta de salud mental", "ejemplos currículum terapeuta de salud mental", "mejor formato CV terapeuta de salud mental"],
    topSkills: ["Terapia Cognitivo-Conductual", "Cuidado Informado sobre Trauma", "Intervención en Crisis", "Terapia Grupal", "Consejería Individual", "Evaluación Psicológica", "Técnicas de Atención Plena", "Estrategias de Afrontamiento", "Competencia Cultural", "Gestión de Casos"],
    atsKeywords: ["salud mental", "terapia", "consejería", "cuidado del paciente", "evaluación clínica", "psicoterapia", "salud conductual", "planificación del tratamiento", "gestión de crisis", "conciencia sobre la salud mental", "habilidades diagnósticas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Terapeuta de Salud Mental",
      summary: "Terapeuta de Salud Mental dedicada con más de 5 años de experiencia en proporcionar apoyo terapéutico a poblaciones diversas. Mejoró con éxito los resultados de los pacientes en un 30% a través de prácticas basadas en evidencia y planes de tratamiento personalizados.",
      skills: ["Terapia Cognitivo-Conductual", "Cuidado Informado sobre Trauma", "Intervención en Crisis", "Terapia Grupal", "Consejería Individual", "Evaluación Psicológica", "Técnicas de Atención Plena", "Estrategias de Afrontamiento", "Competencia Cultural", "Gestión de Casos"],
      experience: [
        {
          title: "Terapeuta de Salud Mental Senior",
          company: "Cedarwood Counseling Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de retención de clientes en un 25% a través de intervenciones terapéuticas personalizadas.",
            "Facilité más de 300 sesiones de terapia individual y grupal, fomentando un ambiente de apoyo.",
            "Implementé un nuevo programa de tratamiento que mejoró los puntajes de satisfacción del paciente en un 40%.",
          ],
        },
        {
          title: "Consejero de Salud Mental",
          company: "Evergreen Mental Health Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé a clientes en crisis, desescalando con éxito el 90% de las situaciones.",
            "Desarrollé planes de cuidado personalizados que resultaron en un aumento del 20% en la adherencia al tratamiento.",
            "Realicé talleres sobre estrategias de afrontamiento, alcanzando a más de 100 miembros de la comunidad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Psicología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Licensed Professional Counselor", issuer: "State Board of Counseling", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Mental Health Therapist en su currículum?", answer: "Un Mental Health Therapist debe incluir su experiencia laboral, habilidades relevantes, educación y certificaciones pertinentes." },
      { question: "¿Cómo destacar mi currículum de Mental Health Therapist?", answer: "Para destacar, enfócate en logros cuantificables, utiliza palabras clave de la industria y personaliza tu currículum para cada aplicación." },
      { question: "¿Qué habilidades necesita un Mental Health Therapist?", answer: "Un Mental Health Therapist necesita habilidades en terapia, comunicación efectiva, empatía, evaluación psicológica y gestión de crisis." },
    ],
  },
  "modern-call-center": {
    slug: "curriculum-llamada-moderna",
    title: "Currículum Moderno de Call Center",
    keywords: ["currículum de call center", "CV de call center", "ejemplo currículum call center", "plantilla CV call center"],
    searchIntents: ["cómo escribir currículum de call center", "ejemplos currículum call center", "mejor formato CV call center"],
    topSkills: ["Servicio al Cliente", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Multitarea", "Competencia Técnica", "Habilidades de Ventas", "Adaptabilidad", "Resolución de Conflictos", "Colaboración en Equipo"],
    atsKeywords: ["call center", "soporte al cliente", "manejo de llamadas", "soporte de ventas", "software CRM", "habilidades de comunicación", "resolución de problemas", "trabajo en equipo", "entrada de datos", "satisfacción del cliente", "métricas de rendimiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum Moderno de Call Center",
      summary: "Profesional de call center dedicado con más de 5 años de experiencia en servicio y soporte al cliente, logrando una tasa de satisfacción del cliente del 95% a través de habilidades efectivas de comunicación y resolución de problemas.",
      skills: ["Servicio al Cliente", "Comunicación", "Resolución de Problemas", "Gestión del Tiempo", "Multitarea", "Competencia Técnica", "Habilidades de Ventas", "Adaptabilidad", "Resolución de Conflictos", "Colaboración en Equipo"],
      experience: [
        {
          title: "Representante Senior de Servicio al Cliente",
          company: "TeleTech",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las puntuaciones de satisfacción del cliente en un 20% en seis meses",
            "Gestioné con éxito un promedio de 80 llamadas por día con una tasa de resolución del 90%",
            "Lideré un proyecto de equipo que mejoró los tiempos de respuesta de llamadas en un 15%",
          ],
        },
        {
          title: "Representante de Servicio al Cliente",
          company: "Concentrix",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré empleado del mes tres veces por rendimiento excepcional",
            "Mantuve una calificación de satisfacción del cliente del 95% durante mi empleo",
            "Entrené a 5 nuevos empleados sobre políticas y procedimientos de la empresa",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Customer Service Excellence", issuer: "International Customer Service Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Modern Call Center Resume en su currículum?", answer: "Un currículum moderno de call center debe incluir experiencia relevante, habilidades clave de servicio al cliente y métricas de rendimiento." },
      { question: "¿Cómo destacar mi currículum de Modern Call Center Resume?", answer: "Destacar logros cuantificables y habilidades específicas puede hacer que tu currículum resalte entre los demás." },
      { question: "¿Qué habilidades necesita un Modern Call Center Resume?", answer: "Habilidades de comunicación, resolución de problemas y servicio al cliente son esenciales para un currículum de call center." },
    ],
  },
  "modern-cashier": {
    slug: "cajero-moderno",
    title: "Cajero Moderno",
    keywords: ["currículum de cajero moderno", "CV de cajero moderno", "ejemplo currículum cajero moderno", "plantilla CV cajero moderno"],
    searchIntents: ["cómo escribir currículum de cajero moderno", "ejemplos currículum cajero moderno", "mejor formato CV cajero moderno"],
    topSkills: ["Atención al Cliente", "Manejo de Efectivo", "Sistemas de Punto de Venta (POS)", "Gestión de Inventario", "Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle", "Técnicas de Venta", "Colaboración en Equipo"],
    atsKeywords: ["cajero", "servicio al cliente", "ventas", "transacciones financieras", "sistemas POS", "gestión de inventario", "manejo de efectivo", "procesamiento de recibos", "relaciones con clientes", "gestión del tiempo", "trabajo en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Cajero Moderno",
      summary: "Cajero dedicado con más de 5 años de experiencia en entornos minoristas, logrando consistentemente un aumento del 20% en ventas a través de un servicio al cliente excepcional y un procesamiento eficiente de transacciones.",
      skills: ["Atención al Cliente", "Manejo de Efectivo", "Sistemas de Punto de Venta (POS)", "Gestión de Inventario", "Comunicación", "Gestión del Tiempo", "Resolución de Problemas", "Atención al Detalle", "Técnicas de Venta", "Colaboración en Equipo"],
      experience: [
        {
          title: "Cajero Senior",
          company: "Target",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los índices de satisfacción del cliente en un 30% a través de una formación de servicio mejorada.",
            "Procesé un promedio de 150 transacciones diarias, manteniendo una tasa de precisión del 99%.",
            "Implementé un nuevo sistema de seguimiento de inventario que redujo las discrepancias de stock en un 25%.",
          ],
        },
        {
          title: "Cajero",
          company: "Walmart",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logré Empleado del Mes en dos ocasiones por un servicio al cliente excepcional.",
            "Manejé transacciones en efectivo superiores a $10,000 diarios sin discrepancias.",
            "Entrené a 5 nuevos cajeros en técnicas de venta efectivas y políticas de la tienda.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Cashier", issuer: "Retail Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Cajero Moderno en su currículum?", answer: "Un Cajero Moderno debe incluir habilidades relevantes, experiencia laboral, y certificaciones específicas en su currículum." },
      { question: "¿Cómo destacar mi currículum de Cajero Moderno?", answer: "Para destacar, enfócate en tus logros y habilidades clave, y personaliza tu currículum según la oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Cajero Moderno?", answer: "Las habilidades clave incluyen atención al cliente, manejo de efectivo, y experiencia con sistemas POS." },
    ],
  },
  "modern-for-college-application": {
    slug: "curriculum-aplicacion-moderna-colegio",
    title: "Currículum Moderno para Aplicación a la Universidad",
    keywords: ["currículum de aplicación universitaria", "CV de aplicación universitaria", "ejemplo currículum aplicación universitaria", "plantilla CV aplicación universitaria"],
    searchIntents: ["cómo escribir currículum de aplicación universitaria", "ejemplos currículum aplicación universitaria", "mejor formato CV aplicación universitaria"],
    topSkills: ["comunicación", "pensamiento crítico", "trabajo en equipo", "gestión del tiempo", "liderazgo", "resolución de problemas", "investigación", "adaptabilidad", "creatividad", "alfabetización digital"],
    atsKeywords: ["logros académicos", "actividades extracurriculares", "servicio comunitario", "roles de liderazgo", "proyectos personales", "prácticas profesionales", "trabajo voluntario", "premios", "honores", "habilidades", "referencias"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum Moderno para Aplicación a la Universidad",
      summary: "Solicitante de universidad dedicado con 4 años de excelencia académica y experiencia en liderazgo. Logré un GPA de 3.9 mientras participaba activamente en servicio comunitario y actividades extracurriculares.",
      skills: ["comunicación", "pensamiento crítico", "trabajo en equipo", "gestión del tiempo", "liderazgo", "resolución de problemas", "investigación", "adaptabilidad", "creatividad", "alfabetización digital"],
      experience: [
        {
          title: "Presidente del Consejo Estudiantil",
          company: "Lincoln High School",
          startDate: "2022-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo de 15 estudiantes para organizar eventos de recaudación de fondos, recaudando más de $5,000 para organizaciones benéficas locales.",
            "Aumenté la participación estudiantil en eventos escolares en un 30% a través de estrategias de marketing efectivas.",
            "Implementé nuevas estrategias de comunicación que mejoraron la retroalimentación de los estudiantes en un 40%.",
          ],
        },
        {
          title: "Practicante de Verano",
          company: "Tech Innovations Inc.",
          startDate: "2021-06",
          endDate: "2021-08",
          achievements: [
            "Asistí en el desarrollo de una campaña de marketing que aumentó las descargas de la aplicación en un 25%.",
            "Realicé investigaciones de mercado que resultaron en un informe que influyó en el desarrollo del producto.",
            "Colaboré con un equipo para crear contenido atractivo para plataformas de redes sociales.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Certified Digital Marketing Professional", issuer: "Digital Marketing Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Modern College Application Resume en su currículum?", answer: "Un currículum moderno para aplicación a la universidad debe incluir logros académicos, actividades extracurriculares, y habilidades destacadas." },
      { question: "¿Cómo destacar mi currículum de Modern College Application Resume?", answer: "Asegúrate de resaltar tus logros y experiencias relevantes, y utiliza un formato claro y atractivo." },
      { question: "¿Qué habilidades necesita un Modern College Application Resume?", answer: "Habilidades clave incluyen comunicación, pensamiento crítico, trabajo en equipo y liderazgo." },
    ],
  },
  "modern-restaurant-manager": {
    slug: "gerente-de-restaurante-moderno",
    title: "Gerente de Restaurante Moderno",
    keywords: ["currículum de gerente de restaurante moderno", "CV de gerente de restaurante moderno", "ejemplo currículum gerente de restaurante moderno", "plantilla CV gerente de restaurante moderno"],
    searchIntents: ["cómo escribir currículum de gerente de restaurante moderno", "ejemplos currículum gerente de restaurante moderno", "mejor formato CV gerente de restaurante moderno"],
    topSkills: ["gestión de personal", "servicio al cliente", "control de inventario", "gestión de presupuestos", "planificación de menús", "seguridad alimentaria", "resolución de conflictos", "estrategias de marketing", "liderazgo de equipo", "eficiencia operativa"],
    atsKeywords: ["gestión de restaurantes", "capacitación de empleados", "maximización de ganancias", "crecimiento de ventas", "aseguramiento de calidad", "reducción de costos", "satisfacción del cliente", "programación", "negociación con proveedores", "evaluación de desempeño", "regulaciones de salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Restaurante Moderno",
      summary: "Gerente de restaurante dinámico con más de 7 años de experiencia en establecimientos de alto volumen, reconocido por aumentar los ingresos en un 30% a través de estrategias de marketing innovadoras y mejoras operativas.",
      skills: ["gestión de personal", "servicio al cliente", "control de inventario", "gestión de presupuestos", "planificación de menús", "seguridad alimentaria", "resolución de conflictos", "estrategias de marketing", "liderazgo de equipo", "eficiencia operativa"],
      experience: [
        {
          title: "Gerente de Restaurante Senior",
          company: "The Gourmet Kitchen",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté los ingresos anuales en un 25% mediante un rediseño estratégico del menú y eventos promocionales",
            "Reduje el desperdicio de alimentos en un 15% al implementar prácticas efectivas de gestión de inventario",
            "Mejoré las puntuaciones de satisfacción del cliente en un 20% a través de capacitación del personal y mejoras en el servicio",
          ],
        },
        {
          title: "Asistente de Gerente de Restaurante",
          company: "Culinary Delights",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en lograr un aumento del 10% en las ventas al optimizar los horarios y el rendimiento del personal",
            "Implementé un nuevo programa de capacitación para el personal que mejoró la velocidad del servicio en un 30%",
            "Desempeñé un papel clave en una exitosa campaña de rebranding de restaurante que atrajo a nuevos clientes",
          ],
        },
      ],
      education: [
        { institution: "Culinary Institute of America", degree: "B.S.", field: "Gestión de Hospitalidad", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "ServSafe Food Manager", issuer: "National Restaurant Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Modern Restaurant Manager en su currículum?", answer: "Un Modern Restaurant Manager debe incluir su experiencia en gestión de personal, servicio al cliente y control de inventario, así como logros cuantificables en sus roles anteriores." },
      { question: "¿Cómo destacar mi currículum de Modern Restaurant Manager?", answer: "Para destacar su currículum, utilice palabras clave relevantes, enfoque en logros medibles y ajuste su currículum a la descripción del trabajo específico." },
      { question: "¿Qué habilidades necesita un Modern Restaurant Manager?", answer: "Un Modern Restaurant Manager necesita habilidades en gestión de personal, servicio al cliente, control de inventario, y estrategias de marketing, entre otras." },
    ],
  },
  "modern-retail-management": {
    slug: "curriculum-gestion-moderna-del-comercio",
    title: "Currículum de Gestión Moderna del Comercio",
    keywords: ["currículum de gestión moderna del comercio", "CV de gestión moderna del comercio", "ejemplo currículum gestión moderna del comercio", "plantilla CV gestión moderna del comercio"],
    searchIntents: ["cómo escribir currículum de gestión moderna del comercio", "ejemplos currículum gestión moderna del comercio", "mejor formato CV gestión moderna del comercio"],
    topSkills: ["Gestión de Inventarios", "Atención al Cliente", "Estrategia de Ventas", "Merchandising Visual", "Análisis de Datos", "Gestión de la Cadena de Suministro", "Liderazgo de Equipos", "Marketing Retail", "Perspicacia Financiera", "Estrategias de Comercio Electrónico"],
    atsKeywords: ["gestión retail", "experiencia del cliente", "crecimiento en ventas", "desarrollo de equipos", "merchandising", "eficiencia operativa", "optimización de ganancias", "tendencias de mercado", "control de inventarios", "analítica retail", "operaciones de tienda"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Gestión Moderna del Comercio",
      summary: "Profesional dinámico en gestión retail con más de 5 años de experiencia en impulsar ventas y mejorar la satisfacción del cliente. Historial comprobado de aumentar los ingresos de la tienda en un 30% a través de merchandising estratégico y liderazgo efectivo del equipo.",
      skills: ["Gestión de Inventarios", "Atención al Cliente", "Estrategia de Ventas", "Merchandising Visual", "Análisis de Datos", "Gestión de la Cadena de Suministro", "Liderazgo de Equipos", "Marketing Retail", "Perspicacia Financiera", "Estrategias de Comercio Electrónico"],
      experience: [
        {
          title: "Gerente Senior de Retail",
          company: "Target",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las ventas de la tienda en un 25% durante el primer año mediante estrategias promocionales efectivas.",
            "Desarrollé un programa de lealtad del cliente que incrementó las visitas de clientes recurrentes en un 40%.",
            "Lideré un equipo de 15 empleados, mejorando las calificaciones de rendimiento general en un 20%.",
          ],
        },
        {
          title: "Asistente de Gerente de Retail",
          company: "Walmart",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé un sistema de seguimiento de inventario que redujo las discrepancias de stock en un 15%.",
            "Logré un puntaje de satisfacción del cliente del 95% durante las evaluaciones trimestrales.",
            "Coordiné eventos de ventas estacionales que generaron $100,000 adicionales en ingresos.",
          ],
        },
      ],
      education: [
        { institution: "University of California", degree: "B.S.", field: "Administración de Empresas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Retail Management Professional", issuer: "Retail Management Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Modern Retail Management Resume en su currículum?", answer: "Incluye experiencia en gestión de ventas, atención al cliente y habilidades de liderazgo." },
      { question: "¿Cómo destacar mi currículum de Modern Retail Management Resume?", answer: "Utiliza palabras clave relevantes y destaca tus logros cuantificables." },
      { question: "¿Qué habilidades necesita un Modern Retail Management Resume?", answer: "Habilidades en gestión de inventarios, estrategia de ventas y análisis de datos son clave." },
    ],
  },
  "mount-sinai-hospital-sleep-study-director": {
    slug: "director-de-estudios-del-sueño-mount-sinai-hospital",
    title: "Director de Estudios del Sueño en el Hospital Mount Sinai",
    keywords: ["currículum de Director de Estudios del Sueño", "CV de Director de Estudios del Sueño", "ejemplo currículum Director de Estudios del Sueño", "plantilla CV Director de Estudios del Sueño"],
    searchIntents: ["cómo escribir currículum de Director de Estudios del Sueño", "ejemplos currículum Director de Estudios del Sueño", "mejor formato CV Director de Estudios del Sueño"],
    topSkills: ["Medicina del Sueño", "Polisomnografía", "Investigación Clínica", "Gestión de Pacientes", "Análisis de Datos", "Liderazgo de Equipo", "Cumplimiento Normativo", "Mejora de Calidad", "Oratoria", "Gestión de Proyectos"],
    atsKeywords: ["Trastornos del Sueño", "Protocolos de Estudios del Sueño", "Guías Clínicas", "Cuidado del Paciente", "Interpretación de Datos", "Certificación de Tecnólogo del Sueño", "Terapia CPAP", "Metodologías de Investigación del Sueño", "Colaboración Multidisciplinaria", "Análisis Estadístico", "Educación del Paciente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Director de Estudios del Sueño en el Hospital Mount Sinai",
      summary: "Director de Estudios del Sueño dedicado con más de 8 años de experiencia en medicina del sueño y un historial comprobado de mejora en los resultados de los pacientes en un 30% mediante protocolos de tratamiento innovadores.",
      skills: ["Medicina del Sueño", "Polisomnografía", "Investigación Clínica", "Gestión de Pacientes", "Análisis de Datos", "Liderazgo de Equipo", "Cumplimiento Normativo", "Mejora de Calidad", "Oratoria", "Gestión de Proyectos"],
      experience: [
        {
          title: "Director Senior de Estudios del Sueño",
          company: "Mount Sinai Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la satisfacción del paciente en un 25% mediante protocolos de atención mejorados.",
            "Gestioné un equipo de 10 técnicos del sueño, lo que llevó a un aumento del 15% en la capacidad de estudios.",
            "Desarrollé un nuevo protocolo de estudio del sueño que redujo el tiempo de respuesta en un 20%.",
          ],
        },
        {
          title: "Especialista en Medicina del Sueño",
          company: "NewYork-Presbyterian Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Publiqué 5 artículos revisados por pares sobre trastornos del sueño.",
            "Implementé un programa de educación para pacientes que mejoró la adherencia al tratamiento en un 40%.",
            "Realicé más de 200 estudios del sueño anualmente, proporcionando análisis detallados y recomendaciones.",
          ],
        },
      ],
      education: [
        { institution: "Columbia University", degree: "B.S.", field: "Ciencias Biológicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Sleep Medicine Certification", issuer: "American Board of Sleep Medicine", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Director de Estudios del Sueño en su currículum?", answer: "Debe incluir experiencia relevante, logros cuantificables y habilidades específicas en medicina del sueño." },
      { question: "¿Cómo destacar mi currículum de Director de Estudios del Sueño?", answer: "Enfócate en tus logros y en cómo has mejorado los resultados de los pacientes." },
      { question: "¿Qué habilidades necesita un Director de Estudios del Sueño?", answer: "Habilidades en medicina del sueño, liderazgo, análisis de datos y cumplimiento normativo son clave." },
    ],
  },
  "music-therapist": {
    slug: "terapeuta-de-musica",
    title: "Terapeuta de Música",
    keywords: ["currículum de terapeuta de música", "CV de terapeuta de música", "ejemplo currículum terapeuta de música", "plantilla CV terapeuta de música"],
    searchIntents: ["cómo escribir currículum de terapeuta de música", "ejemplos currículum terapeuta de música", "mejor formato CV terapeuta de música"],
    topSkills: ["Intervención musical", "Técnicas terapéuticas", "Evaluación clínica", "Gestión de relaciones con pacientes", "Planificación de sesiones", "Facilitación de grupos", "Composición musical", "Análisis de comportamiento", "Intervención en crisis", "Habilidades de comunicación"],
    atsKeywords: ["music therapy", "clinical therapist", "patient care", "therapy sessions", "mental health", "emotional support", "music education", "rehabilitation", "assessment tools", "treatment planning", "group therapy"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Terapeuta de Música",
      summary: "Terapeuta de Música dedicada con más de 5 años de experiencia en mejorar el bienestar emocional y psicológico de los pacientes a través de la música. Aumentó con éxito la participación de los pacientes en las sesiones de terapia en un 30% mediante intervenciones musicales innovadoras.",
      skills: ["Intervención musical", "Técnicas terapéuticas", "Evaluación clínica", "Gestión de relaciones con pacientes", "Planificación de sesiones", "Facilitación de grupos", "Composición musical", "Análisis de comportamiento", "Intervención en crisis", "Habilidades de comunicación"],
      experience: [
        {
          title: "Terapeuta de Música Senior",
          company: "Harmony Health Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la participación de pacientes en sesiones de terapia musical en un 40% dentro de un año.",
            "Desarrolló un programa de alcance comunitario que llegó a más de 200 individuos que necesitaban apoyo en salud mental.",
            "Implementó una nueva herramienta de evaluación que mejoró la eficiencia en la planificación del tratamiento en un 25%.",
          ],
        },
        {
          title: "Terapeuta de Música",
          company: "Melody Rehabilitation Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realizó más de 300 sesiones de terapia individual, resultando en una tasa de satisfacción del 95% entre los pacientes.",
            "Colaboró con equipos interdisciplinarios para crear planes de atención integral para los pacientes.",
            "Presentó resultados terapéuticos en la Conferencia Nacional de Terapia Musical.",
          ],
        },
      ],
      education: [
        { institution: "University of Music Therapy", degree: "B.S.", field: "Terapia Musical", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Board Certified Music Therapist", issuer: "Certification Board for Music Therapists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Music Therapist en su currículum?", answer: "Un Music Therapist debe incluir su formación académica, experiencia laboral, habilidades relevantes y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Music Therapist?", answer: "Para destacar su currículum, resalte logros específicos, utilice palabras clave y adapte su currículum a cada puesto." },
      { question: "¿Qué habilidades necesita un Music Therapist?", answer: "Un Music Therapist necesita habilidades en intervención musical, evaluación clínica, y gestión de relaciones con pacientes." },
    ],
  },
  "new-grad-nurse": {
    slug: "enfermero-nuevo-graduado",
    title: "Enfermero Nuevo Graduado",
    keywords: ["currículum de enfermero nuevo graduado", "CV de enfermero nuevo graduado", "ejemplo currículum enfermero nuevo graduado", "plantilla CV enfermero nuevo graduado"],
    searchIntents: ["cómo escribir currículum de enfermero nuevo graduado", "ejemplos currículum enfermero nuevo graduado", "mejor formato CV enfermero nuevo graduado"],
    topSkills: ["Cuidado de Pacientes", "Administración de Medicamentos", "Evaluación Clínica", "Educación al Paciente", "Manejo del Tiempo", "Comunicación", "Colaboración en Equipo", "Pensamiento Crítico", "Soporte Vital Básico (BLS)", "Control de Infecciones"],
    atsKeywords: ["enfermería", "evaluación de pacientes", "habilidades clínicas", "BLS", "seguridad del paciente", "cuidado de la salud", "manejo de medicamentos", "documentación", "respuesta a emergencias", "abogacía del paciente", "trabajo en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermero Nuevo Graduado",
      summary: "Enfermero graduado compasivo y dedicado con más de 2 años de experiencia clínica en diversos entornos de atención médica. Capacidad comprobada para proporcionar atención de alta calidad a los pacientes y apoyo con una tasa de satisfacción del paciente del 95%.",
      skills: ["Cuidado de Pacientes", "Administración de Medicamentos", "Evaluación Clínica", "Educación al Paciente", "Manejo del Tiempo", "Comunicación", "Colaboración en Equipo", "Pensamiento Crítico", "Soporte Vital Básico (BLS)", "Control de Infecciones"],
      experience: [
        {
          title: "Nursing Intern",
          company: "Mercy Hospital",
          startDate: "2022-01",
          isCurrent: true,
          achievements: [
            "Proporcioné atención a más de 50 pacientes, lo que resultó en una puntuación de satisfacción del 95% en encuestas de pacientes.",
            "Asistí en la administración de medicamentos con un 100% de cumplimiento con los protocolos de seguridad.",
            "Colaboré con un equipo de enfermeras y médicos para mejorar los procesos de alta de pacientes, reduciendo la estancia promedio en 1 día.",
          ],
        },
        {
          title: "Healthcare Assistant",
          company: "Sunnydale Nursing Home",
          startDate: "2020-06",
          endDate: "2021-12",
          achievements: [
            "Apoyé las actividades de la vida diaria de más de 30 residentes, mejorando su calidad de vida.",
            "Realicé controles de signos vitales e informé cambios al personal de enfermería, asegurando intervenciones oportunas.",
            "Capacité a 5 nuevos miembros del personal en las mejores prácticas para el cuidado y la seguridad del paciente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Registered Nurse (RN)", issuer: "State Board of Nursing", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un New Grad Nurse en su currículum?", answer: "Un New Grad Nurse debe incluir su educación, experiencia clínica, habilidades relevantes y certificaciones." },
      { question: "¿Cómo destacar mi currículum de New Grad Nurse?", answer: "Asegúrese de resaltar su experiencia clínica, habilidades interpersonales y logros en atención al paciente." },
      { question: "¿Qué habilidades necesita un New Grad Nurse?", answer: "Un New Grad Nurse necesita habilidades en cuidado de pacientes, administración de medicamentos, comunicación efectiva y trabajo en equipo." },
    ],
  },
  "nuclear-pharmacist": {
    slug: "farmaceutico-nuclear",
    title: "Farmacéutico Nuclear",
    keywords: ["currículum de Farmacéutico Nuclear", "CV de Farmacéutico Nuclear", "ejemplo currículum Farmacéutico Nuclear", "plantilla CV Farmacéutico Nuclear"],
    searchIntents: ["cómo escribir currículum de Farmacéutico Nuclear", "ejemplos currículum Farmacéutico Nuclear", "mejor formato CV Farmacéutico Nuclear"],
    topSkills: ["Preparación de Radiofármacos", "Control de Calidad", "Consejería a Pacientes", "Cumplimiento Regulatorio", "Gestión de Inventarios", "Imágenes Diagnósticas", "Farmacología Clínica", "Evaluación de Riesgos", "Investigación y Desarrollo", "Colaboración en Equipo"],
    atsKeywords: ["Farmacia Nuclear", "Radiofármacos", "Farmacocinética", "Seguridad del Paciente", "Práctica Farmacéutica", "Ensayos Clínicos", "Formulación", "Imágenes Médicas", "Ciencias Farmacéuticas", "Regulaciones de Salud", "Formulaciones de Medicamentos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Farmacéutico Nuclear",
      summary: "Farmacéutico Nuclear dedicado con más de 5 años de experiencia en la preparación y dispensación de radiofármacos. Mejoró con éxito los resultados de los pacientes en un 30% a través de una consejería efectiva y el cumplimiento de protocolos de seguridad.",
      skills: ["Preparación de Radiofármacos", "Control de Calidad", "Consejería a Pacientes", "Cumplimiento Regulatorio", "Gestión de Inventarios", "Imágenes Diagnósticas", "Farmacología Clínica", "Evaluación de Riesgos", "Investigación y Desarrollo", "Colaboración en Equipo"],
      experience: [
        {
          title: "Farmacéutico Nuclear Senior",
          company: "Radiant Health Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en la preparación de radiofármacos en un 25% mediante la implementación de procesos simplificados.",
            "Gestioné con éxito un equipo de 5 farmacéuticos y técnicos para mantener el cumplimiento de todas las normas regulatorias.",
            "Desarrollé un programa de consejería a pacientes que mejoró las tasas de adherencia a la medicación en un 40%.",
          ],
        },
        {
          title: "Farmacéutico Nuclear",
          company: "MediScan Imaging Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Reduje el desperdicio de radiofármacos en un 15% mediante mejores prácticas de gestión de inventarios.",
            "Realicé más de 200 consultas con pacientes, asegurando el uso seguro y efectivo de los radiofármacos.",
            "Colaboré con médicos para optimizar los protocolos de imágenes, mejorando la precisión diagnóstica.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Board Certified Nuclear Pharmacist", issuer: "Board of Pharmacy Specialties", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Farmacéutico Nuclear en su currículum?", answer: "Incluir experiencia en la preparación de radiofármacos, consejería a pacientes y cumplimiento regulatorio." },
      { question: "¿Cómo destacar mi currículum de Farmacéutico Nuclear?", answer: "Resaltar logros cuantificables y experiencia relevante en la industria." },
      { question: "¿Qué habilidades necesita un Farmacéutico Nuclear?", answer: "Conocimientos en farmacología clínica, gestión de inventarios y control de calidad." },
    ],
  },
  "nurse": {
    slug: "enfermero-registrado",
    title: "Enfermero Registrado",
    keywords: ["currículum de enfermero registrado", "CV de enfermero registrado", "ejemplo currículum enfermero registrado", "plantilla CV enfermero registrado"],
    searchIntents: ["cómo escribir currículum de enfermero registrado", "ejemplos currículum enfermero registrado", "mejor formato CV enfermero registrado"],
    topSkills: ["Cuidado del Paciente", "Pensamiento Crítico", "Comunicación", "Gestión del Tiempo", "Empatía", "Trabajo en Equipo", "Habilidades Técnicas", "Atención al Detalle", "Resolución de Problemas", "Adaptabilidad"],
    atsKeywords: ["evaluación de pacientes", "administración de medicamentos", "documentación clínica", "planificación de cuidados", "control de infecciones", "educación al paciente", "cumplimiento normativo de salud", "respuesta a emergencias", "monitoreo de signos vitales", "colaboración interdisciplinaria", "intervenciones de enfermería"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermero Registrado",
      summary: "Enfermero Registrado dedicado con más de 5 años de experiencia en la prestación de atención de alta calidad a los pacientes. Historial comprobado de mejorar las puntuaciones de satisfacción del paciente en un 20% en un entorno hospitalario ocupado.",
      skills: ["Cuidado del Paciente", "Pensamiento Crítico", "Comunicación", "Gestión del Tiempo", "Empatía", "Trabajo en Equipo", "Habilidades Técnicas", "Atención al Detalle", "Resolución de Problemas", "Adaptabilidad"],
      experience: [
        {
          title: "Enfermero Registrado Senior",
          company: "General Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró los tiempos de recuperación de los pacientes en un 15% mediante la implementación de nuevos protocolos de atención.",
            "Capacitó y mentoreó a 10 enfermeros junior, mejorando el rendimiento del equipo.",
            "Desarrolló un sistema de retroalimentación de pacientes que aumentó las puntuaciones de satisfacción en un 25%.",
          ],
        },
        {
          title: "Enfermero Registrado",
          company: "Community Health Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestionó con éxito una carga de 30 pacientes diarios.",
            "Realizó talleres de educación en salud que alcanzaron a más de 100 miembros de la comunidad.",
            "Redujo los errores de medicación en un 10% mediante un monitoreo cuidadoso y educación al paciente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Registered Nurse License", issuer: "State Board of Nursing", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Enfermero Registrado en su currículum?", answer: "Un Enfermero Registrado debe incluir su experiencia laboral, habilidades relevantes, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Enfermero Registrado?", answer: "Destacar logros cuantificables y habilidades clave en atención al paciente." },
      { question: "¿Qué habilidades necesita un Enfermero Registrado?", answer: "Habilidades en cuidado del paciente, comunicación, trabajo en equipo y resolución de problemas." },
    ],
  },
  "nurse-recruiter": {
    slug: "reclutador-de-enfermeros",
    title: "Reclutador de Enfermeros",
    keywords: ["currículum de reclutador de enfermeros", "CV de reclutador de enfermeros", "ejemplo currículum reclutador de enfermeros", "plantilla CV reclutador de enfermeros"],
    searchIntents: ["cómo escribir currículum de reclutador de enfermeros", "ejemplos currículum reclutador de enfermeros", "mejor formato CV reclutador de enfermeros"],
    topSkills: ["Adquisición de Talento", "Reclutamiento en Salud", "Habilidades Interpersonales", "Negociación", "Sourcing de Candidatos", "Sistemas de Seguimiento de Solicitudes", "Networking", "Comunicación", "Entrevistas", "Investigación de Mercado"],
    atsKeywords: ["reclutamiento de enfermería", "dotación de personal en salud", "colocación laboral", "evaluación de candidatos", "marketing de reclutamiento", "integración de empleados", "gestión de recursos humanos", "filtrado de currículums", "relaciones con clientes", "soluciones de personal", "planificación de fuerza laboral"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Reclutador de Enfermeros",
      summary: "Reclutador de Enfermeros dedicado con más de 5 años de experiencia en dotación de personal en salud, logrando colocar a más de 200 profesionales de enfermería calificados en diversas instalaciones de salud, resultando en una mejora del 30% en las calificaciones de satisfacción del cliente.",
      skills: ["Adquisición de Talento", "Reclutamiento en Salud", "Habilidades Interpersonales", "Negociación", "Sourcing de Candidatos", "Sistemas de Seguimiento de Solicitudes", "Networking", "Comunicación", "Entrevistas", "Investigación de Mercado"],
      experience: [
        {
          title: "Reclutador Senior de Enfermeros",
          company: "HealthPro Staffing",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia de reclutamiento en un 40% mediante la implementación de un nuevo ATS.",
            "Logró cubrir 150 posiciones de enfermería en un año, superando las metas de la empresa en un 20%.",
            "Desarrolló relaciones sólidas con los clientes que llevaron a un crecimiento del 25% en negocios recurrentes.",
          ],
        },
        {
          title: "Reclutador de Enfermeros",
          company: "MedStaff Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Redujo el tiempo de cobertura de posiciones de enfermería en un 30% al optimizar el proceso de reclutamiento.",
            "Realizó más de 200 entrevistas, logrando una tasa de aceptación del 90% en ofertas de trabajo.",
            "Estableció un programa de referencias que aumentó las referencias de candidatos en un 50%.",
          ],
        },
      ],
      education: [
        { institution: "University of Nursing and Health Sciences", degree: "B.S.", field: "Administración de Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Nurse Recruiter", issuer: "National Association of Healthcare Recruiters", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un reclutador de enfermeros en su currículum?", answer: "Un reclutador de enfermeros debe incluir su experiencia en reclutamiento, habilidades interpersonales y logros medibles en sus roles anteriores." },
      { question: "¿Cómo destacar mi currículum de reclutador de enfermeros?", answer: "Para destacar, enfócate en tus logros cuantificables, personaliza tu currículum para cada oferta de trabajo y destaca tus habilidades interpersonales." },
      { question: "¿Qué habilidades necesita un reclutador de enfermeros?", answer: "Un reclutador de enfermeros necesita habilidades en adquisición de talento, comunicación efectiva, negociación y manejo de sistemas de seguimiento de solicitudes." },
    ],
  },
  "operations-development-intern-the-mann-center": {
    slug: "practicas-desarrollo-operaciones",
    title: "Practicante en Desarrollo de Operaciones",
    keywords: ["currículum de practicante en desarrollo de operaciones", "CV de practicante en desarrollo de operaciones", "ejemplo currículum practicante en desarrollo de operaciones", "plantilla CV practicante en desarrollo de operaciones"],
    searchIntents: ["cómo escribir currículum de practicante en desarrollo de operaciones", "ejemplos currículum practicante en desarrollo de operaciones", "mejor formato CV practicante en desarrollo de operaciones"],
    topSkills: ["Análisis de Datos", "Gestión de Proyectos", "Mejora de Procesos", "Comunicación", "Resolución de Problemas", "Colaboración en Equipo", "Gestión del Tiempo", "Adaptabilidad", "Habilidades de Investigación", "Atención al Detalle"],
    atsKeywords: ["operaciones", "prácticas", "desarrollo", "gestión de proyectos", "análisis de datos", "mejora de procesos", "comunicación", "trabajo en equipo", "colaboración", "resolución de problemas", "gestión del tiempo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante en Desarrollo de Operaciones",
      summary: "Practicante en Desarrollo de Operaciones dedicado con 2 años de experiencia en optimización de procesos y gestión de proyectos, contribuyendo a un aumento del 15% en la eficiencia operativa en prácticas anteriores.",
      skills: ["Análisis de Datos", "Gestión de Proyectos", "Mejora de Procesos", "Comunicación", "Resolución de Problemas", "Colaboración en Equipo", "Gestión del Tiempo", "Adaptabilidad", "Habilidades de Investigación", "Atención al Detalle"],
      experience: [
        {
          title: "Practicante Analista de Operaciones",
          company: "FedEx",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo sistema de seguimiento de datos que mejoró la velocidad de informes en un 30%",
            "Analicé datos operativos para identificar ineficiencias, resultando en un ahorro del 10%",
            "Colaboré con equipos multifuncionales para optimizar procesos, aumentando la productividad del equipo en un 20%",
          ],
        },
        {
          title: "Practicante de Operaciones Comerciales",
          company: "Amazon",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Apoyé el lanzamiento de una nueva iniciativa logística, lo que llevó a una reducción del 25% en los tiempos de entrega",
            "Realicé investigaciones de mercado que informaron decisiones estratégicas, mejorando los puntajes de satisfacción del cliente en un 15%",
            "Asistí en la creación de mapas de procesos para flujos de trabajo operativos, mejorando la eficiencia del equipo en un 18%",
          ],
        },
      ],
      education: [
        { institution: "University of Pennsylvania", degree: "B.S.", field: "Gestión de Operaciones", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Lean Six Sigma Green Belt", issuer: "ASQ", date: "2022-09" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Practicante en Desarrollo de Operaciones en su currículum?", answer: "Un practicante debe incluir experiencia relevante, habilidades técnicas y logros concretos en sus prácticas." },
      { question: "¿Cómo destacar mi currículum de Practicante en Desarrollo de Operaciones?", answer: "Incluir logros cuantificables y habilidades que se alineen con los requisitos del puesto." },
      { question: "¿Qué habilidades necesita un Practicante en Desarrollo de Operaciones?", answer: "Habilidades en análisis de datos, gestión de proyectos, y comunicación efectiva son esenciales." },
    ],
  },
  "orthopedic-nurse": {
    slug: "enfermera-ortopedica",
    title: "Enfermera Ortopédica",
    keywords: ["currículum de enfermera ortopédica", "CV de enfermera ortopédica", "ejemplo currículum enfermera ortopédica", "plantilla CV enfermera ortopédica"],
    searchIntents: ["cómo escribir currículum de enfermera ortopédica", "ejemplos currículum enfermera ortopédica", "mejor formato CV enfermera ortopédica"],
    topSkills: ["Evaluación de Pacientes", "Manejo del Dolor", "Asistencia en Cirugías Ortopédicas", "Yesos y Ferulización", "Soporte de Rehabilitación", "Educación del Paciente", "Cuidado de Heridas", "Registros Electrónicos de Salud (EHR)", "Colaboración en Equipo", "Pensamiento Crítico"],
    atsKeywords: ["Enfermería Ortopédica", "Cuidado del Paciente", "Procedimientos Quirúrgicos", "Habilidades Clínicas", "Gestión de Salud", "Seguridad del Paciente", "Control de Infecciones", "Administración de Medicamentos", "Documentación", "Certificación BLS", "Certificación ACLS"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera Ortopédica",
      summary: "Enfermera ortopédica dedicada con más de 5 años de experiencia en brindar atención de alta calidad a los pacientes. Mejoró con éxito los tiempos de recuperación de los pacientes en un 30% mediante una planificación y apoyo efectivos en la rehabilitación.",
      skills: ["Evaluación de Pacientes", "Manejo del Dolor", "Asistencia en Cirugías Ortopédicas", "Yesos y Ferulización", "Soporte de Rehabilitación", "Educación del Paciente", "Cuidado de Heridas", "Registros Electrónicos de Salud (EHR)", "Colaboración en Equipo", "Pensamiento Crítico"],
      experience: [
        {
          title: "Enfermera Ortopédica Senior",
          company: "Mayo Clinic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reduje el tiempo promedio de recuperación de los pacientes en un 30% mediante protocolos de rehabilitación mejorados.",
            "Asistí en más de 150 cirugías ortopédicas con un 95% de satisfacción del paciente.",
            "Implementé un programa de educación para pacientes que aumentó la adherencia a los cuidados postoperatorios en un 40%.",
          ],
        },
        {
          title: "Enfermera Ortopédica",
          company: "Cleveland Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Agilicé los procesos de ingreso de pacientes, reduciendo los tiempos de espera en un 20%.",
            "Brindé atención a un promedio de 10 pacientes por turno, asegurando un servicio de alta calidad.",
            "Colaboré con cirujanos ortopédicos para mejorar los resultados quirúrgicos y la atención al paciente.",
          ],
        },
      ],
      education: [
        { institution: "University of Florida", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Orthopedic Nurse", issuer: "Orthopedic Nurses Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Enfermera Ortopédica en su currículum?", answer: "Debe incluir su experiencia laboral, habilidades clínicas específicas y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Enfermera Ortopédica?", answer: "Utiliza palabras clave relevantes y destaca tus logros en el cuidado del paciente." },
      { question: "¿Qué habilidades necesita un Enfermera Ortopédica?", answer: "Habilidades en evaluación de pacientes, manejo del dolor y asistencia en procedimientos quirúrgicos." },
    ],
  },
  "pediatric-nurse": {
    slug: "enfermera-pediatrica",
    title: "Enfermera Pediátrica",
    keywords: ["currículum de enfermera pediátrica", "CV de enfermera pediátrica", "ejemplo currículum enfermera pediátrica", "plantilla CV enfermera pediátrica"],
    searchIntents: ["cómo escribir currículum de enfermera pediátrica", "ejemplos currículum enfermera pediátrica", "mejor formato CV enfermera pediátrica"],
    topSkills: ["Cuidado pediátrico", "Evaluación de pacientes", "Administración de medicamentos", "Educación familiar", "Pensamiento crítico", "Habilidades de comunicación", "Empatía", "Gestión del tiempo", "Colaboración", "Documentación clínica"],
    atsKeywords: ["enfermería pediátrica", "salud infantil", "planes de cuidado de enfermería", "defensa del paciente", "coordinación de cuidados", "educación en salud", "monitoreo de signos vitales", "inmunización", "respuesta a emergencias", "habilidades clínicas", "emergencias pediátricas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera Pediátrica",
      summary: "Enfermera Pediátrica dedicada con más de 5 años de experiencia en la entrega de atención excepcional a bebés, niños y adolescentes. Mejoró con éxito los puntajes de satisfacción del paciente en un 20% a través de una comunicación y prácticas de atención mejoradas.",
      skills: ["Cuidado pediátrico", "Evaluación de pacientes", "Administración de medicamentos", "Educación familiar", "Pensamiento crítico", "Habilidades de comunicación", "Empatía", "Gestión del tiempo", "Colaboración", "Documentación clínica"],
      experience: [
        {
          title: "Enfermera Pediátrica Senior",
          company: "Children's Hospital of Philadelphia",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró los tiempos de recuperación de pacientes en un 15% a través de la implementación de nuevos protocolos de atención.",
            "Gestionó un equipo de 5 enfermeras, lo que resultó en una reducción del 30% en errores de medicación.",
            "Lideró sesiones de educación para pacientes que aumentaron la participación familiar en el cuidado en un 40%.",
          ],
        },
        {
          title: "Enfermera Pediátrica",
          company: "Boston Children's Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Brindó atención a más de 200 pacientes pediátricos anualmente, asegurando altos estándares de seguridad y comodidad.",
            "Desarrolló un programa de capacitación para nuevo personal, mejorando la eficiencia de incorporación en un 25%.",
            "Participó en iniciativas de mejora de calidad que redujeron las tasas de readmisión en un 10%.",
          ],
        },
      ],
      education: [
        { institution: "University of Pennsylvania", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pediatric Nurse", issuer: "Pediatric Nursing Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un enfermera pediátrica en su currículum?", answer: "Debe incluir habilidades clínicas, experiencia en cuidado pediátrico, y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de enfermera pediátrica?", answer: "Asegúrate de resaltar tus logros cuantificables y tus habilidades interpersonales." },
      { question: "¿Qué habilidades necesita una enfermera pediátrica?", answer: "Necesita habilidades en cuidado pediátrico, comunicación, empatía y gestión del tiempo." },
    ],
  },
  "pharmacy-assistant": {
    slug: "asistente-de-farmacia",
    title: "Asistente de Farmacia",
    keywords: ["currículum de asistente de farmacia", "CV de asistente de farmacia", "ejemplo currículum asistente de farmacia", "plantilla CV asistente de farmacia"],
    searchIntents: ["cómo escribir currículum de asistente de farmacia", "ejemplos currículum asistente de farmacia", "mejor formato CV asistente de farmacia"],
    topSkills: ["Dispensación de Medicamentos", "Atención al Cliente", "Gestión de Inventario", "Conocimiento Farmacéutico", "Ingreso de Datos", "Comunicación", "Atención a los Detalles", "Resolución de Problemas", "Colaboración en Equipo", "Cumplimiento Regulatorio"],
    atsKeywords: ["farmacia", "asistente", "medicación", "atención al cliente", "inventario", "receta", "cuidado de la salud", "seguridad", "cuidado del paciente", "comunicación", "cumplimiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Farmacia",
      summary: "Asistente de Farmacia dedicado con más de 5 años de experiencia en dispensación de medicamentos y atención al cliente. Logré un aumento del 20% en las calificaciones de satisfacción del cliente a través de una comunicación y apoyo efectivos.",
      skills: ["Dispensación de Medicamentos", "Atención al Cliente", "Gestión de Inventario", "Conocimiento Farmacéutico", "Ingreso de Datos", "Comunicación", "Atención a los Detalles", "Resolución de Problemas", "Colaboración en Equipo", "Cumplimiento Regulatorio"],
      experience: [
        {
          title: "Asistente de Farmacia Senior",
          company: "Walgreens",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en el procesamiento de recetas en un 30% a través de flujos de trabajo simplificados.",
            "Gestioné los niveles de inventario, reduciendo las faltas de stock en un 15%.",
            "Proporcioné capacitación al nuevo personal, mejorando el rendimiento del equipo y la calidad del servicio.",
          ],
        },
        {
          title: "Asistente de Farmacia",
          company: "CVS Health",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en la gestión de más de 500 recetas semanales.",
            "Implementé un nuevo sistema de seguimiento de inventario que mejoró la precisión en un 25%.",
            "Recibí el premio Empleado del Mes por un servicio al cliente excepcional.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmacy Technician", issuer: "Pharmacy Technician Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Farmacia en su currículum?", answer: "Debe incluir experiencia relevante, habilidades específicas y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Asistente de Farmacia?", answer: "Utilice palabras clave relevantes y destaque sus logros en atención al cliente y manejo de medicamentos." },
      { question: "¿Qué habilidades necesita un Asistente de Farmacia?", answer: "Necesita habilidades en dispensación de medicamentos, atención al cliente, y gestión de inventario, entre otras." },
    ],
  },
  "pharmacy-business-manager": {
    slug: "gerente-de-negocios-de-farmacia",
    title: "Gerente de Negocios de Farmacia",
    keywords: ["currículum de Gerente de Negocios de Farmacia", "CV de Gerente de Negocios de Farmacia", "ejemplo currículum Gerente de Negocios de Farmacia", "plantilla CV Gerente de Negocios de Farmacia"],
    searchIntents: ["cómo escribir currículum de Gerente de Negocios de Farmacia", "ejemplos currículum Gerente de Negocios de Farmacia", "mejor formato CV Gerente de Negocios de Farmacia"],
    topSkills: ["Ventas Farmacéuticas", "Gestión de Inventarios", "Atención al Cliente", "Cumplimiento Regulatorio", "Análisis Financiero", "Liderazgo de Equipos", "Planificación Estratégica", "Análisis de Mercado", "Gestión de Proyectos", "Análisis de Datos"],
    atsKeywords: ["gestión de farmacias", "desarrollo de negocios", "análisis de rentabilidad", "gestión de personal", "gestión de la cadena de suministro", "gestión de relaciones con clientes", "presupuestación", "regulaciones farmacéuticas", "pronóstico de ventas", "métricas de rendimiento", "control de costos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Gerente de Negocios de Farmacia",
      summary: "Gerente de Negocios de Farmacia con más de 8 años de experiencia en la industria farmacéutica, conocido por aumentar los ingresos en un 30% mientras reduce los costos operativos en un 15%. Historial comprobado en liderazgo de equipos y planificación estratégica.",
      skills: ["Ventas Farmacéuticas", "Gestión de Inventarios", "Atención al Cliente", "Cumplimiento Regulatorio", "Análisis Financiero", "Liderazgo de Equipos", "Planificación Estratégica", "Análisis de Mercado", "Gestión de Proyectos", "Análisis de Datos"],
      experience: [
        {
          title: "Gerente Senior de Negocios de Farmacia",
          company: "Walgreens Boots Alliance",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Incrementé las ventas de farmacia en un 25% a través de iniciativas de marketing específicas.",
            "Gestioné un equipo de 15 farmacéuticos y técnicos, mejorando la eficiencia del servicio en un 20%.",
            "Implementé estrategias de reducción de costos que ahorraron a la empresa $500,000 anuales.",
          ],
        },
        {
          title: "Gerente de Operaciones de Farmacia",
          company: "CVS Health",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Optimicé los procesos de inventario, reduciendo el desperdicio en un 30%.",
            "Alcancé una calificación de satisfacción del cliente del 95% a través de una mejora en la entrega de servicios.",
            "Dirigí programas de capacitación que mejoraron el rendimiento del equipo, resultando en un aumento del 40% en la productividad.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmacy Manager", issuer: "American Pharmacists Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Gerente de Negocios de Farmacia en su currículum?", answer: "Un Gerente de Negocios de Farmacia debe incluir su experiencia en ventas, gestión de inventarios, y liderazgo de equipos." },
      { question: "¿Cómo destacar mi currículum de Gerente de Negocios de Farmacia?", answer: "Utiliza métricas concretas para demostrar tus logros y resalta tus habilidades en gestión y liderazgo." },
      { question: "¿Qué habilidades necesita un Gerente de Negocios de Farmacia?", answer: "Las habilidades clave incluyen ventas farmacéuticas, gestión de inventarios, y atención al cliente." },
    ],
  },
  "pharmacy-intern": {
    slug: "practicante-de-farmacia",
    title: "Practicante de Farmacia",
    keywords: ["currículum de practicante de farmacia", "CV de practicante de farmacia", "ejemplo currículum practicante de farmacia", "plantilla CV practicante de farmacia"],
    searchIntents: ["cómo escribir currículum de practicante de farmacia", "ejemplos currículum practicante de farmacia", "mejor formato CV practicante de farmacia"],
    topSkills: ["Gestión de Medicamentos", "Consejería al Paciente", "Cálculos Farmacéuticos", "Control de Inventarios", "Conocimiento de Interacciones de Medicamentos", "Habilidades de Composición", "Cumplimiento Regulatorio", "Servicio al Cliente", "Comunicación", "Colaboración en Equipo"],
    atsKeywords: ["practicante de farmacia", "pasantía", "cuidado farmacéutico", "farmacia clínica", "gestión de terapia con medicamentos", "seguridad del paciente", "cuidado de la salud", "farmacología", "composición", "relaciones con clientes", "operaciones farmacéuticas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Farmacia",
      summary: "Practicante de farmacia entusiasta con 2 años de experiencia en entornos clínicos, reconocido por mejorar la adherencia a la medicación de los pacientes en un 30%. Capacidad comprobada para colaborar con equipos de atención médica para optimizar el cuidado del paciente.",
      skills: ["Gestión de Medicamentos", "Consejería al Paciente", "Cálculos Farmacéuticos", "Control de Inventarios", "Conocimiento de Interacciones de Medicamentos", "Habilidades de Composición", "Cumplimiento Regulatorio", "Servicio al Cliente", "Comunicación", "Colaboración en Equipo"],
      experience: [
        {
          title: "Practicante de Farmacia Senior",
          company: "Walgreens",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la adherencia a la medicación de los pacientes en un 30% a través de consejería efectiva",
            "Gestioné el inventario, reduciendo el desperdicio de medicamentos en un 15%",
            "Colaboré con profesionales de la salud para mejorar los resultados del cuidado del paciente",
          ],
        },
        {
          title: "Practicante de Farmacia",
          company: "CVS Health",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistí en la dispensación de más de 1,000 recetas con precisión",
            "Proporcioné gestión de terapia con medicamentos para más de 200 pacientes",
            "Implementé un nuevo sistema para rastrear errores de medicamentos, reduciéndolos en un 20%",
          ],
        },
      ],
      education: [
        { institution: "University of California, San Francisco", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Pharmacy Technician Certification", issuer: "Pharmacy Technician Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un practicante de farmacia en su currículum?", answer: "Un practicante de farmacia debe incluir su experiencia clínica, habilidades relevantes, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de practicante de farmacia?", answer: "Enfatiza tus logros en experiencia previa y menciona tus habilidades específicas en farmacología y atención al paciente." },
      { question: "¿Qué habilidades necesita un practicante de farmacia?", answer: "Las habilidades clave incluyen gestión de medicamentos, consejería al paciente, y conocimientos en farmacología y composición." },
    ],
  },
  "pharmacy-technician": {
    slug: "tecnico-en-farmacia",
    title: "Técnico en Farmacia",
    keywords: ["currículum de técnico en farmacia", "CV de técnico en farmacia", "ejemplo currículum técnico en farmacia", "plantilla CV técnico en farmacia"],
    searchIntents: ["cómo escribir currículum de técnico en farmacia", "ejemplos currículum técnico en farmacia", "mejor formato CV técnico en farmacia"],
    topSkills: ["Dispensación de medicamentos", "Gestión de inventario", "Atención al cliente", "Cálculos farmacéuticos", "Procesamiento de recetas", "Conocimiento de seguridad de medicamentos", "Preparación de medicamentos", "Verificación de seguros", "Cumplimiento regulatorio", "Educación al paciente"],
    atsKeywords: ["técnico en farmacia", "gestión de medicamentos", "cuidado del paciente", "servicios farmacéuticos", "verificación de recetas", "control de inventario", "soporte al cliente", "interacciones medicamentosas", "regulaciones de salud", "farmacia clínica", "técnico de farmacia certificado"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico en Farmacia",
      summary: "Técnico en Farmacia dedicado con más de 5 años de experiencia en la dispensación de medicamentos y el cuidado del paciente, logrando una reducción del 15% en errores de medicación a través de procesos de verificación diligentes.",
      skills: ["Dispensación de medicamentos", "Gestión de inventario", "Atención al cliente", "Cálculos farmacéuticos", "Procesamiento de recetas", "Conocimiento de seguridad de medicamentos", "Preparación de medicamentos", "Verificación de seguros", "Cumplimiento regulatorio", "Educación al paciente"],
      experience: [
        {
          title: "Técnico de Farmacia Senior",
          company: "Walgreens",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de errores de medicación en un 15% a través de procesos de verificación mejorados",
            "Procesamiento de más de 200 recetas diarias con una tasa de precisión del 98%",
            "Implementación de un nuevo sistema de gestión de inventario que redujo desperdicios en $5,000 anuales",
          ],
        },
        {
          title: "Técnico en Farmacia",
          company: "CVS Health",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Asistencia en la capacitación de nuevo personal de farmacia, mejorando la eficiencia del equipo",
            "Mantenimiento de un índice de satisfacción del cliente del 95% a través de un servicio ejemplar",
            "Gestión del inventario de sustancias controladas en cumplimiento con las regulaciones estatales",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmacy Technician", issuer: "Pharmacy Technician Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico en Farmacia en su currículum?", answer: "Incluir experiencia en dispensación de medicamentos, gestión de inventario y atención al cliente." },
      { question: "¿Cómo destacar mi currículum de Técnico en Farmacia?", answer: "Enfatizar logros cuantificables y habilidades específicas del área." },
      { question: "¿Qué habilidades necesita un Técnico en Farmacia?", answer: "Dispensación de medicamentos, atención al cliente y conocimiento de regulaciones farmacéuticas." },
    ],
  },
  "pharmacy-technician-at-costco": {
    slug: "tecnico-en-farmacia",
    title: "Técnico en Farmacia",
    keywords: ["currículum de técnico en farmacia", "CV de técnico en farmacia", "ejemplo currículum técnico en farmacia", "plantilla CV técnico en farmacia"],
    searchIntents: ["cómo escribir currículum de técnico en farmacia", "ejemplos currículum técnico en farmacia", "mejor formato CV técnico en farmacia"],
    topSkills: ["Dispensación de Medicamentos", "Servicio al Cliente", "Gestión de Inventario", "Cálculos Farmacéuticos", "Preparación de Medicamentos", "Cumplimiento Regulatorio", "Ingreso de Datos", "Comunicación con Pacientes", "Resolución de Problemas", "Colaboración en Equipo"],
    atsKeywords: ["técnico en farmacia", "gestión de medicamentos", "atención al cliente", "procesamiento de recetas", "control de inventario", "gestión de terapia médica", "conocimientos farmacéuticos", "regulaciones de salud", "seguridad del paciente", "preparación de medicamentos", "facturación y codificación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico en Farmacia",
      summary: "Técnico en Farmacia orientado a los detalles con más de 5 años de experiencia en entornos de farmacia minorista, logrando un aumento del 20% en las puntuaciones de satisfacción del cliente a través de un servicio excepcional.",
      skills: ["Dispensación de Medicamentos", "Servicio al Cliente", "Gestión de Inventario", "Cálculos Farmacéuticos", "Preparación de Medicamentos", "Cumplimiento Regulatorio", "Ingreso de Datos", "Comunicación con Pacientes", "Resolución de Problemas", "Colaboración en Equipo"],
      experience: [
        {
          title: "Técnico en Farmacia Senior",
          company: "Costco Wholesale",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la precisión en la medicación en un 30% mediante procesos de verificación mejorados",
            "Gestioné los niveles de inventario para reducir desperdicios en $15,000 anuales",
            "Entrené a 10 nuevos técnicos, mejorando la eficiencia del equipo",
          ],
        },
        {
          title: "Técnico en Farmacia",
          company: "Walgreens",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Procesé más de 200 recetas diarias con una tasa de precisión del 99%",
            "Implementé un sistema de seguimiento de pacientes que mejoró las tasas de adherencia en un 25%",
            "Asistí en la gestión de un inventario de medicamentos de $500,000",
          ],
        },
      ],
      education: [
        { institution: "University of California, San Diego", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmacy Technician", issuer: "National Pharmacy Technician Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico en Farmacia en su currículum?", answer: "Debe incluir experiencia laboral relevante, habilidades técnicas y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Técnico en Farmacia?", answer: "Enfatiza tus logros y habilidades específicas en el sector farmacéutico." },
      { question: "¿Qué habilidades necesita un Técnico en Farmacia?", answer: "Habilidades en dispensación, atención al cliente, y gestión de inventario son esenciales." },
    ],
  },
  "pharmacy-technician-resume": {
    slug: "curriculum-tecnico-en-farmacia",
    title: "Currículum de Técnico en Farmacia",
    keywords: ["currículum de técnico en farmacia", "CV de técnico en farmacia", "ejemplo currículum técnico en farmacia", "plantilla CV técnico en farmacia"],
    searchIntents: ["cómo escribir currículum de técnico en farmacia", "ejemplos currículum técnico en farmacia", "mejor formato CV técnico en farmacia"],
    topSkills: ["Dispensación de Medicamentos", "Atención al Cliente", "Gestión de Inventarios", "Procesamiento de Recetas", "Cálculos Farmacéuticos", "Compuesto de Medicamentos", "Comunicación con Pacientes", "Cumplimiento Regulatorio", "Revisión de Utilización de Medicamentos", "Mantenimiento de Registros"],
    atsKeywords: ["Técnico en Farmacia", "Seguridad en Medicamentos", "Cuidado Farmacéutico", "Salud", "Soporte al Paciente", "Control de Inventarios", "Gestión de Recetas", "Interacción de Medicamentos", "Relaciones con Clientes", "Aseguramiento de Calidad", "Colaboración en Equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Técnico en Farmacia",
      summary: "Técnico en Farmacia dedicado con más de 5 años de experiencia en dispensación de medicamentos y atención al paciente, logrando una tasa de satisfacción del cliente del 98% a través de una comunicación efectiva y atención al detalle.",
      skills: ["Dispensación de Medicamentos", "Atención al Cliente", "Gestión de Inventarios", "Procesamiento de Recetas", "Cálculos Farmacéuticos", "Compuesto de Medicamentos", "Comunicación con Pacientes", "Cumplimiento Regulatorio", "Revisión de Utilización de Medicamentos", "Mantenimiento de Registros"],
      experience: [
        {
          title: "Técnico en Farmacia Senior",
          company: "CVS Health",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en el procesamiento de recetas en un 20% a través de flujos de trabajo optimizados.",
            "Logré una tasa de precisión del 99% en la dispensación de medicamentos durante el último año.",
            "Reduje los errores de medicación en un 30% implementando un nuevo proceso de verificación.",
          ],
        },
        {
          title: "Técnico en Farmacia",
          company: "Walgreens",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Ayudé en la gestión de inventarios por un valor de $500,000 con una precisión de stock del 98%.",
            "Proporcioné un servicio al cliente excepcional a más de 100 pacientes diariamente.",
            "Contribuí a un equipo que mejoró la eficiencia operativa en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmacy Technician", issuer: "Pharmacy Technician Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Técnico en Farmacia?", answer: "Debería incluir habilidades relevantes, experiencia laboral, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Técnico en Farmacia?", answer: "Asegúrate de resaltar tus logros y habilidades clave en el campo farmacéutico." },
      { question: "¿Qué habilidades necesita un Técnico en Farmacia?", answer: "Habilidades clave incluyen dispensación de medicamentos, atención al cliente, y gestión de inventarios." },
    ],
  },
  "physical-therapist-assistant": {
    slug: "asistente-de-terapia-fisica",
    title: "Asistente de Terapia Física",
    keywords: ["currículum de Asistente de Terapia Física", "CV de Asistente de Terapia Física", "ejemplo currículum Asistente de Terapia Física", "plantilla CV Asistente de Terapia Física"],
    searchIntents: ["cómo escribir currículum de Asistente de Terapia Física", "ejemplos currículum Asistente de Terapia Física", "mejor formato CV Asistente de Terapia Física"],
    topSkills: ["Terapia Manual", "Ejercicio Terapéutico", "Educación al Paciente", "Técnicas de Rehabilitación", "Dispositivos de Ayuda", "Modalidades", "Entrenamiento de la Marcha", "Documentación de Terapia Física", "Manejo del Dolor", "Colaboración en Equipo"],
    atsKeywords: ["Cuidado del Paciente", "Rehabilitación", "Terapia Física", "Programas de Ejercicio", "Asistencia en Movilidad", "Habilidades Clínicas", "Atención Médica", "Evaluación del Paciente", "Habilidades Interpersonales", "Modalidades Terapéuticas", "Documentación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Terapia Física",
      summary: "Asistente de Terapia Física dedicado con más de 5 años de experiencia brindando atención excepcional al paciente y servicios de rehabilitación. Logré un aumento del 20% en los resultados de movilidad de los pacientes a través de programas de ejercicio personalizados.",
      skills: ["Terapia Manual", "Ejercicio Terapéutico", "Educación al Paciente", "Técnicas de Rehabilitación", "Dispositivos de Ayuda", "Modalidades", "Entrenamiento de la Marcha", "Documentación de Terapia Física", "Manejo del Dolor", "Colaboración en Equipo"],
      experience: [
        {
          title: "Asistente de Terapia Física Senior",
          company: "Health First Rehabilitation",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré los resultados de movilidad de los pacientes en un 30% a través de programas de rehabilitación estructurados",
            "Asistí en más de 150 tratamientos de pacientes por mes, contribuyendo a tasas de recuperación mejoradas",
            "Desarrollé materiales educativos para pacientes que aumentaron la adherencia a los programas de ejercicio en casa en un 25%",
          ],
        },
        {
          title: "Asistente de Terapia Física",
          company: "Wellness Physical Therapy",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Facilité sesiones de rehabilitación para más de 200 pacientes, logrando una tasa de satisfacción del paciente del 95%",
            "Colaboré con terapeutas físicos para crear planes de tratamiento individualizados",
            "Entrené al nuevo personal en protocolos de atención al paciente, mejorando la eficiencia del equipo",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Asistencia en Terapia Física", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Physical Therapist Assistant", issuer: "American Physical Therapy Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Terapia Física en su currículum?", answer: "Un Asistente de Terapia Física debe incluir experiencia laboral relevante, habilidades clínicas, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Asistente de Terapia Física?", answer: "Utiliza palabras clave relevantes, resalta logros cuantificables y personaliza tu currículum para cada solicitud." },
      { question: "¿Qué habilidades necesita un Asistente de Terapia Física?", answer: "Un Asistente de Terapia Física necesita habilidades en terapia manual, educación al paciente, y colaboración en equipo, entre otras." },
    ],
  },
  "physical-therapist-pediatric-centre": {
    slug: "fisioterapeuta-centro-pediatrico",
    title: "Fisioterapeuta Centro Pediátrico",
    keywords: ["currículum de fisioterapeuta", "CV de fisioterapeuta", "ejemplo currículum fisioterapeuta", "plantilla CV fisioterapeuta"],
    searchIntents: ["cómo escribir currículum de fisioterapeuta", "ejemplos currículum fisioterapeuta", "mejor formato CV fisioterapeuta"],
    topSkills: ["Rehabilitación Pediátrica", "Ejercicios Terapéuticos", "Terapia Manual", "Evaluación del Paciente", "Entrenamiento de la Marcha", "Ortopedia Pediátrica", "Rehabilitación Neurológica", "Educación Familiar", "Electroterapia", "Evaluación del Desarrollo"],
    atsKeywords: ["terapia física pediátrica", "rehabilitación", "cuidado del paciente", "modalidades terapéuticas", "evaluación clínica", "planificación del tratamiento", "evaluación pediátrica", "colaboración interdisciplinaria", "práctica basada en evidencia", "seguimiento del progreso del paciente", "cuidado centrado en la familia"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Fisioterapeuta Centro Pediátrico",
      summary: "Fisioterapeuta dedicado con más de 5 años de experiencia en el cuidado pediátrico, mejorando exitosamente la movilidad y funcionalidad del paciente en un 30% a través de programas de rehabilitación personalizados.",
      skills: ["Rehabilitación Pediátrica", "Ejercicios Terapéuticos", "Terapia Manual", "Evaluación del Paciente", "Entrenamiento de la Marcha", "Ortopedia Pediátrica", "Rehabilitación Neurológica", "Educación Familiar", "Electroterapia", "Evaluación del Desarrollo"],
      experience: [
        {
          title: "Fisioterapeuta Pediátrico Senior",
          company: "Children's Health Network",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de recuperación de pacientes en un 25% a través de técnicas de terapia innovadoras.",
            "Manejé una carga de pacientes de más de 15 semanalmente, asegurando planes de tratamiento personalizados.",
            "Desarrollé un programa de divulgación comunitaria que educó a más de 100 familias sobre las opciones de terapia pediátrica.",
          ],
        },
        {
          title: "Fisioterapeuta Pediátrico",
          company: "Kids' Therapy Group",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Mejoré los resultados de movilidad de los pacientes en un 40% a través de regímenes de ejercicios específicos.",
            "Realicé evaluaciones exhaustivas que llevaron a un aumento del 20% en sesiones de terapia personalizadas.",
            "Colaboré con un equipo multidisciplinario para mejorar la entrega de atención.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Terapia Física", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Pediatric Advanced Life Support", issuer: "American Heart Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Fisioterapeuta Centro Pediátrico en su currículum?", answer: "Un Fisioterapeuta debe incluir su experiencia en terapia pediátrica, habilidades específicas y logros relevantes en su currículum." },
      { question: "¿Cómo destacar mi currículum de Fisioterapeuta Centro Pediátrico?", answer: "Utiliza palabras clave relevantes, destaca logros medibles y personaliza tu currículum para cada solicitud." },
      { question: "¿Qué habilidades necesita un Fisioterapeuta Centro Pediátrico?", answer: "Habilidades importantes incluyen evaluación del paciente, rehabilitación pediátrica, y técnicas de terapia manual." },
    ],
  },
  "physician": {
    slug: "curriculum-medico",
    title: "Médico",
    keywords: ["currículum de médico", "CV de médico", "ejemplo currículum médico", "plantilla CV médico"],
    searchIntents: ["cómo escribir currículum de médico", "ejemplos currículum médico", "mejor formato CV médico"],
    topSkills: ["Atención al Paciente", "Diagnóstico", "Planificación de Tratamiento", "Investigación Médica", "Habilidades Quirúrgicas", "Comunicación", "Pensamiento Crítico", "Empatía", "Colaboración en Equipo", "Educación del Paciente"],
    atsKeywords: ["MD", "DO", "Certificado por la Junta", "Investigación Clínica", "Manejo de Pacientes", "Medicina de Emergencias", "Medicina Interna", "Pediatría", "Medicina Familiar", "Cirugía", "Cuidado de la Salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Médico",
      summary: "Médico dedicado con más de 5 años de experiencia en diversos entornos de atención médica, brindando atención al paciente de alta calidad y logrando un aumento del 30% en las puntuaciones de satisfacción del paciente.",
      skills: ["Atención al Paciente", "Diagnóstico", "Planificación de Tratamiento", "Investigación Médica", "Habilidades Quirúrgicas", "Comunicación", "Pensamiento Crítico", "Empatía", "Colaboración en Equipo", "Educación del Paciente"],
      experience: [
        {
          title: "Médico Senior",
          company: "HealthFirst Medical Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó el flujo de pacientes en un 25% mediante una gestión eficiente del flujo de trabajo",
            "Lideró un equipo que redujo las tasas de readmisión en un 15% en dos años",
            "Implementó un nuevo programa de educación para pacientes que mejoró las tasas de cumplimiento en un 40%",
          ],
        },
        {
          title: "Médico Residente",
          company: "City Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Completó más de 1,500 horas de rotaciones clínicas en múltiples especialidades",
            "Participó en una investigación que resultó en un artículo publicado sobre salud cardiovascular",
            "Premiado como 'Residente del Año' por atención excepcional al paciente y trabajo en equipo",
          ],
        },
      ],
      education: [
        { institution: "State University School of Medicine", degree: "M.D.", field: "Medicina", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Board Certification in Internal Medicine", issuer: "American Board of Internal Medicine", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Médico en su currículum?", answer: "Debe incluir su formación académica, experiencia laboral, habilidades y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Médico?", answer: "Enfatiza tus logros, utiliza palabras clave relevantes y adapta tu currículum para cada puesto." },
      { question: "¿Qué habilidades necesita un Médico?", answer: "Entre las habilidades clave se encuentran la atención al paciente, diagnóstico, y habilidades de comunicación." },
    ],
  },
  "postdoctoral-position-in-hydrological-modeling": {
    slug: "puesto-postdoctoral-en-modelado-hidrologico",
    title: "Puesto Postdoctoral en Modelado Hidrológico",
    keywords: ["currículum de puesto postdoctoral", "CV de puesto postdoctoral", "ejemplo currículum puesto postdoctoral", "plantilla CV puesto postdoctoral"],
    searchIntents: ["cómo escribir currículum de puesto postdoctoral", "ejemplos currículum puesto postdoctoral", "mejor formato CV puesto postdoctoral"],
    topSkills: ["modelado hidrológico", "análisis de datos", "modelado estadístico", "hidroinformática", "análisis GIS", "teledetección", "programación (Python, R)", "recolección de datos de campo", "evaluación de impacto ambiental", "gestión de proyectos"],
    atsKeywords: ["modelado hidrológico", "análisis de datos", "modelado estadístico", "GIS", "teledetección", "Python", "R", "ciencia ambiental", "investigación de campo", "planificación de proyectos", "escritura académica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Puesto Postdoctoral en Modelado Hidrológico",
      summary: "Hidrólogo dedicado con más de 5 años de experiencia en modelado hidrológico y análisis de datos, habiendo liderado con éxito proyectos que mejoraron la gestión de recursos hídricos en un 30%.",
      skills: ["modelado hidrológico", "análisis de datos", "modelado estadístico", "hidroinformática", "análisis GIS", "teledetección", "programación (Python, R)", "recolección de datos de campo", "evaluación de impacto ambiental", "gestión de proyectos"],
      experience: [
        {
          title: "Científico Investigador Senior",
          company: "HydroTech Innovations",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró las estrategias de gestión de recursos hídricos, resultando en una reducción del 30% en el desperdicio de agua en múltiples proyectos.",
            "Lideró un equipo de 5 científicos en el desarrollo de un nuevo modelo hidrológico que aumentó la precisión de pronósticos en un 25%.",
            "Publicó 3 artículos revisados por pares en revistas de primer nivel, mejorando la reputación de la empresa en la comunidad de investigación hidrológica.",
          ],
        },
        {
          title: "Asociado de Investigación",
          company: "EcoHydrology Lab",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realizó una extensa investigación de campo que contribuyó a la adquisición de una importante subvención de $500,000 para estudios de calidad del agua.",
            "Desarrolló e implementó protocolos de recolección de datos que aumentaron la precisión de los datos en un 40%.",
            "Colaboró con equipos interdisciplinarios para evaluar los impactos ambientales de los cambios en el uso de la tierra.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "Ph.D.", field: "Hidrología", startDate: "2018-09", endDate: "2022-06" },
      ],
      certifications: [
        { name: "Certified Environmental Professional", issuer: "National Association of Environmental Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Postdoctoral Position In Hydrological Modeling en su currículum?", answer: "Debe incluir su experiencia en modelado hidrológico, análisis de datos y cualquier publicación relevante." },
      { question: "¿Cómo destacar mi currículum de Postdoctoral Position In Hydrological Modeling?", answer: "Enfatice sus logros significativos y habilidades técnicas específicas en el área." },
      { question: "¿Qué habilidades necesita un Postdoctoral Position In Hydrological Modeling?", answer: "Se requieren habilidades en modelado hidrológico, análisis de datos y programación, entre otras." },
    ],
  },
  "postdoctoral-research-associate": {
    slug: "asociado-de-investigacion-postdoctoral",
    title: "Asociado de Investigación Postdoctoral",
    keywords: ["currículum de asociado de investigación postdoctoral", "CV de asociado de investigación postdoctoral", "ejemplo currículum asociado de investigación postdoctoral", "plantilla CV asociado de investigación postdoctoral"],
    searchIntents: ["cómo escribir currículum de asociado de investigación postdoctoral", "ejemplos currículum asociado de investigación postdoctoral", "mejor formato CV asociado de investigación postdoctoral"],
    topSkills: ["Metodología de Investigación", "Análisis de Datos", "Software Estadístico", "Diseño Experimental", "Redacción Técnica", "Gestión de Proyectos", "Colaboración", "Habilidades de Presentación", "Resolución de Problemas", "Pensamiento Crítico"],
    atsKeywords: ["Investigación Postdoctoral", "Asociado de Investigación", "Investigación Académica", "Redacción Científica", "Interpretación de Datos", "Técnicas de Laboratorio", "Redacción de Propuestas", "Revisión por Pares", "Análisis Estadístico", "Publicaciones de Investigación", "Investigación Colaborativa"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asociado de Investigación Postdoctoral",
      summary: "Asociado de Investigación Postdoctoral orientado al detalle con más de 4 años de experiencia en investigación en biología molecular y un historial comprobado de publicaciones en revistas de alto impacto, mejorando la productividad del equipo en un 30%.",
      skills: ["Metodología de Investigación", "Análisis de Datos", "Software Estadístico", "Diseño Experimental", "Redacción Técnica", "Gestión de Proyectos", "Colaboración", "Habilidades de Presentación", "Resolución de Problemas", "Pensamiento Crítico"],
      experience: [
        {
          title: "Asociado de Investigación Senior",
          company: "Genentech",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia del laboratorio en un 25% mediante la implementación de nuevos sistemas de gestión de datos.",
            "Publicó 3 artículos en revistas revisadas por pares, contribuyendo a un aumento del 15% en métricas de cita.",
            "Lideró un equipo de 5 investigadores en un proyecto que recibió $200,000 en financiamiento de subvenciones.",
          ],
        },
        {
          title: "Asociado de Investigación",
          company: "Harvard University",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuyó a 4 publicaciones de alto impacto, mejorando la reputación del laboratorio en el campo.",
            "Desarrolló un nuevo ensayo que mejoró la precisión de las pruebas en un 40%.",
            "Capacitó a 10 estudiantes de pregrado en técnicas de laboratorio y metodologías de investigación.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "Ph.D.", field: "Biología Molecular", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Research Coordinator", issuer: "Association of Clinical Research Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asociado de Investigación Postdoctoral en su currículum?", answer: "Debe incluir experiencia de investigación relevante, habilidades técnicas y publicaciones en revistas científicas." },
      { question: "¿Cómo destacar mi currículum de Asociado de Investigación Postdoctoral?", answer: "Enfatice sus logros en investigación y colabore con otros en su campo." },
      { question: "¿Qué habilidades necesita un Asociado de Investigación Postdoctoral?", answer: "Habilidades en metodología de investigación, análisis de datos, y redacción científica son esenciales." },
    ],
  },
  "postdoctoral-researcher-resume": {
    slug: "curriculum-investigador-postdoctoral",
    title: "Currículum de Investigador Postdoctoral",
    keywords: ["currículum de investigador postdoctoral", "CV de investigador postdoctoral", "ejemplo currículum investigador postdoctoral", "plantilla CV investigador postdoctoral"],
    searchIntents: ["cómo escribir currículum de investigador postdoctoral", "ejemplos currículum investigador postdoctoral", "mejor formato CV investigador postdoctoral"],
    topSkills: ["Pensamiento Analítico", "Metodologías de Investigación", "Análisis de Datos", "Redacción Científica", "Gestión de Proyectos", "Colaboración", "Resolución de Problemas", "Software Estadístico", "Diseño Experimental", "Bioinformática"],
    atsKeywords: ["postdoctoral", "investigación", "PhD", "análisis de datos", "comunicación científica", "redacción de propuestas", "habilidades de laboratorio", "colaboración", "publicación", "gestión de proyectos", "bioestadística"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Investigador Postdoctoral",
      summary: "Investigador postdoctoral dedicado con más de 5 años de experiencia en biología molecular y un historial comprobado de asegurar más de $200,000 en financiamiento para investigación. Hábil en análisis de datos y redacción científica, con múltiples publicaciones en revistas de alto impacto.",
      skills: ["Pensamiento Analítico", "Metodologías de Investigación", "Análisis de Datos", "Redacción Científica", "Gestión de Proyectos", "Colaboración", "Resolución de Problemas", "Software Estadístico", "Diseño Experimental", "Bioinformática"],
      experience: [
        {
          title: "Investigador Postdoctoral Senior",
          company: "Harvard University",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aseguré $150,000 en financiamiento para investigar soluciones de terapia génica, aumentando el presupuesto del proyecto en un 30%",
            "Publiqué 5 artículos revisados por pares con un factor de impacto promedio de 7.2",
            "Dirigí un equipo de 4 investigadores para desarrollar un nuevo ensayo que redujo el tiempo de análisis en un 40%",
          ],
        },
        {
          title: "Investigador Postdoctoral",
          company: "Stanford University",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a un proyecto multiinstitucional que resultó en una publicación revolucionaria en Nature",
            "Optimicé los protocolos de laboratorio, resultando en un aumento del 25% en eficiencia",
            "Presenté hallazgos en 3 conferencias internacionales, mejorando la visibilidad institucional",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "Ph.D.", field: "Biología Molecular", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Research Coordinator", issuer: "Association of Clinical Research Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de investigador postdoctoral?", answer: "Un currículum debe incluir su experiencia de investigación, publicaciones, financiamiento obtenido y habilidades clave." },
      { question: "¿Cómo destacar mi currículum de investigador postdoctoral?", answer: "Enfatiza tus logros en investigación, menciona tus publicaciones y cualquier financiamiento que hayas conseguido." },
      { question: "¿Qué habilidades necesita un investigador postdoctoral?", answer: "Las habilidades clave incluyen pensamiento analítico, metodologías de investigación y capacidades de redacción científica." },
    ],
  },
  "psychiatrist": {
    slug: "curriculum-psiquiatra",
    title: "Psiquiatra",
    keywords: ["currículum de psiquiatra", "CV de psiquiatra", "ejemplo currículum psiquiatra", "plantilla CV psiquiatra"],
    searchIntents: ["cómo escribir currículum de psiquiatra", "ejemplos currículum psiquiatra", "mejor formato CV psiquiatra"],
    topSkills: ["Evaluación de Pacientes", "Psicoterapia", "Manejo de Medicamentos", "Intervención en Crisis", "Habilidades Diagnósticas", "Habilidades Interpersonales", "Colaboración", "Competencia Cultural", "Planificación de Tratamiento", "Habilidades de Investigación"],
    atsKeywords: ["salud mental", "psicofarmacología", "evaluación clínica", "terapia conductual", "terapia cognitivo-conductual", "evaluación psiquiátrica", "cuidado del paciente", "diagnóstico", "protocolos de tratamiento", "educación continua", "licencia"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Psiquiatra",
      summary: "Psiquiatra dedicada con más de 5 años de experiencia en atención de salud mental, mejorando con éxito los resultados de los pacientes en un 30% a través de planes de tratamiento personalizados.",
      skills: ["Evaluación de Pacientes", "Psicoterapia", "Manejo de Medicamentos", "Intervención en Crisis", "Habilidades Diagnósticas", "Habilidades Interpersonales", "Colaboración", "Competencia Cultural", "Planificación de Tratamiento", "Habilidades de Investigación"],
      experience: [
        {
          title: "Psiquiatra Senior",
          company: "Mindful Health Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de retención de pacientes en un 25% a través de estrategias de atención personalizadas",
            "Facilité más de 200 sesiones de terapia, logrando un 90% de satisfacción del paciente",
            "Lideré un equipo que desarrolló un nuevo protocolo de tratamiento, reduciendo las tasas de hospitalización en un 15%",
          ],
        },
        {
          title: "Psiquiatra",
          company: "Sunnyvale Mental Health Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Manejé una diversa carga de pacientes con un enfoque en trastornos de depresión y ansiedad",
            "Realicé evaluaciones integrales que llevaron a diagnósticos precisos para más de 150 pacientes",
            "Implementé sesiones de terapia grupal innovadoras, resultando en una mejora del 20% en los resultados de los pacientes",
          ],
        },
      ],
      education: [
        { institution: "Harvard University", degree: "M.D.", field: "Psiquiatría", startDate: "2010-08", endDate: "2014-05" },
      ],
      certifications: [
        { name: "Board Certified Psychiatrist", issuer: "American Board of Psychiatry and Neurology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un psiquiatra en su currículum?", answer: "Debe incluir su experiencia laboral, educación, certificaciones y habilidades relevantes." },
      { question: "¿Cómo destacar mi currículum de psiquiatra?", answer: "Enfatiza tus logros y experiencia en la mejora de resultados de los pacientes." },
      { question: "¿Qué habilidades necesita un psiquiatra?", answer: "Habilidades en evaluación de pacientes, psicoterapia, y manejo de medicamentos son clave." },
    ],
  },
  "psychology-intern": {
    slug: "psicologo-practicante",
    title: "Psicólogo Practicante",
    keywords: ["currículum de psicólogo practicante", "CV de psicólogo practicante", "ejemplo currículum psicólogo practicante", "plantilla CV psicólogo practicante"],
    searchIntents: ["cómo escribir currículum de psicólogo practicante", "ejemplos currículum psicólogo practicante", "mejor formato CV psicólogo practicante"],
    topSkills: ["Análisis del comportamiento", "Evaluación cognitiva", "Investigación clínica", "Recolección de datos", "Interacción con pacientes", "Redacción de informes", "Comunicación terapéutica", "Análisis estadístico", "Colaboración en equipo", "Intervención en crisis"],
    atsKeywords: ["psicología pasantía", "psicología clínica", "métodos de investigación", "evaluaciones psicológicas", "cuidado del paciente", "análisis de datos", "trabajo en equipo", "habilidades de comunicación", "confidencialidad", "salud mental", "terapia conductual"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Psicólogo Practicante",
      summary: "Psicólogo practicante dedicado con 2 años de experiencia en entornos clínicos y un historial comprobado de mejorar los resultados de los pacientes en un 20% a través de técnicas efectivas de comunicación y evaluación.",
      skills: ["Análisis del comportamiento", "Evaluación cognitiva", "Investigación clínica", "Recolección de datos", "Interacción con pacientes", "Redacción de informes", "Comunicación terapéutica", "Análisis estadístico", "Colaboración en equipo", "Intervención en crisis"],
      experience: [
        {
          title: "Psicólogo Practicante",
          company: "Mental Health Associates",
          startDate: "2022-01",
          isCurrent: true,
          achievements: [
            "Mejoró la participación de los pacientes en un 30% a través del desarrollo de planes terapéuticos personalizados",
            "Realizó más de 100 evaluaciones psicológicas que conducen a diagnósticos precisos",
            "Colaboró con un equipo multidisciplinario, contribuyendo a un aumento del 15% en la eficiencia del tratamiento",
          ],
        },
        {
          title: "Asistente de Investigación",
          company: "University Psychology Department",
          startDate: "2019-09",
          endDate: "2021-12",
          achievements: [
            "Asistió en un estudio que analizó los efectos de la terapia cognitiva, resultando en una publicación en una revista revisada por pares",
            "Gestionó el reclutamiento de participantes y la recolección de datos para más de 200 sujetos",
            "Presentó hallazgos en la conferencia anual de psicología, mejorando la visibilidad del departamento",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Psicología", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Certified Mental Health First Aid", issuer: "National Council for Behavioral Health", date: "2023-03" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un psicólogo practicante en su currículum?", answer: "Incluir experiencia relevante, habilidades clínicas, y logros cuantificables en la atención al paciente." },
      { question: "¿Cómo destacar mi currículum de psicólogo practicante?", answer: "Asegúrese de resaltar sus habilidades en comunicación y los resultados obtenidos en su experiencia anterior." },
      { question: "¿Qué habilidades necesita un psicólogo practicante?", answer: "Habilidades en análisis del comportamiento, evaluación cognitiva, y comunicación terapéutica son esenciales." },
    ],
  },
  "recreational-therapist": {
    slug: "terapeuta-recreativo",
    title: "Terapeuta Recreativo",
    keywords: ["currículum de terapeuta recreativo", "CV de terapeuta recreativo", "ejemplo currículum terapeuta recreativo", "plantilla CV terapeuta recreativo"],
    searchIntents: ["cómo escribir currículum de terapeuta recreativo", "ejemplos currículum terapeuta recreativo", "mejor formato CV terapeuta recreativo"],
    topSkills: ["Recreación Terapéutica", "Evaluación de Pacientes", "Planificación de Actividades", "Facilitación de Grupos", "Habilidades de Comunicación", "Adaptabilidad", "Intervención en Crisis", "Empatía", "Colaboración en Equipo", "Competencia Cultural"],
    atsKeywords: ["Terapia Recreativa", "Rehabilitación", "Cuidado de Pacientes", "Actividades Terapéuticas", "Salud Mental", "Apoyo a Personas con Discapacidad", "Recursos Comunitarios", "Compromiso del Cliente", "Protocolos de Seguridad", "Evaluación de Programas", "Equipo Interdisciplinario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Terapeuta Recreativo",
      summary: "Terapeuta Recreativo dedicado con más de 5 años de experiencia en la promoción del bienestar físico y emocional a través de programas recreativos personalizados, logrando una mejora del 30% en las métricas de compromiso de los clientes.",
      skills: ["Recreación Terapéutica", "Evaluación de Pacientes", "Planificación de Actividades", "Facilitación de Grupos", "Habilidades de Comunicación", "Adaptabilidad", "Intervención en Crisis", "Empatía", "Colaboración en Equipo", "Competencia Cultural"],
      experience: [
        {
          title: "Terapeuta Recreativo Senior",
          company: "HealthFirst Rehabilitation Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la participación de los pacientes en actividades recreativas en un 40% en 6 meses",
            "Desarrollé e implementé un nuevo programa terapéutico que mejoró las puntuaciones de satisfacción de los pacientes en un 25%",
            "Dirigí un equipo que organizó con éxito eventos de divulgación comunitaria, resultando en un aumento del 15% en la conciencia sobre los servicios",
          ],
        },
        {
          title: "Terapeuta Recreativo",
          company: "Sunshine Care Facility",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Diseñé planes recreativos individualizados para más de 100 clientes, mejorando su calidad de vida",
            "Facilité sesiones grupales terapéuticas semanales, aumentando la cohesión grupal en un 30%",
            "Colaboré con profesionales de la salud para integrar la recreación terapéutica en los planes de atención al paciente",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Terapia Recreativa", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Therapeutic Recreation Specialist (CTRS)", issuer: "National Council for Therapeutic Recreation Certification", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un terapeuta recreativo en su currículum?", answer: "Debe incluir sus habilidades, experiencia laboral, educación y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de terapeuta recreativo?", answer: "Enfóquese en logros cuantificables y en la personalización de su experiencia para cada puesto." },
      { question: "¿Qué habilidades necesita un terapeuta recreativo?", answer: "Las habilidades clave incluyen comunicación efectiva, empatía, y la capacidad de trabajar en equipo." },
    ],
  },
  "registered-nurse-akron-childrens-hospital": {
    slug: "enfermera-registrada",
    title: "Enfermera Registrada",
    keywords: ["currículum de enfermera registrada", "CV de enfermera registrada", "ejemplo currículum enfermera registrada", "plantilla CV enfermera registrada"],
    searchIntents: ["cómo escribir currículum de enfermera registrada", "ejemplos currículum enfermera registrada", "mejor formato CV enfermera registrada"],
    topSkills: ["Cuidado del Paciente", "Administración de Medicamentos", "Terapia IV", "Educación del Paciente", "Evaluación Clínica", "Certificación BLS", "Cuidado de Heridas", "Cuidado Pediátrico", "Respuesta a Emergencias", "Gestión del Tiempo"],
    atsKeywords: ["enfermería", "cuidado del paciente", "habilidades clínicas", "atención médica", "pediatría", "BLS", "RCP", "administración de medicamentos", "terapia IV", "cuidado de heridas", "evaluación del paciente"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera Registrada",
      summary: "Enfermera Registrada compasiva con más de 5 años de experiencia en cuidado pediátrico en Akron Children's Hospital, reconocida por mejorar los índices de satisfacción del paciente en un 20% a través de una comunicación efectiva y educación del paciente.",
      skills: ["Cuidado del Paciente", "Administración de Medicamentos", "Terapia IV", "Educación del Paciente", "Evaluación Clínica", "Certificación BLS", "Cuidado de Heridas", "Cuidado Pediátrico", "Respuesta a Emergencias", "Gestión del Tiempo"],
      experience: [
        {
          title: "Enfermera Registrada",
          company: "Akron Children's Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó los índices de satisfacción del paciente en un 20% mediante una mejor educación del paciente.",
            "Gestionó con éxito el cuidado de más de 50 pacientes pediátricos semanalmente, asegurando el cumplimiento de los planes de tratamiento.",
            "Implementó un nuevo protocolo de terapia IV que redujo las complicaciones en un 15%.",
          ],
        },
        {
          title: "Enfermera de Personal",
          company: "Cleveland Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Logró una tasa de cumplimiento del 95% en auditorías de administración de medicamentos.",
            "Participó en un equipo que desarrolló un programa de manejo del dolor pediátrico.",
            "Capacitó a 15 nuevas enfermeras en protocolos y procedimientos pediátricos.",
          ],
        },
      ],
      education: [
        { institution: "University of Akron", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Registered Nurse License", issuer: "Ohio Board of Nursing", date: "2018-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un enfermera registrada en su currículum?", answer: "Incluir la experiencia laboral relevante, las habilidades clínicas, las certificaciones y la educación." },
      { question: "¿Cómo destacar mi currículum de enfermera registrada?", answer: "Utilizar palabras clave relevantes y resaltar logros cuantificables en la experiencia laboral." },
      { question: "¿Qué habilidades necesita una enfermera registrada?", answer: "Habilidades en cuidado del paciente, administración de medicamentos, y conocimientos de procedimientos clínicos." },
    ],
  },
  "research-assistant-university-of-maryland-eastern-shore": {
    slug: "asistente-de-investigacion",
    title: "Asistente de Investigación",
    keywords: ["currículum de Asistente de Investigación", "CV de Asistente de Investigación", "ejemplo currículum Asistente de Investigación", "plantilla CV Asistente de Investigación"],
    searchIntents: ["cómo escribir currículum de Asistente de Investigación", "ejemplos currículum Asistente de Investigación", "mejor formato CV Asistente de Investigación"],
    topSkills: ["Análisis de Datos", "Software Estadístico", "Técnicas de Laboratorio", "Revisión de Literatura", "Diseño Experimental", "Metodología de Investigación", "Redacción Técnica", "Habilidades de Comunicación", "Gestión del Tiempo", "Resolución de Problemas"],
    atsKeywords: ["investigación", "recolección de datos", "análisis estadístico", "trabajo de campo", "redacción de informes", "pruebas de hipótesis", "ética de la investigación", "gestión de proyectos", "colaboración", "habilidades de presentación", "visualización de datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Investigación",
      summary: "Asistente de Investigación dedicado con más de 3 años de experiencia en recolección y análisis de datos, facilitando proyectos de investigación que llevaron a un aumento del 25% en la producción de publicaciones.",
      skills: ["Análisis de Datos", "Software Estadístico", "Técnicas de Laboratorio", "Revisión de Literatura", "Diseño Experimental", "Metodología de Investigación", "Redacción Técnica", "Habilidades de Comunicación", "Gestión del Tiempo", "Resolución de Problemas"],
      experience: [
        {
          title: "Asistente de Investigación",
          company: "University of Maryland Eastern Shore",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en la finalización de 5 proyectos de investigación que aumentaron la financiación en $50,000.",
            "Realicé revisiones exhaustivas de literatura que mejoraron los plazos de los proyectos en un 30%.",
            "Desarrollé y presenté hallazgos de investigación a la facultad, lo que llevó a un aumento del 20% en la colaboración departamental.",
          ],
        },
        {
          title: "Pasante de Investigación",
          company: "Johns Hopkins University",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé a un equipo de investigadores en un estudio clínico que inscribió a más de 200 participantes.",
            "Gestioné la entrada y análisis de datos, reduciendo errores en un 15% gracias a la meticulosa atención al detalle.",
            "Contribuí a la redacción de 3 artículos revisados por pares publicados en revistas de renombre.",
          ],
        },
      ],
      education: [
        { institution: "University of Maryland Eastern Shore", degree: "B.S.", field: "Ciencias Biológicas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Research Administrator", issuer: "Research Administrators Certification Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Research Assistant en su currículum?", answer: "Incluya sus experiencias relevantes, habilidades técnicas, y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Research Assistant?", answer: "Utilice palabras clave de la industria, muestre sus logros y mantenga un formato limpio y profesional." },
      { question: "¿Qué habilidades necesita un Research Assistant?", answer: "Necesita habilidades en análisis de datos, comunicación efectiva, y gestión del tiempo." },
    ],
  },
  "research-extern-american-foundation-of-suicide-prevention": {
    slug: "research-extern-american-foundation-of-suicide-prevention",
    title: "Investigador Externo en la Fundación Americana para la Prevención del Suicidio",
    keywords: ["currículum de Investigador Externo", "CV de Investigador Externo", "ejemplo currículum Investigador Externo", "plantilla CV Investigador Externo"],
    searchIntents: ["cómo escribir currículum de Investigador Externo", "ejemplos currículum Investigador Externo", "mejor formato CV Investigador Externo"],
    topSkills: ["Análisis de Datos", "Investigación Cualitativa", "Investigación Cuantitativa", "Software Estadístico", "Diseño de Encuestas", "Revisión de Literatura", "Conciencia sobre la Salud Mental", "Gestión de Proyectos", "Habilidades de Comunicación", "Colaboración"],
    atsKeywords: ["metodología de investigación", "recolección de datos", "análisis estadístico", "investigación en salud mental", "defensa de pacientes", "evaluación de programas", "estrategias de intervención", "redacción de informes", "colaboración en equipo", "alcance comunitario", "ética de la investigación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Investigador Externo en la Fundación Americana para la Prevención del Suicidio",
      summary: "Profesional de investigación dedicado con más de 3 años de experiencia en investigación en salud mental, contribuyendo a estudios que aumentaron la concienciación sobre las estrategias de prevención del suicidio en un 30%. Capacidad comprobada para analizar conjuntos de datos complejos y relacionarse con poblaciones diversas.",
      skills: ["Análisis de Datos", "Investigación Cualitativa", "Investigación Cuantitativa", "Software Estadístico", "Diseño de Encuestas", "Revisión de Literatura", "Conciencia sobre la Salud Mental", "Gestión de Proyectos", "Habilidades de Comunicación", "Colaboración"],
      experience: [
        {
          title: "Asistente de Investigación",
          company: "Johns Hopkins University",
          startDate: "2021-05",
          isCurrent: true,
          achievements: [
            "Contribuí a un estudio que identificó factores de riesgo clave para el suicidio en estudiantes universitarios, aumentando la participación en un 40%",
            "Analicé datos de encuestas de más de 1,000 participantes, resultando en un artículo publicado en una revista revisada por pares",
            "Coordiné grupos focales que mejoraron los programas de alcance comunitario en un 25%",
          ],
        },
        {
          title: "Interno, Investigación en Salud Mental",
          company: "National Institute of Mental Health",
          startDate: "2019-06",
          endDate: "2021-04",
          achievements: [
            "Asistí en el desarrollo de una encuesta nacional sobre tendencias en salud mental, alcanzando a más de 5,000 encuestados",
            "Apoyé la evaluación de programas de intervención que aumentaron el acceso a servicios de salud mental en un 20%",
            "Presenté hallazgos en la conferencia anual de salud mental, recibiendo comentarios positivos de expertos en el campo",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "Licenciatura", field: "Psicología", startDate: "2016-08", endDate: "2020-05" },
      ],
      certifications: [
        { name: "Certified Research Specialist", issuer: "Research Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Investigador Externo en la Fundación Americana para la Prevención del Suicidio en su currículum?", answer: "Incluir experiencia en investigación, habilidades en análisis de datos y conocimiento sobre salud mental." },
      { question: "¿Cómo destacar mi currículum de Investigador Externo en la Fundación Americana para la Prevención del Suicidio?", answer: "Resaltar logros cuantificables y experiencia en proyectos relevantes." },
      { question: "¿Qué habilidades necesita un Investigador Externo en la Fundación Americana para la Prevención del Suicidio?", answer: "Habilidades clave incluyen análisis de datos, investigación cualitativa y cuantitativa, y comunicación efectiva." },
    ],
  },
  "research-intern-carbon-trust": {
    slug: "research-intern-carbon-trust",
    title: "Practicante de Investigación Carbon Trust",
    keywords: ["currículum de Practicante de Investigación", "CV de Practicante de Investigación", "ejemplo currículum Practicante de Investigación", "plantilla CV Practicante de Investigación"],
    searchIntents: ["cómo escribir currículum de Practicante de Investigación", "ejemplos currículum Practicante de Investigación", "mejor formato CV Practicante de Investigación"],
    topSkills: ["Análisis de Datos", "Metodología de Investigación", "Redacción de Informes", "Software Estadístico", "Gestión de Proyectos", "Política Ambiental", "Prácticas de Sostenibilidad", "Habilidades de Presentación", "Pensamiento Crítico", "Colaboración en Equipo"],
    atsKeywords: ["Practicante de Investigación", "Carbon Trust", "Análisis de Datos", "Sostenibilidad", "Ciencias Ambientales", "Eficiencia Energética", "Cambio Climático", "Habilidades de Investigación", "Habilidades Analíticas", "Redacción de Informes", "Trabajo en Equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Investigación Carbon Trust",
      summary: "Practicante de investigación orientado a los detalles con 2 años de experiencia en proyectos de sostenibilidad y un historial comprobado de mejora en la precisión de informes en un 30%.",
      skills: ["Análisis de Datos", "Metodología de Investigación", "Redacción de Informes", "Software Estadístico", "Gestión de Proyectos", "Política Ambiental", "Prácticas de Sostenibilidad", "Habilidades de Presentación", "Pensamiento Crítico", "Colaboración en Equipo"],
      experience: [
        {
          title: "Practicante de Investigación",
          company: "Eco Consulting Group",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Contribuí a un proyecto que redujo el consumo de energía en un 15%, ahorrando al cliente $50,000 anuales.",
            "Realicé más de 100 encuestas para recopilar datos para iniciativas de sostenibilidad.",
            "Asistí en la preparación de un informe que fue presentado a partes interesadas del gobierno, influyendo en decisiones políticas.",
          ],
        },
        {
          title: "Practicante",
          company: "Green Energy Solutions",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Apoyé el desarrollo de un proyecto de energía renovable que aumentó la eficiencia en un 20%.",
            "Colaboré con un equipo para analizar datos de impacto ambiental para varios proyectos.",
            "Desarrollé y presenté un trabajo de investigación sobre prácticas sostenibles en negocios locales.",
          ],
        },
      ],
      education: [
        { institution: "University of Environmental Studies", degree: "Licenciatura", field: "Ciencias Ambientales", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Certified Sustainability Practitioner", issuer: "Sustainability Institute", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Practicante de Investigación Carbon Trust en su currículum?", answer: "Incluya sus habilidades de investigación, experiencia en proyectos de sostenibilidad y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Practicante de Investigación Carbon Trust?", answer: "Enfatice sus logros en proyectos y habilidades específicas relacionadas con la sostenibilidad." },
      { question: "¿Qué habilidades necesita un Practicante de Investigación Carbon Trust?", answer: "Habilidades en análisis de datos, redacción de informes y colaboración en equipo son esenciales." },
    ],
  },
  "school-psychologist": {
    slug: "psicologo-escolar",
    title: "Psicólogo Escolar",
    keywords: ["currículum de psicólogo escolar", "CV de psicólogo escolar", "ejemplo currículum psicólogo escolar", "plantilla CV psicólogo escolar"],
    searchIntents: ["cómo escribir currículum de psicólogo escolar", "ejemplos currículum psicólogo escolar", "mejor formato CV psicólogo escolar"],
    topSkills: ["Evaluación Psicológica", "Intervención Conductual", "Técnicas de Consejería", "Intervención en Crisis", "Análisis de Datos", "Colaboración con Educadores", "Planes de Educación Individualizados (IEP)", "Terapia Cognitivo Conductual (TCC)", "Resolución de Conflictos", "Competencia Cultural"],
    atsKeywords: ["psicología", "salud mental", "evaluación educativa", "terapia", "desarrollo infantil", "educación especial", "consultoría", "interpretación de datos", "seguridad escolar", "abogacía estudiantil", "apoyo emocional"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Psicólogo Escolar",
      summary: "Psicólogo Escolar dedicado con más de 5 años de experiencia en entornos educativos, mejorando exitosamente los resultados de salud mental de los estudiantes en un 30% a través de intervenciones específicas.",
      skills: ["Evaluación Psicológica", "Intervención Conductual", "Técnicas de Consejería", "Intervención en Crisis", "Análisis de Datos", "Colaboración con Educadores", "Planes de Educación Individualizados (IEP)", "Terapia Cognitivo Conductual (TCC)", "Resolución de Conflictos", "Competencia Cultural"],
      experience: [
        {
          title: "Psicólogo Escolar Senior",
          company: "Greenwood School District",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un programa de intervención a nivel escolar que redujo los incidentes de comportamiento en un 25%",
            "Dirigí talleres para maestros, resultando en un aumento del 40% en estrategias efectivas de manejo del aula",
            "Proporcioné consejería individual a más de 100 estudiantes, mejorando su rendimiento académico en un promedio del 15%",
          ],
        },
        {
          title: "Psicólogo Escolar",
          company: "Bright Futures Academy",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé evaluaciones psicológicas para más de 50 estudiantes, conduciendo a servicios de apoyo oportunos",
            "Desarrollé e implementé IEPs para estudiantes con necesidades especiales, mejorando su experiencia de aprendizaje",
            "Colaboré con padres y maestros para abordar problemas de comportamiento de los estudiantes, mejorando la dinámica general del aula",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Psicología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Nationally Certified School Psychologist", issuer: "National Association of School Psychologists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Psicólogo Escolar en su currículum?", answer: "Incluir experiencia relevante, habilidades específicas, y certificaciones necesarias para el cargo." },
      { question: "¿Cómo destacar mi currículum de Psicólogo Escolar?", answer: "Utilizar un formato claro, resaltar logros cuantificables y personalizarlo para cada oferta de trabajo." },
      { question: "¿Qué habilidades necesita un Psicólogo Escolar?", answer: "Habilidades en evaluación psicológica, intervención conductual y colaboración con educadores." },
    ],
  },
  "school-social-worker": {
    slug: "trabajador-social-escolar",
    title: "Trabajador Social Escolar",
    keywords: ["currículum de trabajador social escolar", "CV de trabajador social escolar", "ejemplo currículum trabajador social escolar", "plantilla CV trabajador social escolar"],
    searchIntents: ["cómo escribir currículum de trabajador social escolar", "ejemplos currículum trabajador social escolar", "mejor formato CV trabajador social escolar"],
    topSkills: ["Intervención en Crisis", "Técnicas de Consejería", "Gestión de Casos", "Evaluación Conductual", "Alcance Comunitario", "Resolución de Conflictos", "Empatía y Compasión", "Colaboración en Equipo", "Defensa", "Competencia Cultural"],
    atsKeywords: ["trabajo social", "consejería escolar", "salud mental", "apoyo estudiantil", "cuidado informado sobre el trauma", "consejería individual", "terapia de grupo", "apoyo IEP", "participación de padres", "coordinación de recursos", "confidencialidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Trabajador Social Escolar",
      summary: "Trabajador Social Escolar dedicado con más de 5 años de experiencia brindando apoyo a estudiantes y familias. Mejoró con éxito la asistencia estudiantil en un 20% a través de intervenciones específicas y asociaciones comunitarias.",
      skills: ["Intervención en Crisis", "Técnicas de Consejería", "Gestión de Casos", "Evaluación Conductual", "Alcance Comunitario", "Resolución de Conflictos", "Empatía y Compasión", "Colaboración en Equipo", "Defensa", "Competencia Cultural"],
      experience: [
        {
          title: "Trabajador Social Escolar Senior",
          company: "Bright Futures Academy",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la participación estudiantil en programas de salud mental en un 30% a través de estrategias de alcance innovadoras.",
            "Proporcioné consejería individual a más de 100 estudiantes por año, mejorando su rendimiento académico en un promedio del 15%.",
            "Desarrollé e implementé una iniciativa anti-bullying a nivel escolar que redujo los incidentes en un 40%.",
          ],
        },
        {
          title: "Trabajador Social Escolar",
          company: "Harmony High School",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Facilitó sesiones semanales de terapia grupal, ayudando a más de 50 estudiantes a lidiar con la ansiedad y la depresión.",
            "Coordiné con maestros y padres para crear planes de educación individualizados para estudiantes con necesidades especiales.",
            "Aumenté la participación de los padres en actividades escolares organizando talleres comunitarios.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Trabajo Social", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Licensed Clinical Social Worker", issuer: "State Board of Social Work", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Trabajador Social Escolar en su currículum?", answer: "Un Trabajador Social Escolar debe incluir su experiencia en intervención de crisis, técnicas de consejería, y gestión de casos, así como sus logros en la mejora del bienestar estudiantil." },
      { question: "¿Cómo destacar mi currículum de Trabajador Social Escolar?", answer: "Destaca tus logros cuantificables, tus habilidades interpersonales y cualquier experiencia relevante en programas comunitarios o escolares." },
      { question: "¿Qué habilidades necesita un Trabajador Social Escolar?", answer: "Las habilidades clave incluyen empatía, técnicas de consejería, gestión de crisis, y la capacidad de trabajar con diversas poblaciones." },
    ],
  },
  "social-work-gems-international-school": {
    slug: "curriculum-de-trabajo-social",
    title: "Currículum de Trabajo Social",
    keywords: ["currículum de trabajo social", "CV de trabajo social", "ejemplo currículum trabajo social", "plantilla CV trabajo social"],
    searchIntents: ["cómo escribir currículum de trabajo social", "ejemplos currículum trabajo social", "mejor formato CV trabajo social"],
    topSkills: ["gestión de casos", "asesoría", "intervención en crisis", "alcance comunitario", "defensa", "conciencia sobre salud mental", "competencia cultural", "resolución de conflictos", "desarrollo de programas", "inteligencia emocional"],
    atsKeywords: ["trabajador social", "trabajador de casos", "salud mental", "defensa del cliente", "servicio comunitario", "técnicas terapéuticas", "servicios sociales", "apoyo familiar", "estrategias de intervención", "asignación de recursos", "empoderamiento"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Trabajo Social",
      summary: "Trabajador social dedicado con más de 5 años de experiencia en gestión de casos y alcance comunitario, aumentando exitosamente la satisfacción del cliente en un 30% a través de una defensa y apoyo efectivos.",
      skills: ["gestión de casos", "asesoría", "intervención en crisis", "alcance comunitario", "defensa", "conciencia sobre salud mental", "competencia cultural", "resolución de conflictos", "desarrollo de programas", "inteligencia emocional"],
      experience: [
        {
          title: "Trabajador Social Senior",
          company: "Community Care Services",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la retención de clientes en un 25% a través de procesos de seguimiento de casos mejorados.",
            "Reduje el tiempo de respuesta de intervención en crisis en un 40%, asegurando apoyo oportuno para los clientes.",
            "Desarrollé e implementé un nuevo programa de alcance comunitario, alcanzando a más de 500 individuos necesitados.",
          ],
        },
        {
          title: "Trabajador Social",
          company: "Family Support Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné exitosamente una carga de trabajo de más de 40 clientes, brindando servicios de apoyo integral.",
            "Facilicé talleres que mejoraron la participación familiar en un 35%.",
            "Colaboré con agencias locales, mejorando el intercambio de recursos y la prestación de servicios.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Trabajo Social", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Licensed Clinical Social Worker (LCSW)", issuer: "State Board of Social Work", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Trabajo Social?", answer: "Debe incluir experiencia relevante, habilidades específicas y logros destacados." },
      { question: "¿Cómo destacar mi currículum de Trabajo Social?", answer: "Enfócate en tus logros y en cómo has impactado a tus clientes y comunidad." },
      { question: "¿Qué habilidades necesita un currículum de Trabajo Social?", answer: "Habilidades clave incluyen gestión de casos, intervención en crisis y habilidades de comunicación." },
    ],
  },
  "social-worker-assistant": {
    slug: "asistente-trabajo-social",
    title: "Asistente de Trabajo Social",
    keywords: ["currículum de asistente de trabajo social", "CV de asistente de trabajo social", "ejemplo currículum asistente de trabajo social", "plantilla CV asistente de trabajo social"],
    searchIntents: ["cómo escribir currículum de asistente de trabajo social", "ejemplos currículum asistente de trabajo social", "mejor formato CV asistente de trabajo social"],
    topSkills: ["gestión de casos", "intervención en crisis", "abogacía", "comunicación", "empatía", "resolución de problemas", "trabajo en equipo", "competencia cultural", "redacción de informes", "confidencialidad"],
    atsKeywords: ["trabajo social", "evaluación de clientes", "servicios de apoyo", "recursos comunitarios", "salud mental", "salud conductual", "estrategias de intervención", "documentación de casos", "atención colaborativa", "abogacía del cliente", "programas de divulgación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Trabajo Social",
      summary: "Asistente de Trabajo Social dedicado con más de 5 años de experiencia apoyando a clientes a través de diversos servicios sociales. Historial comprobado de mejorar los resultados de los clientes en un 30% a través de una abogacía efectiva y gestión de recursos.",
      skills: ["gestión de casos", "intervención en crisis", "abogacía", "comunicación", "empatía", "resolución de problemas", "trabajo en equipo", "competencia cultural", "redacción de informes", "confidencialidad"],
      experience: [
        {
          title: "Asistente Senior de Trabajo Social",
          company: "Helping Hands Community Services",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las calificaciones de satisfacción del cliente en un 25% a través de una mejora en la entrega de servicios.",
            "Asistí en el desarrollo de un nuevo programa de divulgación que atendió a más de 200 familias en la comunidad.",
            "Optimicé los procesos de documentación de casos, reduciendo el tiempo administrativo en un 15%.",
          ],
        },
        {
          title: "Asistente de Trabajo Social",
          company: "Hope Valley Mental Health Center",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Apoyé a una carga de casos de más de 50 clientes, proporcionando recursos esenciales y seguimiento.",
            "Facilité sesiones de terapia grupal que llevaron a una mejora del 40% en el compromiso del cliente.",
            "Colaboré con equipos multidisciplinarios para mejorar los planes de atención al cliente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Trabajo Social", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Social Work Assistant", issuer: "National Association of Social Workers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Trabajo Social en su currículum?", answer: "Debe incluir su experiencia laboral, habilidades relevantes y educación en el campo del trabajo social." },
      { question: "¿Cómo destacar mi currículum de Asistente de Trabajo Social?", answer: "Enfatizando logros cuantificables y experiencia directa en servicios sociales." },
      { question: "¿Qué habilidades necesita un Asistente de Trabajo Social?", answer: "Habilidades clave incluyen la comunicación, empatía, gestión de casos y trabajo en equipo." },
    ],
  },
  "software-engineer-intern-google": {
    slug: "practicante-de-ingenieria-de-software",
    title: "Practicante de Ingeniería de Software",
    keywords: ["currículum de practicante de ingeniería de software", "CV de practicante de ingeniería de software", "ejemplo currículum practicante de ingeniería de software", "plantilla CV practicante de ingeniería de software"],
    searchIntents: ["cómo escribir currículum de practicante de ingeniería de software", "ejemplos currículum practicante de ingeniería de software", "mejor formato CV practicante de ingeniería de software"],
    topSkills: ["Python", "Java", "JavaScript", "SQL", "HTML/CSS", "Git", "Metodologías Ágiles", "Estructuras de Datos", "Algoritmos", "Computación en la Nube"],
    atsKeywords: ["desarrollo de software", "prácticas", "programación", "resolución de problemas", "colaboración en equipo", "habilidades técnicas", "gestión de proyectos", "ingeniería de software", "análisis de datos", "control de versiones", "desarrollo web"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Ingeniería de Software",
      summary: "Estudiante de ingeniería de software orientado a los detalles con 2 años de experiencia en desarrollo de software, contribuyendo a proyectos que mejoraron el rendimiento del sistema en un 30%.",
      skills: ["Python", "Java", "JavaScript", "SQL", "HTML/CSS", "Git", "Metodologías Ágiles", "Estructuras de Datos", "Algoritmos", "Computación en la Nube"],
      experience: [
        {
          title: "Practicante de Desarrollo de Software",
          company: "Microsoft",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Mejoró el tiempo de carga de la aplicación en un 25% a través de la optimización del código.",
            "Colaboró en un proyecto de equipo que mejoró la participación de los usuarios en un 40%.",
            "Desarrolló scripts de pruebas automatizadas que redujeron el tiempo de prueba en 15 horas por lanzamiento.",
          ],
        },
        {
          title: "Desarrollador de Software Junior",
          company: "Tech Innovations Inc.",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Contribuyó al desarrollo de una aplicación móvil que obtuvo más de 5000 descargas.",
            "Implementó nuevas funciones que resultaron en un aumento del 20% en la satisfacción del cliente.",
            "Asistió en la migración de sistemas heredados a soluciones basadas en la nube.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2018-09", endDate: "2022-06" },
      ],
      certifications: [
        { name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Software Engineer Intern en su currículum?", answer: "Un Software Engineer Intern debe incluir su experiencia en proyectos de software, habilidades técnicas relevantes, y cualquier certificación relacionada." },
      { question: "¿Cómo destacar mi currículum de Software Engineer Intern?", answer: "Es recomendable resaltar logros cuantificables en proyectos, habilidades técnicas específicas, y experiencia en trabajo en equipo." },
      { question: "¿Qué habilidades necesita un Software Engineer Intern?", answer: "Un Software Engineer Intern necesita habilidades en programación, resolución de problemas, y familiaridad con metodologías ágiles." },
    ],
  },
  "software-engineering-intern-at-agile-technologies-resume": {
    slug: "curriculum-de-practicas-en-ingenieria-de-software-en-agile-technologies",
    title: "Currículum de Pasante en Ingeniería de Software en Agile Technologies",
    keywords: ["currículum de pasante en ingeniería de software", "CV de pasante en ingeniería de software", "ejemplo currículum pasante", "plantilla CV pasante"],
    searchIntents: ["cómo escribir currículum de pasante en ingeniería de software", "ejemplos currículum pasante", "mejor formato CV pasante"],
    topSkills: ["Java", "Python", "JavaScript", "C++", "SQL", "HTML", "CSS", "Git", "metodologías ágiles", "resolución de problemas"],
    atsKeywords: ["desarrollo de software", "pasantía", "ágil", "colaboración", "programación", "depuración", "pruebas de software", "control de versiones", "trabajo en equipo", "comunicación", "resolución de problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Pasante en Ingeniería de Software en Agile Technologies",
      summary: "Estudiante de ingeniería de software orientado a los detalles con 2 años de experiencia en prácticas y un historial de mejora del rendimiento de aplicaciones en un 20%. Competente en múltiples lenguajes de programación y tecnologías.",
      skills: ["Java", "Python", "JavaScript", "C++", "SQL", "HTML", "CSS", "Git", "metodologías ágiles", "resolución de problemas"],
      experience: [
        {
          title: "Pasante en Ingeniería de Software",
          company: "Tech Innovations Inc.",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Mejoré el tiempo de carga de la aplicación en un 30% mediante la optimización del código.",
            "Colaboré con un equipo de 5 para desarrollar una nueva función que aumentó el compromiso del usuario en un 15%.",
            "Implementé pruebas automatizadas que redujeron los errores en un 40% antes del lanzamiento.",
          ],
        },
        {
          title: "Desarrollador Junior",
          company: "Soft Solutions LLC",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Desarrollé y mantuve aplicaciones web que sirven a más de 1,000 usuarios.",
            "Asistí en la migración de sistemas heredados a marcos modernos, mejorando la eficiencia en un 25%.",
            "Contribuí a revisiones de código y discusiones en equipo, mejorando la calidad general del código.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Certified Java Programmer", issuer: "Oracle", date: "2022-05" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Pasante en Ingeniería de Software en Agile Technologies?", answer: "Un currículum debe incluir información sobre experiencias previas, habilidades técnicas y logros relevantes." },
      { question: "¿Cómo destacar mi currículum de Pasante en Ingeniería de Software en Agile Technologies?", answer: "Enfatiza tus logros en proyectos y habilidades técnicas, utiliza palabras clave del sector." },
      { question: "¿Qué habilidades necesita un Pasante en Ingeniería de Software en Agile Technologies?", answer: "Las habilidades clave incluyen programación en varios lenguajes, trabajo en equipo y metodologías ágiles." },
    ],
  },
  "software-engineering-intern-piworks": {
    slug: "practicas-en-ingenieria-de-software-en-piworks",
    title: "Practicante de Ingeniería de Software en Piworks",
    keywords: ["currículum de practicante de ingeniería de software", "CV de practicante de ingeniería de software", "ejemplo currículum practicante de ingeniería de software", "plantilla CV practicante de ingeniería de software"],
    searchIntents: ["cómo escribir currículum de practicante de ingeniería de software", "ejemplos currículum practicante de ingeniería de software", "mejor formato CV practicante de ingeniería de software"],
    topSkills: ["Java", "Python", "JavaScript", "SQL", "HTML/CSS", "Git", "React", "Node.js", "REST APIs", "Desarrollo Ágil"],
    atsKeywords: ["Desarrollo de Software", "Prácticas", "Ágil", "Resolución de Problemas", "Colaboración", "Habilidades Técnicas", "Programación en Java", "Programación en Python", "Desarrollo Web", "Estructuras de Datos", "Algoritmos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Ingeniería de Software en Piworks",
      summary: "Practicante de ingeniería de software orientado a los detalles con más de 1 año de experiencia en el desarrollo de aplicaciones web y contribuyendo a proyectos en equipo. Logré una reducción del 20% en el tiempo de carga de una característica clave de la aplicación.",
      skills: ["Java", "Python", "JavaScript", "SQL", "HTML/CSS", "Git", "React", "Node.js", "REST APIs", "Desarrollo Ágil"],
      experience: [
        {
          title: "Practicante de Ingeniería de Software",
          company: "Tech Innovations Inc.",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Contribuí a un proyecto que aumentó el rendimiento de la aplicación en un 30%.",
            "Desarrollé una función que mejoró el compromiso del usuario en un 15%.",
            "Colaboré con un equipo de 5 desarrolladores para entregar los hitos del proyecto a tiempo.",
          ],
        },
        {
          title: "Desarrollador Junior",
          company: "Web Solutions Ltd.",
          startDate: "2021-01",
          endDate: "2022-05",
          achievements: [
            "Diseñé e implementé un sistema de retroalimentación de clientes que recopiló más de 1000 respuestas.",
            "Optimizé el tiempo de respuesta del servidor, reduciéndolo en un 25%.",
            "Asistí en revisiones de código, mejorando la calidad y mantenibilidad del código.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Oracle Certified Java Programmer", issuer: "Oracle", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un practicante de ingeniería de software en su currículum?", answer: "Un practicante debe incluir experiencia relevante, habilidades técnicas y logros destacados." },
      { question: "¿Cómo destacar mi currículum de practicante de ingeniería de software?", answer: "Enfatiza tus proyectos, logros cuantificables y habilidades técnicas clave." },
      { question: "¿Qué habilidades necesita un practicante de ingeniería de software?", answer: "Es importante tener habilidades en programación, trabajo en equipo y metodologías ágiles." },
    ],
  },
  "software-intern-at-cisco": {
    slug: "intern-software-en-cisco",
    title: "Practicante de Software en Cisco",
    keywords: ["currículum de practicante de software", "CV de practicante de software", "ejemplo currículum practicante de software", "plantilla CV practicante de software"],
    searchIntents: ["cómo escribir currículum de practicante de software", "ejemplos currículum practicante de software", "mejor formato CV practicante de software"],
    topSkills: ["Java", "Python", "JavaScript", "SQL", "C++", "HTML/CSS", "Git", "metodologías ágiles", "resolución de problemas", "comunicación"],
    atsKeywords: ["desarrollo de software", "prácticas", "Cisco", "programación", "colaboración", "habilidades técnicas", "trabajo en equipo", "gestión de proyectos", "pruebas de software", "análisis de datos", "redes"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Software en Cisco",
      summary: "Practicante de software orientado a los detalles con 2 años de experiencia en desarrollo de software y programación. Contribuyó exitosamente a proyectos que llevaron a un aumento del 20% en la eficiencia.",
      skills: ["Java", "Python", "JavaScript", "SQL", "C++", "HTML/CSS", "Git", "metodologías ágiles", "resolución de problemas", "comunicación"],
      experience: [
        {
          title: "Practicante de Software",
          company: "Cisco",
          startDate: "2023-05",
          isCurrent: true,
          achievements: [
            "Contribuí a un proyecto que mejoró el rendimiento del sistema en un 15%",
            "Implementé nuevas características que mejoraron la experiencia del usuario, resultando en un aumento del 30% en la participación de usuarios",
            "Colaboré con un equipo de desarrolladores para optimizar el proceso de codificación, reduciendo el tiempo de revisión en un 25%",
          ],
        },
        {
          title: "Practicante de Desarrollador Junior",
          company: "Tech Solutions Inc.",
          startDate: "2022-06",
          endDate: "2023-04",
          achievements: [
            "Desarrollé una aplicación web que soportó más de 100 usuarios diarios",
            "Automatizé procesos de entrada de datos, ahorrando 10 horas de trabajo por semana",
            "Participé en revisiones de código que llevaron a una reducción del 40% en errores",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2020-09", endDate: "2024-06" },
      ],
      certifications: [
        { name: "AWS Certified Solutions Architect", issuer: "Amazon", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Practicante de Software en Cisco en su currículum?", answer: "Incluir experiencia en desarrollo de software, habilidades técnicas relevantes y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Practicante de Software en Cisco?", answer: "Resaltar proyectos específicos que demuestren habilidades técnicas y contribuciones a la eficiencia." },
      { question: "¿Qué habilidades necesita un Practicante de Software en Cisco?", answer: "Habilidades en programación, trabajo en equipo, y conocimiento de metodologías ágiles." },
    ],
  },
  "specialty-pharmacy-technician-dartmouth-hitchcock": {
    slug: "tecnico-de-farmacia-especializada",
    title: "Técnico de Farmacia Especializada",
    keywords: ["currículum de técnico de farmacia especializada", "CV de técnico de farmacia especializada", "ejemplo currículum técnico de farmacia especializada", "plantilla CV técnico de farmacia especializada"],
    searchIntents: ["cómo escribir currículum de técnico de farmacia especializada", "ejemplos currículum técnico de farmacia especializada", "mejor formato CV técnico de farmacia especializada"],
    topSkills: ["Gestión de Medicamentos", "Consejería a Pacientes", "Dominio de Software de Farmacia", "Control de Inventario", "Preparación de Medicamentos", "Verificación de Seguros", "Servicio al Cliente", "Cumplimiento Regulatorio", "Revisión de Utilización de Medicamentos", "Conocimiento Clínico"],
    atsKeywords: ["técnico de farmacia", "farmacia especializada", "gestión de terapia de medicamentos", "atención farmacéutica", "educación del paciente", "farmacología", "farmacia clínica", "reconciliación de medicamentos", "cuidado de la salud", "preparación", "aseguramiento de calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico de Farmacia Especializada",
      summary: "Técnico de Farmacia Especializada dedicado con más de 5 años de experiencia en gestión de medicamentos y atención al paciente. Historial comprobado de mejora de los resultados de los pacientes a través de programas de consejería y adherencia efectivos.",
      skills: ["Gestión de Medicamentos", "Consejería a Pacientes", "Dominio de Software de Farmacia", "Control de Inventario", "Preparación de Medicamentos", "Verificación de Seguros", "Servicio al Cliente", "Cumplimiento Regulatorio", "Revisión de Utilización de Medicamentos", "Conocimiento Clínico"],
      experience: [
        {
          title: "Técnico de Farmacia Especializada Senior",
          company: "CVS Specialty Pharmacy",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré las tasas de adherencia a los medicamentos en un 20% a través de programas de alcance a pacientes.",
            "Gestioné un equipo de 5 técnicos, aumentando la eficiencia operativa en un 15%.",
            "Reduje los errores de medicación en un 30% mediante protocolos de aseguramiento de calidad mejorados.",
          ],
        },
        {
          title: "Técnico de Farmacia",
          company: "Walgreens",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné un servicio al cliente excepcional a más de 100 pacientes diarios.",
            "Asistí en la capacitación de nuevos técnicos de farmacia, contribuyendo a una reducción del 25% en el tiempo de incorporación.",
            "Contribuí a un aumento del 10% en las calificaciones de satisfacción del cliente a través de un servicio personalizado.",
          ],
        },
      ],
      education: [
        { institution: "University of New Hampshire", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmacy Technician (CPhT)", issuer: "Pharmacy Technician Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico de Farmacia Especializada en su currículum?", answer: "Un técnico de farmacia especializada debe incluir su experiencia, habilidades relevantes, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Técnico de Farmacia Especializada?", answer: "Destacar logros cuantificables y habilidades específicas relacionadas con la atención al paciente y la gestión de medicamentos." },
      { question: "¿Qué habilidades necesita un Técnico de Farmacia Especializada?", answer: "Las habilidades clave incluyen gestión de medicamentos, consejería a pacientes, y dominio de software de farmacia." },
    ],
  },
  "sport-medicine-doctor": {
    slug: "doctor-de-medicina-deportiva",
    title: "Doctor de Medicina Deportiva",
    keywords: ["currículum de Doctor de Medicina Deportiva", "CV de Doctor de Medicina Deportiva", "ejemplo currículum Doctor de Medicina Deportiva", "plantilla CV Doctor de Medicina Deportiva"],
    searchIntents: ["cómo escribir currículum de Doctor de Medicina Deportiva", "ejemplos currículum Doctor de Medicina Deportiva", "mejor formato CV Doctor de Medicina Deportiva"],
    topSkills: ["Gestión de Lesiones Deportivas", "Técnicas de Rehabilitación", "Evaluación del Paciente", "Prescripción de Ejercicio", "Consejería Nutricional", "Colaboración en Equipo", "Conocimientos Ortopédicos", "Manejo del Dolor", "Respuesta a Emergencias", "Educación del Paciente"],
    atsKeywords: ["Medicina Deportiva", "Médico", "Rehabilitación", "Lesiones Deportivas", "Cuidado del Paciente", "Entrenamiento Deportivo", "Investigación Clínica", "Terapia Física", "Diagnóstico Médico", "Nutrición Deportiva", "Promoción de la Salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Doctor de Medicina Deportiva",
      summary: "Médico de Medicina Deportiva dedicado con más de 5 años de experiencia en el manejo de lesiones deportivas y mejora del rendimiento de los atletas a través de programas de rehabilitación personalizados. Traté con éxito a más de 300 atletas, logrando una tasa de recuperación del 90%.",
      skills: ["Gestión de Lesiones Deportivas", "Técnicas de Rehabilitación", "Evaluación del Paciente", "Prescripción de Ejercicio", "Consejería Nutricional", "Colaboración en Equipo", "Conocimientos Ortopédicos", "Manejo del Dolor", "Respuesta a Emergencias", "Educación del Paciente"],
      experience: [
        {
          title: "Médico Deportiva Senior",
          company: "Elite Sports Medicine Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el tiempo de recuperación de los atletas en un 30% a través de protocolos de rehabilitación innovadores.",
            "Gestionó el cuidado de más de 150 atletas anualmente, resultando en una tasa de satisfacción del 95%.",
            "Implementó un nuevo programa de entrenamiento que redujo la recurrencia de lesiones en un 40%.",
          ],
        },
        {
          title: "Médico de Medicina Deportiva",
          company: "Premier Athletic Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Traté y rehabilité con éxito más de 200 lesiones deportivas.",
            "Realicé talleres sobre prevención de lesiones para equipos deportivos locales, mejorando la conciencia comunitaria.",
            "Colaboré con terapeutas físicos para desarrollar planes de tratamiento integrales.",
          ],
        },
      ],
      education: [
        { institution: "University of Sports Medicine", degree: "Doctor en Medicina (M.D.)", field: "Medicina Deportiva", startDate: "2010-08", endDate: "2014-05" },
      ],
      certifications: [
        { name: "Certified Sports Medicine Physician", issuer: "American Board of Medical Specialties", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Doctor de Medicina Deportiva en su currículum?", answer: "Un Doctor de Medicina Deportiva debe incluir su experiencia en manejo de lesiones, certificaciones relevantes, y habilidades en rehabilitación y nutrición." },
      { question: "¿Cómo destacar mi currículum de Doctor de Medicina Deportiva?", answer: "Enfócate en tus logros cuantificables, experiencias relevantes y formación continua en el campo." },
      { question: "¿Qué habilidades necesita un Doctor de Medicina Deportiva?", answer: "Las habilidades clave incluyen gestión de lesiones, rehabilitación efectiva, y capacidad de trabajo en equipo." },
    ],
  },
  "st-francis-hospital-registered-nurse": {
    slug: "st-francis-hospital-registered-nurse-resume",
    title: "Currículum de Enfermera Registrada del Hospital St Francis",
    keywords: ["currículum de enfermera registrada", "CV de enfermera", "ejemplo currículum enfermera", "plantilla CV enfermera"],
    searchIntents: ["cómo escribir currículum de enfermera registrada", "ejemplos currículum enfermera", "mejor formato CV enfermera"],
    topSkills: ["Cuidado del Paciente", "Pensamiento Crítico", "Comunicación", "Trabajo en Equipo", "Gestión del Tiempo", "Empatía", "Habilidades Clínicas", "Resolución de Problemas", "Atención al Detalle", "Manejo del Estrés"],
    atsKeywords: ["Enfermera Registrada", "Evaluación de Pacientes", "Administración de Medicamentos", "Educación del Paciente", "Planificación de Cuidados", "Registros Electrónicos de Salud", "Certificación BLS", "Certificación CPR", "Control de Infecciones", "Proceso de Enfermería", "Promoción de la Salud"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Enfermera Registrada del Hospital St Francis",
      summary: "Enfermera registrada dedicada con más de 5 años de experiencia en entornos de cuidados agudos, conocida por mejorar los índices de satisfacción del paciente en un 20% a través de una comunicación y prácticas de cuidado mejoradas.",
      skills: ["Cuidado del Paciente", "Pensamiento Crítico", "Comunicación", "Trabajo en Equipo", "Gestión del Tiempo", "Empatía", "Habilidades Clínicas", "Resolución de Problemas", "Atención al Detalle", "Manejo del Estrés"],
      experience: [
        {
          title: "Enfermera Registrada Senior",
          company: "St Francis Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de las tasas de readmisión de pacientes en un 15% a través de una planificación de alta efectiva.",
            "Implementación de un nuevo sistema de registros electrónicos de salud que mejoró la eficiencia de la documentación en un 30%.",
            "Lideré un equipo de enfermeras en una iniciativa de mejora de calidad que aumentó los índices de satisfacción del paciente en un 25%.",
          ],
        },
        {
          title: "Enfermera Registrada",
          company: "Mercy General Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Administré medicamentos y monitoreé pacientes, resultando en una tasa de cumplimiento del 98%.",
            "Participé en reuniones de equipo interdisciplinario para coordinar la atención de casos complejos.",
            "Capacité a 5 nuevos miembros del personal de enfermería sobre los protocolos del hospital y los procedimientos de atención al paciente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Registered Nurse License", issuer: "State Board of Nursing", date: "2018-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un St Francis Hospital Registered Nurse Resume en su currículum?", answer: "Un currículum de enfermera registrada debe incluir experiencia laboral relevante, habilidades clínicas, certificaciones y educación." },
      { question: "¿Cómo destacar mi currículum de St Francis Hospital Registered Nurse Resume?", answer: "Utiliza palabras clave relevantes, destaca logros cuantificables y asegúrate de que el formato sea claro y profesional." },
      { question: "¿Qué habilidades necesita un St Francis Hospital Registered Nurse Resume?", answer: "Las habilidades clave incluyen cuidado del paciente, pensamiento crítico, comunicación efectiva y trabajo en equipo." },
    ],
  },
  "student-pharmacy": {
    slug: "curriculum-estudiante-farmacia",
    title: "Currículum de Estudiante de Farmacia",
    keywords: ["currículum de estudiante de farmacia", "CV de estudiante de farmacia", "ejemplo currículum estudiante de farmacia", "plantilla CV estudiante de farmacia"],
    searchIntents: ["cómo escribir currículum de estudiante de farmacia", "ejemplos currículum estudiante de farmacia", "mejor formato CV estudiante de farmacia"],
    topSkills: ["Conocimiento Farmacéutico", "Atención al Paciente", "Gestión de Terapia Medicamentosa", "Farmacología", "Habilidades de Comunicación", "Resolución de Problemas", "Atención al Detalle", "Colaboración en Equipo", "Cumplimiento Regulatorio", "Servicio al Cliente"],
    atsKeywords: ["pharmacy intern", "clinical pharmacy", "prescription management", "patient counseling", "drug interaction", "medication dispensing", "inventory management", "pharmaceutical care", "healthcare teamwork", "patient assessment", "pharmacotherapy"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Estudiante de Farmacia",
      summary: "Estudiante de farmacia dedicado con más de 3 años de experiencia práctica en entornos clínicos. Logró un aumento del 15% en los puntajes de satisfacción del paciente a través de una comunicación efectiva y educación al paciente.",
      skills: ["Conocimiento Farmacéutico", "Atención al Paciente", "Gestión de Terapia Medicamentosa", "Farmacología", "Habilidades de Comunicación", "Resolución de Problemas", "Atención al Detalle", "Colaboración en Equipo", "Cumplimiento Regulatorio", "Servicio al Cliente"],
      experience: [
        {
          title: "Practicante de Farmacia",
          company: "CVS Health",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró la adherencia del paciente a la medicación en un 20% a través de un asesoramiento efectivo.",
            "Ayudó en la gestión de inventario, reduciendo el desperdicio de medicamentos en un 15%.",
            "Colaboró con profesionales de la salud para optimizar los planes de atención al paciente.",
          ],
        },
        {
          title: "Técnico de Farmacia",
          company: "Walgreens",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Procesó más de 500 recetas semanalmente, asegurando precisión y cumplimiento.",
            "Proporcionó un servicio al cliente excepcional, recibiendo el premio de empleado del mes dos veces.",
            "Apoyó al farmacéutico en la gestión de medicamentos, contribuyendo a un aumento del 10% en la eficiencia del flujo de trabajo.",
          ],
        },
      ],
      education: [
        { institution: "University of Southern California", degree: "B.S.", field: "Ciencias Farmacéuticas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmacy Technician", issuer: "Pharmacy Technician Certification Board", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de estudiante de farmacia?", answer: "Un currículum de estudiante de farmacia debe incluir educación, experiencia laboral relevante, habilidades específicas y certificaciones." },
      { question: "¿Cómo destacar mi currículum de estudiante de farmacia?", answer: "Para destacar su currículum, enfatice sus logros y habilidades relevantes, y utilice un formato claro y profesional." },
      { question: "¿Qué habilidades necesita un estudiante de farmacia?", answer: "Las habilidades clave incluyen conocimientos farmacéuticos, atención al paciente, habilidades de comunicación y manejo de medicamentos." },
    ],
  },
  "summer-intern-zebra": {
    slug: "intern-summer",
    title: "Pasantía de Verano",
    keywords: ["currículum de pasantía de verano", "CV de pasantía de verano", "ejemplo currículum pasantía de verano", "plantilla CV pasantía de verano"],
    searchIntents: ["cómo escribir currículum de pasantía de verano", "ejemplos currículum pasantía de verano", "mejor formato CV pasantía de verano"],
    topSkills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas", "Gestión del tiempo", "Adaptabilidad", "Investigación", "Análisis de datos", "Habilidades de presentación", "Habilidades técnicas", "Gestión de proyectos"],
    atsKeywords: ["pasantía", "asistencia en proyectos", "colaboración en equipo", "ingreso de datos", "servicio al cliente", "investigación de mercado", "redacción de informes", "planificación estratégica", "gestión del tiempo", "Microsoft Office", "comunicación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Pasantía de Verano",
      summary: "Estudiante universitario orientado a los detalles con 2 años de experiencia en pasantías y un historial comprobado de entrega de trabajo de alta calidad. Gestioné con éxito múltiples proyectos que llevaron a un aumento del 20% en la eficiencia del equipo.",
      skills: ["Comunicación", "Trabajo en equipo", "Resolución de problemas", "Gestión del tiempo", "Adaptabilidad", "Investigación", "Análisis de datos", "Habilidades de presentación", "Habilidades técnicas", "Gestión de proyectos"],
      experience: [
        {
          title: "Pasantía de Marketing",
          company: "XYZ Corporation",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Aumenté la participación en redes sociales en un 30% a través de campañas dirigidas.",
            "Asistí en la organización de un evento a nivel empresarial que atrajo a más de 500 asistentes.",
            "Realicé investigaciones de mercado que identificaron tendencias clave, llevando a un aumento del 15% en las ventas de productos.",
          ],
        },
        {
          title: "Asistente de Investigación",
          company: "ABC University",
          startDate: "2020-09",
          endDate: "2022-05",
          achievements: [
            "Contribuí a un proyecto de investigación que resultó en una publicación en una revista revisada por pares.",
            "Analicé conjuntos de datos utilizando software estadístico, mejorando la precisión de la investigación en un 25%.",
            "Presenté los hallazgos en la conferencia anual de la universidad, recibiendo comentarios positivos de la facultad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Administración de Empresas", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Google Analytics Certification", issuer: "Google", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Pasante de Verano en su currículum?", answer: "Incluya su experiencia en proyectos relevantes, habilidades adquiridas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Pasante de Verano?", answer: "Enfóquese en resultados específicos y habilidades clave que se alineen con la industria." },
      { question: "¿Qué habilidades necesita un Pasante de Verano?", answer: "Comunicación, trabajo en equipo, resolución de problemas y habilidades técnicas son esenciales." },
    ],
  },
  "summer-research-intern-university-of-kentucky": {
    slug: "practicante-de-investigacion-de-verano",
    title: "Practicante de Investigación de Verano",
    keywords: ["currículum de practicante de investigación de verano", "CV de practicante de investigación de verano", "ejemplo currículum practicante de investigación de verano", "plantilla CV practicante de investigación de verano"],
    searchIntents: ["cómo escribir currículum de practicante de investigación de verano", "ejemplos currículum practicante de investigación de verano", "mejor formato CV practicante de investigación de verano"],
    topSkills: ["Metodología de Investigación", "Análisis de Datos", "Técnicas de Laboratorio", "Software Estadístico", "Redacción Científica", "Pensamiento Crítico", "Colaboración en Equipo", "Habilidades de Presentación", "Gestión de Proyectos", "Gestión del Tiempo"],
    atsKeywords: ["investigación", "práctica", "análisis de datos", "laboratorio", "redacción científica", "trabajo en equipo", "proyecto", "presentación", "comunicación", "pensamiento crítico", "gestión del tiempo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Practicante de Investigación de Verano",
      summary: "Practicante de investigación dedicado con 2 años de experiencia en entornos académicos, contribuyendo a proyectos que mejoraron la eficiencia del laboratorio en un 30% y publicaron hallazgos en revistas revisadas por pares.",
      skills: ["Metodología de Investigación", "Análisis de Datos", "Técnicas de Laboratorio", "Software Estadístico", "Redacción Científica", "Pensamiento Crítico", "Colaboración en Equipo", "Habilidades de Presentación", "Gestión de Proyectos", "Gestión del Tiempo"],
      experience: [
        {
          title: "Asistente de Investigación",
          company: "University of Kentucky",
          startDate: "2022-06",
          isCurrent: true,
          achievements: [
            "Contribuyó a un proyecto de investigación que aumentó la precisión de los datos en un 25%",
            "Asistió en la publicación de 2 artículos revisados por pares en revistas de prestigio",
            "Optimizó procesos de laboratorio, reduciendo el tiempo de entrega de proyectos en un 15%",
          ],
        },
        {
          title: "Practicante",
          company: "XYZ Research Labs",
          startDate: "2021-06",
          endDate: "2022-05",
          achievements: [
            "Realizó experimentos que llevaron a un aumento del 10% en la eficiencia del producto",
            "Desarrolló un nuevo método de análisis de datos que ahorró a los investigadores 20 horas al mes",
            "Colaboró con un equipo de 5 para presentar hallazgos en una conferencia nacional",
          ],
        },
      ],
      education: [
        { institution: "University of Kentucky", degree: "B.S.", field: "Ciencias Biológicas", startDate: "2018-08", endDate: "2022-05" },
      ],
      certifications: [
        { name: "Certified Research Administrator", issuer: "Research Administrators Certification Council", date: "2023-01" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Summer Research Intern en su currículum?", answer: "Un Summer Research Intern debe incluir su experiencia en investigación, habilidades técnicas, y logros en proyectos relevantes." },
      { question: "¿Cómo destacar mi currículum de Summer Research Intern?", answer: "Destaca tus logros cuantificables y experiencia en proyectos colaborativos." },
      { question: "¿Qué habilidades necesita un Summer Research Intern?", answer: "Un Summer Research Intern necesita habilidades en metodología de investigación, análisis de datos, y trabajo en equipo." },
    ],
  },
  "surgical-assistant": {
    slug: "asistente-quirurgico",
    title: "Asistente Quirúrgico",
    keywords: ["currículum de asistente quirúrgico", "CV de asistente quirúrgico", "ejemplo currículum asistente quirúrgico", "plantilla CV asistente quirúrgico"],
    searchIntents: ["cómo escribir currículum de asistente quirúrgico", "ejemplos currículum asistente quirúrgico", "mejor formato CV asistente quirúrgico"],
    topSkills: ["Asistencia en procedimientos quirúrgicos", "Cuidado de pacientes", "Técnicas de esterilización", "Preparación de instrumentos", "Soporte en anestesia", "Cuidado postoperatorio", "Habilidades de comunicación", "Colaboración en equipo", "Gestión del tiempo", "Resolución de problemas"],
    atsKeywords: ["Asistente Quirúrgico", "Quirófano", "Instrumentos quirúrgicos", "Anestesia", "Seguridad del paciente", "Control de infecciones", "Trabajo en equipo en salud", "Documentación", "Habilidades clínicas", "Monitoreo de pacientes", "Protocolos quirúrgicos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Quirúrgico",
      summary: "Asistente Quirúrgico dedicado con más de 5 años de experiencia en el quirófano, reconocido por mejorar la eficiencia quirúrgica en un 20% y aumentar las puntuaciones de satisfacción del paciente.",
      skills: ["Asistencia en procedimientos quirúrgicos", "Cuidado de pacientes", "Técnicas de esterilización", "Preparación de instrumentos", "Soporte en anestesia", "Cuidado postoperatorio", "Habilidades de comunicación", "Colaboración en equipo", "Gestión del tiempo", "Resolución de problemas"],
      experience: [
        {
          title: "Asistente Quirúrgico Senior",
          company: "St. Mary's Hospital",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en más de 300 procedimientos quirúrgicos con una tasa de éxito del 98%",
            "Entrené a nuevo personal, resultando en un aumento del 30% en la eficiencia del equipo",
            "Implementé un nuevo protocolo de esterilización que redujo las tasas de infección en un 15%",
          ],
        },
        {
          title: "Asistente Quirúrgico",
          company: "City General Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcioné asistencia en diversas especialidades quirúrgicas incluyendo ortopedia y neurocirugía",
            "Mantuve registros quirúrgicos precisos, contribuyendo a una mejora del 10% en la gestión de casos",
            "Agilicé los procesos de preparación de instrumentos, reduciendo el tiempo de montaje en un 25%",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Ciencias de la Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Surgical Technologist", issuer: "National Board of Surgical Technology and Surgical Assisting", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente Quirúrgico en su currículum?", answer: "Debe incluir experiencia en procedimientos quirúrgicos, habilidades de comunicación y cuidado de pacientes." },
      { question: "¿Cómo destacar mi currículum de Asistente Quirúrgico?", answer: "Enfatizando logros cuantificables y habilidades relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Asistente Quirúrgico?", answer: "Habilidades en asistencia quirúrgica, manejo de instrumentos, y cuidado al paciente." },
    ],
  },
  "surgical-technician": {
    slug: "tecnico-quirurgico",
    title: "Técnico Quirúrgico",
    keywords: ["currículum de técnico quirúrgico", "CV de técnico quirúrgico", "ejemplo currículum técnico quirúrgico", "plantilla CV técnico quirúrgico"],
    searchIntents: ["cómo escribir currículum de técnico quirúrgico", "ejemplos currículum técnico quirúrgico", "mejor formato CV técnico quirúrgico"],
    topSkills: ["Técnicas Estériles", "Manejo de Instrumentos", "Seguridad del Paciente", "Conocimiento de Procedimientos Quirúrgicos", "Asistencia en Anestesia", "Control de Infecciones", "Colaboración en Equipo", "Gestión del Tiempo", "Atención al Detalle", "Comunicación"],
    atsKeywords: ["instrumentos quirúrgicos", "atención al paciente", "técnica aséptica", "sala de operaciones", "procedimientos quirúrgicos", "terminología médica", "seguridad quirúrgica", "anestesia", "trabajo en equipo", "respuesta a emergencias", "gestión del tiempo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico Quirúrgico",
      summary: "Técnico Quirúrgico dedicado con más de 5 años de experiencia en entornos quirúrgicos de alta presión, hábil en mantener técnicas estériles y garantizar la seguridad del paciente. Asistió con éxito en más de 300 procedimientos quirúrgicos, contribuyendo a una reducción del 20% en el tiempo de cirugía.",
      skills: ["Técnicas Estériles", "Manejo de Instrumentos", "Seguridad del Paciente", "Conocimiento de Procedimientos Quirúrgicos", "Asistencia en Anestesia", "Control de Infecciones", "Colaboración en Equipo", "Gestión del Tiempo", "Atención al Detalle", "Comunicación"],
      experience: [
        {
          title: "Técnico Quirúrgico Senior",
          company: "Memorial Healthcare System",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Asistí en más de 150 cirugías, mejorando la eficiencia quirúrgica en un 25%",
            "Entrené a 5 nuevos técnicos quirúrgicos, mejorando el rendimiento del equipo",
            "Implementé nuevos protocolos de esterilización, reduciendo las tasas de infección en un 15%",
          ],
        },
        {
          title: "Técnico Quirúrgico",
          company: "Saint Mary's Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Preparé instrumentos quirúrgicos para más de 200 procedimientos con 100% de precisión",
            "Colaboré con cirujanos y enfermeras para optimizar el flujo de trabajo",
            "Mantuve el inventario quirúrgico, reduciendo costos en un 10%",
          ],
        },
      ],
      education: [
        { institution: "City University", degree: "B.S.", field: "Tecnología Quirúrgica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Surgical Technologist", issuer: "National Board of Surgical Technology and Surgical Assisting", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico Quirúrgico en su currículum?", answer: "Incluya su experiencia laboral, habilidades relevantes, y certificaciones en el área." },
      { question: "¿Cómo destacar mi currículum de Técnico Quirúrgico?", answer: "Enfatice su experiencia en procedimientos, habilidades técnicas y logros cuantificables." },
      { question: "¿Qué habilidades necesita un Técnico Quirúrgico?", answer: "Se requieren habilidades en técnicas estériles, manejo de instrumentos y trabajo en equipo." },
    ],
  },
  "telemetry-nurse": {
    slug: "enfermera-de-telemetria",
    title: "Enfermera de Telemetría",
    keywords: ["currículum de enfermera de telemetría", "CV de enfermera de telemetría", "ejemplo currículum enfermera de telemetría", "plantilla CV enfermera de telemetría"],
    searchIntents: ["cómo escribir currículum de enfermera de telemetría", "ejemplos currículum enfermera de telemetría", "mejor formato CV enfermera de telemetría"],
    topSkills: ["Monitoreo cardíaco", "Evaluación de pacientes", "Administración de medicamentos", "Operación de equipos de telemetría", "Pensamiento crítico", "Habilidades de comunicación", "Defensa del paciente", "Colaboración en equipo", "Gestión del tiempo", "Documentación clínica"],
    atsKeywords: ["Enfermería de telemetría", "Interpretación de ECG", "Cuidado de pacientes", "Cuidado agudo", "Certificado en BLS", "Seguridad del paciente", "Protocolos de enfermería", "Cumplimiento sanitario", "Planes de cuidado", "Evaluaciones de enfermería", "Trabajo en equipo interdisciplinario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera de Telemetría",
      summary: "Enfermera de Telemetría dedicada con más de 5 años de experiencia en entornos de cuidado agudo. Historial comprobado de mejora de los resultados de los pacientes a través de un monitoreo meticuloso y rápidas intervenciones.",
      skills: ["Monitoreo cardíaco", "Evaluación de pacientes", "Administración de medicamentos", "Operación de equipos de telemetría", "Pensamiento crítico", "Habilidades de comunicación", "Defensa del paciente", "Colaboración en equipo", "Gestión del tiempo", "Documentación clínica"],
      experience: [
        {
          title: "Enfermera de Telemetría Senior",
          company: "Heartland Medical Center",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró los tiempos de recuperación de los pacientes en un 20% a través de protocolos de monitoreo mejorados.",
            "Gestionó con éxito el cuidado de más de 150 pacientes de telemetría mensualmente.",
            "Implementó un nuevo sistema de documentación que redujo los errores en un 30%.",
          ],
        },
        {
          title: "Enfermera de Telemetría",
          company: "Lakeside Regional Hospital",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Proporcionó atención ejemplar a una población diversa de pacientes.",
            "Realizó más de 200 ECGs con una tasa de precisión del 98%.",
            "Capacitó y mentoreó al nuevo personal de enfermería en protocolos de telemetría.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Telemetry Nurse", issuer: "American Nurses Credentialing Center", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Telemetry Nurse en su currículum?", answer: "Incluya su experiencia en monitoreo cardíaco, certificaciones, y logros específicos en el cuidado del paciente." },
      { question: "¿Cómo destacar mi currículum de Telemetry Nurse?", answer: "Enfatice sus logros medibles y habilidades clave, además de su experiencia en cuidados críticos." },
      { question: "¿Qué habilidades necesita un Telemetry Nurse?", answer: "Habilidades en monitoreo, pensamiento crítico, comunicación efectiva, y trabajo en equipo son esenciales." },
    ],
  },
  "telework-nurse": {
    slug: "enfermera-teletrabajo",
    title: "Enfermera de Teletrabajo",
    keywords: ["currículum de enfermera de teletrabajo", "CV de enfermera de teletrabajo", "ejemplo currículum enfermera de teletrabajo", "plantilla CV enfermera de teletrabajo"],
    searchIntents: ["cómo escribir currículum de enfermera de teletrabajo", "ejemplos currículum enfermera de teletrabajo", "mejor formato CV enfermera de teletrabajo"],
    topSkills: ["Evaluación del Paciente", "Tecnología de Telemedicina", "Manejo de Medicamentos", "Coordinación de Cuidados", "Educación al Paciente", "Informática de la Salud", "Manejo de Crisis", "Monitoreo Remoto", "Habilidades de Comunicación", "Empatía"],
    atsKeywords: ["telemedicina", "enfermería", "cuidado del paciente", "enfermería remota", "cuidado de la salud", "habilidades clínicas", "documentación", "defensa del paciente", "registros de salud electrónicos", "telemedicina", "gestión de cuidados"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Enfermera de Teletrabajo",
      summary: "Enfermera de Teletrabajo dedicada con más de 5 años de experiencia en la prestación de atención virtual de alta calidad. Logré un 95% de satisfacción del paciente a través de una comunicación efectiva y planes de atención personalizados.",
      skills: ["Evaluación del Paciente", "Tecnología de Telemedicina", "Manejo de Medicamentos", "Coordinación de Cuidados", "Educación al Paciente", "Informática de la Salud", "Manejo de Crisis", "Monitoreo Remoto", "Habilidades de Comunicación", "Empatía"],
      experience: [
        {
          title: "Enfermera Senior de Telemedicina",
          company: "HealthBridge Telemedicine",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré la adherencia de los pacientes a los planes de tratamiento en un 30% a través de sesiones educativas personalizadas.",
            "Manejé una carga de más de 150 pacientes por mes mientras mantenía una tasa de satisfacción del 98%.",
            "Implementé nuevos protocolos de telemedicina que redujeron las tasas de inasistencia a citas en un 25%.",
          ],
        },
        {
          title: "Enfermera de Telemedicina",
          company: "Virtual Health Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 2000 consultas de salud virtual con un enfoque en el manejo de enfermedades crónicas.",
            "Logré una tasa de cumplimiento de seguimiento del 90% entre los pacientes a través de un contacto proactivo.",
            "Colaboré con un equipo multidisciplinario para mejorar la entrega de atención y los resultados para los pacientes.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Telehealth Nurse", issuer: "Telehealth Certification Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Telework Nurse en su currículum?", answer: "Debe incluir habilidades en telemedicina, experiencia en atención al paciente y manejo de tecnología de salud." },
      { question: "¿Cómo destacar mi currículum de Telework Nurse?", answer: "Enfatiza tu experiencia en telemedicina y tus logros en satisfacción del paciente." },
      { question: "¿Qué habilidades necesita un Telework Nurse?", answer: "Habilidades de comunicación, manejo de crisis y conocimiento de tecnología de telemedicina." },
    ],
  },
  "transplant-nurse-coordinator": {
    slug: "coordinador-enfermera-transplante",
    title: "Coordinador de Enfermería de Trasplantes",
    keywords: ["currículum de Coordinador de Enfermería de Trasplantes", "CV de Coordinador de Enfermería de Trasplantes", "ejemplo currículum Coordinador de Enfermería de Trasplantes", "plantilla CV Coordinador de Enfermería de Trasplantes"],
    searchIntents: ["cómo escribir currículum de Coordinador de Enfermería de Trasplantes", "ejemplos currículum Coordinador de Enfermería de Trasplantes", "mejor formato CV Coordinador de Enfermería de Trasplantes"],
    topSkills: ["Cuidado del Paciente", "Transplante de Órganos", "Coordinación Clínica", "Defensa del Paciente", "Gestión de la Salud", "Colaboración en Equipo", "Gestión de Crisis", "Gestión de Datos", "Cumplimiento Regulatorio", "Habilidades de Comunicación"],
    atsKeywords: ["Coordinador de Trasplantes", "Enfermería", "Gestión del Paciente", "Ensayos Clínicos", "Procedimientos de Trasplante", "Educación del Paciente", "Registros de Salud", "Colaboración Interdisciplinaria", "Aseguramiento de Calidad", "Políticas de Salud", "Mejora de Resultados"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Coordinador de Enfermería de Trasplantes",
      summary: "Coordinador de Enfermería de Trasplantes dedicado con más de 5 años de experiencia en trasplante de órganos y gestión de pacientes. He coordinado con éxito más de 100 casos de trasplante, mejorando los resultados de los pacientes en un 30%.",
      skills: ["Cuidado del Paciente", "Transplante de Órganos", "Coordinación Clínica", "Defensa del Paciente", "Gestión de la Salud", "Colaboración en Equipo", "Gestión de Crisis", "Gestión de Datos", "Cumplimiento Regulatorio", "Habilidades de Comunicación"],
      experience: [
        {
          title: "Coordinador Senior de Enfermería de Trasplantes",
          company: "Mayo Clinic",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Coordiné más de 120 trasplantes de órganos, logrando una tasa de satisfacción del paciente del 95%.",
            "Implementé un nuevo sistema de seguimiento de pacientes que redujo los tiempos de espera en un 20%.",
            "Dirigí un equipo que mejoró la cumplimentación del cuidado post-trasplante en un 40%.",
          ],
        },
        {
          title: "Coordinador de Enfermería de Trasplantes",
          company: "Cleveland Clinic",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné la atención de más de 80 pacientes de trasplante, asegurando la adherencia a los planes de tratamiento.",
            "Realicé sesiones educativas para pacientes y familias, resultando en un aumento del 50% en la comprensión del cuidado postoperatorio.",
            "Colaboré con equipos multidisciplinarios para mejorar las estrategias de atención, conduciendo a mejores resultados para los pacientes.",
          ],
        },
      ],
      education: [
        { institution: "University of Michigan", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Transplant Coordinator (CCTC)", issuer: "American Board of Transplant Certification", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Coordinador de Enfermería de Trasplantes en su currículum?", answer: "Debe incluir experiencia relevante en trasplantes, habilidades clínicas, y logros en la gestión de pacientes." },
      { question: "¿Cómo destacar mi currículum de Coordinador de Enfermería de Trasplantes?", answer: "Enfatiza logros cuantificables y tu experiencia en colaboraciones interdisciplinarias." },
      { question: "¿Qué habilidades necesita un Coordinador de Enfermería de Trasplantes?", answer: "Habilidades en gestión de pacientes, comunicación efectiva, y conocimiento en procedimientos de trasplante." },
    ],
  },
  "travel-nurse": {
    slug: "curriculum-enfermera-viajera",
    title: "Currículum de Enfermera Viajera",
    keywords: ["currículum de enfermera viajera", "CV de enfermera viajera", "ejemplo currículum enfermera viajera", "plantilla CV enfermera viajera"],
    searchIntents: ["cómo escribir currículum de enfermera viajera", "ejemplos currículum enfermera viajera", "mejor formato CV enfermera viajera"],
    topSkills: ["Cuidado del Paciente", "Pensamiento Crítico", "Adaptabilidad", "Comunicación", "Colaboración en Equipo", "Gestión del Tiempo", "Habilidades Clínicas", "Competencia Cultural", "Resolución de Problemas", "Documentación"],
    atsKeywords: ["Enfermera Viajera", "RN", "Evaluación de Pacientes", "Cuidado de la Salud", "Cuidado de Emergencia", "Cuidado Crítico", "Cuidado de Heridas", "Administración de Medicamentos", "Educación del Paciente", "Procedimientos de Enfermería", "Certificación BLS"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Enfermera Viajera",
      summary: "Enfermera Viajera dedicada con más de 5 años de experiencia en diversos entornos de atención médica. Historial comprobado de mejorar los resultados de los pacientes en un 20% a través de estrategias de atención efectivas.",
      skills: ["Cuidado del Paciente", "Pensamiento Crítico", "Adaptabilidad", "Comunicación", "Colaboración en Equipo", "Gestión del Tiempo", "Habilidades Clínicas", "Competencia Cultural", "Resolución de Problemas", "Documentación"],
      experience: [
        {
          title: "Enfermera Viajera Senior",
          company: "Healthcare Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoré las tasas de recuperación de pacientes en un 25% a través de intervenciones específicas.",
            "Gestioné el cuidado de más de 100 pacientes en varios departamentos.",
            "Optimicé los protocolos de comunicación, reduciendo los tiempos de respuesta en un 30%.",
          ],
        },
        {
          title: "Enfermera Viajera",
          company: "Global Health Services",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Me adapté con éxito a 5 entornos de atención médica diferentes en 2 años.",
            "Recibí el premio 'Excelencia en Enfermería' por comentarios sobresalientes de los pacientes.",
            "Contribuí a un aumento del 15% en las puntuaciones de satisfacción del paciente.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Enfermería", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Registered Nurse (RN)", issuer: "State Board of Nursing", date: "2018-05" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Travel Nurse Resume en su currículum?", answer: "Un Travel Nurse Resume debe incluir experiencia relevante, habilidades clínicas, certificaciones y logros destacados en atención al paciente." },
      { question: "¿Cómo destacar mi currículum de Travel Nurse Resume?", answer: "Para destacar su currículum, enfatice sus logros específicos, use palabras clave del sector y muestre su adaptabilidad a diferentes entornos de atención médica." },
      { question: "¿Qué habilidades necesita un Travel Nurse Resume?", answer: "Las habilidades clave incluyen cuidado del paciente, pensamiento crítico, adaptabilidad, y habilidades de comunicación y colaboración." },
    ],
  },
  "university-biomedical-researcher": {
    slug: "investigador-biomedico-universitario",
    title: "Investigador Biomédico Universitario",
    keywords: ["currículum de investigador biomédico", "CV de investigador biomédico", "ejemplo currículum investigador biomédico", "plantilla CV investigador biomédico"],
    searchIntents: ["cómo escribir currículum de investigador biomédico", "ejemplos currículum investigador biomédico", "mejor formato CV investigador biomédico"],
    topSkills: ["Biología Molecular", "Genómica", "Cultivo Celular", "Análisis de Datos", "Metodología de Investigación", "Ensayos Clínicos", "Técnicas de Laboratorio", "Software Estadístico", "Gestión de Proyectos", "Escritura Científica"],
    atsKeywords: ["investigación biomédica", "análisis de datos", "investigación clínica", "gestión de laboratorio", "redacción de subvenciones", "técnicas moleculares", "biología celular", "bioestadística", "protocolos de investigación", "colaboración en equipo", "habilidades de presentación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Investigador Biomédico Universitario",
      summary: "Investigador biomédico dedicado con más de 5 años de experiencia en biología molecular y genómica, habiendo publicado más de 10 artículos revisados por pares y asegurado $500,000 en financiamiento para investigación.",
      skills: ["Biología Molecular", "Genómica", "Cultivo Celular", "Análisis de Datos", "Metodología de Investigación", "Ensayos Clínicos", "Técnicas de Laboratorio", "Software Estadístico", "Gestión de Proyectos", "Escritura Científica"],
      experience: [
        {
          title: "Investigador Biomédico Senior",
          company: "Genentech",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la producción de investigación en un 30% mediante la implementación de nuevos protocolos de análisis de datos.",
            "Lideré un equipo de 5 investigadores en un proyecto que identificó 3 nuevos biomarcadores para la enfermedad X.",
            "Aseguré $500,000 en financiamiento de subvenciones para un estudio a varios años sobre terapia génica.",
          ],
        },
        {
          title: "Asociado de Investigación Biomédica",
          company: "Johns Hopkins University",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a un estudio que resultó en una publicación en Nature, impactando la comprensión de la enfermedad Y.",
            "Desarrollé y optimicé protocolos de laboratorio, reduciendo costos en un 15%.",
            "Colaboré con equipos multidisciplinarios para mejorar la eficiencia de la investigación.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Bioquímica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Research Coordinator", issuer: "Association of Clinical Research Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un investigador biomédico universitario en su currículum?", answer: "Un investigador biomédico debe incluir su experiencia en investigación, habilidades técnicas, publicaciones y financiación de proyectos." },
      { question: "¿Cómo destacar mi currículum de investigador biomédico universitario?", answer: "Enfatiza tus logros en investigación, habilidades relevantes y menciona colaboraciones exitosas." },
      { question: "¿Qué habilidades necesita un investigador biomédico universitario?", answer: "Las habilidades clave incluyen biología molecular, análisis de datos, y técnicas de laboratorio, entre otras." },
    ],
  }
};
