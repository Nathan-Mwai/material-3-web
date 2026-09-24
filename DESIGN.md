---
version: alpha
name: material-3-design
description: The design language for Material 3 Design — a shadcn-style registry where developers browse, preview, and install Material 3 components as source code they own. The site dogfoods its own components: a tonal, softly-tinted surface system built on the Material 3 baseline scheme, Roboto typography on the official M3 type scale, the M3 shape scale (pill buttons, 12–28 px containers), state layers instead of hover hacks, and motion that feels physical but never loud. Minimal visual noise; the components are the hero.

colors:
  primary: "#6750A4"
  on-primary: "#FFFFFF"
  primary-container: "#EADDFF"
  on-primary-container: "#21005D"
  secondary: "#625B71"
  on-secondary: "#FFFFFF"
  secondary-container: "#E8DEF8"
  on-secondary-container: "#1D192B"
  tertiary: "#7D5260"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#FFD8E4"
  on-tertiary-container: "#31111D"
  error: "#B3261E"
  on-error: "#FFFFFF"
  error-container: "#F9DEDC"
  on-error-container: "#410E0B"
  surface: "#FEF7FF"
  on-surface: "#1D1B20"
  on-surface-variant: "#49454F"
  surface-container-lowest: "#FFFFFF"
  surface-container-low: "#F7F2FA"
  surface-container: "#F3EDF7"
  surface-container-high: "#ECE6F0"
  surface-container-highest: "#E6E0E9"
  outline: "#79747E"
  outline-variant: "#CAC4D0"
  inverse-surface: "#322F35"
  inverse-on-surface: "#F5EFF7"
  inverse-primary: "#D0BCFF"
  scrim: "#000000"
  shadow: "#000000"

# Dark scheme — same role names, swapped values. Components always reference the role, never the hex.
colors-dark:
  primary: "#D0BCFF"
  on-primary: "#381E72"
  primary-container: "#4F378B"
  on-primary-container: "#EADDFF"
  secondary: "#CCC2DC"
  on-secondary: "#332D41"
  secondary-container: "#4A4458"
  on-secondary-container: "#E8DEF8"
  tertiary: "#EFB8C8"
  on-tertiary: "#492532"
  tertiary-container: "#633B48"
  on-tertiary-container: "#FFD8E4"
  error: "#F2B8B5"
  on-error: "#601410"
  error-container: "#8C1D18"
  on-error-container: "#F9DEDC"
  surface: "#141218"
  on-surface: "#E6E0E9"
  on-surface-variant: "#CAC4D0"
  surface-container-lowest: "#0F0D13"
  surface-container-low: "#1D1B20"
  surface-container: "#211F26"
  surface-container-high: "#2B2930"
  surface-container-highest: "#36343B"
  outline: "#938F99"
  outline-variant: "#49454F"
  inverse-surface: "#E6E0E9"
  inverse-on-surface: "#322F35"
  inverse-primary: "#6750A4"
  scrim: "#000000"
  shadow: "#000000"

typography:
  display-large:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 57px
    fontWeight: 400
    lineHeight: 64px
    letterSpacing: -0.25px
  display-medium:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 45px
    fontWeight: 400
    lineHeight: 52px
    letterSpacing: 0px
  display-small:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 36px
    fontWeight: 400
    lineHeight: 44px
    letterSpacing: 0px
  headline-large:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 32px
    fontWeight: 400
    lineHeight: 40px
    letterSpacing: 0px
  headline-medium:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 28px
    fontWeight: 400
    lineHeight: 36px
    letterSpacing: 0px
  headline-small:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 24px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0px
  title-large:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 22px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  title-medium:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 0.15px
  title-small:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0.1px
  body-large:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0.5px
  body-medium:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0.25px
  body-small:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0.4px
  label-large:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0.1px
  label-medium:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.5px
  label-small:
    fontFamily: Roboto, system-ui, -apple-system, Segoe UI, sans-serif
    fontSize: 11px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.5px
  code:
    fontFamily: Roboto Mono, ui-monospace, SFMono-Regular, Menlo, monospace
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  lg-increased: 20px
  xl: 28px
  xl-increased: 32px
  2xl: 48px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  5xl: 96px

