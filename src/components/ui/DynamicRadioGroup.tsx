'use client';

import { RadioGroupConfig } from '@/types/schema';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

export function DynamicRadioGroup({ label, name, options, defaultValue, className }: RadioGroupConfig) {
  const setFormField = useAppStore((s) => s.setFormField);
  const formData = useAppStore((s) => s.formData);
  const fieldName = name || label || 'radio';
  const selected = (formData[fieldName] as string) ?? defaultValue ?? '';

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-white/70">{label}</label>
      )}
      <div className="space-y-2">
        {(options ?? []).map((opt, i) => (
          <label
            key={i}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setFormField(fieldName, opt.value)}
          >
            <div className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
              selected === opt.value
                ? 'border-indigo-500'
                : 'border-white/20 group-hover:border-white/40'
            )}>
              {selected === opt.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              )}
            </div>
            <span className="text-sm text-white/70 select-none">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
