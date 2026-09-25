import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getLinks, listHtmlFiles, readPage, routeFromFile } from "./helpers";

const root = process.cwd();
const dist = path.join(root, "dist");

function targetFile(href: string): string | null {
  const clean = href.split(/[?#]/, 1)[0];
  if (!clean || clean === "/") return path.join(dist, "index.html");
  if (!clean.endsWith("/")) return null;
  return path.join(dist, clean.slice(1), "index.html");
}

describe("internal links", () => {
  it("uses canonical slash URLs and existing page targets", () => {
    const badTargets: string[] = [];
    const badSlash: string[] = [];

    for (const file of listHtmlFiles()) {
      const route = routeFromFile(file);
      const html = readPage(file);
      for (const href of getLinks(html)) {
        if (!href.startsWith("/") || href.startsWith("//")) continue;
        const clean = href.split(/[?#]/, 1)[0];
        if (clean !== "/" && !clean.endsWith("/")) badSlash.push(`${route} -> ${href}`);
        const target = targetFile(clean);
        if (target && !fs.existsSync(target)) badTargets.push(`${route} -> ${href}`);
      }
    }

    expect(badSlash, badSlash.join("\n")).toEqual([]);
    expect(badTargets, badTargets.join("\n")).toEqual([]);
  });

  it("keeps the Spanish releases index in Spanish", () => {
    const file = path.join(dist, "es", "releases", "index.html");
    const html = fs.readFileSync(file, "utf8");
    expect(html).toContain('href="/es/releases/ananta/"');
    expect(html).not.toContain('href="/releases/ananta/"');
  });
});
