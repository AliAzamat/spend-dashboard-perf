# Proving the speed (before → after)

You measured the naive table at the start. Now measure the optimized one the
same way, so the win is a NUMBER, not a vibe.

## What to record
- **React Profiler commit time** on scroll and on a filter keystroke. Target the
  16ms/frame budget; the virtualized table should sit far under it because it
  commits ~20 rows, not 10,000.
- **INP (Interaction to Next Paint)** — the Web Vital for responsiveness. Click
  Approve and measure: optimistic updates should make it feel instant.
- **Bundle / mount time** — the table mounts in constant time regardless of row
  count, because it never builds 10,000 DOM nodes.

## The before → after table (fill in your real numbers)
| Metric                | Naive (10k rows) | Optimized |
|-----------------------|------------------|-----------|
| Scroll commit (ms)    |  (your baseline) | (yours)   |
| Filter keystroke (ms) |  (your baseline) | (yours)   |
| Approve feels         |  waits on network| instant   |