components:
  top-app-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.title-large}"
    height: 64px
    padding: "{spacing.sm} {spacing.lg}"
  nav-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 40px
    padding: "0 {spacing.lg}"
  search-bar:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-large}"
    rounded: "{rounded.full}"
    height: 56px
    padding: "0 {spacing.lg}"
  button-filled:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 40px
    padding: "0 {spacing.xl}"
  button-tonal:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 40px
    padding: "0 {spacing.xl}"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    borderColor: "{colors.outline}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 40px
    padding: "0 {spacing.xl}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 40px
    padding: "0 {spacing.md}"
  button-elevated:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.primary}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 40px
    padding: "0 {spacing.xl}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
    height: 40px
    padding: "{spacing.sm}"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    borderColor: "{colors.outline}"
    typography: "{typography.label-large}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: "0 {spacing.md}"
  chip-filter-selected:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    typography: "{typography.label-large}"
    rounded: "{rounded.sm}"
    height: 32px
    padding: "0 {spacing.md}"
  tabs-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.title-small}"
    height: 48px
    padding: "0 {spacing.lg}"
  component-card:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  preview-pane:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.outline-variant}"
    rounded: "{rounded.lg}"
    padding: "{spacing.2xl}"
  code-block:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.on-surface}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  install-command:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.on-surface}"
    typography: "{typography.code}"
    rounded: "{rounded.full}"
    height: 48px
    padding: "0 {spacing.sm} 0 {spacing.xl}"
  docs-nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 56px
    padding: "0 {spacing.lg}"
  docs-nav-item-active:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    height: 56px
    padding: "0 {spacing.lg}"
  props-table:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.outline-variant}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.md}"
    padding: "{spacing.md} {spacing.lg}"
  text-field-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.outline}"
    typography: "{typography.body-large}"
    rounded: "{rounded.xs}"
    height: 56px
    padding: "0 {spacing.lg}"
  theme-builder:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  snackbar:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.xs}"
    height: 48px
    padding: "0 {spacing.lg}"
  hero-band:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.display-large}"
    padding: "{spacing.5xl} {spacing.xl}"
  content-band:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-large}"
    padding: "{spacing.4xl} {spacing.xl}"
  footer:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.body-small}"
    padding: "{spacing.3xl} {spacing.xl}"

---


## Overview

Material 3 Design is a registry, not a package. Like shadcn/ui, a developer finds a component, sees it working, runs one command, and the source lands in their project as files they own. The hard part of Material 3 on the web today is that its official implementation is difficult to adopt and no longer moving fast, so the site's job is to make the *getting* of a component feel trivial: find, preview, copy or install, done.

The site is built out of the thing it sells. Every button, chip, tab, card, text field and snackbar on the page is a Material 3 Design component, so the site is a live proof of quality. Nothing on the page is decoration that a visitor can't install.

The visual posture is calm. Surfaces are quiet tonal tints of the seed color (`{colors.surface}` `#FEF7FF` in light, `#141218` in dark) stepped through the five `surface-container` roles, never bordered boxes stacked on white. Colour is used for meaning: `{colors.primary}` marks the single most important action on a screen, `{colors.secondary-container}` marks selection, and `{colors.tertiary-container}` is reserved for rare accents. Type is Roboto on the official M3 scale. Shapes are the M3 shape scale: pills for actions, 12–16 px for containers, 28 px for large surfaces.

**Key Characteristics:**
- **Tonal surfaces, not shadows.** Depth comes from moving up the `surface-container-*` ladder. Drop shadows appear only on floating elements (menus, dialogs, snackbars).
- **One filled button per view.** `button-filled` is the primary action; everything else is tonal, outlined, or text.
- **State layers everywhere.** Hover, focus, press and drag are semi-transparent overlays of the content colour, never a swap to a different colour.
- **Pill actions, soft containers.** Buttons, search, nav items are `{rounded.full}`; cards are `{rounded.lg}`; large panels are `{rounded.xl}`.
- **Roles, not hex.** Components reference colour roles. The whole site re-themes from a single seed colour, light or dark, and users can generate their own scheme in the Theme Builder.
- **The preview is the product.** Component pages lead with a live, interactive preview at full fidelity (every state and variant), then the install command, then code.

