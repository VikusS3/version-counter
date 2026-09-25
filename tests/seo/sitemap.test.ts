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

  it("emits sitemap alternates and no redirect stubs", () => {
    for (const url of locations) {
      const entry = sitemap.split("<url>").find((part) => part.includes(`<loc>${url}</loc>`)) ?? "";
      expect(entry).toContain('hreflang="en"');
      expect(entry).toContain('hreflang="es"');
    }

    expect(sitemap).not.toContain("neverness-to-everness/</loc>");
    expect(sitemap).not.toContain("silver-palace/</loc>");
  });

  it("has no noindex or meta refresh pages in the sitemap", () => {
    for (const { route, html } of htmlForLocations()) {
      expect(getAttribute(html, "meta[name=robots]", "content"), route).not.toContain("noindex");
      expect(html, route).not.toContain("http-equiv=\"refresh\"");
    }
  });
});
