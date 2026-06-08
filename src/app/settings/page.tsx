'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useAppStore } from '@/store/useAppStore';
import { useDarkMode } from '@/hooks/useDarkMode';
import {
  Sun, Moon, Trash2, Download, Upload,
  Settings, CheckCircle2
} from 'lucide-react';

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const jsonString = useAppStore((s) => s.jsonString);
  const setJsonString = useAppStore((s) => s.setJsonString);
  const setActiveSample = useAppStore((s) => s.setActiveSample);
  const resetFormData = useAppStore((s) => s.resetFormData);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleExport = () => {
    try {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'app-config.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast('Configuration exported successfully.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        JSON.parse(text); // validate
        setJsonString(text);
        setActiveSample('custom');
        triggerToast('Configuration imported successfully.');
      } catch {
        alert('Invalid JSON file. Please check structure.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to reset all temporary form states?')) {
      resetFormData();
      triggerToast('Form state data cleared.');
    }
  };

  return (
    <AppShell>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="text-indigo-400" size={24} />
            System Preferences
          </h1>
          <p className="text-xs text-white/40 mt-1">Configure layout, editor behaviors, and workspace assets.</p>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
            <CheckCircle2 size={14} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Setting Sections */}
        <div className="space-y-6">
          {/* Visual Preferences */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/80">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-white/70">Theme Mode</p>
                <p className="text-[11px] text-white/40">Switch between dark and light editor styles.</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white/80 transition-all"
              >
                {isDarkMode ? (
                  <>
                    <Sun size={14} className="text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={14} className="text-indigo-400" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Backup / Restore */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white/80">Workspace Portability</h3>
            <div className="space-y-4 divide-y divide-white/5">
              {/* Export */}
              <div className="flex items-center justify-between pt-0 pb-4">
                <div>
                  <p className="text-xs font-medium text-white/70">Export JSON</p>
                  <p className="text-[11px] text-white/40">Download the current schema config to your computer.</p>
                </div>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium transition-colors"
                >
                  <Download size={14} />
                  <span>Download file</span>
                </button>
              </div>

              {/* Import */}
              <div className="flex items-center justify-between pt-4 pb-0">
                <div>
                  <p className="text-xs font-medium text-white/70">Import Config</p>
                  <p className="text-[11px] text-white/40">Upload a saved configuration file directly to workspace.</p>
                </div>
                <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white/80 transition-all cursor-pointer">
                  <Upload size={14} />
                  <span>Choose file</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Cache / State Reset */}
          <div className="rounded-xl border border-red-500/10 bg-red-500/[0.01] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-red-400">Maintenance & Security</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-white/70">Reset Form cache</p>
                <p className="text-[11px] text-white/40">Purges local React interactive state data cache.</p>
              </div>
              <button
                onClick={handleClearData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-400 font-medium transition-all"
              >
                <Trash2 size={14} />
                <span>Clear Form State</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
