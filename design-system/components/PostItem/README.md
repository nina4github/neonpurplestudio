# PostItem

One entry in a list of writing: date, linked title and a one-line description, as `np-post` items inside `<ul class="np-posts">`.

**Provide:** a `<time class="np-post__date" datetime="YYYY-MM-DD">`, an `<h3 class="np-post__title">` (or the level that fits the page) containing an `<a>`, and an optional `np-post__desc` paragraph.

- The date is in the `code` style in `ink-muted`, in a 9rem column; on phones it stacks above the title.
- Rows are separated by `line` hairlines. Don't add cards or shadows; this list is meant to be read quickly.
- Newest first. Write dates as "21 Nov 2026".
