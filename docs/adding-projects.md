# Adding a project

The Garage (`/garage/`) builds its cards and filters from `src/content/projects/`.
The highest-priority entry with `featured: true` and `status: live` appears on both
the homepage and the Garage. No layout edits are needed for each new project.

1. For a self-contained HTML experience, place its files in
   `public/projects/<slug>/`, with an `index.html`. Use relative asset paths or
   paths prefixed with `/projects/<slug>/`. Include a link back to `/garage/`.
   Apps requiring a server must be adapted to this static GitHub Pages hosting
   or deployed separately; secrets must never go in public files.
2. Copy `src/content/projects/worldview.md` to `<slug>.md`. Update the title,
   descriptions, dates, category, status, and `liveUrl`. Keep all required fields.
   Categories: `data tool`, `web app`, `research`, `automation`, `writing`.
   Statuses: `live`, `brewing`, `parked`. Only live projects can be featured.
3. Add a cover to `public/images/projects/` and set `image` to its URL, or omit
   `image` for an automatically generated numbered card. Set `priority` to control
   order. Worldview uses 120; a higher featured priority replaces the lead card.
4. Run `npm ci` and `npm run build`. Preview desktop and mobile, check the project
   links and filters, and open a pull request. Merging to `master` triggers the
   existing GitHub Pages deployment.

Worldview lives entirely in `public/projects/worldview/index.html`. Its hash-based
atlas navigation works on GitHub Pages and has no dependency on the original
Sites project or a ChatGPT login. Preserve its sources and evidence labels when
editing its content. Its original Sites publication is managed separately.
