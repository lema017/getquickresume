import { memo, useState } from 'react';
import { ResumeScore, GeneratedResume, ChecklistItem, SectionChecklist as SectionChecklistType } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { useResumeStore } from '@/stores/resumeStore';
import { Lock, TrendingUp, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GuidedEnhancementModal } from './GuidedEnhancementModal';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { SectionChecklist } from './SectionChecklist';
import { OptimizedBadge, ProgressToOptimized } from './OptimizedBadge';
import { ATSKeywordCard } from './ATSKeywordCard';
import toast from 'react-hot-toast';

interface ResumeScoreCardProps {
  score: ResumeScore | null;
  isLoading?: boolean;
  error?: string | null;
  onUpgrade?: () => void;
  resume?: GeneratedResume | null;
  onEnhancementComplete?: (sectionType: string, enhancedText: string) => void;
}

// Memoized to prevent re-renders when parent state changes but score data hasn't
export const ResumeScoreCard = memo(function ResumeScoreCard({ score, isLoading, error, onUpgrade, resume, onEnhancementComplete }: ResumeScoreCardProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { setCurrentStep } = useResumeStore();
  const isPremium = user?.isPremium || false;
  const [enhancementModal, setEnhancementModal] = useState<{
    isOpen: boolean;
    sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
    recommendation: string;
    originalText: string;
    checklistItemId?: string;
  }>({
    isOpen: false,
    sectionType: 'summary',
    recommendation: '',
    originalText: '',
  });
  const [emptySectionDialog, setEmptySectionDialog] = useState<{
    isOpen: boolean;
    sectionName: string;
    wizardStep: string | null;
  }>({
    isOpen: false,
    sectionName: '',
    wizardStep: null,
  });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/premium');
    }
  };

  // Normalize section type from plural to singular form for backend compatibility
  const normalizeSectionType = (section: string): string => {
    const normalizationMap: Record<string, string> = {
      'achievements': 'achievement',
      'languages': 'language',
      'skills': 'skills',
      'projects': 'project',
    };
    
    const normalized = section.toLowerCase().trim();
    return normalizationMap[normalized] || normalized;
  };

  const getOriginalTextForSection = (
    sectionType: string,
    generatedResume: GeneratedResume | null | undefined
  ): string => {
    if (!generatedResume) return '';

    const normalizedType = normalizeSectionType(sectionType);

    switch (normalizedType) {
      case 'summary':
        return generatedResume.professionalSummary || '';
      case 'experience':
        if (generatedResume.experience && generatedResume.experience.length > 0) {
          return generatedResume.experience
            .map(exp => `${exp.title} at ${exp.company}: ${exp.description || ''}`)
            .join('\n\n');
        }
        return '';
      case 'education':
        if (generatedResume.education && generatedResume.education.length > 0) {
          return generatedResume.education
            .map(edu => `${edu.degree} in ${edu.field} from ${edu.institution}`)
            .join('\n\n');
        }
        return '';
      case 'project':
      case 'projects':
        if (generatedResume.projects && generatedResume.projects.length > 0) {
          return generatedResume.projects
            .map(proj => `${proj.name}: ${proj.description || ''}`)
            .join('\n\n');
        }
        return '';
      case 'achievement':
      case 'achievements':
        if (generatedResume.achievements && Array.isArray(generatedResume.achievements) && generatedResume.achievements.length > 0) {
          return generatedResume.achievements.join('\n');
        }
        return '';
      case 'skills':
        const skills = [
          ...(generatedResume.skills?.technical || []),
          ...(generatedResume.skills?.soft || []),
          ...(generatedResume.skills?.tools || [])
        ];
        return skills.join(', ');
      case 'language':
      case 'languages':
        if (generatedResume.languages && generatedResume.languages.length > 0) {
          return generatedResume.languages
            .map(lang => `${lang.language} (${lang.level})`)
            .join(', ');
        }
        return '';
      case 'contact':
        if (generatedResume.contactInfo?.linkedin) {
          return `LinkedIn: ${generatedResume.contactInfo.linkedin}`;
        }
        return '';
      default:
        return '';
    }
  };

  const handleEnhanceChecklistItem = (item: ChecklistItem, sectionKey: string) => {
    if (!isPremium || !resume) return;

    setIsEnhancing(true);

    const sectionType = normalizeSectionType(sectionKey) as typeof enhancementModal.sectionType;
    const originalText = getOriginalTextForSection(sectionKey, resume);

    // Contact section always navigates to wizard step (can't be AI-enhanced)
    if (sectionKey === 'contact') {
      setIsEnhancing(false);
      const wizardStep = getWizardStepForSection('contact');
      if (wizardStep) {
        setEmptySectionDialog({
          isOpen: true,
          sectionName: 'Contact Information',
          wizardStep,
        });
      }
      return;
    }

    // If section is empty, navigate to wizard step
    if (!originalText || originalText.trim().length === 0) {
      setIsEnhancing(false);
      const sectionName = getSectionDisplayName(sectionKey);
      const wizardStep = getWizardStepForSection(sectionKey);
      
      if (wizardStep) {
        setEmptySectionDialog({
          isOpen: true,
          sectionName,
          wizardStep,
        });
      } else {
        toast.error(`Cannot enhance empty ${sectionName} section`);
      }
      return;
    }

    setEnhancementModal({
      isOpen: true,
      sectionType,
      recommendation: `${item.label}: ${item.description}`,
      originalText,
      checklistItemId: item.id,
    });
    setIsEnhancing(false);
  };

  const getSectionDisplayName = (section: string): string => {
    const names: Record<string, string> = {
      'summary': 'Professional Summary',
      'experience': 'Work Experience',
      'education': 'Education',
      'project': 'Projects',
      'projects': 'Projects',
      'achievement': 'Achievements',
      'achievements': 'Achievements',
      'language': 'Languages',
      'languages': 'Languages',
      'skills': 'Skills',
      'contact': 'Contact Information',
    };
    return names[section.toLowerCase()] || section;
  };

  const getWizardStepForSection = (section: string): string | null => {
    const sectionLower = section.toLowerCase();
    const stepMap: Record<string, string> = {
      'summary': '/wizard/manual/step-7',
      'experience': '/wizard/manual/step-3',
      'education': '/wizard/manual/step-4',
      'project': '/wizard/manual/step-5',
      'projects': '/wizard/manual/step-5',
      'achievement': '/wizard/manual/step-6',
      'achievements': '/wizard/manual/step-6',
      'language': '/wizard/manual/step-5',
      'languages': '/wizard/manual/step-5',
      'skills': '/wizard/manual/step-2',
      'contact': '/wizard/manual/step-1',
    };
    return stepMap[sectionLower] || null;
  };

  const getStepNumberFromRoute = (route: string): number | null => {
    const match = route.match(/step-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  const handleEnhancementComplete = (enhancedText: string) => {
    if (onEnhancementComplete) {
      onEnhancementComplete(enhancementModal.sectionType, enhancedText);
    }
    setEnhancementModal({
      isOpen: false,
      sectionType: 'summary',
      recommendation: '',
      originalText: '',
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">
            {score ? 'Updating score...' : 'Analyzing your resume...'}
          </span>
        </div>
        {!score && (
          <p className="text-center text-sm text-gray-500 mt-2">
            This uses deterministic evaluation for consistent results
          </p>
        )}
      </div>
    );
  }

  // Error state
  if (error && !error.includes('Score not found') && !error.includes('not been scored')) {
    return (
      <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm">
        <div className="flex items-center text-red-600">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Error loading score</span>
        </div>
        <p className="text-sm text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  // No score state
  if (!score) {
    return null;
  }

  // Calculate stats from checklist
  const hasChecklist = score.checklist && Object.keys(score.checklist).length > 0;
  let totalRequired = 0;
  let requiredCompleted = 0;
  
  if (hasChecklist) {
    Object.values(score.checklist).forEach(section => {
      totalRequired += section.requiredCount;
      requiredCompleted += section.requiredCompletedCount;
    });
  }

  const requiredRemaining = totalRequired - requiredCompleted;

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (scoreValue >= 6) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (scoreValue >= 4) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Optimized Badge or Progress */}
      {score.isOptimized ? (
        <OptimizedBadge 
          isOptimized={score.isOptimized}
          completionPercentage={score.completionPercentage}
          totalScore={score.totalScore}
        />
      ) : (
        <ProgressToOptimized
          completionPercentage={score.completionPercentage}
          requiredRemaining={requiredRemaining}
          totalScore={score.totalScore}
        />
      )}

      {/* Main Score Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Resume Analysis</h3>
            <p className="text-sm text-gray-500">
              {hasChecklist 
                ? `${score.completionPercentage}% of criteria met` 
                : 'Based on professional standards'
              }
            </p>
          </div>
          <div className={`px-4 py-2 rounded-xl border ${getScoreColor(score.totalScore)}`}>
            <div className="text-2xl font-bold">{score.totalScore.toFixed(1)}</div>
            <div className="text-xs font-medium opacity-80">/ 10</div>
          </div>
        </div>

        {/* Strengths (always shown) */}
        {score.strengths && score.strengths.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="text-sm font-semibold text-gray-900">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {score.strengths.slice(0, 5).map((strength, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Premium: ATS Keyword Analysis */}
        {isPremium && score.keywordAnalysis && (
          <div className="border-t border-gray-200 pt-6">
            <ATSKeywordCard 
              keywordAnalysis={score.keywordAnalysis}
              isPremium={isPremium}
            />
          </div>
        )}

        {/* Premium: Section Checklists */}
        {isPremium && hasChecklist && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-900">
                Section Checklists
              </h4>
              <span className="text-xs text-gray-500">
                {score.completionPercentage}% complete
              </span>
            </div>
            
            <div className="space-y-3">
              {Object.entries(score.checklist)
                .filter(([sectionKey]) => sectionKey !== 'ats') // ATS is displayed separately above
                .sort((a, b) => {
                  // Sort by incomplete required items first
                  const aIncomplete = a[1].requiredCount - a[1].requiredCompletedCount;
                  const bIncomplete = b[1].requiredCount - b[1].requiredCompletedCount;
                  if (aIncomplete !== bIncomplete) return bIncomplete - aIncomplete;
                  // Then by total incomplete
                  return (b[1].totalCount - b[1].completedCount) - (a[1].totalCount - a[1].completedCount);
                })
                .map(([sectionKey, sectionChecklist]) => (
                  <SectionChecklist
                    key={sectionKey}
                    checklist={sectionChecklist}
                    onEnhanceItem={(item) => handleEnhanceChecklistItem(item, sectionKey)}
                    isPremium={isPremium}
                    isEnhancing={isEnhancing}
                  />
                ))
              }
            </div>
          </div>
        )}

        {/* Free users: Show improvements teaser and upgrade CTA */}
        {!isPremium && score.improvements && score.improvements.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-sm font-semibold text-gray-900">Areas to Improve</h4>
              <Lock className="w-4 h-4 text-gray-400 ml-2" />
            </div>
            
            {/* Show first 2 improvements blurred */}
            <div className="space-y-2 mb-4">
              {score.improvements.slice(0, 2).map((improvement, index) => (
                <div key={index} className="text-sm text-gray-400 blur-sm select-none">
                  {improvement}
                </div>
              ))}
            </div>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Unlock detailed checklists and AI-powered enhancements
                </p>
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Upgrade to Premium
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scoring version footer */}
        {score.scoringVersion && (
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Scoring v{score.scoringVersion}</span>
            <span>Evaluated: {new Date(score.generatedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Guided Enhancement Modal */}
      {enhancementModal.isOpen && (
        <GuidedEnhancementModal
          isOpen={enhancementModal.isOpen}
          onClose={() => setEnhancementModal({ isOpen: false, sectionType: 'summary', recommendation: '', originalText: '' })}
          sectionType={enhancementModal.sectionType}
          recommendation={enhancementModal.recommendation}
          originalText={enhancementModal.originalText}
          onEnhancementComplete={handleEnhancementComplete}
          checklistItemId={enhancementModal.checklistItemId}
        />
      )}

      {/* Empty Section Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={emptySectionDialog.isOpen}
        title="Empty Section"
        message={`This section is empty. Would you like to go to the wizard step to add ${emptySectionDialog.sectionName}?`}
        confirmText="Go to Step"
        cancelText="Cancel"
        variant="info"
        onConfirm={() => {
          if (emptySectionDialog.wizardStep) {
            const stepNumber = getStepNumberFromRoute(emptySectionDialog.wizardStep);
            if (stepNumber) {
              setCurrentStep(stepNumber);
            }
            navigate(emptySectionDialog.wizardStep);
            toast.success(`You can add ${emptySectionDialog.sectionName} here, then return to scoring to see your updated score`);
          }
          setEmptySectionDialog({ isOpen: false, sectionName: '', wizardStep: null });
        }}
        onCancel={() => {
          setEmptySectionDialog({ isOpen: false, sectionName: '', wizardStep: null });
        }}
      />

      {/* Premium Action Modal for free users */}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="enhance"
      />
    </div>
  );
});
