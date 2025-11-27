import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FloatingTipsProps {
  title: string;
  tips: string[];
  className?: string;
  onClose?: () => void;
}

export function FloatingTips({ title, tips, className = '', onClose }: FloatingTipsProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed top-20 right-4 z-40 max-w-sm ${className}`}>
      <div className="bg-white/95 backdrop-blur-sm border border-amber-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-3 text-left hover:bg-amber-50/50 transition-colors duration-200 rounded-lg flex-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-amber-900">
              {title}
            </h3>
          </button>
          
          <div className="flex items-center space-x-2 ml-2">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-amber-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-600" />
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-amber-100 rounded transition-colors duration-200"
                title={t('common.closeTips')}
              >
                <X className="w-4 h-4 text-amber-600" />
              </button>
            )}
          </div>
        </div>
        
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-amber-100">
            <ul className="text-amber-800 text-xs space-y-2 pt-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
