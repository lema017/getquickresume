import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sectionImprovementService } from '@/services/sectionImprovementService';
import { useAuthStore } from '@/stores/authStore';
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  RotateCcw, 
  X, 
  Sparkles,
  Wand2,
  MessageSquare,
  Edit3,
  Crown
} from 'lucide-react';
import { RateLimitWarning } from '@/components/RateLimitWarning';
import { PremiumActionModal } from '@/components/PremiumActionModal';

type TabType = 'auto' | 'askAI' | 'manual';
type SectionType = 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';

interface SectionEnhancementModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: SectionType;
  originalText: string;
  onApprove: (improvedText: string) => void;
  resumeId?: string;
  language?: 'en' | 'es';
}

export function SectionEnhancementModal({
  isOpen,
  onClose,
  sectionType,
  originalText,
  onApprove,
  resumeId,
  language = 'en'
}: SectionEnhancementModalProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const isPremium = user?.isPremium || false;
  
  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('auto');
  
  // Enhancement state
  const [enhancedText, setEnhancedText] = useState<string | null>(null);
  const [manualEditText, setManualEditText] = useState(originalText);
  const [instructions, setInstructions] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Character limit for custom instructions
  const MAX_INSTRUCTION_CHARS = 500;
  
  // Reset state when modal opens or originalText changes
  useEffect(() => {
    if (isOpen) {
      setEnhancedText(null);
      setManualEditText(originalText);
      setInstructions('');
      setError(null);
      setIsRateLimited(false);
      setActiveTab('auto');
    }
  }, [isOpen, originalText]);
  
  // Handle auto-enhance
  const handleAutoEnhance = useCallback(async () => {
    setIsEnhancing(true);
    setError(null);
    
    try {
      const result = await sectionImprovementService.improveSection({
        sectionType,
        originalText,
        userInstructions: '', // Empty for auto-enhance
        language,
        resumeId,
        autoEnhance: true
      });
      
      setEnhancedText(result.data || '');
    } catch (err: any) {
      if (err.code === 'PREMIUM_REQUIRED') {
        setShowPremiumModal(true);
      } else if (err.message.includes('rate limit') || err.message.includes('429')) {
        setError(t('sectionEnhancement.rateLimitMessage', { defaultValue: 'Rate limit exceeded. Please wait before trying again.' }));
        setIsRateLimited(true);
      } else {
        setError(err.message || t('sectionEnhancement.error', { defaultValue: 'Error enhancing section' }));
      }
    } finally {
      setIsEnhancing(false);
    }
  }, [sectionType, originalText, resumeId, language, t]);
  
  // Handle AI enhancement with custom prompt
  const handleAskAIEnhance = useCallback(async () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    
    const sanitized = sanitizeInput(instructions);
    if (!sanitized.trim()) {
      setError(t('sectionEnhancement.emptyInstructions', { defaultValue: 'Please provide instructions for the AI.' }));
      return;
    }
    
    setIsEnhancing(true);
    setError(null);
    
    try {
      const result = await sectionImprovementService.improveSection({
        sectionType,
        originalText,
        userInstructions: sanitized,
        language,
        resumeId,
        autoEnhance: false
      });
      
      setEnhancedText(result.data || '');
    } catch (err: any) {
      if (err.code === 'PREMIUM_REQUIRED') {
        setShowPremiumModal(true);
      } else if (err.message.includes('rate limit') || err.message.includes('429')) {
        setError(t('sectionEnhancement.rateLimitMessage', { defaultValue: 'Rate limit exceeded. Please wait before trying again.' }));
        setIsRateLimited(true);
      } else {
        setError(err.message || t('sectionEnhancement.error', { defaultValue: 'Error enhancing section' }));
      }
    } finally {
      setIsEnhancing(false);
    }
  }, [isPremium, instructions, sectionType, originalText, resumeId, language, t]);
  
  // Sanitize input function
  const sanitizeInput = (input: string): string => {
    let sanitized = input.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/[<>]/g, '');
    return sanitized.slice(0, MAX_INSTRUCTION_CHARS);
  };
  
  // Handle approval
  const handleApprove = useCallback(() => {
    if (activeTab === 'manual') {
      if (manualEditText.trim() && manualEditText !== originalText) {
        onApprove(manualEditText);
        onClose();
      }
    } else if (enhancedText) {
      onApprove(enhancedText);
      onClose();
    }
  }, [activeTab, manualEditText, enhancedText, originalText, onApprove, onClose]);
  
  // Handle try again
  const handleTryAgain = useCallback(() => {
    setEnhancedText(null);
    setError(null);
    setIsRateLimited(false);
  }, []);
  
  // Handle close
  const handleClose = useCallback(() => {
    setEnhancedText(null);
    setManualEditText(originalText);
    setInstructions('');
    setError(null);
    setIsRateLimited(false);
    onClose();
  }, [originalText, onClose]);
  
  // Get section title for display
  const getSectionTitle = (type: string) => {
    const titles: Record<string, string> = {
      summary: t('sectionEnhancement.sections.summary', { defaultValue: 'Professional Summary' }),
      experience: t('sectionEnhancement.sections.experience', { defaultValue: 'Work Experience' }),
      education: t('sectionEnhancement.sections.education', { defaultValue: 'Education' }),
      certification: t('sectionEnhancement.sections.certification', { defaultValue: 'Certifications' }),
      project: t('sectionEnhancement.sections.project', { defaultValue: 'Projects' }),
      achievement: t('sectionEnhancement.sections.achievement', { defaultValue: 'Achievements' }),
      language: t('sectionEnhancement.sections.language', { defaultValue: 'Languages' })
    };
    return titles[type] || type;
  };
  
  // Check if can approve
  const canApprove = activeTab === 'manual' 
    ? manualEditText.trim() && manualEditText !== originalText 
    : !!enhancedText;
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t('sectionEnhancement.title', { defaultValue: 'Enhance with AI' })}
            </h2>
            <span className="text-sm text-gray-500">
              - {getSectionTitle(sectionType)}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => { setActiveTab('auto'); setEnhancedText(null); setError(null); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'auto'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Wand2 className="h-4 w-4" />
            {t('sectionEnhancement.tabs.autoEnhance', { defaultValue: 'Auto Enhance' })}
          </button>
          <button
            onClick={() => { 
              if (!isPremium) {
                setShowPremiumModal(true);
                return;
              }
              setActiveTab('askAI'); 
              setEnhancedText(null); 
              setError(null); 
            }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'askAI'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            {t('sectionEnhancement.tabs.askAI', { defaultValue: 'Ask AI Help' })}
            {!isPremium && (
              <Crown className="h-3 w-3 text-amber-500" />
            )}
          </button>
          <button
            onClick={() => { setActiveTab('manual'); setEnhancedText(null); setError(null); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'manual'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Edit3 className="h-4 w-4" />
            {t('sectionEnhancement.tabs.manualEdit', { defaultValue: 'Manual Edit' })}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tab Descriptions */}
          <p className="text-sm text-gray-600 mb-4">
            {activeTab === 'auto' && t('sectionEnhancement.descriptions.auto', { 
              defaultValue: 'Automatically enhance this section with AI to improve clarity, impact, and professionalism.' 
            })}
            {activeTab === 'askAI' && t('sectionEnhancement.descriptions.askAI', { 
              defaultValue: 'Provide specific instructions to guide how AI should improve this section.' 
            })}
            {activeTab === 'manual' && t('sectionEnhancement.descriptions.manual', { 
              defaultValue: 'Directly edit the text yourself.' 
            })}
          </p>

          {/* Instructions input for Ask AI tab - placed BEFORE comparison for better UX */}
          {activeTab === 'askAI' && (
            <div className="mb-6">
              <label className="font-medium mb-2 block text-sm text-gray-700">
                {t('sectionEnhancement.instructionsLabel', { defaultValue: 'Your Instructions' })} ({instructions.length}/{MAX_INSTRUCTION_CHARS})
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value.slice(0, MAX_INSTRUCTION_CHARS))}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder={t('sectionEnhancement.instructionsPlaceholder', { 
                  defaultValue: 'E.g., "Make it more concise", "Add quantifiable achievements", "Use stronger action verbs"' 
                })}
                disabled={isEnhancing || isRateLimited}
              />
              {/* Enhance button directly below instructions */}
              {!enhancedText && !isEnhancing && (
                <button
                  onClick={handleAskAIEnhance}
                  disabled={isEnhancing || isRateLimited || !instructions.trim()}
                  className="mt-3 flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  {t('sectionEnhancement.enhanceWithInstructions', { defaultValue: 'Enhance with Instructions' })}
                </button>
              )}
            </div>
          )}

          {/* Two-column layout for comparison */}
          <div className={`grid ${activeTab === 'manual' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-6`}>
            {/* Original Text Column */}
            {activeTab !== 'manual' && (
              <div>
                <h4 className="font-medium mb-2 text-sm text-gray-700">
                  {t('sectionEnhancement.originalText', { defaultValue: 'Original Text' })}:
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 h-48 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap text-gray-800">{originalText}</p>
                </div>
              </div>
            )}

            {/* Enhanced/Edited Text Column */}
            <div>
              {activeTab === 'manual' ? (
                <>
                  <h4 className="font-medium mb-2 text-sm text-gray-700">
                    {t('sectionEnhancement.editText', { defaultValue: 'Edit Text' })}:
                  </h4>
                  <textarea
                    value={manualEditText}
                    onChange={(e) => setManualEditText(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-64"
                    placeholder={t('sectionEnhancement.manualPlaceholder', { defaultValue: 'Edit your text here...' })}
                  />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
                      {enhancedText && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {t('sectionEnhancement.enhancedText', { defaultValue: 'Enhanced Text' })}:
                    </h4>
                    {/* Show Enhance button only for auto tab - askAI tab has button with instructions above */}
                    {activeTab === 'auto' && !enhancedText && !isEnhancing && (
                      <button
                        onClick={handleAutoEnhance}
                        disabled={isEnhancing || isRateLimited}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Sparkles className="h-4 w-4" />
                        {t('sectionEnhancement.enhanceButton', { defaultValue: 'Enhance' })}
                      </button>
                    )}
                  </div>
                  <div className={`rounded-lg border h-48 overflow-hidden ${
                    enhancedText 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    {isEnhancing ? (
                      <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <p className="text-sm text-gray-600">
                          {t('sectionEnhancement.enhancing', { defaultValue: 'Enhancing with AI...' })}
                        </p>
                      </div>
                    ) : enhancedText ? (
                      <textarea
                        value={enhancedText}
                        onChange={(e) => setEnhancedText(e.target.value)}
                        className="w-full h-full p-4 text-sm text-gray-800 bg-transparent border-none resize-none focus:outline-none focus:ring-0"
                      />
                    ) : (
                      <p className="text-sm text-gray-400 italic p-4">
                        {t('sectionEnhancement.enhancedPlaceholder', { defaultValue: 'Enhanced text will appear here after you click "Enhance"' })}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Rate Limit Warning */}
          {isRateLimited && error && (
            <div className="mt-4">
              <RateLimitWarning 
                message={error} 
                onRetry={handleTryAgain}
              />
            </div>
          )}

          {/* Generic Error */}
          {error && !isRateLimited && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-500">
            {activeTab !== 'manual' && (
              t('sectionEnhancement.aiNote', { defaultValue: 'AI enhancements are suggestions. Review before applying.' })
            )}
          </div>
          <div className="flex items-center gap-3">
            {enhancedText && activeTab !== 'manual' && (
              <button
                onClick={handleTryAgain}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <RotateCcw className="h-4 w-4" />
                {t('sectionEnhancement.tryAgain', { defaultValue: 'Try Again' })}
              </button>
            )}
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t('common.cancel', { defaultValue: 'Cancel' })}
            </button>
            <button
              onClick={handleApprove}
              disabled={!canApprove}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="h-4 w-4" />
              {t('sectionEnhancement.applyChanges', { defaultValue: 'Apply Changes' })}
            </button>
          </div>
        </div>
      </div>

      {/* Premium Action Modal */}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </div>
  );
}
