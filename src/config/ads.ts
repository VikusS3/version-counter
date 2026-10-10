/**
 * Central Monetag configuration.
 *
 * The Multitag below is installed as a STATIC tag right after <head> in
 * `src/layouts/Layout.astro` (Monetag verification reads raw HTML, so it
 * cannot be injected by consent-gated JS). It loads on every visit; only
 * Google Analytics stays gated behind cookie consent.
 *
 * Intrusiveness policy (medium): counters stay fully visible, max 2 ad
 * slots per view, always below the fold / after the main content.
 * Tune frequency caps and delays in the Monetag dashboard.
 *
 * Activation flow:
 * 1. `public/sw.js` must be served at `/sw.js` (site verification).
 * 2. Static tag in Layout head (done).
 * 3. Set `MONETAG_ENABLED = true` only if banner zones are created to fill
 *    the `MonetagSlot` placeholders (home / games / blog).
 *
 * Until then every slot renders nothing (no empty boxes, no CLS).
 */

export const MONETAG_ENABLED = false;

/**
 * Monetag Multitag given after site verification.
 * Mirrored as a static tag in `src/layouts/Layout.astro` (keep in sync).
 */
export const MONETAG_TAG_SRC = "https://quge5.com/88/tag.min.js";
export const MONETAG_TAG_ZONE = "293766";

/** Zone id from `public/sw.js` (push / in-page push worker). */
export const MONETAG_ZONE_ID = 12000970;

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
