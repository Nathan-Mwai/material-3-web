"use client"

import * as React from "react"
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

const componentsList = [
  {
    name: "Button",
    description:
      "Common buttons prompt actions and express what will happen next. Supports 5 variants, 5 sizes, 2 shapes, and press morphing.",
    category: "Actions",
    status: "Ready",
    href: "/components/button",
  },
  {
    name: "Floating Action Button (FAB)",
    description:
      "Represents the primary action on a screen. Available in surface, primary, and secondary color treatments.",
    category: "Actions",
    status: "In Development",
    href: "#",
  },
  {
    name: "Card",
    description:
      "Containment surfaces for grouping related content and actions in elevated, filled, and outlined styles.",
    category: "Containment",
    status: "In Development",
    href: "#",
  },
  {
    name: "Chip",
    description:
      "Compact interactive elements that represent an input, attribute, or action like filtering and suggestion.",
    category: "Selection",
    status: "In Development",
    href: "#",
  },
  {
    name: "Switch",
    description:
      "Toggles the state of a single setting on or off, with optional icon morphing inside the handle.",
    category: "Selection",
    status: "In Development",
    href: "#",
  },
  {
    name: "Text Field",
    description:
      "Outlined and filled text inputs with floating labels, supporting text, and validation states.",
    category: "Inputs",
    status: "In Development",
    href: "#",
  },
  {
    name: "Dialog",
    description:
      "Modal surfaces that provide critical information or ask for user decisions before proceeding.",
    category: "Communication",
    status: "In Development",
    href: "#",
  },
  {
    name: "Navigation Bar",
    description:
      "Bottom and top app bars allowing navigation between primary destinations in an application.",
    category: "Navigation",
    status: "In Development",
    href: "#",
  },
]

export default function ComponentsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")

  const categories = [
    "All",
    "Actions",
    "Containment",
    "Selection",
    "Inputs",
    "Communication",
    "Navigation",
  ]

  const filteredComponents =
    selectedCategory === "All"
      ? componentsList
      : componentsList.filter((c) => c.category === selectedCategory)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col gap-10">
      {/* Page Title & Intro */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-on-surface">
          Component Catalog
        </h1>
        <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
          Open-source React components designed according to Google Material 3
          guidelines. Copy, paste, and adapt source code into your projects.
        </p>
      </div>

      {/* Category Filter Chips per DESIGN.md */}
      <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/30 pb-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            size="xs"
            variant={selectedCategory === cat ? "tonal" : "outlined"}
            shape="round"
            onClick={() => setSelectedCategory(cat)}
            className="text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Components Grid (4-up on desktop, 2-up on tablet, 1-up on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((item) => {
          const isReady = item.status === "Ready"

          return (
            <div
              key={item.name}
              className={`p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex flex-col justify-between transition-all ${
                isReady
                  ? "hover:border-primary/50 hover:shadow-xs"
                  : "opacity-85"
              }`}
            >
              <div className="flex flex-col gap-4">
                {/* Header: Name and Status Badge */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-on-surface tracking-tight">
                    {item.name}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isReady
                        ? "bg-primary-container text-on-primary-container"
                        : "bg-surface-container-highest text-on-surface-variant"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>

                {/* Interactive live preview for Ready component */}
                {isReady && (
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center gap-3 my-2">
                    <Button variant="filled" size="xs">
                      Filled
                    </Button>
                    <Button variant="tonal" size="xs">
                      Tonal
                    </Button>
                    <Button variant="outlined" size="xs">
                      Outlined
                    </Button>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-outline-variant/30 mt-4 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">
                  {item.category}
                </span>

                {isReady ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Component Docs</span>
                    <ArrowRightIcon />
                  </Link>
                ) : (
                  <span className="text-xs text-on-surface-variant/60 font-medium">
                    In Development
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
