# Neon Purple Studio

The website of Neon Purple Studio, built with [Astro](https://astro.build) and published with GitHub Pages.

Live site: https://nina4github.github.io/neonpurplestudio/

All text and images live as markdown files in [`content/`](content/). Changing the site never requires code: edit a file, push, and the site redeploys in about a minute.

## Add a project

1. In Obsidian, create a note in `content/projects/` and run **Insert template → project**, or copy an existing project file.
2. Fill in the properties at the top:

   | Property | What it does |
   | --- | --- |
   | `title` | The project name. |
   | `summary` | One or two sentences, problem and outcome. Shown on the card. |
   | `client`, `year` | Optional. Shown above the title. |
   | `tags` | Up to three skills. |
   | `cover`, `coverAlt` | Optional image, e.g. `./images/jord.jpg`. A cover needs `coverAlt`, a description of the image for screen-reader users. |
   | `featured` | `true` puts it on the home page (the first three, by `order`). |
   | `order` | Lower numbers come first. |
   | `draft` | `true` keeps it off the live site. |

3. Write the story below the properties. Use `##` headings (The problem / My contribution / The outcome).
4. Images: paste or drag them into the note. Obsidian saves them in `content/projects/images/` with a relative link, which the site understands.

The file name becomes the address: `jord-plus.md` → `/work/jord-plus/`.

## Add a post

Same as a project, in `content/posts/`, with **Insert template → post**. A post needs `title`, `description` and `pubDate` (`2026-11-21`). Optional: `updatedDate`, `tags`, `cover` + `coverAlt`.

Posts appear under Writing, newest first, and in the RSS feed.

To group posts into a series, give each one the same `series` name and a `seriesPart` number (`1`, `2`, …). Each post in the series then lists all its parts. Draft parts are listed only when you run the site locally.

## Drafts

`draft: true` shows the page while you run the site locally (with a Draft badge), and leaves it out of the live site, the RSS feed and the sitemap. Remove the line, or set it to `false`, to publish.

## Publish

Every push to `main` builds and deploys the site (`.github/workflows/deploy.yml`).

**From Obsidian.** Install the community plugin **Obsidian Git** (Settings → Community plugins → Browse → "Git"). Then use the command **Obsidian Git: Commit-and-sync** (or its sidebar button). It commits your changes in `content/` and pushes them. Suggested settings:

- *Pull on startup:* on, so you start from the latest version.
- *Auto commit-and-sync interval:* 0 (off), so you decide when something goes live.
- *Commit message:* `content: {{date}}`.

Git finds the repository one folder above the vault on its own. Keep the repository out of iCloud: syncing a git folder through iCloud can corrupt it.

**From the terminal:**

```bash
git add content && git commit -m "content: update" && git push
```

If the build fails, GitHub emails you and the live site stays as it was. The usual cause is a property with a typo; the Actions log names the file and the field.

## Run locally

Needs Node 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:4321/neonpurplestudio/. `npm run build` runs the same checks as the deploy, including the content schemas.

## Settings

`src/site.config.ts` holds:

- the name and description;
- the public email (leave it empty to hide it);
- the LinkedIn link;
- the **Formward** form endpoint. Leave it empty to hide the contact form.

In the Formward form settings, add `https://nina4github.github.io` (later your own domain) to the allowed origins.

## Design system

The look comes from the **Neon Purple studio** design system artifact in Claude. `design-system/` is a copy of it; see `design-system/SOURCE.md`. To change colours, type or components:

1. Refine the design system in Claude.
2. In Claude Code, in this repo, say **"sync the design system"**. The `.claude/skills/design-system-sync` skill pulls the latest version into `design-system/`, regenerates `src/styles/tokens.css` and shows you the diff.

Don't edit `design-system/` or `src/styles/tokens.css` by hand.

## Use your own domain later

1. In `astro.config.mjs`, set `SITE` to `https://your-domain` and `BASE` to `"/"`.
2. Add a file `public/CNAME` containing just the domain.
3. In GitHub → Settings → Pages, enter the custom domain, and add the DNS records your registrar needs (GitHub's Pages docs list them).
4. Add the new domain to the Formward allowed origins.
