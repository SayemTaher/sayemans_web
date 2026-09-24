// Global loader behaviour (the bouncing SAYEMANS overlay).
export const loaderConfig = {
  /** Only show the overlay if loading takes longer than this (avoids flashes). */
  showAfterMs: 350,
  /** Once shown, keep it at least this long so it never flickers. */
  minVisibleMs: 700,
  /** Give up after this long: send the visitor home (or reload once if already home). */
  timeoutMs: 12000,
};
