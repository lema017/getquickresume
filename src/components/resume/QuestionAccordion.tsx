import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Loader2 } from 'lucide-react';
import { enhancementService } from '@/services/enhancementService';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

export interface Question {
  id: string;
  question: string;
  category: string;
  required: boolean;
}

interface QuestionAccordionProps {
  questions: Question[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
  originalText: string;
  recommendation: string;
  sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
  language?: 'es' | 'en';
}

export function QuestionAccordion({ 
  questions, 
  answers, 
  onAnswerChange, 
  originalText, 
  recommendation, 
  sectionType,
  language = 'es'
}: QuestionAccordionProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [loadingSuggestions, setLoadingSuggestions] = useState<Set<string>>(new Set());
  const { user } = useAuthStore();
  const isPremium = user?.isPremium || false;

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  const toggleCategory = (category: string) => {
    const newOpen = new Set(openCategories);
    if (newOpen.has(category)) {
      newOpen.delete(category);
    } else {
      newOpen.add(category);
    }
    setOpenCategories(newOpen);
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      'quantifiable-metrics': 'Quantifiable Metrics',
      'impact': 'Business Impact',
      'context': 'Context & Background',
      'skills': 'Skills & Technologies',
      'achievements': 'Achievements & Results',
    };
    return labels[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  };

  const getRequiredCount = (categoryQuestions: Question[]): number => {
    return categoryQuestions.filter(q => q.required).length;
  };

  const getAnsweredCount = (categoryQuestions: Question[]): number => {
    return categoryQuestions.filter(q => answers[q.id] && answers[q.id].trim().length > 0).length;
  };

  const handleGetSuggestion = async (question: Question) => {
    if (!isPremium) {
      toast.error('This feature is available only for premium users. Please upgrade to access AI suggestions.');
      return;
    }

    setLoadingSuggestions(prev => new Set(prev).add(question.id));

    try {
      const suggestion = await enhancementService.generateAnswerSuggestion({
        question: question.question,
        questionCategory: question.category,
        originalText,
        recommendation,
        sectionType,
        language,
      });

      // Replace the current answer with the suggestion
      onAnswerChange(question.id, suggestion);
      toast.success('AI suggestion generated!');
    } catch (error: any) {
      console.error('Error generating suggestion:', error);
      toast.error(error.message || 'Failed to generate suggestion. Please try again.');
    } finally {
      setLoadingSuggestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(question.id);
        return newSet;
      });
    }
  };

  return (
    <div className="space-y-3">
      {Object.entries(questionsByCategory).map(([category, categoryQuestions]) => {
        const isOpen = openCategories.has(category);
        const requiredCount = getRequiredCount(categoryQuestions);
        const answeredCount = getAnsweredCount(categoryQuestions);
        const allRequiredAnswered = categoryQuestions
          .filter(q => q.required)
          .every(q => answers[q.id] && answers[q.id].trim().length > 0);

        return (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="font-medium text-gray-900">{getCategoryLabel(category)}</span>
                </div>
                <span className="text-sm text-gray-500">
                  ({answeredCount}/{categoryQuestions.length} answered
                  {requiredCount > 0 && `, ${requiredCount} required`})
                </span>
                {allRequiredAnswered && requiredCount > 0 && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Complete
                  </span>
                )}
              </div>
            </button>

            {isOpen && (
              <div className="p-4 space-y-4 bg-white">
                {categoryQuestions.map((question) => {
                  const answer = answers[question.id] || '';
                  const hasAnswer = answer.trim().length > 0;
                  const maxChars = 500;

                  return (
                    <div key={question.id} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {question.question}
                        {question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <textarea
                            value={answer}
                            onChange={(e) => {
                              const newValue = e.target.value.slice(0, maxChars);
                              onAnswerChange(question.id, newValue);
                            }}
                            className={`flex-1 p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              question.required && !hasAnswer
                                ? 'border-yellow-300 bg-yellow-50'
                                : 'border-gray-300'
                            }`}
                            rows={3}
                            placeholder="Type your answer here..."
                          />
                          {isPremium && (
                            <button
                              onClick={() => handleGetSuggestion(question)}
                              disabled={loadingSuggestions.has(question.id)}
                              className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 self-start"
                              title="Get AI suggestion"
                            >
                              {loadingSuggestions.has(question.id) ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span className="hidden sm:inline">Generating...</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4" />
                                  <span className="hidden sm:inline">AI Suggestion</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {answer.length}/{maxChars} characters
                          </span>
                          {question.required && !hasAnswer && (
                            <span className="text-xs text-yellow-600">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

