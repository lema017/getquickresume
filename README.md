# GetQuickResume - CV Profesional con IA

Una plataforma moderna para crear currículums profesionales optimizados, traducibles y gamificados con sistema de monetización y autenticación social obligatoria.

## 🚀 Características Principales

- **React 18 + TypeScript + Tailwind CSS** - Stack moderno y escalable
- **Autenticación Social** - Google, Facebook, LinkedIn (obligatoria)
- **Wizard de 7 Pasos** - Modo manual y guiado con tips personalizados
- **AI Language Adaptor** - Traducción a 5 idiomas (ES, EN, AR, ZH, HI)
- **Sistema Freemium** - Tokens Premium para funciones avanzadas
- **HUD Persistente** - Contador de caracteres y progreso en tiempo real
- **i18n Completo** - Soporte para español e inglés
- **Responsive Design** - Mobile-first, accesible WCAG AA
- **Banners Publicitarios** - Monetización con anuncios

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React Router DOM** - Enrutamiento
- **Zustand** - Gestión de estado global
- **React Hook Form + Zod** - Formularios y validación
- **React i18next** - Internacionalización
- **Framer Motion** - Animaciones
- **Lucide React** - Iconografía

### Herramientas de Desarrollo
- **Vite** - Build tool y dev server
- **ESLint** - Linting
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad de navegadores

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── wizard/         # Componentes del wizard
│   ├── Header.tsx      # Navegación principal
│   ├── Footer.tsx      # Pie de página
│   ├── HUD.tsx         # Panel de progreso persistente
│   └── BannerAd.tsx    # Anuncios publicitarios
├── layouts/            # Layouts de página
│   ├── MainLayout.tsx  # Layout principal
│   └── AuthLayout.tsx  # Layout de autenticación
├── pages/              # Páginas de la aplicación
│   ├── LandingPage.tsx # Página de inicio
│   ├── LoginPage.tsx   # Autenticación
│   ├── WizardPage.tsx  # Wizard principal
│   ├── PremiumPage.tsx # Planes y tokens
│   ├── AccountPage.tsx # Perfil de usuario
│   ├── ContactPage.tsx # Contacto
│   ├── AboutPage.tsx   # Acerca de
│   ├── PrivacyPage.tsx # Política de privacidad
│   └── TermsPage.tsx   # Términos de servicio
├── stores/             # Estado global (Zustand)
│   ├── authStore.ts    # Autenticación
│   └── resumeStore.ts  # Datos del CV
├── i18n/               # Internacionalización
│   ├── config.ts       # Configuración i18n
│   └── locales/        # Traducciones
│       ├── es.ts       # Español
│       └── en.ts       # Inglés
├── types/              # Definiciones TypeScript
│   └── index.ts        # Tipos principales
├── utils/              # Utilidades
├── hooks/              # Custom hooks
└── services/           # Servicios externos
```

## 🎯 Flujo de Usuario

### 1. Landing Page
- Hero con propuesta de valor clara
- Beneficios y características principales
- CTAs hacia registro/login
- Banners publicitarios

### 2. Autenticación Social
- Login obligatorio con Google/Facebook/LinkedIn
- Obtención de datos básicos del perfil
- Redirección al wizard

### 3. Wizard de 7 Pasos
1. **Perfil Profesional** - Área, nivel, tono
2. **Habilidades** - Skills técnicas y blandas
3. **Experiencia Laboral** - Trabajos con logros cuantificables
4. **Educación** - Formación académica (opcional)
5. **Proyectos e Idiomas** - Portfolio personal
6. **Resumen** - Síntesis profesional con IA
7. **Revisión** - Vista previa y descarga

### 4. Sistema Premium
- Tokens para funciones avanzadas
- Optimización con IA
- Traducción multilingüe
- Sin anuncios

## 💰 Modelo de Monetización

### Usuarios Free
- Acceso completo al wizard
- Límite de 3,500 caracteres
- Banners publicitarios
- Anuncio antes de descarga

### Usuarios Premium
- Sin límites de caracteres
- Sin anuncios
- Optimización con IA
- Traducciones ilimitadas
- Soporte prioritario

### Paquetes de Tokens
- **Starter**: 100 tokens - $4.99
- **Pro**: 300 tokens - $9.99 (Más Popular)
- **Expert**: 1000 tokens - $19.99
- **Lifetime**: ∞ tokens - $49.99

## 🌐 AI Language Adaptor

Traduce CVs a 5 idiomas manteniendo:
- Formato y estructura
- Estilo profesional
- Terminología técnica
- Consistencia visual

Idiomas soportados:
- 🇪🇸 Español
- 🇬🇧 Inglés
- 🇸🇦 Árabe
- 🇨🇳 Chino
- 🇮🇳 Hindi

## 🎨 Diseño y UX

### Colores
- **Primario**: #2563EB (azul profesional)
- **Secundario**: #10B981 (verde éxito)
- **Fondo**: #F9FAFB (gris neutro)

### Tipografía
- **Principal**: Inter
- **Secundaria**: Poppins

### Características UX
- Feedback emocional en cada paso
- Microanimaciones y transiciones
- Progreso visual constante
- Tips contextuales
- Mensajes motivacionales

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd getquickresume

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

### Scripts Disponibles
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting del código
- `npm run type-check` - Verificación de tipos

## 📱 Responsive Design

- **Mobile First** - Diseño optimizado para móviles
- **Breakpoints** - sm, md, lg, xl
- **Touch Friendly** - Botones y elementos táctiles
- **Accesibilidad** - WCAG AA compliant

## 🔒 Seguridad y Privacidad

- Autenticación OAuth 2.0/OIDC
- Encriptación de datos sensibles
- Cumplimiento GDPR/CCPA
- Políticas de privacidad claras
- Control de datos del usuario

## 🎯 Próximas Características

- [ ] Integración con APIs de IA reales
- [ ] Más plantillas de CV
- [ ] Exportación a PDF/Word
- [ ] Integración con LinkedIn
- [ ] Analytics avanzados
- [ ] Modo offline
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@getquickresume.com
- Documentación: [docs.getquickresume.com](https://docs.getquickresume.com)
- Issues: [GitHub Issues](https://github.com/getquickresume/issues)

---

**GetQuickResume** - Crea tu currículum profesional en minutos. Gratuito, optimizado y traducible con IA.
