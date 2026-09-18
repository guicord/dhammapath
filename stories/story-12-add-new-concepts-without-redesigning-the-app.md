# Story 12: Add new concepts without redesigning the app

## User story
As a product owner, I want concepts stored in a structured database so that new teachings can be added without rebuilding the app.

## Acceptance criteria
- Each concept exists as a data record with title, explanation, related concepts, and source references.
- New concepts can be added without rewriting the main visual map from scratch.
- New concepts can be linked to existing concepts using the relationship model.
- The app can render the new concept in the map and detail view after data update.

## Notes
- This is the key maintainability story.
- It protects the app from becoming a fragile static artifact.
