# Writing technology history

Technology history is a separate page at `/technology-history/`, reached through a navigation link. The existing homepage and biography are preserved; the atlas is not showcased on the homepage.

Articles use the existing `src/content/field-notes/` collection, so they appear in Field Notes and the history reading room. Create an MDX file with the usual article fields plus:

```yaml
category: Technology History
historyNodes: [bell-labs, transistor]
draft: true
```

Provide `title`, `description`, `publishedAt`, `excerpt`, and `readingTime` as with other Field Notes. Publish by setting `draft: false`. The atlas node index automatically lists published essays linked to each node. No example essay has been published on the author's behalf.

The graph lives in `src/data/technology-history.ts`. Each node has a permanent ID, name, kind (`company`, `person`, or `product`), era, summary, source URL, and percentage coordinates. Each directed edge has `from`, `to`, a relationship label, and a source URL. Article node references are validated against this data automatically. Keep labels specific and cite every relationship.

The reusable `HistoryMap.astro` renders keyboard-operable nodes, highlights adjacent connections, and shows related nodes in its detail panel. The history page includes a permanent node index and a no-JavaScript relationship list. The first cluster uses Nobel Prize sources on Bell Labs and the transistor. Larger networks will need clustering and layout work.
