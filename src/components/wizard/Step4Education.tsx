import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { ArrowRight, ArrowLeft, Plus, X, CheckCircle } from 'lucide-react';
import { FloatingTips } from '@/components/FloatingTips';
import { TipsButton } from '@/components/TipsButton';
import { MonthYearPicker } from '@/components/MonthYearPicker';
import { useTips } from '@/hooks/useTips';
import { Education, Certification } from '@/types';

export function Step4Education() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, updateResumeData, markStepCompleted, setCurrentStep } = useResumeStore();
  const { areTipsClosed, closeTips, showTips } = useTips();
  const [education, setEducation] = useState(resumeData.education);
  const [certifications, setCertifications] = useState(resumeData.certifications);
  const [isSkipped, setIsSkipped] = useState(false);

  // Sync local state when resumeData changes (for edit mode)
  useEffect(() => {
    setEducation(resumeData.education);
    setCertifications(resumeData.certifications);
  }, [resumeData.education, resumeData.certifications]);

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      isCompleted: true,
      gpa: '',
      pageNumber: null,
    };
    setEducation([...education, newEdu]);
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: '',
      pageNumber: null,
    };
    setCertifications([...certifications, newCert]);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    markStepCompleted(4);
    setCurrentStep(5);
    navigateToStep(5);
  };

  const handleNext = () => {
    updateResumeData({ education, certifications });
    markStepCompleted(4);
    setCurrentStep(5);
    navigateToStep(5);
  };

  const handleBack = () => {
    navigateToStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('wizard.steps.education.title')}
        </h2>
        <p className="text-gray-600">
          {t('wizard.steps.education.description')}
        </p>
      </div>

      {/* Tips Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.education.ui.sectionTitle')}</h3>
          {areTipsClosed && (
            <TipsButton onClick={showTips} />
          )}
        </div>
        
        {!areTipsClosed && (
          <FloatingTips
            title={`💡 ${t('wizard.steps.education.ui.tips.title')}`}
            tips={t('wizard.steps.education.ui.tips.items', { returnObjects: true }) as unknown as string[]}
            onClose={closeTips}
          />
        )}
      </div>

      {/* Skip Option */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t('wizard.steps.education.skipOption')}
          </p>
          <button
            onClick={handleSkip}
            className="btn-outline"
          >
            {t('wizard.steps.education.ui.skipButton')}
          </button>
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.education.ui.education.title')}</h3>
        {education.map((edu, index) => (
          <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">{t('wizard.steps.education.ui.education.entryTitle', { index: index + 1 })}</h4>
              <button
                onClick={() => setEducation(education.filter(e => e.id !== edu.id))}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.education.labels.institution')}
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => setEducation(education.map(ed => ed.id === edu.id ? {...ed, institution: e.target.value} : ed))}
                  className="input-field"
                  placeholder={t('wizard.steps.education.ui.education.placeholders.institution')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.education.labels.degree')}
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => setEducation(education.map(ed => ed.id === edu.id ? {...ed, degree: e.target.value} : ed))}
                  className="input-field"
                  placeholder={t('wizard.steps.education.ui.education.placeholders.degree')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.education.labels.field')}
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => setEducation(education.map(ed => ed.id === edu.id ? {...ed, field: e.target.value} : ed))}
                  className="input-field"
                  placeholder={t('wizard.steps.education.ui.education.placeholders.field')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.education.labels.graduationYear')}
                </label>
                <input
                  type="number"
                  value={edu.endDate}
                  onChange={(e) => setEducation(education.map(ed => ed.id === edu.id ? {...ed, endDate: e.target.value} : ed))}
                  className="input-field"
                  placeholder={t('wizard.steps.education.ui.education.placeholders.graduationYear')}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addEducation}
          className="w-full btn-outline flex items-center justify-center py-4"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('wizard.steps.education.ui.education.addButton')}
        </button>
      </div>

      {/* Certifications Section */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900">{t('wizard.steps.education.ui.certifications.title')}</h3>
        {certifications.map((cert, index) => (
          <div key={cert.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">{t('wizard.steps.education.ui.certifications.entryTitle', { index: index + 1 })}</h4>
              <button
                onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.certifications.labels.name')}
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, name: e.target.value} : c))}
                  className="input-field"
                  placeholder={t('wizard.steps.education.ui.certifications.placeholders.name')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.certifications.labels.issuer')}
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, issuer: e.target.value} : c))}
                  className="input-field"
                  placeholder={t('wizard.steps.education.ui.certifications.placeholders.issuer')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.certifications.labels.date')}
                </label>
                <MonthYearPicker
                  value={cert.date}
                  onChange={(value) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, date: value} : c))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text.sm font-medium text-gray-700 mb-1">
                  {t('wizard.steps.education.ui.certifications.labels.credentialId')}
                </label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, credentialId: e.target.value} : c))}
                  className="input-field"
                  placeholder={t('wizard.steps.education.ui.certifications.placeholders.credentialId')}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addCertification}
          className="w-full btn-outline flex items-center justify-center py-4"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('wizard.steps.education.ui.certifications.addButton')}
        </button>
      </div>

      {/* Motivation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 text-sm flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          {t('wizard.steps.education.motivator')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button onClick={handleBack} className="btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </button>
        <button onClick={handleNext} className="btn-primary flex items-center">
          {t('common.next')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
