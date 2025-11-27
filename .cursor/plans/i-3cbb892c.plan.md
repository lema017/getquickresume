<!-- 3cbb892c-f430-4876-bc87-37521508f4c5 c1163344-d1f0-49a0-b86b-5d50ad23b559 -->
# Plan: Implementación de Paso 8 - Selección de Templates

## 1. Backend - API y Base de Datos

### 1.1 Crear tabla DynamoDB para templates

- Crear tabla `getquickresume-api-resume-templates-{stage}` con:
                                                                                                                                - PK: `templateId` (string)
                                                                                                                                - Attributes: 
                                                                                                                                                                                                                                                                - `name` (string): nombre del template
                                                                                                                                                                                                                                                                - `category` (string): **"free" o "premium"**
                                                                                                                                                                                                                                                                - `description` (string): descripción breve
                                                                                                                                                                                                                                                                - `thumbnailUrl` (string): URL **PÚBLICA** de imagen preview pequeña en S3 (para galería de templates)
                                                                                                                                                                                                                                                                - `previewImageUrl` (string): URL **PÚBLICA** de imagen preview grande en S3 (para modal de vista previa)
                                                                                                                                                                                                                                                                - `s3Key` (string): ruta al código JSX en S3 (solo para templates premium)
                                                                                                                                                                                                                                                                - `componentName` (string): nombre del componente React (ej: "ModernTemplate", "ClassicTemplate")
                                                                                                                                                                                                                                                                - `previewSettings` (object): configuración de zoom/viewport para preview
                                                                                                                                                                                                                                                                - `createdAt` (string)
                                                                                                                                                                                                                                                                - `isActive` (boolean)
                                                                                                                                - GSI: `category-index` para queries por categoría (free/premium)

**Nota**: Tanto `thumbnailUrl` como `previewImageUrl` apuntan a imágenes en `/previews/` folder en S3, que muestran el template renderizado CON datos dummy de ejemplo (nombre, trabajo, experiencia ficticia, etc.), para que usuarios vean cómo se verá su CV con ese diseño.

### 1.2 Crear bucket S3 solo para templates premium

- Bucket: `getquickresume-templates-{stage}` (PRIVADO)
- Folder: `/premium-templates/` (código JSX/TSX de templates premium)
- Configuración:
                                                                                                                                - Block all public access (bucket totalmente privado)
                                                                                                                                - Bucket policy: solo Lambda role puede leer
                                                                                                                                - **folder `/previews/`** -  con acceso de lectura publica de imágenes en el folder
- Cada template premium es un archivo `.tsx` con:
                                                                                                                                - Componente React que recibe `ResumeData` como props
                                                                                                                                - Exports default del componente
                                                                                                                                - Estilos inline o CSS-in-JS

### 1.3 Crear servicio de rate limiting en código `api/src/services/rateLimiter.ts`

Implementar rate limiting usando DynamoDB para tracking de requests:

```typescript
import { dynamoDb } from './dynamodb';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // ventana de tiempo en ms (ej: 60000 = 1 minuto)
}

interface RateLimitCheck {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export class RateLimiter {
  private tableName = process.env.RATE_LIMIT_TABLE || 'getquickresume-api-rate-limits-dev';
  
  async checkRateLimit(
    userId: string,
    endpoint: string,
    config: RateLimitConfig
  ): Promise<RateLimitCheck> {
    const now = Date.now();
    const key = `${userId}:${endpoint}`;
    const windowStart = now - config.windowMs;
    
    // Obtener requests del usuario en la ventana de tiempo
    const record = await dynamoDb.get({
      TableName: this.tableName,
      Key: { key }
    }).promise();
    
    let requestCount = 0;
    let resetAt = now + config.windowMs;
    
    if (record.Item) {
      const { count, expiresAt } = record.Item;
      
      // Si el record no ha expirado, usar el count existente
      if (expiresAt > now) {
        requestCount = count;
        resetAt = expiresAt;
      }
    }
    
    // Verificar si excede el límite
    if (requestCount >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt
      };
    }
    
    // Incrementar contador
    await dynamoDb.put({
      TableName: this.tableName,
      Item: {
        key,
        count: requestCount + 1,
        expiresAt: resetAt,
        ttl: Math.floor(resetAt / 1000) // TTL para auto-cleanup
      }
    }).promise();
    
    return {
      allowed: true,
      remaining: config.maxRequests - requestCount - 1,
      resetAt
    };
  }
}

export const rateLimiter = new RateLimiter();
```

