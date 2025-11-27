import React, { useState } from 'react';
import { Plus, Briefcase, AlertCircle } from 'lucide-react';
import { JobInterest } from '@/types';
import { JobInterestCard } from './JobInterestCard';
import { AddJobInterestModal } from './AddJobInterestModal';
import { useTranslation } from 'react-i18next';

interface JobInterestsListProps {
  jobInterests: JobInterest[];
  isLoading: boolean;
  onView: (jobInterest: JobInterest) => void;
  onOptimize: (jobInterest: JobInterest) => void;
  onDelete: (jobInterest: JobInterest) => void;
  onCreate: (jobData: any) => Promise<void>;
}

export function JobInterestsList({ 
  jobInterests, 
  isLoading, 
  onView, 
  onOptimize, 
  onDelete, 
  onCreate 
}: JobInterestsListProps) {
  const { t } = useTranslation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCreate = async (jobData: any) => {
    try {
      await onCreate(jobData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating job interest:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Puestos de Interés</h2>
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

  if (jobInterests.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Puestos de Interés</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Puesto
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No tienes puestos de interés guardados
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Guarda puestos de trabajo que te interesen para optimizar tu CV 
            específicamente para cada uno y aumentar tus posibilidades de éxito.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Agregar Mi Primer Puesto
          </button>
        </div>

        <AddJobInterestModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleCreate}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Puestos de Interés</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Puesto
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobInterests.map((jobInterest) => (
          <JobInterestCard
            key={jobInterest.id}
            jobInterest={jobInterest}
            onView={onView}
            onOptimize={onOptimize}
            onDelete={onDelete}
          />
        ))}
      </div>

      <AddJobInterestModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
