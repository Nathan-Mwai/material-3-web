import Link from "next/link"
import Button from "@/registry/material-v1/ui/button"

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function ComponentsIndexPage() {
  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-container text-on-tertiary-container">
            Registry Alpha
          </span>
          <span className="text-xs text-on-surface-variant">
            Material 3 Design System
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-on-surface">
          Components Catalog
        </h1>
        <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
          Open-source, shadcn-compatible Material 3 components designed for React, Tailwind CSS, and Radix UI primitives. Copy source code directly or install via CLI.
        </p>
      </section>

      {/* Development Status Notice */}
      <section className="rounded-xl border border-outline-variant/60 bg-surface-container-low p-5">
        <h2 className="text-sm font-semibold text-on-surface">
          First Component Release
        </h2>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
          We are currently focusing on the Button component as our first production-ready milestone. Additional Material 3 components (Chips, Cards, Dialogs, Top App Bar, Floating Action Buttons) are scheduled for subsequent iterations.
        </p>
      </section>

      {/* Component Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Button Card (Active) */}
        <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low p-6 flex flex-col justify-between gap-6 hover:shadow-xs transition-shadow">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-on-surface">Button</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-medium">
                Live Preview
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Material 3 action component featuring filled, tonal, elevated, outlined, and text variants with fluid shape morphing and touch targets.
            </p>

            {/* Mini Live Preview */}
            <div className="rounded-xl bg-surface-container-lowest p-4 flex flex-wrap items-center justify-center gap-2 border border-outline-variant/30 my-2">
              <Button variant="filled" size="xs">Filled</Button>
              <Button variant="tonal" size="xs">Tonal</Button>
              <Button variant="outlined" size="xs">Outlined</Button>
            </div>
          </div>

          <Button asChild variant="filled" size="sm" trailingIcon={<ArrowRightIcon />}>
            <Link href="/components/button">
              Explore Button Component
            </Link>
          </Button>
        </div>

        {/* Upcoming Placeholder Cards */}
        <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/50 p-6 flex flex-col justify-between gap-6 opacity-75">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-on-surface">Chip</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-medium">
                Coming Next
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Filter, assist, suggestion, and input chips following official Material 3 specification.
            </p>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">
            Planned for sprint release
          </span>
        </div>

        <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/50 p-6 flex flex-col justify-between gap-6 opacity-75">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-on-surface">Card</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-medium">
                Coming Next
              </span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Elevated, filled, and outlined surface containers with structured header, media, and action slots.
            </p>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">
            Planned for sprint release
          </span>
        </div>
      </section>
    </main>
  )
}
