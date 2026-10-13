# Spend Dashboard Perf

**Building blocks for a transaction table that stays smooth at 10,000+ rows: a hand-written virtual list, memoized rows with stable callbacks, memoized filter/sort, and optimistic approvals.**

This is a compact study of the techniques that keep a data-dense fintech table fast. Each file isolates one idea, with the naive version kept for comparison.

## Techniques

| Technique | File | What it does |
|---|---|---|
| Windowing from scratch | `src/ui/VirtualTable.tsx` | Fixed 36px rows, a full-height spacer for a correct scrollbar, and only the visible slice (plus 6 rows of overscan each side) in the DOM — no library. |
| Naive baseline | `src/ui/NaiveTable.tsx` | Renders every row, so the cost of the problem is easy to measure. |
| Memoized rows | `src/ui/Row.tsx`, `src/ui/TableBody.tsx` | `React.memo` rows paired with a `useCallback` handler; the comments explain why an unstable handler silently defeats memoization. |
| Derived filter/sort | `src/ui/useFilteredRows.ts` | `useMemo` over rows, query, and sort key; copies before sorting so the source array is never mutated. |
| Optimistic updates | `src/ui/useApprove.ts` | Marks a transaction approved immediately, persists in the background, and rolls back on failure. |
| Design tokens | `src/ds/tokens.ts`, `src/ds/Badge.tsx` | Status colors and spacing in one place; a memoized `Badge` used for every status. |
| Measurement harness | `src/perf/measure.ts` | Records Profiler commit times per interaction and flags any over the 16 ms frame budget. |
| Synthetic data | `src/data/transactions.ts` | `makeTransactions(n)` generates a deterministic dataset of any size. |

## Example

```tsx
import { makeTransactions } from "./data/transactions";
import { useApprove } from "./ui/useApprove";
import { useFilteredRows } from "./ui/useFilteredRows";
import { VirtualTable } from "./ui/VirtualTable";

const all = makeTransactions(10_000);

function Dashboard({ query }: { query: string }) {
  const { rows } = useApprove(all, (id) => fetch(`/api/approve/${id}`, { method: "POST" }).then(() => {}));
  const visible = useFilteredRows(rows, query, "amountCents");
  return <VirtualTable rows={visible} height={480} />;
}
```

## Notes

- [TRADEOFFS.md](TRADEOFFS.md) covers what this approach gives up: fixed row heights, client-side filtering, no accessibility pass yet, and per-action rollback.
- [PERFORMANCE.md](PERFORMANCE.md) is a measurement plan with an empty before/after table; no results have been recorded yet.

## Status

Library-style source only. The modules type-check under TypeScript strict mode with React 18, but there's no `package.json`, app entry point, or tests, and nothing wires the pieces into a page.

Known issue: sorting by `"date"` in `useFilteredRows` subtracts ISO date strings, which yields `NaN` and leaves the order unchanged. Comparing with `localeCompare` (or parsed timestamps) would fix it.

[spend-dashboard-performance](https://github.com/AliAzamat/spend-dashboard-performance) is a later, fuller version of this project with library virtualization, a Web Worker, and in-app performance instruments.
