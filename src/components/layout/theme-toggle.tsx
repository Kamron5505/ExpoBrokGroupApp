'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('theme');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={t('toggle')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-[rgb(var(--border))] surface-elevated text-[rgb(var(--fg))] transition-colors hover:border-[rgb(var(--fg-subtle))]"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <Moon size={17} /> : <Sun size={17} />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
