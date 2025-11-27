import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  FileText, 
  Upload, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Clock,
  Zap,
  ArrowLeft,
  Linkedin
} from 'lucide-react';

export function ResumeCreationMode() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetResume } = useResumeStore();
  const { user } = useAuthStore();

  useEffect(() => {
    // Clear wizard data and localStorage when entering creation mode
    resetResume();
    localStorage.removeItem('resume_wizard_v1');
    localStorage.removeItem('generated-resume');
  }, [resetResume]);

  const handleManualCreation = () => {
    navigate('/wizard/manual/step-1');
  };

  const handleUploadResume = () => {
    navigate('/wizard/upload');
  };

  const handleLinkedInImport = () => {
    navigate('/wizard/linkedin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Dashboard Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('wizard.creationMode.header.backToDashboard')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('wizard.creationMode.header.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('wizard.creationMode.header.subtitle')}
          </p>
        </div>

        {/* Creation Options */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {/* Manual Creation */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col" onClick={handleManualCreation}>
            <div className="text-center flex-1 flex flex-col">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('wizard.creationMode.manual.title')}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {t('wizard.creationMode.manual.description')}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.manual.features.guidedForm')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.manual.features.aiOptimization')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.manual.features.templates')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.manual.features.free')}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg">
              <span>{t('wizard.creationMode.manual.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Time estimate */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{t('wizard.creationMode.manual.timeEstimate')}</span>
            </div>
          </div>

          {/* Upload Resume - Coming Soon */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-full flex flex-col opacity-75 relative">
            {/* Coming Soon Badge */}
            <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {t('wizard.creationMode.upload.comingSoon')}
            </div>
            
            <div className="text-center flex-1 flex flex-col">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('wizard.creationMode.upload.title')}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {t('wizard.creationMode.upload.description')}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.upload.features.dataExtraction')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.upload.features.aiOptimization')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.upload.features.multiFormat')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.upload.features.editing')}</span>
                </div>
              </div>
            </div>

            {/* CTA Button - Disabled */}
            <button 
              disabled
              className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>{t('wizard.creationMode.upload.cta')}</span>
            </button>

            {/* Time estimate */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4" />
              <span>{t('wizard.creationMode.upload.timeEstimate')}</span>
            </div>
          </div>

          {/* LinkedIn Import */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col" onClick={handleLinkedInImport}>
            <div className="text-center flex-1 flex flex-col">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('wizard.creationMode.linkedin.title')}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {user?.provider === 'linkedin' 
                  ? t('wizard.creationMode.linkedin.description.loggedIn')
                  : t('wizard.creationMode.linkedin.description.publicUrl')
                }
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{user?.provider === 'linkedin' ? t('wizard.creationMode.linkedin.features.automaticImport') : t('wizard.creationMode.linkedin.features.urlImport')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.linkedin.features.fullData')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.linkedin.features.aiOptimization')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.creationMode.linkedin.features.experienceEducation')}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-orange-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:from-orange-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg">
              <span>{t('wizard.creationMode.linkedin.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Time estimate */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
              <span>{t('wizard.creationMode.linkedin.timeEstimate')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
