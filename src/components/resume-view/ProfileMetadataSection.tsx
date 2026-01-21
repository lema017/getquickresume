import { ResumeData } from '@/types';
import { useTranslation } from 'react-i18next';
import { Target, Palette, Globe, Briefcase } from 'lucide-react';

interface ProfileMetadataSectionProps {
  resumeData: ResumeData;
}

export function ProfileMetadataSection({ resumeData }: ProfileMetadataSectionProps) {
  const { t } = useTranslation();
  const { targetLevel, tone, language, jobDescription } = resumeData;

  const hasMetadata = targetLevel || tone || language || jobDescription;

  if (!hasMetadata) {
    return null;
  }

  const getTargetLevelLabel = (level: string) => {
    const validLevels = ['entry', 'mid', 'senior', 'executive'];
    // Map common alternatives
    const levelMap: Record<string, string> = {
      'junior': 'entry',
      'junior level': 'entry',
      'entry level': 'entry',
      'entry-level': 'entry',
      'mid level': 'mid',
      'mid-level': 'mid',
      'middle': 'mid',
      'senior level': 'senior',
      'senior-level': 'senior',
      'lead': 'senior',
      'principal': 'executive',
      'director': 'executive',
      'manager': 'senior',
      'c-level': 'executive',
      'vp': 'executive',
    };
    
    const normalizedLevel = levelMap[level.toLowerCase()] || level;
    
    if (validLevels.includes(normalizedLevel)) {
      return t(`resumeView.metadata.targetLevel.${normalizedLevel}`);
    }
    // Fallback: return the original level capitalized
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const getToneLabel = (toneValue: string) => {
    const validTones = ['professional', 'creative', 'technical', 'friendly'];
    
    if (validTones.includes(toneValue)) {
      return t(`resumeView.metadata.tone.${toneValue}`);
    }
    // Fallback: return the original tone capitalized
    return toneValue.charAt(0).toUpperCase() + toneValue.slice(1);
  };

  const getLanguageLabel = (lang: string) => {
    return lang === 'es' ? '🇪🇸 Español' : '🇺🇸 English';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.profileMetadata')}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {targetLevel && (
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">{t('resumeView.metadata.targetLevel.label')}: </span>
              <span className="font-medium text-gray-700">{getTargetLevelLabel(targetLevel)}</span>
            </div>
          </div>
        )}
        {tone && (
          <div className="flex items-center">
            <Palette className="w-4 h-4 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">{t('resumeView.metadata.tone.label')}: </span>
              <span className="font-medium text-gray-700">{getToneLabel(tone)}</span>
            </div>
          </div>
        )}
        {language && (
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2 text-gray-400" />
            <div>
              <span className="text-sm text-gray-500">{t('resumeView.metadata.language.label')}: </span>
              <span className="font-medium text-gray-700">{getLanguageLabel(language)}</span>
            </div>
          </div>
        )}
      </div>

      {jobDescription && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            {t('resumeView.metadata.jobDescription.label')}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {jobDescription}
          </p>
        </div>
      )}
    </div>
  );
}

