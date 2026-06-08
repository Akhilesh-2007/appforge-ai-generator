'use client';

import React from 'react';
import { PageConfig } from '@/types/schema';
import { DashboardRenderer } from './DashboardRenderer';
import { FormRenderer } from './FormRenderer';
import { DynamicRenderer } from './DynamicRenderer';
import { Sparkles, Terminal } from 'lucide-react';

interface LayoutEngineProps {
  config: PageConfig;
}

/**
 * Dynamic Layout Engine
 * Processes the top-level PageConfig layout property ('dashboard' | 'form' | 'blank')
 * and wraps content with layout-specific chrome, sidebars, headers, and metadata.
 */
export function LayoutEngine({ config }: LayoutEngineProps) {
  const { title, description, layout = 'dashboard', components = [] } = config;

  switch (layout) {
    case 'form':
      return (
        <div className="max-w-2xl mx-auto py-12 px-6">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{title || 'Application Form'}</h1>
            {description && <p className="text-sm text-white/50 mt-2">{description}</p>}
          </div>
          <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <FormRenderer title={title} components={components} />
          </div>
        </div>
      );

    case 'blank':
      return (
        <div className="w-full min-h-screen p-6">
          <DynamicRenderer components={components} />
        </div>
      );

    case 'dashboard':
    default:
      return (
        <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title || 'Dashboard'}</h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  <Sparkles size={10} />
                  Engine V2
                </span>
              </div>
              {description && <p className="text-xs sm:text-sm text-white/45 mt-1.5">{description}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-white/10 text-white/60">
                <Terminal size={12} />
                config: {layout}
              </span>
            </div>
          </div>

          {/* Dedicated Dashboard Renderer */}
          <DashboardRenderer components={components} />
        </div>
      );
  }
}
