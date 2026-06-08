'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { EmptyState } from '@/components/shared/EmptyState';
import { Play, Eye } from 'lucide-react';
import Link from 'next/link';

import { LayoutEngine } from '@/components/renderer/LayoutEngine';

export function LivePreview() {
  const parsedConfig = useAppStore((s) => s.parsedConfig);
  const jsonError = useAppStore((s) => s.jsonError);

  if (jsonError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-zinc-950 border border-white/10 rounded-xl">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <span className="text-xl text-red-400 font-bold">!</span>
        </div>
        <h3 className="text-base font-semibold text-white/80 mb-1">Renderer Suspended</h3>
        <p className="text-xs text-white/40 max-w-xs">
          Fix the JSON validation errors in the editor to resume live rendering.
        </p>
      </div>
    );
  }

  if (!parsedConfig || !parsedConfig.components || parsedConfig.components.length === 0) {
    return <EmptyState className="h-full border border-white/10 rounded-xl bg-zinc-950" />;
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Play size={14} className="text-indigo-400 fill-indigo-400/20" />
          <span className="text-xs font-semibold text-white/80">Interactive Preview</span>
        </div>
        <Link
          href="/preview"
          target="_blank"
          className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <Eye size={12} />
          <span>Full-screen Preview</span>
        </Link>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-2 bg-zinc-900/20">
        <LayoutEngine config={parsedConfig} />
      </div>
    </div>
  );
}
