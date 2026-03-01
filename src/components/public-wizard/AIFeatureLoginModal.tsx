import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';

interface AIFeatureLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export function AIFeatureLoginModal({ isOpen, onClose, featureName }: AIFeatureLoginModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-5">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {t('publicWizard.aiModal.title')}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {t('publicWizard.aiModal.description', { featureName: featureName || t('publicWizard.aiModal.defaultFeature') })}
        </p>

        <div className="space-y-3">
          <Link
            to="/login"
            className="block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            {t('publicWizard.aiModal.signIn')}
          </Link>

          <button
            onClick={onClose}
            className="block w-full py-3 px-6 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            {t('publicWizard.aiModal.continueWithout')}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          {t('publicWizard.aiModal.reassurance')}
        </p>
      </div>
    </div>
  );
}
