'use client';

import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  title = 'No data to display',
  description = 'Add components to your JSON configuration to see them rendered here.',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-6 text-center',
      className
    )}>
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <Inbox size={28} className="text-white/30" />
      </div>
      <h3 className="text-lg font-semibold text-white/60 mb-1">{title}</h3>
      <p className="text-sm text-white/40 max-w-sm">{description}</p>
    </div>
  );
}
