// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import { unified } from "@astrojs/markdown-remark";
import rehypeImageDimensions from "./src/utils/rehype-image-dimensions.mjs";
import { serializeSitemapItem } from "./src/utils/sitemap-config.mjs";

/** @returns {import('astro').AstroIntegration} */
function sitemapAliasIntegration() {
  return {
    name: "sitemap-alias",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const distDir = fileURLToPath(dir);
        const indexFile = path.join(distDir, "sitemap-index.xml");
        const aliasFile = path.join(distDir, "sitemap.xml");
        if (existsSync(indexFile)) {
          copyFileSync(indexFile, aliasFile);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://gachacountdown.online/",
  trailingSlash: "always",
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeImageDimensions],
    }),
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
        },
      },
      serialize: serializeSitemapItem,
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !/\/(?:es\/)?releases\/(?:neverness-to-everness|silver-palace)\/?$/.test(
          pathname,
        );
      },
    }),
    sitemapAliasIntegration(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
