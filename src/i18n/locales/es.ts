export const es = {
  // Common
  common: {
    loading: 'Cargando...',
    saving: 'Guardando...',
    deleting: 'Eliminando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Finalizar',
    edit: 'Editar',
    delete: 'Eliminar',
    add: 'Agregar',
    remove: 'Quitar',
    yes: 'Sí',
    no: 'No',
    close: 'Cerrar',
    confirm: 'Confirmar',
    skip: 'Omitir',
    required: 'Requerido',
    optional: 'Opcional',
    premium: 'Premium',
    showTips: 'Mostrar Tips',
    closeTips: 'Cerrar tips',
    preview: 'Ver',
    view: 'Ver',
    show: 'Mostrar',
    hide: 'Ocultar',
    refresh: 'Actualizar',
    clear: 'Limpiar',
    trust: {
      noCardRequired: 'Sin tarjeta de crédito',
      atsFriendly: 'Compatible con ATS',
      privacyNote: 'Tus datos se mantienen privados',
    },
  },

  // Navigation
  nav: {
    home: 'Inicio',
    dashboard: 'Dashboard',
    create: 'Crear CV',
    blog: 'Blog',
    premium: 'Premium',
    account: 'Mi Cuenta',
    contact: 'Contacto',
    about: 'Acerca de',
    privacy: 'Privacidad',
    terms: 'Términos',
    refund: 'Política de Reembolsos',
    support: 'Soporte',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },

  // Landing Page
  landing: {
    urgencyBanner: {
      limitedTime: 'Herramientas gratis:',
      message: 'Crea un CV listo para reclutadores en minutos',
      endsSoon: 'Sin tarjeta de crédito',
    },
    hero: {
      label: 'CREADOR DE CV ONLINE GRATIS',
      title: 'Crea un CV ganador gratis',
      subtitle: 'Tu primer CV es 100% gratis para siempre.\nDescargas ilimitadas. Sin costos ocultos.\nSí, en serio 🚀',
      ctaPrimary: 'Comienza gratis ✨',
    },
    keywordPreview: {
      badge: 'Vista previa (sin registro)',
      title: 'Vista previa de coincidencia de palabras clave',
      subtitle: 'Pega una descripción del puesto y el texto de tu CV para ver qué palabras clave faltan.',
      useSample: 'Usar ejemplo',
      analyze: 'Analizar',
      analyzing: 'Analizando…',
      jobLabel: 'Descripción del puesto',
      resumeLabel: 'Texto del CV',
      jobPlaceholder: 'Pega la descripción del puesto aquí…',
      resumePlaceholder: 'Pega el texto de tu CV aquí…',
      privacyNote: 'No guardamos tu texto. Esta vista previa es solo para coincidencia de palabras clave.',
      nextStep: 'Siguiente: obtén adaptación con IA + insights ATS completos (gratis para empezar).',
      cta: 'Desbloquear análisis con IA',
      resultsTitle: 'Puntuación de coincidencia',
      matched: 'coinciden',
      matchedTitle: 'Coinciden',
      missingTitle: 'Faltan',
      noneMatched: 'Aún no hay coincidencias.',
      noneMissing: 'Genial—no detectamos palabras clave faltantes.',
      error: 'No se pudo calcular en el servidor. Mostrando vista previa local.',
      sampleJob: 'Buscamos un desarrollador React con TypeScript, AWS, CI/CD y experiencia en SQL.',
      sampleResume: 'Construí apps con React + TypeScript, desplegué en AWS, mejoré CI/CD y trabajé con bases de datos SQL.',
    },
    problem: {
      title: '¿Envías CVs pero no consigues entrevistas? Esta es la razón.',
      intro: 'La mayoría de los CVs son rechazados antes de que un reclutador los vea.',
      body: 'Los Sistemas de Seguimiento de Candidatos (ATS) filtran automáticamente los CVs que:',
      bullets: [
        'No usan las palabras clave correctas',
        'No están alineados con la descripción del puesto',
        'No destacan claramente los logros relevantes',
      ],
      closing: 'Un CV fuerte no solo tiene buen diseño — tiene que pasar los filtros ATS.',
    },
    solution: {
      title: 'Un CV que realmente pasa los ATS y se ajusta al puesto',
      bullets: [
        'Genera un CV potenciado con IA basado en tu experiencia real',
        'Adapta tu CV a una descripción de trabajo específica',
        'Verifica tu puntuación de compatibilidad ATS y ve qué mejorar',
        'Traduce tu CV a otros idiomas sin perder calidad',
      ],
      closing: 'Todo en minutos. Sin empezar desde cero.',
    },
    atsChecker: {
      title: '¿Tu CV pasa los Sistemas de Seguimiento de Candidatos?',
      body: 'Nuestro verificador ATS analiza tu CV de la misma forma que los sistemas de contratación y muestra:',
      bullets: [
        'Una puntuación de compatibilidad ATS',
        'Qué secciones necesitan mejora',
        'Qué palabras clave faltan para el puesto',
      ],
      closing: 'Comienza gratis y ve tu puntuación ATS inicial al instante.',
      cta: 'Verificar mi CV con ATS (gratis)',
    },
    jobTailoringSection: {
      title: 'Un CV por trabajo — así funciona realmente la contratación',
      intro: 'Enviar el mismo CV a todos los trabajos reduce drásticamente tus posibilidades.',
      withGqr: 'Con GetQuickResume:',
      steps: [
        'Pega la descripción del puesto',
        'Analizamos lo que busca el empleador',
        'Tu CV se adapta para coincidir con ese puesto',
      ],
      closing: 'Mejor coincidencia → más entrevistas',
      cta: 'Adaptar mi CV a una descripción de trabajo',
    },
    resumeForJobDescription: {
      hero: {
        title: 'CV Adaptado a la Descripción del Puesto — Lo Que Buscan los Empleadores',
        subtitle: 'Deja de enviar CVs genéricos. Pega una descripción del puesto y adapta tu CV para coincidir con palabras clave, requisitos y filtros ATS.',
        badge: 'Optimización para el Puesto',
      },
      ctaPrimary: 'Adaptar mi CV a una descripción de trabajo',
      ctaSecondary: 'Ver vista previa de compatibilidad ATS',
      problem: {
        title: 'Por qué fallan los CVs genéricos',
        bullets: [
          'Baja coincidencia de palabras clave',
          'Relevancia poco clara para el puesto',
          'Filtros ATS detectan requisitos faltantes',
        ],
      },
      howItWorks: {
        title: 'Cómo funciona',
        steps: [
          { number: '1', title: 'Pega la descripción del puesto' },
          { number: '2', title: 'Analizamos lo que busca el empleador' },
          { number: '3', title: 'Tu CV se adapta para ese puesto' },
        ],
      },
      benefit: 'Mejor coincidencia → más entrevistas',
      trust: {
        freeToStart: 'Sin tarjeta de crédito',
        atsOptimized: 'Resultado optimizado para ATS',
        privacyNote: 'Tus datos se mantienen privados',
      },
    },
    templates: {
      title: 'Plantillas de CV profesionales que los reclutadores realmente leen',
      body: 'Diseños limpios y modernos que funcionan con ATS — no diseños llamativos que son rechazados.',
      bullets: ['Profesional', 'Claro', 'Enfocado en resultados'],
    },
    whoItsFor: {
      title: 'Perfecto para ti si estás…',
      bullets: [
        'Aplicando activamente a trabajos',
        'Cambiando de rol o industria',
        'Aplicando a empresas que usan ATS',
        'Necesitando un CV en inglés u otro idioma',
      ],
    },
    footerSeoMicrocopy: 'Creador de CV con IA · Verificador de CV ATS · CV adaptado a descripción de trabajo · Plantillas de CV profesionales · Traducción de CV',
    socialProof: {
      title: 'Confianza de Profesionales en Todo el Mundo',
      stats: {
        resumesCreated: {
          value: '10,000+',
          label: 'CVs Creados',
        },
        languages: {
          value: '10+',
          label: 'Idiomas Soportados',
        },
        atsScore: {
          value: '95%',
          label: 'Puntuación ATS Promedio',
        },
        satisfaction: {
          value: '4.9/5',
          label: 'Satisfacción de Usuarios',
        },
      },
    },
    exploreTools: {
      title: 'Explora Nuestras Herramientas Gratis',
      subtitle: 'Todo lo que necesitas para crear un CV ganador',
      links: {
        atsChecker: 'Verificador ATS',
        jobTailoring: 'Adaptar a Descripción de Trabajo',
        aiBuilder: 'Creador de CV con IA',
        translator: 'Traductor de CV',
        templates: 'Plantillas de CV',
      },
    },
    coreFeatures: {
      title: 'Todo lo que Necesitas para Conseguir Tu Trabajo Ideal',
      subtitle: 'Herramientas de IA potentes diseñadas para darte ventaja competitiva',
      items: [
        {
          icon: 'brain',
          title: 'Creador de CV con IA',
          description: 'Crea CVs profesionales con sugerencias inteligentes de contenido y formato automático',
          highlight: 'Gratis',
        },
        {
          icon: 'file-text',
          title: 'Generador de Cartas de Presentación',
          description: 'Genera cartas personalizadas que complementan tu CV y la oferta de trabajo',
          highlight: 'IA',
        },
        {
          icon: 'target',
          title: 'Adaptación para Empleos',
          description: 'Personaliza tu CV para cada solicitud con recomendaciones potenciadas por IA',
          highlight: 'Nuevo',
        },
        {
          icon: 'bar-chart',
          title: 'Optimización y Puntuación ATS',
          description: 'Supera los sistemas de seguimiento con formato optimizado y palabras clave estratégicas',
          highlight: 'Premium',
        },
        {
          icon: 'spell-check',
          title: 'Revisión Gramatical y de Estilo',
          description: 'Elimina errores con revisión gramatical avanzada y sugerencias de tono profesional',
          highlight: 'IA',
        },
        {
          icon: 'globe',
          title: 'Traducción Multi-idioma',
          description: 'Traduce tu CV a más de 10 idiomas con precisión profesional',
          highlight: 'Premium',
        },
        {
          icon: 'qr-code',
          title: 'Compartir con Código QR',
          description: 'Comparte tu CV instantáneamente con códigos QR escaneables para eventos de networking',
          highlight: 'Premium',
        },
        {
          icon: 'line-chart',
          title: 'Analíticas del CV',
          description: 'Rastrea quién ve tu CV con analíticas detalladas de dispositivos y ubicaciones',
          highlight: 'Premium',
        },
      ],
    },
    featureShowcase: {
      title: 'Descubre Nuestras Funciones en Acción',
      subtitle: 'Herramientas poderosas que te diferencian de otros candidatos',
      tabs: {
        jobTailoring: {
          title: 'Adaptación para Empleos',
          description: 'Pega cualquier oferta de trabajo y nuestra IA analizará automáticamente los requisitos, sugerirá mejoras y optimizará tu CV para que coincida perfectamente con la posición.',
          benefits: [
            'La IA analiza los requisitos instantáneamente',
            'Obtén sugerencias de mejora personalizadas',
            'Aumenta tu puntuación de coincidencia automáticamente',
            'Ahorra tiempo en cada solicitud',
          ],
        },
        coverLetter: {
          title: 'Cartas de Presentación',
          description: 'Genera cartas de presentación convincentes que complementan tu CV y hablan directamente de lo que buscan los empleadores.',
          benefits: [
            'Contenido personalizado para cada solicitud',
            'Tono y formato profesional',
            'Destaca tus calificaciones clave',
            'Edita y regenera párrafos',
          ],
        },
        atsScoring: {
          title: 'Puntuación ATS',
          description: 'Obtén una puntuación detallada que muestra qué tan bien funcionará tu CV con los Sistemas de Seguimiento de Candidatos usados por el 99% de las empresas Fortune 500.',
          benefits: [
            'Análisis sección por sección',
            'Sugerencias de optimización de palabras clave',
            'Verificación de compatibilidad de formato',
            'Consejos de mejora instantáneos',
          ],
        },
        translation: {
          title: 'Traducción',
          description: 'Expande tu búsqueda de empleo globalmente traduciendo tu CV a más de 10 idiomas manteniendo la calidad profesional.',
          benefits: [
            'Calidad de traducción profesional',
            'Mantiene el formato original',
            'Más de 10 idiomas soportados',
            'Perfecto para empleos internacionales',
          ],
        },
        qrSharing: {
          title: 'Compartir con QR',
          description: 'Comparte tu CV en eventos de networking, tarjetas de presentación o donde sea con un código QR escaneable que rastrea la interacción.',
          benefits: [
            'Compartir instantáneo en eventos',
            'Rastrea quién ve tu CV',
            'Analíticas de dispositivo y ubicación',
            'Perfecto para networking',
          ],
        },
      },
    },
    freeTier: {
      title: 'Qué incluye el Plan Gratis',
      subtitle: 'Todo lo que necesitas para crear tu primer CV profesional — sin costo.',
      badge: 'Gratis Para Siempre',
      features: [
        '1 CV revisado con asistencia de IA',
        '1 descarga en PDF',
        'Vista previa básica de puntuación ATS',
        'Plantillas profesionales',
      ],
      cta: 'Comienza gratis',
      upgradeHint: '¿Necesitas más? Actualiza cuando quieras para CVs ilimitados, adaptación al puesto y más.',
    },
    howItWorks: {
      title: 'Cómo funciona',
      subtitle: 'Tres simples pasos para tu CV perfecto',
      steps: [
        {
          number: '1',
          title: 'Elige una plantilla',
          description: 'Selecciona entre diseños profesionales compatibles con ATS que encantan a los reclutadores.',
          icon: 'layout-template',
        },
        {
          number: '2',
          title: 'Agrega tu contenido',
          description: 'Completa tus datos — nuestra IA te ayuda a escribir y mejorar cada sección.',
          icon: 'pen-line',
        },
        {
          number: '3',
          title: 'Descarga tu CV',
          description: 'Obtén un PDF pulido y listo para enviar a empleadores de inmediato.',
          icon: 'download',
        },
      ],
    },
    popularGuides: {
      title: 'Guías populares de currículum',
      subtitle: 'Explora ejemplos, plantillas y palabras clave ATS por rol o habilidad.',
      professionsTitle: 'Por profesión',
      skillsTitle: 'Habilidades en el CV',
      professionLinkSuffix: ' resume',
      skillLinkSuffix: ' skills',
      professionLinkSuffixEs: ' — guía CV',
      skillLinkSuffixEs: ' en el CV',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        {
          question: '¿Es realmente gratis comenzar?',
          answer: '¡Absolutamente! Crea tu cuenta y tu primer CV profesional completamente gratis. Sin tarjeta de crédito, sin límites de tiempo, sin costos ocultos.',
        },
        {
          question: '¿Qué puedo hacer con el plan gratuito?',
          answer: 'Con el plan gratuito obtienes 1 CV profesional con generación de contenido IA, revisión gramatical, plantillas profesionales y descarga en PDF. Tu CV gratis es tuyo para siempre.',
        },
        {
          question: '¿Qué es la Adaptación para Empleos?',
          answer: 'La Adaptación para Empleos es nuestra función de IA que analiza ofertas de trabajo y optimiza automáticamente tu CV para coincidir con los requisitos específicos, aumentando tus posibilidades de conseguir entrevistas.',
        },
        {
          question: '¿Cómo funciona la Optimización ATS?',
          answer: 'Nuestra optimización ATS (Sistema de Seguimiento de Candidatos) analiza el formato, palabras clave y estructura de tu CV para asegurar que pase los sistemas de filtrado automático usados por el 99% de las empresas.',
        },
        {
          question: '¿Qué incluye Premium?',
          answer: 'Premium desbloquea CVs ilimitados, generación de cartas de presentación, adaptación para empleos, traducción multi-idioma, compartir con QR y analíticas, mejora con IA y soporte prioritario.',
        },
        {
          question: '¿Puedo cancelar en cualquier momento?',
          answer: '¡Sí! Puedes cancelar tu suscripción Premium cuando quieras. Tu acceso continúa hasta el final de tu período de facturación, y tus CVs permanecen accesibles.',
        },
      ],
      viewPricingDetails: 'Ver detalles completos de precios',
    },
    atsExplainer: {
      title: '¿Tu CV pasa los Sistemas de Seguimiento de Candidatos?',
      subtitle: 'Nuestro verificador ATS analiza tu CV de la misma forma que los sistemas de contratación',
      description: 'Nuestro verificador ATS analiza tu CV de la misma forma que los sistemas de contratación y muestra:',
      benefits: [
        {
          icon: 'bar-chart',
          title: 'Una puntuación de compatibilidad ATS',
          description: 'Ve exactamente cómo funciona tu CV contra sistemas ATS reales'
        },
        {
          icon: 'alert-circle',
          title: 'Qué secciones necesitan mejora',
          description: 'Obtén retroalimentación específica sobre qué arreglar en tu CV'
        },
        {
          icon: 'search',
          title: 'Qué palabras clave faltan',
          description: 'Descubre las palabras clave que necesitas para el puesto que deseas'
        }
      ],
      closing: 'Comienza gratis y ve tu puntuación ATS inicial al instante.',
      cta: 'Verificar mi CV con ATS (gratis)'
    },
    cta: {
      title: 'Tu próximo trabajo comienza con un mejor CV',
      subtitle: 'Únete a miles de profesionales que consiguieron empleo con GetQuickResume',
      description: 'Comienza gratis hoy — sin tarjeta de crédito',
      features: [
        'Optimizado para ATS',
        'Adaptado a descripciones de trabajo',
        'Plantillas profesionales',
        'Traducción de CV',
      ],
      ctaPrimary: 'Crear mi CV optimizado para ATS (gratis)',
      ctaSecondary: 'Comparar Planes',
    },
    testimonials: {
      title: 'Historias de Éxito de Usuarios Reales',
      subtitle: 'Descubre cómo GetQuickResume ayudó a profesionales a conseguir su trabajo ideal',
      items: [
        {
          name: 'María González',
          role: 'Diseñadora UX Senior',
          company: 'Startup Tech',
          content: '¡La función de Adaptación para Empleos es revolucionaria! Personalicé mi CV para 5 posiciones diferentes y conseguí entrevistas en 3 de ellas en una semana.',
          rating: 5,
          result: '3 entrevistas en 1 semana',
        },
        {
          name: 'Carlos Rodríguez',
          role: 'Desarrollador Full Stack',
          company: 'Fortune 500',
          content: 'Mi puntuación ATS pasó del 62% al 94% después de usar las herramientas de optimización. Finalmente empecé a recibir llamadas después de meses de silencio.',
          rating: 5,
          result: 'Puntuación ATS: 62% → 94%',
        },
        {
          name: 'Ana Martínez',
          role: 'Marketing Manager',
          company: 'Agencia',
          content: 'Compartir con QR fue perfecto para un evento de networking. Tres reclutadores lo escanearon, y pude ver cuándo vieron mi CV. ¡Conseguí mi trabajo ideal!',
          rating: 5,
          result: 'Contratada en 2 semanas',
        },
        {
          name: 'David Chen',
          role: 'Product Manager',
          company: 'Empresa SaaS',
          content: 'El generador de cartas de presentación me ahorró horas. Creó cartas personalizadas que realmente sonaban como yo. Recomiendo mucho el plan Premium.',
          rating: 5,
          result: 'Ahorró 10+ horas',
        },
      ],
    },
    plans: {
      title: 'Comienza gratis. Mejora cuando necesites mejores resultados.',
      subtitle: 'Sin tarjeta de crédito para comenzar',
      popularBadge: 'Más Popular',
      upgradeHint: 'Mejora solo cuando necesites más entrevistas.',
      free: {
        name: 'Gratis',
        price: '$0',
        period: 'para siempre',
        description: 'Perfecto para comenzar',
        features: [
          '1 CV generado con IA',
          '1 descarga en PDF',
          'Vista previa básica de puntuación ATS',
        ],
        cta: 'Crear mi CV gratis',
      },
      monthly: {
        name: 'Premium',
        price: '$10',
        period: 'mes',
        description: 'Para buscadores de empleo activos',
        features: [
          'CVs ilimitados',
          'CV adaptado a múltiples descripciones de trabajo',
          'Puntuación ATS completa + lista de mejoras',
          'Traducción de CV y cartas de presentación',
        ],
        cta: 'Obtener Premium',
      },
      yearly: {
        name: 'Premium Anual',
        price: '$5',
        period: 'mes',
        savings: 'Ahorra 50% — Facturado $60/año',
        badge: 'Mejor Valor',
        description: 'Ideal para crecimiento profesional a largo plazo',
        features: [
          'Todo lo de Premium Mensual',
          '50% de Ahorro',
          'Facturación Anual',
          'Soporte Prioritario',
        ],
        cta: 'Obtener Premium',
      },
      comparisonTitle: 'Comparar Planes',
      comparisonFeatures: {
        resumes: { name: 'CVs', free: 'Ilimitados', premium: 'Ilimitados' },
        aiCloudResumes: { name: 'CVs IA en la Nube', free: '1', premium: '30/mes' },
        aiGeneration: { name: 'Generación IA', free: true, premium: true },
        grammarCheck: { name: 'Revisión Gramatical', free: true, premium: true },
        templates: { name: 'Plantillas', free: 'Todas', premium: 'Todas' },
        pdfDownload: { name: 'Descarga PDF', free: true, premium: true },
        coverLetters: { name: 'Cartas de Presentación', free: false, premium: '30/mes' },
        jobTailoring: { name: 'Adaptación para Empleos', free: false, premium: true },
        atsScoring: { name: 'Puntuación ATS', free: false, premium: true },
        translation: { name: 'Traducción', free: false, premium: '10+ Idiomas' },
        qrSharing: { name: 'Compartir con QR', free: false, premium: true },
        analytics: { name: 'Analíticas', free: false, premium: true },
        support: { name: 'Soporte', free: 'Email', premium: 'Prioritario' },
      },
    },
  },

  // ATS Resume Checker Landing Page
  atsResumeCheckerPage: {
    hero: {
      title: 'Verificador ATS de CV Gratis con IA',
      subtitle: 'Pega tu currículum y obtén una puntuación de compatibilidad ATS instantánea con análisis de palabras clave impulsado por IA — gratis, sin registro.',
    },
    tool: {
      tabUpload: 'Subir CV',
      tabPaste: 'Pegar Texto',
      dropzoneLabel: 'Arrastra tu CV aquí o haz clic para buscar',
      dropzoneHint: 'Admite archivos PDF, DOCX y TXT (máx. 2MB)',
      extracting: 'Extrayendo texto de tu CV...',
      fileReady: '{{fileName}} ({{chars}} caracteres extraídos)',
      removeFile: 'Eliminar',
      extractionError: 'No se pudo extraer texto de este archivo. Intenta pegar el texto de tu CV en su lugar.',
      pasteLabel: 'Pega el texto de tu CV',
      pastePlaceholder: 'Pega el contenido de tu currículum aquí (experiencia, educación, habilidades, resumen...)',
      professionLabel: 'Puesto objetivo (opcional)',
      professionPlaceholder: 'ej. Ingeniero de Software, Gerente de Marketing',
      checkButton: 'Verificar Puntuación ATS (Gratis)',
      checking: 'Analizando tu currículum...',
      charCount: '{{count}} / {{max}} caracteres',
      charCountError: 'Límite de caracteres excedido',
      remaining: '{{count}} verificación(es) gratuita(s) restante(s) hoy',
      noRemaining: 'Has usado tus verificaciones gratuitas de hoy',
    },
    results: {
      scoreTitle: 'Tu Puntuación ATS',
      scoreValue: '{{score}} / 10',
      scoreLow: 'Tu CV podría ser filtrado por los sistemas ATS',
      sectionsTitle: 'Secciones del CV',
      sectionFound: 'Encontrada',
      sectionMissing: 'Falta',
      keywordsTitle: 'Análisis de Palabras Clave con IA',
      keywordsFound: '{{count}} palabras clave detectadas',
      hardSkills: 'Habilidades Técnicas',
      softSkills: 'Habilidades Blandas',
      actionVerbs: 'Verbos de Acción',
      industryTerms: 'Términos de la Industria',
      topKeywords: 'Palabras Clave Principales',
      atsExcellent: 'Excelente',
      atsGood: 'Bueno',
      atsFair: 'Regular',
      atsNeedsWork: 'Necesita Mejora',
      tipsTitle: 'Consejos Rápidos',
    },
    sectionLabels: {
      experience: 'Experiencia Laboral',
      education: 'Educación',
      skills: 'Habilidades',
      summary: 'Resumen Profesional',
      projects: 'Proyectos',
      certifications: 'Certificaciones',
      languages: 'Idiomas',
      achievements: 'Logros',
    },
    hooks: {
      improvementsFound: '{{count}} mejoras encontradas',
      improvementBlurred1: 'Optimiza las descripciones de tu experiencia con palabras clave específicas',
      improvementBlurred2: 'Reestructura las secciones para máxima compatibilidad ATS',
      improvementBlurred3: 'Agrega logros cuantificados para mejorar tu puntuación',
      unlockInsights: 'Regístrate gratis para ver todas las mejoras',
      fullAnalysisTitle: 'Obtén un Análisis ATS Completo',
      fullAnalysisDescription: 'Obtén una lista de verificación detallada por sección con sugerencias de corrección impulsadas por IA.',
      fullAnalysisCta: 'Crear cuenta gratis',
      rateLimitTitle: 'Límite diario alcanzado',
      rateLimitDescription: 'Crea una cuenta gratuita para obtener verificaciones ATS ilimitadas, listas de verificación detalladas y sugerencias de mejora con IA.',
      rateLimitCta: 'Regístrate para verificaciones ilimitadas',
    },
    whyRejected: {
      title: 'Por qué la mayoría de CVs son rechazados',
      bullets: [
        'Faltan palabras clave específicas del puesto que los sistemas ATS buscan',
        'Formato deficiente o estructura de secciones que los analizadores no pueden leer',
        'Logros débiles o sin cuantificar que no destacan',
      ],
    },
    trust: {
      noCard: 'Sin tarjeta de crédito',
      atsTemplates: 'Plantillas compatibles con ATS',
      privacyNote: 'Tus datos se mantienen privados',
    },
    finalCta: {
      title: '¿Listo para superar el ATS?',
      subtitle: 'Crea una cuenta gratuita para desbloquear listas de verificación detalladas, correcciones con IA y plantillas profesionales compatibles con ATS.',
      button: 'Crear cuenta gratis',
    },
  },

  // Página SEO de Traductor de CV
  resumeTranslatorPage: {
    hero: {
      title: 'Traductor de CV con IA — Gratis',
      subtitle: 'Pega tu currículum y tradúcelo a más de 10 idiomas — al instante, gratis, sin registro.',
      ctaPrimary: 'Traducir mi CV ahora',
      ctaSecondary: 'Crear un currículum primero',
    },
    tool: {
      tabUpload: 'Subir CV',
      tabPaste: 'Pegar Texto',
      dropzoneLabel: 'Arrastra tu CV aquí o haz clic para buscar',
      dropzoneHint: 'Admite archivos PDF, DOCX y TXT (máx. 2MB)',
      extracting: 'Extrayendo texto de tu CV...',
      fileReady: '{{fileName}} ({{chars}} caracteres extraídos)',
      removeFile: 'Eliminar',
      extractionError: 'No se pudo extraer texto de este archivo. Intenta pegar el texto de tu CV en su lugar.',
      downloadPdf: 'Descargar PDF Traducido',
      generatingPdf: 'Generando PDF...',
      downloadPdfError: 'No se pudo generar el PDF traducido. Por favor copia el texto en su lugar.',
      pasteLabel: 'Pega el texto de tu currículum',
      pastePlaceholder: 'Pega el contenido de tu currículum aquí (experiencia, educación, habilidades, resumen...)',
      sourceLanguage: 'Idioma de origen',
      autoDetect: 'Auto-detectar',
      targetLanguage: 'Traducir a',
      translateButton: 'Traducir Gratis',
      translating: 'Traduciendo...',
      charCount: '{{count}} / {{max}} caracteres',
      charCountError: 'Límite de caracteres excedido',
      resultLabel: 'Currículum Traducido',
      copyButton: 'Copiar al portapapeles',
      copied: '¡Copiado!',
      remaining: '{{count}} traducción(es) gratuita(s) restante(s) hoy',
      noRemaining: 'Has usado tus traducciones gratuitas de hoy',
    },
    hooks: {
      scoreTitle: 'Puntuación de tu CV',
      scoreValue: '{{score}} / 10',
      scoreLow: 'Los CVs con puntuación menor a 7/10 suelen ser filtrados por sistemas ATS',
      improvementsFound: 'Encontramos {{count}} áreas de mejora',
      improvementBlurred1: 'El resumen profesional podría ser más fuerte con...',
      improvementBlurred2: 'La sección de experiencia necesita más logros cuantificables...',
      improvementBlurred3: 'Faltan palabras clave importantes de la industria para...',
      unlockInsights: 'Regístrate gratis para ver las mejoras detalladas',
      saveTitle: 'Guardar y Descargar PDF',
      saveDescription: 'Crea una cuenta gratuita para guardar tu CV traducido, descargarlo como PDF y obtener tu puntuación ATS completa.',
      saveCta: 'Crear cuenta gratis para guardar',
      fullAnalysisTitle: '¿Quieres un análisis ATS completo?',
      fullAnalysisDescription: 'Obtén tu desglose completo de puntuación, análisis de palabras clave y mejoras con IA.',
      fullAnalysisCta: 'Obtener mi puntuación ATS gratis',
      rateLimitTitle: '¿Quieres traducciones ilimitadas?',
      rateLimitDescription: 'Crea una cuenta gratuita para traducir sin límites y desbloquear mejoras de CV con IA.',
      rateLimitCta: 'Crear cuenta gratis',
    },
    whyDifferent: {
      title: 'Por qué la traducción de CV es diferente',
      bullets: [
        'La traducción literal puede sonar poco natural',
        'La terminología de la industria importa',
        'El formato debe seguir siendo compatible con ATS',
      ],
    },
    supportedLanguages: {
      title: 'Idiomas compatibles',
      description: 'Traduce tu currículum a cualquiera de estos idiomas:',
    },
    trust: {
      noCard: 'Sin tarjeta de crédito',
      atsFriendly: 'Resultado compatible con ATS',
      privacyNote: 'Tus datos se mantienen privados',
    },
    finalCta: {
      title: '¿Listo para ser global?',
      subtitle: 'Traduce tu currículum y postúlate a oportunidades internacionales.',
    },
  },

  // AI Resume Builder SEO Page
  aiResumeBuilderPage: {
    hero: {
      title: 'Creador de CV con IA — Crea un Currículum Profesional en Minutos',
      subtitle: 'Genera un currículum listo para reclutadores desde tu experiencia real, optimiza para ATS y adáptalo a los trabajos que deseas.',
      ctaPrimary: 'Crear mi CV con IA (gratis)',
      ctaSecondaryLinkedIn: 'Importar desde LinkedIn',
      ctaSecondaryUpload: 'Subir mi currículum actual',
    },
    whatAiDoes: {
      title: 'Qué hace la IA',
      bullets: [
        'Crea puntos de logros fuertes desde tu experiencia',
        'Mejora la claridad y el impacto',
        'Mantiene una estructura compatible con ATS',
      ],
    },
    whyThisWorks: {
      title: 'Por qué esto funciona',
      bullets: [
        'Formato optimizado para ATS',
        'Adaptación al puesto disponible cuando la necesites',
        'Plantillas profesionales',
      ],
    },
    templates: {
      title: 'Plantillas de CV profesionales que los reclutadores realmente leen',
      subtitle: 'Diseños limpios y modernos que funcionan con ATS — no diseños llamativos que son rechazados.',
      labels: ['Clásico', 'Moderno', 'Profesional'],
    },
    trust: {
      noCard: 'Sin tarjeta de crédito',
      atsFriendly: 'Resultado compatible con ATS',
      privacyNote: 'Tus datos se mantienen privados',
    },
    finalCta: {
      title: '¿Listo para crear tu currículum?',
      subtitle: 'Comienza gratis y obtén un currículum profesional en minutos.',
    },
    footerSeoMicrocopy: 'Creador de CV con IA · Verificador de CV ATS · CV adaptado a descripción del puesto · Plantillas de CV profesionales · Traducción de currículum',
  },

  // Resume Templates SEO Page
  resumeTemplatesPage: {
    hero: {
      title: 'Plantillas de CV Profesionales — Compatibles con ATS y Listas para Reclutadores',
      subtitle: 'Elige una plantilla limpia y moderna que los sistemas de contratación pueden leer y los reclutadores prefieren.',
      ctaPrimary: 'Comenzar gratis',
    },
    whyTemplatesMatter: {
      title: 'Por qué importan las plantillas',
      bullets: [
        'Diseño legible y estructurado',
        'Formato compatible con ATS',
        'Diseñado para destacar resultados',
      ],
    },
    gallery: {
      title: 'Galería de plantillas',
      useTemplate: 'Usar esta plantilla',
      free: 'Gratis',
      premium: 'Premium',
    },
    trust: {
      noCard: 'Sin tarjeta de crédito',
      atsFriendly: 'Plantillas compatibles con ATS',
      privacyNote: 'Tus datos se mantienen privados',
    },
    footerNote: {
      text: 'Usa una plantilla + contenido con IA para un CV que luce genial y funciona bien.',
    },
    finalCta: {
      title: '¿Listo para crear tu CV?',
      subtitle: 'Elige una plantilla y deja que la IA te ayude a crear contenido convincente.',
    },
  },

  // Authentication
  auth: {
    title: 'Inicia sesión para crear tu CV',
    subtitle: 'Conecta tu cuenta de forma segura',
    loading: 'Conectando tu cuenta segura...',
    providers: {
      google: 'Continuar con Google',
      facebook: 'Continuar con Facebook',
      linkedin: 'Continuar con LinkedIn',
    },
    error: {
      generic: 'Error al iniciar sesión. Inténtalo de nuevo.',
      network: 'Error de conexión. Verifica tu internet.',
    },
  },

  // Wizard Steps
  wizard: {
    actions: {
      saveAndExit: 'Guardar y salir',
    },
    notifications: {
      resumeUpdated: 'Resume actualizado exitosamente',
      progressSavedLocal: 'Progreso guardado localmente',
      loadFromLinkedInSuccess: 'Resume cargado exitosamente desde LinkedIn',
      loadError: 'Error al cargar el resume',
      saveError: 'Error al guardar el resume. Inténtalo de nuevo.'
    },
    errors: {
      freeQuotaUsed: 'Ya has utilizado tu CV gratuito. Por favor actualiza a premium para crear más CVs.',
      mustGenerateFirst: 'Debes generar el CV antes de continuar.',
      generateFirst: 'Debes generar tu CV primero.',
      goToGenerate: 'Ir a Generar CV',
      serverUnavailable: 'Servidor no disponible',
      serverUnavailableDetail: 'Puedes ver y editar tu información, pero no se puede generar un nuevo CV en este momento.',
      generationError: 'Error al generar CV',
      regenerationError: 'Error al regenerar el CV',
      retryGeneration: 'Intentar de nuevo',
      loadingTemplates: 'Cargando templates...',
      calculatingPagination: 'Calculando paginación...',
      errorLoadingTemplates: 'Error al cargar templates',
      errorCalculatingPagination: 'Error al calcular la paginación del template',
      selectTemplateFirst: 'Debes seleccionar un template antes de descargar',
      templateUnavailable: 'Template no disponible para descargar',
      noPagesFound: 'No se encontraron páginas para generar el PDF',
      pdfGeneratedSuccess: 'PDF generado exitosamente',
      pdfGenerationError: 'Error al generar el PDF',
      noTemplateSelected: 'No hay template seleccionado',
      selectTemplateInPreviousStep: 'Por favor, selecciona un template en el paso anterior',
      goBackToSelectTemplate: 'Volver a Seleccionar Template',
      loadingTemplate: 'Cargando template...',
    },
    auth: {
      welcomeLogin: '¡Bienvenido! Iniciando sesión...',
      welcomeLoginLinkedIn: '¡Bienvenido! Iniciando sesión con LinkedIn...',
      googleTokenError: 'No se pudo obtener el token de Google',
      googleLoginError: 'Error al iniciar sesión con Google',
      googleConnectError: 'Error al conectar con Google',
      linkedInLoginError: 'Error al iniciar sesión con LinkedIn',
    },
    noAi: {
      banner: 'Tu CV fue creado sin mejoras de IA.',
      upgradeCta: 'Actualiza a Premium para optimización con IA, puntuación ATS y sugerencias inteligentes.',
      upgradeButton: 'Actualizar a Premium',
      cvTitle: 'Tu CV',
      cvSubtitle: 'Haz clic en cualquier sección para editar',
      scoringTitle: 'Puntuación de CV con IA',
      scoringDescription: 'Obtén una puntuación detallada de compatibilidad ATS, checklist de mejoras y sugerencias con IA para destacar tu CV.',
      scoringFeature1: 'Puntuación de compatibilidad ATS',
      scoringFeature2: 'Checklist de mejoras sección por sección',
      scoringFeature3: 'Sugerencias de mejora con IA',
      skipScoring: 'Saltar Puntuación',
    },
    uploadPage: {
      header: {
        backToDashboard: 'Volver al Dashboard',
        backToOptions: 'Volver a opciones',
        title: 'Subir tu CV actual',
        subtitle: 'Sube tu CV y nosotros lo optimizaremos con IA',
      },
      final: {
        title: '¡Tu CV está Listo!',
        subtitle: {
          generated: 'Tu currículum profesional generado con IA está listo para descargar',
          generating: 'Generando tu currículum profesional con IA...'
        },
        tips: {
          title: 'Tips para la Descarga Final',
          items: [
            'Guarda una copia en PDF para enviar por email',
            'Comparte el enlace para vista previa en línea',
            'Edita el CV si necesitas hacer ajustes finales',
            'Regenera el CV si quieres probar diferentes versiones',
            'Mantén una copia actualizada en tu computadora'
          ]
        },
        success: {
          title: '¡CV Generado Exitosamente!',
          subtitle: 'Tu currículum ha sido optimizado con IA',
          badges: {
            optimized: { title: '✓ Optimizado', description: 'Contenido mejorado' },
            formatted: { title: '✓ Formateado', description: 'Diseño profesional' },
            ready: { title: '✓ Listo', description: 'Para descargar' }
          }
        },
        preview: {
          generatedTitle: 'CV Generado con IA',
          viewTitle: 'Vista Previa del CV',
          viewFull: 'Vista Completa',
          generatingTitle: 'Generando tu CV con IA',
          generatingSubtitle: 'Esto puede tomar unos momentos...'
        },
        actions: {
          edit: 'Editar CV',
          downloadPdf: 'Descargar PDF',
          share: 'Compartir',
          regenerate: 'Regenerar CV'
        },
        nextSteps: {
          title: '¿Qué sigue?',
          share: { title: 'Comparte tu CV', description: 'Envía tu CV a empleadores y reclutadores' },
          update: { title: 'Actualiza Regularmente', description: 'Mantén tu CV actualizado con nuevas experiencias' }
        },
        nav: {
          back: 'Anterior',
          goHome: 'Volver al Inicio'
        }
      },
      selectFileTitle: 'Selecciona tu archivo',
      selectFileDescription: 'Sube tu CV en formato PDF, DOC, DOCX o TXT. Nuestra IA extraerá y optimizará la información automáticamente.',
      clickToSelect: 'Haz clic para seleccionar un archivo',
      acceptedFormats: 'PDF, DOC, DOCX o TXT (máximo 10MB)',
      supportedFormatsLabel: 'Formatos soportados:',
      formats: {
        pdf: 'PDF',
        word: 'Microsoft Word (.doc, .docx)',
        txt: 'Texto plano (.txt)'
      },
      processing: {
        processingTitle: 'Procesando tu CV...',
        selectedTitle: 'Archivo seleccionado',
        message: 'Nuestra IA está extrayendo datos de tu CV y categorizándolos en secciones. Esto puede tomar unos momentos.',
        fileName: 'Archivo: {{name}}',
        uploading: 'Procesando...',
        processWithAI: 'Procesar con IA',
        extractionHint: 'Extrayendo información personal, experiencia laboral, educación y habilidades...',
        title: 'Extrayendo Datos del Currículum',
        subtitle: 'Extrayendo y organizando los datos de tu CV en {{language}}...',
        step1: 'Texto del documento extraído',
        step2: 'Extrayendo y categorizando datos...',
        step3: 'Organizando en secciones',
        generatingIn: 'Generando en'
      },
      languageSelection: {
        title: 'Selecciona el Idioma del Currículum',
        subtitle: 'Elige el idioma en el que quieres generar tu currículum. Todas las sugerencias y contenido de IA estarán en este idioma.',
        explanation: 'El idioma que selecciones se usará para todo el contenido generado por IA, incluyendo sugerencias, mejoras y el texto final del currículum.',
        continue: 'Continuar',
        fileInfo: '{{chars}} caracteres extraídos',
        englishLabel: 'Inglés',
        spanishLabel: 'Español'
      },
      preview: {
        title: 'Información extraída',
        sections: {
          personalInfo: 'Información Personal',
          workExperience: 'Experiencia Laboral',
          skills: 'Habilidades',
        },
        positionsFound: '{{count}} posiciones encontradas'
      },
      actions: {
        reupload: 'Volver a subir',
        continueOptimization: 'Continuar con optimización'
      },
      toasts: {
        invalidType: 'Por favor, selecciona un archivo PDF, DOC, DOCX o TXT',
        tooLarge: 'El archivo es demasiado grande. Máximo 10MB',
        processed: '¡CV procesado exitosamente!',
        processError: 'Error al procesar el archivo. Inténtalo de nuevo.',
        resumeCreated: '¡Currículum creado exitosamente!'
      },
      // New upload flow with client-side extraction
      dragDrop: {
        title: 'Arrastra y suelta tu CV aquí',
        or: 'o',
        browse: 'Explorar archivos',
        hint: 'Soportados: PDF, Word (.docx), Texto plano (.txt)',
        fileSelected: 'Archivo seleccionado',
        changeFile: 'Cambiar archivo'
      },
      extraction: {
        extractingText: 'Extrayendo texto del documento...',
        analyzingContent: 'Analizando contenido con IA...',
        extractionFailed: 'No se pudo extraer texto del documento. Por favor, intenta con otro archivo.',
        notResume: 'El documento subido no parece ser un currículum. Por favor, sube un archivo que contenga tu información de CV.',
        textPreview: 'Vista previa del texto extraído',
        showMore: 'Mostrar más',
        showLess: 'Mostrar menos',
        characters: '{{count}} caracteres extraídos'
      },
      freeUserNotice: {
        title: 'Uso de CV Gratuito',
        message: 'Crear un CV desde esta carga usará tu CV gratuito.',
        upgradeHint: 'Actualiza a Premium para creación ilimitada de CVs.'
      },
      quotaExceeded: {
        title: 'CV Gratuito Ya Usado',
        message: 'Ya has usado tu CV gratuito. Actualiza a Premium para continuar.',
        upgradeButton: 'Actualizar a Premium'
      },
      review: {
        title: 'Revisar Datos Extraídos',
        subtitle: 'Verifica y edita la información extraída de tu CV antes de crear tu currículum.',
        generatingIn: 'Idioma del contenido',
        sections: {
          profile: 'Información del Perfil',
          skills: 'Habilidades',
          experience: 'Experiencia Laboral',
          education: 'Educación',
          certifications: 'Certificaciones',
          projects: 'Proyectos',
          languages: 'Idiomas',
          achievements: 'Logros',
          summary: 'Resumen Profesional'
        },
        required: 'Requerido',
        optional: 'Opcional',
        recommended: 'Recomendado',
        addNew: 'Agregar nuevo',
        removeItem: 'Eliminar',
        noItems: 'No se encontraron elementos',
        addButton: 'Agregar {{item}}',
        validation: {
          requiredFields: 'Por favor, completa todos los campos requeridos',
          fixErrors: 'Por favor, corrige los errores a continuación',
          educationStartDate: 'Educación #{{index}}: Fecha de Inicio es requerida',
          educationEndDate: 'Educación #{{index}}: Fecha de Fin es requerida',
          certificationDate: 'Certificación #{{index}}: Fecha de Obtención es requerida',
          experienceCompany: 'Experiencia #{{index}}: Empresa es requerida',
          experienceStartDate: 'Experiencia #{{index}}: Fecha de Inicio es requerida',
          experienceEndDate: 'Experiencia #{{index}}: Fecha de Fin es requerida',
          experienceDateRange: 'Experiencia #{{index}}: La fecha de fin debe ser posterior a la fecha de inicio',
          achievementDescription: 'Logro #{{index}}: Descripción es requerida'
        },
        actions: {
          back: 'Atrás',
          createResume: 'Crear Currículum'
        },
        creating: 'Creando tu currículum...',
        success: '¡Currículum creado exitosamente!',
        ai: {
          enhance: 'Mejorar con IA',
          enhancing: 'Mejorando...',
          getSuggestions: 'Obtener Sugerencias IA',
          loadingSuggestions: 'Cargando sugerencias...',
          clickToAdd: 'Clic para agregar',
          addAll: 'Agregar Todas',
          enhanced: '¡Texto mejorado!',
          error: 'Error al mejorar texto',
          premiumRequired: 'Premium requerido para funciones IA',
          rateLimitTitle: 'Un momento por favor ⏳',
          rateLimitMessage: '¡Estás mejorando contenido muy rápido! Por favor espera unos segundos antes de intentar de nuevo. Esto nos ayuda a mantener respuestas de IA de calidad.'
        },
        fields: {
          // Profile fields
          firstName: 'Nombre',
          lastName: 'Apellido',
          email: 'Correo Electrónico',
          phone: 'Teléfono',
          profession: 'Profesión / Puesto',
          country: 'País',
          linkedin: 'URL de LinkedIn',
          targetLevel: 'Nivel de Experiencia',
          tone: 'Tono del CV',
          // Experience fields
          jobTitle: 'Puesto',
          company: 'Empresa',
          startDate: 'Fecha Inicio',
          endDate: 'Fecha Fin',
          currentJob: 'Trabajo actual',
          responsibilities: 'Responsabilidades/Logros',
          // Education fields
          degree: 'Título',
          field: 'Campo de Estudio',
          institution: 'Institución',
          isCompleted: 'Completado',
          currentlyStudying: 'Actualmente estudiando aquí',
          // Certification fields
          certificationName: 'Nombre de Certificación',
          issuer: 'Emisor',
          certDate: 'Fecha de Obtención',
          credentialId: 'ID de Credencial',
          certUrl: 'URL de Credencial',
          // Project fields
          projectName: 'Nombre del Proyecto',
          description: 'Descripción',
          technologies: 'Tecnologías',
          url: 'URL',
          projectOngoing: 'Proyecto en curso',
          // Language fields
          languageName: 'Idioma',
          languageLevel: 'Nivel de Dominio',
          // Achievement fields
          achievementTitle: 'Título del Logro',
          year: 'Año',
          // Summary field
          summaryText: 'Resumen Profesional',
          summaryPlaceholder: 'Escribe un breve resumen profesional destacando tus fortalezas clave, experiencia y objetivos profesionales...'
        },
        targetLevelOptions: {
          entry: 'Nivel Inicial (0-2 años)',
          mid: 'Nivel Medio (3-5 años)',
          senior: 'Senior (6-10 años)',
          executive: 'Ejecutivo (10+ años)'
        },
        toneOptions: {
          professional: 'Profesional',
          creative: 'Creativo',
          technical: 'Técnico',
          friendly: 'Amigable'
        },
        languageLevelOptions: {
          basic: 'Básico',
          intermediate: 'Intermedio',
          advanced: 'Avanzado',
          native: 'Nativo'
        }
      },
      scorePage: {
        title: 'Análisis de CV Completado',
        subtitle: 'Revisa tu puntuación ATS y recomendaciones para mejorar tu CV.',
        backToDashboard: 'Volver al Dashboard',
        overallScore: 'Puntuación General',
        quickStats: {
          title: 'Estadísticas Rápidas',
          skills: 'Habilidades',
          experience: 'Experiencia',
          education: 'Educación',
          certifications: 'Certificaciones',
          projects: 'Proyectos',
          achievements: 'Logros',
          languages: 'Idiomas',
          completeness: 'Completitud'
        },
        sectionAnalysis: {
          title: 'Análisis por Sección',
          enhance: 'Mejorar',
          excellent: 'Excelente',
          good: 'Bueno',
          needsWork: 'Necesita Mejoras',
          recommendations: 'Recomendaciones'
        },
        atsTips: {
          title: 'Consejos ATS y Mejores Prácticas',
          description: 'Sigue estas pautas para asegurar que tu CV pase los filtros ATS'
        },
        actions: {
          continueToDashboard: 'Continuar al Dashboard',
          openEditor: 'Abrir Editor de CV',
          enhanceAll: 'Mejorar Todas las Secciones'
        },
        status: {
          excellent: '¡Excelente! Tu CV es altamente competitivo',
          good: '¡Bien! Listo para la mayoría de aplicaciones',
          average: 'Promedio. Se recomiendan algunas mejoras',
          needsWork: 'Necesita trabajo. Sigue las recomendaciones'
        },
        premium: {
          enhanceTitle: 'Mejorar con IA',
          enhanceDescription: 'Usa IA para mejorar automáticamente esta sección',
          upgradeRequired: 'Premium requerido para mejoras con IA'
        }
      }
    },
    linkedinImportPage: {
      header: {
        backToDashboard: 'Volver al Dashboard',
        backToOptions: 'Volver a opciones',
        title: 'Importar desde LinkedIn',
        subtitle: 'Te guiaremos paso a paso para extraer la información de tu perfil de LinkedIn',
      },
      card: {
        title: 'Importar desde tu perfil de LinkedIn',
        description: 'Te guiaremos paso a paso para extraer la información de tu perfil de LinkedIn. Solo necesitas copiar y pegar el contenido de las secciones de tu perfil.'
      },
      features: {
        personalAndSummary: 'Información personal y resumen profesional',
        experience: 'Experiencia laboral completa',
        education: 'Educación y certificaciones',
        projectsSkillsRecommendations: 'Proyectos, habilidades y recomendaciones (opcional)'
      },
      howItWorks: {
        title: '¿Cómo funciona?',
        description: 'Te mostraremos exactamente qué secciones de tu perfil de LinkedIn necesitas copiar. Nuestra IA procesará esta información y la convertirá en un CV profesional optimizado.'
      },
      cta: {
        startImport: 'Comenzar Importación'
      },
      data: {
        title: 'Datos procesados:',
        name: 'Nombre:',
        email: 'Email:',
        linkedin: 'LinkedIn:',
        experience: 'Experiencia:',
        experiencePositions: '{{count}} posiciones',
        education: 'Educación:',
        educationTitles: '{{count}} títulos',
        skills: 'Habilidades:',
        skillsCount: '{{count}} habilidades'
      },
      actions: {
        reimport: 'Volver a importar',
        continue: 'Continuar con estos datos'
      },
      steps: {
        profession: {
          title: 'Profesión',
          description: 'Tu título profesional o puesto actual',
          instructions: [
            '1. Ve a tu perfil de LinkedIn',
            '2. Busca el título profesional que aparece debajo de tu nombre',
            '3. Copia el texto completo de tu profesión',
            '4. Pégalo en el campo de abajo'
          ],
          placeholder: 'Pega aquí tu profesión de LinkedIn (ej: Software Engineer, Product Manager, etc.)...'
        },
        about: {
          title: 'Acerca de',
          description: 'Información personal y resumen profesional',
          instructions: [
            '1. Ve a tu perfil de LinkedIn',
            '2. Busca la sección "Acerca de" o "About"',
            '3. Copia todo el texto de esta sección',
            '4. Pégalo en el campo de abajo'
          ],
          placeholder: 'Pega aquí el contenido de tu sección "Acerca de" de LinkedIn...'
        },
        experience: {
          title: 'Experiencia',
          description: 'Historial laboral y posiciones',
          instructions: [
            '1. Ve a tu perfil de LinkedIn',
            '2. Busca la sección "Experiencia" o "Experience"',
            '3. Copia toda la información de tus trabajos (títulos, empresas, fechas, descripciones)',
            '4. Pégalo en el campo de abajo'
          ],
          placeholder: 'Pega aquí el contenido de tu sección "Experiencia" de LinkedIn...'
        },
        education: {
          title: 'Educación',
          description: 'Formación académica y títulos',
          instructions: [
            '1. Ve a tu perfil de LinkedIn',
            '2. Busca la sección "Educación" o "Education"',
            '3. Copia toda la información de tus estudios (puedes copiar toda la sección)',
            '4. Nuestra IA limpiará automáticamente duplicados y texto innecesario',
            '5. Pégalo en el campo de abajo'
          ],
          placeholder: 'Pega aquí el contenido de tu sección "Educación" de LinkedIn...'
        },
        certifications: {
          title: 'Licencias y Certificaciones',
          description: 'Certificaciones profesionales obtenidas',
          instructions: [
            '1. Ve a tu perfil de LinkedIn',
            '2. Busca la sección "Licencias y certificaciones" o "Licenses & certifications"',
            '3. Copia toda la información de tus certificaciones (puedes copiar toda la sección)',
            '4. Nuestra IA limpiará automáticamente duplicados y texto innecesario',
            '5. Si no tienes certificaciones, puedes omitir este paso'
          ],
          placeholder: 'Pega aquí el contenido de tu sección "Licencias y certificaciones" de LinkedIn...'
        },
        projects: {
          title: 'Proyectos',
          description: 'Proyectos destacados y trabajos relevantes',
          instructions: [
            '1. Ve a tu perfil de LinkedIn',
            '2. Busca la sección "Proyectos" o "Projects"',
            '3. Copia toda la información de tus proyectos (puedes copiar toda la sección)',
            '4. Nuestra IA limpiará automáticamente duplicados y texto innecesario',
            '5. Si no tienes proyectos, puedes omitir este paso'
          ],
          placeholder: 'Pega aquí el contenido de tu sección "Proyectos" de LinkedIn...'
        },
        skills: {
          title: 'Conocimientos y Aptitudes',
          description: 'Habilidades técnicas y competencias',
          instructions: [
            '1. Ve a tu perfil de LinkedIn',
            '2. Busca la sección "Conocimientos y aptitudes" o "Skills & endorsements"',
            '3. Copia la lista de tus habilidades (puedes copiar toda la sección)',
            '4. Nuestra IA limpiará automáticamente duplicados y texto innecesario',
            '5. Si no tienes habilidades listadas, puedes omitir este paso'
          ],
          placeholder: 'Pega aquí el contenido de tu sección "Conocimientos y aptitudes" de LinkedIn...'
        }
      },
      processing: {
        title: 'Procesando tu información',
        subtitle: 'Esto puede tomar unos momentos...',
        warning: '⚠️ Por favor no cierres esta ventana durante el procesamiento',
        messages: [
          '✨ Validando la calidad de tu información...',
          '🤖 Nuestra IA está trabajando duro para crear tu resume perfecto...',
          '📝 Generando contenido profesional y optimizado...',
          '💡 Analizando tu experiencia para destacar tus mejores logros...',
          '🎯 Optimizando tu CV para que pases el filtro ATS...',
          '⚡ Mejorando la estructura y el formato de tu currículum...',
          '🌟 Añadiendo toques profesionales a tu perfil...',
          '💼 Personalizando tu CV para destacar entre la competencia...'
        ],
        steps: [
          {
            title: 'Validando información',
            message: 'Verificando que todos los datos estén completos...'
          },
          {
            title: 'Procesando con IA',
            message: 'Nuestra inteligencia artificial está analizando tu perfil...'
          },
          {
            title: 'Generando resume',
            message: 'Creando tu currículum profesional...'
          },
          {
            title: 'Guardando datos',
            message: 'Almacenando tu información de forma segura...'
          }
        ],
        complete: '¡Procesamiento completado!'
      },
      errors: {
        completeRequiredSteps: 'Por favor completa los pasos requeridos antes de continuar',
        processingError: 'Error al procesar la información',
        linkedInProcessingError: 'Error al procesar la información de LinkedIn',
        premiumRequired: 'La importación de LinkedIn es una función premium. Por favor actualiza para acceder a esta funcionalidad.',
        invalidProfession: 'Por favor ingresa una profesión o cargo válido',
        validationError: 'Error al validar la profesión. Por favor intenta de nuevo.',
        professionValidationHint: 'Ejemplos: Ingeniero de Software, Gerente de Marketing, Enfermero, Contador'
      },
      premiumRequired: {
        title: 'Función Premium Requerida',
        description: 'La importación de LinkedIn es una función premium. Actualiza para acceder a esta funcionalidad e importar los datos de tu perfil de LinkedIn.',
        benefitsTitle: 'Beneficios Premium',
        benefit1: 'Importar desde perfil de LinkedIn',
        benefit2: '30 CVs por mes',
        benefit3: 'Optimización avanzada con IA',
        upgradeButton: 'Actualizar a Premium'
      },
      success: {
        title: '¡Información procesada exitosamente!',
        description: 'Hemos procesado la información de tu perfil de LinkedIn. Revisa los datos y continúa para crear tu CV.',
        linkedInProcessed: '¡Información de LinkedIn procesada exitosamente!'
      },
      wizard: {
        back: 'Volver',
        header: {
          title: 'Importar desde LinkedIn',
          subtitle: 'Te guiaremos paso a paso para extraer la información de tu perfil'
        },
        progress: {
          step: 'Paso {{current}} de {{total}}',
          completed: '{{percentage}}% completado'
        },
        instructions: {
          title: 'Instrucciones paso a paso'
        },
        input: {
          label: '{{title}} de LinkedIn',
          characters: 'caracteres',
          sanitized: 'Contenido sanitizado automáticamente'
        },
        buttons: {
          back: 'Atrás',
          skip: 'Omitir',
          next: 'Siguiente',
          processing: 'Procesando...',
          validating: 'Validando...',
          processInfo: 'Procesar Información'
        },
        help: {
          required: 'Este paso es obligatorio para continuar',
          optional: 'Este paso es opcional. Puedes omitirlo si no tienes esta información.'
        },
        stepBadge: {
          required: 'Paso Requerido',
          optional: 'Paso Opcional'
        },
        processingProgress: {
          completed: '{{percentage}}% completado'
        }
      }
    },
    creationMode: {
      header: {
        backToDashboard: 'Volver al Dashboard',
        title: 'Crea tu CV profesional',
        subtitle: 'Elige cómo quieres crear tu CV. Te guiaremos paso a paso para crear un CV que destaque.',
      },
      manual: {
        title: 'Creación Manual',
        description: 'Completa un formulario paso a paso con tu información profesional. Nuestra IA optimizará tu CV para que destaque.',
        features: {
          guidedForm: 'Formulario guiado paso a paso',
          aiOptimization: 'Optimización automática con IA',
          templates: 'Plantillas profesionales',
          free: 'Completamente gratuito',
        },
        cta: 'Crear',
        timeEstimate: 'Tiempo estimado: 10–15 minutos',
      },
      upload: {
        title: 'Subir CV Actual',
        description: 'Sube tu CV actual y nosotros lo optimizaremos con IA. Extraeremos la información y la mejoraremos automáticamente.',
        features: {
          dataExtraction: 'Extracción automática de datos',
          aiOptimization: 'Optimización con IA avanzada',
          multiFormat: 'Múltiples formatos soportados',
          editing: 'Edición posterior disponible',
        },
        cta: 'Subir CV',
        timeEstimate: 'Tiempo estimado: 2–5 minutos',
        freeNotice: 'Usa tu CV gratuito',
      },
      linkedin: {
        title: 'LinkedIn Public Profile',
        description: {
          loggedIn: 'Importa automáticamente tu información desde tu perfil de LinkedIn con el que iniciaste sesión.',
          publicUrl: 'Importa tu información desde tu perfil público de LinkedIn. Solo necesitas pegar la URL de tu perfil.',
          premiumRequired: 'La importación de LinkedIn es una función premium. Actualiza para acceder a esta funcionalidad.',
        },
        features: {
          automaticImport: 'Importación automática',
          urlImport: 'Importación desde URL',
          fullData: 'Datos profesionales completos',
          aiOptimization: 'Optimización con IA',
          experienceEducation: 'Experiencia y educación',
        },
        cta: 'Importar',
        upgradeCta: 'Actualizar a Premium',
        premiumBadge: 'Premium',
        timeEstimate: 'Tiempo estimado: 1–3 minutos',
      },
    },
    title: 'Crea tu CV Profesional',
    subtitle: 'Te guiaremos paso a paso',
    modeToggle: {
      manual: 'Modo Manual',
      guided: 'Modo Guiado',
    },
    steps: {
      profile: {
        title: 'Perfil Profesional',
        description: 'Cuéntanos sobre tu área de trabajo',
        ui: {
          sectionTitle: 'Perfil Profesional',
          tips: {
            title: 'Tips para tu Perfil Profesional',
            items: [
              'Usa tu nombre real como aparece en documentos oficiales',
              'Selecciona tu país de residencia actual',
              'Agrega tu perfil LinkedIn para mayor credibilidad (opcional)',
              'Describe tu trabajo actual o el área en la que te especializas',
              'Sé honesto sobre tu experiencia para atraer las oportunidades correctas',
              'Incluye tu número principal de contacto para oportunidades laborales',
              'Usa un email profesional, preferiblemente con tu nombre',
              'Elige un tono que refleje tu personalidad profesional',
              'Selecciona el idioma principal en el que quieres que aparezca tu CV'
            ]
          },
          guided: {
            title: 'Preguntas Guiadas',
            firstName: { label: '¿Cuál es tu nombre?', placeholder: 'Tu nombre' },
            lastName: { label: '¿Cuáles son tus apellidos?', placeholder: 'Tus apellidos' },
            country: { label: '¿En qué país resides?', placeholder: 'Selecciona tu país' },
            linkedin: { label: '¿Tienes perfil de LinkedIn? (Opcional)', placeholder: 'https://linkedin.com/in/tu-perfil', hint: 'Agrega tu perfil profesional para mayor credibilidad' },
            profession: { label: '¿Cuál es tu profesión? ¿A qué te dedicas?', placeholder: 'Ej: Desarrollador de Software, Especialista en Marketing Digital, Gerente de Recursos Humanos...' },
            level: {
              options: {
                entry: 'Principiante (0-2 años)',
                mid: 'Intermedio (3-5 años)',
                senior: 'Senior (6-10 años)',
                executive: 'Ejecutivo (10+ años)'
              }
            },
            phone: { label: '¿Cuál es tu número de teléfono?', placeholder: '+1 (555) 123-4567', hint: 'Este será tu contacto principal para oportunidades laborales' },
            email: { label: '¿Cuál es tu email profesional?', placeholder: 'tu.email@empresa.com', hint: 'Usaremos tu email registrado, pero puedes cambiarlo si lo deseas' }
          }
        },
        questions: {
          industry: '¿En qué área deseas desarrollarte?',
          level: '¿Qué nivel de experiencia tienes?',
        },
        tips: 'Usa palabras clave de tu sector (Ej. "Diseñador UX" o "Desarrollador Backend")',
        motivator: '¡Gran inicio! Tu perfil es la primera impresión profesional.',
        cvLanguage: 'Idioma del CV',
        cvTone: 'Tono del CV',
        tones: {
          professional: 'Profesional',
          creative: 'Creativo',
          technical: 'Técnico',
          friendly: 'Amigable',
        },
      },
      skills: {
        title: 'Habilidades',
        description: 'Destaca tus fortalezas profesionales',
        ui: {
          sectionTitle: 'Habilidades',
          tips: {
            title: 'Tips para tus Habilidades',
            items: [
              'Incluye tecnologías, lenguajes de programación, herramientas específicas',
              'Liderazgo, comunicación, trabajo en equipo, resolución de problemas',
              'Software, plataformas, sistemas que dominas (ej: React, Photoshop, Excel, Salesforce)',
              'Menciona certificaciones relevantes si las tienes',
              'Coloca las más relevantes para tu objetivo profesional primero'
            ]
          },
          guided: {
            title: 'Preguntas Guiadas',
            fillProfessionHint: 'Completa tu profesión en el paso anterior'
          },
          ai: {
            suggestionsButton: 'Sugerencias con IA',
            generating: 'Generando sugerencias...',
            noneForProfession: 'No hay sugerencias disponibles para esta profesión.'
          },
          placeholders: {
            skill: 'Ej: JavaScript, React, Liderazgo, Análisis de datos, Excel...',
          },
          suggestions: {
            titleSkills: 'Sugerencias de IA para Habilidades',
            addAll: 'Agregar Todas',
          }
        },
        questions: {
          skills: '¿Qué habilidades y herramientas te diferencian?',
        },
        tips: 'Combina habilidades técnicas ("React", "AWS"), herramientas ("Photoshop", "Excel") y habilidades blandas ("liderazgo")',
        motivator: '¡Excelente! Tus habilidades muestran tu potencial.',
        skillsLabel: 'Habilidades',
        addSkillPlaceholder: 'Agregar habilidad...',
        errors: {
          invalidProfession: 'Por favor ingresa una profesión válida en el paso anterior. La IA no puede generar sugerencias para texto inválido.',
        },
      },
      experience: {
        title: 'Experiencia Laboral',
        description: 'Describe tu trayectoria profesional',
        ui: {
          sectionTitle: 'Experiencia Laboral',
          tips: {
            title: 'Tips para tu Experiencia Laboral',
            items: [
              "Usa números y métricas (ej: 'Aumenté ventas 25%', 'Reduje costos $50K')",
              'Describe qué hiciste, no solo tu título',
              'Enfócate en el valor que aportaste a la empresa',
              "Usa verbos fuertes como 'Lideré', 'Implementé', 'Optimicé'",
              'Prioriza experiencias relacionadas con tu objetivo profesional'
            ]
          },
          guided: {
            title: 'Preguntas Guiadas'
          },
          form: {
            experienceN: 'Experiencia {{index}}',
            remove: 'Eliminar',
            position: 'Puesto',
            company: 'Empresa',
            startDate: 'Fecha de inicio',
            endDate: 'Fecha de fin',
            endAfterStartError: 'La fecha de fin debe ser posterior a la fecha de inicio',
            currentJob: 'Trabajo actual',
            achievements: 'Logros y resultados',
            addAchievement: 'Agregar logro',
            addExperience: 'Agregar experiencia laboral'
          },
          ai: {
            suggestionsButton: 'Sugerencias con IA',
            jobTitleRequired: 'Por favor, ingresa el título del puesto para obtener sugerencias de IA.'
          },
          alerts: {
            invalidDatesTitle: 'Fechas inválidas',
            invalidDatesMessage: 'Por favor, verifica que la fecha de fin sea posterior a la fecha de inicio en todas las experiencias.'
          },
          placeholders: {
            position: 'Ej: Desarrollador Frontend',
            company: 'Ej: Tech Corp',
            achievement: 'Ej: Aumenté las ventas un 25% en 6 meses'
          },
          confirm: {
            deleteAchievement: 'Eliminar logro'
          }
        },
        questions: {
          position: '¿Cuál fue tu puesto y principales responsabilidades?',
          achievements: '¿Qué logros cuantificables alcanzaste?',
        },
        ai: {
          suggestions: {
            title: 'Sugerencias de Logros con IA',
            description: 'Obtén sugerencias personalizadas de logros basadas en tu puesto',
            button: 'Sugerencias con IA',
            loading: 'Generando sugerencias...',
            error: 'Error al cargar sugerencias',
            retry: 'Intentar de nuevo',
            select: 'Selecciona los logros que quieres agregar',
            addSelected: 'Agregar Seleccionados',
            fromCache: 'Sugerencias obtenidas del cache'
          },
           enhance: {
             title: 'Mejorar con IA',
             description: 'Optimiza tu texto con inteligencia artificial',
             button: 'Mejorar con IA',
             loading: 'Mejorando texto con IA...',
             error: 'Error al mejorar el texto',
             retry: 'Intentar de nuevo',
             original: 'Texto Original',
             enhanced: 'Texto Mejorado con IA',
             improvements: 'Mejoras aplicadas: El texto ha sido optimizado con métricas específicas, verbos de acción más fuertes y un enfoque en resultados medibles.',
             approve: 'Aprobar Mejora',
             reject: 'Rechazar',
             review: 'Revisa los cambios y decide si quieres aplicar la mejora',
             tooltip: 'Mejora este logro con IA para hacerlo más impactante y profesional con métricas específicas'
           }
        },
        tips: 'Usa métricas: "Aumenté ventas un 20%" o "Reduje errores 30%"',
        motivator: '¡Tus logros hablan por ti! Buen trabajo.',
      },
      education: {
        title: 'Educación y Certificaciones',
        description: 'Tu formación académica y profesional',
        ui: {
          sectionTitle: 'Educación y Certificaciones',
          tips: {
            title: 'Tips para Educación y Certificaciones',
            items: [
              'Incluye títulos universitarios, técnicos o especializaciones',
              'Cursos, bootcamps, talleres relevantes',
              'Credenciales profesionales que validen tus habilidades',
              "Si aprendiste por tu cuenta, menciónalo como 'Estudios autodidactas'",
              'Prioriza la formación relacionada con tu objetivo profesional',
              'Incluye años de inicio y graduación cuando sea relevante'
            ]
          },
          skipButton: 'Omitir este paso',
          education: {
            title: 'Educación',
            entryTitle: 'Educación {{index}}',
            labels: {
              institution: 'Institución',
              degree: 'Título',
              field: 'Campo de estudio',
              graduationYear: 'Año de graduación'
            },
            placeholders: {
              institution: 'Universidad Nacional',
              degree: 'Licenciatura en Ingeniería',
              field: 'Ingeniería de Software',
              graduationYear: '2020'
            },
            addButton: 'Agregar educación'
          },
          certifications: {
            title: 'Certificaciones',
            entryTitle: 'Certificación {{index}}',
            labels: {
              name: 'Nombre',
              issuer: 'Emisor',
              date: 'Fecha',
              credentialId: 'ID de credencial'
            },
            placeholders: {
              name: 'AWS Certified Developer',
              issuer: 'Amazon Web Services',
              credentialId: 'AWS-123456'
            },
            addButton: 'Agregar certificación'
          }
        },
        questions: {
          education: '¿Dónde estudiaste o te capacitaste?',
          certifications: '¿Tienes cursos o certificaciones relevantes?',
        },
        tips: 'Destaca formación autodidacta o logros laborales',
        motivator: 'Tu aprendizaje es valioso, con o sin títulos.',
        skipOption: 'No tengo estudios formales',
      },
      projects: {
        title: 'Proyectos e Idiomas',
        description: 'Muestra tu trabajo y habilidades lingüísticas',
        ui: {
          sectionTitle: 'Proyectos e Idiomas',
          tips: {
            title: 'Tips para Proyectos e Idiomas',
            items: [
              'Incluye trabajos freelance, proyectos de código abierto, voluntariado',
              'Describe el impacto y los resultados obtenidos',
              'Menciona las herramientas y tecnologías que dominaste',
              'Sé honesto sobre tu nivel (básico, intermedio, avanzado, nativo)',
              'Incluye enlaces a GitHub, portafolio, o demos en vivo',
              'Especifica cuánto tiempo te tomó completar cada proyecto'
            ]
          },
          projects: {
            title: 'Proyectos',
            entryTitle: 'Proyecto {{index}}',
            labels: {
              name: 'Nombre del proyecto',
              url: 'URL (opcional)',
              description: 'Descripción',
              startDate: 'Fecha de inicio',
              endDate: 'Fecha de fin',
              ongoing: 'Proyecto en curso'
            },
            placeholders: {
              name: 'E-commerce App',
              url: 'https://mi-proyecto.com',
              description: 'Describe el proyecto, tu rol y los resultados obtenidos...'
            },
            addButton: 'Agregar proyecto'
          },
          languages: {
            title: 'Idiomas',
            entryTitle: 'Idioma {{index}}',
            labels: {
              name: 'Idioma',
              level: 'Nivel'
            },
            placeholders: {
              name: 'Inglés'
            },
            levelOptions: {
              basic: 'Básico',
              intermediate: 'Intermedio',
              advanced: 'Avanzado',
              native: 'Nativo'
            },
            addButton: 'Agregar idioma'
          }
        },
        questions: {
          projects: '¿Qué proyectos personales o laborales te enorgullecen?',
          languages: '¿Qué idiomas hablas y con qué nivel?',
        },
        ai: {
          enhance: {
            button: 'Mejorar con IA',
            title: 'Mejorar Descripción del Proyecto con IA',
            description: 'Optimiza la descripción de tu proyecto con inteligencia artificial',
            loading: 'Mejorando descripción con IA...',
            error: 'Error al mejorar la descripción',
            retry: 'Intentar de nuevo',
            original: 'Descripción Original',
            enhanced: 'Descripción Mejorada con IA',
            improvements: 'Mejoras aplicadas: La descripción ha sido optimizada con detalles técnicos más específicos, resultados medibles y un enfoque en el impacto del proyecto.',
            approve: 'Aprobar Mejora',
            reject: 'Rechazar',
            review: 'Revisa los cambios y decide si quieres aplicar la mejora',
            tooltip: 'Mejora la descripción del proyecto con IA para destacar resultados, tecnologías y el impacto alcanzado'
          }
        },
        tips: 'Incluye proyectos personales o de voluntariado',
        motivator: 'Cada proyecto refleja tu crecimiento.',
      },
      achievements: {
        ui: {
          headerTitle: 'Logros Clave',
          headerSubtitle: 'Destaca tus mayores logros y reconocimientos profesionales',
          tips: {
            title: 'Tips para Logros Clave',
            items: [
              'Incluye números y métricas específicas',
              'Premios, certificaciones, rankings',
              'Ahorros, mejoras, innovaciones',
              'Proyectos exitosos que dirigiste',
              'Lo que te diferencia de otros candidatos'
            ]
          },
          ai: {
            suggestionsButton: 'Sugerencias con IA',
            panelTitle: 'Sugerencias de IA para Logros',
            generating: 'Generando sugerencias personalizadas...',
            clickToAdd: 'Haz clic en cualquier sugerencia para agregarla como logro:',
            preconditions: {
              noProfession: 'Completa tu profesión en el paso anterior para usar las sugerencias de IA',
              noProjects: 'Agrega al menos un proyecto en el paso anterior para usar las sugerencias de IA'
            },
            errorLoading: 'Error al cargar sugerencias de IA'
          },
          list: {
            itemTitleN: 'Logro {{index}}',
            labels: {
              title: 'Título del Logro',
              description: 'Descripción',
              year: 'Año'
            },
            placeholders: {
              title: 'Ej: Aumenté las ventas 40% en 6 meses',
              description: 'Describe el contexto, acciones y resultados...',
              year: '2023'
            },
            addButton: 'Agregar Logro'
          },
          skip: {
            message: '¿No tienes logros específicos para destacar? No te preocupes, puedes continuar sin agregar logros.',
            continue: 'Continuar sin logros'
          },
          motivator: 'Los logros son tu carta de presentación. ¡Destaca lo que te hace único!'
        }
      },
      summary: {
        title: 'Resumen y Logros Clave',
        description: 'Sintetiza tu experiencia profesional',
        ui: {
          tips: {
            title: 'Tips para tu Resumen Profesional',
            items: [
              'Máximo 3-4 líneas, evita información redundante',
              'Destaca tus mayores logros y fortalezas únicas',
              'Incluye términos relevantes para tu industria',
              "Escribe en tercera persona (ej: 'Profesional con 5 años...')",
              'Explica qué puedes aportar a la empresa',
              'Menciona qué te hace único en tu campo'
            ]
          },
          guided: {
            title: 'Preguntas Guiadas',
            fillProfessionHint: 'Completa tu profesión en el paso anterior'
          },
          ai: {
            suggestionsButton: 'Sugerencias con IA',
            expPanelTitle: 'Sugerencias de IA para Experiencia',
            diffPanelTitle: 'Sugerencias de IA para Diferenciadores',
            generating: 'Generando sugerencias...',
            noneForProfession: 'No hay sugerencias disponibles para esta profesión.',
            errorLoading: 'No se pudieron cargar las sugerencias. Por favor, intenta de nuevo.'
          },
          placeholders: {
            summary: 'Describe tu experiencia profesional en 3-4 líneas...',
            differentiators: '¿Qué te diferencia de otros profesionales en tu área?'
          },
          counters: {
            summary: '{{count}} caracteres',
            totalLabel: 'Total de caracteres: {{count}}/3,500',
            nearLimit: 'Te estás acercando al límite de caracteres. Considera ser más conciso.'
          }
        },
        questions: {
          summary: '¿Cómo describirías tu experiencia en una frase?',
          achievements: '¿Qué te diferencia de otros profesionales?',
        },
        tips: 'Sé breve y enfocado: 3-4 líneas máximo',
        motivator: '¡Tu resumen será la joya de tu currículum!',
        improveButton: 'Mejorar redacción',
        enhanceWithAI: 'Mejorar con IA',
        enhanceTooltip: 'Deja que la IA mejore tu texto para que sea más profesional e impactante',
      },
      review: {
        title: 'Revisión y Descarga',
        description: 'Revisa tu CV antes de descargarlo',
        actions: {
          download: 'Descargar CV',
          watchAd: 'Actualizar a Premium',
          upgrade: 'Actualizar a Premium',
          translate: 'Traducir con AI Language Adaptor',
        },
      },
      preview: {
        title: 'Vista previa de tu CV',
        description: 'Revisa y ajusta tu información antes de descargar',
        ui: {
          tips: {
            title: 'Tips para la Revisión Final',
            items: [
              'Verifica que no haya errores tipográficos',
              'Asegúrate de que el formato sea uniforme en todo el CV',
              'Confirma que todos los datos estén al día',
              'Verifica que toda la información sea pertinente para tu objetivo',
              'Asegúrate de que tu teléfono y email sean correctos'
            ]
          },
          states: {
            generatingTitle: 'Generando tu CV con IA',
            generatingSubtitle: 'Esto puede tomar unos momentos...'
          },
          regenerate: 'Regenerar CV',
          editor: {
            generatedTitle: 'CV Generado con IA',
            viewTitle: 'Tu CV - Haz clic en cualquier sección para editar',
            regenerate: 'Regenerar CV',
            serverUnavailable: 'Servidor no disponible'
          },
          sections: {
            header: {
              edit: 'Editar'
            },
            summary: {
              title: 'Resumen Profesional',
              edit: 'Editar'
            },
            experience: {
              title: 'Experiencia Laboral',
              edit: 'Editar'
            },
            education: {
              title: 'Educación',
              edit: 'Editar'
            },
            skills: {
              title: 'Habilidades',
              technical: 'Técnicas',
              tools: 'Herramientas',
              edit: 'Editar'
            },
            empty: {
              title: 'No hay CV generado',
              subtitle: 'Ve al paso anterior para generar tu CV con IA'
            }
          }
        },
        generation: {
          title: 'Generando tu CV con IA...',
          tip: 'Tip: Mientras esperas, puedes revisar que toda tu información esté correcta',
          remaining: 'Tiempo restante: {{time}}',
          finalizing: 'Finalizando tu CV...',
          phases: {
            analyzing: 'Analizando tu experiencia profesional...',
            optimizing: 'Optimizando logros y métricas...',
            summary: 'Generando resumen profesional...',
            organizing: 'Organizando habilidades y proyectos...',
            ats: 'Aplicando optimización ATS...',
            finalizing: 'Finalizando tu CV...'
          },
          timeout: {
            title: 'La generación está tomando más tiempo del esperado',
            message: 'Por favor, mantén esta ventana abierta. La IA está trabajando en tu CV.',
            retry: 'Cancelar y reintentar'
          }
        },
        generatedResume: {
        sections: {
          contact: {
            title: 'Información de Contacto',
            fullName: 'Nombre Completo',
            email: 'Correo Electrónico',
            phone: 'Teléfono',
            location: 'Ubicación',
            linkedin: 'LinkedIn'
          },
          summary: {
            title: 'Resumen Profesional',
            placeholder: 'Ingresa tu resumen profesional...'
          },
          experience: {
            title: 'Experiencia Laboral',
            jobTitle: 'Cargo',
            company: 'Empresa',
            duration: 'Duración',
            startDate: 'Fecha de Inicio',
            endDate: 'Fecha de Fin',
            currentJob: 'Trabajo actualmente aquí',
            location: 'Ubicación',
            description: 'Descripción',
            achievements: 'Logros Clave',
            skills: 'Habilidades',
            addAchievement: 'Agregar Logro'
          },
          skills: {
            title: 'Habilidades',
            technical: 'Habilidades Técnicas',
            soft: 'Habilidades Blandas',
            tools: 'Herramientas',
            addSkill: 'Agregar Habilidad'
          },
          education: {
            title: 'Educación',
            degree: 'Título',
            institution: 'Institución',
            field: 'Campo de Estudio',
            duration: 'Duración',
            graduationYear: 'Año de Graduación',
            graduationYearPlaceholder: 'ej. 2022',
            gpa: 'GPA',
            coursework: 'Cursos Relevantes',
            honors: 'Honores'
          },
          certifications: {
            title: 'Certificaciones',
            name: 'Nombre de Certificación',
            issuer: 'Emisor',
            date: 'Fecha',
            credentialId: 'ID de Credencial',
            skills: 'Habilidades Relacionadas'
          },
          projects: {
            title: 'Proyectos',
            name: 'Nombre del Proyecto',
            duration: 'Duración',
            startDate: 'Fecha de Inicio',
            endDate: 'Fecha de Fin',
            ongoing: 'Proyecto en progreso',
            description: 'Descripción',
            technologies: 'Tecnologías',
            achievements: 'Logros',
            viewProject: 'Ver Proyecto'
          },
          achievements: {
            title: 'Logros Generales'
          },
          languages: {
            title: 'Idiomas',
            language: 'Idioma',
            level: 'Nivel',
            certifications: 'Certificaciones'
          }
        },
        actions: {
          edit: 'Editar',
          save: 'Guardar',
          cancel: 'Cancelar',
          aiSuggestions: 'Sugerencias de IA',
          enhanceWithAI: 'Mejorar con IA',
          addExperience: 'Agregar Experiencia',
          addEducation: 'Agregar Educación',
          addCertification: 'Agregar Certificación',
          addProject: 'Agregar Proyecto',
          addLanguage: 'Agregar Idioma',
          confirmDelete: 'Confirmar Eliminación',
          deleteWarning: 'Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este elemento?',
          suggestAchievements: 'Sugerir Logros',
          enhanceDescription: 'Mejorar Descripción'
        }
        }
      },
      final: {
        title: '¡Tu CV está Listo!',
        subtitle: {
          generated: 'Tu currículum profesional generado con IA está listo para descargar',
          generating: 'Generando tu currículum profesional con IA...'
        },
        tips: {
          title: 'Tips para la Descarga Final',
          items: [
            'Guarda una copia en PDF para enviar por email',
            'Comparte el enlace para vista previa en línea',
            'Edita el CV si necesitas hacer ajustes finales',
            'Regenera el CV si quieres probar diferentes versiones',
            'Mantén una copia actualizada en tu computadora'
          ]
        },
        success: {
          title: '¡CV Generado Exitosamente!',
          subtitle: 'Tu currículum ha sido optimizado con IA',
          badges: {
            optimized: { title: '✓ Optimizado', description: 'Contenido mejorado' },
            formatted: { title: '✓ Formateado', description: 'Diseño profesional' },
            ready: { title: '✓ Listo', description: 'Para descargar' }
          }
        },
        preview: {
          generatedTitle: 'CV Generado con IA',
          viewTitle: 'Vista Previa del CV',
          viewFull: 'Vista Completa',
          generatingTitle: 'Generando tu CV con IA',
          generatingSubtitle: 'Esto puede tomar unos momentos...'
        },
        actions: {
          edit: 'Editar CV',
          downloadPdf: 'Descargar PDF',
          share: 'Compartir',
          regenerate: 'Regenerar CV'
        },
        nextSteps: {
          title: '¿Qué sigue?',
          share: { title: 'Comparte tu CV', description: 'Envía tu CV a empleadores y reclutadores' },
          update: { title: 'Actualiza Regularmente', description: 'Mantén tu CV actualizado con nuevas experiencias' }
        },
        nav: {
          back: 'Anterior',
          goHome: 'Volver al Inicio'
        },
        features: {
          title: 'Qué Puedes Hacer',
          subtitle: 'Herramientas poderosas para maximizar tu búsqueda de empleo',
          editButton: 'Editar CV',
          cards: {
            download: {
              title: 'Descargar PDF',
              description: 'Guarda tu currículum como archivo PDF',
            },
            translate: {
              title: 'Traducir',
              description: 'Convierte a más de 12 idiomas al instante',
            },
            share: {
              title: 'Compartir CV',
              description: 'Obtén enlace y código QR para compartir',
            },
            trackViews: {
              title: 'Ver Visitas',
              description: 'Mira quién vió tu currículum',
            },
            tailor: {
              title: 'Personalizar para Trabajo',
              description: 'Optimiza para ofertas de trabajo específicas',
            },
            rescore: {
              title: 'Re-evaluar',
              description: 'Obtén puntuación ATS actualizada',
            },
            enhance: {
              title: 'Mejorar con IA',
              description: 'Mejora el contenido con sugerencias de IA',
            },
          },
        },
        errors: {
          noResumeId: 'No se encontró ID del currículum. Por favor guarda tu currículum primero.',
          loadResumeFailed: 'Error al cargar datos del currículum.',
        },
      },
    },
    linkedinImport: {
      title: 'Importar desde LinkedIn',
      subtitle: 'Importa tu información desde tu perfil de LinkedIn',
      oauth: {
        title: 'Importar desde tu perfil de LinkedIn',
        description: 'Usaremos la información de tu perfil de LinkedIn con el que iniciaste sesión para crear tu CV.',
        features: [
          'Información personal y de contacto',
          'Experiencia laboral',
          'Educación y certificaciones',
          'Habilidades y logros'
        ],
        button: 'Importar desde LinkedIn',
        importing: 'Importando...'
      },
      url: {
        title: 'Ingresa tu perfil público de LinkedIn',
        description: 'Copia y pega la URL de tu perfil público de LinkedIn para importar tu información.',
        urlLabel: 'URL de tu perfil de LinkedIn',
        urlPlaceholder: 'https://linkedin.com/in/tuusuario',
        helpLink: '¿Cómo encontrar mi URL de perfil público?',
        button: 'Importar desde LinkedIn',
        importing: 'Importando...'
      },
      success: {
        title: '¡Perfil importado exitosamente!',
        description: 'Hemos extraído la información de tu perfil de LinkedIn. Revisa los datos y continúa para crear tu CV.',
        dataImported: 'Datos importados:',
        name: 'Nombre',
        email: 'Email',
        linkedin: 'LinkedIn',
        experience: 'Experiencia',
        education: 'Educación',
        continue: 'Continuar con estos datos',
        reimport: 'Volver a importar'
      },
      errors: {
        urlRequired: 'Por favor, ingresa la URL de tu perfil de LinkedIn',
        invalidUrl: 'Por favor, ingresa una URL válida de LinkedIn (ej: https://linkedin.com/in/tuusuario)',
        importError: 'Error al importar el perfil de LinkedIn. Inténtalo de nuevo.',
        generic: 'Error al importar el perfil de LinkedIn'
      }
    },
    validation: {
      pleaseComplete: 'Por favor, completa los siguientes campos:',
      skills: {
        requirement: 'Requerido: {{count}}/{{min}} habilidades (agrega {{remaining}} más)',
        requirementMet: '✓ {{count}} habilidades agregadas (requisito mínimo cumplido)',
        tooltip: 'Por favor, agrega al menos {{min}} habilidades para continuar',
      },
      experience: {
        requirement: 'Requerido: Agrega al menos 1 experiencia laboral',
        requirementMet: '✓ {{count}} experiencia{{plural}} agregada{{plural}}',
        tooltip: 'Por favor, agrega al menos una experiencia con todos los campos requeridos (Posición, Empresa, Fecha de Inicio)',
        alertAdd: 'Por favor, agrega al menos una experiencia laboral para continuar.',
        alertComplete: 'Por favor, completa todos los campos requeridos (Posición, Empresa, Fecha de Inicio) para todas las experiencias.',
        atLeastOne: 'Se requiere al menos una experiencia laboral',
        incompleteFields: 'Por favor, completa todos los campos requeridos (Posición, Empresa, Fecha de Inicio) para todas las experiencias',
        invalidDates: 'Todas las experiencias deben tener fechas válidas (la fecha de fin debe ser posterior a la fecha de inicio)',
      },
      projects: {
        optional: 'Opcional: Agrega proyectos para destacar tu trabajo',
        requirement: 'Requerido: {{count}} proyecto{{plural}} (agrega al menos 1 con Nombre y Descripción)',
        requirementMet: '✓ {{count}} proyecto{{plural}} agregado{{plural}} (requisito mínimo cumplido)',
        tooltip: 'Por favor, agrega al menos un proyecto con Nombre y Descripción para continuar',
        alertAdd: 'Por favor, agrega al menos un proyecto para continuar.',
        alertComplete: 'Por favor, completa todos los campos requeridos (Nombre, Descripción) para todos los proyectos.',
        incomplete: 'Todos los proyectos deben tener Nombre y Descripción. Por favor, completa todos los campos o elimina los proyectos incompletos.',
      },
      achievements: {
        optional: 'Opcional: Agrega logros para destacar tus éxitos',
        requirement: 'Requerido: {{count}} logro{{plural}} (agrega al menos 1 con Título y Descripción)',
        requirementMet: '✓ {{count}} logro{{plural}} agregado{{plural}} (requisito mínimo cumplido)',
        tooltip: 'Por favor, agrega al menos un logro con Título y Descripción para continuar',
        incomplete: 'Todos los logros deben tener Título y Descripción. Por favor, completa todos los campos o elimina los logros incompletos.',
      },
      summary: {
        requirement: 'Requerido: Resumen ({{current}}/50 caracteres), Descripción del Puesto ({{jobCurrent}}/30 caracteres)',
        requirementMet: '✓ Todos los requisitos cumplidos',
        tooltip: 'Por favor, completa el Resumen (mín. 50 caracteres) y la Descripción del Puesto (mín. 30 caracteres) para continuar',
        characters: '{{count}}/{{min}} caracteres',
        minimumRequired: '(mínimo requerido)',
        alertComplete: 'Por favor, completa lo siguiente: {{errors}}',
      },
    },
    rateLimit: {
      title: 'Límite de uso alcanzado',
      defaultMessage: 'Has realizado demasiadas solicitudes. Por favor, espera antes de intentar de nuevo.',
      freeUserMessage: 'Los usuarios gratuitos tienen un uso limitado de las funciones de IA.',
      premiumUserMessage: 'Has alcanzado un límite temporal. Como usuario Premium, tienes límites mucho más altos que los usuarios gratuitos. Por favor, espera un momento.',
      premiumUserBenefit: 'Los usuarios Premium disfrutan de 5x más solicitudes de IA por minuto que los usuarios gratuitos.',
      waitMessage: 'Por favor, espera 1 minuto antes de intentar de nuevo.',
      waitCountdown: 'Podrás intentar de nuevo en {{time}}',
      canRetryNow: '¡Ya puedes intentar de nuevo!',
      upgradeCta: 'Actualizar a Premium',
      premiumBenefit: 'Obtén 10x más sugerencias de IA por minuto',
      retryButton: 'Intentar de nuevo',
      progressSaved: 'Tu progreso se ha guardado automáticamente. Puedes esperar o volver más tarde.',
      // Mensajes específicos para recalificar
      rescoreTitle: 'Límite de Calificación Alcanzado',
      rescorePremiumMessage: 'La calificación de CVs usa análisis de IA. Para garantizar resultados de calidad para todos, hay un límite de uso justo de 5 calificaciones por minuto. Podrás intentar de nuevo en breve.',
      premiumLimitExplainer: 'Los usuarios Premium pueden calificar hasta 5 CVs por minuto',
    },
    score: {
      readyToScore: 'Listo para Calificar tu CV',
      scoreDescription: 'Obtén un análisis con IA de tu CV con mejoras accionables.',
      scoreButton: 'Calificar CV',
      rescoreButton: 'Recalificar CV',
      scoring: 'Calificando...',
      scoreSuccess: '¡CV calificado exitosamente!',
      scoreError: 'Error al calificar el CV. Por favor, intenta de nuevo.',
      freeUserNote: 'Los usuarios gratuitos obtienen una calificación por CV',
      alreadyScored: 'CV Ya Calificado',
      upgradeToRescore: 'Actualiza a Premium para recalificaciones ilimitadas después de editar',
      upgradeCta: 'Actualizar a Premium',
    },
  },

  // HUD
  hud: {
    characters: 'Caracteres usados',
    charactersLabel: 'Caracteres:',
    progress: 'Progreso',
    step: 'Paso',
    tooltip: 'Los currículums claros generan más entrevistas',
    showBreakdown: 'Ver desglose',
    hideBreakdown: 'Ocultar desglose',
    breakdown: {
      summary: 'Resumen',
      experience: 'Experiencia',
      education: 'Educación',
      projects: 'Proyectos',
      skills: 'Habilidades',
    },
    stepTitles: {
      achievements: 'Logros Clave',
      summary: 'Resumen',
      generate: 'Generar con IA',
      score: 'Puntuacion',
      template: 'Visualizar',
      download: 'Descargar',
      final: 'Finalizar',
    },
    limitExceeded: '⚠️ Límite excedido. Reduce {{count}} caracteres',
    charactersRemaining: '⚠️ Te quedan {{count}} caracteres',
  },

  // Premium
  premium: {
    title: 'Desbloquea Funcionalidades Profesionales con IA',
    subtitle: 'CVs ilimitados y todas las funciones premium',
    premiumUser: 'Usuario Premium',
    
    tokenSystem: {
      title: 'Sistema de Tokens',
      subtitle: 'Simple, flexible y transparente',
      steps: [
        { title: 'Gana', description: 'Recibe créditos al registrarte' },
        { title: 'Usa', description: 'Accede a funciones premium' },
        { title: 'Compra', description: 'Adquiere más cuando necesites' }
      ]
    },
    
    features: {
      aiEnhancement: {
        title: 'Mejora de Resume con IA',
        description: 'Transforma tu CV con optimización profesional',
        detailedDescription: 'Nuestra IA analiza tu CV completo y lo optimiza usando las mejores prácticas de reclutamiento. Mejora la redacción, optimiza keywords para sistemas ATS, reorganiza secciones para mayor impacto y elimina redundancias para crear un CV que realmente destaque.',
        tokens: 5,
        benefits: [
          'Mejora la redacción de logros y responsabilidades',
          'Optimiza keywords para sistemas ATS',
          'Reorganiza secciones para mayor impacto',
          'Elimina redundancias y mejora claridad',
          'Adapta el tono profesional según tu industria'
        ],
        howItWorks: 'Sube tu CV actual, nuestra IA lo analiza en segundos y te devuelve una versión mejorada con sugerencias específicas de mejora.',
        useCases: [
          'Quieres destacar entre cientos de candidatos',
          'Tu CV no está generando entrevistas',
          'Necesitas actualizar un CV antiguo'
        ],
        example: {
          before: 'Responsable de ventas en la empresa',
          after: 'Lideré equipo de 5 vendedores logrando incremento del 35% en ventas trimestrales'
        },
        popular: true
      },
      aiScoring: {
        title: 'Puntuación con IA',
        description: 'Análisis detallado y score de mejora (0-100)',
        detailedDescription: 'Obtén una evaluación profesional completa de tu CV con una puntuación del 0 al 100. Nuestra IA analiza cada sección, identifica debilidades específicas y te proporciona sugerencias concretas para mejorar tu visibilidad ante reclutadores.',
        tokens: 3,
        benefits: [
          'Score profesional del 0 al 100',
          'Análisis sección por sección',
          'Identificación de debilidades específicas',
          'Sugerencias concretas de mejora',
          'Comparación con estándares del mercado'
        ],
        howItWorks: 'Nuestra IA evalúa tu CV contra criterios profesionales y te proporciona un reporte detallado con recomendaciones específicas.',
        useCases: [
          'Diagnóstico rápido antes de aplicar',
          'Mejorar visibilidad ante reclutadores',
          'Benchmark con CVs de tu perfil profesional'
        ],
        example: {
          before: 'CV con score de 65/100',
          after: 'CV optimizado con score de 92/100'
        }
      },
      jobOptimizer: {
        title: 'Optimizador para Trabajo',
        description: 'Adapta tu CV para ofertas específicas',
        detailedDescription: 'Adapta automáticamente tu CV a cada oferta de trabajo específica. Nuestra IA analiza la descripción del puesto, identifica keywords clave y reorganiza tu CV para maximizar la coincidencia con lo que busca la empresa.',
        tokens: 5,
        benefits: [
          'Análisis automático de descripción de trabajo',
          'Adaptación de keywords específicos',
          'Reorganización de prioridades',
          'Alineación con requisitos de la empresa',
          'Maximización de coincidencia con ATS'
        ],
        howItWorks: 'Pega la descripción del trabajo, nuestra IA analiza los requisitos y adapta tu CV para maximizar las coincidencias.',
        useCases: [
          'Aplicaciones personalizadas para trabajos específicos',
          'Aumentar coincidencia con sistemas ATS',
          'Maximizar entrevistas para roles específicos'
        ],
        example: {
          before: 'CV general para cualquier trabajo',
          after: 'CV optimizado para "Senior Frontend Developer en Startup Tech"'
        }
      },
      onlineResume: {
        title: 'Resume Online con QR',
        description: 'CV profesional online con estadísticas',
        detailedDescription: 'Convierte tu CV en una versión digital profesional con URL personalizada, QR code elegante y estadísticas de visualización. Accesible 24/7 desde cualquier dispositivo y perfecto para networking.',
        tokens: 2,
        benefits: [
          'URL personalizada profesional',
          'QR code elegante para tarjetas',
          'Estadísticas de visualización',
          'Accesibilidad 24/7 desde cualquier dispositivo',
          'Perfecto para networking y ferias'
        ],
        howItWorks: 'Creamos tu CV online con una URL personalizada y QR code que puedes usar en tarjetas de presentación o firma de email.',
        useCases: [
          'Networking y ferias de empleo',
          'Portafolio en línea profesional',
          'Seguimiento de quién ve tu CV'
        ],
        example: {
          before: 'linkedin.com/in/juan',
          after: 'cv.getquickresume.com/juan-perez'
        }
      },
      jobApplications: {
        title: 'Asistente de Aplicaciones',
        description: 'Aplica a trabajos con aplicaciones optimizadas',
        detailedDescription: 'Tu asistente personal para encontrar y postularte a trabajos automáticamente. Busca ofertas relevantes según tu perfil, genera cartas de presentación personalizadas y sugiere aplicaciones estratégicas para maximizar tus oportunidades.',
        tokens: 3,
        benefits: [
          'Búsqueda automática de trabajos relevantes',
          'Generación de cartas personalizadas',
          'Sugerencias de aplicaciones estratégicas',
          'Ahorro de tiempo en búsqueda laboral',
          'Mejora de calidad en cada postulación'
        ],
        howItWorks: 'Configura tus preferencias y nuestra IA busca trabajos relevantes, genera cartas personalizadas y te sugiere las mejores aplicaciones.',
        useCases: [
          'Ahorrar tiempo en búsqueda laboral',
          'Automatizar aplicaciones masivas',
          'Mejorar calidad de cada postulación'
        ],
        example: {
          before: '50 empleos analizados manualmente',
          after: '10 postulaciones enviadas con cartas personalizadas'
        }
      },
      premiumTemplates: {
        title: 'Plantillas Premium',
        description: 'Diseños exclusivos profesionales',
        detailedDescription: 'Accede a plantillas exclusivas y modernas creadas por expertos en reclutamiento. Diseños 100% compatibles con sistemas ATS que te ayudan a destacar visualmente desde el primer vistazo.',
        tokens: 1,
        benefits: [
          'Diseños exclusivos y modernos',
          'Creados por expertos en reclutamiento',
          '100% compatibles con sistemas ATS',
          'Adaptables a diferentes industrias',
          'Impacto visual profesional'
        ],
        howItWorks: 'Selecciona una plantilla premium y personalízala con tu información. Todas las plantillas están optimizadas para ATS.',
        useCases: [
          'Diferenciarte en industrias competitivas',
          'Transmitir profesionalismo instantáneo',
          'Adaptar CV a estilos formales o creativos'
        ],
        example: {
          before: 'Template básico genérico',
          after: 'Template elegante, limpio y profesional'
        }
      },
      translation: {
        title: 'Traducción Multi-idioma',
        description: 'Traduce tu CV a los 10 idiomas más usados del mundo',
      },
      analytics: {
        title: 'Analíticas Avanzadas',
        description: 'Estadísticas de visualización, dispositivos y ubicaciones',
      },
    },

    featuresSection: {
      title: 'Todas las Funciones Premium',
      subtitle: 'Descubre todo lo que obtienes con Premium',
    },
    
    packages: {
      starter: { name: 'Starter', tokens: '50', price: '$4.99' },
      essential: { name: 'Essential', tokens: '150', price: '$12.99', popular: true },
      professional: { name: 'Professional', tokens: '300', price: '$24.99' },
      premium: { name: 'Premium', tokens: '750', price: '$49.99' }
    },
    
    cta: 'Comprar tokens ahora',
  },

  // Translation
  translation: {
    title: 'AI Language Adaptor',
    subtitle: 'Traduce tu CV manteniendo formato y estilo profesional',
    selectLanguage: 'Selecciona idioma de destino',
    languages: {
      en: 'Inglés 🇬🇧',
      es: 'Español 🇪🇸',
      ar: 'Árabe 🇸🇦',
      zh: 'Chino 🇨🇳',
      hi: 'Hindi 🇮🇳',
    },
    tokensRequired: 'Tokens requeridos',
    preview: 'Vista previa',
    translate: 'Traducir',
    success: '🎉 ¡Tu CV está listo para brillar en cualquier idioma!',
  },

  // Account
  account: {
    title: 'Mi Cuenta',
    loading: 'Cargando cuenta...',
    
    // Profile Header
    profile: {
      title: 'Perfil',
      memberSince: 'Miembro desde',
      authProvider: 'Iniciaste sesión con',
      premium: 'Premium',
      free: 'Gratis',
      notSpecified: 'No especificado',
    },
    
    // Subscription Section
    subscription: {
      title: 'Suscripción',
      currentPlan: 'Plan Actual',
      free: 'Gratis',
      premiumMonthly: 'Premium Mensual',
      premiumYearly: 'Premium Anual',
      renewsOn: 'Se renueva el',
      expiresOn: 'Expira el',
      startedOn: 'Iniciada el',
      manageSubscription: 'Gestionar Suscripción',
      upgradeToPremium: 'Actualizar a Premium',
      upgradeDescription: 'Desbloquea CVs, cartas y adaptaciones ilimitadas',
      cancelInfo: 'Puedes cancelar en cualquier momento desde el portal de suscripción',
    },
    
    // Usage Statistics
    usage: {
      title: 'Estadísticas de Uso',
      resumes: 'Currículums',
      resumesDescription: 'CVs profesionales creados',
      coverLetters: 'Cartas de Presentación',
      coverLettersDescription: 'Cartas generadas con IA',
      jobTailoring: 'Adaptación para Empleos',
      jobTailoringDescription: 'CVs adaptados para empleos',
      downloads: 'Descargas',
      downloadsDescription: 'Total de descargas de CV',
      unlimited: 'Ilimitado',
      perMonth: '/mes',
      lifetime: 'de por vida',
      used: 'usado',
      of: 'de',
      freeLimit: '1 gratis',
      premiumLimit: '30/mes',
    },
    
    // Quick Actions
    actions: {
      title: 'Acciones Rápidas',
      createResume: 'Crear CV',
      createResumeDescription: 'Iniciar un nuevo CV profesional',
      createCoverLetter: 'Carta de Presentación',
      createCoverLetterDescription: 'Generar una carta con IA',
      tailorForJob: 'Adaptar para Empleo',
      tailorForJobDescription: 'Optimizar CV para un puesto',
      changeLanguage: 'Idioma',
      changeLanguageDescription: 'Cambiar entre inglés y español',
      contactSupport: 'Soporte',
      contactSupportDescription: 'Obtén ayuda de nuestro equipo',
      viewDashboard: 'Panel',
      viewDashboardDescription: 'Ver todos tus CVs',
    },
    
    // Account Details
    details: {
      title: 'Detalles de la Cuenta',
      email: 'Correo electrónico',
      provider: 'Proveedor de inicio de sesión',
      accountId: 'ID de cuenta',
      memberSince: 'Miembro desde',
    },
    
    // Danger Zone
    dangerZone: {
      title: 'Cuenta',
      signOut: 'Cerrar Sesión',
      signOutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
      signOutDescription: 'Necesitarás iniciar sesión de nuevo para acceder a tus CVs',
    },
    
    // Legacy keys for backward compatibility
    tokens: 'Tokens',
    settings: 'Configuración',
    language: 'Idioma',
    logout: 'Cerrar sesión',
  },

  // Contact
  contact: {
    title: 'Contáctanos',
    subtitle: '¿Tienes preguntas? Estamos aquí para ayudarte',
    form: {
      title: 'Envíanos un mensaje',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      placeholders: {
        name: 'Tu nombre completo',
        email: 'tu@email.com',
        message: 'Cuéntanos cómo podemos ayudarte...',
      },
    },
    toast: {
      success: 'Mensaje enviado correctamente',
    },
    info: {
      title: 'Información de Contacto',
      emailLabel: 'Email',
      supportLabel: 'Soporte',
    },
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        {
          question: '¿Cuánto tiempo toma crear un CV?',
          answer: 'Con nuestro wizard guiado, puedes crear un CV profesional en menos de 10 minutos.',
        },
        {
          question: '¿Es realmente gratuito?',
          answer: 'Sí, la versión básica es completamente gratuita. Solo pagas por funciones Premium opcionales.',
        },
        {
          question: '¿Mis datos están seguros?',
          answer: 'Absolutamente. Usamos encriptación de extremo a extremo y cumplimos con las regulaciones de privacidad.',
        },
      ],
    },
    social: {
      title: 'Síguenos en redes sociales',
    },
  },

  // Support
  support: {
    title: 'Centro de Soporte',
    subtitle: 'Solicita ayuda, reporta problemas o sugiere nuevas funcionalidades',
    form: {
      title: 'Crear Nuevo Ticket',
      type: 'Tipo de Solicitud',
      subject: 'Asunto',
      message: 'Mensaje',
      submit: 'Enviar Ticket',
      placeholders: {
        subject: 'Describe brevemente tu solicitud...',
        message: 'Proporciona más detalles sobre tu solicitud...',
      },
    },
    types: {
      help: 'Solicitar Ayuda',
      complaint: 'Reportar Problema',
      comment: 'Dejar Comentario',
      feature: 'Solicitar Funcionalidad',
    },
    status: {
      open: 'Abierto',
      'in-progress': 'En Progreso',
      resolved: 'Resuelto',
      closed: 'Cerrado',
    },
    list: {
      title: 'Mis Tickets',
      empty: 'No tienes tickets de soporte aún',
      emptyDescription: 'Crea tu primer ticket para solicitar ayuda, reportar un problema o sugerir una funcionalidad',
      createdAt: 'Creado',
      updatedAt: 'Actualizado',
      viewDetails: 'Ver Detalles',
      noTickets: 'No hay tickets para mostrar',
    },
    messages: {
      createSuccess: 'Ticket creado exitosamente',
      createError: 'Error al crear el ticket',
      loadError: 'Error al cargar los tickets',
      loadTicketError: 'Error al cargar el ticket',
    },
    details: {
      title: 'Detalles del Ticket',
      back: 'Volver a la Lista',
      ticketId: 'ID del Ticket',
      type: 'Tipo',
      status: 'Estado',
      createdAt: 'Fecha de Creación',
      updatedAt: 'Última Actualización',
    },
  },

  // About
  about: {
    title: 'Acerca de GetQuickResume',
    mission: 'Nuestra misión es ayudar a profesionales de todas las áreas a destacar con currículums claros, optimizados y multilingües.',
    ourMission: 'Nuestra Misión',
    missionDescription: 'Creemos que cada profesional merece tener un currículum que realmente represente su potencial. Nuestra plataforma democratiza el acceso a herramientas de creación de CV de nivel empresarial, utilizando inteligencia artificial para optimizar y personalizar cada documento.',
    values: {
      accessibility: {
        title: 'Accesibilidad',
        description: 'Herramientas profesionales disponibles para todos, sin importar su nivel de experiencia o recursos.',
      },
      precision: {
        title: 'Precisión',
        description: 'Utilizamos IA avanzada para optimizar cada CV según las mejores prácticas de reclutamiento.',
      },
      efficiency: {
        title: 'Eficiencia',
        description: 'Proceso rápido y guiado que te permite crear un CV profesional en minutos, no horas.',
      },
    },
    story: {
      title: 'Nuestra Historia',
      paragraphs: [
        'GetQuickResume nació de una necesidad personal. Como profesionales en el sector tecnológico, nos dimos cuenta de que crear un currículum efectivo era más difícil de lo que debería ser. Las herramientas existentes eran costosas, complicadas o simplemente no estaban optimizadas para los sistemas de reclutamiento modernos.',
        'Decidimos crear una solución que combinara la simplicidad de uso con la potencia de la inteligencia artificial. Nuestro objetivo era hacer que cualquier persona, independientemente de su experiencia técnica, pudiera crear un currículum que realmente destacara.',
        'Hoy, miles de profesionales confían en GetQuickResume para crear currículums que les abren puertas a nuevas oportunidades. Estamos orgullosos de ser parte de su éxito profesional.',
      ],
    },
    impact: {
      title: 'Nuestro Impacto',
      stats: {
        cvsCreated: 'CVs creados',
        satisfactionRate: 'Tasa de satisfacción',
        countriesServed: 'Países atendidos',
      },
    },
  },

  // Legal
  legal: {
    privacy: {
      title: 'Política de Privacidad',
    },
    terms: {
      title: 'Términos de Servicio',
    },
    refund: {
      title: 'Política de No Reembolsos',
    },
  },

  // Errors
  errors: {
    generic: 'Algo salió mal. Inténtalo de nuevo.',
    network: 'Error de conexión',
    validation: 'Por favor, completa todos los campos requeridos',
    auth: 'Error de autenticación',
    premium: 'No tienes suficientes tokens para esta acción',
  },

  // Success messages
  success: {
    saved: 'Datos guardados correctamente',
    downloaded: 'CV descargado exitosamente',
    translated: 'CV traducido exitosamente',
    premium: '¡Bienvenido a Premium!',
  },

  // Dashboard translations
  dashboard: {
    welcome: 'Bienvenido, {{name}}',
    welcomeNoExclamation: 'Bienvenido, {{name}}',
    subtitle: 'Gestiona tus CVs y optimízalos para puestos específicos',
    createNewCV: 'Crear Nuevo CV',
    stats: {
      tokens: 'Tokens Disponibles',
      tokensAvailable: 'Tokens Disponibles',
      resumes: 'CVs Creados',
      resumesCreated: 'CVs Creados',
      resumesDescription: 'Total de CVs en tu cuenta',
      freeResumeSubtitle: '{{count}} de {{total}} CV gratuito',
      premiumResumeSubtitle: '{{count}} / {{total}} este mes',
      freeDescription: '1 CV de por vida',
      premiumDescription: '30 CVs por mes',
      upgradeToPremium: 'Actualizar a Premium',
      planType: {
        monthly: 'Suscripción Mensual',
        yearly: 'Suscripción Anual',
      },
      expiresOn: 'Expira: {{date}}',
    },
    sections: {
      resumes: 'Mis CVs',
      coverLetters: 'Cartas de Presentación',
      applyJobs: 'Aplicar a Empleos',
    },
    actions: {
      createResume: 'Crear Nuevo CV',
      buyTokens: 'Comprar Tokens',
      view: 'Ver',
      delete: 'Eliminar',
      deleteResumeTitle: 'Eliminar CV',
      deleteResume: '¿Estás seguro de que deseas eliminar este CV? Esta acción no se puede deshacer.',
      deleteFreeResumeTitle: 'Eliminar CV - Advertencia Importante',
      deleteFreeResumeWarning: '⚠️ Este es tu único CV gratuito generado con IA. Si lo eliminas, NO podrás crear otro CV gratuito. Tu cuota de CV gratuito ya ha sido utilizada y no se restablecerá. ¿Estás seguro de que deseas continuar?',
      resumeNotGenerated: 'El CV debe estar generado antes de usar esta función',
      rescoring: 'Re-evaluando CV...',
      rescoreSuccess: '¡CV re-evaluado exitosamente!',
      rescoreError: 'Error al re-evaluar el CV. Por favor, intenta de nuevo.',
    },
    premiumAction: {
      upgradeButton: 'Actualizar a Premium',
      benefits: {
        title: 'Beneficios Premium',
      },
      enhance: {
        title: 'Función Premium: Mejora con IA',
        description: 'Mejora tu CV con optimizaciones impulsadas por IA. Obtén sugerencias personalizadas y optimiza cada sección de tu CV.',
        benefits: {
          aiEnhancement: 'Mejora de secciones con IA',
          sectionOptimization: 'Optimiza cada sección individualmente',
          guidedQuestions: 'Preguntas guiadas para mejores resultados',
        },
      },
      rescore: {
        title: 'Función Premium: Re-evaluar CV',
        description: 'Obtén una puntuación actualizada de tu CV con retroalimentación detallada y recomendaciones de mejora.',
        benefits: {
          onDemandScoring: 'Re-evalúa tu CV en cualquier momento',
          detailedFeedback: 'Retroalimentación detallada en cada sección',
          improvementTracking: 'Rastrea mejoras a lo largo del tiempo',
        },
      },
      edit: {
        title: 'Función Premium: Edición Ilimitada de CV',
        description: 'Has usado tu generación gratuita de CV. Actualiza a Premium para editar tu CV y crear CVs ilimitados.',
        benefits: {
          unlimitedEdits: 'Edita tu CV ilimitadas veces',
          multipleResumes: 'Crea CVs ilimitados',
          allFeatures: 'Accede a todas las funciones premium',
        },
      },
      aiSuggestions: {
        title: 'Sugerencias con IA - Función Premium',
        description: 'Obtén sugerencias impulsadas por IA para mejorar las secciones de tu CV. Actualiza a Premium para desbloquear esta función y mejorar tu CV.',
        cta: 'Premium para IA',
        benefits: {
          smartSuggestions: 'Sugerencias inteligentes de mejora con IA',
          sectionOptimization: 'Optimiza cualquier sección de tu CV',
          unlimitedUse: 'Sugerencias con IA ilimitadas',
        },
      },
      createResume: {
        title: 'Límite de CV Gratuito Alcanzado',
        description: 'Ya has utilizado tu único CV gratuito generado con IA. Actualiza a Premium para crear CVs profesionales ilimitados.',
        cta: 'Actualizar para Crear Más',
        benefits: {
          unlimitedResumes: 'Crea CVs profesionales ilimitados',
          allFeatures: 'Accede a todas las funciones con IA',
          unlimitedEdits: 'Edita y regenera cuando quieras',
        },
      },
      regenerate: {
        title: 'Regenerar CV - Función Premium',
        description: 'Ya has utilizado tu CV generado con IA gratis. Actualiza a Premium para regenerar tu CV con IA.',
        cta: 'Actualizar para Regenerar',
        benefits: {
          unlimitedRegeneration: 'Regenera tu CV ilimitadamente',
          aiOptimization: 'Optimización con IA en cada regeneración',
          multipleVersions: 'Crea múltiples versiones de tu CV',
        },
      },
      premiumTemplate: {
        title: 'Plantilla Premium',
        description: 'Este diseño de plantilla es exclusivo para usuarios Premium. Actualiza para desbloquear todas las plantillas y diseños premium.',
        benefits: {
          exclusiveDesigns: 'Acceso a diseños premium exclusivos',
          allTemplates: 'Desbloquea todos los diseños de plantillas',
          professionalLook: 'Destaca con plantillas profesionales',
        },
      },
      translate: {
        title: 'Traducir CV - Función Premium',
        description: 'Traduce tu CV a más de 10 idiomas con calidad profesional. Perfecto para aplicar a trabajos internacionales.',
        benefits: {
          multiLanguage: 'Traduce a más de 10 idiomas',
          professionalQuality: 'Traducción con calidad profesional',
          preserveFormatting: 'Mantiene el formato original del CV',
        },
      },
      tailorForJob: {
        title: 'Adaptar para Empleo - Función Premium',
        description: 'Optimiza tu CV para una oferta de trabajo específica. Nuestra IA analiza los requisitos y sugiere mejoras personalizadas.',
        benefits: {
          aiAnalysis: 'Análisis de requisitos con IA',
          keywordOptimization: 'Optimización de palabras clave',
          matchScore: 'Puntuación de coincidencia con el empleo',
        },
      },
      share: {
        title: 'Compartir y Rastrear - Función Premium',
        description: 'Comparte tu CV con un enlace único y rastrea quién lo ve. Obtén analíticas detalladas de vistas.',
        benefits: {
          trackViews: 'Rastrea quién ve tu CV',
          qrCode: 'Código QR para compartir fácilmente',
          analytics: 'Analíticas de dispositivo y ubicación',
        },
      },
    },
    comingSoon: {
      coverLetters: 'Cartas de Presentación',
      coverLettersDesc: 'Genera cartas de presentación personalizadas para cada aplicación',
      jobApplications: 'Aplicaciones de Trabajo',
      jobApplicationsDesc: 'Rastrea y gestiona tus aplicaciones de trabajo',
      availableSoon: 'Próximamente Disponible',
    },
    coverLetters: {
      title: 'Cartas de Presentación',
      description: 'Genera cartas de presentación personalizadas con IA',
      hint: 'Crea cartas de presentación que coincidan con tu CV y la descripción del puesto',
      createButton: 'Crear Carta de Presentación',
      createNew: 'Nueva',
      count: {
        singular: 'carta de presentación',
        plural: 'cartas de presentación',
      },
      confirmDelete: '¿Estás seguro de que quieres eliminar esta carta de presentación?',
      deleteSuccess: 'Carta de presentación eliminada',
      deleteError: 'Error al eliminar la carta de presentación',
      deleteModal: {
        title: 'Eliminar Carta de Presentación',
        description: '¿Estás seguro de que quieres eliminar esta carta de presentación? Esta acción no se puede deshacer.',
      },
    },
    status: {
      draft: 'Borrador',
      generated: 'Generada',
      saved: 'Guardada',
    },
    edit: 'Editar',
    download: 'Descargar',
    delete: 'Eliminar',
    optimize: 'Optimizar para este Puesto',
    viewDetails: 'Ver Detalles',
    empty: {
      resumes: {
        title: 'Aún no has creado ningún CV',
        description: 'Crea tu primer CV profesional con nuestra herramienta de IA. Te guiaremos paso a paso para crear un CV que destaque.',
        cta: 'Crear Mi Primer CV',
      },
    },
    emptyState: {
      subtitle: 'Gestiona tus CVs y optimízalos para puestos específicos',
      title: 'Crea tu primer CV profesional',
      description: 'Comienza a crear CVs profesionales con nuestra herramienta de IA. Genera CVs optimizados en minutos.',
      createButton: 'Crear Mi Primer CV',
      features: {
        free: 'Gratis',
        aiOptimized: 'Optimizado con IA',
        fast: 'Rápido',
        templates: 'Plantillas Profesionales',
        templatesDesc: 'Elige entre múltiples diseños profesionales para tu CV',
        aiOptimization: 'Optimización con IA',
        aiOptimizationDesc: 'Mejora tu CV con sugerencias inteligentes de IA',
        easyToUse: 'Fácil de Usar',
        easyToUseDesc: 'Crea tu CV en minutos con nuestro asistente paso a paso',
      },
    },
    resume: {
      status: {
        draft: 'Borrador',
        generated: 'Generado',
        optimized: 'Optimizado',
      },
      info: 'Información del CV',
      name: 'Nombre',
      profession: 'Profesión',
      experience: 'Experiencia',
      experiences: 'Experiencias',
      lastUpdated: 'Actualizado',
      aiOptimized: 'Optimizado con IA',
      quickActions: {
        view: 'Ver CV',
        edit: 'Editar',
      },
    },
  },

  // Validation messages
  validation: {
    required: 'Este campo es requerido',
    minLength: 'Debe tener al menos {{count}} caracteres',
    maxLength: 'No puede exceder {{count}} caracteres',
    email: 'Formato de email inválido',
    phone: 'Formato de teléfono inválido (mínimo 7 dígitos)',
    phoneCharacters: 'El teléfono solo puede contener números, espacios, guiones, paréntesis y el símbolo +',
    linkedin: 'Formato de LinkedIn inválido (ej: linkedin.com/in/tu-perfil)',
    url: 'Formato de URL inválido',
    date: 'Debe ser una fecha válida',
    dateRange: 'La fecha de inicio debe ser anterior a la fecha de fin',
    minItems: 'Debe tener al menos {{count}} elemento{{count, plural, one {} other {s}}',
    allItemsComplete: 'Todos los elementos deben estar completos',
    invalidCharacters: 'contiene caracteres no permitidos. Solo se permiten letras, números y símbolos básicos (. , - + ( ) / @ < > =)',
    professionTooShort: 'La profesión debe tener al menos 3 caracteres',
    professionInvalid: 'Por favor ingresa una profesión o puesto de trabajo válido',
    profile: {
      firstName: 'Nombre es requerido',
      lastName: 'Apellido es requerido',
      country: 'País es requerido',
      profession: 'Profesión es requerida',
      phone: 'Teléfono es requerido',
      email: 'Email es requerido',
    },
    skills: {
      minSkills: 'Debes agregar al menos 3 habilidades',
      minTools: 'Debes agregar al menos 2 herramientas',
    },
    experience: {
      required: 'Debes agregar al menos una experiencia laboral',
      incomplete: 'Todas las experiencias deben estar completas',
    },
    projects: {
      required: 'Debes agregar al menos un proyecto',
      incomplete: 'Todos los proyectos deben estar completos',
    },
    achievements: {
      required: 'Debes agregar al menos un logro',
      incomplete: 'Todos los logros deben estar completos',
    },
    summary: {
      minLength: 'El resumen debe tener al menos 50 caracteres',
      jobDescriptionMinLength: 'La descripción del puesto debe tener al menos 30 caracteres',
    },
  },
  sectionImprovement: {
    title: 'Mejorar Sección con IA',
    description: 'Describe qué cambios deseas aplicar a la sección {{section}}',
    currentText: 'Texto Actual',
    instructionsLabel: '¿Qué cambios deseas aplicar?',
    placeholder: 'Ejemplo: Hazlo más conciso, enfócate en resultados cuantificables, usa un tono más formal...',
    characterLimit: 'Límite de caracteres alcanzado',
    attempts: 'Intentos: {{count}}/{{max}}',
    improvedText: 'Texto Mejorado',
    improveButton: 'Mejorar con IA',
    improving: 'Mejorando...',
    tryAgain: 'Intentar de Nuevo',
    discard: 'Descartar',
    applyChanges: 'Aplicar Cambios',
    emptyInstructions: 'Por favor, describe qué cambios deseas aplicar',
    rateLimitExceeded: 'Has alcanzado el límite de 5 mejoras por minuto',
    rateLimitMessage: 'Has alcanzado el límite de mejoras. Espera un minuto.',
    error: 'Error al mejorar el texto'
  },
  sectionEnhancement: {
    title: 'Mejorar con IA',
    tabs: {
      autoEnhance: 'Mejora Automática',
      askAI: 'Pedir Ayuda a IA',
      manualEdit: 'Editar Manualmente'
    },
    descriptions: {
      auto: 'Mejora automáticamente esta sección con IA para mayor claridad, impacto y profesionalismo.',
      askAI: 'Proporciona instrucciones específicas para guiar cómo la IA debe mejorar esta sección.',
      manual: 'Edita el texto directamente tú mismo.'
    },
    sections: {
      summary: 'Resumen Profesional',
      experience: 'Experiencia Laboral',
      education: 'Educación',
      certification: 'Certificaciones',
      project: 'Proyectos',
      achievement: 'Logros',
      language: 'Idiomas'
    },
    originalText: 'Texto Original',
    enhancedText: 'Texto Mejorado',
    editText: 'Editar Texto',
    enhanceButton: 'Mejorar',
    enhancing: 'Mejorando con IA...',
    enhancedPlaceholder: 'El texto mejorado aparecerá aquí después de hacer clic en "Mejorar"',
    manualPlaceholder: 'Edita tu texto aquí...',
    instructionsLabel: 'Tus Instrucciones',
    instructionsPlaceholder: 'Ej: "Hazlo más conciso", "Añade logros cuantificables", "Usa verbos de acción más fuertes"',
    tryAgain: 'Intentar de Nuevo',
    applyChanges: 'Aplicar Cambios',
    aiNote: 'Las mejoras de IA son sugerencias. Revisa antes de aplicar.',
    emptyInstructions: 'Por favor, proporciona instrucciones para la IA.',
    rateLimitMessage: 'Límite de solicitudes alcanzado. Por favor, espera antes de intentar de nuevo.',
    error: 'Error al mejorar la sección'
  },
  review: {
    downloadSuccess: 'CV descargado exitosamente',
    premiumRequired: 'Necesitas actualizar a Premium para descargar',
    translationSuccess: 'CV traducido exitosamente',
    goToAccount: 'Ir a Mi Cuenta',
  },
  linkedinWizard: {
    targetLanguage: 'Idioma del resume a generar:',
    languageExplanation: 'El contenido de tu resume será generado en el idioma seleccionado',
  },
  enhanceText: {
    error: 'Error al mejorar el texto',
  },
  loading: {
    resume: 'Cargando resume...',
  },
  translation_extra: {
    languages: {
      en: 'Inglés 🇬🇧',
      es: 'Español 🇪🇸',
      ar: 'Árabe 🇸🇦',
      zh: 'Chino 🇨🇳',
      hi: 'Hindi 🇮🇳',
    },
    translate: 'Traducir',
  },
  resumeCard: {
    invalidDate: 'Fecha inválida',
    status: {
      draft: 'Borrador',
      generated: 'Generado',
      optimized: 'Optimizado',
      unknown: 'Desconocido',
    },
    actions: {
      view: 'Ver',
      edit: 'Editar',
      translate: 'Traducir',
      share: 'Compartir',
      enhance: 'Mejorar con IA',
      rescore: 'Re-evaluar',
      download: 'Descargar',
      delete: 'Eliminar',
      viewResume: 'Ver CV',
      tailorForJob: 'Adaptar para Empleo',
      viewAnalytics: 'Ver Analíticas',
      shareAndTrack: 'Compartir y Rastrear',
    },
    info: {
      title: 'Información del CV',
      name: 'Nombre:',
      profession: 'Profesión:',
      experience: 'Experiencia:',
      experiences: 'Experiencias:',
      language: 'Idioma:',
      aiOptimized: 'Optimizado con IA',
      aiEnhanced: 'Mejorado con IA',
      publiclyShared: 'Compartido Públicamente',
      score: 'Puntuación del CV',
      updated: 'Actualizado:',
    },
    aiTools: {
      title: 'Herramientas IA',
      share: 'Compartir',
      translate: 'Traducir',
      tailor: 'Adaptar',
      enhance: 'Mejorar',
      rescore: 'Puntuar',
      premiumBadge: 'PRO',
    },
  },
  resumeView: {
    title: 'Detalles del CV',
    loading: 'Cargando CV...',
    sections: {
      contact: 'Información de Contacto',
      summary: 'Resumen Profesional',
      profileMetadata: 'Información del Perfil',
      experience: 'Experiencia Laboral',
      education: 'Educación',
      skills: 'Habilidades y Competencias',
      certifications: 'Certificaciones',
      projects: 'Proyectos',
      languages: 'Idiomas',
      achievements: 'Logros Clave',
    },
    actions: {
      back: 'Volver',
      backToDashboard: 'Volver al Dashboard',
      edit: 'Editar CV',
      translate: 'Traducir',
      share: 'Compartir',
      analytics: 'Analíticas',
      shareAndAnalytics: 'Compartir y Analíticas',
      download: 'Descargar PDF',
      login: 'Iniciar Sesión',
      viewCertificate: 'Ver Certificado',
      viewProject: 'Ver Proyecto',
    },
    status: {
      draft: 'Borrador',
      generated: 'Generado',
      optimized: 'Optimizado',
    },
    metadata: {
      title: 'Metadatos del CV',
      lastUpdated: 'Última Actualización',
      created: 'Creado',
      totalCharacters: 'Total de Caracteres',
      completedSteps: 'Pasos Completados',
      current: 'Actual',
      targetLevel: {
        label: 'Nivel Objetivo',
        entry: 'Nivel Inicial',
        mid: 'Nivel Medio',
        senior: 'Nivel Senior',
        executive: 'Ejecutivo',
      },
      tone: {
        label: 'Tono',
        professional: 'Profesional',
        creative: 'Creativo',
        technical: 'Técnico',
        friendly: 'Amigable',
      },
      language: {
        label: 'Idioma',
      },
      jobDescription: {
        label: 'Descripción del Trabajo',
      },
      responsibilities: 'Responsabilidades',
      achievements: 'Logros',
      proficiency: {
        native: 'Nativo',
        fluent: 'Fluido',
        advanced: 'Avanzado',
        intermediate: 'Intermedio',
        beginner: 'Principiante',
        basic: 'Básico',
      },
    },
    emptyStates: {
      summary: 'Aún no se ha agregado un resumen profesional.',
      experience: 'Aún no se ha agregado experiencia laboral.',
      education: 'Aún no se ha agregado información educativa.',
      skills: 'Aún no se han agregado habilidades.',
    },
    errors: {
      title: 'Error al Cargar el CV',
      missingId: 'Falta el ID del CV',
      notFound: 'CV no encontrado. Puede haber sido eliminado o no tienes permiso para verlo.',
      unauthorized: 'No estás autorizado para ver este CV. Por favor, inicia sesión nuevamente.',
      generic: 'Ocurrió un error al cargar el CV. Por favor, intenta de nuevo más tarde.',
    },
    download: {
      selectTemplate: 'Seleccionar Plantilla para PDF',
      selectingTemplate: 'Seleccionando Plantilla...',
      generating: 'Generando PDF...',
      calculatingLayout: 'Calculando diseño de páginas...',
      rendering: 'Renderizando plantilla...',
      creatingPDF: 'Creando PDF...',
      success: '¡PDF descargado exitosamente!',
      templateModal: {
        title: 'Seleccionar Plantilla para Descargar PDF',
        loading: 'Cargando plantillas...',
        cancel: 'Cancelar',
        select: 'Seleccionar',
        selected: 'Seleccionado',
        close: 'Cerrar',
        selectTemplate: 'Seleccionar plantilla',
        noTemplates: 'No hay plantillas disponibles',
      },
      errors: {
        noResume: 'CV no disponible para descargar',
        noTemplate: 'Por favor selecciona una plantilla para descargar',
        loadTemplatesFailed: 'Error al cargar las plantillas. Por favor, intenta de nuevo.',
        paginationFailed: 'Error al calcular el diseño de páginas. Por favor, intenta con otra plantilla.',
        generationFailed: 'Error al generar el PDF. Por favor, intenta de nuevo.',
        noPages: 'No se encontraron páginas para generar el PDF',
        containerNotFound: 'Contenedor de plantilla no encontrado',
      },
    },
  },
  resumeTranslation: {
    title: 'Traducir CV',
    selectLanguage: 'Selecciona el idioma de destino',
    translateButton: 'Traducir',
    translating: 'Traduciendo...',
    success: '¡CV traducido exitosamente!',
    rewriteButton: 'Reescribir',
    rewriting: 'Reescribiendo...',
    rewriteSuccess: '¡CV reescrito exitosamente!',
    error: 'Error al traducir el CV',
    confirmation: 'Se creará un nuevo CV en {{language}}',
    confirmationRewrite: 'Se creará una versión mejorada en {{language}}',
    currentLanguageBadge: 'Actual',
    premiumRequired: {
      title: 'Función Premium',
      description: 'La traducción de CVs es una función exclusiva para usuarios premium. Actualiza tu plan para acceder a esta funcionalidad.',
      upgradeButton: 'Actualizar a Premium',
    },
    cta: {
      title: 'Traduce tu CV a otros idiomas',
      description: 'Amplía tus oportunidades laborales traduciendo tu CV a los 10 idiomas más hablados del mundo.',
      button: 'Traducir CV',
    },
  },
  resumeSharing: {
    title: 'Compartir CV',
    premiumRequired: 'Esta función solo está disponible para usuarios premium',
    premiumFeature: {
      title: 'Función Premium',
      description: 'Comparte tu CV mediante código QR y rastrea quién lo visualiza. Actualiza a Premium para desbloquear esta función y obtener analíticas detalladas.',
      upgradeButton: 'Actualizar a Premium',
    },
    publicSharing: 'Compartir Públicamente',
    sharingEnabled: 'Tu CV es accesible públicamente mediante código QR',
    sharingDisabled: 'Tu CV no está compartido públicamente',
    enable: 'Habilitar Compartir',
    disable: 'Deshabilitar Compartir',
    enabled: 'Compartir habilitado exitosamente',
    disabled: 'Compartir deshabilitado exitosamente',
    shareLink: 'Enlace de Compartir',
    copy: 'Copiar',
    copied: '¡Copiado!',
    share: 'Compartir',
    shareTitle: 'Mi CV Profesional',
    shareText: 'Revisa mi CV generado con IA',
    scanQRCode: 'Escanear Código QR',
    qrCodeDescription: 'Escanea este código QR con tu teléfono para ver el CV',
    linkCopied: 'Enlace copiado al portapapeles',
    errors: {
      enableFailed: 'Error al habilitar compartir',
      disableFailed: 'Error al deshabilitar compartir',
      copyFailed: 'Error al copiar enlace',
      loadFailed: 'Error al cargar el CV',
      notFound: 'CV no encontrado',
      toggleFailed: 'Error al cambiar el estado de compartir',
    },
    analytics: {
      title: 'Analíticas',
      totalViews: 'Vistas Totales',
      uniqueViews: 'Vistas Únicas',
      devices: 'Dispositivos',
      mobile: 'Móvil',
      desktop: 'Escritorio',
      tablet: 'Tablet',
      browsers: 'Navegadores',
      locations: 'Ubicaciones',
      viewsOverTime: 'Vistas en el Tiempo',
    },
  },
  resumeShare: {
    pageTitle: 'Compartir y Analíticas',
    backToResume: 'Volver al CV',
    sharingActive: 'Compartir Activo',
    enabled: 'Compartir habilitado exitosamente',
    disabled: 'Compartir deshabilitado exitosamente',
    linkCopied: 'Enlace copiado al portapapeles',
    errors: {
      loadFailed: 'Error al cargar los datos del CV',
      notFound: 'CV no encontrado',
      toggleFailed: 'Error al cambiar el estado de compartir',
      copyFailed: 'Error al copiar enlace',
    },
    premium: {
      title: 'Desbloquea Compartir CV',
      description: 'Comparte tu CV profesional con reclutadores y rastrea quién lo ve con analíticas potentes. Obtén información sobre ubicaciones, dispositivos y engagement de los visitantes.',
      upgradeButton: 'Actualizar a Premium',
      feature1: {
        title: 'Comparte en Cualquier Lugar',
        description: 'Genera un enlace único y código QR para compartir tu CV al instante',
      },
      feature2: {
        title: 'Rastrea Vistas',
        description: 'Ve quién vio tu CV, cuándo y por cuánto tiempo',
      },
      feature3: {
        title: 'Analíticas Detalladas',
        description: 'Obtén información sobre ubicaciones, dispositivos y tendencias de engagement',
      },
    },
    controls: {
      title: 'Controles de Compartir',
      subtitle: 'Gestiona cómo se comparte tu CV',
    },
    status: {
      active: 'Compartir Activo',
      inactive: 'Compartir Inactivo',
      activeDescription: 'Tu CV es accesible públicamente',
      inactiveDescription: 'Habilita para compartir tu CV',
    },
    shareLink: 'Enlace de Compartir',
    shareButton: 'Compartir CV',
    shareVia: 'Compartir en redes sociales',
    socialText: '¡Mira mi CV profesional!',
    emailSubject: 'Mi CV Profesional',
    qrCode: {
      title: 'Código QR',
      description: 'Escanea para ver el CV en móvil',
    },
    enableToSeeAnalytics: {
      title: 'Habilita Compartir para Ver Analíticas',
      description: 'Activa compartir para comenzar a rastrear quién ve tu CV y obtener analíticas detalladas.',
    },
    stats: {
      totalViews: 'Vistas Totales',
      uniqueVisitors: 'Visitantes Únicos',
      thisWeek: 'Esta Semana',
    },
    viewers: {
      title: 'Visitantes Recientes',
      subtitle: 'Actividad anónima de visitantes',
      viewAll: 'Ver los {{count}} visitantes',
      noViewers: {
        title: 'Sin Visitantes Aún',
        description: 'Comparte el enlace de tu CV para comenzar a rastrear vistas',
      },
      rateLimitError: 'Demasiadas solicitudes. Por favor, inténtalo de nuevo en un momento.',
    },
    charts: {
      title: 'Analíticas de Engagement',
      subtitle: 'Rastrea el rendimiento de tu CV',
      viewsOverTime: 'Vistas en el Tiempo',
      deviceBreakdown: 'Distribución por Dispositivo',
      desktop: 'Escritorio',
      mobile: 'Móvil',
      tablet: 'Tablet',
      noData: 'Sin datos disponibles',
    },
    geoMap: {
      title: 'Distribución Geográfica',
      subtitle: 'Ve dónde están ubicados tus visitantes',
      topCountries: 'Principales Países',
      noData: {
        title: 'Sin Datos de Ubicación',
        description: 'Los datos de ubicación aparecerán cuando los visitantes vean tu CV',
      },
    },
  },
  publicResume: {
    loading: 'Cargando CV...',
    poweredBy: 'Desarrollado por',
    errors: {
      title: 'CV No Encontrado',
      missingToken: 'Se requiere el token de compartir',
      notFound: 'CV no encontrado o ya no está compartido públicamente',
      generic: 'Ocurrió un error al cargar el CV',
    },
  },
  professionResumePage: {
    breadcrumbNavAria: 'Ruta de navegación',
    breadcrumbHome: 'Inicio',
    breadcrumbTemplates: 'Plantillas de CV',
    breadcrumbCurrent: 'Currículum de {{title}}',
    notFoundTitle: 'Página no encontrada',
    notFoundDescription: 'La página de plantillas de currículum que buscas no existe.',
    notFoundCta: 'Ir al inicio',
    h1: 'Currículum de {{title}}',
    heroLead:
      'Explora plantillas de currículum profesionales para {{title}}, con ejemplos reales, habilidades del sector y crea un CV optimizado para ATS en minutos.',
    sectionTemplatesAria: 'Plantillas de currículum de {{title}}',
    templatesHeading: 'Mejores plantillas de CV para {{title}}',
    createYourResume: 'Crea tu currículum',
    sectionTopSkillsAria: 'Principales habilidades',
    topSkillsHeading: 'Habilidades clave en CV de {{title}}',
    topSkillsIntro:
      'Incluye estas habilidades demandadas en tu CV de {{title}} para destacar ante reclutadores y superar filtros ATS.',
    sectionAtsAria: 'Palabras clave ATS',
    atsHeading: 'Palabras clave ATS para CV de {{title}}',
    atsIntro:
      'Estas palabras clave suelen buscarlas los sistemas ATS en ofertas de {{title}}. Intégralas de forma natural en tu currículum para mejorar el paso del cribado automático.',
    sectionFaqAria: 'Preguntas frecuentes',
    faqHeading: 'Preguntas frecuentes — CV de {{title}}',
    sectionCtaAria: 'Llamada a la acción',
    ctaTitle: '¿Listo para crear tu CV de {{title}}?',
    ctaBody:
      'Elige entre más de {{count}} plantillas diseñadas por profesionales, recibe sugerencias de contenido con IA y descarga tu currículum optimizado para ATS en minutos. Empieza gratis.',
    ctaButton: 'Empezar a crear',
  },
  skillResumePage: {
    breadcrumbNavAria: 'Ruta de navegación',
    breadcrumbHome: 'Inicio',
    breadcrumbHub: 'Habilidades para el CV',
    breadcrumbSchemaLeaf: 'Habilidades de {{title}}',
    notFoundTitle: 'Página no encontrada',
    notFoundDescription: 'La página de habilidades que buscas no existe.',
    notFoundCta: 'Ir al inicio',
    h1: 'Habilidades de {{title}} para tu currículum',
    sectionWhyAria: 'Por qué importa esta habilidad',
    whyHeading: 'Por qué {{title}} importa en tu CV',
    sectionTemplatesAria: 'Plantillas de currículum para {{title}}',
    templatesHeading: 'Plantillas de CV para profesionales en {{title}}',
    createYourResume: 'Crea tu currículum',
    sectionOverviewAria: 'Descripción de la habilidad',
    understandingHeading: 'Qué debes saber sobre {{title}}',
    sectionRelatedAria: 'Habilidades relacionadas',
    relatedHeading: 'Habilidades relacionadas y complementarias',
    relatedIntro:
      'Quienes incluyen {{titleLower}} en su CV suelen destacar también estas habilidades complementarias.',
    sectionBulletsAria: 'Ejemplos para el CV',
    bulletsHeading: 'Ejemplos de logros en el CV para {{title}}',
    bulletsIntro:
      'Usa estos ejemplos como inspiración para mostrar {{titleLower}} en tu currículum.',
    sectionTipsAria: 'Consejos para el CV',
    tipsHeading: 'Consejos para incluir {{title}} en tu CV',
    sectionProfessionsAria: 'Profesiones relacionadas',
    professionsHeading: 'Profesiones donde se valora {{title}}',
    professionsIntro:
      '{{title}} es una habilidad valiosa para estos roles. Explora nuestras guías de CV por profesión para consejos a medida.',
    professionCardSubtitle: 'Ver guía de CV de {{title}}',
    sectionAtsAria: 'Palabras clave ATS',
    atsHeading: 'Palabras clave ATS relacionadas con {{title}}',
    atsIntro:
      'Incluye estas palabras clave de forma natural en tu CV para mejorar las probabilidades de pasar sistemas ATS en puestos que requieren {{titleLower}}.',
    sectionFaqAria: 'Preguntas frecuentes',
    faqHeading: 'Preguntas frecuentes — CV y {{title}}',
    sectionCtaAria: 'Llamada a la acción',
    ctaTitle: 'Crea tu CV destacando {{title}}',
    ctaBody:
      'Muestra tu experiencia en {{titleLower}} con nuestro creador de CV gratuito con IA. Plantillas optimizadas para ATS y formato profesional en minutos.',
    ctaPrimary: 'Empezar gratis',
    ctaSecondary: 'Crear mi CV',
  },
  footer: {
    resumeGuides: 'Guías de CV',
    quickLinks: 'Enlaces Rápidos',
    legal: 'Legal',
    tools: 'Herramientas',
    toolLinks: {
      atsChecker: 'Verificador ATS',
      jobTailoring: 'CV para Descripción de Trabajo',
      aiBuilder: 'Creador de CV con IA',
      translator: 'Traductor de CV',
      templates: 'Plantillas de CV',
    },
    copyright: '© 2024 GetQuickResume. Todos los derechos reservados.',
    madeWith: 'Hecho con',
    inCostaRica: 'en Costa Rica',
    emailUs: 'Envíanos un correo',
  },

  // Checkout
  checkout: {
    authenticationRequired: 'Por favor inicia sesión para actualizar a premium',
    alreadyPremium: 'Ya eres un suscriptor premium',
    processing: 'Procesando...',
    error: 'Ocurrió un error al procesar tu pago. Por favor intenta de nuevo.',
  },

  // Thank You Page
  thankYou: {
    title: '¡Gracias por Tu Compra!',
    subtitle: 'Tu suscripción premium está siendo activada',
    verifying: 'Verificando Tu Compra',
    verifyingMessage: 'Por favor espera mientras confirmamos tu pago...',
    transactionId: 'ID de Transacción',
    premiumActive: 'Premium Activo',
    welcomePremium: '¡Bienvenido a Premium!',
    premiumDescription: 'Tu suscripción premium ha sido activada exitosamente. Ahora tienes acceso a todas las funciones premium.',
    whatsNext: '¿Qué Sigue?',
    nextStep1: 'Crea CVs profesionales ilimitados con IA',
    nextStep2: 'Traduce tu CV a múltiples idiomas',
    nextStep3: 'Comparte tu CV con códigos QR y rastrea analíticas',
    nextStep4: 'Usa funciones avanzadas de IA para mejorar tu CV',
    goToDashboard: 'Ir al Panel',
    createResume: 'Crear CV',
    processing: 'Procesando Tu Pago',
    processingMessage: 'Tu pago está siendo procesado. Tu suscripción premium será activada en breve.',
    processingNote: 'Recibirás un correo de confirmación una vez que tu suscripción esté activa.',
    needHelp: '¿Necesitas ayuda?',
    contactSupport: 'Contactar Soporte',
  },

  // Cover Letter
  coverLetter: {
    title: 'Generador de Cartas de Presentación',
    subtitle: 'Crea cartas de presentación personalizadas con IA',
    generate: 'Generar Carta',
    generating: 'Generando...',
    confirmLeave: 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?',
    
    leaveModal: {
      title: 'Cambios sin Guardar',
      description: 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir? Tu carta de presentación se perderá.',
      stay: 'Quedarse',
      leave: 'Salir sin Guardar',
    },
    
    sourceSelector: {
      title: '¿Cómo quieres empezar?',
      subtitle: 'Elige un punto de partida para tu carta',
      fromResume: {
        title: 'Desde un CV Existente',
        description: 'Usa los datos de tu CV para autocompletar',
        noResumes: 'No se encontraron CVs. ¡Crea uno primero!',
        noProfession: 'Sin profesión especificada',
      },
      fromScratch: {
        title: 'Empezar de Cero',
        description: 'Ingresa toda la información manualmente',
        cta: 'Crear desde cero',
        hint: 'Perfecto para nuevas aplicaciones',
        button: 'Empezar de Cero',
      },
    },

    form: {
      sections: {
        company: 'Empresa y Puesto',
        companyDesc: 'Cuéntanos sobre la posición',
        personal: 'Toque Personal',
        personalDesc: 'Hazlo único para ti',
        personalInfo: 'Tu Información',
        personalInfoDesc: 'Agrega tus datos de contacto',
        style: 'Tono y Estilo',
        styleDesc: 'Personaliza la voz',
      },
      companyName: 'Nombre de la Empresa',
      companyNamePlaceholder: 'ej., Google, Microsoft, Startup Inc.',
      jobTitle: 'Título del Puesto',
      jobTitlePlaceholder: 'ej., Ingeniero de Software, Gerente de Producto',
      jobDescription: 'Descripción del Puesto',
      jobDescriptionPlaceholder: 'Pega la descripción del puesto aquí para mejor personalización...',
      jobDescriptionHint: 'Opcional pero recomendado para mejores resultados',
      hiringManager: 'Nombre del Reclutador',
      hiringManagerPlaceholder: 'ej., Juan Pérez (opcional)',
      whyCompany: '¿Por Qué Esta Empresa?',
      whyCompanyPlaceholder: '¿Qué te emociona de esta empresa? Su misión, cultura, productos...',
      keyAchievement: 'Logro Clave a Destacar',
      keyAchievementPlaceholder: 'Tu logro más relevante para este rol...',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Tu nombre completo',
      email: 'Correo Electrónico',
      emailPlaceholder: 'tu.correo@ejemplo.com',
      phone: 'Teléfono',
      phonePlaceholder: '+52 (555) 123-4567',
      linkedin: 'LinkedIn',
      linkedinPlaceholder: 'linkedin.com/in/tuperfil',
      toneLabel: 'Elige tu tono',
      lengthLabel: 'Elige la extensión',
      requiredHint: 'Por favor completa todos los campos requeridos (*)',
      tone: {
        professional: 'Profesional',
        friendly: 'Amigable',
        confident: 'Seguro',
        creative: 'Creativo',
      },
      length: {
        concise: 'Conciso',
        conciseDesc: '3-4 párrafos, directo al punto',
        standard: 'Estándar',
        standardDesc: '5-6 párrafos, detalle balanceado',
        detailed: 'Detallado',
        detailedDesc: '7+ párrafos, comprensivo',
      },
    },

    templates: {
      title: 'Elegir Plantilla',
      classic: {
        name: 'Clásico',
        description: 'Estilo tradicional y formal',
      },
      modern: {
        name: 'Moderno',
        description: 'Limpio y contemporáneo',
      },
      minimal: {
        name: 'Minimalista',
        description: 'Simple y elegante',
      },
      creative: {
        name: 'Creativo',
        description: 'Diseño audaz y único',
      },
    },

    preview: {
      title: 'Vista Previa',
      copy: 'Copiar al portapapeles',
      download: 'Descargar PDF',
      print: 'Imprimir',
      save: 'Guardar',
      saved: '¡Guardado!',
      saveFailed: 'Error al guardar la carta',
      copied: '¡Copiado al portapapeles!',
      downloadStarted: '¡Descarga iniciada!',
      downloadingPdf: 'Generando PDF...',
      downloadFailed: 'Error al descargar PDF',
      generating: 'Generando tu carta de presentación...',
      generatingHint: 'Nuestra IA está creando una carta personalizada basada en tus datos',
      edit: 'Editar',
      regenerate: 'Regenerar',
      regeneratePremium: 'Función premium',
      paragraphRegenerated: '¡Párrafo regenerado!',
      paragraphSaved: '¡Cambios guardados!',
      empty: {
        title: 'Tu carta aparecerá aquí',
        description: 'Completa el formulario y haz clic en Generar para crear tu carta personalizada',
      },
    },

    success: {
      generated: '¡Carta de presentación generada exitosamente!',
    },

    errors: {
      companyRequired: 'Por favor ingresa el nombre de la empresa',
      jobTitleRequired: 'Por favor ingresa el título del puesto',
      nameRequired: 'Por favor ingresa tu nombre completo',
      generateFailed: 'Error al generar la carta. Por favor intenta de nuevo.',
      regenerateFailed: 'Error al regenerar el párrafo. Por favor intenta de nuevo.',
      premiumRequired: 'Has alcanzado tu límite de cartas gratuitas. Actualiza a premium para más.',
      loadFailed: 'Error al cargar la carta. Por favor intenta de nuevo.',
    },

    loading: 'Cargando carta de presentación...',

    ai: {
      getSuggestions: 'Sugerencias IA',
      enhance: 'Mejorar con IA',
      jobDescriptionRequired: 'Por favor agrega una descripción del puesto arriba para generar sugerencias IA',
      suggestionsLoaded: '¡Sugerencias cargadas!',
      suggestionsFailed: 'Error al obtener sugerencias',
      achievementEnhanced: '¡Logro mejorado!',
      enhanceFailed: 'Error al mejorar el logro',
      rateLimitExceeded: 'Demasiadas solicitudes. Por favor espera un momento.',
      clickToAdd: 'Haz clic para agregar:',
      suggestionApplied: '¡Sugerencia agregada!',
    },

    premium: {
      title: 'Función Premium',
      suggestionsDescription: 'Las sugerencias impulsadas por IA te ayudan a escribir razones convincentes sobre por qué quieres trabajar en esta empresa. ¡Actualiza a premium para acceso ilimitado!',
      enhanceDescription: 'La mejora con IA transforma tu logro en una declaración profesional e impactante. ¡Actualiza a premium para acceso ilimitado!',
      regenerateDescription: 'Regenerar párrafos con IA es una función premium. ¡Actualiza para acceder a regeneraciones ilimitadas y más!',
      upgrade: 'Actualizar Ahora',
    },
  },

  // Función de Personalización de CV
  jobTailoring: {
    // Strings a nivel de página
    page: {
      title: 'Personalización de CV',
      subtitle: 'Optimiza tu CV para trabajos específicos',
      back: 'Volver',
    },

    // Nombres de pasos - Ahora 4 pasos en vez de 5
    steps: {
      jobDetails: 'Detalles del Trabajo',
      summary: 'Resumen',          // NUEVO: Reemplaza análisis + preguntas
      review: 'Revisar',
      save: 'Guardar',
      // OBSOLETO: Se mantiene para compatibilidad
      analysis: 'Análisis',
      questions: 'Preguntas',
    },

    // Componente JobInput
    jobInput: {
      title: 'Personaliza tu CV',
      subtitle: 'Selecciona un CV y proporciona los detalles de la oferta de trabajo para comenzar',
      selectResume: 'Seleccionar CV a Personalizar',
      change: 'Cambiar',
      loadingResumes: 'Cargando CVs...',
      noResumes: 'No se encontraron CVs generados',
      noResumesHint: 'Crea y genera un CV primero para usar esta función',
      untitledResume: 'CV sin título',
      jobPostingDetails: 'Detalles de la Oferta',
      pasteDescription: 'Pegar Descripción',
      enterUrl: 'Ingresar URL',
      jobDescriptionLabel: 'Descripción del Trabajo',
      jobDescriptionPlaceholder: 'Pega la descripción completa del trabajo aquí...\n\nIncluye:\n• Título del puesto y nombre de la empresa\n• Habilidades y requisitos necesarios\n• Responsabilidades\n• Experiencia preferida',
      characters: '{{count}} caracteres',
      minCharacters: 'Por favor proporciona más detalles (mín 50 caracteres)',
      tipsTitle: '💡 Consejos para mejores resultados:',
      tips: {
        complete: 'Incluye la descripción completa del trabajo, no solo el título',
        skills: 'Asegúrate de incluir las habilidades y requisitos necesarios',
        keywords: 'Incluye palabras clave que aparezcan múltiples veces en la oferta',
      },
      errors: {
        selectResume: 'Por favor selecciona un CV para personalizar',
        provideDescription: 'Por favor proporciona una descripción del trabajo',
      },
      analyzeJob: 'Analizar Trabajo',
      analyzing: 'Analizando...',
      updated: 'Actualizado {{date}}',
    },

    // Componente UrlValidator
    urlValidator: {
      placeholder: 'https://linkedin.com/jobs/view/...',
      validating: 'Validando URL de la oferta...',
      successReady: 'Oferta encontrada - ¡Lista para analizar!',
      detected: 'Detectado:',
      validateButton: 'Validar y Extraer Info',
      supportedBoards: 'Portales de empleo soportados',
      supportedBoardsDesc: 'Hemos optimizado la extracción para estos portales de empleo:',
      otherUrlsNote: 'Otras URLs de ofertas también pueden funcionar, pero la calidad de extracción puede variar.',
      or: 'o',
      pasteManually: 'Pegar descripción manualmente',
      pasteManuallyLink: 'Pega la descripción del trabajo manualmente',
    },

    // Componente JobPreviewCard
    jobPreview: {
      found: '¡Oferta de Trabajo Encontrada!',
      reviewInfo: 'Revisa la información extraída a continuación',
      jobTitle: 'Título del Puesto',
      company: 'Empresa',
      descriptionPreview: 'Vista Previa de la Descripción',
      showLess: 'Mostrar menos',
      showFull: 'Mostrar descripción completa',
      notRight: '¿Esto no parece correcto?',
      enterManually: 'Ingresar detalles manualmente',
      editDetails: 'Editar Detalles',
      confirmContinue: 'Confirmar y Continuar',
      analyzing: 'Analizando...',
    },

    // Componente JobAnalysis
    analysis: {
      analyzing: 'Analizando Oferta de Trabajo...',
      analyzingDesc: 'Estamos extrayendo los requisitos clave y comparándolos con tu CV',
      noData: 'No hay datos de análisis disponibles. Por favor regresa e intenta de nuevo.',
      goBack: '← Regresar',
      title: 'Análisis Completado',
      subtitle: 'Revisa la información extraída y el puntaje de coincidencia',
      jobDetails: 'Detalles del Trabajo',
      edit: 'Editar',
      cancel: 'Cancelar',
      save: 'Guardar',
      jobTitleLabel: 'Título del Puesto',
      companyLabel: 'Empresa',
      locationLabel: 'Ubicación',
      notSpecified: 'No especificado',
      keywordsDetected: 'Palabras Clave Detectadas',
      keyRequirements: 'Requisitos Clave',
      currentMatchScore: 'Puntaje de Coincidencia Actual',
      canBeImproved: 'Puede mejorarse con personalización',
      matchingSkills: 'Habilidades Coincidentes',
      skillsToHighlight: 'Habilidades a Destacar',
      aiSuggestions: 'Sugerencias de IA',
      continueToQuestions: 'Continuar a Preguntas',
    },

    // NUEVO: Componente TailoringSummary (reemplaza análisis + preguntas)
    summary: {
      analyzing: 'Analizando tu CV',
      analyzingDesc: 'Ejecutando análisis completo de ATS y coincidencia de palabras clave...',
      noData: 'No hay datos de análisis disponibles',
      goBack: 'Volver e intentar de nuevo',
      title: 'Resumen de Personalización',
      subtitle: 'Revisa tu puntuación ATS y reclama las palabras clave faltantes que tienes experiencia',
      // Etiquetas de estado de puntuación
      excellent: 'Excelente',
      good: 'Bueno',
      needsImprovement: 'Necesita Mejora',
      poor: 'Pobre',
      // Sección de puntuación ATS
      atsScore: 'Puntuación de Coincidencia ATS',
      canImprove: 'Puede mejorar',
      matchedKeywords: 'Palabras Clave Coincidentes',
      missingCritical: 'Críticas Faltantes',
      keywordsClaimed: 'Palabras Clave Reclamadas',
      // Sección de fortalezas
      strengths: 'Fortalezas del CV',
      itemsFound: 'elementos encontrados',
      noStrengths: 'No se identificaron fortalezas específicas aún',
      // Sección de debilidades
      areasToImprove: 'Áreas a Mejorar',
      suggestionsFound: 'sugerencias',
      noWeaknesses: 'No se identificaron áreas específicas a mejorar',
      // Secciones de palabras clave faltantes
      missingCriticalKeywords: 'Palabras Clave Críticas Faltantes',
      missingImportantKeywords: 'Palabras Clave Importantes Faltantes',
      missingNiceToHaveKeywords: 'Habilidades Deseables',
      claimIfYouHave: 'Haz clic en + para reclamar si tienes esta experiencia',
      keywordsToConsider: 'palabras clave a considerar',
      bonusKeywords: 'palabras clave adicionales a considerar',
      keywordsAlreadyPresent: 'palabras clave ya en tu CV',
      claimKeyword: 'Reclamar esta palabra clave',
      removeKeyword: 'Eliminar reclamo',
      // Resumen de palabras clave reclamadas
      claimedKeywordsSummary: 'Palabras Clave que Has Reclamado',
      claimedKeywordsNote: 'Estas palabras clave serán incorporadas en tu CV personalizado basándose en la experiencia que describiste.',
      // Acciones
      generating: 'Generando...',
      generateTailored: 'Generar CV Personalizado',
    },

    // OBSOLETO: Componente ClarificationQuestions (se mantiene para compatibilidad)
    questions: {
      generating: 'Generando Preguntas...',
      generatingDesc: 'Nuestra IA está creando preguntas personalizadas basadas en los requisitos del trabajo',
      title: 'Aclaraciones Rápidas',
      subtitle: 'Ayúdanos a personalizar tu CV respondiendo algunas preguntas sobre tu experiencia',
      tipsTitle: 'Consejos para mejores resultados:',
      tips: {
        specific: 'Sé específico e incluye números cuando sea posible',
        enhance: 'Usa el botón "Mejorar con IA" para mejorar tus respuestas',
        skip: 'Puedes omitir preguntas opcionales si no son relevantes',
      },
      required: 'Requerido',
      selectOption: 'Selecciona una opción...',
      typeAnswer: 'Escribe tu respuesta aquí...',
      useAiSuggestion: 'Usar Sugerencia IA',
      enhancing: 'Mejorando...',
      enhanceWithAi: 'Mejorar con IA',
      generateWithAi: 'Generar con IA',
      skip: 'Omitir',
      aiSuggestion: 'Sugerencia IA',
      relatedTo: 'Relacionado con:',
      progress: '{{answered}} de {{total}} preguntas respondidas',
      completeRequired: 'Completa las preguntas requeridas para continuar',
      generateTailored: 'Generar CV Personalizado',
      generatingTailored: 'Adaptando currículum...',
      hint: 'Pista',
      aiGeneratedOptions: 'Opciones Generadas por IA',
      generateAiSuggestions: 'Generar Sugerencias con IA',
      regenerate: 'Regenerar',
    },

    // Componente ReviewChanges
    review: {
      tailoring: 'Personalizando tu CV...',
      tailoringDesc: 'Nuestra IA está optimizando tu CV para esta oferta específica',
      progress: {
        analyzing: 'Analizando requisitos del trabajo',
        optimizing: 'Optimizando contenido para ATS',
        keywords: 'Mejorando palabras clave',
        grammar: 'Verificando gramática',
      },
      noResults: 'No hay resultados de personalización disponibles. Por favor regresa e intenta de nuevo.',
      title: 'Revisar Cambios',
      subtitle: 'Mira cómo hemos optimizado tu CV para este puesto',
      before: 'Antes',
      after: 'Después',
      atsScore: 'Puntaje ATS',
      pointsImproved: 'Puntos mejorados',
      changesMade: 'Cambios Realizados',
      keywordsAdded: 'Palabras Clave Añadidas',
      grammarFixes: 'Correcciones de Gramática',
      matchScore: 'Puntaje de Coincidencia',
      detailedChanges: 'Cambios Detallados',
      hideDiff: 'Ocultar Diferencias',
      showDiff: 'Mostrar Diferencias',
      original: 'Original',
      tailored: 'Personalizado',
      keywordsOptimized: 'Palabras Clave Optimizadas para ATS',
      grammarImprovements: 'Mejoras de Gramática y Estilo',
      saveTailoredResume: 'Guardar CV Personalizado',
      changeTypes: {
        added: 'añadido',
        modified: 'modificado',
        enhanced: 'mejorado',
      },
      // Nuevas traducciones para revisión mejorada
      fullyOptimized: '¡Optimizado para ATS y Listo!',
      fullyOptimizedDesc: 'Tu CV está completamente optimizado para esta posición',
      matchBefore: 'Coincidencia Antes',
      matchAfter: 'Coincidencia Después',
      matchImproved: 'Coincidencia Mejorada',
      answersUsed: 'Respuestas Aplicadas',
      answersAppliedTitle: 'Tus Respuestas Aplicadas',
      answersAppliedDesc: '{{count}} de tus respuestas fueron incorporadas al CV',
      atsBreakdownTitle: 'Desglose de Puntaje ATS',
      atsBreakdownDesc: 'Análisis detallado de la optimización de tu CV',
      keywordAnalysisTitle: 'Análisis de Palabras Clave',
      keywordAnalysisDesc: 'Compara las palabras clave de tu CV con los requisitos del trabajo',
    },

    // Componente ATS Breakdown
    atsBreakdown: {
      excellent: 'Excelente',
      good: 'Bueno',
      needsImprovement: 'Necesita Mejora',
      poor: 'Deficiente',
      atsReady: '¡Listo para ATS!',
      recommendations: 'Recomendaciones para 100%',
    },

    // Componente Keyword Analysis
    keywordAnalysis: {
      matchOverview: 'Resumen de Coincidencia de Palabras Clave',
      matched: 'coinciden',
      critical: 'Crítico',
      important: 'Importante',
      niceToHave: 'Deseable',
      missingCritical: 'Palabras Clave Críticas Faltantes',
      missingCriticalHint: 'Considera añadir estas palabras clave si tienes experiencia relevante.',
      missingCriticalHintWithAdd: 'Haz clic en el botón + para añadir las habilidades en las que tienes experiencia.',
      missingImportant: 'Palabras Clave Importantes Faltantes',
      missingImportantHintWithAdd: 'Haz clic en el botón + para añadir las habilidades en las que tienes experiencia.',
      matchedKeywords: 'Palabras Clave Coincidentes',
      uniqueKeywords: 'Tus Palabras Clave Únicas (Diferenciadores)',
      uniqueKeywordsHint: 'Estas palabras clave te distinguen de otros candidatos.',
      fullComparison: 'Comparación Completa de Palabras Clave',
      yourResumeKeywords: 'Palabras Clave de Tu CV',
      jobRequirements: 'Requisitos del Trabajo',
      addKeywordTitle: 'Tengo esta habilidad - añadir al CV',
    },

    // Keyword Intelligence (sección unificada en página de revisión)
    keywordIntelligence: {
      title: 'Inteligencia de Palabras Clave ATS',
      subtitle: 'Resultados de optimización de palabras clave',
      before: 'Antes de Optimizar',
      after: 'Después de Optimizar',
      improved: 'Mejora',
      matched: 'coinciden',
      criticalMissing: 'críticas faltantes',
      importantMissing: 'importantes faltantes',
      criticalRequirements: 'Requisitos Críticos',
      importantSkills: 'Habilidades Importantes',
      keywordsAdded: 'Palabras Clave Añadidas en esta Optimización',
      keywordsOptimized: 'palabras clave optimizadas',
      differentiators: 'Tus Diferenciadores',
      standOut: 'Habilidades que te hacen destacar',
      addKeywordTitle: 'Tengo esta habilidad - añadir al CV',
      addCriticalHint: 'Haz clic en + para añadir habilidades en las que tienes experiencia',
      addedHint: 'Estas palabras clave fueron añadidas estratégicamente para mejorar tu puntuación ATS',
      differentiatorsHint: 'Estas habilidades únicas te distinguen de otros candidatos',
      niceToHaveMissing: 'deseables faltantes',
      niceToHaveSkills: 'Habilidades Deseables',
    },

    // Modal Añadir Palabra Clave
    addKeyword: {
      title: 'Añadir Palabra Clave Faltante',
      subtitle: 'Cuéntanos sobre tu experiencia',
      errorEmpty: 'Por favor proporciona algo de contexto sobre tu experiencia con esta habilidad.',
      errorTooShort: 'Por favor proporciona más detalles (al menos 10 caracteres).',
      errorGeneric: 'Error al añadir la palabra clave. Por favor intenta de nuevo.',
      errorEnhance: 'Error al mejorar el texto. Por favor intenta de nuevo.',
      criticalDesc: 'Esta palabra clave es crítica para el trabajo. Añadirla mejorará significativamente tu puntuación de coincidencia.',
      importantDesc: 'Esta palabra clave es importante para el trabajo. Añadirla ayudará a mejorar tus posibilidades.',
      contextLabel: 'Describe tu experiencia con {{keyword}}',
      placeholder: 'ej., "3 años de experiencia usando {{keyword}} para desarrollo backend e integraciones de API"',
      hint: 'La IA incorporará esto en tus secciones de Habilidades, Resumen y/o Experiencia.',
      suggestions: 'Sugerencias rápidas',
      prompt1: 'Tengo 2-3 años de experiencia con {{keyword}}',
      prompt2: 'Usé {{keyword}} en proyectos que involucran...',
      prompt3: 'Certificado en {{keyword}} / completé formación en {{keyword}}',
      premiumFeature: 'Función Premium: La IA añadirá inteligentemente esta palabra clave a las secciones relevantes del CV',
      adding: 'Añadiendo...',
      addToResume: 'Añadir al CV',
      // NUEVO: Mejora con IA
      enhanced: 'Texto mejorado por IA',
      enhancing: 'Mejorando...',
      enhanceWithAI: 'Mejorar con IA',
    },

    // Componente SaveTailored
    save: {
      successTitle: '¡CV Personalizado Exitosamente!',
      successDesc: 'Tu CV ha sido optimizado para el puesto de {{jobTitle}} en {{companyName}}',
      viewResume: 'Ver CV',
      dashboard: 'Panel',
      tailorAnother: 'Personalizar para Otro Trabajo',
      tip: '💡 Consejo: ¡Descarga tu CV personalizado y aplica directamente a la oferta!',
      title: 'Guarda tu CV Personalizado',
      subtitle: 'Dale un nombre a tu CV personalizado y guárdalo en tu cuenta',
      resumeTitle: 'Título del CV',
      resumeTitlePlaceholder: 'ej., Desarrollador Senior - TechCorp',
      resumeTitleHint: 'Esto te ayudará a identificar este CV en tu panel',
      tailoredFor: 'Personalizado para:',
      position: 'Puesto',
      improvementsMade: 'Mejoras Realizadas',
      atsScoreBoost: 'Mejora de Puntaje ATS',
      optimizations: 'Optimizaciones',
      keywordsAddedLabel: 'Palabras Clave Añadidas',
      grammarFixesLabel: 'Correcciones de Gramática',
      saving: 'Guardando...',
      saveResume: 'Guardar CV',
      tailoredBadge: 'Personalizado',
      saveSuccess: '¡CV guardado exitosamente! Redirigiendo al panel...',
      saveError: 'Error al guardar el CV. Por favor intenta de nuevo.',
      redirecting: 'Redirigiendo al panel...',
    },

    // Componente JobApplicationsList (Panel)
    dashboard: {
      title: 'Aplicaciones de Trabajo',
      subtitle: 'CVs personalizados para ofertas específicas',
      tailoredCount: '{{count}} CV personalizado',
      tailoredCountPlural: '{{count}} CVs personalizados',
      new: 'Nuevo',
      upgrade: 'Actualizar',
      createFirst: 'Crear CV Primero',
      createFirstDesc: 'Crea y genera un CV primero, luego podrás personalizarlo para ofertas específicas.',
      increaseChances: '¡Aumenta tus posibilidades de conseguir entrevistas!',
      increaseChancesDesc: 'Personaliza tu CV para un trabajo específico para mejorar puntajes ATS y coincidencia de palabras clave.',
      tailorForJob: 'Personalizar CV para un Trabajo',
      upgradeForMore: 'Actualiza para Más CVs Personalizados',
      features: {
        atsScores: 'Mejores puntajes ATS',
        keywords: 'Optimización de palabras clave',
        grammar: 'Gramática verificada',
      },
      from: 'De:',
      view: 'Ver',
      edit: 'Editar',
      delete: 'Eliminar',
      deleteModal: {
        title: 'Eliminar CV Personalizado',
        description: '¿Estás seguro de que quieres eliminar este CV personalizado? Esta acción no se puede deshacer.',
        deleting: 'Eliminando...',
      },
    },

    // Diálogo de recuperación de sesión
    recovery: {
      title: '¿Continuar tu progreso?',
      message: 'Tienes una sesión de personalización sin terminar. ¿Te gustaría continuar donde lo dejaste?',
      continue: 'Continuar',
      startFresh: 'Empezar de nuevo',
      resumeLabel: 'CV:',
      stepInfo: 'Progreso: Paso {{step}} de 5',
    },

    // Diálogo de confirmación de salida
    leave: {
      title: '¿Salir de la personalización?',
      message: 'Tienes progreso sin guardar. ¿Estás seguro de que quieres salir? Tu progreso se guardará y podrás volver más tarde.',
      leave: 'Salir',
      stay: 'Quedarme',
    },

    // Errores
    errors: {
      resumeDeleted: 'El CV que estabas personalizando ha sido eliminado. Por favor selecciona uno nuevo.',
    },
  },

  // Premium Modal - Contenido de ventas por funcionalidad
  premiumModal: {
    maybeLater: 'Quizás Luego',
    
    // Función de Traducción
    translate: {
      headline: 'Postúlate a Empleos en Todo el Mundo',
      subheadline: 'Traduce tu CV instantáneamente a 12 idiomas con calidad profesional impulsada por IA',
      speed: 'Ultrarrápido',
      speedDesc: 'Menos de 30 segundos',
      quality: 'Calidad Profesional',
      qualityDesc: 'Precisión con IA',
      format: 'Mantiene Formato',
      formatDesc: 'Diseño perfecto preservado',
      unlimited: 'Uso Ilimitado',
      unlimitedDesc: 'Traduce cuando quieras',
      cta: 'Desbloquear Empleos Globales',
    },

    // Función Adaptar para Empleo
    tailorForJob: {
      headline: 'Consigue Más Entrevistas',
      subheadline: 'La IA optimiza tu CV para coincidir perfectamente con cualquier oferta de trabajo',
      before: 'Antes',
      after: 'Después',
      instant: 'Análisis Instantáneo',
      instantDesc: 'La IA lee la oferta en segundos',
      ats: 'Supera los Sistemas ATS',
      atsDesc: 'Palabras clave y formato optimizados',
      interviews: '3x Más Llamadas',
      interviewsDesc: 'Los usuarios reportan mejores resultados',
      socialProof: '✨ Los usuarios reciben 3x más invitaciones a entrevistas',
      cta: 'Aumentar Mi Puntuación',
    },

    // Función Mejorar con IA
    enhance: {
      headline: 'Haz Tu CV Compatible con ATS',
      subheadline: 'La IA reescribe y optimiza cada sección para máximo impacto',
      before: 'Antes',
      after: 'Después',
      beforeText: 'Gestioné proyectos del equipo',
      afterText: 'Lideré equipo multifuncional de 8 personas, entregando 5 proyectos 20% bajo presupuesto',
      ats: 'Supera 95% de ATS',
      atsDesc: 'Optimizado para todos los sistemas',
      rewrite: 'Reescritura con IA',
      rewriteDesc: 'Frases débiles → Alto impacto',
      sections: 'Todas las Secciones',
      sectionsDesc: 'Mejora cada parte individualmente',
      keywords: 'Palabras Clave Inteligentes',
      keywordsDesc: 'Términos específicos del sector',
      cta: 'Mejorar Mi CV',
    },

    // Función Compartir
    share: {
      headline: 'Sabe Quién Ve Tu CV',
      subheadline: 'Obtén analíticas en tiempo real de cada vista con enlaces compartibles y códigos QR',
      viewsToday: 'Vistas Hoy',
      realtime: 'Seguimiento en Tiempo Real',
      realtimeDesc: 'Sabe cuándo los reclutadores ven tu CV',
      qrcode: 'Código QR para Compartir',
      qrcodeDesc: 'Perfecto para eventos de networking',
      location: 'Información de Ubicación',
      locationDesc: 'Ve ciudades y países',
      cta: 'Empezar a Rastrear Vistas',
    },

    // Función Re-evaluar
    rescore: {
      headline: 'Rastrea Tu Mejora',
      subheadline: 'Obtén puntuaciones detalladas de compatibilidad ATS con retroalimentación accionable',
      current: 'Actual',
      potential: 'Potencial',
      detailed: 'Puntuación ATS Detallada',
      detailedDesc: 'Sabe exactamente dónde estás',
      breakdown: 'Desglose por Sección',
      breakdownDesc: 'Ve qué necesita trabajo',
      unlimited: 'Re-evaluación Ilimitada',
      unlimitedDesc: 'Verifica después de cada edición',
      cta: 'Obtener Mi Puntuación',
    },

    // Función Sugerencias con IA
    aiSuggestions: {
      cta: 'Desbloquear Sugerencias con IA',
    },

    // Función Regenerar
    regenerate: {
      cta: 'Actualizar para Regenerar',
    },

    // Función Crear CV (para usuarios gratuitos que han usado su cuota)
    createResume: {
      headline: 'Límite de CV Gratuito Alcanzado',
      subheadline: 'Ya has utilizado tu único CV gratuito generado con IA',
      cta: 'Actualizar para CVs Ilimitados',
    },

    // Función Carta de Presentación
    coverLetter: {
      headline: 'Cartas de Presentación Premium',
      subheadline: 'Genera cartas de presentación con IA adaptadas a cada solicitud de empleo',
      aiPowered: 'Contenido Generado con IA',
      aiPoweredDesc: 'Cartas profesionales en segundos',
      tailored: 'Adaptación por Empleo',
      tailoredDesc: 'Ajustada a cada empresa y puesto',
      monthly: '30 Cartas/Mes',
      monthlyDesc: 'Crea todas las que necesites con Premium',
      cta: 'Desbloquear Cartas de Presentación',
    },

    resumeLimit: {
      headline: 'Límite de CVs Alcanzado',
      subheadline: 'Los usuarios gratuitos pueden guardar hasta 1 CV. Actualiza para desbloquear CVs ilimitados y todas las herramientas de IA.',
      cta: 'Actualizar Ahora',
      continueLocal: 'Continuar Sin Guardar',
      benefit1: 'Los datos de tu CV no se guardarán en la nube',
      benefit2: 'Actualiza a Premium para guardar CVs ilimitados',
      unlimitedResumes: 'CVs Ilimitados',
      unlimitedResumesDesc: 'Crea y guarda todos los CVs que necesites',
      aiFeatures: 'Herramientas de IA',
      aiFeaturesDesc: 'Traduce, adapta, mejora y puntúa tus CVs',
      cloudSave: 'Almacenamiento en la Nube',
      cloudSaveDesc: 'Todos tus CVs almacenados de forma segura y accesibles desde cualquier lugar',
    },
    // Fallback por defecto
    default: {
      benefit1: 'Acceso ilimitado a todas las funciones premium',
      benefit2: 'Herramientas impulsadas por IA para mejores resultados',
      benefit3: 'Soporte prioritario cuando lo necesites',
      cta: 'Actualizar a Premium',
    },
  },

  // Tarjeta de Puntuación - Sección Usuario Gratuito
  scoreCard: {
    freeUser: {
      areasToImprove: 'Áreas a Mejorar',
      detailsLocked: 'Detalles bloqueados',
      fix: 'Corregir',
      scorePotential: 'Tu puntuación podría llegar a',
      withImprovements: 'con mejoras',
      enhanceTitle: 'Mejora Tu Currículum',
      enhanceDescription: 'Desbloquea checklists detallados, mejoras con IA y optimización ATS',
      enhanceButton: 'Mejorar Mi Currículum',
      socialProof: 'Únete a miles de buscadores de empleo con currículums optimizados',
    },
    hints: {
      summaryNeedsAttention: 'El resumen podría ser más fuerte',
      experienceNeedsAttention: 'Los detalles de experiencia necesitan atención',
      skillsNeedEnhancement: 'La sección de habilidades podría mejorarse',
      educationIncomplete: 'Información de educación incompleta',
      contactMissing: 'Falta información de contacto clave',
      considerAchievements: 'Considera agregar logros',
      projectsNeedImprovement: 'Los detalles de proyectos podrían mejorarse',
      languagesNeedReview: 'La información de idiomas necesita revisión',
      entriesNeedCorrections: 'Algunas entradas necesitan correcciones',
      atsCouldBeBetter: 'La compatibilidad ATS podría ser mejor',
      multipleAreasNeedWork: 'Múltiples áreas necesitan mejoras',
      fewSectionsNeedWork: 'Algunas secciones podrían mejorarse',
    },
  },

  publicWizard: {
    progress: 'Paso {{current}} de {{total}}',
    templateSelection: {
      title: 'Elige tu plantilla',
      subtitle: 'Selecciona un diseño profesional para comenzar. Puedes cambiarlo después.',
      free: 'Gratis',
      previewDescription: 'Cada plantilla ha sido diseñada con cuidado para que crear tu currículum sea muy sencillo.',
      useTemplate: 'Usar esta plantilla',
      features: {
        a4Size: 'Tamaño A4 / Carta',
        editable: 'Texto editable',
        customizable: 'Totalmente personalizable',
        printReady: 'Listo para imprimir',
        shareable: 'Currículum en línea con enlace compartible',
      },
    },
    importChoice: {
      title: '¿Cómo quieres comenzar?',
      subtitle: 'Elige la mejor opción para ti',
      fromFile: 'Importar desde archivo',
      fromFileDesc: 'Sube un CV existente (PDF, DOCX)',
      fromLinkedIn: 'Importar desde LinkedIn',
      fromLinkedInDesc: 'Importa tus datos de perfil automáticamente',
      fromScratch: 'Empezar desde cero',
      fromScratchDesc: 'Crea tu CV paso a paso',
      freeBadge: 'Gratis',
      loginRequiredBadge: 'Iniciar sesión requerido',
    },
    aiModal: {
      title: '¡Esta función es gratis — solo inicia sesión!',
      description: 'Las funciones con IA como {{featureName}} están incluidas en tu plan gratuito. Inicia sesión para desbloquearlas — tu progreso está guardado y te estará esperando.',
      defaultFeature: 'Mejora con IA',
      signIn: 'Iniciar sesión para desbloquear',
      continueWithout: 'Continuar sin IA',
      reassurance: 'Tus datos del formulario están guardados localmente.',
    },
    preview: {
      editResume: 'Editar CV',
      downloadPdf: 'Descargar PDF',
      present: 'Presente',
      sections: {
        summary: 'Resumen',
        skills: 'Habilidades',
        experience: 'Experiencia',
        education: 'Educación',
      },
      unlockTitle: 'Desbloquea todo el poder de tu CV',
      unlockSubtitle: 'Regístrate gratis y accede a todas las funciones premium para conseguir el trabajo de tus sueños.',
      features: {
        aiEnhancement: 'Mejora de CV con IA',
        jobTailoring: 'Adaptación al puesto',
        atsScoring: 'Optimización y puntuación ATS',
        coverLetter: 'Generador de carta de presentación',
        translation: 'Traducción multilingüe',
        sharing: 'Código QR y analíticas',
      },
      signUpCta: 'Regístrate gratis para desbloquear todo',
      reassurance: 'Tu progreso está guardado. Regístrate y continúa donde lo dejaste.',
    },
  },
};
