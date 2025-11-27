
## 📝 **Versión Markdown**

Guárdala como `project_overview.md` o dentro del archivo `/context/readme.md` en tu workspace de Cursor.

```markdown
# 💼 GetQuickResume – Modelo de Monetización y Upsells Premium

## 🎯 Objetivo general
Monetizar el sitio **sin depender de anuncios**, ofreciendo una experiencia limpia, profesional y centrada en valor real.  
El modelo busca convertir usuarios ocasionales (que generan un solo CV) en **clientes pagantes** mediante un sistema de **créditos** y **funcionalidades premium impulsadas por IA, analítica y diseño.**

---

## 💡 Modelo principal: Sistema de créditos interno
El sitio funciona con **créditos virtuales** que los usuarios **compran o ganan**.  
Cada acción de alto valor (descargar CV, generar carta, revisión AI, optimización, etc.) **consume créditos**.  
Los usuarios pueden registrarse gratis y reciben **1 crédito de bienvenida** para probar el servicio.  
**No hay anuncios** en el sitio.

### 💰 Paquetes de créditos sugeridos
| Paquete | Créditos | Precio (USD) | Valor por crédito |
|----------|-----------|--------------|------------------|
| Starter  | 1         | $2           | $2.00            |
| Standard | 3         | $5           | $1.67            |
| Pro      | 10        | $12          | $1.20            |
| Premium  | 25        | $25          | $1.00            |

Los créditos se almacenan en el perfil del usuario y pueden usarse en cualquier momento para desbloquear funciones premium.

---

## ⚙️ Acciones base que consumen créditos
| Acción | Créditos requeridos | Descripción |
|--------|----------------------|-------------|
| Descargar CV profesional (PDF/DOCX) | 1 | Descarga sin marca de agua. |
| Generar carta de presentación | 1 | Generada automáticamente con IA según el CV. |
| Revisión de CV (AI feedback) | 1 | Evaluación y sugerencias de mejora. |
| Exportar a LinkedIn o JSON | 1 | Exportación técnica. |

---

## 🚀 Features Premium / Upsells implementables

### 🧠 AI-powered (alto valor percibido)
- Optimización para puesto/empresa (ATS-friendly)  
- Resumen profesional con IA  
- Carta de presentación personalizada  
- Revisión AI con puntuación (0–100)  
- Optimización ATS (Applicant Tracking System)

### 🎨 Diseño y personalización
- Plantillas Premium  
- Edición avanzada (secciones, colores, íconos, márgenes)  
- Eliminación de marca de agua  
- Descarga multi-formato (PDF, DOCX, PNG, JSON)

### 💼 Carrera y posicionamiento
- Análisis de coincidencia con oferta laboral (Job Fit Score)  
- Guía “Cómo destacar en entrevistas”  
- Simulador de entrevista con IA  
- Traducción automática del CV a otro idioma

### 🌐 Profesionales digitales
- Hosting del CV online (url pública personalizada)  
- Generador de QR dinámico con tracking  
- Analíticas de visualización (quién y cuántas veces lo vieron)

---

## 📊 Upsells inteligentes y de analítica laboral
| Upsell | Descripción | Valor para el usuario | Créditos sugeridos |
|--------|--------------|-----------------------|--------------------|
| **Who Viewed My Resume** | Muestra estadísticas de vistas (país, empresa, fecha) del CV público. | Validación personal y motivación. | 2 |
| **Competitiveness Score** | Compara el CV con otros similares según experiencia y keywords. | Posicionamiento frente al mercado. | 2 |
| **Comparador de CVs (vs mercado)** | Indica cuántas keywords relevantes usa frente al promedio de su industria. | Mejora profesional objetiva. | 2 |
| **Resume Tracker (Alertas)** | Envía notificación o correo al detectar nueva visualización. | Feedback en tiempo real. | 1 por activación |
| **Geo Analytics (Mapa de vistas)** | Mapa interactivo con países/ciudades donde se vio el CV. | Valor visual y emocional. | 2 |
| **Auto-Post a bolsas de empleo** | Busca vacantes en APIs de LinkedIn, Indeed, etc., basadas en el CV y permite aplicar directamente. | Facilita la búsqueda laboral activa. | 5 |

---

## 🧩 Estructura técnica sugerida
- **Frontend:** muestra saldo y botones “Usar crédito” / “Comprar créditos”.  
- **Backend/API:**  
  - Endpoints: `/credits/balance`, `/credits/use`, `/credits/purchase`, `/credits/history`  
  - Stripe o Paddle para pagos  
  - Asociación de transacciones ↔ créditos  
- **Base de datos:** tabla `user_credits` con `(user_id, balance, history, expiry_date)`  
- **Capa IA aislada:** backend modular para poder alternar entre GPT, Gemini, Claude, etc.  

---

## 📈 Ventajas del modelo
- 🚫 Sin anuncios ni distracciones  
- 💵 Monetiza desde el primer uso  
- 🔁 Incentiva recurrencia y fidelidad  
- 🌍 Escalable a múltiples idiomas y países  
- 🧠 Flexible para añadir nuevas funciones sin modificar la economía base  
- 📊 Evolutivo: convierte GetQuickResume en una **plataforma de crecimiento profesional inteligente**  
```

---

## ⚙️ **Versión JSON (para configuración o documentación técnica)**

Guárdala como `monetizationConfig.json` o dentro de tu archivo `constants.ts`.


