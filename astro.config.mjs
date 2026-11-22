// @ts-check
import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

// The site is served from GitHub Pages at https://nina4github.github.io/neonpurplestudio/.
//
// To move to your own domain later:
//   1. set SITE below to "https://<your-domain>" and BASE to "/"
//   2. add a file public/CNAME containing just the domain (e.g. neonpurplestudio.com)
//   3. in GitHub → Settings → Pages, enter the same custom domain
const SITE = "https://nina4github.github.io"
const BASE = "/neonpurplestudio"

export default defineConfig({
  site: SITE,
  base: BASE,
  output: "static",
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404/") && !page.includes("/contact/thanks/") })],
})
