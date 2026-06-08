'use client';

import { useState } from 'react';
import { TabsConfig } from '@/types/schema';
import { DynamicRenderer } from '@/components/renderer/DynamicRenderer';
import { cn } from '@/lib/utils';

export function DynamicTabs({ tabs, className }: TabsConfig) {
  const [activeTab, setActiveTab] = useState(0);
  const tabList = tabs ?? [];

  if (tabList.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-white/30 text-sm text-center">
        No tabs configured
      </div>
    );
  }

  return (
    <div className={cn('rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden', className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabList.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={cn(
              'px-5 py-3 text-sm font-medium whitespace-nowrap transition-all relative',
              activeTab === i
                ? 'text-indigo-400'
                : 'text-white/40 hover:text-white/60'
            )}
          >
            {tab.label || `Tab ${i + 1}`}
            {activeTab === i && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
            )}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-5">
        {tabList[activeTab]?.children && (
          <DynamicRenderer components={tabList[activeTab].children ?? []} />
        )}
      </div>
    </div>
  );
}
