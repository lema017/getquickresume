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
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { useConfirmation } from '@/hooks/useConfirmation';
import { resumeScoringService } from '@/services/resumeScoringService';
import toast from 'react-hot-toast';
import { formatName } from '@/utils/textFormatting';
import { 
  FileText, 
  Mail, 
  Search, 
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
  const [premiumFeature, setPremiumFeature] = useState<'enhance' | 'rescore' | 'edit'>('enhance');
  const [rescoringResumeId, setRescoringResumeId] = useState<string | null>(null);

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
                onClick={() => navigate('/wizard')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-6 h-6" />
                {t('dashboard.emptyState.createButton')}
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
            onDelete={handleDeleteResume}
            rescoringResumeId={rescoringResumeId || undefined}
          />

          {/* Cover Letters Section */}
          <CoverLetterList />

          {/* Coming Soon Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Application Assistant */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Search className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t('dashboard.comingSoon.jobApplications')}</h3>
                  <p className="text-gray-600">{t('dashboard.comingSoon.jobApplicationsDesc')}</p>
                </div>
              </div>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">{t('dashboard.comingSoon.availableSoon')}</p>
                <button
                  disabled
                  className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  {t('dashboard.comingSoon.availableSoon')}
                </button>
              </div>
            </div>
          </div>
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
    </div>
  );
}
