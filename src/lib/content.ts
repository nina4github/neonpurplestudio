import { getCollection, getEntry, type CollectionEntry } from "astro:content"

// Drafts (draft: true) show up while you run `npm run dev`, with a "Draft" badge,
// and never in the built site, RSS feed or sitemap.
export const showDrafts = import.meta.env.DEV

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  const all = await getCollection("projects", ({ data }) => showDrafts || !data.draft)
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
}

export async function getPosts(): Promise<CollectionEntry<"posts">[]> {
  const all = await getCollection("posts", ({ data }) => showDrafts || !data.draft)
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}

export async function getPage(id: string): Promise<CollectionEntry<"pages">> {
  const page = await getEntry("pages", id)
  if (!page) throw new Error(`Missing content/pages/${id}.md`)
  return page
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
