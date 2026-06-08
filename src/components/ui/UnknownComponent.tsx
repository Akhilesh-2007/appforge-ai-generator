'use client';

import React from 'react';
import { BaseComponent } from '@/types/schema';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRegisteredTypes } from '@/registry/componentRegistry';

// Simple Levenshtein distance calculation
function getLevenshteinDistance(a: string, b: string): number {
  const tmp = [];
  let i, j;
  for (i = 0; i <= a.length; i++) {
    tmp.push([i]);
  }
  for (j = 1; j <= b.length; j++) {
    tmp[0].push(j);
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

export function UnknownComponent({ type, className }: BaseComponent) {
  const registeredTypes = getRegisteredTypes();
  const targetType = type?.toLowerCase() || '';

  // Get nearest recommendations (Levenshtein distance <= 3)
  const recommendations = registeredTypes
    .map((regType) => ({
      name: regType,
      distance: getLevenshteinDistance(targetType, regType),
    }))
    .filter((item) => item.distance <= 3)
    .sort((a, b) => a.distance - b.distance)
    .map((item) => item.name);

  return (
    <div className={cn(
      'rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-lg shadow-amber-950/10',
      className
    )}>
      <div className="flex items-center gap-2 text-amber-400 mb-2">
        <AlertTriangle size={18} />
        <span className="text-xs font-bold uppercase tracking-wider">Unrecognized Layout Component</span>
      </div>

      <p className="text-xs text-amber-200/80 leading-relaxed font-mono">
        Component type <span className="font-bold underline text-amber-300">&quot;{type || 'undefined'}&quot;</span> is not in our registry.
      </p>

      {recommendations.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] text-amber-400/70 font-semibold uppercase tracking-wider">
            <HelpCircle size={12} />
            <span>Did you mean?</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((rec) => (
              <span
                key={rec}
                className="text-[10px] font-mono font-semibold text-amber-200 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded"
              >
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
