import type { SkillEsData } from './index';

export const translations: Record<string, SkillEsData> = {
  'python': {
    slug: 'python',
    title: 'Python',
    description: 'Python es un lenguaje de programación de alto nivel e interpretado, conocido por su sintaxis clara y legibilidad. Creado por Guido van Rossum y lanzado por primera vez en 1991, Python se ha convertido en uno de los lenguajes más utilizados en el mundo. La versión estable actual es Python 3.12, que introdujo mejoras de rendimiento incluyendo comprensiones más rápidas y una nueva sintaxis de parámetros de tipo. Python soporta múltiples paradigmas de programación incluyendo programación procedimental, orientada a objetos y funcional.\n\nEl ecosistema de Python es vasto, con más de 400,000 paquetes disponibles en PyPI. Los frameworks principales incluyen Django y Flask para desarrollo web, FastAPI para construir APIs, NumPy y Pandas para manipulación de datos, TensorFlow y PyTorch para aprendizaje automático, y Scrapy para web scraping. Python es el lenguaje dominante en ciencia de datos, inteligencia artificial y computación científica, y también se usa ampliamente para automatización, scripting, servicios backend y herramientas DevOps.\n\nLa simplicidad de Python lo convierte en un excelente primer lenguaje de programación, mientras que su profundidad y soporte de bibliotecas lo hacen la opción preferida para ingenieros experimentados que trabajan en sistemas complejos en campos que van desde fintech hasta biotecnología.',
    whyImportant: 'Python se posiciona consistentemente como el lenguaje de programación más demandado en bolsas de trabajo. Según encuestas de la industria, los desarrolladores de Python obtienen salarios medianos de $120,000-$155,000 en EE.UU. Es una habilidad requerida para casi todos los roles de ciencia de datos, aprendizaje automático e IA, y cada vez más esperada en posiciones de DevOps, ingeniería en la nube y automatización.\n\nIncluir Python en tu currículum señala versatilidad ya que el lenguaje abarca desarrollo web, ingeniería de datos, scripting y computación científica. Los reclutadores y sistemas ATS priorizan candidatos que demuestran competencia en Python, especialmente cuando se combina con frameworks como Django, Flask o PyTorch.',
    keywords: ['currículum desarrollador python', 'habilidades de programación python', 'requisitos de trabajo python', 'palabras clave python currículum'],
    searchIntents: ['cómo incluir python en el currículum', 'habilidades python para solicitud de empleo', 'ejemplos de currículum desarrollador python'],
    relatedSkills: ['Django', 'Flask', 'FastAPI', 'NumPy', 'Pandas', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Celery', 'SQLAlchemy'],
    professionSlugs: ['ingeniero-de-software', 'cientifico-de-datos', 'analista-de-datos', 'ingeniero-de-machine-learning', 'desarrollador-backend', 'ingeniero-devops', 'ingeniero-de-ia', 'ingeniero-de-datos'],
    atsKeywords: ['Python', 'Python 3', 'Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy', 'PyTorch', 'TensorFlow', 'scripting', 'automatización', 'REST API'],
    resumeTips: [
      'Especifica tu experiencia con la versión de Python (ej., Python 3.10+) para demostrar que estás actualizado.',
      'Combina Python con frameworks o bibliotecas específicas relevantes para la descripción del puesto.',
      'Cuantifica resultados como mejoras en velocidad de procesamiento o volúmenes de datos manejados.',
      'Menciona tanto casos de uso de scripting/automatización como desarrollo a nivel de aplicación.',
      'Destaca frameworks de pruebas como pytest o unittest para demostrar prácticas de calidad de código.'
    ],
    exampleBullets: [
      'Desarrollé un pipeline ETL basado en Python procesando 2.5 millones de registros diarios, reduciendo la latencia de datos en un 68% y ahorrando $45,000 anuales en costos de procesamiento manual.',
      'Construí una API REST con Django sirviendo a 15,000 usuarios concurrentes con 99.9% de disponibilidad, manejando 3 millones de solicitudes por día.',
      'Automaticé más de 120 casos de prueba QA manuales usando Python y Selenium, reduciendo el tiempo de pruebas de regresión de 8 horas a 45 minutos.',
      'Creé modelos de aprendizaje automático en Python con Scikit-learn logrando 94% de precisión en predicción de abandono de clientes, reteniendo un estimado de $1.2M en ingresos anuales.'
    ],
    faqs: [
      { question: '¿Debería incluir Python 2 o Python 3 en mi currículum?', answer: 'Incluye Python 3 como tu habilidad principal ya que Python 2 llegó al fin de su vida útil en enero de 2020. Solo menciona Python 2 si la descripción del puesto requiere específicamente mantenimiento de sistemas legados. La mayoría de los empleadores esperan experiencia con Python 3.8+.' },
      { question: '¿Cómo demuestro competencia en Python sin experiencia profesional?', answer: 'Incluye proyectos personales, contribuciones a código abierto o resultados de competencias Kaggle. Especifica las bibliotecas utilizadas, el alcance del proyecto y resultados medibles. Un portafolio en GitHub con proyectos Python bien documentados es muy valorado por los gerentes de contratación.' },
      { question: '¿Qué frameworks de Python debería destacar para roles backend?', answer: 'Django es preferido para aplicaciones empresariales completas, Flask para microservicios ligeros y FastAPI para APIs asíncronas de alto rendimiento. Menciona el framework más relevante para la oferta de trabajo, y nota experiencia con herramientas ORM como SQLAlchemy o Django ORM.' }
    ]
  },
  'java': {
    slug: 'java',
    title: 'Java',
    description: 'Java es un lenguaje de programación de tipado estático y orientado a objetos desarrollado por Sun Microsystems y ahora mantenido por Oracle. Desde su lanzamiento en 1995, Java se ha convertido en uno de los lenguajes más implementados en software empresarial. La versión actual de soporte a largo plazo es Java 21 (LTS), que introdujo hilos virtuales (Project Loom), coincidencia de patrones para expresiones switch y patrones de registros. Java sigue un ciclo de lanzamiento semestral con versiones LTS cada dos años.\n\nEl ecosistema de Java es extenso y maduro. Spring Boot y Spring Framework dominan el desarrollo backend empresarial, mientras que Jakarta EE (anteriormente Java EE) proporciona especificaciones para aplicaciones empresariales. Herramientas de construcción como Maven y Gradle, frameworks de pruebas como JUnit y Mockito, y servidores de aplicaciones como Tomcat y WildFly forman la cadena de herramientas estándar. Java también es el lenguaje principal para el desarrollo de aplicaciones Android usando el Android SDK.\n\nJava se ejecuta en la Máquina Virtual de Java (JVM), permitiendo portabilidad de escribir-una-vez-ejecutar-en-cualquier-lugar. La JVM también soporta otros lenguajes como Kotlin, Scala y Groovy. Java impulsa sistemas a gran escala en empresas como Google, Amazon, Netflix y LinkedIn, procesando miles de millones de transacciones diariamente.',
    whyImportant: 'Java sigue siendo uno de los tres lenguajes de programación más solicitados en ofertas de trabajo a nivel global. Organizaciones empresariales, instituciones financieras y agencias gubernamentales dependen en gran medida de Java para sistemas de misión crítica. Los desarrolladores Java obtienen salarios medianos de $115,000-$145,000 en EE.UU., con roles senior y de arquitectura superando los $180,000.\n\nIncluir Java en tu currículum demuestra tu capacidad para trabajar con sistemas a gran escala y de grado de producción. Los empleadores valoran la competencia en Java porque señala familiaridad con principios de diseño orientado a objetos, patrones empresariales y prácticas robustas de ingeniería de software.',
    keywords: ['currículum desarrollador java', 'habilidades de programación java', 'palabras clave java currículum', 'requisitos de trabajo java'],
    searchIntents: ['cómo incluir habilidades java en currículum', 'consejos currículum desarrollador java', 'ejemplos currículum programación java'],
    relatedSkills: ['Spring Boot', 'Spring Framework', 'Maven', 'Gradle', 'JUnit', 'Hibernate', 'Jakarta EE', 'Microservicios', 'Kafka', 'JVM'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'desarrollador-full-stack', 'desarrollador-android', 'ingeniero-de-datos', 'arquitecto-de-soluciones', 'arquitecto-empresarial'],
    atsKeywords: ['Java', 'Spring Boot', 'Spring Framework', 'Maven', 'Gradle', 'JUnit', 'Hibernate', 'REST API', 'Microservicios', 'JVM', 'Jakarta EE', 'Kafka'],
    resumeTips: [
      'Especifica la versión de Java con la que tienes experiencia (ej., Java 17 o Java 21 LTS).',
      'Destaca la experiencia con Spring Boot ya que es el framework Java más solicitado.',
      'Incluye experiencia con herramientas de construcción como Maven o Gradle.',
      'Menciona experiencia en arquitectura de microservicios y patrones relacionados.',
      'Referencia prácticas de pruebas con JUnit, Mockito o frameworks de pruebas de integración.'
    ],
    exampleBullets: [
      'Arquitecté una plataforma de microservicios con Spring Boot manejando 50 millones de llamadas API diarias con tiempos de respuesta promedio menores a 120ms, soportando un aumento del 40% en tráfico.',
      'Migré una aplicación monolítica Java EE a microservicios Spring Boot, reduciendo el tiempo de despliegue de 4 horas a 15 minutos y mejorando la productividad del desarrollador en un 35%.',
      'Optimicé la recolección de basura de la JVM para un sistema de trading de alto rendimiento, reduciendo picos de latencia en un 78% y procesando 2 millones de transacciones por segundo.',
      'Lideré la migración de Java 11 a Java 21 en 45 microservicios, aprovechando hilos virtuales para reducir la sobrecarga del pool de hilos en un 60% y recortando costos de infraestructura en $120,000 anuales.'
    ],
    faqs: [
      { question: '¿Java sigue siendo relevante para nuevos proyectos en 2025?', answer: 'Absolutamente. Java sigue siendo uno de los lenguajes más utilizados para sistemas backend empresariales, desarrollo Android y procesamiento de big data. Java moderno (17+) ha introducido características como records, clases selladas e hilos virtuales que lo mantienen competitivo con lenguajes más nuevos.' },
      { question: '¿Debería aprender Spring Boot o Jakarta EE?', answer: 'Spring Boot es mucho más demandado en ofertas de trabajo y es el estándar de facto para nuevos proyectos Java. Jakarta EE todavía se usa en entornos empresariales legados. Enfócate en Spring Boot para máxima empleabilidad, pero menciona Jakarta EE si tienes experiencia.' },
      { question: '¿Cómo demuestro experiencia en Java más allá de la sintaxis básica?', answer: 'Destaca patrones de diseño (ej., microservicios, orientado a eventos), experiencia en concurrencia y multihilo, optimización de la JVM, integración CI/CD y familiaridad con el ecosistema más amplio incluyendo sistemas de mensajería como Kafka y caché con Redis.' }
    ]
  },
  'javascript': {
    slug: 'javascript',
    title: 'JavaScript',
    description: 'JavaScript es un lenguaje de programación dinámico e interpretado que sirve como la columna vertebral del desarrollo web. Creado originalmente por Brendan Eich en Netscape en 1995, JavaScript ha evolucionado de un simple lenguaje de scripting a una plataforma de desarrollo full-stack. La última especificación ECMAScript 2024 introdujo agrupación de arrays, promise.withResolvers y la API Temporal para un mejor manejo de fechas. JavaScript se ejecuta nativamente en cada navegador web y en servidores a través de Node.js y Deno.\n\nEl ecosistema de JavaScript es el más grande de cualquier lenguaje de programación, con más de 2 millones de paquetes en npm. Los frameworks frontend incluyen React, Angular, Vue.js y Svelte. Las plataformas backend incluyen Node.js con Express, Fastify y NestJS. Los meta-frameworks full-stack como Next.js, Nuxt y Remix se han convertido en estándares de la industria. JavaScript también se usa para desarrollo móvil vía React Native, aplicaciones de escritorio vía Electron y funciones serverless en AWS Lambda y Cloudflare Workers.\n\nEl modelo de I/O dirigido por eventos y no bloqueante de JavaScript lo hace particularmente adecuado para aplicaciones en tiempo real, APIs e interfaces de usuario interactivas. Sigue siendo el lenguaje de programación más utilizado según la Encuesta de Desarrolladores de Stack Overflow por más de una década.',
    whyImportant: 'JavaScript es requerido o preferido en aproximadamente el 65% de todas las ofertas de trabajo de desarrollo web. Es el lenguaje de programación más demandado para desarrollo frontend y cada vez más requerido para posiciones full-stack y backend. Los desarrolladores JavaScript obtienen salarios medianos de $110,000-$140,000 en EE.UU., con especialistas senior en React o Node.js superando los $160,000+.\n\nTener JavaScript en tu currículum es esencialmente obligatorio para cualquier rol relacionado con la web. Los sistemas ATS marcan JavaScript como una palabra clave crítica para posiciones frontend, full-stack y muchas posiciones backend. Demostrar competencia con sintaxis moderna ES6+ y frameworks populares impulsa significativamente tu candidatura.',
    keywords: ['currículum desarrollador javascript', 'habilidades javascript currículum', 'requisitos trabajo javascript', 'consejos currículum javascript'],
    searchIntents: ['cómo incluir javascript en currículum', 'habilidades javascript para desarrollador web', 'ejemplos currículum desarrollador javascript'],
    relatedSkills: ['React', 'Node.js', 'TypeScript', 'Vue.js', 'Angular', 'Next.js', 'Express.js', 'HTML/CSS', 'Webpack', 'APIs REST'],
    professionSlugs: ['desarrollador-frontend', 'desarrollador-full-stack', 'desarrollador-web', 'ingeniero-de-software', 'desarrollador-backend', 'desarrollador-de-aplicaciones-moviles', 'disenador-web'],
    atsKeywords: ['JavaScript', 'ES6+', 'React', 'Node.js', 'TypeScript', 'Vue.js', 'Angular', 'Next.js', 'Express', 'REST API', 'npm', 'Webpack'],
    resumeTips: [
      'Especifica ES6+ para indicar conocimiento de JavaScript moderno.',
      'Lista frameworks específicos (React, Vue, Angular) en lugar de solo "JavaScript".',
      'Incluye experiencia tanto en frontend como en backend con JavaScript si aplica.',
      'Menciona herramientas de pruebas como Jest, Cypress o Playwright.',
      'Destaca trabajo de optimización de rendimiento como reducción de tamaño de bundle o mejoras en Core Web Vitals.',
      'Referencia experiencia en gestión de estado (Redux, Zustand, Pinia) para roles frontend.'
    ],
    exampleBullets: [
      'Construí un dashboard SaaS basado en React sirviendo a 25,000 usuarios activos mensuales, logrando una puntuación Lighthouse de rendimiento de 96 y reduciendo el tiempo de carga inicial en un 52%.',
      'Desarrollé una arquitectura de microservicios en Node.js procesando 8 millones de eventos por día con 99.95% de disponibilidad, reduciendo costos de infraestructura en $30,000 anuales.',
      'Migré una aplicación legacy jQuery a React con TypeScript, reduciendo reportes de errores en un 40% y mejorando el tiempo de incorporación de desarrolladores de 3 semanas a 1 semana.',
      'Implementé renderizado del lado del servidor con Next.js, mejorando el tráfico orgánico SEO en un 180% y reduciendo el tiempo al primer byte de 2.8s a 0.4s.'
    ],
    faqs: [
      { question: '¿Debería listar JavaScript y TypeScript por separado en mi currículum?', answer: 'Sí, lista ambos por separado ya que los sistemas ATS los tratan como habilidades distintas. TypeScript es cada vez más requerido junto con JavaScript, y listar ambos demuestra que entiendes la seguridad de tipos y las prácticas de desarrollo moderno.' },
      { question: '¿Qué framework de JavaScript debería enfatizar?', answer: 'React es el framework más demandado con aproximadamente el 40% de las ofertas frontend requiriéndolo. Angular es fuerte en entornos empresariales, y Vue.js tiene una presencia creciente. Enfatiza el framework que mencione la descripción del puesto, pero React es la opción más segura por defecto.' },
      { question: '¿Qué tan importante es el conocimiento de JavaScript vanilla vs. conocimiento de frameworks?', answer: 'Ambos importan. Los roles de nivel senior esperan fundamentos sólidos en closures, herencia prototípica, async/await y el event loop. El conocimiento de frameworks solo no es suficiente. Destaca tu comprensión de los conceptos fundamentales de JavaScript junto con tu experiencia en frameworks.' }
    ]
  },
  'typescript': {
    slug: 'typescript',
    title: 'TypeScript',
    description: 'TypeScript es un superconjunto de JavaScript con tipado estático desarrollado por Microsoft. Lanzado por primera vez en 2012, TypeScript agrega anotaciones de tipo opcionales, interfaces, genéricos y características avanzadas del sistema de tipos a JavaScript. La versión actual, TypeScript 5.4, introdujo el tipo utilitario NoInfer, estrechamiento mejorado para closures e inferencia de tipos mejorada. TypeScript se compila a JavaScript plano, haciéndolo compatible con cualquier entorno de ejecución de JavaScript.\n\nTypeScript ha sido adoptado por la mayoría del ecosistema JavaScript. React, Angular, Vue 3, Next.js, Nest.js y Deno todos tienen soporte de primera clase para TypeScript. Proyectos principales de código abierto incluyendo VS Code, Playwright y Prisma están escritos en TypeScript. El lenguaje proporciona características poderosas como uniones discriminadas, tipos mapeados, tipos condicionales y tipos literales de plantilla que permiten modelar con precisión estructuras de datos complejas.\n\nLa adopción de TypeScript ha crecido dramáticamente, con más del 78% de los desarrolladores JavaScript usándolo según la encuesta State of JS 2024. Detecta errores relacionados con tipos en tiempo de compilación en lugar de en tiempo de ejecución, permitiendo refactorizaciones más seguras, mejor autocompletado en el IDE y bases de código más mantenibles, particularmente en equipos grandes.',
    whyImportant: 'TypeScript ha pasado de ser un plus a ser un requisito en el desarrollo web moderno. Más del 55% de las ofertas de trabajo frontend y full-stack ahora listan explícitamente TypeScript. Los desarrolladores de TypeScript obtienen una prima salarial del 5-10% sobre los desarrolladores que solo usan JavaScript, con salarios medianos de $120,000-$150,000 en EE.UU.\n\nIncluir TypeScript en tu currículum señala que escribes código más mantenible y de calidad de producción. Es especialmente valorado para roles senior donde la calidad del código, las decisiones de arquitectura y la colaboración en equipo son críticas. Empresas como Airbnb, Stripe y Shopify exigen TypeScript para todos los nuevos proyectos frontend y backend en JavaScript.',
    keywords: ['currículum desarrollador typescript', 'habilidades typescript currículum', 'requisitos trabajo typescript', 'currículum programación typescript'],
    searchIntents: ['cómo agregar typescript al currículum', 'typescript vs javascript currículum', 'habilidades typescript para desarrolladores'],
    relatedSkills: ['JavaScript', 'React', 'Angular', 'Node.js', 'Next.js', 'NestJS', 'Genéricos', 'Seguridad de Tipos', 'Zod', 'tRPC'],
    professionSlugs: ['desarrollador-frontend', 'desarrollador-full-stack', 'ingeniero-de-software', 'desarrollador-web', 'desarrollador-backend', 'desarrollador-angular'],
    atsKeywords: ['TypeScript', 'TS', 'seguridad de tipos', 'genéricos', 'interfaces', 'React TypeScript', 'Angular', 'Node.js', 'tipado estático', 'ES6+', 'Next.js', 'NestJS'],
    resumeTips: [
      'Lista TypeScript por separado de JavaScript ya que los sistemas ATS los tratan como habilidades diferentes.',
      'Menciona características avanzadas de TypeScript como genéricos, tipos utilitarios o uniones discriminadas para roles senior.',
      'Destaca experiencia de migración de JavaScript a TypeScript.',
      'Incluye herramientas específicas de TypeScript como ts-node, tsx o configuración de modo estricto.',
      'Referencia patrones de API con seguridad de tipos como validación de esquemas tRPC o Zod.'
    ],
    exampleBullets: [
      'Lideré la migración de una base de código JavaScript de 150,000 líneas a TypeScript con modo estricto, reduciendo errores de tipo en producción en un 62% en 6 meses.',
      'Construí una aplicación full-stack con seguridad de tipos usando Next.js y tRPC, eliminando desajustes de contratos API y reduciendo errores de integración en un 85%.',
      'Desarrollé una biblioteca de componentes TypeScript compartida usada por 8 equipos de producto, reduciendo el tiempo de desarrollo UI en un 30% y asegurando contratos de tipos consistentes.',
      'Implementé genéricos avanzados de TypeScript y tipos condicionales para un SDK de constructor de formularios, reduciendo el código repetitivo en un 45% para los equipos consumidores.'
    ],
    faqs: [
      { question: '¿Vale la pena aprender TypeScript si ya conozco JavaScript?', answer: 'Sí. TypeScript es ahora un requisito para la mayoría de las posiciones frontend/full-stack de nivel medio y senior. Aprender TypeScript típicamente toma 2-4 semanas para desarrolladores JavaScript experimentados, y el retorno profesional es significativo dada la prima salarial y las oportunidades laborales más amplias.' },
      { question: '¿Cómo muestro profundidad en TypeScript más allá del uso básico?', answer: 'Menciona experiencia con modo estricto, guardias de tipo personalizados, restricciones genéricas, tipos mapeados e integración con bibliotecas de validación como Zod. Destaca proyectos de refactorización o migración donde TypeScript mejoró la calidad del código de manera medible.' },
      { question: '¿Debería usar TypeScript para proyectos personales en mi currículum?', answer: 'Absolutamente. Usar TypeScript en proyectos personales demuestra que eliges mejores herramientas de forma proactiva. Muestra a los gerentes de contratación que priorizas la calidad del código y la mantenibilidad, cualidades valoradas en entornos de producción.' }
    ]
  },
  'c-plus-plus': {
    slug: 'c-plus-plus',
    title: 'C++',
    description: 'C++ es un lenguaje de programación de alto rendimiento y tipado estático creado por Bjarne Stroustrup como una extensión de C. Lanzado por primera vez en 1985, C++ sigue siendo el lenguaje preferido para aplicaciones donde el rendimiento es crítico. El estándar C++23 introdujo mejoras en módulos, std::expected, std::print y operadores de subíndice multidimensionales. C++26 está actualmente en desarrollo con propuestas para reflexión y coincidencia de patrones.\n\nC++ es fundamental para la programación de sistemas, motores de juegos (Unreal Engine, la capa nativa de Unity), sistemas embebidos, plataformas de trading de alta frecuencia, sistemas operativos, motores de bases de datos y motores de navegadores. Los frameworks y bibliotecas principales incluyen Qt para desarrollo de GUI, Boost para utilidades, OpenCV para visión por computadora y CUDA para programación de GPU. Los sistemas de construcción como CMake y gestores de paquetes como vcpkg y Conan soportan flujos de trabajo modernos de C++.\n\nC++ moderno (C++17/20/23) ha mejorado significativamente la experiencia del desarrollador con características como punteros inteligentes, rangos, conceptos, corrutinas y std::format. Empresas como Google, Microsoft, Apple, Meta y Bloomberg dependen de C++ para infraestructura donde el rendimiento es crítico.',
    whyImportant: 'Los desarrolladores de C++ tienen alta demanda en campos especializados incluyendo desarrollo de juegos, sistemas embebidos, finanzas cuantitativas y programación de sistemas. Los desarrolladores C++ obtienen salarios medianos de $125,000-$160,000 en EE.UU., con roles de finanzas cuantitativas en C++ alcanzando $250,000+.\n\nIncluir C++ demuestra comprensión técnica profunda de gestión de memoria, interacción con hardware y optimización de rendimiento. Es particularmente valorado para roles que requieren sistemas de baja latencia, procesamiento en tiempo real o programación cercana al hardware.',
    keywords: ['currículum desarrollador c++', 'habilidades programación c++', 'palabras clave c++ currículum', 'requisitos trabajo c++'],
    searchIntents: ['cómo incluir c++ en currículum', 'habilidades c++ para currículum', 'consejos currículum desarrollador c++'],
    relatedSkills: ['C', 'STL', 'CMake', 'Boost', 'CUDA', 'OpenCV', 'Qt', 'Multihilo', 'Gestión de Memoria', 'Metaprogramación con Templates'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-de-juegos', 'desarrollador-embebido', 'ingeniero-de-robotica', 'ingeniero-de-fpga', 'ingeniero-principal', 'administrador-de-sistemas'],
    atsKeywords: ['C++', 'C++17', 'C++20', 'STL', 'CMake', 'OOP', 'multihilo', 'gestión de memoria', 'Boost', 'Qt', 'CUDA', 'sistemas embebidos'],
    resumeTips: [
      'Especifica el estándar de C++ en el que eres competente (C++17, C++20, C++23).',
      'Destaca logros de optimización de rendimiento con métricas específicas.',
      'Menciona experiencia en gestión de memoria incluyendo punteros inteligentes y RAII.',
      'Incluye experiencia en dominios específicos como motores de juegos, embebidos o HFT.',
      'Referencia experiencia en desarrollo multiplataforma si aplica.'
    ],
    exampleBullets: [
      'Optimicé un motor de trading en tiempo real en C++ para lograr latencia sub-microsegundo, reduciendo el tiempo mediano de ejecución de órdenes en un 73% y generando un estimado de $8M en ingresos anuales adicionales.',
      'Desarrollé sistemas de gameplay en C++ con Unreal Engine para un título AAA con 5 millones de unidades vendidas, implementando subsistemas de física e IA ejecutándose a 60 FPS en el hardware objetivo.',
      'Reduje el consumo de memoria de un pipeline de procesamiento de imágenes en C++ en un 45% usando asignadores personalizados y semánticas de movimiento, permitiendo el procesamiento de streams de video 4K en hardware embebido.',
      'Migré una base de código legacy C++11 de 500,000 líneas a C++20, aprovechando conceptos y rangos para reducir los tiempos de compilación de templates en un 30%.'
    ],
    faqs: [
      { question: '¿Cómo indico competencia en C++ moderno en mi currículum?', answer: 'Referencia el estándar específico de C++ (C++17/20/23) y menciona características modernas como punteros inteligentes, rangos, conceptos, bindings estructurados y corrutinas. Evita listar solo "C/C++" lo cual sugiere prácticas desactualizadas.' },
      { question: '¿C++ todavía vale la pena aprenderlo para nuevos desarrolladores?', answer: 'Sí, para trayectorias profesionales específicas. Desarrollo de juegos, sistemas embebidos, trading de alta frecuencia y programación de sistemas todos requieren C++. Si tus roles objetivo están en estos dominios, la experiencia en C++ es esencial y genera salarios premium.' },
      { question: '¿Debería listar C y C++ como habilidades separadas?', answer: 'Sí. C y C++ son lenguajes distintos con diferentes paradigmas y casos de uso. Si tienes experiencia genuina en ambos, lístalos por separado. Muchos roles embebidos y de sistemas requieren específicamente C junto con C++.' }
    ]
  },
  'c-sharp': {
    slug: 'c-sharp',
    title: 'C#',
    description: 'C# es un lenguaje de programación moderno y orientado a objetos desarrollado por Microsoft como parte de la plataforma .NET. Lanzado por primera vez en 2000, C# ha evolucionado en un lenguaje versátil y multiplataforma. C# 12, lanzado con .NET 8, introdujo constructores primarios para clases, expresiones de colección y arrays en línea. C# 13 con .NET 9 agrega colecciones params y nueva semántica de bloqueo.\n\nEl ecosistema .NET impulsa aplicaciones empresariales, APIs web con ASP.NET Core, aplicaciones de escritorio con WPF y MAUI, aplicaciones móviles con .NET MAUI y desarrollo de juegos con Unity (usado por más del 70% de los juegos móviles). Entity Framework Core proporciona capacidades ORM, y Blazor permite construir interfaces web interactivas con C# en lugar de JavaScript. Los servicios en la nube Azure tienen una profunda integración con .NET.\n\nC# combina las características de rendimiento de un lenguaje compilado con características modernas como async/await, LINQ, coincidencia de patrones, tipos de referencia anulables y records. Se ejecuta multiplataforma en Windows, macOS y Linux a través de .NET, y se usa extensivamente en entornos empresariales, estudios de juegos y aplicaciones nativas en la nube.',
    whyImportant: 'C# está entre los cinco lenguajes de programación más solicitados en ofertas de trabajo empresariales, particularmente en la pila tecnológica de Microsoft. Los desarrolladores C# obtienen salarios medianos de $110,000-$145,000 en EE.UU., con arquitectos senior .NET alcanzando $170,000+.\n\nIncluir C# en tu currículum es esencial para roles en desarrollo de software empresarial, desarrollo de juegos con Unity y cualquier posición dentro del ecosistema Microsoft. Señala competencia en un lenguaje de tipado fuerte y grado empresarial, y familiaridad con las extensas herramientas .NET y la plataforma en la nube Azure.',
    keywords: ['currículum desarrollador c#', 'habilidades programación c#', 'palabras clave c sharp currículum', 'currículum desarrollador dotnet'],
    searchIntents: ['cómo incluir c# en currículum', 'habilidades desarrollador c# para currículum', 'ejemplos currículum c# .net'],
    relatedSkills: ['ASP.NET Core', '.NET', 'Entity Framework', 'Azure', 'Unity', 'Blazor', 'LINQ', 'WPF', 'SQL Server', 'Microservicios'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-full-stack', 'desarrollador-backend', 'desarrollador-de-juegos', 'desarrollador-de-software', 'desarrollador-web', 'arquitecto-de-soluciones'],
    atsKeywords: ['C#', '.NET', 'ASP.NET Core', 'Entity Framework', 'LINQ', 'Azure', 'Unity', 'Blazor', 'WPF', 'microservicios', '.NET 8', 'REST API'],
    resumeTips: [
      'Especifica la experiencia con versiones de .NET (.NET 6/7/8) para demostrar vigencia.',
      'Destaca ASP.NET Core para roles web/API o Unity para roles de desarrollo de juegos.',
      'Menciona experiencia con Entity Framework Core para posiciones centradas en datos.',
      'Incluye experiencia con servicios en la nube Azure junto con C# para roles en la nube.',
      'Referencia características modernas de C# como async/await, records y coincidencia de patrones.'
    ],
    exampleBullets: [
      'Desarrollé una plataforma de microservicios ASP.NET Core procesando $2.3M en transacciones diarias con 99.99% de disponibilidad, sirviendo a 40,000 usuarios concurrentes.',
      'Construí un juego móvil basado en Unity en C# descargado 3.2 millones de veces, logrando una calificación de 4.7 estrellas y generando $850,000 en ingresos del primer año.',
      'Migré una aplicación legacy WCF a ASP.NET Core, reduciendo tiempos de respuesta en un 55% y recortando costos de alojamiento en Azure en $48,000 anuales.',
      'Implementé un dashboard Blazor WebAssembly reemplazando una aplicación Angular legacy, reduciendo el tamaño del bundle frontend en un 40% y eliminando la necesidad de un equipo JavaScript separado.'
    ],
    faqs: [
      { question: '¿Debería escribir C# o C Sharp en mi currículum?', answer: 'Usa "C#" como la notación principal ya que es lo que los sistemas ATS y reclutadores buscan. También puedes incluir ".NET" junto a C# ya que muchas descripciones de trabajo los usan indistintamente. Evita escribir "C Sharp" ya que puede no ser reconocido por el filtrado automatizado.' },
      { question: '¿La experiencia en .NET Framework sigue siendo relevante?', answer: 'Aunque el conocimiento de .NET Framework es útil para mantener sistemas legados, los roles modernos requieren .NET 6+ (.NET multiplataforma). Destaca primero tu experiencia con .NET Core/moderno .NET, y menciona .NET Framework solo si el rol implica migración de legados.' },
      { question: '¿Cómo se compara C# con Java en oportunidades laborales?', answer: 'Ambos tienen mercados laborales fuertes. C# domina en el ecosistema Microsoft, desarrollo de juegos (Unity) y empresas centradas en Windows. Java lidera en desarrollo Android, big data y sistemas empresariales multiplataforma. Elige según tu industria objetivo y preferencias de empresa.' }
    ]
  },
  'c-programming': {
    slug: 'programacion-en-c',
    title: 'Programación en C',
    description: 'C es un lenguaje de programación de propósito general y procedimental desarrollado por Dennis Ritchie en Bell Labs en 1972. A pesar de tener más de 50 años, C sigue siendo uno de los lenguajes de programación más importantes y ampliamente utilizados. El último estándar, C23, introdujo constexpr, typeof, nullptr y soporte mejorado de Unicode. C es el lenguaje subyacente a la mayoría de los sistemas operativos, firmware embebido y software a nivel de sistema.\n\nC proporciona acceso directo a la memoria a través de punteros, sobrecarga mínima de tiempo de ejecución y gestión determinista de recursos, cualidades que lo hacen irremplazable para sistemas operativos (Linux, kernel de Windows), sistemas embebidos, motores de bases de datos (PostgreSQL, SQLite), pilas de red y dispositivos IoT. El GNU Compiler Collection (GCC) y Clang/LLVM son los compiladores principales, mientras que sistemas de construcción como Make, CMake y Meson gestionan proyectos C.\n\nLa influencia de C en la programación moderna es incalculable: lenguajes como C++, C#, Java, Go y Rust todos derivan de la sintaxis y conceptos de C. Entender C proporciona una comprensión fundamental de cómo funcionan realmente las computadoras, desde el diseño de memoria hasta las llamadas al sistema.',
    whyImportant: 'Los programadores de C son esenciales en sistemas embebidos, sistemas operativos, IoT, software automotriz y aeroespacial. Los desarrolladores C obtienen salarios medianos de $115,000-$150,000, con roles embebidos y de sistemas en empresas top superando los $180,000.\n\nIncluir C en tu currículum demuestra comprensión de sistemas de bajo nivel que es imposible replicar con lenguajes de más alto nivel. Para roles embebidos, firmware, kernel y adyacentes al hardware, la competencia en C es innegociable. También señala fundamentos sólidos en gestión de memoria, punteros y programación consciente del rendimiento.',
    keywords: ['currículum programación c', 'habilidades lenguaje c currículum', 'currículum programador c', 'requisitos trabajo desarrollador c'],
    searchIntents: ['cómo incluir programación c en currículum', 'habilidades lenguaje c para trabajos embebidos', 'ejemplos currículum programador c'],
    relatedSkills: ['C++', 'Sistemas Embebidos', 'Kernel Linux', 'RTOS', 'Punteros', 'GCC', 'Make/CMake', 'Depuración (GDB)', 'Gestión de Memoria', 'Ensamblador'],
    professionSlugs: ['desarrollador-embebido', 'ingeniero-embebido', 'ingeniero-de-software', 'ingeniero-de-robotica', 'ingeniero-de-fpga', 'administrador-de-sistemas', 'ingeniero-de-control'],
    atsKeywords: ['C', 'programación C', 'C embebido', 'punteros', 'gestión de memoria', 'RTOS', 'kernel Linux', 'firmware', 'GCC', 'depuración', 'microcontroladores', 'bare-metal'],
    resumeTips: [
      'Especifica "C" o "programación C" en lugar de "C/C++" para indicar experiencia genuina en C.',
      'Destaca experiencia en desarrollo de sistemas embebidos o a nivel de SO.',
      'Menciona plataformas de hardware específicas o familias de microcontroladores que hayas programado.',
      'Incluye herramientas de depuración y perfilado como GDB, Valgrind o analizadores estáticos.',
      'Referencia experiencia con RTOS (FreeRTOS, Zephyr) para roles embebidos.'
    ],
    exampleBullets: [
      'Desarrollé firmware en C para un módulo sensor IoT ARM Cortex-M4 desplegado en 50,000 dispositivos, logrando 18 meses de vida de batería mediante optimización de energía.',
      'Contribuí al subsistema de red del kernel Linux, optimizando el procesamiento de paquetes TCP para mejorar el rendimiento en un 22% para servidores de alto tráfico.',
      'Construí un planificador RTOS personalizado en C para una ECU automotriz, cumpliendo con MISRA C y logrando tiempos de respuesta deterministas menores a 50 microsegundos.',
      'Reduje la huella de memoria de una aplicación C embebida en un 35% mediante asignadores de pool de memoria personalizados, permitiendo el despliegue en microcontroladores con recursos limitados de 64KB.'
    ],
    faqs: [
      { question: '¿C sigue siendo relevante en el desarrollo de software moderno?', answer: 'Absolutamente. C es esencial para sistemas embebidos, sistemas operativos, controladores de dispositivos y aplicaciones donde el rendimiento es crítico. El kernel Linux, Git y la mayoría de los motores de bases de datos están escritos en C. Cualquier rol que involucre interacción con hardware o programación de sistemas requiere competencia en C.' },
      { question: '¿Cómo diferencio C de C++ en mi currículum?', answer: 'Lístalos como habilidades separadas y sé específico sobre tu experiencia con cada uno. C enfatiza programación procedimental, gestión manual de memoria y código a nivel de sistema. C++ agrega características orientadas a objetos, templates y la STL. Los empleadores en campos embebidos a menudo necesitan específicamente C, no C++.' },
      { question: '¿Qué proyectos puedo construir para demostrar habilidades en C?', answer: 'Construye un asignador de memoria personalizado, un shell simple, un servidor TCP, o contribuye a proyectos de código abierto en C como Redis o SQLite. Para trabajo embebido, programa microcontroladores (Arduino, STM32) y documenta la interacción con hardware y las técnicas de optimización utilizadas.' }
    ]
  },
  'ruby': {
    slug: 'ruby',
    title: 'Ruby',
    description: 'Ruby es un lenguaje de programación dinámico y orientado a objetos diseñado para la felicidad y productividad del desarrollador. Creado por Yukihiro "Matz" Matsumoto en 1995, Ruby enfatiza la sintaxis elegante y el principio de menor sorpresa. Ruby 3.3 introdujo el compilador just-in-time YJIT como predeterminado, el parser Prism y mejoras significativas de rendimiento haciendo Ruby hasta 3 veces más rápido que Ruby 2.x.\n\nRuby on Rails (Rails 7.1+) sigue siendo el framework insignia, impulsando empresas como Shopify, GitHub, Basecamp, Airbnb y Stripe. El ecosistema Ruby incluye Sinatra para aplicaciones web ligeras, Sidekiq para procesamiento de trabajos en segundo plano, RSpec y Minitest para pruebas, y RubyGems como gestor de paquetes con más de 175,000 gems. Rails introdujo Hotwire (Turbo + Stimulus) para construir aplicaciones reactivas sin frameworks JavaScript pesados.\n\nRuby sobresale en desarrollo rápido de aplicaciones web, prototipado y herramientas para desarrolladores. Sus capacidades de metaprogramación, DSLs expresivos y filosofía de convención sobre configuración permiten a los desarrolladores entregar funcionalidades rápidamente mientras mantienen código legible y mantenible.',
    whyImportant: 'Los desarrolladores Ruby siguen siendo muy buscados, particularmente en startups y empresas de producto. Shopify solo emplea miles de desarrolladores Ruby. Los desarrolladores Ruby on Rails obtienen salarios medianos de $120,000-$150,000 en EE.UU., con ingenieros senior Rails en empresas top ganando $180,000+.\n\nIncluir Ruby en tu currículum es particularmente valioso para roles en startups y enfocados en producto. La experiencia en Ruby y Rails señala capacidad de desarrollo rápido, fuerte cultura de pruebas (la comunidad Ruby fue pionera en TDD) y experiencia con aplicaciones web maduras y de grado de producción.',
    keywords: ['currículum desarrollador ruby', 'currículum ruby on rails', 'habilidades programación ruby', 'currículum desarrollador rails'],
    searchIntents: ['cómo incluir ruby en currículum', 'consejos currículum desarrollador ruby on rails', 'habilidades ruby para solicitud de empleo'],
    relatedSkills: ['Ruby on Rails', 'RSpec', 'Sidekiq', 'PostgreSQL', 'Redis', 'Hotwire', 'ActiveRecord', 'Sinatra', 'Capistrano', 'RubyGems'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'desarrollador-full-stack', 'desarrollador-web', 'desarrollador-de-software', 'desarrollador-de-api'],
    atsKeywords: ['Ruby', 'Ruby on Rails', 'Rails', 'RSpec', 'Sidekiq', 'ActiveRecord', 'PostgreSQL', 'Redis', 'REST API', 'Hotwire', 'TDD', 'RubyGems'],
    resumeTips: [
      'Siempre combina "Ruby" con "Ruby on Rails" ya que la mayoría de los roles Ruby son posiciones Rails.',
      'Destaca experiencia en pruebas con RSpec o Minitest ya que la comunidad Ruby valora TDD.',
      'Menciona versiones específicas de Rails y características modernas como Hotwire.',
      'Incluye experiencia en procesamiento de trabajos en segundo plano con Sidekiq o Resque.',
      'Referencia experiencia en bases de datos con ActiveRecord y PostgreSQL.'
    ],
    exampleBullets: [
      'Construí y mantuve una plataforma de e-commerce Ruby on Rails procesando $15M en transacciones mensuales para 2 millones de usuarios registrados con 99.97% de disponibilidad.',
      'Optimicé los tiempos de respuesta de la API Rails de 800ms a 120ms mediante eliminación de consultas N+1, estrategias de caché e indexación de base de datos, mejorando la retención de usuarios en un 18%.',
      'Implementé un sistema de procesamiento en segundo plano basado en Sidekiq manejando 500,000 trabajos por hora, reduciendo el tiempo de cumplimiento de pedidos de 30 minutos a menos de 2 minutos.',
      'Migré un monolito Rails 5 a Rails 7 con Hotwire, eliminando el 60% del JavaScript personalizado y reduciendo la complejidad frontend manteniendo una experiencia de usuario idéntica.'
    ],
    faqs: [
      { question: '¿Ruby on Rails sigue siendo una opción de carrera viable?', answer: 'Sí. Empresas importantes como Shopify, GitHub y Stripe continúan invirtiendo fuertemente en Rails. El framework se ha modernizado significativamente con Hotwire, y las mejoras de rendimiento de Ruby 3.x han abordado las preocupaciones históricas de velocidad. Rails sigue siendo excelente para el desarrollo rápido de aplicaciones web.' },
      { question: '¿Debería aprender Ruby o Python para desarrollo web?', answer: 'Ambas son excelentes opciones. Ruby con Rails sobresale en desarrollo rápido de aplicaciones web con convenciones fuertes. Python con Django ofrece capacidades similares más acceso al ecosistema de ciencia de datos. Elige según tus empresas e industria objetivo.' },
      { question: '¿Cómo me destaco como desarrollador Ruby?', answer: 'Demuestra experiencia en optimización de rendimiento, pruebas (RSpec, pruebas de sistema), procesamiento en segundo plano (Sidekiq) y características modernas de Rails (Hotwire, Turbo). Contribuir a gems de código abierto y mostrar experiencia en producción con aplicaciones Rails de alto tráfico te diferenciará.' }
    ]
  },
  'php': {
    slug: 'php',
    title: 'PHP',
    description: 'PHP (Hypertext Preprocessor) es un lenguaje de scripting del lado del servidor que impulsa aproximadamente el 77% de todos los sitios web con un lenguaje del lado del servidor conocido. Creado por Rasmus Lerdorf en 1994, PHP ha pasado por una modernización dramática. PHP 8.3 introdujo constantes de clase tipadas, la función json_validate y la clase Randomizer. PHP 8.x trajo compilación JIT, fibras para operaciones asíncronas, enums, argumentos nombrados y tipos de unión.\n\nEl ecosistema PHP está dominado por Laravel, el framework PHP más popular, junto con Symfony, que proporciona componentes reutilizables usados en todo el ecosistema. WordPress, el CMS más utilizado del mundo (impulsa el 43% de todos los sitios web), está construido sobre PHP. Composer sirve como gestor de dependencias, y PHPUnit es el framework de pruebas estándar. Otras aplicaciones PHP notables incluyen Drupal, Magento y MediaWiki.\n\nEl PHP moderno no se parece en nada a su reputación de principios de los 2000. PHP 8.x con Laravel proporciona seguridad de tipos, sintaxis elegante, sistemas de colas integrados, transmisión en tiempo real y capacidades ORM robustas. Empresas como Facebook (que creó Hack a partir de PHP), Slack, Wikipedia y Etsy dependen de PHP para sistemas en producción.',
    whyImportant: 'Los desarrolladores PHP siguen en alta demanda debido a la enorme base instalada de aplicaciones PHP. Los desarrolladores Laravel obtienen salarios medianos de $95,000-$130,000 en EE.UU., con arquitectos senior y especialistas WordPress ganando $150,000+.\n\nPHP en tu currículum abre puertas a un vasto mercado laboral que abarca agencias, empresas de e-commerce, organizaciones de medios y startups SaaS usando Laravel. El dominio del lenguaje en CMS y e-commerce significa que hay una demanda consistente y estable de desarrolladores PHP en prácticamente todas las industrias.',
    keywords: ['currículum desarrollador php', 'habilidades programación php', 'currículum desarrollador laravel', 'palabras clave php currículum'],
    searchIntents: ['cómo incluir php en currículum', 'consejos currículum desarrollador php', 'habilidades php laravel para empleo'],
    relatedSkills: ['Laravel', 'Symfony', 'WordPress', 'Composer', 'PHPUnit', 'MySQL', 'APIs REST', 'Redis', 'Eloquent ORM', 'Docker'],
    professionSlugs: ['desarrollador-web', 'desarrollador-backend', 'desarrollador-full-stack', 'desarrollador-de-software', 'ingeniero-de-software', 'disenador-web'],
    atsKeywords: ['PHP', 'Laravel', 'Symfony', 'WordPress', 'Composer', 'PHPUnit', 'MySQL', 'REST API', 'Eloquent', 'PHP 8', 'MVC', 'Redis'],
    resumeTips: [
      'Especifica PHP 8.x para indicar conocimiento de PHP moderno.',
      'Destaca la experiencia con frameworks Laravel o Symfony de forma prominente.',
      'Incluye desarrollo WordPress por separado si es relevante para el rol.',
      'Menciona prácticas de pruebas con PHPUnit y herramientas de calidad de código como PHPStan.',
      'Referencia herramientas de despliegue y DevOps (Docker, CI/CD) junto con PHP.'
    ],
    exampleBullets: [
      'Desarrollé una plataforma SaaS basada en Laravel sirviendo a 12,000 suscriptores activos, generando $3.8M en ingresos recurrentes anuales con 99.9% de disponibilidad.',
      'Optimicé un sitio WordPress de alto tráfico manejando 8 millones de vistas de página mensuales, reduciendo el tiempo de respuesta del servidor en un 65% mediante optimización de consultas y caché Redis.',
      'Construí una API REST PHP 8.2 con Laravel procesando 2 millones de llamadas API diarias, implementando límite de velocidad y autenticación OAuth2 para más de 150 integraciones de terceros.',
      'Migré una aplicación legacy PHP 5.6 a PHP 8.1 con Laravel, reduciendo la deuda técnica en un 40% y mejorando los tiempos de carga de página en un 50%.'
    ],
    faqs: [
      { question: '¿PHP sigue siendo una buena opción de carrera en 2025?', answer: 'Sí. PHP impulsa el 77% de los sitios web con lenguajes del lado del servidor conocidos, incluyendo WordPress, que ejecuta el 43% de todos los sitios web. Laravel ha modernizado significativamente el desarrollo PHP, y la demanda de desarrolladores PHP sigue fuerte, especialmente en e-commerce, gestión de contenido y trabajo en agencias.' },
      { question: '¿Debería aprender Laravel o Symfony?', answer: 'Laravel es más demandado y mejor para la mayoría de los roles de aplicaciones web. Symfony es valorado en entornos empresariales y sus componentes son usados por muchos proyectos incluyendo el propio Laravel. Comienza con Laravel para oportunidades laborales más amplias, y aprende Symfony si apuntas a posiciones empresariales.' },
      { question: '¿Cómo contrarresto el estigma de PHP en mi currículum?', answer: 'Enfócate en PHP moderno (8.x), destaca experiencia en Laravel o Symfony, y enfatiza prácticas de ingeniería de software como pruebas, CI/CD y patrones de diseño. Cuantifica logros con métricas. El desarrollo PHP moderno es profesional y bien arquitecturado; tu currículum debería reflejar eso.' }
    ]
  },
  'swift': {
    slug: 'swift',
    title: 'Swift',
    description: 'Swift es un lenguaje de programación potente e intuitivo desarrollado por Apple para construir aplicaciones en iOS, macOS, watchOS, tvOS y visionOS. Introducido en 2014 como sucesor de Objective-C, Swift se ha convertido rápidamente en el lenguaje principal para el desarrollo en plataformas Apple. Swift 5.9 introdujo macros, y Swift 5.10 agregó verificación de concurrencia completa. Swift 6.0 trae seguridad total contra carreras de datos por defecto, throws tipados y tipos no copiables.\n\nEl ecosistema Swift se centra alrededor de los frameworks de Apple: SwiftUI para desarrollo de UI declarativa, UIKit para UI imperativa tradicional, Combine para programación reactiva, y Swift Concurrency (async/await, actores) para código concurrente seguro. Swift del lado del servidor está creciendo con los frameworks Vapor y Hummingbird. Swift Package Manager (SPM) ha reemplazado en gran medida a CocoaPods y Carthage para gestión de dependencias.\n\nSwift combina características de seguridad como opcionales y tipos de valor con alto rendimiento comparable a C. Su paradigma de programación orientado a protocolos, sistema de genéricos y sintaxis expresiva lo hacen tanto potente como amigable para el desarrollador. Apple continúa invirtiendo fuertemente en Swift con actualizaciones anuales y soporte expandido de plataformas.',
    whyImportant: 'Swift es el lenguaje requerido para desarrollo iOS, que sigue siendo una de las especializaciones de desarrollo móvil mejor pagadas. Los desarrolladores iOS obtienen salarios medianos de $125,000-$160,000 en EE.UU., con roles senior en empresas tecnológicas top superando los $200,000.\n\nIncluir Swift en tu currículum es esencial para cualquier rol de desarrollo en plataformas Apple. La App Store genera más de $1 billón en facturación y ventas de desarrolladores, creando una demanda sostenida de desarrolladores Swift. La experiencia en SwiftUI es cada vez más requerida a medida que las empresas modernizan sus bases de código iOS.',
    keywords: ['currículum desarrollador swift', 'currículum programación swift', 'currículum desarrollador ios', 'habilidades swift currículum'],
    searchIntents: ['cómo incluir swift en currículum', 'consejos currículum desarrollador ios swift', 'habilidades swift para solicitud de empleo'],
    relatedSkills: ['SwiftUI', 'UIKit', 'Xcode', 'Desarrollo iOS', 'Combine', 'Core Data', 'Swift Concurrency', 'SPM', 'CocoaPods', 'Objective-C'],
    professionSlugs: ['desarrollador-ios', 'desarrollador-de-aplicaciones-moviles', 'ingeniero-de-software', 'desarrollador-de-software', 'desarrollador-full-stack', 'ingeniero-de-aplicaciones'],
    atsKeywords: ['Swift', 'SwiftUI', 'UIKit', 'iOS', 'Xcode', 'Combine', 'Core Data', 'async/await', 'SPM', 'MVVM', 'App Store', 'plataformas Apple'],
    resumeTips: [
      'Especifica la experiencia con versiones de Swift y menciona SwiftUI junto con UIKit.',
      'Incluye métricas de App Store como descargas, calificaciones o ingresos.',
      'Destaca patrones arquitectónicos utilizados (MVVM, Clean Architecture, TCA).',
      'Menciona experiencia en Swift Concurrency con async/await y actores.',
      'Referencia pruebas con XCTest y frameworks de pruebas de UI.'
    ],
    exampleBullets: [
      'Desarrollé una aplicación fintech basada en SwiftUI con 800,000 descargas y calificación de 4.8 estrellas en App Store, procesando $12M en transacciones mensuales.',
      'Migré una aplicación UIKit a SwiftUI, reduciendo el volumen de código UI en un 40% y mejorando la velocidad de desarrollo de nuevas funcionalidades en un 30%.',
      'Implementé Swift Concurrency en una aplicación iOS, eliminando el 95% de condiciones de carrera de datos y reduciendo la tasa de crashes del 0.8% al 0.05%.',
      'Construí un Swift Package compartido usado en 5 aplicaciones iOS, reduciendo código duplicado en 15,000 líneas y asegurando comportamiento consistente entre productos.'
    ],
    faqs: [
      { question: '¿Debería aprender SwiftUI o UIKit en 2025?', answer: 'Aprende ambos, pero prioriza SwiftUI para nuevos proyectos. La mayoría de las empresas todavía tienen bases de código UIKit que necesitan mantenimiento, por lo que el conocimiento de UIKit sigue siendo valioso. El desarrollo de nuevas funcionalidades usa cada vez más SwiftUI. Las ofertas de trabajo típicamente listan ambos, con SwiftUI siendo más prominente.' },
      { question: '¿Objective-C todavía vale la pena listarlo en mi currículum?', answer: 'Si tienes experiencia en Objective-C, inclúyelo como habilidad secundaria. Muchas bases de código iOS grandes todavía contienen Objective-C, y la experiencia en migración es valorada. Sin embargo, los roles exclusivamente de Objective-C son raros; Swift siempre debería ser tu lenguaje iOS principal listado.' },
      { question: '¿Cómo demuestro habilidades en Swift sin aplicaciones publicadas?', answer: 'Crea aplicaciones demo pulidas en GitHub que muestren SwiftUI, networking, persistencia y pruebas. Contribuye a proyectos Swift de código abierto. Incluye detalles técnicos como patrones de arquitectura, integración de API y optimizaciones de rendimiento en las descripciones de tus proyectos.' }
    ]
  },
  'kotlin': {
    slug: 'kotlin',
    title: 'Kotlin',
    description: 'Kotlin es un lenguaje de programación moderno y de tipado estático desarrollado por JetBrains que se ejecuta en la JVM, JavaScript y plataformas nativas. Desde que Google declaró Kotlin como el lenguaje preferido para desarrollo Android en 2019, se ha convertido en el lenguaje dominante para aplicaciones Android. Kotlin 2.0 introdujo el nuevo compilador K2, proporcionando tiempos de compilación hasta 2 veces más rápidos y sentando las bases para futuras características del lenguaje.\n\nEl ecosistema de Kotlin abarca múltiples plataformas: Jetpack Compose para UI declarativa de Android, Kotlin Multiplatform (KMP) para compartir código entre iOS, Android, web y escritorio, Ktor para desarrollo del lado del servidor, y Kotlin/JS para aplicaciones web. Kotlin Coroutines proporcionan concurrencia estructurada con un modelo más simple que el threading de Java. El lenguaje ofrece seguridad contra nulos, clases de datos, funciones de extensión, clases selladas y funciones en línea.\n\nKotlin es completamente interoperable con Java, lo que significa que puede usar cualquier biblioteca Java existente. Más del 95% de las 1,000 aplicaciones Android principales ahora incluyen código Kotlin. Empresas como Google, Netflix, Amazon y Uber usan Kotlin tanto para desarrollo Android como del lado del servidor.',
    whyImportant: 'Kotlin es el lenguaje más demandado para desarrollo Android, listado en más del 80% de las ofertas de trabajo Android. Los desarrolladores Kotlin obtienen salarios medianos de $120,000-$155,000 en EE.UU., con desarrolladores Android senior en empresas FAANG ganando $200,000+.\n\nIncluir Kotlin en tu currículum es esencial para roles de desarrollo Android y cada vez más valioso para posiciones backend. La experiencia en Kotlin Multiplatform es un diferenciador a medida que las empresas buscan compartir código entre plataformas. La competencia en Kotlin señala prácticas de desarrollo modernas y preferencia por código conciso y seguro en tipos.',
    keywords: ['currículum desarrollador kotlin', 'habilidades programación kotlin', 'currículum android kotlin', 'palabras clave kotlin currículum'],
    searchIntents: ['cómo incluir kotlin en currículum', 'consejos currículum desarrollador kotlin', 'habilidades kotlin android para currículum'],
    relatedSkills: ['Jetpack Compose', 'Android SDK', 'Coroutines', 'Kotlin Multiplatform', 'Ktor', 'Gradle', 'Interop Java', 'MVVM', 'Room', 'Dagger/Hilt'],
    professionSlugs: ['desarrollador-android', 'desarrollador-de-aplicaciones-moviles', 'ingeniero-de-software', 'desarrollador-backend', 'desarrollador-full-stack', 'desarrollador-de-software'],
    atsKeywords: ['Kotlin', 'Android', 'Jetpack Compose', 'Coroutines', 'Kotlin Multiplatform', 'KMP', 'Ktor', 'Gradle', 'MVVM', 'Room', 'Dagger', 'Hilt'],
    resumeTips: [
      'Combina Kotlin con Jetpack Compose para roles Android modernos.',
      'Menciona experiencia con Kotlin Coroutines para manejo de concurrencia.',
      'Destaca experiencia en Kotlin Multiplatform si aplica.',
      'Incluye métricas de Google Play Store para aplicaciones publicadas.',
      'Referencia características específicas de Kotlin como seguridad contra nulos y clases selladas en discusiones de arquitectura.'
    ],
    exampleBullets: [
      'Desarrollé una aplicación Android en Kotlin con Jetpack Compose alcanzando 2.5 millones de descargas y manteniendo una calificación de 4.6 estrellas en Google Play.',
      'Migré una base de código Java Android de 200,000 líneas a Kotlin, reduciendo el volumen de código en un 30% y excepciones de puntero nulo en un 90%.',
      'Implementé Kotlin Multiplatform (KMP) para compartir el 60% de la lógica de negocio entre iOS y Android, reduciendo el tiempo de desarrollo de funcionalidades en un 40%.',
      'Construí un microservicio basado en Ktor en Kotlin manejando 3 millones de solicitudes diarias con latencia p99 menor a 80ms, reemplazando un servicio legacy Java Spring.'
    ],
    faqs: [
      { question: '¿Debería aprender Kotlin o Java para desarrollo Android?', answer: 'Kotlin es la opción clara para nuevo desarrollo Android. Google recomienda Kotlin como el lenguaje preferido, Jetpack Compose requiere Kotlin, y la mayoría de las nuevas APIs Android son Kotlin-first. El conocimiento de Java es útil para mantener código legacy, pero Kotlin debería ser tu lenguaje Android principal.' },
      { question: '¿Kotlin se usa fuera del desarrollo Android?', answer: 'Sí. Kotlin está creciendo rápidamente en el lado del servidor con soporte de Ktor y Spring Boot. Kotlin Multiplatform permite bases de código compartidas entre iOS, Android, web y escritorio. Empresas como Amazon y Netflix usan Kotlin para servicios backend.' },
      { question: '¿Cómo demuestro experiencia en Kotlin más allá de Android básico?', answer: 'Destaca características específicas de Kotlin como coroutines para concurrencia estructurada, clases selladas para gestión de estado, funciones en línea para rendimiento y DSLs de Kotlin. Menciona Jetpack Compose para UI moderna y Kotlin Multiplatform para compartir código multiplataforma.' }
    ]
  },
  'go-programming': {
    slug: 'programacion-go',
    title: 'Go (Golang)',
    description: 'Go (Golang) es un lenguaje de programación de tipado estático y compilado diseñado en Google por Robert Griesemer, Rob Pike y Ken Thompson. Lanzado en 2009, Go fue creado para abordar los desafíos de construir software de servidor escalable y concurrente. Go 1.22 introdujo bucles for-range mejorados y routing mejorado en la biblioteca estándar. Go 1.23 agrega funciones iteradoras y herramientas mejoradas.\n\nEl ecosistema de Go impulsa la infraestructura nativa en la nube que ejecuta el internet moderno. Docker, Kubernetes, Terraform, Prometheus e Istio están todos escritos en Go. El lenguaje presenta concurrencia integrada con goroutines y channels, una biblioteca estándar potente, compilación rápida, salida de binario estático y recolección de basura. Los frameworks populares incluyen Gin, Echo y Fiber para servicios web, y gRPC para comunicación entre servicios.\n\nLa simplicidad de Go es intencional: tiene solo 25 palabras clave y evita características como exceso de genéricos (los genéricos se agregaron en 1.18 con restricciones cuidadosas), herencia y excepciones. Esto hace que las bases de código Go sean notablemente consistentes y legibles entre equipos, razón por la cual empresas como Google, Uber, Dropbox, Twitch y Cloudflare lo usan para su infraestructura más crítica.',
    whyImportant: 'Go es el lenguaje de la infraestructura nativa en la nube, haciéndolo esencial para roles de DevOps, ingeniería de plataformas y sistemas backend. Los desarrolladores Go obtienen salarios medianos de $130,000-$165,000 en EE.UU., posicionándose consistentemente entre las especializaciones de lenguaje mejor pagadas.\n\nIncluir Go en tu currículum es particularmente valioso para posiciones de infraestructura en la nube, microservicios y DevOps. La competencia en Go señala experiencia en construir sistemas concurrentes de alto rendimiento y familiaridad con el ecosistema nativo en la nube que impulsa la ingeniería de plataformas moderna.',
    keywords: ['currículum desarrollador golang', 'habilidades programación go', 'palabras clave golang currículum', 'currículum desarrollador go'],
    searchIntents: ['cómo incluir golang en currículum', 'consejos currículum desarrollador go', 'habilidades golang para trabajos en la nube'],
    relatedSkills: ['Docker', 'Kubernetes', 'gRPC', 'Microservicios', 'Concurrencia', 'Gin', 'Terraform', 'Prometheus', 'Cloud Native', 'APIs REST'],
    professionSlugs: ['desarrollador-backend', 'ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-software', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-plataforma', 'ingeniero-de-infraestructura'],
    atsKeywords: ['Go', 'Golang', 'goroutines', 'channels', 'Docker', 'Kubernetes', 'gRPC', 'microservicios', 'concurrencia', 'REST API', 'cloud native', 'Terraform'],
    resumeTips: [
      'Lista como "Go (Golang)" ya que los reclutadores buscan ambos términos.',
      'Destaca experiencia en concurrencia con goroutines y channels.',
      'Menciona herramientas nativas en la nube construidas en Go que usas (Docker, Kubernetes, Terraform).',
      'Incluye experiencia en desarrollo de microservicios y APIs.',
      'Referencia benchmarks de rendimiento y métricas de escalabilidad.'
    ],
    exampleBullets: [
      'Construí una plataforma de microservicios en Go manejando 100 millones de solicitudes API diarias con latencia p99 menor a 15ms, soportando un aumento del 300% en tráfico sin infraestructura adicional.',
      'Desarrollé una herramienta CLI basada en Go adoptada por más de 500 desarrolladores internamente, automatizando flujos de trabajo de despliegue y reduciendo el tiempo de lanzamiento de 2 horas a 10 minutos.',
      'Creé un operador personalizado de Kubernetes en Go gestionando más de 2,000 pods en 3 clústeres, automatizando escalado y auto-recuperación con cero intervención manual.',
      'Migré un servicio de procesamiento de datos en Python a Go, logrando una mejora de rendimiento de 12x y reduciendo costos de cómputo en la nube en $96,000 anuales.'
    ],
    faqs: [
      { question: '¿Debería listar Go o Golang en mi currículum?', answer: 'Lista ambos: "Go (Golang)" ya que diferentes empresas y sistemas ATS buscan diferentes términos. El nombre oficial es Go, pero Golang se usa ampliamente por capacidad de búsqueda y para distinguirlo del juego de mesa.' },
      { question: '¿Go solo es útil para infraestructura y DevOps?', answer: 'No. Aunque Go domina la infraestructura nativa en la nube, también es excelente para APIs web, herramientas CLI, pipelines de datos y aplicaciones de red. Empresas como Uber usan Go para su servicio principal de asignación de viajes, y Twitch lo usa para su infraestructura de chat.' },
      { question: '¿Cómo se compara Go con Rust para programación de sistemas?', answer: 'Go prioriza simplicidad, compilación rápida y productividad del desarrollador con recolección de basura. Rust prioriza seguridad de memoria sin recolección de basura y abstracciones de costo cero. Go es más adecuado para servicios en red e infraestructura en la nube; Rust para sistemas embebidos y aplicaciones donde el rendimiento es crítico y las pausas de GC son inaceptables.' }
    ]
  },
  'rust-programming': {
    slug: 'programacion-rust',
    title: 'Rust',
    description: 'Rust es un lenguaje de programación de sistemas enfocado en seguridad, velocidad y concurrencia. Desarrollado por Mozilla Research y lanzado por primera vez en 2015, Rust ha sido votado como el lenguaje de programación más admirado en la Encuesta de Desarrolladores de Stack Overflow durante ocho años consecutivos. La edición 2024 de Rust introdujo closures asíncronos, bloques gen y ergonomía mejorada. El lenguaje sigue un ciclo de lanzamiento de seis semanas.\n\nEl sistema de propiedad de Rust elimina clases enteras de errores—desreferencias de puntero nulo, carreras de datos, desbordamientos de búfer y uso después de liberación—en tiempo de compilación sin sobrecarga en tiempo de ejecución. El ecosistema incluye Cargo para gestión de paquetes y builds, Tokio para runtime asíncrono, Actix y Axum para frameworks web, y Serde para serialización. Rust compila a código nativo y puede apuntar a WebAssembly.\n\nRust es cada vez más adoptado para infraestructura crítica: desarrollo del kernel Linux (Rust es ahora un lenguaje oficial del kernel), Android (Google usa Rust para nuevos componentes del SO), Cloudflare Workers, los servicios principales de Discord, el motor de sincronización de Dropbox y Firecracker de Amazon para virtualización. Microsoft, Google y Amazon están entre los mayores contribuidores corporativos a Rust.',
    whyImportant: 'La demanda de desarrolladores Rust está creciendo más rápido que cualquier otro lenguaje de sistemas, con ofertas de trabajo aumentando más del 200% año tras año en encuestas recientes. Los desarrolladores Rust obtienen salarios medianos de $135,000-$170,000 en EE.UU., entre los más altos para cualquier lenguaje de programación.\n\nIncluir Rust en tu currículum señala experiencia de vanguardia en programación de sistemas. Es cada vez más requerido para roles de infraestructura, seguridad crítica y rendimiento sensible. Las empresas que buscan específicamente desarrolladores Rust a menudo ofrecen compensación premium debido al pool de talento relativamente pequeño.',
    keywords: ['currículum desarrollador rust', 'habilidades programación rust', 'currículum lenguaje rust', 'requisitos trabajo rust'],
    searchIntents: ['cómo incluir rust en currículum', 'consejos currículum desarrollador rust', 'oportunidades de carrera programación rust'],
    relatedSkills: ['Programación de Sistemas', 'Seguridad de Memoria', 'Modelo de Propiedad', 'Tokio', 'Actix', 'WebAssembly', 'Cargo', 'Concurrencia', 'C++', 'Kernel Linux'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'desarrollador-embebido', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'desarrollador-de-blockchain', 'ingeniero-de-ciberseguridad'],
    atsKeywords: ['Rust', 'ownership', 'borrowing', 'Tokio', 'async/await', 'Cargo', 'WebAssembly', 'WASM', 'programación de sistemas', 'seguridad de memoria', 'concurrencia', 'abstracciones de costo cero'],
    resumeTips: [
      'Destaca el modelo de propiedad y los beneficios de seguridad de memoria en las descripciones de proyectos.',
      'Menciona runtimes asíncronos específicos (Tokio) y frameworks web (Actix, Axum).',
      'Incluye comparaciones de rendimiento vs. implementaciones en lenguajes anteriores.',
      'Referencia experiencia con WebAssembly si aplica.',
      'Enfatiza conceptos específicos de Rust como lifetimes, traits y abstracciones de costo cero.'
    ],
    exampleBullets: [
      'Reescribí un proxy de red C++ en Rust, eliminando todos los CVE relacionados con memoria mientras mantenía un rendimiento idéntico de 500,000 conexiones concurrentes.',
      'Desarrollé un pipeline de datos basado en Rust con Tokio procesando 2TB de datos diarios, logrando una mejora de rendimiento de 8x sobre el predecesor en Python y reduciendo costos en la nube en $180,000 anuales.',
      'Construí un módulo WebAssembly en Rust para procesamiento de imágenes en el navegador, logrando una ejecución 15x más rápida que la implementación JavaScript y reduciendo el tiempo de procesamiento del lado del cliente de 12s a 0.8s.',
      'Contribuí a una biblioteca de criptografía de código abierto en Rust usada por más de 3,000 proyectos, implementando algoritmos de tiempo constante y pasando la validación FIPS 140-2.'
    ],
    faqs: [
      { question: '¿Rust es difícil de aprender, y vale la inversión?', answer: 'Rust tiene una curva de aprendizaje más pronunciada que la mayoría de los lenguajes debido a su sistema de propiedad y verificador de préstamos. Sin embargo, la inversión se paga significativamente: los desarrolladores Rust obtienen salarios premium, el crecimiento laboral es excepcional, y las habilidades se transfieren a una comprensión más profunda de sistemas. La mayoría de los desarrolladores reportan competencia dentro de 3-6 meses.' },
      { question: '¿Puedo conseguir un trabajo en Rust sin experiencia profesional?', answer: 'Sí, pero necesitas pruebas sólidas de competencia. Contribuye a proyectos de código abierto en Rust, construye aplicaciones no triviales y demuestra comprensión del modelo de propiedad. La comunidad Rust es acogedora, y muchas empresas contratan desarrolladores Rust de lenguajes adyacentes (C++, Go) con aprendizaje demostrado en Rust.' },
      { question: '¿Debería aprender Rust o Go para desarrollo backend?', answer: 'Depende del dominio. Go es mejor para servicios en la nube, herramientas DevOps y desarrollo rápido de APIs. Rust es mejor para servicios donde el rendimiento es crítico, aplicaciones sensibles a la seguridad y sistemas donde las pausas de recolección de basura son inaceptables. Rust tiene una curva más pronunciada pero ofrece más diferenciación profesional.' }
    ]
  },
  'scala': {
    slug: 'scala',
    title: 'Scala',
    description: 'Scala es un lenguaje de programación de tipado estático que fusiona paradigmas de programación orientada a objetos y funcional. Ejecutándose en la JVM, Scala fue creado por Martin Odersky y lanzado por primera vez en 2004. Scala 3 (Dotty) introdujo un sistema de tipos completamente rediseñado con tipos de unión, tipos de intersección, alias de tipos opacos y una nueva sintaxis con espaciado significativo. Scala 3.4 continúa refinando estas características.\n\nScala es particularmente prominente en big data y computación distribuida. Apache Spark, el framework dominante de procesamiento de big data, está escrito en Scala. Otros proyectos principales de Scala incluyen Apache Kafka (originalmente), Akka/Pekko para concurrencia basada en actores, Play Framework para desarrollo web, y el ecosistema Typelevel (Cats, http4s, fs2) para programación puramente funcional. sbt es la herramienta de construcción principal.\n\nScala impulsa pipelines de ingeniería de datos en empresas como LinkedIn, Twitter (X), Netflix, Airbnb y Morgan Stanley. Su sistema de tipos expresivo, coincidencia de patrones, clases case y funciones de orden superior permiten construir sistemas distribuidos robustos y concurrentes con menos errores.',
    whyImportant: 'Los desarrolladores Scala son altamente valorados en ingeniería de datos, big data y servicios financieros. Los desarrolladores Scala obtienen salarios medianos de $135,000-$170,000 en EE.UU., con roles de finanzas cuantitativas en Scala alcanzando $200,000+.\n\nIncluir Scala en tu currículum te posiciona para roles bien pagados en ingeniería de datos y sistemas distribuidos. La competencia en Scala señala experiencia tanto en programación funcional como en el ecosistema JVM, y es a menudo un requisito para equipos que usan Apache Spark para procesamiento de datos a gran escala.',
    keywords: ['currículum desarrollador scala', 'habilidades programación scala', 'palabras clave scala currículum', 'currículum scala big data'],
    searchIntents: ['cómo incluir scala en currículum', 'consejos currículum desarrollador scala', 'habilidades scala para ingeniería de datos'],
    relatedSkills: ['Apache Spark', 'Akka', 'Play Framework', 'Programación Funcional', 'Cats', 'sbt', 'Kafka', 'JVM', 'Big Data', 'Sistemas Distribuidos'],
    professionSlugs: ['ingeniero-de-datos', 'ingeniero-de-software', 'desarrollador-backend', 'arquitecto-de-datos', 'cientifico-de-datos', 'arquitecto-de-soluciones'],
    atsKeywords: ['Scala', 'Apache Spark', 'Akka', 'Play Framework', 'sbt', 'programación funcional', 'JVM', 'Kafka', 'big data', 'sistemas distribuidos', 'Cats', 'coincidencia de patrones'],
    resumeTips: [
      'Combina Scala con Apache Spark para roles de ingeniería de datos.',
      'Destaca conceptos de programación funcional como inmutabilidad y funciones de orden superior.',
      'Menciona características específicas de Scala 3 si tienes experiencia con la última versión.',
      'Incluye métricas de volumen de datos y velocidad de procesamiento.',
      'Referencia frameworks de concurrencia como Akka o Cats Effect.'
    ],
    exampleBullets: [
      'Construí pipelines Apache Spark en Scala procesando 50TB de datos diarios en un clúster de 200 nodos, reduciendo el tiempo de procesamiento por lotes de 8 horas a 45 minutos.',
      'Desarrollé un sistema de procesamiento de eventos en tiempo real basado en Akka manejando 1 millón de eventos por segundo con garantías de entrega exactamente una vez.',
      'Migré un pipeline de datos Java a Scala con Cats Effect, reduciendo la base de código en un 35% mientras agregaba manejo de errores con seguridad de tipos que eliminó el 80% de las excepciones en tiempo de ejecución.',
      'Diseñé una plataforma de ingeniería de características basada en Scala que aceleró la preparación de datos de entrenamiento de ML en un 60%, soportando 15 equipos de ciencia de datos.'
    ],
    faqs: [
      { question: '¿Scala sigue siendo relevante con PySpark disponible?', answer: 'Sí. Aunque PySpark es popular para ciencia de datos, Scala sigue siendo el lenguaje nativo de Spark y ofrece mejor rendimiento, acceso completo a la API y seguridad de tipos. Los equipos de ingeniería de datos a escala a menudo prefieren Scala para pipelines Spark en producción. Ambos lenguajes son valiosos y se complementan.' },
      { question: '¿Debería aprender Scala 2 o Scala 3?', answer: 'Aprende Scala 3 para nuevos proyectos, pero prepárate para trabajar con bases de código Scala 2. La mayoría del código Scala en producción todavía es Scala 2.13.x, con la migración a Scala 3 en curso. Entender ambos asegura máxima empleabilidad.' },
      { question: '¿Cómo hago la transición de Java a Scala?', answer: 'Comienza escribiendo Scala al estilo Java, luego adopta gradualmente patrones funcionales: valores inmutables, clases case, coincidencia de patrones y funciones de orden superior. Construye un proyecto Spark para aplicar Scala en un contexto práctico. La interoperabilidad JVM significa que tu conocimiento del ecosistema Java se transfiere directamente.' }
    ]
  },
  'perl': {
    slug: 'perl',
    title: 'Perl',
    description: 'Perl es un lenguaje de programación de alto nivel y propósito general conocido por sus potentes capacidades de procesamiento de texto. Creado por Larry Wall en 1987, Perl fue diseñado originalmente para procesamiento de reportes y ha sido llamado la "navaja suiza con motor" de los lenguajes de programación. Perl 5.38 es la versión estable actual, con mejoras continuas al lenguaje incluyendo el operador isa, sintaxis try/catch y características de firma.\n\nPerl sobresale en manipulación de texto, expresiones regulares (que fue pionero en lenguajes de programación), scripting de administración de sistemas y bioinformática. La Comprehensive Perl Archive Network (CPAN) aloja más de 200,000 módulos. Los frameworks principales de Perl incluyen Mojolicious y Dancer2 para desarrollo web, y DBI para interacción con bases de datos. Perl está profundamente integrado en la administración de sistemas Unix/Linux.\n\nPerl sigue siendo crítico en mantenimiento de sistemas legados, pipelines de bioinformática, procesamiento de logs y administración de redes. Empresas como Booking.com, DuckDuckGo y muchas instituciones financieras mantienen bases de código Perl significativas. El motor de regex del lenguaje está entre los más potentes disponibles en cualquier lenguaje.',
    whyImportant: 'Los desarrolladores Perl son buscados para mantenimiento de grandes sistemas legados, bioinformática y administración de sistemas. Los desarrolladores Perl obtienen salarios medianos de $110,000-$140,000 en EE.UU., con desarrolladores experimentados que mantienen infraestructura crítica ganando tarifas premium.\n\nIncluir Perl en tu currículum es valioso para administración de sistemas, bioinformática y roles en empresas con bases de código Perl establecidas. Demuestra fuertes habilidades de procesamiento de texto y capacidad para trabajar con sistemas legados, un conjunto de habilidades que obtiene compensación competitiva debido al pool de talento en reducción.',
    keywords: ['currículum desarrollador perl', 'habilidades programación perl', 'palabras clave perl currículum', 'requisitos trabajo perl'],
    searchIntents: ['cómo incluir perl en currículum', 'consejos currículum desarrollador perl', 'mercado laboral programación perl'],
    relatedSkills: ['Expresiones Regulares', 'CPAN', 'Unix/Linux', 'Bash', 'Procesamiento de Texto', 'CGI', 'Mojolicious', 'DBI', 'Bioinformática', 'Administración de Sistemas'],
    professionSlugs: ['administrador-de-sistemas', 'ingeniero-de-software', 'ingeniero-de-redes', 'ingeniero-devops', 'desarrollador-backend', 'ingeniero-de-datos'],
    atsKeywords: ['Perl', 'CPAN', 'expresiones regulares', 'regex', 'procesamiento de texto', 'scripting', 'Unix', 'Linux', 'Mojolicious', 'administración de sistemas', 'automatización', 'bioinformática'],
    resumeTips: [
      'Combina Perl con contexto de administración de sistemas o bioinformática.',
      'Destaca experiencia en expresiones regulares y logros en procesamiento de texto.',
      'Menciona módulos CPAN y frameworks que has utilizado.',
      'Incluye experiencia en mantenimiento y migración de sistemas legados.',
      'Referencia logros de automatización y scripting con resultados medibles.'
    ],
    exampleBullets: [
      'Mantuve un sistema de procesamiento de transacciones financieras basado en Perl manejando $500M en operaciones diarias, logrando 99.99% de precisión y cero pérdida de datos durante 3 años.',
      'Desarrollé scripts Perl automatizando análisis de logs en 2,000 servidores, reduciendo el tiempo de detección de incidentes de 45 minutos a menos de 3 minutos.',
      'Construí un pipeline de bioinformática en Perl procesando 10TB de datos genómicos semanalmente, reduciendo el tiempo de análisis de 5 días a 8 horas.',
      'Migré aplicaciones CGI legacy en Perl a Mojolicious, mejorando tiempos de respuesta en un 70% y permitiendo despliegue moderno mediante contenedores Docker.'
    ],
    faqs: [
      { question: '¿Perl todavía vale la pena listarlo en un currículum?', answer: 'Sí, especialmente para administración de sistemas, bioinformática y roles en empresas con sistemas Perl legados. El pool de talento Perl en reducción significa que los desarrolladores Perl experimentados obtienen salarios competitivos. Si tienes experiencia en Perl, te diferencia para roles específicos de alto valor.' },
      { question: '¿Debería aprender Perl o Python para procesamiento de texto?', answer: 'Python es más ampliamente aplicable, pero Perl todavía tiene capacidades superiores de regex en una línea y está profundamente integrado en muchos entornos de infraestructura. Aprende Python para versatilidad general, pero la experiencia en Perl es valiosa en bioinformática y mantenimiento de infraestructura legacy.' },
      { question: '¿Cómo presento experiencia en Perl en un currículum moderno?', answer: 'Enmarca las habilidades de Perl dentro de contextos modernos: automatización, scripting DevOps, mantenimiento de pipelines de datos y confiabilidad del sistema. Menciona Perl junto con otras herramientas en tu stack para mostrar que es parte de un conjunto de habilidades más amplio en lugar de tu único lenguaje.' }
    ]
  },
  'r-programming': {
    slug: 'programacion-r',
    title: 'Programación R',
    description: 'R es un lenguaje de programación y entorno diseñado para computación estadística y visualización de datos. Desarrollado por Ross Ihaka y Robert Gentleman en la Universidad de Auckland, R se ha convertido en la herramienta estándar en estadística académica y se usa ampliamente en ciencia de datos. R 4.4 introdujo mejoras en el soporte del operador pipe e instalación mejorada de paquetes. El lenguaje está respaldado por la R Foundation y una activa comunidad de código abierto.\n\nLa fortaleza de R reside en sus capacidades de computación estadística y su ecosistema de visualización. La colección tidyverse (ggplot2, dplyr, tidyr, purrr) proporciona una interfaz moderna y consistente para manipulación y visualización de datos. R Shiny permite construir aplicaciones web interactivas directamente desde código R. Bioconductor proporciona herramientas para análisis de datos genómicos. RStudio (ahora Posit) es el IDE principal, y R Markdown/Quarto permiten documentos de investigación reproducibles.\n\nR tiene más de 20,000 paquetes en CRAN cubriendo cada método estadístico imaginable. Es el lenguaje preferido para bioestadística, epidemiología, ensayos clínicos, investigación académica y muchos roles de análisis de datos en farmacéuticas y salud.',
    whyImportant: 'R es esencial para análisis estadístico, bioestadística y roles académicos de ciencia de datos. Los programadores R obtienen salarios medianos de $100,000-$135,000 en EE.UU., con bioestadísticos y científicos de datos farmacéuticos ganando $150,000+.\n\nIncluir R en tu currículum es particularmente valioso para instituciones de salud, farmacéuticas, investigación y académicas. La competencia en R señala conocimiento estadístico profundo y experiencia en visualización de datos. Para roles que requieren análisis estadístico regulatorio (envíos a la FDA, ensayos clínicos), R es frecuentemente obligatorio.',
    keywords: ['currículum programación r', 'habilidades lenguaje r currículum', 'currículum desarrollador r', 'currículum r estadística'],
    searchIntents: ['cómo incluir r en currículum', 'habilidades programación r para ciencia de datos', 'ejemplos currículum lenguaje r'],
    relatedSkills: ['ggplot2', 'tidyverse', 'R Shiny', 'dplyr', 'Modelado Estadístico', 'Bioconductor', 'RStudio', 'R Markdown', 'Aprendizaje Automático', 'Visualización de Datos'],
    professionSlugs: ['cientifico-de-datos', 'analista-de-datos', 'desarrollador-de-bi', 'ingeniero-de-machine-learning', 'ingeniero-de-software', 'ingeniero-de-datos'],
    atsKeywords: ['R', 'programación R', 'ggplot2', 'tidyverse', 'dplyr', 'R Shiny', 'análisis estadístico', 'visualización de datos', 'RStudio', 'CRAN', 'regresión', 'aprendizaje automático'],
    resumeTips: [
      'Lista como "R" o "Programación R" para distinguir de otras abreviaciones de una letra.',
      'Destaca métodos estadísticos específicos y paquetes utilizados.',
      'Menciona R Shiny para experiencia en dashboards interactivos.',
      'Incluye competencia en tidyverse ya que es el estándar moderno de R.',
      'Referencia investigación reproducible con R Markdown o Quarto.'
    ],
    exampleBullets: [
      'Construí dashboards R Shiny usados por 300 partes interesadas en 5 departamentos, reduciendo el volumen de solicitudes de datos ad-hoc en un 65% y ahorrando 200 horas de analistas mensuales.',
      'Desarrollé un modelo predictivo en R logrando 91% de precisión para riesgo de reingreso de pacientes, permitiendo intervenciones dirigidas que redujeron los reingresos en un 23%.',
      'Automaticé un flujo de trabajo de 40 reportes mensuales de analítica usando R y R Markdown, reduciendo el tiempo de generación de reportes de 5 días a 4 horas con cero errores manuales.',
      'Realicé análisis estadístico de un conjunto de datos de ensayo clínico de 500,000 pacientes en R, produciendo envíos regulatorios listos para la FDA un 30% más rápido que los procesos manuales anteriores.'
    ],
    faqs: [
      { question: '¿Debería aprender R o Python para ciencia de datos?', answer: 'Ambos son valiosos. Python es más versátil y mejor para sistemas ML en producción. R sobresale en análisis estadístico, visualización e investigación académica. Para salud y biotecnología, R es frecuentemente preferido. Para empresas tecnológicas, Python domina. Aprender ambos maximiza tus oportunidades.' },
      { question: '¿R es relevante para trabajos en la industria o solo para la academia?', answer: 'R se usa ampliamente en la industria, particularmente en salud, farmacéuticas, finanzas y seguros para análisis estadístico y reportes. Los dashboards R Shiny son comunes en inteligencia de negocios. Sin embargo, para roles de datos enfocados en ingeniería de software, Python es más comúnmente requerido.' },
      { question: '¿Cómo listo R en mi currículum para que los sistemas ATS lo reconozcan?', answer: 'Escribe "Programación R" o "R (Programación Estadística)" para asegurar el reconocimiento ATS, ya que una sola letra "R" puede no ser detectada. También lista paquetes específicos como ggplot2, tidyverse y Shiny como palabras clave separadas para maximizar la coincidencia.' }
    ]
  },
  'matlab': {
    slug: 'matlab',
    title: 'MATLAB',
    description: 'MATLAB (Matrix Laboratory) es un entorno de computación numérica propietario desarrollado por MathWorks. Lanzado por primera vez en 1984, MATLAB es el estándar de la industria para análisis numérico, procesamiento de señales, sistemas de control y simulación de ingeniería. MATLAB R2024b incluye generación de código asistida por IA, toolbox de deep learning mejorado e integración mejorada con Simulink.\n\nLos toolboxes de MATLAB proporcionan funcionalidad especializada: Signal Processing Toolbox, Control System Toolbox, Image Processing Toolbox, Deep Learning Toolbox y Simulink para diseño basado en modelos. MATLAB está profundamente integrado en flujos de trabajo de ingeniería en aeroespacial, automotriz, telecomunicaciones y robótica. Soporta generación de código a C, C++ y HDL para despliegue embebido.\n\nMATLAB sobresale en operaciones con matrices, prototipado de algoritmos y visualización de ingeniería. Su editor en vivo soporta notebooks interactivos, y MATLAB Online permite acceso basado en navegador. Aunque Python ha capturado parte del mercado de ciencia de datos de MATLAB, MATLAB sigue siendo dominante en ingeniería de sistemas de control, procesamiento de señales y generación de código embebido.',
    whyImportant: 'MATLAB es una habilidad requerida en muchos dominios de ingeniería incluyendo aeroespacial, automotriz, telecomunicaciones y defensa. Los ingenieros con habilidades en MATLAB obtienen salarios medianos de $110,000-$145,000 en EE.UU., con roles especializados en sistemas de control y procesamiento de señales ganando $160,000+.\n\nIncluir MATLAB en tu currículum es esencial para roles de ingeniería que involucran simulación, sistemas de control, procesamiento de señales o diseño basado en modelos. La competencia en MATLAB demuestra habilidades de computación matemática e ingeniería aplicada valoradas en industrias donde Python solo no es suficiente.',
    keywords: ['habilidades matlab currículum', 'currículum programación matlab', 'currículum ingeniero matlab', 'requisitos trabajo matlab'],
    searchIntents: ['cómo incluir matlab en currículum', 'habilidades matlab para trabajos de ingeniería', 'consejos currículum matlab'],
    relatedSkills: ['Simulink', 'Procesamiento de Señales', 'Sistemas de Control', 'Procesamiento de Imágenes', 'Deep Learning Toolbox', 'Python', 'Generación de Código C', 'Álgebra Lineal', 'Métodos Numéricos', 'DSP'],
    professionSlugs: ['ingeniero-de-robotica', 'ingeniero-de-control', 'cientifico-de-datos', 'ingeniero-embebido', 'ingeniero-de-software', 'analista-de-datos'],
    atsKeywords: ['MATLAB', 'Simulink', 'procesamiento de señales', 'sistemas de control', 'análisis numérico', 'MathWorks', 'toolbox', 'desarrollo de algoritmos', 'diseño basado en modelos', 'generación de código', 'DSP', 'procesamiento de imágenes'],
    resumeTips: [
      'Especifica los toolboxes de MATLAB relevantes para el rol objetivo.',
      'Menciona experiencia en Simulink para posiciones de diseño basado en modelos.',
      'Destaca generación de código a C/C++ para roles de sistemas embebidos.',
      'Incluye experiencia en desarrollo y prototipado de algoritmos.',
      'Referencia dominios de ingeniería específicos donde aplicaste MATLAB.'
    ],
    exampleBullets: [
      'Desarrollé algoritmos de control MATLAB/Simulink para un dron autónomo, logrando vuelo estable en vientos cruzados de 30 nudos y reduciendo el tiempo de desarrollo en un 40% mediante diseño basado en modelos.',
      'Construí un pipeline de procesamiento de señales en MATLAB para pruebas de comunicaciones 5G, analizando 500GB de datos RF e identificando patrones de interferencia que mejoraron la calidad de señal en un 28%.',
      'Creé un modelo de mantenimiento predictivo basado en MATLAB para turbinas industriales, detectando fallas 72 horas por adelantado con 96% de precisión y previniendo $2.1M en tiempo de inactividad no planificado.',
      'Automaticé la generación de código MATLAB-a-C para un sistema de radar embebido, reduciendo el esfuerzo de codificación manual en un 60% y logrando rendimiento idéntico a implementaciones optimizadas manualmente.'
    ],
    faqs: [
      { question: '¿MATLAB está siendo reemplazado por Python?', answer: 'Python ha capturado parte del mercado de MATLAB en ciencia de datos general, pero MATLAB sigue siendo dominante en ingeniería de sistemas de control, procesamiento de señales y generación de código embebido. Industrias como aeroespacial, automotriz y defensa continúan dependiendo de MATLAB por sus toolboxes especializados e integración con Simulink.' },
      { question: '¿Debería incluir MATLAB en un currículum de ingeniería de software?', answer: 'Solo si el rol involucra computación numérica, simulación de ingeniería o sistemas embebidos. Para roles generales de ingeniería de software, Python con NumPy/SciPy es más relevante. Para posiciones enfocadas en ingeniería, MATLAB es un fuerte diferenciador.' },
      { question: '¿Cómo demuestro experiencia en MATLAB más allá del scripting básico?', answer: 'Menciona toolboxes específicos, diseño basado en modelos con Simulink, flujos de trabajo de generación de código y desarrollo de algoritmos personalizados. Destaca investigación publicada o patentes que usaron MATLAB, y cuantifica resultados de ingeniería como mejoras de precisión o reducción de tiempo de desarrollo.' }
    ]
  },
  'julia': {
    slug: 'julia',
    title: 'Julia',
    description: 'Julia es un lenguaje de programación de alto rendimiento y tipado dinámico diseñado para computación científica. Creado en MIT y lanzado por primera vez en 2012, Julia aborda el "problema de los dos lenguajes" combinando la facilidad de Python con la velocidad de C. Julia 1.10 introdujo mejoras en el tiempo de carga de paquetes, y Julia 1.11 agrega gestión de memoria mejorada y procesamiento de cadenas. Julia usa LLVM para compilación just-in-time.\n\nEl ecosistema de Julia apunta a la computación de alto rendimiento: Flux.jl para aprendizaje automático, DifferentialEquations.jl para resolver EDOs y EDPs, JuMP para optimización matemática, Pluto.jl para notebooks reactivos y Makie.jl para visualización. Julia soporta despacho múltiple como su paradigma central, computación GPU vía CUDA.jl y computación distribuida. Puede llamar bibliotecas C, Fortran, Python y R directamente.\n\nJulia se usa en NASA, Federal Reserve Bank de Nueva York, Pfizer, AstraZeneca y BlackRock para computación científica donde el rendimiento es crítico. Es particularmente fuerte en modelado climático, farmacometría, finanzas cuantitativas y biología computacional donde la velocidad de Python es insuficiente.',
    whyImportant: 'Julia es un lenguaje de nicho en crecimiento con alta demanda en computación científica, finanzas cuantitativas e investigación farmacéutica. Los desarrolladores Julia obtienen salarios medianos de $120,000-$160,000, con compensación premium en finanzas cuantitativas.\n\nIncluir Julia en tu currículum te diferencia en roles de computación científica e investigación. Señala experiencia en computación numérica de alto rendimiento y te posiciona para roles donde las limitaciones de rendimiento de Python son un cuello de botella real.',
    keywords: ['currículum programación julia', 'habilidades lenguaje julia', 'currículum desarrollador julia', 'julia computación científica'],
    searchIntents: ['cómo incluir julia en currículum', 'mercado laboral programación julia', 'julia vs python para ciencia de datos'],
    relatedSkills: ['Computación Científica', 'Flux.jl', 'DifferentialEquations.jl', 'JuMP', 'LLVM', 'Computación GPU', 'Python', 'Métodos Numéricos', 'Computación de Alto Rendimiento', 'Despacho Múltiple'],
    professionSlugs: ['cientifico-de-datos', 'ingeniero-de-machine-learning', 'ingeniero-de-software', 'ingeniero-de-datos', 'ingeniero-de-robotica', 'analista-de-datos'],
    atsKeywords: ['Julia', 'computación científica', 'análisis numérico', 'computación de alto rendimiento', 'Flux.jl', 'computación GPU', 'LLVM', 'optimización matemática', 'JuMP', 'ecuaciones diferenciales', 'aprendizaje automático', 'computación paralela'],
    resumeTips: [
      'Combina Julia con el dominio científico específico en el que la aplicaste.',
      'Destaca comparaciones de rendimiento vs. implementaciones en Python o MATLAB.',
      'Menciona paquetes Julia específicos relevantes para el rol objetivo.',
      'Incluye experiencia en HPC y computación GPU.',
      'Referencia investigación publicada o contribuciones de código abierto usando Julia.'
    ],
    exampleBullets: [
      'Desarrollé un modelo de simulación climática basado en Julia logrando una aceleración de 50x sobre el equivalente en Python, permitiendo pronósticos diarios que previamente tomaban una semana en computar.',
      'Construí un pipeline de modelado farmacocinético en Julia procesando datos de ensayos clínicos de 12,000 pacientes, reduciendo el tiempo de ajuste de modelos de 36 horas a 90 minutos.',
      'Creé un sistema de optimización de portafolio en Julia para un fondo de $2B usando JuMP, calculando asignaciones óptimas en 5,000 activos en menos de 10 segundos.',
      'Implementé entrenamiento de deep learning acelerado por GPU en Julia con Flux.jl, logrando tiempos de entrenamiento 3x más rápidos que implementaciones equivalentes en PyTorch para arquitecturas personalizadas.'
    ],
    faqs: [
      { question: '¿Julia es lo suficientemente maduro para uso en producción?', answer: 'Julia 1.x es estable y se usa en producción en organizaciones importantes incluyendo la Reserva Federal, Pfizer y NASA. El ecosistema de paquetes es más pequeño que el de Python pero robusto para computación científica. Julia está listo para producción en cargas de trabajo de computación numérica donde el rendimiento es crítico.' },
      { question: '¿Debería aprender Julia o quedarme con Python?', answer: 'Aprende Julia si trabajas en computación científica, finanzas cuantitativas o ciencia computacional donde la velocidad de Python es un cuello de botella. Python sigue siendo la mejor opción de propósito general. Julia es un complemento valioso para Python, no un reemplazo completo.' },
      { question: '¿Cómo demuestro habilidades en Julia a los empleadores?', answer: 'Contribuye a paquetes Julia, publica benchmarks comparando Julia con Python/MATLAB para problemas relevantes y muestra proyectos de código abierto. Destaca mejoras de rendimiento específicas y la experiencia en dominio científico que Julia soporta.' }
    ]
  },
  'haskell': {
    slug: 'haskell',
    title: 'Haskell',
    description: 'Haskell es un lenguaje de programación puramente funcional y de tipado estático con evaluación perezosa. Nombrado en honor al lógico Haskell Curry, el lenguaje ha sido desarrollado desde 1990 con GHC (Glasgow Haskell Compiler) como compilador principal. GHC 9.8 incluye mejoras en tipos lineales, el backend JavaScript y soporte para WebAssembly. Haskell sirve tanto como lenguaje de programación práctico como vehículo de investigación para la teoría de lenguajes de programación.\n\nEl sistema de tipos de Haskell está entre los más potentes de cualquier lenguaje en producción, presentando clases de tipos, tipos de datos algebraicos, genéricos, tipos de kind superior, GADTs y familias de tipos. El ecosistema incluye Servant para APIs web con seguridad de tipos, Yesod e IHP para desarrollo web, Pandoc para conversión de documentos, Stack y Cabal para gestión de builds, y QuickCheck para pruebas basadas en propiedades (que fue pionero).\n\nHaskell se usa en producción en empresas como Meta (Haxl/Sigma para filtrado de spam), Standard Chartered (finanzas cuantitativas), Galois (verificación formal), Mercury (banca) y Serokell (blockchain). Su influencia se extiende a características adoptadas por Rust, Scala, Swift y TypeScript.',
    whyImportant: 'Los desarrolladores Haskell ocupan un nicho especializado que obtiene salarios premium, con medianas de $130,000-$165,000 en EE.UU. Los roles Haskell se concentran en fintech, verificación formal, desarrollo de compiladores e investigación.\n\nIncluir Haskell en tu currículum demuestra comprensión profunda de teoría de tipos, programación funcional y razonamiento formal. Incluso al aplicar a roles no Haskell, la experiencia en Haskell señala fuerte capacidad de resolución de problemas y conocimiento avanzado de ciencias de la computación.',
    keywords: ['currículum desarrollador haskell', 'habilidades programación haskell', 'palabras clave haskell currículum', 'currículum programación funcional'],
    searchIntents: ['cómo incluir haskell en currículum', 'oportunidades laborales haskell', 'carrera desarrollador haskell'],
    relatedSkills: ['Programación Funcional', 'Teoría de Tipos', 'Mónadas', 'GHC', 'Servant', 'QuickCheck', 'Teoría de Categorías', 'Evaluación Perezosa', 'Clases de Tipos', 'PureScript'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'cientifico-de-datos', 'desarrollador-de-blockchain', 'ingeniero-principal', 'arquitecto-de-soluciones'],
    atsKeywords: ['Haskell', 'programación funcional', 'GHC', 'seguridad de tipos', 'mónadas', 'clases de tipos', 'tipos de datos algebraicos', 'Servant', 'QuickCheck', 'inmutabilidad', 'evaluación perezosa', 'pruebas basadas en propiedades'],
    resumeTips: [
      'Enmarca la experiencia en Haskell dentro del contexto del problema de negocio resuelto.',
      'Destaca beneficios de seguridad de tipos y métricas de reducción de errores.',
      'Menciona la influencia en características de otros lenguajes (muestra comprensión amplia).',
      'Incluye experiencia en pruebas basadas en propiedades y verificación formal.',
      'Referencia sistemas de producción específicos y sus métricas de confiabilidad.'
    ],
    exampleBullets: [
      'Construí un motor de riesgo financiero basado en Haskell procesando $1.2B en cálculos de exposición diaria de derivados con cero errores en tiempo de ejecución durante 18 meses.',
      'Desarrollé un gateway API basado en Servant en Haskell sirviendo 500,000 solicitudes diarias con garantías en tiempo de compilación eliminando clases enteras de errores de contrato API.',
      'Implementé pruebas basadas en propiedades con QuickCheck en un sistema de pagos Haskell, descubriendo 23 errores de caso límite que las pruebas unitarias tradicionales no detectaron.',
      'Creé un DSL en Haskell para autoría de reglas de cumplimiento usado por 40 empleados no técnicos, reduciendo el tiempo de implementación de reglas de 2 semanas a 2 horas.'
    ],
    faqs: [
      { question: '¿Hay suficientes trabajos Haskell para que valga la pena aprenderlo?', answer: 'Los trabajos Haskell son menos pero pagan una prima significativa. Fintech, verificación formal, empresas de compiladores e instituciones de investigación contratan activamente desarrolladores Haskell. La competencia también es menor ya que menos desarrolladores conocen Haskell. Enfócate en industrias donde Haskell se usa si quieres especializarte.' },
      { question: '¿Cómo ayuda la experiencia en Haskell para roles no Haskell?', answer: 'Haskell te enseña conceptos (inmutabilidad, tipos algebraicos, mónadas, composición) que te hacen mejor desarrollador en cualquier lenguaje. Muchos entrevistadores ven la experiencia en Haskell como una fuerte señal de comprensión avanzada de ciencias de la computación y pensamiento analítico.' },
      { question: '¿Debería listar Haskell si el trabajo usa un lenguaje diferente?', answer: 'Sí, inclúyelo en la sección de habilidades. La experiencia en Haskell demuestra conocimiento de programación funcional que se transfiere a Scala, Rust, TypeScript y Elixir. También señala curiosidad intelectual y disposición para aprender temas complejos.' }
    ]
  },
  'lua': {
    slug: 'lua',
    title: 'Lua',
    description: 'Lua es un lenguaje de scripting ligero y embebible diseñado para extender aplicaciones. Creado en 1993 en la Pontificia Universidad Católica de Río de Janeiro, Lua es conocido por su pequeña huella, velocidad y fácil integración con aplicaciones host C/C++. Lua 5.4 introdujo un recolector de basura generacional y enteros como tipo de primera clase junto con flotantes.\n\nLua es el lenguaje de scripting dominante en desarrollo de juegos, embebido en motores como Roblox (Luau), World of Warcraft, LÖVE 2D y Corona SDK. También se usa para configuración y scripting en Nginx (OpenResty), Redis, Neovim, Adobe Lightroom y dispositivos de red de Cisco y Juniper. LuaJIT es una implementación alternativa que proporciona compilación just-in-time con rendimiento cercano a C.\n\nLa filosofía de diseño de Lua prioriza simplicidad y embebibilidad. Con solo 21 palabras reservadas y una implementación completa menor a 300KB, Lua es ideal para extender aplicaciones donde un lenguaje de scripting completo sería demasiado pesado. Sus corrutinas de primera clase y metatables permiten patrones de programación potentes a pesar del pequeño tamaño del lenguaje.',
    whyImportant: 'Los desarrolladores Lua tienen demanda en desarrollo de juegos, sistemas embebidos y herramientas de infraestructura. Los desarrolladores Lua obtienen salarios medianos de $100,000-$140,000, con roles de desarrollo de juegos e infraestructura en el extremo superior.\n\nIncluir Lua en tu currículum es particularmente valioso para desarrollo de juegos (especialmente Roblox), scripting de sistemas embebidos y roles de infraestructura que involucran Nginx/OpenResty. Señala comprensión de integración de lenguajes embebidos y scripting ligero.',
    keywords: ['currículum programación lua', 'habilidades desarrollador lua', 'currículum lua desarrollo de juegos', 'currículum scripting lua'],
    searchIntents: ['cómo incluir lua en currículum', 'oportunidades laborales desarrollador lua', 'habilidades lua para desarrollo de juegos'],
    relatedSkills: ['Roblox (Luau)', 'Desarrollo de Juegos', 'LuaJIT', 'Integración con C', 'Neovim', 'OpenResty', 'Scripting', 'Corrutinas', 'LÖVE 2D', 'Scripting Embebido'],
    professionSlugs: ['desarrollador-de-juegos', 'ingeniero-de-software', 'desarrollador-embebido', 'desarrollador-web', 'ingeniero-de-redes', 'desarrollador-de-software'],
    atsKeywords: ['Lua', 'LuaJIT', 'Roblox', 'Luau', 'scripting de juegos', 'OpenResty', 'Nginx', 'scripting embebido', 'corrutinas', 'integración C', 'desarrollo de juegos', 'lenguaje de scripting'],
    resumeTips: [
      'Especifica el contexto de uso de Lua (desarrollo de juegos, Nginx, plugins Neovim).',
      'Menciona experiencia con LuaJIT para aplicaciones donde el rendimiento es crítico.',
      'Destaca experiencia de integración C/C++ junto con Lua.',
      'Incluye motores de juegos o plataformas específicas donde usaste Lua.',
      'Referencia Roblox/Luau para posiciones en el ecosistema Roblox.'
    ],
    exampleBullets: [
      'Desarrollé scripts de juego Lua para una experiencia Roblox atrayendo 5 millones de visitas y 50,000 jugadores concurrentes, generando $120,000 en ingresos de developer exchange.',
      'Construí un gateway API OpenResty/Lua manejando 200,000 solicitudes por segundo con decisiones de enrutamiento sub-milisegundo, reemplazando una solución Node.js y reduciendo latencia en un 85%.',
      'Creé una capa de configuración y scripting basada en Lua para una plataforma IoT embebida desplegada en 10,000 dispositivos, permitiendo actualizaciones remotas de comportamiento sin reflasheo de firmware.',
      'Implementé un ecosistema de plugins Neovim en Lua adoptado por 8,000 usuarios, logrando un inicio 5x más rápido comparado con implementaciones equivalentes en Vimscript.'
    ],
    faqs: [
      { question: '¿Lua solo es útil para desarrollo de juegos?', answer: 'No. Aunque Lua es más visible en juegos (Roblox, WoW), se usa ampliamente en infraestructura web (OpenResty/Nginx), extensibilidad de editores (Neovim), configuración de dispositivos de red (Cisco, Juniper) y sistemas embebidos. Su pequeña huella lo hace valioso en cualquier lugar donde se necesite scripting ligero.' },
      { question: '¿Cómo demuestro habilidades Lua sin experiencia en desarrollo de juegos?', answer: 'Contribuye a plugins de Neovim, construye middleware OpenResty o crea demostraciones de scripting embebido con integración C. Documenta la interoperabilidad C/Lua y las características de rendimiento en tu portafolio.' },
      { question: '¿Vale la pena mencionar LuaJIT por separado?', answer: 'Sí, si tienes experiencia específica con LuaJIT. LuaJIT es significativamente más rápido que Lua estándar y se usa en aplicaciones donde el rendimiento es crítico como OpenResty. Mencionar LuaJIT señala conocimiento de las capacidades de rendimiento de Lua.' }
    ]
  },
  'dart': {
    slug: 'dart',
    title: 'Dart',
    description: 'Dart es un lenguaje de programación optimizado para el cliente desarrollado por Google para construir aplicaciones rápidas en cualquier plataforma. Lanzado originalmente en 2011, Dart ganó adopción masiva a través de Flutter, el framework de UI multiplataforma de Google. Dart 3.3 introdujo tipos de extensión e interoperabilidad JavaScript mejorada. Dart 3.4 agrega macros (experimental) y capacidades mejoradas del analizador.\n\nEl ecosistema principal de Dart gira alrededor de Flutter, que permite construir aplicaciones compiladas nativamente para móvil (iOS y Android), web, escritorio (Windows, macOS, Linux) y dispositivos embebidos desde una única base de código. Dart presenta seguridad de nulos sólida, coincidencia de patrones, records, clases selladas y un modelo de concurrencia async/await. El gestor de paquetes pub.dev aloja más de 40,000 paquetes. Los frameworks del lado del servidor de Dart incluyen Shelf y Serverpod.\n\nDart y Flutter son usados por empresas incluyendo Google, BMW, Alibaba, Toyota y eBay. El enfoque de Flutter de "escribir una vez, ejecutar en cualquier lugar" con rendimiento nativo lo ha convertido en uno de los frameworks de desarrollo móvil de más rápido crecimiento, con más de 1 millón de aplicaciones publicadas usando Flutter.',
    whyImportant: 'Los desarrolladores Dart/Flutter tienen alta demanda a medida que las empresas buscan desarrollo multiplataforma rentable. Los desarrolladores Dart obtienen salarios medianos de $105,000-$140,000 en EE.UU., con arquitectos Flutter senior ganando $160,000+.\n\nIncluir Dart en tu currículum es esencial para roles de desarrollo Flutter y señala experiencia en desarrollo multiplataforma moderno. A medida que más empresas adoptan Flutter para reducir equipos separados de iOS y Android, la competencia en Dart abre oportunidades en entornos tanto de startups como empresariales.',
    keywords: ['currículum desarrollador dart', 'habilidades programación dart', 'currículum flutter dart', 'currículum lenguaje dart'],
    searchIntents: ['cómo incluir dart en currículum', 'consejos currículum desarrollador dart flutter', 'oportunidades laborales programación dart'],
    relatedSkills: ['Flutter', 'Desarrollo Móvil', 'Multiplataforma', 'Seguridad de Nulos', 'Firebase', 'Gestión de Estado', 'Riverpod', 'Patrón Bloc', 'Material Design', 'pub.dev'],
    professionSlugs: ['desarrollador-de-aplicaciones-moviles', 'desarrollador-frontend', 'ingeniero-de-software', 'desarrollador-full-stack', 'desarrollador-de-software', 'desarrollador-web'],
    atsKeywords: ['Dart', 'Flutter', 'multiplataforma', 'desarrollo móvil', 'seguridad de nulos', 'Firebase', 'Riverpod', 'Bloc', 'Material Design', 'iOS', 'Android', 'widget'],
    resumeTips: [
      'Siempre combina Dart con Flutter ya que son inseparables en ofertas de trabajo.',
      'Destaca experiencia multiplataforma (iOS, Android, web, escritorio desde una única base de código).',
      'Menciona soluciones de gestión de estado (Riverpod, Bloc, Provider).',
      'Incluye métricas de tiendas de aplicaciones como descargas, calificaciones y rendimiento.',
      'Referencia adopción de seguridad de nulos y características de Dart 3.'
    ],
    exampleBullets: [
      'Construí una aplicación multiplataforma Flutter/Dart desplegada en iOS y Android con 1.2 millones de descargas, manteniendo una calificación promedio de 4.7 estrellas y 60% de reducción de costos vs. equipos nativos separados.',
      'Desarrollé una aplicación de e-commerce Flutter procesando $8M en transacciones anuales, logrando animaciones a 60 FPS y tiempos de inicio en frío menores a 2 segundos en dispositivos de gama media.',
      'Implementé un sistema de diseño Dart/Flutter con más de 80 widgets reutilizables, adoptado por 4 equipos de producto y reduciendo el tiempo de desarrollo de nuevas funcionalidades en un 35%.',
      'Migré una aplicación React Native a Flutter/Dart, mejorando las puntuaciones de benchmark de rendimiento en un 40% y reduciendo la tasa de crashes del 1.2% al 0.15%.'
    ],
    faqs: [
      { question: '¿Dart solo es útil con Flutter?', answer: 'Flutter es el caso de uso principal de Dart, pero Dart también se usa para desarrollo del lado del servidor (Shelf, Serverpod), herramientas CLI y desarrollo web. Sin embargo, de manera realista, la mayoría de las oportunidades laborales de Dart están relacionadas con Flutter. Enfócate en Flutter para máximo impacto profesional.' },
      { question: '¿Debería aprender Flutter/Dart o React Native?', answer: 'Ambas son opciones fuertes. Flutter/Dart está creciendo más rápido y ofrece rendimiento consistente en todas las plataformas con un motor de renderizado único. React Native aprovecha habilidades existentes de JavaScript/React. Elige Flutter para aplicaciones enfocadas en rendimiento y React Native si tu equipo ya tiene fuerte experiencia en React.' },
      { question: '¿Cómo me diferencio como desarrollador Dart/Flutter?', answer: 'Domina gestión de estado avanzada (Riverpod, Bloc), integración de canales de plataforma para funcionalidades nativas, renderizado personalizado con CustomPainter y optimización de rendimiento. La experiencia con despliegues Flutter web y escritorio más allá de móvil es un fuerte diferenciador.' }
    ]
  },
  'objective-c': {
    slug: 'objective-c',
    title: 'Objective-C',
    description: 'Objective-C es un lenguaje de programación orientado a objetos que agrega mensajería estilo Smalltalk a C. Fue el lenguaje principal para desarrollo en plataformas Apple desde la introducción de NeXTSTEP en los años 80 hasta la aparición de Swift en 2014. Objective-C usa despacho dinámico, los frameworks Cocoa y Cocoa Touch, y el runtime de Objective-C para reflexión y metaprogramación.\n\nAunque Swift es ahora el lenguaje recomendado para nuevo desarrollo Apple, Objective-C sigue siendo crítico para mantener bases de código existentes. Aplicaciones iOS importantes construidas con Objective-C incluyen porciones de Facebook, Instagram, WhatsApp y muchas aplicaciones iOS empresariales. La naturaleza de superconjunto de C del lenguaje significa que puede usar directamente cualquier biblioteca C, y su runtime dinámico permite patrones potentes como method swizzling, observación de valores clave (KVO) e introspección en runtime.\n\nEl código Objective-C interopera perfectamente con Swift a través de bridging headers y el atributo @objc. Muchos frameworks críticos de Apple y bibliotecas de terceros todavía exponen interfaces Objective-C. Entender Objective-C es necesario para depuración profunda de iOS/macOS, trabajo con frameworks legados y mantenimiento de aplicaciones en producción con bases de código Objective-C existentes.',
    whyImportant: 'Los desarrolladores Objective-C son valorados por mantener grandes bases de código iOS legadas en empresas. Los desarrolladores Objective-C experimentados ganan $120,000-$155,000, con experiencia en bases de código legadas obteniendo tarifas premium.\n\nIncluir Objective-C junto con Swift en tu currículum muestra profundidad en desarrollo de plataformas Apple. Muchas grandes empresas tienen millones de líneas de código Objective-C que requieren mantenimiento y migración. La experiencia en Objective-C te diferencia para roles senior de iOS donde el conocimiento de bases de código legadas es esencial.',
    keywords: ['currículum desarrollador objective-c', 'habilidades objective-c currículum', 'currículum ios objective-c', 'currículum programador objective-c'],
    searchIntents: ['cómo incluir objective-c en currículum', 'objective-c vs swift currículum', 'oportunidades laborales objective-c'],
    relatedSkills: ['Swift', 'Desarrollo iOS', 'Cocoa Touch', 'UIKit', 'Xcode', 'Core Foundation', 'Runtime Objective-C', 'ARC', 'CocoaPods', 'C'],
    professionSlugs: ['desarrollador-ios', 'desarrollador-de-aplicaciones-moviles', 'ingeniero-de-software', 'desarrollador-de-software', 'ingeniero-de-aplicaciones'],
    atsKeywords: ['Objective-C', 'iOS', 'Cocoa Touch', 'UIKit', 'Xcode', 'ARC', 'Core Data', 'CocoaPods', 'interop Swift', 'plataformas Apple', 'MVC', 'delegación'],
    resumeTips: [
      'Lista junto con Swift para mostrar experiencia completa en plataformas Apple.',
      'Destaca experiencia de migración de Objective-C a Swift.',
      'Menciona mantenimiento de bases de código legadas con métricas de escala específicas.',
      'Referencia conocimiento del runtime Objective-C para posiciones senior.',
      'Incluye experiencia en integración de bibliotecas C/C++.'
    ],
    exampleBullets: [
      'Mantuve una aplicación iOS Objective-C de 2 millones de líneas sirviendo a 15 millones de usuarios activos mensuales, asegurando una tasa libre de crashes del 99.95% en más de 20 lanzamientos.',
      'Lideré una migración faseada de Objective-C a Swift de 400,000 líneas de código durante 18 meses, mejorando los tiempos de compilación en un 25% y reduciendo defectos de código en un 35%.',
      'Desarrollé frameworks Objective-C conectando sistemas bancarios legados con características modernas de Swift, permitiendo a 12 equipos de producto modernizar incrementalmente sin interrupción del servicio.',
      'Optimicé la gestión de memoria Objective-C en una aplicación de redes sociales con muchas imágenes, reduciendo la huella de memoria en un 40% y eliminando crashes por falta de memoria que afectaban a 50,000 usuarios diarios.'
    ],
    faqs: [
      { question: '¿Vale la pena aprender Objective-C en 2025?', answer: 'Solo si planeas trabajar con bases de código iOS legadas. El nuevo desarrollo iOS debería usar Swift. Sin embargo, entender Objective-C es valioso para posiciones senior de iOS ya que muchas aplicaciones grandes todavía contienen código Objective-C significativo que necesita mantenimiento y migración.' },
      { question: '¿Cómo presento experiencia en Objective-C en un currículum moderno?', answer: 'Enfócate en experiencia de migración (Objective-C a Swift), mantenimiento de sistemas legados y la escala de las bases de código gestionadas. Enmárcalo como conocimiento profundo de plataformas Apple en lugar de una habilidad obsoleta. Combínalo prominentemente con Swift y tecnologías iOS modernas.' },
      { question: '¿Las empresas todavía contratan desarrolladores Objective-C?', answer: 'Sí, principalmente para mantener grandes bases de código existentes. Aplicaciones iOS empresariales, aplicaciones bancarias y aplicaciones de consumo establecidas a menudo tienen componentes Objective-C significativos. Estos roles típicamente requieren habilidades tanto en Objective-C como en Swift.' }
    ]
  },
  'cobol': {
    slug: 'cobol',
    title: 'COBOL',
    description: 'COBOL (Common Business-Oriented Language) es uno de los lenguajes de programación más antiguos todavía en uso activo en producción. Diseñado en 1959 por el comité CODASYL con contribución significativa de Grace Hopper, COBOL fue construido para procesamiento de datos de negocio. COBOL moderno (estándar COBOL 2014) soporta programación orientada a objetos, manejo de XML y Unicode. Enterprise COBOL 6.4 de IBM proporciona compilación moderna con optimización mejorada.\n\nCOBOL procesa un estimado del 95% de las transacciones en cajeros automáticos, el 80% de las transacciones minoristas en persona, y maneja más de $3 billones en comercio diario. Se ejecuta en mainframes IBM (z/OS) que impulsan sistemas de banca, seguros, gobierno y salud en todo el mundo. El lenguaje está diseñado para procesar grandes volúmenes de datos de negocio con precisión aritmética decimal esencial para cálculos financieros.\n\nA pesar de su edad, COBOL es irremplazable en muchos sistemas críticos. Grandes bancos, compañías de seguros, agencias gubernamentales (Administración del Seguro Social, IRS) y aerolíneas dependen de programas COBOL que han estado funcionando y evolucionando durante décadas. El envejecimiento de la fuerza laboral COBOL crea una demanda significativa de desarrolladores que puedan mantener y modernizar estos sistemas.',
    whyImportant: 'Los desarrolladores COBOL tienen demanda crítica debido al envejecimiento de la fuerza laboral; el desarrollador COBOL promedio tiene más de 55 años. Los programadores COBOL ganan $100,000-$140,000 en EE.UU., con consultores de mainframe ganando $150-250/hora.\n\nIncluir COBOL en tu currículum abre puertas a posiciones estables y bien compensadas en banca, seguros y gobierno. El desequilibrio entre oferta y demanda de talento COBOL significa que los desarrolladores experimentados tienen seguridad laboral y poder de negociación excepcionales.',
    keywords: ['currículum programador cobol', 'currículum desarrollador cobol', 'habilidades cobol currículum', 'currículum mainframe cobol'],
    searchIntents: ['cómo incluir cobol en currículum', 'oportunidades laborales programación cobol', 'perspectivas carrera desarrollador cobol'],
    relatedSkills: ['Mainframe IBM', 'JCL', 'CICS', 'DB2', 'VSAM', 'z/OS', 'IMS', 'Procesamiento por Lotes', 'Copybooks', 'Micro Focus COBOL'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-de-software', 'administrador-de-base-de-datos', 'ingeniero-de-datos', 'arquitecto-empresarial', 'consultor-de-ti'],
    atsKeywords: ['COBOL', 'mainframe', 'JCL', 'CICS', 'DB2', 'VSAM', 'z/OS', 'procesamiento por lotes', 'IBM', 'IMS', 'copybooks', 'programación COBOL'],
    resumeTips: [
      'Combina COBOL con tecnologías mainframe (JCL, CICS, DB2, z/OS).',
      'Destaca volúmenes de transacciones y criticidad del sistema.',
      'Menciona experiencia en modernización (migración de COBOL a Java/nube).',
      'Incluye industrias específicas (banca, seguros, gobierno).',
      'Referencia logros de optimización de procesamiento por lotes.'
    ],
    exampleBullets: [
      'Mantuve sistemas de procesamiento por lotes COBOL manejando 50 millones de transacciones bancarias diarias con cero pérdida de datos durante 15 años de operación continua.',
      'Optimicé un conjunto de trabajos por lotes COBOL reduciendo la ventana de procesamiento nocturno de 6 horas a 2.5 horas, permitiendo liquidación el mismo día para 3 millones de cuentas.',
      'Lideré una iniciativa de modernización de COBOL a Java convirtiendo 200,000 líneas de código mientras mantenía compatibilidad hacia atrás con sistemas mainframe existentes.',
      'Desarrollé nuevos programas de transacciones en línea COBOL/CICS para una aseguradora importante, procesando 8 millones de reclamaciones anuales con 99.999% de precisión.'
    ],
    faqs: [
      { question: '¿COBOL es una buena opción de carrera para nuevos desarrolladores?', answer: 'Puede ser un nicho lucrativo. La escasez de talento COBOL significa que las posiciones de nivel inicial en COBOL a menudo pagan 10-20% por encima de roles junior comparables. Bancos y agencias gubernamentales reclutan y capacitan activamente nuevos desarrolladores COBOL. Es una carrera estable con excelente seguridad laboral.' },
      { question: '¿COBOL será reemplazado pronto?', answer: 'A pesar de décadas de predicciones, el reemplazo de COBOL es extremadamente lento debido al costo, riesgo y complejidad de migrar sistemas de transacciones de billones de dólares. Los expertos de la industria estiman que COBOL permanecerá en producción por al menos otros 20-30 años. El lenguaje representa demasiada lógica de negocio crítica para migrar rápidamente.' },
      { question: '¿Cómo aprendo COBOL en 2025?', answer: 'IBM ofrece recursos gratuitos de aprendizaje de COBOL, y Open Mainframe Project proporciona acceso educativo a entornos z/OS. Micro Focus COBOL se ejecuta en entornos de desarrollo modernos. Enfócate en COBOL junto con JCL, CICS y DB2 para máxima empleabilidad.' }
    ]
  },
  'fortran': {
    slug: 'fortran',
    title: 'Fortran',
    description: 'Fortran (Formula Translation) es el lenguaje de programación de alto nivel más antiguo todavía en uso activo, desarrollado por primera vez por IBM en 1957. Fortran moderno (estándar Fortran 2023) es dramáticamente diferente de sus orígenes, soportando programación orientada a objetos, programación concurrente con coarrays y sintaxis moderna. Fortran 2023 agrega programación genérica mejorada e interoperabilidad C mejorada.\n\nFortran sigue siendo el lenguaje dominante en computación de alto rendimiento (HPC) y simulación científica. Impulsa pronósticos meteorológicos (GFS, ECMWF IFS), dinámica de fluidos computacional, dinámica molecular, simulaciones de física nuclear y modelado climático. Bibliotecas como LAPACK, BLAS, OpenMPI y PETSc están escritas u optimizadas para Fortran. Los compiladores modernos de Fortran (GFortran, Intel Fortran, NVIDIA HPC SDK) producen código altamente optimizado para supercomputadoras.\n\nEl diseño orientado a arrays de Fortran, el layout de memoria column-major y la ausencia de aliasing de punteros permiten a los compiladores generar código numérico extremadamente eficiente. Sigue siendo esencial en laboratorios nacionales (LLNL, LANL, ORNL), empresas aeroespaciales (Boeing, Lockheed Martin) y agencias meteorológicas en todo el mundo.',
    whyImportant: 'Los desarrolladores Fortran son esenciales en HPC, laboratorios nacionales, aeroespacial y ciencias del clima. Los programadores Fortran ganan $110,000-$150,000, con posiciones en laboratorios nacionales y aeroespacial ofreciendo beneficios adicionales y primas por acreditaciones de seguridad.\n\nIncluir Fortran en tu currículum apunta a un nicho especializado pero bien compensado. La experiencia en Fortran es crítica para roles de simulación y modelado donde ningún otro lenguaje puede igualar su rendimiento numérico. El envejecimiento de la fuerza laboral Fortran crea fuerte demanda de desarrolladores que puedan mantener y modernizar estas bases de código.',
    keywords: ['currículum programador fortran', 'habilidades desarrollador fortran', 'currículum fortran HPC', 'requisitos trabajo fortran'],
    searchIntents: ['cómo incluir fortran en currículum', 'oportunidades carrera programación fortran', 'mercado laboral desarrollador fortran'],
    relatedSkills: ['Computación de Alto Rendimiento', 'MPI', 'OpenMP', 'LAPACK', 'BLAS', 'Computación Científica', 'Métodos Numéricos', 'Supercomputación', 'CFD', 'Modelado Climático'],
    professionSlugs: ['ingeniero-de-software', 'cientifico-de-datos', 'ingeniero-de-robotica', 'ingeniero-embebido', 'ingeniero-de-datos', 'ingeniero-principal'],
    atsKeywords: ['Fortran', 'HPC', 'MPI', 'OpenMP', 'LAPACK', 'computación científica', 'simulación numérica', 'computación paralela', 'supercomputación', 'CFD', 'coarrays', 'BLAS'],
    resumeTips: [
      'Especifica estándares modernos de Fortran (Fortran 2008/2018/2023) vs. legacy Fortran 77.',
      'Destaca experiencia en HPC y computación paralela con MPI/OpenMP.',
      'Menciona dominios científicos específicos y escalas de simulación.',
      'Incluye plataformas de supercomputadoras utilizadas (Summit, Frontier, Perlmutter).',
      'Referencia métricas de optimización de rendimiento y resultados de escalado.'
    ],
    exampleBullets: [
      'Desarrollé modelos de predicción meteorológica basados en Fortran ejecutándose en más de 100,000 núcleos, mejorando la precisión del pronóstico en un 15% para predicciones de 72 horas.',
      'Optimicé una simulación CFD en Fortran usando paralelismo híbrido MPI y OpenMP, logrando 92% de eficiencia paralela en 10,000 núcleos y reduciendo el tiempo de simulación de 72 horas a 4 horas.',
      'Modernicé una base de código legacy Fortran 77 de 300,000 líneas a Fortran 2018, habilitando paralelismo con coarrays y mejorando la mantenibilidad para un equipo de 20 científicos.',
      'Construí bibliotecas numéricas en Fortran usadas por más de 500 investigadores en 15 laboratorios nacionales, proporcionando rutinas optimizadas 3x más rápidas que implementaciones equivalentes en MATLAB.'
    ],
    faqs: [
      { question: '¿Por qué Fortran sigue en uso cuando existen Python/C++?', answer: 'El diseño orientado a arrays de Fortran y las optimizaciones del compilador producen código numérico que es extremadamente difícil de igualar en otros lenguajes. Para simulaciones a escala masiva en supercomputadoras, las décadas de optimización del compilador de Fortran y su modelo de memoria proporcionan ventajas de rendimiento medibles. Reemplazar bases de código Fortran que representan millones de líneas de ciencia validada es impráctico.' },
      { question: '¿Fortran moderno es muy diferente de Fortran 77?', answer: 'Sí, dramáticamente. Fortran moderno (2008+) soporta módulos, tipos derivados, procedimientos ligados a tipos, arrays asignables, programación concurrente con coarrays y código fuente de formato libre. Es un lenguaje moderno que casualmente comparte nombre con su ancestro de 1977.' },
      { question: '¿Cómo empiezo con Fortran?', answer: 'Instala GFortran, estudia tutoriales de Fortran moderno (no Fortran 77) y trabaja con ejercicios de computación numérica. Contribuir a proyectos Fortran de código abierto como la Fortran Standard Library (stdlib) demuestra habilidades modernas de Fortran a los empleadores.' }
    ]
  },
  'assembly-language': {
    slug: 'lenguaje-ensamblador',
    title: 'Lenguaje Ensamblador',
    description: 'El lenguaje ensamblador es un lenguaje de programación de bajo nivel con una fuerte correspondencia entre sus instrucciones y el código máquina de un procesador. Cada arquitectura de procesador (x86-64, ARM, RISC-V, MIPS) tiene su propio lenguaje ensamblador. El ensamblador proporciona control directo sobre hardware, registros, memoria e instrucciones de CPU, haciéndolo el nivel más bajo de programación legible por humanos.\n\nEl ensamblador se usa para rutas de código donde el rendimiento es crítico, kernels de sistemas operativos, bootloaders, controladores de dispositivos, primitivas criptográficas, ingeniería inversa e investigación de seguridad. Los ensambladores comunes incluyen NASM, MASM, GAS (GNU Assembler) y el ensamblador integrado de LLVM. El ensamblador x86-64 se usa para optimización de escritorio y servidor, mientras que el ensamblador ARM es crucial para optimización móvil y embebida.\n\nEntender ensamblador es esencial para investigación de vulnerabilidades, análisis de malware, desarrollo de compiladores e ingeniería inversa de firmware. Las aplicaciones modernas incluyen optimización SIMD (SSE, AVX, NEON), ensamblador en línea en C/C++ para bucles críticos y comprensión de la salida del compilador para optimización de rendimiento.',
    whyImportant: 'El conocimiento de lenguaje ensamblador es requerido para roles de ciberseguridad, ingeniería inversa, sistemas embebidos e ingeniería de rendimiento. Los investigadores de seguridad e ingenieros inversos con habilidades en ensamblador ganan $130,000-$180,000 en EE.UU., con especialistas en pruebas de penetración obteniendo tarifas aún más altas.\n\nIncluir lenguaje ensamblador en tu currículum demuestra una comprensión profunda del hardware que pocos desarrolladores poseen. Es un fuerte diferenciador para ingeniería de seguridad, sistemas embebidos, desarrollo de compiladores y roles que requieren optimización de rendimiento a nivel de instrucción.',
    keywords: ['currículum lenguaje ensamblador', 'habilidades programación ensamblador', 'currículum ensamblador x86', 'currículum programación bajo nivel'],
    searchIntents: ['cómo incluir ensamblador en currículum', 'oportunidades laborales lenguaje ensamblador', 'carrera programación ensamblador'],
    relatedSkills: ['x86-64', 'Ensamblador ARM', 'Ingeniería Inversa', 'C/C++', 'SIMD', 'Arquitectura de Computadoras', 'Firmware', 'Depuración', 'Desensamblaje', 'Desarrollo de Exploits'],
    professionSlugs: ['desarrollador-embebido', 'ingeniero-de-ciberseguridad', 'probador-de-penetracion', 'ingeniero-de-software', 'ingeniero-de-seguridad', 'ingeniero-de-fpga', 'ingeniero-embebido'],
    atsKeywords: ['ensamblador', 'x86', 'x86-64', 'ARM', 'RISC-V', 'ingeniería inversa', 'programación bajo nivel', 'SIMD', 'firmware', 'desensamblaje', 'desarrollo de exploits', 'código máquina'],
    resumeTips: [
      'Especifica las arquitecturas en las que tienes experiencia en ensamblador (x86-64, ARM, RISC-V).',
      'Destaca aplicaciones de investigación de seguridad o ingeniería inversa.',
      'Menciona experiencia en optimización SIMD con métricas específicas.',
      'Incluye experiencia en desarrollo de firmware o bootloaders.',
      'Referencia herramientas como IDA Pro, Ghidra o radare2 junto con conocimiento de ensamblador.'
    ],
    exampleBullets: [
      'Optimicé una biblioteca criptográfica usando ensamblador x86-64 AVX2, logrando una mejora de rendimiento de 4.2x para encriptación AES procesando 10GB/s en hardware commodity.',
      'Realicé ingeniería inversa de 15 firmwares de dispositivos IoT usando análisis de ensamblador ARM, identificando 8 vulnerabilidades zero-day y previniendo la explotación potencial de 2 millones de dispositivos desplegados.',
      'Desarrollé un bootloader personalizado en ensamblador x86 para un sistema embebido, logrando tiempos de arranque menores a 200ms y ajustándose dentro de una restricción de ROM de 4KB.',
      'Creé rutinas de ensamblador optimizadas con SIMD para un códec de video, permitiendo codificación 4K en tiempo real a 60 FPS y reduciendo la utilización de CPU en un 55%.'
    ],
    faqs: [
      { question: '¿Es práctico aprender lenguaje ensamblador hoy?', answer: 'Sí, para carreras específicas. Analistas de ciberseguridad, ingenieros inversos, desarrolladores embebidos e ingenieros de rendimiento todos se benefician del conocimiento de ensamblador. No necesitas escribir aplicaciones completas en ensamblador; entender cómo leer, analizar y escribir pequeñas secciones críticas es la habilidad valiosa.' },
      { question: '¿Qué arquitectura de ensamblador debería aprender primero?', answer: 'x86-64 para investigación de seguridad, ingeniería inversa y optimización de escritorio/servidor. ARM para trabajo móvil y embebido. RISC-V está creciendo para aplicaciones académicas y embebidas. Comienza con x86-64 ya que tiene la mayoría de recursos de aprendizaje y la aplicabilidad más amplia.' },
      { question: '¿Cómo demuestro habilidades en ensamblador en un currículum?', answer: 'Incluye proyectos de optimización específicos con métricas de rendimiento, resultados de investigación de seguridad o restricciones de sistemas embebidos dentro de las que trabajaste. Enlaza a soluciones de desafíos CTF, trabajo de desarrollo de exploits o benchmarks de rendimiento comparando ensamblador vs. implementaciones de más alto nivel.' }
    ]
  },
  'visual-basic': {
    slug: 'visual-basic',
    title: 'Visual Basic',
    description: 'Visual Basic (VB) abarca Visual Basic .NET (VB.NET) y el legacy Visual Basic 6.0, junto con Visual Basic for Applications (VBA). VB.NET es un lenguaje moderno y orientado a objetos en la plataforma .NET con paridad completa de características con C# para APIs .NET. VBA sigue siendo el lenguaje de programación de macros embebido en aplicaciones Microsoft Office incluyendo Excel, Access, Word y Outlook.\n\nVB.NET se usa en desarrollo de aplicaciones Windows empresariales, particularmente en industrias con aplicaciones VB6 legadas siendo modernizadas. VBA es ubicuo en entornos corporativos para automatizar flujos de trabajo de Excel, construir bases de datos Access y crear complementos de Office. A pesar de no ser de vanguardia, VBA procesa una enorme cantidad de datos de negocio diariamente en cada industria desde finanzas hasta salud.\n\nEl ecosistema VBA incluye macros de Excel, aplicaciones de bases de datos Access, complementos personalizados de Office y herramientas de automatización empresarial. Las aplicaciones VB.NET usan Windows Forms, WPF y ASP.NET. Aunque Microsoft ha señalado que VB.NET no recibirá nuevas características de lenguaje, sigue siendo soportado en .NET y mantiene una base instalada significativa.',
    whyImportant: 'Las habilidades VBA son valiosas en finanzas, contabilidad, consultoría y cualquier entorno de negocio con uso intensivo de datos. Los profesionales competentes en VBA ganan $75,000-$120,000, mientras que los desarrolladores empresariales VB.NET ganan $95,000-$130,000.\n\nIncluir VBA en tu currículum es particularmente valioso para roles de analista financiero, analista de negocios y operaciones donde la automatización de Excel es crítica. VB.NET es relevante para empresas que mantienen aplicaciones Windows legadas. Ambos demuestran capacidad para automatizar procesos de negocio y trabajar dentro de entornos empresariales.',
    keywords: ['currículum visual basic', 'habilidades vba currículum', 'currículum desarrollador vb.net', 'currículum programación visual basic'],
    searchIntents: ['cómo incluir vba en currículum', 'oportunidades laborales visual basic', 'consejos currículum vba excel'],
    relatedSkills: ['VBA', 'Macros Excel', 'VB.NET', '.NET', 'Microsoft Office', 'Access', 'Windows Forms', 'SQL', 'Automatización COM', 'Automatización de Negocios'],
    professionSlugs: ['desarrollador-de-software', 'analista-de-datos', 'desarrollador-de-bi', 'ingeniero-de-software', 'desarrollador-de-erp', 'consultor-de-ti'],
    atsKeywords: ['Visual Basic', 'VBA', 'VB.NET', 'Excel', 'macros', 'Access', 'Microsoft Office', 'Windows Forms', 'automatización', '.NET', 'COM', 'automatización de negocios'],
    resumeTips: [
      'Distingue entre VBA (automatización de Office) y VB.NET (desarrollo de aplicaciones).',
      'Cuantifica ahorros de tiempo de proyectos de automatización Excel/VBA.',
      'Destaca aplicaciones Office específicas automatizadas (Excel, Access, Outlook).',
      'Menciona experiencia de migración de VB6 a VB.NET o C#.',
      'Incluye experiencia de integración de bases de datos con Access o SQL Server.'
    ],
    exampleBullets: [
      'Construí herramientas de automatización VBA en Excel reduciendo el tiempo de reportes financieros mensuales de 40 horas a 3 horas para un equipo de 25 analistas, ahorrando $180,000 anuales.',
      'Desarrollé una aplicación de gestión de inventario VB.NET usada por 500 empleados de almacén en 8 ubicaciones, procesando 15,000 transacciones diarias con 99.9% de precisión.',
      'Creé aplicaciones de base de datos Access/VBA gestionando 200,000 registros de clientes para un proveedor de salud, automatizando reportes de cumplimiento y reduciendo la preparación de auditorías de 2 semanas a 2 días.',
      'Migré más de 50 aplicaciones VB6 a VB.NET, reduciendo la carga de mantenimiento en un 60% y habilitando el despliegue en infraestructura moderna de Windows Server.'
    ],
    faqs: [
      { question: '¿VBA sigue siendo relevante para mi currículum?', answer: 'Sí, especialmente para roles orientados al negocio. La automatización VBA se usa diariamente en cada corporación importante. Para roles de analista de datos, analista financiero y operaciones, la competencia en VBA es una ventaja significativa. Muestra que puedes cerrar la brecha entre procesos de negocio y tecnología.' },
      { question: '¿Debería aprender VB.NET o C# para desarrollo .NET?', answer: 'C# es la mejor opción para nuevo desarrollo .NET ya que recibe todas las nuevas características del lenguaje primero y tiene muchas más ofertas de trabajo. Aprende VB.NET solo si mantienes aplicaciones VB.NET existentes. Los conceptos .NET se transfieren directamente entre ambos lenguajes.' },
      { question: '¿Cómo presento habilidades VBA sin que se vea obsoleto?', answer: 'Enmarca VBA como automatización de procesos de negocio y optimización de flujos de trabajo de datos. Enfatiza resultados (tiempo ahorrado, errores eliminados, reportes automatizados) en lugar de la tecnología en sí. Muestra cómo VBA entrega valor de negocio, que es lo que importa a los gerentes de contratación.' }
    ]
  },
  'groovy': {
    slug: 'groovy',
    title: 'Groovy',
    description: 'Groovy es un lenguaje de programación dinámico y opcionalmente tipado para la Máquina Virtual de Java. Creado por James Strachan en 2003, Groovy combina sintaxis similar a Python con interoperabilidad perfecta con Java. Groovy 4.0 introdujo una distribución modularizada, verificación de tipos mejorada y la característica GINQ (Groovy-Integrated Query). Groovy ejecuta código Java existente sin modificación mientras agrega closures, builders y metaprogramación.\n\nEl caso de uso principal moderno de Groovy es la automatización de builds a través de Gradle, que es el sistema de build predeterminado para proyectos Android y ampliamente usado en desarrollo empresarial Java/Kotlin. Los pipelines de Jenkins están escritos en Groovy, haciéndolo esencial para flujos de trabajo CI/CD. El framework web Grails proporciona una experiencia similar a Rails para desarrollo web en JVM. Spock Framework es un framework de pruebas altamente reconocido que usa Groovy.\n\nLa capacidad de Groovy para usar bibliotecas Java de manera transparente mientras proporciona sintaxis concisa y expresiva lo hace ideal para scripting, pruebas y configuración de builds en proyectos del ecosistema Java.',
    whyImportant: 'Las habilidades Groovy son valiosas para ingenieros DevOps, desarrolladores Java e ingenieros de build Android. Los desarrolladores competentes en Groovy ganan $110,000-$145,000, con especialistas DevOps y CI/CD en el extremo superior.\n\nIncluir Groovy en tu currículum señala experiencia en builds Gradle, autoría de pipelines Jenkins y scripting JVM. Es particularmente valioso para roles DevOps y posiciones del ecosistema Java donde la automatización de builds y el desarrollo de pipelines CI/CD son responsabilidades centrales.',
    keywords: ['currículum desarrollador groovy', 'habilidades programación groovy', 'currículum groovy gradle', 'currículum groovy jenkins'],
    searchIntents: ['cómo incluir groovy en currículum', 'mercado laboral desarrollador groovy', 'habilidades groovy para devops'],
    relatedSkills: ['Gradle', 'Jenkins', 'Java', 'Spock Framework', 'Grails', 'CI/CD', 'JVM', 'Automatización de Builds', 'Scripting', 'Build Android'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-software', 'desarrollador-backend', 'desarrollador-android', 'ingeniero-de-automatizacion-de-pruebas', 'ingeniero-de-qa'],
    atsKeywords: ['Groovy', 'Gradle', 'Jenkins', 'CI/CD', 'JVM', 'Spock', 'Grails', 'automatización de builds', 'pipeline', 'scripting', 'Java', 'pruebas'],
    resumeTips: [
      'Combina Groovy con Gradle y Jenkins para mostrar sus contextos principales de uso.',
      'Destaca desarrollo de pipelines CI/CD con scripts Groovy de Jenkins.',
      'Menciona experiencia con el framework de pruebas Spock para roles de pruebas JVM.',
      'Incluye experiencia en desarrollo de plugins Gradle personalizados.',
      'Referencia métricas de optimización de builds y mejoras de pipelines.'
    ],
    exampleBullets: [
      'Desarrollé bibliotecas compartidas Jenkins en Groovy usadas en más de 150 pipelines CI/CD, reduciendo el tiempo de configuración de pipelines en un 70% y estandarizando despliegues para 30 equipos de desarrollo.',
      'Construí plugins Gradle personalizados en Groovy automatizando gestión de releases para 40 microservicios Java, reduciendo la preparación de releases de 4 horas a 15 minutos.',
      'Implementé suites de pruebas Spock/Groovy logrando 92% de cobertura de código en una plataforma de servicios financieros, detectando un 35% más de defectos que las pruebas JUnit anteriores.',
      'Creé scripts Groovy automatizando aprovisionamiento de infraestructura vía Jenkins, reduciendo el tiempo de configuración de entornos de 2 días a 30 minutos para más de 200 entornos de desarrollo.'
    ],
    faqs: [
      { question: '¿Groovy sigue siendo relevante con Kotlin convirtiéndose en el lenguaje preferido de Gradle?', answer: 'Sí. Aunque Gradle está haciendo la transición a Kotlin DSL, millones de builds Gradle existentes usan Groovy. Los pipelines de Jenkins siguen siendo principalmente basados en Groovy. El conocimiento de Groovy sigue siendo esencial para mantener la infraestructura de build existente y los sistemas CI/CD.' },
      { question: '¿Debería aprender Groovy específicamente o solo lo suficiente para Gradle/Jenkins?', answer: 'Para la mayoría de los desarrolladores, aprender Groovy en el contexto de Gradle y Jenkins es suficiente. La experiencia profunda en Groovy (Grails, Spock) agrega valor para roles específicos. Enfócate en scripting Groovy, closures y creación de DSL para máximo impacto práctico.' },
      { question: '¿Cómo presento habilidades Groovy en un currículum?', answer: 'El contexto es clave. En lugar de listar "Groovy" solo, lista "Groovy (Gradle, Jenkins)" o aplicaciones específicas. Destaca las mejoras de automatización y eficiencia que tus habilidades Groovy habilitaron en lugar del lenguaje en sí.' }
    ]
  },
  'elixir': {
    slug: 'elixir',
    title: 'Elixir',
    description: 'Elixir es un lenguaje de programación dinámico y funcional construido sobre la VM de Erlang (BEAM). Creado por José Valim en 2011, Elixir hereda la legendaria tolerancia a fallos y modelo de concurrencia de Erlang mientras proporciona una sintaxis moderna y accesible. Elixir 1.16 introdujo mejoras en documentación y diagnósticos. El lenguaje aprovecha procesos ligeros, árboles de supervisión y paso de mensajes para construir sistemas distribuidos altamente disponibles.\n\nEl ecosistema de Elixir se centra alrededor de Phoenix Framework para desarrollo web, que incluye LiveView para construir interfaces web interactivas en tiempo real sin JavaScript. Ecto proporciona integración con bases de datos, Nerves permite desarrollo de sistemas embebidos, Nx trae computación numérica, y Broadway maneja pipelines de ingesta de datos. El gestor de paquetes Hex aloja más de 15,000 paquetes.\n\nElixir impulsa sistemas críticos en empresas como Discord (11 millones de usuarios concurrentes en Elixir), Pinterest, PepsiCo, Bleacher Report y Toyota Connected. Su capacidad para manejar millones de conexiones concurrentes en un solo servidor lo hace ideal para aplicaciones en tiempo real, plataformas IoT y sistemas de mensajería.',
    whyImportant: 'Los desarrolladores Elixir son cada vez más buscados para sistemas en tiempo real de alta concurrencia. Los desarrolladores Elixir obtienen salarios medianos de $120,000-$155,000 en EE.UU., con una prima por experiencia en Phoenix LiveView y sistemas distribuidos.\n\nIncluir Elixir en tu currículum te diferencia para roles que requieren sistemas tolerantes a fallos y en tiempo real. Señala experiencia en programación funcional, diseño de sistemas concurrentes y la capacidad de construir sistemas que manejan millones de conexiones. El ecosistema Elixir en crecimiento significa más oportunidades laborales cada año.',
    keywords: ['currículum desarrollador elixir', 'habilidades programación elixir', 'currículum phoenix framework', 'requisitos trabajo elixir'],
    searchIntents: ['cómo incluir elixir en currículum', 'oportunidades carrera desarrollador elixir', 'mercado laboral programación elixir'],
    relatedSkills: ['Phoenix Framework', 'LiveView', 'Erlang/OTP', 'BEAM VM', 'Ecto', 'GenServer', 'Árboles de Supervisión', 'Programación Funcional', 'Broadway', 'Nerves'],
    professionSlugs: ['desarrollador-backend', 'ingeniero-de-software', 'desarrollador-full-stack', 'desarrollador-de-software', 'desarrollador-embebido', 'ingeniero-de-confiabilidad-de-sitios'],
    atsKeywords: ['Elixir', 'Phoenix', 'LiveView', 'Erlang', 'BEAM', 'OTP', 'Ecto', 'GenServer', 'tolerancia a fallos', 'concurrencia', 'tiempo real', 'sistemas distribuidos'],
    resumeTips: [
      'Destaca métricas de concurrencia y tolerancia a fallos.',
      'Menciona Phoenix LiveView para experiencia en aplicaciones web en tiempo real.',
      'Incluye conceptos de Erlang/OTP como árboles de supervisión y GenServers.',
      'Referencia métricas de escala específicas (conexiones concurrentes, throughput de mensajes).',
      'Combina Elixir con contextos de sistemas distribuidos y aplicaciones en tiempo real.'
    ],
    exampleBullets: [
      'Construí una plataforma de colaboración en tiempo real con Phoenix LiveView soportando 50,000 usuarios concurrentes con latencia menor a 100ms, eliminando la necesidad de un framework JavaScript frontend separado.',
      'Desarrollé un pipeline de ingesta de datos Elixir/Broadway procesando 5 millones de eventos por minuto de dispositivos IoT con contrapresión automática y cero pérdida de mensajes.',
      'Arquitecté un sistema de mensajería basado en Elixir manejando 2 millones de conexiones WebSocket concurrentes en un solo servidor, reduciendo costos de infraestructura en un 75% comparado con la implementación anterior en Node.js.',
      'Implementé árboles de supervisión OTP logrando 99.999% de disponibilidad para un servicio de notificaciones financieras, con recuperación automática de fallos manejando más de 500 crashes diarios de procesos sin impacto al usuario.'
    ],
    faqs: [
      { question: '¿Elixir es una opción de carrera práctica?', answer: 'Sí, y en crecimiento. La adopción de Elixir se está acelerando en aplicaciones en tiempo real, fintech, IoT y salud. Aunque el mercado laboral es más pequeño que Python o Java, los roles Elixir pagan salarios premium y la competencia es menor. Discord, Pinterest y Toyota son empleadores notables.' },
      { question: '¿Necesito aprender Erlang para usar Elixir?', answer: 'No inicialmente, pero entender los conceptos Erlang/OTP (árboles de supervisión, GenServers, paso de mensajes) es esencial para desarrollo Elixir en producción. Puedes aprender estos a través de Elixir sin aprender la sintaxis de Erlang, pero leer documentación y bibliotecas de Erlang se vuelve valioso a nivel senior.' },
      { question: '¿Cómo se compara Phoenix LiveView con React en oportunidades laborales?', answer: 'React tiene muchas más ofertas de trabajo, pero Phoenix LiveView es un nicho en crecimiento con menos competencia. LiveView elimina la necesidad de una SPA JavaScript para muchos casos de uso. Conocer ambos te posiciona bien: React para aplicabilidad amplia, LiveView para roles específicos de Elixir.' }
    ]
  },
  'erlang': {
    slug: 'erlang',
    title: 'Erlang',
    description: 'Erlang es un lenguaje de programación concurrente y funcional diseñado para construir sistemas distribuidos tolerantes a fallos. Desarrollado en Ericsson en 1986 por Joe Armstrong, Erlang impulsa infraestructura de telecomunicaciones, sistemas de mensajería y bases de datos que requieren confiabilidad extrema. Erlang/OTP 27 introduce soporte JSON mejorado, sistema de documentación mejorado y mejoras de rendimiento.\n\nErlang se ejecuta en la máquina virtual BEAM, que proporciona procesos ligeros (millones de procesos concurrentes por nodo), planificación preemptiva, carga de código en caliente y distribución integrada. OTP (Open Telecom Platform) proporciona bibliotecas y patrones de diseño probados en batalla incluyendo comportamientos GenServer, Supervisor y Application. Sistemas notables basados en Erlang incluyen WhatsApp, RabbitMQ, CouchDB y Riak.\n\nLa filosofía "déjalo fallar" de Erlang, donde se permite que los procesos fallen y son reiniciados automáticamente por supervisores, permite sistemas con disponibilidad de cinco nueves (99.999%). El lenguaje fue diseñado para switches de telecomunicaciones que nunca podían caerse, y esta confiabilidad se extiende a los sistemas distribuidos modernos.',
    whyImportant: 'Los desarrolladores Erlang son valorados en telecomunicaciones, mensajería, sistemas financieros y cualquier dominio que requiera confiabilidad extrema. Los desarrolladores Erlang ganan $125,000-$165,000 en EE.UU., con especialistas en telecom y fintech en el extremo superior.\n\nIncluir Erlang en tu currículum señala experiencia profunda en construir sistemas distribuidos tolerantes a fallos. Es particularmente valioso para roles en empresas que usan tecnologías basadas en BEAM, empresas de telecomunicaciones y organizaciones fintech donde el tiempo de actividad del sistema es primordial.',
    keywords: ['currículum desarrollador erlang', 'habilidades programación erlang', 'palabras clave erlang currículum', 'requisitos trabajo erlang'],
    searchIntents: ['cómo incluir erlang en currículum', 'mercado laboral desarrollador erlang', 'carrera programación erlang'],
    relatedSkills: ['OTP', 'BEAM VM', 'Elixir', 'Sistemas Distribuidos', 'Tolerancia a Fallos', 'GenServer', 'Mnesia', 'RabbitMQ', 'Concurrencia', 'Carga de Código en Caliente'],
    professionSlugs: ['desarrollador-backend', 'ingeniero-de-software', 'ingeniero-de-redes', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-infraestructura', 'ingeniero-principal'],
    atsKeywords: ['Erlang', 'OTP', 'BEAM', 'sistemas distribuidos', 'tolerancia a fallos', 'concurrencia', 'GenServer', 'Supervisor', 'RabbitMQ', 'telecom', 'mensajería', 'carga de código en caliente'],
    resumeTips: [
      'Destaca logros de tolerancia a fallos y disponibilidad.',
      'Menciona comportamientos y patrones OTP específicos utilizados.',
      'Incluye métricas de escala de sistemas distribuidos.',
      'Referencia carga de código en caliente y experiencia de despliegue sin tiempo de inactividad.',
      'Combina Erlang con Elixir para mostrar conocimiento completo del ecosistema BEAM.'
    ],
    exampleBullets: [
      'Mantuve infraestructura de conmutación de telecomunicaciones basada en Erlang manejando 10 millones de llamadas concurrentes con 99.999% de disponibilidad durante 5 años.',
      'Desarrollé microservicios Erlang/OTP para una plataforma de mensajería procesando 500 millones de mensajes diarios, con actualizaciones de código en caliente habilitando despliegues sin tiempo de inactividad.',
      'Construí un clúster distribuido Erlang gestionando licitaciones en tiempo real para una plataforma publicitaria, procesando 2 millones de solicitudes de oferta por segundo en 50 nodos.',
      'Optimicé plugins Erlang de RabbitMQ reduciendo la latencia de enrutamiento de mensajes en un 40%, soportando 100,000 colas y 1 mil millones de mensajes por día.'
    ],
    faqs: [
      { question: '¿Debería aprender Erlang o Elixir?', answer: 'Elixir es más accesible para principiantes y tiene un ecosistema moderno más grande. Sin embargo, entender Erlang es valioso para leer código fuente OTP, mantener sistemas Erlang existentes y apreciar los fundamentos de BEAM. Comienza con Elixir, luego aprende a leer Erlang para mayor profundidad de experiencia.' },
      { question: '¿Erlang todavía se usa en nuevos proyectos?', answer: 'Sí, particularmente en telecomunicaciones, sistemas financieros y empresas ya invertidas en el ecosistema BEAM. Los nuevos proyectos a menudo eligen Elixir sobre Erlang para mejor experiencia de desarrollador, pero Erlang sigue siendo la elección correcta cuando se necesita máximo control sobre los internos de OTP.' },
      { question: '¿Cómo se compara Erlang con Go para sistemas concurrentes?', answer: 'Erlang proporciona tolerancia a fallos superior a través de árboles de supervisión y aislamiento de procesos; un proceso Erlang que falla no puede afectar a otros. Go ofrece mejor rendimiento bruto y un pool de talento más grande. Elige Erlang cuando la tolerancia a fallos y el tiempo de actividad son más críticos que el throughput bruto.' }
    ]
  },
  'clojure': {
    slug: 'clojure',
    title: 'Clojure',
    description: 'Clojure es un dialecto Lisp moderno, dinámico y funcional que se ejecuta en la JVM. Creado por Rich Hickey en 2007, Clojure enfatiza inmutabilidad, estructuras de datos persistentes y simplicidad. Clojure 1.12 introdujo métodos Java como funciones, métodos calificados e interoperabilidad mejorada. ClojureScript apunta a JavaScript, y Babashka proporciona scripting de inicio rápido.\n\nEl ecosistema de Clojure incluye Ring y Compojure para servicios HTTP, Reagent y Re-frame para aplicaciones web ClojureScript (usando React), next.jdbc para acceso a bases de datos, core.async para programación concurrente y Datomic para bases de datos inmutables. El flujo de trabajo de desarrollo dirigido por REPL permite programación interactiva y exploratoria. Leiningen y deps.edn gestionan dependencias.\n\nClojure se usa en Nubank (el banco digital más grande del mundo con más de 90 millones de clientes), Walmart, Cisco, Funding Circle y NASA. Su énfasis en simplicidad, inmutabilidad y programación orientada a datos produce sistemas que son más fáciles de razonar y mantener a escala.',
    whyImportant: 'Los desarrolladores Clojure están entre los mejor pagados de la industria, con salarios medianos de $130,000-$170,000 en EE.UU. Los roles Clojure se concentran en fintech, procesamiento de datos y empresas que valoran la programación funcional.\n\nIncluir Clojure en tu currículum te posiciona para roles con pago premium en empresas que priorizan la calidad del código y la confiabilidad del sistema. Señala comprensión profunda de programación funcional, inmutabilidad y diseño orientado a datos, principios cada vez más valorados en la industria.',
    keywords: ['currículum desarrollador clojure', 'habilidades programación clojure', 'palabras clave clojure currículum', 'requisitos trabajo clojure'],
    searchIntents: ['cómo incluir clojure en currículum', 'carrera desarrollador clojure', 'mercado laboral programación clojure'],
    relatedSkills: ['Programación Funcional', 'JVM', 'ClojureScript', 'Reagent', 'Ring', 'Datomic', 'core.async', 'Lisp', 'Inmutabilidad', 'Desarrollo Dirigido por REPL'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'desarrollador-full-stack', 'ingeniero-de-datos', 'ingeniero-principal', 'arquitecto-de-soluciones'],
    atsKeywords: ['Clojure', 'ClojureScript', 'programación funcional', 'JVM', 'inmutabilidad', 'Ring', 'Compojure', 'Datomic', 'REPL', 'Lisp', 'core.async', 'orientado a datos'],
    resumeTips: [
      'Destaca beneficios de inmutabilidad y programación funcional en resultados de proyectos.',
      'Menciona experiencia tanto en Clojure (JVM) como ClojureScript (JS).',
      'Incluye el flujo de trabajo de desarrollo dirigido por REPL en tu metodología.',
      'Referencia sistemas de producción específicos y su escala.',
      'Combina Clojure con experiencia en dominio de procesamiento de datos y fintech.'
    ],
    exampleBullets: [
      'Desarrollé un sistema de procesamiento de transacciones basado en Clojure en una empresa fintech manejando $500M en pagos diarios con cero inconsistencias de datos durante 2 años.',
      'Construí una aplicación full-stack Clojure/ClojureScript con Reagent sirviendo a 200,000 usuarios, logrando 50% menos código que la implementación anterior en Java/React.',
      'Implementé un pipeline de datos Clojure usando core.async procesando 10 millones de eventos diarios, con manejo de contrapresión que mantuvo throughput consistente bajo picos de tráfico de 5x.',
      'Migré un monolito Java legacy a microservicios Clojure, reduciendo incidentes en producción en un 70% mediante estructuras de datos inmutables y gestión de estado simplificada.'
    ],
    faqs: [
      { question: '¿Hay suficientes trabajos Clojure para justificar aprenderlo?', answer: 'Los trabajos Clojure son menos en número pero pagan significativamente por encima del promedio. La comunidad se concentra en fintech, procesamiento de datos y empresas de producto innovadoras. Nubank solo emplea miles de desarrolladores Clojure. La clave es apuntar a empresas conocidas por usar Clojure en lugar de buscar en bolsas de trabajo genéricas.' },
      { question: '¿Clojure es difícil de aprender viniendo de lenguajes orientados a objetos?', answer: 'La sintaxis es simple (basada en Lisp), pero la mentalidad funcional e inmutable requiere ajuste. La mayoría de los desarrolladores encuentran Clojure productivo dentro de 2-3 meses. El flujo de trabajo dirigido por REPL y las estructuras de datos persistentes se vuelven naturales rápidamente, y muchos desarrolladores reportan que los hace mejores programadores en general.' },
      { question: '¿Cómo se compara Clojure con Scala para programación funcional en JVM?', answer: 'Clojure es de tipado dinámico y enfatiza simplicidad y orientación a datos. Scala tiene un sistema de tipos estático sofisticado. Clojure tiene una comunidad más pequeña pero más enfocada y se usa principalmente en fintech. Elige según si prefieres tipado dinámico o estático y las empresas objetivo donde quieres trabajar.' }
    ]
  },
  'f-sharp': {
    slug: 'f-sharp',
    title: 'F#',
    description: 'F# es un lenguaje de programación funcional-primero y multi-paradigma en la plataforma .NET. Desarrollado por Don Syme en Microsoft Research, F# se ejecuta en .NET y soporta estilos de programación funcional, orientada a objetos e imperativo. F# 8 introdujo miembros estáticos abstractos, copy-and-update de campos de registros anidados e inferencia de tipos mejorada. F# compila a ensamblados .NET e interopera completamente con C# y otros lenguajes .NET.\n\nEl ecosistema de F# aprovecha toda la biblioteca .NET mientras agrega bibliotecas de programación funcional: Fable compila F# a JavaScript, SAFE Stack proporciona una experiencia de desarrollo web full-stack en F#, FSharp.Data permite acceso a datos con seguridad de tipos, Elmish proporciona una arquitectura tipo Elm para aplicaciones web, y Giraffe es un framework web F# sobre ASP.NET Core. FsCheck proporciona pruebas basadas en propiedades.\n\nF# se usa en finanzas cuantitativas (particularmente en Londres), análisis de datos, diseño dirigido por dominio y en cualquier lugar donde su potente sistema de tipos y paradigma funcional mejoran la corrección. Empresas como Jet.com (Walmart), Credit Suisse y varios fondos de cobertura usan F# para sistemas en producción.',
    whyImportant: 'Los desarrolladores F# obtienen salarios premium de $125,000-$170,000, con roles de finanzas cuantitativas en F# superando los $200,000. F# es particularmente valorado en fintech, procesamiento de datos y diseño dirigido por dominio.\n\nIncluir F# en tu currículum demuestra experiencia avanzada en .NET y conocimiento de programación funcional. Te diferencia en el ecosistema .NET más allá de C#, particularmente para roles que requieren modelado matemático, procesamiento de datos o dominios donde la seguridad de tipos previene errores costosos.',
    keywords: ['currículum desarrollador f#', 'habilidades programación fsharp', 'currículum f sharp', 'currículum f# .net'],
    searchIntents: ['cómo incluir f# en currículum', 'oportunidades carrera desarrollador f#', 'mercado laboral programación f#'],
    relatedSkills: ['.NET', 'Programación Funcional', 'Proveedores de Tipos', 'Fable', 'SAFE Stack', 'Diseño Dirigido por Dominio', 'Interop C#', 'Giraffe', 'Coincidencia de Patrones', 'Uniones Discriminadas'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'ingeniero-de-datos', 'cientifico-de-datos', 'arquitecto-de-soluciones', 'desarrollador-de-software'],
    atsKeywords: ['F#', 'FSharp', '.NET', 'programación funcional', 'proveedores de tipos', 'Fable', 'SAFE Stack', 'Giraffe', 'uniones discriminadas', 'coincidencia de patrones', 'modelado de dominio', 'seguridad de tipos'],
    resumeTips: [
      'Destaca modelado de dominio y manejo de errores con seguridad de tipos.',
      'Menciona interoperabilidad .NET y colaboración con C#.',
      'Incluye aplicaciones de finanzas cuantitativas o procesamiento de datos.',
      'Referencia proveedores de tipos para acceso a datos con seguridad de tipos.',
      'Combina F# con metodología de diseño dirigido por dominio.'
    ],
    exampleBullets: [
      'Construí un motor de pricing cuantitativo en F# calculando métricas de riesgo para un portafolio de derivados de $5B, logrando computación 3x más rápida que la implementación anterior en C#.',
      'Desarrollé una aplicación web full-stack SAFE Stack (F#) para gestión de operaciones, reduciendo errores de procesamiento de órdenes en un 95% mediante uniones discriminadas y coincidencia de patrones exhaustiva.',
      'Creé proveedores de tipos F# para 15 APIs internas, eliminando errores de deserialización en tiempo de ejecución y reduciendo reportes de errores de integración en un 80%.',
      'Implementé diseño dirigido por dominio en F# para un sistema de reclamaciones de seguros, reduciendo errores de lógica de negocio en un 60% y permitiendo a stakeholders no técnicos validar reglas mediante código F# legible.'
    ],
    faqs: [
      { question: '¿F# es un lenguaje de nicho o prácticamente útil?', answer: 'F# es de nicho pero prácticamente potente. Sobresale en finanzas cuantitativas, transformación de datos y modelado de dominio. Si trabajas en el ecosistema .NET, las habilidades F# proporcionan una ventaja significativa para dominios de problemas específicos. El sector de finanzas cuantitativas en Londres particularmente valora la experiencia en F#.' },
      { question: '¿Puedo usar F# junto con C# en el mismo proyecto?', answer: 'Sí, F# y C# interoperan completamente dentro del ecosistema .NET. Muchos equipos usan F# para lógica de dominio y procesamiento de datos mientras usan C# para código de infraestructura. Este enfoque pragmático aprovecha las fortalezas de cada lenguaje.' },
      { question: '¿Cómo hago la transición de C# a F#?', answer: 'Comienza con F# para scripting y manipulación de datos, luego aplícalo al modelado de dominio. El enfoque funcional-primero requiere cambiar de objetos mutables a registros inmutables y uniones discriminadas. F# for Fun and Profit es el recurso de aprendizaje más recomendado para desarrolladores C#.' }
    ]
  },
  'sql': {
    slug: 'sql',
    title: 'SQL',
    description: 'SQL (Structured Query Language) es el lenguaje estándar para gestionar y consultar bases de datos relacionales. Desarrollado por primera vez en IBM en la década de 1970, SQL está implementado en todos los principales sistemas de bases de datos incluyendo PostgreSQL, MySQL, Microsoft SQL Server, Oracle Database y SQLite. El estándar SQL:2023 introdujo mejoras JSON, consultas de grafos de propiedades y arrays multidimensionales.\n\nSQL es el lenguaje de bases de datos más ampliamente utilizado en el mundo. Cada aplicación web, aplicación móvil y sistema empresarial que almacena datos depende de SQL de alguna forma. SQL moderno va mucho más allá de las operaciones CRUD básicas: funciones de ventana, expresiones de tabla comunes (CTEs), consultas recursivas y operaciones JSON permiten consultas analíticas complejas. PostgreSQL y SQL Server tienen conjuntos de características SQL particularmente ricos.\n\nEl conocimiento de SQL es fundamental en prácticamente todos los roles técnicos. Los analistas de datos usan SQL como su herramienta principal, los desarrolladores backend lo escriben diariamente, los ingenieros de datos construyen pipelines ETL con él, e incluso los ingenieros DevOps necesitan SQL para monitoreo y resolución de problemas. Entender optimización de consultas, indexación y planes de ejecución es esencial para construir aplicaciones con buen rendimiento.',
    whyImportant: 'SQL es la habilidad técnica más universalmente requerida en el mercado laboral, apareciendo en más del 50% de todas las ofertas de trabajo técnicas. La competencia en SQL es esperada para analistas de datos ($70,000-$100,000), desarrolladores backend ($110,000-$150,000) e ingenieros de datos ($120,000-$160,000).\n\nIncluir SQL en tu currículum es esencial para prácticamente cualquier rol técnico o relacionado con datos. Los sistemas ATS casi universalmente marcan SQL como palabra clave requerida. Demostrar conocimiento avanzado de SQL (funciones de ventana, optimización de consultas, CTEs) te distingue de candidatos con solo habilidades básicas de consulta.',
    keywords: ['habilidades sql currículum', 'currículum desarrollador sql', 'palabras clave sql currículum', 'currículum programación sql'],
    searchIntents: ['cómo incluir sql en currículum', 'habilidades sql para analista de datos', 'ejemplos currículum desarrollador sql'],
    relatedSkills: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle', 'Optimización de Consultas', 'Funciones de Ventana', 'CTEs', 'Indexación', 'Diseño de Bases de Datos', 'Procedimientos Almacenados'],
    professionSlugs: ['analista-de-datos', 'ingeniero-de-datos', 'desarrollador-backend', 'administrador-de-base-de-datos', 'desarrollador-de-base-de-datos', 'cientifico-de-datos', 'desarrollador-de-bi', 'ingeniero-de-software'],
    atsKeywords: ['SQL', 'PostgreSQL', 'MySQL', 'SQL Server', 'Oracle', 'consultas', 'joins', 'funciones de ventana', 'CTEs', 'procedimientos almacenados', 'indexación', 'diseño de bases de datos'],
    resumeTips: [
      'Especifica con qué bases de datos SQL tienes experiencia (PostgreSQL, MySQL, SQL Server).',
      'Destaca características avanzadas de SQL como funciones de ventana, CTEs y optimización de consultas.',
      'Incluye volúmenes de datos procesados y mejoras de rendimiento de consultas.',
      'Menciona experiencia en diseño de bases de datos y normalización.',
      'Referencia trabajo ETL y pipelines de datos que involucren SQL.',
      'Distingue entre experiencia SQL transaccional (OLTP) y analítica (OLAP).'
    ],
    exampleBullets: [
      'Optimicé consultas SQL críticas reduciendo el tiempo de ejecución promedio de 45 segundos a 200ms, mejorando los tiempos de respuesta de la aplicación para 100,000 usuarios activos diarios.',
      'Diseñé e implementé un esquema de base de datos PostgreSQL para una plataforma SaaS gestionando 500 millones de registros con indexación óptima, soportando 50,000 consultas por segundo.',
      'Construí pipelines ETL basados en SQL procesando 10TB de datos diarios a través de más de 200 tablas fuente, proporcionando datos limpios para un equipo de 30 analistas y reduciendo el tiempo de generación de reportes en un 80%.',
      'Escribí SQL avanzado con funciones de ventana y CTEs para reportes financieros, automatizando análisis de cierre de mes que previamente requería 3 días de trabajo manual en Excel.',
      'Migré 5 años de datos (2 mil millones de filas) de Oracle a PostgreSQL con cero tiempo de inactividad, reduciendo costos anuales de licenciamiento en $350,000.'
    ],
    faqs: [
      { question: '¿En qué base de datos SQL debería enfocarme?', answer: 'PostgreSQL es la opción más versátil y cada vez más popular. MySQL es la más ampliamente desplegada. SQL Server es dominante en entornos empresariales Microsoft. Para máxima flexibilidad profesional, aprende PostgreSQL bien y entiende las diferencias entre bases de datos. La mayoría de las habilidades SQL se transfieren entre plataformas.' },
      { question: '¿Cómo demuestro habilidades avanzadas en SQL?', answer: 'Destaca funciones de ventana, CTEs recursivos, optimización de consultas, análisis de planes de ejecución y joins complejos en tu experiencia. Incluye métricas específicas como mejoras de rendimiento de consultas, volúmenes de datos manejados y decisiones de diseño de bases de datos. SQL avanzado va más allá de sentencias SELECT.' },
      { question: '¿Debería listar SQL por separado de bases de datos específicas?', answer: 'Sí, lista tanto "SQL" como habilidad general como bases de datos específicas (PostgreSQL, MySQL, SQL Server) por separado. Los sistemas ATS buscan tanto palabras clave generales de SQL como nombres específicos de bases de datos. Esto maximiza tu visibilidad en filtrados automatizados.' }
    ]
  },
  'plsql': {
    slug: 'plsql',
    title: 'PL/SQL',
    description: 'PL/SQL (Procedural Language for SQL) es la extensión procedimental de Oracle a SQL. Permite escribir procedimientos almacenados, funciones, paquetes, triggers y lógica de base de datos compleja dentro de Oracle Database. PL/SQL 23c (Oracle Database 23c) introdujo dominios SQL, procedimientos almacenados JavaScript y vistas de dualidad JSON-relacional.\n\nPL/SQL es la columna vertebral de las aplicaciones empresariales basadas en Oracle, manejando procesamiento de transacciones, aplicación de reglas de negocio, validación de datos y procesamiento por lotes dentro de la capa de base de datos. Soporta manejo de excepciones, cursores, operaciones masivas (FORALL, BULK COLLECT), funciones de tabla pipelined y compilación condicional. Oracle Application Express (APEX) usa PL/SQL para desarrollo rápido de aplicaciones.\n\nPL/SQL sigue siendo crítico en industrias con fuertes inversiones en Oracle: banca, seguros, salud, gobierno y telecomunicaciones. Los sistemas de Planificación de Recursos Empresariales (ERP) como Oracle E-Business Suite y Oracle Cloud Applications dependen extensivamente de PL/SQL para lógica de negocio y personalización.',
    whyImportant: 'Los desarrolladores PL/SQL son esenciales para empresas dependientes de Oracle. Los desarrolladores PL/SQL obtienen salarios medianos de $105,000-$140,000, con roles combinados de DBA Oracle/desarrollador ganando $150,000+.\n\nIncluir PL/SQL en tu currículum abre puertas a posiciones estables y bien compensadas en organizaciones empresariales. La base instalada de Oracle genera demanda consistente de experiencia PL/SQL, particularmente en sectores bancario, de salud y gubernamental donde las bases de datos Oracle están profundamente arraigadas.',
    keywords: ['currículum desarrollador plsql', 'palabras clave pl sql currículum', 'currículum oracle plsql', 'currículum programador plsql'],
    searchIntents: ['cómo incluir plsql en currículum', 'requisitos trabajo desarrollador plsql', 'oportunidades carrera oracle plsql'],
    relatedSkills: ['Oracle Database', 'SQL', 'Oracle APEX', 'Procedimientos Almacenados', 'Triggers', 'Oracle EBS', 'Optimización de Rendimiento', 'Operaciones Masivas', 'Paquetes', 'Oracle Cloud'],
    professionSlugs: ['desarrollador-de-base-de-datos', 'administrador-de-base-de-datos', 'desarrollador-backend', 'ingeniero-de-datos', 'desarrollador-de-erp', 'desarrollador-de-software'],
    atsKeywords: ['PL/SQL', 'Oracle', 'procedimientos almacenados', 'paquetes', 'triggers', 'cursores', 'bulk collect', 'FORALL', 'Oracle APEX', 'optimización de rendimiento', 'Oracle EBS', 'programación de bases de datos'],
    resumeTips: [
      'Combina PL/SQL con experiencia en versiones de Oracle Database.',
      'Destaca optimización de rendimiento con operaciones masivas.',
      'Menciona aplicaciones empresariales específicas (Oracle EBS, Oracle Cloud).',
      'Incluye desarrollo de procedimientos almacenados y paquetes a escala.',
      'Referencia procesamiento por lotes y manejo de volumen de transacciones.'
    ],
    exampleBullets: [
      'Desarrollé más de 200 procedimientos almacenados y paquetes PL/SQL para una implementación Oracle EBS procesando $2B en transacciones anuales de adquisiciones.',
      'Optimicé procesamiento por lotes PL/SQL usando BULK COLLECT y FORALL, reduciendo el runtime ETL nocturno de 6 horas a 45 minutos para 50 millones de registros.',
      'Construí una aplicación Oracle APEX con backend PL/SQL sirviendo a 2,000 usuarios internos, reemplazando flujos de trabajo basados en papel y ahorrando 5,000 horas de empleados anualmente.',
      'Implementé triggers de auditoría PL/SQL en 300 tablas, asegurando cumplimiento SOX y proporcionando rastros de auditoría completos de transacciones para reportes regulatorios.'
    ],
    faqs: [
      { question: '¿PL/SQL vale la pena aprenderlo en 2025?', answer: 'Sí, si apuntas a entornos empresariales usando Oracle. Banca, gobierno, salud y seguros tienen inversiones masivas en Oracle que no serán migradas pronto. La experiencia PL/SQL combinada con habilidades de DBA Oracle proporciona excelente seguridad laboral y compensación.' },
      { question: '¿Cómo se compara PL/SQL con T-SQL en oportunidades de carrera?', answer: 'T-SQL (SQL Server) tiene demanda más extendida entre tamaños de empresa, mientras que PL/SQL se concentra en grandes empresas. Los roles PL/SQL a menudo pagan más debido al enfoque empresarial de Oracle. Elige según qué ecosistema de base de datos es dominante en tu industria y región objetivo.' },
      { question: '¿Debería aprender PL/SQL o migrar a bases de datos en la nube?', answer: 'Ambas. Oracle Cloud y Autonomous Database todavía usan PL/SQL. Entender PL/SQL y Oracle junto con estrategias de migración a la nube te hace valioso para proyectos de modernización. El mercado necesita desarrolladores que puedan conectar Oracle legacy con arquitecturas de nube modernas.' }
    ]
  },
  't-sql': {
    slug: 't-sql',
    title: 'T-SQL',
    description: 'T-SQL (Transact-SQL) es la extensión procedimental de Microsoft a SQL, utilizada en SQL Server y Azure SQL Database. T-SQL agrega flujo de control, manejo de errores, variables locales y gestión de transacciones al SQL estándar. SQL Server 2022 introdujo tablas ledger, mejoras JSON y características mejoradas de inteligencia de consultas. Azure SQL Database proporciona T-SQL en la nube con auto-tuning y capacidades serverless.\n\nT-SQL impulsa procedimientos almacenados, funciones definidas por el usuario, triggers y vistas en el ecosistema de bases de datos Microsoft. Las características avanzadas incluyen funciones de ventana, operaciones MERGE, Expresiones de Tabla Comunes (CTEs), CROSS APPLY y procesamiento JSON. SQL Server Integration Services (SSIS), SQL Server Reporting Services (SSRS) y SQL Server Analysis Services (SSAS) extienden T-SQL hacia ETL, reportes y analítica.\n\nT-SQL es el lenguaje de base de datos para el stack Microsoft, usado extensivamente en aplicaciones .NET, backends de Power BI y servicios en la nube Azure. Es el lenguaje principal para desarrollo de bases de datos en empresas que usan tecnologías Microsoft, desde empresas Fortune 500 hasta agencias gubernamentales.',
    whyImportant: 'Las habilidades T-SQL tienen alta demanda en todo el ecosistema de tecnología Microsoft. Los desarrolladores T-SQL obtienen salarios medianos de $100,000-$140,000, con desarrolladores y arquitectos senior de bases de datos ganando $160,000+.\n\nIncluir T-SQL en tu currículum es esencial para roles en organizaciones centradas en Microsoft. Se combina naturalmente con C#, .NET, Azure y Power BI, creando un perfil completo del stack Microsoft que muchas empresas buscan específicamente.',
    keywords: ['currículum desarrollador t-sql', 'habilidades tsql currículum', 'currículum desarrollador sql server', 'currículum transact sql'],
    searchIntents: ['cómo incluir t-sql en currículum', 'consejos currículum desarrollador sql server', 'habilidades t-sql para solicitud de empleo'],
    relatedSkills: ['SQL Server', 'Azure SQL', 'SSIS', 'SSRS', 'SSAS', 'Procedimientos Almacenados', 'Optimización de Rendimiento', 'Indexación', 'Power BI', '.NET'],
    professionSlugs: ['desarrollador-de-base-de-datos', 'administrador-de-base-de-datos', 'ingeniero-de-datos', 'desarrollador-backend', 'desarrollador-de-bi', 'analista-de-datos'],
    atsKeywords: ['T-SQL', 'SQL Server', 'Azure SQL', 'procedimientos almacenados', 'SSIS', 'SSRS', 'optimización de rendimiento', 'indexación', 'CTEs', 'funciones de ventana', 'MERGE', 'optimización de consultas'],
    resumeTips: [
      'Especifica versiones de SQL Server y experiencia con Azure SQL.',
      'Destaca experiencia SSIS, SSRS o SSAS para roles BI.',
      'Incluye logros de optimización de rendimiento y consultas.',
      'Menciona experiencia con Azure SQL y migración de bases de datos a la nube.',
      'Referencia volúmenes de datos específicos y métricas de rendimiento de consultas.'
    ],
    exampleBullets: [
      'Desarrollé procedimientos almacenados T-SQL procesando 20 millones de transacciones financieras diarias con tiempos de respuesta menores a un segundo, manteniendo integridad de datos a través de 500 tablas interconectadas.',
      'Construí paquetes SSIS automatizando integración de datos de más de 30 fuentes en un data warehouse SQL Server, reduciendo la preparación manual de datos de 3 días a 2 horas.',
      'Optimicé consultas T-SQL para una plataforma de reportes, reduciendo el tiempo promedio de consulta de 30 segundos a 800ms y habilitando dashboards en tiempo real para 200 usuarios de negocio.',
      'Migré bases de datos SQL Server on-premise a Azure SQL, logrando 40% de reducción de costos mientras mejoraba la disponibilidad a un SLA de 99.99%.'
    ],
    faqs: [
      { question: '¿Debería listar T-SQL y SQL por separado?', answer: 'Sí. Lista "SQL" como habilidad general y "T-SQL" o "SQL Server" específicamente. Algunas ofertas de trabajo usan "SQL" genéricamente mientras que otras requieren específicamente experiencia T-SQL. Listar ambos asegura coincidencia ATS para cualquier palabra clave.' },
      { question: '¿T-SQL es relevante con el cambio a bases de datos en la nube?', answer: 'Absolutamente. Azure SQL Database usa T-SQL, y Microsoft continúa invirtiendo fuertemente en características T-SQL. La sintaxis y habilidades se transfieren directamente de SQL Server on-premise a Azure. El conocimiento T-SQL es igualmente valioso en entornos cloud-first.' },
      { question: '¿Cómo demuestro experiencia T-SQL más allá de consultas básicas?', answer: 'Destaca experiencia con funciones de ventana, CTEs, sentencias MERGE, SQL dinámico, optimización de rendimiento y análisis de planes de ejecución. Incluye experiencia SSIS/SSRS para roles de ingeniería de datos, y menciona estrategias de indexación y optimización de consultas con mejoras de rendimiento específicas.' }
    ]
  },
  'nosql': {
    slug: 'nosql',
    title: 'NoSQL',
    description: 'NoSQL (Not Only SQL) abarca tecnologías de bases de datos diseñadas para modelos de datos específicos y patrones de acceso más allá de las bases de datos relacionales tradicionales. Las cuatro categorías principales de NoSQL son bases de datos de documentos (MongoDB, Couchbase), almacenes clave-valor (Redis, DynamoDB), almacenes de familia de columnas (Cassandra, HBase) y bases de datos de grafos (Neo4j, Amazon Neptune). Cada tipo está optimizado para diferentes casos de uso.\n\nMongoDB es la base de datos NoSQL más popular, ofreciendo un modelo de documentos flexible con transacciones ACID. Redis proporciona almacenamiento clave-valor en memoria para caché y aplicaciones en tiempo real. Apache Cassandra maneja datos distribuidos a escala masiva a través de múltiples centros de datos. DynamoDB ofrece NoSQL serverless en AWS con rendimiento de milisegundos de un solo dígito. Neo4j se especializa en relaciones de grafos para redes sociales, motores de recomendación y grafos de conocimiento.\n\nLas bases de datos NoSQL impulsan aplicaciones modernas que requieren esquemas flexibles, escalabilidad horizontal, alta disponibilidad y patrones de acceso a datos específicos. Son esenciales para aplicaciones en tiempo real, gestión de contenido, datos IoT, gestión de sesiones y cualquier escenario donde el esquema rígido de las bases de datos relacionales es una limitación.',
    whyImportant: 'La experiencia en NoSQL es requerida en más del 40% de las ofertas de trabajo backend e ingeniería de datos. Los desarrolladores con habilidades NoSQL ganan $115,000-$155,000, con especialistas en bases de datos distribuidas ganando más.\n\nIncluir bases de datos NoSQL en tu currículum demuestra conocimiento de arquitectura de datos moderna. Los empleadores valoran candidatos que entienden cuándo usar NoSQL vs. bases de datos relacionales, lo cual señala madurez arquitectónica. La experiencia específica en bases de datos NoSQL (MongoDB, Redis, Cassandra) es más valiosa que menciones genéricas de "NoSQL".',
    keywords: ['habilidades nosql currículum', 'currículum base de datos nosql', 'palabras clave mongodb currículum', 'currículum desarrollador nosql'],
    searchIntents: ['cómo incluir nosql en currículum', 'habilidades nosql para desarrollador backend', 'consejos currículum base de datos nosql'],
    relatedSkills: ['MongoDB', 'Redis', 'Cassandra', 'DynamoDB', 'Neo4j', 'Couchbase', 'Bases de Datos de Documentos', 'Almacenes Clave-Valor', 'Modelado de Datos', 'Sistemas Distribuidos'],
    professionSlugs: ['desarrollador-backend', 'ingeniero-de-datos', 'administrador-de-base-de-datos', 'desarrollador-de-base-de-datos', 'desarrollador-full-stack', 'ingeniero-de-nube', 'ingeniero-de-software', 'arquitecto-de-datos'],
    atsKeywords: ['NoSQL', 'MongoDB', 'Redis', 'Cassandra', 'DynamoDB', 'Neo4j', 'base de datos de documentos', 'clave-valor', 'caché', 'base de datos distribuida', 'diseño de esquema', 'escalado horizontal'],
    resumeTips: [
      'Lista bases de datos NoSQL específicas en lugar de solo "NoSQL".',
      'Explica por qué elegiste NoSQL sobre relacional para proyectos específicos.',
      'Incluye métricas de volumen de datos y rendimiento.',
      'Menciona modelado de datos y diseño de esquema para bases de datos de documentos.',
      'Destaca estrategias de caché para experiencia con almacenes clave-valor.',
      'Referencia experiencia en escalado horizontal y despliegue distribuido.'
    ],
    exampleBullets: [
      'Diseñé un esquema de documentos MongoDB para una plataforma de gestión de contenido manejando 50 millones de documentos, reduciendo la latencia de consultas en un 60% comparado con el diseño relacional anterior.',
      'Implementé una capa de caché Redis reduciendo la carga de base de datos en un 80% y mejorando tiempos de respuesta API de 500ms a 30ms para una plataforma que sirve a 2 millones de usuarios diarios.',
      'Construí un almacén de datos de series temporales basado en Cassandra ingiriendo 1 mil millones de eventos IoT diarios a través de 5 centros de datos con 99.99% de disponibilidad de escritura.',
      'Desarrollé un motor de recomendaciones impulsado por Neo4j aumentando las ventas cruzadas de productos en un 35%, procesando 10 millones de recorridos de grafos por día.'
    ],
    faqs: [
      { question: '¿Debería listar "NoSQL" o bases de datos específicas en mi currículum?', answer: 'Lista ambos. Incluye "NoSQL" como categoría y bases de datos específicas (MongoDB, Redis, Cassandra, DynamoDB) como habilidades individuales. Las ofertas de trabajo varían en si usan el término general o nombres específicos de bases de datos, así que cubriendo ambos maximizas la coincidencia ATS.' },
      { question: '¿Qué base de datos NoSQL debería aprender primero?', answer: 'MongoDB es la más demandada y ampliamente aplicable. Redis es esencial para caché (casi toda aplicación lo usa). DynamoDB si trabajas en AWS. Elige según tus roles objetivo: bases de datos de documentos para backend general, Redis para optimización de rendimiento, Cassandra para sistemas distribuidos a gran escala.' },
      { question: '¿Cómo demuestro experiencia NoSQL más allá del uso básico?', answer: 'Demuestra comprensión del modelado de datos para tipos específicos de NoSQL, compensaciones de consistencia (teorema CAP), estrategias de indexación, configuración de replicación y cuándo elegir NoSQL vs. relacional. Incluye métricas de escala y explica las decisiones arquitectónicas detrás de tus elecciones NoSQL.' }
    ]
  },
  'graphql': {
    slug: 'graphql',
    title: 'GraphQL',
    description: 'GraphQL es un lenguaje de consulta y runtime para APIs desarrollado por Facebook (Meta) en 2012 y liberado como código abierto en 2015. A diferencia de REST, GraphQL permite a los clientes solicitar exactamente los datos que necesitan en una sola consulta, eliminando el sobre-fetching y sub-fetching. La especificación GraphQL es mantenida por la GraphQL Foundation bajo la Linux Foundation.\n\nEl ecosistema GraphQL incluye Apollo (cliente y servidor), Relay (cliente GraphQL de Meta), Hasura (GraphQL instantáneo sobre bases de datos), Prisma (toolkit de bases de datos con integración GraphQL) y GraphQL Yoga (framework de servidor). Federation permite componer múltiples servicios GraphQL en una API unificada. Las suscripciones GraphQL proporcionan datos en tiempo real a través de WebSockets.\n\nGraphQL es usado por GitHub, Shopify, Airbnb, Twitter, PayPal y The New York Times para sus APIs públicas e internas. Es particularmente valioso para aplicaciones móviles donde la eficiencia del ancho de banda importa y para aplicaciones frontend complejas que agregan datos de múltiples servicios.',
    whyImportant: 'La experiencia en GraphQL es cada vez más requerida en roles frontend y full-stack, apareciendo en más del 25% de las ofertas de desarrollo web moderno. Los desarrolladores GraphQL ganan $115,000-$150,000, con arquitectos senior de API ganando más.\n\nIncluir GraphQL en tu currículum señala experiencia moderna en desarrollo de APIs. A medida que más empresas adoptan GraphQL para sus APIs, esta habilidad te diferencia de desarrolladores que solo conocen REST. La experiencia con Apollo y Federation es particularmente valorada para aplicaciones a escala empresarial.',
    keywords: ['currículum desarrollador graphql', 'habilidades graphql currículum', 'currículum api graphql', 'palabras clave graphql currículum'],
    searchIntents: ['cómo incluir graphql en currículum', 'habilidades graphql para desarrolladores', 'consejos currículum desarrollador graphql'],
    relatedSkills: ['Apollo', 'APIs REST', 'Relay', 'Federation', 'Hasura', 'Prisma', 'Suscripciones', 'Diseño de Esquemas', 'TypeScript', 'React'],
    professionSlugs: ['desarrollador-frontend', 'desarrollador-full-stack', 'desarrollador-backend', 'desarrollador-de-api', 'ingeniero-de-software', 'desarrollador-web'],
    atsKeywords: ['GraphQL', 'Apollo', 'Relay', 'Federation', 'diseño de esquemas', 'queries', 'mutations', 'suscripciones', 'alternativa REST', 'desarrollo de API', 'Hasura', 'resolvers'],
    resumeTips: [
      'Destaca tanto diseño de esquemas (backend) como consumo de cliente (frontend).',
      'Menciona Apollo, Relay u otras herramientas GraphQL específicas.',
      'Incluye mejoras de rendimiento sobre implementaciones REST anteriores.',
      'Referencia experiencia con Federation para composición de APIs empresariales.',
      'Muestra experiencia en implementación de suscripciones en tiempo real.'
    ],
    exampleBullets: [
      'Diseñé un gateway API GraphQL usando Apollo Federation, unificando 12 microservicios en un solo esquema y reduciendo llamadas API del frontend en un 70%.',
      'Migré una API REST a GraphQL, reduciendo la transferencia de datos de la aplicación móvil en un 60% y mejorando los tiempos de carga de página en un 40% para 500,000 usuarios móviles.',
      'Implementé suscripciones GraphQL para un dashboard de trading en tiempo real, entregando actualizaciones de precios a 10,000 usuarios concurrentes con latencia menor a 50ms.',
      'Construí una capa API GraphQL basada en Hasura sobre PostgreSQL, permitiendo a 4 equipos frontend desarrollar funcionalidades independientemente sin cambios en la API backend, acelerando la entrega de funcionalidades en un 50%.'
    ],
    faqs: [
      { question: '¿Debería aprender GraphQL o REST?', answer: 'Aprende ambos. REST sigue siendo más ampliamente usado y es el estándar para APIs CRUD simples. GraphQL sobresale para requisitos de datos complejos, aplicaciones móviles y APIs consumidas por múltiples equipos frontend. Entender ambos y saber cuándo elegir cada uno es la combinación de habilidades más valiosa.' },
      { question: '¿GraphQL está reemplazando las APIs REST?', answer: 'No, GraphQL complementa REST en lugar de reemplazarlo. Muchas empresas usan GraphQL como una capa gateway que agrega múltiples servicios REST/gRPC. REST es más simple para operaciones CRUD directas y mejor para cargas de archivos y caché. Ambos seguirán siendo relevantes.' },
      { question: '¿Cómo demuestro experiencia en GraphQL?', answer: 'Muestra habilidades de diseño de esquemas, prevención de consultas n+1 con DataLoader, patrones de autenticación y autorización, optimización de rendimiento y Federation para esquemas distribuidos. Incluye métricas comparando implementaciones GraphQL vs. REST en términos de transferencia de datos y reducción de llamadas API.' }
    ]
  },
  'bash-scripting': {
    slug: 'scripting-bash',
    title: 'Scripting en Bash',
    description: 'Bash (Bourne Again Shell) es el shell predeterminado en la mayoría de las distribuciones Linux y macOS. El scripting en Bash permite automatización de tareas de administración de sistemas, flujos de trabajo de despliegue y pipelines de procesamiento de datos. Bash 5.2 es la versión actual, presentando arrays asociativos mejorados y expansión de parámetros mejorada. Los scripts Bash son el lenguaje de pegamento universal de los sistemas Unix/Linux.\n\nEl scripting en Bash es fundamental para DevOps, administración de sistemas y pipelines CI/CD. Los usos comunes incluyen aprovisionamiento de servidores, análisis de logs, automatización de backups, scripts de despliegue, scripts de entrypoint de Docker y flujos de trabajo de GitHub Actions/GitLab CI. Bash se integra perfectamente con utilidades Unix como awk, sed, grep, find y xargs, así como herramientas modernas como jq para procesamiento JSON.\n\nCada servidor Linux, contenedor Docker y pipeline CI/CD depende de scripts Bash. Aunque lenguajes como Python ofrecen más características, Bash es ubicuo y no requiere dependencias adicionales; se ejecuta en cada sistema tipo Unix sin configuración, haciéndolo la herramienta de primera elección para automatización de infraestructura y tareas rápidas del sistema.',
    whyImportant: 'El scripting en Bash es una habilidad requerida para roles de DevOps, SRE y administración de sistemas, apareciendo en más del 60% de estas ofertas de trabajo. Los ingenieros DevOps con fuertes habilidades en Bash ganan $120,000-$155,000.\n\nIncluir Bash en tu currículum es esencial para cualquier rol relacionado con infraestructura. Demuestra la capacidad de automatizar gestión de servidores, escribir scripts de despliegue y navegar entornos Linux eficientemente. Incluso para roles de desarrollador, la competencia en Bash señala comodidad con entornos de producción.',
    keywords: ['currículum scripting bash', 'habilidades bash currículum', 'currículum shell scripting', 'currículum desarrollador bash'],
    searchIntents: ['cómo incluir bash en currículum', 'habilidades scripting bash para devops', 'consejos currículum bash'],
    relatedSkills: ['Linux', 'Shell Scripting', 'Unix', 'awk', 'sed', 'grep', 'CI/CD', 'Docker', 'Automatización', 'Administración de Sistemas'],
    professionSlugs: ['ingeniero-devops', 'administrador-de-sistemas', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-nube', 'ingeniero-de-redes', 'ingeniero-de-infraestructura', 'ingeniero-de-software'],
    atsKeywords: ['Bash', 'shell scripting', 'Linux', 'automatización', 'CI/CD', 'cron', 'awk', 'sed', 'grep', 'scripting', 'Unix', 'línea de comandos'],
    resumeTips: [
      'Combina Bash con administración Linux y contexto DevOps.',
      'Cuantifica logros de automatización (tiempo ahorrado, errores eliminados).',
      'Menciona experiencia en scripting de pipelines CI/CD.',
      'Incluye experiencia en Bash relacionada con Docker y contenedores.',
      'Referencia tamaños de flotas de servidores y escala de automatización.'
    ],
    exampleBullets: [
      'Desarrollé scripts de automatización Bash gestionando una flota de 500 servidores Linux, reduciendo el tiempo de configuración manual en un 90% y estandarizando entornos entre desarrollo, staging y producción.',
      'Construí scripts de pipeline CI/CD en Bash para GitHub Actions, automatizando build, pruebas y despliegue para 25 microservicios y reduciendo el ciclo de lanzamiento de 2 semanas a despliegues diarios.',
      'Creé un toolkit de análisis de logs basado en Bash procesando 100GB de logs diarios, identificando anomalías de rendimiento en tiempo real y reduciendo el tiempo medio de detección de 2 horas a 5 minutos.',
      'Automaticé procedimientos de backup de bases de datos y recuperación de desastres usando Bash, logrando RPO de 15 minutos y RTO de 30 minutos para 50 bases de datos de producción.'
    ],
    faqs: [
      { question: '¿Debería aprender Bash o Python para automatización?', answer: 'Aprende ambos. Bash es esencial para tareas rápidas del sistema, scripts CI/CD y entrypoints de Docker donde no se deben requerir dependencias adicionales. Python es mejor para automatización compleja con manejo de errores, integración de APIs y bases de código mantenibles. Usa Bash para pegamento y tareas del sistema, Python para automatización a nivel de aplicación.' },
      { question: '¿Qué tan avanzadas deberían ser mis habilidades en Bash?', answer: 'Para roles DevOps y sysadmin, deberías sentirte cómodo con funciones, arrays, expansión de parámetros, manejo de errores (set -euo pipefail), sustitución de procesos e integración con herramientas como jq, awk y sed. Temas avanzados incluyen manejo de señales, gestión de descriptores de archivo y optimización de rendimiento.' },
      { question: '¿El scripting Bash es relevante para roles que no son de operaciones?', answer: 'Sí. Cualquier desarrollador que trabaje con Linux, Docker o CI/CD se beneficia de la competencia en Bash. Escribir scripts de build eficientes, entrypoints de Docker y scripts de configuración de entorno de desarrollo son tareas comunes. Se espera competencia básica en Bash en la mayoría de los roles técnicos.' }
    ]
  },
  'powershell': {
    slug: 'powershell',
    title: 'PowerShell',
    description: 'PowerShell es una solución de automatización de tareas multiplataforma de Microsoft, que comprende un shell de línea de comandos, lenguaje de scripting y framework de gestión de configuración. PowerShell 7.4 (construido sobre .NET 8) proporciona soporte multiplataforma en Windows, macOS y Linux. A diferencia de los shells tradicionales que pasan texto, PowerShell pasa objetos .NET a través del pipeline, permitiendo manipulación de datos potente.\n\nPowerShell es la herramienta de automatización principal para administración de Windows Server, gestión de Active Directory, operaciones en la nube Azure, administración de Microsoft 365 y gestión de Exchange Server. La PowerShell Gallery aloja más de 12,000 módulos. Las capacidades clave incluyen Desired State Configuration (DSC) para infraestructura como código, PowerShell Remoting para gestionar máquinas remotas e integración profunda con todos los productos Microsoft.\n\nPowerShell es esencial para gestionar infraestructura basada en Windows, recursos Azure (módulo Az), AWS (AWS.Tools) y VMware (PowerCLI). Su pipeline orientado a objetos e integración .NET lo hacen significativamente más potente que los shells tradicionales basados en texto para tareas de automatización complejas.',
    whyImportant: 'PowerShell es requerido para roles de administración de sistemas Windows y gestión de la nube Azure. Los profesionales competentes en PowerShell ganan $100,000-$140,000 en EE.UU., con ingenieros senior de automatización Azure ganando $160,000+.\n\nIncluir PowerShell en tu currículum es esencial para cualquier rol que involucre infraestructura Windows, Active Directory, Azure o administración de Microsoft 365. Demuestra capacidad de automatización en el ecosistema Microsoft, que sigue siendo dominante en entornos empresariales.',
    keywords: ['habilidades powershell currículum', 'currículum desarrollador powershell', 'currículum automatización powershell', 'currículum scripting powershell'],
    searchIntents: ['cómo incluir powershell en currículum', 'habilidades powershell para sysadmin', 'consejos currículum powershell'],
    relatedSkills: ['Windows Server', 'Active Directory', 'Azure', 'DSC', 'Automatización', 'Microsoft 365', '.NET', 'CI/CD', 'Exchange Server', 'VMware PowerCLI'],
    professionSlugs: ['administrador-de-sistemas', 'ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-aws', 'ingeniero-de-google-cloud', 'ingeniero-de-redes', 'ingeniero-de-infraestructura'],
    atsKeywords: ['PowerShell', 'automatización', 'Windows Server', 'Active Directory', 'Azure', 'DSC', 'scripting', 'Microsoft 365', 'Exchange', 'PowerCLI', 'CI/CD', '.NET'],
    resumeTips: [
      'Especifica la versión de PowerShell (5.1 para Windows, 7.x para multiplataforma).',
      'Destaca automatización Azure con el módulo Az.',
      'Incluye experiencia en gestión de Active Directory y Directivas de Grupo.',
      'Menciona Desired State Configuration (DSC) para infraestructura como código.',
      'Referencia tamaños de flotas de servidores y alcance de automatización.'
    ],
    exampleBullets: [
      'Desarrollé scripts de automatización PowerShell gestionando 2,000 servidores Windows, reduciendo el tiempo de despliegue de parches de 3 días a 4 horas y logrando 99.5% de tasa de cumplimiento.',
      'Construí scripts de aprovisionamiento de infraestructura Azure usando el módulo Az de PowerShell, automatizando el despliegue de más de 100 recursos Azure y reduciendo la configuración de entornos de 2 días a 30 minutos.',
      'Creé herramientas de gestión de Active Directory basadas en PowerShell para una empresa de 15,000 usuarios, automatizando aprovisionamiento de usuarios, asignación de licencias y offboarding con cero intervención manual.',
      'Implementé configuraciones DSC de PowerShell asegurando builds de servidor consistentes en 500 nodos, reduciendo incidentes de desviación de configuración en un 95%.'
    ],
    faqs: [
      { question: '¿PowerShell es relevante fuera de Windows?', answer: 'Sí. PowerShell 7.x se ejecuta en Windows, macOS y Linux. Se usa cada vez más para automatización de Azure, AWS y GCP independientemente del sistema operativo. Sin embargo, su propuesta de valor más fuerte sigue siendo en entornos centrados en Windows y la nube Microsoft.' },
      { question: '¿Debería aprender PowerShell o Bash?', answer: 'Aprende ambos. Bash es esencial para Linux/macOS y la mayoría de entornos CI/CD. PowerShell es esencial para infraestructura Windows y servicios en la nube Microsoft. Los profesionales DevOps deberían ser competentes en ambos para gestionar entornos heterogéneos.' },
      { question: '¿Cómo demuestro habilidades avanzadas en PowerShell?', answer: 'Demuestra desarrollo de módulos, autoría DSC, pruebas con Pester, integración CI/CD y operaciones de pipeline complejas. Muestra experiencia gestionando Active Directory a escala, automatización de recursos Azure y scripting PowerShell 7 multiplataforma. Incluye métricas del impacto de la automatización.' }
    ]
  },
  'shell-scripting': {
    slug: 'scripting-de-shell',
    title: 'Scripting de Shell',
    description: 'El scripting de shell se refiere a escribir scripts para shells de línea de comandos Unix/Linux incluyendo Bash, Zsh, sh (shell POSIX) y otras variantes de shell. El scripting de shell es la habilidad fundamental de automatización para cualquier entorno Unix/Linux, permitiendo administración de sistemas, automatización de despliegues y procesamiento de datos a través de la línea de comandos. POSIX sh proporciona el scripting más portable entre diferentes sistemas Unix.\n\nLos scripts de shell combinan utilidades centrales de Unix (find, grep, sed, awk, sort, cut, xargs) con estructuras de control para automatizar flujos de trabajo complejos. El scripting de shell moderno se integra con Docker, Kubernetes, plataformas CI/CD y CLIs de nube (aws, gcloud, az). Herramientas como ShellCheck proporcionan análisis estático para scripts de shell, y BATS permite pruebas.\n\nEl scripting de shell sigue siendo indispensable porque no requiere runtime adicional ni dependencias; funciona en cualquier sistema Unix desde una imagen Docker Alpine mínima hasta un servidor Linux completo. Es el lenguaje predeterminado para Dockerfiles, pasos de pipelines CI/CD, trabajos cron y scripts de inicialización del sistema.',
    whyImportant: 'El scripting de shell es esperado en prácticamente todos los roles de DevOps, SRE, administración de sistemas e ingeniería backend. Está listado en más del 55% de las ofertas de trabajo de infraestructura y es una expectativa base para posiciones de ingeniería en la nube.\n\nIncluir scripting de shell en tu currículum confirma que puedes trabajar eficientemente en entornos Linux. Es una habilidad fundamental que complementa toda otra habilidad técnica, demostrando experiencia práctica en infraestructura y capacidad de automatización.',
    keywords: ['currículum scripting shell', 'habilidades script shell currículum', 'currículum scripting unix', 'currículum scripting shell linux'],
    searchIntents: ['cómo incluir scripting shell en currículum', 'habilidades scripting shell para devops', 'ejemplos currículum scripting shell'],
    relatedSkills: ['Bash', 'Linux', 'Unix', 'awk', 'sed', 'grep', 'cron', 'Docker', 'CI/CD', 'POSIX'],
    professionSlugs: ['ingeniero-devops', 'administrador-de-sistemas', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-nube', 'ingeniero-de-redes', 'desarrollador-backend', 'ingeniero-de-infraestructura'],
    atsKeywords: ['scripting shell', 'Bash', 'sh', 'Zsh', 'Linux', 'Unix', 'automatización', 'cron', 'awk', 'sed', 'grep', 'línea de comandos'],
    resumeTips: [
      'Especifica en qué shells eres competente (Bash, Zsh, POSIX sh).',
      'Destaca logros de automatización con ahorros de tiempo medibles.',
      'Incluye experiencia en scripting Docker y CI/CD.',
      'Menciona herramientas de procesamiento de texto (awk, sed, jq) junto con habilidades de shell.',
      'Referencia cumplimiento POSIX para scripting portable.'
    ],
    exampleBullets: [
      'Construí scripts de shell automatizando el despliegue de 80 microservicios a Kubernetes, reduciendo el tiempo de despliegue de 45 minutos a 5 minutos por servicio.',
      'Desarrollé scripts de shell compatibles con POSIX para pipelines CI/CD multiplataforma ejecutándose en Linux, macOS y contenedores Docker Alpine, soportando 15 equipos de desarrollo.',
      'Creé scripts de monitoreo y alertas basados en shell para 300 servidores de producción, detectando y auto-remediando el 85% de problemas comunes antes de que impactaran a los usuarios.',
      'Automaticé la orquestación de pipelines de datos usando scripts de shell procesando 2TB de archivos de log diarios, entregando analítica agregada 4 horas más rápido que el proceso manual anterior.'
    ],
    faqs: [
      { question: '¿Debería listar "scripting de shell" o "Bash" en mi currículum?', answer: 'Lista ambos. "Scripting de shell" es una categoría de habilidades más amplia que algunas ofertas de trabajo usan, mientras que "Bash" es la implementación específica más frecuentemente buscada. Incluir ambos maximiza la coincidencia ATS. También puedes listar "Bash/Shell Scripting" como entrada combinada.' },
      { question: '¿En qué se diferencia el scripting de shell del scripting Bash?', answer: 'El scripting Bash usa específicamente características de Bash (arrays, [[ ]], etc.). El scripting de shell es la categoría más amplia que incluye POSIX sh, Zsh y otros shells. El scripting POSIX shell es más portable pero tiene menos características. Para la mayoría de los currículums, la distinción no es crítica; menciona ambos.' },
      { question: '¿El scripting de shell está siendo reemplazado por Python?', answer: 'No para automatización a nivel de sistema. Los scripts de shell son irremplazables para Dockerfiles, pasos CI/CD, trabajos cron y tareas rápidas del sistema porque tienen cero dependencias. Python es mejor para automatización compleja con manejo de errores y mantenibilidad. Ambas habilidades se complementan.' }
    ]
  },
  'regex': {
    slug: 'expresiones-regulares',
    title: 'Expresiones Regulares (Regex)',
    description: 'Las expresiones regulares (regex) son patrones usados para buscar, hacer coincidencias y manipular texto. Soportadas en prácticamente todos los lenguajes de programación y editores de texto, regex es una herramienta fundamental para procesamiento de cadenas. Los motores de regex modernos soportan lookahead, lookbehind, grupos nombrados, propiedades Unicode y patrones recursivos. La biblioteca PCRE2 (Perl-Compatible Regular Expressions) es la implementación más rica en características.\n\nRegex se usa para validación de datos (emails, teléfonos, URLs), análisis de archivos de log, web scraping, operaciones de buscar-y-reemplazar, parsing de texto y sanitización de entrada. Cada lenguaje de programación importante incluye soporte regex: Python (módulo re), JavaScript (RegExp), Java (java.util.regex), y muchos más. Herramientas como grep, sed y awk están construidas alrededor de regex, y los IDEs dependen de regex para funcionalidad de búsqueda.\n\nLas aplicaciones avanzadas de regex incluyen análisis léxico en diseño de compiladores, filtrado de paquetes de red, coincidencia de reglas de seguridad en sistemas WAF/IDS y extracción de datos de texto no estructurado. Entender las características de rendimiento de regex (backtracking, backtracking catastrófico) es importante para aplicaciones en producción que procesan grandes volúmenes de texto.',
    whyImportant: 'La competencia en regex es una habilidad universal de desarrollador que aparece en entrevistas técnicas en todos los dominios de programación. Aunque típicamente no se lista como requisito principal de trabajo, la experiencia en regex es probada en entrevistas de codificación y valorada en roles de procesamiento de datos, DevOps y seguridad.\n\nIncluir regex en tu currículum demuestra experiencia en procesamiento de texto y atención a la calidad de datos. Es particularmente valioso para ingeniería de datos, análisis de logs, ingeniería de seguridad y cualquier rol que involucre extracción o validación de texto a escala.',
    keywords: ['habilidades regex currículum', 'currículum expresiones regulares', 'currículum programación regex', 'habilidades desarrollador regex'],
    searchIntents: ['cómo incluir regex en currículum', 'habilidades regex para desarrolladores', 'consejos currículum expresiones regulares'],
    relatedSkills: ['Procesamiento de Texto', 'Validación de Datos', 'grep', 'sed', 'awk', 'PCRE', 'Coincidencia de Patrones', 'Análisis de Logs', 'Web Scraping', 'Manipulación de Cadenas'],
    professionSlugs: ['ingeniero-de-software', 'ingeniero-de-datos', 'ingeniero-devops', 'analista-de-ciberseguridad', 'desarrollador-backend', 'ingeniero-de-qa'],
    atsKeywords: ['expresiones regulares', 'regex', 'regexp', 'coincidencia de patrones', 'procesamiento de texto', 'validación de datos', 'PCRE', 'grep', 'sed', 'análisis de logs', 'manipulación de cadenas', 'extracción de texto'],
    resumeTips: [
      'Incluye regex dentro del contexto de logros más grandes en lugar de como habilidad independiente.',
      'Destaca automatización de validación de datos y procesamiento de texto.',
      'Menciona creación de reglas de análisis de logs y monitoreo.',
      'Referencia aplicaciones de regex relacionadas con seguridad (reglas WAF, sanitización de entrada).',
      'Muestra regex como parte de trabajo más amplio de procesamiento de texto e ingeniería de datos.'
    ],
    exampleBullets: [
      'Desarrollé reglas de validación de datos basadas en regex procesando 5 millones de entradas de usuario diarias, detectando el 99.7% de datos malformados antes de la inserción en base de datos y reduciendo costos de limpieza de datos en un 80%.',
      'Construí un sistema de análisis de logs basado en regex analizando 50GB de logs de servidor diarios, extrayendo métricas accionables y reduciendo el tiempo de investigación de incidentes de 2 horas a 15 minutos.',
      'Creé patrones regex para configuración WAF bloqueando el 98% de intentos de inyección SQL y XSS, protegiendo una plataforma que sirve a 3 millones de usuarios.',
      'Automaticé la extracción de datos de 10,000 documentos no estructurados usando regex y Python, completando en 4 horas lo que previamente requería 3 semanas de procesamiento manual.'
    ],
    faqs: [
      { question: '¿Debería listar regex como habilidad separada en mi currículum?', answer: 'Depende del rol. Para posiciones de ingeniería de datos, seguridad y DevOps, regex vale la pena mencionarlo explícitamente. Para ingeniería de software general, demuestra competencia en regex a través de descripciones de proyectos en lugar de listarlo como habilidad independiente. Siempre menciónalo en el contexto de lo que lograste.' },
      { question: '¿Qué tan avanzado debería ser mi conocimiento de regex?', answer: 'Para la mayoría de los roles, entender clases de caracteres, cuantificadores, anclas, grupos y alternación es suficiente. Los roles senior pueden requerir lookahead/lookbehind, grupos nombrados y comprensión del rendimiento de backtracking. Los roles de seguridad necesitan patrones avanzados para validación de entrada y detección de ataques.' },
      { question: '¿Regex se evalúa en entrevistas técnicas?', answer: 'Sí, regex aparece en entrevistas de codificación para problemas de procesamiento de texto, particularmente en empresas que manejan datos a gran escala o análisis de logs. Poder escribir regex eficiente en el momento demuestra capacidad práctica de resolución de problemas que los entrevistadores valoran.' }
    ]
  },
  'xml': {
    slug: 'xml',
    title: 'XML',
    description: 'XML (eXtensible Markup Language) es un lenguaje de marcado y formato de datos estándar desarrollado por el W3C. XML proporciona un formato estructurado y auto-descriptivo para intercambio de datos entre sistemas. Aunque JSON ha reemplazado a XML para muchas APIs web, XML sigue siendo crítico en integración empresarial, formatos de documentos (DOCX, SVG, XHTML), archivos de configuración, servicios web SOAP e industrias reguladas.\n\nEl ecosistema XML incluye XSLT para transformaciones, XPath y XQuery para consultas, XML Schema (XSD) y RelaxNG para validación, y parsers SAX/DOM/StAX para procesamiento. Los namespaces XML permiten combinar vocabularios, y las firmas/encriptación XML proporcionan seguridad. Los estándares XML específicos de la industria incluyen HL7/FHIR (salud), XBRL (finanzas), UBL (adquisiciones) y RSS/Atom (sindicación).\n\nXML sigue siendo la columna vertebral de buses de servicios empresariales (ESBs), servicios web SOAP, sistemas de gestión de documentos e intercambio de datos entre organizaciones. Las instituciones financieras, organizaciones de salud y agencias gubernamentales dependen de XML para intercambio de datos regulado donde la validación de esquema y las firmas digitales son obligatorias.',
    whyImportant: 'Las habilidades XML son valoradas en integración empresarial, TI de salud, servicios financieros y roles de tecnología gubernamental. Los desarrolladores competentes en XML ganan $95,000-$135,000, con especialistas en integración empresarial ganando más.\n\nIncluir XML en tu currículum es importante para roles empresariales, de salud y tecnología financiera. Señala experiencia con patrones de integración empresarial, transformación de datos e intercambio de datos regulado, dominios donde la validación de esquema y naturaleza auto-descriptiva de XML son irremplazables.',
    keywords: ['habilidades xml currículum', 'currículum desarrollador xml', 'currículum programación xml', 'requisitos trabajo xml'],
    searchIntents: ['cómo incluir xml en currículum', 'habilidades xml para desarrollo empresarial', 'consejos currículum desarrollador xml'],
    relatedSkills: ['XSLT', 'XPath', 'XSD', 'SOAP', 'JSON', 'APIs REST', 'XQuery', 'WSDL', 'Integración Empresarial', 'Transformación de Datos'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'ingeniero-de-datos', 'arquitecto-empresarial', 'desarrollador-de-erp', 'consultor-de-ti'],
    atsKeywords: ['XML', 'XSLT', 'XPath', 'XSD', 'SOAP', 'WSDL', 'parsing XML', 'validación de esquema', 'transformación de datos', 'integración empresarial', 'namespaces', 'servicios web'],
    resumeTips: [
      'Combina XML con contextos específicos de integración empresarial.',
      'Destaca experiencia en transformaciones XSLT para roles de procesamiento de datos.',
      'Menciona estándares XML específicos de la industria (HL7, XBRL, UBL).',
      'Incluye experiencia en diseño de esquemas y validación.',
      'Referencia desarrollo de servicios web SOAP junto con XML.'
    ],
    exampleBullets: [
      'Desarrollé transformaciones XSLT procesando 2 millones de documentos XML diarios para intercambio de datos de salud HL7, logrando 99.99% de precisión en transformación.',
      'Diseñé esquemas XML (XSD) para un sistema de reportes financieros compatible con estándares XBRL, habilitando envíos regulatorios automatizados y reduciendo el tiempo de presentación en un 75%.',
      'Construí un servicio web SOAP integrándose con 50 socios externos, procesando 500,000 transacciones XML diarias con validación de esquema previniendo el 99.5% de datos malformados.',
      'Migré APIs legacy basadas en XML a REST/JSON manteniendo compatibilidad hacia atrás para 200 clientes empresariales, reduciendo los tamaños de payload en un 60%.'
    ],
    faqs: [
      { question: '¿XML sigue siendo relevante con JSON siendo el estándar?', answer: 'Sí, en dominios específicos. Integración empresarial, salud (HL7/FHIR), finanzas (XBRL) y gobierno todavía dependen fuertemente de XML. Los servicios web SOAP, formatos de documentos (Office XML) y archivos de configuración (Maven, Spring) usan XML extensivamente. Para roles empresariales, la experiencia XML sigue siendo valiosa.' },
      { question: '¿Debería listar XML en un currículum moderno?', answer: 'Sí, si tienes experiencia genuina y apuntas a roles empresariales. Para roles de startup o desarrollo web moderno, las habilidades JSON/REST son más relevantes. Enmarca XML dentro de contextos de integración empresarial o específicos de la industria en lugar de como habilidad independiente.' },
      { question: '¿Qué tecnologías XML tienen más demanda?', answer: 'XSLT para transformación de datos, XSD para diseño de esquemas, XPath para consultas y SOAP/WSDL para servicios web. Los formatos específicos de la industria (HL7, XBRL) son valiosos en sus respectivos dominios. Entender enfoques de parsing XML (DOM, SAX, streaming) es importante para aplicaciones sensibles al rendimiento.' }
    ]
  },
  'json': {
    slug: 'json',
    title: 'JSON',
    description: 'JSON (JavaScript Object Notation) es el formato de intercambio de datos estándar de facto para APIs web y aplicaciones modernas. Estandarizado como ECMA-404 y RFC 8259, JSON proporciona un formato ligero y legible por humanos para datos estructurados. JSON5 extiende el formato con comentarios y comas finales, mientras que JSON Schema proporciona capacidades de validación. JSONB en PostgreSQL y soporte JSON en MySQL permiten almacenamiento nativo en bases de datos.\n\nJSON se usa en todas partes: APIs REST, archivos de configuración (package.json, tsconfig.json), bases de datos NoSQL (MongoDB, CouchDB), colas de mensajes, sistemas de logging (logging estructurado) e intercambio de datos entre servicios. Herramientas como jq permiten procesamiento JSON en línea de comandos, y JSON Path proporciona capacidades de consulta. JSON Web Tokens (JWT) usan JSON para claims de autenticación, y JSON-LD proporciona semánticas de datos vinculados.\n\nPrácticamente todos los lenguajes de programación modernos tienen parsing JSON integrado. La simplicidad del formato y su soporte universal lo hacen la opción principal para intercambio de datos en arquitecturas de microservicios, funciones serverless y comunicación frontend-backend.',
    whyImportant: 'La competencia en JSON es una expectativa base para todos los roles de desarrollo web y relacionados con APIs. Aunque raramente es un requisito de trabajo independiente, la experiencia en JSON es probada en cada entrevista backend y full-stack.\n\nIncluir JSON en tu currículum dentro del contexto de desarrollo de APIs, procesamiento de datos o gestión de configuración demuestra habilidades de desarrollo moderno. El conocimiento de JSON Schema es particularmente valorado para roles de diseño y validación de APIs.',
    keywords: ['habilidades json currículum', 'currículum desarrollador json', 'currículum api json', 'currículum programación json'],
    searchIntents: ['cómo incluir json en currículum', 'habilidades json para desarrollo web', 'consejos currículum desarrollador json'],
    relatedSkills: ['APIs REST', 'JSON Schema', 'jq', 'MongoDB', 'JWT', 'YAML', 'XML', 'Diseño de APIs', 'Serialización de Datos', 'JSON Path'],
    professionSlugs: ['desarrollador-frontend', 'desarrollador-backend', 'desarrollador-full-stack', 'desarrollador-de-api', 'desarrollador-web', 'ingeniero-de-datos'],
    atsKeywords: ['JSON', 'REST API', 'JSON Schema', 'JWT', 'diseño de API', 'serialización de datos', 'jq', 'MongoDB', 'NoSQL', 'datos estructurados', 'intercambio de datos', 'configuración'],
    resumeTips: [
      'Incluye JSON dentro de contextos de desarrollo de APIs y procesamiento de datos.',
      'Destaca diseño de JSON Schema para validación de APIs.',
      'Menciona jq para procesamiento JSON en línea de comandos en contextos DevOps.',
      'Referencia almacenamiento JSON en bases de datos (MongoDB, PostgreSQL JSONB).',
      'Combina JSON con diseño de APIs REST y experiencia en microservicios.'
    ],
    exampleBullets: [
      'Diseñé validación JSON Schema para una API REST consumida por 300 integraciones de terceros, previniendo el 95% de solicitudes inválidas a nivel de gateway y reduciendo tickets de soporte en un 60%.',
      'Construí una plataforma de streaming de eventos basada en JSON procesando 20 millones de mensajes diarios, con evolución de esquemas soportando compatibilidad hacia atrás a través de 50 microservicios.',
      'Implementé logging JSON estructurado a través de un sistema distribuido, habilitando monitoreo en tiempo real y reduciendo el tiempo medio de resolución de 4 horas a 20 minutos.',
      'Optimicé serialización/deserialización JSON en una API de alto throughput, reduciendo la sobrecarga de procesamiento de payload en un 45% y mejorando los tiempos de respuesta de la API en un 30%.'
    ],
    faqs: [
      { question: '¿Debería listar JSON como habilidad separada en mi currículum?', answer: 'Para roles senior, JSON se asume y listarlo por separado puede parecer básico. Para roles junior a mid-level, inclúyelo dentro de un conjunto más amplio de habilidades de desarrollo de APIs. La experiencia en JSON Schema vale la pena mencionarla por separado para roles de diseño y validación de APIs.' },
      { question: '¿Qué habilidades relacionadas con JSON son más valiosas?', answer: 'JSON Schema para validación de APIs, jq para procesamiento en línea de comandos, operaciones JSONB/JSON en bases de datos, JWT para autenticación y serialización/deserialización eficiente en tu lenguaje principal. Entender parsers JSON de streaming para grandes volúmenes de datos es valioso para ingeniería de datos.' },
      { question: '¿Cómo se compara JSON con Protocol Buffers o MessagePack?', answer: 'JSON es legible por humanos y universalmente soportado pero más grande y más lento de parsear. Protocol Buffers (protobuf) y MessagePack son formatos binarios que ofrecen payloads más pequeños y procesamiento más rápido. Usa JSON para APIs públicas y depuración, formatos binarios para comunicación interna de servicios de alto throughput.' }
    ]
  },
  'yaml': {
    slug: 'yaml',
    title: 'YAML',
    description: 'YAML (YAML Ain\'t Markup Language) es un formato de serialización de datos legible por humanos ampliamente usado para archivos de configuración. YAML 1.2 se alinea con JSON como superconjunto, lo que significa que cualquier JSON válido es YAML válido. Su estructura basada en indentación lo hace más legible que JSON para configuraciones complejas, soportando comentarios, cadenas multilínea, anclas, alias y tipos personalizados.\n\nYAML es el lenguaje de configuración para herramientas DevOps modernas: manifiestos Kubernetes, archivos Docker Compose, flujos de trabajo GitHub Actions, pipelines GitLab CI/CD, playbooks Ansible, charts Helm, Terraform (alternativa HCL) y templates CloudFormation. Los archivos de configuración de aplicaciones (application.yml de Spring Boot, configuraciones de Django) y especificaciones OpenAPI/Swagger también usan YAML.\n\nLa competencia en YAML es esencial para gestión de infraestructura nativa en la nube. Entender las particularidades de YAML, incluyendo problemas de conversión de tipos implícita (problema de Noruega: NO siendo interpretado como false), manejo adecuado de cadenas multilínea y patrones de reutilización con anclas/alias, es importante para automatización de infraestructura confiable.',
    whyImportant: 'La competencia en YAML es esperada en prácticamente todos los roles de DevOps, ingeniería en la nube y Kubernetes. Es un requisito base más que un diferenciador, pero las habilidades YAML avanzadas (templates Helm, manifiestos Kubernetes complejos) son valoradas.\n\nIncluir YAML en tu currículum dentro de contextos DevOps y nube confirma habilidades de automatización de infraestructura. Aunque YAML en sí es simple, la complejidad de las herramientas que configura (Kubernetes, CI/CD) hace que la experiencia YAML sea prácticamente importante.',
    keywords: ['habilidades yaml currículum', 'currículum configuración yaml', 'currículum yaml devops', 'currículum yaml kubernetes'],
    searchIntents: ['cómo incluir yaml en currículum', 'habilidades yaml para devops', 'consejos currículum yaml'],
    relatedSkills: ['Kubernetes', 'Docker Compose', 'GitHub Actions', 'Ansible', 'Helm', 'CI/CD', 'CloudFormation', 'OpenAPI', 'JSON', 'Gestión de Configuración'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-infraestructura', 'ingeniero-de-plataforma', 'ingeniero-de-software'],
    atsKeywords: ['YAML', 'Kubernetes', 'Docker Compose', 'CI/CD', 'Ansible', 'Helm', 'gestión de configuración', 'GitHub Actions', 'CloudFormation', 'infraestructura como código', 'OpenAPI', 'pipeline'],
    resumeTips: [
      'Incluye YAML dentro de contextos de Kubernetes y pipelines CI/CD.',
      'Destaca herramientas específicas que configuras con YAML.',
      'Menciona desarrollo de charts Helm para Kubernetes.',
      'Referencia autoría de especificaciones OpenAPI/Swagger.',
      'Combina YAML con prácticas de infraestructura como código y GitOps.'
    ],
    exampleBullets: [
      'Autoricé manifiestos YAML de Kubernetes y charts Helm para 60 microservicios en 3 clústeres, implementando flujos de trabajo GitOps que redujeron errores de despliegue en un 90%.',
      'Desarrollé pipelines CI/CD con GitHub Actions en YAML para 30 repositorios, logrando tiempos de build promedio de 3 minutos y despliegue automatizado a staging y producción.',
      'Creé playbooks Ansible en YAML automatizando configuración de servidores para 400 nodos, asegurando 99.9% de consistencia de configuración y reduciendo tiempo de aprovisionamiento de 4 horas a 15 minutos.',
      'Diseñé especificaciones OpenAPI 3.0 en YAML para una API REST, habilitando SDKs de cliente auto-generados en 5 lenguajes y reduciendo el esfuerzo de mantenimiento de documentación API en un 70%.'
    ],
    faqs: [
      { question: '¿Debería listar YAML como habilidad técnica?', answer: 'Lístalo dentro del contexto de herramientas (ej., "Kubernetes, Helm, YAML") en lugar de independiente. Para roles DevOps y nube, la competencia en YAML es esperada. El conocimiento avanzado de YAML (anclas, alias, templating) vale la pena destacarlo para gestión de infraestructura compleja.' },
      { question: '¿Cuáles son las trampas comunes de YAML que debería conocer?', answer: 'Sensibilidad a la indentación, conversión de tipos implícita (YES/NO como booleanos, 0777 como octal), y el problema de Noruega son trampas comunes. Entender YAML multi-documento, entrecomillado adecuado de cadenas y evitar problemas de seguridad con deserialización YAML son importantes para uso en producción.' },
      { question: '¿YAML es mejor que JSON para configuración?', answer: 'YAML es más legible para configuraciones complejas debido a comentarios, cadenas multilínea y estructura basada en indentación. JSON es más seguro (sin problemas de conversión de tipos implícita) y tiene parsing más simple. La mayoría de las herramientas soportan ambos; usa YAML para archivos editados por humanos y JSON para configuraciones generadas por máquinas.' }
    ]
  },
  'markdown': {
    slug: 'markdown',
    title: 'Markdown',
    description: 'Markdown es un lenguaje de marcado ligero creado por John Gruber en 2004 para escribir texto formateado usando sintaxis de texto plano. CommonMark proporciona una especificación estandarizada, mientras que GitHub Flavored Markdown (GFM) agrega tablas, listas de tareas y resaltado de sintaxis. Markdown es el formato universal para documentación de desarrolladores, archivos README, wikis y escritura técnica.\n\nMarkdown se usa a lo largo de todo el ciclo de vida del desarrollo de software: archivos README.md, documentación de GitHub/GitLab, notebooks Jupyter, generadores de sitios estáticos (Jekyll, Hugo, Gatsby, Docusaurus), bases de conocimiento (Notion, Obsidian, Confluence) y plataformas de blogging técnico (Dev.to, Hashnode). MDX extiende Markdown con componentes JSX para documentación interactiva. Pandoc permite conversión entre Markdown y docenas de otros formatos.\n\nAunque técnicamente simple, el uso efectivo de Markdown incluye jerarquía adecuada de encabezados para accesibilidad y SEO, formateo de bloques de código con etiquetas de lenguaje, diseño de tablas, incrustación de diagramas (Mermaid) y estructuración de documentación técnica compleja para descubrimiento.',
    whyImportant: 'La competencia en Markdown es esperada de todos los desarrolladores y escritores técnicos. Aunque típicamente no es un requisito principal de trabajo, la capacidad de escribir documentación técnica clara en Markdown es valorada en toda organización de ingeniería.\n\nListar Markdown es más relevante para roles de escritor técnico, developer advocate e ingeniero de documentación. Para posiciones de ingeniería de software, la competencia en Markdown se demuestra a través de tu portafolio, archivos README y documentación de código en lugar de listarse como habilidad independiente.',
    keywords: ['habilidades markdown currículum', 'currículum documentación markdown', 'escritura técnica markdown', 'currículum desarrollador markdown'],
    searchIntents: ['debería listar markdown en currículum', 'habilidades markdown para escritura técnica', 'habilidades documentación markdown'],
    relatedSkills: ['Escritura Técnica', 'GitHub', 'Documentación', 'MDX', 'Generadores de Sitios Estáticos', 'Pandoc', 'CommonMark', 'Diagramas Mermaid', 'Jupyter Notebooks', 'Gestión del Conocimiento'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-frontend', 'desarrollador-web', 'desarrollador-full-stack', 'lider-tecnico', 'desarrollador-de-software'],
    atsKeywords: ['Markdown', 'documentación', 'escritura técnica', 'README', 'GitHub', 'MDX', 'CommonMark', 'generador de sitios estáticos', 'base de conocimiento', 'documentación de desarrolladores', 'Docusaurus', 'wiki'],
    resumeTips: [
      'Incluye Markdown dentro de contextos de escritura técnica y documentación.',
      'Destaca arquitectura de sistemas de documentación usando Markdown.',
      'Menciona generadores de sitios estáticos (Docusaurus, Hugo) para sitios de documentación.',
      'Referencia MDX para experiencia en documentación interactiva.',
      'Muestra Markdown como parte de prácticas más amplias de documentación de desarrolladores.'
    ],
    exampleBullets: [
      'Construí un sitio de documentación Docusaurus con más de 500 páginas Markdown sirviendo 200,000 visitas mensuales, reduciendo tickets de soporte a desarrolladores en un 45%.',
      'Establecí estándares de documentación Markdown adoptados por 20 equipos de ingeniería, mejorando la precisión de búsqueda en la base de conocimiento en un 60% y la velocidad de incorporación en un 30%.',
      'Creé documentación de API interactiva basada en MDX con ejemplos de código en vivo, aumentando la adopción de APIs internas por desarrolladores en un 40%.',
      'Automaticé la generación de documentación Markdown a partir de comentarios de código usando TypeDoc, manteniendo 100% de cobertura de documentación API a través de 150,000 líneas de código.'
    ],
    faqs: [
      { question: '¿Debería listar Markdown como habilidad en mi currículum?', answer: 'Para roles generales de ingeniería de software, Markdown se asume y no necesita listado separado. Para roles de escritor técnico, developer advocate o ingeniero de documentación, inclúyelo junto con herramientas relacionadas (Docusaurus, Hugo, MDX). Tus archivos README y documentación demuestran esta habilidad implícitamente.' },
      { question: '¿Qué variante de Markdown debería conocer?', answer: 'CommonMark para la especificación estándar y GitHub Flavored Markdown (GFM) para la extensión más ampliamente utilizada. Si trabajas con documentación basada en React, aprende MDX. Las diferencias entre variantes son menores: tablas, listas de tareas y soporte de notas al pie son las principales distinciones.' },
      { question: '¿Cómo se compara Markdown con reStructuredText o AsciiDoc?', answer: 'Markdown es más simple y más ampliamente soportado pero menos rico en características. AsciiDoc maneja documentación técnica compleja (libros, manuales) mejor. reStructuredText es el estándar del ecosistema Python (Sphinx). Usa Markdown para la mayoría de la documentación, AsciiDoc para necesidades de publicación complejas.' }
    ]
  },
  'latex': {
    slug: 'latex',
    title: 'LaTeX',
    description: 'LaTeX es un sistema de composición tipográfica ampliamente usado para producir documentos científicos y matemáticos, artículos académicos, tesis y publicaciones técnicas. Construido sobre el motor de composición tipográfica TeX de Donald Knuth, LaTeX proporciona formateo de documentos de alta calidad con potente notación matemática, gestión de bibliografías y referencias cruzadas. Las distribuciones LaTeX incluyen TeX Live, MiKTeX y Overleaf (editor en la nube).\n\nLaTeX sobresale en composición tipográfica matemática, produciendo ecuaciones y fórmulas de calidad de publicación que ningún procesador de texto puede igualar. El ecosistema incluye BibTeX/BibLaTeX para gestión de bibliografías, TikZ/PGFPlots para diagramas y gráficos, beamer para presentaciones y miles de paquetes en CTAN. LaTeX es el estándar para publicación académica en matemáticas, física, ciencias de la computación e ingeniería.\n\nMás allá de la academia, LaTeX se usa para crear CVs/currículums profesionales, documentación técnica y reportes tipográficamente precisos. Empresas como Jane Street y firmas de finanzas cuantitativas usan LaTeX para documentación matemática. La naturaleza reproducible y controlable por versiones de los archivos fuente LaTeX lo hace ideal para escritura técnica colaborativa.',
    whyImportant: 'La competencia en LaTeX es valorada en roles académicos, de investigación y finanzas cuantitativas. Los profesionales con habilidades LaTeX en estos dominios ganan $100,000-$160,000 dependiendo del rol principal.\n\nIncluir LaTeX en tu currículum es particularmente valioso para posiciones de investigación, roles académicos y finanzas cuantitativas. Señala alfabetización matemática y precisión en documentación. Para formateo de currículum, un currículum bien compuesto en LaTeX demuestra la habilidad en sí.',
    keywords: ['habilidades latex currículum', 'currículum composición tipográfica latex', 'currículum programación latex', 'currículum latex académico'],
    searchIntents: ['cómo incluir latex en currículum', 'habilidades latex para trabajos académicos', 'consejos currículum latex'],
    relatedSkills: ['Composición Tipográfica Matemática', 'BibTeX', 'TikZ', 'Overleaf', 'Escritura Académica', 'Documentación Técnica', 'Beamer', 'PGFPlots', 'Publicación Científica', 'Pandoc'],
    professionSlugs: ['cientifico-de-datos', 'ingeniero-de-machine-learning', 'ingeniero-de-software', 'analista-de-datos', 'ingeniero-de-ia', 'ingeniero-principal'],
    atsKeywords: ['LaTeX', 'TeX', 'composición tipográfica', 'notación matemática', 'publicación académica', 'BibTeX', 'TikZ', 'Overleaf', 'escritura científica', 'documentación', 'Beamer', 'escritura técnica'],
    resumeTips: [
      'Menciona LaTeX para posiciones orientadas a la academia o investigación.',
      'Destaca preparación de documentos matemáticos y experiencia en publicación.',
      'Referencia escritura colaborativa usando Overleaf.',
      'Incluye TikZ/PGFPlots para creación de diagramas técnicos.',
      'Muestra LaTeX como parte de habilidades más amplias de comunicación científica.'
    ],
    exampleBullets: [
      'Autoricé 15 publicaciones revisadas por pares en LaTeX, con más de 500 citaciones, estableciendo plantillas de documentación adoptadas por un grupo de investigación de 30 personas.',
      'Creé un pipeline automatizado de generación de reportes LaTeX produciendo 200 reportes técnicos mensuales, reduciendo el tiempo de formateo manual en un 90% y asegurando branding consistente.',
      'Desarrollé una biblioteca de diagramas LaTeX/TikZ para visualización de algoritmos usada por 50 estudiantes de posgrado, estandarizando la calidad de figuras de tesis en todo el departamento.',
      'Construí un sistema de integración continua para un manual técnico LaTeX de 400 páginas, habilitando autoría colaborativa por 12 ingenieros con generación automatizada de PDF y control de versiones.'
    ],
    faqs: [
      { question: '¿LaTeX es relevante para roles no académicos?', answer: 'LaTeX es valioso para finanzas cuantitativas, escritura técnica y cualquier rol que produzca documentación matemática. Un currículum formateado en LaTeX también puede señalar atención al detalle y sofisticación técnica. Sin embargo, para la mayoría de los roles de la industria, Markdown y herramientas de documentación modernas son más relevantes.' },
      { question: '¿Debería hacer mi currículum en LaTeX?', answer: 'Un currículum LaTeX bien elaborado demuestra habilidad de composición tipográfica y produce resultados visualmente superiores. Es particularmente impresionante para roles académicos, de investigación y cuantitativos. Para roles de la industria, el contenido importa más que la herramienta de formateo; usa LaTeX si lo conoces, pero un diseño limpio en cualquier herramienta funciona.' },
      { question: '¿Cómo aprendo LaTeX eficientemente?', answer: 'Comienza con Overleaf (editor en línea gratuito) y sus plantillas y tutoriales. Aprende los básicos: estructura del documento, modo matemático, figuras, tablas y bibliografías. Agrega gradualmente paquetes según sea necesario. Para la mayoría de los usuarios, 20 horas de práctica son suficientes para uso productivo de LaTeX.' }
    ]
  },
  'solidity': {
    slug: 'solidity',
    title: 'Solidity',
    description: 'Solidity es un lenguaje de programación orientado a objetos diseñado para escribir contratos inteligentes en la Máquina Virtual de Ethereum (EVM). Creado por Gavin Wood en 2014, Solidity es el lenguaje dominante para desarrollo blockchain. Solidity 0.8.x introdujo verificaciones de desbordamiento integradas, errores personalizados y tipos de valor definidos por el usuario. La sintaxis del lenguaje está influenciada por JavaScript, C++ y Python.\n\nEl ecosistema Solidity incluye frameworks de desarrollo como Hardhat y Foundry para pruebas y despliegue, OpenZeppelin para bibliotecas de contratos inteligentes auditadas, Ethers.js y web3.js para interacción frontend, y herramientas como Slither y Mythril para análisis de seguridad. Los contratos inteligentes Solidity impulsan protocolos DeFi (Uniswap, Aave, Compound), marketplaces NFT (OpenSea), DAOs y estándares de tokens (ERC-20, ERC-721, ERC-1155).\n\nEl desarrollo en Solidity requiere consideraciones únicas: optimización de gas, protección contra reentrancia, patrones de control de acceso, proxies de contratos actualizables y verificación formal. La naturaleza inmutable de los contratos desplegados significa que la seguridad es primordial; contratos explotados han resultado en miles de millones de dólares en pérdidas.',
    whyImportant: 'Los desarrolladores Solidity están altamente compensados debido a la naturaleza especializada y las altas apuestas del desarrollo blockchain. Los desarrolladores Solidity ganan $130,000-$200,000, con auditores senior de contratos inteligentes ganando $300,000+.\n\nIncluir Solidity en tu currículum te posiciona para el lucrativo mercado laboral blockchain y Web3. La experiencia en Solidity combinada con experiencia en auditoría de seguridad es una de las especializaciones mejor pagadas en desarrollo de software.',
    keywords: ['currículum desarrollador solidity', 'habilidades programación solidity', 'currículum desarrollador contratos inteligentes', 'currículum desarrollador blockchain'],
    searchIntents: ['cómo incluir solidity en currículum', 'oportunidades carrera desarrollador solidity', 'currículum solidity contratos inteligentes'],
    relatedSkills: ['Ethereum', 'Contratos Inteligentes', 'Hardhat', 'Foundry', 'OpenZeppelin', 'DeFi', 'ERC-20', 'Web3.js', 'Ethers.js', 'Auditoría de Seguridad'],
    professionSlugs: ['desarrollador-de-blockchain', 'ingeniero-de-software', 'desarrollador-backend', 'ingeniero-de-seguridad', 'desarrollador-full-stack', 'ingeniero-de-ciberseguridad'],
    atsKeywords: ['Solidity', 'Ethereum', 'contratos inteligentes', 'EVM', 'DeFi', 'Hardhat', 'Foundry', 'OpenZeppelin', 'ERC-20', 'ERC-721', 'Web3', 'blockchain'],
    resumeTips: [
      'Destaca conocimiento de seguridad de contratos inteligentes y experiencia en auditorías.',
      'Incluye técnicas y resultados de optimización de gas.',
      'Menciona protocolos o estándares específicos implementados (ERC-20, ERC-721).',
      'Referencia herramientas de pruebas (Hardhat, Foundry) y métricas de cobertura.',
      'Incluye valor total bloqueado (TVL) o volumen de transacciones para contratos desplegados.'
    ],
    exampleBullets: [
      'Desarrollé contratos inteligentes Solidity para un protocolo de préstamos DeFi gestionando $150M en valor total bloqueado (TVL) con cero incidentes de seguridad durante 2 años.',
      'Optimicé el consumo de gas de un contrato de minteo NFT ERC-721 en un 45%, ahorrando a los usuarios un estimado de $2.8M en tarifas de transacción a través de 500,000 minteos.',
      'Realicé auditorías de seguridad de 25 contratos inteligentes Solidity, identificando 12 vulnerabilidades críticas incluyendo reentrancia y desbordamiento de enteros antes del despliegue.',
      'Construí un sistema de contratos inteligentes actualizables usando el patrón proxy UUPS, habilitando iteración de funcionalidades mientras mantenía $80M en activos bloqueados a través de 15 actualizaciones de contratos.'
    ],
    faqs: [
      { question: '¿El desarrollo en Solidity sigue siendo una carrera viable?', answer: 'Sí. A pesar de las fluctuaciones del mercado cripto, los desarrolladores Solidity siguen en alta demanda. La adopción empresarial de blockchain continúa creciendo, y los protocolos DeFi necesitan mantenimiento continuo y nuevas funcionalidades. El pool de talento es pequeño relativo a la demanda, manteniendo los salarios altos.' },
      { question: '¿Cómo hago la transición a Solidity desde desarrollo tradicional?', answer: 'Comienza con conocimiento de JavaScript/TypeScript (la sintaxis de Solidity es familiar). Aprende los fundamentos de Ethereum, luego construye contratos simples usando Hardhat o Foundry. Estudia los contratos de OpenZeppelin para mejores prácticas. El pensamiento enfocado en seguridad es el cambio de mentalidad más importante desde el desarrollo tradicional.' },
      { question: '¿Qué hace destacar a un desarrollador Solidity?', answer: 'La experiencia en seguridad es el principal diferenciador. Entender vectores de ataque comunes (reentrancia, flash loans, manipulación de oráculos), optimización de gas, verificación formal y metodología de auditoría de contratos inteligentes separa a los desarrolladores Solidity senior de los principiantes.' }
    ]
  },
  'vhdl': {
    slug: 'vhdl',
    title: 'VHDL',
    description: 'VHDL (VHSIC Hardware Description Language) es un lenguaje de descripción de hardware usado para describir el comportamiento y estructura de circuitos y sistemas digitales. Estandarizado como IEEE 1076, VHDL es uno de los dos lenguajes principales (junto con Verilog) para programación de FPGA y diseño ASIC. VHDL-2019 introdujo interfaces, paquetes genéricos y características mejoradas de verificación.\n\nVHDL se usa para diseñar circuitos de lógica digital, firmware de FPGA, ASICs y componentes de sistema en chip (SoC). El ecosistema VHDL incluye herramientas de simulación (ModelSim, GHDL), herramientas de síntesis (Xilinx Vivado, Intel Quartus) y frameworks de verificación (UVVM, OSVVM, cocotb). VHDL sobresale en la descripción de máquinas de estado complejas, unidades aritméticas, interfaces de comunicación y hardware de procesamiento de señales.\n\nVHDL es predominante en industrias europeas aeroespacial, defensa y telecomunicaciones, mientras que Verilog es más común en empresas de semiconductores comerciales de EE.UU. Ambos lenguajes son esenciales para diseño digital moderno, y muchos ingenieros son competentes en ambos. El tipado fuerte y naturaleza explícita de VHDL lo hacen preferido para aplicaciones de seguridad crítica en sistemas aeroespaciales y militares.',
    whyImportant: 'Los ingenieros VHDL tienen demanda en industrias de defensa, aeroespacial, telecomunicaciones y semiconductores. Los ingenieros VHDL/FPGA ganan $115,000-$155,000, con roles de defensa y semiconductores pagando $170,000+.\n\nIncluir VHDL en tu currículum apunta a roles especializados de ingeniería de hardware. Es esencial para posiciones de desarrollo FPGA y señala experiencia en diseño digital, análisis de temporización y verificación de hardware, habilidades que obtienen compensación premium en un mercado escaso de talento.',
    keywords: ['habilidades vhdl currículum', 'currículum ingeniero vhdl', 'currículum fpga vhdl', 'currículum programador vhdl'],
    searchIntents: ['cómo incluir vhdl en currículum', 'requisitos trabajo ingeniero vhdl', 'oportunidades carrera vhdl fpga'],
    relatedSkills: ['FPGA', 'Verilog', 'Diseño Digital', 'Xilinx Vivado', 'Intel Quartus', 'Análisis de Temporización', 'Simulación', 'Síntesis', 'Procesamiento de Señales', 'Diseño ASIC'],
    professionSlugs: ['ingeniero-de-fpga', 'ingeniero-embebido', 'desarrollador-embebido', 'ingeniero-de-robotica', 'ingeniero-de-control', 'ingeniero-de-software'],
    atsKeywords: ['VHDL', 'FPGA', 'Xilinx', 'Intel', 'Altera', 'Vivado', 'Quartus', 'diseño digital', 'RTL', 'síntesis', 'simulación', 'análisis de temporización'],
    resumeTips: [
      'Especifica familias de FPGA y herramientas utilizadas (Xilinx Vivado, Intel Quartus).',
      'Destaca logros de cierre de temporización y utilización de recursos.',
      'Menciona metodología de verificación (testbenches, UVVM, cocotb).',
      'Incluye aplicaciones específicas (DSP, comunicaciones, sistemas de control).',
      'Referencia velocidades de reloj y métricas de rendimiento logradas.'
    ],
    exampleBullets: [
      'Diseñé un pipeline de procesamiento de señales de radar basado en VHDL en un FPGA Xilinx Ultrascale+, logrando procesamiento en tiempo real de señales de 2 GHz de ancho de banda con latencia menor a 10 microsegundos.',
      'Desarrollé firmware VHDL para un switch Ethernet de 100 Gbps en FPGA, cumpliendo cierre de temporización a 400 MHz y logrando 99.999% de confiabilidad en entrega de paquetes.',
      'Creé un sistema de control de motores VHDL desplegado en 5,000 robots industriales, logrando precisión de posición dentro de 0.01mm y reduciendo latencia de control en un 60% vs. soluciones basadas en software.',
      'Implementé testbenches VHDL con UVVM logrando 98% de cobertura funcional, detectando 15 errores de diseño antes del tape-out de silicio y ahorrando un estimado de $500,000 en costos de re-spin.'
    ],
    faqs: [
      { question: '¿Debería aprender VHDL o Verilog?', answer: 'Ambos son valiosos. VHDL es predominante en defensa/aeroespacial europea y aplicaciones de seguridad crítica. Verilog/SystemVerilog domina en empresas de semiconductores comerciales de EE.UU. Aprende ambos para máxima versatilidad, pero comienza con el que se use en tu industria y región objetivo.' },
      { question: '¿VHDL es relevante con herramientas de síntesis de alto nivel (HLS) emergiendo?', answer: 'Sí. Las herramientas HLS complementan VHDL pero no lo reemplazan para diseños complejos y optimizados. Entender VHDL es esencial para verificar la salida de HLS, optimizar rutas críticas de temporización y diseñar componentes donde HLS genera resultados subóptimos. Las habilidades VHDL siguen siendo esenciales para ingenieros FPGA.' },
      { question: '¿Cómo demuestro habilidades VHDL sin experiencia en la industria?', answer: 'Construye proyectos FPGA con placas de desarrollo (Xilinx Artix-7, Intel Cyclone). Implementa protocolos de comunicación (UART, SPI, I2C), algoritmos DSP o procesadores simples. Documenta utilización de recursos, velocidades de reloj y resultados de temporización. Repositorios en GitHub con testbenches demuestran disciplina de ingeniería.' }
    ]
  },
  'verilog': {
    slug: 'verilog',
    title: 'Verilog',
    description: 'Verilog es un lenguaje de descripción de hardware (HDL) usado para diseñar y verificar circuitos digitales. Originalmente desarrollado por Gateway Design Automation en 1984, Verilog está estandarizado como IEEE 1364. SystemVerilog (IEEE 1800-2017) extiende Verilog con programación orientada a objetos, verificación con restricciones aleatorias, aserciones y capacidades de verificación dirigida por cobertura.\n\nVerilog y SystemVerilog son los HDLs dominantes en la industria de semiconductores de EE.UU. para diseño ASIC y FPGA. La cadena de herramientas incluye simulación (VCS, Questa, Xcelium), síntesis (Synopsys Design Compiler, Cadence Genus) y verificación (metodología UVM, verificación formal). Verilog describe todo desde lógica combinacional simple hasta SoCs complejos de múltiples millones de compuertas.\n\nEmpresas de semiconductores importantes incluyendo Intel, AMD, NVIDIA, Qualcomm, Apple y clientes de diseño TSMC usan Verilog/SystemVerilog para diseño de chips. El lenguaje describe tanto hardware sintetizable (RTL) como entornos de verificación no sintetizables, haciéndolo el lenguaje completo para el flujo de trabajo de diseño digital.',
    whyImportant: 'Los ingenieros Verilog/SystemVerilog están entre los especialistas de hardware mejor pagados, ganando $125,000-$175,000 en EE.UU., con diseñadores senior de ASIC en empresas top de semiconductores ganando $200,000+.\n\nIncluir Verilog en tu currículum es esencial para roles de diseño de semiconductores, FPGA y ASIC. Las habilidades de verificación SystemVerilog son particularmente demandadas debido a la creciente complejidad de los diseños de chips y la necesidad crítica de verificación pre-silicio.',
    keywords: ['currículum desarrollador verilog', 'currículum ingeniero verilog', 'currículum systemverilog', 'currículum fpga verilog'],
    searchIntents: ['cómo incluir verilog en currículum', 'requisitos trabajo ingeniero verilog', 'oportunidades carrera systemverilog'],
    relatedSkills: ['SystemVerilog', 'UVM', 'FPGA', 'Diseño ASIC', 'Diseño Digital', 'Síntesis', 'Análisis de Temporización', 'Verificación Formal', 'VHDL', 'Diseño SoC'],
    professionSlugs: ['ingeniero-de-fpga', 'ingeniero-embebido', 'desarrollador-embebido', 'ingeniero-de-software', 'ingeniero-de-control', 'ingeniero-de-robotica'],
    atsKeywords: ['Verilog', 'SystemVerilog', 'UVM', 'FPGA', 'ASIC', 'RTL', 'síntesis', 'simulación', 'análisis de temporización', 'diseño digital', 'verificación', 'SoC'],
    resumeTips: [
      'Lista tanto Verilog como SystemVerilog si eres competente en ambos.',
      'Especifica experiencia en diseño (RTL) vs. verificación (UVM/SV).',
      'Incluye experiencia con herramientas EDA (Synopsys, Cadence, Mentor).',
      'Destaca conteo de compuertas, frecuencia de reloj y métricas de área.',
      'Referencia experiencia en tape-out para roles ASIC.'
    ],
    exampleBullets: [
      'Diseñé una implementación RTL Verilog de un bloque de procesamiento de modem 5G, logrando 500 MHz de frecuencia de reloj y cumpliendo todos los objetivos de temporización, área y consumo para tape-out.',
      'Desarrollé un entorno de verificación SystemVerilog/UVM para un controlador PCIe Gen5, logrando 99.5% de cobertura funcional e identificando 40 errores críticos antes del tape-out.',
      'Implementé un acelerador de red neuronal basado en Verilog en FPGA Xilinx logrando 10 TOPS (billones de operaciones por segundo), habilitando inferencia de IA en el borde 20x más rápida que CPU.',
      'Creé bloques IP Verilog reutilizables (UART, SPI, I2C, DMA) usados en 8 proyectos SoC, reduciendo el tiempo de integración en un 50% y estandarizando protocolos de interfaz.'
    ],
    faqs: [
      { question: '¿Verilog o SystemVerilog es más importante para trabajos?', answer: 'SystemVerilog es el estándar moderno que engloba Verilog. Aprende SystemVerilog, que incluye todo Verilog más características de verificación (UVM, aserciones, cobertura). Las ofertas de trabajo pueden decir "Verilog" pero esperan conocimiento de SystemVerilog para cualquier rol que involucre verificación.' },
      { question: '¿Cómo entro en diseño ASIC/FPGA?', answer: 'Comienza con una placa de desarrollo FPGA, implementa componentes estándar (ALU, FIFO, UART) y aprende restricciones de síntesis y análisis de temporización. Estudia UVM para roles de verificación. Una maestría en Ingeniería Eléctrica o Ingeniería de Computadoras es típica para roles ASIC, aunque las posiciones FPGA pueden aceptar portafolios sólidos.' },
      { question: '¿Cuál es la diferencia entre roles de diseño RTL y verificación?', answer: 'Los diseñadores RTL escriben Verilog sintetizable describiendo el hardware real. Los ingenieros de verificación escriben testbenches SystemVerilog/UVM para probar que el diseño funciona correctamente. Ambos están bien compensados, con verificación a veces pagando ligeramente más debido a su importancia crítica y la escasez de ingenieros de verificación calificados.' }
    ]
  },
  'sas': {
    slug: 'sas',
    title: 'SAS',
    description: 'SAS (Statistical Analysis System) es una suite de software integrada para analítica avanzada, inteligencia de negocios, gestión de datos y analítica predictiva. Desarrollado por SAS Institute desde la década de 1970, SAS sigue siendo la plataforma de analítica dominante en industrias farmacéutica, de salud, banca y seguros. SAS Viya es la plataforma moderna nativa en la nube que proporciona capacidades SAS con integración de Python, R y API REST.\n\nEl lenguaje SAS incluye programación de data step para manipulación de datos, PROC SQL para consultas de base de datos y cientos de procedimientos estadísticos (PROC LOGISTIC, PROC MIXED, PROC PHREG) para regresión, análisis de supervivencia, series temporales y modelos mixtos. Los SAS Macros permiten reutilización de código y automatización. SAS Enterprise Guide proporciona una interfaz visual, mientras que SAS Studio ofrece un entorno de desarrollo basado en web.\n\nSAS está particularmente arraigado en industrias reguladas donde sus características de validación, rastro de auditoría y reproducibilidad son requeridas por organismos regulatorios (FDA, EMA). El análisis de ensayos clínicos, farmacovigilancia, modelado de riesgo crediticio y análisis actuarial son dominios centrales de SAS donde los procedimientos validados de la plataforma y el soporte empresarial justifican sus costos de licenciamiento.',
    whyImportant: 'Los programadores SAS tienen demanda estable en farmacéuticas, salud, banca y seguros. Los desarrolladores SAS ganan $90,000-$130,000, con programadores SAS senior en ensayos clínicos ganando $140,000+.\n\nIncluir SAS en tu currículum es esencial para roles en farmacéuticas, investigación clínica y modelado de riesgo financiero. La competencia en SAS señala conciencia de cumplimiento regulatorio y capacidad profunda de análisis estadístico. En industrias donde SAS es estándar, herramientas alternativas como R o Python pueden no ser aceptadas para análisis oficiales.',
    keywords: ['currículum programador sas', 'habilidades sas currículum', 'currículum programación sas', 'currículum desarrollador sas'],
    searchIntents: ['cómo incluir sas en currículum', 'oportunidades carrera programador sas', 'habilidades sas para trabajos farmacéuticos'],
    relatedSkills: ['Análisis Estadístico', 'Ensayos Clínicos', 'SAS Macros', 'PROC SQL', 'Data Step', 'SAS Viya', 'CDISC', 'R', 'Base SAS', 'SAS Enterprise Guide'],
    professionSlugs: ['analista-de-datos', 'cientifico-de-datos', 'desarrollador-de-bi', 'ingeniero-de-software', 'ingeniero-de-datos', 'consultor-de-ti'],
    atsKeywords: ['SAS', 'programación SAS', 'Base SAS', 'SAS Macros', 'PROC SQL', 'ensayos clínicos', 'CDISC', 'análisis estadístico', 'SAS Viya', 'data step', 'SDTM', 'ADaM'],
    resumeTips: [
      'Especifica Base SAS, SAS/STAT, SAS/GRAPH o SAS Viya según corresponda.',
      'Destaca experiencia CDISC (SDTM, ADaM) para roles farmacéuticos.',
      'Incluye experiencia en envíos regulatorios (FDA, EMA).',
      'Menciona programación SAS Macro para automatización de código.',
      'Referencia procedimientos estadísticos específicos y tipos de análisis.'
    ],
    exampleBullets: [
      'Desarrollé programas SAS para análisis de ensayos clínicos Fase III de 15,000 pacientes, produciendo conjuntos de datos SDTM/ADaM compatibles con CDISC y tablas estadísticas listas para envío a la FDA.',
      'Construí bibliotecas de SAS Macros automatizando más de 200 reportes recurrentes, reduciendo el esfuerzo de reportes mensuales de 2 semanas a 2 días para un equipo de 10 programadores estadísticos.',
      'Creé modelos de riesgo crediticio en SAS procesando 50 millones de registros de clientes, logrando un estadístico KS de 0.42 y ahorrando $12M anuales en pérdidas por incumplimiento reducidas.',
      'Migré programas SAS legacy a SAS Viya, habilitando procesamiento paralelo en la nube que redujo el tiempo de entrenamiento de modelos de 8 horas a 25 minutos.'
    ],
    faqs: [
      { question: '¿SAS está siendo reemplazado por Python y R?', answer: 'En la academia y empresas tecnológicas, en gran medida sí. En industrias reguladas (farmacéutica, banca, seguros), SAS sigue siendo dominante debido a procedimientos validados, rastros de auditoría y aceptación regulatoria. Los envíos a la FDA aceptan cada vez más R, pero SAS sigue siendo el estándar. Tener habilidades tanto en SAS como en código abierto maximiza tus oportunidades.' },
      { question: '¿Debería aprender SAS como nuevo analista de datos?', answer: 'Si apuntas a industrias farmacéutica, de salud o seguros, SAS es esencial. Para empresas tecnológicas y startups, Python y R son más relevantes. El perfil de mayor valor combina SAS con Python/R, permitiéndote trabajar en entornos regulados mientras aprovechas herramientas modernas.' },
      { question: '¿Qué certificaciones SAS son más valiosas?', answer: 'SAS Certified Specialist: Base Programming es la credencial de nivel inicial. SAS Certified Professional: Advanced Programming agrega valor para programadores experimentados. SAS Certified Clinical Trials Programmer es premium para roles farmacéuticos. Las certificaciones demuestran competencia validada a los empleadores.' }
    ]
  },
  'abap': {
    slug: 'abap',
    title: 'ABAP',
    description: 'ABAP (Advanced Business Application Programming) es el lenguaje de programación propietario de SAP para desarrollar aplicaciones en la plataforma SAP. ABAP ha evolucionado significativamente con SAP S/4HANA, introduciendo ABAP for Cloud (Steampunk) con un modelo de programación moderno y restringido. ABAP 7.58 y el modelo de desarrollo ABAP Cloud enfatizan la programación RESTful ABAP (RAP), Core Data Services (CDS) y desarrollo de servicios OData.\n\nABAP se usa para personalizar y extender sistemas SAP ERP, desarrollar aplicaciones Fiori/UI5, construir interfaces, crear reportes e implementar lógica de negocio a través de módulos SAP (FI, CO, MM, SD, PP, HR). El stack moderno ABAP incluye vistas CDS para modelado de datos, BOPF para objetos de negocio, RAP para servicios RESTful y SAP BTP (Business Technology Platform) para extensiones en la nube. Los reportes ALV, BAPIs, IDocs y user exits siguen siendo importantes para personalización SAP clásica.\n\nSAP ejecuta los procesos de negocio del 92% de las empresas Forbes Global 2000. Los desarrolladores ABAP mantienen y extienden estos sistemas de misión crítica, manejando todo desde posteos financieros hasta gestión de cadena de suministro en las empresas más grandes del mundo.',
    whyImportant: 'Los desarrolladores ABAP tienen demanda consistente debido al dominio de SAP en planificación de recursos empresariales. Los desarrolladores ABAP ganan $100,000-$145,000, con desarrolladores y arquitectos SAP senior ganando $170,000+.\n\nIncluir ABAP en tu currículum abre acceso al vasto mercado de consultoría SAP y desarrollo empresarial. La migración en curso de SAP ECC a S/4HANA crea fuerte demanda de desarrolladores ABAP que entienden tanto el modelo de programación ABAP clásico como el moderno.',
    keywords: ['currículum desarrollador abap', 'habilidades programación abap', 'currículum sap abap', 'palabras clave abap currículum'],
    searchIntents: ['cómo incluir abap en currículum', 'oportunidades carrera desarrollador abap', 'consejos currículum sap abap'],
    relatedSkills: ['SAP S/4HANA', 'Vistas CDS', 'RAP', 'SAP Fiori', 'SAPUI5', 'OData', 'SAP BTP', 'IDocs', 'BAPIs', 'Reportes ALV'],
    professionSlugs: ['desarrollador-de-erp', 'ingeniero-de-software', 'desarrollador-de-software', 'arquitecto-empresarial', 'consultor-de-ti', 'arquitecto-de-soluciones'],
    atsKeywords: ['ABAP', 'SAP', 'S/4HANA', 'CDS', 'RAP', 'Fiori', 'SAPUI5', 'OData', 'BAPIs', 'IDocs', 'ALV', 'SAP BTP'],
    resumeTips: [
      'Especifica módulos SAP y versiones para los que has desarrollado.',
      'Destaca experiencia en migración y modernización S/4HANA.',
      'Menciona características modernas de ABAP (CDS, RAP, ABAP Cloud).',
      'Incluye desarrollo frontend Fiori/SAPUI5 junto con ABAP.',
      'Referencia procesos de negocio SAP específicos automatizados o mejorados.'
    ],
    exampleBullets: [
      'Desarrollé mejoras personalizadas ABAP en módulos FI/CO/MM para una implementación SAP S/4HANA en un fabricante de $5B, procesando 10 millones de posteos financieros mensuales.',
      'Construí vistas CDS ABAP y servicios OData para 20 aplicaciones SAP Fiori, modernizando la experiencia de usuario para 5,000 usuarios finales y reduciendo el tiempo de capacitación en un 40%.',
      'Lideré la remediación de código ABAP para una migración SAP ECC a S/4HANA, convirtiendo más de 500 programas personalizados a sintaxis ABAP moderna y reduciendo la deuda técnica en un 50%.',
      'Implementé integración IDocs basada en ABAP procesando 100,000 transacciones EDI diarias con socios externos, logrando 99.97% de precisión en entregas y reduciendo reconciliación manual en un 80%.'
    ],
    faqs: [
      { question: '¿ABAP es una buena opción de carrera en 2025?', answer: 'Sí. La ola de migración a S/4HANA en curso crea fuerte demanda de desarrolladores ABAP. Aunque SAP está fomentando herramientas low-code y extensiones BTP, ABAP sigue siendo esencial para personalizaciones complejas y la enorme base de código existente. Las habilidades ABAP modernas (RAP, CDS) son particularmente valoradas.' },
      { question: '¿Debería aprender ABAP moderno o ABAP clásico?', answer: 'Aprende ambos. ABAP moderno (CDS, RAP, ABAP Cloud) es requerido para S/4HANA y nuevos desarrollos. ABAP clásico (reportes, BAPIs, user exits) es necesario para mantener sistemas existentes. El conocimiento de transición entre ABAP clásico y moderno es el conjunto de habilidades más valioso.' },
      { question: '¿Cómo hago la transición al desarrollo ABAP?', answer: 'SAP Learning Hub y openSAP ofrecen cursos gratuitos. Obtén experiencia práctica con SAP BTP Trial o SAP CAL (Cloud Appliance Library). La certificación SAP (C_ABAPD_2309) valida tus habilidades. Considera unirte a una firma de consultoría SAP que proporcione capacitación para nuevos desarrolladores ABAP.' }
    ]
  },
};
