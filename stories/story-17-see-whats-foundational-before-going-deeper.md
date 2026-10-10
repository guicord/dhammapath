# Story 17: See what's foundational before going deeper

## User story
As a product owner, I want the map itself to signal which sections are foundational versus supporting detail, so that newcomers aren't asked to absorb everything at once.

## Acceptance criteria
- The difficulty level already stored per concept (foundational / intermediate / advanced) is reflected somewhere on the map view, not only on concept detail pages.
- Dense supporting lists (e.g. the Ten Fetters) use the same flip-card pacing pattern already used for the Five Aggregates, Five Precepts, Five Hindrances, and Four Divine Abodes, rather than being fully exposed inline.
- A first-time reader can complete a pass of the map focused on foundational material without being forced to process every supporting list along the way.

## Notes
- Directly addresses story 15's acceptance criterion that the interface "does not overwhelm the learner with too much information at once."
- No new data is required — `difficultyLevel` already exists on the concept model; this is a map-layer presentation gap, not a content gap.
