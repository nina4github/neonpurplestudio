---
title: "From Obsidian to the Web, part 3: building Neon Purple Studio with Astro"
description: How I built my studio website with Astro, a design system I refine in Claude, and content I write in Obsidian, and why I retired my Quartz site.
pubDate: 2026-11-22
tags:
  - Astro
  - DesignSystems
  - Accessibility
  - ClaudeCode
series: From Obsidian to the Web
seriesPart: 3
draft: true
---

## Focus

Goal: a website for my studio, Neon Purple Studio, that I can update by writing markdown, without touching code. It also had to look like the brand, work in light and dark, and be accessible.

Technology: Obsidian > Astro > GitHub > GitHub Actions > GitHub Pages, with Claude Code as my pair and a design system that lives as an artifact in Claude.

In [Part 1](../from-obsidian-to-the-web/) I published notes with Quartz. In [Part 2](../from-obsidian-to-the-web-part-2/) I made that safe. This part is about the site you are reading now.

## Step 1. Plan first, again

I started Claude Code in plan mode and gave it the brief: Astro, static, GitHub Pages, content as markdown with checked properties, drafts that never publish, an accessible contact form with no backend.

Its questions changed the plan more than once:

- I already had a private repository called `neonpurplestudio`, so we reused it. GitHub Pages on a private repository needs a paid plan, so it became public when the site went live.
- I already had a copy of the site's text in an Obsidian note: services, three projects, my beliefs. It became the seed content.
- I already had a **design system** for the studio, made in Claude two weeks earlier. The plan changed to build on it instead of inventing new colours.

## Step 2. A design system I can refine in Claude

The design system is an artifact in Claude: colours, type, spacing, components with live previews, and the logos. I refine it there, by commenting on it or asking in a chat. The website keeps a copy in a `design-system` folder, and "sync the design system" in Claude Code pulls the latest version in.

What we added:

- **A dark theme.** Every colour got a dark value, and every text colour pair was checked for at least 4.5:1 contrast in both themes.
- **The components the site needed:** buttons, links, tags, project cards, the post list, header, footer, form fields, the theme toggle, pull-quotes and a neon sign for the home page.
- **The neon sign.** The first version used the cursive script from my old logo. It looked nice but didn't feel like a real neon sign, so I asked for three completely different ones: rounded tube letters, tall motel-sign capitals, and an 80s arcade style. In the end none of them made it. Seeing them helped me design a new logo: a square neon sign in Beon, a font made of tube-like letters. The sign on the home page is that logo, built in HTML and CSS, so it glows, tilts a little with the pointer and flickers one letter. All the motion stops for people who turn off animations.

## Step 3. The site

- **Astro, static output.** Every page is plain HTML at build time.
- **Content collections.** Projects, posts and pages are markdown files with properties at the top. Each kind has a schema, so a typo in a property fails the build with a message that names the file and the field. A project with a cover image must have alt text, or the build fails.
- **Drafts.** `draft: true` shows a page only on my laptop, with a Draft badge. It never reaches the live site, the RSS feed or the sitemap.
- **An Obsidian vault inside the repository.** The `content` folder opens as its own vault, with templates for a new project or post. The Obsidian Git plugin commits and pushes from Obsidian, and every push redeploys the site.

## Step 4. A contact form, European and accessible

I wanted a form without running a server. Claude compared Formspree and Tally first. Neither publishes a statement that its forms meet accessibility standards. Tally forms are embedded, so I couldn't control their markup. I also wanted my visitors' data to stay in Europe.

I chose **Formward**, a form service based in Sweden that stores data in the EU, with a free plan of 100 messages a month. The form is my own HTML, so its accessibility is in my hands:

- It works without JavaScript.
- With JavaScript it shows an error summary at the top and an error next to each field, and moves focus to the summary.
- There is no CAPTCHA. A hidden field catches most bots instead.

Formward also has an MCP server for AI assistants. I paired it with my account, and Claude Code created the form, set which websites may send to it, and sent a test message.

## Step 5. What went wrong, and how we fixed it

| # | Issue | Why it was a problem | Solution |
|---|---|---|---|
| 1 | The neon sign was in a cursive script | It didn't feel like a real neon sign | Three very different alternatives, then a new logo in Beon, a tube-lettering font |
| 2 | The Beon font file was 212 KB | Slow to load for one sign | Kept only the characters the site needs: 18 KB |
| 3 | The light purple was a little too light | Purple on the light background was close to the 4.5:1 limit | Deepened it to #a912ff (4.6:1) in the design system, then synced |
| 4 | The header wordmark was hard to read in dark mode, "studio" especially | Light purple on a dark background was only 3.8:1, and the letters are thin | A second, lilac wordmark for dark mode (9.2:1). The header shows the one that matches the theme |
| 5 | The first dark wordmark still had a purple line under "studio" | The line was drawn separately from the letters, so the recolour missed it | Recoloured every element of the file |
| 6 | The local preview showed an error after adding the content schemas | Astro reads the content setup only when the preview server starts | Restarted the preview server |
| 7 | Claude Code's commits stopped and waited | My commits are signed, and the key asks for my passphrase | I type the passphrase when the dialog appears |

The accessibility checker (axe) found no problems on any page, in either theme, and nothing scrolls sideways on a phone.

## Step 6. Retiring Quartz

With Writing on the studio site, I didn't need a second site for two notes. The Quartz site stays online as it is, as a record of Part 1 and Part 2. Its posts now live here, and new writing goes here.

## How I publish now

1. In Obsidian, open the `content` vault and create a post or project from its template.
2. Write, and keep `draft: true` until it's ready.
3. Remove the draft line and run **Commit and sync** in Obsidian Git. GitHub Actions puts it live in about a minute.

## Lessons

- Say what you already have. An existing repository, a copy of the text and a design system all changed the plan for the better.
- Seeing options beats describing them. Three neon signs I didn't want led to the logo I did want.
- Check contrast in both themes, on the real files. A logo can pass in light mode and fail in dark mode.
- Accessibility is easier when you own the markup. That decided the form service.
