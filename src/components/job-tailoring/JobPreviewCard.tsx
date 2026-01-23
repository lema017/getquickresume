import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Briefcase, 
  CheckCircle, 
  Edit3, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { UrlValidationResult } from '@/types/jobTailoring';

interface JobPreviewCardProps {
  validationResult: UrlValidationResult;
  jobUrl: string;
  onConfirm: () => void;
  onEdit: () => void;
  onReject: () => void;
  isLoading?: boolean;
}

export function JobPreviewCard({
  validationResult,
  jobUrl,
  onConfirm,
  onEdit,
  onReject,
  isLoading = false,
}: JobPreviewCardProps) {
  const { t } = useTranslation();
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!validationResult.extractedContent) {
    return null;
  }

  const { title, company, snippet, fullDescription } = validationResult.extractedContent;

  return (
    <div className="bg-white rounded-2xl border-2 border-green-200 shadow-lg overflow-hidden">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{t('jobTailoring.jobPreview.found')}</h3>
            <p className="text-green-100 text-sm">{t('jobTailoring.jobPreview.reviewInfo')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Job Title */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('jobTailoring.jobPreview.jobTitle')}</p>
            <p className="font-semibold text-gray-900 text-lg">{title}</p>
          </div>
        </div>

        {/* Company */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('jobTailoring.jobPreview.company')}</p>
            <p className="font-semibold text-gray-900 text-lg">{company}</p>
          </div>
        </div>

        {/* Description Preview */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-2">{t('jobTailoring.jobPreview.descriptionPreview')}</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            {showFullDescription ? fullDescription : snippet}
          </p>
          {fullDescription.length > 200 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
            >
              {showFullDescription ? (
                <>
                  {t('jobTailoring.jobPreview.showLess')} <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  {t('jobTailoring.jobPreview.showFull')} <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Source URL */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ExternalLink className="w-4 h-4" />
          <a 
            href={jobUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-orange-600 truncate max-w-md"
          >
            {jobUrl}
          </a>
        </div>

        {/* "Doesn't look right?" prompt */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-gray-600">
            {t('jobTailoring.jobPreview.notRight')}{' '}
            <button
              onClick={onReject}
              className="text-orange-600 hover:text-orange-700 font-medium underline"
            >
              {t('jobTailoring.jobPreview.enterManually')}
            </button>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          {t('jobTailoring.jobPreview.editDetails')}
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
            isLoading
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:from-orange-600 hover:to-amber-600 hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('jobTailoring.jobPreview.analyzing')}
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              {t('jobTailoring.jobPreview.confirmContinue')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default JobPreviewCard;

