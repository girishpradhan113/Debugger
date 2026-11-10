export type DebuggerMode = 'web' | 'systems';

export type BugSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  originalLineNumber?: number;
  patchedLineNumber?: number;
  content: string;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  totalLines: number;
}

export interface MemoryRegister {
  name: string;
  address: string;
  buggyValue: string;
  patchedValue: string;
  status: 'SAFE' | 'VIOLATION' | 'MUTATED';
  description: string;
}

export interface TraceStep {
  step: number;
  instruction: string;
  location: string;
  state: 'NORMAL' | 'WARN' | 'FAULT' | 'RECOVERED';
  detail: string;
}

export interface BugReport {
  id: string;
  title: string;
  filename: string;
  language: string;
  mode: DebuggerMode;
  severity: BugSeverity;
  category: string;
  confidence: number; // e.g. 99.4%
  estimatedFixTime: string;
  rootCause: string;
  remedySummary: string;
  buggyCode: string;
  patchedCode: string;
  logs: string;
  mockImageUrl: string;
  mockImageTitle: string;
  interactiveBuggyHtml?: string;
  interactivePatchedHtml?: string;
  memoryRegisters?: MemoryRegister[];
  executionTrace?: TraceStep[];
}
