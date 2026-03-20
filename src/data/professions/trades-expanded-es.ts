import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  'plumber': {
    slug: 'plomero',
    title: 'Plomero',
    keywords: ['currículum de plomero', 'currículum de plomería', 'currículum de plomero oficial', 'CV de plomero'],
    searchIntents: ['ejemplo de currículum de plomero', 'cómo hacer un currículum de plomero', 'plantilla de currículum de plomería'],
    topSkills: ['Instalación y Reparación de Tuberías', 'Detección de Fugas', 'Sistemas de Calentadores de Agua', 'Limpieza de Drenajes', 'Lectura de Planos', 'Soldadura y Braseo', 'Prevención de Reflujo', 'Cumplimiento de Códigos', 'Instalación de Líneas de Gas', 'Servicio al Cliente'],
    atsKeywords: ['sistemas de plomería', 'instalación de calentadores de agua', 'ajuste de tuberías', 'limpieza de drenajes', 'prevención de reflujo', 'soldadura', 'cumplimiento de códigos', 'detección de fugas', 'líneas de gas', 'plomería residencial', 'plomería comercial'],
    sampleResumeData: buildResumeData({
      firstName: 'Derek',
      lastName: 'Sullivan',
      profession: 'Plomero',
      summary: 'Plomero oficial licenciado con más de 8 años de experiencia en plomería residencial y comercial. Completó más de 1,200 llamadas de servicio con un índice de satisfacción del cliente del 98%. Hábil en instalaciones de construcción nueva, instalación de accesorios y reparaciones complejas de líneas de drenaje.',
      skills: ['Instalación y Reparación de Tuberías', 'Detección de Fugas', 'Sistemas de Calentadores de Agua', 'Limpieza de Drenajes', 'Lectura de Planos', 'Soldadura y Braseo', 'Prevención de Reflujo', 'Cumplimiento de Códigos', 'Instalación de Líneas de Gas', 'Servicio al Cliente'],
      experience: [
        {
          title: 'Plomero Oficial',
          company: 'Roto-Rooter',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Completa un promedio de 8 llamadas de servicio residenciales y comerciales por día, manteniendo una tasa de resolución en primera visita del 98%',
            'Instaló más de 150 calentadores de agua sin tanque en el último año, generando $420K en ingresos para la sucursal',
            'Redujo la tasa de rellamadas en un 22% implementando una lista de verificación de calidad previa a la salida para todos los técnicos del equipo',
          ],
        },
        {
          title: 'Aprendiz de Plomero',
          company: 'ARS/Rescue Rooter',
          startDate: '2017-06',
          endDate: '2020-12',
          achievements: [
            'Asistió en la instalación de sistemas de plomería para más de 35 proyectos residenciales de construcción nueva',
            'Realizó limpieza de drenajes e inspecciones con cámara en más de 600 llamadas de servicio anualmente',
            'Obtuvo la licencia de Plomero Oficial en 3.5 años, 6 meses antes del plazo estándar del aprendizaje',
          ],
        },
      ],
      education: [
        { institution: 'Tulsa Welding School & Technology Center', degree: 'Diploma', field: 'Tecnología en Plomería', startDate: '2016-01', endDate: '2017-05' },
      ],
      certifications: [
        { name: 'Licencia de Plomero Oficial', issuer: 'State of Texas', date: '2020-11' },
        { name: 'Certificación de Prevención de Reflujo', issuer: 'ASSE', date: '2021-03' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe incluir un plomero en su currículum?', answer: 'Incluya su licencia de Plomero Oficial o Maestro Plomero, certificación de prevención de reflujo, certificación de líneas de gas y cualquier licencia específica del estado. Estas demuestran cumplimiento con los códigos y regulaciones locales.' },
      { question: '¿Cómo destaco la experiencia en un currículum de plomería?', answer: 'Cuantifique su trabajo con métricas como llamadas de servicio por día, tasas de resolución en primera visita, ingresos generados por instalaciones y porcentajes de reducción de rellamadas.' },
      { question: '¿Debo incluir la experiencia de aprendizaje en mi currículum de plomero?', answer: 'Sí. El aprendizaje es fundamental en los oficios. Detalle los tipos de sistemas en los que trabajó, la cantidad de proyectos completados y cuándo obtuvo su licencia.' },
    ],
  },

  'welder': {
    slug: 'soldador',
    title: 'Soldador',
    keywords: ['currículum de soldador', 'currículum de soldadura', 'currículum de soldador certificado', 'CV de soldador'],
    searchIntents: ['ejemplo de currículum de soldador', 'cómo hacer un currículum de soldadura', 'plantilla de currículum de soldador certificado'],
    topSkills: ['Soldadura MIG', 'Soldadura TIG', 'Soldadura con Electrodo', 'Soldadura con Núcleo de Fundente', 'Lectura de Planos', 'Fabricación de Metal', 'Corte con Plasma', 'Soldadura Estructural', 'Inspección de Calidad', 'Cumplimiento de Seguridad OSHA'],
    atsKeywords: ['MIG', 'TIG', 'soldadura con electrodo', 'núcleo de fundente', 'lectura de planos', 'fabricación de metal', 'soldadura estructural', 'certificado AWS', 'corte con plasma', 'inspección de soldadura', 'OSHA', 'soldadura de tuberías'],
    sampleResumeData: buildResumeData({
      firstName: 'Travis',
      lastName: 'Kowalski',
      profession: 'Soldador',
      summary: 'Soldador certificado por AWS con más de 7 años de experiencia en soldadura estructural y de tuberías. Mantuvo una tasa de aprobación de soldadura del 99.5% en más de 3,000 juntas inspeccionadas. Competente en procesos MIG, TIG, electrodo y núcleo de fundente en acero al carbono, acero inoxidable y aluminio.',
      skills: ['Soldadura MIG', 'Soldadura TIG', 'Soldadura con Electrodo', 'Soldadura con Núcleo de Fundente', 'Lectura de Planos', 'Fabricación de Metal', 'Corte con Plasma', 'Soldadura Estructural', 'Inspección de Calidad', 'Cumplimiento de Seguridad OSHA'],
      experience: [
        {
          title: 'Soldador Estructural',
          company: 'Turner Construction',
          startDate: '2021-04',
          isCurrent: true,
          achievements: [
            'Suelda componentes de acero estructural para proyectos comerciales valuados en hasta $50M, manteniendo una tasa de aprobación de inspección visual y rayos X del 99.5%',
            'Capacitó a 5 soldadores junior en técnicas adecuadas de TIG, reduciendo las tasas de retrabajo del equipo en un 30%',
            'Completó 12 soldaduras de ruta crítica en un proyecto de edificio de gran altura antes de lo programado, ahorrando 4 días de tiempo de grúa',
          ],
        },
        {
          title: 'Soldador de Combinación',
          company: 'Bechtel Corporation',
          startDate: '2017-08',
          endDate: '2021-03',
          achievements: [
            'Realizó soldadura MIG, TIG y con electrodo en proyectos de tuberías y refinerías en 6 estados',
            'Logró una tasa de aceptación de soldadura en primer pase del 98.7% en más de 2,000 juntas inspeccionadas',
            'Mantuvo cero incidentes con tiempo perdido durante 3.5 años siguiendo estrictos protocolos de seguridad',
          ],
        },
      ],
      education: [
        { institution: 'Hobart Institute of Welding Technology', degree: 'Certificado', field: 'Tecnología en Soldadura', startDate: '2016-01', endDate: '2017-06' },
      ],
      certifications: [
        { name: 'Soldador Certificado AWS', issuer: 'American Welding Society', date: '2017-07' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2018-02' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones son más importantes para un currículum de soldador?', answer: 'Soldador Certificado AWS es el estándar de oro. También incluya certificaciones específicas de proceso (tubería 6G, estructural) y tarjetas de seguridad OSHA.' },
      { question: '¿Cómo debe un soldador cuantificar logros en su currículum?', answer: 'Use tasas de aprobación de soldadura, número de juntas inspeccionadas, valores de proyectos, porcentajes de reducción de retrabajo y registros de seguridad como cero incidentes con tiempo perdido.' },
      { question: '¿Debo listar los procesos de soldadura en mi currículum?', answer: 'Sí. Especifique cada proceso en el que está certificado (MIG, TIG, electrodo, núcleo de fundente) y los materiales con los que trabaja (acero al carbono, acero inoxidable, aluminio).' },
    ],
  },

  'mason': {
    slug: 'albanil',
    title: 'Albañil',
    keywords: ['currículum de albañil', 'currículum de mampostería', 'currículum de colocador de ladrillos', 'CV de albañil'],
    searchIntents: ['ejemplo de currículum de albañil', 'cómo hacer un currículum de mampostería', 'plantilla de currículum de albañil'],
    topSkills: ['Colocación de Ladrillos y Bloques', 'Mezcla de Mortero', 'Lectura de Planos', 'Mampostería de Piedra', 'Acabado de Concreto', 'Montaje de Andamios', 'Rejuntado', 'Trabajos de Restauración', 'Seguridad OSHA'],
    atsKeywords: ['colocación de ladrillos', 'colocación de bloques', 'mortero', 'mampostería de piedra', 'acabado de concreto', 'rejuntado', 'andamios', 'restauración', 'lectura de planos', 'mampostería comercial', 'OSHA'],
    sampleResumeData: buildResumeData({
      firstName: 'Marco',
      lastName: 'Vitale',
      profession: 'Albañil',
      summary: 'Albañil experimentado con más de 10 años en construcción comercial y residencial de ladrillo, bloque y piedra. Completó trabajos de mampostería en más de 80 proyectos incluyendo escuelas, hospitales y residencias de lujo. Hábil en restauración, rejuntado y trabajo decorativo en piedra.',
      skills: ['Colocación de Ladrillos y Bloques', 'Mezcla de Mortero', 'Lectura de Planos', 'Mampostería de Piedra', 'Acabado de Concreto', 'Montaje de Andamios', 'Rejuntado', 'Trabajos de Restauración', 'Seguridad OSHA', 'Liderazgo de Cuadrilla'],
      experience: [
        {
          title: 'Albañil Líder',
          company: 'Skanska USA',
          startDate: '2020-03',
          isCurrent: true,
          achievements: [
            'Lidera una cuadrilla de 8 albañiles en proyectos comerciales con un valor promedio de $12M, completando todos los alcances de mampostería a tiempo',
            'Colocó más de 3,500 ladrillos por día en un proyecto de ampliación de hospital, superando los objetivos de producción en un 18%',
            'Redujo el desperdicio de materiales en un 12% mediante técnicas mejoradas de dosificación de mortero y corte de ladrillos',
          ],
        },
        {
          title: 'Albañil Oficial',
          company: 'Clark Construction Group',
          startDate: '2014-06',
          endDate: '2020-02',
          achievements: [
            'Realizó instalación de ladrillos, bloques y piedra en más de 45 proyectos comerciales e institucionales',
            'Completó un proyecto de restauración de iglesia histórica 2 semanas antes de lo programado cumpliendo estrictos estándares de preservación',
            'Mantuvo un registro de cero deficiencias en 12 inspecciones de calidad consecutivas',
          ],
        },
      ],
      education: [
        { institution: 'International Masonry Institute', degree: 'Certificado', field: 'Tecnología en Mampostería', startDate: '2012-09', endDate: '2014-05' },
      ],
      certifications: [
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2015-01' },
        { name: 'Albañil Certificado MCAA', issuer: 'Mason Contractors Association of America', date: '2016-04' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe destacar un albañil en su currículum?', answer: 'Enfatice los tipos de mampostería en los que se especializa (ladrillo, bloque, piedra), la escala de los proyectos, las tasas de producción y cualquier registro de calidad o seguridad.' },
      { question: '¿Cómo muestro experiencia en mampostería sin educación formal?', answer: 'Liste la capacitación de aprendizaje, la experiencia en el trabajo y cualquier certificación sindical. Detalle la cantidad y tipos de proyectos que ha completado.' },
      { question: '¿Son importantes las certificaciones para un currículum de albañil?', answer: 'Sí. La certificación de seguridad OSHA es esperada, y la certificación MCAA o el estatus de oficial sindical demuestra habilidad verificada y profesionalismo.' },
    ],
  },

  'heavy-equipment-operator': {
    slug: 'operador-de-equipo-pesado',
    title: 'Operador de Equipo Pesado',
    keywords: ['currículum de operador de equipo pesado', 'currículum de operador de maquinaria', 'currículum de operador de grúa', 'CV de operador de equipo pesado'],
    searchIntents: ['ejemplo de currículum de operador de equipo pesado', 'cómo hacer un currículum de operador de maquinaria', 'plantilla de currículum de equipo pesado'],
    topSkills: ['Operación de Excavadora', 'Operación de Bulldozer', 'Operación de Grúa', 'Nivelación y Terracería', 'Control de Máquina GPS', 'Operación de Cargador', 'Mantenimiento Preventivo', 'Cumplimiento de Seguridad', 'Excavación de Zanjas', 'Preparación de Sitio'],
    atsKeywords: ['excavadora', 'bulldozer', 'grúa', 'nivelación', 'control de máquina GPS', 'cargador', 'retroexcavadora', 'mantenimiento preventivo', 'excavación de zanjas', 'preparación de sitio', 'OSHA', 'CDL'],
    sampleResumeData: buildResumeData({
      firstName: 'Brent',
      lastName: 'Hargrove',
      profession: 'Operador de Equipo Pesado',
      summary: 'Operador de equipo pesado certificado con más de 9 años de experiencia operando excavadoras, bulldozers, grúas y cargadores en proyectos de carreteras, comerciales y residenciales. Registró más de 8,000 horas de equipo con cero incidentes reportables.',
      skills: ['Operación de Excavadora', 'Operación de Bulldozer', 'Operación de Grúa', 'Nivelación y Terracería', 'Control de Máquina GPS', 'Operación de Cargador', 'Mantenimiento Preventivo', 'Cumplimiento de Seguridad', 'Excavación de Zanjas', 'Preparación de Sitio'],
      experience: [
        {
          title: 'Operador Senior de Equipo',
          company: 'Granite Construction',
          startDate: '2020-05',
          isCurrent: true,
          achievements: [
            'Opera excavadoras y bulldozers en proyectos de carreteras valuados en hasta $85M, cumpliendo consistentemente los objetivos diarios de yardaje',
            'Utilizó control de máquina GPS para lograr una precisión de nivelación final dentro de 0.05 ft, reduciendo el retrabajo en un 25%',
            'Registró más de 2,400 horas anuales con cero incidentes de daño al equipo mediante rigurosas inspecciones previas al turno',
          ],
        },
        {
          title: 'Operador de Equipo',
          company: 'Kiewit Corporation',
          startDate: '2015-08',
          endDate: '2020-04',
          achievements: [
            'Operó cargadores, retroexcavadoras y motoconformadoras en más de 20 proyectos comerciales y de infraestructura en 4 estados',
            'Completó la excavación para una cimentación de 12 pisos 3 días antes de lo programado, ahorrando $45K en costos de renta de grúa',
            'Realizó verificaciones diarias de mantenimiento preventivo, contribuyendo a una tasa de disponibilidad de equipo del 98% para la flota',
          ],
        },
      ],
      education: [
        { institution: 'Associated Training Services', degree: 'Certificado', field: 'Operación de Equipo Pesado', startDate: '2014-06', endDate: '2015-06' },
      ],
      certifications: [
        { name: 'Certificación de Operador de Grúa NCCCO', issuer: 'National Commission for the Certification of Crane Operators', date: '2018-03' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2016-01' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe incluir un operador de equipo pesado?', answer: 'La certificación de grúa NCCCO, CDL si aplica, tarjetas de seguridad OSHA y cualquier certificado de capacitación específica de fabricante son altamente valorados.' },
      { question: '¿Cómo cuantifico logros como operador de equipo?', answer: 'Incluya horas de equipo registradas, valores de proyectos, yardaje movido, tolerancias de precisión de nivelación, porcentajes de disponibilidad y registros de seguridad.' },
      { question: '¿Debo listar cada tipo de equipo que puedo operar?', answer: 'Sí. Cree una sección dedicada de habilidades listando cada tipo de máquina (excavadora, bulldozer, cargador, grúa, etc.) ya que los empleadores frecuentemente buscan experiencia con equipos específicos.' },
    ],
  },

  'hvac-technician': {
    slug: 'tecnico-de-hvac',
    title: 'Técnico de HVAC',
    keywords: ['currículum de técnico de HVAC', 'currículum de HVAC', 'currículum de calefacción y refrigeración', 'CV de técnico de HVAC'],
    searchIntents: ['ejemplo de currículum de técnico de HVAC', 'cómo hacer un currículum de HVAC', 'plantilla de currículum de técnico de servicio HVAC'],
    topSkills: ['Instalación de HVAC', 'Manejo de Refrigerantes', 'Diagnóstico Eléctrico', 'Fabricación de Ductos', 'Mantenimiento Preventivo', 'Cumplimiento EPA 608', 'Cálculos de Carga', 'Sistemas HVAC Comerciales', 'Sistemas de Bomba de Calor', 'Relaciones con Clientes'],
    atsKeywords: ['instalación de HVAC', 'refrigerante', 'EPA 608', 'ductos', 'diagnóstico eléctrico', 'mantenimiento preventivo', 'HVAC comercial', 'HVAC residencial', 'bomba de calor', 'cálculos de carga', 'termostatos', 'compresores'],
    sampleResumeData: buildResumeData({
      firstName: 'Dustin',
      lastName: 'Pratt',
      profession: 'Técnico de HVAC',
      summary: 'Técnico de HVAC certificado por EPA con más de 7 años de experiencia instalando, manteniendo y reparando sistemas de calefacción y refrigeración residenciales y comerciales. Completó más de 2,500 llamadas de servicio con una tasa de resolución en primera visita del 96%.',
      skills: ['Instalación de HVAC', 'Manejo de Refrigerantes', 'Diagnóstico Eléctrico', 'Fabricación de Ductos', 'Mantenimiento Preventivo', 'Cumplimiento EPA 608', 'Cálculos de Carga', 'Sistemas HVAC Comerciales', 'Sistemas de Bomba de Calor', 'Relaciones con Clientes'],
      experience: [
        {
          title: 'Técnico Senior de HVAC',
          company: 'Carrier Global',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Da servicio y mantiene sistemas HVAC para más de 120 cuentas comerciales, asegurando un 99% de disponibilidad durante las temporadas pico',
            'Instala un promedio de 6 sistemas HVAC residenciales por semana, generando $380K en ingresos trimestrales para la sucursal',
            'Redujo la tasa de rellamadas de emergencia en un 28% mediante la implementación de protocolos integrales de mantenimiento preventivo',
          ],
        },
        {
          title: 'Técnico de Servicio HVAC',
          company: 'Trane Technologies',
          startDate: '2017-05',
          endDate: '2021-01',
          achievements: [
            'Completó 10-12 llamadas de servicio residencial por día incluyendo diagnósticos, reparaciones y reemplazos de sistemas',
            'Logró una calificación de satisfacción del cliente del 96% en más de 1,800 visitas de servicio documentadas',
            'Obtuvo la certificación NATE en instalación de aire acondicionado y bomba de calor durante el primer año de empleo',
          ],
        },
      ],
      education: [
        { institution: 'Lincoln Technical Institute', degree: 'Diploma', field: 'Tecnología HVAC-R', startDate: '2015-09', endDate: '2017-04' },
      ],
      certifications: [
        { name: 'Certificación Universal EPA Sección 608', issuer: 'EPA', date: '2017-05' },
        { name: 'Técnico Certificado NATE', issuer: 'North American Technician Excellence', date: '2018-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones son esenciales para un currículum de HVAC?', answer: 'La certificación EPA Sección 608 es obligatoria. La certificación NATE, tarjetas de seguridad OSHA y capacitación específica de fabricante (Carrier, Trane, Lennox) fortalecen significativamente su currículum.' },
      { question: '¿Cómo debe un técnico de HVAC describir el trabajo diario en un currículum?', answer: 'Enfóquese en llamadas de servicio por día, tasas de resolución en primera visita, tipos de sistemas atendidos y puntajes de satisfacción del cliente en lugar de descripciones genéricas de tareas.' },
      { question: '¿Se requiere educación formal para un currículum de técnico de HVAC?', answer: 'La escuela técnica o un programa de aprendizaje es lo estándar. Si aprendió en el trabajo, enfatice los años de experiencia, las certificaciones y los sistemas específicos que está calificado para dar servicio.' },
    ],
  },

  'diesel-mechanic': {
    slug: 'mecanico-diesel',
    title: 'Mecánico Diésel',
    keywords: ['currículum de mecánico diésel', 'currículum de técnico diésel', 'currículum de mecánico de servicio pesado', 'CV de mecánico diésel'],
    searchIntents: ['ejemplo de currículum de mecánico diésel', 'cómo hacer un currículum de técnico diésel', 'plantilla de currículum de mecánico diésel'],
    topSkills: ['Diagnóstico de Motores Diésel', 'Sistemas de Inyección de Combustible', 'Sistemas Hidráulicos', 'Diagnóstico Eléctrico', 'Mantenimiento Preventivo', 'Sistemas de Frenos', 'Sistemas de Emisiones', 'Mantenimiento de Flotas', 'Soldadura', 'Certificación ASE'],
    atsKeywords: ['motor diésel', 'inyección de combustible', 'sistemas hidráulicos', 'diagnóstico eléctrico', 'mantenimiento preventivo', 'mantenimiento de flotas', 'emisiones', 'sistemas de frenos', 'certificado ASE', 'inspección DOT', 'turbocompresor'],
    sampleResumeData: buildResumeData({
      firstName: 'Wayne',
      lastName: 'Beckett',
      profession: 'Mecánico Diésel',
      summary: 'Mecánico diésel certificado ASE con más de 8 años de experiencia en mantenimiento y reparación de camiones Clase 6-8, equipo pesado y vehículos de flota. Mantuvo una flota de más de 200 vehículos con un 97% de disponibilidad mediante diagnósticos proactivos y programas de mantenimiento preventivo.',
      skills: ['Diagnóstico de Motores Diésel', 'Sistemas de Inyección de Combustible', 'Sistemas Hidráulicos', 'Diagnóstico Eléctrico', 'Mantenimiento Preventivo', 'Sistemas de Frenos', 'Sistemas de Emisiones', 'Mantenimiento de Flotas', 'Soldadura', 'Certificación ASE'],
      experience: [
        {
          title: 'Técnico Diésel Senior',
          company: 'Penske Truck Leasing',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Diagnostica y repara un promedio de 6 camiones Clase 8 por día en sistemas de motor, transmisión y eléctricos',
            'Mantiene una flota de más de 200 vehículos arrendados con un 97% de disponibilidad, superando el objetivo de la compañía del 95%',
            'Redujo las averías no programadas en un 20% implementando una lista de verificación de mantenimiento predictivo basada en datos telemáticos',
          ],
        },
        {
          title: 'Mecánico Diésel',
          company: 'Rush Enterprises',
          startDate: '2016-03',
          endDate: '2020-05',
          achievements: [
            'Realizó inspecciones DOT, reconstrucción de motores y reparaciones de sistemas de postratamiento en camiones Peterbilt y Kenworth',
            'Completó más de 40 reconstrucciones de motor con cero devoluciones por garantía durante un período de 4 años',
            'Obtuvo el estatus de Técnico Maestro de Camiones de Servicio Pesado ASE aprobando los 6 exámenes de certificación en 2 años',
          ],
        },
      ],
      education: [
        { institution: 'WyoTech', degree: 'Diploma', field: 'Tecnología Diésel', startDate: '2014-06', endDate: '2016-02' },
      ],
      certifications: [
        { name: 'Técnico Maestro de Camiones de Servicio Pesado ASE', issuer: 'National Institute for Automotive Service Excellence', date: '2019-08' },
        { name: 'Certificación de Inspector de Frenos DOT', issuer: 'FMCSA', date: '2017-04' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe destacar un mecánico diésel?', answer: 'Las certificaciones ASE de Camiones de Servicio Pesado (T1-T8) son el estándar de la industria. También incluya la certificación de inspector de frenos DOT y cualquier capacitación específica de fabricante (Cummins, Detroit Diesel, Caterpillar).' },
      { question: '¿Cómo cuantifico la experiencia como mecánico diésel?', answer: 'Incluya el tamaño de la flota mantenida, porcentajes de disponibilidad, vehículos reparados por día, cantidad de reconstrucciones de motor y registros de seguridad como cero devoluciones por garantía.' },
      { question: '¿Es necesario un diploma de escuela técnica para un currículum de mecánico diésel?', answer: 'Aunque no siempre es requerido, fortalece su currículum. Si se capacitó en el trabajo, enfatice las certificaciones ASE, años de experiencia práctica y los sistemas específicos en los que se especializa.' },
    ],
  },

  'motorcycle-mechanic': {
    slug: 'mecanico-de-motocicletas',
    title: 'Mecánico de Motocicletas',
    keywords: ['currículum de mecánico de motocicletas', 'currículum de técnico de motocicletas', 'currículum de técnico de powersports', 'CV de mecánico de motocicletas'],
    searchIntents: ['ejemplo de currículum de mecánico de motocicletas', 'cómo hacer un currículum de técnico de motocicletas', 'plantilla de currículum de mecánico de powersports'],
    topSkills: ['Reconstrucción de Motores', 'Ajuste de Inyección de Combustible', 'Diagnóstico Eléctrico', 'Configuración de Suspensión', 'Servicio de Frenos', 'Reconstrucción de Carburadores', 'Ajuste en Dinamómetro', 'Servicio de Cadena y Piñón', 'Consulta con Clientes', 'Pedido de Refacciones'],
    atsKeywords: ['reparación de motocicletas', 'reconstrucción de motor', 'inyección de combustible', 'diagnóstico eléctrico', 'suspensión', 'servicio de frenos', 'carburador', 'ajuste en dinamómetro', 'powersports', 'Harley-Davidson', 'Honda'],
    sampleResumeData: buildResumeData({
      firstName: 'Jared',
      lastName: 'Nishimura',
      profession: 'Mecánico de Motocicletas',
      summary: 'Técnico de motocicletas certificado con más de 6 años de experiencia dando servicio a motocicletas Harley-Davidson, Honda, Yamaha y Kawasaki. Completó más de 1,500 órdenes de servicio con un índice de satisfacción del cliente del 99%. Hábil en reconstrucción de motores, ajuste de inyección de combustible y mejoras de rendimiento.',
      skills: ['Reconstrucción de Motores', 'Ajuste de Inyección de Combustible', 'Diagnóstico Eléctrico', 'Configuración de Suspensión', 'Servicio de Frenos', 'Reconstrucción de Carburadores', 'Ajuste en Dinamómetro', 'Servicio de Cadena y Piñón', 'Consulta con Clientes', 'Pedido de Refacciones'],
      experience: [
        {
          title: 'Técnico Líder de Motocicletas',
          company: 'Harley-Davidson of Scottsdale',
          startDate: '2021-03',
          isCurrent: true,
          achievements: [
            'Da servicio a un promedio de 7 motocicletas por día incluyendo mantenimiento programado, trabajo de motor y diagnóstico eléctrico',
            'Aumentó la tasa de venta cruzada de refacciones y accesorios en un 35% mediante consulta con clientes sobre mejoras de rendimiento',
            'Capacitó a 2 técnicos aprendices en software de diagnóstico y procedimientos de servicio de Harley-Davidson',
          ],
        },
        {
          title: 'Técnico de Motocicletas',
          company: 'Cycle Gear / RevZilla Service Center',
          startDate: '2018-01',
          endDate: '2021-02',
          achievements: [
            'Realizó reconstrucciones de motor, configuraciones de suspensión y servicio de frenos en más de 800 motocicletas deportivas y de turismo anualmente',
            'Mantuvo un índice de satisfacción del cliente del 99% en todas las órdenes de servicio documentadas',
            'Completó la certificación de Yamaha Star Technical Academy dentro de los primeros 6 meses de empleo',
          ],
        },
      ],
      education: [
        { institution: 'Motorcycle Mechanics Institute', degree: 'Diploma', field: 'Tecnología de Motocicletas', startDate: '2016-06', endDate: '2017-12' },
      ],
      certifications: [
        { name: 'Técnico Certificado Harley-Davidson', issuer: 'Harley-Davidson Motor Company', date: '2021-05' },
        { name: 'Yamaha Star Technical Academy', issuer: 'Yamaha Motor Corporation', date: '2018-07' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones ayudan a que un currículum de mecánico de motocicletas destaque?', answer: 'Las certificaciones específicas de fabricante de Harley-Davidson, Honda, Yamaha o BMW tienen el mayor peso. La capacitación del MMI (Motorcycle Mechanics Institute) también es bien considerada.' },
      { question: '¿Cómo debe un mecánico de motocicletas describir su experiencia?', answer: 'Mencione las marcas y tipos de motocicletas atendidas, volumen de órdenes de servicio, calificaciones de satisfacción del cliente y cualquier trabajo de mejora de rendimiento.' },
      { question: '¿Vale la pena incluir experiencia en ajuste de dinamómetro?', answer: 'Absolutamente. El ajuste en dinamómetro y el trabajo de rendimiento lo diferencian de los técnicos de servicio general y atraen a talleres de alto rendimiento y concesionarios.' },
    ],
  },

  'tool-and-die-maker': {
    slug: 'herrero-de-troqueles',
    title: 'Matricero',
    keywords: ['currículum de matricero', 'currículum de fabricante de herramientas', 'currículum de fabricante de troqueles', 'CV de matricero'],
    searchIntents: ['ejemplo de currículum de matricero', 'cómo hacer un currículum de fabricante de herramientas', 'plantilla de currículum de matricero'],
    topSkills: ['Diseño y Construcción de Troqueles', 'Programación CNC', 'Operación de EDM', 'Rectificado de Precisión', 'Interpretación de GD&T', 'Lectura de Planos', 'Tratamiento Térmico', 'Diseño de Plantillas y Dispositivos', 'Inspección de Calidad', 'SolidWorks / CAD'],
    atsKeywords: ['troqueles y matrices', 'programación CNC', 'EDM', 'rectificado de precisión', 'GD&T', 'lectura de planos', 'tratamiento térmico', 'plantillas y dispositivos', 'troqueles de estampado', 'moldes de inyección', 'inspección de calidad', 'SolidWorks'],
    sampleResumeData: buildResumeData({
      firstName: 'Gerald',
      lastName: 'Voss',
      profession: 'Matricero',
      summary: 'Matricero oficial con más de 12 años de experiencia diseñando, construyendo y manteniendo troqueles de estampado progresivo y moldes de inyección. Redujo el tiempo de cambio de troquel en un 40% y mantuvo tolerancias dentro de ±0.0005 pulgadas en todo el herramental de producción.',
      skills: ['Diseño y Construcción de Troqueles', 'Programación CNC', 'Operación de EDM', 'Rectificado de Precisión', 'Interpretación de GD&T', 'Lectura de Planos', 'Tratamiento Térmico', 'Diseño de Plantillas y Dispositivos', 'Inspección de Calidad', 'SolidWorks / CAD'],
      experience: [
        {
          title: 'Matricero Senior',
          company: 'Magna International',
          startDate: '2019-01',
          isCurrent: true,
          achievements: [
            'Diseña y construye troqueles de estampado progresivo para paneles de carrocería automotriz, manteniendo tolerancias de ±0.0005 in en todo el herramental',
            'Redujo el tiempo de cambio de troquel en un 40% rediseñando insertos de cambio rápido, ahorrando $120K anuales en tiempo de inactividad de prensa',
            'Mentor de 4 aprendices de matricería en programación CNC, operación de EDM y técnicas de rectificado de precisión',
          ],
        },
        {
          title: 'Matricero',
          company: 'Martinrea International',
          startDate: '2012-06',
          endDate: '2018-12',
          achievements: [
            'Construyó y mantuvo más de 60 troqueles progresivos y de transferencia para líneas de estampado automotriz de alto volumen',
            'Programó y operó fresadoras CNC, tornos y máquinas de electroerosión por hilo para producir componentes de troqueles dentro de especificación',
            'Logró una tasa de aprobación de inspección de primer artículo del 99.2% en todas las construcciones de herramental nuevo durante un período de 6 años',
          ],
        },
      ],
      education: [
        { institution: 'Macomb Community College', degree: 'Título Asociado', field: 'Tecnología de Troqueles y Matrices', startDate: '2008-09', endDate: '2012-05' },
      ],
      certifications: [
        { name: 'Matricero Oficial', issuer: 'U.S. Department of Labor', date: '2016-06' },
        { name: 'SolidWorks CSWA', issuer: 'Dassault Systèmes', date: '2017-09' },
      ],
    }),
    faqs: [
      { question: '¿Qué habilidades técnicas debe listar un matricero?', answer: 'Incluya programación CNC, operación de EDM, rectificado de precisión, GD&T, lectura de planos, software CAD/CAM y los tipos de herramental en los que se especializa (troqueles progresivos, moldes de inyección, plantillas y dispositivos).' },
      { question: '¿Cómo demuestro precisión en un currículum de matricero?', answer: 'Especifique las tolerancias que mantiene consistentemente (ej., ±0.0005 in), tasas de aprobación de primer artículo y la complejidad del herramental que ha construido.' },
      { question: '¿Es importante mencionar el aprendizaje?', answer: 'Sí. Un aprendizaje completado de oficial es altamente respetado en este oficio. Incluya la duración, las habilidades aprendidas y cualquier credencial del Departamento de Trabajo obtenida.' },
    ],
  },

  'cnc-operator': {
    slug: 'operador-de-cnc',
    title: 'Operador de CNC',
    keywords: ['currículum de operador de CNC', 'currículum de maquinista CNC', 'currículum de programador CNC', 'CV de operador de CNC'],
    searchIntents: ['ejemplo de currículum de operador de CNC', 'cómo hacer un currículum de maquinista CNC', 'plantilla de currículum de operador de CNC'],
    topSkills: ['Operación de Fresadora CNC', 'Operación de Torno CNC', 'Programación de Código G', 'Lectura de Planos', 'GD&T', 'Medición de Precisión', 'Ajuste de Herramientas y Offsets', 'Control de Calidad', 'Mastercam / Software CAM', 'Mantenimiento Preventivo'],
    atsKeywords: ['fresadora CNC', 'torno CNC', 'código G', 'código M', 'lectura de planos', 'GD&T', 'medición de precisión', 'Mastercam', 'ajuste de herramientas', 'control de calidad', 'inspección de primer artículo', 'tolerancias estrechas'],
    sampleResumeData: buildResumeData({
      firstName: 'Keith',
      lastName: 'Olson',
      profession: 'Operador de CNC',
      summary: 'Operador de CNC hábil con más de 6 años de experiencia programando y operando fresadoras y tornos CNC de 3 ejes y 5 ejes. Mantiene consistentemente tolerancias dentro de ±0.001 pulgadas y una tasa de desperdicio inferior al 0.5% en corridas de producción de alto volumen.',
      skills: ['Operación de Fresadora CNC', 'Operación de Torno CNC', 'Programación de Código G', 'Lectura de Planos', 'GD&T', 'Medición de Precisión', 'Ajuste de Herramientas y Offsets', 'Control de Calidad', 'Mastercam / Software CAM', 'Mantenimiento Preventivo'],
      experience: [
        {
          title: 'Operador / Programador CNC',
          company: 'SpaceX',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Programa y opera fresadoras CNC de 5 ejes para producir componentes de grado aeroespacial con tolerancias de ±0.0005 in',
            'Redujo el tiempo de ciclo en un 15% en un bracket de motor de cohete de alto volumen optimizando trayectorias de herramienta en Mastercam',
            'Mantiene una tasa de aprobación de inspección de primer artículo del 99.8% en todas las configuraciones de programas nuevos',
          ],
        },
        {
          title: 'Operador de Fresadora CNC',
          company: 'General Dynamics',
          startDate: '2018-04',
          endDate: '2021-12',
          achievements: [
            'Operó 3 fresadoras CNC verticales simultáneamente, produciendo más de 200 piezas de precisión por turno para contratos de defensa',
            'Logró una tasa de desperdicio del 0.4%, muy por debajo del promedio del departamento del 1.2%',
            'Capacitó a 3 nuevos operadores en configuración de máquina, ajustes de offset de herramientas y procedimientos de inspección de primer artículo',
          ],
        },
      ],
      education: [
        { institution: 'Vincennes University', degree: 'Título Asociado', field: 'Manufactura Integrada por Computadora', startDate: '2016-08', endDate: '2018-05' },
      ],
      certifications: [
        { name: 'Certificación de Fresado CNC NIMS', issuer: 'National Institute for Metalworking Skills', date: '2018-06' },
        { name: 'Programador Certificado de Mastercam', issuer: 'CNC Software / Mastercam', date: '2019-11' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones hacen competitivo un currículum de operador de CNC?', answer: 'Las certificaciones NIMS en fresado o torneado CNC son el estándar de la industria. Las certificaciones de Mastercam u otro software CAM también agregan valor.' },
      { question: '¿Cómo debe un operador de CNC describir la precisión en un currículum?', answer: 'Especifique las tolerancias que mantiene (ej., ±0.001 in o ±0.0005 in), tasas de desperdicio, tasas de aprobación de primer artículo y los tipos de materiales que maquina.' },
      { question: '¿Vale la pena destacar la programación de código G?', answer: 'Sí. Los operadores que pueden escribir y editar código G son más valiosos que aquellos que solo ejecutan programas precargados. Mencione también cualquier software CAM que utilice.' },
    ],
  },

  'machinist': {
    slug: 'maquinista',
    title: 'Maquinista',
    keywords: ['currículum de maquinista', 'currículum de maquinista de precisión', 'currículum de maquinista manual', 'CV de maquinista'],
    searchIntents: ['ejemplo de currículum de maquinista', 'cómo hacer un currículum de maquinista', 'plantilla de currículum de maquinista de precisión'],
    topSkills: ['Fresado Manual', 'Operación de Torno Manual', 'Operación CNC', 'Lectura de Planos', 'GD&T', 'Medición de Precisión', 'Rectificado de Superficies', 'Conocimiento de Tratamiento Térmico', 'Afilado de Herramientas', 'Aseguramiento de Calidad'],
    atsKeywords: ['fresadora manual', 'torno manual', 'CNC', 'lectura de planos', 'GD&T', 'medición de precisión', 'rectificado de superficies', 'micrómetro', 'calibradores', 'CMM', 'tolerancias estrechas', 'maquinado de prototipos'],
    sampleResumeData: buildResumeData({
      firstName: 'Roland',
      lastName: 'Strasser',
      profession: 'Maquinista',
      summary: 'Maquinista de precisión con más de 10 años de experiencia en maquinado manual y CNC de componentes aeroespaciales y de grado médico. Mantuvo tolerancias de ±0.0002 pulgadas en piezas de prototipo y producción. Competente en lectura de planos complejos con especificaciones GD&T.',
      skills: ['Fresado Manual', 'Operación de Torno Manual', 'Operación CNC', 'Lectura de Planos', 'GD&T', 'Medición de Precisión', 'Rectificado de Superficies', 'Conocimiento de Tratamiento Térmico', 'Afilado de Herramientas', 'Aseguramiento de Calidad'],
      experience: [
        {
          title: 'Maquinista Líder',
          company: 'Raytheon Technologies',
          startDate: '2020-02',
          isCurrent: true,
          achievements: [
            'Maquina componentes aeroespaciales con tolerancias de ±0.0002 in en fresadoras manuales, tornos y rectificadoras de superficies',
            'Lidera un equipo de 6 maquinistas produciendo piezas críticas de vuelo, logrando una tasa de aceptación de calidad del 99.5%',
            'Redujo el tiempo de preparación en un 20% diseñando dispositivos de sujeción personalizados, ahorrando un estimado de $80K anualmente',
          ],
        },
        {
          title: 'Maquinista de Precisión',
          company: 'Stryker Corporation',
          startDate: '2014-05',
          endDate: '2020-01',
          achievements: [
            'Maquinó más de 5,000 componentes de dispositivos médicos anualmente a partir de titanio, acero inoxidable y materiales PEEK',
            'Mantuvo un rendimiento de primer pase del 98.8% en piezas de producción reguladas por la FDA',
            'Programó y operó tornos y fresadoras CNC tanto para prototipos como para corridas de producción',
          ],
        },
      ],
      education: [
        { institution: 'Dunwoody College of Technology', degree: 'Título Asociado', field: 'Tecnología de Máquinas Herramienta', startDate: '2012-09', endDate: '2014-05' },
      ],
      certifications: [
        { name: 'NIMS Maquinado Nivel II', issuer: 'National Institute for Metalworking Skills', date: '2015-03' },
        { name: 'Auditor Interno AS9100', issuer: 'SAE International', date: '2021-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué habilidades son más importantes en un currículum de maquinista?', answer: 'Enfatice tanto las capacidades manuales como CNC, las tolerancias más estrechas que puede mantener, los materiales con los que trabaja y las habilidades de lectura de planos/GD&T.' },
      { question: '¿Cómo diferencio un currículum de maquinista de uno de operador de CNC?', answer: 'Destaque las habilidades de maquinado manual, trabajo de prototipos, dispositivos de sujeción personalizados y la capacidad de interpretar planos complejos de forma independiente, lo cual va más allá de operar máquinas CNC preprogramadas.' },
      { question: '¿Debo incluir las herramientas de medición que uso?', answer: 'Sí. Liste micrómetros, calibradores, medidores de altura, experiencia con CMM y cualquier comparador óptico o instrumento de precisión en el que sea competente.' },
    ],
  },

  'boiler-technician': {
    slug: 'tecnico-de-calderas',
    title: 'Técnico de Calderas',
    keywords: ['currículum de técnico de calderas', 'currículum de operador de calderas', 'currículum de ingeniero estacionario', 'CV de técnico de calderas'],
    searchIntents: ['ejemplo de currículum de técnico de calderas', 'cómo hacer un currículum de operador de calderas', 'plantilla de currículum de ingeniero estacionario'],
    topSkills: ['Operación y Mantenimiento de Calderas', 'Sistemas de Vapor', 'Tratamiento de Agua', 'Análisis de Combustión', 'Inspección de Recipientes a Presión', 'Ajuste de Quemadores', 'Controles PLC', 'Pruebas de Válvulas de Seguridad', 'Cumplimiento del Código ASME', 'Mantenimiento Preventivo'],
    atsKeywords: ['operación de calderas', 'sistemas de vapor', 'tratamiento de agua', 'análisis de combustión', 'recipientes a presión', 'ajuste de quemadores', 'PLC', 'código ASME', 'válvulas de seguridad', 'ingeniero estacionario', 'licencia de calderas'],
    sampleResumeData: buildResumeData({
      firstName: 'Harold',
      lastName: 'Pennington',
      profession: 'Técnico de Calderas',
      summary: 'Ingeniero estacionario licenciado con más de 9 años de experiencia operando y manteniendo sistemas de calderas de alta presión en entornos hospitalarios e industriales. Gestionó plantas de calderas produciendo hasta 80,000 lbs/hr de vapor con cero violaciones de seguridad durante 5 años consecutivos.',
      skills: ['Operación y Mantenimiento de Calderas', 'Sistemas de Vapor', 'Tratamiento de Agua', 'Análisis de Combustión', 'Inspección de Recipientes a Presión', 'Ajuste de Quemadores', 'Controles PLC', 'Pruebas de Válvulas de Seguridad', 'Cumplimiento del Código ASME', 'Mantenimiento Preventivo'],
      experience: [
        {
          title: 'Técnico Senior de Calderas',
          company: 'Johns Hopkins Hospital',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Opera y mantiene una planta de 4 calderas produciendo 80,000 lbs/hr de vapor para un campus hospitalario de 1,000 camas',
            'Logró cero violaciones de seguridad y cero paradas no planificadas durante 4 años consecutivos mediante riguroso mantenimiento preventivo',
            'Redujo el consumo de combustible en un 8% optimizando el ajuste de quemadores y las relaciones de aire de combustión',
          ],
        },
        {
          title: 'Operador de Calderas',
          company: 'Siemens Energy',
          startDate: '2015-06',
          endDate: '2020-03',
          achievements: [
            'Operó calderas de alta presión y turbinas de vapor en 3 plantas industriales de energía en la región del Atlántico Medio',
            'Realizó pruebas químicas y ajustes de tratamiento de agua, manteniendo la calidad del agua dentro de los estándares ASME',
            'Completó más de 200 pruebas de válvulas de seguridad e inspecciones de recipientes a presión con 100% de cumplimiento',
          ],
        },
      ],
      education: [
        { institution: 'SUNY Maritime College', degree: 'Certificado', field: 'Ingeniería Estacionaria', startDate: '2013-09', endDate: '2015-05' },
      ],
      certifications: [
        { name: 'Licencia de Ingeniero Estacionario Black Seal', issuer: 'State of New Jersey', date: '2015-06' },
        { name: 'Certificación de Operador de Calderas ASME', issuer: 'ASME', date: '2016-09' },
      ],
    }),
    faqs: [
      { question: '¿Qué licencias debe incluir un técnico de calderas en su currículum?', answer: 'Incluya el grado de su licencia de ingeniero estacionario (Black Seal, Blue Seal, etc.), certificaciones ASME y cualquier licencia de operador de calderas específica del estado.' },
      { question: '¿Cómo describo las operaciones de calderas en un currículum?', answer: 'Especifique la capacidad de los sistemas que opera (lbs/hr de vapor), tipos de calderas, registros de seguridad y cualquier mejora de eficiencia que haya logrado.' },
      { question: '¿Es importante mencionar la experiencia en tratamiento de agua?', answer: 'Sí. El tratamiento de agua es una competencia fundamental para los técnicos de calderas. Incluya pruebas químicas, programas de tratamiento y cumplimiento con los estándares de calidad de agua ASME.' },
    ],
  },

  'elevator-technician': {
    slug: 'tecnico-de-elevadores',
    title: 'Técnico de Elevadores',
    keywords: ['currículum de técnico de elevadores', 'currículum de mecánico de elevadores', 'currículum de instalador de elevadores', 'CV de técnico de elevadores'],
    searchIntents: ['ejemplo de currículum de técnico de elevadores', 'cómo hacer un currículum de mecánico de elevadores', 'plantilla de currículum de instalador de elevadores'],
    topSkills: ['Instalación de Elevadores', 'Mantenimiento de Elevadores', 'Diagnóstico Eléctrico', 'Sistemas Hidráulicos', 'Sistemas de Tracción', 'Programación PLC', 'Cumplimiento de Códigos', 'Pruebas de Seguridad', 'Lectura de Planos', 'Proyectos de Modernización'],
    atsKeywords: ['instalación de elevadores', 'mantenimiento de elevadores', 'elevador hidráulico', 'elevador de tracción', 'PLC', 'diagnóstico eléctrico', 'cumplimiento de códigos', 'pruebas de seguridad', 'modernización', 'ASME A17.1', 'escalera mecánica'],
    sampleResumeData: buildResumeData({
      firstName: 'Tyrone',
      lastName: 'Blackwell',
      profession: 'Técnico de Elevadores',
      summary: 'Mecánico de elevadores licenciado con más de 8 años de experiencia instalando, manteniendo y modernizando sistemas de elevadores de tracción e hidráulicos. Mantuvo más de 150 elevadores en edificios comerciales y residenciales con un 99.7% de disponibilidad. Competente en diagnóstico PLC y cumplimiento del código ASME A17.1.',
      skills: ['Instalación de Elevadores', 'Mantenimiento de Elevadores', 'Diagnóstico Eléctrico', 'Sistemas Hidráulicos', 'Sistemas de Tracción', 'Programación PLC', 'Cumplimiento de Códigos', 'Pruebas de Seguridad', 'Lectura de Planos', 'Proyectos de Modernización'],
      experience: [
        {
          title: 'Mecánico de Elevadores',
          company: 'Otis Elevator Company',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Mantiene un portafolio de más de 150 elevadores de tracción e hidráulicos en 40 edificios comerciales con un 99.7% de disponibilidad',
            'Completó 12 proyectos completos de modernización de elevadores, actualizando controladores, variadores y sistemas de seguridad con un valor de más de $200K cada uno',
            'Redujo el tiempo promedio de respuesta de servicio en un 30% implementando un programa de mantenimiento predictivo basado en datos de sensores IoT',
          ],
        },
        {
          title: 'Aprendiz / Mecánico de Elevadores',
          company: 'ThyssenKrupp Elevator',
          startDate: '2016-03',
          endDate: '2020-07',
          achievements: [
            'Instaló más de 25 nuevos sistemas de elevadores de tracción e hidráulicos en edificios residenciales de gran altura y hospitales',
            'Realizó inspecciones mensuales de seguridad y pruebas anuales de cumplimiento ASME A17.1 en más de 80 unidades',
            'Obtuvo la designación de Técnico de Elevadores Certificado después de completar un programa de aprendizaje IUEC de 4 años',
          ],
        },
      ],
      education: [
        { institution: 'IUEC National Elevator Industry Educational Program', degree: 'Certificado', field: 'Tecnología de Elevadores', startDate: '2016-03', endDate: '2020-03' },
      ],
      certifications: [
        { name: 'Técnico de Elevadores Certificado (CET)', issuer: 'National Association of Elevator Contractors', date: '2020-04' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2017-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones son importantes para un técnico de elevadores?', answer: 'El Técnico de Elevadores Certificado (CET) de NAEC es el más reconocido. También incluya su licencia estatal de mecánico de elevadores, certificaciones OSHA y estatus de oficial sindical.' },
      { question: '¿Cómo debe un técnico de elevadores mostrar su experiencia?', answer: 'Describa la cantidad de elevadores mantenidos, porcentajes de disponibilidad, proyectos de modernización completados y tasas de aprobación de inspecciones de seguridad.' },
      { question: '¿Vale la pena mencionar el aprendizaje IUEC?', answer: 'Absolutamente. El aprendizaje IUEC de 4 años es la vía principal para ingresar al oficio y es altamente respetado por los empleadores. Inclúyalo de manera prominente en su sección de educación.' },
    ],
  },

  'maintenance-technician': {
    slug: 'tecnico-de-mantenimiento',
    title: 'Técnico de Mantenimiento',
    keywords: ['currículum de técnico de mantenimiento', 'currículum de mantenimiento de edificios', 'currículum de mantenimiento de instalaciones', 'CV de técnico de mantenimiento'],
    searchIntents: ['ejemplo de currículum de técnico de mantenimiento', 'cómo hacer un currículum de técnico de mantenimiento', 'plantilla de currículum de mantenimiento de edificios'],
    topSkills: ['Mantenimiento Preventivo', 'Reparación Eléctrica', 'Reparación de Plomería', 'Fundamentos de HVAC', 'Diagnóstico de Equipos', 'Gestión de Órdenes de Trabajo', 'Sistemas de Edificios', 'Pintura y Tablaroca', 'Cumplimiento de Seguridad', 'Coordinación de Proveedores'],
    atsKeywords: ['mantenimiento preventivo', 'reparación eléctrica', 'plomería', 'HVAC', 'diagnóstico de equipos', 'órdenes de trabajo', 'sistemas de edificios', 'CMMS', 'mantenimiento de instalaciones', 'cumplimiento de seguridad', 'tablaroca', 'pintura'],
    sampleResumeData: buildResumeData({
      firstName: 'Lonnie',
      lastName: 'Frazier',
      profession: 'Técnico de Mantenimiento',
      summary: 'Técnico de mantenimiento versátil con más de 7 años de experiencia manteniendo instalaciones comerciales e industriales. Completó más de 4,000 órdenes de trabajo abarcando reparaciones eléctricas, de plomería, HVAC y generales de edificios con una tasa de resolución del 95% en el mismo día.',
      skills: ['Mantenimiento Preventivo', 'Reparación Eléctrica', 'Reparación de Plomería', 'Fundamentos de HVAC', 'Diagnóstico de Equipos', 'Gestión de Órdenes de Trabajo', 'Sistemas de Edificios', 'Pintura y Tablaroca', 'Cumplimiento de Seguridad', 'Coordinación de Proveedores'],
      experience: [
        {
          title: 'Técnico Senior de Mantenimiento',
          company: 'CBRE Group',
          startDate: '2021-01',
          isCurrent: true,
          achievements: [
            'Mantiene un complejo de oficinas comerciales de 500,000 pies cuadrados, resolviendo un promedio de 15 órdenes de trabajo por día en todos los sistemas del edificio',
            'Logró una tasa de resolución de órdenes de trabajo en el mismo día del 95%, superando el objetivo del SLA del cliente del 85%',
            'Redujo los costos de reparación de emergencia en un 18% mediante la implementación de un programa de mantenimiento preventivo utilizando software CMMS',
          ],
        },
        {
          title: 'Técnico de Mantenimiento',
          company: 'JLL (Jones Lang LaSalle)',
          startDate: '2017-04',
          endDate: '2020-12',
          achievements: [
            'Realizó reparaciones eléctricas, de plomería y HVAC en 3 propiedades administradas con un total de 1.2M pies cuadrados',
            'Completó más de 2,500 órdenes de trabajo con un índice de satisfacción del inquilino del 97%',
            'Coordinó con más de 12 proveedores especializados para reparaciones de alarmas contra incendio, elevadores y techados, asegurando que todo el trabajo cumpliera con los requisitos del código',
          ],
        },
      ],
      education: [
        { institution: 'Penn Foster College', degree: 'Diploma', field: 'Tecnología de Mantenimiento de Edificios', startDate: '2015-06', endDate: '2017-03' },
      ],
      certifications: [
        { name: 'Certificación EPA Sección 608', issuer: 'EPA', date: '2017-08' },
        { name: 'OSHA 10 Horas Industria General', issuer: 'OSHA', date: '2018-01' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe enfatizar un técnico de mantenimiento en su currículum?', answer: 'Destaque el tamaño de las instalaciones mantenidas, volúmenes de órdenes de trabajo, tasas de resolución, puntajes de satisfacción de inquilinos y la variedad de sistemas que puede reparar (eléctrico, plomería, HVAC, general).' },
      { question: '¿Qué tan importante es la experiencia con CMMS para un currículum de mantenimiento?', answer: 'Muy importante. La mayoría de los empleadores utilizan sistemas de gestión de mantenimiento computarizados. Mencione las plataformas específicas que ha utilizado (Maximo, eMaint, Fiix) y cómo las usa para rastrear el mantenimiento preventivo.' },
      { question: '¿Necesito certificaciones como técnico de mantenimiento?', answer: 'EPA 608 para el manejo de refrigerantes es común. La certificación de seguridad OSHA, licencias de operador de calderas y cualquier credencial específica del oficio también agregan valor.' },
    ],
  },

  'truck-driver': {
    slug: 'conductor-de-camiones',
    title: 'Conductor de Camiones',
    keywords: ['currículum de conductor de camiones', 'currículum de conductor CDL', 'currículum de conductor de camiones OTR', 'CV de conductor de camiones'],
    searchIntents: ['ejemplo de currículum de conductor de camiones', 'cómo hacer un currículum de conductor CDL', 'plantilla de currículum de conductor de camiones'],
    topSkills: ['Operación CDL Clase A', 'Conducción de Larga Distancia', 'Aseguramiento de Carga', 'Cumplimiento DOT', 'ELD / Registro Electrónico', 'Inspecciones Previas al Viaje', 'Planificación de Rutas', 'Manejo de Materiales Peligrosos', 'Manejo Defensivo', 'Eficiencia de Combustible'],
    atsKeywords: ['CDL Clase A', 'OTR', 'larga distancia', 'aseguramiento de carga', 'cumplimiento DOT', 'ELD', 'inspección previa al viaje', 'materiales peligrosos', 'tanque', 'dobles/triples', 'manejo defensivo', 'eficiencia de combustible'],
    sampleResumeData: buildResumeData({
      firstName: 'Russell',
      lastName: 'Haynes',
      profession: 'Conductor de Camiones',
      summary: 'Conductor de camiones CDL Clase A con más de 10 años de experiencia OTR y regional. Registró más de 1.2 millones de millas seguras con cero accidentes prevenibles. Experimentado en cargas de caja seca, plataforma y materiales peligrosos en 48 estados.',
      skills: ['Operación CDL Clase A', 'Conducción de Larga Distancia', 'Aseguramiento de Carga', 'Cumplimiento DOT', 'ELD / Registro Electrónico', 'Inspecciones Previas al Viaje', 'Planificación de Rutas', 'Manejo de Materiales Peligrosos', 'Manejo Defensivo', 'Eficiencia de Combustible'],
      experience: [
        {
          title: 'Conductor de Camiones OTR',
          company: 'Schneider National',
          startDate: '2019-03',
          isCurrent: true,
          achievements: [
            'Conduce 2,500-3,000 millas por semana transportando cargas de caja seca y plataforma en 48 estados con cero accidentes prevenibles',
            'Mantiene un promedio de eficiencia de combustible de 7.2 MPG, 10% por encima del promedio de la flota, mediante técnicas de eco-conducción',
            'Logró el estatus de Conductor Elite de Schneider durante 4 años consecutivos basado en seguridad, entregas a tiempo y calificaciones de clientes',
          ],
        },
        {
          title: 'Conductor Regional de Camiones',
          company: 'Werner Enterprises',
          startDate: '2014-06',
          endDate: '2019-02',
          achievements: [
            'Completó un promedio de 12 entregas por semana en una región de 7 estados del Medio Oeste con una tasa de entrega a tiempo del 99.4%',
            'Registró más de 500,000 millas con cero violaciones DOT y un puntaje CSA limpio',
            'Capacitó a 8 nuevos conductores durante la orientación de acompañamiento, reduciendo las tasas de incidentes en los primeros 90 días en un 25%',
          ],
        },
      ],
      education: [
        { institution: 'SAGE Truck Driving School', degree: 'Certificado', field: 'Conducción Comercial de Camiones', startDate: '2014-01', endDate: '2014-05' },
      ],
      certifications: [
        { name: 'CDL Clase A con Endosos de Materiales Peligrosos y Tanque', issuer: 'State of Ohio', date: '2014-05' },
        { name: 'Manejo Defensivo Smith System', issuer: 'Smith System', date: '2019-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un conductor de camiones en su currículum?', answer: 'Liste su clase de CDL y endosos, total de millas seguras, años de experiencia, tipos de carga transportada y cualquier premio o reconocimiento de seguridad.' },
      { question: '¿Cómo cuantifico la experiencia como conductor de camiones?', answer: 'Use el total de millas conducidas, tasas de entrega a tiempo, promedios de eficiencia de combustible, registros sin accidentes y puntajes CSA.' },
      { question: '¿Debo listar los endosos CDL en mi currículum?', answer: 'Sí. Los endosos de materiales peligrosos, tanque, dobles/triples y pasajeros amplían sus oportunidades laborales y deben mostrarse de manera prominente.' },
    ],
  },

  'bus-driver': {
    slug: 'conductor-de-autobus',
    title: 'Conductor de Autobús',
    keywords: ['currículum de conductor de autobús', 'currículum de conductor de transporte público', 'currículum de conductor de autobús escolar', 'CV de conductor de autobús'],
    searchIntents: ['ejemplo de currículum de conductor de autobús', 'cómo hacer un currículum de conductor de autobús', 'plantilla de currículum de conductor de transporte público'],
    topSkills: ['Operación CDL Clase B', 'Seguridad de Pasajeros', 'Navegación de Rutas', 'Inspecciones Previas al Viaje', 'Cumplimiento ADA', 'Manejo Defensivo', 'Adherencia al Horario', 'Sistemas de Cobro de Tarifas', 'Procedimientos de Emergencia', 'Servicio al Cliente'],
    atsKeywords: ['CDL Clase B', 'endoso de pasajeros', 'transporte público', 'autobús escolar', 'navegación de rutas', 'inspección previa al viaje', 'cumplimiento ADA', 'manejo defensivo', 'adherencia al horario', 'cobro de tarifas', 'seguridad de pasajeros'],
    sampleResumeData: buildResumeData({
      firstName: 'Claudia',
      lastName: 'Torres',
      profession: 'Conductora de Autobús',
      summary: 'Conductora de autobús CDL Clase B con más de 6 años de experiencia en transporte público y operaciones de autobús escolar. Transportó de manera segura a más de 150,000 pasajeros con cero accidentes por culpa propia. Reconocida por puntualidad y servicio excepcional al pasajero.',
      skills: ['Operación CDL Clase B', 'Seguridad de Pasajeros', 'Navegación de Rutas', 'Inspecciones Previas al Viaje', 'Cumplimiento ADA', 'Manejo Defensivo', 'Adherencia al Horario', 'Sistemas de Cobro de Tarifas', 'Procedimientos de Emergencia', 'Servicio al Cliente'],
      experience: [
        {
          title: 'Operadora de Autobús de Tránsito',
          company: 'MTA New York City Transit',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Opera un autobús de tránsito de 40 pies en rutas de alto volumen, transportando de manera segura a más de 300 pasajeros por turno',
            'Mantiene un índice de puntualidad del 98.2%, ubicándose en el 5% superior de operadores en el depósito',
            'Completó 3 años con cero accidentes por culpa propia y cero quejas de pasajeros',
          ],
        },
        {
          title: 'Conductora de Autobús Escolar',
          company: 'First Student',
          startDate: '2018-08',
          endDate: '2021-04',
          achievements: [
            'Condujo 2 rutas diarias transportando 65 estudiantes cada una, manteniendo un registro perfecto de recogida y entrega a tiempo',
            'Pasó todas las inspecciones DOT y pruebas aleatorias de drogas con cero violaciones durante 3 años',
            'Obtuvo el premio de Conductora del Año en 2020 por seguridad, confiabilidad y puntajes de retroalimentación de padres',
          ],
        },
      ],
      education: [
        { institution: 'MTA Transit Training Center', degree: 'Certificado', field: 'Operaciones Profesionales de Autobús', startDate: '2021-03', endDate: '2021-05' },
      ],
      certifications: [
        { name: 'CDL Clase B con Endosos de Pasajeros y Autobús Escolar', issuer: 'State of New York', date: '2018-07' },
        { name: 'Certificado de Manejo Defensivo', issuer: 'National Safety Council', date: '2019-11' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe incluir un conductor de autobús en su currículum?', answer: 'Incluya su CDL Clase B con endoso de pasajeros, endoso de autobús escolar si aplica, certificado de manejo defensivo y cualquier certificación de capacitación de la autoridad de transporte.' },
      { question: '¿Cómo cuantifico la experiencia como conductor de autobús?', answer: 'Use pasajeros transportados, porcentajes de puntualidad, años de conducción sin accidentes y cualquier premio o reconocimiento recibido.' },
      { question: '¿Debo mencionar las habilidades de cumplimiento ADA?', answer: 'Sí. La experiencia con rampas para sillas de ruedas, sistemas de sujeción y atención a pasajeros con discapacidades es una calificación importante para conductores de transporte público y autobús escolar.' },
    ],
  },

  'pilot': {
    slug: 'piloto',
    title: 'Piloto',
    keywords: ['currículum de piloto', 'currículum de piloto de aerolínea', 'currículum de piloto comercial', 'CV de piloto'],
    searchIntents: ['ejemplo de currículum de piloto', 'cómo hacer un currículum de piloto de aerolínea', 'plantilla de currículum de piloto comercial'],
    topSkills: ['Operación de Aeronaves', 'Reglas de Vuelo por Instrumentos (IFR)', 'Gestión de Recursos de Tripulación', 'Planificación de Vuelo', 'Sistemas de Navegación', 'Procedimientos de Emergencia', 'Regulaciones de la FAA', 'Análisis Meteorológico', 'Habilitación Multimotor', 'Seguridad de Aviación'],
    atsKeywords: ['certificado ATP', 'habilitación de instrumentos', 'multimotor', 'gestión de recursos de tripulación', 'planificación de vuelo', 'IFR', 'VFR', 'regulaciones de la FAA', 'habilitación de tipo', 'Boeing', 'Airbus', 'horas de vuelo', 'tiempo PIC'],
    sampleResumeData: buildResumeData({
      firstName: 'Nathan',
      lastName: 'Prescott',
      profession: 'Piloto de Aerolínea',
      summary: 'Piloto de aerolínea certificado ATP con más de 8,500 horas totales de vuelo incluyendo 5,200 horas como Piloto al Mando. Habilitado en Boeing 737 y Airbus A320. Mantuvo un registro de seguridad impecable durante 12 años de aviación comercial.',
      skills: ['Operación de Aeronaves', 'Reglas de Vuelo por Instrumentos (IFR)', 'Gestión de Recursos de Tripulación', 'Planificación de Vuelo', 'Sistemas de Navegación', 'Procedimientos de Emergencia', 'Regulaciones de la FAA', 'Análisis Meteorológico', 'Habilitación Multimotor', 'Seguridad de Aviación'],
      experience: [
        {
          title: 'Primer Oficial – Boeing 737',
          company: 'Delta Air Lines',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Opera Boeing 737-800/900ER en rutas nacionales e internacionales, registrando más de 1,200 horas de vuelo anualmente',
            'Mantiene 100% de cumplimiento con las regulaciones de la FAA y los procedimientos operativos estándar de la compañía en más de 3,600 vuelos de ingresos',
            'Completó capacitación avanzada LOFT y CRM, contribuyendo a que la flota logre un registro de seguridad de cero incidentes',
          ],
        },
        {
          title: 'Capitán – Embraer 175',
          company: 'SkyWest Airlines',
          startDate: '2014-03',
          endDate: '2020-05',
          achievements: [
            'Sirvió como Capitán en el Embraer 175 con 3,800 horas PIC y una tasa de salida a tiempo del 99.6%',
            'Fue mentor de más de 15 primeros oficiales durante la capacitación en línea, con todos los entrenados aprobando el IOE en el primer intento',
            'Reconocido con el Premio de Seguridad en 2018 por desvío de emergencia exitoso y evacuación de pasajeros',
          ],
        },
      ],
      education: [
        { institution: 'Embry-Riddle Aeronautical University', degree: 'Licenciatura en Ciencias', field: 'Ciencia Aeronáutica', startDate: '2009-08', endDate: '2013-05' },
      ],
      certifications: [
        { name: 'Certificado ATP – Avión Multimotor Terrestre', issuer: 'FAA', date: '2016-02' },
        { name: 'Habilitación de Tipo Boeing 737', issuer: 'FAA', date: '2020-05' },
      ],
    }),
    faqs: [
      { question: '¿Cómo debe un piloto formatear las horas de vuelo en un currículum?', answer: 'Liste el tiempo total, tiempo PIC, tiempo multimotor, tiempo de instrumentos y horas específicas por tipo. Coloque estos en una sección dedicada de Horas de Vuelo para fácil lectura por los gerentes de contratación.' },
      { question: '¿Qué certificaciones debe incluir un piloto?', answer: 'Certificado ATP, habilitaciones de tipo para cada aeronave, habilitación de instrumentos, habilitación multimotor y cualquier certificado de instructor (CFI, CFII, MEI).' },
      { question: '¿Cómo cuantifican los pilotos de aerolíneas la experiencia en un currículum?', answer: 'Use el total de horas de vuelo, horas PIC, horas anuales registradas, tasas de salida a tiempo, número de vuelos de ingresos y cualquier premio o reconocimiento de seguridad.' },
    ],
  },

  'air-traffic-controller': {
    slug: 'controlador-de-transito-aereo',
    title: 'Controlador de Tránsito Aéreo',
    keywords: ['currículum de controlador de tránsito aéreo', 'currículum de ATC', 'currículum de controlador de la FAA', 'CV de controlador de tránsito aéreo'],
    searchIntents: ['ejemplo de currículum de controlador de tránsito aéreo', 'cómo hacer un currículum de ATC', 'plantilla de currículum de controlador de tránsito aéreo'],
    topSkills: ['Separación por Radar', 'Secuenciamiento de Vuelos', 'Comunicación por Radio', 'Resolución de Conflictos', 'Evaluación Meteorológica', 'Sistemas STARS / ERAM', 'Coordinación de Emergencias', 'Manejo del Estrés', 'Coordinación de Equipo', 'Cumplimiento de Regulaciones FAA'],
    atsKeywords: ['control de tránsito aéreo', 'separación por radar', 'secuenciamiento de vuelos', 'comunicación por radio', 'STARS', 'ERAM', 'FAA', 'autorizaciones IFR', 'resolución de conflictos', 'TRACON', 'en ruta', 'control de torre'],
    sampleResumeData: buildResumeData({
      firstName: 'Danielle',
      lastName: 'Kramer',
      profession: 'Controladora de Tránsito Aéreo',
      summary: 'Controladora de tránsito aéreo certificada por la FAA con más de 10 años de experiencia gestionando tráfico de alta densidad en instalaciones TRACON Nivel 12. Dirigió de manera segura más de 500,000 operaciones de aeronaves con cero errores operacionales en los últimos 7 años.',
      skills: ['Separación por Radar', 'Secuenciamiento de Vuelos', 'Comunicación por Radio', 'Resolución de Conflictos', 'Evaluación Meteorológica', 'Sistemas STARS / ERAM', 'Coordinación de Emergencias', 'Manejo del Estrés', 'Coordinación de Equipo', 'Cumplimiento de Regulaciones FAA'],
      experience: [
        {
          title: 'Controladora Profesional Certificada (CPC)',
          company: 'FAA – Southern California TRACON (SCT)',
          startDate: '2019-08',
          isCurrent: true,
          achievements: [
            'Dirige un promedio de 180 operaciones de aeronaves por hora en un TRACON Nivel 12, una de las instalaciones más ocupadas de EE.UU.',
            'Mantuvo cero errores operacionales durante más de 5 años gestionando secuencias complejas de llegada y salida',
            'Capacita y certifica a 6 controladores en desarrollo, logrando una tasa de aprobación de certificación del 100% para todos los entrenados',
          ],
        },
        {
          title: 'Controladora de Tránsito Aéreo',
          company: 'FAA – Nashville International Airport (BNA)',
          startDate: '2014-06',
          endDate: '2019-07',
          achievements: [
            'Gestionó control de torre y aproximación para más de 200,000 operaciones anuales de aeronaves en un aeropuerto Clase C',
            'Coordinó respuestas de emergencia para más de 15 emergencias en vuelo, asegurando aterrizajes seguros con cero incidentes',
            'Recibió el reconocimiento del equipo FAA Instalación del Año por excelencia operacional en 2017',
          ],
        },
      ],
      education: [
        { institution: 'Embry-Riddle Aeronautical University', degree: 'Licenciatura en Ciencias', field: 'Gestión de Tránsito Aéreo', startDate: '2010-08', endDate: '2014-05' },
      ],
      certifications: [
        { name: 'Certificado de Operador de Torre de Control FAA', issuer: 'FAA', date: '2015-03' },
        { name: 'Controlador Profesional Certificado (CPC)', issuer: 'FAA', date: '2016-09' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe enfatizar un controlador de tránsito aéreo en su currículum?', answer: 'Destaque el nivel de la instalación, operaciones por hora, años sin errores operacionales y cualquier responsabilidad de capacitación o mentoría.' },
      { question: '¿Qué tan importante es el nivel de instalación para un currículum de ATC?', answer: 'Muy importante. Las instalaciones de mayor nivel (Niveles 7-12) indican mayor complejidad de tráfico y son altamente valoradas por los paneles de contratación.' },
      { question: '¿Debo incluir la Academia de la FAA en mi currículum?', answer: 'Sí. Completar la Academia de la FAA en Oklahoma City es una calificación significativa. También incluya la fecha de su certificación CPC y cualquier habilitación de instalación que posea.' },
    ],
  },

  'train-conductor': {
    slug: 'conductor-de-tren',
    title: 'Conductor de Tren',
    keywords: ['currículum de conductor de tren', 'currículum de conductor ferroviario', 'currículum de conductor de carga', 'CV de conductor de tren'],
    searchIntents: ['ejemplo de currículum de conductor de tren', 'cómo hacer un currículum de conductor ferroviario', 'plantilla de currículum de conductor de tren'],
    topSkills: ['Operaciones de Trenes', 'Sistemas de Freno de Aire', 'Operaciones de Cambio de Vías', 'Cumplimiento de Regulaciones FRA', 'Comunicación por Radio', 'Operaciones de Patio', 'Transporte de Materiales Peligrosos', 'Inspecciones de Seguridad', 'Coordinación de Tripulación', 'Procedimientos de Emergencia'],
    atsKeywords: ['operaciones de trenes', 'frenos de aire', 'cambio de vías', 'cumplimiento FRA', 'comunicación por radio', 'operaciones de patio', 'materiales peligrosos', 'inspección de seguridad', 'ferrocarril de carga', 'ferrocarril de pasajeros', 'certificación de conductor'],
    sampleResumeData: buildResumeData({
      firstName: 'Curtis',
      lastName: 'Bowman',
      profession: 'Conductor de Tren',
      summary: 'Conductor de tren certificado por la FRA con más de 7 años de experiencia en trenes de carga y pasajeros. Operó y gestionó trenes cubriendo más de 200,000 millas de vía con cero violaciones FRA. Hábil en operaciones de cambio de vías, sistemas de freno de aire y cumplimiento de transporte de materiales peligrosos.',
      skills: ['Operaciones de Trenes', 'Sistemas de Freno de Aire', 'Operaciones de Cambio de Vías', 'Cumplimiento de Regulaciones FRA', 'Comunicación por Radio', 'Operaciones de Patio', 'Transporte de Materiales Peligrosos', 'Inspecciones de Seguridad', 'Coordinación de Tripulación', 'Procedimientos de Emergencia'],
      experience: [
        {
          title: 'Conductor de Tren',
          company: 'BNSF Railway',
          startDate: '2020-11',
          isCurrent: true,
          achievements: [
            'Conduce trenes de carga con un promedio de 120 vagones y 15,000 toneladas a través de un territorio de 350 millas en el Medio Oeste',
            'Mantuvo cero violaciones FRA durante más de 4 años y registró más de 80,000 millas seguras de vía',
            'Coordina operaciones de cambio de vías en patios de clasificación, clasificando con precisión más de 200 vagones por turno',
          ],
        },
        {
          title: 'Aprendiz de Conductor / Conductor',
          company: 'Union Pacific Railroad',
          startDate: '2017-06',
          endDate: '2020-10',
          achievements: [
            'Completó un programa de capacitación de conductor de 18 meses con las calificaciones más altas en exámenes de freno de aire y reglas de operación',
            'Operó en 6 subdivisiones en 3 estados, adquiriendo experiencia en territorio de montaña, desierto y urbano',
            'Recibió el Premio de Seguridad Harriman en 2019 por lograr 2 años de operaciones sin lesiones',
          ],
        },
      ],
      education: [
        { institution: 'BNSF Railway Training Center', degree: 'Certificado', field: 'Operaciones Ferroviarias', startDate: '2020-08', endDate: '2020-11' },
      ],
      certifications: [
        { name: 'Certificación de Conductor FRA', issuer: 'Federal Railroad Administration', date: '2018-12' },
        { name: 'Certificación de Transporte de Materiales Peligrosos', issuer: 'PHMSA / DOT', date: '2019-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe incluir un conductor de tren?', answer: 'La Certificación de Conductor FRA es obligatoria. También incluya la certificación de transporte de materiales peligrosos, calificaciones de freno de aire y cualquier certificación de reglas de operación específica del ferrocarril.' },
      { question: '¿Cómo debe un conductor describir la experiencia ferroviaria?', answer: 'Mencione las millas de vía recorridas, tamaños de trenes (vagones, tonelaje), territorio operado, registros de seguridad y cualquier premio como el Premio de Seguridad Harriman.' },
      { question: '¿Es importante mencionar el programa de capacitación de conductor?', answer: 'Sí. Los programas de capacitación ferroviaria son intensivos y altamente valorados. Incluya la duración del programa, puntajes de exámenes si son buenos y las habilidades cubiertas.' },
    ],
  },

  'ship-captain': {
    slug: 'capitan-de-barco',
    title: 'Capitán de Barco',
    keywords: ['currículum de capitán de barco', 'currículum de capitán de marina mercante', 'currículum de capitán mercante', 'CV de capitán de barco'],
    searchIntents: ['ejemplo de currículum de capitán de barco', 'cómo hacer un currículum de capitán de marina mercante', 'plantilla de currículum de capitán mercante'],
    topSkills: ['Navegación de Embarcaciones', 'Guardia de Puente', 'Operaciones de Carga', 'Derecho Marítimo', 'Gestión de Tripulación', 'Navegación ECDIS / GPS', 'Respuesta de Emergencia', 'Operaciones Portuarias', 'Cumplimiento STCW', 'Planificación de Travesías'],
    atsKeywords: ['capitán de marina', 'navegación de embarcaciones', 'guardia de puente', 'operaciones de carga', 'derecho marítimo', 'ECDIS', 'STCW', 'código ISM', 'operaciones portuarias', 'licencia USCG', 'planificación de travesías', 'tonelaje'],
    sampleResumeData: buildResumeData({
      firstName: 'Henrik',
      lastName: 'Lindqvist',
      profession: 'Capitán de Barco',
      summary: 'Capitán de Marina licenciado por USCG con más de 15 años de experiencia al mando de buques portacontenedores y graneleros de hasta 75,000 DWT. Completó más de 200 travesías transoceánicas con cero incidentes marítimos. Experto en navegación ECDIS, operaciones de carga y cumplimiento del Código ISM.',
      skills: ['Navegación de Embarcaciones', 'Guardia de Puente', 'Operaciones de Carga', 'Derecho Marítimo', 'Gestión de Tripulación', 'Navegación ECDIS / GPS', 'Respuesta de Emergencia', 'Operaciones Portuarias', 'Cumplimiento STCW', 'Planificación de Travesías'],
      experience: [
        {
          title: 'Capitán de Barco',
          company: 'Maersk Line',
          startDate: '2018-01',
          isCurrent: true,
          achievements: [
            'Comanda buques portacontenedores Panamax de hasta 75,000 DWT en rutas comerciales transpacíficas y transatlánticas',
            'Completó más de 120 travesías internacionales con cero incidentes marítimos y cero hallazgos de inspección portuaria',
            'Gestiona una tripulación de 25, realizando simulacros de seguridad mensuales y logrando una tasa de cumplimiento STCW del 100%',
          ],
        },
        {
          title: 'Primer Oficial',
          company: 'Hapag-Lloyd',
          startDate: '2011-06',
          endDate: '2017-12',
          achievements: [
            'Supervisó operaciones de carga para buques portacontenedores que transportaban más de 4,000 TEU por travesía, asegurando cero reclamaciones por daño de carga',
            'Supervisó la guardia de puente y navegación para más de 80 travesías en rutas del Atlántico y Océano Índico',
            'Lideró auditorías internas del Código ISM, logrando cero no conformidades en 3 auditorías anuales consecutivas',
          ],
        },
      ],
      education: [
        { institution: 'SUNY Maritime College', degree: 'Licenciatura en Ciencias', field: 'Transporte Marítimo', startDate: '2006-08', endDate: '2010-05' },
      ],
      certifications: [
        { name: 'Licencia USCG de Capitán de Marina (Tonelaje Ilimitado)', issuer: 'U.S. Coast Guard', date: '2018-01' },
        { name: 'Certificado de Competencia STCW', issuer: 'USCG / IMO', date: '2010-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué licencias debe listar un capitán de barco en su currículum?', answer: 'Incluya su licencia USCG de Capitán de Marina con límites de tonelaje y ruta, certificados STCW y cualquier endoso especializado (tanquero, posicionamiento dinámico).' },
      { question: '¿Cómo describo la experiencia de mando en un currículum marítimo?', answer: 'Especifique los tipos y tamaños de embarcaciones (DWT, TEU), rutas comerciales navegadas, número de travesías completadas, tamaño de tripulación gestionada y registros de seguridad.' },
      { question: '¿Es importante mencionar la experiencia con el Código ISM?', answer: 'Sí. El cumplimiento del Código ISM es una responsabilidad crítica para los capitanes de barco. Incluya resultados de auditorías, registros de simulacros de seguridad y tasas de no conformidad.' },
    ],
  },

  'taxi-driver': {
    slug: 'taxista',
    title: 'Taxista',
    keywords: ['currículum de taxista', 'currículum de conductor de taxi', 'currículum de conductor de transporte por aplicación', 'CV de taxista'],
    searchIntents: ['ejemplo de currículum de taxista', 'cómo hacer un currículum de taxista', 'plantilla de currículum de conductor de transporte por aplicación'],
    topSkills: ['Manejo Defensivo', 'Navegación Urbana', 'Servicio al Cliente', 'Mantenimiento de Vehículos', 'Sistemas GPS / Navegación', 'Manejo de Efectivo y Tarjetas', 'Asistencia de Accesibilidad', 'Optimización de Rutas', 'Cumplimiento de Seguridad', 'Gestión del Tiempo'],
    atsKeywords: ['taxi', 'transporte por aplicación', 'manejo defensivo', 'navegación urbana', 'servicio al cliente', 'mantenimiento de vehículos', 'GPS', 'manejo de efectivo', 'accesibilidad', 'licencia TLC', 'licencia de chofer'],
    sampleResumeData: buildResumeData({
      firstName: 'Kwame',
      lastName: 'Asante',
      profession: 'Taxista',
      summary: 'Taxista licenciado con más de 5 años de experiencia proporcionando transporte seguro y eficiente en el área metropolitana de la Ciudad de Nueva York. Completó más de 25,000 viajes con una calificación de pasajeros de 4.9/5.0. Conocido por su puntualidad, habilidades de navegación y excelente servicio al cliente.',
      skills: ['Manejo Defensivo', 'Navegación Urbana', 'Servicio al Cliente', 'Mantenimiento de Vehículos', 'Sistemas GPS / Navegación', 'Manejo de Efectivo y Tarjetas', 'Asistencia de Accesibilidad', 'Optimización de Rutas', 'Cumplimiento de Seguridad', 'Gestión del Tiempo'],
      experience: [
        {
          title: 'Taxista Licenciado',
          company: 'Yellow Cab NYC (Medallion Owner-Operator)',
          startDate: '2021-06',
          isCurrent: true,
          achievements: [
            'Completa un promedio de 30 viajes por turno en los 5 distritos, manteniendo una calificación de pasajeros de 4.9/5.0',
            'Generó más de $85K en ingresos brutos anuales mediante planificación eficiente de rutas y programación consistente de turnos',
            'Mantuvo cero infracciones de tránsito y cero accidentes por culpa propia durante más de 3 años de operación de tiempo completo',
          ],
        },
        {
          title: 'Conductor de Transporte por Aplicación',
          company: 'Uber / Lyft',
          startDate: '2019-01',
          endDate: '2021-05',
          achievements: [
            'Completó más de 8,000 viajes en ambas plataformas con una calificación combinada de pasajeros de 4.95',
            'Logró el estatus Uber Diamond y Lyft Platinum mediante altas tasas de aceptación y satisfacción',
            'Obtuvo la clasificación del 3% superior de conductores en el mercado de NYC por rendimiento de recogida a tiempo en aeropuertos',
          ],
        },
      ],
      education: [
        { institution: 'NYC Taxi and Limousine Commission', degree: 'Certificado', field: 'Capacitación de Conductor de Vehículo de Alquiler', startDate: '2018-10', endDate: '2018-12' },
      ],
      certifications: [
        { name: 'Licencia de Conductor TLC', issuer: 'NYC Taxi and Limousine Commission', date: '2019-01' },
        { name: 'Certificado de Manejo Defensivo', issuer: 'National Safety Council', date: '2020-03' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un taxista en su currículum?', answer: 'Incluya su licencia TLC o de chofer, total de viajes completados, calificaciones de pasajeros, historial de conducción y habilidades de servicio al cliente. Los ingresos generados también son una métrica sólida.' },
      { question: '¿Cómo presentan su experiencia los conductores de transporte por aplicación en un currículum?', answer: 'Liste el total de viajes completados, calificaciones en la plataforma, estatus de nivel de conductor (Diamond, Platinum) y métricas de rendimiento de puntualidad.' },
      { question: '¿Es importante mencionar un historial de conducción limpio?', answer: 'Absolutamente. Cero infracciones y cero accidentes por culpa propia son las principales calificaciones. Incluya años de conducción limpia y cualquier certificación de manejo defensivo.' },
    ],
  },

  'logistics-driver': {
    slug: 'conductor-de-logistica',
    title: 'Conductor de Logística',
    keywords: ['currículum de conductor de logística', 'currículum de conductor de entregas', 'currículum de conductor de ruta', 'CV de conductor de logística'],
    searchIntents: ['ejemplo de currículum de conductor de logística', 'cómo hacer un currículum de conductor de entregas', 'plantilla de currículum de conductor de ruta'],
    topSkills: ['Gestión de Rutas', 'Planificación de Carga', 'Verificación de Entregas', 'Inspección de Vehículos', 'Cumplimiento DOT', 'Coordinación de Almacén', 'Registro Electrónico', 'Interacción con Clientes', 'Gestión del Tiempo', 'Manejo de Inventario'],
    atsKeywords: ['gestión de rutas', 'planificación de carga', 'verificación de entregas', 'inspección de vehículos', 'cumplimiento DOT', 'almacén', 'registro electrónico', 'entrega de última milla', 'CDL', 'entrega a tiempo', 'inventario'],
    sampleResumeData: buildResumeData({
      firstName: 'Andre',
      lastName: 'Mitchell',
      profession: 'Conductor de Logística',
      summary: 'Conductor de logística con licencia CDL y más de 5 años de experiencia en entrega de última milla y regional para transportistas principales. Entregó más de 180,000 paquetes con una tasa de entrega a tiempo del 99.7% y cero reclamaciones por daño de carga. Hábil en optimización de rutas, planificación de carga e interacción con clientes.',
      skills: ['Gestión de Rutas', 'Planificación de Carga', 'Verificación de Entregas', 'Inspección de Vehículos', 'Cumplimiento DOT', 'Coordinación de Almacén', 'Registro Electrónico', 'Interacción con Clientes', 'Gestión del Tiempo', 'Manejo de Inventario'],
      experience: [
        {
          title: 'Conductor de Entregas – Operaciones Terrestres',
          company: 'FedEx Ground',
          startDate: '2022-02',
          isCurrent: true,
          achievements: [
            'Entrega 150-180 paquetes por día en una ruta de 90 paradas residenciales y comerciales con un 99.7% de entrega a tiempo',
            'Mantiene el vehículo según los estándares de la compañía, pasando todas las inspecciones DOT con cero violaciones durante más de 2 años',
            'Clasificado en el 10% superior de conductores en la terminal por satisfacción del cliente y precisión de entrega',
          ],
        },
        {
          title: 'Conductor de Entrega de Paquetes',
          company: 'UPS',
          startDate: '2019-06',
          endDate: '2022-01',
          achievements: [
            'Completó un promedio de 120 paradas de entrega por día en rutas urbanas y suburbanas',
            'Logró el reconocimiento Circle of Honor durante 3 años consecutivos de conducción sin accidentes',
            'Capacitó a 5 conductores de temporada en uso de escáner DIAD, manejo de paquetes y ejecución de rutas',
          ],
        },
      ],
      education: [
        { institution: 'Community College of Philadelphia', degree: 'Certificado', field: 'Logística y Gestión de Cadena de Suministro', startDate: '2018-01', endDate: '2019-05' },
      ],
      certifications: [
        { name: 'Licencia CDL Clase B', issuer: 'State of Pennsylvania', date: '2019-05' },
        { name: 'Conducción Segura Smith System', issuer: 'Smith System', date: '2020-02' },
      ],
    }),
    faqs: [
      { question: '¿Qué métricas debe incluir un conductor de logística en su currículum?', answer: 'Incluya conteos diarios de paradas, paquetes entregados, tasas de entrega a tiempo, clasificaciones de satisfacción del cliente y años de conducción sin accidentes.' },
      { question: '¿Cómo presento la experiencia en FedEx o UPS en un currículum?', answer: 'Enfatice el volumen manejado, eficiencia de rutas, premios de seguridad (Circle of Honor, Conducción Segura) y cualquier responsabilidad de capacitación.' },
      { question: '¿Es necesaria una CDL para un currículum de conductor de logística?', answer: 'Depende del vehículo. La CDL Clase B es requerida para camiones de entrega más grandes. Incluso si no es requerida, listarla muestra versatilidad y abre más oportunidades laborales.' },
    ],
  },

  'solar-panel-installer': {
    slug: 'instalador-de-paneles-solares',
    title: 'Instalador de Paneles Solares',
    keywords: ['currículum de instalador de paneles solares', 'currículum de técnico solar', 'currículum de instalador PV', 'CV de instalador solar'],
    searchIntents: ['ejemplo de currículum de instalador de paneles solares', 'cómo hacer un currículum de instalador solar', 'plantilla de currículum de técnico solar'],
    topSkills: ['Instalación de Sistemas PV', 'Cableado Eléctrico', 'Sistemas de Montaje en Techo', 'Instalación de Inversores', 'Cumplimiento del Código NEC', 'Doblado de Conductos', 'Puesta en Marcha de Sistemas', 'Arnés de Seguridad / Protección contra Caídas', 'Lectura de Planos', 'Sistemas de Almacenamiento de Baterías'],
    atsKeywords: ['fotovoltaico', 'instalación PV', 'panel solar', 'cableado eléctrico', 'montaje en techo', 'inversor', 'código NEC', 'conductos', 'puesta en marcha de sistemas', 'protección contra caídas', 'NABCEP', 'almacenamiento de baterías'],
    sampleResumeData: buildResumeData({
      firstName: 'Elias',
      lastName: 'Nguyen',
      profession: 'Instalador de Paneles Solares',
      summary: 'Instalador de PV solar certificado NABCEP con más de 5 años de experiencia instalando sistemas fotovoltaicos residenciales y comerciales. Completó más de 400 instalaciones totalizando 8 MW de capacidad solar. Hábil en sistemas de montaje en techo y suelo, configuración de inversores y cumplimiento del código NEC.',
      skills: ['Instalación de Sistemas PV', 'Cableado Eléctrico', 'Sistemas de Montaje en Techo', 'Instalación de Inversores', 'Cumplimiento del Código NEC', 'Doblado de Conductos', 'Puesta en Marcha de Sistemas', 'Arnés de Seguridad / Protección contra Caídas', 'Lectura de Planos', 'Sistemas de Almacenamiento de Baterías'],
      experience: [
        {
          title: 'Instalador Solar Líder',
          company: 'SunPower Corporation',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Lidera una cuadrilla de 4 instaladores completando 3-4 instalaciones PV residenciales por semana con un promedio de 8 kW por sistema',
            'Instaló más de 180 sistemas totalizando 3.2 MW de capacidad solar con cero incidentes de seguridad',
            'Redujo el tiempo promedio de instalación en un 20% estandarizando los flujos de trabajo del equipo y pre-escenificando materiales',
          ],
        },
        {
          title: 'Instalador de PV Solar',
          company: 'Vivint Solar (ahora SunRun)',
          startDate: '2019-03',
          endDate: '2021-12',
          achievements: [
            'Instaló más de 220 sistemas PV residenciales en techo en la región Suroeste totalizando 4.8 MW de capacidad',
            'Pasó todas las inspecciones eléctricas municipales en el primer intento para el 98% de las instalaciones',
            'Obtuvo la certificación NABCEP de Profesional de Instalación PV dentro de los 2 años de ingresar a la industria solar',
          ],
        },
      ],
      education: [
        { institution: 'Ecotech Institute', degree: 'Título Asociado', field: 'Tecnología de Energía Solar', startDate: '2017-01', endDate: '2019-01' },
      ],
      certifications: [
        { name: 'Profesional de Instalación PV NABCEP', issuer: 'North American Board of Certified Energy Practitioners', date: '2021-04' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2019-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe incluir un instalador solar?', answer: 'Profesional de Instalación PV NABCEP es el estándar de oro. También incluya certificación de seguridad OSHA, licencias eléctricas estatales y cualquier capacitación específica de fabricante (SolarEdge, Enphase).' },
      { question: '¿Cómo cuantifico la experiencia en instalación solar?', answer: 'Incluya el número de sistemas instalados, total de MW de capacidad, tamaño promedio del sistema, tasas de aprobación de inspecciones y cualquier mejora de eficiencia en el tiempo de instalación.' },
      { question: '¿Es importante la experiencia eléctrica para un currículum de instalador solar?', answer: 'Sí. El cableado eléctrico, trabajo de conductos y conocimiento del código NEC son fundamentales. Destaque cualquier experiencia como electricista oficial o aprendiz si aplica.' },
    ],
  },

  'wind-turbine-technician': {
    slug: 'tecnico-de-turbinas-eolicas',
    title: 'Técnico de Turbinas Eólicas',
    keywords: ['currículum de técnico de turbinas eólicas', 'currículum de técnico de energía eólica', 'currículum de técnico eólico', 'CV de técnico de turbinas eólicas'],
    searchIntents: ['ejemplo de currículum de técnico de turbinas eólicas', 'cómo hacer un currículum de técnico eólico', 'plantilla de currículum de técnico de energía eólica'],
    topSkills: ['Mantenimiento de Turbinas', 'Diagnóstico Eléctrico', 'Sistemas Hidráulicos', 'Reparación Mecánica', 'Monitoreo SCADA', 'Seguridad en Alturas', 'Servicio de Caja de Engranajes', 'Inspección de Aspas', 'Mantenimiento Preventivo', 'Bloqueo/Etiquetado (LOTO)'],
    atsKeywords: ['turbina eólica', 'mantenimiento de turbinas', 'diagnóstico eléctrico', 'sistemas hidráulicos', 'SCADA', 'caja de engranajes', 'inspección de aspas', 'mantenimiento preventivo', 'LOTO', 'certificación GWO', 'góndola', 'escalada de torre'],
    sampleResumeData: buildResumeData({
      firstName: 'Colton',
      lastName: 'Breeze',
      profession: 'Técnico de Turbinas Eólicas',
      summary: 'Técnico de turbinas eólicas certificado GWO con más de 5 años de experiencia manteniendo y reparando turbinas eólicas terrestres. Dio servicio a más de 300 turbinas en 5 parques eólicos con una tasa de disponibilidad del 99%. Competente en sistemas eléctricos, servicio de caja de engranajes y diagnósticos SCADA.',
      skills: ['Mantenimiento de Turbinas', 'Diagnóstico Eléctrico', 'Sistemas Hidráulicos', 'Reparación Mecánica', 'Monitoreo SCADA', 'Seguridad en Alturas', 'Servicio de Caja de Engranajes', 'Inspección de Aspas', 'Mantenimiento Preventivo', 'Bloqueo/Etiquetado (LOTO)'],
      experience: [
        {
          title: 'Técnico de Turbinas Eólicas II',
          company: 'Vestas',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Realiza mantenimiento programado y no programado en más de 80 turbinas Vestas V110 y V136 en un parque eólico de 200 MW',
            'Mantuvo una tasa de disponibilidad de turbinas del 99.2%, superando el objetivo contractual del 97%',
            'Completó 15 reparaciones de caja de engranajes en torre, ahorrando un estimado de $1.5M en costos de reemplazo con grúa',
          ],
        },
        {
          title: 'Técnico de Turbinas Eólicas I',
          company: 'GE Renewable Energy',
          startDate: '2019-06',
          endDate: '2022-03',
          achievements: [
            'Dio servicio a más de 220 turbinas GE de 1.5 MW y 2.5 MW en 4 parques eólicos en la región de las Grandes Llanuras',
            'Realizó inspecciones de aspas y reparaciones menores a alturas de más de 300 pies con cero incidentes de seguridad',
            'Redujo el tiempo promedio de inactividad de turbinas en un 18% mediante procedimientos de diagnóstico mejorados y pre-escenificación de piezas',
          ],
        },
      ],
      education: [
        { institution: 'Texas State Technical College', degree: 'Título Asociado', field: 'Tecnología de Energía Eólica', startDate: '2017-08', endDate: '2019-05' },
      ],
      certifications: [
        { name: 'Capacitación Básica de Seguridad GWO (BST)', issuer: 'Global Wind Organisation', date: '2019-06' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2019-08' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones necesita un técnico de turbinas eólicas?', answer: 'La Capacitación Básica de Seguridad GWO es el estándar de la industria. También incluya la certificación OSHA, capacitación específica de fabricante (Vestas, GE, Siemens Gamesa) y cualquier licencia eléctrica.' },
      { question: '¿Cómo debe un técnico eólico describir la experiencia de mantenimiento?', answer: 'Mencione la cantidad de turbinas atendidas, modelos de turbinas, tasas de disponibilidad mantenidas y tipos específicos de reparación (caja de engranajes, aspas, eléctrico).' },
      { question: '¿Es importante listar la experiencia de escalada de torres?', answer: 'Sí. Trabajar en alturas es un aspecto definitorio del rol. Incluya la capacitación GWO en alturas, experiencia en inspección de aspas y años de escalada de torres sin incidentes.' },
    ],
  },

  'locksmith': {
    slug: 'cerrajero',
    title: 'Cerrajero',
    keywords: ['currículum de cerrajero', 'currículum de técnico cerrajero', 'currículum de cerrajero de seguridad', 'CV de cerrajero'],
    searchIntents: ['ejemplo de currículum de cerrajero', 'cómo hacer un currículum de cerrajero', 'plantilla de currículum de técnico cerrajero'],
    topSkills: ['Instalación de Cerraduras', 'Cambio de Combinación', 'Duplicado de Llaves', 'Sistemas de Acceso Electrónico', 'Manipulación de Cajas Fuertes', 'Apertura de Autos', 'Sistemas de Llave Maestra', 'Evaluaciones de Seguridad', 'Servicio al Cliente', 'Sistemas de Alarma'],
    atsKeywords: ['instalación de cerraduras', 'cambio de combinación', 'duplicado de llaves', 'acceso electrónico', 'caja fuerte', 'apertura de autos', 'llave maestra', 'evaluación de seguridad', 'cerraduras comerciales', 'cerraduras residenciales', 'ALOA'],
    sampleResumeData: buildResumeData({
      firstName: 'Vincent',
      lastName: 'Delacruz',
      profession: 'Cerrajero',
      summary: 'Cerrajero certificado por ALOA con más de 6 años de experiencia en servicios de cerraduras residenciales, comerciales y automotrices. Completó más de 5,000 llamadas de servicio con una tasa de resolución del 98% en el mismo día. Competente en control de acceso electrónico, sistemas de llave maestra y servicio de cajas fuertes.',
      skills: ['Instalación de Cerraduras', 'Cambio de Combinación', 'Duplicado de Llaves', 'Sistemas de Acceso Electrónico', 'Manipulación de Cajas Fuertes', 'Apertura de Autos', 'Sistemas de Llave Maestra', 'Evaluaciones de Seguridad', 'Servicio al Cliente', 'Sistemas de Alarma'],
      experience: [
        {
          title: 'Cerrajero Líder',
          company: 'Pop-A-Lock',
          startDate: '2021-09',
          isCurrent: true,
          achievements: [
            'Atiende 8-12 llamadas de servicio por día incluyendo aperturas, cambios de combinación e instalaciones de sistemas de acceso electrónico',
            'Generó $320K en ingresos anuales por servicio con una tasa de resolución en el mismo día del 98%',
            'Instaló y programó sistemas de control de acceso electrónico para más de 40 clientes comerciales',
          ],
        },
        {
          title: 'Técnico Cerrajero',
          company: 'ASSA ABLOY (distribuidor autorizado)',
          startDate: '2018-04',
          endDate: '2021-08',
          achievements: [
            'Realizó instalación de cerraduras, cambios de combinación y diseño de sistemas de llave maestra para más de 200 cuentas residenciales y comerciales',
            'Completó la programación de llaves automotrices para más de 30 marcas de vehículos utilizando herramientas avanzadas de transponder',
            'Obtuvo la designación de Cerrajero Registrado Certificado (CRL) de ALOA dentro de 2 años',
          ],
        },
      ],
      education: [
        { institution: 'ALOA Security Professionals Association', degree: 'Certificado', field: 'Fundamentos de Cerrajería', startDate: '2017-06', endDate: '2018-03' },
      ],
      certifications: [
        { name: 'Cerrajero Registrado Certificado (CRL)', issuer: 'ALOA Security Professionals Association', date: '2020-05' },
        { name: 'Técnico de Control de Acceso Electrónico', issuer: 'ALOA', date: '2021-11' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones debe incluir un cerrajero?', answer: 'El Cerrajero Registrado Certificado (CRL) de ALOA es el más reconocido. También incluya certificaciones de control de acceso electrónico, calificaciones de técnico de cajas fuertes y cualquier licencia de cerrajero requerida por el estado.' },
      { question: '¿Cómo describo la experiencia de cerrajería en un currículum?', answer: 'Incluya llamadas de servicio por día, ingresos generados, tipos de servicios (residencial, comercial, automotriz) y métricas de satisfacción del cliente.' },
      { question: '¿Es valiosa la experiencia en control de acceso electrónico?', answer: 'Muy valiosa. La industria está cambiando hacia los sistemas electrónicos. Destaque la experiencia con sistemas de tarjeta llave, cerraduras inteligentes y programación de control de acceso.' },
    ],
  },

  'glazier': {
    slug: 'vidriero',
    title: 'Vidriero',
    keywords: ['currículum de vidriero', 'currículum de instalador de vidrio', 'currículum de vidriero comercial', 'CV de vidriero'],
    searchIntents: ['ejemplo de currículum de vidriero', 'cómo hacer un currículum de vidriero', 'plantilla de currículum de instalador de vidrio'],
    topSkills: ['Corte y Fabricación de Vidrio', 'Instalación de Muro Cortina', 'Sistemas de Fachada Comercial', 'Sellado con Silicona', 'Lectura de Planos', 'Instalación de Ventanas', 'Vidrio Templado y Laminado', 'Cumplimiento de Seguridad', 'Andamios y Aparejo', 'Medición y Trazado'],
    atsKeywords: ['instalación de vidrio', 'muro cortina', 'fachada comercial', 'sellado con silicona', 'lectura de planos', 'instalación de ventanas', 'vidrio templado', 'vidrio laminado', 'acristalamiento comercial', 'andamios', 'OSHA'],
    sampleResumeData: buildResumeData({
      firstName: 'Stefan',
      lastName: 'Gruber',
      profession: 'Vidriero',
      summary: 'Vidriero oficial con más de 8 años de experiencia instalando muros cortina, fachadas comerciales y sistemas de vidrio arquitectónico en proyectos comerciales de gran altura. Completó trabajos de acristalamiento en más de 50 proyectos valuados entre $5M-$100M. Hábil en sellado estructural con silicona y sistemas de muro cortina unitizado.',
      skills: ['Corte y Fabricación de Vidrio', 'Instalación de Muro Cortina', 'Sistemas de Fachada Comercial', 'Sellado con Silicona', 'Lectura de Planos', 'Instalación de Ventanas', 'Vidrio Templado y Laminado', 'Cumplimiento de Seguridad', 'Andamios y Aparejo', 'Medición y Trazado'],
      experience: [
        {
          title: 'Vidriero Líder',
          company: 'Permasteelisa Group',
          startDate: '2020-06',
          isCurrent: true,
          achievements: [
            'Lidera una cuadrilla de 6 vidrieros instalando sistemas de muro cortina unitizado en proyectos de gran altura de hasta 60 pisos',
            'Instaló más de 12,000 pies cuadrados de vidrio de muro cortina en una torre de oficinas de $95M, completando el alcance 10 días antes de lo programado',
            'Mantuvo cero incidentes de seguridad durante 4 años consecutivos en sitios de construcción de gran altura',
          ],
        },
        {
          title: 'Vidriero',
          company: 'Harmon Inc.',
          startDate: '2016-03',
          endDate: '2020-05',
          achievements: [
            'Instaló sistemas de fachada, muro cortina y ventanas en más de 35 proyectos comerciales en el Medio Oeste',
            'Fabricó e instaló barandales de vidrio personalizados y marquesinas para 10 locales comerciales de lujo',
            'Completó el aprendizaje de vidriero IUPAT y logró el estatus de oficial en 4 años',
          ],
        },
      ],
      education: [
        { institution: 'IUPAT District Council Apprenticeship Program', degree: 'Certificado', field: 'Aprendizaje de Vidriero', startDate: '2016-03', endDate: '2020-03' },
      ],
      certifications: [
        { name: 'Vidriero Oficial', issuer: 'IUPAT', date: '2020-03' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2017-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué habilidades debe destacar un vidriero en su currículum?', answer: 'Enfatice la instalación de muros cortina y fachadas, tipos de vidrio con los que trabaja (templado, laminado, aislante), habilidades de sellado con silicona y experiencia en gran altura.' },
      { question: '¿Cómo cuantifico la experiencia como vidriero?', answer: 'Mencione los pies cuadrados de vidrio instalados, valores de proyectos, alturas de edificios, tamaños de cuadrilla liderados y métricas de rendimiento del cronograma.' },
      { question: '¿Es importante la experiencia de aprendizaje sindical?', answer: 'Sí. El estatus de oficial IUPAT es la vía estándar en el acristalamiento comercial. Incluya los detalles de su aprendizaje y la certificación de oficial de manera prominente.' },
    ],
  },

  'roofer': {
    slug: 'techador',
    title: 'Techador',
    keywords: ['currículum de techador', 'currículum de techado', 'currículum de techador comercial', 'CV de techador'],
    searchIntents: ['ejemplo de currículum de techador', 'cómo hacer un currículum de techado', 'plantilla de currículum de techador comercial'],
    topSkills: ['Instalación de Tejas', 'Sistemas de Techo Plano', 'Membrana TPO / EPDM', 'Reparaciones y Parcheo de Techos', 'Instalación de Botaguas', 'Demolición y Desecho', 'Arnés de Seguridad / Protección contra Caídas', 'Lectura de Planos', 'Supervisión de Cuadrilla', 'Estimación y Cuantificación de Materiales'],
    atsKeywords: ['instalación de techos', 'tejas', 'techo plano', 'TPO', 'EPDM', 'membrana de techado', 'botaguas', 'demolición', 'protección contra caídas', 'techado comercial', 'techado residencial', 'OSHA'],
    sampleResumeData: buildResumeData({
      firstName: 'Dwayne',
      lastName: 'Carpenter',
      profession: 'Techador',
      summary: 'Techador experimentado con más de 9 años en techado residencial y comercial incluyendo sistemas de tejas, TPO, EPDM y bitumen modificado. Completó más de 500 proyectos de techado con cero rellamadas por garantía en los últimos 3 años. Hábil en liderazgo de cuadrilla y estimación de materiales.',
      skills: ['Instalación de Tejas', 'Sistemas de Techo Plano', 'Membrana TPO / EPDM', 'Reparaciones y Parcheo de Techos', 'Instalación de Botaguas', 'Demolición y Desecho', 'Arnés de Seguridad / Protección contra Caídas', 'Lectura de Planos', 'Supervisión de Cuadrilla', 'Estimación y Cuantificación de Materiales'],
      experience: [
        {
          title: 'Capataz de Techado',
          company: 'CentiMark Corporation',
          startDate: '2020-04',
          isCurrent: true,
          achievements: [
            'Supervisa una cuadrilla de 10 techadores en proyectos comerciales de TPO y EPDM que van desde 5,000 hasta 80,000 pies cuadrados',
            'Completó más de 60 proyectos de techado comercial con cero rellamadas por garantía durante 4 años',
            'Redujo el desperdicio de materiales en un 15% mediante técnicas mejoradas de medición y corte, ahorrando $50K anualmente',
          ],
        },
        {
          title: 'Techador',
          company: 'GAF Master Elite Contractor (afiliado local)',
          startDate: '2015-05',
          endDate: '2020-03',
          achievements: [
            'Instaló sistemas de tejas asfálticas, metálicos y de techo plano en más de 400 proyectos residenciales y comerciales pequeños',
            'Promedió 3 instalaciones completas de techos residenciales por semana durante la temporada alta con una cuadrilla de 4 personas',
            'Logró la certificación GAF Master Elite, calificando a la empresa para el nivel más alto de garantías del fabricante',
          ],
        },
      ],
      education: [
        { institution: 'National Roofing Contractors Association (NRCA)', degree: 'Certificado', field: 'Tecnología de Techado', startDate: '2015-01', endDate: '2015-04' },
      ],
      certifications: [
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2016-02' },
        { name: 'Instalador Certificado GAF Master Elite', issuer: 'GAF', date: '2018-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones ayudan a que un currículum de techador destaque?', answer: 'Las certificaciones de fabricante (GAF Master Elite, CertainTeed SELECT) son altamente valoradas. También incluya la certificación de seguridad OSHA y cualquier licencia estatal de contratista.' },
      { question: '¿Cómo debe un techador describir la experiencia en proyectos?', answer: 'Incluya los pies cuadrados instalados, tipos de sistemas de techado, número de proyectos completados, tasas de rellamadas por garantía y tamaños de cuadrilla gestionados.' },
      { question: '¿Debo incluir experiencia tanto en techado residencial como comercial?', answer: 'Sí. Mostrar versatilidad en trabajo residencial de tejas y sistemas de membrana comercial lo hace un candidato más competitivo.' },
    ],
  },

  'painter': {
    slug: 'pintor',
    title: 'Pintor',
    keywords: ['currículum de pintor', 'currículum de pintor de casas', 'currículum de pintor comercial', 'CV de pintor'],
    searchIntents: ['ejemplo de currículum de pintor', 'cómo hacer un currículum de pintor', 'plantilla de currículum de pintor comercial'],
    topSkills: ['Pintura de Interiores', 'Pintura de Exteriores', 'Preparación de Superficies', 'Aplicación con Pistola', 'Igualación de Colores', 'Reparación de Tablaroca', 'Remoción de Papel Tapiz', 'Recubrimientos Protectores', 'Cumplimiento de Seguridad', 'Estimación'],
    atsKeywords: ['pintura de interiores', 'pintura de exteriores', 'preparación de superficies', 'pintura con pistola', 'igualación de colores', 'reparación de tablaroca', 'recubrimientos protectores', 'pintura comercial', 'pintura residencial', 'OSHA', 'remoción de plomo'],
    sampleResumeData: buildResumeData({
      firstName: 'Reginald',
      lastName: 'Oakes',
      profession: 'Pintor',
      summary: 'Pintor profesional con más de 8 años de experiencia en pintura residencial y comercial de interiores y exteriores. Completó más de 600 proyectos con un índice de satisfacción del cliente del 99%. Competente en aplicación con brocha, rodillo y pistola airless con experiencia en preparación de superficies y recubrimientos protectores.',
      skills: ['Pintura de Interiores', 'Pintura de Exteriores', 'Preparación de Superficies', 'Aplicación con Pistola', 'Igualación de Colores', 'Reparación de Tablaroca', 'Remoción de Papel Tapiz', 'Recubrimientos Protectores', 'Cumplimiento de Seguridad', 'Estimación'],
      experience: [
        {
          title: 'Pintor Líder',
          company: 'Sherwin-Williams (división de servicios comerciales)',
          startDate: '2020-08',
          isCurrent: true,
          achievements: [
            'Lidera una cuadrilla de 5 pintores en proyectos comerciales incluyendo oficinas, hospitales y espacios comerciales de hasta 100,000 pies cuadrados',
            'Completó más de 80 proyectos de pintura comercial con cero elementos en la lista de pendientes relacionados con la calidad de la pintura',
            'Redujo el desperdicio de pintura en un 12% optimizando la selección de boquillas y las técnicas de aplicación',
          ],
        },
        {
          title: 'Pintor',
          company: 'CertaPro Painters',
          startDate: '2016-03',
          endDate: '2020-07',
          achievements: [
            'Pintó más de 500 interiores y exteriores residenciales, manteniendo un puntaje de satisfacción del cliente del 99% en encuestas posteriores al trabajo',
            'Aplicó recubrimientos protectores y epóxicos industriales en 25 proyectos de pisos comerciales',
            'Obtuvo el estatus de pintor oficial IUPAT después de completar un aprendizaje de 3 años',
          ],
        },
      ],
      education: [
        { institution: 'IUPAT District Council Apprenticeship Program', degree: 'Certificado', field: 'Pintura y Decoración', startDate: '2016-03', endDate: '2019-03' },
      ],
      certifications: [
        { name: 'Renovador Certificado EPA Lead-Safe', issuer: 'EPA', date: '2017-09' },
        { name: 'OSHA 10 Horas Construcción', issuer: 'OSHA', date: '2016-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un pintor en su currículum?', answer: 'Liste los tipos de pintura en los que se especializa (residencial, comercial, industrial), métodos de aplicación (brocha, rodillo, pistola), habilidades de preparación de superficies y métricas de satisfacción del cliente.' },
      { question: '¿Es importante la certificación EPA Lead-Safe?', answer: 'Sí. Es legalmente requerida para trabajos en edificios anteriores a 1978 y demuestra profesionalismo. Inclúyala de manera prominente en su currículum.' },
      { question: '¿Cómo cuantifico la experiencia como pintor?', answer: 'Incluya el número de proyectos completados, pies cuadrados pintados, tamaños de cuadrilla gestionados, tasas de lista de pendientes y porcentajes de satisfacción del cliente.' },
    ],
  },

  'tile-setter': {
    slug: 'colocador-de-azulejos',
    title: 'Colocador de Azulejos',
    keywords: ['currículum de colocador de azulejos', 'currículum de instalador de losetas', 'currículum de instalador de pisos', 'CV de colocador de azulejos'],
    searchIntents: ['ejemplo de currículum de colocador de azulejos', 'cómo hacer un currículum de instalador de losetas', 'plantilla de currículum de colocador de azulejos'],
    topSkills: ['Instalación de Azulejos', 'Preparación de Superficies', 'Aplicación de Mortero y Thin-Set', 'Lechado y Sellado', 'Impermeabilización', 'Diseño de Patrones y Trazado', 'Operación de Sierra Húmeda', 'Instalación de Piedra Natural', 'Sistemas de Piso Radiante', 'Lectura de Planos'],
    atsKeywords: ['instalación de azulejos', 'azulejo cerámico', 'azulejo de porcelana', 'piedra natural', 'mortero', 'thin-set', 'lechado', 'impermeabilización', 'sierra húmeda', 'backsplash', 'azulejo de ducha', 'certificado CTEF'],
    sampleResumeData: buildResumeData({
      firstName: 'Dominic',
      lastName: 'Pagano',
      profession: 'Colocador de Azulejos',
      summary: 'Colocador de azulejos certificado CTEF con más de 7 años de experiencia instalando azulejos cerámicos, de porcelana y piedra natural en entornos residenciales y comerciales. Completó más de 350 proyectos con un registro de cero rellamadas en los últimos 2 años. Hábil en patrones personalizados, impermeabilización y azulejo de gran formato.',
      skills: ['Instalación de Azulejos', 'Preparación de Superficies', 'Aplicación de Mortero y Thin-Set', 'Lechado y Sellado', 'Impermeabilización', 'Diseño de Patrones y Trazado', 'Operación de Sierra Húmeda', 'Instalación de Piedra Natural', 'Sistemas de Piso Radiante', 'Lectura de Planos'],
      experience: [
        {
          title: 'Instalador Líder de Azulejos',
          company: 'Floor & Decor (división de proyectos comerciales)',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Instala un promedio de 400 pies cuadrados de azulejo por día en proyectos comerciales incluyendo vestíbulos, baños y cocinas',
            'Completó más de 120 proyectos comerciales de azulejo con cero rellamadas durante 3 años',
            'Capacitó a 3 aprendices de colocación de azulejos en sistemas de impermeabilización, mezcla de mortero y manejo de azulejo de gran formato',
          ],
        },
        {
          title: 'Colocador de Azulejos',
          company: 'Dal-Tile (Mohawk Industries)',
          startDate: '2017-05',
          endDate: '2021-01',
          achievements: [
            'Instaló azulejo cerámico, de porcelana y mármol en más de 230 proyectos residenciales incluyendo baños, cocinas y vestíbulos',
            'Se especializó en instalaciones de duchas personalizadas con sistemas de impermeabilización Schluter, logrando un 100% de resultados libres de filtraciones',
            'Obtuvo la designación de Instalador de Azulejos Certificado (CTI) a través de la Ceramic Tile Education Foundation',
          ],
        },
      ],
      education: [
        { institution: 'Ceramic Tile Education Foundation (CTEF)', degree: 'Certificado', field: 'Instalación de Azulejos', startDate: '2017-01', endDate: '2017-04' },
      ],
      certifications: [
        { name: 'Instalador de Azulejos Certificado (CTI)', issuer: 'Ceramic Tile Education Foundation', date: '2019-06' },
        { name: 'Instalador Certificado Schluter', issuer: 'Schluter Systems', date: '2018-11' },
      ],
    }),
    faqs: [
      { question: '¿Qué certificaciones importan para un colocador de azulejos?', answer: 'El Instalador de Azulejos Certificado (CTI) de CTEF es el más reconocido. La certificación del sistema Schluter también es valorada por su experiencia en impermeabilización.' },
      { question: '¿Cómo describo la experiencia en colocación de azulejos?', answer: 'Incluya los pies cuadrados instalados por día, número de proyectos, tipos de azulejo (cerámico, porcelana, piedra), trabajo especializado (duchas, pisos radiantes) y tasas de rellamadas.' },
      { question: '¿Debo incluir habilidades de impermeabilización?', answer: 'Sí. La impermeabilización es crítica para áreas húmedas. Mencione los sistemas específicos que utiliza (Schluter, Laticrete, RedGard) y su registro de instalaciones libres de filtraciones.' },
    ],
  },

  'ironworker': {
    slug: 'herrero',
    title: 'Herrero Estructural',
    keywords: ['currículum de herrero estructural', 'currículum de trabajador de hierro', 'currículum de montador de estructuras', 'CV de herrero estructural'],
    searchIntents: ['ejemplo de currículum de herrero estructural', 'cómo hacer un currículum de trabajador de hierro', 'plantilla de currículum de montador de estructuras'],
    topSkills: ['Montaje de Acero Estructural', 'Soldadura (Electrodo, MIG)', 'Aparejo y Señalización', 'Lectura de Planos', 'Instalación de Varilla', 'Atornillado y Torque', 'Señalización de Grúa', 'Seguridad en Alturas', 'Instalación de Placa Metálica', 'Cumplimiento OSHA'],
    atsKeywords: ['acero estructural', 'trabajo de hierro', 'soldadura', 'aparejo', 'varilla', 'atornillado', 'señalización de grúa', 'placa metálica', 'montaje', 'lectura de planos', 'OSHA', 'protección contra caídas'],
    sampleResumeData: buildResumeData({
      firstName: 'Terrence',
      lastName: 'Callahan',
      profession: 'Herrero Estructural',
      summary: 'Herrero estructural oficial con más de 10 años de experiencia en montaje de acero estructural, soldadura y aparejo en proyectos comerciales y de infraestructura. Montó acero en más de 40 proyectos valuados en hasta $150M. Mantuvo un registro de cero incidentes con tiempo perdido durante toda su carrera.',
      skills: ['Montaje de Acero Estructural', 'Soldadura (Electrodo, MIG)', 'Aparejo y Señalización', 'Lectura de Planos', 'Instalación de Varilla', 'Atornillado y Torque', 'Señalización de Grúa', 'Seguridad en Alturas', 'Instalación de Placa Metálica', 'Cumplimiento OSHA'],
      experience: [
        {
          title: 'Herrero Estructural Oficial',
          company: 'W&W | AFCO Steel',
          startDate: '2019-09',
          isCurrent: true,
          achievements: [
            'Monta vigas, columnas y conexiones de acero estructural en proyectos comerciales valuados en hasta $150M',
            'Lideró una cuadrilla de montaje de 6 personas que colocó un promedio de 30 toneladas de acero por día en un edificio de 20 pisos',
            'Mantuvo cero incidentes con tiempo perdido durante más de 5 años mediante estricta adherencia a protocolos de protección contra caídas y aparejo',
          ],
        },
        {
          title: 'Aprendiz / Herrero Estructural',
          company: 'Schuff Steel',
          startDate: '2014-03',
          endDate: '2019-08',
          achievements: [
            'Instaló acero estructural, placa metálica y varilla en más de 25 proyectos comerciales y de puentes en el Suroeste',
            'Realizó soldadura de campo y conexiones atornilladas en marcos rígidos y marcos arriostrados según estándares AWS D1.1',
            'Completó el aprendizaje de 4 años de Ironworkers International y obtuvo la clasificación de oficial',
          ],
        },
      ],
      education: [
        { institution: 'Ironworkers Local Apprenticeship Program', degree: 'Certificado', field: 'Trabajo Estructural en Hierro', startDate: '2014-03', endDate: '2018-03' },
      ],
      certifications: [
        { name: 'Certificación de Soldadura Estructural AWS D1.1', issuer: 'American Welding Society', date: '2016-05' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2015-01' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe enfatizar un herrero estructural en su currículum?', answer: 'Destaque el tonelaje de acero estructural montado, valores de proyectos, certificaciones de soldadura, experiencia en aparejo y registros de seguridad incluyendo años sin incidentes con tiempo perdido.' },
      { question: '¿Son importantes las certificaciones de soldadura para herreros estructurales?', answer: 'Sí. La certificación de soldadura estructural AWS D1.1 es esencial para la soldadura de campo en estructuras de acero. Incluya cada proceso y posición en la que está certificado.' },
      { question: '¿Debo incluir el aprendizaje de herreros?', answer: 'Absolutamente. El aprendizaje de Ironworkers International es la vía principal para ingresar al oficio. Incluya la duración, estatus de oficial y cualquier especialización (estructural, refuerzo, ornamental).' },
    ],
  },

  'sheet-metal-worker': {
    slug: 'trabajador-de-hojalateria',
    title: 'Trabajador de Hojalatería',
    keywords: ['currículum de trabajador de hojalatería', 'currículum de mecánico de lámina', 'currículum de hojalatería HVAC', 'CV de trabajador de hojalatería'],
    searchIntents: ['ejemplo de currículum de trabajador de hojalatería', 'cómo hacer un currículum de trabajador de hojalatería', 'plantilla de currículum de mecánico de lámina'],
    topSkills: ['Fabricación de Lámina', 'Instalación de Ductos', 'Corte con Plasma y Láser', 'Lectura de Planos', 'Soldadura TIG y MIG', 'Soldadura Blanda y Braseo', 'Sistemas HVAC', 'Operación de Prensa Dobladora CNC', 'Trabajo de Metal Arquitectónico', 'Cumplimiento de Seguridad OSHA'],
    atsKeywords: ['fabricación de lámina', 'ductos', 'corte con plasma', 'corte con láser', 'soldadura TIG', 'soldadura MIG', 'soldadura blanda', 'ductos HVAC', 'prensa dobladora CNC', 'metal arquitectónico', 'lectura de planos', 'OSHA', 'SMACNA'],
    sampleResumeData: buildResumeData({
      firstName: 'Franklin',
      lastName: 'Watts',
      profession: 'Trabajador de Hojalatería',
      summary: 'Trabajador de hojalatería oficial con más de 9 años de experiencia en fabricación de ductos HVAC, instalación y trabajo de metal arquitectónico. Fabricó e instaló ductos en más de 70 proyectos comerciales con una tasa de aprobación de inspección del 100% en primer pase. Competente en prensa dobladora CNC, corte con plasma y soldadura TIG.',
      skills: ['Fabricación de Lámina', 'Instalación de Ductos', 'Corte con Plasma y Láser', 'Lectura de Planos', 'Soldadura TIG y MIG', 'Soldadura Blanda y Braseo', 'Sistemas HVAC', 'Operación de Prensa Dobladora CNC', 'Trabajo de Metal Arquitectónico', 'Cumplimiento de Seguridad OSHA'],
      experience: [
        {
          title: 'Trabajador de Hojalatería Oficial',
          company: 'Anning-Johnson Company',
          startDate: '2020-01',
          isCurrent: true,
          achievements: [
            'Fabrica e instala sistemas de ductos HVAC para proyectos comerciales con un promedio de $15M, manejando más de 2,000 lbs de lámina por proyecto',
            'Logró una tasa de aprobación de inspección del 100% en primer pase en todas las instalaciones de ductos durante más de 4 años',
            'Mentor de 3 aprendices de hojalatería en técnicas de trazado, fabricación e instalación',
          ],
        },
        {
          title: 'Aprendiz / Mecánico de Hojalatería',
          company: 'Southland Industries',
          startDate: '2015-06',
          endDate: '2019-12',
          achievements: [
            'Fabricó ductos, accesorios y transiciones en un taller de producción que procesaba 50,000 lbs de lámina mensuales',
            'Instaló ductos y paneles de metal arquitectónico en más de 40 proyectos comerciales y hospitalarios',
            'Completó el programa de aprendizaje de 5 años del SMART Local Union y obtuvo la clasificación de oficial',
          ],
        },
      ],
      education: [
        { institution: 'SMART (Sheet Metal Workers International) Apprenticeship', degree: 'Certificado', field: 'Tecnología de Hojalatería', startDate: '2015-06', endDate: '2020-06' },
      ],
      certifications: [
        { name: 'Trabajador de Hojalatería Oficial', issuer: 'SMART International', date: '2020-06' },
        { name: 'OSHA 30 Horas Construcción', issuer: 'OSHA', date: '2016-09' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe destacar un trabajador de hojalatería en su currículum?', answer: 'Enfatice los métodos de fabricación (CNC, plasma, soldadura TIG), tipos de proyectos (ductos HVAC, arquitectónico), valores de proyectos y tasas de aprobación de inspecciones.' },
      { question: '¿Es importante incluir el aprendizaje SMART?', answer: 'Sí. El aprendizaje de SMART (Sheet Metal Workers International) es la vía estándar. Incluya la duración del programa, estatus de oficial y cualquier área de especialización.' },
      { question: '¿Cómo cuantifico el trabajo de hojalatería?', answer: 'Incluya libras o pies lineales de metal fabricado, número de proyectos completados, tasas de aprobación de inspecciones y cualquier mejora de eficiencia o reducción de desperdicio.' },
    ],
  },
};
