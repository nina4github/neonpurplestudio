#!/usr/bin/env node
// Turns the Obsidian folder NeonPurpleStudio/Website (on iCloud) into the site's content.
//
//   node scripts/content.mjs preview            → .content-preview/  (drafts included, for `npm run dev`)
//   node scripts/content.mjs preview --watch    → same, and again on every change
//   node scripts/content.mjs publish            → content/  (no drafts), then build check
//   node scripts/content.mjs publish --push     → … then commit content/ and push (this is `npm run publish`)
//
// What it does to each note:
//   - skips notes with draft: true (publish only)
//   - names the file after its slug, so the web address is stable
//   - [[wikilinks]] to other website notes become relative web links; links to anything else become plain text
//   - embedded images (![[x.png]], ![alt](x.png), cover: "[[x.png]]") are found in the vault and copied next to the note
//
// Set NPS_SOURCE to use another folder.

import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { spawnSync } from "node:child_process"
import matter from "gray-matter"

const VAULT = path.join(os.homedir(), "Library/Mobile Documents/iCloud~md~obsidian/Documents/Ninas")
const SOURCE = process.env.NPS_SOURCE ?? path.join(VAULT, "NeonPurpleStudio/Website")
const COLLECTIONS = { posts: "/writing/", projects: "/work/", pages: "/" }
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i

const [mode = "preview", ...flags] = process.argv.slice(2)
const watch = flags.includes("--watch")
const push = flags.includes("--push")
const includeDrafts = mode === "preview"
const OUT = path.resolve(mode === "preview" ? ".content-preview" : "content")

const isTrue = (v) => v === true || v === "true"
const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")

