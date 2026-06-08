'use client';

import { CheckboxConfig } from '@/types/schema';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { Check } from 'lucide-react';

export function DynamicCheckbox({ label, name, checked, className }: CheckboxConfig) {
  const setFormField = useAppStore((s) => s.setFormField);
  const formData = useAppStore((s) => s.formData);
  const fieldName = name || label || 'checkbox';
  const isChecked = (formData[fieldName] as boolean) ?? checked ?? false;

  return (
    <label className={cn('flex items-center gap-3 cursor-pointer group', className)}>
      <div
        onClick={() => setFormField(fieldName, !isChecked)}
        className={cn(
          'w-5 h-5 rounded-md border flex items-center justify-center transition-all',
          isChecked
            ? 'bg-indigo-600 border-indigo-500'
            : 'bg-white/5 border-white/20 group-hover:border-white/40'
        )}
      >
        {isChecked && <Check size={14} className="text-white" />}
      </div>
      <span
        onClick={() => setFormField(fieldName, !isChecked)}
        className="text-sm text-white/70 select-none"
      >
        {label || 'Checkbox'}
      </span>
    </label>
  );
}
