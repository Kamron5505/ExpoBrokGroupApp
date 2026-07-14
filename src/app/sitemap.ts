import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';

/** `localePrefix: 'as-needed'` means the default locale is served from the root. */
const pathFor = (locale: string) => (locale === routing.defaultLocale ? '' : `/${locale}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries([
    ...routing.locales.map((locale) => [locale, `${site.url}${pathFor(locale)}`]),
    ['x-default', site.url],
  ]);

  return routing.locales.map((locale) => ({
    url: `${site.url}${pathFor(locale)}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
