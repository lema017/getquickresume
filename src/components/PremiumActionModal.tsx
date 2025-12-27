import { X, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface PremiumActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: 'enhance' | 'rescore' | 'edit' | 'aiSuggestions' | 'regenerate' | 'createResume' | 'premiumTemplate';
}

export function PremiumActionModal({
  isOpen,
  onClose,
  feature,
}: PremiumActionModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate('/premium');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t(`dashboard.premiumAction.${feature}.title`)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            {t(`dashboard.premiumAction.${feature}.description`)}
          </p>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              {t('dashboard.premiumAction.benefits.title')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {feature === 'enhance' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.enhance.benefits.aiEnhancement')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.enhance.benefits.sectionOptimization')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.enhance.benefits.guidedQuestions')}</span>
                  </li>
                </>
              ) : feature === 'rescore' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.rescore.benefits.onDemandScoring')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.rescore.benefits.detailedFeedback')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.rescore.benefits.improvementTracking')}</span>
                  </li>
                </>
              ) : feature === 'aiSuggestions' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.aiSuggestions.benefits.smartSuggestions')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.aiSuggestions.benefits.sectionOptimization')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.aiSuggestions.benefits.unlimitedUse')}</span>
                  </li>
                </>
              ) : feature === 'regenerate' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.regenerate.benefits.unlimitedRegeneration')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.regenerate.benefits.aiOptimization')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.regenerate.benefits.multipleVersions')}</span>
                  </li>
                </>
              ) : feature === 'createResume' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.createResume.benefits.unlimitedResumes')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.createResume.benefits.aiGeneration')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.createResume.benefits.allFeatures')}</span>
                  </li>
                </>
              ) : feature === 'premiumTemplate' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.premiumTemplate.benefits.exclusiveDesigns')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.premiumTemplate.benefits.allTemplates')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.premiumTemplate.benefits.professionalLook')}</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.edit.benefits.unlimitedEdits')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.edit.benefits.multipleResumes')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{t('dashboard.premiumAction.edit.benefits.allFeatures')}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleUpgrade}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-medium flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              {t('dashboard.premiumAction.upgradeButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

