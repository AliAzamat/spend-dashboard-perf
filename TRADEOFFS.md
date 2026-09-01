# What this dashboard does well — and the trade-offs

## Holds up
- **Virtualized rendering**: constant DOM cost; 10k+ rows stay at 60fps.
- **Design tokens + memoized primitives**: consistency and cheap rows together.
- **Derived, memoized filter/sort**: instant interaction, one source of truth.
- **Optimistic updates**: actions feel immediate; honest rollback on failure.
- **Measured**: every claim is backed by a Profiler/Web-Vital number.

## Trade-offs made (and what's next)
- **Fixed-height rows.** Simple, fast windowing — but variable-height content
  (expandable rows, wrapped notes) needs a measured position cache. The next
  rung adds dynamic measurement.
- **Client-side filter/sort.** Fine for thousands of rows in memory; tens of
  thousands or server-truth data needs server-side paging + filtering, with the
  virtual list driving the fetch window.
- **No accessibility pass here.** A real table needs keyboard nav and ARIA rows
  (the a11y prereq) layered on without killing the perf.
- **Optimistic rollback is per-action.** Concurrent edits need conflict handling.

## The honest summary
measure → virtualize → design-system rows → memoized filter/sort → optimistic
updates → prove with numbers. It's a beautiful UI that's fast at scale, with its
trade-offs named. That's the difference between "I can build a UI" and "I can
build a UI that holds up."
