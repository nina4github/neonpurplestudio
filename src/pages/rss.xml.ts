import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getPosts } from "../lib/content"
import { url } from "../lib/url"
import { SITE } from "../site.config"

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.draft)
  return rss({
    title: `${SITE.name}: writing`,
    description: SITE.description,
    site: new URL(url("/"), context.site),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: url(`/writing/${p.id}/`),
      categories: p.data.tags,
    })),
    customData: `<language>en</language>`,
  })
}
