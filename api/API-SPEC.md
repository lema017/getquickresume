# 📋 API Specification - GetQuickResume

## 🌐 Base URL
- **Development**: `http://localhost:3001`
- **Production**: `https://api.getquickresume.com`

## 🔐 Authentication
La API utiliza JWT (JSON Web Tokens) para autenticación. Los tokens se obtienen mediante autenticación con Google OAuth.

### Headers Requeridos
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 📚 Endpoints Disponibles

### 🔑 **Authentication Endpoints**

#### 1. **POST** `/api/auth/google`
**Descripción**: Autentica / crea  un usuario usando Google OAuth y devuelve un JWT token del sitio.

**Parámetros de Entrada**:
```json
{
  "token": "string" // Google OAuth token
}
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "avatarUrl": "https://lh3.googleusercontent.com/...",
    "city": "New York",
    "country": "United States",
    "location": "New York, United States",
    "linkedin": "https://linkedin.com/in/johndoe",
    "targetFunction": "Software Developer",
    "profession": "Software Engineer",
    "provider": "google",
    "isPremium": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Respuesta de Error** (400/500):
```json
{
  "success": false,
  "error": "Error message"
}
```

---

#### 2. **POST** `/api/auth/linkedin`
**Descripción**: Autentica / crea un usuario usando LinkedIn OAuth. Intercambia el código de autorización por un access token, valida el token y devuelve un JWT token del sitio.

**Headers Requeridos**:
```http
Content-Type: application/json
```

**Parámetros de Entrada**:
```json
{
  "code": "linkedin_authorization_code"
}
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "avatarUrl": "https://media.licdn.com/...",
    "city": "New York",
    "country": "United States",
    "location": "New York, United States",
    "linkedin": "https://linkedin.com/in/johndoe",
    "targetFunction": "Software Developer",
    "profession": "Software Engineer",
    "provider": "linkedin",
    "isPremium": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Respuesta de Error** (400/401/500):
```json
{
  "success": false,
  "error": "Invalid or expired LinkedIn token"
}
```

---

#### 3. **GET** `/api/auth/validate`
**Descripción**: Valida si un JWT token es válido.

**Headers Requeridos**:
```http
Authorization: Bearer <jwt_token>
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "message": "Token is valid"
}
```

**Respuesta de Error** (401):
```json
{
  "success": false,
  "error": "Invalid token"
}
```

---

### 👤 **User Management Endpoints**

#### 3. **GET** `/api/user/tokens`
**Descripción**: Obtiene el número de tokens disponibles para el usuario autenticado.

**Headers Requeridos**:
```http
Authorization: Bearer <jwt_token>
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "tokens": 25
}
```

**Respuesta de Error** (401/404):
```json
{
  "success": false,
  "error": "Unauthorized: No user context found"
}
```

---

#### 4. **POST** `/api/user/tokens/reduce`
**Descripción**: Reduce el número de tokens del usuario autenticado.

**Headers Requeridos**:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Parámetros de Entrada**:
```json
{
  "amount": 5 // Número entero positivo (máximo 10 por request)
}
```

