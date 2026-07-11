'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';

const items = ['one', 'two', 'three', 'four', 'five'] as const;

export function Faq() {
  const t = useTranslations('faq');
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>('one');

  return (
    <section id="faq" className="section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <Reveal delay={0.05}>
            <ul className="divide-y divide-[rgb(var(--border))] border-y border-[rgb(var(--border))]">
              {items.map((key) => {
                const isOpen = open === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-base font-semibold text-pretty sm:text-lg">
                        {t(`items.${key}.q`)}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[rgb(var(--border))] text-[rgb(var(--fg-muted))] transition-all duration-300 ease-out-expo group-hover:border-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent))] ${
                          isOpen ? 'rotate-45 bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] group-hover:text-[rgb(var(--accent-fg))]' : ''
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 pr-12 text-sm leading-relaxed text-muted text-pretty">
                            {t(`items.${key}.a`)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
