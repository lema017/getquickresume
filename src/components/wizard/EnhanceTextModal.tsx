import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check, XCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { experienceAchievementService } from '@/services/experienceAchievementService';
import { RateLimitWarning } from '@/components/RateLimitWarning';

interface EnhanceTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  jobTitle?: string;
  language?: 'es' | 'en';
  onApprove: (enhancedText: string) => void;
  resumeId?: string; // Optional resume ID for AI cost tracking
}

export function EnhanceTextModal({
  isOpen,
  onClose,
  originalText,
  jobTitle,
  language = 'es',
  onApprove,
  resumeId
}: EnhanceTextModalProps) {
  const { t } = useTranslation();
  const [enhancedText, setEnhancedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleEnhance = async () => {
    if (!originalText.trim()) return;

    setIsLoading(true);
    setError(null);
    setIsRateLimited(false);
    
    try {
      const result = await experienceAchievementService.enhanceAchievement(
        originalText,
        jobTitle,
        language,
        resumeId
      );
      setEnhancedText(result);
    } catch (err: any) {
      console.error('Error enhancing text:', err);
      // Check if it's a rate limit error
      if (err?.code === 'RATE_LIMIT_EXCEEDED' || err?.status === 429) {
        setIsRateLimited(true);
        setError(err.message);
      } else {
        const errorMessage = err instanceof Error ? err.message : t('enhanceText.error');
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = () => {
    onApprove(enhancedText);
    onClose();
  };

  const handleClose = () => {
    setEnhancedText('');
    setError(null);
    setIsRateLimited(false);
    onClose();
  };

  const handleRetry = () => {
    setIsRateLimited(false);
    setError(null);
    handleEnhance();
  };

  // Auto-enhance when modal opens
  useEffect(() => {
    if (isOpen && originalText && !enhancedText && !isLoading) {
      handleEnhance();
    }
  }, [isOpen, originalText]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Mejorar con IA
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Job Title Info */}
          {jobTitle && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Puesto:</span> {jobTitle}
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Mejorando texto con IA...</span>
            </div>
          )}

          {/* Rate Limit Error State */}
          {isRateLimited && error && (
            <RateLimitWarning 
              message={error} 
              onRetry={handleRetry}
            />
          )}

          {/* Generic Error State */}
          {error && !isRateLimited && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
              <button
                onClick={handleEnhance}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {/* Comparison */}
          {!isLoading && !error && enhancedText && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  Texto Original
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg border max-h-40 overflow-y-auto">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{originalText}</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Texto Mejorado con IA
                </h4>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 max-h-40 overflow-y-auto">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{enhancedText}</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>✨ Mejoras aplicadas:</strong> El texto ha sido optimizado con métricas específicas, 
                  verbos de acción más fuertes y un enfoque en resultados medibles.
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && !enhancedText && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se pudo mejorar el texto.</p>
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        {!isLoading && !error && enhancedText && (
          <div className="flex items-center justify-between p-6 border-t bg-gray-50 flex-shrink-0">
            <p className="text-sm text-gray-600">
              Revisa los cambios y decide si quieres aplicar la mejora
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Rechazar</span>
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Aprobar Mejora</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
