'use client';

import { useTranslations } from 'next-intl';
import { Send, MessageCircle, Instagram, Mail, Phone } from 'lucide-react';
import { navSections, site } from '@/lib/site';
import { Container } from '@/components/ui/container';
import { Logo } from './logo';

const socials = [
  { href: site.telegram, label: 'Telegram', icon: Send },
  { href: site.whatsapp, label: 'WhatsApp', icon: MessageCircle },
  { href: site.instagram, label: 'Instagram', icon: Instagram },
];

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--border))] surface">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-16 lg:py-20">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted text-pretty">
              {t('tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[rgb(var(--border))] surface-elevated text-[rgb(var(--fg-muted))] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label={t('nav')}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              {t('nav')}
            </h3>
            <ul className="mt-4 space-y-3">
              {navSections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-muted transition-colors hover:text-[rgb(var(--accent))]"
                  >
                    {nav(s.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">
              {t('contactTitle')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-[rgb(var(--accent))]"
                >
                  <Phone size={15} className="text-[rgb(var(--accent))]" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-[rgb(var(--accent))]"
                >
                  <Mail size={15} className="text-[rgb(var(--accent))]" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[rgb(var(--border))] py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-subtle">
            © {year} {site.name}. {t('rights')}
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-subtle text-pretty">
            {t('disclaimer')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
