import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// All content lives as markdown in /content (also an Obsidian vault).
// The schemas below check every file's frontmatter at build time; a typo fails the build with a clear message.

const projects = defineCollection({
  loader: glob({ base: "./content/projects", pattern: "*.md" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string().max(320, "Keep the summary to two short sentences."),
        client: z.string().optional(),
        year: z.union([z.string(), z.number()]).transform(String).optional(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        tags: z.array(z.string()).max(3, "Use at most three tags.").default([]),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        order: z.number().default(100),
        link: z.url().optional(),
      })
      .refine((d) => !d.cover || (d.coverAlt && d.coverAlt.trim().length > 0), {
        message: "A project with a cover needs coverAlt: describe the image for screen-reader users.",
        path: ["coverAlt"],
      }),
})

const posts = defineCollection({
  loader: glob({ base: "./content/posts", pattern: "*.md" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((d) => !d.cover || (d.coverAlt && d.coverAlt.trim().length > 0), {
        message: "A post with a cover needs coverAlt.",
        path: ["coverAlt"],
      }),
})

const pages = defineCollection({
  loader: glob({ base: "./content/pages", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    // Home page only
    headline: z.string().optional(),
    summary: z.string().optional(),
    services: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
    beliefs: z.array(z.string()).optional(),
  }),
})

export const collections = { projects, posts, pages }
