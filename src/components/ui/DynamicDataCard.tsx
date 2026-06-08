'use client';

import { DataCardConfig } from '@/types/schema';
import { cn } from '@/lib/utils';

export function DynamicDataCard({ title, fields, className }: DataCardConfig) {
  const fieldList = fields ?? [];

  return (
    <div className={cn('rounded-xl border border-white/10 bg-white/[0.02] p-6', className)}>
      {title && (
        <h3 className="text-sm font-semibold text-white/80 mb-4">{title}</h3>
      )}
      {fieldList.length === 0 ? (
        <p className="text-sm text-white/30">No data fields provided</p>
      ) : (
        <div className="space-y-3">
          {fieldList.map((field, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-white/50">{field.label}</span>
              <span className="text-sm font-medium text-white/80">{field.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
