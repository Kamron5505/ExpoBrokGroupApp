'use client';

import { useTranslations } from 'next-intl';
import { Target, Compass, Check } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';

export function About() {
  const t = useTranslations('about');
  const points = ['one', 'two', 'three'] as const;

  return (
    <section id="about" className="section">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">{t('eyebrow')}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display font-semibold text-balance">{t('title')}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">{t('lead')}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-muted text-pretty">{t('body')}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-col gap-3">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="text-[0.975rem] leading-relaxed">{t(`points.${p}`)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <div className="card p-7 sm:p-9">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[rgb(var(--accent))] text-white shadow-glow">
                  <Target size={20} />
                </span>
                <h3 className="mt-5 text-title font-semibold">{t('missionTitle')}</h3>
                <p className="mt-3 leading-relaxed text-muted text-pretty">{t('mission')}</p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="card p-7 sm:p-9">
                <span className="grid h-11 w-11 place-items-center rounded-xl surface-subtle border border-[rgb(var(--border))]">
                  <Compass size={20} />
                </span>
                <h3 className="mt-5 text-title font-semibold">{t('visionTitle')}</h3>
                <p className="mt-3 leading-relaxed text-muted text-pretty">{t('vision')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
