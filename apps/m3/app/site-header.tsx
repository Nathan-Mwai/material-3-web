"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import Button from "@/registry/material-v1/ui/button"
import { cn } from "@/lib/utils"
import { BrushStroke, Seal } from "./_site/ink"

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

const NAV = [
  { href: "/components", label: "Components" },
  { href: "/components/button", label: "Button" },
]

function useIsDark() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })
      return () => observer.disconnect()
    },
    () => document.documentElement.classList.contains("dark"),
    () => false
  )
}

function NavLink({
  href,
  label,
  active,
  onNavigate,
  className,
}: {
  href: string
  label: string
  active: boolean
  onNavigate?: () => void
  className?: string
}) {
  return (
    <Button
      asChild
      variant="text"
      size="sm"
      className={cn(active ? "font-semibold text-seal" : "text-ink", className)}
    >
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
      >
        {label}
        {active && (
          // Wrapped: the Button sizes every descendant svg to its icon slot
          <span className="pointer-events-none absolute inset-x-3 bottom-0.5 h-1.5 text-seal">
            <BrushStroke className="!size-full" />
          </span>
        )}
      </Link>
    </Button>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const isDark = useIsDark()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuButton = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  React.useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setMenuOpen(false)
      menuButton.current?.focus()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [menuOpen])

  // The /components link must not light up on /components/button
  const isActive = (href: string) =>
    href === "/components" ? pathname === href : pathname.startsWith(href)

  return (
    <>
      <div
        role="note"
        className="flex items-center justify-center gap-3 border-b border-wash/40 bg-paper-deep px-4 py-2 text-[0.8125rem]/5 text-ink"
      >
        <span className="shrink-0 rounded-sm border border-seal px-1.5 font-semibold text-seal">
          Beta
        </span>
        <span>
          Components and tokens can still change.{" "}
          <Link
            href="/#beta"
            className="sumi-focus underline decoration-wash underline-offset-4 hover:decoration-seal"
          >
            What beta means here
          </Link>
        </span>
      </div>

      <header className="sticky top-0 z-[100] border-b border-wash/40 bg-paper">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="sumi-focus flex items-center gap-3 text-ink"
            aria-label="Material 3 Web, home"
          >
            <Seal />
            <span className="text-lg font-semibold tracking-tight">
              Material 3 Web
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink key={item.href} {...item} active={isActive(item.href)} />
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button asChild variant="text" size="xs" className="text-ink">
              <a
                href="https://github.com/Nathan-Mwai/material-3-web"
                target="_blank"
                rel="noreferrer"
                aria-label="Source on GitHub (opens in a new tab)"
              >
                <GitHubIcon />
              </a>
            </Button>
            <Button
              variant="text"
              size="xs"
              className="text-ink"
              onClick={() => document.documentElement.classList.toggle("dark")}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun /> : <Moon />}
            </Button>
            <Button
              ref={menuButton}
              variant="text"
              size="xs"
              className="text-ink md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="border-t border-wash/40 px-4 pt-2 pb-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <NavLink
                    {...item}
                    active={isActive(item.href)}
                    onNavigate={() => setMenuOpen(false)}
                    className="w-full justify-start"
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
