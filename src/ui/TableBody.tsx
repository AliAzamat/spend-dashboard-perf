import React, { useCallback } from "react";
import { Transaction } from "../data/transactions";
import { Row } from "./Row";

export function TableBody({ rows, approve }: { rows: Transaction[]; approve: (id: string) => void }) {
  // Stable: one function identity across renders. Without useCallback, every
  // render makes a NEW onApprove, every Row sees a "changed" prop, and React.memo
  // re-renders all visible rows on every keystroke — the memo silently does nothing.
  const onApprove = useCallback((id: string) => approve(id), [approve]);

  return (
    <>
      {rows.map((t) => (
        <Row key={t.id} t={t} onApprove={onApprove} />
      ))}
    </>
  );
}
