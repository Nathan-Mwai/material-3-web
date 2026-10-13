import Link from "next/link"
import Button from "@/registry/material-v1/ui/button"
import { CopyCommand } from "./_site/copy-command"
import { BrushStroke, IsometricButton } from "./_site/ink"

const SOURCE_URL =
  "https://github.com/Nathan-Mwai/material-3-web/tree/main/apps/m3"

const section = "mx-auto w-full max-w-[1280px] px-6 py-[clamp(4rem,8vw,8rem)]"

export default function Home() {
  return (
    <main>
      <Hero />
      <Beta />
      <Tokens />
      <Install />
    </main>
  )
}

function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-6 pt-[clamp(3rem,6vw,6rem)] pb-[clamp(4rem,8vw,8rem)] lg:grid-cols-[7fr_5fr]">
      <div className="flex flex-col gap-8">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)]/[1.1] font-bold tracking-tight text-balance">
          Material 3 components that live in{" "}
          <span className="relative inline-block whitespace-nowrap">
            your repo.
            <span className="absolute inset-x-0 -bottom-1 h-3 text-seal">
              <BrushStroke className="size-full" />
            </span>
          </span>
        </h1>
        <p className="max-w-[60ch] text-lg/[1.7] text-ink-muted">
          Each component arrives as a TypeScript file through the shadcn CLI.
          It takes its colors from Tailwind v4 tokens and moves on the M3
          Expressive springs. After that it is your code, and you edit it like
          any other file in your project.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="filled" size="md">
            <Link href="/components">Open the catalog</Link>
          </Button>
          <Button asChild variant="outlined" size="md" className="text-ink">
            <a href="#install">Read the install steps</a>
          </Button>
        </div>
      </div>
      <IsometricButton />
    </section>
  )
}

