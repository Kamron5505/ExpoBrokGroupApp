'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Warehouse, Factory, Ship, Boxes, Truck, ClipboardCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { cn } from '@/lib/utils';

const tiles: { id: string; icon: LucideIcon; label: string; span: string }[] = [
  { id: 'g1', icon: Factory, label: 'Production line', span: 'sm:col-span-2 sm:row-span-2' },
  { id: 'g2', icon: Warehouse, label: 'Warehouse', span: '' },
  { id: 'g3', icon: Boxes, label: 'Palletising', span: '' },
  { id: 'g4', icon: Ship, label: 'Container loading', span: 'sm:col-span-2' },
  { id: 'g5', icon: Truck, label: 'Fleet dispatch', span: '' },
  { id: 'g6', icon: ClipboardCheck, label: 'Quality control', span: '' },
];

function Tile({ icon: Icon, label, dim }: { icon: LucideIcon; label: string; dim?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--bg-subtle))] to-[rgb(var(--bg-elevated))]" />
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[rgb(var(--accent))] opacity-[0.10] blur-2xl"
      />
      <div aria-hidden className="absolute inset-0 grain opacity-30" />
      <div className={cn('absolute inset-0 flex flex-col justify-between p-5', dim && 'p-8')}>
        <Icon className={cn('text-[rgb(var(--accent))]', dim ? 'h-10 w-10' : 'h-7 w-7')} />
        <span className={cn('font-medium', dim ? 'text-xl' : 'text-sm')}>{label}</span>
      </div>
    </div>
  );
}

export function Gallery() {
  const t = useTranslations('gallery');
  const [active, setActive] = useState<(typeof tiles)[number] | null>(null);

  return (
    <section id="gallery" className="section">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[170px] lg:mt-16">
          {tiles.map((tile, i) => (
            <motion.button
              key={tile.id}
              type="button"
              onClick={() => setActive(tile)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] text-left transition-all duration-500 hover:shadow-lift',
                tile.span,
              )}
            >
              <div className="h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                <Tile icon={tile.icon} label={tile.label} dim={tile.span.includes('row-span-2')} />
              </div>
            </motion.button>
          ))}
        </div>
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
              className="relative aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10"
            >
              <Tile icon={active.icon} label={active.label} dim />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
