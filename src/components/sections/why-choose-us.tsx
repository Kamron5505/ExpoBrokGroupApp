'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Truck, FileCheck2, Zap, Globe2, Headset } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Stagger, StaggerItem } from '@/components/ui/reveal';

const items: { key: string; icon: LucideIcon; n: string }[] = [
  { key: 'quality', icon: ShieldCheck, n: '01' },
  { key: 'logistics', icon: Truck, n: '02' },
  { key: 'docs', icon: FileCheck2, n: '03' },
  { key: 'speed', icon: Zap, n: '04' },
  { key: 'geography', icon: Globe2, n: '05' },
  { key: 'support', icon: Headset, n: '06' },
];

export function WhyChooseUs() {
  const t = useTranslations('why');

  return (
    <section id="why" className="section surface-subtle">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {items.map(({ key, icon: Icon, n }) => (
            <StaggerItem key={key}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-[rgb(var(--border))] surface-elevated p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-[rgb(var(--accent))]/30 hover:shadow-lift">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[rgb(var(--accent))] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.12]"
                />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl surface-subtle border border-[rgb(var(--border))] text-[rgb(var(--fg))] transition-all duration-500 group-hover:bg-[rgb(var(--accent))] group-hover:text-white group-hover:border-transparent">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold text-subtle tabular-nums">{n}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 leading-relaxed text-muted text-pretty">{t(`items.${key}.desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
