# Tag

A short, non-interactive label for a skill or topic: `np-tag` items inside an `np-tags` list.

**Provide:** a `<ul class="np-tags">` with an `aria-label` ("Skills", "Topics") and `<li class="np-tag">` items, each one to three words.

- Set in the `label` style (12px, 600, uppercase, 0.06em tracking), `neon-ink` on `neon-tint` (6.3:1 in light, 7.2:1 in dark).
- Tags are not links or buttons. If a tag needs to filter a list, build that as a button group, not by styling tags as clickable.
- Three tags per project card at most.