## Colors

The default scheme is the Material 3 baseline generated from seed `#6750A4`. The full role set ships in both light (`colors`) and dark (`colors-dark`); the same role name resolves to a different value per scheme.

### Brand & Accent
- **Primary** (`{colors.primary}` — `#6750A4` light / `#D0BCFF` dark): The single high-emphasis colour. Filled buttons, active tab indicator, focus rings, links, the seed of the whole scheme.
- **Primary Container** (`{colors.primary-container}` — `#EADDFF`): Low-drama emphasis fills — hero highlight chips, the selected state of large surfaces, the featured component card.
- **Secondary / Secondary Container** (`{colors.secondary}` `#625B71`, `{colors.secondary-container}` `#E8DEF8`): Supporting UI. Tonal buttons, selected chips, the active docs-nav item.
- **Tertiary / Tertiary Container** (`{colors.tertiary}` `#7D5260`, `{colors.tertiary-container}` `#FFD8E4`): A contrasting accent used sparingly — a "New" badge, a highlight in the theme builder. Never for primary actions.

### Surface
- **Surface** (`{colors.surface}`): The page background.
- **Surface Containers** (`lowest` → `highest`: `#FFFFFF`, `#F7F2FA`, `#F3EDF7`, `#ECE6F0`, `#E6E0E9` in light): The five-step elevation ladder.
  - `lowest` — preview panes (so components render on the cleanest background).
  - `low` — component cards, elevated buttons.
  - `container` — footer, theme builder panel, navigation surfaces.
  - `high` — search bar, menus.
  - `highest` — code blocks and the install command.
- **Inverse Surface** (`{colors.inverse-surface}`): Snackbars and tooltips.

### Text & Outline
- **On Surface** (`{colors.on-surface}` — `#1D1B20`): Default text.
- **On Surface Variant** (`{colors.on-surface-variant}` — `#49454F`): Secondary text, icons, inactive nav.
- **Outline** (`{colors.outline}` — `#79747E`): Outlined button and text-field borders, chip borders.
- **Outline Variant** (`{colors.outline-variant}` — `#CAC4D0`): Decorative dividers, table rules, the preview pane border.

### Semantic
- **Error** (`{colors.error}` `#B3261E`, `{colors.error-container}` `#F9DEDC`): Validation and destructive states, used in component previews. The site chrome itself rarely needs it.
- There is no dedicated success or warning role in Material 3. Where a component needs one, it's defined as a documented custom extension of the scheme, never an ad-hoc green.

### Contrast rules
- Text on any `*-container` uses the matching `on-*-container` role. Never mix roles across pairs.
- Body text on `{colors.surface}` passes WCAG AA (4.5:1) with `on-surface` and `on-surface-variant`; keep this true when users supply a custom seed. The Theme Builder warns when a generated scheme falls below AA.

## Typography

### Font Family
Two faces:
1. **Roboto** for every display, headline, title, body and label role. Roboto is the M3 reference face and is freely loadable from Google Fonts. Weights 400 and 500 are the working pair.
2. **Roboto Mono** for install commands, code blocks and inline code. Weight 400 only.

