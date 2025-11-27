import { Resume } from '@/types';
import { useTranslation } from 'react-i18next';
import { Edit2, Download, Calendar, FileText } from 'lucide-react';

interface ResumeHeaderProps {
  resume: Resume;
  onEdit: () => void;
  onDownload: () => void;
  isGeneratingPDF?: boolean;
}

export function ResumeHeader({ resume, onEdit, onDownload, isGeneratingPDF = false }: ResumeHeaderProps) {
  const { t } = useTranslation();
  const { resumeData, status, updatedAt, title } = resume;

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  };

  const getStatusBadgeColor = () => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'generated':
        return 'bg-blue-100 text-blue-800';
      case 'optimized':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {resumeData.firstName} {resumeData.lastName}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor()}`}>
              {t(`resumeView.status.${status}`)}
            </span>
          </div>
          {resumeData.profession && (
            <p className="text-lg text-gray-600 mb-2">{resumeData.profession}</p>
          )}
          {title && title !== `${resumeData.firstName} ${resumeData.lastName} - CV` && (
            <p className="text-sm text-gray-500 mb-2">{title}</p>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {t('resumeView.metadata.lastUpdated')}: {formatDate(updatedAt)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label={t('resumeView.actions.edit')}
          >
            <Edit2 className="w-4 h-4" />
            <span>{t('resumeView.actions.edit')}</span>
          </button>
          <button
            onClick={onDownload}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('resumeView.actions.download')}
          >
            <Download className="w-4 h-4" />
            <span>
              {isGeneratingPDF
                ? t('resumeView.download.generating')
                : t('resumeView.actions.download')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

