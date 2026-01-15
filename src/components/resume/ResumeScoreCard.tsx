import { memo, useState } from 'react';
import { ResumeScore, GeneratedResume, ChecklistItem, SectionChecklist as SectionChecklistType, ResumeData } from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { useResumeStore } from '@/stores/resumeStore';
import { Lock, TrendingUp, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GuidedEnhancementModal } from './GuidedEnhancementModal';
import { DataEditModal, EditableSection } from './DataEditModal';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { SectionChecklist } from './SectionChecklist';
import { OptimizedBadge, ProgressToOptimized } from './OptimizedBadge';
import { ATSKeywordCard } from './ATSKeywordCard';
import { isStructuralFix } from '@/config/enhancementTypes';
import { FieldError } from '@/services/sectionValidationService';
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
  const { resumeData, updateSectionAndSync, generatedResume, currentResumeId, currentScore, scoreResume } = useResumeStore();
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
  // DataEditModal state for in-place editing
  const [dataEditModal, setDataEditModal] = useState<{
    isOpen: boolean;
    section: EditableSection;
    checklistItemId?: string;
    checklistItemLabel?: string;
    initialValidationErrors?: FieldError[];
  }>({
    isOpen: false,
    section: 'contact',
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

  // Map section keys to EditableSection types for DataEditModal
  const mapToEditableSection = (sectionKey: string): EditableSection | null => {
    const map: Record<string, EditableSection> = {
      'contact': 'contact',
      'education': 'education',
      'skills': 'skills',
      'projects': 'projects',
      'project': 'projects',
      'languages': 'languages',
      'language': 'languages',
      'achievements': 'achievements',
      'achievement': 'achievements',
    };
    return map[sectionKey.toLowerCase()] || null;
  };

  // Map data quality item IDs to their target editable sections
  const mapDataQualityToSection = (itemId: string): EditableSection | null => {
    const map: Record<string, EditableSection> = {
      'data-quality-education': 'education',
      'data-quality-skills': 'skills',
      'data-quality-profile': 'contact',
      'data-quality-languages': 'languages',
    };
    return map[itemId] || null;
  };

  // Parse section names from evidence string (e.g., "Sections needing attention: education, skills")
  const parseSectionsFromEvidence = (evidence: string): EditableSection[] => {
    const match = evidence.match(/Sections needing attention:\s*(.+)/i);
    if (!match) return [];
    
    const sectionNames = match[1].split(',').map(s => s.trim().toLowerCase());
    const sectionMap: Record<string, EditableSection> = {
      'education': 'education',
      'skills': 'skills',
      'profile': 'contact',
      'contact': 'contact',
      'languages': 'languages',
    };
    
    return sectionNames
      .map(name => sectionMap[name])
      .filter((s): s is EditableSection => !!s);
  };

  // Parse field-level errors from checklist item evidence
  // Evidence format examples: "field: invalid", "institution: placeholder value", etc.
  const parseFieldErrorsFromEvidence = (evidence: string | undefined, details: string | undefined): FieldError[] => {
    const errors: FieldError[] = [];
    
    // Try to parse evidence for specific field errors
    if (evidence) {
      // Pattern: "fieldName: reason" or "fieldName[index]: reason"
      const fieldPatterns = evidence.split(/[;,]/).map(s => s.trim()).filter(Boolean);
      
      for (const pattern of fieldPatterns) {
        const match = pattern.match(/^(\w+)(?:\[(\d+)\])?:\s*(.+)$/);
        if (match) {
          const [, field, indexStr, reason] = match;
          errors.push({
            index: indexStr ? parseInt(indexStr, 10) : undefined,
            field: field.toLowerCase(),
            value: '',
            reason: reason.trim()
          });
        }
      }
    }
    
    // If no specific field errors found, create a general error from details
    if (errors.length === 0 && details) {
      // Extract any mentioned fields from details text
      const commonFields = ['institution', 'degree', 'field', 'name', 'email', 'phone', 'language', 'level'];
      for (const f of commonFields) {
        if (details.toLowerCase().includes(f)) {
          errors.push({
            field: f,
            value: '',
            reason: details
          });
          break;
        }
      }
    }
    
    return errors;
  };

  const handleEnhanceChecklistItem = (item: ChecklistItem, sectionKey: string) => {
    if (!isPremium || !resume) return;

    setIsEnhancing(true);

    // Special handling for Data Quality section items
    if (sectionKey.toLowerCase() === 'dataquality') {
      setIsEnhancing(false);
      
      // Handle overall data quality - parse evidence and open modal for first affected section
      if (item.id === 'data-quality-overall') {
        const sectionsNeedingFix = parseSectionsFromEvidence(item.evidence || '');
        
        if (sectionsNeedingFix.length > 0) {
          // Try to get field-level errors from other data quality checklist items
          const sectionToCheck = sectionsNeedingFix[0];
          const dataQualitySection = score?.checklist?.dataQuality;
          const sectionItem = dataQualitySection?.items?.find(i => 
            i.id === `data-quality-${sectionToCheck}` || 
            (sectionToCheck === 'contact' && i.id === 'data-quality-profile')
          );
          
          const fieldErrors = sectionItem 
            ? parseFieldErrorsFromEvidence(sectionItem.evidence, sectionItem.details)
            : parseFieldErrorsFromEvidence(item.evidence, item.details);
          
          // Open modal for first section with issues
          setDataEditModal({
            isOpen: true,
            section: sectionsNeedingFix[0],
            checklistItemId: item.id,
            checklistItemLabel: `${item.label} - Fix ${sectionsNeedingFix[0]} data`,
            initialValidationErrors: fieldErrors,
          });
        } else {
          // Fallback if we can't parse sections
          toast.error('Data quality issues found. Please review and fix invalid entries in the sections below.', { duration: 5000 });
        }
        return;
      }
      
      // Handle experience and certifications - not directly editable via DataEditModal
      if (item.id === 'data-quality-experience') {
        toast.error('To fix experience data quality issues, go back to the Experience step and edit the entries with invalid values.', { duration: 5000 });
        return;
      }
      if (item.id === 'data-quality-certifications') {
        toast.error('To fix certifications data quality issues, go back to the Education & Certifications step and edit the entries with invalid values.', { duration: 5000 });
        return;
      }
      
      // Map to target editable section
      const targetSection = mapDataQualityToSection(item.id);
      if (targetSection) {
        const fieldErrors = parseFieldErrorsFromEvidence(item.evidence, item.details);
        setDataEditModal({
          isOpen: true,
          section: targetSection,
          checklistItemId: item.id,
          checklistItemLabel: item.label,
          initialValidationErrors: fieldErrors,
        });
        return;
      }
      
      // Fallback for unknown data quality items
      toast.error(`To fix this data quality issue, edit the relevant section with valid, meaningful data.`, { duration: 4000 });
      return;
    }

    const sectionType = normalizeSectionType(sectionKey) as typeof enhancementModal.sectionType;
    const originalText = getOriginalTextForSection(sectionKey, resume);

    // Pure data-entry sections - always use DataEditModal (can't be AI-enhanced)
    // These are tag-based or simple data fields, not prose text
    const dataOnlySections = ['contact', 'skills', 'languages', 'language'];
    const isDataOnlySection = dataOnlySections.includes(sectionKey.toLowerCase());

    if (isDataOnlySection) {
      setIsEnhancing(false);
      const editableSection = mapToEditableSection(sectionKey);
      
      if (editableSection) {
        setDataEditModal({
          isOpen: true,
          section: editableSection,
          checklistItemId: item.id,
          checklistItemLabel: item.label,
        });
      } else {
        toast.error(`Cannot edit ${getSectionDisplayName(sectionKey)} section`);
      }
      return;
    }

    // Structural fixes - route to DataEditModal for in-place editing
    // These items require form editing (education dates, institution names, etc.)
    if (isStructuralFix(item.id)) {
      setIsEnhancing(false);
      const editableSection = mapToEditableSection(sectionKey);
      
      if (editableSection) {
        setDataEditModal({
          isOpen: true,
          section: editableSection,
          checklistItemId: item.id,
          checklistItemLabel: item.label,
        });
      } else {
        toast.error(`Cannot edit ${getSectionDisplayName(sectionKey)} section`);
      }
      return;
    }

    // Text-based sections (summary, experience, achievements, projects, education)
    // If empty, use DataEditModal to add initial data
    if (!originalText || originalText.trim().length === 0) {
      setIsEnhancing(false);
      const editableSection = mapToEditableSection(sectionKey);
      
      if (editableSection) {
        setDataEditModal({
          isOpen: true,
          section: editableSection,
          checklistItemId: item.id,
          checklistItemLabel: item.label,
        });
      } else {
        toast.error(`Cannot enhance empty ${getSectionDisplayName(sectionKey)} section`);
      }
      return;
    }

    // Section has content - use AI enhancement modal (context questions → improvement)
    setEnhancementModal({
      isOpen: true,
      sectionType,
      recommendation: `${item.label}: ${item.description}`,
      originalText,
      checklistItemId: item.id,
    });
    setIsEnhancing(false);
  };

  // Handle DataEditModal save
  const handleDataEditSave = async (
    generatedResumeUpdates: Partial<GeneratedResume>,
    resumeDataUpdates: Partial<ResumeData>
  ) => {
    try {
      await updateSectionAndSync(generatedResumeUpdates, resumeDataUpdates);
      toast.success('Changes saved and score updated!');
    } catch (err: any) {
      console.error('Error saving data edit:', err);
      toast.error(err.message || 'Failed to save changes');
      throw err;
    }
  };

  // Handle re-scoring for AI validation after save
  const handleRescore = async () => {
    if (!currentResumeId) return null;
    
    try {
      await scoreResume(currentResumeId);
      // Return the updated score from the store
      // Using a small delay to ensure store is updated
      await new Promise(resolve => setTimeout(resolve, 100));
      return useResumeStore.getState().currentScore;
    } catch (error) {
      console.error('Error re-scoring resume:', error);
      return null;
    }
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
      'dataquality': 'Data Quality',
    };
    return names[section.toLowerCase()] || section;
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

      {/* Guided Enhancement Modal - for AI-powered fixes */}
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

      {/* DataEditModal - for in-place manual editing (contact, empty sections) */}
      <DataEditModal
        isOpen={dataEditModal.isOpen}
        onClose={() => setDataEditModal({ isOpen: false, section: 'contact' })}
        section={dataEditModal.section}
        generatedResume={generatedResume || resume || null}
        resumeData={resumeData}
        onSave={handleDataEditSave}
        checklistItemId={dataEditModal.checklistItemId}
        checklistItemLabel={dataEditModal.checklistItemLabel}
        onRescore={handleRescore}
        initialValidationErrors={dataEditModal.initialValidationErrors}
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
