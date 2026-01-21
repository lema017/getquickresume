import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Resume } from '@/types';
import { ResumeTranslationModal } from '@/components/ResumeTranslationModal';
import { ShareResumeModal } from '@/components/ShareResumeModal';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { ResumeList } from '@/components/dashboard/ResumeList';
import { CoverLetterList } from '@/components/dashboard/CoverLetterList';
import { JobApplicationsList } from '@/components/dashboard/JobApplicationsList';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { useConfirmation } from '@/hooks/useConfirmation';
import { resumeScoringService, RateLimitError } from '@/services/resumeScoringService';
import { RateLimitWarning } from '@/components/RateLimitWarning';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { formatName } from '@/utils/textFormatting';
import { 
  FileText, 
  Mail, 
  Plus,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    resumes,
    stats,
    isLoading,
    loadDashboard,
    deleteResume,
  } = useDashboardStore();

  const confirmation = useConfirmation();
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [selectedResumeForTranslation, setSelectedResumeForTranslation] = useState<Resume | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedResumeForSharing, setSelectedResumeForSharing] = useState<Resume | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState<'enhance' | 'rescore' | 'edit' | 'createResume'>('enhance');
  const [rescoringResumeId, setRescoringResumeId] = useState<string | null>(null);

  // Check if user can create new resume (premium OR free user who hasn't used their quota)
  const canCreateResume = user?.isPremium || !user?.freeResumeUsed;

  // Handler for creating new resume from empty state
  const handleCreateResumeFromEmptyState = () => {
    if (canCreateResume) {
      navigate('/wizard');
    } else {
      setPremiumFeature('createResume');
      setShowPremiumModal(true);
    }
  };
  
  // Rate limit modal state
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<number>(0);
  const [rateLimitResumeId, setRateLimitResumeId] = useState<string | null>(null);

  const { refreshUserPremiumStatus } = useAuthStore();

  // Refresh premium status and load dashboard data on mount
  useEffect(() => {
    if (isAuthenticated) {
      // Refresh premium status from JWT token (ensures it's up-to-date)
      refreshUserPremiumStatus();
      loadDashboard();
    }
  }, [isAuthenticated, loadDashboard, refreshUserPremiumStatus]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleViewResume = (resume: Resume) => {
    navigate(`/resume/${resume.id}`);
  };

  const handleEditResume = (resume: Resume) => {
    // Clear localStorage before editing resume
    localStorage.removeItem('resume_wizard_v1');
    localStorage.removeItem('generated-resume');
    navigate(`/wizard/manual/step-1?resumeId=${resume.id}`);
  };

  const handleDownloadResume = async (resume: Resume) => {
    if (!resume.generatedResume) {
      toast.error(t('dashboard.actions.resumeNotGenerated'));
      return;
    }
    
    // Navigate to resume view page where download functionality is available
    navigate(`/resume/${resume.id}`);
  };

  const handleTranslateResume = (resume: Resume) => {
    if (resume.generatedResume) {
      setSelectedResumeForTranslation(resume);
      setShowTranslationModal(true);
    }
  };

  const handleShareResume = (resume: Resume) => {
    if (resume.generatedResume) {
      setSelectedResumeForSharing(resume);
      setShowShareModal(true);
    }
  };

  const handleSharingChanged = () => {
    // Reload dashboard to refresh resume data
    loadDashboard();
  };

  const handleEnhanceResume = (resume: Resume) => {
    if (!resume.generatedResume) {
      toast.error(t('dashboard.actions.resumeNotGenerated'));
      return;
    }

    if (!user?.isPremium) {
      setPremiumFeature('enhance');
      setShowPremiumModal(true);
      return;
    }

    // Navigate to resume view where enhancement options are available
    navigate(`/resume/${resume.id}`);
  };

  const handleTailorForJob = (resume: Resume) => {
    if (!resume.generatedResume) {
      toast.error(t('dashboard.actions.resumeNotGenerated'));
      return;
    }
    navigate(`/job-tailoring/${resume.id}`);
  };

  const handleRescoreResume = async (resume: Resume) => {
    if (!resume.generatedResume) {
      toast.error(t('dashboard.actions.resumeNotGenerated'));
      return;
    }

    if (!user?.isPremium) {
      setPremiumFeature('rescore');
      setShowPremiumModal(true);
      return;
    }

    try {
      setRescoringResumeId(resume.id);
      toast.loading(t('dashboard.actions.rescoring'), { id: 'rescore' });
      
      const score = await resumeScoringService.scoreResume(resume.id);
      
      toast.success(t('dashboard.actions.rescoreSuccess'), { id: 'rescore' });
      
      // Reload dashboard to refresh resume data with new score
      await loadDashboard();
    } catch (error) {
      console.error('Error rescoring resume:', error);
      toast.dismiss('rescore');
      
      // Handle rate limit error - show modal with countdown
      if (error instanceof RateLimitError) {
        setRateLimitResetTime(error.resetTime);
        setRateLimitResumeId(resume.id);
        setShowRateLimitModal(true);
        return;
      }
      
      if (error instanceof Error) {
        if (error.message.includes('Premium') || error.message.includes('premium')) {
          setPremiumFeature('rescore');
          setShowPremiumModal(true);
        } else {
          toast.error(error.message || t('dashboard.actions.rescoreError'), { id: 'rescore' });
        }
      } else {
        toast.error(t('dashboard.actions.rescoreError'), { id: 'rescore' });
      }
    } finally {
      setRescoringResumeId(null);
    }
  };

  // Handle retry from rate limit modal
  const handleRateLimitRetry = async () => {
    if (!rateLimitResumeId) return;
    
    setShowRateLimitModal(false);
    
    // Find the resume and retry rescoring
    const resume = resumes.find(r => r.id === rateLimitResumeId);
    if (resume) {
      await handleRescoreResume(resume);
    }
    
    setRateLimitResumeId(null);
  };

  // Close rate limit modal
  const handleCloseRateLimitModal = () => {
    setShowRateLimitModal(false);
    setRateLimitResumeId(null);
  };

  const handleDeleteResume = async (resume: Resume) => {
    // Check if this is a free user deleting their AI-generated resume
    const isFreeUserDeletingGeneratedResume = 
      !user?.isPremium && 
      user?.freeResumeUsed && 
      (resume.generatedResume || resume.status === 'generated');

    const confirmed = await confirmation.confirm({
      title: isFreeUserDeletingGeneratedResume
        ? t('dashboard.actions.deleteFreeResumeTitle') || 'Delete CV - Important Warning'
        : t('dashboard.actions.deleteResumeTitle') || 'Eliminar CV',
      message: isFreeUserDeletingGeneratedResume
        ? t('dashboard.actions.deleteFreeResumeWarning') || 'This is your only free AI-generated CV. If you delete it, you will NOT be able to create another free CV. Your free CV quota has already been used and will not be restored. Are you sure you want to continue?'
        : t('dashboard.actions.deleteResume'),
      confirmText: t('dashboard.actions.delete') || 'Eliminar',
      cancelText: t('common.cancel') || 'Cancelar',
      variant: isFreeUserDeletingGeneratedResume ? 'warning' : 'danger',
    });

    if (confirmed) {
      try {
        await deleteResume(resume.id);
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };


  if (!isAuthenticated || !user) {
    return null;
  }

  // Empty state para usuarios sin CVs
  if (resumes.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {t('dashboard.welcome', { name: formatName(user.firstName || user.fullName?.split(' ')[0] || '') })}
                </h1>
                <p className="text-gray-600 mt-1">
                  {t('dashboard.emptyState.subtitle')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-8">
              <FileText className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('dashboard.emptyState.title')}
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('dashboard.emptyState.description')}
            </p>

            <div className="space-y-4">
              <button
                onClick={handleCreateResumeFromEmptyState}
                className={`inline-flex items-center gap-3 px-8 py-4 text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  canCreateResume 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700'
                }`}
              >
                <Plus className="w-6 h-6" />
                {canCreateResume 
                  ? t('dashboard.emptyState.createButton') 
                  : t('dashboard.premiumAction.createResume.cta') || 'Upgrade to Create More'}
              </button>
              
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{t('dashboard.emptyState.features.free')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{t('dashboard.emptyState.features.aiOptimized')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{t('dashboard.emptyState.features.fast')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dashboard.emptyState.features.templates')}</h3>
              <p className="text-gray-600">{t('dashboard.emptyState.features.templatesDesc')}</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dashboard.emptyState.features.aiOptimization')}</h3>
              <p className="text-gray-600">{t('dashboard.emptyState.features.aiOptimizationDesc')}</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dashboard.emptyState.features.easyToUse')}</h3>
              <p className="text-gray-600">{t('dashboard.emptyState.features.easyToUseDesc')}</p>
            </div>
          </div>
        </div>

        {/* Premium Modal for free users who have used their quota */}
        <PremiumActionModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          feature="createResume"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('dashboard.welcomeNoExclamation', { name: formatName(user.firstName || user.fullName?.split(' ')[0] || '') })}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('dashboard.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {!user?.isPremium && (
                <button
                  onClick={() => navigate('/premium')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Sections */}
        <div className="space-y-12">
          {/* Resumes Section */}
          <ResumeList
            resumes={resumes}
            isLoading={isLoading}
            onView={handleViewResume}
            onEdit={handleEditResume}
            onDownload={handleDownloadResume}
            onTranslate={handleTranslateResume}
            onShare={handleShareResume}
            onEnhance={handleEnhanceResume}
            onRescore={handleRescoreResume}
            onTailorForJob={handleTailorForJob}
            onDelete={handleDeleteResume}
            rescoringResumeId={rescoringResumeId || undefined}
          />

          {/* Cover Letters Section */}
          <CoverLetterList />

          {/* Job Applications Section */}
          <JobApplicationsList />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmation.isOpen}
        title={confirmation.title || 'Confirmar acción'}
        message={confirmation.message}
        confirmText={confirmation.confirmText}
        cancelText={confirmation.cancelText}
        variant={confirmation.variant}
        onConfirm={confirmation.onConfirm}
        onCancel={confirmation.onCancel}
      />
      {selectedResumeForSharing && selectedResumeForSharing.generatedResume && (
        <ShareResumeModal
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false);
            setSelectedResumeForSharing(null);
          }}
          resumeId={selectedResumeForSharing.id}
          shareToken={selectedResumeForSharing.shareToken}
          isPubliclyShared={selectedResumeForSharing.isPubliclyShared}
          onSharingChanged={handleSharingChanged}
        />
      )}
      {selectedResumeForTranslation && selectedResumeForTranslation.generatedResume && (
        <ResumeTranslationModal
          isOpen={showTranslationModal}
          onClose={() => {
            setShowTranslationModal(false);
            setSelectedResumeForTranslation(null);
          }}
          resumeId={selectedResumeForTranslation.id}
          currentLanguage={selectedResumeForTranslation.resumeData.language || 'es'}
          resumeTitle={selectedResumeForTranslation.title}
        />
      )}
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature={premiumFeature}
      />

      {/* Rate Limit Modal for Rescore */}
      {showRateLimitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('wizard.rateLimit.rescoreTitle', 'Scoring Limit Reached')}
              </h3>
              <button
                onClick={handleCloseRateLimitModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <RateLimitWarning
                onRetry={handleRateLimitRetry}
                onClose={handleCloseRateLimitModal}
                showRetry={true}
                countdownSeconds={Math.max(1, Math.ceil((rateLimitResetTime - Date.now()) / 1000))}
                isPremium={user?.isPremium}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
