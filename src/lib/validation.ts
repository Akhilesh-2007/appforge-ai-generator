import { z } from 'zod';

// ============================================================
// Zod Schema Definitions for All Supported Components
// ============================================================

// Base component common attributes
const baseComponentSchema = z.object({
  type: z.string(),
  id: z.string().optional(),
  className: z.string().optional(),
});

// Card Component
export const cardSchema = baseComponentSchema.extend({
  type: z.literal('card'),
  title: z.string().optional(),
  value: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  trend: z.string().optional(),
  trendDirection: z.enum(['up', 'down', 'neutral']).optional(),
  variant: z.enum(['default', 'gradient', 'outline']).optional(),
});

// DataCard Component
export const dataCardSchema = baseComponentSchema.extend({
  type: z.literal('datacard'),
  title: z.string().optional(),
  fields: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).optional(),
});

// Table Component
export const tableSchema = baseComponentSchema.extend({
  type: z.literal('table'),
  title: z.string().optional(),
  columns: z.array(z.string()).optional(),
  data: z.array(z.record(z.string(), z.union([z.string(), z.number()]))).optional(),
});

// Input Component
export const inputSchema = baseComponentSchema.extend({
  type: z.literal('input'),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  inputType: z.string().optional(),
  name: z.string().optional(),
  required: z.boolean().optional(),
  defaultValue: z.string().optional(),
});

// Textarea Component
export const textareaSchema = baseComponentSchema.extend({
  type: z.literal('textarea'),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  name: z.string().optional(),
  rows: z.number().optional(),
  required: z.boolean().optional(),
  defaultValue: z.string().optional(),
});

// Select Component
export const selectSchema = baseComponentSchema.extend({
  type: z.literal('select'),
  label: z.string().optional(),
  name: z.string().optional(),
  placeholder: z.string().optional(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).optional(),
  required: z.boolean().optional(),
});

// Checkbox Component
export const checkboxSchema = baseComponentSchema.extend({
  type: z.literal('checkbox'),
  label: z.string().optional(),
  name: z.string().optional(),
  checked: z.boolean().optional(),
});

// Radio Component
export const radioSchema = baseComponentSchema.extend({
  type: z.literal('radio'),
  label: z.string().optional(),
  name: z.string().optional(),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).optional(),
  defaultValue: z.string().optional(),
});

// Button Component
export const buttonSchema = baseComponentSchema.extend({
  type: z.literal('button'),
  label: z.string().optional(),
  variant: z.enum(['primary', 'secondary', 'danger', 'ghost', 'outline']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  disabled: z.boolean().optional(),
  loading: z.boolean().optional(),
});

// Chart Component
export const chartSchema = baseComponentSchema.extend({
  type: z.literal('chart'),
  title: z.string().optional(),
  chartType: z.enum(['bar', 'line', 'pie', 'area']).optional(),
  data: z.array(z.record(z.string(), z.union([z.string(), z.number()]))).optional(),
  dataKey: z.string().optional(),
  xKey: z.string().optional(),
});

// Grid Component (Forward declared due to recursive children)
// We will construct this as a lazy recursive schema below.

// Container Component
// We will construct this as a lazy recursive schema below.

// Section Component
// We will construct this as a lazy recursive schema below.

// Tabs Component
// We will construct this as a lazy recursive schema below.

// Modal Component
// We will construct this as a lazy recursive schema below.

// Form Component
// We will construct this as a lazy recursive schema below.

// ============================================================
// Recursive / Nested Components Setup
// ============================================================

export type ComponentConfigZod = z.infer<typeof componentSchema>;

export const componentSchema: z.ZodType<unknown> = z.lazy(() =>
  z.discriminatedUnion('type', [
    cardSchema,
    dataCardSchema,
    tableSchema,
    inputSchema,
    textareaSchema,
    selectSchema,
    checkboxSchema,
    radioSchema,
    buttonSchema,
    chartSchema,
    // Form component
    baseComponentSchema.extend({
      type: z.literal('form'),
      title: z.string().optional(),
      submitLabel: z.string().optional(),
      children: z.array(componentSchema).optional(),
    }),
    // Section component
    baseComponentSchema.extend({
      type: z.literal('section'),
      title: z.string().optional(),
      description: z.string().optional(),
      children: z.array(componentSchema).optional(),
    }),
    // Container component
    baseComponentSchema.extend({
      type: z.literal('container'),
      padding: z.string().optional(),
      maxWidth: z.string().optional(),
      children: z.array(componentSchema).optional(),
    }),
    // Grid component
    baseComponentSchema.extend({
      type: z.literal('grid'),
      columns: z.number().min(1).max(12).optional(),
      gap: z.string().optional(),
      children: z.array(componentSchema).optional(),
    }),
    // Tabs component
    baseComponentSchema.extend({
      type: z.literal('tabs'),
      tabs: z.array(
        z.object({
          label: z.string(),
          children: z.array(componentSchema).optional(),
        })
      ).optional(),
    }),
    // Modal component
    baseComponentSchema.extend({
      type: z.literal('modal'),
      title: z.string().optional(),
      triggerLabel: z.string().optional(),
      size: z.enum(['sm', 'md', 'lg']).optional(),
      children: z.array(componentSchema).optional(),
    }),
  ]).or(
    // Fallback for completely unknown type values so Zod doesn't fail hard
    baseComponentSchema.extend({
      type: z.string(),
    })
  )
);

// Page-level configuration schema
export const pageConfigSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  layout: z.enum(['dashboard', 'form', 'blank']).optional(),
  theme: z.enum(['light', 'dark']).optional(),
  components: z.array(componentSchema).optional(),
});

// ValidationError interface
export interface ValidationError {
  path: string;
  message: string;
}

/**
 * Validate Page Config JSON Schema
 * Returns structured validation details.
 */
export function validatePageConfig(data: unknown): {
  success: boolean;
  errors: ValidationError[];
} {
  const result = pageConfigSchema.safeParse(data);
  if (result.success) {
    return { success: true, errors: [] };
  }

  const errors = result.error.issues.map((err) => ({
    path: err.path.map((p) => (typeof p === 'number' ? `[${p}]` : p)).join('.').replace(/\.\[/g, '['),
    message: err.message,
  }));

  return { success: false, errors };
}