### 1.4 Crear handler `api/src/handlers/resumeTemplates.ts`

- **GET `/api/templates`**: Listar templates con paginación
                                                                                                                                - Query params: `category` (free/premium/all), `page`, `limit`
                                                                                                                                - **Rate limit implementado en código**:
                                                                                                                                                                                                                                                                - Usuarios free: 10 requests/min
                                                                                                                                                                                                                                                                - Usuarios premium: unlimited (skip rate limit check)
                                                                                                                                - Response: array de templates con metadata
                                                                                                                                - Para templates free: incluye `componentName` (frontend ya tiene el código)
                                                                                                                                - Para templates premium: incluye metadata pero NO el código JSX
                                                                                                                                - Implementación:
```typescript
export const getTemplates = async (event: APIGatewayProxyEvent) => {
  const userId = event.requestContext.authorizer?.userId;
  const user = await userService.getUser(userId);
  
  // Rate limit solo para usuarios free
  if (!user.isPremium) {
    const rateLimitCheck = await rateLimiter.checkRateLimit(
      userId,
      'getTemplates',
      { maxRequests: 10, windowMs: 60000 }
    );
    
    if (!rateLimitCheck.allowed) {
      return {
        statusCode: 429,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitCheck.resetAt.toString(),
        },
        body: JSON.stringify({
          error: 'Rate limit exceeded. Try again later.',
          resetAt: rateLimitCheck.resetAt
        })
      };
    }
  }
  
  // ... resto de la lógica para obtener templates
};
```

- **GET `/api/templates/:templateId/code`**: Obtener código de template premium
                                                                                                                                - Solo para templates con `category === "premium"`
                                                                                                                                - Requiere autenticación y verificar `user.isPremium === true`
                                                                                                                                - Si usuario no es premium: retornar 403 con mensaje "Premium required"
                                                                                                                                - **Rate limit implementado en código**: 10 requests/min por usuario premium
                                                                                                                                - Proceso:

                                                                                                                                                                                                                                                                1. Verificar rate limit (10 req/min)
                                                                                                                                                                                                                                                                2. Verificar que usuario es premium
                                                                                                                                                                                                                                                                3. Verificar que templateId es premium
                                                                                                                                                                                                                                                                4. Descargar código JSX desde S3 (`/premium-templates/{templateId}.tsx`)
                                                                                                                                                                                                                                                                5. Retornar código como string

                                                                                                                                - Response: `{ code: string (código JSX), templateId: string }`
                                                                                                                                - **SEGURIDAD**: Solo usuarios premium pueden acceder al código de templates premium
                                                                                                                                - Implementación:
```typescript
export const getTemplateCode = async (event: APIGatewayProxyEvent) => {
  const userId = event.requestContext.authorizer?.userId;
  const templateId = event.pathParameters?.templateId;
  
  const user = await userService.getUser(userId);
  
  // Verificar que es usuario premium
  if (!user.isPremium) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Premium subscription required' })
    };
  }
  
  // Rate limit para usuarios premium
  const rateLimitCheck = await rateLimiter.checkRateLimit(
    userId,
    'getTemplateCode',
    { maxRequests: 10, windowMs: 60000 }
  );
  
  if (!rateLimitCheck.allowed) {
    return {
      statusCode: 429,
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimitCheck.resetAt.toString(),
      },
      body: JSON.stringify({
        error: 'Rate limit exceeded',
        resetAt: rateLimitCheck.resetAt
      })
    };
  }
  
  // ... resto de la lógica
};
```


### 1.4 Servicio `api/src/services/templateService.ts`

- `getTemplates(category?, page, limit)`: Query DynamoDB con paginación
- `getTemplateById(templateId)`: Obtener metadata de template específico
- `getTemplateCode(templateId, userId)`: 
                                                                                                                                - Verificar usuario es premium
                                                                                                                                - Verificar template es premium
                                                                                                                                - Descargar código desde S3 `/premium-templates/{templateId}.tsx`
                                                                                                                                - Retornar código JSX como string

### 1.5 Actualizar `api/src/types.ts`

