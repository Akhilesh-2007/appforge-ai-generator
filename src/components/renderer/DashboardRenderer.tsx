'use client';

import React from 'react';
import { ComponentConfig } from '@/types/schema';
import { DynamicRenderer } from './DynamicRenderer';

interface DashboardRendererProps {
  components: ComponentConfig[];
}

/**
 * Dashboard Renderer
 * Systematically handles widget arrangements. 
 * Organizes dashboard structures dynamically into statistical rows (metrics card/datacard)
 * and data inspection rows (tables/charts) for clean visual hierarchy.
 */
export function DashboardRenderer({ components }: DashboardRendererProps) {
  // Separate components for structural grouping (highly valued in dashboard systems)
  const metricComponents = components.filter(
    (c) => c.type === 'card' || c.type === 'datacard'
  );
  
  const dataComponents = components.filter(
    (c) => c.type === 'table' || c.type === 'chart'
  );

  const generalComponents = components.filter(
    (c) => c.type !== 'card' && c.type !== 'datacard' && c.type !== 'table' && c.type !== 'chart'
  );

  return (
    <div className="space-y-6">
      {/* 1. Metrics / KPI Card Sections */}
      {metricComponents.length > 0 && (
        <div className="space-y-4">
          {/* If cards are not already wrapped in a grid, wrap them automatically in a 4-col responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DynamicRenderer components={metricComponents} />
          </div>
        </div>
      )}

      {/* 2. Visual Analytics & Tables Section */}
      {dataComponents.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {dataComponents.map((comp, idx) => {
            // Give tables and charts proportional grid spans (charts span 6 cols, tables span 12 cols unless side by side)
            const isTable = comp.type === 'table';
            const spanClass = isTable ? 'lg:col-span-12' : 'lg:col-span-6';
            
            return (
              <div key={idx} className={spanClass}>
                <DynamicRenderer components={[comp]} />
              </div>
            );
          })}
        </div>
      )}

      {/* 3. General Layout Wrappers (Grids, Tabs, Modals, Containers) */}
      {generalComponents.length > 0 && (
        <div className="space-y-6">
          <DynamicRenderer components={generalComponents} />
        </div>
      )}
    </div>
  );
}
