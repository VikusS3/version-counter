import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAttribute, listHtmlFiles, readPage, routeFromFile } from "./helpers";

const root = process.cwd();
const sitemapPath = path.join(root, "dist", "sitemap-0.xml");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const locationSet = new Set(locations);

function htmlForLocations() {
  return listHtmlFiles()
    .filter((file) => routeFromFile(file) !== "/404.html")
    .map((file) => ({ file, route: routeFromFile(file), html: readPage(file) }));
}

describe("sitemap and canonical URLs", () => {
  it("contains only canonical indexable routes", () => {
    const robots = fs.readFileSync(path.join(root, "dist", "robots.txt"), "utf8");
    expect(robots).toContain("https://gachacountdown.online/sitemap-index.xml");
    expect(fs.existsSync(path.join(root, "dist", "sitemap-index.xml"))).toBe(true);
    expect(fs.existsSync(path.join(root, "dist", "sitemap.xml"))).toBe(true);
    expect(locations.length).toBeGreaterThan(0);
    expect([...locationSet].some((url) => /releases\/(neverness-to-everness|silver-palace)/.test(url))).toBe(false);
    expect([...locationSet].every((url) => new URL(url).pathname.endsWith("/"))).toBe(true);
  });

  it("matches every generated page canonical", () => {
    for (const { route, html } of htmlForLocations()) {
      const canonical = getAttribute(html, "link[rel=canonical]", "href");
      expect(canonical, `missing canonical for ${route}`).toBeTruthy();
      const canonicalUrl = canonical as string;
      expect(locationSet.has(canonicalUrl), `canonical not in sitemap for ${route}`).toBe(true);
      expect(new URL(canonicalUrl).pathname.endsWith("/")).toBe(true);
    }
  });

  it("emits complete sitemap alternates (en, es, x-default) and no redirect stubs", () => {
    for (const url of locations) {
      const entry = sitemap.split("<url>").find((part) => part.includes(`<loc>${url}</loc>`)) ?? "";
      expect(entry, `missing hreflang="en" for ${url}`).toContain('hreflang="en"');
      expect(entry, `missing hreflang="es" for ${url}`).toContain('hreflang="es"');
      expect(entry, `missing hreflang="x-default" for ${url}`).toContain('hreflang="x-default"');
    }

    expect(sitemap).not.toContain("neverness-to-everness/</loc>");
    expect(sitemap).not.toContain("silver-palace/</loc>");
  });

  it("includes valid lastmod, changefreq, and priority tags for every location", () => {
    const validFreqs = new Set(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]);
    const now = Date.now() + 60_000; // allow small clock drift

    for (const url of locations) {
      const entry = sitemap.split("<url>").find((part) => part.includes(`<loc>${url}</loc>`)) ?? "";

      // Validate lastmod
      const lastmodMatch = entry.match(/<lastmod>([^<]+)<\/lastmod>/);
      expect(lastmodMatch, `missing lastmod for ${url}`).toBeTruthy();
      const date = new Date(lastmodMatch![1]);
      expect(isNaN(date.getTime()), `invalid lastmod date for ${url}: ${lastmodMatch![1]}`).toBe(false);
      expect(date.getTime(), `future lastmod date for ${url}`).toBeLessThanOrEqual(now);

      // Validate changefreq
      const changefreqMatch = entry.match(/<changefreq>([^<]+)<\/changefreq>/);
      expect(changefreqMatch, `missing changefreq for ${url}`).toBeTruthy();
      expect(validFreqs.has(changefreqMatch![1]), `invalid changefreq for ${url}`).toBe(true);

      // Validate priority
      const priorityMatch = entry.match(/<priority>([^<]+)<\/priority>/);
      expect(priorityMatch, `missing priority for ${url}`).toBeTruthy();
      const priorityVal = parseFloat(priorityMatch![1]);
      expect(priorityVal).toBeGreaterThanOrEqual(0.0);
      expect(priorityVal).toBeLessThanOrEqual(1.0);
    }
  });

  it("has no noindex or meta refresh pages in the sitemap", () => {
    for (const { route, html } of htmlForLocations()) {
      expect(getAttribute(html, "meta[name=robots]", "content"), route).not.toContain("noindex");
      expect(html, route).not.toContain("http-equiv=\"refresh\"");
    }
  });
});
