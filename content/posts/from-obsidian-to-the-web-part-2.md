---
title: "From Obsidian to the Web, part 2: making publishing safe"
description: What was wrong with my Quartz setup, from drafts in a public repo to a broken build, and how a small script fixed it.
pubDate: 2026-11-21
tags:
  - Obsidian
  - Quartz
  - ClaudeCode
  - DesignSystems
series: From Obsidian to the Web
seriesPart: 2
draft: true
---

## Focus
Goal: in [Part 1](../from-obsidian-to-the-web/) I got a selection of my Obsidian notes online with Quartz and GitHub Pages. In Part 2 I clean up that setup and make publishing safe. I also plan a website for Neon Purple Studio that I can update from Obsidian too.

Technology: Obsidian > Quartz > GitHub > GitHub Actions > GitHub Pages (same as before), this time with Claude Code as my pair.

Info:
- I am still on a Mac, and my Obsidian vault is still on iCloud
- My Quartz site: https://nina4github.github.io/IdeasCorner/

### Step 1. Plan first, change later
I asked Claude Code to start in **plan mode**. It reads the repository and asks me questions, and it changes nothing until I approve the plan.

This was useful. It found problems I did not know about, and I could correct the plan before anything happened:
- It did not know I already had a design system for Neon Purple Studio. I pointed it out, and the plan changed to build on it.
- It proposed a US form service. I asked for a European one.

### Step 2. What was wrong, and how we fixed it

| # | Issue | Why it was a problem | Solution |
|---|---|---|---|
| 1 | `npx quartz sync` copies the **whole** `content` folder (a symlink to my iCloud `Public` folder) into the repo | Quartz filters (`publish: true`, `draft: true`) hide notes on the **site**, but the **repo is public**. Anyone can read every note on GitHub. One unpublished note was already there. | A small script, `npm run publish`. It copies only notes with `publish: true` that are not `draft: true`, plus the images they embed. The symlink is gone. |
| 2 | Accidental change in `quartz.config.ts`: title "My ideal ", empty description | `quartz sync` commits *everything* with `git add .`, so this would have gone live | Restored from git. The new script commits only the `content` folder. |
| 3 | `baseUrl` was still Quartz's default (`quartz.jzhao.xyz`) | Sitemap, RSS and link previews pointed to the wrong site | Set to `nina4github.github.io/IdeasCorner` |
| 4 | Plausible analytics was switched on, but I never set it up | A tracking script with no account behind it | Removed (`analytics: null`) |
| 5 | The `public` folder (the built site) was committed, even though `.gitignore` excludes it | It was committed before the ignore rule. I even edited `public/index.xml` on GitHub, which does nothing because GitHub Actions rebuilds the site anyway. | Removed from git; the build creates it on every deploy |
| 6 | Quartz's own workflows (CI, previews, Docker) and its `docs` folder came with my fork | Clutter, and workflows that are not meant for my site | Removed. Kept only `deploy.yaml`. |
| 7 | My laptop was 1 commit behind GitHub | Because of that edit on GitHub (see 5) | Pulled first, before changing anything |
| 8 | The build failed: *"You installed esbuild for another platform"* | The packages had been installed for an Intel Mac (Rosetta) and my Mac is Apple Silicon | Reinstalled with `npm ci` |
| 9 | The browser tab title read "indexIdeas and Learnings…" | The title and the description were glued together | Added a separator: " \| Ideas and Learnings…" |
| 10 | The home page title shows "index" | `index.md` has no `title` property | To do: add `title: Welcome` to `index.md` |
| 11 | Part 1 was called "From **Obsedian** to the Web" | Typo, and it was also in the web address | Renamed. An alias keeps the old link working. |

### Step 3. How I publish now
1. In Obsidian, add the property `publish: true` to a note in the `Public` folder. `draft: true` always keeps it off the site.
2. Preview locally: `npm run preview`, then open http://localhost:8080. The terminal lists what will be published and what is skipped.
3. Publish: `npm run publish`. It copies the notes, checks that the site builds, commits only the notes and pushes. GitHub Actions puts it live in about a minute.

Never again: `npx quartz sync`, committing the `content` folder by hand, or recreating the symlink.

Note: removing `publish: true` takes a note off the site and out of the repo, but it stays in the git history.

### Step 4. What is next
- **Design system.** My Neon Purple Studio design system lives as an artifact in Claude. I refine it there (dark theme, components) and sync it to my repositories.
- **Studio website.** Astro, with all content as markdown files. The content folder is also an Obsidian vault, and the Obsidian Git plugin commits and pushes from Obsidian. Drafts never publish. GitHub Pages first, my own domain later.
- **Contact form.** [Formward](https://formward.eu), a European form service (data stored in Sweden, free up to 100 messages a month). I write the form HTML myself, so accessibility is in my hands. I also looked at Formspree, Tally and deploybase.
- **This site** gets the same design system, so both sites look like they belong together.

### Lessons
- A filter that hides a note on the site does not hide it in a public repository.
- Don't edit generated files (like `public`) on GitHub. They get overwritten.
- Plan before changing. Ten minutes of questions saved me from building on the wrong colors and the wrong form provider.
