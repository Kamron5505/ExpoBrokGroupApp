import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-display', className)}>
      <span className="relative grid h-8 w-8 place-items-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <defs>
            <linearGradient id="ebg-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#EF5A4E" />
              <stop offset="1" stopColor="#DA291C" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#ebg-mark)" />
          <path
            d="M11 10.5c-2.3 0-3.9 2.3-3.9 5.5s1.6 5.5 3.9 5.5c1.4 0 2.5-.7 3.1-1.9"
            fill="none"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M18.6 21.5c2.3 0 3.9-2.3 3.9-5.5s-1.6-5.5-3.9-5.5c-1.5 0-2.6.8-3.2 2"
            fill="none"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-[1.05rem] font-semibold leading-none tracking-tight">
        Expo<span className="text-[rgb(var(--accent))]">Brok</span>Group
      </span>
    </span>
  );
}
