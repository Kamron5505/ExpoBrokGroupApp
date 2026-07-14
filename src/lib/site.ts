import type { StaticImageData } from 'next/image';
import colaImage from '@/images/cola.png';
import colaZeroImage from '@/images/cola-zero.png';
import fantaImage from '@/images/fanta.png';
import spriteImage from '@/images/sprite.png';
import flavisImage from '@/images/flavis.png';
import bfreshImage from '@/images/bfresh.png';

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
  | 'flavis'
  | 'bfresh';

export interface Product {
  key: ProductKey;
  /** Brand tint used for the card's backdrop glow. */
  tint: string;
  packaging: string;
  /** Pack shot; cards without one fall back to the abstract bottle visual. */
  image?: StaticImageData;
}

export const products: Product[] = [
  { key: 'coca-cola', tint: '#DA291C', packaging: '0.33 · 0.5 · 1 · 1.5 · 2 L', image: colaImage },
  { key: 'coca-cola-zero', tint: '#1A1A1A', packaging: '0.33 · 0.5 · 1.5 L', image: colaZeroImage },
  { key: 'fanta', tint: '#F2691B', packaging: '0.5 · 1 · 1.5 L', image: fantaImage },
  { key: 'sprite', tint: '#0E8A3E', packaging: '0.5 · 1 · 1.5 L', image: spriteImage },
  { key: 'flavis', tint: '#E5197B', packaging: '0.5 · 1 · 1.5 L', image: flavisImage },
  { key: 'bfresh', tint: '#0F5D63', packaging: '0.45 L can', image: bfreshImage },
];

export const geoCountries = [
  { key: 'kz', x: 62, y: 30 },
  { key: 'ru', x: 48, y: 14 },
  { key: 'by', x: 20, y: 22 },
  { key: 'kg', x: 74, y: 46 },
  { key: 'tj', x: 66, y: 58 },
  { key: 'az', x: 26, y: 52 },
] as const;
