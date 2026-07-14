import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #08080a 0%, #1a0e0e 55%, #3a0f0c 100%)',
          padding: 80,
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: '#DA291C' }} />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>{site.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.15, maxWidth: 900 }}>
            {t('title')}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: '#c9c6c6', maxWidth: 880 }}>
            {t('description')}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: '#8f8b8b' }}>
          <div style={{ width: 56, height: 4, background: '#DA291C' }} />
          <div>{site.domain}</div>
        </div>
      </div>
    ),
    size,
  );
}
