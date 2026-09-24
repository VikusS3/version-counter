import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
    generateId: ({ entry, data }) =>
      (data.slug as string | undefined) ??
      entry.replace(new RegExp(`\.[^.]+$`), ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    game: z
      .enum(["genshin", "hsr", "wuwa", "zzz", "arknights", "nte", "all"])
      .default("all"),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Gacha Countdown"),
    tags: z.array(z.string()).default([]),
    slug: z.string().optional(),
  }),
});

export const collections = { blog };