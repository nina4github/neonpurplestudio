# ThemeToggle

A 44px icon button that switches between the light and dark themes and remembers the choice.

**Provide:** `<button class="np-theme-toggle" type="button" aria-pressed="false" data-np-theme-toggle>` containing hidden text "Dark theme" and the two icons (moon and sun, 1.5px stroke). Load `scripts/np.js`, which sets `aria-pressed` and handles clicks.

- With nothing saved, the site follows the device setting (`prefers-color-scheme`). A click sets `data-theme` on `<html>` and stores it under `np-theme`.
- Call `NeonPurpleStudioUI.applySavedTheme()` inline in `<head>`, so pages don't flash the wrong theme.
- The button has a visible `line-strong` border. Hover turns it `neon-ink`.
- Screen readers hear "Dark theme, toggle button, pressed" or "not pressed". Don't change the hidden label when it toggles.
