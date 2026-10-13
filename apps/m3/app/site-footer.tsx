import Link from "next/link"
import { BrushStroke } from "./_site/ink"

const linkClass =
  "sumi-focus inline-flex min-h-11 items-center underline-offset-4 hover:text-seal hover:underline"

export function SiteFooter() {
  return (
    <footer className="mt-auto px-6 pt-4 pb-10 text-sm text-ink-muted">
      <div className="mx-auto max-w-[1280px]">
        <BrushStroke className="mb-8 h-2.5 text-wash/60" />
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-xl leading-relaxed">
            Material 3 Web is an independent open-source project, not affiliated
            with or endorsed by Google LLC. &ldquo;Material&rdquo; is a trademark
            of Google LLC.
          </p>
          <ul className="flex flex-wrap gap-x-6 text-ink">
            <li>
              <Link href="/components" className={linkClass}>
                Components
              </Link>
            </li>
            <li>
              <a href="https://m3.material.io" target="_blank" rel="noreferrer" className={linkClass}>
                M3 spec
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Nathan-Mwai/material-3-web"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
