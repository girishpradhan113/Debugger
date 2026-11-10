import { PRESET_DEMOS } from '../data/presets';

/**
 * Generates a complete standalone single-file HTML web application of BugSnap
 * matching the user's specification:
 * "built using HTML5, Tailwind CSS (via CDN), Lucide icons, and vanilla JavaScript,
 * packed entirely into a single-file template. It must work instantly when opened in any browser."
 */
export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BugSnap: Universal AI Debugger & Refactor Workbench</title>
  <meta name="description" content="Universal AI Multimodal Debugger and Refactor Workbench for Web UI, C/C++, and Logic Systems.">
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            slate: {
              950: '#070a13',
              900: '#0c1222',
              850: '#11182c',
              800: '#17223b',
            }
          }
        }
      }
    }
  </script>
  <!-- Lucide Icons via CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #070a13; }
    pre, code, textarea.code-font, .mono { font-family: 'JetBrains Mono', monospace; }
    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0c1222; }
    ::-webkit-scrollbar-thumb { background: #263353; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
  </style>
</head>
<body class="text-slate-100 min-h-screen flex flex-col bg-[#070a13]">

  <!-- Top Navigation & Demo Switcher -->
  <header class="border-b border-slate-800 bg-[#0c1222]/90 backdrop-blur sticky top-0 z-40 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
        <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
          <i data-lucide="scan-search" class="w-5 h-5 text-indigo-400"></i>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">BugSnap</span>
          <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">AI Debugger</span>
        </div>
        <p class="text-xs text-slate-400 hidden sm:block">Universal AI Debugger &amp; Refactor Workbench</p>
      </div>

      <!-- Hackathon Track Badge -->
      <div class="ml-2 hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Hackathon Track: Technology
      </div>
    </div>

    <!-- Demo Switcher & Controls -->
    <div class="flex items-center gap-2.5 flex-wrap">
      <div class="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5">
        <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i>
        <label for="demo-select" class="text-xs font-medium text-slate-300">Instant Demo:</label>
        <select id="demo-select" class="bg-transparent text-xs text-white font-medium focus:outline-none cursor-pointer pr-1">
          <option value="1: UI Flexbox Collision">1: UI Flexbox Collision</option>
          <option value="2: C++ Pointer Segfault">2: C++ Pointer Segfault</option>
          <option value="3: Python Null Reference">3: Python Null Reference</option>
        </select>
      </div>

      <button id="btn-export-standalone" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition" title="Export this single-file HTML application">
        <i data-lucide="download" class="w-3.5 h-3.5 text-indigo-400"></i>
        <span>Download HTML</span>
      </button>
    </div>
  </header>

  <!-- Multi-Mode Selector Tabs -->
  <nav class="border-b border-slate-800/80 bg-slate-950/60 px-4 py-2 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <button id="tab-web" class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 shadow-sm shadow-indigo-500/10">
        <i data-lucide="layout" class="w-4 h-4 text-indigo-400"></i>
        <span>Web UI &amp; Layout Debugger</span>
      </button>
      <button id="tab-systems" class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent">
        <i data-lucide="cpu" class="w-4 h-4 text-emerald-400"></i>
        <span>C/C++ &amp; Logic Systems Debugger</span>
      </button>
    </div>
    <div class="text-[11px] text-slate-400 hidden lg:flex items-center gap-3">
      <span class="flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i> Zero-backend needed</span>
      <span class="flex items-center gap-1"><i data-lucide="cpu" class="w-3.5 h-3.5 text-indigo-400"></i> AST &amp; Visual Synthesis</span>
    </div>
  </nav>

  <!-- Main Split Layout Workspace -->
  <main class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[1920px] mx-auto w-full">
    
    <!-- LEFT PANE: Inputs -->
    <section class="flex flex-col gap-3.5 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 shadow-xl">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <i data-lucide="file-input" class="w-4 h-4 text-indigo-400"></i>
          <h2 class="text-sm font-bold text-slate-200 uppercase tracking-wide">Multimodal Input Workspace</h2>
        </div>
        <span id="input-lang-badge" class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-indigo-300 border border-slate-700">HTML / CSS</span>
      </div>

      <!-- Image Dropzone / Canvas Upload -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <i data-lucide="image" class="w-3.5 h-3.5 text-indigo-400"></i>
            <span>Visual Artifact (Screenshot / Terminal Crash / Layout Collision)</span>
          </label>
          <span class="text-[10px] text-slate-400">Paste (Ctrl+V) or Drop</span>
        </div>
        
        <div id="dropzone" class="relative group border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 rounded-xl bg-slate-950/60 transition p-3 flex flex-col items-center justify-center cursor-pointer min-h-[120px]">
          <input type="file" id="file-input" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer z-10">
          
          <div id="dropzone-empty" class="flex flex-col items-center text-center">
            <i data-lucide="upload-cloud" class="w-7 h-7 text-slate-500 group-hover:text-indigo-400 transition mb-1"></i>
            <p class="text-xs text-slate-300 font-medium">Click, drop screenshot, or press <kbd class="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-indigo-300 border border-slate-700">Ctrl+V</kbd></p>
            <p class="text-[10px] text-slate-500 mt-0.5">Captures UI misalignment, compiler crash dumps, or memory faults</p>
          </div>

          <div id="dropzone-preview-container" class="w-full flex items-center gap-3 hidden">
            <img id="image-preview" src="" alt="Bug Screenshot" class="h-20 max-w-[140px] object-cover rounded-lg border border-slate-700 shadow-md">
            <div class="flex-1 min-w-0">
              <p id="image-title" class="text-xs font-medium text-slate-200 truncate">screenshot.png</p>
              <p class="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <i data-lucide="check" class="w-3 h-3"></i> Artifact attached for AI analysis
              </p>
              <button type="button" id="btn-remove-image" class="mt-2 text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 z-20">
                <i data-lucide="trash-2" class="w-3 h-3"></i> Remove Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Console / Terminal Log Textarea -->
      <div class="flex-1 flex flex-col min-h-[110px]">
        <div class="flex items-center justify-between mb-1.5">
          <label for="input-logs" class="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <i data-lucide="terminal" class="w-3.5 h-3.5 text-amber-400"></i>
            <span>Console / Terminal Logs / Stack Traces</span>
          </label>
          <button id="btn-clear-logs" class="text-[10px] text-slate-400 hover:text-slate-200 transition">Clear</button>
        </div>
        <textarea id="input-logs" class="w-full flex-1 min-h-[90px] p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-amber-500/60 focus:outline-none text-xs text-amber-200/90 font-mono resize-y leading-relaxed" placeholder="Paste runtime stack traces, compiler errors, or browser console warnings..."></textarea>
      </div>

      <!-- Source Code Editor Textarea -->
      <div class="flex-[2] flex flex-col min-h-[220px]">
        <div class="flex items-center justify-between mb-1.5">
          <label for="input-code" class="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <i data-lucide="code-2" class="w-3.5 h-3.5 text-indigo-400"></i>
            <span>Source Code Editor</span>
          </label>
          <span id="code-stats" class="text-[10px] text-slate-400 font-mono">0 lines</span>
        </div>
        <div class="relative flex-1 flex flex-col">
          <textarea id="input-code" class="w-full flex-1 min-h-[180px] p-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-indigo-500/60 focus:outline-none text-xs text-slate-200 font-mono resize-y leading-relaxed" placeholder="Paste original source code with bug..."></textarea>
        </div>
      </div>

      <!-- Primary Action Button with Loading Steps -->
      <div class="pt-2">
        <button id="btn-analyze" class="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 hover:from-indigo-500 hover:via-blue-500 hover:to-emerald-500 transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
          <i data-lucide="sparkles" class="w-4 h-4"></i>
          <span id="btn-analyze-text">Analyze &amp; Fix Bug</span>
        </button>

        <!-- Loading Reasoning Steps Progress -->
        <div id="reasoning-container" class="hidden mt-3 p-3 rounded-xl bg-slate-950 border border-indigo-500/30">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="text-indigo-300 font-semibold flex items-center gap-1.5">
              <i data-lucide="loader" class="w-3.5 h-3.5 animate-spin text-indigo-400"></i>
              Gemini Reasoning Engine:
            </span>
            <span id="reasoning-phase-percent" class="text-slate-400 font-mono text-[10px]">0%</span>
          </div>
          <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div id="reasoning-progress-bar" class="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300" style="width: 10%;"></div>
          </div>
          <p id="reasoning-step-text" class="text-[11px] text-slate-300 font-mono animate-pulse">1. Ingesting visual cues &amp; OCR telemetry...</p>
        </div>
      </div>
    </section>

    <!-- RIGHT PANE: Outputs & Verification -->
    <section class="flex flex-col gap-3.5 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 shadow-xl">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
          <h2 class="text-sm font-bold text-slate-200 uppercase tracking-wide">Root Cause &amp; Verification</h2>
        </div>
        <div id="severity-container" class="flex items-center gap-2">
          <span id="severity-badge" class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">CRITICAL</span>
        </div>
      </div>

      <!-- Root Cause Breakdown Card -->
      <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col gap-2">
        <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2">
            <span id="bug-filename" class="font-mono text-indigo-300 font-medium bg-slate-900 px-2 py-0.5 rounded border border-slate-800">filename</span>
            <span id="bug-category" class="text-slate-400">Category</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-slate-400 text-[11px]">Confidence: <strong id="bug-confidence" class="text-emerald-400 font-mono">99.4%</strong></span>
            <span class="text-slate-400 text-[11px]">Est. Fix: <strong id="bug-fixtime" class="text-indigo-300 font-mono">&lt; 2 mins</strong></span>
          </div>
        </div>
        <div class="text-xs text-slate-300 leading-relaxed">
          <p id="bug-rootcause">Root cause explanation will appear here after analysis.</p>
        </div>
        <div class="mt-1 pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-xs text-emerald-300">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400"></i>
          <p id="bug-remedy" class="text-[11px] text-emerald-300/90 font-medium">Remedy summary</p>
        </div>
      </div>

      <!-- Code Diff / Patched Code Viewer -->
      <div class="flex-1 flex flex-col bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden min-h-[220px]">
        <div class="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div class="flex items-center gap-2">
            <i data-lucide="git-pull-request" class="w-3.5 h-3.5 text-indigo-400"></i>
            <span class="font-bold text-slate-200">Patched Code Diff</span>
            <span id="diff-stats" class="text-[11px] font-mono text-slate-400 ml-1">
              <span class="text-emerald-400">+5</span> / <span class="text-rose-400">-3</span>
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <button id="btn-copy-patch" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1 transition">
              <i data-lucide="copy" class="w-3 h-3"></i>
              <span id="btn-copy-text">Copy Patch</span>
            </button>
            <button id="btn-apply-patch" class="px-2 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium flex items-center gap-1 transition">
              <i data-lucide="check" class="w-3 h-3"></i>
              <span>Apply to Editor</span>
            </button>
          </div>
        </div>

        <!-- Diff Viewer Body -->
        <div id="diff-container" class="flex-1 overflow-auto p-2 font-mono text-xs max-h-[280px]">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <!-- Dynamic Verification Panel -->
      <div id="verification-panel" class="flex-1 flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden min-h-[220px]">
        <div class="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
          <div class="flex items-center gap-2">
            <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span id="verification-title" class="font-bold text-slate-200">Dynamic Sandbox Verification</span>
          </div>

          <!-- UI Preview Viewport Toggles (Shown in Web mode) -->
          <div id="ui-preview-controls" class="flex items-center gap-1">
            <button id="btn-toggle-patched" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Patched View</button>
            <button id="btn-toggle-buggy" class="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-400 hover:text-slate-200 bg-slate-800">Buggy View</button>
          </div>
        </div>

        <!-- Content Area: Sandboxed Iframe (Web Mode) OR Memory Register Table & Trace (Systems Mode) -->
        <div class="flex-1 relative flex flex-col p-2 min-h-[180px]">
          
          <!-- Web Mode Iframe Container -->
          <div id="iframe-container" class="w-full h-full flex flex-col">
            <iframe id="sandbox-iframe" sandbox="allow-scripts" class="w-full flex-1 rounded-lg border border-slate-800 bg-slate-950"></iframe>
          </div>

          <!-- Systems Mode Memory Table & Execution Trace -->
          <div id="systems-container" class="w-full h-full flex flex-col gap-3 hidden overflow-auto">
            <!-- Memory Table -->
            <div class="border border-slate-800 rounded-lg overflow-hidden">
              <div class="bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>Memory Register &amp; Pointer Table</span>
                <span class="text-[10px] text-emerald-400 font-mono">Hardware Trap Prevented</span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left font-mono text-[11px]">
                  <thead class="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th class="p-2">Register / Pointer</th>
                      <th class="p-2">Address</th>
                      <th class="p-2">Buggy State</th>
                      <th class="p-2">Patched State</th>
                      <th class="p-2">Safety Status</th>
                    </tr>
                  </thead>
                  <tbody id="memory-table-body" class="divide-y divide-slate-800/60 text-slate-200">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Execution Step Trace -->
            <div class="border border-slate-800 rounded-lg p-2.5 bg-slate-950">
              <div class="text-[11px] font-bold text-slate-300 mb-2 flex items-center justify-between">
                <span>Simulated Instruction Trace</span>
                <span class="text-[10px] text-indigo-400">GDB / CPU Trace</span>
              </div>
              <div id="trace-steps-container" class="flex flex-col gap-1.5 font-mono text-[10px]">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>

  </main>

  <!-- Interactive JavaScript Engine packed entirely in single-file template -->
  <script>
    // PRESET DATA
    const PRESETS = ${JSON.stringify(PRESET_DEMOS)};

    let currentMode = 'web';
    let currentPresetKey = '1: UI Flexbox Collision';
    let activeBugReport = PRESETS[currentPresetKey];
    let isShowingPatchedPreview = true;

    // DOM Elements
    const demoSelect = document.getElementById('demo-select');
    const tabWeb = document.getElementById('tab-web');
    const tabSystems = document.getElementById('tab-systems');
    const inputLangBadge = document.getElementById('input-lang-badge');
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const dropzoneEmpty = document.getElementById('dropzone-empty');
    const dropzonePreviewContainer = document.getElementById('dropzone-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const imageTitle = document.getElementById('image-title');
    const btnRemoveImage = document.getElementById('btn-remove-image');
    const inputLogs = document.getElementById('input-logs');
    const inputCode = document.getElementById('input-code');
    const codeStats = document.getElementById('code-stats');
    const btnClearLogs = document.getElementById('btn-clear-logs');
    const btnAnalyze = document.getElementById('btn-analyze');
    const btnAnalyzeText = document.getElementById('btn-analyze-text');
    const reasoningContainer = document.getElementById('reasoning-container');
    const reasoningProgressBar = document.getElementById('reasoning-progress-bar');
    const reasoningPhasePercent = document.getElementById('reasoning-phase-percent');
    const reasoningStepText = document.getElementById('reasoning-step-text');
    const severityBadge = document.getElementById('severity-badge');
    const bugFilename = document.getElementById('bug-filename');
    const bugCategory = document.getElementById('bug-category');
    const bugConfidence = document.getElementById('bug-confidence');
    const bugFixTime = document.getElementById('bug-fixtime');
    const bugRootCause = document.getElementById('bug-rootcause');
    const bugRemedy = document.getElementById('bug-remedy');
    const diffContainer = document.getElementById('diff-container');
    const diffStats = document.getElementById('diff-stats');
    const btnCopyPatch = document.getElementById('btn-copy-patch');
    const btnCopyText = document.getElementById('btn-copy-text');
    const btnApplyPatch = document.getElementById('btn-apply-patch');
    const verificationTitle = document.getElementById('verification-title');
    const uiPreviewControls = document.getElementById('ui-preview-controls');
    const btnTogglePatched = document.getElementById('btn-toggle-patched');
    const btnToggleBuggy = document.getElementById('btn-toggle-buggy');
    const iframeContainer = document.getElementById('iframe-container');
    const sandboxIframe = document.getElementById('sandbox-iframe');
    const systemsContainer = document.getElementById('systems-container');
    const memoryTableBody = document.getElementById('memory-table-body');
    const traceStepsContainer = document.getElementById('trace-steps-container');
    const btnExportStandalone = document.getElementById('btn-export-standalone');

    // Initialize Lucide icons
    function refreshIcons() {
      if (window.lucide) {
        lucide.createIcons();
      }
    }

    // Line by Line Diff Engine
    function computeDiff(original, patched) {
      const origLines = original.split('\\n');
      const patchLines = patched.split('\\n');
      const m = origLines.length;
      const n = patchLines.length;
      const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          if (origLines[i] === patchLines[j]) {
            dp[i + 1][j + 1] = dp[i][j] + 1;
          } else {
            dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
          }
        }
      }

      let i = m;
      let j = n;
      const raw = [];

      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && origLines[i - 1] === patchLines[j - 1]) {
          raw.push({ type: 'unchanged', origNum: i, patchNum: j, content: origLines[i - 1] });
          i--;
          j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
          raw.push({ type: 'added', patchNum: j, content: patchLines[j - 1] });
          j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
          raw.push({ type: 'removed', origNum: i, content: origLines[i - 1] });
          i--;
        }
      }

      const lines = raw.reverse();
      let additions = 0;
      let deletions = 0;
      lines.forEach(l => {
        if (l.type === 'added') additions++;
        if (l.type === 'removed') deletions++;
      });

      return { lines, stats: { additions, deletions, totalLines: lines.length } };
    }

    function renderDiff(original, patched) {
      const diff = computeDiff(original, patched);
      diffStats.innerHTML = '<span class="text-emerald-400">+' + diff.stats.additions + '</span> / <span class="text-rose-400">-' + diff.stats.deletions + '</span>';

      diffContainer.innerHTML = '';
      diff.lines.forEach((line) => {
        const row = document.createElement('div');
        row.className = 'flex items-start gap-2 py-0.5 px-2 rounded font-mono text-[11px] leading-tight select-text ';
        
        let prefix = ' ';
        let numText = (line.origNum || ' ') + ' ' + (line.patchNum || ' ');
        if (line.type === 'added') {
          row.className += 'bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-500';
          prefix = '+';
        } else if (line.type === 'removed') {
          row.className += 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500 line-through opacity-75';
          prefix = '-';
        } else {
          row.className += 'text-slate-400 hover:bg-slate-900/40';
        }

        const gutter = document.createElement('span');
        gutter.className = 'w-12 shrink-0 text-[10px] text-slate-500 text-right select-none';
        gutter.textContent = (line.origNum || '') + ' ' + (line.patchNum || '');

        const sign = document.createElement('span');
        sign.className = 'w-3 shrink-0 font-bold select-none ' + (line.type === 'added' ? 'text-emerald-400' : line.type === 'removed' ? 'text-rose-400' : 'text-slate-600');
        sign.textContent = prefix;

        const codeSpan = document.createElement('span');
        codeSpan.className = 'flex-1 whitespace-pre-wrap break-all';
        codeSpan.textContent = line.content;

        row.appendChild(gutter);
        row.appendChild(sign);
        row.appendChild(codeSpan);
        diffContainer.appendChild(row);
      });
    }

    function updateCodeStats() {
      const lines = inputCode.value.split('\\n').length;
      codeStats.textContent = lines + ' lines';
    }

    // Load preset into UI
    function loadPreset(presetKey) {
      const data = PRESETS[presetKey];
      if (!data) return;
      activeBugReport = data;
      currentPresetKey = presetKey;
      demoSelect.value = presetKey;

      // Set mode
      setMode(data.mode);

      // Populate inputs
      inputLogs.value = data.logs;
      inputCode.value = data.buggyCode;
      updateCodeStats();

      // Populate mock image
      if (data.mockImageUrl) {
        imagePreview.src = data.mockImageUrl;
        imageTitle.textContent = data.mockImageTitle || 'Screenshot Artifact';
        dropzoneEmpty.classList.add('hidden');
        dropzonePreviewContainer.classList.remove('hidden');
      } else {
        dropzoneEmpty.classList.remove('hidden');
        dropzonePreviewContainer.classList.add('hidden');
      }

      // Populate outputs
      severityBadge.textContent = data.severity;
      if (data.severity === 'CRITICAL') {
        severityBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/40';
      } else if (data.severity === 'HIGH') {
        severityBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/40';
      } else {
        severityBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/40';
      }

      bugFilename.textContent = data.filename;
      bugCategory.textContent = data.category;
      bugConfidence.textContent = data.confidence + '%';
      bugFixTime.textContent = data.estimatedFixTime;
      bugRootCause.textContent = data.rootCause;
      bugRemedy.textContent = data.remedySummary;

      renderDiff(data.buggyCode, data.patchedCode);
      updateVerificationPanel();
      refreshIcons();
    }

    function setMode(mode) {
      currentMode = mode;
      if (mode === 'web') {
        tabWeb.className = 'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition border border-indigo-500/50 bg-indigo-500/10 text-indigo-300 shadow-sm shadow-indigo-500/10';
        tabSystems.className = 'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent';
        inputLangBadge.textContent = 'HTML / CSS / JS';
        verificationTitle.textContent = 'Dynamic Sandboxed UI Verification';
        uiPreviewControls.classList.remove('hidden');
        iframeContainer.classList.remove('hidden');
        systemsContainer.classList.add('hidden');
      } else {
        tabSystems.className = 'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/10';
        tabWeb.className = 'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent';
        inputLangBadge.textContent = activeBugReport.language.toUpperCase() + ' / Systems';
        verificationTitle.textContent = 'Hardware Memory & Instruction Trace';
        uiPreviewControls.classList.add('hidden');
        iframeContainer.classList.add('hidden');
        systemsContainer.classList.remove('hidden');
      }
      updateVerificationPanel();
      refreshIcons();
    }

    function updateVerificationPanel() {
      if (currentMode === 'web') {
        const htmlContent = isShowingPatchedPreview
          ? (activeBugReport.interactivePatchedHtml || activeBugReport.patchedCode)
          : (activeBugReport.interactiveBuggyHtml || activeBugReport.buggyCode);
        
        sandboxIframe.srcdoc = htmlContent;
        if (isShowingPatchedPreview) {
          btnTogglePatched.className = 'px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
          btnToggleBuggy.className = 'px-2 py-0.5 rounded text-[10px] font-semibold text-slate-400 hover:text-slate-200 bg-slate-800';
        } else {
          btnToggleBuggy.className = 'px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40';
          btnTogglePatched.className = 'px-2 py-0.5 rounded text-[10px] font-semibold text-slate-400 hover:text-slate-200 bg-slate-800';
        }
      } else {
        // Systems mode: Populate memory table
        const registers = activeBugReport.memoryRegisters || [];
        memoryTableBody.innerHTML = '';
        registers.forEach(reg => {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-slate-900/60';
          const statusClass = reg.status === 'VIOLATION' ? 'text-rose-400 bg-rose-500/10' : reg.status === 'SAFE' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10';
          tr.innerHTML = '<td class="p-2 font-bold text-slate-200">' + reg.name + '</td>' +
            '<td class="p-2 text-slate-400">' + reg.address + '</td>' +
            '<td class="p-2 text-rose-300 font-semibold">' + reg.buggyValue + '</td>' +
            '<td class="p-2 text-emerald-300 font-semibold">' + reg.patchedValue + '</td>' +
            '<td class="p-2"><span class="px-2 py-0.5 rounded text-[9px] font-bold ' + statusClass + '">' + reg.status + '</span></td>';
          memoryTableBody.appendChild(tr);
        });

        // Trace steps
        const steps = activeBugReport.executionTrace || [];
        traceStepsContainer.innerHTML = '';
        steps.forEach(step => {
          const div = document.createElement('div');
          const badgeClass = step.state === 'FAULT' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                             step.state === 'RECOVERED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                             step.state === 'WARN' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                             'bg-slate-800 text-slate-300 border-slate-700';
          div.className = 'flex items-center gap-2 p-1.5 rounded bg-slate-900 border border-slate-800/80';
          div.innerHTML = '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold border ' + badgeClass + '">#' + step.step + ' ' + step.state + '</span>' +
            '<span class="text-slate-200 font-bold">' + step.instruction + '</span>' +
            '<span class="text-slate-500 text-[9px]">(' + step.location + ')</span>' +
            '<span class="text-slate-400 ml-auto text-[9px] truncate max-w-[200px]">' + step.detail + '</span>';
          traceStepsContainer.appendChild(div);
        });
      }
    }

    // Trigger analysis with multi-step reasoning animation
    function triggerAnalysis() {
      btnAnalyze.disabled = true;
      btnAnalyzeText.textContent = 'Reasoning in progress...';
      reasoningContainer.classList.remove('hidden');

      const steps = [
        { progress: 20, text: '1. Ingesting visual artifacts & OCR telemetry...' },
        { progress: 45, text: '2. Parsing AST structure & control flow graphs...' },
        { progress: 70, text: '3. Detecting memory violation & CSS collision bounds...' },
        { progress: 90, text: '4. Synthesizing minimal non-breaking refactor patch...' },
        { progress: 100, text: '5. Verification simulation passed! Invariant proofs satisfied.' },
      ];

      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < steps.length) {
          const current = steps[stepIndex];
          reasoningProgressBar.style.width = current.progress + '%';
          reasoningPhasePercent.textContent = current.progress + '%';
          reasoningStepText.textContent = current.text;
          stepIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            btnAnalyze.disabled = false;
            btnAnalyzeText.textContent = 'Analyze & Fix Bug';
            reasoningContainer.classList.add('hidden');
            renderDiff(inputCode.value, activeBugReport.patchedCode);
            isShowingPatchedPreview = true;
            updateVerificationPanel();
            refreshIcons();
          }, 400);
        }
      }, 350);
    }

    // Event Listeners
    demoSelect.addEventListener('change', (e) => loadPreset(e.target.value));
    tabWeb.addEventListener('click', () => {
      setMode('web');
      if (currentPresetKey !== '1: UI Flexbox Collision') {
        loadPreset('1: UI Flexbox Collision');
      }
    });
    tabSystems.addEventListener('click', () => {
      setMode('systems');
      if (currentPresetKey === '1: UI Flexbox Collision') {
        loadPreset('2: C++ Pointer Segfault');
      }
    });

    btnTogglePatched.addEventListener('click', () => {
      isShowingPatchedPreview = true;
      updateVerificationPanel();
    });
    btnToggleBuggy.addEventListener('click', () => {
      isShowingPatchedPreview = false;
      updateVerificationPanel();
    });

    btnAnalyze.addEventListener('click', triggerAnalysis);
    btnClearLogs.addEventListener('click', () => { inputLogs.value = ''; });
    inputCode.addEventListener('input', updateCodeStats);

    btnCopyPatch.addEventListener('click', () => {
      navigator.clipboard.writeText(activeBugReport.patchedCode);
      btnCopyText.textContent = 'Copied!';
      setTimeout(() => { btnCopyText.textContent = 'Copy Patch'; }, 2000);
    });

    btnApplyPatch.addEventListener('click', () => {
      inputCode.value = activeBugReport.patchedCode;
      updateCodeStats();
      renderDiff(activeBugReport.buggyCode, activeBugReport.patchedCode);
    });

    // Image Upload & Paste
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          imagePreview.src = event.target.result;
          imageTitle.textContent = file.name;
          dropzoneEmpty.classList.add('hidden');
          dropzonePreviewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      }
    });

    btnRemoveImage.addEventListener('click', (e) => {
      e.stopPropagation();
      imagePreview.src = '';
      dropzonePreviewContainer.classList.add('hidden');
      dropzoneEmpty.classList.remove('hidden');
      fileInput.value = '';
    });

    window.addEventListener('paste', (e) => {
      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imageTitle.textContent = 'Pasted Screenshot (' + new Date().toLocaleTimeString() + ')';
            dropzoneEmpty.classList.add('hidden');
            dropzonePreviewContainer.classList.remove('hidden');
          };
          reader.readAsDataURL(blob);
          break;
        }
      }
    });

    // Export Standalone Single-File HTML download
    btnExportStandalone.addEventListener('click', () => {
      const htmlContent = document.documentElement.outerHTML;
      const blob = new Blob(['<!DOCTYPE html>\\n' + htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BugSnap-Universal-AI-Debugger.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // Initial Load
    loadPreset('1: UI Flexbox Collision');
  </script>
</body>
</html>`;
}
