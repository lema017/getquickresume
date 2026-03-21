import type { ProfessionCategoryId } from '../types';

type Lang = 'en' | 'es';

export interface CategoryNarrative {
  heroTagline: (title: string) => string;
  overviewLead: (title: string) => string;
  overviewMid: (title: string) => string;
  responsibilityTemplate: (title: string, skill: string) => string;
  skillContextTemplates: ((title: string, skill: string) => string)[];
  mistakeTemplates: string[];
}

const EN: Record<ProfessionCategoryId, CategoryNarrative> = {
  finance: {
    heroTagline: (t) =>
      `Position your ${t} resume around close quality, controls, and reporting credibility—so hiring teams see a finance operator, not a generic “detail-oriented” profile.`,
    overviewLead: (t) =>
      `Hiring managers for ${t} roles read resumes for evidence of reconciliations, reporting accuracy, and audit-ready documentation.`,
    overviewMid: (t) =>
      `The strongest ${t} candidates connect tools and keywords to outcomes: what you closed, what you reconciled, and what you validated for leadership or auditors.`,
    responsibilityTemplate: (title, skill) =>
      `Use ${skill} to deliver reliable outcomes expected in a ${title} position—tie it to reporting, controls, or stakeholder deliverables.`,
    skillContextTemplates: [
      (title, skill) =>
        `Show ${skill} with artifacts: schedules, reconciliations, or metrics—not a bare keyword list for ${title} roles.`,
      (title, skill) =>
        `Pair ${skill} with the business process you supported (close, forecast, compliance) as a ${title}.`,
      (title, skill) =>
        `Recruiters weigh ${skill} higher when your bullets mention systems, cadence, and who consumed your output as a ${title}.`,
    ],
    mistakeTemplates: [
      'Listing accounting tools without saying what you reconciled, closed, or audited.',
      'Using FP&A language when your experience is transactional accounting (or the reverse) without clear ownership.',
      'Omitting SOX, controls, or audit-support phrasing when you actually touched those workflows.',
      'Claiming “attention to detail” with no numeric close, accuracy, or variance story.',
    ],
  },
  engineering: {
    heroTagline: (t) =>
      `Frame your ${t} resume around systems shipped, reliability, and measurable impact—not buzzwords like “passionate coder.”`,
    overviewLead: (t) =>
      `Technical screens for ${t} applicants reward specifics: services you owned, latency or quality gains, and how you tested or shipped safely.`,
    overviewMid: (t) =>
      `Strong ${t} resumes name the stack, the constraints, and the user or business metric that moved when you delivered.`,
    responsibilityTemplate: (title, skill) =>
      `Apply ${skill} to design, build, or operate systems expected from a ${title}—quantify scale, reliability, or delivery impact.`,
    skillContextTemplates: [
      (title, skill) =>
        `Anchor ${skill} to repos, services, or environments you touched—not a skills dump for ${title} hiring loops.`,
      (title, skill) =>
        `Tie ${skill} to tests, reviews, or observability you used to keep production healthy as a ${title}.`,
      (title, skill) =>
        `Show ${skill} next to APIs, data contracts, or SLAs you were accountable for as a ${title}.`,
    ],
    mistakeTemplates: [
      'Twenty technologies listed with no depth on one system you actually shipped.',
      'Missing metrics: latency, error rate, adoption, cycle time, or incident reduction.',
      'Vague “collaborated with teams” instead of architecture, API, or ownership boundaries.',
      'No mention of testing, monitoring, or rollout strategy when you claim senior impact.',
    ],
  },
  education: {
    heroTagline: (t) =>
      `Highlight curriculum impact, student outcomes, and classroom leadership on your ${t} resume—not only credentials.`,
    overviewLead: (t) =>
      `Schools hiring ${t} professionals look for lesson design, assessment practice, and collaboration with families or staff.`,
    overviewMid: (t) =>
      `The best ${t} resumes show standards alignment, differentiation, and how you measured learning—not generic “passion for teaching.”`,
    responsibilityTemplate: (title, skill) =>
      `Demonstrate ${skill} through lesson cycles, assessments, or student supports relevant to a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Link ${skill} to grade levels, subjects, or programs where you applied it as a ${title}.`,
      (title, skill) =>
        `Use ${skill} in bullets about pacing, differentiation, or data you used to adjust instruction as a ${title}.`,
      (title, skill) =>
        `Connect ${skill} to family communication, IEP/504 collaboration, or MTSS examples if accurate for your ${title} work.`,
    ],
    mistakeTemplates: [
      'Only listing courses taught with no student outcome or instructional method.',
      'Buzzwords like “21st-century learning” without curriculum, tools, or standards named.',
      'Omitting classroom management or assessment when the role requires both.',
      'Ignoring PD, certifications, or coaching roles that differentiate experienced educators.',
    ],
  },
  healthcare: {
    heroTagline: (t) =>
      `Center your ${t} resume on patient safety, compliance, and clinical workflows recruiters can verify.`,
    overviewLead: (t) =>
      `Healthcare employers scan ${t} resumes for setting, acuity, protocols, and measurable care or throughput outcomes.`,
    overviewMid: (t) =>
      `Credible ${t} profiles name EMR tasks, certifications, and interdisciplinary coordination—not vague “compassionate caregiver.”`,
    responsibilityTemplate: (title, skill) =>
      `Show ${skill} inside clinical, operational, or regulatory workflows expected of a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Pair ${skill} with unit type, patient population, or protocol where you used it as a ${title}.`,
      (title, skill) =>
        `Reference ${skill} alongside documentation, handoffs, or quality metrics you influenced as a ${title}.`,
      (title, skill) =>
        `Tie ${skill} to training, audits, or safety initiatives when relevant to your ${title} scope.`,
    ],
    mistakeTemplates: [
      'HIPAA or safety claims without context of how you protected information or patients.',
      'No setting (clinic, hospital, LTC) or acuity signal for your experience level.',
      'Soft skills only, with no procedures, equipment, or charting systems named.',
      'Licenses or certs missing when they are gatekeeping for the role.',
    ],
  },
  sales: {
    heroTagline: (t) =>
      `Lead your ${t} resume with pipeline, revenue, and account wins—not “people person” clichés.`,
    overviewLead: (t) =>
      `Sales leaders hiring ${t} talent expect quota context, cycle length, and proof you expanded relationships.`,
    overviewMid: (t) =>
      `High-signal ${t} resumes blend CRM hygiene, outreach craft, and numbers: attainment, growth, or deal size.`,
    responsibilityTemplate: (title, skill) =>
      `Use ${skill} to open, advance, or close revenue as a ${title}—name segments, channels, or motions.`,
    skillContextTemplates: [
      (title, skill) =>
        `Attach ${skill} to pipeline stages you influenced and the metric that moved as a ${title}.`,
      (title, skill) =>
        `Show ${skill} with tools (CRM, sequences, call analytics) and how you used them responsibly.`,
      (title, skill) =>
        `Link ${skill} to discovery, negotiation, or retention stories relevant to ${title} buyers.`,
    ],
    mistakeTemplates: [
      '“Exceeded expectations” with no quota, percentage, or revenue context.',
      'Listing every sales methodology with no proof you executed one end-to-end.',
      'Ignoring account size, segment, or average deal complexity.',
      'No mention of CRM accuracy, forecasting discipline, or cross-functional partners.',
    ],
  },
  operations: {
    heroTagline: (t) =>
      `Show how your ${t} work improved throughput, cost, or reliability—operations resumes live in metrics.`,
    overviewLead: (t) =>
      `Operators reviewing ${t} resumes look for process design, vendor or floor coordination, and KPI movement.`,
    overviewMid: (t) =>
      `Standout ${t} candidates cite constraints, stakeholders, and before/after operational outcomes.`,
    responsibilityTemplate: (title, skill) =>
      `Apply ${skill} to plan, execute, or improve workflows expected from a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Connect ${skill} to SLAs, capacity, or cost outcomes you influenced as a ${title}.`,
      (title, skill) =>
        `Reference ${skill} with tools (WMS, ERP, ticketing) and the process you supported.`,
      (title, skill) =>
        `Tie ${skill} to cross-functional handoffs you standardized or accelerated as a ${title}.`,
    ],
    mistakeTemplates: [
      '“Organized” or “multitasked” without throughput, accuracy, or savings numbers.',
      'No mention of vendors, shifts, or sites when scale matters.',
      'Ignoring safety, compliance, or quality when your role touches them.',
      'Buzzword-heavy Lean/Six Sigma claims with no project scope or result.',
    ],
  },
  design: {
    heroTagline: (t) =>
      `Let your ${t} resume reflect craft, constraints, and shipped work—not only aesthetic adjectives.`,
    overviewLead: (t) =>
      `Design hiring teams evaluate ${t} portfolios and resumes for problem framing, iteration, and measurable UX shifts.`,
    overviewMid: (t) =>
      `Strong ${t} resumes cite users researched, patterns tested, and collaboration with eng/PM—not vague “creative thinker.”`,
    responsibilityTemplate: (title, skill) =>
      `Demonstrate ${skill} through shipped artifacts, research, or systems thinking expected of a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Pair ${skill} with the product surface, platform, or brand system you extended as a ${title}.`,
      (title, skill) =>
        `Show ${skill} next to research samples, usability signals, or accessibility choices you defended.`,
      (title, skill) =>
        `Link ${skill} to handoff quality and how engineering shipped your specs as a ${title}.`,
    ],
    mistakeTemplates: [
      'Adjective-heavy summaries with no problem, constraint, or outcome.',
      'Missing tools (Figma, design systems) or design ops practices you actually used.',
      'No hint of users, tests, or metrics—even directional ones.',
      'Portfolio links omitted when the role expects visual proof.',
    ],
  },
  legal: {
    heroTagline: (t) =>
      `Signal jurisdiction, matter types, and client impact on your ${t} resume—precision beats generic “legal professional.”`,
    overviewLead: (t) =>
      `Legal recruiters scanning ${t} profiles want practice area clarity, tools, and matter scale.`,
    overviewMid: (t) =>
      `Effective ${t} resumes balance confidentiality with concrete workflows: drafting, discovery, diligence, or hearings.`,
    responsibilityTemplate: (title, skill) =>
      `Position ${skill} within matters, clients, or risk areas relevant to a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Tie ${skill} to research, drafting, or filings you supported as a ${title}.`,
      (title, skill) =>
        `Reference ${skill} with tools (research databases, CLM, e-discovery) you used credibly.`,
      (title, skill) =>
        `Connect ${skill} to stakeholder management: partners, clients, or regulators.`,
    ],
    mistakeTemplates: [
      'Overbroad “legal research” with no practice area or matter type.',
      'Bar status or jurisdiction missing when required for the role.',
      'Confidentiality used as an excuse for zero substance—use anonymized outcomes.',
      'Typos or inconsistent citation of statutes, courts, or tools.',
    ],
  },
  hospitality: {
    heroTagline: (t) =>
      `Capture guest impact, service standards, and team throughput on your ${t} resume.`,
    overviewLead: (t) =>
      `Hospitality hiring managers weigh ${t} experience by volume handled, service scores, and incident recovery.`,
    overviewMid: (t) =>
      `Winning ${t} resumes mention property type, peak shifts, and training or upsell wins.`,
    responsibilityTemplate: (title, skill) =>
      `Use ${skill} to elevate guest experience or operational flow as a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Link ${skill} to service moments, events, or VIP handling you owned as a ${title}.`,
      (title, skill) =>
        `Show ${skill} with POS, reservations, or kitchen systems when accurate.`,
      (title, skill) =>
        `Tie ${skill} to labor planning, cost controls, or cleanliness scores you influenced.`,
    ],
    mistakeTemplates: [
      '“Customer service” with no volume, ratings, or recovery example.',
      'No property segment (hotel, restaurant, events) or shift context.',
      'Ignoring safety, alcohol service, or compliance training when relevant.',
      'Leadership claims without team size or span details.',
    ],
  },
  trades: {
    heroTagline: (t) =>
      `Lead with licenses, job sites, and safety on your ${t} resume—trades hiring is credential- and scope-first.`,
    overviewLead: (t) =>
      `Forepersons and contractors hiring ${t} workers need tools, codes, and project scale spelled out.`,
    overviewMid: (t) =>
      `Strong ${t} resumes list materials, equipment, and the type of builds or repairs you actually performed.`,
    responsibilityTemplate: (title, skill) =>
      `Apply ${skill} on-site with clear scope, materials, or safety practices as a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Pair ${skill} with tools, lifts, or rigs you operated safely as a ${title}.`,
      (title, skill) =>
        `Reference ${skill} with code, blueprint, or inspection context when true.`,
      (title, skill) =>
        `Connect ${skill} to crews led, subcontractors coordinated, or schedules met.`,
    ],
    mistakeTemplates: [
      'No license, union, or apprenticeship status when gatekeeping.',
      'Missing PPE, safety, or incident-prevention signals.',
      'Vague “construction experience” without trade, structure, or systems.',
      'No mention of prints, permits, or QC steps you followed.',
    ],
  },
  general: {
    heroTagline: (t) =>
      `Make your ${t} resume read like a specialist: concrete tasks, tools, and outcomes tied to this exact title.`,
    overviewLead: (t) =>
      `Recruiters skim ${t} resumes for proof you have done the work—not generic soft skills repeated from other roles.`,
    overviewMid: (t) =>
      `Differentiate your ${t} profile by naming deliverables, stakeholders, and metrics hiring managers can verify quickly.`,
    responsibilityTemplate: (title, skill) =>
      `Show how ${skill} produced results in contexts typical for a ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Anchor ${skill} to projects, customers, or KPIs you influenced as a ${title}.`,
      (title, skill) =>
        `Pair ${skill} with tools or workflows you used weekly as a ${title}.`,
      (title, skill) =>
        `Avoid orphan keywords—explain the decision or output ${skill} enabled for a ${title}.`,
    ],
    mistakeTemplates: [
      'Recycling the same summary structure as unrelated job titles.',
      'Bullets that could apply to any industry with zero domain nouns.',
      'Skills list with no matching achievements on the same page.',
      'Missing numbers where any reasonable candidate would have them.',
    ],
  },
};

