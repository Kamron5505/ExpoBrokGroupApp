'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, X, Award } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Stagger, StaggerItem } from '@/components/ui/reveal';

const certs = [
  { id: 'iso', title: 'ISO 9001:2015', desc: 'Quality management' },
  { id: 'conformity', title: 'Certificate of Conformity', desc: 'CIS customs union' },
  { id: 'origin', title: 'Certificate of Origin', desc: 'Form CT-1' },
  { id: 'phyto', title: 'Phytosanitary', desc: 'Export clearance' },
];

function CertPreview({ title }: { title: string }) {
  return (
    <div className="relative h-full w-full bg-white">
      <div className="absolute inset-0 grain opacity-[0.5]" />
      <div className="absolute inset-x-6 top-6 flex items-center justify-between">
        <Award className="h-8 w-8 text-[#DA291C]" />
        <div className="h-10 w-10 rounded-full border-2 border-[#DA291C]/40" />
      </div>
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 space-y-2">
        <div className="h-2 w-2/3 rounded bg-neutral-300" />
        <div className="h-2 w-full rounded bg-neutral-200" />
        <div className="h-2 w-5/6 rounded bg-neutral-200" />
        <div className="mt-4 h-3 w-1/2 rounded bg-[#DA291C]/70" />
      </div>
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <span className="text-[0.7rem] font-medium text-neutral-500">{title}</span>
        <div className="h-8 w-16 rounded border border-neutral-200" />
      </div>
    </div>
  );
}

export function Certificates() {
  const t = useTranslations('certificates');
  const [active, setActive] = useState<(typeof certs)[number] | null>(null);

  return (
    <section id="certificates" className="section surface-subtle">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16" stagger={0.07}>
          {certs.map((c) => (
            <StaggerItem key={c.id}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[rgb(var(--border))] surface-elevated transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[3/4] overflow-hidden border-b border-[rgb(var(--border))]">
                  <CertPreview title={c.title} />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setActive(c)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-ink transition-transform hover:scale-105"
                    >
                      <Eye size={14} /> {t('view')}
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-[rgb(var(--accent))]" />
                    <h3 className="text-sm font-semibold">{c.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-subtle">{c.desc}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-[rgb(var(--accent))]"
                  >
                    <Download size={13} /> {t('download')}
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
            >
              <CertPreview title={active.title} />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
