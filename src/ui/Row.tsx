import React from "react";
import { Transaction } from "../data/transactions";
import { Badge } from "../ds/Badge";

// One row. Memoized so it only re-renders when ITS transaction or handler
// changes. But memo compares props by identity — so the handler passed in MUST
// be referentially stable, or this memo does nothing.
export const Row = React.memo(function Row({
  t, onApprove,
}: {
  t: Transaction;
  onApprove: (id: string) => void;
}) {
  return (
    <div className="row">
      <span>{t.date}</span>
      <span>{t.merchant}</span>
      <span>${(t.amountCents / 100).toFixed(2)}</span>
      <span>{t.category}</span>
      <Badge status={t.status} />
      {t.status !== "approved" && <button onClick={() => onApprove(t.id)}>Approve</button>}
    </div>
  );
});
