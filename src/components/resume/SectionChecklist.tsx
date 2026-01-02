import { useState, memo } from 'react';
import { CheckCircle2, Circle, Sparkles, ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';
import { SectionChecklist as SectionChecklistType, ChecklistItem } from '@/types';

interface SectionChecklistProps {
  checklist: SectionChecklistType;
  onEnhanceItem: (item: ChecklistItem) => void;
  isPremium: boolean;
  isEnhancing?: boolean;
}

// Memoized to prevent re-renders when other sections change
export const SectionChecklist = memo(function SectionChecklist({ 
  checklist, 
  onEnhanceItem, 
  isPremium,
  isEnhancing = false 
}: SectionChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completionPercentage = Math.round((checklist.completedCount / checklist.totalCount) * 100);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'required':
        return 'text-red-600 bg-red-50';
      case 'recommended':
        return 'text-amber-600 bg-amber-50';
      case 'optional':
        return 'text-gray-500 bg-gray-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'required':
        return 'Required';
      case 'recommended':
        return 'Recommended';
      case 'optional':
        return 'Optional';
      default:
        return priority;
    }
  };

  const getProgressColor = () => {
    if (completionPercentage >= 75) return 'bg-green-500';
    if (completionPercentage >= 50) return 'bg-blue-500';
    if (completionPercentage >= 25) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const incompleteItems = checklist.items.filter(item => !item.isCompleted);
  const completedItems = checklist.items.filter(item => item.isCompleted);
  const hasRequiredIncomplete = incompleteItems.some(item => item.priority === 'required');

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            {/* Circular progress indicator */}
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - completionPercentage / 100)}`}
                className={`${completionPercentage >= 75 ? 'text-green-500' : completionPercentage >= 50 ? 'text-blue-500' : 'text-amber-500'} transition-all duration-500`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
              {completionPercentage}%
            </span>
          </div>
          
          <div className="text-left">
            <h4 className="text-sm font-semibold text-gray-900">{checklist.displayName}</h4>
            <p className="text-xs text-gray-500">
              {checklist.completedCount}/{checklist.totalCount} criteria met
              {hasRequiredIncomplete && (
                <span className="ml-2 text-red-600">
                  • {checklist.requiredCount - checklist.requiredCompletedCount} required
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            {checklist.earnedPoints.toFixed(1)}/{checklist.maxPoints.toFixed(1)} pts
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
          {/* Incomplete Items First (actionable) */}
          {incompleteItems.length > 0 && (
            <div className="pt-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Needs Improvement ({incompleteItems.length})
              </p>
              <div className="space-y-2">
                {incompleteItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">{item.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                          {getPriorityLabel(item.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      {item.details && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          {item.details}
                        </p>
                      )}
                    </div>
                    {isPremium && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEnhanceItem(item);
                        }}
                        disabled={isEnhancing}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        <Sparkles className="w-4 h-4" />
                        Fix
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Items */}
          {completedItems.length > 0 && (
            <div className={incompleteItems.length > 0 ? 'pt-2' : 'pt-3'}>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Completed ({completedItems.length})
              </p>
              <div className="space-y-2">
                {completedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 bg-green-50/50 rounded-lg border border-green-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                          {getPriorityLabel(item.priority)}
                        </span>
                      </div>
                      {item.details && (
                        <p className="text-xs text-green-700 mt-1">{item.details}</p>
                      )}
                      {item.evidence && (
                        <p className="text-xs text-gray-500 mt-1 italic truncate">
                          "{item.evidence}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

