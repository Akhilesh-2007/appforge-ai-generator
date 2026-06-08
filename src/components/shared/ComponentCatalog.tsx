'use client';

import React, { useState } from 'react';
import { getAllComponentMetadata } from '@/registry/componentRegistry';
import { BookOpen, Copy, Check, HelpCircle } from 'lucide-react';

export function ComponentCatalog() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const registryItems = getAllComponentMetadata();

  const handleCopy = (jsonState: unknown, key: string) => {
    navigator.clipboard.writeText(JSON.stringify(jsonState, null, 2));
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950 p-5 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-white/5">
        <BookOpen size={16} className="text-indigo-400" />
        <h2 className="text-sm font-bold text-white tracking-tight">Component Registry Schema Directory</h2>
      </div>

      <p className="text-[11px] text-white/45 leading-relaxed">
        Below is the collection of registered component schemas. View their required properties or click to copy their default mock layouts into your JSON configurations.
      </p>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {registryItems.map((item) => (
          <div
            key={item.type}
            className="rounded-lg border border-white/5 bg-white/[0.01] p-3 hover:border-white/10 transition-colors space-y-2 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-white/90 group-hover:text-indigo-400 transition-colors">
                  {item.name}
                </span>
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-white/40">
                  {item.type}
                </span>
              </div>
              
              <button
                type="button"
                onClick={() => handleCopy(item.defaultState, item.type)}
                className="p-1 rounded bg-white/5 hover:bg-indigo-600 hover:text-white text-white/40 transition-colors cursor-pointer"
                title="Copy schema default state"
              >
                {copiedKey === item.type ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
              </button>
            </div>

            <p className="text-[10px] text-white/40">{item.description}</p>

            {/* Expected props fields */}
            <div className="pt-2 border-t border-white/[0.03] space-y-1">
              <div className="text-[9px] font-bold text-white/30 uppercase tracking-wider flex items-center gap-1">
                <HelpCircle size={9} />
                <span>Attributes schema</span>
              </div>
              <div className="grid grid-cols-1 gap-0.5 font-mono text-[9px]">
                {Object.entries(item.expectedProps).map(([propName, propType]) => (
                  <div key={propName} className="flex justify-between gap-2">
                    <span className="text-white/60 font-semibold">{propName}:</span>
                    <span className="text-indigo-300/80 text-right">{propType}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
