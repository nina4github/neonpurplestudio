# Button

Starts an action or leads to the next step: `np-btn` plus one of `np-btn--primary`, `np-btn--secondary` or `np-btn--ghost`.

**Provide:** a `<button>` for actions (with `type`), an `<a href>` for navigation. The label is one to three words in sentence case, a verb first ("Let's talk", "Send message").

- **Primary** (`neon` fill, `on-neon` text): the one main action on a screen. Hover lights it with `glow-sm`. One per view.
- **Secondary** (`neon-ink` outline and text): an alternative next step beside a primary.
- **Ghost** (underlined `ink` text): low-emphasis actions such as "Read more".
- Disabled: use the `disabled` attribute on buttons, `aria-disabled="true"` on links that are temporarily unavailable. Say why nearby.

Height is at least 44px, so it works as a touch target. Focus shows the 3px `focus-ring`. Don't put two primaries side by side, don't make a button neon text on paper, and don't use uppercase labels.
