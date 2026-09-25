import { describe, expect, it } from "vitest";
import { getAttribute, getJsonLd, listHtmlFiles, readPage, routeFromFile } from "./helpers";

const pages = listHtmlFiles().map((file) => ({ file, route: routeFromFile(file), html: readPage(file) }));
const indexablePages = pages.filter(({ route }) => route !== "/404.html");

describe("head metadata and structured data", () => {
  it("emits one canonical, matching og:url, and reciprocal alternates", () => {
    for (const { route, html } of indexablePages) {
      const canonical = getAttribute(html, "link[rel=canonical]", "href");
      const ogUrl = getAttribute(html, "meta[property=og:url]", "content");
      const robots = getAttribute(html, "meta[name=robots]", "content");
      const lang = getAttribute(html, "html", "lang");

      expect(canonical, route).toBeTruthy();
      expect(ogUrl, route).toBe(canonical);
      expect(robots, route).not.toContain("noindex");
      expect(["en", "es"], route).toContain(lang);
      expect((html.match(/hreflang=/g) ?? []).length, route).toBe(3);
      expect(html, route).toContain('hreflang="en"');
      expect(html, route).toContain('hreflang="es"');
      expect(html, route).toContain('hreflang="x-default"');
    }
  });

  it("parses every JSON-LD block and has no FAQPage", () => {
    for (const { route, html } of indexablePages) {
      const blocks = getJsonLd(html);
      expect(blocks.length, route).toBeGreaterThan(0);
      for (const block of blocks) {
        expect(block["@context"], route).toBe("https://schema.org");
        expect(JSON.stringify(block), route).not.toContain("FAQPage");
        expect(JSON.stringify(block), route).not.toContain("alternatename");
      }
    }
  });

  it("keeps breadcrumb positions contiguous", () => {
    for (const { route, html } of indexablePages) {
      for (const block of getJsonLd(html)) {
        const graph = Array.isArray(block["@graph"]) ? block["@graph"] : [block];
        for (const node of graph) {
          if (node["@type"] !== "BreadcrumbList") continue;
          const items = node.itemListElement as Array<{ position: number }>;
          items.forEach((item, index) => expect(item.position, route).toBe(index + 1));
        }
      }
    }
  });

  it("marks blog detail pages as articles", () => {
    for (const { route, html } of indexablePages) {
      const isBlogDetail = /^\/(?:es\/)?blog\/[^/]+\/$/.test(route);
      if (!isBlogDetail) continue;
      expect(getAttribute(html, "meta[property=og:type]", "content"), route).toBe("article");
      expect(html, route).toContain("article:published_time");
    }
  });

  it("keeps the 404 page noindex", () => {
    const page = pages.find(({ route }) => route === "/404.html");
    expect(page).toBeTruthy();
    expect(getAttribute(page!.html, "meta[name=robots]", "content")).toContain("noindex");
  });
});
