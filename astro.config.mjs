// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import { unified } from "@astrojs/markdown-remark";
import rehypeImageDimensions from "./src/utils/rehype-image-dimensions.mjs";

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
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !/\/(?:es\/)?releases\/(?:neverness-to-everness|silver-palace)\/?$/.test(
          pathname,
        );
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
