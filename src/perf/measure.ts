// A tiny harness to capture render cost around an interaction, so "it's slow"
// becomes a number. Wrap the table in React's <Profiler> and log each commit.

export interface Sample {
  label: string;       // "scroll" | "filter-keystroke" | "approve"
  actualMs: number;    // the commit's actualDuration from the Profiler
  rowCount: number;
}

const FRAME_BUDGET_MS = 16; // ~60fps; a commit over this drops a frame

const samples: Sample[] = [];

export function record(label: string, actualMs: number, rowCount: number): void {
  samples.push({ label, actualMs, rowCount });
}

// Summarize: worst commit per label, and whether it blew the frame budget.
export function summary() {
  const byLabel: Record<string, { worstMs: number; overBudget: boolean; rowCount: number }> = {};
  for (const s of samples) {
    const cur = byLabel[s.label];
    if (!cur || s.actualMs > cur.worstMs) {
      byLabel[s.label] = { worstMs: s.actualMs, overBudget: s.actualMs > FRAME_BUDGET_MS, rowCount: s.rowCount };
    }
  }
  return byLabel;
}
