import React from "react";
import { Transaction } from "../data/transactions";

// The naive table: render EVERY row. This is what we're going to prove is slow.
// At 10,000 rows the browser builds 10,000 DOM rows up front and re-renders the
// whole tree on any state change. That's the jank.
export function NaiveTable({ rows }: { rows: Transaction[] }) {
  return (
    <table>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.merchant}</td>
            <td>${(t.amountCents / 100).toFixed(2)}</td>
            <td>{t.category}</td>
            <td>{t.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
