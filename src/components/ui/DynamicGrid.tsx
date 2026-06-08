'use client';

import React from 'react';
import { GridConfig } from '@/types/schema';
import { DynamicRenderer } from '@/components/renderer/DynamicRenderer';
import { cn } from '@/lib/utils';

// Flexible Tailwind Grid column mapping from 1 to 12.
const gridColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  7: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7',
  8: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8',
  9: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9',
  10: 'grid-cols-2 sm:grid-cols-5 lg:grid-cols-10',
  11: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 lg:grid-cols-11',
  12: 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
};

export function DynamicGrid({ columns = 2, gap, children, className }: GridConfig) {
  const colClass = gridColsMap[columns] || gridColsMap[2];
  const items = children ?? [];

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 text-center text-xs text-white/20">
        Empty Grid Container
      </div>
    );
  }

  return (
    <div
      className={cn('grid w-full', colClass, className)}
      style={{
        gap: gap || '1rem',
      }}
    >
      {items.map((child, index) => (
        <div key={child.id || index} className="min-w-0">
          <DynamicRenderer components={[child]} />
        </div>
      ))}
    </div>
  );
}
