import React, { useState, useEffect } from 'react';
import { X, Target, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { JobInterest, Resume } from '@/types';
import { useDashboardStore } from '@/stores/dashboardStore';

interface OptimizeResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobInterest: JobInterest | null;
  onOptimize: (jobId: string, resumeId: string) => Promise<void>;
}

export function OptimizeResumeModal({ 
  isOpen, 
  onClose, 
  jobInterest, 
  onOptimize 
}: OptimizeResumeModalProps) {
  const { resumes } = useDashboardStore();
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Filter resumes that can be optimized (have generated content)
  const availableResumes = resumes.filter(resume => resume.generatedResume);

  useEffect(() => {
    if (availableResumes.length > 0 && !selectedResumeId) {
      setSelectedResumeId(availableResumes[0].id);
    }
  }, [availableResumes, selectedResumeId]);

  const handleOptimize = async () => {
    if (!jobInterest || !selectedResumeId) return;

    try {
      setIsOptimizing(true);
      await onOptimize(jobInterest.id, selectedResumeId);
      onClose();
    } catch (error) {
      console.error('Error optimizing resume:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  if (!isOpen || !jobInterest) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Optimizar CV para Puesto</h2>
              <p className="text-sm text-gray-600">Adapta tu CV para este puesto específico</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Job Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Puesto Seleccionado</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Título:</span> {jobInterest.jobTitle}</p>
              <p><span className="font-medium">Empresa:</span> {jobInterest.company}</p>
            </div>
          </div>

          {/* Resume Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <FileText className="w-4 h-4 inline mr-2" />
              Selecciona el CV a optimizar
            </label>
            
            {availableResumes.length === 0 ? (
              <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-800 font-medium">No hay CVs disponibles</p>
                <p className="text-yellow-600 text-sm">Necesitas generar al menos un CV antes de optimizarlo</p>
              </div>
            ) : (
              <div className="space-y-2">
                {availableResumes.map((resume) => (
                  <label
                    key={resume.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedResumeId === resume.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="resume"
                      value={resume.id}
                      checked={selectedResumeId === resume.id}
                      onChange={(e) => setSelectedResumeId(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{resume.title}</p>
                      <p className="text-sm text-gray-600">
                        {resume.resumeData.firstName} {resume.resumeData.lastName} • {resume.resumeData.profession}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        resume.status === 'generated' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {resume.status === 'generated' ? 'Generado' : 'Optimizado'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Cost Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Costo de Optimización</p>
                <p>
                  Esta optimización cuenta como una generación de CV. 
                  La IA analizará la descripción del puesto y adaptará tu CV para maximizar las coincidencias.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">¿Qué incluye la optimización?</p>
                <ul className="space-y-1 text-xs">
                  <li>• Análisis de keywords relevantes del puesto</li>
                  <li>• Adaptación del resumen profesional</li>
                  <li>• Reorganización de experiencias por relevancia</li>
                  <li>• Optimización de habilidades destacadas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleOptimize}
              disabled={isOptimizing || !selectedResumeId || availableResumes.length === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isOptimizing ? 'Optimizando...' : 'Optimizar CV'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
