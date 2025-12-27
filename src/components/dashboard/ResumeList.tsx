import React, { useState } from 'react';
import { Plus, FileText, AlertCircle } from 'lucide-react';
import { Resume } from '@/types';
import { ResumeCard } from './ResumeCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { PremiumActionModal } from '@/components/PremiumActionModal';

interface ResumeListProps {
  resumes: Resume[];
  isLoading: boolean;
  onView: (resume: Resume) => void;
  onEdit: (resume: Resume) => void;
  onDownload: (resume: Resume) => void;
  onTranslate?: (resume: Resume) => void;
  onShare?: (resume: Resume) => void;
  onEnhance?: (resume: Resume) => void;
  onRescore?: (resume: Resume) => void;
  onDelete: (resume: Resume) => void;
  rescoringResumeId?: string;
}

export function ResumeList({ 
  resumes, 
  isLoading, 
  onView, 
  onEdit, 
  onDownload, 
  onTranslate,
  onShare,
  onEnhance,
  onRescore,
  onDelete,
  rescoringResumeId
}: ResumeListProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Check if user can create new resume (premium OR free user who hasn't used their quota)
  const canCreateNewResume = user?.isPremium || !user?.freeResumeUsed;

  const handleCreateNewResume = () => {
    if (canCreateNewResume) {
      navigate('/wizard');
    } else {
      setShowPremiumModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Mis CVs</h2>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Mis CVs</h2>
            <button
              onClick={handleCreateNewResume}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                canCreateNewResume 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              {canCreateNewResume ? t('dashboard.createNewCV') || 'Crear Nuevo CV' : t('dashboard.premiumAction.createResume.cta') || 'Upgrade to Create'}
            </button>
          </div>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aún no has creado ningún CV
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Crea tu primer CV profesional con nuestra herramienta de IA. 
              Te guiaremos paso a paso para crear un CV que destaque.
            </p>
            <button
              onClick={handleCreateNewResume}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                canCreateNewResume 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
              }`}
            >
              <Plus className="w-5 h-5" />
              {canCreateNewResume ? 'Crear Mi Primer CV' : t('dashboard.premiumAction.createResume.cta') || 'Upgrade to Create'}
            </button>
          </div>
        </div>
        
        <PremiumActionModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          feature="createResume"
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Mis CVs</h2>
          <button
            onClick={handleCreateNewResume}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              canCreateNewResume 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            {canCreateNewResume ? t('dashboard.createNewCV') || 'Crear Nuevo CV' : t('dashboard.premiumAction.createResume.cta') || 'Upgrade to Create'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onView={onView}
              onEdit={onEdit}
              onDownload={onDownload}
              onTranslate={onTranslate}
              onShare={onShare}
              onEnhance={onEnhance}
              onRescore={onRescore}
              onDelete={onDelete}
              isRescoring={rescoringResumeId === resume.id}
            />
          ))}
        </div>
      </div>
      
      <PremiumActionModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        feature="createResume"
      />
    </>
  );
}
