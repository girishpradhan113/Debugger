import React, { useRef, useState, useEffect } from 'react';
import {
  FileInput,
  Image as ImageIcon,
  UploadCloud,
  Check,
  Trash2,
  Terminal,
  Code2,
  Sparkles,
  Loader2,
  Maximize2,
  X,
} from 'lucide-react';
import { DebuggerMode } from '../types/debugger';

interface InputPanelProps {
  mode: DebuggerMode;
  language: string;
  code: string;
  logs: string;
  imageUrl: string;
  imageTitle: string;
  isAnalyzing: boolean;
  reasoningPhase: number;
  reasoningText: string;
  onCodeChange: (newCode: string) => void;
  onLogsChange: (newLogs: string) => void;
  onImageChange: (url: string, title: string) => void;
  onRemoveImage: () => void;
  onAnalyze: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  mode,
  language,
  code,
  logs,
  imageUrl,
  imageTitle,
  isAnalyzing,
  reasoningPhase,
  reasoningText,
  onCodeChange,
  onLogsChange,
  onImageChange,
  onRemoveImage,
  onAnalyze,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Global paste handler for screenshots
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                onImageChange(
                  event.target.result as string,
                  `Pasted Screenshot (${new Date().toLocaleTimeString()})`
                );
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onImageChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageChange(event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const codeLineCount = code.split('\n').length;

  return (
    <section className="flex flex-col gap-3.5 bg-slate-900/60 border border-slate-800/90 rounded-2xl p-4 shadow-xl">
      {/* Workspace Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileInput className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
            Multimodal Input Workspace
          </h2>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-800 text-indigo-300 border border-slate-700">
          {language.toUpperCase()} &bull; {mode === 'web' ? 'Layout' : 'Systems'}
        </span>
      </div>

      {/* 1. Image Dropzone / Canvas Upload */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Visual Artifact (Screenshot / Terminal Stack / UI Collision)</span>
          </label>
          <span className="text-[10px] text-slate-400">Paste (Ctrl+V) or Drag &amp; Drop</span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !imageUrl && fileInputRef.current?.click()}
          className={`relative group border-2 border-dashed rounded-xl transition p-3 flex flex-col items-center justify-center min-h-[110px] ${
            isDragging
              ? 'border-indigo-400 bg-indigo-950/20'
              : 'border-slate-700/80 hover:border-indigo-500/80 bg-slate-950/60'
          } ${!imageUrl ? 'cursor-pointer' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!imageUrl ? (
            <div className="flex flex-col items-center text-center">
              <UploadCloud className="w-7 h-7 text-slate-500 group-hover:text-indigo-400 transition mb-1" />
              <p className="text-xs text-slate-300 font-medium">
                Click to browse, drop screenshot, or press{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-indigo-300 border border-slate-700">
                  Ctrl+V
                </kbd>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Captures UI collision, compiler crash logs, or terminal fault frames
              </p>
            </div>
          ) : (
            <div className="w-full flex items-center gap-3">
              <div className="relative group/thumb cursor-pointer" onClick={() => setShowImageModal(true)}>
                <img
                  src={imageUrl}
                  alt="Visual Artifact"
                  className="h-20 max-w-[150px] object-cover rounded-lg border border-slate-700 shadow-md group-hover/thumb:opacity-80 transition"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition bg-black/40 rounded-lg">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{imageTitle}</p>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
                  <Check className="w-3 h-3" /> Artifact loaded for visual AI reasoning
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowImageModal(true)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" /> View Large
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveImage();
                    }}
                    className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Console / Terminal Log Textarea */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="input-logs-area" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Console / Terminal Logs / Stack Traces</span>
          </label>
          <button
            type="button"
            onClick={() => onLogsChange('')}
            className="text-[10px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            Clear
          </button>
        </div>
        <textarea
          id="input-logs-area"
          value={logs}
          onChange={(e) => onLogsChange(e.target.value)}
          placeholder="Paste runtime stack traces, compiler errors, or browser console warnings..."
          className="w-full h-24 p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-amber-500/60 focus:outline-none text-xs text-amber-200/90 font-mono resize-y leading-relaxed"
        />
      </div>

      {/* 3. Source Code Editor Textarea */}
      <div className="flex-1 flex flex-col min-h-[220px]">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="input-code-area" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Source Code Editor</span>
          </label>
          <span className="text-[10px] text-slate-400 font-mono">
            {codeLineCount} lines &bull; {code.length} chars
          </span>
        </div>
        <div className="relative flex-1 flex flex-col">
          <textarea
            id="input-code-area"
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            placeholder="Paste buggy source code..."
            className="w-full flex-1 min-h-[190px] p-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-indigo-500/60 focus:outline-none text-xs text-slate-200 font-mono resize-y leading-relaxed"
          />
        </div>
      </div>

      {/* 4. Primary Action Button with Loading Steps */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 hover:from-indigo-500 hover:via-blue-500 hover:to-emerald-500 transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Synthesizing Fix &amp; Generating Invariant Proofs...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze &amp; Fix Bug</span>
            </>
          )}
        </button>

        {/* Loading Reasoning Steps Progress */}
        {isAnalyzing && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-indigo-500/30">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-indigo-300 font-semibold flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                Gemini Reasoning Pipeline:
              </span>
              <span className="text-slate-400 font-mono text-[10px]">{reasoningPhase}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${reasoningPhase}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 font-mono animate-pulse">
              {reasoningText}
            </p>
          </div>
        )}
      </div>

      {/* Modal for Viewing Full Visual Artifact */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-4 max-w-3xl w-full max-h-[90vh] flex flex-col gap-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-200">{imageTitle}</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-slate-950 rounded-xl">
              <img src={imageUrl} alt="Artifact Large" className="max-h-[70vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
