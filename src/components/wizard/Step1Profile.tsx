import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, ArrowLeft, CheckCircle, Linkedin, Lightbulb } from 'lucide-react';
import { countries } from '@/utils/countries';
import { validateProfile, FieldValidation } from '@/utils/validation';
import { ValidationError } from '@/components/ValidationError';
import { SanitizedInput } from '@/components/SanitizedInput';
import { PhoneInput } from '@/components/PhoneInput';
import { MandatoryFieldLabel } from '@/components/MandatoryFieldLabel';
import { formatName, formatProfession } from '@/utils/textFormatting';
import { DevResumePreloader } from './DevResumePreloader';

export function Step1Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, updateResumeData, saveResumeDataImmediately, markStepCompleted, setCurrentStep } = useResumeStore();
  const { user } = useAuthStore();
  const [errors, setErrors] = useState<FieldValidation>({});
  const [formData, setFormData] = useState({
    firstName: formatName(resumeData.firstName || user?.firstName || user?.fullName?.split(' ')[0] || ''),
    lastName: formatName(resumeData.lastName || user?.lastName || user?.fullName?.split(' ').slice(1).join(' ') || ''),
    country: resumeData.country || user?.country || '',
    linkedin: resumeData.linkedin || user?.linkedin || '',
    language: resumeData.language || 'es',
    targetLevel: resumeData.targetLevel || 'mid',
    profession: resumeData.profession || '',
    tone: resumeData.tone || 'professional',
    phone: resumeData.phone || '',
    email: resumeData.email || user?.email || '',
  });

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    console.log('🔧 Step1Profile - resumeData changed:', resumeData);
    console.log('🔧 Step1Profile - profession from resumeData:', resumeData.profession);
    
    setFormData({
      firstName: formatName(resumeData.firstName || user?.firstName || user?.fullName?.split(' ')[0] || ''),
      lastName: formatName(resumeData.lastName || user?.lastName || user?.fullName?.split(' ').slice(1).join(' ') || ''),
      country: resumeData.country || user?.country || '',
      linkedin: resumeData.linkedin || user?.linkedin || '',
      language: resumeData.language || 'es',
      targetLevel: resumeData.targetLevel || 'mid',
      profession: resumeData.profession || '',
      tone: resumeData.tone || 'professional',
      phone: resumeData.phone || '',
      email: resumeData.email || user?.email || '',
    });
    
    console.log('🔧 Step1Profile - Updated formData with profession:', resumeData.profession || '');
  }, [resumeData, user]);

  const handleChange = (field: string, value: any) => {
    // Format profession field to Title Case
    if (field === 'profession' && typeof value === 'string') {
      const formatted = formatProfession(value);
      // Defensive check: if formatting results in empty/whitespace-only, use original value
      // but only if original had non-whitespace content
      if (formatted.trim() === '' && value.trim() !== '') {
        // This shouldn't happen, but if it does, use the trimmed original
        value = value.trim();
      } else {
        value = formatted;
      }
    }
    
    // Calculate the updated formData immediately
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Validate with the updated formData immediately (don't wait for state update)
      const fieldValidation = validateProfile(updated);
      
      // Update errors for this specific field
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        if (fieldValidation[field]) {
          newErrors[field] = fieldValidation[field];
        } else {
          delete newErrors[field];
        }
        return newErrors;
      });
      
      return updated;
    });
  };

  const handleNext = async () => {
    // Validar formulario
    const currentValidationErrors = validateProfile(formData);
    
    if (Object.keys(currentValidationErrors).length > 0) {
      setErrors(currentValidationErrors);
      setShowErrors(true);
      // Scroll to first error
      const firstErrorField = Object.keys(currentValidationErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`) || 
                           document.querySelector(`input[value*="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Si no hay errores, continuar
    setShowErrors(false);
    
    // Update resume data in store first
    updateResumeData(formData);
    
    // Save immediately before navigating to ensure data is persisted
    try {
      await saveResumeDataImmediately();
    } catch (error) {
      console.error('Error saving resume data:', error);
      // Continue navigation even if save fails - data is still in store
    }
    
    markStepCompleted(1);
    setCurrentStep(2);
    navigateToStep(2);
  };

  const handleBack = () => {
    navigate('/');
  };

  // Recalcular validación cuando formData cambia
  const validationErrors = useMemo(() => validateProfile(formData), [formData]);
  const isFormValid = Object.keys(validationErrors).length === 0;
  
  // Mostrar errores cuando el usuario intenta avanzar
  const [showErrors, setShowErrors] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.profile.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.profile.description')}
        </p>
      </div>

      {/* Dev-only: Quick fill resume data for testing */}
      <DevResumePreloader onLoadMockData={updateResumeData} />

      {/* Guided Questions */}
      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            {t('wizard.steps.profile.ui.guided.title')}
          </h3>
          
          <div className="space-y-4">
            {/* Nombre y Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <MandatoryFieldLabel
                  label={t('wizard.steps.profile.ui.guided.firstName.label')}
                  required={true}
                  className="text-blue-800"
                />
                <SanitizedInput
                  value={formData.firstName}
                  onChange={(value) => handleChange('firstName', value)}
                  placeholder={t('wizard.steps.profile.ui.guided.firstName.placeholder')}
                  error={!!errors.firstName}
                />
                <ValidationError message={errors.firstName?.messageKey ? t(errors.firstName.messageKey) : (errors.firstName?.message || '')} />
              </div>
              
              <div>
                <MandatoryFieldLabel
                  label={t('wizard.steps.profile.ui.guided.lastName.label')}
                  required={true}
                  className="text-blue-800"
                />
                <SanitizedInput
                  value={formData.lastName}
                  onChange={(value) => handleChange('lastName', value)}
                  placeholder={t('wizard.steps.profile.ui.guided.lastName.placeholder')}
                  error={!!errors.lastName}
                />
                <ValidationError message={errors.lastName?.messageKey ? t(errors.lastName.messageKey) : (errors.lastName?.message || '')} />
              </div>
            </div>
            
            {/* País */}
            <div>
              <MandatoryFieldLabel
                label={t('wizard.steps.profile.ui.guided.country.label')}
                required={true}
                className="text-blue-800"
              />
              <select
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.country ? 'border-red-500 focus:ring-red-500' : 'border-blue-300 focus:ring-blue-500'
                }`}
              >
                <option value="">{t('wizard.steps.profile.ui.guided.country.placeholder')}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <ValidationError message={errors.country?.messageKey ? t(errors.country.messageKey) : (errors.country?.message || '')} />
            </div>
            
            {/* LinkedIn */}
            <div>
              <p className="text-blue-800 font-medium mb-2 flex items-center">
                <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                {t('wizard.steps.profile.ui.guided.linkedin.label')}
              </p>
              <SanitizedInput
                type="url"
                value={formData.linkedin}
                onChange={(value) => handleChange('linkedin', value)}
                placeholder={t('wizard.steps.profile.ui.guided.linkedin.placeholder')}
                error={!!errors.linkedin}
              />
              <ValidationError message={errors.linkedin?.messageKey ? t(errors.linkedin.messageKey) : (errors.linkedin?.message || '')} />
              <p className="text-blue-600 text-sm mt-1">
                {t('wizard.steps.profile.ui.guided.linkedin.hint')}
              </p>
            </div>
            
            <div>
              <MandatoryFieldLabel
                label={t('wizard.steps.profile.ui.guided.profession.label')}
                required={true}
                className="text-blue-800"
              />
              <SanitizedInput
                value={formData.profession}
                onChange={(value) => handleChange('profession', value)}
                placeholder={t('wizard.steps.profile.ui.guided.profession.placeholder')}
                error={!!errors.profession}
              />
              <ValidationError message={errors.profession?.messageKey ? t(errors.profession.messageKey) : (errors.profession?.message || '')} />
            </div>
            
            <div>
              <p className="text-blue-800 font-medium mb-2">
                {t('wizard.steps.profile.questions.level')}
              </p>
              <select
                value={formData.targetLevel}
                onChange={(e) => handleChange('targetLevel', e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="entry">{t('wizard.steps.profile.ui.guided.level.options.entry')}</option>
                <option value="mid">{t('wizard.steps.profile.ui.guided.level.options.mid')}</option>
                <option value="senior">{t('wizard.steps.profile.ui.guided.level.options.senior')}</option>
                <option value="executive">{t('wizard.steps.profile.ui.guided.level.options.executive')}</option>
              </select>
            </div>
            
            <div>
              <MandatoryFieldLabel
                label={t('wizard.steps.profile.ui.guided.phone.label')}
                required={true}
                className="text-blue-800"
              />
              <PhoneInput
                value={formData.phone}
                onChange={(value) => handleChange('phone', value)}
                placeholder={t('wizard.steps.profile.ui.guided.phone.placeholder')}
                error={!!errors.phone}
              />
              <ValidationError message={errors.phone?.messageKey ? t(errors.phone.messageKey) : (errors.phone?.message || '')} />
              <p className="text-blue-600 text-sm mt-1">
                {t('wizard.steps.profile.ui.guided.phone.hint')}
              </p>
            </div>
            
            <div>
              <MandatoryFieldLabel
                label={t('wizard.steps.profile.ui.guided.email.label')}
                required={true}
                className="text-blue-800"
              />
              <SanitizedInput
                type="email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                placeholder={t('wizard.steps.profile.ui.guided.email.placeholder')}
                error={!!errors.email}
              />
              <ValidationError message={errors.email?.messageKey ? t(errors.email.messageKey) : (errors.email?.message || '')} />
              <p className="text-blue-600 text-sm mt-1">
                {t('wizard.steps.profile.ui.guided.email.hint')}
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            {t('wizard.steps.profile.motivator')}
          </p>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('wizard.steps.profile.cvLanguage')}
          </label>
          <select
            value={formData.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="input-field"
          >
            <option value="es">{t('translation.languages.es')}</option>
            <option value="en">{t('translation.languages.en')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('wizard.steps.profile.cvTone')}
          </label>
          <select
            value={formData.tone}
            onChange={(e) => handleChange('tone', e.target.value)}
            className="input-field"
          >
            <option value="professional">{t('wizard.steps.profile.tones.professional')}</option>
            <option value="creative">{t('wizard.steps.profile.tones.creative')}</option>
            <option value="technical">{t('wizard.steps.profile.tones.technical')}</option>
            <option value="friendly">{t('wizard.steps.profile.tones.friendly')}</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8">
        {/* Mostrar errores cuando el usuario intenta avanzar */}
        {showErrors && !isFormValid && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium mb-2">
              {t('wizard.validation.pleaseComplete')}
            </p>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              {Object.entries(validationErrors).map(([field, error]) => (
                <li key={field}>
                  {error.messageKey ? t(error.messageKey) : error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="btn-outline flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </button>
          
          <button
            onClick={handleNext}
            className={`btn-primary flex items-center ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={!isFormValid ? Object.values(validationErrors).map(e => e.message).join(', ') : ''}
          >
            {t('common.next')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
