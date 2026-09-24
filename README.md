# Material 3 Web

An open-source, shadcn-style component registry bringing Google's Material 3 (M3) Design system to React 19, Next.js 16, and Tailwind CSS v4.

Components are distributed as accessible TypeScript source files that you copy or install directly into your codebase. You own the code, the styling tokens, and the dependencies.

> [!NOTE]
> **Alpha Status**: This project is in active alpha development. The Button component and design token system are fully specified and tested. Additional Material 3 components are actively being authored and ported to the registry.

---

## Why Material 3 Web?

Traditional Material Design implementations on the web are often distributed as monolithic npm packages with runtime CSS-in-JS abstractions or rigid styling overrides.

Material 3 Web follows the modern code-registry pattern:

- **Full Source Ownership**: Components live inside your repository (e.g. `@/registry/material-v1/ui/button.tsx`). Modify, customize, or extend them to match your application's exact needs.
- **Native Tailwind CSS v4**: Built on standard CSS variables and Tailwind v4 `@theme inline` directives. Zero runtime style injection.
- **Faithful M3 Specification**: Implements official Material 3 container anatomy, label typography (`label-large` 14px / 500 weight), auto-proportioned icon slots, and tonal surface elevation.
- **Expressive Motion and Shape Morphing**: Restful pill geometry with cubic-bezier press compression (`cubic-bezier(0.2, 0, 0, 1)`) and smooth layout inertia (`morphWidth`) via `ResizeObserver`.
- **Accessible by Default**: Meets WCAG 2.1 AA requirements with guaranteed 48dp minimum touch targets (`after:min-h-[48px]`), explicit keyboard focus indicators, `aria-pressed` states, and `prefers-reduced-motion` support.

---

## Component Status

| Component                  | Status      | Variants                                | Notes                                                                                                  |
| -------------------------- | ----------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Button**                 | Ready       | Filled, Elevated, Tonal, Outlined, Text | Supports 5 sizes (`xs`–`xl`), 3 shapes (`round`, `square`, `circle`), toggle states, and `morphWidth`. |
| **Icon Button**            | In progress | Standard, Filled, Tonal, Outlined       | 40dp visual container with guaranteed 48dp touch target.                                               |
| **Chips**                  | In progress | Assist, Filter, Input, Suggestion       | 32dp container height with selection checks and remove actions.                                        |
| **Navigation Bar**         | In progress | Standard bottom / rail                  | 56dp–80dp container with active indicator pill.                                                        |
| **Cards**                  | In progress | Elevated, Filled, Outlined              | Tonal surface elevation without arbitrary drop shadows.                                                |
| **Switch**                 | In progress | Standard, With icons                    | M3 expressive spring-loaded thumb transition.                                                          |
| **Dialog**                 | In progress | Basic, Full-screen                      | Level 3 elevation, Radix UI Dialog primitive foundation.                                               |
| **Text Field**             | In progress | Outlined, Filled                        | Floating label transitions and error supporting text.                                                  |
| **Floating Action Button** | In progress | Standard, Small, Large, Extended        | M3 container shapes and elevation levels.                                                              |

---

## Quick Start

### 1. Install via CLI

Add individual components into your project using the CLI:

```bash
# Using pnpm
pnpm dlx @m3/ui add button

# Using npm
npx @m3/ui add button

# Using bun
bunx @m3/ui add button
```

### 2. Manual Installation

If you prefer not to use the CLI, copy the component source directly from this repository:

1. Copy `apps/m3/registry/material-v1/ui/button.tsx` into your project's `components/ui/` directory.
2. Ensure you have installed the required utility packages:

```bash
pnpm add class-variance-authority radix-ui
```

### 3. Usage Example

```tsx
import Button from "@/components/ui/button"

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Primary Action */}
      <Button variant="filled" size="md">
        Save Changes
      </Button>

      {/* Secondary Action */}
      <Button variant="tonal" size="md">
        Preview
      </Button>

      {/* Medium Emphasis */}
      <Button variant="outlined" size="md">
        Cancel
      </Button>

      {/* Low Emphasis */}
      <Button variant="text" size="md">
        Learn More
      </Button>

      {/* Toggle Button with Morphing Width */}
      <Button variant="tonal" selected={true} morphWidth>
        Selected Item
      </Button>
    </div>
  )
}
```

---

## Design System & Tokens

Material 3 Web avoids ad-hoc hex values and hardcoded colors. Components reference semantic roles defined in `globals.css`:

### Color Roles

Both Light and Dark schemes are mapped to CSS variables using the standard M3 baseline palette (`#6750A4`):

- **Primary**: `primary`, `on-primary`, `primary-container`, `on-primary-container`
- **Secondary**: `secondary`, `on-secondary`, `secondary-container`, `on-secondary-container`
- **Tertiary**: `tertiary`, `on-tertiary`, `tertiary-container`, `on-tertiary-container`
- **Surfaces**: `surface`, `on-surface`, `on-surface-variant`, `surface-container-lowest` through `highest`
- **Outlines**: `outline`, `outline-variant`
- **Feedback**: `error`, `on-error`, `error-container`, `on-error-container`

### Shape Scale

- **Action Elements**: Use restful pill geometry (`rounded-[20px]` for 40dp, `rounded-[28px]` for 56dp). Restful numeric values prevent CSS clamping lag when morphing to compact pressed radii (8dp–12dp).
- **Surface Containers**: Use standard rounded corners (`rounded-lg` 16px, `rounded-xl` 28px).

For complete token specifications and usage guidelines, refer to [DESIGN.md](DESIGN.md).

---

## Repository Structure

This monorepo is managed with [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/):

```text
material-3-web/
├── apps/
│   └── m3/                          # Next.js 16 documentation site and registry showcase
│       ├── app/                     # App router pages (Catalog, Documentation, Playground)
│       ├── registry/
│       │   └── material-v1/         # Canonical Material 3 component source files
│       │       └── ui/
│       │           └── button.tsx   # Ready-to-copy M3 Button component
│       └── public/                  # Static assets and icons
├── packages/
│   ├── eslint-config/               # Shared ESLint configuration
│   ├── typescript-config/           # Shared TypeScript configuration
│   └── ui/                          # Shared workspace component stubs
├── DESIGN.md                        # Master Material 3 design and token specification
└── package.json                     # Monorepo root configuration
```

---

## Local Development

### Prerequisites

- Node.js >= 24
- pnpm >= 11

### Setup

```bash
# Clone the repository
git clone https://github.com/Nathan-Mwai/material-3-web.git
cd material-3-web

# Install workspace dependencies
pnpm install

# Start the documentation and preview server
pnpm dev
```

The documentation app will be running at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `pnpm dev`: Starts the Next.js development server across workspace applications.
- `pnpm build`: Builds all applications and packages for production.
- `pnpm check`: Runs linting, typechecking, and format checks.
- `pnpm format`: Formats TypeScript and Markdown files with Prettier.

---

## License & Trademark Notice

Distributed under the MIT License.

**Disclaimer**: Material 3 Web is an independent open-source project and is not affiliated with, endorsed by, or sponsored by Google LLC. "Material" and "Material Design" are trademarks of Google LLC.
