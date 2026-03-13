import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getTemplateThumbnailUrl } from '@/utils/templateCatalog';

export interface TemplateCarouselItem {
  id: string;
  name: string;
  category: 'free' | 'premium';
}

export interface TemplateCarouselProps {
  templates: TemplateCarouselItem[];
  /** URL to navigate when user clicks "Use this template". */
  getUseTemplateUrl: (template: TemplateCarouselItem) => string;
  /** Button label (e.g. "Use this template"). */
  useTemplateLabel: string;
  /** Optional container class. */
  className?: string;
  /** @deprecated No longer needed — thumbnails are used instead of live rendering. */
  sampleResumeData?: unknown;
}

const PREVIEW_SCALE = 0.75;

export function TemplateCarousel({
  templates,
  getUseTemplateUrl,
  useTemplateLabel,
  className,
}: TemplateCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  if (templates.length === 0) return null;

  const hasMultiple = templates.length > 1;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .template-carousel-swiper {
          overflow: visible;
          height: auto !important;
        }
        .template-carousel-swiper .swiper-wrapper {
          align-items: flex-start;
          height: auto !important;
        }
        .template-carousel-swiper .swiper-slide {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          height: auto;
        }
        .template-carousel-swiper .swiper-button-next,
        .template-carousel-swiper .swiper-button-prev {
          width: 2.5rem;
          height: 2.5rem;
          margin-top: 0;
          top: 50%;
          transform: translateY(-50%);
          background: rgb(243 244 246);
          color: rgb(55 65 81);
          border-radius: 9999px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          transition: background-color 0.2s, box-shadow 0.2s;
        }
        .template-carousel-swiper .swiper-button-next:hover,
        .template-carousel-swiper .swiper-button-prev:hover {
          background: rgb(229 231 235);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        .template-carousel-swiper .swiper-button-next::after,
        .template-carousel-swiper .swiper-button-prev::after {
          font-size: 1rem;
          font-weight: 700;
        }
        .template-carousel-swiper .swiper-pagination {
          position: relative;
          margin-top: 1rem;
        }
        .template-carousel-swiper .swiper-pagination-bullet {
          width: 0.375rem;
          height: 0.375rem;
          background: rgb(209 213 219);
          opacity: 1;
          transition: width 0.2s, height 0.2s, background 0.2s;
        }
        .template-carousel-swiper .swiper-pagination-bullet-active {
          width: 2rem;
          height: 0.375rem;
          border-radius: 9999px;
          background: rgb(55 65 81);
        }
      ` }} />
      <div ref={rootRef} className={className ?? 'w-full'}>
        <div className="relative flex flex-col items-center pt-1 pb-2 sm:pt-2 sm:pb-3">
          <div className="relative w-full overflow-hidden" style={{ minHeight: '320px' }}>
            <Swiper
              className="template-carousel-swiper"
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              loop={hasMultiple}
              navigation={hasMultiple}
              pagination={hasMultiple ? { clickable: true } : false}
              a11y={{
                prevSlideMessage: 'Previous template',
                nextSlideMessage: 'Next template',
                paginationBulletMessage: 'Go to template {{index}}',
              }}
            >
              {templates.map((tpl) => (
                <SwiperSlide key={tpl.id}>
                  <div className="flex flex-col items-center w-full px-4 sm:px-6">
                    <Link
                      to={getUseTemplateUrl(tpl)}
                      className="flex justify-center items-center w-full cursor-pointer group block"
                      style={{
                        width: `calc(210mm * ${PREVIEW_SCALE})`,
                        minWidth: `calc(210mm * ${PREVIEW_SCALE})`,
                      }}
                      aria-label={`Use ${tpl.name} template`}
                    >
                      <div
                        className="rounded-xl overflow-hidden bg-white flex-shrink-0 transition-shadow duration-200 group-hover:shadow-xl"
                        style={{
                          width: `calc(210mm * ${PREVIEW_SCALE})`,
                          minWidth: `calc(210mm * ${PREVIEW_SCALE})`,
                          aspectRatio: '210 / 297',
                          overflow: 'hidden',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        }}
                      >
                        <img
                          src={getTemplateThumbnailUrl(tpl.id)}
                          alt={`${tpl.name} resume template`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </Link>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 w-full max-w-5xl">
                      <Link
                        to={getUseTemplateUrl(tpl)}
                        className="text-lg font-semibold text-gray-900 uppercase tracking-wide text-center hover:text-blue-600 transition-colors"
                      >
                        {tpl.name}
                      </Link>
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
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