function fail(msg) {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

let vaultFiles = null
function findInVault(name) {
  vaultFiles ??= walk(VAULT)
  const base = path.basename(name).toLowerCase()
  return vaultFiles.find((f) => path.basename(f).toLowerCase() === base)
}

function pageUrl(collection, slug) {
  if (collection === "pages") return slug === "home" ? "/" : `/${slug}/`
  return `${COLLECTIONS[collection]}${slug}/`
}
function relativeUrl(from, to) {
  const rel = path.posix.relative(from, to)
  return rel === "" ? "./" : rel.endsWith("/") ? rel : `${rel}/`
}

function run() {
  if (!fs.existsSync(SOURCE)) fail(`Website folder not found: ${SOURCE}`)

  // 1. Read every note in posts/, projects/, pages/ (top level of each)
  const notes = []
  for (const collection of Object.keys(COLLECTIONS)) {
    const dir = path.join(SOURCE, collection)
    if (!fs.existsSync(dir)) continue
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".md") || name.startsWith(".")) continue
      const file = path.join(dir, name)
      const parsed = matter(fs.readFileSync(file, "utf8"))
      const draft = isTrue(parsed.data.draft)
      const slug = slugify(name.replace(/\.md$/, ""))
      notes.push({ collection, file, name: name.replace(/\.md$/, ""), slug, parsed, draft })
    }
  }
  const included = notes.filter((n) => includeDrafts || !n.draft)
  const byName = new Map()
  for (const n of included) {
    byName.set(n.name.toLowerCase(), n)
    byName.set(n.slug, n)
  }

  // 2. Transform and write
  const written = new Set()
  const warnings = []
  const copyImage = (note, target) => {
    const clean = decodeURI(target.split("|")[0].split("#")[0].trim())
    if (/^[a-z]+:\/\//i.test(clean)) return clean
    let src = [path.resolve(path.dirname(note.file), clean), path.resolve(VAULT, clean)].find((p) => fs.existsSync(p))
    src ??= findInVault(clean)
    if (!src) {
      warnings.push(`${note.collection}/${note.name}: image not found: ${clean}`)
      return null
    }
    const ext = path.extname(src).toLowerCase()
    const outName = `${slugify(path.basename(src, path.extname(src)))}${ext}`
    const dest = path.join(OUT, note.collection, "images", outName)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(src, dest)
    written.add(dest)
    return `./images/${outName}`
  }

  for (const note of included) {
    const from = pageUrl(note.collection, note.slug)
    let body = note.parsed.content

    // Embedded images: ![[file.png|alt]] and ![alt](file.png)
    body = body.replace(/!\[\[([^\]]+)\]\]/g, (_all, inner) => {
      const [target, ...rest] = inner.split("|")
      if (!IMAGE_EXT.test(target.trim())) {
        warnings.push(`${note.collection}/${note.name}: embedded note ![[${target}]] isn't supported; left as a link`)
        return `[[${inner}]]`
      }
      const alt = rest.find((r) => !/^\d+(x\d+)?$/.test(r.trim()))?.trim() ?? ""
      if (!alt) warnings.push(`${note.collection}/${note.name}: image ${target.trim()} has no alt text (add it as ![[${target.trim()}|description]])`)
      const url = copyImage(note, target)
      return url ? `![${alt}](${url})` : ""
    })
    body = body.replace(/!\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (all, alt, target) => {
      if (/^[a-z]+:\/\//i.test(target) || target.startsWith("./images/")) return all
      const url = copyImage(note, target)
      return url ? `![${alt}](${url})` : ""
    })

    // Wikilinks: [[Note]], [[Note|text]], [[Note#Heading|text]], [[#Heading]]
    body = body.replace(/\[\[([^\]]+)\]\]/g, (_all, inner) => {
      const [targetPart, label] = inner.split("|")
      const [noteName, heading] = targetPart.split("#")
      const anchor = heading ? `#${slugify(heading)}` : ""
      const text = (label ?? (noteName || heading)).trim()
      if (!noteName.trim()) return `[${text}](${anchor})`
      const target = byName.get(noteName.trim().toLowerCase()) ?? byName.get(slugify(noteName))
      if (!target) {
        warnings.push(`${note.collection}/${note.name}: link to "${noteName.trim()}" isn't a published website note; shown as plain text`)
        return text
      }
      return `[${text}](${relativeUrl(from, pageUrl(target.collection, target.slug))}${anchor})`
    })

    // cover property: "[[img.png]]", "img.png" or "./images/img.png"
    const data = { ...note.parsed.data }
    if (typeof data.cover === "string" && data.cover.trim()) {
      const target = data.cover.replace(/^\[\[|\]\]$/g, "").trim()
      const url = copyImage(note, target)
      if (url) data.cover = url
      else delete data.cover
    }

    const dest = path.join(OUT, note.collection, `${note.slug}.md`)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.writeFileSync(dest, matter.stringify(body, data))
    written.add(dest)
  }

  // 3. Remove anything that is no longer produced (deleted notes, drafts in publish mode)
  for (const collection of Object.keys(COLLECTIONS)) {
    for (const f of walk(path.join(OUT, collection))) if (!written.has(f)) fs.rmSync(f)
  }

  const skipped = notes.filter((n) => !includeDrafts && n.draft)
  console.log(`\n${mode === "preview" ? "Preview" : "Publish"}: ${included.length} note(s) from ${SOURCE}`)
  for (const n of included) console.log(`  ✓ ${n.collection}/${n.slug}${n.draft ? "  (draft)" : ""}`)
  if (skipped.length) {
    console.log(`Kept private (draft: true): ${skipped.length}`)
    for (const n of skipped) console.log(`  · ${n.collection}/${n.name}`)
  }
  if (warnings.length) {
    console.log("\n⚠ Check:")
    for (const w of warnings) console.log(`  ${w}`)
  }
}

run()

if (mode === "preview" && watch) {
  let timer = null
  fs.watch(SOURCE, { recursive: true }, () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      vaultFiles = null
      try {
        run()
      } catch (e) {
        console.error(e.message)
      }
    }, 300)
  })
  console.log("\nWatching for changes in Obsidian…")
}

if (mode === "publish") {
  const sh = (cmd, args, opts = {}) => {
    const r = spawnSync(cmd, args, { stdio: "inherit", ...opts })
    if (r.status !== 0) fail(`${cmd} ${args.join(" ")} failed`)
  }
  console.log("\nBuilding to check everything works…")
  sh("npm", ["run", "build"])
  if (!push) {
    console.log("\nDone. Run `npm run publish` to commit and push.")
    process.exit(0)
  }
  sh("git", ["add", "--all", "content"])
  const changed = spawnSync("git", ["diff", "--cached", "--quiet", "--", "content"]).status !== 0
  if (!changed) {
    console.log("\nNothing new to publish.")
    process.exit(0)
  }
  const stamp = new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })
  sh("git", ["commit", "-m", `content: ${stamp}`, "--", "content"])
  sh("git", ["push", "origin", "main"])
  console.log("\n✓ Pushed. The site updates in about a minute: https://nina4github.github.io/neonpurplestudio/")
}
