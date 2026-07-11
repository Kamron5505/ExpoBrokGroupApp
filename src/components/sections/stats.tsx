'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Counter } from '@/components/ui/counter';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';

const items = [
  { key: 'countries', value: 6, suffix: '+' },
  { key: 'volume', value: 12000, suffix: '+' },
  { key: 'partners', value: 120, suffix: '+' },
  { key: 'ontime', value: 99, suffix: '%' },
] as const;

export function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="relative overflow-hidden bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grain opacity-[0.15]" />
        <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white opacity-10 blur-3xl" />
        <div className="absolute -right-16 top-0 h-80 w-80 rounded-full bg-black opacity-10 blur-3xl" />
      </div>
      <Container>
        <div className="section py-16 sm:py-20">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-white/70">
              {t('eyebrow')}
            </span>
            <h2 className="mt-3 max-w-xl text-display font-semibold text-balance">{t('title')}</h2>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {items.map((s) => (
              <StaggerItem key={s.key}>
                <div className="border-l border-white/25 pl-5">
                  <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-white/75 text-pretty">{t(`items.${s.key}`)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