```typescript
export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'free' | 'premium';  // CAMBIO: solo 2 categorías
  description: string;
  thumbnailUrl: string;
  s3Key?: string; // Solo para premium templates
  componentName: string; // Nombre del componente React
  previewSettings?: {
    zoom: number;
    viewport: { width: number; height: number };
  };
  createdAt: string;
  isActive: boolean;
}

export interface ResumeData {
  // ... campos existentes ...
  selectedTemplateId?: string;
}

export interface TemplateCodeResponse {
  code: string; // Código JSX del template
  templateId: string;
}
```

### 1.6 Actualizar `serverless.yml`

- Agregar función `getTemplates` con rate limit 20/min para usuarios free y unlimited pa
- Agregar función `getTemplateCode` con rate limit 10/min (solo premium)
- Agregar permisos IAM para S3 read en bucket templates
- Configurar variables de entorno: `TEMPLATES_BUCKET`, `TEMPLATES_TABLE`
- **NO agregar Puppeteer/Playwright** - no se generan imágenes

## 2. Frontend - UI y Componentes

### 2.1 Crear directorio `src/components/resume-templates/`

Estructura:

```
src/components/resume-templates/
  ├── index.ts (exports all free templates)
  ├── free/
  │   ├── BasicTemplate.tsx (template gratis simple)
  │   ├── ModernTemplate.tsx (template gratis moderno)
  │   └── ClassicTemplate.tsx (template gratis clásico)
  ├── TemplateRenderer.tsx (wrapper que renderiza free o premium)
  └── types.ts (tipos compartidos para templates)
```

Cada template free (ej: `BasicTemplate.tsx`):

```typescript
import { ResumeData } from '@/types';

interface TemplateProps {
  data: ResumeData;
  scale?: number; // Para ajustar tamaño en preview
}

export function BasicTemplate({ data, scale = 1 }: TemplateProps) {
  return (
    <div style={{ transform: `scale(${scale})` }} className="resume-basic">
      {/* Renderizado del resume con data */}
      <header>
        <h1>{data.firstName} {data.lastName}</h1>
        <p>{data.profession}</p>
      </header>
      {/* ... más secciones */}
    </div>
  );
}
```

### 2.2 Crear `src/components/resume-templates/TemplateRenderer.tsx`

Componente que renderiza templates free o premium dinámicamente:

```typescript
interface TemplateRendererProps {
  templateId: string;
  category: 'free' | 'premium';
  componentName: string;
  data: ResumeData;
  premiumCode?: string; // Código JSX para premium (obtenido de API)
  scale?: number;
}

export function TemplateRenderer({ 
  templateId, 
  category, 
  componentName, 
  data, 
  premiumCode,
  scale = 1 
}: TemplateRendererProps) {
  // Si es free, usar componente importado localmente
  if (category === 'free') {
    const FreeTemplate = freeTemplatesMap[componentName];
    if (!FreeTemplate) return <div>Template not found</div>;
    return <FreeTemplate data={data} scale={scale} />;
  }
  
  // Si es premium, evaluar código dinámicamente
  if (category === 'premium' && premiumCode) {
    // Usar eval o Function constructor para ejecutar código JSX
    // (con sanitización y validación apropiada)
    const PremiumComponent = evaluatePremiumTemplate(premiumCode);
    return <PremiumComponent data={data} scale={scale} />;
  }
  
  return <div>Loading template...</div>;
}
```

### 2.3 Crear `src/components/wizard/Step8TemplateSelection.tsx`

- Layout: Grid de templates (3 columnas en desktop, 1 en mobile)
- Cada card muestra:
                                                                                                                                - Thumbnail estático del template (imagen preview diseñada manualmente)
                                                                                                                                - Nombre y descripción
                                                                                                                                - Badge "Premium" si `category === "premium"`
                                                                                                                                - Badge "Gratis" si `category === "free"`
                                                                                                                                - Botón "Ver Preview" → abre modal con `TemplateRenderer`
                                                                                                                                - Botón "Seleccionar"

- Estado:
                                                                                                                                - `templates`: array de templates (de API)
                                                                                                                                - `selectedTemplateId`: template seleccionado
                                                                                                                                - `premiumTemplateCode`: Map<templateId, código JSX> para templates premium cargados
                                                                                                                                - `isLoadingCode`: loading state para descargar código premium
                                                                                                                                - `showPreviewModal`: boolean para modal de preview

- Filtros: tabs "Todos" | "Gratis" | "Premium"
- Paginación: Load More button