function Beta() {
  return (
    <section
      id="beta"
      aria-labelledby="beta-title"
      className="scroll-mt-20 border-y border-wash/40 bg-paper-deep/60"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 py-[clamp(3rem,6vw,5rem)] md:grid-cols-[4fr_8fr]">
        <h2 id="beta-title" className="text-[2.25rem]/tight font-bold">
          What beta means here
        </h2>
        <div className="flex max-w-[72ch] flex-col gap-8 text-base/[1.6]">
          <p>
            Prop names and token names can change until the beta label comes
            off. Because the code is copied into your project, nothing changes
            under you: you decide when to re-add a component, and you review the
            diff before you keep it.
          </p>
          <div className="grid gap-8 sm:grid-cols-[3fr_2fr]">
            <div>
              <h3 className="mb-3 font-semibold">Ready to try: Button</h3>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-ink-muted marker:text-seal">
                <li>Five sizes, from 32px to 136px tall</li>
                <li>Round and square shapes, and toggle states</li>
                <li>Spring physics on the corner radius and colors</li>
                <li>Enter and Space press the shape, like a click</li>
                <li>Reduced motion is respected automatically</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Not built yet</h3>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-ink-muted marker:text-wash">
                <li>Button groups</li>
                <li>Icon buttons, split buttons and FABs</li>
                <li>
                  The rest of the{" "}
                  <Link
                    href="/components#in-progress"
                    className="sumi-focus text-ink underline decoration-wash underline-offset-4 hover:decoration-seal"
                  >
                    in-progress list
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const OVERRIDE = `/* The tokens these three buttons read */
.sumi {
  --m3-primary: #8a1c15;
  --m3-on-primary: #f4f1e8;
  --m3-secondary-container: #e9e3d3;
  --m3-on-secondary-container: #0d0d0d;
  --m3-outline-variant: #808080;
  --m3-on-surface-variant: #5f5b52;
}`

function Tokens() {
  return (
    <section
      aria-labelledby="tokens-title"
      className={`${section} grid grid-cols-1 items-center gap-12 lg:grid-cols-[6fr_5fr]`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <figure className="m3-stage flex flex-col gap-6 rounded-lg p-6">
          <figcaption className="text-sm text-m3-on-surface-variant">
            As installed: baseline tokens
          </figcaption>
          <div className="flex flex-col items-start gap-3">
            <Button variant="filled">Save draft</Button>
            <Button variant="tonal">Preview</Button>
            <Button variant="outlined">Discard</Button>
          </div>
        </figure>
        <figure className="flex flex-col gap-6 rounded-lg border border-wash/50 bg-paper-raised p-6">
          <figcaption className="text-sm text-ink-muted">
            On this site: same file, Sumi-e tokens
          </figcaption>
          <div className="flex flex-col items-start gap-3">
            <Button variant="filled">Save draft</Button>
            <Button variant="tonal">Preview</Button>
            <Button variant="outlined">Discard</Button>
          </div>
        </figure>
      </div>

      <div className="flex flex-col gap-6">
        <h2 id="tokens-title" className="text-[2.25rem]/tight font-bold text-balance">
          Every button on this site is the same component.
        </h2>
        <p className="max-w-[60ch] text-base/[1.6] text-ink-muted">
          The Button reads every color from <code className="font-mono text-[0.9em] text-ink">--m3-*</code>{" "}
          variables. Point them at your palette in one CSS rule and the
          component follows, springs included. The buttons on the left are the
          same file with different tokens.
        </p>
        <CopyCommand code={OVERRIDE} label="Token override example" />
      </div>
    </section>
  )
}

const USAGE = `import Button from "@/components/ui/button"

export function SaveBar() {
  return <Button variant="filled">Save changes</Button>
}`

function Install() {
  return (
    <section
      id="install"
      aria-labelledby="install-title"
      className={`${section} scroll-mt-20`}
    >
      <div className="mx-auto flex max-w-[72ch] flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 id="install-title" className="text-[2.25rem]/tight font-bold">
            Install the Button
          </h2>
          <p className="text-ink-muted">
            You need a React project with Tailwind CSS v4 and shadcn set up. If
            shadcn isn&rsquo;t set up yet, run{" "}
            <code className="font-mono text-[0.9em] text-ink">npx shadcn@latest init</code>{" "}
            first.
          </p>
        </div>

        <ol className="flex flex-col gap-8">
          <Step n={1} title="Tell shadcn where this registry lives">
            Add the registry to <code className="font-mono text-[0.9em] text-ink">components.json</code>.
            <CopyCommand
              className="mt-3"
              label="Registry entry for components.json"
              code={`"registries": {\n  "@m3": "{origin}/r/{name}.json"\n}`}
            />
          </Step>
          <Step n={2} title="Add the Button">
            This also brings in the <code className="font-mono text-[0.9em] text-ink">cn</code>{" "}
            helper, the M3 color tokens and the spring motion library.
            <CopyCommand
              className="mt-3"
              label="Install command"
              code="npx shadcn@latest add @m3/button"
            />
          </Step>
          <Step n={3} title="Use it">
            <CopyCommand className="mt-3" label="Usage example" code={USAGE} />
          </Step>
        </ol>

        <p className="text-ink-muted">
          Prefer to copy by hand? You need{" "}
          <code className="font-mono text-[0.9em] text-ink">button.tsx</code>,{" "}
          <code className="font-mono text-[0.9em] text-ink">lib/motion.tsx</code>,{" "}
          <code className="font-mono text-[0.9em] text-ink">lib/utils.ts</code> and the
          token CSS, all in{" "}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="sumi-focus text-ink underline decoration-wash underline-offset-4 hover:decoration-seal"
          >
            the GitHub repo
          </a>
          , plus <code className="font-mono text-[0.9em] text-ink">class-variance-authority</code>,{" "}
          <code className="font-mono text-[0.9em] text-ink">radix-ui</code>,{" "}
          <code className="font-mono text-[0.9em] text-ink">clsx</code> and{" "}
          <code className="font-mono text-[0.9em] text-ink">tailwind-merge</code> from npm.
        </p>
      </div>
    </section>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-x-4">
      <span aria-hidden="true" className="text-[2.25rem]/none font-bold text-seal">
        {n}
      </span>
      <div className="min-w-0 text-ink-muted">
        <h3 className="mb-1 text-[1.5rem]/tight font-semibold text-ink">{title}</h3>
        {children}
      </div>
    </li>
  )
}
