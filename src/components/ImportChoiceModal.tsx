import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FileUp, Linkedin, PenLine, X } from 'lucide-react';

interface ImportChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportChoiceModal({ isOpen, onClose }: ImportChoiceModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const options = [
    {
      icon: FileUp,
      label: t('publicWizard.importChoice.fromFile'),
      description: t('publicWizard.importChoice.fromFileDesc'),
      onClick: () => navigate('/login'),
    },
    {
      icon: Linkedin,
      label: t('publicWizard.importChoice.fromLinkedIn'),
      description: t('publicWizard.importChoice.fromLinkedInDesc'),
      onClick: () => navigate('/login'),
    },
    {
      icon: PenLine,
      label: t('publicWizard.importChoice.fromScratch'),
      description: t('publicWizard.importChoice.fromScratchDesc'),
      onClick: () => {
        onClose();
        navigate('/create/step-1');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
          {t('publicWizard.importChoice.title')}
        </h3>
        <p className="text-gray-500 text-sm mb-6 text-center">
          {t('publicWizard.importChoice.subtitle')}
        </p>

        <div className="space-y-3">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                onClick={option.onClick}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {option.label}
                  </p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
