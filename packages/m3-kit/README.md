# m3-kit

Add Material 3 components to your React and Tailwind project. Like shadcn/ui, the
components are copied into your codebase, so you own and can edit them.

## Quick start

```bash
npx m3-kit add button
```

## Requirements

- Tailwind CSS v4
- A React project. Tested with Next.js; other setups supported by the shadcn CLI
  should work but are less tested.

If your project has no `components.json`, m3-kit runs `shadcn init` for you first.

## Commands

| Command | What it does |
| --- | --- |
| `m3-kit add <component...>` | Add components to your project |
<!-- | `m3-kit list` | List available components | -->

Options for `add` (passed through to shadcn): `-y/--yes`, `-o/--overwrite`,
`-c/--cwd <path>`, `--dry-run`.

## How it works

m3-kit registers the `@m3` registry (https://m3.nathanmwai.com) in your
`components.json`, then uses the shadcn CLI to install each component along with
its dependencies: the `cn` helper and the Material 3 color tokens.

## Using it next to shadcn/ui

M3 color tokens are prefixed with `m3-` (for example `bg-m3-primary`), so they do not
collide with shadcn's own tokens. Both systems can live in one project.

## Configuration

Set `M3_KIT_REGISTRY` to a URL template containing `{name}` to point m3-kit at a
different registry, for example a local dev server.

## Disclaimer

m3-kit is an independent project and is not affiliated with or endorsed by Google.
Material Design is Google's design system.

## License

MIT