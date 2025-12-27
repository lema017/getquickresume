import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check, Loader2, Sparkles } from 'lucide-react';
import { experienceAchievementService } from '@/services/experienceAchievementService';
import { RateLimitWarning } from '@/components/RateLimitWarning';

interface AchievementSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  language?: 'es' | 'en';
  onSelect: (suggestions: string[]) => void;
  resumeId?: string; // Optional resume ID for AI cost tracking
}

export function AchievementSuggestionsModal({
  isOpen,
  onClose,
  jobTitle,
  language = 'es',
  onSelect,
  resumeId
}: AchievementSuggestionsModalProps) {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    if (isOpen && jobTitle) {
      loadSuggestions();
    }
  }, [isOpen, jobTitle]);

  const loadSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setIsRateLimited(false);
    
    try {
      const result = await experienceAchievementService.getAchievementsByJobTitle(jobTitle, language, resumeId);
      setSuggestions(result.suggestions);
      setFromCache(result.fromCache);
    } catch (err: any) {
      // Check if it's a rate limit error
      if (err?.code === 'RATE_LIMIT_EXCEEDED' || err?.status === 429) {
        setIsRateLimited(true);
        setError(err.message);
      } else {
        setError(err instanceof Error ? err.message : 'Error al cargar sugerencias');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionToggle = (index: number) => {
    const newSelected = new Set(selectedSuggestions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedSuggestions(newSelected);
  };

  const handleAddSelected = () => {
    const selectedTexts = Array.from(selectedSuggestions).map(index => suggestions[index]);
    onSelect(selectedTexts);
    onClose();
  };

  const handleClose = () => {
    setSelectedSuggestions(new Set());
    setError(null);
    setIsRateLimited(false);
    onClose();
  };

  const handleRetry = () => {
    setIsRateLimited(false);
    setError(null);
    loadSuggestions();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Sugerencias de Logros con IA
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Job Title Info */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Puesto:</span> {jobTitle}
            </p>
            {fromCache && (
              <p className="text-xs text-blue-600 mt-1">
                Sugerencias obtenidas del cache
              </p>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Generando sugerencias...</span>
            </div>
          )}

          {/* Rate Limit Error State */}
          {isRateLimited && error && (
            <RateLimitWarning 
              message={error} 
              onRetry={handleRetry}
            />
          )}

          {/* Generic Error State */}
          {error && !isRateLimited && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
              <button
                onClick={loadSuggestions}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {/* Suggestions List */}
          {!isLoading && !error && suggestions.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Selecciona los logros que quieres agregar a tu experiencia:
              </p>
              
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedSuggestions.has(index)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSuggestionToggle(index)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      selectedSuggestions.has(index)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedSuggestions.has(index) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <p className="text-sm text-gray-800 flex-1">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && suggestions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron sugerencias para este puesto.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && !error && suggestions.length > 0 && (
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <p className="text-sm text-gray-600">
              {selectedSuggestions.size} de {suggestions.length} seleccionados
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddSelected}
                disabled={selectedSuggestions.size === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Agregar Seleccionados</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
