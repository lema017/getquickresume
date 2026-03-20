import { buildResumeData } from './_helpers';
import type { ProfessionEsData } from './index';

export const translations: Record<string, ProfessionEsData> = {
  'administrative-assistant': {
    slug: 'asistente-administrativo',
    title: 'Asistente Administrativo',
    keywords: ['currículum de asistente administrativo', 'currículum de asistente de oficina', 'CV de secretaria', 'currículum de asistente admin'],
    searchIntents: ['ejemplo de currículum de asistente administrativo', 'cómo escribir un currículum de asistente administrativo', 'plantilla de CV de asistente de oficina'],
    topSkills: ['Gestión de Agenda', 'Microsoft Office Suite', 'Captura de Datos', 'Coordinación de Viajes', 'Coordinación de Reuniones', 'Archivo y Organización', 'Comunicación', 'Atención al Cliente'],
    atsKeywords: ['administración de oficina', 'programación', 'correspondencia', 'gestión de registros', 'informes de gastos', 'asistencia ejecutiva', 'preparación de documentos', 'gestión de suministros de oficina'],
    sampleResumeData: buildResumeData({
      firstName: 'Laura',
      lastName: 'Bennett',
      profession: 'Asistente Administrativo',
      summary: 'Asistente administrativo detallista con 5 años de experiencia apoyando a ejecutivos de nivel C y gestionando operaciones de oficina. Coordinó más de 200 reuniones anuales, procesó $150K en informes de gastos y mejoró los sistemas de archivo, reduciendo el tiempo de recuperación de documentos en un 40%.',
      skills: ['Microsoft Office 365', 'Gestión de Agenda', 'Coordinación de Viajes', 'Informes de Gastos', 'Captura de Datos', 'Software CRM', 'Coordinación de Reuniones', 'Gestión Documental', 'Atención al Cliente', 'Gestión de Inventario'],
      experience: [
        {
          title: 'Asistente Administrativo Ejecutivo',
          company: 'Deloitte',
          startDate: '2021-05',
          isCurrent: true,
          achievements: [
            'Apoya a 3 Directores Generales gestionando agendas, coordinando más de 200 reuniones y organizando viajes nacionales e internacionales',
            'Procesa más de $150K en informes de gastos anuales con 100% de precisión y cumplimiento de la política corporativa de viajes',
            'Optimizó el sistema de gestión documental, reduciendo el tiempo promedio de recuperación en un 40% en todo el departamento',
          ],
        },
        {
          title: 'Asistente Administrativo',
          company: 'Johnson & Johnson',
          startDate: '2019-01',
          endDate: '2021-04',
          achievements: [
            'Brindó soporte administrativo a un equipo de 15 profesionales de marketing incluyendo programación, correspondencia y pedido de suministros',
            'Organizó 12 eventos fuera de la oficina y actividades de integración para más de 50 participantes con presupuestos de hasta $10K',
            'Mantuvo el inventario de suministros de oficina y negoció contratos con proveedores, ahorrando $5K anuales',
          ],
        },
      ],
      education: [
        { institution: 'Rutgers University', degree: 'B.A.', field: 'Estudios de Comunicación', startDate: '2015-09', endDate: '2019-05' },
      ],
      certifications: [
        { name: 'Microsoft Office Specialist (MOS)', issuer: 'Microsoft', date: '2020-03' },
        { name: 'Certified Administrative Professional (CAP)', issuer: 'International Association of Administrative Professionals', date: '2021-08' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe destacar un asistente administrativo en su currículum?', answer: 'Enfóquese en la eficiencia organizativa, el alcance del apoyo ejecutivo (cuántos ejecutivos), dominio de software, coordinación de reuniones/eventos y cualquier contribución a la mejora de procesos.' },
      { question: '¿Es necesaria una certificación para puestos de asistente administrativo?', answer: 'No es obligatoria, pero las certificaciones CAP (Certified Administrative Professional) o MOS (Microsoft Office Specialist) pueden diferenciarlo de otros candidatos.' },
      { question: '¿Cómo hago que mi currículum de asistente administrativo destaque?', answer: 'Cuantifique todo: reuniones coordinadas, informes de gastos procesados, eventos organizados, ahorros logrados y mejoras en tiempos de respuesta.' },
    ],
  },
  'architect': {
    slug: 'arquitecto',
    title: 'Arquitecto',
    keywords: ['currículum de arquitecto', 'currículum de arquitectura', 'CV de arquitecto', 'currículum de arquitecto licenciado'],
    searchIntents: ['ejemplo de currículum de arquitecto', 'cómo escribir un currículum de arquitectura', 'plantilla de CV de arquitecto'],
    topSkills: ['AutoCAD', 'Revit', 'SketchUp', 'Desarrollo de Diseño', 'Documentos de Construcción', 'Códigos de Edificación', 'Gestión de Proyectos', 'Renderizado 3D'],
    atsKeywords: ['diseño arquitectónico', 'diseño esquemático', 'certificación LEED', 'coordinación BIM', 'administración de construcción', 'cumplimiento de zonificación', 'presentaciones a clientes', 'diseño sustentable'],
    sampleResumeData: buildResumeData({
      firstName: 'Daniel',
      lastName: 'Moreau',
      profession: 'Arquitecto',
      summary: 'Arquitecto licenciado con 8 años de experiencia diseñando proyectos comerciales y residenciales con un valor total de construcción de $120M. Certificado LEED AP con experiencia en diseño sustentable, coordinación BIM y gestión de relaciones con clientes. Ganador de 3 premios de diseño AIA.',
      skills: ['Revit', 'AutoCAD', 'SketchUp Pro', 'Rhino/Grasshopper', 'Adobe Creative Suite', 'Coordinación BIM', 'Análisis de Códigos de Edificación', 'Diseño LEED', 'Documentos de Construcción', 'Presentaciones a Clientes'],
      experience: [
        {
          title: 'Arquitecto de Proyecto',
          company: 'Gensler',
          startDate: '2020-03',
          isCurrent: true,
          achievements: [
            'Lidera el diseño y documentación de más de 10 proyectos comerciales con un valor total de construcción de $80M',
            'Ganó 2 Premios de Excelencia en Diseño AIA por proyectos innovadores de espacios de trabajo y desarrollo de uso mixto',
            'Gestionó la coordinación BIM entre disciplinas arquitectónicas, estructurales y MEP para una torre de oficinas de 250,000 SF',
          ],
        },
        {
          title: 'Arquitecto II',
          company: 'Perkins&Will',
          startDate: '2016-09',
          endDate: '2020-02',
          achievements: [
            'Desarrolló desde el diseño esquemático hasta los documentos de construcción para 8 proyectos de salud y educación',
            'Obtuvo la certificación LEED Gold para 3 proyectos mediante selección de materiales sustentables y modelado energético',
            'Presentó conceptos de diseño a clientes y partes interesadas, asegurando aprobaciones por $40M en alcance de proyectos',
          ],
        },
      ],
      education: [
        { institution: 'Columbia University GSAPP', degree: 'M.Arch.', field: 'Arquitectura', startDate: '2012-09', endDate: '2015-05' },
        { institution: 'University of Virginia', degree: 'B.S.', field: 'Arquitectura', startDate: '2008-09', endDate: '2012-05' },
      ],
      certifications: [
        { name: 'Arquitecto Licenciado', issuer: 'New York State Board of Architecture', date: '2018-04' },
        { name: 'LEED AP BD+C', issuer: 'U.S. Green Building Council', date: '2017-09' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un arquitecto en su currículum?', answer: 'Destaque tipos de proyectos, valores de construcción, dominio de software (Revit, AutoCAD), licenciatura, credenciales LEED y premios de diseño.' },
      { question: '¿Los arquitectos deben usar un formato de currículum creativo o tradicional?', answer: 'Un currículum limpio y bien diseñado que demuestre sensibilidad visual es apropiado. Incluya un enlace a su portafolio para mostrar el trabajo detallado del proyecto.' },
      { question: '¿Es importante la licencia ARE para el currículum de un arquitecto?', answer: 'Sí. Los arquitectos licenciados obtienen salarios más altos y pueden firmar planos. Incluya su licencia y registro estatal de manera prominente.' },
    ],
  },
  'attorney': {
    slug: 'abogado',
    title: 'Abogado',
    keywords: ['currículum de abogado', 'currículum de abogado litigante', 'CV legal', 'currículum vitae de abogado'],
    searchIntents: ['ejemplo de currículum de abogado', 'cómo escribir un currículum de abogado', 'plantilla de currículum legal'],
    topSkills: ['Investigación Legal', 'Redacción de Contratos', 'Litigación', 'Asesoría a Clientes', 'Negociación', 'Escritura Legal', 'Cumplimiento Regulatorio', 'Gestión de Casos'],
    atsKeywords: ['admisión al colegio de abogados', 'declaración', 'descubrimiento', 'práctica de mociones', 'preparación para juicio', 'derecho corporativo', 'debida diligencia', 'negociación de acuerdos'],
    sampleResumeData: buildResumeData({
      firstName: 'Katherine',
      lastName: 'Sullivan',
      profession: 'Abogada',
      summary: 'Abogada colegiada con 7 años de experiencia en litigación corporativa y derecho contractual. Gestionó exitosamente una cartera de más de 40 casos activos, logrando resultados favorables en el 85% de los asuntos litigados. Negoció acuerdos por un total de $12M para clientes corporativos.',
      skills: ['Litigación Corporativa', 'Redacción y Revisión de Contratos', 'Investigación Legal (Westlaw/LexisNexis)', 'Preparación de Declaraciones', 'Práctica de Mociones', 'Negociación de Acuerdos', 'Cumplimiento Regulatorio', 'Asesoría a Clientes', 'Gestión de Casos', 'Debida Diligencia'],
      experience: [
        {
          title: 'Abogada Asociada',
          company: 'Baker McKenzie',
          startDate: '2020-09',
          isCurrent: true,
          achievements: [
            'Gestiona una cartera de más de 40 casos activos de litigación comercial con una tasa de resultados favorables del 85%',
            'Negoció acuerdos por un total de $12M en nombre de clientes corporativos Fortune 500',
            'Redactó y revisó más de 200 contratos incluyendo acuerdos de M&A, NDAs y acuerdos de licenciamiento',
          ],
        },
        {
          title: 'Abogada Junior',
          company: 'White & Case LLP',
          startDate: '2017-10',
          endDate: '2020-08',
          achievements: [
            'Realizó investigación legal y redactó memorandos para más de 30 asuntos corporativos y de valores',
            'Preparó testigos y exhibiciones para 8 declaraciones y 2 juicios con jurado',
            'Realizó debida diligencia para 5 transacciones de M&A con valor superior a $500M',
          ],
        },
      ],
      education: [
        { institution: 'Georgetown University Law Center', degree: 'J.D.', field: 'Derecho', startDate: '2014-09', endDate: '2017-05' },
        { institution: 'University of Virginia', degree: 'B.A.', field: 'Ciencias Políticas', startDate: '2010-09', endDate: '2014-05' },
      ],
      certifications: [
        { name: 'Admisión al Colegio de Abogados – New York', issuer: 'New York State Bar', date: '2017-11' },
        { name: 'Admisión al Colegio de Abogados – District of Columbia', issuer: 'DC Bar', date: '2018-03' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un abogado en su currículum?', answer: 'Incluya admisiones al colegio de abogados, áreas de práctica, resultados de casos, valores de transacciones, clientes notables (si está permitido) y competencia en investigación y escritura legal.' },
      { question: '¿Debo incluir mi GPA y ranking de la escuela de derecho?', answer: 'Incluya el GPA y ranking si son destacados (top 25%). Para abogados con más de 5 años de experiencia, los logros profesionales importan más que las credenciales académicas.' },
      { question: '¿Cómo describo mi experiencia en litigación en el currículum?', answer: 'Especifique tipos de casos, tamaño de la cartera, tasa de resultados favorables, montos de acuerdos y experiencia en declaraciones y juicios.' },
    ],
  },
  'bank-teller': {
    slug: 'cajero-de-banco',
    title: 'Cajero de Banco',
    keywords: ['currículum de cajero de banco', 'currículum bancario', 'currículum de cajero', 'CV de cajero de banco'],
    searchIntents: ['ejemplo de currículum de cajero de banco', 'cómo escribir un currículum de cajero de banco', 'plantilla de CV de cajero'],
    topSkills: ['Manejo de Efectivo', 'Atención al Cliente', 'Procesamiento de Transacciones', 'Venta Cruzada', 'Atención al Detalle', 'Software Bancario', 'Cumplimiento Regulatorio', 'Resolución de Problemas'],
    atsKeywords: ['cuadre de caja', 'apertura de cuentas', 'productos financieros', 'detección de fraude', 'cumplimiento BSA/AML', 'procesamiento de depósitos', 'transferencias bancarias', 'incorporación de clientes'],
    sampleResumeData: buildResumeData({
      firstName: 'Michelle',
      lastName: 'Rodriguez',
      profession: 'Cajera de Banco',
      summary: 'Cajera de banco orientada al cliente con 4 años de experiencia procesando más de 150 transacciones diarias con una tasa de precisión del 99.9%. Superó las metas de venta cruzada en un 130% y mantuvo cero discrepancias de caja durante 18 meses consecutivos.',
      skills: ['Manejo de Efectivo', 'Procesamiento de Transacciones', 'Atención al Cliente', 'Venta Cruzada', 'Apertura de Cuentas', 'Software Bancario (FIS/Jack Henry)', 'Detección de Fraude', 'Cumplimiento BSA/AML', 'Transferencias Bancarias', 'Resolución de Conflictos'],
      experience: [
        {
          title: 'Cajera de Banco Senior',
          company: 'Wells Fargo',
          startDate: '2022-01',
          isCurrent: true,
          achievements: [
            'Procesa más de 150 transacciones diarias incluyendo depósitos, retiros, transferencias bancarias y cheques de caja con 99.9% de precisión',
            'Superó las metas trimestrales de venta cruzada en un 130%, refiriendo a más de 40 clientes por mes a asesores financieros y oficiales de préstamos',
            'Mantuvo cero discrepancias de caja durante 18 meses consecutivos gestionando una caja con un promedio diario de $50K',
          ],
        },
        {
          title: 'Cajera de Banco',
          company: 'Chase Bank',
          startDate: '2020-04',
          endDate: '2021-12',
          achievements: [
            'Procesó más de 120 transacciones diarias y abrió más de 15 cuentas nuevas mensualmente',
            'Identificó y reportó 8 transacciones potencialmente fraudulentas, previniendo $25K en pérdidas',
            'Recibió el reconocimiento "Estrella de Servicio al Cliente" durante 3 trimestres consecutivos por las puntuaciones más altas de satisfacción en la sucursal',
          ],
        },
      ],
      education: [
        { institution: 'Miami Dade College', degree: 'A.S.', field: 'Administración de Empresas', startDate: '2018-08', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'Certified Bank Teller', issuer: 'American Bankers Association', date: '2020-09' },
      ],
      languages: [
        { name: 'Inglés', level: 'native' },
        { name: 'Español', level: 'native' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe destacar un cajero de banco en su currículum?', answer: 'Enfóquese en el volumen de transacciones, precisión en manejo de efectivo, logros de venta cruzada, puntuaciones de satisfacción del cliente y contribuciones en detección de fraude.' },
      { question: '¿Se requiere un título para ser cajero de banco?', answer: 'La mayoría de los bancos requieren diploma de preparatoria. Un título técnico en negocios o finanzas y habilidades bilingües son diferenciadores fuertes.' },
      { question: '¿Cómo muestro crecimiento profesional en un currículum de cajero de banco?', answer: 'Destaque promociones, responsabilidades incrementadas, roles de capacitación y progresión hacia puestos de banquero personal o gerente de relaciones.' },
    ],
  },
  'business-development-representative': {
    slug: 'representante-de-desarrollo-de-negocios',
    title: 'Representante de Desarrollo de Negocios',
    keywords: ['currículum de representante de desarrollo de negocios', 'currículum de BDR', 'currículum de SDR', 'currículum de desarrollo de ventas'],
    searchIntents: ['ejemplo de currículum de BDR', 'cómo escribir un currículum de desarrollo de negocios', 'plantilla de currículum de SDR'],
    topSkills: ['Llamadas en Frío', 'Prospección por Email', 'Gestión de CRM', 'Generación de Pipeline', 'Calificación de Leads', 'Salesforce', 'Comunicación', 'Investigación de Mercado'],
    atsKeywords: ['prospección saliente', 'generación de SQL', 'agendamiento de demos', 'mapeo de cuentas', 'pipeline de ingresos', 'cadencia de ventas', 'segmentación ICP', 'cumplimiento de cuota'],
    sampleResumeData: buildResumeData({
      firstName: 'Tyler',
      lastName: 'Jackson',
      profession: 'Representante de Desarrollo de Negocios',
      summary: 'BDR orientado a resultados con 3 años de experiencia generando pipeline calificado para empresas B2B SaaS. Superó consistentemente la cuota en más del 125%, generando $4.2M en pipeline calificado en 12 meses. Hábil en prospección multicanal, investigación de cuentas y CRM Salesforce.',
      skills: ['Prospección Saliente', 'Llamadas en Frío', 'Campañas de Email', 'Salesforce', 'LinkedIn Sales Navigator', 'Outreach.io', 'Calificación de Leads (BANT/MEDDIC)', 'Generación de Pipeline', 'Investigación de Cuentas', 'Agendamiento de Demos'],
      experience: [
        {
          title: 'Representante de Desarrollo de Negocios',
          company: 'HubSpot',
          startDate: '2022-03',
          isCurrent: true,
          achievements: [
            'Generó $4.2M en pipeline de ventas calificado en 12 meses, superando la cuota en un 135%',
            'Agendó más de 25 demos mensuales mediante llamadas en frío, secuencias personalizadas de email y prospección en LinkedIn',
            'Logró una tasa de apertura de email del 45% y una tasa de respuesta del 8% en campañas salientes, 2 veces el promedio del equipo',
          ],
        },
        {
          title: 'Representante de Desarrollo de Ventas',
          company: 'ZoomInfo',
          startDate: '2021-01',
          endDate: '2022-02',
          achievements: [
            'Realizó más de 60 llamadas en frío y envió más de 40 emails personalizados diariamente, agendando más de 15 demos por mes',
            'Superó la cuota trimestral de SQL en un 125% durante 4 trimestres consecutivos',
            'Capacitó a 3 nuevos SDRs en el playbook de prospección saliente, contribuyendo a una mejora del 20% en las tasas de conversión del equipo',
          ],
        },
      ],
      education: [
        { institution: 'University of Georgia', degree: 'B.B.A.', field: 'Marketing', startDate: '2017-09', endDate: '2021-05' },
      ],
      certifications: [
        { name: 'Salesforce Certified Administrator', issuer: 'Salesforce', date: '2022-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un BDR en su currículum?', answer: 'Destaque pipeline generado, porcentaje de cumplimiento de cuota, demos agendadas, métricas de actividad (llamadas, emails) y dominio de CRM y herramientas tecnológicas.' },
      { question: '¿Cómo cuantifico el desempeño como BDR?', answer: 'Reporte el pipeline generado mensual/trimestral en dólares, porcentaje de cumplimiento de cuota, demos agendadas por mes y volúmenes de actividad saliente.' },
      { question: '¿Qué herramientas debe conocer un BDR?', answer: 'Salesforce, Outreach/SalesLoft, LinkedIn Sales Navigator, ZoomInfo/Apollo y Gong son las herramientas más buscadas para roles de BDR.' },
    ],
  },
  'call-center-agent': {
    slug: 'agente-de-call-center',
    title: 'Agente de Call Center',
    keywords: ['currículum de agente de call center', 'currículum de representante de call center', 'currículum de agente de servicio al cliente', 'currículum de call center'],
    searchIntents: ['ejemplo de currículum de agente de call center', 'cómo escribir un currículum de call center', 'plantilla de CV de agente de servicio al cliente'],
    topSkills: ['Atención al Cliente', 'Manejo de Llamadas', 'Sistemas CRM', 'Resolución de Problemas', 'Captura de Datos', 'Escucha Activa', 'Resolución de Conflictos', 'Multitarea'],
    atsKeywords: ['llamadas entrantes', 'llamadas salientes', 'resolución en primer contacto', 'tiempo promedio de manejo', 'satisfacción del cliente', 'sistema de tickets', 'ventas adicionales', 'aseguramiento de calidad'],
    sampleResumeData: buildResumeData({
      firstName: 'Ashley',
      lastName: 'Coleman',
      profession: 'Agente de Call Center',
      summary: 'Agente de call center orientada al cliente con 3 años de experiencia manejando más de 80 llamadas entrantes diarias. Logró una puntuación de satisfacción del cliente (CSAT) del 94% y una tasa de resolución en primer contacto del 88%. Reconocida como mejor agente por ventas adicionales de $120K en servicios anuales.',
      skills: ['Llamadas Entrantes/Salientes', 'CRM (Zendesk/Salesforce)', 'Resolución en Primer Contacto', 'Escucha Activa', 'Resolución de Conflictos', 'Ventas Adicionales', 'Captura de Datos', 'Sistemas de Tickets', 'Multitarea', 'Aseguramiento de Calidad'],
      experience: [
        {
          title: 'Agente de Call Center',
          company: 'Comcast Xfinity',
          startDate: '2022-06',
          isCurrent: true,
          achievements: [
            'Atiende más de 80 llamadas entrantes diarias de clientes sobre facturación, soporte técnico y consultas de servicio',
            'Mantuvo una puntuación CSAT del 94% y una tasa de resolución en primer contacto del 88%, ubicándose en el top 10% de agentes',
            'Generó $120K en ventas adicionales anuales incluyendo paquetes premium y actualizaciones de equipo',
          ],
        },
        {
          title: 'Representante de Servicio al Cliente',
          company: 'T-Mobile',
          startDate: '2021-01',
          endDate: '2022-05',
          achievements: [
            'Resolvió más de 60 consultas de clientes diariamente a través de teléfono, chat y correo electrónico',
            'Redujo el tiempo promedio de manejo en 45 segundos mediante flujos de trabajo de resolución mejorados',
            'Logró 100% de cumplimiento con los estándares de aseguramiento de calidad en 6 auditorías mensuales consecutivas',
          ],
        },
      ],
      education: [
        { institution: 'Community College of Denver', degree: 'A.A.', field: 'Estudios Generales', startDate: '2019-01', endDate: '2020-12' },
      ],
    }),
    faqs: [
      { question: '¿Qué métricas debe incluir un agente de call center en su currículum?', answer: 'Incluya puntuaciones CSAT, tasa de resolución en primer contacto, tiempo promedio de manejo, volumen de llamadas por día y cualquier logro de ventas adicionales o retención.' },
      { question: '¿Cómo hago que un currículum de call center destaque?', answer: 'Cuantifique su desempeño: percentil de ranking, puntuaciones CSAT, tasas de resolución e ingresos generados por ventas adicionales.' },
      { question: '¿Qué habilidades buscan los empleadores de call center?', answer: 'Escucha activa, resolución de conflictos, multitarea, dominio de CRM (Zendesk, Salesforce) y la capacidad de mantener la compostura bajo presión.' },
    ],
  },
  'call-center-supervisor': {
    slug: 'supervisor-de-call-center',
    title: 'Supervisor de Call Center',
    keywords: ['currículum de supervisor de call center', 'currículum de gerente de call center', 'CV de supervisor de centro de contacto', 'currículum de líder de equipo de call center'],
    searchIntents: ['ejemplo de currículum de supervisor de call center', 'cómo escribir un currículum de supervisor de call center', 'plantilla de CV de gerente de centro de contacto'],
    topSkills: ['Liderazgo de Equipo', 'Gestión de Desempeño', 'Aseguramiento de Calidad', 'Gestión de Fuerza Laboral', 'Seguimiento de KPIs', 'Coaching', 'Resolución de Conflictos', 'Mejora de Procesos'],
    atsKeywords: ['desempeño de agentes', 'acuerdo de nivel de servicio', 'gestión de escalaciones', 'monitoreo de llamadas', 'cumplimiento de horarios', 'reducción de deserción', 'desarrollo de capacitación', 'retención de clientes'],
    sampleResumeData: buildResumeData({
      firstName: 'Derek',
      lastName: 'Mason',
      profession: 'Supervisor de Call Center',
      summary: 'Supervisor de call center con 6 años de experiencia gestionando equipos de más de 20 agentes en entornos de alto volumen de llamadas entrantes. Mejoró el CSAT del equipo del 82% al 93% y redujo la deserción de agentes en un 35% mediante coaching dirigido y programas de incentivos.',
      skills: ['Liderazgo de Equipo', 'Coaching de Desempeño', 'Aseguramiento de Calidad', 'Gestión de Fuerza Laboral', 'Análisis de KPIs', 'Manejo de Escalaciones', 'Zendesk/Five9', 'Desarrollo de Capacitación', 'Mejora de Procesos', 'Programación de Turnos'],
      experience: [
        {
          title: 'Supervisor de Call Center',
          company: 'Amazon Customer Service',
          startDate: '2021-02',
          isCurrent: true,
          achievements: [
            'Supervisa un equipo de 25 agentes que manejan más de 2,000 llamadas entrantes diarias de soporte de pedidos y devoluciones',
            'Mejoró el CSAT del equipo del 82% al 93% en 18 meses mediante coaching dirigido y monitoreo de llamadas',
            'Redujo la deserción de agentes en un 35% implementando programas de mentoría e incentivos basados en desempeño',
          ],
        },
        {
          title: 'Agente Senior de Call Center / Líder de Equipo',
          company: 'AT&T',
          startDate: '2018-04',
          endDate: '2021-01',
          achievements: [
            'Lideró un equipo de 12 agentes, realizando sesiones de coaching semanales y revisiones de desempeño',
            'Logró un 95% de cumplimiento de SLA optimizando turnos y rotaciones de descanso usando software WFM',
            'Desarrolló un plan de capacitación para nuevos empleados que redujo el tiempo de ramp-up de 6 semanas a 4 semanas',
          ],
        },
      ],
      education: [
        { institution: 'University of Phoenix', degree: 'B.S.', field: 'Administración de Empresas', startDate: '2014-09', endDate: '2018-05' },
      ],
      certifications: [
        { name: 'Certified Call Center Manager (CCCM)', issuer: 'International Customer Management Institute', date: '2021-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe destacar un supervisor de call center en su currículum?', answer: 'Enfatice el tamaño del equipo gestionado, mejoras en CSAT, reducción de deserción, cumplimiento de SLA y desarrollo de programas de coaching y capacitación.' },
      { question: '¿Cómo muestro crecimiento de liderazgo en un currículum de call center?', answer: 'Documente la progresión de agente a líder de equipo a supervisor, con mejoras medibles en cada nivel.' },
      { question: '¿Qué KPIs son importantes para el currículum de un supervisor de call center?', answer: 'CSAT, resolución en primer contacto, tiempo promedio de manejo, cumplimiento de SLA, deserción de agentes, puntuaciones de aseguramiento de calidad y tasas de retención de clientes.' },
    ],
  },
  'claims-adjuster': {
    slug: 'ajustador-de-reclamos',
    title: 'Ajustador de Reclamos',
    keywords: ['currículum de ajustador de reclamos', 'currículum de ajustador de seguros', 'CV de examinador de reclamos', 'currículum de reclamos de seguros'],
    searchIntents: ['ejemplo de currículum de ajustador de reclamos', 'cómo escribir un currículum de ajustador de reclamos', 'plantilla de CV de ajustador de seguros'],
    topSkills: ['Investigación de Reclamos', 'Análisis de Pólizas', 'Negociación', 'Evaluación de Daños', 'Redacción de Informes', 'Software de Seguros', 'Atención al Cliente', 'Cumplimiento Regulatorio'],
    atsKeywords: ['procesamiento de reclamos', 'determinación de cobertura', 'subrogación', 'evaluación de responsabilidad', 'reservas de pérdidas', 'liquidación de reclamos', 'investigación de fraude', 'reclamos médicos'],
    sampleResumeData: buildResumeData({
      firstName: 'Robert',
      lastName: 'Daniels',
      profession: 'Ajustador de Reclamos',
      summary: 'Ajustador de reclamos licenciado con 5 años de experiencia manejando reclamos de propiedad y daños. Gestionó una cartera de más de 120 reclamos activos con liquidaciones promedio 15% por debajo de las estimaciones de reserva. Logró un 96% de satisfacción del cliente en encuestas post-liquidación.',
      skills: ['Investigación de Reclamos', 'Análisis de Cobertura', 'Evaluación de Daños', 'Negociación', 'Xactimate', 'Guidewire ClaimCenter', 'Subrogación', 'Redacción de Informes', 'Comunicación con Clientes', 'Regulaciones Estatales'],
      experience: [
        {
          title: 'Ajustador de Reclamos Senior',
          company: 'State Farm Insurance',
          startDate: '2021-07',
          isCurrent: true,
          achievements: [
            'Gestiona una cartera de más de 120 reclamos activos de propiedad y daños con reservas combinadas superiores a $3M',
            'Logró montos de liquidación promedio 15% por debajo de las estimaciones de reserva mediante estrategias efectivas de negociación',
            'Mantuvo una calificación de satisfacción del cliente del 96% en encuestas post-liquidación en todos los reclamos manejados',
          ],
        },
        {
          title: 'Ajustador de Reclamos',
          company: 'Progressive Insurance',
          startDate: '2019-05',
          endDate: '2021-06',
          achievements: [
            'Investigó y resolvió más de 80 reclamos de auto y propiedad mensuales, cumpliendo el SLA de contacto inicial de 48 horas al 98%',
            'Identificó y refirió 12 reclamos potencialmente fraudulentos a la Unidad de Investigaciones Especiales, ahorrando $180K en pagos',
            'Completó estimaciones de daños en Xactimate para más de 200 reclamos de propiedad con 95% de precisión en revisiones de pares',
          ],
        },
      ],
      education: [
        { institution: 'University of Central Florida', degree: 'B.S.', field: 'Gestión de Riesgos y Seguros', startDate: '2015-09', endDate: '2019-05' },
      ],
      certifications: [
        { name: 'Associate in Claims (AIC)', issuer: 'The Institutes', date: '2020-11' },
        { name: 'Licencia de Ajustador Estatal de Todas las Líneas', issuer: 'Florida Department of Financial Services', date: '2019-06' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe destacar un ajustador de reclamos en su currículum?', answer: 'Enfóquese en el volumen de reclamos gestionados, precisión de liquidaciones, satisfacción del cliente, contribuciones en detección de fraude y dominio de software (Xactimate, Guidewire).' },
      { question: '¿Se requiere licencia para los ajustadores de reclamos?', answer: 'Sí. La mayoría de los estados requieren una licencia de ajustador. Incluya su tipo de licencia (todas las líneas, propiedad, daños) y el estado.' },
      { question: '¿Qué certificaciones benefician a los ajustadores de reclamos?', answer: 'AIC (Associate in Claims), CPCU (Chartered Property Casualty Underwriter) y licencias estatales específicas de ajustador son altamente valoradas.' },
    ],
  },
  'data-entry-clerk': {
    slug: 'operador-de-captura',
    title: 'Operador de Captura de Datos',
    keywords: ['currículum de operador de captura', 'currículum de captura de datos', 'CV de especialista en captura de datos', 'currículum de operador de datos'],
    searchIntents: ['ejemplo de currículum de operador de captura', 'cómo escribir un currículum de captura de datos', 'plantilla de CV de especialista en captura de datos'],
    topSkills: ['Velocidad de Digitación', 'Captura de Datos', 'Microsoft Excel', 'Atención al Detalle', 'Gestión de Bases de Datos', 'Verificación de Datos', 'Archivo', 'Gestión del Tiempo'],
    atsKeywords: ['precisión de datos', 'gestión de registros', 'gestión de hojas de cálculo', 'captura de datos alfanuméricos', 'escaneo de documentos', 'control de calidad', 'procesamiento por lotes', 'sistemas ERP'],
    sampleResumeData: buildResumeData({
      firstName: 'Jennifer',
      lastName: 'Nguyen',
      profession: 'Operadora de Captura de Datos',
      summary: 'Operadora de captura de datos precisa y eficiente con 4 años de experiencia procesando más de 10,000 registros mensuales con una tasa de precisión del 99.7%. Competente en Excel, SAP y gestión de bases de datos. Redujo el rezago en procesamiento de datos en un 60% mediante optimización del flujo de trabajo.',
      skills: ['Captura de Datos (75 PPM)', 'Microsoft Excel', 'SAP', 'Gestión de Bases de Datos', 'Verificación de Datos', 'Escaneo de Documentos', 'Control de Calidad', 'FileMaker Pro', 'Google Sheets', 'Gestión de Registros'],
      experience: [
        {
          title: 'Especialista en Captura de Datos',
          company: 'UnitedHealth Group',
          startDate: '2022-02',
          isCurrent: true,
          achievements: [
            'Procesa más de 10,000 registros de pacientes mensuales en SAP y bases de datos propietarias con 99.7% de precisión',
            'Redujo el rezago en procesamiento de datos en un 60% desarrollando macros de Excel para importación masiva de datos',
            'Capacitó a 4 nuevos miembros del equipo en protocolos de captura de datos y procedimientos de verificación de calidad',
          ],
        },
        {
          title: 'Operadora de Captura de Datos',
          company: 'Robert Half (Contrato)',
          startDate: '2020-06',
          endDate: '2022-01',
          achievements: [
            'Capturó más de 8,000 registros financieros mensuales para 3 empresas cliente con 99.5% de precisión',
            'Concilió discrepancias en más de 500 registros por mes, mejorando la integridad de la base de datos en un 25%',
            'Digitalizó 15,000 documentos en papel mediante escaneo e indexación, completando el proyecto 2 semanas antes de lo programado',
          ],
        },
      ],
      education: [
        { institution: 'San Antonio College', degree: 'A.A.S.', field: 'Administración de Oficinas', startDate: '2018-08', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'Microsoft Office Specialist – Excel', issuer: 'Microsoft', date: '2020-08' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un operador de captura de datos en su currículum?', answer: 'Destaque la velocidad de digitación (PPM), tasa de precisión, volumen de registros procesados, dominio de software y cualquier mejora de procesos que haya implementado.' },
      { question: '¿Cómo hago que un currículum de captura de datos destaque?', answer: 'Cuantifique su velocidad (PPM), precisión (99%+), volumen (registros/mes) y muestre cualquier automatización o mejora de eficiencia.' },
      { question: '¿Qué habilidades son más importantes para roles de captura de datos?', answer: 'Velocidad de digitación (65+ PPM), precisión, dominio de Excel, atención al detalle y experiencia con bases de datos o sistemas ERP como SAP.' },
    ],
  },
  'dentist': {
    slug: 'dentista',
    title: 'Dentista',
    keywords: ['currículum de dentista', 'currículum dental', 'currículum de DDS', 'CV de dentista', 'currículum de doctor dental'],
    searchIntents: ['ejemplo de currículum de dentista', 'cómo escribir un currículum de dentista', 'plantilla de CV dental'],
    topSkills: ['Odontología General', 'Cirugía Oral', 'Odontología Restaurativa', 'Procedimientos Cosméticos', 'Diagnóstico de Pacientes', 'Planificación de Tratamientos', 'Radiografía Digital', 'Gestión de Consultorio'],
    atsKeywords: ['procedimientos dentales', 'coronas y puentes', 'endodoncia', 'implantes dentales', 'cuidado preventivo', 'gestión de pacientes', 'software dental', 'control de infecciones'],
    sampleResumeData: buildResumeData({
      firstName: 'Mark',
      lastName: 'Henderson',
      profession: 'Dentista',
      summary: 'DDS licenciado con 9 años de experiencia clínica en odontología general y cosmética. Atiende a más de 25 pacientes diarios en procedimientos restaurativos, preventivos y cosméticos. Incrementó los ingresos del consultorio en un 40% mediante la expansión de servicios e iniciativas de retención de pacientes.',
      skills: ['Odontología General', 'Odontología Cosmética', 'Implantes Dentales', 'Terapia de Conductos', 'Coronas y Puentes', 'Radiografías Digitales', 'Invisalign', 'Gestión de Consultorio', 'Dentrix', 'Comunicación con Pacientes'],
      experience: [
        {
          title: 'Dentista General',
          company: 'Bright Dental Care',
          startDate: '2019-03',
          isCurrent: true,
          achievements: [
            'Atiende a más de 25 pacientes diarios realizando exámenes integrales, restauraciones, extracciones y procedimientos cosméticos',
            'Incrementó los ingresos del consultorio en un 40% en 4 años al introducir colocación de implantes y servicios de Invisalign',
            'Mantuvo una tasa de retención de pacientes del 92% mediante planes de tratamiento personalizados y protocolos de seguimiento',
          ],
        },
        {
          title: 'Dentista Asociado',
          company: 'Aspen Dental',
          startDate: '2015-07',
          endDate: '2019-02',
          achievements: [
            'Realizó más de 20 procedimientos dentales diarios incluyendo obturaciones de resina, coronas, endodoncias y extracciones',
            'Diagnosticó y trató más de 500 casos dentales de emergencia con una tasa de resolución en el mismo día del 98%',
            'Capacitó a 3 higienistas dentales y 4 asistentes dentales en mejores prácticas clínicas',
          ],
        },
      ],
      education: [
        { institution: 'University of Michigan School of Dentistry', degree: 'D.D.S.', field: 'Odontología', startDate: '2011-08', endDate: '2015-05' },
        { institution: 'University of Michigan', degree: 'B.S.', field: 'Biología', startDate: '2007-09', endDate: '2011-05' },
      ],
      certifications: [
        { name: 'Dentista Licenciado (DDS)', issuer: 'Michigan Board of Dentistry', date: '2015-07' },
        { name: 'Proveedor Certificado de Invisalign', issuer: 'Align Technology', date: '2019-05' },
        { name: 'BLS/ACLS', issuer: 'American Heart Association', date: '2023-07' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un dentista en su currículum?', answer: 'Destaque el volumen diario de pacientes, tipos de procedimientos realizados, métricas de crecimiento del consultorio, certificaciones de especialidad y dominio de tecnología.' },
      { question: '¿Un dentista debe usar formato de CV o currículum?', answer: 'Para puestos en consultorio privado o práctica grupal, un currículum enfocado funciona bien. Para posiciones académicas o de investigación, un CV completo con publicaciones y docencia es preferible.' },
      { question: '¿Cómo demuestro el crecimiento del consultorio en un currículum de dentista?', answer: 'Cuantifique el crecimiento de ingresos, nuevos servicios introducidos, expansión de la base de pacientes y mejoras en la tasa de retención.' },
    ],
  },
  'help-desk-technician': {
    slug: 'tecnico-de-mesa-de-ayuda',
    title: 'Técnico de Mesa de Ayuda',
    keywords: ['currículum de técnico de mesa de ayuda', 'currículum de help desk de TI', 'currículum de técnico de soporte de TI', 'currículum de help desk'],
    searchIntents: ['ejemplo de currículum de técnico de mesa de ayuda', 'cómo escribir un currículum de help desk', 'plantilla de CV de soporte de TI'],
    topSkills: ['Resolución de Problemas', 'Active Directory', 'Windows/macOS', 'Sistemas de Tickets', 'Soporte Remoto', 'Fundamentos de Redes', 'Soporte de Hardware', 'Atención al Cliente'],
    atsKeywords: ['resolución de tickets', 'soporte de primer nivel', 'restablecimiento de contraseñas', 'instalación de software', 'configuración de VPN', 'gestión de activos de TI', 'cumplimiento de SLA', 'base de conocimiento'],
    sampleResumeData: buildResumeData({
      firstName: 'Chris',
      lastName: 'Taylor',
      profession: 'Técnico de Mesa de Ayuda',
      summary: 'Técnico de mesa de ayuda certificado CompTIA A+ con 4 años de experiencia brindando soporte de TI Nivel 1/2 para más de 500 usuarios. Resolvió más de 30 tickets diarios con una tasa de resolución en primer contacto del 92% y mantuvo un 98% de cumplimiento de SLA. Hábil en Active Directory, O365 y resolución remota de problemas.',
      skills: ['Windows 10/11', 'macOS', 'Active Directory', 'Administración de Office 365', 'ServiceNow', 'Soporte Remoto de Escritorio', 'Resolución de Problemas de VPN/Red', 'Diagnóstico de Hardware', 'Soporte de Impresoras', 'Gestión de Activos de TI'],
      experience: [
        {
          title: 'Técnico de Mesa de Ayuda II',
          company: 'Accenture',
          startDate: '2022-04',
          isCurrent: true,
          achievements: [
            'Brinda soporte Nivel 1/2 para más de 500 usuarios finales, resolviendo más de 30 tickets diarios vía teléfono, chat y escritorio remoto',
            'Logró una tasa de resolución en primer contacto del 92% y un 98% de cumplimiento de SLA en todas las categorías de tickets',
            'Creó más de 25 artículos de base de conocimiento que redujeron el volumen de tickets recurrentes en un 20%',
          ],
        },
        {
          title: 'Especialista en Soporte de TI',
          company: 'CompuCom',
          startDate: '2020-06',
          endDate: '2022-03',
          achievements: [
            'Resolvió más de 20 tickets diarios cubriendo restablecimiento de contraseñas, instalaciones de software, problemas de VPN y resolución de problemas de hardware',
            'Administró Active Directory para más de 300 usuarios incluyendo creación de cuentas, políticas de grupo y permisos',
            'Desplegó y configuró más de 150 laptops y estaciones de trabajo durante la actualización de hardware a nivel empresa',
          ],
        },
      ],
      education: [
        { institution: 'Northern Virginia Community College', degree: 'A.A.S.', field: 'Tecnología de la Información', startDate: '2018-08', endDate: '2020-05' },
      ],
      certifications: [
        { name: 'CompTIA A+', issuer: 'CompTIA', date: '2020-07' },
        { name: 'CompTIA Network+', issuer: 'CompTIA', date: '2021-11' },
        { name: 'ITIL 4 Foundation', issuer: 'PeopleCert', date: '2022-05' },
      ],
    }),
    faqs: [
      { question: '¿Qué debe incluir un técnico de mesa de ayuda en su currículum?', answer: 'Destaque el volumen de tickets, tasa de resolución en primer contacto, cumplimiento de SLA, tamaño de la base de usuarios y certificaciones (CompTIA A+, ITIL).' },
      { question: '¿Qué certificaciones son mejores para un currículum de mesa de ayuda?', answer: 'CompTIA A+ es la certificación estándar de nivel inicial. Network+ e ITIL Foundation son adiciones valiosas. Para avanzar, considere CompTIA Security+ o certificaciones de Microsoft.' },
      { question: '¿Cómo destaco como candidato a mesa de ayuda?', answer: 'Cuantifique métricas de resolución de tickets, destaque contribuciones a la base de conocimiento y muestre cualquier automatización o mejora de procesos que haya implementado.' },
    ],
  },
};