**Validaciones**:
- `amount` debe ser un número entero positivo
- Máximo 10 tokens por request
- El usuario debe tener suficientes tokens

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "message": "Tokens reduced successfully",
  "tokensRemaining": 20,
  "tokensReduced": 5
}
```

**Respuesta de Error** (400/409):
```json
{
  "success": false,
  "error": "Insufficient tokens. You have 3 token(s) but tried to reduce by 5"
}
```

---

### 📄 **Resume Generation Endpoints**

#### 5. **POST** `/api/resume/generate`
**Descripción**: Genera un CV profesional usando IA. Consume 5 tokens del usuario.

**Headers Requeridos**:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Parámetros de Entrada**:
```json
{
  "resumeData": {
    // Step 1: Professional Profile
    "firstName": "John",
    "lastName": "Doe",
    "country": "United States",
    "linkedin": "https://linkedin.com/in/johndoe",
    "language": "en",
    "targetLevel": "senior",
    "profession": "Software Engineer",
    "tone": "professional",
    "phone": "+1-555-123-4567",
    "email": "john.doe@example.com",
    
    // Step 2: Skills
    "skillsRaw": ["JavaScript", "React", "Node.js"],
    "toolsRaw": ["VS Code", "Git", "Docker"],
    
    // Step 3: Work Experience
    "experience": [
      {
        "id": "exp1",
        "title": "Senior Software Engineer",
        "company": "Tech Corp",
        "startDate": "2020-01-01",
        "endDate": "2023-12-31",
        "isCurrent": false,
        "achievements": ["Led team of 5 developers", "Improved performance by 40%"],
        "responsibilities": ["Develop web applications", "Code reviews"]
      }
    ],
    
    // Step 4: Education
    "education": [
      {
        "id": "edu1",
        "institution": "University of Technology",
        "degree": "Bachelor of Science",
        "field": "Computer Science",
        "startDate": "2016-09-01",
        "endDate": "2020-06-01",
        "isCompleted": true,
        "gpa": "3.8"
      }
    ],
    
    // Step 5: Projects
    "projects": [
      {
        "id": "proj1",
        "name": "E-commerce Platform",
        "description": "Full-stack e-commerce solution",
        "technologies": ["React", "Node.js", "MongoDB"],
        "url": "https://github.com/johndoe/ecommerce",
        "startDate": "2022-01-01",
        "endDate": "2022-06-01",
        "isOngoing": false
      }
    ],
    
    // Step 6: Achievements
    "achievements": [
      {
        "id": "ach1",
        "title": "Best Employee Award",
        "description": "Recognized for outstanding performance",
        "year": "2022"
      }
    ],
    
    // Step 7: Professional Summary
    "summary": "Experienced software engineer with 5+ years...",
    "jobDescription": "Looking for senior software engineer position...",
    
    // Metadata
    "completedSteps": [1, 2, 3, 4, 5, 6, 7],
    "currentStep": 7,
    "totalCharacters": 2500,
    "lastSaved": "2024-01-01T12:00:00.000Z"
  }
}
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "data": {
    "professionalSummary": "Experienced software engineer with 5+ years...",
    "experience": [
      {
        "title": "Senior Software Engineer",
        "company": "Tech Corp",
        "duration": "2020 - 2023",
        "location": "San Francisco, CA",
        "description": "Led development of scalable web applications...",
        "achievements": [
          "Improved application performance by 40%",
          "Led team of 5 developers"
        ],
        "skills": ["JavaScript", "React", "Node.js"],
        "impact": ["Reduced load times by 50%", "Increased user satisfaction"]
      }
    ],
    "education": [
      {
        "degree": "Bachelor of Science in Computer Science",
        "institution": "University of Technology",
        "field": "Computer Science",
        "duration": "2016 - 2020",
        "gpa": "3.8",
        "relevantCoursework": ["Data Structures", "Algorithms", "Database Systems"],
        "honors": ["Magna Cum Laude", "Dean's List"]
      }
    ],
    "skills": {
      "technical": ["JavaScript", "React", "Node.js", "Python"],
      "soft": ["Leadership", "Problem Solving", "Communication"],
      "tools": ["VS Code", "Git", "Docker", "AWS"]
    },
    "projects": [
      {
        "name": "E-commerce Platform",
        "description": "Full-stack e-commerce solution with modern UI/UX",
        "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
        "duration": "6 months",
        "url": "https://github.com/johndoe/ecommerce",
        "achievements": [
          "Handled 10,000+ concurrent users",
          "Achieved 99.9% uptime"
        ],
        "impact": "Generated $50K in revenue for client"
      }
    ],
    "certifications": [
      {
        "name": "AWS Certified Solutions Architect",
        "issuer": "Amazon Web Services",
        "date": "2023-03-15",
        "credentialId": "AWS-SAA-123456",
        "url": "https://aws.amazon.com/verification",
        "skills": ["Cloud Architecture", "AWS Services", "DevOps"]
      }
    ],
    "achievements": [
      "Led team of 5 developers to deliver 3 major projects",
      "Improved application performance by 40%",
      "Best Employee Award 2022"
    ],
    "languages": [
      {
        "language": "English",
        "level": "Native",
        "certifications": []
      },
      {
        "language": "Spanish",
        "level": "Advanced",
        "certifications": ["DELE B2"]
      }
    ],
    "contactInfo": {
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-123-4567",
      "location": "San Francisco, CA",
      "linkedin": "https://linkedin.com/in/johndoe"
    },
    "metadata": {
      "generatedAt": "2024-01-01T12:00:00.000Z",
      "tokensUsed": 5,
      "aiProvider": "openai",
      "model": "gpt-4"
    }
  },
  "message": "Resume generated successfully",
  "tokensUsed": 5
}
```

**Respuesta de Error** (400/401/500):
```json
{
  "success": false,
  "error": "Insufficient tokens",
  "message": "You need 5 tokens to generate a resume. You currently have 3 tokens."
}
```

---

## 🔧 **CORS Headers**
Todos los endpoints incluyen headers CORS para permitir requests desde el frontend:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS
```

