'use client';

import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'table' | 'text' | 'chart';
  count?: number;
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-white/5', className)} />
  );
}

export function LoadingSkeleton({ className, variant = 'card', count = 1 }: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
        {items.map((i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
            <SkeletonPulse className="h-4 w-24" />
            <SkeletonPulse className="h-8 w-16" />
            <SkeletonPulse className="h-3 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={cn('rounded-xl border border-white/10 bg-white/5 p-6 space-y-3', className)}>
        <SkeletonPulse className="h-4 w-32 mb-4" />
        {items.map((i) => (
          <div key={i} className="flex gap-4">
            <SkeletonPulse className="h-4 w-1/4" />
            <SkeletonPulse className="h-4 w-1/4" />
            <SkeletonPulse className="h-4 w-1/4" />
            <SkeletonPulse className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={cn('rounded-xl border border-white/10 bg-white/5 p-6', className)}>
        <SkeletonPulse className="h-4 w-32 mb-4" />
        <SkeletonPulse className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((i) => (
        <SkeletonPulse key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}
