# Material 3 Design Workbench & Integration Kit

> A standalone laboratory, developer workbench, and integration manual for Google’s **Material Design 3 (M3)** Web Components (`@material/web`).

---

## Table of Contents
1. [Overview & Project Purpose](#1-overview--project-purpose)
2. [Current Status of `@material/web` (Maintenance Mode)](#2-current-status-of-materialweb-maintenance-mode)
3. [Quickstart: Running the Workbench](#3-quickstart-running-the-workbench)
4. [Step-by-Step Integration in Vite (Client SPA)](#4-step-by-step-integration-in-vite-client-spa)
5. [Step-by-Step Integration in Next.js (App Router / SSR)](#5-step-by-step-integration-in-nextjs-app-router--ssr)
6. [TypeScript Declaration Guide (`material-web.d.ts`)](#6-typescript-declaration-guide-material-webdts)
7. [Comprehensive Component Catalog & Props Reference](#7-comprehensive-component-catalog--props-reference)
8. [Design Tokens & Theming Guide](#8-design-tokens--theming-guide)
9. [Pushing to Your GitHub Repository](#9-pushing-to-your-github-repository)

---

## 1. Overview & Project Purpose

**Material Design 3 (M3)** is Google’s latest design system, characterized by:
- **Dynamic color & expressive tonal surfaces**: Uses color roles (`Primary`, `Secondary`, `Tertiary`, `Surface`, `Outline`) rather than hardcoded hex values.
- **Generous spacing & touch ergonomics**: 8dp grid system, spacious 44px+ touch targets, and signature `rounded-[28px]` surface containers.
- **Adaptive elevation**: Uses surface tint overlays and soft ambient shadows instead of sharp, harsh drop-shadows.

Google implements M3 on the web through **[`@material/web`](https://github.com/material-components/material-web)** using **Lit-based Web Components (Custom Elements)**. Because they are native browser elements (`<md-filled-button>`, `<md-checkbox>`), they work across any frontend framework (React, Vite, Next.js, Vue, Svelte, or plain HTML).

This repository serves two goals:
1. **Interactive Workbench**: A live laboratory to test components, toggle props, inspect visual hierarchy, and copy ready-to-use TSX snippets.
2. **Personal Integration Kit**: A plug-and-play toolkit with TypeScript declarations, font setups, and layout recipes for all your future web projects.

---

## Material 3 Expressive (The Android 15+ Evolution)

**Material 3 Expressive** represents Google's transition from subtle, utilitarian interfaces to vibrant, emotion-driven designs. Key features included in this workbench:

1. **Morphing & Asymmetric Shapes**:
   - Rather than uniform symmetric boxes, Expressive uses playful corner pairings (e.g. `rounded-tl-[40px] rounded-br-[40px] rounded-tr-[16px] rounded-bl-[16px]`) and oversized squircle containers.
   - Buttons embrace full ultra-pill silhouettes (`rounded-full` / `9999px`).
2. **High-Chroma Tonal Palettes**:
   - High-contrast, expressive color pairing:
     - **Coral Sunrise**: Warm, energetic crimson primary paired with sunny gold tertiary.
     - **Cyber Mint**: Crisp aquamarine and deep forest teal.
     - **Berry Neon**: Playful magenta orchid and warm rose.
3. **Dynamic Theme Switching**:
   - In `src/index.css`, switch themes via data attribute:
     ```html
     <html data-theme="expressive-coral">
     ```
   - All `@material/web` components adapt instantly via CSS variables.

---

## Material 3 Motion System & Expressive Spring Physics

Material Design 3's motion system brings interfaces to life using physics-based curves, spring overshoots, and container transforms rather than mechanical linear movement.

### 1. Easing Curve Tokens
| Curve Name | CSS cubic-bezier | Visual Behavior |
| :--- | :--- | :--- |
| **M3 Emphasized** | `cubic-bezier(0.2, 0, 0, 1)` | Standard natural deceleration for screen entries and card reveals |
| **M3 Expressive Spring** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Tactile spring overshoot with realistic momentum and soft settle |
| **Emphasized Accelerate** | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Fast, purposeful exit animations |

### 2. Spring Press & Hover (The "Squeeze" Physics)
Buttons compress on `:active` and bounce back into resting state:
```css
.m3-spring-interactive {
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 250ms cubic-bezier(0.2, 0, 0, 1);
}
.m3-spring-interactive:hover {
  transform: translateY(-4px) scale(1.02);
}
.m3-spring-interactive:active {
  transform: translateY(1px) scale(0.96);
  transition-duration: 80ms;
}
```

### 3. Container Transform (Morphing Shapes)
M3 morphs containers smoothly when moving between preview and detailed view modes:
```css
.m3-container-morph {
  transition: all 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 4. Embedding Native Google Ink Ripples (`<md-ripple>`)
You can add Google's authentic Material ink ripple to **any** custom card or HTML element:
```html
<div class="relative overflow-hidden cursor-pointer p-6 rounded-3xl bg-white shadow-sm">
  <md-ripple></md-ripple>
  <h3>Interactive Surface</h3>
  <p>Click anywhere to trigger Google's radial ink ripple</p>
</div>
```

---

## 2. Current Status of `@material/web` (Maintenance Mode)

Google has placed the `material-components/material-web` repository into **Maintenance Mode**. Here is what this means practically for your projects:

| Aspect | Status | What It Means for You |
| :--- | :--- | :--- |
| **Stability** | **Mature (v2.5.0)** | The shipped core components (Buttons, Inputs, Select, Checkboxes, Radios, Switches, Sliders, Chips, Dialogs, Progress) are stable and battle-tested. |
| **New Features** | **Paused** | Google is not introducing major new experimental components; development is focused on critical bug fixes and community contributions. |
| **Framework Independence** | **100% Future-Proof** | Because `@material/web` is built on browser-standard **W3C Custom Elements** and **Shadow DOM**, it will not break when React or Next.js release major version updates. |
| **Recommendation** | **Adopt Core Components** | Use the stable v2.x components documented in this workbench. For unsupported edge cases, style with Tailwind using M3 tokens. |

---

## 3. Quickstart: Running the Workbench

```bash
# Clone or navigate to the directory
cd material-web-workbench

# Install dependencies
npm install

# Start the Vite local development server
npm run dev
```

Open `http://localhost:5173` to explore the living component catalog.

---

## 4. Step-by-Step Integration in Vite (Client SPA)

Vite is a **pure client-side rendered (SPA)** environment. Web components mount directly into the browser DOM with zero SSR hydration challenges.

### Step 1: Install Package
```bash
npm install @material/web
```

### Step 2: Add Google Fonts to `index.html`
Material 3 requires the **Roboto** font and **Material Symbols Outlined** icon font. Add these into `<head>`:
```html
<!-- index.html -->
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>
```

### Step 3: Copy TypeScript Declarations
Copy `src/types/material-web.d.ts` from this workbench into your Vite project's `src/types/` folder.

### Step 4: Configure CSS Tokens in `src/index.css`
```css
:root {
  --md-icon-font: 'Material Symbols Outlined';
  font-family: 'Roboto', sans-serif;
  
  /* Generous Google button heights */
  --md-filled-button-container-height: 44px;
  --md-outlined-button-container-height: 44px;
}
```

### Step 5: Import & Use Components
```tsx
import '@material/web/button/filled-button.js';
import '@material/web/icon/icon.js';

export function ActionButton() {
  return (
    <md-filled-button onClick={() => alert('Clicked!')}>
      <md-icon slot="icon">send</md-icon>
      Submit
    </md-filled-button>
  );
}
```

---

## 5. Step-by-Step Integration in Next.js (App Router / SSR)

In Next.js, components are pre-rendered on the server (Node.js). Because Web Components access browser globals (`window`, `customElements`), follow these **three golden rules**:

### Rule 1: Always Add `"use client"`
Any file that imports from `@material/web/*` must be a client component:
```tsx
"use client";
import '@material/web/button/filled-button.js';
```

### Rule 2: Load Fonts via `<link>` in `app/layout.tsx` (Never `@import` in CSS)
PostCSS / Turbopack often drops cross-origin `@import url(...)` font statements. Always link them in `<head>`:
```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Rule 3: Define `--md-icon-font` in `app/globals.css`
```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --md-icon-font: 'Material Symbols Outlined';
  font-family: 'Roboto', sans-serif;
}
```

---

## 6. TypeScript Declaration Guide (`material-web.d.ts`)

React's default JSX types do not recognize custom elements. Drop this file into `src/types/material-web.d.ts`:

```typescript
import type * as React from 'react';

type MaterialCustomElementProps<T = HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
> & {
  slot?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  label?: string;
  value?: string | number;
  checked?: boolean;
  indeterminate?: boolean;
  selected?: boolean;
  type?: string;
  placeholder?: string;
  supportingText?: string;
  errorText?: string;
  error?: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  name?: string;
  icons?: boolean;
  lowered?: boolean;
  variant?: 'surface' | 'primary' | 'secondary' | 'tertiary';
  elevated?: boolean;
  removable?: boolean;
  open?: boolean;
  fourColor?: boolean;
  [key: string]: any;
};

export interface MaterialWebElements {
  'md-filled-button': MaterialCustomElementProps;
  'md-outlined-button': MaterialCustomElementProps;
  'md-elevated-button': MaterialCustomElementProps;
  'md-text-button': MaterialCustomElementProps;
  'md-filled-tonal-button': MaterialCustomElementProps;
  'md-fab': MaterialCustomElementProps;
  'md-icon': MaterialCustomElementProps;
  'md-icon-button': MaterialCustomElementProps;
  'md-filled-icon-button': MaterialCustomElementProps;
  'md-filled-tonal-icon-button': MaterialCustomElementProps;
  'md-outlined-icon-button': MaterialCustomElementProps;
  'md-outlined-text-field': MaterialCustomElementProps;
  'md-filled-text-field': MaterialCustomElementProps;
  'md-outlined-select': MaterialCustomElementProps;
  'md-select-option': MaterialCustomElementProps;
  'md-checkbox': MaterialCustomElementProps;
  'md-radio': MaterialCustomElementProps;
  'md-switch': MaterialCustomElementProps;
  'md-slider': MaterialCustomElementProps;
  'md-chip-set': MaterialCustomElementProps;
  'md-filter-chip': MaterialCustomElementProps;
  'md-assist-chip': MaterialCustomElementProps;
  'md-input-chip': MaterialCustomElementProps;
  'md-suggestion-chip': MaterialCustomElementProps;
  'md-circular-progress': MaterialCustomElementProps;
  'md-linear-progress': MaterialCustomElementProps;
  'md-dialog': MaterialCustomElementProps;
  'md-divider': MaterialCustomElementProps;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends MaterialWebElements {}
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends MaterialWebElements {}
  }
}
```

---

## 7. Comprehensive Component Catalog & Props Reference

### 1. Buttons & Actions

| Component Tag | Import Path | Visual Weight | Use Case | Common Attributes / Slots |
| :--- | :--- | :--- | :--- | :--- |
| `<md-filled-button>` | `@material/web/button/filled-button.js` | High | Primary screen action | `disabled`, `href`, `slot="icon"` |
| `<md-filled-tonal-button>` | `@material/web/button/filled-tonal-button.js` | Medium-High | Alternative primary action | `disabled`, `slot="icon"` |
| `<md-elevated-button>` | `@material/web/button/elevated-button.js` | Medium-High | Needs separation from flat surface | `disabled`, `slot="icon"` |
| `<md-outlined-button>` | `@material/web/button/outlined-button.js` | Medium | Important secondary actions | `disabled`, `slot="icon"` |
| `<md-text-button>` | `@material/web/button/text-button.js` | Low | Dialog confirmations, cancel actions | `disabled`, `slot="icon"` |
| `<md-fab>` | `@material/web/fab/fab.js` | Highest | Primary focal action | `variant="primary|secondary|surface"`, `lowered`, `label="..."`, `slot="icon"` |
| `<md-icon-button>` | `@material/web/iconbutton/icon-button.js` | Compact | Toolbars, actions without labels | `disabled`, `href` |

### 2. Text Fields & Select

| Component Tag | Import Path | Use Case | Key Attributes |
| :--- | :--- | :--- | :--- |
| `<md-outlined-text-field>` | `@material/web/textfield/outlined-text-field.js` | Standard forms & inputs | `label`, `value`, `placeholder`, `type`, `supportingText`, `errorText`, `error`, `slot="leading-icon"`, `slot="trailing-icon"` |
| `<md-filled-text-field>` | `@material/web/textfield/filled-text-field.js` | High-contrast search or forms | Same as outlined text field |
| `<md-outlined-select>` | `@material/web/select/outlined-select.js` | Dropdown option picker | `label`, `value`, `slot="headline"` inside `<md-select-option>` |

### 3. Selection Controls

| Component Tag | Import Path | Use Case | Key Attributes |
| :--- | :--- | :--- | :--- |
| `<md-switch>` | `@material/web/switch/switch.js` | On/Off preferences | `selected`, `icons`, `showOnlySelectedIcon`, `disabled` |
| `<md-checkbox>` | `@material/web/checkbox/checkbox.js` | Multi-selection & agreements | `checked`, `indeterminate`, `disabled`, `value` |
| `<md-radio>` | `@material/web/radio/radio.js` | Mutually exclusive single choices | `name`, `value`, `checked`, `disabled` |
| `<md-slider>` | `@material/web/slider/slider.js` | Numerical ranges | `min`, `max`, `value`, `labeled`, `ticks`, `step` |

### 4. Chips

| Component Tag | Import Path | Use Case | Key Attributes |
| :--- | :--- | :--- | :--- |
| `<md-filter-chip>` | `@material/web/chips/filter-chip.js` | Filtering lists or tags | `label`, `selected`, `elevated`, `slot="icon"` |
| `<md-assist-chip>` | `@material/web/chips/assist-chip.js` | Smart action triggers | `label`, `href`, `slot="icon"` |
| `<md-input-chip>` | `@material/web/chips/input-chip.js` | Removable recipient tags | `label`, `removable`, `@remove` event |
| `<md-suggestion-chip>` | `@material/web/chips/suggestion-chip.js` | Search / AI query prompts | `label` |

### 5. Progress & Feedback

| Component Tag | Import Path | Use Case | Key Attributes |
| :--- | :--- | :--- | :--- |
| `<md-circular-progress>` | `@material/web/progress/circular-progress.js` | Compact spinner | `indeterminate`, `value` (0.0 to 1.0), `fourColor` |
| `<md-linear-progress>` | `@material/web/progress/linear-progress.js` | Bar loader | `indeterminate`, `value` (0.0 to 1.0) |
| `<md-dialog>` | `@material/web/dialog/dialog.js` | Modal confirmation | `open`, `slot="headline"`, `slot="content"`, `slot="actions"` |

---

## 8. Design Tokens & Theming Guide

Material 3 uses CSS Custom Properties on `:root` to control styling across all components.

```css
:root {
  /* Primary & Accent Tones */
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #21005D;

  /* Surface & Background */
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-on-surface: #1D1B20;

  /* Touch Targets & Sizing */
  --md-filled-button-container-height: 44px;
  --md-outlined-button-container-height: 44px;
  --md-elevated-button-container-height: 44px;
  
  /* Font Family for Icons */
  --md-icon-font: 'Material Symbols Outlined';
}
```

---

## 9. Pushing to Your GitHub Repository

When you are ready to publish this workbench to your personal GitHub account:

```bash
cd material-web-workbench

# 1. Check git status
git status

# 2. Add files and commit
git add .
git commit -m "Initial commit: Material 3 Design Workbench & Developer Kit"

# 3. Create a repository on GitHub (e.g. material-web-workbench), then link it:
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 4. Rename to main and push
git branch -M main
git push -u origin main
```
