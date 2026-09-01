import React from "react";
import { tokens } from "./tokens";

// One status badge, used everywhere a status appears. Defined ONCE so every
// "flagged" looks identical and a color change happens in tokens, not 40 files.
// Memoized: it only re-renders when its status prop actually changes.
export const Badge = React.memo(function Badge({ status }: { status: keyof typeof tokens.color }) {
  return (
    <span
      style={{
        color: tokens.color[status],
        border: `1px solid ${tokens.color[status]}`,
        borderRadius: tokens.radius,
        padding: `0 ${tokens.space.sm}px`,
        fontSize: 12,
      }}
    >
      {status}
    </span>
  );
});
