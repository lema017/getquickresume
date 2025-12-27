import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Download,
  Eye,
  Home
} from 'lucide-react';
import toast from 'react-hot-toast';

export function UploadResume() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { navigateToStep } = useWizardNavigation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error(t('wizard.uploadPage.toasts.invalidType'));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(t('wizard.uploadPage.toasts.tooLarge'));
        return;
      }

      setUploadedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setIsProcessing(true);

    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock extracted data
      const mockExtractedData = {
        personalInfo: {
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan.perez@email.com',
          phone: '+34 123 456 789',
          location: 'Madrid, España',
          linkedin: 'linkedin.com/in/juanperez'
        },
        summary: 'Desarrollador Full Stack con 5 años de experiencia en tecnologías web modernas. Especializado en React, Node.js y bases de datos. Apasionado por crear soluciones innovadoras y escalables.',
        experience: [
          {
            title: 'Desarrollador Senior',
            company: 'TechCorp Solutions',
            duration: '2020 - Presente',
            description: 'Lideré el desarrollo de aplicaciones web escalables usando React y Node.js. Mejoré el rendimiento de la aplicación en un 40%.'
          },
          {
            title: 'Desarrollador Full Stack',
            company: 'StartupXYZ',
            duration: '2018 - 2020',
            description: 'Desarrollé y mantuve aplicaciones web completas desde el frontend hasta el backend. Trabajé en equipo ágil con metodologías Scrum.'
          }
        ],
        education: [
          {
            degree: 'Grado en Ingeniería Informática',
            institution: 'Universidad Politécnica de Madrid',
            year: '2018'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker'],
        languages: [
          { language: 'Español', level: 'Nativo' },
          { language: 'Inglés', level: 'Avanzado' }
        ]
      };

      setExtractedData(mockExtractedData);
      toast.success(t('wizard.uploadPage.toasts.processed'));
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(t('wizard.uploadPage.toasts.processError'));
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    if (extractedData) {
      // Navigate to manual wizard with pre-filled data
      navigateToStep(1, { 
        state: { 
          preFilledData: extractedData,
          fromUpload: true 
        } 
      });
    }
  };

  const handleBack = () => {
    navigate('/wizard');
  };

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
            <span>{t('wizard.uploadPage.header.backToOptions')}</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('wizard.uploadPage.header.title')}
          </h1>
          <p className="text-gray-600">
            {t('wizard.uploadPage.header.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {!uploadedFile ? (
            /* Upload Section */
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('wizard.uploadPage.selectFileTitle')}
              </h2>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {t('wizard.uploadPage.selectFileDescription')}
              </p>

              {/* File Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-green-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {t('wizard.uploadPage.clickToSelect')}
                </p>
                <p className="text-sm text-gray-500">
                  {t('wizard.uploadPage.acceptedFormats')}
                </p>
              </div>

              {/* Supported Formats */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">{t('wizard.uploadPage.supportedFormatsLabel')}</h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('wizard.uploadPage.formats.pdf')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('wizard.uploadPage.formats.word')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('wizard.uploadPage.formats.txt')}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : !extractedData ? (
            /* Processing Section */
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                ) : (
                  <FileText className="w-12 h-12 text-white" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isProcessing ? t('wizard.uploadPage.processing.processingTitle') : t('wizard.uploadPage.processing.selectedTitle')}
              </h2>
              
              <p className="text-gray-600 mb-8">
                {isProcessing 
                  ? t('wizard.uploadPage.processing.message')
                  : t('wizard.uploadPage.processing.fileName', { name: uploadedFile.name })
                }
              </p>

              {!isProcessing && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">{uploadedFile.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{t('wizard.uploadPage.processing.uploading')}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>{t('wizard.uploadPage.processing.processWithAI')}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="animate-pulse">●</div>
                    <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</div>
                    <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {t('wizard.uploadPage.processing.extractionHint')}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('wizard.uploadPage.toasts.processed')}
                </h2>
                <p className="text-gray-600">
                  {t('wizard.uploadPage.preview.title')}
                </p>
              </div>

              {/* Extracted Data Preview */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {t('wizard.uploadPage.preview.title')}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{t('wizard.uploadPage.preview.sections.personalInfo')}</h4>
                    <p className="text-sm text-gray-600">
                      {extractedData.personalInfo.firstName} {extractedData.personalInfo.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{extractedData.personalInfo.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{t('wizard.uploadPage.preview.sections.workExperience')}</h4>
                    <p className="text-sm text-gray-600">
                      {t('wizard.uploadPage.preview.positionsFound', { count: extractedData.experience.length })}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{t('wizard.uploadPage.preview.sections.skills')}</h4>
                    <p className="text-sm text-gray-600">
                      {extractedData.skills.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {t('wizard.uploadPage.actions.reupload')}
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>{t('wizard.uploadPage.actions.continueOptimization')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
