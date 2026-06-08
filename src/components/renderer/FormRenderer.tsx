'use client';

import React, { useState } from 'react';
import { ComponentConfig } from '@/types/schema';
import { DynamicRenderer } from './DynamicRenderer';
import { useAppStore } from '@/store/useAppStore';
import { CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface FormRendererProps {
  title?: string;
  components: ComponentConfig[];
}

type FormFieldConfig = ComponentConfig & {
  label?: string;
  name?: string;
  required?: boolean;
};

type TabContainerConfig = ComponentConfig & {
  tabs?: { children?: ComponentConfig[] }[];
};

/**
 * Form Renderer Component
 * Manages form state, performs client-side field validation,
 * displays submit spinner feedback, and handles reset behaviors.
 */
export function FormRenderer({ title, components }: FormRendererProps) {
  const formData = useAppStore((s) => s.formData);
  const resetFormData = useAppStore((s) => s.resetFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Flatten the component tree to find all fields for validation
  const getFields = (comps: ComponentConfig[]): FormFieldConfig[] => {
    let fields: FormFieldConfig[] = [];
    comps.forEach((c) => {
      if (c.type === 'input' || c.type === 'textarea' || c.type === 'select' || c.type === 'checkbox' || c.type === 'radio') {
        fields.push(c as FormFieldConfig);
      }
      if (c.children) {
        fields = [...fields, ...getFields(c.children)];
      }
      if (c.type === 'tabs') {
        const tabs = (c as TabContainerConfig).tabs ?? [];
        tabs.forEach((t) => {
          if (t.children) {
            fields = [...fields, ...getFields(t.children)];
          }
        });
      }
    });
    return fields;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    
    // Find all fields inside the config
    const fields = getFields(components);
    const errors: Record<string, string> = {};

    // Validate fields
    fields.forEach((field) => {
      const name = field.name || field.label || '';
      const value = formData[name];
      const required = field.required;

      if (required && (value === undefined || value === null || String(value).trim() === '')) {
        errors[name] = `${field.label || 'Field'} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Pass: Proceed submit simulation
    setFormErrors({});
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      resetFormData();
    }, 1500);
  };

  const handleReset = () => {
    resetFormData();
    setFormErrors({});
    setSubmitSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label={title || 'Generated form'}>
      {submitSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
          <CheckCircle2 size={16} />
          <div>
            <p className="font-semibold">Form Submitted Successfully!</p>
            <p className="text-white/40 mt-0.5">Mock transaction executed in workspace.</p>
          </div>
        </div>
      )}

      {Object.keys(formErrors).length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Please fix validation errors:</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5 font-mono">
              {Object.entries(formErrors).map(([key, err]) => (
                <li key={key}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Render children inputs recursively */}
      <div className="space-y-4">
        <DynamicRenderer components={components} />
      </div>

      {/* Form Action Controls */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          {submitting ? (
            <>
              <RefreshCw size={12} className="animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Data</span>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold transition-colors cursor-pointer"
        >
          Reset Form
        </button>
      </div>
    </form>
  );
}
