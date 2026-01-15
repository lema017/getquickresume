import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUploadResumeStore, TargetLanguage } from '@/stores/uploadResumeStore';
import { 
  ArrowLeft,
  ArrowRight,
  Home,
  Globe,
  Check,
  FileText
} from 'lucide-react';

interface LanguageOption {
  code: TargetLanguage;
  name: string;
  flag: string;
  nativeName: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
];

export function UploadLanguageSelection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { 
    targetLanguage,
    setTargetLanguage,
    extractedText,
    selectedFile,
    setCurrentStep
  } = useUploadResumeStore();

  // If no extracted text, redirect back to upload
  React.useEffect(() => {
    if (!extractedText) {
      navigate('/wizard/upload');
    }
  }, [extractedText, navigate]);

  const handleBack = () => {
    navigate('/wizard/upload');
  };

  const handleContinue = () => {
    setCurrentStep('extracting');
    navigate('/wizard/upload/processing');
  };

  const handleSelectLanguage = (lang: TargetLanguage) => {
    setTargetLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Dashboard Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t('wizard.uploadPage.header.backToDashboard')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('wizard.uploadPage.header.backToOptions')}</span>
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('wizard.uploadPage.languageSelection.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('wizard.uploadPage.languageSelection.subtitle')}
          </p>
        </div>

        {/* Language Selection Cards */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleSelectLanguage(option.code)}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  targetLanguage === option.code
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Selected indicator */}
                {targetLanguage === option.code && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                
                {/* Flag and language info */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl" role="img" aria-label={option.name}>
                    {option.flag}
                  </span>
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      targetLanguage === option.code ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {option.nativeName}
                    </h3>
                    <p className={`text-sm ${
                      targetLanguage === option.code ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {option.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* File Info Summary */}
        {selectedFile && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {selectedFile.name}
                  </p>
                  {extractedText && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {extractedText.substring(0, 150)}...
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {t('wizard.uploadPage.languageSelection.fileInfo', { 
                      chars: extractedText?.length || 0 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info box */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800">
                  {t('wizard.uploadPage.languageSelection.explanation')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="max-w-2xl mx-auto flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </button>
          
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {t('wizard.uploadPage.languageSelection.continue')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

