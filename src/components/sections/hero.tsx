'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/ui/counter';
import heroImage from '@/images/hero.png';

const stats = [
  { value: 6, suffix: '+', key: 'countries' },
  { value: 10, suffix: '+', key: 'years' },
  { value: 12000, suffix: '+', key: 'volume' },
  { value: 120, suffix: '+', key: 'partners' },
] as const;

export function Hero() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44">
      {/* Ambient aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="aurora-blob animate-drift left-1/2 top-[-9rem] h-[38rem] w-[38rem] -translate-x-1/2 opacity-[0.16]"
          style={{ background: '#DA291C' }}
        />
        <div
          className="aurora-blob animate-drift-rev right-[-7rem] top-24 h-80 w-80 opacity-[0.14]"
          style={{ background: '#F2691B' }}
        />
        <div
          className="aurora-blob animate-drift left-[-5rem] top-64 h-72 w-72 opacity-[0.10]"
          style={{ background: '#1E88C7' }}
        />
        <div
          className="aurora-blob animate-drift-rev bottom-[-6rem] left-1/3 h-72 w-72 opacity-[0.10]"
          style={{ background: '#0E8A3E' }}
        />
        <div className="absolute inset-0 grain opacity-[0.35]" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] surface-elevated px-3.5 py-1.5 text-[0.8rem] font-medium text-muted"
            >
              <ShieldCheck size={15} className="text-[rgb(var(--accent))]" />
              {t('badge')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-hero font-semibold text-balance"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild size="lg">
                <a href="#contact">
                  {t('ctaPrimary')}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#products">{t('ctaSecondary')}</a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.key}>
                  <dt className="sr-only">{t(`stats.${s.key}`)}</dt>
                  <dd className="text-gradient text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <p className="mt-1 text-[0.8rem] leading-tight text-subtle">{t(`stats.${s.key}`)}</p>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-[rgb(var(--border))] surface-subtle shadow-lift"
              >
                <Image
                  src={heroImage}
                  alt={t('imageAlt')}
                  fill
                  priority
                  placeholder="blur"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent"
                />
              </motion.div>

              {/* floating trust card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -left-3 top-10 rounded-2xl border border-[rgb(var(--border))] glass px-4 py-3 shadow-lift sm:-left-6"
              >
                <p className="text-[0.7rem] uppercase tracking-wide text-subtle">On-time</p>
                <p className="text-lg font-semibold">
                  <Counter value={99} suffix="%" />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="absolute -right-2 bottom-16 flex items-center gap-2 rounded-2xl border border-[rgb(var(--border))] glass px-4 py-3 shadow-lift sm:-right-5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[rgb(var(--accent))] text-white">
                  <ShieldCheck size={16} />
                </span>
                <div>
                  <p className="text-[0.7rem] text-subtle">CIS export</p>
                  <p className="text-sm font-semibold">Certified</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
