import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  "agricultural-scientist": {
    slug: "cientifico-agricola",
    title: "Científico Agrícola",
    keywords: ["currículum de científico agrícola", "CV de científico agrícola", "ejemplo currículum científico agrícola", "plantilla CV científico agrícola"],
    searchIntents: ["cómo escribir currículum de científico agrícola", "ejemplos currículum científico agrícola", "mejor formato CV científico agrícola"],
    topSkills: ["Manejo de Cultivos", "Ciencia del Suelo", "Genética Vegetal", "Control de Plagas", "Análisis de Datos", "Diseño de Investigaciones", "Pruebas de Campo", "Agricultura Sostenible", "Agronomía", "Estadísticas"],
    atsKeywords: ["Investigación Agrícola", "Experimentos de Campo", "Técnicas de Laboratorio", "Ciencia Ambiental", "Ingeniería Agrícola", "Biotecnología", "Fitopatología", "Sistemas de Riego", "Rotación de Cultivos", "Prácticas Agrícolas", "Fertilidad del Suelo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Agrícola",
      summary: "Científico agrícola con más de 5 años de experiencia en manejo de cultivos y ciencia del suelo, logrando un aumento del 20% en el rendimiento de los cultivos a través de técnicas agrícolas innovadoras.",
      skills: ["Manejo de Cultivos", "Ciencia del Suelo", "Genética Vegetal", "Control de Plagas", "Análisis de Datos", "Diseño de Investigaciones", "Pruebas de Campo", "Agricultura Sostenible", "Agronomía", "Estadísticas"],
      experience: [
        {
          title: "Científico Agrícola Senior",
          company: "AgriTech Innovations",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté el rendimiento de los cultivos en un 25% mediante la implementación de técnicas de agricultura de precisión.",
            "Dirigí un equipo en la realización de más de 50 pruebas de campo, lo que resultó en una recolección y análisis de datos significativos.",
            "Desarrollé un programa de manejo sostenible de plagas que redujo el uso de pesticidas en un 40%.",
          ],
        },
        {
          title: "Asociado de Investigación Agrícola",
          company: "Green Fields Research Institute",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a un proyecto de investigación que mejoró la fertilidad del suelo en granjas locales en un 30%.",
            "Publiqué 3 artículos revisados por pares en revistas agrícolas.",
            "Colaboré con agricultores para implementar mejores prácticas que mejoraron la productividad general.",
          ],
        },
      ],
      education: [
        { institution: "University of Agriculture", degree: "Licenciatura", field: "Agronomía", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Crop Advisor", issuer: "American Society of Agronomy", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Agrícola en su currículum?", answer: "Debe incluir educación, experiencia laboral relevante, habilidades específicas y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Científico Agrícola?", answer: "Enfatizando logros cuantificables y habilidades clave que son relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Científico Agrícola?", answer: "Habilidades en manejo de cultivos, ciencia del suelo, análisis de datos, y manejo de plagas, entre otras." },
    ],
  },
  "assistant-professor-chemistry": {
    slug: "asistente-profesor-quimica",
    title: "Asistente Profesor Química",
    keywords: ["currículum de asistente profesor química", "CV de asistente profesor química", "ejemplo currículum asistente profesor química", "plantilla CV asistente profesor química"],
    searchIntents: ["cómo escribir currículum de asistente profesor química", "ejemplos currículum asistente profesor química", "mejor formato CV asistente profesor química"],
    topSkills: ["Química Analítica", "Química Orgánica", "Química Física", "Educación Química", "Gestión de Laboratorio", "Metodología de Investigación", "Desarrollo Curricular", "Análisis de Datos", "Redacción de Propuestas", "Colaboración"],
    atsKeywords: ["Química", "Educación Superior", "Investigación", "Enseñanza", "Diseño Curricular", "Habilidades de Laboratorio", "Publicaciones", "Mentoría Estudiantil", "Asesoramiento Académico", "Evaluación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente Profesor Química",
      summary: "Asistente Profesor de Química dedicado con más de 5 años de experiencia docente y un historial comprobado de asegurar $500,000 en financiamiento para investigación.",
      skills: ["Química Analítica", "Química Orgánica", "Química Física", "Educación Química", "Gestión de Laboratorio", "Metodología de Investigación", "Desarrollo Curricular", "Análisis de Datos", "Redacción de Propuestas", "Colaboración"],
      experience: [
        {
          title: "Profesor Titular",
          company: "University of Science and Technology",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la participación estudiantil en un 30% a través de métodos de enseñanza innovadores.",
            "Publicó 5 artículos revisados por pares en revistas de alto impacto.",
            "Aseguró $200,000 en financiamiento para un proyecto de investigación sobre química sostenible.",
          ],
        },
        {
          title: "Profesor",
          company: "State College of Arts and Sciences",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló un nuevo currículo de laboratorio que mejoró el rendimiento estudiantil en un 25%.",
            "Mentor de proyectos de investigación de pregrado que llevaron a 3 presentaciones en conferencias.",
            "Logró una calificación de satisfacción estudiantil del 95% en evaluaciones de cursos.",
          ],
        },
      ],
      education: [
        { institution: "Harvard University", degree: "Ph.D.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Chemistry Educator", issuer: "National Association of Chemistry Teachers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Assistant Professor Chemistry en su currículum?", answer: "Un resumen de su experiencia docente, áreas de especialización, publicaciones y financiamiento de investigación." },
      { question: "¿Cómo destacar mi currículum de Assistant Professor Chemistry?", answer: "Enfatizando sus logros en investigación, publicaciones y métodos innovadores de enseñanza." },
      { question: "¿Qué habilidades necesita un Assistant Professor Chemistry?", answer: "Competencias en química analítica, orgánica y física, así como habilidades en educación y gestión de laboratorio." },
    ],
  },
  "atmospheric-scientist": {
    slug: "cientifico-atmosferico",
    title: "Científico Atmosférico",
    keywords: ["currículum de Científico Atmosférico", "CV de Científico Atmosférico", "ejemplo currículum Científico Atmosférico", "plantilla CV Científico Atmosférico"],
    searchIntents: ["cómo escribir currículum de Científico Atmosférico", "ejemplos currículum Científico Atmosférico", "mejor formato CV Científico Atmosférico"],
    topSkills: ["Climatología", "Análisis Meteorológico", "Interpretación de Datos", "Teledetección", "Modelado Atmosférico", "Evaluación de Impacto Ambiental", "Análisis Estadístico", "Investigación de Campo", "Analítica Predictiva", "Política Climática"],
    atsKeywords: ["cambio climático", "pronóstico del tiempo", "calidad del aire", "análisis de datos", "metodología de investigación", "ciencia ambiental", "GIS", "programación informática", "reportes científicos", "colaboración", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Atmosférico",
      summary: "Científico Atmosférico dedicado con más de 5 años de experiencia en investigación climática y análisis meteorológico, logrando un aumento del 20% en la precisión predictiva de los modelos climáticos.",
      skills: ["Climatología", "Análisis Meteorológico", "Interpretación de Datos", "Teledetección", "Modelado Atmosférico", "Evaluación de Impacto Ambiental", "Análisis Estadístico", "Investigación de Campo", "Analítica Predictiva", "Política Climática"],
      experience: [
        {
          title: "Científico Atmosférico Senior",
          company: "National Oceanic and Atmospheric Administration",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró la precisión de predicción del tiempo en un 25% a través de la implementación de modelos atmosféricos avanzados.",
            "Lideró un equipo de 5 en un proyecto que analizó datos climáticos que afectan la agricultura local, resultando en un 15% de mayor rendimiento de cultivos.",
            "Publicó 3 artículos revisados por pares sobre evaluaciones de impacto climático, mejorando la visibilidad de la organización en la comunidad científica.",
          ],
        },
        {
          title: "Científico Atmosférico",
          company: "Environmental Protection Agency",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realizó análisis exhaustivos de datos de contaminación del aire, llevando a una reducción del 10% en los niveles de smog urbano.",
            "Desarrolló herramientas interactivas para la educación pública sobre el cambio climático, alcanzando a más de 10,000 miembros de la comunidad.",
            "Colaboró con equipos interdisciplinarios para evaluar los impactos ambientales de la legislación propuesta.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Ciencias Atmosféricas", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Weather Observer", issuer: "American Meteorological Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Atmosférico en su currículum?", answer: "Un Científico Atmosférico debe incluir su experiencia en análisis meteorológico, investigación climática y habilidades técnicas relevantes." },
      { question: "¿Cómo destacar mi currículum de Científico Atmosférico?", answer: "Para destacar tu currículum, incluye logros cuantificables, publicaciones relevantes y colabora con otros profesionales del campo." },
      { question: "¿Qué habilidades necesita un Científico Atmosférico?", answer: "Un Científico Atmosférico necesita habilidades en análisis de datos, modelado atmosférico, trabajo en equipo y comunicación efectiva." },
    ],
  },
  "chemistry-instructor": {
    slug: "instructor-de-quimica",
    title: "Instructor de Química",
    keywords: ["currículum de instructor de química", "CV de instructor de química", "ejemplo currículum instructor de química", "plantilla CV instructor de química"],
    searchIntents: ["cómo escribir currículum de instructor de química", "ejemplos currículum instructor de química", "mejor formato CV instructor de química"],
    topSkills: ["Química Analítica", "Química Orgánica", "Química Inorgánica", "Química Física", "Habilidades de Laboratorio", "Protocolos de Seguridad", "Desarrollo de Currículo", "Compromiso Estudiantil", "Técnicas de Evaluación", "Tecnología Educativa"],
    atsKeywords: ["Química", "Enseñanza", "Gestión de Laboratorio", "Diseño Curricular", "Evaluación", "Mentoría Estudiantil", "Estándares Educativos", "Educación Científica", "Gestión del Aula", "Estrategias Instruccionales", "Desarrollo Profesional"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Instructor de Química",
      summary: "Instructor de Química dedicado con más de 5 años de experiencia en educación superior y un historial comprobado de mejorar el rendimiento estudiantil en un 20%. Comprometido con fomentar un ambiente de aprendizaje positivo y mejorar el compromiso estudiantil.",
      skills: ["Química Analítica", "Química Orgánica", "Química Inorgánica", "Química Física", "Habilidades de Laboratorio", "Protocolos de Seguridad", "Desarrollo de Currículo", "Compromiso Estudiantil", "Técnicas de Evaluación", "Tecnología Educativa"],
      experience: [
        {
          title: "Instructor de Química Senior",
          company: "University of Science and Technology",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté las tasas de aprobación estudiantil en un 25% mediante métodos de enseñanza innovadores",
            "Desarrollé un nuevo currículo de laboratorio que mejoró el aprendizaje práctico para más de 200 estudiantes",
            "Dirigí una iniciativa departamental que redujo las tasas de abandono de cursos en un 15%",
          ],
        },
        {
          title: "Instructor de Química",
          company: "City College of Arts and Sciences",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé técnicas de aprendizaje interactivas que mejoraron los puntajes de compromiso estudiantil en un 30%",
            "Facilité proyectos de investigación que resultaron en dos artículos publicados en revistas revisadas por pares",
            "Organicé ferias de ciencia anuales que aumentaron la participación en un 40%",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Chemistry Educator", issuer: "National Science Teachers Association", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un instructor de química en su currículum?", answer: "Incluir experiencia docente, habilidades específicas de química, logros en la enseñanza y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de instructor de química?", answer: "Enfatizar logros cuantificables, utilizar un formato claro y resaltar habilidades relevantes para la educación científica." },
      { question: "¿Qué habilidades necesita un instructor de química?", answer: "Habilidades en química analítica, orgánica e inorgánica, así como en pedagogía y gestión del aula." },
    ],
  },
  "chemistry-lab-assistant": {
    slug: "asistente-de-laboratorio-de-quimica",
    title: "Asistente de Laboratorio de Química",
    keywords: ["currículum de Asistente de Laboratorio de Química", "CV de Asistente de Laboratorio de Química", "ejemplo currículum Asistente de Laboratorio de Química", "plantilla CV Asistente de Laboratorio de Química"],
    searchIntents: ["cómo escribir currículum de Asistente de Laboratorio de Química", "ejemplos currículum Asistente de Laboratorio de Química", "mejor formato CV Asistente de Laboratorio de Química"],
    topSkills: ["Técnicas de Laboratorio", "Análisis de Datos", "Seguridad Química", "Preparación de Muestras", "Instrumentación", "Control de Calidad", "Apoyo a la Investigación", "Documentación", "Colaboración en Equipo", "Resolución de Problemas"],
    atsKeywords: ["química", "laboratorio", "asistencia", "investigación", "análisis de muestras", "recolección de datos", "aseguramiento de calidad", "manejo de químicos", "protocolos de seguridad", "trabajo en equipo", "redacción técnica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Laboratorio de Química",
      summary: "Asistente de Laboratorio de Química orientado al detalle con más de 5 años de experiencia en entornos de laboratorio. Contribuyó exitosamente a proyectos de investigación que mejoraron la eficiencia del procesamiento de muestras en un 30%.",
      skills: ["Técnicas de Laboratorio", "Análisis de Datos", "Seguridad Química", "Preparación de Muestras", "Instrumentación", "Control de Calidad", "Apoyo a la Investigación", "Documentación", "Colaboración en Equipo", "Resolución de Problemas"],
      experience: [
        {
          title: "Asistente de Laboratorio de Química Senior",
          company: "Global Research Labs",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia en el procesamiento de muestras en un 30% mediante flujos de trabajo optimizados.",
            "Entrené a 10 nuevos asistentes de laboratorio sobre protocolos de seguridad y técnicas de laboratorio.",
            "Asistí en una investigación que condujo a una publicación en una revista revisada por pares.",
          ],
        },
        {
          title: "Asistente de Laboratorio de Química",
          company: "Innovative Science Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 200 análisis químicos con una tasa de precisión del 98%.",
            "Mantuve el equipo de laboratorio, reduciendo el tiempo de inactividad en un 15%.",
            "Colaboré con un equipo para desarrollar un nuevo procedimiento operativo estándar que mejoró la eficiencia.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Chemical Technician", issuer: "National Association of Chemical Technicians", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Laboratorio de Química en su currículum?", answer: "Incluya sus habilidades técnicas, experiencia previa en laboratorio y logros significativos." },
      { question: "¿Cómo destacar mi currículum de Asistente de Laboratorio de Química?", answer: "Enfatice su atención al detalle, experiencia en el laboratorio y habilidades en trabajo en equipo." },
      { question: "¿Qué habilidades necesita un Asistente de Laboratorio de Química?", answer: "Necesita habilidades en técnicas de laboratorio, análisis de datos y protocolos de seguridad." },
    ],
  },
  "computational-physicist": {
    slug: "fisico-computacional",
    title: "Físico Computacional",
    keywords: ["currículum de físico computacional", "CV de físico computacional", "ejemplo currículum físico computacional", "plantilla CV físico computacional"],
    searchIntents: ["cómo escribir currículum de físico computacional", "ejemplos currículum físico computacional", "mejor formato CV físico computacional"],
    topSkills: ["Modelado Computacional", "Análisis Numérico", "Visualización de Datos", "Mecánica Cuántica", "Aprendizaje Automático", "Computación de Alto Rendimiento", "Mecánica Estadística", "Programación (Python, C++)", "Software de Simulación", "Computación Científica"],
    atsKeywords: ["física computacional", "análisis de datos", "investigación científica", "modelado matemático", "desarrollo de algoritmos", "técnicas de simulación", "computación paralela", "estructuras de datos", "simulaciones físicas", "publicación de investigaciones", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Físico Computacional",
      summary: "Físico Computacional con más de 5 años de experiencia en el desarrollo de simulaciones y modelos para sistemas físicos complejos, resultando en un aumento del 20% en la precisión de las predicciones.",
      skills: ["Modelado Computacional", "Análisis Numérico", "Visualización de Datos", "Mecánica Cuántica", "Aprendizaje Automático", "Computación de Alto Rendimiento", "Mecánica Estadística", "Programación (Python, C++)", "Software de Simulación", "Computación Científica"],
      experience: [
        {
          title: "Físico Computacional Senior",
          company: "NASA",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé un nuevo modelo de simulación que mejoró la precisión de las predicciones en un 30%.",
            "Lideré un equipo de 5 en un proyecto que resultó en hallazgos publicados en una revista de física de renombre.",
            "Implementé técnicas de aprendizaje automático que redujeron el tiempo de computación en un 25%.",
          ],
        },
        {
          title: "Físico Computacional",
          company: "MIT Lincoln Laboratory",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé una tubería de análisis de datos que procesó conjuntos de datos un 40% más rápido.",
            "Contribuí a un proyecto que resultó en una subvención de $200,000 para investigaciones adicionales.",
            "Publiqué 3 artículos en revistas revisadas por pares sobre metodologías de simulación.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Física", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Computational Scientist", issuer: "Society for Industrial and Applied Mathematics", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Físico Computacional en su currículum?", answer: "Debe incluir experiencia en simulación, habilidades de programación y publicaciones en revistas científicas." },
      { question: "¿Cómo destacar mi currículum de Físico Computacional?", answer: "Enfatiza tus logros cuantificables y proyectos relevantes en el campo de la física computacional." },
      { question: "¿Qué habilidades necesita un Físico Computacional?", answer: "Habilidades clave incluyen modelado computacional, análisis numérico y programación en lenguajes como Python y C++." },
    ],
  },
  "computer-vision-scientist": {
    slug: "cientifico-vision-computacional",
    title: "Científico de Visión Computacional",
    keywords: ["currículum de científico de visión computacional", "CV de científico de visión computacional", "ejemplo currículum científico de visión computacional", "plantilla CV científico de visión computacional"],
    searchIntents: ["cómo escribir currículum de científico de visión computacional", "ejemplos currículum científico de visión computacional", "mejor formato CV científico de visión computacional"],
    topSkills: ["Procesamiento de Imágenes", "Aprendizaje Profundo", "Aprendizaje Automático", "OpenCV", "TensorFlow", "Python", "Algoritmos de Visión Computacional", "Anotación de Datos", "Visión 3D", "Redes Neuronales"],
    atsKeywords: ["visión computacional", "reconocimiento de imágenes", "reconocimiento de patrones", "aprendizaje automático", "IA", "análisis de datos", "desarrollo de algoritmos", "desarrollo de software", "programación", "investigación", "documentación técnica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico de Visión Computacional",
      summary: "Científico de Visión Computacional con más de 5 años de experiencia en el desarrollo de modelos avanzados de aprendizaje automático. Mejoró con éxito la precisión del reconocimiento de imágenes en un 30% a través de innovaciones en los algoritmos.",
      skills: ["Procesamiento de Imágenes", "Aprendizaje Profundo", "Aprendizaje Automático", "OpenCV", "TensorFlow", "Python", "Algoritmos de Visión Computacional", "Anotación de Datos", "Visión 3D", "Redes Neuronales"],
      experience: [
        {
          title: "Científico de Visión Computacional Senior",
          company: "NVIDIA",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé un nuevo algoritmo de segmentación de imágenes que mejoró la velocidad de procesamiento en un 25%",
            "Lideré un equipo que redujo el tiempo de entrenamiento de modelos en un 40% mediante técnicas de optimización",
            "Contribuí a un proyecto que mejoró la precisión de detección de objetos en un 15%, lo que resultó en un aumento significativo en la satisfacción del cliente",
          ],
        },
        {
          title: "Ingeniero de Visión Computacional",
          company: "Google",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé técnicas de aprendizaje automático que mejoraron los sistemas de reconocimiento visual en un 20%",
            "Colaboré en un proyecto que integró IA con productos existentes, lo que llevó a un aumento del 35% en la participación de los usuarios",
            "Escribí documentación técnica que simplificó el proceso de incorporación para nuevos ingenieros",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Deep Learning Specialization", issuer: "Coursera", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico de Visión Computacional en su currículum?", answer: "Un Científico de Visión Computacional debe incluir su experiencia en desarrollo de algoritmos, habilidades en programación y proyectos relevantes." },
      { question: "¿Cómo destacar mi currículum de Científico de Visión Computacional?", answer: "Para destacar, es importante resaltar logros cuantificables y habilidades técnicas específicas relacionadas con la visión computacional." },
      { question: "¿Qué habilidades necesita un Científico de Visión Computacional?", answer: "Las habilidades clave incluyen el procesamiento de imágenes, aprendizaje profundo, y el manejo de herramientas como OpenCV y TensorFlow." },
    ],
  },
  "entry-level-microbiologist": {
    slug: "microbiologo-de-nivel-inicial",
    title: "Microbiólogo de Nivel Inicial",
    keywords: ["currículum de microbiólogo", "CV de microbiólogo", "ejemplo currículum microbiólogo", "plantilla CV microbiólogo"],
    searchIntents: ["cómo escribir currículum de microbiólogo", "ejemplos currículum microbiólogo", "mejor formato CV microbiólogo"],
    topSkills: ["Técnicas de Cultivo Microbiano", "PCR y Electroforesis en Gel", "Análisis de Control de Calidad", "Interpretación de Datos", "Dominio de Equipos de Laboratorio", "Técnicas de Esterilización", "Identificación Microbiana", "Redacción de Informes", "Colaboración en Equipo", "Resolución de Problemas"],
    atsKeywords: ["microbiología", "laboratorio", "investigación", "análisis de datos", "aseguramiento de calidad", "biotecnología", "esterilización", "medios de cultivo", "informes", "gestión de proyectos", "protocolos de seguridad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Microbiólogo de Nivel Inicial",
      summary: "Licenciado en Microbiología reciente con experiencia práctica en técnicas de cultivo microbiano y análisis de control de calidad. Capacidad comprobada para gestionar proyectos de laboratorio de manera eficiente, lo que resultó en un aumento del 20% en la precisión de las pruebas.",
      skills: ["Técnicas de Cultivo Microbiano", "PCR y Electroforesis en Gel", "Análisis de Control de Calidad", "Interpretación de Datos", "Dominio de Equipos de Laboratorio", "Técnicas de Esterilización", "Identificación Microbiana", "Redacción de Informes", "Colaboración en Equipo", "Resolución de Problemas"],
      experience: [
        {
          title: "Técnico de Laboratorio",
          company: "Genentech",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró la precisión de las pruebas microbianas en un 20% mediante procedimientos de control de calidad mejorados.",
            "Asistió en la finalización exitosa de 15 proyectos de investigación dentro de los plazos.",
            "Desarrolló e implementó nuevos protocolos de esterilización, reduciendo las tasas de contaminación en un 30%.",
          ],
        },
        {
          title: "Intern Microbiologist",
          company: "AbbVie",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realizó más de 100 cultivos microbianos, contribuyendo a resultados significativos de investigación.",
            "Trabajó en colaboración en un proyecto que condujo a una nueva formulación de medicamento.",
            "Documentó los hallazgos de laboratorio y asistió en la preparación de informes para presentaciones regulatorias.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Microbiología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Microbiologist", issuer: "American Society for Microbiology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Entry Level Microbiologist en su currículum?", answer: "Un enfoque en habilidades técnicas, experiencia de laboratorio y formación académica relevante." },
      { question: "¿Cómo destacar mi currículum de Entry Level Microbiologist?", answer: "Resaltar logros específicos y experiencia práctica en el laboratorio." },
      { question: "¿Qué habilidades necesita un Entry Level Microbiologist?", answer: "Conocimientos en técnicas de cultivo, análisis de datos y control de calidad." },
    ],
  },
  "environmental-chemist": {
    slug: "quimico-ambiental",
    title: "Químico Ambiental",
    keywords: ["currículum de Químico Ambiental", "CV de Químico Ambiental", "ejemplo currículum Químico Ambiental", "plantilla CV Químico Ambiental"],
    searchIntents: ["cómo escribir currículum de Químico Ambiental", "ejemplos currículum Químico Ambiental", "mejor formato CV Químico Ambiental"],
    topSkills: ["Química Analítica", "Regulaciones Ambientales", "Análisis de Datos", "Técnicas de Laboratorio", "Seguridad Química", "Gestión de Proyectos", "Muestreo en Campo", "Evaluación de Impacto Ambiental", "Diseño de Investigaciones", "Redacción de Informes"],
    atsKeywords: ["Química Ambiental", "Químico", "Laboratorio", "Cumplimiento Regulatorio", "Aseguramiento de Calidad", "Sostenibilidad", "Toxicología", "Control de Contaminación", "Análisis Químico", "Monitoreo Ambiental", "Ciencias del Suelo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Químico Ambiental",
      summary: "Químico Ambiental con más de 5 años de experiencia en análisis químico y evaluación ambiental, logrando reducir los niveles de contaminación en un 30% en varios proyectos.",
      skills: ["Química Analítica", "Regulaciones Ambientales", "Análisis de Datos", "Técnicas de Laboratorio", "Seguridad Química", "Gestión de Proyectos", "Muestreo en Campo", "Evaluación de Impacto Ambiental", "Diseño de Investigaciones", "Redacción de Informes"],
      experience: [
        {
          title: "Químico Ambiental Senior",
          company: "EcoSolutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que resultó en una reducción del 40% de residuos peligrosos en un importante sitio industrial, ahorrando a la empresa $200,000 anuales.",
            "Desarrollé un nuevo protocolo de pruebas que mejoró la precisión en un 25%, aumentando la satisfacción del cliente.",
            "Colaboré con equipos interdisciplinarios para implementar prácticas de sostenibilidad que redujeron el consumo de recursos en un 15%.",
          ],
        },
        {
          title: "Químico Ambiental",
          company: "CleanEarth Labs",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 100 evaluaciones ambientales que llevaron a planes de remediación exitosos para sitios contaminados.",
            "Redacté informes técnicos que influyeron en cambios de políticas en las regulaciones ambientales locales.",
            "Participé en programas de divulgación comunitaria para educar sobre la importancia del control de la contaminación.",
          ],
        },
      ],
      education: [
        { institution: "University of Environmental Science", degree: "B.S.", field: "Química Ambiental", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Environmental Professional", issuer: "Institute of Environmental Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Químico Ambiental en su currículum?", answer: "Un Químico Ambiental debe incluir su experiencia en análisis químico, conocimientos en regulaciones ambientales y habilidades en gestión de proyectos." },
      { question: "¿Cómo destacar mi currículum de Químico Ambiental?", answer: "Resalte sus logros medibles, como reducciones en la contaminación o mejoras en la eficiencia de proyectos." },
      { question: "¿Qué habilidades necesita un Químico Ambiental?", answer: "Las habilidades clave incluyen análisis químico, cumplimiento regulatorio, y técnicas de laboratorio." },
    ],
  },
  "formal-scientist": {
    slug: "cientifico-formal",
    title: "Científico Formal",
    keywords: ["currículum de Científico Formal", "CV de Científico Formal", "ejemplo currículum Científico Formal", "plantilla CV Científico Formal"],
    searchIntents: ["cómo escribir currículum de Científico Formal", "ejemplos currículum Científico Formal", "mejor formato CV Científico Formal"],
    topSkills: ["Diseño Experimental", "Análisis de Datos", "Modelado Estadístico", "Metodología de Investigación", "Técnicas de Laboratorio", "Redacción Técnica", "Gestión de Proyectos", "Control de Calidad", "Cumplimiento Regulatorio", "Colaboración"],
    atsKeywords: ["investigación científica", "interpretación de datos", "pruebas de hipótesis", "estudios de campo", "publicaciones revisadas por pares", "equipos de laboratorio", "visualización de datos", "redacción de subvenciones", "protocolos experimentales", "liderazgo de equipo", "resolución de problemas"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Formal",
      summary: "Científico Formal orientado a resultados con más de 5 años de experiencia en investigación y desarrollo. Historial comprobado de aumentar la eficiencia de proyectos en un 30% y publicar en revistas de primer nivel.",
      skills: ["Diseño Experimental", "Análisis de Datos", "Modelado Estadístico", "Metodología de Investigación", "Técnicas de Laboratorio", "Redacción Técnica", "Gestión de Proyectos", "Control de Calidad", "Cumplimiento Regulatorio", "Colaboración"],
      experience: [
        {
          title: "Científico de Investigación Senior",
          company: "Genentech",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que desarrolló una nueva formulación de medicamento, resultando en un aumento del 25% en los puntajes de satisfacción del paciente.",
            "Publiqué 5 artículos en revistas de alto impacto, contribuyendo a un aumento del 40% en la visibilidad del departamento.",
            "Aseguré $1M en financiamiento para un proyecto de investigación innovador a través de exitosas solicitudes de subvenciones.",
          ],
        },
        {
          title: "Científico de Investigación",
          company: "Amgen",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé y validé métodos para pruebas de estabilidad de medicamentos, reduciendo el tiempo de comercialización en un 15%.",
            "Colaboré con equipos multifuncionales para optimizar procesos, mejorando el tiempo de respuesta de proyectos en un 20%.",
            "Presenté hallazgos en 3 conferencias internacionales, mejorando el intercambio de conocimientos dentro de la comunidad científica.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Biológica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Clinical Research Coordinator", issuer: "Association of Clinical Research Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Formal en su currículum?", answer: "Un Científico Formal debe incluir su experiencia en investigación, habilidades técnicas y logros relevantes." },
      { question: "¿Cómo destacar mi currículum de Científico Formal?", answer: "Utilice palabras clave relevantes, destaque logros cuantificables y asegúrese de tener un formato limpio y profesional." },
      { question: "¿Qué habilidades necesita un Científico Formal?", answer: "Las habilidades clave incluyen diseño experimental, análisis de datos, redacción técnica y gestión de proyectos." },
    ],
  },
  "geologist-engineer": {
    slug: "geologo-ingeniero",
    title: "Geólogo Ingeniero",
    keywords: ["currículum de geólogo ingeniero", "CV de geólogo ingeniero", "ejemplo currículum geólogo ingeniero", "plantilla CV geólogo ingeniero"],
    searchIntents: ["cómo escribir currículum de geólogo ingeniero", "ejemplos currículum geólogo ingeniero", "mejor formato CV geólogo ingeniero"],
    topSkills: ["Cartografía Geológica", "Evaluación Ambiental", "Análisis Geotécnico", "Interpretación de Datos", "Investigación de Campo", "Gestión de Proyectos", "Exploración Mineral", "Pruebas de Suelo", "Hidrología", "Geología Petrolera"],
    atsKeywords: ["Ingeniería Geológica", "Ingeniería Ambiental", "Ingeniería Geotécnica", "Análisis de Datos", "Estudios de Campo", "Investigación de Sitios", "Redacción de Informes", "Cumplimiento Regulatorio", "Normas de Seguridad", "Metodologías de Investigación", "Tecnologías Geoespaciales"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Geólogo Ingeniero",
      summary: "Geólogo Ingeniero con más de 5 años de experiencia en evaluación ambiental y análisis geotécnico, logrando reducir los costos de proyectos en un 20% mediante una gestión eficiente de recursos.",
      skills: ["Cartografía Geológica", "Evaluación Ambiental", "Análisis Geotécnico", "Interpretación de Datos", "Investigación de Campo", "Gestión de Proyectos", "Exploración Mineral", "Pruebas de Suelo", "Hidrología", "Geología Petrolera"],
      experience: [
        {
          title: "Geólogo Ingeniero Senior",
          company: "Geotech Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que redujo el impacto ambiental en un 30%, resultando en ahorros significativos de $150,000.",
            "Realicé más de 100 pruebas de suelo, mejorando la eficiencia en la selección de sitios en un 25%.",
            "Desarrollé informes comprensivos que aumentaron las tasas de aprobación de proyectos en un 40%.",
          ],
        },
        {
          title: "Geólogo Ingeniero",
          company: "EarthWorks Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Gestioné encuestas geológicas para 15 proyectos importantes, asegurando el cumplimiento de las regulaciones estatales.",
            "Mejoré los procesos de recolección de datos, reduciendo los plazos de los proyectos en un 15%.",
            "Colaboré con equipos interdisciplinarios para completar exitosamente proyectos dentro del presupuesto.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ingeniería Geológica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Professional Geologist", issuer: "American Institute of Professional Geologists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Geólogo Ingeniero en su currículum?", answer: "Un Geólogo Ingeniero debe incluir su experiencia laboral, habilidades técnicas, educación y certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Geólogo Ingeniero?", answer: "Para destacar su currículum, use palabras clave relevantes y destaque logros cuantificables." },
      { question: "¿Qué habilidades necesita un Geólogo Ingeniero?", answer: "Las habilidades clave incluyen cartografía geológica, evaluación ambiental, análisis geotécnico y gestión de proyectos." },
    ],
  },
  "health-physicist": {
    slug: "físico-de-salud",
    title: "Físico de Salud",
    keywords: ["currículum de físico de salud", "CV de físico de salud", "ejemplo currículum físico de salud", "plantilla CV físico de salud"],
    searchIntents: ["cómo escribir currículum de físico de salud", "ejemplos currículum físico de salud", "mejor formato CV físico de salud"],
    topSkills: ["Radiación Segura", "Evaluación de Riesgos", "Cumplimiento Regulatorio", "Mediciones Radiológicas", "Monitoreo Ambiental", "Protección Radiológica", "Investigación en Física de la Salud", "Análisis de Datos", "Aseguramiento de Calidad", "Salud Pública"],
    atsKeywords: ["radiation safety", "health physics", "risk assessment", "environmental monitoring", "regulatory compliance", "radiological safety", "data analysis", "quality assurance", "public health", "environmental health", "occupational safety"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Físico de Salud",
      summary: "Físico de Salud dedicado con más de 5 años de experiencia en seguridad radiológica y cumplimiento normativo. Reduje con éxito la exposición a la radiación en el lugar de trabajo en un 30% a través de protocolos de seguridad innovadores.",
      skills: ["Radiación Segura", "Evaluación de Riesgos", "Cumplimiento Regulatorio", "Mediciones Radiológicas", "Monitoreo Ambiental", "Protección Radiológica", "Investigación en Física de la Salud", "Análisis de Datos", "Aseguramiento de Calidad", "Salud Pública"],
      experience: [
        {
          title: "Físico de Salud Senior",
          company: "Radiation Safety Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo programa de seguridad radiológica que disminuyó los incidentes en un 40%",
            "Realicé más de 50 evaluaciones de radiación, asegurando el cumplimiento con las regulaciones estatales",
            "Lideré un equipo que mejoró la eficiencia del monitoreo de radiación en un 25%",
          ],
        },
        {
          title: "Físico de Salud",
          company: "Safe Health Agency",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé materiales de capacitación que incrementaron la conciencia del personal sobre la seguridad radiológica en un 60%",
            "Realicé auditorías regulares que resultaron en una reducción del 20% en problemas de incumplimiento",
            "Colaboré en un proyecto de investigación que identificó nuevos métodos para la reducción de dosis de radiación",
          ],
        },
      ],
      education: [
        { institution: "University of Science and Technology", degree: "B.S.", field: "Física de la Salud", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Health Physicist", issuer: "American Board of Health Physics", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Físico de Salud en su currículum?", answer: "Incluir experiencia en seguridad radiológica, habilidades en análisis de datos y cumplimiento regulatorio." },
      { question: "¿Cómo destacar mi currículum de Físico de Salud?", answer: "Resaltar logros cuantificables y habilidades clave en seguridad radiológica." },
      { question: "¿Qué habilidades necesita un Físico de Salud?", answer: "Conocimientos en seguridad radiológica, análisis de riesgos y monitoreo ambiental." },
    ],
  },
  "high-school-chemistry-teacher": {
    slug: "profesor-de-quimica-de-secundaria",
    title: "Profesor de Química de Secundaria",
    keywords: ["currículum de profesor de química", "CV de profesor de química", "ejemplo currículum profesor de química", "plantilla CV profesor de química"],
    searchIntents: ["cómo escribir currículum de profesor de química", "ejemplos currículum profesor de química", "mejor formato CV profesor de química"],
    topSkills: ["Conocimiento de Química", "Desarrollo de Currículo", "Gestión del Aula", "Diseño de Evaluaciones", "Compromiso Estudiantil", "Habilidades de Laboratorio", "Protocolos de Seguridad", "Instrucción Diferenciada", "Habilidades de Comunicación", "Colaboración"],
    atsKeywords: ["Química", "Educación", "Enseñanza", "Gestión de Laboratorio", "Planificación Curricular", "Instrucción en el Aula", "Evaluación Estudiantil", "Pedagogía", "Planificación de Lecciones", "Desarrollo Profesional", "Educación STEM"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Profesor de Química de Secundaria",
      summary: "Profesor de Química de Secundaria dedicado con más de 5 años de experiencia en el desarrollo de planes de estudio de ciencias atractivos y fomentando el interés de los estudiantes en la química. Logré un aumento del 20% en las calificaciones de los exámenes de los estudiantes a través de métodos de enseñanza innovadores.",
      skills: ["Conocimiento de Química", "Desarrollo de Currículo", "Gestión del Aula", "Diseño de Evaluaciones", "Compromiso Estudiantil", "Habilidades de Laboratorio", "Protocolos de Seguridad", "Instrucción Diferenciada", "Habilidades de Comunicación", "Colaboración"],
      experience: [
        {
          title: "Instructora Principal de Química",
          company: "Springfield High School",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Implementé un nuevo currículo de laboratorio que mejoró el compromiso de los estudiantes en un 30%",
            "Facilité sesiones de tutoría después de clases que aumentaron las tasas de aprobación en un 15%",
            "Coordiné una feria de química que involucró a más de 200 estudiantes y mostró sus proyectos",
          ],
        },
        {
          title: "Profesor de Química",
          company: "Central High School",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrollé y enseñé un curso integral de química para estudiantes de 10º grado",
            "Inicié una asociación con universidades locales para programas de enriquecimiento científico",
            "Lideré un equipo de profesores en la evaluación y mejora del currículo",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Educación en Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Chemistry Teacher", issuer: "National Board for Professional Teaching Standards", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Profesor de Química de Secundaria en su currículum?", answer: "Incluir experiencia docente, habilidades en gestión de aula y desarrollo curricular, así como certificaciones relevantes." },
      { question: "¿Cómo destacar mi currículum de Profesor de Química de Secundaria?", answer: "Enfatizar logros cuantificables y habilidades específicas relacionadas con la enseñanza de la química." },
      { question: "¿Qué habilidades necesita un Profesor de Química de Secundaria?", answer: "Conocimiento profundo de química, habilidades en gestión de aula, y capacidad para involucrar a los estudiantes." },
    ],
  },
  "humanities-scientist": {
    slug: "cientifico-de-humanidades",
    title: "Científico de Humanidades",
    keywords: ["currículum de científico de humanidades", "CV de científico de humanidades", "ejemplo currículum científico de humanidades", "plantilla CV científico de humanidades"],
    searchIntents: ["cómo escribir currículum de científico de humanidades", "ejemplos currículum científico de humanidades", "mejor formato CV científico de humanidades"],
    topSkills: ["Investigación cualitativa", "Análisis de datos", "Comunicación intercultural", "Pensamiento crítico", "Revisión de literatura", "Análisis histórico", "Métodos etnográficos", "Software estadístico", "Redacción académica", "Gestión de proyectos"],
    atsKeywords: ["investigación en humanidades", "ciencias sociales", "estudios interdisciplinarios", "datos cualitativos", "metodología de investigación", "visualización de datos", "redacción de propuestas", "trabajo de campo", "oratoria", "análisis de literatura", "compromiso comunitario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico de Humanidades",
      summary: "Científico de Humanidades con más de 5 años de experiencia en investigación cualitativa y análisis cultural. Lideré con éxito un proyecto que aumentó el compromiso comunitario en un 40% a través de programas innovadores de divulgación.",
      skills: ["Investigación cualitativa", "Análisis de datos", "Comunicación intercultural", "Pensamiento crítico", "Revisión de literatura", "Análisis histórico", "Métodos etnográficos", "Software estadístico", "Redacción académica", "Gestión de proyectos"],
      experience: [
        {
          title: "Investigador Senior en Humanidades",
          company: "Cultural Insights Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré una iniciativa de investigación que mejoró la participación comunitaria en un 40%",
            "Autor de 3 artículos revisados por pares con más de 200 citas",
            "Aseguré $50,000 en financiamiento para proyectos interdisciplinarios",
          ],
        },
        {
          title: "Asistente de Investigación en Humanidades",
          company: "Global Perspectives University",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé investigación de campo que resultó en un informe integral sobre dinámicas sociales",
            "Asistí en el desarrollo de un currículo que mejoró el compromiso estudiantil en un 30%",
            "Presenté hallazgos en 2 conferencias nacionales",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Estudios Culturales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Qualitative Researcher", issuer: "International Institute of Research", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico de Humanidades en su currículum?", answer: "Incluir experiencia en investigación, habilidades analíticas y logros en proyectos comunitarios." },
      { question: "¿Cómo destacar mi currículum de Científico de Humanidades?", answer: "Enfatizar logros significativos y habilidades específicas en investigación cualitativa." },
      { question: "¿Qué habilidades necesita un Científico de Humanidades?", answer: "Habilidades clave incluyen análisis crítico, comunicación intercultural y gestión de proyectos." },
    ],
  },
  "image-analysis-scientist": {
    slug: "cientifico-de-analisis-de-imagen",
    title: "Científico de Análisis de Imagen",
    keywords: ["currículum de científico de análisis de imagen", "CV de científico de análisis de imagen", "ejemplo currículum científico de análisis de imagen", "plantilla CV científico de análisis de imagen"],
    searchIntents: ["cómo escribir currículum de científico de análisis de imagen", "ejemplos currículum científico de análisis de imagen", "mejor formato CV científico de análisis de imagen"],
    topSkills: ["Procesamiento de Imágenes", "Aprendizaje Automático", "Visión por Computadora", "Aprendizaje Profundo", "Análisis de Datos", "Análisis Estadístico", "Python", "TensorFlow", "OpenCV", "Segmentación de Imágenes"],
    atsKeywords: ["análisis de imágenes", "visión por computadora", "aprendizaje automático", "procesamiento de datos", "reconocimiento de patrones", "desarrollo de algoritmos", "modelado estadístico", "clasificación de imágenes", "extracción de características", "visualización", "programación"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico de Análisis de Imagen",
      summary: "Científico de Análisis de Imagen orientado a resultados con más de 5 años de experiencia en el desarrollo de soluciones innovadoras de procesamiento de imágenes. Historial comprobado de aumentar la precisión de los algoritmos de clasificación de imágenes en un 30% y reducir el tiempo de procesamiento en un 20%.",
      skills: ["Procesamiento de Imágenes", "Aprendizaje Automático", "Visión por Computadora", "Aprendizaje Profundo", "Análisis de Datos", "Análisis Estadístico", "Python", "TensorFlow", "OpenCV", "Segmentación de Imágenes"],
      experience: [
        {
          title: "Científico de Análisis de Imagen Senior",
          company: "TechVision Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un proyecto que mejoró la precisión de la clasificación de imágenes en un 30%, resultando en un aumento de $200,000 en renovaciones de contratos.",
            "Desarrollé una pipeline de procesamiento de imágenes en tiempo real que redujo el tiempo de procesamiento en un 20%, mejorando la eficiencia operativa.",
            "Publiqué 3 artículos de investigación sobre técnicas avanzadas de segmentación de imágenes en revistas de primer nivel.",
          ],
        },
        {
          title: "Científico de Análisis de Imagen",
          company: "Visionary Solutions",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé algoritmos de aprendizaje automático que mejoraron las capacidades de reconocimiento de imágenes, logrando una tasa de precisión del 95%.",
            "Colaboré con equipos multifuncionales para diseñar una herramienta de análisis de imágenes amigable para el usuario, aumentando el compromiso de los usuarios en un 40%.",
            "Realicé talleres para capacitar al personal en técnicas de análisis de imágenes, mejorando la productividad del equipo.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Machine Learning Specialist", issuer: "AI Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico de Análisis de Imagen en su currículum?", answer: "Un Científico de Análisis de Imagen debe incluir su experiencia en procesamiento de imágenes, habilidades en aprendizaje automático y ejemplos de proyectos relevantes." },
      { question: "¿Cómo destacar mi currículum de Científico de Análisis de Imagen?", answer: "Utiliza métricas cuantificables para mostrar tus logros y destaca tus habilidades técnicas y de colaboración." },
      { question: "¿Qué habilidades necesita un Científico de Análisis de Imagen?", answer: "Las habilidades clave incluyen procesamiento de imágenes, visión por computadora, aprendizaje automático y programación en Python." },
    ],
  },
  "image-processing-scientist": {
    slug: "cientifico-en-procesamiento-de-imagenes",
    title: "Científico en Procesamiento de Imágenes",
    keywords: ["currículum de científico en procesamiento de imágenes", "CV de científico en procesamiento de imágenes", "ejemplo currículum científico en procesamiento de imágenes", "plantilla CV científico en procesamiento de imágenes"],
    searchIntents: ["cómo escribir currículum de científico en procesamiento de imágenes", "ejemplos currículum científico en procesamiento de imágenes", "mejor formato CV científico en procesamiento de imágenes"],
    topSkills: ["Segmentación de Imágenes", "Aprendizaje Automático", "Visión por Computadora", "Aprendizaje Profundo", "Mejora de Imágenes", "Extracción de Características", "Análisis de Datos", "Desarrollo de Algoritmos", "Modelado Estadístico", "Desarrollo de Software"],
    atsKeywords: ["procesamiento de imágenes", "visión por computadora", "aprendizaje automático", "análisis de datos", "desarrollo de algoritmos", "aprendizaje profundo", "extracción de características", "segmentación de imágenes", "ingeniería de software", "análisis estadístico", "investigación y desarrollo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico en Procesamiento de Imágenes",
      summary: "Científico en Procesamiento de Imágenes con más de 5 años en el campo, especializado en desarrollar algoritmos innovadores que mejoran la calidad de la imagen en un 30%. Historial comprobado en la aplicación de técnicas de aprendizaje automático a problemas del mundo real.",
      skills: ["Segmentación de Imágenes", "Aprendizaje Automático", "Visión por Computadora", "Aprendizaje Profundo", "Mejora de Imágenes", "Extracción de Características", "Análisis de Datos", "Desarrollo de Algoritmos", "Modelado Estadístico", "Desarrollo de Software"],
      experience: [
        {
          title: "Científico Senior en Procesamiento de Imágenes",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé un nuevo algoritmo de mejora de imágenes que redujo el tiempo de procesamiento en un 40%.",
            "Dirigí un proyecto que mejoró la precisión de detección de objetos en un 25%, resultando en un mejor rendimiento del producto.",
            "Colaboré con equipos multifuncionales para crear un modelo de aprendizaje automático que aumentó la precisión predictiva en un 20%.",
          ],
        },
        {
          title: "Ingeniero en Procesamiento de Imágenes",
          company: "Visionary Solutions Ltd.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé técnicas de segmentación de imágenes que mejoraron la velocidad de procesamiento de imágenes en un 15%.",
            "Desarrollé herramientas de software que mejoraron la eficiencia del procesamiento de datos, reduciendo costos en $50K anuales.",
            "Contribuí a un artículo de investigación sobre reconocimiento de imágenes publicado en una revista revisada por pares.",
          ],
        },
      ],
      education: [
        { institution: "University of Technology", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Image Processing Specialist", issuer: "International Association of Image Processing", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico en Procesamiento de Imágenes en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas, y logros cuantificables en el campo." },
      { question: "¿Cómo destacar mi currículum de Científico en Procesamiento de Imágenes?", answer: "Enfocarse en logros específicos y utilizar palabras clave relacionadas con el campo." },
      { question: "¿Qué habilidades necesita un Científico en Procesamiento de Imágenes?", answer: "Habilidades clave incluyen aprendizaje automático, visión por computadora, y desarrollo de algoritmos." },
    ],
  },
  "laboratory-assistant": {
    slug: "asistente-de-laboratorio",
    title: "Asistente de Laboratorio",
    keywords: ["currículum de asistente de laboratorio", "CV de asistente de laboratorio", "ejemplo currículum asistente de laboratorio", "plantilla CV asistente de laboratorio"],
    searchIntents: ["cómo escribir currículum de asistente de laboratorio", "ejemplos currículum asistente de laboratorio", "mejor formato CV asistente de laboratorio"],
    topSkills: ["Preparación de Muestras", "Análisis de Datos", "Mantenimiento de Equipos de Laboratorio", "Control de Calidad", "Manejo de Químicos", "Mantenimiento de Registros", "Protocolos de Seguridad", "Colaboración en Equipo", "Resolución de Problemas", "Redacción Técnica"],
    atsKeywords: ["asistente de laboratorio", "análisis de muestras", "gestión de datos", "seguridad química", "aseguramiento de calidad", "calibración de equipos", "apoyo a la investigación", "procedimientos de prueba", "documentación", "técnicas de laboratorio", "trabajo en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Asistente de Laboratorio",
      summary: "Asistente de Laboratorio dedicado con más de 5 años de experiencia en preparación de muestras y análisis de datos, contribuyendo a un aumento del 30% en la eficiencia del laboratorio a través de procesos optimizados.",
      skills: ["Preparación de Muestras", "Análisis de Datos", "Mantenimiento de Equipos de Laboratorio", "Control de Calidad", "Manejo de Químicos", "Mantenimiento de Registros", "Protocolos de Seguridad", "Colaboración en Equipo", "Resolución de Problemas", "Redacción Técnica"],
      experience: [
        {
          title: "Asistente de Laboratorio Senior",
          company: "Biogen",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Mejoró el tiempo de procesamiento de muestras en un 25%, reduciendo el rezago.",
            "Asistió en la investigación que llevó a una publicación en una revista revisada por pares.",
            "Capacitó a 5 nuevos miembros del personal en los protocolos de laboratorio.",
          ],
        },
        {
          title: "Asistente de Laboratorio",
          company: "Abbott Laboratories",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realizó más de 200 pruebas por semana con una tasa de precisión del 98%.",
            "Implementó un nuevo sistema de inventario que redujo el desperdicio en un 15%.",
            "Colaboró con un equipo para desarrollar nuevos procedimientos de prueba.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Biología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Laboratory Safety Certification", issuer: "National Safety Council", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Asistente de Laboratorio en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas y certificaciones aplicables." },
      { question: "¿Cómo destacar mi currículum de Asistente de Laboratorio?", answer: "Enfatice sus logros en eficiencia y precisión en pruebas, así como su capacidad para trabajar en equipo." },
      { question: "¿Qué habilidades necesita un Asistente de Laboratorio?", answer: "Las habilidades clave incluyen preparación de muestras, análisis de datos y manejo de equipos de laboratorio." },
    ],
  },
  "machine-learning-scientists": {
    slug: "cientifico-de-aprendizaje-automatico",
    title: "Científico de Aprendizaje Automático",
    keywords: ["currículum de científico de aprendizaje automático", "CV de científico de aprendizaje automático", "ejemplo currículum científico de aprendizaje automático", "plantilla CV científico de aprendizaje automático"],
    searchIntents: ["cómo escribir currículum de científico de aprendizaje automático", "ejemplos currículum científico de aprendizaje automático", "mejor formato CV científico de aprendizaje automático"],
    topSkills: ["Python", "TensorFlow", "Procesamiento de Lenguaje Natural", "Análisis de Datos", "Estadísticas", "Algoritmos de Aprendizaje Automático", "Aprendizaje Profundo", "Despliegue de Modelos", "Tecnologías de Big Data", "Visualización de Datos"],
    atsKeywords: ["aprendizaje automático", "ciencia de datos", "inteligencia artificial", "modelado predictivo", "programación", "minería de datos", "computación en la nube", "análisis estadístico", "ingeniería de características", "evaluación de modelos", "optimización de algoritmos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico de Aprendizaje Automático",
      summary: "Científico de Aprendizaje Automático con más de 5 años de experiencia en el desarrollo de modelos de aprendizaje automático y en la implementación de soluciones que mejoraron la eficiencia operativa en un 30%. Historial comprobado en la entrega de información basada en datos y soluciones innovadoras.",
      skills: ["Python", "TensorFlow", "Procesamiento de Lenguaje Natural", "Análisis de Datos", "Estadísticas", "Algoritmos de Aprendizaje Automático", "Aprendizaje Profundo", "Despliegue de Modelos", "Tecnologías de Big Data", "Visualización de Datos"],
      experience: [
        {
          title: "Científico de Aprendizaje Automático Senior",
          company: "Tech Innovations Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé un modelo predictivo que aumentó la retención de clientes en un 25%, resultando en $500,000 adicionales en ingresos.",
            "Implementé un algoritmo de aprendizaje automático que redujo el tiempo de procesamiento en un 40%, ahorrando 200 horas de trabajo anualmente.",
            "Lideré un equipo de científicos de datos para crear un sistema de recomendaciones, aumentando las ventas de productos en un 15%.",
          ],
        },
        {
          title: "Ingeniero de Aprendizaje Automático",
          company: "Data Solutions LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Creé una canalización de datos que mejoró la velocidad de recuperación de datos en un 50%.",
            "Colaboré con equipos multifuncionales para integrar modelos de aprendizaje automático en sistemas de producción.",
            "Entrené y optimicé múltiples modelos, resultando en un aumento del 10% en la precisión.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Machine Learning Specialist", issuer: "Data Science Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico de Aprendizaje Automático en su currículum?", answer: "Incluir experiencia en desarrollo de modelos, habilidades técnicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Científico de Aprendizaje Automático?", answer: "Resaltar proyectos relevantes y logros medibles para atraer la atención de los reclutadores." },
      { question: "¿Qué habilidades necesita un Científico de Aprendizaje Automático?", answer: "Habilidades en programación, estadística, y dominio de herramientas de aprendizaje automático." },
    ],
  },
  "medicinal-chemist": {
    slug: "quimico-medicinal",
    title: "Químico Medicinal",
    keywords: ["currículum de Químico Medicinal", "CV de Químico Medicinal", "ejemplo currículum Químico Medicinal", "plantilla CV Químico Medicinal"],
    searchIntents: ["cómo escribir currículum de Químico Medicinal", "ejemplos currículum Químico Medicinal", "mejor formato CV Químico Medicinal"],
    topSkills: ["Síntesis Orgánica", "Química Analítica", "Diseño de Medicamentos", "Farmacología", "Toxicología", "Espectroscopía", "Cromatografía", "Bioquímica", "Modelado Molecular", "Análisis de Datos"],
    atsKeywords: ["química medicinal", "desarrollo de medicamentos", "análisis químico", "investigación y desarrollo", "técnicas de laboratorio", "cumplimiento normativo", "química farmacéutica", "biología molecular", "ensayos clínicos", "gestión de proyectos", "colaboración en equipo"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Químico Medicinal",
      summary: "Químico Medicinal experimentado con más de 5 años en diseño y desarrollo de medicamentos, liderando con éxito proyectos que resultaron en un aumento del 30% en la eficiencia de optimización de compuestos.",
      skills: ["Síntesis Orgánica", "Química Analítica", "Diseño de Medicamentos", "Farmacología", "Toxicología", "Espectroscopía", "Cromatografía", "Bioquímica", "Modelado Molecular", "Análisis de Datos"],
      experience: [
        {
          title: "Químico Medicinal Senior",
          company: "Pfizer",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que mejoró los procesos de optimización de compuestos, resultando en una reducción del 30% en el tiempo de lanzamiento al mercado de nuevos compuestos.",
            "Desarrollé una nueva vía sintética para un candidato a medicamento clave que mejoró el rendimiento en un 25%.",
            "Colaboré con equipos interfuncionales para presentar con éxito tres solicitudes IND.",
          ],
        },
        {
          title: "Químico Medicinal",
          company: "Merck",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al descubrimiento de dos nuevos candidatos a medicamentos que avanzaron a ensayos clínicos.",
            "Implementé nuevas técnicas analíticas, mejorando el análisis de pureza de compuestos en un 40%.",
            "Presenté hallazgos en conferencias internacionales, mejorando la visibilidad de la empresa en el campo de la química medicinal.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Medicinal Chemist", issuer: "American Chemical Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un QuímicoMedicinal en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas y logros en proyectos de investigación." },
      { question: "¿Cómo destacar mi currículum de Químico Medicinal?", answer: "Enfatiza logros cuantificables y habilidades específicas del campo." },
      { question: "¿Qué habilidades necesita un Químico Medicinal?", answer: "Habilidades clave incluyen síntesis orgánica, análisis químico y diseño de medicamentos." },
    ],
  },
  "microbiology-laboratory-technician": {
    slug: "tecnico-de-laboratorio-de-microbiologia",
    title: "Técnico de Laboratorio de Microbiología",
    keywords: ["currículum de Técnico de Laboratorio de Microbiología", "CV de Técnico de Laboratorio de Microbiología", "ejemplo currículum Técnico de Laboratorio de Microbiología", "plantilla CV Técnico de Laboratorio de Microbiología"],
    searchIntents: ["cómo escribir currículum de Técnico de Laboratorio de Microbiología", "ejemplos currículum Técnico de Laboratorio de Microbiología", "mejor formato CV Técnico de Laboratorio de Microbiología"],
    topSkills: ["Microscopía", "Técnicas de Cultivo Bacteriano", "Métodos de Esterilización", "PCR (Reacción en Cadena de la Polimerasa)", "Control de Calidad", "Análisis de Datos", "Protocolos de Seguridad en el Laboratorio", "Documentación e Informes", "Identificación Microbiana", "Colaboración en Equipo"],
    atsKeywords: ["Microbiología", "Técnico de Laboratorio", "Bioseguridad", "Pruebas de Patógenos", "Preparación de Muestras", "Microbiología Clínica", "Investigación y Desarrollo", "Análisis Microbiano", "Equipos de Laboratorio", "Cumplimiento Normativo", "Aseguramiento de Calidad"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Técnico de Laboratorio de Microbiología",
      summary: "Técnico de Laboratorio de Microbiología dedicado con más de 5 años de experiencia en entornos clínicos e investigativos, logrando un aumento del 30% en la productividad del laboratorio a través de mejoras en los procesos.",
      skills: ["Microscopía", "Técnicas de Cultivo Bacteriano", "Métodos de Esterilización", "PCR (Reacción en Cadena de la Polimerasa)", "Control de Calidad", "Análisis de Datos", "Protocolos de Seguridad en el Laboratorio", "Documentación e Informes", "Identificación Microbiana", "Colaboración en Equipo"],
      experience: [
        {
          title: "Técnico de Laboratorio de Microbiología Senior",
          company: "BioLab Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia del laboratorio en un 25% implementando un nuevo sistema de flujo de trabajo.",
            "Lideré un equipo que redujo las tasas de contaminación de muestras en un 15%.",
            "Desarrollé y validé 5 nuevos protocolos de prueba que mejoraron la precisión.",
          ],
        },
        {
          title: "Técnico de Laboratorio de Microbiología",
          company: "HealthTech Labs",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 1,000 pruebas microbianas con una tasa de precisión del 98%.",
            "Optimicé los procesos de entrada de datos, reduciendo el tiempo de respuesta en un 20%.",
            "Capacité a 10 nuevos miembros del personal en procedimientos de laboratorio y seguridad.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "Licenciatura", field: "Microbiología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Microbiology Technician", issuer: "National Association of Laboratory Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Técnico de Laboratorio de Microbiología en su currículum?", answer: "Incluya su experiencia laboral relevante, habilidades técnicas y logros específicos que demuestren su capacidad en el campo." },
      { question: "¿Cómo destacar mi currículum de Técnico de Laboratorio de Microbiología?", answer: "Enfatice sus logros cuantificables y habilidades clave que son relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Técnico de Laboratorio de Microbiología?", answer: "Habilidades clave incluyen microscopía, cultivo bacteriano, control de calidad y análisis de datos." },
    ],
  },
  "molecular-scientist": {
    slug: "curriculum-cientifico-molecular",
    title: "Currículum de Científico Molecular",
    keywords: ["currículum de científico molecular", "CV de científico molecular", "ejemplo currículum científico molecular", "plantilla CV científico molecular"],
    searchIntents: ["cómo escribir currículum de científico molecular", "ejemplos currículum científico molecular", "mejor formato CV científico molecular"],
    topSkills: ["Biología molecular", "Secuenciación genética", "Análisis de datos", "Técnicas de laboratorio", "Bioinformática", "Metodología de investigación", "Purificación de proteínas", "Técnicas de PCR", "Redacción científica", "Gestión de proyectos"],
    atsKeywords: ["biología molecular", "biotecnología", "investigación de laboratorio", "análisis de datos", "genómica", "proteómica", "ensayos clínicos", "control de calidad", "investigación científica", "colaboración", "pensamiento crítico"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Currículum de Científico Molecular",
      summary: "Científico Molecular con más de 5 años de experiencia en investigación y desarrollo genético, logrando un aumento del 30% en la eficiencia de los proyectos mediante técnicas innovadoras de análisis de datos.",
      skills: ["Biología molecular", "Secuenciación genética", "Análisis de datos", "Técnicas de laboratorio", "Bioinformática", "Metodología de investigación", "Purificación de proteínas", "Técnicas de PCR", "Redacción científica", "Gestión de proyectos"],
      experience: [
        {
          title: "Científico Molecular Senior",
          company: "Genentech",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia del proyecto en un 30% mediante un análisis de datos efectivo y procesos de laboratorio optimizados.",
            "Lideré un equipo de 5 científicos en un proyecto de investigación colaborativa que resultó en 3 artículos publicados.",
            "Desarrollé un nuevo ensayo que mejoró la sensibilidad de detección en un 25%.",
          ],
        },
        {
          title: "Científico Molecular",
          company: "Amgen",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al desarrollo de un nuevo fármaco terapéutico que avanzó a ensayos clínicos.",
            "Utilicé técnicas de secuenciación genómica para apoyar proyectos de investigación, lo que resultó en una reducción del 15% en el tiempo de respuesta.",
            "Participé en equipos multifuncionales para optimizar protocolos de laboratorio.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Biología Molecular", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Molecular Biologist", issuer: "American Society for Biochemistry and Molecular Biology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un currículum de Científico Molecular?", answer: "Un currículum de Científico Molecular debe incluir experiencia en investigación, habilidades técnicas y logros relevantes." },
      { question: "¿Cómo destacar mi currículum de Científico Molecular?", answer: "Para destacar tu currículum, resalta tus logros y utiliza palabras clave relevantes para el campo." },
      { question: "¿Qué habilidades necesita un Científico Molecular?", answer: "Un Científico Molecular necesita habilidades en biología molecular, análisis de datos y técnicas de laboratorio." },
    ],
  },
  "mri-scientist": {
    slug: "cientifico-de-rmn",
    title: "Científico de RMN",
    keywords: ["currículum de científico de RMN", "CV de científico de RMN", "ejemplo currículum científico de RMN", "plantilla CV científico de RMN"],
    searchIntents: ["cómo escribir currículum de científico de RMN", "ejemplos currículum científico de RMN", "mejor formato CV científico de RMN"],
    topSkills: ["Imágenes por Resonancia Magnética", "Análisis de Datos", "Investigación Clínica", "Radiología", "Seguridad del Paciente", "Procesamiento de Imágenes", "Resolución de Problemas Técnicos", "Aseguramiento de Calidad", "Cumplimiento Regulatorio", "Colaboración en Equipo"],
    atsKeywords: ["RMN", "técnico de RMN", "imágenes médicas", "tecnología radiológica", "ensayos clínicos", "análisis de imágenes", "cuidado del paciente", "seguridad radiológica", "gestión de datos", "metodología de investigación", "redacción científica"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico de RMN",
      summary: "Científico de RMN con más de 5 años de experiencia en técnicas avanzadas de imágenes e investigación clínica. Mejoró con éxito la calidad de las imágenes en un 30% a través de metodologías innovadoras.",
      skills: ["Imágenes por Resonancia Magnética", "Análisis de Datos", "Investigación Clínica", "Radiología", "Seguridad del Paciente", "Procesamiento de Imágenes", "Resolución de Problemas Técnicos", "Aseguramiento de Calidad", "Cumplimiento Regulatorio", "Colaboración en Equipo"],
      experience: [
        {
          title: "Científico Senior de RMN",
          company: "Radiant Imaging Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó la eficiencia de la imagen en un 25% mediante la implementación de nuevos protocolos de software.",
            "Lideró un equipo que publicó 3 artículos revisados por pares en el último año.",
            "Redujo los tiempos de espera de los pacientes en un 15% al optimizar los procesos de programación.",
          ],
        },
        {
          title: "Científico de Investigación de RMN",
          company: "Innovative Imaging Technologies",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló una técnica de imagen novedosa que mejoró la precisión diagnóstica en un 20%.",
            "Colaboró en un equipo multidisciplinario para asegurar $500,000 en financiamiento de investigación.",
            "Realizó más de 100 ensayos clínicos, contribuyendo a avances significativos en el cuidado del paciente.",
          ],
        },
      ],
      education: [
        { institution: "University of Medical Sciences", degree: "B.S.", field: "Tecnología Radiológica", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified MRI Technologist", issuer: "American Registry of Radiologic Technologists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un científico de RMN en su currículum?", answer: "Un científico de RMN debe incluir su experiencia en técnicas de imagen, habilidades en análisis de datos y contribuciones a investigaciones clínicas." },
      { question: "¿Cómo destacar mi currículum de científico de RMN?", answer: "Enfatiza tus logros cuantificables y tu experiencia en proyectos relevantes, así como tus habilidades técnicas específicas." },
      { question: "¿Qué habilidades necesita un científico de RMN?", answer: "Un científico de RMN necesita habilidades en imágenes por resonancia magnética, análisis de datos, investigación clínica y colaboración en equipo." },
    ],
  },
  "natural-scientist": {
    slug: "cientifico-natural",
    title: "Científico Natural",
    keywords: ["currículum de Científico Natural", "CV de Científico Natural", "ejemplo currículum Científico Natural", "plantilla CV Científico Natural"],
    searchIntents: ["cómo escribir currículum de Científico Natural", "ejemplos currículum Científico Natural", "mejor formato CV Científico Natural"],
    topSkills: ["análisis de datos", "investigación de campo", "modelado estadístico", "evaluación ambiental", "técnicas de laboratorio", "gestión de proyectos", "redacción científica", "resolución de problemas", "colaboración en equipo", "pensamiento crítico"],
    atsKeywords: ["metodologías de investigación", "recolección de datos", "ciencia ambiental", "bioestadística", "ecología", "análisis geoespacial", "pruebas de hipótesis", "cumplimiento regulatorio", "redacción de propuestas", "habilidades de presentación", "trabajo en equipo interdisciplinario"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Natural",
      summary: "Científico Natural con más de 5 años de experiencia en investigación ambiental y análisis de datos, logrando un aumento del 30% en la eficiencia de los proyectos a través de metodologías innovadoras.",
      skills: ["análisis de datos", "investigación de campo", "modelado estadístico", "evaluación ambiental", "técnicas de laboratorio", "gestión de proyectos", "redacción científica", "resolución de problemas", "colaboración en equipo", "pensamiento crítico"],
      experience: [
        {
          title: "Científico Ambiental Senior",
          company: "EcoTech Solutions",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que redujo los costos de eliminación de residuos en un 25% anualmente.",
            "Gestioné un equipo de 5 científicos para realizar un estudio integral de biodiversidad que impactó en la política local.",
            "Implementé nuevas técnicas de recolección de datos que aumentaron la precisión en un 40%.",
          ],
        },
        {
          title: "Científico Ambiental",
          company: "Green Earth Research",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 50 estudios de campo evaluando la calidad del agua.",
            "Desarrollé una metodología que mejoró el tiempo de procesamiento de datos en un 20%.",
            "Contribuí a una publicación en una revista revisada por pares sobre los efectos del cambio climático.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencia Ambiental", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Environmental Scientist", issuer: "National Association of Environmental Professionals", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Natural en su currículum?", answer: "Un Científico Natural debe incluir su experiencia en investigación, habilidades técnicas, proyectos relevantes y publicaciones." },
      { question: "¿Cómo destacar mi currículum de Científico Natural?", answer: "Destaca tus logros cuantificables, utiliza palabras clave de la industria y personaliza tu currículum para cada solicitud." },
      { question: "¿Qué habilidades necesita un Científico Natural?", answer: "Las habilidades clave incluyen análisis de datos, investigación de campo, modelado estadístico y trabajo en equipo." },
    ],
  },
  "nature-scientist": {
    slug: "cientifico-de-naturaleza",
    title: "Científico de Naturaleza",
    keywords: ["currículum de científico de naturaleza", "CV de científico de naturaleza", "ejemplo currículum científico de naturaleza", "plantilla CV científico de naturaleza"],
    searchIntents: ["cómo escribir currículum de científico de naturaleza", "ejemplos currículum científico de naturaleza", "mejor formato CV científico de naturaleza"],
    topSkills: ["Investigación Ecológica", "Análisis de Datos", "Muestreo de Campo", "Evaluación de Impacto Ambiental", "Identificación de Especies", "Modelado Estadístico", "Mapeo GIS", "Gestión de Proyectos", "Técnicas de Laboratorio", "Redacción de Informes"],
    atsKeywords: ["biodiversidad", "ecosistema", "conservación", "trabajo de campo", "investigación", "análisis", "recolección de datos", "ciencia ambiental", "restauración de hábitats", "sostenibilidad", "gestión de vida silvestre"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico de Naturaleza",
      summary: "Científico de Naturaleza dedicado con más de 7 años de experiencia en investigación ecológica y conservación ambiental, liderando proyectos que mejoraron los índices de biodiversidad en un 25%.",
      skills: ["Investigación Ecológica", "Análisis de Datos", "Muestreo de Campo", "Evaluación de Impacto Ambiental", "Identificación de Especies", "Modelado Estadístico", "Mapeo GIS", "Gestión de Proyectos", "Técnicas de Laboratorio", "Redacción de Informes"],
      experience: [
        {
          title: "Científico de Naturaleza Senior",
          company: "Green Earth Research Institute",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que aumentó la biodiversidad local en un 30% a través de esfuerzos de restauración de hábitats.",
            "Publiqué 5 artículos revisados por pares sobre los impactos ecológicos del cambio climático.",
            "Aseguré $150,000 en financiamiento por subvenciones para investigación ambiental en curso.",
          ],
        },
        {
          title: "Científico de Naturaleza",
          company: "Wildlife Conservation Society",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé estudios de campo que informaron cambios de políticas que afectan áreas de conservación.",
            "Desarrollé un programa de monitoreo que mejoró la precisión de seguimiento de especies en un 40%.",
            "Colaboré con comunidades locales para aumentar la conciencia y prácticas de conservación.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Ciencias Ambientales", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Ecologist", issuer: "Ecological Society of America", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico de Naturaleza en su currículum?", answer: "Un Científico de Naturaleza debe incluir su experiencia en investigación, habilidades técnicas, y logros relevantes en conservación y biodiversidad." },
      { question: "¿Cómo destacar mi currículum de Científico de Naturaleza?", answer: "Destacar su experiencia en proyectos exitosos y habilidades técnicas específicas puede hacer que su currículum se destaque." },
      { question: "¿Qué habilidades necesita un Científico de Naturaleza?", answer: "Un Científico de Naturaleza necesita habilidades en investigación ecológica, análisis de datos, y técnicas de muestreo de campo, entre otras." },
    ],
  },
  "pharmaceutical-chemist": {
    slug: "quimico-farmaceutico",
    title: "Químico Farmacéutico",
    keywords: ["currículum de Químico Farmacéutico", "CV de Químico Farmacéutico", "ejemplo currículum Químico Farmacéutico", "plantilla CV Químico Farmacéutico"],
    searchIntents: ["cómo escribir currículum de Químico Farmacéutico", "ejemplos currículum Químico Farmacéutico", "mejor formato CV Químico Farmacéutico"],
    topSkills: ["Química Analítica", "HPLC", "Espectrometría de masas", "Desarrollo de formulaciones", "Control de calidad", "Asuntos regulatorios", "Farmacocinética", "Síntesis", "Análisis de datos", "Técnicas de laboratorio"],
    atsKeywords: ["farmacéutico", "químico", "HPLC", "espectrometría de masas", "formulación", "control de calidad", "regulatorio", "síntesis", "análisis de datos", "química analítica", "laboratorio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Químico Farmacéutico",
      summary: "Químico Farmacéutico dedicado con más de 5 años de experiencia en formulación y análisis de medicamentos, logrando un aumento del 20% en el rendimiento del producto y mejorando los estándares de calidad.",
      skills: ["Química Analítica", "HPLC", "Espectrometría de masas", "Desarrollo de formulaciones", "Control de calidad", "Asuntos regulatorios", "Farmacocinética", "Síntesis", "Análisis de datos", "Técnicas de laboratorio"],
      experience: [
        {
          title: "Químico Farmacéutico Senior",
          company: "Pfizer",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumentó el rendimiento del producto en un 20% mediante técnicas de formulación optimizadas",
            "Redujo el tiempo de análisis en un 30% con la implementación de nuevos métodos de HPLC",
            "Lideró un proyecto que resultó en un ahorro de costos de $500,000 para la empresa",
          ],
        },
        {
          title: "Químico Farmacéutico",
          company: "Merck",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desarrolló y validó métodos analíticos para más de 10 nuevos candidatos a medicamentos",
            "Colaboró con equipos interdisciplinarios para asegurar el cumplimiento de las regulaciones de la FDA",
            "Mejoró la eficiencia del laboratorio implementando nuevos sistemas de gestión de datos",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmaceutical Scientist", issuer: "American Association of Pharmaceutical Scientists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Químico Farmacéutico en su currículum?", answer: "Incluya su experiencia en formulación y análisis, habilidades técnicas y logros cuantificables." },
      { question: "¿Cómo destacar mi currículum de Químico Farmacéutico?", answer: "Enfatice sus logros medibles y habilidades técnicas relevantes para el puesto." },
      { question: "¿Qué habilidades necesita un Químico Farmacéutico?", answer: "Habilidades clave incluyen química analítica, HPLC, control de calidad y regulación sanitaria." },
    ],
  },
  "process-chemist": {
    slug: "quimico-de-procesos",
    title: "Químico de Procesos",
    keywords: ["currículum de químico de procesos", "CV de químico de procesos", "ejemplo currículum químico de procesos", "plantilla CV químico de procesos"],
    searchIntents: ["cómo escribir currículum de químico de procesos", "ejemplos currículum químico de procesos", "mejor formato CV químico de procesos"],
    topSkills: ["Ingeniería de Procesos Químicos", "Optimización de Procesos", "Control de Calidad", "Análisis de Datos", "Gestión de Proyectos", "Cumplimiento de Seguridad", "Investigación y Desarrollo", "Asuntos Regulatorios", "Control Estadístico de Procesos", "Documentación Técnica"],
    atsKeywords: ["Desarrollo de Procesos", "Manufactura Química", "Diseño de Procesos", "Resolución de Problemas", "Técnicas de Laboratorio", "Mejora Continua", "Métricas de Rendimiento", "Colaboración Interfuncional", "Diseño Experimental", "Química Analítica", "Manufactura Esbelta"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Químico de Procesos",
      summary: "Químico de Procesos con más de 5 años de experiencia en el desarrollo y optimización de procesos químicos, logrando una reducción del 20% en costos de producción mediante técnicas innovadoras.",
      skills: ["Ingeniería de Procesos Químicos", "Optimización de Procesos", "Control de Calidad", "Análisis de Datos", "Gestión de Proyectos", "Cumplimiento de Seguridad", "Investigación y Desarrollo", "Asuntos Regulatorios", "Control Estadístico de Procesos", "Documentación Técnica"],
      experience: [
        {
          title: "Químico de Procesos Senior",
          company: "ABC Chemicals",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Reducción de costos de producción en un 20% mediante una optimización de procesos eficiente.",
            "Lideré un equipo en la exitosa escalada de una nueva línea de productos, resultando en $500K en ingresos anuales.",
            "Implementé un sistema de control de calidad que disminuyó los defectos del producto en un 15%.",
          ],
        },
        {
          title: "Químico de Procesos",
          company: "XYZ Industries",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Agilicé los procesos de laboratorio, mejorando el tiempo de respuesta en un 30%.",
            "Realicé experimentos que llevaron a una nueva patente para una formulación química.",
            "Colaboré con equipos interfuncionales para mejorar la consistencia del producto.",
          ],
        },
      ],
      education: [
        { institution: "University of Chemical Engineering", degree: "B.S.", field: "Ingeniería Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Chemical Engineer", issuer: "National Association of Chemical Engineers", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Químico de Procesos en su currículum?", answer: "Debería incluir experiencia en ingeniería de procesos, optimización, y control de calidad." },
      { question: "¿Cómo destacar mi currículum de Químico de Procesos?", answer: "Enfatiza logros cuantificables y habilidades técnicas relevantes." },
      { question: "¿Qué habilidades necesita un Químico de Procesos?", answer: "Habilidades clave incluyen la ingeniería de procesos, análisis de datos y trabajo en equipo." },
    ],
  },
  "research-and-development-polymer-scientist": {
    slug: "cientifico-de-polimeros-investigacion-y-desarrollo",
    title: "Científico de Polímeros en Investigación y Desarrollo",
    keywords: ["currículum de científico de polímeros", "CV de científico de polímeros", "ejemplo currículum científico de polímeros", "plantilla CV científico de polímeros"],
    searchIntents: ["cómo escribir currículum de científico de polímeros", "ejemplos currículum científico de polímeros", "mejor formato CV científico de polímeros"],
    topSkills: ["síntesis de polímeros", "caracterización de materiales", "química analítica", "análisis térmico", "reología", "espectroscopía", "optimización de procesos", "gestión de proyectos", "análisis de datos", "redacción técnica"],
    atsKeywords: ["ciencia de polímeros", "I+D", "desarrollo de materiales", "innovación", "gestión de laboratorio", "diseño experimental", "análisis estadístico", "redacción de patentes", "desarrollo de productos", "sostenibilidad", "materiales compuestos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico de Polímeros en Investigación y Desarrollo",
      summary: "Científico de Polímeros orientado a resultados con más de 5 años de experiencia en investigación y desarrollo, especializado en síntesis y caracterización de polímeros, lo que llevó a un aumento del 30% en la eficiencia del laboratorio.",
      skills: ["síntesis de polímeros", "caracterización de materiales", "química analítica", "análisis térmico", "reología", "espectroscopía", "optimización de procesos", "gestión de proyectos", "análisis de datos", "redacción técnica"],
      experience: [
        {
          title: "Científico Senior de Polímeros",
          company: "Advanced Materials Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un proyecto que resultó en una reducción del 25% en los costos de producción a través de la optimización de materiales.",
            "Desarrollé una nueva mezcla de polímero que mejoró la durabilidad del producto en un 40%.",
            "Publiqué 3 artículos revisados por pares en revistas reconocidas, mejorando la credibilidad de investigación de la empresa.",
          ],
        },
        {
          title: "Científico de Polímeros",
          company: "Innovative Polymers LLC",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé una investigación extensa que aumentó el rendimiento del material en un 20%.",
            "Colaboré con equipos multifuncionales para lanzar con éxito 2 nuevos productos.",
            "Agilicé los procesos del laboratorio, mejorando el tiempo de respuesta en un 15%.",
          ],
        },
      ],
      education: [
        { institution: "Massachusetts Institute of Technology", degree: "B.S.", field: "Ingeniería Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Polymer Scientist", issuer: "American Chemical Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico de Polímeros en Investigación y Desarrollo en su currículum?", answer: "Incluya su experiencia en síntesis y caracterización de polímeros, junto con logros cuantificables en proyectos de I+D." },
      { question: "¿Cómo destacar mi currículum de Científico de Polímeros en Investigación y Desarrollo?", answer: "Enfatice sus habilidades técnicas, publicaciones y resultados alcanzados en proyectos anteriores." },
      { question: "¿Qué habilidades necesita un Científico de Polímeros en Investigación y Desarrollo?", answer: "Las habilidades clave incluyen síntesis de polímeros, análisis de materiales, gestión de proyectos y redacción técnica." },
    ],
  },
  "research-chemist": {
    slug: "quimico-investigador",
    title: "Químico Investigador",
    keywords: ["currículum de Químico Investigador", "CV de Químico Investigador", "ejemplo currículum Químico Investigador", "plantilla CV Químico Investigador"],
    searchIntents: ["cómo escribir currículum de Químico Investigador", "ejemplos currículum Químico Investigador", "mejor formato CV Químico Investigador"],
    topSkills: ["Química Analítica", "Síntesis Orgánica", "Espectroscopia", "Cromatografía", "Análisis de Datos", "Técnicas de Laboratorio", "Seguridad Química", "Metodología de Investigación", "Resolución de Problemas", "Redacción Técnica"],
    atsKeywords: ["Químico Investigador", "Técnicas Analíticas", "Gestión de Laboratorio", "Análisis Químico", "Desarrollo de Investigación", "Gestión de Proyectos", "Cumplimiento de Seguridad", "Asuntos Regulatorios", "Diseño Experimental", "Control de Calidad", "Interpretación de Datos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Químico Investigador",
      summary: "Químico Investigador con más de 5 años de experiencia en el campo, especializado en síntesis orgánica y métodos analíticos, con un historial comprobado de aumento de la eficiencia del laboratorio en un 30%.",
      skills: ["Química Analítica", "Síntesis Orgánica", "Espectroscopia", "Cromatografía", "Análisis de Datos", "Técnicas de Laboratorio", "Seguridad Química", "Metodología de Investigación", "Resolución de Problemas", "Redacción Técnica"],
      experience: [
        {
          title: "Químico Investigador Senior",
          company: "Dow Chemical Company",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Dirigí un proyecto que resultó en una reducción del 25% en los costos de producción mediante la optimización de procesos.",
            "Desarrollé un compuesto novedoso que aumentó el rendimiento del producto en un 15%.",
            "Publiqué 3 artículos de investigación en revistas revisadas por pares con un impacto significativo en el campo.",
          ],
        },
        {
          title: "Químico Investigador",
          company: "BASF Corporation",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé nuevas técnicas analíticas que mejoraron la precisión de los datos en un 20%.",
            "Colaboré con equipos multifuncionales para desarrollar 5 nuevas líneas de productos.",
            "Capacité a químicos junior sobre las mejores prácticas de laboratorio y protocolos de seguridad.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Chemical Technician", issuer: "American Chemical Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Químico Investigador en su currículum?", answer: "Debe incluir experiencia relevante, habilidades técnicas y logros significativos en investigación." },
      { question: "¿Cómo destacar mi currículum de Químico Investigador?", answer: "Enfócate en tus logros y proyectos exitosos, y personaliza tu currículum para cada posición." },
      { question: "¿Qué habilidades necesita un Químico Investigador?", answer: "Habilidades en análisis químico, técnicas de laboratorio, y capacidad para resolver problemas de manera efectiva." },
    ],
  },
  "research-microbiologist": {
    slug: "microbiologo-de-investigacion",
    title: "Microbiologo de Investigación",
    keywords: ["currículum de Microbiologo de Investigación", "CV de Microbiologo de Investigación", "ejemplo currículum Microbiologo de Investigación", "plantilla CV Microbiologo de Investigación"],
    searchIntents: ["cómo escribir currículum de Microbiologo de Investigación", "ejemplos currículum Microbiologo de Investigación", "mejor formato CV Microbiologo de Investigación"],
    topSkills: ["Técnicas de Cultivo Microbiano", "Biología Molecular", "Análisis de Datos", "Gestión de Laboratorio", "PCR y Electroforesis en Gel", "Pruebas de Sensibilidad a Antibióticos", "Software Estadístico (por ejemplo, SPSS, R)", "Diseño de Investigación", "Redacción Científica", "Gestión de Proyectos"],
    atsKeywords: ["microbiología", "investigación", "laboratorio", "ensayos clínicos", "análisis de datos", "cultivo bacteriano", "control de infecciones", "aseguramiento de calidad", "bioestadística", "técnicas moleculares", "resistencia antimicrobiana"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Microbiologo de Investigación",
      summary: "Microbiologo de Investigación dedicado con más de 5 años de experiencia en entornos de laboratorio, especializado en investigación sobre resistencia a antibióticos. Líder de proyectos que resultaron en un aumento del 30% en la precisión de los datos y una reducción del 15% en los costos de investigación.",
      skills: ["Técnicas de Cultivo Microbiano", "Biología Molecular", "Análisis de Datos", "Gestión de Laboratorio", "PCR y Electroforesis en Gel", "Pruebas de Sensibilidad a Antibióticos", "Software Estadístico (por ejemplo, SPSS, R)", "Diseño de Investigación", "Redacción Científica", "Gestión de Proyectos"],
      experience: [
        {
          title: "Microbiologo de Investigación Senior",
          company: "Genentech",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Aumenté la eficiencia de los procesos de prueba microbiana en un 25%, lo que resultó en una finalización más rápida de los proyectos.",
            "Autor de 3 publicaciones revisadas por pares en revistas de alto impacto, mejorando la reputación del laboratorio.",
            "Desarrollé un nuevo método para analizar la resistencia a antibióticos, llevando a una mejora del 20% en la precisión.",
          ],
        },
        {
          title: "Microbiologo de Investigación",
          company: "Merck",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí a un proyecto importante que redujo la incidencia de infecciones bacterianas en entornos clínicos en un 10%.",
            "Implementé medidas de control de calidad que disminuyeron las tasas de error en los resultados de laboratorio en un 15%.",
            "Participé en equipos multifuncionales para desarrollar nuevos protocolos de prueba microbiológica.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Microbiología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Microbiologist", issuer: "American Society for Microbiology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Microbiologo de Investigación en su currículum?", answer: "Incluir experiencia laboral relevante, habilidades técnicas, educación y certificaciones." },
      { question: "¿Cómo destacar mi currículum de Microbiologo de Investigación?", answer: "Resaltar logros cuantificables y habilidades específicas en microbiología." },
      { question: "¿Qué habilidades necesita un Microbiologo de Investigación?", answer: "Conocimientos en biología molecular, técnicas de cultivo, análisis de datos y gestión de proyectos." },
    ],
  },
  "research-scientist-computer-vision": {
    slug: "cientifico-investigador-vision-computacional",
    title: "Científico Investigador en Visión Computacional",
    keywords: ["currículum de científico investigador en visión computacional", "CV de científico investigador en visión computacional", "ejemplo currículum científico investigador en visión computacional", "plantilla CV científico investigador en visión computacional"],
    searchIntents: ["cómo escribir currículum de científico investigador en visión computacional", "ejemplos currículum científico investigador en visión computacional", "mejor formato CV científico investigador en visión computacional"],
    topSkills: ["Aprendizaje Profundo", "Procesamiento de Imágenes", "Aprendizaje Automático", "Algoritmos de Visión Computacional", "Análisis de Datos", "Programación en Python", "TensorFlow", "OpenCV", "Modelado Estadístico", "Metodologías de Investigación"],
    atsKeywords: ["visión computacional", "reconocimiento de imágenes", "redes neuronales", "investigación en IA", "ciencia de datos", "desarrollo de algoritmos", "Python", "aprendizaje automático", "marcos de aprendizaje profundo", "diseño experimental", "análisis estadístico"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Investigador en Visión Computacional",
      summary: "Científico Investigador con más de 5 años de experiencia en Visión Computacional, especializado en el desarrollo de algoritmos que mejoraron la precisión de clasificación de imágenes en un 30%. Historial comprobado de liderazgo en proyectos innovadores que resultaron en una reducción del 20% en el tiempo de procesamiento.",
      skills: ["Aprendizaje Profundo", "Procesamiento de Imágenes", "Aprendizaje Automático", "Algoritmos de Visión Computacional", "Análisis de Datos", "Programación en Python", "TensorFlow", "OpenCV", "Modelado Estadístico", "Metodologías de Investigación"],
      experience: [
        {
          title: "Científico Investigador Senior",
          company: "TechVision Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto que mejoró la precisión de reconocimiento de imágenes en un 30%, resultando en un aumento de $500,000 en los ingresos anuales.",
            "Desarrollé un modelo de aprendizaje automático que redujo el tiempo de procesamiento en un 20%, mejorando significativamente la eficiencia del equipo.",
            "Publiqué 5 artículos de investigación en revistas de alto nivel, contribuyendo al avance de la tecnología de visión computacional.",
          ],
        },
        {
          title: "Científico Investigador",
          company: "Visionary Labs",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé un algoritmo de visión computacional novedoso que mejoró las tasas de detección de objetos en un 25%.",
            "Colaboré con equipos multifuncionales para integrar soluciones de IA en productos existentes, mejorando la experiencia del usuario.",
            "Presenté hallazgos en conferencias internacionales, aumentando la visibilidad de la empresa en la comunidad de investigación.",
          ],
        },
      ],
      education: [
        { institution: "Stanford University", degree: "B.S.", field: "Ciencias de la Computación", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Deep Learning Specialization", issuer: "Coursera", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Investigador en Visión Computacional en su currículum?", answer: "Debe incluir su experiencia en proyectos, habilidades técnicas relevantes y publicaciones en revistas científicas." },
      { question: "¿Cómo destacar mi currículum de Científico Investigador en Visión Computacional?", answer: "Enfatiza tus logros cuantificables y proyectos innovadores en el campo." },
      { question: "¿Qué habilidades necesita un Científico Investigador en Visión Computacional?", answer: "Habilidades clave incluyen el aprendizaje profundo, procesamiento de imágenes y desarrollo de algoritmos." },
    ],
  },
  "research-scientist-in-microbiology": {
    slug: "cientifico-investigador-en-microbiologia",
    title: "Científico Investigador en Microbiología",
    keywords: ["currículum de científico investigador", "CV de científico investigador", "ejemplo currículum científico", "plantilla CV científico"],
    searchIntents: ["cómo escribir currículum de científico investigador", "ejemplos currículum científico", "mejor formato CV científico"],
    topSkills: ["Biología Molecular", "Genética Microbiana", "Biotecnología", "Técnicas de Laboratorio", "Análisis de Datos", "Metodología de Investigación", "Bioinformática", "Microbiología Clínica", "Diseño Experimental", "Análisis Estadístico"],
    atsKeywords: ["Microbiología", "Científico Investigador", "Habilidades de Laboratorio", "Investigación Científica", "Interpretación de Datos", "Redacción Técnica", "Control de Calidad", "Gestión de Proyectos", "Resolución de Problemas", "Colaboración en Equipo", "Cumplimiento Regulatorio"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Investigador en Microbiología",
      summary: "Científico Investigador dedicado con más de 5 años de experiencia en investigación microbiológica, especializado en genética microbiana y biotecnología. Ha liderado proyectos que resultaron en un aumento del 30% en la eficiencia de los procesos de laboratorio.",
      skills: ["Biología Molecular", "Genética Microbiana", "Biotecnología", "Técnicas de Laboratorio", "Análisis de Datos", "Metodología de Investigación", "Bioinformática", "Microbiología Clínica", "Diseño Experimental", "Análisis Estadístico"],
      experience: [
        {
          title: "Microbiólogo Senior",
          company: "Genomic Solutions Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé un nuevo método de prueba de antibióticos que mejoró la precisión en un 25%",
            "Lideré un equipo de 5 en un proyecto que resultó en una subvención de $200,000 para investigación",
            "Publiqué 3 artículos revisados por pares en revistas líderes de microbiología",
          ],
        },
        {
          title: "Microbiólogo",
          company: "BioTech Labs",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Implementé nuevos protocolos de laboratorio que redujeron las tasas de contaminación en un 15%",
            "Realicé más de 100 experimentos que resultaron en hallazgos significativos publicados en 2 revistas",
            "Colaboré con equipos multifuncionales para desarrollar 2 nuevos productos",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Microbiología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Microbiologist", issuer: "American Society for Microbiology", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Investigador en Microbiología en su currículum?", answer: "Incluir experiencia relevante, habilidades técnicas y logros específicos en investigación." },
      { question: "¿Cómo destacar mi currículum de Científico Investigador en Microbiología?", answer: "Enfocarse en logros cuantificables y habilidades específicas de la industria." },
      { question: "¿Qué habilidades necesita un Científico Investigador en Microbiología?", answer: "Habilidades clave incluyen técnicas de laboratorio, análisis de datos y metodologías de investigación." },
    ],
  },
  "senior-scientist-medicinal-chemistry": {
    slug: "cientifico-senior-quimica-medicinal",
    title: "Científico Senior en Química Medicinal",
    keywords: ["currículum de Científico Senior en Química Medicinal", "CV de Científico Senior en Química Medicinal", "ejemplo currículum Científico Senior en Química Medicinal", "plantilla CV Científico Senior en Química Medicinal"],
    searchIntents: ["cómo escribir currículum de Científico Senior en Química Medicinal", "ejemplos currículum Científico Senior en Química Medicinal", "mejor formato CV Científico Senior en Química Medicinal"],
    topSkills: ["Química Medicinal", "Diseño de Medicamentos", "Relación Estructura-Actividad (SAR)", "Química Orgánica Sintética", "Química Analítica", "Farmacología", "Gestión de Proyectos", "Análisis de Datos", "Investigación Colaborativa", "Redacción Científica"],
    atsKeywords: ["química medicinal", "descubrimiento de medicamentos", "cribado de alto rendimiento", "optimización de liderazgos", "síntesis química", "desarrollo farmacéutico", "pruebas de toxicidad", "cumplimiento regulatorio", "metodologías de investigación", "liderazgo de equipo", "ensayos biológicos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Senior en Química Medicinal",
      summary: "Científico Senior con más de 8 años de experiencia en química medicinal y un historial comprobado de avances en proyectos de descubrimiento de medicamentos, logrando un aumento del 30% en las tasas de éxito de candidatos líderes.",
      skills: ["Química Medicinal", "Diseño de Medicamentos", "Relación Estructura-Actividad (SAR)", "Química Orgánica Sintética", "Química Analítica", "Farmacología", "Gestión de Proyectos", "Análisis de Datos", "Investigación Colaborativa", "Redacción Científica"],
      experience: [
        {
          title: "Científico Senior",
          company: "Pfizer",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un equipo que optimizó compuestos líderes, lo que resultó en una reducción del 40% en el tiempo para ensayos preclínicos.",
            "Desarrollé nuevas rutas sintéticas que mejoraron el rendimiento en un 25% en comparación con métodos anteriores.",
            "Contribuí a la exitosa presentación de una solicitud IND, permitiendo la progresión de un nuevo candidato a medicamento.",
          ],
        },
        {
          title: "Científico",
          company: "Merck",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Desempeñé un papel clave en el descubrimiento de dos candidatos a medicamentos que avanzaron a ensayos clínicos.",
            "Implementé técnicas de cribado de alto rendimiento que mejoraron la eficiencia en la evaluación de compuestos en un 35%.",
            "Colaboré con equipos multifuncionales para alinear los objetivos del proyecto, mejorando la comunicación y los plazos del proyecto.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Pharmaceutical Scientist", issuer: "American Association of Pharmaceutical Scientists", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Senior en Química Medicinal en su currículum?", answer: "Un Científico Senior en Química Medicinal debe incluir su experiencia en proyectos de investigación, habilidades técnicas, y logros relevantes en el campo." },
      { question: "¿Cómo destacar mi currículum de Científico Senior en Química Medicinal?", answer: "Para destacar su currículum, resalte sus logros clave, use palabras clave relevantes y muestre su experiencia en proyectos de éxito." },
      { question: "¿Qué habilidades necesita un Científico Senior en Química Medicinal?", answer: "Las habilidades clave incluyen química medicinal, diseño de medicamentos, gestión de proyectos y experiencia en investigación colaborativa." },
    ],
  },
  "social-scientist": {
    slug: "cientifico-social",
    title: "Científico Social",
    keywords: ["currículum de científico social", "CV de científico social", "ejemplo currículum científico social", "plantilla CV científico social"],
    searchIntents: ["cómo escribir currículum de científico social", "ejemplos currículum científico social", "mejor formato CV científico social"],
    topSkills: ["Análisis Cuantitativo", "Investigación Cualitativa", "Interpretación de Datos", "Software Estadístico", "Diseño de Encuestas", "Análisis de Políticas Sociales", "Compromiso Comunitario", "Evaluación de Programas", "Competencia Cultural", "Pensamiento Crítico"],
    atsKeywords: ["investigación social", "recolección de datos", "estudio etnográfico", "análisis estadístico", "metodología de investigación", "desarrollo de políticas", "estudios de campo", "análisis demográfico", "métodos mixtos", "investigación comunitaria", "datos cualitativos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Científico Social",
      summary: "Científico Social con más de 5 años de experiencia en la realización de investigaciones y análisis exhaustivos sobre problemas sociales, lo que ha llevado a la mejora de programas y políticas comunitarias. Historial comprobado de incrementar las tasas de respuesta de encuestas en un 30% y asegurar $200K en financiamiento para iniciativas de investigación.",
      skills: ["Análisis Cuantitativo", "Investigación Cualitativa", "Interpretación de Datos", "Software Estadístico", "Diseño de Encuestas", "Análisis de Políticas Sociales", "Compromiso Comunitario", "Evaluación de Programas", "Competencia Cultural", "Pensamiento Crítico"],
      experience: [
        {
          title: "Científico Social Senior",
          company: "Social Insights Group",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Lideré un proyecto de investigación que aumentó el compromiso comunitario en un 40%, lo que resultó en la implementación de nuevos programas sociales.",
            "Desarrollé un marco de análisis de datos que mejoró la eficiencia de informes en un 25%.",
            "Aseguré $150K en financiamiento de subvenciones para un estudio longitudinal sobre comportamientos sociales.",
          ],
        },
        {
          title: "Analista de Investigación Social",
          company: "Community Research Institute",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Realicé más de 50 entrevistas cualitativas, proporcionando información que influyó en cambios de políticas locales.",
            "Analicé datos demográficos que llevaron a una mejora del 20% en los servicios comunitarios dirigidos.",
            "Presenté hallazgos en conferencias nacionales, mejorando la reputación del instituto.",
          ],
        },
      ],
      education: [
        { institution: "State University", degree: "B.S.", field: "Sociología", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Social Researcher", issuer: "Research Certification Institute", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Científico Social en su currículum?", answer: "Incluya su experiencia en investigación, habilidades analíticas y logros significativos." },
      { question: "¿Cómo destacar mi currículum de Científico Social?", answer: "Utilice un formato claro, resalte sus logros cuantificables y adapte su currículum a la oferta laboral." },
      { question: "¿Qué habilidades necesita un Científico Social?", answer: "Necesita habilidades en análisis de datos, investigación cualitativa y cuantitativa, y competencia en software estadístico." },
    ],
  },
  "synthetic-organic-chemist": {
    slug: "quimico-organico-sintetico",
    title: "Químico Orgánico Sintético",
    keywords: ["currículum de químico orgánico sintético", "CV de químico orgánico sintético", "ejemplo currículum químico orgánico sintético", "plantilla CV químico orgánico sintético"],
    searchIntents: ["cómo escribir currículum de químico orgánico sintético", "ejemplos currículum químico orgánico sintético", "mejor formato CV químico orgánico sintético"],
    topSkills: ["Desarrollo de Métodos Sintéticos", "Técnicas Analíticas", "Espectroscopia", "Cromatografía", "Síntesis Orgánica", "Optimización de Procesos", "Seguridad Química", "Cumplimiento Regulatorio", "Gestión de Laboratorio", "Análisis de Datos"],
    atsKeywords: ["química orgánica", "síntesis", "HPLC", "RMN", "GC-MS", "ingeniería química", "investigación y desarrollo", "productos farmacéuticos", "control de calidad", "análisis químico", "gestión de proyectos"],
    sampleResumeData: buildResumeData({
      firstName: "Alex",
      lastName: "Johnson",
      profession: "Químico Orgánico Sintético",
      summary: "Químico Orgánico Sintético con más de 5 años de experiencia en el desarrollo de rutas sintéticas eficientes y la optimización de procesos químicos. Logré una reducción del 30% en los costos de producción a través de metodologías innovadoras.",
      skills: ["Desarrollo de Métodos Sintéticos", "Técnicas Analíticas", "Espectroscopia", "Cromatografía", "Síntesis Orgánica", "Optimización de Procesos", "Seguridad Química", "Cumplimiento Regulatorio", "Gestión de Laboratorio", "Análisis de Datos"],
      experience: [
        {
          title: "Químico Orgánico Sintético Senior",
          company: "Pfizer Inc.",
          startDate: "2021-03",
          isCurrent: true,
          achievements: [
            "Desarrollé una nueva ruta sintética que redujo el tiempo de producción en un 25% y aumentó el rendimiento en un 15%.",
            "Lideré un equipo de 5 químicos en un proyecto que resultó en una nueva formulación de medicamento, contribuyendo a un aumento del 10% en la participación de mercado.",
            "Implementé protocolos de seguridad que disminuyeron los accidentes en el laboratorio en un 40%.",
          ],
        },
        {
          title: "Químico Orgánico Sintético",
          company: "Merck & Co.",
          startDate: "2018-06",
          endDate: "2021-02",
          achievements: [
            "Contribuí al desarrollo de un intermedio clave para un medicamento exitoso, mejorando el proceso de producción.",
            "Racionalicé los procedimientos de laboratorio, resultando en una disminución del 20% en desechos.",
            "Colaboré con equipos multifuncionales para apoyar ensayos clínicos, asegurando el cumplimiento de los estándares regulatorios.",
          ],
        },
      ],
      education: [
        { institution: "University of California, Berkeley", degree: "B.S.", field: "Química", startDate: "2014-08", endDate: "2018-05" },
      ],
      certifications: [
        { name: "Certified Organic Chemist", issuer: "American Chemical Society", date: "2022-06" },
      ],
    }),
    faqs: [
      { question: "¿Qué debe incluir un Químico Orgánico Sintético en su currículum?", answer: "Un Químico Orgánico Sintético debe incluir su experiencia en desarrollo de síntesis, habilidades analíticas y cumplimiento regulatorio." },
      { question: "¿Cómo destacar mi currículum de Químico Orgánico Sintético?", answer: "Resaltar logros cuantificables y experiencia en proyectos relevantes puede ayudar a destacar su currículum." },
      { question: "¿Qué habilidades necesita un Químico Orgánico Sintético?", answer: "Las habilidades clave incluyen técnicas analíticas, desarrollo de métodos sintéticos y optimización de procesos." },
    ],
  }
};
