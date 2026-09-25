import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { describe, expect, it } from "vitest";
import { listFiles, publicPath } from "./helpers";

const root = process.cwd();
const markdownFiles = listFiles(path.join(root, "src", "content", "blog"), ".md");
const sourceFiles = [
  ...markdownFiles,
  path.join(root, "src", "data", "games.json"),
  path.join(root, "src", "data", "releases.json"),
  path.join(root, "src", "data", "banners.ts"),
];
const localReferences = new Set<string>();
const emptyAltReferences: string[] = [];

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  for (const match of source.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const reference = match[1];
    if (reference.startsWith("/") && !reference.startsWith("//")) {
      localReferences.add(reference);
      if (match[0].startsWith("![]")) emptyAltReferences.push(`${file}: ${reference}`);
    }
  }
  for (const match of source.matchAll(/"(?:image|imagen|icon)"\s*:\s*"(\/[^"]+)"/g)) {
    localReferences.add(match[1]);
  }
  for (const match of source.matchAll(/\bimage:\s*(\/[^\s]+)/g)) {
    localReferences.add(match[1]);
  }
}

function readRenderedImages() {
  const rendered = new Map<string, string[]>();
  const dist = path.join(root, "dist");
  if (!fs.existsSync(dist)) return rendered;
  for (const file of listFiles(dist, ".html")) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(/<img[^>]*src="(\/[^"]+)"[^>]*>/gi)) {
      const list = rendered.get(match[1]) ?? [];
      list.push(match[0]);
      rendered.set(match[1], list);
    }
  }
  return rendered;
}

describe("local image assets", () => {
  it("has alt text for every Markdown image", () => {
    expect(emptyAltReferences).toEqual([]);
  });

  it("has every referenced local asset in public", () => {
    const missing = [...localReferences].filter((reference) => !fs.existsSync(publicPath(reference)));
    expect(missing, `Missing assets: ${missing.join(", ")}`).toEqual([]);
  });

  it("adds dimensions to rendered Markdown images", () => {
    const rendered = readRenderedImages();
    const missingDimensions: string[] = [];
    for (const reference of localReferences) {
      if (!fs.existsSync(publicPath(reference))) continue;
      const tags = rendered.get(reference) ?? [];
      if (tags.length === 0) continue;
      if (tags.some((tag) => !/\bwidth="\d+"/.test(tag) || !/\bheight="\d+"/.test(tag))) {
        missingDimensions.push(reference);
      }
    }
    expect(missingDimensions, `Missing dimensions: ${missingDimensions.join(", ")}`).toEqual([]);
  });

  it("uses usable dimensions for character portraits", () => {
    const tooSmall = [...localReferences]
      .filter((reference) => reference.startsWith("/characters/"))
      .filter((reference) => fs.existsSync(publicPath(reference)))
      .filter((reference) => {
        const size = imageSize(new Uint8Array(fs.readFileSync(publicPath(reference))));
        return size.width < 400 || size.height < 400;
      });
    expect(tooSmall, `Replace low-resolution portraits: ${tooSmall.join(", ")}`).toEqual([]);
  });
});
