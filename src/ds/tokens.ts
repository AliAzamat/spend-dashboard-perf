// Design tokens: the single source of truth for color/spacing. Components read
// these instead of hardcoding values, so the whole product stays consistent and
// a rebrand is one file. (This is what Ramp's "Ryu" design system does.)
export const tokens = {
  color: {
    text: "#1a1a1a",
    muted: "#6b7280",
    pending: "#b6892b",
    flagged: "#b3261e",
    approved: "#1e7d3a",
    categorized: "#2f6f7d",
  },
  space: { xs: 4, sm: 8, md: 12 },
  radius: 6,
} as const;