**Configuración CORS en serverless.yml**:
- **Orígenes permitidos**: 
  - `https://api-dev.getquickresume.com` (API de producción)
  - `http://localhost:3000` (Frontend dev server)
  - `http://localhost:3001` (API Gateway simulation)
  - `http://localhost:3002` (Lambda simulation)
- **Headers permitidos**: Content-Type, Authorization, X-Amz-Date, X-Api-Key, X-Amz-Security-Token, X-Amz-User-Agent
- **Métodos permitidos**: GET, POST, PUT, PATCH, DELETE, OPTIONS
- **Credentials**: No permitidas (allowCredentials: false)

---

## 📊 **Códigos de Estado HTTP**

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 201 | Creado exitosamente (para endpoints POST de creación) |
| 400 | Error en la petición (datos inválidos) |
| 401 | No autorizado (token inválido o faltante) |
| 404 | Recurso no encontrado |
| 409 | Conflicto (tokens insuficientes) |
| 500 | Error interno del servidor |

---

## 🚀 **Rate Limiting**
- **getUserTokens**: Sin límite específico
- **reduceUserTokens**: Máximo 10 tokens por request
- **generateResume**: Consume 5 tokens por generación
- **optimizeForJob**: Consume 5 tokens por optimización
- **getSuggestions**: Sin consumo de tokens (usa cache)
- **generateAchievementSuggestions**: Sin consumo de tokens (generación con IA)
- **generateSummarySuggestions**: Sin consumo de tokens (generación personalizada con IA)

---

## 🔒 **Seguridad**
- Todos los endpoints protegidos requieren JWT válido (excepto auth endpoints)
- Los tokens JWT tienen expiración configurable (300 segundos de cache)
- Validación de entrada en todos los endpoints
- CORS configurado para dominios específicos
- Autorización personalizada con Lambda Authorizer
- Validación de parámetros de entrada (tipo, idioma, estructura de datos)
- Sanitización de URLs y datos de entrada

---

## 5. Resume Management

### 5.1 List Resumes

**Endpoint**: `GET /api/resumes`  
**Authentication**: Required (Bearer Token)  
**Description**: Retrieves all resumes for the authenticated user

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "userId": "string",
      "title": "string",
      "resumeData": { /* ResumeData object */ },
      "generatedResume": { /* GeneratedResume object */ },
      "status": "draft" | "generated" | "optimized",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "message": "Resumes retrieved successfully"
}
```

### 5.2 Get Resume

**Endpoint**: `GET /api/resumes/{id}`  
**Authentication**: Required (Bearer Token)  
**Description**: Retrieves a specific resume by ID

### Path Parameters
- `id` (string): Resume ID

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "title": "string",
    "resumeData": { /* ResumeData object */ },
    "generatedResume": { /* GeneratedResume object */ },
    "status": "draft" | "generated" | "optimized",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "Resume retrieved successfully"
}
```

### Error Responses
- **400 Bad Request**: Missing resume ID
- **401 Unauthorized**: Invalid or missing token
- **404 Not Found**: Resume not found
- **500 Internal Server Error**: Database error

### 5.3 Create Resume

**Endpoint**: `POST /api/resumes`  
**Authentication**: Required (Bearer Token)  
**Description**: Creates a new resume draft

### Request Body
```json
{
  "resumeData": { /* ResumeData object */ },
  "title": "string" // Optional, defaults to "FirstName LastName - CV"
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "title": "string",
    "resumeData": { /* ResumeData object */ },
    "status": "draft",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "Resume created successfully"
}
```

### 5.4 Update Resume

**Endpoint**: `PUT /api/resumes/{id}`  
**Authentication**: Required (Bearer Token)  
**Description**: Updates an existing resume

### Path Parameters
- `id` (string): Resume ID

### Request Body
```json
{
  "title": "string", // Optional
  "resumeData": { /* Partial ResumeData object */ }, // Optional
  "status": "draft" | "generated" | "optimized" // Optional
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "title": "string",
    "resumeData": { /* ResumeData object */ },
    "generatedResume": { /* GeneratedResume object */ },
    "status": "draft" | "generated" | "optimized",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "Resume updated successfully"
}
```

### 5.5 Delete Resume

