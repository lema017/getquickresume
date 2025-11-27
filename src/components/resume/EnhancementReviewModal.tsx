import { useState } from 'react';
import { X, CheckCircle, XCircle, Edit2, RotateCcw } from 'lucide-react';

interface EnhancementReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  enhancedText: string;
  sectionType: string;
  onApprove: (enhancedText: string) => void;
  onReject: () => void;
}

export function EnhancementReviewModal({
  isOpen,
  onClose,
  originalText,
  enhancedText,
  sectionType,
  onApprove,
  onReject,
}: EnhancementReviewModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(enhancedText);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'enhanced'>('enhanced');

  if (!isOpen) return null;

  const handleApprove = () => {
    onApprove(isEditing ? editedText : enhancedText);
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(enhancedText);
  };

  const handleReset = () => {
    setIsEditing(false);
    setEditedText(enhancedText);
  };

  const getSectionLabel = (type: string): string => {
    const labels: Record<string, string> = {
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      certification: 'Certifications',
      project: 'Projects',
      achievement: 'Achievements',
      language: 'Languages',
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Review Enhanced {getSectionLabel(sectionType)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review the enhanced text and approve or make changes
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="px-6 pt-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('enhanced')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'enhanced'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Enhanced Only
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'side-by-side'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Side by Side
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'side-by-side' ? (
            <div className="grid grid-cols-2 gap-4">
              {/* Original */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-gray-400" />
                  <h3 className="text-sm font-semibold text-gray-700">Original</h3>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                  <p className="text-sm whitespace-pre-wrap text-gray-800">{originalText}</p>
                </div>
              </div>

              {/* Enhanced */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Enhanced</h3>
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full p-4 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={12}
                    />
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset to AI version
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 max-h-96 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap text-gray-800">{enhancedText}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Edit Enhanced Text
                    </label>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={15}
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="text-sm font-semibold text-gray-700">Enhanced Text</h3>
                    </div>
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 max-h-96 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap text-gray-800">{enhancedText}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleReject}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4" />
            Approve & Apply
          </button>
        </div>
      </div>
    </div>
  );
}

