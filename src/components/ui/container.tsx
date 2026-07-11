import { cn } from '@/lib/utils';
import type { ElementType, ReactNode } from 'react';

export function Container({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  );
}
