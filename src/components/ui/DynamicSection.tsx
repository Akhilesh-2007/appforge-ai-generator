'use client';

import { SectionConfig } from '@/types/schema';
import { DynamicRenderer } from '@/components/renderer/DynamicRenderer';
import { cn } from '@/lib/utils';

export function DynamicSection({ title, description, children, className }: SectionConfig) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h2 className="text-xl font-bold text-white/90">{title}</h2>}
          {description && <p className="text-sm text-white/50">{description}</p>}
        </div>
      )}
      <DynamicRenderer components={children ?? []} />
    </div>
  );
}
