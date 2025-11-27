import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, ArrowLeft, CheckCircle, Linkedin, Lightbulb } from 'lucide-react';
import { countries } from '@/utils/countries';
import { validateProfile, FieldValidation } from '@/utils/validation';
import { ValidationError } from '@/components/ValidationError';
import { SanitizedInput } from '@/components/SanitizedInput';
import { PhoneInput } from '@/components/PhoneInput';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { useTips } from '@/hooks/useTips';

export function Step1Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep } = useResumeStore();
  const { user } = useAuthStore();
  const { areTipsClosed, closeTips, showTips } = useTips();
  const [errors, setErrors] = useState<FieldValidation>({});
  const [formData, setFormData] = useState({
    firstName: resumeData.firstName || user?.fullName?.split(' ')[0] || '',
    lastName: resumeData.lastName || user?.fullName?.split(' ').slice(1).join(' ') || '',
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
      firstName: resumeData.firstName || user?.fullName?.split(' ')[0] || '',
      lastName: resumeData.lastName || user?.fullName?.split(' ').slice(1).join(' ') || '',
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
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validar el campo específico cuando cambia
    const fieldValidation = validateProfile({ ...formData, [field]: value });
    
    // Actualizar errores solo para este campo
    setErrors(prev => {
      const newErrors = { ...prev };
      if (fieldValidation[field]) {
        newErrors[field] = fieldValidation[field];
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleNext = () => {
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
    updateResumeData(formData);
    markStepCompleted(1);
    setCurrentStep(2);
    navigate('/wizard/manual/step-2');
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

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.profile.ui.sectionTitle')}</h3>
          {areTipsClosed && (
            <TipsButton onClick={showTips} />
          )}
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title={`💡 ${t('wizard.steps.profile.ui.tips.title')}`}
            tips={t('wizard.steps.profile.ui.tips.items', { returnObjects: true }) as unknown as string[]}
            onClose={closeTips}
          />
        )}
      </div>

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
                <p className="text-blue-800 font-medium mb-2">
                  {t('wizard.steps.profile.ui.guided.firstName.label')}
                </p>
                <SanitizedInput
                  value={formData.firstName}
                  onChange={(value) => handleChange('firstName', value)}
                  placeholder={t('wizard.steps.profile.ui.guided.firstName.placeholder')}
                  error={!!errors.firstName}
                />
                <ValidationError message={errors.firstName?.message || ''} />
              </div>
              
              <div>
                <p className="text-blue-800 font-medium mb-2">
                  {t('wizard.steps.profile.ui.guided.lastName.label')}
                </p>
                <SanitizedInput
                  value={formData.lastName}
                  onChange={(value) => handleChange('lastName', value)}
                  placeholder={t('wizard.steps.profile.ui.guided.lastName.placeholder')}
                  error={!!errors.lastName}
                />
                <ValidationError message={errors.lastName?.message || ''} />
              </div>
            </div>
            
            {/* País */}
            <div>
              <p className="text-blue-800 font-medium mb-2">
                {t('wizard.steps.profile.ui.guided.country.label')}
              </p>
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
              <ValidationError message={errors.country?.message || ''} />
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
              <ValidationError message={errors.linkedin?.message || ''} />
              <p className="text-blue-600 text-sm mt-1">
                {t('wizard.steps.profile.ui.guided.linkedin.hint')}
              </p>
            </div>
            
            <div>
              <p className="text-blue-800 font-medium mb-2">
                {t('wizard.steps.profile.ui.guided.profession.label')}
              </p>
              <SanitizedInput
                value={formData.profession}
                onChange={(value) => handleChange('profession', value)}
                placeholder={t('wizard.steps.profile.ui.guided.profession.placeholder')}
                error={!!errors.profession}
              />
              <ValidationError message={errors.profession?.message || ''} />
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
              <p className="text-blue-800 font-medium mb-2">
                {t('wizard.steps.profile.ui.guided.phone.label')}
              </p>
              <PhoneInput
                value={formData.phone}
                onChange={(value) => handleChange('phone', value)}
                placeholder={t('wizard.steps.profile.ui.guided.phone.placeholder')}
                error={!!errors.phone}
              />
              <ValidationError message={errors.phone?.message || ''} />
              <p className="text-blue-600 text-sm mt-1">
                {t('wizard.steps.profile.ui.guided.phone.hint')}
              </p>
            </div>
            
            <div>
              <p className="text-blue-800 font-medium mb-2">
                {t('wizard.steps.profile.ui.guided.email.label')}
              </p>
              <SanitizedInput
                type="email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                placeholder={t('wizard.steps.profile.ui.guided.email.placeholder')}
                error={!!errors.email}
              />
              <ValidationError message={errors.email?.message || ''} />
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
              {t('wizard.validation.pleaseComplete') || 'Por favor, completa los siguientes campos:'}
            </p>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              {Object.entries(validationErrors).map(([field, error]) => (
                <li key={field}>{error.message}</li>
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
