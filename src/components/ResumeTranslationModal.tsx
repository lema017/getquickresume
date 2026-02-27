import React, { useState } from 'react';
import { X, Globe, Loader2, CheckCircle, Crown, AlertCircle, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Keep current language selectable (needed for same-language rewrite/polish)
  const availableLanguages = [...SUPPORTED_LANGUAGES].sort((a, b) => {
    if (a.code === currentLanguage) return -1;
    if (b.code === currentLanguage) return 1;
    return a.name.localeCompare(b.name);
  });

  const filteredLanguages = searchQuery.trim()
    ? availableLanguages.filter((lang) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = lang.name.toLowerCase().includes(query) || lang.code.toLowerCase().includes(query);
        const isCurrent = lang.code === currentLanguage;
        return matchesSearch || isCurrent;
      })
    : availableLanguages;

  const isPremium = user?.isPremium ?? false;
  const isRewriteMode = !!selectedLanguage && selectedLanguage === currentLanguage;

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
      const mode = selectedLanguage === currentLanguage ? 'rewrite' : 'translate';
      const translatedResume: Resume = await resumeTranslationService.translateResume(
        resumeId,
        selectedLanguage,
        mode
      );

      toast.success(
        mode === 'rewrite'
          ? t('resumeTranslation.rewriteSuccess', t('resumeTranslation.success'))
          : t('resumeTranslation.success')
      );
      
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
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('resumeTranslation.searchLanguages', 'Search languages...')}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="max-h-72 overflow-y-auto rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredLanguages.map((lang) => (
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
                    {lang.code === currentLanguage && (
                      <div className="mt-1">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                          {t('resumeTranslation.currentLanguageBadge', 'Current')}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {filteredLanguages.length === 0 && (
                <p className="text-center text-sm text-gray-500 py-6">
                  {t('resumeTranslation.noLanguagesFound', 'No languages found')}
                </p>
              )}
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
                  {isRewriteMode
                    ? t('resumeTranslation.confirmationRewrite', {
                        language: selectedLanguageInfo?.name || selectedLanguage,
                      })
                    : t('resumeTranslation.confirmation', {
                        language: selectedLanguageInfo?.name || selectedLanguage,
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
                    {isRewriteMode
                      ? t('resumeTranslation.rewriting', t('resumeTranslation.translating'))
                      : t('resumeTranslation.translating')}
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-2" />
                    {isRewriteMode
                      ? t('resumeTranslation.rewriteButton', t('resumeTranslation.translateButton'))
                      : t('resumeTranslation.translateButton')}
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

