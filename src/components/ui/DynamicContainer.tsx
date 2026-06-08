'use client';

import { ContainerConfig } from '@/types/schema';
import { DynamicRenderer } from '@/components/renderer/DynamicRenderer';
import { cn } from '@/lib/utils';

export function DynamicContainer({ children, padding, maxWidth, className }: ContainerConfig) {
  return (
    <div
      className={cn('w-full mx-auto', className)}
      style={{
        padding: padding || undefined,
        maxWidth: maxWidth || undefined,
      }}
    >
      <DynamicRenderer components={children ?? []} />
    </div>
  );
}