**Endpoint**: `DELETE /api/resumes/{id}`  
**Authentication**: Required (Bearer Token)  
**Description**: Deletes a resume

### Path Parameters
- `id` (string): Resume ID

### Response
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

---

## 6. Job Interest Management

### 6.1 List Job Interests

**Endpoint**: `GET /api/job-interests`  
**Authentication**: Required (Bearer Token)  
**Description**: Retrieves all job interests for the authenticated user

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "userId": "string",
      "jobTitle": "string",
      "company": "string",
      "jobDescription": "string",
      "jobUrl": "string",
      "optimizedResumeId": "string",
      "status": "active" | "applied" | "closed",
      "createdAt": "string"
    }
  ],
  "message": "Job interests retrieved successfully"
}
```

### 6.2 Get Job Interest

**Endpoint**: `GET /api/job-interests/{id}`  
**Authentication**: Required (Bearer Token)  
**Description**: Retrieves a specific job interest by ID

### Path Parameters
- `id` (string): Job Interest ID

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "jobTitle": "string",
    "company": "string",
    "jobDescription": "string",
    "jobUrl": "string",
    "optimizedResumeId": "string",
    "status": "active" | "applied" | "closed",
    "createdAt": "string"
  },
  "message": "Job interest retrieved successfully"
}
```

### 6.3 Create Job Interest

**Endpoint**: `POST /api/job-interests`  
**Authentication**: Required (Bearer Token)  
**Description**: Creates a new job interest

### Request Body
```json
{
  "jobTitle": "string",
  "company": "string",
  "jobDescription": "string",
  "jobUrl": "string" // Optional
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "jobTitle": "string",
    "company": "string",
    "jobDescription": "string",
    "jobUrl": "string",
    "status": "active",
    "createdAt": "string"
  },
  "message": "Job interest created successfully"
}
```

### 6.4 Update Job Interest

**Endpoint**: `PUT /api/job-interests/{id}`  
**Authentication**: Required (Bearer Token)  
**Description**: Updates an existing job interest

### Path Parameters
- `id` (string): Job Interest ID

### Request Body
```json
{
  "jobTitle": "string", // Optional
  "company": "string", // Optional
  "jobDescription": "string", // Optional
  "jobUrl": "string", // Optional
  "status": "active" | "applied" | "closed" // Optional
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "jobTitle": "string",
    "company": "string",
    "jobDescription": "string",
    "jobUrl": "string",
    "optimizedResumeId": "string",
    "status": "active" | "applied" | "closed",
    "createdAt": "string"
  },
  "message": "Job interest updated successfully"
}
```

### 6.5 Delete Job Interest

**Endpoint**: `DELETE /api/job-interests/{id}`  
**Authentication**: Required (Bearer Token)  
**Description**: Deletes a job interest

### Path Parameters
- `id` (string): Job Interest ID

### Response
```json
{
  "success": true,
  "message": "Job interest deleted successfully"
}
```

### 6.6 Optimize Resume for Job

**Endpoint**: `POST /api/job-interests/{id}/optimize`  
**Authentication**: Required (Bearer Token)  
**Description**: Optimizes a resume for a specific job (consumes 5 tokens)

### Path Parameters
- `id` (string): Job Interest ID

### Request Body
```json
{
  "resumeId": "string"
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "jobTitle": "string",
    "company": "string",
    "jobDescription": "string",
    "jobUrl": "string",
    "optimizedResumeId": "string",
    "status": "applied",
    "createdAt": "string"
  },
  "message": "Resume optimized for job successfully",
  "tokensUsed": 5
}
```

### Error Responses
- **400 Bad Request**: Missing resume ID, insufficient tokens, or missing required fields
- **401 Unauthorized**: Invalid or missing token
- **404 Not Found**: Job interest or resume not found
- **500 Internal Server Error**: Database or optimization error

---

## 🎯 **Suggestion Endpoints**

### 7. **GET** `/api/suggestions/{profession}`
**Descripción**: Obtiene sugerencias de habilidades y herramientas para una profesión específica.

**Headers Requeridos**:
```http
Authorization: Bearer <jwt_token>
```

**Parámetros de Ruta**:
- `profession` (string): Nombre de la profesión (URL encoded)

**Parámetros de Query**:
- `type` (string, opcional): "skills", "tools", o undefined (ambos)
- `language` (string, opcional): "es" o "en" (default: "es")

