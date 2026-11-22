# Link

An inline text link inside running text: `np-link`, in `neon-ink` with a 1px underline.

**Provide:** an `<a href>` whose text says where it goes ("notes on teaching", not "click here").

- Hover thickens the underline and adds a soft `neon-glow`. Focus shows the `focus-ring`.
- `np-link--external` adds a ↗ arrow, which screen readers skip. Add hidden text such as "(another site)" inside the link when it leaves the site.
- Keep the underline: colour alone does not mark a link.
- On `graphite` (the footer), links use `on-graphite` instead. The Footer component handles this.
