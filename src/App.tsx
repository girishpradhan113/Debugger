/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ModeTabs } from './components/ModeTabs';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { PRESET_DEMOS } from './data/presets';
import { BugReport, DebuggerMode } from './types/debugger';
import { generateStandaloneHtml } from './utils/exportStandaloneHtml';

export default function App() {
  const initialPresetKey = '1: UI Flexbox Collision';
  const [currentPresetKey, setCurrentPresetKey] = useState<string>(initialPresetKey);
  const [activeBugReport, setActiveBugReport] = useState<BugReport>(PRESET_DEMOS[initialPresetKey]);
  const [mode, setMode] = useState<DebuggerMode>(PRESET_DEMOS[initialPresetKey].mode);

  // Input states
  const [code, setCode] = useState<string>(PRESET_DEMOS[initialPresetKey].buggyCode);
  const [logs, setLogs] = useState<string>(PRESET_DEMOS[initialPresetKey].logs);
  const [imageUrl, setImageUrl] = useState<string>(PRESET_DEMOS[initialPresetKey].mockImageUrl);
  const [imageTitle, setImageTitle] = useState<string>(PRESET_DEMOS[initialPresetKey].mockImageTitle);

  // Reasoning analysis states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reasoningPhase, setReasoningPhase] = useState(0);
  const [reasoningText, setReasoningText] = useState('');

  // Handle Preset Selection
  const handleSelectPreset = useCallback((presetKey: string) => {
    const preset = PRESET_DEMOS[presetKey];
    if (!preset) return;
    setCurrentPresetKey(presetKey);
    setActiveBugReport(preset);
    setMode(preset.mode);
    setCode(preset.buggyCode);
    setLogs(preset.logs);
    setImageUrl(preset.mockImageUrl);
    setImageTitle(preset.mockImageTitle);
  }, []);

  // Handle Mode Selection Tab
  const handleSelectMode = useCallback((newMode: DebuggerMode) => {
    setMode(newMode);
    if (newMode === 'web') {
      if (currentPresetKey !== '1: UI Flexbox Collision') {
        handleSelectPreset('1: UI Flexbox Collision');
      }
    } else {
      if (currentPresetKey === '1: UI Flexbox Collision') {
        handleSelectPreset('2: C++ Pointer Segfault');
      }
    }
  }, [currentPresetKey, handleSelectPreset]);

  // Handle Reset to current preset
  const handleReset = useCallback(() => {
    const preset = PRESET_DEMOS[currentPresetKey];
    if (preset) {
      setCode(preset.buggyCode);
      setLogs(preset.logs);
      setImageUrl(preset.mockImageUrl);
      setImageTitle(preset.mockImageTitle);
      setActiveBugReport(preset);
    }
  }, [currentPresetKey]);

  // Handle Export Standalone Single-File HTML
  const handleExportStandalone = useCallback(() => {
    const standaloneHtml = generateStandaloneHtml();
    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BugSnap-Universal-AI-Debugger-Standalone.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // Handle Trigger Analysis with Multi-Step Gemini Reasoning Simulation
  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true);
    setReasoningPhase(15);
    setReasoningText('1. Ingesting visual artifacts, OCR signals, and runtime log telemetry...');

    const stages = [
      { progress: 35, text: '2. Constructing AST syntax trees & control-flow dependencies...' },
      { progress: 65, text: '3. Identifying boundary violation: flexbox overflow / nullptr dereference...' },
      { progress: 85, text: '4. Synthesizing minimal regression-proof refactoring patch...' },
      { progress: 100, text: '5. Dynamic sandboxed verification passed! Invariant safety verified.' },
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setReasoningPhase(stages[currentStage].progress);
        setReasoningText(stages[currentStage].text);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 300);
      }
    }, 400);
  }, []);

  // Apply Patch to Input
  const handleApplyPatchToInput = useCallback(() => {
    setCode(activeBugReport.patchedCode);
  }, [activeBugReport.patchedCode]);

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col antialiased font-sans">
      {/* 1. Top Navigation & Demo Switcher */}
      <Navbar
        currentPreset={currentPresetKey}
        onSelectPreset={handleSelectPreset}
        onExportStandalone={handleExportStandalone}
        onReset={handleReset}
      />

      {/* 2. Multi-Mode Selector Tabs */}
      <ModeTabs mode={mode} onSelectMode={handleSelectMode} />

      {/* 3. Multimodal Input & Output Workspace (Split Layout) */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[1920px] mx-auto w-full">
        {/* Left Pane: Inputs */}
        <InputPanel
          mode={mode}
          language={activeBugReport.language}
          code={code}
          logs={logs}
          imageUrl={imageUrl}
          imageTitle={imageTitle}
          isAnalyzing={isAnalyzing}
          reasoningPhase={reasoningPhase}
          reasoningText={reasoningText}
          onCodeChange={setCode}
          onLogsChange={setLogs}
          onImageChange={(url, title) => {
            setImageUrl(url);
            setImageTitle(title);
          }}
          onRemoveImage={() => {
            setImageUrl('');
            setImageTitle('');
          }}
          onAnalyze={handleAnalyze}
        />

        {/* Right Pane: Outputs & Verification */}
        <OutputPanel
          mode={mode}
          bugReport={activeBugReport}
          inputCode={code}
          onApplyPatchToInput={handleApplyPatchToInput}
        />
      </main>

      {/* Footer / Status bar */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>BugSnap Neural Core v2.4 Active</span>
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">AST &amp; Visual Refactor Workbench</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Zero backend configuration required</span>
          <button
            onClick={handleExportStandalone}
            className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
          >
            Download Standalone (.html)
          </button>
        </div>
      </footer>
    </div>
  );
}
