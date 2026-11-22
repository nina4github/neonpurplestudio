# FormField

A labelled input with an optional hint and an inline error, plus the status box for form-level errors and confirmations.

**Provide:**
- `<div class="np-field">` with a `<label class="np-field__label" for>` and an `<input class="np-input">` or `<textarea class="np-input">` with a matching `id`;
- the right `type` and `autocomplete`;
- `aria-describedby` pointing at the hint and error ids.

- **Hint:** `np-field__hint` in `ink-muted`, above the input.
- **Error:** set `aria-invalid="true"` on the input (a 2px `danger` border) and show `np-field__error` below it. Write what to do, not what went wrong ("Enter an email address like name@example.com").
- **Error summary:** on submit, put `np-form-status np-form-status--error` with `role="alert"` and `tabindex="-1"` above the form, move focus to it, and link each error to its field.
- **Success:** `np-form-status np-form-status--success` with `role="status"` replaces the form after sending.
- Name, email and message are required. Anything else is optional and labelled "(optional)"; don't mark required fields with *
- Borders use `line-strong` (3:1 or more in both themes). Never use the decorative `line` on inputs.
