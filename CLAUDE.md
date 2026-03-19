# CLAUDE.md — Site Guide for C M Nafi's Personal Website

## Overview
This is a static HTML/CSS personal website hosted on GitHub Pages at **cmnafi.com**.
Pushing to `master` automatically triggers deployment via GitHub Actions (`.github/workflows/deploy.yml`).

---

## Site Structure

```
/index.html               — Homepage (hero + directory cards)
/about/about.html         — About / bio page
/blog/index.html          — Blog directory
/projects/index.html      — Projects directory
/adventures/index.html    — Adventures directory
/programs/programs.html   — Legacy programs page (linked from projects)
/programs/todoList/       — Todo list app
/css/styles.css           — Main stylesheet (used by all modern pages)
/js/scripts.js            — Main script (sets current year in footer)
```

---

## Navigation

Every page uses the same topbar nav pattern. When adding a new page, add it to **all** of the following files:

- `index.html`
- `blog/index.html`
- `projects/index.html`
- `adventures/index.html`
- `about/about.html`

Nav links use relative paths (e.g., `../projects/index.html` from subdirectories, `projects/index.html` from root).

---

## Adding a New Project

1. Open `projects/index.html`
2. Add a new `<a class="directory-card">` block inside `.directory-grid`
3. Use the tab label to categorize it (e.g., `regulatory`, `tool`, `app`)

Example card:
```html
<a class="directory-card" href="YOUR_LINK" target="_blank" rel="noopener noreferrer">
    <span class="directory-tab">category</span>
    <h3>Project Name</h3>
    <p>Short description of the project.</p>
    <span class="directory-link">Open app →</span>
</a>
```

---

## Adding a Blog Post

1. Create a new `.html` file in `/blog/` (e.g., `blog/my-post.html`)
2. Use the same page shell and topbar as other pages
3. Link to it from `blog/index.html`

---

## Styling

All modern pages use `css/styles.css`. Do **not** use Bootstrap — it's only present in legacy files (`programs/programs.html`).

Key CSS classes:
- `.page-shell` — full-page wrapper
- `.topbar` / `.topbar-nav` — header and nav
- `.directory-section` — main content area
- `.section-heading` — page title block
- `.directory-grid` — card grid (3-col)
- `.directory-card` / `.is-active` — individual cards
- `.eyebrow` — small label above headings
- `.site-footer` — page footer

---

## How to Publish Updates

After making changes:

```bash
git add <changed files>
git commit -m "Brief description of change"
git push origin master
```

GitHub Actions will automatically deploy to GitHub Pages within ~1 minute.

**Do not use `git add .` or `git add -A`** — always stage specific files to avoid committing `.claude/` or other tool artifacts.

---

## Domain

Custom domain: `cmnafi.com` (configured via `/CNAME` file — do not delete or modify it).
