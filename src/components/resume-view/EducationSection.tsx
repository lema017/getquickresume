import { Education } from '@/types';
import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const { t } = useTranslation();

  if (!education || education.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t('resumeView.sections.education')}
          </h2>
        </div>
        <p className="text-gray-500 italic">{t('resumeView.emptyStates.education')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.education')}
        </h2>
      </div>
      
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="border-l-4 border-green-200 pl-4">
            <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
            <p className="text-gray-600">{edu.degree}</p>
            {edu.field && (
              <p className="text-sm text-gray-500">{edu.field}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}
            </p>
            {edu.gpa && (
              <p className="text-sm text-gray-600 mt-1">
                GPA: {edu.gpa}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

