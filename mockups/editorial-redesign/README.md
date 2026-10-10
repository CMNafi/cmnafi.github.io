# C M Nafi — editorial redesign mockups

Three working, responsive mockups: the blog front page, **Era** at `/era/`, and **Bookmarks** at `/bookmarks/`.

## Run locally

Requires Node.js 18 or newer. No dependency installation or build step.

```sh
npm start
```

Open http://127.0.0.1:4173. Era and Bookmarks are accessible from the navigation. To use another port, set `PORT` before running the server.

## Design and behavior

- A warm editorial visual system: cream paper, serif headlines, brick red accents, original SVG illustrations.
- A journal front page with existing essays and links to Era and Bookmarks. **CAIA Corner and World Cup are off the front page and included in Era.**
- Era contains 10 verified public projects/ideas, organized into Projects and Ideas. Companies has an intentional empty state until business names are supplied.
- Bookmarks has 12 verified open-source projects, search, category filters, grid/list views, and a saved shelf stored in the current browser. The selection is curated, not a live star ranking.
- Theme switching and accessible controls. Search shortcut: `/`. Saved items and preferences persist locally.
- Article, project, GitHub, and contact links point to real destinations.

Google Fonts is optional; the design uses local fallback fonts when offline. Illustrations and application code are included. Icons in the open-source collection are editorial lettermarks, not official brand logos.

## Desktop Codex handoff

Open this folder in desktop Codex and use the instructions in `HANDOFF.md`. This folder is a standalone prototype, separate from the existing Astro source. The deployed cmnafi.com site has not been changed.
