# NeonSign

The home hero's neon sign: the square logo built live in HTML and CSS, so it glows, tilts and flickers. A tube frame with rounded corners holds three right-aligned rows in Beon: "NEON" stretched to the width of "PURPLE", "PURPLE", and a lowercase "studio" with a tube line running in from the left.

**Provide:**
- the markup from the preview, with `aria-hidden="true"` on `.np-sign`;
- a real `<h1>` nearby with the studio's name. It may be visually hidden in the hero;
- `scripts/np.js` loaded on the page, for the pointer tilt.

**Look:** `.np-sign np-sign--beon`. Letters in the `beon` family (Beon, loaded from `fonts/`), style `sign-beon`. Tubes, frame and line are `sign-tube`, haloed with `neon-glow`, with a blurred `wall-shadow` cast down and to the right. Light theme: saturated `neon` tubes on the light wall. Dark theme: near-white tubes in a purple halo.

**Size:** set `--np-size` on `.np-sign` (the height of the PURPLE row); everything else scales from it. The default runs from 56px to 132px with the viewport, so the frame is about 4.7 times that wide. Below 56px use the logo files instead.

**Motion:**
- a gentle tilt that follows the pointer (at most 6° across, 4° up and down);
- the "L" in "PURPLE" flickering unevenly about every 5 seconds, never more than 3 flashes a second.

All of it stops with `prefers-reduced-motion`, on touch screens and below 640px wide.

**Rules:** one sign per site, in the home hero only. Never recolour it or put text over it.
