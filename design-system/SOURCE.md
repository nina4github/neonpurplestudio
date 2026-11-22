# Design system source

This folder is a copy of the **Neon Purple studio** design system artifact:
https://claude.ai/artifact/RcKcpc6QZomFV9B2qLBkXT

- Synced from version `1795350651-48fc` on 2026-11-22.
- The artifact is the source of truth. Refine the design system there (in Claude), then ask Claude Code to "sync the design system" (pull) to update this folder.
- Do not edit these files by hand. Edits made here can be pushed back to the artifact the same way ("push the design system").

What is used where:
- `tokens.json` → `scripts/tokens.mjs` generates `src/styles/tokens.css` before every `dev` and `build`.
- `components/bundle.css` → imported globally by `src/layouts/BaseLayout.astro`.
- `scripts/np.js` → loaded on every page (theme toggle, neon sign tilt).
- `fonts/Beon-Regular.woff2` → the neon sign. It is a subset (Latin) of `Beon-Regular.ttf`, made with `pyftsubset`.
- `assets/Logos/` → header wordmark (light and dark files), favicon (mark) and the default social image (logo PNG).
