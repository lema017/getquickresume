import { KeywordAnalysisData } from '@/types';
import { Search, Code2, Heart, Zap, Building2, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useState } from 'react';

interface ATSKeywordCardProps {
  keywordAnalysis: KeywordAnalysisData;
  isPremium: boolean;
}

export function ATSKeywordCard({ keywordAnalysis, isPremium }: ATSKeywordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'fair':
        return 'bg-amber-500';
      case 'needs-work':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getTierBgColor = (tier: string) => {
    switch (tier) {
      case 'excellent':
        return 'bg-green-50 border-green-200';
      case 'good':
        return 'bg-blue-50 border-blue-200';
      case 'fair':
        return 'bg-amber-50 border-amber-200';
      case 'needs-work':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  const getTierTextColor = (tier: string) => {
    switch (tier) {
      case 'excellent':
        return 'text-green-700';
      case 'good':
        return 'text-blue-700';
      case 'fair':
        return 'text-amber-700';
      case 'needs-work':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  const categoryIcons = {
    hardSkills: Code2,
    softSkills: Heart,
    actionVerbs: Zap,
    industryTerms: Building2,
  };

  const categoryLabels = {
    hardSkills: 'Hard Skills',
    softSkills: 'Soft Skills',
    actionVerbs: 'Action Verbs',
    industryTerms: 'Industry Terms',
  };

  const categoryDescriptions = {
    hardSkills: 'Technical skills, frameworks, tools',
    softSkills: 'Interpersonal & transferable skills',
    actionVerbs: 'Strong action verbs for achievements',
    industryTerms: 'Industry-specific terminology',
  };

  return (
    <div className={`border rounded-xl overflow-hidden ${getTierBgColor(keywordAnalysis.atsScore)}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-white/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getTierColor(keywordAnalysis.atsScore)}`}>
            <Search className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              ATS Keyword Analysis
              <span className={`text-xs px-2 py-0.5 rounded-full ${getTierColor(keywordAnalysis.atsScore)} text-white`}>
                {keywordAnalysis.tierLabel}
              </span>
            </h4>
            <p className={`text-sm ${getTierTextColor(keywordAnalysis.atsScore)}`}>
              {keywordAnalysis.totalKeywordsFound} relevant keywords found
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Score indicator */}
          <div className="text-right mr-2">
            <div className={`text-lg font-bold ${getTierTextColor(keywordAnalysis.atsScore)}`}>
              {keywordAnalysis.scoreValue.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">/ 10</div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/50">
          {/* Info Banner */}
          <div className="mt-3 p-3 bg-white/50 rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              ATS (Applicant Tracking Systems) scan resumes for relevant keywords. 
              More relevant keywords = higher match rate with job postings.
            </p>
          </div>

          {/* Keyword Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => {
              const Icon = categoryIcons[category];
              const keywords = keywordAnalysis[category] || [];
              const hasKeywords = keywords.length > 0;
              
              return (
                <div 
                  key={category}
                  className={`p-3 rounded-lg border ${hasKeywords ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${hasKeywords ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium text-gray-700">
                      {categoryLabels[category]}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${hasKeywords ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                      {keywords.length}
                    </span>
                  </div>
                  
                  {hasKeywords ? (
                    <div className="flex flex-wrap gap-1.5">
                      {keywords.slice(0, 8).map((keyword, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
                        >
                          {keyword}
                        </span>
                      ))}
                      {keywords.length > 8 && (
                        <span className="text-xs text-gray-500 italic px-2 py-1">
                          +{keywords.length - 8} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">
                      {categoryDescriptions[category]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tips based on tier */}
          {keywordAnalysis.atsScore === 'needs-work' && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-red-700">
                <strong>Tip:</strong> Add more industry-specific keywords to your resume. 
                Include technical skills, tools, and action verbs relevant to your profession.
              </p>
            </div>
          )}
          
          {keywordAnalysis.atsScore === 'fair' && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-700">
                <strong>Tip:</strong> Consider adding more soft skills and industry terminology 
                to improve your ATS match rate.
              </p>
            </div>
          )}
          
          {keywordAnalysis.atsScore === 'excellent' && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700">
                <strong>Great!</strong> Your resume has excellent keyword coverage. 
                ATS systems should easily match your resume with relevant job postings.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

