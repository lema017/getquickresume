import React from 'react';
import { Calendar, Building2, ExternalLink, Target, MoreVertical, Trash2, Eye } from 'lucide-react';
import { JobInterest } from '@/types';
import { IconWrapper } from '../IconWrapper';

interface JobInterestCardProps {
  jobInterest: JobInterest;
  onView: (jobInterest: JobInterest) => void;
  onOptimize: (jobInterest: JobInterest) => void;
  onDelete: (jobInterest: JobInterest) => void;
  isLoading?: boolean;
}

export function JobInterestCard({ 
  jobInterest, 
  onView, 
  onOptimize, 
  onDelete, 
  isLoading = false 
}: JobInterestCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: JobInterest['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'applied':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: JobInterest['status']) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'applied':
        return 'Aplicado';
      case 'closed':
        return 'Cerrado';
      default:
        return 'Desconocido';
    }
  };

  const formatJobDescription = (description: string, maxLength: number = 120) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${
      isLoading ? 'opacity-50 pointer-events-none' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {jobInterest.jobTitle}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Building2 className="w-4 h-4" />
            <span>{jobInterest.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(jobInterest.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(jobInterest.status)}`}>
            {getStatusText(jobInterest.status)}
          </span>
          
          <div className="relative group">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => onView(jobInterest)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Ver Detalles
              </button>
              {jobInterest.status === 'active' && (
                <button
                  onClick={() => onOptimize(jobInterest)}
                  className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  Optimizar CV
                </button>
              )}
              <hr className="my-1" />
              <button
                onClick={() => onDelete(jobInterest)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Job Description Preview */}
        <div className="text-sm text-gray-600">
          <p className="line-clamp-3">
            {formatJobDescription(jobInterest.jobDescription)}
          </p>
        </div>

        {/* Job URL */}
        {jobInterest.jobUrl && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <ExternalLink className="w-4 h-4" />
            <a
              href={jobInterest.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline truncate"
            >
              Ver oferta original
            </a>
          </div>
        )}

        {/* Optimized Resume Indicator */}
        {jobInterest.optimizedResumeId && (
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            <IconWrapper name="check-circle" className="w-4 h-4" />
            <span>CV optimizado disponible</span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
        <button
          onClick={() => onView(jobInterest)}
          className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Ver Detalles
        </button>
        {jobInterest.status === 'active' && (
          <button
            onClick={() => onOptimize(jobInterest)}
            className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Optimizar CV
          </button>
        )}
      </div>
    </div>
  );
}
