'use client';

import { FormConfig } from '@/types/schema';
import { DynamicRenderer } from '@/components/renderer/DynamicRenderer';
import { cn } from '@/lib/utils';

export function DynamicForm({ title, submitLabel, children, className }: FormConfig) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-5', className)}
    >
      {title && (
        <h3 className="text-lg font-semibold text-white/90 mb-4">{title}</h3>
      )}
      <DynamicRenderer components={children ?? []} />
      {submitLabel && (
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            {submitLabel}
          </button>
        </div>
      )}
    </form>
  );
}
