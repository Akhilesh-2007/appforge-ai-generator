'use client';

import { TextareaConfig } from '@/types/schema';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

export function DynamicTextarea({ label, placeholder, name, rows, required, defaultValue, className }: TextareaConfig) {
  const setFormField = useAppStore((s) => s.setFormField);
  const formData = useAppStore((s) => s.formData);
  const fieldName = name || label || 'textarea';
  const value = formData[fieldName] as string ?? defaultValue ?? '';

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-sm font-medium text-white/70">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder || ''}
        rows={rows || 4}
        value={value}
        onChange={(e) => setFormField(fieldName, e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all resize-none"
      />
    </div>
  );
}
