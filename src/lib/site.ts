export const site = {
  name: 'ExpoBrokGroup',
  domain: 'expobrokgroup.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://expobrokgroup.com',
  email: 'info@expobrokgroup.com',
  phone: '+998 90 000 00 00',
  phoneHref: '+998900000000',
  telegram: 'https://t.me/expobrokgroup',
  whatsapp: 'https://wa.me/998900000000',
  instagram: 'https://instagram.com/expobrokgroup',
} as const;

export const navSections = [
  { id: 'about', key: 'about' },
  { id: 'why', key: 'why' },
  { id: 'products', key: 'products' },
  { id: 'geography', key: 'geography' },
  { id: 'process', key: 'process' },
  { id: 'certificates', key: 'certificates' },
  { id: 'contact', key: 'contact' },
] as const;

export type ProductKey =
  | 'coca-cola'
  | 'coca-cola-zero'
  | 'fanta'
  | 'sprite'
  | 'schweppes'
  | 'fuse-tea'
  | 'rich'
  | 'bonaqua'
  | 'pulpy';

export interface Product {
  key: ProductKey;
  /** Brand tint used for the card's abstract product visual. */
  tint: string;
  packaging: string;
}

export const products: Product[] = [
  { key: 'coca-cola', tint: '#DA291C', packaging: '0.33 · 0.5 · 1 · 1.5 L' },
  { key: 'coca-cola-zero', tint: '#1A1A1A', packaging: '0.33 · 0.5 · 1.5 L' },
  { key: 'fanta', tint: '#F2691B', packaging: '0.5 · 1 · 1.5 L' },
  { key: 'sprite', tint: '#0E8A3E', packaging: '0.5 · 1 · 1.5 L' },
  { key: 'schweppes', tint: '#B8912F', packaging: '0.25 · 0.9 L' },
  { key: 'fuse-tea', tint: '#C0392B', packaging: '0.5 · 1 · 1.5 L' },
  { key: 'rich', tint: '#8E1B2E', packaging: '0.25 · 1 L' },
  { key: 'bonaqua', tint: '#1E88C7', packaging: '0.5 · 1 · 1.5 L' },
  { key: 'pulpy', tint: '#E8791C', packaging: '0.45 · 0.9 L' },
];

export const geoCountries = [
  { key: 'kz', x: 62, y: 30 },
  { key: 'ru', x: 48, y: 14 },
  { key: 'by', x: 20, y: 22 },
  { key: 'kg', x: 74, y: 46 },
  { key: 'tj', x: 66, y: 58 },
  { key: 'az', x: 26, y: 52 },
] as const;
