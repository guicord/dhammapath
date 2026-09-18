# Dhamma Map Requirements Analysis

## Overview
This document extracts the requirements from the HTML file at `input/dhamma-map.html`.

The file describes a single-page, interactive educational web page titled “Dhamma map” that presents Buddhist teachings as a visual flow and learning map.

## Product purpose
The page is intended to:
- present core Buddhist concepts in a clear, visual format
- help users understand the relationship between suffering, craving, the path, and liberation
- support learning through interactive exploration rather than dense text blocks

## Functional requirements

### Core content requirements
The page must include:
- the title and subtitle: “Dhamma map” and “The path to happiness”
- the Three Marks of Existence:
  - Anicca
  - Dukkha
  - Anattā
- the Four Noble Truths:
  - Dukkha
  - Samudaya
  - Nirodha
  - Magga
- the Noble Eightfold Path grouped into:
  - Wisdom
  - Ethical conduct
  - Concentration
- supporting concepts:
  - 5 Aggregates
  - 5 Precepts
  - 5 Hindrances
  - 3 Unwholesome roots
  - 10 Fetters
  - 4 Divine Abodes
  - Fruits of the path
  - Liberation / Nibbāna

### Interactivity requirements
The page must support:
- hover or tap on underlined terms to reveal explanatory tooltips
- clickable flip cards that turn over to reveal additional information
- page navigation between two screens/pages
- next/previous page controls
- keyboard support for navigation and tooltip interaction
- touch/swipe navigation for mobile users
- reduced-motion handling for accessibility

### Visual structure requirements
The page must include:
- a masthead with a lotus emblem
- colored sections using distinct semantic themes for different topics
- arrows connecting major conceptual sections
- a central “goal” / “Liberation” callout at the end of page 1
- a second page focused on dependent origination and the wheel of becoming

## UX and accessibility requirements
The interface should:
- be readable on desktop and mobile screens
- use clear visual grouping by color and card style
- provide focus states for keyboard users
- include labels and accessible text for interactive SVG elements
- respect `prefers-reduced-motion` when motion is disabled
- keep content understandable without needing a backend or user login

## Technical constraints evident in the file
From the implementation, the app:
- is a client-side SPA-like HTML page
- uses plain HTML, CSS, and JavaScript
- has no database or server dependency
- runs in the browser as a static document
- includes inline CSS and JS rather than separate app modules

## Requirements summary
If this were converted into product requirements, they could be phrased as:

- The system shall present Buddhist teaching concepts in a visually structured educational map.
- The system shall allow users to explore concepts through expandable cards and explanatory tooltips.
- The system shall support both desktop and mobile browsing.
- The system shall provide previous/next navigation across conceptual pages.
- The system shall offer accessible keyboard and reduced-motion support.
- The system shall use a calm, readable visual language to present spiritual content without clutter.

## Scope and out-of-scope
Likely out of scope:
- user accounts or saved progress
- search/filtering across terms
- CMS/content management
- backend APIs
- translations or audio narration

## Conclusion
The file defines a static, educational, interactive concept map with strong emphasis on visual clarity, layered content exploration, and accessibility. It does not represent a traditional application with data storage or user workflows; instead, it is a literature/teaching presentation page built around guided conceptual discovery.
