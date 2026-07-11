'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { SwiperRef } from 'swiper/react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import 'swiper/css';
import 'swiper/css/pagination';

const items = ['one', 'two', 'three'] as const;
const partners = ['NurMarket', 'VolgaTrade', 'AlaTooDist', 'CaspianFoods', 'MinskRetail', 'PamirImport'];

export function Testimonials() {
  const t = useTranslations('testimonials');
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <section className="section">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="grid h-11 w-11 place-items-center rounded-full border border-[rgb(var(--border))] surface-elevated transition-colors hover:border-[rgb(var(--fg-subtle))]"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="grid h-11 w-11 place-items-center rounded-full border border-[rgb(var(--border))] surface-elevated transition-colors hover:border-[rgb(var(--fg-subtle))]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-12">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 2 } }}
            className="!pb-2"
          >
            {items.map((key) => (
              <SwiperSlide key={key} className="h-auto">
                <figure className="flex h-full flex-col rounded-3xl border border-[rgb(var(--border))] surface-elevated p-8 sm:p-10">
                  <Quote size={32} className="text-[rgb(var(--accent))]" />
                  <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-pretty sm:text-xl">
                    “{t(`items.${key}.quote`)}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[rgb(var(--accent))]/10 font-semibold text-[rgb(var(--accent))]">
                      {t(`items.${key}.author`).charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold">{t(`items.${key}.author`)}</p>
                      <p className="text-sm text-subtle">{t(`items.${key}.role`)}</p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Partner logos marquee */}
        <div className="mask-fade-x mt-14 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...partners, ...partners].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-subtle"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
