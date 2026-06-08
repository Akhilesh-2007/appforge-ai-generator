'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { EmptyState } from '@/components/shared/EmptyState';
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import Link from 'next/link';

import { LayoutEngine } from '@/components/renderer/LayoutEngine';

export default function PreviewPage() {
  const parsedConfig = useAppStore((s) => s.parsedConfig);
  const jsonError = useAppStore((s) => s.jsonError);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const viewportClasses = {
    desktop: 'w-full min-h-screen',
    tablet: 'max-w-[768px] min-h-[1024px] border-x border-white/10 my-4 rounded-xl shadow-2xl bg-zinc-950',
    mobile: 'max-w-[375px] min-h-[812px] border-x border-white/10 my-4 rounded-xl shadow-2xl bg-zinc-950',
  };

  if (jsonError) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <span className="text-xl text-red-400 font-bold">!</span>
        </div>
        <h3 className="text-base font-semibold text-white/80 mb-1">Renderer Suspended</h3>
        <p className="text-xs text-white/40 max-w-xs mb-6">
          Fix the JSON validation errors in the builder workspace to view preview.
        </p>
        <Link
          href="/builder"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Builder</span>
        </Link>
      </div>
    );
  }

  if (!parsedConfig || !parsedConfig.components || parsedConfig.components.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <EmptyState title="No App Configured" description="Create a workspace design configuration in the builder first." />
        <Link
          href="/builder"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors mt-6"
        >
          <ArrowLeft size={14} />
          <span>Back to Builder</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Top Banner (Editor link + Viewport control) */}
      <div className="h-14 border-b border-white/10 bg-zinc-900/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/builder"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Builder Workspace</span>
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-xs font-semibold text-white/80">{parsedConfig.title || 'Untitled App'}</span>
        </div>

        {/* Viewport Toggles */}
        <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-md text-xs font-semibold transition-all ${
              viewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white/70'
            }`}
            title="Desktop view"
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-md text-xs font-semibold transition-all ${
              viewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white/70'
            }`}
            title="Tablet view"
          >
            <Tablet size={14} />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-md text-xs font-semibold transition-all ${
              viewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white/70'
            }`}
            title="Mobile view"
          >
            <Smartphone size={14} />
          </button>
        </div>

        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Render Zone */}
      <div className="flex-1 overflow-y-auto bg-zinc-900/20 flex justify-center items-start">
        <div className={`transition-all duration-300 ${viewportClasses[viewport]}`}>
          <LayoutEngine config={parsedConfig} />
        </div>
      </div>
    </div>
  );
}
