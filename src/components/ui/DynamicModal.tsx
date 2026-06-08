'use client';

import { useState } from 'react';
import { ModalConfig } from '@/types/schema';
import { DynamicRenderer } from '@/components/renderer/DynamicRenderer';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const sizeMap: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function DynamicModal({ title, triggerLabel, size = 'md', children, className }: ModalConfig) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
      >
        {triggerLabel || 'Open Modal'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Modal */}
          <div className={cn(
            'relative w-full rounded-xl border border-white/10 bg-zinc-900 shadow-2xl',
            sizeMap[size || 'md'],
            className
          )}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white/90">{title || 'Modal'}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            {/* Body */}
            <div className="p-6">
              <DynamicRenderer components={children ?? []} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