- **Al hacer click en "Ver Preview"**:

                                                                                                                                1. Si es free: mostrar modal con `TemplateRenderer` (instantáneo, código ya está en app)
                                                                                                                                2. Si es premium:

                                                                                                                                                                                                                                                                                                                                - Si usuario NO es premium: mostrar mensaje "Requiere premium para preview"
                                                                                                                                                                                                                                                                                                                                - Si usuario ES premium: 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Si código ya está cargado en `premiumTemplateCode`: mostrar modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Si no está cargado: llamar API `getTemplateCode`, guardar en state, mostrar modal

- **Al hacer click en "Seleccionar"**:

                                                                                                                                1. Si es free: seleccionar inmediatamente
                                                                                                                                2. Si es premium:

                                                                                                                                                                                                                                                                                                                                - Si usuario NO es premium: mostrar mensaje educativo pero PERMITIR selección (para capturar interés)
                                                                                                                                                                                                                                                                                                                                - Guardar `selectedTemplateId` en `resumeStore`

- Botón "Omitir" (pre-selecciona template free básico)
- Tips floating sobre diferencias free vs premium

### 2.4 Crear servicio `src/services/templateService.ts`

```typescript
export const templateService = {
  getTemplates: async (category?: 'free' | 'premium' | 'all', page = 1, limit = 12) => {
    // GET /api/templates?category=X&page=Y&limit=Z
    return fetch(`${API_URL}/templates?category=${category}&page=${page}&limit=${limit}`);
  },
  
  getTemplateCode: async (templateId: string): Promise<TemplateCodeResponse> => {
    // GET /api/templates/:templateId/code
    // Solo para usuarios premium y templates premium
    const response = await fetch(`${API_URL}/templates/${templateId}/code`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.status === 403) {
      throw new Error('Premium subscription required');
    }
    return response.json();
  }
};
```

### 2.5 Actualizar `src/types/index.ts`

- Agregar interface `ResumeTemplate` (matching backend)
- Actualizar `ResumeData` con campo `selectedTemplateId?: string`
- Agregar `TemplateCodeResponse`
- Agregar `TemplateRendererProps`

### 2.6 Actualizar `src/stores/resumeStore.ts`

- Agregar campo `selectedTemplateId: string | null` al state
- Agregar campo `selectedTemplateCategory: 'free' | 'premium' | null`
- Agregar campo `premiumTemplateCode: string | null` (código JSX si es premium)
- Agregar actions:
                                                                                                                                - `setSelectedTemplate(templateId, category, premiumCode?)`
                                                                                                                                - `clearSelectedTemplate()`

### 2.7 Actualizar `src/pages/WizardPage.tsx`

- Renumerar steps actuales:
                                                                                                                                - Step7Summary (sin cambios)
                                                                                                                                - **NEW** Step8TemplateSelection (nuevo)
                                                                                                                                - Step8Preview → Step9Preview
                                                                                                                                - Step9Download → Step10Download

- Agregar nueva ruta:
```typescript
<Route path="/manual/step-8" element={<ManualWizardStep stepComponent={Step8TemplateSelection} />} />
<Route path="/manual/step-9" element={<ManualWizardStep stepComponent={Step9Preview} />} />
<Route path="/manual/step-10" element={<ManualWizardStep stepComponent={Step10Download} />} />
```


### 2.8 Actualizar `src/components/HUD.tsx`

- Agregar paso 8 en array `steps`:
```typescript
{ number: 8, key: 'template', title: 'Selección de Template' },
{ number: 9, key: 'preview', title: 'Vista Previa' },
{ number: 10, key: 'download', title: 'Descargar' },
```


### 2.9 Actualizar `src/components/wizard/Step6Summary.tsx`

- Navigation: cambiar Next para ir a `/wizard/manual/step-8` (template selection)

### 2.10 Actualizar `src/components/wizard/Step7Preview.tsx` (antes Step8)

- Renombrar a `Step9Preview.tsx`
- Usar `TemplateRenderer` para mostrar preview con template seleccionado
- Si no hay template seleccionado, usar template free básico por defecto
- Mostrar badge indicando template seleccionado ("Template: Modern Free" o "Template: Premium Classic")

### 2.11 Actualizar `src/components/wizard/Step9Final.tsx` (antes Step9Download)

- Renombrar a `Step10Download.tsx`
- Verificar `user.isPremium`, `selectedTemplateId`, `selectedTemplateCategory`

**Lógica de descarga**:

1. **Usuario GRATIS + Template FREE seleccionado**:

                                                                                                                                                                                                - Permitir descarga en PDF/Word con template aplicado (sin restricciones)

