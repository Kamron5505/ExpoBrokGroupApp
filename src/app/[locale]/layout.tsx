import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/lib/site';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t('title'),
      template: `%s · ${site.name}`,
    },
    description: t('description'),
    keywords: t('keywords'),
    applicationName: site.name,
    alternates: {
      canonical: `/${locale === routing.defaultLocale ? '' : locale}`,
      languages: {
        ru: '/',
        uz: '/uz',
        en: '/en',
        'x-default': '/',
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: t('title'),
      description: t('description'),
      url: site.url,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <head>
        <JsonLd locale={locale} description={t('description')} />
      </head>
      <body className="min-h-screen surface antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
