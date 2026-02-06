import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { es } from './locales/es';
import { en } from './locales/en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    // Don't force lng - let LanguageDetector determine language
    fallbackLng: 'en', // English as fallback for unsupported languages
    supportedLngs: ['en', 'es'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Priority: 1) localStorage (user preference), 2) navigator (browser language), 3) htmlTag
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      // Map language variants to supported languages (e.g., en-US -> en, es-MX -> es)
      convertDetectedLanguage: (lng: string) => {
        // Extract base language code (e.g., 'en-US' -> 'en', 'es-MX' -> 'es')
        const baseLang = lng.split('-')[0].toLowerCase();
        // Return supported language or fallback to English
        return ['en', 'es'].includes(baseLang) ? baseLang : 'en';
      },
    },
  });

export default i18n;
