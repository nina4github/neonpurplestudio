# SiteHeader

The top of every page: a skip link, the logo wordmark linking home, the main nav and the theme toggle.

**Provide:**
- `<a class="np-skip" href="#main">` as the first element in `<body>`, and `id="main"` on `<main>`;
- the logo as two images inside the brand link: `<img class="np-header__logo np-header__logo--light">` with `neon-purple-studio-wordmark.svg` and `<img class="np-header__logo np-header__logo--dark">` with `neon-purple-studio-wordmark-dark.svg`, both with alt text "Neon Purple studio, home". The CSS shows exactly one, following the theme, so screen readers hear the name once;
- `<nav class="np-nav" aria-label="Main">` with a list of links;
- the ThemeToggle.

- Mark the current section with `aria-current="page"`. It shows in `neon-ink` with a `neon` underline.
- Nav labels are single words in sentence case: Work, Writing, About, Ideas, Contact. A link that leaves the site carries hidden text such as "(notes site)".
- On phones the nav wraps below the logo. There is no hamburger menu: five links fit.
- The header sits on `paper` with a `line` hairline below. It is not sticky.
