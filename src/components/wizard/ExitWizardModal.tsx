import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save, AlertTriangle, Home } from 'lucide-react';
import toast from 'react-hot-toast';

interface ExitWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAndExit: () => void;
  onExitWithoutSaving: () => void;
}

export function ExitWizardModal({ 
  isOpen, 
  onClose, 
  onSaveAndExit, 
  onExitWithoutSaving 
}: ExitWizardModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleSaveAndExit = () => {
    toast.success('Progreso guardado correctamente');
    onSaveAndExit();
  };

  const handleExitWithoutSaving = () => {
    toast.error('Progreso no guardado');
    onExitWithoutSaving();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Salir del Wizard
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            ¿Estás seguro de que quieres salir del wizard? Tu progreso actual se perderá si no lo guardas.
          </p>

          <div className="space-y-3">
            {/* Save and Exit */}
            <button
              onClick={handleSaveAndExit}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Guardar y salir</span>
            </button>

            {/* Exit without saving */}
            <button
              onClick={handleExitWithoutSaving}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Salir sin guardar</span>
            </button>

            {/* Cancel */}
            <button
              onClick={onClose}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
