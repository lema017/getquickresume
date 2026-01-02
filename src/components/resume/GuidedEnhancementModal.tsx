import { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, Sparkles, ArrowRight, Zap, Edit3 } from 'lucide-react';
import { QuestionAccordion, Question } from './QuestionAccordion';
import { EnhancementReviewModal } from './EnhancementReviewModal';
import { enhancementService } from '@/services/enhancementService';
import { useAuthStore } from '@/stores/authStore';
import { useResumeStore } from '@/stores/resumeStore';
import { 
  getEnhancementType, 
  isMechanicalFix, 
  isStructuralFix,
  type EnhancementType 
} from '@/config/enhancementTypes';

interface GuidedEnhancementModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  recommendation: string;
  originalText: string;
  onEnhancementComplete: (enhancedText: string) => void;
  checklistItemId?: string;  // Optional: when targeting a specific checklist item
}

type Step = 
  | 'determining-flow'      // Checking if mechanical, context-dependent, or structural
  | 'direct-enhancing'      // Direct AI enhancement (mechanical fixes)
  | 'generating-questions'  // Generating context questions (context-dependent)
  | 'answering-questions'   // User answering questions
  | 'enhancing'            // Enhancing with context
  | 'review'               // Reviewing enhanced text
  | 'structural-notice';   // Show notice for structural fixes

