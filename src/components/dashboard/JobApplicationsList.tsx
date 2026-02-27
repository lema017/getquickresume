import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Target,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  Building2,
  Briefcase,
  TrendingUp,
  FileText,
  Sparkles,
  X,
  Globe
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Resume } from '@/types';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import { resumeService } from '@/services/resumeService';
import { jobTailoringService } from '@/services/jobTailoringService';
import { TailoringLimits } from '@/types/jobTailoring';

interface TailoredResumeItem {
  id: string;
  title: string;
  sourceResumeId: string;
  sourceResumeTitle: string;
  companyName: string;
  jobTitle: string;
  matchScore: number;
  createdAt: string;
}

export function JobApplicationsList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { resumes, isLoading } = useDashboardStore();
  const isPremium = user?.isPremium || false;

  // Language toggle
  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language?.startsWith('es') ? 'es' : 'en';
  
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState<TailoredResumeItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [canCreateNew, setCanCreateNew] = useState(true);
  const [limitsLoading, setLimitsLoading] = useState(true);
  const { loadDashboard } = useDashboardStore();

  // Filter tailored resumes from real data
  const tailoredResumes = useMemo(() => {
    return resumes
      .filter(r => r.isTailored && r.tailoringMetadata)
      .map(r => ({
        id: r.id,
        title: r.title,
        sourceResumeId: r.tailoringMetadata!.sourceResumeId,
        sourceResumeTitle: resumes.find(sr => sr.id === r.tailoringMetadata!.sourceResumeId)?.title || 'Original Resume',
        companyName: r.tailoringMetadata!.jobPosting.companyName,
        jobTitle: r.tailoringMetadata!.jobPosting.jobTitle,
        matchScore: r.tailoringMetadata!.matchScore,
        createdAt: typeof r.createdAt === 'string' ? r.createdAt : r.createdAt.toISOString()
      }));
  }, [resumes]);

  // Check limits using real API
  useEffect(() => {
    const checkLimits = async () => {
      setLimitsLoading(true);
      try {
        const limits = await jobTailoringService.getTailoringLimits();
        setCanCreateNew(limits.used < limits.limit);
      } catch (error) {
        console.error('Error checking limits:', error);
        // Default to allowing creation if API fails
        setCanCreateNew(true);
      } finally {
        setLimitsLoading(false);
      }
    };
    checkLimits();
  }, []);

  const handleCreateNew = () => {
    if (!isPremium) {
      setShowPremiumModal(true);
      return;
    }
    if (canCreateNew) {
      navigate('/job-tailoring');
    } else {
      setShowPremiumModal(true);
    }
  };

  const handleView = (item: TailoredResumeItem) => {
    navigate(`/resume/${item.id}`);
  };

  const handleEdit = (item: TailoredResumeItem) => {
    navigate(`/job-tailoring/${item.sourceResumeId}?edit=${item.id}`);
  };

  const handleDelete = (item: TailoredResumeItem) => {
    setResumeToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!resumeToDelete) return;
    
    setIsDeleting(true);
    try {
      await resumeService.deleteResume(resumeToDelete.id);
      // Refresh dashboard to update list
      await loadDashboard();
    } catch (error) {
      console.error('Error deleting tailored resume:', error);
      // Show error message to user (could add toast notification here)
      alert('Failed to delete tailored resume. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setResumeToDelete(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Check if user has any generated resumes to tailor
  const hasGeneratedResumes = resumes.some(r => r.generatedResume);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('jobTailoring.dashboard.title')}</h3>
              <p className="text-gray-600">{t('jobTailoring.dashboard.subtitle')}</p>
            </div>
          </div>
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              currentLanguage === 'es' 
                ? 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100' 
                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
            title={currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {currentLanguage === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state - show create CTA
  if (tailoredResumes.length === 0) {
    return (
      <>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-200 transition-all group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{t('jobTailoring.dashboard.title')}</h3>
                <p className="text-gray-600">{t('jobTailoring.dashboard.subtitle')}</p>
              </div>
            </div>
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentLanguage === 'es' 
                  ? 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
              title={currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentLanguage === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}
              </span>
            </button>
          </div>
          
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            
            {!hasGeneratedResumes ? (
              <>
                <p className="text-gray-600 mb-4">
                  {t('jobTailoring.dashboard.createFirstDesc')}
                </p>
                <button
                  onClick={() => navigate('/wizard')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg transition-all flex items-center gap-2 mx-auto hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="w-5 h-5" />
                  {t('jobTailoring.dashboard.createFirst')}
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-2 font-medium">
                  {t('jobTailoring.dashboard.increaseChances')}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {t('jobTailoring.dashboard.increaseChancesDesc')}
                </p>
                <button
                  onClick={handleCreateNew}
                  className={`px-6 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2 mx-auto ${
                    isPremium && canCreateNew
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-amber-500/25'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  {!isPremium 
                    ? t('jobTailoring.dashboard.upgrade')
                    : canCreateNew 
                      ? t('jobTailoring.dashboard.tailorForJob')
                      : t('jobTailoring.dashboard.upgradeForMore')}
                </button>
              </>
            )}

            {/* Feature highlights */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                {t('jobTailoring.dashboard.features.atsScores')}
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4 text-orange-500" />
                {t('jobTailoring.dashboard.features.keywords')}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4 text-blue-500" />
                {t('jobTailoring.dashboard.features.grammar')}
              </span>
            </div>
          </div>
        </div>

        <PremiumActionModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          feature="tailorForJob"
        />
      </>
    );
  }

  // List view with tailored resumes
  return (
    <>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('jobTailoring.dashboard.title')}</h3>
              <p className="text-gray-600">
                {tailoredResumes.length === 1 
                  ? t('jobTailoring.dashboard.tailoredCount', { count: tailoredResumes.length })
                  : t('jobTailoring.dashboard.tailoredCountPlural', { count: tailoredResumes.length })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentLanguage === 'es' 
                  ? 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
              title={currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentLanguage === 'es' ? '🇪🇸 ES' : '🇺🇸 EN'}
              </span>
            </button>
            <button
              onClick={handleCreateNew}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isPremium && canCreateNew
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              {!isPremium 
                ? t('jobTailoring.dashboard.upgrade') 
                : canCreateNew 
                  ? t('jobTailoring.dashboard.new') 
                  : t('jobTailoring.dashboard.upgrade')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tailoredResumes.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-4 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate group-hover:text-orange-700">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{item.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="truncate">{item.jobTitle}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.matchScore}%
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <FileText className="w-3 h-3" />
                <span>{t('jobTailoring.dashboard.from')} {item.sourceResumeTitle}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(item.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleView(item)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {t('jobTailoring.dashboard.view')}
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  {t('jobTailoring.dashboard.edit')}
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t('jobTailoring.dashboard.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="tailorForJob"
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && resumeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('jobTailoring.dashboard.deleteModal.title')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('jobTailoring.dashboard.deleteModal.description')}
                </p>
                <p className="text-gray-500 text-sm mt-2 font-medium">
                  "{resumeToDelete.title}"
                </p>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('jobTailoring.dashboard.deleteModal.deleting')}
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    {t('jobTailoring.dashboard.delete')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobApplicationsList;

