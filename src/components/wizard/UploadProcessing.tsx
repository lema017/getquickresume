import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUploadResumeStore } from '@/stores/uploadResumeStore';
import { useAuthStore } from '@/stores/authStore';
import { resumeExtractionService } from '@/services/resumeExtractionService';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { 
  Loader2,
  Sparkles,
  FileText,
  Home
} from 'lucide-react';
import toast from 'react-hot-toast';

export function UploadProcessing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const hasStartedProcessing = useRef(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const { 
    extractedText,
    targetLanguage,
    setExtractedData,
    setCurrentStep
  } = useUploadResumeStore();

  // Check if user can create a resume (free users need available quota)
  const canCreateResume = user?.isPremium || !user?.freeResumeUsed;

  useEffect(() => {
    // If no extracted text, redirect back to upload
    if (!extractedText) {
      navigate('/wizard/upload');
      return;
    }

    // Prevent double processing
    if (hasStartedProcessing.current) {
      return;
    }

    const processResume = async () => {
      hasStartedProcessing.current = true;

      // Check if user can create resume before processing
      if (!canCreateResume) {
        toast.error(t('wizard.uploadPage.quotaExceeded.message'));
        navigate('/wizard/upload');
        return;
      }

      try {
        // Extract structured data from text via API using the selected target language
        const response = await resumeExtractionService.extractResumeDataFromText(
          extractedText,
          targetLanguage
        );

        if (!response.success || !response.data) {
          toast.error(response.error || t('wizard.uploadPage.toasts.processError'));
          navigate('/wizard/upload');
          return;
        }

        // Store extracted data in the upload store
        setExtractedData(response.data);
        setCurrentStep('review');

        // Navigate to the review page
        navigate('/wizard/upload/review');
        
      } catch (err: any) {
        console.error('AI extraction error:', err);
        // Check for premium required error (from API protection)
        if (err?.code === 'PREMIUM_REQUIRED') {
          setShowPremiumModal(true);
          return;
        }
        toast.error(t('wizard.uploadPage.toasts.processError'));
        navigate('/wizard/upload');
      }
    };

    processResume();
  }, [extractedText, targetLanguage, canCreateResume, navigate, setExtractedData, setCurrentStep, t]);

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

        {/* Processing Animation */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative mb-8">
            {/* Animated background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full animate-ping opacity-25" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-200 rounded-full animate-pulse" />
            </div>
            
            {/* Main icon */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {t('wizard.uploadPage.processing.title')}
          </h2>
          
          <p className="text-gray-600 text-center max-w-md mb-6">
            {t('wizard.uploadPage.processing.subtitle', { 
              language: targetLanguage === 'es' ? t('translation.languages.es') : t('translation.languages.en')
            })}
          </p>

          {/* Progress steps */}
          <div className="space-y-3 w-full max-w-sm">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700">{t('wizard.uploadPage.processing.step1')}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Loader2 className="w-3 h-3 text-white animate-spin" />
              </div>
              <span className="text-gray-900 font-medium">{t('wizard.uploadPage.processing.step2')}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-gray-400" />
              </div>
              <span className="text-gray-400">{t('wizard.uploadPage.processing.step3')}</span>
            </div>
          </div>

          {/* Language indicator */}
          <div className="mt-8 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm text-blue-700">
              {t('wizard.uploadPage.processing.generatingIn')}: {' '}
              <span className="font-semibold">
                {targetLanguage === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Premium Modal for free users who have used their quota */}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => {
          setShowPremiumModal(false);
          navigate('/dashboard');
        }}
        feature="createResume"
      />
    </div>
  );
}

