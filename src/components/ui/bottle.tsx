import { cn } from '@/lib/utils';

/**
 * Abstract stylised bottle silhouette. Self-contained SVG so the site needs
 * no external product photography to look complete; swap for <Image> once real
 * Cloudinary assets exist (see products data / admin — phase 2).
 */
export function Bottle({
  tint,
  label,
  className,
}: {
  tint: string;
  label?: string;
  className?: string;
}) {
  const id = label ? label.replace(/[^a-z0-9]/gi, '') : Math.random().toString(36).slice(2, 8);
  return (
    <svg viewBox="0 0 120 300" className={cn('h-full w-full', className)} aria-hidden="true">
      <defs>
        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={tint} stopOpacity="0.95" />
          <stop offset="0.5" stopColor={tint} />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor={tint} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`cap-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2b2b" />
          <stop offset="1" stopColor="#111" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="46" y="6" width="28" height="20" rx="4" fill={`url(#cap-${id})`} />
      {/* neck */}
      <path d="M48 26 h24 v14 l6 10 v6 h-36 v-6 l6-10 z" fill={tint} opacity="0.9" />
      {/* body */}
      <path
        d="M42 56 q-16 8 -16 34 v150 q0 24 34 24 t34 -24 v-150 q0 -26 -16 -34 z"
        fill={`url(#body-${id})`}
      />
      {/* label band */}
      <rect x="24" y="120" width="72" height="70" rx="6" fill="#fff" opacity="0.92" />
      <rect x="24" y="120" width="72" height="70" rx="6" fill={tint} opacity="0.14" />
      <circle cx="60" cy="150" r="13" fill={tint} opacity="0.9" />
      <rect x="38" y="172" width="44" height="5" rx="2.5" fill={tint} opacity="0.55" />
      {/* shine */}
      <path d="M40 66 q-8 8 -8 26 v140" stroke="#fff" strokeOpacity="0.4" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
