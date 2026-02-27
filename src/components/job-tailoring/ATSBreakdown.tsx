/**
 * @deprecated This component has been replaced by KeywordIntelligence.tsx
 * which provides a unified, consolidated view of keyword analysis in the Review page.
 * 
 * The ATS breakdown information is now integrated into the KeywordIntelligence
 * component's before/after comparison and category breakdown sections.
 * 
 * This file is kept for reference. It can be safely deleted after confirming
 * the new implementation works correctly.
 */

import { useTranslation } from 'react-i18next';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { ATSBreakdown as ATSBreakdownType, ATSCategory } from '@/types/jobTailoring';

interface ATSBreakdownProps {
  breakdown: ATSBreakdownType;
}

export function ATSBreakdown({ breakdown }: ATSBreakdownProps) {
  const { t } = useTranslation();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const getStatusColor = (status: ATSCategory['status']) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'needs_improvement':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBgColor = (status: ATSCategory['status']) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'needs_improvement':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: ATSCategory['status']) => {
    switch (status) {
      case 'excellent':
        return t('jobTailoring.atsBreakdown.excellent', 'Excellent');
      case 'good':
        return t('jobTailoring.atsBreakdown.good', 'Good');
      case 'needs_improvement':
        return t('jobTailoring.atsBreakdown.needsImprovement', 'Needs Work');
      case 'poor':
        return t('jobTailoring.atsBreakdown.poor', 'Poor');
      default:
        return status;
    }
  };

  const overallStatus = breakdown.overallScore >= 90 ? 'excellent' : 
                        breakdown.overallScore >= 75 ? 'good' : 
                        breakdown.overallScore >= 50 ? 'needs_improvement' : 'poor';

  return (
    <div className="pt-4 space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke={breakdown.overallScore >= 90 ? '#22c55e' : breakdown.overallScore >= 75 ? '#3b82f6' : breakdown.overallScore >= 50 ? '#eab308' : '#ef4444'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(breakdown.overallScore / 100) * 351.86} 351.86`}
              />
            </svg>
            {/* Score text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{breakdown.overallScore}</span>
              <span className="text-sm text-gray-500">/100</span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(overallStatus)}`}>
            {breakdown.overallScore >= 95 
              ? t('jobTailoring.atsBreakdown.atsReady', 'ATS Ready!') 
              : getStatusLabel(overallStatus)}
          </span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3">
        {breakdown.categories.map((category, index) => (
          <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
            <button
              onClick={() => category.items && category.items.length > 0 ? toggleCategory(category.name) : null}
              className={`w-full p-4 text-left ${category.items && category.items.length > 0 ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <span className="text-xs text-gray-500">({category.weight}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBgColor(category.status)}`}>
                    {getStatusLabel(category.status)}
                  </span>
                  <span className="font-semibold text-gray-900">{category.score}/{category.maxScore}</span>
                  {category.items && category.items.length > 0 && (
                    expandedCategories.has(category.name) 
                      ? <ChevronUp className="w-4 h-4 text-gray-400" />
                      : <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getStatusColor(category.status)}`}
                  style={{ width: `${category.score}%` }}
                />
              </div>
              
              <p className="text-sm text-gray-600 mt-2">{category.details}</p>
            </button>

            {/* Expandable items */}
            {expandedCategories.has(category.name) && category.items && category.items.length > 0 && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-200 bg-white">
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-sm">
                      {item.found ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                      <span className={item.found ? 'text-gray-900' : 'text-gray-500'}>
                        {item.item}
                      </span>
                      {item.found && item.location && (
                        <span className="text-xs text-gray-400 ml-auto">
                          {item.location}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {breakdown.recommendations && breakdown.recommendations.length > 0 && (
        <div className="bg-amber-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h4 className="font-medium text-amber-900">
              {t('jobTailoring.atsBreakdown.recommendations', 'Recommendations for 100% Score')}
            </h4>
          </div>
          <ul className="space-y-2">
            {breakdown.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ATSBreakdown;
