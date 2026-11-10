import { DiffLine, DiffStats } from '../types/debugger';

/**
 * Computes a line-by-line diff between two strings.
 * Uses LCS (Longest Common Subsequence) on line tokens.
 */
export function computeDiff(original: string, patched: string): { lines: DiffLine[]; stats: DiffStats } {
  const origLines = original.split('\n');
  const patchLines = patched.split('\n');

  const m = origLines.length;
  const n = patchLines.length;

  // LCS DP table
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (origLines[i] === patchLines[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Backtrack to form diff
  let i = m;
  let j = n;
  const rawDiff: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === patchLines[j - 1]) {
      rawDiff.push({
        type: 'unchanged',
        originalLineNumber: i,
        patchedLineNumber: j,
        content: origLines[i - 1],
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawDiff.push({
        type: 'added',
        patchedLineNumber: j,
        content: patchLines[j - 1],
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      rawDiff.push({
        type: 'removed',
        originalLineNumber: i,
        content: origLines[i - 1],
      });
      i--;
    }
  }

  const lines = rawDiff.reverse();

  let additions = 0;
  let deletions = 0;

  for (const line of lines) {
    if (line.type === 'added') additions++;
    if (line.type === 'removed') deletions++;
  }

  return {
    lines,
    stats: {
      additions,
      deletions,
      totalLines: lines.length,
    },
  };
}

/**
 * Generates side-by-side rows from unified diff lines for dual-pane viewer.
 */
export interface SideBySideRow {
  left?: {
    lineNum?: number;
    content: string;
    type: 'removed' | 'unchanged';
  };
  right?: {
    lineNum?: number;
    content: string;
    type: 'added' | 'unchanged';
  };
}

export function buildSideBySide(diffLines: DiffLine[]): SideBySideRow[] {
  const rows: SideBySideRow[] = [];
  let i = 0;

  while (i < diffLines.length) {
    const current = diffLines[i];

    if (current.type === 'unchanged') {
      rows.push({
        left: {
          lineNum: current.originalLineNumber,
          content: current.content,
          type: 'unchanged',
        },
        right: {
          lineNum: current.patchedLineNumber,
          content: current.content,
          type: 'unchanged',
        },
      });
      i++;
    } else if (current.type === 'removed') {
      // Look ahead to see if next is added to pair them up
      if (i + 1 < diffLines.length && diffLines[i + 1].type === 'added') {
        const next = diffLines[i + 1];
        rows.push({
          left: {
            lineNum: current.originalLineNumber,
            content: current.content,
            type: 'removed',
          },
          right: {
            lineNum: next.patchedLineNumber,
            content: next.content,
            type: 'added',
          },
        });
        i += 2;
      } else {
        rows.push({
          left: {
            lineNum: current.originalLineNumber,
            content: current.content,
            type: 'removed',
          },
        });
        i++;
      }
    } else if (current.type === 'added') {
      rows.push({
        right: {
          lineNum: current.patchedLineNumber,
          content: current.content,
          type: 'added',
        },
      });
      i++;
    }
  }

  return rows;
}
