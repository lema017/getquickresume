import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Building2,
  Briefcase,
  FileText,
  User,
  Mail,
  Phone,
  Linkedin,
  Heart,
  Trophy,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
  Target,
  Palette,
  Smile,
  Crown,
  Wand2,
  type LucideIcon,
} from 'lucide-react';
import { useCoverLetterStore } from '@/stores/coverLetterStore';
import { useAuthStore } from '@/stores/authStore';
import { CoverLetterTone, CoverLetterLength } from '@/types/coverLetter';
import { coverLetterService } from '@/services/coverLetterService';
import toast from 'react-hot-toast';

// Input character limits
const INPUT_LIMITS = {
  companyName: 300,
  jobTitle: 300,
  jobDescription: 5000,
  achievement: 1000,
  whyCompany: 1000,
};

interface InputFormProps {
  onGenerate: () => void;
}

export function InputForm({ onGenerate }: InputFormProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { currentCoverLetter, updateCoverLetterData, isGenerating } = useCoverLetterStore();
  const [expandedSections, setExpandedSections] = useState({
    company: true,
    personal: true,
    personalInfo: false,
    style: true,
  });
  
  // AI Feature States
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [whyCompanySuggestions, setWhyCompanySuggestions] = useState<string[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState<'suggestions' | 'enhance'>('suggestions');

  const isPremium = user?.isPremium;
  const currentLanguage = (i18n.language?.startsWith('es') ? 'es' : 'en') as 'en' | 'es';

  // Handle AI Suggestions for "Why This Company"
  const handleGetSuggestions = async () => {
    // Check if job description is provided
    if (!currentCoverLetter.jobDescription?.trim()) {
      toast.error(t('coverLetter.ai.jobDescriptionRequired') || 'Please add a job description above to generate AI suggestions');
      return;
    }

    // Check premium status
    if (!isPremium) {
      setPremiumFeature('suggestions');
      setShowPremiumModal(true);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const suggestions = await coverLetterService.suggestWhyCompany(
        currentCoverLetter.companyName,
        currentCoverLetter.jobTitle,
        currentCoverLetter.jobDescription,
        currentLanguage
      );
      setWhyCompanySuggestions(suggestions);
      toast.success(t('coverLetter.ai.suggestionsLoaded') || 'Suggestions loaded!');
    } catch (error: any) {
      if (error?.code === 'PREMIUM_REQUIRED') {
        setPremiumFeature('suggestions');
        setShowPremiumModal(true);
      } else if (error?.code === 'RATE_LIMIT_EXCEEDED') {
        toast.error(t('coverLetter.ai.rateLimitExceeded') || 'Too many requests. Please wait a moment.');
      } else {
        toast.error(t('coverLetter.ai.suggestionsFailed') || 'Failed to get suggestions');
      }
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Handle AI Enhancement for Key Achievement
  const handleEnhanceAchievement = async () => {
    if (!currentCoverLetter.keyAchievement?.trim()) {
      return;
    }

    // Check premium status
    if (!isPremium) {
      setPremiumFeature('enhance');
      setShowPremiumModal(true);
      return;
    }

    setIsEnhancing(true);
    try {
      const enhanced = await coverLetterService.enhanceAchievement(
        currentCoverLetter.keyAchievement,
        {
          jobTitle: currentCoverLetter.jobTitle,
          companyName: currentCoverLetter.companyName,
          language: currentLanguage,
        }
      );
      updateCoverLetterData({ keyAchievement: enhanced });
      toast.success(t('coverLetter.ai.achievementEnhanced') || 'Achievement enhanced!');
    } catch (error: any) {
      if (error?.code === 'PREMIUM_REQUIRED') {
        setPremiumFeature('enhance');
        setShowPremiumModal(true);
      } else if (error?.code === 'RATE_LIMIT_EXCEEDED') {
        toast.error(t('coverLetter.ai.rateLimitExceeded') || 'Too many requests. Please wait a moment.');
      } else {
        toast.error(t('coverLetter.ai.enhanceFailed') || 'Failed to enhance achievement');
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  // Apply a suggestion to the "Why This Company" field
  const applySuggestion = (suggestion: string) => {
    const currentValue = currentCoverLetter.whyThisCompany || '';
    const newValue = currentValue ? `${currentValue}\n\n${suggestion}` : suggestion;
    updateCoverLetterData({ whyThisCompany: newValue.slice(0, INPUT_LIMITS.whyCompany) });
    // Remove used suggestion from the list
    setWhyCompanySuggestions((prev) => prev.filter((s) => s !== suggestion));
    toast.success(t('coverLetter.ai.suggestionApplied') || 'Suggestion added!');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toneOptions: { value: CoverLetterTone; label: string; Icon: LucideIcon }[] = [
    { value: 'professional', label: t('coverLetter.form.tone.professional'), Icon: Briefcase },
    { value: 'friendly', label: t('coverLetter.form.tone.friendly'), Icon: Smile },
    { value: 'confident', label: t('coverLetter.form.tone.confident'), Icon: Target },
    { value: 'creative', label: t('coverLetter.form.tone.creative'), Icon: Palette },
  ];

  const lengthOptions: { value: CoverLetterLength; label: string; description: string }[] = [
    { value: 'concise', label: t('coverLetter.form.length.concise'), description: t('coverLetter.form.length.conciseDesc') },
    { value: 'standard', label: t('coverLetter.form.length.standard'), description: t('coverLetter.form.length.standardDesc') },
    { value: 'detailed', label: t('coverLetter.form.length.detailed'), description: t('coverLetter.form.length.detailedDesc') },
  ];

  const isFormValid = 
    currentCoverLetter.companyName.trim() &&
    currentCoverLetter.jobTitle.trim() &&
    currentCoverLetter.fullName.trim();

  return (
    <div className="space-y-4">
      {/* Company & Job Details Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('company')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{t('coverLetter.form.sections.company')}</h3>
              <p className="text-sm text-gray-500">{t('coverLetter.form.sections.companyDesc')}</p>
            </div>
          </div>
          {expandedSections.company ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.company && (
          <div className="px-6 py-4 space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.companyName')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={currentCoverLetter.companyName}
                  onChange={(e) => updateCoverLetterData({ companyName: e.target.value })}
                  placeholder={t('coverLetter.form.companyNamePlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.jobTitle')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={currentCoverLetter.jobTitle}
                  onChange={(e) => updateCoverLetterData({ jobTitle: e.target.value })}
                  placeholder={t('coverLetter.form.jobTitlePlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.jobDescription')}
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={currentCoverLetter.jobDescription}
                  onChange={(e) => updateCoverLetterData({ jobDescription: e.target.value.slice(0, INPUT_LIMITS.jobDescription) })}
                  placeholder={t('coverLetter.form.jobDescriptionPlaceholder')}
                  rows={4}
                  maxLength={INPUT_LIMITS.jobDescription}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">{t('coverLetter.form.jobDescriptionHint')}</p>
                <span className={`text-xs ${(currentCoverLetter.jobDescription?.length || 0) > INPUT_LIMITS.jobDescription * 0.9 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {currentCoverLetter.jobDescription?.length || 0}/{INPUT_LIMITS.jobDescription}
                </span>
              </div>
            </div>

            {/* Hiring Manager Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.hiringManager')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={currentCoverLetter.hiringManagerName || ''}
                  onChange={(e) => updateCoverLetterData({ hiringManagerName: e.target.value })}
                  placeholder={t('coverLetter.form.hiringManagerPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Personal Touch Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{t('coverLetter.form.sections.personal')}</h3>
              <p className="text-sm text-gray-500">{t('coverLetter.form.sections.personalDesc')}</p>
            </div>
          </div>
          {expandedSections.personal ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.personal && (
          <div className="px-6 py-4 space-y-4">
            {/* Why This Company */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  {t('coverLetter.form.whyCompany')}
                </label>
                <button
                  type="button"
                  onClick={handleGetSuggestions}
                  disabled={isLoadingSuggestions}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isPremium
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      : 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 hover:from-amber-200 hover:to-yellow-200'
                  } disabled:opacity-50`}
                >
                  {isLoadingSuggestions ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  {t('coverLetter.ai.getSuggestions') || 'AI Suggestions'}
                  {!isPremium && <Crown className="w-3 h-3" />}
                </button>
              </div>
              <textarea
                value={currentCoverLetter.whyThisCompany || ''}
                onChange={(e) => updateCoverLetterData({ whyThisCompany: e.target.value.slice(0, INPUT_LIMITS.whyCompany) })}
                placeholder={t('coverLetter.form.whyCompanyPlaceholder')}
                rows={3}
                maxLength={INPUT_LIMITS.whyCompany}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all resize-none"
              />
              <div className="flex items-center justify-end mt-1">
                <span className={`text-xs ${(currentCoverLetter.whyThisCompany?.length || 0) > INPUT_LIMITS.whyCompany * 0.9 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {currentCoverLetter.whyThisCompany?.length || 0}/{INPUT_LIMITS.whyCompany}
                </span>
              </div>
              
              {/* AI Suggestion Chips */}
              {whyCompanySuggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-gray-500 font-medium">
                    {t('coverLetter.ai.clickToAdd') || 'Click to add:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {whyCompanySuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => applySuggestion(suggestion)}
                        className="px-3 py-2 text-xs text-left bg-purple-50 text-purple-700 rounded-lg border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all max-w-full"
                      >
                        <span className="line-clamp-2">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Key Achievement */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  {t('coverLetter.form.keyAchievement')}
                </label>
                <button
                  type="button"
                  onClick={handleEnhanceAchievement}
                  disabled={isEnhancing || !currentCoverLetter.keyAchievement?.trim()}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isPremium
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 hover:from-amber-200 hover:to-yellow-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isEnhancing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5" />
                  )}
                  {t('coverLetter.ai.enhance') || 'Enhance with AI'}
                  {!isPremium && <Crown className="w-3 h-3" />}
                </button>
              </div>
              <textarea
                value={currentCoverLetter.keyAchievement || ''}
                onChange={(e) => updateCoverLetterData({ keyAchievement: e.target.value.slice(0, INPUT_LIMITS.achievement) })}
                placeholder={t('coverLetter.form.keyAchievementPlaceholder')}
                rows={3}
                maxLength={INPUT_LIMITS.achievement}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
              />
              <div className="flex items-center justify-end mt-1">
                <span className={`text-xs ${(currentCoverLetter.keyAchievement?.length || 0) > INPUT_LIMITS.achievement * 0.9 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {currentCoverLetter.keyAchievement?.length || 0}/{INPUT_LIMITS.achievement}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Personal Info Section (Collapsible) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('personalInfo')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{t('coverLetter.form.sections.personalInfo')}</h3>
              <p className="text-sm text-gray-500">
                {currentCoverLetter.fullName || t('coverLetter.form.sections.personalInfoDesc')}
              </p>
            </div>
          </div>
          {expandedSections.personalInfo ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.personalInfo && (
          <div className="px-6 py-4 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.fullName')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={currentCoverLetter.fullName}
                  onChange={(e) => updateCoverLetterData({ fullName: e.target.value })}
                  placeholder={t('coverLetter.form.fullNamePlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={currentCoverLetter.email}
                  onChange={(e) => updateCoverLetterData({ email: e.target.value })}
                  placeholder={t('coverLetter.form.emailPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.phone')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={currentCoverLetter.phone || ''}
                  onChange={(e) => updateCoverLetterData({ phone: e.target.value })}
                  placeholder={t('coverLetter.form.phonePlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('coverLetter.form.linkedin')}
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={currentCoverLetter.linkedin || ''}
                  onChange={(e) => updateCoverLetterData({ linkedin: e.target.value })}
                  placeholder={t('coverLetter.form.linkedinPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tone & Style Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('style')}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{t('coverLetter.form.sections.style')}</h3>
              <p className="text-sm text-gray-500">{t('coverLetter.form.sections.styleDesc')}</p>
            </div>
          </div>
          {expandedSections.style ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {expandedSections.style && (
          <div className="px-6 py-4 space-y-4">
            {/* Tone Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('coverLetter.form.toneLabel')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {toneOptions.map((option) => {
                  const isSelected = currentCoverLetter.tone === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateCoverLetterData({ tone: option.value })}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <option.Icon className={`w-5 h-5 ${isSelected ? 'text-amber-600' : 'text-gray-500'}`} />
                      <p className="font-medium text-gray-900 mt-1">{option.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Length Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('coverLetter.form.lengthLabel')}
              </label>
              <div className="space-y-2">
                {lengthOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateCoverLetterData({ length: option.value })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      currentCoverLetter.length === option.value
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        currentCoverLetter.length === option.value
                          ? 'border-amber-500 bg-amber-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {currentCoverLetter.length === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={!isFormValid || isGenerating}
        className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            {t('coverLetter.generating')}
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            {t('coverLetter.generate')}
          </>
        )}
      </button>

      {!isFormValid && (
        <p className="text-center text-sm text-gray-500">
          {t('coverLetter.form.requiredHint')}
        </p>
      )}

      {/* Premium CTA Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('coverLetter.premium.title') || 'Premium Feature'}
              </h3>
              <p className="text-gray-600 mb-6">
                {premiumFeature === 'suggestions'
                  ? t('coverLetter.premium.suggestionsDescription') || 'AI-powered suggestions help you write compelling reasons for why you want to work at this company. Upgrade to premium for unlimited access!'
                  : t('coverLetter.premium.enhanceDescription') || 'AI enhancement transforms your achievement into an impactful, professional statement. Upgrade to premium for unlimited access!'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {t('common.cancel') || 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    setShowPremiumModal(false);
                    navigate('/premium');
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all font-medium"
                >
                  {t('coverLetter.premium.upgrade') || 'Upgrade Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

