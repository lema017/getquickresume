import { useState, useEffect } from 'react';
import { X, Loader2, Save, Plus, Trash2, User, GraduationCap, Briefcase, FolderGit2, Globe, Trophy, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  GeneratedResume, 
  ResumeData, 
  EnhancedEducation, 
  EnhancedProject, 
  EnhancedExperience,
  EnhancedCertification,
  LanguageProficiency,
  Education,
  Project,
  Language,
  Achievement,
  WorkExperience,
  Certification
} from '@/types';
import { sectionValidationService, FieldError, ValidatableSection } from '@/services/sectionValidationService';

export type EditableSection = 'contact' | 'education' | 'skills' | 'projects' | 'languages' | 'achievements' | 'experience' | 'certifications';

interface DataEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: EditableSection;
  generatedResume: GeneratedResume | null;
  resumeData: ResumeData;
  onSave: (
    generatedResumeUpdates: Partial<GeneratedResume>,
    resumeDataUpdates: Partial<ResumeData>
  ) => Promise<void>;
  checklistItemId?: string;
  checklistItemLabel?: string;
  onRescore?: () => Promise<{ checklist?: { dataQuality?: { items?: Array<{ id: string; isCompleted: boolean; label?: string; details?: string; evidence?: string }> } } } | null>;
  initialValidationErrors?: FieldError[];
}

