# Story 18: See where a concept fits in the bigger picture

## User story
As a product owner, I want each concept page to show where that concept sits within the map's structure, so that a learner who arrives via a deep link doesn't lose the thread back to the overview.

## Acceptance criteria
- A concept page shows which category (and, where applicable, which grouping such as a factor of the Eightfold Path) the concept belongs to.
- This context is visible without the learner needing to already know the map's structure.
- The context links back to the relevant part of the map or category, not just to the map's root.

## Notes
- Closes a gap in story 6's "move through a concept sequence without getting lost" criterion — prerequisite/leads-to links exist today, but nothing currently orients a learner within the overall map.
- Can reuse the existing `category` field for a first pass; a finer-grained parent grouping (e.g. which Eightfold Path factor) is a reasonable stretch addition if it needs new data.
