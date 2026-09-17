# Material 3 Buttons — Implementation & Learning Guide

> **Official M3 Documentation:** [m3.material.io/components/all-buttons](https://m3.material.io/components/all-buttons)  
> **Package Source:** [@material/web/button](https://github.com/material-components/material-web/tree/main/button)

Buttons communicate actions that users can take throughout an application. In Material Design 3 (M3), buttons are designed with a clear hierarchy to guide the user's attention without cognitive overload.

---

## 1. Visual Hierarchy & Purpose

Material 3 defines **five core button variants**, each with a deliberate level of emphasis:

| Variant | Tag | Emphasis | Elevation | Best Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Filled Button** | `<md-filled-button>` | High (Primary) | Level 0 (Flat) | The final confirmation or primary affirmative action on a screen (e.g. *Submit*, *Save*, *Continue*). |
| **Filled Tonal** | `<md-filled-tonal-button>` | Medium-High | Level 0 (Flat) | Secondary actions that still deserve visual prominence without competing with the primary filled button. |
| **Elevated Button** | `<md-elevated-button>` | Medium-High | Level 1 (Shadow) | Actions that sit on patterned or contrasting surfaces where elevation helps lift the button visually. |
| **Outlined Button** | `<md-outlined-button>` | Medium (Secondary) | Level 0 (Bordered) | Important non-primary actions (e.g. *Filter*, *Back*, *Save as Draft*). |
| **Text Button** | `<md-text-button>` | Low (Tertiary) | None | Quiet, low-emphasis actions often placed in dialogs, toolbars, or cards (e.g. *Cancel*, *Learn more*). |

### Specialized Button Types:
- **Floating Action Button (FAB)** (`<md-fab>`): Represents the screen's singular focal action (e.g. *Compose*, *New Chat*).
- **Icon Button** (`<md-icon-button>`, `<md-filled-icon-button>`): Compact, icon-only triggers for toolbars and utility menus.

---

## 2. Anatomy & Dimensional Specifications

According to Google M3 guidelines, standard buttons adhere to strict dimensional rules:

```text
┌────────────────────────────────────────────────────────────┐
│  (8dp) ┌────────┐ (8dp)                      (16-24dp)     │
│   │    │  Icon  │  │    Label Text              │          │
│   ▼    └────────┘  ▼                            ▼          │
│  40dp Height (Standard) / 44-48dp (Touch Target)           │
│  Border Radius: 20dp (Full Capsule / Pill)                 │
└────────────────────────────────────────────────────────────┘
```

- **Standard Container Height:** `40dp` (M3 default), customizable via `--md-filled-button-container-height: 44px;`.
- **Minimum Touch Target:** `48×48dp` (achieved via built-in touch target padding to satisfy WCAG 2.5.5).
- **Corner Radius:** `20dp` (full capsule pill shape).
- **Icon Sizing:** `18dp` with `8dp` horizontal gap to the label.
- **Side Padding:** `24dp` without icon, `16dp` leading with icon.

---

## 3. Web Component API Reference

Material Web buttons are standard W3C Web Components.

### Attributes & Properties

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Disables interaction and reduces opacity to 38%. |
| `trailing-icon` | `boolean` | `false` | When true, renders the icon slot *after* the label text. |
| `has-icon` | `boolean` | `false` | Automatically set when an icon is slotted; can be forced manually. |
| `href` | `string` | `undefined` | Transforms the internal element into an `<a>` link anchor. |
| `target` | `string` | `undefined` | Standard link target (`_blank`, `_self`) when `href` is defined. |
| `type` | `'submit' \| 'reset' \| 'button'` | `'button'` | Form submission behavior when placed inside an HTML `<form>`. |

### Slots

| Slot Name | Description | Example |
| :--- | :--- | :--- |
| *default* | The label text displayed inside the button. | `<md-filled-button>Submit</md-filled-button>` |
| `icon` | Leading or trailing icon element (typically `<md-icon>`). | `<md-icon slot="icon">send</md-icon>` |

---

## 4. Design Tokens (CSS Custom Properties)

Material 3 buttons are customized through CSS custom properties. You can scope these locally to a single button or globally in your theme CSS:

```css
/* Customizing Filled Button Colors */
md-filled-button.custom-accent {
  --md-filled-button-container-color: #006C50;
  --md-filled-button-label-text-color: #ffffff;
  --md-filled-button-hover-container-color: #00563f;
  --md-filled-button-container-height: 44px;
  --md-filled-button-container-shape: 12px; /* override capsule to rounded rect */
}
```

### Key Token Map:

| Token Name | Default (Baseline) | Purpose |
| :--- | :--- | :--- |
| `--md-filled-button-container-color` | `var(--md-sys-color-primary)` | Background color of filled button |
| `--md-filled-button-label-text-color` | `var(--md-sys-color-on-primary)` | Text color of the label |
| `--md-filled-button-container-height` | `40px` | Total height of the container |
| `--md-filled-button-container-shape` | `9999px` | Capsule pill border-radius |
| `--md-outlined-button-outline-color` | `var(--md-sys-color-outline)` | Border stroke color |
| `--md-outlined-button-outline-width` | `1px` | Border stroke thickness |

---

## 5. Framework Integration Recipes

### 1. Plain HTML / Vanilla JS / Vite
```html
<script type="module">
  import '@material/web/button/filled-button.js';
  import '@material/web/icon/icon.js';
</script>

<md-filled-button>
  <md-icon slot="icon">send</md-icon>
  Send Message
</md-filled-button>
```

### 2. React + TypeScript (Vite)
1. **Add TypeScript Declarations (`src/types/material-web.d.ts`):**
```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        disabled?: boolean;
        trailingIcon?: boolean;
        href?: string;
        target?: string;
      };
      'md-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        slot?: string;
      };
    }
  }
}
```

2. **Usage in a React Component:**
```tsx
import React from 'react';
import '@material/web/button/filled-button.js';
import '@material/web/icon/icon.js';

export const SaveAction: React.FC = () => {
  return (
    <md-filled-button onClick={() => console.log('Saved!')}>
      <md-icon slot="icon">save</md-icon>
      Save Changes
    </md-filled-button>
  );
};
```

### 3. Next.js (App Router / SSR)
Web Components rely on browser APIs (`customElements`, `HTMLElement`, `shadowRoot`). Because Next.js server-renders pages on Node.js, you must either:
- Mark the component with `'use client'` and import in a `useEffect` or client entry file, **OR**
- Use `next/dynamic` with `{ ssr: false }`:

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ClientButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only imports client-side
    import('@material/web/button/filled-button.js');
    import('@material/web/icon/icon.js');
    setMounted(true);
  }, []);

  if (!mounted) return <button className="px-4 py-2 bg-purple-600 text-white rounded-full">Loading...</button>;

  return (
    <md-filled-button>
      <md-icon slot="icon">rocket_launch</md-icon>
      Launch App
    </md-filled-button>
  );
}
```

---

## 6. Do's & Don'ts (M3 Best Practices)

- ✅ **Do** limit primary screens to **one** Filled Button to keep the primary call-to-action unmistakable.
- ❌ **Don't** stack multiple Filled Buttons right next to each other; pair a Filled Button with an Outlined or Text Button.
- ✅ **Do** keep button labels concise (1 to 3 action-oriented verbs like *Create*, *Review*, *Publish*).
- ❌ **Don't** put icons on both sides of a single button. Use either a leading icon OR a trailing icon.
