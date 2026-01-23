import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle,
  SkipForward,
  Lightbulb,
  Wand2,
  RefreshCw,
  X,
  Check
} from 'lucide-react';
import { useJobTailoringStore } from '@/stores/jobTailoringStore';
import { ClarificationQuestion } from '@/types/jobTailoring';
import { EnhancementReviewModal } from '@/components/resume/EnhancementReviewModal';

interface ClarificationQuestionsProps {
  onNext: () => void;
  onBack: () => void;
}

export function ClarificationQuestions({ onNext, onBack }: ClarificationQuestionsProps) {
  const { t } = useTranslation();
  const {
    questions,
    answers,
    isGeneratingQuestions,
    isGeneratingTailored,
    setAnswer,
    enhanceAnswerWithAI,
    generateTailoredResume,
    questionOptions,
    selectedOptions,
    generatingOptionsFor,
    generateAnswerOptions,
    selectAnswerOption,
    clearAnswerOptions,
  } = useJobTailoringStore();

  const [enhancingId, setEnhancingId] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set(questions.filter(q => q.required).map(q => q.id))
  );

  // Enhancement review modal state
  const [enhancementModalOpen, setEnhancementModalOpen] = useState(false);
  const [enhancementOriginalText, setEnhancementOriginalText] = useState('');
  const [enhancementEnhancedText, setEnhancementEnhancedText] = useState('');
  const [enhancementQuestionId, setEnhancementQuestionId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const getAnswerForQuestion = (questionId: string): string => {
    return answers.find(a => a.questionId === questionId)?.answer || '';
  };

  const handleEnhance = async (question: ClarificationQuestion) => {
    const currentAnswer = getAnswerForQuestion(question.id);

    // If no answer, use a prompt based on the question context
    const textToEnhance = currentAnswer.trim()
      ? currentAnswer
      : `Based on my resume and the job requirements, suggest what I should emphasize for: ${question.question}`;

    // Store original text before enhancement
    const originalText = currentAnswer;
    
    setEnhancingId(question.id);
    try {
      // Get enhanced text directly from the return value (don't read from stale state)
      const enhancedText = await enhanceAnswerWithAI(question.id, textToEnhance);
      
      // Restore original text temporarily and open modal for review
      setAnswer(question.id, originalText);
      
      // Set up modal state
      setEnhancementOriginalText(originalText);
      setEnhancementEnhancedText(enhancedText);
      setEnhancementQuestionId(question.id);
      setEnhancementModalOpen(true);
    } finally {
      setEnhancingId(null);
    }
  };

  const handleEnhancementApprove = (approvedText: string) => {
    if (enhancementQuestionId) {
      setAnswer(enhancementQuestionId, approvedText);
    }
    setEnhancementModalOpen(false);
    setEnhancementQuestionId(null);
    setEnhancementOriginalText('');
    setEnhancementEnhancedText('');
  };

  const handleEnhancementReject = () => {
    // Original text is already restored, just close the modal
    setEnhancementModalOpen(false);
    setEnhancementQuestionId(null);
    setEnhancementOriginalText('');
    setEnhancementEnhancedText('');
  };

  const handleGenerateOptions = async (question: ClarificationQuestion) => {
    await generateAnswerOptions(question.id);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    selectAnswerOption(questionId, optionIndex);
  };

  const handleProceed = async () => {
    await generateTailoredResume();
    onNext();
  };

  // Check if required questions are answered
  const requiredQuestionsAnswered = questions
    .filter(q => q.required)
    .every(q => getAnswerForQuestion(q.id).trim().length > 10);

  if (isGeneratingQuestions) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('jobTailoring.questions.generating')}
          </h2>
          <p className="text-gray-600">
            {t('jobTailoring.questions.generatingDesc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('jobTailoring.questions.title')}
        </h2>
        <p className="text-gray-600">
          {t('jobTailoring.questions.subtitle')}
        </p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-800 font-medium">{t('jobTailoring.questions.tipsTitle')}</p>
          <ul className="text-sm text-blue-700 mt-1 space-y-0.5">
            <li>• {t('jobTailoring.questions.tips.specific')}</li>
            <li>• {t('jobTailoring.questions.tips.enhance')}</li>
            <li>• {t('jobTailoring.questions.tips.skip')}</li>
          </ul>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => {
          const answer = getAnswerForQuestion(question.id);
          const isExpanded = expandedQuestions.has(question.id);
          const isEnhancing = enhancingId === question.id;
          const hasAnswer = answer.trim().length > 0;

          return (
            <div
              key={question.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${question.required
                ? 'border-orange-200'
                : 'border-gray-200'
                }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleQuestion(question.id)}
                className="w-full px-6 py-4 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${hasAnswer
                  ? 'bg-green-100'
                  : question.required
                    ? 'bg-orange-100'
                    : 'bg-gray-100'
                  }`}>
                  {hasAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <span className={`text-sm font-semibold ${question.required ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{question.question}</p>
                    {question.required && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                        {t('jobTailoring.questions.required')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{question.context}</p>
                </div>
                <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                </div>
              </button>

              {/* Answer Section */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  {question.type === 'select' && question.options ? (
                    <select
                      value={answer}
                      onChange={(e) => setAnswer(question.id, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">{t('jobTailoring.questions.selectOption')}</option>
                      {question.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="space-y-3">
                      {/* Hint Section - Display guidance to the user */}
                      {question.hintText && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-blue-800 mb-1">{t('jobTailoring.questions.hint')}</p>
                              <p className="text-sm text-blue-700">{question.hintText}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Answer textarea - value is strictly from user input */}
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(question.id, e.target.value)}
                        placeholder={t('jobTailoring.questions.typeAnswer')}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      />

                      <div className="flex flex-wrap gap-2">
                        {/* Generate AI Suggestions Button */}
                        <button
                          onClick={() => handleGenerateOptions(question)}
                          disabled={generatingOptionsFor === question.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50"
                        >
                          {generatingOptionsFor === question.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Sparkles className="w-4 h-4" />
                          )}
                          {generatingOptionsFor === question.id
                            ? t('jobTailoring.questions.generating')
                            : t('jobTailoring.questions.generateAiSuggestions')}
                        </button>

                        {/* Enhance with AI Button - Show when there is an answer */}
                        {hasAnswer && (
                          <button
                            onClick={() => handleEnhance(question)}
                            disabled={isEnhancing}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                          >
                            {isEnhancing ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Wand2 className="w-4 h-4" />
                            )}
                            {isEnhancing ? t('jobTailoring.questions.enhancing') : t('jobTailoring.questions.enhanceWithAi')}
                          </button>
                        )}

                        {/* Clear Button */}
                        {hasAnswer && (
                          <button
                            onClick={() => setAnswer(question.id, '')}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <X className="w-4 h-4" />
                            {t('common.clear')}
                          </button>
                        )}

                        {/* Skip Button */}
                        {!question.required && (
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 text-sm rounded-lg hover:bg-gray-100 transition-colors ml-auto"
                          >
                            <SkipForward className="w-4 h-4" />
                            {t('jobTailoring.questions.skip')}
                          </button>
                        )}
                      </div>

                      {/* AI-Generated Options */}
                      {questionOptions.get(question.id) && (
                        <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <p className="text-sm font-medium text-purple-800">
                              {t('jobTailoring.questions.aiGeneratedOptions')}
                            </p>
                          </div>

                          <div className="space-y-2">
                            {questionOptions.get(question.id)!.map((option, optIdx) => (
                              <label
                                key={optIdx}
                                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                  selectedOptions.get(question.id) === optIdx
                                    ? 'border-purple-500 bg-purple-100'
                                    : 'border-purple-200 hover:border-purple-300 bg-white'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`option-${question.id}`}
                                  checked={selectedOptions.get(question.id) === optIdx}
                                  onChange={() => handleSelectOption(question.id, optIdx)}
                                  className="mt-1"
                                />
                                <span className="text-sm text-gray-700 flex-1">{option}</span>
                              </label>
                            ))}
                          </div>

                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleGenerateOptions(question)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-purple-600 text-sm rounded-lg hover:bg-purple-100 transition-colors"
                            >
                              <RefreshCw className="w-4 h-4" />
                              {t('jobTailoring.questions.regenerate')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Related Skill Badge */}
              {question.relatedSkill && (
                <div className="px-6 pb-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">{t('jobTailoring.questions.relatedTo')}</span>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                    {question.relatedSkill}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {t('jobTailoring.questions.progress', { answered: answers.filter(a => a.answer.trim().length > 0).length, total: questions.length })}
          </span>
          {!requiredQuestionsAnswered && (
            <span className="text-orange-600 font-medium">
              {t('jobTailoring.questions.completeRequired')}
            </span>
          )}
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
            style={{
              width: `${(answers.filter(a => a.answer.trim().length > 0).length / questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('common.back')}
        </button>
        <button
          onClick={handleProceed}
          disabled={!requiredQuestionsAnswered || isGeneratingTailored}
          className={`flex items-center gap-2 px-8 py-3 font-medium rounded-xl transition-all ${
            requiredQuestionsAnswered && !isGeneratingTailored
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isGeneratingTailored
            ? t('jobTailoring.questions.generatingTailored')
            : t('jobTailoring.questions.generateTailored')
          }
          {isGeneratingTailored
            ? <Loader2 className="w-5 h-5 animate-spin" />
            : <ArrowRight className="w-5 h-5" />
          }
        </button>
      </div>

      {/* Enhancement Review Modal */}
      <EnhancementReviewModal
        isOpen={enhancementModalOpen}
        onClose={() => setEnhancementModalOpen(false)}
        originalText={enhancementOriginalText}
        enhancedText={enhancementEnhancedText}
        sectionType="answer"
        onApprove={handleEnhancementApprove}
        onReject={handleEnhancementReject}
      />
    </div>
  );
}

export default ClarificationQuestions;

