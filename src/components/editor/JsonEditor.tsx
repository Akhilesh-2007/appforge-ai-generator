'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { useAppStore } from '@/store/useAppStore';
import { AlertCircle, FileJson } from 'lucide-react';

interface JsonEditorProps {
  className?: string;
}

export function JsonEditor({ className }: JsonEditorProps) {
  const jsonString = useAppStore((s) => s.jsonString);
  const setJsonString = useAppStore((s) => s.setJsonString);
  const jsonError = useAppStore((s) => s.jsonError);
  const isDarkMode = useAppStore((s) => s.isDarkMode);

  const validationErrors = useAppStore((s) => s.validationErrors);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setJsonString(value);
    }
  };

  const hasErrors = !!jsonError || validationErrors.length > 0;

  return (
    <div className={`flex flex-col h-full border border-white/10 rounded-xl overflow-hidden bg-zinc-950 ${className}`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <FileJson size={16} className="text-indigo-400" />
          <span className="text-xs font-semibold text-white/80">JSON Schema Editor</span>
        </div>
        {hasErrors ? (
          <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md">
            <AlertCircle size={12} />
            <span>Config Warnings</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sync Live</span>
          </div>
        )}
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 min-h-[300px]">
        <Editor
          height="100%"
          defaultLanguage="json"
          theme={isDarkMode ? 'vs-dark' : 'light'}
          value={jsonString}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            tabSize: 2,
          }}
        />
      </div>

      {/* Editor Footer / Error Messages */}
      {hasErrors && (
        <div className="border-t border-white/10 bg-zinc-900/40 divide-y divide-white/5 overflow-auto max-h-[160px]">
          {jsonError && jsonError !== 'Config validation failed' && (
            <div className="p-3 text-xs text-red-400 font-mono">
              <span className="font-bold">Syntax Error:</span> {jsonError}
            </div>
          )}
          {validationErrors.length > 0 && (
            <div className="p-3 space-y-1">
              <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-2">Schema Validation Failures ({validationErrors.length})</div>
              {validationErrors.map((err, i) => (
                <div key={i} className="text-[11px] text-white/70 font-mono flex items-start gap-1">
                  <span className="text-red-400 font-semibold shrink-0">{err.path || 'root'}:</span>
                  <span>{err.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