2. **Usuario GRATIS + Template PREMIUM seleccionado**:

                                                                                                                                                                                                - Mostrar modal "Upgrade a Premium"
                                                                                                                                                                                                - Explicar beneficios (descarga con diseño premium)
                                                                                                                                                                                                - Opción 1: "Actualizar a Premium" → `/premium`
                                                                                                                                                                                                - Opción 2: "Descargar solo texto (.txt)" → genera archivo texto plano
                                                                                                                                                                                                - Opción 3: "Cambiar a template gratis" → volver a step 8

3. **Usuario PREMIUM + Template FREE seleccionado**:

                                                                                                                                                                                                - Permitir descarga en PDF/Word con template aplicado

4. **Usuario PREMIUM + Template PREMIUM seleccionado**:

                                                                                                                                                                                                - Permitir descarga en PDF/Word con template premium aplicado

## 3. i18n - Traducciones

### 3.1 Actualizar `src/i18n/locales/es.ts` y `en.ts`

Agregar bajo `wizard.steps`:

```typescript
templateSelection: {
  title: 'Selecciona tu Template',
  description: 'Elige el diseño para tu CV profesional',
  ui: {
    filterAll: 'Todos',
    filterFree: 'Gratis',
    filterPremium: 'Premium',
    freeBadge: 'Gratis',
    premiumBadge: 'Premium',
    selectButton: 'Seleccionar',
    previewButton: 'Ver Preview',
    selectedBadge: 'Seleccionado',
    skipButton: 'Omitir (usar template básico)',
    loadingCode: 'Cargando template...',
    loadMoreButton: 'Cargar más templates',
    premiumRequired: 'Requiere suscripción Premium',
    premiumPreviewBlocked: 'El preview de templates premium requiere cuenta Premium',
    tips: {
      title: 'Tips sobre Templates',
      items: [
        'Templates gratis están disponibles para todos los usuarios',
        'Templates premium ofrecen diseños profesionales avanzados',
        'Puedes cambiar el template más adelante desde tu dashboard',
        'El preview muestra tu CV con tus datos reales en tiempo real'
      ]
    },
    modal: {
      previewTitle: 'Preview: {{templateName}}',
      closeButton: 'Cerrar',
      selectButton: 'Usar este Template',
      loadingPreview: 'Cargando preview...'
    }
  }
},
downloadOptions: {
  upgradeModal: {
    title: '¿Descargar con Template Premium?',
    description: 'Has seleccionado un template premium. Actualiza tu cuenta para descargar el CV con diseño profesional.',
    benefits: [
      'Descarga en PDF y Word con diseño premium completo',
      'Sin marca de agua',
      'Acceso a todos los templates premium',
      'Optimización ATS incluida'
    ],
    upgradeButton: 'Actualizar a Premium',
    downloadTextButton: 'Descargar solo texto (.txt)',
    changeTemplateButton: 'Cambiar a template gratis',
    cancelButton: 'Cancelar'
  },
  downloadingText: 'Generando descarga...',
  downloadSuccess: 'Descarga iniciada'
}
```

## 4. Generación de PDF/Word en el Cliente (Browser)

### 4.1 Instalar dependencias de conversión client-side

```bash
npm install jspdf html2canvas docx html-docx-js-typescript
```

- **jspdf + html2canvas**: Para generar PDF desde HTML/React renderizado
- **docx** o **html-docx-js-typescript**: Para generar archivos Word (.docx)

### 4.2 Crear `src/utils/documentGenerator.ts`

Funciones para convertir el template renderizado en el navegador a PDF o Word:

