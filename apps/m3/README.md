# Material 3 Documentation App (`apps/m3`)

The Next.js 16 application hosting the documentation, interactive component playground, and registry preview for Material 3 Web.

## Overview

This app serves as both the documentation portal and the consumer of the Material 3 component registry:

- **Component Documentation**: In-depth API references, interactive playgrounds, accessibility guarantees, and token specifications for each component.
- **Dogfooding**: The site interface is built entirely with the Material 3 Baseline color scheme (`#6750A4`), M3 typography (Roboto & Roboto Mono), and M3 container elevations.
- **Theme Sandbox**: Real-time light and dark theme switching verified against WCAG 2.1 AA contrast requirements.

## Directory Structure

```text
apps/m3/
├── app/
│   ├── components/
│   │   ├── button/
│   │   │   └── page.tsx      # Comprehensive M3 Button documentation and live preview
│   │   └── page.tsx          # Component catalog and roadmap
│   ├── globals.css           # Tailwind CSS v4 @theme inline tokens (light & dark M3 schemes)
│   ├── layout.tsx            # Root layout with Roboto typography & dark mode provider
│   ├── page.tsx              # Landing page hero band and live component preview
│   ├── site-header.tsx       # Top app bar, navigation, and theme switch
│   └── site-footer.tsx       # Footer with trademark notices
└── registry/
    └── material-v1/
        └── ui/
            └── button.tsx    # Canonical M3 Button component source for registry distribution
```

## Running Locally

From the repository root:

```bash
# Start the Next.js dev server
pnpm --filter m3 dev
```

The application runs at [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
pnpm --filter m3 build
```
