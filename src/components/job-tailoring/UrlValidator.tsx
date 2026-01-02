import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Link2, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ExternalLink,
  Info
} from 'lucide-react';
import { UrlValidationResult } from '@/types/jobTailoring';
import { validateUrlFormat, getSupportedJobBoardsList } from '@/utils/urlValidation';

interface UrlValidatorProps {
  url: string;
  onUrlChange: (url: string) => void;
  onValidate: () => Promise<void>;
  validationResult: UrlValidationResult | null;
  isValidating: boolean;
  onSwitchToManual: () => void;
}

export function UrlValidator({
  url,
  onUrlChange,
  onValidate,
  validationResult,
  isValidating,
  onSwitchToManual,
}: UrlValidatorProps) {
  const { t } = useTranslation();
  const [showSupportedDomains, setShowSupportedDomains] = useState(false);
  const [localValidation, setLocalValidation] = useState<{
    isValid: boolean;
    error?: string;
    jobBoardName?: string;
  } | null>(null);

  // Perform local format validation as user types
  useEffect(() => {
    if (!url.trim()) {
      setLocalValidation(null);
      return;
    }

    const result = validateUrlFormat(url);
    setLocalValidation({
      isValid: result.isValid,
      error: result.error,
      jobBoardName: result.jobBoardName,
    });
  }, [url]);

  const handleValidateClick = async () => {
    if (!localValidation?.isValid) return;
    await onValidate();
  };

  const supportedDomains = getSupportedJobBoardsList();

  // Determine the current state
  const getValidationState = () => {
    if (isValidating) return 'validating';
    if (validationResult?.hasJobContent) return 'success';
    if (validationResult?.error) return 'error';
    if (localValidation?.error) return 'format-error';
    if (localValidation?.isValid) return 'ready';
    return 'idle';
  };

  const state = getValidationState();

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Link2 className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder={t('jobTailoring.urlValidator.placeholder')}
          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
            state === 'error' || state === 'format-error'
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : state === 'success'
              ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
              : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
          }`}
          disabled={isValidating}
        />
        
        {/* Status indicator inside input */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {state === 'validating' && (
            <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
          )}
          {state === 'success' && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          {(state === 'error' || state === 'format-error') && (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
      </div>

      {/* Validation Status Messages */}
      {state === 'validating' && (
        <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-3 rounded-lg">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">{t('jobTailoring.urlValidator.validating')}</span>
        </div>
      )}

      {state === 'format-error' && localValidation?.error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
          <XCircle className="h-4 w-4" />
          <span className="text-sm">{localValidation.error}</span>
        </div>
      )}

      {state === 'error' && validationResult?.error && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
            <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <span className="text-sm font-medium block">{validationResult.error.message}</span>
              <button
                onClick={onSwitchToManual}
                className="text-sm text-red-700 underline hover:text-red-800 mt-1"
              >
                {t('jobTailoring.urlValidator.pasteManuallyLink')}
              </button>
            </div>
          </div>
        </div>
      )}

      {state === 'success' && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{t('jobTailoring.urlValidator.successReady')}</span>
        </div>
      )}

      {/* Job Board Recognition */}
      {state === 'ready' && localValidation?.jobBoardName && (
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-3 rounded-lg">
          <ExternalLink className="h-4 w-4" />
          <span className="text-sm">
            {t('jobTailoring.urlValidator.detected')} <strong>{localValidation.jobBoardName}</strong>
          </span>
        </div>
      )}

      {/* Validate Button */}
      {state === 'ready' && !validationResult?.hasJobContent && (
        <button
          onClick={handleValidateClick}
          disabled={isValidating}
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Link2 className="h-5 w-5" />
          {t('jobTailoring.urlValidator.validateButton')}
        </button>
      )}

      {/* Supported Domains Info */}
      <div className="relative">
        <button
          onClick={() => setShowSupportedDomains(!showSupportedDomains)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Info className="h-4 w-4" />
          <span>{t('jobTailoring.urlValidator.supportedBoards')}</span>
        </button>

        {showSupportedDomains && (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              {t('jobTailoring.urlValidator.supportedBoardsDesc')}
            </p>
            <div className="flex flex-wrap gap-2">
              {supportedDomains.map((board) => (
                <span
                  key={board.domain}
                  className="px-2 py-1 bg-white text-xs text-gray-700 rounded-md border border-gray-200"
                >
                  {board.name}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {t('jobTailoring.urlValidator.otherUrlsNote')}
            </p>
          </div>
        )}
      </div>

      {/* Alternative: Manual Input */}
      <div className="flex items-center gap-2 pt-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">{t('jobTailoring.urlValidator.or')}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <button
        onClick={onSwitchToManual}
        className="w-full py-2 px-4 text-gray-600 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <AlertTriangle className="h-4 w-4" />
        {t('jobTailoring.urlValidator.pasteManually')}
      </button>
    </div>
  );
}

export default UrlValidator;

