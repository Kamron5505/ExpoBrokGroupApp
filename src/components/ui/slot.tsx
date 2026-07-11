import { cloneElement, isValidElement, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Minimal Slot: merges its own props/className onto a single child element.
 * Lets <Button asChild><Link/></Button> render an anchor with button styles.
 */
export function Slot({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  if (!isValidElement(children)) return null;
  const child = children as React.ReactElement<Record<string, unknown>>;
  return cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(className, child.props.className as string | undefined),
  });
}
