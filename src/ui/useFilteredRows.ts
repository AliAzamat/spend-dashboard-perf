import { useMemo } from "react";
import { Transaction } from "../data/transactions";

export type SortKey = "date" | "amountCents" | "merchant";

// Filtering and sorting 10k rows on EVERY keystroke is the cost. useMemo makes
// the derived list recompute ONLY when the inputs actually change — not on every
// unrelated re-render. Derive from source; never copy the rows into state.
export function useFilteredRows(
  rows: Transaction[],
  query: string,
  sortKey: SortKey
): Transaction[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? rows.filter((t) => t.merchant.toLowerCase().includes(q) || t.category.includes(q))
      : rows;
    // Copy before sort so we never mutate the source array (a classic bug).
    return [...filtered].sort((a, b) => {
      if (sortKey === "merchant") return a.merchant.localeCompare(b.merchant);
      return (a[sortKey] as number) - (b[sortKey] as number);
    });
  }, [rows, query, sortKey]);
}
