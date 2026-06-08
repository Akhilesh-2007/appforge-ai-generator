'use client';

import { ComponentConfig } from '@/types/schema';
import { getComponent } from '@/registry/componentRegistry';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { EmptyState } from '@/components/shared/EmptyState';
import { generateId } from '@/lib/utils';

interface DynamicRendererProps {
  components: ComponentConfig[];
}

/**
 * Core rendering engine.
 * Takes an array of component configs and recursively renders them
 * using the component registry. Each component is wrapped in an
 * ErrorBoundary so a single broken component cannot crash the page.
 */
export function DynamicRenderer({ components }: DynamicRendererProps) {
  // Guard: null, undefined, or non-array
  if (!components || !Array.isArray(components) || components.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {components.map((config, index) => {
        // Guard: null or invalid config
        if (!config || typeof config !== 'object') {
          return null;
        }

        const Component = getComponent(config.type);
        const key = config.id || `${config.type}-${index}-${generateId()}`;

        return (
          <ErrorBoundary key={key}>
            <Component {...config} />
          </ErrorBoundary>
        );
      })}
    </div>
  );
}
