import { useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';

import { ResumeTemplate } from '@/services/templatesService';
import { loadAllLocalTemplates } from '@/utils/templateCatalog';
import { TemplatePreview } from './TemplatePreview';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

export function Step8Templates() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, markStepCompleted, setCurrentStep, selectedTemplateId, setSelectedTemplate } = useResumeStore();
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainTemplateId, setMainTemplateId] = useState<string | undefined>(selectedTemplateId);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await loadAllLocalTemplates() as ResumeTemplate[];
        if (!mounted) return;
        setTemplates(list);
        if (!selectedTemplateId && list.length > 0) {
          setSelectedTemplate(list[0].id, list[0].category);
          setMainTemplateId(list[0].id);
        }
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Error loading templates');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [setSelectedTemplate, selectedTemplateId]);

  const mainTemplate = useMemo(() => templates.find(t => t.id === (mainTemplateId || selectedTemplateId)), [templates, mainTemplateId, selectedTemplateId]);

  const handleSelect = (tpl: ResumeTemplate) => {
    setSelectedTemplate(tpl.id, tpl.category);
    setMainTemplateId(tpl.id);
  };

  const handleBack = () => navigateToStep(7);

  const handleNext = () => {
    markStepCompleted(8);
    setCurrentStep(9);
    navigateToStep(9);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('Selecciona un diseño')}</h2>
        <p className="text-gray-600">Previsualiza en vivo tus datos en cada template</p>
      </div>

      {loading && (
        <div className="py-16 text-center text-gray-600">Cargando templates…</div>
      )}
      {error && (
        <div className="py-6 text-center">
          <div className="inline-block bg-red-50 text-red-700 border border-red-200 rounded px-4 py-2">{error}</div>
          <div className="mt-3">
            <button className="btn-primary" onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              {mainTemplate ? (
                <TemplatePreview code={mainTemplate.jsCode} resumeData={resumeData} height={720} />
              ) : (
                <div className="h-[720px] flex items-center justify-center text-gray-500">Selecciona un template</div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              <Gallery templates={templates} selectedId={mainTemplate?.id} onSelect={handleSelect} resumeData={resumeData} />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={handleBack} className="btn-outline flex items-center"><ArrowLeft className="w-4 h-4 mr-2" />{t('common.back')}</button>
        <button onClick={handleNext} className="btn-primary flex items-center">{t('common.next')}<ArrowRight className="w-4 h-4 ml-2" /></button>
      </div>

    </div>
  );
}

function Gallery({ templates, selectedId, onSelect, resumeData }: { templates: ResumeTemplate[]; selectedId?: string; onSelect: (t: ResumeTemplate) => void; resumeData: any; }) {
  const Row = ({ index, style }: ListChildComponentProps) => {
    const tpl = templates[index];
    const isSelected = tpl.id === selectedId;
    return (
      <div style={style} className="px-0.5">
        <div className={`border rounded-md p-2 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : 'hover:border-gray-300'}`} onClick={() => onSelect(tpl)} aria-pressed={isSelected} role="button" tabIndex={0}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-800 truncate mr-2">{tpl.name || 'Template'}</div>
          </div>
          <TemplatePreview code={tpl.jsCode} resumeData={resumeData} />
        </div>
      </div>
    );
  };

  return (
    <List height={720} width={'100%'} itemCount={templates.length} itemSize={320} className="pr-2">
      {Row}
    </List>
  );
}


