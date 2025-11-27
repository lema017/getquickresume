import { Language } from '@/types';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguagesSectionProps {
  languages: Language[];
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  const { t } = useTranslation();

  if (!languages || languages.length === 0) {
    return null;
  }

  // Normalize proficiency level to English key for translation
  const normalizeProficiencyLevel = (level: string): string => {
    const normalized = level.toLowerCase().trim();
    
    // Map Spanish values to English keys
    const spanishToEnglish: Record<string, string> = {
      'nativo': 'native',
      'nativa': 'native',
      'avanzado': 'advanced',
      'avanzada': 'advanced',
      'intermedio': 'intermediate',
      'intermedia': 'intermediate',
      'principiante': 'beginner',
      'básico': 'basic',
      'basico': 'basic',
      'básica': 'basic',
      'basica': 'basic',
      'fluido': 'fluent',
      'fluida': 'fluent',
    };
    
    // Return mapped value or original if already in English
    return spanishToEnglish[normalized] || normalized;
  };

  const getProficiencyLabel = (level: string) => {
    const normalizedLevel = normalizeProficiencyLevel(level);
    return t(`resumeView.metadata.proficiency.${normalizedLevel}`);
  };

  const getProficiencyColor = (level: string) => {
    const normalizedLevel = normalizeProficiencyLevel(level);
    switch (normalizedLevel) {
      case 'native':
      case 'fluent':
        return 'bg-green-100 text-green-800';
      case 'advanced':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'beginner':
      case 'basic':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Globe className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.languages')}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center justify-between">
            <span className="font-medium text-gray-900">{lang.name}</span>
            {lang.level && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${getProficiencyColor(lang.level)}`}>
                {getProficiencyLabel(lang.level)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

