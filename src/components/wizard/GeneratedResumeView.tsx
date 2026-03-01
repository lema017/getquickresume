import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneratedResume } from '@/types';
import { SectionEnhancementModal } from './SectionEnhancementModal';
import { AchievementSuggestionsModal } from './AchievementSuggestionsModal';
import { EnhanceTextModal } from './EnhanceTextModal';
import { EnhanceProjectModal } from './EnhanceProjectModal';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { MonthYearPicker } from '@/components/MonthYearPicker';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  FileText,      // Resumen
  Briefcase,     // Experiencia
  Zap,          // Habilidades
  GraduationCap, // Educación
  Award,        // Certificaciones
  FolderKanban, // Proyectos
  Trophy,       // Logros
  Globe,        // Idiomas
  Sparkles,     // IA
  Edit2,        // Editar
  Star,         // Honores
  User,         // Contacto
  Save,         // Guardar
  X,            // Cancelar
  Plus,         // Agregar
  Trash2,       // Eliminar
  Wand2         // Mejorar
} from 'lucide-react';

// Parse duration string like "Jan 2020 - Present" into { startDate, endDate, isCurrent }
// Converts to "YYYY-MM" format for MonthYearPicker
const parseDurationToDateFields = (duration: string): { startDate?: string; endDate?: string; isCurrent?: boolean } => {
  if (!duration) return {};
  
  // Common "present/current/ongoing" indicators in English and Spanish
  const presentIndicators = ['present', 'current', 'presente', 'actual', 'ongoing', 'en progreso'];
  const isCurrentJob = presentIndicators.some(p => duration.toLowerCase().includes(p));
  
  // Split by common separators (must have space around the separator to avoid splitting YYYY-MM dates)
  const parts = duration.split(/\s+[-–]\s+/).map(p => p.trim());
  
  // Parse month year string to "YYYY-MM" format
  const parseMonthYear = (str: string): string | undefined => {
    if (!str) return undefined;
    
    // Already in YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(str)) return str;
    
    // Match "Jan 2020", "January 2020", "Ene 2020", "Enero 2020"
    const match = str.match(/^(\w+)\s+(\d{4})$/);
    if (!match) return undefined;
    
    const [, monthStr, year] = match;
    const monthMap: Record<string, string> = {
      // English
      jan: '01', january: '01', feb: '02', february: '02', mar: '03', march: '03',
      apr: '04', april: '04', may: '05', jun: '06', june: '06',
      jul: '07', july: '07', aug: '08', august: '08', sep: '09', sept: '09', september: '09',
      oct: '10', october: '10', nov: '11', november: '11', dec: '12', december: '12',
      // Spanish (shared abbreviations mar, jun, jul, oct, nov already defined above)
      ene: '01', enero: '01', febrero: '02', marzo: '03',
      abr: '04', abril: '04', mayo: '05', junio: '06',
      julio: '07', ago: '08', agosto: '08', septiembre: '09',
      octubre: '10', noviembre: '11', dic: '12', diciembre: '12'
    };
    
    const month = monthMap[monthStr.toLowerCase()];
    return month ? `${year}-${month}` : undefined;
  };
  
  const startDate = parts[0] ? parseMonthYear(parts[0]) : undefined;
  const endDate = !isCurrentJob && parts[1] ? parseMonthYear(parts[1]) : undefined;
  
  return { startDate, endDate, isCurrent: isCurrentJob };
};

interface GeneratedResumeViewProps {
  resume: GeneratedResume;
  onEdit?: (section: string) => void;
  onUpdateResume?: (updatedResume: GeneratedResume) => void;
}

// Memoized to prevent re-renders when parent state changes but props don't
export const GeneratedResumeView = memo(function GeneratedResumeView({ resume, onEdit, onUpdateResume }: GeneratedResumeViewProps) {
  const { t } = useTranslation();
  const { updateResumeSection, setGeneratedResume, currentResumeId, persistGeneratedResume, resumeData } = useResumeStore();
  const { user } = useAuthStore();
  
  // Handle resume section updates with persistence (no re-scoring)
  const handleUpdateSection = async (section: keyof GeneratedResume, updatedData: any) => {
    const updatedResume = { ...resume, [section]: updatedData };
    setGeneratedResume(updatedResume);
    if (onUpdateResume) {
      onUpdateResume(updatedResume);
    }
    // Persist to API without re-scoring (cost optimization per plan)
    try {
      await persistGeneratedResume();
    } catch (error) {
      console.error('Error persisting resume update:', error);
    }
  };
  
  // Check if user can use AI features (premium OR free user who hasn't used their quota)
  const canUseAIFeatures = user?.isPremium || !user?.freeResumeUsed;
  const [improvementModal, setImprovementModal] = useState<{
    isOpen: boolean;
    sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
    originalText: string;
  }>({
    isOpen: false,
    sectionType: 'summary',
    originalText: ''
  });

  // const handleImproveSection = (sectionType: typeof improvementModal.sectionType, originalText: string) => {
  //   setImprovementModal({
  //     isOpen: true,
  //     sectionType,
  //     originalText
  //   });
  // };

  const handleApproveImprovement = (improvedText: string) => {
    // TODO: Implementar actualización del resume con el texto mejorado
    console.log('Texto mejorado:', improvedText);
    // Aquí se actualizaría el estado del resume con el nuevo texto
  };

  const handleEnhancementComplete = async (sectionType: string, enhancedText: string) => {
    try {
      // Update the resume section in the store
      const updatedResume = updateResumeSection(sectionType, enhancedText);
      if (updatedResume) {
        setGeneratedResume(updatedResume);
        // Persist to API without re-scoring (cost optimization per plan)
        try {
          await persistGeneratedResume();
        } catch (persistError) {
          console.error('Error persisting resume update:', persistError);
        }
      }
    } catch (error) {
      console.error('Error updating resume section:', error);
    }
  };

  const handleCloseImprovement = () => {
    setImprovementModal({
      isOpen: false,
      sectionType: 'summary',
      originalText: ''
    });
  };
  return (
    <div className="space-y-6">

      {/* Header with Contact Info */}
      <ContactInfoSection 
        contactInfo={resume.contactInfo} 
        onUpdate={(data) => handleUpdateSection('contactInfo', data)}
        t={t}
      />
      
      {/* Professional Summary */}
      <SummarySection 
        summary={resume.professionalSummary} 
        onUpdate={(data) => handleUpdateSection('professionalSummary', data)}
        canUseAIFeatures={canUseAIFeatures} 
        resumeId={currentResumeId}
        language={(resumeData?.language as 'en' | 'es') || 'en'}
        t={t}
      />
      
      {/* Experience */}
      <ExperienceSection 
        experiences={resume.experience} 
        onUpdate={(data) => handleUpdateSection('experience', data)}
        canUseAIFeatures={canUseAIFeatures} 
        resumeId={currentResumeId}
        language={(resumeData?.language as 'en' | 'es') || 'en'}
        t={t}
      />
      
      {/* Skills */}
      <SkillsSection 
        skills={resume.skills} 
        onUpdate={(data) => handleUpdateSection('skills', data)}
        t={t}
      />
      
      {/* Education */}
      <EducationSection 
        education={resume.education} 
        onUpdate={(data) => handleUpdateSection('education', data)}
        canUseAIFeatures={canUseAIFeatures}
        resumeId={currentResumeId}
        language={(resumeData?.language as 'en' | 'es') || 'en'}
        t={t}
      />
      
      {/* Certifications */}
      <CertificationsSection 
        certifications={resume.certifications} 
        onUpdate={(data) => handleUpdateSection('certifications', data)}
        canUseAIFeatures={canUseAIFeatures}
        resumeId={currentResumeId}
        language={(resumeData?.language as 'en' | 'es') || 'en'}
        t={t}
      />
      
      {/* Projects */}
      <ProjectsSection 
        projects={resume.projects} 
        onUpdate={(data) => handleUpdateSection('projects', data)}
        canUseAIFeatures={canUseAIFeatures}
        resumeId={currentResumeId}
        language={(resumeData?.language as 'en' | 'es') || 'en'}
        t={t}
      />
      
      {/* General Achievements */}
      {resume.achievements.length > 0 && (
        <AchievementsSection 
          achievements={resume.achievements} 
          onUpdate={(data) => handleUpdateSection('achievements', data)}
          t={t}
        />
      )}
      
      {/* Languages */}
      <LanguagesSection 
        languages={resume.languages} 
        onUpdate={(data) => handleUpdateSection('languages', data)}
        canUseAIFeatures={canUseAIFeatures}
        resumeId={currentResumeId}
        language={(resumeData?.language as 'en' | 'es') || 'en'}
        t={t}
      />

      {/* Section Improvement Modal */}
      <SectionEnhancementModal
        isOpen={improvementModal.isOpen}
        onClose={handleCloseImprovement}
        sectionType={improvementModal.sectionType}
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
        resumeId={currentResumeId || undefined}
        language={(resumeData?.language as 'en' | 'es') || 'en'}
      />
    </div>
  );
});

