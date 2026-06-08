'use client';

import { ButtonConfig } from '@/types/schema';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const variantStyles: Record<string, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20',
  secondary: 'bg-white/10 hover:bg-white/15 text-white',
  danger: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20',
  ghost: 'bg-transparent hover:bg-white/5 text-white/70',
  outline: 'bg-transparent border-2 border-white/20 hover:border-white/40 text-white/80',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function DynamicButton({ label, variant = 'primary', size = 'md', disabled, loading, className }: ButtonConfig) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        variantStyles[variant || 'primary'],
        sizeStyles[size || 'md'],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {label || 'Button'}
    </button>
  );
}
