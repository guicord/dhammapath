# Story 19: Look up a concept by name

## User story
As a product owner, I want learners to be able to find any concept directly by name, so that the already-expandable concept database is actually reachable rather than limited to what the curated map happens to link to.

## Acceptance criteria
- An index page lists all concepts, browsable by category and/or alphabetically.
- Every concept in the database is reachable from this index, including ones not (yet) placed on the curated map.
- The index is reachable from both the map view and concept detail pages.

## Notes
- Supports the PRD's "learners who want to study specific ideas" need and the "expandable concept database" principle (PRD §3) — today the data layer can grow independently of the map, but there's no way to browse that growth.
- Does not require search or filtering infrastructure to deliver initial value; a plain list satisfies this story.
