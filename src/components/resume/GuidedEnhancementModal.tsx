import { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { QuestionAccordion, Question } from './QuestionAccordion';
import { EnhancementReviewModal } from './EnhancementReviewModal';
import { enhancementService } from '@/services/enhancementService';
import { useAuthStore } from '@/stores/authStore';

interface GuidedEnhancementModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  recommendation: string;
  originalText: string;
  onEnhancementComplete: (enhancedText: string) => void;
}

type Step = 'generating-questions' | 'answering-questions' | 'enhancing' | 'review';

export function GuidedEnhancementModal({
  isOpen,
  onClose,
  sectionType,
  recommendation,
  originalText,
  onEnhancementComplete,
}: GuidedEnhancementModalProps) {
  const { user } = useAuthStore();
  const [step, setStep] = useState<Step>('generating-questions');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [enhancedText, setEnhancedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('generating-questions');
      setQuestions([]);
      setAnswers({});
      setEnhancedText(null);
      setError(null);
      setIsReviewOpen(false);
      generateQuestions();
    }
  }, [isOpen]);

  const generateQuestions = async () => {
    try {
      setError(null);
      const generatedQuestions = await enhancementService.generateQuestions({
        sectionType,
        recommendation,
        originalText,
        language: 'es', // TODO: Get from user preferences or resume data
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
        language: 'es', // TODO: Get from user preferences
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
    setStep('answering-questions');
    setEnhancedText(null);
  };

  const handleClose = () => {
    setStep('generating-questions');
    setQuestions([]);
    setAnswers({});
    setEnhancedText(null);
    setError(null);
    setIsReviewOpen(false);
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

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Enhance {getSectionLabel(sectionType)}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {step === 'generating-questions' && 'Generating contextual questions...'}
                  {step === 'answering-questions' && 'Answer questions to provide context'}
                  {step === 'enhancing' && 'Enhancing section with your context...'}
                  {step === 'review' && 'Review enhanced text'}
                </p>
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
                  {step === 'generating-questions' && (
                    <button
                      onClick={generateQuestions}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 1: Generating Questions */}
            {step === 'generating-questions' && !error && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Analyzing recommendation and generating questions...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
              </div>
            )}

            {/* Step 2: Answering Questions */}
            {step === 'answering-questions' && questions.length > 0 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    Recommendation
                  </h3>
                  <p className="text-sm text-blue-800">{recommendation}</p>
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
                    language="es"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Enhancing */}
            {step === 'enhancing' && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Enhancing section with your context...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
              </div>
            )}

            {/* Step 4: Review (handled by separate modal) */}
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

