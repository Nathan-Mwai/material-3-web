# Memory — Material 3 Workbench Minimalist Redesign & Buttons Actualization

Last updated: 2026-09-17 11:00 UTC

## What was built

- **Minimalist Workbench Home**:
  - Implemented the warm golden canvas (`#fbf2e3`) with ambient radial gradients and soft circular bokeh discs.
  - Added minimalist header with Google "G" pill badge, crisp title, and horizontal category filters (`All`, `Actions`, `Inputs`, `Selection`, `Chips`, `Feedback`, `Motion`).
  - Added floating corner actions: `↗ Visit docs` (bottom-left) and theme palette cycler (bottom-right).
- **MinimalCard (`src/components/MinimalCard.tsx`)**:
  - 32px rounded cards in soft pastel tints (`#F7F4FE`, `#FFF6EB`, `#F1F8EE`, `#FEFCE9`, `#EDF4FD`, `#FDF1F3`).
  - Interactive bookmark toggle button, prominent title + `→` arrow, live center micro-preview, pagination dots (`••••`), and bottom footer with Google G logo, title, and solid black `View` pill button.
- **Dedicated Button Studio (`src/components/buttons/ButtonStudio.tsx`)**:
  - Full-screen interactive component studio accessible via `View` or `#/components/buttons`.
  - **Live Props Playground**: Controls for label text, disabled toggle, leading/trailing icon toggles, 8 icon options, container height tokens (40dp standard / 44dp touch / 48dp large), and corner radius tokens (Pill / 12dp / 8dp).
  - **Live Hierarchy Matrix**: Real-time side-by-side comparison of Filled, Tonal, Elevated, Outlined, and Text buttons reacting to live props and click feedback.
  - **Specialized Buttons Playground**: Extended FAB, Lowered FAB, and 4 Icon Button variants.
  - **Dynamic Code Generator**: Instant copy-ready snippets for React TSX, HTML Web Component, and CSS Custom Properties.
- **Button Learning Guide (`src/components/buttons/README.md`)**:
  - Comprehensive M3 documentation covering button hierarchy, visual anatomy (40dp/20dp/48dp), attributes, slots, events, tokens, framework integration recipes (Vite, React TypeScript, Next.js App Router SSR), and Do's/Don'ts.
- **Root README.md (`README.md`)**:
  - Added **Component Inventory & Learning Guides Table** tracking tags, status, and documentation links.

## Decisions made

- **Hybrid Navigation Architecture**: The homepage remains a minimalist, clean 3-column card grid for rapid visual scanning; clicking `View` or navigating to `#/components/buttons` transitions smoothly into a full-screen Component Studio.
- **Self-Contained Component Directories**: Each component family lives under `src/components/<name>/` with its own `README.md`, studio, and types to serve as an enduring learning reference.
- **Framework Integration**: Focus on demystifying Google Material Web components across React, Vite, and Next.js (SSR client component handling).

## Problems solved

- Resolved Vite Rolldown `[MISSING_EXPORT]` build issue by using explicit TypeScript type imports (`import type { ComponentId }`).
- Built and served the production bundle cleanly via `vite preview` on port 5173.

## Current state

- **Buttons Family**: 100% Actualized (Live Studio + Props Playground + Dedicated `README.md` + Route `#/components/buttons`).
- **Workbench Application**: Clean build (0 errors) running at `http://localhost:5173`.
- **Remaining Components in Queue**: Inputs & Forms, Selection Controls, Chips & Tags, Progress & Dialogs, Spring Motion.

## Next session starts with

- Actualize the **Text Fields & Forms Family** (`src/components/inputs/`):
  1. Create `src/components/inputs/README.md` covering `<md-outlined-text-field>`, `<md-filled-text-field>`, and `<md-outlined-select>`.
  2. Build `src/components/inputs/InputStudio.tsx` with live prop toggles for label, supporting text, error state, counter, and prefix/suffix icons.
  3. Wire route `#/components/inputs` and update the root README inventory table.

## Open questions

- None. Architecture, layout standards, and directory conventions are confirmed and locked.
