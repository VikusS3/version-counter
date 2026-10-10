/**
 * Central Monetag configuration.
 *
 * Intrusiveness policy (medium): counters stay fully visible, max 2 ad
 * slots per view, always below the fold / after the main content, and
 * everything stays gated behind cookie consent ("accepted").
 *
 * Activation flow:
 * 1. `public/sw.js` must be served at `/sw.js` (site verification).
 * 2. Paste the Monetag head-tag URL into `MONETAG_TAG_SRC` below.
 * 3. Set `ENABLED = true`.
 *
 * Until then every slot renders nothing (no empty boxes, no CLS).
 */

export const MONETAG_ENABLED = false;

/**
 * Monetag Multitag given after site verification.
 * Loaded consent-gated (only after "accepted") via `window.__mtLoadAds()`.
 */
export const MONETAG_TAG_SRC = "https://quge5.com/88/tag.min.js";
export const MONETAG_TAG_ZONE = "293766";

/** Zone id from `public/sw.js` (push / in-page push worker). */
export const MONETAG_ZONE_ID = 12000114;

/** Paths where no ads are ever rendered (legal pages, errors). */
export const ADS_EXCLUDED_PATHS = [
  "/privacy/",
  "/es/privacy/",
  "/terms/",
  "/es/terms/",
  "/contact/",
  "/es/contact/",
  "/404",
  "/404/",
];

/** Never load or render ads in dev / preview builds. */
export const ADS_DISABLED_IN_DEV = import.meta.env.DEV === true;

export function shouldRenderAds(pathname: string): boolean {
  if (!MONETAG_ENABLED) return false;
  if (ADS_DISABLED_IN_DEV) return false;
  if (typeof localStorage !== "undefined") {
    try {
      if (localStorage.getItem("cookie-consent") !== "accepted") return false;
    } catch {
      return false;
    }
  }
  return !ADS_EXCLUDED_PATHS.some((excluded) => pathname.startsWith(excluded));
}
