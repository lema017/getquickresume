import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Sparkles, AlertTriangle, Info, Loader2, CheckCircle, Wand2 } from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';

interface AddKeywordModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyword: string;
  importance: 'critical' | 'important' | 'nice_to_have';
  onSubmit: (keyword: string, context: string) => Promise<void>;
  isLoading: boolean;
}

export function AddKeywordModal({
  isOpen,
  onClose,
  keyword,
  importance,
  onSubmit,
  isLoading,
}: AddKeywordModalProps) {
  const { t } = useTranslation();
  const { enhanceClaimText, isEnhancingClaim } = useJobTailoringStore();
  const [context, setContext] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);

  if (!isOpen) return null;

  // Handle AI enhancement of the context text
  const handleEnhance = async () => {
    if (!context.trim() || context.trim().length < 10) {
      setError(t('jobTailoring.addKeyword.errorTooShort', 'Please provide more detail (at least 10 characters) before enhancing.'));
      return;
    }

    setError(null);
    try {
      const enhanced = await enhanceClaimText(keyword, context.trim());
      setContext(enhanced);
      setIsEnhanced(true);
    } catch (err: any) {
      setError(err.message || t('jobTailoring.addKeyword.errorEnhance', 'Failed to enhance text. Please try again.'));
    }
  };

  const handleSubmit = async () => {
    if (!context.trim()) {
      setError(t('jobTailoring.addKeyword.errorEmpty', 'Please provide some context about your experience with this skill.'));
      return;
    }

    if (context.trim().length < 10) {
      setError(t('jobTailoring.addKeyword.errorTooShort', 'Please provide more detail (at least 10 characters).'));
      return;
    }

    setError(null);
    try {
      await onSubmit(keyword, context.trim());
      setContext('');
      onClose();
    } catch (err: any) {
      setError(err.message || t('jobTailoring.addKeyword.errorGeneric', 'Failed to add keyword. Please try again.'));
    }
  };

  const getImportanceConfig = () => {
    switch (importance) {
      case 'critical':
        return {
          icon: AlertTriangle,
          label: t('jobTailoring.keywordAnalysis.critical', 'Critical'),
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          iconColor: 'text-red-500',
        };
      case 'important':
        return {
          icon: Info,
          label: t('jobTailoring.keywordAnalysis.important', 'Important'),
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          iconColor: 'text-orange-500',
        };
      default:
        return {
          icon: Info,
          label: t('jobTailoring.keywordAnalysis.niceToHave', 'Nice to Have'),
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-500',
        };
    }
  };

  const importanceConfig = getImportanceConfig();
  const ImportanceIcon = importanceConfig.icon;

  // Suggested prompts based on keyword type
  const suggestedPrompts = [
    t('jobTailoring.addKeyword.prompt1', 'I have 2-3 years of experience with {{keyword}}', { keyword }),
    t('jobTailoring.addKeyword.prompt2', 'Used {{keyword}} in projects involving...', { keyword }),
    t('jobTailoring.addKeyword.prompt3', 'Certified in {{keyword}} / completed training on {{keyword}}', { keyword }),
  ];

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('jobTailoring.addKeyword.title', 'Add Missing Keyword')}
              </h2>
              <p className="text-sm text-gray-500">
                {t('jobTailoring.addKeyword.subtitle', 'Tell us about your experience')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 disabled:opacity-50"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Keyword Display */}
          <div className={`${importanceConfig.bgColor} rounded-xl p-4 border ${importanceConfig.borderColor}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-gray-900">{keyword}</span>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${importanceConfig.bgColor} ${importanceConfig.textColor} text-xs font-medium`}>
                <ImportanceIcon className={`w-3.5 h-3.5 ${importanceConfig.iconColor}`} />
                {importanceConfig.label}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {importance === 'critical'
                ? t('jobTailoring.addKeyword.criticalDesc', 'This keyword is critical for the job. Adding it will significantly improve your match score.')
                : t('jobTailoring.addKeyword.importantDesc', 'This keyword is important for the job. Adding it will help improve your chances.')}
            </p>
          </div>

          {/* Context Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('jobTailoring.addKeyword.contextLabel', 'Describe your experience with {{keyword}}', { keyword })}
            </label>
            <textarea
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
                setIsEnhanced(false);
                if (error) setError(null);
              }}
              placeholder={t('jobTailoring.addKeyword.placeholder', 'e.g., "3 years experience using {{keyword}} for backend development and API integrations"', { keyword })}
              className={`w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                error ? 'border-red-300 bg-red-50' : isEnhanced ? 'border-green-300 bg-green-50' : 'border-gray-200'
              }`}
              rows={4}
              disabled={isLoading || isEnhancingClaim}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            )}
            {isEnhanced && (
              <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {t('jobTailoring.addKeyword.enhanced', 'Text enhanced by AI')}
              </p>
            )}
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {t('jobTailoring.addKeyword.hint', 'The AI will incorporate this into your Skills, Summary, and/or Experience sections.')}
              </p>
              {/* AI Enhance Button */}
              <button
                type="button"
                onClick={handleEnhance}
                disabled={isLoading || isEnhancingClaim || !context.trim() || context.trim().length < 10}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isEnhancingClaim
                    ? 'bg-purple-100 text-purple-400 cursor-wait'
                    : context.trim().length >= 10
                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isEnhancingClaim ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {t('jobTailoring.addKeyword.enhancing', 'Enhancing...')}
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    {t('jobTailoring.addKeyword.enhanceWithAI', 'Enhance with AI')}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Suggested Prompts */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              {t('jobTailoring.addKeyword.suggestions', 'Quick suggestions')}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setContext(prompt)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Premium indicator */}
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-amber-700">
              {t('jobTailoring.addKeyword.premiumFeature', 'Premium feature: AI will intelligently add this keyword to relevant resume sections')}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading || isEnhancingClaim}
            className="flex-1 px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || isEnhancingClaim || !context.trim()}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('jobTailoring.addKeyword.adding', 'Adding...')}
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                {t('jobTailoring.addKeyword.addToResume', 'Add to Resume')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddKeywordModal;
