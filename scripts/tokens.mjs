#!/usr/bin/env node
// Generates CSS custom properties from the design system's tokens.json.
//   node scripts/tokens.mjs <tokens.json> <out.css>
// Light (first theme) is the default; dark applies via [data-theme="dark"] or the OS setting
// unless the page has data-theme="light".
import fs from "node:fs"
import path from "node:path"

const [, , src = "design-system/tokens.json", out = "src/styles/tokens.css"] = process.argv
const t = JSON.parse(fs.readFileSync(src, "utf8"))
const themes = t.color.themes.map((th) => th.id)
const first = themes[0]

const resolve = (v) => (typeof v === "string" ? v.replace(/^\{(.+)\}$/, "var(--$1)") : v)
const valueFor = (tok, theme) => {
  if (typeof tok.value === "string") return theme === first ? tok.value : null
  return tok.value[theme] ?? (theme === first ? null : null)
}
const themed = [...t.color.tokens, ...(t.shadow?.tokens ?? [])]
const block = (theme) =>
  themed
    .map((tok) => {
      const v = valueFor(tok, theme)
      return v == null ? null : `  --${tok.name}: ${resolve(v)};`
    })
    .filter(Boolean)
    .join("\n")

const lines = [`/* ${t.name} — generated from tokens.json. Do not edit; run the tokens script. */`]
lines.push(`:root, [data-theme="${first}"] {\n${block(first)}\n  color-scheme: ${first};\n}`)
for (const th of themes.slice(1)) {
  const b = block(th)
  lines.push(`[data-theme="${th}"] {\n${b}\n  color-scheme: ${th};\n}`)
  if (th === "dark")
    lines.push(
      `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="${first}"]) {\n${b.replace(/^/gm, "  ")}\n    color-scheme: dark;\n  }\n}`,
    )
}
const statics = []
for (const fam of ["spacing", "radius"]) for (const tok of t[fam]?.tokens ?? []) statics.push(`  --${tok.name}: ${tok.value};`)
for (const [key, stack] of Object.entries(t.type.families)) statics.push(`  --font-${key}: ${stack};`)
lines.push(`:root {\n${statics.join("\n")}\n}`)

// @font-face for font files listed in tokens.json (prefers a .woff2 next to the listed file)
const dsDir = path.dirname(src)
for (const f of t.type.fonts ?? []) {
  const listed = path.join(dsDir, f.file.includes("/") ? f.file : `fonts/${f.file}`)
  const woff2 = listed.replace(/\.(ttf|otf|woff)$/i, ".woff2")
  const file = fs.existsSync(woff2) ? woff2 : listed
  const rel = path.relative(path.dirname(out), file).split(path.sep).join("/")
  const format = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "opentype" }[file.split(".").pop().toLowerCase()]
  lines.push(
    `@font-face {\n  font-family: "${f.family}";\n  src: url("${rel}") format("${format}");\n  font-weight: ${f.weight ?? "400"};\n  font-style: ${f.style ?? "normal"};\n  font-display: swap;\n}`,
  )
}

fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, lines.join("\n\n") + "\n")
console.log(`tokens: wrote ${out}`)
