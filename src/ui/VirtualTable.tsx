import React, { useState } from "react";
import { Transaction } from "../data/transactions";

const ROW_H = 36;      // fixed row height makes the math simple and fast
const OVERSCAN = 6;    // render a few extra above/below to avoid blank edges

// Render only the rows visible in the scroll viewport. The total height is
// faked with a spacer so the scrollbar is correct, but the DOM holds ~20 rows
// no matter how many transactions exist. THIS is what makes it scale.
export function VirtualTable({ rows, height = 480 }: { rows: Transaction[]; height?: number }) {
  const [scrollTop, setScrollTop] = useState(0);

  const total = rows.length * ROW_H;
  const first = Math.max(0, Math.floor(scrollTop / ROW_H) - OVERSCAN);
  const visibleCount = Math.ceil(height / ROW_H) + OVERSCAN * 2;
  const slice = rows.slice(first, first + visibleCount);

  return (
    <div
      style={{ height, overflowY: "auto", position: "relative" }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
    >
      {/* Spacer: gives the scroll container the full height of all rows. */}
      <div style={{ height: total, position: "relative" }}>
        {slice.map((t, i) => (
          <div
            key={t.id}
            style={{ position: "absolute", top: (first + i) * ROW_H, height: ROW_H, left: 0, right: 0 }}
          >
            <span>{t.date}</span> · <span>{t.merchant}</span> ·{" "}
            <span>${(t.amountCents / 100).toFixed(2)}</span> · <span>{t.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
