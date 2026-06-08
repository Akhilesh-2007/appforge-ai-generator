'use client';

import React, { Component, ReactNode } from 'react';
import { AlertOctagon, RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    // Log diagnostics in dev environments if needed
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 shadow-lg shadow-red-950/20">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-red-400">
              <AlertOctagon size={18} />
              <span className="font-bold text-xs uppercase tracking-wider">Component Outage</span>
            </div>
            
            <button
              onClick={this.handleRetry}
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
            >
              <RefreshCcw size={10} className="animate-spin-once" />
              Reset Component
            </button>
          </div>

          <p className="text-xs text-red-300/85 mb-3 font-medium">
            {this.state.error?.message || 'A critical rendering exception occurred.'}
          </p>

          {/* Diagnostic Details Toggle */}
          <div className="border border-white/5 rounded-lg overflow-hidden bg-black/30">
            <button
              type="button"
              onClick={() => this.setState((s) => ({ showDetails: !s.showDetails }))}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono text-white/40 hover:text-white/60 transition-colors"
            >
              <span>System Stack Diagnostics</span>
              {this.state.showDetails ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
            
            {this.state.showDetails && (
              <div className="p-3 border-t border-white/5 text-[9px] text-white/50 font-mono overflow-auto max-h-[150px] leading-relaxed select-text">
                <p className="font-semibold text-red-400/70 mb-1">{String(this.state.error?.stack)}</p>
                <p className="mt-2 text-white/30">{this.state.errorInfo?.componentStack}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
