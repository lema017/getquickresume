import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Crown, AlertCircle, X, Upload, Sparkles, FileText, Zap } from 'lucide-react';

interface FileSizeLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileSizeMB: number;
  maxSizeMB: number;
  isPremium: boolean;
}

export function FileSizeLimitModal({
  isOpen,
  onClose,
  fileSizeMB,
  maxSizeMB,
  isPremium,
}: FileSizeLimitModalProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate('/premium');
  };

  // Premium user modal - file verification
  if (isPremium) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 relative animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            {t('fileSizeModal.premium.title', 'File Too Large for Resume')}
          </h2>

          {/* Message */}
          <div className="text-center mb-6 space-y-4">
            <p className="text-gray-600">
              {t('fileSizeModal.premium.sizeInfo', {
                defaultValue: 'Your file is {{fileSize}} MB, which exceeds the {{maxSize}} MB limit.',
                fileSize: fileSizeMB.toFixed(1),
                maxSize: maxSizeMB,
              })}
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                {t('fileSizeModal.premium.hint', 'A typical resume document is usually under 5 MB. Please verify you\'re uploading the correct file.')}
              </p>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium rounded-xl hover:from-gray-800 hover:to-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {t('fileSizeModal.premium.tryAgain', 'Try Again with Different File')}
          </button>
        </div>
      </div>
    );
  }

  // Free user modal - upgrade CTA
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <Crown className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {t('fileSizeModal.free.title', 'File Size Limit Reached')}
        </h2>

        {/* Message */}
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            {t('fileSizeModal.free.sizeInfo', {
              defaultValue: 'Your file is {{fileSize}} MB, but free accounts can only upload files up to {{maxSize}} MB.',
              fileSize: fileSizeMB.toFixed(1),
              maxSize: maxSizeMB,
            })}
          </p>
        </div>

        {/* Premium features */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="font-semibold text-amber-900 mb-3 text-sm">
            {t('fileSizeModal.free.upgradeFor', 'Upgrade to Premium for:')}
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-amber-800">
              <Upload className="w-4 h-4 text-amber-600 flex-shrink-0" />
              {t('fileSizeModal.free.feature1', 'Upload files up to 10 MB')}
            </li>
            <li className="flex items-center gap-2 text-sm text-amber-800">
              <FileText className="w-4 h-4 text-amber-600 flex-shrink-0" />
              {t('fileSizeModal.free.feature2', 'Unlimited resume generations')}
            </li>
            <li className="flex items-center gap-2 text-sm text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              {t('fileSizeModal.free.feature3', 'AI-powered enhancements')}
            </li>
            <li className="flex items-center gap-2 text-sm text-amber-800">
              <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
              {t('fileSizeModal.free.feature4', 'Priority processing')}
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            onClick={handleUpgrade}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Crown className="w-5 h-5" />
            {t('fileSizeModal.free.upgrade', 'Upgrade Now')}
          </button>
        </div>
      </div>
    </div>
  );
}
