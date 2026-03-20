import type { SkillEsData } from './index';

export const translations: Record<string, SkillEsData> = {
  'amazon-web-services': {
    slug: 'amazon-web-services',
    title: 'Amazon Web Services (AWS)',
    description: `Amazon Web Services es la plataforma de nube más completa y ampliamente adoptada del mundo, ofreciendo más de 200 servicios totalmente gestionados desde centros de datos a nivel global. AWS proporciona recursos de cómputo bajo demanda que incluyen computación, almacenamiento, bases de datos, redes, machine learning, analítica y servicios de IoT. Organizaciones de todos los tamaños e industrias confían en AWS para impulsar su infraestructura, reducir costos y acelerar la innovación.\n\nAWS opera con un modelo de precios de pago por uso y abarca 33 regiones geográficas con 105 zonas de disponibilidad. Los servicios principales incluyen EC2 para servidores virtuales, S3 para almacenamiento de objetos, RDS para bases de datos gestionadas, Lambda para computación serverless y VPC para aislamiento de red. AWS también lidera en áreas avanzadas como IA generativa con Amazon Bedrock y SageMaker.\n\nLa competencia en AWS implica comprender el modelo de responsabilidad compartida, diseñar para alta disponibilidad, implementar mejores prácticas de seguridad con políticas IAM y aprovechar servicios gestionados para reducir la carga operativa. Las certificaciones de AWS como Solutions Architect, Developer y SysOps Administrator están entre las credenciales más buscadas en la industria de la nube.`,
    whyImportant: `AWS tiene aproximadamente el 31% del mercado global de infraestructura en la nube, siendo la plataforma dominante que la mayoría de las empresas utilizan como proveedor de nube principal o secundario. Los profesionales con habilidades en AWS están consistentemente entre los mejor pagados en TI, con certificaciones de AWS correlacionadas con incrementos salariales del 20-30%.\n\nA medida que las organizaciones aceleran la migración a la nube y las iniciativas de transformación digital, la experiencia en AWS permite a los equipos construir arquitecturas escalables, resilientes y rentables. Comprender AWS es fundamental para roles modernos de DevOps, ingeniería de datos, machine learning y desarrollo de aplicaciones.`,
    keywords: ['habilidades en AWS', 'currículum Amazon Web Services', 'ingeniero de nube AWS', 'certificación AWS'],
    searchIntents: ['cómo incluir habilidades de AWS en el currículum', 'habilidades de AWS para trabajos de ingeniero de nube', 'mejores certificaciones de AWS para el crecimiento profesional'],
    relatedSkills: ['Terraform', 'Kubernetes', 'Docker', 'CloudFormation', 'Administración Linux', 'Infraestructura como Código', 'Computación Serverless', 'Optimización de Costos en la Nube'],
    professionSlugs: ['ingeniero-de-nube', 'arquitecto-de-nube', 'ingeniero-devops', 'arquitecto-de-soluciones', 'ingeniero-de-aws', 'ingeniero-de-confiabilidad-de-sitios'],
    atsKeywords: ['AWS', 'Amazon Web Services', 'EC2', 'S3', 'Lambda', 'CloudFormation', 'IAM', 'VPC', 'RDS', 'ECS', 'EKS', 'Route 53'],
    resumeTips: [
      'Especifica con qué servicios de AWS tienes experiencia en producción en lugar de listar AWS de forma genérica',
      'Incluye tu nivel de certificación de AWS y el año obtenido',
      'Cuantifica la escala de infraestructura como número de instancias EC2, volúmenes de datos en S3 o gasto mensual en AWS gestionado',
      'Destaca logros en optimización de costos con ahorros específicos en dólares',
      'Menciona arquitecturas multi-región o multi-cuenta que hayas diseñado o mantenido'
    ],
    exampleBullets: [
      'Diseñé infraestructura AWS multi-región soportando 12M de usuarios activos diarios con 99.99% de disponibilidad en 3 zonas de disponibilidad',
      'Reduje el gasto mensual en AWS en un 38% ($145K/mes) mediante Instancias Reservadas, Savings Plans y right-sizing de más de 200 instancias EC2',
      'Migré 45 aplicaciones on-premise a AWS en 8 meses, reduciendo costos de infraestructura en $1.2M anuales',
      'Implementé pipeline de eventos basado en AWS Lambda procesando 5M de eventos/día con latencia promedio inferior a 120ms',
      'Diseñé marco de políticas IAM en 15 cuentas de AWS sirviendo a más de 300 desarrolladores con cero incidentes de seguridad en 2 años'
    ],
    faqs: [
      { question: '¿Qué servicios de AWS debo aprender primero?', answer: 'Comienza con los servicios principales: EC2 (cómputo), S3 (almacenamiento), VPC (redes), IAM (seguridad) y RDS (bases de datos). Estos forman la base de la mayoría de las arquitecturas AWS y aparecen en prácticamente todas las descripciones de trabajo de AWS. Una vez que te sientas cómodo, expande hacia Lambda, CloudFormation, ECS/EKS y CloudWatch.' },
      { question: '¿Vale la pena la certificación de AWS para mi currículum?', answer: 'Sí. Las certificaciones de AWS son ampliamente reconocidas y señalan competencia verificada para reclutadores y gerentes de contratación. Solutions Architect Associate es el punto de partida más popular. Los estudios muestran consistentemente que los profesionales certificados ganan entre 20-30% más que sus pares no certificados en roles equivalentes.' },
      { question: '¿Cómo demuestro habilidades en AWS sin experiencia profesional?', answer: 'Construye proyectos reales usando el AWS Free Tier, que proporciona 12 meses de uso limitado gratuito. Documenta tus arquitecturas, despliega aplicaciones y compártelas en GitHub. Obtener una certificación de AWS también demuestra compromiso y conocimiento sin requerir experiencia basada en un empleador.' }
    ]
  },
  'microsoft-azure': {
    slug: 'microsoft-azure',
    title: 'Microsoft Azure',
    description: `Microsoft Azure es la segunda plataforma de computación en la nube más grande del mundo, ofreciendo más de 200 productos y servicios para construir, desplegar y gestionar aplicaciones a través de la red mundial de centros de datos de Microsoft. Azure se integra profundamente con el ecosistema empresarial de Microsoft incluyendo Active Directory, Office 365, Dynamics 365 y Power Platform, convirtiéndolo en la opción preferida para organizaciones fuertemente invertidas en tecnologías Microsoft.\n\nAzure proporciona servicios de cómputo como Virtual Machines y App Service, almacenamiento mediante Blob Storage y Azure Files, bases de datos incluyendo Azure SQL y Cosmos DB, y capacidades de IA/ML a través de Azure AI Services y Azure OpenAI Service. Azure DevOps ofrece un conjunto completo de herramientas CI/CD, mientras que Azure Kubernetes Service simplifica la orquestación de contenedores a escala.\n\nTrabajar efectivamente con Azure requiere comprender su modelo de gestión de recursos (suscripciones, grupos de recursos y recursos), Azure Active Directory para gestión de identidades, Azure Policy para gobernanza y herramientas de gestión de costos. Las certificaciones de Azure como AZ-900 (Fundamentals), AZ-104 (Administrator) y AZ-305 (Solutions Architect) validan la competencia en diferentes niveles.`,
    whyImportant: `Azure tiene aproximadamente el 24% de la cuota del mercado global de la nube y es la plataforma de nube de mayor crecimiento entre las principales. Su profunda integración con herramientas empresariales de Microsoft significa que las organizaciones que ejecutan Windows Server, SQL Server o Active Directory pueden migrar a Azure con fricción mínima, impulsando una adopción empresarial masiva.\n\nPara profesionales de TI, las habilidades en Azure abren puertas a un vasto ecosistema de clientes empresariales. La estrategia de nube híbrida de Microsoft con Azure Arc y Azure Stack también hace que las habilidades en Azure sean relevantes para organizaciones que mantienen infraestructura on-premises junto con recursos en la nube.`,
    keywords: ['habilidades en Microsoft Azure', 'currículum de nube Azure', 'certificación Azure', 'ingeniero Azure'],
    searchIntents: ['cómo agregar habilidades de Azure al currículum', 'Azure vs AWS para la carrera', 'mejores certificaciones de Azure'],
    relatedSkills: ['Amazon Web Services', 'Terraform', 'Kubernetes', 'Windows Server', 'Gestión de Identidad y Acceso', 'Infraestructura como Código', 'Docker', 'Fundamentos de Redes'],
    professionSlugs: ['ingeniero-de-nube', 'arquitecto-de-nube', 'ingeniero-devops', 'arquitecto-de-soluciones', 'administrador-de-sistemas', 'ingeniero-de-infraestructura'],
    atsKeywords: ['Microsoft Azure', 'Azure', 'Azure DevOps', 'Azure AD', 'Entra ID', 'Azure Virtual Machines', 'Azure Kubernetes Service', 'AKS', 'Cosmos DB', 'Azure SQL', 'ARM templates', 'Bicep'],
    resumeTips: [
      'Lista los servicios específicos de Azure y tu nivel de experiencia con cada uno',
      'Referencia los nombres de las certificaciones de Azure y las fechas obtenidas',
      'Cuantifica las cargas de trabajo gestionadas como número de VMs, volúmenes de almacenamiento o usuarios soportados',
      'Destaca la experiencia en nube híbrida con Azure Arc o Azure Stack si aplica',
      'Menciona los pipelines de Azure DevOps y marcos de gobernanza que hayas implementado'
    ],
    exampleBullets: [
      'Gestioné un entorno Azure abarcando 8 suscripciones con más de 500 recursos y $280K de gasto mensual para una organización de 2,000 empleados',
      'Migré 60 cargas de trabajo on-premises de Windows Server a Azure VMs y App Services, reduciendo la huella del centro de datos en un 70%',
      'Implementé políticas de Acceso Condicional de Azure AD para 5,000 usuarios, reduciendo incidentes de acceso no autorizado en un 92%',
      'Construí pipelines CI/CD en Azure DevOps desplegando 25 microservicios en 3 ambientes con releases sin tiempo de inactividad',
      'Optimicé la estrategia de particionamiento de Azure Cosmos DB, reduciendo la latencia de consultas en un 65% y los costos mensuales en $18K'
    ],
    faqs: [
      { question: '¿Debo aprender Azure o AWS?', answer: 'Ambas son excelentes opciones. Si tus empleadores objetivo usan principalmente tecnologías Microsoft (Active Directory, Windows Server, SQL Server, Office 365), Azure es la opción más fuerte. AWS tiene una cuota de mercado mayor y más herramientas de terceros. Idealmente, aprende una a profundidad y familiarízate con la otra, ya que las habilidades multi-nube son cada vez más valoradas.' },
      { question: '¿Con qué certificación de Azure debo comenzar?', answer: 'Comienza con AZ-900 (Azure Fundamentals) para construir una base sólida. Luego busca AZ-104 (Azure Administrator) para roles de operaciones o AZ-204 (Azure Developer) para posiciones enfocadas en desarrollo. AZ-305 (Solutions Architect Expert) es la credencial premium para roles senior.' },
      { question: '¿Cómo se integra Azure con flujos de trabajo DevOps?', answer: 'Azure DevOps proporciona una suite completa que incluye Azure Repos (Git), Azure Pipelines (CI/CD), Azure Boards (seguimiento de proyectos), Azure Test Plans y Azure Artifacts. Además, Azure se integra con GitHub Actions, Terraform y otras herramientas de terceros para flujos de trabajo DevOps flexibles.' }
    ]
  },
  'google-cloud-platform': {
    slug: 'google-cloud-platform',
    title: 'Google Cloud Platform (GCP)',
    description: `Google Cloud Platform es la suite de servicios de computación en la nube de Google que opera sobre la misma infraestructura que impulsa Google Search, YouTube y Gmail. GCP se diferencia a través de su liderazgo en analítica de datos con BigQuery, machine learning con Vertex AI y orquestación de contenedores con Google Kubernetes Engine, que se beneficia de la creación de Kubernetes por parte de Google.\n\nLos servicios clave de GCP incluyen Compute Engine para VMs, Cloud Storage para almacenamiento de objetos, Cloud SQL y Spanner para bases de datos relacionales, Cloud Functions para computación serverless y Cloud Run para aplicaciones en contenedores. La red de fibra global de GCP proporciona una latencia excepcionalmente baja, y su compromiso con tecnologías de código abierto como Kubernetes, TensorFlow y Knative atrae a organizaciones enfocadas en ingeniería.\n\nLa competencia en GCP implica comprender su jerarquía de recursos (organizaciones, carpetas, proyectos), IAM con control de acceso granular basado en roles, redes VPC y el CLI gcloud. Las certificaciones de Google Cloud como Associate Cloud Engineer, Professional Cloud Architect y Professional Data Engineer validan la experiencia en competencias clave.`,
    whyImportant: `Google Cloud tiene aproximadamente el 11% del mercado de la nube y está creciendo rápidamente, particularmente en analítica de datos, IA/ML y despliegues de Kubernetes multi-nube. Muchas empresas intensivas en datos y startups eligen GCP por el rendimiento analítico incomparable de BigQuery y la plataforma integrada de ML de Vertex AI.\n\nLas habilidades en GCP son particularmente valiosas para ingeniería de datos, machine learning y entornos con uso intensivo de Kubernetes. A medida que las estrategias multi-nube se vuelven estándar, los profesionales que pueden trabajar con GCP junto con AWS o Azure obtienen compensaciones premium.`,
    keywords: ['habilidades en Google Cloud Platform', 'currículum GCP', 'certificación GCP', 'ingeniero Google Cloud'],
    searchIntents: ['cómo incluir habilidades de GCP en el currículum', 'habilidades de GCP para ingenieros de datos', 'ruta de certificación Google Cloud'],
    relatedSkills: ['Amazon Web Services', 'Microsoft Azure', 'Kubernetes', 'Terraform', 'Docker', 'Infraestructura como Código', 'Computación Serverless', 'Contenedorización'],
    professionSlugs: ['ingeniero-de-nube', 'arquitecto-de-nube', 'ingeniero-de-google-cloud', 'ingeniero-de-datos', 'ingeniero-devops', 'arquitecto-de-soluciones'],
    atsKeywords: ['Google Cloud Platform', 'GCP', 'BigQuery', 'GKE', 'Cloud Run', 'Compute Engine', 'Cloud Storage', 'Vertex AI', 'Cloud Functions', 'Pub/Sub', 'Cloud SQL'],
    resumeTips: [
      'Especifica los servicios de GCP usados en producción y la escala de tus despliegues',
      'Destaca experiencia con BigQuery o Vertex AI si apuntas a roles de datos o ML',
      'Incluye nombres de certificaciones de Google Cloud y fechas de vencimiento',
      'Menciona tamaños de clústeres GKE y cargas de trabajo gestionadas',
      'Cuantifica volúmenes de procesamiento de datos manejados a través de servicios de GCP'
    ],
    exampleBullets: [
      'Construí pipeline de analítica en tiempo real en GCP procesando 2TB diarios usando Pub/Sub, Dataflow y BigQuery, entregando dashboards con latencia menor a 5s',
      'Gestioné 15 clústeres GKE ejecutando más de 400 pods sirviendo 8M de solicitudes/hora con 99.95% de disponibilidad',
      'Reduje costos de data warehouse en un 45% ($62K/año) migrando de Hadoop on-premise a BigQuery con particionamiento optimizado',
      'Desplegué modelos de ML en Vertex AI sirviendo 50K predicciones/minuto con pipelines de reentrenamiento automatizado'
    ],
    faqs: [
      { question: '¿Qué diferencia a GCP de AWS y Azure?', answer: 'GCP sobresale en analítica de datos (BigQuery es considerado el mejor en su clase), IA/ML (integración profunda con TensorFlow y Vertex AI) y Kubernetes (Google inventó Kubernetes y GKE es altamente valorado). GCP también ofrece un modelo de precios más simple y una red global superior. AWS lidera en amplitud de servicios, mientras que Azure lidera en integración empresarial con Microsoft.' },
      { question: '¿Qué certificación de GCP debo obtener primero?', answer: 'La certificación Associate Cloud Engineer es el punto de partida recomendado. Cubre despliegue de aplicaciones, monitoreo de operaciones y gestión de soluciones empresariales en GCP. Desde allí, busca Professional Cloud Architect para roles de diseño o Professional Data Engineer para carreras enfocadas en datos.' },
      { question: '¿Está creciendo GCP lo suficiente para invertir en mi carrera?', answer: 'Sí. GCP es el proveedor de nube principal de mayor crecimiento porcentual y está siendo adoptado por un número creciente de empresas. Compañías como Spotify, Twitter, PayPal y Target operan en GCP. La creciente demanda de ingeniería de datos y ML fortalece aún más las perspectivas de carrera en GCP.' }
    ]
  },
  'docker': {
    slug: 'docker',
    title: 'Docker',
    description: `Docker es una plataforma de código abierto que automatiza el despliegue, escalado y gestión de aplicaciones usando contenedorización. Los contenedores empaquetan una aplicación con todas sus dependencias, bibliotecas y archivos de configuración en una unidad portátil única que se ejecuta consistentemente en cualquier entorno, desde la laptop de un desarrollador hasta servidores de producción.\n\nLos componentes principales de Docker incluyen Docker Engine (runtime), Docker CLI (interfaz de línea de comandos), Dockerfiles (instrucciones de construcción), Docker Compose (orquestación multi-contenedor) y Docker Hub (registro público de contenedores). Las imágenes de Docker se construyen en capas usando un sistema de archivos de unión, permitiendo almacenamiento eficiente, construcciones rápidas mediante caché de capas y tamaños de imagen pequeños cuando se optimizan correctamente.\n\nLa experiencia moderna en Docker incluye escribir Dockerfiles de grado de producción con multi-stage builds, implementar mejores prácticas de seguridad como ejecutar como usuarios no-root, escanear imágenes para vulnerabilidades, gestionar redes y volúmenes de Docker, e integrar Docker en pipelines CI/CD. Docker Desktop proporciona una experiencia de desarrollo local en Windows y macOS, mientras que Docker Engine se ejecuta nativamente en Linux.`,
    whyImportant: `Docker revolucionó la entrega de software resolviendo el problema de "funciona en mi máquina" y se ha convertido en el estándar de facto para empaquetado de aplicaciones. Más del 80% de las organizaciones usan contenedores en producción, y las habilidades en Docker son requeridas o preferidas en la gran mayoría de las ofertas de trabajo de DevOps, backend e ingeniería de plataforma.\n\nLa contenedorización con Docker permite ciclos de desarrollo más rápidos, entornos consistentes entre equipos, utilización eficiente de recursos y escalado más simple. Docker es también la base para plataformas de orquestación de contenedores como Kubernetes, convirtiéndolo en una habilidad prerrequisito esencial para el desarrollo cloud-native.`,
    keywords: ['habilidades en Docker', 'currículum Docker', 'contenedorización Docker', 'Docker para DevOps'],
    searchIntents: ['cómo incluir Docker en el currículum', 'habilidades de Docker necesarias para trabajos DevOps', 'mejores prácticas de Docker para currículum'],
    relatedSkills: ['Kubernetes', 'Contenedorización', 'Docker', 'CI/CD', 'Arquitectura de Microservicios', 'Administración Linux', 'Helm', 'Jenkins'],
    professionSlugs: ['ingeniero-devops', 'desarrollador-backend', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-software', 'desarrollador-full-stack'],
    atsKeywords: ['Docker', 'Dockerfile', 'Docker Compose', 'containers', 'containerization', 'Docker Hub', 'container images', 'multi-stage builds', 'Docker Swarm', 'container registry', 'OCI'],
    resumeTips: [
      'Especifica si has escrito Dockerfiles, gestionado registros u orquestado aplicaciones multi-contenedor',
      'Menciona técnicas de optimización de imágenes que hayas aplicado como multi-stage builds',
      'Cuantifica el número de servicios contenedorizados y entornos que gestionas',
      'Destaca prácticas de seguridad de Docker como escaneo de imágenes y contenedores no-root',
      'Referencia el uso de Docker Compose para entornos de desarrollo local y pruebas'
    ],
    exampleBullets: [
      'Contenedoricé más de 30 microservicios usando multi-stage Docker builds, reduciendo el tamaño promedio de imagen en un 72% de 1.2GB a 340MB',
      'Implementé pipeline CI/CD basado en Docker reduciendo tiempos de build de 25 minutos a 8 minutos mediante caché de capas optimizado',
      'Diseñé configuraciones de Docker Compose permitiendo a 50 desarrolladores levantar entornos locales completos en menos de 3 minutos',
      'Establecí escaneo de seguridad de contenedores con Trivy en pipelines CI, identificando y remediando más de 150 vulnerabilidades antes de producción'
    ],
    faqs: [
      { question: '¿Necesito habilidades en Docker para un rol DevOps?', answer: 'Sí, Docker es considerado una habilidad central de DevOps. Casi todas las ofertas de trabajo de DevOps modernas mencionan contenedores, y Docker es la tecnología de contenedores más utilizada. Incluso si una organización usa Podman u otro runtime, el conocimiento de Docker se transfiere directamente.' },
      { question: '¿Qué tan detalladas deben ser las habilidades de Docker en mi currículum?', answer: 'Ve más allá de solo listar "Docker". Especifica tu profundidad: escribir Dockerfiles optimizados, gestionar registros privados, implementar escaneo de seguridad, Docker Compose para configuraciones multi-servicio e integrar contenedores en CI/CD. Cuantifica conteos de contenedores y mejoras de rendimiento.' },
      { question: '¿Debo aprender Docker antes de Kubernetes?', answer: 'Absolutamente. Docker te enseña los fundamentos de contenedores: construir imágenes, gestionar contenedores, redes y volúmenes. Kubernetes orquesta contenedores a escala pero asume que entiendes la contenedorización. Aprender Docker primero proporciona la base que hace que Kubernetes sea mucho más fácil de comprender.' }
    ]
  },
  'kubernetes': {
    slug: 'kubernetes',
    title: 'Kubernetes',
    description: `Kubernetes (K8s) es una plataforma de orquestación de contenedores de código abierto desarrollada originalmente por Google y ahora mantenida por la Cloud Native Computing Foundation. Automatiza el despliegue, escalado y gestión de aplicaciones contenedorizadas en clústeres de máquinas, proporcionando características como auto-recuperación, auto-escalado horizontal, actualizaciones progresivas, descubrimiento de servicios, balanceo de carga y gestión de secretos.\n\nLa arquitectura de Kubernetes consiste en un plano de control (API server, scheduler, controller manager, etcd) y nodos de trabajo que ejecutan el kubelet y el runtime de contenedores. Las abstracciones clave incluyen Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, StatefulSets, DaemonSets y Namespaces. Los servicios gestionados de Kubernetes como EKS (AWS), AKS (Azure) y GKE (Google Cloud) simplifican las operaciones de clúster.\n\nLas habilidades avanzadas de Kubernetes incluyen implementar políticas RBAC, configurar cuotas de recursos y rangos de límites, establecer Horizontal y Vertical Pod Autoscalers, gestionar almacenamiento persistente con StorageClasses y PersistentVolumeClaims, implementar políticas de red, usar Helm para gestión de paquetes y operar service meshes como Istio para gestión de tráfico.`,
    whyImportant: `Kubernetes se ha convertido en el estándar de la industria para orquestación de contenedores, con más del 96% de las organizaciones usándolo o evaluándolo. Permite a las organizaciones ejecutar aplicaciones a escala masiva con alta disponibilidad mientras mantienen consistencia operativa entre proveedores de nube e infraestructura on-premises.\n\nLas habilidades en Kubernetes demandan salarios premium, con profesionales certificados en Kubernetes (CKA, CKAD) ganando 15-25% más que sus pares. A medida que las arquitecturas cloud-native se convierten en la norma, la experiencia en Kubernetes es esencial para ingenieros DevOps, ingenieros de plataforma, SREs y arquitectos de nube.`,
    keywords: ['habilidades en Kubernetes', 'currículum K8s', 'certificación Kubernetes', 'orquestación de contenedores'],
    searchIntents: ['cómo poner Kubernetes en el currículum', 'habilidades de Kubernetes para DevOps', '¿vale la pena la certificación CKA?'],
    relatedSkills: ['Docker', 'Helm', 'Istio', 'Prometheus', 'Terraform', 'Contenedorización', 'Arquitectura de Microservicios', 'Service Mesh', 'Argo CD'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'arquitecto-de-nube'],
    atsKeywords: ['Kubernetes', 'K8s', 'kubectl', 'Helm', 'container orchestration', 'EKS', 'AKS', 'GKE', 'Pods', 'Deployments', 'Services', 'Ingress'],
    resumeTips: [
      'Especifica tamaños de clúster y cargas de trabajo gestionadas incluyendo conteo de pods y nodos',
      'Menciona con qué servicio gestionado de Kubernetes tienes experiencia (EKS, AKS, GKE)',
      'Lista certificaciones de Kubernetes como CKA, CKAD o CKS con fechas',
      'Destaca conceptos avanzados como RBAC, políticas de red y configuraciones de auto-escalado',
      'Cuantifica mejoras de disponibilidad y confiabilidad logradas a través de despliegues en Kubernetes'
    ],
    exampleBullets: [
      'Gestioné 20 clústeres Kubernetes con un total de más de 500 nodos y 3,000 pods en AWS EKS, manejando 15M de solicitudes/hora',
      'Implementé Horizontal Pod Autoscaler reduciendo el sobre-aprovisionamiento en un 40% y ahorrando $95K anuales en costos de cómputo',
      'Diseñé plataforma Kubernetes multi-tenant con RBAC y políticas de red sirviendo a 12 equipos de producto con aislamiento completo',
      'Logré un 99.99% de tasa de éxito en despliegues en más de 200 releases semanales usando estrategias de rolling update y rollbacks automatizados',
      'Lideré migración a Kubernetes desde Docker Swarm para 50 microservicios, mejorando la frecuencia de despliegue de semanal a más de 20 veces diarias'
    ],
    faqs: [
      { question: '¿Es Kubernetes necesario para todos los roles DevOps?', answer: 'Aunque no todo rol DevOps requiere Kubernetes, aparece en la mayoría de las descripciones de trabajo DevOps de nivel medio a senior. Las organizaciones que ejecutan microservicios a escala usan Kubernetes casi universalmente. Incluso si un rol específico no lo requiere, el conocimiento de Kubernetes demuestra una fuerte experiencia cloud-native.' },
      { question: '¿Debo obtener la certificación CKA o CKAD?', answer: 'CKA (Certified Kubernetes Administrator) es mejor para roles de operaciones e infraestructura, cubre configuración de clústeres, resolución de problemas, redes y seguridad. CKAD (Certified Kubernetes Application Developer) es ideal para desarrolladores que despliegan aplicaciones en Kubernetes. Muchos profesionales obtienen ambas, comenzando con la que más se alinee con su rol actual.' },
      { question: '¿Cuánto tiempo toma aprender Kubernetes lo suficiente para un trabajo?', answer: 'Con fundamentos sólidos de Docker y Linux, espera 2-3 meses de estudio dedicado y práctica hands-on para estar listo para un trabajo. Usa herramientas como Minikube o Kind para clústeres locales, completa el currículum de CKA y construye proyectos reales. La experiencia a nivel de producción típicamente se desarrolla en 6-12 meses de uso profesional.' }
    ]
  },
  'terraform': {
    slug: 'terraform',
    title: 'Terraform',
    description: `Terraform es una herramienta de infraestructura como código de código abierto creada por HashiCorp que te permite definir, aprovisionar y gestionar infraestructura en la nube usando un lenguaje de configuración declarativo llamado HCL (HashiCorp Configuration Language). Terraform soporta cientos de proveedores incluyendo AWS, Azure, GCP, Kubernetes y muchas plataformas SaaS, permitiendo a los equipos gestionar todo su stack de infraestructura a través de código.\n\nTerraform funciona manteniendo un archivo de estado que rastrea el estado actual de la infraestructura y lo compara con la configuración deseada para crear un plan de ejecución. Su flujo de trabajo plan-apply permite a los equipos previsualizar cambios antes de aplicarlos, proporcionando seguridad y predictibilidad. Los conceptos clave incluyen proveedores, recursos, fuentes de datos, módulos, variables, outputs, gestión de estado y workspaces.\n\nEl uso avanzado de Terraform incluye escribir módulos reutilizables, implementar backends de estado remoto con bloqueo (S3 + DynamoDB, Azure Blob, GCS), usar Terraform Cloud o Terraform Enterprise para colaboración en equipo, implementar policy-as-code con Sentinel u OPA, estructurar grandes bases de código Terraform con patrones consistentes e integrar Terraform en pipelines CI/CD para despliegue automatizado de infraestructura.`,
    whyImportant: `Terraform es la herramienta de infraestructura como código más ampliamente adoptada, utilizada por más del 80% de las organizaciones que practican IaC. Su enfoque agnóstico de la nube significa que aprender Terraform una vez te permite gestionar infraestructura en cualquier proveedor de nube, a diferencia de herramientas específicas de proveedor como CloudFormation o ARM templates.\n\nLas organizaciones requieren cada vez más que la infraestructura esté versionada, revisada por pares y reproducible, exactamente lo que Terraform permite. La certificación HashiCorp Terraform Associate es una de las credenciales de IaC más reconocidas, y la competencia en Terraform está listada como requisito en la mayoría de las ofertas de trabajo de DevOps e ingeniería de nube.`,
    keywords: ['habilidades en Terraform', 'currículum Terraform', 'infraestructura como código', 'certificación Terraform'],
    searchIntents: ['cómo incluir Terraform en el currículum', 'habilidades de Terraform para DevOps', 'Terraform vs CloudFormation'],
    relatedSkills: ['Infraestructura como Código', 'Amazon Web Services', 'Microsoft Azure', 'Google Cloud Platform', 'Pulumi', 'CloudFormation', 'Ansible', 'Vault'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'arquitecto-de-nube', 'arquitecto-de-soluciones'],
    atsKeywords: ['Terraform', 'HCL', 'infrastructure as code', 'IaC', 'Terraform Cloud', 'Terraform Enterprise', 'HashiCorp', 'tfstate', 'Terraform modules', 'Terraform providers'],
    resumeTips: [
      'Especifica los proveedores de nube y número de recursos gestionados a través de Terraform',
      'Menciona desarrollo de módulos y si has publicado módulos compartidos',
      'Incluye enfoques de gestión de estado como backends remotos y estrategias de workspace',
      'Destaca la integración CI/CD para flujos automatizados de Terraform plan y apply',
      'Referencia certificación de Terraform y experiencia con versiones'
    ],
    exampleBullets: [
      'Gestioné más de 2,000 recursos en la nube en AWS y Azure usando Terraform con cobertura del 100% de infraestructura como código',
      'Construí biblioteca de 25 módulos Terraform reutilizables adoptados por 8 equipos, reduciendo el aprovisionamiento de nuevos entornos de 2 días a 30 minutos',
      'Implementé pipeline CI/CD de Terraform con revisiones de plan automatizadas, reduciendo misconfiguraciones de infraestructura en un 85%',
      'Migré 500 recursos de AWS creados manualmente al estado de Terraform, habilitando control de versiones y rastro de auditoría para todos los cambios de infraestructura'
    ],
    faqs: [
      { question: '¿Es Terraform la mejor herramienta de IaC para aprender?', answer: 'Terraform es la opción más segura para inversión de carrera porque funciona con todos los proveedores principales de nube y tiene la comunidad más grande. CloudFormation es valioso si trabajas exclusivamente con AWS, y Pulumi está creciendo para equipos que prefieren lenguajes de programación de propósito general. La mayoría de las ofertas de trabajo que solicitan habilidades de IaC mencionan específicamente Terraform.' },
      { question: '¿Cómo demuestro experiencia en Terraform en mi currículum?', answer: 'Ve más allá de listar "Terraform" especificando la escala (recursos gestionados, módulos escritos), proveedores usados, enfoque de gestión de estado e integración CI/CD. Menciona si has escrito proveedores o módulos personalizados compartidos entre equipos. Incluye la certificación Terraform Associate si la has obtenido.' },
      { question: '¿Qué debo aprender junto con Terraform?', answer: 'Complementa Terraform con una herramienta de gestión de configuración como Ansible, un gestor de secretos como Vault y habilidades de pipeline CI/CD. Comprender profundamente los proveedores de nube objetivo (AWS, Azure, GCP) es esencial, ya que la efectividad de Terraform depende de comprender los recursos que estás aprovisionando.' }
    ]
  },
  'ansible': {
    slug: 'ansible',
    title: 'Ansible',
    description: `Ansible es una plataforma de automatización de código abierto de Red Hat que simplifica la gestión de configuración, despliegue de aplicaciones, automatización de tareas y orquestación multi-nodo. A diferencia de otras herramientas de gestión de configuración, Ansible no requiere agentes: se comunica por SSH (Linux) o WinRM (Windows), sin necesidad de software instalado en los nodos gestionados. La configuración se escribe en YAML como playbooks y roles.\n\nLa arquitectura de Ansible se centra en un inventario de hosts, playbooks que definen tareas de automatización, módulos que proporcionan funcionalidad lista para usar, roles para contenido de automatización reutilizable y Ansible Galaxy para contenido compartido por la comunidad. Ansible Tower (ahora Automation Platform) agrega una interfaz web, RBAC, programación y registro centralizado para uso empresarial.\n\nEl uso avanzado de Ansible incluye escribir módulos y plugins personalizados, implementar inventarios dinámicos desde proveedores de nube, crear playbooks complejos con lógica condicional y manejo de errores, usar Ansible Vault para gestión de secretos, probar playbooks con Molecule e integrar Ansible en pipelines CI/CD para aprovisionamiento de infraestructura y despliegue de aplicaciones.`,
    whyImportant: `La arquitectura sin agentes de Ansible y su sintaxis basada en YAML lo convierten en la herramienta de gestión de configuración más accesible, con una curva de aprendizaje significativamente menor que Chef o Puppet. Es ampliamente adoptado en empresas para automatizar todo, desde aprovisionamiento de servidores hasta despliegues de aplicaciones y configuración de redes.\n\nA medida que las organizaciones gestionan infraestructura cada vez más compleja, la capacidad de codificar y automatizar tareas repetitivas es crítica. Ansible permite a los equipos mantener configuraciones consistentes en cientos o miles de servidores, reduciendo el error humano y habilitando la recuperación rápida ante desastres.`,
    keywords: ['habilidades en Ansible', 'currículum Ansible', 'gestión de configuración', 'automatización Ansible'],
    searchIntents: ['cómo agregar Ansible al currículum', 'Ansible vs Puppet vs Chef', 'habilidades de Ansible para ingenieros DevOps'],
    relatedSkills: ['Gestión de Configuración', 'Terraform', 'Administración Linux', 'Vagrant', 'Docker', 'Jenkins', 'Vault', 'Infraestructura como Código'],
    professionSlugs: ['ingeniero-devops', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-automatizacion'],
    atsKeywords: ['Ansible', 'Ansible Playbooks', 'Ansible Tower', 'Ansible Automation Platform', 'YAML', 'configuration management', 'Ansible Galaxy', 'Ansible Vault', 'Ansible roles', 'idempotent'],
    resumeTips: [
      'Especifica el número de servidores y entornos gestionados con Ansible',
      'Menciona si has escrito módulos, roles o colecciones personalizadas',
      'Destaca la integración con proveedores de nube para inventarios dinámicos',
      'Incluye experiencia con Ansible Tower o Automation Platform si aplica',
      'Cuantifica ahorros de tiempo de la automatización comparados con procesos manuales'
    ],
    exampleBullets: [
      'Automaticé la gestión de configuración para más de 800 servidores Linux usando playbooks de Ansible, reduciendo incidentes de drift de configuración en un 95%',
      'Desarrollé más de 40 roles de Ansible y publiqué colecciones internas de Galaxy usadas por 6 equipos de operaciones en la organización',
      'Reduje el tiempo de aprovisionamiento de servidores de 4 horas a 15 minutos implementando automatización con Ansible con inventario dinámico de AWS',
      'Implementé pipeline de parcheo dirigido por Ansible aplicando actualizaciones de seguridad a 500 servidores en lotes progresivos con cero tiempo de inactividad'
    ],
    faqs: [
      { question: '¿Ansible sigue siendo relevante teniendo Terraform disponible?', answer: 'Sí, sirven para propósitos diferentes y son altamente complementarios. Terraform sobresale en aprovisionar infraestructura (crear VMs, redes, bases de datos), mientras que Ansible sobresale en configurar lo que se ejecuta en esa infraestructura (instalar paquetes, configurar servicios, desplegar aplicaciones). La mayoría de los equipos DevOps maduros usan ambos juntos.' },
      { question: '¿Cómo se compara Ansible con Chef y Puppet?', answer: 'Ansible no requiere agentes (sin software en nodos gestionados), usa sintaxis YAML simple y tiene la curva de aprendizaje más baja. Chef usa recetas basadas en Ruby que requieren más conocimiento de programación, y Puppet usa su propio lenguaje declarativo. Ansible tiene la comunidad más grande y es el más solicitado en ofertas de trabajo.' },
      { question: '¿Qué habilidades de Ansible son más valoradas por los empleadores?', answer: 'Los empleadores valoran la experiencia escribiendo roles y colecciones reutilizables, gestionando inventarios a gran escala, implementando Ansible Tower/Automation Platform para uso empresarial, integrando Ansible con pipelines CI/CD y usando Ansible Vault para gestión segura de secretos. Demostrar playbooks idempotentes y bien probados es clave.' }
    ]
  },
  'jenkins': {
    slug: 'jenkins',
    title: 'Jenkins',
    description: `Jenkins es un servidor de automatización de código abierto que es la herramienta CI/CD más ampliamente desplegada en el mundo. Permite a los equipos construir, probar y desplegar software continuamente a través de pipelines configurables. Jenkins soporta más de 1,800 plugins proporcionando integraciones con prácticamente toda herramienta del ecosistema de desarrollo de software, desde control de versiones hasta despliegue en la nube.\n\nEl uso moderno de Jenkins se centra en Jenkins Pipeline (Jenkinsfile), que define etapas de construcción como código usando sintaxis declarativa o scripted basada en Groovy. Jenkins puede ejecutarse en un solo servidor o escalar a una arquitectura distribuida con nodos controlador y agente. Jenkins X extiende Jenkins para CI/CD nativo de Kubernetes, y Blue Ocean proporciona una interfaz visual moderna para gestión de pipelines.\n\nLas habilidades avanzadas de Jenkins incluyen escribir bibliotecas compartidas para reutilización de pipeline entre proyectos, configurar builds distribuidos con agentes dinámicos, implementar Jenkins-as-code con Job DSL y Configuration as Code (JCasC), gestionar credenciales de forma segura, optimizar el rendimiento de builds mediante paralelización y caché, y mantener la infraestructura de Jenkins incluyendo actualizaciones y gestión de plugins.`,
    whyImportant: `Jenkins sigue siendo el servidor CI/CD más utilizado, desplegado en más del 60% de las organizaciones que practican integración continua. A pesar de alternativas más nuevas como GitHub Actions y GitLab CI, el dominio de Jenkins en entornos empresariales significa que las habilidades en Jenkins siguen siendo altamente comercializables y son requeridas en una porción significativa de las ofertas de trabajo DevOps.\n\nLa extensibilidad de Jenkins a través de plugins y su flexibilidad para manejar flujos de trabajo de construcción complejos lo convierten en la opción para organizaciones con requisitos CI/CD sofisticados. Comprender el diseño y operaciones de pipelines de Jenkins es fundamental para la experiencia en CI/CD.`,
    keywords: ['habilidades en Jenkins', 'currículum Jenkins', 'pipeline CI/CD', 'automatización Jenkins'],
    searchIntents: ['cómo incluir Jenkins en el currículum', 'habilidades de Jenkins para DevOps', 'mejores prácticas de Jenkins pipeline'],
    relatedSkills: ['CI/CD', 'GitHub Actions', 'GitLab CI', 'Docker', 'Ansible', 'Terraform', 'Kubernetes', 'Groovy'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-lanzamiento', 'ingeniero-de-software', 'ingeniero-de-plataforma', 'ingeniero-de-automatizacion', 'desarrollador-backend'],
    atsKeywords: ['Jenkins', 'Jenkinsfile', 'Jenkins Pipeline', 'CI/CD', 'continuous integration', 'continuous delivery', 'Jenkins shared libraries', 'Blue Ocean', 'JCasC', 'Job DSL'],
    resumeTips: [
      'Especifica el número de pipelines gestionados y la frecuencia de despliegue lograda',
      'Menciona si has escrito bibliotecas compartidas o configuraciones Jenkins-as-code',
      'Destaca experiencias de migración de jobs freestyle a pipelines declarativos',
      'Cuantifica mejoras en tiempos de build por esfuerzos de optimización',
      'Incluye detalles de arquitectura de build distribuido como cantidad y tipos de agentes'
    ],
    exampleBullets: [
      'Gestioné infraestructura Jenkins ejecutando más de 150 pipelines en 12 nodos agente, ejecutando más de 500 builds diarios con 98% de tasa de éxito',
      'Desarrollé biblioteca compartida de Jenkins adoptada por 30 equipos de desarrollo, estandarizando prácticas CI/CD y reduciendo el tiempo de configuración de pipeline en un 80%',
      'Optimicé la paralelización de pipelines Jenkins reduciendo el tiempo promedio de build de 45 minutos a 12 minutos para un monorepo con 2M de líneas de código',
      'Migré 200 jobs freestyle de Jenkins a pipelines declarativos con JCasC, habilitando gestión completa de infraestructura como código de CI/CD',
      'Implementé aprovisionamiento dinámico de agentes Jenkins-a-Kubernetes, eliminando agentes de build ociosos y ahorrando $4K/mes en costos de cómputo'
    ],
    faqs: [
      { question: '¿Sigue siendo relevante Jenkins con GitHub Actions y GitLab CI?', answer: 'Sí. Jenkins está profundamente arraigado en entornos empresariales y maneja flujos de trabajo complejos que herramientas CI/CD más simples no pueden replicar fácilmente. Aunque GitHub Actions está creciendo rápidamente para flujos de trabajo nativos de GitHub, las habilidades en Jenkins siguen en alta demanda, particularmente para organizaciones grandes con infraestructura Jenkins existente.' },
      { question: '¿Cuál es la habilidad más importante de Jenkins para mi currículum?', answer: 'Pipeline-as-code usando Jenkinsfile (preferiblemente sintaxis declarativa) es la habilidad más importante. Además, la experiencia con bibliotecas compartidas, builds distribuidos y Jenkins Configuration as Code (JCasC) señalan experiencia avanzada que los empleadores valoran altamente.' },
      { question: '¿Cómo demuestro experiencia en Jenkins más allá de pipelines básicos?', answer: 'Muestra desarrollo de bibliotecas compartidas, estrategias de pipeline multi-branch, aprovisionamiento dinámico de agentes (especialmente con Docker o Kubernetes), hardening de seguridad, gestión de plugins y proyectos de actualización/migración de Jenkins. Cuantifica mejoras en tiempos de build, frecuencia de despliegue y confiabilidad.' }
    ]
  },
  'github-actions': {
    slug: 'github-actions',
    title: 'GitHub Actions',
    description: `GitHub Actions es la plataforma nativa de CI/CD y automatización de GitHub que permite a los desarrolladores automatizar flujos de trabajo directamente desde sus repositorios. Los workflows se definen en archivos YAML dentro del directorio .github/workflows y pueden ser activados por eventos de GitHub como pushes, pull requests, releases, issues o expresiones cron programadas.\n\nGitHub Actions usa una arquitectura basada en runners donde los workflows se ejecutan en runners alojados por GitHub (Ubuntu, Windows, macOS) o runners auto-alojados para entornos personalizados. Los workflows consisten en jobs que se ejecutan en paralelo o secuencialmente, con cada job conteniendo steps que ejecutan actions (unidades reutilizables de código) o comandos de shell. El GitHub Actions Marketplace ofrece más de 20,000 actions creadas por la comunidad.\n\nEl uso avanzado de GitHub Actions incluye construir actions personalizadas compuestas y de JavaScript/Docker, implementar workflows reutilizables entre repositorios, configurar flotas de runners auto-alojados con auto-escalado, gestionar secretos y entornos con reglas de protección de despliegue, optimizar el rendimiento de workflows mediante caché y estrategias de matrix, e implementar patrones de despliegue complejos como blue-green o canary releases.`,
    whyImportant: `GitHub Actions se ha convertido en la plataforma CI/CD de más rápido crecimiento, beneficiándose de su integración estrecha con GitHub donde más de 100 millones de desarrolladores alojan su código. Para organizaciones que usan GitHub, Actions elimina la necesidad de un servidor CI/CD separado, reduciendo la complejidad de infraestructura y proporcionando una experiencia de desarrollo fluida.\n\nLa arquitectura orientada a eventos de la plataforma permite automatización más allá del CI/CD tradicional, incluyendo triaje automatizado de issues, actualizaciones de dependencias, gestión de releases y escaneo de seguridad. Las habilidades en GitHub Actions son cada vez más solicitadas en ofertas de trabajo, particularmente para organizaciones orientadas a cloud-native y código abierto.`,
    keywords: ['habilidades en GitHub Actions', 'currículum GitHub Actions', 'automatización CI/CD', 'workflows de GitHub'],
    searchIntents: ['cómo agregar GitHub Actions al currículum', 'GitHub Actions vs Jenkins', 'mejores prácticas de GitHub Actions'],
    relatedSkills: ['CI/CD', 'Jenkins', 'GitLab CI', 'Docker', 'Terraform', 'Kubernetes', 'GitHub Actions'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-software', 'desarrollador-backend', 'desarrollador-full-stack', 'ingeniero-de-lanzamiento', 'ingeniero-de-plataforma'],
    atsKeywords: ['GitHub Actions', 'GitHub workflows', 'CI/CD', 'YAML workflows', 'GitHub-hosted runners', 'self-hosted runners', 'GitHub Actions Marketplace', 'reusable workflows', 'composite actions'],
    resumeTips: [
      'Especifica el número y complejidad de workflows que has diseñado',
      'Menciona actions personalizadas o workflows reutilizables que hayas creado',
      'Destaca infraestructura de runners auto-alojados si aplica',
      'Cuantifica mejoras en frecuencia de despliegue y confiabilidad',
      'Incluye logros de optimización de workflows como tiempos de ejecución o costos reducidos'
    ],
    exampleBullets: [
      'Diseñé más de 60 workflows de GitHub Actions en 25 repositorios, habilitando más de 200 despliegues automatizados por semana con 99.5% de tasa de éxito',
      'Construí GitHub Actions compuestas personalizadas usadas en 40 repositorios, estandarizando prácticas CI/CD para una organización de 100 desarrolladores',
      'Implementé flota de runners auto-alojados en Kubernetes con auto-escalado, reduciendo costos de CI en un 60% ($8K/mes) comparado con runners alojados por GitHub',
      'Creé workflow de pruebas basado en matrix ejecutando 12 suites de pruebas en paralelo en 3 plataformas OS, reduciendo el tiempo total de CI de 40 a 8 minutos'
    ],
    faqs: [
      { question: '¿Debo aprender GitHub Actions o Jenkins?', answer: 'Si tu organización usa GitHub, aprende GitHub Actions primero, proporciona la experiencia más fluida. Jenkins sigue siendo valioso para flujos de trabajo empresariales complejos y entornos no-GitHub. Aprender ambos es ideal, ya que muchas organizaciones usan GitHub Actions para CI y Jenkins para pipelines de CD complejos.' },
      { question: '¿Cómo muestro habilidades en GitHub Actions en mi currículum?', answer: 'Detalla la escala de tus implementaciones de workflows (cantidad de repositorios, frecuencia de despliegue), cualquier action personalizada que hayas construido, logros de optimización de workflows y complejidad de integración. Menciona características específicas como workflows reutilizables, estrategias de matrix y reglas de protección de entornos.' },
      { question: '¿Son transferibles las habilidades de GitHub Actions a otras plataformas CI/CD?', answer: 'Sí. Los conceptos centrales de pipelines CI/CD (etapas, jobs, triggers, artefactos, caché, gestión de secretos y estrategias de despliegue) se transfieren directamente a cualquier plataforma CI/CD. La configuración basada en YAML es común en GitHub Actions, GitLab CI, Azure Pipelines y otras.' }
    ]
  },
  'gitlab-ci': {
    slug: 'gitlab-ci',
    title: 'GitLab CI/CD',
    description: `GitLab CI/CD es la plataforma integrada de integración y entrega continua de GitLab que permite a los equipos construir, probar y desplegar código directamente desde sus repositorios GitLab. Los pipelines se definen en un archivo .gitlab-ci.yml usando sintaxis YAML, con etapas, jobs y reglas que controlan el flujo de ejecución basado en ramas, tags, merge requests o condiciones personalizadas.\n\nGitLab CI/CD es parte de la plataforma DevSecOps más amplia de GitLab, proporcionando características integradas incluyendo registros de contenedores, registros de paquetes, escaneo de seguridad (SAST, DAST, escaneo de dependencias), análisis de calidad de código y gestión de entornos. Los GitLab Runners ejecutan jobs de pipeline y pueden ser compartidos, específicos de grupo o de proyecto, ejecutándose en Linux, Windows, macOS o dentro de Docker/Kubernetes.\n\nLas características avanzadas de GitLab CI/CD incluyen pipelines padre-hijo y multi-proyecto, dependencias de grafos acíclicos dirigidos (DAG), generación dinámica de pipelines, review apps para previsualizaciones en merge requests, Auto DevOps para pipelines basados en convenciones y GitLab Kubernetes Agent para integración con clústeres.`,
    whyImportant: `GitLab CI/CD es la segunda plataforma CI/CD más popular y es particularmente prevalente en empresas que han adoptado GitLab como su plataforma completa de DevSecOps. Su enfoque todo-en-uno elimina la necesidad de integrar múltiples herramientas, proporcionando una interfaz única para alojamiento de código, CI/CD, escaneo de seguridad y despliegue.\n\nLas organizaciones que eligen GitLab se benefician de menor dispersión de herramientas y facturación consolidada, haciendo que las habilidades en GitLab CI/CD sean valiosas para entornos que priorizan la consolidación de plataformas y la integración DevSecOps.`,
    keywords: ['habilidades en GitLab CI', 'currículum GitLab CI/CD', 'pipelines GitLab', 'GitLab DevOps'],
    searchIntents: ['cómo incluir GitLab CI en el currículum', 'GitLab CI vs GitHub Actions', 'mejores prácticas de GitLab CI/CD'],
    relatedSkills: ['CI/CD', 'GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ingeniero de Seguridad'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-software', 'ingeniero-de-lanzamiento', 'ingeniero-de-plataforma', 'desarrollador-backend', 'ingeniero-de-confiabilidad-de-sitios'],
    atsKeywords: ['GitLab CI', 'GitLab CI/CD', '.gitlab-ci.yml', 'GitLab Runner', 'GitLab pipelines', 'CI/CD', 'Auto DevOps', 'SAST', 'DAST', 'merge request pipelines'],
    resumeTips: [
      'Especifica la complejidad de pipelines incluyendo configuraciones multi-proyecto y padre-hijo',
      'Menciona infraestructura de GitLab Runner que hayas gestionado incluyendo tipos y escala',
      'Destaca configuración de escaneo de seguridad integrado y gestión de vulnerabilidades',
      'Cuantifica mejoras en rendimiento de pipeline y frecuencia de despliegue',
      'Incluye implementaciones de Auto DevOps o Review Apps si aplica'
    ],
    exampleBullets: [
      'Diseñé pipelines GitLab CI/CD para más de 80 proyectos con escaneo integrado SAST/DAST, detectando más de 200 vulnerabilidades antes de producción trimestralmente',
      'Gestioné flota de 50 GitLab Runners en Kubernetes con auto-escalado, procesando más de 1,200 jobs de pipeline diariamente',
      'Implementé arquitectura de pipeline padre-hijo reduciendo tiempos de build de monorepo en un 55% mediante ejecución selectiva de etapas',
      'Configuré Review Apps para 15 proyectos frontend, habilitando despliegues de previsualización automáticos para cada merge request'
    ],
    faqs: [
      { question: '¿Es GitLab CI/CD mejor que GitHub Actions?', answer: 'Ninguno es universalmente mejor, sobresalen en contextos diferentes. GitLab CI/CD proporciona una experiencia DevSecOps más integrada con escaneo de seguridad incorporado, registro de contenedores y gestión de entornos. GitHub Actions se beneficia del ecosistema más grande de GitHub y su marketplace. Elige basándote en qué plataforma tu organización usa para alojamiento de código.' },
      { question: '¿Qué tan portables son las habilidades de GitLab CI/CD?', answer: 'Muy portables. Los conceptos de CI/CD como etapas de pipeline, caché, artefactos, jobs paralelos y estrategias de despliegue son universales. El conocimiento de configuración YAML se transfiere a GitHub Actions, Azure Pipelines y otras plataformas. Las características específicas de GitLab como pipelines DAG y triggers multi-proyecto demuestran habilidades avanzadas de arquitectura CI/CD.' },
      { question: '¿Qué características de GitLab CI debo destacar en mi currículum?', answer: 'Enfócate en características avanzadas como pipelines multi-proyecto, pipelines hijo dinámicos, escaneo de seguridad integrado (SAST, DAST, escaneo de dependencias), Review Apps e integración con Kubernetes. Estas demuestran profundidad más allá de la configuración básica de pipeline y señalan experiencia CI/CD de nivel senior.' }
    ]
  },
  'circleci': {
    slug: 'circleci',
    title: 'CircleCI',
    description: `CircleCI es una plataforma de integración y entrega continua basada en la nube que automatiza el proceso de construcción, pruebas y despliegue para equipos de software. Soporta repositorios de GitHub, GitLab y Bitbucket y proporciona opciones de despliegue alojadas en la nube y auto-alojadas (servidor). Las configuraciones de CircleCI se definen en un archivo .circleci/config.yml.\n\nLa arquitectura de CircleCI presenta pipelines, workflows, jobs y steps con características poderosas incluyendo caché de capas Docker, clases de recursos para cómputo personalizado, paralelismo para dividir suites de pruebas, orbs (paquetes de configuración reutilizables) y contexts para secretos compartidos. El dashboard de Insights de CircleCI proporciona analítica de pipelines para optimización.\n\nLas características avanzadas de CircleCI incluyen configuración dinámica con setup workflows, parámetros de pipeline para lógica condicional, desarrollo de orbs personalizados, gestión de runners auto-alojados, división de pruebas con datos de tiempo y workflows de aprobación para despliegues controlados.`,
    whyImportant: `CircleCI es una de las plataformas CI/CD más populares para startups y empresas tecnológicas medianas, conocida por su velocidad, confiabilidad y experiencia amigable para desarrolladores. Procesa más de 70 millones de builds mensualmente y tiene una fuerte reputación por ejecución rápida de builds y configuración intuitiva.\n\nLas habilidades en CircleCI son particularmente valiosas en entornos de startups y SaaS donde la velocidad de desarrollo es crítica. El ecosistema de orbs de la plataforma permite configuración rápida de pipelines, y sus características de optimización de rendimiento ayudan a los equipos a entregar más rápido.`,
    keywords: ['habilidades en CircleCI', 'currículum CircleCI', 'plataforma CI/CD', 'orbs de CircleCI'],
    searchIntents: ['cómo agregar CircleCI al currículum', 'CircleCI vs GitHub Actions', 'mejores prácticas de CircleCI'],
    relatedSkills: ['CI/CD', 'GitHub Actions', 'Jenkins', 'Docker', 'Terraform', 'GitLab CI'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-software', 'ingeniero-de-lanzamiento', 'desarrollador-backend', 'desarrollador-full-stack'],
    atsKeywords: ['CircleCI', 'CI/CD', 'continuous integration', 'CircleCI orbs', 'CircleCI workflows', 'pipeline automation', 'test parallelism', 'Docker layer caching'],
    resumeTips: [
      'Especifica la complejidad de pipelines y número de workflows gestionados',
      'Menciona orbs personalizados desarrollados o adoptados del registro',
      'Destaca logros de paralelismo de pruebas y optimización de builds',
      'Cuantifica mejoras en frecuencia de despliegue y tiempos de build',
      'Incluye resultados de optimización de clases de recursos y gestión de costos'
    ],
    exampleBullets: [
      'Gestioné pipelines de CircleCI para 35 repositorios procesando más de 800 builds diarios con 97% de tasa de éxito',
      'Desarrollé 5 orbs personalizados de CircleCI compartidos en la organización, reduciendo el tiempo de configuración de pipeline para nuevos proyectos de horas a minutos',
      'Implementé paralelismo de pruebas dividiendo una suite de 45 minutos en 10 contenedores, reduciendo el tiempo de CI a 5 minutos',
      'Optimicé caché de capas Docker y clases de recursos, reduciendo el gasto en CircleCI en un 35% ($6K/mes) mejorando velocidades de build'
    ],
    faqs: [
      { question: '¿Sigue siendo CircleCI una buena opción CI/CD?', answer: 'Sí. CircleCI sigue siendo una plataforma CI/CD de primer nivel con fuerte rendimiento, excelente soporte Docker y potentes características de paralelismo. Aunque GitHub Actions ha ganado cuota de mercado, CircleCI es preferido por muchos equipos de ingeniería por su velocidad, analítica Insights y conjunto de características maduro.' },
      { question: '¿Cómo se compara CircleCI con Jenkins?', answer: 'CircleCI es completamente gestionado (versión cloud), no requiere mantenimiento de servidor y proporciona una experiencia de configuración más simple. Jenkins ofrece más flexibilidad y opciones de plugins pero requiere gestión de infraestructura. CircleCI es mejor para equipos que quieren mínima carga operativa, mientras Jenkins se adapta a flujos de trabajo empresariales complejos.' },
      { question: '¿Qué habilidades de CircleCI son más comercializables?', answer: 'Desarrollo de orbs personalizados, configuración avanzada de workflows con puertas de aprobación, optimización de paralelismo de pruebas, estrategias de caché de capas Docker y analítica de pipelines para reducción de tiempos de build. La experiencia migrando desde otras plataformas CI/CD a CircleCI también demuestra pensamiento arquitectónico.' }
    ]
  },
  'argo-cd': {
    slug: 'argo-cd',
    title: 'Argo CD',
    description: `Argo CD es una herramienta declarativa de entrega continua GitOps para Kubernetes. Sigue el patrón GitOps donde los repositorios Git sirven como fuente de verdad para definir el estado deseado de la aplicación, y Argo CD sincroniza automáticamente el clúster de Kubernetes para coincidir con ese estado. Proporciona una interfaz web, CLI y API para gestionar despliegues de aplicaciones.\n\nArgo CD monitorea continuamente las aplicaciones en ejecución y compara su estado actual contra el estado deseado definido en Git. Cuando se detecta drift, puede sincronizar automática o manualmente para restaurar el estado deseado. Soporta múltiples herramientas de gestión de configuración incluyendo charts de Helm, Kustomize, Jsonnet y manifiestos YAML planos.\n\nLas características avanzadas de Argo CD incluyen ApplicationSets para gestionar aplicaciones a escala en múltiples clústeres, sync waves y hooks para despliegues ordenados, entrega progresiva con integración de Argo Rollouts, RBAC con integración SSO, configuración multi-tenant y personalización de evaluación de salud para recursos personalizados.`,
    whyImportant: `Argo CD se ha convertido en el estándar de facto para despliegues de Kubernetes basados en GitOps, adoptado por organizaciones como Intuit, Tesla y Red Hat. Las prácticas GitOps usando Argo CD proporcionan registros de auditoría completos, rollbacks fáciles y gestión declarativa de infraestructura que se alinea con flujos de trabajo nativos de Kubernetes.\n\nA medida que crece la adopción de Kubernetes y GitOps se convierte en la metodología de despliegue preferida, las habilidades en Argo CD son cada vez más valiosas para ingenieros de plataforma y profesionales DevOps que trabajan con orquestación de contenedores a escala.`,
    keywords: ['habilidades en Argo CD', 'currículum GitOps', 'despliegue Kubernetes', 'Argo CD GitOps'],
    searchIntents: ['cómo incluir Argo CD en el currículum', 'Argo CD para despliegues Kubernetes', 'mejores prácticas de GitOps'],
    relatedSkills: ['Kubernetes', 'Helm', 'CI/CD', 'GitHub Actions', 'Terraform', 'Istio', 'Contenedorización'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-nube', 'ingeniero-de-infraestructura'],
    atsKeywords: ['Argo CD', 'ArgoCD', 'GitOps', 'Kubernetes deployment', 'continuous delivery', 'ApplicationSets', 'Argo Rollouts', 'declarative deployment', 'sync automation'],
    resumeTips: [
      'Especifica el número de aplicaciones y clústeres gestionados a través de Argo CD',
      'Menciona diseño de flujo de trabajo GitOps y decisiones de estructura de repositorio',
      'Destaca uso de ApplicationSets para despliegues multi-clúster o multi-tenant',
      'Incluye implementaciones de entrega progresiva con Argo Rollouts',
      'Cuantifica mejoras en frecuencia de despliegue y tiempo de rollback'
    ],
    exampleBullets: [
      'Implementé plataforma GitOps con Argo CD gestionando más de 120 aplicaciones en 8 clústeres Kubernetes con detección y remediación automatizada de drift',
      'Diseñé patrones de ApplicationSet permitiendo a 20 equipos de desarrollo desplegar autónomamente a staging y producción con aislamiento RBAC apropiado',
      'Reduje el tiempo de rollback de despliegue de 30 minutos a menos de 2 minutos usando rollback basado en Git de Argo CD con health checks automatizados',
      'Integré Argo CD con Argo Rollouts para despliegues canary, detectando 3 problemas críticos en producción durante rollouts graduales antes del impacto al usuario'
    ],
    faqs: [
      { question: '¿Qué es GitOps y por qué importa Argo CD?', answer: 'GitOps es una metodología de despliegue donde Git es la única fuente de verdad para la configuración de infraestructura y aplicaciones. Argo CD implementa GitOps para Kubernetes sincronizando continuamente el estado del clúster con repositorios Git. Esto proporciona registros de auditoría, rollbacks fáciles y elimina despliegues manuales con kubectl.' },
      { question: '¿Necesito Argo CD si ya uso Helm?', answer: 'Helm y Argo CD son complementarios. Helm empaqueta manifiestos de Kubernetes en charts reutilizables, mientras que Argo CD despliega y gestiona esos charts (o cualquier manifiesto de Kubernetes) usando GitOps. Argo CD agrega reconciliación continua, detección de drift, gestión multi-clúster y una interfaz de despliegue que Helm solo no proporciona.' },
      { question: '¿Cómo se compara Argo CD con Flux CD?', answer: 'Ambos implementan GitOps para Kubernetes. Argo CD proporciona una interfaz web rica, mejor soporte multi-tenancy y un enfoque más opinado. Flux CD es más liviano, profundamente integrado con el ecosistema CNCF y sigue una arquitectura más componible. Argo CD es generalmente preferido para organizaciones más grandes que necesitan operaciones guiadas por interfaz.' }
    ]
  },
  'helm': {
    slug: 'helm',
    title: 'Helm',
    description: `Helm es el gestor de paquetes para Kubernetes, permitiendo a los equipos definir, instalar y gestionar aplicaciones de Kubernetes a través de paquetes chart reutilizables. Un chart de Helm agrupa todas las definiciones de recursos de Kubernetes necesarias para una aplicación, junto con valores configurables que permiten personalización para diferentes entornos sin duplicar manifiestos.\n\nLos charts de Helm consisten en plantillas (lenguaje de plantillas de Go), un archivo values.yaml para valores por defecto, Chart.yaml para metadatos, y helpers y hooks opcionales. Los repositorios de Helm alojan charts para distribución, y los releases de Helm rastrean instancias desplegadas de charts en un clúster. Helm v3 eliminó el componente del servidor Tiller, mejorando la seguridad y simplificando las operaciones.\n\nEl uso avanzado de Helm incluye escribir plantillas de chart complejas con named templates y library charts, implementar pruebas de charts con helm test, gestionar dependencias de charts, usar Helmfile para gestión declarativa multi-release, publicar charts en registros compatibles con OCI y escribir plugins de Helm para flujos de trabajo personalizados.`,
    whyImportant: `Helm es la herramienta estándar para empaquetado y despliegue de aplicaciones Kubernetes, utilizada en más del 70% de los entornos Kubernetes. Resuelve el problema de gestionar manifiestos complejos de Kubernetes proporcionando plantillas, versionado y capacidades de rollback que hacen práctico el ciclo de vida de aplicaciones a escala.\n\nPara ingenieros DevOps y de plataforma, la experiencia en Helm permite crear experiencias de despliegue de autoservicio para equipos de desarrollo. Comprender Helm es frecuentemente un prerrequisito para trabajar con Kubernetes en entornos de producción.`,
    keywords: ['habilidades en Helm', 'currículum Helm charts', 'gestor de paquetes Kubernetes', 'Helm Kubernetes'],
    searchIntents: ['cómo incluir Helm en el currículum', 'Helm charts para Kubernetes', 'mejores prácticas de Helm'],
    relatedSkills: ['Kubernetes', 'Argo CD', 'Docker', 'Terraform', 'Contenedorización', 'Arquitectura de Microservicios'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-nube', 'ingeniero-de-infraestructura'],
    atsKeywords: ['Helm', 'Helm charts', 'Helm v3', 'Kubernetes package management', 'Helmfile', 'chart templates', 'values.yaml', 'Helm repositories', 'chart releases'],
    resumeTips: [
      'Especifica el número y complejidad de charts de Helm que has creado',
      'Menciona gestión de repositorios de charts y enfoque de distribución',
      'Destaca patrones de charts reutilizables como library charts',
      'Incluye pruebas de charts e integración CI/CD para releases de charts',
      'Cuantifica mejoras en estandarización de despliegues por la adopción de Helm'
    ],
    exampleBullets: [
      'Creé más de 35 charts de Helm para microservicios de producción con configuraciones plantilladas soportando 4 entornos por servicio',
      'Construí repositorio interno de charts de Helm sirviendo a 15 equipos, estandarizando despliegues de Kubernetes y reduciendo errores de manifiestos en un 70%',
      'Implementé pipeline de despliegue basado en Helmfile gestionando más de 50 releases en 5 clústeres con previsualizaciones de diff automatizadas',
      'Creé chart de biblioteca Helm reduciendo boilerplate en charts de servicios en un 60% y asegurando etiquetado consistente, contextos de seguridad y límites de recursos'
    ],
    faqs: [
      { question: '¿Es Helm necesario para Kubernetes?', answer: 'Aunque no es estrictamente necesario, Helm simplifica dramáticamente la gestión de aplicaciones Kubernetes. Sin Helm, los equipos deben gestionar manualmente manifiestos YAML crudos, lo cual se vuelve inmanejable a escala. Helm proporciona plantillas, versionado, gestión de dependencias y capacidades de rollback que hacen las operaciones de Kubernetes prácticas para uso en producción.' },
      { question: '¿Debo aprender Helm o Kustomize?', answer: 'Ambos son valiosos. Helm es mejor para empaquetar aplicaciones reutilizables y distribuibles con necesidades complejas de plantillas. Kustomize es mejor para overlays específicos de entorno sobre manifiestos existentes sin plantillas. Muchos equipos usan ambos: Helm para aplicaciones de terceros y compartidas, Kustomize para configuración de aplicaciones internas.' },
      { question: '¿Cómo demuestro experiencia en Helm en mi currículum?', answer: 'Detalla los charts que has creado (cantidad y complejidad), gestión de repositorio de charts, estrategias de pruebas e integración CI/CD para releases de charts. Menciona características avanzadas como library charts, hooks y estrategias de valores multi-entorno. Cuantifica cómo Helm mejoró la consistencia de despliegue y la productividad del equipo.' }
    ]
  },
  'istio': {
    slug: 'istio',
    title: 'Istio',
    description: `Istio es una plataforma de service mesh de código abierto que proporciona una forma uniforme de conectar, asegurar, controlar y observar microservicios ejecutándose en Kubernetes y otras plataformas. Usa un patrón de proxy sidecar (Envoy) inyectado junto a cada servicio para interceptar todo el tráfico de red, habilitando gestión avanzada de tráfico, seguridad y observabilidad sin modificar el código de la aplicación.\n\nLas características principales de Istio incluyen enrutamiento inteligente de tráfico (releases canary, pruebas A/B, traffic mirroring), encriptación mutual TLS entre servicios, políticas de acceso detalladas, tracing distribuido, recolección de métricas y circuit breaking. El plano de control de Istio consiste en Istiod, que combina Pilot (gestión de tráfico), Citadel (seguridad) y Galley (configuración) en un único binario.\n\nLas configuraciones avanzadas de Istio incluyen federación de mesh multi-clúster, integración de servicios externos con ServiceEntry, EnvoyFilters personalizados, plugins WebAssembly para extensibilidad del plano de datos, modo ambient mesh (sin sidecar) e integración de Istio con Prometheus, Grafana, Jaeger y Kiali para observabilidad integral.`,
    whyImportant: `A medida que las organizaciones adoptan arquitecturas de microservicios con cientos de servicios, gestionar la comunicación servicio-a-servicio se convierte en un desafío crítico. Istio aborda esto proporcionando una capa dedicada de infraestructura para gestión de tráfico, seguridad y observabilidad que no requiere cambios en el código de la aplicación.\n\nIstio es la implementación de service mesh más popular y es utilizada por grandes empresas incluyendo eBay, Airbnb y Salesforce. La experiencia en service mesh, particularmente con Istio, señala conocimiento avanzado de Kubernetes y microservicios que es altamente valorado para roles senior de DevOps e ingeniería de plataforma.`,
    keywords: ['habilidades en Istio', 'currículum service mesh', 'Istio Kubernetes', 'mesh de microservicios'],
    searchIntents: ['cómo agregar Istio al currículum', 'Istio service mesh para DevOps', 'Istio vs Linkerd'],
    relatedSkills: ['Kubernetes', 'Service Mesh', 'Arquitectura de Microservicios', 'Prometheus', 'Grafana', 'Docker', 'Contenedorización'],
    professionSlugs: ['ingeniero-de-plataforma', 'ingeniero-devops', 'ingeniero-de-confiabilidad-de-sitios', 'arquitecto-de-nube', 'ingeniero-de-infraestructura'],
    atsKeywords: ['Istio', 'service mesh', 'Envoy proxy', 'sidecar proxy', 'mutual TLS', 'mTLS', 'traffic management', 'canary deployment', 'circuit breaking', 'Kiali'],
    resumeTips: [
      'Especifica la escala de tu mesh Istio incluyendo número de servicios y volumen de tráfico',
      'Destaca patrones de gestión de tráfico implementados como releases canary y circuit breaking',
      'Menciona implementación de mTLS y configuraciones de políticas de seguridad',
      'Incluye integraciones de observabilidad que hayas configurado con Istio',
      'Cuantifica mejoras de confiabilidad por políticas de circuit breaking y retry'
    ],
    exampleBullets: [
      'Desplegué service mesh Istio en más de 80 microservicios manejando 2M de solicitudes/minuto con mutual TLS aplicado para toda la comunicación inter-servicio',
      'Implementé estrategia de despliegue canary vía traffic splitting de Istio, detectando y revirtiendo 5 releases defectuosos antes de impactar a más del 2% de usuarios',
      'Configuré circuit breakers y políticas de retry de Istio reduciendo incidentes de fallas en cascada en un 75% en la plataforma de microservicios',
      'Construí stack de observabilidad integral integrando Istio con Prometheus, Grafana y Jaeger, logrando tracing distribuido de extremo a extremo para el 100% de las solicitudes'
    ],
    faqs: [
      { question: '¿Cuándo debería una organización adoptar Istio?', answer: 'Istio proporciona mayor valor cuando tienes más de 20 microservicios que necesitan seguridad consistente (mTLS), gestión de tráfico (releases canary, reintentos) y observabilidad. Para despliegues más pequeños, Istio agrega complejidad que puede no justificarse. Considera Istio cuando necesites control de tráfico detallado, redes zero-trust o tracing distribuido profundo.' },
      { question: '¿Cómo se compara Istio con Linkerd?', answer: 'Istio ofrece más características (gestión de tráfico, extensibilidad con Wasm) pero es más complejo. Linkerd es más liviano, más simple de operar y usa menos recursos. Istio domina la cuota de mercado y las ofertas de trabajo. Elige Linkerd por simplicidad y eficiencia de recursos, Istio por un conjunto de características integral y adopción empresarial.' },
      { question: '¿Es valiosa la experiencia con Istio en un currículum?', answer: 'Altamente valiosa para roles senior. La experiencia en Istio señala conocimiento profundo de redes de microservicios, Kubernetes y sistemas distribuidos. Es comúnmente listada en requisitos de trabajo para posiciones de ingeniería de plataforma y SRE en empresas que operan despliegues Kubernetes a gran escala.' }
    ]
  },
  'prometheus': {
    slug: 'prometheus',
    title: 'Prometheus',
    description: `Prometheus es un toolkit de monitoreo y alertas de sistemas de código abierto que se ha convertido en el estándar para monitoreo basado en métricas en entornos cloud-native. Construido originalmente en SoundCloud y ahora un proyecto graduado de CNCF, Prometheus recolecta métricas de series temporales mediante scraping de endpoints HTTP, las almacena en una base de datos de series temporales personalizada y proporciona PromQL, un poderoso lenguaje de consultas para analizar datos de métricas.\n\nLa arquitectura de Prometheus incluye el servidor Prometheus (scraping, almacenamiento, consulta), Alertmanager (enrutamiento y deduplicación de alertas), exporters (adaptadores de métricas para sistemas de terceros), Pushgateway (para jobs de corta duración) y bibliotecas cliente para instrumentar código de aplicaciones. Las integraciones de service discovery encuentran automáticamente targets de scraping en Kubernetes, Consul, AWS y otras plataformas.\n\nEl uso avanzado de Prometheus incluye escribir exporters personalizados, diseñar recording rules eficientes para consultas pre-computadas, implementar estrategias de alertas multinivel con Alertmanager, federation para escalar entre clústeres, remote write a backends de almacenamiento a largo plazo como Thanos o Cortex, e instrumentar aplicaciones con métricas personalizadas usando bibliotecas cliente.`,
    whyImportant: `Prometheus es el estándar de monitoreo de facto para Kubernetes y aplicaciones cloud-native, adoptado por la gran mayoría de organizaciones que ejecutan cargas de trabajo contenedorizadas. Su modelo basado en pull, modelo de datos dimensional y poderoso lenguaje de consultas PromQL lo hacen ideal para arquitecturas dinámicas orientadas a servicios.\n\nLa experiencia en monitoreo es esencial para roles DevOps y SRE, y las habilidades en Prometheus demuestran la capacidad de implementar observabilidad a escala. Comprender Prometheus es fundamental para construir sistemas confiables con alertas, dashboards y capacidades de respuesta a incidentes adecuadas.`,
    keywords: ['monitoreo Prometheus', 'currículum Prometheus', 'monitoreo de métricas', 'habilidades PromQL'],
    searchIntents: ['cómo agregar Prometheus al currículum', 'habilidades de monitoreo Prometheus', 'Prometheus vs Datadog'],
    relatedSkills: ['Grafana', 'Kubernetes', 'Datadog', 'ELK Stack', 'Ingeniería de Confiabilidad de Sitios', 'Alertas'],
    professionSlugs: ['ingeniero-de-confiabilidad-de-sitios', 'ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-infraestructura', 'ingeniero-de-nube'],
    atsKeywords: ['Prometheus', 'PromQL', 'Alertmanager', 'metrics', 'monitoring', 'time-series', 'exporters', 'Thanos', 'Cortex', 'service discovery', 'Grafana'],
    resumeTips: [
      'Especifica la escala de tu despliegue de Prometheus incluyendo volumen de métricas y retención',
      'Menciona competencia en PromQL para consultas complejas y recording rules',
      'Destaca estrategias de alertas implementadas con Alertmanager',
      'Incluye exporters personalizados escritos o soluciones de escalado desplegadas',
      'Cuantifica mejoras en detección de incidentes desde monitoreo basado en Prometheus'
    ],
    exampleBullets: [
      'Desplegué stack de monitoreo Prometheus ingiriendo 5M de series temporales en 20 clústeres Kubernetes con 99.9% de disponibilidad de métricas',
      'Diseñé marco de alertas con más de 200 reglas de Alertmanager y enrutamiento multi-canal, reduciendo el tiempo medio de detección de 15 minutos a menos de 2 minutos',
      'Construí exporters personalizados de Prometheus para 8 servicios internos habilitando auto-escalado basado en métricas que mejoró la utilización de recursos en un 30%',
      'Implementé Thanos para almacenamiento a largo plazo de Prometheus y consultas globales en 5 clústeres, proporcionando retención de métricas de 12 meses con rendimiento de consulta inferior a un segundo'
    ],
    faqs: [
      { question: '¿Es Prometheus la mejor herramienta de monitoreo para Kubernetes?', answer: 'Prometheus es considerado el estándar de oro para monitoreo de Kubernetes debido a su service discovery nativo, modelo basado en pull que funciona bien con pods dinámicos y soporte de primera clase en el ecosistema Kubernetes. El Prometheus Operator y kube-prometheus-stack hacen el despliegue sencillo. Para necesidades de APM, complementa con herramientas de tracing como Jaeger.' },
      { question: '¿Qué tan importante es el conocimiento de PromQL?', answer: 'Muy importante. PromQL es la base para escribir alertas, construir dashboards y analizar el comportamiento del sistema. Demostrar competencia en PromQL, incluyendo funciones como rate(), histogram_quantile() y operadores de agregación, señala experiencia profunda en monitoreo que los empleadores valoran altamente.' },
      { question: '¿Debo usar Prometheus o una herramienta comercial como Datadog?', answer: 'Prometheus es gratuito, altamente personalizable y el estándar de la comunidad. Las herramientas comerciales como Datadog ofrecen configuración más fácil, infraestructura gestionada y APM/logging integrados. Muchas organizaciones usan Prometheus para métricas y complementan con herramientas comerciales para observabilidad full-stack. Ambos conjuntos de habilidades son valiosos en un currículum.' }
    ]
  },
  'grafana': {
    slug: 'grafana',
    title: 'Grafana',
    description: `Grafana es una plataforma de visualización y analítica de datos de código abierto utilizada para crear dashboards interactivos para monitorear métricas, logs y trazas de diversas fuentes de datos. Soporta más de 150 plugins de fuentes de datos incluyendo Prometheus, Elasticsearch, InfluxDB, CloudWatch, Azure Monitor y bases de datos SQL, convirtiéndolo en la capa universal de dashboarding para stacks de observabilidad.\n\nGrafana proporciona opciones de visualización ricas incluyendo gráficos de series temporales, mapas de calor, indicadores, tablas, paneles de estadísticas, geomap y más. Su sistema de plantillas con variables habilita dashboards dinámicos y reutilizables. Grafana Alerting (alertas unificadas desde v8) proporciona un motor de alertas incorporado con soporte multi-datasource, gestión de silencios y enrutamiento de notificaciones.\n\nEl uso avanzado de Grafana incluye Grafana as Code usando el proveedor de Terraform para Grafana o Grafonnet (biblioteca Jsonnet), implementar Grafana Loki para agregación de logs, Grafana Tempo para tracing distribuido y Grafana Mimir para almacenamiento escalable de métricas, formando el stack completo de observabilidad Grafana LGTM. Las características enterprise incluyen RBAC, registro de auditoría y permisos de fuentes de datos.`,
    whyImportant: `Grafana es la herramienta de dashboarding de código abierto más utilizada en el mundo con más de 20 millones de usuarios. En contextos DevOps y SRE, los dashboards de Grafana son la interfaz principal a través de la cual los equipos monitorean la salud del sistema, investigan incidentes y rastrean SLIs/SLOs. La competencia en construir dashboards efectivos de Grafana es esencial para la visibilidad operativa.\n\nA medida que las organizaciones construyen plataformas de observabilidad integrales, el rol de Grafana se expande de pura visualización a una suite de observabilidad completa con Loki (logs), Tempo (trazas) y Mimir (métricas), haciendo las habilidades en Grafana cada vez más valiosas en el panorama del monitoreo.`,
    keywords: ['habilidades en Grafana', 'currículum dashboard Grafana', 'visualización de monitoreo', 'Grafana DevOps'],
    searchIntents: ['cómo incluir Grafana en el currículum', 'mejores prácticas de dashboards Grafana', 'habilidades de Grafana para SRE'],
    relatedSkills: ['Prometheus', 'Datadog', 'ELK Stack', 'Kubernetes', 'Ingeniería de Confiabilidad de Sitios', 'Splunk'],
    professionSlugs: ['ingeniero-de-confiabilidad-de-sitios', 'ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-infraestructura', 'ingeniero-de-nube'],
    atsKeywords: ['Grafana', 'Grafana dashboards', 'data visualization', 'monitoring dashboards', 'Grafana Loki', 'Grafana Tempo', 'Grafana Mimir', 'Grafana alerting', 'Grafana Cloud'],
    resumeTips: [
      'Especifica el número de dashboards creados y fuentes de datos integradas',
      'Menciona enfoques de Grafana as Code para control de versiones de dashboards',
      'Destaca experiencia con el stack LGTM con Loki, Tempo o Mimir',
      'Incluye rol en establecer estándares de dashboards y mejores prácticas para equipos',
      'Cuantifica mejoras operativas del monitoreo dirigido por dashboards'
    ],
    exampleBullets: [
      'Creé más de 100 dashboards de Grafana en 12 fuentes de datos proporcionando visibilidad en tiempo real para más de 200 servicios usados por 150 ingenieros diariamente',
      'Implementé Grafana as Code usando el proveedor de Terraform, versionando 80 dashboards y habilitando aprovisionamiento automatizado entre entornos',
      'Desplegué stack Grafana LGTM (Loki, Grafana, Tempo, Mimir) como plataforma de observabilidad unificada, consolidando 3 herramientas de monitoreo separadas y ahorrando $50K/año',
      'Diseñé dashboards de SLO con seguimiento de error budget, permitiendo a 8 equipos de producto auto-monitorear objetivos de confiabilidad con alertas automatizadas'
    ],
    faqs: [
      { question: '¿Qué tan importante es Grafana para roles DevOps?', answer: 'Muy importante. Grafana es la capa de visualización estándar para stacks de monitoreo DevOps. Casi todas las organizaciones que usan Prometheus también usan Grafana. Construir dashboards efectivos que permitan detección rápida de incidentes y análisis de causa raíz es una competencia central de DevOps y SRE.' },
      { question: '¿Debo aprender Grafana o Datadog?', answer: 'Ambos son valiosos. Grafana es de código abierto y se combina con Prometheus en la mayoría de los entornos Kubernetes. Datadog es una plataforma SaaS comercial popular en organizaciones que prefieren soluciones gestionadas. Las habilidades en Grafana demuestran que puedes construir monitoreo desde cero, mientras las habilidades en Datadog muestran que puedes aprovechar plataformas de observabilidad empresarial.' },
      { question: '¿Qué características de Grafana debo destacar en mi currículum?', answer: 'Enfócate en mejores prácticas de diseño de dashboards (variables, anotaciones, drill-downs), Grafana as Code para dashboards versionados, configuración de alertas y experiencia con el ecosistema más amplio de Grafana (Loki, Tempo, Mimir). Cuantifica el impacto de tus dashboards en la respuesta a incidentes y productividad del equipo.' }
    ]
  },
  'datadog': {
    slug: 'datadog',
    title: 'Datadog',
    description: `Datadog es una plataforma de monitoreo y seguridad a escala de nube que proporciona observabilidad integral a través de monitoreo de infraestructura, monitoreo de rendimiento de aplicaciones (APM), gestión de logs, monitoreo de usuario real (RUM), pruebas sintéticas y monitoreo de seguridad. Ingiere métricas, trazas y logs de más de 750 integraciones abarcando proveedores de nube, bases de datos, herramientas de orquestación y lenguajes de programación.\n\nLa plataforma unificada de Datadog correlaciona métricas, trazas y logs en una única interfaz, habilitando análisis rápido de causa raíz. Las características clave incluyen dashboards personalizados, detección de anomalías potenciada por machine learning, seguimiento de SLOs, investigación de incidentes basada en notebooks, Watchdog para alertas automatizadas y Continuous Profiler para análisis de rendimiento a nivel de código.\n\nEl uso avanzado de Datadog incluye diseñar estrategias de etiquetado eficientes para gestión de costos, implementar métricas personalizadas con DogStatsD, construir monitores de Datadog con condiciones complejas y alertas compuestas, usar Terraform para gestionar Datadog como código, optimizar pipelines de logs para eficiencia de costos y configurar el Datadog Agent en despliegues a gran escala.`,
    whyImportant: `Datadog es la plataforma de observabilidad comercial líder, utilizada por más de 27,000 clientes incluyendo grandes empresas. Su enfoque todo-en-uno para monitoreo, APM, logging y seguridad reduce la dispersión de herramientas y los desafíos de integración que las organizaciones enfrentan al ensamblar stacks de monitoreo de código abierto.\n\nLas habilidades en Datadog son altamente buscadas, particularmente en organizaciones que priorizan la excelencia operativa y están dispuestas a invertir en herramientas premium. Las características potenciadas por machine learning de la plataforma y la interfaz unificada permiten una respuesta a incidentes más rápida y detección proactiva de problemas.`,
    keywords: ['habilidades en Datadog', 'currículum Datadog', 'monitoreo APM', 'observabilidad Datadog'],
    searchIntents: ['cómo agregar Datadog al currículum', 'habilidades de monitoreo Datadog', 'Datadog vs Prometheus'],
    relatedSkills: ['Prometheus', 'Grafana', 'New Relic', 'ELK Stack', 'Splunk', 'Ingeniería de Confiabilidad de Sitios'],
    professionSlugs: ['ingeniero-de-confiabilidad-de-sitios', 'ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-nube', 'ingeniero-de-software', 'ingeniero-de-infraestructura'],
    atsKeywords: ['Datadog', 'APM', 'application performance monitoring', 'Datadog Agent', 'DogStatsD', 'monitors', 'dashboards', 'log management', 'Datadog RUM', 'Datadog Synthetics', 'Watchdog'],
    resumeTips: [
      'Especifica el alcance de tu despliegue de Datadog incluyendo conteo de hosts y cantidad de integraciones',
      'Menciona implementaciones de monitoring-as-code usando Terraform o la API de Datadog',
      'Destaca optimización de costos para gestión de volumen de métricas y logs',
      'Incluye experiencia de instrumentación APM y configuración de tracing',
      'Cuantifica mejoras en tiempo de detección y resolución de incidentes'
    ],
    exampleBullets: [
      'Gestioné despliegue de Datadog monitoreando más de 2,000 hosts y 300 servicios con 500 dashboards personalizados y 800 monitores activos',
      'Implementé instrumentación APM de Datadog en 60 microservicios, reduciendo el tiempo medio de causa raíz de 45 minutos a 8 minutos',
      'Optimicé pipeline de logs de Datadog con filtros de exclusión y conversiones log-to-metrics, reduciendo el gasto mensual en Datadog en un 28% ($22K/mes)',
      'Construí monitoring-as-code de Datadog usando Terraform gestionando más de 400 monitores y 100 dashboards con control de versiones completo y revisión por pares'
    ],
    faqs: [
      { question: '¿Vale la pena aprender Datadog para mi carrera?', answer: 'Sí, especialmente si apuntas a organizaciones medianas y grandes. Datadog es la plataforma de monitoreo comercial más citada en ofertas de trabajo DevOps y SRE. Su conjunto integral de características significa que la experiencia en Datadog cubre métricas, APM, logging y monitoreo de seguridad en una sola habilidad.' },
      { question: '¿Cómo se compara Datadog con alternativas de código abierto?', answer: 'Datadog proporciona una plataforma completamente gestionada e integrada que es más fácil de configurar y operar que ensamblar Prometheus, Grafana, Loki y Jaeger. La contrapartida es el costo, ya que Datadog puede ser costoso a escala. Muchas organizaciones usan ambos: Datadog para observabilidad a nivel de aplicación y Prometheus/Grafana para monitoreo de infraestructura Kubernetes.' },
      { question: '¿Qué habilidades de Datadog impresionan más a los empleadores?', answer: 'Diseño eficiente de estrategias de etiquetado, monitoring-as-code con Terraform, instrumentación APM para tracing distribuido, optimización de costos a través de gestión de pipeline de logs e implementación de SLO/SLI. Demostrar que puedes maximizar el valor de Datadog mientras controlas los costos muestra pensamiento de ingeniería consciente del negocio.' }
    ]
  },
  'splunk': {
    slug: 'splunk',
    title: 'Splunk',
    description: `Splunk es una plataforma de datos empresarial para buscar, monitorear y analizar datos generados por máquinas a través de una interfaz web. Splunk sobresale en agregación y análisis de logs, gestión de información y eventos de seguridad (SIEM), analítica de operaciones de TI e inteligencia de negocios desde datos operacionales. Su Search Processing Language (SPL) proporciona capacidades poderosas para consultar, transformar y visualizar datos.\n\nLa arquitectura de Splunk incluye forwarders (recolección de datos), indexers (almacenamiento y búsqueda de datos) y search heads (ejecución de consultas e interfaz). Splunk Enterprise Security (ES) es una solución SIEM líder, mientras que Splunk ITSI proporciona inteligencia de servicios de TI. Splunk Observability Cloud (anteriormente SignalFx) se extiende a APM y monitoreo de infraestructura.\n\nLas habilidades avanzadas de Splunk incluyen escribir consultas SPL complejas con subsearches y lookups, construir knowledge objects (búsquedas guardadas, reportes, alertas, dashboards), desarrollar apps personalizadas de Splunk, implementar data models para reporteo acelerado, gestionar políticas de ciclo de vida de índices y optimizar la infraestructura de Splunk para rendimiento y costos.`,
    whyImportant: `Splunk es el líder del mercado en analítica de logs y se despliega extensivamente en entornos empresariales, particularmente en industrias con requisitos estrictos de cumplimiento como finanzas, salud y gobierno. Splunk Enterprise Security es una de las principales plataformas SIEM, haciendo las habilidades en Splunk críticas para operaciones de seguridad.\n\nLos profesionales de Splunk obtienen salarios premium, y las certificaciones de Splunk son altamente valoradas en roles empresariales de TI y seguridad. Incluso cuando las herramientas de monitoreo cloud-native ganan adopción, Splunk permanece profundamente arraigado en organizaciones grandes que han invertido fuertemente en su ecosistema.`,
    keywords: ['habilidades en Splunk', 'currículum Splunk', 'consultas SPL', 'Splunk SIEM'],
    searchIntents: ['cómo agregar Splunk al currículum', 'habilidades de Splunk para analistas de seguridad', 'valor de la certificación Splunk para la carrera'],
    relatedSkills: ['ELK Stack', 'Datadog', 'Grafana', 'Prometheus', 'Ingeniero de Seguridad', 'Ingeniería de Confiabilidad de Sitios'],
    professionSlugs: ['analista-de-ciberseguridad', 'ingeniero-de-seguridad', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-devops', 'administrador-de-sistemas', 'ingeniero-de-seguridad-de-redes'],
    atsKeywords: ['Splunk', 'SPL', 'Splunk Enterprise', 'Splunk Cloud', 'Splunk ES', 'SIEM', 'forwarders', 'indexers', 'search heads', 'Splunk ITSI', 'knowledge objects'],
    resumeTips: [
      'Especifica volúmenes de ingestión diaria de datos y número de fuentes de datos gestionadas',
      'Menciona nivel de competencia en SPL y tipos de consultas complejas escritas',
      'Destaca desarrollo de apps de Splunk o creación de dashboards personalizados',
      'Incluye nombres y niveles de certificaciones de Splunk obtenidas',
      'Cuantifica ahorros de costos por optimización de índices o mejoras en detección de incidentes'
    ],
    exampleBullets: [
      'Gestioné despliegue de Splunk Enterprise ingiriendo 3TB/día de más de 500 fuentes de datos en 10,000 hosts con 99.9% de disponibilidad de datos',
      'Desarrollé más de 50 búsquedas de correlación SPL para Splunk Enterprise Security, mejorando la tasa de detección de amenazas en un 60% y reduciendo falsos positivos en un 40%',
      'Construí app personalizada de Splunk con 30 dashboards proporcionando visibilidad en tiempo real del rendimiento de aplicaciones para 5 equipos de producto',
      'Optimicé políticas de retención de índices de Splunk y enrutamiento de datos, reduciendo costos de almacenamiento en $120K anuales manteniendo requisitos de cumplimiento'
    ],
    faqs: [
      { question: '¿Sigue siendo relevante Splunk con el ELK Stack disponible?', answer: 'Sí. Splunk sigue siendo el líder empresarial para analítica de logs, particularmente para casos de uso de seguridad (SIEM). Aunque ELK es popular por su modelo de código abierto, Splunk ofrece características empresariales superiores, soporte, certificaciones de cumplimiento y un ecosistema maduro de apps. Muchas organizaciones grandes estandarizan en Splunk por su confiabilidad y respaldo del proveedor.' },
      { question: '¿Qué certificación de Splunk debo obtener primero?', answer: 'Comienza con Splunk Core Certified User para validar conocimientos básicos de SPL, luego busca Splunk Core Certified Power User para habilidades avanzadas de búsqueda y dashboards. Para roles de seguridad, Splunk Certified Cybersecurity Defense Analyst es altamente valorada. Para roles de administrador, apunta a Splunk Enterprise Certified Admin.' },
      { question: '¿Cuánto SPL debo saber para un trabajo?', answer: 'Como mínimo, comprende los comandos de búsqueda (stats, eval, rex, transaction), modificadores de tiempo, subsearches y lookups. Para roles senior, domina aceleración de data models, indexado de resumen, regex avanzado y macros. Practica construir alertas y dashboards que proporcionen insights operativos accionables.' }
    ]
  },
  'elk-stack': {
    slug: 'elk-stack',
    title: 'ELK Stack (Elasticsearch, Logstash, Kibana)',
    description: `El ELK Stack, compuesto por Elasticsearch, Logstash y Kibana, es la plataforma de gestión y analítica de logs de código abierto más popular. Elasticsearch proporciona búsqueda y analítica distribuida, Logstash maneja recolección, transformación y enrutamiento de datos, y Kibana ofrece capacidades de visualización y dashboards. Frecuentemente extendido al Elastic Stack con Beats (transportadores de datos livianos), impulsa casos de uso de agregación de logs, búsqueda full-text, analítica de seguridad y observabilidad.\n\nElasticsearch es un motor de búsqueda distribuido RESTful construido sobre Apache Lucene que almacena e indexa datos en documentos JSON. Los pipelines de Logstash ingieren datos de diversas fuentes, aplican filtros (grok, mutate, date, geoip) y envían a Elasticsearch. Kibana proporciona Discover para exploración de logs, Lens para visualizaciones drag-and-drop y Canvas para dashboards operacionales.\n\nLa gestión avanzada del ELK Stack incluye planificación de capacidad de clúster y optimización de shards, políticas de gestión de ciclo de vida de índices (ILM), búsqueda y replicación cross-cluster, pipelines de ingest node como alternativas a Logstash, características de seguridad de Elasticsearch (TLS, RBAC, seguridad a nivel de campo) y ajuste de rendimiento mediante optimización de mappings y profiling de consultas.`,
    whyImportant: `El ELK Stack está desplegado en más de 500,000 organizaciones a nivel mundial y es la solución de código abierto predilecta para logging centralizado y búsqueda. Su flexibilidad soporta diversos casos de uso desde análisis de logs de aplicaciones hasta monitoreo de eventos de seguridad y búsqueda full-text potenciando características de cara al usuario.\n\nLa experiencia en ELK es valiosa en roles de DevOps, SRE, seguridad e ingeniería de software. Comprender la arquitectura distribuida de Elasticsearch se traduce en conocimiento más amplio de sistemas distribuidos, y las habilidades operativas de ELK demuestran la capacidad de gestionar infraestructura compleja e intensiva en datos.`,
    keywords: ['habilidades en ELK Stack', 'currículum Elasticsearch', 'Logstash Kibana', 'gestión de logs'],
    searchIntents: ['cómo incluir ELK Stack en el currículum', 'ELK Stack para DevOps', 'ELK vs Splunk'],
    relatedSkills: ['Splunk', 'Grafana', 'Prometheus', 'Datadog', 'Administración Linux', 'Kubernetes'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-datos', 'ingeniero-de-seguridad', 'administrador-de-sistemas', 'ingeniero-de-plataforma'],
    atsKeywords: ['ELK Stack', 'Elasticsearch', 'Logstash', 'Kibana', 'Elastic Stack', 'Beats', 'Filebeat', 'log aggregation', 'full-text search', 'index lifecycle management'],
    resumeTips: [
      'Especifica el tamaño del clúster incluyendo conteo de nodos, volumen de datos y tasa de ingestión diaria',
      'Menciona experiencia en optimización de consultas y mappings de Elasticsearch',
      'Destaca implementaciones de gestión de ciclo de vida de índices y políticas de retención',
      'Incluye configuraciones específicas de Beats y pipelines de Logstash gestionadas',
      'Cuantifica mejoras en rendimiento de búsqueda o reducciones de costos logradas'
    ],
    exampleBullets: [
      'Gestioné clúster Elasticsearch de 25 nodos ingiriendo 2TB/día de logs de más de 300 servicios con tiempos de respuesta de búsqueda inferiores a un segundo',
      'Implementé políticas de gestión de ciclo de vida de índices reduciendo costos de almacenamiento en un 45% mientras mantenía 90 días de búsqueda hot y 1 año de retención cold',
      'Diseñé arquitectura de pipeline Logstash procesando 100K eventos/segundo con patrones grok personalizados para 15 formatos de log de aplicaciones',
      'Construí dashboards y alertas de Kibana para operaciones de seguridad, habilitando detección de patrones de acceso anómalos con SLA de alerta de 5 minutos'
    ],
    faqs: [
      { question: '¿Sigue siendo competitivo el ELK Stack con herramientas comerciales?', answer: 'Sí. El ELK Stack sigue siendo la solución de gestión de logs de código abierto más popular y continúa evolucionando con características como Elastic Agent, gestión Fleet y Elastic Security. Mientras las herramientas comerciales como Splunk y Datadog ofrecen gestión más fácil, ELK proporciona control total, sin precios por GB y una comunidad masiva.' },
      { question: '¿Cuál es el mayor desafío con el ELK Stack?', answer: 'La complejidad operativa es el desafío principal. La gestión de clústeres Elasticsearch, incluyendo dimensionado de shards, planificación de capacidad, optimización de mappings y actualizaciones, requiere experiencia dedicada. Las organizaciones también deben manejar la confiabilidad del pipeline de datos con Logstash/Beats y gestionar los costos de almacenamiento a medida que los volúmenes de logs crecen.' },
      { question: '¿Cómo demuestro experiencia en ELK en mi currículum?', answer: 'Cuantifica el tamaño de tu clúster (nodos, ingestión diaria, volumen de datos), destaca la optimización de consultas de Elasticsearch y habilidades de gestión de clúster, menciona pipelines específicos de Logstash construidos y muestra dashboards de Kibana creados. Incluye diseño de políticas ILM, configuraciones cross-cluster y logros de ajuste de rendimiento.' }
    ]
  },
  'new-relic': {
    slug: 'new-relic',
    title: 'New Relic',
    description: `New Relic es una plataforma de observabilidad full-stack que proporciona monitoreo de rendimiento de aplicaciones (APM), monitoreo de infraestructura, gestión de logs, monitoreo de navegador, monitoreo sintético y tracing distribuido. Construida sobre la New Relic Telemetry Data Platform (NRDB), ingiere métricas, eventos, logs y trazas en un modelo de datos unificado consultado a través de NRQL (New Relic Query Language).\n\nLos agentes APM de New Relic instrumentan automáticamente aplicaciones en Java, .NET, Node.js, Python, Ruby, PHP y Go, proporcionando visibilidad a nivel de código del rendimiento de transacciones, tasas de error y consultas de base de datos. Los dashboards de New Relic One habilitan visualizaciones personalizadas, y New Relic Alerts proporciona alertas basadas en condiciones con múltiples canales de notificación.\n\nEl uso avanzado de New Relic incluye instrumentación personalizada con la API y SDK de New Relic, construcción de aplicaciones New Relic One (Nerdpacks) usando React, implementación de tracing distribuido entre microservicios, diseño de consultas NRQL eficientes para analítica técnica y de negocio, e integración de New Relic con pipelines CI/CD para marcadores de despliegue y detección de regresiones de rendimiento.`,
    whyImportant: `New Relic es una de las plataformas APM líderes, utilizada por miles de organizaciones para visibilidad del rendimiento de aplicaciones. Su reciente cambio a un modelo de precios basado en consumo con un generoso tier gratuito la ha hecho accesible para organizaciones de todos los tamaños, impulsando mayor adopción.\n\nLas habilidades de APM son esenciales para ingenieros de software y SREs responsables de la confiabilidad de aplicaciones. Los insights profundos a nivel de código de New Relic ayudan a los equipos a identificar cuellos de botella de rendimiento, rastrear errores en sistemas distribuidos y correlacionar el comportamiento de aplicaciones con métricas de infraestructura.`,
    keywords: ['habilidades en New Relic', 'currículum New Relic', 'monitoreo APM', 'observabilidad New Relic'],
    searchIntents: ['cómo agregar New Relic al currículum', 'habilidades de APM New Relic', 'New Relic vs Datadog'],
    relatedSkills: ['Datadog', 'Prometheus', 'Grafana', 'Splunk', 'ELK Stack', 'Ingeniería de Confiabilidad de Sitios'],
    professionSlugs: ['ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-software', 'ingeniero-devops', 'desarrollador-backend', 'ingeniero-de-plataforma', 'desarrollador-full-stack'],
    atsKeywords: ['New Relic', 'New Relic One', 'NRQL', 'APM', 'application performance monitoring', 'New Relic Alerts', 'distributed tracing', 'New Relic Infrastructure', 'synthetic monitoring'],
    resumeTips: [
      'Especifica el número de aplicaciones y servicios monitoreados con New Relic',
      'Menciona competencia en NRQL y creación de dashboards personalizados',
      'Destaca instrumentación APM y tracing personalizado de transacciones',
      'Incluye configuración de alertas e integraciones de flujo de trabajo de respuesta a incidentes',
      'Cuantifica mejoras de rendimiento identificadas a través de insights de New Relic'
    ],
    exampleBullets: [
      'Instrumenté más de 40 microservicios con New Relic APM, proporcionando tracing distribuido de extremo a extremo que redujo el tiempo medio de resolución en un 55%',
      'Construí 25 dashboards NRQL personalizados correlacionando rendimiento de aplicaciones con métricas de negocio, habilitando planificación de capacidad basada en datos',
      'Configuré monitores sintéticos de New Relic para 100 endpoints críticos en 5 regiones, logrando seguimiento de disponibilidad del 99.95% con intervalos de verificación de 1 minuto',
      'Identifiqué y resolví patrón de consultas N+1 en base de datos usando trazas de transacciones de New Relic APM, mejorando el tiempo de respuesta de API en un 70% (800ms a 240ms)'
    ],
    faqs: [
      { question: '¿Cómo se compara New Relic con Datadog?', answer: 'Ambas son plataformas de observabilidad integrales. New Relic ofrece un tier gratuito generoso (100GB/mes) y precios basados en consumo, mientras que Datadog usa precios por host. New Relic históricamente ha sido más fuerte en APM, mientras que Datadog sobresale en monitoreo de infraestructura. La paridad de características está convergiendo, y la elección frecuentemente depende de la preferencia del modelo de precios.' },
      { question: '¿Es valiosa la experiencia en APM de New Relic en un currículum?', answer: 'Sí. La experiencia en plataformas APM demuestra que puedes instrumentar aplicaciones, diagnosticar problemas de rendimiento a nivel de código e implementar prácticas de observabilidad. New Relic es una de las tres principales plataformas APM, y la experiencia con ella se transfiere bien a Datadog, Dynatrace o alternativas de código abierto.' },
      { question: '¿Qué habilidades de NRQL son importantes?', answer: 'Aprende a escribir consultas usando cláusulas SELECT, FROM, WHERE, FACET, TIMESERIES y COMPARE WITH. Comprende cómo consultar datos de transacciones, errores y eventos personalizados. Las habilidades avanzadas incluyen subconsultas, funnels para análisis de flujos de usuario y crear dashboards eficientes que correlacionen múltiples tipos de datos.' }
    ]
  },
  'cloudformation': {
    slug: 'cloudformation',
    title: 'AWS CloudFormation',
    description: `AWS CloudFormation es el servicio de infraestructura como código de Amazon que te permite modelar, aprovisionar y gestionar recursos de AWS escribiendo archivos de plantilla en JSON o YAML. Las plantillas de CloudFormation definen el estado deseado de tu infraestructura AWS, y CloudFormation maneja el aprovisionamiento y configuración de recursos en el orden correcto, gestionando dependencias automáticamente.\n\nLos conceptos clave de CloudFormation incluyen stacks (una colección de recursos gestionados como una sola unidad), change sets (previsualización de cambios propuestos), nested stacks (composición modular de plantillas), stack sets (despliegue en múltiples cuentas y regiones) y drift detection (identificar cambios fuera de banda). CloudFormation soporta casi todos los servicios de AWS y se integra con AWS Service Catalog para aprovisionamiento de autoservicio gobernado.\n\nEl uso avanzado de CloudFormation incluye custom resources respaldados por funciones Lambda para extender la funcionalidad más allá de los recursos nativos, macros de CloudFormation para transformación de plantillas, CDK (Cloud Development Kit) para definir infraestructura en lenguajes de programación como TypeScript, Python o Java que sintetizan a plantillas de CloudFormation, e implementar pipelines CI/CD para despliegue de infraestructura.`,
    whyImportant: `CloudFormation es la herramienta IaC nativa de AWS y proporciona la integración más profunda con los servicios de AWS, frecuentemente soportando nuevos servicios y características antes que las herramientas de terceros. Para organizaciones comprometidas con AWS, CloudFormation asegura compatibilidad completa de servicios y aprovecha características nativas de AWS como drift detection y stack policies.\n\nMientras Terraform es más popular para escenarios multi-nube, CloudFormation sigue siendo ampliamente utilizado en organizaciones centradas en AWS y es un componente clave de las rutas de certificación AWS Solutions Architect y DevOps Engineer.`,
    keywords: ['habilidades en CloudFormation', 'currículum AWS CloudFormation', 'AWS IaC', 'plantillas CloudFormation'],
    searchIntents: ['cómo agregar CloudFormation al currículum', 'CloudFormation vs Terraform', 'mejores prácticas de CloudFormation'],
    relatedSkills: ['Amazon Web Services', 'Terraform', 'Infraestructura como Código', 'Pulumi', 'Ansible', 'CI/CD'],
    professionSlugs: ['ingeniero-de-nube', 'ingeniero-de-aws', 'ingeniero-devops', 'arquitecto-de-nube', 'arquitecto-de-soluciones', 'ingeniero-de-infraestructura'],
    atsKeywords: ['CloudFormation', 'AWS CloudFormation', 'CFN', 'CloudFormation templates', 'nested stacks', 'stack sets', 'AWS CDK', 'infrastructure as code', 'change sets', 'drift detection'],
    resumeTips: [
      'Especifica el número de plantillas de CloudFormation y recursos AWS gestionados',
      'Menciona uso de stack sets para despliegues multi-cuenta',
      'Destaca experiencia con custom resources y CDK si aplica',
      'Incluye integración CI/CD para despliegues automatizados de stacks',
      'Cuantifica reducciones de tiempo de aprovisionamiento y mejoras de consistencia de infraestructura'
    ],
    exampleBullets: [
      'Gestioné más de 150 plantillas de CloudFormation aprovisionando 1,500 recursos AWS en 12 cuentas usando stack sets con drift detection automatizado',
      'Migré al equipo de aprovisionamiento manual por AWS Console a CloudFormation, reduciendo la configuración de nuevos entornos de 3 días a 45 minutos',
      'Desarrollé custom resources de CloudFormation respaldados por Lambda para 8 integraciones de terceros no soportadas, extendiendo la cobertura IaC al 100%',
      'Implementé AWS CDK en TypeScript reemplazando 80 plantillas YAML con código de infraestructura type-safe y testeable reduciendo errores de plantillas en un 90%'
    ],
    faqs: [
      { question: '¿Debo aprender CloudFormation o Terraform?', answer: 'Si trabajas exclusivamente con AWS, CloudFormation es valioso por su profunda integración nativa y es requerido para certificaciones de AWS. Si trabajas con múltiples proveedores de nube, Terraform es más versátil. La mayoría de los profesionales de AWS se benefician de conocer ambos: CloudFormation para características nativas de AWS y Terraform para recursos multi-nube y de terceros.' },
      { question: '¿Qué es AWS CDK y debería aprenderlo?', answer: 'AWS CDK te permite definir recursos de CloudFormation usando lenguajes de programación en lugar de YAML/JSON. Sintetiza a plantillas de CloudFormation, proporcionando type safety, loops, condicionales y soporte de IDE. CDK está siendo cada vez más adoptado y vale la pena aprenderlo si prefieres código sobre plantillas.' },
      { question: '¿Cómo demuestro experiencia en CloudFormation?', answer: 'Muestra la complejidad de plantillas (nested stacks, custom resources, conditions), despliegue multi-cuenta con stack sets, integración CI/CD para infraestructura y la implementación de drift detection. Cuantifica el número de recursos gestionados y ahorros de tiempo por la automatización.' }
    ]
  },
  'pulumi': {
    slug: 'pulumi',
    title: 'Pulumi',
    description: `Pulumi es una plataforma moderna de infraestructura como código que permite a los ingenieros definir infraestructura en la nube usando lenguajes de programación de propósito general incluyendo TypeScript, Python, Go, C#, Java y YAML. A diferencia de lenguajes específicos de dominio, Pulumi aprovecha lenguajes familiares con soporte completo de IDE, verificación de tipos, marcos de pruebas y prácticas de ingeniería de software para código de infraestructura.\n\nPulumi soporta todos los proveedores principales de nube (AWS, Azure, GCP) y Kubernetes, con más de 100 proveedores disponibles. Rastrea el estado de la infraestructura a través de Pulumi Cloud (backend gestionado) o backends auto-alojados (S3, Azure Blob, GCS). La API de automatización de Pulumi permite integrar aprovisionamiento de infraestructura dentro de aplicaciones, y los Pulumi Packages permiten compartir componentes de infraestructura reutilizables.\n\nLas características avanzadas de Pulumi incluyen component resources para abstracciones de nivel superior, proveedores dinámicos para gestión personalizada de recursos, policy as code con Pulumi CrossGuard, stack references para dependencias cross-stack, gestión de secretos con encriptación automática e integración con pipelines CI/CD para despliegue automatizado de infraestructura.`,
    whyImportant: `Pulumi representa la siguiente evolución de la infraestructura como código, trayendo mejores prácticas de ingeniería de software a la gestión de infraestructura. Al usar lenguajes de programación reales, los equipos pueden aplicar pruebas unitarias, revisión de código, refactorización y patrones de composición que son difíciles o imposibles con herramientas solo declarativas.\n\nPulumi está ganando adopción rápida, particularmente entre equipos de ingeniería de software que prefieren escribir infraestructura en el mismo lenguaje que sus aplicaciones. La capacidad de usar loops, condicionales, clases y paquetes naturalmente reduce la duplicación y aumenta la mantenibilidad.`,
    keywords: ['habilidades en Pulumi', 'currículum Pulumi', 'infraestructura como código', 'Pulumi TypeScript'],
    searchIntents: ['cómo incluir Pulumi en el currículum', 'Pulumi vs Terraform', 'Pulumi para ingeniería de infraestructura'],
    relatedSkills: ['Terraform', 'Infraestructura como Código', 'CloudFormation', 'Amazon Web Services', 'Microsoft Azure', 'Google Cloud Platform', 'Kubernetes'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'ingeniero-de-plataforma', 'ingeniero-de-software', 'arquitecto-de-nube'],
    atsKeywords: ['Pulumi', 'infrastructure as code', 'IaC', 'Pulumi Cloud', 'Pulumi CrossGuard', 'Pulumi Packages', 'TypeScript IaC', 'Python IaC', 'Pulumi Automation API'],
    resumeTips: [
      'Especifica el lenguaje de programación usado con Pulumi y proveedores de nube gestionados',
      'Menciona component resources o paquetes reutilizables que hayas desarrollado',
      'Destaca pruebas unitarias e integración de código de infraestructura',
      'Incluye implementaciones de policy as code con CrossGuard',
      'Cuantifica mejoras sobre enfoques IaC anteriores'
    ],
    exampleBullets: [
      'Construí plataforma de infraestructura Pulumi en TypeScript gestionando más de 800 recursos AWS con 95% de cobertura de pruebas unitarias usando Jest',
      'Desarrollé 12 component resources reutilizables de Pulumi compartidos entre 6 equipos, reduciendo duplicación de código de infraestructura en un 60%',
      'Implementé políticas Pulumi CrossGuard aplicando guardarraíles de seguridad y costos, previniendo más de 30 despliegues de recursos no conformes por mes',
      'Migré 200 recursos de Terraform a Pulumi Python, habilitando patrones de infraestructura complejos con constructos nativos del lenguaje y reduciendo la base de código en un 40%'
    ],
    faqs: [
      { question: '¿Debo aprender Pulumi o Terraform?', answer: 'Terraform tiene mayor cuota de mercado y más ofertas de trabajo actualmente. Pulumi está creciendo rápidamente y es preferido por equipos que valoran prácticas de ingeniería de software para infraestructura. Aprender Terraform primero es más seguro para la amplitud del mercado laboral, pero agregar Pulumi demuestra fluidez moderna en IaC. Los conceptos se transfieren entre ambas herramientas.' },
      { question: '¿Qué lenguajes funcionan mejor con Pulumi?', answer: 'TypeScript es la opción más popular debido al tipado fuerte y amplia adopción. Python es segundo, aprovechando la familiaridad de equipos de ingeniería de datos y ML. Go es preferido para equipos de infraestructura que ya usan Go. Elige el lenguaje que tu equipo mejor conozca; los beneficios de Pulumi vienen de usar un lenguaje familiar, no uno específico.' },
      { question: '¿Puedo listar Pulumi en mi currículum si la mayoría de los trabajos piden Terraform?', answer: 'Sí. Lista ambos si los conoces. Pulumi demuestra habilidades modernas de IaC y fundamentos sólidos de programación. Incluso en roles enfocados en Terraform, la experiencia en Pulumi muestra que comprendes los principios de IaC profundamente y puedes evaluar y adoptar nuevas herramientas efectivamente.' }
    ]
  },
  'vagrant': {
    slug: 'vagrant',
    title: 'Vagrant',
    description: `Vagrant es una herramienta de código abierto de HashiCorp para construir y gestionar entornos de desarrollo virtuales portátiles y reproducibles. Proporciona un archivo de configuración simple y declarativo (Vagrantfile) para definir máquinas virtuales, su aprovisionamiento, redes y carpetas sincronizadas, permitiendo a los desarrolladores crear entornos de desarrollo consistentes que reflejan producción.\n\nVagrant abstrae múltiples proveedores de virtualización incluyendo VirtualBox, VMware, Hyper-V, Docker y proveedores de nube como AWS y Azure. El flujo de trabajo de Vagrant es simple: vagrant up crea y aprovisiona el entorno, vagrant ssh se conecta a él, vagrant halt lo detiene y vagrant destroy lo elimina. Las boxes de Vagrant son imágenes base pre-construidas compartidas a través de Vagrant Cloud.\n\nLas características avanzadas de Vagrant incluyen entornos multi-máquina para simular sistemas distribuidos, integración de aprovisionadores (Shell, Ansible, Chef, Puppet, Salt), desarrollo de plugins, creación y versionado de boxes personalizadas y Vagrant Triggers para automatizar acciones durante eventos del ciclo de vida.`,
    whyImportant: `Aunque los contenedores han reducido la dominancia de Vagrant para entornos de desarrollo, Vagrant sigue siendo valioso para escenarios que requieren entornos VM completos como probar módulos de kernel, ejecutar múltiples sistemas operativos, simular topologías de red complejas y desarrollar automatización de infraestructura como roles de Ansible o Puppet.\n\nLas habilidades en Vagrant demuestran comprensión de la reproducibilidad de entornos y principios de automatización de infraestructura. Para equipos que aún no están contenedorizados, Vagrant proporciona un puente crítico hacia entornos de desarrollo consistentes.`,
    keywords: ['habilidades en Vagrant', 'currículum Vagrant', 'entornos de desarrollo virtuales', 'Vagrant HashiCorp'],
    searchIntents: ['cómo incluir Vagrant en el currículum', 'Vagrant vs Docker para desarrollo', 'habilidades de Vagrant para DevOps'],
    relatedSkills: ['Docker', 'Ansible', 'VirtualBox', 'VMware', 'Packer', 'Administración Linux', 'Gestión de Configuración'],
    professionSlugs: ['ingeniero-devops', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'ingeniero-de-software', 'ingeniero-de-automatizacion'],
    atsKeywords: ['Vagrant', 'Vagrantfile', 'Vagrant boxes', 'VirtualBox', 'virtual machines', 'development environments', 'HashiCorp', 'provisioning', 'reproducible environments'],
    resumeTips: [
      'Especifica los tipos de entornos construidos con Vagrant y su complejidad',
      'Menciona integraciones de aprovisionadores usadas como Ansible o scripts Shell',
      'Destaca configuraciones multi-máquina para simulación de sistemas distribuidos',
      'Incluye experiencia de creación y mantenimiento de boxes personalizadas',
      'Cuantifica mejoras en tiempo de incorporación de desarrolladores'
    ],
    exampleBullets: [
      'Creé entorno de desarrollo basado en Vagrant reduciendo el tiempo de incorporación de nuevos desarrolladores de 2 días a 30 minutos con aprovisionamiento completamente automatizado',
      'Construí entorno Vagrant multi-máquina simulando clúster de producción de 5 nodos para pruebas y validación de automatización de infraestructura',
      'Desarrollé boxes Vagrant personalizadas con Packer para 3 variantes de SO, versionadas y distribuidas vía registro interno de Vagrant Cloud',
      'Integré Vagrant con aprovisionamiento Ansible permitiendo a los desarrolladores probar playbooks de infraestructura localmente antes de desplegar a staging'
    ],
    faqs: [
      { question: '¿Sigue siendo relevante Vagrant con Docker disponible?', answer: 'Vagrant y Docker sirven propósitos diferentes. Vagrant proporciona entornos VM completos, necesarios para probar cambios a nivel de SO, ejecutar múltiples tipos de SO, simular topologías de red y desarrollar automatización de infraestructura. Docker es mejor para contenedorización de aplicaciones. Muchos equipos usan ambos: Docker para apps, Vagrant para pruebas de infraestructura.' },
      { question: '¿Debo listar Vagrant en mi currículum?', answer: 'Lístalo si tienes experiencia significativa, particularmente en automatización de infraestructura o escenarios de pruebas multi-máquina. Aunque Docker ha reemplazado a Vagrant para muchos casos de uso, la experiencia en Vagrant demuestra fundamentos de automatización y todavía se usa en muchas organizaciones para gestión de entornos de desarrollo.' },
      { question: '¿Cómo ayuda Vagrant con la automatización de infraestructura?', answer: 'Vagrant habilita pruebas locales de playbooks de Ansible, cookbooks de Chef, manifiestos de Puppet y scripts Shell contra VMs reales antes de desplegar a la nube o producción. Este ciclo de retroalimentación rápida es invaluable para desarrollar y depurar automatización de infraestructura de forma segura.' }
    ]
  },
  'packer': {
    slug: 'packer',
    title: 'Packer',
    description: `Packer es una herramienta de código abierto de HashiCorp para crear imágenes de máquina idénticas para múltiples plataformas desde una única configuración fuente. Automatiza la creación de AMIs (AWS), imágenes de VM Azure, imágenes GCP, imágenes Docker, plantillas VMware y más, asegurando que la infraestructura inicie desde imágenes base consistentes, pre-construidas y probadas.\n\nLas configuraciones de Packer (formato HCL2) definen builders (plataformas objetivo), provisioners (pasos de configuración como Shell, Ansible, Chef) y post-processors (acciones después de la construcción como subir a registros). El patrón de infraestructura inmutable que Packer habilita significa que los servidores nunca se modifican después del despliegue; las actualizaciones se despliegan como nuevas imágenes reemplazando las anteriores.\n\nEl uso avanzado de Packer incluye construir imágenes para múltiples plataformas simultáneamente, implementar pruebas de imágenes con herramientas como InSpec o Goss, crear pipelines de imágenes en CI/CD, usar plugins de Packer para builders personalizados, gestionar el ciclo de vida y deprecación de imágenes, e integrar imágenes construidas con Packer con Terraform para aprovisionamiento automatizado de infraestructura.`,
    whyImportant: `Packer es un habilitador clave de infraestructura inmutable, un patrón que mejora dramáticamente la confiabilidad y seguridad asegurando que cada servidor inicie desde un estado conocido y probado. Las organizaciones que adoptan este enfoque experimentan menos problemas de drift de configuración, escalado más rápido y despliegues más consistentes.\n\nLas habilidades en Packer son valiosas para equipos que construyen golden images para infraestructura en la nube y on-premises. La herramienta cierra la brecha entre gestión de configuración (construir imágenes) y aprovisionamiento de infraestructura (desplegar imágenes con Terraform), formando un pipeline completo de automatización de infraestructura.`,
    keywords: ['habilidades en Packer', 'currículum Packer', 'construcción de imágenes de máquina', 'infraestructura inmutable'],
    searchIntents: ['cómo agregar Packer al currículum', 'construcción de imágenes con Packer para DevOps', 'Packer vs Docker'],
    relatedSkills: ['Terraform', 'Ansible', 'Vagrant', 'Amazon Web Services', 'VMware', 'Docker', 'Infraestructura como Código'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'ingeniero-de-plataforma', 'administrador-de-sistemas'],
    atsKeywords: ['Packer', 'HashiCorp Packer', 'machine images', 'AMI', 'golden images', 'immutable infrastructure', 'image pipeline', 'HCL', 'builders', 'provisioners'],
    resumeTips: [
      'Especifica las plataformas y tipos de imágenes construidos con Packer',
      'Menciona enfoques de pruebas y validación de imágenes',
      'Destaca integración CI/CD para construcciones automatizadas de imágenes',
      'Incluye escala de uso de imágenes como imágenes que alimentan grupos de auto-escalado',
      'Cuantifica mejoras por la adopción de infraestructura inmutable'
    ],
    exampleBullets: [
      'Construí pipeline de imágenes con Packer produciendo AMIs hardened para 8 tipos de aplicación, usadas por más de 200 instancias EC2 en grupos de auto-escalado',
      'Implementé pruebas automatizadas de imágenes con validación Goss, detectando más de 15 problemas de configuración antes del despliegue a producción trimestralmente',
      'Reduje el tiempo de arranque de instancias de 12 minutos (con aprovisionamiento en runtime) a 90 segundos usando imágenes pre-construidas con Packer',
      'Creé builds Packer multi-plataforma produciendo AMI de AWS, imagen de VM Azure y contenedor Docker desde un único archivo de configuración'
    ],
    faqs: [
      { question: '¿Cómo se relaciona Packer con Terraform?', answer: 'Packer y Terraform son herramientas complementarias de HashiCorp. Packer construye imágenes de máquina (ej. AMIs) y Terraform despliega infraestructura usando esas imágenes. Juntos implementan infraestructura inmutable: Packer crea imágenes probadas y versionadas, y Terraform aprovisiona instancias desde esas imágenes.' },
      { question: '¿Debo usar Packer o Docker para despliegue de aplicaciones?', answer: 'Los contenedores Docker son preferidos para despliegue de aplicaciones en la mayoría de los entornos modernos. Packer es mejor para crear imágenes base a nivel de VM, particularmente para organizaciones que ejecutan VMs tradicionales, construyen AMIs personalizadas para grupos de auto-escalado o preparan imágenes de SO hardened sobre las que los contenedores se ejecutan.' },
      { question: '¿Es valiosa la experiencia en Packer en un currículum DevOps?', answer: 'Sí, particularmente para roles que involucran infraestructura de nube, patrones de infraestructura inmutable o hardening de seguridad. La experiencia en Packer demuestra comprensión del patrón de golden image y automatización de infraestructura. Se complementa bien con habilidades de Terraform y Ansible para una historia completa de automatización.' }
    ]
  },
  'consul': {
    slug: 'consul',
    title: 'HashiCorp Consul',
    description: `Consul es una plataforma de redes de servicios distribuida de HashiCorp que proporciona descubrimiento de servicios, configuración, segmentación y capacidades de mesh en cualquier plataforma de runtime y nube. Permite a los servicios descubrirse mutuamente a través de un registro central, comunicarse de forma segura mediante mutual TLS y distribuir configuración a través de un almacén clave-valor.\n\nLa arquitectura de Consul usa un modelo servidor-agente donde los servidores Consul mantienen el catálogo y los agentes se ejecutan en cada nodo. Las características clave incluyen descubrimiento de servicios basado en DNS y HTTP, verificación de salud con sondas personalizables, service mesh con proxies sidecar (Envoy), intentions para autorización servicio-a-servicio y un almacén KV distribuido. Consul Connect proporciona capacidades de service mesh con mTLS automático.\n\nLas características avanzadas de Consul incluyen federación multi-datacenter para descubrimiento global de servicios, Consul Terraform Sync (CTS) para automatización de infraestructura de red activada por cambios en servicios, sistema ACL para control de acceso detallado, prepared queries para enrutamiento DNS inteligente e integración con Vault para gestión dinámica de certificados TLS.`,
    whyImportant: `A medida que las organizaciones adoptan microservicios y arquitecturas multi-nube, el descubrimiento de servicios y la comunicación segura servicio-a-servicio se convierten en necesidades críticas de infraestructura. Consul aborda estos desafíos con una plataforma que funciona en Kubernetes, VMs y bare metal, haciéndolo valioso en entornos heterogéneos.\n\nLas habilidades en Consul demuestran experiencia en redes de sistemas distribuidos, arquitectura de service mesh y patrones de infraestructura modernos. La herramienta es particularmente valiosa en organizaciones que usan el ecosistema HashiCorp junto con Terraform, Vault y Nomad.`,
    keywords: ['habilidades en Consul', 'currículum HashiCorp Consul', 'descubrimiento de servicios', 'service mesh'],
    searchIntents: ['cómo agregar Consul al currículum', 'descubrimiento de servicios con Consul para DevOps', 'Consul vs descubrimiento de servicios Kubernetes'],
    relatedSkills: ['Vault', 'Terraform', 'Service Mesh', 'Istio', 'Kubernetes', 'Arquitectura de Microservicios', 'Fundamentos de Redes'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-infraestructura', 'ingeniero-de-confiabilidad-de-sitios', 'arquitecto-de-nube'],
    atsKeywords: ['Consul', 'HashiCorp Consul', 'service discovery', 'service mesh', 'Consul Connect', 'KV store', 'health checks', 'mTLS', 'multi-datacenter', 'service catalog'],
    resumeTips: [
      'Especifica el número de servicios y nodos gestionados en Consul',
      'Menciona federación multi-datacenter si aplica',
      'Destaca implementaciones de service mesh y Consul Connect',
      'Incluye uso del almacén KV para gestión dinámica de configuración',
      'Cuantifica mejoras en confiabilidad y latencia del descubrimiento de servicios'
    ],
    exampleBullets: [
      'Desplegué clúster Consul gestionando descubrimiento de servicios para más de 200 microservicios en 3 datacenters con verificación de salud automatizada y failover',
      'Implementé service mesh Consul Connect proporcionando mTLS para toda la comunicación inter-servicio, eliminando el 100% del tráfico interno en texto plano',
      'Configuré Consul Terraform Sync automatizando actualizaciones de reglas de firewall basadas en cambios de servicios, reduciendo el tiempo de solicitud de cambios de red de horas a segundos',
      'Migré de descubrimiento basado en DNS estático a Consul, mejorando el tiempo de failover de servicios de 5 minutos a menos de 10 segundos'
    ],
    faqs: [
      { question: '¿Es necesario Consul si uso Kubernetes?', answer: 'Kubernetes proporciona descubrimiento de servicios incorporado, pero Consul agrega valor en entornos multi-plataforma (VMs + Kubernetes), escenarios multi-clúster y cuando necesitas capacidades de service mesh en infraestructura heterogénea. Para despliegues solo de Kubernetes, Consul es opcional pero proporciona service mesh mejorado y características multi-clúster.' },
      { question: '¿Cómo se compara Consul con Istio?', answer: 'Ambos proporcionan capacidades de service mesh, pero difieren en alcance. Istio es nativo de Kubernetes y proporciona gestión de tráfico y observabilidad más ricas para cargas de trabajo K8s. Consul funciona en cualquier plataforma (K8s, VMs, bare metal) y se integra con el ecosistema HashiCorp. Elige Consul para multi-plataforma, Istio para características profundas de Kubernetes.' },
      { question: '¿Qué habilidades de Consul son más valiosas?', answer: 'Configuración de descubrimiento de servicios, configuración de service mesh Consul Connect, federación multi-datacenter, gestión de políticas ACL e integración con Terraform y Vault. Demostrar experiencia operativa con gestión de clústeres Consul, actualizaciones y resolución de problemas es altamente valorado.' }
    ]
  },
  'vault': {
    slug: 'vault',
    title: 'HashiCorp Vault',
    description: `Vault es una plataforma de gestión de secretos y protección de datos de HashiCorp que proporciona una interfaz unificada para gestionar secretos, encriptar datos y controlar el acceso a información sensible. Centraliza el almacenamiento de secretos, genera credenciales dinámicas, encripta datos en tránsito y en reposo, y proporciona registro de auditoría detallado para cumplimiento.\n\nLa arquitectura de Vault incluye múltiples motores de secretos (KV, databases, AWS, PKI, transit), métodos de autenticación (LDAP, OIDC, Kubernetes, AWS IAM, AppRole) y un sistema de políticas para control de acceso detallado. Los secretos dinámicos se generan bajo demanda con revocación automática, eliminando credenciales de larga duración. El motor de secretos transit proporciona encriptación como servicio sin exponer claves de encriptación.\n\nLas características avanzadas de Vault incluyen auto-unseal con proveedores de KMS en la nube, replicación para despliegues multi-datacenter, políticas Sentinel para gobernanza, inyección de sidecar agente para Kubernetes, namespaces para aislamiento multi-tenant y ajuste de rendimiento mediante caché y response wrapping.`,
    whyImportant: `La gestión de secretos es una preocupación de seguridad crítica para toda organización, y Vault es la plataforma dedicada de gestión de secretos más ampliamente adoptada. Elimina secretos hardcoded, proporciona registros de auditoría para cumplimiento y genera credenciales dinámicas de corta duración que reducen significativamente el radio de impacto de brechas de seguridad.\n\nLas habilidades en Vault son altamente valoradas en roles de DevOps, seguridad e ingeniería de plataforma. A medida que las organizaciones adoptan modelos de seguridad zero-trust y enfrentan requisitos de cumplimiento crecientes, la gestión centralizada de secretos se convierte en infraestructura no negociable.`,
    keywords: ['habilidades en Vault', 'currículum HashiCorp Vault', 'gestión de secretos', 'seguridad Vault'],
    searchIntents: ['cómo agregar Vault al currículum', 'HashiCorp Vault para DevOps', 'mejores prácticas de gestión de secretos'],
    relatedSkills: ['Gestión de Identidad y Acceso', 'Consul', 'Terraform', 'Kubernetes', 'Ingeniero de Seguridad', 'Infraestructura como Código'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-seguridad', 'ingeniero-de-plataforma', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'ingeniero-de-confiabilidad-de-sitios'],
    atsKeywords: ['HashiCorp Vault', 'Vault', 'secrets management', 'dynamic secrets', 'encryption as a service', 'PKI', 'transit engine', 'AppRole', 'Vault Agent', 'secret engines', 'auto-unseal'],
    resumeTips: [
      'Especifica el número de secretos, aplicaciones y equipos servidos por tu despliegue de Vault',
      'Menciona motores de secretos y métodos de autenticación específicos configurados',
      'Destaca implementación de secretos dinámicos reemplazando credenciales estáticas',
      'Incluye despliegues de motores de encriptación PKI o transit',
      'Cuantifica mejoras de seguridad como frecuencia de rotación de credenciales y cobertura de auditoría'
    ],
    exampleBullets: [
      'Desplegué clúster HA de HashiCorp Vault gestionando más de 10,000 secretos para 150 aplicaciones con auto-unseal vía AWS KMS y cero tiempo de inactividad no planificado',
      'Implementé credenciales dinámicas de base de datos vía Vault reduciendo la vida útil de credenciales de permanente a 1 hora, eliminando riesgo de credenciales obsoletas para 30 bases de datos',
      'Construí infraestructura PKI con Vault emitiendo más de 50,000 certificados TLS anualmente con rotación automatizada, reemplazando gestión manual de certificados',
      'Migré más de 500 secretos hardcoded de configuraciones de aplicaciones a Vault con inyección de sidecar en Kubernetes, logrando 100% de centralización de secretos en 3 meses'
    ],
    faqs: [
      { question: '¿Por qué debo aprender Vault en lugar de gestores de secretos nativos de la nube?', answer: 'Las opciones nativas de la nube (AWS Secrets Manager, Azure Key Vault) funcionan bien para entornos de una sola nube. Vault proporciona una solución unificada en todas las plataformas, generación de secretos dinámicos, encriptación como servicio y PKI, características que las herramientas nativas de la nube carecen o implementan de manera diferente. Vault es el estándar para organizaciones con infraestructura multi-nube o híbrida.' },
      { question: '¿Es difícil aprender Vault?', answer: 'El uso básico de Vault (secretos KV, políticas simples) es sencillo. Las características avanzadas como secretos dinámicos, infraestructura PKI y políticas Sentinel requieren aprendizaje más profundo. Comienza con el motor KV y autenticación AppRole, luego expande a secretos dinámicos y encriptación transit. HashiCorp proporciona excelentes tutoriales.' },
      { question: '¿Cómo demuestro experiencia en Vault en mi currículum?', answer: 'Detalla los motores de secretos configurados (KV, database, AWS, PKI, transit), métodos de autenticación implementados, complejidad de políticas, escala de despliegue y logros operacionales. Cuantifica mejoras de seguridad como frecuencia de rotación de credenciales, porcentaje de centralización de secretos y resultados de auditorías de cumplimiento.' }
    ]
  },
  'linux-administration': {
    slug: 'administracion-linux',
    title: 'Administración de Linux',
    description: `La administración de Linux abarca las habilidades necesarias para instalar, configurar, mantener y solucionar problemas en sistemas operativos basados en Linux en entornos de servidores. Esto incluye gestión de usuarios y grupos, administración de sistemas de archivos, gestión de procesos, gestión de paquetes, configuración de servicios con systemd, scripting en shell (Bash), ajuste del kernel, gestión de almacenamiento (LVM, RAID) y configuración de redes.\n\nLa administración moderna de Linux se extiende a entornos contenedorizados, donde comprender namespaces de Linux, cgroups, stacks de red y módulos de seguridad (SELinux, AppArmor) es esencial para ejecutar cargas de trabajo de Docker y Kubernetes. Las distribuciones comúnmente usadas en entornos empresariales incluyen Red Hat Enterprise Linux (RHEL), Ubuntu Server, CentOS Stream, Rocky Linux y Amazon Linux.\n\nLas habilidades avanzadas de Linux incluyen ajuste de rendimiento (programación de CPU, gestión de memoria, optimización de I/O), hardening de seguridad (configuración de firewall, hardening de SSH, módulos PAM, registro de auditoría), clustering de alta disponibilidad con Pacemaker/Corosync, gestión de módulos del kernel y automatización de tareas de administración usando scripting y herramientas de gestión de configuración.`,
    whyImportant: `Linux alimenta más del 90% de la infraestructura de la nube, la mayoría de los servidores web, todos los dispositivos Android y la mayoría de las supercomputadoras. Es la base sobre la cual se construyen prácticamente todas las tecnologías modernas de DevOps, nube y contenedores. Sin habilidades sólidas en Linux, es casi imposible ser efectivo en roles de DevOps, SRE, ingeniería de nube o desarrollo backend.\n\nLas habilidades de administración de Linux proporcionan la comprensión fundamental de sistemas operativos, redes y seguridad que sustenta todas las habilidades de infraestructura de nivel superior. Las certificaciones RHCSA y RHCE siguen siendo de las credenciales más respetadas en administración de sistemas.`,
    keywords: ['habilidades de administración Linux', 'currículum Linux', 'sysadmin Linux', 'habilidades RHEL'],
    searchIntents: ['cómo incluir habilidades de Linux en el currículum', 'habilidades de Linux para DevOps', 'certificaciones de Linux para la carrera'],
    relatedSkills: ['Docker', 'Kubernetes', 'Ansible', 'Fundamentos de Redes', 'Windows Server', 'Gestión de Firewalls', 'Gestión de Configuración'],
    professionSlugs: ['administrador-de-sistemas', 'ingeniero-devops', 'ingeniero-de-confiabilidad-de-sitios', 'ingeniero-de-infraestructura', 'ingeniero-de-nube', 'ingeniero-de-redes', 'desarrollador-backend'],
    atsKeywords: ['Linux', 'Linux administration', 'RHEL', 'Ubuntu', 'CentOS', 'Bash scripting', 'systemd', 'SELinux', 'LVM', 'iptables', 'SSH', 'kernel tuning'],
    resumeTips: [
      'Especifica las distribuciones Linux con las que tienes experiencia en producción',
      'Menciona la escala de entornos Linux gestionados (conteo de servidores)',
      'Destaca áreas específicas como ajuste de rendimiento, hardening de seguridad o alta disponibilidad',
      'Incluye certificaciones Linux como RHCSA, RHCE o LPIC',
      'Lista enfoques de automatización usados para tareas de administración Linux',
      'Detalla experiencia de scripting shell y complejidad de scripts escritos'
    ],
    exampleBullets: [
      'Administré flota de más de 1,200 servidores RHEL y Ubuntu con 99.95% de uptime mediante monitoreo proactivo y parcheo automatizado',
      'Implementé estándares de hardening de seguridad Linux (benchmarks CIS) en 500 servidores, logrando 98% de puntuación de cumplimiento en auditorías de seguridad',
      'Desarrollé scripts de automatización Bash reduciendo tareas rutinarias de administración en un 70%, ahorrando 20 horas/semana al equipo de operaciones',
      'Optimicé parámetros del kernel Linux y configuración del programador de I/O, mejorando el rendimiento del servidor de base de datos en un 35% en cargas de trabajo de alto tráfico',
      'Construí clúster Linux de alta disponibilidad usando Pacemaker/Corosync para aplicaciones financieras críticas con failover automatizado en menos de 30 segundos'
    ],
    faqs: [
      { question: '¿Qué distribución Linux debo aprender?', answer: 'Para carreras empresariales, aprende RHEL/CentOS/Rocky Linux ya que Red Hat domina el Linux empresarial. Ubuntu Server es excelente para trabajo en la nube y DevOps y es la distribución más popular en AWS. Las habilidades centrales (comandos, sistema de archivos, redes, systemd) se transfieren entre distribuciones. Comienza con la que tus empleadores objetivo más usen.' },
      { question: '¿Qué tan importante es Linux para la nube y DevOps?', answer: 'Críticamente importante. Más del 90% de las cargas de trabajo en la nube ejecutan Linux. Cada contenedor Docker, nodo de Kubernetes y agente CI/CD típicamente ejecuta Linux. No puedes ser efectivo en DevOps o ingeniería de nube sin fundamentos sólidos de Linux; es la habilidad más fundamental en el campo.' },
      { question: '¿Qué habilidades de Linux son más importantes para mi currículum?', answer: 'Enfócate en: competencia en línea de comandos, scripting Bash, gestión de servicios systemd, gestión de usuarios/permisos, redes (iptables, routing), gestión de paquetes, análisis de logs, resolución de problemas de rendimiento y hardening de seguridad. Para roles DevOps, agrega habilidades relevantes de contenedores como namespaces, cgroups y sistemas de archivos overlay.' }
    ]
  },
  'windows-server': {
    slug: 'windows-server',
    title: 'Administración de Windows Server',
    description: `La administración de Windows Server cubre la instalación, configuración y gestión del sistema operativo de servidor de Microsoft utilizado extensivamente en entornos empresariales. Las responsabilidades clave incluyen servicios de dominio Active Directory (AD), gestión de Group Policy, servicios DNS y DHCP, gestión de servidor de archivos y almacenamiento, administración del servidor web IIS, Windows Server Update Services (WSUS) y automatización con PowerShell.\n\nLas versiones de Windows Server incluyen 2016, 2019 y 2022, con opciones de instalación Server Core (GUI mínima) y Desktop Experience. La administración moderna de Windows Server involucra virtualización Hyper-V, Windows Admin Center para gestión remota, Desired State Configuration (DSC) para gestión de configuración e integración con Azure a través de Azure Arc y Azure AD Connect.\n\nLas habilidades avanzadas de Windows Server incluyen diseño de bosques y confianzas de Active Directory, configuración avanzada de Group Policy, Windows Failover Clustering, Storage Spaces Direct (S2D), despliegue de Remote Desktop Services, certificate services (AD CS) y planificación de migración para modernizar infraestructura Windows legacy hacia entornos de nube o híbridos.`,
    whyImportant: `Windows Server alimenta una porción significativa de la infraestructura empresarial, particularmente en organizaciones que usan el ecosistema de productos de Microsoft. Active Directory sigue siendo el sistema de gestión de identidades dominante en empresas, y muchas aplicaciones de línea de negocio se ejecutan exclusivamente en Windows Server.\n\nLas habilidades de administración de Windows Server son esenciales para entornos de nube híbrida donde las organizaciones mantienen AD on-premises mientras se integran con Azure AD. La demanda de profesionales que puedan gestionar y modernizar infraestructura Windows Server permanece fuerte en TI empresarial.`,
    keywords: ['habilidades en Windows Server', 'currículum Windows Server', 'Active Directory', 'administración Windows'],
    searchIntents: ['cómo agregar Windows Server al currículum', 'habilidades de Windows Server para trabajos de TI', 'certificaciones de Windows Server'],
    relatedSkills: ['Microsoft Azure', 'Hyper-V', 'Gestión de Identidad y Acceso', 'Fundamentos de Redes', 'Administración Linux', 'VMware'],
    professionSlugs: ['administrador-de-sistemas', 'ingeniero-de-infraestructura', 'especialista-en-soporte-de-ti', 'ingeniero-de-redes', 'gerente-de-ti', 'ingeniero-de-nube'],
    atsKeywords: ['Windows Server', 'Active Directory', 'Group Policy', 'PowerShell', 'IIS', 'WSUS', 'DNS', 'DHCP', 'Hyper-V', 'Windows Failover Clustering', 'Azure AD Connect'],
    resumeTips: [
      'Especifica versiones de Windows Server y el número de servidores gestionados',
      'Destaca la escala de Active Directory incluyendo conteo de usuarios, dominios y bosques',
      'Menciona scripts de automatización PowerShell y su impacto',
      'Incluye experiencia de integración de nube híbrida con Azure',
      'Cuantifica uptime, mejoras de seguridad o ganancias de eficiencia de administración'
    ],
    exampleBullets: [
      'Gestioné infraestructura Windows Server de más de 400 servidores en 3 dominios Active Directory sirviendo a 8,000 usuarios con 99.9% de uptime',
      'Diseñé marco de Group Policy de Active Directory con más de 200 políticas aplicando líneas base de seguridad y requisitos de cumplimiento',
      'Automaticé tareas de administración de Windows Server con scripts PowerShell, reduciendo carga de trabajo manual en 15 horas/semana',
      'Implementé Azure AD Connect para identidad híbrida, habilitando SSO para 5,000 usuarios entre AD on-premises y Microsoft 365',
      'Migré 60 instancias de Windows Server 2012 R2 a Windows Server 2022 con cero tiempo de inactividad usando metodología de actualización progresiva'
    ],
    faqs: [
      { question: '¿Siguen siendo demandadas las habilidades de Windows Server?', answer: 'Sí. Aunque Linux domina las cargas de trabajo en la nube, Windows Server sigue siendo esencial en entornos empresariales que ejecutan Active Directory, SQL Server, Exchange, SharePoint y aplicaciones .NET. Las estrategias de nube híbrida con Azure aseguran demanda continua de profesionales de Windows Server que puedan tender puentes entre on-premises y la nube.' },
      { question: '¿Debo aprender Windows Server o Linux?', answer: 'Ambos son valiosos, y muchas organizaciones necesitan profesionales con habilidades en ambos. Si apuntas a TI empresarial o entornos centrados en Microsoft, Windows Server es esencial. Para DevOps, cloud-native o entornos de startups, Linux tiene prioridad. La combinación de ambos te hace altamente versátil.' },
      { question: '¿Qué certificación de Windows Server debo buscar?', answer: 'Microsoft ha cambiado a certificaciones basadas en roles. Para Windows Server, busca AZ-800 y AZ-801 para la certificación Windows Server Hybrid Administrator Associate. Esta cubre administración tanto on-premises como integración híbrida con Azure, reflejando los requisitos empresariales modernos.' }
    ]
  },
  'vmware': {
    slug: 'vmware',
    title: 'VMware',
    description: `VMware es la plataforma de virtualización empresarial líder, proporcionando tecnología de hipervisor (ESXi), gestión centralizada (vCenter Server) y una suite integral de productos para virtualización de cómputo, virtualización de almacenamiento (vSAN), virtualización de red (NSX) y gestión de nube. VMware vSphere es la plataforma central que combina el hipervisor ESXi y vCenter para gestionar infraestructura de máquinas virtuales a escala.\n\nLas tecnologías clave de VMware incluyen vMotion para migración en vivo de VMs, DRS (Distributed Resource Scheduler) para balanceo de carga automático, HA (High Availability) para reinicio automático de VMs ante fallas, vSAN para almacenamiento hiperconvergente, NSX para redes definidas por software y Tanzu para integración con Kubernetes. VMware Cloud on AWS y Azure VMware Solution extienden VMware a nubes públicas.\n\nLas habilidades avanzadas de VMware incluyen diseñar arquitecturas vSphere para rendimiento y resiliencia, implementar clústeres extendidos vSAN, configurar micro-segmentación NSX, gestionar VMware Horizon para despliegues VDI, automatizar con PowerCLI y vRealize Orchestrator, y planificar migraciones hacia o desde VMware usando HCX.`,
    whyImportant: `VMware virtualiza la mayoría de las cargas de trabajo de centros de datos empresariales y sigue siendo la base de la mayoría de los entornos de nube privada. A pesar del cambio hacia la nube pública, muchas organizaciones mantienen inversiones significativas en VMware para cargas de trabajo que requieren alojamiento on-premises debido a latencia, cumplimiento o consideraciones de costos.\n\nLas habilidades en VMware son esenciales para ingenieros de infraestructura que trabajan en centros de datos empresariales y entornos de nube híbrida. Las certificaciones de VMware (VCP, VCAP) están entre las credenciales más reconocidas en infraestructura de TI, y la experiencia en VMware demanda salarios competitivos.`,
    keywords: ['habilidades en VMware', 'currículum VMware', 'administración vSphere', 'virtualización VMware'],
    searchIntents: ['cómo agregar VMware al currículum', 'habilidades de VMware para trabajos de infraestructura', 'valor de la certificación VMware para la carrera'],
    relatedSkills: ['Hyper-V', 'Administración Linux', 'Windows Server', 'Fundamentos de Redes', 'OpenStack', 'Microsoft Azure'],
    professionSlugs: ['ingeniero-de-infraestructura', 'administrador-de-sistemas', 'ingeniero-de-nube', 'ingeniero-de-redes', 'gerente-de-ti', 'arquitecto-de-nube'],
    atsKeywords: ['VMware', 'vSphere', 'ESXi', 'vCenter', 'vSAN', 'NSX', 'vMotion', 'DRS', 'HA', 'VMware Tanzu', 'PowerCLI', 'VMware Horizon'],
    resumeTips: [
      'Especifica versión de vSphere y tamaños de clúster gestionados incluyendo conteo de hosts y VMs',
      'Menciona tecnologías específicas de VMware usadas como vSAN, NSX o Tanzu',
      'Incluye nombres y niveles de certificaciones VMware',
      'Destaca experiencia de automatización con PowerCLI o vRealize',
      'Cuantifica ratios de consolidación, uptime y mejoras de eficiencia de costos'
    ],
    exampleBullets: [
      'Gestioné entorno VMware vSphere 8 con 50 hosts ESXi ejecutando más de 1,200 VMs logrando 99.99% de uptime de infraestructura',
      'Implementé clúster extendido vSAN en 2 centros de datos proporcionando 100TB de almacenamiento hiperconvergente con failover automático',
      'Automaticé gestión de ciclo de vida de VMs con scripts PowerCLI reduciendo tiempo de aprovisionamiento de 4 horas a 15 minutos',
      'Diseñé micro-segmentación NSX para más de 500 VMs implementando políticas de red zero-trust, pasando requisitos de auditoría PCI-DSS',
      'Lideré migración de VMware a Azure de 200 VMs usando Azure Migrate, reduciendo la huella on-premises en un 40%'
    ],
    faqs: [
      { question: '¿Todavía vale la pena aprender VMware con las tendencias de migración a la nube?', answer: 'Sí. VMware está profundamente arraigado en centros de datos empresariales y seguirá siendo relevante por años. Las estrategias de nube híbrida usando VMware Cloud on AWS, Azure VMware Solution y VMware Tanzu (Kubernetes) aseguran demanda continua. Muchas organizaciones están modernizando con VMware en lugar de migrar completamente lejos de él.' },
      { question: '¿Qué certificación de VMware debo obtener?', answer: 'Comienza con VCP-DCV (VMware Certified Professional - Data Center Virtualization). Es la certificación VMware más reconocida y cubre administración de vSphere. Los profesionales avanzados deben apuntar a VCAP-DCV (Design o Deploy) para roles de nivel de arquitecto.' },
      { question: '¿Cómo encaja VMware en DevOps moderno?', answer: 'VMware Tanzu trae Kubernetes a entornos vSphere, habilitando prácticas DevOps en infraestructura VMware. VMware NSX habilita automatización de redes, y vRealize proporciona automatización de infraestructura. Para organizaciones con inversiones significativas en VMware, estas herramientas cierran la brecha entre la infraestructura tradicional y los flujos de trabajo cloud-native.' }
    ]
  },
  'hyperv': {
    slug: 'hyperv',
    title: 'Hyper-V',
    description: `Hyper-V es la tecnología de virtualización de hardware de Microsoft integrada en Windows Server y ediciones Windows 10/11 Pro. Habilita la creación y gestión de máquinas virtuales ejecutando múltiples sistemas operativos en un único servidor físico. Como hipervisor Tipo 1 (bare-metal), Hyper-V proporciona rendimiento casi nativo y está profundamente integrado con el ecosistema de Windows Server.\n\nLas características de Hyper-V incluyen live migration para mover VMs entre hosts sin tiempo de inactividad, storage migration, redes de switch virtual, Hyper-V Replica para recuperación ante desastres, VMs protegidas para seguridad e integración con System Center Virtual Machine Manager (SCVMM) para gestión a gran escala. El soporte de virtualización anidada permite ejecutar Hyper-V dentro de Hyper-V para pruebas y desarrollo.\n\nLa administración avanzada de Hyper-V incluye diseñar clústeres de failover con Cluster Shared Volumes (CSV), implementar Storage Spaces Direct (S2D) para infraestructura hiperconvergente, configurar SET (Switch Embedded Teaming) para redundancia de red, gestionar políticas de calidad de servicio (QoS) e integrar Hyper-V con Azure Site Recovery para recuperación ante desastres híbrida.`,
    whyImportant: `Hyper-V está incluido con Windows Server sin costo de licenciamiento adicional, convirtiéndolo en una opción atractiva de virtualización para organizaciones centradas en Microsoft. Su integración estrecha con Active Directory, System Center y Azure proporciona una experiencia de gestión fluida para entornos Windows.\n\nPara organizaciones ya invertidas en licenciamiento Microsoft, Hyper-V proporciona virtualización de grado empresarial sin costos adicionales de hipervisor. Las habilidades en Hyper-V complementan la experiencia en Windows Server y Azure, formando un conjunto integral de habilidades de infraestructura Microsoft.`,
    keywords: ['habilidades en Hyper-V', 'currículum Hyper-V', 'virtualización Microsoft', 'administración Hyper-V'],
    searchIntents: ['cómo agregar Hyper-V al currículum', 'Hyper-V vs VMware', 'habilidades de Hyper-V para profesionales de TI'],
    relatedSkills: ['Windows Server', 'VMware', 'Microsoft Azure', 'Fundamentos de Redes', 'Administración Linux'],
    professionSlugs: ['administrador-de-sistemas', 'ingeniero-de-infraestructura', 'especialista-en-soporte-de-ti', 'ingeniero-de-nube', 'gerente-de-ti'],
    atsKeywords: ['Hyper-V', 'Microsoft Hyper-V', 'virtual machines', 'Failover Clustering', 'SCVMM', 'live migration', 'Hyper-V Replica', 'CSV', 'Storage Spaces Direct', 'virtualization'],
    resumeTips: [
      'Especifica la escala de tu entorno Hyper-V incluyendo conteo de hosts y VMs',
      'Menciona configuraciones de failover clustering y alta disponibilidad',
      'Destaca implementaciones de recuperación ante desastres con Hyper-V Replica o Azure Site Recovery',
      'Incluye experiencia con SCVMM para gestión a gran escala',
      'Cuantifica ratios de consolidación y ahorros de costos por virtualización'
    ],
    exampleBullets: [
      'Gestioné clúster Hyper-V con 20 hosts ejecutando más de 350 VMs soportando 3,000 usuarios con 99.95% de uptime',
      'Implementé Hyper-V Replica en 2 centros de datos proporcionando RPO menor a 5 minutos para 100 VMs críticas',
      'Diseñé clúster Storage Spaces Direct proporcionando 80TB de almacenamiento hiperconvergente, eliminando dependencia de SAN de $200K',
      'Consolidé 40 servidores físicos en 8 hosts Hyper-V logrando ratio de consolidación 5:1 y $150K de ahorro anual'
    ],
    faqs: [
      { question: '¿Debo aprender Hyper-V o VMware?', answer: 'Ambos son valiosos. VMware tiene mayor cuota de mercado y más ofertas de trabajo para roles dedicados de virtualización. Hyper-V es ideal para entornos centrados en Microsoft y está incluido con la licencia de Windows Server. Si ya trabajas con Windows Server, Hyper-V es una adición natural. Para máxima flexibilidad de carrera, aprende ambos.' },
      { question: '¿Es Hyper-V adecuado para cargas de trabajo de producción?', answer: 'Absolutamente. Hyper-V es un hipervisor maduro de grado empresarial usado por organizaciones de todos los tamaños para cargas de trabajo de producción. Con failover clustering, live migration e integración con Azure, proporciona la confiabilidad y características necesarias para aplicaciones de negocio críticas.' },
      { question: '¿Cómo se integra Hyper-V con Azure?', answer: 'Hyper-V se integra con Azure a través de Azure Site Recovery para recuperación ante desastres, Azure Arc para gestión híbrida, Azure Migrate para evaluación y ejecución de migración a la nube, y Azure Stack HCI para infraestructura hiperconvergente ejecutando servicios Azure on-premises.' }
    ]
  },
  'openstack': {
    slug: 'openstack',
    title: 'OpenStack',
    description: `OpenStack es una plataforma de computación en la nube de código abierto que permite a las organizaciones construir y gestionar infraestructura de nube privada y pública. Proporciona un conjunto modular de servicios interrelacionados que controlan cómputo (Nova), redes (Neutron), almacenamiento de bloques (Cinder), almacenamiento de objetos (Swift), gestión de imágenes (Glance), identidad (Keystone), orquestación (Heat) y dashboard (Horizon).\n\nOpenStack permite a las organizaciones ofrecer aprovisionamiento de autoservicio de máquinas virtuales, redes y almacenamiento a través de APIs y un dashboard web, similar a proveedores de nube pública pero ejecutándose en su propio hardware. Soporta múltiples hipervisores (KVM, VMware, Hyper-V), runtimes de contenedores y aprovisionamiento bare metal a través de Ironic.\n\nLa administración avanzada de OpenStack incluye arquitectar planos de control de alta disponibilidad, implementar despliegues multi-región, optimizar redes Neutron con OVS u OVN, gestionar actualizaciones entre múltiples servicios, integrar con Ceph para almacenamiento distribuido y automatizar despliegues con herramientas como Kolla-Ansible, TripleO u OpenStack-Ansible.`,
    whyImportant: `OpenStack alimenta algunas de las nubes privadas más grandes del mundo, incluyendo despliegues en Walmart, CERN, AT&T y Bloomberg. Para organizaciones que requieren soberanía de datos, cumplimiento regulatorio o control de costos a escala masiva, OpenStack proporciona capacidades de nube sin dependencia de proveedores de nube pública.\n\nLa experiencia en OpenStack demuestra conocimiento profundo de los internos de infraestructura de nube, incluyendo programación de cómputo, redes definidas por software, almacenamiento distribuido y diseño de APIs. Estas habilidades son directamente transferibles a la comprensión de nube pública y valoradas en sectores de telecomunicaciones, finanzas, gobierno e investigación.`,
    keywords: ['habilidades en OpenStack', 'currículum OpenStack', 'nube privada', 'administración OpenStack'],
    searchIntents: ['cómo agregar OpenStack al currículum', 'habilidades de OpenStack para ingenieros de nube', 'oportunidades de carrera en OpenStack'],
    relatedSkills: ['Administración Linux', 'Fundamentos de Redes', 'VMware', 'Kubernetes', 'Terraform', 'Ansible'],
    professionSlugs: ['ingeniero-de-nube', 'ingeniero-de-infraestructura', 'arquitecto-de-nube', 'administrador-de-sistemas', 'ingeniero-de-plataforma'],
    atsKeywords: ['OpenStack', 'Nova', 'Neutron', 'Cinder', 'Keystone', 'Glance', 'Heat', 'Swift', 'private cloud', 'KVM', 'Ceph', 'OVN'],
    resumeTips: [
      'Especifica las versiones release de OpenStack y servicios que has desplegado y gestionado',
      'Menciona la escala de tu despliegue incluyendo nodos de cómputo, VMs y tenants',
      'Destaca opciones de backend de redes y almacenamiento y sus configuraciones',
      'Incluye experiencia de actualizaciones y operaciones día-2',
      'Cuantifica ahorros de costos comparados con alternativas de nube pública'
    ],
    exampleBullets: [
      'Desplegué y mantuve nube privada OpenStack con más de 200 nodos de cómputo ejecutando más de 3,000 VMs sirviendo a 50 equipos internos',
      'Implementé redes Neutron con backend OVN soportando más de 500 redes virtuales con latencia east-west inferior al milisegundo',
      'Integré OpenStack con Ceph proporcionando 2PB de almacenamiento distribuido con triple replicación y 99.999% de durabilidad de datos',
      'Lideré actualización de OpenStack de Ussuri a Yoga en 15 servicios con cero tiempo de inactividad usando estrategia de actualización progresiva'
    ],
    faqs: [
      { question: '¿Sigue siendo relevante OpenStack con la dominancia de la nube pública?', answer: 'Sí, para casos de uso específicos. Las organizaciones que necesitan soberanía de datos, cumplimiento regulatorio, costos predecibles a escala o hardware especializado (clústeres GPU, HPC) continúan eligiendo OpenStack. Las empresas de telecomunicaciones, instituciones de investigación y servicios financieros son adoptadores activos de OpenStack. Las habilidades se transfieren bien a roles de nube pública.' },
      { question: '¿Qué tan difícil es aprender OpenStack?', answer: 'OpenStack tiene una curva de aprendizaje empinada debido a sus muchos servicios interrelacionados y despliegue complejo. Comienza entendiendo los servicios centrales (Nova, Neutron, Keystone, Glance, Cinder) y despliega un clúster pequeño usando DevStack o Kolla-Ansible. La experiencia a nivel de producción requiere meses de estudio dedicado y práctica hands-on.' },
      { question: '¿Cómo ayudan las habilidades de OpenStack con carreras en nube pública?', answer: 'OpenStack proporciona comprensión profunda de cómo funcionan internamente las plataformas de nube: programación de cómputo, SDN, almacenamiento distribuido, gestión de identidades y diseño de APIs. Este conocimiento hace que los servicios de nube pública sean más intuitivos y es valorado por empleadores que buscan ingenieros que comprendan la infraestructura de nube a un nivel fundamental.' }
    ]
  },
  'networking-fundamentals': {
    slug: 'fundamentos-de-redes',
    title: 'Fundamentos de Redes',
    description: `Los fundamentos de redes abarcan los conceptos centrales de redes de computadoras incluyendo los modelos OSI y TCP/IP, direccionamiento IP y subnetting, routing y switching, DNS, DHCP, NAT, VLANs y protocolos de red comunes. Estos conceptos forman la base para comprender cómo se mueven los datos entre sistemas, ya sea en una red local, a través de internet o dentro de entornos de nube.\n\nLas redes modernas se extienden a redes definidas por software (SDN), virtualización de funciones de red (NFV), redes de nube (VPCs, subnets, tablas de routing, security groups) y redes de contenedores (redes overlay, plugins CNI). Comprender tanto redes físicas tradicionales como redes virtuales cloud-native es esencial para roles de infraestructura.\n\nEl conocimiento avanzado de redes incluye routing BGP para conectividad a internet, conceptos de seguridad de red (firewalls, IDS/IPS, segmentación de red), resolución de problemas de red usando herramientas como tcpdump, Wireshark, traceroute y nmap, configuración de calidad de servicio (QoS) y automatización de red con herramientas como Ansible y Netmiko.`,
    whyImportant: `Cada aplicación, servicio y sistema depende de las redes. Ya sea depurando un problema de comunicación de microservicios, diseñando una arquitectura VPC en la nube, configurando políticas de red de Kubernetes o estableciendo conectividad segura entre centros de datos, el conocimiento de redes es indispensable.\n\nLos fundamentos de redes son la habilidad de infraestructura más transferible. Sustentan la arquitectura de nube, ingeniería de seguridad, DevOps y administración de sistemas. Los profesionales con fuerte conocimiento de redes resuelven problemas más rápido, diseñan arquitecturas más resilientes y toman mejores decisiones de seguridad.`,
    keywords: ['habilidades de redes', 'currículum fundamentos de redes', 'ingeniería de redes', 'habilidades TCP/IP'],
    searchIntents: ['cómo incluir habilidades de redes en el currículum', 'fundamentos de redes para DevOps', 'habilidades de red para ingenieros de nube'],
    relatedSkills: ['TCP/IP', 'Gestión de DNS', 'Balanceo de Carga', 'Gestión de Firewalls', 'VPN', 'SSL/TLS', 'Administración Linux'],
    professionSlugs: ['ingeniero-de-redes', 'administrador-de-sistemas', 'ingeniero-de-nube', 'ingeniero-devops', 'ingeniero-de-infraestructura', 'ingeniero-de-seguridad-de-redes', 'arquitecto-de-nube'],
    atsKeywords: ['networking', 'TCP/IP', 'DNS', 'DHCP', 'subnetting', 'VLANs', 'routing', 'switching', 'OSI model', 'SDN', 'VPC', 'network security'],
    resumeTips: [
      'Especifica las tecnologías y protocolos de red con los que tienes experiencia práctica',
      'Menciona experiencia tanto en redes físicas como en la nube',
      'Destaca herramientas y metodologías de resolución de problemas de red usadas',
      'Incluye certificaciones de red como CCNA, CompTIA Network+ o AWS Networking Specialty',
      'Cuantifica la escala de red gestionada y mejoras de rendimiento logradas'
    ],
    exampleBullets: [
      'Diseñé y gestioné red empresarial sirviendo a 5,000 usuarios en 3 sitios con 99.99% de uptime y enlaces WAN redundantes',
      'Arquitecté topología de red VPC en AWS con más de 50 subnets, transit gateway y Direct Connect, soportando más de 200 servicios en 3 regiones',
      'Implementé segmentación de red con VLANs y reglas de firewall reduciendo riesgo de movimiento lateral, pasando pruebas de penetración con cero hallazgos críticos',
      'Resolví problemas complejos de red usando tcpdump y Wireshark, reduciendo el tiempo medio de resolución para incidentes de red en un 60%',
      'Automaticé configuración de red para más de 200 switches usando Ansible, reduciendo errores de configuración en un 90% y ahorrando 30 horas mensuales'
    ],
    faqs: [
      { question: '¿Qué tan importantes son las habilidades de redes para roles de nube?', answer: 'Extremadamente importantes. Las redes en la nube (VPCs, subnets, security groups, load balancers, DNS, VPN) se basan en conceptos de redes tradicionales. Los arquitectos e ingenieros de nube que entienden los fundamentos de redes diseñan mejores arquitecturas, resuelven problemas más rápido e implementan seguridad más fuerte. Muchos exámenes de certificación de nube evalúan fuertemente el conocimiento de redes.' },
      { question: '¿Qué certificación de redes debo obtener?', answer: 'CompTIA Network+ es el mejor punto de partida para fundamentos generales de redes. CCNA es el estándar de oro para experiencia más profunda en redes y es ampliamente reconocida. Para redes específicas de nube, las certificaciones AWS Networking Specialty o Azure Network Engineer demuestran experiencia específica de plataforma.' },
      { question: '¿Qué habilidades de redes son más importantes para DevOps?', answer: 'Enfócate en DNS, HTTP/HTTPS, TCP/IP, balanceo de carga, VPN, redes de nube (VPCs, subnets, security groups), redes de contenedores (redes overlay, service mesh) y herramientas de resolución de problemas (curl, nslookup, tcpdump). Comprender cómo las aplicaciones se comunican sobre redes es fundamental para la efectividad en DevOps.' }
    ]
  },
  'tcp-ip': {
    slug: 'tcp-ip',
    title: 'TCP/IP',
    description: `TCP/IP (Protocolo de Control de Transmisión/Protocolo de Internet) es la suite de protocolos fundamental que alimenta internet y prácticamente todas las redes modernas. Comprender TCP/IP significa entender cómo los datos se empaquetan en segmentos, se direccionan con encabezados IP, se enrutan a través de redes y se reensamblan en el destino, junto con las garantías que cada capa de protocolo proporciona.\n\nEl modelo TCP/IP consiste en cuatro capas: Aplicación (HTTP, DNS, SMTP, SSH), Transporte (TCP, UDP), Internet (IP, ICMP, ARP) y Acceso a la Red (Ethernet, Wi-Fi). TCP proporciona entrega confiable y ordenada a través de three-way handshakes, números de secuencia, acuses de recibo, control de flujo y control de congestión. UDP proporciona comunicación ligera y sin conexión para aplicaciones sensibles a la latencia.\n\nEl conocimiento avanzado de TCP/IP incluye comprender programación de sockets, escalado de ventana TCP y algoritmos de congestión (Cubic, BBR), protocolos de routing IP (OSPF, BGP), multicast, direccionamiento IPv6 y mecanismos de transición, análisis de paquetes con Wireshark y optimización de rendimiento de red mediante ajuste de MTU y parámetros TCP.`,
    whyImportant: `TCP/IP es el lenguaje universal de la computación en red. Cada solicitud web, llamada API, consulta de base de datos y comunicación de microservicios usa TCP/IP. La comprensión profunda de estos protocolos permite a los profesionales diagnosticar problemas complejos de conectividad, optimizar el rendimiento de aplicaciones y diseñar arquitecturas de red resilientes.\n\nPara roles de DevOps y nube, el conocimiento de TCP/IP es esencial para resolver problemas de redes de contenedores, configurar load balancers, comprender mecanismos de health check, depurar problemas de latencia e implementar políticas de seguridad. Es posiblemente la habilidad técnica más fundamental para cualquier profesional de infraestructura.`,
    keywords: ['habilidades TCP/IP', 'currículum TCP/IP', 'protocolos de red', 'fundamentos TCP/IP'],
    searchIntents: ['cómo incluir TCP/IP en el currículum', 'habilidades TCP/IP para trabajos de TI', 'fundamentos TCP/IP para ingenieros'],
    relatedSkills: ['Fundamentos de Redes', 'Gestión de DNS', 'Balanceo de Carga', 'Gestión de Firewalls', 'Administración Linux', 'VPN'],
    professionSlugs: ['ingeniero-de-redes', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'ingeniero-devops', 'ingeniero-de-seguridad-de-redes', 'desarrollador-backend'],
    atsKeywords: ['TCP/IP', 'TCP', 'UDP', 'IP', 'networking protocols', 'packet analysis', 'Wireshark', 'socket programming', 'IPv4', 'IPv6', 'ICMP', 'routing'],
    resumeTips: [
      'Demuestra conocimiento de TCP/IP a través de ejemplos específicos de resolución de problemas',
      'Menciona herramientas de análisis de protocolos usadas como Wireshark y tcpdump',
      'Destaca experiencia de optimización de rendimiento de red',
      'Incluye protocolos y servicios específicos configurados u optimizados',
      'Referencia certificaciones de redes que validen el conocimiento de protocolos'
    ],
    exampleBullets: [
      'Diagnostiqué y resolví problemas de retransmisión TCP que afectaban al 30% de las llamadas API entre centros de datos usando análisis con Wireshark, mejorando la confiabilidad al 99.99%',
      'Optimicé tamaño de ventana TCP y control de congestión BBR para replicación de base de datos entre regiones, incrementando el throughput en un 45% en enlaces de alta latencia',
      'Implementé configuración dual-stack IPv6 en 500 servidores habilitando cumplimiento con mandato gubernamental de IPv6 sin interrumpir servicios existentes',
      'Construí sistema de monitoreo de red rastreando estados de conexión TCP en más de 1,000 servicios, habilitando detección proactiva de agotamiento de pool de conexiones'
    ],
    faqs: [
      { question: '¿Qué tan profundo debe ser mi conocimiento de TCP/IP para DevOps?', answer: 'Debes comprender el three-way handshake de TCP, puertos TCP/UDP comunes, cómo funciona la resolución DNS, direccionamiento IP y subnetting, NAT y cómo usar herramientas de resolución de problemas (ping, traceroute, netstat, tcpdump, nslookup). El conocimiento más profundo de control de congestión TCP y gestión de ventanas es valioso para optimización de rendimiento.' },
      { question: '¿Cómo muestro habilidades TCP/IP en un currículum?', answer: 'En lugar de listar "TCP/IP" genéricamente, describe logros específicos: resolver problemas de red usando análisis de paquetes, optimizar parámetros de conexión, implementar IPv6 o diseñar arquitecturas de red. Estos ejemplos concretos demuestran experiencia práctica en TCP/IP de manera más efectiva.' },
      { question: '¿Sigue siendo importante el conocimiento de TCP/IP con las redes en la nube?', answer: 'Absolutamente. Las redes en la nube abstraen la infraestructura física pero todavía usan TCP/IP. Los security groups filtran por puerto/protocolo, los load balancers gestionan conexiones TCP, los túneles VPN encapsulan tráfico IP y resolver problemas de conectividad en la nube requiere comprensión de TCP/IP. Los protocolos son idénticos ya sea on-premises o en la nube.' }
    ]
  },
  'dns-management': {
    slug: 'gestion-de-dns',
    title: 'Gestión de DNS',
    description: `La gestión de DNS (Sistema de Nombres de Dominio) involucra configurar y mantener el sistema de nombres distribuido que traduce nombres de dominio legibles por humanos en direcciones IP. Esto incluye gestionar zonas DNS autoritativas, configurar tipos de registros (A, AAAA, CNAME, MX, TXT, SRV, NS, SOA, PTR, CAA), gestionar valores TTL, implementar DNSSEC para seguridad y asegurar alta disponibilidad de la infraestructura DNS.\n\nLa gestión moderna de DNS se extiende a servicios DNS en la nube (Route 53, Azure DNS, Cloud DNS), gestión de tráfico a través de balanceo de carga basado en DNS (weighted, latency-based, geolocation, failover routing), descubrimiento de servicios basado en DNS e integración de DNS con CDN y servicios de protección DDoS. El DNS juega un rol crítico en la entregabilidad de correo electrónico a través de registros SPF, DKIM y DMARC.\n\nLas habilidades avanzadas de DNS incluyen diseñar DNS split-horizon para resolución interna/externa, implementar DNS-over-HTTPS (DoH) y DNS-over-TLS (DoT), gestionar rotación de claves DNSSEC, automatizar gestión de DNS a través de APIs (ej. API de Route 53, Terraform), resolver problemas en cadenas de resolución DNS y optimizar DNS para mínima latencia y máxima efectividad de caché.`,
    whyImportant: `DNS es frecuentemente llamado la "guía telefónica de internet" y es fundamental para prácticamente todo servicio de internet. DNS mal configurado puede causar caídas completas del servicio, fallas en la entrega de correo electrónico y vulnerabilidades de seguridad. Comprender DNS es crítico para operaciones web, arquitectura de nube y seguridad.\n\nLas habilidades de gestión de DNS son esenciales para administradores de sistemas, ingenieros DevOps y arquitectos de nube que necesitan asegurar resolución de nombres confiable, implementar políticas de enrutamiento de tráfico y mantener registros de autenticación de correo electrónico. Los problemas de DNS están entre las causas más comunes de interrupciones de servicio.`,
    keywords: ['habilidades de gestión de DNS', 'currículum DNS', 'sistema de nombres de dominio', 'administración DNS'],
    searchIntents: ['cómo incluir habilidades de DNS en el currículum', 'gestión de DNS para DevOps', 'mejores prácticas de DNS'],
    relatedSkills: ['Fundamentos de Redes', 'TCP/IP', 'Balanceo de Carga', 'CDN', 'Amazon Web Services', 'Administración Linux'],
    professionSlugs: ['ingeniero-de-redes', 'administrador-de-sistemas', 'ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'ingeniero-de-seguridad-de-redes'],
    atsKeywords: ['DNS', 'Domain Name System', 'Route 53', 'BIND', 'DNS zones', 'DNS records', 'DNSSEC', 'SPF', 'DKIM', 'DMARC', 'DNS resolution', 'DNS management'],
    resumeTips: [
      'Especifica el número de dominios y zonas gestionadas',
      'Menciona plataformas DNS usadas como Route 53, Azure DNS o BIND',
      'Destaca implementaciones de enrutamiento de tráfico como geo-routing o failover',
      'Incluye gestión de registros de autenticación de correo electrónico (SPF, DKIM, DMARC)',
      'Cuantifica métricas de confiabilidad de DNS y rendimiento de resolución'
    ],
    exampleBullets: [
      'Gestioné infraestructura DNS para más de 500 dominios en Route 53 y Azure DNS con 100% de disponibilidad de resolución durante 3 años',
      'Implementé enrutamiento DNS de failover para 20 servicios críticos, logrando recuperación ante desastres automática con detección de failover inferior a 60 segundos',
      'Configuré DNSSEC para 100 dominios e implementé DMARC con p=reject, reduciendo intentos de suplantación de correo electrónico en un 99%',
      'Migré 300 dominios de BIND on-premises a Route 53 con cero tiempo de inactividad de resolución usando cambios de delegación incrementales'
    ],
    faqs: [
      { question: '¿Qué tan importante es el conocimiento de DNS para roles de nube?', answer: 'Muy importante. Las arquitecturas de nube dependen fuertemente de DNS para descubrimiento de servicios, enrutamiento de tráfico (geo, latencia, weighted), validación de certificados SSL y failover multi-región. AWS Route 53, Azure DNS y GCP Cloud DNS son comunes en requisitos de trabajo. Las misconfiguraciones de DNS causan algunas de las caídas de producción más visibles.' },
      { question: '¿Qué habilidades de DNS debo destacar para posiciones DevOps?', answer: 'Enfócate en gestión de DNS en la nube (Route 53, Azure DNS), políticas de enrutamiento basadas en DNS, automatización de registros DNS a través de Terraform o APIs, comprensión de propagación DNS y estrategia de TTL, y resolución de problemas de resolución DNS. La autenticación de correo electrónico (SPF, DKIM, DMARC) también es valiosa.' },
      { question: '¿Cómo demuestro experiencia en DNS más allá de gestión básica de registros?', answer: 'Muestra gestión de tráfico basada en DNS (failover, geo-routing), implementación de DNSSEC, automatización de DNS e infraestructura como código, arquitectura DNS de alta disponibilidad y optimización de rendimiento DNS. Incluye ejemplos específicos de resolución de incidentes donde la experiencia en DNS fue el factor clave.' }
    ]
  },
  'load-balancing': {
    slug: 'balanceo-de-carga',
    title: 'Balanceo de Carga',
    description: `El balanceo de carga es la práctica de distribuir tráfico de red entre múltiples servidores o recursos para asegurar alta disponibilidad, confiabilidad y rendimiento óptimo. Los balanceadores de carga operan en diferentes capas OSI: Capa 4 (TCP/UDP) para distribución a nivel de transporte y Capa 7 (HTTP/HTTPS) para enrutamiento consciente de la aplicación con características como enrutamiento basado en ruta, inspección de encabezados y terminación SSL.\n\nEl balanceo de carga moderno abarca balanceadores de carga de hardware (F5 BIG-IP), balanceadores de carga de software (Nginx, HAProxy, Envoy), balanceadores de carga en la nube (AWS ALB/NLB/CLB, Azure Load Balancer/Application Gateway, GCP Load Balancing) y controladores Ingress de Kubernetes. Los algoritmos clave incluyen round-robin, weighted round-robin, least connections, IP hash y consistent hashing.\n\nEl balanceo de carga avanzado incluye global server load balancing (GSLB) para distribución de tráfico multi-región, implementación de health checks con sondas personalizadas, SSL/TLS offloading y gestión de certificados, connection draining para remoción elegante de servidores, balanceo de carga WebSocket y gRPC, rate limiting e integración de WAF para seguridad.`,
    whyImportant: `El balanceo de carga es fundamental para construir aplicaciones altamente disponibles y escalables. Toda aplicación web de producción, API y arquitectura de microservicios depende del balanceo de carga para distribuir tráfico, manejar fallas de servidores y escalar para satisfacer la demanda. Sin balanceo de carga adecuado, las aplicaciones no pueden lograr la confiabilidad que los usuarios modernos esperan.\n\nComprender el balanceo de carga es esencial para roles de DevOps, nube e ingeniería backend. Intersecta con redes, seguridad (terminación SSL, WAF) y arquitectura de aplicaciones (enrutamiento de microservicios), convirtiéndolo en una habilidad que demuestra amplitud de conocimiento de infraestructura.`,
    keywords: ['habilidades de balanceo de carga', 'currículum load balancer', 'distribución de tráfico', 'balanceo de carga DevOps'],
    searchIntents: ['cómo incluir balanceo de carga en el currículum', 'balanceo de carga para ingenieros de nube', 'mejores prácticas de load balancer'],
    relatedSkills: ['Fundamentos de Redes', 'CDN', 'SSL/TLS', 'Kubernetes', 'Nginx', 'Gestión de DNS'],
    professionSlugs: ['ingeniero-de-redes', 'ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'ingeniero-de-confiabilidad-de-sitios', 'arquitecto-de-nube'],
    atsKeywords: ['load balancing', 'load balancer', 'ALB', 'NLB', 'Nginx', 'HAProxy', 'Envoy', 'Layer 7', 'Layer 4', 'SSL termination', 'health checks', 'GSLB'],
    resumeTips: [
      'Especifica tipos y plataformas de load balancer usados incluyendo soluciones cloud y software',
      'Menciona volúmenes de tráfico manejados y conteo de servidores backend',
      'Destaca configuraciones de enrutamiento avanzado como path-based o header-based routing',
      'Incluye implementaciones de health checks y failover',
      'Cuantifica mejoras de disponibilidad y rendimiento del balanceo de carga'
    ],
    exampleBullets: [
      'Diseñé arquitectura de balanceo de carga usando AWS ALB manejando 50K solicitudes/segundo en 80 instancias backend con menos de 5ms de latencia adicional',
      'Implementé balanceo de carga global en 4 regiones usando Route 53 y ALB, logrando 99.99% de disponibilidad para APIs de cara al cliente',
      'Configuré HAProxy con health checks y connection draining para despliegues sin tiempo de inactividad, habilitando más de 50 releases semanales a producción',
      'Migré de load balancers de hardware F5 a Nginx Plus, reduciendo costos anuales de licenciamiento en $180K mientras mejoraba el throughput en un 40%'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre balanceo de carga L4 y L7?', answer: 'Los load balancers de Capa 4 enrutan basándose en información de conexión TCP/UDP (IP y puerto) y son más rápidos pero menos inteligentes. Los load balancers de Capa 7 inspeccionan contenido HTTP (URLs, headers, cookies) habilitando enrutamiento basado en ruta, enrutamiento basado en host y decisiones conscientes de la aplicación. Usa L4 para rendimiento puro, L7 para necesidades de enrutamiento de aplicación.' },
      { question: '¿Qué load balancer debo aprender?', answer: 'Aprende primero los load balancers de nube (AWS ALB/NLB) ya que aparecen más en ofertas de trabajo. Nginx y HAProxy son los load balancers de software más importantes. Comprender Envoy es valioso para service mesh y arquitecturas modernas de microservicios. Los conceptos se transfieren entre todas las plataformas.' },
      { question: '¿Cómo demuestro habilidades de balanceo de carga en un currículum?', answer: 'Detalla los load balancers configurados, volúmenes de tráfico manejados, complejidad de enrutamiento (path-based, weighted, geo), implementaciones de health checks y configuración de terminación SSL. Cuantifica mejoras de disponibilidad y ahorros de costos. Incluye desafíos específicos resueltos a través de arquitectura de balanceo de carga.' }
    ]
  },
  'cdn': {
    slug: 'cdn',
    title: 'Red de Distribución de Contenido (CDN)',
    description: `Una Red de Distribución de Contenido es una red globalmente distribuida de servidores que almacena en caché y entrega contenido desde ubicaciones geográficamente cercanas a los usuarios finales, reduciendo latencia y mejorando el rendimiento. Los CDNs manejan activos estáticos (imágenes, CSS, JavaScript), streaming de video, aceleración de APIs y entrega de sitios completos. Los principales proveedores de CDN incluyen CloudFront (AWS), Azure CDN, Cloud CDN (GCP), Cloudflare, Akamai y Fastly.\n\nLa arquitectura CDN involucra servidores de origen (donde se origina el contenido), servidores de borde o Puntos de Presencia (PoPs) distribuidos globalmente, y políticas de caché que determinan cómo el contenido se almacena, invalida y refresca. Los CDNs implementan características como encabezados cache-control, gestión de TTL, invalidación de caché, origin shields, páginas de error personalizadas y transformación de solicitudes/respuestas.\n\nLa gestión avanzada de CDN incluye configurar funciones de computación en el borde (CloudFront Functions, Cloudflare Workers, Fastly Compute), implementar pruebas A/B en el borde, diseñar estrategias de cache key para contenido dinámico, integrar protección WAF, gestionar certificados SSL en el borde, optimizar ratios de cache hit e implementar estrategias multi-CDN para redundancia.`,
    whyImportant: `Los CDNs son esenciales para entregar experiencias de usuario rápidas y confiables a nivel global. Reducen la carga del servidor de origen, mejoran los tiempos de carga de páginas en un 40-60% para usuarios geográficamente distribuidos, protegen contra ataques DDoS y manejan picos de tráfico sin escalar infraestructura de origen.\n\nLas habilidades en CDN son valiosas para ingenieros frontend, DevOps y arquitectos de nube responsables del rendimiento de aplicaciones. Comprender estrategias de caché CDN y edge computing es cada vez más importante a medida que más lógica se mueve al borde de la red.`,
    keywords: ['habilidades en CDN', 'currículum CDN', 'red de distribución de contenido', 'optimización CDN'],
    searchIntents: ['cómo incluir CDN en el currículum', 'habilidades CDN para ingenieros web', 'mejores prácticas de optimización CDN'],
    relatedSkills: ['Balanceo de Carga', 'SSL/TLS', 'Gestión de DNS', 'Fundamentos de Redes', 'Amazon Web Services'],
    professionSlugs: ['ingeniero-de-nube', 'ingeniero-devops', 'desarrollador-full-stack', 'arquitecto-de-nube', 'ingeniero-de-infraestructura'],
    atsKeywords: ['CDN', 'CloudFront', 'Cloudflare', 'Akamai', 'Fastly', 'edge computing', 'cache optimization', 'content delivery', 'PoP', 'cache invalidation', 'WAF'],
    resumeTips: [
      'Especifica plataformas CDN usadas y volúmenes de tráfico servidos',
      'Menciona logros de optimización de caché con mejoras específicas de hit ratio',
      'Destaca implementaciones de edge computing para lógica personalizada',
      'Incluye configuraciones de protección DDoS y WAF',
      'Cuantifica mejoras de rendimiento en tiempos de carga de página y reducción de latencia'
    ],
    exampleBullets: [
      'Gestioné distribución CloudFront sirviendo 500M de solicitudes/día en más de 200 ubicaciones de borde con 98% de cache hit ratio',
      'Optimicé estrategia de caché CDN incrementando hit ratio del 65% al 94%, reduciendo carga de origen en un 80% y ahorrando $35K/mes en costos de cómputo',
      'Implementé Cloudflare Workers para pruebas A/B y personalización en el borde, eliminando 150ms de round-trip al origen para 10M de vistas de página diarias',
      'Diseñé arquitectura de failover multi-CDN usando Cloudflare y CloudFront, logrando 100% de disponibilidad durante incidentes de CDN individuales'
    ],
    faqs: [
      { question: '¿Qué CDN debo aprender?', answer: 'Comienza con CloudFront si trabajas con AWS, ya que se integra estrechamente con S3, ALB y Lambda@Edge. Cloudflare es excelente por su tier gratuito, red global y plataforma de edge computing Workers. Comprender los conceptos de CDN (caché, invalidación, ubicaciones de borde) se transfiere entre todos los proveedores.' },
      { question: '¿Cómo muestro habilidades CDN en un currículum?', answer: 'Detalla plataformas CDN configuradas, volúmenes de tráfico servidos, resultados de optimización de caché (hit ratios), implementaciones de edge computing y mejoras de rendimiento medidas. Incluye características de seguridad configuradas como reglas WAF y protección DDoS. Cuantifica mejoras de latencia para usuarios finales.' },
      { question: '¿Qué tan importante es el conocimiento de CDN para DevOps?', answer: 'El conocimiento de CDN es valioso para cualquier rol responsable del rendimiento y disponibilidad de aplicaciones. Comprender cache headers, estrategias de invalidación y enrutamiento CDN es esencial para desplegar aplicaciones web eficientemente. El conocimiento de edge computing es cada vez más importante a medida que serverless-at-the-edge gana adopción.' }
    ]
  },
  'ssl-tls': {
    slug: 'ssl-tls',
    title: 'SSL/TLS',
    description: `SSL/TLS (Secure Sockets Layer/Transport Layer Security) es el protocolo criptográfico que proporciona comunicación segura sobre redes. TLS (el sucesor moderno de SSL) encripta datos en tránsito entre clientes y servidores, autentica la identidad del servidor a través de certificados digitales y asegura la integridad de los datos. Comprender SSL/TLS abarca gestión de certificados, configuración de cipher suites, políticas de versión TLS y fundamentos de PKI (Infraestructura de Clave Pública).\n\nLa gestión práctica de SSL/TLS incluye obtener certificados de Autoridades Certificadoras (Let's Encrypt, DigiCert, Comodo), implementar renovación automatizada de certificados, configurar TLS en servidores web (Nginx, Apache), load balancers y servidores de aplicaciones, gestionar certificados wildcard y SAN, e implementar certificate pinning para seguridad mejorada.\n\nLas habilidades avanzadas de SSL/TLS incluyen gestión de PKI interna con herramientas como Vault o AWS Private CA, mutual TLS (mTLS) para autenticación servicio-a-servicio, implementación de HSTS, configuración de OCSP stapling, optimización de TLS 1.3, análisis de rendimiento de handshake TLS, gestión de logs de transparencia de certificados y automatización del ciclo de vida de certificados con el protocolo ACME.`,
    whyImportant: `TLS es obligatorio para aplicaciones web modernas; los navegadores marcan sitios HTTP como inseguros, los motores de búsqueda los penalizan y muchas APIs requieren conexiones encriptadas. Más allá del tráfico web, TLS asegura conexiones de bases de datos, integraciones de APIs, transporte de correo electrónico y comunicación de microservicios.\n\nLas habilidades en SSL/TLS son esenciales para operaciones conscientes de la seguridad. Las expiraciones de certificados están entre las causas más comunes de caídas de producción, y TLS mal configurado puede llevar a vulnerabilidades de seguridad. Comprender TLS es fundamental para cualquiera que gestione infraestructura de producción.`,
    keywords: ['habilidades SSL/TLS', 'currículum TLS', 'gestión de certificados', 'encriptación'],
    searchIntents: ['cómo incluir SSL/TLS en el currículum', 'habilidades SSL/TLS para DevOps', 'gestión de certificados TLS'],
    relatedSkills: ['Fundamentos de Redes', 'Gestión de Firewalls', 'Balanceo de Carga', 'Gestión de Identidad y Acceso', 'VPN', 'Vault'],
    professionSlugs: ['ingeniero-de-seguridad', 'ingeniero-devops', 'ingeniero-de-seguridad-de-redes', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'ingeniero-de-nube'],
    atsKeywords: ['SSL', 'TLS', 'SSL/TLS', 'certificates', 'PKI', 'HTTPS', 'certificate management', "Let's Encrypt", 'mTLS', 'mutual TLS', 'cipher suites', 'HSTS', 'X.509'],
    resumeTips: [
      'Menciona la escala de gestión de certificados y herramientas de automatización usadas',
      'Destaca experiencia de diseño o gestión de infraestructura PKI',
      'Incluye implementación de mTLS para arquitecturas zero-trust',
      'Especifica experiencia de configuración TLS en plataformas específicas',
      'Cuantifica prevención de caídas relacionadas con certificados o mejoras de seguridad'
    ],
    exampleBullets: [
      'Gestioné certificados SSL/TLS para más de 800 dominios con renovación automatizada vía Let\'s Encrypt y cert-manager, logrando cero caídas relacionadas con certificados en 2 años',
      'Implementé mutual TLS en 100 microservicios usando Vault PKI, estableciendo autenticación zero-trust inter-servicio con rotación automatizada de certificados de 24 horas',
      'Actualicé configuración TLS en 200 endpoints de TLS 1.0/1.1 a TLS 1.3, mejorando postura de seguridad y reduciendo tiempo de handshake en un 40%',
      'Construí infraestructura PKI interna usando HashiCorp Vault emitiendo más de 50,000 certificados anuales para servicios internos y entornos de desarrollo'
    ],
    faqs: [
      { question: '¿Qué habilidades SSL/TLS son más importantes para DevOps?', answer: 'Gestión del ciclo de vida de certificados (emisión, renovación, revocación), aprovisionamiento automatizado de certificados con Let\'s Encrypt o cert-manager, configuración TLS en load balancers y reverse proxies, mTLS para entornos de service mesh y resolución de problemas de fallas de handshake TLS. Comprender la selección de cipher suites y políticas de versión TLS también es importante.' },
      { question: '¿Cómo prevengo caídas por expiración de certificados?', answer: 'Implementa gestión automatizada de certificados usando Let\'s Encrypt con clientes ACME, cert-manager para Kubernetes o AWS Certificate Manager para recursos en la nube. Configura alertas de monitoreo 30, 14 y 7 días antes de la expiración. Mantén un inventario de certificados e implementa infraestructura como código para configuración de certificados.' },
      { question: '¿Qué es mTLS y por qué importa?', answer: 'Mutual TLS requiere que tanto el cliente como el servidor presenten certificados, verificando identidad en ambas direcciones. Es la base de las redes zero-trust en arquitecturas de microservicios, implementado a través de service meshes como Istio y Consul Connect. La experiencia en mTLS es cada vez más requerida para roles de infraestructura enfocados en seguridad.' }
    ]
  },
  'vpn': {
    slug: 'vpn',
    title: 'VPN (Red Privada Virtual)',
    description: `La tecnología VPN crea túneles encriptados entre redes o entre usuarios y redes, habilitando comunicación segura sobre redes públicas. Los tipos de VPN incluyen VPN site-to-site (conectando redes completas), VPN de acceso remoto (conectando usuarios individuales a redes corporativas) y VPN en la nube (conectando redes on-premises a VPCs en la nube). Los protocolos comunes incluyen IPsec, OpenVPN, WireGuard, SSL/TLS VPN e IKEv2.\n\nLos servicios VPN en la nube incluyen AWS VPN (Site-to-Site y Client VPN), Azure VPN Gateway, GCP Cloud VPN y Direct Connect/ExpressRoute para conexiones dedicadas. Las soluciones VPN empresariales de Cisco, Palo Alto y Fortinet proporcionan características avanzadas incluyendo split tunneling, autenticación multifactor y políticas de acceso granulares.\n\nLa configuración avanzada de VPN incluye diseñar arquitecturas VPN de alta disponibilidad con túneles redundantes, implementar BGP sobre VPN para routing dinámico, configurar políticas de split tunneling, integrar VPN con proveedores de identidad para SSO, optimizar rendimiento VPN mediante ajuste de MTU y selección de algoritmos de encriptación, e implementar acceso a red de confianza cero (ZTNA) como alternativa a VPN.`,
    whyImportant: `Las VPNs son infraestructura esencial para acceso remoto seguro, conectividad de nube híbrida y redes multi-sitio. Con el trabajo remoto convirtiéndose en estándar, la arquitectura y gestión de VPN son críticas para habilitar acceso seguro a recursos internos mientras se protege contra acceso no autorizado.\n\nPara arquitecturas de nube e híbridas, la VPN site-to-site proporciona conectividad segura entre centros de datos on-premises y entornos de nube. Comprender la tecnología VPN es fundamental para ingenieros de redes, profesionales de seguridad y arquitectos de nube que diseñan soluciones de conectividad segura.`,
    keywords: ['habilidades en VPN', 'currículum VPN', 'red privada virtual', 'configuración VPN'],
    searchIntents: ['cómo incluir habilidades de VPN en el currículum', 'habilidades de VPN para ingenieros de redes', 'mejores prácticas de VPN en la nube'],
    relatedSkills: ['Fundamentos de Redes', 'Gestión de Firewalls', 'SSL/TLS', 'Gestión de Identidad y Acceso', 'Amazon Web Services', 'Microsoft Azure'],
    professionSlugs: ['ingeniero-de-redes', 'ingeniero-de-seguridad-de-redes', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'ingeniero-de-nube', 'ingeniero-de-seguridad'],
    atsKeywords: ['VPN', 'IPsec', 'OpenVPN', 'WireGuard', 'site-to-site VPN', 'SSL VPN', 'AWS VPN', 'Azure VPN Gateway', 'IKEv2', 'split tunneling', 'remote access'],
    resumeTips: [
      'Especifica tecnologías y protocolos VPN que has configurado',
      'Menciona el número de túneles VPN y usuarios soportados',
      'Destaca arquitecturas VPN de alta disponibilidad diseñadas',
      'Incluye experiencia de integración VPN en la nube',
      'Cuantifica mejoras de seguridad y uptime para servicios VPN'
    ],
    exampleBullets: [
      'Diseñé y gestioné arquitectura VPN site-to-site conectando 3 centros de datos y 2 regiones AWS vía 12 túneles IPsec redundantes con 99.99% de uptime',
      'Desplegué VPN de acceso remoto soportando 5,000 usuarios concurrentes con integración MFA, habilitando trabajo remoto seguro durante la transición pandémica en menos de 2 semanas',
      'Migré de VPN legacy de Cisco a solución basada en WireGuard, mejorando velocidades de conexión en un 60% y reduciendo tickets de soporte relacionados con VPN en un 75%',
      'Implementé política de split-tunnel VPN reduciendo el uso de ancho de banda corporativo en un 45% mientras mantenía seguridad para acceso a recursos internos'
    ],
    faqs: [
      { question: '¿Qué protocolos VPN debo conocer?', answer: 'IPsec es el más ampliamente usado para VPN site-to-site y es esencial para conectividad VPN en la nube. WireGuard es la opción moderna y de alto rendimiento que está ganando adopción rápida. OpenVPN sigue siendo popular para acceso remoto. IKEv2 es fuerte para clientes móviles. Comprender las ventajas y desventajas entre estos protocolos es valioso.' },
      { question: '¿Siguen siendo relevantes las habilidades de VPN con las redes zero-trust?', answer: 'Sí. Aunque ZTNA está reemplazando la VPN tradicional para acceso de usuarios en muchas organizaciones, la VPN site-to-site para conectividad red-a-red sigue siendo esencial. Comprender tanto VPN como conceptos ZTNA demuestra conciencia de la arquitectura de seguridad en evolución. La transición de VPN a ZTNA es un viaje de varios años para la mayoría de las organizaciones.' },
      { question: '¿Qué habilidades de VPN son más valoradas en roles de nube?', answer: 'Servicios VPN en la nube (AWS VPN, Azure VPN Gateway, GCP Cloud VPN), configuración BGP sobre túneles VPN, Transit Gateway para arquitecturas hub-and-spoke, Direct Connect/ExpressRoute para conectividad dedicada y automatización de configuración VPN a través de Terraform. La conectividad VPN multi-nube también es cada vez más valorada.' }
    ]
  },
  'firewall-management': {
    slug: 'gestion-de-firewalls',
    title: 'Gestión de Firewalls',
    description: `La gestión de firewalls involucra configurar, mantener y monitorear firewalls de red que controlan el flujo de tráfico basado en reglas de seguridad predeterminadas. Esto incluye firewalls de red tradicionales (Palo Alto, Fortinet, Cisco ASA), firewalls de próxima generación (NGFW) con conciencia de aplicación e IPS, firewalls basados en host (iptables, nftables, Windows Firewall), security groups y network ACLs en la nube, y firewalls de aplicaciones web (WAF).\n\nLa gestión moderna de firewalls abarca políticas de micro-segmentación para arquitecturas zero-trust, security groups nativos de la nube a través de VPCs y subnets, gestión de reglas WAF para proteger aplicaciones web (AWS WAF, Cloudflare WAF, Azure WAF) y plataformas centralizadas de gestión de firewalls. Las reglas de firewall deben equilibrar requisitos de seguridad con funcionalidad de aplicaciones.\n\nLas habilidades avanzadas de firewall incluyen diseñar jerarquías de reglas para redes empresariales complejas, implementar aprovisionamiento automatizado de reglas a través de APIs y Terraform, conducir auditorías y limpieza de reglas de firewall, configurar firmas IPS/IDS, gestionar pares de firewall de alta disponibilidad e integrar logs de firewall con plataformas SIEM para monitoreo de seguridad.`,
    whyImportant: `Los firewalls son la primera línea de defensa en seguridad de red y están presentes en todo entorno empresarial. La gestión adecuada de firewalls previene acceso no autorizado, bloquea tráfico malicioso y aplica políticas de segmentación de red que limitan el radio de impacto de incidentes de seguridad.\n\nCon la adopción de la nube, la gestión de firewalls se ha expandido para incluir security groups, network ACLs y reglas WAF, haciéndola relevante para ingenieros de nube y profesionales DevOps además de ingenieros de seguridad de red tradicionales. Los firewalls mal configurados son una causa principal de brechas de seguridad.`,
    keywords: ['habilidades de gestión de firewalls', 'currículum firewall', 'seguridad de red', 'configuración de firewall'],
    searchIntents: ['cómo incluir habilidades de firewall en el currículum', 'gestión de firewalls para DevOps', 'mejores prácticas de firewall'],
    relatedSkills: ['Fundamentos de Redes', 'VPN', 'Gestión de Identidad y Acceso', 'SSL/TLS', 'Administración Linux', 'Optimización de Costos en la Nube'],
    professionSlugs: ['ingeniero-de-seguridad-de-redes', 'ingeniero-de-seguridad', 'ingeniero-de-redes', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'ingeniero-de-nube'],
    atsKeywords: ['firewall', 'Palo Alto', 'Fortinet', 'Cisco ASA', 'iptables', 'security groups', 'network ACLs', 'WAF', 'NGFW', 'IPS', 'IDS', 'micro-segmentation'],
    resumeTips: [
      'Especifica plataformas de firewall gestionadas incluyendo hardware y basadas en la nube',
      'Menciona la complejidad y escala de conjuntos de reglas mantenidos',
      'Destaca experiencia de implementación y gestión de WAF',
      'Incluye automatización de firewalls y enfoques de infraestructura como código',
      'Cuantifica mejoras de seguridad y logros de cumplimiento'
    ],
    exampleBullets: [
      'Gestioné infraestructura de firewalls Palo Alto con más de 5,000 reglas en 12 pares de firewalls protegiendo 3 centros de datos y 10,000 usuarios',
      'Implementé security groups de AWS y network ACLs para más de 200 VPCs usando Terraform, habilitando políticas de seguridad consistentes en 15 cuentas AWS',
      'Configuré reglas AWS WAF bloqueando más de 500K solicitudes maliciosas diariamente manteniendo cero falsos positivos en tráfico legítimo',
      'Conduje auditoría de reglas de firewall eliminando 2,000 reglas redundantes e identificando 50 reglas excesivamente permisivas, reduciendo la superficie de ataque en un 35%',
      'Automaticé aprovisionamiento de reglas de firewall con Terraform reduciendo el cumplimiento de solicitudes de cambio de 48 horas a 15 minutos'
    ],
    faqs: [
      { question: '¿Qué habilidades de firewall se necesitan para roles de nube?', answer: 'Los roles de nube requieren experiencia en security groups, network ACLs, reglas de firewall VPC y configuración WAF. Comprender cómo los firewalls nativos de la nube difieren de los firewalls de red tradicionales (stateful vs stateless, límites de reglas, comportamientos por defecto) es esencial. La gestión de firewalls basada en Terraform es cada vez más esperada.' },
      { question: '¿Debo aprender firewalls de hardware o enfocarme en la nube?', answer: 'Ambos son valiosos. Las habilidades en firewalls de hardware (Palo Alto, Fortinet) son esenciales para roles de seguridad de red empresarial. Las habilidades en firewalls de nube (security groups, WAF) son requeridas para roles de nube y DevOps. Muchas organizaciones usan ambos, y comprender ambos demuestra conocimiento integral de seguridad.' },
      { question: '¿Qué tan importante es el conocimiento de WAF?', answer: 'El conocimiento de WAF es cada vez más importante ya que las aplicaciones web son el objetivo principal de ataques. Comprender las amenazas OWASP Top 10, configurar reglas WAF para proteger contra SQLi, XSS y CSRF, y gestionar falsos positivos son habilidades valiosas para cualquier rol que involucre seguridad de aplicaciones web.' }
    ]
  },
  'identity-access-management': {
    slug: 'gestion-de-identidad-y-acceso',
    title: 'Gestión de Identidad y Acceso (IAM)',
    description: `La Gestión de Identidad y Acceso abarca las políticas, procesos y tecnologías que gestionan identidades digitales y controlan el acceso a recursos. Esto incluye autenticación de usuarios (verificar identidad), autorización (otorgar permisos), federación de identidades (confiar en proveedores de identidad externos), inicio de sesión único (SSO), autenticación multifactor (MFA), control de acceso basado en roles (RBAC) y control de acceso basado en atributos (ABAC).\n\nLas plataformas IAM en la nube (AWS IAM, Azure AD/Entra ID, GCP IAM) proporcionan control de acceso detallado para recursos en la nube a través de políticas, roles y cuentas de servicio. Las plataformas de identidad empresarial como Okta, Azure AD y Ping Identity gestionan identidades de usuario, SSO y aprovisionamiento de ciclo de vida. IAM también abarca gestión de acceso privilegiado (PAM) con herramientas como CyberArk y BeyondTrust.\n\nLas habilidades avanzadas de IAM incluyen diseñar políticas de acceso de mínimo privilegio, implementar acceso just-in-time, configurar federación de identidades con protocolos SAML y OIDC, automatizar gestión de ciclo de vida de usuarios a través de aprovisionamiento SCIM, implementar políticas de acceso condicional, gestionar seguridad de cuentas de servicio y conducir auditorías IAM para requisitos de cumplimiento como SOC 2, HIPAA y PCI-DSS.`,
    whyImportant: `IAM es la piedra angular de la ciberseguridad; más del 80% de las brechas de seguridad involucran credenciales comprometidas o privilegios de acceso excesivos. A medida que las organizaciones adoptan servicios en la nube y arquitecturas zero-trust, la implementación adecuada de IAM se convierte en el mecanismo principal para proteger recursos y datos.\n\nLas habilidades de IAM son esenciales en roles de seguridad, nube y DevOps. El diseño de políticas IAM en la nube es una tarea diaria para ingenieros de nube, mientras que la arquitectura IAM empresarial es crítica para equipos de seguridad. Comprender IAM demuestra conciencia de seguridad que los empleadores requieren cada vez más para todas las posiciones de infraestructura.`,
    keywords: ['habilidades IAM', 'currículum gestión de identidad y acceso', 'seguridad IAM', 'control de acceso'],
    searchIntents: ['cómo incluir IAM en el currículum', 'habilidades IAM para ingenieros de nube', 'mejores prácticas de gestión de identidades'],
    relatedSkills: ['Vault', 'SSL/TLS', 'Gestión de Firewalls', 'Amazon Web Services', 'Microsoft Azure', 'Ingeniero de Seguridad'],
    professionSlugs: ['ingeniero-de-seguridad', 'ingeniero-de-nube', 'arquitecto-de-nube', 'analista-de-ciberseguridad', 'ingeniero-devops', 'administrador-de-sistemas', 'gerente-de-ti'],
    atsKeywords: ['IAM', 'identity management', 'access management', 'RBAC', 'SSO', 'MFA', 'SAML', 'OIDC', 'AWS IAM', 'Azure AD', 'Entra ID', 'Okta'],
    resumeTips: [
      'Especifica plataformas IAM y el número de identidades gestionadas',
      'Menciona diseño e implementación de políticas de mínimo privilegio',
      'Destaca implementaciones de SSO y federación con protocolos específicos',
      'Incluye marcos de cumplimiento logrados a través de controles IAM',
      'Cuantifica mejoras de seguridad de implementaciones IAM como resultados de revisión de acceso'
    ],
    exampleBullets: [
      'Diseñé marco AWS IAM con más de 150 políticas personalizadas en 20 cuentas implementando acceso de mínimo privilegio para 500 desarrolladores y 200 cuentas de servicio',
      'Implementé integración SSO de Okta para 80 aplicaciones sirviendo a 10,000 usuarios con federación SAML y OIDC, eliminando el 95% de tickets de soporte relacionados con contraseñas',
      'Conduje revisiones trimestrales de acceso en Azure AD identificando y remediando más de 200 permisos excesivos, logrando 100% de cumplimiento con requisitos SOC 2',
      'Desplegué aplicación de MFA para los 3,000 usuarios logrando 99.8% de adopción en 30 días, reduciendo incidentes de compromiso de cuentas en un 99%'
    ],
    faqs: [
      { question: '¿Qué habilidades IAM son más importantes para roles de nube?', answer: 'Escritura de políticas IAM en la nube (especialmente AWS IAM), comprensión de principios de mínimo privilegio, gestión de cuentas de servicio, configuración de acceso cross-account y federación con proveedores de identidad. Para AWS, comprende políticas IAM, roles, SCPs (Service Control Policies) y permission boundaries.' },
      { question: '¿Cómo demuestro experiencia en IAM en un currículum?', answer: 'Cuantifica la escala de sistemas IAM gestionados (usuarios, aplicaciones, políticas), destaca logros de cumplimiento específicos (SOC 2, HIPAA), menciona plataformas de identidad usadas (Okta, Azure AD, AWS IAM) y describe implementaciones de mínimo privilegio. Incluye configuraciones de SSO/federación y resultados de despliegue de MFA.' },
      { question: '¿IAM es una habilidad de seguridad o de nube?', answer: 'Ambas. IAM es una disciplina fundamental de seguridad que se implementa de manera diferente en plataformas de nube. Los equipos de seguridad diseñan estrategias y políticas IAM, mientras los ingenieros de nube las implementan y mantienen. Las habilidades sólidas de IAM señalan conciencia de seguridad que es valiosa en cualquier rol de infraestructura, no solo en posiciones dedicadas de seguridad.' }
    ]
  },
  'ci-cd': {
    slug: 'ci-cd',
    title: 'CI/CD (Integración Continua/Entrega Continua)',
    description: `CI/CD es la práctica combinada de Integración Continua (construir y probar código automáticamente en cada commit) y Entrega/Despliegue Continuo (desplegar automáticamente código validado a producción o entornos de staging). Los pipelines CI/CD automatizan el ciclo de vida de entrega de software desde el commit de código hasta la construcción, pruebas, escaneo de seguridad, despliegue a staging y release a producción.\n\nUn pipeline CI/CD maduro incluye triggers de gestión de código fuente, compilación/construcción automatizada, pruebas unitarias, pruebas de integración, análisis de código estático, escaneo de seguridad (SAST/DAST), creación de artefactos, despliegue a staging, pruebas de aceptación, despliegue a producción con estrategias como blue-green, canary o rolling updates, y monitoreo post-despliegue. Las herramientas de orquestación de pipelines incluyen Jenkins, GitHub Actions, GitLab CI, CircleCI, Azure Pipelines y AWS CodePipeline.\n\nLas prácticas avanzadas de CI/CD incluyen trunk-based development con feature flags, entrega progresiva con rollbacks automatizados, pipeline-as-code con configuraciones versionadas, métricas de pipeline y optimización (métricas DORA: frecuencia de despliegue, lead time, tasa de fallo de cambios, MTTR), estrategias de pipeline para monorepos e implementación de despliegue continuo basado en GitOps con herramientas como Argo CD o Flux.`,
    whyImportant: `CI/CD es la columna vertebral de la entrega de software moderna y es la práctica definitoria de la cultura DevOps. Las organizaciones que practican CI/CD despliegan más frecuentemente, tienen tiempos de entrega más cortos, experimentan menos fallas y se recuperan más rápido de incidentes. Los informes DORA State of DevOps muestran consistentemente que la madurez de CI/CD correlaciona con el rendimiento organizacional.\n\nLas habilidades de CI/CD son requeridas para prácticamente todo rol de DevOps, ingeniería de plataforma e ingeniería de software. Comprender CI/CD va más allá del conocimiento de herramientas: abarca optimización de builds, estrategias de pruebas, patrones de despliegue y las prácticas culturales que hacen exitosa la entrega continua.`,
    keywords: ['habilidades CI/CD', 'currículum CI/CD', 'integración continua', 'entrega continua'],
    searchIntents: ['cómo incluir CI/CD en el currículum', 'habilidades CI/CD para trabajos DevOps', 'mejores prácticas CI/CD para currículum'],
    relatedSkills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Docker', 'Kubernetes', 'Terraform', 'Argo CD'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-software', 'ingeniero-de-lanzamiento', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'desarrollador-backend'],
    atsKeywords: ['CI/CD', 'continuous integration', 'continuous delivery', 'continuous deployment', 'pipeline', 'build automation', 'deployment automation', 'DORA metrics', 'blue-green deployment', 'canary deployment'],
    resumeTips: [
      'Especifica herramientas CI/CD usadas y la complejidad de pipelines gestionados',
      'Cuantifica la frecuencia de despliegue lograda (ej. diariamente, múltiples veces al día)',
      'Destaca estrategias de despliegue implementadas como canary o blue-green',
      'Incluye resultados de optimización de pipelines con mejoras específicas de tiempo y costo',
      'Menciona mejoras en métricas DORA si se rastrean'
    ],
    exampleBullets: [
      'Construí plataforma CI/CD habilitando a más de 200 desarrolladores desplegar 150 veces por semana a producción con menos del 1% de tasa de rollback',
      'Implementé estrategia de despliegue canary reduciendo la tasa de fallo de cambios del 15% al 2% en 40 microservicios',
      'Reduje el tiempo de ejecución de pipeline CI de 45 minutos a 8 minutos mediante paralelización, caché y optimización de pruebas',
      'Diseñé marco CI/CD logrando métricas DORA Elite: despliegues diarios, 1 hora de lead time, 0.5% de tasa de fallo de cambios y MTTR inferior a 1 hora',
      'Migré 50 procesos de despliegue manual legacy a pipelines CI/CD automatizados, reduciendo el tiempo de despliegue de 4 horas a 15 minutos por release'
    ],
    faqs: [
      { question: '¿Qué herramientas CI/CD debo aprender?', answer: 'Comienza con GitHub Actions si usas GitHub, o GitLab CI si usas GitLab, proporcionan la experiencia más integrada. Aprende Jenkins para entornos empresariales donde domina. Comprender los conceptos de pipeline-as-code (configuración YAML, etapas, jobs, triggers) se transfiere entre todas las plataformas.' },
      { question: '¿Cómo describo habilidades CI/CD en mi currículum?', answer: 'Enfócate en resultados más que solo herramientas. Describe la frecuencia de despliegue lograda, mejoras de lead time, reducciones de tasa de fallos y tiempo de recuperación. Menciona estrategias de despliegue específicas (blue-green, canary), complejidad de pipeline (etapas, entornos) y mejoras en la experiencia del desarrollador.' },
      { question: '¿Cuál es la diferencia entre entrega continua y despliegue continuo?', answer: 'La entrega continua significa que el código siempre está en un estado desplegable con releases a producción que requieren aprobación manual. El despliegue continuo va más allá desplegando automáticamente cada cambio validado a producción sin puertas manuales. La mayoría de las organizaciones practican entrega continua y selectivamente habilitan despliegue continuo para servicios maduros.' }
    ]
  },
  'infrastructure-as-code': {
    slug: 'infraestructura-como-codigo',
    title: 'Infraestructura como Código (IaC)',
    description: `La Infraestructura como Código es la práctica de gestionar y aprovisionar infraestructura de cómputo a través de archivos de definición legibles por máquina en lugar de procesos manuales o herramientas de configuración interactivas. IaC permite a los equipos versionar la infraestructura, revisar cambios por pares, probar configuraciones y reproducir entornos de manera consistente y repetible.\n\nLas herramientas de IaC se dividen en dos categorías: declarativas (definir el estado final deseado) e imperativas (definir pasos para lograr el estado). Las herramientas declarativas incluyen Terraform, CloudFormation, Pulumi y Bicep. Las herramientas de gestión de configuración como Ansible, Chef, Puppet y Salt manejan la instalación de software y configuración en infraestructura aprovisionada. La elección entre herramientas depende del caso de uso, habilidades del equipo y requisitos organizacionales.\n\nLas prácticas avanzadas de IaC incluyen diseño modular de infraestructura para reutilización entre equipos, pruebas de código de infraestructura con herramientas como Terratest y Kitchen-Terraform, implementar policy as code para gobernanza (Sentinel, OPA, Conftest), gestionar estado de forma segura en entornos de equipo, implementar flujos de trabajo GitOps para cambios de infraestructura y diseñar pipelines de infraestructura con puertas de aprobación y control de radio de impacto apropiados.`,
    whyImportant: `IaC es una práctica fundamental de DevOps que elimina el drift de configuración, habilita recuperación ante desastres, soporta auditoría de cumplimiento y acelera el aprovisionamiento de infraestructura. Las organizaciones que practican IaC despliegan infraestructura 23 veces más frecuentemente y se recuperan de fallas 2,604 veces más rápido según la investigación DORA.\n\nLas habilidades de IaC son requeridas para prácticamente todos los roles de nube y DevOps. La capacidad de codificar, versionar, probar y desplegar automáticamente infraestructura es lo que separa las operaciones modernas de la administración manual tradicional. Comprender los principios de IaC es más importante que cualquier herramienta individual.`,
    keywords: ['habilidades de infraestructura como código', 'currículum IaC', 'automatización de infraestructura', 'IaC DevOps'],
    searchIntents: ['cómo incluir IaC en el currículum', 'infraestructura como código para DevOps', 'mejores prácticas de IaC para la carrera'],
    relatedSkills: ['Terraform', 'CloudFormation', 'Pulumi', 'Ansible', 'Gestión de Configuración', 'CI/CD', 'Kubernetes'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-nube', 'ingeniero-de-infraestructura', 'ingeniero-de-plataforma', 'ingeniero-de-confiabilidad-de-sitios', 'arquitecto-de-nube', 'arquitecto-de-soluciones'],
    atsKeywords: ['infrastructure as code', 'IaC', 'Terraform', 'CloudFormation', 'Pulumi', 'Ansible', 'declarative infrastructure', 'GitOps', 'infrastructure automation', 'policy as code'],
    resumeTips: [
      'Especifica herramientas IaC usadas y el porcentaje de infraestructura gestionada como código',
      'Menciona estrategias de pruebas para código de infraestructura',
      'Destaca implementaciones de policy as code para gobernanza',
      'Incluye integración CI/CD para pipelines de despliegue de infraestructura',
      'Cuantifica el número de recursos gestionados y mejoras de tiempo de aprovisionamiento'
    ],
    exampleBullets: [
      'Logré 100% de cobertura IaC en 3,000 recursos de nube usando Terraform y Ansible, eliminando todo aprovisionamiento manual de infraestructura',
      'Implementé pipeline de pruebas de infraestructura usando Terratest con 85% de cobertura de código, detectando más de 30 misconfiguraciones antes de producción mensualmente',
      'Diseñé biblioteca de módulos IaC habilitando aprovisionamiento de infraestructura de autoservicio para 15 equipos de desarrollo, reduciendo solicitudes de infraestructura en un 80%',
      'Implementé motor de policy-as-code OPA evaluando más de 500 cambios de infraestructura diarios contra 50 políticas de seguridad y cumplimiento sin revisión manual requerida'
    ],
    faqs: [
      { question: '¿Qué herramienta IaC debo aprender primero?', answer: 'Terraform es la opción más segura debido a su soporte multi-nube y dominio del mercado. Si trabajas exclusivamente con AWS, CloudFormation también es valioso. Ansible complementa Terraform para gestión de configuración. Aprende una herramienta de aprovisionamiento (Terraform) y una herramienta de configuración (Ansible) para un conjunto de habilidades equilibrado.' },
      { question: '¿Cómo muestro habilidades IaC más allá de listar nombres de herramientas?', answer: 'Describe la escala de infraestructura gestionada como código, prácticas de pruebas y calidad implementadas, gobernanza con policy-as-code, diseño de módulos para reutilización e integración CI/CD. Cuantifica el porcentaje de cobertura, mejoras de tiempo de aprovisionamiento y reducción de incidentes por eliminar procesos manuales.' },
      { question: '¿Cuál es la diferencia entre IaC y gestión de configuración?', answer: 'IaC (Terraform, CloudFormation) se enfoca en aprovisionar infraestructura: crear VMs, redes, bases de datos y recursos de nube. La gestión de configuración (Ansible, Chef, Puppet) se enfoca en configurar lo que se ejecuta en esa infraestructura: instalar software, gestionar archivos y asegurar estados de servicios. La mayoría de los equipos usan ambos juntos.' }
    ]
  },
  'configuration-management': {
    slug: 'gestion-de-configuracion',
    title: 'Gestión de Configuración',
    description: `La gestión de configuración es la práctica de gestionar y mantener sistemáticamente la consistencia de los atributos funcionales y físicos de los sistemas a lo largo de su ciclo de vida. En TI, esto significa usar herramientas automatizadas para asegurar que los servidores, aplicaciones y servicios estén configurados consistentemente según políticas definidas, previniendo el drift de configuración y habilitando despliegues repetibles.\n\nLas herramientas de gestión de configuración incluyen Ansible (sin agentes, basado en YAML), Chef (recetas basadas en Ruby con agente), Puppet (DSL declarativo con agente) y Salt (basado en Python con agente opcional). Estas herramientas aplican configuración de estado deseado, asegurando continuamente que los sistemas coincidan con su configuración definida independientemente de cambios manuales. Cada herramienta sigue un enfoque idempotente donde ejecutar configuraciones múltiples veces produce el mismo resultado.\n\nLa gestión de configuración avanzada involucra diseñar jerarquías de configuración basadas en roles, probar configuraciones con herramientas como Molecule (Ansible), Test Kitchen (Chef) y rspec-puppet, implementar integración de secretos, gestionar datos de configuración separados del código (Hiera en Puppet, data bags en Chef), orquestar despliegues complejos multi-nodo e integrar gestión de configuración con pipelines CI/CD.`,
    whyImportant: `La gestión de configuración elimina el problema del "servidor copo de nieve" donde los sistemas configurados manualmente divergen con el tiempo, llevando a inconsistencias, fallas y vulnerabilidades de seguridad. Permite a las organizaciones gestionar cientos o miles de servidores con consistencia, documentación y registros de auditoría.\n\nAunque la contenedorización ha reducido la necesidad de gestión de configuración a nivel de SO en algunos entornos, la práctica sigue siendo esencial para infraestructura basada en VMs, servidores bare metal, dispositivos de red y los sistemas host que ejecutan plataformas de contenedores. Las habilidades de gestión de configuración demuestran pensamiento sistemático sobre la confiabilidad de infraestructura.`,
    keywords: ['habilidades de gestión de configuración', 'currículum gestión de configuración', 'Ansible Chef Puppet', 'automatización de servidores'],
    searchIntents: ['cómo incluir gestión de configuración en el currículum', 'gestión de configuración para DevOps', 'Ansible vs Chef vs Puppet'],
    relatedSkills: ['Ansible', 'Infraestructura como Código', 'Terraform', 'Administración Linux', 'Docker', 'Vagrant'],
    professionSlugs: ['ingeniero-devops', 'administrador-de-sistemas', 'ingeniero-de-infraestructura', 'ingeniero-de-plataforma', 'ingeniero-de-automatizacion', 'ingeniero-de-confiabilidad-de-sitios'],
    atsKeywords: ['configuration management', 'Ansible', 'Chef', 'Puppet', 'Salt', 'desired state', 'idempotent', 'server automation', 'configuration drift', 'infrastructure automation'],
    resumeTips: [
      'Especifica herramientas de gestión de configuración y el número de sistemas gestionados',
      'Menciona enfoques de pruebas para código de configuración',
      'Destaca procesos de detección y remediación de drift de configuración',
      'Incluye desarrollo personalizado de módulos, roles o cookbooks',
      'Cuantifica mejoras de consistencia y ahorros de tiempo por la automatización'
    ],
    exampleBullets: [
      'Gestioné configuración para más de 1,000 servidores usando Ansible con más de 200 roles asegurando estado consistente en entornos de desarrollo, staging y producción',
      'Implementé detección de drift de configuración y auto-remediación reduciendo servidores no conformes del 25% a menos del 1%',
      'Desarrollé roles Ansible test-driven usando Molecule con 90% de cobertura de pruebas, reduciendo incidentes relacionados con configuración en un 75%',
      'Automaticé gestión de configuración de hardening de SO aplicando benchmarks CIS a 500 servidores, reduciendo hallazgos de auditoría de seguridad en un 85%'
    ],
    faqs: [
      { question: '¿Sigue siendo relevante la gestión de configuración con contenedores?', answer: 'Sí. Los contenedores redujeron la necesidad de CM a nivel de SO en entornos de aplicación, pero la gestión de configuración sigue siendo esencial para: los hosts que ejecutan plataformas de contenedores, cargas de trabajo basadas en VMs, dispositivos de red, sistemas legacy y construcción de imágenes base Docker. Ansible en particular se ha adaptado bien agregando módulos de contenedores y nube.' },
      { question: '¿Qué herramienta de gestión de configuración debo aprender?', answer: 'Ansible es el claro ganador para nuevos aprendices: tiene la mayor cuota de mercado, la curva de aprendizaje más baja (sin agentes, basado en YAML) y la aplicabilidad más amplia. Chef y Puppet todavía se usan en empresas pero están declinando en nuevas adopciones. Aprende Ansible a menos que tu empleador objetivo use específicamente otra herramienta.' },
      { question: '¿Cómo difiere la gestión de configuración de la infraestructura como código?', answer: 'IaC (Terraform) aprovisiona recursos: crear VMs, redes y servicios de nube. La gestión de configuración (Ansible) configura esos recursos: instalar paquetes, gestionar archivos, iniciar servicios. Son complementarios: Terraform crea una VM, Ansible configura lo que se ejecuta en ella. Algunas herramientas como Ansible pueden hacer ambas cosas pero cada una sobresale en su dominio principal.' }
    ]
  },
  'containerization': {
    slug: 'contenedorizacion',
    title: 'Contenedorización',
    description: `La contenedorización es la práctica de empaquetar aplicaciones y sus dependencias en contenedores aislados y livianos que se ejecutan consistentemente en diferentes entornos de cómputo. A diferencia de las máquinas virtuales que virtualizan hardware, los contenedores virtualizan el sistema operativo, compartiendo el kernel del host mientras mantienen aislamiento de procesos a través de namespaces de Linux, cgroups y sistemas de archivos de unión.\n\nEl ecosistema de contenedorización incluye runtimes de contenedores (Docker, containerd, CRI-O, Podman), registros de imágenes de contenedores (Docker Hub, Amazon ECR, Azure ACR, Google Artifact Registry, Harbor), orquestación de contenedores (Kubernetes, Docker Swarm, Nomad) y herramientas de seguridad de contenedores (Trivy, Snyk, Falco). Los estándares OCI (Open Container Initiative) aseguran interoperabilidad entre herramientas.\n\nLas habilidades avanzadas de contenedorización incluyen optimizar imágenes de contenedores para tamaño y seguridad (imágenes distroless, scratch builds), implementar escaneo de seguridad de contenedores en CI/CD, diseñar builds de contenedores multi-arquitectura (ARM/AMD64), comprender modelos de redes de contenedores (bridge, host, overlay, macvlan), implementar contenedores rootless, gestionar límites de recursos de contenedores y QoS, y diseñar estrategias de almacenamiento de contenedores con volúmenes persistentes.`,
    whyImportant: `La contenedorización es la base del desarrollo de aplicaciones cloud-native y ha cambiado fundamentalmente cómo se construye, entrega y ejecuta el software. Más del 90% de las organizaciones ahora usan contenedores en alguna capacidad, y el desarrollo container-native es el estándar para nuevas aplicaciones y microservicios.\n\nLas habilidades de contenedorización permiten ciclos de desarrollo más rápidos, entornos consistentes, uso eficiente de recursos y escalado más simple. Comprender los principios de contenedorización es prerrequisito para Kubernetes, service mesh y prácticas modernas de CI/CD.`,
    keywords: ['habilidades de contenedorización', 'currículum tecnología de contenedores', 'contenedores Docker', 'orquestación de contenedores'],
    searchIntents: ['cómo incluir contenedorización en el currículum', 'habilidades de contenedorización para DevOps', 'contenedores vs máquinas virtuales'],
    relatedSkills: ['Docker', 'Kubernetes', 'Arquitectura de Microservicios', 'CI/CD', 'Administración Linux', 'Helm'],
    professionSlugs: ['ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-software', 'ingeniero-de-confiabilidad-de-sitios', 'desarrollador-backend', 'ingeniero-de-nube'],
    atsKeywords: ['containerization', 'containers', 'Docker', 'Kubernetes', 'container orchestration', 'container registry', 'container security', 'OCI', 'containerd', 'Podman', 'microservices'],
    resumeTips: [
      'Especifica tecnologías de contenedores usadas y la escala de cargas de trabajo contenedorizadas',
      'Menciona técnicas de optimización de imágenes de contenedores aplicadas',
      'Destaca prácticas de seguridad de contenedores incluyendo escaneo y protección en runtime',
      'Incluye experiencia de gestión de registro de contenedores',
      'Cuantifica mejoras de la contenedorización como velocidad de despliegue y eficiencia de recursos'
    ],
    exampleBullets: [
      'Lideré iniciativa de contenedorización migrando 60 aplicaciones legacy a contenedores Docker, habilitando despliegue en Kubernetes y reduciendo costos de infraestructura en un 40%',
      'Optimicé imágenes de contenedores logrando reducción promedio de tamaño del 70% mediante multi-stage builds e imágenes base distroless',
      'Implementé pipeline de seguridad de contenedores escaneando más de 500 imágenes semanales con Trivy, manteniendo cero vulnerabilidades críticas en producción',
      'Diseñé arquitectura de redes de contenedores soportando 200 microservicios con redes overlay y políticas de red para aislamiento inter-servicio',
      'Gestioné registro privado Harbor de contenedores sirviendo más de 1,000 imágenes a 100 desarrolladores con escaneo de vulnerabilidades y aplicación de imágenes firmadas'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre contenedores y máquinas virtuales?', answer: 'Las VMs virtualizan hardware y ejecutan sistemas operativos completos, proporcionando fuerte aislamiento pero consumiendo más recursos y arrancando lentamente. Los contenedores comparten el kernel del SO host, usan namespaces para aislamiento, arrancan en milisegundos y usan recursos mínimos. Los contenedores son ideales para despliegue de aplicaciones, mientras las VMs son mejores cuando necesitas aislamiento completo de SO o kernels diferentes.' },
      { question: '¿Es Docker la única tecnología de contenedores?', answer: 'No. Aunque Docker popularizó los contenedores, las alternativas incluyen Podman (sin demonio, rootless), containerd (runtime CNCF usado por Kubernetes) y CRI-O (runtime específico de Kubernetes). El estándar OCI asegura que las imágenes construidas con cualquier herramienta se ejecuten en cualquier runtime compatible. El conocimiento de Docker se transfiere directamente a las alternativas.' },
      { question: '¿Cómo empiezo con la contenedorización?', answer: 'Comienza con Docker: aprende a escribir Dockerfiles, construir imágenes, ejecutar contenedores, usar Docker Compose para configuraciones multi-contenedor y subir imágenes a registros. Luego aprende Kubernetes para orquestación. Enfócate en construir aplicaciones reales en contenedores en lugar de solo tutoriales, contenedoriza tus propios proyectos.' }
    ]
  },
  'microservices-architecture': {
    slug: 'arquitectura-de-microservicios',
    title: 'Arquitectura de Microservicios',
    description: `La arquitectura de microservicios es un enfoque de diseño donde las aplicaciones se componen de servicios pequeños e independientes que se comunican a través de APIs bien definidas. Cada microservicio posee sus datos, se ejecuta en su propio proceso y puede ser desplegado, escalado y actualizado independientemente. Esto contrasta con la arquitectura monolítica donde toda la funcionalidad reside en una sola unidad desplegable.\n\nLos patrones clave en microservicios incluyen API gateways para enrutamiento y agregación, descubrimiento de servicios para localizar servicios dinámicamente, circuit breakers para tolerancia a fallos, comunicación orientada a eventos vía colas de mensajes (Kafka, RabbitMQ, SQS), patrones saga para transacciones distribuidas, CQRS para separación de lectura/escritura y tracing distribuido para observabilidad. Los microservicios se despliegan comúnmente en Kubernetes con service meshes para redes.\n\nLas habilidades avanzadas de microservicios incluyen diseñar bounded contexts usando Domain-Driven Design (DDD), implementar event sourcing, gestionar consistencia de datos entre servicios sin transacciones distribuidas, diseñar estrategias de versionado de APIs, implementar pruebas de contratos consumer-driven, manejar consistencia eventual y tomar decisiones informadas sobre límites y granularidad de servicios.`,
    whyImportant: `La arquitectura de microservicios permite a las organizaciones escalar el desarrollo entre múltiples equipos, desplegar características independientemente y elegir la mejor tecnología para cada servicio. Empresas como Netflix, Amazon, Uber y Spotify han demostrado que los microservicios permiten innovación rápida a escala.\n\nComprender la arquitectura de microservicios es esencial para roles senior de ingeniería, ya que abarca diseño de sistemas distribuidos, diseño de APIs, gestión de datos y complejidad operativa. La capacidad de diseñar y evolucionar sistemas de microservicios es un sello de madurez arquitectónica valorado por los principales empleadores.`,
    keywords: ['habilidades de microservicios', 'currículum arquitectura de microservicios', 'sistemas distribuidos', 'diseño de microservicios'],
    searchIntents: ['cómo incluir microservicios en el currículum', 'habilidades de microservicios para desarrolladores senior', 'microservicios vs monolito'],
    relatedSkills: ['Kubernetes', 'Docker', 'Service Mesh', 'Istio', 'Contenedorización', 'CI/CD', 'Computación Serverless', 'Balanceo de Carga'],
    professionSlugs: ['ingeniero-de-software', 'desarrollador-backend', 'arquitecto-de-nube', 'arquitecto-de-soluciones', 'ingeniero-de-plataforma', 'ingeniero-devops'],
    atsKeywords: ['microservices', 'microservices architecture', 'distributed systems', 'API gateway', 'service discovery', 'event-driven', 'domain-driven design', 'DDD', 'CQRS', 'saga pattern'],
    resumeTips: [
      'Especifica el número de microservicios en sistemas que has diseñado o mantenido',
      'Menciona patrones específicos implementados como CQRS, event sourcing o saga',
      'Destaca decisiones de descomposición de servicios y su justificación',
      'Incluye desafíos de sistemas distribuidos resueltos como consistencia de datos o manejo de fallos',
      'Cuantifica mejoras de escalabilidad y velocidad de despliegue por la adopción de microservicios'
    ],
    exampleBullets: [
      'Diseñé arquitectura de microservicios descomponiendo monolito en 35 servicios, habilitando a 8 equipos independientes desplegar más de 100 veces por semana',
      'Implementé microservicios orientados a eventos usando Kafka procesando 2M de eventos/día con semánticas exactly-once y 99.99% de éxito de procesamiento',
      'Lideré migración de arquitectura monolítica a microservicios reduciendo el lead time de despliegue de 2 semanas a 2 horas mientras mejoraba la disponibilidad del sistema del 99.5% al 99.99%',
      'Diseñé API gateway con rate limiting, autenticación y enrutamiento de solicitudes sirviendo 50M de llamadas API diarias en 40 microservicios'
    ],
    faqs: [
      { question: '¿Cómo demuestro habilidades de microservicios en mi currículum?', answer: 'Describe sistemas que hayas diseñado o en los que hayas trabajado: el número de servicios, patrones de comunicación (sync/async), estrategias de gestión de datos y enfoque de despliegue. Incluye desafíos específicos resueltos como transacciones distribuidas, versionado de servicios o prevención de fallas en cascada. Muestra que comprendes las desventajas, no solo los beneficios.' },
      { question: '¿Cuándo debería un equipo usar microservicios vs un monolito?', answer: 'Comienza con un monolito para la mayoría de los proyectos nuevos; es más simple y rápido de desarrollar inicialmente. Considera microservicios cuando necesites despliegue independiente para diferentes características, diferentes requisitos de escalado para diferentes componentes, múltiples equipos trabajando en la misma aplicación o elecciones de tecnología políglotas. La adopción prematura de microservicios agrega complejidad innecesaria.' },
      { question: '¿Qué habilidades complementan la arquitectura de microservicios?', answer: 'Orquestación de contenedores (Kubernetes), diseño de APIs (REST, gRPC), colas de mensajes (Kafka, RabbitMQ), tracing distribuido (Jaeger, Zipkin), service mesh (Istio), CI/CD para despliegues independientes y observabilidad (métricas, logs, trazas). Comprender DDD para diseño de límites de servicios también es altamente valioso.' }
    ]
  },
  'serverless-computing': {
    slug: 'computacion-serverless',
    title: 'Computación Serverless',
    description: `La computación serverless es un modelo de ejecución en la nube donde el proveedor gestiona dinámicamente la asignación de servidores, escalando automáticamente desde cero para manejar cualquier volumen de tráfico. Los desarrolladores escriben funciones o despliegan contenedores sin gestionar servidores, pagando solo por el tiempo de cómputo real consumido. Las principales plataformas serverless incluyen AWS Lambda, Azure Functions, Google Cloud Functions y Cloudflare Workers.\n\nServerless se extiende más allá de functions-as-a-service (FaaS) para incluir bases de datos gestionadas (DynamoDB, Aurora Serverless, Cosmos DB Serverless), API gateways (API Gateway, Azure API Management), buses de eventos (EventBridge, Event Grid), triggers de almacenamiento, procesamiento de colas y step functions para orquestación de flujos de trabajo. El modelo serverless proporciona auto-escalado automático, alta disponibilidad incorporada y cero mantenimiento de servidores.\n\nLas habilidades avanzadas de serverless incluyen optimizar el rendimiento de cold start, diseñar arquitecturas orientadas a eventos con patrones fan-out, implementar step functions para flujos de trabajo complejos, gestionar el estado de aplicaciones serverless, probar funciones serverless localmente y en CI/CD, monitorear con tracing distribuido, controlar costos a escala y comprender cuándo serverless es y no es la elección arquitectónica correcta.`,
    whyImportant: `La computación serverless reduce dramáticamente la carga operativa y permite a los equipos enfocarse en lógica de negocio en lugar de gestión de infraestructura. Elimina la planificación de capacidad, parcheo de servidores y decisiones de escalado mientras proporciona un modelo de costos de pago por ejecución que es extremadamente rentable para cargas de trabajo variables y esporádicas.\n\nLa adopción de serverless está creciendo rápidamente, con AWS Lambda solo procesando trillones de invocaciones mensuales. Las habilidades serverless demuestran pensamiento moderno de arquitectura de nube y son cada vez más requeridas para roles de ingeniería de nube y full-stack.`,
    keywords: ['habilidades serverless', 'currículum serverless', 'AWS Lambda', 'arquitectura serverless'],
    searchIntents: ['cómo incluir serverless en el currículum', 'habilidades serverless para ingenieros de nube', 'serverless vs contenedores'],
    relatedSkills: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud Platform', 'Arquitectura de Microservicios', 'CI/CD', 'Infraestructura como Código'],
    professionSlugs: ['ingeniero-de-nube', 'ingeniero-de-software', 'desarrollador-backend', 'arquitecto-de-nube', 'desarrollador-full-stack', 'arquitecto-de-soluciones'],
    atsKeywords: ['serverless', 'AWS Lambda', 'Azure Functions', 'Cloud Functions', 'FaaS', 'functions-as-a-service', 'API Gateway', 'EventBridge', 'Step Functions', 'DynamoDB', 'event-driven'],
    resumeTips: [
      'Especifica plataformas y servicios serverless usados en producción',
      'Menciona fuentes de eventos y patrones de integración implementados',
      'Destaca optimización de cold start y ajuste de rendimiento',
      'Incluye optimización de costos lograda a través de adopción serverless',
      'Cuantifica la escala en términos de invocaciones, eventos procesados o ejecuciones concurrentes'
    ],
    exampleBullets: [
      'Diseñé pipeline de procesamiento de eventos serverless manejando 10M de invocaciones Lambda diarias con EventBridge y SQS, logrando 99.99% de tasa de procesamiento a $800/mes',
      'Migré REST API de EC2 a API Gateway + Lambda, reduciendo costos de infraestructura en un 75% ($12K/mes) mientras mejoraba la respuesta de auto-escalado de minutos a milisegundos',
      'Construí pipeline de datos serverless usando Step Functions orquestando 15 funciones Lambda para procesamiento ETL, manejando 500GB diarios con reintentos automatizados y manejo de errores',
      'Optimicé cold starts de Lambda de 3.5s a 200ms mediante provisioned concurrency, optimización de capas y selección de runtime, mejorando la latencia P99 de API en un 60%'
    ],
    faqs: [
      { question: '¿Cuándo debo usar serverless vs contenedores?', answer: 'Serverless sobresale para cargas de trabajo orientadas a eventos, tráfico esporádico, APIs simples y pipelines de procesamiento de datos donde quieres cero gestión de infraestructura. Los contenedores (Kubernetes) son mejores para procesos de larga duración, requisitos de redes complejas, cargas de trabajo que necesitan acceso a GPU y aplicaciones que requieren latencia baja consistente sin cold starts.' },
      { question: '¿Cómo abordo las preocupaciones de cold start en serverless?', answer: 'Usa provisioned concurrency para funciones sensibles a latencia, elige runtimes más livianos (Node.js, Python sobre Java), minimiza el tamaño del paquete, evita attachment a VPC cuando sea posible, usa Lambda SnapStart para Java y diseña arquitecturas que toleren u oculten cold starts (procesamiento async, estrategias de pre-warming).' },
      { question: '¿Son valiosas las habilidades serverless para mi carrera?', answer: 'Sí, cada vez más. La adopción de serverless está creciendo en todas las industrias, y comprender la arquitectura orientada a eventos, servicios gestionados y diseño de nube optimizado en costos es altamente valorado. Las habilidades serverless complementan el conocimiento de contenedores y demuestran versatilidad para elegir la arquitectura correcta para diferentes requisitos.' }
    ]
  },
  'service-mesh': {
    slug: 'service-mesh',
    title: 'Service Mesh',
    description: `Un service mesh es una capa de infraestructura dedicada para gestionar la comunicación servicio-a-servicio en arquitecturas de microservicios. Maneja gestión de tráfico, seguridad y observabilidad a través de una red de proxies livianos (típicamente Envoy) desplegados junto a cada servicio, sin requerir cambios en el código de la aplicación. El mesh abstrae las preocupaciones de redes de los desarrolladores y proporciona políticas consistentes entre todos los servicios.\n\nLas implementaciones de service mesh incluyen Istio (más rico en características), Linkerd (liviano y simple), Consul Connect (ecosistema HashiCorp) y AWS App Mesh. Las capacidades clave incluyen mutual TLS para seguridad zero-trust, enrutamiento inteligente de tráfico (canary, blue-green, traffic mirroring), circuit breaking y políticas de retry, tracing distribuido, registro de acceso y rate limiting.\n\nLas habilidades avanzadas de service mesh incluyen federación multi-clúster de mesh, implementar estrategias de entrega progresiva, configurar filtros Envoy y plugins WebAssembly para lógica personalizada del plano de datos, diseñar políticas de mesh para plataformas multi-tenant, optimizar consumo de recursos de sidecars, evaluar arquitecturas de mesh ambient (sin sidecar) e integrar observabilidad de mesh con plataformas de monitoreo.`,
    whyImportant: `A medida que los despliegues de microservicios crecen en complejidad, gestionar la comunicación servicio-a-servicio, seguridad y observabilidad se vuelve cada vez más difícil. Los service meshes proporcionan una solución uniforme que aplica políticas consistentes en todos los servicios, independientemente del lenguaje de programación o framework.\n\nLa experiencia en service mesh señala conocimiento avanzado de sistemas distribuidos, redes y arquitectura cloud-native. Es cada vez más listada como requisito para roles senior de ingeniería de plataforma y SRE en organizaciones que operan grandes despliegues Kubernetes.`,
    keywords: ['habilidades de service mesh', 'currículum service mesh', 'Istio Linkerd', 'redes de microservicios'],
    searchIntents: ['cómo incluir service mesh en el currículum', 'service mesh para DevOps', 'cuándo usar un service mesh'],
    relatedSkills: ['Istio', 'Kubernetes', 'Arquitectura de Microservicios', 'Consul', 'Contenedorización', 'Fundamentos de Redes', 'Prometheus'],
    professionSlugs: ['ingeniero-de-plataforma', 'ingeniero-devops', 'ingeniero-de-confiabilidad-de-sitios', 'arquitecto-de-nube', 'ingeniero-de-infraestructura'],
    atsKeywords: ['service mesh', 'Istio', 'Linkerd', 'Envoy', 'sidecar proxy', 'mTLS', 'traffic management', 'circuit breaker', 'distributed tracing', 'Consul Connect'],
    resumeTips: [
      'Especifica la plataforma de service mesh y la escala de tu despliegue',
      'Menciona patrones de gestión de tráfico implementados',
      'Destaca mejoras de seguridad por la aplicación de mTLS',
      'Incluye mejoras de observabilidad ganadas a través del mesh',
      'Cuantifica mejoras de confiabilidad por políticas de circuit breaking y retry'
    ],
    exampleBullets: [
      'Desplegué service mesh Istio en 120 microservicios en Kubernetes, habilitando redes mTLS zero-trust y control de tráfico granular',
      'Implementé entrega progresiva mediante traffic splitting del service mesh, desplegando cambios de forma segura a 5M de usuarios diarios con análisis canary automatizado',
      'Reduje fallas en cascada en un 80% después de implementar circuit breakers y presupuestos de retry del service mesh en 60 rutas de comunicación inter-servicio',
      'Integré telemetría del service mesh con Prometheus y Jaeger proporcionando 100% de cobertura de tracing distribuido y dashboards de señales doradas para todos los servicios'
    ],
    faqs: [
      { question: '¿Cuándo necesita un equipo un service mesh?', answer: 'Considera un service mesh cuando tengas más de 20 microservicios que necesiten mTLS consistente, gestión de tráfico u observabilidad. Si necesitas despliegues canary, circuit breaking o redes zero-trust en muchos servicios, un mesh proporciona estas capacidades uniformemente. Para despliegues más pequeños, la complejidad adicional puede no justificar los beneficios.' },
      { question: '¿Qué service mesh debo aprender?', answer: 'Istio es el más ampliamente adoptado y aparece en la mayoría de las ofertas de trabajo. Linkerd es más simple y más liviano pero menos rico en características. Consul Connect es valioso en entornos con fuerte presencia HashiCorp. Comienza con Istio para máximo valor de carrera, pero comprende que los conceptos son transferibles entre implementaciones.' },
      { question: '¿Un service mesh agrega overhead significativo?', answer: 'Los proxies sidecar agregan 1-3ms de latencia por salto y consumen memoria y CPU por pod. Para la mayoría de los servicios, esto es negligible, pero se acumula a escala extrema. El overhead de recursos típicamente varía de 50-100MB de memoria por sidecar. Los modos ambient mesh más nuevos (sin sidecar) reducen significativamente el overhead por pod.' }
    ]
  },
  'site-reliability-engineering': {
    slug: 'ingenieria-de-confiabilidad-de-sitios',
    title: 'Ingeniería de Confiabilidad de Sitios (SRE)',
    description: `La Ingeniería de Confiabilidad de Sitios es una disciplina que aplica principios de ingeniería de software a problemas de infraestructura y operaciones, desarrollada originalmente en Google. SRE se enfoca en crear sistemas de software escalables y confiables a través de prácticas incluyendo Objetivos de Nivel de Servicio (SLOs), presupuestos de errores, reducción de toil a través de automatización, postmortems sin culpables, planificación de capacidad y gestión de incidentes on-call.\n\nLas prácticas clave de SRE incluyen definir SLIs (Indicadores de Nivel de Servicio) y SLOs que cuantifican objetivos de confiabilidad, usar presupuestos de errores para equilibrar velocidad de características con confiabilidad, implementar observabilidad a través de métricas, logs y trazas, automatizar tareas operativas para reducir el toil por debajo del 50%, conducir experimentos de ingeniería del caos y gestionar incidentes con procedimientos de respuesta estructurados.\n\nSRE avanzado involucra diseñar sistemas para degradación elegante, implementar load shedding y mecanismos de backpressure, modelado de capacidad con enfoques matemáticos, diseñar estrategias de replicación de datos, gestionar sistemas distribuidos a gran escala y construir plataformas internas que codifiquen patrones de confiabilidad en los flujos de trabajo de desarrollo.`,
    whyImportant: `SRE se ha convertido en el estándar de oro para operar sistemas confiables a escala. Empresas incluyendo Google, Netflix, LinkedIn, Dropbox y Twitter han adoptado prácticas SRE, y el rol de SRE ha crecido hasta convertirse en una de las posiciones mejor pagadas en tecnología.\n\nLas habilidades SRE demuestran la capacidad de pensar sistemáticamente sobre la confiabilidad, tomar decisiones basadas en datos sobre riesgo y construir automatización que reduce la carga operativa. La disciplina une la ingeniería de software y las operaciones de una manera que produce resultados mediblemente mejores que los enfoques tradicionales.`,
    keywords: ['habilidades SRE', 'currículum ingeniería de confiabilidad de sitios', 'prácticas SRE', 'ingeniería de confiabilidad'],
    searchIntents: ['cómo incluir SRE en el currículum', 'habilidades SRE para la carrera', 'SRE vs DevOps'],
    relatedSkills: ['Prometheus', 'Grafana', 'Kubernetes', 'Ingeniería del Caos', 'CI/CD', 'Administración Linux', 'Datadog', 'Infraestructura como Código'],
    professionSlugs: ['ingeniero-de-confiabilidad-de-sitios', 'ingeniero-devops', 'ingeniero-de-plataforma', 'ingeniero-de-software', 'ingeniero-de-nube', 'ingeniero-de-infraestructura'],
    atsKeywords: ['SRE', 'site reliability engineering', 'SLO', 'SLI', 'error budget', 'incident management', 'postmortem', 'toil reduction', 'reliability', 'on-call', 'capacity planning'],
    resumeTips: [
      'Especifica SLOs definidos y mantenidos con sus objetivos y rendimiento real',
      'Menciona logros de reducción de toil con porcentajes específicos',
      'Destaca experiencia de gestión de incidentes incluyendo liderazgo de postmortems',
      'Incluye mejoras de confiabilidad con métricas medibles',
      'Cuantifica la escala de sistemas para los que aseguras confiabilidad'
    ],
    exampleBullets: [
      'Establecí práctica SRE definiendo SLOs para 40 servicios con desarrollo dirigido por presupuesto de errores, mejorando la disponibilidad de la plataforma del 99.9% al 99.99%',
      'Reduje el toil operativo del 60% al 25% del tiempo del equipo a través de automatización de más de 30 tareas recurrentes, habilitando enfoque en proyectos de ingeniería de confiabilidad',
      'Lideré respuesta a incidentes para más de 50 incidentes de producción con postmortems estructurados produciendo más de 200 action items, reduciendo incidentes repetidos en un 70%',
      'Implementé políticas de presupuesto de errores habilitando decisiones basadas en datos de confiabilidad vs velocidad de características, resultando en 40% menos incidentes con impacto al cliente año tras año',
      'Diseñé modelos de planificación de capacidad prediciendo con precisión las necesidades de recursos 6 meses adelante, previniendo 3 potenciales caídas relacionadas con capacidad'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre SRE y DevOps?', answer: 'DevOps es un enfoque cultural y filosófico para la colaboración entre desarrollo y operaciones. SRE es una implementación específica de esa filosofía usando prácticas de ingeniería de software. Google lo describe como "SRE implementa DevOps". SRE proporciona prácticas concretas (SLOs, presupuestos de errores, presupuestos de toil) mientras DevOps proporciona principios (colaboración, automatización, medición).' },
      { question: '¿Cómo hago la transición a un rol SRE?', answer: 'Construye fundamentos sólidos en Linux, redes y al menos un lenguaje de programación (Python o Go preferido). Aprende monitoreo (Prometheus/Grafana), plataformas de nube (AWS/GCP) y Kubernetes. Estudia el libro de Google SRE. Demuestra pensamiento SRE en tu rol actual implementando SLOs, automatizando toil y liderando postmortems.' },
      { question: '¿Qué hace un currículum SRE fuerte?', answer: 'Enfócate en métricas de confiabilidad (SLOs logrados, mejoras de uptime, reducción de incidentes), logros de automatización (porcentajes de reducción de toil), experiencia de gestión de incidentes (incidentes manejados, postmortems liderados) y escala de sistemas (solicitudes/segundo, usuarios, servicios). Muestra tanto profundidad técnica como la capacidad de pensar sistemáticamente sobre la confiabilidad.' }
    ]
  },
  'chaos-engineering': {
    slug: 'ingenieria-del-caos',
    title: 'Ingeniería del Caos',
    description: `La ingeniería del caos es la disciplina de experimentar en sistemas distribuidos para construir confianza en su capacidad de soportar condiciones turbulentas en producción. Pionera de Netflix con su herramienta Chaos Monkey, involucra introducir deliberadamente fallas controladas, como matar instancias, inyectar latencia, corromper paquetes de red o simular caídas de región, para identificar debilidades antes de que causen incidentes reales.\n\nLas herramientas de ingeniería del caos incluyen Chaos Monkey (Netflix), Gremlin (plataforma comercial), Litmus (nativo de Kubernetes), AWS Fault Injection Simulator, Azure Chaos Studio y Chaos Mesh. La práctica sigue un método científico: formar una hipótesis sobre el comportamiento del sistema, diseñar un experimento para probarlo, ejecutar el experimento con radio de impacto controlado, observar resultados y mejorar el sistema basándose en los hallazgos.\n\nLa ingeniería del caos avanzada involucra diseñar estrategias de experimentos progresivos desde desarrollo hasta producción, implementar verificación automatizada de estado estable, crear game days para preparación del equipo, integrar experimentos de caos en pipelines CI/CD, medir resiliencia cuantitativamente y construir una cultura donde la falla controlada se abraza como herramienta de mejora de confiabilidad.`,
    whyImportant: `Los sistemas distribuidos modernos son inherentemente complejos, y es imposible predecir todos los modos de falla solo a través de pruebas. La ingeniería del caos descubre proactivamente debilidades probando el comportamiento real del sistema bajo condiciones adversas, en lugar de esperar a que los incidentes de producción las revelen.\n\nLas organizaciones que practican ingeniería del caos experimentan menos incidentes de producción y menos severos porque ya han identificado y fortalecido el sistema contra escenarios de falla comunes. Las habilidades de ingeniería del caos son particularmente valoradas para roles SRE y de ingeniería de plataforma en empresas que operan sistemas críticos a escala.`,
    keywords: ['habilidades de ingeniería del caos', 'currículum ingeniería del caos', 'pruebas de resiliencia', 'chaos monkey'],
    searchIntents: ['cómo incluir ingeniería del caos en el currículum', 'ingeniería del caos para SRE', 'herramientas de ingeniería del caos'],
    relatedSkills: ['Ingeniería de Confiabilidad de Sitios', 'Kubernetes', 'Arquitectura de Microservicios', 'Prometheus', 'CI/CD', 'Optimización de Costos en la Nube'],
    professionSlugs: ['ingeniero-de-confiabilidad-de-sitios', 'ingeniero-devops', 'ingeniero-de-plataforma', 'arquitecto-de-nube', 'ingeniero-de-software'],
    atsKeywords: ['chaos engineering', 'Chaos Monkey', 'Gremlin', 'Litmus', 'fault injection', 'resilience testing', 'game days', 'failure injection', 'blast radius', 'steady state'],
    resumeTips: [
      'Describe los experimentos de caos diseñados y su impacto en la resiliencia del sistema',
      'Menciona herramientas usadas y la escala de experimentos conducidos',
      'Destaca vulnerabilidades descubiertas a través de ingeniería del caos',
      'Incluye experiencia de facilitación de game days',
      'Cuantifica mejoras de confiabilidad resultantes de experimentos de caos'
    ],
    exampleBullets: [
      'Establecí programa de ingeniería del caos ejecutando más de 50 experimentos trimestrales en 30 microservicios, descubriendo y remediando 25 modos de falla críticos antes del impacto en producción',
      'Implementé experimentos de caos automatizados en pipeline CI/CD usando Litmus, validando resiliencia de cada despliegue contra 10 escenarios de falla',
      'Facilité 12 game days simulando fallas de región, caídas de base de datos y particiones de red, entrenando a 40 ingenieros en respuesta a incidentes y mejorando MTTR en un 45%',
      'Diseñé estrategia de caos progresivo comenzando con staging y expandiendo a producción con radio de impacto controlado, resultando en cero impacto al cliente causado por caos'
    ],
    faqs: [
      { question: '¿La ingeniería del caos es solo para grandes empresas como Netflix?', answer: 'No. Aunque Netflix la popularizó, los principios de ingeniería del caos aplican a cualquier escala. Comienza pequeño: mata una instancia de servicio no crítica y verifica la recuperación. A medida que crece la madurez, expande a fallas de red, caídas de dependencias y failovers de región. Herramientas como Litmus y Gremlin la hacen accesible para cualquier organización.' },
      { question: '¿Cómo empiezo con ingeniería del caos de forma segura?', answer: 'Comienza en entornos de no-producción con experimentos bien entendidos. Define métricas de estado estable antes de experimentar. Comienza con radio de impacto mínimo (instancia única) y gradualmente expande. Siempre ten un plan de rollback. Construye confianza incrementalmente: staging primero, luego producción con protecciones.' },
      { question: '¿Cómo difiere la ingeniería del caos de las pruebas de estrés?', answer: 'Las pruebas de estrés empujan los sistemas más allá de la carga normal para encontrar puntos de quiebre. La ingeniería del caos introduce condiciones de falla realistas (muerte de instancias, latencia de red, falla de dependencias) a carga normal para verificar la degradación elegante. La ingeniería del caos prueba cómo se comportan los sistemas cuando las cosas se rompen, no cuando están sobrecargados.' }
    ]
  },
  'cloud-cost-optimization': {
    slug: 'optimizacion-de-costos-en-la-nube',
    title: 'Optimización de Costos en la Nube',
    description: `La optimización de costos en la nube es la práctica de reducir el gasto en la nube mientras se mantiene o mejora el rendimiento, disponibilidad y escalabilidad. Abarca right-sizing de recursos, aprovechar capacidad reservada y savings plans, implementar auto-escalado, eliminar desperdicio de recursos no utilizados, optimizar niveles de almacenamiento, gestionar costos de transferencia de datos y establecer prácticas FinOps para gestión financiera de la nube.\n\nLas estrategias clave de optimización de costos incluyen: right-sizing de instancias basado en datos de utilización, comprar Instancias Reservadas o Savings Plans para cargas de trabajo predecibles, usar instancias spot/preemptible para cargas de trabajo tolerantes a fallos, implementar auto-escalado para coincidir capacidad con demanda, eliminar recursos no utilizados (volúmenes EBS sin adjuntar, load balancers ociosos, snapshots antiguos), optimizar almacenamiento con políticas de ciclo de vida y usar tags de asignación de costos para visibilidad.\n\nLa optimización avanzada de costos en la nube involucra implementar marcos FinOps para responsabilidad organizacional, construir dashboards de costos personalizados y detección de anomalías, diseñar arquitecturas para eficiencia de costos (serverless, instancias basadas en ARM, optimización multi-región), negociar programas de descuento empresarial, implementar asignación de costos de Kubernetes con herramientas como Kubecost y crear políticas automatizadas de gobernanza de costos.`,
    whyImportant: `El gasto en la nube es uno de los gastos de TI más grandes y de más rápido crecimiento, con organizaciones frecuentemente sobregastando un 30-35% en recursos de nube. A medida que los presupuestos de nube crecen a millones o decenas de millones de dólares anuales, las habilidades de optimización que pueden reducir costos en incluso un 20-30% se traducen en impacto financiero masivo.\n\nLas habilidades de optimización de costos en la nube son altamente valoradas porque impactan directamente el resultado final. FinOps (gestión financiera de la nube) ha emergido como una disciplina dedicada, y la ingeniería consciente de costos es cada vez más esperada de todos los profesionales de la nube, no solo de equipos FinOps dedicados.`,
    keywords: ['optimización de costos en la nube', 'currículum gestión de costos de nube', 'habilidades FinOps', 'ahorros en la nube'],
    searchIntents: ['cómo incluir optimización de costos en la nube en el currículum', 'habilidades de reducción de costos de nube', 'oportunidades de carrera FinOps'],
    relatedSkills: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud Platform', 'Kubernetes', 'Computación Serverless', 'Infraestructura como Código'],
    professionSlugs: ['ingeniero-de-nube', 'arquitecto-de-nube', 'ingeniero-devops', 'arquitecto-de-soluciones', 'gerente-de-ti', 'ingeniero-de-confiabilidad-de-sitios'],
    atsKeywords: ['cloud cost optimization', 'FinOps', 'cost management', 'right-sizing', 'Reserved Instances', 'Savings Plans', 'spot instances', 'cost allocation', 'cloud economics', 'cost governance', 'Kubecost'],
    resumeTips: [
      'Cuantifica ahorros de costos tanto en porcentaje como en montos en dólares',
      'Especifica estrategias de optimización aplicadas y su impacto',
      'Menciona prácticas y herramientas FinOps implementadas',
      'Incluye mejoras de visibilidad de costos como etiquetado y dashboards',
      'Destaca políticas automatizadas de gobernanza de costos creadas'
    ],
    exampleBullets: [
      'Reduje el gasto anual en la nube en $2.4M (32%) mediante compras de Instancias Reservadas, right-sizing de más de 300 instancias y eliminación de $200K en recursos ociosos',
      'Implementé práctica FinOps con etiquetado de asignación de costos logrando 98% de cumplimiento de tags, habilitando responsabilidad de costos por equipo para un presupuesto anual de nube de $8M',
      'Diseñé estrategia de instancias spot para cargas de trabajo de procesamiento por lotes, reduciendo costos de cómputo en un 70% ($45K/mes) con manejo elegante de interrupciones',
      'Construí detección automatizada de anomalías de costos alertando sobre desviaciones del 15% del presupuesto dentro de 4 horas, previniendo 3 incidentes de costos descontrolados por un total de $50K',
      'Implementé Kubecost en 10 clústeres Kubernetes proporcionando asignación de costos por namespace, habilitando a los equipos a optimizar solicitudes de recursos de contenedores y ahorrar $180K anuales'
    ],
    faqs: [
      { question: '¿Cómo demuestro habilidades de optimización de costos en un currículum?', answer: 'Siempre cuantifica con montos específicos en dólares y porcentajes. Detalla las estrategias aplicadas (right-sizing, capacidad reservada, instancias spot, optimización de almacenamiento), herramientas usadas (AWS Cost Explorer, Kubecost, dashboards personalizados) y el impacto organizacional. Muestra que puedes equilibrar costos con rendimiento y confiabilidad.' },
      { question: '¿Qué es FinOps y debo aprenderlo?', answer: 'FinOps es la práctica de traer responsabilidad financiera al gasto en la nube a través de la colaboración entre equipos de ingeniería, finanzas y negocio. Es una disciplina creciente con su propia certificación (FinOps Certified Practitioner). Aprender los principios de FinOps mejora cualquier rol de nube y puede llevar a posiciones dedicadas de FinOps que están en demanda creciente.' },
      { question: '¿Cuáles son las mayores oportunidades de optimización de costos en la nube?', answer: 'Las principales oportunidades son: right-sizing de instancias sobre-aprovisionadas (típicamente 30-40% de las instancias están sobredimensionadas), comprar capacidad reservada para cargas de trabajo estables (40-72% de ahorro), usar instancias spot para trabajo tolerante a fallos (60-90% de ahorro), eliminar recursos ociosos y optimizar niveles de almacenamiento. Comienza con visibilidad: no puedes optimizar lo que no puedes ver.' }
    ]
  },
};
