# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

This is a static frontend app with no build process. To run locally:

```bash
# Python 3
python -m http.server 8000
# Then open http://localhost:8000
```

Or open `index.html` directly in a browser. No installation, package manager, or build step required.

## Architecture

The app uses a strict two-layer separation:

- **`js/storage.js`** — Data layer only. `BucketStorage` is a plain object (not a class) with methods that read/write directly to `localStorage['bucketList']`. Every method that mutates data calls `load()` and `save()` internally — there is no in-memory cache.

- **`js/app.js`** — UI layer only. `BucketListApp` is an ES6 class instantiated as `window.app` on `DOMContentLoaded`. It never touches `localStorage` directly; all data goes through `BucketStorage`. After any mutation, it calls `this.render()` which fully re-renders the list via `innerHTML`.

- **`index.html`** — Inline event handlers in dynamically generated HTML (e.g., `onclick="app.handleToggle('${item.id}')"`) rely on `app` being a global. This is intentional — do not scope `app` to a module.

- **`css/styles.css`** — Supplements Tailwind CDN. Tailwind utility classes are used directly in HTML; `styles.css` only adds what Tailwind can't handle (animations, `.filter-btn.active` state, dark mode via `prefers-color-scheme`, mobile overrides).

## Key Conventions

- **Filter state** is held in `app.currentFilter` ('all' | 'active' | 'completed') and applied at render time via `BucketStorage.getFilteredList()`.
- **Item IDs** are `Date.now().toString()` — timestamp strings, not numbers.
- **`createdAt` / `completedAt`** are full ISO strings (`new Date().toISOString()`), but displayed via `toLocaleDateString('ko-KR')`.
- **XSS prevention**: Always use `this.escapeHtml()` before inserting user-supplied text into HTML. When passing titles into inline `onclick` attributes, also escape single quotes with `replace(/'/g, "\\'")`.
- **Modal visibility** is toggled by swapping `hidden`/`flex` Tailwind classes on `#editModal` — not CSS display properties directly.
- UI language is Korean throughout (labels, alerts, comments).
