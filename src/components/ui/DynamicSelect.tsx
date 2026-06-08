'use client';

import { SelectConfig } from '@/types/schema';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { ChevronDown } from 'lucide-react';

export function DynamicSelect({ label, name, options, placeholder, required, className }: SelectConfig) {
  const setFormField = useAppStore((s) => s.setFormField);
  const formData = useAppStore((s) => s.formData);
  const fieldName = name || label || 'select';
  const value = formData[fieldName] as string ?? '';

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-sm font-medium text-white/70">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => setFormField(fieldName, e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-zinc-900">{placeholder || 'Select...'}</option>
          {(options ?? []).map((opt, i) => (
            <option key={i} value={opt.value} className="bg-zinc-900">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
      </div>
    </div>
  );
}
