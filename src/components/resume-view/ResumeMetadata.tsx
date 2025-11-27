import { Resume } from '@/types';
import { useTranslation } from 'react-i18next';
import { Calendar, FileText, CheckCircle } from 'lucide-react';

interface ResumeMetadataProps {
  resume: Resume;
}

export function ResumeMetadata({ resume }: ResumeMetadataProps) {
  const { t } = useTranslation();
  const { resumeData, createdAt, updatedAt } = resume;

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  };

  return (
    <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        {t('resumeView.metadata.title')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        {resumeData.totalCharacters > 0 && (
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-2 text-gray-400" />
            <div>
              <span className="text-gray-500">{t('resumeView.metadata.totalCharacters')}: </span>
              <span className="font-medium text-gray-700">{resumeData.totalCharacters.toLocaleString()}</span>
            </div>
          </div>
        )}
        {resumeData.completedSteps && resumeData.completedSteps.length > 0 && (
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
            <div>
              <span className="text-gray-500">{t('resumeView.metadata.completedSteps')}: </span>
              <span className="font-medium text-gray-700">{resumeData.completedSteps.length}/10</span>
            </div>
          </div>
        )}
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <div>
            <span className="text-gray-500">{t('resumeView.metadata.created')}: </span>
            <span className="font-medium text-gray-700">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

