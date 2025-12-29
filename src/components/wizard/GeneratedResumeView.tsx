import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneratedResume } from '@/types';
import { SectionImprovementModal } from './SectionImprovementModal';
import { PremiumActionModal } from '@/components/PremiumActionModal';
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
  X             // Cancelar
} from 'lucide-react';

interface GeneratedResumeViewProps {
  resume: GeneratedResume;
  onEdit?: (section: string) => void;
  onUpdateResume?: (updatedResume: GeneratedResume) => void;
}

export function GeneratedResumeView({ resume, onEdit, onUpdateResume }: GeneratedResumeViewProps) {
  const { t } = useTranslation();
  const { updateResumeSection, setGeneratedResume, currentResumeId } = useResumeStore();
  const { user } = useAuthStore();
  
  // Handle resume section updates
  const handleUpdateSection = (section: keyof GeneratedResume, updatedData: any) => {
    const updatedResume = { ...resume, [section]: updatedData };
    setGeneratedResume(updatedResume);
    if (onUpdateResume) {
      onUpdateResume(updatedResume);
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

  const handleEnhancementComplete = (sectionType: string, enhancedText: string) => {
    try {
      // Update the resume section in the store
      const updatedResume = updateResumeSection(sectionType, enhancedText);
      if (updatedResume) {
        setGeneratedResume(updatedResume);
        // Optionally trigger re-scoring after enhancement
        // if (currentResumeId) {
        //   setTimeout(() => {
        //     scoreResume(currentResumeId).catch(err => console.error('Error re-scoring:', err));
        //   }, 1000);
        // }
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
        t={t}
      />
      
      {/* Experience */}
      <ExperienceSection 
        experiences={resume.experience} 
        onUpdate={(data) => handleUpdateSection('experience', data)}
        canUseAIFeatures={canUseAIFeatures} 
        resumeId={currentResumeId}
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
        t={t}
      />
      
      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <CertificationsSection 
          certifications={resume.certifications} 
          onUpdate={(data) => handleUpdateSection('certifications', data)}
          t={t}
        />
      )}
      
      {/* Projects */}
      {resume.projects.length > 0 && (
        <ProjectsSection 
          projects={resume.projects} 
          onUpdate={(data) => handleUpdateSection('projects', data)}
          t={t}
        />
      )}
      
      {/* General Achievements */}
      {resume.achievements.length > 0 && (
        <AchievementsSection 
          achievements={resume.achievements} 
          onUpdate={(data) => handleUpdateSection('achievements', data)}
          t={t}
        />
      )}
      
      {/* Languages */}
      {resume.languages.length > 0 && (
        <LanguagesSection 
          languages={resume.languages} 
          onUpdate={(data) => handleUpdateSection('languages', data)}
          t={t}
        />
      )}

      {/* Section Improvement Modal */}
      <SectionImprovementModal
        isOpen={improvementModal.isOpen}
        onClose={handleCloseImprovement}
        sectionType={improvementModal.sectionType}
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
        resumeId={currentResumeId || undefined}
      />
    </div>
  );
}

// Contact Info Section
function ContactInfoSection({ 
  contactInfo, 
  onUpdate,
  t 
}: { 
  contactInfo: GeneratedResume['contactInfo']; 
  onUpdate: (data: GeneratedResume['contactInfo']) => void;
  t: (key: string) => string;
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
  t 
}: { 
  summary: string; 
  onUpdate: (data: string) => void;
  canUseAIFeatures?: boolean; 
  resumeId?: string | null;
  t: (key: string) => string;
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
              {t('wizard.steps.preview.generatedResume.actions.aiSuggestions')}
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

      <SectionImprovementModal
        isOpen={improvementModal}
        onClose={() => setImprovementModal(false)}
        sectionType="summary"
        originalText={summary}
        onApprove={handleApproveImprovement}
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

// Experience Section
function ExperienceSection({ 
  experiences, 
  onUpdate, 
  canUseAIFeatures, 
  resumeId,
  t 
}: { 
  experiences: GeneratedResume['experience']; 
  onUpdate: (data: GeneratedResume['experience']) => void;
  canUseAIFeatures?: boolean; 
  resumeId?: string | null;
  t: (key: string) => string;
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

  if (experiences.length === 0) return null;

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...experiences[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editingIndex] = editData;
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
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.experience.duration')}
                      </label>
                      <input
                        type="text"
                        value={editData.duration}
                        onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('wizard.steps.preview.generatedResume.sections.experience.location')}
                      </label>
                      <input
                        type="text"
                        value={editData.location || ''}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.experience.achievements')}
                    </label>
                    <div className="space-y-2">
                      {editData.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateEditAchievement(idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() => removeEditAchievement(idx)}
                            className="text-red-500 hover:text-red-700 px-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addEditAchievement}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + {t('wizard.steps.preview.generatedResume.sections.experience.addAchievement')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{exp.title}</h3>
                      <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-500">{exp.location}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleImproveExperience(index, exp.description)}
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        {t('wizard.steps.preview.generatedResume.actions.aiSuggestions')}
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        {t('wizard.steps.preview.generatedResume.actions.edit')}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                  
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
      </div>

      <SectionImprovementModal
        isOpen={improvementModal.isOpen}
        onClose={() => setImprovementModal({ isOpen: false, experienceIndex: -1, originalText: '' })}
        sectionType="experience"
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
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
  t: (key: string) => string;
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
  t 
}: { 
  education: GeneratedResume['education']; 
  onUpdate: (data: GeneratedResume['education']) => void;
  t: (key: string) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['education'][0] | null>(null);

  if (education.length === 0) return null;

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...education[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedEducation = [...education];
      updatedEducation[editingIndex] = editData;
      onUpdate(updatedEducation);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  return (
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.education.duration')}
                    </label>
                    <input
                      type="text"
                      value={editData.duration}
                      onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('wizard.steps.preview.generatedResume.sections.education.gpa')}
                  </label>
                  <input
                    type="text"
                    value={editData.gpa || ''}
                    onChange={(e) => setEditData({ ...editData, gpa: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              // View mode
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution} • {edu.field}</p>
                    <p className="text-gray-500 text-sm">{edu.duration}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    {t('wizard.steps.preview.generatedResume.actions.edit')}
                  </button>
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
    </div>
  );
}

// Certifications Section
function CertificationsSection({ 
  certifications, 
  onUpdate,
  t 
}: { 
  certifications: GeneratedResume['certifications']; 
  onUpdate: (data: GeneratedResume['certifications']) => void;
  t: (key: string) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['certifications'][0] | null>(null);

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

  return (
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
                    />
                  </div>
                </div>
              </div>
            ) : (
              // View mode
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600">{cert.issuer} • {cert.date}</p>
                    {cert.credentialId && (
                      <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
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
                  </div>
                </div>
                
                {cert.skills.length > 0 && (
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
    </div>
  );
}

// Projects Section
function ProjectsSection({ 
  projects, 
  onUpdate,
  t 
}: { 
  projects: GeneratedResume['projects']; 
  onUpdate: (data: GeneratedResume['projects']) => void;
  t: (key: string) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['projects'][0] | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...projects[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null && editData) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = editData;
      onUpdate(updatedProjects);
      setEditingIndex(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  return (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.projects.name')}
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.steps.preview.generatedResume.sections.projects.duration')}
                    </label>
                    <input
                      type="text"
                      value={editData.duration}
                      onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('wizard.steps.preview.generatedResume.sections.projects.description')}
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('wizard.steps.preview.generatedResume.sections.projects.technologies')} (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editData.technologies.join(', ')}
                    onChange={(e) => setEditData({ ...editData, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              // View mode
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                    <p className="text-gray-600">{project.duration}</p>
                  </div>
                  <div className="flex gap-2">
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
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                
                {project.technologies.length > 0 && (
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
                
                {project.achievements.length > 0 && (
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
    </div>
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
  t: (key: string) => string;
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
  t 
}: { 
  languages: GeneratedResume['languages']; 
  onUpdate: (data: GeneratedResume['languages']) => void;
  t: (key: string) => string;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<GeneratedResume['languages'][0] | null>(null);

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

  return (
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
                    <option value="Native">Native</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>
            ) : (
              // View mode
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{lang.language}</h4>
                  {lang.certifications && lang.certifications.length > 0 && (
                    <p className="text-sm text-gray-500">{lang.certifications.join(', ')}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(lang.level)}`}>
                    {lang.level}
                  </span>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
