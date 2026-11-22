#!/usr/bin/env node
// `npm run dev`: preview the site with the notes from Obsidian (drafts included), updating as you write.
// Falls back to the published content/ folder when the Obsidian folder isn't on this computer.
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { spawn } from "node:child_process"

const source =
  process.env.NPS_SOURCE ??
  path.join(os.homedir(), "Library/Mobile Documents/iCloud~md~obsidian/Documents/Ninas/NeonPurpleStudio/Website")

const children = []
let contentDir = "content"
if (fs.existsSync(source)) {
  contentDir = ".content-preview"
  children.push(spawn(process.execPath, ["scripts/content.mjs", "preview", "--watch"], { stdio: "inherit" }))
  // give the first export a moment so Astro starts with content in place
  await new Promise((r) => setTimeout(r, 1500))
} else {
  console.log(`Obsidian folder not found (${source}); previewing the published content/ folder instead.`)
}

const astro = spawn("npx", ["astro", "dev", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, NPS_CONTENT: contentDir },
})
children.push(astro)
const stop = () => children.forEach((c) => c.kill())
process.on("SIGINT", stop)
process.on("SIGTERM", stop)
astro.on("exit", (code) => {
  stop()
  process.exit(code ?? 0)
})
