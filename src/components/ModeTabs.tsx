import React from 'react';
import { Layout, Cpu, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DebuggerMode } from '../types/debugger';

interface ModeTabsProps {
  mode: DebuggerMode;
  onSelectMode: (mode: DebuggerMode) => void;
}

export const ModeTabs: React.FC<ModeTabsProps> = ({ mode, onSelectMode }) => {
  return (
    <nav className="border-b border-slate-800/80 bg-slate-950/70 px-4 py-2 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSelectMode('web')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            mode === 'web'
              ? 'border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 shadow-sm shadow-indigo-500/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Layout className={`w-4 h-4 ${mode === 'web' ? 'text-indigo-400' : 'text-slate-500'}`} />
          <span>Web UI &amp; Layout Debugger</span>
        </button>

        <button
          onClick={() => onSelectMode('systems')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
            mode === 'systems'
              ? 'border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Cpu className={`w-4 h-4 ${mode === 'systems' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>C/C++ &amp; Logic Systems Debugger</span>
        </button>
      </div>

      <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Instant Offline Preloaded Mock Data</span>
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
          <span>Memory &amp; Flexbox Invariant Engine</span>
        </span>
      </div>
    </nav>
  );
};
