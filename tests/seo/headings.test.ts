import { describe, expect, it } from "vitest";
import { getHeadings, listHtmlFiles, readPage, routeFromFile } from "./helpers";

const pages = listHtmlFiles().map((file) => ({ file, route: routeFromFile(file), html: readPage(file) }));

describe("heading structure", () => {
  it("has exactly one non-empty H1 per page", () => {
    for (const { route, html } of pages) {
      const headings = getHeadings(html);
      const h1s = headings.filter((heading) => heading.level === 1);
      expect(h1s.length, route).toBe(1);
      expect(h1s[0].text.length, route).toBeGreaterThan(0);
    }
  });

  it("does not skip heading levels", () => {
    for (const { route, html } of pages) {
      const headings = getHeadings(html);
      headings.reduce((previousLevel, heading) => {
        expect(heading.level, route).toBeLessThanOrEqual(previousLevel + 1);
        return heading.level;
      }, 1);
    }
  });
});
