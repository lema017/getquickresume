import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Resume, JobInterest } from '@/types';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ResumeList } from '@/components/dashboard/ResumeList';
import { JobInterestsList } from '@/components/dashboard/JobInterestsList';
import { OptimizeResumeModal } from '@/components/dashboard/OptimizeResumeModal';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import { useConfirmation } from '@/hooks/useConfirmation';
import { 
  FileText, 
  Briefcase, 
  Mail, 
  Search, 
  Plus,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    resumes,
    jobInterests,
    stats,
    isLoading,
    loadDashboard,
    deleteResume,
    deleteJobInterest,
    optimizeResumeForJob,
    refreshStats
  } = useDashboardStore();

  const [selectedJobForOptimization, setSelectedJobForOptimization] = useState<JobInterest | null>(null);
  const [isOptimizeModalOpen, setIsOptimizeModalOpen] = useState(false);
  const confirmation = useConfirmation();

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
    try {
      // TODO: Implement download functionality
      console.log('Download resume:', resume);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const handleDeleteResume = async (resume: Resume) => {
    const confirmed = await confirmation.confirm({
      title: t('dashboard.actions.deleteResumeTitle') || 'Eliminar CV',
      message: t('dashboard.actions.deleteResume'),
      confirmText: t('dashboard.actions.delete') || 'Eliminar',
      cancelText: t('common.cancel') || 'Cancelar',
      variant: 'danger',
    });

    if (confirmed) {
      try {
        await deleteResume(resume.id);
      } catch (error) {
        console.error('Error deleting resume:', error);
      }
    }
  };

  const handleViewJobInterest = (jobInterest: JobInterest) => {
    // Open job details modal or navigate to details page
    console.log('View job interest:', jobInterest);
    // TODO: Implement job details view
  };

  const handleOptimizeResume = (jobInterest: JobInterest) => {
    setSelectedJobForOptimization(jobInterest);
    setIsOptimizeModalOpen(true);
  };

  const handleDeleteJobInterest = async (jobInterest: JobInterest) => {
    const confirmed = await confirmation.confirm({
      title: t('dashboard.actions.deleteJobInterestTitle') || 'Eliminar interés laboral',
      message: t('dashboard.actions.deleteJobInterest'),
      confirmText: t('dashboard.actions.delete') || 'Eliminar',
      cancelText: t('common.cancel') || 'Cancelar',
      variant: 'danger',
    });

    if (confirmed) {
      try {
        await deleteJobInterest(jobInterest.id);
      } catch (error) {
        console.error('Error deleting job interest:', error);
      }
    }
  };

  const handleOptimizeConfirm = async (jobId: string, resumeId: string) => {
    try {
      await optimizeResumeForJob(jobId, resumeId);
      await refreshStats(); // Refresh token count
    } catch (error) {
      console.error('Error optimizing resume:', error);
      throw error;
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
                  {t('dashboard.welcome', { name: user.firstName })}
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
                {t('dashboard.welcomeNoExclamation', { name: user.firstName })}
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon="star"
            value={user?.isPremium ? 'Premium' : 'Free'}
            label={user?.isPremium ? 'Premium Plan' : 'Free Plan'}
            description={user?.isPremium ? '40 resumes per month' : '1 resume lifetime'}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200"
          />
          <StatsCard
            icon="file-text"
            value={stats.totalResumes}
            label={t('dashboard.stats.resumesCreated')}
            description={t('dashboard.stats.resumesDescription')}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
          />
          <StatsCard
            icon="briefcase"
            value={stats.totalJobInterests}
            label={t('dashboard.stats.jobsSaved')}
            description={t('dashboard.stats.jobsDescription')}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
          />
        </div>

        {/* Main Sections */}
        <div className="space-y-12">
          {/* Resumes Section */}
          <ResumeList
            resumes={resumes}
            isLoading={isLoading}
            onView={handleViewResume}
            onEdit={handleEditResume}
            onDownload={handleDownloadResume}
            onDelete={handleDeleteResume}
          />

          {/* Job Interests Section */}
          <JobInterestsList
            jobInterests={jobInterests}
            isLoading={isLoading}
            onView={handleViewJobInterest}
            onOptimize={handleOptimizeResume}
            onDelete={handleDeleteJobInterest}
            onCreate={async (jobData) => {
              // This will be handled by the JobInterestsList component
              console.log('Create job interest:', jobData);
            }}
          />

          {/* Coming Soon Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cover Letters */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t('dashboard.comingSoon.coverLetters')}</h3>
                  <p className="text-gray-600">{t('dashboard.comingSoon.coverLettersDesc')}</p>
                </div>
              </div>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-gray-400" />
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

      {/* Optimize Resume Modal */}
      <OptimizeResumeModal
        isOpen={isOptimizeModalOpen}
        onClose={() => {
          setIsOptimizeModalOpen(false);
          setSelectedJobForOptimization(null);
        }}
        jobInterest={selectedJobForOptimization}
        onOptimize={handleOptimizeConfirm}
      />

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
    </div>
  );
}
