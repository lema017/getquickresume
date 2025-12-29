import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { useCoverLetterStore } from '@/stores/coverLetterStore';
import { CoverLetterTemplate } from '@/types/coverLetter';

interface TemplateOption {
  id: CoverLetterTemplate;
  name: string;
  description: string;
  preview: React.ReactNode;
}

export function TemplateSelector() {
  const { t } = useTranslation();
  const { selectedTemplate, setTemplate } = useCoverLetterStore();

  const templates: TemplateOption[] = [
    {
      id: 'classic',
      name: t('coverLetter.templates.classic.name'),
      description: t('coverLetter.templates.classic.description'),
      preview: (
        <div className="w-full h-full bg-white p-2.5 flex flex-col font-serif">
          {/* Classic: Navy blue letterhead with underline */}
          <div className="text-center border-b-2 border-[#1e3a5f] pb-1.5 mb-2">
            <div className="h-2.5 w-16 bg-[#1e3a5f] rounded-sm mx-auto" />
            <div className="flex justify-center gap-1 mt-1">
              <div className="h-0.5 w-6 bg-gray-400 rounded-sm" />
              <div className="h-0.5 w-1 bg-gray-300 rounded-full" />
              <div className="h-0.5 w-5 bg-gray-400 rounded-sm" />
            </div>
          </div>
          {/* Date right-aligned */}
          <div className="flex justify-end mb-2">
            <div className="h-1 w-12 bg-gray-400 rounded-sm" />
          </div>
          {/* Greeting */}
          <div className="h-1.5 w-14 bg-gray-700 rounded-sm mb-2" />
          {/* Body - indented paragraphs */}
          <div className="space-y-1 mb-2">
            <div className="h-1 w-full bg-gray-300 rounded-sm ml-2" />
            <div className="h-1 w-full bg-gray-300 rounded-sm" />
            <div className="h-1 w-11/12 bg-gray-300 rounded-sm" />
            <div className="h-1 w-4/5 bg-gray-300 rounded-sm" />
          </div>
          <div className="space-y-1 mb-2">
            <div className="h-1 w-full bg-gray-300 rounded-sm ml-2" />
            <div className="h-1 w-full bg-gray-300 rounded-sm" />
            <div className="h-1 w-3/4 bg-gray-300 rounded-sm" />
          </div>
          {/* Signature block */}
          <div className="mt-auto pt-2">
            <div className="h-1 w-10 bg-gray-500 rounded-sm mb-1" />
            <div className="h-1.5 w-14 bg-[#1e3a5f] rounded-sm" />
          </div>
        </div>
      ),
    },
    {
      id: 'modern',
      name: t('coverLetter.templates.modern.name'),
      description: t('coverLetter.templates.modern.description'),
      preview: (
        <div className="w-full h-full bg-white p-2.5 flex flex-col">
          {/* Modern: Left accent bar with icons */}
          <div className="flex gap-1.5 mb-3">
            <div className="w-1 bg-[#6366f1] rounded-full self-stretch" />
            <div className="flex-1">
              <div className="h-2.5 w-12 bg-gray-900 rounded-sm" />
              <div className="flex gap-1.5 mt-1.5">
                <div className="w-2 h-2 bg-[#6366f1]/30 rounded-full" />
                <div className="h-1 w-10 bg-gray-400 rounded-sm self-center" />
              </div>
              <div className="flex gap-1.5 mt-1">
                <div className="w-2 h-2 bg-[#6366f1]/30 rounded-full" />
                <div className="h-1 w-8 bg-gray-400 rounded-sm self-center" />
              </div>
            </div>
          </div>
          {/* Company badge */}
          <div className="mb-2">
            <div className="h-1 w-12 bg-gray-600 rounded-sm mb-0.5" />
            <div className="h-1 w-10 bg-[#6366f1]/60 rounded-sm" />
          </div>
          {/* Body */}
          <div className="space-y-1.5 mb-2 flex-1">
            <div className="h-1 w-full bg-gray-200 rounded-sm" />
            <div className="h-1 w-full bg-gray-200 rounded-sm" />
            <div className="h-1 w-5/6 bg-gray-200 rounded-sm" />
            <div className="h-1 w-full bg-gray-200 rounded-sm" />
            <div className="h-1 w-2/3 bg-gray-200 rounded-sm" />
          </div>
          {/* Modern signature with border */}
          <div className="mt-auto pt-1.5 border-t border-gray-100">
            <div className="h-1.5 w-12 bg-gray-800 rounded-sm" />
          </div>
        </div>
      ),
    },
    {
      id: 'minimal',
      name: t('coverLetter.templates.minimal.name'),
      description: t('coverLetter.templates.minimal.description'),
      preview: (
        <div className="w-full h-full bg-[#fafafa] p-3 flex flex-col">
          {/* Minimal: Large name with accent line */}
          <div className="mb-5">
            <div className="h-2.5 w-12 bg-gray-900 rounded-sm" />
            <div className="w-6 h-0.5 bg-gray-300 mt-1.5" />
          </div>
          {/* Very sparse body - maximum breathing room */}
          <div className="space-y-4 flex-1">
            <div className="h-1 w-3/4 bg-gray-300/70 rounded-sm" />
            <div className="h-1 w-1/2 bg-gray-300/70 rounded-sm" />
          </div>
          <div className="space-y-4 flex-1">
            <div className="h-1 w-2/3 bg-gray-300/70 rounded-sm" />
            <div className="h-1 w-2/5 bg-gray-300/70 rounded-sm" />
          </div>
          {/* Minimal signature */}
          <div className="mt-auto">
            <div className="h-1.5 w-10 bg-gray-800 rounded-sm" />
          </div>
          {/* Footer contact */}
          <div className="mt-3 pt-2 border-t border-gray-200">
            <div className="h-0.5 w-16 bg-gray-300 rounded-sm" />
          </div>
        </div>
      ),
    },
    {
      id: 'creative',
      name: t('coverLetter.templates.creative.name'),
      description: t('coverLetter.templates.creative.description'),
      preview: (
        <div className="w-full h-full bg-white p-2 flex flex-col relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-indigo-50 to-transparent rounded-tr-full" />
          
          {/* Gradient header banner */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-2 mb-2 relative z-10">
            <div className="h-2 w-12 bg-white rounded-sm" />
            <div className="h-1 w-8 bg-white/60 rounded-sm mt-1" />
            <div className="flex gap-1 mt-1.5">
              <div className="h-1.5 w-6 bg-white/20 rounded-full" />
              <div className="h-1.5 w-5 bg-white/20 rounded-full" />
            </div>
          </div>
          {/* Company badge */}
          <div className="inline-flex items-center gap-1 bg-purple-50 rounded-full px-1.5 py-0.5 mb-2 self-start">
            <div className="w-1 h-1 bg-purple-400 rounded-full" />
            <div className="h-1 w-8 bg-purple-300 rounded-sm" />
          </div>
          {/* Body with accent */}
          <div className="pl-1.5 border-l-2 border-purple-300 space-y-1 mb-1.5">
            <div className="h-1 w-full bg-gray-300 rounded-sm" />
            <div className="h-1 w-5/6 bg-gray-300 rounded-sm" />
          </div>
          <div className="space-y-1 mb-1.5 flex-1">
            <div className="h-1 w-full bg-gray-300/70 rounded-sm" />
            <div className="h-1 w-11/12 bg-gray-300/70 rounded-sm" />
          </div>
          {/* Avatar signature */}
          <div className="mt-auto flex items-center gap-1.5">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/80 rounded-sm" />
            </div>
            <div className="h-1.5 w-10 bg-gray-700 rounded-sm" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        {t('coverLetter.templates.title')}
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`relative group rounded-xl overflow-hidden border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-purple-500 ring-2 ring-purple-500/20'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            {/* Template Preview */}
            <div className="aspect-[3/4] overflow-hidden">{template.preview}</div>

            {/* Template Name */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <p className="text-xs font-medium text-white truncate">{template.name}</p>
            </div>

            {/* Selected Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}

            {/* Hover Tooltip */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
              <p className="text-xs text-white text-center">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


