import { cn } from '@/lib/utils';
import { Slot } from './slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'btn-vivid shadow-soft hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'surface-elevated border border-[rgb(var(--border-strong))] text-[rgb(var(--fg))] hover:border-[rgb(var(--fg-subtle))] hover:-translate-y-0.5',
  ghost: 'text-[rgb(var(--fg))] hover:bg-[rgb(var(--bg-subtle))]',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-[3.25rem] px-7 text-[0.975rem]',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children: ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Comp>
  );
}
