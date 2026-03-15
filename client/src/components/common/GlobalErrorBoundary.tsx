"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Global_Runtime_Crash:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center space-y-12">
          <div className="relative">
            <div className="w-24 h-24 bg-red-600/10 rounded-full border border-red-500/20 flex items-center justify-center text-red-500 animate-pulse">
              <AlertTriangle size={48} />
            </div>
            <div className="absolute inset-0 bg-red-500/20 blur-3xl opacity-20" />
          </div>

          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none uppercase">
              Operational_Failure
            </h1>
            <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed uppercase tracking-widest italic">
              A critical execution error has been detected in the rendering thread. 
              The system has been halted to prevent further corruption.
            </p>
            {process.env.NODE_ENV === "development" && (
              <div className="p-6 bg-red-600/5 border border-red-500/10 rounded-3xl text-left overflow-auto max-h-48">
                <p className="text-red-500 font-mono text-xs whitespace-pre-wrap">
                  {this.state.error?.stack}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={this.handleRetry}
              className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-4"
            >
              <RefreshCcw size={16} />
              Re-Initialize_Node
            </button>
            <Link
              href="/"
              className="px-10 py-5 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all flex items-center gap-4"
            >
              <Home size={16} />
              Return_Home
            </Link>
          </div>

          <div className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-800">
            SECURE_RECOVERY_PROTOCOL_ACTIVE
          </div>
        </div>
      );
    }

    return this.children;
  }
}
