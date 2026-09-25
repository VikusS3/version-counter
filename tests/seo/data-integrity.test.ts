import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listFiles } from "./helpers";

const root = process.cwd();
const games = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "games.json"), "utf8")) as {
  games: Array<{ href: string }>;
};
const blogFiles = listFiles(path.join(root, "src", "content", "blog"), ".md");
const englishSlugs = new Set(
  blogFiles
    .filter((file) => file.includes(`${path.sep}en${path.sep}`))
    .map((file) => path.basename(file, ".md")),
);
const spanishSlugs = new Set(
  blogFiles
    .filter((file) => file.includes(`${path.sep}es${path.sep}`))
    .map((file) => path.basename(file, ".md")),
);

describe("content data integrity", () => {
  it("has a game page for every configured game", () => {
    for (const game of games.games) {
      const slug = game.href.replace(/^\/+|\/+$/g, "");
      expect(fs.existsSync(path.join(root, "src", "pages", "games", `${slug}.astro`)), slug).toBe(true);
      expect(fs.existsSync(path.join(root, "src", "pages", "es", "games", `${slug}.astro`)), slug).toBe(true);
    }
  });

  it("keeps English and Spanish blog slugs paired", () => {
    expect([...englishSlugs].sort()).toEqual([...spanishSlugs].sort());
    expect(englishSlugs.size).toBeGreaterThan(0);
  });
});
