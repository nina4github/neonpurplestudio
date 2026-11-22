// Every internal link goes through url(), so the site works under the GitHub Pages
// base path (/neonpurplestudio) today and at the root of a custom domain later.
const base = import.meta.env.BASE_URL.replace(/\/$/, "")

export function url(path = "/"): string {
  if (/^[a-z]+:/i.test(path)) return path
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
}
