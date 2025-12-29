import React from 'react';
import { Calendar, FileText, Download, Edit, Trash2, Eye, MoreVertical, Globe, Share2, Target, Sparkles, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Resume } from '@/types';
import { IconWrapper } from '../IconWrapper';

// Helper function to get score color based on value
const getScoreColor = (score: number): string => {
  if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
  if (score >= 6) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (score >= 4) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

interface ResumeCardProps {
  resume: Resume;
  onView: (resume: Resume) => void;
  onEdit: (resume: Resume) => void;
  onDownload: (resume: Resume) => void;
  onTranslate?: (resume: Resume) => void;
  onShare?: (resume: Resume) => void;
  onEnhance?: (resume: Resume) => void;
  onRescore?: (resume: Resume) => void;
  onDelete: (resume: Resume) => void;
  isLoading?: boolean;
  isRescoring?: boolean;
}

export function ResumeCard({ 
  resume, 
  onView, 
  onEdit, 
  onDownload, 
  onTranslate,
  onShare,
  onEnhance,
  onRescore,
  onDelete, 
  isLoading = false,
  isRescoring = false
}: ResumeCardProps) {
  const { t } = useTranslation();
  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return t('resumeCard.invalidDate');
      }
      
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return t('resumeCard.invalidDate');
    }
  };

  const getStatusColor = (status: Resume['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'generated':
        return 'bg-green-100 text-green-800';
      case 'optimized':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Resume['status']) => {
    switch (status) {
      case 'draft':
        return t('resumeCard.status.draft');
      case 'generated':
        return t('resumeCard.status.generated');
      case 'optimized':
        return t('resumeCard.status.optimized');
      default:
        return t('resumeCard.status.unknown');
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${
      isLoading ? 'opacity-50 pointer-events-none' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {resume.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(resume.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume.status)}`}>
            {getStatusText(resume.status)}
          </span>
          
          <div className="relative group">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => onView(resume)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {t('resumeCard.actions.view')}
              </button>
              <button
                onClick={() => onEdit(resume)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                {t('resumeCard.actions.edit')}
              </button>
              {resume.generatedResume && (
                <>
                <button
                  onClick={() => onDownload(resume)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t('resumeCard.actions.download')}
                </button>
                  {onTranslate && (
                    <button
                      onClick={() => onTranslate(resume)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      {t('resumeCard.actions.translate')}
                    </button>
                  )}
                  {onShare && (
                    <button
                      onClick={() => onShare(resume)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      {t('resumeCard.actions.share')}
                    </button>
                  )}
                  {onEnhance && (
                    <button
                      onClick={() => onEnhance(resume)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      {t('resumeCard.actions.enhance')}
                    </button>
                  )}
                  {onRescore && (
                    <button
                      onClick={() => onRescore(resume)}
                      disabled={isRescoring}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRescoring ? 'animate-spin' : ''}`} />
                      {t('resumeCard.actions.rescore')}
                    </button>
                  )}
                </>
              )}
              <hr className="my-1" />
              <button
                onClick={() => onDelete(resume)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {t('resumeCard.actions.delete')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Resume Data Preview */}
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4" />
            <span className="font-medium">{t('resumeCard.info.title')}</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>{t('resumeCard.info.name')}</span>
              <span className="font-medium">
                {resume.resumeData.firstName} {resume.resumeData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t('resumeCard.info.profession')}</span>
              <span className="font-medium">{resume.resumeData.profession}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('resumeCard.info.experience')}</span>
              <span className="font-medium">{t(`targetLevel.${resume.resumeData.targetLevel}`)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('resumeCard.info.experiences')}</span>
              <span className="font-medium">{resume.resumeData.experience.length}</span>
            </div>
          </div>
        </div>

        {/* AI Generated Content Indicator */}
        {resume.generatedResume && (
          <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            <IconWrapper name="sparkles" className="w-4 h-4" />
            <span>{t('resumeCard.info.aiOptimized')}</span>
          </div>
        )}

        {/* AI Enhanced Indicator */}
        {resume.status === 'optimized' && (
          <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
            <Sparkles className="w-4 h-4" />
            <span>{t('resumeCard.info.aiEnhanced')}</span>
          </div>
        )}

        {/* Publicly Shared Indicator */}
        {resume.isPubliclyShared && (
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            <Share2 className="w-4 h-4" />
            <span>{t('resumeCard.info.publiclyShared')}</span>
          </div>
        )}

        {/* Resume Score */}
        {resume.score && (
          <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${getScoreColor(resume.score.totalScore)}`}>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="text-xs font-medium">{t('resumeCard.info.score')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">{resume.score.totalScore.toFixed(1)}</span>
              <span className="text-xs opacity-70">/10</span>
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="text-xs text-gray-400">
          {t('resumeCard.info.updated')} {formatDate(resume.updatedAt)}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
        <button
          onClick={() => onView(resume)}
          className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {t('resumeCard.actions.viewResume')}
        </button>
        <button
          onClick={() => onEdit(resume)}
          className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {t('resumeCard.actions.edit')}
        </button>
      </div>
    </div>
  );
}
