import React, { useState, useEffect } from 'react';
import { Plus, Mail, FileText, Eye, Edit2, Trash2, Calendar, Building2, Briefcase, X, AlertTriangle } from 'lucide-react';
import { CoverLetter } from '@/types/coverLetter';
import { coverLetterService } from '@/services/coverLetterService';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { PremiumActionModal } from '@/components/PremiumActionModal';
import toast from 'react-hot-toast';

interface CoverLetterListProps {
  onDelete?: (coverLetter: CoverLetter) => void;
}

export function CoverLetterList({ onDelete }: CoverLetterListProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coverLetterToDelete, setCoverLetterToDelete] = useState<CoverLetter | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const canCreateNew = !!user?.isPremium;

  useEffect(() => {
    loadCoverLetters();
  }, []);

  const loadCoverLetters = async () => {
    try {
      setIsLoading(true);
      const data = await coverLetterService.listCoverLetters();
      setCoverLetters(data);
    } catch (error) {
      console.error('Error loading cover letters:', error);
      // Don't show error toast for empty list
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    if (canCreateNew) {
      navigate('/cover-letter');
    } else {
      setShowPremiumModal(true);
    }
  };

  const handleView = (coverLetter: CoverLetter) => {
    navigate(`/cover-letter/${coverLetter.id}?mode=view`);
  };

  const handleEdit = (coverLetter: CoverLetter) => {
    navigate(`/cover-letter/${coverLetter.id}`);
  };

  const handleDelete = (coverLetter: CoverLetter) => {
    setCoverLetterToDelete(coverLetter);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!coverLetterToDelete) return;

    setIsDeleting(true);
    try {
      await coverLetterService.deleteCoverLetter(coverLetterToDelete.id);
      setCoverLetters(prev => prev.filter(cl => cl.id !== coverLetterToDelete.id));
      toast.success(t('dashboard.coverLetters.deleteSuccess') || 'Cover letter deleted');
      onDelete?.(coverLetterToDelete);
    } catch (error) {
      console.error('Error deleting cover letter:', error);
      toast.error(t('dashboard.coverLetters.deleteError') || 'Failed to delete cover letter');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setCoverLetterToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCoverLetterToDelete(null);
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('dashboard.coverLetters.title')}</h3>
              <p className="text-gray-600">{t('dashboard.coverLetters.description')}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  if (coverLetters.length === 0) {
    return (
      <>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-200 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('dashboard.coverLetters.title')}</h3>
              <p className="text-gray-600">{t('dashboard.coverLetters.description')}</p>
            </div>
          </div>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-gray-600 mb-4">{t('dashboard.coverLetters.hint')}</p>
            <button
              onClick={handleCreateNew}
              className={`px-6 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2 mx-auto ${
                canCreateNew
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-amber-500/25'
              }`}
            >
              <Plus className="w-5 h-5" />
              {canCreateNew 
                ? t('dashboard.coverLetters.createButton') 
                : t('dashboard.premiumAction.upgradeButton') || 'Upgrade to Create'}
            </button>
          </div>
        </div>
        <PremiumActionModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          feature="coverLetter"
        />
      </>
    );
  }

  // List view with cover letters
  return (
    <>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{t('dashboard.coverLetters.title')}</h3>
              <p className="text-gray-600">
                {coverLetters.length} {coverLetters.length === 1 
                  ? t('dashboard.coverLetters.count.singular') || 'cover letter' 
                  : t('dashboard.coverLetters.count.plural') || 'cover letters'}
              </p>
            </div>
          </div>
          <button
            onClick={handleCreateNew}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              canCreateNew
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            {canCreateNew ? t('dashboard.coverLetters.createNew') || 'New' : t('dashboard.premiumAction.upgradeButton') || 'Upgrade'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coverLetters.map((coverLetter) => (
            <div
              key={coverLetter.id}
              className="bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl p-4 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate group-hover:text-purple-700">
                    {coverLetter.title || `${coverLetter.data.companyName} - ${coverLetter.data.jobTitle}`}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{coverLetter.data.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="truncate">{coverLetter.data.jobTitle}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  coverLetter.status === 'generated' || coverLetter.status === 'saved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {coverLetter.status === 'generated' || coverLetter.status === 'saved'
                    ? t('dashboard.status.generated') || 'Generated'
                    : t('dashboard.status.draft') || 'Draft'}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(coverLetter.updatedAt)}</span>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                {coverLetter.generatedContent && (
                  <button
                    onClick={() => handleView(coverLetter)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t('common.view') || 'View'}
                  </button>
                )}
                <button
                  onClick={() => handleEdit(coverLetter)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  {t('common.edit') || 'Edit'}
                </button>
                <button
                  onClick={() => handleDelete(coverLetter)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t('common.delete') || 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="coverLetter"
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && coverLetterToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('dashboard.coverLetters.deleteModal.title') || 'Delete Cover Letter'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('dashboard.coverLetters.deleteModal.description') || 'Are you sure you want to delete this cover letter? This action cannot be undone.'}
                </p>
                <p className="text-gray-500 text-sm mt-2 font-medium">
                  "{coverLetterToDelete.title || `${coverLetterToDelete.data.companyName} - ${coverLetterToDelete.data.jobTitle}`}"
                </p>
              </div>
              <button
                onClick={handleCancelDelete}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                {t('common.cancel') || 'Cancel'}
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('common.deleting') || 'Deleting...'}
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    {t('common.delete') || 'Delete'}
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

