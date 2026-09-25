import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

export function listHtmlFiles(directory = distDir): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(fullPath);
    return entry.name === "index.html" || entry.name === "404.html" ? [fullPath] : [];
  });
}

export function routeFromFile(filePath: string): string {
  const relative = path.relative(distDir, filePath).split(path.sep).join("/");
  if (relative === "404.html") return "/404.html";
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"/index.html".length)}/`;
  }
  return `/${relative}`;
}

export function readPage(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function getAttribute(html: string, selector: string, attribute: string): string | undefined {
  const selectorMatch = selector.match(/^([a-z0-9-]+)(?:\[([a-z0-9-]+)=([^\]]+)\])?$/i);
  if (!selectorMatch) return undefined;

  const [, tag, conditionName, conditionValue] = selectorMatch;
  const openingTags = [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map((match) => match[0]);
  const target = conditionName
    ? openingTags.find((openingTag) =>
        new RegExp(`\\b${conditionName}=["']${conditionValue}["']`, "i").test(openingTag),
      )
    : openingTags[0];

  return target?.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"))?.[1];
}

export function getJsonLd(html: string): Record<string, unknown>[] {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return scripts.map((match) => JSON.parse(match[1]) as Record<string, unknown>);
}

export function getLinks(html: string): string[] {
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]);
}

export function getHeadings(html: string): { level: number; text: string }[] {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({
    level: Number(match[1]),
    text: match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
  }));
}

export function publicPath(urlPath: string): string {
  return path.join(root, "public", urlPath.replace(/^\//, ""));
}

export function listFiles(directory: string, extension?: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listFiles(fullPath, extension);
    return !extension || entry.name.endsWith(extension) ? [fullPath] : [];
  });
}
