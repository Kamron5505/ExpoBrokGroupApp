import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            'text-display font-semibold text-balance max-w-3xl',
            align === 'center' && 'mx-auto',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'text-muted text-lg leading-relaxed text-pretty max-w-2xl',
              align === 'center' && 'mx-auto',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
