import { describe, expect, it } from "vitest";
import {
  buildAlternates,
  buildBreadcrumbs,
  normalizePath,
  robotsContent,
  switchLocale,
} from "./seo";

const site = new URL("https://gachacountdown.online/");

describe("seo helpers", () => {
  it("normalizes routes to one trailing-slash form", () => {
    expect(normalizePath("/about")).toBe("/about/");
    expect(normalizePath("/about/")).toBe("/about/");
    expect(normalizePath("/es//blog/post")).toBe("/es/blog/post/");
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("/blog/post/index.html")).toBe("/blog/post/");
  });

  it("switches locales without losing the route", () => {
    expect(switchLocale("/blog/post/", "es")).toBe("/es/blog/post/");
    expect(switchLocale("/es/blog/post/", "en")).toBe("/blog/post/");
    expect(switchLocale("/", "es")).toBe("/es/");
  });

  it("builds reciprocal language alternates", () => {
    expect(buildAlternates("/blog/post/", site)).toEqual({
      en: "https://gachacountdown.online/blog/post/",
      es: "https://gachacountdown.online/es/blog/post/",
      "x-default": "https://gachacountdown.online/blog/post/",
    });
  });

  it("builds localized breadcrumbs with contiguous positions", () => {
    const items = buildBreadcrumbs("/es/blog/post/", "es", site);
    expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(items[0].item).toBe("https://gachacountdown.online/es/");
    expect(items[2].item).toBe("https://gachacountdown.online/es/blog/post/");
  });

  it("supports noindex and nofollow directives", () => {
    expect(robotsContent()).toBe("index, follow, max-image-preview:large, max-snippet:-1");
    expect(robotsContent({ noindex: true, nofollow: true })).toBe(
      "noindex, nofollow, max-image-preview:large, max-snippet:-1",
    );
  });
});
