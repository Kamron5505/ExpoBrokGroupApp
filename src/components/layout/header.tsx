'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navSections } from '@/lib/site';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/utils';

// Curated subset for the top bar so everything stays inside the pill at every
// desktop width; the footer still lists all sections.
const desktopNav = navSections.filter((s) =>
  ['about', 'products', 'geography', 'certificates', 'contact'].includes(s.id),
);

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-all duration-500 ease-out-expo',
          scrolled ? 'py-2.5' : 'py-4',
        )}
      >
        <Container>
          <div
            className={cn(
              'flex items-center justify-between rounded-full px-3 pl-5 transition-all duration-500 ease-out-expo',
              scrolled
                ? 'h-14 glass border border-[rgb(var(--border))] shadow-soft'
                : 'h-[3.75rem] border border-transparent',
            )}
          >
            <Link href="/" aria-label="ExpoBrokGroup" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 xl:flex">
              {desktopNav.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--bg-subtle))]"
                >
                  {t(s.key)}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <ThemeToggle />
              <div className="hidden xl:block">
                <Button asChild size="md">
                  <a href="#contact">{t('cta')}</a>
                </Button>
              </div>
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[rgb(var(--border))] surface-elevated xl:hidden"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 xl:hidden"
          >
            <div className="absolute inset-0 surface" />
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
              className="relative flex h-full flex-col px-6 pt-28 pb-10"
            >
              <div className="flex flex-col gap-1">
                {navSections.map((s, i) => (
                  <motion.a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className="border-b border-[rgb(var(--border))] py-4 text-2xl font-medium tracking-tight"
                  >
                    {t(s.key)}
                  </motion.a>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3">
                <LanguageSwitcher />
              </div>
              <div className="mt-auto">
                <Button asChild size="lg" className="w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    {t('cta')}
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
