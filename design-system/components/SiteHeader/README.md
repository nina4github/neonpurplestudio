# SiteHeader

The top of every page: a skip link, the logo wordmark linking home, the main nav and the theme toggle.

**Provide:**
- `<a class="np-skip" href="#main">` as the first element in `<body>`, and `id="main"` on `<main>`;
- the logo as `<img class="np-header__logo">` using `neon-purple-studio-wordmark.svg`, with alt text "Neon Purple studio, home";
- `<nav class="np-nav" aria-label="Main">` with a list of links;
- the ThemeToggle.

- Mark the current section with `aria-current="page"`. It shows in `neon-ink` with a `neon` underline.
- Nav labels are single words in sentence case: Work, Writing, About, Ideas, Contact. A link that leaves the site carries hidden text such as "(notes site)".
- On phones the nav wraps below the logo. There is no hamburger menu: five links fit.
- The header sits on `paper` with a `line` hairline below. It is not sticky.
