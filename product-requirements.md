# Dhamma Learning App — Product Requirements

## 1. Product vision

We are building a Dhamma learning app that helps people understand core Buddhist teachings in a clear, structured, and practical way.

The app should feel both intellectually grounded and approachable. It should help users explore the relationship between core concepts, engage with the teachings in a guided way, and check their understanding through interactive learning tools.

The product is rooted in Theravada teachings and should offer direct links to canonical or trusted reference texts so that users can study the source material as well as summary explanations.

## 2. User-centric view

### Primary users
- People who are curious about the Dhamma and want a clear overview of the teachings
- Beginners who need a structured way to learn core concepts
- Learners who want to study specific ideas and understand how they connect to other teachings
- Users who want to check their understanding with quizzes and review activities
- Users who want to read the source texts directly, not only summaries

### User needs
- Understand the core teachings without being overwhelmed
- See how concepts relate to each other
- Learn progressively rather than reading everything at once
- Review what they have learned
- Connect teaching summaries to primary source texts
- Build confidence through interactive assessment
- Return to the material over time and track learning progress

### Product promise
The app should help users learn the Dhamma in a way that is structured, clear, engaging, and grounded in reliable teachings and source references.

## 3. Product concept

The app combines two complementary layers:

1. A polished static concept map for the main overview experience
2. A structured, expandable database of concepts for learning, relationships, progress tracking, and source references

The static map is the curated visual layer that gives the product its identity and educational clarity. The database is the scalable content layer that allows the app to grow beyond a one-off mini app.

This hybrid model keeps the product visually appealing while remaining maintainable and expandable.

## 4. Core requirements

### 4.1 Static concept-map experience
The application shall include a polished concept map that presents major Dhamma ideas in a visually structured layout.

Requirements:
- The map shall use a handcrafted visual design with SVG/HTML/CSS styling.
- The map shall remain visually curated and intentionally designed rather than fully generated from a generic graph tool.
- The map shall group concepts by theme, such as:
  - suffering and truth
  - path and practice
  - concentration and meditation
  - ethics and conduct
  - liberation and awakening
- The map shall support conceptual flow and visual guidance between related teachings.
- The map shall provide a clear teaching overview without requiring users to read a long text first.

### 4.2 Expandable concept database
The application shall maintain a structured database of Dhamma concepts that can be expanded over time.

Each concept shall contain:
- unique identifier
- title
- Pali term
- English translation or label
- short summary
- fuller explanation
- category
- difficulty level
- related concepts
- prerequisites
- tags
- canonical source references
- optional quiz metadata

Requirements:
- New concepts shall be easy to add without redesigning the interface.
- Concepts shall be stored independently and linked to other concepts.
- The database shall support many-to-many or one-to-many concept relationships.
- A concept may derive from multiple parent concepts.

### 4.3 Concept relationships
The application shall support concept-to-concept linking in a data model.

Examples:
- Concept A → A1, A2, A3
- Concept B → B1, B2, A2
- A2 derives from both A and B

Requirements:
- The system shall store concept relationships explicitly in data.
- Related concepts shall be displayed on concept pages and in relevant map contexts.
- Relationships shall be used to support educational navigation and progression.

### 4.4 Concept pages
Each concept shall have a dedicated detail page or equivalent learning view.

Requirements:
- The page shall include the core concept title and explanation.
- The page shall include a concise summary and deeper teaching context.
- The page shall show related concepts.
- The page shall include source references.
- The page shall include a way for the user to mark the concept as learned.
- The page shall include a quiz or review module if the concept has assessment content.

The detail page should be generated from a reusable template rather than being manually hand-built for every concept.

### 4.5 Learning and interactive assessment
The app shall help users learn through active engagement, not just reading.

Requirements:
- Users shall be able to mark concepts as learned.
- Users shall be able to see progress on their study journey.
- Users shall be able to complete short quizzes per concept or topic.
- Quiz types may include multiple choice, true/false, matching, and short-answer review.
- Users shall receive feedback on answers and review incorrect choices.
- Concepts with lower mastery should reappear in learning or review flows.

