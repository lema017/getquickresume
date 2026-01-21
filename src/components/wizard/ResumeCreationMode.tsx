import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useAuthStore } from '@/stores/authStore';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { 
  FileText, 
  Upload, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Clock,
  Zap,
  ArrowLeft,
  Linkedin,
  Crown
} from 'lucide-react';

export function ResumeCreationMode() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { navigateToStep, navigateToWizardPath } = useWizardNavigation();
  const { resetResume } = useResumeStore();
  const { user } = useAuthStore();
  
  // Check if user can create new resume (premium OR free user who hasn't used their quota)
  const canCreateResume = user?.isPremium || !user?.freeResumeUsed;
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  useEffect(() => {
    // Clear wizard data and localStorage when entering creation mode
    resetResume();
    localStorage.removeItem('resume_wizard_v1');
    localStorage.removeItem('generated-resume');
  }, [resetResume]);

  // Show blocking modal if free user has already used their quota
  useEffect(() => {
    if (!canCreateResume) {
      setShowBlockedModal(true);
    }
  }, [canCreateResume]);

  const handleManualCreation = () => {
    navigateToStep(1);
  };

  const handleUploadResume = () => {
    navigateToWizardPath('/wizard/upload');
  };

  const handleLinkedInImport = () => {
    // Check if user is premium
    if (!user?.isPremium) {
      // Show upgrade prompt or navigate to premium page
      navigate('/premium');
      return;
    }
    navigateToWizardPath('/wizard/linkedin');
  };

  const isPremium = user?.isPremium ?? false;

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

          {/* Upload Resume - Available to All Users */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col" onClick={handleUploadResume}>
            {/* Free Notice for Free Users */}
            {!isPremium && !user?.freeResumeUsed && (
              <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                {t('wizard.creationMode.upload.freeNotice')}
              </div>
            )}
            
            <div className="text-center flex-1 flex flex-col">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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

            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:from-green-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg">
              <span>{t('wizard.creationMode.upload.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Time estimate */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4" />
              <span>{t('wizard.creationMode.upload.timeEstimate')}</span>
            </div>
          </div>

          {/* LinkedIn Import */}
          <div className={`bg-white rounded-2xl shadow-lg border ${!isPremium ? 'border-amber-300' : 'border-gray-200'} p-6 ${isPremium ? 'hover:shadow-xl transition-all duration-300 group cursor-pointer' : 'opacity-90'} h-full flex flex-col ${isPremium ? '' : 'relative'}`} onClick={isPremium ? handleLinkedInImport : undefined}>
            {/* Premium Badge for Free Users */}
            {!isPremium && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span>{t('wizard.creationMode.linkedin.premiumBadge') || 'Premium'}</span>
              </div>
            )}
            
            <div className="text-center flex-1 flex flex-col">
              {/* Icon */}
              <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${isPremium ? 'from-orange-500 to-blue-600' : 'from-gray-400 to-gray-500'} rounded-full flex items-center justify-center mb-4 ${isPremium ? 'group-hover:scale-110 transition-transform duration-300' : ''}`}>
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('wizard.creationMode.linkedin.title')}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {!isPremium 
                  ? t('wizard.creationMode.linkedin.description.premiumRequired') || 'LinkedIn import is a premium feature. Upgrade to access this functionality.'
                  : user?.provider === 'linkedin' 
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
            <button 
              onClick={isPremium ? handleLinkedInImport : () => navigate('/premium')}
              className={`w-full ${isPremium ? 'bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700' : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700'} text-white py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${isPremium ? 'group-hover:shadow-lg' : ''}`}
            >
              <span>{isPremium ? t('wizard.creationMode.linkedin.cta') : t('wizard.creationMode.linkedin.upgradeCta') || 'Upgrade to Premium'}</span>
              {isPremium ? (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              ) : (
                <Crown className="w-4 h-4" />
              )}
            </button>

            {/* Time estimate */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
              <span>{t('wizard.creationMode.linkedin.timeEstimate')}</span>
            </div>
          </div>
        </div>

        {/* Blocking Modal for free users who have used their quota */}
        <PremiumActionModal
          isOpen={showBlockedModal}
          onClose={() => {
            setShowBlockedModal(false);
            // Redirect to dashboard when closing the modal since they can't create
            navigate('/dashboard');
          }}
          feature="createResume"
        />
      </div>
    </div>
  );
}