export function GuidedEnhancementModal({
  isOpen,
  onClose,
  sectionType,
  recommendation,
  originalText,
  onEnhancementComplete,
  checklistItemId,
}: GuidedEnhancementModalProps) {
  const { user } = useAuthStore();
  const { resumeData } = useResumeStore();
  const [step, setStep] = useState<Step>('determining-flow');
  const [enhancementType, setEnhancementType] = useState<EnhancementType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [enhancedText, setEnhancedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Reset state and determine flow when modal opens
  useEffect(() => {
    if (isOpen) {
      resetState();
      determineFlow();
    }
  }, [isOpen, checklistItemId]);

  const resetState = () => {
    setStep('determining-flow');
    setEnhancementType(null);
    setQuestions([]);
    setAnswers({});
    setEnhancedText(null);
    setError(null);
    setIsReviewOpen(false);
  };

  const determineFlow = async () => {
    // Determine the enhancement type based on checklist item ID
    const type = checklistItemId ? getEnhancementType(checklistItemId) : 'context-dependent';
    setEnhancementType(type);

    if (type === 'structural') {
      // Structural fixes require manual editing
      setStep('structural-notice');
    } else if (type === 'mechanical') {
      // Mechanical fixes go directly to AI enhancement
      await performDirectEnhancement();
    } else {
      // Context-dependent fixes need questions
      await generateQuestions();
    }
  };

  const performDirectEnhancement = async () => {
    try {
      setError(null);
      setStep('direct-enhancing');

      if (!checklistItemId) {
        throw new Error('Checklist item ID is required for direct enhancement');
      }

      const enhanced = await enhancementService.directEnhance({
        checklistItemId,
        sectionType,
        originalText,
        language: resumeData.language,
      });

      setEnhancedText(enhanced);
      setStep('review');
      setIsReviewOpen(true);
    } catch (err: any) {
      console.error('Error in direct enhancement:', err);
      // If direct enhancement fails, fall back to context-dependent flow
      if (err.message?.includes('requires additional context')) {
        setEnhancementType('context-dependent');
        await generateQuestions();
      } else {
        setError(err.message || 'Failed to enhance section. Please try again.');
        setStep('determining-flow');
      }
    }
  };

  const generateQuestions = async () => {
    try {
      setError(null);
      setStep('generating-questions');
      
      const generatedQuestions = await enhancementService.generateQuestions({
        sectionType,
        recommendation,
        originalText,
        language: resumeData.language,
      });
      setQuestions(generatedQuestions);
      setStep('answering-questions');
    } catch (err: any) {
      console.error('Error generating questions:', err);
      setError(err.message || 'Failed to generate questions. Please try again.');
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const canProceedToEnhancement = (): boolean => {
    // Check if all required questions are answered
    const requiredQuestions = questions.filter((q) => q.required);
    return requiredQuestions.every((q) => {
      const answer = answers[q.id];
      return answer && answer.trim().length > 0;
    });
  };

  const handleEnhance = async () => {
    if (!canProceedToEnhancement()) {
      setError('Please answer all required questions before proceeding.');
      return;
    }

    try {
      setError(null);
      setStep('enhancing');

      // Build gathered context from answers
      const gatheredContext = Object.entries(answers)
        .filter(([_, answer]) => answer && answer.trim().length > 0)
        .map(([questionId, answer]) => ({
          questionId,
          answer: answer.trim(),
        }));

      // Enhance with context
      const enhanced = await enhancementService.enhanceSectionWithContext({
        sectionType,
        originalText,
        userInstructions: recommendation,
        language: resumeData.language,
        gatheredContext,
      });

      setEnhancedText(enhanced);
      setStep('review');
      setIsReviewOpen(true);
    } catch (err: any) {
      console.error('Error enhancing section:', err);
      setError(err.message || 'Failed to enhance section. Please try again.');
      setStep('answering-questions');
    }
  };

  const handleApprove = (finalText: string) => {
    onEnhancementComplete(finalText);
    handleClose();
  };

  const handleReject = () => {
    setIsReviewOpen(false);
    // For mechanical fixes, offer to try again
    if (enhancementType === 'mechanical') {
      setStep('determining-flow');
    } else {
      setStep('answering-questions');
    }
    setEnhancedText(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  const getSectionLabel = (type: string): string => {
    const labels: Record<string, string> = {
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      certification: 'Certifications',
      project: 'Projects',
      achievement: 'Achievements',
      language: 'Languages',
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStepMessage = (): string => {
    switch (step) {
      case 'determining-flow':
        return 'Analyzing fix type...';
      case 'direct-enhancing':
        return 'Applying automatic fix...';
      case 'generating-questions':
        return 'Generating contextual questions...';
      case 'answering-questions':
        return 'Answer questions to provide context';
      case 'enhancing':
        return 'Enhancing section with your context...';
      case 'review':
        return 'Review enhanced text';
      case 'structural-notice':
        return 'Manual editing required';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {enhancementType === 'mechanical' ? (
                <Zap className="h-6 w-6 text-amber-500" />
              ) : (
                <Sparkles className="h-6 w-6 text-blue-600" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {enhancementType === 'mechanical' ? 'Quick Fix' : 'Enhance'} {getSectionLabel(sectionType)}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{getStepMessage()}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Error Display */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  {(step === 'generating-questions' || step === 'determining-flow') && (
                    <button
                      onClick={determineFlow}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Determining Flow / Direct Enhancing */}
            {(step === 'determining-flow' || step === 'direct-enhancing') && !error && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">
                  {step === 'direct-enhancing' 
                    ? 'Applying automatic fix...' 
                    : 'Analyzing fix type...'}
                </p>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                {step === 'direct-enhancing' && (
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                    <p className="text-sm text-amber-800 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Quick fix: No questions needed
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Structural Notice */}
            {step === 'structural-notice' && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md text-center">
                  <Edit3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Manual Editing Required
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This improvement requires adding or modifying structured data that can't be automatically generated. 
                    Please use the resume editor to make these changes.
                  </p>
                  <div className="bg-white border border-blue-100 rounded-md p-3 mb-4">
                    <p className="text-sm font-medium text-blue-900">{recommendation}</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Got it, I'll edit manually
                  </button>
                </div>
              </div>
            )}

            {/* Generating Questions */}
            {step === 'generating-questions' && !error && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Analyzing recommendation and generating questions...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
              </div>
            )}

            {/* Answering Questions */}
            {step === 'answering-questions' && questions.length > 0 && (
              <div className="space-y-6">
                <div className={`border rounded-lg p-4 ${checklistItemId ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                  <h3 className={`text-sm font-semibold mb-2 ${checklistItemId ? 'text-amber-900' : 'text-blue-900'}`}>
                    {checklistItemId ? '📋 Checklist Item to Fix' : 'Recommendation'}
                  </h3>
                  <p className={`text-sm ${checklistItemId ? 'text-amber-800' : 'text-blue-800'}`}>{recommendation}</p>
                  {checklistItemId && (
                    <p className="text-xs text-amber-600 mt-2">
                      Completing this will update your checklist and improve your score
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Please answer the following questions to help us enhance this section:
                  </h3>
                  <QuestionAccordion
                    questions={questions}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    originalText={originalText}
                    recommendation={recommendation}
                    sectionType={sectionType}
                    language={resumeData.language}
                  />
                </div>
              </div>
            )}

            {/* Enhancing */}
            {step === 'enhancing' && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Enhancing section with your context...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {step === 'answering-questions' && (
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEnhance}
                disabled={!canProceedToEnhancement()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enhance Section
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {enhancedText && (
        <EnhancementReviewModal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          originalText={originalText}
          enhancedText={enhancedText}
          sectionType={sectionType}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </>
  );
}
