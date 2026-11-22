Warm by design, precise by nature. Neon Purple studio is a monochrome system (warm paper, near-black ink, graphite) lit by a single electric accent. The neutrals carry the work; the neon marks the one thing that matters on each screen.

## Content fundamentals

- **Voice:** warm and exact. Plain sentences, concrete numbers, no hype. Say "Ships in 3 days", not "Lightning-fast delivery".
- **Person:** first person, "I". Write for clients, not recruiters. Explain complex things simply.
- **Case:** sentence case for headings, buttons and nav. Uppercase only in the `label` style (eyebrows and tags).
- **Technical details** (versions, measurements, dates, years) go in the `code` style, so the precise voice is visible at a glance.
- **Facts only:** no invented clients, numbers or testimonials. Label sample content as sample.

## Visual foundations

- **Colour:** build every layout from `paper`, `surface`, `ink` and `ink-muted`, with `line` hairlines. Use `neon` for one moment per screen: the primary action, the sign, a key shape. Text that must be purple uses `neon-ink`; text on a neon fill uses `on-neon`. `neon-tint` marks selection and tags.
- **Themes:** light is the default and the brand. Dark follows the device setting or the theme toggle. Every token has a dark value, so style only through tokens and never write a colour that works in one theme only.
- **Dark areas:** the footer and code blocks are `graphite` with `on-graphite` text, links and focus rings. Neon reads at its brightest there, for the dot pattern and large type.
- **Type:** Fira Sans (humanist, warm) for everything; Fira Mono for the technical layer. The neon sign and the logo share their own display face, Beon (`beon`, in `fonts/`): neon-tube letters with small breaks where the glass tubes end. Headings are 600 with slight negative tracking; body is 400 at 16/24; `lead` (20/30) opens a page.
- **Space:** an 8px grid, with `space-1` and `space-3` for tight control padding. Inside components use `space-1`–`space-6`; between sections use `space-16` on phones and `space-24` on desktop; the page gutter is `space-4` on phones and `space-10` on desktop.
- **Shape:** soft-cornered and modular: `radius-sm` for tags and inputs, `radius-md` for buttons, `radius-lg` for cards and panels. Borders over shadows; the only shadows are the neon glows (`glow-sm`, `glow-lg`).
- **Pattern:** a dot grid at the `space-6` pitch, in neon on ink or graphite, is the brand texture. It also fills image placeholders, on `neon-tint`.
- **Motion:** only the neon sign moves (a slight tilt and a flicker), and hover glows fade in over 0.2s. All motion stops under `prefers-reduced-motion`.
- **Focus:** one ring everywhere, a 3px solid `focus-ring` offset by 3px. On `graphite` it is `on-graphite`.

## Components

All component styles live in `components/bundle.css`, with every class prefixed `np-`, so they can sit next to another site's CSS (the Quartz notes site uses the same file). Behaviour for the theme toggle and the neon sign is in `scripts/np.js`.

- **Actions:** Button (primary, secondary, ghost), Link, ThemeToggle.
- **Content:** Tag, ProjectCard, PostItem, PullQuote.
- **Layout:** SiteHeader (skip link, logo, nav, toggle), Footer.
- **Forms:** FormField (label, hint, error) and status messages.
- **Brand:** NeonSign, the home-page hero: the logo as a live, lit sign.

Intentional additions beyond the first draft, each needed by the studio site: `line-strong` (input borders must reach 3:1), `on-graphite` (paper text fails on graphite in dark), `danger` and `success` (form messages), `focus-ring`, `neon-glow`, `sign-tube` and `wall-shadow` (the sign) and the two glow shadows.

## Logo

The logo is a square neon sign: one tube frame with rounded corners around three right-aligned rows in Beon. "NEON" is enlarged to the exact width of "PURPLE" beneath it, and "studio" in lowercase sits right-aligned under them, with a tube line running in from the left. Everything is `neon` on light and a near-white tube in a purple halo on dark.

- **neon-purple-studio-logo.svg / .png** and **-logo-dark.svg / .png:** the lit sign with its halo and wall shadow, on `paper` (light) or the dark wall, 2048×2048. For covers, profile pictures and social images.
- **neon-purple-studio-mark.svg:** the same square, flat in `neon`, transparent, no glow. For documents and app icons, 48px and up.
- **neon-purple-studio-wordmark.svg:** a horizontal version for tight heights: "NEON PURPLE" on one line with "studio" and its line beneath, flat in `neon`, no frame. The site header uses it.

Keep clear space equal to the height of "studio" on every side. Place the logos on `paper`, `surface`, `ink` or `graphite`; never on `neon` or `neon-tint`, and never recoloured, outlined or stretched. On the website the home hero uses the NeonSign component, a live version of the square logo; everywhere else uses the files.

## Iconography

No icon set yet. Until there is one, use a 1.5px-stroke outline set at 20px in `ink`, with `neon-ink` for hover and the active state. The theme toggle's moon and sun follow this rule.

## Accessibility

Light: `ink` on `paper` is 16:1 and `ink-muted` 6.2:1. `neon` on `paper` is 4.2:1, fine for fills, marks and type 24px and up, not for small text. `on-neon` on `neon` is 4.6:1; `neon-ink` on `paper` is 7.1:1.

Dark: `ink` on `paper` is 16.5:1, `ink-muted` 8.5:1, `neon-ink` 9.2:1, and `on-neon` (dark text) on `neon` 5.6:1.

In both themes, `line-strong` control borders and the `focus-ring` reach 3:1 or more on every surface they sit on. `danger` and `success` text reach 6:1 or more, and always come with words.
