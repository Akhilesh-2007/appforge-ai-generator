'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { LivePreview } from '@/components/preview/LivePreview';
import { useAppStore } from '@/store/useAppStore';
import { sampleConfigs } from '@/data/sampleConfigs';
import {
  FileCode2, Copy, RefreshCw,
  Eye, Check
} from 'lucide-react';
import Link from 'next/link';

import { BookOpen } from 'lucide-react';
import { ComponentCatalog } from '@/components/shared/ComponentCatalog';

export default function BuilderPage() {
  const jsonString = useAppStore((s) => s.jsonString);
  const setJsonString = useAppStore((s) => s.setJsonString);
  const activeSample = useAppStore((s) => s.activeSample);
  const setActiveSample = useAppStore((s) => s.setActiveSample);
  const [copied, setCopied] = React.useState(false);
  const [showCatalog, setShowCatalog] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    const sample = sampleConfigs[key];
    if (sample) {
      setJsonString(JSON.stringify(sample.config, null, 2));
      setActiveSample(key);
    }
  };

  const handleReset = () => {
    const sample = sampleConfigs[activeSample];
    if (sample) {
      setJsonString(JSON.stringify(sample.config, null, 2));
    }
  };

  return (
    <AppShell>
      <div className="h-[calc(100vh-64px)] flex flex-col relative">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-3 border-b border-white/10 bg-zinc-950 z-25">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <FileCode2 size={18} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">Interactive Workspace</h1>
              <p className="text-[10px] text-white/40">Real-time design panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Catalog Toggle */}
            <button
              onClick={() => setShowCatalog(!showCatalog)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-semibold ${
                showCatalog
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              }`}
              title="Toggle component schema catalog directory"
            >
              <BookOpen size={12} />
              <span>Catalog Reference</span>
            </button>

            {/* Template Selector */}
            <select
              value={activeSample}
              onChange={handleSampleChange}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer w-full sm:w-auto"
            >
              {Object.entries(sampleConfigs).map(([key, sample]) => (
                <option key={key} value={key} className="bg-zinc-900">
                  {sample.label}
                </option>
              ))}
            </select>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors border border-white/10 bg-white/5"
              title="Reset config to default"
            >
              <RefreshCw size={14} />
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10 text-xs font-semibold"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* View Full-screen Button */}
            <Link
              href="/preview"
              target="_blank"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors text-xs font-semibold shadow-lg shadow-indigo-600/10"
            >
              <Eye size={12} />
              <span>Full-screen</span>
            </Link>
          </div>
        </div>

        {/* Work Area Split Screen */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden min-h-0 relative">
          {/* Main workspace panels */}
          <div className="lg:col-span-6 h-full overflow-hidden flex flex-col">
            <JsonEditor className="flex-1" />
          </div>
          <div className="lg:col-span-6 h-full overflow-hidden flex flex-col">
            <LivePreview />
          </div>

          {/* Collapsible Slide-over Drawer for Component Catalog */}
          {showCatalog && (
            <div className="absolute inset-y-4 right-4 z-30 w-80 max-w-full shadow-2xl flex flex-col animate-slide-in">
              <div className="relative flex-1 flex flex-col h-full bg-zinc-950 border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowCatalog(false)}
                  className="absolute top-4 right-4 p-1 rounded-md text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors cursor-pointer text-xs"
                >
                  ✕ Close
                </button>
                <div className="flex-1 overflow-y-auto p-4">
                  <ComponentCatalog />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
