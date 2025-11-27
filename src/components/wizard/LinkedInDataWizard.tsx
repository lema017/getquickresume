import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  ArrowRight, 
  Linkedin, 
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  SkipForward,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import toast from 'react-hot-toast';
import { linkedInProfileService } from '@/services/linkedInProfileService';

interface LinkedInWizardState {
  profession: string;
  about: string;
  experience: string;
  education: string;
  certifications: string;
  projects: string;
  skills: string;
  currentStep: number;
  targetLanguage?: 'es' | 'en';
}

interface LinkedInDataWizardProps {
  onBack: () => void;
}

export function LinkedInDataWizard({ onBack }: LinkedInDataWizardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [wizardState, setWizardState] = useState<LinkedInWizardState>({
    profession: '',
    about: '',
    experience: '',
    education: '',
    certifications: '',
    projects: '',
    skills: '',
    currentStep: 0,
    targetLanguage: 'es'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  const [rotatingMessageIndex, setRotatingMessageIndex] = useState(0);

  const totalSteps = 7;
  const requiredSteps = [0, 1, 2, 3]; // Profesión, Acerca de, Experiencia, Educación
  const optionalSteps = [4, 5, 6]; // Certificaciones, Proyectos, Habilidades

  const stepConfig = [
    {
      id: 0,
      title: t('wizard.linkedinImportPage.steps.profession.title'),
      description: t('wizard.linkedinImportPage.steps.profession.description'),
      required: true,
      instructions: t('wizard.linkedinImportPage.steps.profession.instructions', { returnObjects: true }) as string[],
      placeholder: t('wizard.linkedinImportPage.steps.profession.placeholder'),
      field: 'profession' as keyof LinkedInWizardState
    },
    {
      id: 1,
      title: t('wizard.linkedinImportPage.steps.about.title'),
      description: t('wizard.linkedinImportPage.steps.about.description'),
      required: true,
      instructions: t('wizard.linkedinImportPage.steps.about.instructions', { returnObjects: true }) as string[],
      placeholder: t('wizard.linkedinImportPage.steps.about.placeholder'),
      field: 'about' as keyof LinkedInWizardState
    },
    {
      id: 2,
      title: t('wizard.linkedinImportPage.steps.experience.title'),
      description: t('wizard.linkedinImportPage.steps.experience.description'),
      required: true,
      instructions: t('wizard.linkedinImportPage.steps.experience.instructions', { returnObjects: true }) as string[],
      placeholder: t('wizard.linkedinImportPage.steps.experience.placeholder'),
      field: 'experience' as keyof LinkedInWizardState
    },
    {
      id: 3,
      title: t('wizard.linkedinImportPage.steps.education.title'),
      description: t('wizard.linkedinImportPage.steps.education.description'),
      required: true,
      instructions: t('wizard.linkedinImportPage.steps.education.instructions', { returnObjects: true }) as string[],
      placeholder: t('wizard.linkedinImportPage.steps.education.placeholder'),
      field: 'education' as keyof LinkedInWizardState
    },
    {
      id: 4,
      title: t('wizard.linkedinImportPage.steps.certifications.title'),
      description: t('wizard.linkedinImportPage.steps.certifications.description'),
      required: false,
      instructions: t('wizard.linkedinImportPage.steps.certifications.instructions', { returnObjects: true }) as string[],
      placeholder: t('wizard.linkedinImportPage.steps.certifications.placeholder'),
      field: 'certifications' as keyof LinkedInWizardState
    },
    {
      id: 5,
      title: t('wizard.linkedinImportPage.steps.projects.title'),
      description: t('wizard.linkedinImportPage.steps.projects.description'),
      required: false,
      instructions: t('wizard.linkedinImportPage.steps.projects.instructions', { returnObjects: true }) as string[],
      placeholder: t('wizard.linkedinImportPage.steps.projects.placeholder'),
      field: 'projects' as keyof LinkedInWizardState
    },
    {
      id: 6,
      title: t('wizard.linkedinImportPage.steps.skills.title'),
      description: t('wizard.linkedinImportPage.steps.skills.description'),
      required: false,
      instructions: t('wizard.linkedinImportPage.steps.skills.instructions', { returnObjects: true }) as string[],
      placeholder: t('wizard.linkedinImportPage.steps.skills.placeholder'),
      field: 'skills' as keyof LinkedInWizardState
    }
  ];

  const currentStepConfig = stepConfig.find(step => step.id === wizardState.currentStep);
  
  // Early return if step config not found
  if (!currentStepConfig) {
    console.error('Step config not found for step:', wizardState.currentStep);
    console.error('Available step IDs:', stepConfig.map(s => s.id));
    console.error('Current wizard state:', wizardState);
    // Reset to step 0 if invalid
    if (wizardState.currentStep !== 0) {
      setWizardState(prev => ({ ...prev, currentStep: 0 }));
      return null;
    }
    return null;
  }
  
  const isCurrentStepRequired = currentStepConfig.required;
  const currentFieldValue = wizardState[currentStepConfig.field] ?? '';
  const isCurrentStepCompleted = (typeof currentFieldValue === 'string' ? currentFieldValue.trim().length : String(currentFieldValue).trim().length) > 0;

  const handleInputChange = (value: string) => {
    // Sanitizar contenido según el paso
    let sanitizedValue = value;
    if (currentStepConfig.field === 'skills') {
      sanitizedValue = sanitizeSkillsContent(value);
    } else if (currentStepConfig.field === 'education') {
      sanitizedValue = sanitizeEducationContent(value);
    } else if (currentStepConfig.field === 'certifications') {
      sanitizedValue = sanitizeCertificationsContent(value);
    } else if (currentStepConfig.field === 'projects') {
      sanitizedValue = sanitizeProjectsContent(value);
    }
    
    setWizardState(prev => ({
      ...prev,
      [currentStepConfig.field]: sanitizedValue
    }));
  };

  const sanitizeSkillsContent = (content: string): string => {
    if (!content.trim()) return content;
    
    // Dividir por líneas y limpiar
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Filtrar líneas que no son habilidades (eliminar texto de LinkedIn)
    const filteredLines = lines.filter(line => {
      // Filtros existentes
      if (line.match(/\d+\s+validaciones?/i)) return false;
      if (line.match(/validada\s+por/i)) return false;
      if (line.match(/logotipo\s+de/i)) return false;
      if (line.match(/foto\s+de\s+perfil/i)) return false;
      if (line.match(/personas\s+que\s+conocen/i)) return false;
      if (line.match(/compañeros\s+de/i)) return false;
      if (line.match(/validaciones?/i)) return false;
      if (line.match(/^\d+$/)) return false;
      
      // NUEVOS FILTROS para metadata de LinkedIn
      if (line.match(/\d+\s+experiencias?\s+en/i)) return false;
      if (line.match(/empresas?\s+más/i)) return false;
      if (line.match(/\d+\s+empresas?\s+más/i)) return false;
      
      // Filtrar líneas que parecen cargos/empresas duplicados
      if (line.match(/en\s+[A-Z][a-zA-Z\s]+en\s+[A-Z]/)) return false;
      
      // Filtrar líneas con múltiples "en" (indica cargo duplicado)
      const enCount = (line.match(/\sen\s/gi) || []).length;
      if (enCount >= 2) return false;
      
      // Filtrar "Manager en", "Developer en", etc (cargos, no skills)
      if (line.match(/(Manager|Developer|Engineer|Director|Analyst|Specialist|Coordinator|Lead|Architect)\s+en\s+[A-Z]/i)) return false;
      
      // Eliminar líneas vacías o muy cortas (menos de 2 caracteres)
      if (line.length < 2) return false;
      
      return true;
    });
    
    // Eliminar duplicados manteniendo el orden
    const uniqueLines = [...new Set(filteredLines)];
    
    // Unir las líneas únicas con saltos de línea
    return uniqueLines.join('\n');
  };

  const sanitizeEducationContent = (content: string): string => {
    if (!content.trim()) return content;
    
    // Dividir por líneas y limpiar
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Filtrar líneas que no son información educativa relevante
    const filteredLines = lines.filter(line => {
      // Eliminar líneas que contienen información de logotipos
      if (line.match(/logotipo\s+de/i)) return false;
      if (line.match(/logo\s+de/i)) return false;
      
      // Eliminar líneas vacías o muy cortas (menos de 2 caracteres)
      if (line.length < 2) return false;
      
      return true;
    });
    
    // Eliminar duplicados manteniendo el orden
    const uniqueLines = [...new Set(filteredLines)];
    
    // Unir las líneas únicas con saltos de línea
    return uniqueLines.join('\n');
  };

  const sanitizeCertificationsContent = (content: string): string => {
    if (!content.trim()) return content;
    
    // Dividir por líneas y limpiar
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Filtrar líneas que no son información de certificaciones relevante
    const filteredLines = lines.filter(line => {
      // Eliminar líneas que contienen información de logotipos
      if (line.match(/logotipo\s+de/i)) return false;
      if (line.match(/logo\s+de/i)) return false;
      
      // Eliminar líneas que contienen "Mostrar credencial"
      if (line.match(/mostrar\s+credencial/i)) return false;
      
      // Eliminar líneas que contienen "ID de la credencial" (mantener solo el ID)
      if (line.match(/id\s+de\s+la\s+credencial/i)) return false;
      
      // Eliminar líneas que son solo IDs de credenciales (formato específico)
      if (line.match(/^[A-Z0-9-]+$/)) return false;
      
      // Eliminar líneas vacías o muy cortas (menos de 2 caracteres)
      if (line.length < 2) return false;
      
      return true;
    });
    
    // Procesar líneas para eliminar duplicados específicos
    const processedLines = filteredLines.map(line => {
      // Detectar y limpiar duplicados de instituciones (ej: "UdemyUdemy" -> "Udemy")
      if (line.match(/^(.+)\1$/)) {
        const match = line.match(/^(.+)\1$/);
        if (match) {
          return match[1];
        }
      }
      
      // Detectar y limpiar duplicados de fechas (ej: "Expedición: jun. 2023Expedición: jun. 2023" -> "Expedición: jun. 2023")
      if (line.match(/^(Expedición: .+)\1$/)) {
        const match = line.match(/^(Expedición: .+)\1$/);
        if (match) {
          return match[1];
        }
      }
      
      // Detectar y limpiar duplicados de vencimiento (ej: "Vencimiento: may. 2024Vencimiento: may. 2024" -> "Vencimiento: may. 2024")
      if (line.match(/^(Vencimiento: .+)\1$/)) {
        const match = line.match(/^(Vencimiento: .+)\1$/);
        if (match) {
          return match[1];
        }
      }
      
      return line;
    });
    
    // Eliminar duplicados manteniendo el orden
    const uniqueLines = [...new Set(processedLines)];
    
    // Unir las líneas únicas con saltos de línea
    return uniqueLines.join('\n');
  };

  const sanitizeProjectsContent = (content: string): string => {
    if (!content.trim()) return content;
    
    // Dividir por líneas y limpiar
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Filtrar líneas que no son información de proyectos relevante
    const filteredLines = lines.filter(line => {
      // Eliminar líneas que contienen información de logotipos
      if (line.match(/logotipo\s+de\s+la\s+empresa/i)) return false;
      if (line.match(/logotipo\s+de/i)) return false;
      if (line.match(/logo\s+de/i)) return false;
      
      // Eliminar líneas que contienen "Mostrar proyecto"
      if (line.match(/mostrar\s+proyecto/i)) return false;
      
      // Eliminar líneas que contienen "Otros colaboradores"
      if (line.match(/otros\s+colaboradores/i)) return false;
      
      // Eliminar líneas que son solo números (cantidad de colaboradores)
      if (line.match(/^\d+$/)) return false;
      
      // Eliminar líneas vacías o muy cortas (menos de 2 caracteres)
      if (line.length < 2) return false;
      
      return true;
    });
    
    // Procesar líneas para eliminar duplicados específicos
    const processedLines = filteredLines.map(line => {
      // Detectar y limpiar duplicados de nombres de proyectos (ej: "Petzila incPetzila inc" -> "Petzila inc")
      if (line.match(/^(.+)\1$/)) {
        const match = line.match(/^(.+)\1$/);
        if (match) {
          return match[1];
        }
      }
      
      // Detectar y limpiar duplicados de fechas (ej: "jun. 2014 - actualidadjun. 2014 - actualidad" -> "jun. 2014 - actualidad")
      if (line.match(/^(.+\s+\d{4}\s+-\s+.+)\1$/)) {
        const match = line.match(/^(.+\s+\d{4}\s+-\s+.+)\1$/);
        if (match) {
          return match[1];
        }
      }
      
      // Detectar y limpiar duplicados de empresas asociadas (ej: "Asociada con Growth Acceleration PartnersAsociada con Growth Acceleration Partners" -> "Asociada con Growth Acceleration Partners")
      if (line.match(/^(Asociada\s+con\s+.+)\1$/)) {
        const match = line.match(/^(Asociada\s+con\s+.+)\1$/);
        if (match) {
          return match[1];
        }
      }
      
      return line;
    });
    
    // Eliminar duplicados manteniendo el orden
    const uniqueLines = [...new Set(processedLines)];
    
    // Unir las líneas únicas con saltos de línea
    return uniqueLines.join('\n');
  };

  const handleNext = () => {
    if (wizardState.currentStep < totalSteps - 1) {
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (wizardState.currentStep < totalSteps - 1) {
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (wizardState.currentStep > 1) {
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    } else {
      onBack();
    }
  };

  const processingSteps = (t('wizard.linkedinImportPage.processing.steps', { returnObjects: true }) as Array<{ title: string; message: string }>).map((step, index) => {
    const durations = [2000, 15000, 5000, 2000];
    return {
      ...step,
      duration: durations[index] || 2000
    };
  });

  const handleComplete = async () => {
    // Validar que los pasos requeridos estén completados
    const missingRequired = requiredSteps.filter(step => {
      const stepConfigItem = stepConfig.find(s => s.id === step);
      if (!stepConfigItem) return true;
      const value = wizardState[stepConfigItem.field] ?? '';
      const str = typeof value === 'string' ? value : String(value);
      return str.trim().length === 0;
    });

    if (missingRequired.length > 0) {
      toast.error(t('wizard.linkedinImportPage.errors.completeRequiredSteps'));
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);
    let response: any = null;
    
    try {
      // Simular pasos de procesamiento
      for (let i = 0; i < processingSteps.length; i++) {
        setProcessingStep(i);
        setProcessingMessage(processingSteps[i].message);
        
        // Solo en el paso de IA hacer la llamada real
        if (i === 1) {
          response = await linkedInProfileService.parseLinkedInData({
            profession: wizardState.profession,
            about: wizardState.about,
            experience: wizardState.experience,
            education: wizardState.education,
            certifications: wizardState.certifications || undefined,
            projects: wizardState.projects || undefined,
            skills: wizardState.skills || undefined,
            targetLanguage: wizardState.targetLanguage || 'es'
          });

          if (!response.success || !response.resumeId) {
            throw new Error(response.error || t('wizard.linkedinImportPage.errors.processingError'));
          }
        } else {
          // Simular tiempo de procesamiento para otros pasos
          await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration));
        }
      }

      // Completar procesamiento
      setProcessingStep(processingSteps.length);
      setProcessingMessage(t('wizard.linkedinImportPage.processing.complete'));
      
      // Pequeña pausa antes de redirigir
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear localStorage before redirecting to wizard
      localStorage.removeItem('resume_wizard_v1');
      localStorage.removeItem('generated-resume');
      
      toast.success(t('wizard.linkedinImportPage.success.linkedInProcessed'));
      // Redirigir al wizard con el resumeId
      navigate(`/wizard/manual/step-1?resumeId=${response.resumeId}`);
    } catch (error) {
      console.error('Error processing LinkedIn data:', error);
      toast.error(t('wizard.linkedinImportPage.errors.linkedInProcessingError'));
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
      setProcessingMessage('');
    }
  };

  // Rotate motivational messages while processing
  useEffect(() => {
    if (!isProcessing) {
      setRotatingMessageIndex(0);
      return;
    }

    const messages = t('wizard.linkedinImportPage.processing.messages', { returnObjects: true }) as string[];
    if (!Array.isArray(messages) || messages.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setRotatingMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3500); // Rotate every 3.5 seconds

    return () => clearInterval(interval);
  }, [isProcessing, t]);

  const canProceed = isCurrentStepRequired ? isCurrentStepCompleted : true;
  const progressPercentage = (wizardState.currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('wizard.linkedinImportPage.wizard.back')}</span>
          </button>
          
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <Linkedin className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('wizard.linkedinImportPage.wizard.header.title')}
          </h1>
          <p className="text-gray-600">
            {t('wizard.linkedinImportPage.wizard.header.subtitle')}
          </p>
        </div>

        {/* Language selector with toggle buttons */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                {t('linkedinWizard.targetLanguage')}
              </span>
            </div>
            <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-gray-50">
              <button
                type="button"
                onClick={() => setWizardState(s => ({ ...s, targetLanguage: 'es' }))}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  wizardState.targetLanguage === 'es'
                    ? 'bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {wizardState.targetLanguage === 'es' && <CheckCircle className="w-4 h-4" />}
                  🇪🇸 Español
                </span>
              </button>
              <button
                type="button"
                onClick={() => setWizardState(s => ({ ...s, targetLanguage: 'en' }))}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  wizardState.targetLanguage === 'en'
                    ? 'bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {wizardState.targetLanguage === 'en' && <CheckCircle className="w-4 h-4" />}
                  🇺🇸 English
                </span>
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
            {t('linkedinWizard.languageExplanation')}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {t('wizard.linkedinImportPage.wizard.progress.step', { current: wizardState.currentStep + 1, total: totalSteps })}
            </span>
            <span className="text-sm text-gray-500">
              {t('wizard.linkedinImportPage.wizard.progress.completed', { percentage: Math.round(progressPercentage) })}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="max-w-3xl mx-auto">
            {/* Step Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4" />
                {isCurrentStepRequired ? t('wizard.linkedinImportPage.wizard.stepBadge.required') : t('wizard.linkedinImportPage.wizard.stepBadge.optional')}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentStepConfig.title}
              </h2>
              <p className="text-gray-600">
                {currentStepConfig.description}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                {t('wizard.linkedinImportPage.wizard.instructions.title')}
              </h3>
              <ol className="space-y-2 text-blue-800">
                {currentStepConfig.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Input Area */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('wizard.linkedinImportPage.wizard.input.label', { title: currentStepConfig.title })}
              </label>
              {currentStepConfig.field === 'profession' ? (
                <input
                  type="text"
                  value={wizardState[currentStepConfig.field]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepConfig.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  disabled={isProcessing}
                />
              ) : (
                <textarea
                  value={wizardState[currentStepConfig.field]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepConfig.placeholder}
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  disabled={isProcessing}
                />
              )}
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {(wizardState[currentStepConfig.field] ?? '').toString().length} {t('wizard.linkedinImportPage.wizard.input.characters')}
                </span>
                {((currentStepConfig.field === 'skills' || currentStepConfig.field === 'education' || currentStepConfig.field === 'certifications' || currentStepConfig.field === 'projects') && ((wizardState[currentStepConfig.field] ?? '').toString().length > 0)) && (
                  <span className="text-blue-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {t('wizard.linkedinImportPage.wizard.input.sanitized')}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isProcessing}
              >
                <ChevronLeft className="w-4 h-4" />
                {t('wizard.linkedinImportPage.wizard.buttons.back')}
              </button>

              <div className="flex items-center gap-3">
                {!isCurrentStepRequired && (
                  <button
                    onClick={handleSkip}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={isProcessing}
                  >
                    <SkipForward className="w-4 h-4" />
                    {t('wizard.linkedinImportPage.wizard.buttons.skip')}
                  </button>
                )}

                <button
                  onClick={handleNext}
                  disabled={!canProceed || isProcessing}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-600 to-blue-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('wizard.linkedinImportPage.wizard.buttons.processing')}
                    </>
                  ) : wizardState.currentStep === totalSteps - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      {t('wizard.linkedinImportPage.wizard.buttons.processInfo')}
                    </>
                  ) : (
                    <>
                      {t('wizard.linkedinImportPage.wizard.buttons.next')}
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {isCurrentStepRequired ? (
                  <span className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {t('wizard.linkedinImportPage.wizard.help.required')}
                  </span>
                ) : (
                  t('wizard.linkedinImportPage.wizard.help.optional')
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
            <div className="text-center">
              {/* Header */}
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('wizard.linkedinImportPage.processing.title')}
                </h3>
                <p className="text-gray-600">
                  {t('wizard.linkedinImportPage.processing.subtitle')}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-4 mb-6">
                {processingSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index < processingStep 
                        ? 'bg-green-500 text-white' 
                        : index === processingStep 
                        ? 'bg-gradient-to-r from-orange-500 to-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index < processingStep ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : index === processingStep ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${
                        index <= processingStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                      {index === processingStep && (
                        <div className="text-sm text-gray-600 mt-1">
                          {processingMessage}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(((processingStep + 1) / processingSteps.length) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {t('wizard.linkedinImportPage.wizard.processingProgress.completed', { 
                    percentage: Math.round(Math.min(((processingStep + 1) / processingSteps.length) * 100, 100)) 
                  })}
                </div>
              </div>

              {/* Rotating Motivational Messages */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 transition-opacity duration-500">
                  {(() => {
                    const messages = t('wizard.linkedinImportPage.processing.messages', { returnObjects: true }) as string[];
                    if (Array.isArray(messages) && messages.length > 0) {
                      return messages[rotatingMessageIndex] || messages[0];
                    }
                    return '';
                  })()}
                </p>
              </div>

              {/* Warning */}
              <div className="mt-4 text-xs text-gray-500">
                {t('wizard.linkedinImportPage.processing.warning')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
