"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Button from "@/registry/material-v1/ui/button"

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

export function SiteHeader() {
  const pathname = usePathname()

  const isDark = React.useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(() => onStoreChange())
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })
      return () => observer.disconnect()
    },
    () =>
      typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : false,
    () => false
  )

  React.useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    if (prefersDark && !document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")
  }

  return (
    <>
      {/* Development Banner (Alpha Notice on all pages) */}
      <div className="w-full bg-secondary-container text-on-secondary-container px-4 py-2 text-xs font-medium flex items-center justify-center gap-2 border-b border-outline-variant/40">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-tertiary-container text-on-tertiary-container">
          Alpha
        </span>
        <span>
          Material 3 Design for Web is currently in active development.
          Components are live in preview.
        </span>
      </div>

      {/* Top App Bar per DESIGN.md */}
      <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Wordmark & Chip */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-on-surface hover:opacity-90 transition-opacity"
            >
              <span className="size-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shadow-xs">
                M3
              </span>
              <span className="font-semibold text-lg tracking-tight">
                Material 3{" "}
                <span className="text-primary font-normal">Design</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/components">
              <Button
                variant={pathname === "/components" ? "tonal" : "text"}
                size="sm"
                className="text-sm font-medium"
              >
                Components
              </Button>
            </Link>
            <Link href="/components/button">
              <Button
                variant={
                  pathname.startsWith("/components/button") ? "tonal" : "text"
                }
                size="sm"
                className="text-sm font-medium"
              >
                Button Docs
              </Button>
            </Link>
          </nav>

          {/* Action icons & Theme toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Nathan-Mwai/material-3-web"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
            >
              <Button shape="circle" size="sm" variant="text">
                <GitHubIcon />
              </Button>
            </a>

            <Button
              shape="circle"
              size="sm"
              variant="text"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </Button>

            <Link href="/components/button" className="hidden sm:inline-flex">
              <Button variant="filled" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
