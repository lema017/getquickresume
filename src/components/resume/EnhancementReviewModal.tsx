import { useState, useMemo } from 'react';
import { X, CheckCircle, XCircle, Edit2, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';
import { computeSideBySideDiff, hasChanges, type DiffToken, type PairedDiffEntry } from '@/utils/textDiff';

interface EnhancementReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  enhancedText: string;
  sectionType: string;
  onApprove: (enhancedText: string) => void;
  onReject: () => void;
}

/**
 * Normalize enhanced text by stripping common AI prefixes and cleaning up formatting.
 */
function normalizeEnhancedText(text: string): string {
  let normalized = text;
  
  // Common AI prefixes to strip
  // Only match when these words are clearly labels (followed by colon + space)
  // This prevents matching "Result" in "Results-driven" or "Response" in "Responsible"
  const prefixPatterns = [
    /^(?:Here(?:'s| is) (?:the )?)?(?:improved|enhanced|rewritten|updated|revised) (?:text|version|content)?:?\s*/i,
    /^(?:OUTPUT|RESULT|RESPONSE):\s+/i,  // Only match "RESULT: " (colon followed by space), not "RESULT:" or "RESULT " alone
  ];
  
  for (const pattern of prefixPatterns) {
    normalized = normalized.replace(pattern, '');
  }
  
  // Remove "is rewritten as:" patterns within the text
  normalized = normalized.replace(/,?\s*is rewritten as:?\s*/gi, '\n');
  normalized = normalized.replace(/,?\s*becomes:?\s*/gi, '\n');
  normalized = normalized.replace(/,?\s*→\s*/g, '\n');
  
  // Remove inline labels
  normalized = normalized.replace(/^(?:Original|Enhanced|Improved|Before|After):?\s*/gim, '');
  
  return normalized.trim();
}

/**
 * Render tokens with highlighting for the original side (removed = red).
 */
function OriginalTokens({ tokens }: { tokens: DiffToken[] }) {
  return (
    <>
      {tokens.map((token, idx) => {
        if (token.type === 'removed') {
          return (
            <span 
              key={idx} 
              className="bg-red-200 text-red-900 px-1 py-0.5 rounded font-medium"
            >
              {token.text}
            </span>
          );
        }
        return <span key={idx} className="text-gray-700">{token.text}</span>;
      })}
    </>
  );
}

/**
 * Render tokens with highlighting for the enhanced side (added = green).
 */
function EnhancedTokens({ tokens }: { tokens: DiffToken[] }) {
  return (
    <>
      {tokens.map((token, idx) => {
        if (token.type === 'added') {
          return (
            <span 
              key={idx} 
              className="bg-green-200 text-green-900 px-1 py-0.5 rounded font-medium"
            >
              {token.text}
            </span>
          );
        }
        return <span key={idx} className="text-gray-700">{token.text}</span>;
      })}
    </>
  );
}

/**
 * Render a single entry comparison row.
 */
function EntryComparisonRow({ entry, index }: { entry: PairedDiffEntry; index: number }) {
  const hasModifications = entry.original.some(t => t.type === 'removed') || 
                           entry.enhanced.some(t => t.type === 'added');

  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] gap-2 p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${hasModifications ? 'border-l-4 border-amber-400' : ''}`}>
      {/* Original */}
      <div className="text-sm leading-relaxed pr-2">
        <OriginalTokens tokens={entry.original} />
      </div>
      
      {/* Arrow */}
      <div className="flex items-center justify-center px-2">
        {hasModifications && (
          <ArrowRight className="w-4 h-4 text-amber-500" />
        )}
      </div>
      
      {/* Enhanced */}
      <div className="text-sm leading-relaxed pl-2">
        <EnhancedTokens tokens={entry.enhanced} />
      </div>
    </div>
  );
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
  
  // Normalize enhanced text to strip AI prefixes
  const normalizedEnhanced = useMemo(() => {
    return normalizeEnhancedText(enhancedText);
  }, [enhancedText]);
  
  const [editedText, setEditedText] = useState(normalizedEnhanced);

  // Check if enhanced text is identical to original
  const isUnchanged = useMemo(() => {
    return !hasChanges(originalText, normalizedEnhanced);
  }, [originalText, normalizedEnhanced]);

  // Compute side-by-side diff
  const sideBySideDiff = useMemo(() => {
    return computeSideBySideDiff(originalText, normalizedEnhanced);
  }, [originalText, normalizedEnhanced]);

  if (!isOpen) return null;

  const handleApprove = () => {
    onApprove(isEditing ? editedText : normalizedEnhanced);
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedText(normalizedEnhanced);
  };

  const handleReset = () => {
    setIsEditing(false);
    setEditedText(normalizedEnhanced);
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
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Review Enhanced {getSectionLabel(sectionType)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Compare original and enhanced text side by side
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Legend & Stats */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs">
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-red-200 rounded border border-red-300" />
                <span className="text-gray-600">Original (changed)</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-green-200 rounded border border-green-300" />
                <span className="text-gray-600">Enhanced (new)</span>
              </span>
            </div>
            {sideBySideDiff.stats.wordsChanged > 0 && (
              <span className="text-xs text-gray-500">
                {sideBySideDiff.stats.wordsChanged} word{sideBySideDiff.stats.wordsChanged !== 1 ? 's' : ''} changed
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Warning if texts are identical */}
          {isUnchanged && (
            <div className="m-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">No changes detected</p>
                <p className="text-sm text-amber-700 mt-1">
                  The enhanced text appears identical to the original. This may indicate the AI couldn't find improvements for this specific recommendation, or the text already meets the criteria.
                </p>
              </div>
            </div>
          )}

          {isEditing ? (
            /* Edit Mode */
            <div className="p-6 space-y-2">
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
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                rows={15}
              />
            </div>
          ) : (
            /* Side-by-Side Comparison */
            <div>
              {/* Column Headers */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200 sticky top-0">
                <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-gray-400" />
                  Original
                </div>
                <div className="w-8" />
                <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Enhanced
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="divide-y divide-gray-200">
                {sideBySideDiff.entries.map((entry, idx) => (
                  <EntryComparisonRow key={idx} entry={entry} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Editing...' : 'Edit Enhanced'}
          </button>
          
          <div className="flex items-center gap-3">
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
    </div>
  );
}
