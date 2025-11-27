import { useState, useEffect } from 'react';
import { useResumeStore } from '@/stores/resumeStore';
import { GeneratedResume } from '@/types';
import { X, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface ResumeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeEditModal({ isOpen, onClose }: ResumeEditModalProps) {
  const { 
    editedResume, 
    updateEditedResume, 
    saveEditedResume, 
    cancelEditingResume 
  } = useResumeStore();
  
  const [localResume, setLocalResume] = useState<GeneratedResume | null>(null);

  useEffect(() => {
    if (editedResume) {
      setLocalResume(JSON.parse(JSON.stringify(editedResume)));
    }
  }, [editedResume]);

  if (!isOpen || !localResume) return null;

  const handleSave = () => {
    if (localResume) {
      updateEditedResume(localResume);
      saveEditedResume();
      onClose();
    }
  };

  const handleCancel = () => {
    cancelEditingResume();
    onClose();
  };

  const handleReset = () => {
    if (editedResume) {
      setLocalResume(JSON.parse(JSON.stringify(editedResume)));
    }
  };

  const updateField = (field: string, value: any) => {
    setLocalResume(prev => {
      if (!prev) return prev;
      const newResume = { ...prev };
      const keys = field.split('.');
      let current: any = newResume;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newResume;
    });
  };

  const addAchievement = (experienceIndex: number) => {
    setLocalResume(prev => {
      if (!prev) return prev;
      const newResume = { ...prev };
      newResume.experience[experienceIndex].achievements.push('');
      return newResume;
    });
  };

  const removeAchievement = (experienceIndex: number, achievementIndex: number) => {
    setLocalResume(prev => {
      if (!prev) return prev;
      const newResume = { ...prev };
      newResume.experience[experienceIndex].achievements.splice(achievementIndex, 1);
      return newResume;
    });
  };

  const addSkill = (category: 'technical' | 'soft' | 'tools') => {
    setLocalResume(prev => {
      if (!prev) return prev;
      const newResume = { ...prev };
      newResume.skills[category].push('');
      return newResume;
    });
  };

  const removeSkill = (category: 'technical' | 'soft' | 'tools', skillIndex: number) => {
    setLocalResume(prev => {
      if (!prev) return prev;
      const newResume = { ...prev };
      newResume.skills[category].splice(skillIndex, 1);
      return newResume;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Editar CV</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={localResume.contactInfo.fullName}
                    onChange={(e) => updateField('contactInfo.fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={localResume.contactInfo.email}
                    onChange={(e) => updateField('contactInfo.email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={localResume.contactInfo.phone}
                    onChange={(e) => updateField('contactInfo.phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={localResume.contactInfo.location}
                    onChange={(e) => updateField('contactInfo.location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn (opcional)
                  </label>
                  <input
                    type="url"
                    value={localResume.contactInfo.linkedin || ''}
                    onChange={(e) => updateField('contactInfo.linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Profesional</h3>
              <textarea
                value={localResume.professionalSummary}
                onChange={(e) => updateField('professionalSummary', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Escribe tu resumen profesional..."
              />
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experiencia Laboral</h3>
              <div className="space-y-6">
                {localResume.experience.map((exp, expIndex) => (
                  <div key={expIndex} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Título del Puesto
                        </label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateField(`experience.${expIndex}.title`, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateField(`experience.${expIndex}.company`, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duración
                        </label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => updateField(`experience.${expIndex}.duration`, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ubicación (opcional)
                        </label>
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => updateField(`experience.${expIndex}.location`, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateField(`experience.${expIndex}.description`, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logros
                      </label>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={achievement}
                              onChange={(e) => updateField(`experience.${expIndex}.achievements.${achIndex}`, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Describe un logro específico..."
                            />
                            <button
                              onClick={() => removeAchievement(expIndex, achIndex)}
                              className="text-red-600 hover:text-red-800 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addAchievement(expIndex)}
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar Logro
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Habilidades</h3>
              <div className="space-y-4">
                {(['technical', 'soft', 'tools'] as const).map((category) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {category === 'technical' ? 'Técnicas' : category === 'soft' ? 'Blandas' : 'Herramientas'}
                      </label>
                      <button
                        onClick={() => addSkill(category)}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Agregar
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {localResume.skills[category].map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateField(`skills.${category}.${skillIndex}`, e.target.value)}
                            className="bg-transparent border-none outline-none text-sm"
                            placeholder="Habilidad..."
                          />
                          <button
                            onClick={() => removeSkill(category, skillIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleReset}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restaurar
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