**Ejemplo de Request**:
```http
GET /api/suggestions/Software%20Engineer?type=skills&language=en
Authorization: Bearer <jwt_token>
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "data": {
    "skills": [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "TypeScript"
    ],
    "tools": [
      "VS Code",
      "Git",
      "Docker",
      "AWS",
      "Postman"
    ]
  },
  "fromCache": true,
  "message": "Suggestions retrieved from cache"
}
```

**Respuesta de Error** (400):
```json
{
  "success": false,
  "error": "Invalid type parameter",
  "message": "Type parameter must be \"skills\" or \"tools\""
}
```

---

### 8. **POST** `/api/achievements/suggestions`
**Descripción**: Genera sugerencias de logros basadas en proyectos y profesión usando IA.

**Headers Requeridos**:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Parámetros de Entrada**:
```json
{
  "profession": "Software Engineer",
  "projects": [
    {
      "name": "E-commerce Platform",
      "description": "Full-stack e-commerce solution",
      "technologies": ["React", "Node.js", "MongoDB"]
    },
    {
      "name": "Mobile App",
      "description": "Cross-platform mobile application",
      "technologies": ["React Native", "Firebase"]
    }
  ],
  "language": "es" // Opcional, default: "es"
}
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "data": [
    "Desarrollé una plataforma de e-commerce que manejó 10,000+ usuarios concurrentes",
    "Implementé una aplicación móvil que aumentó la retención de usuarios en 40%",
    "Lideré un equipo de 5 desarrolladores para entregar 3 proyectos principales",
    "Optimicé el rendimiento de la aplicación reduciendo los tiempos de carga en 50%"
  ],
  "message": "Generated 4 achievement suggestions for Software Engineer"
}
```

**Respuesta de Error** (400):
```json
{
  "success": false,
  "error": "Projects are required",
  "message": "Please provide at least one project"
}
```

---

### 9. **POST** `/api/summary/suggestions`
**Descripción**: Genera sugerencias personalizadas de resumen profesional basadas en logros y proyectos del usuario.

**Headers Requeridos**:
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Parámetros de Entrada**:
```json
{
  "profession": "Software Engineer",
  "achievements": [
    "Led team of 5 developers to deliver 3 major projects",
    "Improved application performance by 40%",
    "Best Employee Award 2022"
  ],
  "projectDescriptions": [
    "Full-stack e-commerce solution with React and Node.js",
    "Mobile application with React Native and Firebase",
    "Microservices architecture implementation"
  ],
  "language": "es", // "es" o "en"
  "type": "experience" // "experience" o "differentiators"
}
```

**Respuesta de Éxito** (200):
```json
{
  "success": true,
  "data": [
    "Desarrollador de software con 5+ años de experiencia liderando equipos y entregando proyectos de alto impacto",
    "Especialista en tecnologías full-stack con expertise en React, Node.js y arquitecturas de microservicios",
    "Profesional reconocido por mejorar el rendimiento de aplicaciones en un 40% y recibir el premio Mejor Empleado 2022"
  ],
  "message": "Generated 3 experience suggestions for Software Engineer"
}
```

**Respuesta de Error** (400):
```json
{
  "success": false,
  "error": "Invalid type parameter",
  "message": "Type must be \"experience\" or \"differentiators\""
}
```

---

## 📝 **Notas de Desarrollo**
- Los timeouts están configurados a 15 minutos para debugging (cambiar en producción)
- La base de datos utilizada es DynamoDB con múltiples tablas:
  - `getquickresume-api-users-{stage}`: Usuarios y tokens
  - `getquickresume-api-resumes-{stage}`: CVs generados
  - `getquickresume-api-job-interests-{stage}`: Intereses de trabajo
  - `getquickresume-api-profession-suggestions-{stage}`: Cache de sugerencias
- El servicio de IA utilizado es OpenAI (GPT-4 para generación de CVs, GPT-4o-mini para sugerencias)
- Los tokens se almacenan en la tabla de usuarios de DynamoDB
- Las sugerencias de profesiones se cachean en DynamoDB para optimizar rendimiento
- Todos los endpoints incluyen manejo de errores robusto y logging detallado

---

## 🧪 **Testing**
Para probar los endpoints localmente:

1. Iniciar el servidor de desarrollo:
```bash
cd api
npm run dev
```

2. El servidor estará disponible en `http://localhost:3001`

3. Usar herramientas como Postman o curl para hacer requests a los endpoints

---

## 📞 **Soporte**
Para soporte técnico o preguntas sobre la API, contactar al equipo de desarrollo.
