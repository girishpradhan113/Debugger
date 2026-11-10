import React from 'react';
import { ScanSearch, Sparkles, Download, RefreshCw } from 'lucide-react';
import { PRESET_DEMOS } from '../data/presets';

interface NavbarProps {
  currentPreset: string;
  onSelectPreset: (presetKey: string) => void;
  onExportStandalone: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPreset,
  onSelectPreset,
  onExportStandalone,
  onReset,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Track Badge */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <ScanSearch className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              BugSnap
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Universal AI Debugger
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Multimodal AI Debugger &amp; Refactor Workbench
          </p>
        </div>

        {/* Hackathon Track Badge */}
        <div className="ml-2 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Hackathon Track: Technology
        </div>
      </div>

      {/* Demo Switcher Dropdown & Standalone Exporter */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-700/80 rounded-lg px-3 py-1.5 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <label htmlFor="demo-select-dropdown" className="text-xs font-medium text-slate-300 whitespace-nowrap">
            Instant Demo:
          </label>
          <select
            id="demo-select-dropdown"
            value={currentPreset}
            onChange={(e) => onSelectPreset(e.target.value)}
            className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer pr-1"
          >
            {Object.keys(PRESET_DEMOS).map((key) => (
              <option key={key} value={key} className="bg-slate-900 text-slate-100">
                {key}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onExportStandalone}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-indigo-200 border border-indigo-500/40 text-xs font-medium transition cursor-pointer"
          title="Download single-file HTML version (runs anywhere offline)"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export Single-File HTML</span>
        </button>

        <button
          onClick={onReset}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition cursor-pointer"
          title="Reset to original demo preset"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
