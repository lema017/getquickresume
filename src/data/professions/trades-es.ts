import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  'automotive-technician': {
    slug: 'tecnico-automotriz',
    title: 'Técnico Automotriz',
    keywords: ['ejemplo de currículum de técnico automotriz', 'plantilla de currículum de mecánico automotriz', 'currículum de técnico automotriz certificado', 'ejemplo de CV de mecánico de autos'],
    searchIntents: ['ejemplo de currículum de técnico automotriz', 'cómo escribir un currículum de mecánico', 'currículum de técnico certificado ASE'],
    topSkills: ['Diagnóstico y Resolución de Problemas', 'Reparación y Reconstrucción de Motores', 'Sistemas de Frenos', 'Sistemas Eléctricos', 'Certificaciones ASE', 'Escaneo OBD-II', 'Mantenimiento Preventivo', 'Servicio de Transmisión', 'Sistemas Híbridos y Eléctricos', 'Comunicación con el Cliente'],
    atsKeywords: ['reparación automotriz', 'diagnóstico', 'certificado ASE', 'reparación de motores', 'sistemas de frenos', 'sistemas eléctricos', 'OBD-II', 'mantenimiento preventivo', 'transmisión', 'vehículos híbridos', 'alineación', 'suspensión', 'sistemas HVAC', 'mantenimiento de flota'],
    sampleResumeData: buildResumeData({
      firstName: 'Carlos',
      lastName: 'Mendez',
      profession: 'Técnico Automotriz',
      summary: 'Técnico automotriz certificado ASE con más de 6 años de experiencia diagnosticando y reparando vehículos nacionales e importados. Capacidad comprobada para manejar reparaciones complejas de motores, transmisiones y sistemas eléctricos manteniendo una alta satisfacción del cliente.',
      skills: ['Diagnóstico y Resolución de Problemas', 'Reparación de Motores', 'Sistemas de Frenos', 'Sistemas Eléctricos', 'Certificaciones ASE', 'Escaneo OBD-II', 'Mantenimiento Preventivo', 'Servicio de Transmisión', 'Sistemas Híbridos y Eléctricos', 'Comunicación con el Cliente'],
      experience: [
        {
          title: 'Técnico Automotriz Líder',
          company: 'Pep Boys',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Diagnostica y repara un promedio de 12 vehículos por día en sistemas de motor, frenos, eléctricos y HVAC',
            'Mantiene una tasa de reparación exitosa del 97% en el primer intento, reduciendo devoluciones y aumentando la eficiencia del taller en un 15%',
            'Capacita y asesora a 3 técnicos junior en procedimientos avanzados de diagnóstico y operación de herramientas de escaneo',
          ],
        },
        {
          title: 'Técnico Automotriz',
          company: 'Firestone Complete Auto Care',
          startDate: '2018-05',
          endDate: '2021-02',
          achievements: [
            'Realizó servicios de frenos, suspensión y alineación en 8-10 vehículos diarios',
            'Vendió paquetes de mantenimiento preventivo generando $3K adicionales mensuales en ingresos del taller',
            'Obtuvo el estatus de Técnico Maestro ASE al aprobar los 8 exámenes de certificación básica',
          ],
        },
      ],
      education: [
        { institution: 'Universal Technical Institute', degree: 'Diploma', field: 'Tecnología Automotriz', startDate: '2016-09', endDate: '2018-03' },
      ],
      certifications: [
        { name: 'Técnico Maestro ASE', issuer: 'National Institute for Automotive Service Excellence', date: '2021-06' },
        { name: 'Certificación EPA Sección 608', issuer: 'EPA', date: '2019-04' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe incluir un técnico automotriz?', answer: 'Las certificaciones ASE son el estándar de la industria. Enumere cada área en la que está certificado (frenos, eléctrico, reparación de motores, etc.) y destaque el estatus de Técnico Maestro si lo ha alcanzado.' },
      { question: '¿Cómo escribo un currículum de mecánico sin educación formal?', answer: 'Enfóquese en la experiencia práctica, certificaciones y competencias específicas de reparación. Incluya los tipos de vehículos y sistemas en los que ha trabajado y cualquier métrica del taller.' },
      { question: '¿Qué métricas debe incluir un mecánico en su currículum?', answer: 'Mencione vehículos atendidos por día, tasas de reparación exitosa en el primer intento, ingresos generados por ventas adicionales y puntuaciones de satisfacción del cliente.' },
    ],
  },

  'banquet-manager': {
    slug: 'gerente-de-banquetes',
    title: 'Gerente de Banquetes',
    keywords: ['ejemplo de currículum de gerente de banquetes', 'plantilla de currículum de capitán de banquetes', 'CV de gerente de banquetes para eventos', 'currículum de gerente de banquetes de hotel'],
    searchIntents: ['ejemplo de currículum de gerente de banquetes', 'cómo escribir un currículum de gerente de banquetes', 'consejos para currículum de gerente de operaciones de banquetes'],
    topSkills: ['Coordinación de Eventos', 'Operaciones de Banquetes', 'Programación de Personal', 'Control de Costos de A&B', 'Relaciones con Clientes', 'Planificación de Menús', 'Negociación con Proveedores', 'Cumplimiento de Salud y Seguridad', 'Venta de Paquetes', 'Software POS y de Catering'],
    atsKeywords: ['operaciones de banquetes', 'coordinación de eventos', 'alimentos y bebidas', 'programación de personal', 'catering', 'relaciones con clientes', 'planificación de menús', 'control de costos', 'gestión de proveedores', 'salud y seguridad', 'montaje de banquetes', 'hospitalidad hotelera', 'venta adicional'],
    sampleResumeData: buildResumeData({
      firstName: 'Andre',
      lastName: 'Williams',
      profession: 'Gerente de Banquetes',
      summary: 'Gerente de banquetes con experiencia de más de 5 años supervisando eventos a gran escala en hoteles de 4 y 5 estrellas. Experto en liderazgo de equipos, gestión de costos de A&B y entrega de experiencias excepcionales para bodas, eventos corporativos y galas.',
      skills: ['Coordinación de Eventos', 'Operaciones de Banquetes', 'Programación de Personal', 'Control de Costos de A&B', 'Relaciones con Clientes', 'Planificación de Menús', 'Negociación con Proveedores', 'Cumplimiento de Salud y Seguridad', 'Venta Adicional', 'Software POS y de Catering'],
      experience: [
        {
          title: 'Gerente de Banquetes',
          company: 'Marriott International',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Supervisa operaciones de banquetes para un salón de 500 asientos, gestionando más de 200 eventos anuales con presupuestos de hasta $150K por evento',
            'Lidera un equipo de 25 meseros y capitanes de banquetes, manteniendo una puntuación de satisfacción del cliente del 96%',
            'Redujo el desperdicio de alimentos en un 18% implementando estándares de control de porciones y pronósticos precisos de BEO',
          ],
        },
        {
          title: 'Subgerente de Banquetes',
          company: 'Hilton Hotels & Resorts',
          startDate: '2019-02',
          endDate: '2021-05',
          achievements: [
            'Coordinó el montaje y servicio para más de 150 eventos por año, incluyendo bodas, cenas corporativas y galas benéficas',
            'Gestionó relaciones con proveedores de decoración floral, audio/video y entretenimiento, negociando ahorros del 12%',
            'Capacitó a más de 15 nuevos empleados en estándares de servicio, montaje de mesas y protocolos de seguridad',
          ],
        },
      ],
      education: [
        { institution: 'Johnson & Wales University', degree: 'Licenciatura en Ciencias', field: 'Gestión de Hospitalidad', startDate: '2015-09', endDate: '2019-05' },
      ],
      certifications: [
        { name: 'Certificación ServSafe Manager', issuer: 'National Restaurant Association', date: '2020-03' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe destacar un gerente de banquetes en su currículum?', answer: 'Enfatice el volumen de eventos, tamaño del equipo gestionado, puntuaciones de satisfacción del huésped, ingresos generados e iniciativas de ahorro de costos en operaciones de alimentos y bebidas.' },
      { question: '¿Se requiere un título en gestión de hospitalidad para gerentes de banquetes?', answer: 'No estrictamente, pero se prefiere un título en hospitalidad o gestión culinaria. La experiencia práctica extensa en banquetes o catering puede sustituirlo.' },
      { question: '¿Cómo cuantifican logros los gerentes de banquetes?', answer: 'Use números para eventos gestionados por año, tamaño del equipo, responsabilidad de presupuesto, porcentajes de satisfacción del huésped y métricas de reducción de costos de alimentos.' },
    ],
  },

  'barista': {
    slug: 'barista',
    title: 'Barista',
    keywords: ['ejemplo de currículum de barista', 'plantilla de currículum de barista', 'ejemplo de currículum de barista de Starbucks', 'CV de barista de cafetería'],
    searchIntents: ['ejemplo de currículum de barista', 'cómo escribir un currículum de barista sin experiencia', 'habilidades y descripción de currículum de barista'],
    topSkills: ['Preparación de Espresso', 'Arte Latte', 'Atención al Cliente', 'Manejo de Efectivo', 'Sistemas POS', 'Reabastecimiento de Inventario', 'Velocidad y Multitarea', 'Seguridad e Higiene Alimentaria', 'Conocimiento del Menú', 'Colaboración en Equipo'],
    atsKeywords: ['barista', 'espresso', 'preparación de café', 'atención al cliente', 'manejo de efectivo', 'sistema POS', 'seguridad alimentaria', 'arte latte', 'inventario', 'venta adicional', 'tareas de apertura y cierre', 'preparación de bebidas', 'ambiente de ritmo acelerado'],
    sampleResumeData: buildResumeData({
      firstName: 'Taylor',
      lastName: 'Reeves',
      profession: 'Barista',
      summary: 'Barista amable y eficiente con 3 años de experiencia en cafeterías de especialidad de alto tráfico. Experto en preparación de espresso, arte latte y entrega de experiencias excepcionales al cliente en ambientes de ritmo acelerado.',
      skills: ['Preparación de Espresso', 'Arte Latte', 'Atención al Cliente', 'Manejo de Efectivo', 'Sistemas POS', 'Reabastecimiento de Inventario', 'Velocidad y Multitarea', 'Seguridad Alimentaria', 'Conocimiento del Menú', 'Colaboración en Equipo'],
      experience: [
        {
          title: 'Barista',
          company: 'Blue Bottle Coffee',
          startDate: '2022-08',
          isCurrent: true,
          achievements: [
            'Prepara más de 150 bebidas artesanales por turno manteniendo los estándares de calidad de la marca y tiempos de espera menores a 3 minutos',
            'Promueve constantemente especiales de temporada y maridajes de repostería, aumentando el ticket promedio en un 12%',
            'Capacitó a 5 nuevos baristas en operación de máquina de espresso, técnicas de vaporizado de leche e interacción con el cliente',
          ],
        },
        {
          title: 'Barista',
          company: 'Starbucks',
          startDate: '2021-01',
          endDate: '2022-07',
          achievements: [
            'Atendió a más de 200 clientes por turno en una ubicación con servicio en auto y presencial, obteniendo el reconocimiento "Socio del Trimestre"',
            'Mantuvo un área de barra limpia y organizada, pasando todas las inspecciones sanitarias sin violaciones',
            'Memorizó y preparó más de 80 bebidas del menú estándar y secreto con precisión constante',
          ],
        },
      ],
      education: [
        { institution: 'Seattle Central College', degree: 'Asociado en Artes', field: 'Estudios Generales', startDate: '2019-09', endDate: '2021-06' },
      ],
      certifications: [
        { name: 'Permiso de Manipulador de Alimentos', issuer: 'King County Public Health', date: '2021-02' },
      ],
    }),
    faqs: [
      { question: '¿Qué debo poner en un currículum de barista?', answer: 'Incluya habilidades de preparación de espresso y café, experiencia en atención al cliente, dominio de POS y cualquier logro en velocidad o ventas adicionales. Mencione certificaciones de seguridad alimentaria.' },
      { question: '¿Cómo escribo un currículum de barista sin experiencia?', answer: 'Destaque habilidades transferibles como atención al cliente, manejo de efectivo, multitarea y trabajo en equipo de otros roles. Mencione cursos de capacitación en café o permisos de manipulador de alimentos.' },
      { question: '¿Cuáles son buenos verbos de acción para un currículum de barista?', answer: 'Use verbos como "preparó", "atendió", "capacitó", "mantuvo", "vendió", "operó" y "coordinó" para describir sus deberes y logros como barista.' },
    ],
  },

  'carpenter': {
    slug: 'carpintero',
    title: 'Carpintero',
    keywords: ['ejemplo de currículum de carpintero', 'currículum de carpintero oficial', 'plantilla de currículum de carpintero de construcción', 'ejemplo de CV de carpintero de acabados'],
    searchIntents: ['ejemplo de currículum de carpintero', 'cómo escribir un currículum de carpintero', 'consejos para currículum de carpintero de construcción'],
    topSkills: ['Estructura y Carpintería Gruesa', 'Carpintería de Acabados', 'Lectura de Planos', 'Dominio de Herramientas Eléctricas y Manuales', 'Instalación de Gabinetes', 'Trabajo de Tablaroca y Molduras', 'Cumplimiento de Seguridad OSHA', 'Medición y Trazo', 'Estimación de Proyectos', 'Liderazgo de Equipo'],
    atsKeywords: ['carpintería', 'estructura', 'carpintería de acabados', 'lectura de planos', 'herramientas eléctricas', 'instalación de gabinetes', 'tablaroca', 'molduras', 'OSHA', 'construcción', 'remodelación', 'estructura de madera', 'cimbra de concreto', 'códigos de construcción'],
    sampleResumeData: buildResumeData({
      firstName: 'Bryce',
      lastName: 'Olsen',
      profession: 'Carpintero',
      summary: 'Carpintero experimentado con 8 años de experiencia en construcción residencial y comercial. Competente en estructura, carpintería de acabados, instalación de gabinetes y remodelación con un sólido historial de entrega de proyectos a tiempo y dentro del presupuesto.',
      skills: ['Estructura y Carpintería Gruesa', 'Carpintería de Acabados', 'Lectura de Planos', 'Herramientas Eléctricas y Manuales', 'Instalación de Gabinetes', 'Trabajo de Tablaroca y Molduras', 'Cumplimiento de Seguridad OSHA', 'Medición y Trazo', 'Estimación de Proyectos', 'Liderazgo de Equipo'],
      experience: [
        {
          title: 'Carpintero Líder',
          company: 'Turner Construction',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Lidera una cuadrilla de 6 carpinteros en proyectos de construcción comercial y mejoras de inquilinos valorados entre $2M-$10M',
            'Completa trabajos de estructura, tablaroca y acabados según programa, manteniendo una tasa de entrega a tiempo del 98%',
            'Implementa pláticas diarias de seguridad, contribuyendo a más de 1,200 días consecutivos sin incidentes con tiempo perdido',
          ],
        },
        {
          title: 'Carpintero Oficial',
          company: 'Hensel Phelps',
          startDate: '2016-06',
          endDate: '2020-03',
          achievements: [
            'Realizó carpintería gruesa y de acabados para hospitales, escuelas y edificios de oficinas con valores de $5M a $50M',
            'Interpretó planos arquitectónicos y dibujos de taller para trazar con precisión muros, puertas y herrajes',
            'Asesoró a 4 aprendices de carpintería, guiándolos en los requisitos del programa de aprendizaje del sindicato',
          ],
        },
      ],
      education: [
        { institution: 'Carpenters Training Center – UBC Local 22', degree: 'Certificado de Aprendizaje', field: 'Carpintería', startDate: '2014-09', endDate: '2016-05' },
      ],
      certifications: [
        { name: 'Seguridad en Construcción OSHA 30 Horas', issuer: 'OSHA', date: '2017-03' },
        { name: 'Primeros Auxilios y RCP', issuer: 'American Red Cross', date: '2023-01' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un carpintero en su currículum?', answer: 'Destaque habilidades específicas de carpintería (estructura, acabados, gabinetes), tipos y valores de proyectos, historial de seguridad y certificaciones como OSHA 30 o credencial de oficial del sindicato.' },
      { question: '¿Cómo muestran los carpinteros progresión profesional?', answer: 'Muestre la progresión de aprendiz a oficial a carpintero líder. Mencione el tamaño de cuadrilla gestionada, aumento en el alcance de proyectos y responsabilidades de mentoría.' },
      { question: '¿Los carpinteros necesitan certificaciones para su currículum?', answer: 'La certificación OSHA de 10 o 30 horas es altamente valorada. La certificación de oficial del sindicato y primeros auxilios/RCP también son adiciones sólidas.' },
    ],
  },

  'cashier': {
    slug: 'cajero',
    title: 'Cajero',
    keywords: ['ejemplo de currículum de cajero', 'plantilla de currículum de cajero', 'currículum de cajero de supermercado', 'ejemplo de currículum de cajero de tienda'],
    searchIntents: ['ejemplo de currículum de cajero', 'cómo escribir un currículum de cajero sin experiencia', 'habilidades y deberes de cajero en currículum'],
    topSkills: ['Operación de POS', 'Manejo de Efectivo', 'Atención al Cliente', 'Embalaje y Empaque', 'Escaneo de Productos', 'Devoluciones y Cambios', 'Venta Adicional', 'Velocidad y Precisión', 'Matemáticas Básicas', 'Colaboración en Equipo'],
    atsKeywords: ['cajero', 'sistema POS', 'manejo de efectivo', 'atención al cliente', 'operación de caja registradora', 'ventas minoristas', 'devoluciones y cambios', 'venta adicional', 'inventario', 'embalaje', 'procesamiento de transacciones', 'prevención de pérdidas', 'apertura y cierre'],
    sampleResumeData: buildResumeData({
      firstName: 'Jordan',
      lastName: 'Price',
      profession: 'Cajero',
      summary: 'Cajero confiable con 3 años de experiencia en tiendas minoristas manejando transacciones de alto volumen con precisión y eficiencia. Reconocido por su trato amable con el cliente, habilidades de venta adicional y mantenimiento de una caja registradora balanceada.',
      skills: ['Operación de POS', 'Manejo de Efectivo', 'Atención al Cliente', 'Embalaje y Empaque', 'Escaneo de Productos', 'Devoluciones y Cambios', 'Venta Adicional', 'Velocidad y Precisión', 'Matemáticas Básicas', 'Colaboración en Equipo'],
      experience: [
        {
          title: 'Cajero',
          company: 'Target',
          startDate: '2022-06',
          isCurrent: true,
          achievements: [
            'Procesa más de 150 transacciones por turno con una tasa de precisión del 99.8% y cero discrepancias en la caja durante 12 meses',
            'Promueve inscripciones al programa de lealtad Target Circle, registrando más de 20 nuevos miembros semanalmente, siendo el mejor del equipo en la tienda',
            'Asiste con la presentación de productos y reabastecimiento de inventario durante períodos de bajo tráfico',
          ],
        },
        {
          title: 'Cajero / Asociado de Ventas',
          company: 'Kroger',
          startDate: '2021-01',
          endDate: '2022-05',
          achievements: [
            'Operó cajas POS y autoservicio, atendiendo un promedio de 200 clientes por turno',
            'Gestionó devoluciones, cambios y ajustes de precios de acuerdo con las políticas de la tienda',
            'Obtuvo el reconocimiento de Empleado del Mes en dos ocasiones por excelentes puntuaciones de satisfacción del cliente',
          ],
        },
      ],
      education: [
        { institution: 'Columbus State Community College', degree: 'Asociado en Artes', field: 'Administración de Empresas', startDate: '2020-08', endDate: '2022-05' },
      ],
    }),
    faqs: [
      { question: '¿Cómo escribo un currículum de cajero sin experiencia?', answer: 'Enfóquese en habilidades transferibles: interacción con clientes, matemáticas básicas, atención al detalle y trabajo en equipo. Incluya trabajo voluntario, proyectos escolares o cualquier rol de medio tiempo que involucre personas.' },
      { question: '¿Qué habilidades debe listar un cajero en su currículum?', answer: 'Operación de POS, manejo de efectivo, atención al cliente, velocidad y precisión, venta adicional, procesamiento de devoluciones y tareas básicas de inventario.' },
      { question: '¿Cómo debo describir los deberes de cajero en un currículum?', answer: 'Use números: transacciones procesadas por turno, tasas de precisión, estadísticas de inscripción en programas de lealtad y cualquier reconocimiento recibido. Evite descripciones genéricas.' },
    ],
  },

  'chef': {
    slug: 'chef',
    title: 'Chef',
    keywords: ['ejemplo de currículum de chef', 'plantilla de currículum de chef ejecutivo', 'currículum de cocinero de línea chef', 'ejemplo de CV de chef principal', 'currículum de sous chef'],
    searchIntents: ['ejemplo de currículum de chef', 'cómo escribir un currículum de chef', 'currículum de chef ejecutivo con logros'],
    topSkills: ['Desarrollo de Menús', 'Gestión de Cocina', 'Control de Costos de Alimentos', 'Gestión de Inventario', 'Capacitación y Supervisión de Personal', 'Seguridad Alimentaria y HACCP', 'Emplatado y Presentación', 'Abastecimiento con Proveedores', 'Cocina de Alto Volumen', 'Creatividad Culinaria'],
    atsKeywords: ['desarrollo de menús', 'gestión de cocina', 'control de costos de alimentos', 'HACCP', 'gestión de inventario', 'artes culinarias', 'cocina de línea', 'catering para banquetes', 'seguridad alimentaria', 'capacitación de personal', 'relaciones con proveedores', 'emplatado', 'desarrollo de recetas', 'alta cocina'],
    sampleResumeData: buildResumeData({
      firstName: 'Marco',
      lastName: 'Rossi',
      profession: 'Chef',
      summary: 'Chef ejecutivo apasionado con 10 años de experiencia culinaria que abarca alta cocina, cocina de la granja a la mesa y catering de alto volumen. Líder comprobado en innovación de menús, gestión de costos y formación de brigadas de cocina cohesivas.',
      skills: ['Desarrollo de Menús', 'Gestión de Cocina', 'Control de Costos de Alimentos', 'Gestión de Inventario', 'Capacitación y Supervisión de Personal', 'Seguridad Alimentaria y HACCP', 'Emplatado y Presentación', 'Abastecimiento con Proveedores', 'Cocina de Alto Volumen', 'Creatividad Culinaria'],
      experience: [
        {
          title: 'Chef Ejecutivo',
          company: 'The Harvest Table',
          startDate: '2020-09',
          isCurrent: true,
          achievements: [
            'Supervisa todas las operaciones de cocina de un restaurante de la granja a la mesa de 180 asientos que genera $3.5M en ingresos anuales',
            'Redujo los costos de alimentos del 34% al 28% mediante ingeniería de menús de temporada y programas de reducción de desperdicios',
            'Contrata, capacita y gestiona una brigada de 18 cocineros de línea, preparadores y lavaplatos',
          ],
        },
        {
          title: 'Sous Chef',
          company: 'Le Bernardin',
          startDate: '2016-05',
          endDate: '2020-08',
          achievements: [
            'Dirigió las operaciones diarias de cocina para servicios de almuerzo y cena con un promedio de 250 cubiertos por noche',
            'Desarrolló más de 12 menús de degustación de temporada que recibieron reconocimientos constantes de la Guía Michelin',
            'Implementó un sistema de inventario FIFO que redujo el deterioro en un 20% y ahorró $40K anuales',
          ],
        },
      ],
      education: [
        { institution: 'Culinary Institute of America', degree: 'Asociado en Estudios Ocupacionales', field: 'Artes Culinarias', startDate: '2013-09', endDate: '2015-05' },
      ],
      certifications: [
        { name: 'Certificación ServSafe Manager', issuer: 'National Restaurant Association', date: '2019-07' },
        { name: 'Certificación HACCP', issuer: 'FDA', date: '2020-01' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un chef en su currículum?', answer: 'Incluya tipos de cocina, tamaño de cocina gestionada, cubiertos por servicio, porcentajes de costo de alimentos, logros en desarrollo de menús y certificaciones como ServSafe o HACCP.' },
      { question: '¿Cómo muestran los chefs progresión en su currículum?', answer: 'Muestre su trayectoria de cocinero de línea a sous chef a chef ejecutivo. Cada rol debe demostrar responsabilidad creciente en planificación de menús, gestión de personal y control de presupuesto.' },
      { question: '¿Es necesario incluir la escuela culinaria en un currículum de chef?', answer: 'Si asistió a una escuela culinaria, inclúyala. Si no, enfatice pasantías, stages y capacitación en el trabajo. La experiencia y las habilidades son lo más importante en la industria culinaria.' },
    ],
  },

  'concierge': {
    slug: 'conserje',
    title: 'Concierge',
    keywords: ['ejemplo de currículum de concierge', 'plantilla de currículum de concierge de hotel', 'ejemplo de currículum de concierge de lujo', 'CV de concierge residencial'],
    searchIntents: ['ejemplo de currículum de concierge', 'cómo escribir un currículum de concierge', 'consejos para currículum de concierge de hotel'],
    topSkills: ['Relaciones con Huéspedes', 'Conocimiento del Área Local', 'Gestión de Reservaciones', 'Resolución de Problemas', 'Multitarea', 'Habilidades de Comunicación', 'Atención a Huéspedes VIP y de Lealtad', 'Planificación de Viajes e Itinerarios', 'Software CRM y PMS', 'Habilidades Multilingües'],
    atsKeywords: ['servicios de concierge', 'relaciones con huéspedes', 'gestión de reservaciones', 'hospitalidad', 'huéspedes VIP', 'planificación de itinerarios', 'conocimiento del área local', 'atención al cliente', 'sistemas PMS', 'Opera', 'hospitalidad de lujo', 'resolución de problemas', 'front office'],
    sampleResumeData: buildResumeData({
      firstName: 'Elise',
      lastName: 'Fontaine',
      profession: 'Concierge',
      summary: 'Concierge de hotel refinada con 5 años de experiencia brindando servicios personalizados a huéspedes en propiedades de lujo. Experta en curar experiencias a medida, gestionar relaciones VIP y resolver solicitudes complejas de huéspedes con elegancia.',
      skills: ['Relaciones con Huéspedes', 'Conocimiento del Área Local', 'Gestión de Reservaciones', 'Resolución de Problemas', 'Multitarea', 'Habilidades de Comunicación', 'Atención a Huéspedes VIP', 'Planificación de Viajes e Itinerarios', 'Opera PMS', 'Multilingüe (Inglés, Francés)'],
      experience: [
        {
          title: 'Concierge Principal',
          company: 'Four Seasons Hotel New York',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Sirve como punto de contacto principal para más de 300 habitaciones, atendiendo más de 50 solicitudes diarias de huéspedes con una tasa de resolución del 99%',
            'Cura itinerarios de gastronomía, entretenimiento y viajes para huéspedes VIP y de nivel de lealtad, logrando una puntuación de satisfacción de 4.9/5',
            'Lidera un equipo de 4 asociados de concierge, supervisando programación y desarrollo profesional',
          ],
        },
        {
          title: 'Asociado de Concierge',
          company: 'The Ritz-Carlton, Washington D.C.',
          startDate: '2019-05',
          endDate: '2021-12',
          achievements: [
            'Gestionó reservaciones de restaurantes, reservas de teatro y arreglos de transporte para un promedio de 40 huéspedes por día',
            'Construyó una red curada de más de 100 contactos de proveedores locales, facilitando experiencias exclusivas para huéspedes',
            'Resolvió quejas de huéspedes en un promedio de 15 minutos, manteniendo la calificación Forbes Five-Star del hotel',
          ],
        },
      ],
      education: [
        { institution: 'Cornell University – School of Hotel Administration', degree: 'Licenciatura en Ciencias', field: 'Administración Hotelera', startDate: '2015-08', endDate: '2019-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué hace un buen currículum de concierge?', answer: 'Destaque puntuaciones de satisfacción del huésped, velocidad de resolución de solicitudes, experiencia en atención VIP y su red de contactos locales. Las habilidades de idiomas son un gran plus.' },
      { question: '¿Los concierges necesitan certificaciones?', answer: 'La membresía Les Clefs d\'Or es el estándar de oro pero no es requerida. Las certificaciones de la American Hotel & Lodging Association también agregan valor.' },
      { question: '¿Cómo debo listar habilidades multilingües en un currículum de concierge?', answer: 'Cree una sección dedicada de idiomas listando cada idioma y nivel de competencia. Esto es especialmente valorado en entornos de hospitalidad de lujo e internacionales.' },
    ],
  },

  'cook': {
    slug: 'cocinero',
    title: 'Cocinero',
    keywords: ['ejemplo de currículum de cocinero', 'plantilla de currículum de cocinero de línea', 'ejemplo de currículum de cocinero de preparación', 'CV de cocinero de restaurante'],
    searchIntents: ['ejemplo de currículum de cocinero', 'cómo escribir un currículum de cocinero', 'currículum de cocinero de línea para principiantes'],
    topSkills: ['Preparación de Alimentos', 'Cocina de Línea', 'Habilidades con Cuchillo', 'Estaciones de Parrilla y Salteado', 'Seguridad e Higiene Alimentaria', 'Rotación de Inventario (FIFO)', 'Ejecución de Recetas', 'Gestión del Tiempo', 'Colaboración en Equipo', 'Servicio de Alto Volumen'],
    atsKeywords: ['preparación de alimentos', 'cocinero de línea', 'cocinero de preparación', 'parrilla', 'salteado', 'seguridad alimentaria', 'higiene', 'FIFO', 'ejecución de recetas', 'cocina de alto volumen', 'emplatado', 'ServSafe', 'equipo de cocina', 'catering'],
    sampleResumeData: buildResumeData({
      firstName: 'Miguel',
      lastName: 'Santos',
      profession: 'Cocinero',
      summary: 'Cocinero de línea trabajador con 4 años de experiencia en cocinas de restaurantes de ritmo acelerado. Competente en estaciones de parrilla, salteado y preparación con enfoque en calidad, consistencia y seguridad alimentaria.',
      skills: ['Preparación de Alimentos', 'Cocina de Línea', 'Habilidades con Cuchillo', 'Parrilla y Salteado', 'Seguridad Alimentaria', 'Rotación de Inventario', 'Ejecución de Recetas', 'Gestión del Tiempo', 'Colaboración en Equipo', 'Servicio de Alto Volumen'],
      experience: [
        {
          title: 'Cocinero de Línea',
          company: 'Olive Garden',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Gestiona las estaciones de parrilla y salteado durante el servicio de cena, preparando más de 80 platos principales por turno con calidad consistente',
            'Mantiene la limpieza de la cocina y los estándares de seguridad alimentaria, pasando todas las inspecciones sanitarias trimestrales con 95%+',
            'Asiste con la preparación diaria incluyendo fondos, producción de salsas y procesamiento de vegetales para más de 200 cubiertos',
          ],
        },
        {
          title: 'Cocinero de Preparación',
          company: 'Chili\'s Grill & Bar',
          startDate: '2020-06',
          endDate: '2022-03',
          achievements: [
            'Preparó ingredientes para todas las estaciones, procesando más de 100 libras de productos y proteínas diariamente',
            'Implementó un sistema de etiquetado y fechado que mejoró el cumplimiento FIFO y redujo el deterioro en un 15%',
            'Se capacitó en estaciones de fritura, parrilla y expedición para brindar cobertura de turno según fuera necesario',
          ],
        },
      ],
      education: [
        { institution: 'Houston Community College', degree: 'Certificado', field: 'Artes Culinarias', startDate: '2019-09', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'Manipulador de Alimentos ServSafe', issuer: 'National Restaurant Association', date: '2020-08' },
      ],
    }),
    faqs: [
      { question: '¿Cómo escribo un currículum de cocinero sin experiencia?', answer: 'Incluya cualquier experiencia cocinando en casa, clases culinarias o trabajo voluntario en servicio de alimentos. Enfatice habilidades con cuchillo, conocimiento de seguridad y disposición para aprender múltiples estaciones.' },
      { question: '¿Cuál es la diferencia entre un cocinero y un chef en un currículum?', answer: 'Un cocinero típicamente ejecuta recetas en estaciones específicas, mientras que un chef diseña menús y gestiona la cocina. Adapte su título y descripciones para que coincidan con su rol real.' },
      { question: '¿Debe un cocinero obtener la certificación ServSafe?', answer: 'Sí. Una certificación ServSafe de Manipulador de Alimentos o Manager demuestra a los empleadores que comprende las regulaciones de seguridad alimentaria y a menudo es un requisito laboral.' },
    ],
  },

  'delivery-driver': {
    slug: 'repartidor',
    title: 'Repartidor',
    keywords: ['ejemplo de currículum de repartidor', 'plantilla de currículum de repartidor', 'currículum de repartidor de Amazon', 'ejemplo de currículum de mensajero'],
    searchIntents: ['ejemplo de currículum de repartidor', 'cómo escribir un currículum de repartidor', 'currículum de repartidor sin experiencia'],
    topSkills: ['Navegación de Rutas (GPS)', 'Historial de Conducción Segura', 'Gestión del Tiempo', 'Manejo de Paquetes', 'Interacción con el Cliente', 'Inspección de Vehículos', 'Cumplimiento DOT', 'Sistemas de Seguimiento de Entregas', 'Resistencia Física', 'Resolución de Problemas'],
    atsKeywords: ['repartidor', 'planificación de rutas', 'navegación GPS', 'CDL', 'cumplimiento DOT', 'entrega de paquetes', 'inspección de vehículos', 'conducción segura', 'entrega de última milla', 'logística', 'atención al cliente', 'entrega a tiempo', 'almacén'],
    sampleResumeData: buildResumeData({
      firstName: 'Darius',
      lastName: 'King',
      profession: 'Repartidor',
      summary: 'Repartidor confiable con 4 años de experiencia en entrega de última milla y rutas establecidas. Historial de conducción limpio con una tasa de entrega a tiempo superior al 99%. Comprometido con la operación segura del vehículo y excelente atención al cliente.',
      skills: ['Navegación de Rutas', 'Conducción Segura', 'Gestión del Tiempo', 'Manejo de Paquetes', 'Interacción con el Cliente', 'Inspección de Vehículos', 'Cumplimiento DOT', 'Sistemas de Seguimiento de Entregas', 'Resistencia Física', 'Resolución de Problemas'],
      experience: [
        {
          title: 'Repartidor',
          company: 'Amazon DSP – Quick Route Logistics',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Entrega 180-220 paquetes diarios en rutas residenciales y comerciales, manteniendo una tasa de entrega a tiempo del 99.5%',
            'Completa inspecciones diarias del vehículo antes y después del viaje, reportando cero accidentes prevenibles en más de 2 años',
            'Navega rutas optimizadas usando la app Flex, cubriendo más de 120 paradas por turno en áreas urbanas y suburbanas',
          ],
        },
        {
          title: 'Conductor de Ruta',
          company: 'FedEx Ground',
          startDate: '2020-05',
          endDate: '2022-02',
          achievements: [
            'Gestionó más de 150 paradas por día en rutas asignadas, logrando una calificación de satisfacción del cliente del 98.7%',
            'Cargó y aseguró paquetes de hasta 75 libras, siguiendo protocolos de levantamiento seguro y carga de vehículos',
            'Resolvió excepciones de entrega (dirección incorrecta, acceso restringido) de forma proactiva, reduciendo entregas fallidas en un 12%',
          ],
        },
      ],
      education: [
        { institution: 'Georgia State University', degree: 'Diploma de Preparatoria', field: 'Estudios Generales', startDate: '2016-08', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'Licencia de Conducir Comercial Clase C', issuer: 'Georgia DDS', date: '2020-04' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe poner un repartidor en su currículum?', answer: 'Incluya su historial de conducción, paquetes entregados por día, tasa de entrega a tiempo, puntuaciones de satisfacción del cliente y cualquier licencia relevante (CDL, tarjeta médica DOT).' },
      { question: '¿Los repartidores necesitan CDL?', answer: 'La mayoría de los roles de entrega de última milla no requieren CDL, pero tener una abre oportunidades mejor pagadas con vehículos más grandes. Siempre revise los requisitos de la publicación de empleo.' },
      { question: '¿Cómo describo la experiencia de repartidor en un currículum?', answer: 'Enfóquese en volumen (paquetes/paradas por día), tasas de entrega a tiempo, historial de seguridad y retroalimentación del cliente. Mencione plataformas o herramientas de entrega específicas que haya utilizado.' },
    ],
  },

  'delivery-manager': {
    slug: 'gerente-de-entregas',
    title: 'Gerente de Entregas',
    keywords: ['ejemplo de currículum de gerente de entregas', 'plantilla de currículum de gerente de entregas de TI', 'CV de gerente de entregas de proyectos', 'ejemplo de currículum de gerente de entregas ágil'],
    searchIntents: ['ejemplo de currículum de gerente de entregas', 'cómo escribir un currículum de gerente de entregas', 'consejos para currículum de gerente de entregas ágil'],
    topSkills: ['Entrega de Proyectos', 'Agile y Scrum', 'Gestión de Stakeholders', 'Liderazgo de Equipo', 'Gestión de Riesgos', 'Supervisión de Presupuesto', 'Planificación de Roadmap', 'Gestión de Proveedores', 'JIRA / Confluence', 'Reporte de KPIs'],
    atsKeywords: ['gestión de entregas', 'agile', 'scrum', 'entrega de proyectos', 'gestión de stakeholders', 'gestión de riesgos', 'gestión de presupuesto', 'planificación de roadmap', 'JIRA', 'planificación de sprint', 'equipos multifuncionales', 'seguimiento de KPIs', 'gestión de lanzamientos', 'mejora continua'],
    sampleResumeData: buildResumeData({
      firstName: 'Samantha',
      lastName: 'Rhodes',
      profession: 'Gerente de Entregas',
      summary: 'Gerente de entregas orientada a resultados con 7 años de experiencia supervisando la entrega integral de proyectos en entornos de TI y desarrollo de software. Experta en marcos ágiles, alineación de stakeholders e impulso de equipos multifuncionales para entregar a tiempo y dentro del presupuesto.',
      skills: ['Entrega de Proyectos', 'Agile y Scrum', 'Gestión de Stakeholders', 'Liderazgo de Equipo', 'Gestión de Riesgos', 'Supervisión de Presupuesto', 'Planificación de Roadmap', 'Gestión de Proveedores', 'JIRA y Confluence', 'Reporte de KPIs'],
      experience: [
        {
          title: 'Gerente de Entregas Senior',
          company: 'ThoughtWorks',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Gestiona la entrega de 4 compromisos concurrentes con clientes con un valor combinado de $8M, logrando un 100% de entrega a tiempo',
            'Lidera equipos multifuncionales de 15-25 ingenieros, diseñadores y analistas QA en 3 zonas horarias',
            'Introdujo dashboards de salud de entregas en JIRA que mejoraron la predictibilidad de velocidad de sprint en un 30%',
          ],
        },
        {
          title: 'Gerente de Entregas',
          company: 'Accenture',
          startDate: '2017-09',
          endDate: '2021-01',
          achievements: [
            'Entregó más de 10 proyectos de transformación digital para clientes de servicios financieros con presupuestos de $500K a $3M',
            'Redujo las tasas de sobrecosto del 25% al 8% implementando registros de riesgos y retrospectivas quincenales',
            'Gestionó relaciones con proveedores y negociaciones de SOW, logrando ahorros del 15% en flujos de trabajo externalizados',
          ],
        },
      ],
      education: [
        { institution: 'University of Pennsylvania', degree: 'Licenciatura en Ciencias', field: 'Sistemas de Información', startDate: '2013-09', endDate: '2017-05' },
      ],
      certifications: [
        { name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance', date: '2018-05' },
        { name: 'PMP', issuer: 'Project Management Institute', date: '2020-11' },
      ],
    }),
    faqs: [
      { question: '¿Qué es un gerente de entregas en TI?', answer: 'Un gerente de entregas asegura que los proyectos de software se entreguen a tiempo, dentro del alcance y dentro del presupuesto. Facilitan ceremonias ágiles, gestionan riesgos y alinean equipos con las expectativas de los stakeholders.' },
      { question: '¿Qué certificaciones ayudan en un currículum de gerente de entregas?', answer: 'CSM (Certified ScrumMaster), PMP, SAFe Agilist y PMI-ACP son altamente valoradas para roles de gestión de entregas.' },
      { question: '¿Cómo debe cuantificar resultados un gerente de entregas?', answer: 'Cite tasas de entrega a tiempo, adherencia al presupuesto, tamaños de equipo gestionados, valores de proyectos, mejoras en velocidad y métricas de reducción de riesgos.' },
    ],
  },

  'electrician': {
    slug: 'electricista',
    title: 'Electricista',
    keywords: ['ejemplo de currículum de electricista', 'plantilla de currículum de electricista oficial', 'currículum de electricista comercial', 'ejemplo de CV de maestro electricista'],
    searchIntents: ['ejemplo de currículum de electricista', 'cómo escribir un currículum de electricista', 'consejos para currículum de electricista oficial'],
    topSkills: ['Cableado e Instalación Eléctrica', 'Cumplimiento del Código NEC', 'Lectura de Planos y Esquemas', 'Resolución de Problemas y Diagnóstico', 'Actualización de Tableros', 'Doblado de Tubería Conduit', 'Controles de Motores', 'Normas de Seguridad OSHA', 'Programación Básica de PLC', 'Sistemas Residenciales y Comerciales'],
    atsKeywords: ['cableado eléctrico', 'código NEC', 'lectura de planos', 'resolución de problemas', 'instalación de tableros', 'doblado de conduit', 'controles de motores', 'OSHA', 'electricista oficial', 'eléctrico comercial', 'eléctrico residencial', 'PLC', 'interruptor termomagnético', 'cálculo de carga'],
    sampleResumeData: buildResumeData({
      firstName: 'Ryan',
      lastName: 'O\'Brien',
      profession: 'Electricista',
      summary: 'Electricista oficial con licencia y 7 años de experiencia en instalación, mantenimiento y resolución de problemas eléctricos comerciales y residenciales. Sólido conocimiento del código NEC, regulaciones OSHA y sistemas de eficiencia energética.',
      skills: ['Cableado e Instalación Eléctrica', 'Cumplimiento del Código NEC', 'Lectura de Planos', 'Resolución de Problemas y Diagnóstico', 'Actualización de Tableros', 'Doblado de Conduit', 'Controles de Motores', 'Seguridad OSHA', 'Programación Básica de PLC', 'Sistemas Residenciales y Comerciales'],
      experience: [
        {
          title: 'Electricista Oficial',
          company: 'EMCOR Group',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Instala y mantiene sistemas eléctricos para proyectos comerciales valorados entre $1M-$20M, incluyendo edificios de oficinas y centros de datos',
            'Lee e interpreta planos, esquemas y especificaciones para asegurar instalaciones que cumplan con el código NEC',
            'Lidera una cuadrilla de 4 aprendices, brindando capacitación práctica en doblado de conduit, tendido de cables y terminaciones de tableros',
          ],
        },
        {
          title: 'Aprendiz de Electricista',
          company: 'IBEW Local 134',
          startDate: '2017-09',
          endDate: '2020-05',
          achievements: [
            'Completó más de 8,000 horas de capacitación en el trabajo junto con instrucción en aula sobre teoría eléctrica y código',
            'Realizó cableado de obra gruesa y acabados residenciales para más de 50 casas unifamiliares',
            'Asistió en la resolución de problemas de circuitos de control de motores y sistemas de alarma contra incendios en entornos comerciales',
          ],
        },
      ],
      education: [
        { institution: 'IBEW-NECA Apprenticeship Program', degree: 'Certificado de Oficial', field: 'Tecnología Eléctrica', startDate: '2017-09', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'Licencia de Electricista Oficial', issuer: 'State of Illinois', date: '2020-06' },
        { name: 'Seguridad en Construcción OSHA 30 Horas', issuer: 'OSHA', date: '2018-11' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe poner un electricista en su currículum?', answer: 'Liste su tipo de licencia (aprendiz, oficial, maestro), especialidades (comercial, residencial, industrial), tipos de proyectos y certificaciones de seguridad como OSHA 30.' },
      { question: '¿Qué tan importante es el conocimiento del NEC en un currículum de electricista?', answer: 'Muy importante. El cumplimiento del NEC es fundamental para el trabajo eléctrico. Mencione la edición del código en la que está capacitado y cualquier educación continua en actualizaciones del código.' },
      { question: '¿Los electricistas necesitan un currículum o solo una licencia?', answer: 'Ambos. Si bien la licencia es esencial, un currículum bien escrito le ayuda a destacarse, especialmente al cambiar de empleador o transicionar a roles de supervisión.' },
    ],
  },

  'field-service-technician': {
    slug: 'tecnico-de-servicio-de-campo',
    title: 'Técnico de Servicio de Campo',
    keywords: ['ejemplo de currículum de técnico de servicio de campo', 'plantilla de currículum de ingeniero de servicio de campo', 'currículum de técnico de campo HVAC', 'ejemplo de CV de técnico de servicio de campo'],
    searchIntents: ['ejemplo de currículum de técnico de servicio de campo', 'cómo escribir un currículum de técnico de servicio de campo', 'habilidades y certificaciones para currículum de técnico de campo'],
    topSkills: ['Instalación y Reparación de Equipos', 'Mantenimiento Preventivo', 'Resolución de Problemas y Diagnóstico', 'Documentación Técnica', 'Comunicación con el Cliente', 'Cumplimiento de Seguridad', 'Sistemas Eléctricos y Mecánicos', 'Gestión de Órdenes de Trabajo', 'Gestión de Inventario y Repuestos', 'Flexibilidad para Viajar'],
    atsKeywords: ['servicio de campo', 'instalación de equipos', 'mantenimiento preventivo', 'resolución de problemas', 'soporte técnico', 'órdenes de trabajo', 'atención al cliente', 'cumplimiento de seguridad', 'sistemas eléctricos', 'sistemas mecánicos', 'HVAC', 'calibración', 'informes de servicio', 'reparación en sitio'],
    sampleResumeData: buildResumeData({
      firstName: 'Jason',
      lastName: 'Wells',
      profession: 'Técnico de Servicio de Campo',
      summary: 'Técnico de servicio de campo experimentado con 5 años de experiencia instalando, manteniendo y reparando equipos comerciales e industriales. Sólidas habilidades de diagnóstico con compromiso en la resolución en la primera visita y satisfacción del cliente.',
      skills: ['Instalación y Reparación de Equipos', 'Mantenimiento Preventivo', 'Resolución de Problemas', 'Documentación Técnica', 'Comunicación con el Cliente', 'Cumplimiento de Seguridad', 'Sistemas Eléctricos y Mecánicos', 'Gestión de Órdenes de Trabajo', 'Gestión de Inventario y Repuestos', 'Flexibilidad para Viajar'],
      experience: [
        {
          title: 'Técnico de Servicio de Campo II',
          company: 'Siemens',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Realiza instalación, puesta en marcha y reparación en sitio de sistemas de automatización de edificios y control HVAC en un territorio de 5 estados',
            'Logra una tasa de resolución en la primera visita del 92%, minimizando el tiempo de inactividad del cliente y las visitas de servicio repetidas',
            'Documenta todas las actividades de servicio en SAP, manteniendo el 100% de cumplimiento con los requisitos de reporte de SLA',
          ],
        },
        {
          title: 'Técnico de Servicio de Campo',
          company: 'Trane Technologies',
          startDate: '2019-03',
          endDate: '2021-07',
          achievements: [
            'Atendió 15-20 unidades de HVAC comerciales semanalmente, realizando diagnóstico, recuperación de refrigerante y reemplazo de componentes',
            'Redujo el tiempo promedio de reparación en un 18% desarrollando un kit de partes móvil para los modos de falla más comunes',
            'Capacitó a 3 nuevos técnicos en procedimientos de resolución de problemas y protocolos de seguridad',
          ],
        },
      ],
      education: [
        { institution: 'Nashville State Community College', degree: 'Asociado en Ciencias Aplicadas', field: 'Tecnología de Mantenimiento Industrial', startDate: '2017-08', endDate: '2019-05' },
      ],
      certifications: [
        { name: 'EPA Sección 608 Universal', issuer: 'EPA', date: '2019-06' },
        { name: 'OSHA 10 Horas Industria General', issuer: 'OSHA', date: '2019-09' },
      ],
    }),
    faqs: [
      { question: '¿Qué hace un técnico de servicio de campo en un currículum?', answer: 'Describa la instalación, mantenimiento, diagnóstico y reparación de equipos en sitio. Incluya tamaño del territorio, tasas de resolución y métricas de satisfacción del cliente.' },
      { question: '¿Qué certificaciones ayudan en un currículum de técnico de servicio de campo?', answer: 'EPA 608, OSHA 10/30, certificaciones específicas del fabricante y CompTIA A+ (para servicio de campo relacionado con TI) son adiciones sólidas.' },
      { question: '¿Cómo muestro los viajes en un currículum de técnico de servicio de campo?', answer: 'Mencione su territorio (número de estados o radio en millas), disposición para viajar y cualquier porcentaje de viaje (ej. 75% de viaje).' },
    ],
  },

  'firefighter': {
    slug: 'bombero',
    title: 'Bombero',
    keywords: ['ejemplo de currículum de bombero', 'plantilla de currículum de bombero', 'currículum de bombero nivel inicial', 'ejemplo de currículum de bombero paramédico'],
    searchIntents: ['ejemplo de currículum de bombero', 'cómo escribir un currículum de bombero', 'currículum de bombero para principiantes'],
    topSkills: ['Supresión de Incendios', 'Respuesta Médica de Emergencia', 'Operaciones de Materiales Peligrosos', 'Búsqueda y Rescate', 'Operación de Equipos', 'Condición Física', 'Sistema de Comando de Incidentes', 'Prevención e Inspección de Incendios', 'Educación Pública', 'Trabajo en Equipo Bajo Presión'],
    atsKeywords: ['supresión de incendios', 'servicios médicos de emergencia', 'materiales peligrosos', 'búsqueda y rescate', 'EMT', 'paramédico', 'sistema de comando de incidentes', 'prevención de incendios', 'NFPA', 'SCBA', 'operaciones de escalera', 'RCP', 'inspección de incendios', 'condición física'],
    sampleResumeData: buildResumeData({
      firstName: 'Daniel',
      lastName: 'Reyes',
      profession: 'Bombero',
      summary: 'Bombero/EMT dedicado con 5 años de experiencia en primera línea en supresión de incendios, respuesta médica de emergencia y operaciones con materiales peligrosos. Comprometido con la seguridad comunitaria, capacitación continua y trabajo en equipo ejemplar bajo condiciones de alta presión.',
      skills: ['Supresión de Incendios', 'Respuesta Médica de Emergencia', 'Operaciones de Materiales Peligrosos', 'Búsqueda y Rescate', 'Operación de Equipos', 'Condición Física', 'Sistema de Comando de Incidentes', 'Prevención de Incendios', 'Educación Pública', 'Trabajo en Equipo Bajo Presión'],
      experience: [
        {
          title: 'Bombero / EMT',
          company: 'City of Austin Fire Department',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Responde a más de 200 llamadas de emergencia por mes incluyendo incendios estructurales, accidentes vehiculares y emergencias médicas',
            'Opera equipos de bombeo y camiones de escalera aérea, asegurando suministro de agua y cobertura de supresión',
            'Realiza más de 50 inspecciones anuales de prevención de incendios para propiedades comerciales y multifamiliares',
          ],
        },
        {
          title: 'Bombero Voluntario / EMT-B',
          company: 'Round Rock Volunteer Fire Department',
          startDate: '2019-06',
          endDate: '2020-12',
          achievements: [
            'Completó más de 600 horas voluntarias respondiendo a llamadas de incendios, médicas y de materiales peligrosos',
            'Realizó operaciones de búsqueda y rescate en ambientes de baja visibilidad usando SCBA y cámaras de imagen térmica',
            'Participó en eventos de alcance comunitario, educando a más de 500 residentes sobre seguridad contra incendios y RCP',
          ],
        },
      ],
      education: [
        { institution: 'Texas A&M Engineering Extension Service', degree: 'Certificado', field: 'Academia de Bomberos (Certificado TCFP)', startDate: '2018-09', endDate: '2019-05' },
        { institution: 'Austin Community College', degree: 'Asociado en Ciencias Aplicadas', field: 'Ciencias del Fuego', startDate: '2016-08', endDate: '2018-05' },
      ],
      certifications: [
        { name: 'EMT-Básico', issuer: 'NREMT', date: '2019-05' },
        { name: 'Operaciones con Materiales Peligrosos', issuer: 'TCFP', date: '2019-07' },
        { name: 'NFPA Bombero I y II', issuer: 'TCFP', date: '2019-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un currículum de bombero?', answer: 'Incluya sus certificaciones (Bombero I/II, EMT, Materiales Peligrosos), volumen de llamadas, experiencia con equipos, asignaciones a equipos especiales y cualquier actividad de alcance comunitario.' },
      { question: '¿Cómo escribo un currículum de bombero sin experiencia?', answer: 'Destaque el voluntariado como bombero, capacitación en la academia, certificación EMT, puntuaciones de condición física (CPAT) y cualquier servicio comunitario relacionado.' },
      { question: '¿Es importante la certificación EMT en un currículum de bombero?', answer: 'Sí, la mayoría de los departamentos de bomberos requieren al menos EMT-B. La certificación de paramédico es aún más competitiva y debe figurar de manera prominente.' },
    ],
  },

  'flight-attendant': {
    slug: 'asistente-de-vuelo',
    title: 'Asistente de Vuelo',
    keywords: ['ejemplo de currículum de asistente de vuelo', 'plantilla de currículum de asistente de vuelo', 'ejemplo de currículum de tripulación de cabina', 'CV de asistente de vuelo de aerolínea'],
    searchIntents: ['ejemplo de currículum de asistente de vuelo', 'cómo escribir un currículum de asistente de vuelo', 'currículum de asistente de vuelo sin experiencia'],
    topSkills: ['Seguridad de Pasajeros y Procedimientos de Emergencia', 'Excelencia en Atención al Cliente', 'Resolución de Conflictos', 'Comunicación Multilingüe', 'Primeros Auxilios y RCP', 'Servicio de Cabina', 'Trabajo en Equipo y Adaptabilidad', 'Sensibilidad Cultural', 'Ventas a Bordo', 'Cumplimiento Regulatorio (FAA/EASA)'],
    atsKeywords: ['asistente de vuelo', 'tripulación de cabina', 'seguridad de pasajeros', 'procedimientos de emergencia', 'atención al cliente', 'servicio a bordo', 'regulaciones FAA', 'primeros auxilios', 'RCP', 'resolución de conflictos', 'demostración de seguridad', 'servicio de bebidas', 'multilingüe', 'aviación'],
    sampleResumeData: buildResumeData({
      firstName: 'Natasha',
      lastName: 'Levin',
      profession: 'Asistente de Vuelo',
      summary: 'Asistente de vuelo profesional con 4 años de experiencia brindando un servicio excepcional a bordo en rutas nacionales e internacionales. Capacitada en procedimientos de emergencia, primeros auxilios y desescalamiento de conflictos con fluidez en inglés y portugués.',
      skills: ['Seguridad de Pasajeros', 'Procedimientos de Emergencia', 'Atención al Cliente', 'Resolución de Conflictos', 'Comunicación Multilingüe', 'Primeros Auxilios y RCP', 'Servicio de Cabina', 'Trabajo en Equipo y Adaptabilidad', 'Ventas a Bordo', 'Cumplimiento FAA'],
      experience: [
        {
          title: 'Asistente de Vuelo',
          company: 'Delta Air Lines',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Atiende 100-200 pasajeros por vuelo en rutas nacionales y transatlánticas, recibiendo consistentemente elogios por la calidad del servicio',
            'Realiza briefings de seguridad y simulacros de emergencia, manteniendo el 100% de cumplimiento con las regulaciones de la FAA',
            'Seleccionada como parte de la tripulación de cabina premium para servicio internacional de primera clase basándose en evaluaciones de desempeño',
          ],
        },
        {
          title: 'Asistente de Vuelo',
          company: 'JetBlue Airways',
          startDate: '2020-08',
          endDate: '2022-02',
          achievements: [
            'Entregó servicio de bebidas y snacks a bordo mientras gestionaba consultas de pasajeros y solicitudes de asistencia especial',
            'Desescaló más de 10 disturbios a bordo de manera calmada y profesional, obteniendo un premio de reconocimiento de seguridad',
            'Logró estar en el 10% superior de calificaciones de tripulación en encuestas trimestrales de satisfacción de pasajeros',
          ],
        },
      ],
      education: [
        { institution: 'Florida International University', degree: 'Licenciatura en Artes', field: 'Gestión de Hospitalidad y Turismo', startDate: '2016-08', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'Certificado FAA de Competencia Demostrada', issuer: 'Federal Aviation Administration', date: '2020-08' },
        { name: 'RCP y Primeros Auxilios', issuer: 'American Red Cross', date: '2023-02' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un currículum de asistente de vuelo?', answer: 'Destaque capacitación en seguridad, habilidades de atención al cliente, habilidades de idiomas, experiencia a bordo y premios o reconocimientos. Las aerolíneas valoran la adaptabilidad y el profesionalismo.' },
      { question: '¿Cómo escribo un currículum de asistente de vuelo sin experiencia?', answer: 'Enfóquese en roles de atención al público (retail, hospitalidad), habilidades de idiomas, certificaciones de RCP/primeros auxilios y cualidades personales como adaptabilidad, trabajo en equipo y porte.' },
      { question: '¿Las aerolíneas valoran los idiomas en un currículum de asistente de vuelo?', answer: 'Absolutamente. Los candidatos multilingües son altamente buscados, especialmente para rutas internacionales. Liste cada idioma con nivel de competencia de manera prominente.' },
    ],
  },

  'forklift-operator': {
    slug: 'operador-de-montacargas',
    title: 'Operador de Montacargas',
    keywords: ['ejemplo de currículum de operador de montacargas', 'currículum de operador de montacargas de almacén', 'plantilla de currículum de operador de montacargas', 'CV de operador de montacargas certificado'],
    searchIntents: ['ejemplo de currículum de operador de montacargas', 'cómo escribir un currículum de operador de montacargas', 'currículum de montacargas sin experiencia'],
    topSkills: ['Operación de Montacargas (Sentado, Parado, de Alcance)', 'Seguridad de Almacén', 'Carga y Descarga', 'Gestión de Inventario', 'Operación de Escáner RF', 'Cumplimiento OSHA', 'Selección de Pedidos', 'Apilado de Tarimas', 'Inspección de Equipos Pre-turno', 'Colaboración en Equipo'],
    atsKeywords: ['operación de montacargas', 'almacén', 'carga y descarga', 'OSHA', 'gestión de inventario', 'escáner RF', 'selección de pedidos', 'patín hidráulico', 'envío y recepción', 'cumplimiento de seguridad', 'manejo de materiales', 'montacargas de alcance', 'montacargas de asiento'],
    sampleResumeData: buildResumeData({
      firstName: 'Terrence',
      lastName: 'Hayes',
      profession: 'Operador de Montacargas',
      summary: 'Operador de montacargas certificado OSHA con 4 años de experiencia en ambientes de almacén de alto volumen. Competente en operación de montacargas sentado, parado y de alcance con historial libre de accidentes y fuerte compromiso con la seguridad.',
      skills: ['Operación de Montacargas', 'Seguridad de Almacén', 'Carga y Descarga', 'Gestión de Inventario', 'Operación de Escáner RF', 'Cumplimiento OSHA', 'Selección de Pedidos', 'Apilado de Tarimas', 'Inspección de Equipos', 'Colaboración en Equipo'],
      experience: [
        {
          title: 'Operador de Montacargas',
          company: 'Amazon Fulfillment Center',
          startDate: '2022-05',
          isCurrent: true,
          achievements: [
            'Opera montacargas de asiento y de alcance para mover más de 300 tarimas por turno en un centro de distribución de 500,000 pies cuadrados',
            'Mantiene un historial de seguridad de cero incidentes durante más de 2 años, cumpliendo con todos los protocolos de seguridad OSHA y de la empresa',
            'Carga y descarga 10-15 tráileres diarios, asegurando la distribución adecuada de peso y aseguramiento de carga',
          ],
        },
        {
          title: 'Asociado de Almacén / Operador de Montacargas',
          company: 'Sysco Foods',
          startDate: '2020-07',
          endDate: '2022-04',
          achievements: [
            'Seleccionó y preparó pedidos usando escáneres RF con una precisión del 99.7% en zonas secas, refrigeradas y congeladas',
            'Realizó inspecciones diarias de montacargas pre-turno y reportó necesidades de mantenimiento, manteniendo la disponibilidad de equipos al 98%',
            'Asistió en conteos de inventario físico trimestrales, reconciliando discrepancias para más de 5,000 SKUs',
          ],
        },
      ],
      education: [
        { institution: 'Memphis Job Corps Center', degree: 'Certificado', field: 'Operaciones de Almacén y Logística', startDate: '2019-09', endDate: '2020-06' },
      ],
      certifications: [
        { name: 'Certificación de Montacargas OSHA', issuer: 'OSHA', date: '2020-07' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un operador de montacargas en su currículum?', answer: 'Liste los tipos de montacargas operados (sentado, de alcance, selector de pedidos), certificaciones, tarimas movidas por turno, historial de seguridad y sistemas de almacén utilizados (WMS, escáner RF).' },
      { question: '¿Es obligatoria la certificación OSHA para montacargas?', answer: 'Sí, OSHA requiere que todos los operadores de montacargas estén capacitados y certificados. Esta certificación debe renovarse cada tres años y siempre debe aparecer en su currículum.' },
      { question: '¿Cómo escribo un currículum de operador de montacargas sin experiencia?', answer: 'Obtenga su certificación de montacargas OSHA, luego destaque habilidades de almacén, capacidades físicas, conciencia de seguridad y cualquier experiencia relacionada con trabajo manual.' },
    ],
  },

  'front-desk-agent': {
    slug: 'agente-de-recepcion',
    title: 'Agente de Recepción',
    keywords: ['ejemplo de currículum de agente de recepción', 'plantilla de currículum de recepción de hotel', 'currículum de recepcionista de front desk', 'ejemplo de CV de agente de servicios al huésped'],
    searchIntents: ['ejemplo de currículum de agente de recepción', 'cómo escribir un currículum de recepción', 'consejos para currículum de agente de recepción de hotel'],
    topSkills: ['Check-In y Check-Out de Huéspedes', 'Sistemas de Reservaciones (Opera, Fosse)', 'Atención al Cliente', 'Manejo de Efectivo y Tarjetas de Crédito', 'Resolución de Problemas', 'Etiqueta Telefónica', 'Venta de Habitaciones y Paquetes', 'Multitarea', 'Captura de Datos', 'Comunicación Bilingüe'],
    atsKeywords: ['recepción', 'servicios al huésped', 'check-in', 'check-out', 'sistema de reservaciones', 'Opera PMS', 'atención al cliente', 'manejo de efectivo', 'venta adicional', 'hospitalidad', 'etiqueta telefónica', 'funciones de concierge', 'auditoría nocturna'],
    sampleResumeData: buildResumeData({
      firstName: 'Isabelle',
      lastName: 'Cooper',
      profession: 'Agente de Recepción',
      summary: 'Agente de recepción amable con más de 3 años de experiencia en servicios al huésped en hoteles. Experta en gestión de reservaciones, ventas adicionales y entrega de experiencias de check-in/check-out impecables en ambientes de hospitalidad de ritmo acelerado.',
      skills: ['Check-In y Check-Out de Huéspedes', 'Opera PMS', 'Atención al Cliente', 'Manejo de Efectivo y Tarjetas de Crédito', 'Resolución de Problemas', 'Etiqueta Telefónica', 'Venta Adicional', 'Multitarea', 'Captura de Datos', 'Bilingüe (Inglés/Español)'],
      experience: [
        {
          title: 'Agente de Recepción',
          company: 'Hyatt Regency',
          startDate: '2022-09',
          isCurrent: true,
          achievements: [
            'Procesa más de 80 check-ins y check-outs de huéspedes diarios usando Opera PMS, manteniendo un tiempo de espera promedio menor a 3 minutos',
            'Vende upgrades de habitación y paquetes del resort, generando $5K adicionales mensuales en ingresos complementarios',
            'Resuelve quejas de huéspedes de manera oportuna, logrando una puntuación de satisfacción de 4.7/5 en encuestas post-estancia',
          ],
        },
        {
          title: 'Asociada de Recepción',
          company: 'Holiday Inn Express',
          startDate: '2021-01',
          endDate: '2022-08',
          achievements: [
            'Gestionó reservaciones, walk-ins y consultas telefónicas para una propiedad de 150 habitaciones con una ocupación promedio de más del 85%',
            'Realizó procedimientos de auditoría nocturna incluyendo conciliación de cajas, registro de cargos y generación de reportes',
            'Capacitó a 4 nuevos asociados de recepción en operaciones de PMS, estándares de marca y protocolos de interacción con huéspedes',
          ],
        },
      ],
      education: [
        { institution: 'Miami Dade College', degree: 'Asociado en Ciencias', field: 'Gestión de Hospitalidad y Turismo', startDate: '2019-08', endDate: '2021-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe poner un agente de recepción en su currículum?', answer: 'Incluya experiencia con software PMS, volumen de huéspedes atendidos, puntuaciones de satisfacción, resultados de ventas adicionales y habilidades de idiomas. Mencione experiencia en auditoría nocturna si aplica.' },
      { question: '¿Cómo describo los deberes de recepción en un currículum?', answer: 'Use verbos de acción y números: "Procesó más de 80 check-ins diarios", "Logró puntuación de satisfacción de 4.7/5", "Generó $5K mensuales en ingresos por ventas adicionales."' },
      { question: '¿Los agentes de recepción necesitan experiencia hotelera?', answer: 'No siempre. La experiencia en atención al cliente en retail, restaurantes o centros de llamadas es transferible. La familiaridad con software PMS es un plus pero puede aprenderse en el trabajo.' },
    ],
  },

  'bilingual-teacher': {
    slug: 'maestro-bilingue',
    title: 'Maestro Bilingüe',
    keywords: ['ejemplo de currículum de maestro bilingüe', 'plantilla de currículum de educación bilingüe', 'currículum de maestro de doble lengua', 'CV de maestro bilingüe español'],
    searchIntents: ['ejemplo de currículum de maestro bilingüe', 'cómo escribir un currículum de maestro bilingüe', 'consejos para currículum de maestro de doble lengua'],
    topSkills: ['Instrucción Bilingüe (Inglés/Español)', 'Diseño Curricular de Doble Lengua', 'Instrucción Diferenciada', 'Gestión de Aula', 'Enseñanza Culturalmente Receptiva', 'Evaluación y Seguimiento del Progreso', 'Comunicación con Padres', 'Estrategias para ELL', 'Planificación de Lecciones', 'Alineación con Estándares Estatales'],
    atsKeywords: ['educación bilingüe', 'doble lengua', 'ESL', 'ELL', 'instrucción en español', 'diseño curricular', 'instrucción diferenciada', 'gestión de aula', 'planificación de lecciones', 'estándares estatales', 'receptividad cultural', 'evaluación', 'participación de padres', 'competencia lingüística'],
    sampleResumeData: buildResumeData({
      firstName: 'Carmen',
      lastName: 'Delgado',
      profession: 'Maestra Bilingüe',
      summary: 'Maestra bilingüe certificada con 6 años de experiencia impartiendo instrucción de doble lengua en inglés y español a estudiantes de K-5. Apasionada por la pedagogía culturalmente receptiva y cerrar las brechas de rendimiento para estudiantes aprendices de inglés.',
      skills: ['Instrucción Bilingüe', 'Diseño Curricular de Doble Lengua', 'Instrucción Diferenciada', 'Gestión de Aula', 'Enseñanza Culturalmente Receptiva', 'Evaluación y Seguimiento del Progreso', 'Comunicación con Padres', 'Estrategias para ELL', 'Planificación de Lecciones', 'Alineación con Estándares Estatales'],
      experience: [
        {
          title: 'Maestra Bilingüe (Grado 3)',
          company: 'Dallas Independent School District',
          startDate: '2021-08',
          isCurrent: true,
          achievements: [
            'Imparte instrucción de contenido en inglés y español a una clase de 24 estudiantes en un programa de doble lengua 50/50',
            'Aumentó la competencia lectora de los estudiantes en un 28% medido por evaluaciones TELPAS y STAAR',
            'Diseña unidades temáticas interdisciplinarias que integran objetivos de lenguaje con contenido de matemáticas, ciencias y estudios sociales',
          ],
        },
        {
          title: 'Maestra Bilingüe (Grado 1)',
          company: 'Houston ISD',
          startDate: '2018-08',
          endDate: '2021-06',
          achievements: [
            'Enseñó alfabetización y numeración fundamentales en ambos idiomas a una clase de 22 estudiantes, 90% clasificados como ELL',
            'Facilitó talleres para padres en español para aumentar la participación familiar, logrando una asistencia del 85% en conferencias',
            'Colaboró con la coordinadora de ESL del campus para desarrollar planes de intervención para estudiantes por debajo de los niveles de referencia',
          ],
        },
      ],
      education: [
        { institution: 'University of Texas at San Antonio', degree: 'Licenciatura en Ciencias', field: 'Educación Bilingüe', startDate: '2014-08', endDate: '2018-05' },
      ],
      certifications: [
        { name: 'Certificación de Educación Bilingüe de Texas (EC-6)', issuer: 'Texas Education Agency', date: '2018-07' },
        { name: 'Certificación Suplementaria de ESL', issuer: 'Texas Education Agency', date: '2019-03' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un maestro bilingüe en su currículum?', answer: 'Destaque sus certificaciones de idiomas, experiencia en programas de doble lengua, datos de crecimiento estudiantil (TELPAS, STAAR) y estrategias de enseñanza culturalmente receptiva.' },
      { question: '¿Los maestros bilingües necesitan una certificación especial?', answer: 'Sí, la mayoría de los estados requieren una certificación en educación bilingüe o ESL además de la licencia de enseñanza estándar. Verifique los requisitos específicos de su estado.' },
      { question: '¿Cómo muestro resultados de estudiantes en un currículum de maestro bilingüe?', answer: 'Haga referencia a mejoras en puntuaciones de exámenes estandarizados, avances en niveles de lectura, avances en competencia TELPAS y tasas de reclasificación de ELL a competente en inglés.' },
    ],
  },

  'english-teacher': {
    slug: 'profesor-de-ingles',
    title: 'Profesor de Inglés',
    keywords: ['ejemplo de currículum de profesor de inglés', 'currículum de profesor de inglés de preparatoria', 'plantilla de currículum de profesor de inglés', 'ejemplo de currículum de profesor de ELA'],
    searchIntents: ['ejemplo de currículum de profesor de inglés', 'cómo escribir un currículum de profesor de inglés', 'consejos para currículum de profesor de artes del lenguaje inglés'],
    topSkills: ['Desarrollo Curricular', 'Planificación de Lecciones', 'Instrucción de Análisis Literario', 'Facilitación de Taller de Escritura', 'Gestión de Aula', 'Instrucción Diferenciada', 'Evaluación Formativa y Sumativa', 'Integración de Tecnología (Google Classroom)', 'Mentoría Estudiantil', 'Preparación para AP English'],
    atsKeywords: ['artes del lenguaje inglés', 'ELA', 'desarrollo curricular', 'planificación de lecciones', 'análisis literario', 'instrucción de escritura', 'gestión de aula', 'instrucción diferenciada', 'evaluación', 'AP English', 'Common Core', 'Google Classroom', 'participación estudiantil', 'comprensión lectora'],
    sampleResumeData: buildResumeData({
      firstName: 'Sarah',
      lastName: 'Mitchell',
      profession: 'Profesora de Inglés',
      summary: 'Profesora de inglés apasionada con 7 años de experiencia enseñando ELA a grados 9-12. Experta en diseño curricular, instrucción de taller de escritura y fomento del amor por la literatura a través de métodos de enseñanza centrados en el estudiante.',
      skills: ['Desarrollo Curricular', 'Planificación de Lecciones', 'Instrucción de Análisis Literario', 'Facilitación de Taller de Escritura', 'Gestión de Aula', 'Instrucción Diferenciada', 'Evaluación Formativa y Sumativa', 'Google Classroom', 'Mentoría Estudiantil', 'Preparación para AP English'],
      experience: [
        {
          title: 'Profesora de Inglés (Grados 10-12)',
          company: 'Lincoln High School',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Enseña 5 secciones de inglés incluyendo AP Language & Composition, con una tasa de aprobación del examen AP del 88%',
            'Diseñó una rúbrica de escritura adoptada por el departamento de inglés a nivel escolar, mejorando la consistencia de calificación entre 12 profesores',
            'Asesora la revista literaria escolar y el club de oratoria y debate, llevando al equipo de debate a las semifinales estatales',
          ],
        },
        {
          title: 'Profesora de Inglés (Grados 9-10)',
          company: 'Westside Preparatory Academy',
          startDate: '2017-08',
          endDate: '2020-06',
          achievements: [
            'Enseñó Inglés 9 e Inglés 10 a más de 130 estudiantes por año, logrando un aumento del 15% en puntuaciones estandarizadas de lectura',
            'Implementó un modelo de taller de lectura con novelas de elección independiente que aumentó el volumen de lectura estudiantil en un 60%',
            'Colaboró con el equipo de educación especial para co-enseñar clases inclusivas de ELA, apoyando a más de 20 estudiantes con IEP',
          ],
        },
      ],
      education: [
        { institution: 'University of Illinois at Urbana-Champaign', degree: 'Maestría en Educación', field: 'Currículo e Instrucción', startDate: '2019-06', endDate: '2021-05' },
        { institution: 'University of Michigan', degree: 'Licenciatura en Artes', field: 'Inglés', startDate: '2013-09', endDate: '2017-05' },
      ],
      certifications: [
        { name: 'Licencia de Educador Profesional de Illinois (ELA 9-12)', issuer: 'ISBE', date: '2017-08' },
        { name: 'Certificado en AP English Language & Composition', issuer: 'College Board', date: '2020-07' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe poner un profesor de inglés en su currículum?', answer: 'Incluya niveles de grado y cursos impartidos, datos de rendimiento estudiantil, iniciativas curriculares, participación extracurricular y certificaciones relevantes como la acreditación AP.' },
      { question: '¿Cómo muestran los profesores de inglés el crecimiento estudiantil en su currículum?', answer: 'Haga referencia a mejoras en puntuaciones de exámenes estandarizados, tasas de aprobación AP, avances en niveles de lectura y puntos de referencia de competencia en escritura. Use porcentajes específicos cuando sea posible.' },
      { question: '¿Es importante una maestría para un currículum de profesor de inglés?', answer: 'Una maestría es valorada y a menudo conduce a escalas salariales más altas. Es requerida para la licencia permanente en muchos estados.' },
    ],
  },

  'esl-teacher': {
    slug: 'profesor-de-ingles-como-segunda-lengua',
    title: 'Profesor de ESL',
    keywords: ['ejemplo de currículum de profesor de ESL', 'plantilla de currículum de profesor de ESL', 'ejemplo de currículum de profesor TESOL', 'CV de profesor de inglés como segunda lengua'],
    searchIntents: ['ejemplo de currículum de profesor de ESL', 'cómo escribir un currículum de profesor de ESL', 'currículum de profesor de ESL para el extranjero'],
    topSkills: ['Metodología TESOL / TEFL', 'Planificación de Lecciones para ELLs', 'Evaluación de Competencia Lingüística', 'Instrucción Diferenciada', 'Gestión de Aula', 'Adaptación Curricular', 'Sensibilidad Cultural', 'Instrucción en Grupos Pequeños', 'Tecnología en Aprendizaje de Idiomas', 'Participación de Padres y Comunidad'],
    atsKeywords: ['ESL', 'ELL', 'TESOL', 'TEFL', 'aprendices de inglés', 'competencia lingüística', 'WIDA', 'TELPAS', 'instrucción diferenciada', 'planificación de lecciones', 'adaptación curricular', 'gestión de aula', 'instrucción protegida', 'modelo SIOP'],
    sampleResumeData: buildResumeData({
      firstName: 'Mei',
      lastName: 'Tanaka',
      profession: 'Profesora de ESL',
      summary: 'Profesora de ESL certificada en TESOL con 5 años de experiencia enseñando inglés a poblaciones diversas de estudiantes adultos y K-12. Experta en enseñanza comunicativa del idioma, estándares WIDA e instrucción diferenciada para aulas multilingües.',
      skills: ['Metodología TESOL', 'Planificación de Lecciones para ELLs', 'Evaluación de Competencia Lingüística', 'Instrucción Diferenciada', 'Gestión de Aula', 'Adaptación Curricular', 'Sensibilidad Cultural', 'Instrucción en Grupos Pequeños', 'Integración de EdTech', 'Participación de Padres y Comunidad'],
      experience: [
        {
          title: 'Profesora de ESL (Grados K-5)',
          company: 'Chicago Public Schools',
          startDate: '2022-08',
          isCurrent: true,
          achievements: [
            'Brinda instrucción de ESL de apoyo dentro y fuera del aula a más de 60 aprendices de inglés en 5 niveles de grado, representando 12 idiomas maternos',
            'Aumentó las puntuaciones de WIDA ACCESS en un promedio de 1.2 niveles de competencia entre todos los estudiantes en un año académico',
            'Desarrolla planes de lecciones culturalmente receptivos que integran los idiomas de herencia de los estudiantes para acelerar la adquisición del inglés',
          ],
        },
        {
          title: 'Instructora de ESL',
          company: 'Berlitz Language Center',
          startDate: '2019-09',
          endDate: '2022-06',
          achievements: [
            'Enseñó más de 20 clases semanales para estudiantes adultos de nivel principiante a avanzado, logrando una retención estudiantil del 90%',
            'Creó materiales originales y evaluaciones alineadas con los niveles de competencia CEFR (A1-C1)',
            'Facilitó clubes de conversación y talleres de pronunciación que mejoraron las puntuaciones de confianza oral de los estudiantes en un 35%',
          ],
        },
      ],
      education: [
        { institution: 'University of Southern California', degree: 'Maestría en Artes', field: 'Enseñanza del Inglés a Hablantes de Otros Idiomas (TESOL)', startDate: '2017-08', endDate: '2019-05' },
        { institution: 'University of Washington', degree: 'Licenciatura en Artes', field: 'Lingüística', startDate: '2013-09', endDate: '2017-06' },
      ],
      certifications: [
        { name: 'Acreditación de ESL de Illinois', issuer: 'ISBE', date: '2022-08' },
        { name: 'CELTA', issuer: 'Cambridge University Press & Assessment', date: '2019-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones necesitan los profesores de ESL?', answer: 'La certificación TESOL/TEFL es estándar. Para escuelas públicas, generalmente se requiere una acreditación estatal de ESL. CELTA de Cambridge es valorada para entornos de educación internacional y para adultos.' },
      { question: '¿Cómo debe mostrar un profesor de ESL el progreso estudiantil?', answer: 'Haga referencia a mejoras en WIDA ACCESS, TELPAS o niveles CEFR. Incluya tasas de reclasificación y cualquier métrica de retención o satisfacción estudiantil.' },
      { question: '¿Debo listar los idiomas que hablo en un currículum de profesor de ESL?', answer: 'Sí, listar sus habilidades lingüísticas demuestra competencia cultural y la capacidad de apoyar a estudiantes que comparten esos idiomas.' },
    ],
  },

  'history-teacher': {
    slug: 'profesor-de-historia',
    title: 'Profesor de Historia',
    keywords: ['ejemplo de currículum de profesor de historia', 'plantilla de currículum de profesor de estudios sociales', 'currículum de profesor de historia de preparatoria', 'ejemplo de CV de profesor de AP History'],
    searchIntents: ['ejemplo de currículum de profesor de historia', 'cómo escribir un currículum de profesor de historia', 'consejos para currículum de profesor de estudios sociales'],
    topSkills: ['Instrucción de Historia de EE.UU. y Mundial', 'Desarrollo Curricular', 'Análisis de Fuentes Primarias', 'Seminarios Socráticos', 'Gestión de Aula', 'Diseño de Evaluaciones', 'Instrucción Diferenciada', 'Integración de Tecnología', 'Preparación para AP History', 'Estrategias de Participación Estudiantil'],
    atsKeywords: ['profesor de historia', 'estudios sociales', 'historia de EE.UU.', 'historia mundial', 'desarrollo curricular', 'análisis de fuentes primarias', 'AP History', 'planificación de lecciones', 'evaluación', 'instrucción diferenciada', 'gestión de aula', 'Common Core', 'educación cívica', 'escritura DBQ'],
    sampleResumeData: buildResumeData({
      firstName: 'James',
      lastName: 'Thornton',
      profession: 'Profesor de Historia',
      summary: 'Profesor de historia cautivante con 8 años de experiencia enseñando Historia de EE.UU., Historia Mundial y AP U.S. History a grados 9-12. Reconocido por dar vida a la historia a través del análisis de fuentes primarias, seminarios socráticos y aprendizaje basado en proyectos.',
      skills: ['Instrucción de Historia de EE.UU. y Mundial', 'Desarrollo Curricular', 'Análisis de Fuentes Primarias', 'Seminarios Socráticos', 'Gestión de Aula', 'Diseño de Evaluaciones', 'Instrucción Diferenciada', 'Integración de Tecnología', 'Preparación para AP History', 'Participación Estudiantil'],
      experience: [
        {
          title: 'Profesor de Historia / Jefe de Departamento',
          company: 'Jefferson High School',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Enseña 4 secciones de AP U.S. History y 1 sección de Historia Mundial, logrando una tasa de aprobación del examen AP del 92% (3+)',
            'Lidera un departamento de 8 profesores de estudios sociales, coordinando alineación curricular y sesiones de desarrollo profesional',
            'Desarrolló una unidad de aprendizaje basado en proyectos sobre derechos civiles que fue reconocida como modelo curricular del distrito',
          ],
        },
        {
          title: 'Profesor de Historia',
          company: 'Roosevelt Middle School',
          startDate: '2016-08',
          endDate: '2020-06',
          achievements: [
            'Enseñó Historia de EE.UU. y Civismo a más de 150 estudiantes de 8vo grado anualmente, con el 80% obteniendo puntuación competente o superior en evaluaciones estatales',
            'Integró Google Classroom y simulaciones interactivas para impulsar la participación estudiantil y la alfabetización digital',
            'Organizó una "Feria de Historia" anual donde los estudiantes presentaron proyectos de investigación original a la comunidad escolar',
          ],
        },
      ],
      education: [
        { institution: 'University of Virginia', degree: 'Maestría en Artes', field: 'Historia', startDate: '2018-06', endDate: '2020-05' },
        { institution: 'College of William & Mary', degree: 'Licenciatura en Artes', field: 'Historia y Educación Secundaria', startDate: '2012-08', endDate: '2016-05' },
      ],
      certifications: [
        { name: 'Licencia de Enseñanza de Virginia (Historia/Estudios Sociales 6-12)', issuer: 'VDOE', date: '2016-07' },
        { name: 'Certificado en AP U.S. History', issuer: 'College Board', date: '2020-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un profesor de historia en su currículum?', answer: 'Incluya cursos impartidos (AP, honores, general), datos de rendimiento estudiantil, liderazgo curricular, asesoría extracurricular y cualquier método de enseñanza innovador.' },
      { question: '¿Cómo demuestran los profesores de historia su impacto en un currículum?', answer: 'Haga referencia a tasas de aprobación AP, puntuaciones de exámenes estandarizados, resultados de proyectos estudiantiles y cualquier currículo que haya desarrollado y que fuera adoptado a nivel de departamento o distrito.' },
      { question: '¿Es importante la certificación AP para un currículum de profesor de historia?', answer: 'Sí, la certificación AP del College Board demuestra que está calificado para enseñar cursos avanzados y es un diferenciador significativo para posiciones competitivas.' },
    ],
  },

  'beauty-therapist': {
    slug: 'terapeuta-de-belleza',
    title: 'Terapeuta de Belleza',
    keywords: ['ejemplo de currículum de terapeuta de belleza', 'ejemplo de currículum de terapeuta de belleza', 'plantilla de currículum de terapeuta de belleza'],
    searchIntents: ['ejemplo', 'plantilla'],
    topSkills: ['Tratamientos Faciales', 'Depilación con Cera', 'Análisis de Piel', 'Microdermoabrasión', 'Peelings Químicos', 'Consulta con Clientes', 'Ventas de Productos', 'Protocolos de Higiene', 'Extensiones de Pestañas', 'Aromaterapia'],
    atsKeywords: ['terapia de belleza', 'esteticista', 'cuidado de la piel', 'tratamientos faciales', 'retención de clientes', 'higiene', 'conocimiento de productos', 'depilación con cera', 'anti-envejecimiento', 'consulta', 'venta adicional', 'CIDESCO', 'gestión de salón'],
    sampleResumeData: buildResumeData({
      firstName: 'Mia',
      lastName: 'Torres',
      profession: 'Terapeuta de Belleza',
      summary: 'Terapeuta de belleza con licencia y más de 6 años de experiencia brindando tratamientos faciales, terapias corporales y cuidado avanzado de la piel en ambientes de spa de alta gama. Superó consistentemente las metas de ventas de productos en un 30% manteniendo una tasa de retención de clientes del 95%.',
      skills: ['Tratamientos Faciales', 'Peelings Químicos', 'Microdermoabrasión', 'Depilación con Cera', 'Extensiones de Pestañas', 'Análisis de Piel', 'Ventas de Productos', 'Consulta con Clientes'],
      experience: [
        {
          title: 'Terapeuta de Belleza Senior',
          company: 'Serenity Day Spa',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Realiza más de 25 tratamientos por semana incluyendo faciales, peelings y envolturas corporales con una calificación de satisfacción del cliente de 4.9/5',
            'Aumentó las ventas de productos al por menor en un 35% mediante recomendaciones personalizadas de cuidado de la piel',
            'Capacitó a 4 terapeutas junior en técnicas faciales avanzadas y protocolos de higiene',
          ],
        },
        {
          title: 'Terapeuta de Belleza',
          company: 'Glow Aesthetics Clinic',
          startDate: '2018-06',
          endDate: '2021-02',
          achievements: [
            'Construyó una cartera personal de más de 150 clientes recurrentes en 18 meses',
            'Introdujo servicios de microdermoabrasión que generaron $45K en ingresos anuales',
            'Mantuvo el 100% de cumplimiento con las regulaciones estatales de salud y seguridad',
          ],
        },
      ],
      education: [
        { institution: 'Aveda Institute', degree: 'Diploma', field: 'Estética', startDate: '2017-01', endDate: '2018-05' },
      ],
      certifications: [
        { name: 'Esteticista con Licencia', issuer: 'State Board of Cosmetology', date: '2018-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué habilidades debe destacar un terapeuta de belleza en su currículum?', answer: 'Enfóquese en tratamientos faciales, análisis de piel, conocimiento de productos, consulta con clientes y cualquier certificación avanzada como peelings químicos o microdermoabrasión.' },
      { question: '¿Cómo hago que mi currículum de terapeuta de belleza destaque?', answer: 'Incluya métricas específicas como tasas de retención de clientes, rendimiento de ventas de productos y la cantidad de tratamientos realizados semanalmente. Las certificaciones y capacitación especializada también ayudan.' },
      { question: '¿Qué certificaciones son valiosas para terapeutas de belleza?', answer: 'Las certificaciones clave incluyen licencia estatal de estética, diploma CIDESCO y capacitación especializada en peelings químicos, microagujas o tratamientos láser.' },
    ],
  },

  'curriculum-developer': {
    slug: 'desarrollador-de-curriculo',
    title: 'Desarrollador de Currículo',
    keywords: ['ejemplo de currículum de desarrollador de currículo', 'ejemplo de currículum de desarrollador de currículo', 'plantilla de currículum de desarrollador de currículo'],
    searchIntents: ['ejemplo', 'plantilla'],
    topSkills: ['Diseño Curricular', 'Diseño Instruccional', 'Sistemas de Gestión de Aprendizaje', 'Alineación con Estándares', 'Desarrollo de Evaluaciones', 'Diseño Inverso', 'Instrucción Diferenciada', 'Tecnología Educativa', 'Instrucción Basada en Datos', 'Colaboración con Stakeholders'],
    atsKeywords: ['desarrollo curricular', 'diseño instruccional', 'objetivos de aprendizaje', 'alineación con estándares', 'evaluación', 'LMS', 'diseño inverso', 'K-12', 'educación superior', 'desarrollo profesional', 'tecnología educativa', 'alcance y secuencia', 'diferenciación'],
    sampleResumeData: buildResumeData({
      firstName: 'David',
      lastName: 'Nguyen',
      profession: 'Desarrollador de Currículo',
      summary: 'Desarrollador de currículo con 8 años de experiencia diseñando programas de capacitación K-12 y corporativos alineados a estándares estatales y nacionales. Lideró el rediseño de un currículo STEM a nivel de distrito adoptado por 45 escuelas, mejorando las puntuaciones de evaluación estudiantil en un 18%.',
      skills: ['Diseño Curricular', 'Diseño Instruccional', 'Alineación con Estándares', 'Administración de LMS', 'Desarrollo de Evaluaciones', 'Diseño Inverso', 'Análisis de Datos', 'Colaboración con Stakeholders'],
      experience: [
        {
          title: 'Desarrollador de Currículo Senior',
          company: 'Bright Horizons Education',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Diseñó e implementó un currículo STEM K-8 adoptado en 45 escuelas que atienden a 28,000 estudiantes',
            'Mejoró las puntuaciones de exámenes estandarizados en un 18% a través de revisiones curriculares basadas en datos',
            'Lideró un equipo de 6 redactores de currículo para producir más de 200 planes de lecciones por año académico',
          ],
        },
        {
          title: 'Especialista en Currículo',
          company: 'Lakewood Unified School District',
          startDate: '2016-09',
          endDate: '2020-07',
          achievements: [
            'Alineó los currículos de ELA y matemáticas con los estándares Common Core en 12 escuelas primarias',
            'Creó talleres de desarrollo profesional con asistencia de más de 150 maestros anualmente',
            'Redujo los costos de desarrollo curricular en un 25% mediante la integración de recursos educativos abiertos',
          ],
        },
      ],
      education: [
        { institution: 'University of Virginia', degree: 'Maestría en Educación', field: 'Currículo e Instrucción', startDate: '2014-09', endDate: '2016-05' },
      ],
      certifications: [
        { name: 'Diseñador Instruccional Certificado', issuer: 'ATD', date: '2019-03' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un currículum de desarrollador de currículo?', answer: 'Destaque la experiencia en diseño curricular, experiencia en alineación con estándares, dominio de sistemas de gestión de aprendizaje y resultados medibles como mejoras en puntuaciones de exámenes o tasas de adopción.' },
      { question: '¿Qué calificaciones necesitan los desarrolladores de currículo?', answer: 'La mayoría de los puestos requieren una maestría en educación o diseño instruccional, más experiencia en desarrollo curricular. Las certificaciones de ATD o ISTE son adiciones valiosas.' },
      { question: '¿Cómo cuantifico los logros de desarrollo curricular?', answer: 'Incluya métricas como el número de escuelas o estudiantes atendidos, mejoras porcentuales en puntuaciones de evaluación, volumen de materiales producidos y tasas de participación en capacitaciones.' },
    ],
  },
};