Google's proprietary brand faces aren't used. Component authors can swap the family through the `--font-sans` / `--font-mono` variables; the scale stays fixed.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-large}` | 57px | 400 | 64px | -0.25px | Home hero headline. |
| `{typography.display-medium}` | 45px | 400 | 52px | 0 | Hero on inner pages. |
| `{typography.display-small}` | 36px | 400 | 44px | 0 | Large section statements. |
| `{typography.headline-large}` | 32px | 400 | 40px | 0 | Section headlines. |
| `{typography.headline-medium}` | 28px | 400 | 36px | 0 | Component page title. |
| `{typography.headline-small}` | 24px | 400 | 32px | 0 | Sub-section titles. |
| `{typography.title-large}` | 22px | 400 | 28px | 0 | Top app bar title, card titles. |
| `{typography.title-medium}` | 16px | 500 | 24px | 0.15px | List and table headers. |
| `{typography.title-small}` | 14px | 500 | 20px | 0.1px | Tabs. |
| `{typography.body-large}` | 16px | 400 | 24px | 0.5px | Lead paragraphs, search input. |
| `{typography.body-medium}` | 14px | 400 | 20px | 0.25px | Default body and docs prose. |
| `{typography.body-small}` | 12px | 400 | 16px | 0.4px | Captions, footer. |
| `{typography.label-large}` | 14px | 500 | 20px | 0.1px | Buttons, chips, nav items. |
| `{typography.label-medium}` | 12px | 500 | 16px | 0.5px | Badges, table column labels. |
| `{typography.label-small}` | 11px | 500 | 16px | 0.5px | Smallest labels. |
| `{typography.code}` | 13px | 400 | 20px | 0 | Install command, code blocks. |

### Principles
- **Use the M3 scale as-is.** Don't invent in-between sizes; the scale is the spec and the components must match it.
- **Weight carries emphasis, not size jumps.** Display and headline stay at 400; titles and labels step up to 500.
- **Roboto for narrative, Roboto Mono for anything a user might copy.** If it can be pasted into a terminal or file, it's mono.
- **Sentence case everywhere.** Buttons, tabs, headings: "Add to project", not "ADD TO PROJECT".

## Layout

### Spacing System
- **Base unit**: 4 px. All spacing and component dimensions sit on the 4 px grid.
- **Tokens**: `{spacing.xs}` 4 · `{spacing.sm}` 8 · `{spacing.md}` 12 · `{spacing.lg}` 16 · `{spacing.xl}` 24 · `{spacing.2xl}` 32 · `{spacing.3xl}` 48 · `{spacing.4xl}` 64 · `{spacing.5xl}` 96.
- **Section padding**: hero uses `{spacing.5xl}` vertically on desktop; content bands use `{spacing.4xl}`.
- **Card interior**: `{spacing.lg}` for component cards; `{spacing.2xl}` inside preview panes so components have room to breathe and their shadows aren't clipped.

### Grid & Container
- Marketing content centres at roughly 1200 px; docs content column caps at ~720 px for readability.
- Component index: 4-up grid at desktop, 2-up at tablet, 1-up at mobile, with `{spacing.lg}` gutters.
- Component detail: preview pane full width on top; install command and code below; on wide screens a sticky right rail shows "On this page" and the props summary.
- Docs layout: left navigation drawer (280 px) + content + right rail. Below 1024 px the drawer becomes a modal drawer behind a top-app-bar menu button.

### Responsive Strategy (Material window size classes)

| Class | Width | Key Changes |
|---|---|---|
| Compact | < 600px | 1-up grids; modal nav drawer; install command wraps under the title; preview pane goes edge-to-edge. |
| Medium | 600–839px | 2-up grids; navigation rail replaces the drawer. |
| Expanded | 840–1199px | 3-up grids; persistent standard drawer. |
| Large | ≥ 1200px | 4-up grids; drawer + content + right rail. |

#### Touch Targets
Every interactive element has at least a 48 × 48 px target. Visually smaller controls (32 px chips, 40 px buttons) add invisible padding to reach it. This applies to the site *and* to every registry component, and is checked in the component contract below.

#### Collapsing Strategy
- Top app bar: wordmark + nav links + search + theme toggle at Expanded and above; wordmark + search icon + menu at Compact.
- Filter chips: single wrapping row on desktop; horizontal scroll on Compact, with the selected chip scrolled into view.
- Props tables: scroll horizontally inside their own container. The page body never scrolls sideways.

## Elevation & Depth

Elevation is expressed first through **tone** (which `surface-container-*` role a surface uses) and only second through **shadow**.

| Level | Shadow (light scheme) | Use |
|---|---|---|
| Level 0 | none | Page surface, docs prose, hero. |
| Level 1 — 1dp | `0 1px 2px rgb(0 0 0 / .30), 0 1px 3px 1px rgb(0 0 0 / .15)` | Elevated buttons, resting cards when elevated. |
| Level 2 — 3dp | `0 1px 2px rgb(0 0 0 / .30), 0 2px 6px 2px rgb(0 0 0 / .15)` | Top app bar on scroll, menus. |
| Level 3 — 6dp | `0 1px 3px rgb(0 0 0 / .30), 0 4px 8px 3px rgb(0 0 0 / .15)` | Snackbar, floating action buttons. |
| Level 4 — 8dp | `0 2px 3px rgb(0 0 0 / .30), 0 6px 10px 4px rgb(0 0 0 / .15)` | Hover on FAB, dragged cards. |
| Level 5 — 12dp | `0 4px 4px rgb(0 0 0 / .30), 0 8px 12px 6px rgb(0 0 0 / .15)` | Dialogs, the mobile search overlay. |

Rules:
- Default resting surfaces (cards, panes, the code block) use **tone only** with no shadow.
- The top app bar sits at Level 0 and lifts to Level 2 (and to `surface-container`) only once the page has scrolled.
- Shadows always use `{colors.shadow}`; in dark scheme, favour tone and reduce shadow opacity, because shadows read poorly on dark surfaces.

## Shapes

### Shape Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed bands, divider ends. |
| `{rounded.xs}` | 4px | Text fields, snackbars, small badges. |
| `{rounded.sm}` | 8px | Filter chips. |
| `{rounded.md}` | 12px | Code blocks, tables, small cards. |
| `{rounded.lg}` | 16px | Component cards, preview panes. |
| `{rounded.lg-increased}` | 20px | Featured cards. |
| `{rounded.xl}` | 28px | Theme builder, dialogs, large sheets. |
| `{rounded.xl-increased}` | 32px | Hero feature surfaces. |
| `{rounded.2xl}` | 48px | Rare, decorative large surfaces. |
| `{rounded.full}` | 9999px | Buttons, nav items, search bar, icon buttons, switches. |

### Principles
- Action = pill. Container = soft rectangle. Don't put a 4 px corner on a button or a full pill on a card.
- Nested shapes reduce their radius by the padding between them so corners stay concentric (a 16 px card containing a 12 px code block with 4 px between them looks wrong; use matching inner radii).
- Shape morphing is used deliberately (a toggle button square ↔ pill on selection); it's a motion behaviour, not a decoration.

## Motion & State

### State layers
Interaction is communicated by overlaying the component's content colour on its container at fixed opacities.

| State | Overlay opacity |
|---|---|
| Hover | 8% |
| Focus | 10% (plus a 3 px `{colors.primary}` focus ring on keyboard focus) |
| Pressed | 10% |
| Dragged | 16% |
| Disabled | content 38%, container 12% |

### Easing & duration

| Token | Value | Use |
|---|---|---|
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most on-screen transitions. |
| `easing-emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Elements entering. |
| `easing-emphasized-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Elements leaving. |
| `duration-short` | 100–200ms | Ripple, state layers, chips. |
| `duration-medium` | 250–400ms | Tab indicator, card expand, drawer. |
| `duration-long` | 450–600ms | Page-level transitions. |

- Press feedback uses a ripple that originates at the pointer. On components that support it, selection changes may use a spring-style overshoot (switch handle, toggle button shape) as in M3 Expressive; if the user prefers reduced motion, springs and ripples are replaced with a plain opacity change.
- Copy confirmation: the install command's copy button swaps its icon to a check for ~1.5 s and a `snackbar` appears at the bottom.

## Components

Every component here is also a registry component. The site does not use bespoke styling that a visitor couldn't get from the registry.

### Buttons

**`button-filled`** — the primary action.
- Background `{colors.primary}`, text `{colors.on-primary}`, `{typography.label-large}`, height 40 px, padding `0 {spacing.xl}`, shape `{rounded.full}`. One per view.

**`button-tonal`** — the secondary action (e.g. "Preview" next to "Install").
- Background `{colors.secondary-container}`, text `{colors.on-secondary-container}`, same geometry.

**`button-outlined`** — medium emphasis.
- Transparent, 1 px `{colors.outline}` border, text `{colors.primary}`.

**`button-text`** — lowest emphasis, used in cards, dialogs and snackbars.
- Transparent, text `{colors.primary}`, horizontal padding `{spacing.md}`.

**`button-elevated`** — for actions that need to sit above a patterned or busy surface.
- Background `{colors.surface-container-low}`, text `{colors.primary}`, Level 1 shadow.

**`icon-button`** — theme toggle, copy, GitHub. 40 px visual size, 48 px target, `{rounded.full}`. Always has an `aria-label`.

### Navigation

**`top-app-bar`** — the sticky header.
- Background `{colors.surface}` (lifts to `{colors.surface-container}` on scroll), height 64 px. Wordmark in `{typography.title-large}`, then `nav-link` items, then `search-bar` (collapsed to an icon at Compact) and the theme-toggle icon button.

**`nav-link`** — header links (Components, Themes, Docs).
- Text `{colors.on-surface-variant}`, `{typography.label-large}`, `{rounded.full}`, height 40 px. Active link uses `{colors.on-surface}` with a `{colors.secondary-container}` background.

**`docs-nav-item` / `docs-nav-item-active`** — the left drawer.
- 56 px tall pills. Active item: `{colors.secondary-container}` fill with `{colors.on-secondary-container}` text. Group headings use `{typography.title-small}` in `{colors.on-surface-variant}`.

**`tabs-primary`** — Preview | Code | Props | Accessibility.
- Text `{typography.title-small}`; active tab text `{colors.primary}` with a 3 px `{colors.primary}` indicator with rounded top corners; inactive `{colors.on-surface-variant}`. 48 px tall, a 1 px `{colors.outline-variant}` divider beneath.

### Search & Filters

**`search-bar`** — registry search ("Search components…", `/` to focus).
- `{colors.surface-container-high}`, 56 px, `{rounded.full}`, leading search icon, trailing clear icon. Results open in a menu (Level 2) with keyboard navigation.

**`chip-filter` / `chip-filter-selected`** — category and framework filters (All, Actions, Selection, Containment, Navigation, Feedback).
- 32 px tall, `{rounded.sm}`. Unselected: 1 px `{colors.outline}` border. Selected: `{colors.secondary-container}` fill, leading check icon.

### Cards & Containers

**`component-card`** — one tile per component in the index.
- `{colors.surface-container-low}`, `{rounded.lg}`, no border, `{spacing.lg}` padding. Contains a mini live preview on `{colors.surface-container-lowest}`, the component name in `{typography.title-medium}`, a one-line description in `{typography.body-medium}` / `{colors.on-surface-variant}`, and variant/status badges. Hover adds a state layer and lifts to Level 1.

**`preview-pane`** — where a component runs live.
- `{colors.surface-container-lowest}`, 1 px `{colors.outline-variant}` border, `{rounded.lg}`, `{spacing.2xl}` padding. Toolbar (top right): scheme toggle (light/dark), seed-colour swatches, state toggles (enabled / hover / focus / pressed / disabled). The pane hosts the real component, not a screenshot.

**`code-block`** — source viewer.
- `{colors.surface-container-highest}`, `{rounded.md}`, `{typography.code}`, `{spacing.lg}` padding, a `button-text` "Copy" in the top right, file name as `{typography.label-medium}` label above.

**`install-command`** — the hero of every component page.
- `{colors.surface-container-highest}`, height 48 px, `{rounded.full}`, `{typography.code}`, with a package-manager segmented switch (npm / pnpm / yarn / bun) and a trailing copy `icon-button`.

**`props-table`** — API reference.
- `{typography.body-medium}`, header row in `{typography.title-small}` on `{colors.surface-container}`, 1 px `{colors.outline-variant}` row rules, prop names in `{typography.code}`, wrapped in a `{rounded.md}` container that scrolls horizontally.

### Inputs & Forms

**`text-field-outlined`** — Theme Builder inputs (seed colour hex, radius, font).
- 56 px, 1 px `{colors.outline}` border, `{rounded.xs}`, floating label in `{typography.body-small}` when active; border becomes 2 px `{colors.primary}` on focus; error state uses `{colors.error}` with supporting text below.

**`theme-builder`** — seed colour in, full scheme out.
- `{colors.surface-container}`, `{rounded.xl}`, `{spacing.xl}` padding. Shows the tonal palette swatches, light/dark previews and a copy-ready CSS variables block (or the equivalent for the registry's theme file).

### Feedback

**`snackbar`** — "Copied to clipboard", "Added to theme".
- `{colors.inverse-surface}`, `{colors.inverse-on-surface}`, `{rounded.xs}`, height 48 px, Level 3 shadow, bottom-centre on desktop and full-width on Compact, auto-dismiss after 4 s.

### Signature Components

**`hero-band`** — the home hero.
- `{colors.surface}`, `{spacing.5xl}` vertical padding. Headline in `{typography.display-large}` (57/64) with one word in `{colors.primary}`. Sub-line in `{typography.body-large}` / `{colors.on-surface-variant}`. Below: `install-command` and a row of `button-filled` ("Browse components") + `button-tonal` ("Read the docs"). To the right (or below at Compact), a live cluster of real components (a switch, a slider, a filled button, a chip row) that responds to a seed-colour picker.

**`content-band`** — standard section.
- `{colors.surface}`, `{spacing.4xl}` vertical padding, headline `{typography.headline-large}`.

**`footer`** — closing band.
- `{colors.surface-container}`, `{typography.body-small}`. Must include an unaffiliated notice: Material 3 Design is an independent open-source project, not affiliated with or endorsed by Google; "Material" is a trademark of Google LLC.

### Component Contract (what every registry component page must show)

Every component in the registry ships and documents the same things, in this order:
1. **Live preview** of every variant and size, with state toggles (enabled, hover, focus, pressed, disabled) and light/dark.
2. **Install command** for each supported package manager.
3. **Usage** snippet: the smallest working example.
4. **Code** for each file the CLI will add (component, styles, tokens it depends on).
5. **Props / API** table.
6. **Accessibility**: roles, keyboard map, focus behaviour, the 48 px target guarantee, `prefers-reduced-motion` behaviour.
7. **Token dependencies**: which colour roles, shape tokens and motion tokens the component reads, so users know what a custom theme must define.

## Do's and Don'ts

### Do
- Reference colour **roles** (`{colors.primary}`, `{colors.surface-container-low}`), never raw hex, so every component re-themes and works in dark mode.
- Use exactly one `button-filled` per view; pair it with tonal, outlined, or text buttons.
- Show live components in previews and support every state; a screenshot is never acceptable in place of a working component.
- Use `{colors.secondary-container}` for *selection* (active nav, selected chip), and `{colors.primary}` for the *action*.
- Keep the 48 px touch target and visible focus ring on every interactive element.
- Provide `prefers-reduced-motion` fallbacks for all ripples and springs.
- Keep component source small, readable and free of hidden abstractions, because users are meant to read and edit it.

### Don't
- Don't put a drop shadow on a resting card. Use a surface-container step instead.
- Don't use square-cornered or `{rounded.xs}` buttons; actions are pills.
- Don't introduce a colour outside the scheme roles (no ad-hoc gradients, no hard-coded brand purple in component code).
- Don't set headings in bold or all-caps. The M3 scale carries hierarchy with size and the 400 / 500 weight pair.
- Don't stack more than two emphasis levels of button side by side.
- Don't use the tertiary role for primary actions or as a second "brand colour".
- Don't ship a component without its dark-scheme preview and its accessibility notes.
