import type { Metadata } from "next"
import Link from "next/link"
import Button, { type ButtonProps } from "@/registry/material-v1/ui/button"
import { CopyCommand } from "../_site/copy-command"

export const metadata: Metadata = {
  title: "Components · Material 3 Web",
  description: "Material 3 components in the registry, when to use each one, and how to install them.",
}

const DOCS_URL =
  "https://github.com/Nathan-Mwai/material-3-web/blob/main/apps/m3/registry/material-v1/ui/button.md"

// Emphasis guidance from m3.material.io/components/buttons/guidelines
const USE_CASES: {
  variant: NonNullable<ButtonProps["variant"]>
  label: string
  when: string
}[] = [
  {
    variant: "filled",
    label: "Save changes",
    when: "Highest emphasis. The action that completes the task on screen, such as saving or confirming.",
  },
  {
    variant: "tonal",
    label: "Next",
    when: "A step below filled. Important actions that aren't the final one, like Next in a setup flow.",
  },
  {
    variant: "elevated",
    label: "Add to album",
    when: "A tonal button with a shadow. Reach for it only when the button has to stand off a busy or patterned background.",
  },
  {
    variant: "outlined",
    label: "Back",
    when: "Medium emphasis. Important actions that aren't the primary one, often next to a filled button.",
  },
  {
    variant: "text",
    label: "View details",
    when: "Lowest emphasis. Minor actions, and lists of options inside dialogs and cards.",
  },
]

// From the README's component status table
const IN_PROGRESS = [
  { name: "Icon Button", variants: "Standard, filled, tonal, outlined" },
  { name: "Chips", variants: "Assist, filter, input, suggestion" },
  { name: "Navigation Bar", variants: "Bottom bar and rail" },
  { name: "Cards", variants: "Elevated, filled, outlined" },
  { name: "Switch", variants: "Standard, with icons" },
  { name: "Dialog", variants: "Basic, full-screen" },
  { name: "Text Field", variants: "Outlined, filled" },
  { name: "Floating Action Button", variants: "Standard, small, large, extended" },
]

const code = "font-mono text-[0.9em] text-ink"

export default function ComponentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-[clamp(4rem,8vw,7rem)] px-6 pt-[clamp(3rem,5vw,5rem)] pb-[clamp(4rem,8vw,8rem)]">
      <header className="flex max-w-[60ch] flex-col gap-4">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)]/[1.1] font-bold tracking-tight">
          Components
        </h1>
        <p className="text-lg/[1.7] text-ink-muted">
          One component is in the registry today. Its entry shows when to reach
          for each variant and how to install it.
        </p>
      </header>

      <article aria-labelledby="button-title" className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[60ch] flex-col gap-3">
            <div className="flex items-center gap-3">
              <h2 id="button-title" className="text-[2.25rem]/tight font-bold">
                Button
              </h2>
              <span className="rounded-sm border border-seal px-1.5 text-[0.8125rem]/5 font-semibold text-seal">
                Beta
              </span>
            </div>
            <p className="text-ink-muted">
              The M3 Expressive common button. Five variants, five sizes, round
              or square, plain or toggle, with spring motion on the shape and
              colors.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="filled">
              <Link href="/components/button">Open the playground</Link>
            </Button>
            <Button asChild variant="outlined" className="text-ink">
              <a href={DOCS_URL} target="_blank" rel="noreferrer">
                Read the docs on GitHub
              </a>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[1.5rem]/tight font-semibold">
            When to use each variant
          </h3>
          <ol className="flex flex-col divide-y divide-wash/40 border-y border-wash/40">
            {USE_CASES.map((useCase) => (
              <li
                key={useCase.variant}
                className="grid gap-4 py-4 sm:grid-cols-[15rem_1fr] sm:items-center sm:gap-8"
              >
                <div className="m3-stage flex h-24 items-center justify-center rounded-lg">
                  <Button variant={useCase.variant}>{useCase.label}</Button>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold capitalize">{useCase.variant}</p>
                  <p className="max-w-[60ch] text-ink-muted">{useCase.when}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-3">
            <h3 className="text-[1.5rem]/tight font-semibold">Install</h3>
            <p className="text-ink-muted">
              Needs the <code className={code}>@m3</code> registry entry in{" "}
              <code className={code}>components.json</code>. The{" "}
              <Link
                href="/#install"
                className="sumi-focus text-ink underline decoration-wash underline-offset-4 hover:decoration-seal"
              >
                install steps
              </Link>{" "}
              show how to add it. The command also brings in{" "}
              <code className={code}>utils</code>,{" "}
              <code className={code}>tokens</code> and{" "}
              <code className={code}>motion</code>.
            </p>
          </div>
          <CopyCommand label="Install command" code="npx shadcn@latest add @m3/button" />
        </div>
      </article>

      <section
        id="in-progress"
        aria-labelledby="in-progress-title"
        className="grid scroll-mt-20 gap-8 border-t border-wash/40 pt-12 md:grid-cols-[4fr_8fr]"
      >
        <div className="flex flex-col gap-3">
          <h2 id="in-progress-title" className="text-[1.5rem]/tight font-semibold">
            In progress
          </h2>
          <p className="text-ink-muted">
            These aren&rsquo;t in the registry yet, so there is nothing to
            install.
          </p>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {IN_PROGRESS.map((item) => (
            <li key={item.name} className="flex flex-col border-b border-wash/40 py-3">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-ink-muted">{item.variants}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
