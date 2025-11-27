### Prompt final: Selección de templates en el paso 8 del wizard (previews desde reactTemplateCode, sin thumbnails)

- **Objetivo**: Permitir que el usuario seleccione un diseño (template) de resume en el paso 8 del wizard, mostrando una galería scrolleable y una previsualización principal, con control de acceso a templates premium.

- **Alcance**:
  - Modificar el paso 8 del wizard para mostrar una galería scrolleable de tiles con los templates.
  - Renderizar cada tile y la previsualización principal “en vivo” a partir de `reactTemplateCode`, usando los datos actuales del resume del usuario.
  - Al seleccionar un template, mostrarlo en una sección de previsualización principal de mayor tamaño.
  - Permitir previsualizar templates premium a todos los usuarios; bloquear el paso 9 (descarga) si el usuario no es premium y tiene seleccionado un template premium, mostrando mensaje y CTA de upgrade.
  - Consumir un nuevo endpoint GET protegido con JWT y con rate limit por usuario por minuto (a nivel de API, no en la capa serverless).

## Backend (API)

- **Endpoint**: `GET /api/templates`
- **Auth**: Requiere `Authorization: Bearer <JWT>` válido del API.
- **Rate limiting**: Límite por usuario por minuto (p. ej., 60 rpm), implementado en middleware del API y basado en `userId` del JWT. No usar rate limits de la plataforma serverless.
- **Respuesta (200)**:
```json
{
  "templates": [
    {
      "id": "string",
      "name": "string",
      "category": "free" | "premium",
      "reactTemplateCode": "string"
    }
  ]
}
```
  - **Obligatorios**: `id`, `category`, `reactTemplateCode`.
  - **Recomendado**: `name`.
- **Errores**:
  - 401: JWT inválido/ausente.
  - 429: Límite excedido por usuario/minuto.
  - 5xx: Fallos del servicio.
- **Seguridad del código de template**:
  - El `reactTemplateCode` debe representar un componente React funcional puro, exportado como `default`, que consuma `resumeData` por props.
  - No se debe hacer `eval` directo en el backend ni inyectar dependencias arbitrarias. El frontend debe renderizar en un runtime controlado/sandbox con un `scope` explícito.

## Frontend (Wizard Paso 8)

- **Motor de preview desde código (sin thumbnails)**:
  - Compilar y ejecutar `reactTemplateCode` en un entorno controlado (p. ej., `react-runner` con Babel in-browser) y un `scope` mínimo y explícito.
  - Cachear la compilación por `templateId` + hash de `reactTemplateCode` para evitar recompilar.
  - Aislar estilos si es necesario (p. ej., `iframe` con `sandbox`) para evitar fugas de CSS.

- **Galería (tiles scrolleables)**:
  - Cada tile renderiza el template real con `resumeData` dentro de un contenedor responsivo (relación aproximada A4: `1 / 1.414`).
  - Virtualizar la lista y usar `IntersectionObserver` para montar/desmontar previews fuera de viewport.
  - Mostrar skeleton/estado de carga mientras compila/renderiza el template.

- **Previsualización principal**:
  - Área grande que renderiza el template seleccionado con los mismos datos.
  - Reutiliza la compilación cacheada; evita recompilar al cambiar de tamaño o al re-seleccionar.

- **Selección y estado**:
  - Al hacer clic en un tile, actualizar `selectedTemplateId` y `selectedTemplateCategory`, y refrescar la previsualización principal.
  - Persistir la selección en el estado del wizard.

- **Acceso Premium**:
  - Previsualización de templates premium para todos los usuarios.
  - Al intentar avanzar al paso 9 (descarga):
    - Si `selectedTemplate.category === 'premium'` y el usuario no es premium → bloquear avance, mostrar modal/alerta con CTA de upgrade.
    - Si el template es `free` o el usuario es premium → permitir avanzar.

- **UX/Accesibilidad**:
  - Skeletons durante la carga/compilación.
  - Empty state si no hay templates o si falla la carga (con reintento).
  - Etiquetas ARIA, foco accesible en tiles, y navegación por teclado.
  - Rendimiento: memoización, virtualización, y suspensión de renders fuera de viewport.

## Estado y datos

- **Estado del wizard**:
  - `selectedTemplateId`, `selectedTemplateCategory`.
  - `isPremiumUser` derivado del estado de autenticación/claims del JWT o del store de usuario.
- **Datos de render**:
  - Reutilizar el objeto de datos del resume del wizard (`resumeData`) para hidratar los templates.

## Telemetría (opcional)

- Eventos: `TemplatesListViewed`, `TemplateSelected`, `PremiumBlockShown`, `UpgradeCTA_Clicked`, `ProceedToStep9`.
- Atributos: `templateId`, `category`, `isPremiumUser`.

## Criterios de aceptación

- **API**:
  - Rechaza peticiones sin JWT (401) y excedentes del límite (429) por usuario/minuto.
  - Devuelve al menos `id`, `category`, `reactTemplateCode` por template.
- **UI**:
  - La galería muestra todos los templates; cada tile es un render en vivo desde `reactTemplateCode` con datos del usuario (sin imágenes estáticas).
  - La previsualización principal refleja el template seleccionado.
  - Usuarios no premium pueden previsualizar templates premium.
  - Intentar ir al paso 9 con template premium y usuario no premium bloquea el avance y muestra mensaje con CTA de upgrade.
  - Con template free, o siendo premium, el avance al paso 9 es posible.
- **Rendimiento**:
  - Compilaciones cacheadas; scroll fluido; renders fuera de viewport suspendidos.

## Fuera de alcance

- Creación/edición de nuevos templates.
- Gestión de planes/checkout (solo se invoca el flujo existente).
- Exportación/descarga en el paso 9.

## Notas técnicas para templates

- Deben ser responsivos (usar `flex`, `grid`, unidades relativas y/o container queries).
- No asumir tamaño de página fijo; el contenedor define el layout.
- Exportar `default` React component y consumir `resumeData` vía props.

## Mensaje de bloqueo sugerido (no premium con template premium)

- “El template seleccionado es Premium. Para descargar tu resume con este diseño, actualiza tu plan.”
  - Botones: “Ver planes”, “Seguir viendo templates”

## Snippet orientativo (preview desde código con `react-runner`)

```tsx
import * as React from 'react';
import { Runner } from 'react-runner';

type Props = {
  code: string;
  resumeData: any;
  width?: number | string;
  height?: number | string;
};

export function TemplatePreview({ code, resumeData, width = '100%', height }: Props) {
  return (
    <div style={{ width, height, aspectRatio: height ? undefined : '1 / 1.414', overflow: 'hidden' }}>
      <Runner
        code={code}
        scope={{
          React,
          resumeData,
          // components: { ...componentesPermitidos }
          // utils: { ...utilidadesAprobadas }
        }}
      />
    </div>
  );
}
```