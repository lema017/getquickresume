import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUploadResumeStore } from '@/stores/uploadResumeStore';
import { useAuthStore } from '@/stores/authStore';
import { useResumeStore } from '@/stores/resumeStore';
import { resumeExtractionService, ExtractedResumeData } from '@/services/resumeExtractionService';
import { resumeService } from '@/services/resumeService';
import { suggestionService } from '@/services/suggestionService';
import { experienceAchievementService } from '@/services/experienceAchievementService';
import { ResumeData } from '@/types';
import {
  ArrowLeft,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages,
  Star,
  Sparkles,
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  Home,
  FileText,
  ChevronDown,
  ChevronUp,
  Wand2,
  Crown,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

// Simple AI Enhance Button component
const AIEnhanceButton: React.FC<{
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}> = ({ onClick, isLoading, disabled }) => {
  const { t } = useTranslation();
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading || disabled}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Wand2 className="w-3 h-3" />
      )}
      <span>{isLoading ? t('wizard.uploadPage.review.ai.enhancing') : t('wizard.uploadPage.review.ai.enhance')}</span>
    </button>
  );
};

export function ResumeExtractionReview() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, refreshUserPremiumStatus } = useAuthStore();
  const { updateResumeData, setCurrentResumeId, markStepCompleted, setCurrentStep: setWizardStep } = useResumeStore();
  const {
    extractedData,
    setExtractedData,
    updateField,
    updateExperience,
    addExperience,
    removeExperience,
    updateEducation,
    addEducation,
    removeEducation,
    updateSkills,
    addSkill,
    removeSkill,
    updateProject,
    addProject,
    removeProject,
    updateAchievement,
    addAchievement,
    removeAchievement,
    updateCertification,
    addCertification,
    removeCertification,
    updateLanguage,
    addLanguage,
    removeLanguage,
    resetUpload,
  } = useUploadResumeStore();

  const [isCreating, setIsCreating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    profile: true,
    summary: true,
    skills: true,
    experience: true,
    education: true,
    projects: false,
    achievements: false,
    certifications: false,
    languages: false,
  });

  // AI state
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [enhancingFields, setEnhancingFields] = useState<Record<string, boolean>>({});

  const language = (i18n.language === 'es' ? 'es' : 'en') as 'es' | 'en';
  const isFreeUser = !user?.isPremium;
  const canCreateResume = user?.isPremium || !user?.freeResumeUsed;
  
  // Ref to track if we've already navigated to step 7 (prevents redirect race condition)
  const hasNavigatedRef = useRef(false);

  // Redirect if no extracted data (but not while creating resume or after navigation)
  useEffect(() => {
    if (!extractedData && !isCreating && !hasNavigatedRef.current) {
      navigate('/wizard/upload');
    }
  }, [extractedData, navigate, isCreating]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Validate the extracted data
  const validate = useCallback(() => {
    if (!extractedData) return false;

    const errors: string[] = [];

    if (!extractedData.firstName?.trim()) {
      errors.push(t('wizard.uploadPage.review.fields.firstName'));
    }
    if (!extractedData.lastName?.trim()) {
      errors.push(t('wizard.uploadPage.review.fields.lastName'));
    }
    if (!extractedData.email?.trim()) {
      errors.push(t('wizard.uploadPage.review.fields.email'));
    }
    if (!extractedData.profession?.trim()) {
      errors.push(t('wizard.uploadPage.review.fields.profession'));
    }

    setValidationErrors(errors);
    return errors.length === 0;
  }, [extractedData, t]);

  // Get AI suggestions for skills
  const handleGetSkillSuggestions = async () => {
    if (!extractedData?.profession) {
      toast.error(t('wizard.uploadPage.review.ai.error'));
      return;
    }

    setLoadingSuggestions(true);
    try {
      const suggestions = await suggestionService.getSkillsSuggestions(
        extractedData.profession,
        language
      );

      if (suggestions && suggestions.length > 0) {
        setSuggestedSkills(suggestions.filter((s: string) => !extractedData.skills.includes(s)));
      }
    } catch (err) {
      console.error('Error getting skill suggestions:', err);
      toast.error(t('wizard.uploadPage.review.ai.error'));
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Add suggested skill
  const handleAddSuggestedSkill = (skill: string) => {
    addSkill(skill);
    setSuggestedSkills(prev => prev.filter(s => s !== skill));
  };

  // Add all suggested skills
  const handleAddAllSuggestedSkills = () => {
    suggestedSkills.forEach(skill => addSkill(skill));
    setSuggestedSkills([]);
    toast.success(t('wizard.uploadPage.review.ai.enhanced'));
  };

  // Enhance text with AI
  const handleEnhanceText = async (
    fieldKey: string,
    text: string,
    context: string,
    updateFn: (enhanced: string) => void
  ) => {
    if (!text?.trim()) return;

    setEnhancingFields(prev => ({ ...prev, [fieldKey]: true }));
    try {
      const enhanced = await experienceAchievementService.enhanceAchievement(text, language);
      updateFn(enhanced);
      toast.success(t('wizard.uploadPage.review.ai.enhanced'));
    } catch (err) {
      console.error('Error enhancing text:', err);
      toast.error(t('wizard.uploadPage.review.ai.error'));
    } finally {
      setEnhancingFields(prev => ({ ...prev, [fieldKey]: false }));
    }
  };

  // Create the resume
  const handleCreateResume = async () => {
    if (!extractedData || !validate()) {
      toast.error(t('wizard.uploadPage.review.validation.fixErrors'));
      return;
    }

    if (!canCreateResume) {
      toast.error(t('wizard.uploadPage.quotaExceeded.message'));
      return;
    }

    setIsCreating(true);

    try {
      // Convert extracted data to ResumeData format
      const partialResumeData = resumeExtractionService.convertToResumeData(extractedData);

      // Create complete ResumeData with defaults
      const resumeData: ResumeData = {
        firstName: partialResumeData.firstName || '',
        lastName: partialResumeData.lastName || '',
        email: partialResumeData.email || '',
        phone: partialResumeData.phone || '',
        profession: partialResumeData.profession || '',
        country: partialResumeData.country || '',
        linkedin: partialResumeData.linkedin || '',
        targetLevel: partialResumeData.targetLevel || 'mid',
        tone: partialResumeData.tone || 'professional',
        language: partialResumeData.language || language,
        skillsRaw: partialResumeData.skillsRaw || [],
        experience: partialResumeData.experience || [],
        education: partialResumeData.education || [],
        certifications: partialResumeData.certifications || [],
        projects: partialResumeData.projects || [],
        languages: partialResumeData.languages || [],
        achievements: partialResumeData.achievements || [],
        summary: partialResumeData.summary || '',
        jobDescription: partialResumeData.jobDescription || '',
        completedSteps: [1, 2, 3, 4, 5, 6],
        currentStep: 7,
        totalCharacters: 0,
        lastSaved: new Date(),
        firstNamePageNumber: null,
        lastNamePageNumber: null,
        countryPageNumber: null,
        linkedinPageNumber: null,
        languagePageNumber: null,
        targetLevelPageNumber: null,
        professionPageNumber: null,
        tonePageNumber: null,
        phonePageNumber: null,
        emailPageNumber: null,
        summaryPageNumber: null,
        jobDescriptionPageNumber: null,
        skillsPagination: null,
      };

      // Create resume via API
      const createdResume = await resumeService.createResume(
        resumeData,
        `${resumeData.firstName} ${resumeData.lastName} - ${resumeData.profession || 'Resume'}`.trim()
      );

      // Update stores
      updateResumeData(resumeData);
      setCurrentResumeId(createdResume.id);

      // Mark steps 1-6 as completed
      [1, 2, 3, 4, 5, 6].forEach(step => markStepCompleted(step));
      setWizardStep(7);

      // Refresh user premium status
      await refreshUserPremiumStatus();

      // Mark that we're navigating (prevents useEffect redirect race condition)
      hasNavigatedRef.current = true;
      
      // Navigate to Step 7 with resumeId
      toast.success(t('wizard.uploadPage.review.success'));
      navigate(`/wizard/manual/step-7?resumeId=${createdResume.id}`);
      
      // Reset upload store after navigation is triggered
      resetUpload();
    } catch (err) {
      console.error('Error creating resume:', err);
      toast.error(t('wizard.uploadPage.toasts.processError'));
    } finally {
      setIsCreating(false);
    }
  };

  const handleBack = () => {
    navigate('/wizard/upload');
  };

  if (!extractedData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Dashboard Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t('wizard.uploadPage.header.backToDashboard')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('wizard.uploadPage.review.actions.back')}</span>
          </button>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('wizard.uploadPage.review.title')}
          </h1>
          <p className="text-gray-600">
            {t('wizard.uploadPage.review.subtitle')}
          </p>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-900">
                  {t('wizard.uploadPage.review.validation.fixErrors')}
                </h4>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {validationErrors.map((error, idx) => (
                    <li key={idx}>{error} {t('wizard.uploadPage.review.required')}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Free User Notice */}
        {isFreeUser && canCreateResume && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900">
                  {t('wizard.uploadPage.freeUserNotice.title')}
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  {t('wizard.uploadPage.freeUserNotice.message')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quota Exceeded Notice */}
        {isFreeUser && !canCreateResume && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Crown className="w-5 h-5 text-amber-600" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-amber-900">
                  {t('wizard.uploadPage.quotaExceeded.title')}
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  {t('wizard.uploadPage.quotaExceeded.message')}
                </p>
                <button
                  onClick={() => navigate('/premium')}
                  className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-yellow-700 transition-all"
                >
                  <Crown className="w-4 h-4" />
                  {t('wizard.uploadPage.quotaExceeded.upgradeButton')}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('profile')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.profile')}
                </span>
              </div>
              {expandedSections.profile ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.profile && (
              <div className="p-4 pt-0 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.firstName')} *
                    </label>
                    <input
                      type="text"
                      value={extractedData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.lastName')} *
                    </label>
                    <input
                      type="text"
                      value={extractedData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.email')} *
                    </label>
                    <input
                      type="email"
                      value={extractedData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.phone')}
                    </label>
                    <input
                      type="tel"
                      value={extractedData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.profession')} *
                    </label>
                    <input
                      type="text"
                      value={extractedData.profession}
                      onChange={(e) => updateField('profession', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.country')}
                    </label>
                    <input
                      type="text"
                      value={extractedData.country}
                      onChange={(e) => updateField('country', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.linkedin')}
                    </label>
                    <input
                      type="url"
                      value={extractedData.linkedin}
                      onChange={(e) => updateField('linkedin', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.targetLevel')}
                    </label>
                    <select
                      value={extractedData.targetLevel}
                      onChange={(e) => updateField('targetLevel', e.target.value as any)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="entry">{t('wizard.uploadPage.review.targetLevelOptions.entry')}</option>
                      <option value="mid">{t('wizard.uploadPage.review.targetLevelOptions.mid')}</option>
                      <option value="senior">{t('wizard.uploadPage.review.targetLevelOptions.senior')}</option>
                      <option value="executive">{t('wizard.uploadPage.review.targetLevelOptions.executive')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('wizard.uploadPage.review.fields.tone')}
                    </label>
                    <select
                      value={extractedData.tone}
                      onChange={(e) => updateField('tone', e.target.value as any)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="professional">{t('wizard.uploadPage.review.toneOptions.professional')}</option>
                      <option value="creative">{t('wizard.uploadPage.review.toneOptions.creative')}</option>
                      <option value="technical">{t('wizard.uploadPage.review.toneOptions.technical')}</option>
                      <option value="friendly">{t('wizard.uploadPage.review.toneOptions.friendly')}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Professional Summary Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('summary')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.summary')}
                </span>
              </div>
              {expandedSections.summary ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.summary && (
              <div className="p-4 pt-0 border-t border-gray-100">
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {t('wizard.uploadPage.review.fields.summaryText')}
                    </label>
                    <AIEnhanceButton
                      onClick={() => handleEnhanceText(
                        'summary',
                        extractedData.summary,
                        'summary',
                        (enhanced) => updateField('summary', enhanced)
                      )}
                      isLoading={enhancingFields['summary'] || false}
                    />
                  </div>
                  <textarea
                    value={extractedData.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('wizard.uploadPage.review.fields.summaryPlaceholder')}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('skills')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.skills')}
                </span>
                <span className="text-sm text-gray-500">({extractedData.skills.length})</span>
              </div>
              {expandedSections.skills ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.skills && (
              <div className="p-4 pt-0 border-t border-gray-100">
                {/* AI Suggestions Button */}
                <div className="flex items-center gap-2 mt-4 mb-4">
                  <button
                    onClick={handleGetSkillSuggestions}
                    disabled={loadingSuggestions || !extractedData.profession}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loadingSuggestions ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>
                      {loadingSuggestions
                        ? t('wizard.uploadPage.review.ai.loadingSuggestions')
                        : t('wizard.uploadPage.review.ai.getSuggestions')}
                    </span>
                  </button>
                </div>

                {/* Suggested Skills */}
                {suggestedSkills.length > 0 && (
                  <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-purple-900">
                        {t('wizard.uploadPage.review.ai.clickToAdd')}
                      </p>
                      <button
                        onClick={handleAddAllSuggestedSkills}
                        className="text-xs font-medium text-purple-700 hover:text-purple-900 underline"
                      >
                        {t('wizard.uploadPage.review.ai.addAll')}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleAddSuggestedSkill(skill)}
                          className="px-3 py-1.5 text-sm bg-white text-purple-700 border border-purple-200 rounded-full hover:bg-purple-100 transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {extractedData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full group"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(idx)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add Skill Input */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder={t('wizard.uploadPage.review.addButton', { item: t('wizard.uploadPage.review.sections.skills').toLowerCase() })}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        if (input.value.trim()) {
                          addSkill(input.value.trim());
                          input.value = '';
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Work Experience Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('experience')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.experience')}
                </span>
                <span className="text-sm text-gray-500">({extractedData.experiences.length})</span>
              </div>
              {expandedSections.experience ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.experience && (
              <div className="p-4 pt-0 border-t border-gray-100">
                {extractedData.experiences.length === 0 ? (
                  <p className="text-gray-500 text-sm mt-4">{t('wizard.uploadPage.review.noItems')}</p>
                ) : (
                  <div className="space-y-6 mt-4">
                    {extractedData.experiences.map((exp, idx) => (
                      <div key={exp.id || idx} className="p-4 bg-gray-50 rounded-lg relative">
                        <button
                          type="button"
                          onClick={() => removeExperience(idx)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.jobTitle')} *
                            </label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateExperience(idx, { title: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.company')} *
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(idx, { company: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.startDate')}
                            </label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(idx, { startDate: e.target.value })}
                              placeholder="MM/YYYY"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.endDate')}
                            </label>
                            <input
                              type="text"
                              value={exp.isCurrent ? '' : exp.endDate}
                              onChange={(e) => updateExperience(idx, { endDate: e.target.value })}
                              placeholder="MM/YYYY"
                              disabled={exp.isCurrent}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={exp.isCurrent || false}
                                onChange={(e) => updateExperience(idx, {
                                  isCurrent: e.target.checked,
                                  endDate: e.target.checked ? '' : exp.endDate
                                })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">
                                {t('wizard.uploadPage.review.fields.currentJob')}
                              </span>
                            </label>
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-sm font-medium text-gray-700">
                                {t('wizard.uploadPage.review.fields.responsibilities')}
                              </label>
                              <AIEnhanceButton
                                onClick={() => handleEnhanceText(
                                  `exp-${idx}`,
                                  exp.achievements?.join('\n') || '',
                                  'experience',
                                  (enhanced) => updateExperience(idx, { achievements: enhanced.split('\n').filter(Boolean) })
                                )}
                                isLoading={enhancingFields[`exp-${idx}`] || false}
                              />
                            </div>
                            <textarea
                              value={exp.achievements?.join('\n') || ''}
                              onChange={(e) => updateExperience(idx, { achievements: e.target.value.split('\n') })}
                              rows={3}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="One achievement per line..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('wizard.uploadPage.review.addButton', { item: t('wizard.uploadPage.review.sections.experience').toLowerCase() })}</span>
                </button>
              </div>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('education')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.education')}
                </span>
                <span className="text-sm text-gray-500">({extractedData.education.length})</span>
              </div>
              {expandedSections.education ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.education && (
              <div className="p-4 pt-0 border-t border-gray-100">
                {extractedData.education.length === 0 ? (
                  <p className="text-gray-500 text-sm mt-4">{t('wizard.uploadPage.review.noItems')}</p>
                ) : (
                  <div className="space-y-6 mt-4">
                    {extractedData.education.map((edu, idx) => (
                      <div key={edu.id || idx} className="p-4 bg-gray-50 rounded-lg relative">
                        <button
                          type="button"
                          onClick={() => removeEducation(idx)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.degree')} *
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(idx, { degree: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.field')}
                            </label>
                            <input
                              type="text"
                              value={edu.field || ''}
                              onChange={(e) => updateEducation(idx, { field: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.institution')} *
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(idx, { institution: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.startDate')}
                            </label>
                            <input
                              type="text"
                              value={edu.startDate || ''}
                              onChange={(e) => updateEducation(idx, { startDate: e.target.value })}
                              placeholder="YYYY"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.endDate')}
                            </label>
                            <input
                              type="text"
                              value={edu.isCurrentlyStudying ? '' : (edu.endDate || '')}
                              onChange={(e) => updateEducation(idx, { endDate: e.target.value })}
                              placeholder="YYYY"
                              disabled={edu.isCurrentlyStudying}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={edu.isCurrentlyStudying || false}
                                onChange={(e) => updateEducation(idx, {
                                  isCurrentlyStudying: e.target.checked,
                                  endDate: e.target.checked ? '' : edu.endDate
                                })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">
                                {t('wizard.uploadPage.review.fields.currentlyStudying')}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('wizard.uploadPage.review.addButton', { item: t('wizard.uploadPage.review.sections.education').toLowerCase() })}</span>
                </button>
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('projects')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-cyan-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.projects')}
                </span>
                <span className="text-sm text-gray-500">({extractedData.projects.length})</span>
                <span className="text-xs text-gray-400">({t('wizard.uploadPage.review.optional')})</span>
              </div>
              {expandedSections.projects ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.projects && (
              <div className="p-4 pt-0 border-t border-gray-100">
                {extractedData.projects.length === 0 ? (
                  <p className="text-gray-500 text-sm mt-4">{t('wizard.uploadPage.review.noItems')}</p>
                ) : (
                  <div className="space-y-6 mt-4">
                    {extractedData.projects.map((proj, idx) => (
                      <div key={proj.id || idx} className="p-4 bg-gray-50 rounded-lg relative">
                        <button
                          type="button"
                          onClick={() => removeProject(idx)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.projectName')} *
                            </label>
                            <input
                              type="text"
                              value={proj.name}
                              onChange={(e) => updateProject(idx, { name: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.url')}
                            </label>
                            <input
                              type="url"
                              value={proj.url || ''}
                              onChange={(e) => updateProject(idx, { url: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-sm font-medium text-gray-700">
                                {t('wizard.uploadPage.review.fields.description')}
                              </label>
                              <AIEnhanceButton
                                onClick={() => handleEnhanceText(
                                  `proj-${idx}`,
                                  proj.description,
                                  'project',
                                  (enhanced) => updateProject(idx, { description: enhanced })
                                )}
                                isLoading={enhancingFields[`proj-${idx}`] || false}
                              />
                            </div>
                            <textarea
                              value={proj.description}
                              onChange={(e) => updateProject(idx, { description: e.target.value })}
                              rows={2}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.technologies')}
                            </label>
                            <input
                              type="text"
                              value={proj.technologies?.join(', ') || ''}
                              onChange={(e) => updateProject(idx, { technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="React, Node.js, PostgreSQL..."
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={proj.isOngoing || false}
                                onChange={(e) => updateProject(idx, { isOngoing: e.target.checked })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">
                                {t('wizard.uploadPage.review.fields.projectOngoing')}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addProject}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('wizard.uploadPage.review.addButton', { item: t('wizard.uploadPage.review.sections.projects').toLowerCase() })}</span>
                </button>
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('achievements')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.achievements')}
                </span>
                <span className="text-sm text-gray-500">({extractedData.achievements.length})</span>
                <span className="text-xs text-gray-400">({t('wizard.uploadPage.review.optional')})</span>
              </div>
              {expandedSections.achievements ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.achievements && (
              <div className="p-4 pt-0 border-t border-gray-100">
                {extractedData.achievements.length === 0 ? (
                  <p className="text-gray-500 text-sm mt-4">{t('wizard.uploadPage.review.noItems')}</p>
                ) : (
                  <div className="space-y-6 mt-4">
                    {extractedData.achievements.map((ach, idx) => (
                      <div key={ach.id || idx} className="p-4 bg-gray-50 rounded-lg relative">
                        <button
                          type="button"
                          onClick={() => removeAchievement(idx)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.achievementTitle')} *
                            </label>
                            <input
                              type="text"
                              value={ach.title}
                              onChange={(e) => updateAchievement(idx, { title: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.year')}
                            </label>
                            <input
                              type="text"
                              value={ach.year || ''}
                              onChange={(e) => updateAchievement(idx, { year: e.target.value })}
                              placeholder="YYYY"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-sm font-medium text-gray-700">
                                {t('wizard.uploadPage.review.fields.description')}
                              </label>
                              <AIEnhanceButton
                                onClick={() => handleEnhanceText(
                                  `ach-${idx}`,
                                  ach.description,
                                  'achievement',
                                  (enhanced) => updateAchievement(idx, { description: enhanced })
                                )}
                                isLoading={enhancingFields[`ach-${idx}`] || false}
                              />
                            </div>
                            <textarea
                              value={ach.description}
                              onChange={(e) => updateAchievement(idx, { description: e.target.value })}
                              rows={2}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addAchievement}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('wizard.uploadPage.review.addButton', { item: t('wizard.uploadPage.review.sections.achievements').toLowerCase() })}</span>
                </button>
              </div>
            )}
          </div>

          {/* Certifications Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('certifications')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.certifications')}
                </span>
                <span className="text-sm text-gray-500">({extractedData.certifications.length})</span>
                <span className="text-xs text-gray-400">({t('wizard.uploadPage.review.optional')})</span>
              </div>
              {expandedSections.certifications ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.certifications && (
              <div className="p-4 pt-0 border-t border-gray-100">
                {extractedData.certifications.length === 0 ? (
                  <p className="text-gray-500 text-sm mt-4">{t('wizard.uploadPage.review.noItems')}</p>
                ) : (
                  <div className="space-y-6 mt-4">
                    {extractedData.certifications.map((cert, idx) => (
                      <div key={cert.id || idx} className="p-4 bg-gray-50 rounded-lg relative">
                        <button
                          type="button"
                          onClick={() => removeCertification(idx)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.certificationName')} *
                            </label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => updateCertification(idx, { name: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.issuer')}
                            </label>
                            <input
                              type="text"
                              value={cert.issuer || ''}
                              onChange={(e) => updateCertification(idx, { issuer: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.certDate')}
                            </label>
                            <input
                              type="text"
                              value={cert.date || ''}
                              onChange={(e) => updateCertification(idx, { date: e.target.value })}
                              placeholder="MM/YYYY"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.credentialId')}
                            </label>
                            <input
                              type="text"
                              value={cert.credentialId || ''}
                              onChange={(e) => updateCertification(idx, { credentialId: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {t('wizard.uploadPage.review.fields.certUrl')}
                            </label>
                            <input
                              type="url"
                              value={cert.url || ''}
                              onChange={(e) => updateCertification(idx, { url: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addCertification}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('wizard.uploadPage.review.addButton', { item: t('wizard.uploadPage.review.sections.certifications').toLowerCase() })}</span>
                </button>
              </div>
            )}
          </div>

          {/* Languages Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('languages')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-pink-600" />
                <span className="font-semibold text-gray-900">
                  {t('wizard.uploadPage.review.sections.languages')}
                </span>
                <span className="text-sm text-gray-500">({extractedData.languages.length})</span>
                <span className="text-xs text-gray-400">({t('wizard.uploadPage.review.optional')})</span>
              </div>
              {expandedSections.languages ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.languages && (
              <div className="p-4 pt-0 border-t border-gray-100">
                {extractedData.languages.length === 0 ? (
                  <p className="text-gray-500 text-sm mt-4">{t('wizard.uploadPage.review.noItems')}</p>
                ) : (
                  <div className="space-y-4 mt-4">
                    {extractedData.languages.map((lang, idx) => (
                      <div key={lang.id || idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('wizard.uploadPage.review.fields.languageName')}
                          </label>
                          <input
                            type="text"
                            value={lang.name}
                            onChange={(e) => updateLanguage(idx, { name: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('wizard.uploadPage.review.fields.languageLevel')}
                          </label>
                          <select
                            value={lang.level}
                            onChange={(e) => updateLanguage(idx, { level: e.target.value as any })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="basic">{t('wizard.uploadPage.review.languageLevelOptions.basic')}</option>
                            <option value="intermediate">{t('wizard.uploadPage.review.languageLevelOptions.intermediate')}</option>
                            <option value="advanced">{t('wizard.uploadPage.review.languageLevelOptions.advanced')}</option>
                            <option value="native">{t('wizard.uploadPage.review.languageLevelOptions.native')}</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLanguage(idx)}
                          className="text-gray-400 hover:text-red-500 p-2 mt-5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addLanguage}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('wizard.uploadPage.review.addButton', { item: t('wizard.uploadPage.review.sections.languages').toLowerCase() })}</span>
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {t('wizard.uploadPage.review.actions.back')}
            </button>
            <button
              type="button"
              onClick={handleCreateResume}
              disabled={isCreating || !canCreateResume}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                canCreateResume && !isCreating
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('wizard.uploadPage.review.creating')}</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('wizard.uploadPage.review.actions.createResume')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

