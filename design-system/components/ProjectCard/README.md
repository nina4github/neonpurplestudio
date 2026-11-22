# ProjectCard

One project in the work grid: `np-card`, with the whole card clickable through its title link.

**Provide:**
- an `<article class="np-card">`;
- a cover: an `<img class="np-card__media">` with real `alt` text, or `<div class="np-card__media np-card__media--placeholder">` until there is one;
- `np-card__meta` (client or field and year, in the `code` style);
- an `<h3 class="np-card__title">` with an `<a class="np-card__link">`;
- `np-card__summary` (problem and outcome, at most 2 sentences);
- up to three Tags.

- Lay cards out in a grid with `gap: var(--space-6)`. Columns are at least 300px, so a phone shows one.
- Cards sit on `surface` with a `line` border and `radius-lg`. Hover or keyboard focus lights the border in `neon` with `glow-lg`.
- Only the title is a link. A stretched `::after` makes the whole card clickable, so screen readers hear one link per card, not three.
- Don't invent numbers or client names. The summary uses only facts you can back up.
