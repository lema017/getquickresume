import React, { useState } from 'react';
import { X, Briefcase, Building2, FileText, Link as LinkIcon } from 'lucide-react';
import { JobInterestData } from '@/types';

interface AddJobInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: JobInterestData) => Promise<void>;
}

export function AddJobInterestModal({ isOpen, onClose, onSubmit }: AddJobInterestModalProps) {
  const [formData, setFormData] = useState<JobInterestData>({
    jobTitle: '',
    company: '',
    jobDescription: '',
    jobUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobTitle || !formData.company || !formData.jobDescription) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData({
        jobTitle: '',
        company: '',
        jobDescription: '',
        jobUrl: '',
      });
    } catch (error) {
      console.error('Error submitting job interest:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof JobInterestData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Agregar Puesto de Interés</h2>
              <p className="text-sm text-gray-600">Guarda un puesto para optimizar tu CV</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Título del Puesto *
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="Ej: Senior Frontend Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Empresa *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Ej: Google, Microsoft, Startup XYZ"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Job URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <LinkIcon className="w-4 h-4 inline mr-2" />
              URL de la Oferta (Opcional)
            </label>
            <input
              type="url"
              value={formData.jobUrl}
              onChange={(e) => handleChange('jobUrl', e.target.value)}
              placeholder="https://linkedin.com/jobs/view/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Descripción del Puesto *
            </label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) => handleChange('jobDescription', e.target.value)}
              placeholder="Pega aquí la descripción completa del puesto de trabajo..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Incluye requisitos, responsabilidades y cualquier información relevante
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">¿Cómo funciona la optimización?</p>
                <p>
                  Una vez guardado, podrás optimizar cualquiera de tus CVs para este puesto específico. 
                  Nuestra IA analizará la descripción y adaptará tu CV para maximizar las coincidencias.
                </p>
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
              type="submit"
              disabled={isSubmitting || !formData.jobTitle || !formData.company || !formData.jobDescription}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Puesto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
