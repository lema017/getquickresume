import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Sparkles, FileText, Globe, AlertTriangle, X, Edit3, Loader2 } from 'lucide-react';
import { useCoverLetterStore } from '@/stores/coverLetterStore';
import { useAuthStore } from '@/stores/authStore';
import { SourceSelector } from '@/components/cover-letter/SourceSelector';
import { InputForm } from '@/components/cover-letter/InputForm';
import { LivePreview } from '@/components/cover-letter/LivePreview';
import { coverLetterService } from '@/services/coverLetterService';
import toast from 'react-hot-toast';

export function CoverLetterPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: coverLetterId } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuthStore();
  const {
    currentCoverLetter,
    currentCoverLetterId,
    generatedContent,
    isGenerating,
    isSaved,
    setIsGenerating,
    setGeneratedContent,
    setCurrentCoverLetterId,
    resetCoverLetter,
    updateCoverLetterData,
    setIsSaved,
  } = useCoverLetterStore();

  const [showSourceSelector, setShowSourceSelector] = useState(true);
  const [showLeaveConfirmModal, setShowLeaveConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  // Check for mode in URL params (view vs edit)
  useEffect(() => {
    const mode = searchParams.get('mode');
    setIsViewMode(mode === 'view');
  }, [searchParams]);

  // Load existing cover letter if ID is provided
  useEffect(() => {
    const loadCoverLetter = async () => {
      if (!coverLetterId || !isAuthenticated) return;

      setIsLoading(true);
      try {
        const coverLetter = await coverLetterService.getCoverLetter(coverLetterId);
        
        // Pre-populate the store with the loaded data
        updateCoverLetterData(coverLetter.data);
        setCurrentCoverLetterId(coverLetter.id);
        
        if (coverLetter.generatedContent) {
          setGeneratedContent(coverLetter.generatedContent);
        }
        
        // Mark as saved since we loaded existing data
        setIsSaved(true);
        
        // Skip source selector when loading existing cover letter
        setShowSourceSelector(false);
      } catch (error) {
        console.error('Error loading cover letter:', error);
        toast.error(t('coverLetter.errors.loadFailed') || 'Failed to load cover letter');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadCoverLetter();
  }, [coverLetterId, isAuthenticated]);

  // Check for resumeId in URL params (coming from resume card)
  useEffect(() => {
    const resumeId = searchParams.get('resumeId');
    if (resumeId && !coverLetterId) {
      setShowSourceSelector(false);
    }
  }, [searchParams, coverLetterId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Redirect non-premium users to premium page
  useEffect(() => {
    if (isAuthenticated && user && !user.isPremium) {
      navigate('/premium');
    }
  }, [isAuthenticated, user, navigate]);

  const handleGenerate = async () => {
    // Validate required fields
    if (!currentCoverLetter.companyName.trim()) {
      toast.error(t('coverLetter.errors.companyRequired'));
      return;
    }
    if (!currentCoverLetter.jobTitle.trim()) {
      toast.error(t('coverLetter.errors.jobTitleRequired'));
      return;
    }
    if (!currentCoverLetter.fullName.trim()) {
      toast.error(t('coverLetter.errors.nameRequired'));
      return;
    }

    // Get current language for AI output
    const currentLanguage = i18n.language?.startsWith('es') ? 'es' : 'en';

    setIsGenerating(true);
    try {
      const result = await coverLetterService.generateCoverLetter(
        { ...currentCoverLetter, language: currentLanguage }, 
        currentCoverLetterId || undefined
      );
      setGeneratedContent(result);
      // Store the cover letter ID for regeneration
      if (result.coverLetterId) {
        setCurrentCoverLetterId(result.coverLetterId);
      }
      toast.success(t('coverLetter.success.generated'));
    } catch (error: any) {
      console.error('Error generating cover letter:', error);
      // Handle premium required error
      if (error?.code === 'PREMIUM_REQUIRED') {
        toast.error(t('coverLetter.errors.premiumRequired') || 'You have reached your free cover letter limit. Upgrade to premium for more.');
      } else {
        toast.error(t('coverLetter.errors.generateFailed'));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    // If there's generated content and it hasn't been saved, show confirmation modal
    if (generatedContent && !isSaved) {
      setShowLeaveConfirmModal(true);
    } else {
      resetCoverLetter();
      navigate('/dashboard');
    }
  };

  const handleConfirmLeave = () => {
    setShowLeaveConfirmModal(false);
    resetCoverLetter();
    navigate('/dashboard');
  };

  const handleCancelLeave = () => {
    setShowLeaveConfirmModal(false);
  };

  const handleSourceSelected = () => {
    setShowSourceSelector(false);
  };

  const handleLanguageChange = (lang: 'en' | 'es') => {
    i18n.changeLanguage(lang);
  };

  const handleSwitchToEdit = () => {
    setIsViewMode(false);
    // Remove mode=view from URL
    searchParams.delete('mode');
    setSearchParams(searchParams);
  };

  const currentLanguage = i18n.language?.startsWith('es') ? 'es' : 'en';

  // Show loading state when loading existing cover letter
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('coverLetter.loading') || 'Loading cover letter...'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cover Letter - GetQuickResume</title>
        <meta name="description" content="Create professional cover letters" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">{t('common.back')}</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {t('coverLetter.title')}
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    {t('coverLetter.subtitle')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    currentLanguage === 'en'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('es')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    currentLanguage === 'es'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ES
                </button>
              </div>

              {/* Edit Button (View Mode) */}
              {isViewMode && (
                <button
                  onClick={handleSwitchToEdit}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium flex items-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('common.edit')}</span>
                </button>
              )}

              {/* Generate Button (Mobile) - Only show when not in view mode */}
              {!isViewMode && (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || showSourceSelector}
                  className="sm:hidden px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {isGenerating ? '...' : t('coverLetter.generate')}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showSourceSelector ? (
          <SourceSelector onSourceSelected={handleSourceSelected} />
        ) : isViewMode ? (
          /* View Mode - Full width preview only */
          <div className="max-w-4xl mx-auto">
            <LivePreview />
          </div>
        ) : (
          /* Edit Mode - Form + Preview */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Input Form */}
            <div className="lg:col-span-5 space-y-6">
              <InputForm onGenerate={handleGenerate} />
            </div>

            {/* Right Panel - Live Preview */}
            <div className="lg:col-span-7">
              <LivePreview />
            </div>
          </div>
        )}
      </main>

      {/* Leave Confirmation Modal */}
      {showLeaveConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('coverLetter.leaveModal.title') || 'Unsaved Changes'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('coverLetter.leaveModal.description') || 'You have unsaved changes. Are you sure you want to leave? Your cover letter will be lost.'}
                </p>
              </div>
              <button
                onClick={handleCancelLeave}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelLeave}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                {t('coverLetter.leaveModal.stay') || 'Stay'}
              </button>
              <button
                onClick={handleConfirmLeave}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                {t('coverLetter.leaveModal.leave') || 'Leave Without Saving'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

