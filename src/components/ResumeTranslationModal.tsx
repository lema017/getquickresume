import React, { useState } from 'react';
import { X, Globe, Loader2, CheckCircle, Crown, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { resumeTranslationService, SUPPORTED_LANGUAGES, SupportedLanguage } from '@/services/resumeTranslationService';
import { Resume } from '@/types';
import toast from 'react-hot-toast';

interface ResumeTranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string;
  currentLanguage: string;
  resumeTitle?: string;
}

export function ResumeTranslationModal({
  isOpen,
  onClose,
  resumeId,
  currentLanguage,
  resumeTitle
}: ResumeTranslationModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter out current language from available languages
  const availableLanguages = SUPPORTED_LANGUAGES.filter(
    lang => lang.code !== currentLanguage
  );

  const isPremium = user?.isPremium ?? false;

  const handleTranslate = async () => {
    if (!selectedLanguage) {
      toast.error(t('resumeTranslation.selectLanguage'));
      return;
    }

    if (!isPremium) {
      navigate('/premium');
      onClose();
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const translatedResume: Resume = await resumeTranslationService.translateResume(
        resumeId,
        selectedLanguage
      );

      toast.success(t('resumeTranslation.success'));
      
      // Navigate to the new translated resume
      navigate(`/resume/${translatedResume.id}`);
      onClose();
    } catch (err: any) {
      console.error('Error translating resume:', err);
      const errorMessage = err.message || t('resumeTranslation.error');
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleUpgrade = () => {
    navigate('/premium');
    onClose();
  };

  const selectedLanguageInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === selectedLanguage);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 break-words">
                {t('resumeTranslation.title')}
              </h3>
              {resumeTitle && (
                <p className="text-sm text-gray-500 mt-1 truncate">{resumeTitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            aria-label={t('common.close')}
            disabled={isTranslating}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isPremium && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <Crown className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                    {t('resumeTranslation.premiumRequired.title')}
                  </h4>
                  <p className="text-sm text-yellow-800 mb-3">
                    {t('resumeTranslation.premiumRequired.description')}
                  </p>
                  <button
                    onClick={handleUpgrade}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm"
                  >
                    {t('resumeTranslation.premiumRequired.upgradeButton')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('resumeTranslation.selectLanguage')}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  disabled={isTranslating || !isPremium}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedLanguage === lang.code
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${
                    !isPremium ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="text-sm font-medium text-gray-900">{lang.name}</div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {selectedLanguage && isPremium && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  {t('resumeTranslation.confirmation', {
                    language: selectedLanguageInfo?.name || selectedLanguage
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isTranslating}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
            >
              {t('common.cancel')}
            </button>
            {isPremium ? (
              <button
                onClick={handleTranslate}
                disabled={!selectedLanguage || isTranslating}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('resumeTranslation.translating')}
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-2" />
                    {t('resumeTranslation.translateButton')}
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center"
              >
                <Crown className="w-4 h-4 mr-2" />
                {t('resumeTranslation.premiumRequired.upgradeButton')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

