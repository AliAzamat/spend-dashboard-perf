import { useState } from "react";
import { Transaction } from "../data/transactions";

// Optimistic update: flip the row to "approved" in the UI immediately, fire the
// request, and only roll back if it fails. The user never waits on the network
// for the common (success) case — that's perceived performance.
export function useApprove(initial: Transaction[], save: (id: string) => Promise<void>) {
  const [rows, setRows] = useState(initial);

  async function approve(id: string) {
    const prev = rows;
    // 1. Optimistic: update now.
    setRows((rs) => rs.map((t) => (t.id === id ? { ...t, status: "approved" } : t)));
    try {
      // 2. Reconcile: persist in the background.
      await save(id);
    } catch {
      // 3. Roll back: the server said no, so restore the prior state + surface it.
      setRows(prev);
      // (show a toast: "couldn't approve — try again")
    }
  }

  return { rows, approve };
}
