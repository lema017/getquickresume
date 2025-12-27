import { ResumeScore, GeneratedResume } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { useResumeStore } from '@/stores/resumeStore';
import { Lock, TrendingUp, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GuidedEnhancementModal } from './GuidedEnhancementModal';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import toast from 'react-hot-toast';

interface ResumeScoreCardProps {
  score: ResumeScore | null;
  isLoading?: boolean;
  error?: string | null;
  onUpgrade?: () => void;
  resume?: GeneratedResume | null;
  onEnhancementComplete?: (sectionType: string, enhancedText: string) => void;
}

export function ResumeScoreCard({ score, isLoading, error, onUpgrade, resume, onEnhancementComplete }: ResumeScoreCardProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { setCurrentStep } = useResumeStore();
  const isPremium = user?.isPremium || false;
  const [isDetailedFeedbackOpen, setIsDetailedFeedbackOpen] = useState(false);
  const [enhancementModal, setEnhancementModal] = useState<{
    isOpen: boolean;
    sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
    recommendation: string;
    originalText: string;
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
      'skills': 'skills', // Already singular
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

    // Handle both singular and plural forms for compatibility
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
        // Check the separate achievements array (not achievements within experience entries)
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
        // For contact, check if LinkedIn is missing (main enhancement need)
        // Return empty string if LinkedIn is missing to trigger navigation
        if (generatedResume.contactInfo?.linkedin) {
          return `LinkedIn: ${generatedResume.contactInfo.linkedin}`;
        }
        return '';
      default:
        return '';
    }
  };

  const handleEnhanceSection = (feedback: { section: string; recommendations: string[] }) => {
    if (!isPremium || !resume) return;

    // Normalize section type to singular form for backend compatibility
    const normalizedSection = normalizeSectionType(feedback.section);
    const sectionType = normalizedSection as 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
    const originalText = getOriginalTextForSection(feedback.section, resume);
    const recommendation = feedback.recommendations.join('. '); // Combine all recommendations

    // Contact section always navigates to wizard step (can't be AI-enhanced)
    if (normalizedSection === 'contact') {
      const sectionName = getSectionDisplayName(feedback.section);
      const wizardStep = getWizardStepForSection(normalizedSection);
      
      if (wizardStep) {
        setEmptySectionDialog({
          isOpen: true,
          sectionName,
          wizardStep,
        });
      } else {
        console.warn(`No wizard step found for section: ${feedback.section}`);
        toast.error(`Unable to navigate to wizard step for ${sectionName}`);
      }
      return;
    }

    // If section is empty, navigate to wizard step instead of enhancing
    if (!originalText || originalText.trim().length === 0) {
      const sectionName = getSectionDisplayName(feedback.section);
      const wizardStep = getWizardStepForSection(normalizedSection);
      
      if (wizardStep) {
        setEmptySectionDialog({
          isOpen: true,
          sectionName,
          wizardStep,
        });
      } else {
        console.warn(`No wizard step found for section: ${feedback.section}`);
        toast.error(`Unable to navigate to wizard step for ${sectionName}`);
      }
      return;
    }

    setEnhancementModal({
      isOpen: true,
      sectionType,
      recommendation,
      originalText,
    });
  };

  // Get display name for section
  const getSectionDisplayName = (section: string): string => {
    const names: Record<string, string> = {
      'education': 'Education',
      'project': 'Projects',
      'projects': 'Projects',
      'achievement': 'Achievements',
      'achievements': 'Achievements',
      'language': 'Languages',
      'languages': 'Languages',
      'contact': 'Contact Information',
    };
    return names[section.toLowerCase()] || section;
  };

  // Get wizard step route for section
  const getWizardStepForSection = (section: string): string | null => {
    const sectionLower = section.toLowerCase();
    const stepMap: Record<string, string> = {
      'education': '/wizard/manual/step-4',
      'project': '/wizard/manual/step-5',
      'projects': '/wizard/manual/step-5',
      'achievement': '/wizard/manual/step-6',
      'achievements': '/wizard/manual/step-6',
      'language': '/wizard/manual/step-5',
      'languages': '/wizard/manual/step-5',
      'contact': '/wizard/manual/step-1',
    };
    return stepMap[sectionLower] || null;
  };

  // Get step number from route
  const getStepNumberFromRoute = (route: string): number | null => {
    const match = route.match(/step-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  // Check if section is supported by enhancement API
  const isSectionSupported = (section: string): boolean => {
    const normalized = normalizeSectionType(section);
    const supportedSections = ['summary', 'experience', 'education', 'certification', 'project', 'achievement', 'language'];
    return supportedSections.includes(normalized);
  };

  // Check if section has perfect/max score (no enhancement needed)
  const hasPerfectScore = (section: string, currentScore: number): boolean => {
    const maxScores: Record<string, number> = {
      'summary': 2.0,
      'experience': 2.5,
      'skills': 1.5,
      'education': 1.0,
      'projects': 1.0,
      'project': 1.0,
      'achievements': 1.0,
      'achievement': 1.0,
      'languages': 0.5,
      'language': 0.5,
      'contact': 0.5,
    };
    const sectionLower = section.toLowerCase();
    const maxScore = maxScores[sectionLower];
    return maxScore !== undefined && currentScore >= maxScore;
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">
            {score ? 'Updating score...' : 'Generating score...'}
          </span>
        </div>
        {!score && (
          <p className="text-center text-sm text-gray-500 mt-2">
            This may take a few seconds
          </p>
        )}
      </div>
    );
  }

  // Don't show error for "Score not found" - it's normal for new/regenerated resumes
  if (error && !error.includes('Score not found') && !error.includes('not been scored')) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm">
        <div className="flex items-center text-red-600">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Error loading score</span>
        </div>
        <p className="text-sm text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  // Don't show anything if score doesn't exist yet (normal state)
  if (!score) {
    return null;
  }

  const percentage = Math.round((score.totalScore / 10) * 100);
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-blue-600 bg-blue-50';
    if (score >= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resume Score</h3>
          <p className="text-sm text-gray-500">Based on professional standards</p>
        </div>
        <div className={`px-4 py-2 rounded-full ${getScoreColor(score.totalScore)}`}>
          <div className="text-2xl font-bold">{score.totalScore.toFixed(1)}</div>
          <div className="text-xs font-medium">/ 10</div>
        </div>
      </div>

      {/* Score Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{getScoreLabel(score.totalScore)}</span>
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              percentage >= 80 ? 'bg-green-500' :
              percentage >= 60 ? 'bg-blue-500' :
              percentage >= 40 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Score Breakdown</h4>
        <div className="space-y-3">
          {Object.entries(score.breakdown).map(([key, value]) => {
            const maxScore = {
              summary: 2.0,
              experience: 2.5,
              skills: 1.5,
              education: 1.0,
              projects: 1.0,
              achievements: 1.0,
              languages: 0.5,
              contact: 0.5,
            }[key] || 1.0;
            const percentage = Math.round((value / maxScore) * 100);
            const label = key.charAt(0).toUpperCase() + key.slice(1);

            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {value.toFixed(1)}/{maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths */}
      {score.strengths && score.strengths.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="text-sm font-semibold text-gray-900">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {score.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements - Show for ALL users */}
      {score.improvements && score.improvements.length > 0 && (
        <div className="mb-6 border-t border-gray-200 pt-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="text-sm font-semibold text-gray-900">Improvements</h4>
          </div>
          <ul className="space-y-2">
            {score.improvements.map((improvement, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Free users: Prominent Enhance Resume button */}
      {!isPremium && (
        <div className="mb-6 border-t border-gray-200 pt-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-5 border border-purple-200">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to improve your resume?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Use AI to automatically enhance each section based on the recommendations above
              </p>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Enhance My Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium: Show Detailed Feedback with Enhance buttons */}
      {isPremium && score.detailedFeedback && score.detailedFeedback.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => setIsDetailedFeedbackOpen(!isDetailedFeedbackOpen)}
            className="w-full flex items-center justify-between text-left mb-4 hover:text-blue-600 transition-colors"
          >
            <h4 className="text-sm font-semibold text-gray-900">Detailed Feedback by Section</h4>
            {isDetailedFeedbackOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {isDetailedFeedbackOpen && (
            <div className="space-y-4">
              {score.detailedFeedback.map((feedback, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-medium text-gray-900 capitalize">
                      {feedback.section}
                    </h5>
                    {hasPerfectScore(feedback.section, feedback.currentScore) ? (
                      <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                        Good
                      </span>
                    ) : (
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        feedback.priority === 'high' ? 'bg-red-100 text-red-700' :
                        feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {feedback.priority} priority
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    Current score: {feedback.currentScore.toFixed(1)}
                  </div>
                  {feedback.recommendations && feedback.recommendations.length > 0 && (
                    <ul className="space-y-1 mb-3">
                      {feedback.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="text-sm text-gray-700 flex items-start">
                          <span className="text-blue-600 mr-2">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Show enhance button if section is supported or has wizard step, and doesn't have perfect score */}
                  {(isSectionSupported(feedback.section) || getWizardStepForSection(normalizeSectionType(feedback.section))) && !hasPerfectScore(feedback.section, feedback.currentScore) && (
                    <button
                      onClick={() => handleEnhanceSection(feedback)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Enhance Section
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Guided Enhancement Modal */}
      {enhancementModal.isOpen && (
        <GuidedEnhancementModal
          isOpen={enhancementModal.isOpen}
          onClose={() => setEnhancementModal({ isOpen: false, sectionType: 'summary', recommendation: '', originalText: '' })}
          sectionType={enhancementModal.sectionType}
          recommendation={enhancementModal.recommendation}
          originalText={enhancementModal.originalText}
          onEnhancementComplete={handleEnhancementComplete}
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
            // Update current step before navigating
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
}

