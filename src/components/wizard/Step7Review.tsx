import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { ArrowLeft, Download, Eye, Globe, Crown, CheckCircle } from 'lucide-react';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { useTips } from '@/hooks/useTips';

export function Step7Review() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, calculateCharacters } = useResumeStore();
  const { user } = useAuthStore();
  const { areTipsClosed, closeTips, showTips } = useTips();  
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const charactersUsed = calculateCharacters();
  const isOverLimit = charactersUsed > 3500;
  const canDownload = !isOverLimit || user?.isPremium;

  const handleDownload = () => {
    if (canDownload) {
      // Mock download
      alert(t('review.downloadSuccess'));
    } else {
      alert(t('review.premiumRequired'));
    }
  };


  const handleUpgrade = () => {
    navigate('/premium');
  };

  const handleTranslate = () => {
    setShowTranslationModal(true);
  };

  const languages = [
    { code: 'en', name: t('translation.languages.en'), flag: '🇬🇧' },
    { code: 'es', name: t('translation.languages.es'), flag: '🇪🇸' },
    { code: 'ar', name: t('translation.languages.ar'), flag: '🇸🇦' },
    { code: 'zh', name: t('translation.languages.zh'), flag: '🇨🇳' },
    { code: 'hi', name: t('translation.languages.hi'), flag: '🇮🇳' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.review.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.review.description')}
        </p>
      </div>

      {/* Floating Tips */}
      <FloatingTips
        title="💡 Tips para la Revisión Final"
        tips={[
          "Verifica que no haya errores tipográficos",
          "Asegúrate de que el formato sea uniforme en todo el CV",
          "Confirma que todos los datos estén al día",
          "Respeta el límite de 3,500 caracteres para usuarios gratuitos",
          "Verifica que toda la información sea pertinente para tu objetivo",
          "Asegúrate de que el CV sea fácil de leer y atractivo"
        ]}
      />

      {/* Completion Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-green-900">
              ¡CV Completado!
            </h3>
            <p className="text-green-700">
              Has completado todos los pasos del wizard
            </p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-green-800 text-sm">
            Tu currículum está listo para ser descargado y compartido
          </p>
        </div>
      </div>

      {/* Character Status */}
      <div className={`p-4 rounded-lg mb-8 ${isOverLimit ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className={`font-semibold ${isOverLimit ? 'text-red-900' : 'text-green-900'}`}>
              {isOverLimit ? 'Límite de caracteres excedido' : 'Dentro del límite de caracteres'}
            </h3>
            <p className={`text-sm ${isOverLimit ? 'text-red-700' : 'text-green-700'}`}>
              {charactersUsed.toLocaleString()}/3,500 caracteres utilizados
            </p>
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                isOverLimit ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((charactersUsed / 3500) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>


      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownload}
            disabled={!canDownload}
            className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-colors ${
              canDownload
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Download className="w-5 h-5 mr-2" />
            {t('wizard.steps.review.actions.download')}
          </button>

        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleUpgrade}
            className="flex-1 btn-secondary flex items-center justify-center"
          >
            <Crown className="w-5 h-5 mr-2" />
            {t('wizard.steps.review.actions.upgrade')}
          </button>

          <button
            onClick={handleTranslate}
            className="flex-1 btn-outline flex items-center justify-center"
          >
            <Globe className="w-5 h-5 mr-2" />
            {t('wizard.steps.review.actions.translate')}
          </button>
        </div>
      </div>

      {/* Translation Modal */}
      {showTranslationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('translation.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('translation.subtitle')}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('translation.selectLanguage')}
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="input-field"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Tokens requeridos:</strong> 50
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tu saldo:</strong> {user?.tokens || 0} tokens
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTranslationModal(false)}
                className="btn-outline"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => {
                  // Mock translation
                  alert(t('review.translationSuccess'));
                  setShowTranslationModal(false);
                }}
                className="btn-primary"
              >
                {t('translation.translate')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/wizard/manual/step-6')}
          className="btn-outline flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        
        <button
          onClick={() => navigate('/account')}
          className="btn-primary"
        >
          {t('review.goToAccount')}
        </button>
      </div>
    </div>
  );
}
