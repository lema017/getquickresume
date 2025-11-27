import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
}

export function SummarySection({ summary }: SummarySectionProps) {
  const { t } = useTranslation();

  if (!summary || summary.trim() === '') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <FileText className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t('resumeView.sections.summary')}
          </h2>
        </div>
        <p className="text-gray-500 italic">{t('resumeView.emptyStates.summary')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.summary')}
        </h2>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{summary}</p>
    </div>
  );
}

