import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imageSize } from "image-size";

const publicDirectory = fileURLToPath(new URL("../../public/", import.meta.url));

function visit(node) {
  if (!node || typeof node !== "object") return;

  if (node.type === "element" && node.tagName === "img") {
    const src = node.properties?.src;
    if (typeof src === "string" && src.startsWith("/") && !src.startsWith("//")) {
      const filePath = path.join(publicDirectory, src.slice(1));
      if (fs.existsSync(filePath)) {
        try {
          const dimensions = imageSize(fs.readFileSync(filePath));
          if (dimensions.width && dimensions.height) {
            node.properties.width = dimensions.width;
            node.properties.height = dimensions.height;
            node.properties.loading ??= "lazy";
            node.properties.decoding ??= "async";
          }
        } catch (error) {
          console.warn(`[markdown-images] Could not read ${src}`, error);
        }
      }
    }
  }

  for (const child of node.children ?? []) visit(child);
}

export default function rehypeImageDimensions() {
  return (tree) => visit(tree);
}