export function DataEditModal({
  isOpen,
  onClose,
  section,
  generatedResume,
  resumeData,
  onSave,
  checklistItemId,
  checklistItemLabel,
  onRescore,
  initialValidationErrors,
}: DataEditModalProps) {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Field-level validation errors from AI
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  // Helper to get error for a specific field
  const getFieldError = (index: number | null, field: string): FieldError | undefined => {
    return fieldErrors.find(e => 
      (index === null ? e.index === undefined : e.index === index) && 
      e.field === field
    );
  };

  // Helper to check if a field has an error
  const hasFieldError = (index: number | null, field: string): boolean => {
    return !!getFieldError(index, field);
  };

  // Initialize field errors from props when modal opens
  useEffect(() => {
    if (isOpen && initialValidationErrors) {
      setFieldErrors(initialValidationErrors);
    }
  }, [isOpen, initialValidationErrors]);

  // Contact form state
  const [contactData, setContactData] = useState({
    linkedin: '',
    email: '',
    phone: '',
  });

  // Education form state
  const [educationList, setEducationList] = useState<EnhancedEducation[]>([]);

  // Skills form state
  const [skillsData, setSkillsData] = useState({
    technical: [] as string[],
    soft: [] as string[],
    tools: [] as string[],
  });
  const [newSkill, setNewSkill] = useState({ value: '', category: 'technical' as 'technical' | 'soft' | 'tools' });

  // Projects form state
  const [projectsList, setProjectsList] = useState<EnhancedProject[]>([]);

  // Languages form state
  const [languagesList, setLanguagesList] = useState<LanguageProficiency[]>([]);

  // Achievements form state
  const [achievementsList, setAchievementsList] = useState<string[]>([]);

  // Experience form state
  const [experienceList, setExperienceList] = useState<EnhancedExperience[]>([]);

  // Certifications form state
  const [certificationsList, setCertificationsList] = useState<EnhancedCertification[]>([]);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && generatedResume) {
      switch (section) {
        case 'contact':
          setContactData({
            linkedin: generatedResume.contactInfo?.linkedin || resumeData.linkedin || '',
            email: generatedResume.contactInfo?.email || resumeData.email || '',
            phone: generatedResume.contactInfo?.phone || resumeData.phone || '',
          });
          break;
        case 'education':
          setEducationList(generatedResume.education?.length > 0 
            ? [...generatedResume.education] 
            : [createEmptyEducation()]);
          break;
        case 'skills':
          setSkillsData({
            technical: [...(generatedResume.skills?.technical || [])],
            soft: [...(generatedResume.skills?.soft || [])],
            tools: [...(generatedResume.skills?.tools || [])],
          });
          break;
        case 'projects':
          setProjectsList(generatedResume.projects?.length > 0 
            ? [...generatedResume.projects] 
            : [createEmptyProject()]);
          break;
        case 'languages':
          setLanguagesList(generatedResume.languages?.length > 0 
            ? [...generatedResume.languages] 
            : [createEmptyLanguage()]);
          break;
        case 'achievements':
          setAchievementsList(generatedResume.achievements?.length > 0 
            ? [...generatedResume.achievements] 
            : ['']);
          break;
        case 'experience':
          setExperienceList(generatedResume.experience?.length > 0 
            ? [...generatedResume.experience] 
            : [createEmptyExperience()]);
          break;
        case 'certifications':
          setCertificationsList(generatedResume.certifications?.length > 0 
            ? [...generatedResume.certifications] 
            : [createEmptyCertification()]);
          break;
      }
      setError(null);
      // Only clear field errors if no initial errors are provided
      if (!initialValidationErrors || initialValidationErrors.length === 0) {
        setFieldErrors([]);
      }
    }
  }, [isOpen, section, generatedResume, resumeData, initialValidationErrors]);

  const createEmptyEducation = (): EnhancedEducation => ({
    degree: '',
    institution: '',
    field: '',
    duration: '',
    gpa: '',
  });

  const createEmptyProject = (): EnhancedProject => ({
    name: '',
    description: '',
    technologies: [],
    duration: '',
    url: '',
    achievements: [],
    impact: '',
  });

  const createEmptyLanguage = (): LanguageProficiency => ({
    language: '',
    level: 'Intermediate',
  });

  const createEmptyExperience = (): EnhancedExperience => ({
    title: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    achievements: [],
    skills: [],
    impact: [],
    startDate: '',
    endDate: '',
    isCurrent: false,
  });

  const createEmptyCertification = (): EnhancedCertification => ({
    name: '',
    issuer: '',
    date: '',
    credentialId: '',
    url: '',
    skills: [],
  });

  const getSectionIcon = () => {
    switch (section) {
      case 'contact': return <User className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'skills': return <Briefcase className="w-5 h-5" />;
      case 'projects': return <FolderGit2 className="w-5 h-5" />;
      case 'languages': return <Globe className="w-5 h-5" />;
      case 'achievements': return <Trophy className="w-5 h-5" />;
      case 'experience': return <Briefcase className="w-5 h-5" />;
      case 'certifications': return <Trophy className="w-5 h-5" />;
      default: return null;
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'contact': return 'Edit Contact Information';
      case 'education': return 'Edit Education';
      case 'skills': return 'Edit Skills';
      case 'projects': return 'Edit Projects';
      case 'languages': return 'Edit Languages';
      case 'achievements': return 'Edit Achievements';
      case 'experience': return 'Edit Work Experience';
      case 'certifications': return 'Edit Certifications';
      default: return 'Edit Section';
    }
  };

  // Validate the field related to the checklist item being fixed
  const validateChecklistItem = (): string | null => {
    if (!checklistItemId) return null; // No specific item to validate
    
    switch (checklistItemId) {
      // Education fields
      case 'education-institution':
        if (section === 'education') {
          const hasInstitution = educationList.some(edu => edu.institution?.trim());
          if (!hasInstitution) {
            return 'Institution name is required. Please fill in at least one institution.';
          }
        }
        break;
      
      case 'education-dates':
        if (section === 'education') {
          const hasDates = educationList.some(edu => edu.duration?.trim());
          if (!hasDates) {
            return 'Education dates are required. Please fill in the duration for at least one entry.';
          }
        }
        break;
      
      case 'education-degree-field':
        if (section === 'education') {
          const hasDegree = educationList.some(edu => edu.degree?.trim() && edu.field?.trim());
          if (!hasDegree) {
            return 'Degree and field of study are required. Please fill in both for at least one entry.';
          }
        }
        break;
      
      // Contact fields
      case 'contact-linkedin':
        if (section === 'contact' && !contactData.linkedin?.trim()) {
          return 'LinkedIn URL is required.';
        }
        break;
      
      case 'contact-email':
        if (section === 'contact' && !contactData.email?.trim()) {
          return 'Email is required.';
        }
        break;
      
      case 'contact-phone':
        if (section === 'contact' && !contactData.phone?.trim()) {
          return 'Phone number is required.';
        }
        break;
      
      // Skills fields
      case 'skills-technical':
        if (section === 'skills' && skillsData.technical.length === 0) {
          return 'At least one technical skill is required.';
        }
        break;
      
      case 'skills-soft':
        if (section === 'skills' && skillsData.soft.length === 0) {
          return 'At least one soft skill is required.';
        }
        break;
      
      case 'skills-tools':
        if (section === 'skills' && skillsData.tools.length === 0) {
          return 'At least one tool or technology is required.';
        }
        break;
      
      // Languages
      case 'languages-levels':
        if (section === 'languages') {
          const hasLevels = languagesList.some(lang => lang.language?.trim() && lang.level);
          if (!hasLevels) {
            return 'At least one language with proficiency level is required.';
          }
        }
        break;
      
      // Data Quality items - validation delegated to AI via re-score
      // These cases just pass through (no local validation needed)
      case 'data-quality-education':
      case 'data-quality-profile':
      case 'data-quality-skills':
      case 'data-quality-languages':
        // AI will validate placeholder/invalid values during re-score
        break;
    }
    
    return null; // Validation passed
  };

  const handleSave = async () => {
    // First: Validate specific checklist item requirements
    const checklistError = validateChecklistItem();
    if (checklistError) {
      setError(checklistError);
      return;
    }
    
    // Second: General validation for education (empty + placeholders)
    const educationError = validateEducationData();
    if (educationError) {
      setError(educationError);
      return;
    }

    setIsSaving(true);
    setIsValidating(true);
    setError(null);
    setFieldErrors([]);

    try {
      // ====================================================================
      // Pre-save AI validation for validatable sections
      // ====================================================================
      const validatableSections: ValidatableSection[] = ['education', 'skills', 'languages', 'contact'];
      
      if (validatableSections.includes(section as ValidatableSection)) {
        // Prepare data for validation based on section type
        let dataToValidate: any;
        
        switch (section) {
          case 'education':
            dataToValidate = educationList.map(edu => ({
              institution: edu.institution,
              degree: edu.degree,
              field: edu.field,
            }));
            break;
          case 'skills':
            dataToValidate = {
              technical: skillsData.technical,
              soft: skillsData.soft,
              tools: skillsData.tools,
            };
            break;
          case 'languages':
            dataToValidate = languagesList.map(lang => ({
              language: lang.language,
              level: lang.level,
            }));
            break;
          case 'contact':
            dataToValidate = {
              fullName: generatedResume?.contactInfo?.fullName || `${resumeData.firstName} ${resumeData.lastName}`,
              email: contactData.email,
              phone: contactData.phone,
            };
            break;
        }

        try {
          const validationResult = await sectionValidationService.validateSection(
            section as ValidatableSection,
            dataToValidate
          );

          if (!validationResult.isValid) {
            setFieldErrors(validationResult.errors);
            setError('Please fix the highlighted fields with valid, real data before saving.');
            setIsSaving(false);
            setIsValidating(false);
            return;
          }
        } catch (validationError: any) {
          // If rate limited, show message but allow saving (graceful degradation)
          if (validationError.code === 'RATE_LIMIT_EXCEEDED') {
            console.warn('Validation rate limited, proceeding with save');
          } else {
            console.error('Validation error:', validationError);
            // Continue with save on other validation errors
          }
        }
      }
      
      setIsValidating(false);

      // ====================================================================
      // Build updates for save
      // ====================================================================
      let generatedResumeUpdates: Partial<GeneratedResume> = {};
      let resumeDataUpdates: Partial<ResumeData> = {};

      switch (section) {
        case 'contact':
          generatedResumeUpdates = {
            contactInfo: {
              ...generatedResume?.contactInfo,
              fullName: generatedResume?.contactInfo?.fullName || `${resumeData.firstName} ${resumeData.lastName}`,
              email: contactData.email,
              phone: contactData.phone,
              location: generatedResume?.contactInfo?.location || resumeData.country,
              linkedin: contactData.linkedin,
            },
          };
          resumeDataUpdates = {
            linkedin: contactData.linkedin,
            email: contactData.email,
            phone: contactData.phone,
          };
          break;

        case 'education':
          generatedResumeUpdates = { education: educationList };
          // Convert EnhancedEducation to Education for resumeData
          resumeDataUpdates = {
            education: educationList.map((edu, index) => ({
              id: resumeData.education[index]?.id || Date.now().toString() + index,
              institution: edu.institution,
              degree: edu.degree,
              field: edu.field,
              startDate: edu.duration.split(' - ')[0] || '',
              endDate: edu.duration.split(' - ')[1] || '',
              isCompleted: true,
              gpa: edu.gpa || '',
              pageNumber: null,
            })),
          };
          break;

        case 'skills':
          generatedResumeUpdates = { skills: skillsData };
          // Combine all skills for resumeData.skillsRaw
          resumeDataUpdates = {
            skillsRaw: [
              ...skillsData.technical,
              ...skillsData.soft,
              ...skillsData.tools,
            ],
          };
          break;

        case 'projects':
          generatedResumeUpdates = { projects: projectsList };
          // Convert EnhancedProject to Project for resumeData
          resumeDataUpdates = {
            projects: projectsList.map((proj, index) => ({
              id: resumeData.projects[index]?.id || Date.now().toString() + index,
              name: proj.name,
              description: proj.description,
              technologies: proj.technologies,
              url: proj.url || '',
              startDate: proj.duration.split(' - ')[0] || '',
              endDate: proj.duration.split(' - ')[1] || '',
              isOngoing: proj.duration.toLowerCase().includes('present'),
              pageNumber: null,
            })),
          };
          break;

        case 'languages':
          generatedResumeUpdates = { languages: languagesList };
          // Convert LanguageProficiency to Language for resumeData
          resumeDataUpdates = {
            languages: languagesList.map((lang, index) => ({
              id: resumeData.languages[index]?.id || Date.now().toString() + index,
              name: lang.language,
              level: mapProficiencyToLevel(lang.level),
              pageNumber: null,
            })),
          };
          break;

        case 'achievements':
          generatedResumeUpdates = { achievements: achievementsList.filter(a => a.trim()) };
          // Convert string achievements to Achievement objects for resumeData
          resumeDataUpdates = {
            achievements: achievementsList
              .filter(a => a.trim())
              .map((ach, index) => ({
                id: resumeData.achievements[index]?.id || Date.now().toString() + index,
                title: ach.split(':')[0] || ach,
                description: ach.split(':')[1]?.trim() || ach,
                year: new Date().getFullYear().toString(),
                pageNumber: null,
              })),
          };
          break;

        case 'experience':
          generatedResumeUpdates = { experience: experienceList };
          // Convert EnhancedExperience to WorkExperience for resumeData
          resumeDataUpdates = {
            experience: experienceList.map((exp, index) => ({
              id: resumeData.experience[index]?.id || Date.now().toString() + index,
              title: exp.title,
              company: exp.company,
              startDate: exp.startDate || exp.duration.split(' - ')[0] || '',
              endDate: exp.endDate || exp.duration.split(' - ')[1] || '',
              isCurrent: exp.isCurrent || exp.duration.toLowerCase().includes('present'),
              description: exp.description,
              achievements: exp.achievements || [],
              responsibilities: [],
              pageNumber: null,
            })),
          };
          break;

        case 'certifications':
          generatedResumeUpdates = { certifications: certificationsList };
          // Convert EnhancedCertification to Certification for resumeData
          resumeDataUpdates = {
            certifications: certificationsList.map((cert, index) => ({
              id: resumeData.certifications[index]?.id || Date.now().toString() + index,
              name: cert.name,
              issuer: cert.issuer,
              date: cert.date,
              credentialId: cert.credentialId || '',
              url: cert.url || '',
              pageNumber: null,
            })),
          };
          break;
      }

      await onSave(generatedResumeUpdates, resumeDataUpdates);
      
      // Trigger re-score to validate via AI if callback is provided
      if (onRescore) {
        try {
          const scoreResult = await onRescore();
          // Check if data quality section has failures
          const dataQualityItems = scoreResult?.checklist?.dataQuality?.items || [];
          const failedItems = dataQualityItems.filter(item => !item.isCompleted);
          
          if (failedItems.length > 0) {
            // Extract specific feedback from failed items
            const specificFeedback = failedItems
              .map(item => {
                // Use evidence for specific field issues, fall back to details
                if (item.evidence) return item.evidence;
                if (item.details) return item.details;
                return item.label;
              })
              .join('. ');
            
            setError(`Data quality issues detected: ${specificFeedback}. Please enter real, meaningful data.`);
            setIsSaving(false);
            return; // Don't close modal
          }
        } catch (rescoreError) {
          console.error('Error during re-score:', rescoreError);
          // Continue and close modal even if rescore fails
        }
      }
      
      onClose();
    } catch (err: any) {
      console.error('Error saving data:', err);
      setError(err.message || 'Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
      setIsValidating(false);
    }
  };

  const mapProficiencyToLevel = (proficiency: string): 'basic' | 'intermediate' | 'advanced' | 'native' => {
    const lower = proficiency.toLowerCase();
    if (lower.includes('native') || lower.includes('fluent')) return 'native';
    if (lower.includes('advanced') || lower.includes('professional')) return 'advanced';
    if (lower.includes('basic') || lower.includes('beginner') || lower.includes('elementary')) return 'basic';
    return 'intermediate';
  };

  // General validation for education section - checks required fields only
  // Placeholder/invalid value detection is delegated to AI via re-score
  const validateEducationData = (): string | null => {
    if (section !== 'education') return null;
    
    for (let i = 0; i < educationList.length; i++) {
      const edu = educationList[i];
      
      // Check for empty required fields only
      if (!edu.institution?.trim()) {
        return `Education #${i + 1}: Institution name is required.`;
      }
      if (!edu.degree?.trim()) {
        return `Education #${i + 1}: Degree is required.`;
      }
      if (!edu.field?.trim()) {
        return `Education #${i + 1}: Field of study is required.`;
      }
    }
    return null;
  };

  const addSkill = () => {
    if (newSkill.value.trim()) {
      setSkillsData(prev => ({
        ...prev,
        [newSkill.category]: [...prev[newSkill.category], newSkill.value.trim()],
      }));
      setNewSkill({ value: '', category: newSkill.category });
    }
  };

  const removeSkill = (category: 'technical' | 'soft' | 'tools', index: number) => {
    setSkillsData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              {getSectionIcon()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{getSectionTitle()}</h2>
              {checklistItemLabel && (
                <p className="text-sm text-amber-600 mt-0.5">
                  Fixing: {checklistItemLabel}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Field-level validation errors banner */}
          {fieldErrors.length > 0 && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Invalid data detected - please fix the highlighted fields:
                  </p>
                  <ul className="mt-2 text-sm text-amber-700 list-disc list-inside space-y-1">
                    {fieldErrors.slice(0, 5).map((err, i) => (
                      <li key={i}>
                        {err.index !== undefined ? `Entry #${err.index + 1} - ` : ''}
                        <span className="font-medium">{err.field}</span>: {err.reason}
                      </li>
                    ))}
                    {fieldErrors.length > 5 && (
                      <li className="text-amber-600">...and {fieldErrors.length - 5} more issues</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Contact Form */}
          {section === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={contactData.linkedin}
                  onChange={(e) => setContactData(prev => ({ ...prev, linkedin: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          )}

          {/* Education Form */}
          {section === 'education' && (
            <div className="space-y-6">
              {educationList.map((edu, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
                    {educationList.length > 1 && (
                      <button
                        onClick={() => setEducationList(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index] = { ...edu, institution: e.target.value };
                          setEducationList(updated);
                          setError(null);
                          // Clear field error when user edits
                          setFieldErrors(prev => prev.filter(err => !(err.index === index && err.field === 'institution')));
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          !edu.institution?.trim() || hasFieldError(index, 'institution')
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="University name"
                      />
                      {!edu.institution?.trim() && (
                        <p className="mt-1 text-xs text-red-600">Required: Enter an institution name</p>
                      )}
                      {hasFieldError(index, 'institution') && edu.institution?.trim() && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {getFieldError(index, 'institution')?.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index] = { ...edu, degree: e.target.value };
                          setEducationList(updated);
                          setError(null);
                          setFieldErrors(prev => prev.filter(err => !(err.index === index && err.field === 'degree')));
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          !edu.degree?.trim() || hasFieldError(index, 'degree')
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Bachelor's, Master's, etc."
                      />
                      {!edu.degree?.trim() && (
                        <p className="mt-1 text-xs text-red-600">Required: Enter a degree</p>
                      )}
                      {hasFieldError(index, 'degree') && edu.degree?.trim() && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {getFieldError(index, 'degree')?.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study *</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index] = { ...edu, field: e.target.value };
                          setEducationList(updated);
                          setError(null);
                          setFieldErrors(prev => prev.filter(err => !(err.index === index && err.field === 'field')));
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          !edu.field?.trim() || hasFieldError(index, 'field')
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Computer Science, Business, etc."
                      />
                      {!edu.field?.trim() && (
                        <p className="mt-1 text-xs text-red-600">Required: Enter a field of study</p>
                      )}
                      {hasFieldError(index, 'field') && edu.field?.trim() && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {getFieldError(index, 'field')?.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={edu.duration}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index] = { ...edu, duration: e.target.value };
                          setEducationList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="2018 - 2022"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setEducationList(prev => [...prev, createEmptyEducation()])}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </button>
            </div>
          )}

          {/* Skills Form */}
          {section === 'skills' && (
            <div className="space-y-6">
              {/* Add new skill */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill.value}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, value: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a skill..."
                />
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value as any }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="tools">Tools</option>
                </select>
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Technical Skills */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Technical Skills ({skillsData.technical.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsData.technical.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill}
                      <button onClick={() => removeSkill('technical', index)} className="hover:text-blue-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {skillsData.technical.length === 0 && (
                    <span className="text-sm text-gray-500">No technical skills added</span>
                  )}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Soft Skills ({skillsData.soft.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsData.soft.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {skill}
                      <button onClick={() => removeSkill('soft', index)} className="hover:text-green-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {skillsData.soft.length === 0 && (
                    <span className="text-sm text-gray-500">No soft skills added</span>
                  )}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tools & Technologies ({skillsData.tools.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsData.tools.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {skill}
                      <button onClick={() => removeSkill('tools', index)} className="hover:text-purple-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {skillsData.tools.length === 0 && (
                    <span className="text-sm text-gray-500">No tools added</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Projects Form */}
          {section === 'projects' && (
            <div className="space-y-6">
              {projectsList.map((proj, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
                    {projectsList.length > 1 && (
                      <button
                        onClick={() => setProjectsList(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name *</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[index] = { ...proj, name: e.target.value };
                            setProjectsList(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Project name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input
                          type="url"
                          value={proj.url || ''}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[index] = { ...proj, url: e.target.value };
                            setProjectsList(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...projectsList];
                          updated[index] = { ...proj, description: e.target.value };
                          setProjectsList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Describe your project..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setProjectsList(prev => [...prev, createEmptyProject()])}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
          )}

          {/* Languages Form */}
          {section === 'languages' && (
            <div className="space-y-4">
              {languagesList.map((lang, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border bg-gray-50 border-gray-200">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) => {
                        const updated = [...languagesList];
                        updated[index] = { ...lang, language: e.target.value };
                        setLanguagesList(updated);
                        setError(null);
                      }}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        !lang.language?.trim() 
                          ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="English, Spanish, etc."
                    />
                    {!lang.language?.trim() && (
                      <p className="mt-1 text-xs text-red-600">Required: Enter a language name</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
                    <select
                      value={lang.level}
                      onChange={(e) => {
                        const updated = [...languagesList];
                        updated[index] = { ...lang, level: e.target.value };
                        setLanguagesList(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Professional">Professional</option>
                      <option value="Native">Native / Fluent</option>
                    </select>
                  </div>
                  {languagesList.length > 1 && (
                    <button
                      onClick={() => setLanguagesList(prev => prev.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700 mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setLanguagesList(prev => [...prev, createEmptyLanguage()])}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Language
              </button>
            </div>
          )}

          {/* Achievements Form */}
          {section === 'achievements' && (
            <div className="space-y-4">
              {achievementsList.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2">
                  <textarea
                    value={achievement}
                    onChange={(e) => {
                      const updated = [...achievementsList];
                      updated[index] = e.target.value;
                      setAchievementsList(updated);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Describe an achievement with specific metrics if possible..."
                  />
                  {achievementsList.length > 1 && (
                    <button
                      onClick={() => setAchievementsList(prev => prev.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setAchievementsList(prev => [...prev, ''])}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>
          )}

          {/* Experience Form */}
          {section === 'experience' && (
            <div className="space-y-6">
              {experienceList.map((exp, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
                    {experienceList.length > 1 && (
                      <button
                        onClick={() => setExperienceList(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[index] = { ...exp, title: e.target.value };
                          setExperienceList(updated);
                          setError(null);
                          setFieldErrors(prev => prev.filter(err => !(err.index === index && err.field === 'title')));
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          !exp.title?.trim() || hasFieldError(index, 'title')
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Software Engineer, Product Manager, etc."
                      />
                      {!exp.title?.trim() && (
                        <p className="mt-1 text-xs text-red-600">Required: Enter a job title</p>
                      )}
                      {hasFieldError(index, 'title') && exp.title?.trim() && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {getFieldError(index, 'title')?.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[index] = { ...exp, company: e.target.value };
                          setExperienceList(updated);
                          setError(null);
                          setFieldErrors(prev => prev.filter(err => !(err.index === index && err.field === 'company')));
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          !exp.company?.trim() || hasFieldError(index, 'company')
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Company name"
                      />
                      {!exp.company?.trim() && (
                        <p className="mt-1 text-xs text-red-600">Required: Enter a company name</p>
                      )}
                      {hasFieldError(index, 'company') && exp.company?.trim() && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {getFieldError(index, 'company')?.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location || ''}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[index] = { ...exp, location: e.target.value };
                          setExperienceList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="City, Country or Remote"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[index] = { ...exp, duration: e.target.value };
                          setExperienceList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Jan 2020 - Present"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[index] = { ...exp, description: e.target.value };
                          setExperienceList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setExperienceList(prev => [...prev, createEmptyExperience()])}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>
          )}

          {/* Certifications Form */}
          {section === 'certifications' && (
            <div className="space-y-6">
              {certificationsList.map((cert, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Certification #{index + 1}</h4>
                    {certificationsList.length > 1 && (
                      <button
                        onClick={() => setCertificationsList(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[index] = { ...cert, name: e.target.value };
                          setCertificationsList(updated);
                          setError(null);
                          setFieldErrors(prev => prev.filter(err => !(err.index === index && err.field === 'name')));
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          !cert.name?.trim() || hasFieldError(index, 'name')
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="AWS Solutions Architect, PMP, etc."
                      />
                      {!cert.name?.trim() && (
                        <p className="mt-1 text-xs text-red-600">Required: Enter a certification name</p>
                      )}
                      {hasFieldError(index, 'name') && cert.name?.trim() && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {getFieldError(index, 'name')?.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization *</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[index] = { ...cert, issuer: e.target.value };
                          setCertificationsList(updated);
                          setError(null);
                          setFieldErrors(prev => prev.filter(err => !(err.index === index && err.field === 'issuer')));
                        }}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          !cert.issuer?.trim() || hasFieldError(index, 'issuer')
                            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Amazon Web Services, PMI, etc."
                      />
                      {!cert.issuer?.trim() && (
                        <p className="mt-1 text-xs text-red-600">Required: Enter the issuing organization</p>
                      )}
                      {hasFieldError(index, 'issuer') && cert.issuer?.trim() && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {getFieldError(index, 'issuer')?.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Earned</label>
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[index] = { ...cert, date: e.target.value };
                          setCertificationsList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Jan 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
                      <input
                        type="text"
                        value={cert.credentialId || ''}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[index] = { ...cert, credentialId: e.target.value };
                          setCertificationsList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="ABC123XYZ"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Verification URL</label>
                      <input
                        type="url"
                        value={cert.url || ''}
                        onChange={(e) => {
                          const updated = [...certificationsList];
                          updated[index] = { ...cert, url: e.target.value };
                          setCertificationsList(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setCertificationsList(prev => [...prev, createEmptyCertification()])}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Certification
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={isSaving || isValidating}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isValidating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isValidating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Validating...
              </>
            ) : isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save & Update Score
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

