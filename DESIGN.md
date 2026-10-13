---
version: "alpha"
name: "Sumi-e Tech Scroll"
description: "Sumi-e style landing, ink wash painting, rice paper texture, red seal accent, isometric tech details, east asian aesthetic. Ideal for landing pages, modern websites. AI-ready template."
colors:
  primary: "#F4F1E8"
  secondary: "#0D0D0D"
  tertiary: "#8A1C15"
  neutral: "#0D0D0D"
  surface: "#808080"
  accent: "#8A1C15"
typography:
  h1:
    fontFamily: Noto Serif JP
    fontSize: 2.5rem
    fontWeight: 700
  body-md:
    fontFamily: Noto Serif JP
    fontSize: 1rem
    fontWeight: 400
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    padding: 12px
---

## Overview

Sumi-e style landing, ink wash painting, rice paper texture, red seal accent, isometric tech details, east asian aesthetic. Ideal for landing pages, modern websites. AI-ready template. Sumi-e didn't arrive in digital design through some trend cycle. It seeped in. The practice — born in Tang Dynasty China, refined into spiritual discipline by Japanese monks — was never about depicting reality. It was about capturing essence in a single, irreversible stroke. No undo button. No layers panel. Just ink, water, and breath.

That philosophy translates to interfaces more honestly than most designers admit. The controlled imperfection of a brush loaded with varying ink density maps directly to how we think about visual weight and hierarchy. A thick downstroke commands attention the way a bold headline does. A trailing whisper of dry brush creates the same tension as generous whitespace around a call to action. The relationship between mark and void — that's layout theory distilled to its oldest form.

What makes sumi-e genuinely useful as a design reference isn't the aesthetic (though it's gorgeous). It's the underlying constraint: say more with less. Ma — the Japanese concept of negative space as active, breathing presence — predates every minimalism manifesto by centuries. Empty space isn't absence. It's architecture.

- Dial: ENERGY 2 / RHYTHM 3 / MOTION 1
- Density: 5/10 — Balanced
- Variance: 8/10 — Expressive
- Motion: 4/10 — Subtle

- **Style:** Cultural, Artistic, Fused
- **Keywords:** sumi-e, ink, asian, traditional, landscape, tech, isometric, red accent
- **Era:** Traditional/Modern Fusion
- **Light/Dark:** Both. Light is rice paper, dark is ink-night

## Colors

- **Background** (#F4F1E8) — Primary background surface
- **Text** (#0D0D0D) — Primary text color, also the deepest ink (no pure black)
- **Accent** (#8A1C15) — Seal red. The only accent: primary button fill, active nav item, the seal mark
- **Wash Grey** (#808080) — Borders and brush strokes only. It is 3.5:1 on paper, too low for text
- **Muted text** (#5F5B52) — Secondary text, 6.0:1 on paper
- **Paper Cream** (#F4F1E8) — Secondary surface, with #FAF8F2 (raised) and #E9E3D3 (deep) tints

### Ink-night (dark)

Paper #141312, ink #F4F1E8, muted #8F8A80, wash #6B665C, seal lifted to #E0645A (5.4:1).

### Site vs. components

The site shell uses this palette. The registry components keep the baseline M3 tokens, because those are what people install. The site re-skins the M3 Button by pointing its `--m3-*` tokens at this palette (`.sumi`); previews undo that (`.m3-stage`).


## Typography

- **Display / Hero:** Noto Serif JP — Weight 700, tight tracking, used for headline impact
- **Body:** Noto Serif JP — Weight 400, 16px/1.6 line-height, max 72ch per line
- **UI Labels / Captions:** Noto Serif JP — 0.875rem, weight 500, slight letter-spacing
- **Monospace:** JetBrains Mono — Used for code, metadata, and technical values

Scale:
- Hero: clamp(2.5rem, 5vw, 4rem)
- H1: 2.25rem
- H2: 1.5rem
- Body: 1rem / 1.6
- Small: 0.875rem


## Layout

- **Grid:** CSS Grid primary. Max-width containment: 1280px centered with 1.5rem side padding.
- **Spacing rhythm:** Balanced. Base unit: 0.5rem (8px).
- **Section vertical gaps:** clamp(4rem, 8vw, 8rem).
- **Hero layout:** Asymmetric composition.
- **Feature sections:** Asymmetric grid with varied card sizes. No 3-equal-columns.
- **Mobile collapse:** All multi-column layouts collapse below 768px. No horizontal overflow.
- **z-index contract:** base (0) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).


## Elevation & Depth

Traditional ink wash landscapes mixed with modern isometric technical diagrams, aged rice paper grain, ink bleed.

- **Physics:** Ease-out curves, 200-300ms duration. Smooth and predictable.
- **Entry animations:** None. The components' spring motion is the showpiece, so the page stays still (decided 2026-10-13, antislop R-19).
- **Hover states:** Subtle color shift + shadow adjustment over 200ms.
- **Page transitions:** Fade only (200ms).
- **Performance:** Only transform and opacity animated. No layout-triggering properties.


## Shapes

Base corner radius: 8px. See rounded tokens in front matter for the full scale.


## Components

- **Primary Button:** Subtly rounded (0.5rem) shape. Accent color fill. Hover: 8% darken + subtle lift shadow. Active: -1px translate tactile press. Font weight 600. No outer glows.
- **Secondary / Ghost Button:** Outline variant. 1.5px border in muted color. Text in primary color. Hover: subtle background fill.
- **Cards:** Subtly rounded (0.5rem) corners. Surface background. Subtle shadow (0 2px 12px rgba(0,0,0,0.06)). 1px border stroke.
- **Inputs:** Label above input. 1px border stroke. Focus ring: 2px accent color offset 2px. Error text below in semantic red. No floating labels.
- **Navigation:** Primary surface background. Active item: accent color indicator. Font weight 500 when active.
- **Skeletons:** Shimmer animation matching component dimensions. No circular spinners.
- **Empty States:** Icon-based composition with descriptive text and action button.


## Do's and Don'ts

- No emojis in UI — use icon system only (Lucide; brand marks such as GitHub stay inline SVG). Kept by owner decision over antislop R-04
- No pure black (#000000) — use off-black or charcoal variants
- No oversaturated accent colors (saturation cap: 80%)
- No 3-column equal-width feature layouts — use zig-zag or asymmetric grid
- No `h-screen` — use `min-h-[100dvh]`
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- No broken external image links — use picsum.photos or inline SVG
- No generic lorem ipsum in demos

- Do Rice paper texture background
- Do Ink wash (sumi-e) visual elements
- Do Red stamp/seal accents
- Do Isometric/Tech overlays on traditional art
- Do Brush stroke borders


## Use Case

Landing pages, Modern websites