### 4.6 Canonical text integration
The app shall connect concepts to canonical Theravada teachings and trusted source material.

Requirements:
- Each concept shall include links to direct, relevant source references.
- The app shall clearly separate summary explanation from primary source material.
- A concept page shall contain a “Read the source” or equivalent section.
- Source links shall be attributed to reputable Theravada references and translations.
- The app shall support easy addition of new source links as the content grows.

### 4.7 User accounts and progress tracking
The application shall support free accounts for users.

Requirements:
- Users shall be able to create an account.
- Users shall be able to sign in and maintain personal progress.
- Users shall be able to track concepts they have mastered.
- Users shall be able to see their study history or quiz attempts.
- Free accounts shall include access to foundational learning content.
- The product architecture shall support future premium or advanced features without redesigning the core system.

## 5. Non-functional requirements

### Accessibility
- The app shall support keyboard navigation.
- Focus states shall be visible on interactive controls.
- Labels and text shall be readable and intuitive.
- The UI shall remain usable on mobile and desktop screens.
- Reduced-motion preferences shall be respected.

### Maintainability
- The static map and the data model shall remain separate.
- The app shall be easy to extend with more concepts, links, and learning paths.
- New content shall not require rewriting the entire interface.

### Performance
- Content pages and concept details shall load efficiently.
- Relationship queries and quiz data shall be optimized for responsive access.
- The app shall support straightforward scaling as the concept library grows.

### Trust and reliability
- Source references shall be clearly documented and attributed.
- Interpretive explanations shall be mindful of doctrinal nuance and not oversimplify complex teachings.
- Content updates shall be manageable and traceable.

## 6. Architecture

### Architecture summary
The project shall use a hybrid architecture composed of:

1. A curated static visual map layer
2. A dynamic concept database and backend API
3. A user-auth and progress layer
4. A learning and quiz layer
5. A source-reference layer

### Recommended stack
- Frontend: Next.js or equivalent modern frontend framework
- Styling: custom CSS, CSS variables, or a lightweight design system
- Static map rendering: HTML + CSS + SVG
- Backend/API: Next.js API routes or a lightweight server layer
- Database: PostgreSQL or equivalent relational database
- Authentication: Supabase Auth or equivalent
- Hosting: Vercel or equivalent deployment

### Architectural principles
- The visual map is a product presentation layer, not the master data source.
- The concept database is the source of truth for content and relationships.
- Concept pages are generated from reusable templates.
- User progress and quiz results are stored separately from content.
- Source references remain connected to the concept model rather than being embedded only in static pages.

### Example app flow
- User opens the main concept map page.
- User clicks a concept in the map or concept list.
- The app fetches that concept’s data from the database.
- The app renders the concept page from a reusable template.
- The page displays explanation, related concepts, source references, and quiz content.
- The user marks the concept as learned or completes a quiz.
- Progress is stored in the user data layer.

## 7. Proposed MVP scope

For the first version, the app should focus on the following:
- curated concept map overview
- core concept database
- concept detail pages
- related concept links
- direct source-text references
- free account system
- progress tracking for learned concepts
- basic quiz for concept understanding

This creates a useful learning product without requiring a large, overly complex initial build.

## 8. Future-phase ideas
Once the core app is working, it can expand into:
- guided learning paths
- spaced repetition review
- concept map filter views
- deeper study journeys by topic
- flashcards and reflection prompts
- progress dashboards
- community or teacher discussion features

## 9. Product summary

The app shall help users understand Dhamma concepts visually, learn them progressively, verify understanding interactively, and connect the teachings to canonical Theravada source texts.

The key design decision is to keep the polished static concept map while building the real data and logic on a structured concept database. This gives the app both aesthetic quality and long-term scalability.

## 10. Story-ready summary

As a learner, I want a visually rich Dhamma learning app that presents concepts as a map, explains each concept clearly, links related teachings, lets me mark concepts as learned, and connects me directly to the canonical texts so that I can learn and grow in a structured, practical, and trustworthy way.
