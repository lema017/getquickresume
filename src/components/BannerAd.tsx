import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useResumeStore } from '@/stores/resumeStore';

interface BannerAdProps {
  position: 'top' | 'bottom';
  step?: number;
}

export function BannerAd({ position, step = 1 }: BannerAdProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { wizardState } = useResumeStore();

  // Don't show ads for premium users
  if (user?.isPremium) {
    return null;
  }

  const marginClass = position === 'top' ? 'mt-6 mb-6' : 'mt-8 mb-4';

  // Different banner content for each step
  const bannerContent = {
    1: {
      title: "¡Comienza tu CV profesional!",
      description: "Crea un perfil que destaque entre la competencia",
      cta: "Continuar Gratis"
    },
    2: {
      title: "¡Destaca tus habilidades!",
      description: "Las habilidades correctas abren más puertas",
      cta: "Seguir Creando"
    },
    3: {
      title: "¡Cuenta tu experiencia!",
      description: "Cada logro cuenta en tu carrera profesional",
      cta: "Continuar"
    },
    4: {
      title: "¡Tu formación es valiosa!",
      description: "La educación continua es clave para el éxito",
      cta: "Siguiente Paso"
    },
    5: {
      title: "¡Muestra tus proyectos!",
      description: "Los proyectos personales demuestran tu pasión",
      cta: "Continuar"
    },
    6: {
      title: "¡Casi terminamos!",
      description: "Un resumen perfecto puede cambiar tu vida",
      cta: "Finalizar"
    },
    7: {
      title: "¡Tu CV está listo!",
      description: "Descarga y comparte tu currículum profesional",
      cta: "Descargar CV"
    }
  };

  const currentContent = bannerContent[step as keyof typeof bannerContent] || bannerContent[1];

  const bannerStyle = position === 'top' 
    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
    : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200';

  return (
    <div className={`w-full px-4 ${marginClass}`}>
      <div className={`banner-ad ${bannerStyle} border-2 rounded-xl shadow-sm`}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-gray-600">
            📢 Anuncio - Paso {step}
          </div>
          <div className="text-xs text-gray-500">
            {position === 'top' ? 'Arriba' : 'Abajo'}
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800 mb-2">
          {currentContent.title}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          {currentContent.description}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button className={`text-sm py-2 px-4 rounded-lg font-medium transition-colors ${
            position === 'top' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}>
            {currentContent.cta}
          </button>
          <button className="text-sm py-2 px-4 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
