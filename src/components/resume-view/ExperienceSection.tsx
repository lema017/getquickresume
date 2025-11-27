import { WorkExperience } from '@/types';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: WorkExperience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { t } = useTranslation();

  if (!experiences || experiences.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t('resumeView.sections.experience')}
          </h2>
        </div>
        <p className="text-gray-500 italic">{t('resumeView.emptyStates.experience')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.experience')}
        </h2>
      </div>
      
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
            <div className="mb-2">
              <h3 className="font-semibold text-gray-900 text-lg">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate} {exp.isCurrent ? `- ${t('resumeView.metadata.current')}` : exp.endDate ? `- ${exp.endDate}` : ''}
              </p>
            </div>
            
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium text-gray-800 mb-2 text-sm">
                  {t('resumeView.metadata.responsibilities')}:
                </h4>
                <ul className="space-y-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {exp.achievements && exp.achievements.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium text-gray-800 mb-2 text-sm">
                  {t('resumeView.metadata.achievements')}:
                </h4>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

