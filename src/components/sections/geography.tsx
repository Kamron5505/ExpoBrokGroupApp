'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/reveal';
import { geoCountries } from '@/lib/site';

const HUB = { x: 58, y: 66 };

export function Geography() {
  const t = useTranslations('geography');
  const reduce = useReducedMotion();
  // Render the path-following markers only after mount: framer-motion emits the
  // `offsetDistance` attribute differently on the server, which triggers a
  // hydration mismatch. Client-only rendering avoids it entirely.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="geography" className="section surface-subtle">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:mt-16">
          {/* Map */}
          <Reveal>
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-[rgb(var(--border))] surface-elevated">
              <div aria-hidden className="absolute inset-0 grain opacity-[0.4]" />
              <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {/* connection lines */}
                {geoCountries.map((c, i) => {
                  const d = `M ${HUB.x} ${HUB.y} Q ${(HUB.x + c.x) / 2} ${Math.min(c.y, HUB.y) - 10} ${c.x} ${c.y}`;
                  return (
                    <g key={c.key}>
                      <path d={d} fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.28" strokeWidth="0.4" />
                      {mounted && !reduce && (
                        <circle r="0.8" fill="rgb(var(--accent))">
                          <animateMotion
                            dur="2.4s"
                            begin={`${i * 0.4}s`}
                            repeatCount="indefinite"
                            path={d}
                            calcMode="spline"
                            keyTimes="0;1"
                            keySplines="0.42 0 0.58 1"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* country pins */}
              {geoCountries.map((c, i) => (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x}%`, top: `${(c.y / 70) * 100}%` }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--accent))] opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent))]" />
                  </span>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full surface-elevated border border-[rgb(var(--border))] px-2 py-0.5 text-[0.65rem] font-medium shadow-soft">
                    {t(`countries.${c.key}`)}
                  </span>
                </motion.div>
              ))}

              {/* hub */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${HUB.x}%`, top: `${(HUB.y / 70) * 100}%` }}
              >
                <div className="relative grid place-items-center">
                  <span className="absolute h-9 w-9 rounded-full bg-[rgb(var(--accent))] opacity-20 blur-md" />
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[rgb(var(--accent))] text-white shadow-glow ring-4 ring-[rgb(var(--bg))]">
                    <MapPin size={16} />
                  </span>
                  <span className="mt-1.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-0.5 text-[0.65rem] font-semibold text-white dark:bg-white dark:text-ink">
                    {t('hub')}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Country list */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-subtle">
              {t('countriesLabel')}
            </p>
            <Stagger className="mt-5 grid grid-cols-2 gap-3" stagger={0.06}>
              {geoCountries.map((c) => (
                <StaggerItem key={c.key}>
                  <div className="flex items-center gap-2.5 rounded-2xl border border-[rgb(var(--border))] surface-elevated px-4 py-3 transition-colors hover:border-[rgb(var(--accent))]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
                    <span className="text-sm font-medium">{t(`countries.${c.key}`)}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-4 text-sm text-subtle">{t('more')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
