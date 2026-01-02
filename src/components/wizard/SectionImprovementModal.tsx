import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { sectionImprovementService } from '@/services/sectionImprovementService';
import { Loader2, AlertCircle, CheckCircle, RotateCcw, X, Sparkles } from 'lucide-react';
import { RateLimitWarning } from '@/components/RateLimitWarning';
import { PremiumActionModal } from '@/components/PremiumActionModal';

interface SectionImprovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  originalText: string;
  onApprove: (improvedText: string) => void;
  resumeId?: string; // Optional resume ID for AI usage tracking
}

export function SectionImprovementModal({
  isOpen,
  onClose,
  sectionType,
  originalText,
  onApprove,
  resumeId
}: SectionImprovementModalProps) {
  const { t } = useTranslation();
  const [instructions, setInstructions] = useState('');
  const [improvedText, setImprovedText] = useState<string | null>(null);
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Character limit
  const MAX_CHARS = 500;
  
  const handleImprove = useCallback(async () => {
    if (attempts >= 5) {
      setError(t('sectionImprovement.rateLimitExceeded'));
      return;
    }
    
    // Sanitize input (frontend first pass)
    const sanitized = sanitizeInput(instructions);
    
    if (!sanitized.trim()) {
      setError(t('sectionImprovement.emptyInstructions'));
      return;
    }
    
    setIsImproving(true);
    setError(null);
    
    try {
      const result = await sectionImprovementService.improveSection({
        sectionType,
        originalText,
        userInstructions: sanitized,
        language: 'es', // TODO: Get from user preferences
        resumeId
      });
      
      setImprovedText(result.data || '');
      setAttempts(prev => prev + 1);
    } catch (err: any) {
      if (err.code === 'PREMIUM_REQUIRED') {
        setShowPremiumModal(true);
      } else if (err.message.includes('rate limit') || err.message.includes('429')) {
        setError(t('sectionImprovement.rateLimitMessage'));
        setIsRateLimited(true);
      } else {
        setError(err.message || t('sectionImprovement.error'));
      }
    } finally {
      setIsImproving(false);
    }
  }, [instructions, sectionType, originalText, attempts, t]);
  
  const handleTryAgain = useCallback(() => {
    setImprovedText(null);
    setError(null);
    setIsRateLimited(false);
  }, []);
  
  const handleApprove = useCallback(() => {
    if (improvedText) {
      onApprove(improvedText);
      onClose();
    }
  }, [improvedText, onApprove, onClose]);
  
  const handleClose = useCallback(() => {
    setInstructions('');
    setImprovedText(null);
    setError(null);
    setAttempts(0);
    setIsRateLimited(false);
    onClose();
  }, [onClose]);
  
  // Sanitize input function
  const sanitizeInput = (input: string): string => {
    // Remove HTML tags
    let sanitized = input.replace(/<[^>]*>/g, '');
    // Remove dangerous patterns
    sanitized = sanitized.replace(/[<>]/g, '');
    // Limit length
    return sanitized.slice(0, MAX_CHARS);
  };
  
  const getSectionTitle = (type: string) => {
    const sectionTitles: Record<string, string> = {
      summary: 'Resumen Profesional',
      experience: 'Experiencia Laboral',
      education: 'Educación',
      certification: 'Certificaciones',
      project: 'Proyectos',
      achievement: 'Logros',
      language: 'Idiomas'
    };
    return sectionTitles[type] || type;
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t('sectionImprovement.title')}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <p className="text-sm text-gray-600">
            {t('sectionImprovement.description', { section: getSectionTitle(sectionType) })}
          </p>

          {/* Texto Original */}
          <div>
            <h4 className="font-medium mb-2 text-sm text-gray-700">
              {t('sectionImprovement.currentText')}:
            </h4>
            <div className="p-4 bg-gray-50 rounded border max-h-40 overflow-y-auto">
              <p className="text-sm whitespace-pre-wrap text-gray-800">{originalText}</p>
            </div>
          </div>
          
          {/* Instrucciones del Usuario */}
          <div>
            <label className="font-medium mb-2 block text-sm text-gray-700">
              {t('sectionImprovement.instructionsLabel')} ({instructions.length}/{MAX_CHARS})
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value.slice(0, MAX_CHARS))}
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder={t('sectionImprovement.placeholder')}
              disabled={isImproving || isRateLimited}
            />
            {instructions.length >= MAX_CHARS && (
              <p className="text-xs text-red-600 mt-1">
                {t('sectionImprovement.characterLimit')}
              </p>
            )}
            {attempts > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {t('sectionImprovement.attempts', { count: attempts, max: 5 })}
              </p>
            )}
          </div>
          
          {/* Rate Limit Error */}
          {isRateLimited && error && (
            <RateLimitWarning 
              message={error} 
              onRetry={handleTryAgain}
            />
          )}

          {/* Generic Error */}
          {error && !isRateLimited && (
            <div className="bg-red-50 border border-red-200 rounded p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          
          {/* Texto Mejorado */}
          {improvedText && (
            <div>
              <h4 className="font-medium mb-2 text-sm text-gray-700 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                {t('sectionImprovement.improvedText')}:
              </h4>
              <div className="p-4 bg-blue-50 rounded border max-h-40 overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap text-gray-800">{improvedText}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          {!improvedText ? (
            <>
              <button
                onClick={handleClose}
                disabled={isImproving}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleImprove} 
                disabled={isImproving || !instructions.trim() || isRateLimited}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isImproving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('sectionImprovement.improving')}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {t('sectionImprovement.improveButton')}
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleTryAgain}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <RotateCcw className="h-4 w-4" />
                {t('sectionImprovement.tryAgain')}
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t('sectionImprovement.discard')}
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <CheckCircle className="h-4 w-4" />
                {t('sectionImprovement.applyChanges')}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Premium Action Modal for AI features */}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </div>
  );
}