const ES: Record<ProfessionCategoryId, CategoryNarrative> = {
  finance: {
    heroTagline: (t) =>
      `Destaca en tu CV de ${t} el cierre contable, los controles y la credibilidad en reporting—no un perfil genérico de “orientación al detalle”.`,
    overviewLead: (t) =>
      `Quienes contratan ${t} buscan evidencia de conciliaciones, exactitud en reportes y documentación lista para auditoría.`,
    overviewMid: (t) =>
      `Los mejores perfiles de ${t} conectan herramientas y palabras clave con resultados: qué cerraste, qué conciliaste y qué validaste para dirección o auditores.`,
    responsibilityTemplate: (title, skill) =>
      `Aplica ${skill} para entregar resultados fiables propios de un puesto de ${title}: reporting, controles o entregables a stakeholders.`,
    skillContextTemplates: [
      (title, skill) =>
        `Muestra ${skill} con artefactos: cuadres, conciliaciones o métricas, no solo la palabra en una lista para roles de ${title}.`,
      (title, skill) =>
        `Une ${skill} al proceso de negocio que apoyaste (cierre, forecast, cumplimiento) como ${title}.`,
      (title, skill) =>
        `Los reclutadores valoran ${skill} cuando mencionas sistemas, cadencia y quién consumió tu entrega como ${title}.`,
    ],
    mistakeTemplates: [
      'Listar ERPs sin decir qué conciliaste, cerraste o auditaste.',
      'Mezclar lenguaje de FP&A con contabilidad transaccional sin dejar clara tu propiedad.',
      'Omitir SOX, controles o apoyo en auditoría si realmente participaste.',
      'Decir “atención al detalle” sin historia de cierre, precisión o varianzas.',
    ],
  },
  engineering: {
    heroTagline: (t) =>
      `Enfoca tu CV de ${t} en sistemas entregados, fiabilidad e impacto medible—no en clichés de “apasionado del código”.`,
    overviewLead: (t) =>
      `Las pantallas técnicas para ${t} premian servicios que poseíste, mejoras de latencia o calidad, y cómo probaste o desplegaste con seguridad.`,
    overviewMid: (t) =>
      `Los CV sólidos de ${t} nombran stack, restricciones y la métrica de negocio o usuario que moviste al entregar.`,
    responsibilityTemplate: (title, skill) =>
      `Aplica ${skill} para diseñar, construir u operar sistemas que se esperan de un ${title}: escala, fiabilidad o impacto en entrega.`,
    skillContextTemplates: [
      (title, skill) =>
        `Ancla ${skill} a repos, servicios o entornos que tocaste, no a un volcado de skills en procesos de ${title}.`,
      (title, skill) =>
        `Une ${skill} a pruebas, revisiones u observabilidad que mantuvieron producción estable como ${title}.`,
      (title, skill) =>
        `Muestra ${skill} junto a APIs, contratos de datos o SLAs de los que fuiste responsable como ${title}.`,
    ],
    mistakeTemplates: [
      'Veinte tecnologías listadas sin profundidad en un sistema que realmente entregaste.',
      'Sin métricas: latencia, errores, adopción, tiempo de ciclo o reducción de incidentes.',
      '“Colaboré con equipos” vago en lugar de arquitectura, APIs o límites de propiedad.',
      'Sin pruebas, monitorización o estrategia de despliegue cuando afirmas impacto senior.',
    ],
  },
  education: {
    heroTagline: (t) =>
      `Resalta impacto curricular, resultados del alumnado y liderazgo en aula en tu CV de ${t}, no solo credenciales.`,
    overviewLead: (t) =>
      `Los centros que contratan ${t} buscan diseño de lecciones, evaluación y colaboración con familias o equipo.`,
    overviewMid: (t) =>
      `Los mejores CV de ${t} muestran alineación con estándares, diferenciación y cómo mediste el aprendizaje.`,
    responsibilityTemplate: (title, skill) =>
      `Demuestra ${skill} con ciclos de lección, evaluaciones o apoyos al estudiante propios de un ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Vincula ${skill} a niveles, materias o programas donde lo aplicaste como ${title}.`,
      (title, skill) =>
        `Usa ${skill} en viñetas sobre ritmo, diferenciación o datos con los que ajustaste la enseñanza como ${title}.`,
      (title, skill) =>
        `Conecta ${skill} con comunicación con familias, IEP/504 o MTSS si aplica a tu trabajo como ${title}.`,
    ],
    mistakeTemplates: [
      'Solo listar materias impartidas sin resultado para el alumnado o método.',
      'Modas pedagógicas sin currículo, herramientas o estándares nombrados.',
      'Omitir gestión de aula o evaluación cuando el rol lo exige.',
      'Ignorar formación, certificaciones o roles de mentoría que diferencian.',
    ],
  },
  healthcare: {
    heroTagline: (t) =>
      `Centra tu CV de ${t} en seguridad del paciente, cumplimiento y flujos clínicos verificables.`,
    overviewLead: (t) =>
      `En salud, quienes revisan CV de ${t} buscan entorno, agudización, protocolos y resultados medibles de atención o throughput.`,
    overviewMid: (t) =>
      `Los perfiles creíbles de ${t} nombran tareas en EMR, certificaciones y coordinación interdisciplinar.`,
    responsibilityTemplate: (title, skill) =>
      `Muestra ${skill} dentro de flujos clínicos, operativos o regulatorios propios de un ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Une ${skill} al tipo de unidad, población o protocolo donde lo usaste como ${title}.`,
      (title, skill) =>
        `Relaciona ${skill} con documentación, traspasos o métricas de calidad que influyeron como ${title}.`,
      (title, skill) =>
        `Conecta ${skill} con formación, auditorías o iniciativas de seguridad si encaja en tu alcance como ${title}.`,
    ],
    mistakeTemplates: [
      'Afirmaciones HIPAA o de seguridad sin contexto de cómo protegiste datos o pacientes.',
      'Sin entorno (consulta, hospital, residencia) o señal de agudización.',
      'Solo soft skills sin procedimientos, equipos o sistemas de historia clínica.',
      'Faltan licencias o certificaciones cuando son filtro del puesto.',
    ],
  },
  sales: {
    heroTagline: (t) =>
      `Abre tu CV de ${t} con pipeline, ingresos y victorias de cuenta—no con clichés de “persona sociable”.`,
    overviewLead: (t) =>
      `Los líderes comerciales que contratan ${t} esperan contexto de cuota, ciclo y prueba de relaciones ampliadas.`,
    overviewMid: (t) =>
      `Los CV de alto valor para ${t} mezclan disciplina en CRM, oficio de prospección y números: cumplimiento, crecimiento o tamaño de acuerdo.`,
    responsibilityTemplate: (title, skill) =>
      `Usa ${skill} para abrir, avanzar o cerrar ingresos como ${title}: segmentos, canales o movimientos comerciales.`,
    skillContextTemplates: [
      (title, skill) =>
        `Adjunta ${skill} a etapas de embudo que moviste y a la métrica que cambió como ${title}.`,
      (title, skill) =>
        `Muestra ${skill} con herramientas (CRM, secuencias, analítica de llamadas) y uso responsable.`,
      (title, skill) =>
        `Vincula ${skill} a descubrimiento, negociación o retención relevante para compradores de tu rol como ${title}.`,
    ],
    mistakeTemplates: [
      '“Superé expectativas” sin cuota, porcentaje o contexto de ingresos.',
      'Listar metodologías de ventas sin prueba de ejecución de punta a punta.',
      'Ignorar tamaño de cuenta, segmento o complejidad media del acuerdo.',
      'Sin precisión en CRM, forecast o socios cross-funcionales.',
    ],
  },
  operations: {
    heroTagline: (t) =>
      `Demuestra en tu CV de ${t} cómo mejoraste throughput, coste o fiabilidad—las operaciones se leen en métricas.`,
    overviewLead: (t) =>
      `Quienes operan ${t} buscan diseño de proceso, coordinación con proveedores o planta y movimiento de KPIs.`,
    overviewMid: (t) =>
      `Los candidatos destacados en ${t} citan restricciones, stakeholders y resultados operativos antes/después.`,
    responsibilityTemplate: (title, skill) =>
      `Aplica ${skill} para planificar, ejecutar o mejorar flujos de trabajo esperados de un ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Conecta ${skill} con SLA, capacidad o coste que influyeron como ${title}.`,
      (title, skill) =>
        `Menciona ${skill} con herramientas (WMS, ERP, ticketing) y el proceso apoyado.`,
      (title, skill) =>
        `Une ${skill} a traspasos cross-funcionales que estandarizaste o aceleraste como ${title}.`,
    ],
    mistakeTemplates: [
      '“Organizado” o “multitarea” sin throughput, precisión o ahorro.',
      'Sin proveedores, turnos o sedes cuando la escala importa.',
      'Ignorar seguridad, cumplimiento o calidad si tu rol los toca.',
      'Lean/Six Sigma de palabra sin alcance o resultado de proyecto.',
    ],
  },
  design: {
    heroTagline: (t) =>
      `Que tu CV de ${t} refleje oficio, restricciones y trabajo publicado—no solo adjetivos estéticos.`,
    overviewLead: (t) =>
      `Los equipos de diseño evalúan CV de ${t} por formulación del problema, iteración y cambios medibles de UX.`,
    overviewMid: (t) =>
      `Los CV fuertes de ${t} citan usuarios investigados, patrones probados y colaboración con ingeniería/PM.`,
    responsibilityTemplate: (title, skill) =>
      `Demuestra ${skill} con artefactos publicados, investigación o pensamiento sistémico propio de un ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Une ${skill} a la superficie de producto, plataforma o sistema de marca que extendiste como ${title}.`,
      (title, skill) =>
        `Muestra ${skill} junto a señales de usabilidad o decisiones de accesibilidad que defendiste.`,
      (title, skill) =>
        `Vincula ${skill} a la calidad del handoff y cómo ingeniería implementó tus especificaciones como ${title}.`,
    ],
    mistakeTemplates: [
      'Resumen lleno de adjetivos sin problema, restricción o resultado.',
      'Faltan herramientas (Figma, design systems) o prácticas de design ops.',
      'Sin usuarios, pruebas o métricas, aunque sean orientativas.',
      'Sin enlaces a portfolio cuando el rol exige prueba visual.',
    ],
  },
  legal: {
    heroTagline: (t) =>
      `Señala jurisdicción, tipo de asuntos e impacto para clientes en tu CV de ${t}.`,
    overviewLead: (t) =>
      `Los reclutadores legales que buscan ${t} quieren claridad de práctica, herramientas y escala de asuntos.`,
    overviewMid: (t) =>
      `Los CV eficaces de ${t} equilibran confidencialidad con flujos concretos: redacción, discovery, diligencia o vistas.`,
    responsibilityTemplate: (title, skill) =>
      `Sitúa ${skill} dentro de asuntos, clientes o riesgos relevantes para un ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Une ${skill} a investigación, redacción o presentaciones que apoyaste como ${title}.`,
      (title, skill) =>
        `Menciona ${skill} con bases de datos, CLM o e-discovery que usaste con rigor.`,
      (title, skill) =>
        `Conecta ${skill} con gestión de socios, clientes o reguladores.`,
    ],
    mistakeTemplates: [
      '“Investigación legal” demasiado amplia sin área ni tipo de asunto.',
      'Falta estado de colegiación o jurisdicción cuando es requisito.',
      'Confidencialidad como excusa para cero sustancia—usa resultados anonimizados.',
      'Errores tipográficos o inconsistencia al citar normas, tribunales o herramientas.',
    ],
  },
  hospitality: {
    heroTagline: (t) =>
      `Captura impacto en huéspedes, estándares de servicio y rendimiento del equipo en tu CV de ${t}.`,
    overviewLead: (t) =>
      `En hostelería, quienes contratan ${t} valoran volumen atendido, puntuaciones y recuperación de incidencias.`,
    overviewMid: (t) =>
      `Los CV ganadores de ${t} mencionan tipo de establecimiento, turnos punta y logros de formación o upsell.`,
    responsibilityTemplate: (title, skill) =>
      `Usa ${skill} para elevar la experiencia del huésped o el flujo operativo como ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Vincula ${skill} a momentos de servicio, eventos o atención VIP que lideraste como ${title}.`,
      (title, skill) =>
        `Muestra ${skill} con TPV, reservas o cocina cuando sea cierto.`,
      (title, skill) =>
        `Une ${skill} a planificación de plantilla, costes o puntuaciones de limpieza.`,
    ],
    mistakeTemplates: [
      '“Atención al cliente” sin volumen, valoraciones o recuperación de fallos.',
      'Sin segmento (hotel, restaurante, eventos) ni contexto de turno.',
      'Ignorar seguridad, alcohol o formación de cumplimiento si aplica.',
      'Liderazgo sin tamaño de equipo ni alcance.',
    ],
  },
  trades: {
    heroTagline: (t) =>
      `Encabeza con licencias, obra y seguridad en tu CV de ${t}: en oficios priman credencial y alcance.`,
    overviewLead: (t) =>
      `Capataces y contratas que buscan ${t} necesitan herramientas, códigos y escala de proyecto claros.`,
    overviewMid: (t) =>
      `Los CV sólidos de ${t} listan materiales, equipos y tipos de obra o reparación realizados.`,
    responsibilityTemplate: (title, skill) =>
      `Aplica ${skill} en obra con alcance claro, materiales o prácticas de seguridad como ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Une ${skill} a herramientas, plataformas elevadoras o equipos que operaste con seguridad como ${title}.`,
      (title, skill) =>
        `Menciona ${skill} con códigos, planos o inspecciones cuando sea veraz.`,
      (title, skill) =>
        `Conecta ${skill} con cuadrillas lideradas, subcontratas coordinadas o plazos cumplidos.`,
    ],
    mistakeTemplates: [
      'Sin licencia, sindicato o aprendizaje cuando es filtro.',
      'Sin señales de EPP, seguridad o prevención de incidentes.',
      '“Experiencia en construcción” vaga sin oficio, estructura o sistemas.',
      'Sin mención de planos, permisos o pasos de QC que seguiste.',
    ],
  },
  general: {
    heroTagline: (t) =>
      `Haz que tu CV de ${t} suene a especialista: tareas, herramientas y resultados ligados a este título concreto.`,
    overviewLead: (t) =>
      `Los reclutadores escanean CV de ${t} buscando prueba de que hiciste el trabajo, no soft skills genéricas de otros roles.`,
    overviewMid: (t) =>
      `Diferencia tu perfil de ${t} nombrando entregables, stakeholders y métricas que un hiring manager pueda contrastar rápido.`,
    responsibilityTemplate: (title, skill) =>
      `Muestra cómo ${skill} generó resultados en contextos típicos de un ${title}.`,
    skillContextTemplates: [
      (title, skill) =>
        `Ancla ${skill} a proyectos, clientes o KPIs que moviste como ${title}.`,
      (title, skill) =>
        `Une ${skill} a herramientas o flujos que usaste semanalmente como ${title}.`,
      (title, skill) =>
        `Evita palabras sueltas: explica la decisión o entrega que habilitó ${skill} en un rol de ${title}.`,
    ],
    mistakeTemplates: [
      'Reutilizar la misma estructura de resumen que para títulos no relacionados.',
      'Viñetas que podrían aplicar a cualquier sector sin sustantivos de dominio.',
      'Lista de skills sin logros que las respalden en la misma página.',
      'Faltan cifras cuando cualquier candidato razonable las tendría.',
    ],
  },
};

export function getProfessionCategoryNarrative(
  categoryId: ProfessionCategoryId,
  lang: Lang
): CategoryNarrative {
  return lang === 'es' ? ES[categoryId] : EN[categoryId];
}
