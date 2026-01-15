import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUploadResumeStore } from '@/stores/uploadResumeStore';
import { useAuthStore } from '@/stores/authStore';
import { 
  extractTextFromFile, 
  validateFile, 
  looksLikeResume,
  SUPPORTED_EXTENSIONS,
  FILE_SIZE_LIMITS
} from '@/utils/documentTextExtractor';
import { FileSizeLimitModal } from '@/components/FileSizeLimitModal';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Home,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  Crown,
  File
} from 'lucide-react';

export function UploadResume() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local state for this step
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFullText, setShowFullText] = useState(false);
  
  // File size limit modal state
  const [showFileSizeModal, setShowFileSizeModal] = useState(false);
  const [fileSizeModalData, setFileSizeModalData] = useState<{
    fileSizeMB: number;
    maxSizeMB: number;
  } | null>(null);
  
  // Store for persisting data across steps
  const { 
    setFile, 
    setExtractedText: storeSetExtractedText,
    setCurrentStep
  } = useUploadResumeStore();

  // Check if user can create a resume (free users need available quota)
  const canCreateResume = user?.isPremium || !user?.freeResumeUsed;
  const isFreeUser = !user?.isPremium;

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = async (file: File) => {
    setError(null);
    
    // Validate file with user's premium status
    const isPremium = user?.isPremium || false;
    const validation = validateFile(file, isPremium);
    
    if (!validation.valid) {
      // Show file size modal if it's a size limit issue
      if (validation.showFileSizeModal && validation.fileSizeMB && validation.maxSizeMB) {
        setFileSizeModalData({
          fileSizeMB: validation.fileSizeMB,
          maxSizeMB: validation.maxSizeMB,
        });
        setShowFileSizeModal(true);
        return;
      }
      
      // Show regular error for other validation issues
      setError(validation.error || t('wizard.uploadPage.toasts.invalidType'));
      return;
    }

    setSelectedFile(file);
    setFile(file);
    
    // Extract text from file
    await extractText(file);
  };

  const extractText = async (file: File) => {
    setIsExtractingText(true);
    setError(null);

    try {
      const isPremium = user?.isPremium || false;
      const result = await extractTextFromFile(file, isPremium);
      
      if (!result.success) {
        setError(result.error || t('wizard.uploadPage.extraction.extractionFailed'));
        setIsExtractingText(false);
        return;
      }

      // Check if it looks like a resume
      if (!looksLikeResume(result.text)) {
        setError(t('wizard.uploadPage.extraction.notResume'));
        setIsExtractingText(false);
        return;
      }

      setExtractedText(result.text);
      storeSetExtractedText(result.text);
      setIsExtractingText(false);
      
    } catch (err) {
      console.error('Text extraction error:', err);
      setError(t('wizard.uploadPage.extraction.extractionFailed'));
      setIsExtractingText(false);
    }
  };

  const handleProcessWithAI = () => {
    if (!extractedText) return;

    // Check if user can create resume before processing
    if (!canCreateResume) {
      // Show upgrade prompt
      return;
    }

    // Navigate to language selection step
    setCurrentStep('language');
    navigate('/wizard/upload/language');
  };

  const handleBack = () => {
    navigate('/wizard');
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setExtractedText(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <File className="w-8 h-8 text-red-500" />;
      case 'docx':
      case 'doc':
        return <File className="w-8 h-8 text-blue-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const truncatedText = extractedText?.substring(0, 500) || '';
  const hasMoreText = extractedText && extractedText.length > 500;

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

        {/* Free User Notice */}
        {isFreeUser && canCreateResume && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900">
                  {t('wizard.uploadPage.freeUserNotice.title')}
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  {t('wizard.uploadPage.freeUserNotice.message')}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  {t('wizard.uploadPage.freeUserNotice.upgradeHint')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quota Exceeded Notice */}
        {isFreeUser && !canCreateResume && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
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

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={handleClearFile}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    {t('wizard.uploadPage.actions.reupload')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Zone - Show when no file selected */}
          {!selectedFile && !isExtractingText && (
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

              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer ${
                  isDragging
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={SUPPORTED_EXTENSIONS.join(',')}
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                
                <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-green-500' : 'text-gray-400'}`} />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {t('wizard.uploadPage.dragDrop.title')}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {t('wizard.uploadPage.dragDrop.or')}
                </p>
                <span className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  {t('wizard.uploadPage.dragDrop.browse')}
                </span>
                <p className="mt-4 text-xs text-gray-500">
                  {t('wizard.uploadPage.dragDrop.hint')}
                </p>
              </div>

              {/* Supported Formats */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  {t('wizard.uploadPage.supportedFormatsLabel')}
                </h3>
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
          )}

          {/* Extracting Text State */}
          {isExtractingText && (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('wizard.uploadPage.extraction.extractingText')}
              </h3>
              <p className="text-gray-600">
                {t('wizard.uploadPage.processing.extractionHint')}
              </p>
            </div>
          )}

          {/* File Selected & Text Extracted */}
          {selectedFile && extractedText && !isExtractingText && (
            <div className="space-y-6">
              {/* File Info Card */}
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(selectedFile)}
                    <div>
                      <p className="font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • 
                        {t('wizard.uploadPage.extraction.characters', { count: extractedText.length })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClearFile}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Text Preview */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">
                    {t('wizard.uploadPage.extraction.textPreview')}
                  </h3>
                </div>
                <div className="p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                    {showFullText ? extractedText : truncatedText}
                    {hasMoreText && !showFullText && '...'}
                  </pre>
                  {hasMoreText && (
                    <button
                      onClick={() => setShowFullText(!showFullText)}
                      className="mt-3 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      {showFullText ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          {t('wizard.uploadPage.extraction.showLess')}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          {t('wizard.uploadPage.extraction.showMore')}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProcessWithAI}
                disabled={!canCreateResume}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                  canCreateResume
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>{t('wizard.uploadPage.processing.processWithAI')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* File Size Limit Modal */}
      <FileSizeLimitModal
        isOpen={showFileSizeModal}
        onClose={() => {
          setShowFileSizeModal(false);
          setFileSizeModalData(null);
        }}
        fileSizeMB={fileSizeModalData?.fileSizeMB || 0}
        maxSizeMB={fileSizeModalData?.maxSizeMB || 0}
        isPremium={user?.isPremium || false}
      />
    </div>
  );
}
