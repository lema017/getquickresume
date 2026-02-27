/**
 * Text diff utility for side-by-side comparison with paired word highlighting.
 * Optimized for resume text where structure stays similar but words change.
 */

export interface DiffToken {
  text: string;
  type: 'unchanged' | 'added' | 'removed';
}

export interface PairedDiffEntry {
  original: DiffToken[];
  enhanced: DiffToken[];
}

export interface SideBySideDiff {
  entries: PairedDiffEntry[];
  stats: {
    totalChanges: number;
    wordsChanged: number;
  };
}

/**
 * Compute word-level diff between two strings using LCS algorithm.
 * Returns paired tokens for original and enhanced text.
 */
export function computePairedWordDiff(original: string, enhanced: string): { original: DiffToken[]; enhanced: DiffToken[] } {
  // Handle edge cases
  if (!original && !enhanced) {
    return { original: [], enhanced: [] };
  }
  if (!original) {
    return { 
      original: [], 
      enhanced: [{ text: enhanced, type: 'added' }] 
    };
  }
  if (!enhanced) {
    return { 
      original: [{ text: original, type: 'removed' }], 
      enhanced: [] 
    };
  }
  if (original === enhanced) {
    return { 
      original: [{ text: original, type: 'unchanged' }], 
      enhanced: [{ text: enhanced, type: 'unchanged' }] 
    };
  }

  // Split into words (preserving whitespace for reconstruction)
  const originalWords = original.split(/(\s+)/);
  const enhancedWords = enhanced.split(/(\s+)/);

  // Build LCS table
  const m = originalWords.length;
  const n = enhancedWords.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (originalWords[i - 1] === enhancedWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find diff operations
  const originalTokens: DiffToken[] = [];
  const enhancedTokens: DiffToken[] = [];
  
  let i = m, j = n;
  const origOps: { text: string; type: 'unchanged' | 'removed' }[] = [];
  const enhOps: { text: string; type: 'unchanged' | 'added' }[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && originalWords[i - 1] === enhancedWords[j - 1]) {
      origOps.unshift({ text: originalWords[i - 1], type: 'unchanged' });
      enhOps.unshift({ text: enhancedWords[j - 1], type: 'unchanged' });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      enhOps.unshift({ text: enhancedWords[j - 1], type: 'added' });
      j--;
    } else {
      origOps.unshift({ text: originalWords[i - 1], type: 'removed' });
      i--;
    }
  }

  // Merge consecutive tokens of the same type
  for (const op of origOps) {
    if (originalTokens.length > 0 && originalTokens[originalTokens.length - 1].type === op.type) {
      originalTokens[originalTokens.length - 1].text += op.text;
    } else {
      originalTokens.push({ text: op.text, type: op.type });
    }
  }

  for (const op of enhOps) {
    if (enhancedTokens.length > 0 && enhancedTokens[enhancedTokens.length - 1].type === op.type) {
      enhancedTokens[enhancedTokens.length - 1].text += op.text;
    } else {
      enhancedTokens.push({ text: op.text, type: op.type });
    }
  }

  return { original: originalTokens, enhanced: enhancedTokens };
}

/**
 * Split text into entries (job experiences, etc.) based on double newlines or patterns.
 */
function splitIntoEntries(text: string): string[] {
  // Split by double newline (paragraph breaks)
  const entries = text.split(/\n\s*\n/).map(e => e.trim()).filter(e => e.length > 0);
  return entries;
}

/**
 * Compute side-by-side diff for multi-entry text (like work experience).
 * Pairs each entry from original with corresponding entry in enhanced.
 */
export function computeSideBySideDiff(original: string, enhanced: string): SideBySideDiff {
  const originalEntries = splitIntoEntries(original);
  const enhancedEntries = splitIntoEntries(enhanced);
  
  const entries: PairedDiffEntry[] = [];
  let totalChanges = 0;
  let wordsChanged = 0;

  const maxEntries = Math.max(originalEntries.length, enhancedEntries.length);

  for (let i = 0; i < maxEntries; i++) {
    const origEntry = i < originalEntries.length ? originalEntries[i] : '';
    const enhEntry = i < enhancedEntries.length ? enhancedEntries[i] : '';

    const { original: origTokens, enhanced: enhTokens } = computePairedWordDiff(origEntry, enhEntry);
    
    entries.push({
      original: origTokens,
      enhanced: enhTokens,
    });

    // Count changes
    for (const token of origTokens) {
      if (token.type === 'removed') {
        totalChanges++;
        wordsChanged += token.text.trim().split(/\s+/).length;
      }
    }
    for (const token of enhTokens) {
      if (token.type === 'added') {
        totalChanges++;
      }
    }
  }

  return {
    entries,
    stats: {
      totalChanges,
      wordsChanged,
    },
  };
}

/**
 * Check if two texts have any meaningful differences.
 */
export function hasChanges(original: string, enhanced: string): boolean {
  return original.trim() !== enhanced.trim();
}

// Keep legacy exports for backward compatibility
export interface LineDiff {
  lineNumber: number;
  type: 'unchanged' | 'modified' | 'added' | 'removed';
  tokens: DiffToken[];
  originalLine?: string;
  enhancedLine?: string;
}

export function diffLines(original: string, enhanced: string): LineDiff[] {
  const diff = computeSideBySideDiff(original, enhanced);
  return diff.entries.map((entry, idx) => ({
    lineNumber: idx + 1,
    type: entry.original.some(t => t.type === 'removed') || entry.enhanced.some(t => t.type === 'added') 
      ? 'modified' 
      : 'unchanged',
    tokens: entry.enhanced,
    originalLine: entry.original.map(t => t.text).join(''),
    enhancedLine: entry.enhanced.map(t => t.text).join(''),
  }));
}

export function countChanges(diffs: LineDiff[]): { additions: number; removals: number; modifications: number } {
  let modifications = 0;
  for (const diff of diffs) {
    if (diff.type === 'modified') modifications++;
  }
  return { additions: 0, removals: 0, modifications };
}
