'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Check, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Bottle } from '@/components/ui/bottle';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { products } from '@/lib/site';

export function Products() {
  const t = useTranslations('products');

  return (
    <section id="products" className="section">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
          <Reveal delay={0.15} className="shrink-0">
            <Button asChild variant="secondary">
              <a href="#contact">{t('cta')}</a>
            </Button>
          </Reveal>
        </div>

        <Stagger
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16"
          stagger={0.06}
        >
          {products.map((p) => (
            <StaggerItem key={p.key}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[rgb(var(--border))] surface-elevated transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift">
                <div
                  className="relative flex h-52 items-end justify-center overflow-hidden"
                  style={{
                    // opaque base: the pack shots use multiply, so nothing dark may show through
                    backgroundColor: '#f7f7f8',
                    backgroundImage: `radial-gradient(62% 55% at 50% 40%, ${p.tint}30, transparent 70%), linear-gradient(180deg, #ffffff 0%, ${p.tint}1c 100%)`,
                  }}
                >
                  {/* soft podium the bottle stands on */}
                  <div
                    aria-hidden
                    className="absolute bottom-5 left-1/2 h-5 w-28 -translate-x-1/2 rounded-[50%] opacity-40 blur-md transition-all duration-500 group-hover:w-32 group-hover:opacity-60"
                    style={{ backgroundColor: p.tint }}
                  />

                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={t(`items.${p.key}.name`)}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-5 mix-blend-multiply transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative h-44 w-24 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-105">
                      <Bottle tint={p.tint} label={p.key} />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col border-t border-[rgb(var(--border))] p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold">{t(`items.${p.key}.name`)}</h3>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--accent))]"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                    {t(`items.${p.key}.desc`)}
                  </p>
                  <div className="mt-5 space-y-2 border-t border-[rgb(var(--border))] pt-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-subtle">{t('packaging')}</span>
                      <span className="font-medium tabular-nums">{p.packaging}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[rgb(var(--accent))]">
                      <Check size={14} strokeWidth={3} />
                      <span className="text-[0.8rem] font-medium">{t('availability')}</span>
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
