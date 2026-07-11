'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const labels: Record<string, string> = { ru: 'Русский', uz: "O'zbek", en: 'English' };
const short: Record<string, string> = { ru: 'RU', uz: 'UZ', en: 'EN' };

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function select(next: string) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-full border border-[rgb(var(--border))] surface-elevated px-3 text-sm font-medium transition-colors hover:border-[rgb(var(--fg-subtle))]"
      >
        <Globe size={16} className="text-muted" />
        {short[locale]}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-[rgb(var(--border))] surface-elevated p-1.5 shadow-lift"
          >
            {routing.locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === locale}
                  onClick={() => select(l)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors',
                    l === locale
                      ? 'bg-[rgb(var(--bg-subtle))] font-medium'
                      : 'hover:bg-[rgb(var(--bg-subtle))] text-muted',
                  )}
                >
                  {labels[l]}
                  {l === locale && <Check size={15} className="text-[rgb(var(--accent))]" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
