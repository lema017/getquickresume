import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { WebComponentRenderer } from '@/components/wizard/WebComponentRenderer';
import { loadLocalTemplate, getTemplateThumbnailUrl } from '@/utils/templateCatalog';
import type { TemplateMeta } from '@/utils/templateCatalog';
import type { ResumeData } from '@/types';

export interface LiveTemplateCarouselProps {
  templates: TemplateMeta[];
  resumeData: ResumeData;
  getUseTemplateUrl: (template: TemplateMeta) => string;
  useTemplateLabel: string;
  className?: string;
}

const PREVIEW_SCALE = 0.55;

export function LiveTemplateCarousel({
  templates,
  resumeData,
  getUseTemplateUrl,
  useTemplateLabel,
  className,
}: LiveTemplateCarouselProps) {
  const [loadedCodes, setLoadedCodes] = useState<Map<string, string>>(new Map());
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const loadedCodesRef = useRef(loadedCodes);
  loadedCodesRef.current = loadedCodes;

  const loadTemplate = useCallback(async (templateId: string) => {
    if (loadedCodesRef.current.has(templateId)) return;
    setLoadingId(templateId);
    try {
      const result = await loadLocalTemplate(templateId);
      if (result) {
        setLoadedCodes(prev => new Map(prev).set(templateId, result.jsCode));
      }
    } catch {
      // thumbnail fallback will show
    } finally {
      setLoadingId(prev => prev === templateId ? null : prev);
    }
  }, []);

  useEffect(() => {
    if (templates.length > 0) {
      loadTemplate(templates[0].id);
    }
  }, [templates, loadTemplate]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const idx = swiper.realIndex;
    if (idx >= 0 && idx < templates.length) {
      loadTemplate(templates[idx].id);
    }
    const next = (idx + 1) % templates.length;
    if (next !== idx) {
      loadTemplate(templates[next].id);
    }
  }, [templates, loadTemplate]);

  if (templates.length === 0) return null;

  const hasMultiple = templates.length > 1;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .live-carousel-swiper { overflow: visible; height: auto !important; }
        .live-carousel-swiper .swiper-wrapper { align-items: flex-start; height: auto !important; }
        .live-carousel-swiper .swiper-slide { display: flex; flex-direction: column; justify-content: flex-start; align-items: center; height: auto; }
        .live-carousel-swiper .swiper-button-next,
        .live-carousel-swiper .swiper-button-prev {
          width: 2.5rem; height: 2.5rem; margin-top: 0; top: 45%; transform: translateY(-50%);
          background: rgb(243 244 246); color: rgb(55 65 81); border-radius: 9999px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); transition: background-color 0.2s, box-shadow 0.2s;
        }
        .live-carousel-swiper .swiper-button-next:hover,
        .live-carousel-swiper .swiper-button-prev:hover { background: rgb(229 231 235); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
        .live-carousel-swiper .swiper-button-next::after,
        .live-carousel-swiper .swiper-button-prev::after { font-size: 1rem; font-weight: 700; }
        .live-carousel-swiper .swiper-pagination { position: relative; margin-top: 1rem; }
        .live-carousel-swiper .swiper-pagination-bullet { width: 0.375rem; height: 0.375rem; background: rgb(209 213 219); opacity: 1; transition: width 0.2s, background 0.2s; }
        .live-carousel-swiper .swiper-pagination-bullet-active { width: 2rem; height: 0.375rem; border-radius: 9999px; background: rgb(55 65 81); }
        .live-carousel-preview[data-react-unmanaged] { width: 210mm !important; min-width: 210mm; display: block; box-sizing: border-box; text-align: left; }
        .live-carousel-preview[data-react-unmanaged] > * { display: block !important; width: 100% !important; min-width: 210mm; box-sizing: border-box; text-align: left; }
      ` }} />
      <div className={className ?? 'w-full'}>
        <div className="relative flex flex-col items-center pt-1 pb-2 sm:pt-2 sm:pb-3">
          <div className="relative w-full overflow-hidden" style={{ minHeight: '320px' }}>
            <Swiper
              className="live-carousel-swiper"
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              loop={hasMultiple}
              navigation={hasMultiple}
              pagination={hasMultiple ? { clickable: true } : false}
              onSlideChange={handleSlideChange}
              a11y={{
                prevSlideMessage: 'Previous template',
                nextSlideMessage: 'Next template',
                paginationBulletMessage: 'Go to template {{index}}',
              }}
            >
              {templates.map((tpl) => {
                const jsCode = loadedCodes.get(tpl.id);
                const isLoading = loadingId === tpl.id;

                return (
                  <SwiperSlide key={tpl.id}>
                    <div className="flex flex-col items-center w-full px-4 sm:px-6">
                      <div
                        className="rounded-xl overflow-hidden bg-white flex-shrink-0 relative"
                        style={{
                          width: `calc(210mm * ${PREVIEW_SCALE})`,
                          height: `calc(297mm * ${PREVIEW_SCALE})`,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        }}
                      >
                        {jsCode ? (
                          <div
                            style={{
                              width: '210mm',
                              minWidth: '210mm',
                              transform: `scale(${PREVIEW_SCALE})`,
                              transformOrigin: 'top left',
                            }}
                          >
                            <WebComponentRenderer
                              tagName={tpl.id}
                              jsCode={jsCode}
                              data={resumeData}
                              language="en"
                              className="live-carousel-preview"
                              style={{ width: '210mm', minWidth: '210mm', display: 'block', boxSizing: 'border-box' }}
                            />
                          </div>
                        ) : (
                          <>
                            <img
                              src={getTemplateThumbnailUrl(tpl.id)}
                              alt={`${tpl.name} resume template`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover object-top"
                            />
                            {isLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 w-full max-w-5xl">
                        <span className="text-lg font-semibold text-gray-900 uppercase tracking-wide text-center">
                          {tpl.name}
                        </span>
                        <Link
                          to={getUseTemplateUrl(tpl)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
                        >
                          {useTemplateLabel}
                          <ArrowRight className="w-4 h-4" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
