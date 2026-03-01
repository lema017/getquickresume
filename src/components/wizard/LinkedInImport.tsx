import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { LinkedInDataWizard } from './LinkedInDataWizard';
import { 
  ArrowLeft, 
  Linkedin, 
  CheckCircle,
  Home,
  Crown,
  Lock
} from 'lucide-react';

export function LinkedInImport() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { navigateToStep } = useWizardNavigation();
  const { user, isAuthenticated } = useAuthStore();
  const [showWizard, setShowWizard] = useState(false);
  const [importedData, setImportedData] = useState<any>(null);

  const isLinkedInUser = user?.provider === 'linkedin';
  const isPremium = user?.isPremium ?? false;

  // Check premium status on mount
  useEffect(() => {
    if (isAuthenticated && !isPremium) {
      // User is not premium, but don't redirect immediately - show upgrade prompt instead
      // The component will show premium required message
    }
  }, [isAuthenticated, isPremium]);

  const handleBack = () => {
    navigate('/wizard');
  };

  const handleStartWizard = () => {
    // Check premium status before starting wizard
    if (!isPremium) {
      navigate('/premium');
      return;
    }
    setShowWizard(true);
  };

  const handleWizardComplete = (data: any) => {
    setImportedData(data);
    setShowWizard(false);
  };

  const handleWizardBack = () => {
    setShowWizard(false);
  };

  const handleContinue = () => {
    if (importedData) {
      // Navigate to manual wizard with pre-filled data
      navigateToStep(1, { 
        state: { 
          preFilledData: importedData,
          fromLinkedIn: true 
        } 
      });
    }
  };

  // Show wizard if user clicked to start it
  if (showWizard) {
    return (
      <LinkedInDataWizard 
        onBack={handleWizardBack}
      />
    );
  }

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
            <span>{t('wizard.linkedinImportPage.header.backToDashboard')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('wizard.linkedinImportPage.header.backToOptions')}</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('wizard.linkedinImportPage.header.title')}
          </h1>
          <p className="text-gray-600">
            {t('wizard.linkedinImportPage.header.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {!isPremium ? (
            // Premium Required Message
            <div className="max-w-2xl mx-auto text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('wizard.linkedinImportPage.premiumRequired.title') || 'Premium Feature Required'}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {t('wizard.linkedinImportPage.premiumRequired.description') || 'LinkedIn import is a premium feature. Upgrade to access this functionality and import your LinkedIn profile data.'}
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-amber-900 mb-2 flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  {t('wizard.linkedinImportPage.premiumRequired.benefitsTitle') || 'Premium Benefits'}
                </h3>
                <ul className="text-left space-y-2 text-sm text-amber-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{t('wizard.linkedinImportPage.premiumRequired.benefit1') || 'Import from LinkedIn profile'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{t('wizard.linkedinImportPage.premiumRequired.benefit2') || '30 resumes per month'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{t('wizard.linkedinImportPage.premiumRequired.benefit3') || 'Advanced AI optimization'}</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/premium')}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Crown className="w-5 h-5" />
                <span>{t('wizard.linkedinImportPage.premiumRequired.upgradeButton') || 'Upgrade to Premium'}</span>
              </button>
            </div>
          ) : !importedData ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <Linkedin className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('wizard.linkedinImportPage.card.title')}
              </h2>
              
              <p className="text-gray-600 mb-8">
                {t('wizard.linkedinImportPage.card.description')}
              </p>

              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.linkedinImportPage.features.personalAndSummary')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.linkedinImportPage.features.experience')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.linkedinImportPage.features.education')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('wizard.linkedinImportPage.features.projectsSkillsRecommendations')}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {t('wizard.linkedinImportPage.howItWorks.title')}
                </h3>
                <p className="text-blue-800 text-sm">
                  {t('wizard.linkedinImportPage.howItWorks.description')}
                </p>
              </div>

              <button
                onClick={handleStartWizard}
                className="w-full bg-gradient-to-r from-orange-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <Linkedin className="w-5 h-5" />
                <span>{t('wizard.linkedinImportPage.cta.startImport')}</span>
              </button>
            </div>
          ) : (
            // Show imported data
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('wizard.linkedinImportPage.success.title')}
                </h2>
                <p className="text-gray-600">
                {t('wizard.linkedinImportPage.success.description')}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('wizard.linkedinImportPage.data.title')}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">{t('wizard.linkedinImportPage.data.name')}</span> {importedData.firstName} {importedData.lastName}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('wizard.linkedinImportPage.data.email')}</span> {importedData.email}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('wizard.linkedinImportPage.data.linkedin')}</span> {importedData.linkedin}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('wizard.linkedinImportPage.data.experience')}</span> {t('wizard.linkedinImportPage.data.experiencePositions', { count: importedData.experience?.length || 0 })}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('wizard.linkedinImportPage.data.education')}</span> {t('wizard.linkedinImportPage.data.educationTitles', { count: importedData.education?.length || 0 })}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('wizard.linkedinImportPage.data.skills')}</span> {t('wizard.linkedinImportPage.data.skillsCount', { count: importedData.skillsRaw?.length || 0 })}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setImportedData(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  {t('wizard.linkedinImportPage.actions.reimport')}
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-700 hover:to-blue-700 transition-all duration-200"
                >
                  {t('wizard.linkedinImportPage.actions.continue')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}