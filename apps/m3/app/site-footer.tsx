import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container text-on-surface-variant border-t border-outline-variant/40 py-12 px-6 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs leading-relaxed">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <p className="font-semibold text-on-surface text-sm">
            Material 3 Design for Web
          </p>
          <p className="max-w-xl text-on-surface-variant">
            An independent open-source component library and registry for React
            & Tailwind CSS. Not affiliated with or endorsed by Google LLC.
            &ldquo;Material&rdquo; is a trademark of Google LLC.
          </p>
        </div>

        <div className="flex items-center gap-6 text-on-surface-variant font-medium">
          <Link
            href="/components"
            className="hover:text-primary transition-colors"
          >
            Components
          </Link>
          <Link
            href="/components/button"
            className="hover:text-primary transition-colors"
          >
            Button Docs
          </Link>
          <a
            href="https://m3.material.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            M3 Specs
          </a>
          <a
            href="https://github.com/Nathan-Mwai/material-3-web"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