// Contact Info Section
function ContactInfoSection({ 
  contactInfo, 
  onUpdate,
  t 
}: { 
  contactInfo: GeneratedResume['contactInfo']; 
  onUpdate: (data: GeneratedResume['contactInfo']) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(contactInfo);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(contactInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <User className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t('wizard.steps.preview.generatedResume.sections.contact.title')}
          </h2>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            {t('wizard.steps.preview.generatedResume.actions.edit')}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 text-sm flex items-center"
            >
              <Save className="h-4 w-4 mr-1" />
              {t('wizard.steps.preview.generatedResume.actions.save')}
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              {t('wizard.steps.preview.generatedResume.actions.cancel')}
            </button>
          </div>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('wizard.steps.preview.generatedResume.sections.contact.fullName')}
            </label>
            <input
              type="text"
              value={editData.fullName}
              onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('wizard.steps.preview.generatedResume.sections.contact.email')}
              </label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('wizard.steps.preview.generatedResume.sections.contact.phone')}
              </label>
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('wizard.steps.preview.generatedResume.sections.contact.location')}
              </label>
              <input
                type="text"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('wizard.steps.preview.generatedResume.sections.contact.linkedin')}
              </label>
              <input
                type="url"
                value={editData.linkedin || ''}
                onChange={(e) => setEditData({ ...editData, linkedin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {contactInfo.fullName}
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-gray-500 mb-4">
            <span>{contactInfo.email}</span>
            <span className="hidden sm:inline">•</span>
            <span>{contactInfo.phone}</span>
            <span className="hidden sm:inline">•</span>
            <span>{contactInfo.location}</span>
          </div>
          {contactInfo.linkedin && (
            <div className="mt-2">
              <a 
                href={contactInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
              >
                🔗 LinkedIn
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Professional Summary Section
function SummarySection({ 
  summary, 
  onUpdate, 
  canUseAIFeatures, 
  resumeId,
  language = 'en',
  t 
}: { 
  summary: string; 
  onUpdate: (data: string) => void;
  canUseAIFeatures?: boolean; 
  resumeId?: string | null;
  language?: 'en' | 'es';
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(summary);
  const [improvementModal, setImprovementModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(summary);
    setIsEditing(false);
  };

  const handleImproveSection = () => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    setImprovementModal(true);
  };

  const handleApproveImprovement = (improvedText: string) => {
    setEditData(improvedText);
    onUpdate(improvedText);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('wizard.steps.preview.generatedResume.sections.summary.title')}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleImproveSection}
              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              {t('wizard.steps.preview.generatedResume.actions.enhanceWithAI', { defaultValue: 'Enhance with AI' })}
            </button>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                {t('wizard.steps.preview.generatedResume.actions.edit')}
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {t('wizard.steps.preview.generatedResume.actions.save')}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4" />
                  {t('wizard.steps.preview.generatedResume.actions.cancel')}
                </button>
              </>
            )}
          </div>
        </div>
        {isEditing ? (
          <textarea
            value={editData}
            onChange={(e) => setEditData(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
            placeholder={t('wizard.steps.preview.generatedResume.sections.summary.placeholder')}
          />
        ) : (
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        )}
      </div>

      <SectionEnhancementModal
        isOpen={improvementModal}
        onClose={() => setImprovementModal(false)}
        sectionType="summary"
        originalText={summary}
        onApprove={handleApproveImprovement}
        resumeId={resumeId || undefined}
        language={language}
      />

      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </>
  );
}

// Experience Section
function ExperienceSection({ 
  experiences, 
  onUpdate, 
  canUseAIFeatures, 
  resumeId,
  language = 'en',
  t 
}: { 
  experiences: GeneratedResume['experience']; 
  onUpdate: (data: GeneratedResume['experience']) => void;
  canUseAIFeatures?: boolean; 
  resumeId?: string | null;
  language?: 'en' | 'es';
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['experience'][0] | null>(null);
  const [improvementModal, setImprovementModal] = useState<{
    isOpen: boolean;
    experienceIndex: number;
    originalText: string;
  }>({
    isOpen: false,
    experienceIndex: -1,
    originalText: ''
  });
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);
  
  // Achievement suggestions modal state
  const [achievementSuggestionsModal, setAchievementSuggestionsModal] = useState<{
    isOpen: boolean;
    jobTitle: string;
  }>({
    isOpen: false,
    jobTitle: ''
  });
  
  // Enhance text modal state for individual achievements
  const [enhanceTextModal, setEnhanceTextModal] = useState<{
    isOpen: boolean;
    achievementIndex: number;
    originalText: string;
    jobTitle: string;
  }>({
    isOpen: false,
    achievementIndex: -1,
    originalText: '',
    jobTitle: ''
  });

  // Helper function to format "YYYY-MM" to "Jan 2020"
  const formatMonthYear = (dateStr: string, lang: 'en' | 'es' = 'en'): string => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    if (!year || !month) return dateStr;
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'short', year: 'numeric' });
  };

  // Helper function to format duration from startDate/endDate/isCurrent
  const formatDuration = (startDate: string | undefined, endDate: string | undefined, isCurrent: boolean | undefined): string => {
    const start = formatMonthYear(startDate || '', language);
    if (!start) return '';
    if (isCurrent) return `${start} - ${language === 'es' ? 'Presente' : 'Present'}`;
    const end = formatMonthYear(endDate || '', language);
    if (!end) return start;
    return `${start} - ${end}`;
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const exp = experiences[index];
    // Parse duration to populate date fields if they're not already set
    const parsedDates = (!exp.startDate && exp.duration) ? parseDurationToDateFields(exp.duration) : {};
    setEditData({ 
      ...exp,
      startDate: exp.startDate || parsedDates.startDate || '',
      endDate: exp.endDate || parsedDates.endDate || '',
      isCurrent: exp.isCurrent ?? parsedDates.isCurrent ?? false
    });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedExperiences = [...experiences];
      // Format duration from raw date fields if they exist
      const formattedDuration = formatDuration(editData.startDate, editData.endDate, editData.isCurrent);
      updatedExperiences[editingIndex] = {
        ...editData,
        duration: formattedDuration || editData.duration // Use formatted if available, else keep existing
      };
      onUpdate(updatedExperiences);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  const handleImproveExperience = (index: number, description: string) => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    setImprovementModal({
      isOpen: true,
      experienceIndex: index,
      originalText: description
    });
  };

  const handleApproveImprovement = (improvedText: string) => {
    if (improvementModal.experienceIndex >= 0) {
      const updatedExperiences = [...experiences];
      updatedExperiences[improvementModal.experienceIndex] = {
        ...updatedExperiences[improvementModal.experienceIndex],
        description: improvedText
      };
      onUpdate(updatedExperiences);
    }
  };

  const updateEditAchievement = (idx: number, value: string) => {
    if (!editData) return;
    const newAchievements = [...editData.achievements];
    newAchievements[idx] = value;
    setEditData({ ...editData, achievements: newAchievements });
  };

  const addEditAchievement = () => {
    if (!editData) return;
    setEditData({ ...editData, achievements: [...editData.achievements, ''] });
  };

  const removeEditAchievement = (idx: number) => {
    if (!editData) return;
    const newAchievements = editData.achievements.filter((_, i) => i !== idx);
    setEditData({ ...editData, achievements: newAchievements });
  };

  // Add new experience
  const handleAddExperience = () => {
    const newExperience: GeneratedResume['experience'][0] = {
      title: '',
      company: '',
      duration: '',
      location: '', // Keep for type compatibility but not editable
      description: '', // AI-generated, not user-editable
      achievements: [],
      skills: [], // AI-generated
      impact: [], // AI-generated
      // Raw date fields for editing (matching Step3 format)
      startDate: '',
      endDate: '',
      isCurrent: false
    };
    const updatedExperiences = [...experiences, newExperience];
    onUpdate(updatedExperiences);
    // Auto-open in edit mode
    setEditingIndex(updatedExperiences.length - 1);
    setEditData(newExperience);
  };

  // Delete experience
  const handleDeleteExperience = (index: number) => {
    setDeleteConfirmIndex(index);
  };

  const confirmDelete = () => {
    if (deleteConfirmIndex !== null) {
      const updatedExperiences = experiences.filter((_, i) => i !== deleteConfirmIndex);
      onUpdate(updatedExperiences);
      setDeleteConfirmIndex(null);
      // Reset editing if we deleted the item being edited
      if (editingIndex === deleteConfirmIndex) {
        setEditingIndex(null);
        setEditData(null);
      } else if (editingIndex !== null && editingIndex > deleteConfirmIndex) {
        // Adjust editing index if needed
        setEditingIndex(editingIndex - 1);
      }
    }
  };

  // Achievement suggestions handlers
  const handleOpenAchievementSuggestions = () => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    if (!editData?.title) return;
    setAchievementSuggestionsModal({
      isOpen: true,
      jobTitle: editData.title
    });
  };

  const handleAddSuggestedAchievements = (suggestions: string[]) => {
    if (!editData) return;
    setEditData({
      ...editData,
      achievements: [...editData.achievements, ...suggestions]
    });
  };

  // Enhance individual achievement handlers
  const handleEnhanceAchievement = (achievementIndex: number, text: string) => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    if (!text.trim()) return;
    setEnhanceTextModal({
      isOpen: true,
      achievementIndex,
      originalText: text,
      jobTitle: editData?.title || ''
    });
  };

  const handleApproveEnhancedAchievement = (enhancedText: string) => {
    if (!editData || enhanceTextModal.achievementIndex < 0) return;
    const newAchievements = [...editData.achievements];
    newAchievements[enhanceTextModal.achievementIndex] = enhancedText;
    setEditData({ ...editData, achievements: newAchievements });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('wizard.steps.preview.generatedResume.sections.experience.title')}
            </h2>
          </div>
        </div>
      
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              {editingIndex === index && editData ? (
                // Edit mode
                <div className="space-y-4">
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.save')}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.cancel')}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.experience.jobTitle')}
                      </label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.experience.jobTitlePlaceholder', { defaultValue: 'e.g. Software Engineer' })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.experience.company')}
                      </label>
                      <input
                        type="text"
                        value={editData.company}
                        onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.experience.companyPlaceholder', { defaultValue: 'e.g. Google' })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.experience.startDate', { defaultValue: 'Start Date' })}
                      </label>
                      <MonthYearPicker
                        value={editData.startDate || ''}
                        onChange={(value: string) => setEditData({ ...editData, startDate: value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.experience.endDate', { defaultValue: 'End Date' })}
                      </label>
                      <MonthYearPicker
                        value={editData.endDate || ''}
                        onChange={(value: string) => setEditData({ ...editData, endDate: value })}
                        className="w-full"
                        disabled={editData.isCurrent}
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={editData.isCurrent || false}
                          onChange={(e) => setEditData({ ...editData, isCurrent: e.target.checked })}
                          className="mr-2"
                        />
                        {t('wizard.steps.preview.generatedResume.sections.experience.currentJob', { defaultValue: 'I currently work here' })}
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.experience.description')}
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                      placeholder={t('wizard.steps.preview.generatedResume.sections.experience.descriptionPlaceholder', { defaultValue: 'Describe your role and responsibilities...' })}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {t('wizard.steps.preview.generatedResume.sections.experience.achievements')}
                      </label>
                      {canUseAIFeatures && editData.title && (
                        <button
                          onClick={handleOpenAchievementSuggestions}
                          className="inline-flex items-center px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-md hover:from-purple-600 hover:to-blue-600 transition-all"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          {t('wizard.steps.preview.generatedResume.actions.suggestAchievements', { defaultValue: 'Suggest Achievements' })}
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {editData.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateEditAchievement(idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('wizard.steps.preview.generatedResume.sections.experience.achievementPlaceholder', { defaultValue: 'e.g. Increased sales by 25%...' })}
                          />
                          {canUseAIFeatures && achievement.trim() && (
                            <button
                              onClick={() => handleEnhanceAchievement(idx, achievement)}
                              className="text-purple-500 hover:text-purple-700 px-2 transition-colors"
                              title={t('wizard.steps.preview.generatedResume.actions.enhanceWithAI', { defaultValue: 'Enhance with AI' })}
                            >
                              <Wand2 className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeEditAchievement(idx)}
                            className="text-red-500 hover:text-red-700 px-2 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addEditAchievement}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        {t('wizard.steps.preview.generatedResume.sections.experience.addAchievement')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{exp.title || t('wizard.steps.preview.generatedResume.sections.experience.newExperience', { defaultValue: 'New Experience' })}</h3>
                      <p className="text-gray-600">{exp.company}{exp.company && exp.duration ? ' • ' : ''}{exp.duration}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-500">{exp.location}</p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      {canUseAIFeatures && exp.description && (
                        <button
                          onClick={() => handleImproveExperience(index, exp.description)}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          {t('wizard.steps.preview.generatedResume.actions.enhanceWithAI', { defaultValue: 'Enhance with AI' })}
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        {t('wizard.steps.preview.generatedResume.actions.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        title={t('common.delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                  )}
                  
                  {exp.achievements.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {t('wizard.steps.preview.generatedResume.sections.experience.achievements')}:
                      </h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {exp.skills.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {t('wizard.steps.preview.generatedResume.sections.experience.skills')}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add Experience Button */}
        <button
          onClick={handleAddExperience}
          className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          {t('wizard.steps.preview.generatedResume.actions.addExperience', { defaultValue: 'Add Experience' })}
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('wizard.steps.preview.generatedResume.actions.confirmDelete', { defaultValue: 'Confirm Delete' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('wizard.steps.preview.generatedResume.actions.deleteWarning', { defaultValue: 'This action cannot be undone. Are you sure you want to delete this item?' })}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmIndex(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <SectionEnhancementModal
        isOpen={improvementModal.isOpen}
        onClose={() => setImprovementModal({ isOpen: false, experienceIndex: -1, originalText: '' })}
        sectionType="experience"
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
        resumeId={resumeId || undefined}
        language={language}
      />

      <AchievementSuggestionsModal
        isOpen={achievementSuggestionsModal.isOpen}
        onClose={() => setAchievementSuggestionsModal({ isOpen: false, jobTitle: '' })}
        jobTitle={achievementSuggestionsModal.jobTitle}
        onSelect={handleAddSuggestedAchievements}
        language={language}
        resumeId={resumeId || undefined}
      />

      <EnhanceTextModal
        isOpen={enhanceTextModal.isOpen}
        onClose={() => setEnhanceTextModal({ isOpen: false, achievementIndex: -1, originalText: '', jobTitle: '' })}
        originalText={enhanceTextModal.originalText}
        jobTitle={enhanceTextModal.jobTitle}
        language={language}
        onApprove={handleApproveEnhancedAchievement}
        resumeId={resumeId || undefined}
      />

      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </>
  );
}

// Skills Section
function SkillsSection({ 
  skills, 
  onUpdate,
  t 
}: { 
  skills: GeneratedResume['skills']; 
  onUpdate: (data: GeneratedResume['skills']) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(skills);
  const [newSkill, setNewSkill] = useState({ technical: '', soft: '', tools: '' });

  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0;
  if (!hasSkills && !isEditing) return null;

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(skills);
    setIsEditing(false);
  };

  const addSkill = (type: 'technical' | 'soft' | 'tools') => {
    if (newSkill[type].trim()) {
      setEditData({
        ...editData,
        [type]: [...editData[type], newSkill[type].trim()]
      });
      setNewSkill({ ...newSkill, [type]: '' });
    }
  };

  const removeSkill = (type: 'technical' | 'soft' | 'tools', index: number) => {
    setEditData({
      ...editData,
      [type]: editData[type].filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Zap className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t('wizard.steps.preview.generatedResume.sections.skills.title')}
          </h2>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            {t('wizard.steps.preview.generatedResume.actions.edit')}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 text-sm flex items-center"
            >
              <Save className="h-4 w-4 mr-1" />
              {t('wizard.steps.preview.generatedResume.actions.save')}
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              {t('wizard.steps.preview.generatedResume.actions.cancel')}
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Technical Skills */}
        {(isEditing || skills.technical.length > 0) && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">
              {t('wizard.steps.preview.generatedResume.sections.skills.technical')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editData : skills).technical.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill('technical', index)} className="text-blue-600 hover:text-blue-800">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newSkill.technical}
                    onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill('technical')}
                    placeholder={t('wizard.steps.preview.generatedResume.sections.skills.addSkill')}
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm w-32"
                  />
                  <button onClick={() => addSkill('technical')} className="text-blue-600 hover:text-blue-800 text-sm">+</button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Soft Skills */}
        {(isEditing || skills.soft.length > 0) && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">
              {t('wizard.steps.preview.generatedResume.sections.skills.soft')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editData : skills).soft.map((skill, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill('soft', index)} className="text-purple-600 hover:text-purple-800">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newSkill.soft}
                    onChange={(e) => setNewSkill({ ...newSkill, soft: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill('soft')}
                    placeholder={t('wizard.steps.preview.generatedResume.sections.skills.addSkill')}
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm w-32"
                  />
                  <button onClick={() => addSkill('soft')} className="text-purple-600 hover:text-purple-800 text-sm">+</button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tools */}
        {(isEditing || skills.tools.length > 0) && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">
              {t('wizard.steps.preview.generatedResume.sections.skills.tools')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editData : skills).tools.map((tool, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {tool}
                  {isEditing && (
                    <button onClick={() => removeSkill('tools', index)} className="text-green-600 hover:text-green-800">
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newSkill.tools}
                    onChange={(e) => setNewSkill({ ...newSkill, tools: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill('tools')}
                    placeholder={t('wizard.steps.preview.generatedResume.sections.skills.addSkill')}
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm w-32"
                  />
                  <button onClick={() => addSkill('tools')} className="text-green-600 hover:text-green-800 text-sm">+</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Education Section
function EducationSection({ 
  education, 
  onUpdate,
  canUseAIFeatures,
  resumeId,
  language = 'en',
  t 
}: { 
  education: GeneratedResume['education']; 
  onUpdate: (data: GeneratedResume['education']) => void;
  canUseAIFeatures?: boolean;
  resumeId?: string | null;
  language?: 'en' | 'es';
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['education'][0] | null>(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [improvementModal, setImprovementModal] = useState<{
    isOpen: boolean;
    educationIndex: number;
    originalText: string;
  }>({
    isOpen: false,
    educationIndex: -1,
    originalText: ''
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...education[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedEducation = [...education];
      // Format duration from graduation year if it exists
      const formattedDuration = editData.graduationYear 
        ? (language === 'es' ? `Clase de ${editData.graduationYear}` : `Class of ${editData.graduationYear}`)
        : editData.duration;
      updatedEducation[editingIndex] = {
        ...editData,
        duration: formattedDuration || editData.duration
      };
      onUpdate(updatedEducation);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  // Add new education
  const handleAddEducation = () => {
    const newEducation: GeneratedResume['education'][0] = {
      degree: '',
      institution: '',
      field: '',
      duration: '',
      gpa: '', // Keep for type compatibility but not editable
      relevantCoursework: [],
      honors: [],
      // Raw date field for editing (matching Step4 format)
      graduationYear: ''
    };
    const updatedEducation = [...education, newEducation];
    onUpdate(updatedEducation);
    // Auto-open in edit mode
    setEditingIndex(updatedEducation.length - 1);
    setEditData(newEducation);
  };

  // Delete education
  const handleDeleteEducation = (index: number) => {
    setDeleteConfirmIndex(index);
  };

  const confirmDelete = () => {
    if (deleteConfirmIndex !== null) {
      const updatedEducation = education.filter((_, i) => i !== deleteConfirmIndex);
      onUpdate(updatedEducation);
      setDeleteConfirmIndex(null);
      if (editingIndex === deleteConfirmIndex) {
        setEditingIndex(null);
        setEditData(null);
      } else if (editingIndex !== null && editingIndex > deleteConfirmIndex) {
        setEditingIndex(editingIndex - 1);
      }
    }
  };

  // AI Enhancement
  const handleEnhanceEducation = (index: number) => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    const edu = education[index];
    const textToEnhance = `${edu.degree} in ${edu.field} at ${edu.institution}`;
    setImprovementModal({
      isOpen: true,
      educationIndex: index,
      originalText: textToEnhance
    });
  };

  const handleApproveImprovement = (improvedText: string) => {
    // For education, we can update the degree description or add to honors/coursework
    // This is a simplified implementation - you may want to parse the improved text
    if (improvementModal.educationIndex >= 0) {
      const updatedEducation = [...education];
      // Add the improvement as an honor if it's meaningful
      const currentHonors = updatedEducation[improvementModal.educationIndex].honors || [];
      updatedEducation[improvementModal.educationIndex] = {
        ...updatedEducation[improvementModal.educationIndex],
        honors: [...currentHonors, improvedText]
      };
      onUpdate(updatedEducation);
    }
  };

  // Coursework management
  const addCoursework = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      relevantCoursework: [...(editData.relevantCoursework || []), '']
    });
  };

  const updateCoursework = (idx: number, value: string) => {
    if (!editData) return;
    const newCoursework = [...(editData.relevantCoursework || [])];
    newCoursework[idx] = value;
    setEditData({ ...editData, relevantCoursework: newCoursework });
  };

  const removeCoursework = (idx: number) => {
    if (!editData) return;
    const newCoursework = (editData.relevantCoursework || []).filter((_, i) => i !== idx);
    setEditData({ ...editData, relevantCoursework: newCoursework });
  };

  // Honors management
  const addHonor = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      honors: [...(editData.honors || []), '']
    });
  };

  const updateHonor = (idx: number, value: string) => {
    if (!editData) return;
    const newHonors = [...(editData.honors || [])];
    newHonors[idx] = value;
    setEditData({ ...editData, honors: newHonors });
  };

  const removeHonor = (idx: number) => {
    if (!editData) return;
    const newHonors = (editData.honors || []).filter((_, i) => i !== idx);
    setEditData({ ...editData, honors: newHonors });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('wizard.steps.preview.generatedResume.sections.education.title')}
            </h2>
          </div>
        </div>
        
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4">
              {editingIndex === index && editData ? (
                // Edit mode
                <div className="space-y-4">
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.save')}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.cancel')}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.education.degree')}
                      </label>
                      <input
                        type="text"
                        value={editData.degree}
                        onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.education.degreePlaceholder', { defaultValue: 'e.g. Bachelor of Science' })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.education.institution')}
                      </label>
                      <input
                        type="text"
                        value={editData.institution}
                        onChange={(e) => setEditData({ ...editData, institution: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.education.institutionPlaceholder', { defaultValue: 'e.g. MIT' })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.education.field')}
                      </label>
                      <input
                        type="text"
                        value={editData.field}
                        onChange={(e) => setEditData({ ...editData, field: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.education.fieldPlaceholder', { defaultValue: 'e.g. Computer Science' })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.education.graduationYear', { defaultValue: 'Graduation Year' })}
                      </label>
                      <input
                        type="number"
                        value={editData.graduationYear || ''}
                        onChange={(e) => setEditData({ ...editData, graduationYear: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.education.graduationYearPlaceholder', { defaultValue: 'e.g. 2022' })}
                        min="1950"
                        max="2100"
                      />
                    </div>
                  </div>
                  {/* Relevant Coursework */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.education.coursework')}
                    </label>
                    <div className="space-y-2">
                      {(editData.relevantCoursework || []).map((course, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={course}
                            onChange={(e) => updateCoursework(idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('wizard.steps.preview.generatedResume.sections.education.courseworkPlaceholder', { defaultValue: 'e.g. Data Structures' })}
                          />
                          <button
                            onClick={() => removeCoursework(idx)}
                            className="text-red-500 hover:text-red-700 px-2 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addCoursework}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        {t('wizard.steps.preview.generatedResume.sections.education.addCoursework', { defaultValue: 'Add Coursework' })}
                      </button>
                    </div>
                  </div>

                  {/* Honors */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.education.honors')}
                    </label>
                    <div className="space-y-2">
                      {(editData.honors || []).map((honor, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={honor}
                            onChange={(e) => updateHonor(idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder={t('wizard.steps.preview.generatedResume.sections.education.honorPlaceholder', { defaultValue: 'e.g. Dean\'s List' })}
                          />
                          <button
                            onClick={() => removeHonor(idx)}
                            className="text-red-500 hover:text-red-700 px-2 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addHonor}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        {t('wizard.steps.preview.generatedResume.sections.education.addHonor', { defaultValue: 'Add Honor' })}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree || t('wizard.steps.preview.generatedResume.sections.education.newEducation', { defaultValue: 'New Education' })}</h3>
                      <p className="text-gray-600">{edu.institution}{edu.institution && edu.field ? ' • ' : ''}{edu.field}</p>
                      {edu.duration && <p className="text-gray-500 text-sm">{edu.duration}</p>}
                    </div>
                    <div className="flex gap-2 items-center">
                      {canUseAIFeatures && edu.degree && (
                        <button
                          onClick={() => handleEnhanceEducation(index)}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          {t('wizard.steps.preview.generatedResume.actions.enhanceWithAI', { defaultValue: 'Enhance with AI' })}
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        {t('wizard.steps.preview.generatedResume.actions.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        title={t('common.delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mt-1">
                      {t('wizard.steps.preview.generatedResume.sections.education.gpa')}: {edu.gpa}
                    </p>
                  )}
                  
                  {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-gray-800 text-sm mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.education.coursework')}:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {edu.relevantCoursework?.map((course, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {edu.honors && edu.honors.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium text-gray-800 text-sm mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.education.honors')}:
                      </h4>
                      <ul className="space-y-1">
                        {edu.honors?.map((honor, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <Star className="h-4 w-4 text-yellow-500 mr-2" />
                            {honor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add Education Button */}
        <button
          onClick={handleAddEducation}
          className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          {t('wizard.steps.preview.generatedResume.actions.addEducation', { defaultValue: 'Add Education' })}
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('wizard.steps.preview.generatedResume.actions.confirmDelete', { defaultValue: 'Confirm Delete' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('wizard.steps.preview.generatedResume.actions.deleteWarning', { defaultValue: 'This action cannot be undone. Are you sure you want to delete this item?' })}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmIndex(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <SectionEnhancementModal
        isOpen={improvementModal.isOpen}
        onClose={() => setImprovementModal({ isOpen: false, educationIndex: -1, originalText: '' })}
        sectionType="education"
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
        resumeId={resumeId || undefined}
        language={language}
      />

      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </>
  );
}

// Certifications Section
function CertificationsSection({ 
  certifications, 
  onUpdate,
  canUseAIFeatures,
  resumeId,
  language = 'en',
  t 
}: { 
  certifications: GeneratedResume['certifications']; 
  onUpdate: (data: GeneratedResume['certifications']) => void;
  canUseAIFeatures?: boolean;
  resumeId?: string | null;
  language?: 'en' | 'es';
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['certifications'][0] | null>(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [improvementModal, setImprovementModal] = useState<{
    isOpen: boolean;
    certificationIndex: number;
    originalText: string;
  }>({
    isOpen: false,
    certificationIndex: -1,
    originalText: ''
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...certifications[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedCertifications = [...certifications];
      updatedCertifications[editingIndex] = editData;
      onUpdate(updatedCertifications);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  // Add new certification
  const handleAddCertification = () => {
    const newCertification: GeneratedResume['certifications'][0] = {
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: '', // Keep for type compatibility but not editable
      skills: [] // AI-generated, not user-editable
    };
    const updatedCertifications = [...certifications, newCertification];
    onUpdate(updatedCertifications);
    // Auto-open in edit mode
    setEditingIndex(updatedCertifications.length - 1);
    setEditData(newCertification);
  };

  // Delete certification
  const handleDeleteCertification = (index: number) => {
    setDeleteConfirmIndex(index);
  };

  const confirmDelete = () => {
    if (deleteConfirmIndex !== null) {
      const updatedCertifications = certifications.filter((_, i) => i !== deleteConfirmIndex);
      onUpdate(updatedCertifications);
      setDeleteConfirmIndex(null);
      if (editingIndex === deleteConfirmIndex) {
        setEditingIndex(null);
        setEditData(null);
      } else if (editingIndex !== null && editingIndex > deleteConfirmIndex) {
        setEditingIndex(editingIndex - 1);
      }
    }
  };

  // AI Enhancement
  const handleEnhanceCertification = (index: number) => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    const cert = certifications[index];
    const textToEnhance = `${cert.name} from ${cert.issuer}`;
    setImprovementModal({
      isOpen: true,
      certificationIndex: index,
      originalText: textToEnhance
    });
  };

  const handleApproveImprovement = (improvedText: string) => {
    if (improvementModal.certificationIndex >= 0) {
      const updatedCertifications = [...certifications];
      // Add AI-suggested skills based on the certification
      const currentSkills = updatedCertifications[improvementModal.certificationIndex].skills || [];
      // Parse improved text as a skill suggestion
      if (!currentSkills.includes(improvedText)) {
        updatedCertifications[improvementModal.certificationIndex] = {
          ...updatedCertifications[improvementModal.certificationIndex],
          skills: [...currentSkills, improvedText]
        };
        onUpdate(updatedCertifications);
      }
    }
  };

  // Skills management
  const addSkill = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      skills: [...(editData.skills || []), '']
    });
  };

  const updateSkill = (idx: number, value: string) => {
    if (!editData) return;
    const newSkills = [...(editData.skills || [])];
    newSkills[idx] = value;
    setEditData({ ...editData, skills: newSkills });
  };

  const removeSkill = (idx: number) => {
    if (!editData) return;
    const newSkills = (editData.skills || []).filter((_, i) => i !== idx);
    setEditData({ ...editData, skills: newSkills });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('wizard.steps.preview.generatedResume.sections.certifications.title')}
            </h2>
          </div>
        </div>
        
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="border-l-4 border-yellow-200 pl-4">
              {editingIndex === index && editData ? (
                // Edit mode
                <div className="space-y-4">
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.save')}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.cancel')}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.certifications.name')}
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.certifications.namePlaceholder', { defaultValue: 'e.g. AWS Solutions Architect' })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.certifications.issuer')}
                      </label>
                      <input
                        type="text"
                        value={editData.issuer}
                        onChange={(e) => setEditData({ ...editData, issuer: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.certifications.issuerPlaceholder', { defaultValue: 'e.g. Amazon Web Services' })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.certifications.date')}
                      </label>
                      <input
                        type="text"
                        value={editData.date}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.certifications.datePlaceholder', { defaultValue: 'e.g. Jan 2024' })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.certifications.credentialId')}
                      </label>
                      <input
                        type="text"
                        value={editData.credentialId || ''}
                        onChange={(e) => setEditData({ ...editData, credentialId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('wizard.steps.preview.generatedResume.sections.certifications.credentialIdPlaceholder', { defaultValue: 'e.g. ABC123XYZ' })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name || t('wizard.steps.preview.generatedResume.sections.certifications.newCertification', { defaultValue: 'New Certification' })}</h3>
                      <p className="text-gray-600">{cert.issuer}{cert.issuer && cert.date ? ' • ' : ''}{cert.date}</p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>
                      )}
                    </div>
                    <div className="flex gap-2 items-center">
                      {canUseAIFeatures && cert.name && (
                        <button
                          onClick={() => handleEnhanceCertification(index)}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          {t('wizard.steps.preview.generatedResume.actions.enhanceWithAI', { defaultValue: 'Enhance with AI' })}
                        </button>
                      )}
                      {cert.url && (
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          🔗
                        </a>
                      )}
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        {t('wizard.steps.preview.generatedResume.actions.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteCertification(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        title={t('common.delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, idx) => (
                          <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add Certification Button */}
        <button
          onClick={handleAddCertification}
          className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          {t('wizard.steps.preview.generatedResume.actions.addCertification', { defaultValue: 'Add Certification' })}
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('wizard.steps.preview.generatedResume.actions.confirmDelete', { defaultValue: 'Confirm Delete' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('wizard.steps.preview.generatedResume.actions.deleteWarning', { defaultValue: 'This action cannot be undone. Are you sure you want to delete this item?' })}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmIndex(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <SectionEnhancementModal
        isOpen={improvementModal.isOpen}
        onClose={() => setImprovementModal({ isOpen: false, certificationIndex: -1, originalText: '' })}
        sectionType="certification"
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
        resumeId={resumeId || undefined}
        language={language}
      />

      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </>
  );
}

// Projects Section
function ProjectsSection({ 
  projects, 
  onUpdate,
  canUseAIFeatures,
  resumeId,
  language = 'en',
  t 
}: { 
  projects: GeneratedResume['projects']; 
  onUpdate: (data: GeneratedResume['projects']) => void;
  canUseAIFeatures?: boolean;
  resumeId?: string | null;
  language?: 'en' | 'es';
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['projects'][0] | null>(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [enhanceProjectModal, setEnhanceProjectModal] = useState<{
    isOpen: boolean;
    projectIndex: number;
    projectName: string;
    originalDescription: string;
  }>({
    isOpen: false,
    projectIndex: -1,
    projectName: '',
    originalDescription: ''
  });

  // Helper function to format "YYYY-MM" to "Jan 2020"
  const formatMonthYear = (dateStr: string, lang: 'en' | 'es' = 'en'): string => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    if (!year || !month) return dateStr;
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'short', year: 'numeric' });
  };

  // Helper function to format duration from startDate/endDate/isOngoing
  const formatDuration = (startDate: string | undefined, endDate: string | undefined, isOngoing: boolean | undefined): string => {
    const start = formatMonthYear(startDate || '', language);
    if (!start) return '';
    if (isOngoing) return `${start} - ${language === 'es' ? 'En progreso' : 'Ongoing'}`;
    const end = formatMonthYear(endDate || '', language);
    if (!end) return start;
    return `${start} - ${end}`;
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const project = projects[index];
    // Parse duration to populate date fields if they're not already set
    const parsedDates = (!project.startDate && project.duration) ? parseDurationToDateFields(project.duration) : {};
    setEditData({ 
      ...project,
      startDate: project.startDate || parsedDates.startDate || '',
      endDate: project.endDate || parsedDates.endDate || '',
      isOngoing: project.isOngoing ?? parsedDates.isCurrent ?? false
    });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedProjects = [...projects];
      // Format duration from raw date fields if they exist
      const formattedDuration = formatDuration(editData.startDate, editData.endDate, editData.isOngoing);
      updatedProjects[editingIndex] = {
        ...editData,
        duration: formattedDuration || editData.duration // Use formatted if available, else keep existing
      };
      onUpdate(updatedProjects);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  // Add new project
  const handleAddProject = () => {
    const newProject: GeneratedResume['projects'][0] = {
      name: '',
      duration: '',
      description: '',
      technologies: [],
      url: '',
      achievements: [],
      impact: '',
      startDate: '',
      endDate: '',
      isOngoing: false
    };
    const updatedProjects = [...projects, newProject];
    onUpdate(updatedProjects);
    // Auto-open in edit mode
    setEditingIndex(updatedProjects.length - 1);
    setEditData(newProject);
  };

  // Delete project
  const handleDeleteProject = (index: number) => {
    setDeleteConfirmIndex(index);
  };

  const confirmDelete = () => {
    if (deleteConfirmIndex !== null) {
      const updatedProjects = projects.filter((_, i) => i !== deleteConfirmIndex);
      onUpdate(updatedProjects);
      setDeleteConfirmIndex(null);
      if (editingIndex === deleteConfirmIndex) {
        setEditingIndex(null);
        setEditData(null);
      } else if (editingIndex !== null && editingIndex > deleteConfirmIndex) {
        setEditingIndex(editingIndex - 1);
      }
    }
  };

  // AI Enhancement for project description
  const handleEnhanceProject = (index: number) => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    const project = projects[index];
    if (!project.description) return;
    setEnhanceProjectModal({
      isOpen: true,
      projectIndex: index,
      projectName: project.name,
      originalDescription: project.description
    });
  };

  const handleApproveEnhancedDescription = (enhancedDescription: string) => {
    if (enhanceProjectModal.projectIndex >= 0) {
      const updatedProjects = [...projects];
      updatedProjects[enhanceProjectModal.projectIndex] = {
        ...updatedProjects[enhanceProjectModal.projectIndex],
        description: enhancedDescription
      };
      onUpdate(updatedProjects);
    }
  };

  // Technologies management
  const addTechnology = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      technologies: [...(editData.technologies || []), '']
    });
  };

  const updateTechnology = (idx: number, value: string) => {
    if (!editData) return;
    const newTechs = [...(editData.technologies || [])];
    newTechs[idx] = value;
    setEditData({ ...editData, technologies: newTechs });
  };

  const removeTechnology = (idx: number) => {
    if (!editData) return;
    const newTechs = (editData.technologies || []).filter((_, i) => i !== idx);
    setEditData({ ...editData, technologies: newTechs });
  };

  // Achievements management
  const addAchievement = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      achievements: [...(editData.achievements || []), '']
    });
  };

  const updateAchievement = (idx: number, value: string) => {
    if (!editData) return;
    const newAchievements = [...(editData.achievements || [])];
    newAchievements[idx] = value;
    setEditData({ ...editData, achievements: newAchievements });
  };

  const removeAchievement = (idx: number) => {
    if (!editData) return;
    const newAchievements = (editData.achievements || []).filter((_, i) => i !== idx);
    setEditData({ ...editData, achievements: newAchievements });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FolderKanban className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('wizard.steps.preview.generatedResume.sections.projects.title')}
            </h2>
          </div>
        </div>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="border-l-4 border-green-200 pl-4">
              {editingIndex === index && editData ? (
                // Edit mode
                <div className="space-y-4">
                  <div className="flex justify-end gap-2 mb-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.save')}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.cancel')}
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.projects.name')}
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('wizard.steps.preview.generatedResume.sections.projects.namePlaceholder', { defaultValue: 'e.g. E-commerce Platform' })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.projects.startDate', { defaultValue: 'Start Date' })}
                      </label>
                      <MonthYearPicker
                        value={editData.startDate || ''}
                        onChange={(value: string) => setEditData({ ...editData, startDate: value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.projects.endDate', { defaultValue: 'End Date' })}
                      </label>
                      <MonthYearPicker
                        value={editData.endDate || ''}
                        onChange={(value: string) => setEditData({ ...editData, endDate: value })}
                        className="w-full"
                        disabled={editData.isOngoing}
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={editData.isOngoing || false}
                          onChange={(e) => setEditData({ ...editData, isOngoing: e.target.checked })}
                          className="mr-2"
                        />
                        {t('wizard.steps.preview.generatedResume.sections.projects.ongoing', { defaultValue: 'Ongoing project' })}
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.projects.url', { defaultValue: 'Project URL' })}
                    </label>
                    <input
                      type="text"
                      value={editData.url || ''}
                      onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('wizard.steps.preview.generatedResume.sections.projects.urlPlaceholder', { defaultValue: 'e.g. https://github.com/...' })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.projects.description')}
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                      placeholder={t('wizard.steps.preview.generatedResume.sections.projects.descriptionPlaceholder', { defaultValue: 'Describe what you built and its impact...' })}
                    />
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{project.name || t('wizard.steps.preview.generatedResume.sections.projects.newProject', { defaultValue: 'New Project' })}</h3>
                      {project.duration && <p className="text-gray-600">{project.duration}</p>}
                    </div>
                    <div className="flex gap-2 items-center">
                      {canUseAIFeatures && project.description && (
                        <button
                          onClick={() => handleEnhanceProject(index)}
                          className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Sparkles className="h-4 w-4 mr-1" />
                          {t('wizard.steps.preview.generatedResume.actions.enhanceWithAI', { defaultValue: 'Enhance with AI' })}
                        </button>
                      )}
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          🔗 {t('wizard.steps.preview.generatedResume.sections.projects.viewProject')}
                        </a>
                      )}
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        {t('wizard.steps.preview.generatedResume.actions.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteProject(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        title={t('common.delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {project.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {t('wizard.steps.preview.generatedResume.sections.projects.technologies')}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {t('wizard.steps.preview.generatedResume.sections.projects.achievements')}:
                      </h4>
                      <ul className="space-y-1">
                        {project.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add Project Button */}
        <button
          onClick={handleAddProject}
          className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          {t('wizard.steps.preview.generatedResume.actions.addProject', { defaultValue: 'Add Project' })}
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('wizard.steps.preview.generatedResume.actions.confirmDelete', { defaultValue: 'Confirm Delete' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('wizard.steps.preview.generatedResume.actions.deleteWarning', { defaultValue: 'This action cannot be undone. Are you sure you want to delete this item?' })}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmIndex(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <EnhanceProjectModal
        isOpen={enhanceProjectModal.isOpen}
        onClose={() => setEnhanceProjectModal({ isOpen: false, projectIndex: -1, projectName: '', originalDescription: '' })}
        projectName={enhanceProjectModal.projectName}
        originalText={enhanceProjectModal.originalDescription}
        language={language}
        onApprove={handleApproveEnhancedDescription}
        resumeId={resumeId || undefined}
      />

      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </>
  );
}

// Achievements Section
function AchievementsSection({ 
  achievements, 
  onUpdate,
  t 
}: { 
  achievements: string[]; 
  onUpdate: (data: string[]) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<string[]>(achievements);

  const handleSave = () => {
    onUpdate(editData.filter(a => a.trim()));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(achievements);
    setIsEditing(false);
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...editData];
    newAchievements[index] = value;
    setEditData(newAchievements);
  };

  const addAchievement = () => {
    setEditData([...editData, '']);
  };

  const removeAchievement = (index: number) => {
    setEditData(editData.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            {t('wizard.steps.preview.generatedResume.sections.achievements.title')}
          </h2>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            {t('wizard.steps.preview.generatedResume.actions.edit')}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-800 text-sm flex items-center"
            >
              <Save className="h-4 w-4 mr-1" />
              {t('wizard.steps.preview.generatedResume.actions.save')}
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
            >
              <X className="h-4 w-4 mr-1" />
              {t('wizard.steps.preview.generatedResume.actions.cancel')}
            </button>
          </div>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          {editData.map((achievement, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => updateAchievement(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => removeAchievement(index)}
                className="text-red-500 hover:text-red-700 px-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addAchievement}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start">
              <Star className="h-4 w-4 text-yellow-500 mr-3 mt-1" />
              <p className="text-gray-700 leading-relaxed">{achievement}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Languages Section
function LanguagesSection({ 
  languages, 
  onUpdate,
  canUseAIFeatures,
  resumeId,
  language = 'en',
  t 
}: { 
  languages: GeneratedResume['languages']; 
  onUpdate: (data: GeneratedResume['languages']) => void;
  canUseAIFeatures?: boolean;
  resumeId?: string | null;
  language?: 'en' | 'es';
  t: (key: string, options?: Record<string, unknown>) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['languages'][0] | null>(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [improvementModal, setImprovementModal] = useState<{
    isOpen: boolean;
    languageIndex: number;
    originalText: string;
  }>({
    isOpen: false,
    languageIndex: -1,
    originalText: ''
  });

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'native': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...languages[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedLanguages = [...languages];
      updatedLanguages[editingIndex] = editData;
      onUpdate(updatedLanguages);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  // Add new language
  const handleAddLanguage = () => {
    const newLanguage: GeneratedResume['languages'][0] = {
      language: '',
      level: 'Intermediate',
      certifications: [] // AI-generated, not user-editable
    };
    const updatedLanguages = [...languages, newLanguage];
    onUpdate(updatedLanguages);
    // Auto-open in edit mode
    setEditingIndex(updatedLanguages.length - 1);
    setEditData(newLanguage);
  };

  // Delete language
  const handleDeleteLanguage = (index: number) => {
    setDeleteConfirmIndex(index);
  };

  const confirmDelete = () => {
    if (deleteConfirmIndex !== null) {
      const updatedLanguages = languages.filter((_, i) => i !== deleteConfirmIndex);
      onUpdate(updatedLanguages);
      setDeleteConfirmIndex(null);
      if (editingIndex === deleteConfirmIndex) {
        setEditingIndex(null);
        setEditData(null);
      } else if (editingIndex !== null && editingIndex > deleteConfirmIndex) {
        setEditingIndex(editingIndex - 1);
      }
    }
  };

  // AI Enhancement
  const handleEnhanceLanguage = (index: number) => {
    if (!canUseAIFeatures) {
      setShowPremiumModal(true);
      return;
    }
    const lang = languages[index];
    const textToEnhance = `${lang.language} - ${lang.level}`;
    setImprovementModal({
      isOpen: true,
      languageIndex: index,
      originalText: textToEnhance
    });
  };

  const handleApproveImprovement = (improvedText: string) => {
    if (improvementModal.languageIndex >= 0) {
      const updatedLanguages = [...languages];
      // Add as certification
      const currentCerts = updatedLanguages[improvementModal.languageIndex].certifications || [];
      if (!currentCerts.includes(improvedText)) {
        updatedLanguages[improvementModal.languageIndex] = {
          ...updatedLanguages[improvementModal.languageIndex],
          certifications: [...currentCerts, improvedText]
        };
        onUpdate(updatedLanguages);
      }
    }
  };

  // Certifications management
  const addCertification = () => {
    if (!editData) return;
    setEditData({
      ...editData,
      certifications: [...(editData.certifications || []), '']
    });
  };

  const updateCertification = (idx: number, value: string) => {
    if (!editData) return;
    const newCerts = [...(editData.certifications || [])];
    newCerts[idx] = value;
    setEditData({ ...editData, certifications: newCerts });
  };

  const removeCertification = (idx: number) => {
    if (!editData) return;
    const newCerts = (editData.certifications || []).filter((_, i) => i !== idx);
    setEditData({ ...editData, certifications: newCerts });
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('wizard.steps.preview.generatedResume.sections.languages.title')}
            </h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              {editingIndex === index && editData ? (
                // Edit mode
                <div className="space-y-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.save')}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t('wizard.steps.preview.generatedResume.actions.cancel')}
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.languages.language')}
                    </label>
                    <input
                      type="text"
                      value={editData.language}
                      onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('wizard.steps.preview.generatedResume.sections.languages.languagePlaceholder', { defaultValue: 'e.g. Spanish' })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.languages.level')}
                    </label>
                    <select
                      value={editData.level}
                      onChange={(e) => setEditData({ ...editData, level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Native">{t('wizard.steps.preview.generatedResume.sections.languages.levels.native', { defaultValue: 'Native' })}</option>
                      <option value="Advanced">{t('wizard.steps.preview.generatedResume.sections.languages.levels.advanced', { defaultValue: 'Advanced' })}</option>
                      <option value="Intermediate">{t('wizard.steps.preview.generatedResume.sections.languages.levels.intermediate', { defaultValue: 'Intermediate' })}</option>
                      <option value="Basic">{t('wizard.steps.preview.generatedResume.sections.languages.levels.basic', { defaultValue: 'Basic' })}</option>
                    </select>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{lang.language || t('wizard.steps.preview.generatedResume.sections.languages.newLanguage', { defaultValue: 'New Language' })}</h4>
                    {lang.certifications && lang.certifications.length > 0 && (
                      <p className="text-sm text-gray-500">{lang.certifications.join(', ')}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(lang.level)}`}>
                      {lang.level}
                    </span>
                    {canUseAIFeatures && lang.language && (
                      <button
                        onClick={() => handleEnhanceLanguage(index)}
                        className="text-purple-500 hover:text-purple-700 transition-colors"
                        title={t('wizard.steps.preview.generatedResume.actions.enhanceWithAI', { defaultValue: 'Enhance with AI' })}
                      >
                        <Sparkles className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLanguage(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title={t('common.delete')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Language Button */}
        <button
          onClick={handleAddLanguage}
          className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          {t('wizard.steps.preview.generatedResume.actions.addLanguage', { defaultValue: 'Add Language' })}
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('wizard.steps.preview.generatedResume.actions.confirmDelete', { defaultValue: 'Confirm Delete' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('wizard.steps.preview.generatedResume.actions.deleteWarning', { defaultValue: 'This action cannot be undone. Are you sure you want to delete this item?' })}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmIndex(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <SectionEnhancementModal
        isOpen={improvementModal.isOpen}
        onClose={() => setImprovementModal({ isOpen: false, languageIndex: -1, originalText: '' })}
        sectionType="language"
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
        resumeId={resumeId || undefined}
        language={language}
      />

      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="aiSuggestions"
      />
    </>
  );
}
