'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, FileSignature, PackageCheck, Ship, MapPinned } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const steps: { key: string; icon: LucideIcon }[] = [
  { key: 'one', icon: MessageSquare },
  { key: 'two', icon: FileSignature },
  { key: 'three', icon: PackageCheck },
  { key: 'four', icon: Ship },
  { key: 'five', icon: MapPinned },
];

export function Process() {
  const t = useTranslations('process');
  const reduce = useReducedMotion();

  return (
    <section id="process" className="section">
      <Container>
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />

        <div className="relative mt-16 lg:mt-24">
          {/* Desktop — horizontal connector through the node centres (top-8 = h-16/2) */}
          <div
            aria-hidden
            className="absolute inset-x-[10%] top-8 hidden h-px bg-[rgb(var(--border))] lg:block"
          />
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-[10%] top-8 hidden h-px origin-left bg-gradient-to-r from-[#DA291C] via-[#F2691B] to-[#F2691B]/0 lg:block"
          />

          {/* Mobile — vertical connector aligned to the node centre */}
          <div
            aria-hidden
            className="absolute left-7 top-4 bottom-4 w-px bg-[rgb(var(--border))] lg:hidden"
          />

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.key}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#EF5A4E] via-[#DA291C] to-[#9E1810] text-white shadow-glow ring-[6px] ring-[rgb(var(--bg))]">
                      <Icon size={24} strokeWidth={1.75} />
                    </span>
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full border border-[rgb(var(--border))] surface-elevated text-[0.7rem] font-bold tabular-nums text-[rgb(var(--accent))] shadow-soft">
                      {i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-1.5 lg:mt-7 lg:max-w-[15rem] lg:px-2">
                    <h3 className="text-base font-semibold tracking-tight">
                      {t(`steps.${s.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                      {t(`steps.${s.key}.desc`)}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
