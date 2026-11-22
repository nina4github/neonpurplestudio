# Neon Purple Studio

The website of Neon Purple Studio, built with [Astro](https://astro.build) and published with GitHub Pages.

Live site: https://nina4github.github.io/neonpurplestudio/

## Where the content lives

All text and images are notes in your Obsidian vault on iCloud:

```
Ninas/                              ← your Obsidian vault (iCloud)
  NeonPurpleStudio/                 ← everything about the studio
    Website/                        ← the website: only this folder is published
      posts/                        ← one note per post (Writing)
      projects/                     ← one note per project (Work)
      pages/                        ← home.md, about.md, contact.md
    …LinkedIn posts, plans, other studio notes (never published)
  Templates/
    Website post.md, Website project.md
```

You never edit files in this repository to change the site. Write in Obsidian, then run one command to publish.

Changing the site never requires code. **This repository is public**: only notes you publish reach it, and drafts stay on iCloud.

How it works:

- `npm run dev` previews the site with your notes, drafts included, and updates as you type.
- `npm run publish` copies the publishable notes and their images into [`content/`](content/), checks the build, commits `content/` and pushes. GitHub then deploys in about a minute.
- `content/` is generated. Don't edit it by hand: the next publish overwrites it.

The copy step is done by `scripts/content.mjs`. It:

- leaves out every note with `draft: true`;
- names each file after its web address, for example `accessible-forms.md` → `/writing/accessible-forms/`;
- turns `[[wikilinks]]` between website notes into web links. `[[Note#Heading|text]]` works too. A link to a note outside `Website/`, or to a draft, becomes plain text, and the script lists it so you can check;
- finds embedded images anywhere in the vault (`![[photo.png|description]]`, `![description](photo.png)`, or a `cover` property) and copies them next to the note. Text after `|` becomes the image's alt text; the script warns about images without it.

## Add a post

1. In Obsidian, create a note in `NeonPurpleStudio/Website/posts/`. Name it in lowercase with dashes (`accessible-forms.md`): the file name becomes the web address.
2. Run **Insert template → Website post**.
3. Fill in the properties:

   | Property | What it does |
   | --- | --- |
   | `title` | The title readers see. |
   | `description` | One sentence. Shown in the list, in search results and when the post is shared. |
   | `pubDate` | The date, e.g. `2026-11-22`. Posts are listed newest first. |
   | `updatedDate` | Optional. |
   | `tags` | Optional topics. |
   | `cover`, `coverAlt` | Optional image (`[[photo.png]]`). A cover needs `coverAlt`, a description for screen-reader users. |
   | `series`, `seriesPart` | Optional. Posts with the same `series` name are listed together, in `seriesPart` order (1, 2, 3…). |
   | `draft` | `true` keeps it private. Remove it to publish. |

4. Write below the properties. Use `##` for section headings (the title is the page's only top heading).

Posts also appear in the RSS feed.

## Add a project

Same as a post, in `NeonPurpleStudio/Website/projects/`, with **Insert template → Website project**:

| Property | What it does |
| --- | --- |
| `title` | The project name. |
| `summary` | One or two sentences, problem and outcome. Shown on the card. |
| `client`, `year` | Optional. Shown above the title. |
| `tags` | Up to three skills. |
| `cover`, `coverAlt` | Optional image, as for posts. |
| `featured` | `true` puts it on the home page (the first three, by `order`). |
| `order` | Lower numbers come first. |
| `draft` | `true` keeps it private. |

Use `##` headings for the story: The problem / My contribution / The outcome.

## Edit the home, about and contact pages

They are the notes in `NeonPurpleStudio/Website/pages/`. `home.md` holds the hero text, the four services and your three beliefs as properties, and the "How I work" text below them. Keep the file names: the site looks for exactly these three.

## Drafts

A note with `draft: true`:

- shows while you run `npm run dev`, with a Draft badge;
- never leaves iCloud: it is not copied into this public repository, the live site, the RSS feed or the sitemap.

Remove the line, or set it to `false`, then publish.

## Preview and publish

You need Node 22 or newer. Once, in this folder:

```bash
npm install
```

To preview while you write:

```bash
npm run dev
```

Then open http://localhost:4321/neonpurplestudio/. Pages update when you save a note in Obsidian.

To publish everything that is not a draft:

```bash
npm run publish
```

The terminal lists what it publishes, what stays private, and anything to check (a broken link, an image without alt text). Your commits are signed, so macOS may ask for your GPG passphrase. If the build check fails, nothing is pushed; the message names the note and the property.

To check without committing or pushing: `npm run content`.

**Publishing from Obsidian** (optional): install the community plugin **Shell commands**, add the command `cd ~/Projects/nina_webpages/neonpurplestudio && npm run publish`, and give it a hotkey or a ribbon button.

If a deploy fails on GitHub, GitHub emails you and the live site stays as it was.

**Other computers:** without the iCloud vault, `npm run dev` previews the published `content/` folder instead. To use another folder, set `NPS_SOURCE`, e.g. `NPS_SOURCE=/path/to/Website npm run dev`.

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
