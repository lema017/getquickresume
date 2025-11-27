import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TipsButtonProps {
  onClick: () => void;
  className?: string;
}

export function TipsButton({ onClick, className = '' }: TipsButtonProps) {
  const { t } = useTranslation();
  
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-all duration-200 ${className}`}
    >
      <Lightbulb className="w-4 h-4" />
      {t('common.showTips')}
    </button>
  );
}
