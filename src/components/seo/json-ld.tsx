import { geoCountries, site } from '@/lib/site';

const COUNTRY_NAMES: Record<string, string> = {
  kz: 'Kazakhstan',
  ru: 'Russia',
  by: 'Belarus',
  kg: 'Kyrgyzstan',
  tj: 'Tajikistan',
  az: 'Azerbaijan',
};

/**
 * Organization + WebSite structured data. Search engines use this for the
 * knowledge panel and sitelinks; Yandex also reads it for the org card.
 */
export function JsonLd({ locale, description }: { locale: string; description: string }) {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description,
      logo: `${site.url}/icon.svg`,
      email: site.email,
      telephone: site.phoneHref,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'UZ',
      },
      areaServed: geoCountries.map(({ key }) => ({
        '@type': 'Country',
        name: COUNTRY_NAMES[key] ?? key,
      })),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: site.phoneHref,
        availableLanguage: ['ru', 'uz', 'en'],
      },
      sameAs: [site.telegram, site.instagram],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description,
      inLanguage: locale,
      publisher: { '@id': `${site.url}/#organization` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
