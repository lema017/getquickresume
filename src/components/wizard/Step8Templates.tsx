import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resumeStore';
import { useWizardNavigation } from '@/hooks/useWizardNavigation';

import { TEMPLATE_CATALOG, loadLocalTemplate, getTemplateThumbnailUrl } from '@/utils/templateCatalog';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { WebComponentRenderer } from './WebComponentRenderer';

export function Step8Templates() {
  const { t } = useTranslation();
  const { navigateToStep } = useWizardNavigation();
  const { resumeData, markStepCompleted, setCurrentStep, selectedTemplateId, setSelectedTemplate } = useResumeStore();
  const [mainTemplateId, setMainTemplateId] = useState<string | undefined>(selectedTemplateId);
  const [mainJsCode, setMainJsCode] = useState<string | null>(null);
  const [loadingMain, setLoadingMain] = useState(false);

  useEffect(() => {
    if (!selectedTemplateId && TEMPLATE_CATALOG.length > 0) {
      setSelectedTemplate(TEMPLATE_CATALOG[0].id, TEMPLATE_CATALOG[0].category);
      setMainTemplateId(TEMPLATE_CATALOG[0].id);
    }
  }, [setSelectedTemplate, selectedTemplateId]);

  useEffect(() => {
    const id = mainTemplateId || selectedTemplateId;
    if (!id) return;
    let mounted = true;
    setLoadingMain(true);
    loadLocalTemplate(id).then((loaded) => {
      if (!mounted) return;
      setMainJsCode(loaded?.jsCode ?? null);
      setLoadingMain(false);
    });
    return () => { mounted = false; };
  }, [mainTemplateId, selectedTemplateId]);

  const mainMeta = useMemo(
    () => TEMPLATE_CATALOG.find((t) => t.id === (mainTemplateId || selectedTemplateId)),
    [mainTemplateId, selectedTemplateId]
  );

  const handleSelect = (id: string) => {
    const meta = TEMPLATE_CATALOG.find((t) => t.id === id);
    if (!meta) return;
    setSelectedTemplate(meta.id, meta.category);
    setMainTemplateId(meta.id);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="border border-gray-200 rounded-lg p-3 bg-white">
            {loadingMain ? (
              <div className="h-[720px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : mainJsCode && mainMeta ? (
              <div style={{ height: 720, overflow: 'auto' }}>
                <WebComponentRenderer
                  tagName={mainMeta.id}
                  jsCode={mainJsCode}
                  data={resumeData}
                  language="en"
                  style={{ width: '100%' }}
                />
              </div>
            ) : (
              <div className="h-[720px] flex items-center justify-center text-gray-500">Selecciona un template</div>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg p-3 bg-white overflow-y-auto" style={{ maxHeight: 720 }}>
            <div className="space-y-3">
              {TEMPLATE_CATALOG.map((tpl) => {
                const isSelected = tpl.id === (mainTemplateId || selectedTemplateId);
                return (
                  <div
                    key={tpl.id}
                    className={`border rounded-md p-2 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : 'hover:border-gray-300'}`}
                    onClick={() => handleSelect(tpl.id)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                  >
                    <div className="text-sm font-medium text-gray-800 truncate mb-2">{tpl.name || 'Template'}</div>
                    <img
                      src={getTemplateThumbnailUrl(tpl.id)}
                      alt={tpl.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded"
                      style={{ aspectRatio: '210/297', objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={handleBack} className="btn-outline flex items-center"><ArrowLeft className="w-4 h-4 mr-2" />{t('common.back')}</button>
        <button onClick={handleNext} className="btn-primary flex items-center">{t('common.next')}<ArrowRight className="w-4 h-4 ml-2" /></button>
      </div>

    </div>
  );
}
