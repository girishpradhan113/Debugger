import React, { useState } from 'react';
import {
  ShieldCheck,
  GitPullRequest,
  Copy,
  Check,
  CheckCircle,
  Smartphone,
  Tablet,
  Monitor,
  Columns,
  List,
  Cpu,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { BugReport, DebuggerMode } from '../types/debugger';
import { computeDiff, buildSideBySide } from '../utils/diffEngine';

interface OutputPanelProps {
  mode: DebuggerMode;
  bugReport: BugReport;
  inputCode: string;
  onApplyPatchToInput: () => void;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  mode,
  bugReport,
  inputCode,
  onApplyPatchToInput,
}) => {
  const [diffViewMode, setDiffViewMode] = useState<'unified' | 'split'>('unified');
  const [uiPreviewTab, setUiPreviewTab] = useState<'patched' | 'buggy' | 'compare'>('patched');
  const [viewportWidth, setViewportWidth] = useState<'mobile' | 'tablet' | 'full'>('mobile');
  const [copied, setCopied] = useState(false);

  const diffResult = computeDiff(inputCode || bugReport.buggyCode, bugReport.patchedCode);
  const sideBySideRows = buildSideBySide(diffResult.lines);

  const handleCopyPatch = () => {
    navigator.clipboard.writeText(bugReport.patchedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severityBadgeClass =
    bugReport.severity === 'CRITICAL'
      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
      : bugReport.severity === 'HIGH'
      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
      : 'bg-blue-500/20 text-blue-400 border-blue-500/40';

  const getViewportClass = () => {
    if (viewportWidth === 'mobile') return 'max-w-[375px] mx-auto';
    if (viewportWidth === 'tablet') return 'max-w-[640px] mx-auto';
    return 'w-full';
  };

  return (
    <section className="flex flex-col gap-3.5 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
            Root Cause &amp; Verification
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${severityBadgeClass}`}
          >
            {bugReport.severity}
          </span>
        </div>
      </div>

      {/* 1. Root Cause Breakdown Card */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-indigo-300 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {bugReport.filename}
            </span>
            <span className="text-slate-400 text-[11px] font-medium bg-slate-900/50 px-2 py-0.5 rounded">
              {bugReport.category}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px]">
              Confidence:{' '}
              <strong className="text-emerald-400 font-mono font-bold">
                {bugReport.confidence}%
              </strong>
            </span>
            <span className="text-slate-400 text-[11px]">
              Est. Fix:{' '}
              <strong className="text-indigo-300 font-mono font-bold">
                {bugReport.estimatedFixTime}
              </strong>
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
          <p className="font-medium text-slate-200 mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-indigo-400">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Root Cause Diagnosis:
          </p>
          <p>{bugReport.rootCause}</p>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-xs text-emerald-300">
          <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
          <p className="text-[11px] text-emerald-300/90 font-medium">
            <strong>Remedy:</strong> {bugReport.remedySummary}
          </p>
        </div>
      </div>

      {/* 2. Code Diff / Patched Code Viewer */}
      <div className="flex flex-col bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden min-h-[240px]">
        {/* Diff Top Bar */}
        <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-xs gap-2">
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-bold text-slate-200">Patched Code Diff</span>
            <span className="text-[11px] font-mono text-slate-400 ml-1">
              <span className="text-emerald-400 font-bold">+{diffResult.stats.additions}</span> /{' '}
              <span className="text-rose-400 font-bold">-{diffResult.stats.deletions}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setDiffViewMode('unified')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition cursor-pointer flex items-center gap-1 ${
                  diffViewMode === 'unified'
                    ? 'bg-slate-800 text-slate-100 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Unified Diff View"
              >
                <List className="w-3 h-3" />
                <span>Unified</span>
              </button>
              <button
                type="button"
                onClick={() => setDiffViewMode('split')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition cursor-pointer flex items-center gap-1 ${
                  diffViewMode === 'split'
                    ? 'bg-slate-800 text-slate-100 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Side-by-Side Split Diff View"
              >
                <Columns className="w-3 h-3" />
                <span>Split</span>
              </button>
            </div>

            {/* Actions */}
            <button
              type="button"
              onClick={handleCopyPatch}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Patch</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onApplyPatchToInput}
              className="px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-indigo-200 border border-indigo-500/40 text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
              title="Replace source code editor with this fixed version"
            >
              <ArrowRight className="w-3 h-3" />
              <span>Apply to Editor</span>
            </button>
          </div>
        </div>

        {/* Diff Content Area */}
        <div className="flex-1 overflow-auto p-2 font-mono text-xs max-h-[280px]">
          {diffViewMode === 'unified' ? (
            <div className="flex flex-col gap-0.5">
              {diffResult.lines.map((line, idx) => {
                let rowBg = 'text-slate-400 hover:bg-slate-900/40';
                let sign = ' ';
                let signColor = 'text-slate-600';

                if (line.type === 'added') {
                  rowBg = 'bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500';
                  sign = '+';
                  signColor = 'text-emerald-400 font-bold';
                } else if (line.type === 'removed') {
                  rowBg = 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500 line-through opacity-75';
                  sign = '-';
                  signColor = 'text-rose-400 font-bold';
                }

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 py-0.5 px-2 rounded font-mono text-[11px] leading-tight select-text ${rowBg}`}
                  >
                    <span className="w-12 shrink-0 text-[10px] text-slate-500 text-right select-none font-mono">
                      {line.originalLineNumber || ''} {line.patchedLineNumber || ''}
                    </span>
                    <span className={`w-3 shrink-0 select-none ${signColor}`}>{sign}</span>
                    <span className="flex-1 whitespace-pre-wrap break-all">{line.content}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Split Side-by-Side View */
            <div className="flex flex-col divide-y divide-slate-800/40">
              <div className="grid grid-cols-2 text-[10px] text-slate-500 pb-1 font-bold">
                <div className="px-2">Original Buggy Code</div>
                <div className="px-2 border-l border-slate-800">Patched Clean Code</div>
              </div>
              {sideBySideRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-2 text-[11px] leading-tight font-mono">
                  {/* Left Column (Original) */}
                  <div
                    className={`px-2 py-0.5 flex items-start gap-1.5 overflow-hidden ${
                      row.left?.type === 'removed'
                        ? 'bg-rose-950/30 text-rose-300 line-through'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="w-6 shrink-0 text-[10px] text-slate-600 text-right select-none">
                      {row.left?.lineNum || ''}
                    </span>
                    <span className="flex-1 whitespace-pre-wrap break-all">
                      {row.left ? row.left.content : ''}
                    </span>
                  </div>

                  {/* Right Column (Patched) */}
                  <div
                    className={`px-2 py-0.5 flex items-start gap-1.5 border-l border-slate-800 overflow-hidden ${
                      row.right?.type === 'added'
                        ? 'bg-emerald-950/30 text-emerald-200 font-medium'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="w-6 shrink-0 text-[10px] text-slate-600 text-right select-none">
                      {row.right?.lineNum || ''}
                    </span>
                    <span className="flex-1 whitespace-pre-wrap break-all">
                      {row.right ? row.right.content : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Dynamic Verification Panel */}
      <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden min-h-[240px]">
        {/* Verification Header */}
        <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-slate-200">
              {mode === 'web'
                ? 'Dynamic Sandboxed UI Verification'
                : 'Hardware Memory & Instruction Trace'}
            </span>
          </div>

          {/* Web Mode Controls */}
          {mode === 'web' ? (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Viewport Width Toggle */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setViewportWidth('mobile')}
                  className={`p-1 rounded text-[10px] transition cursor-pointer ${
                    viewportWidth === 'mobile'
                      ? 'bg-slate-800 text-indigo-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Mobile 375px Viewport"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewportWidth('tablet')}
                  className={`p-1 rounded text-[10px] transition cursor-pointer ${
                    viewportWidth === 'tablet'
                      ? 'bg-slate-800 text-indigo-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Tablet 640px Viewport"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewportWidth('full')}
                  className={`p-1 rounded text-[10px] transition cursor-pointer ${
                    viewportWidth === 'full'
                      ? 'bg-slate-800 text-indigo-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Full Viewport"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Buggy vs Patched Toggle */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setUiPreviewTab('patched')}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer ${
                    uiPreviewTab === 'patched'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Patched View
                </button>
                <button
                  type="button"
                  onClick={() => setUiPreviewTab('buggy')}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer ${
                    uiPreviewTab === 'buggy'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Buggy View
                </button>
                <button
                  type="button"
                  onClick={() => setUiPreviewTab('compare')}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition cursor-pointer ${
                    uiPreviewTab === 'compare'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Side-by-Side
                </button>
              </div>
            </div>
          ) : (
            <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Deterministic Memory State Verified
            </span>
          )}
        </div>

        {/* Verification Body */}
        <div className="flex-1 p-3 bg-slate-950/95 overflow-auto">
          {mode === 'web' ? (
            /* Web Mode Iframe Container */
            <div className={`transition-all duration-300 ${getViewportClass()}`}>
              {uiPreviewTab === 'compare' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col border border-rose-500/40 rounded-xl overflow-hidden">
                    <div className="bg-rose-950/40 px-3 py-1 text-[11px] font-bold text-rose-300 flex items-center justify-between border-b border-rose-500/30">
                      <span>Original Buggy Render</span>
                      <span className="text-[10px] text-rose-400 font-mono">Collision Active</span>
                    </div>
                    <iframe
                      title="Buggy Preview"
                      sandbox="allow-scripts"
                      srcDoc={bugReport.interactiveBuggyHtml || bugReport.buggyCode}
                      className="w-full h-56 bg-slate-950"
                    />
                  </div>
                  <div className="flex flex-col border border-emerald-500/40 rounded-xl overflow-hidden">
                    <div className="bg-emerald-950/40 px-3 py-1 text-[11px] font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-500/30">
                      <span>Patched Fixed Render</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Bounds Safe</span>
                    </div>
                    <iframe
                      title="Patched Preview"
                      sandbox="allow-scripts"
                      srcDoc={bugReport.interactivePatchedHtml || bugReport.patchedCode}
                      className="w-full h-56 bg-slate-950"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-slate-900 px-3 py-1.5 text-[11px] font-medium text-slate-300 flex items-center justify-between border-b border-slate-800">
                    <span className="font-semibold text-slate-200">
                      {uiPreviewTab === 'patched' ? 'Patched Render (Fluid Flexbox)' : 'Buggy Render (Collision Overflow)'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Sandbox: allow-scripts
                    </span>
                  </div>
                  <iframe
                    title="Live Sandboxed Preview"
                    sandbox="allow-scripts"
                    srcDoc={
                      uiPreviewTab === 'patched'
                        ? bugReport.interactivePatchedHtml || bugReport.patchedCode
                        : bugReport.interactiveBuggyHtml || bugReport.buggyCode
                    }
                    className="w-full h-64 bg-slate-950"
                  />
                </div>
              )}
            </div>
          ) : (
            /* Systems Mode Memory Table & Execution Trace */
            <div className="flex flex-col gap-3">
              {/* Memory Register Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
                <div className="bg-slate-900 px-3 py-2 text-xs font-bold text-slate-200 flex items-center justify-between border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    Memory Register &amp; Pointer Violation Inspector
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Hardware Trap SIGSEGV Averted
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 text-[10px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Variable / Register</th>
                        <th className="p-2.5">Memory Address</th>
                        <th className="p-2.5 text-rose-300">Before Fix</th>
                        <th className="p-2.5 text-emerald-300">Patched State</th>
                        <th className="p-2.5">Safety Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      {(bugReport.memoryRegisters || []).map((reg, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/60">
                          <td className="p-2.5 font-bold text-slate-200">{reg.name}</td>
                          <td className="p-2.5 text-slate-400">{reg.address}</td>
                          <td className="p-2.5 text-rose-300 font-semibold">{reg.buggyValue}</td>
                          <td className="p-2.5 text-emerald-300 font-semibold">{reg.patchedValue}</td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                reg.status === 'VIOLATION'
                                  ? 'text-rose-400 bg-rose-500/10 border border-rose-500/30'
                                  : reg.status === 'SAFE'
                                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'
                                  : 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step-by-Step Simulated Execution Trace */}
              <div className="border border-slate-800 rounded-xl p-3 bg-slate-900/40">
                <div className="text-xs font-bold text-slate-200 mb-2 flex items-center justify-between">
                  <span>Simulated CPU Execution Trace &amp; Traps</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Deterministic Virtual Machine Output
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                  {(bugReport.executionTrace || []).map((step) => {
                    const badgeClass =
                      step.state === 'FAULT'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : step.state === 'RECOVERED'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : step.state === 'WARN'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700';

                    return (
                      <div
                        key={step.step}
                        className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800/80"
                      >
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeClass}`}>
                          #{step.step} {step.state}
                        </span>
                        <span className="text-slate-100 font-bold">{step.instruction}</span>
                        <span className="text-slate-500 text-[10px]">({step.location})</span>
                        <span className="text-slate-400 ml-auto text-[11px]">{step.detail}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
