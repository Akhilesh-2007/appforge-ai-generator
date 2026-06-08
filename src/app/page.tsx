'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useAppStore } from '@/store/useAppStore';
import { sampleConfigs } from '@/data/sampleConfigs';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Wrench, ArrowRight, Play,
  Zap, Code2, Layers, CheckCircle2, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const setJsonString = useAppStore((s) => s.setJsonString);
  const setActiveSample = useAppStore((s) => s.setActiveSample);

  const loadSample = (key: string) => {
    const sample = sampleConfigs[key];
    if (sample) {
      setJsonString(JSON.stringify(sample.config, null, 2));
      setActiveSample(key);
      router.push('/builder');
    }
  };

  return (
    <AppShell>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-violet-950/20 to-zinc-950 p-6 sm:p-8 md:p-10 shadow-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl rounded-full" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <Sparkles size={12} className="animate-pulse" />
              Dynamic UI Rendering Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Build Dynamic Frontends with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">JSON Schemas</span>
            </h1>
            <p className="text-base text-white/60 leading-relaxed max-w-lg">
              Generate fully responsive, component-driven, production-ready React UIs in real-time. Simply supply a JSON configuration file.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:scale-[1.02]"
              >
                <Wrench size={16} />
                Open App Builder
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => loadSample('employee-dashboard')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all duration-200"
              >
                <Play size={16} className="fill-white/10" />
                Launch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-white/90">Real-time Compilation</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Experience instant live rendering with the integrated Monaco Editor. No refresh required.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Code2 size={20} />
            </div>
            <h3 className="text-base font-bold text-white/90">Type-Safe Schema</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Full TypeScript validation ensures structural integrity of your UI layout config.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 border border-pink-500/20">
              <Layers size={20} />
            </div>
            <h3 className="text-base font-bold text-white/90">Component Registry</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Easily extensible architectural pattern for adding new custom components.
            </p>
          </div>
        </div>

        {/* Quick Starts / Templates */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Select a Starter template</h2>
            <p className="text-xs text-white/40 mt-0.5">Jump-start your application builder workspace.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(sampleConfigs).map(([key, sample]) => (
              <div
                key={key}
                onClick={() => loadSample(key)}
                className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-indigo-500/30 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white/80 group-hover:text-indigo-400 transition-colors">
                    {sample.label}
                  </h4>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">
                    Pre-configured {sample.config.layout} layout containing charts, tables, or fields.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] text-white/30 capitalize bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {sample.config.layout || 'dashboard'}
                  </span>
                  <span className="text-xs text-indigo-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Load <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Robustness Checklist */}
          <div className="rounded-xl border border-white/10 bg-white/[0.01] p-6 space-y-4">
            <h3 className="text-base font-bold text-white/90 flex items-center gap-2">
              <CheckCircle2 className="text-indigo-400" size={18} />
              Zero-Crash Error Resilience
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Designed with strict boundary models preventing application outages during JSON structural alterations.
            </p>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Graceful warning fallbacks for unregistered or unknown component schemas.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Component-level React Error Boundaries prevent cascade failures.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Default state fallbacks handle missing attributes, empty datasets, or null values.</span>
              </li>
            </ul>
          </div>

          {/* Component Registry overview */}
          <div className="rounded-xl border border-white/10 bg-white/[0.01] p-6 space-y-4">
            <h3 className="text-base font-bold text-white/90 flex items-center gap-2">
              <ShieldAlert className="text-indigo-400" size={18} />
              Supported Component Catalog
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              16 core layout wrappers, data displays, dynamic widgets, and input forms supported out-of-the-box.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Form Container', 'Text Inputs', 'Text Area', 'Dropdown Select',
                'Checkbox Toggle', 'Radio Group', 'State Button', 'Data Table',
                'Entity Data Card', 'Dashboard Cards', 'Chart Components',
                'Header Sections', 'Custom Containers', 'Grid Layouts',
                'Tabbed Panes', 'Overlay Modals'
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-white/60 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                  <span className="w-1 h-1 rounded-full bg-indigo-400/80" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