```typescript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export const documentGenerator = {
  /**
   * Genera PDF desde un elemento HTML (el resume renderizado)
   * @param elementId - ID del elemento HTML a convertir
   * @param fileName - Nombre del archivo a descargar
   */
  async generatePDF(elementId: string, fileName: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');
    
    // Capturar el elemento como canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Alta resolución
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  },
  
  /**
   * Genera archivo Word desde los datos del resume
   * @param resumeData - Datos del resume
   * @param fileName - Nombre del archivo a descargar
   */
  async generateWord(resumeData: ResumeData, fileName: string): Promise<void> {
    // Construir documento Word programáticamente
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${resumeData.firstName} ${resumeData.lastName}`,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.profession || '',
                size: 24,
              }),
            ],
          }),
          // ... construir secciones del resume
        ],
      }],
    });
    
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  },
};
```

### 4.3 Modificar `Step10Download.tsx` para incluir selector de formato

- Agregar selector de formato: "PDF" | "Word"
- Agregar botón "Descargar" que llama `documentGenerator.generatePDF()` o `generateWord()`
- El template ya está renderizado en la página (invisible o en modal)
- Proceso:

                                                                                                                                1. Usuario selecciona formato (PDF o Word)
                                                                                                                                2. Si formato es PDF:

                                                                                                                                                                                                                                                                                                                                - Renderizar template completo en div oculto (id="resume-print-area")
                                                                                                                                                                                                                                                                                                                                - Llamar `documentGenerator.generatePDF('resume-print-area', 'mi-cv.pdf')`
                                                                                                                                                                                                                                                                                                                                - Descarga inicia automáticamente (no API, no S3)

                                                                                                                                1. Si formato es Word:

                                                                                                                                                                                                                                                                                                                                - Llamar `documentGenerator.generateWord(resumeData, 'mi-cv.docx')`
                                                                                                                                                                                                                                                                                                                                - Construye .docx programáticamente desde datos del resume
                                                                                                                                                                                                                                                                                                                                - Descarga inicia automáticamente

- **NO se llama a ningún API para generar el archivo**
- **NO se sube nada a S3**
- Todo ocurre en el navegador del usuario

## 5. Orden de Implementación

1. **Backend**:

                                                                                                                                                                                                - Crear tabla DynamoDB templates
                                                                                                                                                                                                - Crear bucket S3 para templates premium
                                                                                                                                                                                                - Implementar `templateService.ts`
                                                                                                                                                                                                - Implementar handlers (`getTemplates`, `getTemplateCode`)
                                                                                                                                                                                                - Actualizar `serverless.yml`
                                                                                                                                                                                                - Crear 2-3 templates premium de ejemplo (.tsx) y subirlos a S3
                                                                                                                                                                                                - Implementar endpoint `generate-pdf`

2. **Frontend - Templates**:

                                                                                                                                                                                                - Crear directorio `src/components/resume-templates/`
                                                                                                                                                                                                - Implementar 3 templates free (BasicTemplate, ModernTemplate, ClassicTemplate)
                                                                                                                                                                                                - Implementar `TemplateRenderer.tsx`
                                                                                                                                                                                                - Crear función para evaluar código premium de forma segura

3. **Frontend - Wizard**:

                                                                                                                                                                                                - Actualizar tipos e interfaces
                                                                                                                                                                                                - Crear servicio `templateService.ts`
                                                                                                                                                                                                - Actualizar `resumeStore` con campos de template
                                                                                                                                                                                                - Crear `Step8TemplateSelection.tsx`
                                                                                                                                                                                                - Actualizar `WizardPage.tsx`, `HUD.tsx`, navegación
                                                                                                                                                                                                - Actualizar `Step9Preview.tsx` con `TemplateRenderer`
                                                                                                                                                                                                - Actualizar `Step10Download.tsx` con lógica condicional
                                                                                                                                                                                                - Agregar traducciones

4. **Testing**:

                                                                                                                                                                                                - Probar flow usuario gratis con templates free
                                                                                                                                                                                                - Probar flow usuario gratis intentando usar premium (debe funcionar hasta descarga)
                                                                                                                                                                                                - Probar flow usuario premium con templates premium
                                                                                                                                                                                                - Verificar rate limits
                                                                                                                                                                                                - Testing de generación PDF/Word con diferentes templates

## 6. Notas Técnicas Importantes

- **Sin generación de imágenes**: Eliminamos Puppeteer para previews, se renderizan directamente en React
- **Templates free en código**: Más rápido, sin API calls, disponible offline
- **Templates premium protegidos**: Código solo en S3 backend, usuarios premium lo obtienen via API
- **Evaluación segura de código premium**: Sanitizar y validar código JSX antes de ejecutar con eval/Function
- **Cache de código premium**: Una vez descargado, guardar en localStorage para no re-fetch
- **Thumbnails estáticos**: Imágenes de miniatura diseñadas manualmente (no generadas), subidas a CDN
- **Descarga flexible**: Usuarios gratis pueden explorar templates premium pero solo descargar texto o templates free
- **Rate limits**: 20/min para listado, 10/min para código premium, 5/min para generación PDF
- **Duplicación necesaria**: Templates free deben existir en frontend Y backend (para generación de PDFs)